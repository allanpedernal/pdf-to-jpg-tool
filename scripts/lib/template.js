// Shared rendering for the blog. Pure Node, no external deps.
// Used by scripts/build-blog.js (renders everything from blog/posts.json)
// and scripts/generate-post.js (creates new posts, then rebuilds).
//
// posts.json is the single source of truth ("the notepad database").
// Every blog/<slug>.html and blog/index.html is a generated artifact.

'use strict';

const fs = require('fs');
const path = require('path');

const SITE = {
  url: 'https://www.pdf-to-jpg-tool.com',
  name: 'PDF Tools',
  adsensePub: 'ca-pub-2042221703015293',
  adInArticleSlot: '9174709096', // TODO: create a dedicated in-article ad unit and put its slot id here
  ga4: 'G-G1CV3K3BXS',
  email: 'pdftojpgtool@gmail.com', // TODO: confirm dedicated support inbox
  xHandle: 'allanpedernal',
  facebook: 'https://www.facebook.com/PDFtoJPGandVATools',
  defaultImage: '/preview.jpg',
  author: 'PDF Tools Team'
};

// --- helpers ---------------------------------------------------------------

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(title) {
  return String(title)
    .toLowerCase()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function formatDate(iso) {
  // iso = "YYYY-MM-DD"; render without relying on locale/timezone
  const [y, m, d] = String(iso).split('T')[0].split('-').map(Number);
  const months = ['January','February','March','April','May','June','July',
                  'August','September','October','November','December'];
  if (!y || !m || !d) return esc(iso);
  return `${months[m - 1]} ${d}, ${y}`;
}

function readingTimeMinutes(html) {
  const words = String(html).replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function postUrl(post) {
  return `${SITE.url}/blog/${post.slug}.html`;
}

function postImage(post) {
  const img = post.image || SITE.defaultImage;
  return img.startsWith('http') ? img : `${SITE.url}${img.startsWith('/') ? '' : '/'}${img}`;
}

// --- shared head / analytics / footer --------------------------------------

function analyticsAndAds() {
  return `
  <!-- Google tag (gtag.js) - delayed on mobile -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    (function(){
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      function loadAnalytics(){
        var s=document.createElement('script'); s.async=true;
        s.src='https://www.googletagmanager.com/gtag/js?id=${SITE.ga4}';
        document.head.appendChild(s);
        s.onload=function(){ gtag('js', new Date()); gtag('config','${SITE.ga4}',{page_location:window.location.href}); window.gtag=gtag; };
      }
      if(isMobile){ var done=false; var go=function(){ if(!done){done=true; loadAnalytics(); ['touchstart','click','scroll'].forEach(function(e){window.removeEventListener(e,go);});}};
        ['touchstart','click','scroll'].forEach(function(e){window.addEventListener(e,go,{once:true,passive:true});});
        setTimeout(function(){ if(!done) loadAnalytics(); },3000);
      } else { loadAnalytics(); }
    })();
  </script>

  <!-- Google AdSense - delayed on mobile -->
  <meta name="google-adsense-account" content="${SITE.adsensePub}">
  <script>
    (function(){
      var isMobileAd = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      function loadAdSense(){
        var s=document.createElement('script'); s.async=true;
        s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsensePub}';
        s.crossOrigin='anonymous'; document.head.appendChild(s);
      }
      if(isMobileAd){ if(document.readyState==='complete'){ setTimeout(loadAdSense,2000);} else { window.addEventListener('load',function(){ setTimeout(loadAdSense,2000); }); } }
      else { loadAdSense(); }
    })();
  </script>`;
}

function adUnit(style) {
  return `<ins class="adsbygoogle"
       style="${style}"
       data-ad-client="${SITE.adsensePub}"
       data-ad-slot="${SITE.adInArticleSlot}"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>`;
}

function adInit() {
  return `
  <script>
    (function(){
      function initAds(){
        if(typeof adsbygoogle==='undefined'){ return setTimeout(initAds,150); }
        document.querySelectorAll('.adsbygoogle:not([data-ads-initialized])').forEach(function(slot){
          try{ (adsbygoogle = window.adsbygoogle || []).push({}); slot.setAttribute('data-ads-initialized','true'); }
          catch(e){ console.warn('AdSense init error', e); }
        });
      }
      if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',initAds);} else { initAds(); }
    })();
  </script>`;
}

// One ad rail (left/right), identical markup to the other content pages.
function adRail(id) {
  return `
      <aside id="${id}" class="d-none d-lg-block col-lg-2 position-sticky" style="top: 0; height: 100vh; overflow-y: auto; padding: 1rem;">
        <div class="card border-0 shadow-sm">
          <div class="card-body d-flex align-items-center justify-content-center" style="min-height: 250px;">
            ${adUnit('display:block; min-width: 160px; width: 100%;')}
          </div>
        </div>
      </aside>`;
}

function bottomAd() {
  return `
      <!-- Bottom Ad Banner -->
      <div class="col-12 mt-auto">
        <div class="card border-0 shadow-sm m-2 m-lg-3">
          <div class="card-body text-center py-3 py-lg-4">
            ${adUnit('display:block; width: 100%; min-height: 90px;')}
          </div>
        </div>
      </div>`;
}

// The site's standard 4-column footer, reused verbatim from partials/footer.html
// so the blog stays in lockstep with the rest of the site.
function siteFooter() {
  try {
    return '\n' + fs.readFileSync(path.join(__dirname, '..', '..', 'partials', 'footer.html'), 'utf8');
  } catch (e) {
    return `\n  <footer class="text-center py-4"><p class="small text-secondary mb-0">&copy; ${new Date().getFullYear()} PDF Tools</p></footer>`;
  }
}

// Closing scripts matching the other content pages (jQuery, Bootstrap, theme sync, ad init).
function pageScripts() {
  return `
  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  <script>
    // Theme sync with the rest of the site (light default, stored in localStorage by index.html)
    (function(){
      function applyTheme(t){ document.documentElement.setAttribute('data-theme', t); }
      applyTheme(localStorage.getItem('theme') || 'light');
      window.addEventListener('storage', function(e){ if(e.key==='theme') applyTheme(e.newValue||'light'); });
      setInterval(function(){
        var cur = document.documentElement.getAttribute('data-theme') || 'light';
        var saved = localStorage.getItem('theme') || 'light';
        if (cur !== saved) applyTheme(saved);
      }, 500);
    })();
  </script>
${adInit()}`;
}

// Scoped blog styling. The site's global `.card { background: var(--card-bg) !important }`
// (style.css) forces a dark translucent card meant for the dark tool UI. These rules
// (higher specificity + !important) restore clean, light, readable blog cards.
function blogStyles() {
  return `
  <style>
    .blog-page .card { background:#ffffff !important; border:1px solid #e5e7eb !important; backdrop-filter:none !important; border-radius:14px !important; }
    .blog-page .blog-card { overflow:hidden; transition:transform .2s ease, box-shadow .2s ease; }
    .blog-page .blog-card:hover { transform:translateY(-4px); box-shadow:0 14px 30px rgba(15,23,42,.12) !important; }
    .blog-page .card-img-top { aspect-ratio:1200/630; object-fit:cover; }
    .blog-page .card .card-body { text-align:left !important; }
    .blog-page .card-title, .blog-page .card h2, .blog-page .card h4 { color:#0f172a !important; }
    .blog-page .blog-excerpt { color:#475569 !important; }
    .blog-page .blog-meta { color:#64748b !important; }
    /* keep the call-to-action card's gradient instead of the dark override */
    .blog-page .card.tools-cta { background:linear-gradient(135deg,#eff6ff,#f5f3ff) !important; border:1px solid #dbeafe !important; }
    /* article typography */
    .blog-content { color:#1e293b; }
    .blog-content h2 { font-size:1.6rem; font-weight:800; color:#0f172a; margin:2.2rem 0 .75rem; }
    .blog-content h3 { font-size:1.2rem; font-weight:700; color:#1e293b; margin:1.6rem 0 .5rem; }
    .blog-content p { margin:0 0 1.05rem; }
    .blog-content ul, .blog-content ol { margin:0 0 1.05rem; padding-left:1.3rem; }
    .blog-content li { margin-bottom:.45rem; }
    .blog-content a { color:#2563eb; text-decoration:underline; text-underline-offset:2px; }
    .blog-content blockquote { border-left:4px solid #3b82f6; background:#f8fafc; padding:1rem 1.25rem; margin:1.6rem 0; border-radius:.5rem; color:#334155; }
    .blog-content blockquote p { margin:0; }
    .blog-topbar a:hover { color:#3b82f6 !important; }
  </style>`;
}

function baseHead({ title, description, canonical, image, jsonld, extraMeta }) {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="${esc(SITE.author)}">
  <link rel="canonical" href="${esc(canonical)}">
  <meta name="theme-color" content="#0f172a">
  ${extraMeta || ''}

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

  <!-- PWA -->
  <link rel="manifest" href="/manifest.json">
  <script src="/shared/pwa.js"></script>

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${esc(image)}">
  <meta property="og:site_name" content="${esc(SITE.name)}">
  <meta property="og:locale" content="en_US">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(image)}">
  <meta name="twitter:creator" content="@${SITE.xHandle}">

  <!-- Bootstrap + Icons -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css">
  <link rel="stylesheet" href="/shared/styles.css">
  <link rel="stylesheet" href="/style.css">
${blogStyles()}${jsonld ? `\n  <script type="application/ld+json">\n${JSON.stringify(jsonld, null, 2)}\n  </script>\n` : ''}${analyticsAndAds()}
</head>
<body class="blog-page" style="background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 50%,#f8fafc 100%); color:#0f172a;">`;
}

// --- post page -------------------------------------------------------------

function articleJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.excerpt,
    image: postImage(post),
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@type': 'Organization', name: SITE.author, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/apple-touch-icon.png` }
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(post) }
  };
}

