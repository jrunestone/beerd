workbox.routing.registerRoute('/.netlify/functions/beers', workbox.strategies.cacheFirst({
    cacheName: 'api-cache'
}));