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
exports.createVitestConfigPlugin = createVitestConfigPlugin;
exports.createVitestPlugins = createVitestPlugins;
const node_assert_1 = __importDefault(require("node:assert"));
const promises_1 = require("node:fs/promises");
const node_os_1 = require("node:os");
const node_path_1 = __importDefault(require("node:path"));
const assets_middleware_1 = require("../../../../tools/vite/middlewares/assets-middleware");
const path_1 = require("../../../../utils/path");
const resolve_project_1 = require("../../../../utils/resolve-project");
const browser_provider_1 = require("./browser-provider");
async function findTestEnvironment(projectResolver) {
    try {
        projectResolver('happy-dom');
        return 'happy-dom';
    }
    catch {
        // happy-dom is not installed, fallback to jsdom
        return 'jsdom';
    }
}
function determineCoverageProvider(browser, testConfig, optionsCoverageEnabled, projectSourceRoot) {
    let determinedProvider = testConfig?.coverage?.provider;
    if (!determinedProvider && (optionsCoverageEnabled || testConfig?.coverage?.enabled)) {
        const browsersToCheck = getBrowsersToCheck(browser, testConfig?.browser);
        const hasNonChromium = browsersToCheck.some((b) => !['chrome', 'chromium', 'edge'].includes((0, browser_provider_1.normalizeBrowserName)(b).browser));
        if (hasNonChromium) {
            determinedProvider = 'istanbul';
        }
        else {
            const projectResolve = (0, resolve_project_1.createProjectResolver)(projectSourceRoot);
            const checkInstalled = (pkg) => {
                try {
                    projectResolve(pkg);
                    return true;
                }
                catch {
                    return false;
                }
            };
            const hasIstanbul = checkInstalled('@vitest/coverage-istanbul');
            const hasV8 = checkInstalled('@vitest/coverage-v8');
            // Favor istanbul when browser testing is enabled (to avoid slow CDP V8 HTTP sourcemap remapping)
            // or when only istanbul is installed.
            if (hasIstanbul && (browsersToCheck.length > 0 || !hasV8)) {
                determinedProvider = 'istanbul';
            }
            else {
                determinedProvider = 'v8';
            }
        }
    }
    return determinedProvider;
}
function getBrowsersToCheck(browser, testConfigBrowser) {
    const browsersToCheck = [];
    const cliBrowser = browser;
    const userBrowser = testConfigBrowser;
    // 1. CLI options override the Vitest configuration completely.
    if (cliBrowser) {
        if (cliBrowser.instances) {
            browsersToCheck.push(...cliBrowser.instances.map((i) => i.browser));
        }
        if (cliBrowser.name) {
            browsersToCheck.push(cliBrowser.name);
        }
        return browsersToCheck;
    }
    // 2. Fall back to Vitest configuration ONLY if browser testing is enabled.
    if (userBrowser && userBrowser.enabled !== false) {
        if (userBrowser.instances) {
            browsersToCheck.push(...userBrowser.instances.map((i) => i.browser));
        }
        if (userBrowser.name) {
            browsersToCheck.push(userBrowser.name);
        }
    }
    return browsersToCheck;
}
async function createVitestConfigPlugin(options) {
    const { include, browser, projectName, reporters, setupFiles, projectPlugins, projectSourceRoot, } = options;
    const { mergeConfig } = await Promise.resolve().then(() => __importStar(require('vitest/config')));
    return {
        name: 'angular:vitest-configuration',
        async config(config) {
            const testConfig = config.test;
            const determinedProvider = determineCoverageProvider(browser, testConfig, options.coverage.enabled, projectSourceRoot);
            if (reporters !== undefined) {
                delete testConfig?.reporters;
            }
            if (options.coverage.reporters !== undefined &&
                testConfig?.coverage &&
                'reporter' in testConfig.coverage) {
                delete testConfig.coverage.reporter;
            }
            if (testConfig?.projects?.length) {
                this.warn('The "test.projects" option in the Vitest configuration file is not supported. ' +
                    'The Angular CLI Test system will construct its own project configuration.');
                delete testConfig.projects;
            }
            if (testConfig?.include) {
                this.warn('The "test.include" option in the Vitest configuration file is not supported. ' +
                    'The Angular CLI Test system will manage test file discovery.');
                delete testConfig.include;
            }
            if (testConfig?.watch !== undefined && testConfig.watch !== options.watch) {
                this.warn(`The "test.watch" option in the Vitest configuration file is overridden by the builder's ` +
                    `watch option. Please use the Angular CLI "--watch" option to enable or disable watch mode.`);
                delete testConfig.watch;
            }
            if (testConfig?.exclude) {
                this.warn('The "test.exclude" option in the Vitest configuration file is evaluated after ' +
                    'tests are compiled. For better build performance, please use the Angular CLI ' +
                    '"exclude" option instead.');
            }
            // Merge user-defined plugins from the Vitest config with the CLI's internal plugins.
            if (config.plugins) {
                const userPlugins = config.plugins.filter((plugin) => 
                // Only inspect objects with a `name` property as these would be the internal injected plugins
                !plugin ||
                    typeof plugin !== 'object' ||
                    !('name' in plugin) ||
                    (!plugin.name.startsWith('angular:') && !plugin.name.startsWith('vitest')));
                if (userPlugins.length > 0) {
                    projectPlugins.push(...userPlugins);
                }
                delete config.plugins;
            }
            // Validate browser coverage support if coverage is enabled
            if ((browser || testConfig?.browser?.enabled) &&
                (options.coverage.enabled || testConfig?.coverage?.enabled)) {
                validateBrowserCoverage(browser, testConfig?.browser, determinedProvider);
            }
            const projectResolver = (0, resolve_project_1.createProjectResolver)(projectSourceRoot);
            const projectDefaults = {
                test: {
                    setupFiles,
                    globals: true,
                    // Default to `false` to align with the Karma/Jasmine experience.
                    isolate: false,
                    sequence: { setupFiles: 'list' },
                },
                optimizeDeps: {
                    noDiscovery: true,
                    include: options.optimizeDepsInclude,
                },
                resolve: {
                    mainFields: ['es2020', 'module', 'main'],
                    conditions: ['es2015', 'es2020', 'module', ...(browser ? ['browser'] : [])],
                    preserveSymlinks: options.preserveSymlinks,
                },
            };
            const { optimizeDeps, resolve } = config;
            const projectOverrides = {
                test: {
                    name: projectName,
                    include,
                    // CLI provider browser options override, if present
                    ...(browser ? { browser } : {}),
                    // Only override if the user explicitly set it via CLI
                    ...(options.isolate !== undefined ? { isolate: options.isolate } : {}),
                    // If the user has not specified an environment, use a smart default.
                    ...(!testConfig?.environment
                        ? { environment: await findTestEnvironment(projectResolver) }
                        : {}),
                },
                plugins: projectPlugins,
                optimizeDeps,
                resolve,
            };
            const projectBase = mergeConfig(projectDefaults, testConfig ? { test: testConfig } : {});
            const projectConfig = mergeConfig(projectBase, projectOverrides);
            return {
                test: {
                    coverage: await generateCoverageOption(options.coverage, testConfig?.coverage, projectName, determinedProvider),
                    ...(reporters ? { reporters } : {}),
                    projects: [projectConfig],
                },
            };
        },
    };
}
const textDecoder = new TextDecoder('utf-8');
async function loadResultFile(file) {
    if (file.origin === 'memory') {
        return textDecoder.decode(file.contents);
    }
    return (0, promises_1.readFile)(file.inputPath, 'utf-8');
}
function createVitestPlugins(pluginOptions) {
    const { workspaceRoot, buildResultFiles, testFileToEntryPoint } = pluginOptions;
    const isWindows = (0, node_os_1.platform)() === 'win32';
    let vitestConfig;
    return [
        {
            name: 'angular:test-in-memory-provider',
            enforce: 'pre',
            configureVitest(context) {
                vitestConfig = context.vitest.config;
            },
            resolveId: (id, importer) => {
                // Fast path for test entry points.
                if (testFileToEntryPoint.has(id)) {
                    return id;
                }
                // Workaround for Vitest in Windows when a fully qualified absolute path is provided with
                // a superfluous leading slash. This can currently occur with the `@vitest/coverage-v8` provider
                // when it uses `removeStartsWith(url, FILE_PROTOCOL)` to convert a file URL resulting in
                // `/D:/tmp_dir/...` instead of `D:/tmp_dir/...`.
                if (id[0] === '/' && isWindows) {
                    const slicedId = id.slice(1);
                    if (node_path_1.default.isAbsolute(slicedId)) {
                        return slicedId;
                    }
                }
                // Determine the base directory for resolution.
                let baseDir;
                if (importer) {
                    // If the importer is a test entry point, resolve relative to the workspace root.
                    // Otherwise, resolve relative to the importer's directory.
                    baseDir = testFileToEntryPoint.has(importer) ? workspaceRoot : node_path_1.default.dirname(importer);
                }
                else {
                    // If there's no importer, assume the id is relative to the workspace root.
                    baseDir = workspaceRoot;
                }
                // Construct the full, absolute path and normalize it to POSIX format.
                let fullPath;
                if (node_path_1.default.isAbsolute(id)) {
                    const relativeId = node_path_1.default.relative(baseDir, id);
                    fullPath =
                        !relativeId.startsWith('..') && !node_path_1.default.isAbsolute(relativeId)
                            ? id
                            : node_path_1.default.join(baseDir, id);
                }
                else {
                    fullPath = node_path_1.default.join(baseDir, id);
                }
                fullPath = (0, path_1.toPosixPath)(fullPath);
                if (testFileToEntryPoint.has(fullPath)) {
                    return fullPath;
                }
                // Check if the resolved path corresponds to a known build artifact.
                const relativePath = node_path_1.default.relative(workspaceRoot, fullPath);
                if (buildResultFiles.has((0, path_1.toPosixPath)(relativePath))) {
                    return fullPath;
                }
                // If the module cannot be resolved from the build artifacts, let other plugins handle it.
                return undefined;
            },
            async load(id) {
                (0, node_assert_1.default)(buildResultFiles.size > 0, 'buildResult must be available for in-memory loading.');
                // Attempt to load as a source test file.
                const entryPoint = testFileToEntryPoint.get(id);
                let outputPath;
                if (entryPoint) {
                    outputPath = entryPoint + '.js';
                    if (vitestConfig?.coverage?.enabled) {
                        // To support coverage exclusion of the actual test file, the virtual
                        // test entry point only references the built and bundled intermediate file.
                        // If vitest supported an "excludeOnlyAfterRemap" option, this could be removed completely.
                        return {
                            code: `import "./${outputPath}";`,
                        };
                    }
                }
                else {
                    // Attempt to load as a built artifact.
                    const relativePath = node_path_1.default.relative(workspaceRoot, id);
                    outputPath = (0, path_1.toPosixPath)(relativePath);
                }
                const outputFile = buildResultFiles.get(outputPath);
                if (outputFile) {
                    const code = await loadResultFile(outputFile);
                    const sourceMapPath = outputPath + '.map';
                    const sourceMapFile = buildResultFiles.get(sourceMapPath);
                    const sourceMapText = sourceMapFile ? await loadResultFile(sourceMapFile) : undefined;
                    const map = sourceMapText ? JSON.parse(sourceMapText) : undefined;
                    if (map) {
                        adjustSourcemapSources(map, true, workspaceRoot, id);
                    }
                    return {
                        code,
                        map,
                    };
                }
            },
            configureServer: (server) => {
                server.middlewares.use((0, assets_middleware_1.createBuildAssetsMiddleware)(server.config.base, buildResultFiles));
            },
        },
        {
            name: 'angular:html-index',
            transformIndexHtml: () => {
                // Add all global stylesheets
                if (buildResultFiles.has('styles.css')) {
                    return [
                        {
                            tag: 'link',
                            attrs: { href: 'styles.css', rel: 'stylesheet' },
                            injectTo: 'head',
                        },
                    ];
                }
                return [];
            },
        },
    ];
}
/**
 * Adjusts the sources field in a sourcemap to ensure correct source mapping and coverage reporting.
 *
 * @param map The raw sourcemap to adjust.
 * @param rebaseSources Whether to rebase the source paths relative to the test file.
 * @param workspaceRoot The root directory of the workspace.
 * @param id The ID (path) of the file being loaded.
 */
