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
exports.transformJasmineToVitest = transformJasmineToVitest;
/**
 * @fileoverview This is the main entry point for the Jasmine to Vitest transformation.
 * It orchestrates the application of various AST transformers to convert Jasmine test
 * syntax and APIs to their Vitest equivalents. It also handles import management,
 * blank line preservation, and reporting of transformation details.
 */
const typescript_1 = __importDefault(require("typescript"));
const fake_async_flush_1 = require("./transformers/fake-async-flush");
const fake_async_flush_microtasks_1 = require("./transformers/fake-async-flush-microtasks");
const fake_async_test_1 = require("./transformers/fake-async-test");
const fake_async_tick_1 = require("./transformers/fake-async-tick");
const jasmine_lifecycle_1 = require("./transformers/jasmine-lifecycle");
const jasmine_matcher_1 = require("./transformers/jasmine-matcher");
const jasmine_misc_1 = require("./transformers/jasmine-misc");
const jasmine_spy_1 = require("./transformers/jasmine-spy");
const jasmine_type_1 = require("./transformers/jasmine-type");
const ast_helpers_1 = require("./utils/ast-helpers");
/**
 * A placeholder used to temporarily replace blank lines in the source code.
 * This is necessary because TypeScript's printer removes blank lines by default.
 */
const BLANK_LINE_PLACEHOLDER = '// __PRESERVE_BLANK_LINE__';
/**
 * Jasmine to Vitest imports map that should be employed when the --add-imports option is used.
 */
const JASMINE_TO_VITEST_IMPORT = new Map([
    ['describe', 'describe'],
    ['fdescribe', 'describe'],
    ['xdescribe', 'describe'],
    ['it', 'it'],
    ['fit', 'it'],
    ['xit', 'it'],
    ['expect', 'expect'],
    ['beforeEach', 'beforeEach'],
    ['afterEach', 'afterEach'],
    ['beforeAll', 'beforeAll'],
    ['afterAll', 'afterAll'],
]);
/**
 * Replaces blank lines in the content with a placeholder to prevent TypeScript's printer
 * from removing them. This ensures that the original formatting of blank lines is preserved.
 * @param content The source code content.
 * @returns The content with blank lines replaced by placeholders.
 */
function preserveBlankLines(content) {
    return content
        .split('\n')
        .map((line) => (line.trim() === '' ? BLANK_LINE_PLACEHOLDER : line))
        .join('\n');
}
/**
 * Restores blank lines in the content by replacing the placeholder with actual blank lines.
 * This is called after TypeScript's printer has processed the file.
 * @param content The content with blank line placeholders.
 * @returns The content with blank lines restored.
 */
function restoreBlankLines(content) {
    const regex = /^\s*\/\/ __PRESERVE_BLANK_LINE__\s*$/gm;
    return content.replace(regex, '');
}
/**
 * A collection of transformers that operate on `ts.CallExpression` nodes.
 * These are applied in stages to ensure correct order of operations:
 * 1. High-Level & Context-Sensitive: Transformations that fundamentally change the call.
 * 2. Core Matcher & Spy: Bulk conversions for `expect(...)` and `spyOn(...)`.
 * 3. Global Functions & Cleanup: Handles global Jasmine functions and unsupported APIs.
 */
const callExpressionTransformers = [
    // **Stage 1: High-Level & Context-Sensitive Transformations**
    // These transformers often wrap or fundamentally change the nature of the call,
    // so they need to run before more specific matchers.
    jasmine_matcher_1.transformWithContext,
    jasmine_matcher_1.transformExpectAsync,
    jasmine_lifecycle_1.transformFocusedAndSkippedTests,
    jasmine_lifecycle_1.transformPending,
    jasmine_lifecycle_1.transformDoneCallback,
    // **Stage 2: Core Matcher & Spy Transformations**
    // This is the bulk of the `expect(...)` and `spyOn(...)` conversions.
    jasmine_matcher_1.transformSyntacticSugarMatchers,
    jasmine_matcher_1.transformComplexMatchers,
    jasmine_spy_1.transformSpies,
    jasmine_spy_1.transformCreateSpy,
    jasmine_spy_1.transformCreateSpyObj,
    jasmine_spy_1.transformSpyReset,
    jasmine_spy_1.transformSpyCallInspection,
    jasmine_matcher_1.transformToHaveBeenCalledBefore,
    jasmine_matcher_1.transformToHaveClass,
    jasmine_matcher_1.transformToBeNullish,
    fake_async_test_1.transformFakeAsyncTest,
    fake_async_tick_1.transformFakeAsyncTick,
    fake_async_flush_1.transformFakeAsyncFlush,
    fake_async_flush_microtasks_1.transformFakeAsyncFlushMicrotasks,
    // **Stage 3: Global Functions & Cleanup**
    // These handle global Jasmine functions and catch-alls for unsupported APIs.
    jasmine_misc_1.transformTimerMocks,
    jasmine_misc_1.transformUnsupportedGlobalFunctions,
    jasmine_misc_1.transformUnsupportedJasmineCalls,
];
/**
 * A collection of transformers that operate on `ts.PropertyAccessExpression` nodes.
 * These primarily handle `jasmine.any()` and other `jasmine.*` properties.
 */
const propertyAccessExpressionTransformers = [
    // These transformers handle `jasmine.any()` and other `jasmine.*` properties.
    jasmine_matcher_1.transformAsymmetricMatchers,
    jasmine_spy_1.transformSpyCallInspection,
    jasmine_misc_1.transformUnknownJasmineProperties,
];
/**
 * A collection of transformers that operate on `ts.ExpressionStatement` nodes.
 * These are mutually exclusive; the first one that matches will be applied.
 */
