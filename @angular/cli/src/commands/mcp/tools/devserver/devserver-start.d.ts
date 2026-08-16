/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { z } from 'zod';
import { type McpToolContext, type McpToolDeclaration } from '../tool-registry';
declare const devserverStartToolInputSchema: z.ZodObject<{
    port: z.ZodOptional<z.ZodNumber>;
    workspace: z.ZodOptional<z.ZodString>;
    project: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type DevserverStartToolInput = z.infer<typeof devserverStartToolInputSchema>;
declare const devserverStartToolOutputSchema: z.ZodObject<{
    message: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type DevserverStartToolOutput = z.infer<typeof devserverStartToolOutputSchema>;
export declare function startDevserver(input: DevserverStartToolInput, context: McpToolContext): Promise<{
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent: {
        message: string;
        address: string;
    };
}>;
export declare const DEVSERVER_START_TOOL: McpToolDeclaration<typeof devserverStartToolInputSchema.shape, typeof devserverStartToolOutputSchema.shape>;
export {};
