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
const listr2_1 = require("listr2");
const node_assert_1 = __importDefault(require("node:assert"));
const node_fs_1 = require("node:fs");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_module_1 = require("node:module");
const node_path_1 = require("node:path");
const npm_package_arg_1 = __importDefault(require("npm-package-arg"));
const semver_1 = __importStar(require("semver"));
const command_module_1 = require("../../command-builder/command-module");
const schematics_command_module_1 = require("../../command-builder/schematics-command-module");
const error_1 = require("../../utilities/error");
const tty_1 = require("../../utilities/tty");
const version_1 = require("../../utilities/version");
class CommandError extends Error {
}
/**
 * The set of packages that should have certain versions excluded from consideration
 * when attempting to find a compatible version for a package.
 * The key is a package name and the value is a SemVer range of versions to exclude.
 */
const packageVersionExclusions = {
    // @angular/localize@9.x and earlier versions as well as @angular/localize@10.0 prereleases do not have peer dependencies setup.
    '@angular/localize': '<10.0.0',
    // @angular/material@7.x versions have unbounded peer dependency ranges (>=7.0.0).
    '@angular/material': '7.x',
};
const DEFAULT_CONFLICT_DISPLAY_LIMIT = 5;
/**
 * A map of packages to built-in schematics.
 * This is used for packages that do not have a native `ng-add` schematic.
 */
