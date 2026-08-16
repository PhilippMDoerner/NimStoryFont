/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview This file contains transformers that migrate Jasmine matchers to their
 * Vitest counterparts. It handles a wide range of matchers, including syntactic sugar
 * (e.g., `toBeTrue`), asymmetric matchers (e.g., `jasmine.any`), async promise matchers
 * (`expectAsync`), and complex matchers that require restructuring, such as
 * `toHaveBeenCalledOnceWith` and `arrayWithExactContents`.
 */
import ts from 'typescript';
import { RefactorContext } from '../utils/refactor-context';
export declare function transformSyntacticSugarMatchers(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformAsymmetricMatchers(node: ts.Node, { sourceFile, reporter, pendingVitestValueImports }: RefactorContext): ts.Node;
export declare function transformToHaveBeenCalledBefore(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformToHaveClass(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformExpectAsync(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformComplexMatchers(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformArrayWithExactContents(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node | readonly ts.Node[];
export declare function transformCalledOnceWith(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node | readonly ts.Node[];
export declare function transformWithContext(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformExpectNothing(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformToBeNullish(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
