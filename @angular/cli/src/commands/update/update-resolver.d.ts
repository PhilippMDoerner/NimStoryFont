/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { logging } from '@angular-devkit/core';
import type { PackageManager, PackageManifest, PackageMetadata } from '../../package-managers';
export type VersionRange = string & {
    __VERSION_RANGE: void;
};
export declare class RegistryClient {
    private packageManager;
    private logger;
    readonly minReleaseAge: number;
    private getRegistryName?;
    private metadataCache;
    private manifestCache;
    constructor(packageManager: PackageManager, logger: logging.LoggerApi, minReleaseAge?: number, getRegistryName?: ((name: string) => string) | undefined);
    getMetadata(packageName: string): Promise<PackageMetadata | null>;
    getManifest(packageName: string, version: string): Promise<PackageManifest | null>;
}
export declare function getSatisfyingVersion(registryClient: RegistryClient, metadata: PackageMetadata, range: string, next?: boolean): Promise<string | null>;
export declare function angularMajorCompatGuarantee(range: string): string;
export interface PackageVersionInfo {
    version: VersionRange;
    packageJson: PackageManifest;
    updateMetadata: UpdateMetadata;
}
export interface PackageInfo {
    name: string;
    npmPackageJson: PackageMetadata;
    installed: PackageVersionInfo;
    target?: PackageVersionInfo;
    packageJsonRange: string;
}
export interface UpdateMetadata {
    packageGroupName?: string;
    packageGroup: {
        [packageName: string]: string;
    };
    requirements: {
        [packageName: string]: string;
    };
    migrations?: string;
}
export interface UpdateResolverOptions {
    packages?: string[];
    force?: boolean;
    next?: boolean;
    migrateOnly?: boolean;
    from?: string;
    to?: string;
    registry?: string;
    packageManager?: string;
    verbose?: boolean;
    workspaceRoot?: string;
}
export interface UpdatePlan {
    packagesToUpdate: Map<string, string>;
    migrationsToRun: {
        package: string;
        collection: string;
        from: string;
        to: string;
    }[];
    packageInfoMap: Map<string, PackageInfo>;
    registryClient: RegistryClient;
}
export declare function isPnpActive(workspaceRoot: string): boolean;
export declare function findPackageJson(workspaceDir: string, packageName: string): string | undefined;
export declare function resolveUserUpdatePlan(options: UpdateResolverOptions, packageManager: PackageManager, logger: logging.LoggerApi): Promise<UpdatePlan>;
export declare function printUpdateUsageMessage(infoMap: Map<string, PackageInfo>, registryClient: RegistryClient, logger: logging.LoggerApi, next?: boolean): Promise<void>;
export declare function applyUpdatePlan(workspaceRoot: string, plan: UpdatePlan, logger: logging.LoggerApi): Promise<void>;
