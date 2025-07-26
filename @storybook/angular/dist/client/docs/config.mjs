import { SourceType } from 'storybook/internal/docs-tools';
import { sourceDecorator } from './sourceDecorator';
export const parameters = {
    docs: {
        source: {
            type: SourceType.DYNAMIC,
            language: 'html',
        },
    },
};
export const decorators = [sourceDecorator];
