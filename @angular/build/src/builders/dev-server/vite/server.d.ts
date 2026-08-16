/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type * as Vite from 'vite' with {
    'resolution-mode': 'import'
};
import type { ComponentStyleRecord } from '../../../tools/vite/middlewares';
import { ServerSsrMode } from '../../../tools/vite/plugins';
import { RolldownLoaderOption } from '../../../tools/vite/utils';
import { type ApplicationBuilderInternalOptions, JavaScriptTransformer } from '../internal';
import type { NormalizedDevServerOptions } from '../options';
import { DevServerExternalResultMetadata, OutputAssetRecord, OutputFileRecord } from './utils';
export declare function setupServer(serverOptions: NormalizedDevServerOptions, outputFiles: Map<string, OutputFileRecord>, assets: Map<string, OutputAssetRecord>, preserveSymlinks: boolean | undefined, externalMetadata: DevServerExternalResultMetadata, ssrMode: ServerSsrMode, prebundleTransformer: JavaScriptTransformer, target: string[], componentStyles: Map<string, ComponentStyleRecord>, templateUpdates: Map<string, string>, prebundleLoaderExtensions: RolldownLoaderOption | undefined, define: ApplicationBuilderInternalOptions['define'], extensionMiddleware?: Vite.Connect.NextHandleFunction[], indexHtmlTransformer?: (content: string) => Promise<string>, thirdPartySourcemaps?: boolean): Promise<Vite.InlineConfig>;
