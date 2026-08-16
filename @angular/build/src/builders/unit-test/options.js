"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = normalizeOptions;
exports.injectTestingPolyfills = injectTestingPolyfills;
const architect_1 = require("@angular-devkit/architect");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const normalize_cache_1 = require("../../utils/normalize-cache");
const path_1 = require("../../utils/path");
const project_metadata_1 = require("../../utils/project-metadata");
const tty_1 = require("../../utils/tty");
const schema_1 = require("./schema");
async function exists(path) {
    try {
        await node_fs_1.promises.access(path, node_fs_1.constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
}
function normalizeReporterOption(reporters) {
    return reporters?.map((entry) => typeof entry === 'string'
        ? [entry, {}]
        : entry);
}
async function normalizeOptions(context, projectName, options) {
    // Target specifier defaults to the current project's build target using a development configuration
    const buildTargetSpecifier = options.buildTarget ?? `::development`;
    const buildTarget = (0, architect_1.targetFromTargetString)(buildTargetSpecifier, projectName, 'build');
    // Load target options to determine preserveSymlinks setting
    let buildTargetOptions;
    try {
        buildTargetOptions = await context.getTargetOptions(buildTarget);
    }
    catch { }
    const preserveSymlinks = typeof buildTargetOptions?.preserveSymlinks === 'boolean'
        ? buildTargetOptions.preserveSymlinks
        : process.execArgv.includes('--preserve-symlinks');
    // Setup base paths based on workspace root and project information
    const workspaceRoot = (0, path_1.canonicalizePath)(context.workspaceRoot);
    const projectMetadata = await context.getProjectMetadata(projectName);
    const { projectRoot, projectSourceRoot } = (0, project_metadata_1.getProjectRootPaths)(workspaceRoot, projectMetadata);
    // Gather persistent caching option and provide a project specific cache location
    const cacheOptions = (0, normalize_cache_1.normalizeCacheOptions)(projectMetadata, workspaceRoot);
    cacheOptions.path = node_path_1.default.join(cacheOptions.path, projectName);
    const { runner, browsers, progress, filter, browserViewport, ui, runnerConfig, isolate } = options;
    if (ui && runner !== schema_1.Runner.Vitest) {
        throw new Error('The "ui" option is only available for the "vitest" runner.');
    }
    if (isolate && runner !== schema_1.Runner.Vitest) {
        throw new Error('The "isolate" option is only available for the "vitest" runner.');
    }
    const [width, height] = browserViewport?.split('x').map(Number) ?? [];
    let tsConfig = options.tsConfig;
    if (tsConfig) {
        const fullTsConfigPath = node_path_1.default.join(workspaceRoot, tsConfig);
        if (!(await exists(fullTsConfigPath))) {
            throw new Error(`The specified tsConfig file '${tsConfig}' does not exist.`);
        }
    }
    else {
        const tsconfigSpecPath = node_path_1.default.join(projectRoot, 'tsconfig.spec.json');
        if (await exists(tsconfigSpecPath)) {
            // The application builder expects a path relative to the workspace root.
            tsConfig = node_path_1.default.relative(workspaceRoot, tsconfigSpecPath);
        }
    }
    let watch = options.watch ?? (0, tty_1.isTTY)();
    if (options.ui && options.watch === false) {
        context.logger.warn(`The '--ui' option requires watch mode. The '--no-watch' flag will be ignored.`);
        watch = true;
    }
    return {
        // Project/workspace information
        workspaceRoot,
        projectRoot,
        projectSourceRoot,
        cacheOptions,
        // Target/configuration specified options
        buildTarget,
        include: options.include ?? ['**/*.spec.ts'],
        exclude: options.exclude,
        filter,
        runnerName: runner ?? schema_1.Runner.Vitest,
        headless: options.headless,
        coverage: {
            enabled: options.coverage,
            exclude: options.coverageExclude,
            include: options.coverageInclude,
            reporters: normalizeReporterOption(options.coverageReporters),
            thresholds: options.coverageThresholds,
            // The schema generation tool doesn't support tuple types for items, but the schema validation
            // does ensure that the array has exactly two numbers.
            watermarks: options.coverageWatermarks,
        },
        tsConfig,
        buildProgress: progress,
        reporters: normalizeReporterOption(options.reporters),
        outputFile: options.outputFile,
        browsers: browsers?.length ? browsers : undefined,
        browserViewport: width && height ? { width, height } : undefined,
        watch,
        debug: options.debug ?? false,
        ui: process.env['CI'] ? false : ui,
        isolate,
        quiet: options.quiet ?? (process.env['CI'] ? false : true),
        providersFile: options.providersFile && node_path_1.default.join(workspaceRoot, options.providersFile),
        setupFiles: options.setupFiles
            ? options.setupFiles.map((setupFile) => node_path_1.default.join(workspaceRoot, setupFile))
            : [],
        dumpVirtualFiles: options.dumpVirtualFiles,
        listTests: options.listTests,
        preserveSymlinks,
        runnerConfig: typeof runnerConfig === 'string'
            ? runnerConfig.length === 0
                ? true
                : node_path_1.default.resolve(workspaceRoot, runnerConfig)
            : runnerConfig,
    };
}
function injectTestingPolyfills(polyfills = []) {
    return polyfills.includes('zone.js') ? [...polyfills, 'zone.js/testing'] : polyfills;
}
//# sourceMappingURL=options.js.map