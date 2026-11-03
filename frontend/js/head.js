/* Runs in <head>, before the page paints, on every page.
   It's a file rather than an inline <script> so the Content-Security-Policy
   can be script-src 'self' with no 'unsafe-inline' or hashes to maintain.

   1. Skip the boot screen on repeat visits this session (preloader.js).
   2. Apply the visitor's saved theme before first paint, so a light-theme
      visitor never sees a dark flash. Dark is the default; only an explicit
      choice made with the nav toggle (site.js) switches it. */
(function () {
  var root = document.documentElement;
  try { if (sessionStorage.getItem('booted')) root.classList.add('booted'); } catch (e) {}
  try { if (localStorage.getItem('theme') === 'light') root.setAttribute('data-theme', 'light'); } catch (e) {}
})();
