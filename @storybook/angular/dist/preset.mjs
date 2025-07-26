import { dirname, join } from 'node:path';
const getAbsolutePath = (input) => dirname(require.resolve(join(input, 'package.json')));
export const addons = [
    require.resolve('./server/framework-preset-angular-cli'),
    require.resolve('./server/framework-preset-angular-ivy'),
];
export const previewAnnotations = async (entries = [], options) => {
    const annotations = [...entries, require.resolve('./client/config.mjs')];
    if (options.enableProdMode) {
        annotations.unshift(require.resolve('./client/preview-prod.mjs'));
    }
    const docsConfig = await options.presets.apply('docs', {}, options);
    const docsEnabled = Object.keys(docsConfig).length > 0;
    if (docsEnabled) {
        annotations.push(require.resolve('./client/docs/config.mjs'));
    }
    return annotations;
};
export const core = async (config, options) => {
    const framework = await options.presets.apply('framework');
    return {
        ...config,
        builder: {
            name: getAbsolutePath('@storybook/builder-webpack5'),
            options: typeof framework === 'string' ? {} : framework.options.builder || {},
        },
    };
};
export const typescript = async (config) => {
    return {
        ...config,
        skipCompiler: true,
    };
};
