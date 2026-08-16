/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { FilePattern, InlinePluginDef } from 'karma';
export declare class AngularPolyfillsPlugin {
    static readonly $inject: string[];
    static readonly NAME = "angular-polyfills";
    static createPlugin(polyfillsFile: FilePattern, jasmineCleanupFiles: FilePattern, scriptsFiles: FilePattern[]): InlinePluginDef;
}
