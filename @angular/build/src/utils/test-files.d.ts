/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ResultFile } from '../builders/application/results';
/**
 * Writes a collection of build result files to a specified directory.
 * This function handles both in-memory and on-disk files, creating subdirectories
 * as needed.
 *
 * @param files A map of file paths to `ResultFile` objects, representing the build output.
 * @param testDir The absolute path to the directory where the files should be written.
 */
export declare function writeTestFiles(files: Record<string, ResultFile>, testDir: string): Promise<void>;
