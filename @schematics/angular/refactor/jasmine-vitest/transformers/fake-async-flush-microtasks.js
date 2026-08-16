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
exports.transformFakeAsyncFlushMicrotasks = transformFakeAsyncFlushMicrotasks;
const typescript_1 = __importDefault(require("typescript"));
const ast_helpers_1 = require("../utils/ast-helpers");
const constants_1 = require("../utils/constants");
const refactor_helpers_1 = require("../utils/refactor-helpers");
function transformFakeAsyncFlushMicrotasks(node, ctx) {
    if (!(typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === 'flushMicrotasks' &&
        (0, ast_helpers_1.isNamedImportFrom)(ctx.sourceFile, 'flushMicrotasks', constants_1.ANGULAR_CORE_TESTING))) {
        return node;
    }
    ctx.reporter.reportTransformation(ctx.sourceFile, node, `Transformed \`flushMicrotasks\` to \`await vi.advanceTimersByTimeAsync(0)\`.`);
    (0, refactor_helpers_1.addImportSpecifierRemoval)(ctx, 'flushMicrotasks', constants_1.ANGULAR_CORE_TESTING);
    return typescript_1.default.factory.createAwaitExpression((0, refactor_helpers_1.createViCallExpression)(ctx, 'advanceTimersByTimeAsync', [typescript_1.default.factory.createNumericLiteral(0)]));
}
//# sourceMappingURL=fake-async-flush-microtasks.js.map