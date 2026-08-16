/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { AngularCompilationContext } from '../../tools/esbuild/angular/compilation-state';
import { ComponentStylesheetBundler } from '../../tools/esbuild/angular/component-stylesheets';
import type { SourceFileCache } from '../../tools/esbuild/angular/source-file-cache';
import { BundlerContext } from '../../tools/esbuild/bundler-context';
import type { NormalizedApplicationBuildOptions } from './options';
/**
 * Generates one or more BundlerContext instances based on the builder provided
 * configuration.
 * @param options The normalized application builder options to use.
 * @param browsers An string array of browserslist browsers to support.
 * @param codeBundleCache An instance of the TypeScript source file cache.
 * @returns An array of BundlerContext objects.
 */
export declare function setupBundlerContexts(options: NormalizedApplicationBuildOptions, target: string[], codeBundleCache: SourceFileCache, stylesheetBundler: ComponentStylesheetBundler, angularCompilationContext: AngularCompilationContext, templateUpdates: Map<string, string> | undefined): {
    typescriptContexts: BundlerContext[];
    otherContexts: BundlerContext[];
};
export declare function createComponentStyleBundler(options: NormalizedApplicationBuildOptions, target: string[]): ComponentStylesheetBundler;
