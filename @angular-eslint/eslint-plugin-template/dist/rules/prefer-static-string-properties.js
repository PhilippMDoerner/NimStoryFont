"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'prefer-static-string-properties';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'layout',
        docs: {
            description: 'Ensures that static string values use property assignment instead of property binding.',
        },
        fixable: 'code',
        schema: [],
        messages: {
            preferStaticStringProperties: 'Using a property is more efficient than binding a static string.',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            ['BoundAttribute.inputs']({ name, sourceSpan, keySpan, value, }) {
                // Exclude @xxx (Animation) and xx.color
                // When attribute start with "*", keySpan details is null so *ngSwitchCase is excluded
                const isBindingProperty = keySpan?.details &&
                    !keySpan.details.includes('@') &&
                    !keySpan.details.includes('.');
                if (isBindingProperty &&
                    value instanceof bundled_angular_compiler_1.ASTWithSource &&
                    value.ast instanceof bundled_angular_compiler_1.LiteralPrimitive &&
                    typeof value.ast.value === 'string') {
                    // If the string literal is quoted with a double quote,
                    // then the property binding must be using single quotes
                    // to quote the value, and we should keep using single
                    // quotes when we convert it to a property assignment.
                    const quote = value.source?.trimStart().at(0) === '"' ? "'" : '"';
                    const literal = value.ast.value;
                    context.report({
                        loc: parserServices.convertNodeSourceSpanToLoc(sourceSpan),
                        messageId: 'preferStaticStringProperties',
                        fix: (fixer) => fixer.replaceTextRange([sourceSpan.start.offset, sourceSpan.end.offset], `${name}=${quote}${literal}${quote}`),
                    });
                }
            },
        };
    },
});
