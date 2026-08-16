/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview This file contains transformers that convert Jasmine lifecycle functions
 * and test setup/teardown patterns to their Vitest equivalents. This includes handling
 * focused/skipped tests (fdescribe, fit, xdescribe, xit), pending tests, and asynchronous
 * operations that use the `done` callback.
 */
import ts from 'typescript';
import { RefactorContext } from '../utils/refactor-context';
export declare function transformFocusedAndSkippedTests(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformPending(node: ts.Node, { sourceFile, reporter, tsContext }: RefactorContext): ts.Node;
export declare function transformDoneCallback(node: ts.Node, refactorCtx: RefactorContext): ts.Node;
