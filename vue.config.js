module.exports = {
    outputDir: 'dist/web',

    pwa: {
        workboxPluginMode: 'InjectManifest',

        workboxOptions: {
            swSrc: 'public/service-worker.js'
        }
    }
};