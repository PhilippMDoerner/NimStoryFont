"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'use-pipe-transform-interface';
const PIPE_TRANSFORM = 'PipeTransform';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Ensures that \`Pipes\` implement \`${PIPE_TRANSFORM}\` interface`,
            recommended: 'recommended',
        },
        fixable: 'code',
        schema: [],
        messages: {
            usePipeTransformInterface: `Pipes should implement \`${PIPE_TRANSFORM}\` interface`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            [`ClassDeclaration:not(:has(TSClassImplements:matches([expression.name='${PIPE_TRANSFORM}'], [expression.property.name='${PIPE_TRANSFORM}']))) > Decorator[expression.callee.name='Pipe']`]({ parent: classDeclaration, }) {
                context.report({
                    node: classDeclaration.id ?? classDeclaration,
                    messageId: 'usePipeTransformInterface',
                    fix: (fixer) => {
                        const { implementsNodeReplace, implementsTextReplace } = utils_1.RuleFixes.getImplementsSchemaFixer(classDeclaration, PIPE_TRANSFORM);
                        return [
                            utils_1.RuleFixes.getImportAddFix({
                                compatibleWithTypeOnlyImport: true,
                                fixer,
                                importName: PIPE_TRANSFORM,
                                moduleName: '@angular/core',
                                node: classDeclaration,
                            }),
                            fixer.insertTextAfter(implementsNodeReplace, implementsTextReplace),
                        ].filter(utils_1.isNotNullOrUndefined);
                    },
                });
            },
        };
    },
});
