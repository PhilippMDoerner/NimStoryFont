"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestEntrypoints = void 0;
exports.findTests = findTests;
const test_discovery_1 = require("../unit-test/test-discovery");
// This file is a compatibility layer that re-exports the test discovery logic from its new location.
// This is necessary to avoid breaking the Karma builder, which still depends on this file.
var test_discovery_2 = require("../unit-test/test-discovery");
Object.defineProperty(exports, "getTestEntrypoints", { enumerable: true, get: function () { return test_discovery_2.getTestEntrypoints; } });
const removeLeadingSlash = (path) => {
    return path.startsWith('/') ? path.substring(1) : path;
};
async function findTests(include, exclude, workspaceRoot, projectSourceRoot) {
    // Karma has legacy support for workspace "root-relative" file paths
    return (0, test_discovery_1.findTests)(include.map(removeLeadingSlash), exclude.map(removeLeadingSlash), workspaceRoot, projectSourceRoot);
}
//# sourceMappingURL=find-tests.js.map