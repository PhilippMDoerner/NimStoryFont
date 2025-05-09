import { Type } from '@angular/core';
import { ICollection, NgModuleMetadata } from '../types';
import { PropertyExtractor } from './utils/PropertyExtractor';
/** Wraps the story template into a component */
export declare const createStorybookWrapperComponent: ({ selector, template, storyComponent, styles, moduleMetadata, initialProps, analyzedMetadata, }: {
    selector: string;
    template: string;
    storyComponent: Type<unknown> | undefined;
    styles: string[];
    moduleMetadata: NgModuleMetadata;
    initialProps?: ICollection;
    analyzedMetadata: PropertyExtractor;
}) => Type<any>;
