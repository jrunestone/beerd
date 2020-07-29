import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

registerRoute('/.netlify/functions/beers', new CacheFirst({
    cacheName: 'api-cache'
}));