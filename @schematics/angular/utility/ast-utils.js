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
exports.insertImport = insertImport;
exports.findNodes = findNodes;
exports.getSourceNodes = getSourceNodes;
exports.findNode = findNode;
exports.insertAfterLastOccurrence = insertAfterLastOccurrence;
exports.getDecoratorMetadata = getDecoratorMetadata;
exports.getMetadataField = getMetadataField;
exports.addSymbolToNgModuleMetadata = addSymbolToNgModuleMetadata;
exports.addDeclarationToModule = addDeclarationToModule;
exports.addImportToModule = addImportToModule;
exports.addProviderToModule = addProviderToModule;
exports.addExportToModule = addExportToModule;
exports.addBootstrapToModule = addBootstrapToModule;
exports.isImported = isImported;
exports.getRouterModuleDeclaration = getRouterModuleDeclaration;
exports.addRouteDeclarationToModule = addRouteDeclarationToModule;
exports.hasTopLevelIdentifier = hasTopLevelIdentifier;
const typescript_1 = __importDefault(require("typescript"));
const change_1 = require("./change");
const eol_1 = require("./eol");
/**
 * Add Import `import { symbolName } from fileName` if the import doesn't exit
 * already. Assumes fileToEdit can be resolved and accessed.
 * @param fileToEdit File we want to add import to.
 * @param symbolName Item to import.
 * @param fileName Path to the file.
 * @param isDefault If true, import follows style for importing default exports.
 * @param alias Alias that the symbol should be inserted under.
 * @return Change
 */
function insertImport(source, fileToEdit, symbolName, fileName, isDefault = false, alias) {
    const rootNode = source;
    const allImports = findNodes(rootNode, typescript_1.default.isImportDeclaration);
    const importExpression = alias ? `${symbolName} as ${alias}` : symbolName;
    // get nodes that map to import statements from the file fileName
    const relevantImports = allImports.filter((node) => {
        return typescript_1.default.isStringLiteralLike(node.moduleSpecifier) && node.moduleSpecifier.text === fileName;
    });
    if (relevantImports.length > 0) {
        const hasNamespaceImport = relevantImports.some((node) => {
            return node.importClause?.namedBindings?.kind === typescript_1.default.SyntaxKind.NamespaceImport;
        });
        // if imports * from fileName, don't add symbolName
        if (hasNamespaceImport) {
            return new change_1.NoopChange();
        }
        const imports = relevantImports.flatMap((node) => {
            return node.importClause?.namedBindings && typescript_1.default.isNamedImports(node.importClause.namedBindings)
                ? node.importClause.namedBindings.elements
                : [];
        });
        // insert import if it's not there
        if (!imports.some((node) => (node.propertyName || node.name).text === symbolName)) {
            const fallbackPos = findNodes(relevantImports[0], typescript_1.default.SyntaxKind.CloseBraceToken)[0].getStart() ||
                findNodes(relevantImports[0], typescript_1.default.SyntaxKind.FromKeyword)[0].getStart();
            return insertAfterLastOccurrence(imports, `, ${importExpression}`, fileToEdit, fallbackPos);
        }
        return new change_1.NoopChange();
    }
    // no such import declaration exists
    const useStrict = findNodes(rootNode, typescript_1.default.isStringLiteral).filter((n) => n.text === 'use strict');
    let fallbackPos = 0;
    if (useStrict.length > 0) {
        fallbackPos = useStrict[0].end;
    }
    const open = isDefault ? '' : '{ ';
    const close = isDefault ? '' : ' }';
    const eol = (0, eol_1.getEOL)(rootNode.getText());
    // if there are no imports or 'use strict' statement, insert import at beginning of file
    const insertAtBeginning = allImports.length === 0 && useStrict.length === 0;
    const separator = insertAtBeginning ? '' : `;${eol}`;
    const toInsert = `${separator}import ${open}${importExpression}${close}` +
        ` from '${fileName}'${insertAtBeginning ? `;${eol}` : ''}`;
    return insertAfterLastOccurrence(allImports, toInsert, fileToEdit, fallbackPos, typescript_1.default.SyntaxKind.StringLiteral);
}
const findNodesCache = new WeakMap();
function findNodes(node, kindOrGuard, max = Infinity, recursive = false) {
    if (!node || max == 0) {
        return [];
    }
    const test = typeof kindOrGuard === 'function'
        ? kindOrGuard
        : (node) => node.kind === kindOrGuard;
    // Caching is only supported for the entire file
    if (typescript_1.default.isSourceFile(node)) {
        const sourceFileCache = findNodesCache.get(node);
        if (sourceFileCache?.has(kindOrGuard)) {
            return sourceFileCache.get(kindOrGuard);
        }
    }
    const arr = [];
    if (test(node)) {
        arr.push(node);
        max--;
    }
    if (max > 0 && (recursive || !test(node))) {
        for (const child of node.getChildren()) {
            findNodes(child, test, max, recursive).forEach((node) => {
                if (max > 0) {
                    arr.push(node);
                }
                max--;
            });
            if (max <= 0) {
                break;
            }
        }
    }
    if (typescript_1.default.isSourceFile(node)) {
        let sourceFileCache = findNodesCache.get(node);
        if (!sourceFileCache) {
            sourceFileCache = new Map();
            findNodesCache.set(node, sourceFileCache);
        }
        sourceFileCache.set(kindOrGuard, arr);
    }
    return arr;
}
/**
 * Get all the nodes from a source.
 * @param sourceFile The source file object.
 * @returns {Array<ts.Node>} An array of all the nodes in the source.
 */
