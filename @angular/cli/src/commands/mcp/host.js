"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalWorkspaceHost = exports.CommandError = void 0;
exports.createRootRestrictedHost = createRootRestrictedHost;
exports.processStreamLines = processStreamLines;
/**
 * @fileoverview
 * This file defines an abstraction layer for operating-system or file-system operations, such as
 * command execution. This allows for easier testing by enabling the injection of mock or
 * test-specific implementations.
 */
const fs_1 = require("fs");
const node_child_process_1 = require("node:child_process");
const node_fs_1 = require("node:fs");
const promises_1 = require("node:fs/promises");
const node_module_1 = require("node:module");
const node_net_1 = require("node:net");
const node_path_1 = require("node:path");
const node_readline_1 = require("node:readline");
const node_util_1 = require("node:util");
/**
 * An error thrown when a command fails to execute.
 */
class CommandError extends Error {
    logs;
    code;
    constructor(message, logs, code) {
        super(message);
        this.logs = logs;
        this.code = code;
    }
}
exports.CommandError = CommandError;
function resolveNgCommand(args, cwd) {
    const defaultCommand = { command: 'ng', args };
    if (!cwd) {
        return defaultCommand;
    }
    try {
        const workspaceRequire = (0, node_module_1.createRequire)((0, node_path_1.join)(cwd, 'package.json'));
        const pkgJsonPath = workspaceRequire.resolve('@angular/cli/package.json');
        const pkgJson = workspaceRequire(pkgJsonPath);
        const binPath = typeof pkgJson.bin === 'string' ? pkgJson.bin : pkgJson.bin?.['ng'];
        if (binPath) {
            const ngJsPath = (0, node_path_1.resolve)((0, node_path_1.dirname)(pkgJsonPath), binPath);
            return {
                command: process.execPath,
                args: [ngJsPath, ...args],
            };
        }
    }
    catch {
        // Failed to resolve the CLI binary, fall back to assuming `ng` is on PATH.
    }
    return defaultCommand;
}
/**
 * A concrete implementation of the `Host` interface that runs on a local workspace.
 */
