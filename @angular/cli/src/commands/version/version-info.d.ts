/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { CommandContext } from '../../command-builder/definitions';
/**
 * An object containing version information for a single package.
 */
export interface PackageVersionInfo {
    requested: string;
    installed: string;
}
/**
 * An object containing all the version information that will be displayed by the command.
 */
export interface VersionInfo {
    cli: {
        version: string;
    };
    framework: {
        version: string | undefined;
    };
    system: {
        node: {
            version: string;
            unsupported: boolean;
        };
        os: {
            platform: string;
            architecture: string;
        };
        packageManager: {
            name: string;
            version: string | undefined;
        };
    };
    packages: Record<string, PackageVersionInfo>;
}
/**
 * Gathers all the version information from the environment and workspace.
 * @returns An object containing all the version information.
 */
export declare function gatherVersionInfo(context: CommandContext): Promise<VersionInfo>;
