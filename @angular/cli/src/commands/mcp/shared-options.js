"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceAndProjectOptions = void 0;
const zod_1 = require("zod");
exports.workspaceAndProjectOptions = {
    workspace: zod_1.z
        .string()
        .optional()
        .describe('The path to the workspace directory (containing angular.json). If not provided, uses the current directory.'),
    project: zod_1.z
        .string()
        .optional()
        .describe('Which project to target in a monorepo context. If not provided, targets the default project.'),
};
//# sourceMappingURL=shared-options.js.map