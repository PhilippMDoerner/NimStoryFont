/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { DepOptimizationConfig } from 'vite' with {
    'resolution-mode': 'import'
};
import type { ExternalResultMetadata } from '../esbuild/bundler-execution-result';
import { JavaScriptTransformer } from '../esbuild/javascript-transformer';
export type AngularMemoryOutputFiles = Map<string, {
    contents: Uint8Array;
    hash: string;
    servable: boolean;
}>;
export type AngularOutputAssets = Map<string, {
    source: string;
}>;
export declare function pathnameWithoutBasePath(url: string, basePath: string): string;
export declare function lookupMimeTypeFromRequest(url: string): string | undefined;
export type RolldownLoaderOption = Exclude<DepOptimizationConfig['rolldownOptions'], undefined>['moduleTypes'];
export declare function getDepOptimizationConfig({ disabled, exclude, include, prebundleTransformer, loader, thirdPartySourcemaps, define, }: {
    disabled: boolean;
    exclude: string[];
    include: string[];
    prebundleTransformer: JavaScriptTransformer;
    loader?: RolldownLoaderOption;
    thirdPartySourcemaps: boolean;
    define: Record<string, string> | undefined;
}): DepOptimizationConfig;
export interface DevServerExternalResultMetadata {
    implicitBrowser: string[];
    implicitServer: string[];
    explicitBrowser: string[];
    explicitServer: string[];
}
export declare function isAbsoluteUrl(url: string): boolean;
export declare function updateExternalMetadata(result: {
    detail?: {
        externalMetadata?: ExternalResultMetadata;
    };
}, externalMetadata: DevServerExternalResultMetadata, externalDependencies: string[] | undefined, explicitPackagesOnly?: boolean): void;
