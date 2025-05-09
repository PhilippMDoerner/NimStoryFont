import { dirname, join } from 'node:path';
const getAbsolutePath = (input) => dirname(require.resolve(join(input, 'package.json')));
export const addons = [
    require.resolve('./server/framework-preset-angular-cli'),
    require.resolve('./server/framework-preset-angular-ivy'),
    require.resolve('./server/framework-preset-angular-docs'),
];
export const previewAnnotations = (entries = [], options) => {
    const annotations = [...entries, require.resolve('./client/config')];
    if (options.enableProdMode) {
        annotations.unshift(require.resolve('./client/preview-prod'));
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
