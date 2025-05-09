import { ArgTypes } from 'storybook/internal/types';
import { Type } from '@angular/core';
import { ICollection } from '../types';
/**
 * Returns the property name, if it can be accessed with dot notation. If not, it returns
 * `this['propertyName']`.
 */
export declare const formatPropInTemplate: (propertyName: string) => string;
/**
 * Converts a component into a template with inputs/outputs present in initial props
 *
 * @param component
 * @param initialProps
 * @param innerTemplate
 */
export declare const computesTemplateFromComponent: (component: Type<unknown>, initialProps?: ICollection, innerTemplate?: string) => string;
/**
 * Converts a component into a template with inputs/outputs present in initial props
 *
 * @param component
 * @param initialProps
 * @param innerTemplate
 */
export declare const computesTemplateSourceFromComponent: (component: Type<unknown>, initialProps?: ICollection, argTypes?: ArgTypes) => string | null;
