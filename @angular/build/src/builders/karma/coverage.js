"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstrumentationFilter = createInstrumentationFilter;
exports.getInstrumentationExcludedPaths = getInstrumentationExcludedPaths;
const node_path_1 = __importDefault(require("node:path"));
const tinyglobby_1 = require("tinyglobby");
function createInstrumentationFilter(includedBasePath, excludedPaths) {
    return (request) => {
        return (!excludedPaths.has(request) &&
            !/\.(e2e|spec)\.tsx?$|[\\/]node_modules[\\/]|[\\/]\.angular[\\/]/.test(request) &&
            request.startsWith(includedBasePath));
    };
}
function getInstrumentationExcludedPaths(root, excludedPaths) {
    const excluded = new Set();
    for (const excludeGlob of excludedPaths) {
        const excludePath = excludeGlob[0] === '/' ? excludeGlob.slice(1) : excludeGlob;
        (0, tinyglobby_1.globSync)(excludePath, { cwd: root }).forEach((p) => excluded.add(node_path_1.default.join(root, p)));
    }
    return excluded;
}
//# sourceMappingURL=coverage.js.map