function relatedToolsBlock(post) {
  const tools = (post.relatedTools && post.relatedTools.length)
    ? post.relatedTools
    : [{ label: 'Browse all PDF & image tools', href: '/' }];
  const items = tools.map(t =>
    `<a href="${esc(t.href)}" class="btn btn-primary btn-sm me-2 mb-2"><i class="bi bi-tools me-1"></i>${esc(t.label)}</a>`
  ).join('\n        ');
  return `
    <div class="card tools-cta border-0 shadow-sm my-5">
      <div class="card-body p-4">
        <h3 class="h5 fw-bold mb-3" style="color:#0f172a;"><i class="bi bi-lightning-charge-fill text-primary me-2"></i>Try the tools mentioned in this guide</h3>
        ${items}
      </div>
    </div>`;
}

function renderPost(post, related) {
  const canonical = postUrl(post);
  const image = postImage(post);
  const head = baseHead({
    title: `${post.title} | ${SITE.name} Blog`,
    description: post.description || post.excerpt,
    canonical,
    image,
    jsonld: articleJsonLd(post)
  });

  const tags = (post.tags || []).map(t =>
    `<span class="badge rounded-pill" style="background:#e0e7ff; color:#3730a3;">${esc(t)}</span>`
  ).join(' ');

  const relatedCards = (related || []).slice(0, 3).map(r => `
        <div class="col-12 col-md-4">
          <a href="/blog/${esc(r.slug)}.html" class="text-decoration-none">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <h4 class="h6 fw-bold" style="color:#0f172a;">${esc(r.title)}</h4>
                <p class="small mb-0" style="color:#64748b;">${esc(r.excerpt)}</p>
              </div>
            </div>
          </a>
        </div>`).join('');

  return `${head}

  <!-- Main Container - Bootstrap Grid Layout (matches the rest of the site) -->
  <div class="container-fluid px-0">
    <div class="row g-0 min-vh-100">
${adRail('left-ad')}

      <!-- Main Content Area -->
      <main id="main-content" class="col-12 col-lg-8 px-3 px-sm-4 px-lg-4 pt-4">
        <div class="w-100 py-3 mx-auto" style="max-width:960px;">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb small">
              <li class="breadcrumb-item"><a href="/" class="text-decoration-none">Home</a></li>
              <li class="breadcrumb-item"><a href="/blog/" class="text-decoration-none">Blog</a></li>
              <li class="breadcrumb-item active" aria-current="page">${esc(post.title)}</li>
            </ol>
          </nav>

          <!-- Header card (same treatment as the legal pages) -->
          <header class="privacy-header text-center mb-4" style="border-radius:16px; overflow:hidden; padding:3.5rem 1.5rem 3rem;">
            <div class="container">
              <div class="header-icon"><i class="bi bi-journal-text"></i></div>
              <div class="mb-3">${tags}</div>
              <h1 class="mb-3" style="font-size:2.6rem; font-weight:800; line-height:1.2;">${esc(post.title)}</h1>
              <p class="fs-5 mb-2" style="color:var(--text-secondary);">${esc(post.excerpt)}</p>
              <p class="fs-6 mb-0" style="color:var(--text-secondary);">
                <i class="bi bi-person-circle me-1"></i>${esc(post.author || SITE.author)}
                <span class="mx-2">·</span>
                <i class="bi bi-calendar3 me-1"></i><time datetime="${esc(post.date)}">${formatDate(post.date)}</time>
                <span class="mx-2">·</span>
                <i class="bi bi-clock me-1"></i>${readingTimeMinutes(post.contentHtml)} min read
              </p>
            </div>
          </header>

          <!-- Content card -->
          <article class="privacy-card">
            <div class="p-3 p-lg-5">
              <img src="${esc(post.image || SITE.defaultImage)}" alt="${esc(post.imageAlt || post.title)}" class="img-fluid rounded-3 shadow-sm mb-4" loading="eager" style="width:100%; aspect-ratio:1200/630; object-fit:cover;">

              <div class="blog-content" style="font-size:1.08rem; line-height:1.85;">
${post.contentHtml}
              </div>

              ${relatedToolsBlock(post)}

              <div class="text-center my-4">
                ${adUnit('display:block; min-height:90px;')}
              </div>
            </div>
          </article>

          ${relatedCards ? `<section class="my-5">
            <h2 class="h4 fw-bold mb-4" style="color:var(--text-primary,#0f172a);">Related guides</h2>
            <div class="row g-4">${relatedCards}
            </div>
          </section>` : ''}
        </div>
      </main>

${adRail('right-ad')}
${bottomAd()}
    </div>
  </div>
${siteFooter()}
${pageScripts()}
</body>
</html>`;
}

