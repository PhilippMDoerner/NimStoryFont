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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCleanGit = checkCleanGit;
exports.hasChangesToCommit = hasChangesToCommit;
exports.createCommit = createCommit;
exports.findCurrentGitSha = findCurrentGitSha;
exports.getShortHash = getShortHash;
const node_child_process_1 = require("node:child_process");
const path = __importStar(require("node:path"));
/**
 * Execute a git command.
 * @param args Arguments to pass to the git command.
 * @param input Optional input to pass to the command via stdin.
 * @returns The output of the command.
 */
function execGit(args, input) {
    return (0, node_child_process_1.execFileSync)('git', args, { encoding: 'utf8', stdio: 'pipe', input });
}
/**
 * Checks if the git repository is clean.
 * This function only checks for changes that are within the specified root directory.
 * Changes outside the root directory are ignored.
 * @param root The root directory of the project to check.
 * @returns True if the repository is clean within the root, false otherwise.
 */
function checkCleanGit(root) {
    try {
        const topLevel = execGit(['rev-parse', '--show-toplevel']);
        const result = execGit(['status', '--porcelain', '-z']);
        if (result.length === 0) {
            return true;
        }
        const entries = result.split('\0');
        for (let i = 0; i < entries.length; i++) {
            const line = entries[i];
            if (!line) {
                continue;
            }
            // Status is the first 2 characters.
            // If the status is a rename ('R'), the next entry in the split array is the target path.
            let filePath = line.slice(3);
            const status = line.slice(0, 2);
            if (status[0] === 'R') {
                // Check the source path (filePath)
                if (isPathInsideRoot(filePath, root, topLevel.trim())) {
                    return false;
                }
                // The next entry is the target path of the rename.
                i++;
                filePath = entries[i];
            }
            if (isPathInsideRoot(filePath, root, topLevel.trim())) {
                return false;
            }
        }
    }
    catch { }
    return true;
}
function isPathInsideRoot(filePath, root, topLevel) {
    const relativeEntry = path.relative(path.resolve(root), path.resolve(topLevel, filePath));
    return !relativeEntry.startsWith('..') && !path.isAbsolute(relativeEntry);
}
/**
 * Checks if the working directory has pending changes to commit.
 * @returns Whether or not the working directory has Git changes to commit. Returns false if not in a Git repository.
 */
function hasChangesToCommit() {
    try {
        // List all modified files not covered by .gitignore.
        // If any files are returned, then there must be something to commit.
        return execGit(['ls-files', '-m', '-d', '-o', '--exclude-standard']).trim() !== '';
    }
    catch {
        return false;
    }
}
/**
 * Stages all changes in the Git working tree and creates a new commit.
 * @param message The commit message to use.
 */
function createCommit(message) {
    // Stage entire working tree for commit.
    execGit(['add', '-A']);
    // Commit with the message passed via stdin to avoid bash escaping issues.
    execGit(['commit', '--no-verify', '-F', '-'], message);
}
/**
 * Finds the full Git SHA hash of the HEAD commit.
 * @returns The full Git SHA hash of the HEAD commit. Returns null if unable to retrieve the hash.
 */
function findCurrentGitSha() {
    try {
        return execGit(['rev-parse', 'HEAD']).trim();
    }
    catch {
        return null;
    }
}
/**
 * Gets the short hash of a commit.
 * @param commitHash The full commit hash.
 * @returns The short hash (first 9 characters).
 */
function getShortHash(commitHash) {
    return commitHash.slice(0, 9);
}
//# sourceMappingURL=git.js.map