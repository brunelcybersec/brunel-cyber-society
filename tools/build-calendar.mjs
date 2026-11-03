#!/usr/bin/env node
/* ============================================================
   build-calendar.mjs
   ------------------------------------------------------------
   Turns the events in frontend/js/data.js into an iCalendar feed
   (frontend/events.ics, RFC 5545) that students can subscribe to
   from Google Calendar, Apple Calendar or Outlook. Subscribed
   calendars re-download the feed by themselves, so a new event in
   data.js reaches everyone's calendar with no extra step.

   deploy.yml runs this before publishing, so the live feed always
   matches data.js. The generated file is git-ignored.

   Run it by hand (to preview locally):   node tools/build-calendar.mjs
   No npm install needed: built-in Node (18+) only.
   ============================================================ */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'frontend', 'js', 'data.js');
const OUT  = join(ROOT, 'frontend', 'events.ics');

/* Europe/London, so timed events are right on both sides of the clock change.
   Calendar apps need the rules spelled out alongside TZID. */
const VTIMEZONE = [
  'BEGIN:VTIMEZONE', 'TZID:Europe/London',
  'BEGIN:DAYLIGHT', 'TZOFFSETFROM:+0000', 'TZOFFSETTO:+0100', 'TZNAME:BST',
  'DTSTART:19700329T010000', 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU', 'END:DAYLIGHT',
  'BEGIN:STANDARD', 'TZOFFSETFROM:+0100', 'TZOFFSETTO:+0000', 'TZNAME:GMT',
  'DTSTART:19701025T020000', 'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU', 'END:STANDARD',
  'END:VTIMEZONE',
];

/** Escape text for an iCalendar value (RFC 5545 §3.3.11). */
const icsText = (s) => String(s ?? '')
  .replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** Fold lines longer than 75 octets, as the spec requires (continuations start with a space). */
function fold(line) {
  const bytes = Buffer.from(line, 'utf8');
  if (bytes.length <= 75) return line;
  const parts = [];
  let start = 0;
  while (start < bytes.length) {
    let end = Math.min(start + (start === 0 ? 75 : 74), bytes.length);
    /* never split a multi-byte UTF-8 character: back up to a lead byte */
    while (end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
    parts.push(bytes.subarray(start, end).toString('utf8'));
    start = end;
  }
  return parts.join('\r\n ');
}

/** "7:00pm" / "11am" / "19:00" -> "1900", or null. */
function to24(t) {
  const m = /^(\d{1,2})(?:[:.](\d{2}))?\s*(am|pm)?$/i.exec(t.trim());
  if (!m) return null;
  let h = Number(m[1]);
  const min = m[2] || '00';
  const ap = (m[3] || '').toLowerCase();
  if (ap === 'pm' && h < 12) h += 12;
  if (ap === 'am' && h === 12) h = 0;
  if (!ap && !m[2]) return null;   /* a bare "5" is too ambiguous to guess */
  if (h > 23 || Number(min) > 59) return null;
  return String(h).padStart(2, '0') + min;
}

/**
 * Work out start/end times: explicit start/end fields win, otherwise try
 * the human-readable 'where' text ("1:00pm - 5:00pm", "18:00 · Room 2").
 * @returns {{start: string, end: string} | null} HHMM strings, or null for all-day.
 */
function eventTimes(e) {
  if (e.start) {
    const s = to24(e.start);
    if (!s) throw new Error(`event "${e.title}": start "${e.start}" should look like "19:00"`);
    const en = e.end ? to24(e.end) : null;
    if (e.end && !en) throw new Error(`event "${e.title}": end "${e.end}" should look like "21:00"`);
    return { start: s, end: en };
  }
  const text = String(e.where || '');
  const range = /(\d{1,2}(?:[:.]\d{2})?\s*(?:am|pm)?)\s*[-–]\s*(\d{1,2}(?:[:.]\d{2})?\s*(?:am|pm)?)/i.exec(text);
  if (range) {
    let [a, b] = [range[1], range[2]];
    /* "1 - 5pm": the first time borrows the second's am/pm */
    const apB = /(am|pm)$/i.exec(b.trim());
    if (apB && !/(am|pm)$/i.test(a.trim())) a += apB[1];
    const s = to24(a), en = to24(b);
    if (s && en) return { start: s, end: en };
  }
  const single = /\b(\d{1,2}(?:[:.]\d{2})\s*(?:am|pm)?|\d{1,2}\s*(?:am|pm))\b/i.exec(text);
  if (single && to24(single[1])) return { start: to24(single[1]), end: null };
  return null;
}

/** HHMM + minutes, clamped to the same day (events never run past midnight here). */
function plus(hhmm, mins) {
  const total = Math.min(Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(2)) + mins, 23 * 60 + 59);
  return String(Math.floor(total / 60)).padStart(2, '0') + String(total % 60).padStart(2, '0');
}

