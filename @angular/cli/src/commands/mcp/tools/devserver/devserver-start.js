"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEVSERVER_START_TOOL = void 0;
exports.startDevserver = startDevserver;
const zod_1 = require("zod");
const devserver_1 = require("../../devserver");
const shared_options_1 = require("../../shared-options");
const utils_1 = require("../../utils");
const workspace_utils_1 = require("../../workspace-utils");
const tool_registry_1 = require("../tool-registry");
const devserverStartToolInputSchema = zod_1.z.object({
    ...shared_options_1.workspaceAndProjectOptions,
    port: zod_1.z
        .number()
        .optional()
        .describe('The port number to run the server on. If not provided, a random available port will be chosen. ' +
        'It is recommended to reuse port numbers across calls within the same workspace to maintain consistency.'),
});
const devserverStartToolOutputSchema = zod_1.z.object({
    message: zod_1.z.string().describe('A message indicating the result of the operation.'),
    address: zod_1.z
        .string()
        .optional()
        .describe('If the operation was successful, this is the HTTP address that the server can be found at.'),
});
function localhostAddress(port) {
    return `http://localhost:${port}/`;
}
async function startDevserver(input, context) {
    const { workspacePath, projectName } = await (0, workspace_utils_1.resolveWorkspaceAndProject)({
        host: context.host,
        server: context.server,
        workspacePathInput: input.workspace,
        projectNameInput: input.project,
        mcpWorkspace: context.workspace,
    });
    const key = (0, devserver_1.getDevserverKey)(workspacePath, projectName);
    let devserver = context.devservers.get(key);
    if (devserver) {
        return (0, utils_1.createStructuredContentOutput)({
            message: `Development server for project '${projectName}' is already running.`,
            address: localhostAddress(devserver.port),
        });
    }
    let port;
    if (input.port) {
        if (!(await context.host.isPortAvailable(input.port))) {
            throw new Error(`Port ${input.port} is unavailable. Try calling this tool again without the 'port' parameter to auto-assign a free port.`);
        }
        port = input.port;
    }
    else {
        port = await context.host.getAvailablePort();
    }
    devserver = new devserver_1.LocalDevserver({
        host: context.host,
        project: projectName,
        port,
        workspacePath,
    });
    devserver.start();
    context.devservers.set(key, devserver);
    return (0, utils_1.createStructuredContentOutput)({
        message: `Development server for project '${projectName}' started and watching for workspace changes.`,
        address: localhostAddress(port),
    });
}
exports.DEVSERVER_START_TOOL = (0, tool_registry_1.declareTool)({
    name: 'devserver_start',
    title: 'Start Development Server',
    description: `
<Purpose>
Starts the Angular development server ("ng serve") as a background process. Follow this up with "devserver_wait_for_build" to wait until
the first build completes.
</Purpose>
<Use Cases>
* **Starting the Server:** Use this tool to begin serving the application. The tool will return immediately while the server runs in the
  background.
* **Get Initial Build Logs:** Once a dev server has started, use the "devserver_wait_for_build" tool to ensure it's alive. If there are any
  build errors, "devserver_wait_for_build" would provide them back and you can give them to the user or rely on them to propose a fix.
* **Get Updated Build Logs:** Important: as long as a devserver is alive (i.e. "devserver_stop" wasn't called), after every time you
  make a change to the workspace, re-run "devserver_wait_for_build" to see whether the change was successfully built and wait for the
  devserver to be updated.
</Use Cases>
<Operational Notes>
* This tool manages development servers by itself. It maintains at most a single dev server instance for each project in the monorepo.
* This is an asynchronous operation. Subsequent commands can be ran while the server is active.
* Use 'devserver_stop' to gracefully shut down the server and access the full log output.
* **Keeping the Server Alive**: It is often better to keep the server alive between tool calls if you expect the user to request more
  changes or run more tests, as it saves time on restarts and maintains the file watcher state. You must still call
  'devserver_wait_for_build' after every change to see whether the change was successfully built and be sure that the app was updated.
* **Consistent Ports**: If making multiple calls, it is recommended to reuse the port you got from the first call for subsequent ones.
</Operational Notes>
`,
    isReadOnly: false,
    isLocalOnly: true,
    inputSchema: devserverStartToolInputSchema.shape,
    outputSchema: devserverStartToolOutputSchema.shape,
    factory: (context) => (input) => {
        return startDevserver(input, context);
    },
});
//# sourceMappingURL=devserver-start.js.map