/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Stats } from 'node:fs';
/**
 * An abstraction layer for side-effectful operations.
 */
export interface Host {
    /**
     * Whether shell quoting is required for package manager specifiers.
     * This is typically true on Windows, where commands are executed in a shell.
     */
    readonly requiresQuoting?: boolean;
    /**
     * Creates a directory.
     * @param path The path to the directory.
     * @param options Options for the directory creation.
     * @returns A promise that resolves when the directory is created.
     */
    mkdir(path: string, options?: {
        recursive?: boolean;
    }): Promise<string | undefined>;
    /**
     * Gets the stats of a file or directory.
     * @param path The path to the file or directory.
     * @returns A promise that resolves to the stats.
     */
    stat(path: string): Promise<Stats>;
    /**
     * Reads the content of a file.
     * @param path The path to the file.
     * @returns A promise that resolves to the file content as a string.
     */
    readFile(path: string): Promise<string>;
    /**
     * Copies a file from the source path to the destination path.
     * @param src The path to the source file.
     * @param dest The path to the destination file.
     * @returns A promise that resolves when the copy is complete.
     */
    copyFile(src: string, dest: string): Promise<void>;
    /**
     * Creates a new, unique temporary directory.
     * @param baseDir The base directory in which to create the temporary directory.
     * @returns A promise that resolves to the absolute path of the created directory.
     */
    createTempDirectory(baseDir?: string): Promise<string>;
    /**
     * Deletes a directory recursively.
     * @param path The path to the directory to delete.
     * @returns A promise that resolves when the deletion is complete.
     */
    deleteDirectory(path: string): Promise<void>;
    /**
     * Writes content to a file.
     * @param path The path to the file.
     * @param content The content to write.
     * @returns A promise that resolves when the write is complete.
     */
    writeFile(path: string, content: string): Promise<void>;
    /**
     * Spawns a child process and returns a promise that resolves with the process's
     * output or rejects with a structured error.
     * @param command The command to run.
     * @param args The arguments to pass to the command.
     * @param options Options for the child process.
     * @returns A promise that resolves with the standard output and standard error of the command.
     */
    runCommand(command: string, args: readonly string[], options?: {
        timeout?: number;
        stdio?: 'pipe' | 'ignore';
        cwd?: string;
        env?: Record<string, string>;
    }): Promise<{
        stdout: string;
        stderr: string;
    }>;
}
/**
 * A concrete implementation of the `Host` interface that uses the Node.js APIs.
 */
export declare const NodeJS_HOST: Host;
