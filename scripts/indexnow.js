#!/usr/bin/env node
// Notify search engines (Bing, Yandex, and the shared IndexNow network) the moment
// pages change, so new tool/blog pages get crawled in minutes instead of weeks.
// White-hat, free, no API key/account — just a verification file at the site root.
//
//   node scripts/indexnow.js            # submit every URL in sitemap.xml
//   node scripts/indexnow.js url1 url2  # submit specific URLs
//
// Requires Node 18+ (global fetch). Run after the site is live (e.g. push to main).

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HOST = 'www.pdf-to-jpg-tool.com';
const ORIGIN = `https://${HOST}`;

function findKey() {
  // The key is stored in a <key>.txt verification file at the repo root.
  const ref = path.join(ROOT, '.indexnow-key');
  if (fs.existsSync(ref)) return fs.readFileSync(ref, 'utf8').trim();
  const txt = fs.readdirSync(ROOT).find(f => /^[a-f0-9]{16,128}\.txt$/i.test(f));
  return txt ? path.basename(txt, '.txt') : null;
}

function urlsFromSitemap() {
  const sm = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(sm)) return [];
  const xml = fs.readFileSync(sm, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
}

(async () => {
  const key = findKey();
  if (!key) { console.error('[indexnow] No key file found (looking for <hex>.txt at root).'); process.exit(1); }

  let urls = process.argv.slice(2);
  if (!urls.length) urls = urlsFromSitemap();
  urls = urls.filter(u => u.startsWith(ORIGIN));
  if (!urls.length) { console.log('[indexnow] No URLs to submit.'); return; }

  const body = {
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList: urls.slice(0, 10000)
  };

  console.log(`[indexnow] Submitting ${body.urlList.length} URL(s) to IndexNow...`);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body)
    });
    // 200/202 = accepted; 422 often means key/host mismatch (check the .txt is live)
    console.log(`[indexnow] Response: HTTP ${res.status} ${res.statusText}`);
    if (res.status >= 400) console.log('[indexnow] Body:', (await res.text()).slice(0, 300));
  } catch (e) {
    console.error('[indexnow] Failed:', e.message);
    process.exit(1);
  }
})();
