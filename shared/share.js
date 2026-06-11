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
  .share-rail{position:fixed;right:14px;top:50%;transform:translateY(-50%);z-index:1030;
    display:flex;flex-direction:column;align-items:center;gap:.5rem;padding:.6rem .45rem;border-radius:999px;
    background:var(--card-bg,#fff);border:1px solid var(--card-border,rgba(0,0,0,.08));
    box-shadow:0 10px 28px rgba(15,23,42,.16)}
  .share-rail .share-cap{font-size:.58rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;
    color:var(--text-secondary,#64748b);margin-bottom:.05rem}
  .share-btn{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;
    border-radius:50%;border:none;cursor:pointer;font-size:1.15rem;color:#fff;background:var(--sc);
    text-decoration:none;transition:transform .15s ease,box-shadow .15s ease,filter .15s ease;line-height:1}
  .share-btn:hover{transform:scale(1.1);filter:brightness(1.05);box-shadow:0 6px 16px color-mix(in srgb,var(--sc) 45%,transparent);color:#fff}
  .share-btn:focus-visible{outline:3px solid color-mix(in srgb,var(--sc) 55%,transparent);outline-offset:2px}
  /* "Copied!" tooltip to the LEFT so it never runs off the right edge */
  .share-copied{position:relative}
  .share-copied::after{content:"Copied!";position:absolute;right:calc(100% + 10px);top:50%;transform:translateY(-50%);
    background:#0f172a;color:#fff;font-size:.72rem;font-weight:600;padding:.2rem .5rem;border-radius:.35rem;white-space:nowrap}
  @media (max-width:991px){.share-rail{gap:.4rem;padding:.5rem .4rem}.share-rail .share-btn{width:38px;height:38px;font-size:1.05rem}}
  @media (max-width:575px){.share-rail .share-cap{display:none}}
  @media (prefers-reduced-motion:reduce){.share-btn{transition:none}}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- floating right rail ----
  const rail = document.createElement('div');
  rail.className = 'share-rail';
  rail.setAttribute('aria-label', 'Share this tool');
  rail.innerHTML = `<span class="share-cap">Share</span>${targetButtons}${copyBtn}`;

  function wire(root) {
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
