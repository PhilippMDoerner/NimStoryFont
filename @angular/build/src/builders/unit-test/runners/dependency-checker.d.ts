/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * A custom error class to represent missing dependency errors.
 * This is used to avoid printing a stack trace for this expected error.
 */
export declare class MissingDependenciesError extends Error {
    constructor(message: string);
}
export declare class DependencyChecker {
    private readonly resolver;
    private readonly missingDependencies;
    constructor(projectSourceRoot: string);
    /**
     * Checks if a package is installed.
     * @param packageName The name of the package to check.
     * @returns True if the package is found, false otherwise.
     */
    private isInstalled;
    /**
     * Verifies that a package is installed and adds it to a list of missing
     * dependencies if it is not.
     * @param packageName The name of the package to check.
     */
    check(packageName: string): void;
    /**
     * Verifies that at least one of a list of packages is installed. If none are
     * installed, a custom error message is added to the list of errors.
     * @param packageNames An array of package names to check.
     * @param customErrorMessage The error message to use if none of the packages are found.
     */
    checkAny(packageNames: string[], customErrorMessage: string): void;
    /**
     * Throws a `MissingDependenciesError` if any dependencies were found to be missing.
     * The error message is a formatted list of all missing packages.
     */
    report(): void;
}
