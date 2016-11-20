var webpack              = require('webpack');
var HtmlWebpackPlugin    = require('html-webpack-plugin');
var ExtractTextPlugin    = require('extract-text-webpack-plugin');
var helpers              = require('./helpers');
var precss               = require('precss');
var autoprefixer         = require('autoprefixer');
var prod                 = process.env.ENV === 'production'

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
                    .concat(prod ? [] : '@angularclass/hmr-loader'),
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]',
                exclude: /node_modules/
            },{
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'to-string!style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'to-string!css-loader!postcss-loader!sass-loader'
                //loader: ExtractTextPlugin.extract('to-string','css-loader','postcss-loader','sass-loader')
            }

        ]
    },

    postcss: function () {
        return {
             defaults: [precss, autoprefixer],
             cleaner:  [autoprefixer({ browsers: [] })]
        };
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};



