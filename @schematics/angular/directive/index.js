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
const add_declaration_to_ng_module_1 = require("../utility/add-declaration-to-ng-module");
const find_module_1 = require("../utility/find-module");
const generate_from_files_1 = require("../utility/generate-from-files");
const parse_name_1 = require("../utility/parse-name");
const project_1 = require("../utility/project");
const validation_1 = require("../utility/validation");
const workspace_1 = require("../utility/workspace");
function buildSelector(options, projectPrefix) {
    let selector = options.name;
    if (options.prefix) {
        selector = `${options.prefix}-${selector}`;
    }
    else if (options.prefix === undefined && projectPrefix) {
        selector = `${projectPrefix}-${selector}`;
    }
    return schematics_1.strings.camelize(selector);
}
const directiveSchematic = (0, project_1.createProjectSchematic)((options, { project, tree }) => {
    if (options.path === undefined) {
        options.path = (0, workspace_1.buildDefaultPath)(project);
    }
    options.module = (0, find_module_1.findModuleFromOptions)(tree, options);
    const parsedPath = (0, parse_name_1.parseName)(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    options.selector = options.selector || buildSelector(options, project.prefix || '');
    (0, validation_1.validateHtmlSelector)(options.selector);
    const classifiedName = schematics_1.strings.classify(options.name) +
        (options.addTypeToClassName && options.type ? schematics_1.strings.classify(options.type) : '');
    (0, validation_1.validateClassName)(classifiedName);
    return (0, schematics_1.chain)([
        (0, add_declaration_to_ng_module_1.addDeclarationToNgModule)({
            type: 'directive',
            ...options,
        }),
        (0, generate_from_files_1.generateFromFiles)({
            ...options,
            classifiedName,
        }),
    ]);
});
exports.default = directiveSchematic;
//# sourceMappingURL=index.js.map