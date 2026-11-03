#!/usr/bin/env node
/* ============================================================
   sync-cybertutor.mjs
   ------------------------------------------------------------
   Pulls the latest CyberTutor posts from the Substack RSS feed
   and writes them into frontend/js/data.js, between the CYBERTUTOR markers.

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
// ES modules have no __dirname, so build the path from this file's own URL.
// That way the script finds data.js whatever folder you run it from.
const DATA  = join(dirname(fileURLToPath(import.meta.url)), '..', 'frontend', 'js', 'data.js');
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

if (typeof fetch !== 'function') {
  console.error('This script needs Node 18 or newer (for global fetch).');
  process.exit(1);
}

/* ---- tiny helpers (no XML library, just tolerant regex) ---- */
// Regex is not a real XML parser: it relies on Substack's feed keeping its
// current, simple layout. That's an acceptable trade-off for a script with
// zero dependencies.

/**
 * Pull the inner text of <tag>...</tag>, unwrapping a CDATA section.
 * The lazy `*?` stops at the FIRST closing tag, and only the first match is used.
 * @param {string} block XML for one <item>.
 * @param {string} name Tag name, e.g. 'title' or 'content:encoded'.
 * @returns {string} Raw inner text (may still contain HTML), or '' if the tag is missing.
 */
