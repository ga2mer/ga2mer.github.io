const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-smart-import');
const postcssNested = require('postcss-nested');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssRemoveEmpty = require('postcss-discard-empty');
const postcssRemoveComments = require('postcss-discard-comments');
const postcssRemoveDuiplicate = require('postcss-discard-duplicates');
module.exports = {
    plugins: [
        postcssImport(),
        postcssMixins(),
        postcssSimpleVars(),
        postcssNested(),
        autoprefixer({
            browsers: ['last 2 versions', '> 2%']
        }),
        postcssRemoveComments({removeAll: true}),
        postcssRemoveEmpty(),
        postcssRemoveDuiplicate()
    ]
};
