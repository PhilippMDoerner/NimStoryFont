"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const utils_2 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'component-selector';
const VIEW_ENCAPSULATION_SHADOW_DOM = 'ShadowDom';
const VIEW_ENCAPSULATION = 'ViewEncapsulation';
const STYLE_GUIDE_PREFIX_LINK = 'https://angular.dev/style-guide#style-02-07';
const STYLE_GUIDE_STYLE_LINK = 'https://angular.dev/style-guide#style-05-02';
const STYLE_GUIDE_TYPE_LINK = 'https://angular.dev/style-guide#style-05-03';
const SHADOW_DOM_ENCAPSULATED_STYLE_LINK = 'https://github.com/angular-eslint/angular-eslint/issues/534';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Component selectors should follow given naming rules. See more at ${STYLE_GUIDE_PREFIX_LINK}, ${STYLE_GUIDE_STYLE_LINK}
      and ${STYLE_GUIDE_TYPE_LINK}.`,
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
            styleFailure: `The selector should be {{style}} (${STYLE_GUIDE_STYLE_LINK})`,
            styleAndPrefixFailure: `The selector should be {{style}} and start with one of these prefixes: {{prefix}} (${STYLE_GUIDE_STYLE_LINK} and ${STYLE_GUIDE_PREFIX_LINK})`,
            typeFailure: `The selector should be used as an {{type}} (${STYLE_GUIDE_TYPE_LINK})`,
            shadowDomEncapsulatedStyleFailure: `The selector of a ShadowDom-encapsulated component should be \`${utils_1.ASTUtils.OPTION_STYLE_KEBAB_CASE}\` (${SHADOW_DOM_ENCAPSULATED_STYLE_LINK})`,
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
            [utils_1.Selectors.COMPONENT_CLASS_DECORATOR](node) {
                const rawSelectors = utils_1.ASTUtils.getDecoratorPropertyValue(node, 'selector');
                if (!rawSelectors) {
                    return;
                }
                const isValidOptions = utils_1.SelectorUtils.checkValidOptions(type, prefix, style);
                if (!isValidOptions) {
                    return;
                }
                // override `style` for ShadowDom-encapsulated components. See https://github.com/angular-eslint/angular-eslint/issues/534.
                const overrideStyle = style !== utils_1.ASTUtils.OPTION_STYLE_KEBAB_CASE &&
                    hasEncapsulationShadowDomProperty(node)
                    ? utils_1.ASTUtils.OPTION_STYLE_KEBAB_CASE
                    : style;
                const hasExpectedSelector = utils_1.SelectorUtils.checkSelector(rawSelectors, type, (0, utils_1.arrayify)(prefix), overrideStyle);
                if (hasExpectedSelector === null) {
                    return;
                }
                if (!hasExpectedSelector.hasExpectedType) {
                    utils_1.SelectorUtils.reportTypeError(rawSelectors, type, context);
                }
                else if (!hasExpectedSelector.hasExpectedStyle) {
                    if (style === overrideStyle) {
                        if (!hasExpectedSelector.hasExpectedPrefix) {
                            utils_1.SelectorUtils.reportStyleAndPrefixError(rawSelectors, style, prefix, context);
                        }
                        else {
                            utils_1.SelectorUtils.reportStyleError(rawSelectors, style, context);
                        }
                    }
                    else {
                        context.report({
                            node: rawSelectors,
                            messageId: 'shadowDomEncapsulatedStyleFailure',
                        });
                    }
                }
                else if (!hasExpectedSelector.hasExpectedPrefix) {
                    utils_1.SelectorUtils.reportPrefixError(rawSelectors, prefix, context);
                }
            },
        };
    },
});
function hasEncapsulationShadowDomProperty(node) {
    const encapsulationValue = utils_1.ASTUtils.getDecoratorPropertyValue(node, 'encapsulation');
    return (encapsulationValue &&
        utils_1.ASTUtils.isMemberExpression(encapsulationValue) &&
        utils_2.ASTUtils.isIdentifier(encapsulationValue.object) &&
        encapsulationValue.object.name === VIEW_ENCAPSULATION &&
        utils_2.ASTUtils.isIdentifier(encapsulationValue.property) &&
        encapsulationValue.property.name === VIEW_ENCAPSULATION_SHADOW_DOM);
}
