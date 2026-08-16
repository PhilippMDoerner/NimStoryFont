"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_DOCS_EXTENSION = exports.RULE_NAME = void 0;
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const utils_1 = require("@typescript-eslint/utils");
exports.RULE_NAME = 'computed-must-return';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: `Ensures that computed() returns a value. Omitting the value is likely a mistake.`,
        },
        schema: [],
        messages: {
            computedMissingReturn: 'computed() is missing a return value',
        },
    },
    defaultOptions: [],
    create(context) {
        const functionStack = [];
        function enterFunction(node) {
            functionStack.push({
                node,
                hasReturn: false,
            });
        }
        function exitFunction(node) {
            const funcInfo = functionStack.pop();
            if (node.parent?.type === utils_1.AST_NODE_TYPES.CallExpression &&
                node.parent.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                node.parent.callee.name === 'computed' &&
                node.parent.arguments[0] === node) {
                // Arrow function without a body
                if (node.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression &&
                    node.expression) {
                    return;
                }
                if (!funcInfo?.hasReturn) {
                    context.report({
                        node: node.parent,
                        messageId: 'computedMissingReturn',
                    });
                }
            }
        }
        return {
            ArrowFunctionExpression: enterFunction,
            'ArrowFunctionExpression:exit': exitFunction,
            FunctionExpression: enterFunction,
            'FunctionExpression:exit': exitFunction,
            ReturnStatement(node) {
                if (node.argument && functionStack.length > 0) {
                    functionStack[functionStack.length - 1].hasReturn = true;
                }
            },
        };
    },
});
exports.RULE_DOCS_EXTENSION = {
    rationale: "`computed()` is used to transform signal values. If no value is returned from `computed()`, it's likely a mistake.",
};
