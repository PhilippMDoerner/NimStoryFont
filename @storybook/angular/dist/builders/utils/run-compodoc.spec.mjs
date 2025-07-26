import { take } from 'rxjs/operators';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { runCompodoc } from './run-compodoc';
const mockRunScript = vi.fn();
vi.mock('storybook/internal/common', () => ({
    JsPackageManagerFactory: {
        getPackageManager: () => ({
            runPackageCommandSync: mockRunScript,
        }),
    },
}));
const builderContextLoggerMock = {
    createChild: vi.fn(),
    log: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn(),
};
describe('runCompodoc', () => {
    afterEach(() => {
        mockRunScript.mockClear();
    });
    const builderContextMock = {
        workspaceRoot: 'path/to/project',
        logger: builderContextLoggerMock,
    };
    it('should run compodoc with tsconfig from context', async () => {
        runCompodoc({
            compodocArgs: [],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe(take(1))
            .subscribe();
        expect(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', 'path/to/tsconfig.json', '-d', 'path/to/project'], 'path/to/project', 'inherit');
    });
    it('should run compodoc with tsconfig from compodocArgs', async () => {
        runCompodoc({
            compodocArgs: ['-p', 'path/to/tsconfig.stories.json'],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe(take(1))
            .subscribe();
        expect(mockRunScript).toHaveBeenCalledWith('compodoc', ['-d', 'path/to/project', '-p', 'path/to/tsconfig.stories.json'], 'path/to/project', 'inherit');
    });
    it('should run compodoc with default output folder.', async () => {
        runCompodoc({
            compodocArgs: [],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe(take(1))
            .subscribe();
        expect(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', 'path/to/tsconfig.json', '-d', 'path/to/project'], 'path/to/project', 'inherit');
    });
    it('should run with custom output folder specified with --output compodocArgs', async () => {
        runCompodoc({
            compodocArgs: ['--output', 'path/to/customFolder'],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe(take(1))
            .subscribe();
        expect(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', 'path/to/tsconfig.json', '--output', 'path/to/customFolder'], 'path/to/project', 'inherit');
    });
    it('should run with custom output folder specified with -d compodocArgs', async () => {
        runCompodoc({
            compodocArgs: ['-d', 'path/to/customFolder'],
            tsconfig: 'path/to/tsconfig.json',
        }, builderContextMock)
            .pipe(take(1))
            .subscribe();
        expect(mockRunScript).toHaveBeenCalledWith('compodoc', ['-p', 'path/to/tsconfig.json', '-d', 'path/to/customFolder'], 'path/to/project', 'inherit');
    });
});
