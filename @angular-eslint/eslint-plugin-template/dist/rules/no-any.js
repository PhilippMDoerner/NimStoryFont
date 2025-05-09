"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-any';
const ANY_TYPE_CAST_FUNCTION_NAME = '$any';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `The use of "${ANY_TYPE_CAST_FUNCTION_NAME}" nullifies the compile-time benefits of Angular's type system`,
        },
        hasSuggestions: true,
        schema: [],
        messages: {
            noAny: `Avoid using "${ANY_TYPE_CAST_FUNCTION_NAME}" in templates`,
            suggestRemoveAny: `Remove ${ANY_TYPE_CAST_FUNCTION_NAME}`,
        },
    },
    defaultOptions: [],
    create(context) {
        (0, utils_1.ensureTemplateParser)(context);
        const sourceCode = context.sourceCode;
        return {
            [`Call[receiver.name="${ANY_TYPE_CAST_FUNCTION_NAME}"]`]({ receiver, sourceSpan: { end, start }, }) {
                if (!(receiver instanceof bundled_angular_compiler_1.PropertyRead)) {
                    return;
                }
                if (!(
                // this.$any() is also valid usage of the native Angular $any()
                (receiver.receiver instanceof bundled_angular_compiler_1.ThisReceiver ||
                    receiver.receiver instanceof bundled_angular_compiler_1.ImplicitReceiver))) {
                    return;
                }
                const nameSpan = receiver.nameSpan;
                context.report({
                    messageId: 'noAny',
                    loc: {
                        start: sourceCode.getLocFromIndex(start),
                        end: sourceCode.getLocFromIndex(end),
                    },
                    suggest: [
                        {
                            messageId: 'suggestRemoveAny',
                            fix: (fixer) => [
                                fixer.removeRange([nameSpan.start, nameSpan.end + 1]),
                                fixer.removeRange([end - 1, end]),
                            ],
                        },
                    ],
                });
            },
        };
    },
});
