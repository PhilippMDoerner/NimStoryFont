"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-output-native';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that output bindings, including aliases, are not named as standard DOM events',
            recommended: 'recommended',
        },
        schema: [],
        messages: {
            noOutputNative: 'Output bindings, including aliases, should not be named as standard DOM events',
        },
    },
    defaultOptions: [],
    create(context) {
        const nativeEventNames = (0, utils_1.getNativeEventNames)();
        const selectors = [
            utils_1.Selectors.OUTPUTS_METADATA_PROPERTY_LITERAL,
            utils_1.Selectors.OUTPUT_ALIAS,
            utils_1.Selectors.OUTPUT_PROPERTY_OR_GETTER,
        ].join(',');
        return {
            [selectors](node) {
                const [propertyName, aliasName] = utils_1.ASTUtils.getRawText(node)
                    .replace(/\s/g, '')
                    .split(':');
                if (!nativeEventNames.has(propertyName) &&
                    !nativeEventNames.has(aliasName)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'noOutputNative',
                });
            },
        };
    },
});
