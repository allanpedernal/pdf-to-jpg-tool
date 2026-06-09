#!/usr/bin/env node
// Auto-share the newest blog post to your own social channels via a single webhook.
// Point WEBHOOK_URL at a Zapier/Make/IFTTT "Catch Hook", a Discord/Slack webhook,
// or any endpoint — it then fans out to X / Facebook / Pinterest / etc.
// Sharing YOUR OWN content is 100% white-hat (drives traffic + earns natural links).
//
//   WEBHOOK_URL="https://hooks.zapier.com/..." node scripts/social-post.js
//
// No WEBHOOK_URL set => it just prints the post URL and exits cleanly (no error).

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://www.pdf-to-jpg-tool.com';

const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'blog', 'posts.json'), 'utf8'));
const newest = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
if (!newest) { console.log('[social] No posts found.'); process.exit(0); }

const url = `${SITE}/blog/${newest.slug}.html`;
const image = newest.image ? (newest.image.startsWith('http') ? newest.image : `${SITE}${newest.image}`) : `${SITE}/preview.jpg`;
const message = `📄 New guide: ${newest.title}\n\n${newest.excerpt || ''}\n\n${url}`;

const webhook = process.env.WEBHOOK_URL;
if (!webhook) {
  console.log('[social] No WEBHOOK_URL set — skipping share. Latest post:', url);
  process.exit(0);
}

// Include several common field names so the same payload works with Zapier, Make,
// IFTTT, Discord ("content"), Slack ("text"), etc.
const payload = {
  text: message,
  content: message,
  message,
  title: newest.title,
  url,
  link: url,
  excerpt: newest.excerpt || '',
  image
};

(async () => {
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log(`[social] Posted "${newest.title}" -> webhook HTTP ${res.status}`);
    if (res.status >= 400) console.log('[social] Body:', (await res.text()).slice(0, 200));
  } catch (e) {
    console.error('[social] Failed:', e.message);
    // Don't fail the whole pipeline over a social post
    process.exit(0);
  }
})();
