"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-attribute-decorator';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: `The @Attribute decorator is used to obtain a single value for an attribute. This is a much less common use-case than getting a stream of values (using @Input), so often the @Attribute decorator is mistakenly used when @Input was what was intended. This rule disallows usage of @Attribute decorator altogether in order to prevent these mistakes.`,
        },
        schema: [],
        messages: {
            noAttributeDecorator: '@Attribute can only obtain a single value and is rarely what is required. Use @Input instead to retrieve a stream of values.',
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            'ClassDeclaration MethodDefinition[key.name="constructor"] Decorator[expression.callee.name="Attribute"]'(node) {
                context.report({
                    node,
                    messageId: 'noAttributeDecorator',
                });
            },
        };
    },
});
