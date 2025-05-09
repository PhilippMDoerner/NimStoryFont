"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'prefer-ngsrc';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensures ngSrc is used instead of src for img elements',
        },
        schema: [],
        messages: {
            missingAttribute: 'The attribute [ngSrc] should be used for img elements instead of [src].',
            invalidDoubleSource: 'Only [ngSrc] should exist on an img element. Delete the [src] attribute.',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            'Element[name=img]'(element) {
                const ngSrcAttribute = hasNgSrcAttribute(element);
                const srcAttribute = hasNormalSrcAttribute(element);
                if (!srcAttribute ||
                    (!ngSrcAttribute && isSrcBase64Image(srcAttribute))) {
                    return;
                }
                const loc = parserServices.convertNodeSourceSpanToLoc(srcAttribute.sourceSpan);
                context.report({
                    loc,
                    messageId: !ngSrcAttribute
                        ? 'missingAttribute'
                        : 'invalidDoubleSource',
                });
            },
        };
    },
});
function hasNgSrcAttribute({ inputs, attributes, }) {
    return [...inputs, ...attributes].find(({ name }) => name === 'ngSrc');
}
function hasNormalSrcAttribute({ inputs, attributes, }) {
    return [...inputs, ...attributes].find(({ name }) => name === 'src');
}
// Adheres to angular's assertion that ngSrc value is not a data URL.
// https://github.com/angular/angular/blob/17.0.3/packages/common/src/directives/ng_optimized_image/ng_optimized_image.ts#L585
function isSrcBase64Image(attribute) {
    if (attribute instanceof bundled_angular_compiler_1.TmplAstTextAttribute) {
        return attribute.value.trim().startsWith('data:');
    }
    return false;
}
