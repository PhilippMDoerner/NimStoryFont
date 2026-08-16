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
exports.transformFakeAsyncTest = transformFakeAsyncTest;
const typescript_1 = __importDefault(require("typescript"));
const ast_helpers_1 = require("../utils/ast-helpers");
const constants_1 = require("../utils/constants");
const refactor_helpers_1 = require("../utils/refactor-helpers");
function transformFakeAsyncTest(node, ctx, currentOutermostDescribeContext) {
    // Transform the outermost describe block and skip others.
    if (currentOutermostDescribeContext == null && _is.describe(node)) {
        return _transformDescribeCall(node, ctx);
    }
    // If we encounter a `fakeAsync` call while in a `describe` block, mark it in the context.
    if (typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === 'fakeAsync' &&
        currentOutermostDescribeContext != null &&
        node.arguments.length >= 1 &&
        _is.arrowOrFunction(node.arguments[0]) &&
        (0, ast_helpers_1.isNamedImportFrom)(ctx.sourceFile, 'fakeAsync', constants_1.ANGULAR_CORE_TESTING)) {
        return _transformFakeAsyncCall(node, ctx, currentOutermostDescribeContext);
    }
    // If we are in a `describe` block, visit the children recursively.
    if (currentOutermostDescribeContext != null) {
        return typescript_1.default.visitEachChild(node, (child) => transformFakeAsyncTest(child, ctx, currentOutermostDescribeContext), ctx.tsContext);
    }
    return node;
}
function _transformDescribeCall(node, ctx) {
    const currentOutermostDescribeContext = {
        isUsingFakeAsync: false,
    };
    // Visit children recursively to collect transform `fakeAsync usages
    // within the describe block and detect their presence through `isUsingFakeAsync`.
    node = typescript_1.default.visitEachChild(node, (child) => transformFakeAsyncTest(child, ctx, currentOutermostDescribeContext), ctx.tsContext);
    const { isUsingFakeAsync } = currentOutermostDescribeContext;
    const describeBlock = _findDescribeBlock(node);
    if (!isUsingFakeAsync || describeBlock === undefined) {
        return node;
    }
    (0, refactor_helpers_1.addImportSpecifierRemoval)(ctx, 'fakeAsync', constants_1.ANGULAR_CORE_TESTING);
    return typescript_1.default.factory.updateCallExpression(node, node.expression, node.typeArguments, [
        node.arguments[0],
        typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.default.factory.createBlock([
            ..._createFakeTimersHookStatements(ctx),
            ...describeBlock.statements,
        ])),
        ...node.arguments.slice(2),
    ]);
}
function _transformFakeAsyncCall(node, ctx, currentOutermostDescribeContext) {
    currentOutermostDescribeContext.isUsingFakeAsync = true;
    const fakeAsyncCallback = node.arguments[0];
    if (!_is.arrowOrFunction(fakeAsyncCallback)) {
        return node;
    }
    const callbackBody = typescript_1.default.isBlock(fakeAsyncCallback.body)
        ? fakeAsyncCallback.body
        : typescript_1.default.factory.createBlock([typescript_1.default.factory.createExpressionStatement(fakeAsyncCallback.body)]);
    ctx.reporter.reportTransformation(ctx.sourceFile, node, `Transformed \`fakeAsync\` to \`vi.useFakeTimers\`.`);
    let statements = callbackBody.statements;
    // Append `vi.runOnlyPendingTimersAsync()` as the last statement of `beforeEach` to mimic flush behavior.
    if (typescript_1.default.isCallExpression(node.parent) &&
        typescript_1.default.isIdentifier(node.parent.expression) &&
        node.parent.expression.text === 'beforeEach' &&
        !_isFakeAsyncFlushDisabled(node)) {
        statements = typescript_1.default.factory.createNodeArray([
            ...statements,
            typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createAwaitExpression((0, refactor_helpers_1.createViCallExpression)(ctx, 'runOnlyPendingTimersAsync'))),
        ]);
    }
    return typescript_1.default.factory.createArrowFunction([typescript_1.default.factory.createModifier(typescript_1.default.SyntaxKind.AsyncKeyword)], fakeAsyncCallback.typeParameters, fakeAsyncCallback.parameters, undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.default.factory.createBlock(statements));
}
function _createFakeTimersHookStatements(ctx) {
    return [
        // > beforeEach(() => {
        // >   vi.useFakeTimers({
        // >     advanceTimeDelta: 1,
        // >     shouldAdvanceTime: true
        // >   });
        // > });
        typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier('beforeEach'), undefined, [
            typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.default.factory.createBlock([
                typescript_1.default.factory.createExpressionStatement((0, refactor_helpers_1.createViCallExpression)(ctx, 'useFakeTimers', [
                    typescript_1.default.factory.createObjectLiteralExpression([
                        typescript_1.default.factory.createPropertyAssignment('advanceTimeDelta', typescript_1.default.factory.createNumericLiteral(1)),
                        typescript_1.default.factory.createPropertyAssignment('shouldAdvanceTime', typescript_1.default.factory.createTrue()),
                    ]),
                ])),
            ], true)),
        ])),
        // > afterEach(() => {
        // >   vi.useRealTimers();
        // > });
        typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier('afterEach'), undefined, [
            typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.default.factory.createBlock([typescript_1.default.factory.createExpressionStatement((0, refactor_helpers_1.createViCallExpression)(ctx, 'useRealTimers'))], true)),
        ])),
    ];
}
/**
 * Detects if the `flush` option is set to false in the `fakeAsync` call expression.
 * e.g. `fakeAsync(() => { ... }, { flush: false })`
 */
function _isFakeAsyncFlushDisabled(fakeAsyncCallExpression) {
    const options = fakeAsyncCallExpression.arguments[1];
    return (options &&
        typescript_1.default.isObjectLiteralExpression(options) &&
        options.properties.some((property) => typescript_1.default.isPropertyAssignment(property) &&
            property.name.getText() === 'flush' &&
            property.initializer.getText() === 'false'));
}
function _findDescribeBlock(node) {
    const args = node.arguments;
    const describeCallback = args.length >= 2 ? args[1] : undefined;
    if (describeCallback !== undefined && _is.arrowOrFunction(describeCallback)) {
        return _getFunctionBlock(describeCallback);
    }
    return undefined;
}
function _getFunctionBlock(node) {
    return typescript_1.default.isBlock(node.body)
        ? node.body
        : typescript_1.default.factory.createBlock([typescript_1.default.factory.createExpressionStatement(node.body)]);
}
const _is = {
    arrowOrFunction: (node) => typescript_1.default.isArrowFunction(node) || typescript_1.default.isFunctionExpression(node),
    describe: (node) => typescript_1.default.isCallExpression(node) &&
        // describe
        ((typescript_1.default.isIdentifier(node.expression) && node.expression.text === 'describe') ||
            // describe.only or describe.skip
            (typescript_1.default.isPropertyAccessExpression(node.expression) &&
                typescript_1.default.isIdentifier(node.expression.expression) &&
                node.expression.expression.text === 'describe')),
};
//# sourceMappingURL=fake-async-test.js.map