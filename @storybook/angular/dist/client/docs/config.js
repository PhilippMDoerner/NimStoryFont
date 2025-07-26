"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorators = exports.parameters = void 0;
const docs_tools_1 = require("storybook/internal/docs-tools");
const sourceDecorator_1 = require("./sourceDecorator");
exports.parameters = {
    docs: {
        source: {
            type: docs_tools_1.SourceType.DYNAMIC,
            language: 'html',
        },
    },
};
exports.decorators = [sourceDecorator_1.sourceDecorator];
