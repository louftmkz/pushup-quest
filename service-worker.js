// Liegestütz Tracker Service Worker
// Versionsnummer bei jedem Deployment erhöhen → Cache wird automatisch geleert
const CACHE_NAME = 'pushup-tracker-v3';
const ASSETS = [
'./index.html',
'./manifest.json',
'./icon-192.png',
'./icon-512.png',
'./favicon.svg',
'https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap'
];

self.addEventListener('install', (event) => {
event.waitUntil(
  caches.open(CACHE_NAME)
    .then(cache => cache.addAll(ASSETS).catch(() => {}))
    .then(() => self.skipWaiting())
);
});

self.addEventListener('activate', (event) => {
event.waitUntil(
  caches.keys()
    .then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
    .then(() => self.clients.claim())
);
});

// Network-first: immer frische Daten, Cache nur als Offline-Fallback
self.addEventListener('fetch', (event) => {
if (event.request.method !== 'GET') return;
event.respondWith(
  fetch(event.request)
    .then(response => {
      if (response.ok && response.type === 'basic') {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
      }
      return response;
    })
    .catch(() => caches.match(event.request))
);
});
