"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEVSERVER_WAIT_FOR_BUILD_TOOL = exports.WATCH_DELAY = void 0;
exports.waitForDevserverBuild = waitForDevserverBuild;
const zod_1 = require("zod");
const devserver_1 = require("../../devserver");
const shared_options_1 = require("../../shared-options");
const utils_1 = require("../../utils");
const workspace_utils_1 = require("../../workspace-utils");
const tool_registry_1 = require("../tool-registry");
/**
 * How long to wait to give "ng serve" time to identify whether the watched workspace has changed.
 */
exports.WATCH_DELAY = 1000;
/**
 * Default timeout for waiting for the build to complete.
 */
const DEFAULT_TIMEOUT = 180_000; // In milliseconds
const devserverWaitForBuildToolInputSchema = zod_1.z.object({
    ...shared_options_1.workspaceAndProjectOptions,
    timeout: zod_1.z
        .number()
        .default(DEFAULT_TIMEOUT)
        .describe(`The maximum time to wait for the build to complete, in milliseconds. This can't be lower than ${exports.WATCH_DELAY}.`),
});
const devserverWaitForBuildToolOutputSchema = zod_1.z.object({
    status: zod_1.z
        .enum(['success', 'failure', 'unknown', 'timeout'])
        .describe("The status of the build if it's complete, or a status indicating why the wait operation failed."),
    logs: zod_1.z
        .array(zod_1.z.string())
        .optional()
        .describe('The logs from the most recent build, if one exists.'),
});
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function waitForDevserverBuild(input, context) {
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
    return performWait(devserver, input.timeout);
}
async function performWait(devserver, timeout) {
    const deadline = Date.now() + timeout;
    await wait(exports.WATCH_DELAY);
    while (devserver.isBuilding()) {
        if (Date.now() > deadline) {
            return (0, utils_1.createStructuredContentOutput)({
                status: 'timeout',
                logs: undefined,
            });
        }
        await wait(exports.WATCH_DELAY);
    }
    return (0, utils_1.createStructuredContentOutput)({
        ...devserver.getMostRecentBuild(),
    });
}
exports.DEVSERVER_WAIT_FOR_BUILD_TOOL = (0, tool_registry_1.declareTool)({
    name: 'devserver_wait_for_build',
    title: 'Wait for Devserver Build',
    description: `
<Purpose>
Waits for a dev server that was started with the "devserver_start" tool to complete its build, then reports the build logs from its most
recent build.
</Purpose>
<Use Cases>
* **Waiting for a build:** As long as a devserver is alive ("devserver_start" was called for this project and "devserver_stop" wasn't
  called yet), then if you're making a file change and want to ensure it was successfully built, call this tool instead of any other build
  tool or command. When it retuns you'll get build logs back **and** you'll know the user's devserver is up-to-date with the latest changes.
</Use Cases>
<Operational Notes>
* This tool expects that a dev server was launched on the same project with the "devserver_start" tool, otherwise the tool will fail.
* This tool will block until the build is complete or the timeout is reached. If you expect a long build process, consider increasing the
  timeout. Timeouts on initial run (right after "devserver_start" calls) or after a big change are not necessarily indicative of an error.
* If you encountered a timeout and it might be reasonable, just call this tool again.
* If the dev server is not building, it will return quickly, with the logs from the last build.
</Operational Notes>
`,
    isReadOnly: true,
    isLocalOnly: true,
    inputSchema: devserverWaitForBuildToolInputSchema.shape,
    outputSchema: devserverWaitForBuildToolOutputSchema.shape,
    factory: (context) => (input) => {
        return waitForDevserverBuild(input, context);
    },
});
//# sourceMappingURL=devserver-wait-for-build.js.map