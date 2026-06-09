#!/usr/bin/env node
// Rebuilds all blog artifacts from blog/posts.json (the single source of truth):
//   - blog/<slug>.html          (one file per post)
//   - blog/index.html           (post listing)
//   - sitemap.xml               (static pages + blog index + every post)
//   - sw.js                     (cache version bumped when content changes)
//
// Run:  node scripts/build-blog.js
// Safe to run repeatedly; output is deterministic for a given posts.json.

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { SITE, renderPost, renderIndex, formatDate, readingTimeMinutes } = require('./lib/template');

const ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const POSTS_JSON = path.join(BLOG_DIR, 'posts.json');

function readPosts() {
  if (!fs.existsSync(POSTS_JSON)) {
    console.error(`[build-blog] Missing ${POSTS_JSON}`);
    process.exit(1);
  }
  const posts = JSON.parse(fs.readFileSync(POSTS_JSON, 'utf8'));
  if (!Array.isArray(posts)) throw new Error('posts.json must be an array');
  // basic validation + sort newest first
  posts.forEach((p, i) => {
    for (const f of ['slug', 'title', 'date', 'excerpt', 'contentHtml']) {
      if (!p[f]) throw new Error(`Post #${i} missing required field "${f}"`);
    }
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function relatedFor(post, all) {
  const others = all.filter(p => p.slug !== post.slug);
  const tags = new Set(post.tags || []);
  const scored = others
    .map(p => ({ p, score: (p.tags || []).filter(t => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1));
  return scored.slice(0, 3).map(s => s.p);
}

function writeFileLogged(file, content) {
  fs.writeFileSync(file, content);
  console.log(`[build-blog] wrote ${path.relative(ROOT, file)}`);
}

function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const staticUrls = [
    { loc: `${SITE.url}/`, changefreq: 'weekly', priority: '1.0', lastmod: today },
    { loc: `${SITE.url}/blog/`, changefreq: 'daily', priority: '0.9', lastmod: posts[0] ? (posts[0].updated || posts[0].date) : today },
    { loc: `${SITE.url}/about.html`, changefreq: 'monthly', priority: '0.7', lastmod: today },
    { loc: `${SITE.url}/contact.html`, changefreq: 'monthly', priority: '0.6', lastmod: today },
    { loc: `${SITE.url}/privacy-policy.html`, changefreq: 'yearly', priority: '0.4', lastmod: today },
    { loc: `${SITE.url}/terms-of-service.html`, changefreq: 'yearly', priority: '0.4', lastmod: today }
  ];
  const postUrls = posts.map(p => ({
    loc: `${SITE.url}/blog/${p.slug}.html`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: (p.updated || p.date).slice(0, 10)
  }));
  // Per-tool landing pages (high priority — primary keyword pages)
  let toolUrls = [];
  try {
    const { TOOLS } = require('./build-tool-pages');
    toolUrls = TOOLS.map(t => ({ loc: `${SITE.url}/${t.slug}.html`, changefreq: 'weekly', priority: '0.9', lastmod: today }));
  } catch (e) { /* tool pages optional */ }
  const entries = [...staticUrls, ...toolUrls, ...postUrls].map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function rfc822(dateStr) {
  // dateStr = "YYYY-MM-DD" -> RFC-822 (e.g. "Tue, 20 May 2026 09:00:00 +0000")
  const [y, m, d] = dateStr.slice(0, 10).split('-').map(Number);
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dt = new Date(Date.UTC(y, m - 1, d, 9, 0, 0));
  return `${days[dt.getUTCDay()]}, ${String(d).padStart(2,'0')} ${mons[m-1]} ${y} 09:00:00 +0000`;
}

function buildRss(posts) {
  const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const items = sorted.map(p => {
    const url = `${SITE.url}/blog/${p.slug}.html`;
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.excerpt || p.description || '')}</description>
      <pubDate>${rfc822(p.updated || p.date)}</pubDate>
    </item>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name} Blog</title>
    <link>${SITE.url}/blog/</link>
    <atom:link href="${SITE.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Guides and tutorials on converting, compressing and managing PDF and image files.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822((sorted[0] && (sorted[0].updated || sorted[0].date)) || '2026-01-01')}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

function updateServiceWorker(contentHash) {
  const swPath = path.join(ROOT, 'sw.js');
  let sw = fs.readFileSync(swPath, 'utf8');

  // Cache name carries a content hash so a new post invalidates the cache,
  // but identical content keeps the same name (no needless re-downloads).
  const base = 'pdf-tools-v1.2.1';
  sw = sw.replace(/const CACHE_NAME = '[^']*';/, `const CACHE_NAME = '${base}-${contentHash}';`);
  sw = sw.replace(/const RUNTIME_CACHE = '[^']*';/, `const RUNTIME_CACHE = '${base}-runtime-${contentHash}';`);

  // Ensure the blog index is precached (individual posts are runtime-cached).
  if (!sw.includes("'/blog/index.html'")) {
    sw = sw.replace(/(const STATIC_ASSETS = \[\s*\n)/, `$1  '/blog/',\n  '/blog/index.html',\n`);
  }
  fs.writeFileSync(swPath, sw);
  console.log(`[build-blog] sw.js cache version -> ${base}-${contentHash}`);
}

function main() {
  const posts = readPosts();
  fs.mkdirSync(path.join(BLOG_DIR, 'images'), { recursive: true });

  const hash = crypto.createHash('sha1');
  // Include the template/renderer + site CSS so visual changes also bust the SW cache.
  hash.update(fs.readFileSync(path.join(__dirname, 'lib', 'template.js')));
  for (const asset of ['style.css', 'shared/styles.css', 'app.js']) {
    try { hash.update(fs.readFileSync(path.join(ROOT, asset))); } catch (e) { /* ignore */ }
  }

  // Per-post pages
  for (const post of posts) {
    const html = renderPost(post, relatedFor(post, posts));
    writeFileLogged(path.join(BLOG_DIR, `${post.slug}.html`), html);
    hash.update(post.slug + (post.updated || post.date) + post.contentHtml);
  }

  // Index page
  const indexHtml = renderIndex(posts);
  writeFileLogged(path.join(BLOG_DIR, 'index.html'), indexHtml);

  // Lightweight data file for client-side infinite scroll (no heavy contentHtml).
  const indexData = posts.map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image || SITE.defaultImage,
    imageAlt: p.imageAlt || p.title,
    tags: p.tags || [],
    date: p.date,
    dateFormatted: formatDate(p.date),
    readingTime: readingTimeMinutes(p.contentHtml)
  }));
  writeFileLogged(path.join(BLOG_DIR, 'index-data.json'), JSON.stringify(indexData));

  // RSS feed (syndication / discovery)
  writeFileLogged(path.join(BLOG_DIR, 'rss.xml'), buildRss(posts));

  // Sitemap
  writeFileLogged(path.join(ROOT, 'sitemap.xml'), buildSitemap(posts));

  // Service worker cache bump
  updateServiceWorker(hash.digest('hex').slice(0, 8));

  console.log(`[build-blog] done — ${posts.length} post(s).`);
}

main();
