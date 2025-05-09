"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const get_dom_elements_1 = require("../utils/get-dom-elements");
const is_hidden_from_screen_reader_1 = require("../utils/is-hidden-from-screen-reader");
const is_interactive_element_1 = require("../utils/is-interactive-element");
const is_presentation_role_1 = require("../utils/is-presentation-role");
exports.RULE_NAME = 'click-events-have-key-events';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: '[Accessibility] Ensures that the click event is accompanied with at least one key event keyup, keydown or keypress.',
        },
        schema: [],
        messages: {
            clickEventsHaveKeyEvents: 'click must be accompanied by either keyup, keydown or keypress event for accessibility.',
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            Element(node) {
                if (!(0, get_dom_elements_1.getDomElements)().has(node.name)) {
                    return;
                }
                if ((0, is_presentation_role_1.isPresentationRole)(node) ||
                    (0, is_hidden_from_screen_reader_1.isHiddenFromScreenReader)(node) ||
                    (0, is_interactive_element_1.isInteractiveElement)(node)) {
                    return;
                }
                let hasClick = false, hasKeyEvent = false;
                for (const output of node.outputs) {
                    hasClick = hasClick || output.name === 'click';
                    hasKeyEvent =
                        hasKeyEvent ||
                            output.name.startsWith('keyup') ||
                            output.name.startsWith('keydown') ||
                            output.name.startsWith('keypress');
                }
                if (!hasClick || hasKeyEvent) {
                    return;
                }
                const parserServices = (0, utils_1.getTemplateParserServices)(context);
                const loc = parserServices.convertNodeSourceSpanToLoc(node.sourceSpan);
                context.report({
                    loc,
                    messageId: 'clickEventsHaveKeyEvents',
                });
            },
        };
    },
});
