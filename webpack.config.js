const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const app = {
    entry: './src/main.js',
    bundle: '[name].bundle.js',
    dest: 'assets'
};

const stats = {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: {
        green: '\u001b[32m',
    },
};

var config = {
    performance: false,
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
    context: __dirname,
    entry: [app.entry],
    stats,
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
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            async: false,
            minChunks(module, countIgnored) {
                return module.resource && module.resource.indexOf(appDir) === -1;
            }
        }),*/
        new ExtractTextPlugin('style.css')
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        cacheDirectory: true,
                        presets: [
                            ['@babel/stage-0', {
                                loose: false,
                                useBuiltIns: false,
                                decoratorsLegacy: true,
                                pipelineProposal: 'minimal'
                            }],
                            '@babel/react'
                        ],
                        plugins: [['import', { libraryName: 'antd' }]]
                    }
                }
            }, {
                test: /\.(s)?css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader' })
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
    config.plugins.push(new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        canPrint: true
    }), new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }), new MinifyPlugin({ mangle: true }, { comments: false }));
}

module.exports = config;