// Tool content generators and implementations

function getPDFToJPGContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">📄</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF to JPG Converter
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Convert PDF pages to JPG images instantly</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-pdf-jpg">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-pdf-jpg" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your PDF here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-pdf-jpg" class="hidden" accept="application/pdf" />
      </label>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">JPEG Quality</label>
          <input type="number" id="quality-pdf-jpg" min="0.1" max="1" step="0.1" value="0.85" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32">
          <span class="text-xs text-slate-400 mt-1 block">0.1 (low) - 1.0 (high)</span>
        </div>
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Scale</label>
          <input type="number" id="scale-pdf-jpg" min="0.5" max="3" step="0.1" value="1.6" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32">
          <span class="text-xs text-slate-400 mt-1 block">1.0 = original size</span>
        </div>
        <div class="flex flex-col gap-2">
          <button id="start-pdf-jpg" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Convert PDF to JPG
          </button>
          <button id="cancel-pdf-jpg" class="px-6 py-2 border-2 border-slate-600 rounded-xl text-slate-300 hover:border-orange-400 hover:text-orange-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            Cancel
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Progress</span>
          <span id="stats-pdf-jpg" class="text-sm text-slate-300">No file selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="bar-pdf-jpg" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-pdf-jpg" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to convert your PDF files</p>
      </div>
    </div>
  `;
}

function getJPGToPDFContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">🖼️</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          JPG to PDF Converter
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Convert images to PDF document instantly</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-jpg-pdf">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-jpg-pdf" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your images here</span>
        <span class="text-slate-400 text-sm">or click to browse files (JPG, JPEG, PNG)</span>
        <input type="file" id="file-jpg-pdf" class="hidden" accept="image/jpeg,image/jpg,image/png" multiple />
      </label>

      <div id="image-preview-jpg-pdf" class="w-full mb-6 grid grid-cols-2 md:grid-cols-3 gap-4 hidden"></div>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Page Size</label>
          <select id="pageSize-jpg-pdf" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
            <option value="legal">Legal</option>
            <option value="fit">Fit to Image</option>
          </select>
        </div>
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Orientation</label>
          <select id="orientation-jpg-pdf" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <button id="convert-jpg-pdf" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Convert to PDF
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-jpg-pdf" class="text-sm text-slate-300">No images selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-jpg-pdf" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-jpg-pdf" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to convert your images</p>
      </div>
    </div>
  `;
}

function getPDFCompressContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">🗜️</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF Compressor
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Reduce PDF file size without losing quality</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-compress">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-compress" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your PDF here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-compress" class="hidden" accept="application/pdf" />
      </label>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Compression Level</label>
          <select id="quality-compress" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="0.3">High Compression (Smaller Size)</option>
            <option value="0.5" selected>Medium Compression (Balanced)</option>
            <option value="0.7">Low Compression (Better Quality)</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <button id="compress-btn" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Compress PDF
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">File Size</span>
          <span id="fileSize-compress" class="text-sm text-slate-300">No file selected</span>
        </div>
        <div id="comparison-compress" class="hidden mb-4 p-4 bg-slate-700/50 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <span class="text-slate-300">Original:</span>
            <span class="text-slate-200 font-medium" id="originalSize-compress"></span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-green-400">Compressed:</span>
            <span class="text-green-400 font-medium" id="compressedSize-compress"></span>
          </div>
          <div class="mt-2 text-center">
            <span class="text-blue-400 font-bold" id="savings-compress"></span>
          </div>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-compress" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-compress" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to compress your PDF</p>
      </div>
    </div>
  `;
}

function getPDFSplitContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">✂️</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF Splitter
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Split PDF into separate pages or extract specific pages</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-split">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-split" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your PDF here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-split" class="hidden" accept="application/pdf" />
      </label>

      <div id="pages-info-split" class="w-full mb-6 bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg hidden">
        <h3 class="text-lg font-semibold text-slate-200 mb-4">Select Pages to Extract</h3>
        <div id="pages-list-split" class="grid grid-cols-5 md:grid-cols-10 gap-2 mb-4"></div>
        <div class="flex gap-2 flex-wrap">
          <button id="select-all-split" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">Select All</button>
          <button id="select-none-split" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm">Select None</button>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <button id="split-all-split" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
          Split All Pages
        </button>
        <button id="extract-selected-split" class="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 hidden">
          Extract Selected Pages
        </button>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-split" class="text-sm text-slate-300">No file selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-split" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-split" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to split your PDF</p>
      </div>
    </div>
  `;
}

function getPDFMergeContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">🔗</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF Merger
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Merge multiple PDFs into one document</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-merge">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-merge" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your PDFs here</span>
        <span class="text-slate-400 text-sm">or click to browse files (multiple files)</span>
        <input type="file" id="file-merge" class="hidden" accept="application/pdf" multiple />
      </label>

      <div id="pdf-list-merge" class="w-full mb-6 space-y-2 hidden"></div>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <button id="merge-btn" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
          Merge PDFs
        </button>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-merge" class="text-sm text-slate-300">No files selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-merge" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-merge" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to merge your PDFs</p>
      </div>
    </div>
  `;
}

function getPDFRotateContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">🔄</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF Rotate
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Rotate PDF pages to any angle</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-rotate">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-rotate" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your PDF here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-rotate" class="hidden" accept="application/pdf" />
      </label>

      <div id="pages-info-rotate" class="w-full mb-6 bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg hidden">
        <h3 class="text-lg font-semibold text-slate-200 mb-4">Select Pages and Rotation</h3>
        <div id="pages-list-rotate" class="grid grid-cols-5 md:grid-cols-10 gap-2 mb-4"></div>
        <div class="flex gap-4 items-center">
          <label class="text-slate-200 text-sm">Rotation:</label>
          <select id="rotation-angle" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50">
            <option value="90">90° Clockwise</option>
            <option value="180">180°</option>
            <option value="270">90° Counter-clockwise</option>
          </select>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <button id="rotate-btn" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
          Rotate PDF
        </button>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-rotate" class="text-sm text-slate-300">No file selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-rotate" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-rotate" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to rotate your PDF</p>
      </div>
    </div>
  `;
}

function getPNGToJPGContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">🖼️</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PNG to JPG Converter
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Convert PNG images to JPG format instantly</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-png-jpg">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-png-jpg" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your PNG images here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-png-jpg" class="hidden" accept="image/png" multiple />
      </label>

      <div id="image-preview-png-jpg" class="w-full mb-6 grid grid-cols-2 md:grid-cols-3 gap-4 hidden"></div>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">JPEG Quality</label>
          <input type="number" id="quality-png-jpg" min="0.1" max="1" step="0.1" value="0.9" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32">
          <span class="text-xs text-slate-400 mt-1 block">0.1 (low) - 1.0 (high)</span>
        </div>
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Background Color</label>
          <input type="color" id="bgColor-png-jpg" value="#ffffff" class="w-full h-10 rounded-lg cursor-pointer">
          <span class="text-xs text-slate-400 mt-1 block">For transparent PNGs</span>
        </div>
        <div class="flex flex-col gap-2">
          <button id="convert-png-jpg" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Convert to JPG
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-png-jpg" class="text-sm text-slate-300">No images selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-png-jpg" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-png-jpg" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to convert your images</p>
      </div>
    </div>
  `;
}

function getImageResizeContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">📏</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Image Resizer
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Resize images to any size instantly</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-resize">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-resize" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your images here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-resize" class="hidden" accept="image/*" multiple />
      </label>

      <div id="image-preview-resize" class="w-full mb-6 grid grid-cols-2 md:grid-cols-3 gap-4 hidden"></div>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Width (px)</label>
          <input type="number" id="width-resize" placeholder="Auto" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32">
        </div>
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Height (px)</label>
          <input type="number" id="height-resize" placeholder="Auto" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32">
        </div>
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Maintain Aspect Ratio</label>
          <input type="checkbox" id="aspect-resize" checked class="w-5 h-5 rounded">
        </div>
        <div class="flex flex-col gap-2">
          <button id="resize-btn" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Resize Images
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-resize" class="text-sm text-slate-300">No images selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-resize" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-resize" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to resize your images</p>
      </div>
    </div>
  `;
}

function getImageCompressContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">🗜️</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Image Compressor
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Compress images to reduce file size</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-compress-img">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-compress-img" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your images here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-compress-img" class="hidden" accept="image/*" multiple />
      </label>

      <div id="image-preview-compress-img" class="w-full mb-6 grid grid-cols-2 md:grid-cols-3 gap-4 hidden"></div>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Quality</label>
          <input type="range" id="quality-compress-img" min="0.1" max="1" step="0.1" value="0.8" class="w-48">
          <span class="text-xs text-slate-400 mt-1 block" id="quality-value-compress-img">0.8</span>
        </div>
        <div class="flex flex-col gap-2">
          <button id="compress-img-btn" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Compress Images
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-compress-img" class="text-sm text-slate-300">No images selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-compress-img" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-compress-img" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to compress your images</p>
      </div>
    </div>
  `;
}

function getPDFUnlockContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">🔓</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF Unlock
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Remove password protection from PDF files</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-unlock">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-unlock" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your password-protected PDF here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-unlock" class="hidden" accept="application/pdf" />
      </label>

      <div id="password-section-unlock" class="w-full mb-6 bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg hidden">
        <h3 class="text-lg font-semibold text-slate-200 mb-4">Enter PDF Password</h3>
        <div class="flex flex-wrap gap-4 items-end">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-slate-200 text-sm mb-2 font-medium">Password</label>
            <input type="password" id="password-unlock" placeholder="Enter PDF password" class="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <p class="text-xs text-slate-400 mt-2">⚠️ We cannot unlock PDFs without the password. This tool removes protection from PDFs you already have access to.</p>
          </div>
          <div class="flex flex-col gap-2">
            <button id="unlock-btn" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
              Unlock PDF
            </button>
          </div>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-unlock" class="text-sm text-slate-300">No file selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-unlock" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-unlock" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to unlock your PDF</p>
      </div>
    </div>
  `;
}

function getPDFProtectContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">🔒</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF Protect
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Add password protection to PDF files</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-protect">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-protect" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your PDF here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-protect" class="hidden" accept="application/pdf" />
      </label>

      <div id="password-section-protect" class="w-full mb-6 bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg hidden">
        <h3 class="text-lg font-semibold text-slate-200 mb-4">Set PDF Password</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-slate-200 text-sm mb-2 font-medium">Password</label>
            <input type="password" id="password-protect" placeholder="Enter password" class="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
          </div>
          <div>
            <label class="block text-slate-200 text-sm mb-2 font-medium">Confirm Password</label>
            <input type="password" id="password-confirm-protect" placeholder="Confirm password" class="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
          </div>
          <div class="flex flex-col gap-2">
            <button id="protect-btn" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
              Protect PDF
            </button>
          </div>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-protect" class="text-sm text-slate-300">No file selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-protect" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-protect" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to protect your PDF</p>
      </div>
    </div>
  `;
}

function getPDFOCRContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">👁️</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF OCR
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Extract text from PDF images using OCR</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-ocr">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-ocr" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your PDF here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-ocr" class="hidden" accept="application/pdf" />
      </label>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">Language</label>
          <select id="language-ocr" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="eng">English</option>
            <option value="spa">Spanish</option>
            <option value="fra">French</option>
            <option value="deu">German</option>
            <option value="chi_sim">Chinese (Simplified)</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <button id="ocr-btn" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Extract Text
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-ocr" class="text-sm text-slate-300">No file selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-ocr" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-ocr" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to extract text from your PDF</p>
      </div>

      <div id="text-result-ocr" class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6 hidden">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-slate-200">Extracted Text</h3>
          <button id="copy-text-ocr" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm">Copy</button>
        </div>
        <textarea id="extracted-text-ocr" class="w-full h-64 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400" readonly></textarea>
      </div>
    </div>
  `;
}

function getPDFToWordContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">📝</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF to Word
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Convert PDF documents to Word format</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-pdf-word">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-pdf-word" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your PDF here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-pdf-word" class="hidden" accept="application/pdf" />
      </label>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="flex flex-col gap-2">
          <button id="convert-pdf-word" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Convert to Word
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-pdf-word" class="text-sm text-slate-300">No file selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-pdf-word" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-pdf-word" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to convert your PDF</p>
      </div>
    </div>
  `;
}

function getWordToPDFContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">📄</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Word to PDF
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Convert Word documents to PDF format</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-word-pdf">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-word-pdf" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your Word document here</span>
        <span class="text-slate-400 text-sm">or click to browse files (.docx, .doc)</span>
        <input type="file" id="file-word-pdf" class="hidden" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
      </label>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="flex flex-col gap-2">
          <button id="convert-word-pdf" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Convert to PDF
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-word-pdf" class="text-sm text-slate-300">No file selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-word-pdf" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-word-pdf" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to convert your Word document</p>
      </div>
    </div>
  `;
}

function getHEICToJPGContent() {
  return `
    <div class="w-full">
      <div class="text-center mb-8">
        <div class="inline-block mb-4">
          <span class="text-6xl">📷</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          HEIC to JPG Converter
        </h1>
        <p class="text-slate-200 text-lg mb-2 font-medium">Convert HEIC images to JPG format instantly</p>
        <p class="text-slate-400 text-sm">Free • Fast • No Upload Required • 100% Secure</p>
      </div>
      
      <label class="w-full border-2 border-dashed border-slate-600 rounded-xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-800/60 transition-all duration-300 mb-6 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/30 group" id="dropzone-heic-jpg">
        <div class="mb-4 relative">
          <svg class="w-16 h-16 text-blue-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <span id="dropLabel-heic-jpg" class="text-slate-200 font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">Drag & drop your HEIC images here</span>
        <span class="text-slate-400 text-sm">or click to browse files</span>
        <input type="file" id="file-heic-jpg" class="hidden" accept="image/heic,image/heif,.heic,.heif" multiple />
      </label>

      <div id="image-preview-heic-jpg" class="w-full mb-6 grid grid-cols-2 md:grid-cols-3 gap-4 hidden"></div>

      <div class="flex flex-wrap gap-4 w-full mb-6 justify-center items-end">
        <div class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <label class="block text-slate-200 text-sm mb-2 font-medium">JPEG Quality</label>
          <input type="number" id="quality-heic-jpg" min="0.1" max="1" step="0.1" value="0.9" class="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32">
          <span class="text-xs text-slate-400 mt-1 block">0.1 (low) - 1.0 (high)</span>
        </div>
        <div class="flex flex-col gap-2">
          <button id="convert-heic-jpg" class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Convert to JPG
          </button>
        </div>
      </div>

      <div class="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-6 shadow-lg mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-slate-200 font-medium">Status</span>
          <span id="status-heic-jpg" class="text-sm text-slate-300">No images selected</span>
        </div>
        <div class="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
          <div id="progress-heic-jpg" class="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 w-0 transition-all duration-300"></div>
        </div>
        <p id="log-heic-jpg" class="text-sm text-slate-200 min-h-[32px] text-center mt-4">✨ Ready to convert your HEIC images</p>
      </div>
    </div>
  `;
}


