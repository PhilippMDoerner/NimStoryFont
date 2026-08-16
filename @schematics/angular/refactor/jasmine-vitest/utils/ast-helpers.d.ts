/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import ts from 'typescript';
export declare function addVitestValueImport(imports: Set<string>, importName: string): void;
export declare function addVitestTypeImport(imports: Set<string>, importName: string): void;
export declare function getVitestAutoImports(valueImports: Set<string>, typeImports: Set<string>): ts.ImportDeclaration | undefined;
export declare function createExpectCallExpression(args: ts.Expression[], typeArgs?: ts.TypeNode[] | undefined): ts.CallExpression;
export declare function createPropertyAccess(expressionOrIndentifierText: ts.Expression | string, name: string | ts.MemberName): ts.PropertyAccessExpression;
export declare function getPromiseResolveRejectMethod(node: ts.Node): {
    methodName: 'resolve' | 'reject';
    arguments: ts.NodeArray<ts.Expression>;
} | null;
/**
 * Checks if a named binding is imported from the given module in the source file.
 * @param sourceFile The source file to search for imports.
 * @param name The import name (e.g. 'flush', 'tick').
 * @param moduleSpecifier The module path (e.g. '@angular/core/testing').
 */
export declare function isNamedImportFrom(sourceFile: ts.SourceFile, name: string, moduleSpecifier: string): boolean;
/**
 * Removes specified import specifiers from ImportDeclarations.
 * If all specifiers are removed from an import, the entire import is dropped.
 */
export declare function removeImportSpecifiers(sourceFile: ts.SourceFile, removals: Map<string, Set<string>>): ts.SourceFile;
