"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathnameWithoutBasePath = pathnameWithoutBasePath;
exports.lookupMimeTypeFromRequest = lookupMimeTypeFromRequest;
exports.getDepOptimizationConfig = getDepOptimizationConfig;
exports.isAbsoluteUrl = isAbsoluteUrl;
exports.updateExternalMetadata = updateExternalMetadata;
const mrmime_1 = require("mrmime");
const node_module_1 = require("node:module");
const node_path_1 = require("node:path");
function pathnameWithoutBasePath(url, basePath) {
    const parsedUrl = new URL(url, 'http://localhost');
    const pathname = decodeURIComponent(parsedUrl.pathname);
    // slice(basePath.length - 1) to retain the trailing slash
    return basePath !== '/' && pathname.startsWith(basePath)
        ? pathname.slice(basePath.length - 1)
        : pathname;
}
function lookupMimeTypeFromRequest(url) {
    const extension = (0, node_path_1.extname)(url.split('?')[0]);
    if (extension === '.ico') {
        return 'image/x-icon';
    }
    return extension && (0, mrmime_1.lookup)(extension);
}
function getDepOptimizationConfig({ disabled, exclude, include, prebundleTransformer, loader, thirdPartySourcemaps, define = {}, }) {
    const config = {
        // Exclude any explicitly defined dependencies (currently build defined externals)
        exclude,
        // NB: to disable the deps optimizer, set optimizeDeps.noDiscovery to true and optimizeDeps.include as undefined.
        // Include all implict dependencies from the external packages internal option
        include: disabled ? undefined : include,
        noDiscovery: disabled,
        rolldownOptions: {
            transform: {
                define,
            },
            moduleTypes: loader,
            resolve: {
                extensions: ['.mjs', '.js', '.cjs'],
            },
            plugins: [
                {
                    name: `angular-vite-optimize-deps${thirdPartySourcemaps ? '-vendor-sourcemap' : ''}`,
                    load: {
                        filter: { id: /\.[cm]?js$/ },
                        async handler(id) {
                            const code = await prebundleTransformer.transformFile(id);
                            return { code: Buffer.from(code).toString('utf-8') };
                        },
                    },
                },
            ],
        },
    };
    return config;
}
function isAbsoluteUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
function updateExternalMetadata(result, externalMetadata, externalDependencies, explicitPackagesOnly = false) {
    if (!result.detail?.['externalMetadata']) {
        return;
    }
    const { implicitBrowser, implicitServer, explicit } = result.detail['externalMetadata'];
    const implicitServerFiltered = implicitServer.filter((m) => !(0, node_module_1.isBuiltin)(m) && !isAbsoluteUrl(m) && !m.endsWith('.json'));
    const implicitBrowserFiltered = implicitBrowser.filter((m) => !isAbsoluteUrl(m) && !m.endsWith('.json'));
    const explicitBrowserFiltered = explicitPackagesOnly
        ? explicit.filter((m) => !isAbsoluteUrl(m))
        : explicit;
    // Empty Arrays to avoid growing unlimited with every re-build.
    externalMetadata.explicitBrowser.length = 0;
    externalMetadata.explicitServer.length = 0;
    externalMetadata.implicitServer.length = 0;
    externalMetadata.implicitBrowser.length = 0;
    const externalDeps = externalDependencies ?? [];
    externalMetadata.explicitBrowser.push(...explicitBrowserFiltered, ...externalDeps);
    externalMetadata.explicitServer.push(...explicitBrowserFiltered, ...externalDeps, ...node_module_1.builtinModules);
    externalMetadata.implicitServer.push(...implicitServerFiltered);
    externalMetadata.implicitBrowser.push(...implicitBrowserFiltered);
    // The below needs to be sorted as Vite uses these options as part of the hashing invalidation algorithm.
    // See: https://github.com/vitejs/vite/blob/0873bae0cfe0f0718ad2f5743dd34a17e4ab563d/packages/vite/src/node/optimizer/index.ts#L1203-L1239
    externalMetadata.explicitBrowser.sort();
    externalMetadata.explicitServer.sort();
    externalMetadata.implicitServer.sort();
    externalMetadata.implicitBrowser.sort();
}
//# sourceMappingURL=utils.js.map