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
exports.addImportSpecifierRemoval = addImportSpecifierRemoval;
exports.createViCallExpression = createViCallExpression;
exports.requireVitestIdentifier = requireVitestIdentifier;
const typescript_1 = __importDefault(require("typescript"));
/**
 * Marks an identifier to be removed from an import specifier.
 *
 * @param ctx The refactor context object.
 * @param name The name of the identifier to remove from the import specifier.
 * @param moduleSpecifier The module specifier to remove the identifier from.
 */
function addImportSpecifierRemoval(ctx, name, moduleSpecifier) {
    const removals = ctx.pendingImportSpecifierRemovals.get(moduleSpecifier) ?? new Set();
    removals.add(name);
    ctx.pendingImportSpecifierRemovals.set(moduleSpecifier, removals);
}
/**
 * Creates a call expression to a vitest method.
 * This also adds the `vi` identifier to the context object,
 * to import it later if addImports option is enabled.
 *
 * @param ctx The refactor context object.
 * @param args The arguments to pass to the method.
 * @param typeArgs The type arguments to pass to the method.
 * @param methodeName The name of the vitest method to call.
 * @returns The created identifier node.
 */
function createViCallExpression(ctx, methodName, args = [], typeArgs = undefined) {
    const vi = requireVitestIdentifier(ctx, 'vi');
    const callee = typescript_1.default.factory.createPropertyAccessExpression(vi, methodName);
    return typescript_1.default.factory.createCallExpression(callee, typeArgs, args);
}
/**
 * Creates an identifier for a vitest value import.
 * This also adds the identifier to the context object,
 * to import it later if addImports option is enabled.
 *
 * @param ctx The refactor context object.
 * @param name The name of the vitest identifier to require.
 * @returns The created identifier node.
 */
function requireVitestIdentifier(ctx, name) {
    ctx.pendingVitestValueImports.add(name);
    return typescript_1.default.factory.createIdentifier(name);
}
//# sourceMappingURL=refactor-helpers.js.map