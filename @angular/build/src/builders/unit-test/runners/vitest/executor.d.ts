/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { type FullResult, type IncrementalResult } from '../../../application/results';
import { NormalizedUnitTestBuilderOptions } from '../../options';
import type { TestExecutor } from '../api';
export declare class VitestExecutor implements TestExecutor {
    private vitest;
    private normalizePath;
    private readonly projectName;
    private readonly options;
    private readonly logger;
    private readonly buildResultFiles;
    private readonly externalMetadata;
    private readonly debugLevel;
    private readonly testFileToEntryPoint;
    private readonly entryPointToTestFile;
    constructor(projectName: string, options: NormalizedUnitTestBuilderOptions, testEntryPointMappings: Map<string, string> | undefined, logger: BuilderContext['logger']);
    private debugLog;
    execute(buildResult: FullResult | IncrementalResult): AsyncIterable<BuilderOutput>;
    [Symbol.asyncDispose](): Promise<void>;
    private prepareSetupFiles;
    private initializeVitest;
}
