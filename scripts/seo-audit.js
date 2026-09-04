#!/usr/bin/env node
// Machine-checkable definition of "done" for the AdSense approval work.
//
//   node scripts/seo-audit.js            audit the committed files
//   node scripts/seo-audit.js --live     also fetch the live URLs and re-count
//   node scripts/seo-audit.js --json     print audit.json to stdout, no summary
//
// Writes .loop/audit.json (rotating the previous run to .loop/audit-prev.json)
// and exits 1 if any blocking gate fails. Every loop in adsense-loop-plan.txt
// reads this file; nothing else is allowed to declare a gate passed.
//
// No dependencies, and it must stay that way — this repo has no package.json.

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://www.pdf-to-jpg-tool.com';
const LOOP_DIR = path.join(ROOT, '.loop');

const WORD_TARGET = 600;      // G1
const THIN_PAGE = 300;        // G8 — no ad units below this
const MIN_POSTS = 20;         // G4
const MAX_POST_AGE = 7;       // G5, days
const MAX_POST_GAP = 10;      // G6, days, measured over the last 4 weeks
const MAX_PROSE_OVERLAP = 0.30; // B1 — no two tool pages more alike than this

// Pages that must NOT be indexable (G7).
const NOINDEX_PAGES = ['login.html', 'dashboard.html', 'test-pwa.html'];

const args = process.argv.slice(2);
const WANT_LIVE = args.includes('--live');
const JSON_ONLY = args.includes('--json');

// --- text extraction -------------------------------------------------------
// Mirrors the measurement in the runbook exactly: strip script, style and
// comments, turn every remaining tag into a space, then count whitespace-
// separated tokens. Entities are NOT decoded — matching the original count.
function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ');
}

function countWords(html) {
  const t = visibleText(html).trim();
  return t ? t.split(/\s+/).length : 0;
}

// Schema markup carries raw characters ("Convert to PNG") while the rendered
// page carries entities (&quot;Convert to PNG&quot;). Comparing the two without
// decoding reports orphans for copy that is plainly visible — a false positive
// that would send a loop hunting for content already on the page.
const ENTITIES = { quot: '"', apos: "'", amp: '&', lt: '<', gt: '>', nbsp: ' ', '#39': "'", '#34': '"' };
function decodeEntities(s) {
  return String(s).replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, code) => {
    const key = code.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(ENTITIES, key)) return ENTITIES[key];
    if (key[0] === '#') {
      const n = key[1] === 'x' ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return m;
  });
}

// Note: this is used for comparing text, never for counting it. countWords()
// deliberately still measures the raw token stream so the word counts stay
// identical to the original measurement.
const normalize = s => decodeEntities(String(s)).toLowerCase().replace(/\s+/g, ' ').trim();

