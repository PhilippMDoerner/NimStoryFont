"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'component-max-inline-declarations';
const STYLE_GUIDE_LINK = 'https://angular.dev/style-guide#style-05-04';
const NEW_LINE_REGEXP = /\r\n|\r|\n/;
const DEFAULT_TEMPLATE_LIMIT = 3;
const DEFAULT_STYLES_LIMIT = 3;
const DEFAULT_ANIMATIONS_LIMIT = 15;
function getLinesCount(node) {
    if (utils_1.ASTUtils.isTemplateLiteral(node)) {
        return node.quasis[0].value.raw.trim().split(NEW_LINE_REGEXP).length;
    }
    if (utils_1.ASTUtils.isLiteral(node)) {
        return node.raw.trim().split(NEW_LINE_REGEXP).length;
    }
    return 0;
}
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: `Enforces a maximum number of lines in inline template, styles and animations. See more at ${STYLE_GUIDE_LINK}`,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    template: { minimum: 0, type: 'number' },
                    styles: { minimum: 0, type: 'number' },
                    animations: { minimum: 0, type: 'number' },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            componentMaxInlineDeclarations: `\`{{propertyType}}\` has too many lines ({{lineCount}}). Maximum allowed is {{max}} (${STYLE_GUIDE_LINK})`,
        },
    },
    defaultOptions: [
        {
            template: DEFAULT_TEMPLATE_LIMIT,
            styles: DEFAULT_STYLES_LIMIT,
            animations: DEFAULT_ANIMATIONS_LIMIT,
        },
    ],
    create(context, [{ template = DEFAULT_TEMPLATE_LIMIT, styles = DEFAULT_STYLES_LIMIT, animations = DEFAULT_ANIMATIONS_LIMIT, },]) {
        return {
            [`${utils_1.Selectors.COMPONENT_CLASS_DECORATOR} Property[key.name='template']`]({ value, }) {
                const lineCount = getLinesCount(value);
                if (lineCount <= template)
                    return;
                context.report({
                    node: value,
                    messageId: 'componentMaxInlineDeclarations',
                    data: {
                        lineCount,
                        max: template,
                        propertyType: 'template',
                    },
                });
            },
            [`${utils_1.Selectors.COMPONENT_CLASS_DECORATOR} Property[key.name='styles']`]({ value, }) {
                let lineCount;
                if (!utils_1.ASTUtils.isArrayExpression(value)) {
                    lineCount = getLinesCount(value);
                }
                else {
                    lineCount = value.elements.reduce((lines, element) => lines + (element ? getLinesCount(element) : 0), 0);
                }
                if (lineCount <= styles)
                    return;
                context.report({
                    node: value,
                    messageId: 'componentMaxInlineDeclarations',
                    data: {
                        lineCount,
                        max: styles,
                        propertyType: 'styles',
                    },
                });
            },
            [`${utils_1.Selectors.COMPONENT_CLASS_DECORATOR} Property[key.name='animations']`]({ value, }) {
                if (!utils_1.ASTUtils.isArrayExpression(value) || value.elements.length === 0)
                    return;
                const animationsBracketsSize = 2;
                const lineCount = Math.max(value.loc.end.line - value.loc.start.line - animationsBracketsSize, 1);
                if (lineCount <= animations)
                    return;
                context.report({
                    node: value,
                    messageId: 'componentMaxInlineDeclarations',
                    data: {
                        lineCount,
                        max: animations,
                        propertyType: 'animations',
                    },
                });
            },
        };
    },
});
