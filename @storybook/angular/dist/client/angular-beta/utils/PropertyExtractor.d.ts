import { InjectionToken, NgModule, Provider, ɵReflectionCapabilities as ReflectionCapabilities, importProvidersFrom } from '@angular/core';
import { NgModuleMetadata } from '../../types';
export declare const reflectionCapabilities: ReflectionCapabilities;
export declare const REMOVED_MODULES: InjectionToken<unknown>;
export declare const uniqueArray: (arr: any[]) => any[];
export declare class PropertyExtractor implements NgModuleMetadata {
    private metadata;
    private component?;
    declarations?: any[];
    imports?: any[];
    providers?: Provider[];
    applicationProviders?: Array<Provider | ReturnType<typeof importProvidersFrom>>;
    constructor(metadata: NgModuleMetadata, component?: any | undefined);
    static warnImportsModuleWithProviders(propertyExtractor: PropertyExtractor): void;
    init(): Promise<void>;
    /**
     * Analyze NgModule Metadata
     *
     * - Removes Restricted Imports
     * - Extracts providers from ModuleWithProviders
     * - Returns a new NgModuleMetadata object
     */
    private analyzeMetadata;
    static analyzeRestricted: (ngModule: NgModule) => Promise<[boolean] | [boolean, Provider]>;
    static analyzeDecorators: (component: any) => {
        isDeclarable: boolean;
        isStandalone: any;
    };
    static isDecoratorInstanceOf: (decorator: any, name: string) => boolean;
}
