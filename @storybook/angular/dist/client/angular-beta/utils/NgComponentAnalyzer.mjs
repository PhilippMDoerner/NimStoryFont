import { Component, Directive, Input, Output, Pipe, ɵReflectionCapabilities as ReflectionCapabilities, } from '@angular/core';
const reflectionCapabilities = new ReflectionCapabilities();
/** Returns component Inputs / Outputs by browsing these properties and decorator */
export const getComponentInputsOutputs = (component) => {
    const componentMetadata = getComponentDecoratorMetadata(component);
    const componentPropsMetadata = getComponentPropsDecoratorMetadata(component);
    const initialValue = {
        inputs: [],
        outputs: [],
    };
    // Adds the I/O present in @Component metadata
    if (componentMetadata && componentMetadata.inputs) {
        initialValue.inputs.push(...componentMetadata.inputs.map((i) => ({
            propName: typeof i === 'string' ? i : i.name,
            templateName: typeof i === 'string' ? i : i.alias,
        })));
    }
    if (componentMetadata && componentMetadata.outputs) {
        initialValue.outputs.push(...componentMetadata.outputs.map((i) => ({ propName: i, templateName: i })));
    }
    if (!componentPropsMetadata) {
        return initialValue;
    }
    // Browses component properties to extract I/O
    // Filters properties that have the same name as the one present in the @Component property
    return Object.entries(componentPropsMetadata).reduce((previousValue, [propertyName, values]) => {
        const value = values.find((v) => v instanceof Input || v instanceof Output);
        if (value instanceof Input) {
            const inputToAdd = {
                propName: propertyName,
                templateName: value.bindingPropertyName ?? value.alias ?? propertyName,
            };
            const previousInputsFiltered = previousValue.inputs.filter((i) => i.templateName !== propertyName);
            return {
                ...previousValue,
                inputs: [...previousInputsFiltered, inputToAdd],
            };
        }
        if (value instanceof Output) {
            const outputToAdd = {
                propName: propertyName,
                templateName: value.bindingPropertyName ?? value.alias ?? propertyName,
            };
            const previousOutputsFiltered = previousValue.outputs.filter((i) => i.templateName !== propertyName);
            return {
                ...previousValue,
                outputs: [...previousOutputsFiltered, outputToAdd],
            };
        }
        return previousValue;
    }, initialValue);
};
export const isDeclarable = (component) => {
    if (!component) {
        return false;
    }
    const decorators = reflectionCapabilities.annotations(component);
    return !!(decorators || []).find((d) => d instanceof Directive || d instanceof Pipe || d instanceof Component);
};
export const isComponent = (component) => {
    if (!component) {
        return false;
    }
    const decorators = reflectionCapabilities.annotations(component);
    return (decorators || []).some((d) => d instanceof Component);
};
export const isStandaloneComponent = (component) => {
    if (!component) {
        return false;
    }
    const decorators = reflectionCapabilities.annotations(component);
    // TODO: `standalone` is only available in Angular v14. Remove cast to `any` once
    // Angular deps are updated to v14.x.x.
    return (decorators || []).some((d) => (d instanceof Component || d instanceof Directive || d instanceof Pipe) && d.standalone);
};
/** Returns all component decorator properties is used to get all `@Input` and `@Output` Decorator */
export const getComponentPropsDecoratorMetadata = (component) => {
    return reflectionCapabilities.propMetadata(component);
};
/** Returns component decorator `@Component` */
export const getComponentDecoratorMetadata = (component) => {
    const decorators = reflectionCapabilities.annotations(component);
    return decorators.reverse().find((d) => d instanceof Component);
};
