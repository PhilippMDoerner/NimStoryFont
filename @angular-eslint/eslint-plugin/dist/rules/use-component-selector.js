"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'use-component-selector';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Component selector must be declared',
        },
        schema: [],
        messages: {
            useComponentSelector: 'The selector of the component is mandatory',
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            [utils_1.Selectors.COMPONENT_CLASS_DECORATOR](node) {
                const selector = utils_1.ASTUtils.getDecoratorPropertyValue(node, 'selector');
                if (selector &&
                    ((utils_1.ASTUtils.isStringLiteral(selector) && selector.value.length) ||
                        utils_1.ASTUtils.isTemplateLiteral(selector))) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'useComponentSelector',
                });
            },
        };
    },
});
