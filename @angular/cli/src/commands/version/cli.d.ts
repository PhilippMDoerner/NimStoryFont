/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { Argv } from 'yargs';
import { CommandModule, CommandModuleImplementation } from '../../command-builder/command-module';
/**
 * The command-line module for the `ng version` command.
 */
export default class VersionCommandModule extends CommandModule implements CommandModuleImplementation {
    command: string;
    aliases: string[] | undefined;
    describe: string;
    longDescriptionPath?: string | undefined;
    /**
     * Builds the command-line options for the `ng version` command.
     * @param localYargs The `yargs` instance to configure.
     * @returns The configured `yargs` instance.
     */
    builder(localYargs: Argv): Argv;
    /**
     * The main execution logic for the `ng version` command.
     */
    run(options: {
        json?: boolean;
    }): Promise<void>;
    /**
     * Formats the package table section of the version output.
     * @param versions A map of package names to their versions.
     * @returns A string containing the formatted package table.
     */
    private formatPackageTable;
}
