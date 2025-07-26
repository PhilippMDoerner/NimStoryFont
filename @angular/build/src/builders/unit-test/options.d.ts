/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { type BuilderContext } from '@angular-devkit/architect';
import type { Schema as UnitTestOptions } from './schema';
export type NormalizedUnitTestOptions = Awaited<ReturnType<typeof normalizeOptions>>;
export declare function normalizeOptions(context: BuilderContext, projectName: string, options: UnitTestOptions): Promise<{
    workspaceRoot: string;
    projectRoot: string;
    projectSourceRoot: string;
    cacheOptions: import("../../utils/normalize-cache").NormalizedCachedOptions;
    buildTarget: import("@angular-devkit/architect").Target;
    include: string[];
    exclude: string[];
    runnerName: import("./schema").Runner;
    codeCoverage: boolean | undefined;
    codeCoverageExclude: string[] | undefined;
    tsConfig: string;
    reporters: string[] | undefined;
    browsers: string[] | undefined;
    watch: boolean;
    debug: boolean;
    providersFile: string | undefined;
}>;
