"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.discover = discover;
/**
 * @fileoverview This file contains the logic for discovering the package manager
 * used in a project by searching for lockfiles. It is designed to be efficient
 * and to correctly handle monorepo structures.
 */
const node_path_1 = require("node:path");
const package_manager_descriptor_1 = require("./package-manager-descriptor");
/**
 * Searches a directory for lockfiles and returns a set of package managers that correspond to them.
 * @param host A `Host` instance for interacting with the file system.
 * @param directory The directory to search.
 * @param logger An optional logger instance.
 * @returns A promise that resolves to a set of package manager names.
 */
async function findLockfiles(host, directory, logger) {
    logger?.debug(`Searching for lockfiles in '${directory}'...`);
    const foundPackageManagers = new Set();
    const checks = [];
    for (const [name, descriptor] of Object.entries(package_manager_descriptor_1.SUPPORTED_PACKAGE_MANAGERS)) {
        const manager = name;
        for (const lockfile of descriptor.lockfiles) {
            checks.push((async () => {
                try {
                    const path = (0, node_path_1.join)(directory, lockfile);
                    const stats = await host.stat(path);
                    if (stats.isFile()) {
                        logger?.debug(`  Found '${lockfile}'.`);
                        foundPackageManagers.add(manager);
                    }
                }
                catch {
                    // File does not exist or cannot be accessed.
                }
            })());
        }
    }
    await Promise.all(checks);
    return foundPackageManagers;
}
/**
 * Checks if a given path is a directory.
 * @param host A `Host` instance for interacting with the file system.
 * @param path The path to check.
 * @returns A promise that resolves to true if the path is a directory, false otherwise.
 */
async function isDirectory(host, path) {
    try {
        return (await host.stat(path)).isDirectory();
    }
    catch {
        return false;
    }
}
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
async function discover(host, startDir, logger) {
    logger?.debug(`Starting package manager discovery in '${startDir}'...`);
    let currentDir = startDir;
    while (true) {
        const found = await findLockfiles(host, currentDir, logger);
        if (found.size > 0) {
            logger?.debug(`Found lockfile(s): [${[...found].join(', ')}]. Applying precedence...`);
            for (const packageManager of package_manager_descriptor_1.PACKAGE_MANAGER_PRECEDENCE) {
                if (found.has(packageManager)) {
                    logger?.debug(`Selected '${packageManager}' based on precedence.`);
                    return packageManager;
                }
            }
        }
        // Stop searching if we reach the git repository root.
        if (await isDirectory(host, (0, node_path_1.join)(currentDir, '.git'))) {
            logger?.debug(`Reached repository root at '${currentDir}'. Stopping search.`);
            return null;
        }
        const parentDir = (0, node_path_1.dirname)(currentDir);
        if (parentDir === currentDir) {
            // We have reached the filesystem root.
            logger?.debug('Reached filesystem root. No lockfile found.');
            return null;
        }
        currentDir = parentDir;
    }
}
//# sourceMappingURL=discovery.js.map