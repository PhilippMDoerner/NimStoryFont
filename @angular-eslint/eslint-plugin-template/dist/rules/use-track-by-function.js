"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'use-track-by-function';
const DEFAULT_ALIAS = [];
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures trackBy function is used',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            useTrackByFunction: 'Missing trackBy function in ngFor directive',
        },
    },
    defaultOptions: [{ alias: DEFAULT_ALIAS }],
    create(context, [{ alias }]) {
        const isNgForTrackBy = isNgForTrackByFactory(alias);
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            'BoundAttribute.inputs[name="ngForOf"]'({ parent: { inputs }, sourceSpan, }) {
                if (inputs.some(isNgForTrackBy)) {
                    return;
                }
                const loc = parserServices.convertNodeSourceSpanToLoc(sourceSpan);
                context.report({
                    messageId: 'useTrackByFunction',
                    loc,
                });
            },
            'BoundAttribute.templateAttrs[name="ngForOf"]'({ parent: { templateAttrs }, }) {
                if (templateAttrs.some(isNgForTrackBy)) {
                    return;
                }
                const { start } = parserServices.convertNodeSourceSpanToLoc(templateAttrs[0].sourceSpan);
                const { end } = parserServices.convertNodeSourceSpanToLoc(templateAttrs[templateAttrs.length - 1].sourceSpan);
                const loc = {
                    start: {
                        ...start,
                        column: start.column - 1,
                    },
                    end: {
                        ...end,
                        column: end.column + 1,
                    },
                };
                context.report({
                    messageId: 'useTrackByFunction',
                    loc,
                });
            },
        };
    },
});
const DEFAULT_NG_FOR_TRACK_BY_ATTRIBUTE_NAME = 'ngForTrackBy';
function isNgForTrackByFactory(alias) {
    const names = [...alias, DEFAULT_NG_FOR_TRACK_BY_ATTRIBUTE_NAME];
    return (attribute) => names.includes(attribute.name);
}
