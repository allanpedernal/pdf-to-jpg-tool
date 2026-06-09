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
  const entries = [...staticUrls, ...postUrls].map(u => `  <url>
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

  // Sitemap
  writeFileLogged(path.join(ROOT, 'sitemap.xml'), buildSitemap(posts));

  // Service worker cache bump
  updateServiceWorker(hash.digest('hex').slice(0, 8));

  console.log(`[build-blog] done — ${posts.length} post(s).`);
}

main();
