"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'pipe-prefix';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforce consistent prefix for pipes.',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    prefixes: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        uniqueItems: true,
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            pipePrefix: '@Pipes should be prefixed by {{prefixes}}',
        },
    },
    defaultOptions: [
        {
            prefixes: [],
        },
    ],
    create(context, [{ prefixes }]) {
        function checkValidOption(prefixes) {
            return Array.isArray(prefixes) && prefixes.length > 0;
        }
        return {
            [utils_1.Selectors.PIPE_CLASS_DECORATOR](node) {
                const nameSelector = utils_1.ASTUtils.getDecoratorPropertyValue(node, 'name');
                if (!nameSelector) {
                    return;
                }
                const isValidOption = checkValidOption(prefixes);
                if (!isValidOption) {
                    return;
                }
                const allowPrefixesExpression = prefixes.join('|');
                const prefixValidator = utils_1.SelectorUtils.SelectorValidator.prefix(allowPrefixesExpression, 'camelCase');
                let nameValue;
                if (utils_1.ASTUtils.isStringLiteral(nameSelector)) {
                    nameValue = nameSelector.value;
                }
                else if (utils_1.ASTUtils.isTemplateLiteral(nameSelector) &&
                    nameSelector.quasis[0]) {
                    nameValue = nameSelector.quasis[0].value.raw;
                }
                if (!nameValue) {
                    return;
                }
                if (!prefixValidator.apply(this, [nameValue])) {
                    context.report({
                        node: nameSelector,
                        messageId: 'pipePrefix',
                        data: {
                            prefixes: (0, utils_1.toHumanReadableText)(prefixes),
                        },
                    });
                }
            },
        };
    },
});
