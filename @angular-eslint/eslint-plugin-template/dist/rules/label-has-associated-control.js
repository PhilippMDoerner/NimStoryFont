"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const is_child_node_of_1 = require("../utils/is-child-node-of");
exports.RULE_NAME = 'label-has-associated-control';
const DEFAULT_CONTROL_COMPONENTS = [
    'input',
    'meter',
    'output',
    'progress',
    'select',
    'textarea',
];
const DEFAULT_LABEL_COMPONENTS = [
    { inputs: ['for', 'htmlFor'], selector: 'label' },
];
const DEFAULT_OPTIONS = {
    controlComponents: DEFAULT_CONTROL_COMPONENTS,
    labelComponents: DEFAULT_LABEL_COMPONENTS,
    checkIds: false,
};
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: '[Accessibility] Ensures that a label element/component is associated with a form element',
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    checkIds: { type: 'boolean' },
                    controlComponents: {
                        items: { type: 'string' },
                        type: 'array',
                        uniqueItems: true,
                    },
                    labelComponents: {
                        items: {
                            additionalProperties: false,
                            properties: {
                                inputs: {
                                    items: { type: 'string' },
                                    type: 'array',
                                    uniqueItems: true,
                                },
                                selector: { type: 'string' },
                            },
                            required: ['selector'],
                            type: 'object',
                        },
                        type: 'array',
                        uniqueItems: true,
                    },
                },
                type: 'object',
            },
        ],
        messages: {
            labelHasAssociatedControl: 'A label component must be associated with a form element',
        },
    },
    defaultOptions: [DEFAULT_OPTIONS],
    create(context, [{ checkIds, controlComponents, labelComponents }]) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        const allControlComponents = new Set([
            ...DEFAULT_CONTROL_COMPONENTS,
            ...(controlComponents ?? []),
        ]);
        const allLabelComponents = [
            ...DEFAULT_LABEL_COMPONENTS,
            ...(labelComponents ?? []),
        ];
        let inputItems = [];
        let labelItems = [];
        return {
            [`Element`](node) {
                if (allControlComponents.has(node.name)) {
                    inputItems.push(node);
                }
                const element = allLabelComponents.find(({ selector }) => selector === node.name);
                if (element) {
                    labelItems.push(node);
                }
            },
            onCodePathEnd() {
                for (const node of labelItems) {
                    const element = allLabelComponents.find(({ selector }) => selector === node.name);
                    if (!element)
                        continue;
                    const attributesInputs = new Map([...node.attributes, ...node.inputs].map(({ name, value }) => [
                        name,
                        value,
                    ]));
                    const inputValues = (element.inputs?.map((input) => attributesInputs.get(input)) ?? []).filter(filterUndefined);
                    let hasFor = inputValues.length > 0;
                    if (hasFor && checkIds) {
                        const value = inputValues[0];
                        hasFor = hasControlComponentWithId(inputItems, value);
                    }
                    if (hasFor || hasControlComponentIn(allControlComponents, node)) {
                        continue;
                    }
                    const loc = parserServices.convertNodeSourceSpanToLoc(node.sourceSpan);
                    context.report({
                        loc,
                        messageId: 'labelHasAssociatedControl',
                    });
                }
                inputItems = [];
                labelItems = [];
            },
        };
    },
});
function hasControlComponentIn(controlComponents, element) {
    return Boolean([...controlComponents].some((controlComponent) => (0, is_child_node_of_1.isChildNodeOf)(element, controlComponent)));
}
function hasControlComponentWithId(controlComponents, id) {
    return Boolean([...controlComponents].some((node) => {
        return !![...node.attributes, ...node.inputs].find((input) => input.name === 'id' && input.value === id);
    }));
}
function filterUndefined(value) {
    return value !== undefined && value !== null;
}