function adjustSourcemapSources(map, rebaseSources, workspaceRoot, id) {
    if (!map.sources?.length && !map.sourcesContent?.length && !map.mappings) {
        // Vitest will include files in the coverage report if the sourcemap contains no sources.
        // For builder-internal generated code chunks, which are typically helper functions,
        // a virtual source is added to the sourcemap to prevent them from being incorrectly
        // included in the final coverage report.
        map.sources = ['virtual:builder'];
    }
    else if (rebaseSources && map.sources) {
        map.sources = map.sources.map((source) => {
            if (!source || source.startsWith('angular:')) {
                return source;
            }
            // source is relative to the workspace root because the output file is at the root of the output.
            const absoluteSource = node_path_1.default.join(workspaceRoot, source);
            return (0, path_1.toPosixPath)(node_path_1.default.relative(node_path_1.default.dirname(id), absoluteSource));
        });
    }
}
/**
 * Validates that all enabled browsers support V8 coverage when coverage is enabled.
 * Throws an error if an unsupported browser is detected.
 */
function validateBrowserCoverage(browser, testConfigBrowser, provider) {
    if (provider === 'istanbul') {
        return;
    }
    const browsersToCheck = getBrowsersToCheck(browser, testConfigBrowser);
    // Normalize and filter unsupported browsers
    const unsupportedBrowsers = browsersToCheck
        .map((b) => (0, browser_provider_1.normalizeBrowserName)(b).browser)
        .filter((b) => !['chrome', 'chromium', 'edge'].includes(b));
    if (unsupportedBrowsers.length > 0) {
        throw new Error(`Code coverage is enabled, but the following configured browsers do not support the V8 coverage provider: ` +
            `${unsupportedBrowsers.join(', ')}. ` +
            `V8 coverage is only supported on Chromium-based browsers (e.g., Chrome, Chromium, Edge). ` +
            `Please disable coverage or remove the unsupported browsers.`);
    }
}
async function generateCoverageOption(optionsCoverage, configCoverage, projectName, provider) {
    let defaultExcludes = [];
    // When a coverage exclude option is provided, Vitest's default coverage excludes
    // will be overridden. To retain them, we manually fetch the defaults to append to the
    // user's provided exclusions.
    if (optionsCoverage.exclude) {
        try {
            const vitestConfig = await Promise.resolve().then(() => __importStar(require('vitest/config')));
            defaultExcludes = vitestConfig.coverageConfigDefaults.exclude;
        }
        catch { }
    }
    return {
        provider,
        excludeAfterRemap: true,
        reportsDirectory: configCoverage?.reportsDirectory ?? (0, path_1.toPosixPath)(node_path_1.default.join('coverage', projectName)),
        ...(optionsCoverage.enabled !== undefined ? { enabled: optionsCoverage.enabled } : {}),
        // Vitest performs a pre-check and a post-check for sourcemaps.
        // The pre-check uses the bundled files, so specific bundled entry points and chunks need to be included.
        // The post-check uses the original source files, so the user's include is used.
        ...(optionsCoverage.include
            ? { include: ['spec-*.js', 'chunk-*.js', ...optionsCoverage.include] }
            : {}),
        // The 'in' operator is used here because 'configCoverage' is a union type and
        // not all coverage providers support thresholds or watermarks.
        thresholds: mergeCoverageObjects(configCoverage && 'thresholds' in configCoverage ? configCoverage.thresholds : undefined, optionsCoverage.thresholds),
        watermarks: mergeCoverageObjects(configCoverage && 'watermarks' in configCoverage ? configCoverage.watermarks : undefined, optionsCoverage.watermarks),
        // Special handling for `exclude`/`reporters` due to an undefined value causing upstream failures
        ...(optionsCoverage.exclude
            ? {
                exclude: Array.from(new Set([
                    // Augment the default exclude https://vitest.dev/config/#coverage-exclude
                    // with the user defined exclusions
                    ...(configCoverage?.exclude || []),
                    ...optionsCoverage.exclude,
                    ...defaultExcludes,
                ])),
            }
            : {}),
        ...(optionsCoverage.reporters
            ? { reporter: optionsCoverage.reporters }
            : {}),
    };
}
/**
 * Merges coverage related objects while ignoring any `undefined` values.
 * This ensures that Angular CLI options correctly override Vitest configuration
 * only when explicitly provided.
 */
function mergeCoverageObjects(configValue, optionsValue) {
    if (optionsValue === undefined) {
        return configValue;
    }
    const result = { ...(configValue ?? {}) };
    for (const [key, value] of Object.entries(optionsValue)) {
        if (value !== undefined) {
            result[key] = value;
        }
    }
    return Object.keys(result).length > 0 ? result : undefined;
}
//# sourceMappingURL=plugins.js.map