"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const literal_primitive_1 = require("../utils/literal-primitive");
const unwrap_parenthesized_expression_1 = require("../utils/unwrap-parenthesized-expression");
const messageId = 'preferTemplateLiteral';
exports.RULE_NAME = 'prefer-template-literal';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensure that template literals are used instead of concatenating strings or expressions.',
        },
        fixable: 'code',
        schema: [],
        messages: {
            preferTemplateLiteral: 'Prefer using template literal instead of concatenating strings or expressions',
        },
    },
    defaultOptions: [],
    create(context) {
        (0, utils_1.ensureTemplateParser)(context);
        const { sourceCode } = context;
        return {
            'Binary[operation="+"]'(node) {
                const originalLeft = node.left;
                const originalRight = node.right;
                const left = (0, unwrap_parenthesized_expression_1.unwrapParenthesizedExpression)(originalLeft);
                const right = (0, unwrap_parenthesized_expression_1.unwrapParenthesizedExpression)(originalRight);
                const isLeftString = (0, literal_primitive_1.isStringLiteralPrimitive)(left) || left instanceof bundled_angular_compiler_1.TemplateLiteral;
                const isRightString = (0, literal_primitive_1.isStringLiteralPrimitive)(right) || right instanceof bundled_angular_compiler_1.TemplateLiteral;
                // If both sides are not strings, we don't report anything
                if (!isLeftString && !isRightString) {
                    return;
                }
                const { sourceSpan: { start, end }, } = node;
                const parentIsTemplateLiteral = 'parent' in node && node.parent instanceof bundled_angular_compiler_1.TemplateLiteral;
                function getQuote() {
                    if (parentIsTemplateLiteral) {
                        return '';
                    }
                    // If either side is not a literal primitive, we need to use backticks for interpolation
                    if (!(0, literal_primitive_1.isLiteralPrimitive)(left) || !(0, literal_primitive_1.isLiteralPrimitive)(right)) {
                        return '`';
                    }
                    if (left instanceof bundled_angular_compiler_1.LiteralPrimitive &&
                        right instanceof bundled_angular_compiler_1.LiteralPrimitive) {
                        const leftValue = sourceCode.text.at(left.sourceSpan.start);
                        if (leftValue === "'" || leftValue === '"') {
                            return leftValue;
                        }
                        const rightValue = sourceCode.text.at(right.sourceSpan.start);
                        if (rightValue === "'" || rightValue === '"') {
                            return rightValue;
                        }
                    }
                    return '`';
                }
                context.report({
                    loc: {
                        start: sourceCode.getLocFromIndex(start),
                        end: sourceCode.getLocFromIndex(end),
                    },
                    messageId,
                    fix: (fixer) => {
                        const quote = getQuote();
                        const fixes = Array();
                        // If the parent is a template literal, remove the `${` sign
                        if (parentIsTemplateLiteral) {
                            const templateInterpolationStartIndex = sourceCode.text.lastIndexOf('${', node.sourceSpan.start);
                            fixes.push(fixer.removeRange([
                                templateInterpolationStartIndex,
                                node.sourceSpan.start,
                            ]));
                        }
                        // If both sides are literals, we remove the `+` sign, escape if necessary and concatenate them
                        if (left instanceof bundled_angular_compiler_1.LiteralPrimitive &&
                            right instanceof bundled_angular_compiler_1.LiteralPrimitive) {
                            fixes.push(fixer.replaceTextRange([start, end], parentIsTemplateLiteral
                                ? `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, '`')}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, '`')}`
                                : `${quote}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, quote)}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, quote)}${quote}`));
                        }
                        else {
                            // Fix the left side - handle parenthesized expressions specially
                            if (originalLeft instanceof bundled_angular_compiler_1.ParenthesizedExpression) {
                                fixes.push(...getLeftSideFixesForParenthesized(fixer, left, originalLeft, quote));
                            }
                            else {
                                fixes.push(...getLeftSideFixes(fixer, left, quote));
                            }
                            // Remove the `+` sign (including surrounding whitespace)
                            fixes.push(fixer.removeRange([
                                originalLeft.sourceSpan.end,
                                originalRight.sourceSpan.start,
                            ]));
                            // Fix the right side - handle parenthesized expressions specially
                            if (originalRight instanceof bundled_angular_compiler_1.ParenthesizedExpression) {
                                // For parenthesized expressions, we want to replace the whole thing including parens
                                fixes.push(...getRightSideFixesForParenthesized(fixer, right, originalRight, quote));
                            }
                            else {
                                fixes.push(...getRightSideFixes(fixer, right, quote));
                            }
                        }
                        // If the parent is a template literal, remove the `}` sign
                        if (parentIsTemplateLiteral) {
                            const templateInterpolationEndIndex = sourceCode.text.indexOf('}', node.sourceSpan.end);
                            fixes.push(fixer.removeRange([
                                node.sourceSpan.end,
                                templateInterpolationEndIndex + 1,
                            ]));
                        }
                        return fixes;
                    },
                });
            },
        };
    },
});
function getLeftSideFixes(fixer, left, quote) {
    const { start, end } = left.sourceSpan;
    if (left instanceof bundled_angular_compiler_1.TemplateLiteral) {
        // Remove the end ` sign from the left side
        return [
            fixer.replaceTextRange([start, start + 1], quote),
            fixer.removeRange([end - 1, end]),
        ];
    }
    if ((0, literal_primitive_1.isLiteralPrimitive)(left)) {
        // Transform left side to template literal
        return [
            fixer.replaceTextRange([start, end], quote === ''
                ? `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, '`')}`
                : `${quote}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, quote)}`),
        ];
    }
    // Transform left side to template literal
    return [
        fixer.insertTextBeforeRange([start, end], `${quote}\${`),
        fixer.insertTextAfterRange([start, end], '}'),
    ];
}
function getLeftSideFixesForParenthesized(fixer, innerExpression, parenthesizedExpression, quote) {
    const parenthesizedStart = parenthesizedExpression.sourceSpan.start;
    const parenthesizedEnd = parenthesizedExpression.sourceSpan.end;
    const innerStart = innerExpression.sourceSpan.start;
    const innerEnd = innerExpression.sourceSpan.end;
    if (innerExpression instanceof bundled_angular_compiler_1.TemplateLiteral) {
        // Remove the end ` sign from the inner expression and remove the parentheses
        return [
            fixer.replaceTextRange([parenthesizedStart, innerStart + 1], quote), // Replace opening paren and backtick with quote
            fixer.removeRange([innerEnd - 1, parenthesizedEnd]), // Remove closing backtick and paren
        ];
    }
    if ((0, literal_primitive_1.isLiteralPrimitive)(innerExpression)) {
        // Transform to template literal and remove parentheses
        return [
            fixer.replaceTextRange([parenthesizedStart, parenthesizedEnd], quote === ''
                ? `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(innerExpression, '`')}`
                : `${quote}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(innerExpression, quote)}`),
        ];
    }
    // Transform parenthesized expression to template literal by removing parens and wrapping in ${}
    return [
        fixer.replaceTextRange([parenthesizedStart, innerStart], `${quote}\${`), // Replace opening paren with quote${
        fixer.replaceTextRange([innerEnd, parenthesizedEnd], '}'), // Replace closing paren with }
    ];
}
function getRightSideFixes(fixer, right, quote) {
    const { start, end } = right.sourceSpan;
    if (right instanceof bundled_angular_compiler_1.TemplateLiteral) {
        // Remove the start ` sign from the right side
        return [
            fixer.removeRange([start, start + 1]),
            fixer.replaceTextRange([end - 1, end], quote),
        ];
    }
    if ((0, literal_primitive_1.isLiteralPrimitive)(right)) {
        // Transform right side to template literal if it's a string
        return [
            fixer.replaceTextRange([start, end], quote === ''
                ? `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, '`')}`
                : `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, quote)}${quote}`),
        ];
    }
    // Transform right side to template literal
    return [
        fixer.insertTextBeforeRange([start, end], '${'),
        fixer.insertTextAfterRange([start, end], `}${quote}`),
    ];
}
function getRightSideFixesForParenthesized(fixer, innerExpression, parenthesizedExpression, quote) {
    const parenthesizedStart = parenthesizedExpression.sourceSpan.start;
    const parenthesizedEnd = parenthesizedExpression.sourceSpan.end;
    const innerStart = innerExpression.sourceSpan.start;
    const innerEnd = innerExpression.sourceSpan.end;
    if (innerExpression instanceof bundled_angular_compiler_1.TemplateLiteral) {
        // Remove the start ` sign from the inner expression and remove the parentheses
        return [
            fixer.removeRange([parenthesizedStart, innerStart + 1]), // Remove opening paren and backtick
            fixer.replaceTextRange([innerEnd - 1, parenthesizedEnd], quote), // Replace closing backtick and paren with quote
        ];
    }
    if ((0, literal_primitive_1.isLiteralPrimitive)(innerExpression)) {
        // Transform to template literal and remove parentheses
        return [
            fixer.replaceTextRange([parenthesizedStart, parenthesizedEnd], quote === ''
                ? `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(innerExpression, '`')}`
                : `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(innerExpression, quote)}${quote}`),
        ];
    }
    // Transform parenthesized expression to template literal by removing parens and wrapping in ${}
    return [
        fixer.replaceTextRange([parenthesizedStart, innerStart], '${'), // Replace opening paren with ${
        fixer.replaceTextRange([innerEnd, parenthesizedEnd], `}${quote}`), // Replace closing paren with }quote
    ];
}
