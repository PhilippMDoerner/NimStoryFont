/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { AngularWorkspace } from '../../utilities/config';
import { type AnyMcpToolDeclaration } from './tools/tool-registry';
/**
 * The set of tools that are available but not enabled by default.
 * These tools are considered experimental and may have limitations.
 */
export declare const EXPERIMENTAL_TOOLS: readonly AnyMcpToolDeclaration[];
/**
 * Experimental tools that are grouped together under a single name.
 *
 * Used for enabling them as a group.
 */
export declare const EXPERIMENTAL_TOOL_GROUPS: Record<string, readonly AnyMcpToolDeclaration[]>;
export declare function createMcpServer(options: {
    workspace?: AngularWorkspace;
    readOnly?: boolean;
    localOnly?: boolean;
    experimentalTools?: string[];
}, logger: {
    warn(text: string): void;
}): Promise<McpServer>;
export declare function assembleToolDeclarations(stableDeclarations: readonly AnyMcpToolDeclaration[], experimentalDeclarations: readonly AnyMcpToolDeclaration[], options: {
    readOnly?: boolean;
    localOnly?: boolean;
    experimentalTools?: string[];
    logger: {
        warn(text: string): void;
    };
}): AnyMcpToolDeclaration[];
