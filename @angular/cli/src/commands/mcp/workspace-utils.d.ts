/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { workspaces } from '@angular-devkit/core';
import { AngularWorkspace } from '../../utilities/config';
import { type Host } from './host';
import { McpToolContext } from './tools/tool-registry';
/**
 * Searches for an angular.json file by traversing up the directory tree from a starting directory.
 *
 * @param startDir The directory path to start searching from
 * @param host The workspace host instance used to check file existence. Defaults to LocalWorkspaceHost
 * @returns The absolute path to the directory containing angular.json, or null if not found
 *
 * @remarks
 * This function performs an upward directory traversal starting from `startDir`.
 * It checks each directory for the presence of an angular.json file until either:
 * - The file is found (returns the directory path)
 * - The root of the filesystem is reached (returns null)
 */
export declare function findAngularJsonDir(startDir: string, host?: Host): string | null;
/**
 * Searches for a project in the current workspace, by name.
 */
export declare function getProject(context: McpToolContext, name: string): workspaces.ProjectDefinition | undefined;
/**
 * Returns the name of the default project in the current workspace, or undefined if none exists.
 *
 * If no default project is defined but there's only a single project in the workspace, its name will
 * be returned.
 */
export declare function getDefaultProjectName(workspace: AngularWorkspace | undefined): string | undefined;
/**
 * Resolves workspace and project for tools to operate on.
 *
 * If `workspacePathInput` is absent, uses the MCP's configured workspace. If none is configured, use the
 * current directory as the workspace.
 * If `projectNameInput` is absent, uses the default project in the workspace.
 */
export declare function resolveWorkspaceAndProject({ host, server, workspacePathInput, projectNameInput, mcpWorkspace, }: {
    host: Host;
    server?: McpToolContext['server'];
    workspacePathInput?: string;
    projectNameInput?: string;
    mcpWorkspace?: AngularWorkspace;
}): Promise<{
    workspace: AngularWorkspace;
    workspacePath: string;
    projectName: string;
}>;
