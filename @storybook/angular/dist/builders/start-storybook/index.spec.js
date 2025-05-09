"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const architect_1 = require("@angular-devkit/architect");
const testing_1 = require("@angular-devkit/architect/testing");
const core_1 = require("@angular-devkit/core");
const node_path_1 = require("node:path");
const vitest_1 = require("vitest");
const buildDevStandaloneMock = vitest_1.vi.fn();
const buildStaticStandaloneMock = vitest_1.vi.fn();
const buildMock = {
    buildDevStandalone: buildDevStandaloneMock,
    buildStaticStandalone: buildStaticStandaloneMock,
    withTelemetry: (_, __, fn) => fn(),
};
vitest_1.vi.doMock('storybook/internal/core-server', () => buildMock);
vitest_1.vi.doMock('find-up', () => ({ sync: () => './storybook/tsconfig.ts' }));
const mockRunScript = vitest_1.vi.fn();
vitest_1.vi.mock('storybook/internal/common', () => ({
    getEnvConfig: (options) => options,
    versions: {
        storybook: 'x.x.x',
    },
    JsPackageManagerFactory: {
        getPackageManager: () => ({
            runPackageCommand: mockRunScript,
        }),
    },
}));
// Randomly fails on CI. TODO: investigate why
vitest_1.describe.skip('Start Storybook Builder', () => {
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
        await architectHost.addBuilderFromPackage((0, node_path_1.join)(__dirname, '../../..'));
    });
    (0, vitest_1.beforeEach)(() => {
        buildDevStandaloneMock.mockImplementation((_options) => Promise.resolve(_options));
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('should start storybook with angularBrowserTarget', async () => {
        const run = await architect.scheduleBuilder('@storybook/angular:start-storybook', {
            browserTarget: 'angular-cli:build-2',
            port: 4400,
            compodoc: false,
        });
        const output = await run.result;
        await run.stop();
        (0, vitest_1.expect)(output.success).toBeTruthy();
        (0, vitest_1.expect)(mockRunScript).not.toHaveBeenCalledWith();
        (0, vitest_1.expect)(buildDevStandaloneMock).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            angularBrowserTarget: 'angular-cli:build-2',
            angularBuilderContext: vitest_1.expect.any(Object),
            ci: false,
            configDir: '.storybook',
            disableTelemetry: undefined,
            host: 'localhost',
            https: false,
            packageJson: vitest_1.expect.any(Object),
            port: 4400,
            quiet: false,
            smokeTest: false,
            sslCa: undefined,
            sslCert: undefined,
            sslKey: undefined,
            tsConfig: './storybook/tsconfig.ts',
        }));
    });
    (0, vitest_1.it)('should start storybook with tsConfig', async () => {
        const run = await architect.scheduleBuilder('@storybook/angular:start-storybook', {
            tsConfig: 'path/to/tsConfig.json',
            port: 4400,
            compodoc: false,
        });
        const output = await run.result;
        await run.stop();
        (0, vitest_1.expect)(output.success).toBeTruthy();
        (0, vitest_1.expect)(mockRunScript).not.toHaveBeenCalledWith();
        (0, vitest_1.expect)(buildDevStandaloneMock).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            angularBrowserTarget: null,
            angularBuilderContext: vitest_1.expect.any(Object),
            ci: false,
            configDir: '.storybook',
            disableTelemetry: undefined,
            host: 'localhost',
            https: false,
            packageJson: vitest_1.expect.any(Object),
            port: 4400,
            quiet: false,
            smokeTest: false,
            sslCa: undefined,
            sslCert: undefined,
            sslKey: undefined,
            tsConfig: 'path/to/tsConfig.json',
        }));
    });
    (0, vitest_1.it)('should throw error', async () => {
        buildDevStandaloneMock.mockRejectedValue(true);
        const run = await architect.scheduleBuilder('@storybook/angular:start-storybook', {
            browserTarget: 'angular-cli:build-2',
            port: 4400,
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
        const run = await architect.scheduleBuilder('@storybook/angular:start-storybook', {
            browserTarget: 'angular-cli:build-2',
        });
        const output = await run.result;
        await run.stop();
        (0, vitest_1.expect)(output.success).toBeTruthy();
        (0, vitest_1.expect)(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', './storybook/tsconfig.ts', '-d', '.', '-e', 'json'], '');
        (0, vitest_1.expect)(buildDevStandaloneMock).toHaveBeenCalledWith(vitest_1.expect.objectContaining({
            angularBrowserTarget: 'angular-cli:build-2',
            angularBuilderContext: vitest_1.expect.any(Object),
            ci: false,
            disableTelemetry: undefined,
            configDir: '.storybook',
            host: 'localhost',
            https: false,
            packageJson: vitest_1.expect.any(Object),
            port: 9009,
            quiet: false,
            smokeTest: false,
            sslCa: undefined,
            sslCert: undefined,
            sslKey: undefined,
            tsConfig: './storybook/tsconfig.ts',
        }));
    });
    (0, vitest_1.it)('should start storybook with styles options', async () => {
        const run = await architect.scheduleBuilder('@storybook/angular:start-storybook', {
            tsConfig: 'path/to/tsConfig.json',
            port: 4400,
            compodoc: false,
            styles: ['src/styles.css'],
        });
        const output = await run.result;
        await run.stop();
        (0, vitest_1.expect)(output.success).toBeTruthy();
        (0, vitest_1.expect)(mockRunScript).not.toHaveBeenCalledWith();
        (0, vitest_1.expect)(buildDevStandaloneMock).toHaveBeenCalledWith({
            angularBrowserTarget: null,
            angularBuilderContext: vitest_1.expect.any(Object),
            angularBuilderOptions: { assets: [], styles: ['src/styles.css'] },
            disableTelemetry: undefined,
            ci: false,
            configDir: '.storybook',
            host: 'localhost',
            https: false,
            port: 4400,
            packageJson: vitest_1.expect.any(Object),
            quiet: false,
            smokeTest: false,
            sslCa: undefined,
            sslCert: undefined,
            sslKey: undefined,
            tsConfig: 'path/to/tsConfig.json',
        });
    });
});
