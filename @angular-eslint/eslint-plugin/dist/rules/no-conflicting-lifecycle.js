"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const utils_2 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-conflicting-lifecycle';
const LIFECYCLE_INTERFACES = [
    utils_1.ASTUtils.AngularLifecycleInterfaces.DoCheck,
    utils_1.ASTUtils.AngularLifecycleInterfaces.OnChanges,
];
const LIFECYCLE_METHODS = [
    utils_1.ASTUtils.AngularLifecycleMethods.ngDoCheck,
    utils_1.ASTUtils.AngularLifecycleMethods.ngOnChanges,
];
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures that directives not implement conflicting lifecycle interfaces.',
        },
        schema: [],
        messages: {
            noConflictingLifecycleInterface: `Implementing ${utils_1.ASTUtils.AngularLifecycleInterfaces.DoCheck} and ${utils_1.ASTUtils.AngularLifecycleInterfaces.OnChanges} in a class is not recommended`,
            noConflictingLifecycleMethod: `Declaring ${utils_1.ASTUtils.AngularLifecycleMethods.ngDoCheck} and ${utils_1.ASTUtils.AngularLifecycleMethods.ngOnChanges} method in a class is not recommended`,
        },
    },
    defaultOptions: [],
    create(context) {
        const validateInterfaces = (node) => {
            const declaredAngularLifecycleInterfaces = utils_1.ASTUtils.getDeclaredAngularLifecycleInterfaces(node);
            const hasInterfaceConflictingLifecycle = LIFECYCLE_INTERFACES.every((lifecycleInterface) => declaredAngularLifecycleInterfaces.includes(lifecycleInterface));
            if (!hasInterfaceConflictingLifecycle)
                return;
            const declaredInterfaces = utils_1.ASTUtils.getInterfaces(node);
            const declaredAngularLifecycleInterfacesNodes = declaredInterfaces.filter((node) => {
                const interfaceName = utils_1.ASTUtils.getInterfaceName(node);
                return (interfaceName && utils_1.ASTUtils.isAngularLifecycleInterface(interfaceName));
            });
            for (const interFaceNode of declaredAngularLifecycleInterfacesNodes) {
                context.report({
                    node: interFaceNode,
                    messageId: 'noConflictingLifecycleInterface',
                });
            }
        };
        const validateMethods = (node) => {
            const declaredAngularLifecycleMethods = utils_1.ASTUtils.getDeclaredAngularLifecycleMethods(node);
            const hasMethodConflictingLifecycle = LIFECYCLE_METHODS.every((lifecycleMethod) => declaredAngularLifecycleMethods.includes(lifecycleMethod));
            if (!hasMethodConflictingLifecycle)
                return;
            const declaredMethods = utils_1.ASTUtils.getDeclaredMethods(node);
            const declaredAngularLifecycleMethodNodes = declaredMethods.filter((node) => utils_2.ASTUtils.isIdentifier(node.key) &&
                utils_1.ASTUtils.isAngularLifecycleMethod(node.key.name));
            for (const method of declaredAngularLifecycleMethodNodes) {
                context.report({
                    node: method,
                    messageId: 'noConflictingLifecycleMethod',
                });
            }
        };
        return {
            ClassDeclaration(node) {
                validateInterfaces(node);
                validateMethods(node);
            },
        };
    },
});
