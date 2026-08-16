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
exports.transformTimerMocks = transformTimerMocks;
exports.transformFail = transformFail;
exports.transformJasmineMembers = transformJasmineMembers;
exports.transformUnsupportedGlobalFunctions = transformUnsupportedGlobalFunctions;
exports.transformUnsupportedJasmineCalls = transformUnsupportedJasmineCalls;
exports.transformUnknownJasmineProperties = transformUnknownJasmineProperties;
/**
 * @fileoverview This file contains transformers for miscellaneous Jasmine APIs that don't
 * fit into other categories. This includes timer mocks (`jasmine.clock`), the `fail()`
 * function, and configuration settings like `jasmine.DEFAULT_TIMEOUT_INTERVAL`. It also
 * includes logic to identify and add TODO comments for unsupported Jasmine features.
 */
const typescript_1 = __importDefault(require("typescript"));
const ast_helpers_1 = require("../utils/ast-helpers");
const ast_validation_1 = require("../utils/ast-validation");
const comment_helpers_1 = require("../utils/comment-helpers");
const refactor_helpers_1 = require("../utils/refactor-helpers");
function transformTimerMocks(node, ctx) {
    const { sourceFile, reporter, pendingVitestValueImports } = ctx;
    if (!typescript_1.default.isCallExpression(node) ||
        !typescript_1.default.isPropertyAccessExpression(node.expression) ||
        !typescript_1.default.isIdentifier(node.expression.name)) {
        return node;
    }
    const pae = node.expression;
    const clockCall = pae.expression;
    if (!(0, ast_validation_1.isJasmineCallExpression)(clockCall, 'clock')) {
        return node;
    }
    let newMethodName;
    switch (pae.name.text) {
        case 'install':
            newMethodName = 'useFakeTimers';
            break;
        case 'tick':
            newMethodName = 'advanceTimersByTime';
            break;
        case 'uninstall':
            newMethodName = 'useRealTimers';
            break;
        case 'mockDate':
            newMethodName = 'setSystemTime';
            break;
        case 'autoTick': {
            const category = 'clockAutoTick';
            reporter.recordTodo(category, sourceFile, node);
            (0, comment_helpers_1.addTodoComment)(node, category);
            return node;
        }
        case 'withMock': {
            const category = 'clockWithMock';
            reporter.recordTodo(category, sourceFile, node);
            (0, comment_helpers_1.addTodoComment)(node, category);
            return node;
        }
    }
    if (newMethodName) {
        (0, ast_helpers_1.addVitestValueImport)(pendingVitestValueImports, 'vi');
        reporter.reportTransformation(sourceFile, node, `Transformed \`jasmine.clock().${pae.name.text}\` to \`vi.${newMethodName}\`.`);
        let newArgs = node.arguments;
        if (newMethodName === 'useFakeTimers') {
            newArgs = [];
        }
        if (newMethodName === 'setSystemTime' && node.arguments.length === 0) {
            newArgs = [
                typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier('Date'), undefined, []),
            ];
        }
        return (0, refactor_helpers_1.createViCallExpression)(ctx, newMethodName, newArgs);
    }
    return node;
}
function transformFail(node, { sourceFile, reporter }) {
    if (typescript_1.default.isExpressionStatement(node) &&
        typescript_1.default.isCallExpression(node.expression) &&
        typescript_1.default.isIdentifier(node.expression.expression) &&
        node.expression.expression.text === 'fail') {
        reporter.reportTransformation(sourceFile, node, 'Transformed `fail()` to `throw new Error()`.');
        const arg = node.expression.arguments[0];
        let throwExpression;
        if (arg && typescript_1.default.isNewExpression(arg)) {
            throwExpression = arg;
        }
        else {
            throwExpression = typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier('Error'), undefined, arg ? [arg] : []);
        }
        const replacement = typescript_1.default.factory.createThrowStatement(throwExpression);
        return typescript_1.default.setOriginalNode(typescript_1.default.setTextRange(replacement, node), node);
    }
    return node;
}
function transformJasmineMembers(node, refactorCtx) {
    const { sourceFile, reporter } = refactorCtx;
    if (typescript_1.default.isExpressionStatement(node) &&
        typescript_1.default.isBinaryExpression(node.expression) &&
        node.expression.operatorToken.kind === typescript_1.default.SyntaxKind.EqualsToken) {
        const assignment = node.expression;
        if (typescript_1.default.isPropertyAccessExpression(assignment.left) &&
            typescript_1.default.isIdentifier(assignment.left.expression) &&
            assignment.left.expression.text === 'jasmine') {
            const memberName = assignment.left.name.text;
            switch (memberName) {
                case 'DEFAULT_TIMEOUT_INTERVAL':
                    return transformJasmineDefaultTimeoutInterval(node, assignment.right, refactorCtx);
                case 'MAX_PRETTY_PRINT_ARRAY_LENGTH':
                case 'MAX_PRETTY_PRINT_DEPTH':
                case 'MAX_PRETTY_PRINT_CHARS': {
                    const replacement = typescript_1.default.factory.createEmptyStatement();
                    reporter.reportTransformation(sourceFile, node, `Removed \`${memberName}\` member assignment.`);
                    const category = 'unsupported-jasmine-member';
                    reporter.recordTodo(category, sourceFile, node);
                    (0, comment_helpers_1.addTodoComment)(replacement, category, { name: memberName });
                    (0, comment_helpers_1.addCommentedNodeText)(replacement, node);
                    return replacement;
                }
            }
        }
    }
    return node;
}
function transformJasmineDefaultTimeoutInterval(expression, timeoutValue, ctx) {
    const { sourceFile, reporter, pendingVitestValueImports } = ctx;
    (0, ast_helpers_1.addVitestValueImport)(pendingVitestValueImports, 'vi');
    reporter.reportTransformation(sourceFile, expression, 'Transformed `jasmine.DEFAULT_TIMEOUT_INTERVAL` to `vi.setConfig()`.');
    const setConfigCall = (0, refactor_helpers_1.createViCallExpression)(ctx, 'setConfig', [
        typescript_1.default.factory.createObjectLiteralExpression([typescript_1.default.factory.createPropertyAssignment('testTimeout', timeoutValue)], false),
    ]);
    return typescript_1.default.factory.updateExpressionStatement(expression, setConfigCall);
}
const UNSUPPORTED_GLOBAL_FUNCTION_CATEGORIES = new Set([
    'setSpecProperty',
    'setSuiteProperty',
    'throwUnless',
    'throwUnlessAsync',
    'getSpecProperty',
]);
// A type guard to ensure that the methodName is one of the categories handled by this transformer.
function isUnsupportedGlobalFunction(methodName) {
    return UNSUPPORTED_GLOBAL_FUNCTION_CATEGORIES.has(methodName);
}
function transformUnsupportedGlobalFunctions(node, { sourceFile, reporter }) {
    if (typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        isUnsupportedGlobalFunction(node.expression.text)) {
        const functionName = node.expression.text;
        reporter.reportTransformation(sourceFile, node, `Found unsupported global function \`${functionName}\`.`);
        reporter.recordTodo(functionName, sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, functionName);
    }
    return node;
}
const UNSUPPORTED_JASMINE_CALLS_CATEGORIES = new Set([
    'addMatchers',
    'addAsyncMatchers',
    'addCustomEqualityTester',
    'addCustomObjectFormatter',
    'mapContaining',
    'setContaining',
    'addSpyStrategy',
]);
// A type guard to ensure that the methodName is one of the categories handled by this transformer.
function isUnsupportedJasmineCall(methodName) {
    return UNSUPPORTED_JASMINE_CALLS_CATEGORIES.has(methodName);
}
function transformUnsupportedJasmineCalls(node, { sourceFile, reporter }) {
    const methodName = (0, ast_validation_1.getJasmineMethodName)(node);
    if (methodName && isUnsupportedJasmineCall(methodName)) {
        reporter.reportTransformation(sourceFile, node, `Found unsupported call \`jasmine.${methodName}\`.`);
        reporter.recordTodo(methodName, sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, methodName);
    }
    return node;
}
// If any additional properties are added to transforms, they should also be added to this list.
const HANDLED_JASMINE_PROPERTIES = new Set([
    // Spies
    'createSpy',
    'createSpyObj',
    'spyOnAllFunctions',
    'addSpyStrategy',
    // Clock
    'clock',
    // Matchers
    'any',
    'anything',
    'stringMatching',
    'objectContaining',
    'arrayContaining',
    'arrayWithExactContents',
    'truthy',
    'falsy',
    'empty',
    'notEmpty',
    'mapContaining',
    'setContaining',
    // Other
    'DEFAULT_TIMEOUT_INTERVAL',
    'MAX_PRETTY_PRINT_ARRAY_LENGTH',
    'MAX_PRETTY_PRINT_DEPTH',
    'MAX_PRETTY_PRINT_CHARS',
    'addMatchers',
    'addAsyncMatchers',
    'addCustomEqualityTester',
    'addCustomObjectFormatter',
]);
function transformUnknownJasmineProperties(node, { sourceFile, reporter }) {
    if (typescript_1.default.isPropertyAccessExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === 'jasmine') {
        const propName = node.name.text;
        if (!HANDLED_JASMINE_PROPERTIES.has(propName)) {
            reporter.reportTransformation(sourceFile, node, `Found unknown jasmine property \`jasmine.${propName}\`.`);
            const category = 'unknown-jasmine-property';
            reporter.recordTodo(category, sourceFile, node);
            (0, comment_helpers_1.addTodoComment)(node, category, { name: propName });
        }
    }
    return node;
}
//# sourceMappingURL=jasmine-misc.js.map