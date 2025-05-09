"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORWARD_REF = exports.RULE_NAME = void 0;
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-forward-ref';
exports.FORWARD_REF = 'forwardRef';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Disallows usage of \`${exports.FORWARD_REF}\` references for DI`,
        },
        schema: [],
        messages: {
            noForwardRef: `Avoid using \`${exports.FORWARD_REF}\``,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            [`CallExpression[callee.type="Identifier"][callee.name="${exports.FORWARD_REF}"]`](node) {
                context.report({
                    node,
                    messageId: 'noForwardRef',
                });
            },
        };
    },
});
