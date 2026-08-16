/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { type McpToolContext } from '../tool-registry';
import { type RunTargetInput } from './types';
export declare function runTarget(input: RunTargetInput, context: McpToolContext): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent: {
        status: "success" | "failure";
        logs: string[];
        extensions?: Record<string, unknown> | undefined;
    };
}>;
export declare const RUN_TARGET_TOOL: import("../tool-registry").McpToolDeclaration<{
    target: import("zod").ZodString;
    configuration: import("zod").ZodOptional<import("zod").ZodString>;
    options: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnion<readonly [import("zod").ZodString, import("zod").ZodNumber, import("zod").ZodBoolean, import("zod").ZodArray<import("zod").ZodUnion<readonly [import("zod").ZodString, import("zod").ZodNumber]>>]>>>;
    workspace: import("zod").ZodOptional<import("zod").ZodString>;
    project: import("zod").ZodOptional<import("zod").ZodString>;
}, {
    status: import("zod").ZodEnum<{
        success: "success";
        failure: "failure";
    }>;
    logs: import("zod").ZodArray<import("zod").ZodString>;
    extensions: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
}>;
