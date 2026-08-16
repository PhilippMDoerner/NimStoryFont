"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteForBazel = rewriteForBazel;
const node_path_1 = require("node:path");
const bazelBinDirectory = process.env['BAZEL_BINDIR'];
const bazelExecRoot = process.env['JS_BINARY__EXECROOT'];
const execRootMarker = `${node_path_1.sep}execroot${node_path_1.sep}`;
/**
 * Sandboxed actions run in a copy of the execroot whose absolute path differs from
 * `JS_BINARY__EXECROOT`, so the effective execroot is derived from the working directory.
 */
function effectiveExecRoot() {
    const cwd = process.cwd();
    const markerIndex = cwd.indexOf(execRootMarker);
    if (markerIndex === -1) {
        return bazelExecRoot;
    }
    const workspaceEnd = cwd.indexOf(node_path_1.sep, markerIndex + execRootMarker.length);
    return workspaceEnd === -1 ? cwd : cwd.slice(0, workspaceEnd);
}
function rewriteForBazel(path) {
    if (!bazelBinDirectory || !bazelExecRoot) {
        return path;
    }
    const execRoot = effectiveExecRoot() ?? bazelExecRoot;
    const fromExecRoot = (0, node_path_1.relative)(execRoot, path);
    if (!fromExecRoot.startsWith('..')) {
        return path;
    }
    const fromBinDirectory = (0, node_path_1.relative)(bazelBinDirectory, path);
    if (!fromBinDirectory.startsWith('..')) {
        return (0, node_path_1.join)(execRoot, fromBinDirectory);
    }
    // A path that realpath resolved out of a symlink-staged sandbox into the
    // unsandboxed execroot: re-anchor its execroot-relative tail.
    const markerIndex = path.indexOf(execRootMarker);
    if (markerIndex !== -1) {
        const tail = path.slice(markerIndex + execRootMarker.length);
        const workspaceEnd = tail.indexOf(node_path_1.sep);
        if (workspaceEnd !== -1) {
            return (0, node_path_1.join)(execRoot, tail.slice(workspaceEnd + 1));
        }
    }
    return path;
}
//# sourceMappingURL=rewrite-bazel-paths.js.map