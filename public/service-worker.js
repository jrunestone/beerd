importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const workbox = new WorkboxSW();

workbox.routing.registerRoute('/.netlify/functions/beers', workbox.strategies.cacheFirst({
    cacheName: 'api-cache'
}));