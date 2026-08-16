/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview This file defines the data structures and configuration for
 * supported package managers. It is the single source of truth for all
 * package-manager-specific commands, flags, and output parsing.
 */
import { ErrorInfo } from './error';
import { Logger } from './logger';
import { PackageManifest, PackageMetadata } from './package-metadata';
import { InstalledPackage } from './package-tree';
import { parseBunDependencies, parseNpmBeforeDate, parseNpmLikeDependencies, parseNpmLikeError, parseNpmLikeManifest, parseNpmLikeMetadata, parsePnpmReleaseAge, parseYarnClassicDependencies, parseYarnClassicError, parseYarnClassicManifest, parseYarnClassicMetadata, parseYarnModernDependencies, parseYarnReleaseAge } from './parsers';
/**
 * An interface that describes the commands and properties of a package manager.
 */
export interface PackageManagerDescriptor {
    /** The binary executable for the package manager. */
    readonly binary: string;
    /** The lockfile names used by the package manager. */
    readonly lockfiles: readonly string[];
    /** The command to add a package. */
    readonly addCommand: string;
    /** The command to install all dependencies. */
    readonly installCommand: readonly string[];
    /** The flag to force a clean installation. */
    readonly forceFlag: string;
    /** The flag to save a package with an exact version. */
    readonly saveExactFlag: string;
    /** The flag to save a package with a tilde version range. */
    readonly saveTildeFlag: string;
    /** The flag to save a package as a dev dependency. */
    readonly saveDevFlag: string;
    /** The flag to prevent the lockfile from being updated. */
    readonly noLockfileFlag: string;
    /** The flag to prevent lifecycle scripts from being executed. */
    readonly ignoreScriptsFlag: string;
    /** The flag to ignore peer dependency warnings/errors. */
    readonly ignorePeerDependenciesFlag?: string;
    /** The configuration files used by the package manager. */
    readonly configFiles: readonly string[];
    /**
     * Whether to copy configuration files from the project root to the temporary directory.
     * This is necessary for package managers that do not inherit configuration from parent directories (e.g., bun).
     */
    readonly copyConfigFromProject?: boolean;
    /** A function that returns the arguments and environment variables to use a custom registry. */
    readonly getRegistryOptions?: (registry: string) => {
        args?: string[];
        env?: Record<string, string>;
    };
    /** The command to get the package manager's version. */
    readonly versionCommand: readonly string[];
    /** The command to list all installed dependencies. */
    readonly listDependenciesCommand: readonly string[];
    /** The command to get the release age configuration value. */
    readonly getReleaseAgeConfigCommand?: readonly string[];
    /** The command to get the current package name. */
    readonly getPackageNameCommand?: readonly string[];
    /** The command to fetch the registry manifest of a package. */
    readonly getManifestCommand: readonly string[];
    /** Whether a specific version lookup is needed prior to fetching a registry manifest. */
    readonly requiresManifestVersionLookup?: boolean;
    /** A function that formats the arguments for field-filtered registry views. */
    readonly viewCommandFieldArgFormatter?: (fields: readonly string[]) => string[];
    /** An optional custom function to fetch registry metadata when the default logic is not sufficient. */
    readonly getRegistryMetadata?: (packageName: string, fetchAndParse: <T>(args: readonly string[], parser: (stdout: string, logger?: Logger) => T | null) => Promise<T | null>) => Promise<PackageMetadata | null>;
    /** A collection of functions to parse the output of specific commands. */
    readonly outputParsers: {
        /** A function to parse the output of `listDependenciesCommand`. */
        listDependencies: (stdout: string, logger?: Logger, options?: {
            workspacePackageName?: string;
        }) => Map<string, InstalledPackage>;
        /** A function to parse the output of `getManifestCommand` for a specific version. */
        getRegistryManifest: (stdout: string, logger?: Logger) => PackageManifest | null;
        /** A function to parse the output of `getManifestCommand` for the full package metadata. */
        getRegistryMetadata: (stdout: string, logger?: Logger) => PackageMetadata | null;
        /** A function to parse the output when a command fails. */
        getError?: (output: string, logger?: Logger) => ErrorInfo | null;
        /** A function to parse the output of the release age config command. */
        getReleaseAge?: (output: string, version: string) => number;
    };
    /** A function that checks if a structured error represents a "package not found" error. */
    readonly isNotFound: (error: ErrorInfo) => boolean;
}
/** A type that represents the name of a supported package manager. */
export type PackageManagerName = keyof typeof SUPPORTED_PACKAGE_MANAGERS;
/**
 * A shared function to check if a structured error represents a "package not found" error.
 * @param error The structured error to check.
 * @returns True if the error code is a known "not found" code, false otherwise.
 */
