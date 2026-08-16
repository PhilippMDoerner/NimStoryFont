"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const node_path_1 = require("node:path");
const paths_1 = require("../utility/paths");
const project_1 = require("../utility/project");
const workspace_1 = require("../utility/workspace");
const workspace_models_1 = require("../utility/workspace-models");
const schema_1 = require("./schema");
const configSchematic = (0, project_1.createProjectSchematic)((options, { project }) => {
    switch (options.type) {
        case schema_1.Type.Karma:
            return addKarmaConfig(options);
        case schema_1.Type.Browserslist:
            return addBrowserslistConfig(project.root);
        case schema_1.Type.Vitest:
            return addVitestConfig(options);
        default:
            throw new schematics_1.SchematicsException(`"${options.type}" is an unknown configuration file type.`);
    }
});
exports.default = configSchematic;
function addVitestConfig(options) {
    return (tree, context) => (0, workspace_1.updateWorkspace)((workspace) => {
        const project = workspace.projects.get(options.project);
        if (!project) {
            throw new schematics_1.SchematicsException(`Project name "${options.project}" doesn't not exist.`);
        }
        const testTarget = project.targets.get('test');
        if (!testTarget) {
            throw new schematics_1.SchematicsException(`No "test" target found for project "${options.project}".` +
                ' A "test" target is required to generate a Vitest configuration.');
        }
        if (testTarget.builder !== workspace_models_1.Builders.BuildUnitTest) {
            throw new schematics_1.SchematicsException(`Cannot add a Vitest configuration as builder for "test" target in project does not` +
                ` use "${workspace_models_1.Builders.BuildUnitTest}".`);
        }
        testTarget.options ??= {};
        testTarget.options.runnerConfig = true;
        // Check runner option.
        if (testTarget.options.runner === 'karma') {
            context.logger.warn(`The "test" target is configured to use the "karma" runner in the main options.` +
                ' The generated "vitest-base.config.ts" file may not be used.');
        }
        for (const [name, config] of Object.entries(testTarget.configurations ?? {})) {
            if (config &&
                typeof config === 'object' &&
                'runner' in config &&
                config.runner === 'karma') {
                context.logger.warn(`The "test" target's "${name}" configuration is configured to use the "karma" runner.` +
                    ' The generated "vitest-base.config.ts" file may not be used for that configuration.');
            }
        }
        return (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.filter)((p) => p.endsWith('vitest-base.config.ts.template')),
            (0, schematics_1.applyTemplates)({}),
            (0, schematics_1.move)(project.root),
        ]));
    });
}
async function addBrowserslistConfig(projectRoot) {
    return (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
        (0, schematics_1.filter)((p) => p.endsWith('.browserslistrc.template')),
        // The below is replaced by bazel `npm_package`.
        (0, schematics_1.applyTemplates)({ baselineDate: '2026-05-07' }),
        (0, schematics_1.move)(projectRoot),
    ]));
}
function addKarmaConfig(options) {
    return (_, context) => (0, workspace_1.updateWorkspace)((workspace) => {
        const project = workspace.projects.get(options.project);
        if (!project) {
            throw new schematics_1.SchematicsException(`Project name "${options.project}" doesn't not exist.`);
        }
        const testTarget = project.targets.get('test');
        if (!testTarget) {
            throw new schematics_1.SchematicsException(`No "test" target found for project "${options.project}".` +
                ' A "test" target is required to generate a karma configuration.');
        }
        if (testTarget.builder !== workspace_models_1.Builders.Karma &&
            testTarget.builder !== workspace_models_1.Builders.BuildKarma &&
            testTarget.builder !== workspace_models_1.Builders.BuildUnitTest) {
            throw new schematics_1.SchematicsException(`Cannot add a karma configuration as builder for "test" target in project does not` +
                ` use "${workspace_models_1.Builders.Karma}", "${workspace_models_1.Builders.BuildKarma}", or ${workspace_models_1.Builders.BuildUnitTest}.`);
        }
        testTarget.options ??= {};
        if (testTarget.builder !== workspace_models_1.Builders.BuildUnitTest) {
            testTarget.options.karmaConfig = node_path_1.posix.join(project.root, 'karma.conf.js');
        }
        else {
            // `unit-test` uses the `runnerConfig` option which has configuration discovery if enabled
            testTarget.options.runnerConfig = true;
            let isKarmaRunnerConfigured = false;
            // Check runner option
            if (testTarget.options.runner) {
                if (testTarget.options.runner === 'karma') {
                    isKarmaRunnerConfigured = true;
                }
                else {
                    context.logger.warn(`The "test" target is configured to use a runner other than "karma" in the main options.` +
                        ' The generated "karma.conf.js" file may not be used.');
                }
            }
            for (const [name, config] of Object.entries(testTarget.configurations ?? {})) {
                if (config && typeof config === 'object' && 'runner' in config) {
                    if (config.runner !== 'karma') {
                        context.logger.warn(`The "test" target's "${name}" configuration is configured to use a runner other than "karma".` +
                            ' The generated "karma.conf.js" file may not be used for that configuration.');
                    }
                    else {
                        isKarmaRunnerConfigured = true;
                    }
                }
            }
            if (!isKarmaRunnerConfigured) {
                context.logger.warn(`The "test" target is not explicitly configured to use the "karma" runner.` +
                    ' The generated "karma.conf.js" file may not be used as the default runner is "vitest".');
            }
        }
        // If scoped project (i.e. "@foo/bar"), convert dir to "foo/bar".
        let folderName = options.project.startsWith('@') ? options.project.slice(1) : options.project;
        if (/[A-Z]/.test(folderName)) {
            folderName = schematics_1.strings.dasherize(folderName);
        }
        return (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.filter)((p) => p.endsWith('karma.conf.js.template')),
            (0, schematics_1.applyTemplates)({
                relativePathToWorkspaceRoot: (0, paths_1.relativePathToWorkspaceRoot)(project.root),
                folderName,
                needDevkitPlugin: testTarget.builder === workspace_models_1.Builders.Karma,
            }),
            (0, schematics_1.move)(project.root),
        ]));
    });
}
//# sourceMappingURL=index.js.map