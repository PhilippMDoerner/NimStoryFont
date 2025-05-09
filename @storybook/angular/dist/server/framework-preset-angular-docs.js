"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewAnnotations = void 0;
const docs_tools_1 = require("storybook/internal/docs-tools");
const previewAnnotations = (entry = [], options) => {
    if (!(0, docs_tools_1.hasDocsOrControls)(options))
        return entry;
    return [...entry, require.resolve('../client/docs/config')];
};
exports.previewAnnotations = previewAnnotations;
