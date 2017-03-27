const { BundleSource } = require('fuse-box/dist/commonjs/BundleSource');

class BabiliPlugin {
    constructor(options) {
        this.options = options || {};
    }
    postBundle(context) {
        const babelCore = require('babel-core');

        const concat = context.source.getResult();
        const source = concat.content.toString();
        const sourceMap = concat.sourceMap;

        const newSource = new BundleSource(context);
        context.source = newSource;

        const newConcat = context.source.getResult();

        let timeStart = process.hrtime();

        const result = babelCore.transform(source, {
            presets: ['babili']
        });

        let took = process.hrtime(timeStart);
        let bytes = Buffer.byteLength(result.code, 'utf8');

        context.log.echoBundleStats('Bundle (Uglified)', bytes, took);

        newConcat.add(null, result.code, result.map || sourceMap);
    }
}
module.exports = (options) => new BabiliPlugin(options);