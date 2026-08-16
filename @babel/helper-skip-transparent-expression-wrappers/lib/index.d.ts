import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';

type TransparentExprWrapper = t.TSAsExpression | t.TSSatisfiesExpression | t.TSTypeAssertion | t.TSNonNullExpression | t.TypeCastExpression | t.ParenthesizedExpression;
declare function isTransparentExprWrapper(node: t.Node): node is TransparentExprWrapper;
declare function skipTransparentExprWrappers(path: NodePath<t.Expression>): NodePath<t.Expression>;
declare function skipTransparentExprWrapperNodes<T extends t.Node>(node: T): T extends t.Expression ? t.Expression : T;

export { type TransparentExprWrapper, isTransparentExprWrapper, skipTransparentExprWrapperNodes, skipTransparentExprWrappers };
