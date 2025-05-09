import { Parameters, StoryFnAngularReturnType } from '../types';
import { AbstractRenderer } from './AbstractRenderer';
export declare class CanvasRenderer extends AbstractRenderer {
    render(options: {
        storyFnAngular: StoryFnAngularReturnType;
        forced: boolean;
        parameters: Parameters;
        component: any;
        targetDOMNode: HTMLElement;
    }): Promise<void>;
    beforeFullRender(): Promise<void>;
}
