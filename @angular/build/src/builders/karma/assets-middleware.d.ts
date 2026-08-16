/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { InlinePluginDef } from 'karma';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { ResultFile } from '../application/results';
interface ServeFileFunction {
    (filepath: string, rangeHeader: string | string[] | undefined, response: ServerResponse, transform?: (c: string | Uint8Array) => string | Uint8Array, content?: string | Uint8Array, doNotCache?: boolean): void;
}
export interface LatestBuildFiles {
    files: Record<string, ResultFile | undefined>;
}
export declare class AngularAssetsMiddleware {
    private readonly serveFile;
    private readonly latestBuildFiles;
    static readonly $inject: string[];
    static readonly NAME = "angular-test-assets";
    constructor(serveFile: ServeFileFunction, latestBuildFiles: LatestBuildFiles);
    handle(req: IncomingMessage, res: ServerResponse, next: (err?: unknown) => unknown): void;
    static createPlugin(initialFiles: LatestBuildFiles): InlinePluginDef;
}
export {};
