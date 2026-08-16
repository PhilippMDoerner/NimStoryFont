/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { type BuilderContext } from '@angular-devkit/architect';
import { Runner, type Schema as UnitTestBuilderOptions } from './schema';
export type NormalizedUnitTestBuilderOptions = Awaited<ReturnType<typeof normalizeOptions>>;
export declare function normalizeOptions(context: BuilderContext, projectName: string, options: UnitTestBuilderOptions): Promise<{
    workspaceRoot: string;
    projectRoot: string;
    projectSourceRoot: string;
    cacheOptions: import("../../utils/normalize-cache").NormalizedCachedOptions;
    buildTarget: import("@angular-devkit/architect").Target;
    include: string[];
    exclude: string[] | undefined;
    filter: string | undefined;
    runnerName: Runner;
    headless: boolean | undefined;
    coverage: {
        enabled: boolean | undefined;
        exclude: string[] | undefined;
        include: string[] | undefined;
        reporters: [string, Record<string, unknown>][] | undefined;
        thresholds: import("./schema").CoverageThresholds | undefined;
        watermarks: {
            statements?: [number, number];
            branches?: [number, number];
            functions?: [number, number];
            lines?: [number, number];
        };
    };
    tsConfig: string | undefined;
    buildProgress: boolean | undefined;
    reporters: [string, Record<string, unknown>][] | undefined;
    outputFile: string | undefined;
    browsers: [string, ...string[]] | undefined;
    browserViewport: {
        width: number;
        height: number;
    } | undefined;
    watch: boolean;
    debug: boolean;
    ui: boolean | undefined;
    isolate: boolean | undefined;
    quiet: boolean;
    providersFile: string | undefined;
    setupFiles: string[];
    dumpVirtualFiles: boolean | undefined;
    listTests: boolean | undefined;
    preserveSymlinks: boolean;
    runnerConfig: string | boolean | undefined;
}>;
export declare function injectTestingPolyfills(polyfills?: string[]): string[];
