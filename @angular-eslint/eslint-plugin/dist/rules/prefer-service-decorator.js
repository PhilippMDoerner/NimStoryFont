"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_DOCS_EXTENSION = exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const utils_2 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'prefer-service-decorator';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: "Prefer the `@Service()` decorator over `@Injectable({ providedIn: 'root' })`",
        },
        fixable: 'code',
        schema: [],
        messages: {
            preferServiceDecorator: "Use the `@Service()` decorator instead of `@Injectable({ providedIn: 'root' })`",
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            [utils_1.Selectors.INJECTABLE_CLASS_DECORATOR](node) {
                const { expression } = node;
                if (!utils_1.ASTUtils.isCallExpression(expression) ||
                    expression.arguments.length !== 1) {
                    return;
                }
                const [argument] = expression.arguments;
                if (!utils_1.ASTUtils.isObjectExpression(argument)) {
                    return;
                }
                const migration = getMetadataMigration(argument);
                if (!migration) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'preferServiceDecorator',
                    fix: (fixer) => {
                        const fixes = [
                            // `@Injectable(...)` => `@Service(...)`.
                            fixer.replaceText(expression.callee, 'Service'),
                            // Migrate the `Injectable` import to `Service`.
                            ...utils_1.RuleFixes.getImportReplaceFix({
                                fixer,
                                fromName: 'Injectable',
                                moduleName: '@angular/core',
                                node,
                                sourceCode: context.sourceCode,
                                toName: 'Service',
                            }),
                        ];
                        switch (migration.type) {
                            // Only `providedIn: 'root'`, so drop the whole metadata object.
                            case 'drop-metadata': {
                                fixes.push(fixer.remove(argument));
                                break;
                            }
                            // Keep the factory, but rename `useFactory` => `factory` and drop
                            // `providedIn: 'root'` (which `@Service()` implies).
                            case 'rewrite-factory': {
                                fixes.push(fixer.replaceText(migration.useFactoryProperty.key, 'factory'), utils_1.RuleFixes.getNodeToCommaRemoveFix(context.sourceCode, migration.providedInProperty, fixer));
                                break;
                            }
                        }
                        return fixes.filter(utils_1.isNotNullOrUndefined);
                    },
                });
            },
        };
    },
});
/**
 * `@Service()` only models `providedIn: 'root'` (implicit) and accepts a
 * `factory` (which maps from `useFactory`). Any other provider metadata
 * (`useClass`, `useExisting`, `useValue`, `deps`, ...) has no equivalent, so we
 * bail out and leave such `@Injectable`s untouched for now.
 */
function getMetadataMigration(argument) {
    const properties = argument.properties.filter((property) => property.type === utils_2.AST_NODE_TYPES.Property);
    const providedInProperty = properties.find((property) => utils_2.ASTUtils.getPropertyName(property) === 'providedIn');
    const useFactoryProperty = properties.find((property) => utils_2.ASTUtils.getPropertyName(property) === 'useFactory');
    // Bail out unless the only metadata is `providedIn: 'root'` plus an optional
    // `useFactory`.
    if (!providedInProperty ||
        utils_2.ASTUtils.getStaticValue(providedInProperty.value)?.value !==
            'root' ||
        properties.length !==
            [providedInProperty, useFactoryProperty].filter(utils_1.isNotNullOrUndefined)
                .length) {
        return undefined;
    }
    return useFactoryProperty
        ? { type: 'rewrite-factory', providedInProperty, useFactoryProperty }
        : { type: 'drop-metadata' };
}
exports.RULE_DOCS_EXTENSION = {
    rationale: "Angular 22 introduced the `@Service()` decorator as a concise shorthand for `@Injectable({ providedIn: 'root' })`, the most common way to declare a tree-shakable, application-wide service. Using `@Service()` removes the boilerplate of the metadata object while expressing the exact same intent. Because `providedIn: 'root'` is exactly what `@Service()` implies, this migration is safe and behavior-preserving: the `providedIn: 'root'` entry is dropped, and a `useFactory` is preserved by renaming it to `@Service()`'s `factory` option. Services that rely on other provider metadata (`useClass`, `useExisting`, `useValue`, `deps`) or a different `providedIn` value (`'platform'`, `'any'`, a specific module) have no `@Service()` equivalent and are intentionally left untouched.",
};
