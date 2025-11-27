// Main application logic for single-page app with tabs
let currentTool = 'pdf-to-jpg';
let pdfjsReady = false;
window.pdfjsReady = false;

// Initialize PDF.js
function initPDFJS(workerSrc) {
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc || 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    pdfjsReady = true;
    window.pdfjsReady = true;
    return true;
  }
  return false;
}

function loadPDFJS() {
  if (window.pdfjsLoading) return;
  window.pdfjsLoading = true;
  
  const pdfjsScript = document.createElement('script');
  pdfjsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  pdfjsScript.onload = function() {
    if (!initPDFJS()) {
      const fallback = document.createElement('script');
      fallback.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js';
      fallback.onload = () => initPDFJS('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js');
      document.head.appendChild(fallback);
    }
  };
  pdfjsScript.onerror = function() {
    const fallback = document.createElement('script');
    fallback.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js';
    fallback.onload = () => initPDFJS('https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js');
    document.head.appendChild(fallback);
  };
  document.head.appendChild(pdfjsScript);
}

// Switch between tools
function switchTool(toolId) {
  currentTool = toolId;
  const tool = getToolById(toolId);
  if (!tool) return;
  
  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const activeItem = document.querySelector(`[data-tool="${toolId}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
  }
  
  // Update content area
  const contentArea = document.getElementById('tool-content');
  if (contentArea) {
    contentArea.innerHTML = getToolContent(toolId);
    // Reinitialize tool-specific functionality
    initializeTool(toolId);
  }
  
  // Update page title
  document.title = `${tool.name} - Free Online Tool`;
  
  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Get tool content HTML
function getToolContent(toolId) {
  const toolContents = {
    'pdf-to-jpg': getPDFToJPGContent(),
    'jpg-to-pdf': getJPGToPDFContent(),
    'pdf-compress': getPDFCompressContent(),
    'pdf-split': getPDFSplitContent(),
    'pdf-merge': getPDFMergeContent(),
    'pdf-rotate': getPDFRotateContent(),
    'pdf-unlock': getPDFUnlockContent(),
    'pdf-protect': getPDFProtectContent(),
    'pdf-ocr': getPDFOCRContent(),
    'pdf-to-word': getPDFToWordContent(),
    'word-to-pdf': getWordToPDFContent(),
    'png-to-jpg': getPNGToJPGContent(),
    'image-resize': getImageResizeContent(),
    'image-compress': getImageCompressContent(),
    'heic-to-jpg': getHEICToJPGContent(),
  };
  
  return toolContents[toolId] || '<div class="text-center py-12"><p class="text-slate-400">Tool coming soon...</p></div>';
}

// Initialize tool-specific functionality
function initializeTool(toolId) {
  // Tool-specific initialization will be handled by each tool's content
  // This is called after content is loaded
}

// Navigation initialization
function initNavigation() {
  const navHTML = `
    <nav class="fixed lg:sticky top-0 left-0 z-50 w-full lg:w-auto lg:h-screen bg-slate-900/98 lg:bg-slate-800/95 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-700 lg:overflow-y-auto shadow-lg lg:shadow-none">
      <div class="lg:hidden flex items-center justify-between p-3 sm:p-4 border-b border-slate-700 bg-slate-900">
        <a href="/" class="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF Tools
        </a>
        <button id="mobile-menu-toggle" class="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors" aria-label="Toggle menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <div id="mobile-menu" class="hidden lg:block max-h-[calc(100vh-80px)] lg:max-h-screen overflow-y-auto">
        <div class="p-3 sm:p-4 lg:p-5">
          <div class="mb-4 lg:mb-6">
            <h1 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PDF Tools
            </h1>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Free Online Tools Suite</p>
          </div>
          
          ${Object.values(TOOLS_CONFIG).map(category => `
            <div class="mb-4 lg:mb-6">
              <h2 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 lg:mb-3 px-2">
                ${category.category}
              </h2>
              <ul class="space-y-1">
                ${category.tools.map(tool => {
                  const isActive = currentTool === tool.id;
                  return `
                    <li>
                      <button 
                        data-tool="${tool.id}"
                        class="nav-item w-full flex items-center gap-2 lg:gap-3 px-2 sm:px-3 py-2 lg:py-2.5 rounded-lg transition-all duration-200 text-left ${
                          isActive 
                            ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-400 shadow-lg shadow-blue-500/10' 
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }"
                        onclick="switchTool('${tool.id}')">
                        <span class="text-lg lg:text-xl flex-shrink-0">${tool.icon}</span>
                        <div class="flex-1 min-w-0">
                          <div class="text-xs sm:text-sm font-medium truncate">${tool.name}</div>
                          <div class="text-xs text-slate-400 ${isActive ? 'text-blue-300' : ''} truncate hidden sm:block">${tool.description}</div>
                        </div>
                      </button>
                    </li>
                  `;
                }).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    </nav>
  `;
  
  const navContainer = document.getElementById('nav-container');
  if (navContainer) {
    navContainer.innerHTML = navHTML;
  }
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking outside or on a tool
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav') && !mobileMenu.classList.contains('hidden') && window.innerWidth < 1024) {
        mobileMenu.classList.add('hidden');
      }
    });
    
    // Close mobile menu when selecting a tool
    setTimeout(() => {
      document.querySelectorAll('[data-tool]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (window.innerWidth < 1024) {
            mobileMenu.classList.add('hidden');
          }
        });
      });
    }, 100);
  }
  
  // Set initial active tool
  setTimeout(() => {
    const initialTool = document.querySelector(`[data-tool="${currentTool}"]`);
    if (initialTool) {
      initialTool.classList.add('active');
    }
  }, 100);
}

// Adjust content - grid system handles spacing automatically
function adjustContentMargin() {
  // Grid system handles layout, no manual margin needed
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  adjustContentMargin();
  window.addEventListener('resize', adjustContentMargin);
  
  // Load PDF.js on desktop
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  if (!isMobile) {
    setTimeout(() => {
      if (document.readyState === 'complete') {
        loadPDFJS();
      } else {
        window.addEventListener('load', loadPDFJS);
      }
    }, 500);
  }
  
  // Initialize first tool after a short delay to ensure DOM is ready
  setTimeout(() => {
    const contentArea = document.getElementById('tool-content');
    if (contentArea) {
      contentArea.innerHTML = getToolContent(currentTool);
      initializeTool(currentTool);
    }
  }, 100);
});

// Make switchTool available globally
window.switchTool = switchTool;
window.loadPDFJS = loadPDFJS;

