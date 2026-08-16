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
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = execute;
const architect_1 = require("@angular-devkit/architect");
const node_assert_1 = __importDefault(require("node:assert"));
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const virtual_module_plugin_1 = require("../../tools/esbuild/virtual-module-plugin");
const error_1 = require("../../utils/error");
const test_files_1 = require("../../utils/test-files");
const application_1 = require("../application");
const results_1 = require("../application/results");
const options_1 = require("./options");
const dependency_checker_1 = require("./runners/dependency-checker");
const test_discovery_1 = require("./test-discovery");
async function loadTestRunner(runnerName) {
    // Harden against directory traversal
    if (!/^[a-zA-Z0-9-]+$/.test(runnerName)) {
        throw new Error(`Invalid runner name "${runnerName}". Runner names can only contain alphanumeric characters and hyphens.`);
    }
    let runnerModule;
    try {
        runnerModule = await Promise.resolve(`${`./runners/${runnerName}/index`}`).then(s => __importStar(require(s)));
    }
    catch (e) {
        (0, error_1.assertIsError)(e);
        if (e.code === 'ERR_MODULE_NOT_FOUND') {
            throw new Error(`Unknown test runner "${runnerName}".`, { cause: e });
        }
        throw new Error(`Failed to load the '${runnerName}' test runner. The package may be corrupted or improperly installed.`, { cause: e });
    }
    const runner = runnerModule.default;
    if (!runner ||
        typeof runner.getBuildOptions !== 'function' ||
        typeof runner.createExecutor !== 'function') {
        throw new Error(`The loaded test runner '${runnerName}' does not appear to be a valid TestRunner implementation.`);
    }
    return runner;
}
function prepareBuildExtensions(virtualFiles, projectSourceRoot, extensions) {
    if (!virtualFiles) {
        return extensions;
    }
    extensions ??= {};
    extensions.codePlugins ??= [];
    for (const [namespace, contents] of Object.entries(virtualFiles)) {
        extensions.codePlugins.push((0, virtual_module_plugin_1.createVirtualModulePlugin)({
            namespace,
            loadContent: () => {
                return {
                    contents,
                    loader: 'js',
                    resolveDir: projectSourceRoot,
                };
            },
        }));
    }
    return extensions;
}
async function* runBuildAndTest(executor, applicationBuildOptions, context, dumpDirectory, extensions) {
    let consecutiveErrorCount = 0;
    for await (const buildResult of (0, application_1.buildApplicationInternal)(applicationBuildOptions, context, extensions)) {
        if (buildResult.kind === results_1.ResultKind.Failure) {
            yield { success: false };
            continue;
        }
        else if (buildResult.kind !== results_1.ResultKind.Full &&
            buildResult.kind !== results_1.ResultKind.Incremental) {
            node_assert_1.default.fail('A full and/or incremental build result is required from the application builder.');
        }
        (0, node_assert_1.default)(buildResult.files, 'Builder did not provide result files.');
        if (dumpDirectory) {
            if (buildResult.kind === results_1.ResultKind.Full) {
                // Full build, so clean the directory
                await (0, promises_1.rm)(dumpDirectory, { recursive: true, force: true });
            }
            else {
                // Incremental build, so delete removed files
                for (const file of buildResult.removed) {
                    await (0, promises_1.rm)(node_path_1.default.join(dumpDirectory, file.path), { force: true });
                }
            }
            await (0, test_files_1.writeTestFiles)(buildResult.files, dumpDirectory);
            context.logger.info(`Build output files successfully dumped to '${dumpDirectory}'.`);
        }
        // Pass the build artifacts to the executor
        try {
            yield* executor.execute(buildResult);
            // Successful execution resets the failure counter
            consecutiveErrorCount = 0;
        }
        catch (e) {
            (0, error_1.assertIsError)(e);
            context.logger.error(`An exception occurred during test execution:\n${e.stack ?? e.message}`);
            if (e instanceof AggregateError) {
                e.errors.forEach((inner) => {
                    (0, error_1.assertIsError)(inner);
                    context.logger.error(inner.stack ?? inner.message);
                });
            }
            yield { success: false };
            consecutiveErrorCount++;
        }
        if (consecutiveErrorCount >= 3) {
            context.logger.error('Test runner process has failed multiple times in a row. Please fix the configuration and restart the process.');
            return;
        }
    }
}
/**
 * @experimental Direct usage of this function is considered experimental.
 */
