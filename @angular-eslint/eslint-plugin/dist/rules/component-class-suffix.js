"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'component-class-suffix';
const STYLE_GUIDE_LINK = 'https://angular.dev/style-guide#style-02-03';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Classes decorated with @Component must have suffix "Component" (or custom) in their name. See more at ${STYLE_GUIDE_LINK}`,
            recommended: 'recommended',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    suffixes: {
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
            componentClassSuffix: `Component class names should end with one of these suffixes: {{suffixes}} (${STYLE_GUIDE_LINK})`,
        },
    },
    defaultOptions: [
        {
            suffixes: ['Component'],
        },
    ],
    create(context, [{ suffixes }]) {
        return {
            [utils_1.Selectors.COMPONENT_CLASS_DECORATOR](node) {
                const classParent = node.parent;
                const className = utils_1.ASTUtils.getClassName(classParent);
                if (!className ||
                    !suffixes.some((suffix) => className.endsWith(suffix))) {
                    context.report({
                        node: classParent.id ? classParent.id : classParent,
                        messageId: 'componentClassSuffix',
                        data: { suffixes: (0, utils_1.toHumanReadableText)(suffixes) },
                    });
                }
            },
        };
    },
});
