// Main application logic for single-page app with tabs
let currentTool = 'pdf-to-jpg';
// Allow tool landing pages (/pdf-to-png.html etc.) and ?tool= links to pre-select a tool.
(function () {
  try {
    var fromParam = new URLSearchParams(window.location.search).get('tool');
    var initial = window.INITIAL_TOOL || fromParam;
    if (initial && typeof getToolById !== 'function') { currentTool = initial; }
    else if (initial && getToolById(initial)) { currentTool = initial; }
  } catch (e) { /* ignore */ }
})();

// ===== Retention pack (100% client-side, localStorage — works on static hosting) =====
const RT_FAV = 'pdftools_favorites';
const RT_RECENT = 'pdftools_recents';
function rtGet(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } }
function rtSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function rtFavorites() { return rtGet(RT_FAV); }
function rtIsFav(id) { return rtFavorites().includes(id); }
function rtToggleFav(id) { let f = rtFavorites(); f = f.includes(id) ? f.filter(x => x !== id) : [...f, id]; rtSet(RT_FAV, f); return f; }
function rtRecents() { return rtGet(RT_RECENT); }
function rtAddRecent(id) { let r = rtRecents().filter(x => x !== id); r.unshift(id); rtSet(RT_RECENT, r.slice(0, 5)); }

// Compact tool button for the Favorites / Recently Used quick-access sections
function rtQuickButton(id) {
  const t = (typeof getToolById === 'function') && getToolById(id);
  if (!t) return '';
  const active = currentTool === id ? 'active text-primary' : 'text-light';
  return `<li class="mb-1"><button data-tool="${id}" class="nav-item btn w-100 d-flex align-items-center gap-2 gap-lg-3 px-3 py-2 rounded text-start border-0 ${active}" onclick="switchTool('${id}')"><span class="fs-5 flex-shrink-0">${t.icon}</span><div class="flex-grow-1 text-truncate"><div class="small fw-medium text-truncate">${t.name}</div></div></button></li>`;
}

// (Re)render the Favorites + Recently Used sections and sync star icons
function rtRenderQuickAccess() {
  const sectionHdr = (icon, label) => `<h2 class="text-uppercase text-secondary small fw-semibold mb-2 px-2" style="font-size:0.7rem; letter-spacing:0.1em; opacity:0.7;">${icon}${label}</h2>`;
  const fav = document.getElementById('fav-section');
  if (fav) {
    const favs = rtFavorites().filter(id => (typeof getToolById === 'function') && getToolById(id));
    fav.innerHTML = favs.length ? `${sectionHdr('<i class="bi bi-star-fill me-1" style="color:#f59e0b;"></i>', 'Favorites')}<ul class="list-unstyled mb-4">${favs.map(rtQuickButton).join('')}</ul>` : '';
  }
  const rec = document.getElementById('recent-section');
  if (rec) {
    const recs = rtRecents().filter(id => !rtIsFav(id) && (typeof getToolById === 'function') && getToolById(id));
    rec.innerHTML = recs.length ? `${sectionHdr('<i class="bi bi-clock-history me-1"></i>', 'Recently Used')}<ul class="list-unstyled mb-4">${recs.map(rtQuickButton).join('')}</ul>` : '';
  }
  document.querySelectorAll('.fav-toggle').forEach(b => {
    const on = rtIsFav(b.getAttribute('data-fav'));
    const i = b.querySelector('i'); if (i) i.className = on ? 'bi bi-star-fill' : 'bi bi-star';
    b.style.color = on ? '#f59e0b' : 'var(--text-secondary)';
    b.style.opacity = on ? '1' : '0.55';
    b.title = on ? 'Remove from favorites' : 'Add to favorites';
  });
}

