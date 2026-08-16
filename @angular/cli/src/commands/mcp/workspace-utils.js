"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAngularJsonDir = findAngularJsonDir;
exports.getProject = getProject;
exports.getDefaultProjectName = getDefaultProjectName;
exports.resolveWorkspaceAndProject = resolveWorkspaceAndProject;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
const config_1 = require("../../utilities/config");
const host_1 = require("./host");
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
function findAngularJsonDir(startDir, host = host_1.LocalWorkspaceHost) {
    let currentDir = startDir;
    while (true) {
        if (host.existsSync((0, node_path_1.join)(currentDir, 'angular.json'))) {
            return currentDir;
        }
        const parentDir = (0, node_path_1.dirname)(currentDir);
        if (parentDir === currentDir) {
            return null;
        }
        currentDir = parentDir;
    }
}
/**
 * Searches for a project in the current workspace, by name.
 */
function getProject(context, name) {
    const projects = context.workspace?.projects;
    if (!projects) {
        return undefined;
    }
    return projects.get(name);
}
/**
 * Returns the name of the default project in the current workspace, or undefined if none exists.
 *
 * If no default project is defined but there's only a single project in the workspace, its name will
 * be returned.
 */
function getDefaultProjectName(workspace) {
    const projects = workspace?.projects;
    if (!projects) {
        return undefined;
    }
    const defaultProjectName = workspace?.extensions['defaultProject'];
    if (defaultProjectName) {
        return defaultProjectName;
    }
    // No default project defined? This might still be salvageable if only a single project exists.
    if (projects.size === 1) {
        return Array.from(projects.keys())[0];
    }
    return undefined;
}
function isWithinAllowedRoot(root, targetPath) {
    const rel = (0, node_path_1.relative)(root, targetPath);
    return !rel.startsWith('..') && !(0, node_path_1.isAbsolute)(rel);
}
async function getAllowedWorkspaceRoots(server) {
    let roots;
    const clientCapabilities = server.server.getClientCapabilities();
    if (clientCapabilities?.roots) {
        const { roots: clientRoots } = await server.server.listRoots();
        roots = clientRoots?.map((root) => (0, node_url_1.fileURLToPath)(root.uri)) ?? [];
    }
    else {
        roots = [process.cwd()];
    }
    return roots
        .map((root) => {
        try {
            return (0, node_fs_1.realpathSync)(root);
        }
        catch {
            return null;
        }
    })
        .filter((root) => root !== null);
}
async function isAllowedWorkspacePath(server, workspacePath) {
    const allowedRoots = await getAllowedWorkspaceRoots(server);
    const resolvedWorkspacePath = (0, node_fs_1.realpathSync)(workspacePath);
    return allowedRoots.some((root) => isWithinAllowedRoot(root, resolvedWorkspacePath));
}
/**
 * Resolves workspace and project for tools to operate on.
 *
 * If `workspacePathInput` is absent, uses the MCP's configured workspace. If none is configured, use the
 * current directory as the workspace.
 * If `projectNameInput` is absent, uses the default project in the workspace.
 */
async function resolveWorkspaceAndProject({ host, server, workspacePathInput, projectNameInput, mcpWorkspace, }) {
    let workspacePath;
    let workspace;
    if (workspacePathInput) {
        if (!host.existsSync(workspacePathInput)) {
            throw new Error(`Workspace path does not exist: ${workspacePathInput}. ` +
                "You can use 'list_projects' to find available workspaces.");
        }
        if (!host.existsSync((0, node_path_1.join)(workspacePathInput, 'angular.json'))) {
            throw new Error(`No angular.json found at ${workspacePathInput}. ` +
                "You can use 'list_projects' to find available workspaces.");
        }
        if (server) {
            if (!(await isAllowedWorkspacePath(server, workspacePathInput))) {
                throw new Error(`Workspace path is outside the allowed MCP roots: ${workspacePathInput}. ` +
                    "You can use 'list_projects' to find available workspaces.");
            }
        }
        workspacePath = workspacePathInput;
        const configPath = (0, node_path_1.join)(workspacePath, 'angular.json');
        try {
            workspace = await config_1.AngularWorkspace.load(configPath);
        }
        catch (e) {
            throw new Error(`Failed to load workspace configuration at ${configPath}`, { cause: e });
        }
    }
    else if (mcpWorkspace) {
        workspace = mcpWorkspace;
        workspacePath = workspace.basePath;
    }
    else {
        const found = findAngularJsonDir(process.cwd(), host);
        if (!found) {
            throw new Error('Could not find an Angular workspace (angular.json) in the current directory. ' +
                "You can use 'list_projects' to find available workspaces.");
        }
        if (server && !(await isAllowedWorkspacePath(server, found))) {
            throw new Error(`The current directory resolves to a workspace outside the allowed MCP roots: ${found}. ` +
                "You can use 'list_projects' to find available workspaces.");
        }
        workspacePath = found;
        const configPath = (0, node_path_1.join)(workspacePath, 'angular.json');
        try {
            workspace = await config_1.AngularWorkspace.load(configPath);
        }
        catch (e) {
            throw new Error(`Failed to load workspace configuration at ${configPath}.`, { cause: e });
        }
    }
    let projectName = projectNameInput;
    if (projectName) {
        if (!workspace.projects.has(projectName)) {
            throw new Error(`Project '${projectName}' not found in workspace path ${workspacePath}. ` +
                "You can use 'list_projects' to find available projects.");
        }
    }
    else {
        projectName = getDefaultProjectName(workspace);
    }
    if (!projectName) {
        throw new Error(`No project name provided and no default project found in workspace path ${workspacePath}. ` +
            'Please provide a project name or set a default project in angular.json. ' +
            "You can use 'list_projects' to find available projects.");
    }
    return { workspace, workspacePath, projectName };
}
//# sourceMappingURL=workspace-utils.js.map