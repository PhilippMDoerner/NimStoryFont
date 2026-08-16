/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * Returns simple structured content output from an MCP tool.
 *
 * @returns A structure with both `content` and `structuredContent` for maximum compatibility.
 */
export declare function createStructuredContentOutput<OutputType>(structuredContent: OutputType): {
    content: {
        type: "text";
        text: string;
    }[];
    structuredContent: OutputType;
};
/**
 * Get the logs of a failing command.
 *
 * This call has fallbacks in case the exception was thrown from the command-calling code itself.
 */
export declare function getCommandErrorLogs(e: unknown): string[];
