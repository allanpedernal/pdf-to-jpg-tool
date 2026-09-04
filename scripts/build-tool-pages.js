#!/usr/bin/env node
// Generates an SEO landing page per tool by cloning the working index.html shell
// and: (1) swapping title/description/canonical/OG/Twitter, (2) pre-selecting the
// tool via window.INITIAL_TOOL (so the real tool loads on the page), (3) injecting
// unique supporting content (intro + how-to + FAQ) with HowTo/FAQPage schema.
//
//   node scripts/build-tool-pages.js
//
// Each page is fully functional (loads the same app) AND uniquely indexable, so the
// site can rank for "compress pdf", "jpg to pdf", "png to jpg", etc. individually.

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE = 'https://www.pdf-to-jpg-tool.com';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// --- SEO content per tool --------------------------------------------------
const TOOLS = [
  {
    slug: 'pdf-to-jpg', toolId: 'pdf-to-jpg',
    title: 'PDF to JPG Converter — Free, No Upload',
    desc: 'Convert PDF to JPG free in your browser. Turn every PDF page into a high-quality JPG image instantly — no uploads, no watermarks, no signup.',
    h1: 'PDF to JPG Converter',
    intro: 'Convert each page of a PDF into a high-quality JPG image, right in your browser. Your file never leaves your device — the whole conversion happens locally, so it is private and fast.',
    steps: ['Drag your PDF onto the drop zone (or click to browse).', 'Choose the quality and scale (150 DPI for screen, 300 for print).', 'Click convert and download your JPG images — individually or as a ZIP.'],
    faqs: [['Is it really free?', 'Yes — unlimited conversions, no watermarks, no signup.'], ['Are my files uploaded?', 'No. Everything is processed in your browser; your PDF never leaves your device.'], ['Can I convert a multi-page PDF?', 'Yes, every page becomes its own JPG and you can download them all as a ZIP.']]
  },
  {
    slug: 'pdf-to-png', toolId: 'pdf-to-png',
    title: 'PDF to PNG Converter — Free, Lossless',
    desc: 'Convert PDF to PNG free in your browser. Get crisp, lossless PNG images from any PDF page — perfect for text and sharp graphics. No uploads.',
    h1: 'PDF to PNG Converter',
    intro: 'Turn PDF pages into lossless PNG images with crisp text and sharp edges. PNG is ideal when quality matters more than file size. Everything runs in your browser — no uploads.',
    steps: ['Drop your PDF into the converter.', 'Pick the resolution you need.', 'Convert and download sharp PNG images of every page.'],
    faqs: [['When should I use PNG instead of JPG?', 'Use PNG for text, screenshots and line art where sharp edges matter, or when you need transparency.'], ['Does it reduce quality?', 'No — PNG is lossless, so there are no compression artifacts.']]
  },
  {
    slug: 'jpg-to-pdf', toolId: 'jpg-to-pdf',
    title: 'JPG to PDF Converter — Combine Images Free',
    desc: 'Convert JPG to PDF free in your browser. Combine multiple photos or images into a single PDF, set page size and order — no uploads, no signup.',
    h1: 'JPG to PDF Converter',
    intro: 'Combine one or many JPG images into a single, tidy PDF. Reorder pages, choose A4 or Letter, and download — all in your browser with no uploads.',
    steps: ['Select or drag in all the images you want to combine.', 'Drag to reorder them and pick a page size.', 'Convert and download your single PDF.'],
    faqs: [['Can I combine many images at once?', 'Yes — add as many as you like and drag to set the page order.'], ['Will the quality drop?', 'No, your images are placed into the PDF at full quality.']]
  },
  {
    slug: 'compress-pdf', toolId: 'pdf-compress',
    title: 'Compress PDF — Reduce PDF File Size Free',
    desc: 'Compress PDF free in your browser. Reduce PDF file size for email and uploads while keeping text readable — no uploads, no watermarks, no signup.',
    h1: 'Compress PDF',
    intro: 'Shrink large PDFs so they fit email and upload limits, without wrecking quality. The compression happens locally in your browser, so even confidential documents stay private.',
    steps: ['Drop your PDF into the compressor.', 'Choose a compression level (medium is a good balance).', 'Compress and download the smaller file.'],
    faqs: [['Will it blur my text?', 'No — text stays sharp; only oversized embedded images are downsampled.'], ['Is it safe for sensitive files?', 'Yes, compression runs in your browser so the file is never uploaded.']]
  },
  {
    slug: 'split-pdf', toolId: 'pdf-split',
    title: 'Split PDF — Extract Pages Free Online',
    desc: 'Split PDF free in your browser. Extract specific pages or page ranges from a PDF into separate files — no uploads, no watermarks, no signup.',
    h1: 'Split PDF',
    intro: 'Pull out the exact pages you need from a PDF — a single page, a range, or break a big file into parts. Runs entirely in your browser with no uploads.',
    steps: ['Open your PDF in the splitter.', 'Choose the pages or ranges to extract.', 'Download your new, smaller PDF(s).'],
    faqs: [['Can I extract just one page?', 'Yes — pick a single page or any range you need.'], ['Is the original changed?', 'No, you get new files; the original PDF is untouched.']]
  },
  {
    slug: 'merge-pdf', toolId: 'pdf-merge',
    title: 'Merge PDF — Combine PDF Files Free',
    desc: 'Merge PDF free in your browser. Combine multiple PDF files into one document in any order — no uploads, no watermarks, no signup required.',
    h1: 'Merge PDF',
    intro: 'Combine several PDFs into one tidy document. Drag to set the order, then merge — all in your browser, so private documents never get uploaded.',
    steps: ['Add all the PDFs you want to combine.', 'Drag them into the order you want.', 'Merge and download the single combined PDF.'],
    faqs: [['Is there a file limit?', 'No fixed limit — very large files just depend on your device memory.'], ['Are my files private?', 'Yes, merging happens locally in your browser with no uploads.']]
  },
  {
    slug: 'rotate-pdf', toolId: 'pdf-rotate',
    title: 'Rotate PDF — Fix Page Orientation Free',
    desc: 'Rotate PDF pages free in your browser. Fix sideways or upside-down scans and save the corrected PDF — no uploads, no watermarks, no signup.',
    h1: 'Rotate PDF',
    intro: 'Fix PDF pages that were scanned sideways or upside down. Rotate individual pages or the whole document and save — all locally in your browser.',
    steps: ['Open your PDF in the rotate tool.', 'Rotate the pages that need fixing.', 'Download the corrected PDF.'],
    faqs: [['Can I rotate just one page?', 'Yes — rotate a single page or all pages at once.'], ['Does rotating reduce quality?', 'No, the page content is preserved exactly.']]
  },
  {
    slug: 'pdf-ocr', toolId: 'pdf-ocr',
    title: 'PDF OCR — Extract Text From PDF Free',
    desc: 'Extract text from scanned PDFs free with OCR, in your browser. Turn image-based PDFs into selectable, copyable text — no uploads, no signup.',
    h1: 'PDF OCR — Extract Text',
    intro: 'Pull selectable text out of scanned, image-based PDFs using OCR. Useful for copying from documents you can only view as pictures. Runs in your browser.',
    steps: ['Open your scanned PDF in the OCR tool.', 'Run text recognition.', 'Copy or download the extracted text.'],
    faqs: [['What is OCR?', 'Optical Character Recognition — it reads text from images so you can copy and search it.'], ['Does it work on photos of documents?', 'Yes, as long as the text is reasonably clear and not too blurry.']]
  },
  {
    slug: 'png-to-jpg', toolId: 'png-to-jpg',
    title: 'PNG to JPG Converter — Free, No Upload',
    desc: 'Convert PNG to JPG free in your browser. Shrink large PNGs into smaller JPG files for sharing and the web — no uploads, no watermarks, no signup.',
    h1: 'PNG to JPG Converter',
    intro: 'Convert PNG images to smaller, widely-compatible JPG files — great for email and faster web pages. Everything runs in your browser with no uploads.',
    steps: ['Drag in one or more PNG files.', 'Choose the JPG quality.', 'Convert and download your JPGs.'],
    faqs: [['Why convert PNG to JPG?', 'JPG files are much smaller for photos, which helps email and page speed.'], ['Will I lose transparency?', 'JPG has no transparency, so transparent areas become a solid background.']]
  },
  {
    slug: 'resize-image', toolId: 'image-resize',
    title: 'Resize Image — Free Online Image Resizer',
    desc: 'Resize images free in your browser. Change width and height in pixels for any JPG or PNG without losing quality — no uploads, no signup.',
    h1: 'Image Resizer',
    intro: 'Resize any image to exact pixel dimensions for social media, websites or uploads. Keep the aspect ratio or set a custom size — all in your browser.',
    steps: ['Drop in the image you want to resize.', 'Enter the new width/height (or scale).', 'Download the resized image.'],
    faqs: [['Will resizing blur my image?', 'Shrinking keeps it crisp; enlarging beyond the original size can soften it.'], ['Can I keep the aspect ratio?', 'Yes — lock the ratio so the image is not stretched.']]
  },
  {
    slug: 'compress-image', toolId: 'image-compress',
    title: 'Compress Image — Reduce Image Size Free',
    desc: 'Compress images free in your browser. Reduce JPG and PNG file size for faster websites and email while keeping them sharp — no uploads, no signup.',
    h1: 'Image Compressor',
    intro: 'Reduce the file size of JPG and PNG images for faster-loading websites and smaller email attachments, while keeping them looking sharp. Runs locally in your browser.',
    steps: ['Drag in the image(s) to compress.', 'Choose how much to compress.', 'Download the smaller image.'],
    faqs: [['How much smaller will it get?', 'Often 50–80% smaller with little visible difference, depending on the image.'], ['Are my images uploaded?', 'No — compression happens entirely in your browser.']]
  },
  {
    slug: 'heic-to-jpg', toolId: 'heic-to-jpg',
    title: 'HEIC to JPG Converter — Free iPhone Photos',
    desc: 'Convert HEIC to JPG free in your browser. Turn iPhone HEIC photos into universally compatible JPGs that open anywhere — no uploads, no signup.',
    h1: 'HEIC to JPG Converter',
    intro: "Convert Apple's HEIC photos from your iPhone into JPGs that open on any device, app or website. Batch-convert as many as you like — all in your browser, no uploads.",
    steps: ['Drag in your HEIC photos (one or many).', 'Convert them to JPG.', 'Download the universally-compatible JPGs.'],
    faqs: [['Why won\'t my iPhone photos open?', 'iPhones save as HEIC, which some apps and sites don\'t support — JPG opens everywhere.'], ['Can I convert many at once?', 'Yes, batch-convert a whole set and download them together.']]
  },
  {
    slug: 'jpg-to-png', toolId: 'jpg-to-png',
    title: 'JPG to PNG Converter — Free, No Upload',
    desc: 'Convert JPG to PNG free in your browser. Turn JPG/JPEG photos into lossless PNG images — no uploads, no watermarks, no signup.',
    h1: 'JPG to PNG Converter',
    intro: 'Convert JPG or JPEG images into lossless PNG files, right in your browser. Useful when you need a format that supports crisp edges. Your images never leave your device.',
    steps: ['Drag your JPG images onto the drop zone (or click to browse).', 'Click "Convert to PNG".', 'Download your PNG images — one file, or all of them as a ZIP.'],
    faqs: [['Why convert JPG to PNG?', 'PNG is lossless and keeps sharp edges crisp; some workflows and editors prefer it.'], ['Does it upload my images?', 'No — conversion happens entirely in your browser.'], ['Can I convert many at once?', 'Yes, batch-convert and download them together as a ZIP.']]
  },
  {
    slug: 'image-to-webp', toolId: 'image-to-webp',
    title: 'Image to WebP Converter — Free, Smaller Images',
    desc: 'Convert JPG & PNG to WebP free in your browser. WebP makes images much smaller for faster websites — no uploads, no signup.',
    h1: 'Image to WebP Converter',
    intro: 'Convert JPG and PNG images to WebP — a modern format that is far smaller at similar quality, perfect for faster-loading websites. Everything runs in your browser.',
    steps: ['Drag your images onto the drop zone.', 'Click "Convert to WebP".', 'Download the smaller WebP files (single file or a ZIP).'],
    faqs: [['Why use WebP?', 'WebP files are typically 25–35% smaller than JPG/PNG at similar quality, which speeds up websites.'], ['Is WebP supported everywhere?', 'All modern browsers support WebP; for very old software, keep a JPG/PNG copy too.'], ['Are my images uploaded?', 'No — conversion is 100% in your browser.']]
  },
  {
    slug: 'webp-to-jpg', toolId: 'webp-to-jpg',
    title: 'WebP to JPG Converter — Free, No Upload',
    desc: 'Convert WebP to JPG free in your browser. Turn WebP images into universally-supported JPG files — no uploads, no signup.',
    h1: 'WebP to JPG Converter',
    intro: 'Convert WebP images into JPG that opens on any device, app or website. Everything runs locally in your browser — no uploads.',
    steps: ['Drag your WebP images onto the drop zone.', 'Click "Convert to JPG".', 'Download one JPG or all of them as a ZIP.'],
    faqs: [['Why convert WebP to JPG?', 'Some apps and older software don\'t support WebP — JPG works everywhere.'], ['Are my images uploaded?', 'No — conversion happens entirely in your browser.']]
  },
  {
    slug: 'webp-to-png', toolId: 'webp-to-png',
    title: 'WebP to PNG Converter — Free, Lossless',
    desc: 'Convert WebP to PNG free in your browser. Get lossless PNG images (with transparency) from WebP — no uploads, no signup.',
    h1: 'WebP to PNG Converter',
    intro: 'Convert WebP images into lossless PNG files, preserving transparency. Runs entirely in your browser with no uploads.',
    steps: ['Drag your WebP images in.', 'Click "Convert to PNG".', 'Download a single PNG or all of them as a ZIP.'],
    faqs: [['Does it keep transparency?', 'Yes — transparent WebP areas are preserved in the PNG.'], ['Are my images uploaded?', 'No — it all happens in your browser.']]
  },
  {
    slug: 'add-page-numbers-to-pdf', toolId: 'pdf-pagenum',
    title: 'Add Page Numbers to PDF — Free Online',
    desc: 'Add page numbers to a PDF free in your browser. Choose position, format and start number — lossless, no uploads, no signup.',
    h1: 'Add Page Numbers to PDF',
    intro: 'Stamp page numbers onto every page of your PDF, with control over position, format and starting number. It is lossless (your text and images are untouched) and runs entirely in your browser.',
    steps: ['Upload your PDF (it stays on your device).', 'Pick the position, format, start number and size.', 'Click "Add Page Numbers" and download the result.'],
    faqs: [['Does it change my content?', 'No — it only adds numbers on top; your existing content is preserved.'], ['Is my PDF uploaded?', 'No — page numbers are added locally in your browser.'], ['Can I start at a custom number?', 'Yes — set any starting value.']]
  },
  {
    slug: 'qr-code-generator', toolId: 'qr-code',
    title: 'QR Code Generator — Free, No Signup',
    desc: 'Free QR code generator. Create a QR code for any link or text and download a high-quality PNG — no signup, no expiry, in your browser.',
    h1: 'QR Code Generator',
    intro: 'Create a QR code for any URL or text and download it as a PNG. The codes are static (they never expire) and are generated right in your browser.',
    steps: ['Type or paste your link or text.', 'Pick a size — the QR code previews live.', 'Download the PNG and print or share it.'],
    faqs: [['Do these QR codes expire?', 'No — they\'re static, encoded directly from your text, so they work forever.'], ['Is it free?', 'Yes — unlimited QR codes, no signup, no watermark.'], ['Is my data uploaded?', 'No — the QR code is generated locally in your browser.']]
  },
  {
    slug: 'password-generator', toolId: 'password-generator',
    title: 'Password Generator — Free & Secure',
    desc: 'Free secure password generator. Create strong, random passwords with custom length and character sets — generated privately in your browser.',
    h1: 'Password Generator',
    intro: 'Generate strong, truly-random passwords using your browser\'s cryptographically-secure generator. Control the length and character types. Nothing is ever sent or stored.',
    steps: ['Choose a length (6–64).', 'Pick character types (A-Z, a-z, 0-9, symbols).', 'Click Generate and copy your password.'],
    faqs: [['Are these passwords safe?', 'Yes — they use the browser\'s cryptographically-secure random generator.'], ['Are passwords stored or sent anywhere?', 'No — everything happens locally; nothing is uploaded or saved.'], ['How long should it be?', 'At least 16 characters with mixed types is a strong baseline.']]
  },
  {
    slug: 'word-counter', toolId: 'word-counter',
    title: 'Word Counter — Free Word & Character Count',
    desc: 'Free word and character counter. Count words, characters, sentences and reading time as you type — private, in your browser, no signup.',
    h1: 'Word & Character Counter',
    intro: 'Count words, characters, sentences and estimated reading time in real time as you type. Perfect for essays, SEO meta descriptions, tweets and more. Your text stays in your browser.',
    steps: ['Type or paste your text.', 'See live word, character and sentence counts.', 'Use the counts to hit your target length.'],
    faqs: [['How is reading time calculated?', 'Based on an average of about 200 words per minute.'], ['Is my text uploaded?', 'No — it stays entirely in your browser.'], ['Is there a length limit?', 'No practical limit — paste as much as you like.']]
  }
];

