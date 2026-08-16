"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEVSERVER_STOP_TOOL = void 0;
exports.stopDevserver = stopDevserver;
const zod_1 = require("zod");
const devserver_1 = require("../../devserver");
const shared_options_1 = require("../../shared-options");
const utils_1 = require("../../utils");
const workspace_utils_1 = require("../../workspace-utils");
const tool_registry_1 = require("../tool-registry");
const devserverStopToolInputSchema = zod_1.z.object({
    ...shared_options_1.workspaceAndProjectOptions,
});
const devserverStopToolOutputSchema = zod_1.z.object({
    message: zod_1.z.string().describe('A message indicating the result of the operation.'),
    logs: zod_1.z.array(zod_1.z.string()).optional().describe('The full logs from the dev server.'),
});
async function stopDevserver(input, context) {
    const { workspacePath, projectName } = await (0, workspace_utils_1.resolveWorkspaceAndProject)({
        host: context.host,
        server: context.server,
        workspacePathInput: input.workspace,
        projectNameInput: input.project,
        mcpWorkspace: context.workspace,
    });
    const key = (0, devserver_1.getDevserverKey)(workspacePath, projectName);
    const devserver = context.devservers.get(key);
    if (!devserver) {
        throw (0, devserver_1.createDevServerNotFoundError)(context.devservers);
    }
    devserver.stop();
    context.devservers.delete(key);
    return (0, utils_1.createStructuredContentOutput)({
        message: `Development server for project '${projectName}' stopped.`,
        logs: devserver.getServerLogs(),
    });
}
exports.DEVSERVER_STOP_TOOL = (0, tool_registry_1.declareTool)({
    name: 'devserver_stop',
    title: 'Stop Development Server',
    description: `
<Purpose>
Stops a running Angular development server ("ng serve") that was started with the "devserver_start" tool.
</Purpose>
<Use Cases>
* **Stopping the Server:** Use this tool to terminate a running development server and retrieve the logs.
</Use Cases>
<Operational Notes>
* This should be called to gracefully shut down the server and access the full log output.
* This just sends a SIGTERM to the server and returns immediately; so the server might still be functional for a short
  time after this is called. However note that this is not a blocker for starting a new devserver.
</Operational Notes>
`,
    isReadOnly: false,
    isLocalOnly: true,
    inputSchema: devserverStopToolInputSchema.shape,
    outputSchema: devserverStopToolOutputSchema.shape,
    factory: (context) => (input) => {
        return stopDevserver(input, context);
    },
});
//# sourceMappingURL=devserver-stop.js.map