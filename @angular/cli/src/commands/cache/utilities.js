"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCacheConfig = updateCacheConfig;
exports.getCacheConfig = getCacheConfig;
const core_1 = require("@angular-devkit/core");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const workspace_schema_1 = require("../../../lib/config/workspace-schema");
function updateCacheConfig(workspace, key, value) {
    const cli = (workspace.extensions['cli'] ??= {});
    const cache = (cli['cache'] ??= {});
    cache[key] = value;
    return workspace.save();
}
function getCacheBasePath(workspaceRoot, cachePathSetting) {
    if ((0, node_path_1.isAbsolute)(cachePathSetting)) {
        return cachePathSetting;
    }
    try {
        // Find the git directory, walking up from workspaceRoot if necessary
        let currentDir = workspaceRoot;
        while (true) {
            const gitPath = (0, node_path_1.join)(currentDir, '.git');
            if ((0, node_fs_1.existsSync)(gitPath)) {
                const stat = (0, node_fs_1.statSync)(gitPath);
                if (stat.isFile()) {
                    // Could be a git worktree (or submodule)
                    const content = (0, node_fs_1.readFileSync)(gitPath, 'utf8');
                    const match = /^gitdir:\s*(.+)$/m.exec(content);
                    if (match) {
                        const gitdir = (0, node_path_1.resolve)(currentDir, match[1].trim());
                        const commondirPath = (0, node_path_1.join)(gitdir, 'commondir');
                        if ((0, node_fs_1.existsSync)(commondirPath)) {
                            // It's a git worktree
                            const commondir = (0, node_fs_1.readFileSync)(commondirPath, 'utf8').trim();
                            const commonGitDir = (0, node_path_1.resolve)(gitdir, commondir);
                            return (0, node_path_1.resolve)((0, node_path_1.dirname)(commonGitDir), cachePathSetting);
                        }
                    }
                }
            }
            const parentDir = (0, node_path_1.dirname)(currentDir);
            if (parentDir === currentDir) {
                break;
            }
            currentDir = parentDir;
        }
    }
    catch { }
    return (0, node_path_1.resolve)(workspaceRoot, cachePathSetting);
}
function getCacheConfig(workspace) {
    if (!workspace) {
        throw new Error(`Cannot retrieve cache configuration as workspace is not defined.`);
    }
    const defaultSettings = {
        path: getCacheBasePath(workspace.basePath, '.angular/cache'),
        environment: workspace_schema_1.Environment.Local,
        enabled: true,
    };
    const cliSetting = workspace.extensions['cli'];
    if (!cliSetting || !(0, core_1.isJsonObject)(cliSetting)) {
        return defaultSettings;
    }
    const cacheSettings = cliSetting['cache'];
    if (!(0, core_1.isJsonObject)(cacheSettings)) {
        return defaultSettings;
    }
    const { path = '.angular/cache', environment = defaultSettings.environment, enabled = defaultSettings.enabled,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } = cacheSettings;
    return {
        path: getCacheBasePath(workspace.basePath, path),
        environment,
        enabled,
    };
}
//# sourceMappingURL=utilities.js.map