// --- ad density guard (G8) -------------------------------------------------
// AdSense policy: no ads on pages with little or no content. A generated tool
// page inherits three ad units from the index.html shell, so a page whose
// injected content leaves it under AD_MIN_WORDS must ship without them.
//
// This is deliberately conditional rather than a blanket strip: as the per-tool
// copy grows past the threshold the ads come back on their own, with no second
// edit. Do not "simplify" it into an unconditional removal.
const AD_MIN_WORDS = 300;

// Same measurement as scripts/seo-audit.js — keep the two in step.
function crawlableWords(html) {
  const t = html
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .trim();
  return t ? t.split(/\s+/).length : 0;
}

// Remove one balanced element starting at the first match of `startRe`.
// Regex alone cannot do this: the bottom banner nests three divs deep.
function removeElement(html, startRe, tag) {
  const m = html.match(startRe);
  if (!m) return html;
  const start = m.index;
  const open = new RegExp(`<${tag}\\b`, 'gi');
  const close = new RegExp(`</${tag}\\s*>`, 'gi');
  let depth = 0, i = start;
  while (i < html.length) {
    open.lastIndex = i; close.lastIndex = i;
    const o = open.exec(html), c = close.exec(html);
    if (!c) break;
    if (o && o.index < c.index) { depth++; i = o.index + o[0].length; }
    else {
      depth--;
      i = c.index + c[0].length;
      if (depth === 0) return html.slice(0, start) + html.slice(i);
    }
  }
  return html;
}

