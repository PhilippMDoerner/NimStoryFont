"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logBuildStats = logBuildStats;
exports.getChunkNameFromMetafile = getChunkNameFromMetafile;
exports.calculateEstimatedTransferSizes = calculateEstimatedTransferSizes;
exports.withSpinner = withSpinner;
exports.withNoProgress = withNoProgress;
exports.getFeatureSupport = getFeatureSupport;
exports.emitFilesToDisk = emitFilesToDisk;
exports.transformSupportedBrowsersToTargets = transformSupportedBrowsersToTargets;
exports.getSupportedNodeTargets = getSupportedNodeTargets;
exports.createJsonBuildManifest = createJsonBuildManifest;
exports.logMessages = logMessages;
exports.isZonelessApp = isZonelessApp;
exports.getEntryPointName = getEntryPointName;
const esbuild_1 = require("esbuild");
const listr2_1 = require("listr2");
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
const node_zlib_1 = require("node:zlib");
const semver_1 = require("semver");
const schema_1 = require("../../builders/application/schema");
const stats_table_1 = require("../../utils/stats-table");
const bundler_files_1 = require("./bundler-files");
function logBuildStats(metafile, outputFiles, initial, budgetFailures, colors, changedFiles, estimatedTransferSizes, ssrOutputEnabled, verbose) {
    // Remove the i18n subpath in case the build is using i18n.
    // en-US/main.js -> main.js
    const normalizedChangedFiles = new Set([...(changedFiles ?? [])].map((f) => (0, node_path_1.basename)(f)));
    const browserStats = [];
    const serverStats = [];
    let unchangedCount = 0;
    let componentStyleChange = false;
    for (const { path: file, size, type } of outputFiles) {
        // Only display JavaScript and CSS files
        if (!/\.(?:css|m?js)$/.test(file)) {
            continue;
        }
        // Show only changed files if a changed list is provided
        if (normalizedChangedFiles.size && !normalizedChangedFiles.has(file)) {
            ++unchangedCount;
            continue;
        }
        const isPlatformServer = type === bundler_files_1.BuildOutputFileType.ServerApplication || type === bundler_files_1.BuildOutputFileType.ServerRoot;
        if (isPlatformServer && !ssrOutputEnabled) {
            // Only log server build stats when SSR is enabled.
            continue;
        }
        // Skip logging external component stylesheets used for HMR
        if (metafile.outputs[file] && 'ng-component' in metafile.outputs[file]) {
            componentStyleChange = true;
            continue;
        }
        const name = initial.get(file)?.name ?? getChunkNameFromMetafile(metafile, file);
        const stat = {
            initial: initial.has(file),
            stats: [file, name ?? '-', size, estimatedTransferSizes?.get(file) ?? '-'],
        };
        if (isPlatformServer) {
            serverStats.push(stat);
        }
        else {
            browserStats.push(stat);
        }
    }
    if (browserStats.length > 0 || serverStats.length > 0) {
        const tableText = (0, stats_table_1.generateEsbuildBuildStatsTable)([browserStats, serverStats], colors, unchangedCount === 0, !!estimatedTransferSizes, budgetFailures, verbose);
        return tableText + '\n';
    }
    else if (changedFiles !== undefined) {
        if (componentStyleChange) {
            return '\nComponent stylesheet(s) changed.\n';
        }
        else {
            return '\nNo output file changes.\n';
        }
    }
    if (unchangedCount > 0) {
        return `Unchanged output files: ${unchangedCount}`;
    }
    return '';
}
function getChunkNameFromMetafile(metafile, file) {
    if (metafile.outputs[file]?.entryPoint) {
        return getEntryPointName(metafile.outputs[file].entryPoint);
    }
}
async function calculateEstimatedTransferSizes(outputFiles) {
    const sizes = new Map();
    if (outputFiles.length <= 0) {
        return sizes;
    }
    return new Promise((resolve, reject) => {
        let completeCount = 0;
        for (const outputFile of outputFiles) {
            // Only calculate JavaScript and CSS files
            if (!outputFile.path.endsWith('.js') && !outputFile.path.endsWith('.css')) {
                ++completeCount;
                continue;
            }
            // Skip compressing small files which may end being larger once compressed and will most likely not be
            // compressed in actual transit.
            if (outputFile.contents.byteLength < 1024) {
                sizes.set(outputFile.path, outputFile.contents.byteLength);
                ++completeCount;
                continue;
            }
            // Directly use the async callback function to minimize the number of Promises that need to be created.
            (0, node_zlib_1.brotliCompress)(outputFile.contents, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                sizes.set(outputFile.path, result.byteLength);
                if (++completeCount >= outputFiles.length) {
                    resolve(sizes);
                }
            });
        }
        // Covers the case where no files need to be compressed
        if (completeCount >= outputFiles.length) {
            resolve(sizes);
        }
    });
}
async function withSpinner(text, action) {
    let result;
    const taskList = new listr2_1.Listr([
        {
            title: text,
            async task() {
                result = await action();
            },
        },
    ], { rendererOptions: { clearOutput: true } });
    await taskList.run();
    return result;
}
async function withNoProgress(text, action) {
    return action();
}
/**
 * Generates a syntax feature object map for Angular applications.
 * A full set of feature names can be found here: https://esbuild.github.io/api/#supported
 * @param nativeAsyncAwait Indicate whether to support native async/await.
 * @returns An object that can be used with the esbuild build `supported` option.
 */
