"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const signals_1 = require("../utils/signals");
exports.RULE_NAME = 'no-uncalled-signals';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: "Warns user about unintentionally doing logic on the signal, rather than the signal's value",
        },
        hasSuggestions: true,
        schema: [],
        messages: {
            noUncalledSignals: 'Doing logic operations on signals will give unexpected results, you probably want to invoke the signal to get its value',
            suggestCallSignal: 'Call this signal to get its value.',
        },
    },
    defaultOptions: [],
    create(context) {
        const services = utils_1.ESLintUtils.getParserServices(context);
        return {
            '*.test[type=Identifier],*.test Identifier,[type=LogicalExpression] Identifier'(node) {
                if (node.parent.type === utils_1.AST_NODE_TYPES.CallExpression) {
                    return;
                }
                // Check if this identifier is the property in a MemberExpression that's being called
                if (node.parent.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    node.parent.property === node &&
                    node.parent.parent?.type === utils_1.AST_NODE_TYPES.CallExpression) {
                    return;
                }
                const type = services.getTypeAtLocation(node);
                const identifierType = type.getSymbol()?.name;
                if (identifierType && signals_1.KNOWN_SIGNAL_TYPES.has(identifierType)) {
                    context.report({
                        node,
                        messageId: 'noUncalledSignals',
                        suggest: [
                            {
                                messageId: 'suggestCallSignal',
                                fix: (fixer) => fixer.replaceText(node, `${node.name}()`),
                            },
                        ],
                    });
                }
            },
        };
    },
});
