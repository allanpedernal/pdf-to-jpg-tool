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

const CONTENT = require('./tool-content.js');
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

// --- copy resolution ------------------------------------------------------
// The FAQ and step text must come from ONE source for both the JSON-LD and the
// rendered HTML. Reading them from different places is exactly how a page ends
// up marking up content it does not display — the spam-policy problem in B2.
function copyFor(t) {
  const c = CONTENT[t.slug] || {};
  return {
    lead: c.lead || t.intro,
    sections: c.sections || [],
    steps: t.steps,
    faqs: c.faqs || t.faqs,
  };
}

// "How to ${h1}" reads wrong for the noun-phrase tools ("How to PDF to JPG
// Converter"). No single rule fixes all 20, so the heading is stated per tool.
const HOW_TITLE = {
  'pdf-to-jpg': 'How to convert a PDF to JPG',
  'pdf-to-png': 'How to convert a PDF to PNG',
  'jpg-to-pdf': 'How to convert JPG images to a PDF',
  'compress-pdf': 'How to compress a PDF',
  'split-pdf': 'How to split a PDF',
  'merge-pdf': 'How to merge PDF files',
  'rotate-pdf': 'How to rotate PDF pages',
  'pdf-ocr': 'How to extract text from a scanned PDF',
  'png-to-jpg': 'How to convert PNG to JPG',
  'resize-image': 'How to resize an image',
  'compress-image': 'How to compress an image',
  'heic-to-jpg': 'How to convert HEIC to JPG',
  'jpg-to-png': 'How to convert JPG to PNG',
  'image-to-webp': 'How to convert an image to WebP',
  'webp-to-jpg': 'How to convert WebP to JPG',
  'webp-to-png': 'How to convert WebP to PNG',
  'add-page-numbers-to-pdf': 'How to add page numbers to a PDF',
  'qr-code-generator': 'How to generate a QR code',
  'password-generator': 'How to generate a strong password',
  'word-counter': 'How to count words and characters',
};

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

// End index of the balanced element starting at `start`.
function elementEnd(html, start, tag) {
  const open = new RegExp(`<${tag}\\b`, 'gi');
  const close = new RegExp(`</${tag}\\s*>`, 'gi');
  let depth = 0, i = start;
  for (;;) {
    open.lastIndex = i; close.lastIndex = i;
    const o = open.exec(html), c = close.exec(html);
    if (!c) throw new Error(`unbalanced <${tag}>`);
    if (o && o.index < c.index) { depth++; i = o.index + o[0].length; }
    else { depth--; i = c.index + c[0].length; if (depth === 0) return i; }
  }
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
  const copy = copyFor(t);
  const howto = {
    '@context': 'https://schema.org', '@type': 'HowTo', name: t.h1,
    description: t.desc,
    step: copy.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s }))
  };
  const faq = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: copy.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  };
  const app = {
    '@context': 'https://schema.org', '@type': 'WebApplication', name: t.h1,
    url: `${SITE}/${t.slug}.html`, applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
  };
  return [howto, faq, app].map(o => `  <script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n  </script>`).join('\n');
}

// --- section design ---------------------------------------------------------
// The static sections use the same card language tools.js uses for its own
// (sectionWhy, sectionUseCases): white card, centred gradient title, primary
// circles for numbered steps. Reusing those classes keeps both themes working —
// .text-light and .text-secondary resolve through the theme variables in
// style.css — and keeps this copy visually part of the page rather than prose
// pasted onto the background.
const TITLE = 'font-size: 2.5rem; font-weight: 700;';

function card(inner, bodyClass = '') {
  return `
        <div class="card border-0 shadow-sm mb-5">
          <div class="card-body p-4 p-lg-5${bodyClass ? ' ' + bodyClass : ''}">${inner}
          </div>
        </div>`;
}

function introCard(h1, lead) {
  return card(`
            <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">${esc(h1)}</h1>
            <p class="text-light mx-auto mb-0" style="max-width: 760px; font-size: 1.1rem; line-height: 1.8;">${esc(lead)}</p>`,
    'text-center');
}

