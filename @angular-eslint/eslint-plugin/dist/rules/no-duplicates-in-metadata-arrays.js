"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const utils_2 = require("@typescript-eslint/utils");
exports.RULE_NAME = 'no-duplicates-in-metadata-arrays';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that metadata arrays do not contain duplicate entries.',
        },
        schema: [],
        messages: {
            noDuplicatesInMetadataArrays: 'Entry is duplicated in metadata array',
        },
    },
    defaultOptions: [],
    create(context) {
        const selectors = [
            // https://angular.dev/api/core/NgModule
            `${utils_1.Selectors.MODULE_CLASS_DECORATOR} Property[key.name=${(0, utils_1.toPattern)([
                'providers',
                'declarations',
                'imports',
                'exports',
            ])}] > ArrayExpression`,
            // https://angular.dev/api/core/Component
            `${utils_1.Selectors.COMPONENT_CLASS_DECORATOR} Property[key.name=${(0, utils_1.toPattern)([
                'imports',
            ])}] > ArrayExpression`,
            // https://angular.dev/api/core/Directive
            `${utils_1.Selectors.DIRECTIVE_CLASS_DECORATOR} Property[key.name=${(0, utils_1.toPattern)([
                'providers',
            ])}] > ArrayExpression`,
        ].join(',');
        return {
            [selectors]({ elements }) {
                getDuplicateItems(elements).forEach((duplicateImport) => {
                    context.report({
                        node: duplicateImport,
                        messageId: 'noDuplicatesInMetadataArrays',
                    });
                });
            },
        };
    },
});
function getDuplicateItems(elements) {
    const items = elements.filter(utils_2.ASTUtils.isIdentifier);
    const uniqueItemNames = new Set();
    const duplicateItems = [];
    items.forEach((item) => {
        if (uniqueItemNames.has(item.name)) {
            duplicateItems.push(item);
        }
        else {
            uniqueItemNames.add(item.name);
        }
    });
    return duplicateItems;
}
