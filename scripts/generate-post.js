#!/usr/bin/env node
// Generates ONE original blog post and rebuilds the blog.
//
//   node scripts/generate-post.js            # generate 1 post
//   node scripts/generate-post.js --count 2  # generate 2 posts
//   node scripts/generate-post.js --dry-run  # generate but don't write files
//
// Providers (auto-fallback in AI_PROVIDER_ORDER): tries each in turn, moving on
// if one is missing/over-quota/erroring. Set whichever you have:
//   GEMINI_API_KEY   (https://aistudio.google.com/apikey  — free tier)
//   GROQ_API_KEY     (https://console.groq.com/keys       — free tier)
//   GITHUB_TOKEN     (GitHub Models — free GPT-4o-mini; auto-set in Actions,
//                     or a personal access token locally)
//
// Quality gates (to stay clear of Google's scaled-content / spam policy):
//   - minimum word count
//   - must contain headings and an FAQ section
//   - must include at least one internal link to a tool
//   - no duplicate of an already-published topic
//
// Requires Node 18+ (uses global fetch). No external npm dependencies.

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { slugify } = require('./lib/template');

const ROOT = path.resolve(__dirname, '..');
const POSTS_JSON = path.join(ROOT, 'blog', 'posts.json');
const TOPICS_JSON = path.join(ROOT, 'scripts', 'topics.json');
const IMAGES_DIR = path.join(ROOT, 'blog', 'images');

const MIN_WORDS = Number(process.env.MIN_WORDS) || 650;
const MAX_ATTEMPTS = Math.max(2, Number(process.env.GEN_MAX_ATTEMPTS) || 4);

// --- args ------------------------------------------------------------------
const argv = process.argv.slice(2);
const DRY_RUN = argv.includes('--dry-run');
const countIdx = argv.indexOf('--count');
const COUNT = countIdx !== -1 ? Math.max(1, parseInt(argv[countIdx + 1], 10) || 1) : 1;

// --- helpers ---------------------------------------------------------------
function log(msg) { console.log(`[generate] ${msg}`); }
function wordCount(html) { return String(html).replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length; }
function todayISO() { return new Date().toISOString().slice(0, 10); }

function readJSON(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }

function stripCodeFence(text) {
  return String(text).replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
}

function buildPrompt(topic) {
  const toolLinks = (topic.relatedTools || [{ label: 'PDF Tools', href: '/' }])
    .map(t => `${t.label} (${t.href})`).join(', ');
  return `You are writing for the blog of "PDF Tools", a free, privacy-first web app whose tools (PDF to JPG, PDF to PNG, JPG to PDF, PDF compress/merge/split/rotate/OCR, PNG to JPG, image resize/compress, HEIC to JPG) all run 100% in the browser with NO file uploads.

Write a genuinely helpful, original how-to article on this topic:
"${topic.title}"

Audience: everyday people solving a real task, not experts. Tone: clear, practical, friendly, no fluff or filler.

Return ONLY a JSON object with EXACTLY these keys:
{
  "title": "A specific, useful title (you may refine the topic title; <= 70 chars)",
  "excerpt": "One punchy sentence summarising the value (<= 160 chars)",
  "description": "An SEO meta description (<= 160 chars)",
  "tags": ["2-3 short topical tags"],
  "imagePrompt": "A short text-to-image prompt for a clean, modern, abstract cover illustration (no text in the image)",
  "contentHtml": "The article BODY as clean semantic HTML"
}

Strict rules for contentHtml:
- Use only these tags: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>, <a>. Do NOT include <h1>, <html>, <head>, <style>, or scripts.
- LENGTH IS A STRICT REQUIREMENT: the contentHtml MUST be at least 900 words (aim for 1000-1300). Do not stop early or summarize; write full, detailed sections. An article that is too short will be rejected.
- Real, specific, accurate information only. No invented statistics. No "as an AI".
- Include at least 5 <h2> sections, each with 2-4 full paragraphs, plus a step-by-step list where it makes sense. Longer, genuinely useful sections are better than short ones.
- Include a final section "<h2>Frequently asked questions</h2>" with at least two "<h3>" question headings and answers.
- Mention that the tools run in the browser with no uploads (privacy) where relevant.
- Include at least ONE internal link using href="/" to one of these tools: ${toolLinks}. Use a descriptive anchor, e.g. <a href="/">PDF compressor</a>.
- Output must be valid JSON. Escape any quotes inside strings.`;
}

