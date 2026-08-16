/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * Allows disabling of code mangling when the `NG_BUILD_MANGLE` environment variable is set to `0` or `false`.
 * This is useful for debugging build output.
 */
export declare const allowMangle: boolean;
/**
 * Allows beautification of build output when the `NG_BUILD_DEBUG_OPTIMIZE` environment variable is enabled.
 * This is useful for debugging build output.
 */
export declare const shouldBeautify: boolean;
/**
 * Allows disabling of code minification when the `NG_BUILD_DEBUG_OPTIMIZE` environment variable is enabled.
 * This is useful for debugging build output.
 */
export declare const allowMinify: boolean;
/**
 * Allows using Rolldown for chunk optimization instead of Rollup.
 * This is useful for debugging and testing scenarios.
 */
export declare const useRolldownChunks: boolean;
/**
 * The maximum number of workers to use for parallel processing.
 * This can be controlled by the `NG_BUILD_MAX_WORKERS` environment variable.
 */
export declare const maxWorkers: number;
/**
 * When `NG_BUILD_PARALLEL_TS` is set to `0` or `false`, parallel TypeScript compilation is disabled.
 */
export declare const useParallelTs: boolean;
/**
 * When `NG_BUILD_DEBUG_PERF` is enabled, performance debugging information is printed.
 */
export declare const debugPerformance: boolean;
/**
 * When `NG_BUILD_WATCH_ROOT` is enabled, the build will watch the root directory for changes.
 */
export declare const shouldWatchRoot: boolean;
/**
 * When `NG_BUILD_TYPE_CHECK` is set to `0` or `false`, type checking is disabled.
 */
export declare const useTypeChecking: boolean;
/**
 * When `NG_BUILD_LOGS_JSON` is enabled, build logs will be output in JSON format.
 */
export declare const useJSONBuildLogs: boolean;
export declare const optimizeChunksThreshold: number;
/**
 * When `NG_HMR_CSTYLES` is enabled, component styles will be hot-reloaded.
 */
export declare const useComponentStyleHmr: boolean;
/**
 * When `NG_HMR_TEMPLATES` is set to `0` or `false`, component templates will not be hot-reloaded.
 */
export declare const useComponentTemplateHmr: boolean;
/**
 * When `NG_BUILD_PARTIAL_SSR` is enabled, a partial server-side rendering build will be performed.
 */
export declare const usePartialSsrBuild: boolean;
export declare const bazelEsbuildPluginPath: string | undefined;
/**
 * The persistent cache store configuration to use.
 * Managed by the `NG_BUILD_CACHE_STORE` environment variable.
 * - 'lmdb': Forces the use of LMDB.
 * - 'sqlite': Forces the use of SQLite.
 * - undefined / 'auto' / other: Automatically uses LMDB and falls back to SQLite.
 */
export declare const persistentCacheStoreSetting: string | undefined;
