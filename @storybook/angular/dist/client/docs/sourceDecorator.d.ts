import { PartialStoryFn } from 'storybook/internal/types';
import { AngularRenderer, StoryContext } from '../types';
export declare const skipSourceRender: (context: StoryContext) => any;
/**
 * Angular source decorator.
 *
 * @param storyFn Fn
 * @param context StoryContext
 */
export declare const sourceDecorator: (storyFn: PartialStoryFn<AngularRenderer>, context: StoryContext) => import("../types").StoryFnAngularReturnType;
