/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { BuilderContext } from '@angular-devkit/architect';
import type { NormalizedKarmaBuilderOptions } from './options';
export declare function getProjectSourceRoot(context: BuilderContext): Promise<string>;
export declare function normalizePolyfills(polyfills?: string[]): [polyfills: string[], jasmineCleanup: string[]];
export declare function collectEntrypoints(options: NormalizedKarmaBuilderOptions, context: BuilderContext, projectSourceRoot: string): Promise<Map<string, string>>;
export declare function hasChunkOrWorkerFiles(files: Record<string, unknown>): boolean;
/** Returns the first item yielded by the given generator and cancels the execution. */
export declare function first<T>(generator: AsyncIterable<T>, { cancel }: {
    cancel: boolean;
}): Promise<[T, AsyncIterator<T> | null]>;
