/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { type Host } from './host';
export type BuildStatus = 'success' | 'failure' | 'unknown';
/**
 * An Angular development server managed by the MCP server.
 */
export interface Devserver {
    /**
     * Launches the dev server and returns immediately.
     *
     * Throws if this server is already running.
     */
    start(): void;
    /**
     * If the dev server is running, stops it.
     */
    stop(): void;
    /**
     * Gets all the server logs so far (stdout + stderr).
     */
    getServerLogs(): string[];
    /**
     * Gets all the server logs from the latest build.
     */
    getMostRecentBuild(): {
        status: BuildStatus;
        logs: string[];
    };
    /**
     * Whether the dev server is currently being built, or is awaiting further changes.
     */
    isBuilding(): boolean;
    /**
     * `ng serve` port to use.
     */
    port: number;
    /**
     * The workspace path for this server.
     */
    workspacePath: string;
    /**
     * The project name for this server.
     */
    project: string;
}
/**
 * A local Angular development server managed by the MCP server.
 */
export declare class LocalDevserver implements Devserver {
    readonly host: Host;
    readonly port: number;
    readonly workspacePath: string;
    readonly project: string;
    private devserverProcess;
    private serverLogs;
    private buildInProgress;
    private latestBuildLogStartIndex?;
    private latestBuildStatus;
    constructor({ host, port, workspacePath, project, }: {
        host: Host;
        port: number;
        workspacePath: string;
        project: string;
    });
    start(): void;
    private addLog;
    stop(): void;
    getServerLogs(): string[];
    getMostRecentBuild(): {
        status: BuildStatus;
        logs: string[];
    };
    isBuilding(): boolean;
}
export declare function getDevserverKey(workspacePath: string, projectName: string): string;
export declare function createDevServerNotFoundError(devservers: Map<string, {
    project: string;
    workspacePath: string;
}>): Error;