// --- per-page analysis -----------------------------------------------------
function analysePage(relPath, html) {
  const text = visibleText(html);
  const norm = normalize(text);

  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  const h2 = (html.match(/<h2[\s>]/gi) || []).length;

  // (4) structured data vs visible copy
  const orphans = [];
  const blocks = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const block of blocks) {
    const body = block.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '');
    let data;
    try { data = JSON.parse(body); } catch (e) {
      orphans.push({ kind: 'unparseable-jsonld', text: e.message });
      continue;
    }
    for (const node of flatten(data)) {
      const type = node && node['@type'];
      if (type === 'FAQPage') {
        for (const q of asArray(node.mainEntity)) {
          check(q && q.name, 'faq-question');
          check(q && q.acceptedAnswer && q.acceptedAnswer.text, 'faq-answer');
        }
      } else if (type === 'HowTo') {
        for (const s of asArray(node.step)) {
          check(s && s.name, 'howto-step');
          check(s && s.text, 'howto-text');
        }
      } else if (type === 'BreadcrumbList') {
        for (const it of asArray(node.itemListElement)) {
          const nm = it && (it.name || (it.item && it.item.name));
          check(nm, 'breadcrumb');
        }
      }
    }
  }
  function check(value, kind) {
    if (!value || typeof value !== 'string') return;
    const needle = normalize(value);
    // Short strings match by accident; only assert on substantive copy.
    if (needle.length < 12) return;
    if (!norm.includes(needle)) orphans.push({ kind, text: value.slice(0, 90) });
  }

  // (5) canonical
  const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  const canonical = canonMatch ? attr(canonMatch[0], 'href') : null;
  const expected = `${SITE}/${relPath === 'index.html' ? '' : relPath}`;
  const canonicalOk = canonical === expected ||
    (relPath === 'index.html' && (canonical === SITE || canonical === SITE + '/'));

  // (6) og:image
  const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]*>/i);
  const ogImage = ogMatch ? attr(ogMatch[0], 'content') : null;

  // (7) ad units
  const adUnits = (html.match(/<ins[^>]+class=["'][^"']*adsbygoogle/gi) || []).length;

  // (8) noindex
  const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]*>/i);
  const noindex = robotsMatch ? /noindex/i.test(attr(robotsMatch[0], 'content') || '') : false;

  // Similarity must compare the UNIQUE per-tool prose, not the shared shell.
  // Every tool page carries the same nav, footer and tool UI labels, so a
  // whole-page comparison reports ~40% overlap even when the prose is entirely
  // different — a number that would send a loop chasing a gate it cannot pass.
  const seoBlock = html.match(/<!--\s*SEO content[^>]*-->([\s\S]*?)<\/section>/i);
  const uniqueProse = seoBlock ? normalize(visibleText(seoBlock[1])) : null;

  return {
    page: relPath,
    crawlableWords: countWords(html),
    uniqueProseWords: uniqueProse ? uniqueProse.split(/\s+/).filter(Boolean).length : 0,
    h1Count: h1,
    h2Count: h2,
    schemaOrphans: orphans,
    canonical, canonicalOk,
    ogImage,
    ogImageShared: !!ogImage && /\/preview\.jpg$/.test(ogImage),
    adUnits,
    noindex,
    _norm: norm,          // stripped before serialising
    _prose: uniqueProse,  // ditto
  };
}

function attr(tag, name) {
  const m = tag.match(new RegExp(name + '=["\']([^"\']*)["\']', 'i'));
  return m ? m[1] : null;
}
const asArray = v => (Array.isArray(v) ? v : v == null ? [] : [v]);
function flatten(node, out) {
  out = out || [];
  if (Array.isArray(node)) { node.forEach(n => flatten(n, out)); return out; }
  if (node && typeof node === 'object') {
    out.push(node);
    for (const k of Object.keys(node)) {
      if (k !== '@type') flatten(node[k], out);
    }
  }
  return out;
}

// --- prose similarity (B1 near-duplicate guard) ----------------------------
function shingles(text) {
  const w = text.split(/\s+/).filter(Boolean);
  const s = new Set();
  for (let i = 0; i + 4 < w.length; i++) s.add(w.slice(i, i + 5).join(' '));
  return s;
}
function overlap(a, b) {
  if (!a.size || !b.size) return 0;
  let hits = 0;
  for (const g of a) if (b.has(g)) hits++;
  return hits / Math.min(a.size, b.size);
}

// --- gather ----------------------------------------------------------------
const toolSlugs = (() => {
  const src = fs.readFileSync(path.join(ROOT, 'scripts', 'build-tool-pages.js'), 'utf8');
  return (src.match(/slug:\s*'([a-z0-9-]+)'/g) || [])
    .map(m => m.replace(/slug:\s*'/, '').replace(/'$/, ''));
})();
const toolPages = new Set(toolSlugs.map(s => s + '.html'));

function listHtml() {
  const out = [];
  for (const f of fs.readdirSync(ROOT)) if (f.endsWith('.html')) out.push(f);
  const blogDir = path.join(ROOT, 'blog');
  if (fs.existsSync(blogDir)) {
    for (const f of fs.readdirSync(blogDir)) if (f.endsWith('.html')) out.push('blog/' + f);
  }
  return out.sort();
}

const pages = [];
for (const rel of listHtml()) {
  const html = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const p = analysePage(rel, html);
  p.kind = toolPages.has(rel) ? 'tool'
    : NOINDEX_PAGES.includes(rel) ? 'excluded'
    : rel.startsWith('blog/') ? 'blog' : 'content';
  pages.push(p);
}

