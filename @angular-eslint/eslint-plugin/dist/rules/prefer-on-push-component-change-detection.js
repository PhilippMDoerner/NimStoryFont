"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'prefer-on-push-component-change-detection';
const METADATA_PROPERTY_NAME = 'changeDetection';
const STRATEGY_ON_PUSH = 'ChangeDetectionStrategy.OnPush';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Ensures component's \`${METADATA_PROPERTY_NAME}\` is set to \`${STRATEGY_ON_PUSH}\``,
        },
        hasSuggestions: true,
        schema: [],
        messages: {
            preferOnPushComponentChangeDetection: `The component's \`${METADATA_PROPERTY_NAME}\` value should be set to \`${STRATEGY_ON_PUSH}\``,
            suggestAddChangeDetectionOnPush: `Add \`${STRATEGY_ON_PUSH}\``,
        },
    },
    defaultOptions: [],
    create(context) {
        const changeDetectionMetadataProperty = utils_1.Selectors.metadataProperty(METADATA_PROPERTY_NAME);
        const withoutChangeDetectionDecorator = `${utils_1.Selectors.COMPONENT_CLASS_DECORATOR}:matches([expression.arguments.length=0], [expression.arguments.0.type='ObjectExpression']:not(:has(${changeDetectionMetadataProperty})))`;
        const nonChangeDetectionOnPushProperty = `${utils_1.Selectors.COMPONENT_CLASS_DECORATOR} > CallExpression > ObjectExpression > ${changeDetectionMetadataProperty}:matches([value.type='Identifier'][value.name='undefined'], [value.object.name='ChangeDetectionStrategy'][value.property.name!='OnPush'])`;
        const selectors = [
            withoutChangeDetectionDecorator,
            nonChangeDetectionOnPushProperty,
        ].join(',');
        return {
            [selectors](node) {
                context.report({
                    node: nodeToReport(node),
                    messageId: 'preferOnPushComponentChangeDetection',
                    suggest: [
                        {
                            messageId: 'suggestAddChangeDetectionOnPush',
                            fix: (fixer) => {
                                if (utils_1.ASTUtils.isProperty(node)) {
                                    return [
                                        utils_1.RuleFixes.getImportAddFix({
                                            fixer,
                                            importName: 'ChangeDetectionStrategy',
                                            moduleName: '@angular/core',
                                            node: node.parent.parent.parent.parent,
                                        }),
                                        utils_1.ASTUtils.isMemberExpression(node.value)
                                            ? fixer.replaceText(node.value.property, 'OnPush')
                                            : fixer.replaceText(node.value, STRATEGY_ON_PUSH),
                                    ].filter(utils_1.isNotNullOrUndefined);
                                }
                                return [
                                    utils_1.RuleFixes.getImportAddFix({
                                        fixer,
                                        importName: 'ChangeDetectionStrategy',
                                        moduleName: '@angular/core',
                                        node: node.parent,
                                    }),
                                    utils_1.RuleFixes.getDecoratorPropertyAddFix(node, fixer, `${METADATA_PROPERTY_NAME}: ${STRATEGY_ON_PUSH}`),
                                ].filter(utils_1.isNotNullOrUndefined);
                            },
                        },
                    ],
                });
            },
        };
    },
});
function nodeToReport(node) {
    if (!utils_1.ASTUtils.isProperty(node)) {
        return node;
    }
    return utils_1.ASTUtils.isMemberExpression(node.value)
        ? node.value.property
        : node.value;
}
