import { Component, Type } from '@angular/core';
export type ComponentInputsOutputs = {
    inputs: {
        propName: string;
        templateName: string;
    }[];
    outputs: {
        propName: string;
        templateName: string;
    }[];
};
/** Returns component Inputs / Outputs by browsing these properties and decorator */
export declare const getComponentInputsOutputs: (component: any) => ComponentInputsOutputs;
export declare const isDeclarable: (component: any) => boolean;
export declare const isComponent: (component: any) => component is Type<unknown>;
export declare const isStandaloneComponent: (component: any) => component is Type<unknown>;
/** Returns all component decorator properties is used to get all `@Input` and `@Output` Decorator */
export declare const getComponentPropsDecoratorMetadata: (component: any) => {
    [key: string]: any[];
};
/** Returns component decorator `@Component` */
export declare const getComponentDecoratorMetadata: (component: any) => Component | undefined;
