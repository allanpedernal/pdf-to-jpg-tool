// Shared navigation component
function createNavigation() {
  const currentToolId = getCurrentToolId();
  const currentPath = window.location.pathname;
  
  const navHTML = `
    <nav class="fixed lg:sticky top-0 lg:top-4 left-0 z-50 w-full lg:w-64 bg-slate-900/95 lg:bg-slate-800/60 backdrop-blur-lg border-b lg:border-b-0 lg:border-r border-slate-700 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
      <div class="lg:hidden flex items-center justify-between p-4 border-b border-slate-700">
        <a href="/" class="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          PDF Tools
        </a>
        <button id="mobile-menu-toggle" class="text-slate-300 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <div id="mobile-menu" class="hidden lg:block">
        <div class="p-4 lg:p-6">
          <a href="/" class="block mb-6">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PDF Tools
            </h1>
            <p class="text-sm text-slate-400 mt-1">Free Online Tools</p>
          </a>
          
          ${Object.values(TOOLS_CONFIG).map(category => `
            <div class="mb-6">
              <h2 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
                ${category.category}
              </h2>
              <ul class="space-y-1">
                ${category.tools.map(tool => {
                  const isActive = currentToolId === tool.id || (currentPath === '/' && tool.id === 'pdf-to-jpg');
                  return `
                    <li>
                      <a href="${tool.path}" 
                         class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                           isActive 
                             ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-400' 
                             : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                         }">
                        <span class="text-lg">${tool.icon}</span>
                        <span class="text-sm font-medium">${tool.name}</span>
                      </a>
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
  
  return navHTML;
}

// Initialize navigation
function initNavigation() {
  // Insert navigation at the beginning of body
  const navContainer = document.createElement('div');
  navContainer.innerHTML = createNavigation();
  document.body.insertBefore(navContainer.firstElementChild, document.body.firstChild);
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav') && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  }
  
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        mobileMenu.classList.add('hidden');
      }
    });
  });
}

// Adjust main content margin for navigation
function adjustContentMargin() {
  const mainContent = document.querySelector('main');
  if (mainContent && window.innerWidth >= 1024) {
    mainContent.style.marginLeft = '256px'; // 64 * 4 = 256px (lg:w-64)
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    adjustContentMargin();
    window.addEventListener('resize', adjustContentMargin);
  });
} else {
  initNavigation();
  adjustContentMargin();
  window.addEventListener('resize', adjustContentMargin);
}


