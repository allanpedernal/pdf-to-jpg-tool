// Service Worker for PDF Tools PWA
// Version 1.0.0
const CACHE_NAME = 'pdf-tools-v1.0.0';
const RUNTIME_CACHE = 'pdf-tools-runtime-v1.0.0';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/privacy-policy.html',
  '/terms-of-service.html',
  '/manifest.json',
  '/favicon.svg',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/shared/styles.css',
  '/shared/navigation.js',
  '/style.css',
  '/app.js',
  '/tools-config.js',
  '/tools.js',
  '/tool-implementations.js',
  '/robots.txt',
  '/sitemap.xml'
];

// External resources to cache (CDN assets)
const EXTERNAL_ASSETS = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css',
  'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css',
  'https://code.jquery.com/jquery-3.7.1.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        // Cache static assets
        return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })))
          .then(() => {
            // Cache external assets separately (may fail, that's ok)
            return Promise.allSettled(
              EXTERNAL_ASSETS.map(url => 
                fetch(url).then(response => {
                  if (response.ok) {
                    return cache.put(url, response);
                  }
                }).catch(() => {
                  // Ignore failures for external assets
                  console.log(`[Service Worker] Failed to cache external asset: ${url}`);
                })
              )
            );
          });
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches that don't match current version
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Strategy: Cache First for static assets, Network First for HTML pages
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // For HTML pages, try network first, then cache
        if (request.headers.get('accept')?.includes('text/html')) {
          return fetch(request)
            .then((networkResponse) => {
              // Cache successful responses
              if (networkResponse && networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                caches.open(RUNTIME_CACHE).then((cache) => {
                  cache.put(request, responseClone);
                });
              }
              return networkResponse;
            })
            .catch(() => {
              // Network failed, return cached version if available
              if (cachedResponse) {
                return cachedResponse;
              }
              // If no cache, return offline page
              return caches.match('/index.html');
            });
        }
        
        // For static assets (CSS, JS, images), use cache first
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Cache successful responses
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed, return offline fallback
            if (request.destination === 'image') {
              // Return a placeholder or cached image
              return new Response('', { status: 404 });
            }
            // For other resources, return cached index.html as fallback
            return caches.match('/index.html');
          });
      })
  );
});

// Handle background sync (for future offline functionality)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  // Future: Implement offline queue processing
});

// Handle push notifications (for future features)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received');
  // Future: Implement push notifications
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

