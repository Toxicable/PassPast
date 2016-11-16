var webpack             = require('webpack');
var webpackMerge        = require('webpack-merge');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var common              = require('./webpack.common.js');
var helpers             = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

var path = require('path');
var wwwroot = path.resolve(__dirname, '../../wwwroot');

module.exports  = webpackMerge(common, {
    devtool: 'source-map',

    output: {
        path: wwwroot,
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
        minimize: false // workaround for ng2
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            compress: { warnings: false },
            minimize: true,
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)

            }
        })
    ]
});