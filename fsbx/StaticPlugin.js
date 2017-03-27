const fs = require('fs-extra');
const path = require('path');
const { extractExtension, string2RegExp, ensureDir } = require('fuse-box/dist/commonjs/Utils');
const { utils } = require('realm-utils');
class StaticPlugin {
    constructor(options) {
        if (options.distFolder) {
            this.distFolderAbsolute = ensureDir(options.distFolder);
            this.distFolder = options.distFolder;
        } else {
            throw 'distFolder is not set';
        }
        if (utils.isPlainObject(options)) {
            if ('extensions' in (options || {})) {
                this.extensions = [];
                options.extensions.forEach((str) => {
                    this.extensions.push('.' + extractExtension(str));
                });
                this.test = string2RegExp(options.extensions.join('|'));
            }
        }
    }
    init(context) {
        this.context = context;
        if (Array.isArray(this.extensions)) {
            return this.extensions.forEach((ext) => context.allowExtension(ext));
        }
    }
    transform(file) {
        file.loadContents();
        const { base } = path.parse(file.absPath);
        const outputPath = path.join(this.distFolderAbsolute, base);
        try {
            fs.copySync(file.absPath, outputPath);
        } catch (err) {
            console.error(err);
        }
        file.contents = `module.exports = "${path.join(this.distFolder, base)}"`;
    }
}
module.exports = (options) => new StaticPlugin(options);