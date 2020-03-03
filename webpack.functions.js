// this is an override webpack config file for the netlify-lambda build command to use the proper babel config
// otherwise the babel.config.js provided by vue-cli will be used which will give errors
module.exports = {
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-typescript", "@babel/preset-env"],
                    },
                },
            },
        ],
    },
};