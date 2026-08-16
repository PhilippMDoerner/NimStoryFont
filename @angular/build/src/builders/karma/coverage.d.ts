/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export declare function createInstrumentationFilter(includedBasePath: string, excludedPaths: Set<string>): (request: string) => boolean;
export declare function getInstrumentationExcludedPaths(root: string, excludedPaths: string[]): Set<string>;
