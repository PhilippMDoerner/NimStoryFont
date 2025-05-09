"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const get_dom_elements_1 = require("../utils/get-dom-elements");
const to_pattern_1 = require("../utils/to-pattern");
exports.RULE_NAME = 'table-scope';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: '[Accessibility] Ensures that the `scope` attribute is only used on the `<th>` element',
        },
        fixable: 'code',
        schema: [],
        messages: {
            tableScope: 'The `scope` attribute should only be on the `<th>` element',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        const domElementsPattern = (0, to_pattern_1.toPattern)([...(0, get_dom_elements_1.getDomElements)()].filter((domElement) => domElement !== 'th'));
        return {
            [`Element[name=${domElementsPattern}] > :matches(BoundAttribute, TextAttribute)[name='scope']`]({ sourceSpan, }) {
                const loc = parserServices.convertNodeSourceSpanToLoc(sourceSpan);
                context.report({
                    loc,
                    messageId: 'tableScope',
                    fix: (fixer) => fixer.removeRange([
                        sourceSpan.start.offset - 1,
                        sourceSpan.end.offset,
                    ]),
                });
            },
        };
    },
});
