/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * The supported Node.js versions.
 */
export declare const supportedNodeVersions: string[];
/**
 * Checks if the current Node.js version is supported.
 * @returns `true` if the current Node.js version is supported, `false` otherwise.
 */
export declare function isNodeVersionSupported(): boolean;
/**
 * Checks if the current Node.js version is the minimum supported version.
 * @returns `true` if the current Node.js version is the minimum supported version, `false` otherwise.
 */
export declare function isNodeVersionMinSupported(): boolean;
