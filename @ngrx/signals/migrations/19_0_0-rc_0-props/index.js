"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = migrate;
exports.default = default_1;
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
var visitors_1 = require("../../schematics-core/utility/visitors");
var ts = require("typescript");
function migratedToEntityProps(sourceFile) {
    var changes = [];
    (0, visitors_1.visitImportDeclaration)(sourceFile, function (importDeclaration, moduleName) {
        if (moduleName !== '@ngrx/signals/entities') {
            return;
        }
        (0, visitors_1.visitImportSpecifier)(importDeclaration, function (importSpecifier) {
            if (importSpecifier.name.getText() === 'EntityComputed') {
                changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, importSpecifier, importSpecifier.getText(), 'EntityProps'));
                (0, visitors_1.visitTypeReference)(sourceFile, function (type) {
                    if (type.typeName.getText() === 'EntityComputed') {
                        changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, type, type.typeName.getText(), 'EntityProps'));
                    }
                });
            }
            if (importSpecifier.name.getText() === 'NamedEntityComputed') {
                changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, importSpecifier, importSpecifier.getText(), 'NamedEntityProps'));
                (0, visitors_1.visitTypeReference)(sourceFile, function (typeReference) {
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
    var changes = [];
    (0, visitors_1.visitTypeReference)(sourceFile, function (typeReference) {
        if (typeReference.typeName.getText() !== 'SignalStoreFeature') {
            return;
        }
        (0, visitors_1.visitTypeLiteral)(typeReference, function (typeLiteral) {
            var e_1, _a;
            var typeLiteralChildren = typeLiteral.members;
            try {
                for (var typeLiteralChildren_1 = __values(typeLiteralChildren), typeLiteralChildren_1_1 = typeLiteralChildren_1.next(); !typeLiteralChildren_1_1.done; typeLiteralChildren_1_1 = typeLiteralChildren_1.next()) {
                    var propertySignature = typeLiteralChildren_1_1.value;
                    if (ts.isPropertySignature(propertySignature)) {
                        if (propertySignature.name.getText() === 'computed') {
                            changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, propertySignature.name, 'computed', 'props'));
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (typeLiteralChildren_1_1 && !typeLiteralChildren_1_1.done && (_a = typeLiteralChildren_1.return)) _a.call(typeLiteralChildren_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    });
    return changes;
}
function migrateToPropsInSignalStoreFeatureWithObjectLiteral(objectLiteral, sourceFile) {
    var computedKey = objectLiteral.properties
        .filter(ts.isPropertyAssignment)
        .find(function (property) { return property.name.getText() === 'computed'; });
    if (computedKey) {
        return [(0, schematics_core_1.createReplaceChange)(sourceFile, computedKey, 'computed', 'props')];
    }
    return [];
}
function migrateToPropsInSignalStoreFeatureWithCallExpression(callExpression, sourceFile) {
    var _a;
    if (callExpression.expression.getText() === 'type') {
        var typeArgument = (_a = callExpression.typeArguments) === null || _a === void 0 ? void 0 : _a.at(0);
        if (typeArgument && ts.isTypeLiteralNode(typeArgument)) {
            var computedKey = typeArgument.members
                .filter(ts.isPropertySignature)
                .find(function (propertySignature) { return propertySignature.name.getText() === 'computed'; });
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
    var changes = [];
    (0, visitors_1.visitCallExpression)(sourceFile, function (callExpression) {
        if (callExpression.expression.getText() !== 'signalStoreFeature') {
            return;
        }
        var objectLiteralOrCallExpression = callExpression.arguments[0];
        if (!objectLiteralOrCallExpression) {
            return;
        }
        if (ts.isObjectLiteralExpression(objectLiteralOrCallExpression)) {
            changes.push.apply(changes, __spreadArray([], __read(migrateToPropsInSignalStoreFeatureWithObjectLiteral(objectLiteralOrCallExpression, sourceFile)), false));
        }
        else if (ts.isCallExpression(objectLiteralOrCallExpression)) {
            changes.push.apply(changes, __spreadArray([], __read(migrateToPropsInSignalStoreFeatureWithCallExpression(objectLiteralOrCallExpression, sourceFile)), false));
        }
    });
    return changes;
}
function migrate() {
    return function (tree, ctx) {
        (0, schematics_core_1.visitTSSourceFiles)(tree, function (sourceFile) {
            var entityPropsChanges = migratedToEntityProps(sourceFile);
            var propsInSignalStoreFeatureTypeChanges = migrateToPropsInSignalStoreFeatureType(sourceFile);
            var propsInSignalStoreFeatureFunctionChanges = migrateToPropsInSignalStoreFeatureFunction(sourceFile);
            var changes = __spreadArray(__spreadArray(__spreadArray([], __read(entityPropsChanges), false), __read(propsInSignalStoreFeatureTypeChanges), false), __read(propsInSignalStoreFeatureFunctionChanges), false);
            (0, schematics_core_1.commitChanges)(tree, sourceFile.fileName, changes);
            if (entityPropsChanges.length) {
                ctx.logger.info("[@ngrx/signals] Renamed '(Named)EntityComputed' to '(Named)EntityProps' in ".concat(sourceFile.fileName));
            }
            if (propsInSignalStoreFeatureTypeChanges.length) {
                ctx.logger.info("[@ngrx/signals] Renamed 'computed' to 'props' in SignalStoreFeature<> in ".concat(sourceFile.fileName));
            }
            if (propsInSignalStoreFeatureFunctionChanges.length) {
                ctx.logger.info("[@ngrx/signals] Renamed 'computed' to 'props' in signalStoreFeature() in ".concat(sourceFile.fileName));
            }
        });
    };
}
function default_1() {
    return (0, schematics_1.chain)([migrate()]);
}
//# sourceMappingURL=index.js.map