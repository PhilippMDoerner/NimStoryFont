/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import ts from 'typescript';
import { RefactorContext } from '../utils/refactor-context';
export declare function transformFakeAsyncFlushMicrotasks(node: ts.Node, ctx: RefactorContext): ts.Node;
