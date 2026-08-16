"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildOutputFileType = void 0;
exports.createOutputFile = createOutputFile;
exports.convertOutputFile = convertOutputFile;
const node_crypto_1 = require("node:crypto");
var BuildOutputFileType;
(function (BuildOutputFileType) {
    BuildOutputFileType[BuildOutputFileType["Browser"] = 0] = "Browser";
    BuildOutputFileType[BuildOutputFileType["Media"] = 1] = "Media";
    BuildOutputFileType[BuildOutputFileType["ServerApplication"] = 2] = "ServerApplication";
    BuildOutputFileType[BuildOutputFileType["ServerRoot"] = 3] = "ServerRoot";
    BuildOutputFileType[BuildOutputFileType["Root"] = 4] = "Root";
})(BuildOutputFileType || (exports.BuildOutputFileType = BuildOutputFileType = {}));
function createOutputFile(path, data, type) {
    if (typeof data === 'string') {
        let cachedContents = null;
        let cachedText = data;
        let cachedHash = null;
        return {
            path,
            type,
            get contents() {
                cachedContents ??= new TextEncoder().encode(data);
                return cachedContents;
            },
            set contents(value) {
                cachedContents = value;
                cachedText = null;
            },
            get text() {
                cachedText ??= new TextDecoder('utf-8').decode(this.contents);
                return cachedText;
            },
            get size() {
                return this.contents.byteLength;
            },
            get hash() {
                cachedHash ??= (0, node_crypto_1.createHash)('sha256')
                    .update(cachedText ?? this.contents)
                    .digest('hex');
                return cachedHash;
            },
            clone() {
                return createOutputFile(this.path, cachedText ?? this.contents, this.type);
            },
        };
    }
    else {
        let cachedContents = data;
        let cachedText = null;
        let cachedHash = null;
        return {
            get contents() {
                return cachedContents;
            },
            set contents(value) {
                cachedContents = value;
                cachedText = null;
            },
            path,
            type,
            get size() {
                return this.contents.byteLength;
            },
            get text() {
                cachedText ??= new TextDecoder('utf-8').decode(this.contents);
                return cachedText;
            },
            get hash() {
                cachedHash ??= (0, node_crypto_1.createHash)('sha256').update(this.contents).digest('hex');
                return cachedHash;
            },
            clone() {
                return createOutputFile(this.path, this.contents, this.type);
            },
        };
    }
}
function convertOutputFile(file, type) {
    let { contents: cachedContents } = file;
    let cachedText = null;
    return {
        get contents() {
            return cachedContents;
        },
        set contents(value) {
            cachedContents = value;
            cachedText = null;
        },
        hash: file.hash,
        path: file.path,
        type,
        get size() {
            return this.contents.byteLength;
        },
        get text() {
            cachedText ??= new TextDecoder('utf-8').decode(this.contents);
            return cachedText;
        },
        clone() {
            return convertOutputFile(this, this.type);
        },
    };
}
//# sourceMappingURL=bundler-files.js.map