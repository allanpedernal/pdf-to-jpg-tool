// Shared PWA functionality for all pages
(function() {
  'use strict';
  
  // Register Service Worker for PWA functionality
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered successfully:', registration.scope);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, notify user
                console.log('[PWA] New version available');
                // Optionally show update notification to user
                if (typeof toastr !== 'undefined') {
                  toastr.info('A new version is available. Refresh to update.', 'Update Available', {
                    timeOut: 5000,
                    positionClass: 'toast-top-right',
                    onclick: function() {
                      window.location.reload();
                    }
                  });
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    });
    
    // Handle service worker updates
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        console.log('[PWA] New service worker activated, reloading page...');
        window.location.reload();
      }
    });
  }
  
  // PWA Install Prompt
  let deferredPrompt;
  window.deferredPrompt = null; // Make available globally for debugging
  
  // Create install button (only on index page)
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const installButton = document.createElement('button');
    installButton.id = 'pwa-install-button';
    installButton.className = 'btn btn-primary d-none';
    installButton.innerHTML = '<i class="bi bi-download me-2"></i>Install App';
    installButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border-radius: 8px; padding: 12px 24px; font-weight: 600; animation: pulse 2s infinite;';
    
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      #pwa-install-button:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 6px 16px rgba(0,0,0,0.4) !important;
      }
    `;
    document.head.appendChild(style);
    
    installButton.setAttribute('aria-label', 'Install PDF Tools App');
    
    // Store reference globally for debugging
    window.pwaInstallButton = installButton;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('[PWA] Install prompt available!');
      // Prevent the default install prompt
      e.preventDefault();
      deferredPrompt = e;
      window.deferredPrompt = e;
      
      // Show install button
      installButton.classList.remove('d-none');
      if (!document.body.contains(installButton)) {
        document.body.appendChild(installButton);
      }
      
      // Log for debugging
      console.log('[PWA] Install button should now be visible');
      
      installButton.addEventListener('click', async () => {
        // Hide the install button
        installButton.classList.add('d-none');
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for user response
        const { outcome } = await deferredPrompt.userChoice;
        console.log('[PWA] User choice:', outcome);
        
        if (outcome === 'accepted') {
          console.log('[PWA] User accepted the install prompt');
        } else {
          console.log('[PWA] User dismissed the install prompt');
          // Show button again after a delay
          setTimeout(() => {
            if (deferredPrompt) {
              installButton.classList.remove('d-none');
            }
          }, 5000);
        }
        
        // Clear the deferred prompt
        deferredPrompt = null;
        window.deferredPrompt = null;
      });
    });
    
    // Check if install prompt is available but event didn't fire
    // This can happen if user dismissed it before
    setTimeout(() => {
      if (!deferredPrompt && 'serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(reg => {
          if (reg && reg.active) {
            // Service worker is active, check if we can determine installability
            console.log('[PWA] Service worker active. Install prompt may appear after user engagement.');
            console.log('[PWA] Try: 1) Visit site multiple times, 2) Interact with the page, 3) Check browser menu for install option');
          }
        });
      }
    }, 2000);
    
    // Hide install button if app is already installed
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App installed successfully');
      if (installButton && installButton.parentNode) {
        installButton.classList.add('d-none');
      }
      deferredPrompt = null;
      
      // Show success message
      if (typeof toastr !== 'undefined') {
        toastr.success('App installed successfully!', 'PWA Installed', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    });
    
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      console.log('[PWA] App is running in standalone mode');
      if (installButton && installButton.parentNode) {
        installButton.classList.add('d-none');
      }
    }
    
    // Add manual install check function (for debugging/testing)
    window.checkPWAInstallability = function() {
      console.log('=== PWA Installability Check ===');
      console.log('Service Worker:', navigator.serviceWorker.getRegistration() ? 'Registered' : 'Not registered');
      console.log('Deferred Prompt:', deferredPrompt ? 'Available' : 'Not available');
      console.log('Standalone Mode:', window.matchMedia('(display-mode: standalone)').matches);
      console.log('Install Button Visible:', !installButton.classList.contains('d-none'));
      
      if (deferredPrompt) {
        console.log('✅ Install prompt is available! Click the install button or run: window.deferredPrompt.prompt()');
      } else {
        console.log('ℹ️ Install prompt not yet available. This is normal - browsers control when it appears.');
        console.log('Requirements:');
        console.log('  1. Site must be served over HTTPS (or localhost)');
        console.log('  2. Valid manifest.json');
        console.log('  3. Service worker registered');
        console.log('  4. User engagement (visit site multiple times)');
        console.log('  5. Not already installed');
        console.log('\nTry:');
        console.log('  - Visit the site multiple times');
        console.log('  - Interact with the page (scroll, click)');
        console.log('  - Check browser menu: Chrome → Install PDF Tools');
        console.log('  - Or use: window.deferredPrompt.prompt() if available');
      }
    };
  }
  
  // Offline detection
  window.addEventListener('online', () => {
    console.log('[PWA] Connection restored');
    if (typeof toastr !== 'undefined') {
      toastr.success('Connection restored', 'Online', {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      });
    }
  });
  
  window.addEventListener('offline', () => {
    console.log('[PWA] Connection lost - app will work offline');
    if (typeof toastr !== 'undefined') {
      toastr.info('You are offline. The app will continue to work.', 'Offline Mode', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    }
  });
})();

