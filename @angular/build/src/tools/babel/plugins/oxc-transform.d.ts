/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export interface OxcTransformOptions {
    sourcemap?: boolean;
    jit?: boolean;
    sideEffects?: boolean;
    topLevelSafeMode?: boolean;
    pureAnnotate?: boolean;
}
/**
 * Executes a single-pass optimized transformation using oxc-parser and magic-string.
 * Performs typescript enum wrapping, static class members elision/wrapping, angular metadata elision,
 * and top-level pure function annotations.
 *
 * @param filename The absolute path of the file being transformed.
 * @param code The string source content of the file.
 * @param options Configuration options specifying which optimization steps to run.
 * @returns The transformed code string and an optional source map.
 */
export declare function transform(filename: string, code: string, options: OxcTransformOptions): {
    code: string;
    map: string | undefined;
};
