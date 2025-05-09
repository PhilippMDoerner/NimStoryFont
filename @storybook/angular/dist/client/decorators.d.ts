import { DecoratorFunction, StoryContext } from 'storybook/internal/types';
import { Type } from '@angular/core';
import { ApplicationConfig } from '@angular/platform-browser';
import { AngularRenderer, ICollection, NgModuleMetadata } from './types';
export declare const moduleMetadata: <TArgs = any>(metadata: Partial<NgModuleMetadata>) => DecoratorFunction<AngularRenderer, TArgs>;
/**
 * Decorator to set the config options which are available during the application bootstrap
 * operation
 */
export declare function applicationConfig<TArgs = any>(
/** Set of config options available during the application bootstrap operation. */
config: ApplicationConfig): DecoratorFunction<AngularRenderer, TArgs>;
export declare const componentWrapperDecorator: <TArgs = any>(element: Type<unknown> | ((story: string) => string), props?: ICollection | ((storyContext: StoryContext<AngularRenderer, TArgs>) => ICollection)) => DecoratorFunction<AngularRenderer, TArgs>;
