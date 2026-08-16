/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { z } from 'zod';
import { type McpToolContext, type McpToolDeclaration } from '../tool-registry';
/**
 * How long to wait to give "ng serve" time to identify whether the watched workspace has changed.
 */
export declare const WATCH_DELAY = 1000;
declare const devserverWaitForBuildToolInputSchema: z.ZodObject<{
    timeout: z.ZodDefault<z.ZodNumber>;
    workspace: z.ZodOptional<z.ZodString>;
    project: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type DevserverWaitForBuildToolInput = z.infer<typeof devserverWaitForBuildToolInputSchema>;
declare const devserverWaitForBuildToolOutputSchema: z.ZodObject<{
    status: z.ZodEnum<{
        success: "success";
        timeout: "timeout";
        failure: "failure";
        unknown: "unknown";
    }>;
    logs: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type DevserverWaitForBuildToolOutput = z.infer<typeof devserverWaitForBuildToolOutputSchema>;
export declare function waitForDevserverBuild(input: DevserverWaitForBuildToolInput, context: McpToolContext): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent: {
        status: "success" | "timeout" | "failure" | "unknown";
        logs?: string[] | undefined;
    };
}>;
export declare const DEVSERVER_WAIT_FOR_BUILD_TOOL: McpToolDeclaration<typeof devserverWaitForBuildToolInputSchema.shape, typeof devserverWaitForBuildToolOutputSchema.shape>;
export {};
