#!/usr/bin/env node
/* ============================================================
   check-contrast.mjs
   ------------------------------------------------------------
   Checks the text colour tokens in frontend/css/styles.css against
   the backgrounds they sit on, in BOTH themes, using the WCAG 2.x
   contrast formula. Body-text tokens need 4.5:1 (AA); the faint
   placeholder token needs 3:1 (it is only used for large or
   decorative text). Exits non-zero on failure, so check-site.mjs
   and CI catch a colour change that would hurt readability.

   Run it by hand:   node tools/check-contrast.mjs
   ============================================================ */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const CSS = join(dirname(fileURLToPath(import.meta.url)), '..', 'frontend', 'css', 'styles.css');

/* [token, minimum ratio] */
const TEXT = [
  ['--text', 4.5], ['--text-2', 4.5], ['--text-3', 4.5], ['--muted', 4.5],
  ['--text-dim', 4.5], ['--warm', 4.5], ['--cool', 4.5], ['--ok', 4.5],
  ['--text-faint', 3],
];
const BACKGROUNDS = ['--bg', '--surface', '--surface-2'];

/** Pull "--name: #hex;" pairs out of the first rule matching `selector`. */
function tokens(css, selector) {
  const start = css.indexOf(selector + ' {');
  if (start === -1) throw new Error(`no "${selector} {" block in styles.css`);
  const body = css.slice(start, css.indexOf('}', start));
  const out = {};
  for (const [, name, hex] of body.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})\b/gi)) out[name] = hex;
  return out;
}

/** WCAG relative luminance of a #rrggbb colour. */
function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const css = await readFile(CSS, 'utf8');
const dark = tokens(css, ':root');
const light = { ...dark, ...tokens(css, ':root[data-theme="light"]') };

let failures = 0;
for (const [theme, t] of [['dark', dark], ['light', light]]) {
  console.log(`\n${theme} theme`);
  console.log('  token'.padEnd(16) + BACKGROUNDS.map((b) => b.padStart(13)).join(''));
  for (const [tok, min] of TEXT) {
    if (!t[tok]) { console.log(`  ${tok}: not set`); failures++; continue; }
    const cells = BACKGROUNDS.map((bg) => {
      const r = ratio(t[tok], t[bg]);
      const ok = r >= min;
      if (!ok) failures++;
      return ((ok ? '' : '✗ ') + r.toFixed(2) + ':1').padStart(13);
    });
    console.log(`  ${tok}`.padEnd(16) + cells.join(''));
  }
}

if (failures) {
  console.error(`\n✗ ${failures} colour pair(s) below the WCAG minimum.`);
  process.exit(1);
}
console.log('\n✓ All text tokens meet WCAG AA in both themes.');
