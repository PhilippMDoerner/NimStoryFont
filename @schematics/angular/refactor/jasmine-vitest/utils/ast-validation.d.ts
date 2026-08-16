/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview This file contains helper functions for validating the structure of
 * TypeScript AST nodes, particularly for identifying specific patterns in Jasmine tests.
 */
import ts from 'typescript';
/**
 * If a node is a `jasmine.method()` call, returns the method name.
 * @param node The node to check.
 * @returns The name of the method if it's a jasmine call, otherwise undefined.
 */
export declare function getJasmineMethodName(node: ts.Node): string | undefined;
/**
 * Checks if a node is a call expression for a specific method on the `jasmine` object.
 * @param node The node to check.
 * @param methodName The name of the method on the `jasmine` object.
 * @returns True if the node is a `jasmine.<methodName>()` call.
 */
export declare function isJasmineCallExpression(node: ts.Node, methodName: string): node is ts.CallExpression;
