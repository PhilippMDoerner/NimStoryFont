/// <reference types="webpack-env" />
import './globals';
export * from './public-types';
export * from './portable-stories';
export { moduleMetadata, componentWrapperDecorator, applicationConfig } from './decorators';
export { argsToTemplate } from './argsToTemplate';
// optimization: stop HMR propagation in webpack
if (typeof module !== 'undefined')
    module?.hot?.decline();
