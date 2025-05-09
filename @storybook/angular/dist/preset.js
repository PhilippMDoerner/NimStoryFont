"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescript = exports.core = exports.previewAnnotations = exports.addons = void 0;
const node_path_1 = require("node:path");
const getAbsolutePath = (input) => (0, node_path_1.dirname)(require.resolve((0, node_path_1.join)(input, 'package.json')));
exports.addons = [
    require.resolve('./server/framework-preset-angular-cli'),
    require.resolve('./server/framework-preset-angular-ivy'),
    require.resolve('./server/framework-preset-angular-docs'),
];
const previewAnnotations = (entries = [], options) => {
    const annotations = [...entries, require.resolve('./client/config')];
    if (options.enableProdMode) {
        annotations.unshift(require.resolve('./client/preview-prod'));
    }
    return annotations;
};
exports.previewAnnotations = previewAnnotations;
const core = async (config, options) => {
    const framework = await options.presets.apply('framework');
    return {
        ...config,
        builder: {
            name: getAbsolutePath('@storybook/builder-webpack5'),
            options: typeof framework === 'string' ? {} : framework.options.builder || {},
        },
    };
};
exports.core = core;
const typescript = async (config) => {
    return {
        ...config,
        skipCompiler: true,
    };
};
exports.typescript = typescript;
