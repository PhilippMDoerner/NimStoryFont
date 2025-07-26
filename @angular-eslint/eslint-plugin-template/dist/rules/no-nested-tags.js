"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-nested-tags';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: 'Denies nesting of <p> and <a> tags.',
        },
        schema: [],
        messages: {
            noNestedTags: '<{{tag}}> elements must not be nested! This breaks angular incremental hydration as all browsers will convert "<{{tag}}>1<{{tag}}>2</{{tag}}>3</{{tag}}>" into "<{{tag}}>1</{{tag}}><{{tag}}>2</{{tag}}>3", creating a DOM mismatch between SSR and Angular',
        },
    },
    defaultOptions: [],
    create(context) {
        const parserServices = (0, utils_1.getTemplateParserServices)(context);
        return {
            'Element[name=/^(p|a)$/]'(node) {
                const hasInvalidNesting = hasAncestorOfSameType(node);
                if (hasInvalidNesting) {
                    const loc = parserServices.convertElementSourceSpanToLoc(context, node);
                    context.report({
                        loc,
                        messageId: 'noNestedTags',
                        data: {
                            tag: node.name,
                        },
                    });
                }
            },
        };
    },
});
function hasAncestorOfSameType(node) {
    let parent = node.parent;
    while (parent) {
        if (parent instanceof bundled_angular_compiler_1.TmplAstElement && parent.name === node.name) {
            return true;
        }
        parent = parent.parent;
    }
    return false;
}