/**
 * Build the feed text from SITE_DATA. Exported so check-site.mjs can
 * validate the events without writing a file.
 * @param {object} data window.SITE_DATA
 * @param {Date} [now] For DTSTAMP; injectable for tests.
 * @returns {string}
 */
export function buildCalendar(data, now = new Date()) {
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Brunel Cyber Security Society//brunelcs.org//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Brunel Cyber Security Society',
    'X-WR-CALDESC:Workshops\\, CTFs and socials from Brunel Cyber Security Society. brunelcs.org',
    'X-WR-TIMEZONE:Europe/London',
    'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
    'X-PUBLISHED-TTL:PT12H',
    ...VTIMEZONE,
  ];

  for (const e of data.events || []) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date || '')) continue;   /* check-site reports these */
    const day = e.date.replace(/-/g, '');
    /* UID must stay the same across rebuilds or calendars show duplicates */
    const uid = createHash('sha1').update(e.date + '|' + e.title).digest('hex').slice(0, 16) + '@brunelcs.org';
    const times = eventTimes(e);
    lines.push('BEGIN:VEVENT', `UID:${uid}`, `DTSTAMP:${stamp}`);
    if (times) {
      lines.push(`DTSTART;TZID=Europe/London:${day}T${times.start}00`);
      lines.push(`DTEND;TZID=Europe/London:${day}T${times.end || plus(times.start, 120)}00`);
    } else {
      /* all-day: DTEND is exclusive, so it's the following day */
      const next = new Date(e.date + 'T00:00:00Z');
      next.setUTCDate(next.getUTCDate() + 1);
      lines.push(`DTSTART;VALUE=DATE:${day}`, `DTEND;VALUE=DATE:${next.toISOString().slice(0, 10).replace(/-/g, '')}`);
    }
    lines.push(`SUMMARY:${icsText(e.title)}`);
    const desc = [e.desc, e.where && `When: ${e.when}, ${e.where}`, 'More: https://brunelcs.org/pages/events.html'].filter(Boolean).join('\n\n');
    lines.push(`DESCRIPTION:${icsText(desc)}`);
    lines.push(`LOCATION:${icsText(e.location || 'Brunel University London, Uxbridge UB8 3PH')}`);
    if (e.tag) lines.push(`CATEGORIES:${icsText(e.tag)}`);
    lines.push('URL:https://brunelcs.org/pages/events.html', 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}

/** Load window.SITE_DATA from data.js the same way check-site.mjs does. */
export async function loadSiteData() {
  const sandbox = { window: {} };
  vm.runInNewContext(await readFile(DATA, 'utf8'), sandbox, { filename: 'frontend/js/data.js' });
  return sandbox.window.SITE_DATA;
}

/* run directly (not imported): write the file */
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const data = await loadSiteData();
  const ics = buildCalendar(data);
  await writeFile(OUT, ics);
  console.log(`✓ Wrote frontend/events.ics (${(data.events || []).length} events).`);
}
