"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const testing_1 = require("@angular-devkit/architect/testing");
const core_1 = require("@angular-devkit/core");
const path = __importStar(require("node:path"));
const vitest_1 = require("vitest");
const buildDevStandaloneMock = vitest_1.vi.fn();
const buildStaticStandaloneMock = vitest_1.vi.fn();
const buildMock = {
    buildDevStandalone: buildDevStandaloneMock,
    buildStaticStandalone: buildStaticStandaloneMock,
    withTelemetry: (name, options, fn) => fn(),
};
vitest_1.vi.doMock('storybook/internal/core-server', () => buildMock);
vitest_1.vi.doMock('storybook/internal/common', () => ({
    JsPackageManagerFactory: {
        getPackageManager: () => ({
            runPackageCommand: mockRunScript,
        }),
    },
    getEnvConfig: (options) => options,
    versions: {
        storybook: 'x.x.x',
    },
}));
vitest_1.vi.doMock('find-up', () => ({ sync: () => './storybook/tsconfig.ts' }));
const mockRunScript = vitest_1.vi.fn();
// Randomly fails on CI. TODO: investigate why
vitest_1.describe.skip('Build Storybook Builder', () => {
    let architect;
    let architectHost;
    (0, vitest_1.beforeEach)(async () => {
        const registry = new core_1.schema.CoreSchemaRegistry();
        registry.addPostTransform(core_1.schema.transforms.addUndefinedDefaults);
        architectHost = new testing_1.TestingArchitectHost();
        architect = new architect_1.Architect(architectHost, registry);
        architectHost.addBuilder('@angular-devkit/build-angular:browser', (0, architect_1.createBuilder)(() => {
            return { success: true };
        }));
        architectHost.addTarget({ project: 'angular-cli', target: 'build-2' }, '@angular-devkit/build-angular:browser', {
            outputPath: 'dist/angular-cli',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: 'src/polyfills.ts',
            tsConfig: 'src/tsconfig.app.json',
            assets: ['src/favicon.ico', 'src/assets'],
            styles: ['src/styles.css'],
            scripts: [],
        });
        // This will either take a Node package name, or a path to the directory
        // for the package.json file.
        await architectHost.addBuilderFromPackage(path.join(__dirname, '../../..'));
    });
    (0, vitest_1.beforeEach)(() => {
        buildStaticStandaloneMock.mockImplementation((_options) => Promise.resolve(_options));
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('should start storybook with angularBrowserTarget', async () => {
        const run = await architect.scheduleBuilder('@storybook/angular:build-storybook', {
            browserTarget: 'angular-cli:build-2',
            compodoc: false,
        });
        const output = await run.result;
        await run.stop();
        (0, vitest_1.expect)(output.success).toBeTruthy();
        (0, vitest_1.expect)(mockRunScript).not.toHaveBeenCalledWith();
        (0, vitest_1.expect)(buildStaticStandaloneMock).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            angularBrowserTarget: 'angular-cli:build-2',
            angularBuilderContext: vitest_1.expect.any(Object),
            configDir: '.storybook',
            loglevel: undefined,
            quiet: false,
            disableTelemetry: undefined,
            outputDir: 'storybook-static',
            packageJson: vitest_1.expect.any(Object),
            mode: 'static',
            tsConfig: './storybook/tsconfig.ts',
            statsJson: false,
        }));
    });
    (0, vitest_1.it)('should start storybook with tsConfig', async () => {
        const run = await architect.scheduleBuilder('@storybook/angular:build-storybook', {
            tsConfig: 'path/to/tsConfig.json',
            compodoc: false,
        });
        const output = await run.result;
        await run.stop();
        (0, vitest_1.expect)(output.success).toBeTruthy();
        (0, vitest_1.expect)(mockRunScript).not.toHaveBeenCalledWith();
        (0, vitest_1.expect)(buildStaticStandaloneMock).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            angularBrowserTarget: null,
            angularBuilderContext: vitest_1.expect.any(Object),
            configDir: '.storybook',
            loglevel: undefined,
            quiet: false,
            disableTelemetry: undefined,
            outputDir: 'storybook-static',
            packageJson: vitest_1.expect.any(Object),
            mode: 'static',
            tsConfig: 'path/to/tsConfig.json',
            statsJson: false,
        }));
    });
    (0, vitest_1.it)('should build storybook with webpack stats.json', async () => {
        const run = await architect.scheduleBuilder('@storybook/angular:build-storybook', {
            tsConfig: 'path/to/tsConfig.json',
            compodoc: false,
            statsJson: true,
        });
        const output = await run.result;
        await run.stop();
        (0, vitest_1.expect)(output.success).toBeTruthy();
        (0, vitest_1.expect)(mockRunScript).not.toHaveBeenCalledWith();
        (0, vitest_1.expect)(buildStaticStandaloneMock).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            angularBrowserTarget: null,
            angularBuilderContext: vitest_1.expect.any(Object),
            configDir: '.storybook',
            loglevel: undefined,
            quiet: false,
            outputDir: 'storybook-static',
            packageJson: vitest_1.expect.any(Object),
            mode: 'static',
            tsConfig: 'path/to/tsConfig.json',
            statsJson: true,
        }));
    });
    (0, vitest_1.it)('should throw error', async () => {
        buildStaticStandaloneMock.mockRejectedValue(true);
        const run = await architect.scheduleBuilder('@storybook/angular:build-storybook', {
            browserTarget: 'angular-cli:build-2',
            compodoc: false,
        });
        try {
            await run.result;
            (0, vitest_1.expect)(false).toEqual('Throw expected');
        }
        catch (error) {
            (0, vitest_1.expect)(error).toEqual('Broken build, fix the error above.\nYou may need to refresh the browser.');
        }
    });
    (0, vitest_1.it)('should run compodoc', async () => {
        const run = await architect.scheduleBuilder('@storybook/angular:build-storybook', {
            browserTarget: 'angular-cli:build-2',
        });
        const output = await run.result;
        await run.stop();
        (0, vitest_1.expect)(output.success).toBeTruthy();
        (0, vitest_1.expect)(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', './storybook/tsconfig.ts', '-d', '.', '-e', 'json'], '');
        (0, vitest_1.expect)(buildStaticStandaloneMock).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            angularBrowserTarget: 'angular-cli:build-2',
            angularBuilderContext: vitest_1.expect.any(Object),
            configDir: '.storybook',
            loglevel: undefined,
            quiet: false,
            outputDir: 'storybook-static',
            packageJson: vitest_1.expect.any(Object),
            mode: 'static',
            tsConfig: './storybook/tsconfig.ts',
            statsJson: false,
        }));
    });
    (0, vitest_1.it)('should start storybook with styles options', async () => {
        const run = await architect.scheduleBuilder('@storybook/angular:build-storybook', {
            tsConfig: 'path/to/tsConfig.json',
            compodoc: false,
            styles: ['style.scss'],
        });
        const output = await run.result;
        await run.stop();
        (0, vitest_1.expect)(output.success).toBeTruthy();
        (0, vitest_1.expect)(mockRunScript).not.toHaveBeenCalledWith();
        (0, vitest_1.expect)(buildStaticStandaloneMock).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            angularBrowserTarget: null,
            angularBuilderContext: vitest_1.expect.any(Object),
            angularBuilderOptions: { assets: [], styles: ['style.scss'] },
            configDir: '.storybook',
            loglevel: undefined,
            quiet: false,
            outputDir: 'storybook-static',
            packageJson: vitest_1.expect.any(Object),
            mode: 'static',
            tsConfig: 'path/to/tsConfig.json',
            statsJson: false,
        }));
    });
});