function stripAdUnits(html) {
  html = removeElement(html, /<aside id="left-ad"/i, 'aside');
  html = removeElement(html, /<aside id="right-ad"/i, 'aside');
  html = removeElement(html, /<div class="col-12 mt-auto ad-bottom"/i, 'div');
  // The sidebars were col-lg-2 each; without them main must span the row or
  // the content sits in 8 of 12 columns with dead space beside it.
  return html.replace(
    /(<main id="main-content" class=")col-12 col-lg-8( p-0")/,
    '$1col-12$2'
  );
}

// --- build -----------------------------------------------------------------
function toolJsonLd(t) {
  const howto = {
    '@context': 'https://schema.org', '@type': 'HowTo', name: t.h1,
    description: t.desc,
    step: t.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s }))
  };
  const faq = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: t.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  };
  const app = {
    '@context': 'https://schema.org', '@type': 'WebApplication', name: t.h1,
    url: `${SITE}/${t.slug}.html`, applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
  };
  return [howto, faq, app].map(o => `  <script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n  </script>`).join('\n');
}

function seoSection(t) {
  const steps = t.steps.map(s => `          <li>${esc(s)}</li>`).join('\n');
  const faqs = t.faqs.map(([q, a]) => `          <div class="mb-3"><h3 class="h6 fw-bold mb-1" style="color:var(--text-primary);">${esc(q)}</h3><p class="mb-0" style="color:var(--text-secondary);">${esc(a)}</p></div>`).join('\n');
  return `
      <!-- SEO content (unique per tool) -->
      <section class="w-100 px-3 px-lg-4 py-4" style="max-width:900px; margin:0 auto;">
        <h1 class="fw-bold mb-3" style="font-size:2rem; color:var(--text-primary);">${esc(t.h1)}</h1>
        <p class="mb-4" style="font-size:1.05rem; color:var(--text-secondary); line-height:1.8;">${esc(t.intro)}</p>
        <h2 class="h5 fw-bold mb-3" style="color:var(--text-primary);">How to ${esc(t.h1.replace(/ —.*/, ''))}</h2>
        <ol style="color:var(--text-secondary); line-height:1.9;">
${steps}
        </ol>
        <h2 class="h5 fw-bold mt-4 mb-3" style="color:var(--text-primary);">Frequently asked questions</h2>
${faqs}
      </section>`;
}

