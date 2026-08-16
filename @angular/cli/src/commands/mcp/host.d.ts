/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChildProcess } from 'node:child_process';
import { Stats } from 'node:fs';
/**
 * An error thrown when a command fails to execute.
 */
export declare class CommandError extends Error {
    readonly logs: string[];
    readonly code: number | null;
    constructor(message: string, logs: string[], code: number | null);
}
/**
 * An abstraction layer for operating-system or file-system operations.
 */
export interface Host {
    /**
     * Gets the stats of a file or directory.
     * @param path The path to the file or directory.
     * @returns A promise that resolves to the stats.
     */
    stat(path: string): Promise<Stats>;
    /**
     * Checks if a path exists on the file system.
     * @param path The path to check.
     * @returns A boolean indicating whether the path exists.
     */
    existsSync(path: string): boolean;
    /**
     * Reads a file and returns its content.
     * @param path The path to the file.
     * @param encoding The encoding to use.
     * @returns A promise that resolves to the file content.
     */
    readFile(path: string, encoding: BufferEncoding): Promise<string>;
    /**
     * Finds files matching a glob pattern.
     * @param pattern The glob pattern.
     * @param options Options for the glob search.
     * @returns An async iterable of file entries.
     */
    glob(pattern: string, options: {
        cwd: string;
    }): AsyncIterable<{
        name: string;
        parentPath: string;
        isFile(): boolean;
    }>;
    /**
     * Spawns a child process and returns a promise that resolves with the process's
     * output or rejects with a structured error.
     * @param args The arguments to pass to the command.
     * @param options Options for the child process.
     * @returns A promise that resolves with the standard output and standard error of the command.
     */
    executeNgCommand(args: readonly string[], options?: {
        timeout?: number;
        stdio?: 'pipe' | 'ignore';
        cwd?: string;
        env?: Record<string, string>;
    }): Promise<{
        logs: string[];
    }>;
    /**
     * Spawns a long-running child process and returns the `ChildProcess` object.
     * @param args The arguments to pass to the command.
     * @param options Options for the child process.
     * @returns The spawned `ChildProcess` instance.
     */
    startNgProcess(args: readonly string[], options?: {
        stdio?: 'pipe' | 'ignore';
        cwd?: string;
        env?: Record<string, string>;
    }): ChildProcess;
    /**
     * Finds an available TCP port on the system.
     */
    getAvailablePort(): Promise<number>;
    /**
     * Checks whether a TCP port is available on the system.
     */
    isPortAvailable(port: number): Promise<boolean>;
    /**
     * Sets the allowed roots for this host.
     */
    setRoots(roots: string[]): void;
}
/**
 * A concrete implementation of the `Host` interface that runs on a local workspace.
 */
export declare const LocalWorkspaceHost: Host;
export declare function createRootRestrictedHost(baseHost: Host, initialRoots?: string[]): Host;
/**
 * Binds a readline interface to the given stream to process each line.
 * Sanitizes lines by removing VT/ANSI control characters, trimming trailing whitespace,
 * and preserving leading indentation.
 */
export declare function processStreamLines(stream: NodeJS.ReadableStream | undefined | null, lineCallback: (line: string) => void): void;
