/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { SourceFile } from 'typescript';
import { type Host } from '../../host';
import { MigrationResponse } from './types';
export declare function migrateTestFile(sourceFile: SourceFile, host: Host): Promise<MigrationResponse | null>;
export declare function searchForGlobalZoneless(startPath: string, host: Host): Promise<boolean>;
