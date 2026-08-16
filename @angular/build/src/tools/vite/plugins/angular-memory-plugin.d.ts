/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type * as Vite from 'vite' with {
    'resolution-mode': 'import'
};
import { AngularMemoryOutputFiles } from '../utils';
interface AngularMemoryPluginOptions {
    virtualProjectRoot: string;
    outputFiles: AngularMemoryOutputFiles;
    templateUpdates?: ReadonlyMap<string, string>;
    external?: string[];
    disableViteTransport?: boolean;
}
export declare function createAngularMemoryPlugin(options: AngularMemoryPluginOptions): Promise<Vite.Plugin>;
export {};
