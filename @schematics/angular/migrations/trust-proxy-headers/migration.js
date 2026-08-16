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
exports.default = default_1;
const typescript_1 = __importDefault(require("typescript"));
const workspace_1 = require("../../utility/workspace");
const TODO_COMMENT = '// TODO: This is a security-sensitive option. Remove if not needed. ' +
    'For more information, see https://angular.dev/best-practices/security#configuring-trusted-proxy-headers';
function default_1() {
    return async (tree) => {
        const workspace = await (0, workspace_1.getWorkspace)(tree);
        const serverFiles = new Set();
        for (const [targetName, target] of (0, workspace_1.allWorkspaceTargets)(workspace)) {
            if (targetName !== 'build') {
                continue;
            }
            for (const [, options] of (0, workspace_1.allTargetOptions)(target)) {
                if (typeof options?.['server'] === 'string') {
                    serverFiles.add(options['server']);
                }
            }
        }
        for (const path of serverFiles) {
            if (!tree.exists(path)) {
                continue;
            }
            const content = tree.readText(path);
            if (content.includes(TODO_COMMENT)) {
                continue;
            }
            if (!content.includes('AngularAppEngine') && !content.includes('AngularNodeAppEngine')) {
                continue;
            }
            const sourceFile = typescript_1.default.createSourceFile(path, content, typescript_1.default.ScriptTarget.Latest, true);
            const recorder = tree.beginUpdate(path);
            function visit(node) {
                if (typescript_1.default.isNewExpression(node) &&
                    typescript_1.default.isIdentifier(node.expression) &&
                    (node.expression.text === 'AngularNodeAppEngine' ||
                        node.expression.text === 'AngularAppEngine')) {
                    // Check arguments
                    if (!node.arguments || node.arguments.length === 0) {
                        // Case 1: No arguments passed
                        const insertPos = node.end - 1; // right before )
                        recorder.insertRight(insertPos, `{\n  ${TODO_COMMENT}\n  ` +
                            `trustProxyHeaders: ['x-forwarded-host', 'x-forwarded-proto'],\n}`);
                    }
                    else if (node.arguments.length > 0) {
                        const firstArg = node.arguments[0];
                        if (typescript_1.default.isObjectLiteralExpression(firstArg)) {
                            // Check if trustProxyHeaders is already present
                            const hasTrustProxyHeaders = firstArg.properties.some((prop) => typescript_1.default.isPropertyAssignment(prop) &&
                                (typescript_1.default.isIdentifier(prop.name) || typescript_1.default.isStringLiteral(prop.name)) &&
                                prop.name.text === 'trustProxyHeaders');
                            if (!hasTrustProxyHeaders) {
                                // Insert right after the opening brace
                                const insertPos = firstArg.getStart() + 1;
                                recorder.insertRight(insertPos, `\n  ${TODO_COMMENT}\n  ` +
                                    `trustProxyHeaders: ['x-forwarded-host', 'x-forwarded-proto'],`);
                            }
                        }
                    }
                }
                typescript_1.default.forEachChild(node, visit);
            }
            visit(sourceFile);
            tree.commitUpdate(recorder);
        }
    };
}
//# sourceMappingURL=migration.js.map