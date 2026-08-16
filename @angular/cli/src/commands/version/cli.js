"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const command_module_1 = require("../../command-builder/command-module");
const color_1 = require("../../utilities/color");
const command_config_1 = require("../command-config");
const version_info_1 = require("./version-info");
/**
 * The Angular CLI logo, displayed as ASCII art.
 */
const ASCII_ART = `
     _                      _                 ____ _     ___
    / \\   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \\ | '_ \\ / _\` | | | | |/ _\` | '__|   | |   | |    | |
  / ___ \\| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \\_\\_| |_|\\__, |\\__,_|_|\\__,_|_|       \\____|_____|___|
                |___/
    `
    .split('\n')
    .map((x) => color_1.colors.red(x))
    .join('\n');
/**
 * The command-line module for the `ng version` command.
 */
class VersionCommandModule extends command_module_1.CommandModule {
    command = 'version';
    aliases = command_config_1.RootCommands['version'].aliases;
    describe = 'Outputs Angular CLI version.';
    longDescriptionPath;
    /**
     * Builds the command-line options for the `ng version` command.
     * @param localYargs The `yargs` instance to configure.
     * @returns The configured `yargs` instance.
     */
    builder(localYargs) {
        return localYargs.option('json', {
            describe: 'Outputs version information in JSON format.',
            type: 'boolean',
        });
    }
    /**
     * The main execution logic for the `ng version` command.
     */
    async run(options) {
        const { logger } = this.context;
        const versionInfo = await (0, version_info_1.gatherVersionInfo)(this.context);
        if (options.json) {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(versionInfo, null, 2));
            return;
        }
        const { cli: { version: ngCliVersion }, framework, system: { node: { version: nodeVersion, unsupported: unsupportedNodeVersion }, os: { platform: os, architecture: arch }, packageManager: { name: packageManagerName, version: packageManagerVersion }, }, packages, } = versionInfo;
        const headerInfo = [{ label: 'Angular CLI', value: ngCliVersion }];
        if (framework.version) {
            headerInfo.push({ label: 'Angular', value: framework.version });
        }
        headerInfo.push({
            label: 'Node.js',
            value: `${nodeVersion}${unsupportedNodeVersion ? color_1.colors.yellow(' (Unsupported)') : ''}`,
        }, {
            label: 'Package Manager',
            value: `${packageManagerName} ${packageManagerVersion ?? '<error>'}`,
        }, { label: 'Operating System', value: `${os} ${arch}` });
        const maxHeaderLabelLength = Math.max(...headerInfo.map((l) => l.label.length));
        const header = headerInfo
            .map(({ label, value }) => color_1.colors.bold(label.padEnd(maxHeaderLabelLength + 2)) + `: ${color_1.colors.cyan(value)}`)
            .join('\n');
        const packageTable = this.formatPackageTable(packages);
        logger.info([ASCII_ART, header, packageTable].join('\n\n'));
        if (unsupportedNodeVersion) {
            logger.warn(`Warning: The current version of Node (${nodeVersion}) is not supported by Angular.`);
        }
    }
    /**
     * Formats the package table section of the version output.
     * @param versions A map of package names to their versions.
     * @returns A string containing the formatted package table.
     */
    formatPackageTable(versions) {
        const versionKeys = Object.keys(versions);
        if (versionKeys.length === 0) {
            return '';
        }
        const headers = {
            name: 'Package',
            installed: 'Installed Version',
            requested: 'Requested Version',
        };
        const maxNameLength = Math.max(headers.name.length, ...versionKeys.map((key) => key.length));
        const maxInstalledLength = Math.max(headers.installed.length, ...versionKeys.map((key) => versions[key].installed.length));
        const maxRequestedLength = Math.max(headers.requested.length, ...versionKeys.map((key) => versions[key].requested.length));
        const tableRows = versionKeys
            .map((module) => {
            const { requested, installed } = versions[module];
            const name = module.padEnd(maxNameLength);
            const coloredInstalled = installed === '<error>' ? color_1.colors.red(installed) : color_1.colors.cyan(installed);
            const installedPadding = ' '.repeat(maxInstalledLength - installed.length);
            return `│ ${name} │ ${coloredInstalled}${installedPadding} │ ${requested.padEnd(maxRequestedLength)} │`;
        })
            .sort();
        const top = `┌─${'─'.repeat(maxNameLength)}─┬─${'─'.repeat(maxInstalledLength)}─┬─${'─'.repeat(maxRequestedLength)}─┐`;
        const header = `│ ${headers.name.padEnd(maxNameLength)} │ ` +
            `${headers.installed.padEnd(maxInstalledLength)} │ ` +
            `${headers.requested.padEnd(maxRequestedLength)} │`;
        const separator = `├─${'─'.repeat(maxNameLength)}─┼─${'─'.repeat(maxInstalledLength)}─┼─${'─'.repeat(maxRequestedLength)}─┤`;
        const bottom = `└─${'─'.repeat(maxNameLength)}─┴─${'─'.repeat(maxInstalledLength)}─┴─${'─'.repeat(maxRequestedLength)}─┘`;
        return [top, header, separator, ...tableRows, bottom].join('\n');
    }
}
exports.default = VersionCommandModule;
//# sourceMappingURL=cli.js.map