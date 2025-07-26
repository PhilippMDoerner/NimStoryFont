"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const utils_2 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'prefer-inject';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Prefer using the inject() function over constructor parameter injection',
            recommended: 'recommended',
        },
        schema: [],
        messages: {
            preferInject: "Prefer using the inject() function over constructor parameter injection. Use Angular's migration schematic to automatically refactor: ng generate @angular/core:inject",
        },
    },
    defaultOptions: [],
    create(context) {
        const angularDecoratorsPattern = (0, utils_1.toPattern)([
            'Component',
            'Directive',
            'Injectable',
            'Pipe',
        ]);
        function shouldReportParameter(param) {
            let actualParam = param;
            let hasModifier = false;
            if (param.type === utils_2.AST_NODE_TYPES.TSParameterProperty) {
                actualParam = param.parameter;
                hasModifier = true;
            }
            const decorators = (param.type === utils_2.AST_NODE_TYPES.TSParameterProperty
                ? param.parameter
                : param).decorators;
            if (decorators?.some((d) => {
                const name = utils_1.ASTUtils.getDecoratorName(d);
                return (name === 'Inject' ||
                    name === 'Optional' ||
                    name === 'Self' ||
                    name === 'SkipSelf' ||
                    name === 'Host');
            })) {
                return true;
            }
            if (hasModifier) {
                return true;
            }
            const typeAnnotation = actualParam.typeAnnotation;
            if (typeAnnotation) {
                switch (typeAnnotation.typeAnnotation.type) {
                    case utils_2.AST_NODE_TYPES.TSStringKeyword:
                    case utils_2.AST_NODE_TYPES.TSNumberKeyword:
                    case utils_2.AST_NODE_TYPES.TSBooleanKeyword:
                    case utils_2.AST_NODE_TYPES.TSBigIntKeyword:
                    case utils_2.AST_NODE_TYPES.TSSymbolKeyword:
                    case utils_2.AST_NODE_TYPES.TSAnyKeyword:
                    case utils_2.AST_NODE_TYPES.TSUnknownKeyword:
                        return false;
                    default:
                        return true;
                }
            }
            return false;
        }
        return {
            [`${utils_1.Selectors.decoratorDefinition(angularDecoratorsPattern)} > ClassBody > MethodDefinition[kind="constructor"]`](node) {
                const params = node.value.params ?? [];
                if (params.length === 0) {
                    return;
                }
                for (const param of params) {
                    if (shouldReportParameter(param)) {
                        context.report({ node: param, messageId: 'preferInject' });
                    }
                }
            },
        };
    },
});
