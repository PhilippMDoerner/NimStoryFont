"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'cyclomatic-complexity';
const DEFAULT_MAX_COMPLEXITY = 5;
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Checks cyclomatic complexity against a specified limit. It is a quantitative measure of the number of linearly independent paths through a program's source code`,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    maxComplexity: {
                        type: 'number',
                        minimum: 1,
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            cyclomaticComplexity: 'The cyclomatic complexity {{totalComplexity}} exceeds the defined limit {{maxComplexity}}',
        },
    },
    defaultOptions: [{ maxComplexity: DEFAULT_MAX_COMPLEXITY }],
    create(context, [{ maxComplexity }]) {
        let totalComplexity = 0;
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        function increment(node) {
            totalComplexity += 1;
            if (totalComplexity <= maxComplexity)
                return;
            const loc = parserServices.convertNodeSourceSpanToLoc(node.sourceSpan);
            context.report({
                messageId: 'cyclomaticComplexity',
                loc,
                data: { maxComplexity, totalComplexity },
            });
        }
        return {
            '*': (node) => {
                if (node instanceof bundled_angular_compiler_1.TmplAstBoundAttribute &&
                    /^(ngForOf|ngIf|ngSwitchCase)$/.test(node.name)) {
                    increment(node);
                }
                else if (node instanceof bundled_angular_compiler_1.TmplAstTextAttribute &&
                    node.name === 'ngSwitchDefault') {
                    increment(node);
                }
                else if (node instanceof bundled_angular_compiler_1.TmplAstIfBlock ||
                    node instanceof bundled_angular_compiler_1.TmplAstForLoopBlock ||
                    node instanceof bundled_angular_compiler_1.TmplAstSwitchBlockCase) {
                    increment(node);
                }
            },
        };
    },
});
