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
exports.getJasmineMethodName = getJasmineMethodName;
exports.isJasmineCallExpression = isJasmineCallExpression;
/**
 * @fileoverview This file contains helper functions for validating the structure of
 * TypeScript AST nodes, particularly for identifying specific patterns in Jasmine tests.
 */
const typescript_1 = __importDefault(require("typescript"));
/**
 * If a node is a `jasmine.method()` call, returns the method name.
 * @param node The node to check.
 * @returns The name of the method if it's a jasmine call, otherwise undefined.
 */
function getJasmineMethodName(node) {
    if (!typescript_1.default.isCallExpression(node) || !typescript_1.default.isPropertyAccessExpression(node.expression)) {
        return undefined;
    }
    const pae = node.expression;
    if (!typescript_1.default.isIdentifier(pae.expression) || pae.expression.text !== 'jasmine') {
        return undefined;
    }
    return typescript_1.default.isIdentifier(pae.name) ? pae.name.text : undefined;
}
/**
 * Checks if a node is a call expression for a specific method on the `jasmine` object.
 * @param node The node to check.
 * @param methodName The name of the method on the `jasmine` object.
 * @returns True if the node is a `jasmine.<methodName>()` call.
 */
function isJasmineCallExpression(node, methodName) {
    return getJasmineMethodName(node) === methodName;
}
//# sourceMappingURL=ast-validation.js.map