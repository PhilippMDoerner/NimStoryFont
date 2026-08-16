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
exports.transformSyntacticSugarMatchers = transformSyntacticSugarMatchers;
exports.transformAsymmetricMatchers = transformAsymmetricMatchers;
exports.transformToHaveBeenCalledBefore = transformToHaveBeenCalledBefore;
exports.transformToHaveClass = transformToHaveClass;
exports.transformExpectAsync = transformExpectAsync;
exports.transformComplexMatchers = transformComplexMatchers;
exports.transformArrayWithExactContents = transformArrayWithExactContents;
exports.transformCalledOnceWith = transformCalledOnceWith;
exports.transformWithContext = transformWithContext;
exports.transformExpectNothing = transformExpectNothing;
exports.transformToBeNullish = transformToBeNullish;
/**
 * @fileoverview This file contains transformers that migrate Jasmine matchers to their
 * Vitest counterparts. It handles a wide range of matchers, including syntactic sugar
 * (e.g., `toBeTrue`), asymmetric matchers (e.g., `jasmine.any`), async promise matchers
 * (`expectAsync`), and complex matchers that require restructuring, such as
 * `toHaveBeenCalledOnceWith` and `arrayWithExactContents`.
 */
const typescript_1 = __importDefault(require("typescript"));
const ast_helpers_1 = require("../utils/ast-helpers");
const ast_validation_1 = require("../utils/ast-validation");
const comment_helpers_1 = require("../utils/comment-helpers");
const SUGAR_MATCHER_CHANGES = new Map([
    ['toBeTrue', { newName: 'toBe', newArgs: [typescript_1.default.factory.createTrue()] }],
    ['toBeFalse', { newName: 'toBe', newArgs: [typescript_1.default.factory.createFalse()] }],
    ['toBePositiveInfinity', { newName: 'toBe', newArgs: [typescript_1.default.factory.createIdentifier('Infinity')] }],
    [
        'toBeNegativeInfinity',
        {
            newName: 'toBe',
            newArgs: [
                typescript_1.default.factory.createPrefixUnaryExpression(typescript_1.default.SyntaxKind.MinusToken, typescript_1.default.factory.createIdentifier('Infinity')),
            ],
        },
    ],
    ['toHaveSize', { newName: 'toHaveLength' }],
]);
function transformSyntacticSugarMatchers(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isCallExpression(node) || !typescript_1.default.isPropertyAccessExpression(node.expression)) {
        return node;
    }
    const pae = node.expression;
    const matcherName = pae.name.text;
    if (matcherName === 'toHaveSpyInteractions') {
        const category = 'toHaveSpyInteractions';
        reporter.recordTodo(category, sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, category);
        return node;
    }
    if (matcherName === 'toThrowMatching') {
        const category = 'toThrowMatching';
        reporter.recordTodo(category, sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, category, { name: matcherName });
        return node;
    }
    const mapping = SUGAR_MATCHER_CHANGES.get(matcherName);
    if (mapping) {
        reporter.reportTransformation(sourceFile, node, `Transformed matcher ".${matcherName}()" to ".${mapping.newName}()".`);
        const newExpression = (0, ast_helpers_1.createPropertyAccess)(pae.expression, mapping.newName);
        const newArgs = mapping.newArgs ?? [...node.arguments];
        return typescript_1.default.factory.updateCallExpression(node, newExpression, node.typeArguments, newArgs);
    }
    return node;
}
const ASYMMETRIC_MATCHER_NAMES = [
    'anything',
    'any',
    'stringMatching',
    'objectContaining',
    'arrayContaining',
    'stringContaining',
];
function transformAsymmetricMatchers(node, { sourceFile, reporter, pendingVitestValueImports }) {
    if (typescript_1.default.isPropertyAccessExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === 'jasmine') {
        const matcherName = node.name.text;
        if (ASYMMETRIC_MATCHER_NAMES.includes(matcherName)) {
            (0, ast_helpers_1.addVitestValueImport)(pendingVitestValueImports, 'expect');
            reporter.reportTransformation(sourceFile, node, `Transformed asymmetric matcher \`jasmine.${matcherName}\` to \`expect.${matcherName}\`.`);
            return (0, ast_helpers_1.createPropertyAccess)('expect', node.name);
        }
    }
    return node;
}
function transformToHaveBeenCalledBefore(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isCallExpression(node) ||
        !typescript_1.default.isPropertyAccessExpression(node.expression) ||
        node.arguments.length !== 1) {
        return node;
    }
    const pae = node.expression;
    const matcherName = pae.name.text;
    let isNegated = false;
    let expectExpression = pae.expression;
    if (typescript_1.default.isPropertyAccessExpression(expectExpression) && expectExpression.name.text === 'not') {
        isNegated = true;
        expectExpression = expectExpression.expression;
    }
    if (!typescript_1.default.isCallExpression(expectExpression) || matcherName !== 'toHaveBeenCalledBefore') {
        return node;
    }
    reporter.reportTransformation(sourceFile, node, 'Transformed `toHaveBeenCalledBefore` to a Vitest-compatible spy invocation order comparison.');
    const [spyB] = node.arguments;
    const [spyA] = expectExpression.arguments;
    const createInvocationOrderAccess = (spyIdentifier) => {
        const mockedSpy = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)('vi', 'mocked'), undefined, [spyIdentifier]);
        const mockProperty = (0, ast_helpers_1.createPropertyAccess)(mockedSpy, 'mock');
        return (0, ast_helpers_1.createPropertyAccess)(mockProperty, 'invocationCallOrder');
    };
    const createMinCall = (spyIdentifier) => {
        return typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)('Math', 'min'), undefined, [
            typescript_1.default.factory.createSpreadElement(createInvocationOrderAccess(spyIdentifier)),
        ]);
    };
    const newExpect = (0, ast_helpers_1.createExpectCallExpression)([createMinCall(spyA)]);
    const newMatcherName = isNegated ? 'toBeGreaterThanOrEqual' : 'toBeLessThan';
    return typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(newExpect, newMatcherName), undefined, [createMinCall(spyB)]);
}
function transformToHaveClass(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isCallExpression(node) ||
        !typescript_1.default.isPropertyAccessExpression(node.expression) ||
        node.arguments.length !== 1) {
        return node;
    }
    const pae = node.expression;
    const matcherName = pae.name.text;
    let isNegated = false;
    let expectExpression = pae.expression;
    if (typescript_1.default.isPropertyAccessExpression(expectExpression) && expectExpression.name.text === 'not') {
        isNegated = true;
        expectExpression = expectExpression.expression;
    }
    if (matcherName !== 'toHaveClass' || !typescript_1.default.isCallExpression(expectExpression)) {
        return node;
    }
    reporter.reportTransformation(sourceFile, node, 'Transformed `.toHaveClass()` to a `classList.contains()` check.');
    const [className] = node.arguments;
    const newExpectArgs = [];
    const [element] = expectExpression.arguments;
    const classListContains = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)((0, ast_helpers_1.createPropertyAccess)(element, 'classList'), 'contains'), undefined, [className]);
    newExpectArgs.push(classListContains);
    // Pass the context message from withContext to the new expect call
    if (expectExpression.arguments.length > 1) {
        newExpectArgs.push(expectExpression.arguments[1]);
    }
    const newExpect = (0, ast_helpers_1.createExpectCallExpression)(newExpectArgs);
    const newMatcher = isNegated ? typescript_1.default.factory.createFalse() : typescript_1.default.factory.createTrue();
    return typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(newExpect, 'toBe'), undefined, [
        newMatcher,
    ]);
}
const ASYNC_MATCHER_CHANGES = new Map([
    ['toBeResolved', { base: 'resolves', matcher: 'toThrow', not: true, keepArgs: false }],
    ['toBeResolvedTo', { base: 'resolves', matcher: 'toEqual', keepArgs: true }],
    ['toBeRejected', { base: 'rejects', matcher: 'toThrow', keepArgs: false }],
    ['toBeRejectedWith', { base: 'rejects', matcher: 'toEqual', keepArgs: true }],
    ['toBeRejectedWithError', { base: 'rejects', matcher: 'toThrowError', keepArgs: true }],
]);
function transformExpectAsync(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isCallExpression(node) ||
        !typescript_1.default.isPropertyAccessExpression(node.expression) ||
        !typescript_1.default.isCallExpression(node.expression.expression)) {
        return node;
    }
    const matcherCall = node;
    const matcherPae = node.expression;
    const expectCall = node.expression.expression;
    if (!typescript_1.default.isIdentifier(expectCall.expression) || expectCall.expression.text !== 'expectAsync') {
        return node;
    }
    const matcherName = typescript_1.default.isIdentifier(matcherPae.name) ? matcherPae.name.text : undefined;
    const mapping = matcherName ? ASYNC_MATCHER_CHANGES.get(matcherName) : undefined;
    if (mapping) {
        reporter.reportTransformation(sourceFile, node, `Transformed \`expectAsync(...).${matcherName}\` to \`expect(...).${mapping.base}.${mapping.matcher}\`.`);
        const newExpectCall = (0, ast_helpers_1.createExpectCallExpression)([expectCall.arguments[0]]);
        let newMatcherChain = (0, ast_helpers_1.createPropertyAccess)(newExpectCall, mapping.base);
        if (mapping.not) {
            newMatcherChain = (0, ast_helpers_1.createPropertyAccess)(newMatcherChain, 'not');
        }
        newMatcherChain = (0, ast_helpers_1.createPropertyAccess)(newMatcherChain, mapping.matcher);
        const newMatcherArgs = mapping.keepArgs ? [...matcherCall.arguments] : [];
        return typescript_1.default.factory.createCallExpression(newMatcherChain, undefined, newMatcherArgs);
    }
    if (matcherName) {
        if (matcherName === 'toBePending') {
            const category = 'toBePending';
            reporter.recordTodo(category, sourceFile, node);
            (0, comment_helpers_1.addTodoComment)(node, category);
        }
        else {
            const category = 'unsupported-expect-async-matcher';
            reporter.recordTodo(category, sourceFile, node);
            (0, comment_helpers_1.addTodoComment)(node, category, { name: matcherName });
        }
    }
    return node;
}
function transformComplexMatchers(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isCallExpression(node) ||
        !typescript_1.default.isPropertyAccessExpression(node.expression) ||
        node.expression.name.text !== 'toEqual' ||
        node.arguments.length !== 1) {
        return node;
    }
    const argument = node.arguments[0];
    const jasmineMatcherName = (0, ast_validation_1.getJasmineMethodName)(argument);
    if (!jasmineMatcherName) {
        return node;
    }
    const expectCall = node.expression.expression;
    let newMatcherName;
    let newArgs;
    let negate = false;
    switch (jasmineMatcherName) {
        case 'truthy':
            newMatcherName = 'toBeTruthy';
            break;
        case 'falsy':
            newMatcherName = 'toBeFalsy';
            break;
        case 'empty':
            newMatcherName = 'toHaveLength';
            newArgs = [typescript_1.default.factory.createNumericLiteral(0)];
            break;
        case 'notEmpty':
            newMatcherName = 'toHaveLength';
            newArgs = [typescript_1.default.factory.createNumericLiteral(0)];
            negate = true;
            break;
        case 'is':
            newMatcherName = 'toBe';
            if (typescript_1.default.isCallExpression(argument)) {
                newArgs = [...argument.arguments];
            }
            break;
    }
    if (newMatcherName) {
        reporter.reportTransformation(sourceFile, node, `Transformed \`.toEqual(jasmine.${jasmineMatcherName}())\` to \`.${newMatcherName}()\`.`);
        let expectExpression = expectCall;
        // Handle cases like `expect(...).not.toEqual(jasmine.notEmpty())`
        if (typescript_1.default.isPropertyAccessExpression(expectCall) && expectCall.name.text === 'not') {
            // The original expression was negated, so flip the negate flag
            negate = !negate;
            // Use the expression before the `.not`
            expectExpression = expectCall.expression;
        }
        if (negate) {
            expectExpression = (0, ast_helpers_1.createPropertyAccess)(expectExpression, 'not');
        }
        const newExpression = (0, ast_helpers_1.createPropertyAccess)(expectExpression, newMatcherName);
        return typescript_1.default.factory.createCallExpression(newExpression, undefined, newArgs ?? []);
    }
    return node;
}
function transformArrayWithExactContents(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isExpressionStatement(node) ||
        !typescript_1.default.isCallExpression(node.expression) ||
        !typescript_1.default.isPropertyAccessExpression(node.expression.expression) ||
        node.expression.expression.name.text !== 'toEqual' ||
        node.expression.arguments.length !== 1) {
        return node;
    }
    const argument = node.expression.arguments[0];
    if (!(0, ast_validation_1.isJasmineCallExpression)(argument, 'arrayWithExactContents') ||
        argument.arguments.length !== 1) {
        return node;
    }
    if (!typescript_1.default.isArrayLiteralExpression(argument.arguments[0])) {
        const category = 'arrayWithExactContents-dynamic-variable';
        reporter.recordTodo(category, sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, category);
        return node;
    }
    reporter.reportTransformation(sourceFile, node, 'Transformed `jasmine.arrayWithExactContents()` to `.toHaveLength()` and `.toEqual(expect.arrayContaining())`.');
    const expectCall = node.expression.expression.expression;
    const arrayLiteral = argument.arguments[0];
    const lengthCall = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(expectCall, 'toHaveLength'), undefined, [typescript_1.default.factory.createNumericLiteral(arrayLiteral.elements.length)]);
    const containingCall = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(expectCall, 'toEqual'), undefined, [
        typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)('expect', 'arrayContaining'), undefined, [arrayLiteral]),
    ]);
    const lengthStmt = typescript_1.default.factory.createExpressionStatement(lengthCall);
    const containingStmt = typescript_1.default.factory.createExpressionStatement(containingCall);
    const category = 'arrayWithExactContents-check';
    reporter.recordTodo(category, sourceFile, node);
    (0, comment_helpers_1.addTodoComment)(lengthStmt, category);
    return [lengthStmt, containingStmt];
}
function transformCalledOnceWith(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isExpressionStatement(node)) {
        return node;
    }
    const call = node.expression;
    if (!typescript_1.default.isCallExpression(call) ||
        !typescript_1.default.isPropertyAccessExpression(call.expression) ||
        call.expression.name.text !== 'toHaveBeenCalledOnceWith') {
        return node;
    }
    reporter.reportTransformation(sourceFile, node, 'Transformed `.toHaveBeenCalledOnceWith()` to `.toHaveBeenCalledTimes(1)` and `.toHaveBeenCalledWith()`.');
    const expectCall = call.expression.expression;
    const args = call.arguments;
    const timesCall = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(expectCall, 'toHaveBeenCalledTimes'), undefined, [typescript_1.default.factory.createNumericLiteral(1)]);
    const withCall = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(expectCall, 'toHaveBeenCalledWith'), undefined, args);
    return [
        typescript_1.default.factory.createExpressionStatement(timesCall),
        typescript_1.default.factory.createExpressionStatement(withCall),
    ];
}
function transformWithContext(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isCallExpression(node) || !typescript_1.default.isPropertyAccessExpression(node.expression)) {
        return node;
    }
    // Traverse the chain of property access expressions to find the .withContext() call
    let currentExpression = node.expression;
    const propertyChain = [];
    while (typescript_1.default.isPropertyAccessExpression(currentExpression)) {
        if (!typescript_1.default.isIdentifier(currentExpression.name)) {
            // Break if we encounter a private identifier or something else unexpected
            return node;
        }
        propertyChain.push(currentExpression.name);
        currentExpression = currentExpression.expression;
    }
    const withContextCall = currentExpression;
    // Check if we found a .withContext() call
    if (!typescript_1.default.isCallExpression(withContextCall) ||
        !typescript_1.default.isPropertyAccessExpression(withContextCall.expression) ||
        !typescript_1.default.isIdentifier(withContextCall.expression.name) ||
        withContextCall.expression.name.text !== 'withContext') {
        return node;
    }
    reporter.reportTransformation(sourceFile, withContextCall, 'Transformed `.withContext()` to the `expect(..., message)` syntax.');
    const expectCall = withContextCall.expression.expression;
    if (!typescript_1.default.isCallExpression(expectCall) ||
        !typescript_1.default.isIdentifier(expectCall.expression) ||
        expectCall.expression.text !== 'expect') {
        return node;
    }
    const contextMessage = withContextCall.arguments[0];
    if (!contextMessage) {
        // No message provided, so unwrap the .withContext() call.
        let newChain = expectCall;
        for (let i = propertyChain.length - 1; i >= 0; i--) {
            newChain = typescript_1.default.factory.createPropertyAccessExpression(newChain, propertyChain[i]);
        }
        return typescript_1.default.factory.updateCallExpression(node, newChain, node.typeArguments, node.arguments);
    }
    const newExpectArgs = [...expectCall.arguments, contextMessage];
    const newExpectCall = typescript_1.default.factory.updateCallExpression(expectCall, expectCall.expression, expectCall.typeArguments, newExpectArgs);
    // Rebuild the property access chain
    let newExpression = newExpectCall;
    for (let i = propertyChain.length - 1; i >= 0; i--) {
        newExpression = typescript_1.default.factory.createPropertyAccessExpression(newExpression, propertyChain[i]);
    }
    return typescript_1.default.factory.updateCallExpression(node, newExpression, node.typeArguments, node.arguments);
}
function transformExpectNothing(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isExpressionStatement(node)) {
        return node;
    }
    const call = node.expression;
    if (!typescript_1.default.isCallExpression(call) ||
        !typescript_1.default.isPropertyAccessExpression(call.expression) ||
        !typescript_1.default.isIdentifier(call.expression.name) ||
        call.expression.name.text !== 'nothing') {
        return node;
    }
    const expectCall = call.expression.expression;
    if (!typescript_1.default.isCallExpression(expectCall) ||
        !typescript_1.default.isIdentifier(expectCall.expression) ||
        expectCall.expression.text !== 'expect' ||
        expectCall.arguments.length > 0) {
        return node;
    }
    // The statement is `expect().nothing()`, which can be removed.
    const replacement = typescript_1.default.factory.createEmptyStatement();
    reporter.reportTransformation(sourceFile, node, 'Removed `expect().nothing()` statement.');
    const category = 'expect-nothing';
    reporter.recordTodo(category, sourceFile, node);
    (0, comment_helpers_1.addTodoComment)(replacement, category);
    (0, comment_helpers_1.addCommentedNodeText)(replacement, node);
    return replacement;
}
function transformToBeNullish(node, { sourceFile, reporter }) {
    if (!typescript_1.default.isCallExpression(node) ||
        !typescript_1.default.isPropertyAccessExpression(node.expression) ||
        node.arguments.length !== 0) {
        return node;
    }
    const pae = node.expression;
    const matcherName = pae.name.text;
    let isNegated = false;
    let expectExpression = pae.expression;
    if (typescript_1.default.isPropertyAccessExpression(expectExpression) && expectExpression.name.text === 'not') {
        isNegated = true;
        expectExpression = expectExpression.expression;
    }
    if (matcherName !== 'toBeNullish' || !typescript_1.default.isCallExpression(expectExpression)) {
        return node;
    }
    reporter.reportTransformation(sourceFile, node, 'Transformed `.toBeNullish()` to a `element == null` check.');
    const element = expectExpression.arguments[0];
    const nullCheckExpression = typescript_1.default.factory.createBinaryExpression(element, typescript_1.default.SyntaxKind.EqualsEqualsToken, typescript_1.default.factory.createNull());
    const newExpect = (0, ast_helpers_1.createExpectCallExpression)([nullCheckExpression]);
    const newMatcher = isNegated ? typescript_1.default.factory.createFalse() : typescript_1.default.factory.createTrue();
    return typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(newExpect, 'toBe'), undefined, [
        newMatcher,
    ]);
}
//# sourceMappingURL=jasmine-matcher.js.map