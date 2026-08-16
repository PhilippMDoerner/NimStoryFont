/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { z } from 'zod';
export declare const optionValueSchema: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>]>;
export type OptionValue = z.infer<typeof optionValueSchema>;
export declare const runTargetInputSchema: z.ZodObject<{
    target: z.ZodString;
    configuration: z.ZodOptional<z.ZodString>;
    options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>]>>>;
    workspace: z.ZodOptional<z.ZodString>;
    project: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RunTargetInput = z.infer<typeof runTargetInputSchema>;
export declare const runTargetOutputSchema: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        failure: "failure";
    }>;
    logs: z.ZodArray<z.ZodString>;
    extensions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export type RunTargetOutput = z.infer<typeof runTargetOutputSchema>;
export interface StrategyExecutionContext {
    workspacePath: string;
    projectName: string;
    targetName: string;
    targetDefinition?: {
        builder: string;
        options?: Record<string, unknown>;
        configurations?: Record<string, Record<string, unknown> | undefined>;
    };
    configuration?: string;
    options?: Record<string, OptionValue>;
}
