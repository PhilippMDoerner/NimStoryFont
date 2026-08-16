/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { logging } from '@angular-devkit/core';
import type { PackageManager } from '../../../package-managers';
/**
 * Coerces a string into a valid semantic version number.
 * @param version The version string to coerce.
 * @returns A valid semantic version string, or undefined if coercion fails.
 */
export declare function coerceVersionNumber(version: string | undefined): string | undefined;
/**
 * Checks if the installed CLI version is compatible with the packages being updated.
 * @param packagesToUpdate The list of packages being updated.
 * @param logger The logger instance.
 * @param packageManager The package manager instance.
 * @param verbose Whether to log verbose output.
 * @param next Whether to check for the next version.
 * @returns The version of the CLI to install, or null if the current version is compatible.
 */
export declare function checkCLIVersion(packagesToUpdate: string[], logger: logging.LoggerApi, packageManager: PackageManager, next?: boolean): Promise<string | null>;
/**
 * Determines the version of the CLI to use for the update process.
 * @param packagesToUpdate The list of packages being updated.
 * @param next Whether to use the next version.
 * @returns The version or tag to use for the CLI update runner.
 */
export declare function getCLIUpdateRunnerVersion(packagesToUpdate: string[] | undefined, next: boolean): string | number;
/**
 * Runs a binary from a temporary package installation.
 * @param packageName The name of the package to install and run.
 * @param packageManager The package manager instance.
 * @param args The arguments to pass to the binary.
 * @returns The exit code of the binary.
 */
export declare function runTempBinary(packageName: string, packageManager: PackageManager, args?: string[]): Promise<number>;
/**
 * Determines whether to force the package manager to ignore peer dependency warnings.
 * @param packageManager The package manager instance.
 * @param logger The logger instance.
 * @param verbose Whether to log verbose output.
 * @returns True if the package manager should be forced, false otherwise.
 */
export declare function shouldForcePackageManager(packageManager: PackageManager, logger: logging.LoggerApi, verbose: boolean): Promise<boolean>;