// Remember each tool's settings (quality/scale/size/etc.) across visits
function rtRestoreSettings(toolId) {
  const root = document.getElementById('tool-content');
  if (!root) return;
  root.querySelectorAll('input[type=number], input[type=range], select, input[type=checkbox], input[type=radio]').forEach(el => {
    if (!el.id) return;
    const key = `pdftools_set_${toolId}_${el.id}`;
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      if (el.type === 'checkbox' || el.type === 'radio') el.checked = (saved === 'true');
      else el.value = saved;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (!el.dataset.rtBound) {
      el.dataset.rtBound = '1';
      el.addEventListener('change', () => {
        localStorage.setItem(key, (el.type === 'checkbox' || el.type === 'radio') ? String(el.checked) : el.value);
      });
    }
  });
}
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
    const defaultContent = document.getElementById('default-content');
    
    // Fade out
    contentArea.style.opacity = '0';
    contentArea.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      // Set tool content FIRST (ensures content is in DOM before hiding default)
      contentArea.innerHTML = getToolContent(toolId);
      
      // Only hide default content AFTER tool content is set in DOM
      if (defaultContent) {
        defaultContent.style.display = 'none';
      }
      
      // Reinitialize tool-specific functionality
      initializeTool(toolId);

      // Retention: record recent, refresh quick-access, restore saved settings
      rtAddRecent(toolId);
      rtRenderQuickAccess();
      setTimeout(() => rtRestoreSettings(toolId), 300);

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
    'pdf-to-png': getPDFToPNGContent(),
    'jpg-to-pdf': getJPGToPDFContent(),
    'pdf-compress': getPDFCompressContent(),
    'pdf-split': getPDFSplitContent(),
    'pdf-merge': getPDFMergeContent(),
    'pdf-rotate': getPDFRotateContent(),
    'pdf-ocr': getPDFOCRContent(),
    'png-to-jpg': getPNGToJPGContent(),
    'image-resize': getImageResizeContent(),
    'image-compress': getImageCompressContent(),
    'heic-to-jpg': getHEICToJPGContent(),
    'jpg-to-png': getJPGToPNGContent(),
    'image-to-webp': getImageToWebpContent(),
  };
  
  // Fallback: If tool not found, show default content instead of "coming soon" message
  // This ensures we never show ads without substantial content
  if (!toolContents[toolId]) {
    const defaultContent = document.getElementById('default-content');
    if (defaultContent) {
      defaultContent.style.display = 'block';
      return '';
    }
    // If default content also unavailable, return substantial fallback content
    return `
      <div class="w-100">
        <div class="text-center mb-5">
          <h1 class="text-gradient fw-bold mb-3" style="font-size: 3rem; line-height: 1.2;">
            Free Online PDF & Image Tools
          </h1>
          <p class="text-light fs-5 mb-2 fw-medium">Professional PDF and image conversion tools that work entirely in your browser</p>
          <p class="text-secondary small mb-0">100% Free • No Upload Required • 100% Secure • Works Offline</p>
        </div>
        <div class="card border-0 shadow-sm mb-5">
          <div class="card-body p-4 p-lg-5">
            <h2 class="text-gradient fw-bold mb-4" style="font-size: 2rem;">About Our PDF & Image Tools</h2>
            <p class="text-light mb-3" style="font-size: 1.05rem; line-height: 1.8;">
              Welcome to our comprehensive suite of free online PDF and image conversion tools. Our platform provides professional-grade file conversion and manipulation capabilities that work entirely in your web browser. Unlike other online tools, we never upload your files to any server - all processing happens locally on your device, ensuring complete privacy and security.
            </p>
            <p class="text-light mb-3" style="font-size: 1.05rem; line-height: 1.8;">
              Our PDF tools allow you to convert PDFs to JPG images, compress PDF files to reduce file size, merge multiple PDFs into one document, split PDFs into separate files, rotate PDF pages, and extract text from PDFs using OCR technology. Our image tools enable you to convert PNG to JPG, resize images, compress images, convert HEIC images to JPG format, and convert multiple JPG images into a single PDF document.
            </p>
            <p class="text-light mb-0" style="font-size: 1.05rem; line-height: 1.8;">
              All tools are completely free to use with no hidden costs, no watermarks, and no file size limits. Simply select a tool from the navigation menu above to get started. Our tools work on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera, and are fully compatible with mobile devices.
            </p>
          </div>
        </div>
      </div>
    `;
  }
  
  return toolContents[toolId];
}

