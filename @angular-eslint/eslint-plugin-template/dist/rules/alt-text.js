"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const get_attribute_value_1 = require("../utils/get-attribute-value");
exports.RULE_NAME = 'alt-text';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: '[Accessibility] Enforces alternate text for elements which require the alt, aria-label, aria-labelledby attributes.',
        },
        schema: [],
        messages: {
            altText: '<{{element}}/> element must have a text alternative.',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            'Element[name=/^(img|area|object|input)$/]'(node) {
                const isValid = isValidNode(node);
                if (!isValid) {
                    const loc = parserServices.convertElementSourceSpanToLoc(context, node);
                    context.report({
                        loc,
                        messageId: 'altText',
                        data: {
                            element: node.name,
                        },
                    });
                }
            },
        };
    },
});
function isValidNode(node) {
    if (node.name === 'img') {
        return isValidImgNode(node);
    }
    else if (node.name === 'object') {
        return isValidObjectNode(node);
    }
    else if (node.name === 'area') {
        return isValidAreaNode(node);
    }
    else {
        return isValidInputNode(node);
    }
}
/**
 * In this case, we check that the `<img>` element has an `alt` attribute or `attr.alt` binding.
 */
function isValidImgNode(node) {
    return (node.attributes.some(({ name }) => isAlt(name)) ||
        node.inputs.some(({ name }) => isAlt(name)));
}
/**
 * In this case, we check that the `<object>` element has a `title` or `aria-label` attribute.
 * Otherwise, we check for the presence of `attr.title` or `attr.aria-label` bindings.
 */
function isValidObjectNode(node) {
    let hasTitleAttribute = false, hasAriaLabelAttribute = false;
    for (const attribute of node.attributes) {
        hasTitleAttribute = attribute.name === 'title';
        hasAriaLabelAttribute = isAriaLabel(attribute.name);
    }
    // Note that we return "early" before looping through `element.inputs`.
    // Because if the element has an attribute, then we don't need to iterate
    // over the inputs unnecessarily.
    if (hasTitleAttribute || hasAriaLabelAttribute) {
        return true;
    }
    let hasTitleBinding = false, hasAriaLabelBinding = false;
    for (const input of node.inputs) {
        hasTitleBinding = input.name === 'title';
        hasAriaLabelBinding = isAriaLabel(input.name);
    }
    if (hasTitleBinding || hasAriaLabelBinding) {
        return true;
    }
    return (node.children.length > 0 &&
        !!node.children[0].value);
}
/**
 * In this case, we check that the `<area>` element has an `alt` or `aria-label` attribute.
 * Otherwise, we check for the presence of `attr.alt` or `attr.aria-label` bindings.
 */
function isValidAreaNode(node) {
    let hasAltAttribute = false, hasAriaLabelAttribute = false;
    for (const attribute of node.attributes) {
        hasAltAttribute = isAlt(attribute.name);
        hasAriaLabelAttribute = isAriaLabel(attribute.name);
    }
    // Note that we return "early" before looping through `element.inputs`.
    // Because if the element has an attribute, then we don't need to iterate
    // over the inputs unnecessarily.
    if (hasAltAttribute || hasAriaLabelAttribute) {
        return true;
    }
    let hasAltBinding = false, hasAriaLabelBinding = false;
    for (const input of node.inputs) {
        hasAltBinding = isAlt(input.name);
        hasAriaLabelBinding = isAriaLabel(input.name);
    }
    return hasAltBinding || hasAriaLabelBinding;
}
/**
 * In this case, we check that the `<input>` element has an `alt` or `aria-label` attribute.
 * Otherwise, we check for the presence of `attr.alt` or `attr.aria-label` bindings.
 */
function isValidInputNode(node) {
    const type = (0, get_attribute_value_1.getAttributeValue)(node, 'type');
    // We are only interested in the `<input type="image">` elements.
    if (type !== 'image') {
        return true;
    }
    else {
        return isValidAreaNode(node);
    }
}
function isAriaLabel(name) {
    return name === 'aria-label' || name === 'aria-labelledby';
}
function isAlt(name) {
    return name === 'alt';
}
