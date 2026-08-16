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
exports.default = migrateWritableStateSource;
const schematics_core_1 = require("../../schematics-core");
const ts = __importStar(require("typescript"));
const visitors_1 = require("../../schematics-core/utility/visitors");
function migrateWritableStateSource() {
    return (tree, ctx) => {
        (0, schematics_core_1.visitTSSourceFiles)(tree, (sourceFile) => {
            const signalStoreImportedName = findImportedName(sourceFile);
            if (!signalStoreImportedName) {
                return;
            }
            const changes = [];
            visitCallExpression(sourceFile, signalStoreImportedName, (node) => {
                if (node.arguments.length > 0) {
                    if (ts.isObjectLiteralExpression(node.arguments[0])) {
                        // signalStore({ providedIn: 'root' })
                        const providedInProperty = node.arguments[0].properties[0];
                        if (ts.isPropertyAssignment(providedInProperty) &&
                            ts.isIdentifier(providedInProperty.name) &&
                            providedInProperty.name.text === 'providedIn') {
                            changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, providedInProperty, providedInProperty.getText(), `${providedInProperty.getText()}, protectedState: false`));
                        }
                    }
                    else {
                        // signalStore(withState({}))
                        const firstFeature = node.arguments[0];
                        changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, firstFeature, firstFeature.getText(), `{ protectedState: false }, ${firstFeature.getText()}`));
                    }
                }
                else {
                    // signalStore()
                    changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, node, node.getText(), `${signalStoreImportedName}({ protectedState: false })`));
                }
            });
            if (changes.length) {
                (0, schematics_core_1.commitChanges)(tree, sourceFile.fileName, changes);
                ctx.logger.info(`[@ngrx/signals] Disable protected state in ${sourceFile.fileName}`);
            }
        });
    };
}
function visitCallExpression(node, name, callback) {
    if (ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === name) {
        callback(node);
    }
    ts.forEachChild(node, (child) => {
        visitCallExpression(child, name, callback);
    });
}
function findImportedName(source) {
    let importedName = '';
    (0, visitors_1.visitImportDeclaration)(source, (importDeclaration) => {
        if (importDeclaration.moduleSpecifier.getText().includes('@ngrx/signals')) {
            if (importedName) {
                return;
            }
            const namedBindings = importDeclaration.importClause?.namedBindings;
            if (namedBindings && ts.isNamedImports(namedBindings)) {
                const foundImportedName = namedBindings.elements
                    .map((importSpecifier) => {
                    if (importSpecifier.propertyName &&
                        importSpecifier.propertyName.text === 'signalStore') {
                        return importSpecifier.name.text;
                    }
                    else if (importSpecifier.name.text === 'signalStore') {
                        return 'signalStore';
                    }
                    return undefined;
                })
                    .find(Boolean);
                if (foundImportedName) {
                    importedName = foundImportedName;
                    return;
                }
            }
        }
    });
    return importedName;
}
//# sourceMappingURL=index.js.map