// Initialize tool-specific functionality
function initializeTool(toolId) {
  // Load PDF.js on mobile if needed for PDF tools
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  const toolsNeedingPDFJS = ['pdf-to-jpg', 'pdf-to-png', 'pdf-compress', 'pdf-split', 'pdf-merge', 'pdf-rotate', 'pdf-ocr'];
  
  if (isMobile && toolsNeedingPDFJS.includes(toolId) && !pdfjsReady && typeof loadPDFJS === 'function' && !window.pdfjsLoading) {
    loadPDFJS();
  }
  
  // Wait for DOM to be ready, then initialize tool handlers
  if (typeof initToolHandlers === 'function') {
    // Small delay to ensure DOM is updated and PDF.js loads on mobile
    const delay = (isMobile && toolsNeedingPDFJS.includes(toolId) && !pdfjsReady) ? 500 : 10;
    setTimeout(() => {
      initToolHandlers(toolId);
    }, delay);
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
        <span class="text-secondary fw-semibold text-uppercase" style="font-size: 0.8rem; letter-spacing: 0.08em;">
          <i class="bi bi-tools me-1"></i>Tools
        </span>
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
              <span class="text-secondary fw-semibold text-uppercase" style="font-size: 0.8rem; letter-spacing: 0.08em;">
                <i class="bi bi-tools me-1"></i>Tools
              </span>
              <button id="theme-toggle-desktop" class="btn btn-link p-1 rounded-circle d-flex align-items-center justify-content-center" aria-label="Toggle theme" type="button" style="width: 32px; height: 32px; color: var(--text-secondary); transition: all 0.2s ease; opacity: 0.7;">
                <i class="bi ${themeIcon}" style="font-size: 0.85rem;"></i>
              </button>
            </div>
          </div>

          <!-- Quick access (populated from localStorage) -->
          <div id="fav-section"></div>
          <div id="recent-section"></div>

          ${Object.values(TOOLS_CONFIG).map(category => `
            <div class="mb-4 mb-lg-5">
              <h2 class="text-uppercase text-secondary small fw-semibold mb-3 px-2" style="font-size: 0.7rem; letter-spacing: 0.1em; opacity: 0.7;">
                ${category.category}
              </h2>
              <ul class="list-unstyled mb-0">
                ${category.tools.map(tool => {
                  const isActive = currentTool === tool.id;
                  return `
                    <li class="mb-1 position-relative">
                      <button
                        data-tool="${tool.id}"
                        class="nav-item btn w-100 d-flex align-items-center gap-2 gap-lg-3 px-3 py-2 rounded text-start border-0 ${
                          isActive
                            ? 'active text-primary'
                            : 'text-light'
                        }"
                        onclick="switchTool('${tool.id}')">
                        <span class="fs-5 flex-shrink-0">${tool.icon}</span>
                        <div class="flex-grow-1 text-truncate" style="padding-right: 1.4rem;">
                          <div class="small fw-medium text-truncate">${tool.name}</div>
                          <div class="text-secondary small text-truncate d-none d-sm-block" style="font-size: 0.75rem; opacity: 0.7;">${tool.description}</div>
                        </div>
                      </button>
                      <button type="button" class="fav-toggle btn btn-link p-0 position-absolute" data-fav="${tool.id}" aria-label="Toggle favorite for ${tool.name}" title="Add to favorites" style="top: 50%; right: 0.6rem; transform: translateY(-50%); z-index: 2; line-height: 1; color: var(--text-secondary); opacity: 0.55;">
                        <i class="bi bi-star"></i>
                      </button>
                    </li>
                  `;
                }).join('')}
              </ul>
            </div>
          `).join('')}

          <div class="mb-4 mb-lg-5">
            <h2 class="text-uppercase text-secondary small fw-semibold mb-3 px-2" style="font-size: 0.7rem; letter-spacing: 0.1em; opacity: 0.7;">
              Resources
            </h2>
            <ul class="list-unstyled mb-0">
              <li class="mb-1">
                <a href="/blog/"
                   class="nav-item btn w-100 d-flex align-items-center gap-2 gap-lg-3 px-3 py-2 rounded text-start border-0 text-light">
                  <span class="fs-5 flex-shrink-0">📝</span>
                  <div class="flex-grow-1 text-truncate">
                    <div class="small fw-medium text-truncate">Blog &amp; Guides</div>
                    <div class="text-secondary small text-truncate d-none d-sm-block" style="font-size: 0.75rem; opacity: 0.7;">Tips &amp; tutorials</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `;
  
  const navContainer = document.getElementById('nav-container');
  if (navContainer) {
    navContainer.innerHTML = navHTML;

    // Favorite (star) toggles — delegated so they don't trigger switchTool
    navContainer.addEventListener('click', (e) => {
      const star = e.target.closest('.fav-toggle');
      if (!star) return;
      e.preventDefault();
      e.stopPropagation();
      rtToggleFav(star.getAttribute('data-fav'));
      rtRenderQuickAccess();
    });

    // Initial render of Favorites + Recently Used + star states
    rtRenderQuickAccess();
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
      const defaultContent = document.getElementById('default-content');
      
      // Set tool content FIRST (ensures content is in DOM before hiding default)
      contentArea.innerHTML = getToolContent(currentTool);
      
      // Only hide default content AFTER tool content is set in DOM
      if (defaultContent) {
        defaultContent.style.display = 'none';
      }
      
      initializeTool(currentTool);
    }
  }, 100);
});

// Make switchTool available globally
window.switchTool = switchTool;
window.loadPDFJS = loadPDFJS;

