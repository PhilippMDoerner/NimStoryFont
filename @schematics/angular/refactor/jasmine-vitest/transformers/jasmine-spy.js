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
exports.transformSpies = transformSpies;
exports.transformCreateSpy = transformCreateSpy;
exports.transformCreateSpyObj = transformCreateSpyObj;
exports.transformSpyReset = transformSpyReset;
exports.transformSpyCallInspection = transformSpyCallInspection;
/**
 * @fileoverview This file contains transformers dedicated to converting Jasmine's spying
 * functionality to Vitest's mocking APIs. It handles the creation of spies (`spyOn`,
 * `createSpy`, `createSpyObj`), spy strategies (`and.returnValue`, `and.callFake`),
 * and the inspection of spy calls (`spy.calls.reset`, `spy.calls.mostRecent`).
 */
const typescript_1 = __importDefault(require("typescript"));
const ast_helpers_1 = require("../utils/ast-helpers");
const ast_validation_1 = require("../utils/ast-validation");
const comment_helpers_1 = require("../utils/comment-helpers");
const refactor_helpers_1 = require("../utils/refactor-helpers");
function isChainedWithAnd(node) {
    let parent = node.parent;
    while (parent) {
        if (typescript_1.default.isPropertyAccessExpression(parent)) {
            if (typescript_1.default.isIdentifier(parent.name) && parent.name.text === 'and') {
                return true;
            }
        }
        else if (typescript_1.default.isElementAccessExpression(parent)) {
            if (typescript_1.default.isStringLiteralLike(parent.argumentExpression) &&
                parent.argumentExpression.text === 'and') {
                return true;
            }
        }
        else if (typescript_1.default.isParenthesizedExpression(parent) ||
            typescript_1.default.isAsExpression(parent) ||
            typescript_1.default.isNonNullExpression(parent) ||
            typescript_1.default.isTypeAssertionExpression(parent) ||
            typescript_1.default.isSatisfiesExpression(parent)) {
            parent = parent.parent;
            continue;
        }
        break;
    }
    return false;
}
function transformPrimarySpy(node, refactorCtx) {
    const { sourceFile, reporter, pendingVitestValueImports } = refactorCtx;
    if (typescript_1.default.isIdentifier(node.expression) &&
        (node.expression.text === 'spyOn' || node.expression.text === 'spyOnProperty')) {
        (0, ast_helpers_1.addVitestValueImport)(pendingVitestValueImports, 'vi');
        const viSpyOnCall = typescript_1.default.factory.updateCallExpression(node, (0, ast_helpers_1.createPropertyAccess)('vi', 'spyOn'), node.typeArguments, node.arguments);
        if (isChainedWithAnd(node)) {
            reporter.reportTransformation(sourceFile, node, `Transformed \`${node.expression.text}\` to \`vi.spyOn\`.`);
            return viSpyOnCall;
        }
        reporter.reportTransformation(sourceFile, node, `Transformed \`${node.expression.text}\` to \`vi.spyOn\`, ` +
            `appending \`.mockReturnValue(undefined)\` to preserve stub-by-default semantics.`);
        return typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(viSpyOnCall, 'mockReturnValue'), undefined, [typescript_1.default.factory.createIdentifier('undefined')]);
    }
    return node;
}
function transformSpyStrategy(node, refactorCtx) {
    const { sourceFile, reporter } = refactorCtx;
    if (!typescript_1.default.isPropertyAccessExpression(node.expression)) {
        return node;
    }
    const pae = node.expression;
    let spyCall;
    if (typescript_1.default.isPropertyAccessExpression(pae.expression) &&
        typescript_1.default.isIdentifier(pae.expression.name) &&
        pae.expression.name.text === 'and') {
        spyCall = pae.expression.expression;
    }
    else if (typescript_1.default.isElementAccessExpression(pae.expression) &&
        typescript_1.default.isStringLiteralLike(pae.expression.argumentExpression) &&
        pae.expression.argumentExpression.text === 'and') {
        spyCall = pae.expression.expression;
    }
    if (spyCall) {
        let newMethodName;
        let args = node.arguments;
        if (typescript_1.default.isIdentifier(pae.name)) {
            const strategyName = pae.name.text;
            switch (strategyName) {
                case 'returnValue':
                    {
                        const firstArg = args[0];
                        const result = firstArg ? (0, ast_helpers_1.getPromiseResolveRejectMethod)(firstArg) : null;
                        if (result) {
                            const methodMapping = {
                                'resolve': 'mockResolvedValue',
                                'reject': 'mockRejectedValue',
                            };
                            newMethodName = methodMapping[result.methodName];
                            args = result.arguments;
                        }
                        else {
                            newMethodName = 'mockReturnValue';
                        }
                    }
                    break;
                case 'resolveTo':
                    newMethodName = 'mockResolvedValue';
                    break;
                case 'rejectWith':
                    newMethodName = 'mockRejectedValue';
                    break;
                case 'returnValues': {
                    reporter.reportTransformation(sourceFile, node, 'Transformed `.and.returnValues()` to chained `.mockReturnValueOnce()` calls.');
                    const returnValues = node.arguments;
                    if (returnValues.length === 0) {
                        // No values, so it's a no-op. Just transform the spyOn call.
                        return transformSpies(spyCall, refactorCtx);
                    }
                    // spy.and.returnValues(a, b) -> spy.mockReturnValueOnce(a).mockReturnValueOnce(b)
                    let chainedCall = spyCall;
                    for (const value of returnValues) {
                        const mockCall = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(chainedCall, 'mockReturnValueOnce'), undefined, [value]);
                        chainedCall = mockCall;
                    }
                    return chainedCall;
                }
                case 'callFake':
                    newMethodName = 'mockImplementation';
                    break;
                case 'callThrough':
                    reporter.reportTransformation(sourceFile, node, 'Removed redundant `.and.callThrough()` call.');
                    return transformSpies(spyCall, refactorCtx); // .and.callThrough() is redundant, just transform spyOn.
                case 'stub': {
                    reporter.reportTransformation(sourceFile, node, 'Transformed `.and.stub()` to `.mockImplementation()`.');
                    const newExpression = (0, ast_helpers_1.createPropertyAccess)(spyCall, 'mockImplementation');
                    const arrowFn = typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.default.factory.createBlock([], /* multiline */ true));
                    return typescript_1.default.factory.createCallExpression(newExpression, undefined, [arrowFn]);
                }
                case 'throwError': {
                    reporter.reportTransformation(sourceFile, node, 'Transformed `.and.throwError()` to `.mockImplementation()`.');
                    const errorArg = node.arguments[0];
                    const throwStatement = typescript_1.default.factory.createThrowStatement(errorArg && typescript_1.default.isNewExpression(errorArg)
                        ? errorArg
                        : typescript_1.default.factory.createNewExpression(typescript_1.default.factory.createIdentifier('Error'), undefined, errorArg ? [errorArg] : []));
                    const arrowFunction = typescript_1.default.factory.createArrowFunction(undefined, undefined, [], undefined, typescript_1.default.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.default.factory.createBlock([throwStatement], true));
                    const newExpression = (0, ast_helpers_1.createPropertyAccess)(spyCall, 'mockImplementation');
                    return typescript_1.default.factory.createCallExpression(newExpression, undefined, [arrowFunction]);
                }
                case 'identity': {
                    reporter.reportTransformation(sourceFile, node, 'Transformed `.and.identity()` to `.getMockName()`.');
                    const newExpression = (0, ast_helpers_1.createPropertyAccess)(spyCall, 'getMockName');
                    return typescript_1.default.factory.createCallExpression(newExpression, undefined, undefined);
                }
                default: {
                    const category = 'unsupported-spy-strategy';
                    reporter.recordTodo(category, sourceFile, node);
                    (0, comment_helpers_1.addTodoComment)(node, category, { name: strategyName });
                    break;
                }
            }
            if (newMethodName) {
                reporter.reportTransformation(sourceFile, node, `Transformed spy strategy \`.and.${strategyName}()\` to \`.${newMethodName}()\`.`);
                const newExpression = typescript_1.default.factory.updatePropertyAccessExpression(pae, spyCall, typescript_1.default.factory.createIdentifier(newMethodName));
                return typescript_1.default.factory.updateCallExpression(node, newExpression, node.typeArguments, args);
            }
        }
    }
    return node;
}
function transformSpyOnAllFunctions(node, refactorCtx) {
    const { sourceFile, reporter } = refactorCtx;
    if ((0, ast_validation_1.getJasmineMethodName)(node) === 'spyOnAllFunctions') {
        reporter.reportTransformation(sourceFile, node, 'Found unsupported `jasmine.spyOnAllFunctions()`.');
        const category = 'spyOnAllFunctions';
        reporter.recordTodo(category, sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, category);
        return node;
    }
    return node;
}
function transformSpies(node, refactorCtx) {
    if (!typescript_1.default.isCallExpression(node)) {
        return node;
    }
    const primaryResult = transformPrimarySpy(node, refactorCtx);
    if (primaryResult !== node) {
        return primaryResult;
    }
    const strategyResult = transformSpyStrategy(node, refactorCtx);
    if (strategyResult !== node) {
        return strategyResult;
    }
    return transformSpyOnAllFunctions(node, refactorCtx);
}
function transformCreateSpy(node, ctx) {
    const { reporter, sourceFile, pendingVitestValueImports } = ctx;
    if (!(0, ast_validation_1.isJasmineCallExpression)(node, 'createSpy')) {
        return node;
    }
    (0, ast_helpers_1.addVitestValueImport)(pendingVitestValueImports, 'vi');
    reporter.reportTransformation(sourceFile, node, 'Transformed `jasmine.createSpy()` to `vi.fn()`.');
    const spyName = node.arguments[0];
    const viFnCallExpression = (0, refactor_helpers_1.createViCallExpression)(ctx, 'fn', node.arguments.length > 1 ? [node.arguments[1]] : []);
    // jasmine.createSpy() -> vi.fn()
    // jasmine.createSpy(name, originalFn) -> vi.fn(originalFn).mockName(name)
    return !spyName
        ? viFnCallExpression
        : typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(viFnCallExpression, 'mockName'), undefined, [node.arguments[0]]);
}
function transformCreateSpyObj(node, ctx) {
    const { reporter, sourceFile, pendingVitestValueImports } = ctx;
    if (!(0, ast_validation_1.isJasmineCallExpression)(node, 'createSpyObj')) {
        return node;
    }
    (0, ast_helpers_1.addVitestValueImport)(pendingVitestValueImports, 'vi');
    reporter.reportTransformation(sourceFile, node, 'Transformed `jasmine.createSpyObj()` to an object literal with `vi.fn()`.');
    const firstArg = node.arguments[0];
    const hasBaseName = typescript_1.default.isStringLiteral(firstArg);
    const baseName = hasBaseName ? firstArg.text : undefined;
    const methods = hasBaseName ? node.arguments[1] : firstArg;
    const propertiesArg = hasBaseName ? node.arguments[2] : node.arguments[1];
    let properties;
    if (node.arguments.length < 2 && hasBaseName) {
        const category = 'createSpyObj-single-argument';
        reporter.recordTodo(category, sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, category);
        return node;
    }
    if (typescript_1.default.isArrayLiteralExpression(methods)) {
        properties = createSpyObjWithArray(ctx, methods, baseName);
    }
    else if (typescript_1.default.isObjectLiteralExpression(methods)) {
        properties = createSpyObjWithObject(ctx, methods, baseName);
    }
    else {
        const category = 'createSpyObj-dynamic-variable';
        reporter.recordTodo(category, sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, category);
        return node;
    }
    if (propertiesArg) {
        if (typescript_1.default.isObjectLiteralExpression(propertiesArg)) {
            properties.push(...propertiesArg.properties);
        }
        else {
            const category = 'createSpyObj-dynamic-property-map';
            reporter.recordTodo(category, sourceFile, node);
            (0, comment_helpers_1.addTodoComment)(node, category);
        }
    }
    return typescript_1.default.factory.createObjectLiteralExpression(properties, true);
}
function createSpyObjWithArray(ctx, methods, baseName) {
    return methods.elements
        .map((element) => {
        if (typescript_1.default.isStringLiteral(element)) {
            const mockFn = (0, refactor_helpers_1.createViCallExpression)(ctx, 'fn');
            const methodName = element.text;
            let finalExpression = mockFn;
            if (baseName) {
                finalExpression = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(finalExpression, 'mockName'), undefined, [typescript_1.default.factory.createStringLiteral(`${baseName}.${methodName}`)]);
            }
            return typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createIdentifier(methodName), finalExpression);
        }
        return undefined;
    })
        .filter((p) => !!p);
}
function createSpyObjWithObject(ctx, methods, baseName) {
    return methods.properties
        .map((prop) => {
        if (typescript_1.default.isPropertyAssignment(prop) && typescript_1.default.isIdentifier(prop.name)) {
            const methodName = prop.name.text;
            const returnValue = prop.initializer;
            let mockFn = (0, refactor_helpers_1.createViCallExpression)(ctx, 'fn');
            if (baseName) {
                mockFn = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)(mockFn, 'mockName'), undefined, [typescript_1.default.factory.createStringLiteral(`${baseName}.${methodName}`)]);
            }
            const mockReturnValue = (0, ast_helpers_1.createPropertyAccess)(mockFn, 'mockReturnValue');
            return typescript_1.default.factory.createPropertyAssignment(typescript_1.default.factory.createIdentifier(methodName), typescript_1.default.factory.createCallExpression(mockReturnValue, undefined, [returnValue]));
        }
        return undefined;
    })
        .filter((p) => !!p);
}
function transformSpyReset(node, { sourceFile, reporter }) {
    if (typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isPropertyAccessExpression(node.expression) &&
        typescript_1.default.isIdentifier(node.expression.name) &&
        node.expression.name.text === 'reset' &&
        typescript_1.default.isPropertyAccessExpression(node.expression.expression)) {
        const callsPae = node.expression.expression;
        if (typescript_1.default.isIdentifier(callsPae.name) && callsPae.name.text === 'calls') {
            reporter.reportTransformation(sourceFile, node, 'Transformed `spy.calls.reset()` to `.mockClear()`.');
            const spyIdentifier = callsPae.expression;
            const newExpression = (0, ast_helpers_1.createPropertyAccess)(spyIdentifier, 'mockClear');
            return typescript_1.default.factory.updateCallExpression(node, newExpression, node.typeArguments, []);
        }
    }
    return node;
}
function getSpyIdentifierFromCalls(node) {
    if (typescript_1.default.isIdentifier(node.name) && node.name.text === 'calls') {
        return node.expression;
    }
    return undefined;
}
function createMockedSpyMockProperty(spyIdentifier, pendingVitestValueImports) {
    (0, ast_helpers_1.addVitestValueImport)(pendingVitestValueImports, 'vi');
    const mockedSpy = typescript_1.default.factory.createCallExpression((0, ast_helpers_1.createPropertyAccess)('vi', 'mocked'), undefined, [spyIdentifier]);
    return (0, ast_helpers_1.createPropertyAccess)(mockedSpy, 'mock');
}
function transformMostRecentArgs(node, { sourceFile, reporter, pendingVitestValueImports }) {
    // Check 1: Is it a property access for `.args`?
    if (!typescript_1.default.isPropertyAccessExpression(node) ||
        !typescript_1.default.isIdentifier(node.name) ||
        node.name.text !== 'args') {
        return node;
    }
    // Check 2: Is the preceding expression a call expression?
    const mostRecentCall = node.expression;
    if (!typescript_1.default.isCallExpression(mostRecentCall) ||
        !typescript_1.default.isPropertyAccessExpression(mostRecentCall.expression)) {
        return node;
    }
    // Check 3: Is it a call to `.mostRecent`?
    const mostRecentPae = mostRecentCall.expression;
    if (!typescript_1.default.isIdentifier(mostRecentPae.name) ||
        mostRecentPae.name.text !== 'mostRecent' ||
        !typescript_1.default.isPropertyAccessExpression(mostRecentPae.expression)) {
        return node;
    }
    // Check 4: Can we get the spy identifier from `spy.calls`?
    const spyIdentifier = getSpyIdentifierFromCalls(mostRecentPae.expression);
    if (!spyIdentifier) {
        return node;
    }
    // If all checks pass, perform the transformation.
    reporter.reportTransformation(sourceFile, node, 'Transformed `spy.calls.mostRecent().args` to `vi.mocked(spy).mock.lastCall`.');
    const mockProperty = createMockedSpyMockProperty(spyIdentifier, pendingVitestValueImports);
    return (0, ast_helpers_1.createPropertyAccess)(mockProperty, 'lastCall');
}
function transformThisFor(node, { sourceFile, reporter, pendingVitestValueImports }) {
    // Check 1: Is the node is a call expression?
    if (!typescript_1.default.isCallExpression(node) || !typescript_1.default.isPropertyAccessExpression(node.expression)) {
        return node;
    }
    // Check 2: Is it a call to `.thisFor`?
    const thisForPae = node.expression;
    if (!typescript_1.default.isIdentifier(thisForPae.name) ||
        thisForPae.name.text !== 'thisFor' ||
        !typescript_1.default.isPropertyAccessExpression(thisForPae.expression)) {
        return node;
    }
    // Check 3: Can we get the spy identifier from `spy.calls`?
    const spyIdentifier = getSpyIdentifierFromCalls(thisForPae.expression);
    if (!spyIdentifier) {
        return node;
    }
    // If all checks pass, perform the transformation.
    reporter.reportTransformation(sourceFile, node, 'Transformed `spy.calls.thisFor(index)` to `vi.mocked(spy).mock.contexts[index]`.');
    const mockProperty = createMockedSpyMockProperty(spyIdentifier, pendingVitestValueImports);
    return typescript_1.default.factory.createElementAccessExpression((0, ast_helpers_1.createPropertyAccess)(mockProperty, 'contexts'), node.arguments[0] ?? typescript_1.default.factory.createNumericLiteral(0));
}
function transformAllCallsArgs(node, { sourceFile, reporter, pendingVitestValueImports }) {
    if (!typescript_1.default.isPropertyAccessExpression(node) ||
        !typescript_1.default.isIdentifier(node.name) ||
        node.name.text !== 'args') {
        return node;
    }
    const elementAccess = node.expression;
    if (!typescript_1.default.isElementAccessExpression(elementAccess)) {
        return node;
    }
    const allCall = elementAccess.expression;
    if (!typescript_1.default.isCallExpression(allCall) || !typescript_1.default.isPropertyAccessExpression(allCall.expression)) {
        return node;
    }
    const allPae = allCall.expression;
    if (!typescript_1.default.isIdentifier(allPae.name) || allPae.name.text !== 'all') {
        return node;
    }
    if (!typescript_1.default.isPropertyAccessExpression(allPae.expression)) {
        return node;
    }
    const spyIdentifier = getSpyIdentifierFromCalls(allPae.expression);
    if (!spyIdentifier) {
        return node;
    }
    reporter.reportTransformation(sourceFile, node, 'Transformed `spy.calls.all()[i].args` to `vi.mocked(spy).mock.calls[i]`.');
    const mockProperty = createMockedSpyMockProperty(spyIdentifier, pendingVitestValueImports);
    const callsProperty = (0, ast_helpers_1.createPropertyAccess)(mockProperty, 'calls');
    return typescript_1.default.factory.createElementAccessExpression(callsProperty, elementAccess.argumentExpression);
}
function transformSpyCallInspection(node, refactorCtx) {
    const mostRecentArgsTransformed = transformMostRecentArgs(node, refactorCtx);
    if (mostRecentArgsTransformed !== node) {
        return mostRecentArgsTransformed;
    }
    const thisForTransformed = transformThisFor(node, refactorCtx);
    if (thisForTransformed !== node) {
        return thisForTransformed;
    }
    const allCallsArgsTransformed = transformAllCallsArgs(node, refactorCtx);
    if (allCallsArgsTransformed !== node) {
        return allCallsArgsTransformed;
    }
    if (!typescript_1.default.isCallExpression(node) || !typescript_1.default.isPropertyAccessExpression(node.expression)) {
        return node;
    }
    const { sourceFile, reporter, pendingVitestValueImports } = refactorCtx;
    const pae = node.expression; // e.g., mySpy.calls.count
    const spyIdentifier = typescript_1.default.isPropertyAccessExpression(pae.expression)
        ? getSpyIdentifierFromCalls(pae.expression)
        : undefined;
    if (spyIdentifier) {
        const mockProperty = createMockedSpyMockProperty(spyIdentifier, pendingVitestValueImports);
        const callsProperty = (0, ast_helpers_1.createPropertyAccess)(mockProperty, 'calls');
        const callName = pae.name.text;
        let newExpression;
        let message;
        switch (callName) {
            case 'any':
                message = 'Transformed `spy.calls.any()` to a check on `mock.calls.length`.';
                newExpression = typescript_1.default.factory.createBinaryExpression((0, ast_helpers_1.createPropertyAccess)(callsProperty, 'length'), typescript_1.default.SyntaxKind.GreaterThanToken, typescript_1.default.factory.createNumericLiteral(0));
                break;
            case 'count':
                message = 'Transformed `spy.calls.count()` to `mock.calls.length`.';
                newExpression = (0, ast_helpers_1.createPropertyAccess)(callsProperty, 'length');
                break;
            case 'first':
                message = 'Transformed `spy.calls.first()` to `mock.calls[0]`.';
                newExpression = typescript_1.default.factory.createElementAccessExpression(callsProperty, 0);
                break;
            case 'all':
            case 'allArgs':
                message = `Transformed \`spy.calls.${callName}()\` to \`mock.calls\`.`;
                newExpression = callsProperty;
                break;
            case 'argsFor':
                message = 'Transformed `spy.calls.argsFor()` to `mock.calls[i]`.';
                newExpression = typescript_1.default.factory.createElementAccessExpression(callsProperty, node.arguments[0]);
                break;
            case 'saveArgumentsByValue':
                {
                    const category = 'saveArgumentsByValue';
                    reporter.recordTodo(category, sourceFile, node);
                    (0, comment_helpers_1.addTodoComment)(node, category);
                }
                break;
            case 'mostRecent':
                if (!typescript_1.default.isPropertyAccessExpression(node.parent) ||
                    !typescript_1.default.isIdentifier(node.parent.name) ||
                    node.parent.name.text !== 'args') {
                    const category = 'mostRecent-without-args';
                    reporter.recordTodo(category, sourceFile, node);
                    (0, comment_helpers_1.addTodoComment)(node, category);
                }
                return node;
        }
        if (newExpression && message) {
            reporter.reportTransformation(sourceFile, node, message);
            return newExpression;
        }
    }
    return node;
}
//# sourceMappingURL=jasmine-spy.js.map