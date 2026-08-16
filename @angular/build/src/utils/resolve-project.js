"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectResolver = createProjectResolver;
const node_module_1 = require("node:module");
const node_path_1 = require("node:path");
/**
 * Creates a module resolver function that is strictly scoped to the project root.
 * This prevents module resolution from leaking the parent module context when executing inside virtual stores (like pnpm).
 *
 * @param projectRoot The root directory of the project.
 * @returns A resolver function that takes a package name/path and returns its resolved path.
 */
function createProjectResolver(projectRoot) {
    const projectRequire = (0, node_module_1.createRequire)((0, node_path_1.join)(projectRoot, 'package.json'));
    return (packageName) => projectRequire.resolve(packageName, { paths: [projectRoot] });
}
//# sourceMappingURL=resolve-project.js.map