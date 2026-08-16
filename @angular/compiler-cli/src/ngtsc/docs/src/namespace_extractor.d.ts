/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import ts from 'typescript';
import { NamespaceEntry } from './entities';
/**
 * Extracts documentation entry for a TypeScript namespace.
 * @param node The TypeScript AST node for the namespace.
 * @param typeChecker The TypeScript type checker.
 */
export declare function extractNamespace(node: ts.ModuleDeclaration, typeChecker: ts.TypeChecker): NamespaceEntry;
