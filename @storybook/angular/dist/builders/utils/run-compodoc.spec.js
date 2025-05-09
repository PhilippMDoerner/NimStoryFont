"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const vitest_1 = require("vitest");
const run_compodoc_1 = require("./run-compodoc");
const mockRunScript = vitest_1.vi.fn();
vitest_1.vi.mock('storybook/internal/common', () => ({
    JsPackageManagerFactory: {
        getPackageManager: () => ({
            runPackageCommandSync: mockRunScript,
        }),
    },
}));
const builderContextLoggerMock = {
    createChild: vitest_1.vi.fn(),
    log: vitest_1.vi.fn(),
    debug: vitest_1.vi.fn(),
    info: vitest_1.vi.fn(),
    warn: vitest_1.vi.fn(),
    error: vitest_1.vi.fn(),
    fatal: vitest_1.vi.fn(),
};
(0, vitest_1.describe)('runCompodoc', () => {
    (0, vitest_1.afterEach)(() => {
        mockRunScript.mockClear();
    });
    const builderContextMock = {
        workspaceRoot: 'path/to/project',
        logger: builderContextLoggerMock,
    };
    (0, vitest_1.it)('should run compodoc with tsconfig from context', async () => {
        (0, run_compodoc_1.runCompodoc)({
            compodocArgs: [],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe((0, operators_1.take)(1))
            .subscribe();
        (0, vitest_1.expect)(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', 'path/to/tsconfig.json', '-d', 'path/to/project'], 'path/to/project', 'inherit');
    });
    (0, vitest_1.it)('should run compodoc with tsconfig from compodocArgs', async () => {
        (0, run_compodoc_1.runCompodoc)({
            compodocArgs: ['-p', 'path/to/tsconfig.stories.json'],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe((0, operators_1.take)(1))
            .subscribe();
        (0, vitest_1.expect)(mockRunScript).toHaveBeenCalledWith('compodoc', ['-d', 'path/to/project', '-p', 'path/to/tsconfig.stories.json'], 'path/to/project', 'inherit');
    });
    (0, vitest_1.it)('should run compodoc with default output folder.', async () => {
        (0, run_compodoc_1.runCompodoc)({
            compodocArgs: [],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe((0, operators_1.take)(1))
            .subscribe();
        (0, vitest_1.expect)(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', 'path/to/tsconfig.json', '-d', 'path/to/project'], 'path/to/project', 'inherit');
    });
    (0, vitest_1.it)('should run with custom output folder specified with --output compodocArgs', async () => {
        (0, run_compodoc_1.runCompodoc)({
            compodocArgs: ['--output', 'path/to/customFolder'],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe((0, operators_1.take)(1))
            .subscribe();
        (0, vitest_1.expect)(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', 'path/to/tsconfig.json', '--output', 'path/to/customFolder'], 'path/to/project', 'inherit');
    });
    (0, vitest_1.it)('should run with custom output folder specified with -d compodocArgs', async () => {
        (0, run_compodoc_1.runCompodoc)({
            compodocArgs: ['-d', 'path/to/customFolder'],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe((0, operators_1.take)(1))
            .subscribe();
        (0, vitest_1.expect)(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', 'path/to/tsconfig.json', '-d', 'path/to/customFolder'], 'path/to/project', 'inherit');
    });
});
