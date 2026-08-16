"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTestFiles = writeTestFiles;
const fs = __importStar(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const bundler_files_1 = require("../tools/esbuild/bundler-files");
const utils_1 = require("../tools/esbuild/utils");
/**
 * Writes a collection of build result files to a specified directory.
 * This function handles both in-memory and on-disk files, creating subdirectories
 * as needed.
 *
 * @param files A map of file paths to `ResultFile` objects, representing the build output.
 * @param testDir The absolute path to the directory where the files should be written.
 */
async function writeTestFiles(files, testDir) {
    const directoryExists = new Set();
    // Writes the test related output files to disk and ensures the containing directories are present
    await (0, utils_1.emitFilesToDisk)(Object.entries(files), async ([filePath, file]) => {
        if (file.type !== bundler_files_1.BuildOutputFileType.Browser && file.type !== bundler_files_1.BuildOutputFileType.Media) {
            return;
        }
        const fullFilePath = node_path_1.default.join(testDir, filePath);
        // Ensure output subdirectories exist
        const fileBasePath = node_path_1.default.dirname(fullFilePath);
        if (fileBasePath && !directoryExists.has(fileBasePath)) {
            await fs.mkdir(fileBasePath, { recursive: true });
            directoryExists.add(fileBasePath);
        }
        if (file.origin === 'memory') {
            // Write file contents
            await fs.writeFile(fullFilePath, file.contents);
        }
        else {
            // Copy file contents
            await fs.copyFile(file.inputPath, fullFilePath, fs.constants.COPYFILE_FICLONE);
        }
    });
}
//# sourceMappingURL=test-files.js.map