import { AbstractRenderer } from './AbstractRenderer';
type RenderType = 'canvas' | 'docs';
export declare class RendererFactory {
    private lastRenderType;
    private rendererMap;
    getRendererInstance(targetDOMNode: HTMLElement): Promise<AbstractRenderer | null>;
    private buildRenderer;
}
export declare const getRenderType: (targetDOMNode: HTMLElement) => RenderType;
export declare function clearRootHTMLElement(renderType: RenderType): void;
export {};
