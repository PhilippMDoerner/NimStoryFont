"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const get_dom_elements_1 = require("../utils/get-dom-elements");
const to_pattern_1 = require("../utils/to-pattern");
exports.RULE_NAME = 'mouse-events-have-key-events';
const STYLE_GUIDE_LINK = 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard';
var KeyEvents;
(function (KeyEvents) {
    KeyEvents["Blur"] = "blur";
    KeyEvents["Focus"] = "focus";
})(KeyEvents || (KeyEvents = {}));
var MouseEvents;
(function (MouseEvents) {
    MouseEvents["MouseOut"] = "mouseout";
    MouseEvents["MouseOver"] = "mouseover";
})(MouseEvents || (MouseEvents = {}));
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `[Accessibility] Ensures that the mouse events \`${MouseEvents.MouseOut}\` and \`${MouseEvents.MouseOver}\` are accompanied by \`${KeyEvents.Focus}\` and \`${KeyEvents.Blur}\` events respectively. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users. See more at ${STYLE_GUIDE_LINK}`,
        },
        schema: [],
        messages: {
            mouseEventsHaveKeyEvents: `\`{{mouseEvent}}\` must be accompanied by \`{{keyEvent}}\` for accessibility (${STYLE_GUIDE_LINK})`,
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        const domElementsPattern = (0, to_pattern_1.toPattern)([...(0, get_dom_elements_1.getDomElements)()]);
        const eventPairs = [
            [KeyEvents.Blur, MouseEvents.MouseOut],
            [KeyEvents.Focus, MouseEvents.MouseOver],
        ];
        return eventPairs.reduce((accumulator, [keyEvent, mouseEvent]) => ({
            ...accumulator,
            [`Element[name=${domElementsPattern}]:has(BoundEvent[name='${mouseEvent}']):not(:has(BoundEvent[name='${keyEvent}']))`]({ sourceSpan, }) {
                const loc = parserServices.convertNodeSourceSpanToLoc(sourceSpan);
                context.report({
                    loc,
                    messageId: 'mouseEventsHaveKeyEvents',
                    data: { keyEvent, mouseEvent },
                });
            },
        }), {});
    },
});
