#!/usr/bin/env node
/* ============================================================
   sync-cybertutor.mjs
   ------------------------------------------------------------
   Pulls the latest CyberTutor posts from the Substack RSS feed
   and writes them into js/data.js, between the CYBERTUTOR markers.

   Run it by hand:   node tools/sync-cybertutor.mjs
   ...or let the GitHub Action (.github/workflows/update-blog.yml)
   run it for you on a schedule.

   No npm install needed — it only uses built-in Node (18+).
   ============================================================ */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const FEED  = 'https://mohammedzuoriki.substack.com/feed';
const COUNT = 9;                       // how many recent posts to show
const DATA  = join(dirname(fileURLToPath(import.meta.url)), '..', 'js', 'data.js');
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

if (typeof fetch !== 'function') {
  console.error('This script needs Node 18 or newer (for global fetch).');
  process.exit(1);
}

/* ---- tiny helpers (no XML library, just tolerant regex) ---- */

// pull the inner text of <tag>...</tag>, unwrapping a CDATA section
function field(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'));
  if (!m) return '';
  return m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

// strip HTML tags and decode the entities Substack actually emits
function clean(s) {
  return String(s)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(pubDate) {
  const d = new Date(pubDate);
  if (isNaN(d)) return '';
  return `${String(d.getUTCDate()).padStart(2, '0')} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// ask Substack's image CDN for a card-sized version instead of the full image
function thumb(url) {
  return url.replace(/(\/image\/fetch\/\$s_![^,/]+,)/, '$1w_848,c_limit,');
}

// the real article teaser lives in <content:encoded>, in the paragraph after
// the "Summarise Article" heading; fall back to the first real paragraph
function summary(contentEncoded) {
  if (!contentEncoded) return '';
  let m = contentEncoded.match(/Summari[sz]e Article<\/strong><\/h3>\s*<p>([\s\S]*?)<\/p>/i);
  if (!m) m = contentEncoded.match(/<p>([\s\S]{40,}?)<\/p>/i);
  let text = m ? clean(m[1]) : '';
  if (text.length > 220) text = text.slice(0, 217).replace(/\s+\S*$/, '') + '…';
  return text;
}

// a short topical pill + its colour, guessed from the headline
function classify(title) {
  const t = title.toLowerCase();
  const rules = [
    [/supply chain|pull request|package|dependency|npm|repositor/, 'supply chain', 'warm'],
    [/vuln|bug|exploit|cve|takeover|\brce\b|zero-day|0-day|flaw/,   'vuln',         'warm'],
    [/breach|leak|compromis|heist|stolen|exposed|harvest/,         'breach',       ''],
    [/malware|worm|ransomware|trojan|backdoor|botnet|spyware|rat/,  'malware',      'warm'],
    [/phish|scam|fraud|impersonat|social eng/,                     'phishing',     'cool'],
    [/\bai\b|copilot|\bllm\b|claude|\bgpt\b|chatbot|model/,         'ai',           'cool'],
    [/policy|\beu\b|\blaw\b|regulat|\bbill\b|government|complian/,  'policy',       ''],
    [/crypto|bitcoin|wallet|blockchain|token/,                     'crypto',       'cool'],
  ];
  for (const [re, tag, tone] of rules) if (re.test(t)) return { tag, tone };
  return { tag: 'news', tone: '' };
}

/* ---- fetch, parse, build ---- */

// Substack sits behind Cloudflare, which blanket-blocks/challenges traffic
// from GitHub Actions' hosted-runner IP ranges regardless of headers sent —
// this is why the workflow kept failing even after spoofing browser headers,
// while the script always worked fine locally. Try the feed directly first
// (fast path, works everywhere Cloudflare hasn't flagged the source IP),
// then fall back to a public read-through proxy whose IP isn't blocklisted.
const FEED_HEADERS = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'accept': 'application/rss+xml, application/xml;q=0.9, */*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
};
const PROXY_FEED = `https://api.allorigins.win/raw?url=${encodeURIComponent(FEED)}`;

async function fetchFeed(url, attempt = 1, maxAttempts = 3) {
  console.log(`Fetching ${url} (attempt ${attempt}/${maxAttempts}) ...`);
  const res = await fetch(url, { headers: FEED_HEADERS });
  if (!res.ok) {
    if (attempt < maxAttempts) {
      console.warn(`Feed request failed: HTTP ${res.status} — retrying...`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      return fetchFeed(url, attempt + 1, maxAttempts);
    }
    throw new Error(`HTTP ${res.status}`);
  }
  return res.text();
}

async function fetchFeedWithFallback() {
  try {
    return await fetchFeed(FEED);
  } catch (err) {
    console.warn(`Direct feed fetch failed (${err.message}) — falling back to proxy...`);
    try {
      return await fetchFeed(PROXY_FEED, 1, 2);
    } catch (err2) {
      console.error(`Proxy feed fetch also failed: ${err2.message}`);
      process.exit(1);
    }
  }
}

const xml = await fetchFeedWithFallback();

const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
if (!items.length) { console.error('No <item> entries found in the feed.'); process.exit(1); }

const seen = new Set();
const posts = items
  .map((it) => {
    const title = clean(field(it, 'title'));
    const enc = it.match(/<enclosure\s+url="([^"]+)"/i);
    const { tag, tone } = classify(title);
    return {
      date:  formatDate(field(it, 'pubDate')),
      title,
      desc:  summary(field(it, 'content:encoded')),
      tag,
      tone,
      image: enc ? thumb(enc[1]) : '',
      link:  field(it, 'link'),
    };
  })
  .filter((p) => {                     // drop blanks and repeated headlines
    const key = p.title.toLowerCase();
    if (!p.title || seen.has(key)) return false;
    seen.add(key);
    return true;
  })
  .slice(0, COUNT);

/* ---- serialise into the js/data.js style and splice in ---- */

const q = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
const body = posts.map((p) => `    {
      date:  ${q(p.date)},
      title: ${q(p.title)},
      desc:  ${q(p.desc)},
      tag:   ${q(p.tag)},
      tone:  ${q(p.tone)},
      image: ${q(p.image)},
      link:  ${q(p.link)}
    }`).join(',\n');

const block = `  posts: [\n${body}\n  ],`;

let src = await readFile(DATA, 'utf8');
const re = /(\/\* CYBERTUTOR:START \*\/)[\s\S]*?(\/\* CYBERTUTOR:END \*\/)/;
if (!re.test(src)) {
  console.error('Could not find the /* CYBERTUTOR:START */ ... /* CYBERTUTOR:END */ markers in js/data.js.');
  process.exit(1);
}
const next = src.replace(re, `$1\n${block}\n  $2`);

if (next === src) {
  console.log('Already up to date — no changes.');
} else {
  await writeFile(DATA, next);
  console.log(`Synced ${posts.length} posts into js/data.js:`);
  posts.forEach((p) => console.log(`  · ${p.date}  [${p.tag}]  ${p.title}`));
}
