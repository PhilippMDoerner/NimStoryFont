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
const generate_from_files_1 = require("../utility/generate-from-files");
const parse_name_1 = require("../utility/parse-name");
const project_1 = require("../utility/project");
const validation_1 = require("../utility/validation");
const workspace_1 = require("../utility/workspace");
const serviceSchematic = (0, project_1.createProjectSchematic)((options, { project, tree }) => {
    if (options.path === undefined) {
        options.path = (0, workspace_1.buildDefaultPath)(project);
    }
    const parsedPath = (0, parse_name_1.parseName)(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    const classifiedName = schematics_1.strings.classify(options.name) +
        (options.addTypeToClassName && options.type ? schematics_1.strings.classify(options.type) : '');
    (0, validation_1.validateClassName)(classifiedName);
    return (0, generate_from_files_1.generateFromFiles)({
        ...options,
        classifiedName,
    });
});
exports.default = serviceSchematic;
//# sourceMappingURL=index.js.map