"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCacheOptions = normalizeCacheOptions;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
/** Version placeholder is replaced during the build process with actual package version */
const VERSION = '22.1.3';
function hasCacheMetadata(value) {
    return (!!value &&
        typeof value === 'object' &&
        'cli' in value &&
        !!value['cli'] &&
        typeof value['cli'] === 'object' &&
        'cache' in value['cli']);
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
function normalizeCacheOptions(projectMetadata, worspaceRoot) {
    const cacheMetadata = hasCacheMetadata(projectMetadata) ? projectMetadata.cli.cache : {};
    const { 
    // Webcontainers do not currently benefit from persistent disk caching and can lead to increased browser memory usage
    enabled = !process.versions.webcontainer, environment = 'local', path = '.angular/cache', } = cacheMetadata;
    const isCI = process.env['CI'] === '1' || process.env['CI']?.toLowerCase() === 'true';
    let cacheEnabled = enabled;
    if (cacheEnabled) {
        switch (environment) {
            case 'ci':
                cacheEnabled = isCI;
                break;
            case 'local':
                cacheEnabled = !isCI;
                break;
        }
    }
    const cacheBasePath = getCacheBasePath(worspaceRoot, path);
    return {
        enabled: cacheEnabled,
        basePath: cacheBasePath,
        path: (0, node_path_1.join)(cacheBasePath, VERSION),
    };
}
//# sourceMappingURL=normalize-cache.js.map