import { Subject } from 'rxjs';
import { ICollection, StoryFnAngularReturnType } from '../types';
type StoryRenderInfo = {
    storyFnAngular: StoryFnAngularReturnType;
    moduleMetadataSnapshot: string;
};
declare global {
    const STORYBOOK_ANGULAR_OPTIONS: {
        experimentalZoneless: boolean;
    };
}
/**
 * Attribute name for the story UID that may be written to the targetDOMNode.
 *
 * If a target DOM node has a story UID attribute, it will be used as part of the selector for the
 * Angular component.
 */
export declare const STORY_UID_ATTRIBUTE = "data-sb-story-uid";
export declare abstract class AbstractRenderer {
    /** Wait and destroy the platform */
    static resetApplications(domNode?: HTMLElement): void;
    protected previousStoryRenderInfo: Map<HTMLElement, StoryRenderInfo>;
    protected storyProps$: Subject<ICollection | undefined>;
    protected abstract beforeFullRender(domNode?: HTMLElement): Promise<void>;
    /**
     * Bootstrap main angular module with main component or send only new `props` with storyProps$
     *
     * @param storyFnAngular {StoryFnAngularReturnType}
     * @param forced {boolean} If :
     *
     *   - True render will only use the StoryFn `props' in storyProps observable that will update sotry's
     *       component/template properties. Improves performance without reloading the whole
     *       module&component if props changes
     *   - False fully recharges or initializes angular module & component
     *
     * @param component {Component}
     */
    render({ storyFnAngular, forced, component, targetDOMNode, }: {
        storyFnAngular: StoryFnAngularReturnType;
        forced: boolean;
        component?: any;
        targetDOMNode: HTMLElement;
    }): Promise<void>;
    /**
     * Only ASCII alphanumerics can be used as HTML tag name. https://html.spec.whatwg.org/#elements-2
     *
     * Therefore, stories break when non-ASCII alphanumerics are included in target selector.
     * https://github.com/storybookjs/storybook/issues/15147
     *
     * This method returns storyId when it doesn't contain any non-ASCII alphanumerics. Otherwise, it
     * generates a valid HTML tag name from storyId by removing non-ASCII alphanumerics from storyId,
     * prefixing "sb-", and suffixing "-component"
     *
     * @memberof AbstractRenderer
     * @protected
     */
    protected generateTargetSelectorFromStoryId(id: string): string;
    /**
     * Angular is unable to handle components that have selectors with accented attributes.
     *
     * Therefore, stories break when meta's title contains accents.
     * https://github.com/storybookjs/storybook/issues/29132
     *
     * This method filters accents from a given raw id. For example, this method converts
     * 'Example/Button with an "é" accent' into 'Example/Button with an "e" accent'.
     *
     * @memberof AbstractRenderer
     * @protected
     */
    protected generateStoryUIdFromRawStoryUid(rawStoryUid: string | null): string | null;
    /** Adds DOM element that angular will use as bootstrap component. */
    protected initAngularRootElement(targetDOMNode: HTMLElement, targetSelector: string): void;
    private fullRendererRequired;
}
export {};
