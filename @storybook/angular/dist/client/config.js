"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argTypesEnhancers = exports.parameters = exports.applyDecorators = exports.renderToCanvas = exports.render = void 0;
require("./globals");
var render_1 = require("./render");
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return render_1.render; } });
Object.defineProperty(exports, "renderToCanvas", { enumerable: true, get: function () { return render_1.renderToCanvas; } });
var decorateStory_1 = require("./decorateStory");
Object.defineProperty(exports, "applyDecorators", { enumerable: true, get: function () { return decorateStory_1.decorateStory; } });
const docs_tools_1 = require("storybook/internal/docs-tools");
const compodoc_1 = require("./compodoc");
exports.parameters = {
    renderer: 'angular',
    docs: {
        story: { inline: true },
        extractArgTypes: compodoc_1.extractArgTypes,
        extractComponentDescription: compodoc_1.extractComponentDescription,
    },
};
exports.argTypesEnhancers = [docs_tools_1.enhanceArgTypes];
