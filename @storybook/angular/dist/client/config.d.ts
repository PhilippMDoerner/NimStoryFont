import './globals';
export { render, renderToCanvas } from './render';
export { decorateStory as applyDecorators } from './decorateStory';
import { ArgTypesEnhancer, Parameters } from 'storybook/internal/types';
export declare const parameters: Parameters;
export declare const argTypesEnhancers: ArgTypesEnhancer[];
