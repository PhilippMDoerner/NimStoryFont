/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import npa from 'npm-package-arg';
import { Host } from './host';
import { Logger } from './logger';
import { PackageManagerDescriptor } from './package-manager-descriptor';
import { PackageManifest, PackageMetadata } from './package-metadata';
import { InstalledPackage } from './package-tree';
/**
 * The fields to request from the registry for a package's manifest.
 * This is a performance optimization to avoid downloading unnecessary data.
 * These fields are the ones required by the CLI for operations like `ng add` and `ng update`.
 */
export declare const MANIFEST_FIELDS: readonly ["name", "version", "deprecated", "dependencies", "peerDependencies", "devDependencies", "homepage", "schematics", "ng-add", "ng-update"];
/**
 * Options to configure the `PackageManager` instance.
 */
export interface PackageManagerOptions {
    /**
     * If true, no commands will be executed, but they will be logged to the logger.
     * A logger must be provided if this is true.
     */
    dryRun?: boolean;
    /** A logger instance for debugging and dry run output. */
    logger?: Logger;
    /**
     * The base path to use for temporary directories.
     */
    tempDirectory?: string;
    /**
     * The version of the package manager.
     * If provided, the `getVersion` method will return this version
     * instead of running the version command.
     */
    version?: string;
    /**
     * An error that occurred during the initialization of the package manager.
     * If provided, this error will be thrown when attempting to execute any command.
     */
    initializationError?: Error;
}
/**
 * A class that provides a high-level, package-manager-agnostic API for
 * interacting with a project's dependencies.
 *
 * This class is an implementation of the Strategy design pattern. It is
 * instantiated with a `PackageManagerDescriptor` that defines the specific
 * commands and flags for a given package manager.
 */
export declare class PackageManager {
    #private;
    private readonly host;
    private readonly cwd;
    private readonly descriptor;
    private readonly options;
    /**
     * Creates a new `PackageManager` instance.
     * @param host A `Host` instance for interacting with the file system and running commands.
     * @param cwd The absolute path to the project's working directory.
     * @param descriptor A `PackageManagerDescriptor` that defines the commands for a specific package manager.
     * @param options An options object to configure the instance.
     */
    constructor(host: Host, cwd: string, descriptor: PackageManagerDescriptor, options?: PackageManagerOptions);
    /**
     * The name of the package manager's binary.
     */
    get name(): string;
    /**
     * Ensures that the package manager is installed and available in the PATH.
     * If it is not, this method will throw an error with instructions on how to install it.
     *
     * @throws {Error} If the package manager is not installed.
     */
    ensureInstalled(): void;
    /**
     * Adds a package to the project's dependencies.
     * @param packageName The name of the package to add.
     * @param save The save strategy to use.
     * - `exact`: The package will be saved with an exact version.
     * - `tilde`: The package will be saved with a tilde version range (`~`).
     * - `none`: The package will be saved with the default version range (`^`).
     * @param asDevDependency Whether to install the package as a dev dependency.
     * @param noLockfile Whether to skip updating the lockfile.
     * @param options Extra options for the command.
     * @returns A promise that resolves when the command is complete.
     */
    add(packageName: string, save: 'exact' | 'tilde' | 'none', asDevDependency: boolean, noLockfile: boolean, ignoreScripts: boolean, options?: {
        registry?: string;
    }): Promise<void>;
    /**
     * Installs all dependencies in the project.
     * @param options Options for the installation.
     * @param options.timeout The maximum time in milliseconds to wait for the command to complete.
     * @param options.force If true, forces a clean install, potentially overwriting existing modules.
     * @param options.registry The registry to use for the installation.
     * @param options.ignoreScripts If true, prevents lifecycle scripts from being executed.
     * @returns A promise that resolves when the command is complete.
     */
    install(options?: {
        timeout?: number;
        force?: boolean;
        registry?: string;
        ignoreScripts?: boolean;
        ignorePeerDependencies?: boolean;
    }): Promise<void>;
    /**
     * Gets the name of the package in the current project.
     */
    getCurrentPackageName(): Promise<string | undefined>;
    /**
     * Gets the version of the package manager binary.
     */
    getVersion(): Promise<string>;
    /**
     * Gets the installed details of a package from the project's dependencies.
     * @param packageName The name of the package to check.
     * @returns A promise that resolves to the installed package details, or `null` if the package is not installed.
     */
    getInstalledPackage(packageName: string): Promise<InstalledPackage | null>;
    /**
     * Gets a map of all top-level dependencies installed in the project.
     * @returns A promise that resolves to a map of package names to their installed package details.
     */
    getProjectDependencies(): Promise<Map<string, InstalledPackage>>;
    /**
     * Fetches the registry metadata for a package. This is the full metadata,
     * including all versions and distribution tags.
     * @param packageName The name of the package to fetch the metadata for.
     * @param options Options for the fetch.
     * @param options.timeout The maximum time in milliseconds to wait for the command to complete.
     * @param options.registry The registry to use for the fetch.
     * @param options.bypassCache If true, ignores the in-memory cache and fetches fresh data.
     * @returns A promise that resolves to the `PackageMetadata` object, or `null` if the package is not found.
     */
    getRegistryMetadata(packageName: string, options?: {
        timeout?: number;
        registry?: string;
        bypassCache?: boolean;
    }): Promise<PackageMetadata | null>;
    /**
     * Fetches the registry manifest for a specific version of a package.
     * The manifest is similar to the package's `package.json` file.
     * @param packageName The name of the package to fetch the manifest for.
     * @param version The version of the package to fetch the manifest for.
     * @param options Options for the fetch.
     * @param options.timeout The maximum time in milliseconds to wait for the command to complete.
     * @param options.registry The registry to use for the fetch.
     * @param options.bypassCache If true, ignores the in-memory cache and fetches fresh data.
     * @returns A promise that resolves to the `PackageManifest` object, or `null` if the package is not found.
     */
    getRegistryManifest(packageName: string, version: string, options?: {
        timeout?: number;
        registry?: string;
        bypassCache?: boolean;
    }): Promise<PackageManifest | null>;
    /**
     * Fetches the manifest for a package.
     *
     * This method can resolve manifests for packages from the registry, as well
     * as those specified by file paths, directory paths, and remote tarballs.
     * Caching is only supported for registry packages.
     *
     * @param specifier The package specifier to resolve the manifest for.
     * @param options Options for the fetch.
     * @returns A promise that resolves to the `PackageManifest` object, or `null` if the package is not found.
     */
    getManifest(specifier: string | npa.Result, options?: {
        timeout?: number;
        registry?: string;
        bypassCache?: boolean;
    }): Promise<PackageManifest | null>;
    private getTemporaryDirectory;
    /**
     * Acquires a package by installing it into a temporary directory. The caller is
     * responsible for managing the lifecycle of the temporary directory by calling
     * the returned `cleanup` function.
     *
     * @param specifier The specifier of the package to install.
     * @param options Options for the installation.
     * @returns A promise that resolves to an object containing the temporary path
     *   and a cleanup function.
     */
    acquireTempPackage(specifier: string, options?: {
        registry?: string;
        ignoreScripts?: boolean;
    }): Promise<{
        workingDirectory: string;
        cleanup: () => Promise<void>;
    }>;
    /**
     * Gets the active release age gate limit in milliseconds.
     * @returns A promise that resolves to the limit in milliseconds, or `0` if not set.
     */
    getMinimumReleaseAge(): Promise<number>;
}
