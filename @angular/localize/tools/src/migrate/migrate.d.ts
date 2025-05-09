/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/** Mapping between legacy message IDs and their canonical counterparts. */
export type MigrationMapping = {
    [legacyId: string]: string;
};
/** Migrates the legacy message IDs within a single file. */
export declare function migrateFile(sourceCode: string, mapping: MigrationMapping): string;
