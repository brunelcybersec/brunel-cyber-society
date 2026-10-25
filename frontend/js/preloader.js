/* Boot screen: plays once per browser session, then gets out of the way.
   The inline <head> script adds .booted to <html> on repeat visits so the
   overlay never even flashes; this file runs the animation on first visit.

   Robustness:
   - every timer is tracked and cleared on exit (no work against a removed node)
   - finish() runs at most once (normal end, skip, or safety all funnel here)
   - the exit waits for the page to actually load (capped by a safety timeout)
   - a click or Esc/Enter skips it; background scroll is locked while it shows */
(function () {
  var pl = document.getElementById('preloader');
  if (!pl) return;
  var root = document.documentElement;

  /* --- timer bookkeeping so nothing leaks past finish() --- */
  var timers = [];
  function after(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; }
  function every(fn, ms) { var id = setInterval(fn, ms); timers.push(id); return id; }
  function clearTimers() {
    timers.forEach(function (id) { clearTimeout(id); clearInterval(id); });
    timers = [];
  }

  var done = false;
  function finish() {
    if (done) return;            /* only ever tear down once */
    done = true;
    clearTimers();
    document.removeEventListener('keydown', onKey);
    try { sessionStorage.setItem('booted', '1'); } catch (e) {}
    root.classList.remove('pl-lock');
    pl.classList.add('pl-done');
    after(function () { if (pl.parentNode) pl.parentNode.removeChild(pl); }, 600);
  }

  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish();
  }

  /* skip instantly on repeat visits this session, or if reduced motion */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (root.classList.contains('booted') || reduce) {
    try { sessionStorage.setItem('booted', '1'); } catch (e) {}
    if (pl.parentNode) pl.parentNode.removeChild(pl);
    return;
  }

  /* let impatient visitors bail out */
  pl.addEventListener('click', finish);
  document.addEventListener('keydown', onKey);
  root.classList.add('pl-lock');               /* freeze background scroll */

  /* only hide once the page is genuinely ready (or the safety timeout wins) */
  var pageReady = document.readyState === 'complete';
  if (!pageReady) {
    window.addEventListener('load', function () { pageReady = true; }, { once: true });
  }
  function exitWhenReady() {
    if (pageReady) finish();
    else window.addEventListener('load', finish, { once: true });
  }

  var logEl = pl.querySelector('.pl-log');
  var fillEl = pl.querySelector('.pl-fill');
  var pctEl = pl.querySelector('.pl-pct');
  var statusEl = pl.querySelector('.pl-status');
  var brandEl = pl.querySelector('.pl-brand-text');

  /* skip hint (added here so the markup stays simple in every page) */
  var inner = pl.querySelector('.pl-inner');
  if (inner) {
    var hint = document.createElement('div');
    hint.className = 'pl-skip';
    hint.textContent = '[ click anywhere to skip ]';
    inner.appendChild(hint);
  }

  var lines = [
    '> initializing brunel_cybersec',
    '> mounting /dev/curiosity ... ok',
    '> loading modules: workshops · ctf · talks',
    '> establishing secure channel ... ok',
    '> decrypting payload'
  ];

  function addLine(text, ok) {
    var d = document.createElement('div');
    if (ok) d.className = 'ok';
    d.textContent = text;
    logEl.appendChild(d);
  }

  /* progress bar (CSS width transition) + counting percentage */
  requestAnimationFrame(function () { fillEl.style.width = '100%'; });
  var pct = 0;
  var pctId = every(function () {
    pct = Math.min(100, pct + 3 + Math.floor(Math.random() * 9));
    pctEl.textContent = pct + '%';
    if (pct >= 100) clearInterval(pctId);
  }, 95);

  /* type the boot lines one by one with a little jitter */
  var i = 0;
  (function nextLine() {
    if (i < lines.length) {
      addLine(lines[i]);
      i++;
      after(nextLine, 210 + Math.floor(Math.random() * 160));
    } else {
      after(reveal, 240);
    }
  })();

  /* scramble-decrypt the brand wordmark, then glitch out */
  function reveal() {
    addLine('> access granted', true);
    statusEl.textContent = 'access granted';
    statusEl.className = 'pl-status ok';

    var target = 'brunel_cybersec';
    var glyphs = '01<>/|_=+#$%&*[]{}abcdef0123456789';
    var frame = 0;
    var scrambleId = every(function () {
      var out = '';
      for (var c = 0; c < target.length; c++) {
        out += (c < frame)
          ? target.charAt(c)
          : glyphs.charAt(Math.floor(Math.random() * glyphs.length));
      }
      brandEl.textContent = out;
      frame++;
      if (frame > target.length) {
        clearInterval(scrambleId);     /* stop only the scramble; safety timer stays armed */
        brandEl.textContent = target;
        pl.classList.add('pl-flash');
        after(exitWhenReady, 460);
      }
    }, 38);
  }

  /* hard safety: never trap the visitor, whatever happens */
  after(function () { finish(); }, 6000);
})();
