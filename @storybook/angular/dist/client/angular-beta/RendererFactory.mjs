import { AbstractRenderer } from './AbstractRenderer';
import { CanvasRenderer } from './CanvasRenderer';
import { DocsRenderer } from './DocsRenderer';
export class RendererFactory {
    constructor() {
        this.rendererMap = new Map();
    }
    async getRendererInstance(targetDOMNode) {
        const targetId = targetDOMNode.id;
        // do nothing if the target node is null
        // fix a problem when the docs asks 2 times the same component at the same time
        // the 1st targetDOMNode of the 1st requested rendering becomes null 🤷‍♂️
        if (targetDOMNode === null) {
            return null;
        }
        const renderType = getRenderType(targetDOMNode);
        // keep only instances of the same type
        if (this.lastRenderType && this.lastRenderType !== renderType) {
            await AbstractRenderer.resetApplications();
            clearRootHTMLElement(renderType);
            this.rendererMap.clear();
        }
        if (!this.rendererMap.has(targetId)) {
            this.rendererMap.set(targetId, this.buildRenderer(renderType));
        }
        this.lastRenderType = renderType;
        return this.rendererMap.get(targetId);
    }
    buildRenderer(renderType) {
        if (renderType === 'docs') {
            return new DocsRenderer();
        }
        return new CanvasRenderer();
    }
}
export const getRenderType = (targetDOMNode) => {
    return targetDOMNode.id === 'storybook-root' ? 'canvas' : 'docs';
};
export function clearRootHTMLElement(renderType) {
    switch (renderType) {
        case 'canvas':
            global.document.getElementById('storybook-docs').innerHTML = '';
            break;
        case 'docs':
            global.document.getElementById('storybook-root').innerHTML = '';
            break;
        default:
            break;
    }
}
