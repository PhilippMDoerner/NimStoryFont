import { DOCS_RENDERED, STORY_CHANGED } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';
import { AbstractRenderer, STORY_UID_ATTRIBUTE } from './AbstractRenderer';
import { getNextStoryUID } from './utils/StoryUID';
export class DocsRenderer extends AbstractRenderer {
    async render(options) {
        const channel = addons.getChannel();
        /**
         * Destroy and recreate the PlatformBrowserDynamic of angular For several stories to be rendered
         * in the same docs we should not destroy angular between each rendering but do it when the
         * rendered stories are not needed anymore.
         *
         * Note for improvement: currently there is one event per story rendered in the doc. But one
         * event could be enough for the whole docs
         */
        channel.once(STORY_CHANGED, async () => {
            await DocsRenderer.resetApplications();
        });
        /**
         * Destroy and recreate the PlatformBrowserDynamic of angular when doc re render. Allows to call
         * ngOnDestroy of angular for previous component
         */
        channel.once(DOCS_RENDERED, async () => {
            await DocsRenderer.resetApplications();
        });
        await super.render({ ...options, forced: false });
    }
    async beforeFullRender(domNode) {
        DocsRenderer.resetApplications(domNode);
    }
    initAngularRootElement(targetDOMNode, targetSelector) {
        super.initAngularRootElement(targetDOMNode, targetSelector);
        targetDOMNode.setAttribute(STORY_UID_ATTRIBUTE, getNextStoryUID(targetDOMNode.id));
    }
}