// near-duplicate detection across tool pages
const tools = pages.filter(p => p.kind === 'tool');
// Compare the injected SEO section where present, falling back to the whole
// page only for tool pages that have not been regenerated yet.
const shingleMap = new Map(tools.map(p => [p.page, shingles(p._prose || p._norm)]));
const duplicatePairs = [];
for (let i = 0; i < tools.length; i++) {
  for (let j = i + 1; j < tools.length; j++) {
    const r = overlap(shingleMap.get(tools[i].page), shingleMap.get(tools[j].page));
    if (r > MAX_PROSE_OVERLAP) {
      duplicatePairs.push({ a: tools[i].page, b: tools[j].page, overlap: +r.toFixed(3) });
    }
  }
}

// --- blog posts ------------------------------------------------------------
const DAY = 86400000;
const today = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'blog', 'posts.json'), 'utf8'))
  .slice().sort((a, b) => a.date.localeCompare(b.date));

const dates = posts.map(p => new Date(p.date + 'T00:00:00Z'));
const newestPostAgeDays = dates.length
  ? Math.round((today - dates[dates.length - 1]) / DAY) : Infinity;

let largestGapDays = 0;                       // over the whole history
let largestGapRecentDays = 0;                 // over the last 4 weeks (G6)
const windowStart = today - 28 * DAY;
for (let i = 1; i < dates.length; i++) {
  const gap = Math.round((dates[i] - dates[i - 1]) / DAY);
  if (gap > largestGapDays) largestGapDays = gap;
  if (dates[i] >= windowStart && gap > largestGapRecentDays) largestGapRecentDays = gap;
}
// An open-ended silence since the last post counts as a gap too.
if (newestPostAgeDays > largestGapRecentDays && dates.length) {
  largestGapRecentDays = Math.max(largestGapRecentDays, newestPostAgeDays);
}

const postsMissingAuthor = posts.filter(p => !p.author || !String(p.author).trim())
  .map(p => p.slug);

// A byline in posts.json is worthless if it never renders (B7 / E-E-A-T).
const postsMissingVisibleByline = [];
for (const post of posts) {
  const page = pages.find(p => p.page === 'blog/' + post.slug + '.html');
  if (!page) continue;
  if (post.author && !page._norm.includes(normalize(post.author))) {
    postsMissingVisibleByline.push(post.slug);
  }
}

// Phase 03 regression check: relatedTools must point at real tool pages.
const postsWithRootLinks = posts
  .filter(p => (p.relatedTools || []).some(t => !t.href || t.href === '/'))
  .map(p => p.slug);

// --- sitemap ---------------------------------------------------------------
const sitemapXml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const sitemapUrls = (sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [])
  .map(m => m.replace(/<\/?loc>/g, '').trim());
