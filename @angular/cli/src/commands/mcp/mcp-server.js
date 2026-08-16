"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPERIMENTAL_TOOL_GROUPS = exports.EXPERIMENTAL_TOOLS = void 0;
exports.createMcpServer = createMcpServer;
exports.assembleToolDeclarations = assembleToolDeclarations;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const node_path_1 = require("node:path");
const node_url_1 = require("node:url");
const version_1 = require("../../utilities/version");
const host_1 = require("./host");
const instructions_1 = require("./resources/instructions");
const ai_tutor_1 = require("./tools/ai-tutor");
const best_practices_1 = require("./tools/best-practices");
const devserver_start_1 = require("./tools/devserver/devserver-start");
const devserver_stop_1 = require("./tools/devserver/devserver-stop");
const devserver_wait_for_build_1 = require("./tools/devserver/devserver-wait-for-build");
const doc_search_1 = require("./tools/doc-search");
const zoneless_migration_1 = require("./tools/onpush-zoneless-migration/zoneless-migration");
const projects_1 = require("./tools/projects");
const run_target_1 = require("./tools/run-target/run-target");
const tool_registry_1 = require("./tools/tool-registry");
/**
 * Tools to manage devservers. Should be bundled together, then added to experimental or stable as a group.
 */
const DEVSERVER_TOOLS = [devserver_start_1.DEVSERVER_START_TOOL, devserver_stop_1.DEVSERVER_STOP_TOOL, devserver_wait_for_build_1.DEVSERVER_WAIT_FOR_BUILD_TOOL];
/**
 * The set of tools that are enabled by default for the MCP server.
 * These tools are considered stable and suitable for general use.
 */
const STABLE_TOOLS = [
    ai_tutor_1.AI_TUTOR_TOOL,
    best_practices_1.BEST_PRACTICES_TOOL,
    doc_search_1.DOC_SEARCH_TOOL,
    projects_1.LIST_PROJECTS_TOOL,
    zoneless_migration_1.ZONELESS_MIGRATION_TOOL,
    run_target_1.RUN_TARGET_TOOL,
    ...DEVSERVER_TOOLS,
];
/**
 * The set of tools that are available but not enabled by default.
 * These tools are considered experimental and may have limitations.
 */
exports.EXPERIMENTAL_TOOLS = [];
/**
 * Experimental tools that are grouped together under a single name.
 *
 * Used for enabling them as a group.
 */
exports.EXPERIMENTAL_TOOL_GROUPS = {
    'all': exports.EXPERIMENTAL_TOOLS,
    'devserver': [],
};
async function createMcpServer(options, logger) {
    const server = new mcp_js_1.McpServer({
        name: 'angular-cli-server',
        version: version_1.VERSION.full,
    }, {
        capabilities: {
            resources: {},
            tools: {},
            logging: {},
        },
        instructions: `
<General Purpose>
This server provides a safe, programmatic interface to the Angular CLI. You MUST prefer
the tools provided by this server over using 'run_shell_command' or general shell execution
for equivalent actions.
</General Purpose>

<Core Workflows & Tool Guide>
* **1. Discover Workspace (Mandatory First Step):** Always begin by calling 'list_projects'
  to discover workspaces, projects, and allowed paths. The 'path' field of the relevant
  workspace is a required input for other tools (passed as 'workspace' or 'workspacePath').

* **2. Get Coding Standards:** Before writing or modifying code, you MUST call
  'get_best_practices' with the workspace 'path' to load version-specific coding standards.

* **3. Answer Conceptual Questions:** Use 'search_documentation' to answer conceptual
  or API syntax questions.

* **4. Discover Schematics:** To discover available package migrations, use a shell command
  (if available) with 'ng generate <package-name>: --help' (e.g., 'ng generate @angular/core: --help').
</Core Workflows & Tool Guide>

<Key Concepts>
* **Workspace vs. Project:** A 'workspace' contains an 'angular.json' file and defines
  'projects' (applications or libraries). A monorepo can contain multiple workspaces.

* **Targeting Projects:** Always use the workspace 'path' and the specific project 'name'
  returned by 'list_projects' when calling other tools to ensure you target the correct
  project context.
</Key Concepts>
`,
    });
    (0, instructions_1.registerInstructionsResource)(server);
    const toolDeclarations = assembleToolDeclarations(STABLE_TOOLS, exports.EXPERIMENTAL_TOOLS, {
        ...options,
        logger,
    });
    const restrictedHost = (0, host_1.createRootRestrictedHost)(host_1.LocalWorkspaceHost);
    server.server.oninitialized = () => {
        void (async () => {
            try {
                const clientCapabilities = server.server.getClientCapabilities();
                if (clientCapabilities?.roots) {
                    const { roots } = await server.server.listRoots();
                    const searchRoots = roots?.map((r) => (0, node_path_1.normalize)((0, node_url_1.fileURLToPath)(r.uri))) ?? [];
                    restrictedHost.setRoots(searchRoots);
                    if (clientCapabilities.roots.listChanged) {
                        server.server.setNotificationHandler(types_js_1.RootsListChangedNotificationSchema, async () => {
                            try {
                                const { roots: updatedRoots } = await server.server.listRoots();
                                const updatedSearchRoots = updatedRoots?.map((r) => (0, node_path_1.normalize)((0, node_url_1.fileURLToPath)(r.uri))) ?? [];
                                restrictedHost.setRoots(updatedSearchRoots);
                            }
                            catch (e) {
                                logger.warn(`Failed to update roots on notification: ${e instanceof Error ? e.message : e}`);
                            }
                        });
                    }
                }
            }
            catch (e) {
                logger.warn(`Failed to initialize roots on connection: ${e instanceof Error ? e.message : e}`);
            }
        })();
    };
    await (0, tool_registry_1.registerTools)(server, {
        workspace: options.workspace,
        logger,
        exampleDatabasePath: (0, node_path_1.join)(__dirname, '../../../lib/code-examples.db'),
        devservers: new Map(),
        host: restrictedHost,
    }, toolDeclarations);
    return server;
}
function assembleToolDeclarations(stableDeclarations, experimentalDeclarations, options) {
    let toolDeclarations = [...stableDeclarations];
    if (options.readOnly) {
        toolDeclarations = toolDeclarations.filter((tool) => tool.isReadOnly);
    }
    if (options.localOnly) {
        toolDeclarations = toolDeclarations.filter((tool) => tool.isLocalOnly);
    }
    const enabledExperimentalTools = new Set(options.experimentalTools);
    for (const [toolGroupName, toolGroup] of Object.entries(exports.EXPERIMENTAL_TOOL_GROUPS)) {
        if (enabledExperimentalTools.delete(toolGroupName)) {
            for (const tool of toolGroup) {
                enabledExperimentalTools.add(tool.name);
            }
        }
    }
    if (enabledExperimentalTools.size > 0) {
        const experimentalToolsMap = new Map(experimentalDeclarations.map((tool) => [tool.name, tool]));
        for (const toolName of enabledExperimentalTools) {
            const tool = experimentalToolsMap.get(toolName);
            if (tool) {
                toolDeclarations.push(tool);
            }
            else if (!stableDeclarations.some((t) => t.name === toolName)) {
                options.logger.warn(`Unknown experimental tool: ${toolName}`);
            }
        }
    }
    return toolDeclarations;
}
//# sourceMappingURL=mcp-server.js.map