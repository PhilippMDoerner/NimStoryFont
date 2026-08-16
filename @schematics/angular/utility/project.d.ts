/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ProjectDefinition, WorkspaceDefinition } from './workspace';
/**
 * Creates a schematic rule factory that provides project information to the given factory function.
 * The project is determined from the `project` option. If the project is not found, an exception is
 * thrown.
 *
 * @param factory The factory function that creates the schematic rule.
 * @returns A schematic rule factory.
 */
export declare function createProjectSchematic<S extends {
    project: string;
}>(factory: (options: S, projectContext: {
    project: ProjectDefinition;
    workspace: WorkspaceDefinition;
    tree: Tree;
    context: SchematicContext;
}) => Rule | Promise<Rule>): (options: S) => Rule;
