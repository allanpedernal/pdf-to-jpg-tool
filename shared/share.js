/**
 * Shared social-share widget for tool pages.
 * Injects a floating vertical share rail fixed to the right edge of the screen.
 * Each link points at the page's canonical URL so platforms render the share
 * card from the page's existing Open Graph tags.
 *
 * Theme-aware via the site's CSS vars (--card-bg, --text-primary, ...).
 * No dependencies beyond Bootstrap Icons (already loaded on tool pages).
 */
(function () {
  'use strict';

  function metaContent(sel) {
    const el = document.querySelector(sel);
    return el ? el.getAttribute('content') || '' : '';
  }

  // Canonical share URL: <link rel=canonical> -> og:url -> clean location.
  function getShareUrl() {
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon && canon.href) return canon.href;
    const og = metaContent('meta[property="og:url"]');
    if (og) return og;
    return location.origin + location.pathname;
  }

  const url = getShareUrl();
  const title = metaContent('meta[property="og:title"]') || document.title;
  const text = metaContent('meta[property="og:description"]') || title;

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const d = encodeURIComponent(text);

  // [label, bootstrap-icon, brand-color, href]
  const TARGETS = [
    ['Share on Facebook', 'facebook', '#1877F2', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['Share on X', 'twitter-x', '#000000', `https://twitter.com/intent/tweet?url=${u}&text=${t}`],
    ['Share on LinkedIn', 'linkedin', '#0A66C2', `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    ['Share on WhatsApp', 'whatsapp', '#25D366', `https://api.whatsapp.com/send?text=${t}%20${u}`],
    ['Share on Reddit', 'reddit', '#FF4500', `https://www.reddit.com/submit?url=${u}&title=${t}`],
    ['Share by Email', 'envelope-fill', '#64748b', `mailto:?subject=${t}&body=${d}%0A%0A${u}`],
  ];

  function btn(label, icon, color, href) {
    const isMail = href.startsWith('mailto:');
    return `<a class="share-btn" style="--sc:${color}" href="${href}" aria-label="${label}" title="${label}"`
      + (isMail ? '' : ' target="_blank" rel="noopener noreferrer"')
      + `><i class="bi bi-${icon}"></i></a>`;
  }

  const targetButtons = TARGETS.map((x) => btn(...x)).join('');
  const copyBtn = `<button type="button" class="share-btn share-copy" style="--sc:#06b6d4" aria-label="Copy link" title="Copy link"><i class="bi bi-link-45deg"></i></button>`;

  // ---- styles ----
  const css = `
  /* Floating Share widget: a gradient FAB in the bottom-right corner (directly
     above the scroll-to-top button, same style) that expands the buttons upward
     on tap. Consistent on all screen sizes. */
  .share-rail{position:fixed;right:2rem;bottom:2rem;z-index:1030;
    display:flex;flex-direction:column-reverse;align-items:center;gap:.5rem}
  .share-cap{display:none}
  .share-btn{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;
    border-radius:50%;border:none;cursor:pointer;font-size:1.15rem;color:#fff;background:var(--sc);
    text-decoration:none;transition:transform .15s ease,box-shadow .15s ease,filter .15s ease;line-height:1}
  .share-btn:hover{transform:scale(1.1);filter:brightness(1.05);box-shadow:0 6px 16px color-mix(in srgb,var(--sc) 45%,transparent);color:#fff}
  .share-btn:focus-visible{outline:3px solid color-mix(in srgb,var(--sc) 55%,transparent);outline-offset:2px}
  /* The toggle is a gradient FAB matching the scroll-to-top button */
  .share-rail .share-toggle{display:inline-flex;width:52px;height:52px;font-size:1.25rem;
    background:linear-gradient(135deg,#3b82f6,#06b6d4);box-shadow:0 4px 16px rgba(59,130,246,.4)}
  .share-rail .share-toggle:hover{transform:translateY(-3px) scale(1.04);filter:none}
  /* Collapsed: only the FAB shows; .open reveals the platform buttons */
  .share-rail:not(.open) > :not(.share-toggle){display:none}
  /* Expanded: compact 2-column grid so all buttons fit without clipping behind
     the nav; scrolls instead of clipping on very short screens. */
  .share-rail.open{display:grid;grid-template-columns:repeat(2,auto);gap:.45rem;
    justify-items:center;align-items:center;padding:.6rem;border-radius:1.25rem;
    background:var(--card-bg,#fff);border:1px solid var(--card-border,rgba(0,0,0,.08));
    box-shadow:0 10px 28px rgba(15,23,42,.16);max-height:calc(100dvh - 9rem);overflow-y:auto}
  .share-rail.open .share-toggle{grid-column:1 / -1;order:9}
  /* Smooth show/hide: buttons pop in (staggered) and fade out */
  @keyframes shareBtnIn{from{opacity:0;transform:scale(.3) translateY(10px)}to{opacity:1;transform:scale(1)}}
  @keyframes shareBtnOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.4) translateY(8px)}}
  .share-rail.open:not(.closing) > .share-btn:not(.share-toggle){animation:shareBtnIn .24s cubic-bezier(.34,1.56,.64,1) backwards}
  .share-rail.open:not(.closing) > .share-btn:nth-child(3){animation-delay:.02s}
  .share-rail.open:not(.closing) > .share-btn:nth-child(4){animation-delay:.04s}
  .share-rail.open:not(.closing) > .share-btn:nth-child(5){animation-delay:.06s}
  .share-rail.open:not(.closing) > .share-btn:nth-child(6){animation-delay:.08s}
  .share-rail.open:not(.closing) > .share-btn:nth-child(7){animation-delay:.10s}
  .share-rail.open:not(.closing) > .share-btn:nth-child(8){animation-delay:.12s}
  .share-rail.closing > .share-btn:not(.share-toggle){animation:shareBtnOut .15s ease forwards}
  @media (prefers-reduced-motion:reduce){.share-rail > .share-btn{animation-duration:.01ms!important}}
  /* "Copied!" tooltip to the LEFT so it never runs off the right edge */
  .share-copied{position:relative}
  .share-copied::after{content:"Copied!";position:absolute;right:calc(100% + 10px);top:50%;transform:translateY(-50%);
    background:#0f172a;color:#fff;font-size:.72rem;font-weight:600;padding:.2rem .5rem;border-radius:.35rem;white-space:nowrap}
  /* Sit directly above the scroll-to-top button. The To-Top only appears after
     scrolling >300px (.share-rail gets .scrolled then), so until then the FAB
     drops into the To-Top's slot — no floating gap. 4 states (scroll × install): */
  .share-rail.scrolled{bottom:6rem}                                   /* scrolled, no install -> above To-Top (2rem) */
  body.pwa-install-visible .share-rail{bottom:5.5rem}                 /* top of page, install -> above Install, in To-Top slot */
  body.pwa-install-visible .share-rail.scrolled{bottom:9.5rem}       /* scrolled + install -> above To-Top (5.5rem) */
  @media (max-width:991px){.share-rail .share-btn:not(.share-toggle){width:40px;height:40px;font-size:1.05rem}}
  @media (prefers-reduced-motion:reduce){.share-btn{transition:none}}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- floating right rail ----
  const rail = document.createElement('div');
  rail.className = 'share-rail';
  rail.setAttribute('aria-label', 'Share this tool');
  rail.innerHTML = `<button type="button" class="share-toggle share-btn" aria-label="Share" aria-expanded="false"><i class="bi bi-share-fill"></i></button><span class="share-cap">Share</span>${targetButtons}${copyBtn}`;

  let closeTimer;
  function setOpen(root, open) {
    clearTimeout(closeTimer);
    if (open) {
      root.classList.remove('closing');
      root.classList.add('open');
    } else if (root.classList.contains('open')) {
      // Play the close animation, then actually collapse (display:none)
      root.classList.add('closing');
      closeTimer = setTimeout(() => root.classList.remove('open', 'closing'), 170);
    }
    const t = root.querySelector('.share-toggle');
    if (t) {
      t.setAttribute('aria-expanded', String(open));
      const i = t.querySelector('i');
      if (i) i.className = open ? 'bi bi-x-lg' : 'bi bi-share-fill';
    }
  }

  function wire(root) {
    // Mobile: the toggle FAB expands/collapses the rail
    const toggle = root.querySelector('.share-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(root, !root.classList.contains('open'));
      });
    }
    const copy = root.querySelector('.share-copy');
    if (!copy) return;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = url; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
      }
      copy.classList.add('share-copied');
      setTimeout(() => copy.classList.remove('share-copied'), 1600);
    });
  }

  function mount() {
    document.body.appendChild(rail);
    wire(rail);
    // Tap anywhere outside the rail collapses it (mobile)
    document.addEventListener('click', (e) => {
      if (!rail.contains(e.target)) setOpen(rail, false);
    });
    // Track scroll (same 300px threshold as the scroll-to-top button) so the FAB
    // sits directly above it when shown, and drops into its slot when hidden.
    const onScroll = () => rail.classList.toggle('scrolled', window.pageYOffset > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