function field(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'));
  if (!m) return '';
  return m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

/**
 * Strip HTML tags and decode the entities Substack actually emits.
 * The result is plain text. It still has to be escaped wherever it is used
 * later (JSON.stringify here, esc() in render.js).
 * @param {string} s
 * @returns {string} Plain text with whitespace collapsed to single spaces.
 */
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

/**
 * Format an RSS date as "24 oct 2026", the style data.js uses.
 * The UTC getters make the output the same whatever time zone the script
 * runs in (GitHub's runners use UTC; your laptop might not).
 * @param {string} pubDate RFC 822 date, e.g. "Fri, 24 Oct 2026 08:00:00 GMT".
 * @returns {string} '' if the date can't be parsed.
 */
function formatDate(pubDate) {
  const d = new Date(pubDate);
  if (isNaN(d)) return '';
  return `${String(d.getUTCDate()).padStart(2, '0')} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// Only accept https URLs on hosts we expect. The feed can arrive via the relay,
// so anything else (javascript:, a look-alike domain, a phishing page) is
// dropped rather than published on the site.
const LINK_HOSTS  = ['mohammedzuoriki.substack.com'];
const IMAGE_HOSTS = ['substackcdn.com', 'substack-post-media.s3.amazonaws.com'];

/**
 * Accept a URL only if it is https on one of the allowed hosts.
 * Hosts must match exactly, so a look-alike such as "substackcdn.com.evil.io"
 * fails. Parsing with URL() is more reliable than checking the string with a regex.
 * @param {string} raw URL text from the feed.
 * @param {string[]} hosts Allowed hostnames.
 * @returns {string} The normalised URL, or '' if it is rejected.
 */
function safeUrl(raw, hosts) {
  try {
    const u = new URL(clean(raw));
    return u.protocol === 'https:' && hosts.includes(u.hostname) ? u.href : '';
  } catch { return ''; }
}

// ask Substack's image CDN for a card-sized version instead of the full image:
// inserts "w_848,c_limit," (max width 848px, never upscale) after the "$s_!xxxx,"
// segment of the CDN URL. A URL in any other format is returned unchanged.
function thumb(url) {
  return url.replace(/(\/image\/fetch\/\$s_![^,/]+,)/, '$1w_848,c_limit,');
}

/**
 * Build a one-line teaser for a post.
 * The real article teaser lives in <content:encoded>, in the paragraph after
 * the "Summarise Article" heading; fall back to the first real paragraph
 * (40+ characters, which skips captions and empty <p>s).
 * @param {string} contentEncoded The post's full HTML.
 * @returns {string} At most 220 characters, cut at a word boundary with "…".
 */
function summary(contentEncoded) {
  if (!contentEncoded) return '';
  let m = contentEncoded.match(/Summari[sz]e Article<\/strong><\/h3>\s*<p>([\s\S]*?)<\/p>/i);
  if (!m) m = contentEncoded.match(/<p>([\s\S]{40,}?)<\/p>/i);
  let text = m ? clean(m[1]) : '';
  // cut to 217 chars, then drop the partial last word so the "…" follows a whole word
  if (text.length > 220) text = text.slice(0, 217).replace(/\s+\S*$/, '') + '…';
  return text;
}

/**
 * Guess a short topical pill + its colour from the headline.
 * Rules are checked in order and the FIRST match wins, so more specific
 * topics are listed before broader ones.
 * Patterns without \b match inside longer words (handy for stems such as
 * "compromis" → compromised/compromise), so short whole words like "rat"
 * and "bug" need \b or they'd match "operation" or "debug".
 * @param {string} title
 * @returns {{tag: string, tone: string}} Defaults to { tag: 'news', tone: '' }.
 */
function classify(title) {
  const t = title.toLowerCase();
  const rules = [
    [/supply chain|pull request|package|dependency|npm|repositor/, 'supply chain', 'warm'],
    [/vuln|\bbugs?\b|exploit|cve|takeover|\brce\b|zero-day|0-day|flaw/, 'vuln',     'warm'],
    [/breach|leak|compromis|heist|stolen|exposed|harvest/,         'breach',       ''],
    [/malware|worm|ransomware|trojan|backdoor|botnet|spyware|\brats?\b/, 'malware', 'warm'],
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
const RELAY_FEED = 'https://cybertutor-feed-relay.vercel.app/api/cybertutor-feed';

/**
 * Download the feed, retrying on HTTP errors with a growing wait (2s, then 4s, ...).
 * Retries happen by calling itself again with attempt + 1.
 * @param {string} url
 * @param {number} [attempt=1] Current attempt number (used by the retries).
 * @param {number} [maxAttempts=3]
 * @returns {Promise<string>} The response body (RSS XML).
 * @throws {Error} When every attempt returns a non-2xx status. A network
 *   failure (DNS, offline) makes fetch itself throw on the first attempt,
 *   without any retry.
 */
async function fetchFeed(url, attempt = 1, maxAttempts = 3) {
  console.log(`Fetching ${url} (attempt ${attempt}/${maxAttempts}) ...`);
  const res = await fetch(url, { headers: FEED_HEADERS });
  if (!res.ok) {
    if (attempt < maxAttempts) {
      console.warn(`Feed request failed: HTTP ${res.status} - retrying...`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      return fetchFeed(url, attempt + 1, maxAttempts);
    }
    throw new Error(`HTTP ${res.status}`);
  }
  return res.text();
}

/**
 * Try Substack directly, then the relay. Exits the process with code 1 if
 * both fail, which marks the GitHub Action run as failed.
 * @returns {Promise<string>} Feed XML.
 */
async function fetchFeedWithFallback() {
  try {
    return await fetchFeed(FEED);
  } catch (err) {
    console.warn(`Direct feed fetch failed (${err.message}) - trying relay...`);
  }

  try {
    return await fetchFeed(RELAY_FEED, 1, 2);
  } catch (err) {
    console.error('Relay feed fetch also failed: ' + err.message);
    process.exit(1);
  }
}

// Top-level await (outside any function) works because this is an ES module (.mjs).
const xml = await fetchFeedWithFallback();

// each <item> in the RSS feed is one post; keep just the inner XML of each
const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
if (!items.length) { console.error('No <item> entries found in the feed.'); process.exit(1); }

// Pipeline: parse each item → filter out bad/duplicate posts → keep the newest COUNT.
// The feed is newest-first, so slice() keeps the most recent posts.
const seen = new Set();                // lower-cased titles already kept, for de-duplication
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
      image: enc ? thumb(safeUrl(enc[1], IMAGE_HOSTS)) : '',
      link:  safeUrl(field(it, 'link'), LINK_HOSTS),
    };
  })
  .filter((p) => {                     // drop blanks, untrusted links and repeated headlines
    const key = p.title.toLowerCase();
    if (!p.title || !p.link || seen.has(key)) return false;
    seen.add(key);
    return true;
  })
  .slice(0, COUNT);

/* ---- serialise into the js/data.js style and splice in ---- */

// JSON.stringify escapes quotes, backslashes and line breaks, so feed text
// can never break out of its string literal in data.js
const q = (s) => JSON.stringify(String(s));
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

// Replace only what sits between the two marker comments. The markers are
// kept (captured as $1 and $2), so the next run can find them again.
// Everything outside them (events, ownPosts, committee...) is never touched.
let src = await readFile(DATA, 'utf8');
const re = /(\/\* CYBERTUTOR:START \*\/)[\s\S]*?(\/\* CYBERTUTOR:END \*\/)/;
if (!re.test(src)) {
  console.error('Could not find the /* CYBERTUTOR:START */ ... /* CYBERTUTOR:END */ markers in frontend/js/data.js.');
  process.exit(1);
}
// A replacer FUNCTION, not a replacement string: in a string, "$1", "$&" etc.
// are special patterns, so a headline like "$10 million" would be rewritten
// into marker text and corrupt data.js. A function's return value is used as-is.
const next = src.replace(re, (_, start, end) => `${start}\n${block}\n  ${end}`);

// only write when something changed, so the workflow's "has data.js changed?"
// check doesn't produce empty commits
if (next === src) {
  console.log('Already up to date — no changes.');
} else {
  await writeFile(DATA, next);
  console.log(`Synced ${posts.length} posts into frontend/js/data.js:`);
  posts.forEach((p) => console.log(`  · ${p.date}  [${p.tag}]  ${p.title}`));
}
