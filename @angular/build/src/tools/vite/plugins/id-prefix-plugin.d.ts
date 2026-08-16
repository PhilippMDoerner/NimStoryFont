/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { Plugin } from 'vite' with {
    'resolution-mode': 'import'
};
export declare function createRemoveIdPrefixPlugin(externals: string[]): Plugin;
/**
 * Creates a transform function that removes the Vite ID prefix from externals.
 * @param base The base path of the application.
 * @param externals The external package names.
 * @returns A function that transforms code by removing the Vite ID prefix.
 */
export declare function createTransformer(base: string, externals: string[]): (code: string) => string;
