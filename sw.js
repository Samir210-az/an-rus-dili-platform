const CACHE_NAME = 'rus-dili-v3';
const ASSETS = [
  './',
  './index.html',
  './lessons-data.js?v=20260725b',
  './yenilenme.js',
  './manifest.json',
  './assets/logo.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-192.png?v=2',
  './assets/icon-512.png?v=2'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // Network-first: hər zaman ən son versiyanı yükləməyə çalış, yalnız offline olanda keşdən ver
  e.respondWith(
    fetch(e.request).then(res => {
      if (res && res.status === 200) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
