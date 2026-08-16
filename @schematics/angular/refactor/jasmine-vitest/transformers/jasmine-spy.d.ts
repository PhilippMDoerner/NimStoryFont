/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/**
 * @fileoverview This file contains transformers dedicated to converting Jasmine's spying
 * functionality to Vitest's mocking APIs. It handles the creation of spies (`spyOn`,
 * `createSpy`, `createSpyObj`), spy strategies (`and.returnValue`, `and.callFake`),
 * and the inspection of spy calls (`spy.calls.reset`, `spy.calls.mostRecent`).
 */
import ts from 'typescript';
import { RefactorContext } from '../utils/refactor-context';
export declare function transformSpies(node: ts.Node, refactorCtx: RefactorContext): ts.Node;
export declare function transformCreateSpy(node: ts.Node, ctx: RefactorContext): ts.Node;
export declare function transformCreateSpyObj(node: ts.Node, ctx: RefactorContext): ts.Node;
export declare function transformSpyReset(node: ts.Node, { sourceFile, reporter }: RefactorContext): ts.Node;
export declare function transformSpyCallInspection(node: ts.Node, refactorCtx: RefactorContext): ts.Node;
