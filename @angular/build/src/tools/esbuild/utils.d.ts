/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { BuilderContext } from '@angular-devkit/architect';
import { BuildOptions, Metafile, OutputFile } from 'esbuild';
import { NormalizedApplicationBuildOptions } from '../../builders/application/options';
import { BudgetCalculatorResult } from '../../utils/bundle-calculator';
import { BuildOutputAsset, ExecutionResult } from './bundler-execution-result';
import { type BuildOutputFile, type InitialFileRecord } from './bundler-files';
export declare function logBuildStats(metafile: Metafile, outputFiles: BuildOutputFile[], initial: Map<string, InitialFileRecord>, budgetFailures: BudgetCalculatorResult[] | undefined, colors: boolean, changedFiles?: Set<string>, estimatedTransferSizes?: Map<string, number>, ssrOutputEnabled?: boolean, verbose?: boolean): string;
export declare function getChunkNameFromMetafile(metafile: Metafile, file: string): string | undefined;
export declare function calculateEstimatedTransferSizes(outputFiles: OutputFile[]): Promise<Map<string, number>>;
export declare function withSpinner<T>(text: string, action: () => T | Promise<T>): Promise<T>;
export declare function withNoProgress<T>(text: string, action: () => T | Promise<T>): Promise<T>;
/**
 * Generates a syntax feature object map for Angular applications.
 * A full set of feature names can be found here: https://esbuild.github.io/api/#supported
 * @param nativeAsyncAwait Indicate whether to support native async/await.
 * @returns An object that can be used with the esbuild build `supported` option.
 */
export declare function getFeatureSupport(nativeAsyncAwait: boolean): BuildOptions['supported'];
export declare function emitFilesToDisk<T = BuildOutputAsset | BuildOutputFile>(files: T[], writeFileCallback: (file: T) => Promise<void>): Promise<void>;
/**
 * Transform browserlists result to esbuild target.
 * @see https://esbuild.github.io/api/#target
 */
export declare function transformSupportedBrowsersToTargets(supportedBrowsers: string[]): string[];
/**
 * Transform supported Node.js versions to esbuild target.
 * @see https://esbuild.github.io/api/#target
 */
export declare function getSupportedNodeTargets(): string[];
export declare function createJsonBuildManifest(result: ExecutionResult, normalizedOptions: NormalizedApplicationBuildOptions): Promise<string>;
export declare function logMessages(logger: BuilderContext['logger'], executionResult: ExecutionResult, color?: boolean, jsonLogs?: boolean): Promise<void>;
/**
 * Ascertain whether the application operates without `zone.js`, we currently rely on the polyfills setting to determine its status.
 * If a file with an extension is provided or if `zone.js` is included in the polyfills, the application is deemed as not zoneless.
 * @param polyfills An array of polyfills
 * @returns true, when the application is considered as zoneless.
 */
export declare function isZonelessApp(polyfills: string[] | undefined): boolean;
export declare function getEntryPointName(entryPoint: string): string;
