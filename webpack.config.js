'use strict';

var webpack = require('webpack');

module.exports = {
    context: __dirname + '/client',
    entry: {
        app: './app.js',
        vendor: ['./client/bower_components/jquery/dist/jquery.js',
                 './client/bower_components/angular/angular.js',
                 './client/bower_components/angular-route/angular-route.js',
                 './client/bower_components/bootstrap/dist/js/bootstrap.js'
                 ]
    },
    output: {
        path: __dirname + '/dist/js',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
    ]
};