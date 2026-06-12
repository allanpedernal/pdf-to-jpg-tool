/**
 * Tool-usage analytics + "thank you" prompt for tool pages.
 *
 * A static site can't write to data/analytics.json, so live conversions are recorded
 * in localStorage ('pdftools_usage'); the dashboard merges that over the JSON baseline.
 *
 * Conversions are detected centrally by intercepting the two ways every tool triggers
 * a download — FileSaver's saveAs() and a programmatic <a download> click — so no per-
 * tool edits are needed. Rapid multi-file downloads are debounced into one "use".
 */
(function () {
  'use strict';

  var USAGE_KEY = 'pdftools_usage';
  var VISITOR_KEY = 'pdftools_visitor';
  var DEBOUNCE_MS = 1200;
  var MAX_EVENTS = 1000;
  var FB_PAGE = 'https://www.facebook.com/PDFtoJPGandVATools';
  var geoData = null; // filled in best-effort, once per session

  /* ---------- identity ---------- */
  function genId(prefix) {
    var rnd = (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
      : Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
    return prefix + rnd;
  }
  function getVisitor() {
    var v = null;
    try { v = JSON.parse(localStorage.getItem(VISITOR_KEY) || 'null'); } catch (e) {}
    if (!v || !v.id) v = { id: genId('v_'), firstSeen: Date.now(), visits: 0 };
    return v;
  }
  function saveVisitor(v) { try { localStorage.setItem(VISITOR_KEY, JSON.stringify(v)); } catch (e) {} }
  function getSessionId() {
    var s = null;
    try { s = sessionStorage.getItem('pdftools_session'); } catch (e) {}
    if (!s) { s = genId('s_'); try { sessionStorage.setItem('pdftools_session', s); } catch (e) {} }
    return s;
  }

  /* ---------- environment fingerprint (no library) ---------- */
  function parseUA() {
    var ua = navigator.userAgent || '';
    var os = 'Unknown', browser = 'Unknown', device = 'Desktop';
    if (/Windows NT/.test(ua)) os = 'Windows';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/(iPhone|iPad|iPod)/.test(ua)) os = 'iOS';
    else if (/Mac OS X/.test(ua)) os = 'macOS';
    else if (/CrOS/.test(ua)) os = 'ChromeOS';
    else if (/Linux/.test(ua)) os = 'Linux';
    if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/OPR\/|Opera/.test(ua)) browser = 'Opera';
    else if (/SamsungBrowser/.test(ua)) browser = 'Samsung Internet';
    else if (/Firefox\/|FxiOS/.test(ua)) browser = 'Firefox';
    else if (/Edg/.test(ua)) browser = 'Edge';
    else if (/Chrome\/|CriOS/.test(ua)) browser = 'Chrome';
    else if (/Safari\//.test(ua)) browser = 'Safari';
    if (/iPad/.test(ua) || (/Android/.test(ua) && !/Mobile/.test(ua))) device = 'Tablet';
    else if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone/.test(ua)) device = 'Mobile';
    return { os: os, browser: browser, device: device };
  }

  // One best-effort IP-geolocation lookup per session (no API key; CORS-enabled).
  function loadGeo() {
    try {
      var cached = sessionStorage.getItem('pdftools_geo');
      if (cached) { geoData = JSON.parse(cached); return; }
    } catch (e) {}
    if (!window.fetch) return;
    fetch('https://ipwho.is/').then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.success !== false) {
        geoData = {
          ip: j.ip, country: j.country, countryCode: j.country_code,
          region: j.region, city: j.city,
          flag: (j.flag && j.flag.emoji) || ''
        };
        try { sessionStorage.setItem('pdftools_geo', JSON.stringify(geoData)); } catch (e) {}
      }
    }).catch(function () { /* offline / blocked — geo stays null */ });
  }

  /* ---------- which tool is this page? ---------- */
  function getTool() {
    var path = location.pathname;
    try {
      var cfg = (typeof TOOLS_CONFIG !== 'undefined') ? TOOLS_CONFIG : (window.TOOLS_CONFIG || null);
      if (cfg) {
        var cats = Object.keys(cfg);
        for (var c = 0; c < cats.length; c++) {
          var tools = cfg[cats[c]].tools || [];
          for (var i = 0; i < tools.length; i++) {
            if (tools[i].path === path || path.endsWith(tools[i].path)) {
              return { id: tools[i].id, name: tools[i].name, icon: tools[i].icon, category: cfg[cats[c]].category };
            }
          }
        }
      }
    } catch (e) { /* fall through */ }
    var slug = (path.split('/').pop() || '').replace(/\.html$/, '') || 'unknown';
    return { id: slug, name: slug, icon: '🧰', category: '' };
  }

  /* ---------- record one conversion (with full detail) ---------- */
  function recordUsage(tool) {
    var now = new Date();
    var today = now.toISOString().slice(0, 10); // YYYY-MM-DD
    var data;
    try { data = JSON.parse(localStorage.getItem(USAGE_KEY) || '{}'); } catch (e) { data = {}; }
    data.tools = data.tools || {};
    data.daily = data.daily || {};
    data.events = data.events || [];

    // aggregates
    if (!data.tools[tool.id]) data.tools[tool.id] = { name: tool.name, icon: tool.icon, category: tool.category || '', count: 0 };
    data.tools[tool.id].count++;
    data.daily[today] = (data.daily[today] || 0) + 1;
    data.lastUsed = now.getTime();
    data.lastTool = tool.id;

    // visitor (new vs returning)
    var v = getVisitor();
    var isNew = !v.visits;
    v.visits = (v.visits || 0) + 1;
    v.lastSeen = now.getTime();
    saveVisitor(v);

    // detailed event
    var ua = parseUA();
    data.events.push({
      ts: now.getTime(),
      iso: now.toISOString(),
      date: today,
      hour: now.getHours(),
      tool: tool.id,
      toolName: tool.name,
      toolIcon: tool.icon,
      category: tool.category || '',
      visitor: v.id,
      newVisitor: isNew,
      session: getSessionId(),
      browser: ua.browser,
      os: ua.os,
      device: ua.device,
      screen: (window.screen ? screen.width + '×' + screen.height : ''),
      viewport: window.innerWidth + '×' + window.innerHeight,
      lang: navigator.language || '',
      tz: (window.Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone : '',
      referrer: document.referrer || 'direct',
      page: location.pathname,
      geo: geoData || null
    });
    if (data.events.length > MAX_EVENTS) data.events = data.events.slice(-MAX_EVENTS);

    try { localStorage.setItem(USAGE_KEY, JSON.stringify(data)); } catch (e) { /* quota */ }
  }

  /* ---------- the "thank you" modal ---------- */
  var modalEl = null;

  function shareUrl() {
    var c = document.querySelector('link[rel="canonical"]');
    if (c && c.href) return c.href;
    var og = document.querySelector('meta[property="og:url"]');
    if (og && og.content) return og.content;
    return location.origin + location.pathname;
  }
  function shareTitle() {
    var og = document.querySelector('meta[property="og:title"]');
    return (og && og.content) || document.title || 'PDF Tools';
  }

  function injectStyles() {
    if (document.getElementById('ty-modal-css')) return;
    var st = document.createElement('style');
    st.id = 'ty-modal-css';
    st.textContent = [
      '.ty-overlay{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;',
      'padding:1.25rem;background:rgba(15,23,42,.55);backdrop-filter:blur(3px);opacity:0;transition:opacity .2s ease}',
      '.ty-overlay.show{opacity:1}',
      '.ty-card{width:100%;max-width:420px;background:var(--card-bg,#fff);color:var(--text-primary,#1e293b);',
      'border:1px solid var(--card-border,rgba(0,0,0,.08));border-radius:1.25rem;box-shadow:0 24px 60px rgba(15,23,42,.28);',
      'padding:1.75rem 1.6rem 1.5rem;text-align:center;transform:translateY(12px) scale(.97);transition:transform .22s cubic-bezier(.34,1.56,.64,1)}',
      '.ty-overlay.show .ty-card{transform:none}',
      '.ty-emoji{width:60px;height:60px;border-radius:50%;margin:0 auto .85rem;display:flex;align-items:center;justify-content:center;',
      'font-size:1.9rem;background:linear-gradient(135deg,rgba(59,130,246,.15),rgba(6,182,212,.15))}',
      '.ty-card h3{font-size:1.25rem;font-weight:800;margin:0 0 .4rem}',
      '.ty-card p{color:var(--text-secondary,#64748b);font-size:.93rem;line-height:1.5;margin:0 0 1.25rem}',
      '.ty-fb-cta{display:flex;align-items:center;justify-content:center;gap:.5rem;width:100%;',
      'background:#1877F2;color:#fff;border:none;border-radius:.7rem;padding:.72rem;font-weight:700;font-size:.95rem;',
      'text-decoration:none;margin-bottom:1rem;box-shadow:0 6px 16px rgba(24,119,242,.32);transition:transform .14s ease,filter .14s ease}',
      '.ty-fb-cta:hover{transform:translateY(-1px);filter:brightness(1.05);color:#fff}',
      '.ty-share-label{display:block;font-size:.74rem;color:var(--text-secondary,#64748b);margin-bottom:.5rem;font-weight:600}',
      '.ty-share{display:flex;gap:.55rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.1rem}',
      '.ty-btn{width:46px;height:46px;border-radius:50%;border:none;cursor:pointer;color:#fff;font-size:1.15rem;',
      'display:inline-flex;align-items:center;justify-content:center;text-decoration:none;transition:transform .14s ease,filter .14s ease}',
      '.ty-btn:hover{transform:translateY(-2px) scale(1.06);filter:brightness(1.05);color:#fff}',
      '.ty-close{background:transparent;border:none;color:var(--text-secondary,#64748b);font-weight:600;font-size:.88rem;cursor:pointer;padding:.4rem .8rem;border-radius:.5rem}',
      '.ty-close:hover{color:var(--text-primary,#1e293b)}',
      '.ty-copied{position:fixed;left:50%;bottom:2rem;transform:translateX(-50%);background:#0f172a;color:#fff;',
      'font-size:.82rem;font-weight:600;padding:.5rem .9rem;border-radius:.5rem;z-index:2100;opacity:0;transition:opacity .2s}',
      '.ty-copied.show{opacity:1}',
      '@media (prefers-reduced-motion:reduce){.ty-overlay,.ty-card{transition:none}}'
    ].join('');
    document.head.appendChild(st);
  }

  function buildModal() {
    injectStyles();
    var u = encodeURIComponent(shareUrl());
    var t = encodeURIComponent(shareTitle());
    var overlay = document.createElement('div');
    overlay.className = 'ty-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Thank you');
    overlay.innerHTML =
      '<div class="ty-card">' +
        '<div class="ty-emoji">🎉</div>' +
        '<h3>Thank you for using our tool!</h3>' +
        '<p>We hope it saved you time! 💙 Please <strong>like, share &amp; follow</strong> our Facebook page — and stay tuned, more handy tools are on the way!</p>' +
        '<a class="ty-fb-cta" target="_blank" rel="noopener" href="' + FB_PAGE + '"><i class="bi bi-facebook"></i> Like &amp; Follow our page</a>' +
        '<span class="ty-share-label">or share it with friends</span>' +
        '<div class="ty-share">' +
          '<a class="ty-btn" style="background:#1877F2" target="_blank" rel="noopener" aria-label="Share on Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + u + '"><i class="bi bi-facebook"></i></a>' +
          '<a class="ty-btn" style="background:#000" target="_blank" rel="noopener" aria-label="Share on X" href="https://twitter.com/intent/tweet?url=' + u + '&text=' + t + '"><i class="bi bi-twitter-x"></i></a>' +
          '<a class="ty-btn" style="background:#0A66C2" target="_blank" rel="noopener" aria-label="Share on LinkedIn" href="https://www.linkedin.com/sharing/share-offsite/?url=' + u + '"><i class="bi bi-linkedin"></i></a>' +
          '<a class="ty-btn" style="background:#25D366" target="_blank" rel="noopener" aria-label="Share on WhatsApp" href="https://api.whatsapp.com/send?text=' + t + '%20' + u + '"><i class="bi bi-whatsapp"></i></a>' +
          '<button class="ty-btn ty-copy" style="background:#06b6d4" type="button" aria-label="Copy link"><i class="bi bi-link-45deg"></i></button>' +
        '</div>' +
        '<button class="ty-close" type="button">Maybe later</button>' +
      '</div>';

    function close() {
      overlay.classList.remove('show');
      setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 220);
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e) { if (e.key === 'Escape') close(); }

    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.ty-close').addEventListener('click', close);
    document.addEventListener('keydown', onKey);

    overlay.querySelector('.ty-copy').addEventListener('click', async function () {
      var link = shareUrl();
      try { await navigator.clipboard.writeText(link); }
      catch (e) {
        var ta = document.createElement('textarea'); ta.value = link;
        document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e2) {} ta.remove();
      }
      var toast = document.createElement('div');
      toast.className = 'ty-copied'; toast.textContent = 'Link copied!';
      document.body.appendChild(toast);
      requestAnimationFrame(function () { toast.classList.add('show'); });
      setTimeout(function () { toast.classList.remove('show'); setTimeout(function () { toast.remove(); }, 220); }, 1500);
    });

    return overlay;
  }

  function showThankYou() {
    if (modalEl && modalEl.parentNode) return; // already open
    modalEl = buildModal();
    document.body.appendChild(modalEl);
    requestAnimationFrame(function () { modalEl.classList.add('show'); });
  }

  /* ---------- download interception ---------- */
  var debounceTimer = null;
  function onDownload() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      recordUsage(getTool());
      showThankYou();
    }, DEBOUNCE_MS);
  }

  // 1) FileSaver's saveAs() — wrap whatever is (or gets) assigned to window.saveAs.
  function wrapFn(v) {
    if (typeof v !== 'function' || v.__tyTracked) return v;
    var w = function () { var r = v.apply(this, arguments); onDownload(); return r; };
    w.__tyTracked = true;
    return w;
  }
  (function hookSaveAs() {
    var store = wrapFn(window.saveAs);
    try {
      Object.defineProperty(window, 'saveAs', {
        configurable: true,
        get: function () { return store; },
        set: function (v) { store = wrapFn(v); }
      });
    } catch (e) { if (window.saveAs) try { window.saveAs = store; } catch (e2) {} }
  })();

  // 2) Programmatic <a download> clicks.
  var origClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    var isDownload = this.hasAttribute('download') || (typeof this.download === 'string' && this.download !== '');
    var r = origClick.apply(this, arguments);
    if (isDownload) onDownload();
    return r;
  };

  // Kick off the best-effort geo lookup so it's cached before the first conversion.
  loadGeo();

  // Expose for manual/testing use.
  window.PDFToolsAnalytics = { record: function () { recordUsage(getTool()); }, thankYou: showThankYou };
})();
