"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherVersionInfo = gatherVersionInfo;
const node_module_1 = require("node:module");
const node_version_1 = require("../../utilities/node-version");
const version_1 = require("../../utilities/version");
/**
 * A list of regular expression patterns that match package names that should be included in the
 * version output.
 */
const PACKAGE_PATTERNS = [
    /^@angular\/.*/,
    /^@angular-devkit\/.*/,
    /^@ngtools\/.*/,
    /^@schematics\/.*/,
    /^rxjs$/,
    /^typescript$/,
    /^ng-packagr$/,
    /^vitest$/,
    /^webpack$/,
    /^zone\.js$/,
];
/**
 * Gathers all the version information from the environment and workspace.
 * @returns An object containing all the version information.
 */
async function gatherVersionInfo(context) {
    // Trailing slash is used to allow the path to be treated as a directory
    const workspaceRequire = (0, node_module_1.createRequire)(context.root + '/');
    let workspacePackage;
    try {
        workspacePackage = workspaceRequire('./package.json');
    }
    catch { }
    const allDependencies = {
        ...workspacePackage?.dependencies,
        ...workspacePackage?.devDependencies,
    };
    const packageNames = new Set(Object.keys(allDependencies));
    const packages = {};
    for (const name of packageNames) {
        if (PACKAGE_PATTERNS.some((p) => p.test(name))) {
            packages[name] = {
                requested: allDependencies[name] ?? 'error',
                installed: getVersion(name, workspaceRequire),
            };
        }
    }
    const angularCoreVersion = packages['@angular/core'];
    return {
        cli: {
            version: version_1.VERSION.full,
        },
        framework: {
            version: angularCoreVersion?.installed,
        },
        system: {
            node: {
                version: process.versions.node,
                unsupported: !(0, node_version_1.isNodeVersionSupported)(),
            },
            os: {
                platform: process.platform,
                architecture: process.arch,
            },
            packageManager: {
                name: context.packageManager.name,
                version: await context.packageManager.getVersion(),
            },
        },
        packages,
    };
}
/**
 * Gets the version of a package.
 * @param moduleName The name of the package.
 * @param workspaceRequire A `require` function for the workspace.
 * @param localRequire A `require` function for the CLI.
 * @returns The version of the package, or `<error>` if it could not be found.
 */
function getVersion(moduleName, workspaceRequire) {
    let packageInfo;
    // Try to find the package in the workspace
    try {
        packageInfo = workspaceRequire(`${moduleName}/package.json`);
    }
    catch { }
    // If found, attempt to get the version
    if (packageInfo) {
        return packageInfo.version;
    }
    return '<error>';
}
//# sourceMappingURL=version-info.js.map