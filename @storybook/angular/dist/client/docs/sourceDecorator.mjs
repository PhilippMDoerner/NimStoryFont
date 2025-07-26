import { SourceType } from 'storybook/internal/docs-tools';
import { useRef, emitTransformCode, useEffect } from 'storybook/preview-api';
import { computesTemplateSourceFromComponent } from '../../renderer';
export const skipSourceRender = (context) => {
    const sourceParams = context?.parameters.docs?.source;
    // always render if the user forces it
    if (sourceParams?.type === SourceType.DYNAMIC) {
        return false;
    }
    // never render if the user is forcing the block to render code, or
    // if the user provides code
    return sourceParams?.code || sourceParams?.type === SourceType.CODE;
};
/**
 * Angular source decorator.
 *
 * @param storyFn Fn
 * @param context StoryContext
 */
export const sourceDecorator = (storyFn, context) => {
    const story = storyFn();
    const source = useRef(undefined);
    useEffect(() => {
        if (skipSourceRender(context)) {
            return;
        }
        const { props, userDefinedTemplate } = story;
        const { component, argTypes, parameters } = context;
        const template = parameters.docs?.source?.excludeDecorators
            ? context.originalStoryFn(context.args, context).template
            : story.template;
        if (component && !userDefinedTemplate) {
            const sourceFromComponent = computesTemplateSourceFromComponent(component, props, argTypes);
            // We might have a story with a Directive or Service defined as the component
            // In these cases there might exist a template, even if we aren't able to create source from component
            const newSource = sourceFromComponent || template;
            if (newSource && newSource !== source.current) {
                emitTransformCode(newSource, context);
                source.current = newSource;
            }
        }
        else if (template && template !== source.current) {
            emitTransformCode(template, context);
            source.current = template;
        }
    });
    return story;
};
