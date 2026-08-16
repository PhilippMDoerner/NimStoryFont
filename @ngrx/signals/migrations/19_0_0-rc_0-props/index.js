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
exports.migrate = migrate;
exports.default = default_1;
const schematics_1 = require("@angular-devkit/schematics");
const schematics_core_1 = require("../../schematics-core");
const visitors_1 = require("../../schematics-core/utility/visitors");
const ts = __importStar(require("typescript"));
function migratedToEntityProps(sourceFile) {
    const changes = [];
    (0, visitors_1.visitImportDeclaration)(sourceFile, (importDeclaration, moduleName) => {
        if (moduleName !== '@ngrx/signals/entities') {
            return;
        }
        (0, visitors_1.visitImportSpecifier)(importDeclaration, (importSpecifier) => {
            if (importSpecifier.name.getText() === 'EntityComputed') {
                changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, importSpecifier, importSpecifier.getText(), 'EntityProps'));
                (0, visitors_1.visitTypeReference)(sourceFile, (type) => {
                    if (type.typeName.getText() === 'EntityComputed') {
                        changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, type, type.typeName.getText(), 'EntityProps'));
                    }
                });
            }
            if (importSpecifier.name.getText() === 'NamedEntityComputed') {
                changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, importSpecifier, importSpecifier.getText(), 'NamedEntityProps'));
                (0, visitors_1.visitTypeReference)(sourceFile, (typeReference) => {
                    if (typeReference.typeName.getText() === 'NamedEntityComputed') {
                        changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, typeReference.typeName, typeReference.typeName.getText(), 'NamedEntityProps'));
                    }
                });
            }
        });
    });
    return changes;
}
function migrateToPropsInSignalStoreFeatureType(sourceFile) {
    const changes = [];
    (0, visitors_1.visitTypeReference)(sourceFile, (typeReference) => {
        if (typeReference.typeName.getText() !== 'SignalStoreFeature') {
            return;
        }
        (0, visitors_1.visitTypeLiteral)(typeReference, (typeLiteral) => {
            const typeLiteralChildren = typeLiteral.members;
            for (const propertySignature of typeLiteralChildren) {
                if (ts.isPropertySignature(propertySignature)) {
                    if (propertySignature.name.getText() === 'computed') {
                        changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, propertySignature.name, 'computed', 'props'));
                    }
                }
            }
        });
    });
    return changes;
}
function migrateToPropsInSignalStoreFeatureWithObjectLiteral(objectLiteral, sourceFile) {
    const computedKey = objectLiteral.properties
        .filter(ts.isPropertyAssignment)
        .find((property) => property.name.getText() === 'computed');
    if (computedKey) {
        return [(0, schematics_core_1.createReplaceChange)(sourceFile, computedKey, 'computed', 'props')];
    }
    return [];
}
function migrateToPropsInSignalStoreFeatureWithCallExpression(callExpression, sourceFile) {
    if (callExpression.expression.getText() === 'type') {
        const typeArgument = callExpression.typeArguments?.at(0);
        if (typeArgument && ts.isTypeLiteralNode(typeArgument)) {
            const computedKey = typeArgument.members
                .filter(ts.isPropertySignature)
                .find((propertySignature) => propertySignature.name.getText() === 'computed');
            if (computedKey) {
                return [
                    (0, schematics_core_1.createReplaceChange)(sourceFile, computedKey, 'computed', 'props'),
                ];
            }
        }
    }
    return [];
}
function migrateToPropsInSignalStoreFeatureFunction(sourceFile) {
    const changes = [];
    (0, visitors_1.visitCallExpression)(sourceFile, (callExpression) => {
        if (callExpression.expression.getText() !== 'signalStoreFeature') {
            return;
        }
        const objectLiteralOrCallExpression = callExpression.arguments[0];
        if (!objectLiteralOrCallExpression) {
            return;
        }
        if (ts.isObjectLiteralExpression(objectLiteralOrCallExpression)) {
            changes.push(...migrateToPropsInSignalStoreFeatureWithObjectLiteral(objectLiteralOrCallExpression, sourceFile));
        }
        else if (ts.isCallExpression(objectLiteralOrCallExpression)) {
            changes.push(...migrateToPropsInSignalStoreFeatureWithCallExpression(objectLiteralOrCallExpression, sourceFile));
        }
    });
    return changes;
}
function migrate() {
    return (tree, ctx) => {
        (0, schematics_core_1.visitTSSourceFiles)(tree, (sourceFile) => {
            const entityPropsChanges = migratedToEntityProps(sourceFile);
            const propsInSignalStoreFeatureTypeChanges = migrateToPropsInSignalStoreFeatureType(sourceFile);
            const propsInSignalStoreFeatureFunctionChanges = migrateToPropsInSignalStoreFeatureFunction(sourceFile);
            const changes = [
                ...entityPropsChanges,
                ...propsInSignalStoreFeatureTypeChanges,
                ...propsInSignalStoreFeatureFunctionChanges,
            ];
            (0, schematics_core_1.commitChanges)(tree, sourceFile.fileName, changes);
            if (entityPropsChanges.length) {
                ctx.logger.info(`[@ngrx/signals] Renamed '(Named)EntityComputed' to '(Named)EntityProps' in ${sourceFile.fileName}`);
            }
            if (propsInSignalStoreFeatureTypeChanges.length) {
                ctx.logger.info(`[@ngrx/signals] Renamed 'computed' to 'props' in SignalStoreFeature<> in ${sourceFile.fileName}`);
            }
            if (propsInSignalStoreFeatureFunctionChanges.length) {
                ctx.logger.info(`[@ngrx/signals] Renamed 'computed' to 'props' in signalStoreFeature() in ${sourceFile.fileName}`);
            }
        });
    };
}
function default_1() {
    return (0, schematics_1.chain)([migrate()]);
}
//# sourceMappingURL=index.js.map