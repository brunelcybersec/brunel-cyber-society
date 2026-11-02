#!/usr/bin/env node
/* ============================================================
   check-site.mjs
   ------------------------------------------------------------
   Fast sanity checks, run by CI before anything is deployed
   (.github/workflows/check.yml). Catches the mistakes that are
   easy to make when editing by hand:
     - a JavaScript syntax error (e.g. a missing comma in data.js)
     - an event without a valid date: "YYYY-MM-DD"
     - a link or image path that doesn't exist, including wrong
       capital letters (fine on Windows, broken on GitHub Pages)

   Run it by hand:   node backend/tools/check-site.mjs
   No npm install needed — it only uses built-in Node (18+).
   ============================================================ */

import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import vm from 'node:vm';

const ROOT     = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FRONTEND = join(ROOT, 'frontend');
const DATA     = join(FRONTEND, 'js', 'data.js');

// collect every problem instead of stopping at the first, so one run shows them all
const errors = [];
const fail = (msg) => errors.push(msg);

/* ---- path helpers ---- */

const dirCache = new Map();
function list(dir) {
  if (!dirCache.has(dir)) dirCache.set(dir, readdir(dir).catch(() => []));
  return dirCache.get(dir);
}

/**
 * Does this path exist under frontend/ with EXACTLY this spelling?
 * Windows and macOS ignore letter case when opening files, but GitHub Pages
 * runs on Linux where "Parm.JPG" and "parm.jpg" are different files, so each
 * path segment is compared against the real directory listing.
 * @param {string} relPath Path relative to frontend/, using "/" separators.
 * @returns {Promise<boolean>}
 */
async function existsExact(relPath) {
  let dir = FRONTEND;
  for (const part of relPath.split('/').filter(Boolean)) {
    if (part === '.') continue;
    if (!(await list(dir)).includes(part)) return false;
    dir = join(dir, part);
  }
  return true;
}

// a same-site path, not "https:", "mailto:", "//host" or a bare "#anchor"
function isLocal(url) {
  return !!url && !/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith('//') && !url.startsWith('#');
}

// "/js/site.js?v=2#x" → "js/site.js"; a folder ("" or ".../") means its index.html
function localPath(url) {
  let p = decodeURIComponent(url.split(/[?#]/)[0]).replace(/^\/+/, '');
  if (p === '' || p.endsWith('/')) p += 'index.html';
  return p;
}

/* ---- 1. every script parses ---- */

const scripts = [
  ...(await readdir(join(FRONTEND, 'js'))).filter((f) => f.endsWith('.js')).map((f) => join(FRONTEND, 'js', f)),
  ...(await readdir(join(ROOT, 'backend', 'tools'))).filter((f) => f.endsWith('.mjs')).map((f) => join(ROOT, 'backend', 'tools', f)),
];
for (const file of scripts) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (err) {
    fail(`${relative(ROOT, file)} has a syntax error:\n${String(err.stderr).trim()}`);
  }
}

/* ---- 2. data.js runs and its content is valid ---- */

// Run data.js in an isolated sandbox with a fake `window`, exactly as the
// browser would, then inspect the SITE_DATA object it creates.
const sandbox = { window: {} };
try {
  vm.runInNewContext(await readFile(DATA, 'utf8'), sandbox, { filename: 'frontend/js/data.js' });
} catch (err) {
  fail(`frontend/js/data.js could not run: ${err.message}`);
}
const d = sandbox.window.SITE_DATA;

if (!d) {
  fail('frontend/js/data.js did not set window.SITE_DATA.');
} else {
  for (const key of ['events', 'ownPosts', 'posts', 'reads', 'learn', 'committee']) {
    if (!Array.isArray(d[key])) fail(`SITE_DATA.${key} should be a list: ${key}: [ ... ]`);
  }

  // render.js sorts events and splits upcoming/past using this field
  (d.events || []).forEach((e, i) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || '') || isNaN(new Date(e.date + 'T00:00:00'))) {
      fail(`event ${i + 1} ("${e.title}") needs date: "YYYY-MM-DD", got ${JSON.stringify(e.date)}`);
    }
  });

  // every same-site file data.js points at: [url, what it is]
  const refs = [];
  (d.committee || []).forEach((m) => refs.push([m.photo, `committee photo for ${m.name}`]));
  (d.events || []).forEach((e) => {
    const p = e.preview;
    if (!p) return;
    refs.push([p.img, `preview image for "${e.title}"`], [p.video, `preview video for "${e.title}"`], [p.link, `preview link for "${e.title}"`]);
    (p.gallery || []).forEach((g) => refs.push([g.src, `gallery item for "${e.title}"`], [g.poster, `gallery poster for "${e.title}"`]));
  });
  [...(d.ownPosts || []), ...(d.posts || [])].forEach((p) => {
    refs.push([p.image, `image for post "${p.title}"`], [p.link, `link for post "${p.title}"`]);
  });
  for (const [url, label] of refs) {
    if (isLocal(url) && !(await existsExact(localPath(url)))) {
      fail(`${label}: "${url}" not found in frontend/ (check the spelling and capital letters)`);
    }
  }
}

/* ---- 3. links and assets in the HTML pages exist ---- */

const pages = [
  ...(await readdir(FRONTEND))
    .filter((f) => f.endsWith('.html'))
    .map((f) => ({ file: join(FRONTEND, f), label: `frontend/${f}` })),
  ...(await readdir(join(FRONTEND, 'pages')))
    .filter((f) => f.endsWith('.html'))
    .map((f) => ({ file: join(FRONTEND, 'pages', f), label: `frontend/pages/${f}` })),
];
for (const page of pages) {
  const html = await readFile(page.file, 'utf8');
  for (const [, url] of html.matchAll(/\b(?:href|src)="([^"]*)"/g)) {
    if (isLocal(url) && !(await existsExact(localPath(url)))) {
      fail(`${page.label}: broken link to "${url}"`);
    }
  }
}

/* ---- report ---- */

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found:\n`);
  errors.forEach((e) => console.error(`  · ${e}`));
  process.exit(1);   // non-zero exit fails the CI job, which blocks the deploy
}
console.log(`✓ Site checks passed (${scripts.length} scripts, ${pages.length} pages).`);
