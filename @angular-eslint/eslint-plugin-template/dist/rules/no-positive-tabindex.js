"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const get_dom_elements_1 = require("../utils/get-dom-elements");
const to_pattern_1 = require("../utils/to-pattern");
exports.RULE_NAME = 'no-positive-tabindex';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that the `tabindex` attribute is not positive',
        },
        hasSuggestions: true,
        schema: [],
        messages: {
            noPositiveTabindex: 'The `tabindex` attribute should not be positive',
            suggestNonNegativeTabindex: 'Use `tabindex="{{tabindex}}"`',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        const elementNamePattern = (0, to_pattern_1.toPattern)([...(0, get_dom_elements_1.getDomElements)()]);
        return {
            [`Element[name=${elementNamePattern}] > BoundAttribute[name="tabindex"][value.ast.value>0], TextAttribute[name="tabindex"][value>0]`]({ valueSpan, }) {
                const loc = parserServices.convertNodeSourceSpanToLoc(valueSpan);
                context.report({
                    loc,
                    messageId: 'noPositiveTabindex',
                    suggest: ['-1', '0'].map((tabindex) => ({
                        messageId: 'suggestNonNegativeTabindex',
                        fix: (fixer) => fixer.replaceTextRange([valueSpan.start.offset, valueSpan.end.offset], tabindex),
                        data: { tabindex },
                    })),
                });
            },
        };
    },
});
