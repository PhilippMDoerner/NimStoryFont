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
exports.transformFocusedAndSkippedTests = transformFocusedAndSkippedTests;
exports.transformPending = transformPending;
exports.transformDoneCallback = transformDoneCallback;
/**
 * @fileoverview This file contains transformers that convert Jasmine lifecycle functions
 * and test setup/teardown patterns to their Vitest equivalents. This includes handling
 * focused/skipped tests (fdescribe, fit, xdescribe, xit), pending tests, and asynchronous
 * operations that use the `done` callback.
 */
const typescript_1 = __importDefault(require("typescript"));
const ast_helpers_1 = require("../utils/ast-helpers");
const comment_helpers_1 = require("../utils/comment-helpers");
const FOCUSED_SKIPPED_RENAMES = new Map([
    ['fdescribe', { newBase: 'describe', newName: 'only' }],
    ['fit', { newBase: 'it', newName: 'only' }],
    ['xdescribe', { newBase: 'describe', newName: 'skip' }],
    ['xit', { newBase: 'it', newName: 'skip' }],
]);
function transformFocusedAndSkippedTests(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isCallExpression(node) || !typescript_1.default.isIdentifier(node.expression)) {
        return node;
    }
    const oldName = node.expression.text;
    const rename = FOCUSED_SKIPPED_RENAMES.get(oldName);
    if (rename) {
        reporter.reportTransformation(sourceFile, node, `Transformed \`${oldName}\` to \`${rename.newBase}.${rename.newName}\`.`);
        const newPropAccess = (0, ast_helpers_1.createPropertyAccess)(rename.newBase, rename.newName);
        return typescript_1.default.factory.updateCallExpression(node, newPropAccess, node.typeArguments, node.arguments);
    }
    return node;
}
function transformPending(node, { sourceFile, reporter, tsContext }) {
    if (!typescript_1.default.isCallExpression(node) ||
        !typescript_1.default.isIdentifier(node.expression) ||
        node.expression.text !== 'it') {
        return node;
    }
    const testFn = node.arguments[1];
    if (!testFn || (!typescript_1.default.isArrowFunction(testFn) && !typescript_1.default.isFunctionExpression(testFn))) {
        return node;
    }
    let hasPending = false;
    const bodyTransformVisitor = (bodyNode) => {
        if (typescript_1.default.isExpressionStatement(bodyNode) &&
            typescript_1.default.isCallExpression(bodyNode.expression) &&
            typescript_1.default.isIdentifier(bodyNode.expression.expression) &&
            bodyNode.expression.expression.text === 'pending') {
            hasPending = true;
            const replacement = typescript_1.default.factory.createEmptyStatement();
            reporter.reportTransformation(sourceFile, bodyNode, 'Converted `pending()` to a skipped test (`it.skip`).');
            const category = 'pending';
            reporter.recordTodo(category, sourceFile, bodyNode);
            (0, comment_helpers_1.addTodoComment)(replacement, category);
            (0, comment_helpers_1.addCommentedNodeText)(replacement, bodyNode);
            return replacement;
        }
        return typescript_1.default.visitEachChild(bodyNode, bodyTransformVisitor, tsContext);
    };
    const newBody = typescript_1.default.visitNode(testFn.body, bodyTransformVisitor);
    if (!hasPending) {
        return node;
    }
    const newExpression = (0, ast_helpers_1.createPropertyAccess)(node.expression, 'skip');
    const newTestFn = typescript_1.default.isArrowFunction(testFn)
        ? typescript_1.default.factory.updateArrowFunction(testFn, testFn.modifiers, testFn.typeParameters, testFn.parameters, testFn.type, testFn.equalsGreaterThanToken, newBody ?? typescript_1.default.factory.createBlock([]))
        : typescript_1.default.factory.updateFunctionExpression(testFn, testFn.modifiers, testFn.asteriskToken, testFn.name, testFn.typeParameters, testFn.parameters, testFn.type, newBody ?? typescript_1.default.factory.createBlock([]));
    const newArgs = [node.arguments[0], newTestFn, ...node.arguments.slice(2)];
    return typescript_1.default.factory.updateCallExpression(node, newExpression, node.typeArguments, newArgs);
}
function transformComplexDoneCallback(node, doneIdentifier, refactorCtx) {
    const { sourceFile, reporter } = refactorCtx;
    if (!typescript_1.default.isExpressionStatement(node) ||
        !typescript_1.default.isCallExpression(node.expression) ||
        !typescript_1.default.isPropertyAccessExpression(node.expression.expression)) {
        return node;
    }
    const call = node.expression;
    const pae = call.expression;
    if (!typescript_1.default.isPropertyAccessExpression(pae)) {
        return node;
    }
    if (pae.name.text !== 'then' || call.arguments.length !== 1) {
        return node;
    }
    const thenCallback = call.arguments[0];
    if (!typescript_1.default.isArrowFunction(thenCallback) && !typescript_1.default.isFunctionExpression(thenCallback)) {
        return node;
    }
    // Re-create the .then() call but with a modified callback that has `done()` removed.
    const thenCallbackBody = typescript_1.default.isBlock(thenCallback.body)
        ? thenCallback.body
        : typescript_1.default.factory.createBlock([typescript_1.default.factory.createExpressionStatement(thenCallback.body)]);
    const newStatements = thenCallbackBody.statements.filter((stmt) => {
        return (!typescript_1.default.isExpressionStatement(stmt) ||
            !typescript_1.default.isCallExpression(stmt.expression) ||
            !typescript_1.default.isIdentifier(stmt.expression.expression) ||
            stmt.expression.expression.text !== doneIdentifier.text);
    });
    if (newStatements.length === thenCallbackBody.statements.length) {
        // No "done()" call was removed, so don't transform.
        return node;
    }
    reporter.reportTransformation(sourceFile, node, 'Transformed promise `.then()` with `done()` to `await`.');
    const newThenCallback = typescript_1.default.isArrowFunction(thenCallback)
        ? typescript_1.default.factory.updateArrowFunction(thenCallback, thenCallback.modifiers, thenCallback.typeParameters, thenCallback.parameters, thenCallback.type, thenCallback.equalsGreaterThanToken, typescript_1.default.factory.updateBlock(thenCallbackBody, newStatements))
        : typescript_1.default.factory.updateFunctionExpression(thenCallback, thenCallback.modifiers, thenCallback.asteriskToken, thenCallback.name, thenCallback.typeParameters, thenCallback.parameters, thenCallback.type, typescript_1.default.factory.updateBlock(thenCallbackBody, newStatements));
    const newCall = typescript_1.default.factory.updateCallExpression(call, call.expression, call.typeArguments, [
        newThenCallback,
    ]);
    return typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createAwaitExpression(newCall));
}
function transformPromiseBasedDone(callExpr, doneIdentifier, refactorCtx) {
    const { sourceFile, reporter } = refactorCtx;
    if (typescript_1.default.isPropertyAccessExpression(callExpr.expression) &&
        (callExpr.expression.name.text === 'then' || callExpr.expression.name.text === 'catch')) {
        const promiseHandler = callExpr.arguments[0];
        if (promiseHandler) {
            let isDoneHandler = false;
            // promise.then(done)
            if (typescript_1.default.isIdentifier(promiseHandler) && promiseHandler.text === doneIdentifier.text) {
                isDoneHandler = true;
            }
            // promise.catch(done.fail)
            if (typescript_1.default.isPropertyAccessExpression(promiseHandler) &&
                typescript_1.default.isIdentifier(promiseHandler.expression) &&
                promiseHandler.expression.text === doneIdentifier.text &&
                promiseHandler.name.text === 'fail') {
                isDoneHandler = true;
            }
            // promise.then(() => done())
            if (typescript_1.default.isArrowFunction(promiseHandler) && !promiseHandler.parameters.length) {
                const body = promiseHandler.body;
                if (typescript_1.default.isCallExpression(body) &&
                    typescript_1.default.isIdentifier(body.expression) &&
                    body.expression.text === doneIdentifier.text) {
                    isDoneHandler = true;
                }
                if (typescript_1.default.isBlock(body) && body.statements.length === 1) {
                    const stmt = body.statements[0];
                    if (typescript_1.default.isExpressionStatement(stmt) &&
                        typescript_1.default.isCallExpression(stmt.expression) &&
                        typescript_1.default.isIdentifier(stmt.expression.expression) &&
                        stmt.expression.expression.text === doneIdentifier.text) {
                        isDoneHandler = true;
                    }
                }
            }
            if (isDoneHandler) {
                reporter.reportTransformation(sourceFile, callExpr, 'Transformed promise `.then(done)` to `await`.');
                return typescript_1.default.factory.createExpressionStatement(typescript_1.default.factory.createAwaitExpression(callExpr.expression.expression));
            }
        }
    }
    return undefined;
}
function countDoneUsages(node, doneIdentifier) {
    let count = 0;
    const visitor = (n) => {
        if (typescript_1.default.isIdentifier(n) && n.text === doneIdentifier.text) {
            count++;
        }
        typescript_1.default.forEachChild(n, visitor);
    };
    typescript_1.default.forEachChild(node, visitor);
    return count;
}
function transformDoneCallback(node, refactorCtx) {
    const { sourceFile, reporter, tsContext } = refactorCtx;
    if (!typescript_1.default.isCallExpression(node) ||
        !typescript_1.default.isIdentifier(node.expression) ||
        !['it', 'beforeEach', 'afterEach', 'beforeAll', 'afterAll'].includes(node.expression.text)) {
        return node;
    }
    const functionArg = node.arguments.find((arg) => typescript_1.default.isArrowFunction(arg) || typescript_1.default.isFunctionExpression(arg));
    if (!functionArg || (!typescript_1.default.isArrowFunction(functionArg) && !typescript_1.default.isFunctionExpression(functionArg))) {
        return node;
    }
    if (functionArg.parameters.length !== 1) {
        return node;
    }
    const doneParam = functionArg.parameters[0];
    if (!typescript_1.default.isIdentifier(doneParam.name)) {
        return node;
    }
    const doneIdentifier = doneParam.name;
    // Count total usages of 'done' in the body
    const totalUsages = countDoneUsages(functionArg.body, doneIdentifier);
    let handledUsages = 0;
    let doneWasUsed = false;
    const bodyVisitor = (bodyNode) => {
        const complexTransformed = transformComplexDoneCallback(bodyNode, doneIdentifier, refactorCtx);
        if (complexTransformed !== bodyNode) {
            doneWasUsed = true;
            handledUsages++; // complex transform handles one usage
            return complexTransformed;
        }
        if (typescript_1.default.isExpressionStatement(bodyNode) && typescript_1.default.isCallExpression(bodyNode.expression)) {
            const callExpr = bodyNode.expression;
            // Transform `done.fail('message')` to `throw new Error('message')`
            if (typescript_1.default.isPropertyAccessExpression(callExpr.expression) &&
                typescript_1.default.isIdentifier(callExpr.expression.expression) &&
                callExpr.expression.expression.text === doneIdentifier.text &&
                callExpr.expression.name.text === 'fail') {
                doneWasUsed = true;
                handledUsages++;
                reporter.reportTransformation(sourceFile, bodyNode, 'Transformed `done.fail()` to `throw new Error()`.');
                const errorArgs = callExpr.arguments.length > 0 ? [callExpr.arguments[0]] : [];
                return typescript_1.default.factory.createThrowStatement(typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier('Error'), undefined, errorArgs));
            }
            // Transform `promise.then(done)` or `promise.catch(done.fail)` to `await promise`
            const promiseTransformed = transformPromiseBasedDone(callExpr, doneIdentifier, refactorCtx);
            if (promiseTransformed) {
                doneWasUsed = true;
                handledUsages++;
                return promiseTransformed;
            }
            // Remove `done()`
            if (typescript_1.default.isIdentifier(callExpr.expression) &&
                callExpr.expression.text === doneIdentifier.text) {
                doneWasUsed = true;
                handledUsages++;
                return typescript_1.default.setTextRange(typescript_1.default.factory.createEmptyStatement(), callExpr.expression);
            }
        }
        return typescript_1.default.visitEachChild(bodyNode, bodyVisitor, tsContext);
    };
    const newBody = typescript_1.default.visitNode(functionArg.body, (node) => {
        if (typescript_1.default.isBlock(node)) {
            const newStatements = node.statements.flatMap((stmt) => bodyVisitor(stmt));
            return typescript_1.default.factory.updateBlock(node, newStatements.filter((s) => !!s));
        }
        return bodyVisitor(node);
    });
    // Safety check: if we found usages but didn't handle all of them, abort.
    if (handledUsages < totalUsages) {
        reporter.reportTransformation(sourceFile, node, `Found unhandled usage of \`${doneIdentifier.text}\` callback. Skipping transformation.`);
        const category = 'unhandled-done-usage';
        reporter.recordTodo(category, sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, category);
        return node;
    }
    if (!doneWasUsed) {
        return node;
    }
    reporter.reportTransformation(sourceFile, node, `Converted test with \`done\` callback to an \`async\` test.`);
    const newModifiers = [
        typescript_1.default.factory.createModifier(typescript_1.default.SyntaxKind.AsyncKeyword),
        ...(typescript_1.default.getModifiers(functionArg) ?? []).filter((mod) => mod.kind !== typescript_1.default.SyntaxKind.AsyncKeyword),
    ];
    let newFunction;
    if (typescript_1.default.isArrowFunction(functionArg)) {
        newFunction = typescript_1.default.factory.updateArrowFunction(functionArg, newModifiers, functionArg.typeParameters, [], // remove parameters
        functionArg.type, functionArg.equalsGreaterThanToken, newBody ?? typescript_1.default.factory.createBlock([]));
    }
    else {
        // isFunctionExpression
        newFunction = typescript_1.default.factory.updateFunctionExpression(functionArg, newModifiers, functionArg.asteriskToken, functionArg.name, functionArg.typeParameters, [], // remove parameters
        functionArg.type, newBody ?? typescript_1.default.factory.createBlock([]));
    }
    const newArgs = node.arguments.map((arg) => (arg === functionArg ? newFunction : arg));
    return typescript_1.default.factory.updateCallExpression(node, node.expression, node.typeArguments, newArgs);
}
//# sourceMappingURL=jasmine-lifecycle.js.map