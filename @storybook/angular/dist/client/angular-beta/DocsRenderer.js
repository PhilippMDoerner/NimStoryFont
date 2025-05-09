"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsRenderer = void 0;
const core_events_1 = require("storybook/internal/core-events");
const preview_api_1 = require("storybook/internal/preview-api");
const AbstractRenderer_1 = require("./AbstractRenderer");
const StoryUID_1 = require("./utils/StoryUID");
class DocsRenderer extends AbstractRenderer_1.AbstractRenderer {
    async render(options) {
        const channel = preview_api_1.addons.getChannel();
        /**
         * Destroy and recreate the PlatformBrowserDynamic of angular For several stories to be rendered
         * in the same docs we should not destroy angular between each rendering but do it when the
         * rendered stories are not needed anymore.
         *
         * Note for improvement: currently there is one event per story rendered in the doc. But one
         * event could be enough for the whole docs
         */
        channel.once(core_events_1.STORY_CHANGED, async () => {
            await DocsRenderer.resetApplications();
        });
        /**
         * Destroy and recreate the PlatformBrowserDynamic of angular when doc re render. Allows to call
         * ngOnDestroy of angular for previous component
         */
        channel.once(core_events_1.DOCS_RENDERED, async () => {
            await DocsRenderer.resetApplications();
        });
        await super.render({ ...options, forced: false });
    }
    async beforeFullRender(domNode) {
        DocsRenderer.resetApplications(domNode);
    }
    initAngularRootElement(targetDOMNode, targetSelector) {
        super.initAngularRootElement(targetDOMNode, targetSelector);
        targetDOMNode.setAttribute(AbstractRenderer_1.STORY_UID_ATTRIBUTE, (0, StoryUID_1.getNextStoryUID)(targetDOMNode.id));
    }
}
exports.DocsRenderer = DocsRenderer;