declare function isKnownNotFound(error: ErrorInfo): boolean;
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
export declare const SUPPORTED_PACKAGE_MANAGERS: {
    npm: {
        binary: string;
        lockfiles: string[];
        addCommand: string;
        installCommand: string[];
        forceFlag: string;
        saveExactFlag: string;
        saveTildeFlag: string;
        saveDevFlag: string;
        noLockfileFlag: string;
        ignoreScriptsFlag: string;
        ignorePeerDependenciesFlag: string;
        configFiles: string[];
        getRegistryOptions: (registry: string) => {
            args: string[];
        };
        versionCommand: string[];
        listDependenciesCommand: string[];
        getReleaseAgeConfigCommand: string[];
        getPackageNameCommand: string[];
        getManifestCommand: string[];
        viewCommandFieldArgFormatter: (fields: readonly string[]) => string[];
        outputParsers: {
            listDependencies: typeof parseNpmLikeDependencies;
            getRegistryManifest: typeof parseNpmLikeManifest;
            getRegistryMetadata: typeof parseNpmLikeMetadata;
            getError: typeof parseNpmLikeError;
            getReleaseAge: typeof parseNpmBeforeDate;
        };
        isNotFound: typeof isKnownNotFound;
    };
    yarn: {
        binary: string;
        lockfiles: string[];
        addCommand: string;
        installCommand: string[];
        forceFlag: string;
        saveExactFlag: string;
        saveTildeFlag: string;
        saveDevFlag: string;
        noLockfileFlag: string;
        ignoreScriptsFlag: string;
        configFiles: string[];
        copyConfigFromProject: true;
        getRegistryOptions: (registry: string) => {
            env: {
                YARN_NPM_REGISTRY_SERVER: string;
            };
        };
        versionCommand: string[];
        listDependenciesCommand: string[];
        getReleaseAgeConfigCommand: string[];
        getManifestCommand: string[];
        viewCommandFieldArgFormatter: (fields: readonly string[]) => string[];
        outputParsers: {
            listDependencies: typeof parseYarnModernDependencies;
            getRegistryManifest: typeof parseNpmLikeManifest;
            getRegistryMetadata: typeof parseNpmLikeMetadata;
            getError: typeof parseNpmLikeError;
            getReleaseAge: typeof parseYarnReleaseAge;
        };
        isNotFound: typeof isKnownNotFound;
    };
    'yarn-classic': {
        binary: string;
        lockfiles: never[];
        addCommand: string;
        installCommand: string[];
        forceFlag: string;
        saveExactFlag: string;
        saveTildeFlag: string;
        saveDevFlag: string;
        noLockfileFlag: string;
        ignoreScriptsFlag: string;
        configFiles: string[];
        getRegistryOptions: (registry: string) => {
            args: string[];
        };
        versionCommand: string[];
        listDependenciesCommand: string[];
        getManifestCommand: string[];
        requiresManifestVersionLookup: true;
        outputParsers: {
            listDependencies: typeof parseYarnClassicDependencies;
            getRegistryManifest: typeof parseYarnClassicManifest;
            getRegistryMetadata: typeof parseYarnClassicMetadata;
            getError: typeof parseYarnClassicError;
        };
        isNotFound: typeof isKnownNotFound;
    };
    pnpm: {
        binary: string;
        lockfiles: string[];
        addCommand: string;
        installCommand: string[];
        forceFlag: string;
        saveExactFlag: string;
        saveTildeFlag: string;
        saveDevFlag: string;
        noLockfileFlag: string;
        ignoreScriptsFlag: string;
        ignorePeerDependenciesFlag: string;
        configFiles: string[];
        getRegistryOptions: (registry: string) => {
            args: string[];
        };
        versionCommand: string[];
        listDependenciesCommand: string[];
        getReleaseAgeConfigCommand: string[];
        getPackageNameCommand: string[];
        getManifestCommand: string[];
        viewCommandFieldArgFormatter: (fields: readonly string[]) => string[];
        outputParsers: {
            listDependencies: typeof parseNpmLikeDependencies;
            getRegistryManifest: typeof parseNpmLikeManifest;
            getRegistryMetadata: typeof parseNpmLikeMetadata;
            getError: typeof parseNpmLikeError;
            getReleaseAge: typeof parsePnpmReleaseAge;
        };
        isNotFound: typeof isKnownNotFound;
    };
    bun: {
        binary: string;
        lockfiles: string[];
        addCommand: string;
        installCommand: string[];
        forceFlag: string;
        saveExactFlag: string;
        saveTildeFlag: string;
        saveDevFlag: string;
        noLockfileFlag: string;
        ignoreScriptsFlag: string;
        configFiles: string[];
        copyConfigFromProject: true;
        getRegistryOptions: (registry: string) => {
            args: string[];
        };
        versionCommand: string[];
        listDependenciesCommand: string[];
        getManifestCommand: string[];
        getRegistryMetadata: (packageName: string, fetchAndParse: <T>(args: readonly string[], parser: (stdout: string, logger?: Logger) => T | null) => Promise<T | null>) => Promise<{
            name: string;
            'dist-tags': Record<string, string>;
            versions: string[];
        } | null>;
        outputParsers: {
            listDependencies: typeof parseBunDependencies;
            getRegistryManifest: typeof parseNpmLikeManifest;
            getRegistryMetadata: typeof parseNpmLikeMetadata;
            getError: typeof parseNpmLikeError;
        };
        isNotFound: typeof isKnownNotFound;
    };
};
/**
 * The order of precedence for package managers.
 * This is a best-effort ordering based on estimated Angular community usage and default presence.
 */
export declare const PACKAGE_MANAGER_PRECEDENCE: readonly PackageManagerName[];
export {};
