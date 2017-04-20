'use strict';

var webpack = require('webpack');

module.exports = {
    context: __dirname + '/client',
    entry: {
        app: './app.js',
        vendor: [
            'jquery',
            'angular',
            'angular-route',
            'bootstrap'
        ]
    },
    output: {
        path: __dirname + '/client/dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: ['html-loader']
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
        // new webpack.optimize.UglifyJsPlugin({mangle: false}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};