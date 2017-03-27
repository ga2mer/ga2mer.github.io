const production = process.argv.includes('--production');

const { OptimizeJSPlugin, FuseBox, BabelPlugin, PostCSS, CSSPlugin } = require('fuse-box');
const PostCSSPlugins = require('./postcss.config').plugins;
const PostCSSPlugin = PostCSS(PostCSSPlugins);
PostCSSPlugin.test = /\.scss$/;
PostCSSPlugin.init = (context) => {
    context.allowExtension('.scss');
};
const StaticPlugin = require('./fsbx/StaticPlugin');
const BabiliPlugin = require('./fsbx/BabiliPlugin');
const PurifyCSSPlugin = require('./fsbx/PurifyCSSPlugin');
const config = {
    homeDir: 'src',
    output: 'assets/$name.js',
    plugins: [
        StaticPlugin({
            extensions: ['.png'],
            distFolder: 'assets'
        }),
        BabelPlugin({
            config: {
                presets: [
                    'stage-0',
                    'react'
                ],
                plugins: ['transform-es2015-modules-commonjs', ['import', { libraryName: 'antd' }]]
            }
        }),
        [PostCSSPlugin, CSSPlugin({
            outFile: () => 'assets/style.css',
            inject: false
        })]
    ]
};
if (production) {
    config.plugins.push(PurifyCSSPlugin({
        bundles: ['app', 'vendor'],
        homePath: __dirname,
        styleFile: 'assets/style.css',
        purifyOptions: {
            minify: true
        }
    }), OptimizeJSPlugin(), BabiliPlugin());
}
const fuse = FuseBox.init(config);
const vendor = fuse.bundle('vendor').instructions(' ~ main.js');
const app = fuse.bundle('app').instructions(' !> [main.js]');;
if (!production) {
    vendor.watch().hmr();
    app.watch().hmr().sourceMaps(true);
};
if (!production) {
    fuse.dev({
        port: 4444,
        httpServer: false
    });
}
fuse.run();