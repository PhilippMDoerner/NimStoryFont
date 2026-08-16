"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageManagerError = void 0;
/**
 * @fileoverview This file defines a custom error class for the package manager
 * abstraction. This allows for structured error handling and provides consumers
 * with detailed information about the process failure.
 */
/**
 * A custom error class for package manager-related errors.
 *
 * This error class provides structured data about the failed process,
 * including stdout, stderr, and the exit code.
 */
class PackageManagerError extends Error {
    stdout;
    stderr;
    exitCode;
    /**
     * Creates a new `PackageManagerError` instance.
     * @param message The error message.
     * @param stdout The standard output of the failed process.
     * @param stderr The standard error of the failed process.
     * @param exitCode The exit code of the failed process.
     */
    constructor(message, stdout, stderr, exitCode) {
        super(message);
        this.stdout = stdout;
        this.stderr = stderr;
        this.exitCode = exitCode;
    }
}
exports.PackageManagerError = PackageManagerError;
//# sourceMappingURL=error.js.map