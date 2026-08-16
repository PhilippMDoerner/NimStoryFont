/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { z } from 'zod';
import { type McpToolContext, type McpToolDeclaration } from '../tool-registry';
declare const devserverStopToolInputSchema: z.ZodObject<{
    workspace: z.ZodOptional<z.ZodString>;
    project: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type DevserverStopToolInput = z.infer<typeof devserverStopToolInputSchema>;
declare const devserverStopToolOutputSchema: z.ZodObject<{
    message: z.ZodString;
    logs: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type DevserverStopToolOutput = z.infer<typeof devserverStopToolOutputSchema>;
export declare function stopDevserver(input: DevserverStopToolInput, context: McpToolContext): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent: {
        message: string;
        logs: string[];
    };
}>;
export declare const DEVSERVER_STOP_TOOL: McpToolDeclaration<typeof devserverStopToolInputSchema.shape, typeof devserverStopToolOutputSchema.shape>;
export {};
