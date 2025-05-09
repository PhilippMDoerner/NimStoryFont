"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'runtime-localize';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that $localize tagged messages can use runtime-loaded translations.',
        },
        schema: [],
        messages: {
            runtimeLocalize: `$localize could be called before translations are loaded`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            TaggedTemplateExpression(taggedTemplateExpression) {
                if (utils_1.ASTUtils.isIdentifier(taggedTemplateExpression.tag) &&
                    taggedTemplateExpression.tag.name === '$localize') {
                    for (const ancestor of context.sourceCode.getAncestors(taggedTemplateExpression)) {
                        if (ancestor.type === utils_1.AST_NODE_TYPES.FunctionDeclaration ||
                            ancestor.type === utils_1.AST_NODE_TYPES.FunctionExpression ||
                            ancestor.type === utils_1.AST_NODE_TYPES.ArrowFunctionExpression ||
                            (ancestor.type === utils_1.AST_NODE_TYPES.PropertyDefinition &&
                                !ancestor.static)) {
                            return;
                        }
                    }
                    context.report({
                        loc: taggedTemplateExpression.tag.loc,
                        messageId: 'runtimeLocalize',
                    });
                }
            },
        };
    },
});
