"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = runCommand;
const core_1 = require("@angular-devkit/core");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const utilities_1 = require("../commands/cache/utilities");
const command_config_1 = require("../commands/command-config");
const package_managers_1 = require("../package-managers");
const color_1 = require("../utilities/color");
const config_1 = require("../utilities/config");
const error_1 = require("../utilities/error");
const version_1 = require("../utilities/version");
const command_module_1 = require("./command-module");
const command_1 = require("./utilities/command");
const json_help_1 = require("./utilities/json-help");
const normalize_options_middleware_1 = require("./utilities/normalize-options-middleware");
async function runCommand(args, logger) {
    const { $0, _, help = false, dryRun = false, jsonHelp = false, getYargsCompletions = false, ...rest } = (0, helpers_1.Parser)(args, {
        boolean: ['help', 'json-help', 'get-yargs-completions', 'dry-run'],
        alias: { 'collection': 'c' },
    });
    // When `getYargsCompletions` is true the scriptName 'ng' at index 0 is not removed.
    const positional = getYargsCompletions ? _.slice(1) : _;
    let workspace;
    let globalConfiguration;
    try {
        [workspace, globalConfiguration] = await Promise.all([
            (0, config_1.getWorkspace)('local'),
            (0, config_1.getWorkspace)('global'),
        ]);
    }
    catch (e) {
        (0, error_1.assertIsError)(e);
        logger.fatal(e.message);
        return 1;
    }
    const root = workspace?.basePath ?? process.cwd();
    const cacheConfig = workspace && (0, utilities_1.getCacheConfig)(workspace);
    const packageManager = await (0, package_managers_1.createPackageManager)({
        cwd: root,
        logger,
        dryRun: dryRun || help || jsonHelp || getYargsCompletions,
        tempDirectory: cacheConfig?.enabled ? cacheConfig.path : undefined,
        configuredPackageManager: await getConfiguredPackageManager(root, workspace, globalConfiguration),
    });
    const localYargs = (0, yargs_1.default)(args);
    const context = {
        globalConfiguration,
        workspace,
        logger,
        currentDirectory: process.cwd(),
        yargsInstance: localYargs,
        root,
        packageManager,
        args: {
            positional: positional.map((v) => v.toString()),
            options: {
                help,
                jsonHelp,
                getYargsCompletions,
                ...rest,
            },
        },
    };
    for (const CommandModule of await getCommandsToRegister(positional[0])) {
        (0, command_1.addCommandModuleToYargs)(CommandModule, context);
    }
    if (jsonHelp) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const usageInstance = localYargs.getInternalMethods().getUsageInstance();
        usageInstance.help = () => (0, json_help_1.jsonHelpUsage)(localYargs);
    }
    // Add default command to support version option when no subcommand is specified
    localYargs.command('*', false, (builder) => builder.version('version', 'Show Angular CLI version.', version_1.VERSION.full));
    await localYargs
        .scriptName('ng')
        // https://github.com/yargs/yargs/blob/main/docs/advanced.md#customizing-yargs-parser
        .parserConfiguration({
        'populate--': true,
        'unknown-options-as-args': false,
        'dot-notation': false,
        'boolean-negation': true,
        'strip-aliased': true,
        'strip-dashed': true,
        'camel-case-expansion': false,
    })
        .option('json-help', {
        describe: 'Show help in JSON format.',
        implies: ['help'],
        hidden: true,
        type: 'boolean',
    })
        .help('help', 'Shows a help message for this command in the console.')
        // A complete list of strings can be found: https://github.com/yargs/yargs/blob/main/locales/en.json
        .updateStrings({
        'Commands:': color_1.colors.cyan('Commands:'),
        'Options:': color_1.colors.cyan('Options:'),
        'Positionals:': color_1.colors.cyan('Arguments:'),
        'deprecated': color_1.colors.yellow('deprecated'),
        'deprecated: %s': color_1.colors.yellow('deprecated:') + ' %s',
        'Did you mean %s?': 'Unknown command. Did you mean %s?',
    })
        .epilogue('For more information, see https://angular.dev/cli/.\n')
        .demandCommand(1, command_1.demandCommandFailureMessage)
        .recommendCommands()
        .middleware((0, normalize_options_middleware_1.createNormalizeOptionsMiddleware)(localYargs))
        .version(false)
        .showHelpOnFail(false)
        .strict()
        .fail((msg, err) => {
        throw msg
            ? // Validation failed example: `Unknown argument:`
                new command_module_1.CommandModuleError(msg)
            : // Unknown exception, re-throw.
                err;
    })
        .wrap(localYargs.terminalWidth())
        .parseAsync();
    return +(process.exitCode ?? 0);
}
/**
 * Get the commands that need to be registered.
 * @returns One or more command factories that needs to be registered.
 */
async function getCommandsToRegister(commandName) {
    const commands = [];
    if (commandName in command_config_1.RootCommands) {
        commands.push(command_config_1.RootCommands[commandName]);
    }
    else if (commandName in command_config_1.RootCommandsAliases) {
        commands.push(command_config_1.RootCommandsAliases[commandName]);
    }
    else {
        // Unknown command, register every possible command.
        Object.values(command_config_1.RootCommands).forEach((c) => commands.push(c));
    }
    return Promise.all(commands.map((command) => command.factory().then((m) => m.default)));
}
/**
 * Gets the configured package manager by checking package.json, or the local and global angular.json files.
 *
 * @param root The root directory of the workspace.
 * @param localWorkspace The local workspace.
 * @param globalWorkspace The global workspace.
 * @returns The package manager name and version.
 */
async function getConfiguredPackageManager(root, localWorkspace, globalWorkspace) {
    let result;
    try {
        const packageJsonPath = (0, node_path_1.join)(root, 'package.json');
        const pkgJson = JSON.parse(await (0, promises_1.readFile)(packageJsonPath, 'utf-8'));
        result = getPackageManager(pkgJson);
    }
    catch { }
    if (result) {
        return result;
    }
    if (localWorkspace) {
        const project = (0, config_1.getProjectByCwd)(localWorkspace);
        if (project) {
            result = getPackageManager(localWorkspace.projects.get(project)?.extensions['cli']);
        }
        result ??= getPackageManager(localWorkspace.extensions['cli']);
    }
    result ??= getPackageManager(globalWorkspace.extensions['cli']);
    return result;
}
/**
 * Get the package manager name from a JSON value.
 * @param source The JSON value to get the package manager name from.
 * @returns The package manager name and version.
 */
function getPackageManager(source) {
    if (source && (0, core_1.isJsonObject)(source)) {
        const value = source['packageManager'];
        if (typeof value === 'string') {
            return value.split('@', 2);
        }
    }
    return undefined;
}
//# sourceMappingURL=command-runner.js.map