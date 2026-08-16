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
exports.default = migrateWithEventHandlers;
const schematics_core_1 = require("../../schematics-core");
const ts = __importStar(require("typescript"));
const EVENTS_PKG = '@ngrx/signals/events';
const OLD_NAME = 'withEffects';
const NEW_NAME = 'withEventHandlers';
function migrateWithEventHandlers() {
    return (tree, ctx) => {
        (0, schematics_core_1.visitTSSourceFiles)(tree, (sourceFile) => {
            const changes = [];
            const namespaceImports = new Set();
            const directImports = new Set();
            const importDeclarations = (0, schematics_core_1.findNodes)(sourceFile, ts.SyntaxKind.ImportDeclaration);
            for (const decl of importDeclarations) {
                const moduleSpecifier = decl.moduleSpecifier;
                if (!moduleSpecifier || moduleSpecifier.text !== EVENTS_PKG) {
                    continue;
                }
                const importClause = decl.importClause;
                if (!importClause || !importClause.namedBindings) {
                    continue;
                }
                if (ts.isNamedImports(importClause.namedBindings)) {
                    const named = importClause.namedBindings;
                    named.elements.forEach((spec) => {
                        const importedName = spec.propertyName ?? spec.name;
                        const localName = spec.name;
                        const hasAlias = spec.propertyName !== undefined;
                        if (importedName.text === OLD_NAME) {
                            changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, importedName, importedName.getText(), NEW_NAME));
                            if (!hasAlias) {
                                directImports.add(localName.text);
                            }
                        }
                    });
                }
                if (ts.isNamespaceImport(importClause.namedBindings)) {
                    namespaceImports.add(importClause.namedBindings.name.text);
                }
            }
            if (directImports.size > 0) {
                const callExpressions = (0, schematics_core_1.findNodes)(sourceFile, ts.SyntaxKind.CallExpression);
                callExpressions.forEach((call) => {
                    if (ts.isIdentifier(call.expression) &&
                        directImports.has(call.expression.text)) {
                        changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, call.expression, call.expression.getText(), NEW_NAME));
                    }
                });
            }
            if (namespaceImports.size > 0) {
                const propertyAccesses = (0, schematics_core_1.findNodes)(sourceFile, ts.SyntaxKind.PropertyAccessExpression);
                propertyAccesses.forEach((pa) => {
                    if (ts.isIdentifier(pa.expression) &&
                        namespaceImports.has(pa.expression.text) &&
                        ts.isIdentifier(pa.name) &&
                        pa.name.text === OLD_NAME) {
                        changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, pa.name, pa.name.getText(), NEW_NAME));
                    }
                });
            }
            if (changes.length) {
                (0, schematics_core_1.commitChanges)(tree, sourceFile.fileName, changes);
                ctx.logger.info(`[@ngrx/signals] Renamed '${OLD_NAME}' to '${NEW_NAME}' in /${sourceFile.fileName}`);
            }
        });
    };
}
//# sourceMappingURL=index.js.map