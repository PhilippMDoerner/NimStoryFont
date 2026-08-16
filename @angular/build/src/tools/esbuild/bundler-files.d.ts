/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { OutputFile } from 'esbuild';
export interface InitialFileRecord {
    entrypoint: boolean;
    name?: string;
    type: 'script' | 'style';
    external?: boolean;
    serverFile: boolean;
    depth: number;
}
export declare enum BuildOutputFileType {
    Browser = 0,
    Media = 1,
    ServerApplication = 2,
    ServerRoot = 3,
    Root = 4
}
export interface BuildOutputFile extends OutputFile {
    type: BuildOutputFileType;
    readonly size: number;
    clone: () => BuildOutputFile;
}
export declare function createOutputFile(path: string, data: string | Uint8Array, type: BuildOutputFileType): BuildOutputFile;
export declare function convertOutputFile(file: OutputFile, type: BuildOutputFileType): BuildOutputFile;
