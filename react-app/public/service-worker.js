const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html', 'images/background.jpg'];


//install sw
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('opened cache');
      return cache.addAll(urlsToCache);
    }),
  );
});

// listen for requests
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(async () => {
      try {
        return fetch(event.request);
      } catch (e) {
        return await caches.match('offline.html');
      }
    }),
  );
});

// activate sw
this.addEventListener('activate', (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete.name;
          }
        }),
      ),
    ),
  );
});
