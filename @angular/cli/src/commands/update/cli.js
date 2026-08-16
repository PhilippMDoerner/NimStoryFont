"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFallbackMigrations = resolveFallbackMigrations;
const tools_1 = require("@angular-devkit/schematics/tools");
const listr2_1 = require("listr2");
const node_fs_1 = require("node:fs");
const node_module_1 = require("node:module");
const path = __importStar(require("node:path"));
const npm_package_arg_1 = __importDefault(require("npm-package-arg"));
const command_module_1 = require("../../command-builder/command-module");
const schematic_engine_host_1 = require("../../command-builder/utilities/schematic-engine-host");
const color_1 = require("../../utilities/color");
const environment_options_1 = require("../../utilities/environment-options");
const error_1 = require("../../utilities/error");
const update_resolver_1 = require("./update-resolver");
const cli_version_1 = require("./utilities/cli-version");
const constants_1 = require("./utilities/constants");
const git_1 = require("./utilities/git");
const migration_1 = require("./utilities/migration");
class CommandError extends Error {
}
class UpdateCommandModule extends command_module_1.CommandModule {
    scope = command_module_1.CommandScope.In;
    shouldReportAnalytics = false;
    resolvePaths = [__dirname, this.context.root];
    command = 'update [packages..]';
    describe = 'Updates your workspace and its dependencies. See https://update.angular.dev/.';
    longDescriptionPath = path.join(__dirname, 'long-description.md');
    builder(localYargs) {
        return localYargs
            .positional('packages', {
            description: 'The names of package(s) to update.',
            type: 'string',
            array: true,
        })
            .option('force', {
            description: 'Ignore peer dependency version mismatches.',
            type: 'boolean',
            default: false,
        })
            .option('next', {
            description: 'Use the prerelease version, including beta and RCs.',
            type: 'boolean',
            default: false,
        })
            .option('migrate-only', {
            description: 'Only perform a migration, do not update the installed version.',
            type: 'boolean',
        })
            .option('name', {
            description: 'The name of the migration to run. Only available when a single package is updated.',
            type: 'string',
            conflicts: ['to', 'from'],
        })
            .option('from', {
            description: 'Version from which to migrate from. ' +
                `Only available when a single package is updated, and only with 'migrate-only'.`,
            type: 'string',
            implies: ['migrate-only'],
            conflicts: ['name'],
        })
            .option('to', {
            describe: 'Version up to which to apply migrations. Only available when a single package is updated, ' +
                `and only with 'migrate-only' option. Requires 'from' to be specified. Default to the installed version detected.`,
            type: 'string',
            implies: ['from', 'migrate-only'],
            conflicts: ['name'],
        })
            .option('allow-dirty', {
            describe: 'Whether to allow updating when the repository contains modified or untracked files.',
            type: 'boolean',
            default: false,
        })
            .option('verbose', {
            describe: 'Display additional details about internal operations during execution.',
            type: 'boolean',
            default: false,
        })
            .option('create-commits', {
            describe: 'Create source control commits for updates and migrations.',
            type: 'boolean',
            alias: ['C'],
            default: false,
        })
            .middleware((argv) => {
            if (argv.name) {
                argv['migrate-only'] = true;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return argv;
        })
            .check(({ packages, 'allow-dirty': allowDirty, 'migrate-only': migrateOnly }) => {
            const { logger } = this.context;
            // This allows the user to easily reset any changes from the update.
            if (packages?.length && !(0, git_1.checkCleanGit)(this.context.root)) {
                if (allowDirty) {
                    logger.warn('Repository is not clean. Update changes will be mixed with pre-existing changes.');
                }
                else {
                    throw new command_module_1.CommandModuleError('Repository is not clean. Please commit or stash any changes before updating.');
                }
            }
            if (migrateOnly) {
                if (packages?.length !== 1) {
                    throw new command_module_1.CommandModuleError(`A single package must be specified when using the 'migrate-only' option.`);
                }
            }
            return true;
        })
            .strict();
    }
    async run(options) {
        const { logger, packageManager } = this.context;
        // Check if the current installed CLI version is older than the latest compatible version.
        // Skip when running `ng update` without a package name as this will not trigger an actual update.
        if (!environment_options_1.disableVersionCheck && options.packages?.length) {
            const cliVersionToInstall = await (0, cli_version_1.checkCLIVersion)(options.packages, logger, packageManager, options.next);
            if (cliVersionToInstall) {
                logger.warn('The installed Angular CLI version is outdated.\n' +
                    `Installing a temporary Angular CLI versioned ${cliVersionToInstall} to perform the update.`);
                return (0, cli_version_1.runTempBinary)(`@angular/cli@${cliVersionToInstall}`, packageManager, process.argv.slice(2));
            }
        }
        const packages = [];
        for (const request of options.packages ?? []) {
            try {
                const packageIdentifier = (0, npm_package_arg_1.default)(request);
                // only registry identifiers are supported
                if (!packageIdentifier.registry) {
                    logger.error(`Package '${request}' is not a registry package identifer.`);
                    return 1;
                }
                if (packages.some((v) => v.name === packageIdentifier.name)) {
                    logger.error(`Duplicate package '${packageIdentifier.name}' specified.`);
                    return 1;
                }
                if (options.migrateOnly && packageIdentifier.rawSpec !== '*') {
                    logger.warn('Package specifier has no effect when using "migrate-only" option.');
                }
                // Wildcard uses the next tag if next option is used otherwise use latest tag.
                // Wildcard is present if no selector is provided on the command line.
                if (packageIdentifier.rawSpec === '*') {
                    packageIdentifier.fetchSpec = options.next ? 'next' : 'latest';
                    packageIdentifier.type = 'tag';
                }
                packages.push(packageIdentifier);
            }
            catch (e) {
                (0, error_1.assertIsError)(e);
                logger.error(e.message);
                return 1;
            }
        }
        logger.info(`Using package manager: ${color_1.colors.gray(packageManager.name)}`);
        logger.info('Collecting installed dependencies...');
        const rootDependencies = await packageManager.getProjectDependencies();
        logger.info(`Found ${rootDependencies.size} dependencies.`);
        const workflow = new tools_1.NodeWorkflow(this.context.root, {
            packageManager: packageManager.name,
            packageManagerForce: await (0, cli_version_1.shouldForcePackageManager)(packageManager, logger, options.verbose),
            // __dirname -> favor @schematics/update from this package
            // Otherwise, use packages from the active workspace (migrations)
            resolvePaths: this.resolvePaths,
            schemaValidation: true,
            engineHostCreator: (options) => new schematic_engine_host_1.SchematicEngineHost(options.resolvePaths),
        });
        if (packages.length === 0) {
            try {
                const plan = await (0, update_resolver_1.resolveUserUpdatePlan)({
                    force: options.force,
                    next: options.next,
                    verbose: options.verbose,
                    packageManager: packageManager.name,
                    packages: [],
                    workspaceRoot: this.context.root,
                }, packageManager, logger);
                await (0, update_resolver_1.printUpdateUsageMessage)(plan.packageInfoMap, plan.registryClient, logger, options.next);
                return 0;
            }
            catch (error) {
                (0, error_1.assertIsError)(error);
                logger.error(error.message);
                return 1;
            }
        }
        return options.migrateOnly
            ? this.migrateOnly(workflow, packages[0].name, rootDependencies, options, packageManager)
            : this.updatePackagesAndMigrate(workflow, rootDependencies, options, packages, packageManager);
    }
    async migrateOnly(workflow, packageName, rootDependencies, options, packageManager) {
        const { logger } = this.context;
        const packageDependency = rootDependencies.get(packageName);
        let packagePath = packageDependency?.path;
        let packageNode;
        if (!packageDependency) {
            const installed = await packageManager.getInstalledPackage(packageName);
            if (installed) {
                packagePath = installed.path;
            }
        }
        if (packagePath) {
            packageNode = await readPackageManifest(path.join(packagePath, 'package.json'));
        }
        if (!packageNode) {
            const jsonPath = (0, update_resolver_1.findPackageJson)(this.context.root, packageName);
            if (jsonPath) {
                packageNode = await readPackageManifest(jsonPath);
                if (!packagePath) {
                    packagePath = path.dirname(jsonPath);
                }
            }
        }
        if (!packageNode || !packagePath) {
            logger.error('Package is not installed.');
            return 1;
        }
        const updateMetadata = packageNode['ng-update'];
        let migrations = updateMetadata?.migrations;
        if (migrations === undefined) {
            logger.error('Package does not provide migrations.');
            return 1;
        }
        else if (typeof migrations !== 'string') {
            logger.error('Package contains a malformed migrations field.');
            return 1;
        }
        else if (path.posix.isAbsolute(migrations) || path.win32.isAbsolute(migrations)) {
            logger.error('Package contains an invalid migrations field. Absolute paths are not permitted.');
            return 1;
        }
        // Normalize slashes
        migrations = migrations.replace(/\\/g, '/');
        if (migrations.startsWith('../')) {
            logger.error('Package contains an invalid migrations field. Paths outside the package root are not permitted.');
            return 1;
        }
        // Check if it is a package-local location
        const localMigrations = path.join(packagePath, migrations);
        if ((0, node_fs_1.existsSync)(localMigrations)) {
            migrations = localMigrations;
        }
        else {
            // Try to resolve from package location.
            // This avoids issues with package hoisting.
            try {
                const packageRequire = (0, node_module_1.createRequire)(packagePath + '/');
                migrations = packageRequire.resolve(migrations, { paths: this.resolvePaths });
            }
            catch (e) {
                (0, error_1.assertIsError)(e);
                if (e.code === 'MODULE_NOT_FOUND') {
                    logger.error('Migrations for package were not found.');
                }
                else {
                    logger.error(`Unable to resolve migrations for package.  [${e.message}]`);
                }
                return 1;
            }
        }
        if (options.name) {
            return (0, migration_1.executeMigration)(workflow, logger, packageName, migrations, options.name, options.createCommits);
        }
        const from = (0, cli_version_1.coerceVersionNumber)(options.from);
        if (!from) {
            logger.error(`"from" value [${options.from}] is not a valid version.`);
            return 1;
        }
        return (0, migration_1.executeMigrations)(workflow, logger, packageName, migrations, from, options.to || packageNode.version, options.createCommits);
    }
    // eslint-disable-next-line max-lines-per-function
    async updatePackagesAndMigrate(workflow, rootDependencies, options, packages, packageManager) {
        const { logger } = this.context;
        const logVerbose = (message) => {
            if (options.verbose) {
                logger.info(message);
            }
        };
        const requests = [];
        // Validate packages actually are part of the workspace
        for (const pkg of packages) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const node = rootDependencies.get(pkg.name);
            if (!node) {
                logger.error(`Package '${pkg.name}' is not a dependency.`);
                return 1;
            }
            // If a specific version is requested and matches the installed version, skip.
            if (pkg.type === 'version' && node.version === pkg.fetchSpec) {
                logger.info(`Package '${pkg.name}' is already at '${pkg.fetchSpec}'.`);
                continue;
            }
            requests.push({ identifier: pkg, node });
        }
        if (requests.length === 0) {
            return 0;
        }
        logger.info('Fetching dependency metadata from registry...');
        const packagesToUpdate = [];
        for (const { identifier: requestIdentifier, node } of requests) {
            const packageName = requestIdentifier.name;
            let manifest;
            try {
                manifest = await packageManager.getManifest(requestIdentifier);
            }
            catch (e) {
                (0, error_1.assertIsError)(e);
                logger.error(`Error fetching manifest for '${packageName}': ` + e.message);
                return 1;
            }
            if (!manifest) {
                logger.error(`Package specified by '${requestIdentifier.raw}' does not exist within the registry.`);
                return 1;
            }
            if (manifest.version === node.version) {
                logger.info(`Package '${packageName}' is already up to date.`);
                continue;
            }
            if (constants_1.ANGULAR_PACKAGES_REGEXP.test(node.name)) {
                const { name, version } = node;
                const toBeInstalledMajorVersion = +manifest.version.split('.')[0];
                const currentMajorVersion = +version.split('.')[0];
                if (toBeInstalledMajorVersion - currentMajorVersion > 1) {
                    // Only allow updating a single version at a time.
                    if (currentMajorVersion < 6) {
                        // Before version 6, the major versions were not always sequential.
                        // Example @angular/core skipped version 3, @angular/cli skipped versions 2-5.
                        logger.error(`Updating multiple major versions of '${name}' at once is not supported. Please migrate each major version individually.\n` +
                            `For more information about the update process, see https://update.angular.dev/.`);
                    }
                    else {
                        const nextMajorVersionFromCurrent = currentMajorVersion + 1;
                        logger.error(`Updating multiple major versions of '${name}' at once is not supported. Please migrate each major version individually.\n` +
                            `Run 'ng update ${name}@${nextMajorVersionFromCurrent}' in your workspace directory ` +
                            `to update to latest '${nextMajorVersionFromCurrent}.x' version of '${name}'.\n\n` +
                            `For more information about the update process, see https://update.angular.dev/?v=${currentMajorVersion}.0-${nextMajorVersionFromCurrent}.0`);
                    }
                    return 1;
                }
            }
            packagesToUpdate.push(requestIdentifier.toString());
        }
        if (packagesToUpdate.length === 0) {
            return 0;
        }
        let plan;
        try {
            plan = await (0, update_resolver_1.resolveUserUpdatePlan)({
                packages: packagesToUpdate,
                force: options.force,
                next: options.next,
                packageManager: packageManager.name,
                verbose: options.verbose,
                workspaceRoot: this.context.root,
            }, packageManager, logger);
        }
        catch (error) {
            (0, error_1.assertIsError)(error);
            logger.error(error.message);
            return 1;
        }
        const packageJsonPath = path.join(this.context.root, 'package.json');
        let originalPackageJsonContent;
        try {
            originalPackageJsonContent = await node_fs_1.promises.readFile(packageJsonPath, 'utf8');
        }
        catch {
            // Ignore backup errors.
        }
        try {
            await (0, update_resolver_1.applyUpdatePlan)(this.context.root, plan, logger);
        }
        catch (error) {
            (0, error_1.assertIsError)(error);
            logger.error(`Error updating package.json: ${error.message}`);
            return 1;
        }
        const { root: commandRoot } = this.context;
        const ignorePeerDependencies = await (0, cli_version_1.shouldForcePackageManager)(packageManager, logger, options.verbose);
        const tasks = new listr2_1.Listr([
            {
                title: 'Cleaning node modules directory',
                skip() {
                    return packageManager.name !== 'npm'
                        ? 'Cleaning not required for this package manager.'
                        : false;
                },
                async task(_, task) {
                    try {
                        await node_fs_1.promises.rm(path.join(commandRoot, 'node_modules'), {
                            force: true,
                            recursive: true,
                            maxRetries: 3,
                        });
                    }
                    catch (e) {
                        (0, error_1.assertIsError)(e);
                        if (e.code === 'ENOENT') {
                            task.skip('Cleaning not required. Node modules directory not found.');
                        }
                    }
                },
            },
            {
                title: 'Installing packages',
                async task() {
                    try {
                        await packageManager.install({
                            ignorePeerDependencies,
                        });
                    }
                    catch (e) {
                        throw new CommandError('Unable to install packages');
                    }
                },
            },
        ]);
        try {
            await tasks.run();
            // Clear Node's module resolution path cache to prevent stale lookups
            // when resolving migration package paths.
            const Module = require('node:module');
            if (Module && Module._pathCache) {
                Module._pathCache = Object.create(null);
            }
        }
        catch (e) {
            if (originalPackageJsonContent !== undefined) {
                try {
                    await node_fs_1.promises.writeFile(packageJsonPath, originalPackageJsonContent, 'utf8');
                    logger.info('Restored package.json to its original state.');
                }
                catch (restoreError) {
                    (0, error_1.assertIsError)(restoreError);
                    logger.error(`Failed to restore package.json: ${restoreError.message}`);
                }
            }
            if (e instanceof CommandError) {
                return 1;
            }
            throw e;
        }
        if (options.createCommits) {
            if (!(0, migration_1.commitChanges)(logger, `Angular CLI update for packages - ${packagesToUpdate.join(', ')}`)) {
                return 1;
            }
        }
        const migrations = await resolveFallbackMigrations(this.context.root, plan);
        if (migrations) {
            for (const migration of migrations) {
                // Resolve the package from the workspace root, as otherwise it will be resolved from the temp
                // installed CLI version.
                const packageJsonPath = (0, update_resolver_1.findPackageJson)(this.context.root, migration.package);
                if (!packageJsonPath) {
                    logger.error(`Migrations for package (${migration.package}) were not found.` +
                        ' The package could not be found in the workspace.');
                    return 1;
                }
                const packagePath = path.dirname(packageJsonPath);
                let migrations;
                // Check if it is a package-local location
                const localMigrations = path.join(packagePath, migration.collection);
                if ((0, node_fs_1.existsSync)(localMigrations)) {
                    migrations = localMigrations;
                }
                else {
                    // Try to resolve from package location.
                    // This avoids issues with package hoisting.
                    try {
                        const packageRequire = (0, node_module_1.createRequire)(packagePath + '/');
                        migrations = packageRequire.resolve(migration.collection);
                    }
                    catch (e) {
                        (0, error_1.assertIsError)(e);
                        if (e.code === 'MODULE_NOT_FOUND') {
                            logger.error(`Migrations for package (${migration.package}) were not found.`);
                        }
                        else {
                            logger.error(`Unable to resolve migrations for package (${migration.package}).  [${e.message}]`);
                        }
                        return 1;
                    }
                }
                const result = await (0, migration_1.executeMigrations)(workflow, logger, migration.package, migrations, migration.from, migration.to, options.createCommits);
                // A non-zero value is a failure for the package's migrations
                if (result !== 0) {
                    return result;
                }
            }
        }
        return 0;
    }
}
exports.default = UpdateCommandModule;
async function readPackageManifest(manifestPath) {
    try {
        const content = await node_fs_1.promises.readFile(manifestPath, 'utf8');
        return JSON.parse(content);
    }
    catch {
        return undefined;
    }
}
/**
 * Resolves migrations from installed package manifests on disk when they were omitted
 * from the initial update plan.
 *
 * This fallback is necessary because private package registries (such as GitHub Packages)
 * frequently strip custom non-npm metadata properties (like `ng-update`) from their remote
 * registry API responses. By inspecting `node_modules/<package>/package.json` after installation,
 * we ensure that any migration collections defined by the package are discovered and queued.
 */
async function resolveFallbackMigrations(workspaceRoot, plan) {
    const migrations = [...plan.migrationsToRun];
    const existingMigrationPackages = new Set(migrations.map((m) => m.package));
    for (const [packageName, targetVersion] of plan.packagesToUpdate) {
        if (existingMigrationPackages.has(packageName)) {
            continue;
        }
        const packageJsonPath = (0, update_resolver_1.findPackageJson)(workspaceRoot, packageName);
        if (packageJsonPath) {
            try {
                const packageJson = JSON.parse(await node_fs_1.promises.readFile(packageJsonPath, 'utf8'));
                const ngUpdate = packageJson?.['ng-update'];
                if (ngUpdate && typeof ngUpdate === 'object' && typeof ngUpdate.migrations === 'string') {
                    const installedVersion = plan.packageInfoMap.get(packageName)?.installed.version;
                    if (installedVersion) {
                        migrations.push({
                            package: packageName,
                            collection: ngUpdate.migrations,
                            from: installedVersion,
                            to: targetVersion,
                        });
                    }
                }
            }
            catch {
                // Ignore read/parse errors for optional fallback
            }
        }
    }
    return migrations;
}
//# sourceMappingURL=cli.js.map