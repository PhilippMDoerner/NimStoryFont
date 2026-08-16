/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * Groups files into batches whose combined argument length (including `baseLength`
 * for the fixed leading arguments) stays under `maxLength`. A file longer on its own
 * than the budget still gets its own batch, so files are never dropped.
 */
export declare function batchFilesByArgumentLength(files: Iterable<string>, baseLength: number, maxLength: number): string[][];
/**
 * Formats files using Prettier.
 * @param cwd The current working directory.
 * @param files The files to format.
 */
export declare function formatFiles(cwd: string, files: Set<string>): Promise<void>;
