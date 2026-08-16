"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_DOCS_EXTENSION = exports.RULE_NAME = void 0;
const utils_1 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const signals_1 = require("../utils/signals");
exports.RULE_NAME = 'no-uncalled-signals';
const CONDITIONAL_SELECTOR = [
    utils_1.AST_NODE_TYPES.ConditionalExpression,
    utils_1.AST_NODE_TYPES.DoWhileStatement,
    utils_1.AST_NODE_TYPES.ForStatement,
    utils_1.AST_NODE_TYPES.IfStatement,
    utils_1.AST_NODE_TYPES.SwitchCase,
    utils_1.AST_NODE_TYPES.WhileStatement,
].join(',');
const FUNCTION_MEMBER_EXPRESSION_SELECTOR = `MemberExpression[property.type=Identifier]:matches(${[
    'arguments',
    'caller',
    'length',
    'name',
    'toString',
].map((member) => `[property.name=${member}]`)})`;
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
        function checkForUncalledSignal(node) {
            const type = services.getTypeAtLocation(node);
            const symbol = type.getSymbol();
            let isSignal = symbol && signals_1.KNOWN_SIGNAL_TYPES.has(symbol.name);
            // If the type is not a known signal type, but it has an alias
            // symbol, then check if that alias symbol is a known signal type.
            // The `Signal` type will fall under this category, because it is
            // defined as a type alias. Other signal types like `InputSignal`
            // won't match here, because they are defined as interfaces.
            if (!isSignal && type.aliasSymbol) {
                isSignal = signals_1.KNOWN_SIGNAL_TYPES.has(type.aliasSymbol.name);
            }
            if (isSignal) {
                context.report({
                    node,
                    messageId: 'noUncalledSignals',
                    suggest: [
                        {
                            messageId: 'suggestCallSignal',
                            fix: (fixer) => fixer.insertTextAfter(node, '()'),
                        },
                    ],
                });
            }
        }
        return {
            [CONDITIONAL_SELECTOR](node) {
                if (node.test) {
                    checkForUncalledSignal(node.test);
                }
            },
            UnaryExpression(node) {
                if (node.operator !== 'delete') {
                    checkForUncalledSignal(node.argument);
                }
            },
            LogicalExpression(node) {
                checkForUncalledSignal(node.left);
                checkForUncalledSignal(node.right);
            },
            BinaryExpression(node) {
                checkForUncalledSignal(node.left);
                checkForUncalledSignal(node.right);
            },
            [FUNCTION_MEMBER_EXPRESSION_SELECTOR](node) {
                checkForUncalledSignal(node.object);
            },
        };
    },
});
exports.RULE_DOCS_EXTENSION = {
    rationale: "Angular signals are functions that must be called to retrieve their value. A common mistake, especially for developers new to signals, is to use the signal itself in conditional or logical expressions without calling it first. For example, 'if (mySignal)' checks if the signal function exists (which is always true), not whether the signal's value is truthy. You need 'if (mySignal())' to check the value. This bug is easy to make because signals look like regular properties but behave like functions. The mistake leads to logic errors where conditions always evaluate incorrectly. This rule catches these mistakes by detecting when signals are used in conditionals, comparisons, or logical operations without being called.",
};
