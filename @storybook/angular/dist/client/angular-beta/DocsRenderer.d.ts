import { Parameters, StoryFnAngularReturnType } from '../types';
import { AbstractRenderer } from './AbstractRenderer';
export declare class DocsRenderer extends AbstractRenderer {
    render(options: {
        storyFnAngular: StoryFnAngularReturnType;
        forced: boolean;
        component: any;
        parameters: Parameters;
        targetDOMNode: HTMLElement;
    }): Promise<void>;
    beforeFullRender(domNode?: HTMLElement): Promise<void>;
    protected initAngularRootElement(targetDOMNode: HTMLElement, targetSelector: string): void;
}
