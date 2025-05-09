"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const utils_2 = require("@angular-eslint/utils");
const ISSUE_LINK = 'https://github.com/angular/angular/issues/38241';
exports.RULE_NAME = 'require-lifecycle-on-prototype';
const angularLifecycleMethodsPattern = (0, utils_2.toPattern)([
    ...utils_2.ASTUtils.ANGULAR_LIFECYCLE_METHODS,
]);
const propertyDefinitionSelector = `PropertyDefinition > ${createAngularLifecycleMethodsPattern('key')}`;
const assignmentSelector = `AssignmentExpression[operator="="] > MemberExpression.left > ${createAngularLifecycleMethodsPattern('property')}`;
function createAngularLifecycleMethodsPattern(parentProperty) {
    return `:matches(Literal.${parentProperty}[value=${angularLifecycleMethodsPattern}], Identifier.${parentProperty}[name=${angularLifecycleMethodsPattern}])`;
}
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: "Ensures that lifecycle methods are defined on the object's prototype instead of on an instance.",
        },
        schema: [],
        messages: {
            defineOnPrototype: `The {{ method }} lifecycle method should be defined on the object's prototype. See more at ${ISSUE_LINK}`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            [propertyDefinitionSelector](node) {
                context.report({
                    node,
                    messageId: 'defineOnPrototype',
                    data: {
                        method: node.type === utils_1.AST_NODE_TYPES.Literal ? node.value : node.name,
                    },
                });
            },
            [assignmentSelector](node) {
                // Assigning to the prototype is OK.
                if (!isPrototype(node.parent.object)) {
                    context.report({
                        node,
                        messageId: 'defineOnPrototype',
                        data: {
                            method: node.type === utils_1.AST_NODE_TYPES.Literal ? node.value : node.name,
                        },
                    });
                }
            },
        };
    },
});
function isPrototype(node) {
    while (node.type === utils_1.AST_NODE_TYPES.TSAsExpression) {
        node = node.expression;
    }
    if (node.type === utils_1.AST_NODE_TYPES.MemberExpression) {
        switch (node.property.type) {
            case utils_1.AST_NODE_TYPES.Identifier:
                return node.property.name === 'prototype';
            case utils_1.AST_NODE_TYPES.Literal:
                return node.property.value === 'prototype';
        }
    }
    return false;
}