const BUILT_IN_SCHEMATICS = {
    tailwindcss: {
        collection: '@schematics/angular',
        name: 'tailwind',
    },
    '@vitest/browser-playwright': {
        collection: '@schematics/angular',
        name: 'vitest-browser',
    },
    '@vitest/browser-webdriverio': {
        collection: '@schematics/angular',
        name: 'vitest-browser',
    },
    '@vitest/browser-preview': {
        collection: '@schematics/angular',
        name: 'vitest-browser',
    },
};
class AddCommandModule extends schematics_command_module_1.SchematicsCommandModule {
    command = 'add <collection>';
    describe = 'Adds support for an external library to your project.';
    longDescriptionPath = (0, node_path_1.join)(__dirname, 'long-description.md');
    allowPrivateSchematics = true;
    schematicName = 'ng-add';
    rootRequire = (0, node_module_1.createRequire)(this.context.root + '/');
    #projectVersionCache = new Map();
    #rootManifestCache = null;
    async builder(argv) {
        const localYargs = (await super.builder(argv))
            .positional('collection', {
            description: 'The package to be added.',
            type: 'string',
            demandOption: true,
        })
            .option('registry', { description: 'The NPM registry to use.', type: 'string' })
            .option('verbose', {
            description: 'Display additional details about internal operations during execution.',
            type: 'boolean',
            default: false,
        })
            .option('skip-confirmation', {
            description: 'Skip asking a confirmation prompt before installing and executing the package. ' +
                'Ensure package name is correct prior to using this option.',
            type: 'boolean',
            default: false,
        })
            .check(({ registry }) => {
            if (registry === undefined) {
                return true;
            }
            if (typeof registry === 'string' && URL.canParse(registry)) {
                return true;
            }
            throw new command_module_1.CommandModuleError('Option --registry must be a valid URL.');
        })
            // Prior to downloading we don't know the full schema and therefore we cannot be strict on the options.
            // Possibly in the future update the logic to use the following syntax:
            // `ng add @angular/localize -- --package-options`.
            .strict(false);
        const collectionName = this.getCollectionName();
        if (!collectionName) {
            return localYargs;
        }
        const workflow = this.getOrCreateWorkflowForBuilder(collectionName);
        try {
            const collection = workflow.engine.createCollection(collectionName);
            const options = await this.getSchematicOptions(collection, this.schematicName, workflow);
            return this.addSchemaOptionsToCommand(localYargs, options);
        }
        catch (error) {
            // During `ng add` prior to the downloading of the package
            // we are not able to resolve and create a collection.
            // Or when the collection value is a path to a tarball.
        }
        return localYargs;
    }
    async run(options) {
        this.#projectVersionCache.clear();
        this.#rootManifestCache = null;
        const { logger } = this.context;
        const { collection, skipConfirmation } = options;
        let packageIdentifier;
        try {
            packageIdentifier = (0, npm_package_arg_1.default)(collection);
        }
        catch (e) {
            (0, error_1.assertIsError)(e);
            logger.error(e.message);
            return 1;
        }
        if (packageIdentifier.name &&
            packageIdentifier.registry &&
            this.isPackageInstalled(packageIdentifier.name)) {
            const validVersion = await this.isProjectVersionValid(packageIdentifier);
            if (validVersion) {
                // Already installed so just run schematic
                logger.info('Skipping installation: Package already installed');
                return this.executeSchematic({ ...options, collection: packageIdentifier.name });
            }
        }
        const taskContext = {
            packageIdentifier,
            isExactVersion: packageIdentifier.type === 'version',
            executeSchematic: this.executeSchematic.bind(this),
            getPeerDependencyConflicts: this.getPeerDependencyConflicts.bind(this),
            dryRun: options.dryRun,
        };
        const tasks = new listr2_1.Listr([
            {
                title: 'Determining Package Manager',
                task: (_context, task) => (task.output = `Using package manager: ${listr2_1.color.dim(this.context.packageManager.name)}`),
                rendererOptions: { persistentOutput: true },
            },
            {
                title: 'Searching for compatible package version',
                enabled: packageIdentifier.type === 'range' && packageIdentifier.rawSpec === '*',
                task: (context, task) => this.findCompatiblePackageVersionTask(context, task, options),
                rendererOptions: { persistentOutput: true },
            },
            {
                title: 'Loading package information',
                task: (context, task) => this.loadPackageInfoTask(context, task, options),
                rendererOptions: { persistentOutput: true },
            },
            {
                title: 'Confirming installation',
                enabled: !skipConfirmation && !options.dryRun,
                task: (context, task) => this.confirmInstallationTask(context, task),
                rendererOptions: { persistentOutput: true },
            },
            {
                title: 'Installing package',
                skip: (context) => {
                    if (context.dryRun) {
                        return `Skipping package installation. Would install package ${listr2_1.color.blue(context.packageIdentifier.toString())}.`;
                    }
                    return false;
                },
                task: (context, task) => this.installPackageTask(context, task, options),
                rendererOptions: { bottomBar: Infinity },
            },
            // TODO: Rework schematic execution as a task and insert here
        ], { /* options */});
        try {
            const result = await tasks.run(taskContext);
            (0, node_assert_1.default)(result.collectionName, 'Collection name should always be available');
            let shouldCleanUp = false;
            if (!result.hasSchematics && !options.dryRun) {
                const packageJsonPath = this.resolvePackageJson(result.collectionName);
                if (packageJsonPath && (0, node_fs_1.existsSync)(packageJsonPath)) {
                    try {
                        const localManifest = JSON.parse(await promises_1.default.readFile(packageJsonPath, 'utf-8'));
                        if (localManifest.schematics) {
                            result.hasSchematics = true;
                            if (localManifest['ng-add']?.save === false) {
                                shouldCleanUp = true;
                            }
                        }
                        else {
                            await this.cleanUpTemporaryDependency(result.collectionName);
                            shouldCleanUp = false;
                        }
                    }
                    catch { }
                }
            }
            // Check if the installed package has actual add actions and not just schematic support
            if (result.hasSchematics && !options.dryRun) {
                const workflow = this.getOrCreateWorkflowForBuilder(result.collectionName);
                const collection = workflow.engine.createCollection(result.collectionName);
                // listSchematicNames cannot be used here since it does not list private schematics.
                // Most `ng-add` schematics are marked as private.
                // TODO: Consider adding a `hasSchematic` helper to the schematic collection object.
                try {
                    collection.createSchematic(this.schematicName, true);
                }
                catch {
                    result.hasSchematics = false;
                }
            }
            if (!result.hasSchematics) {
                // Fallback to a built-in schematic if the package does not have an `ng-add` schematic
                const packageName = result.packageIdentifier.name;
                if (packageName) {
                    const builtInSchematic = BUILT_IN_SCHEMATICS[packageName];
                    if (builtInSchematic) {
                        logger.info(`The ${listr2_1.color.blue(packageName)} package does not provide \`ng add\` actions.`);
                        logger.info('The Angular CLI will use built-in actions to add it to your project.');
                        return this.executeSchematic({
                            ...options,
                            collection: builtInSchematic.collection,
                            schematicName: builtInSchematic.name,
                            package: packageName,
                        });
                    }
                }
                let message = options.dryRun
                    ? 'The package does not provide any `ng add` actions, so no further actions would be taken.'
                    : 'Package installed successfully. The package does not provide any `ng add` actions, so no further actions were taken.';
                if (result.homepage) {
                    message += `\nFor more information about this package, visit its homepage at ${result.homepage}`;
                }
                logger.info(message);
                return;
            }
            if (options.dryRun) {
                logger.info("The package's `ng add` actions would be executed next.");
                return;
            }
            const schematicExitCode = await this.executeSchematic({
                ...options,
                collection: result.collectionName,
            });
            if (shouldCleanUp) {
                await this.cleanUpTemporaryDependency(result.collectionName);
            }
            return schematicExitCode;
        }
        catch (e) {
            if (e instanceof CommandError) {
                logger.error(e.message);
                return 1;
            }
            throw e;
        }
    }
    async findCompatiblePackageVersionTask(context, task, options) {
        const { registry, verbose } = options;
        const { packageIdentifier } = context;
        const { packageManager } = this.context;
        const packageName = packageIdentifier.name;
        (0, node_assert_1.default)(packageName, 'Registry package identifiers should always have a name.');
        const rejectionReasons = [];
        // Attempt to use the 'latest' tag from the registry.
        try {
            const latestManifest = await packageManager.getManifest(`${packageName}@latest`, {
                registry,
            });
            if (latestManifest) {
                const conflicts = await this.getPeerDependencyConflicts(latestManifest);
                if (!conflicts) {
                    context.packageIdentifier = npm_package_arg_1.default.resolve(latestManifest.name, latestManifest.version);
                    task.output = `Found compatible package version: ${listr2_1.color.blue(latestManifest.version)}.`;
                    return;
                }
                rejectionReasons.push(...conflicts);
            }
        }
        catch (e) {
            (0, error_1.assertIsError)(e);
            throw new CommandError(`Unable to load package information from registry: ${e.message}`);
        }
        // 'latest' is invalid or not found, search for most recent matching package.
        task.output =
            'Could not find a compatible version with `latest`. Searching for a compatible version.';
        let packageMetadata;
        try {
            packageMetadata = await packageManager.getRegistryMetadata(packageName, {
                registry,
            });
        }
        catch (e) {
            (0, error_1.assertIsError)(e);
            throw new CommandError(`Unable to load package information from registry: ${e.message}`);
        }
        if (!packageMetadata) {
            throw new CommandError('Unable to load package information from registry.');
        }
        // Allow prelease versions if the CLI itself is a prerelease or locally built.
        const allowPrereleases = !!(0, semver_1.prerelease)(version_1.VERSION.full) || version_1.VERSION.full === '0.0.0';
        const potentialVersions = this.#getPotentialVersions(packageMetadata, allowPrereleases);
        // Heuristic-based search: Check the latest release of each major version first.
        const majorVersions = this.#getMajorVersions(potentialVersions);
        let found = await this.#findCompatibleVersion(context, majorVersions, {
            registry,
            verbose,
            rejectionReasons,
        });
        // Exhaustive search: If no compatible major version is found, fall back to checking all versions.
        if (!found) {
            const checkedVersions = new Set(majorVersions);
            const remainingVersions = potentialVersions.filter((v) => !checkedVersions.has(v));
            found = await this.#findCompatibleVersion(context, remainingVersions, {
                registry,
                verbose,
                rejectionReasons,
            });
        }
        if (!found) {
            let message = `Unable to find compatible package.`;
            if (rejectionReasons.length > 0) {
                message +=
                    '\nThis is often because of incompatible peer dependencies.\n' +
                        'These versions were rejected due to the following conflicts:\n' +
                        rejectionReasons
                            .slice(0, verbose ? undefined : DEFAULT_CONFLICT_DISPLAY_LIMIT)
                            .map((r) => `  - ${r}`)
                            .join('\n');
            }
            task.output = message;
        }
        else {
            task.output = `Found compatible package version: ${listr2_1.color.blue(context.packageIdentifier.toString())}.`;
        }
    }
    async #findCompatibleVersion(context, versions, options) {
        const { packageIdentifier } = context;
        const { packageManager } = this.context;
        const { registry, verbose, rejectionReasons } = options;
        const packageName = packageIdentifier.name;
        (0, node_assert_1.default)(packageName, 'Package name must be defined.');
        for (const version of versions) {
            const manifest = await packageManager.getManifest(`${packageName}@${version}`, {
                registry,
            });
            if (!manifest) {
                continue;
            }
            const conflicts = await this.getPeerDependencyConflicts(manifest);
            if (conflicts) {
                if (verbose || rejectionReasons.length < DEFAULT_CONFLICT_DISPLAY_LIMIT) {
                    rejectionReasons.push(...conflicts);
                }
                continue;
            }
            context.packageIdentifier = npm_package_arg_1.default.resolve(manifest.name, manifest.version);
            return manifest;
        }
        return null;
    }
    #getPotentialVersions(packageMetadata, allowPrereleases) {
        const versionExclusions = packageVersionExclusions[packageMetadata.name];
        const latestVersion = packageMetadata['dist-tags']['latest'];
        const versions = Object.values(packageMetadata.versions).filter((version) => {
            // Latest tag has already been checked
            if (latestVersion && version === latestVersion) {
                return false;
            }
            // Prerelease versions are not stable and should not be considered by default
            if (!allowPrereleases && (0, semver_1.prerelease)(version)) {
                return false;
            }
            // Excluded package versions should not be considered
            if (versionExclusions && (0, semver_1.satisfies)(version, versionExclusions, { includePrerelease: true })) {
                return false;
            }
            return true;
        });
        // Sort in reverse SemVer order so that the newest compatible version is chosen
        return versions.sort((a, b) => (0, semver_1.compare)(b, a, true));
    }
    #getMajorVersions(versions) {
        const majorVersions = new Map();
        for (const version of versions) {
            const major = semver_1.default.major(version);
            const existing = majorVersions.get(major);
            if (!existing || semver_1.default.gt(version, existing)) {
                majorVersions.set(major, version);
            }
        }
        return [...majorVersions.values()].sort((a, b) => (0, semver_1.compare)(b, a, true));
    }
    async loadPackageInfoTask(context, task, options) {
        const { registry } = options;
        let manifest;
        try {
            manifest = await this.context.packageManager.getManifest(context.packageIdentifier, {
                registry,
            });
        }
        catch (e) {
            (0, error_1.assertIsError)(e);
            throw new CommandError(`Unable to fetch package information for '${context.packageIdentifier}': ${e.message}`);
        }
        if (!manifest) {
            throw new CommandError(`Unable to fetch package information for '${context.packageIdentifier}'.`);
        }
        // Avoid fully resolving the package version from the registry again in later steps
        if (context.packageIdentifier.registry) {
            (0, node_assert_1.default)(context.packageIdentifier.name, 'Registry package identifier must have a name');
            context.packageIdentifier = npm_package_arg_1.default.resolve(context.packageIdentifier.name, 
            // `save-prefix` option is ignored by some package managers so the caret is needed to ensure
            // that the value in the project package.json is correct.
            (context.isExactVersion ? '' : '^') + manifest.version);
        }
        context.hasSchematics = !!manifest.schematics;
        context.savePackage = manifest['ng-add']?.save;
        context.collectionName = manifest.name;
        context.homepage = manifest.homepage;
        if (await this.getPeerDependencyConflicts(manifest)) {
            task.output = listr2_1.color.yellow(listr2_1.figures.warning +
                ' Package has unmet peer dependencies. Adding the package may not succeed.');
        }
    }
    async confirmInstallationTask(context, task) {
        if (!(0, tty_1.isTTY)()) {
            task.output =
                `'--skip-confirmation' can be used to bypass installation confirmation. ` +
                    `Ensure package name is correct prior to '--skip-confirmation' option usage.`;
            throw new CommandError('No terminal detected');
        }
        const { ListrInquirerPromptAdapter } = await Promise.resolve().then(() => __importStar(require('@listr2/prompt-adapter-inquirer')));
        const { confirm } = await Promise.resolve().then(() => __importStar(require('@inquirer/prompts')));
        const shouldProceed = await task.prompt(ListrInquirerPromptAdapter).run(confirm, {
            message: `The package ${listr2_1.color.blue(context.packageIdentifier.toString())} will be installed and executed.\n` +
                'Would you like to proceed?',
            default: true,
            theme: { prefix: '' },
        });
        if (!shouldProceed) {
            throw new CommandError('Command aborted');
        }
    }
    async cleanUpTemporaryDependency(packageName) {
        try {
            this.context.logger.info(`Cleaning up temporary dependency '${packageName}'...`);
            // 1. Remove from root package.json
            const projectManifest = await this.getProjectManifest();
            if (projectManifest) {
                if (projectManifest.dependencies) {
                    delete projectManifest.dependencies[packageName];
                }
                if (projectManifest.devDependencies) {
                    delete projectManifest.devDependencies[packageName];
                }
                await promises_1.default.writeFile((0, node_path_1.join)(this.context.root, 'package.json'), JSON.stringify(projectManifest, null, 2) + '\n');
            }
            // 2. Silent install pass to prune files from node_modules and update the lockfile
            await this.context.packageManager.install({ ignoreScripts: true });
        }
        catch (error) {
            this.context.logger.warn(`Failed to clean up temporary dependency '${packageName}': ` +
                `${error instanceof Error ? error.message : error}`);
        }
    }
    async installPackageTask(context, task, options) {
        const { registry } = options;
        const { packageIdentifier, savePackage } = context;
        const { packageManager } = this.context;
        // Only show if installation will actually occur
        task.title = 'Installing package';
        if (context.savePackage === false) {
            task.title += ' in temporary location';
            // Temporary packages are located in a different directory
            // Hence we need to resolve them using the temp path
            const { workingDirectory } = await packageManager.acquireTempPackage(packageIdentifier.toString(), {
                registry,
            });
            const tempRequire = (0, node_module_1.createRequire)(workingDirectory + '/');
            (0, node_assert_1.default)(context.collectionName, 'Collection name should always be available');
            const resolvedCollectionPath = tempRequire.resolve((0, node_path_1.join)(context.collectionName, 'package.json'));
            context.collectionName = (0, node_path_1.dirname)(resolvedCollectionPath);
        }
        else {
            await packageManager.add(packageIdentifier.toString(), 'none', savePackage === 'devDependencies', false, true, {
                registry,
            });
        }
    }
    async isProjectVersionValid(packageIdentifier) {
        if (!packageIdentifier.name) {
            return false;
        }
        const installedVersion = await this.findProjectVersion(packageIdentifier.name);
        if (!installedVersion) {
            return false;
        }
        if (packageIdentifier.rawSpec === '*') {
            return true;
        }
        if (packageIdentifier.type === 'range' &&
            packageIdentifier.fetchSpec &&
            packageIdentifier.fetchSpec !== '*') {
            return (0, semver_1.satisfies)(installedVersion, packageIdentifier.fetchSpec);
        }
        if (packageIdentifier.type === 'version') {
            const v1 = (0, semver_1.valid)(packageIdentifier.fetchSpec);
            const v2 = (0, semver_1.valid)(installedVersion);
            return v1 !== null && v1 === v2;
        }
        return false;
    }
    getCollectionName() {
        const [, collectionName] = this.context.args.positional;
        if (!collectionName) {
            return undefined;
        }
        // The CLI argument may specify also a version, like `ng add @my/lib@13.0.0`,
        // but here we need only the name of the package, like `@my/lib`.
        try {
            const packageName = (0, npm_package_arg_1.default)(collectionName).name;
            if (packageName) {
                return packageName;
            }
        }
        catch (e) {
            (0, error_1.assertIsError)(e);
            this.context.logger.error(e.message);
        }
        return collectionName;
    }
    isPackageInstalled(name) {
        return !!this.resolvePackageJson(name);
    }
    executeSchematic(options) {
        const { verbose, skipConfirmation, interactive, force, dryRun, registry, defaults, collection: collectionName, schematicName, ...schematicOptions } = options;
        return this.runSchematic({
            schematicOptions,
            schematicName: schematicName ?? this.schematicName,
            collectionName,
            executionOptions: {
                interactive,
                force,
                dryRun,
                defaults,
                packageRegistry: registry,
            },
        });
    }
    async findProjectVersion(name) {
        const cachedVersion = this.#projectVersionCache.get(name);
        if (cachedVersion !== undefined) {
            return cachedVersion;
        }
        const installedPackagePath = this.resolvePackageJson(name);
        if (installedPackagePath) {
            try {
                const installedPackage = JSON.parse(await promises_1.default.readFile(installedPackagePath, 'utf-8'));
                this.#projectVersionCache.set(name, installedPackage.version);
                return installedPackage.version;
            }
            catch { }
        }
        const projectManifest = await this.getProjectManifest();
        if (projectManifest) {
            const version = projectManifest.dependencies?.[name] || projectManifest.devDependencies?.[name];
            if (version) {
                this.#projectVersionCache.set(name, version);
                return version;
            }
        }
        this.#projectVersionCache.set(name, null);
        return null;
    }
    async getProjectManifest() {
        if (this.#rootManifestCache) {
            return this.#rootManifestCache;
        }
        const { root } = this.context;
        try {
            this.#rootManifestCache = JSON.parse(await promises_1.default.readFile((0, node_path_1.join)(root, 'package.json'), 'utf-8'));
            return this.#rootManifestCache;
        }
        catch {
            return null;
        }
    }
    resolvePackageJson(name) {
        try {
            return this.rootRequire.resolve((0, node_path_1.join)(name, 'package.json'));
        }
        catch (e) {
            (0, error_1.assertIsError)(e);
            if (e.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
                try {
                    const mainPath = this.rootRequire.resolve(name);
                    let directory = (0, node_path_1.dirname)(mainPath);
                    // Stop at the node_modules boundary or the root of the file system
                    while (directory && (0, node_path_1.basename)(directory) !== 'node_modules') {
                        const packageJsonPath = (0, node_path_1.join)(directory, 'package.json');
                        if ((0, node_fs_1.existsSync)(packageJsonPath)) {
                            return packageJsonPath;
                        }
                        const parent = (0, node_path_1.dirname)(directory);
                        if (parent === directory) {
                            break;
                        }
                        directory = parent;
                    }
                }
                catch (e) {
                    (0, error_1.assertIsError)(e);
                    this.context.logger.debug(`Failed to resolve package '${name}' during fallback: ${e.message}`);
                }
            }
        }
        return undefined;
    }
    async getPeerDependencyConflicts(manifest) {
        if (!manifest.peerDependencies) {
            return false;
        }
        const checks = Object.entries(manifest.peerDependencies).map(async ([peer, range]) => {
            let peerIdentifier;
            try {
                peerIdentifier = npm_package_arg_1.default.resolve(peer, range);
            }
            catch {
                this.context.logger.warn(`Invalid peer dependency ${peer} found in package.`);
                return null;
            }
            if (peerIdentifier.type !== 'version' && peerIdentifier.type !== 'range') {
                // type === 'tag' | 'file' | 'directory' | 'remote' | 'git'
                // Cannot accurately compare these as the tag/location may have changed since install.
                return null;
            }
            try {
                const version = await this.findProjectVersion(peer);
                if (!version) {
                    return null;
                }
                const options = { includePrerelease: true };
                if (!(0, semver_1.intersects)(version, peerIdentifier.rawSpec, options) &&
                    !(0, semver_1.satisfies)(version, peerIdentifier.rawSpec, options)) {
                    return (`Package "${manifest.name}@${manifest.version}" has an incompatible peer dependency to "` +
                        `${peer}@${peerIdentifier.rawSpec}" (requires "${version}" in project).`);
                }
            }
            catch {
                // Not found or invalid so ignore
            }
            return null;
        });
        const conflicts = (await Promise.all(checks)).filter((result) => !!result);
        return conflicts.length > 0 && conflicts;
    }
}
exports.default = AddCommandModule;
//# sourceMappingURL=cli.js.map