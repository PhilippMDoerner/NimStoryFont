"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const is_hidden_from_screen_reader_1 = require("../utils/is-hidden-from-screen-reader");
exports.RULE_NAME = 'elements-content';
const DEFAULT_SAFELIST_ATTRIBUTES = [
    'aria-label',
    'innerHtml',
    'innerHTML',
    'innerText',
    'outerHTML',
    'title',
];
const DEFAULT_OPTIONS = {
    allowList: DEFAULT_SAFELIST_ATTRIBUTES,
};
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: '[Accessibility] Ensures that the heading, anchor and button elements have content in it',
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    allowList: {
                        items: { type: 'string' },
                        type: 'array',
                        uniqueItems: true,
                    },
                },
                type: 'object',
            },
        ],
        messages: {
            elementsContent: '<{{element}}> should have content',
        },
    },
    defaultOptions: [DEFAULT_OPTIONS],
    create(context, [{ allowList }]) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            'Element[name=/^(a|button|h1|h2|h3|h4|h5|h6)$/][children.length=0]'(node) {
                if ((0, is_hidden_from_screen_reader_1.isHiddenFromScreenReader)(node))
                    return;
                const { attributes, inputs, name: element, sourceSpan } = node;
                const safelistAttributes = new Set([
                    ...DEFAULT_SAFELIST_ATTRIBUTES,
                    ...(allowList ?? []),
                ]);
                const hasAttributeSafelisted = [...attributes, ...inputs]
                    .map(({ name }) => name)
                    .some((inputName) => safelistAttributes.has(inputName));
                if (hasAttributeSafelisted)
                    return;
                const loc = parserServices.convertNodeSourceSpanToLoc(sourceSpan);
                context.report({
                    loc,
                    messageId: 'elementsContent',
                    data: { element },
                });
            },
        };
    },
});
