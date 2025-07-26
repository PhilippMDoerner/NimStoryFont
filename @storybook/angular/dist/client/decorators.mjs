import { computesTemplateFromComponent } from './angular-beta/ComputesTemplateFromComponent';
import { isComponent } from './angular-beta/utils/NgComponentAnalyzer';
// We use `any` here as the default type rather than `Args` because we need something that is
// castable to any component-specific args type when the user is being careful.
export const moduleMetadata = (metadata) => (storyFn) => {
    const story = storyFn();
    const storyMetadata = story.moduleMetadata || {};
    metadata = metadata || {};
    return {
        ...story,
        moduleMetadata: {
            declarations: [...(metadata.declarations || []), ...(storyMetadata.declarations || [])],
            entryComponents: [
                ...(metadata.entryComponents || []),
                ...(storyMetadata.entryComponents || []),
            ],
            imports: [...(metadata.imports || []), ...(storyMetadata.imports || [])],
            schemas: [...(metadata.schemas || []), ...(storyMetadata.schemas || [])],
            providers: [...(metadata.providers || []), ...(storyMetadata.providers || [])],
        },
    };
};
/**
 * Decorator to set the config options which are available during the application bootstrap
 * operation
 */
export function applicationConfig(
/** Set of config options available during the application bootstrap operation. */
config) {
    return (storyFn) => {
        const story = storyFn();
        const storyConfig = story.applicationConfig;
        return {
            ...story,
            applicationConfig: storyConfig || config
                ? {
                    ...config,
                    ...storyConfig,
                    providers: [...(config?.providers || []), ...(storyConfig?.providers || [])],
                }
                : undefined,
        };
    };
}
export const componentWrapperDecorator = (element, props) => (storyFn, storyContext) => {
    const story = storyFn();
    const currentProps = typeof props === 'function' ? props(storyContext) : props;
    const template = isComponent(element)
        ? computesTemplateFromComponent(element, currentProps ?? {}, story.template)
        : element(story.template);
    return {
        ...story,
        template,
        ...(currentProps || story.props
            ? {
                props: {
                    ...currentProps,
                    ...story.props,
                },
            }
            : {}),
    };
};
