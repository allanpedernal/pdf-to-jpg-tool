// Tool content generators and implementations

function getPDFToJPGContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span style="font-size: 5rem;">📄</span>
        </div>
        <h1 class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PDF → JPG Converter
        </h1>
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordion">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="false" aria-controls="faq1" style="font-size: 1rem; padding: 1rem;">
                  How do I convert PDF to JPG?
                </button>
              </h2>
              <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your PDF file into the upload area, adjust the quality and scale settings if needed, then click 'Convert PDF to JPG'. The conversion happens instantly in your browser, and all JPG images will be downloaded as a ZIP file.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2" style="font-size: 1rem; padding: 1rem;">
                  Is my PDF file uploaded to a server?
                </button>
              </h2>
              <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your PDF files never leave your computer. All conversion happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What quality settings should I use?
                </button>
              </h2>
              <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Quality ranges from 0.1 (lowest, smallest file) to 1.0 (highest, largest file). For most purposes, 0.85 provides an excellent balance between quality and file size. Use 1.0 for maximum quality when file size isn't a concern, or lower values for smaller file sizes.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What does the scale setting do?
                </button>
              </h2>
              <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Scale controls the resolution of the output JPG images. 1.0 = original PDF size, 2.0 = double the resolution, 0.5 = half the resolution. Higher scale values produce larger, sharper images but also larger file sizes. Default is 1.6 for optimal quality.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq5" aria-expanded="false" aria-controls="faq5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I convert multi-page PDFs?
                </button>
              </h2>
              <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! Our PDF to JPG converter supports PDFs with any number of pages. Each page will be converted to a separate JPG image, and all images will be packaged in a single ZIP file for easy download.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq6" aria-expanded="false" aria-controls="faq6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PDFs you can convert. Convert as many PDFs to JPG as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq7" aria-expanded="false" aria-controls="faq7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faq7" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PDF to JPG converter works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq8" aria-expanded="false" aria-controls="faq8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  How long does conversion take?
                </button>
              </h2>
              <div id="faq8" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Conversion is nearly instantaneous! Since everything happens in your browser, there's no upload time or server processing delay. Most PDFs convert in just a few seconds, depending on the number of pages and your device's performance.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq9" aria-expanded="false" aria-controls="faq9" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What file format will I get?
                </button>
              </h2>
              <div id="faq9" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  You'll receive JPG (JPEG) image files. Each PDF page becomes a separate JPG file, and all files are packaged in a ZIP archive for convenient download. JPG is a widely supported image format compatible with all devices and software.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq10" aria-expanded="false" aria-controls="faq10" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I convert password-protected PDFs?
                </button>
              </h2>
              <div id="faq10" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Currently, password-protected PDFs cannot be converted. You'll need to remove the password protection from your PDF file first before converting it to JPG format.
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
            <span style="font-size: 4rem;">🖼️</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            JPG to PDF Converter
          </h1>
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
            <span class="text-secondary small">or click to browse files (JPG, JPEG, PNG)</span>
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
          <p id="log-jpg-pdf" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to convert your images</p>
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionJPG">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG1" aria-expanded="false" aria-controls="faqJPG1" style="font-size: 1rem; padding: 1rem;">
                  How do I convert JPG to PDF?
                </button>
              </h2>
              <div id="faqJPG1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your images into the upload area, select your preferred page size and orientation, then click 'Convert to PDF'. The conversion happens instantly in your browser, and your PDF file will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG2" aria-expanded="false" aria-controls="faqJPG2" style="font-size: 1rem; padding: 1rem;">
                  Are my images uploaded to a server?
                </button>
              </h2>
              <div id="faqJPG2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your images never leave your computer. All conversion happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG3" aria-expanded="false" aria-controls="faqJPG3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What image formats are supported?
                </button>
              </h2>
              <div id="faqJPG3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our JPG to PDF converter supports JPG, JPEG, and PNG image formats. You can convert multiple images at once, and each image will become a separate page in your PDF document.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG4" aria-expanded="false" aria-controls="faqJPG4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What page sizes are available?
                </button>
              </h2>
              <div id="faqJPG4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  You can choose from A4, Letter, Legal, or Fit to Image. The Fit to Image option will automatically adjust the PDF page size to match your image dimensions. You can also select Portrait or Landscape orientation.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG5" aria-expanded="false" aria-controls="faqJPG5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I convert multiple images at once?
                </button>
              </h2>
              <div id="faqJPG5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! You can select multiple images at once, and they will all be combined into a single PDF document. Each image will become a separate page in the PDF, maintaining the order you selected them.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG6" aria-expanded="false" aria-controls="faqJPG6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqJPG6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of images you can convert. Convert as many images to PDF as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG7" aria-expanded="false" aria-controls="faqJPG7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqJPG7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our JPG to PDF converter works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG8" aria-expanded="false" aria-controls="faqJPG8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  How long does conversion take?
                </button>
              </h2>
              <div id="faqJPG8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Conversion is nearly instantaneous! Since everything happens in your browser, there's no upload time or server processing delay. Most conversions complete in just a few seconds, depending on the number and size of images.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG9" aria-expanded="false" aria-controls="faqJPG9" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will image quality be preserved?
                </button>
              </h2>
              <div id="faqJPG9" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! The PDF conversion preserves the original image quality. Your images will look exactly the same in the PDF as they do in the original files. The quality depends on your original image files.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqJPG10" aria-expanded="false" aria-controls="faqJPG10" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I reorder images before converting?
                </button>
              </h2>
              <div id="faqJPG10" class="accordion-collapse collapse" data-bs-parent="#faqAccordionJPG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Currently, images are converted in the order you select them. To change the order, you can remove images from the preview and re-add them in your desired order, or select them in the order you want them to appear in the PDF.
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
            <span style="font-size: 4rem;">🗜️</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Compressor
          </h1>
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
          <p id="log-compress" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to compress your PDF</p>
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
            <span style="font-size: 4rem;">✂️</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Splitter
          </h1>
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
          <div class="d-flex gap-2 flex-wrap">
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
          <p id="log-split" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to split your PDF</p>
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
            <span style="font-size: 4rem;">🔗</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Merger
          </h1>
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
          <p id="log-merge" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to merge your PDFs</p>
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
            <span style="font-size: 4rem;">🔄</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Rotate
          </h1>
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
          <p id="log-rotate" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to rotate your PDF</p>
        </div>
      </div>
    </div>
  `;
}

function getPNGToJPGContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span style="font-size: 4rem;">🖼️</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PNG to JPG Converter
          </h1>
          <p class="text-light fs-5 mb-2 fw-medium">Convert PNG images to JPG format instantly</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-png-jpg" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-png-jpg" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PNG images here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-png-jpg" class="d-none" accept="image/png" multiple />
          </label>
        </div>
      </div>

      <!-- Image Preview Card -->
      <div id="image-preview-png-jpg" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <div class="row g-3" id="image-preview-grid-png-jpg"></div>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center align-items-end">
            <div class="card bg-dark-subtle border-0 shadow-sm p-3">
              <label class="form-label text-light small fw-medium mb-2">JPEG Quality</label>
              <input type="number" id="quality-png-jpg" min="0.1" max="1" step="0.1" value="0.9" class="form-control bg-dark text-light border-secondary w-auto" style="width: 120px;">
              <span class="form-text text-secondary mt-1 d-block">0.1 (low) - 1.0 (high)</span>
            </div>
            <div class="card bg-dark-subtle border-0 shadow-sm p-3">
              <label class="form-label text-light small fw-medium mb-2">Background Color</label>
              <input type="color" id="bgColor-png-jpg" value="#ffffff" class="form-control form-control-color w-auto" style="width: 60px; height: 40px;">
              <span class="form-text text-secondary mt-1 d-block">For transparent PNGs</span>
            </div>
            <div class="d-flex flex-column gap-2">
              <button id="convert-png-jpg" class="btn btn-primary fw-bold px-4 py-2">
                Convert to JPG
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
            <span id="status-png-jpg" class="small text-secondary">No images selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-png-jpg" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-png-jpg" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to convert your images</p>
        </div>
      </div>
    </div>
  `;
}

function getImageResizeContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span style="font-size: 4rem;">📏</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            Image Resizer
          </h1>
          <p class="text-light fs-5 mb-2 fw-medium">Resize images to any size instantly</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-resize" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-resize" class="text-light fw-semibold fs-5 mb-2">Drag & drop your images here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-resize" class="d-none" accept="image/*" multiple />
          </label>
        </div>
      </div>

      <!-- Image Preview Card -->
      <div id="image-preview-resize" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <div class="row g-3" id="image-preview-grid-resize"></div>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center align-items-end">
            <div class="card bg-dark-subtle border-0 shadow-sm p-3">
              <label class="form-label text-light small fw-medium mb-2">Width (px)</label>
              <input type="number" id="width-resize" placeholder="Auto" class="form-control bg-dark text-light border-secondary w-auto" style="width: 120px;">
            </div>
            <div class="card bg-dark-subtle border-0 shadow-sm p-3">
              <label class="form-label text-light small fw-medium mb-2">Height (px)</label>
              <input type="number" id="height-resize" placeholder="Auto" class="form-control bg-dark text-light border-secondary w-auto" style="width: 120px;">
            </div>
            <div class="card bg-dark-subtle border-0 shadow-sm p-3">
              <label class="form-label text-light small fw-medium mb-2">Maintain Aspect Ratio</label>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="aspect-resize" checked>
              </div>
            </div>
            <div class="d-flex flex-column gap-2">
              <button id="resize-btn" class="btn btn-primary fw-bold px-4 py-2">
                Resize Images
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
            <span id="status-resize" class="small text-secondary">No images selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-resize" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-resize" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to resize your images</p>
        </div>
      </div>
    </div>
  `;
}

function getImageCompressContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span style="font-size: 4rem;">🗜️</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            Image Compressor
          </h1>
          <p class="text-light fs-5 mb-2 fw-medium">Compress images to reduce file size</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-compress-img" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-compress-img" class="text-light fw-semibold fs-5 mb-2">Drag & drop your images here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-compress-img" class="d-none" accept="image/*" multiple />
          </label>
        </div>
      </div>

      <!-- Image Preview Card -->
      <div id="image-preview-compress-img" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <div class="row g-3" id="image-preview-grid-compress-img"></div>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center align-items-end">
            <div class="card bg-dark-subtle border-0 shadow-sm p-3">
              <label class="form-label text-light small fw-medium mb-2">Quality</label>
              <input type="range" id="quality-compress-img" min="0.1" max="1" step="0.1" value="0.8" class="form-range" style="width: 200px;">
              <span class="form-text text-secondary mt-1 d-block" id="quality-value-compress-img">0.8</span>
            </div>
            <div class="d-flex flex-column gap-2">
              <button id="compress-img-btn" class="btn btn-primary fw-bold px-4 py-2">
                Compress Images
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
            <span id="status-compress-img" class="small text-secondary">No images selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-compress-img" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-compress-img" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to compress your images</p>
        </div>
      </div>
    </div>
  `;
}

function getPDFUnlockContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span style="font-size: 4rem;">🔓</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Unlock
          </h1>
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
          <p id="log-unlock" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to unlock your PDF</p>
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
            <span style="font-size: 4rem;">🔒</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF Protect
          </h1>
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
          <p id="log-protect" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to protect your PDF</p>
        </div>
      </div>
    </div>
  `;
}

function getPDFOCRContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span style="font-size: 4rem;">👁️</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF OCR
          </h1>
          <p class="text-light fs-5 mb-2 fw-medium">Extract text from PDF images using OCR</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-ocr" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-ocr" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-ocr" class="d-none" accept="application/pdf" />
          </label>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center align-items-end">
            <div class="card bg-dark-subtle border-0 shadow-sm p-3">
              <label class="form-label text-light small fw-medium mb-2">Language</label>
              <select id="language-ocr" class="form-select form-select-sm bg-dark text-light border-secondary">
                <option value="eng">English</option>
                <option value="spa">Spanish</option>
                <option value="fra">French</option>
                <option value="deu">German</option>
                <option value="chi_sim">Chinese (Simplified)</option>
              </select>
            </div>
            <div class="d-flex flex-column gap-2">
              <button id="ocr-btn" class="btn btn-primary fw-bold px-4 py-2">
                Extract Text
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
            <span id="status-ocr" class="small text-secondary">No file selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-ocr" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-ocr" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to extract text from your PDF</p>
        </div>
      </div>

      <!-- Text Result Card -->
      <div id="text-result-ocr" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h3 class="fs-5 fw-semibold text-light mb-0">Extracted Text</h3>
            <button id="copy-text-ocr" class="btn btn-primary btn-sm">Copy</button>
          </div>
          <textarea id="extracted-text-ocr" class="form-control bg-dark text-light border-secondary" rows="16" readonly></textarea>
        </div>
      </div>
    </div>
  `;
}

function getPDFToWordContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span style="font-size: 4rem;">📝</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            PDF to Word
          </h1>
          <p class="text-light fs-5 mb-2 fw-medium">Convert PDF documents to Word format</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-pdf-word" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-pdf-word" class="text-light fw-semibold fs-5 mb-2">Drag & drop your PDF here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-pdf-word" class="d-none" accept="application/pdf" />
          </label>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <button id="convert-pdf-word" class="btn btn-primary fw-bold px-4 py-2">
              Convert to Word
            </button>
          </div>
        </div>
      </div>

      <!-- Progress Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="text-light fw-medium">Status</span>
            <span id="status-pdf-word" class="small text-secondary">No file selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-pdf-word" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-pdf-word" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to convert your PDF</p>
        </div>
      </div>
    </div>
  `;
}

function getWordToPDFContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span style="font-size: 4rem;">📄</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            Word to PDF
          </h1>
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
          <p id="log-word-pdf" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to convert your Word document</p>
        </div>
      </div>
    </div>
  `;
}

function getHEICToJPGContent() {
  return `
    <div class="w-100">
      <!-- Header Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body text-center py-5">
          <div class="mb-3">
            <span style="font-size: 4rem;">📷</span>
          </div>
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 2.5rem; line-height: 1.2;">
            HEIC to JPG Converter
          </h1>
          <p class="text-light fs-5 mb-2 fw-medium">Convert HEIC images to JPG format instantly</p>
          <p class="text-secondary small mb-0">Free • Fast • No Upload Required • 100% Secure</p>
        </div>
      </div>
      
      <!-- Dropzone Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-0">
          <label class="dropzone w-100 border border-2 border-dashed rounded px-3 px-md-5 py-5 d-flex flex-column align-items-center justify-content-center mb-0" 
                 id="dropzone-heic-jpg" 
                 style="min-height: 200px;">
            <div class="mb-3">
              <i class="bi bi-cloud-upload text-primary" style="font-size: 3.5rem;"></i>
            </div>
            <span id="dropLabel-heic-jpg" class="text-light fw-semibold fs-5 mb-2">Drag & drop your HEIC images here</span>
            <span class="text-secondary small">or click to browse files</span>
            <input type="file" id="file-heic-jpg" class="d-none" accept="image/heic,image/heif,.heic,.heif" multiple />
          </label>
        </div>
      </div>

      <!-- Image Preview Card -->
      <div id="image-preview-heic-jpg" class="card border-0 shadow-sm mb-4 d-none">
        <div class="card-body">
          <div class="row g-3" id="image-preview-grid-heic-jpg"></div>
        </div>
      </div>

      <!-- Controls Card -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="d-flex flex-wrap gap-3 justify-content-center align-items-end">
            <div class="card bg-dark-subtle border-0 shadow-sm p-3">
              <label class="form-label text-light small fw-medium mb-2">JPEG Quality</label>
              <input type="number" id="quality-heic-jpg" min="0.1" max="1" step="0.1" value="0.9" class="form-control bg-dark text-light border-secondary w-auto" style="width: 120px;">
              <span class="form-text text-secondary mt-1 d-block">0.1 (low) - 1.0 (high)</span>
            </div>
            <div class="d-flex flex-column gap-2">
              <button id="convert-heic-jpg" class="btn btn-primary fw-bold px-4 py-2">
                Convert to JPG
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
            <span id="status-heic-jpg" class="small text-secondary">No images selected</span>
          </div>
          <div class="progress" style="height: 0.5rem;">
            <div id="progress-heic-jpg" class="progress-bar" role="progressbar" style="width: 0%;"></div>
          </div>
          <p id="log-heic-jpg" class="small text-light text-center mt-3 mb-0" style="min-height: 32px;">✨ Ready to convert your HEIC images</p>
        </div>
      </div>
    </div>
  `;
}


