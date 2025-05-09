"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argTypesEnhancers = exports.decorators = exports.parameters = void 0;
const docs_tools_1 = require("storybook/internal/docs-tools");
const compodoc_1 = require("./compodoc");
const sourceDecorator_1 = require("./sourceDecorator");
exports.parameters = {
    docs: {
        story: { inline: true },
        extractArgTypes: compodoc_1.extractArgTypes,
        extractComponentDescription: compodoc_1.extractComponentDescription,
        source: {
            type: docs_tools_1.SourceType.DYNAMIC,
            language: 'html',
        },
    },
};
exports.decorators = [sourceDecorator_1.sourceDecorator];
exports.argTypesEnhancers = [docs_tools_1.enhanceArgTypes];
