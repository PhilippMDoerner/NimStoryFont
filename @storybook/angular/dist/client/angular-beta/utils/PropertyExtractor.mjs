var _a;
import { CommonModule } from '@angular/common';
import { Component, Directive, Injectable, InjectionToken, Input, Output, Pipe, ɵReflectionCapabilities as ReflectionCapabilities, VERSION, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { dedent } from 'ts-dedent';
import { isComponentAlreadyDeclared } from './NgModulesAnalyzer';
export const reflectionCapabilities = new ReflectionCapabilities();
export const REMOVED_MODULES = new InjectionToken('REMOVED_MODULES');
export const uniqueArray = (arr) => {
    return arr
        .flat(Number.MAX_VALUE)
        .filter(Boolean)
        .filter((value, index, self) => self.indexOf(value) === index);
};
export class PropertyExtractor {
    constructor(metadata, component) {
        this.metadata = metadata;
        this.component = component;
        this.declarations = [];
        /**
         * Analyze NgModule Metadata
         *
         * - Removes Restricted Imports
         * - Extracts providers from ModuleWithProviders
         * - Returns a new NgModuleMetadata object
         */
        this.analyzeMetadata = async (metadata) => {
            const declarations = [...(metadata?.declarations || [])];
            const providers = [...(metadata?.providers || [])];
            const applicationProviders = [];
            const imports = await Promise.all([...(metadata?.imports || [])].map(async (imported) => {
                const [isRestricted, restrictedProviders] = await _a.analyzeRestricted(imported);
                if (isRestricted) {
                    applicationProviders.unshift(restrictedProviders || []);
                    return null;
                }
                return imported;
            })).then((results) => results.filter(Boolean));
            return { ...metadata, imports, providers, applicationProviders, declarations };
        };
    }
    // With the new way of mounting standalone components to the DOM via bootstrapApplication API,
    // we should now pass ModuleWithProviders to the providers array of the bootstrapApplication function.
    static warnImportsModuleWithProviders(propertyExtractor) {
        const hasModuleWithProvidersImport = propertyExtractor.imports.some((importedModule) => 'ngModule' in importedModule);
        if (hasModuleWithProvidersImport) {
            console.warn(dedent(`
          Storybook Warning: 
          moduleMetadata property 'imports' contains one or more ModuleWithProviders, likely the result of a 'Module.forRoot()'-style call.
          In Storybook 7.0 we use Angular's new 'bootstrapApplication' API to mount the component to the DOM, which accepts a list of providers to set up application-wide providers.
          Use the 'applicationConfig' decorator from '@storybook/angular' to pass your ModuleWithProviders to the 'providers' property in combination with the importProvidersFrom helper function from '@angular/core' to extract all the necessary providers.
          Visit https://angular.io/guide/standalone-components#configuring-dependency-injection for more information
          `));
        }
    }
    async init() {
        const analyzed = await this.analyzeMetadata(this.metadata);
        this.imports = uniqueArray([CommonModule, analyzed.imports]);
        this.providers = uniqueArray(analyzed.providers);
        this.applicationProviders = uniqueArray(analyzed.applicationProviders);
        this.declarations = uniqueArray(analyzed.declarations);
        if (this.component) {
            const { isDeclarable, isStandalone } = _a.analyzeDecorators(this.component);
            const isDeclared = isComponentAlreadyDeclared(this.component, analyzed.declarations, this.imports);
            if (isStandalone) {
                this.imports.push(this.component);
            }
            else if (isDeclarable && !isDeclared) {
                this.declarations.push(this.component);
            }
        }
    }
}
_a = PropertyExtractor;
PropertyExtractor.analyzeRestricted = async (ngModule) => {
    if (ngModule === BrowserModule) {
        console.warn(dedent `
          Storybook Warning:
          You have imported the "BrowserModule", which is not necessary anymore. 
          In Storybook v7.0 we are using Angular's new bootstrapApplication API to mount an Angular application to the DOM.
          Note that the BrowserModule providers are automatically included when starting an application with bootstrapApplication()
          Please remove the "BrowserModule" from the list of imports in your moduleMetadata definition to remove this warning.
        `);
        return [true];
    }
    try {
        const animations = await import('@angular/platform-browser/animations');
        if (ngModule === animations.BrowserAnimationsModule) {
            console.warn(dedent `
            Storybook Warning:
            You have added the "BrowserAnimationsModule" to the list of "imports" in your moduleMetadata definition of your Story.
            In Storybook 7.0 we use Angular's new 'bootstrapApplication' API to mount the component to the DOM, which accepts a list of providers to set up application-wide providers.
            Use the 'applicationConfig' decorator from '@storybook/angular' and add the "provideAnimations" function to the list of "providers".
            If your Angular version does not support "provide-like" functions, use the helper function importProvidersFrom instead to set up animations. For this case, please add "importProvidersFrom(BrowserAnimationsModule)" to the list of providers of your applicationConfig definition.
            Please visit https://angular.io/guide/standalone-components#configuring-dependency-injection for more information.
          `);
            return [true, animations.provideAnimations()];
        }
        if (ngModule === animations.NoopAnimationsModule) {
            console.warn(dedent `
            Storybook Warning:
            You have added the "NoopAnimationsModule" to the list of "imports" in your moduleMetadata definition of your Story.
            In Storybook v7.0 we are using Angular's new bootstrapApplication API to mount an Angular application to the DOM, which accepts a list of providers to set up application-wide providers.
            Use the 'applicationConfig' decorator from '@storybook/angular' and add the "provideNoopAnimations" function to the list of "providers".
            If your Angular version does not support "provide-like" functions, use the helper function importProvidersFrom instead to set up noop animations and to extract all necessary providers from NoopAnimationsModule. For this case, please add "importProvidersFrom(NoopAnimationsModule)" to the list of providers of your applicationConfig definition.
            Please visit https://angular.io/guide/standalone-components#configuring-dependency-injection for more information.
          `);
            return [true, animations.provideNoopAnimations()];
        }
    }
    catch (e) {
        return [false];
    }
    return [false];
};
PropertyExtractor.analyzeDecorators = (component) => {
    const decorators = reflectionCapabilities.annotations(component);
    const isComponent = decorators.some((d) => _a.isDecoratorInstanceOf(d, 'Component'));
    const isDirective = decorators.some((d) => _a.isDecoratorInstanceOf(d, 'Directive'));
    const isPipe = decorators.some((d) => _a.isDecoratorInstanceOf(d, 'Pipe'));
    const isDeclarable = isComponent || isDirective || isPipe;
    // Check if the hierarchically lowest Component or Directive decorator (the only relevant for importing dependencies) is standalone.
    let isStandalone = (isComponent || isDirective) &&
        [...decorators]
            .reverse() // reflectionCapabilities returns decorators in a hierarchically top-down order
            .find((d) => _a.isDecoratorInstanceOf(d, 'Component') || _a.isDecoratorInstanceOf(d, 'Directive'))?.standalone;
    //Starting in Angular 19 the default (in case it's undefined) value for standalone is true
    if (isStandalone === undefined) {
        isStandalone = !!(VERSION.major && Number(VERSION.major) >= 19);
    }
    return { isDeclarable, isStandalone };
};
PropertyExtractor.isDecoratorInstanceOf = (decorator, name) => {
    let factory;
    switch (name) {
        case 'Component':
            factory = Component;
            break;
        case 'Directive':
            factory = Directive;
            break;
        case 'Pipe':
            factory = Pipe;
            break;
        case 'Injectable':
            factory = Injectable;
            break;
        case 'Input':
            factory = Input;
            break;
        case 'Output':
            factory = Output;
            break;
        default:
            throw new Error(`Unknown decorator type: ${name}`);
    }
    return decorator instanceof factory || decorator.ngMetadataName === name;
};
