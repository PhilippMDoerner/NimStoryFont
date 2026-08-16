/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * Find a file or directory by walking up the directory tree.
 * @param names The name or names of the files or directories to find.
 * @param from The directory to start the search from.
 * @returns The path to the first match found, or `null` if no match was found.
 */
export declare function findUp(names: string | string[], from: string): Promise<string | null>;
/**
 * Synchronously find a file or directory by walking up the directory tree.
 * @param names The name or names of the files or directories to find.
 * @param from The directory to start the search from.
 * @returns The path to the first match found, or `null` if no match was found.
 */
export declare function findUpSync(names: string | string[], from: string): string | null;
