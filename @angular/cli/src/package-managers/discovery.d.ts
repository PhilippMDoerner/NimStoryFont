/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Host } from './host';
import { Logger } from './logger';
import { PackageManagerName } from './package-manager-descriptor';
/**
 * Discovers the package manager used in a project by searching for lockfiles.
 *
 * This function searches for lockfiles in the given directory and its ancestors.
 * If multiple lockfiles are found, it uses the precedence array to determine
 * which package manager to use. The search is bounded by the git repository root.
 *
 * @param host A `Host` instance for interacting with the file system.
 * @param startDir The directory to start the search from.
 * @param logger An optional logger instance.
 * @returns A promise that resolves to the name of the discovered package manager, or null if none is found.
 */
export declare function discover(host: Host, startDir: string, logger?: Logger): Promise<PackageManagerName | null>;