// Retry prompt: feed the rejected draft back and demand a longer, richer rewrite.
// This is what reliably gets concise models (e.g. GPT-4o-mini) over the word gate.
function buildExpandPrompt(topic, article, problems) {
  return `You previously wrote a draft article for the "PDF Tools" blog on the topic "${topic.title}", but it was REJECTED by our quality checker for: ${problems.join('; ')}.

Here is your previous draft's contentHtml:
"""
${article.contentHtml}
"""

Rewrite and substantially EXPAND it so it clearly passes. Requirements:
- It MUST be at least ${MIN_WORDS + 200} words (aim for 1100-1400). This is the most important fix — do NOT return anything shorter than before.
- Keep it accurate and genuinely useful. Add real depth, concrete examples, and at least one ADDITIONAL <h2> section — do not pad with repetition or filler.
- Keep every required element: at least five <h2> sections, a "<h2>Frequently asked questions</h2>" section with two or more <h3> Q&A pairs, and at least one internal link using href="/" to a relevant tool.
- Use only these tags: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>, <a>. No <h1>.

Return ONLY the same JSON object shape as before (keys: title, excerpt, description, tags, imagePrompt, contentHtml), with the expanded contentHtml.`;
}

// --- providers -------------------------------------------------------------
async function callGemini(prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('no GEMINI_API_KEY');
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, responseMimeType: 'application/json', maxOutputTokens: 8192 }
    })
  });
  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') || '';
  if (!text) throw new Error('Gemini returned empty content');
  return stripCodeFence(text);
}

async function callGroq(prompt) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error('no GROQ_API_KEY');
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      max_tokens: 6000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a helpful technical writer. Always respond with a single valid JSON object.' },
        { role: 'user', content: prompt }
      ]
    })
  });
  if (!res.ok) throw new Error(`Groq HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || '';
  if (!text) throw new Error('Groq returned empty content');
  return stripCodeFence(text);
}

// GitHub Models — free access to OpenAI (GPT-4o-mini) & others via a GitHub token.
// In GitHub Actions this uses the built-in GITHUB_TOKEN (needs `models: read`).
// Locally, set GITHUB_TOKEN to a personal access token.
async function callGithubModels(prompt) {
  const token = process.env.GITHUB_MODELS_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) throw new Error('no GITHUB_TOKEN');
  const endpoint = process.env.GITHUB_MODELS_ENDPOINT || 'https://models.github.ai/inference/chat/completions';
  const model = process.env.GITHUB_MODELS_MODEL || 'openai/gpt-4o-mini';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      max_tokens: 6000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are a helpful technical writer. Always respond with a single valid JSON object.' },
        { role: 'user', content: prompt }
      ]
    })
  });
  if (!res.ok) throw new Error(`GitHub Models HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || '';
  if (!text) throw new Error('GitHub Models returned empty content');
  return stripCodeFence(text);
}

