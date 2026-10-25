/* Shared behaviour for every page:
   mobile menu, sticky-nav state, button ripple, scroll reveals,
   and a small reward for the curious. */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- mobile menu ----- */
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  if (btn && links) {
    const setMenu = function (open) {
      links.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? '[close]' : '[menu]';
      document.body.classList.toggle('menu-open', open);
    };
    btn.addEventListener('click', function () {
      setMenu(!links.classList.contains('open'));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    /* Escape closes the menu for keyboard users */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) setMenu(false);
    });
  }

  /* ----- nav: compact + elevate once the page scrolls ----- */
  const navEl = document.querySelector('nav');
  if (navEl) {
    const onScroll = function () {
      navEl.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----- button click ripple ----- */
  /* Drop a circle at the pointer that scales up and fades out (CSS animates
     it; we only place it and clean it up). Skipped for disabled buttons and
     when the user prefers reduced motion. */
  if (!reduceMotion) {
    document.addEventListener('click', function (e) {
      const target = e.target.closest('.btn');
      if (!target || target.classList.contains('disabled')) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      /* keyboard activation reports (0,0): fall back to the button centre */
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (x - rect.left - size / 2) + 'px';
      ripple.style.top = (y - rect.top - size / 2) + 'px';
      ripple.addEventListener('animationend', function () { ripple.remove(); });
      target.appendChild(ripple);
    });
  }

  /* ----- scroll reveals with staggered children ----- */
  const revealEls = document.querySelectorAll('.reveal');

  /* items inside a section that cascade in one after another */
  revealEls.forEach(function (el) {
    const items = el.querySelectorAll('.stat, .event, .member, .repo, .resource-row, .post-card, .learn-card');
    items.forEach(function (item, i) {
      item.classList.add('stagger');
      item.style.transitionDelay = (120 + i * 80) + 'ms';
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ----- click-to-copy (e.g. the email address on the contact page) ----- */
  document.querySelectorAll('.bc-copy[data-copy]').forEach(function (btn) {
    const hint = btn.querySelector('.bc-copy-hint');
    let resetTimer;
    const flash = function (ok) {
      btn.classList.toggle('copied', ok);
      if (hint) {
        /* clear first so an identical repeat message still mutates the
           live region and gets re-announced by screen readers */
        hint.textContent = '';
        hint.textContent = ok ? 'Copied to clipboard' : 'Copy failed — press Ctrl+C';
      }
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        btn.classList.remove('copied');
        if (hint) hint.textContent = '';
      }, 1800);
    };
    btn.addEventListener('click', function () {
      const text = btn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { flash(true); }, function () { flash(false); });
      } else {
        /* fallback for older browsers / non-secure contexts */
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'absolute';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          flash(true);
        } catch (e) { flash(false); }
      }
    });
  });

  /* ----- for the curious ----- */
  console.log(
    '%cbrunel_cybersec>_ %cnice instinct, opening the console.\n' +
    'BRUNEL{v1ew_s0urce_h4cker}\n' +
    'Bring that flag to any workshop and introduce yourself.',
    'color:#6FC9D8;font-family:monospace;font-weight:bold;',
    'color:#8E8B8F;font-family:monospace;'
  );
})();
