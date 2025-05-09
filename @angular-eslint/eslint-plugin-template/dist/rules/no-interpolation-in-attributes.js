"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-interpolation-in-attributes';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that property-binding is used instead of interpolation in attributes.',
        },
        schema: [],
        messages: {
            noInterpolationInAttributes: 'Use property binding [attribute]="value" instead of interpolation {{ value }} for an attribute.',
        },
    },
    defaultOptions: [],
    create(context) {
        const sourceCode = context.sourceCode;
        return {
            ['BoundAttribute Interpolation'](interpolation) {
                const { sourceSpan: { start, end }, } = interpolation;
                context.report({
                    loc: {
                        start: sourceCode.getLocFromIndex(start),
                        end: sourceCode.getLocFromIndex(end),
                    },
                    messageId: 'noInterpolationInAttributes',
                });
            },
        };
    },
});
