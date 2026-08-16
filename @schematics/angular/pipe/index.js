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
const pipeSchematic = (0, project_1.createProjectSchematic)(async (options, { tree }) => {
    options.path ??= await (0, workspace_1.createDefaultPath)(tree, options.project);
    options.module = (0, find_module_1.findModuleFromOptions)(tree, options);
    const parsedPath = (0, parse_name_1.parseName)(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    (0, validation_1.validateClassName)(schematics_1.strings.classify(options.name));
    return (0, schematics_1.chain)([
        (0, add_declaration_to_ng_module_1.addDeclarationToNgModule)({
            type: 'pipe',
            ...options,
        }),
        (0, generate_from_files_1.generateFromFiles)(options),
    ]);
});
exports.default = pipeSchematic;
//# sourceMappingURL=index.js.map