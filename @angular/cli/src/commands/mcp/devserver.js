"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDevserver = void 0;
exports.getDevserverKey = getDevserverKey;
exports.createDevServerNotFoundError = createDevServerNotFoundError;
const host_1 = require("./host");
// Log messages that we want to catch to identify the build status.
const BUILD_SUCCEEDED_MESSAGE = 'Application bundle generation complete.';
const BUILD_FAILED_MESSAGE = 'Application bundle generation failed.';
const WAITING_FOR_CHANGES_MESSAGE = 'Watch mode enabled. Watching for file changes...';
const CHANGES_DETECTED_START_MESSAGE = '❯ Changes detected. Rebuilding...';
const CHANGES_DETECTED_SUCCESS_MESSAGE = '✔ Changes detected. Rebuilding...';
const BUILD_START_MESSAGES = [CHANGES_DETECTED_START_MESSAGE];
const BUILD_END_MESSAGES = [
    BUILD_SUCCEEDED_MESSAGE,
    BUILD_FAILED_MESSAGE,
    WAITING_FOR_CHANGES_MESSAGE,
    CHANGES_DETECTED_SUCCESS_MESSAGE,
];
/**
 * A local Angular development server managed by the MCP server.
 */
class LocalDevserver {
    host;
    port;
    workspacePath;
    project;
    devserverProcess = null;
    serverLogs = [];
    buildInProgress = false;
    latestBuildLogStartIndex = undefined;
    latestBuildStatus = 'unknown';
    constructor({ host, port, workspacePath, project, }) {
        this.host = host;
        this.port = port;
        this.workspacePath = workspacePath;
        this.project = project;
    }
    start() {
        if (this.devserverProcess) {
            throw Error('Dev server already started.');
        }
        const args = ['serve'];
        if (this.project) {
            args.push(this.project);
        }
        args.push(`--port=${this.port}`);
        this.devserverProcess = this.host.startNgProcess(args, {
            stdio: 'pipe',
            cwd: this.workspacePath,
        });
        (0, host_1.processStreamLines)(this.devserverProcess.stdout, (line) => this.addLog(line));
        (0, host_1.processStreamLines)(this.devserverProcess.stderr, (line) => this.addLog(line));
        this.devserverProcess.on('close', () => {
            this.stop();
        });
        this.buildInProgress = true;
    }
    addLog(log) {
        this.serverLogs.push(log);
        if (BUILD_START_MESSAGES.some((message) => log.startsWith(message))) {
            this.buildInProgress = true;
            this.latestBuildLogStartIndex = this.serverLogs.length - 1;
        }
        else if (BUILD_END_MESSAGES.some((message) => log.startsWith(message))) {
            this.buildInProgress = false;
            // We consider everything except a specific failure message to be a success.
            this.latestBuildStatus = log.startsWith(BUILD_FAILED_MESSAGE) ? 'failure' : 'success';
        }
    }
    stop() {
        this.devserverProcess?.kill();
        this.devserverProcess = null;
    }
    getServerLogs() {
        return [...this.serverLogs];
    }
    getMostRecentBuild() {
        return {
            status: this.latestBuildStatus,
            logs: this.serverLogs.slice(this.latestBuildLogStartIndex),
        };
    }
    isBuilding() {
        return this.buildInProgress;
    }
}
exports.LocalDevserver = LocalDevserver;
function getDevserverKey(workspacePath, projectName) {
    return `${workspacePath}:${projectName}`;
}
function createDevServerNotFoundError(devservers) {
    if (devservers.size === 0) {
        return new Error('No development servers are currently running.');
    }
    const runningServers = Array.from(devservers.values())
        .map((server) => `- Project '${server.project}' in workspace path '${server.workspacePath}'`)
        .join('\n');
    return new Error(`Dev server not found. Currently running servers:\n${runningServers}\n` +
        'Please provide the correct workspace and project arguments.');
}
//# sourceMappingURL=devserver.js.map