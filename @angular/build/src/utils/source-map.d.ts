/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { EncodedSourceMap } from '@ampproject/remapping';
/**
 * Removes `//# sourceMappingURL=` comments safely from the given JavaScript code,
 * ignoring any occurrences that are inside string literals, template literals, or block comments.
 *
 * It uses a lightweight state-machine parser to accurately handle nested template literals.
 *
 * @param code The JavaScript source code.
 * @returns The code with top-level sourcemap comments removed.
 */
export declare function removeSourceMappingURL(code: string): string;
/**
 * Finds, resolves, and loads the input sourcemap referenced in the code's trailing
 * sourceMappingURL comment, if present. Supports inline base64 data URIs, local absolute
 * file URLs, and relative/absolute filesystem paths.
 */
export declare function loadInputSourceMap(filename: string, code: string): EncodedSourceMap | undefined;
