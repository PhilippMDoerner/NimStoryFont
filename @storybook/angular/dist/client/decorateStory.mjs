import { sanitizeStoryContextUpdate } from 'storybook/preview-api';
import { computesTemplateFromComponent } from './angular-beta/ComputesTemplateFromComponent';
export default function decorateStory(mainStoryFn, decorators) {
    const returnDecorators = [cleanArgsDecorator, ...decorators].reduce((previousStoryFn, decorator) => (context) => {
        const decoratedStory = decorator((update) => {
            return previousStoryFn({
                ...context,
                ...sanitizeStoryContextUpdate(update),
            });
        }, context);
        return decoratedStory;
    }, (context) => prepareMain(mainStoryFn(context), context));
    return returnDecorators;
}
export { decorateStory };
const prepareMain = (story, context) => {
    let { template } = story;
    const { component } = context;
    const userDefinedTemplate = !hasNoTemplate(template);
    if (!userDefinedTemplate && component) {
        template = computesTemplateFromComponent(component, story.props, '');
    }
    return {
        ...story,
        ...(template ? { template, userDefinedTemplate } : {}),
    };
};
function hasNoTemplate(template) {
    return template === null || template === undefined;
}
const cleanArgsDecorator = (storyFn, context) => {
    if (!context.argTypes || !context.args) {
        return storyFn();
    }
    const argsToClean = context.args;
    context.args = Object.entries(argsToClean).reduce((obj, [key, arg]) => {
        const argType = context.argTypes[key];
        // Only keeps args with a control or an action in argTypes
        if (argType?.action || argType?.control) {
            return { ...obj, [key]: arg };
        }
        return obj;
    }, {});
    return storyFn();
};
