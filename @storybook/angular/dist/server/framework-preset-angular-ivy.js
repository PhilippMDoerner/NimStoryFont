"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpack = exports.runNgcc = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
/**
 * Source :
 * https://github.com/angular/angular-cli/blob/ebccb5de4a455af813c5e82483db6af20666bdbd/packages/angular_devkit/build_angular/src/utils/load-esm.ts#L23
 * This uses a dynamic import to load a module which may be ESM. CommonJS code can load ESM code via
 * a dynamic import. Unfortunately, TypeScript will currently, unconditionally downlevel dynamic
 * import into a require call. require calls cannot load ESM code and will result in a runtime
 * error. To workaround this, a Function constructor is used to prevent TypeScript from changing the
 * dynamic import. Once TypeScript provides support for keeping the dynamic import this workaround
 * can be dropped.
 *
 * @param modulePath The path of the module to load.
 * @returns A Promise that resolves to the dynamically imported module.
 */
function loadEsmModule(modulePath) {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return new Function('modulePath', `return import(modulePath);`)(modulePath);
}
/**
 * Run ngcc for converting modules to ivy format before starting storybook This step is needed in
 * order to support Ivy in storybook
 *
 * Information about Ivy can be found here https://angular.io/guide/ivy
 */
const runNgcc = async () => {
    let ngcc;
    try {
        ngcc = require('@angular/compiler-cli/ngcc');
    }
    catch (error) {
        ngcc = await loadEsmModule('@angular/compiler-cli/ngcc');
    }
    ngcc.process({
        // should be async: true but does not work due to
        // https://github.com/storybookjs/storybook/pull/11157/files#r615413803
        async: false,
        basePath: (0, node_path_1.join)(process.cwd(), 'node_modules'), // absolute path to node_modules
        createNewEntryPointFormats: true, // --create-ivy-entry-points
        compileAllFormats: false, // --first-only
    });
};
exports.runNgcc = runNgcc;
const webpack = async (webpackConfig, options) => {
    const packageJsonPath = require.resolve('@angular/core/package.json');
    const packageJson = JSON.parse((0, node_fs_1.readFileSync)(packageJsonPath, 'utf8'));
    const VERSION = packageJson.version;
    const framework = await options.presets.apply('framework');
    const angularOptions = (typeof framework === 'object' ? framework.options : {});
    const angularMajorVersion = VERSION.split('.')[0];
    const isAngular16OrNewer = parseInt(angularMajorVersion, 10) >= 16;
    // Default to true, if undefined
    if (angularOptions.enableIvy === false) {
        return webpackConfig;
    }
    let extraMainFields = [];
    if (angularOptions.enableNgcc !== false && !isAngular16OrNewer) {
        // TODO: Drop if Angular 14 and 15 are not supported anymore
        (0, exports.runNgcc)();
        extraMainFields = ['es2015_ivy_ngcc', 'module_ivy_ngcc', 'main_ivy_ngcc'];
    }
    if (!isAngular16OrNewer) {
        extraMainFields.push('es2015');
    }
    return {
        ...webpackConfig,
        resolve: {
            ...webpackConfig.resolve,
            mainFields: [...extraMainFields, 'browser', 'module', 'main'],
        },
    };
};
exports.webpack = webpack;