function getSourceNodes(sourceFile) {
    const nodes = [sourceFile];
    // NOTE: nodes.length changes inside of the loop but we only append to the end
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        nodes.push(...node.getChildren(sourceFile));
    }
    return nodes;
}
function findNode(node, kind, text) {
    if (node.kind === kind && node.getText() === text) {
        return node;
    }
    let foundNode = null;
    typescript_1.default.forEachChild(node, (childNode) => {
        foundNode = foundNode || findNode(childNode, kind, text);
    });
    return foundNode;
}
/**
 * Helper for sorting nodes.
 * @return function to sort nodes in increasing order of position in sourceFile
 */
function nodesByPosition(first, second) {
    return first.getStart() - second.getStart();
}
/**
 * Insert `toInsert` after the last occurence of `ts.SyntaxKind[nodes[i].kind]`
 * or after the last of occurence of `syntaxKind` if the last occurence is a sub child
 * of ts.SyntaxKind[nodes[i].kind] and save the changes in file.
 *
 * @param nodes insert after the last occurence of nodes
 * @param toInsert string to insert
 * @param file file to insert changes into
 * @param fallbackPos position to insert if toInsert happens to be the first occurence
 * @param syntaxKind the ts.SyntaxKind of the subchildren to insert after
 * @return Change instance
 * @throw Error if toInsert is first occurence but fall back is not set
 */
