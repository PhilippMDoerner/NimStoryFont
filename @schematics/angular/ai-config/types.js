"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextFileType = void 0;
/**
 * Types of supported AI configuration files.
 */
var ContextFileType;
(function (ContextFileType) {
    /** Represents a Markdown AI instructions file (e.g. AGENTS.md). */
    ContextFileType[ContextFileType["BestPracticesMd"] = 0] = "BestPracticesMd";
    /** Represents an MCP server configuration (e.g. Angular MCP).  */
    ContextFileType[ContextFileType["McpConfig"] = 1] = "McpConfig";
})(ContextFileType || (exports.ContextFileType = ContextFileType = {}));
//# sourceMappingURL=types.js.map