// steps: [{ title?, text }]
function stepsCard(title, steps) {
  // The tool column is only ~660px wide at common laptop widths, so four steps
  // in one row wrap every title onto two lines. Four go 2x2; three fit a row.
  const col = steps.length >= 4 ? 'col-sm-6' : 'col-md-4';
  const items = steps.map((s, i) => `
              <div class="${col}">
                <div class="text-center">
                  <div class="mb-3"><div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">${i + 1}</div></div>${s.title ? `
                  <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">${esc(s.title)}</h3>` : ''}
                  <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">${esc(s.text)}</p>
                </div>
              </div>`).join('');
  return card(`
            <h2 class="text-gradient fw-bold mb-5 text-center" style="${TITLE}"><i class="bi bi-list-ol me-2"></i>${esc(title)}</h2>
            <div class="row g-4 justify-content-center">${items}
            </div>`);
}

// Long-form prose is left-aligned and capped near 75 characters a line;
// centred paragraphs of this length are hard to read.
function proseCard(h2, paragraphs) {
  const ps = paragraphs.map((par, i) => `
            <p class="text-light ${i === paragraphs.length - 1 ? 'mb-0' : 'mb-3'}" style="max-width: 75ch; font-size: 1rem; line-height: 1.8;">${esc(par)}</p>`).join('');
  return card(`
            <h2 class="text-gradient fw-bold mb-4" style="font-size: 1.75rem; font-weight: 700;">${esc(h2)}</h2>${ps}`);
}

// The accordion body is real markup, not JS state, so a crawler reads every
// answer while it is visually collapsed.
function faqCard(accId, faqs) {
  const items = faqs.map(([q, a], i) => `
              <div class="accordion-item border-secondary mb-3 rounded faq-item">
                <h3 class="accordion-header"><button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#${accId}-${i}" aria-expanded="false" aria-controls="${accId}-${i}" style="font-size: 1rem; padding: 1rem;">${esc(q)}</button></h3>
                <div id="${accId}-${i}" class="accordion-collapse collapse" data-bs-parent="#${accId}"><div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">${esc(a)}</div></div>
              </div>`).join('');
  return card(`
            <h2 class="text-gradient fw-bold mb-5 text-center" style="${TITLE}"><i class="bi bi-question-circle me-2"></i>Frequently Asked Questions</h2>
            <div class="accordion accordion-flush" id="${accId}">${items}
            </div>`);
}

function seoSection(t) {
  const copy = copyFor(t);
  const howTitle = HOW_TITLE[t.slug] || `How to use the ${t.h1.replace(/ —.*/, '')}`;
  return `
      <!-- SEO content (unique per tool) -->
      <section class="w-100">${introCard(t.h1, copy.lead)}${stepsCard(howTitle, copy.steps.map(text => ({ text })))}${copy.sections.map(sec => proseCard(sec.h2, sec.p)).join('')}${faqCard(`faq-${t.slug}`, copy.faqs)}
      </section>`;
}

// --- homepage section ---------------------------------------------------------
// index.html renders its own HowTo + FAQPage schema as visible cards. It is
// regenerated from that schema on every build, so the markup and the visible
// copy cannot drift apart, and it shares the card design above with the tool
// pages. It sits inside the tool column as the next sibling of #tool-content,
// for the same reason the tool-page section does (see the injection below).
const HOME_H1 = 'Free Online PDF & Image Tools';
const HOME_LEAD = 'Professional PDF and image conversion tools that work entirely in your browser.';

function homeSection(indexHtml) {
  let howto, faq;
  for (const m of indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const j = JSON.parse(m[1]);
    if (j['@type'] === 'HowTo') howto = j;
    if (j['@type'] === 'FAQPage') faq = j;
  }
  if (!howto || !faq) throw new Error('index.html is missing its HowTo or FAQPage schema');
  return `
      <!-- Homepage SEO content: generated by scripts/build-tool-pages.js from the
           HowTo and FAQPage schema in this file. Edit the schema, not this block. -->
      <section id="home-seo-content" class="w-100">${introCard(HOME_H1, HOME_LEAD)}${stepsCard(howto.name, howto.step.map(s => ({ title: s.name, text: s.text })))}${faqCard('faq-home', faq.mainEntity.map(q => [q.name, q.acceptedAnswer.text]))}
      </section>`;
}

function writeHomeSection() {
  const file = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  // Remove exactly what homeSection() emits — the leading newline, the comment
  // and the section — so rebuilding restores the byte-identical file. The
  // section contains no nested <section>, so the lazy match stops at its own
  // closing tag.
  html = html.replace(/\n[ \t]*<!-- Homepage SEO content[\s\S]*?<\/section>/, '');
  const open = html.search(/<div id="tool-content"/);
  if (open < 0) throw new Error('index.html has no #tool-content');
  const close = elementEnd(html, open, 'div');
  html = html.slice(0, close) + homeSection(html) + html.slice(close);
  fs.writeFileSync(file, html);
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
  writeHomeSection();
  const shell = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  for (const t of TOOLS) {
    let html = replaceMeta(shell, t);
    // Strip the homepage's JSON-LD (it's about the homepage, conflicts on a tool page)
    html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

    // index.html renders its own HowTo + FAQ block (see #home-seo-content).
    // Tool pages must not inherit it: it is PDF-to-JPG-specific copy, and
    // cloning it onto 20 pages would create exactly the near-duplicate
    // content the per-tool sections below exist to avoid.
    html = removeElement(html, /<section id="home-seo-content"/i, 'section');
    // pre-select the tool + tool-specific structured data, injected into <head>
    const headInject = `  <script>window.INITIAL_TOOL = ${JSON.stringify(t.toolId)};</script>\n${toolJsonLd(t)}\n</head>`;
    html = html.replace('</head>', headInject);
    // Empty #tool-content (the tool fills it via JS) so we don't ship the homepage's
    // landing copy/H1 on every tool page (avoids duplicate content + double H1),
    // then add the unique supporting content below it.
    // The SEO section goes INSIDE the tool column, as the next sibling of
    // #tool-content (never inside it — app.js replaces its innerHTML).
    //
    // Not after the column, and not after <main>'s inner row: that row is
    // `row g-0 h-100`, i.e. height:100% of <main>, so any sibling placed after
    // it overflows <main> and the footer paints over it. Not outside <main>
    // either: that clears the overlap but pulls the prose out of the column,
    // misaligned with the tool above and stranded below the sidebar.
    html = html.replace(
      /<div id="tool-content"[\s\S]*?<\/main>/,
      `<div id="tool-content" class="w-100 py-3"></div>\n${seoSection(t)}\n          </div>\n        </div>\n      </main>`
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
