const fs = require('fs');
const path = require('path');
const purify = require('purify-css');
class PurifyCSSPlugin {
    constructor(options) {
        this.options = options || {};
        this.bundles = [];
    }
    purify() {
        const cssPath = path.join(this.options.homePath, this.options.styleFile);
        const css = fs.readFileSync(cssPath, 'utf-8');
        let data = '';
        this.bundles.forEach((item) => {
            data += fs.readFileSync(item);
        });
        const result = purify(data, css, this.options.purifyOptions);
        fs.writeFileSync(cssPath, result);
    }
    postBundle(context) {
        if(this.options.bundles.includes(context.bundle.name)) {
            this.bundles.push(path.join(context.output.dir, `${context.output.filename}.js`));
        }
        if (this.bundles.length == this.options.bundles.length) {
            this.purify();
        }
    }
}
module.exports = (options) => new PurifyCSSPlugin(options);