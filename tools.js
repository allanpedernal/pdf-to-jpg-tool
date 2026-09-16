// Tool content generators and implementations

// ---- Reusable content-section builders (match the inline tool styling) ----
// Every tool page shows: tool UI + How It Works + Why…? + Common Use Cases + FAQ.
function sectionWhy(title, cards) {
  return `
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">${title}</h2>
          <div class="row g-4 justify-content-center">${cards.map(c => `
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3"><div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: ${c.color};"><i class="bi ${c.icon} text-white" style="font-size: 2.5rem;"></i></div></div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">${c.title}</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">${c.text}</p>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>`;
}
function sectionUseCases(cards) {
  return `
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;"><i class="bi bi-list-ul me-2"></i>Common Use Cases</h2>
          <div class="row g-4">${cards.map(c => `
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi ${c.icon} text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">${c.title}</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">${c.text}</p>
                </div>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>`;
}
function sectionFAQ(faqs) {
  // Intentionally renders nothing.
  //
  // The FAQ is now part of the STATIC page (see scripts/build-tool-pages.js
  // and #home-seo-content in index.html) so that crawlers and AdSense reviewers
  // actually receive it — JS-rendered copy is invisible to them, which is what
  // left every tool page serving 79 crawlable words.
  //
  // Rendering it here as well put two FAQ sections on every page for humans.
  // Do not reinstate this without removing the static one first.
  return '';
}

function getPDFToPNGContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span class="emoji-document" style="font-size: 5rem;">🖼️</span>
        </div>
        <div class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PDF → PNG Converter
        </div>
        <p class="text-light fs-5 mb-2 fw-medium">Convert PDF to PNG instantly in your browser</p>
        <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <!-- Dropzone Section -->
      <label class="dropzone w-100 border border-2 border-dashed border-secondary rounded-3 p-5 d-flex flex-column align-items-center justify-content-center cursor-pointer mb-5 bg-dark-subtle shadow-lg" 
             id="dropzone-pdf-png" 
             style="min-height: 220px;">
        <div class="mb-4 position-relative">
          <i class="bi bi-cloud-arrow-up-fill text-primary" style="font-size: 4rem;"></i>
        </div>
        <span id="dropLabel-pdf-png" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
        <span class="text-secondary small">or click to browse files</span>
        <input type="file" id="file-pdf-png" class="d-none" accept="application/pdf" />
      </label>

      <!-- Controls Section -->
      <div class="d-flex flex-wrap gap-3 w-100 mb-5 justify-content-center align-items-end">
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-zoom-in"></i> Scale
          </label>
          <input type="number" id="scale-pdf-png" min="0.5" max="3" step="0.1" value="1.6" class="form-control w-auto" style="width: 100px;">
          <span class="form-text text-secondary mt-1 d-block" style="font-size: 0.75rem;">1.0 = original size</span>
        </div>
        <div class="d-flex flex-column gap-2">
          <button id="start-pdf-png" class="btn btn-primary btn-lg fw-bold rounded-3 shadow-lg bg-gradient-primary d-flex align-items-center gap-2">
            <i class="bi bi-lightning-fill"></i> Convert PDF to PNG
          </button>
          <button id="cancel-pdf-png" class="btn btn-outline-secondary rounded-3 text-light" disabled>
            Cancel
          </button>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="card bg-dark-subtle border-0 shadow-sm p-4 mb-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="text-light fw-medium d-flex align-items-center gap-2">
            <i class="bi bi-bar-chart"></i> Progress
          </span>
          <span id="stats-pdf-png" class="small text-secondary">No file selected</span>
        </div>
        <div class="progress mb-3" style="height: 10px; border-radius: 5px; background-color: rgba(255, 255, 255, 0.1);">
          <div id="bar-pdf-png" class="progress-bar bg-gradient-primary" role="progressbar" style="width: 0%; opacity: 1;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p id="log-pdf-png" class="small text-light text-center mb-0" style="min-height: 24px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your PDF files</p>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDF</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your PDF file or click to browse and select from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Adjust Scale</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Set scale (0.5-3.0) to control image resolution. Higher scale produces larger, sharper PNG images.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Convert</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Convert PDF to PNG" and watch as each page is processed instantly in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">All PNG images are automatically packaged in a ZIP file for easy download.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Convert PDF to PNG Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Convert PDF to PNG?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All conversion happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDF to PNG in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-image text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lossless Quality</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">PNG format provides lossless compression, perfect for graphics, diagrams, and images that require perfect quality preservation.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #a855f7;">
                    <i class="bi bi-grid-3x3-gap-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Multi-Page Support</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert entire PDF documents with multiple pages. Each page becomes a separate PNG image, all packaged in one ZIP file.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #3b82f6; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Convert unlimited PDFs to PNG completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${sectionUseCases([
        { icon: 'bi-file-earmark-image', title: 'Screenshots & Docs', text: 'Drop a contract or invoice page into chat, email or slides as a clean image.' },
        { icon: 'bi-easel', title: 'Presentations', text: 'Pull diagrams and charts from a PDF to reuse in slides.' },
        { icon: 'bi-pencil-square', title: 'Editing', text: 'Edit PDF pages in Photoshop, GIMP or any image editor.' },
        { icon: 'bi-globe', title: 'Web Previews', text: 'Show crisp document previews or thumbnails on a website.' },
        { icon: 'bi-layers', title: 'Transparency', text: 'Keep sharp edges and transparency that JPG cannot.' },
        { icon: 'bi-printer', title: 'Printing', text: 'Export high-DPI PNGs for sharp printing.' }
      ])}
      ${sectionFAQ([
        { q: 'When should I use PNG instead of JPG?', a: 'Use PNG for text, screenshots, diagrams and line art where sharp edges matter, or when you need transparency. Use JPG for photos where a smaller file matters more.' },
        { q: 'Does converting to PNG reduce quality?', a: 'No — PNG is lossless, so there are no compression artifacts. The image is as sharp as the resolution you choose.' },
        { q: 'Are my files uploaded to a server?', a: 'No. Conversion runs entirely in your browser, so your PDF never leaves your device.' },
        { q: 'Can I convert a multi-page PDF at once?', a: 'Yes. Every page is rendered to its own PNG, and you can download them individually or all together.' },
        { q: 'What resolution (DPI) should I choose?', a: 'For on-screen use a standard scale keeps files small; for printing or zooming in, pick a higher scale for sharper results.' },
        { q: 'Is it free and does it work on mobile?', a: 'Yes — completely free with no sign-up, and it works in any modern browser on phones, tablets and computers.' }
      ])}
    </div>
  `;
}

function getPDFToJPGContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span class="emoji-document" style="font-size: 5rem;">📄</span>
        </div>
        <div class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PDF → JPG Converter
        </div>
        <p class="text-light fs-5 mb-2 fw-medium">Convert PDF to JPG instantly in your browser</p>
        <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <!-- Dropzone Section -->
      <label class="dropzone w-100 border border-2 border-dashed border-secondary rounded-3 p-5 d-flex flex-column align-items-center justify-content-center cursor-pointer mb-5 bg-dark-subtle shadow-lg" 
             id="dropzone-pdf-jpg" 
             style="min-height: 220px;">
        <div class="mb-4 position-relative">
          <i class="bi bi-cloud-arrow-up-fill text-primary" style="font-size: 4rem;"></i>
        </div>
        <span id="dropLabel-pdf-jpg" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
        <span class="text-secondary small">or click to browse files</span>
        <input type="file" id="file-pdf-jpg" class="d-none" accept="application/pdf" />
      </label>

      <!-- Controls Section -->
      <div class="d-flex flex-wrap gap-3 w-100 mb-5 justify-content-center align-items-end">
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-image"></i> JPEG Quality
          </label>
          <input type="number" id="quality-pdf-jpg" min="0.1" max="1" step="0.1" value="0.85" class="form-control w-auto" style="width: 100px;">
          <span class="form-text text-secondary mt-1 d-block" style="font-size: 0.75rem;">0.1 (low) - 1.0 (high)</span>
        </div>
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-zoom-in"></i> Scale
          </label>
          <input type="number" id="scale-pdf-jpg" min="0.5" max="3" step="0.1" value="1.6" class="form-control w-auto" style="width: 100px;">
          <span class="form-text text-secondary mt-1 d-block" style="font-size: 0.75rem;">1.0 = original size</span>
        </div>
        <div class="d-flex flex-column gap-2">
          <button id="start-pdf-jpg" class="btn btn-primary btn-lg fw-bold rounded-3 shadow-lg bg-gradient-primary d-flex align-items-center gap-2">
            <i class="bi bi-lightning-fill"></i> Convert PDF to JPG
          </button>
          <button id="cancel-pdf-jpg" class="btn btn-outline-secondary rounded-3 text-light" disabled>
            Cancel
          </button>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="card bg-dark-subtle border-0 shadow-sm p-4 mb-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="text-light fw-medium d-flex align-items-center gap-2">
            <i class="bi bi-bar-chart"></i> Progress
          </span>
          <span id="stats-pdf-jpg" class="small text-secondary">No file selected</span>
        </div>
        <div class="progress mb-3" style="height: 10px; border-radius: 5px; background-color: rgba(255, 255, 255, 0.1);">
          <div id="bar-pdf-jpg" class="progress-bar bg-gradient-primary" role="progressbar" style="width: 0%; opacity: 1;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p id="log-pdf-jpg" class="small text-light text-center mb-0" style="min-height: 24px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your PDF files</p>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDF</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your PDF file or click to browse and select from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Adjust Settings</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Set JPEG quality (0.1-1.0) and scale (0.5-3.0) to control image size and quality.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Convert</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Convert PDF to JPG" and watch as each page is processed instantly in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">All JPG images are automatically packaged in a ZIP file for easy download.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Convert PDF to JPG Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Convert PDF to JPG?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All conversion happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDF to JPG in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.75rem; line-height: 1;">
                    100<small class="d-block" style="font-size: 0.4em; line-height: 0.5;">↑</small>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">High Quality</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Adjustable quality and scale settings ensure your JPG images maintain excellent clarity and detail from your original PDF.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #a855f7;">
                    <i class="bi bi-grid-3x3-gap-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Multi-Page Support</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert entire PDF documents with multiple pages. Each page becomes a separate JPG image, all packaged in one ZIP file.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #3b82f6; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Convert unlimited PDFs to JPG completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-image text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Social Media Posts</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDF pages to images for Instagram, Facebook, or Twitter posts.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-image text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Website Content</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Use PDF pages as images in blog posts, articles, or web pages.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Presentations</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Extract pages from PDF presentations to use as slides or images.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-gear text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Photo Editing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Edit PDF pages in Photoshop, GIMP, or other image editing software.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-folder text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Document Archiving</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert important documents to images for long-term storage.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Attachments</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Send PDF pages as images via email without worrying about compatibility.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getJPGToPDFContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span class="emoji-document-pages" style="font-size: 4rem;">📑</span>
          </div>
          <div class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            JPG to PDF Converter
          </div>
          <p class="text-light fs-5 mb-2 fw-medium">Convert images to PDF document instantly</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-jpg-pdf" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-jpg-pdf" class="text-light fw-semibold fs-5 mb-2">Drag & drop your images here</span>
            <span class="text-secondary small">or click to browse files (JPG, JPEG, PNG) - Select multiple files to combine into one PDF</span>
            <input type="file" id="file-jpg-pdf" class="d-none" accept="image/jpeg,image/jpg,image/png" multiple />
          </label>
        </div>
      </div>

      <!-- Image Preview -->
      <div id="image-preview-jpg-pdf" class="row g-3 mb-4 d-none"></div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="row g-3 align-items-end justify-content-center">
            <div class="col-auto">
              <label class="form-label text-light small mb-2 fw-medium">Page Size</label>
              <select id="pageSize-jpg-pdf" class="form-control form-control-sm">
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
                <option value="fit">Fit to Image</option>
              </select>
            </div>
            <div class="col-auto">
              <label class="form-label text-light small mb-2 fw-medium">Orientation</label>
              <select id="orientation-jpg-pdf" class="form-control form-control-sm">
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div class="col-auto">
              <button id="convert-jpg-pdf" class="btn btn-primary fw-bold px-4 py-2">
                Convert to PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="text-light fw-medium">Status</span>
            <span id="status-jpg-pdf" class="small text-secondary">No images selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-jpg-pdf" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-jpg-pdf" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your images</p>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select Images</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your images or click to browse and select multiple JPG, JPEG, or PNG files from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Choose Settings</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Select page size (A4, Letter, Legal, or Fit to Image) and orientation (Portrait or Landscape).</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Convert</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Convert to PDF" and watch as your images are combined into a single PDF document instantly in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF file will be automatically downloaded, ready to use, share, or print.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Convert JPG to PDF Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Convert JPG to PDF?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your images never leave your computer. All conversion happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert images to PDF in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-file-earmark-pdf text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Universal Format</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">PDF is the standard format for documents. Convert your images to PDF for easy sharing, printing, and archiving.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #a855f7;">
                    <i class="bi bi-images text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Multiple Images</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Combine multiple images into a single PDF document. Each image becomes a page in your PDF file.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Convert unlimited images to PDF completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-pdf text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Document Submission</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert photos of documents to PDF for official submissions, applications, or forms.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-images text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Photo Albums</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Combine multiple photos into a single PDF album for easy sharing and archiving.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-printer text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Printing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert images to PDF for consistent printing across different devices and printers.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Attachments</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Send multiple images as a single PDF attachment via email without worrying about file size limits.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-folder text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Archiving</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert important photos to PDF for long-term storage and organization.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-briefcase text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Business Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert receipts, invoices, or business cards to PDF for professional documentation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getPDFCompressContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span class="emoji-compressor" style="font-size: 4rem;">🗜️</span>
          </div>
          <div class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Compressor
          </div>
          <p class="text-light fs-5 mb-2 fw-medium">Reduce PDF file size without losing quality</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-compress" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-compress" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-compress" class="d-none" accept="application/pdf" />
          </label>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="row g-3 align-items-end justify-content-center">
            <div class="col-auto">
              <label class="form-label text-light small mb-2 fw-medium">Compression Level</label>
              <select id="quality-compress" class="form-control form-control-sm">
                <option value="0.3">High Compression (Smaller Size)</option>
                <option value="0.5" selected>Medium Compression (Balanced)</option>
                <option value="0.7">Low Compression (Better Quality)</option>
              </select>
            </div>
            <div class="col-auto">
              <button id="compress-btn" class="btn btn-primary fw-bold px-4 py-2">
                Compress PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="text-light fw-medium">File Size</span>
            <span id="fileSize-compress" class="small text-secondary">No file selected</span>
          </div>
          <div id="comparison-compress" class="d-none mb-3 p-3 rounded" style="background-color: rgba(30, 41, 59, 0.5);">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary">Original:</span>
              <span class="text-light fw-medium" id="originalSize-compress"></span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-success">Compressed:</span>
              <span class="text-success fw-medium" id="compressedSize-compress"></span>
            </div>
            <div class="mt-2 text-center">
              <span class="text-primary fw-bold" id="savings-compress"></span>
            </div>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-compress" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-compress" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to compress your PDF</p>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDF</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your PDF file or click to browse and select a PDF file from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Choose Compression</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Select compression level: High for maximum size reduction, Medium for balanced quality, or Low for better quality.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Compress</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Compress PDF" and watch as your PDF is processed page by page, reducing file size while maintaining quality.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your compressed PDF will be automatically downloaded. See the size comparison and savings percentage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Compress PDF Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Compress PDF?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All compression happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Compress PDFs in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-file-earmark-arrow-down text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Reduce File Size</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Significantly reduce PDF file size while maintaining good quality. Perfect for email attachments and storage optimization.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-envelope-check text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Email Friendly</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Compress large PDFs to meet email size limits. Make your documents easier to share and faster to download.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Compress unlimited PDFs completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Attachments</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Reduce PDF size to meet email attachment limits and ensure faster delivery.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-cloud-upload text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Cloud Storage</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Save storage space in cloud services like Google Drive, Dropbox, or OneDrive.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-arrow-down text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Faster Downloads</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Make PDFs download faster for your website visitors or clients.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-folder text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Archive Storage</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Reduce file sizes for long-term archiving while maintaining readability.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-phone text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Mobile Sharing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Compress PDFs for easier sharing via messaging apps and social media.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-briefcase text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Business Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Optimize invoices, reports, and presentations for efficient distribution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getPDFSplitContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span class="emoji-scissors" style="font-size: 4rem;">✂️</span>
          </div>
          <div class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Splitter
          </div>
          <p class="text-light fs-5 mb-2 fw-medium">Split PDF into separate pages or extract specific pages</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-split" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-split" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-split" class="d-none" accept="application/pdf" />
          </label>
        </div>
      </div>

      <!-- Pages Selection Card -->
      <div id="pages-info-split" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <h3 class="fs-5 fw-semibold text-light mb-3">Select Pages to Extract</h3>
          <div id="pages-list-split" class="row g-2 mb-3"></div>
          <div class="d-flex gap-2 flex-wrap justify-content-center">
            <button id="select-all-split" class="btn btn-outline-secondary btn-sm">Select All</button>
            <button id="select-none-split" class="btn btn-outline-secondary btn-sm">Select None</button>
          </div>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button id="split-all-split" class="btn btn-primary fw-bold px-4 py-2">
              Split All Pages
            </button>
            <button id="extract-selected-split" class="btn btn-success fw-bold px-4 py-2 d-none">
              Extract Selected Pages
            </button>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="text-light fw-medium">Status</span>
            <span id="status-split" class="small text-secondary">No file selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-split" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-split" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to split your PDF</p>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDF</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your PDF file or click to browse and select a PDF file from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Choose Pages</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Select specific pages to extract, or choose to split all pages. Each page will become a separate PDF file.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Split</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Split All Pages" or "Extract Selected Pages" and watch as your PDF is processed page by page.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">All PDF pages will be automatically packaged in a ZIP file for easy download. Each page is a separate PDF.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Split PDF Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Split PDF?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All splitting happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Split PDFs in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-file-earmark-break text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Extract Pages</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Selectively extract specific pages from large PDF documents. Perfect for creating smaller, focused documents.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-files text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Organize Documents</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Split large PDFs into smaller, manageable files. Organize your documents by page or section.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Split unlimited PDFs completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-break text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Extract Pages</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Extract specific pages from large PDF documents to create smaller, focused files.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-folder text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Organize Files</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Split multi-page PDFs into individual page files for better organization and management.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Sharing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Split large PDFs into smaller files that are easier to email and share.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-pdf text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Create Templates</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Extract cover pages, forms, or templates from existing PDF documents.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-archive text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Archive Management</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Split archived documents into individual pages for easier retrieval and storage.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-briefcase text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Business Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Extract specific pages from invoices, contracts, or reports for separate distribution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getPDFMergeContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span class="emoji-link" style="font-size: 4rem;">🔗</span>
          </div>
          <div class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Merger
          </div>
          <p class="text-light fs-5 mb-2 fw-medium">Merge multiple PDFs into one document</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-merge" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-merge" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDFs here</span>
            <span class="text-secondary small">or click to browse files (multiple files)</span>
            <input type="file" id="file-merge" class="d-none" accept="application/pdf" multiple />
          </label>
        </div>
      </div>

      <!-- PDF List Card -->
      <div id="pdf-list-merge" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <div id="pdf-list-content-merge"></div>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button id="merge-btn" class="btn btn-primary fw-bold px-4 py-2">
              Merge PDFs
            </button>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="text-light fw-medium">Status</span>
            <span id="status-merge" class="small text-secondary">No files selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-merge" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-merge" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to merge your PDFs</p>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDFs</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop multiple PDF files or click to browse and select multiple PDF files from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Review Files</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Review the list of selected PDFs. You can remove files if needed. Files will be merged in the order shown.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Merge</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Merge PDFs" and watch as all PDFs are combined into a single document, page by page.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your merged PDF will be automatically downloaded, containing all pages from all selected PDFs in order.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Merge PDF Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Merge PDF?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All merging happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Merge PDFs in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-file-earmark-plus text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Combine Documents</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Combine multiple PDF files into one unified document. Perfect for reports, presentations, or document organization.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-files text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Organize Files</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Merge scattered PDF documents into organized, single-file documents. Keep related documents together.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Merge unlimited PDFs completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-plus text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Combine Reports</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Merge multiple monthly or quarterly reports into a single comprehensive document.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-pdf text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Create Presentations</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Combine multiple PDF slides or documents into one presentation file.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-briefcase text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Business Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Merge invoices, contracts, or proposals into organized single documents.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-folder text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Archive Organization</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Combine related archived documents into single files for easier management.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Attachments</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Merge multiple PDFs into one file for easier email sharing and distribution.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-journal-text text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Academic Papers</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Combine research papers, articles, or chapters into comprehensive documents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getPDFRotateContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span class="emoji-rotate" style="font-size: 4rem;">🔄</span>
          </div>
          <div class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Rotate
          </div>
          <p class="text-light fs-5 mb-2 fw-medium">Rotate PDF pages to any angle</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-rotate" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-rotate" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-rotate" class="d-none" accept="application/pdf" />
          </label>
        </div>
      </div>

      <!-- Pages Selection Card -->
      <div id="pages-info-rotate" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <h3 class="fs-5 fw-semibold text-light mb-3">Select Pages and Rotation</h3>
          <div id="pages-list-rotate" class="row g-2 mb-3"></div>
          <div class="d-flex gap-3 align-items-center">
            <label class="text-light small mb-0">Rotation:</label>
            <select id="rotation-angle" class="form-select form-select-sm w-auto">
              <option value="90">90° Clockwise</option>
              <option value="180">180°</option>
              <option value="270">90° Counter-clockwise</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button id="rotate-btn" class="btn btn-primary fw-bold px-4 py-2">
              Rotate PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="text-light fw-medium">Status</span>
            <span id="status-rotate" class="small text-secondary">No file selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-rotate" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-rotate" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to rotate your PDF</p>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDF</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your PDF file or click to browse and select a PDF file from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Choose Pages</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Select which pages to rotate by clicking on page numbers. All pages are selected by default.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Set Rotation</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Choose rotation angle: 90° clockwise, 180°, or 90° counter-clockwise. Then click "Rotate PDF".</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your rotated PDF will be automatically downloaded with the selected pages rotated to your chosen angle.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Rotate PDF Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Rotate PDF?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All rotation happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Rotate PDFs in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-arrow-clockwise text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Fix Orientation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Correct pages that were scanned or saved in the wrong orientation. Rotate individual pages or all pages.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-file-earmark-pdf text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Selective Rotation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Choose which pages to rotate. Rotate only the pages that need correction, leaving others unchanged.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Rotate unlimited PDFs completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-image text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Scanned Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Fix pages that were scanned upside down or sideways. Correct orientation for better readability.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-pdf text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Landscape Pages</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Rotate landscape pages to portrait or vice versa for consistent document formatting.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-printer text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Print Preparation</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Rotate pages to the correct orientation before printing to avoid wasted paper.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-briefcase text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Business Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Fix orientation issues in invoices, contracts, or forms for professional presentation.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-journal-text text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Academic Papers</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Correct page orientation in research papers, articles, or thesis documents.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-folder text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Archive Organization</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Standardize page orientation in archived documents for consistent viewing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getPNGToJPGContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span class="emoji-palette" style="font-size: 5rem;">🎨</span>
        </div>
        <div class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PNG → JPG Converter
        </div>
        <p class="text-light fs-5 mb-2 fw-medium">Convert PNG to JPG instantly in your browser</p>
        <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <!-- Dropzone Section -->
      <label class="dropzone w-100 border border-2 border-dashed border-secondary rounded-3 p-5 d-flex flex-column align-items-center justify-content-center cursor-pointer mb-5 bg-dark-subtle shadow-lg" 
             id="dropzone-png-jpg" 
             style="min-height: 220px;">
        <div class="mb-4 position-relative">
          <i class="bi bi-cloud-arrow-up-fill text-primary" style="font-size: 4rem;"></i>
        </div>
        <span id="dropLabel-png-jpg" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PNG images here</span>
        <span class="text-secondary small">or click to browse files</span>
        <input type="file" id="file-png-jpg" class="d-none" accept="image/png" multiple />
      </label>

      <!-- Controls Section -->
      <div class="d-flex flex-wrap gap-3 w-100 mb-5 justify-content-center align-items-end">
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-image"></i> JPEG Quality
          </label>
          <input type="number" id="quality-png-jpg" min="0.1" max="1" step="0.1" value="0.9" class="form-control w-auto" style="width: 100px;">
          <span class="form-text text-secondary mt-1 d-block" style="font-size: 0.75rem;">0.1 (low) - 1.0 (high)</span>
        </div>
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-palette"></i> Background Color
          </label>
          <input type="color" id="bgColor-png-jpg" value="#ffffff" class="form-control form-control-color w-auto" style="width: 100px; height: 40px;">
          <span class="form-text text-secondary mt-1 d-block" style="font-size: 0.75rem;">For transparent PNGs</span>
        </div>
        <div class="d-flex flex-column gap-2">
          <button id="convert-png-jpg" class="btn btn-primary btn-lg fw-bold rounded-3 shadow-lg bg-gradient-primary d-flex align-items-center gap-2">
            <i class="bi bi-lightning-fill"></i> Convert PNG to JPG
          </button>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="card bg-dark-subtle border-0 shadow-sm p-4 mb-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="text-light fw-medium d-flex align-items-center gap-2">
            <i class="bi bi-bar-chart"></i> Progress
          </span>
          <span id="stats-png-jpg" class="small text-secondary">No images selected</span>
        </div>
        <div class="progress mb-3" style="height: 10px; border-radius: 5px; background-color: rgba(255, 255, 255, 0.1);">
          <div id="bar-png-jpg" class="progress-bar bg-gradient-primary" role="progressbar" style="width: 0%; opacity: 1;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p id="log-png-jpg" class="small text-light text-center mb-0" style="min-height: 24px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your PNG images</p>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PNG Images</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your PNG images or click to browse and select multiple PNG files from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Adjust Settings</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Set JPEG quality (0.1-1.0) and background color for transparent PNGs. Higher quality produces larger files.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Convert</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Convert to JPG" and watch as your PNG images are converted to JPG format instantly in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">All JPG images will be automatically downloaded. Each PNG becomes a separate JPG file.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Convert PNG to JPG Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Convert PNG to JPG?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your images never leave your computer. All conversion happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PNG to JPG in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-file-earmark-arrow-down text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Smaller File Size</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">JPG files are typically smaller than PNG files, making them ideal for web use, email attachments, and storage.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Universal Format</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">JPG is the most widely supported image format. Convert PNG to JPG for better compatibility across platforms.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Convert unlimited PNGs to JPG completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-globe text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Web Optimization</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PNG to JPG for smaller file sizes and faster website loading times.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Attachments</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Reduce file sizes for easier email sharing. JPG files are smaller and faster to send.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-camera text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Photo Sharing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PNG screenshots or images to JPG for social media and photo sharing platforms.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-folder text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Storage Optimization</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Save storage space by converting PNG files to smaller JPG format while maintaining good quality.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-image text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Compatibility</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Ensure images work on all devices and platforms. JPG has universal support.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-printer text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Printing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PNG to JPG for better printer compatibility and faster print processing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getImageResizeContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span class="emoji-ruler" style="font-size: 5rem;">📏</span>
        </div>
        <div class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          Image Resizer
        </div>
        <p class="text-light fs-5 mb-2 fw-medium">Resize images to any size instantly in your browser</p>
        <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <!-- Dropzone Section -->
      <label class="dropzone w-100 border border-2 border-dashed border-secondary rounded-3 p-5 d-flex flex-column align-items-center justify-content-center cursor-pointer mb-5 bg-dark-subtle shadow-lg" 
             id="dropzone-resize" 
             style="min-height: 220px;">
        <div class="mb-4 position-relative">
          <i class="bi bi-cloud-arrow-up-fill text-primary" style="font-size: 4rem;"></i>
        </div>
        <span id="dropLabel-resize" class="text-light fw-semibold fs-5 mb-2">Drag & drop your images here</span>
        <span class="text-secondary small">or click to browse files</span>
        <input type="file" id="file-resize" class="d-none" accept="image/*" multiple />
      </label>

      <!-- Controls Section -->
      <div class="d-flex flex-wrap gap-3 w-100 mb-5 justify-content-center align-items-end">
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-arrows-angle-expand"></i> Width (px)
          </label>
          <input type="number" id="width-resize" placeholder="Auto" min="1" class="form-control w-auto" style="width: 120px;">
          <span class="form-text text-secondary mt-1 d-block" style="font-size: 0.75rem;">Leave empty for auto</span>
        </div>
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-arrows-angle-expand"></i> Height (px)
          </label>
          <input type="number" id="height-resize" placeholder="Auto" min="1" class="form-control w-auto" style="width: 120px;">
          <span class="form-text text-secondary mt-1 d-block" style="font-size: 0.75rem;">Leave empty for auto</span>
        </div>
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-lock"></i> Maintain Aspect Ratio
          </label>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="aspect-resize" checked>
            <label class="form-check-label text-secondary small" for="aspect-resize" style="font-size: 0.75rem;">Keep proportions</label>
          </div>
        </div>
        <div class="d-flex flex-column gap-2">
          <button id="resize-btn" class="btn btn-primary btn-lg fw-bold rounded-3 shadow-lg bg-gradient-primary d-flex align-items-center gap-2">
            <i class="bi bi-lightning-fill"></i> Resize Images
          </button>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="card bg-dark-subtle border-0 shadow-sm p-4 mb-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="text-light fw-medium d-flex align-items-center gap-2">
            <i class="bi bi-bar-chart"></i> Progress
          </span>
          <span id="stats-resize" class="small text-secondary">No images selected</span>
        </div>
        <div class="progress mb-3" style="height: 10px; border-radius: 5px; background-color: rgba(255, 255, 255, 0.1);">
          <div id="bar-resize" class="progress-bar bg-gradient-primary" role="progressbar" style="width: 0%; opacity: 1;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p id="log-resize" class="small text-light text-center mb-0" style="min-height: 24px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to resize your images</p>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select Images</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your images or click to browse and select multiple image files from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Set Dimensions</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Enter desired width and height in pixels. Leave blank for auto-sizing. Enable aspect ratio to maintain proportions.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Resize</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Resize Images" and watch as your images are resized to your specified dimensions instantly in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">All resized images will be automatically downloaded. Each image is saved as a separate file.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Resize Images Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Resize Images?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your images never leave your computer. All resizing happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Resize images in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-file-earmark-arrow-down text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Reduce File Size</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Smaller dimensions mean smaller file sizes. Perfect for web use, email attachments, and storage optimization.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Web Optimization</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Resize images to optimal dimensions for websites, social media, or online platforms. Faster loading times.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Resize unlimited images completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-globe text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Website Images</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Resize images to fit your website layout and improve page loading speed.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-share text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Social Media</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Resize images to meet social media platform requirements (profile pictures, posts, covers).</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Attachments</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Reduce image size for easier email sharing and faster delivery.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-printer text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Print Preparation</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Resize images to specific print dimensions for professional printing.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-phone text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Mobile Optimization</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Resize images for mobile apps or responsive web design.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-folder text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Storage Management</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Reduce image file sizes to save storage space on your device or cloud.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getImageCompressContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span class="emoji-save" style="font-size: 5rem;">💾</span>
        </div>
        <div class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          Image Compressor
        </div>
        <p class="text-light fs-5 mb-2 fw-medium">Compress images to reduce file size instantly in your browser</p>
        <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <!-- Dropzone Section -->
      <label class="dropzone w-100 border border-2 border-dashed border-secondary rounded-3 p-5 d-flex flex-column align-items-center justify-content-center cursor-pointer mb-5 bg-dark-subtle shadow-lg" 
             id="dropzone-compress-img" 
             style="min-height: 220px;">
        <div class="mb-4 position-relative">
          <i class="bi bi-cloud-arrow-up-fill text-primary" style="font-size: 4rem;"></i>
        </div>
        <span id="dropLabel-compress-img" class="text-light fw-semibold fs-5 mb-2">Drag & drop your images here</span>
        <span class="text-secondary small">or click to browse files</span>
        <input type="file" id="file-compress-img" class="d-none" accept="image/*" multiple />
      </label>

      <!-- Controls Section -->
      <div class="d-flex flex-wrap gap-3 w-100 mb-5 justify-content-center align-items-end">
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-sliders"></i> Quality
          </label>
          <input type="range" id="quality-compress-img" min="0.1" max="1" step="0.05" value="0.8" class="form-range" style="width: 200px;">
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span class="form-text text-secondary" style="font-size: 0.75rem;">Lower = Smaller</span>
            <span id="quality-value-compress-img" class="badge bg-primary text-white px-3 py-1">0.8</span>
            <span class="form-text text-secondary" style="font-size: 0.75rem;">Higher = Better</span>
          </div>
        </div>
        <div class="d-flex flex-column gap-2">
          <button id="compress-img-btn" class="btn btn-primary btn-lg fw-bold rounded-3 shadow-lg bg-gradient-primary d-flex align-items-center gap-2">
            <i class="bi bi-lightning-fill"></i> Compress Images
          </button>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="card bg-dark-subtle border-0 shadow-sm p-4 mb-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="text-light fw-medium d-flex align-items-center gap-2">
            <i class="bi bi-bar-chart"></i> Progress
          </span>
          <span id="stats-compress-img" class="small text-secondary">No images selected</span>
        </div>
        <div class="progress mb-3" style="height: 10px; border-radius: 5px; background-color: rgba(255, 255, 255, 0.1);">
          <div id="bar-compress-img" class="progress-bar bg-gradient-primary" role="progressbar" style="width: 0%; opacity: 1;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p id="log-compress-img" class="small text-light text-center mb-0" style="min-height: 24px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to compress your images</p>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select Images</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your images or click to browse and select multiple image files from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Choose Quality</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Adjust the quality slider (0.1-1.0). Lower values create smaller files but may reduce quality. Higher values maintain better quality.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Compress</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Compress Images" and watch as your images are optimized to reduce file size while maintaining good quality.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">All compressed images will be automatically downloaded. Each image is saved as a separate file with reduced size.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Compress Images Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Compress Images?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your images never leave your computer. All compression happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Compress images in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-file-earmark-arrow-down text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Reduce File Size</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Significantly reduce image file sizes while maintaining good visual quality. Perfect for web and email use.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Faster Loading</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Compressed images load faster on websites, improving user experience and SEO rankings.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Compress unlimited images completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-globe text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Website Optimization</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Compress images to improve website loading speed and reduce bandwidth usage.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Attachments</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Reduce image sizes to meet email attachment limits and ensure faster delivery.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-share text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Social Media</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Compress images for social media posts to ensure faster uploads and better performance.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-cloud-upload text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Cloud Storage</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Save storage space in cloud services by compressing images before uploading.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-phone text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Mobile Sharing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Compress images for easier sharing via messaging apps and social media on mobile devices.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-folder text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Archive Storage</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Reduce file sizes for long-term archiving while maintaining acceptable image quality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

// PDF Unlock Content - REMOVED (not reliable in browser)
function getPDFUnlockContent() {
  return '<div class="text-center py-12"><p class="text-slate-400">This feature has been removed due to browser limitations with PDF encryption.</p></div>';
}

function getPDFProtectContent() {
  return '<div class="text-center py-12"><p class="text-slate-400">This feature has been removed due to browser limitations with PDF encryption.</p></div>';
}

function getPDFOCRContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span class="emoji-unlock" style="font-size: 4rem;">🔓</span>
          </div>
          <div class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Unlock
          </div>
          <p class="text-light fs-5 mb-2 fw-medium">Remove password protection from PDF files</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-unlock" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-unlock" class="text-light fw-semibold fs-5 mb-2">Drag & drop your password-protected PDF here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-unlock" class="d-none" accept="application/pdf" />
          </label>
        </div>
      </div>

      <!-- Password Section Card -->
      <div id="password-section-unlock" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <h3 class="fs-5 fw-semibold text-light mb-3">Enter PDF Password</h3>
          <div class="d-flex flex-wrap gap-3 align-items-end">
            <div class="flex-grow-1" style="min-width: 200px;">
              <label class="form-label text-light small fw-medium mb-2">Password</label>
              <input type="password" id="password-unlock" placeholder="Enter PDF password" class="form-control bg-dark text-light border-secondary">
              <p class="form-text text-secondary mt-2 mb-0">⚠️ We cannot unlock PDFs without the password. This tool removes protection from PDFs you already have access to.</p>
            </div>
            <div class="d-flex flex-column gap-2">
              <button id="unlock-btn" class="btn btn-primary fw-bold px-4 py-2">
                Unlock PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="text-light fw-medium">Status</span>
            <span id="status-unlock" class="small text-secondary">No file selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-unlock" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-unlock" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to unlock your PDF</p>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDF</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your password-protected PDF file or click to browse and select from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Enter Password</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Enter the password for your PDF file. We need the password to unlock it.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Unlock</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Unlock PDF" and the password protection will be removed from your PDF file.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your unlocked PDF will be automatically downloaded. The file is now free from password protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Unlock PDF Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Unlock PDF?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All unlocking happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Unlock PDFs in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-unlock text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Easy Editing</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Remove password protection to enable editing, copying, printing, and other operations on your PDF files.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-file-earmark-pdf text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Better Compatibility</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Unlocked PDFs work better with various PDF tools and software that may not support password-protected files.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Unlock unlimited PDFs completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-pencil text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Enable Editing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Remove password protection to edit text, add annotations, or modify PDF content.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-printer text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Enable Printing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Unlock PDFs that have printing restrictions to enable printing functionality.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-files text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Copy Text</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Remove copy restrictions to enable text selection and copying from PDF documents.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-tools text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">PDF Processing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Unlock PDFs for use with other PDF tools that require unprotected files.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-share text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Easy Sharing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Share PDFs without requiring recipients to know the password.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-archive text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Archive Access</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Unlock archived PDFs for easier access and management in your document library.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getPDFProtectContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span class="emoji-lock" style="font-size: 4rem;">🔒</span>
          </div>
          <div class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Protect
          </div>
          <p class="text-light fs-5 mb-2 fw-medium">Add password protection to PDF files</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-protect" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-protect" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-protect" class="d-none" accept="application/pdf" />
          </label>
        </div>
      </div>

      <!-- Password Section Card -->
      <div id="password-section-protect" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <h3 class="fs-5 fw-semibold text-light mb-3">Set PDF Password</h3>
          <div class="d-flex flex-column gap-3">
            <div>
              <label class="form-label text-light small fw-medium mb-2">Password</label>
              <input type="password" id="password-protect" placeholder="Enter password" class="form-control bg-dark text-light border-secondary">
            </div>
            <div>
              <label class="form-label text-light small fw-medium mb-2">Confirm Password</label>
              <input type="password" id="password-confirm-protect" placeholder="Confirm password" class="form-control bg-dark text-light border-secondary">
            </div>
            <div class="d-flex flex-column gap-2">
              <button id="protect-btn" class="btn btn-primary fw-bold px-4 py-2">
                Protect PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="text-light fw-medium">Status</span>
            <span id="status-protect" class="small text-secondary">No file selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-protect" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-protect" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to protect your PDF</p>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDF</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your PDF file or click to browse and select a PDF file from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Set Password</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Enter a password and confirm it. Choose a strong password to secure your PDF document.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Protect</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Protect PDF" and watch as your PDF is processed and secured with password protection.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your protected PDF will be automatically downloaded. The file is now secured with password protection.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Protect PDF Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Protect PDF?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All protection happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Protect PDFs in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-shield-lock text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Secure Documents</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Add password protection to prevent unauthorized access to sensitive documents, contracts, or confidential files.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-file-earmark-lock text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Control Access</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Restrict who can view, edit, print, or copy your PDF documents. Only those with the password can access the file.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Protect unlimited PDFs completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-briefcase text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Business Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Protect contracts, invoices, financial reports, and other sensitive business documents.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-medical text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Medical Records</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Secure patient records, medical reports, and health information with password protection.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-person-vcard text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Personal Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Protect personal identification documents, tax returns, and other private files.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-journal-text text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Legal Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Secure legal agreements, court documents, and confidential legal materials.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Attachments</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Protect PDFs before sending via email to ensure only intended recipients can access them.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-cloud-upload text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Cloud Storage</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Add an extra layer of security to PDFs stored in cloud services or shared drives.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

function getPDFOCRContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span class="emoji-eye" style="font-size: 5rem;">👁️</span>
        </div>
        <div class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PDF OCR
        </div>
        <p class="text-light fs-5 mb-2 fw-medium">Extract text from PDF images using OCR</p>
        <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <!-- Dropzone Section -->
      <label class="dropzone w-100 border border-2 border-dashed border-secondary rounded-3 p-5 d-flex flex-column align-items-center justify-content-center cursor-pointer mb-5 bg-dark-subtle shadow-lg" 
             id="dropzone-ocr" 
             style="min-height: 220px;">
        <div class="mb-4 position-relative">
          <i class="bi bi-cloud-arrow-up-fill text-primary" style="font-size: 4rem;"></i>
        </div>
        <span id="dropLabel-ocr" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
        <span class="text-secondary small">or click to browse files</span>
        <input type="file" id="file-ocr" class="d-none" accept="application/pdf" />
      </label>

      <!-- Controls Section -->
      <div class="d-flex flex-wrap gap-3 w-100 mb-5 justify-content-center align-items-end">
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-translate"></i> Language
          </label>
          <select id="language-ocr" class="form-select bg-dark text-light border-secondary">
            <option value="eng">English</option>
            <option value="spa">Spanish</option>
            <option value="fra">French</option>
            <option value="deu">German</option>
            <option value="chi_sim">Chinese (Simplified)</option>
            <option value="jpn">Japanese</option>
            <option value="kor">Korean</option>
            <option value="ara">Arabic</option>
            <option value="rus">Russian</option>
          </select>
          <span class="form-text text-secondary mt-1 d-block" style="font-size: 0.75rem;">Select the language of text in your PDF</span>
        </div>
        <div class="d-flex flex-column gap-2">
          <button id="ocr-btn" class="btn btn-primary btn-lg fw-bold rounded-3 shadow-lg bg-gradient-primary d-flex align-items-center gap-2">
            <i class="bi bi-lightning-fill"></i> Extract Text
          </button>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="card bg-dark-subtle border-0 shadow-sm p-4 mb-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="text-light fw-medium d-flex align-items-center gap-2">
            <i class="bi bi-bar-chart"></i> Progress
          </span>
          <span id="stats-ocr" class="small text-secondary">No file selected</span>
        </div>
        <div class="progress mb-3" style="height: 10px; border-radius: 5px; background-color: rgba(255, 255, 255, 0.1);">
          <div id="bar-ocr" class="progress-bar bg-gradient-primary" role="progressbar" style="width: 0%; opacity: 1;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p id="log-ocr" class="small text-light text-center mb-0" style="min-height: 24px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to extract text from your PDF files</p>
      </div>

      <!-- Text Result Section -->
      <div id="text-result-ocr" class="card border-0 shadow-sm mb-5 d-none">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <h3 class="fs-5 fw-semibold text-light mb-0 d-flex align-items-center gap-2">
              <i class="bi bi-file-text"></i> Extracted Text
            </h3>
            <div class="d-flex gap-2">
              <button id="copy-text-ocr" class="btn btn-primary btn-sm d-flex align-items-center gap-2">
                <i class="bi bi-clipboard"></i> Copy
              </button>
              <button id="download-text-ocr" class="btn btn-success btn-sm d-flex align-items-center gap-2">
                <i class="bi bi-download"></i> Download
              </button>
            </div>
          </div>
          <textarea id="extracted-text-ocr" class="form-control bg-dark text-light border-secondary" rows="16" readonly style="font-family: monospace; font-size: 0.9rem;"></textarea>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDF</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your PDF file or click to browse and select from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Choose Language</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Select the language of the text in your PDF for better OCR accuracy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Extract Text</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Extract Text" and watch as OCR processes each page to extract text from images.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Copy Text</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">View the extracted text and copy it to use in any application or document.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Use PDF OCR Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Use PDF OCR?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All OCR processing happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Extract text from PDFs in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-file-earmark-text text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Make PDFs Searchable</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert scanned PDFs and image-based PDFs into searchable, editable text that you can copy and use.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Multi-Language Support</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Supports multiple languages including English, Spanish, French, German, Chinese, Japanese, and more.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Extract text from unlimited PDFs completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-text text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Scanned Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Extract text from scanned PDFs, receipts, invoices, and other image-based documents.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-search text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Make PDFs Searchable</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert image-based PDFs into searchable documents that you can search through.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-pencil text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Edit Scanned Text</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Extract text from scanned documents to edit, modify, or reuse in other applications.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-files text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Copy Text</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Copy text from PDF images that don't have selectable text layers.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-archive text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Document Digitization</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Digitize old documents, books, or printed materials by extracting their text content.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-translate text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Translation Preparation</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Extract text from PDFs in one language to prepare for translation to another language.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}

// PDF to Word content removed (not functional)
/*function getPDFToWordContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span class="emoji-memo" style="font-size: 5rem;">📝</span>
        </div>
        <div class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PDF → Word Converter
        </div>
        <p class="text-light fs-5 mb-2 fw-medium">Convert PDF to Word instantly in your browser</p>
        <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <!-- Dropzone Section -->
      <label class="dropzone w-100 border border-2 border-dashed border-secondary rounded-3 p-5 d-flex flex-column align-items-center justify-content-center cursor-pointer mb-5 bg-dark-subtle shadow-lg" 
             id="dropzone-pdf-word" 
             style="min-height: 220px;">
        <div class="mb-4 position-relative">
          <i class="bi bi-cloud-arrow-up-fill text-primary" style="font-size: 4rem;"></i>
        </div>
        <span id="dropLabel-pdf-word" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
        <span class="text-secondary small">or click to browse files</span>
        <input type="file" id="file-pdf-word" class="d-none" accept="application/pdf" />
      </label>

      <!-- Controls Section -->
      <div class="d-flex flex-wrap gap-3 w-100 mb-5 justify-content-center align-items-end">
        <div class="d-flex flex-column gap-2">
          <button id="convert-pdf-word" class="btn btn-primary btn-lg fw-bold rounded-3 shadow-lg bg-gradient-primary d-flex align-items-center gap-2">
            <i class="bi bi-lightning-fill"></i> Convert PDF to Word
          </button>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="card bg-dark-subtle border-0 shadow-sm p-4 mb-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="text-light fw-medium d-flex align-items-center gap-2">
            <i class="bi bi-bar-chart"></i> Progress
          </span>
          <span id="stats-pdf-word" class="small text-secondary">No file selected</span>
        </div>
        <div class="progress mb-3" style="height: 10px; border-radius: 5px; background-color: rgba(255, 255, 255, 0.1);">
          <div id="bar-pdf-word" class="progress-bar bg-gradient-primary" role="progressbar" style="width: 0%; opacity: 1;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p id="log-pdf-word" class="small text-light text-center mb-0" style="min-height: 24px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your PDF files</p>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select PDF</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your PDF file or click to browse and select from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Extract Text</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Our tool extracts all text content from your PDF document, preserving structure and formatting.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Convert</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Convert PDF to Word" and watch as your PDF is processed instantly in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your Word document will be automatically downloaded, ready to edit in Microsoft Word or Google Docs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Convert PDF to Word Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Convert PDF to Word?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your PDF files never leave your computer. All conversion happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDF to Word in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-pencil text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Easy Editing</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDFs to Word format to enable easy editing, formatting changes, and content modifications.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-file-earmark-word text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Universal Format</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Word documents are widely supported and can be opened in Microsoft Word, Google Docs, LibreOffice, and more.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Convert unlimited PDFs to Word completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-pencil text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Edit Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDFs to Word to edit text, add comments, or modify content that was previously locked in PDF format.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-file-earmark-text text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Resume Updates</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDF resumes to Word format to easily update your work experience, skills, and contact information.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-journal-text text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Academic Papers</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDF research papers or articles to Word for easier citation, annotation, and collaboration.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-briefcase text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Business Documents</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDF contracts, reports, or proposals to Word for editing and customization.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-share text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Collaboration</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDFs to Word for easier collaboration with track changes, comments, and version control.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-archive text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Format Conversion</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert PDFs to Word format for compatibility with various word processors and editing tools.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}*/

// Word to PDF content removed (not functional)
/*function getWordToPDFContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span class="emoji-document" style="font-size: 4rem;">📄</span>
          </div>
          <div class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            Word to PDF
          </div>
          <p class="text-light fs-5 mb-2 fw-medium">Convert Word documents to PDF format</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-word-pdf" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-word-pdf" class="text-light fw-semibold fs-5 mb-2">Drag & drop your Word document here</span>
            <span class="text-secondary small">or click to browse files (.docx, .doc)</span>
            <input type="file" id="file-word-pdf" class="d-none" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
          </label>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button id="convert-word-pdf" class="btn btn-primary fw-bold px-4 py-2">
              Convert to PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="text-light fw-medium">Status</span>
            <span id="status-word-pdf" class="small text-secondary">No file selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-word-pdf" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-word-pdf" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your Word document</p>
        </div>
      </div>
    </div>
  `;
}*/

function getHEICToJPGContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span class="emoji-camera" style="font-size: 5rem;">📷</span>
        </div>
        <div class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          HEIC to JPG Converter
        </div>
        <p class="text-light fs-5 mb-2 fw-medium">Convert HEIC images to JPG format instantly in your browser</p>
        <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <!-- Dropzone Section -->
      <label class="dropzone w-100 border border-2 border-dashed border-secondary rounded-3 p-5 d-flex flex-column align-items-center justify-content-center cursor-pointer mb-5 bg-dark-subtle shadow-lg" 
             id="dropzone-heic-jpg" 
             style="min-height: 220px;">
        <div class="mb-4 position-relative">
          <i class="bi bi-cloud-arrow-up-fill text-primary" style="font-size: 4rem;"></i>
        </div>
        <span id="dropLabel-heic-jpg" class="text-light fw-semibold fs-5 mb-2">Drag & drop your HEIC images here</span>
        <span class="text-secondary small">or click to browse files</span>
        <input type="file" id="file-heic-jpg" class="d-none" accept="image/heic,image/heif,.heic,.heif" multiple />
      </label>

      <!-- Controls Section -->
      <div class="d-flex flex-wrap gap-3 w-100 mb-5 justify-content-center align-items-end">
        <div class="card bg-dark-subtle border-0 shadow-sm p-4">
          <label class="form-label text-light small fw-medium mb-2 d-flex align-items-center gap-2">
            <i class="bi bi-sliders"></i> JPEG Quality
          </label>
          <input type="range" id="quality-heic-jpg" min="0.1" max="1" step="0.05" value="0.9" class="form-range" style="width: 200px;">
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span class="form-text text-secondary" style="font-size: 0.75rem;">Lower = Smaller</span>
            <span id="quality-value-heic-jpg" class="badge bg-primary text-white px-3 py-1">0.9</span>
            <span class="form-text text-secondary" style="font-size: 0.75rem;">Higher = Better</span>
          </div>
        </div>
        <div class="d-flex flex-column gap-2">
          <button id="convert-heic-jpg" class="btn btn-primary btn-lg fw-bold rounded-3 shadow-lg bg-gradient-primary d-flex align-items-center gap-2">
            <i class="bi bi-lightning-fill"></i> Convert to JPG
          </button>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="card bg-dark-subtle border-0 shadow-sm p-4 mb-5">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <span class="text-light fw-medium d-flex align-items-center gap-2">
            <i class="bi bi-bar-chart"></i> Progress
          </span>
          <span id="stats-heic-jpg" class="small text-secondary">No images selected</span>
        </div>
        <div class="progress mb-3" style="height: 10px; border-radius: 5px; background-color: rgba(255, 255, 255, 0.1);">
          <div id="bar-heic-jpg" class="progress-bar bg-gradient-primary" role="progressbar" style="width: 0%; opacity: 1;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p id="log-heic-jpg" class="small text-light text-center mb-0" style="min-height: 24px;"><span class="animate-bounce" style="display: inline-block;">✨</span> Ready to convert your HEIC images</p>
      </div>

      <!-- How It Works Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            How It Works
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    1
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Select HEIC Images</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Drag and drop your HEIC images or click to browse and select multiple HEIC/HEIF files from your computer.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    2
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Adjust Quality</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Set JPEG quality (0.1-1.0) to balance file size and image quality. Higher values maintain better quality.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    3
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Convert</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Click "Convert to JPG" and watch as your HEIC images are converted to JPG format instantly in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-3">
              <div class="text-center">
                <div class="mb-3">
                  <div class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold" style="width: 60px; height: 60px; font-size: 1.5rem;">
                    4
                  </div>
                </div>
                <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Download</h3>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">All converted JPG images will be automatically downloaded. Each image is saved as a separate file.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Convert HEIC to JPG Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            Why Convert HEIC to JPG?
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f59e0b;">
                    <i class="bi bi-lock-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">100% Private</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Your images never leave your computer. All conversion happens locally in your browser - no uploads, no server storage, complete privacy.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #f97316;">
                    <i class="bi bi-lightning-fill text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Lightning Fast</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert HEIC to JPG in seconds. No waiting for file uploads or server processing. Instant results right in your browser.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #10b981;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Universal Compatibility</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">JPG format is supported by all devices, platforms, and software. Convert HEIC to JPG for maximum compatibility.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #3b82f6;">
                    <i class="bi bi-share text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Easy Sharing</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">JPG images are easier to share via email, messaging apps, and social media platforms that may not support HEIC.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded text-white fw-bold" style="width: 80px; height: 80px; background: #ef4444; font-size: 1.25rem; letter-spacing: 0.05em;">
                    FREE
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">Completely Free</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">No hidden costs, no subscriptions, no watermarks. Convert unlimited HEIC images to JPG completely free.</p>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="text-center h-100">
                <div class="mb-3">
                  <div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: #06b6d4;">
                    <i class="bi bi-globe text-white" style="font-size: 2.5rem;"></i>
                  </div>
                </div>
                <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">No Installation</h4>
                <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">Works entirely in your web browser. No software downloads, no plugins required. Works on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Use Cases Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-list-ul me-2"></i>Common Use Cases
          </h2>
          <div class="row g-4">
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-phone text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">iPhone Photos</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert iPhone HEIC photos to JPG for sharing with Android users or uploading to platforms that don't support HEIC.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-share text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Social Media</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert HEIC images to JPG for posting on social media platforms that require JPG format.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-envelope-check text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Email Attachments</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert HEIC images to JPG for easier email sharing, as many email clients don't support HEIC format.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-laptop text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Windows/PC Compatibility</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert HEIC images to JPG for viewing and editing on Windows computers that don't natively support HEIC.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-cloud-upload text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Cloud Storage</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert HEIC images to JPG before uploading to cloud storage services for better compatibility.</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card border-0 h-100" style="background-color: rgba(30, 41, 59, 0.8);">
                <div class="card-body p-4">
                  <i class="bi bi-printer text-primary mb-3 d-block" style="font-size: 2rem;"></i>
                  <h5 class="text-light fw-bold mb-2" style="font-size: 1.1rem;">Printing</h5>
                  <p class="text-secondary mb-0" style="font-size: 0.95rem; line-height: 1.6;">Convert HEIC images to JPG for printing, as many printers and print services prefer JPG format.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  `;
}



// ===== Reliable canvas-based image format converters (JPG→PNG, Image→WebP) =====
function getImageConvertContent(o) {
  const steps = o.steps.map((s, i) => `
              <div class="col-md-6 col-lg-3">
                <div class="text-center">
                  <div class="mb-3"><div class="d-inline-flex align-items-center justify-content-center rounded-circle text-white fw-bold" style="width: 60px; height: 60px; background: #3b82f6; font-size: 1.5rem;">${i + 1}</div></div>
                  <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">${s.title}</h3>
                  <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">${s.text}</p>
                </div>
              </div>`).join('');
  const benefits = o.benefits.map(b => `
              <div class="col-md-6 col-lg-4">
                <div class="text-center">
                  <div class="mb-3"><div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: ${b.color};"><i class="bi ${b.icon} text-white" style="font-size: 2rem;"></i></div></div>
                  <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">${b.title}</h4>
                  <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">${b.text}</p>
                </div>
              </div>`).join('');
  return `
  <div class="w-100">
    <div class="mx-auto" style="max-width: 760px;">
      <div class="text-center mb-4">
        <div style="font-size: 3rem;">${o.emoji}</div>
        <div class="text-gradient fw-bold mb-2" style="font-size: 2.2rem;">${o.title}</div>
        <p class="text-light fs-5 mb-0">${o.subtitle}</p>
        <p class="text-secondary small mt-1 mb-0">Free • No Upload Required • 100% Secure</p>
      </div>
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4">
          <div id="dz-${o.id}" class="dropzone text-center p-5" role="button" tabindex="0" style="cursor: pointer;">
            <div style="font-size: 2.5rem;">📁</div>
            <p class="fw-semibold mb-1 text-light">Drag &amp; drop ${o.hint} here</p>
            <p class="small text-secondary mb-0">or click to browse</p>
            <input type="file" id="file-${o.id}" class="d-none" accept="${o.accept}" multiple>
          </div>
          <ul id="list-${o.id}" class="list-unstyled mt-3 mb-0 small text-light"></ul>
          <div class="d-flex flex-column align-items-center gap-2 mt-3">
            <button id="btn-${o.id}" class="btn btn-primary fw-bold px-4 py-2" disabled><i class="bi bi-magic me-2"></i>${o.cta}</button>
            <span id="status-${o.id}" class="small text-secondary">No files selected</span>
          </div>
          <div id="result-${o.id}" class="mt-3 text-center"></div>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div class="card border-0 shadow-sm mb-5">
      <div class="card-body p-4 p-lg-5">
        <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">How It Works</h2>
        <div class="row g-4">${steps}
        </div>
      </div>
    </div>

    <!-- Why -->
    <div class="card border-0 shadow-sm mb-5">
      <div class="card-body p-4 p-lg-5">
        <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">${o.whyTitle}</h2>
        <div class="row g-4 justify-content-center">${benefits}
        </div>
      </div>
    </div>

    <!-- Common Use Cases -->
    <div class="card border-0 shadow-sm mb-5">
      <div class="card-body p-4 p-lg-5">
        <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">Common Use Cases</h2>
        <div class="row g-4 justify-content-center">${(o.useCases || []).map(u => `<div class="col-md-6 col-lg-3"><div class="card border-0 h-100 text-center" style="background-color: rgba(30,41,59,.8);"><div class="card-body p-4"><div class="mb-2"><i class="bi ${u.icon} text-primary" style="font-size:1.8rem;"></i></div><h3 class="text-light fw-bold mb-1" style="font-size:1.05rem;">${u.title}</h3><p class="text-secondary mb-0" style="font-size:.9rem; line-height:1.5;">${u.text}</p></div></div></div>`).join('')}
        </div>
      </div>
    </div>

    ${sectionFAQ(o.faqs)}
  </div>`;
}
function getJPGToPNGContent() {
  return getImageConvertContent({
    id: 'jpg-to-png', emoji: '🪄', title: 'JPG to PNG Converter',
    subtitle: 'Convert JPG/JPEG images to PNG, right in your browser', accept: 'image/jpeg', hint: 'JPG images', cta: 'Convert to PNG',
    whyTitle: 'Why Convert JPG to PNG?',
    useCases: [
      { icon: 'bi-palette', title: 'Logos & Graphics', text: 'Keep logos and graphics crisp with lossless PNG edges.' },
      { icon: 'bi-pencil-square', title: 'Editing', text: 'Get a clean PNG to edit further without JPG artifacts.' },
      { icon: 'bi-layers', title: 'Transparency-ready', text: 'Move to a format built for transparency in design work.' },
      { icon: 'bi-window', title: 'Web & Apps', text: 'Use sharp PNGs for UI elements, icons and screenshots.' }
    ],
    steps: [
      { title: 'Select JPG Images', text: 'Drag and drop your JPG/JPEG images, or click to browse and select multiple files from your computer.' },
      { title: 'Click Convert', text: 'Hit "Convert to PNG" — your images are converted to lossless PNG instantly, right in your browser.' },
      { title: 'Stay Private', text: 'Nothing is uploaded. The whole conversion runs locally on your device, so your images stay private.' },
      { title: 'Download', text: 'Download your PNG images individually, or grab them all at once in a single ZIP file.' }
    ],
    benefits: [
      { color: '#f59e0b', icon: 'bi-shield-lock-fill', title: '100% Private', text: 'Your images never leave your device — everything is processed in your browser, not on a server.' },
      { color: '#f97316', icon: 'bi-lightning-fill', title: 'Lightning Fast', text: 'No uploads, no waiting. Convert JPG to PNG in seconds with instant local processing.' },
      { color: '#10b981', icon: 'bi-vector-pen', title: 'Lossless Quality', text: 'PNG is lossless, so edges and details stay perfectly crisp — ideal for graphics and editing.' }
    ],
    faqs: [
      { q: 'Why convert JPG to PNG?', a: 'PNG is lossless and keeps sharp edges crisp, which is better for graphics, logos and further editing.' },
      { q: 'Will the file get bigger?', a: 'Often yes — PNG is lossless, so photos can be larger than the JPG. That trade-off buys you perfect quality.' },
      { q: 'Are my images uploaded?', a: 'No. Conversion happens entirely in your browser; your files never leave your device.' },
      { q: 'Can I convert many at once?', a: 'Yes — drop in a whole batch and download them together as a ZIP.' }
    ]
  });
}
function getImageToWebpContent() {
  return getImageConvertContent({
    id: 'image-to-webp', emoji: '🌐', title: 'Image to WebP Converter',
    subtitle: 'Convert JPG &amp; PNG images to modern, smaller WebP', accept: 'image/*', hint: 'images', cta: 'Convert to WebP',
    whyTitle: 'Why Convert to WebP?',
    useCases: [
      { icon: 'bi-speedometer2', title: 'Faster Websites', text: 'Shrink images to speed up page loads and Core Web Vitals.' },
      { icon: 'bi-hdd', title: 'Save Storage', text: 'Store more photos in less space with smaller WebP files.' },
      { icon: 'bi-cloud-arrow-up', title: 'Email & Upload', text: 'Send lighter images that fit attachment and upload limits.' },
      { icon: 'bi-images', title: 'Galleries', text: 'Serve large image galleries without the bandwidth cost.' }
    ],
    steps: [
      { title: 'Select Images', text: 'Drag and drop your JPG or PNG images, or click to browse and select multiple files.' },
      { title: 'Click Convert', text: 'Hit "Convert to WebP" — your images are re-encoded to the modern WebP format instantly.' },
      { title: 'Stay Private', text: 'All processing happens locally in your browser; your images are never uploaded anywhere.' },
      { title: 'Download', text: 'Download a single WebP file, or all of them together as a ZIP.' }
    ],
    benefits: [
      { color: '#10b981', icon: 'bi-speedometer2', title: 'Smaller Files', text: 'WebP is typically 25–35% smaller than JPG/PNG at similar quality — perfect for faster websites.' },
      { color: '#f59e0b', icon: 'bi-shield-lock-fill', title: '100% Private', text: 'Your images never leave your device. Everything runs in your browser, not on a server.' },
      { color: '#3b82f6', icon: 'bi-lightning-fill', title: 'Instant & Free', text: 'No uploads, no signup, no limits. Convert as many images as you like, instantly.' }
    ],
    faqs: [
      { q: 'Why use WebP?', a: 'WebP gives smaller files at similar quality, which speeds up page loads and improves SEO.' },
      { q: 'Is WebP supported everywhere?', a: 'All modern browsers support WebP. For very old software, keep a JPG/PNG copy as well.' },
      { q: 'Does it reduce quality?', a: 'WebP uses smart compression — at the default setting the difference is hard to spot while files shrink a lot.' },
      { q: 'Are my images uploaded?', a: 'No — conversion is 100% in your browser, so your files stay private.' }
    ]
  });
}

function getWebpToJPGContent() {
  return getImageConvertContent({
    id: 'webp-to-jpg', emoji: '🖼️', title: 'WebP to JPG Converter',
    subtitle: 'Convert WebP images to widely-supported JPG', accept: 'image/webp', hint: 'WebP images', cta: 'Convert to JPG',
    whyTitle: 'Why Convert WebP to JPG?',
    useCases: [
      { icon: 'bi-check2-circle', title: 'Universal Support', text: 'Open images in apps that do not accept WebP.' },
      { icon: 'bi-printer', title: 'Printing', text: 'Convert to JPG for print shops and photo services.' },
      { icon: 'bi-share', title: 'Sharing', text: 'Share photos in the format every device understands.' },
      { icon: 'bi-camera', title: 'Photo Editing', text: 'Use JPG in older editors that lack WebP support.' }
    ],
    steps: [
      { title: 'Select WebP Images', text: 'Drag and drop your WebP files, or click to browse and pick multiple images.' },
      { title: 'Click Convert', text: 'Hit "Convert to JPG" — each WebP is re-encoded to a universally-supported JPG instantly.' },
      { title: 'Stay Private', text: 'Everything runs locally in your browser — your images are never uploaded.' },
      { title: 'Download', text: 'Download one JPG, or all of them together as a ZIP file.' }
    ],
    benefits: [
      { color: '#10b981', icon: 'bi-globe2', title: 'Universal Support', text: 'JPG opens on every device, app and website — even old software that can\'t read WebP.' },
      { color: '#f59e0b', icon: 'bi-shield-lock-fill', title: '100% Private', text: 'Your images never leave your device. All processing happens in your browser.' },
      { color: '#3b82f6', icon: 'bi-lightning-fill', title: 'Instant & Free', text: 'No uploads, no signup, no limits. Convert as many WebP images as you like.' }
    ],
    faqs: [
      { q: 'Why convert WebP to JPG?', a: 'Some apps, editors and older devices don\'t support WebP — JPG works everywhere.' },
      { q: 'Will quality change?', a: 'JPG is lossy, so there\'s a tiny re-compression; at the default quality it\'s not noticeable.' },
      { q: 'Are my images uploaded?', a: 'No — conversion is 100% in your browser.' },
      { q: 'Can I convert many at once?', a: 'Yes — batch-convert and download them together as a ZIP.' }
    ]
  });
}
function getWebpToPNGContent() {
  return getImageConvertContent({
    id: 'webp-to-png', emoji: '🎨', title: 'WebP to PNG Converter',
    subtitle: 'Convert WebP images to lossless PNG', accept: 'image/webp', hint: 'WebP images', cta: 'Convert to PNG',
    whyTitle: 'Why Convert WebP to PNG?',
    useCases: [
      { icon: 'bi-vector-pen', title: 'Lossless Quality', text: 'Convert WebP to lossless PNG for editing and design.' },
      { icon: 'bi-layers', title: 'Transparency', text: 'Keep transparent backgrounds intact in PNG format.' },
      { icon: 'bi-check2-circle', title: 'Compatibility', text: 'Use PNGs in tools and sites that do not support WebP.' },
      { icon: 'bi-window', title: 'UI & Icons', text: 'Drop crisp PNG assets into apps and websites.' }
    ],
    steps: [
      { title: 'Select WebP Images', text: 'Drag and drop your WebP files, or click to browse and select multiple images.' },
      { title: 'Click Convert', text: 'Hit "Convert to PNG" — each WebP becomes a lossless PNG, instantly, in your browser.' },
      { title: 'Stay Private', text: 'No uploads — the conversion runs entirely on your device.' },
      { title: 'Download', text: 'Download a single PNG, or all of them at once as a ZIP.' }
    ],
    benefits: [
      { color: '#10b981', icon: 'bi-vector-pen', title: 'Lossless Quality', text: 'PNG keeps every pixel and supports transparency — ideal for graphics and editing.' },
      { color: '#f59e0b', icon: 'bi-shield-lock-fill', title: '100% Private', text: 'Your images never leave your device — everything is processed in your browser.' },
      { color: '#3b82f6', icon: 'bi-lightning-fill', title: 'Instant & Free', text: 'No uploads, no signup, no limits. Convert unlimited WebP images for free.' }
    ],
    faqs: [
      { q: 'Why convert WebP to PNG?', a: 'PNG is lossless, supports transparency and is widely supported by editing software.' },
      { q: 'Does PNG keep transparency?', a: 'Yes — if the WebP has transparency, the PNG preserves it.' },
      { q: 'Are my images uploaded?', a: 'No — conversion happens entirely in your browser.' },
      { q: 'Can I convert in bulk?', a: 'Yes — drop in many files and download them together as a ZIP.' }
    ]
  });
}

// ===== Generic rich wrapper for non-converter "utility" tools =====
function getUtilityContent(o) {
  const steps = o.steps.map((s, i) => `
              <div class="col-md-6 col-lg-3">
                <div class="text-center">
                  <div class="mb-3"><div class="d-inline-flex align-items-center justify-content-center rounded-circle text-white fw-bold" style="width: 60px; height: 60px; background: #3b82f6; font-size: 1.5rem;">${i + 1}</div></div>
                  <h3 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">${s.title}</h3>
                  <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">${s.text}</p>
                </div>
              </div>`).join('');
  const benefits = o.benefits.map(b => `
              <div class="col-md-6 col-lg-4">
                <div class="text-center">
                  <div class="mb-3"><div class="d-inline-flex align-items-center justify-content-center rounded" style="width: 80px; height: 80px; background: ${b.color};"><i class="bi ${b.icon} text-white" style="font-size: 2rem;"></i></div></div>
                  <h4 class="text-light fw-bold mb-2" style="font-size: 1.25rem;">${b.title}</h4>
                  <p class="text-light mb-0" style="font-size: 0.95rem; line-height: 1.6;">${b.text}</p>
                </div>
              </div>`).join('');
  return `
  <div class="w-100">
    <div class="mx-auto" style="max-width: 760px;">
      <div class="text-center mb-4">
        <div style="font-size: 3rem;">${o.emoji}</div>
        <div class="text-gradient fw-bold mb-2" style="font-size: 2.2rem;">${o.title}</div>
        <p class="text-light fs-5 mb-0">${o.subtitle}</p>
        <p class="text-secondary small mt-1 mb-0">Free • Private • In your browser</p>
      </div>
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">${o.bodyHtml}</div>
      </div>
    </div>
    <div class="card border-0 shadow-sm mb-5"><div class="card-body p-4 p-lg-5">
      <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">How It Works</h2>
      <div class="row g-4">${steps}
      </div>
    </div></div>
    <div class="card border-0 shadow-sm mb-5"><div class="card-body p-4 p-lg-5">
      <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">${o.whyTitle}</h2>
      <div class="row g-4 justify-content-center">${benefits}
      </div>
    </div></div>
    <div class="card border-0 shadow-sm mb-5"><div class="card-body p-4 p-lg-5">
      <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">Common Use Cases</h2>
      <div class="row g-4 justify-content-center">${(o.useCases || []).map(u => `<div class="col-md-6 col-lg-3"><div class="card border-0 h-100 text-center" style="background-color: rgba(30,41,59,.8);"><div class="card-body p-4"><div class="mb-2"><i class="bi ${u.icon} text-primary" style="font-size:1.8rem;"></i></div><h3 class="text-light fw-bold mb-1" style="font-size:1.05rem;">${u.title}</h3><p class="text-secondary mb-0" style="font-size:.9rem; line-height:1.5;">${u.text}</p></div></div></div>`).join('')}
      </div>
    </div></div>
    ${sectionFAQ(o.faqs)}
  </div>`;
}

function getQRCodeContent() {
  return getUtilityContent({
    emoji: '🔳', title: 'QR Code Generator', subtitle: 'Create a QR code for any link or text, free', whyTitle: 'Why Use Our QR Generator?',
    useCases: [
      { icon: 'bi-link-45deg', title: 'Share Links', text: 'Turn any URL into a scannable code for posters or slides.' },
      { icon: 'bi-shop', title: 'Menus & Signage', text: 'Add QR codes to menus, flyers and shop windows.' },
      { icon: 'bi-wifi', title: 'Wi-Fi & Contact', text: 'Encode Wi-Fi details or contact info for quick sharing.' },
      { icon: 'bi-printer', title: 'Print Materials', text: 'Download a high-res PNG to print on anything.' }
    ],
    bodyHtml: `
      <div class="mb-3">
        <label class="form-label text-light fw-semibold" for="qr-text">Text or URL</label>
        <textarea id="qr-text" class="form-control" rows="3" placeholder="https://example.com or any text">https://www.pdf-to-jpg-tool.com</textarea>
      </div>
      <div class="d-flex flex-wrap align-items-end gap-3 mb-2">
        <div>
          <label class="form-label text-light small" for="qr-size">Size</label>
          <select id="qr-size" class="form-select"><option value="200">Small</option><option value="320" selected>Medium</option><option value="512">Large</option></select>
        </div>
      </div>
      <div class="text-center my-4"><canvas id="qr-canvas" style="max-width:100%; height:auto;"></canvas></div>
      <div class="text-center"><button id="qr-download" class="btn btn-success fw-bold" disabled><i class="bi bi-download me-2"></i>Download PNG</button></div>`,
    steps: [
      { title: 'Enter Text or URL', text: 'Type or paste the link, text, Wi-Fi details or anything you want encoded.' },
      { title: 'Pick a Size', text: 'Choose small, medium or large depending on where you\'ll use the QR code.' },
      { title: 'Preview Instantly', text: 'The QR code updates live as you type — no button needed.' },
      { title: 'Download PNG', text: 'Save a high-quality PNG you can print or share anywhere.' }
    ],
    benefits: [
      { color: '#3b82f6', icon: 'bi-lightning-fill', title: 'Instant & Live', text: 'The QR code generates as you type — fast, no waiting, no uploads.' },
      { color: '#f59e0b', icon: 'bi-shield-lock-fill', title: '100% Private', text: 'Your text never leaves your device. The QR code is built right in your browser.' },
      { color: '#10b981', icon: 'bi-infinity', title: 'Free & Unlimited', text: 'Generate as many QR codes as you want — no signup, no limits, no watermarks.' }
    ],
    faqs: [
      { q: 'Do QR codes expire?', a: 'No — these are static QR codes encoded directly from your text, so they work forever.' },
      { q: 'What can I encode?', a: 'Any URL or text — links, contact info, Wi-Fi credentials, plain notes, and more.' },
      { q: 'Is it really free?', a: 'Yes, completely free with no signup, no limits and no watermark.' },
      { q: 'Is my data uploaded?', a: 'No — the QR code is generated locally in your browser.' }
    ]
  });
}

function getPasswordGenContent() {
  return getUtilityContent({
    emoji: '🔑', title: 'Password Generator', subtitle: 'Create strong, random passwords instantly', whyTitle: 'Why Use Our Password Generator?',
    useCases: [
      { icon: 'bi-box-arrow-in-right', title: 'New Accounts', text: 'Create a strong unique password for every signup.' },
      { icon: 'bi-arrow-repeat', title: 'Password Resets', text: 'Replace weak or reused passwords with secure ones.' },
      { icon: 'bi-safe2', title: 'Password Managers', text: 'Generate entries to store in your password vault.' },
      { icon: 'bi-shield-lock', title: 'Wi-Fi & Devices', text: 'Set tough passwords for routers, devices and admin logins.' }
    ],
    bodyHtml: `
      <div class="mb-3">
        <div class="input-group">
          <input id="pw-out" type="text" class="form-control fw-bold" readonly style="font-family: monospace; font-size: 1.1rem;">
          <button id="pw-copy" class="btn btn-outline-primary" title="Copy"><i class="bi bi-clipboard"></i></button>
        </div>
        <div id="pw-strength" class="small mt-2 text-secondary"></div>
      </div>
      <div class="mb-3">
        <label class="form-label text-light small">Length: <span id="pw-len-val" class="fw-bold">16</span></label>
        <input id="pw-len" type="range" min="6" max="64" value="16" class="form-range">
      </div>
      <div class="d-flex flex-wrap gap-3 mb-4">
        <div class="form-check"><input id="pw-upper" type="checkbox" class="form-check-input" checked><label class="form-check-label text-light" for="pw-upper">A-Z</label></div>
        <div class="form-check"><input id="pw-lower" type="checkbox" class="form-check-input" checked><label class="form-check-label text-light" for="pw-lower">a-z</label></div>
        <div class="form-check"><input id="pw-num" type="checkbox" class="form-check-input" checked><label class="form-check-label text-light" for="pw-num">0-9</label></div>
        <div class="form-check"><input id="pw-sym" type="checkbox" class="form-check-input" checked><label class="form-check-label text-light" for="pw-sym">!@#$%</label></div>
      </div>
      <div class="text-center"><button id="pw-gen" class="btn btn-primary fw-bold"><i class="bi bi-arrow-repeat me-2"></i>Generate Password</button></div>`,
    steps: [
      { title: 'Choose Length', text: 'Drag the slider from 6 to 64 characters — longer is stronger.' },
      { title: 'Pick Character Types', text: 'Toggle uppercase, lowercase, numbers and symbols to match site rules.' },
      { title: 'Generate', text: 'A cryptographically-random password is created instantly using your browser\'s secure RNG.' },
      { title: 'Copy & Use', text: 'Copy it with one click and paste it wherever you need.' }
    ],
    benefits: [
      { color: '#10b981', icon: 'bi-shield-check', title: 'Cryptographically Secure', text: 'Uses the browser\'s crypto RNG — truly random, not predictable.' },
      { color: '#f59e0b', icon: 'bi-incognito', title: '100% Private', text: 'Passwords are generated locally and never sent anywhere or stored.' },
      { color: '#3b82f6', icon: 'bi-sliders', title: 'Fully Customizable', text: 'Control length and character sets to meet any password policy.' }
    ],
    faqs: [
      { q: 'Are these passwords safe?', a: 'Yes — they\'re generated with the browser\'s cryptographically-secure random generator.' },
      { q: 'Are passwords stored or sent anywhere?', a: 'No — everything happens in your browser; nothing is uploaded or saved.' },
      { q: 'How long should my password be?', a: 'At least 16 characters with mixed types is a strong, modern baseline.' },
      { q: 'Can I generate many?', a: 'Yes — click Generate as many times as you like.' }
    ]
  });
}

function getWordCounterContent() {
  return getUtilityContent({
    emoji: '🔢', title: 'Word & Character Counter', subtitle: 'Count words, characters, sentences and reading time', whyTitle: 'Why Use Our Word Counter?',
    useCases: [
      { icon: 'bi-pencil', title: 'Essays & Assignments', text: 'Hit exact word counts for school and university work.' },
      { icon: 'bi-megaphone', title: 'Social & SEO', text: 'Stay within character limits for posts and meta tags.' },
      { icon: 'bi-file-text', title: 'Articles & Blogs', text: 'Track length and estimated reading time as you write.' },
      { icon: 'bi-translate', title: 'Editing', text: 'Tighten copy by watching words, sentences and characters.' }
    ],
    bodyHtml: `
      <textarea id="wc-text" class="form-control" rows="8" placeholder="Type or paste your text here…"></textarea>
      <div class="row text-center mt-4 g-3">
        <div class="col-6 col-md-3"><div class="h3 fw-bold text-gradient mb-0" id="wc-words">0</div><div class="small text-secondary">Words</div></div>
        <div class="col-6 col-md-3"><div class="h3 fw-bold text-gradient mb-0" id="wc-chars">0</div><div class="small text-secondary">Characters</div></div>
        <div class="col-6 col-md-3"><div class="h3 fw-bold text-gradient mb-0" id="wc-sentences">0</div><div class="small text-secondary">Sentences</div></div>
        <div class="col-6 col-md-3"><div class="h3 fw-bold text-gradient mb-0" id="wc-read">0s</div><div class="small text-secondary">Read time</div></div>
      </div>`,
    steps: [
      { title: 'Paste Your Text', text: 'Type or paste any text into the box — an essay, article, caption or post.' },
      { title: 'See Live Counts', text: 'Words, characters, sentences and reading time update instantly as you type.' },
      { title: 'Hit Your Target', text: 'Use the counts to meet word limits for essays, SEO, tweets or meta descriptions.' },
      { title: 'Done', text: 'No saving needed — nothing is uploaded; it all runs in your browser.' }
    ],
    benefits: [
      { color: '#3b82f6', icon: 'bi-lightning-fill', title: 'Real-Time', text: 'Counts update the instant you type — no button, no lag.' },
      { color: '#f59e0b', icon: 'bi-shield-lock-fill', title: '100% Private', text: 'Your text stays in your browser and is never uploaded or stored.' },
      { color: '#10b981', icon: 'bi-clock-history', title: 'Reading Time', text: 'Estimates reading time so you know how long your content takes to read.' }
    ],
    faqs: [
      { q: 'How is reading time calculated?', a: 'Based on an average reading speed of about 200 words per minute.' },
      { q: 'Does it count characters with spaces?', a: 'The character count includes everything you type, spaces included.' },
      { q: 'Is my text saved or uploaded?', a: 'No — it stays entirely in your browser.' },
      { q: 'Is there a length limit?', a: 'No practical limit — paste as much text as you like.' }
    ]
  });
}

function getPDFPageNumbersContent() {
  return getUtilityContent({
    emoji: '🔢', title: 'Add Page Numbers to PDF', subtitle: 'Stamp page numbers onto your PDF — lossless, in your browser', whyTitle: 'Why Add Page Numbers Here?',
    useCases: [
      { icon: 'bi-file-earmark-text', title: 'Reports & Theses', text: 'Number long documents for easy reference and printing.' },
      { icon: 'bi-journal', title: 'Contracts', text: 'Add page numbers to legal docs so nothing goes missing.' },
      { icon: 'bi-printer', title: 'Print-ready PDFs', text: 'Prepare booklets and handouts with clear pagination.' },
      { icon: 'bi-collection', title: 'Merged PDFs', text: 'Re-number a combined PDF into one consistent sequence.' }
    ],
    bodyHtml: `
      <div id="dz-pdf-pagenum" class="dropzone text-center p-5" role="button" tabindex="0" style="cursor: pointer;">
        <div style="font-size: 2.5rem;">📄</div>
        <p class="fw-semibold mb-1 text-light">Drag &amp; drop your PDF here</p>
        <p class="small text-secondary mb-0">or click to browse</p>
        <input type="file" id="file-pdf-pagenum" class="d-none" accept="application/pdf">
      </div>
      <div id="status-pdf-pagenum" class="small text-secondary mt-2 text-center">No file selected</div>
      <div class="row g-3 mt-2">
        <div class="col-sm-6"><label class="form-label text-light small" for="pn-position">Position</label>
          <select id="pn-position" class="form-select"><option value="bottom-center" selected>Bottom center</option><option value="bottom-right">Bottom right</option><option value="bottom-left">Bottom left</option><option value="top-center">Top center</option><option value="top-right">Top right</option><option value="top-left">Top left</option></select></div>
        <div class="col-sm-6"><label class="form-label text-light small" for="pn-format">Format</label>
          <select id="pn-format" class="form-select"><option value="n" selected>1, 2, 3…</option><option value="page-n">Page 1, Page 2…</option><option value="n-of-total">1 of N</option></select></div>
        <div class="col-sm-6"><label class="form-label text-light small" for="pn-start">Start at</label><input id="pn-start" type="number" value="1" min="0" class="form-control"></div>
        <div class="col-sm-6"><label class="form-label text-light small" for="pn-size">Font size</label><input id="pn-size" type="number" value="11" min="6" max="40" class="form-control"></div>
      </div>
      <div class="text-center mt-4"><button id="btn-pdf-pagenum" class="btn btn-primary fw-bold" disabled><i class="bi bi-123 me-2"></i>Add Page Numbers</button></div>
      <div id="result-pdf-pagenum" class="mt-3 text-center"></div>`,
    steps: [
      { title: 'Upload your PDF', text: 'Drag and drop your PDF or click to browse — it stays on your device.' },
      { title: 'Choose Style', text: 'Pick the position, number format (1, "Page 1", or "1 of N"), starting number and size.' },
      { title: 'Stamp Numbers', text: 'Page numbers are added to every page losslessly — your text and images are untouched.' },
      { title: 'Download', text: 'Download your numbered PDF instantly.' }
    ],
    benefits: [
      { color: '#10b981', icon: 'bi-file-earmark-check', title: 'Lossless', text: 'Built on pdf-lib — your original text and images are preserved exactly; numbers are simply added.' },
      { color: '#f59e0b', icon: 'bi-shield-lock-fill', title: '100% Private', text: 'Your PDF never leaves your device — page numbers are added right in your browser.' },
      { color: '#3b82f6', icon: 'bi-sliders', title: 'Flexible', text: 'Control position, format, start number and font size to match your document.' }
    ],
    faqs: [
      { q: 'Does it change my PDF content?', a: 'No — it only adds page numbers on top; your existing text and images stay exactly as they were.' },
      { q: 'Is my PDF uploaded?', a: 'No — everything is processed locally in your browser.' },
      { q: 'Can I start numbering from a specific page value?', a: 'Yes — set the "Start at" number (e.g., start at 0 or any value).' },
      { q: 'What if my PDF is password-protected?', a: 'Remove the password first — encrypted PDFs can\'t be edited in the browser.' }
    ]
  });
}