exports.LocalWorkspaceHost = {
    stat: promises_1.stat,
    existsSync: fs_1.existsSync,
    readFile: promises_1.readFile,
    glob: function (pattern, options) {
        return (0, promises_1.glob)(pattern, { ...options, withFileTypes: true });
    },
    executeNgCommand: async (args, options = {}) => {
        const resolved = resolveNgCommand(args, options.cwd);
        const signal = options.timeout ? AbortSignal.timeout(options.timeout) : undefined;
        return new Promise((resolve, reject) => {
            const childProcess = (0, node_child_process_1.spawn)(resolved.command, resolved.args, {
                shell: false,
                stdio: options.stdio ?? 'pipe',
                signal,
                cwd: options.cwd,
                env: {
                    ...process.env,
                    ...options.env,
                },
            });
            const logs = [];
            processStreamLines(childProcess.stdout, (line) => logs.push(line));
            processStreamLines(childProcess.stderr, (line) => logs.push(line));
            childProcess.on('close', (code) => {
                if (code === 0) {
                    resolve({ logs });
                }
                else {
                    const message = `Process exited with code ${code}.`;
                    reject(new CommandError(message, logs, code));
                }
            });
            childProcess.on('error', (err) => {
                if (err.name === 'AbortError') {
                    const message = `Process timed out.`;
                    reject(new CommandError(message, logs, null));
                    return;
                }
                const message = `Process failed with error: ${err.message}`;
                reject(new CommandError(message, logs, null));
            });
        });
    },
    startNgProcess(args, options = {}) {
        const resolved = resolveNgCommand(args, options.cwd);
        return (0, node_child_process_1.spawn)(resolved.command, resolved.args, {
            shell: false,
            stdio: options.stdio ?? 'pipe',
            cwd: options.cwd,
            env: {
                ...process.env,
                ...options.env,
            },
        });
    },
    getAvailablePort() {
        return new Promise((resolve, reject) => {
            // Create a new temporary server from Node's net library.
            const server = (0, node_net_1.createServer)();
            server.once('error', (err) => {
                reject(err);
            });
            // Listen on port 0 to let the OS assign an available port.
            server.listen(0, () => {
                const address = server.address();
                // Ensure address is an object with a port property.
                if (address && typeof address === 'object') {
                    const port = address.port;
                    server.close();
                    resolve(port);
                }
                else {
                    reject(new Error('Unable to retrieve address information from server.'));
                }
            });
        });
    },
    isPortAvailable(port) {
        return new Promise((resolve) => {
            const server = (0, node_net_1.createServer)();
            server.once('error', () => resolve(false));
            server.listen(port, () => {
                server.close(() => {
                    resolve(true);
                });
            });
        });
    },
    setRoots(roots) {
        // LocalWorkspaceHost does not enforce roots, so this is a no-op.
    },
};
function createRootRestrictedHost(baseHost, initialRoots = [process.cwd()]) {
    let roots = initialRoots;
    function checkPath(path) {
        const resolvedPath = (0, node_path_1.resolve)(path);
        let realPath;
        try {
            realPath = (0, node_fs_1.realpathSync)(resolvedPath);
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                // Path does not exist. Find the first existing ancestor.
                let current = resolvedPath;
                while (current) {
                    try {
                        realPath = (0, node_fs_1.realpathSync)(current);
                        break;
                    }
                    catch (err) {
                        if (err.code !== 'ENOENT') {
                            throw err;
                        }
                        const parent = (0, node_path_1.dirname)(current);
                        if (parent === current) {
                            // Reached filesystem root
                            throw err;
                        }
                        current = parent;
                    }
                }
            }
            else {
                throw e;
            }
        }
        const isAllowed = roots.some((root) => {
            const rel = (0, node_path_1.relative)(root, realPath);
            return !rel.startsWith('..') && !(0, node_path_1.isAbsolute)(rel);
        });
        if (!isAllowed) {
            throw new Error(`Access denied: path '${path}' is outside allowed roots.`);
        }
    }
    return {
        ...baseHost,
        setRoots(newRoots) {
            roots = newRoots;
        },
        stat(path) {
            checkPath(path);
            return baseHost.stat(path);
        },
        existsSync(path) {
            checkPath(path);
            return baseHost.existsSync(path);
        },
        readFile(path, encoding) {
            checkPath(path);
            return baseHost.readFile(path, encoding);
        },
        glob(pattern, options) {
            if (pattern.includes('..')) {
                throw new Error(`Access denied: glob pattern '${pattern}' contains path traversal sequences.`);
            }
            checkPath(options.cwd);
            const firstWildcardIndex = pattern.search(/[*?[{]/);
            const basePath = firstWildcardIndex >= 0 ? pattern.substring(0, firstWildcardIndex) : pattern;
            const targetDir = (0, node_path_1.resolve)(options.cwd, basePath);
            checkPath(targetDir);
            return baseHost.glob(pattern, options);
        },
        executeNgCommand(args, options = {}) {
            const effectiveCwd = options?.cwd ?? process.cwd();
            checkPath(effectiveCwd);
            return baseHost.executeNgCommand(args, options);
        },
        startNgProcess(args, options = {}) {
            const effectiveCwd = options?.cwd ?? process.cwd();
            checkPath(effectiveCwd);
            return baseHost.startNgProcess(args, options);
        },
    };
}
/**
 * Binds a readline interface to the given stream to process each line.
 * Sanitizes lines by removing VT/ANSI control characters, trimming trailing whitespace,
 * and preserving leading indentation.
 */
function processStreamLines(stream, lineCallback) {
    if (!stream) {
        return;
    }
    const rl = (0, node_readline_1.createInterface)({ input: stream, terminal: false });
    rl.on('line', (line) => {
        const cleanLine = (0, node_util_1.stripVTControlCharacters)(line).trimEnd();
        if (cleanLine.length > 0) {
            lineCallback(cleanLine);
        }
    });
}
//# sourceMappingURL=host.js.map