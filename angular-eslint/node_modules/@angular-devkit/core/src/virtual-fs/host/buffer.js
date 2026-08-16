"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToFileBuffer = stringToFileBuffer;
exports.fileBufferToString = fileBufferToString;
/**
 * @deprecated Use `new TextEncoder().encode(str).buffer` instead.
 */
function stringToFileBuffer(str) {
    return new TextEncoder().encode(str).buffer;
}
/**
 * @deprecated Use `new TextDecoder().decode(fileBuffer)` instead.
 */
function fileBufferToString(fileBuffer) {
    if (fileBuffer.toString.length === 1) {
        return fileBuffer.toString('utf-8');
    }
    return new TextDecoder('utf-8').decode(new Uint8Array(fileBuffer));
}
//# sourceMappingURL=buffer.js.map