"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_DOCS_EXTENSION = exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-non-null-assertion';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Disallows the non-null assertion operator (!) in templates',
        },
        schema: [],
        messages: {
            noNonNullAssertion: 'Avoid using the non-null assertion operator (!) in templates. This bypasses type safety and can lead to runtime errors.',
        },
    },
    defaultOptions: [],
    create(context) {
        (0, utils_1.ensureTemplateParser)(context);
        const { sourceCode } = context;
        return {
            NonNullAssert(node) {
                const { start, end } = node.sourceSpan;
                context.report({
                    messageId: 'noNonNullAssertion',
                    loc: {
                        start: sourceCode.getLocFromIndex(start),
                        end: sourceCode.getLocFromIndex(end),
                    },
                });
            },
        };
    },
});
exports.RULE_DOCS_EXTENSION = {
    rationale: "Equivalent of @typescript-eslint/no-non-null-assertion rule for Angular templates. TypeScript's `!` non-null assertion operator asserts to the type system that an expression is non-nullable, as in not `null` or `undefined`. Using assertions to tell the type system new information is often a sign that code is not fully type-safe. It's generally better to structure program logic so that TypeScript understands when values may be nullable.",
};
