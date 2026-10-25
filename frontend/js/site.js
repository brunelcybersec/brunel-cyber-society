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

  /* ----- phishing alert: homepage pop-up + site-wide banner ----- */
  /* Set to false to switch off the pop-up AND the banner on every page
     once the campaign is over. The link check below stays on. */
  const PHISHING_ALERT = true;

  const X_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const canDialog = typeof HTMLDialogElement === 'function';
  const storage = function (store, key, value) {
    try {
      if (value === undefined) return store.getItem(key);
      store.setItem(key, value);
    } catch (e) { return null; }
  };
  /* reuse the nav's own stay-safe link so the URL is right on every page (incl. 404) */
  const navSafe = document.querySelector('.nav-links a[href$="security-basics.html"]');
  const guideHref = (navSafe ? navSafe.getAttribute('href') : 'security-basics.html') + '#phishing';
  const onSafePage = !!document.getElementById('phishing');

  /* pop-up: homepage only, once per visit, after the boot screen has gone */
  if (PHISHING_ALERT && canDialog && document.body.classList.contains('home') &&
      !storage(sessionStorage, 'phAlertSeen')) {
    const pop = document.createElement('dialog');
    pop.className = 'ph-pop';
    pop.setAttribute('aria-labelledby', 'ph-pop-title');
    pop.innerHTML =
      '<div class="ph-pop-top">' +
        '<p class="ph-live"><span class="ph-dot" aria-hidden="true"></span>PHISHING ALERT <span class="date">· 23 Oct 2026</span></p>' +
        '<form method="dialog"><button class="ph-x" aria-label="Close alert">' + X_ICON + '</button></form>' +
      '</div>' +
      '<div class="ph-pop-body">' +
        '<h2 id="ph-pop-title">Phishing emails are targeting Brunel students</h2>' +
        '<p class="ph-lede">Brunel IT Security has warned about emails posing as training, career or "opportunity" offers that push you to click, register or reply fast.</p>' +
        '<ol class="ph-steps">' +
          '<li><span><strong>Don\'t click or share details</strong> unless you\'re sure it\'s genuine.</span></li>' +
          '<li><span><strong>Don\'t trust the logo.</strong> Brunel branding is easy to fake.</span></li>' +
          '<li><span><strong>Report it</strong> with the Report Phishing button in Outlook.</span></li>' +
          '<li><span><strong>Already clicked?</strong> Contact the Brunel IT Service Desk.</span></li>' +
        '</ol>' +
        '<form method="dialog" class="ph-actions">' +
          '<a class="btn solid" href="' + guideHref + '">How to spot phishing &rarr;</a>' +
          '<button class="btn ghost-btn" autofocus>Got it</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(pop);
    /* clicking the blurred area outside the box closes it */
    pop.addEventListener('click', function (e) { if (e.target === pop) pop.close(); });

    const show = function () {
      if (pop.open) return;
      storage(sessionStorage, 'phAlertSeen', '1');
      pop.showModal();
    };
    const pl = document.getElementById('preloader');
    if (!pl || !pl.isConnected || pl.classList.contains('pl-done')) {
      setTimeout(show, 900);
    } else {
      const mo = new MutationObserver(function () {
        if (!pl.isConnected || pl.classList.contains('pl-done')) {
          mo.disconnect();
          setTimeout(show, 700);
        }
      });
      mo.observe(pl, { attributes: true, attributeFilter: ['class'] });
      mo.observe(document.body, { childList: true });
    }
  }

  /* banner: every page except stay-safe; the X hides it on this device for good */
  if (PHISHING_ALERT && !onSafePage && storage(localStorage, 'phBannerClosed') !== '1') {
    const bar = document.createElement('div');
    bar.className = 'ph-banner';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Phishing warning');
    bar.innerHTML =
      '<span class="ph-live"><span class="ph-dot" aria-hidden="true"></span>PHISHING ALERT</span>' +
      '<p class="ph-b-text"><strong>Fake training and career emails are targeting Brunel students.</strong>' +
        '<span class="ph-b-more"> Don\'t click or reply unless you\'re sure.</span></p>' +
      '<a class="ph-b-link" href="' + guideHref + '">How to spot them &rarr;</a>' +
      '<button class="ph-x" type="button" aria-label="Dismiss phishing warning">' + X_ICON + '</button>';
    document.body.appendChild(bar);
    document.documentElement.classList.add('has-ph-banner');
    bar.querySelector('.ph-x').addEventListener('click', function () {
      bar.remove();
      document.documentElement.classList.remove('has-ph-banner');
      storage(localStorage, 'phBannerClosed', '1');
    });
  }

  /* ----- "leaving brunelcs.org" check on external links ----- */
  /* Pauses before any link that leaves the site and shows the real
     destination, host in bold. Same-site links, mailto: and
     ctrl/cmd/shift/middle clicks are left alone. */
  if (canDialog) {
    const OUR_HOSTS = ['brunelcs.org', 'www.brunelcs.org', location.hostname];
    const dlg = document.createElement('dialog');
    dlg.className = 'leave-dlg';
    dlg.setAttribute('aria-labelledby', 'leave-title');
    dlg.innerHTML =
      '<form method="dialog" class="leave-inner">' +
        '<p class="leave-tag">// leaving brunelcs.org</p>' +
        '<h2 id="leave-title">Check where this link goes</h2>' +
        '<p>You\'re about to open an external site. Read the address before you continue, the same way you would in an email.</p>' +
        '<span class="leave-url"></span>' +
        '<p class="leave-tip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5z"/><path d="M9 12l2 2 4-4"/></svg>' +
          '<span>Phishing links copy real names. The part in bold is the site you\'ll actually land on.</span></p>' +
        '<div class="leave-actions">' +
          '<button class="btn solid" value="go">Open link &#8599;</button>' +
          '<button class="btn ghost-btn" value="stay" autofocus>Stay here</button>' +
        '</div>' +
        '<label class="leave-skip"><input type="checkbox"> don\'t ask again on this device</label>' +
      '</form>';
    document.body.appendChild(dlg);
    const urlEl = dlg.querySelector('.leave-url');
    const skipEl = dlg.querySelector('.leave-skip input');
    let pending = null;

    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a || storage(localStorage, 'leaveCheckOff') === '1') return;
      let u;
      try { u = new URL(a.href, location.href); } catch (err) { return; }
      if (!/^https?:$/.test(u.protocol) || OUR_HOSTS.indexOf(u.hostname) !== -1) return;

      e.preventDefault();
      pending = { href: u.href, newTab: a.target === '_blank' };
      /* textContent only, so a crafted URL can never inject markup */
      const host = document.createElement('strong');
      host.textContent = u.hostname.replace(/^www\./, '');
      const rest = u.href.slice(u.origin.length);
      urlEl.replaceChildren(host, document.createTextNode(rest === '/' ? '' : rest));
      skipEl.checked = false;
      dlg.returnValue = '';   /* Escape keeps the previous value, so a stale "go" must not linger */
      dlg.showModal();
    });

    dlg.addEventListener('close', function () {
      if (dlg.returnValue === 'go' && pending) {
        if (skipEl.checked) storage(localStorage, 'leaveCheckOff', '1');
        if (pending.newTab) window.open(pending.href, '_blank', 'noopener');
        else location.href = pending.href;
      }
      pending = null;
    });
  }

  /* ----- for the curious ----- */
  console.log(
    '%cbrunel_cybersec>_ %cnice instinct, opening the console.\n' +
    'BRUNEL{v1ew_s0urce_h4cker}\n' +
    'Bring that flag to any workshop and introduce yourself.',
    'color:#6FC9D8;font-family:monospace;font-weight:bold;',
    'color:#8E8B8F;font-family:monospace;'
  );
})();
