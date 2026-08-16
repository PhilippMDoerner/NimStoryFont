"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyChecker = exports.MissingDependenciesError = void 0;
const resolve_project_1 = require("../../../utils/resolve-project");
/**
 * A custom error class to represent missing dependency errors.
 * This is used to avoid printing a stack trace for this expected error.
 */
class MissingDependenciesError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MissingDependenciesError';
    }
}
exports.MissingDependenciesError = MissingDependenciesError;
class DependencyChecker {
    resolver;
    missingDependencies = new Set();
    constructor(projectSourceRoot) {
        this.resolver = (0, resolve_project_1.createProjectResolver)(projectSourceRoot);
    }
    /**
     * Checks if a package is installed.
     * @param packageName The name of the package to check.
     * @returns True if the package is found, false otherwise.
     */
    isInstalled(packageName) {
        try {
            this.resolver(packageName);
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Verifies that a package is installed and adds it to a list of missing
     * dependencies if it is not.
     * @param packageName The name of the package to check.
     */
    check(packageName) {
        if (!this.isInstalled(packageName)) {
            this.missingDependencies.add(packageName);
        }
    }
    /**
     * Verifies that at least one of a list of packages is installed. If none are
     * installed, a custom error message is added to the list of errors.
     * @param packageNames An array of package names to check.
     * @param customErrorMessage The error message to use if none of the packages are found.
     */
    checkAny(packageNames, customErrorMessage) {
        if (packageNames.every((name) => !this.isInstalled(name))) {
            // This is a custom error, so we add it directly.
            // Using a Set avoids duplicate custom messages.
            this.missingDependencies.add(customErrorMessage);
        }
    }
    /**
     * Throws a `MissingDependenciesError` if any dependencies were found to be missing.
     * The error message is a formatted list of all missing packages.
     */
    report() {
        if (this.missingDependencies.size === 0) {
            return;
        }
        let message = 'The following packages are required but were not found:\n';
        for (const name of this.missingDependencies) {
            message += `  - ${name}\n`;
        }
        message += 'Please install the missing packages and rerun the test command.';
        throw new MissingDependenciesError(message);
    }
}
exports.DependencyChecker = DependencyChecker;
//# sourceMappingURL=dependency-checker.js.map