function insertAfterLastOccurrence(nodes, toInsert, file, fallbackPos, syntaxKind) {
    let lastItem;
    for (const node of nodes) {
        if (!lastItem || lastItem.getStart() < node.getStart()) {
            lastItem = node;
        }
    }
    if (syntaxKind && lastItem) {
        lastItem = findNodes(lastItem, syntaxKind).sort(nodesByPosition).pop();
    }
    if (!lastItem && fallbackPos == undefined) {
        throw new Error(`tried to insert ${toInsert} as first occurence with no fallback position`);
    }
    const lastItemPosition = lastItem ? lastItem.getEnd() : fallbackPos;
    return new change_1.InsertChange(file, lastItemPosition, toInsert);
}
function _angularImportsFromNode(node) {
    const ms = node.moduleSpecifier;
    let modulePath;
    switch (ms.kind) {
        case typescript_1.default.SyntaxKind.StringLiteral:
            modulePath = ms.text;
            break;
        default:
            return {};
    }
    if (!modulePath.startsWith('@angular/')) {
        return {};
    }
    if (node.importClause) {
        if (node.importClause.name) {
            // This is of the form `import Name from 'path'`. Ignore.
            return {};
        }
        else if (node.importClause.namedBindings) {
            const nb = node.importClause.namedBindings;
            if (nb.kind == typescript_1.default.SyntaxKind.NamespaceImport) {
                // This is of the form `import * as name from 'path'`. Return `name.`.
                return {
                    [nb.name.text + '.']: modulePath,
                };
            }
            else {
                // This is of the form `import {a,b,c} from 'path'`
                const namedImports = nb;
                return namedImports.elements
                    .map((is) => (is.propertyName ? is.propertyName.text : is.name.text))
                    .reduce((acc, curr) => {
                    acc[curr] = modulePath;
                    return acc;
                }, {});
            }
        }
        return {};
    }
    else {
        // This is of the form `import 'path';`. Nothing to do.
        return {};
    }
}
function getDecoratorMetadata(source, identifier, module) {
    const angularImports = findNodes(source, typescript_1.default.isImportDeclaration)
        .map((node) => _angularImportsFromNode(node))
        .reduce((acc, current) => {
        for (const key of Object.keys(current)) {
            acc[key] = current[key];
        }
        return acc;
    }, {});
    return getSourceNodes(source)
        .filter((node) => {
        return (node.kind == typescript_1.default.SyntaxKind.Decorator &&
            node.expression.kind == typescript_1.default.SyntaxKind.CallExpression);
    })
        .map((node) => node.expression)
        .filter((expr) => {
        if (expr.expression.kind == typescript_1.default.SyntaxKind.Identifier) {
            const id = expr.expression;
            return id.text == identifier && angularImports[id.text] === module;
        }
        else if (expr.expression.kind == typescript_1.default.SyntaxKind.PropertyAccessExpression) {
            // This covers foo.NgModule when importing * as foo.
            const paExpr = expr.expression;
            // If the left expression is not an identifier, just give up at that point.
            if (paExpr.expression.kind !== typescript_1.default.SyntaxKind.Identifier) {
                return false;
            }
            const id = paExpr.name.text;
            const moduleId = paExpr.expression.text;
            return id === identifier && angularImports[moduleId + '.'] === module;
        }
        return false;
    })
        .filter((expr) => expr.arguments[0] && expr.arguments[0].kind == typescript_1.default.SyntaxKind.ObjectLiteralExpression)
        .map((expr) => expr.arguments[0]);
}
function getMetadataField(node, metadataField) {
    return (node.properties
        .filter(typescript_1.default.isPropertyAssignment)
        // Filter out every fields that's not "metadataField". Also handles string literals
        // (but not expressions).
        .filter(({ name }) => {
        return (typescript_1.default.isIdentifier(name) || typescript_1.default.isStringLiteral(name)) && name.text === metadataField;
    }));
}
function addSymbolToNgModuleMetadata(source, ngModulePath, metadataField, symbolName, importPath = null) {
    const nodes = getDecoratorMetadata(source, 'NgModule', '@angular/core');
    const node = nodes[0];
    // Find the decorator declaration.
    if (!node || !typescript_1.default.isObjectLiteralExpression(node)) {
        return [];
    }
    // Get all the children property assignment of object literals.
    const matchingProperties = getMetadataField(node, metadataField);
    if (matchingProperties.length == 0) {
        // We haven't found the field in the metadata declaration. Insert a new field.
        let position;
        let toInsert;
        if (node.properties.length == 0) {
            position = node.getEnd() - 1;
            toInsert = `
  ${metadataField}: [
${' '.repeat(4)}${symbolName}
  ]
`;
        }
        else {
            const childNode = node.properties[node.properties.length - 1];
            position = childNode.getEnd();
            // Get the indentation of the last element, if any.
            const text = childNode.getFullText(source);
            const matches = text.match(/^(\r?\n)(\s*)/);
            if (matches) {
                toInsert =
                    `,${matches[0]}${metadataField}: [${matches[1]}` +
                        `${' '.repeat(matches[2].length + 2)}${symbolName}${matches[0]}]`;
            }
            else {
                toInsert = `, ${metadataField}: [${symbolName}]`;
            }
        }
        if (importPath !== null) {
            return [
                new change_1.InsertChange(ngModulePath, position, toInsert),
                insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath),
            ];
        }
        else {
            return [new change_1.InsertChange(ngModulePath, position, toInsert)];
        }
    }
    const assignment = matchingProperties[0];
    // If it's not an array, nothing we can do really.
    if (!typescript_1.default.isPropertyAssignment(assignment) ||
        !typescript_1.default.isArrayLiteralExpression(assignment.initializer)) {
        return [];
    }
    let expression;
    const assignmentInit = assignment.initializer;
    const elements = assignmentInit.elements;
    if (elements.length) {
        const symbolsArray = elements.map((node) => node.getText());
        if (symbolsArray.includes(symbolName)) {
            return [];
        }
        expression = elements[elements.length - 1];
    }
    else {
        expression = assignmentInit;
    }
    let toInsert;
    let position = expression.getEnd();
    if (typescript_1.default.isArrayLiteralExpression(expression)) {
        // We found the field but it's empty. Insert it just before the `]`.
        position--;
        toInsert = `\n${' '.repeat(4)}${symbolName}\n  `;
    }
    else {
        // Get the indentation of the last element, if any.
        const text = expression.getFullText(source);
        const matches = text.match(/^(\r?\n)(\s*)/);
        if (matches) {
            toInsert = `,${matches[1]}${' '.repeat(matches[2].length)}${symbolName}`;
        }
        else {
            toInsert = `, ${symbolName}`;
        }
    }
    if (importPath !== null) {
        return [
            new change_1.InsertChange(ngModulePath, position, toInsert),
            insertImport(source, ngModulePath, symbolName.replace(/\..*$/, ''), importPath),
        ];
    }
    return [new change_1.InsertChange(ngModulePath, position, toInsert)];
}
/**
 * Custom function to insert a declaration (component, pipe, directive)
 * into NgModule declarations. It also imports the component.
 */
