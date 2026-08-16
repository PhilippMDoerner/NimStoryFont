/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type ts from 'typescript';
import { MemoryLoadResultCache } from '../load-result-cache';
export declare class SourceFileCache extends Map<string, ts.SourceFile> {
    readonly persistentCachePath?: string | undefined;
    readonly modifiedFiles: Set<string>;
    readonly typeScriptFileCache: Map<string, string | Uint8Array<ArrayBufferLike>>;
    readonly loadResultCache: MemoryLoadResultCache;
    referencedFiles?: readonly string[];
    constructor(persistentCachePath?: string | undefined);
    /**
     * Releases all cached content. The cached data is only needed for incremental
     * rebuilds and can include the emitted contents of every TypeScript file in the
     * program. The cache is repopulated if a build is performed after this is called.
     */
    clear(): void;
    invalidate(files: Iterable<string>): boolean;
}
