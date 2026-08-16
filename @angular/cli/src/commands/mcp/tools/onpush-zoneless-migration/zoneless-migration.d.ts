/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol';
import type { ServerNotification, ServerRequest } from '@modelcontextprotocol/sdk/types';
import { z } from 'zod';
import type { Host } from '../../host';
export declare const ZONELESS_MIGRATION_TOOL: import("../tool-registry").McpToolDeclaration<{
    fileOrDirPath: z.ZodString;
}, Readonly<{
    [k: string]: z.core.$ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>;
}>>;
export declare function registerZonelessMigrationTool(fileOrDirPath: string, host: Host, extras: RequestHandlerExtra<ServerRequest, ServerNotification>): Promise<import("./types").MigrationResponse>;
