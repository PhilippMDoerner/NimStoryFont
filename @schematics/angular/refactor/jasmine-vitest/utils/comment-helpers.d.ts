/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import ts from 'typescript';
import { TodoCategory, TodoContextMap } from './todo-notes';
type CategoriesWithNoContext = {
    [K in TodoCategory]: TodoContextMap[K] extends never ? K : never;
}[TodoCategory];
/**
 * Adds a TODO comment to a TypeScript node for manual migration.
 * This overload handles categories that do not require a context object.
 * @param node The AST node to which the comment will be added.
 * @param category The category of the TODO, used to look up the message and URL.
 */
export declare function addTodoComment<T extends CategoriesWithNoContext>(node: ts.Node, category: T): void;
/**
 * Adds a TODO comment to a TypeScript node for manual migration.
 * This overload handles categories that require a context object, ensuring it is
 * provided and correctly typed.
 * @param node The AST node to which the comment will be added.
 * @param category The category of the TODO, used to look up the message and URL.
 * @param context The context object providing dynamic values for the message.
 */
export declare function addTodoComment<T extends TodoCategory>(node: ts.Node, category: T, context: TodoContextMap[T]): void;
/**
 * Safely comments out the full text of a node line-by-line and attaches
 * it to a target node. This prevents multi-line statements from breaking
 * syntax when converted to single-line comments.
 * @param targetNode The node to which the comments will be added.
 * @param nodeToComment The original node whose text will be commented out.
 */
export declare function addCommentedNodeText(targetNode: ts.Node, nodeToComment: ts.Node): void;
export {};
