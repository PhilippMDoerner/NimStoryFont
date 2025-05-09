"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const utils_2 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-inputs-metadata-property';
const METADATA_PROPERTY_NAME = 'inputs';
const STYLE_GUIDE_LINK = 'https://angular.dev/style-guide#style-05-12';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Disallows usage of the \`${METADATA_PROPERTY_NAME}\` metadata property. See more at ${STYLE_GUIDE_LINK}`,
            recommended: 'recommended',
        },
        schema: [],
        messages: {
            noInputsMetadataProperty: `Use \`@Input\` rather than the \`${METADATA_PROPERTY_NAME}\` metadata property (${STYLE_GUIDE_LINK})`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            [`${utils_1.Selectors.COMPONENT_OR_DIRECTIVE_CLASS_DECORATOR} ${utils_1.Selectors.metadataProperty(METADATA_PROPERTY_NAME)}`](node) {
                /**
                 * Angular v15 introduced the directive composition API: https://angular.dev/guide/directives/directive-composition-api
                 * Using host directive inputs using this API is not a bad practice and should not be reported
                 */
                const ancestorMayBeHostDirectiveAPI = node.parent?.parent?.parent;
                if (ancestorMayBeHostDirectiveAPI &&
                    utils_1.ASTUtils.isProperty(ancestorMayBeHostDirectiveAPI)) {
                    const hostDirectiveAPIPropertyName = 'hostDirectives';
                    if ((utils_1.ASTUtils.isLiteral(ancestorMayBeHostDirectiveAPI.key) &&
                        ancestorMayBeHostDirectiveAPI.key.value ===
                            hostDirectiveAPIPropertyName) ||
                        (utils_2.ASTUtils.isIdentifier(ancestorMayBeHostDirectiveAPI.key) &&
                            ancestorMayBeHostDirectiveAPI.key.name ===
                                hostDirectiveAPIPropertyName)) {
                        return;
                    }
                }
                context.report({
                    node,
                    messageId: 'noInputsMetadataProperty',
                });
            },
        };
    },
});
