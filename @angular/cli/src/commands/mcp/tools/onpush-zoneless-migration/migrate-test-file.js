"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateTestFile = migrateTestFile;
exports.searchForGlobalZoneless = searchForGlobalZoneless;
const node_path_1 = require("node:path");
const workspace_utils_1 = require("../../workspace-utils");
const prompts_1 = require("./prompts");
const ts_utils_1 = require("./ts-utils");
async function migrateTestFile(sourceFile, host) {
    const ts = await (0, ts_utils_1.loadTypescript)();
    // Check if tests use zoneless either by default through `initTestEnvironment` or by explicitly calling `provideZonelessChangeDetection`.
    let testsUseZonelessChangeDetection = await searchForGlobalZoneless(sourceFile.fileName, host);
    if (!testsUseZonelessChangeDetection) {
        ts.forEachChild(sourceFile, function visit(node) {
            if (ts.isCallExpression(node) &&
                node.expression.getText(sourceFile) === 'provideZonelessChangeDetection') {
                testsUseZonelessChangeDetection = true;
                return;
            }
            ts.forEachChild(node, visit);
        });
    }
    if (!testsUseZonelessChangeDetection) {
        // Tests do not use zoneless, so we provide instructions to set it up.
        return (0, prompts_1.createProvideZonelessForTestsSetupPrompt)(sourceFile.fileName);
    }
    // At this point, tests are using zoneless, so we look for any explicit uses of `provideZoneChangeDetection` that need to be fixed.
    return (0, prompts_1.createFixResponseForZoneTests)(sourceFile);
}
async function searchForGlobalZoneless(startPath, host) {
    const angularJsonDir = (0, workspace_utils_1.findAngularJsonDir)(startPath, host);
    if (!angularJsonDir) {
        // Cannot determine project root, fallback to original behavior or assume false.
        // For now, let's assume no global setup if angular.json is not found.
        return false;
    }
    try {
        const files = host.glob('**/*.ts', { cwd: angularJsonDir });
        for await (const file of files) {
            const fullPath = (0, node_path_1.join)(file.parentPath, file.name);
            const content = await host.readFile(fullPath, 'utf-8');
            if (content.includes('initTestEnvironment') &&
                content.includes('provideZonelessChangeDetection')) {
                return true;
            }
        }
    }
    catch (e) {
        return false;
    }
    return false;
}
//# sourceMappingURL=migrate-test-file.js.map