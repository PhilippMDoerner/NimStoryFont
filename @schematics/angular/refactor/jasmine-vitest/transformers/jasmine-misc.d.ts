/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview This file contains transformers for miscellaneous Jasmine APIs that don't
 * fit into other categories. This includes timer mocks (`jasmine.clock`), the `fail()`
 * function, and configuration settings like `jasmine.DEFAULT_TIMEOUT_INTERVAL`. It also
 * includes logic to identify and add TODO comments for unsupported Jasmine features.
 */
import ts from 'typescript';
import { RefactorContext } from '../utils/refactor-context';
export declare function transformTimerMocks(node: ts.Node, ctx: RefactorContext): ts.Node;
export declare function transformFail(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformJasmineMembers(node: ts.Node, refactorCtx: RefactorContext): ts.Node;
export declare function transformUnsupportedGlobalFunctions(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformUnsupportedJasmineCalls(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformUnknownJasmineProperties(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
