"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestVersions = void 0;
// We could have used TypeScripts' `resolveJsonModule` to make the `latestVersion` object typesafe,
// but ts_library doesn't support JSON inputs.
const dependencies = require('./latest-versions/package.json')['dependencies'];
exports.latestVersions = {
    ...dependencies,
    // As Angular CLI works with same minor versions of Angular Framework, a tilde match for the current
    Angular: '^22.1.0',
    NgPackagr: '^22.1.0',
    DevkitBuildAngular: '^22.1.3',
    AngularBuild: '^22.1.3',
    AngularSSR: '^22.1.3',
};
//# sourceMappingURL=latest-versions.js.map