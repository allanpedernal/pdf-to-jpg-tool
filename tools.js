// Tool content generators and implementations

function getPDFToPNGContent() {
  return `
    <div class="w-100">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <div class="mb-4">
          <span class="emoji-document" style="font-size: 5rem;">🖼️</span>
        </div>
        <h1 class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PDF → PNG Converter
        </h1>
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
            <span class="emoji-document-pages" style="font-size: 4rem;">📑</span>
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
            <span class="emoji-compressor" style="font-size: 4rem;">🗜️</span>
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionCompress">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompress1" aria-expanded="false" aria-controls="faqCompress1" style="font-size: 1rem; padding: 1rem;">
                  How do I compress a PDF?
                </button>
              </h2>
              <div id="faqCompress1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompress">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your PDF file into the upload area, select your preferred compression level, then click 'Compress PDF'. The compression happens instantly in your browser, and your compressed PDF will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompress2" aria-expanded="false" aria-controls="faqCompress2" style="font-size: 1rem; padding: 1rem;">
                  Is my PDF file uploaded to a server?
                </button>
              </h2>
              <div id="faqCompress2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompress">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your PDF files never leave your computer. All compression happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompress3" aria-expanded="false" aria-controls="faqCompress3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What compression level should I use?
                </button>
              </h2>
              <div id="faqCompress3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompress">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  High Compression (0.3) provides maximum size reduction but may slightly reduce image quality. Medium Compression (0.5) offers a good balance between file size and quality. Low Compression (0.7) maintains better quality with moderate size reduction. Choose based on your needs.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompress4" aria-expanded="false" aria-controls="faqCompress4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will compression affect PDF quality?
                </button>
              </h2>
              <div id="faqCompress4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompress">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Compression reduces file size by optimizing images within the PDF. Higher compression may result in slightly lower image quality, but text and overall readability remain intact. Use Medium or Low compression for better quality preservation.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompress5" aria-expanded="false" aria-controls="faqCompress5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  How much can I reduce the file size?
                </button>
              </h2>
              <div id="faqCompress5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompress">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  File size reduction depends on your PDF content. PDFs with many images typically see 30-70% reduction. Text-heavy PDFs may see less reduction. The tool shows you the exact savings percentage after compression.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompress6" aria-expanded="false" aria-controls="faqCompress6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqCompress6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompress">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PDFs you can compress. Compress as many PDFs as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompress7" aria-expanded="false" aria-controls="faqCompress7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqCompress7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompress">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PDF compressor works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompress8" aria-expanded="false" aria-controls="faqCompress8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I compress password-protected PDFs?
                </button>
              </h2>
              <div id="faqCompress8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompress">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Currently, password-protected PDFs cannot be compressed. You'll need to remove the password protection from your PDF file first before compressing it.
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionSplit">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqSplit1" aria-expanded="false" aria-controls="faqSplit1" style="font-size: 1rem; padding: 1rem;">
                  How do I split a PDF?
                </button>
              </h2>
              <div id="faqSplit1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSplit">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your PDF file into the upload area. Once loaded, you can either click "Split All Pages" to split every page into separate PDFs, or select specific pages and click "Extract Selected Pages". All pages will be packaged in a ZIP file for download.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqSplit2" aria-expanded="false" aria-controls="faqSplit2" style="font-size: 1rem; padding: 1rem;">
                  Is my PDF file uploaded to a server?
                </button>
              </h2>
              <div id="faqSplit2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSplit">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your PDF files never leave your computer. All splitting happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqSplit3" aria-expanded="false" aria-controls="faqSplit3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I select multiple pages to extract?
                </button>
              </h2>
              <div id="faqSplit3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSplit">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! Click on individual page numbers to select them. Selected pages will be highlighted. You can also use "Select All" or "Select None" buttons for quick selection. Only selected pages will be extracted into separate PDF files.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqSplit4" aria-expanded="false" aria-controls="faqSplit4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What format will I receive?
                </button>
              </h2>
              <div id="faqSplit4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSplit">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Each page becomes a separate PDF file, and all files are packaged in a ZIP archive. The ZIP file will be automatically downloaded. Extract the ZIP to access individual PDF files for each page.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqSplit5" aria-expanded="false" aria-controls="faqSplit5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will the page quality be preserved?
                </button>
              </h2>
              <div id="faqSplit5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSplit">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! The split PDFs maintain the original quality of your pages. Text, images, and formatting are preserved exactly as they appear in the original document.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqSplit6" aria-expanded="false" aria-controls="faqSplit6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqSplit6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSplit">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PDFs you can split. Split as many PDFs as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqSplit7" aria-expanded="false" aria-controls="faqSplit7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqSplit7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSplit">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PDF splitter works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqSplit8" aria-expanded="false" aria-controls="faqSplit8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I split password-protected PDFs?
                </button>
              </h2>
              <div id="faqSplit8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionSplit">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Currently, password-protected PDFs cannot be split. You'll need to remove the password protection from your PDF file first before splitting it.
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionMerge">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqMerge1" aria-expanded="false" aria-controls="faqMerge1" style="font-size: 1rem; padding: 1rem;">
                  How do I merge PDFs?
                </button>
              </h2>
              <div id="faqMerge1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionMerge">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop multiple PDF files into the upload area, or click to browse and select multiple PDF files. Review the list of files, then click "Merge PDFs". All PDFs will be combined into a single document in the order they appear in the list.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqMerge2" aria-expanded="false" aria-controls="faqMerge2" style="font-size: 1rem; padding: 1rem;">
                  Are my PDF files uploaded to a server?
                </button>
              </h2>
              <div id="faqMerge2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionMerge">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your PDF files never leave your computer. All merging happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqMerge3" aria-expanded="false" aria-controls="faqMerge3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  How many PDFs can I merge at once?
                </button>
              </h2>
              <div id="faqMerge3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionMerge">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  You can merge as many PDF files as you need. There's no limit on the number of files or pages. However, very large merges may take longer to process depending on your device's performance.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqMerge4" aria-expanded="false" aria-controls="faqMerge4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I change the order of PDFs before merging?
                </button>
              </h2>
              <div id="faqMerge4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionMerge">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! You can remove PDFs from the list and re-add them in your desired order. The PDFs will be merged in the order they appear in the list from top to bottom.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqMerge5" aria-expanded="false" aria-controls="faqMerge5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will the quality be preserved?
                </button>
              </h2>
              <div id="faqMerge5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionMerge">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! The merged PDF maintains the original quality of all pages. Text, images, and formatting are preserved exactly as they appear in the original documents.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqMerge6" aria-expanded="false" aria-controls="faqMerge6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqMerge6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionMerge">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PDFs you can merge. Merge as many PDFs as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqMerge7" aria-expanded="false" aria-controls="faqMerge7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqMerge7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionMerge">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PDF merger works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqMerge8" aria-expanded="false" aria-controls="faqMerge8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I merge password-protected PDFs?
                </button>
              </h2>
              <div id="faqMerge8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionMerge">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Currently, password-protected PDFs cannot be merged. You'll need to remove the password protection from your PDF files first before merging them.
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionRotate">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqRotate1" aria-expanded="false" aria-controls="faqRotate1" style="font-size: 1rem; padding: 1rem;">
                  How do I rotate a PDF?
                </button>
              </h2>
              <div id="faqRotate1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionRotate">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your PDF file into the upload area. Once loaded, select which pages to rotate (all pages are selected by default), choose your rotation angle (90° clockwise, 180°, or 90° counter-clockwise), then click "Rotate PDF". Your rotated PDF will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqRotate2" aria-expanded="false" aria-controls="faqRotate2" style="font-size: 1rem; padding: 1rem;">
                  Is my PDF file uploaded to a server?
                </button>
              </h2>
              <div id="faqRotate2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionRotate">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your PDF files never leave your computer. All rotation happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqRotate3" aria-expanded="false" aria-controls="faqRotate3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I rotate only specific pages?
                </button>
              </h2>
              <div id="faqRotate3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionRotate">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! Click on page numbers to select or deselect them. Selected pages will be highlighted. Only the selected pages will be rotated, while unselected pages remain in their original orientation.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqRotate4" aria-expanded="false" aria-controls="faqRotate4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What rotation angles are available?
                </button>
              </h2>
              <div id="faqRotate4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionRotate">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  You can rotate pages by 90° clockwise, 180° (upside down), or 90° counter-clockwise. These angles cover all common orientation corrections needed for PDF documents.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqRotate5" aria-expanded="false" aria-controls="faqRotate5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will the page quality be preserved?
                </button>
              </h2>
              <div id="faqRotate5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionRotate">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! The rotated PDF maintains the original quality of your pages. Text, images, and formatting are preserved exactly as they appear in the original document.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqRotate6" aria-expanded="false" aria-controls="faqRotate6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqRotate6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionRotate">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PDFs you can rotate. Rotate as many PDFs as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqRotate7" aria-expanded="false" aria-controls="faqRotate7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqRotate7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionRotate">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PDF rotator works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqRotate8" aria-expanded="false" aria-controls="faqRotate8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I rotate password-protected PDFs?
                </button>
              </h2>
              <div id="faqRotate8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionRotate">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Currently, password-protected PDFs cannot be rotated. You'll need to remove the password protection from your PDF file first before rotating it.
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
        <h1 class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PNG → JPG Converter
        </h1>
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionPNG">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPNG1" aria-expanded="false" aria-controls="faqPNG1" style="font-size: 1rem; padding: 1rem;">
                  How do I convert PNG to JPG?
                </button>
              </h2>
              <div id="faqPNG1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPNG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your PNG images into the upload area, adjust the JPEG quality and background color settings if needed, then click 'Convert to JPG'. The conversion happens instantly in your browser, and all JPG images will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPNG2" aria-expanded="false" aria-controls="faqPNG2" style="font-size: 1rem; padding: 1rem;">
                  Are my images uploaded to a server?
                </button>
              </h2>
              <div id="faqPNG2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPNG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your images never leave your computer. All conversion happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPNG3" aria-expanded="false" aria-controls="faqPNG3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What about transparent PNGs?
                </button>
              </h2>
              <div id="faqPNG3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPNG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  JPG format doesn't support transparency. When converting transparent PNGs, you can choose a background color to fill the transparent areas. The default is white, but you can select any color using the color picker.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPNG4" aria-expanded="false" aria-controls="faqPNG4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What quality setting should I use?
                </button>
              </h2>
              <div id="faqPNG4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPNG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Quality ranges from 0.1 (lowest, smallest file) to 1.0 (highest, largest file). For most purposes, 0.9 provides an excellent balance between quality and file size. Use 1.0 for maximum quality when file size isn't a concern, or lower values for smaller file sizes.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPNG5" aria-expanded="false" aria-controls="faqPNG5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I convert multiple PNGs at once?
                </button>
              </h2>
              <div id="faqPNG5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPNG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! You can select multiple PNG files at once, and they will all be converted to JPG format. Each PNG becomes a separate JPG file, and all files will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPNG6" aria-expanded="false" aria-controls="faqPNG6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqPNG6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPNG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PNGs you can convert. Convert as many PNGs to JPG as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPNG7" aria-expanded="false" aria-controls="faqPNG7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqPNG7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPNG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PNG to JPG converter works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPNG8" aria-expanded="false" aria-controls="faqPNG8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will image quality be preserved?
                </button>
              </h2>
              <div id="faqPNG8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPNG">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Image quality depends on the quality setting you choose. Higher quality settings (0.9-1.0) preserve more detail but create larger files. Lower quality settings (0.1-0.5) create smaller files but may reduce image quality. The default 0.9 provides excellent quality for most uses.
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
        <h1 class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          Image Resizer
        </h1>
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionResize">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqResize1" aria-expanded="false" aria-controls="faqResize1" style="font-size: 1rem; padding: 1rem;">
                  How do I resize images?
                </button>
              </h2>
              <div id="faqResize1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionResize">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your images into the upload area, enter your desired width and/or height in pixels, choose whether to maintain aspect ratio, then click "Resize Images". The resized images will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqResize2" aria-expanded="false" aria-controls="faqResize2" style="font-size: 1rem; padding: 1rem;">
                  Are my images uploaded to a server?
                </button>
              </h2>
              <div id="faqResize2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionResize">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your images never leave your computer. All resizing happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqResize3" aria-expanded="false" aria-controls="faqResize3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What does "Maintain Aspect Ratio" mean?
                </button>
              </h2>
              <div id="faqResize3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionResize">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  When enabled, the image proportions are maintained. If you set width to 800px, the height will automatically adjust to keep the original aspect ratio. This prevents images from appearing stretched or distorted.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqResize4" aria-expanded="false" aria-controls="faqResize4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I resize multiple images at once?
                </button>
              </h2>
              <div id="faqResize4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionResize">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! You can select multiple images at once, and they will all be resized to the same dimensions. Each resized image will be downloaded as a separate file.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqResize5" aria-expanded="false" aria-controls="faqResize5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will image quality be preserved?
                </button>
              </h2>
              <div id="faqResize5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionResize">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Resizing maintains good image quality. However, enlarging images beyond their original size may result in some quality loss. For best results, resize to smaller dimensions or maintain the original size.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqResize6" aria-expanded="false" aria-controls="faqResize6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqResize6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionResize">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of images you can resize. Resize as many images as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqResize7" aria-expanded="false" aria-controls="faqResize7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What image formats are supported?
                </button>
              </h2>
              <div id="faqResize7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionResize">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our image resizer supports all common image formats including JPG, JPEG, PNG, GIF, BMP, and WebP. You can resize any image format supported by your browser.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqResize8" aria-expanded="false" aria-controls="faqResize8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqResize8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionResize">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our image resizer works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
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
        <h1 class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          Image Compressor
        </h1>
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionCompressImg">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompressImg1" aria-expanded="false" aria-controls="faqCompressImg1" style="font-size: 1rem; padding: 1rem;">
                  How do I compress images?
                </button>
              </h2>
              <div id="faqCompressImg1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompressImg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your images into the upload area, adjust the quality slider to your preferred compression level, then click "Compress Images". The compressed images will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompressImg2" aria-expanded="false" aria-controls="faqCompressImg2" style="font-size: 1rem; padding: 1rem;">
                  Are my images uploaded to a server?
                </button>
              </h2>
              <div id="faqCompressImg2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompressImg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your images never leave your computer. All compression happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompressImg3" aria-expanded="false" aria-controls="faqCompressImg3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What quality setting should I use?
                </button>
              </h2>
              <div id="faqCompressImg3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompressImg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Quality ranges from 0.1 (maximum compression, smallest file) to 1.0 (minimum compression, largest file). For most purposes, 0.8 provides an excellent balance between file size and quality. Use higher values for better quality or lower values for smaller files.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompressImg4" aria-expanded="false" aria-controls="faqCompressImg4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will compression affect image quality?
                </button>
              </h2>
              <div id="faqCompressImg4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompressImg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Compression reduces file size by optimizing image data. Higher compression (lower quality values) may result in slightly lower visual quality, but the difference is often minimal. Use quality 0.8 or higher for best results.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompressImg5" aria-expanded="false" aria-controls="faqCompressImg5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I compress multiple images at once?
                </button>
              </h2>
              <div id="faqCompressImg5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompressImg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! You can select multiple images at once, and they will all be compressed using the same quality setting. Each compressed image will be downloaded as a separate file.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompressImg6" aria-expanded="false" aria-controls="faqCompressImg6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqCompressImg6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompressImg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of images you can compress. Compress as many images as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompressImg7" aria-expanded="false" aria-controls="faqCompressImg7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What image formats are supported?
                </button>
              </h2>
              <div id="faqCompressImg7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompressImg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our image compressor supports all common image formats including JPG, JPEG, PNG, GIF, BMP, and WebP. You can compress any image format supported by your browser.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqCompressImg8" aria-expanded="false" aria-controls="faqCompressImg8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqCompressImg8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionCompressImg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our image compressor works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionUnlock">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqUnlock1" aria-expanded="false" aria-controls="faqUnlock1" style="font-size: 1rem; padding: 1rem;">
                  How do I unlock a PDF?
                </button>
              </h2>
              <div id="faqUnlock1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionUnlock">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your password-protected PDF file into the upload area, enter the password when prompted, then click "Unlock PDF". The unlocked PDF will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqUnlock2" aria-expanded="false" aria-controls="faqUnlock2" style="font-size: 1rem; padding: 1rem;">
                  Is my PDF file uploaded to a server?
                </button>
              </h2>
              <div id="faqUnlock2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionUnlock">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your PDF files never leave your computer. All unlocking happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqUnlock3" aria-expanded="false" aria-controls="faqUnlock3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I unlock a PDF without the password?
                </button>
              </h2>
              <div id="faqUnlock3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionUnlock">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No. This tool requires the password to unlock the PDF. It removes password protection from PDFs you already have access to, enabling editing, printing, and copying.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqUnlock4" aria-expanded="false" aria-controls="faqUnlock4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will unlocking affect the PDF content?
                </button>
              </h2>
              <div id="faqUnlock4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionUnlock">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No. Unlocking only removes password protection and restrictions. All content, formatting, images, and text remain exactly the same. The PDF is identical except it's no longer password-protected.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqUnlock5" aria-expanded="false" aria-controls="faqUnlock5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqUnlock5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionUnlock">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PDFs you can unlock. Unlock as many PDFs as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqUnlock6" aria-expanded="false" aria-controls="faqUnlock6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqUnlock6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionUnlock">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PDF unlocker works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionProtect">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqProtect1" aria-expanded="false" aria-controls="faqProtect1" style="font-size: 1rem; padding: 1rem;">
                  How do I protect a PDF with a password?
                </button>
              </h2>
              <div id="faqProtect1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionProtect">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your PDF file into the upload area, enter a password and confirm it, then click "Protect PDF". The protected PDF will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqProtect2" aria-expanded="false" aria-controls="faqProtect2" style="font-size: 1rem; padding: 1rem;">
                  Is my PDF file uploaded to a server?
                </button>
              </h2>
              <div id="faqProtect2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionProtect">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your PDF files never leave your computer. All protection happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqProtect3" aria-expanded="false" aria-controls="faqProtect3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What type of password protection is applied?
                </button>
              </h2>
              <div id="faqProtect3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionProtect">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  The tool uses RC4 128-bit encryption to protect your PDF with a password. The encrypted PDF will require the password to open, view, edit, print, or copy. The encryption happens entirely in your browser - your PDF never leaves your computer.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqProtect4" aria-expanded="false" aria-controls="faqProtect4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I protect multiple PDFs at once?
                </button>
              </h2>
              <div id="faqProtect4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionProtect">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Currently, you can protect one PDF at a time. Process each PDF file individually to ensure proper password protection for each document.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqProtect5" aria-expanded="false" aria-controls="faqProtect5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will the PDF content be preserved?
                </button>
              </h2>
              <div id="faqProtect5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionProtect">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! All content, formatting, images, and text are preserved exactly as they appear in the original document. The protected PDF maintains the same quality and appearance.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqProtect6" aria-expanded="false" aria-controls="faqProtect6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqProtect6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionProtect">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PDFs you can protect. Protect as many PDFs as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqProtect7" aria-expanded="false" aria-controls="faqProtect7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqProtect7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionProtect">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PDF protector works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqProtect8" aria-expanded="false" aria-controls="faqProtect8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I remove password protection later?
                </button>
              </h2>
              <div id="faqProtect8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionProtect">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! You can use our PDF Unlock tool to remove password protection from PDFs you have access to. Simply provide the password to unlock the PDF.
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
        <h1 class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PDF OCR
        </h1>
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionOCR">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqOCR1" aria-expanded="false" aria-controls="faqOCR1" style="font-size: 1rem; padding: 1rem;">
                  How do I extract text from a PDF?
                </button>
              </h2>
              <div id="faqOCR1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionOCR">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your PDF file into the upload area, select the language of the text, then click "Extract Text". The OCR engine will process each page and extract all text, which will be displayed in the text area below.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqOCR2" aria-expanded="false" aria-controls="faqOCR2" style="font-size: 1rem; padding: 1rem;">
                  Is my PDF file uploaded to a server?
                </button>
              </h2>
              <div id="faqOCR2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionOCR">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your PDF files never leave your computer. All OCR processing happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqOCR3" aria-expanded="false" aria-controls="faqOCR3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What types of PDFs can OCR extract text from?
                </button>
              </h2>
              <div id="faqOCR3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionOCR">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  OCR works best with scanned PDFs and image-based PDFs. PDFs that already have selectable text layers may not need OCR, but you can still use this tool to extract all text in one place. The accuracy depends on image quality and text clarity.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqOCR4" aria-expanded="false" aria-controls="faqOCR4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  How accurate is the OCR?
                </button>
              </h2>
              <div id="faqOCR4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionOCR">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  OCR accuracy depends on several factors: image quality, text clarity, font size, and language. High-quality scans with clear, printed text typically achieve 95%+ accuracy. Handwritten text or low-quality images may have lower accuracy. Selecting the correct language improves results.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqOCR5" aria-expanded="false" aria-controls="faqOCR5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I extract text from multi-page PDFs?
                </button>
              </h2>
              <div id="faqOCR5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionOCR">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! Our PDF OCR tool supports PDFs with any number of pages. Each page is processed sequentially, and all extracted text is combined and displayed in the text area, with page separators to help you identify which text came from which page.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqOCR6" aria-expanded="false" aria-controls="faqOCR6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqOCR6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionOCR">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PDFs you can process. Extract text from unlimited PDFs completely free.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqOCR7" aria-expanded="false" aria-controls="faqOCR7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqOCR7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionOCR">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PDF OCR tool works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqOCR8" aria-expanded="false" aria-controls="faqOCR8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  How long does OCR processing take?
                </button>
              </h2>
              <div id="faqOCR8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionOCR">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Processing time depends on the number of pages and your device's performance. Most single-page PDFs process in a few seconds. Multi-page PDFs may take longer, but you'll see progress updates as each page is processed. Since everything happens in your browser, there's no upload delay.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqOCR9" aria-expanded="false" aria-controls="faqOCR9" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I extract text from password-protected PDFs?
                </button>
              </h2>
              <div id="faqOCR9" class="accordion-collapse collapse" data-bs-parent="#faqAccordionOCR">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Currently, password-protected PDFs cannot be processed. You'll need to remove the password protection from your PDF file first before using OCR to extract text.
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
        <h1 class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          PDF → Word Converter
        </h1>
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionPDFWord">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord1" aria-expanded="false" aria-controls="faqPDFWord1" style="font-size: 1rem; padding: 1rem;">
                  How do I convert PDF to Word?
                </button>
              </h2>
              <div id="faqPDFWord1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your PDF file into the upload area, then click 'Convert PDF to Word'. The conversion happens instantly in your browser, and your Word document will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord2" aria-expanded="false" aria-controls="faqPDFWord2" style="font-size: 1rem; padding: 1rem;">
                  Is my PDF file uploaded to a server?
                </button>
              </h2>
              <div id="faqPDFWord2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your PDF files never leave your computer. All conversion happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord3" aria-expanded="false" aria-controls="faqPDFWord3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What file format will I get?
                </button>
              </h2>
              <div id="faqPDFWord3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  You'll receive a Word document (.doc file) that can be opened in Microsoft Word, Google Docs, LibreOffice, and other word processors. The document contains the extracted text from your PDF with basic formatting preserved.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord4" aria-expanded="false" aria-controls="faqPDFWord4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will formatting be preserved?
                </button>
              </h2>
              <div id="faqPDFWord4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Basic text formatting and structure are preserved, but complex layouts, images, and advanced formatting may require manual adjustment. The tool extracts text content and converts it to a Word document format.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord5" aria-expanded="false" aria-controls="faqPDFWord5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I convert multi-page PDFs?
                </button>
              </h2>
              <div id="faqPDFWord5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! Our PDF to Word converter supports PDFs with any number of pages. All pages will be converted into a single Word document with page breaks between pages.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord6" aria-expanded="false" aria-controls="faqPDFWord6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqPDFWord6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of PDFs you can convert. Convert as many PDFs to Word as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord7" aria-expanded="false" aria-controls="faqPDFWord7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqPDFWord7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our PDF to Word converter works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord8" aria-expanded="false" aria-controls="faqPDFWord8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  How long does conversion take?
                </button>
              </h2>
              <div id="faqPDFWord8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Conversion is nearly instantaneous! Since everything happens in your browser, there's no upload time or server processing delay. Most PDFs convert in just a few seconds, depending on the number of pages and your device's performance.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord9" aria-expanded="false" aria-controls="faqPDFWord9" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I convert scanned PDFs?
                </button>
              </h2>
              <div id="faqPDFWord9" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Scanned PDFs (image-based PDFs) require OCR (Optical Character Recognition) to extract text. For scanned PDFs, please use our PDF OCR tool first to extract text, then convert that text to Word format.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqPDFWord10" aria-expanded="false" aria-controls="faqPDFWord10" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I convert password-protected PDFs?
                </button>
              </h2>
              <div id="faqPDFWord10" class="accordion-collapse collapse" data-bs-parent="#faqAccordionPDFWord">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Currently, password-protected PDFs cannot be converted. You'll need to remove the password protection from your PDF file first before converting it to Word format.
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
        <h1 class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
          HEIC to JPG Converter
        </h1>
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

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-5">
        <div class="card-body p-4 p-lg-5">
          <h2 class="text-gradient fw-bold mb-5 text-center" style="font-size: 2.5rem; font-weight: 700;">
            <i class="bi bi-question-circle me-2"></i>Frequently Asked Questions
          </h2>
          <div class="accordion accordion-flush" id="faqAccordionHeicJpg">
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqHeicJpg1" aria-expanded="false" aria-controls="faqHeicJpg1" style="font-size: 1rem; padding: 1rem;">
                  How do I convert HEIC to JPG?
                </button>
              </h2>
              <div id="faqHeicJpg1" class="accordion-collapse collapse" data-bs-parent="#faqAccordionHeicJpg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Simply drag and drop your HEIC images into the upload area, adjust the quality slider if needed, then click "Convert to JPG". The converted JPG images will be automatically downloaded.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqHeicJpg2" aria-expanded="false" aria-controls="faqHeicJpg2" style="font-size: 1rem; padding: 1rem;">
                  Are my images uploaded to a server?
                </button>
              </h2>
              <div id="faqHeicJpg2" class="accordion-collapse collapse" data-bs-parent="#faqAccordionHeicJpg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  No! Your images never leave your computer. All conversion happens locally in your browser using JavaScript, ensuring complete privacy and security. No uploads, no server storage, no data transmission.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqHeicJpg3" aria-expanded="false" aria-controls="faqHeicJpg3" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What quality setting should I use?
                </button>
              </h2>
              <div id="faqHeicJpg3" class="accordion-collapse collapse" data-bs-parent="#faqAccordionHeicJpg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Quality ranges from 0.1 (maximum compression, smallest file) to 1.0 (minimum compression, largest file). For most purposes, 0.9 provides an excellent balance between file size and quality. Use higher values for better quality or lower values for smaller files.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqHeicJpg4" aria-expanded="false" aria-controls="faqHeicJpg4" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Will image quality be preserved?
                </button>
              </h2>
              <div id="faqHeicJpg4" class="accordion-collapse collapse" data-bs-parent="#faqAccordionHeicJpg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! With quality set to 0.9 or higher, the converted JPG images will maintain excellent visual quality. The conversion process preserves colors, details, and overall image appearance.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqHeicJpg5" aria-expanded="false" aria-controls="faqHeicJpg5" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Can I convert multiple HEIC images at once?
                </button>
              </h2>
              <div id="faqHeicJpg5" class="accordion-collapse collapse" data-bs-parent="#faqAccordionHeicJpg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes! You can select multiple HEIC images at once, and they will all be converted to JPG format. Each converted image will be downloaded as a separate file.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqHeicJpg6" aria-expanded="false" aria-controls="faqHeicJpg6" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Is this service free?
                </button>
              </h2>
              <div id="faqHeicJpg6" class="accordion-collapse collapse" data-bs-parent="#faqAccordionHeicJpg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Yes, completely free! There are no hidden costs, no subscriptions, no watermarks, and no limits on the number of images you can convert. Convert as many HEIC images as you need, whenever you need.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqHeicJpg7" aria-expanded="false" aria-controls="faqHeicJpg7" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  What browsers are supported?
                </button>
              </h2>
              <div id="faqHeicJpg7" class="accordion-collapse collapse" data-bs-parent="#faqAccordionHeicJpg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  Our HEIC to JPG converter works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It also works on mobile browsers. No plugins or extensions are required.
                </div>
              </div>
            </div>
            <div class="accordion-item border-secondary mb-3 rounded faq-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faqHeicJpg8" aria-expanded="false" aria-controls="faqHeicJpg8" style="background-color: transparent; border: none; font-size: 1rem; padding: 1rem;">
                  Why convert HEIC to JPG?
                </button>
              </h2>
              <div id="faqHeicJpg8" class="accordion-collapse collapse" data-bs-parent="#faqAccordionHeicJpg">
                <div class="accordion-body" style="font-size: 0.95rem; line-height: 1.6; padding: 1rem;">
                  HEIC (High Efficiency Image Container) is a format used by Apple devices, but it's not widely supported on other platforms. Converting to JPG ensures your images can be viewed and shared on any device, platform, or software application.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}


