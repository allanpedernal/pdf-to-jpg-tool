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
  }
];

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
    // unique supporting content below the tool, inside the main column
    html = html.replace('      </main>', `${seoSection(t)}\n      </main>`);
    fs.writeFileSync(path.join(ROOT, `${t.slug}.html`), html);
    console.log(`[tool-pages] wrote ${t.slug}.html  (${t.toolId})`);
  }
  console.log(`[tool-pages] done — ${TOOLS.length} pages. Slugs: ${TOOLS.map(t => t.slug).join(', ')}`);
}
if (require.main === module) main();
module.exports = { TOOLS };
