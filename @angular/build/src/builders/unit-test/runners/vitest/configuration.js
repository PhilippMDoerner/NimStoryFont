"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVitestBaseConfig = findVitestBaseConfig;
/**
 * @fileoverview
 * This file contains utility functions for finding the Vitest base configuration file.
 */
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
/**
 * A list of potential Vitest configuration filenames.
 * The order of the files is important as the first one found will be used.
 */
const POTENTIAL_CONFIGS = [
    'vitest-base.config.ts',
    'vitest-base.config.mts',
    'vitest-base.config.cts',
    'vitest-base.config.js',
    'vitest-base.config.mjs',
    'vitest-base.config.cjs',
];
/**
 * Finds the Vitest configuration file in the given search directories.
 *
 * @param searchDirs An array of directories to search for the configuration file.
 * @returns The path to the configuration file, or `false` if no file is found.
 * Returning `false` is used to disable Vitest's default configuration file search.
 */
async function findVitestBaseConfig(searchDirs) {
    const uniqueDirs = new Set(searchDirs);
    for (const dir of uniqueDirs) {
        try {
            const entries = await (0, promises_1.readdir)(dir, { withFileTypes: true });
            const files = new Set(entries.filter((e) => e.isFile()).map((e) => e.name));
            for (const potential of POTENTIAL_CONFIGS) {
                if (files.has(potential)) {
                    return node_path_1.default.join(dir, potential);
                }
            }
        }
        catch {
            // Ignore directories that cannot be read
        }
    }
    return false;
}
//# sourceMappingURL=configuration.js.map