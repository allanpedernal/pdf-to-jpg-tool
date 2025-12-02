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
  
  // Update active nav item with smooth transition
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active', 'text-primary');
    item.classList.add('text-light');
  });
  const activeItem = document.querySelector(`[data-tool="${toolId}"]`);
  if (activeItem) {
    activeItem.classList.add('active', 'text-primary');
    activeItem.classList.remove('text-light');
  }
  
  // Update content area with fade animation
  const contentArea = document.getElementById('tool-content');
  if (contentArea) {
    // Fade out
    contentArea.style.opacity = '0';
    contentArea.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      contentArea.innerHTML = getToolContent(toolId);
      // Reinitialize tool-specific functionality
      initializeTool(toolId);
      
      // Fade in
      setTimeout(() => {
        contentArea.style.opacity = '1';
        contentArea.style.transform = 'translateY(0)';
      }, 10);
    }, 150);
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
  // Wait for DOM to be ready, then initialize tool handlers
  if (typeof initToolHandlers === 'function') {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      initToolHandlers(toolId);
    }, 10);
  }
}

// Navigation initialization
function initNavigation() {
  // Get current theme to set correct icon
  const savedThemePreference = localStorage.getItem('theme') || 'light';
  const currentTheme = document.documentElement.getAttribute('data-theme') || savedThemePreference;
  const themeIcon = currentTheme === 'light' ? 'bi-sun-fill' : 'bi-moon-fill';
  
  const navHTML = `
    <nav class="h-auto" style="background-color: var(--nav-bg); backdrop-filter: blur(10px); border-bottom: 1px solid var(--card-border); border-right: 1px solid var(--card-border);">
      <div class="d-lg-none d-flex align-items-center justify-content-between p-3 border-bottom" style="border-color: var(--card-border);">
        <div>
          <h1 class="text-gradient fw-bold mb-0" style="font-size: 1.25rem; line-height: 1.2;">
            PDF Tools
          </h1>
          <p class="text-secondary small mb-0" style="font-size: 0.75rem;">Free Online Tools Suite</p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button id="theme-toggle-mobile" class="btn btn-link p-1 rounded-circle d-flex align-items-center justify-content-center" aria-label="Toggle theme" type="button" style="width: 32px; height: 32px; color: var(--text-secondary); transition: all 0.2s ease; opacity: 0.7;">
            <i class="bi ${themeIcon}" style="font-size: 0.85rem;"></i>
          </button>
          <button id="mobile-menu-toggle" class="btn btn-link p-2 rounded" aria-label="Toggle menu" type="button" style="color: var(--text-primary);">
            <i class="bi bi-list fs-4"></i>
          </button>
        </div>
      </div>
      
      <div id="mobile-menu" class="d-none d-lg-block">
        <div class="p-3 p-lg-4">
          <div class="mb-4 mb-lg-3 pb-3 border-bottom d-none d-lg-block" style="border-color: var(--card-border);">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div>
                <h1 class="text-gradient fw-bold mb-1" style="font-size: 1.5rem; line-height: 1.2;">
                  PDF Tools
                </h1>
                <p class="text-secondary small mb-0">Free Online Tools Suite</p>
              </div>
              <button id="theme-toggle-desktop" class="btn btn-link p-1 rounded-circle d-flex align-items-center justify-content-center" aria-label="Toggle theme" type="button" style="width: 32px; height: 32px; color: var(--text-secondary); transition: all 0.2s ease; opacity: 0.7;">
                <i class="bi ${themeIcon}" style="font-size: 0.85rem;"></i>
              </button>
            </div>
          </div>
          
          ${Object.values(TOOLS_CONFIG).map(category => `
            <div class="mb-4 mb-lg-5">
              <h2 class="text-uppercase text-secondary small fw-semibold mb-3 px-2" style="font-size: 0.7rem; letter-spacing: 0.1em; opacity: 0.7;">
                ${category.category}
              </h2>
              <ul class="list-unstyled mb-0">
                ${category.tools.map(tool => {
                  const isActive = currentTool === tool.id;
                  return `
                    <li class="mb-1">
                      <button 
                        data-tool="${tool.id}"
                        class="nav-item btn w-100 d-flex align-items-center gap-2 gap-lg-3 px-3 py-2 rounded text-start border-0 ${
                          isActive 
                            ? 'active text-primary' 
                            : 'text-light'
                        }"
                        onclick="switchTool('${tool.id}')">
                        <span class="fs-5 flex-shrink-0">${tool.icon}</span>
                        <div class="flex-grow-1 text-truncate">
                          <div class="small fw-medium text-truncate">${tool.name}</div>
                          <div class="text-secondary small text-truncate d-none d-sm-block" style="font-size: 0.75rem; opacity: 0.7;">${tool.description}</div>
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
      mobileMenu.classList.toggle('d-none');
    });
    
    // Close mobile menu when clicking outside or on a tool
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav') && !mobileMenu.classList.contains('d-none') && window.innerWidth < 992) {
        mobileMenu.classList.add('d-none');
      }
    });
    
    // Close mobile menu when selecting a tool
    setTimeout(() => {
      document.querySelectorAll('[data-tool]').forEach(btn => {
        btn.addEventListener('click', () => {
          if (window.innerWidth < 992) {
            mobileMenu.classList.add('d-none');
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

// Theme Management
function initTheme() {
  // Get saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  // Apply theme immediately
  applyTheme(savedTheme);
  
  // Theme toggle handlers
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Wait for navigation to be initialized, then attach handlers and update icons
  setTimeout(() => {
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    
    // Update icons based on current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcons(currentTheme);
    
    if (themeToggleDesktop) {
      themeToggleDesktop.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
      themeToggleMobile.addEventListener('click', toggleTheme);
    }
  }, 200);
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('#theme-toggle-desktop i, #theme-toggle-mobile i');
  icons.forEach(icon => {
    if (icon) {
      if (theme === 'light') {
        icon.className = 'bi bi-sun-fill';
      } else {
        icon.className = 'bi bi-moon-fill';
      }
      icon.style.fontSize = '0.85rem';
      icon.style.opacity = '1';
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update icon - use updateThemeIcons function if available, otherwise update directly
  if (typeof updateThemeIcons === 'function') {
    updateThemeIcons(theme);
  } else {
    // Fallback: update icons directly
    const icons = document.querySelectorAll('#theme-toggle-desktop i, #theme-toggle-mobile i');
    if (icons.length > 0) {
      icons.forEach(icon => {
        if (icon) {
          icon.style.transition = 'opacity 0.2s ease';
          icon.style.opacity = '0';
          setTimeout(() => {
            if (theme === 'light') {
              icon.className = 'bi bi-sun-fill';
              icon.style.fontSize = '0.85rem';
            } else {
              icon.className = 'bi bi-moon-fill';
              icon.style.fontSize = '0.85rem';
            }
            icon.style.opacity = '1';
          }, 100);
        }
      });
    }
  }
  
  // Update toggle button hover effect - subtle
  const toggleButtons = document.querySelectorAll('#theme-toggle-desktop, #theme-toggle-mobile');
  toggleButtons.forEach(btn => {
    if (btn) {
      btn.onmouseenter = function() {
        this.style.opacity = '1';
        this.style.color = 'var(--bs-primary)';
        this.style.transform = 'scale(1.1)';
      };
      btn.onmouseleave = function() {
        this.style.opacity = '0.7';
        this.style.color = 'var(--text-secondary)';
        this.style.transform = 'scale(1)';
      };
    }
  });
  
  // Update navigation background and borders using CSS variables
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.backgroundColor = 'var(--nav-bg)';
    nav.style.borderBottom = '1px solid var(--card-border)';
    nav.style.borderRight = '1px solid var(--card-border)';
    
    // Update all border-bottom elements in nav
    const navBorders = nav.querySelectorAll('.border-bottom');
    navBorders.forEach(el => {
      el.style.borderColor = 'var(--card-border)';
    });
    
    // Update mobile menu header background
    const mobileHeader = nav.querySelector('.d-lg-none');
    if (mobileHeader) {
      mobileHeader.style.borderColor = 'var(--card-border)';
    }
  }
}

// Adjust content - grid system handles spacing automatically
function adjustContentMargin() {
  // Grid system handles layout, no manual margin needed
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
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

