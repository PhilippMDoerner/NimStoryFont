"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = void 0;
// Same structure as used in framework packages
class Version {
    full;
    major;
    minor;
    patch;
    constructor(full) {
        this.full = full;
        const [major, minor, patch] = full.split('-', 1)[0].split('.', 3);
        this.major = major;
        this.minor = minor;
        this.patch = patch;
    }
}
exports.VERSION = new Version('19.1.7');
