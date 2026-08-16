/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * Finds the Vitest configuration file in the given search directories.
 *
 * @param searchDirs An array of directories to search for the configuration file.
 * @returns The path to the configuration file, or `false` if no file is found.
 * Returning `false` is used to disable Vitest's default configuration file search.
 */
export declare function findVitestBaseConfig(searchDirs: string[]): Promise<string | false>;
