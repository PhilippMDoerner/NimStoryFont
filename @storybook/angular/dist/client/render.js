"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.rendererFactory = void 0;
exports.renderToCanvas = renderToCanvas;
require("@angular/compiler");
const RendererFactory_1 = require("./angular-beta/RendererFactory");
exports.rendererFactory = new RendererFactory_1.RendererFactory();
const render = (props) => ({ props });
exports.render = render;
async function renderToCanvas({ storyFn, showMain, forceRemount, storyContext: { component } }, element) {
    showMain();
    const renderer = await exports.rendererFactory.getRendererInstance(element);
    await renderer.render({
        storyFnAngular: storyFn(),
        component,
        forced: !forceRemount,
        targetDOMNode: element,
    });
}
