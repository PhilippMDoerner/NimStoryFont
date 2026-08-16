"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectSchematic = createProjectSchematic;
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("./workspace");
/**
 * Creates a schematic rule factory that provides project information to the given factory function.
 * The project is determined from the `project` option. If the project is not found, an exception is
 * thrown.
 *
 * @param factory The factory function that creates the schematic rule.
 * @returns A schematic rule factory.
 */
function createProjectSchematic(factory) {
    return (options) => async (tree, context) => {
        const workspace = await (0, workspace_1.getWorkspace)(tree);
        const project = workspace.projects.get(options.project);
        if (!project) {
            throw new schematics_1.SchematicsException(`Project "${options.project}" does not exist.`);
        }
        return factory(options, { project, workspace, tree, context });
    };
}
//# sourceMappingURL=project.js.map