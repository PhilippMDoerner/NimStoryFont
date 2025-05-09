"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentDecoratorMetadata = exports.getComponentPropsDecoratorMetadata = exports.isStandaloneComponent = exports.isComponent = exports.isDeclarable = exports.getComponentInputsOutputs = void 0;
const core_1 = require("@angular/core");
const reflectionCapabilities = new core_1.ɵReflectionCapabilities();
/** Returns component Inputs / Outputs by browsing these properties and decorator */
const getComponentInputsOutputs = (component) => {
    const componentMetadata = (0, exports.getComponentDecoratorMetadata)(component);
    const componentPropsMetadata = (0, exports.getComponentPropsDecoratorMetadata)(component);
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
        const value = values.find((v) => v instanceof core_1.Input || v instanceof core_1.Output);
        if (value instanceof core_1.Input) {
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
        if (value instanceof core_1.Output) {
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
exports.getComponentInputsOutputs = getComponentInputsOutputs;
const isDeclarable = (component) => {
    if (!component) {
        return false;
    }
    const decorators = reflectionCapabilities.annotations(component);
    return !!(decorators || []).find((d) => d instanceof core_1.Directive || d instanceof core_1.Pipe || d instanceof core_1.Component);
};
exports.isDeclarable = isDeclarable;
const isComponent = (component) => {
    if (!component) {
        return false;
    }
    const decorators = reflectionCapabilities.annotations(component);
    return (decorators || []).some((d) => d instanceof core_1.Component);
};
exports.isComponent = isComponent;
const isStandaloneComponent = (component) => {
    if (!component) {
        return false;
    }
    const decorators = reflectionCapabilities.annotations(component);
    // TODO: `standalone` is only available in Angular v14. Remove cast to `any` once
    // Angular deps are updated to v14.x.x.
    return (decorators || []).some((d) => (d instanceof core_1.Component || d instanceof core_1.Directive || d instanceof core_1.Pipe) && d.standalone);
};
exports.isStandaloneComponent = isStandaloneComponent;
/** Returns all component decorator properties is used to get all `@Input` and `@Output` Decorator */
const getComponentPropsDecoratorMetadata = (component) => {
    return reflectionCapabilities.propMetadata(component);
};
exports.getComponentPropsDecoratorMetadata = getComponentPropsDecoratorMetadata;
/** Returns component decorator `@Component` */
const getComponentDecoratorMetadata = (component) => {
    const decorators = reflectionCapabilities.annotations(component);
    return decorators.reverse().find((d) => d instanceof core_1.Component);
};
exports.getComponentDecoratorMetadata = getComponentDecoratorMetadata;