async function* execute(options, context, extensions) {
    // Determine project name from builder context target
    const projectName = context.target?.project;
    if (!projectName) {
        context.logger.error(`The builder requires a target to be specified.`);
        return;
    }
    // Initialize the test runner and normalize options
    let runner;
    let normalizedOptions;
    try {
        normalizedOptions = await (0, options_1.normalizeOptions)(context, projectName, options);
        runner = await loadTestRunner(normalizedOptions.runnerName);
        await runner.validateDependencies?.(normalizedOptions);
    }
    catch (e) {
        (0, error_1.assertIsError)(e);
        if (e instanceof dependency_checker_1.MissingDependenciesError) {
            context.logger.error(e.message);
        }
        else {
            context.logger.error(`An exception occurred during initialization of the test runner:\n${e.stack ?? e.message}`);
        }
        yield { success: false };
        return;
    }
    if (normalizedOptions.listTests) {
        const testFiles = await (0, test_discovery_1.findTests)(normalizedOptions.include, normalizedOptions.exclude ?? [], normalizedOptions.workspaceRoot, normalizedOptions.projectSourceRoot);
        context.logger.info('Discovered test files:');
        for (const file of testFiles) {
            context.logger.info(`  ${node_path_1.default.relative(normalizedOptions.workspaceRoot, file)}`);
        }
        yield { success: true };
        return;
    }
    if (runner.isStandalone) {
        try {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                const executor = __addDisposableResource(env_1, await runner.createExecutor(context, normalizedOptions, undefined), true);
                yield* executor.execute({
                    kind: results_1.ResultKind.Full,
                    files: {},
                });
            }
            catch (e_1) {
                env_1.error = e_1;
                env_1.hasError = true;
            }
            finally {
                const result_1 = __disposeResources(env_1);
                if (result_1)
                    await result_1;
            }
        }
        catch (e) {
            (0, error_1.assertIsError)(e);
            context.logger.error(`An exception occurred during standalone test execution:\n${e.stack ?? e.message}`);
            yield { success: false };
        }
        return;
    }
    // Get base build options from the buildTarget
    let buildTargetOptions;
    try {
        const builderName = await context.getBuilderNameForTarget(normalizedOptions.buildTarget);
        if (builderName === '@angular/build:application') {
            buildTargetOptions = (await context.validateOptions(await context.getTargetOptions(normalizedOptions.buildTarget), builderName));
        }
        else if (builderName === '@angular/build:ng-packagr') {
            const ngPackagrOptions = await context.validateOptions(await context.getTargetOptions(normalizedOptions.buildTarget), builderName);
            buildTargetOptions = await transformNgPackagrOptions(context, ngPackagrOptions, normalizedOptions.projectRoot);
        }
        else {
            context.logger.warn(`The 'buildTarget' is configured to use '${builderName}', which is not supported. ` +
                `The 'unit-test' builder is designed to work with '@angular/build:application' or '@angular/build:ng-packagr'. ` +
                'Unexpected behavior or build failures may occur.');
            buildTargetOptions = (await context.validateOptions(await context.getTargetOptions(normalizedOptions.buildTarget), builderName));
        }
    }
    catch (e) {
        (0, error_1.assertIsError)(e);
        context.logger.error(`Could not load build target options for "${(0, architect_1.targetStringFromTarget)(normalizedOptions.buildTarget)}".\n` +
            `Please check your 'angular.json' configuration.\n` +
            `Error: ${e.message}`);
        yield { success: false };
        return;
    }
    // Get runner-specific build options
    let runnerBuildOptions;
    let virtualFiles;
    let testEntryPointMappings;
    try {
        ({
            buildOptions: runnerBuildOptions,
            virtualFiles,
            testEntryPointMappings,
        } = await runner.getBuildOptions(normalizedOptions, buildTargetOptions));
    }
    catch (e) {
        (0, error_1.assertIsError)(e);
        context.logger.error(`An exception occurred while getting runner-specific build options:\n${e.stack ?? e.message}`);
        yield { success: false };
        return;
    }
    try {
        const env_2 = { stack: [], error: void 0, hasError: false };
        try {
            const executor = __addDisposableResource(env_2, await runner.createExecutor(context, normalizedOptions, testEntryPointMappings), true);
            const finalExtensions = prepareBuildExtensions(virtualFiles, normalizedOptions.projectSourceRoot, extensions);
            // Prepare and run the application build
            const applicationBuildOptions = {
                ...buildTargetOptions,
                ...runnerBuildOptions,
                watch: normalizedOptions.watch,
                progress: normalizedOptions.buildProgress ?? buildTargetOptions.progress,
                quiet: normalizedOptions.quiet,
                ...(normalizedOptions.tsConfig ? { tsConfig: normalizedOptions.tsConfig } : {}),
                preserveSymlinks: normalizedOptions.preserveSymlinks,
            };
            const dumpDirectory = normalizedOptions.dumpVirtualFiles
                ? node_path_1.default.join(normalizedOptions.cacheOptions.path, 'unit-test', 'output-files')
                : undefined;
            yield* runBuildAndTest(executor, applicationBuildOptions, context, dumpDirectory, finalExtensions);
        }
        catch (e_2) {
            env_2.error = e_2;
            env_2.hasError = true;
        }
        finally {
            const result_2 = __disposeResources(env_2);
            if (result_2)
                await result_2;
        }
    }
    catch (e) {
        (0, error_1.assertIsError)(e);
        context.logger.error(`An exception occurred while creating the test executor:\n${e.stack ?? e.message}`);
        yield { success: false };
    }
}
async function transformNgPackagrOptions(context, options, projectRoot) {
    const projectPath = options['project'];
    let ngPackagePath;
    if (projectPath) {
        if (typeof projectPath !== 'string') {
            throw new Error('ng-packagr builder options "project" property must be a string.');
        }
        ngPackagePath = node_path_1.default.join(context.workspaceRoot, projectPath);
    }
    else {
        ngPackagePath = node_path_1.default.join(projectRoot, 'ng-package.json');
    }
    let ngPackageJson;
    try {
        ngPackageJson = JSON.parse(await (0, promises_1.readFile)(ngPackagePath, 'utf-8'));
    }
    catch (e) {
        (0, error_1.assertIsError)(e);
        throw new Error(`Could not read ng-package.json at ${ngPackagePath}`, {
            cause: e,
        });
    }
    const { lib: { styleIncludePaths = [] } = {}, assets = [], inlineStyleLanguage } = ngPackageJson;
    const includePaths = styleIncludePaths.map((includePath) => node_path_1.default.resolve(node_path_1.default.dirname(ngPackagePath), includePath));
    return {
        stylePreprocessorOptions: includePaths.length ? { includePaths } : undefined,
        assets: assets.length ? assets : undefined,
        inlineStyleLanguage,
    };
}
//# sourceMappingURL=builder.js.map