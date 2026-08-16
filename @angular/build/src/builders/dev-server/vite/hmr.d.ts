/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { BuilderContext } from '@angular-devkit/architect';
import type { ViteDevServer } from 'vite' with {
    'resolution-mode': 'import'
};
import type { ComponentStyleRecord } from '../../../tools/vite/middlewares';
import type { NormalizedDevServerOptions } from '../options';
import type { OutputAssetRecord, OutputFileRecord } from './utils';
/**
 * Invalidates any updated asset or generated files and resets their `updated` state.
 * This function also clears the server application cache when necessary.
 *
 * @returns A list of files that were updated and invalidated.
 */
export declare function invalidateUpdatedFiles(normalizePath: (id: string) => string, generatedFiles: Map<string, OutputFileRecord>, assetFiles: Map<string, OutputAssetRecord>, server: ViteDevServer): Promise<string[]>;
/**
 * Handles updates for the client by sending HMR or full page reload commands
 * based on the updated files. It also ensures proper tracking of component styles and determines if
 * a full reload is needed.
 */
export declare function handleUpdate(server: ViteDevServer, serverOptions: NormalizedDevServerOptions, logger: BuilderContext['logger'], componentStyles: Map<string, ComponentStyleRecord>, updatedFiles: string[]): void;