function getFeatureSupport(nativeAsyncAwait) {
    return {
        // Native async/await is not supported with Zone.js. Disabling support here will cause
        // esbuild to downlevel async/await, async generators, and for await...of to a Zone.js supported form.
        'async-await': nativeAsyncAwait,
        // Workaround for an esbuild minification bug when async-await is disabled and the target is es2019+.
        // The catch binding for downleveled for-await will be incorrectly removed in this specific situation.
        ...(!nativeAsyncAwait ? { 'optional-catch-binding': false } : {}),
        // V8 currently has a performance defect involving object spread operations that can cause signficant
        // degradation in runtime performance. By not supporting the language feature here, a downlevel form
        // will be used instead which provides a workaround for the performance issue.
        // For more details: https://bugs.chromium.org/p/v8/issues/detail?id=11536
        'object-rest-spread': false,
    };
}
const MAX_CONCURRENT_WRITES = 64;
async function emitFilesToDisk(files, writeFileCallback) {
    // Write files in groups of MAX_CONCURRENT_WRITES to avoid too many open files
    for (let fileIndex = 0; fileIndex < files.length;) {
        const groupMax = Math.min(fileIndex + MAX_CONCURRENT_WRITES, files.length);
        const actions = [];
        while (fileIndex < groupMax) {
            actions.push(writeFileCallback(files[fileIndex++]));
        }
        await Promise.all(actions);
    }
}
/**
 * Transform browserlists result to esbuild target.
 * @see https://esbuild.github.io/api/#target
 */
function transformSupportedBrowsersToTargets(supportedBrowsers) {
    const transformed = [];
    // https://esbuild.github.io/api/#target
    const esBuildSupportedBrowsers = new Set([
        'chrome',
        'edge',
        'firefox',
        'ie',
        'ios',
        'node',
        'opera',
        'safari',
    ]);
    for (const browser of supportedBrowsers) {
        let [browserName, version] = browser.toLowerCase().split(' ');
        // browserslist uses the name `ios_saf` for iOS Safari whereas esbuild uses `ios`
        if (browserName === 'ios_saf') {
            browserName = 'ios';
        }
        // browserslist uses ranges `15.2-15.3` versions but only the lowest is required
        // to perform minimum supported feature checks. esbuild also expects a single version.
        [version] = version.split('-');
        if (esBuildSupportedBrowsers.has(browserName)) {
            if (browserName === 'safari' && version === 'tp') {
                // esbuild only supports numeric versions so `TP` is converted to a high number (999) since
                // a Technology Preview (TP) of Safari is assumed to support all currently known features.
                version = '999';
            }
            else if (!version.includes('.')) {
                // A lone major version is considered by esbuild to include all minor versions. However,
                // browserslist does not and is also inconsistent in its `.0` version naming. For example,
                // Safari 15.0 is named `safari 15` but Safari 16.0 is named `safari 16.0`.
                version += '.0';
            }
            transformed.push(browserName + version);
        }
    }
    return transformed;
}
const SUPPORTED_NODE_VERSIONS = '^22.22.3 || ^24.15.0 || >=26.0.0';
/**
 * Transform supported Node.js versions to esbuild target.
 * @see https://esbuild.github.io/api/#target
 */
function getSupportedNodeTargets() {
    if (SUPPORTED_NODE_VERSIONS.charAt(0) === '0') {
        // Unlike `pkg_npm`, `ts_library` which is used to run unit tests does not support substitutions.
        return [];
    }
    return SUPPORTED_NODE_VERSIONS.split('||').map((v) => 'node' + (0, semver_1.coerce)(v)?.version);
}
async function createJsonBuildManifest(result, normalizedOptions) {
    const { colors: color, outputOptions: { base, server, browser }, ssrOptions, outputMode, } = normalizedOptions;
    const { warnings, errors, prerenderedRoutes } = result;
    const manifest = {
        errors: errors.length ? await (0, esbuild_1.formatMessages)(errors, { kind: 'error', color }) : [],
        warnings: warnings.length ? await (0, esbuild_1.formatMessages)(warnings, { kind: 'warning', color }) : [],
        outputPaths: {
            root: (0, node_url_1.pathToFileURL)(base),
            browser: (0, node_url_1.pathToFileURL)((0, node_path_1.join)(base, browser)),
            server: outputMode !== schema_1.OutputMode.Static && ssrOptions
                ? (0, node_url_1.pathToFileURL)((0, node_path_1.join)(base, server))
                : undefined,
        },
        prerenderedRoutes,
    };
    return JSON.stringify(manifest, undefined, 2);
}
async function logMessages(logger, executionResult, color, jsonLogs) {
    const { warnings, errors, logs } = executionResult;
    if (logs.length) {
        logger.info(logs.join('\n'));
    }
    if (jsonLogs) {
        return;
    }
    if (warnings.length) {
        logger.warn((await (0, esbuild_1.formatMessages)(warnings, { kind: 'warning', color })).join('\n'));
    }
    if (errors.length) {
        logger.error((await (0, esbuild_1.formatMessages)(errors, { kind: 'error', color })).join('\n'));
    }
}
/**
 * Ascertain whether the application operates without `zone.js`, we currently rely on the polyfills setting to determine its status.
 * If a file with an extension is provided or if `zone.js` is included in the polyfills, the application is deemed as not zoneless.
 * @param polyfills An array of polyfills
 * @returns true, when the application is considered as zoneless.
 */
function isZonelessApp(polyfills) {
    // TODO: Instead, we should rely on the presence of zone.js in the polyfills build metadata.
    return !polyfills?.some((p) => p === 'zone.js' || /\.[mc]?[jt]s$/.test(p));
}
function getEntryPointName(entryPoint) {
    return (0, node_path_1.basename)(entryPoint)
        .replace(/(.*:)/, '') // global:bundle.css  -> bundle.css
        .replace(/\.[cm]?[jt]s$/, '')
        .replace(/[\\/.]/g, '-');
}
//# sourceMappingURL=utils.js.map