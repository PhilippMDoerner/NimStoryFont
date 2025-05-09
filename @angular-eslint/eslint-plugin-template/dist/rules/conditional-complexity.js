"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'conditional-complexity';
const DEFAULT_MAX_COMPLEXITY = 5;
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'The conditional complexity should not exceed a rational limit',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    maxComplexity: {
                        minimum: 1,
                        type: 'number',
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            conditionalComplexity: 'The conditional complexity {{totalComplexity}} exceeds the defined limit {{maxComplexity}}',
        },
    },
    defaultOptions: [{ maxComplexity: DEFAULT_MAX_COMPLEXITY }],
    create(context, [{ maxComplexity }]) {
        (0, utils_1.ensureTemplateParser)(context);
        const sourceCode = context.sourceCode;
        return {
            BoundAttribute(node) {
                if (!node.value.source || node.value.ast instanceof bundled_angular_compiler_1.Interpolation) {
                    return;
                }
                const possibleBinary = extractPossibleBinaryOrConditionalFrom(getParser().parseBinding(node.value.source, '', 0).ast);
                const totalComplexity = getTotalComplexity(possibleBinary);
                if (totalComplexity <= maxComplexity) {
                    return;
                }
                const { sourceSpan: { start, end }, } = node.value;
                context.report({
                    loc: {
                        start: sourceCode.getLocFromIndex(start),
                        end: sourceCode.getLocFromIndex(end),
                    },
                    messageId: 'conditionalComplexity',
                    data: { maxComplexity, totalComplexity },
                });
            },
            Interpolation({ expressions }) {
                for (const expression of expressions) {
                    const totalComplexity = getTotalComplexity(expression);
                    if (totalComplexity <= maxComplexity) {
                        continue;
                    }
                    const { sourceSpan: { start, end }, } = expression;
                    context.report({
                        loc: {
                            start: sourceCode.getLocFromIndex(start),
                            end: sourceCode.getLocFromIndex(end),
                        },
                        messageId: 'conditionalComplexity',
                        data: { maxComplexity, totalComplexity },
                    });
                }
            },
        };
    },
});
function extractPossibleBinaryOrConditionalFrom(node) {
    return node instanceof bundled_angular_compiler_1.BindingPipe ? node.exp : node;
}
let parser = null;
// Instantiate the `Parser` class lazily only when this rule is applied.
function getParser() {
    return parser || (parser = new bundled_angular_compiler_1.Parser(new bundled_angular_compiler_1.Lexer()));
}
function getTotalComplexity(ast) {
    const possibleBinaryOrConditional = extractPossibleBinaryOrConditionalFrom(ast);
    if (!(possibleBinaryOrConditional instanceof bundled_angular_compiler_1.Binary ||
        possibleBinaryOrConditional instanceof bundled_angular_compiler_1.Conditional)) {
        return 0;
    }
    let total = 1;
    if (possibleBinaryOrConditional instanceof bundled_angular_compiler_1.Binary) {
        if (possibleBinaryOrConditional.left instanceof bundled_angular_compiler_1.Binary) {
            total += getTotalComplexity(possibleBinaryOrConditional.left);
        }
        if (possibleBinaryOrConditional.right instanceof bundled_angular_compiler_1.Binary) {
            total += getTotalComplexity(possibleBinaryOrConditional.right);
        }
    }
    if (possibleBinaryOrConditional instanceof bundled_angular_compiler_1.Conditional) {
        total +=
            getTotalComplexity(possibleBinaryOrConditional.condition) +
                getTotalComplexity(possibleBinaryOrConditional.trueExp) +
                getTotalComplexity(possibleBinaryOrConditional.falseExp);
    }
    return total;
}
