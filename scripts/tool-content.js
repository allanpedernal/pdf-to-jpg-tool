#!/usr/bin/env node
// Long-form, per-tool page copy for the SEO sections in build-tool-pages.js.
//
// Kept separate from the TOOLS config table so the copy can be read and edited
// as prose rather than scrolled past as configuration.
//
// Rules for anything added here:
//   - Every claim must be true of the tool as it actually behaves. No invented
//     benchmarks, no invented limits, no testimonials.
//   - Write for someone who arrived from a search, not for a keyword counter.
//     Concrete numbers (DPI, pixel sizes, file-size ranges) beat adjectives.
//   - Keep each tool's copy genuinely its own. Twenty pages saying the same
//     thing with the nouns swapped is the low-value signal that got the site
//     rejected in the first place — it is worse than short pages.
//
// Rendered by seoSection() as: h1, lead, how-to steps, sections, FAQs.

'use strict';

module.exports = {

  'pdf-to-jpg': {
    lead: 'Turn every page of a PDF into a standalone JPG image without installing anything or handing your file to a server. The conversion runs on your own machine using your browser\'s rendering engine, so a contract, a payslip or a medical scan never travels anywhere. Drop the file in, pick a resolution, and download the pages individually or as a single ZIP.',
    sections: [
      { h2: 'Choosing a resolution that matches the job', p: [
        'The scale setting controls how many pixels each PDF page becomes, and it is the only setting that really matters. A scale of 1.0 renders the page at its nominal size, roughly 72 pixels per inch — fine for a thumbnail, too soft for anything else. Around 1.6 gives you something close to 115 DPI, which is comfortable for reading on screen and for dropping into a slide deck.',
        'Push to 2.0 or higher when the JPG is destined for print or when the page carries small type, tables or fine line art. An A4 page at scale 4.0 lands near 300 DPI, the traditional print threshold, and produces an image around 2480 by 3508 pixels. The trade is file size and time: each doubling of scale roughly quadruples the pixel count, so a 20-page document at scale 4.0 is a meaningfully heavier download than the same document at 1.6.',
      ]},
      { h2: 'When JPG is the right format — and when it is not', p: [
        'JPG uses lossy compression tuned for photographs and continuous tone. It is the right choice when your PDF pages are scans, photographs, or design-heavy layouts, and when you need the smallest file that still looks good. At quality 0.85 most people cannot see the difference from the original at normal viewing size, while the file is a fraction of the equivalent PNG.',
        'It is the wrong choice for pages that are mostly sharp black text on white, screenshots of user interfaces, or diagrams with hard edges. JPG compression smears those edges into faint halos that get worse every time the file is re-saved. For that material use the PDF to PNG converter instead — PNG is lossless, so text stays crisp at any zoom level.',
      ]},
      { h2: 'Multi-page documents and batch downloads', p: [
        'Every page of the PDF becomes its own numbered JPG. For a single-page document you get one image; for a hundred-page report you get a hundred, packaged into one ZIP so you are not clicking through a hundred save dialogs. Page order is preserved in the filenames, so the archive stays sorted correctly when you extract it.',
        'Because the work happens on your device rather than a shared server, there is no upload queue and no per-file size ceiling imposed by a hosting plan. The practical limit is your own available memory: very large documents at very high scale will be slower on a phone than on a laptop.',
      ]},
    ],
    faqs: [
      ['What DPI should I use for printing?', 'Aim for about 300 DPI. Since the scale setting is relative to a nominal 72 DPI, a scale of roughly 4.0 gets you there for a standard page. For a large-format poster where viewers stand further back, 150 DPI is usually enough.'],
      ['Why does my text look blurry?', 'Almost always because the scale is too low for the amount of detail on the page, and JPG compression is softening what is left. Raise the scale to 2.0 or above. If the page is mainly text or line art, convert it to PNG instead — the format, not the setting, is the problem.'],
      ['Can I convert just one page of a long PDF?', 'The converter renders every page, then you download only the images you want rather than the whole ZIP. To work with a single page as a PDF first, use the Split PDF tool to extract it, then convert that.'],
      ['Does converting change the original PDF?', 'No. The original file on your device is only read, never modified or moved. You end up with new JPG files alongside it.'],
    ],
  },

  'pdf-to-png': {
    lead: 'Render PDF pages as PNG images with no compression artifacts and no upload. PNG stores pixels losslessly, so text edges, thin rules and flat colour stay exactly as the PDF describes them — which makes it the format to reach for whenever the page is a document rather than a photograph.',
    sections: [
      { h2: 'Why lossless matters for documents', p: [
        'JPG achieves its small files by discarding detail the eye is unlikely to miss in a photograph. That assumption breaks down on the hard black-to-white transitions that make up text and diagrams, where the discarded detail shows up as faint grey shadowing around every character. Zoom in on a JPG of a text page and you will see it; the same page as PNG stays clean at any magnification.',
        'The cost is size. A page of dense text might be 200 KB as a JPG and 600 KB as a PNG. That is the right trade when the image will be read, re-cropped, annotated or re-saved, because PNG survives repeated editing without degrading while JPG loses a little more each time it is written.',
      ]},
      { h2: 'Transparency and compositing', p: [
        'PNG supports an alpha channel, so it can carry genuine transparency rather than baking a white rectangle behind the content. That matters when you are placing a rendered page onto a coloured slide, layering it in a design tool, or building a mockup where the page needs to sit over an existing background.',
        'JPG has no concept of transparency at all — any transparent region is filled with solid colour on export. If your workflow involves compositing at any stage, render to PNG and convert later if you need to.',
      ]},
      { h2: 'Choosing between PNG and JPG', p: [
        'A quick rule: if you would describe the page as a document, use PNG; if you would describe it as a picture, use JPG. Screenshots, invoices, forms, code listings, charts, engineering drawings and anything with a legend all favour PNG. Photo books, scanned photographs and image-led brochures favour JPG.',
        'If you need both — say, a crisp version for the record and a light version for email — render to PNG first and use the PNG to JPG converter for the second copy. Going the other way loses detail you cannot recover.',
      ]},
      { h2: "Batch work and page ranges", p: [
        "Every page becomes its own PNG, numbered in document order, and long documents arrive as a single ZIP rather than a stream of individual downloads. For a hundred-page manual that is the difference between one click and a hundred.",
        "If you only need a section, extract it first with the Split PDF tool and convert the result. Rendering a 400-page document to get four pages wastes time and memory, particularly on a phone, where available memory is the real constraint on how large a document you can process comfortably.",
      ]},
    ],
    faqs: [
      ['Is PNG better quality than JPG?', 'It is lossless, which is not the same as higher resolution. At the same scale both hold identical detail, but PNG stores it exactly while JPG approximates it. On photographs the difference is usually invisible; on text and line art it is obvious.'],
      ['Why is my PNG file so large?', 'PNG compresses by finding repeated patterns, which works well on flat colour and poorly on photographic noise. A scanned photo page can be several times larger as PNG than as JPG. If the page is photographic, JPG is the better format.'],
      ['Will the transparent areas stay transparent?', 'Yes, where the PDF actually defines transparency. Many PDFs paint an opaque white background as part of the page, in which case there is no transparency to preserve.'],
      ['Can I use these PNGs in Word or Google Docs?', 'Yes. PNG is supported everywhere JPG is, including Word, Google Docs, Slides, Keynote and every modern browser.'],
    ],
  },

  'jpg-to-pdf': {
    lead: 'Combine photos and scans into a single PDF you can email, print or archive, with the page order under your control and nothing leaving your device. Useful for turning phone snaps of a receipt into one tidy document, or assembling scanned pages that arrived as separate image files.',
    sections: [
      { h2: 'Page order and why it matters', p: [
        'Images are placed into the PDF in the order you add them, and you can rearrange before generating. This sounds trivial until you scan a ten-page document and find your scanner named the files in an order that sorts as 1, 10, 2, 3 — a classic alphabetical-versus-numeric mismatch that puts page ten second.',
        'Check the order before you generate rather than after. Reordering here takes a moment; fixing it in the finished PDF means splitting and merging it again.',
      ]},
      { h2: 'Quality, size and what gets preserved', p: [
        'Your images are embedded at their existing resolution rather than downsampled, so a 12-megapixel phone photo goes in as a 12-megapixel photo. That keeps the document faithful, but it also means a twenty-photo PDF can run to tens of megabytes — beyond the attachment limit of most mail servers.',
        'If the result is too heavy to send, run it through the Compress PDF tool afterwards. That downsamples the oversized embedded images while leaving any text layer untouched, which is usually enough to bring a bulky photo PDF under a 25 MB limit.',
      ]},
      { h2: 'Working with phone photos of documents', p: [
        'Photographs of paper are rarely square to the page. Before converting, crop away the desk and any surrounding clutter, and straighten the page if your phone gallery offers it — a PDF made from tidy source images looks like a document, while one made from raw snaps looks like a photo album.',
        'Even lighting helps more than resolution. A shadow across the page survives every downstream step, and it will defeat OCR later if you ever want to extract the text.',
      ]},
      { h2: "Paper size and printing", p: [
        "Pages are sized to the images you supply, so a set of phone photos produces a PDF with photo-shaped pages rather than A4 ones. That is usually what you want on screen, and occasionally a surprise at the printer, where an unusual page size may be scaled or centred on the sheet.",
        "If the document will definitely be printed, crop your images to a standard ratio first \u2014 1.41:1 for A4, 1.29:1 for US Letter. Doing that before conversion gives you control over what gets trimmed, rather than leaving it to a print driver.",
      ]},
    ],
    faqs: [
      ['Can I combine many images into one PDF?', 'Yes — add as many as you like and set the order before generating. Every image becomes its own page.'],
      ['Will the image quality drop?', 'No. Images are placed at full quality, which is why the resulting file can be large. Compress it afterwards if you need a smaller document.'],
      ['What image formats can I use?', 'JPG and PNG both work. If your photos are HEIC from an iPhone, convert them to JPG first with the HEIC to JPG tool.'],
      ['Can I mix portrait and landscape photos?', 'Yes. Each page is sized to its image, so a mixed set produces a PDF with mixed page orientations.'],
    ],
  },

  'compress-pdf': {
    lead: 'Shrink a PDF that is too large to email without turning the text into mush. The compressor targets the oversized images embedded in the file — usually the real reason a document is heavy — and leaves the text layer alone, so words stay selectable, searchable and sharp.',
    sections: [
      { h2: 'Where the weight in a PDF actually is', p: [
        'A page of pure text is tiny; a few kilobytes covers a dense page, because the file stores characters and font references rather than pixels. What inflates a PDF is almost always embedded imagery: a scanned page, a full-bleed photograph, or a logo saved at print resolution and then placed at thumbnail size.',
        'That last case is the most common and the most wasteful. A 4000-pixel-wide image displayed in a 400-pixel-wide box carries ten times the detail anyone will ever see, and every copy of the document drags it along. Downsampling that image to something matched to its display size can cut a file by 80 percent with no visible change.',
      ]},
      { h2: 'What compression will not do', p: [
        'Text does not compress much further, because it is not stored as pixels in the first place. If your PDF is 40 MB of text with no images, there is little to recover, and a tool promising otherwise is either rasterising your pages — turning searchable text into a picture of text — or removing content.',
        'Compression also cannot recover detail once removed. Keep the original if the document is a legal record, an archival scan or anything you may need at full fidelity later. Compress a copy for sending.',
      ]},
      { h2: 'Getting under an email attachment limit', p: [
        'Most mail providers cap attachments somewhere between 20 and 25 MB, and some corporate gateways are stricter. If one pass does not get you there, the usual culprit is a handful of very large scanned pages rather than the document as a whole.',
        'Splitting a long document into two or three smaller PDFs is often more practical than compressing harder, and it avoids degrading pages that were fine to begin with. The Split PDF tool handles that without a second upload.',
      ]},
      { h2: "Scanned documents behave differently", p: [
        "A digitally created PDF \u2014 exported from Word, InDesign or a browser \u2014 stores text as text and compresses very little further. A scanned PDF is a stack of photographs of paper, and that is where the large savings live.",
        "Scans also respond well to a resolution matched to their purpose. A contract that only needs to be readable on screen does not need 600 DPI page images; 200 DPI is comfortable and a fraction of the size. If you also want the text to be searchable, run the document through the PDF OCR tool before compressing, since heavy compression makes character recognition harder.",
      ]},
    ],
    faqs: [
      ['Will compression blur my text?', 'No. Text is stored as characters and font data, not pixels, and is left untouched. Only oversized embedded images are downsampled.'],
      ['Is it safe for confidential documents?', 'Yes. Compression runs entirely in your browser — the file is never uploaded, so there is no server copy to worry about.'],
      ['Why did my file barely get smaller?', 'Because it was already efficient. A text-only PDF has little to remove. Large files that resist compression are usually already-compressed scans.'],
      ['Does it remove any content?', 'No pages, text or images are removed. Images are re-encoded at a resolution matched to how they are actually displayed.'],
    ],
  },

  'split-pdf': {
    lead: 'Pull a single page or a run of pages out of a PDF and save them as a new document, without uploading the original anywhere. Useful for sending one signed page instead of a forty-page contract, or for breaking a bulky report into sections small enough to email.',
    sections: [
      { h2: 'Extracting a page versus splitting a document', p: [
        'These are different jobs that people often conflate. Extracting means taking pages 12 to 15 out of a long document and saving just those. Splitting means cutting one document into several — chapters, sections, or fixed-size chunks — and keeping all of it.',
        'Both start the same way: choose the page or range you want. For an extraction you take one range and stop. For a split you repeat the operation across the document, producing a file per section. The original is untouched either way, so there is no risk in experimenting.',
      ]},
      { h2: 'Working out which pages you need', p: [
        'PDF page numbers and printed page numbers frequently disagree. A report with a cover, a blank verso and Roman-numbered front matter can easily have printed page 1 sitting at PDF page 7. Always go by the position in the viewer rather than the number printed on the page.',
        'If the document has bookmarks, they are the fastest way to find section boundaries. Open the outline panel in your PDF viewer, note the page each section starts on, and use those as your split points.',
      ]},
      { h2: 'Privacy when the document is sensitive', p: [
        'Splitting is one of the operations people most often need on exactly the documents they should least want to upload: contracts, bank statements, medical records, identity documents. Because this tool runs in your browser, the file is read from disk, processed in memory and written back out without ever crossing the network.',
        'That also means it works with no connection at all. Load the page once and you can split documents on a plane or on a locked-down network.',
      ]},
      { h2: "Naming the pieces so they stay sorted", p: [
        "Whatever you extract, name it in a way that sorts correctly. Alphabetical sorting places 'section-10' before 'section-2', which scrambles a set of extracts the moment someone opens the folder.",
        "Zero-padding fixes it: 'section-02' and 'section-10' sort correctly everywhere. Leading the name with a date in year-month-day order does the same job for documents that accumulate over time, and both conventions survive being emailed, zipped and unpacked on a different operating system.",
      ]},
      { h2: "Splitting large documents for sending", p: [
        "When a document is too large to email, splitting is often better than compressing. Compression degrades pages that were fine; splitting leaves every page untouched and simply sends fewer of them at a time.",
        "Break at meaningful boundaries rather than arbitrary page counts. Three files named for their sections are far easier for a recipient to handle than three named part one, two and three, and they can act on the relevant section without reassembling anything.",
      ]},
    ],
    faqs: [
      ['Can I extract just one page?', 'Yes. Choose a single page or any range and save it as a new PDF.'],
      ['Is the original file changed?', 'No. You get new files; the original stays exactly as it was.'],
      ['Do the extracted pages keep their formatting?', 'Yes. Pages are copied whole, so fonts, images, layout and any text layer come across unchanged.'],
      ['Can I split a password-protected PDF?', 'Not while it is protected. Remove the password in your PDF viewer first, then split the unprotected copy.'],
    ],
  },

  'merge-pdf': {
    lead: 'Join several PDFs into one document in the order you choose, entirely in your browser. Handy for assembling a single submission from separately signed pages, or for stitching scanned chapters back into one file.',
    sections: [
      { h2: 'Order is the whole job', p: [
        'Merging is mechanically simple and easy to get wrong in exactly one way: sequence. Set the order deliberately before you merge, especially when filenames sort alphabetically rather than logically — "appendix.pdf" lands before "chapter1.pdf" in any alphabetical list, which is almost never what you want.',
        'If the parts came from a scanner that split a document into batches, check the seam pages after merging. A duplicated or missing page at a batch boundary is the most common scanning error and the easiest to miss.',
      ]},
      { h2: 'What survives the merge', p: [
        'Page content comes across exactly: fonts, images, layout and any selectable text layer are preserved, because pages are copied rather than re-rendered. A merged document remains searchable if its sources were.',
        'Document-level features are less portable. Bookmarks, form fields and annotations vary in how well they carry across depending on how each source PDF was produced. If a source relies heavily on interactive form fields, check them in the merged file before sending it on.',
      ]},
      { h2: 'File size and practical limits', p: [
        'The merged file is roughly the sum of its parts, so combining several image-heavy PDFs produces something large. If the result needs to be emailed, run it through Compress PDF afterwards rather than compressing each part first — one pass over the finished document is more effective.',
        'There is no fixed page or file limit here because nothing is uploaded. Very large merges depend on your device\'s available memory, which is generally more generous on a laptop than on a phone.',
      ]},
      { h2: "Mixing scanned and digital sources", p: [
        "Merging a digitally created PDF with a scanned one produces a document where some pages have selectable text and others are pictures of text. It looks consistent and behaves inconsistently: searching finds hits in half the document and silently misses the rest.",
        "If the merged file needs to be searchable throughout, run the scanned parts through the PDF OCR tool before merging. Doing it first is much easier than working out afterwards which pages were the scanned ones.",
      ]},
      { h2: "Checking the result before you send it", p: [
        "Open the merged file and check three things: the total page count matches the sum of the parts, the seams between documents land where you expect, and nothing has been duplicated at a boundary. Those three checks catch nearly every merge error.",
        "Page count is the fastest signal. If twelve plus eight produces nineteen pages, a page was dropped, and finding it now is far easier than after the document has been signed, circulated or filed.",
      ]},
    ],
    faqs: [
      ['Is there a file limit?', 'No fixed limit. Because merging happens on your device, the practical ceiling is your available memory rather than a server quota.'],
      ['Are my files private?', 'Yes. Merging happens locally in your browser with no uploads, so none of the documents leave your device.'],
      ['Will the merged PDF still be searchable?', 'Yes, provided the originals were. Pages are copied intact, including their text layer.'],
      ['Can I reorder pages after merging?', 'Reorder the source files before merging. To rearrange afterwards, split the merged document and merge again in the order you want.'],
    ],
  },

  'rotate-pdf': {
    lead: 'Fix pages that were scanned sideways or upside down and save the corrected document, without uploading anything. Rotate a single page or the whole file in ninety-degree steps and get a PDF that opens the right way up everywhere.',
    sections: [
      { h2: 'Why scanned pages come out sideways', p: [
        'Sheet-fed scanners record the direction paper travelled through the feeder, not the direction the text runs. Feed a landscape spreadsheet into a portrait-oriented scanner and every page arrives rotated ninety degrees, even though the scan itself is perfectly good.',
        'Mixed documents are the awkward case: a report that is mostly portrait with three landscape tables in the middle needs those three pages rotated and the rest left alone. Rotating page by page is the fix, and it is why a whole-document rotation is not always what you want.',
      ]},
      { h2: 'Rotating the file rather than the view', p: [
        'Most PDF viewers offer a rotate button, but it usually only turns the page on your screen for the current session. Close the file and it is sideways again, and anyone you send it to sees the original orientation.',
        'Saving a rotated copy writes the correct orientation into the document itself, so it opens the right way up for every recipient, in every viewer, and prints correctly without anyone reaching for a setting.',
      ]},
      { h2: 'Quality and what rotation costs', p: [
        'Nothing. Rotation in ninety-degree steps is a lossless transformation — the page content is not re-rendered or re-compressed, only its orientation flag and coordinate system change. Text stays selectable, images stay exactly as sharp as they were.',
        'That makes it safe to rotate a page several times while you work out which way is up. There is no accumulating degradation the way there is with repeatedly re-saving a JPG.',
      ]},
      { h2: "Checking a long scan efficiently", p: [
        "On a long document, do not page through every sheet. Scanners rotate consistently, so the pages that came in sideways are usually a contiguous block \u2014 one batch, one tray, one orientation.",
        "Skim the thumbnails panel in your PDF viewer instead. Wrong-way pages are obvious at thumbnail size, and you will spot the boundaries of the affected block in seconds rather than scrolling through two hundred pages one at a time.",
      ]},
      { h2: "Rotation and printing", p: [
        "A correctly rotated PDF prints the right way up without anyone touching a driver setting, which matters when the document is going to somebody else's printer. Relying on a viewer's on-screen rotation means the recipient gets it sideways.",
        "Landscape pages inside a portrait document are handled well by modern printers, which read each page's own orientation. The problems come from pages that claim portrait while containing sideways content \u2014 precisely what saving a proper rotation fixes.",
      ]},
    ],
    faqs: [
      ['Can I rotate just one page?', 'Yes. Rotate a single page or all pages at once, which is what mixed portrait and landscape documents need.'],
      ['Does rotating reduce quality?', 'No. Ninety-degree rotation is lossless — nothing is re-rendered or re-compressed.'],
      ['Why does my viewer show it correctly but others do not?', 'Your viewer is probably rotating the on-screen view only, without saving it. Saving a rotated copy writes the orientation into the file itself.'],
      ['Can I rotate by an arbitrary angle to straighten a crooked scan?', 'Not here — rotation is in ninety-degree steps. Correcting a slight skew means re-rendering the page, which costs quality; straightening in your scanner software gives a better result.'],
    ],
  },

  'pdf-ocr': {
    lead: 'Pull selectable, searchable text out of a scanned PDF or a photograph of a document using optical character recognition that runs in your browser. Nothing is uploaded, which matters because the documents people most need to OCR are usually the ones they least want on someone else\'s server.',
    sections: [
      { h2: 'What OCR is doing', p: [
        'A scanned page is a picture. To a computer it contains no words at all — you cannot select a sentence, search for a name or copy a paragraph, because there is nothing there but pixels arranged in the shape of letters. OCR examines those shapes and works out which characters they represent, producing real text you can search and edit.',
        'That is a recognition problem, not a conversion, which is why results vary. A clean 300 DPI scan of printed text is recognised almost perfectly. A phone photo taken at an angle in poor light is a much harder problem, and the output will show it.',
      ]},
      { h2: 'Getting a better result from a worse scan', p: [
        'Resolution matters up to a point and then stops. Below roughly 200 DPI, character shapes break down and accuracy falls sharply; 300 DPI is the sweet spot for ordinary print. Beyond about 600 DPI you gain little but a much slower recognition pass.',
        'Contrast and geometry matter more than most people expect. Even lighting with no shadow across the page, and text running square rather than at a slant, will improve accuracy more than any resolution increase. If you are photographing a page, flatten it and shoot straight down.',
      ]},
      { h2: 'What OCR handles poorly', p: [
        'Handwriting is a genuinely different problem from printed text and should not be expected to work. Decorative and script fonts, very small type, text printed over photographs, and low-contrast colour combinations all degrade accuracy substantially.',
        'Complex layouts are a separate difficulty from character recognition. Multi-column pages, tables and sidebars may be read accurately character by character while the reading order comes out scrambled, because working out that column two continues from column one is a layout problem rather than a recognition one. Always proofread OCR output before relying on it.',
      ]},
      { h2: "What to do with the text once you have it", p: [
        "Recognised text is most useful when it goes somewhere searchable. Paste it into a note, a document or a knowledge base and the content becomes findable by full-text search, which is usually the actual goal rather than the extraction itself.",
        "Always proofread numbers before relying on them. Character recognition is least reliable exactly where errors cost most \u2014 digits in amounts, dates and reference codes, where a misread 8 for a 3 changes the meaning without looking obviously wrong.",
      ]},
    ],
    faqs: [
      ['What is OCR?', 'Optical Character Recognition — it reads the shapes of letters in an image and converts them into real text you can select, search and copy.'],
      ['Does it work on photos of documents?', 'Yes, as long as the text is reasonably sharp, evenly lit and roughly square to the frame. Shadows and angles hurt accuracy more than low resolution does.'],
      ['Will it recognise handwriting?', 'No. Handwriting recognition is a different technology; this handles printed and typed text.'],
      ['Why is some text wrong?', 'OCR estimates characters from their shapes, so unusual fonts, small type, low contrast or skew produce errors. Proofread the output before relying on it.'],
    ],
  },

  'png-to-jpg': {
    lead: 'Convert PNG images to JPG to cut file size dramatically, in your browser and without uploads. The right move for photographs that were saved as PNG and are now many times larger than they need to be — and the wrong move for screenshots and logos, which is worth knowing before you convert.',
    sections: [
      { h2: 'Why the size difference is so large', p: [
        'PNG compresses losslessly by finding repeated patterns. That works beautifully on flat colour, sharp edges and large uniform areas, and it works badly on photographs, where almost every pixel differs slightly from its neighbour and there is very little repetition to exploit.',
        'JPG makes the opposite bet: it discards fine detail the eye is unlikely to miss in a photograph, and gets very small files as a result. A photograph saved as PNG at 4 MB frequently becomes a 400 KB JPG that looks identical at normal viewing size. On a website, that difference is the whole page-speed story.',
      ]},
      { h2: 'Transparency is the thing you lose', p: [
        'JPG has no alpha channel at all. Any transparent area in your PNG becomes solid colour on conversion — typically white — which is fine for a photograph with no transparency and disastrous for a logo meant to sit on a coloured background.',
        'If your image has transparency you actually rely on, convert to WebP instead: it supports an alpha channel and still produces far smaller files than PNG. Keep the PNG as the master in either case.',
      ]},
      { h2: 'Deciding before you convert', p: [
        'Convert to JPG when the image is a photograph, a scan of a photograph, or any continuous-tone artwork, and when it is destined for email, a document or a web page.',
        'Keep the PNG when the image is a screenshot, a logo, an icon, a chart, a diagram, or anything with text in it. JPG compression puts visible halos around hard edges, and screenshots are almost entirely hard edges — the result looks noticeably worse while saving less than it would on a photo.',
      ]},
      { h2: "What this means for page speed", p: [
        "Images are usually the largest thing a web page downloads, ahead of scripts and stylesheets. Converting photographic PNGs to JPG frequently removes several megabytes from a page, and that shows up directly in how quickly the page becomes usable on a phone connection.",
        "Search engines measure this. Largest Contentful Paint, one of the Core Web Vitals used in ranking, is very often an image \u2014 so the format decision is a ranking factor as well as a courtesy to your visitors.",
      ]},
    ],
    faqs: [
      ['Why convert PNG to JPG?', 'Mostly for size. Photographs stored as PNG are often five to ten times larger than the equivalent JPG with no visible quality difference at normal viewing size.'],
      ['Will I lose transparency?', 'Yes. JPG has no transparency, so transparent areas become a solid background colour. Use WebP if you need transparency and small files.'],
      ['Will the quality drop?', 'JPG is lossy, so technically yes, but at high quality settings the difference is invisible on photographs. On screenshots and line art it is visible, and PNG is the better choice.'],
      ['Can I convert back to PNG later?', 'You can change the format back, but the detail discarded during JPG compression does not return. Keep the original PNG if you may need it.'],
    ],
  },

  'resize-image': {
    lead: 'Change an image\'s pixel dimensions for a website, an upload limit or a print size, without uploading it anywhere. Resizing correctly is mostly a matter of knowing which direction is safe: making images smaller works well, making them larger does not.',
    sections: [
      { h2: 'Downscaling works, upscaling does not', p: [
        'Reducing an image\'s dimensions is a well-behaved operation. There is more information in the source than the target needs, so the extra detail is averaged away and the result usually looks sharper and cleaner than the original did at that size.',
        'Enlarging is the opposite. The pixels that would carry the extra detail were never captured, so they have to be invented by interpolating between neighbours. That produces softness and, past about 200 percent, visible blockiness. Where possible, go back to the highest-resolution original rather than upscaling a small copy.',
      ]},
      { h2: 'Aspect ratio and unwanted stretching', p: [
        'Aspect ratio is the relationship between width and height. Change one without the other and everything in the frame stretches — the single most common and most obvious resizing mistake. Keep the ratio locked unless you have a specific reason not to.',
        'When a target size demands a different shape, crop rather than stretch. Cropping loses content at the edges but keeps everything that remains looking correct; stretching keeps all the content and makes every face in it wrong.',
      ]},
      { h2: 'Sizes worth knowing', p: [
        'For the web, match the pixel width to the space the image actually occupies, then roughly double it for high-density displays. A full-width banner is typically 1600 to 2000 pixels wide, an in-article image 800 to 1200, and a thumbnail 300 to 400.',
        'For print, work back from physical size and resolution: pixels equal inches multiplied by DPI. A 6 by 4 inch photo at 300 DPI needs 1800 by 1200 pixels. An A4 page at 300 DPI needs about 2480 by 3508. Below those numbers, print looks soft no matter how good the source.',
      ]},
      { h2: "Common target sizes", p: [
        "Social platforms crop to fixed ratios, so matching them avoids having your composition decided by an algorithm. A square post is 1080 by 1080, a portrait post 1080 by 1350, a story 1080 by 1920, and a typical link preview 1200 by 630.",
        "Email signatures and document logos want smaller files than they usually get: 300 to 600 pixels wide is plenty, and a 3000-pixel logo in an email signature is attached to every message you ever send.",
      ]},
    ],
    faqs: [
      ['Will resizing reduce quality?', 'Making an image smaller generally looks fine and often looks sharper. Making it larger cannot add detail that was never captured, so it looks soft.'],
      ['How do I avoid stretched images?', 'Keep the aspect ratio locked so width and height change together. If you need a different shape, crop instead of stretching.'],
      ['What size should web images be?', 'Match the display width and roughly double it for high-density screens — around 1600 to 2000 pixels for a full-width banner, 800 to 1200 for an in-article image.'],
      ['Is my image uploaded?', 'No. Resizing happens in your browser and the file never leaves your device.'],
    ],
  },


  'compress-image': {
    lead: 'Reduce an image\'s file size while keeping it looking right, entirely in your browser. Most images on the web are several times larger than they need to be, and shrinking them is the single cheapest improvement you can make to how fast a page loads.',
    sections: [
      { h2: 'Where the quality setting actually bites', p: [
        'JPG quality runs from 0 to 1, and the relationship between that number and the file size is steep and uneven. Dropping from 1.0 to 0.85 typically halves the file with no visible change on a photograph. Dropping from 0.85 to 0.7 saves much less and starts to show as soft blocking in smooth gradients like skies and skin.',
        'That makes roughly 0.8 to 0.85 the practical sweet spot for photographs on the web. Go lower only when a hard size limit forces it, and check the result at full size rather than as a thumbnail — compression artifacts hide at small scale and reappear when someone zooms.',
      ]},
      { h2: 'Resize first, then compress', p: [
        'Compression and resizing solve different halves of the same problem, and the order matters. A 4000-pixel-wide photograph displayed in an 800-pixel column is carrying five times the pixels anyone will see. No amount of quality reduction fixes that; it just makes an oversized image blurry as well as heavy.',
        'Resize to the dimensions the image is actually displayed at, then compress. Doing both usually takes a multi-megabyte camera file to something under 200 KB, which is a completely different page-load experience from compressing alone.',
      ]},
      { h2: 'Knowing when to stop', p: [
        'Compression is lossy and cumulative. Each save discards a little more detail, and re-compressing an already-compressed image degrades it further while saving very little — the easy wins were taken the first time.',
        'Keep the original as your master and compress copies. If you later need a different size or a different format, going back to the original gives a clean result; re-processing the compressed copy compounds every artifact already in it.',
      ]},
      { h2: "Choosing the format before the quality", p: [
        "Format choice usually saves more than quality tuning. A photograph converted to WebP is typically 25 to 35 percent smaller than the same photograph as a well-compressed JPG, at the same visual quality.",
        "The decision tree is short. Photograph for the web: WebP, with a JPG fallback if you need one. Photograph for email or print: JPG. Screenshot, logo or diagram: PNG, or lossless WebP if everything that will open it supports the format.",
      ]},
    ],
    faqs: [
      ['How much can I compress without it showing?', 'On photographs, quality around 0.8 to 0.85 usually halves the file with no visible difference. Below about 0.7, smooth areas like skies start to show blocking.'],
      ['Should I resize or compress?', 'Both, in that order. Resize to the dimensions actually displayed, then compress. Resizing alone leaves quality on the table; compressing alone leaves an oversized image.'],
      ['Does compressing repeatedly make it worse?', 'Yes. JPG compression is lossy and cumulative, so each re-save discards more detail. Always compress from the original.'],
      ['Are my images uploaded?', 'No. Compression runs in your browser and the file never leaves your device.'],
    ],
  },

  'heic-to-jpg': {
    lead: 'Convert the HEIC photos an iPhone produces into JPG files that open anywhere, without uploading them. HEIC is a genuinely better format than JPG, which is exactly why Apple adopted it — and exactly why the rest of the world still cannot always open it.',
    sections: [
      { h2: 'What HEIC is and why iPhones use it', p: [
        'HEIC stores an image using HEVC, the same compression family as modern video. It reaches roughly half the file size of a JPG at comparable quality, and it supports features JPG never had: 16-bit colour depth, transparency, and multiple images in one container, which is how Live Photos are stored.',
        'Apple switched the default camera format in iOS 11 for exactly those reasons. The photos on your phone are smaller and better than JPGs would be, which is a real benefit right up until you send one to someone whose software has never heard of the format.',
      ]},
      { h2: 'Why the file will not open', p: [
        'HEVC is patent-encumbered, and licensing costs slowed adoption everywhere outside Apple\'s ecosystem. Windows needs an extra codec from the Microsoft Store, many older Android builds cannot display HEIC at all, and a long tail of web forms, printing services and document systems simply reject the extension.',
        'Converting to JPG trades away the size advantage for the one thing that matters when you need to send a photo to somebody: it opens. JPG has been universally supported for three decades and will be opened correctly by anything with a screen.',
      ]},
      { h2: 'What changes in the conversion', p: [
        'Visible image quality is essentially unchanged at high JPG quality settings — the difference between the formats is compression efficiency, not fidelity. The resulting JPG will be roughly twice the size of the HEIC for the same picture.',
        'Two things do not survive. Live Photos lose their motion, because JPG holds a single still frame; you keep the key photo and lose the seconds around it. Depth and portrait-mode data are also dropped, so background blur is baked in permanently and can no longer be adjusted after the fact.',
      ]},
      { h2: "Converting a whole camera roll", p: [
        "Exporting many photos at once is where the format bites hardest, because a mixed folder of HEIC and JPG will half-open in whatever you hand it to. Converting the whole set first gives you a folder that behaves consistently everywhere.",
        "Watch the storage cost. The JPGs will be roughly twice the size of the HEICs, so a 5 GB export becomes around 10 GB. Keep the HEIC originals on the phone or in your photo library and treat the JPGs as a working copy for sharing.",
      ]},
    ],
    faqs: [
      ['Why can I not open HEIC files on Windows?', 'HEIC uses HEVC compression, which is patent-encumbered. Windows needs an extra codec from the Microsoft Store; converting to JPG avoids the problem entirely.'],
      ['Will converting reduce quality?', 'Not visibly at high quality settings. The JPG will be roughly twice the file size for the same picture, because JPG compresses less efficiently.'],
      ['What happens to Live Photos?', 'You keep the still key frame. The motion is not part of a JPG and is lost in conversion.'],
      ['Can I stop my iPhone making HEIC files?', 'Yes — Settings, Camera, Formats, Most Compatible. Your phone will shoot JPG from then on, using more storage.'],
    ],
  },

  'jpg-to-png': {
    lead: 'Convert JPG images to PNG in your browser, with no uploads. Worth being clear about what this does and does not achieve: it stops any further quality loss from here on, but it cannot restore the detail JPG compression already discarded.',
    sections: [
      { h2: 'What converting to PNG gains you', p: [
        'PNG is lossless, so once an image is in PNG form you can open, edit and re-save it as many times as you like without degrading it further. That matters if the file is entering an editing workflow where it will be cropped, annotated or adjusted repeatedly — every one of those steps would cost quality in JPG.',
        'PNG also supports an alpha channel, which JPG does not. If you plan to cut out a background or composite the image over something else, you need a format that can carry transparency, and this is the conversion that gets you there.',
      ]},
      { h2: 'What it cannot do', p: [
        'It cannot undo JPG compression. The detail discarded when the file was first saved as a JPG is gone, and the compression artifacts around edges are now part of the image data. Converting to PNG preserves those artifacts perfectly and losslessly — which is not the same as removing them.',
        'It will also make the file substantially larger, often by three to five times, because PNG compresses photographic content poorly. You are paying for the ability to edit without further loss, not for better-looking pixels.',
      ]},
      { h2: 'When to convert and when not to', p: [
        'Convert when the image is about to be edited repeatedly, when you need to add transparency, or when a tool or specification demands PNG input. Screenshots that were mistakenly saved as JPG are also worth converting, since further JPG saves would keep degrading their sharp edges.',
        'Do not convert simply to make a photograph look better on a web page. The result is a much heavier file that looks identical, which slows the page down for no benefit. For web photographs, a well-compressed JPG or a WebP is the better answer.',
      ]},
      { h2: "Screenshots deserve special mention", p: [
        "Screenshots are the clearest case for PNG. They are almost entirely sharp edges \u2014 window borders, text, icons, flat interface colour \u2014 which is exactly the material JPG compression handles worst, ringing faint halos around every edge.",
        "A screenshot saved as JPG is also usually larger than the same screenshot as PNG, because flat interface colour compresses beautifully under PNG and poorly under JPG. It is the rare case where the lossless format wins on both quality and size.",
      ]},
    ],
    faqs: [
      ['Will converting to PNG improve quality?', 'No. It prevents further loss from future saves, but the detail JPG already discarded cannot be recovered.'],
      ['Why is the PNG so much bigger?', 'PNG compresses flat colour and sharp edges well and photographic detail poorly. A photo is typically three to five times larger as PNG.'],
      ['Does it add transparency?', 'It gives the file the ability to store transparency. The image itself stays fully opaque until you erase part of it in an editor.'],
      ['Should I use PNG for photos on my website?', 'Usually not. A well-compressed JPG or WebP looks the same and loads far faster.'],
    ],
  },

  'image-to-webp': {
    lead: 'Convert JPG and PNG images to WebP and cut their size substantially without a visible quality drop, all in your browser. WebP is the format most sites should be serving today: it compresses better than both older formats and is supported by every current browser.',
    sections: [
      { h2: 'How much smaller, and why', p: [
        'WebP typically produces files 25 to 35 percent smaller than JPG at equivalent visual quality, and dramatically smaller than PNG for photographic content. It achieves this with more modern compression than JPG\'s 1990s design — better prediction between neighbouring blocks and smarter handling of fine detail.',
        'On an image-heavy page those percentages compound. A gallery carrying 4 MB of JPGs drops to under 3 MB with no visible change, which shows up directly in load time on a phone connection and in the Core Web Vitals that search engines measure.',
      ]},
      { h2: 'The one format that does both things', p: [
        'WebP supports both lossy and lossless compression, and supports transparency in either mode. That is unusual and genuinely useful: previously a transparent logo had to be PNG and therefore large, while a photograph had to be JPG and therefore opaque.',
        'With WebP a transparent logo can use lossy compression and come out a fraction of its PNG size while keeping clean alpha edges. For anything that needs both transparency and small files, there is no better option.',
      ]},
      { h2: 'Browser support and sensible fallbacks', p: [
        'Every current browser supports WebP — Chrome, Firefox, Safari, Edge and their mobile versions. Safari was the last holdout and has supported it since version 14 in 2020, so in practice support is universal for live web traffic.',
        'The gap is outside the browser. Some desktop image editors, older email clients and a number of upload forms still do not accept WebP. Keep a JPG copy for anything that will be emailed, printed or handed to a third-party system, and serve WebP on your own pages where you control the environment.',
      ]},
      { h2: "Picking a quality level", p: [
        "WebP quality behaves much like JPG quality, and the same guidance applies: around 0.8 is the point where files get substantially smaller with no visible change on photographs. Below about 0.65, smooth gradients begin to band.",
        "For screenshots, logos and line art, use lossless WebP rather than lowering the quality. Lossless WebP is typically 20 to 30 percent smaller than the equivalent PNG while remaining pixel-exact, which is a straight improvement with no trade-off.",
      ]},
    ],
    faqs: [
      ['How much smaller is WebP than JPG?', 'Typically 25 to 35 percent at equivalent visual quality, and far smaller than PNG for photographic images.'],
      ['Do all browsers support WebP?', 'Yes. Chrome, Firefox, Safari and Edge all support it, including on mobile. Safari has since version 14.'],
      ['Does WebP support transparency?', 'Yes, in both lossy and lossless modes — which is why a transparent WebP can be a fraction of the size of the equivalent PNG.'],
      ['Should I delete my JPGs after converting?', 'Keep them. Some desktop software, email clients and upload forms still do not accept WebP.'],
    ],
  },

  'webp-to-jpg': {
    lead: 'Convert WebP images to JPG so they open in software that has not caught up with the format, without uploading anything. WebP is excellent on the web and still awkward everywhere else, and this is the conversion that gets a file into something universally accepted.',
    sections: [
      { h2: 'Why you end up with WebP files you cannot use', p: [
        'Most WebP files arrive by accident. Save an image from a modern website and you often get WebP, because that is what the site served — the format is now the default for image delivery on a large share of the web.',
        'The file is perfectly good; the problem is downstream. Older versions of Photoshop, many desktop viewers, a number of email clients and a long tail of upload forms either reject the extension outright or show nothing at all. Converting to JPG sidesteps every one of those.',
      ]},
      { h2: 'What the conversion costs', p: [
        'Both formats are lossy, so this is a re-encode rather than a straight copy, and a small amount of quality is lost in principle. At high JPG quality settings it is not visible on ordinary photographic content.',
        'The file will get larger — often 25 to 35 percent — because JPG compresses less efficiently than WebP. That is the trade: you are paying in bytes for a format that everything can open.',
      ]},
      { h2: 'Transparency needs attention', p: [
        'WebP can carry an alpha channel and JPG cannot. If your WebP has transparent regions, they will be filled with solid colour on conversion, which is fine for a photograph and wrong for a logo or an icon meant to sit on a coloured background.',
        'When transparency matters, convert to PNG instead. The file will be larger than either alternative but the alpha channel survives intact.',
      ]},
      { h2: "Where WebP files usually come from", p: [
        "Two sources account for nearly all of them. Saving an image from a modern website gives you whatever the site served, which is increasingly WebP. Exporting from a design tool with web-optimised defaults does the same.",
        "If you keep hitting the problem, change the export default rather than converting repeatedly. Where you cannot \u2014 saving from someone else's site \u2014 converting once to JPG gives you a file that every piece of software will accept without further thought.",
      ]},
      { h2: "Keeping quality through the re-encode", p: [
        "Because both formats are lossy, this conversion re-encodes rather than repackages. Use a high JPG quality \u2014 0.9 or above \u2014 so the second compression pass has little visible effect on top of the first.",
        "Convert from the original WebP rather than from a copy that has already been resized or re-saved. Each lossy step compounds, and the artifacts of earlier passes are preserved faithfully by every later one.",
      ]},
    ],
    faqs: [
      ['Why will my WebP file not open?', 'Some desktop editors, email clients and upload forms still do not support the format, even though every current browser does.'],
      ['Will quality drop?', 'Slightly in principle, since both formats are lossy and this is a re-encode. At high quality settings it is not visible on photographs.'],
      ['Will the file get bigger?', 'Usually, by roughly 25 to 35 percent, because JPG compresses less efficiently than WebP.'],
      ['What happens to transparency?', 'It is lost — JPG has no alpha channel, so transparent areas become solid colour. Convert to PNG if you need to keep it.'],
    ],
  },

  'webp-to-png': {
    lead: 'Convert WebP images to PNG in your browser, keeping transparency intact and adding no further compression loss. The right conversion when the image has an alpha channel or is heading into an editing workflow.',
    sections: [
      { h2: 'Why PNG rather than JPG', p: [
        'The deciding factor is almost always transparency. WebP can store an alpha channel; JPG cannot; PNG can. If your WebP has transparent regions and you convert to JPG, they become solid colour and there is no way back. PNG preserves them exactly.',
        'The second factor is editing. PNG is lossless, so an image can be opened, adjusted and re-saved repeatedly without degrading. If the file is entering a workflow with several edit-and-save cycles, PNG is the format that survives it.',
      ]},
      { h2: 'Expect a larger file', p: [
        'PNG will usually be several times the size of the WebP, sometimes much more on photographic content. WebP was designed for efficient delivery; PNG was designed for exact reproduction, and exactness is expensive.',
        'That makes PNG a poor choice for serving images on a page and a good choice for a working master. Convert to PNG to edit, then export back to WebP or JPG for publishing.',
      ]},
      { h2: 'Lossy sources stay lossy', p: [
        'If the WebP used lossy compression — most do — converting to PNG preserves the result of that compression perfectly, artifacts included. Lossless does not mean restored; it means nothing further is discarded from this point on.',
        'The practical implication: convert early, before an image has been through several lossy stages. Once artifacts are in the pixels, every subsequent format change carries them along.',
      ]},
      { h2: "Fitting into an editing workflow", p: [
        "The usual sequence is convert, edit, export. PNG is the working format because it survives repeated saves without degrading; the published format is whatever the destination wants, which for the web is usually WebP again.",
        "Do the conversion once at the start rather than moving between formats repeatedly. Every lossy step compounds, and a file that has been through several round trips carries the artifacts of all of them even though the last save was lossless.",
      ]},
      { h2: "When PNG is the wrong answer", p: [
        "PNG is not a universal upgrade. For an opaque photograph headed to email, a document or a web page, it produces a far larger file with no visible benefit, and JPG or WebP is the better choice.",
        "Reach for PNG when the image has transparency to preserve, when it is about to be edited repeatedly, or when a tool specifically requires PNG input. Outside those cases the extra size buys nothing.",
      ]},
    ],
    faqs: [
      ['Does the transparency survive?', 'Yes. PNG supports an alpha channel, so transparent regions in the WebP are preserved exactly.'],
      ['Will the file be bigger?', 'Yes, usually several times bigger. PNG stores data exactly rather than compressing it aggressively.'],
      ['Does converting improve quality?', 'No. It stops further loss but cannot undo compression already applied to the WebP.'],
      ['Should I use PNG or JPG?', 'PNG if the image has transparency or is about to be edited. JPG if it is an opaque photograph headed for email or a web page.'],
    ],
  },

  'add-page-numbers-to-pdf': {
    lead: 'Stamp page numbers onto an existing PDF without uploading it or opening a desktop editor. Useful for documents assembled from several sources, for court and tender submissions where numbered pages are required, and for anything that will be discussed by page over a call.',
    sections: [
      { h2: 'Why assembled documents lose their numbering', p: [
        'A PDF built by merging several files carries whatever numbering each source had. Three ten-page documents merged together produce a thirty-page PDF numbered one to ten, three times over — which is worse than no numbering at all, because two people looking at "page 4" may be looking at different pages.',
        'Scanned documents have the opposite problem: no numbers anywhere, because the original paper had none. Either way the fix is to stamp a single consistent sequence across the finished document once it is assembled.',
      ]},
      { h2: 'Placement and the pitfalls', p: [
        'Bottom centre and bottom right are the conventional positions, and bottom right is the better default for anything that will be printed and bound, since it stays visible when a reader thumbs the outside edge.',
        'The thing to check is collision. Many documents already have a footer — a filename, a confidentiality notice, a date — and a stamped number landing on top of it is worse than none. Look at a middle page before accepting the result, not just the first, because front matter often has a different layout from the body.',
      ]},
      { h2: 'Starting number and front matter', p: [
        'Documents with a cover page and a contents page conventionally start the visible numbering at the first page of real content, so the cover is not page one. Setting a starting offset gets the printed numbers matching the numbers people will cite.',
        'For legal and tender submissions the convention is usually the opposite: every physical page is numbered from the first, with no exceptions, so that a page reference is unambiguous. Check the requirements before stamping, because restamping means re-generating the document.',
      ]},
      { h2: "Number after assembling, not before", p: [
        "If the document is being built from several files, merge first and number last. Numbering the parts individually produces a merged document with three separate sequences, which is the problem numbering was supposed to solve.",
        "The same applies to insertions. Adding a page to an already-numbered document leaves every number after it wrong, and there is no way to shift them without restamping. Settle the page order, then number once.",
      ]},
    ],
    faqs: [
      ['Can I start numbering from a page other than the first?', 'Yes. Set a starting offset so front matter is skipped and the printed numbers match the pages people will cite.'],
      ['Where will the numbers appear?', 'You choose the position. Bottom right is the safest default for printed and bound documents.'],
      ['Will they overlap my existing footer?', 'They can. Check a middle page rather than only the first, since front matter often has a different layout.'],
      ['Is the original file modified?', 'No. You get a new numbered PDF and the original is left as it was.'],
    ],
  },

  'qr-code-generator': {
    lead: 'Generate a QR code from a link, some text, or contact details, entirely in your browser. Nothing is sent to a server, which also means the code is not a redirect through anyone else\'s domain — it points straight at what you put in it, permanently.',
    sections: [
      { h2: 'Static codes and why that matters', p: [
        'Many QR generators produce a code pointing at their own short URL, which then redirects to your destination. That gives them analytics and gives you the ability to change the target later, but it makes your printed code depend on their service continuing to exist and continuing to be free.',
        'The codes here are static: the destination is encoded directly into the pattern. Nobody can track scans, nobody can change where it goes, and it will keep working for as long as the destination does. The trade-off is that changing the target means generating and reprinting a new code.',
      ]},
      { h2: 'Size, distance and print quality', p: [
        'The usual rule of thumb is that a code should be about one tenth of the distance it will be scanned from. A code read at arm\'s length, on a business card or a menu, works at around 2 by 2 centimetres. A poster read from three metres needs roughly 30 centimetres.',
        'Keep the quiet zone — the blank margin around the pattern — at least four modules wide. Cropping tight to the edge of the pattern is the most common reason a printed code refuses to scan, and it is invisible as a mistake until the code is already printed.',
      ]},
      { h2: 'Keeping the encoded data short', p: [
        'The more data you encode, the denser the pattern becomes, and dense patterns need to be printed larger and scanned more carefully. A short URL produces a sparse, forgiving code; a long tracking URL with several query parameters produces a dense one that struggles at small sizes.',
        'Shorten the destination before generating rather than shrinking the printed code afterwards. Also test the finished code with more than one phone before committing to a print run — camera quality and scanning apps vary more than people expect.',
      ]},
      { h2: "What you can usefully encode", p: [
        "A URL is the common case, but a QR code carries any short text. Contact details in vCard format add someone to a phone's address book in one scan, which is what makes them useful on a business card.",
        "Wi-Fi credentials are the other genuinely useful one: a code encoding the network name and password lets a guest join without anyone reading a long passphrase aloud. Both work offline, since the data is in the pattern rather than behind a link.",
      ]},
    ],
    faqs: [
      ['Do these QR codes expire?', 'No. The destination is encoded directly in the pattern, so there is no service in the middle that could shut down or start charging.'],
      ['Can I track how many people scan it?', 'Not with a static code, because scans never touch a server of ours. Tracking requires a redirect service, which is the trade-off this tool deliberately avoids.'],
      ['How big should I print it?', 'Roughly one tenth of the scanning distance. About 2 cm for a business card, about 30 cm for a poster read from three metres.'],
      ['Why will my printed code not scan?', 'Usually too little quiet zone around the pattern, too small a print for the amount of data encoded, or low contrast. Keep a clear margin and use dark on light.'],
    ],
  },

  'password-generator': {
    lead: 'Create strong random passwords in your browser, generated on your own device and never transmitted anywhere. The randomness comes from your browser\'s cryptographic generator rather than from anything predictable, and no password produced here is stored, logged or sent.',
    sections: [
      { h2: 'Length beats complexity', p: [
        'The strength of a password is roughly the number of possible characters raised to the power of its length, which means length is exponential and character variety is merely multiplicative. Adding one character does far more than adding another symbol type.',
        'This is why the old advice — eight characters with an uppercase, a digit and a symbol — produces weak passwords that are also hard to remember. A 16-character random password is beyond brute force by an enormous margin; a 20-character one has margin to spare against hardware that does not exist yet.',
      ]},
      { h2: 'Why human-chosen passwords fail', p: [
        'People reach for the same patterns: a capital at the start, a digit and an exclamation mark at the end, a word with letters swapped for lookalike numbers. Password-cracking tools encode all of those rules, so "P@ssw0rd!" falls in the time it takes to try a dictionary with substitutions applied.',
        'Random generation has no pattern to exploit. Every character is independent, so an attacker gains nothing from knowing how humans think, and the only remaining approach is trying every combination.',
      ]},
      { h2: 'Reuse is the bigger risk', p: [
        'Most account compromises do not involve cracking anything. A site suffers a breach, its password database is published, and attackers try those pairs everywhere else — which works whenever the password was reused, no matter how strong it was.',
        'A unique password per site contains a breach to the one site that leaked. That is impractical to do from memory, which is what password managers exist for: generate a long random password per account, let the manager remember it, and keep one strong passphrase for the manager itself.',
      ]},
      { h2: "Passphrases and second factors", p: [
        "You still need a handful of passwords you can type from memory \u2014 your device login and your password manager's master password. For those, a passphrase of four or five unrelated words is both strong and memorable, in a way a random string is not.",
        "Whatever the password, a second factor matters more than extra length. An authenticator app means a stolen password on its own is not enough to get in, which covers the case a strong password cannot: the site itself being breached.",
      ]},
    ],
    faqs: [
      ['How long should a password be?', 'At least 16 characters when a manager remembers it for you. Length matters exponentially more than character variety.'],
      ['Are these passwords sent anywhere?', 'No. They are generated in your browser using its cryptographic random number generator, and are never transmitted, logged or stored.'],
      ['Is a random password really better than a clever one?', 'Yes. Cracking tools already encode the substitution and capitalisation patterns people use. Random generation leaves no pattern to exploit.'],
      ['Do I need a different password for every site?', 'Yes, and it is the single most valuable habit. A breach at one site becomes a breach everywhere the password was reused.'],
    ],
  },

  'word-counter': {
    lead: 'Count words, characters, sentences and reading time as you type, with the text staying in your browser and going nowhere else. Built for the moments when a limit is a hard requirement rather than a suggestion — a meta description, an application form, an abstract, a post.',
    sections: [
      { h2: 'Limits worth having to hand', p: [
        'Search engines truncate a title around 60 characters and a meta description around 160, measured in pixels rather than characters, so wide letters cost more than narrow ones. Writing to 155 characters leaves a margin for that variation.',
        'Elsewhere the limits are exact: 280 characters on a post, 2,600 on a LinkedIn summary, 4,000 on many application fields. Academic abstracts commonly cap at 250 or 300 words. When a form silently truncates rather than warning you, having the count in front of you before pasting saves discovering the loss afterwards.',
      ]},
      { h2: 'Words, characters, and which one is being counted', p: [
        'A word count splits on whitespace, so hyphenated compounds count as one and numbers count as words. A character count usually includes spaces, but not always — some platforms count them and some do not, and the difference across a long piece is substantial.',
        'When a limit is tight, check which measure the destination uses before editing to fit. Trimming to a word count when the form enforces characters is wasted work, and the reverse leaves you over the limit.',
      ]},
      { h2: 'Reading time and what it is for', p: [
        'Reading time is estimated at about 200 words per minute, a reasonable average for adults reading ordinary prose on screen. It is an approximation, not a measurement: technical material with formulae or code reads far slower, and skimmed listicles far faster.',
        'It is most useful as a relative signal — an article that estimates at 12 minutes is probably worth splitting, and one at 40 seconds probably lacks substance. Treat the number as a rough guide to length rather than a promise to the reader.',
      ]},
      { h2: "Editing down to a limit", p: [
        "Cutting to a limit works best from the end backwards. Closing sentences are usually the most disposable \u2014 summaries of what the reader has just read \u2014 while the opening carries the most weight per word.",
        "Beyond that, the reliable savings are structural rather than lexical: hedges, throat-clearing openers, and any sentence that restates the previous one. Trimming adjectives one at a time rarely closes a meaningful gap and tends to leave the prose flat.",
      ]},
    ],
    faqs: [
      ['How is reading time calculated?', 'At about 200 words per minute, a typical adult screen-reading pace for ordinary prose. Technical material reads considerably slower.'],
      ['Is my text uploaded?', 'No. It stays entirely in your browser and is never sent anywhere.'],
      ['Does the character count include spaces?', 'Yes. Be aware that some platforms count spaces and some do not, so check which measure the destination uses when a limit is tight.'],
      ['How long should a meta description be?', 'Around 155 characters. Search engines truncate near 160 measured in pixels, so a small margin protects against wide letters.'],
    ],
  },

};
