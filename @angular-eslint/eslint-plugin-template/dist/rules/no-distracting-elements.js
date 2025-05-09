"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-distracting-elements';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: '[Accessibility] Enforces that no distracting elements are used',
        },
        fixable: 'code',
        schema: [],
        messages: {
            noDistractingElements: 'Do not use <{{element}}> elements as they can create visual accessibility issues and are deprecated',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            'Element[name=/^(blink|marquee)$/]'({ name: element, sourceSpan, }) {
                const loc = parserServices.convertNodeSourceSpanToLoc(sourceSpan);
                context.report({
                    loc,
                    messageId: 'noDistractingElements',
                    data: { element },
                    fix: (fixer) => fixer.removeRange([sourceSpan.start.offset, sourceSpan.end.offset]),
                });
            },
        };
    },
});
