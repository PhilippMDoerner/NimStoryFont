"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const DEFAULT_OPTIONS = {
    requireDescription: false,
    requireMeaning: false,
};
const VALID_LOCALIZED_STRING_WITH_DESCRIPTION = new RegExp(/:(.*\|)?([\w\s]+){1}(@@.*)?:.+/);
const VALID_LOCALIZED_STRING_WITH_MEANING = new RegExp(/:([\w\s]+\|)(.*)?(@@.*)?:.+/);
const STYLE_GUIDE_LINK = 'https://angular.dev/guide/i18n';
const STYLE_GUIDE_LINK_COMMON_PREPARE = `${STYLE_GUIDE_LINK}-common-prepare`;
const STYLE_GUIDE_LINK_METADATA_FOR_TRANSLATION = `${STYLE_GUIDE_LINK_COMMON_PREPARE}#i18n-metadata-for-translation`;
exports.RULE_NAME = 'require-localize-metadata';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that $localize tagged messages contain helpful metadata to aid with translations.',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    requireDescription: {
                        type: 'boolean',
                        default: DEFAULT_OPTIONS.requireDescription,
                    },
                    requireMeaning: {
                        type: 'boolean',
                        default: DEFAULT_OPTIONS.requireMeaning,
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            requireLocalizeDescription: `$localize tagged messages should contain a description. See more at ${STYLE_GUIDE_LINK_METADATA_FOR_TRANSLATION}`,
            requireLocalizeMeaning: `$localize tagged messages should contain a meaning. See more at ${STYLE_GUIDE_LINK_METADATA_FOR_TRANSLATION}`,
        },
    },
    defaultOptions: [DEFAULT_OPTIONS],
    create(context, [{ requireDescription, requireMeaning }]) {
        return {
            TaggedTemplateExpression(taggedTemplateExpression) {
                if ((requireDescription || requireMeaning) &&
                    utils_1.ASTUtils.isIdentifier(taggedTemplateExpression.tag)) {
                    const identifierName = taggedTemplateExpression.tag.name;
                    const templateElement = taggedTemplateExpression.quasi.quasis[0];
                    if (identifierName === '$localize' && !!templateElement) {
                        const templateElementRawValue = templateElement.value.raw;
                        if (requireDescription &&
                            !VALID_LOCALIZED_STRING_WITH_DESCRIPTION.test(templateElementRawValue)) {
                            context.report({
                                loc: templateElement.loc,
                                messageId: 'requireLocalizeDescription',
                            });
                        }
                        if (requireMeaning &&
                            !VALID_LOCALIZED_STRING_WITH_MEANING.test(templateElementRawValue)) {
                            context.report({
                                loc: templateElement.loc,
                                messageId: 'requireLocalizeMeaning',
                            });
                        }
                    }
                }
            },
        };
    },
});