// --- blog index ------------------------------------------------------------

function blogIndexJsonLd(posts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE.name} Blog`,
    url: `${SITE.url}/blog/`,
    description: 'Guides, tips and tutorials on converting, compressing and managing PDF and image files.',
    blogPost: posts.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: postUrl(p),
      datePublished: p.date,
      image: postImage(p)
    }))
  };
}

function renderIndex(posts) {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const head = baseHead({
    title: `Blog & Guides | ${SITE.name}`,
    description: 'Practical guides on converting PDF to JPG/PNG, compressing PDFs, merging and splitting files, image formats, and more — all free and privacy-first.',
    canonical: `${SITE.url}/blog/`,
    image: `${SITE.url}${SITE.defaultImage}`,
    jsonld: blogIndexJsonLd(sorted)
  });

  const cards = sorted.map(p => `
        <div class="col-12 col-md-6 col-lg-4">
          <a href="/blog/${esc(p.slug)}.html" class="text-decoration-none">
            <article class="card h-100 border-0 shadow-sm blog-card" style="transition:transform .2s ease, box-shadow .2s ease;">
              <img src="${esc(p.image || SITE.defaultImage)}" alt="${esc(p.imageAlt || p.title)}" class="card-img-top" loading="lazy" style="aspect-ratio:1200/630; object-fit:cover;">
              <div class="card-body d-flex flex-column">
                <div class="mb-2">${(p.tags || []).slice(0, 2).map(t => `<span class="badge rounded-pill" style="background:#e0e7ff; color:#3730a3;">${esc(t)}</span>`).join(' ')}</div>
                <h2 class="h5 fw-bold">${esc(p.title)}</h2>
                <p class="small flex-grow-1 blog-excerpt">${esc(p.excerpt)}</p>
                <div class="small blog-meta mt-2"><i class="bi bi-calendar3 me-1"></i>${formatDate(p.date)} · ${readingTimeMinutes(p.contentHtml)} min read</div>
              </div>
            </article>
          </a>
        </div>`).join('');

  return `${head}

  <!-- Main Container - Bootstrap Grid Layout (matches the rest of the site) -->
  <div class="container-fluid px-0">
    <div class="row g-0 min-vh-100">
${adRail('left-ad')}

      <!-- Main Content Area -->
      <main id="main-content" class="col-12 col-lg-8 px-3 px-sm-4 px-lg-4 pt-4">
        <div class="w-100 py-3" style="max-width:1200px;">
          <header class="privacy-header text-center mb-5" style="border-radius:16px; overflow:hidden;">
            <div class="container">
              <div class="header-icon"><i class="bi bi-journal-text"></i></div>
              <h1 class="mb-3" style="font-size:3rem; font-weight:800;">Blog &amp; Guides</h1>
              <p class="fs-5 mb-0 mx-auto" style="max-width:640px; color:var(--text-secondary);">Practical, no-nonsense guides on converting, compressing and managing PDF and image files — written for real tasks, all using free browser-based tools.</p>
            </div>
          </header>

          ${sorted.length ? `<div class="row g-4">${cards}
          </div>` : `<p class="text-center text-secondary">No posts yet — check back soon.</p>`}
        </div>
      </main>

${adRail('right-ad')}
${bottomAd()}
    </div>
  </div>
${siteFooter()}
${pageScripts()}
</body>
</html>`;
}

module.exports = {
  SITE, esc, slugify, formatDate, readingTimeMinutes,
  postUrl, postImage, renderPost, renderIndex
};
