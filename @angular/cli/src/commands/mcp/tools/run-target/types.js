"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTargetOutputSchema = exports.runTargetInputSchema = exports.optionValueSchema = void 0;
const zod_1 = require("zod");
const shared_options_1 = require("../../shared-options");
exports.optionValueSchema = zod_1.z.union([
    zod_1.z.string(),
    zod_1.z.number(),
    zod_1.z.boolean(),
    zod_1.z.array(zod_1.z.union([zod_1.z.string(), zod_1.z.number()])),
]);
exports.runTargetInputSchema = zod_1.z.object({
    ...shared_options_1.workspaceAndProjectOptions,
    target: zod_1.z
        .string()
        .describe('The project target to execute (e.g., "build", "test", "lint", "e2e", "deploy").'),
    configuration: zod_1.z
        .string()
        .optional()
        .describe('Target configuration (e.g., "development", "production").'),
    options: zod_1.z
        .record(zod_1.z.string(), exports.optionValueSchema)
        .optional()
        .describe('Optional key-value options to override the configured target options.'),
});
exports.runTargetOutputSchema = zod_1.z.object({
    status: zod_1.z.enum(['success', 'failure']).describe('Execution status.'),
    logs: zod_1.z.array(zod_1.z.string()).describe('Clean, line-buffered output logs from execution.'),
    extensions: zod_1.z
        .record(zod_1.z.string(), zod_1.z.unknown())
        .optional()
        .describe('Specialized metadata populated by specific target strategies.'),
});
//# sourceMappingURL=types.js.map