"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const fs = __importStar(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const web_1 = require("node:stream/web");
const virtual_module_plugin_1 = require("../../tools/esbuild/virtual-module-plugin");
const resolve_project_1 = require("../../utils/resolve-project");
const test_files_1 = require("../../utils/test-files");
const index_1 = require("../application/index");
const results_1 = require("../application/results");
const schema_1 = require("../application/schema");
const assets_middleware_1 = require("./assets-middleware");
const coverage_1 = require("./coverage");
const karma_config_1 = require("./karma-config");
const options_1 = require("./options");
const polyfills_plugin_1 = require("./polyfills-plugin");
const progress_reporter_1 = require("./progress-reporter");
const utils_1 = require("./utils");
class ApplicationBuildError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ApplicationBuildError';
    }
}
function execute(options, context, transforms) {
    const normalizedOptions = (0, options_1.normalizeOptions)(context, options);
    const karmaOptions = (0, karma_config_1.getBaseKarmaOptions)(normalizedOptions, context);
    let karmaServer;
    return new web_1.ReadableStream({
        async start(controller) {
            let init;
            try {
                init = await initializeApplication(normalizedOptions, context, karmaOptions, transforms);
            }
            catch (err) {
                if (err instanceof ApplicationBuildError) {
                    if (controller.desiredSize !== null) {
                        try {
                            controller.enqueue({ success: false, message: err.message });
                            controller.close();
                        }
                        catch {
                            // Stream controller may already be closed or cancelled
                        }
                    }
                    return;
                }
                throw err;
            }
            const [karma, karmaConfig, buildOptions, buildIterator] = init;
            // If `--watch` is explicitly enabled or if we are keeping the Karma
            // process running, we should hook Karma into the build.
            if (buildIterator) {
                (0, progress_reporter_1.injectKarmaReporter)(buildOptions, buildIterator, karmaConfig, controller);
            }
            // Close the stream once the Karma server returns.
            karmaServer = new karma.Server(karmaConfig, (exitCode) => {
                if (controller.desiredSize !== null) {
                    try {
                        controller.enqueue({ success: exitCode === 0 });
                        controller.close();
                    }
                    catch {
                        // Stream controller may already be closed or cancelled
                    }
                }
            });
            await karmaServer.start();
        },
        async cancel() {
            await karmaServer?.stop();
        },
    });
}
async function initializeApplication(options, context, karmaOptions, transforms) {
    const karma = await Promise.resolve().then(() => __importStar(require('karma')));
    const projectSourceRoot = await (0, utils_1.getProjectSourceRoot)(context);
    // Setup temporary output path and ensure it is empty
    const outputPath = node_path_1.default.join(context.workspaceRoot, 'dist/test-out', (0, node_crypto_1.randomUUID)());
    await fs.rm(outputPath, { recursive: true, force: true });
    // Setup exit cleanup for temporary directory
    const handleProcessExit = () => (0, node_fs_1.rmSync)(outputPath, { recursive: true, force: true });
    process.once('exit', handleProcessExit);
    process.once('SIGINT', handleProcessExit);
    process.once('uncaughtException', handleProcessExit);
    const { buildOptions, mainName } = await setupBuildOptions(options, context, projectSourceRoot, outputPath);
    const [buildOutput, buildIterator] = await runEsbuild(buildOptions, context, projectSourceRoot);
    const karmaConfig = await configureKarma(karma, context, karmaOptions, options, buildOptions, buildOutput, mainName, transforms);
    return [karma, karmaConfig, buildOptions, buildIterator];
}
async function setupBuildOptions(options, context, projectSourceRoot, outputPath) {
    const entryPoints = await (0, utils_1.collectEntrypoints)(options, context, projectSourceRoot);
    const mainName = 'test_main';
    if (options.main) {
        entryPoints.set(mainName, options.main);
    }
    else {
        entryPoints.set(mainName, 'angular:test-bed-init');
    }
    const instrumentForCoverage = options.codeCoverage
        ? (0, coverage_1.createInstrumentationFilter)(projectSourceRoot, (0, coverage_1.getInstrumentationExcludedPaths)(context.workspaceRoot, options.codeCoverageExclude ?? []))
        : undefined;
    const [polyfills, jasmineCleanup] = (0, utils_1.normalizePolyfills)(options.polyfills);
    for (let idx = 0; idx < jasmineCleanup.length; ++idx) {
        entryPoints.set(`jasmine-cleanup-${idx}`, jasmineCleanup[idx]);
    }
    const buildOptions = {
        assets: options.assets,
        entryPoints,
        tsConfig: options.tsConfig,
        outputPath,
        preserveSymlinks: options.preserveSymlinks,
        aot: options.aot,
        index: false,
        outputHashing: schema_1.OutputHashing.None,
        optimization: false,
        sourceMap: options.sourceMap,
        instrumentForCoverage,
        styles: options.styles,
        scripts: options.scripts,
        polyfills,
        webWorkerTsConfig: options.webWorkerTsConfig,
        watch: options.watch,
        stylePreprocessorOptions: options.stylePreprocessorOptions,
        inlineStyleLanguage: options.inlineStyleLanguage,
        fileReplacements: options.fileReplacements,
        define: options.define,
        loader: options.loader,
        externalDependencies: options.externalDependencies,
    };
    return { buildOptions, mainName };
}
async function runEsbuild(buildOptions, context, projectSourceRoot) {
    const usesZoneJS = buildOptions.polyfills?.includes('zone.js');
    let hasLocalize = false;
    try {
        const projectResolve = (0, resolve_project_1.createProjectResolver)(projectSourceRoot);
        projectResolve('@angular/localize');
        hasLocalize = true;
    }
    catch { }
    const virtualTestBedInit = (0, virtual_module_plugin_1.createVirtualModulePlugin)({
        namespace: 'angular:test-bed-init',
        loadContent: async () => {
            const contents = [
                ...(hasLocalize ? [`import '@angular/localize/init';`] : []),
                // Initialize the Angular testing environment
                `import { NgModule${usesZoneJS ? ', provideZoneChangeDetection' : ''} } from '@angular/core';`,
                `import { getTestBed } from '@angular/core/testing';`,
                `import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';`,
                `@NgModule({ providers: [${usesZoneJS ? 'provideZoneChangeDetection(), ' : ''}], })`,
                `export class TestModule {}`,
                `getTestBed().initTestEnvironment([BrowserTestingModule, TestModule], platformBrowserTesting(), {`,
                `  errorOnUnknownElements: true,`,
                `  errorOnUnknownProperties: true,`,
                `});`,
            ];
            return {
                contents: contents.join('\n'),
                loader: 'js',
                resolveDir: projectSourceRoot,
            };
        },
    });
    // Build tests with `application` builder, using test files as entry points.
    const [buildOutput, buildIterator] = await (0, utils_1.first)((0, index_1.buildApplicationInternal)(buildOptions, context, { codePlugins: [virtualTestBedInit] }), { cancel: !buildOptions.watch });
    if (buildOutput.kind === results_1.ResultKind.Failure) {
        throw new ApplicationBuildError('Build failed');
    }
    else if (buildOutput.kind !== results_1.ResultKind.Full) {
        throw new ApplicationBuildError('A full build result is required from the application builder.');
    }
    // Write test files
    await (0, test_files_1.writeTestFiles)(buildOutput.files, buildOptions.outputPath);
    return [buildOutput, buildIterator];
}
async function configureKarma(karma, context, karmaOptions, options, buildOptions, buildOutput, mainName, transforms) {
    const outputPath = buildOptions.outputPath;
    // We need to add this to the beginning *after* the testing framework has
    // prepended its files. The output path is required for each since they are
    // added later in the test process via a plugin.
    const polyfillsFile = {
        pattern: `${outputPath}/polyfills.js`,
        included: true,
        served: true,
        type: 'module',
        watched: false,
    };
    const jasmineCleanupFiles = {
        pattern: `${outputPath}/jasmine-cleanup-*.js`,
        included: true,
        served: true,
        type: 'module',
        watched: false,
    };
    karmaOptions.basePath = outputPath;
    const scriptsFiles = [];
    if (options.scripts?.length) {
        const outputScripts = new Set();
        for (const scriptEntry of options.scripts) {
            const outputName = typeof scriptEntry === 'string'
                ? 'scripts.js'
                : `${scriptEntry.bundleName ?? 'scripts'}.js`;
            if (outputScripts.has(outputName)) {
                continue;
            }
            outputScripts.add(outputName);
            scriptsFiles.push({
                pattern: `${outputPath}/${outputName}`,
                watched: false,
                included: typeof scriptEntry === 'string' ? true : scriptEntry.inject !== false,
                type: 'js',
            });
        }
    }
    karmaOptions.files ??= [];
    karmaOptions.files.push(
    // Serve global setup script.
    { pattern: `${mainName}.js`, type: 'module', watched: false }, 
    // Serve all source maps.
    { pattern: `*.map`, included: false, watched: false }, 
    // These are the test entrypoints.
    { pattern: `spec-*.js`, type: 'module', watched: false });
    if ((0, utils_1.hasChunkOrWorkerFiles)(buildOutput.files)) {
        karmaOptions.files.push(
        // Allow loading of chunk-* files but don't include them all on load.
        {
            pattern: `{chunk,worker}-*.js`,
            type: 'module',
            included: false,
            watched: false,
        });
    }
    if (options.styles?.length) {
        // Serve CSS outputs on page load, these are the global styles.
        karmaOptions.files.push({ pattern: `*.css`, type: 'css', watched: false });
    }
    const parsedKarmaConfig = await karma.config.parseConfig(options.karmaConfig, transforms?.karmaOptions ? await transforms.karmaOptions(karmaOptions) : karmaOptions, { promiseConfig: true, throwErrors: true });
    // Check for jsdom which does not support executing ESM scripts.
    // If present, remove jsdom and issue a warning.
    const updatedBrowsers = parsedKarmaConfig.browsers?.filter((browser) => browser !== 'jsdom');
    if (parsedKarmaConfig.browsers?.length !== updatedBrowsers?.length) {
        parsedKarmaConfig.browsers = updatedBrowsers;
        context.logger.warn(`'jsdom' does not support ESM code execution and cannot be used for karma testing.` +
            ` The 'jsdom' entry has been removed from the 'browsers' option.`);
    }
    // Remove the webpack plugin/framework:
    // Alternative would be to make the Karma plugin "smart" but that's a tall order
    // with managing unneeded imports etc..
    parsedKarmaConfig.plugins ??= [];
    const pluginLengthBefore = parsedKarmaConfig.plugins.length;
    parsedKarmaConfig.plugins = parsedKarmaConfig.plugins.filter((plugin) => {
        if (typeof plugin === 'string') {
            return plugin !== 'framework:@angular-devkit/build-angular';
        }
        return !plugin['framework:@angular-devkit/build-angular'];
    });
    parsedKarmaConfig.frameworks ??= [];
    parsedKarmaConfig.frameworks = parsedKarmaConfig.frameworks.filter((framework) => framework !== '@angular-devkit/build-angular');
    const pluginLengthAfter = parsedKarmaConfig.plugins.length;
    if (pluginLengthBefore !== pluginLengthAfter) {
        context.logger.warn(`Ignoring framework "@angular-devkit/build-angular" from karma config file because it's not compatible with the application builder.`);
    }
    parsedKarmaConfig.plugins.push(assets_middleware_1.AngularAssetsMiddleware.createPlugin(buildOutput));
    parsedKarmaConfig.middleware ??= [];
    parsedKarmaConfig.middleware.push(assets_middleware_1.AngularAssetsMiddleware.NAME);
    parsedKarmaConfig.plugins.push(polyfills_plugin_1.AngularPolyfillsPlugin.createPlugin(polyfillsFile, jasmineCleanupFiles, scriptsFiles));
    parsedKarmaConfig.reporters ??= [];
    parsedKarmaConfig.reporters.push(polyfills_plugin_1.AngularPolyfillsPlugin.NAME);
    // Adjust karma junit reporter outDir location to maintain previous (devkit) behavior
    // The base path for the reporter was previously the workspace root.
    // To keep the files in the same location, the reporter's output directory is adjusted
    // to be relative to the workspace root when using junit.
    if (parsedKarmaConfig.reporters?.some((reporter) => reporter === 'junit')) {
        if ('junitReporter' in parsedKarmaConfig) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const junitReporterOptions = parsedKarmaConfig['junitReporter'];
            if (junitReporterOptions.outputDir == undefined) {
                junitReporterOptions.outputDir = context.workspaceRoot;
            }
            else if (typeof junitReporterOptions.outputDir === 'string' &&
                !node_path_1.default.isAbsolute(junitReporterOptions.outputDir)) {
                junitReporterOptions.outputDir = node_path_1.default.join(context.workspaceRoot, junitReporterOptions.outputDir);
            }
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            parsedKarmaConfig['junitReporter'] = {
                outputDir: context.workspaceRoot,
            };
        }
    }
    // When using code-coverage, auto-add karma-coverage.
    // This was done as part of the karma plugin for webpack.
    if (options.codeCoverage &&
        !parsedKarmaConfig.reporters?.some((r) => r === 'coverage' || r === 'coverage-istanbul')) {
        parsedKarmaConfig.reporters = (parsedKarmaConfig.reporters ?? []).concat(['coverage']);
    }
    return parsedKarmaConfig;
}
//# sourceMappingURL=application_builder.js.map