const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const appDir = path.join(__dirname, 'src');
const app = {
    entry: './src/main.jsx',
    bundle: 'app.js',
    dest: 'assets'
};
var config = {
    watch: false,
    context: __dirname,
    entry: [app.entry],
    output: {
        filename: path.join(app.bundle),
        publicPath: '/assets/',
        path: path.join(__dirname, app.dest)
    },
    resolve: {
        extensions: [
            '', '.js', '.jsx'
        ],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
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
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    plugins: ['transform-runtime']
                }
            }, {
                test: /\.(s)?css$/,
                loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader!postcss-loader'})
            }, {
                test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                loader: 'url?prefix=font/&limit=10000&name=assets/[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    postcss(wp) {
        return [
            postcssImport({addDependencyTo: wp}),
            postcssMixins(),
            postcssSimpleVars(),
            postcssNested(),
            autoprefixer({
                browsers: ['last 2 versions', '> 2%']
            })
        ];
    }
};
if (process.env.NODE_ENV == 'production') {
    config.plugins.push(new webpack.LoaderOptionsPlugin({minimize: true, debug: false}), new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        comments: false,
        sourceMap: false,
        mangle: false
    }), new webpack.optimize.DedupePlugin());
}

module.exports = config;
