"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'prefer-output-emitter-ref';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Use `OutputEmitterRef` instead of `@Output()`',
        },
        schema: [],
        messages: {
            preferOutputEmitterRef: 'Use `OutputEmitterRef` via `output()` for Component and Directive outputs rather than the legacy `@Output()` decorator',
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            [utils_1.Selectors.OUTPUT_DECORATOR]: (node) => {
                context.report({ node, messageId: 'preferOutputEmitterRef' });
            },
        };
    },
});
