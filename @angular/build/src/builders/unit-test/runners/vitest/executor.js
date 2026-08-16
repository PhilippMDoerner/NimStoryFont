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
exports.VitestExecutor = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = require("node:timers/promises");
const utils_1 = require("../../../../tools/vite/utils");
const error_1 = require("../../../../utils/error");
const results_1 = require("../../../application/results");
const browser_provider_1 = require("./browser-provider");
const configuration_1 = require("./configuration");
const plugins_1 = require("./plugins");
var DebugLogLevel;
(function (DebugLogLevel) {
    DebugLogLevel[DebugLogLevel["Info"] = 1] = "Info";
    DebugLogLevel[DebugLogLevel["Verbose"] = 2] = "Verbose";
})(DebugLogLevel || (DebugLogLevel = {}));
class VitestExecutor {
    vitest;
    normalizePath;
    projectName;
    options;
    logger;
    buildResultFiles = new Map();
    externalMetadata = {
        implicitBrowser: [],
        implicitServer: [],
        explicitBrowser: [],
        explicitServer: [],
    };
    debugLevel;
    // This is a reverse map of the entry points created in `build-options.ts`.
    // It is used by the in-memory provider plugin to map the requested test file
    // path back to its bundled output path.
    // Example: `Map<'/path/to/src/app.spec.ts', 'spec-src-app-spec'>`
    testFileToEntryPoint = new Map();
    entryPointToTestFile = new Map();
    constructor(projectName, options, testEntryPointMappings, logger) {
        const level = parseInt(process.env['NG_TEST_LOG'] ?? '0', 10);
        this.debugLevel = isNaN(level) ? 0 : level;
        this.projectName = projectName;
        this.options = options;
        this.logger = logger;
        this.debugLog(DebugLogLevel.Info, 'VitestExecutor instantiated.');
        this.debugLog(DebugLogLevel.Verbose, 'NormalizedUnitTestBuilderOptions:', options);
        if (testEntryPointMappings) {
            for (const [entryPoint, testFile] of testEntryPointMappings) {
                this.testFileToEntryPoint.set(testFile, entryPoint);
                this.entryPointToTestFile.set(entryPoint + '.js', testFile);
            }
            this.debugLog(DebugLogLevel.Verbose, 'Test entry point mappings:', Object.fromEntries(testEntryPointMappings));
        }
    }
    debugLog(level, message, data) {
        if (this.debugLevel < level) {
            return;
        }
        const formattedMessage = `[VitestExecutor:${DebugLogLevel[level]}] ${message}`;
        // Custom formatting for data object to ensure it's readable
        const logData = data ? JSON.stringify(data, null, 2) : '';
        this.logger.info(`${formattedMessage}${logData ? `\n${logData}` : ''}`);
    }
    async *execute(buildResult) {
        this.debugLog(DebugLogLevel.Info, `Executing test run (kind: ${buildResult.kind}).`);
        this.normalizePath ??= (await Promise.resolve(`${'vite'}`).then(s => __importStar(require(s)))).normalizePath;
        if (buildResult.kind === results_1.ResultKind.Full) {
            this.buildResultFiles.clear();
            for (const [path, file] of Object.entries(buildResult.files)) {
                this.buildResultFiles.set(this.normalizePath(path), file);
            }
            this.debugLog(DebugLogLevel.Info, `Full build results received. Total files: ${this.buildResultFiles.size}.`);
        }
        else {
            this.debugLog(DebugLogLevel.Info, `Incremental build results received.` +
                `Added: ${buildResult.added.length}, Modified: ${buildResult.modified.length}, Removed: ${buildResult.removed.length}.`);
            this.debugLog(DebugLogLevel.Verbose, 'Added files:', buildResult.added);
            this.debugLog(DebugLogLevel.Verbose, 'Modified files:', buildResult.modified);
            this.debugLog(DebugLogLevel.Verbose, 'Removed files:', buildResult.removed);
            for (const file of buildResult.removed) {
                this.buildResultFiles.delete(this.normalizePath(file.path));
            }
            for (const [path, file] of Object.entries(buildResult.files)) {
                this.buildResultFiles.set(this.normalizePath(path), file);
            }
        }
        (0, utils_1.updateExternalMetadata)(buildResult, this.externalMetadata, undefined, true);
        this.debugLog(DebugLogLevel.Verbose, 'Updated external metadata:', this.externalMetadata);
        // Reset the exit code to allow for a clean state.
        // This is necessary because Vitest may set the exit code on failure, which can
        // affect subsequent runs in watch mode or when running multiple builders.
        process.exitCode = 0;
        // Initialize Vitest if not already present.
        this.vitest ??= await this.initializeVitest();
        const vitest = this.vitest;
        let testResults;
        if (buildResult.kind === results_1.ResultKind.Incremental) {
            // To rerun tests, Vitest needs the original test file paths, not the output paths.
            const modifiedSourceFiles = new Set();
            for (const modifiedFile of [...buildResult.modified, ...buildResult.added]) {
                // The `modified` files in the build result are the output paths.
                // We need to find the original source file path to pass to Vitest.
                const source = this.entryPointToTestFile.get(modifiedFile);
                if (source) {
                    this.debugLog(DebugLogLevel.Verbose, `Mapped output file '${modifiedFile}' to source file '${source}' for re-run.`);
                    modifiedSourceFiles.add(source);
                }
                else {
                    this.debugLog(DebugLogLevel.Verbose, `Could not map output file '${modifiedFile}' to a source file. It may not be a test file.`);
                }
                vitest.invalidateFile(this.normalizePath(node_path_1.default.join(this.options.workspaceRoot, modifiedFile)));
            }
            const specsToRerun = [];
            for (const file of modifiedSourceFiles) {
                vitest.invalidateFile(file);
                const specs = vitest.getModuleSpecifications(file);
                if (specs) {
                    specsToRerun.push(...specs);
                }
            }
            if (specsToRerun.length > 0) {
                this.debugLog(DebugLogLevel.Info, `Re-running ${specsToRerun.length} test specifications.`);
                this.debugLog(DebugLogLevel.Verbose, 'Specs to rerun:', specsToRerun);
                testResults = await vitest.rerunTestSpecifications(specsToRerun);
            }
            else {
                this.debugLog(DebugLogLevel.Info, 'No test specifications to rerun.');
            }
        }
        // Check if all the tests pass to calculate the result
        const testModules = testResults?.testModules ?? this.vitest.state.getTestModules();
        let success = testModules.every((testModule) => testModule.ok());
        let finalResultReason = 'All tests passed.';
        // Vitest does not return a failure result when coverage thresholds are not met.
        // Instead, it sets the process exit code to 1.
        // We check this exit code to determine if the test run should be considered a failure.
        if (success && process.exitCode === 1) {
            success = false;
            finalResultReason = 'Test run failed due to unmet coverage thresholds.';
            // Reset the exit code to prevent it from carrying over to subsequent runs/builds
            process.exitCode = 0;
        }
        this.debugLog(DebugLogLevel.Info, `Test run finished with success: ${success}. Reason: ${finalResultReason}`);
        yield { success };
    }
    async [Symbol.asyncDispose]() {
        if (!this.vitest) {
            return;
        }
        this.debugLog(DebugLogLevel.Info, 'Disposing VitestExecutor: Closing Vitest instance.');
        const controller = new AbortController();
        const timeoutMs = 10_000;
        try {
            await Promise.race([
                this.vitest.close(),
                (0, promises_1.setTimeout)(timeoutMs, undefined, { signal: controller.signal, ref: false })
                    .then(() => {
                    this.logger.warn(`Vitest instance failed to close cleanly within ${timeoutMs}ms. Continuing teardown...`);
                })
                    .catch(() => {
                    // Suppress AbortError triggered by controller.abort() when close() resolves first
                }),
            ]);
        }
        catch (error) {
            (0, error_1.assertIsError)(error);
            this.logger.error(`An error occurred while closing Vitest instance: ${error.message}`);
        }
        finally {
            controller.abort();
        }
        this.debugLog(DebugLogLevel.Info, 'Vitest instance closed.');
    }
    prepareSetupFiles() {
        const { setupFiles } = this.options;
        // Add setup file entries for TestBed initialization and project polyfills
        const testSetupFiles = ['init-testbed.js', 'vitest-mock-patch.js', ...setupFiles];
        // TODO: Provide additional result metadata to avoid needing to extract based on filename
        if (this.buildResultFiles.has('polyfills.js')) {
            testSetupFiles.unshift('polyfills.js');
        }
        this.debugLog(DebugLogLevel.Info, 'Prepared setup files:', testSetupFiles);
        return testSetupFiles;
    }
    async initializeVitest() {
        this.debugLog(DebugLogLevel.Info, 'Initializing Vitest.');
        const { coverage, reporters, outputFile, workspaceRoot, browsers, debug, watch, browserViewport, ui, projectRoot, runnerConfig, projectSourceRoot, cacheOptions, } = this.options;
        const projectName = this.projectName;
        let vitestNodeModule;
        try {
            vitestNodeModule = await Promise.resolve().then(() => __importStar(require('vitest/node')));
        }
        catch (error) {
            (0, error_1.assertIsError)(error);
            this.debugLog(DebugLogLevel.Info, `Failed to import 'vitest/node'. Error code: ${error.code}`);
            if (error.code !== 'ERR_MODULE_NOT_FOUND') {
                throw error;
            }
            throw new Error('The `vitest` package was not found. Please install the package and rerun the test command.', { cause: error });
        }
        const { startVitest } = vitestNodeModule;
        // Setup vitest browser options if configured
        const browserOptions = await (0, browser_provider_1.setupBrowserConfiguration)(browsers, this.options.headless, debug, projectSourceRoot, browserViewport);
        if (browserOptions.errors?.length) {
            this.debugLog(DebugLogLevel.Info, 'Browser configuration errors found.', {
                errors: browserOptions.errors,
            });
            throw new Error(browserOptions.errors.join('\n'));
        }
        if (browserOptions.messages?.length) {
            for (const message of browserOptions.messages) {
                this.logger.info(message);
            }
        }
        this.debugLog(DebugLogLevel.Info, 'Browser configuration complete.', {
            config: browserOptions.browser,
        });
        this.debugLog(DebugLogLevel.Info, `Verifying build results. File count: ${this.buildResultFiles.size}.`);
        (0, node_assert_1.default)(this.buildResultFiles.size > 0, 'buildResult must be available before initializing vitest');
        const testSetupFiles = this.prepareSetupFiles();
        const projectPlugins = (0, plugins_1.createVitestPlugins)({
            workspaceRoot,
            projectSourceRoot,
            projectName,
            buildResultFiles: this.buildResultFiles,
            testFileToEntryPoint: this.testFileToEntryPoint,
        });
        const debugOptions = debug
            ? {
                inspectBrk: true,
                isolate: false,
                fileParallelism: false,
            }
            : {};
        const externalConfigPath = runnerConfig === true
            ? await (0, configuration_1.findVitestBaseConfig)([projectRoot, workspaceRoot])
            : runnerConfig;
        this.debugLog(DebugLogLevel.Info, 'External Vitest configuration path:', {
            externalConfigPath,
        });
        let project = projectName;
        if (debug && browserOptions.browser?.instances) {
            if (browserOptions.browser.instances.length > 1) {
                this.logger.warn('Multiple browsers are configured, but only the first browser will be used for debugging.');
            }
            // When running browser tests, Vitest appends the browser name to the project identifier.
            // The project name must match this augmented name to ensure the correct project is targeted.
            project = `${projectName} (${browserOptions.browser.instances[0].browser})`;
            this.debugLog(DebugLogLevel.Info, 'Adjusted project name for debugging with browser:', {
                project,
            });
        }
        // Filter internal entries and setup files from the include list
        const internalEntries = ['angular:'];
        const setupFileSet = new Set(testSetupFiles);
        const include = [...this.testFileToEntryPoint.keys()].filter((entry) => {
            return (!internalEntries.some((internal) => entry.startsWith(internal)) && !setupFileSet.has(entry));
        });
        this.debugLog(DebugLogLevel.Verbose, 'Included test files (after filtering):', include);
        const vitestConfig = {
            config: externalConfigPath,
            root: workspaceRoot,
            project,
            watch,
            ...(outputFile !== undefined ? { outputFile } : {}),
            ...(cacheOptions.enabled ? {} : { cache: false }),
            ...(this.options.filter !== undefined ? { testNamePattern: this.options.filter } : {}),
            ...(typeof ui === 'boolean' ? { ui } : {}),
            ...debugOptions,
        };
        const vitestServerConfig = {
            // Note `.vitest` is auto appended to the path.
            cacheDir: cacheOptions.path,
            server: {
                // Disable the actual file watcher. The boolean watch option above should still
                // be enabled as it controls other internal behavior related to rerunning tests.
                watch: null,
            },
            plugins: [
                await (0, plugins_1.createVitestConfigPlugin)({
                    browser: browserOptions.browser,
                    coverage,
                    projectName,
                    projectSourceRoot,
                    optimizeDepsInclude: this.externalMetadata.implicitBrowser,
                    reporters,
                    setupFiles: testSetupFiles,
                    projectPlugins,
                    include,
                    watch,
                    isolate: this.options.isolate,
                    preserveSymlinks: this.options.preserveSymlinks,
                }),
            ],
        };
        this.debugLog(DebugLogLevel.Info, 'Calling startVitest with final configuration.');
        this.debugLog(DebugLogLevel.Verbose, 'Vitest config:', vitestConfig);
        this.debugLog(DebugLogLevel.Verbose, 'Vitest server config:', vitestServerConfig);
        return startVitest('test', undefined, vitestConfig, vitestServerConfig);
    }
}
exports.VitestExecutor = VitestExecutor;
//# sourceMappingURL=executor.js.map