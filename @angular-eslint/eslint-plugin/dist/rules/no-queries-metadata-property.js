"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-queries-metadata-property';
const METADATA_PROPERTY_NAME = 'queries';
const STYLE_GUIDE_LINK = 'https://angular.dev/style-guide#style-05-12';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Disallows usage of the \`${METADATA_PROPERTY_NAME}\` metadata property. See more at ${STYLE_GUIDE_LINK}.`,
        },
        schema: [],
        messages: {
            noQueriesMetadataProperty: `Use @${utils_1.ASTUtils.AngularInnerClassDecorators.Output} rather than the \`${METADATA_PROPERTY_NAME}\` metadata property (${STYLE_GUIDE_LINK})`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            [utils_1.Selectors.COMPONENT_OR_DIRECTIVE_CLASS_DECORATOR](node) {
                const propertyExpression = utils_1.ASTUtils.getDecoratorPropertyValue(node, METADATA_PROPERTY_NAME);
                if (!propertyExpression) {
                    return;
                }
                context.report({
                    node: propertyExpression.parent,
                    messageId: 'noQueriesMetadataProperty',
                });
            },
        };
    },
});
