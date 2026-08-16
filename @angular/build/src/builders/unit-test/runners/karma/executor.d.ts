/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { BuilderContext, BuilderOutput } from '@angular-devkit/architect';
import { type NormalizedUnitTestBuilderOptions } from '../../options';
import type { TestExecutor } from '../api';
export declare class KarmaExecutor implements TestExecutor {
    private context;
    private options;
    constructor(context: BuilderContext, options: NormalizedUnitTestBuilderOptions);
    execute(): AsyncIterable<BuilderOutput>;
    [Symbol.asyncDispose](): Promise<void>;
}