function addDeclarationToModule(source, modulePath, classifiedName, importPath) {
    return addSymbolToNgModuleMetadata(source, modulePath, 'declarations', classifiedName, importPath);
}
/**
 * Custom function to insert an NgModule into NgModule imports. It also imports the module.
 */
function addImportToModule(source, modulePath, classifiedName, importPath) {
    return addSymbolToNgModuleMetadata(source, modulePath, 'imports', classifiedName, importPath);
}
/**
 * Custom function to insert a provider into NgModule. It also imports it.
 */
function addProviderToModule(source, modulePath, classifiedName, importPath) {
    return addSymbolToNgModuleMetadata(source, modulePath, 'providers', classifiedName, importPath);
}
/**
 * Custom function to insert an export into NgModule. It also imports it.
 */
function addExportToModule(source, modulePath, classifiedName, importPath) {
    return addSymbolToNgModuleMetadata(source, modulePath, 'exports', classifiedName, importPath);
}
/**
 * Custom function to insert an export into NgModule. It also imports it.
 */
function addBootstrapToModule(source, modulePath, classifiedName, importPath) {
    return addSymbolToNgModuleMetadata(source, modulePath, 'bootstrap', classifiedName, importPath);
}
/**
 * Determine if an import already exists.
 */
function isImported(source, classifiedName, importPath) {
    const allNodes = getSourceNodes(source);
    const matchingNodes = allNodes
        .filter(typescript_1.default.isImportDeclaration)
        .filter((imp) => typescript_1.default.isStringLiteral(imp.moduleSpecifier) && imp.moduleSpecifier.text === importPath)
        .filter((imp) => {
        if (!imp.importClause) {
            return false;
        }
        const nodes = findNodes(imp.importClause, typescript_1.default.isImportSpecifier).filter((n) => n.getText() === classifiedName);
        return nodes.length > 0;
    });
    return matchingNodes.length > 0;
}
/**
 * Returns the RouterModule declaration from NgModule metadata, if any.
 */
function getRouterModuleDeclaration(source) {
    const result = getDecoratorMetadata(source, 'NgModule', '@angular/core');
    const node = result[0];
    if (!node || !typescript_1.default.isObjectLiteralExpression(node)) {
        return undefined;
    }
    const matchingProperties = getMetadataField(node, 'imports');
    const assignment = matchingProperties[0];
    if (!assignment || assignment.initializer.kind !== typescript_1.default.SyntaxKind.ArrayLiteralExpression) {
        return;
    }
    const arrLiteral = assignment.initializer;
    return arrLiteral.elements
        .filter((el) => el.kind === typescript_1.default.SyntaxKind.CallExpression)
        .find((el) => el.getText().startsWith('RouterModule'));
}
/**
 * Adds a new route declaration to a router module (i.e. has a RouterModule declaration)
 */
