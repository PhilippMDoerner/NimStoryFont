import { StoryFnAngularReturnType } from '../types';
import { PropertyExtractor } from './utils/PropertyExtractor';
export declare const getApplication: ({ storyFnAngular, component, targetSelector, analyzedMetadata, }: {
    storyFnAngular: StoryFnAngularReturnType;
    component?: any;
    targetSelector: string;
    analyzedMetadata: PropertyExtractor;
}) => import("@angular/core").Type<any>;
