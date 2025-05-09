"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'sort-lifecycle-methods';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Ensures that lifecycle methods are declared in order of execution',
        },
        schema: [],
        messages: {
            lifecycleMethodsNotSorted: `Lifecycle Methods are not declared in order of execution`,
        },
    },
    defaultOptions: [],
    create(context) {
        const isBefore = (method1, method2) => {
            const methodIndex1 = utils_1.ASTUtils.angularLifecycleMethodsOrdered.indexOf(utils_1.ASTUtils.getMethodName(method1));
            const methodIndex2 = utils_1.ASTUtils.angularLifecycleMethodsOrdered.indexOf(utils_1.ASTUtils.getMethodName(method2));
            return methodIndex1 < methodIndex2;
        };
        return {
            [utils_1.Selectors.COMPONENT_CLASS_DECORATOR](node) {
                const declaredMethods = utils_1.ASTUtils.getDeclaredMethods(node.parent);
                const declaredLifeCycleMethods = declaredMethods.filter((method) => utils_1.ASTUtils.isAngularLifecycleMethod(utils_1.ASTUtils.getMethodName(method) ?? ''));
                for (let i = 1; i < declaredLifeCycleMethods.length; ++i) {
                    const before = isBefore(declaredLifeCycleMethods[i], declaredLifeCycleMethods[i - 1]);
                    if (before) {
                        context.report({
                            node: declaredLifeCycleMethods[i].key,
                            messageId: 'lifecycleMethodsNotSorted',
                        });
                    }
                }
            },
        };
    },
});
