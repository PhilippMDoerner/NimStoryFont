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
exports.transformFakeAsyncTick = transformFakeAsyncTick;
const typescript_1 = __importDefault(require("typescript"));
const ast_helpers_1 = require("../utils/ast-helpers");
const constants_1 = require("../utils/constants");
const refactor_helpers_1 = require("../utils/refactor-helpers");
function transformFakeAsyncTick(node, ctx) {
    if (!(typescript_1.default.isCallExpression(node) &&
        typescript_1.default.isIdentifier(node.expression) &&
        node.expression.text === 'tick' &&
        (0, ast_helpers_1.isNamedImportFrom)(ctx.sourceFile, 'tick', constants_1.ANGULAR_CORE_TESTING))) {
        return node;
    }
    ctx.reporter.reportTransformation(ctx.sourceFile, node, `Transformed \`tick\` to \`await vi.advanceTimersByTimeAsync()\`.`);
    (0, refactor_helpers_1.addImportSpecifierRemoval)(ctx, 'tick', constants_1.ANGULAR_CORE_TESTING);
    const durationNumericLiteral = node.arguments.length > 0 ? node.arguments[0] : typescript_1.default.factory.createNumericLiteral(0);
    return typescript_1.default.factory.createAwaitExpression((0, refactor_helpers_1.createViCallExpression)(ctx, 'advanceTimersByTimeAsync', [durationNumericLiteral]));
}
//# sourceMappingURL=fake-async-tick.js.map