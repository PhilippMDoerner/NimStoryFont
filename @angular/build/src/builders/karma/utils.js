"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectSourceRoot = getProjectSourceRoot;
exports.normalizePolyfills = normalizePolyfills;
exports.collectEntrypoints = collectEntrypoints;
exports.hasChunkOrWorkerFiles = hasChunkOrWorkerFiles;
exports.first = first;
const node_module_1 = require("node:module");
const project_metadata_1 = require("../../utils/project-metadata");
const find_tests_1 = require("./find-tests");
const localResolve = (0, node_module_1.createRequire)(__filename).resolve;
async function getProjectSourceRoot(context) {
    // We have already validated that the project name is set before calling this function.
    const projectName = context.target?.project;
    if (!projectName) {
        return context.workspaceRoot;
    }
    const projectMetadata = await context.getProjectMetadata(projectName);
    const { projectSourceRoot } = (0, project_metadata_1.getProjectRootPaths)(context.workspaceRoot, projectMetadata);
    return projectSourceRoot;
}
function normalizePolyfills(polyfills = []) {
    const jasmineGlobalEntryPoint = localResolve('./polyfills/jasmine_global.js');
    const jasmineGlobalCleanupEntrypoint = localResolve('./polyfills/jasmine_global_cleanup.js');
    const sourcemapEntrypoint = localResolve('./polyfills/init_sourcemaps.js');
    const zoneTestingEntryPoint = 'zone.js/testing';
    const polyfillsExludingZoneTesting = polyfills.filter((p) => p !== zoneTestingEntryPoint);
    return [
        polyfillsExludingZoneTesting.concat([jasmineGlobalEntryPoint, sourcemapEntrypoint]),
        polyfillsExludingZoneTesting.length === polyfills.length
            ? [jasmineGlobalCleanupEntrypoint]
            : [jasmineGlobalCleanupEntrypoint, zoneTestingEntryPoint],
    ];
}
async function collectEntrypoints(options, context, projectSourceRoot) {
    // Glob for files to test.
    const testFiles = await (0, find_tests_1.findTests)(options.include, options.exclude, context.workspaceRoot, projectSourceRoot);
    return (0, find_tests_1.getTestEntrypoints)(testFiles, { projectSourceRoot, workspaceRoot: context.workspaceRoot });
}
function hasChunkOrWorkerFiles(files) {
    return Object.keys(files).some((filename) => {
        return /(?:^|\/)(?:worker|chunk)[^/]+\.js$/.test(filename);
    });
}
/** Returns the first item yielded by the given generator and cancels the execution. */
async function first(generator, { cancel }) {
    if (!cancel) {
        const iterator = generator[Symbol.asyncIterator]();
        const firstValue = await iterator.next();
        if (firstValue.done) {
            throw new Error('Expected generator to emit at least once.');
        }
        return [firstValue.value, iterator];
    }
    for await (const value of generator) {
        return [value, null];
    }
    throw new Error('Expected generator to emit at least once.');
}
//# sourceMappingURL=utils.js.map