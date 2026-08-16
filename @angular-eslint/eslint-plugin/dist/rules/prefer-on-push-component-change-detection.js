"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_DOCS_EXTENSION = exports.RULE_NAME = void 0;
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
            description: `Ensures components do not opt out of the default \`${STRATEGY_ON_PUSH}\` change detection strategy`,
            recommended: 'recommended',
        },
        hasSuggestions: true,
        schema: [],
        messages: {
            preferOnPushComponentChangeDetection: `Components should not opt out of the default \`${STRATEGY_ON_PUSH}\` change detection strategy`,
            suggestRemoveChangeDetection: `Remove \`${METADATA_PROPERTY_NAME}\` to use the default (\`${STRATEGY_ON_PUSH}\`)`,
        },
    },
    defaultOptions: [],
    create(context) {
        const sourceCode = context.sourceCode;
        const changeDetectionMetadataProperty = utils_1.Selectors.metadataProperty(METADATA_PROPERTY_NAME);
        /**
         * As of Angular v22 OnPush is the default change detection strategy, so a
         * component only needs to be reported when it explicitly opts out of it by
         * setting a non-OnPush `ChangeDetectionStrategy` member (e.g. `Eager`, or
         * the deprecated `Default`). Omitting `changeDetection` entirely, or setting
         * it to `ChangeDetectionStrategy.OnPush`, is the desired default and is not
         * reported.
         */
        const onPushOptOutProperty = `${utils_1.Selectors.COMPONENT_CLASS_DECORATOR} > CallExpression > ObjectExpression > ${changeDetectionMetadataProperty}[value.object.name='ChangeDetectionStrategy'][value.property.name!='OnPush']`;
        return {
            [onPushOptOutProperty](node) {
                const { value } = node;
                // The selector guarantees a `ChangeDetectionStrategy.<member>` value;
                // this narrows the type for the fixer.
                if (!utils_1.ASTUtils.isMemberExpression(value)) {
                    return;
                }
                context.report({
                    node: value.property,
                    messageId: 'preferOnPushComponentChangeDetection',
                    suggest: [
                        {
                            messageId: 'suggestRemoveChangeDetection',
                            fix: (fixer) => {
                                const importDeclarations = utils_1.ASTUtils.getImportDeclarations(node, '@angular/core') ?? [];
                                return [
                                    utils_1.RuleFixes.getNodeToCommaRemoveFix(sourceCode, node, fixer),
                                    utils_1.RuleFixes.getImportRemoveFix(sourceCode, importDeclarations, 'ChangeDetectionStrategy', fixer),
                                ].filter(utils_1.isNotNullOrUndefined);
                            },
                        },
                    ],
                });
            },
        };
    },
});
exports.RULE_DOCS_EXTENSION = {
    rationale: `As of Angular v22, \`${STRATEGY_ON_PUSH}\` is the default change detection strategy: a component that does not specify \`${METADATA_PROPERTY_NAME}\` is checked using OnPush. This brings new code in line with zoneless being the default and with Angular's goal of performance by default, and means it is no longer necessary to set \`${STRATEGY_ON_PUSH}\` explicitly. The previous default, \`ChangeDetectionStrategy.Default\`, has been renamed to \`ChangeDetectionStrategy.Eager\`. When you run \`ng update\`, the v22 migration adds an explicit \`ChangeDetectionStrategy.Eager\` to existing components that relied on the old implicit default, so that they keep behaving as before.\n\nBecause omitting \`${METADATA_PROPERTY_NAME}\` (or setting it to \`${STRATEGY_ON_PUSH}\`) already gives you OnPush, this rule does not require you to declare it. Instead it reports components that explicitly opt out of OnPush by setting \`ChangeDetectionStrategy.Eager\` (or the deprecated \`ChangeDetectionStrategy.Default\`) — including the components the migration marked as \`Eager\` — so you can review them and adopt OnPush where it is safe to do so. The suggestion removes the \`${METADATA_PROPERTY_NAME}\` property entirely (along with the now-unused \`ChangeDetectionStrategy\` import), relying on the v22 default rather than setting \`${STRATEGY_ON_PUSH}\` explicitly. Note that switching a component from eager checking to OnPush can change its runtime behaviour, so apply the suggestion deliberately and make sure the component uses immutable data patterns (creating new object references when data changes).`,
};