function addRouteDeclarationToModule(source, fileToAdd, routeLiteral) {
    const routerModuleExpr = getRouterModuleDeclaration(source);
    if (!routerModuleExpr) {
        throw new Error(`Couldn't find a route declaration in ${fileToAdd}.\n` +
            `Use the '--module' option to specify a different routing module.`);
    }
    const scopeConfigMethodArgs = routerModuleExpr.arguments;
    if (!scopeConfigMethodArgs.length) {
        const { line } = source.getLineAndCharacterOfPosition(routerModuleExpr.getStart());
        throw new Error(`The router module method doesn't have arguments ` + `at line ${line} in ${fileToAdd}`);
    }
    let routesArr;
    const routesArg = scopeConfigMethodArgs[0];
    // Check if the route declarations array is
    // an inlined argument of RouterModule or a standalone variable
    if (typescript_1.default.isArrayLiteralExpression(routesArg)) {
        routesArr = routesArg;
    }
    else {
        const routesVarName = routesArg.getText();
        let routesVar;
        if (routesArg.kind === typescript_1.default.SyntaxKind.Identifier) {
            routesVar = source.statements.filter(typescript_1.default.isVariableStatement).find((v) => {
                return v.declarationList.declarations[0].name.getText() === routesVarName;
            });
        }
        if (!routesVar) {
            const { line } = source.getLineAndCharacterOfPosition(routesArg.getStart());
            throw new Error(`No route declaration array was found that corresponds ` +
                `to router module at line ${line} in ${fileToAdd}`);
        }
        routesArr = findNodes(routesVar, typescript_1.default.SyntaxKind.ArrayLiteralExpression, 1)[0];
    }
    const occurrencesCount = routesArr.elements.length;
    const text = routesArr.getFullText(source);
    let route = routeLiteral;
    let insertPos = routesArr.elements.pos;
    if (occurrencesCount > 0) {
        const lastRouteLiteral = [...routesArr.elements].pop();
        const lastRouteIsWildcard = typescript_1.default.isObjectLiteralExpression(lastRouteLiteral) &&
            lastRouteLiteral.properties.some((n) => typescript_1.default.isPropertyAssignment(n) &&
                typescript_1.default.isIdentifier(n.name) &&
                n.name.text === 'path' &&
                typescript_1.default.isStringLiteral(n.initializer) &&
                n.initializer.text === '**');
        const indentation = text.match(/\r?\n(\r?)\s*/) || [];
        const routeText = `${indentation[0] || ' '}${routeLiteral}`;
        // Add the new route before the wildcard route
        // otherwise we'll always redirect to the wildcard route
        if (lastRouteIsWildcard) {
            insertPos = lastRouteLiteral.pos;
            route = `${routeText},`;
        }
        else {
            insertPos = lastRouteLiteral.end;
            route = `,${routeText}`;
        }
    }
    return new change_1.InsertChange(fileToAdd, insertPos, route);
}
/** Asserts if the specified node is a named declaration (e.g. class, interface). */
function isNamedNode(node) {
    return !!node.name && typescript_1.default.isIdentifier(node.name);
}
/**
 * Determines if a SourceFile has a top-level declaration whose name matches a specific symbol.
 * Can be used to avoid conflicts when inserting new imports into a file.
 * @param sourceFile File in which to search.
 * @param symbolName Name of the symbol to search for.
 * @param skipModule Path of the module that the symbol may have been imported from. Used to
 * avoid false positives where the same symbol we're looking for may have been imported.
 */
function hasTopLevelIdentifier(sourceFile, symbolName, skipModule = null) {
    for (const node of sourceFile.statements) {
        if (isNamedNode(node) && node.name.text === symbolName) {
            return true;
        }
        if (typescript_1.default.isVariableStatement(node) &&
            node.declarationList.declarations.some((decl) => {
                return isNamedNode(decl) && decl.name.text === symbolName;
            })) {
            return true;
        }
        if (typescript_1.default.isImportDeclaration(node) &&
            typescript_1.default.isStringLiteralLike(node.moduleSpecifier) &&
            node.moduleSpecifier.text !== skipModule &&
            node.importClause?.namedBindings &&
            typescript_1.default.isNamedImports(node.importClause.namedBindings) &&
            node.importClause.namedBindings.elements.some((el) => el.name.text === symbolName)) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=ast-utils.js.map