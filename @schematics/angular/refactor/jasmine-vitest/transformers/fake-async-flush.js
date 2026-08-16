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
exports.transformFakeAsyncFlush = transformFakeAsyncFlush;
const typescript_1 = __importDefault(require("typescript"));
const ast_helpers_1 = require("../utils/ast-helpers");
const comment_helpers_1 = require("../utils/comment-helpers");
const constants_1 = require("../utils/constants");
const refactor_helpers_1 = require("../utils/refactor-helpers");
function transformFakeAsyncFlush(node, ctx) {
    if (!(typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === 'flush' &&
        (0, ast_helpers_1.isNamedImportFrom)(ctx.sourceFile, 'flush', constants_1.ANGULAR_CORE_TESTING))) {
        return node;
    }
    ctx.reporter.reportTransformation(ctx.sourceFile, node, `Transformed \`flush\` to \`await vi.runAllTimersAsync()\`.`);
    (0, refactor_helpers_1.addImportSpecifierRemoval)(ctx, 'flush', constants_1.ANGULAR_CORE_TESTING);
    if (node.arguments.length > 0) {
        ctx.reporter.recordTodo('flush-max-turns', ctx.sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, 'flush-max-turns');
    }
    const awaitRunAllTimersAsync = typescript_1.default.factory.createAwaitExpression((0, refactor_helpers_1.createViCallExpression)(ctx, 'runAllTimersAsync'));
    if (typescript_1.default.isExpressionStatement(node.parent)) {
        return awaitRunAllTimersAsync;
    }
    else {
        // If `flush` is not used as its own statement, then the return value is probably used.
        // Therefore, we replace it with nullish coalescing that returns 0:
        // > await vi.runAllTimersAsync() ?? 0;
        ctx.reporter.recordTodo('flush-return-value', ctx.sourceFile, node);
        (0, comment_helpers_1.addTodoComment)(node, 'flush-return-value');
        return typescript_1.default.factory.createBinaryExpression(awaitRunAllTimersAsync, typescript_1.default.SyntaxKind.QuestionQuestionToken, typescript_1.default.factory.createNumericLiteral(0));
    }
}
//# sourceMappingURL=fake-async-flush.js.map