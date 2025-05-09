"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'prefer-control-flow';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that the built-in control flow is used.',
        },
        schema: [],
        messages: {
            preferControlFlow: 'Use built-in control flow instead of directive {{name}}.',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            'BoundAttribute[name=/^(ngForOf|ngIf|ngSwitch)$/]'({ sourceSpan, name, }) {
                const loc = parserServices.convertNodeSourceSpanToLoc(sourceSpan);
                context.report({
                    messageId: 'preferControlFlow',
                    loc,
                    data: { name },
                });
            },
        };
    },
});
