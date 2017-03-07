const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Purify = require('purifycss-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const appDir = path.join(__dirname, 'src');
const app = {
    entry: './src/main.jsx',
    bundle: 'app.js',
    dest: 'assets'
};
var config = {
    performance: false,
    context: __dirname,
    entry: [app.entry],
    output: {
        filename: path.join(app.bundle),
        publicPath: '/assets/',
        path: path.join(__dirname, app.dest)
    },
    resolve: {
        extensions: [
            '.js', '.jsx'
        ],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            async: false,
            minChunks(module, countIgnored) {
                return module.resource && module.resource.indexOf(appDir) === -1;
            }
        }),
        new ExtractTextPlugin('style.css')
    ],
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    cacheDirectory: true,
                    presets: [
                        'stage-0',
                        'react'
                    ],
                    plugins: [['import', { libraryName: 'antd' }], 'transform-runtime']
                }
            }, {
                test: /\.(s)?css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!postcss-loader'})
            }, {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader: 'url?prefix=font/&limit=10000&name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=[name].[ext]'
            }
        ]
    }
};
if (process.env.NODE_ENV == 'production') {
    config.plugins.push(new Purify({
        basePath: __dirname,
        purifyOptions: {
            minify: true
        },
        paths: ['index.html']
    }), new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }), new BabiliPlugin({mangle: true}, {comments: false}));
}

module.exports = config;
