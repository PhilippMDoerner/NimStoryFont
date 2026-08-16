/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { logging } from '@angular-devkit/core';
import { SchematicDescription } from '@angular-devkit/schematics';
import { FileSystemCollectionDescription, FileSystemSchematicDescription, NodeWorkflow } from '@angular-devkit/schematics/tools';
export interface MigrationSchematicDescription extends SchematicDescription<FileSystemCollectionDescription, FileSystemSchematicDescription> {
    version?: string;
    optional?: boolean;
    recommended?: boolean;
    documentation?: string;
}
export declare function executeSchematic(workflow: NodeWorkflow, logger: logging.Logger, collection: string, schematic: string, options?: Record<string, unknown>): Promise<{
    success: boolean;
    files: Set<string>;
}>;
/**
 * @return Whether or not the migration was performed successfully.
 */
export declare function executeMigration(workflow: NodeWorkflow, logger: logging.Logger, packageName: string, collectionPath: string, migrationName: string, commit?: boolean): Promise<number>;
/**
 * @return Whether or not the migrations were performed successfully.
 */
export declare function executeMigrations(workflow: NodeWorkflow, logger: logging.Logger, packageName: string, collectionPath: string, from: string, to: string, commit?: boolean): Promise<number>;
/**
 * @return Whether or not the commit was successful.
 */
export declare function commitChanges(logger: logging.Logger, message: string): boolean;
