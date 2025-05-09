"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRenderer = void 0;
const AbstractRenderer_1 = require("./AbstractRenderer");
class CanvasRenderer extends AbstractRenderer_1.AbstractRenderer {
    async render(options) {
        await super.render(options);
    }
    async beforeFullRender() {
        CanvasRenderer.resetApplications();
    }
}
exports.CanvasRenderer = CanvasRenderer;
