import { computesTemplateFromComponent } from './ComputesTemplateFromComponent';
import { createStorybookWrapperComponent } from './StorybookWrapperComponent';
export const getApplication = ({ storyFnAngular, component, targetSelector, analyzedMetadata, }) => {
    const { props, styles, moduleMetadata = {} } = storyFnAngular;
    let { template } = storyFnAngular;
    const hasTemplate = !hasNoTemplate(template);
    if (!hasTemplate && component) {
        template = computesTemplateFromComponent(component, props, '');
    }
    /** Create a component that wraps generated template and gives it props */
    return createStorybookWrapperComponent({
        moduleMetadata,
        selector: targetSelector,
        template,
        storyComponent: component,
        styles,
        initialProps: props,
        analyzedMetadata,
    });
};
function hasNoTemplate(template) {
    return template === null || template === undefined;
}
