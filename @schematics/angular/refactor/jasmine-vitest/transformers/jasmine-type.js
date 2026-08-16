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
exports.transformJasmineTypes = transformJasmineTypes;
/**
 * @fileoverview This file contains a transformer that migrates Jasmine type definitions to
 * their Vitest equivalents. It handles the conversion of types like `jasmine.Spy` and
 * `jasmine.SpyObj` to Vitest's `Mock` and `MockedObject` types, and ensures that the
 * necessary `vitest` imports are added to the file.
 */
const typescript_1 = __importDefault(require("typescript"));
const ast_helpers_1 = require("../utils/ast-helpers");
function transformJasmineTypes(node, { sourceFile, reporter, pendingVitestTypeImports }) {
    const typeNameNode = typescript_1.default.isTypeReferenceNode(node) ? node.typeName : node;
    if (!typescript_1.default.isQualifiedName(typeNameNode) ||
        !typescript_1.default.isIdentifier(typeNameNode.left) ||
        typeNameNode.left.text !== 'jasmine') {
        return node;
    }
    const jasmineTypeName = typeNameNode.right.text;
    switch (jasmineTypeName) {
        case 'Spy': {
            const vitestTypeName = 'Mock';
            reporter.reportTransformation(sourceFile, node, `Transformed type \`jasmine.Spy\` to \`${vitestTypeName}\`.`);
            (0, ast_helpers_1.addVitestTypeImport)(pendingVitestTypeImports, vitestTypeName);
            return typescript_1.default.factory.createIdentifier(vitestTypeName);
        }
        case 'SpyObj': {
            const vitestTypeName = 'MockedObject';
            reporter.reportTransformation(sourceFile, node, `Transformed type \`jasmine.SpyObj\` to \`${vitestTypeName}\`.`);
            (0, ast_helpers_1.addVitestTypeImport)(pendingVitestTypeImports, vitestTypeName);
            if (typescript_1.default.isTypeReferenceNode(node)) {
                return typescript_1.default.factory.updateTypeReferenceNode(node, typescript_1.default.factory.createIdentifier(vitestTypeName), node.typeArguments);
            }
            return typescript_1.default.factory.createIdentifier(vitestTypeName);
        }
        case 'Any':
            reporter.reportTransformation(sourceFile, node, `Transformed type \`jasmine.Any\` to \`any\`.`);
            return typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.AnyKeyword);
        case 'ObjectContaining': {
            const typeArguments = typescript_1.default.isTypeReferenceNode(node) ? node.typeArguments : undefined;
            if (typeArguments && typeArguments.length > 0) {
                reporter.reportTransformation(sourceFile, node, `Transformed type \`jasmine.ObjectContaining\` to \`Partial\`.`);
                return typescript_1.default.factory.createTypeReferenceNode('Partial', typeArguments);
            }
            reporter.reportTransformation(sourceFile, node, `Transformed type \`jasmine.ObjectContaining\` to \`object\`.`);
            return typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.ObjectKeyword);
        }
        case 'DoneFn':
            reporter.reportTransformation(sourceFile, node, 'Transformed type `jasmine.DoneFn` to `() => void`.');
            return typescript_1.default.factory.createFunctionTypeNode(undefined, [], typescript_1.default.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.VoidKeyword));
    }
    return node;
}
//# sourceMappingURL=jasmine-type.js.map