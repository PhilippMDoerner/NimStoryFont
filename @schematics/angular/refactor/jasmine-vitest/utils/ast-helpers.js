"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVitestValueImport = addVitestValueImport;
exports.addVitestTypeImport = addVitestTypeImport;
exports.getVitestAutoImports = getVitestAutoImports;
exports.createExpectCallExpression = createExpectCallExpression;
exports.createPropertyAccess = createPropertyAccess;
exports.getPromiseResolveRejectMethod = getPromiseResolveRejectMethod;
exports.isNamedImportFrom = isNamedImportFrom;
exports.removeImportSpecifiers = removeImportSpecifiers;
const typescript_1 = __importDefault(require("typescript"));
function addVitestValueImport(imports, importName) {
    imports.add(importName);
}
function addVitestTypeImport(imports, importName) {
    imports.add(importName);
}
function getVitestAutoImports(valueImports, typeImports) {
    if (valueImports.size === 0 && typeImports.size === 0) {
        return undefined;
    }
    const isClauseTypeOnly = valueImports.size === 0 && typeImports.size > 0;
    const allSpecifiers = [];
    // Add value imports
    for (const i of [...valueImports].sort()) {
        allSpecifiers.push(typescript_1.default.factory.createImportSpecifier(false, undefined, typescript_1.default.factory.createIdentifier(i)));
    }
    // Add type imports
    for (const i of [...typeImports].sort()) {
        // Only set isTypeOnly on individual specifiers if the clause itself is NOT type-only
        allSpecifiers.push(typescript_1.default.factory.createImportSpecifier(!isClauseTypeOnly, undefined, typescript_1.default.factory.createIdentifier(i)));
    }
    allSpecifiers.sort((a, b) => a.name.text.localeCompare(b.name.text));
    return typescript_1.default.factory.createImportDeclaration(undefined, typescript_1.default.factory.createImportClause(isClauseTypeOnly, // Set isTypeOnly on the clause if only type imports
    undefined, typescript_1.default.factory.createNamedImports(allSpecifiers)), typescript_1.default.factory.createStringLiteral('vitest'));
}
function createExpectCallExpression(args, typeArgs = undefined) {
    return typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier('expect'), typeArgs, args);
}
function createPropertyAccess(expressionOrIndentifierText, name) {
    return typescript_1.default.factory.createPropertyAccessExpression(typeof expressionOrIndentifierText === 'string'
        ? typescript_1.default.factory.createIdentifier(expressionOrIndentifierText)
        : expressionOrIndentifierText, name);
}
function getPromiseResolveRejectMethod(node) {
    if (!typescript_1.default.isCallExpression(node)) {
        return null;
    }
    const expr = node.expression;
    if (!typescript_1.default.isPropertyAccessExpression(expr) ||
        !typescript_1.default.isIdentifier(expr.expression) ||
        expr.expression.escapedText !== 'Promise') {
        return null;
    }
    const methodName = expr.name.escapedText;
    const isResolveReject = methodName === 'resolve' || methodName === 'reject';
    if (!isResolveReject) {
        return null;
    }
    return {
        methodName,
        arguments: node.arguments,
    };
}
/**
 * Checks if a named binding is imported from the given module in the source file.
 * @param sourceFile The source file to search for imports.
 * @param name The import name (e.g. 'flush', 'tick').
 * @param moduleSpecifier The module path (e.g. '@angular/core/testing').
 */
function isNamedImportFrom(sourceFile, name, moduleSpecifier) {
    return sourceFile.statements.some((statement) => {
        if (!_isImportDeclarationWithNamedBindings(statement)) {
            return false;
        }
        const specifier = statement.moduleSpecifier;
        const modulePath = typescript_1.default.isStringLiteralLike(specifier) ? specifier.text : null;
        if (modulePath !== moduleSpecifier) {
            return false;
        }
        for (const element of statement.importClause.namedBindings.elements) {
            const importedName = element.propertyName ? element.propertyName.text : element.name.text;
            if (importedName === name) {
                return true;
            }
        }
    });
}
/**
 * Removes specified import specifiers from ImportDeclarations.
 * If all specifiers are removed from an import, the entire import is dropped.
 */
function removeImportSpecifiers(sourceFile, removals) {
    const newStatements = sourceFile.statements
        .map((statement) => {
        if (!_isImportDeclarationWithNamedBindings(statement)) {
            return statement;
        }
        const specifier = statement.moduleSpecifier;
        const modulePath = typescript_1.default.isStringLiteralLike(specifier) ? specifier.text : null;
        if (modulePath === null) {
            return statement;
        }
        const namesToRemove = removals.get(modulePath);
        if (namesToRemove === undefined || namesToRemove.size === 0) {
            return statement;
        }
        const remaining = statement.importClause.namedBindings.elements.filter((el) => {
            const name = el.propertyName ? el.propertyName.text : el.name.text;
            return !namesToRemove.has(name);
        });
        if (remaining.length === 0) {
            return;
        }
        if (remaining.length === statement.importClause.namedBindings.elements.length) {
            return statement;
        }
        return typescript_1.default.factory.updateImportDeclaration(statement, statement.modifiers, typescript_1.default.factory.updateImportClause(statement.importClause, undefined, statement.importClause.name, typescript_1.default.factory.createNamedImports(remaining)), statement.moduleSpecifier, statement.attributes);
    })
        .filter((statement) => statement !== undefined);
    return typescript_1.default.factory.updateSourceFile(sourceFile, newStatements);
}
function _isImportDeclarationWithNamedBindings(statement) {
    return (typescript_1.default.isImportDeclaration(statement) &&
        statement.importClause?.namedBindings !== undefined &&
        typescript_1.default.isNamedImports(statement.importClause.namedBindings));
}
//# sourceMappingURL=ast-helpers.js.map