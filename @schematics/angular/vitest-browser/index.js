"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const schematics_1 = require("@angular-devkit/schematics");
const posix_1 = require("node:path/posix");
const dependency_1 = require("../utility/dependency");
const json_file_1 = require("../utility/json-file");
const latest_versions_1 = require("../utility/latest-versions");
const workspace_1 = require("../utility/workspace");
const workspace_models_1 = require("../utility/workspace-models");
function default_1(options) {
    return async (host, _context) => {
        const workspace = await (0, workspace_1.getWorkspace)(host);
        const project = workspace.projects.get(options.project);
        if (!project) {
            throw new schematics_1.SchematicsException(`Project "${options.project}" does not exist.`);
        }
        const testTarget = project.targets.get('test');
        if (testTarget?.builder !== workspace_models_1.Builders.BuildUnitTest) {
            throw new schematics_1.SchematicsException(`Project "${options.project}" does not have a "test" target with a supported builder.`);
        }
        if (testTarget.options?.['runner'] === 'karma') {
            throw new schematics_1.SchematicsException(`Project "${options.project}" is configured to use Karma. ` +
                'Please migrate to Vitest before adding browser testing support.');
        }
        const packageName = options.package;
        if (!packageName) {
            return;
        }
        const dependencies = [packageName];
        if (packageName === '@vitest/browser-playwright') {
            dependencies.push('playwright');
        }
        else if (packageName === '@vitest/browser-webdriverio') {
            dependencies.push('webdriverio');
        }
        // Update tsconfig.spec.json
        const tsConfigPath = testTarget.options?.['tsConfig'] ??
            (0, posix_1.join)(project.root, 'tsconfig.spec.json');
        const updateTsConfigRule = (host) => {
            if (host.exists(tsConfigPath)) {
                const json = new json_file_1.JSONFile(host, tsConfigPath);
                const typesPath = ['compilerOptions', 'types'];
                const existingTypes = json.get(typesPath) ?? [];
                const newTypes = existingTypes.filter((t) => t !== 'jasmine');
                if (!newTypes.includes('vitest/globals')) {
                    newTypes.push('vitest/globals');
                }
                if (packageName && !newTypes.includes(packageName)) {
                    newTypes.push(packageName);
                }
                if (newTypes.length !== existingTypes.length ||
                    newTypes.some((t, i) => t !== existingTypes[i])) {
                    json.modify(typesPath, newTypes);
                }
            }
        };
        return (0, schematics_1.chain)([
            updateTsConfigRule,
            ...dependencies.map((name) => (0, dependency_1.addDependency)(name, latest_versions_1.latestVersions[name], {
                type: dependency_1.DependencyType.Dev,
                existing: dependency_1.ExistingBehavior.Skip,
                install: options.skipInstall ? dependency_1.InstallBehavior.None : dependency_1.InstallBehavior.Auto,
            })),
            (_, context) => {
                context.logger.info('Vitest browser testing support has been added. ' +
                    "To run tests in a browser, add a 'browsers' field to the 'test' target in 'angular.json', " +
                    "or use the '--browsers' command line option.");
            },
        ]);
    };
}
//# sourceMappingURL=index.js.map