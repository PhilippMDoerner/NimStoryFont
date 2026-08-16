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
const tasks_1 = require("@angular-devkit/schematics/tasks");
const json_file_1 = require("../utility/json-file");
const schema_1 = require("./schema");
function default_1(options) {
    if (!options.directory) {
        // If scoped project (i.e. "@foo/bar"), convert directory to "foo/bar".
        options.directory = options.name.startsWith('@') ? options.name.slice(1) : options.name;
    }
    const workspaceOptions = {
        name: options.name,
        version: options.version,
        newProjectRoot: options.newProjectRoot,
        minimal: options.minimal,
        strict: options.strict,
        packageManager: options.packageManager,
    };
    const applicationOptions = {
        projectRoot: '',
        name: options.name,
        inlineStyle: options.inlineStyle,
        inlineTemplate: options.inlineTemplate,
        prefix: options.prefix,
        viewEncapsulation: options.viewEncapsulation,
        routing: options.routing,
        style: options.style,
        skipTests: options.skipTests,
        testRunner: options.testRunner,
        skipPackageJson: false,
        // always 'skipInstall' here, so that we do it after the move
        skipInstall: true,
        strict: options.strict,
        minimal: options.minimal,
        standalone: options.standalone,
        ssr: options.ssr,
        zoneless: options.zoneless,
        fileNameStyleGuide: options.fileNameStyleGuide,
    };
    return (0, schematics_1.chain)([
        (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.empty)(), [
            (0, schematics_1.schematic)('workspace', workspaceOptions),
            (tree) => {
                if (options.testRunner === schema_1.TestRunner.Karma) {
                    const file = new json_file_1.JSONFile(tree, 'angular.json');
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const schematics = file.get(['schematics']) ?? {};
                    (schematics['@schematics/angular:application'] ??= {}).testRunner = schema_1.TestRunner.Karma;
                    (schematics['@schematics/angular:library'] ??= {}).testRunner = schema_1.TestRunner.Karma;
                    file.modify(['schematics'], schematics);
                }
            },
            options.createApplication ? (0, schematics_1.schematic)('application', applicationOptions) : schematics_1.noop,
            (0, schematics_1.schematic)('ai-config', {
                tool: options.aiConfig?.length ? options.aiConfig : undefined,
            }),
            (0, schematics_1.move)(options.directory),
        ])),
        (_host, context) => {
            let packageTask;
            if (!options.skipInstall) {
                packageTask = context.addTask(new tasks_1.NodePackageInstallTask({
                    workingDirectory: options.directory,
                    packageManager: options.packageManager,
                }));
            }
            if (!options.skipGit) {
                const commit = typeof options.commit == 'object' ? options.commit : options.commit ? {} : false;
                context.addTask(new tasks_1.RepositoryInitializerTask(options.directory, commit), packageTask ? [packageTask] : []);
            }
        },
    ]);
}
//# sourceMappingURL=index.js.map