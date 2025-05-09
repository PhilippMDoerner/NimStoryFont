import { DecoratorFunction, LegacyStoryFn } from 'storybook/internal/types';
import { AngularRenderer } from './types';
export default function decorateStory(mainStoryFn: LegacyStoryFn<AngularRenderer>, decorators: DecoratorFunction<AngularRenderer>[]): LegacyStoryFn<AngularRenderer>;
export { decorateStory };
