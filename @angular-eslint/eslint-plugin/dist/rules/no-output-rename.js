"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const utils_2 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-output-rename';
const STYLE_GUIDE_LINK = 'https://angular.dev/style-guide#style-05-13';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that output bindings are not aliased',
            recommended: 'recommended',
        },
        fixable: 'code',
        hasSuggestions: true,
        schema: [],
        messages: {
            noOutputRename: `Output bindings should not be aliased (${STYLE_GUIDE_LINK})`,
            suggestRemoveAliasName: 'Remove alias name',
            suggestReplaceOriginalNameWithAliasName: 'Remove alias name and use it as the original name',
        },
    },
    defaultOptions: [],
    create(context) {
        let selectors = new Set();
        return {
            [utils_1.Selectors.COMPONENT_OR_DIRECTIVE_SELECTOR_LITERAL](node) {
                selectors = new Set((0, utils_1.withoutBracketsAndWhitespaces)(utils_1.ASTUtils.getRawText(node)).split(','));
            },
            [utils_1.Selectors.OUTPUT_ALIAS](node) {
                const propertyOrMethodDefinition = utils_1.ASTUtils.getNearestNodeFrom(node, utils_1.ASTUtils.isPropertyOrMethodDefinition);
                if (!propertyOrMethodDefinition ||
                    !utils_2.ASTUtils.isIdentifier(propertyOrMethodDefinition.key)) {
                    return;
                }
                const aliasName = utils_1.ASTUtils.getRawText(node);
                const propertyName = utils_1.ASTUtils.getRawText(propertyOrMethodDefinition.key);
                // The alias is either a string in the `@Output()` decorator function,
                // or a string on an `alias` property that is in an object expression
                // that is in the `output()` function. If it's the latter, then we want
                // to remove that whole property rather than just the string literal.
                const stringToRemove = utils_1.ASTUtils.isTemplateElement(node)
                    ? node.parent
                    : node;
                let rangeToRemove = stringToRemove.range;
                if (utils_1.ASTUtils.isProperty(stringToRemove.parent)) {
                    const property = stringToRemove.parent;
                    rangeToRemove = property.range;
                    if (utils_1.ASTUtils.isObjectExpression(property.parent)) {
                        const objectExpression = property.parent;
                        if (objectExpression.properties.length === 1) {
                            // The property is the only property in the
                            // object, so we can remove the whole object.
                            rangeToRemove = objectExpression.range;
                        }
                        else {
                            // There are other properties in the object, so we
                            // can only remove the property. How we remove it
                            // will depend on where the property is in the object.
                            const propertyIndex = objectExpression.properties.indexOf(property);
                            if (propertyIndex < objectExpression.properties.length - 1) {
                                // The property is not the last one, so we can
                                // remove everything up to the next property
                                // which will remove the comma after it.
                                rangeToRemove = [
                                    property.range[0],
                                    objectExpression.properties[propertyIndex + 1].range[0],
                                ];
                            }
                            else {
                                // The property is the last one. If the object has a
                                // trailing comma, then we want to keep the trailing comma.
                                // The simplest way to do that is to remove the property
                                // and the comma that precedes it.
                                const tokenBefore = context.sourceCode.getTokenBefore(property);
                                if (tokenBefore && utils_2.ASTUtils.isCommaToken(tokenBefore)) {
                                    rangeToRemove = [tokenBefore.range[0], rangeToRemove[1]];
                                }
                            }
                        }
                    }
                }
                if (aliasName === propertyName) {
                    context.report({
                        node,
                        messageId: 'noOutputRename',
                        fix: (fixer) => fixer.removeRange(rangeToRemove),
                    });
                }
                else if (!isAliasNameAllowed(selectors, propertyName, aliasName)) {
                    context.report({
                        node,
                        messageId: 'noOutputRename',
                        suggest: [
                            {
                                messageId: 'suggestRemoveAliasName',
                                fix: (fixer) => fixer.removeRange(rangeToRemove),
                            },
                            {
                                messageId: 'suggestReplaceOriginalNameWithAliasName',
                                fix: (fixer) => [
                                    fixer.removeRange(rangeToRemove),
                                    fixer.replaceText(propertyOrMethodDefinition.key, aliasName.includes('-') ? `'${aliasName}'` : aliasName),
                                ],
                            },
                        ],
                    });
                }
            },
            [utils_1.Selectors.OUTPUTS_METADATA_PROPERTY_LITERAL](node) {
                const ancestorMaybeHostDirectiveAPI = node.parent?.parent?.parent?.parent?.parent;
                if (ancestorMaybeHostDirectiveAPI &&
                    utils_1.ASTUtils.isProperty(ancestorMaybeHostDirectiveAPI)) {
                    /**
                     * Angular v15 introduced the directive composition API: https://angular.dev/guide/directives/directive-composition-api
                     * Renaming host directive outputs using this API is not a bad practice and should not be reported
                     */
                    const hostDirectiveAPIPropertyName = 'hostDirectives';
                    if ((utils_1.ASTUtils.isLiteral(ancestorMaybeHostDirectiveAPI.key) &&
                        ancestorMaybeHostDirectiveAPI.key.value ===
                            hostDirectiveAPIPropertyName) ||
                        (utils_2.ASTUtils.isIdentifier(ancestorMaybeHostDirectiveAPI.key) &&
                            ancestorMaybeHostDirectiveAPI.key.name ===
                                hostDirectiveAPIPropertyName)) {
                        return;
                    }
                }
                const [propertyName, aliasName] = (0, utils_1.withoutBracketsAndWhitespaces)(utils_1.ASTUtils.getRawText(node)).split(':');
                if (!aliasName)
                    return;
                if (aliasName === propertyName) {
                    context.report({
                        node,
                        messageId: 'noOutputRename',
                        fix: (fixer) => fixer.replaceText(node, utils_1.ASTUtils.getReplacementText(node, propertyName)),
                    });
                }
                else if (!isAliasNameAllowed(selectors, propertyName, aliasName)) {
                    context.report({
                        node,
                        messageId: 'noOutputRename',
                        suggest: [
                            ['suggestRemoveAliasName', propertyName],
                            ['suggestReplaceOriginalNameWithAliasName', aliasName],
                        ].map(([messageId, name]) => ({
                            messageId,
                            fix: (fixer) => fixer.replaceText(node, utils_1.ASTUtils.getReplacementText(node, name)),
                        })),
                    });
                }
            },
            'ClassDeclaration:exit'() {
                selectors = new Set();
            },
        };
    },
});
function composedName(selector, propertyName) {
    return `${selector}${(0, utils_1.capitalize)(propertyName)}`;
}
function isAliasNameAllowed(selectors, propertyName, aliasName) {
    return [...selectors].some((selector) => {
        return (selector === aliasName ||
            composedName(selector, propertyName) === aliasName);
    });
}
