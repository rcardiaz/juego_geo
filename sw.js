const CACHE_NAME = 'quiz-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json'
];

// Evento 'install': se activa cuando el service worker se instala.
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  // Carga los archivos en el cache.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cacheando archivos');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se activa con cada petición de red de la aplicación.
self.addEventListener('fetch', event => {
  // Responde con el recurso en cache si está disponible, si no, va a la red.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Service Worker: Sirviendo desde cache:', event.request.url);
          return response;
        }
        console.log('Service Worker: Recurso no encontrado en cache, buscando en red:', event.request.url);
        return fetch(event.request);
      })
  );
});
