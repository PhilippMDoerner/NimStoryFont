"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_DOCS_EXTENSION = exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'prefer-class-binding';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Suggests using [class] bindings over ngClass where applicable',
        },
        schema: [],
        messages: {
            preferClassBinding: 'Consider using [class] bindings instead of [ngClass] where applicable.',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            'BoundAttribute[name="ngClass"]'(node) {
                // Skip if ngClass is necessary (e.g., uses space-separated class names)
                if (requiresNgClass(node)) {
                    return;
                }
                const loc = parserServices.convertNodeSourceSpanToLoc(node.sourceSpan);
                context.report({
                    messageId: 'preferClassBinding',
                    loc,
                });
            },
        };
    },
});
let parser = null;
/**
 * Instantiate the `Parser` class lazily only when this rule is applied.
 */
function getParser() {
    return parser || (parser = new bundled_angular_compiler_1.Parser(new bundled_angular_compiler_1.Lexer()));
}
/**
 * Checks if a string contains space-separated class names
 */
function hasSpaceSeparatedClasses(str) {
    return /\s/.test(str.trim());
}
/**
 * Checks if the ngClass binding uses features that class bindings don't support:
 * - Object keys with space-separated class names
 */
function requiresNgClass(node) {
    // Check if we have a value with source code
    if (!node.value?.source || !node.valueSpan) {
        return false;
    }
    // Parse the binding to get the AST
    const parsedAst = getParser().parseBinding(node.value.source, node.valueSpan, 0).ast;
    if (parsedAst instanceof bundled_angular_compiler_1.LiteralMap) {
        for (const astKey of parsedAst.keys) {
            // Skip spread keys as they don't have a key property
            if (astKey.kind === 'spread') {
                continue;
            }
            const className = astKey.key;
            if (typeof className === 'string' &&
                hasSpaceSeparatedClasses(className)) {
                return true;
            }
        }
    }
    return false;
}
exports.RULE_DOCS_EXTENSION = {
    rationale: 'For simple cases, [class] bindings offer a more straightforward syntax with better performance than ngClass. However, ngClass should still be used when you need: (1) space-separated class names in a single key, or (2) mutations on objects, as class bindings do not support these use cases (the reference must change for class bindings to detect updates). See https://angular.dev/guide/templates/binding#css-class-and-style-property-bindings for more information. This rule helps identify potential simplification opportunities but should be applied judiciously based on your specific needs.',
};
