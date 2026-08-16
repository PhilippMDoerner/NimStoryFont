"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = migrateTapResponse;
const index_1 = require("../../schematics-core/index");
const visitors_1 = require("../../schematics-core/utility/visitors");
const ts = __importStar(require("typescript"));
function migrateTapResponse() {
    return (tree, context) => {
        (0, index_1.visitTSSourceFiles)(tree, (sourceFile) => {
            const changes = [];
            const printer = ts.createPrinter();
            const tapResponseIdentifiers = new Set();
            const namespaceImportsFromOperators = new Set();
            const aliasedTapResponseVariables = new Set();
            const importOriginMap = new Map();
            // Collect import origins and aliases
            ts.forEachChild(sourceFile, (node) => {
                if (ts.isImportDeclaration(node) &&
                    ts.isStringLiteral(node.moduleSpecifier) &&
                    node.importClause?.namedBindings) {
                    const moduleName = node.moduleSpecifier.text;
                    const bindings = node.importClause.namedBindings;
                    if (ts.isNamedImports(bindings)) {
                        for (const element of bindings.elements) {
                            const importedName = element.name.text;
                            importOriginMap.set(importedName, moduleName);
                            if (moduleName === '@ngrx/operators') {
                                tapResponseIdentifiers.add(importedName);
                            }
                        }
                    }
                    else if (ts.isNamespaceImport(bindings)) {
                        if (moduleName === '@ngrx/operators') {
                            namespaceImportsFromOperators.add(bindings.name.text);
                        }
                    }
                }
                // Track variables assigned to known tapResponse identifiers from @ngrx/operators
                if (ts.isVariableStatement(node)) {
                    for (const decl of node.declarationList.declarations) {
                        if (ts.isIdentifier(decl.name) &&
                            decl.initializer &&
                            ts.isIdentifier(decl.initializer)) {
                            const original = decl.initializer.text;
                            if (tapResponseIdentifiers.has(original) &&
                                importOriginMap.get(original) === '@ngrx/operators') {
                                aliasedTapResponseVariables.add(decl.name.text);
                            }
                        }
                    }
                }
            });
            // Combine aliases into the main set
            for (const alias of aliasedTapResponseVariables) {
                tapResponseIdentifiers.add(alias);
            }
            (0, visitors_1.visitCallExpression)(sourceFile, (node) => {
                const { expression, arguments: args } = node;
                let isTapResponseCall = false;
                if (ts.isIdentifier(expression)) {
                    if (tapResponseIdentifiers.has(expression.text)) {
                        isTapResponseCall = true;
                    }
                }
                else if (ts.isPropertyAccessExpression(expression)) {
                    const namespace = expression.expression.getText();
                    const fnName = expression.name.text;
                    if (fnName === 'tapResponse' &&
                        namespaceImportsFromOperators.has(namespace)) {
                        isTapResponseCall = true;
                    }
                }
                if (isTapResponseCall &&
                    (args.length === 2 || args.length === 3) &&
                    args.every((arg) => ts.isArrowFunction(arg) || ts.isFunctionExpression(arg))) {
                    const props = [
                        ts.factory.createPropertyAssignment('next', args[0]),
                        ts.factory.createPropertyAssignment('error', args[1]),
                    ];
                    if (args[2]) {
                        props.push(ts.factory.createPropertyAssignment('complete', args[2]));
                    }
                    const newCall = ts.factory.updateCallExpression(node, expression, node.typeArguments, [ts.factory.createObjectLiteralExpression(props, true)]);
                    const newText = printer.printNode(ts.EmitHint.Expression, newCall, sourceFile);
                    changes.push((0, index_1.createReplaceChange)(sourceFile, node, node.getText(), newText));
                }
            });
            if (changes.length) {
                (0, index_1.commitChanges)(tree, sourceFile.fileName, changes);
                context.logger.info(`[ngrx/operators] Migrated deprecated tapResponse in ${sourceFile.fileName}`);
            }
        });
    };
}
//# sourceMappingURL=index.js.map