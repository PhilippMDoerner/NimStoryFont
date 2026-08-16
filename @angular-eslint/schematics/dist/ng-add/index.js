"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const utils_1 = require("../utils");
const packageJSON = require('../../package.json');
function addAngularESLintPackages(json, options) {
    return (host, context) => {
        if (!host.exists('package.json')) {
            throw new Error('Could not find a `package.json` file at the root of your workspace');
        }
        if (host.exists('tsconfig.base.json')) {
            throw new Error('\nError: Angular CLI v10.1.0 and later (and no `tsconfig.base.json`) is required in order to run this schematic. Please update your workspace and try again.\n');
        }
        json.scripts = json.scripts || {};
        json.scripts['lint'] = json.scripts['lint'] || 'ng lint';
        json.devDependencies = json.devDependencies || {};
        applyDevDependenciesForFlatConfig(json);
        // Check if yarn PnP is used https://yarnpkg.com/advanced/pnpapi#processversionspnp and install extra explicit packages to make it happy
        if (process.versions.pnp) {
            // An explicit reference to the builder is needed for running `ng lint` in PnP
            json.devDependencies['@angular-eslint/builder'] = packageJSON.version;
            // The linting cannot complete without these explicitly in the root package.json in PnP
            const typescriptESLintVersion = packageJSON.devDependencies['@typescript-eslint/utils'];
            json.devDependencies['@typescript-eslint/types'] =
                typescriptESLintVersion;
            json.devDependencies['@typescript-eslint/utils'] =
                typescriptESLintVersion;
        }
        else {
            const isNpm = host.exists('package-lock.json');
            if (!isNpm) {
                // Ensure @angular-eslint/builder is always resolvable in non-npm installations (https://github.com/angular-eslint/angular-eslint/issues/2241)
                json.devDependencies['@angular-eslint/builder'] = packageJSON.version;
            }
        }
        json.devDependencies = (0, utils_1.sortObjectByKeys)(json.devDependencies);
        host.overwrite('package.json', JSON.stringify(json, null, 2));
        if (!options.skipInstall) {
            context.addTask(new tasks_1.NodePackageInstallTask({ allowScripts: false }));
            context.logger.info(`
All angular-eslint dependencies have been successfully installed 🎉

Please see https://github.com/angular-eslint/angular-eslint for how to add ESLint configuration to your project.
`);
        }
        else {
            context.logger.info(`
All angular-eslint dependencies have been successfully added. Run your package manager install command to complete setup.

Please see https://github.com/angular-eslint/angular-eslint for how to add ESLint configuration to your project.
`);
        }
        return host;
    };
}
function applyDevDependenciesForFlatConfig(json) {
    json.devDependencies['eslint'] = `^${packageJSON.devDependencies['eslint']}`;
    json.devDependencies['@eslint/js'] =
        `^${packageJSON.devDependencies['@eslint/js']}`;
    /**
     * angular-eslint packages
     */
    json.devDependencies['angular-eslint'] = packageJSON.version;
    // Clean up individual packages from devDependencies
    delete json.devDependencies['@angular-eslint/builder'];
    delete json.devDependencies['@angular-eslint/eslint-plugin'];
    delete json.devDependencies['@angular-eslint/eslint-plugin-template'];
    delete json.devDependencies['@angular-eslint/schematics'];
    delete json.devDependencies['@angular-eslint/template-parser'];
    /**
     * typescript-eslint
     */
    const typescriptESLintVersion = packageJSON.devDependencies['@typescript-eslint/utils'];
    json.devDependencies['typescript-eslint'] = typescriptESLintVersion;
    // Clean up individual packages from devDependencies
    delete json.devDependencies['@typescript-eslint/parser'];
    delete json.devDependencies['@typescript-eslint/eslint-plugin'];
    delete json.devDependencies['@typescript-eslint/utils'];
}
function applyESLintConfigIfSingleProjectWithNoExistingTSLint() {
    return (host, context) => {
        const angularJson = (0, utils_1.readJsonInTree)(host, 'angular.json');
        if (!angularJson || !angularJson.projects) {
            return;
        }
        /**
         * If the workspace was created by passing `--create-application=false` to `ng new`
         * then there will be an angular.json file with a projects object, but no projects
         * within it.
         *
         * In this case we should still configure the root eslint config and set the
         * schematicCollections to use in angular.json.
         */
        const projectNames = Object.keys(angularJson.projects);
        if (projectNames.length === 0) {
            return (0, schematics_1.chain)([
                (host) => {
                    // If the root package.json uses type: module, generate ESM content
                    const packageJson = (0, utils_1.readJsonInTree)(host, 'package.json');
                    const isESM = packageJson.type === 'module';
                    host.create('eslint.config.js', (0, utils_1.createStringifiedRootESLintConfig)(null, isESM));
                    return host;
                },
                (0, utils_1.updateJsonInTree)('angular.json', (json) => (0, utils_1.updateSchematicCollections)(json, 'angular-eslint')),
            ]);
        }
        /**
         * The only other use-case we can reliably support for automatic configuration
         * is the default case of having a single project in the workspace, so for anything
         * else we bail at this point.
         */
        if (projectNames.length !== 1) {
            return;
        }
        const singleProject = angularJson.projects[projectNames[0]];
        const targetsConfig = (0, utils_1.getTargetsConfigFromProject)(singleProject);
        // Only possible if malformed, safer to finish here
        if (!targetsConfig) {
            return;
        }
        // The project already has a lint builder setup, finish here as there is nothing more we can do automatically
        if (targetsConfig.lint) {
            return;
        }
        context.logger.info(`
We detected that you have a single project in your workspace and no existing linter wired up, so we are configuring ESLint for you automatically.

Please see https://github.com/angular-eslint/angular-eslint for more information.
`.trimStart());
        return (0, schematics_1.chain)([
            (0, schematics_1.schematic)('add-eslint-to-project', {}),
            (0, utils_1.updateJsonInTree)('angular.json', (json) => (0, utils_1.updateSchematicCollections)(json, 'angular-eslint')),
        ]);
    };
}
/**
 * Entry point for the ng-add schematic.
 *
 * @param options Configuration options passed to the schematic.
 */
function default_1(options) {
    return (host, context) => {
        const workspacePackageJSON = host.read('package.json').toString('utf-8');
        const json = JSON.parse(workspacePackageJSON);
        return (0, schematics_1.chain)([
            addAngularESLintPackages(json, options),
            applyESLintConfigIfSingleProjectWithNoExistingTSLint(),
        ])(host, context);
    };
}
