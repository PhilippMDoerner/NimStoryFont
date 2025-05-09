"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = migrateWritableStateSource;
var schematics_core_1 = require("../../schematics-core");
var ts = require("typescript");
var schematics_core_2 = require("../../schematics-core");
var visitors_1 = require("../../schematics-core/utility/visitors");
function migrateWritableStateSource() {
    return function (tree, ctx) {
        (0, schematics_core_1.visitTSSourceFiles)(tree, function (sourceFile) {
            var signalStoreImportedName = findImportedName(sourceFile);
            if (!signalStoreImportedName) {
                return;
            }
            var changes = [];
            visitCallExpression(sourceFile, signalStoreImportedName, function (node) {
                if (node.arguments.length > 0) {
                    if (ts.isObjectLiteralExpression(node.arguments[0])) {
                        // signalStore({ providedIn: 'root' })
                        var providedInProperty = node.arguments[0].properties[0];
                        if (ts.isPropertyAssignment(providedInProperty) &&
                            ts.isIdentifier(providedInProperty.name) &&
                            providedInProperty.name.text === 'providedIn') {
                            changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, providedInProperty, providedInProperty.getText(), "".concat(providedInProperty.getText(), ", protectedState: false")));
                        }
                    }
                    else {
                        // signalStore(withState({}))
                        var firstFeature = node.arguments[0];
                        changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, firstFeature, firstFeature.getText(), "{ protectedState: false }, ".concat(firstFeature.getText())));
                    }
                }
                else {
                    // signalStore()
                    changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, node, node.getText(), "".concat(signalStoreImportedName, "({ protectedState: false })")));
                }
            });
            if (changes.length) {
                (0, schematics_core_2.commitChanges)(tree, sourceFile.fileName, changes);
                ctx.logger.info("[@ngrx/signals] Disable protected state in ".concat(sourceFile.fileName));
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
    ts.forEachChild(node, function (child) {
        visitCallExpression(child, name, callback);
    });
}
function findImportedName(source) {
    var importedName = '';
    (0, visitors_1.visitImportDeclaration)(source, function (importDeclaration) {
        var _a;
        if (importDeclaration.moduleSpecifier.getText().includes('@ngrx/signals')) {
            if (importedName) {
                return;
            }
            var namedBindings = (_a = importDeclaration.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings;
            if (namedBindings && ts.isNamedImports(namedBindings)) {
                var foundImportedName = namedBindings.elements
                    .map(function (importSpecifier) {
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