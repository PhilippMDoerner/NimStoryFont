/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol';
import type { ServerNotification, ServerRequest } from '@modelcontextprotocol/sdk/types';
import type { SourceFile } from 'typescript';
import type { Host } from '../../host';
import type { MigrationResponse } from './types';
export declare function migrateSingleFile(sourceFile: SourceFile, host: Host, extras: RequestHandlerExtra<ServerRequest, ServerNotification>): Promise<MigrationResponse | null>;
