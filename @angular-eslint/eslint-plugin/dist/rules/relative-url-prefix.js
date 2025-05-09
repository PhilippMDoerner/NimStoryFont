"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'relative-url-prefix';
const STYLE_GUIDE_LINK = 'https://angular.dev/style-guide#style-05-04';
const RELATIVE_URL_PREFIX_MATCHER = /^\.\.?\/.+/;
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `The ./ and ../ prefix is standard syntax for relative URLs; don't depend on Angular's current ability to do without that prefix. See more at ${STYLE_GUIDE_LINK}`,
        },
        schema: [],
        messages: {
            relativeUrlPrefix: `The ./ and ../ prefix is standard syntax for relative URLs. (${STYLE_GUIDE_LINK})`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            [`${utils_1.Selectors.COMPONENT_CLASS_DECORATOR} Property[key.name='templateUrl']`]({ value, }) {
                if (!isUrlInvalid(value))
                    return;
                context.report({
                    node: value,
                    messageId: 'relativeUrlPrefix',
                });
            },
            [`${utils_1.Selectors.COMPONENT_CLASS_DECORATOR} Property[key.name='styleUrls']`]({ value, }) {
                if (!utils_1.ASTUtils.isArrayExpression(value))
                    return;
                value.elements.filter(isUrlInvalid).forEach((element) => {
                    if (!element) {
                        return;
                    }
                    context.report({
                        node: element,
                        messageId: 'relativeUrlPrefix',
                    });
                });
            },
        };
    },
});
function isUrlInvalid(node) {
    if (!node) {
        return false;
    }
    return (!utils_1.ASTUtils.isStringLiteral(node) ||
        !RELATIVE_URL_PREFIX_MATCHER.test(node.value));
}
