/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { BuilderOutput } from '@angular-devkit/architect';
import type { Config, ConfigOptions } from 'karma';
import type { ReadableStreamController } from 'node:stream/web';
import type { ApplicationBuilderInternalOptions } from '../application/options';
import type { Result } from '../application/results';
interface BuildOptions extends ApplicationBuilderInternalOptions {
    outputPath: string;
}
export declare function injectKarmaReporter(buildOptions: BuildOptions, buildIterator: AsyncIterator<Result>, karmaConfig: Config & ConfigOptions, controller: ReadableStreamController<BuilderOutput>): void;
export {};
