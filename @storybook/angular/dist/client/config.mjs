import './globals';
export { render, renderToCanvas } from './render';
export { decorateStory as applyDecorators } from './decorateStory';
import { enhanceArgTypes } from 'storybook/internal/docs-tools';
import { extractArgTypes, extractComponentDescription } from './compodoc';
export const parameters = {
    renderer: 'angular',
    docs: {
        story: { inline: true },
        extractArgTypes,
        extractComponentDescription,
    },
};
export const argTypesEnhancers = [enhanceArgTypes];
