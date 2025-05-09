"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-async-lifecycle-method';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: `Angular Lifecycle methods should not be async. Angular does not wait for async lifecycle but the code incorrectly suggests it does.`,
        },
        schema: [],
        messages: {
            noAsyncLifecycleMethod: 'Angular Lifecycle method should not be async',
        },
    },
    defaultOptions: [],
    create(context) {
        const angularDecoratorsPattern = (0, utils_1.toPattern)([
            'Component',
            'Directive',
            'Injectable',
            'NgModule',
            'Pipe',
        ]);
        const angularLifecycleMethodsPattern = (0, utils_1.toPattern)([
            ...utils_1.ASTUtils.ANGULAR_LIFECYCLE_METHODS,
        ]);
        return {
            [`${utils_1.Selectors.decoratorDefinition(angularDecoratorsPattern)} > ClassBody > MethodDefinition[key.name=${angularLifecycleMethodsPattern}]`](node) {
                if (node.value.async === true) {
                    context.report({
                        node: node.key,
                        messageId: 'noAsyncLifecycleMethod',
                    });
                }
            },
        };
    },
});
