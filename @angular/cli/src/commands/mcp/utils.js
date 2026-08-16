"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStructuredContentOutput = createStructuredContentOutput;
exports.getCommandErrorLogs = getCommandErrorLogs;
/**
 * @fileoverview
 * Utility functions shared across MCP tools.
 */
const host_1 = require("./host");
/**
 * Returns simple structured content output from an MCP tool.
 *
 * @returns A structure with both `content` and `structuredContent` for maximum compatibility.
 */
function createStructuredContentOutput(structuredContent) {
    return {
        content: [{ type: 'text', text: JSON.stringify(structuredContent, null, 2) }],
        structuredContent,
    };
}
/**
 * Get the logs of a failing command.
 *
 * This call has fallbacks in case the exception was thrown from the command-calling code itself.
 */
function getCommandErrorLogs(e) {
    if (e instanceof host_1.CommandError) {
        return [...e.logs, e.message];
    }
    else if (e instanceof Error) {
        return [e.message];
    }
    else {
        return [String(e)];
    }
}
//# sourceMappingURL=utils.js.map