// Offline, deterministic provider for testing the pipeline without API keys/quota:
//   AI_PROVIDER_ORDER=mock node scripts/generate-post.js --dry-run
// Returns a too-short draft first, then a long one when asked to expand — so it
// exercises the expand/retry loop end-to-end. Never used in production ordering.
async function callMock(prompt) {
  const expanding = /EXPAND|previous draft|previously wrote/i.test(prompt);
  const sentence = 'This is a clear, specific, and genuinely helpful sentence about the topic that gives the reader real, practical value. ';
  const para = n => `<p>${sentence.repeat(n).trim()}</p>`;
  const body = expanding
    ? Array.from({ length: 12 }, () => para(6)).join('')
    : Array.from({ length: 4 }, () => para(4)).join('');
  const html =
    '<h2>Overview</h2>' + body +
    '<h2>Step by step</h2><ol><li>First step.</li><li>Second step.</li><li>Third step.</li></ol>' +
    '<p>Try our <a href="/">PDF compressor</a> — it runs in your browser with no uploads.</p>' +
    '<h2>Tips</h2><p>' + sentence.repeat(4).trim() + '</p>' +
    '<h2>Frequently asked questions</h2><h3>Is it free?</h3><p>Yes, completely.</p><h3>Is it private?</h3><p>Yes — files never leave your device.</p>';
  return JSON.stringify({
    title: 'Mock: ' + ((prompt.match(/"([^"]{5,70})"/) || [])[1] || 'Test Article'),
    excerpt: 'A mock excerpt for pipeline testing.',
    description: 'A mock SEO description for pipeline testing.',
    tags: ['test', 'mock'],
    imagePrompt: 'abstract blue and purple shapes',
    contentHtml: html
  });
}

// Try providers in order, falling back on any failure. Order via AI_PROVIDER_ORDER.
async function generateArticle(prompt) {
  const order = (process.env.AI_PROVIDER_ORDER || 'gemini,groq,github').split(',').map(s => s.trim());
  const providers = { gemini: callGemini, groq: callGroq, github: callGithubModels, mock: callMock };
  const errors = [];
  for (const name of order) {
    const fn = providers[name];
    if (!fn) continue;
    try {
      log(`trying provider: ${name}`);
      const raw = await fn(prompt);
      const obj = JSON.parse(raw);
      log(`provider ${name} succeeded`);
      return obj;
    } catch (err) {
      log(`provider ${name} failed: ${err.message}`);
      errors.push(`${name}: ${err.message}`);
    }
  }
  throw new Error(`All providers failed -> ${errors.join(' | ')}`);
}

function validateArticle(a) {
  const problems = [];
  if (!a || typeof a !== 'object') return ['not an object'];
  if (!a.title) problems.push('missing title');
  if (!a.contentHtml) problems.push('missing contentHtml');
  if (a.contentHtml) {
    if (wordCount(a.contentHtml) < MIN_WORDS) problems.push(`too short (${wordCount(a.contentHtml)} < ${MIN_WORDS} words)`);
    if (!/<h2/i.test(a.contentHtml)) problems.push('no <h2> headings');
    if (!/frequently asked questions/i.test(a.contentHtml)) problems.push('no FAQ section');
    if (!/href="\//.test(a.contentHtml)) problems.push('no internal tool link');
    if (/<h1[ >]/i.test(a.contentHtml)) problems.push('contains <h1> (should not)');
  }
  return problems;
}

// --- image -----------------------------------------------------------------
async function fetchCoverImage(slug, imagePrompt) {
  if (DRY_RUN) { log('dry-run: skipping cover image fetch'); return writeSvgCover(slug, imagePrompt); }
  const prompt = encodeURIComponent(`${imagePrompt}. Clean modern flat vector illustration, soft blue and purple palette, no text, no words`);
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=1200&height=630&nologo=true&model=flux`;
  try {
    log('fetching cover image from Pollinations...');
    const res = await fetch(url, { signal: AbortSignal.timeout(90000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) throw new Error('image too small, likely an error response');
    const file = path.join(IMAGES_DIR, `${slug}.jpg`);
    if (!DRY_RUN) fs.writeFileSync(file, buf);
    log(`saved image (${Math.round(buf.length / 1024)} KB)`);
    return `/blog/images/${slug}.jpg`;
  } catch (err) {
    log(`image fetch failed (${err.message}) — falling back to generated SVG cover`);
    return writeSvgCover(slug, imagePrompt);
  }
}

function writeSvgCover(slug, title) {
  const pairs = [['#3b82f6', '#8b5cf6'], ['#0ea5e9', '#22c55e'], ['#f97316', '#ef4444'], ['#6366f1', '#ec4899']];
  // deterministic colour from slug
  let h = 0; for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const [c1, c2] = pairs[h % pairs.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="980" cy="120" r="260" fill="#ffffff" opacity="0.08"/>
  <circle cx="180" cy="540" r="200" fill="#0f172a" opacity="0.07"/>
  <text x="600" y="360" font-size="220" text-anchor="middle">📄</text>
  <g font-family="Segoe UI, Helvetica, Arial, sans-serif" fill="#fff">
    <text x="60" y="90" font-size="30" font-weight="700" opacity="0.95">📄 PDF Tools</text>
    <text x="600" y="560" font-size="28" text-anchor="middle" opacity="0.9">Free · Private · In your browser</text>
  </g></svg>`;
  const file = path.join(IMAGES_DIR, `${slug}.svg`);
  if (!DRY_RUN) fs.writeFileSync(file, svg);
  return `/blog/images/${slug}.svg`;
}

// --- main ------------------------------------------------------------------
async function generateOne(posts, topics) {
  const publishedSlugs = new Set(posts.map(p => p.slug));
  const topic = topics.topics.find(t => !publishedSlugs.has(slugify(t.title)));
  if (!topic) {
    log('No unused topics left in topics.json — nothing to generate. Add more topics to continue.');
    return null;
  }
  log(`topic: "${topic.title}"`);

  let article = null;
  let best = null;            // most complete rejected draft, used as the base to expand
  let lastProblems = [];
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    // First attempt writes fresh; later attempts expand the best draft with feedback.
    const prompt = (attempt > 1 && best && best.contentHtml)
      ? buildExpandPrompt(topic, best, lastProblems)
      : buildPrompt(topic);
    let candidate;
    try {
      candidate = await generateArticle(prompt);
    } catch (err) {
      log(`attempt ${attempt} generation error: ${err.message}`);
      continue;
    }
    const problems = validateArticle(candidate);
    if (problems.length === 0) { article = candidate; break; }
    lastProblems = problems;
    log(`attempt ${attempt} failed quality gate: ${problems.join('; ')} (${wordCount(candidate.contentHtml || '')} words)`);
    if (candidate.contentHtml &&
        (!best || wordCount(candidate.contentHtml) > wordCount(best.contentHtml || ''))) {
      best = candidate;
    }
  }
  if (!article) throw new Error(`Article failed quality gates after ${MAX_ATTEMPTS} attempts`);

  const title = article.title.trim();
  const slug = slugify(topic.title); // slug tied to topic so dedupe is stable
  const image = await fetchCoverImage(slug, article.imagePrompt || title);

  const post = {
    slug,
    title,
    excerpt: (article.excerpt || '').trim(),
    description: (article.description || article.excerpt || '').trim(),
    date: todayISO(),
    author: 'PDF Tools Team',
    tags: Array.isArray(article.tags) && article.tags.length ? article.tags.slice(0, 3) : (topic.tags || []),
    image,
    imageAlt: title,
    relatedTools: topic.relatedTools || [{ label: 'PDF Tools', href: '/' }],
    contentHtml: article.contentHtml.trim()
  };

  log(`generated "${post.title}" (${wordCount(post.contentHtml)} words, image ${image})`);
  return post;
}

(async () => {
  const posts = readJSON(POSTS_JSON);
  const topics = readJSON(TOPICS_JSON);
  if (!DRY_RUN) fs.mkdirSync(IMAGES_DIR, { recursive: true });

  const created = [];
  for (let i = 0; i < COUNT; i++) {
    const post = await generateOne(posts, topics);
    if (!post) break;
    posts.unshift(post);
    created.push(post);
  }

  if (!created.length) {
    log('No posts created.');
    return;
  }

  if (DRY_RUN) {
    log(`DRY RUN — would add ${created.length} post(s): ${created.map(p => p.slug).join(', ')}`);
    return;
  }

  fs.writeFileSync(POSTS_JSON, JSON.stringify(posts, null, 2) + '\n');
  log(`updated posts.json (+${created.length})`);

  log('rebuilding blog...');
  execFileSync('node', [path.join(__dirname, 'build-blog.js')], { stdio: 'inherit' });

  // Expose new slugs to the GitHub Actions step (for the PR title/body)
  if (process.env.GITHUB_OUTPUT) {
    const titles = created.map(p => p.title).join(' | ');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `created_count=${created.length}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `created_titles=${titles}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `created_slugs=${created.map(p => p.slug).join(',')}\n`);
  }
  log('done.');
})().catch(err => {
  console.error(`[generate] FATAL: ${err.message}`);
  process.exit(1);
});