function replaceMeta(html, t) {
  const url = `${SITE}/${t.slug}.html`;
  const T = esc(t.title), D = esc(t.desc);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${T}</title>`)
    .replace(/(<meta name="title" content=")[^"]*(">)/, `$1${T}$2`)
    .replace(/(<meta name="description" content=")[^"]*(">)/, `$1${D}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(">)/, `$1${T}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${D}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(">)/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(">)/, `$1${T}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(">)/, `$1${D}$2`)
    .replace(/(<meta name="twitter:url" content=")[^"]*(">)/, `$1${url}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(">)/, `$1${url}$2`);
}

function main() {
  const shell = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  for (const t of TOOLS) {
    let html = replaceMeta(shell, t);
    // Strip the homepage's JSON-LD (it's about the homepage, conflicts on a tool page)
    html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
    // pre-select the tool + tool-specific structured data, injected into <head>
    const headInject = `  <script>window.INITIAL_TOOL = ${JSON.stringify(t.toolId)};</script>\n${toolJsonLd(t)}\n</head>`;
    html = html.replace('</head>', headInject);
    // Empty #tool-content (the tool fills it via JS) so we don't ship the homepage's
    // landing copy/H1 on every tool page (avoids duplicate content + double H1),
    // then add the unique supporting content below it.
    html = html.replace(
      /<div id="tool-content"[\s\S]*?<\/main>/,
      `<div id="tool-content" class="w-100 py-3"></div>\n          </div>\n        </div>\n${seoSection(t)}\n      </main>`
    );
    // G8: strip inherited ad units while the page is still thin.
    const words = crawlableWords(html);
    let adNote = '';
    if (words < AD_MIN_WORDS) {
      html = stripAdUnits(html);
      adNote = `  [ads stripped — ${words}w < ${AD_MIN_WORDS}]`;
    }

    fs.writeFileSync(path.join(ROOT, `${t.slug}.html`), html);
    console.log(`[tool-pages] wrote ${t.slug}.html  (${t.toolId})${adNote}`);
  }
  console.log(`[tool-pages] done — ${TOOLS.length} pages. Slugs: ${TOOLS.map(t => t.slug).join(', ')}`);
}
if (require.main === module) main();
module.exports = { TOOLS };
