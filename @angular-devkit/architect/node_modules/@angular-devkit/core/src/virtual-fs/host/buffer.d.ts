/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { FileBuffer } from './interface';
/**
 * @deprecated Use `new TextEncoder().encode(str).buffer` instead.
 */
export declare function stringToFileBuffer(str: string): FileBuffer;
/**
 * @deprecated Use `new TextDecoder().decode(fileBuffer)` instead.
 */
export declare function fileBufferToString(fileBuffer: FileBuffer): string;