const sitemapPaths = sitemapUrls.map(u => u.replace(SITE, '').replace(/^\//, '') || 'index.html');

const sitemapMissingOnDisk = sitemapPaths
  .filter(p => !fs.existsSync(path.join(ROOT, p)));
const sitemapNoindexed = sitemapPaths
  .filter(p => { const pg = pages.find(x => x.page === p); return pg && pg.noindex; });

// Every <lastmod> identical is the "always fresh" antipattern (Phase 02).
const lastmods = (sitemapXml.match(/<lastmod>([^<]+)<\/lastmod>/g) || [])
  .map(m => m.replace(/<\/?lastmod>/g, '').trim());
const lastmodAllIdentical = lastmods.length > 1 && new Set(lastmods).size === 1;

// --- gates -----------------------------------------------------------------
const failing = arr => arr.map(p => p.page);

const toolsUnderTarget = tools.filter(p => p.crawlableWords < WORD_TARGET);
const toolsBadH1 = tools.filter(p => p.h1Count !== 1);
const pagesWithOrphans = pages.filter(p => p.schemaOrphans.length);
const excludedNotNoindexed = NOINDEX_PAGES
  .filter(f => fs.existsSync(path.join(ROOT, f)))
  .filter(f => {
    const pg = pages.find(p => p.page === f);
    return !pg || !pg.noindex || sitemapPaths.includes(f);
  });
const thinWithAds = pages.filter(p => p.adUnits > 0 && p.crawlableWords < THIN_PAGE);
const badCanonicals = pages.filter(p => p.kind !== 'excluded' && !p.canonicalOk);
const sharedOgImages = pages.filter(p => p.kind !== 'excluded' && p.ogImageShared);

const gates = {
  G1:  gate(toolsUnderTarget.length === 0, `${tools.length - toolsUnderTarget.length}/${tools.length} tool pages >= ${WORD_TARGET} words`, failing(toolsUnderTarget), true),
  G2:  gate(toolsBadH1.length === 0, `${tools.length - toolsBadH1.length}/${tools.length} tool pages have exactly one H1`, failing(toolsBadH1), true),
  G3:  gate(pagesWithOrphans.length === 0, `${pagesWithOrphans.reduce((n, p) => n + p.schemaOrphans.length, 0)} schema orphans on ${pagesWithOrphans.length} pages`, failing(pagesWithOrphans), true),
  G4:  gate(posts.length >= MIN_POSTS, `${posts.length}/${MIN_POSTS} posts`, [], true),
  G5:  gate(newestPostAgeDays <= MAX_POST_AGE, `newest post ${newestPostAgeDays}d old (max ${MAX_POST_AGE})`, [], true),
  G6:  gate(largestGapRecentDays <= MAX_POST_GAP, `largest gap in last 28d: ${largestGapRecentDays}d (max ${MAX_POST_GAP})`, [], true),
  G7:  gate(excludedNotNoindexed.length === 0, `${NOINDEX_PAGES.length - excludedNotNoindexed.length}/${NOINDEX_PAGES.length} thin pages noindexed and out of sitemap`, excludedNotNoindexed, true),
  G8:  gate(thinWithAds.length === 0, `${thinWithAds.length} pages under ${THIN_PAGE} words carrying ad units`, failing(thinWithAds), true),
  G9:  gate(postsMissingAuthor.length === 0 && postsMissingVisibleByline.length === 0, `${postsMissingAuthor.length} posts without an author, ${postsMissingVisibleByline.length} without a visible byline`, postsMissingAuthor.concat(postsMissingVisibleByline), true),
  G10: gate(badCanonicals.length === 0, `${badCanonicals.length} pages with a non-self-referencing www canonical`, failing(badCanonicals), false),
  G11: gate(sharedOgImages.length === 0, `${sharedOgImages.length} pages still using preview.jpg as og:image`, failing(sharedOgImages), false),
};
function gate(pass, value, offenders, blocking) {
  return { pass: !!pass, value, offenders: offenders.slice(0, 40), blocking };
}

const blockingFailures = Object.entries(gates).filter(([, g]) => g.blocking && !g.pass);

// --- live check ------------------------------------------------------------
async function liveCheck() {
  const results = [];
  for (const p of sitemapPaths) {
    const url = `${SITE}/${p === 'index.html' ? '' : p}`;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'seo-audit (static check, no JS)' } });
      const body = await res.text();
      results.push({ page: p, status: res.status, crawlableWords: countWords(body), h1Count: (body.match(/<h1[\s>]/gi) || []).length });
    } catch (e) {
      results.push({ page: p, status: 0, error: e.message });
    }
  }
  const extras = {};
  for (const f of ['ads.txt', 'robots.txt']) {
    try {
      const res = await fetch(`${SITE}/${f}`);
      const body = await res.text();
      extras[f] = { status: res.status, ok: res.ok, containsPubId: /pub-2042221703015293/.test(body) };
    } catch (e) { extras[f] = { status: 0, error: e.message }; }
  }
  return { pages: results, files: extras };
}

// --- report ----------------------------------------------------------------
(async () => {
  const audit = {
    generatedAt: new Date().toISOString(),
    site: SITE,
    counts: {
      toolPages: tools.length,
      contentPages: pages.filter(p => p.kind === 'content').length,
      blogPages: pages.filter(p => p.kind === 'blog').length,
      posts: posts.length,
      sitemapUrls: sitemapUrls.length,
    },
    gates,
    pages: pages.map(p => { const { _norm, _prose, ...rest } = p; return rest; }),
    blog: {
      newestPostAgeDays,
      largestGapDays,
      largestGapRecentDays,
      postsMissingAuthor,
      postsMissingVisibleByline,
      postsWithRootLinks,
    },
    sitemap: { urls: sitemapUrls.length, missingOnDisk: sitemapMissingOnDisk, noindexedButListed: sitemapNoindexed, lastmodAllIdentical },
    duplicatePairs,
    live: null,
  };

  if (WANT_LIVE) audit.live = await liveCheck();

  fs.mkdirSync(LOOP_DIR, { recursive: true });
  const current = path.join(LOOP_DIR, 'audit.json');
  if (fs.existsSync(current)) fs.copyFileSync(current, path.join(LOOP_DIR, 'audit-prev.json'));
  fs.writeFileSync(current, JSON.stringify(audit, null, 2) + '\n');

  if (JSON_ONLY) {
    process.stdout.write(JSON.stringify(audit, null, 2) + '\n');
  } else {
    printSummary(audit);
  }
  process.exit(blockingFailures.length ? 1 : 0);
})();

