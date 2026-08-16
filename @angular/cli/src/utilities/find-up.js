"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUp = findUp;
exports.findUpSync = findUpSync;
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
/**
 * Find a file or directory by walking up the directory tree.
 * @param names The name or names of the files or directories to find.
 * @param from The directory to start the search from.
 * @returns The path to the first match found, or `null` if no match was found.
 */
async function findUp(names, from) {
    const filenames = Array.isArray(names) ? names : [names];
    let currentDir = (0, node_path_1.resolve)(from);
    while (true) {
        for (const name of filenames) {
            const p = (0, node_path_1.join)(currentDir, name);
            try {
                await (0, promises_1.stat)(p);
                return p;
            }
            catch {
                // Ignore errors (e.g. file not found).
            }
        }
        const parentDir = (0, node_path_1.dirname)(currentDir);
        if (parentDir === currentDir) {
            break;
        }
        currentDir = parentDir;
    }
    return null;
}
/**
 * Synchronously find a file or directory by walking up the directory tree.
 * @param names The name or names of the files or directories to find.
 * @param from The directory to start the search from.
 * @returns The path to the first match found, or `null` if no match was found.
 */
function findUpSync(names, from) {
    const filenames = Array.isArray(names) ? names : [names];
    let currentDir = (0, node_path_1.resolve)(from);
    while (true) {
        for (const name of filenames) {
            const p = (0, node_path_1.join)(currentDir, name);
            if ((0, node_fs_1.existsSync)(p)) {
                return p;
            }
        }
        const parentDir = (0, node_path_1.dirname)(currentDir);
        if (parentDir === currentDir) {
            break;
        }
        currentDir = parentDir;
    }
    return null;
}
//# sourceMappingURL=find-up.js.map