const expressionStatementTransformers = [
    jasmine_matcher_1.transformCalledOnceWith,
    jasmine_matcher_1.transformArrayWithExactContents,
    jasmine_matcher_1.transformExpectNothing,
    jasmine_misc_1.transformFail,
    jasmine_misc_1.transformJasmineMembers,
];
/**
 * Transforms a string of Jasmine test code to Vitest test code.
 * This is the main entry point for the transformation.
 * @param filePath The path to the file being transformed.
 * @param content The source code to transform.
 * @param reporter The reporter to track TODOs.
 * @param options Transformation options, including whether to add Vitest API imports.
 * @returns The transformed code.
 */
function transformJasmineToVitest(filePath, content, reporter, options) {
    options.fakeAsync ??= false;
    const contentWithPlaceholders = preserveBlankLines(content);
    const sourceFile = typescript_1.default.createSourceFile(filePath, contentWithPlaceholders, typescript_1.default.ScriptTarget.Latest, true, typescript_1.default.ScriptKind.TS);
    const pendingVitestValueImports = new Set();
    const pendingVitestTypeImports = new Set();
    const pendingImportSpecifierRemovals = new Map();
    const transformer = (context) => {
        const refactorCtx = {
            sourceFile,
            reporter,
            tsContext: context,
            pendingVitestValueImports,
            pendingVitestTypeImports,
            pendingImportSpecifierRemovals,
        };
        const visitor = (node) => {
            let transformedNode = node;
            // Transform the node itself based on its type
            if (typescript_1.default.isCallExpression(transformedNode)) {
                if (options.addImports && typescript_1.default.isIdentifier(transformedNode.expression)) {
                    const name = transformedNode.expression.text;
                    const importSpecifierName = JASMINE_TO_VITEST_IMPORT.get(name);
                    if (importSpecifierName) {
                        (0, ast_helpers_1.addVitestValueImport)(pendingVitestValueImports, importSpecifierName);
                    }
                }
                for (const transformer of callExpressionTransformers) {
                    if (!((options.browserMode && transformer === jasmine_matcher_1.transformToHaveClass) ||
                        (options.fakeAsync === false &&
                            [
                                fake_async_flush_1.transformFakeAsyncFlush,
                                fake_async_flush_microtasks_1.transformFakeAsyncFlushMicrotasks,
                                fake_async_tick_1.transformFakeAsyncTick,
                                fake_async_test_1.transformFakeAsyncTest,
                            ].includes(transformer)))) {
                        transformedNode = transformer(transformedNode, refactorCtx);
                    }
                }
            }
            else if (typescript_1.default.isPropertyAccessExpression(transformedNode)) {
                for (const transformer of propertyAccessExpressionTransformers) {
                    transformedNode = transformer(transformedNode, refactorCtx);
                }
            }
            else if (typescript_1.default.isExpressionStatement(transformedNode)) {
                // Statement-level transformers are mutually exclusive. The first one that
                // matches will be applied, and then the visitor will stop for this node.
                for (const transformer of expressionStatementTransformers) {
                    const result = transformer(transformedNode, refactorCtx);
                    if (result !== transformedNode) {
                        transformedNode = result;
                        break;
                    }
                }
            }
            else if (typescript_1.default.isQualifiedName(transformedNode) || typescript_1.default.isTypeReferenceNode(transformedNode)) {
                transformedNode = (0, jasmine_type_1.transformJasmineTypes)(transformedNode, refactorCtx);
            }
            // Visit the children of the node to ensure they are transformed
            if (Array.isArray(transformedNode)) {
                return transformedNode.map((node) => typescript_1.default.visitEachChild(node, visitor, context));
            }
            else {
                return typescript_1.default.visitEachChild(transformedNode, visitor, context);
            }
        };
        return (node) => typescript_1.default.visitEachChild(node, visitor, context);
    };
    const result = typescript_1.default.transform(sourceFile, [transformer]);
    let transformedSourceFile = result.transformed[0];
    const hasPendingValueImports = pendingVitestValueImports.size > 0;
    const hasPendingTypeImports = pendingVitestTypeImports.size > 0;
    const hasPendingImportSpecifierRemovals = pendingImportSpecifierRemovals.size > 0;
    if (transformedSourceFile === sourceFile &&
        !reporter.hasTodos &&
        !hasPendingValueImports &&
        !hasPendingTypeImports &&
        !hasPendingImportSpecifierRemovals) {
        return content;
    }
    if (hasPendingImportSpecifierRemovals) {
        transformedSourceFile = (0, ast_helpers_1.removeImportSpecifiers)(transformedSourceFile, pendingImportSpecifierRemovals);
    }
    if (hasPendingTypeImports || (options.addImports && hasPendingValueImports)) {
        const vitestImport = (0, ast_helpers_1.getVitestAutoImports)(options.addImports ? pendingVitestValueImports : new Set(), pendingVitestTypeImports);
        if (vitestImport) {
            transformedSourceFile = typescript_1.default.factory.updateSourceFile(transformedSourceFile, [
                vitestImport,
                ...transformedSourceFile.statements,
            ]);
        }
    }
    const printer = typescript_1.default.createPrinter();
    const transformedContentWithPlaceholders = printer.printFile(transformedSourceFile);
    return restoreBlankLines(transformedContentWithPlaceholders);
}
//# sourceMappingURL=test-file-transformer.js.map