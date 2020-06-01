const path = require('path');

module.exports = {
    outputDir: 'dist/web',

    pwa: {
        workboxPluginMode: 'InjectManifest',

        workboxOptions: {
            swSrc: 'public/service-worker.js'
        }
    },

    configureWebpack: {
        resolve: {
            alias: {
                bootstrap: path.resolve(__dirname, 'bootstrap/')
            }
        }
    }
};