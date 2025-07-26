import { AbstractRenderer } from './AbstractRenderer';
export class CanvasRenderer extends AbstractRenderer {
    async render(options) {
        await super.render(options);
    }
    async beforeFullRender() {
        CanvasRenderer.resetApplications();
    }
}
