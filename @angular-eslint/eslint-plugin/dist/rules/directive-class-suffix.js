"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'directive-class-suffix';
const STYLE_GUIDE_LINK = 'https://angular.dev/style-guide#style-02-03';
const DEFAULT_SUFFIXES = ['Directive'];
const VALIDATOR_SUFFIX = 'Validator';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Classes decorated with @Directive must have suffix "Directive" (or custom) in their name. See more at ${STYLE_GUIDE_LINK}`,
            recommended: 'recommended',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    suffixes: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            directiveClassSuffix: `Directive class names should end with one of these suffixes: {{suffixes}} (${STYLE_GUIDE_LINK})`,
        },
    },
    defaultOptions: [{ suffixes: DEFAULT_SUFFIXES }],
    create(context, [{ suffixes }]) {
        return {
            [utils_1.Selectors.DIRECTIVE_CLASS_DECORATOR](node) {
                const selectorPropertyValue = utils_1.ASTUtils.getDecoratorPropertyValue(node, 'selector');
                if (!selectorPropertyValue)
                    return;
                const classParent = node.parent;
                const className = utils_1.ASTUtils.getClassName(classParent);
                const declaredInterfaceNames = utils_1.ASTUtils.getDeclaredInterfaceNames(classParent);
                const hasValidatorInterface = declaredInterfaceNames.some((interfaceName) => interfaceName.endsWith(VALIDATOR_SUFFIX));
                const allSuffixes = suffixes.concat(hasValidatorInterface ? VALIDATOR_SUFFIX : []);
                if (!className ||
                    !allSuffixes.some((suffix) => className.endsWith(suffix))) {
                    context.report({
                        node: classParent.id ?? classParent,
                        messageId: 'directiveClassSuffix',
                        data: { suffixes: (0, utils_1.toHumanReadableText)(allSuffixes) },
                    });
                }
            },
        };
    },
});
