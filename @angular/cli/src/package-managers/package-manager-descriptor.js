"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PACKAGE_MANAGER_PRECEDENCE = exports.SUPPORTED_PACKAGE_MANAGERS = void 0;
const parsers_1 = require("./parsers");
/** A set of error codes that are known to indicate a "package not found" error. */
const NOT_FOUND_ERROR_CODES = new Set(['E404']);
/**
 * A shared function to check if a structured error represents a "package not found" error.
 * @param error The structured error to check.
 * @returns True if the error code is a known "not found" code, false otherwise.
 */
function isKnownNotFound(error) {
    return NOT_FOUND_ERROR_CODES.has(error.code);
}
/**
 * A map of supported package managers to their descriptors.
 * This is the single source of truth for all package-manager-specific
 * configuration and behavior.
 *
 * Each descriptor is intentionally explicit and self-contained. This approach
 * avoids inheritance or fallback logic between package managers, ensuring that
 * the behavior for each one is clear, predictable, and easy to modify in
 * isolation. For example, `yarn-classic` does not inherit any properties from
 * the `yarn` descriptor; it is a complete and independent definition.
 */
exports.SUPPORTED_PACKAGE_MANAGERS = {
    npm: {
        binary: 'npm',
        lockfiles: ['package-lock.json', 'npm-shrinkwrap.json'],
        addCommand: 'install',
        installCommand: ['install'],
        forceFlag: '--force',
        saveExactFlag: '--save-exact',
        saveTildeFlag: '--save-tilde',
        saveDevFlag: '--save-dev',
        noLockfileFlag: '--no-package-lock',
        ignoreScriptsFlag: '--ignore-scripts',
        ignorePeerDependenciesFlag: '--force',
        configFiles: ['.npmrc'],
        getRegistryOptions: (registry) => ({ args: ['--registry', registry] }),
        versionCommand: ['--version'],
        listDependenciesCommand: ['list', '--depth=0', '--json=true', '--all=true'],
        getReleaseAgeConfigCommand: ['config', 'get', 'before'],
        getPackageNameCommand: ['pkg', 'get', 'name'],
        getManifestCommand: ['view', '--json'],
        viewCommandFieldArgFormatter: (fields) => [...fields],
        outputParsers: {
            listDependencies: parsers_1.parseNpmLikeDependencies,
            getRegistryManifest: parsers_1.parseNpmLikeManifest,
            getRegistryMetadata: parsers_1.parseNpmLikeMetadata,
            getError: parsers_1.parseNpmLikeError,
            getReleaseAge: parsers_1.parseNpmBeforeDate,
        },
        isNotFound: isKnownNotFound,
    },
    yarn: {
        binary: 'yarn',
        lockfiles: ['yarn.lock'],
        addCommand: 'add',
        installCommand: ['install'],
        forceFlag: '--force',
        saveExactFlag: '--exact',
        saveTildeFlag: '--tilde',
        saveDevFlag: '--dev',
        noLockfileFlag: '',
        ignoreScriptsFlag: '--mode=skip-build',
        configFiles: ['.yarnrc.yml', '.yarnrc.yaml'],
        copyConfigFromProject: true,
        getRegistryOptions: (registry) => ({ env: { YARN_NPM_REGISTRY_SERVER: registry } }),
        versionCommand: ['--version'],
        listDependenciesCommand: ['info', '--name-only', '--json'],
        getReleaseAgeConfigCommand: ['config', 'get', 'npmMinimalAgeGate'],
        getManifestCommand: ['npm', 'info', '--json'],
        viewCommandFieldArgFormatter: (fields) => ['--fields', fields.join(',')],
        outputParsers: {
            listDependencies: parsers_1.parseYarnModernDependencies,
            getRegistryManifest: parsers_1.parseNpmLikeManifest,
            getRegistryMetadata: parsers_1.parseNpmLikeMetadata,
            getError: parsers_1.parseNpmLikeError,
            getReleaseAge: parsers_1.parseYarnReleaseAge,
        },
        isNotFound: isKnownNotFound,
    },
    'yarn-classic': {
        binary: 'yarn',
        // This is intentionally empty. `yarn-classic` is not a discoverable package manager.
        // The discovery process finds `yarn` via `yarn.lock`, and the factory logic
        // determines whether it is classic or modern by checking the installed version.
        lockfiles: [],
        addCommand: 'add',
        installCommand: ['install'],
        forceFlag: '--force',
        saveExactFlag: '--exact',
        saveTildeFlag: '--tilde',
        saveDevFlag: '--dev',
        noLockfileFlag: '--no-lockfile',
        ignoreScriptsFlag: '--ignore-scripts',
        configFiles: ['.yarnrc', '.npmrc'],
        getRegistryOptions: (registry) => ({ args: ['--registry', registry] }),
        versionCommand: ['--version'],
        listDependenciesCommand: ['list', '--depth=0', '--json'],
        getManifestCommand: ['info', '--json', '--verbose'],
        requiresManifestVersionLookup: true,
        outputParsers: {
            listDependencies: parsers_1.parseYarnClassicDependencies,
            getRegistryManifest: parsers_1.parseYarnClassicManifest,
            getRegistryMetadata: parsers_1.parseYarnClassicMetadata,
            getError: parsers_1.parseYarnClassicError,
        },
        isNotFound: isKnownNotFound,
    },
    pnpm: {
        binary: 'pnpm',
        lockfiles: ['pnpm-lock.yaml'],
        addCommand: 'add',
        installCommand: ['install'],
        forceFlag: '--force',
        saveExactFlag: '--save-exact',
        saveTildeFlag: '--save-tilde',
        saveDevFlag: '--save-dev',
        noLockfileFlag: '--no-lockfile',
        ignoreScriptsFlag: '--ignore-scripts',
        ignorePeerDependenciesFlag: '--strict-peer-dependencies=false',
        configFiles: ['.npmrc', 'pnpm-workspace.yaml'],
        getRegistryOptions: (registry) => ({ args: ['--registry', registry] }),
        versionCommand: ['--version'],
        listDependenciesCommand: ['list', '--depth=0', '--json'],
        getReleaseAgeConfigCommand: ['config', 'get', 'minimum-release-age'],
        getPackageNameCommand: ['pkg', 'get', 'name'],
        getManifestCommand: ['view', '--json'],
        viewCommandFieldArgFormatter: (fields) => [...fields],
        outputParsers: {
            listDependencies: parsers_1.parseNpmLikeDependencies,
            getRegistryManifest: parsers_1.parseNpmLikeManifest,
            getRegistryMetadata: parsers_1.parseNpmLikeMetadata,
            getError: parsers_1.parseNpmLikeError,
            getReleaseAge: parsers_1.parsePnpmReleaseAge,
        },
        isNotFound: isKnownNotFound,
    },
    bun: {
        binary: 'bun',
        lockfiles: ['bun.lockb', 'bun.lock'],
        addCommand: 'add',
        installCommand: ['install'],
        forceFlag: '--force',
        saveExactFlag: '--exact',
        saveTildeFlag: '', // Bun does not have a flag for tilde, it defaults to caret.
        saveDevFlag: '--development',
        noLockfileFlag: '', // Bun does not have a flag for this.
        ignoreScriptsFlag: '--ignore-scripts',
        configFiles: ['bunfig.toml', '.npmrc'],
        copyConfigFromProject: true,
        getRegistryOptions: (registry) => ({ args: ['--registry', registry] }),
        versionCommand: ['--version'],
        listDependenciesCommand: ['pm', 'ls'],
        getManifestCommand: ['pm', 'view', '--json'],
        getRegistryMetadata: async (packageName, fetchAndParse) => {
            const [distTags, versions] = await Promise.all([
                fetchAndParse(['pm', 'view', '--json', packageName, 'dist-tags'], (stdout) => {
                    if (!stdout) {
                        return {};
                    }
                    const parsed = JSON.parse(stdout);
                    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
                }),
                fetchAndParse(['pm', 'view', '--json', packageName, 'versions'], (stdout) => {
                    if (!stdout) {
                        return null;
                    }
                    const parsed = JSON.parse(stdout);
                    return Array.isArray(parsed) ? parsed : [parsed];
                }),
            ]);
            if (!versions || versions.length === 0) {
                return null;
            }
            return {
                name: packageName,
                'dist-tags': (distTags || {}),
                versions: versions,
            };
        },
        outputParsers: {
            listDependencies: parsers_1.parseBunDependencies,
            getRegistryManifest: parsers_1.parseNpmLikeManifest,
            getRegistryMetadata: parsers_1.parseNpmLikeMetadata,
            getError: parsers_1.parseNpmLikeError,
        },
        isNotFound: isKnownNotFound,
    },
};
/**
 * The order of precedence for package managers.
 * This is a best-effort ordering based on estimated Angular community usage and default presence.
 */
exports.PACKAGE_MANAGER_PRECEDENCE = [
    'pnpm',
    'yarn',
    'bun',
    'npm',
];
//# sourceMappingURL=package-manager-descriptor.js.map