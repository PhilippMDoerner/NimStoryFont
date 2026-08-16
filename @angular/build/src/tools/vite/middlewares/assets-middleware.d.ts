/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { Connect, ViteDevServer } from 'vite' with {
    'resolution-mode': 'import'
};
import { ResultFile } from '../../../builders/application/results';
import { AngularMemoryOutputFiles, AngularOutputAssets } from '../utils';
export interface ComponentStyleRecord {
    rawContent: Uint8Array;
    used?: Set<string>;
    reload?: boolean;
}
export declare function createAngularAssetsMiddleware(server: ViteDevServer, assets: AngularOutputAssets, outputFiles: AngularMemoryOutputFiles, componentStyles: Map<string, ComponentStyleRecord>, encapsulateStyle: (style: Uint8Array, componentId: string) => string): Connect.NextHandleFunction;
export declare function createBuildAssetsMiddleware(basePath: string, buildResultFiles: ReadonlyMap<string, ResultFile>, readHandler?: (path: string) => Buffer): Connect.NextHandleFunction;
