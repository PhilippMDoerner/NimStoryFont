"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const get_nearest_node_from_1 = require("../utils/get-nearest-node-from");
exports.RULE_NAME = 'no-call-expression';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Disallows calling expressions in templates, except for output handlers',
        },
        schema: [
            {
                additionalProperties: false,
                properties: {
                    allowList: {
                        items: { type: 'string' },
                        type: 'array',
                        uniqueItems: true,
                    },
                    allowPrefix: { type: 'string' },
                    allowSuffix: { type: 'string' },
                },
                type: 'object',
            },
        ],
        messages: {
            noCallExpression: 'Avoid calling expressions in templates',
        },
    },
    defaultOptions: [
        { allowList: [], allowPrefix: undefined, allowSuffix: undefined },
    ],
    create(context, [{ allowList, allowPrefix, allowSuffix }]) {
        (0, utils_1.ensureTemplateParser)(context);
        const sourceCode = context.sourceCode;
        return {
            'Call[receiver.name!="$any"]'(node) {
                const isChildOfBoundEvent = Boolean((0, get_nearest_node_from_1.getNearestNodeFrom)(node, isBoundEvent));
                if (isChildOfBoundEvent ||
                    isCallNameInAllowList(node.receiver, allowList)) {
                    return;
                }
                if (allowPrefix &&
                    isASTWithName(node.receiver) &&
                    node.receiver.name.startsWith(allowPrefix)) {
                    return;
                }
                if (allowSuffix &&
                    isASTWithName(node.receiver) &&
                    node.receiver.name.endsWith(allowSuffix)) {
                    return;
                }
                const { sourceSpan: { start, end }, } = node;
                context.report({
                    loc: {
                        start: sourceCode.getLocFromIndex(start),
                        end: sourceCode.getLocFromIndex(end),
                    },
                    messageId: 'noCallExpression',
                });
            },
        };
    },
});
function isBoundEvent(node) {
    return node instanceof bundled_angular_compiler_1.TmplAstBoundEvent;
}
function isASTWithName(ast) {
    return !!ast.name;
}
function isCallNameInAllowList(ast, allowList) {
    return (allowList &&
        allowList.length > 0 &&
        isASTWithName(ast) &&
        allowList.indexOf(ast.name) > -1);
}
