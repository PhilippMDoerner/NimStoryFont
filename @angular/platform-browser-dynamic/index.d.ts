/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { Version, CompilerFactory, CompilerOptions, Compiler, StaticProvider, PlatformRef } from '@angular/core';

/**
 * @module
 * @description
 * Entry point for all public APIs of the platform-browser-dynamic package.
 */

/**
 * @publicApi
 */
declare const VERSION: Version;

/**
 * @publicApi
 *
 * @deprecated
 * Ivy JIT mode doesn't require accessing this symbol.
 */
declare class JitCompilerFactory implements CompilerFactory {
    private _defaultOptions;
    createCompiler(options?: CompilerOptions[]): Compiler;
}

/**
 * @deprecated Use the `platformBrowser` function instead from `@angular/platform-browser`.
 * In case you are not in a CLI app and rely on JIT compilation, you will also need to import `@angular/compiler`
 */
declare const platformBrowserDynamic: (extraProviders?: StaticProvider[]) => PlatformRef;

export { JitCompilerFactory, VERSION, platformBrowserDynamic };
