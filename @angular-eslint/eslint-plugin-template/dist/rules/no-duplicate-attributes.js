"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const get_original_attribute_name_1 = require("../utils/get-original-attribute-name");
exports.RULE_NAME = 'no-duplicate-attributes';
const DEFAULT_OPTIONS = {
    allowTwoWayDataBinding: true,
    allowStylePrecedenceDuplicates: false,
    ignore: [],
};
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Ensures that there are no duplicate input properties or output event listeners',
        },
        hasSuggestions: true,
        schema: [
            {
                type: 'object',
                properties: {
                    allowTwoWayDataBinding: {
                        type: 'boolean',
                        default: DEFAULT_OPTIONS.allowTwoWayDataBinding,
                        description: `Whether or not two-way data binding is allowed as an exception to the rule.`,
                    },
                    allowStylePrecedenceDuplicates: {
                        type: 'boolean',
                        default: DEFAULT_OPTIONS.allowStylePrecedenceDuplicates,
                        description: `Whether or not Angular style precedence is allowed as an exception to the rule. See https://angular.dev/guide/templates/class-binding#styling-precedence`,
                    },
                    ignore: {
                        type: 'array',
                        items: { type: 'string' },
                        uniqueItems: true,
                        default: DEFAULT_OPTIONS.ignore,
                        description: `Input or output properties for which duplicate presence is allowed as an exception to the rule.`,
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            noDuplicateAttributes: 'Duplicate attribute `{{attributeName}}`',
            suggestRemoveAttribute: 'Remove attribute `{{attributeName}}`',
        },
    },
    defaultOptions: [DEFAULT_OPTIONS],
    create(context, [{ allowTwoWayDataBinding, allowStylePrecedenceDuplicates, ignore }]) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            Element({ inputs, outputs, attributes }) {
                // According to the Angular documentation (https://angular.dev/guide/templates/class-binding#styling-precedence)
                // Angular merges both attributes which means their combined use can be seen as valid
                const angularStylePrecedenceDuplicatesAllowed = ['class', 'style'];
                let duplicateInputsAndAttributes = findDuplicates([
                    ...inputs,
                    ...attributes,
                ]);
                if (allowStylePrecedenceDuplicates) {
                    const inputsIgnored = inputs.filter((input) => angularStylePrecedenceDuplicatesAllowed.includes((0, get_original_attribute_name_1.getOriginalAttributeName)(input)));
                    if (inputsIgnored?.length > 0) {
                        const attributesIgnored = attributes.filter((attr) => angularStylePrecedenceDuplicatesAllowed.includes((0, get_original_attribute_name_1.getOriginalAttributeName)(attr)));
                        const inputsNotIgnored = inputs.filter((input) => !inputsIgnored.includes(input));
                        const attributesNotIgnored = attributes.filter((attr) => !attributesIgnored.includes(attr));
                        const ignoreDuplicated = [
                            ...findDuplicates(inputsIgnored),
                            ...findDuplicates(attributesIgnored),
                        ];
                        const notIgnoredDuplicates = [
                            ...findDuplicates(inputsNotIgnored),
                            ...findDuplicates(attributesNotIgnored),
                        ];
                        duplicateInputsAndAttributes = [
                            ...ignoreDuplicated,
                            ...notIgnoredDuplicates,
                        ];
                    }
                }
                const filteredOutputs = allowTwoWayDataBinding
                    ? outputs.filter((output) => {
                        return !inputs.some((input) => input.sourceSpan.start === output.sourceSpan.start &&
                            input.sourceSpan.end === output.sourceSpan.end);
                    })
                    : outputs;
                const duplicateOutputs = findDuplicates(filteredOutputs);
                const allDuplicates = [
                    ...duplicateInputsAndAttributes,
                    ...duplicateOutputs,
                ];
                const filteredDuplicates = ignore && ignore.length > 0
                    ? allDuplicates.filter((duplicate) => !ignore.includes((0, get_original_attribute_name_1.getOriginalAttributeName)(duplicate)))
                    : allDuplicates;
                filteredDuplicates.forEach((duplicate) => {
                    const loc = parserServices.convertNodeSourceSpanToLoc(duplicate.sourceSpan);
                    const data = {
                        attributeName: (0, get_original_attribute_name_1.getOriginalAttributeName)(duplicate),
                    };
                    context.report({
                        loc,
                        messageId: 'noDuplicateAttributes',
                        data,
                        suggest: [
                            {
                                messageId: 'suggestRemoveAttribute',
                                fix: (fixer) => fixer.removeRange([loc.start.column, loc.end.column + 1]),
                                data,
                            },
                        ],
                    });
                });
            },
        };
    },
});
function findDuplicates(elements) {
    return elements.filter((element) => {
        return elements.some((otherElement) => otherElement !== element &&
            (0, get_original_attribute_name_1.getOriginalAttributeName)(otherElement) ===
                (0, get_original_attribute_name_1.getOriginalAttributeName)(element));
    });
}
