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
exports.findBootstrapModuleCall = findBootstrapModuleCall;
exports.getAppModulePath = getAppModulePath;
exports.isStandaloneApp = isStandaloneApp;
const schematics_1 = require("@angular-devkit/schematics");
const posix_1 = require("node:path/posix");
const typescript_1 = __importDefault(require("typescript"));
const ast_utils_1 = require("../utility/ast-utils");
const util_1 = require("./standalone/util");
function findBootstrapModuleCall(host, mainPath) {
    const mainText = host.readText(mainPath);
    const source = typescript_1.default.createSourceFile(mainPath, mainText, typescript_1.default.ScriptTarget.Latest, true);
    const allNodes = (0, ast_utils_1.getSourceNodes)(source);
    let bootstrapCall = null;
    for (const node of allNodes) {
        let bootstrapCallNode = (0, ast_utils_1.findNode)(node, typescript_1.default.SyntaxKind.Identifier, 'bootstrapModule');
        // Walk up the parent until CallExpression is found.
        while (bootstrapCallNode &&
            bootstrapCallNode.parent &&
            bootstrapCallNode.parent.kind !== typescript_1.default.SyntaxKind.CallExpression) {
            bootstrapCallNode = bootstrapCallNode.parent;
        }
        if (bootstrapCallNode !== null &&
            bootstrapCallNode.parent !== undefined &&
            bootstrapCallNode.parent.kind === typescript_1.default.SyntaxKind.CallExpression) {
            bootstrapCall = bootstrapCallNode.parent;
            break;
        }
    }
    return bootstrapCall;
}
function findBootstrapModulePath(host, mainPath) {
    const bootstrapCall = findBootstrapModuleCall(host, mainPath);
    if (!bootstrapCall) {
        throw new schematics_1.SchematicsException('Bootstrap call not found');
    }
    const bootstrapModule = bootstrapCall.arguments[0];
    const mainText = host.readText(mainPath);
    const source = typescript_1.default.createSourceFile(mainPath, mainText, typescript_1.default.ScriptTarget.Latest, true);
    const allNodes = (0, ast_utils_1.getSourceNodes)(source);
    const bootstrapModuleRelativePath = allNodes
        .filter(typescript_1.default.isImportDeclaration)
        .filter((imp) => {
        return (0, ast_utils_1.findNode)(imp, typescript_1.default.SyntaxKind.Identifier, bootstrapModule.getText());
    })
        .map((imp) => {
        const modulePathStringLiteral = imp.moduleSpecifier;
        return modulePathStringLiteral.text;
    })[0];
    return bootstrapModuleRelativePath;
}
function getAppModulePath(host, mainPath) {
    const moduleRelativePath = findBootstrapModulePath(host, mainPath);
    const mainDir = (0, posix_1.dirname)(mainPath);
    const modulePath = (0, posix_1.join)(mainDir, `${moduleRelativePath}.ts`);
    return modulePath;
}
function isStandaloneApp(host, mainPath) {
    try {
        (0, util_1.findBootstrapApplicationCall)(host, mainPath);
        return true;
    }
    catch (error) {
        if (error instanceof schematics_1.SchematicsException) {
            return false;
        }
        throw error;
    }
}
//# sourceMappingURL=ng-ast-utils.js.map