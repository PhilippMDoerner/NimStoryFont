"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'directive-selector';
const STYLE_GUIDE_PREFIX_LINK = 'https://angular.dev/style-guide#style-02-08';
const STYLE_GUIDE_STYLE_TYPE_LINK = 'https://angular.dev/style-guide#style-02-06';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Directive selectors should follow given naming rules. See more at ${STYLE_GUIDE_STYLE_TYPE_LINK} and ${STYLE_GUIDE_PREFIX_LINK}.`,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    type: {
                        oneOf: [
                            { type: 'string' },
                            {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    enum: [
                                        utils_1.SelectorUtils.OPTION_TYPE_ELEMENT,
                                        utils_1.SelectorUtils.OPTION_TYPE_ATTRIBUTE,
                                    ],
                                },
                            },
                        ],
                    },
                    prefix: {
                        oneOf: [{ type: 'string' }, { type: 'array' }],
                    },
                    style: {
                        type: 'string',
                        enum: [
                            utils_1.ASTUtils.OPTION_STYLE_CAMEL_CASE,
                            utils_1.ASTUtils.OPTION_STYLE_KEBAB_CASE,
                        ],
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            prefixFailure: `The selector should start with one of these prefixes: {{prefix}} (${STYLE_GUIDE_PREFIX_LINK})`,
            styleFailure: `The selector should be {{style}} (${STYLE_GUIDE_STYLE_TYPE_LINK})`,
            typeFailure: `The selector should be used as an {{type}} (${STYLE_GUIDE_STYLE_TYPE_LINK})`,
        },
    },
    defaultOptions: [
        {
            type: '',
            prefix: '',
            style: '',
        },
    ],
    create(context, [{ type, prefix, style }]) {
        return {
            [utils_1.Selectors.DIRECTIVE_CLASS_DECORATOR](node) {
                const rawSelectors = utils_1.ASTUtils.getDecoratorPropertyValue(node, 'selector');
                if (!rawSelectors) {
                    return;
                }
                const isValidOptions = utils_1.SelectorUtils.checkValidOptions(type, prefix, style);
                if (!isValidOptions) {
                    return;
                }
                const hasExpectedSelector = utils_1.SelectorUtils.checkSelector(rawSelectors, type, (0, utils_1.arrayify)(prefix), style);
                if (hasExpectedSelector === null) {
                    return;
                }
                if (!hasExpectedSelector.hasExpectedType) {
                    utils_1.SelectorUtils.reportTypeError(rawSelectors, type, context);
                }
                else if (!hasExpectedSelector.hasExpectedStyle) {
                    utils_1.SelectorUtils.reportStyleError(rawSelectors, style, context);
                }
                else if (!hasExpectedSelector.hasExpectedPrefix) {
                    utils_1.SelectorUtils.reportPrefixError(rawSelectors, prefix, context);
                }
            },
        };
    },
});
