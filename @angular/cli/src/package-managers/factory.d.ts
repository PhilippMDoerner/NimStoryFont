/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Logger } from './logger';
import { PackageManager } from './package-manager';
import { PackageManagerName } from './package-manager-descriptor';
/**
 * Information about the package manager to use for a given project.
 */
export type ConfiguredPackageManagerInfo = [name?: PackageManagerName, version?: string];
/**
 * Creates a new `PackageManager` instance for a given project.
 *
 * This function is the main entry point for the package manager abstraction.
 * It will determine, verify, and instantiate the correct package manager.
 *
 * @param options An object containing the options for creating the package manager.
 * @returns A promise that resolves to a new `PackageManager` instance.
 */
export declare function createPackageManager(options: {
    cwd: string;
    configuredPackageManager?: ConfiguredPackageManagerInfo;
    logger?: Logger;
    dryRun?: boolean;
    tempDirectory?: string;
}): Promise<PackageManager>;
