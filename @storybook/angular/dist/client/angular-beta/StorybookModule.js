"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
const ComputesTemplateFromComponent_1 = require("./ComputesTemplateFromComponent");
const StorybookWrapperComponent_1 = require("./StorybookWrapperComponent");
const getApplication = ({ storyFnAngular, component, targetSelector, analyzedMetadata, }) => {
    const { props, styles, moduleMetadata = {} } = storyFnAngular;
    let { template } = storyFnAngular;
    const hasTemplate = !hasNoTemplate(template);
    if (!hasTemplate && component) {
        template = (0, ComputesTemplateFromComponent_1.computesTemplateFromComponent)(component, props, '');
    }
    /** Create a component that wraps generated template and gives it props */
    return (0, StorybookWrapperComponent_1.createStorybookWrapperComponent)({
        moduleMetadata,
        selector: targetSelector,
        template,
        storyComponent: component,
        styles,
        initialProps: props,
        analyzedMetadata,
    });
};
exports.getApplication = getApplication;
function hasNoTemplate(template) {
    return template === null || template === undefined;
}
