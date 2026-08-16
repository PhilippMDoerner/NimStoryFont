/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import type { ComponentStyleRecord } from '../../../tools/vite/middlewares';
import type { ResultFile } from '../../application/results';
import { BuildOutputFileType, type ExternalResultMetadata } from '../internal';
export interface OutputFileRecord {
    contents: Uint8Array;
    size: number;
    hash: string;
    updated: boolean;
    servable: boolean;
    type: BuildOutputFileType;
}
export interface OutputAssetRecord {
    source: string;
    updated: boolean;
}
export interface DevServerExternalResultMetadata extends Omit<ExternalResultMetadata, 'explicit'> {
    explicitBrowser: string[];
    explicitServer: string[];
}
export declare function updateResultRecord(outputPath: string, file: ResultFile, normalizePath: (id: string) => string, htmlIndexPath: string, generatedFiles: Map<string, OutputFileRecord>, assetFiles: Map<string, OutputAssetRecord>, componentStyles: Map<string, ComponentStyleRecord>, initial?: boolean): void;
/**
 * Checks if the given value is an absolute URL.
 *
 * This function helps in avoiding Vite's prebundling from processing absolute URLs (http://, https://, //) as files.
 *
 * @param value - The URL or path to check.
 * @returns `true` if the value is not an absolute URL; otherwise, `false`.
 */
export declare function isAbsoluteUrl(value: string): boolean;
