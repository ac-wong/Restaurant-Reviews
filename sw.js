var staticCacheName = 'rr-static-v1';

// this installs the service worker and create the caches
self.addEventListener('install', function(event) {
 event.waitUntil(
   // open cache
   // add cache the urls
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/restaurant.html',
       '/data/restaurants.json',
       '/js/dbhelper.js',
       '/js/main.js',
       '/js/restaurant_info.js',
       '/css/styles.css',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg'
     ]);
   }).catch(function(error) {
     console.log(error);
   })
 );
});

// this adds a listener for fetch events
self.addEventListener('fetch', function(event) {
  // respond with an entry from the cache if there is one
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});


self.addEventListener('activate', function(event) {
  // respond with an entry from the cache if there is one
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('rr-') &&
              cacheName != staticCacheName;
        }).map(function(cacheName) {
          return cache.delete(cacheName);
        })
      );
    })
  );
});
