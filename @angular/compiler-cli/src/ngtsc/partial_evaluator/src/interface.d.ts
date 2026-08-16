/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import ts from 'typescript';
import { OwningModule, Reference } from '../../imports';
import { DependencyTracker } from '../../incremental/api';
import { ReflectionHost } from '../../reflection';
import { DynamicValue } from './dynamic';
import { ResolvedValue } from './result';
export type ForeignFunctionResolver = (fn: Reference<ts.FunctionDeclaration | ts.MethodDeclaration | ts.FunctionExpression>, callExpr: ts.CallExpression, resolve: (expr: ts.Expression) => ResolvedValue, unresolvable: DynamicValue) => ResolvedValue;
export type ForeignTypeResolver = (typeNode: ts.TypeNode) => ts.TypeNode | null;
export declare class PartialEvaluator {
    private host;
    private checker;
    private dependencyTracker;
    constructor(host: ReflectionHost, checker: ts.TypeChecker, dependencyTracker: DependencyTracker | null);
    evaluate(expr: ts.Expression, foreignFunctionResolver?: ForeignFunctionResolver): ResolvedValue;
    /**
     * Statically evaluates a `ts.TypeNode` (rather than a value expression) to a `ResolvedValue`.
     *
     * This is used when reading metadata that was encoded into `.d.ts` type positions - for example
     * the `imports`/`exports`/`declarations` tuples of `ɵɵNgModuleDeclaration`, which may be written
     * as `typeof X` queries, `ReturnType<typeof X.forRoot>`, references to constants that themselves
     * resolve to tuples, etc.
     */
    evaluateType(typeNode: ts.TypeNode, owningModule?: OwningModule | null, foreignFunctionResolver?: ForeignFunctionResolver, foreignTypeResolver?: ForeignTypeResolver): ResolvedValue;
}
