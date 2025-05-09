"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceDecorator = exports.skipSourceRender = void 0;
const docs_tools_1 = require("storybook/internal/docs-tools");
const preview_api_1 = require("storybook/internal/preview-api");
const renderer_1 = require("../../renderer");
const skipSourceRender = (context) => {
    const sourceParams = context?.parameters.docs?.source;
    // always render if the user forces it
    if (sourceParams?.type === docs_tools_1.SourceType.DYNAMIC) {
        return false;
    }
    // never render if the user is forcing the block to render code, or
    // if the user provides code
    return sourceParams?.code || sourceParams?.type === docs_tools_1.SourceType.CODE;
};
exports.skipSourceRender = skipSourceRender;
/**
 * Angular source decorator.
 *
 * @param storyFn Fn
 * @param context StoryContext
 */
const sourceDecorator = (storyFn, context) => {
    const story = storyFn();
    if ((0, exports.skipSourceRender)(context)) {
        return story;
    }
    const channel = preview_api_1.addons.getChannel();
    const { props, userDefinedTemplate } = story;
    const { component, argTypes, parameters } = context;
    const template = parameters.docs?.source?.excludeDecorators
        ? context.originalStoryFn(context.args, context).template
        : story.template;
    let toEmit;
    (0, preview_api_1.useEffect)(() => {
        if (toEmit) {
            const { id, unmappedArgs } = context;
            const format = parameters?.docs?.source?.format ?? true;
            channel.emit(docs_tools_1.SNIPPET_RENDERED, {
                id,
                args: unmappedArgs,
                source: toEmit,
                format: format === true ? 'angular' : format,
            });
        }
    });
    if (component && !userDefinedTemplate) {
        const source = (0, renderer_1.computesTemplateSourceFromComponent)(component, props, argTypes);
        // We might have a story with a Directive or Service defined as the component
        // In these cases there might exist a template, even if we aren't able to create source from component
        if (source || template) {
            toEmit = source || template;
        }
    }
    else if (template) {
        toEmit = template;
    }
    return story;
};
exports.sourceDecorator = sourceDecorator;
