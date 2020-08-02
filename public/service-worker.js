importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.routing.registerRoute('/.netlify/functions/beers', new workbox.strategies.CacheFirst({
    cacheName: 'api-cache'
}));

workbox.routing.registerRoute(new RegExp('https://untappd\\.akamaized\\.net/.+\\.jpe?g'), new workbox.strategies.CacheFirst({
    cacheName: 'image-cache'
}));