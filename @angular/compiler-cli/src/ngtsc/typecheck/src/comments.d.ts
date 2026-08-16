/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { AbsoluteSourceSpan, ParseSourceSpan, CommentTriviaType, ExpressionIdentifier } from '@angular/compiler';
export { CommentTriviaType, ExpressionIdentifier };
import ts from 'typescript';
/**
 * Reads the trailing comments and finds the first match which is a span comment (i.e. 4,10) on a
 * node and returns it as an `AbsoluteSourceSpan`.
 *
 * Will return `null` if no trailing comments on the node match the expected form of a source span.
 */
export declare function readSpanComment(node: ts.Node, sourceFile?: ts.SourceFile): AbsoluteSourceSpan | null;
/** Returns true if the node has a marker that indicates diagnostics errors should be ignored.  */
export declare function hasIgnoreForDiagnosticsMarker(node: ts.Node, sourceFile: ts.SourceFile): boolean;
export interface FindOptions<T extends ts.Node> {
    filter: (node: ts.Node) => node is T;
    withExpressionIdentifier?: ExpressionIdentifier;
    withSpan?: AbsoluteSourceSpan | ParseSourceSpan;
}
/**
 * Given a `ts.Node` with finds the first node whose matching the criteria specified
 * by the `FindOptions`.
 *
 * Returns `null` when no `ts.Node` matches the given conditions.
 */
export declare function findFirstMatchingNode<T extends ts.Node>(tcb: ts.Node, opts: FindOptions<T>): T | null;
/**
 * Given a `ts.Node` with source span comments, finds the first node whose source span comment
 * matches the given `sourceSpan`. Additionally, the `filter` function allows matching only
 * `ts.Nodes` of a given type, which provides the ability to select only matches of a given type
 * when there may be more than one.
 *
 * Returns `null` when no `ts.Node` matches the given conditions.
 */
export declare function findAllMatchingNodes<T extends ts.Node>(tcb: ts.Node, opts: FindOptions<T>): T[];
export declare function hasExpressionIdentifier(sourceFile: ts.SourceFile, node: ts.Node, identifier: ExpressionIdentifier): boolean;
export declare function readDirectiveIdFromComment(sourceFile: ts.SourceFile, node: ts.Node): number | null;