function printSummary(audit) {
  const pad = (s, n) => String(s).padEnd(n);
  console.log('\nSEO / AdSense audit — ' + audit.generatedAt.slice(0, 10));
  console.log('='.repeat(72));

  console.log('\nCRAWLABLE WORDS');
  console.log('  ' + pad('PAGE', 52) + pad('H1', 4) + pad('H2', 4) + 'WORDS');
  for (const p of audit.pages.filter(x => x.kind === 'tool')) {
    const flag = p.crawlableWords < WORD_TARGET ? ' <' : '';
    console.log('  ' + pad(p.page, 52) + pad(p.h1Count, 4) + pad(p.h2Count, 4) + String(p.crawlableWords).padStart(5)
      + String(p.uniqueProseWords ? '  (' + p.uniqueProseWords + ' unique)' : '').padStart(15) + flag);
  }
  for (const p of audit.pages.filter(x => x.kind !== 'tool')) {
    console.log('  ' + pad(p.page, 52) + pad(p.h1Count, 4) + pad(p.h2Count, 4) + String(p.crawlableWords).padStart(5));
  }

  if (audit.duplicatePairs.length) {
    console.log('\nNEAR-DUPLICATE TOOL PAGES (>' + (MAX_PROSE_OVERLAP * 100) + '% prose overlap)');
    for (const d of audit.duplicatePairs.slice(0, 15)) {
      console.log('  ' + pad(d.a, 30) + pad(d.b, 30) + (d.overlap * 100).toFixed(0) + '%');
    }
    if (audit.duplicatePairs.length > 15) console.log('  ... and ' + (audit.duplicatePairs.length - 15) + ' more pairs');
  }

  console.log('\nGATES');
  for (const [id, g] of Object.entries(audit.gates)) {
    const mark = g.pass ? 'PASS' : (g.blocking ? 'FAIL' : 'warn');
    console.log('  ' + pad(id, 5) + pad(mark, 6) + g.value);
    if (!g.pass && g.offenders.length) {
      const shown = g.offenders.slice(0, 6).join(', ');
      console.log('       ' + shown + (g.offenders.length > 6 ? `, +${g.offenders.length - 6} more` : ''));
    }
  }

  if (audit.live) {
    console.log('\nLIVE FETCH');
    const bad = audit.live.pages.filter(p => p.error || p.status !== 200 || p.crawlableWords < WORD_TARGET);
    console.log('  ' + (audit.live.pages.length - bad.length) + '/' + audit.live.pages.length + ' live URLs at or above ' + WORD_TARGET + ' words');
    for (const p of bad.slice(0, 12)) {
      console.log('   !' + pad(p.page, 52) + (p.error ? p.error : p.status + '  ' + p.crawlableWords + 'w'));
    }
    for (const [f, r] of Object.entries(audit.live.files)) {
      console.log('  ' + pad(f, 44) + (r.ok ? 'ok' : 'FAIL ' + (r.error || r.status)) + (f === 'ads.txt' ? (r.containsPubId ? ' (pub id present)' : ' (PUB ID MISSING)') : ''));
    }
  } else {
    console.log('\n  (run with --live to fetch the deployed URLs — local pass + live fail is the');
    console.log('   failure mode that produced the original rejection)');
  }

  const blocking = Object.entries(audit.gates).filter(([, g]) => g.blocking && !g.pass);
  console.log('\n' + '='.repeat(72));
  console.log(blocking.length
    ? `BLOCKED — ${blocking.length} blocking gate(s) failing: ${blocking.map(([id]) => id).join(' ')}`
    : 'ALL BLOCKING GATES PASS — Loop D may evaluate the reapply gate');
  console.log('  written to .loop/audit.json\n');
}
