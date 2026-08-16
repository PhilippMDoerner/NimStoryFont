/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { BuilderContext } from '@angular-devkit/architect';
import type { Plugin } from 'esbuild';
import type * as Vite from 'vite' with {
    'resolution-mode': 'import'
};
import { Result } from '../../application/results';
import { type ApplicationBuilderInternalOptions } from '../internal';
import type { NormalizedDevServerOptions } from '../options';
import type { DevServerBuilderOutput } from '../output';
export type BuilderAction = (options: ApplicationBuilderInternalOptions, context: BuilderContext, plugins?: Plugin[]) => AsyncIterable<Result>;
export declare function serveWithVite(serverOptions: NormalizedDevServerOptions, builderName: string, builderAction: BuilderAction, context: BuilderContext, transformers?: {
    indexHtml?: (content: string) => Promise<string>;
}, extensions?: {
    middleware?: Vite.Connect.NextHandleFunction[];
    buildPlugins?: Plugin[];
}): AsyncIterableIterator<DevServerBuilderOutput>;
