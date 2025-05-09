"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractComponentDescription = exports.extractArgTypes = exports.extractArgTypesFromData = exports.extractType = exports.findComponentByName = exports.checkValidCompodocJson = exports.checkValidComponentOrDirective = exports.getCompodocJson = exports.setCompodocJson = exports.isMethod = void 0;
/* eslint-disable no-underscore-dangle */
const client_logger_1 = require("storybook/internal/client-logger");
const global_1 = require("@storybook/global");
const isMethod = (methodOrProp) => {
    return methodOrProp.args !== undefined;
};
exports.isMethod = isMethod;
const setCompodocJson = (compodocJson) => {
    global_1.global.__STORYBOOK_COMPODOC_JSON__ = compodocJson;
};
exports.setCompodocJson = setCompodocJson;
const getCompodocJson = () => global_1.global.__STORYBOOK_COMPODOC_JSON__;
exports.getCompodocJson = getCompodocJson;
const checkValidComponentOrDirective = (component) => {
    if (!component.name) {
        throw new Error(`Invalid component ${JSON.stringify(component)}`);
    }
};
exports.checkValidComponentOrDirective = checkValidComponentOrDirective;
const checkValidCompodocJson = (compodocJson) => {
    if (!compodocJson || !compodocJson.components) {
        throw new Error('Invalid compodoc JSON');
    }
};
exports.checkValidCompodocJson = checkValidCompodocJson;
const hasDecorator = (item, decoratorName) => item.decorators && item.decorators.find((x) => x.name === decoratorName);
const mapPropertyToSection = (item) => {
    if (hasDecorator(item, 'ViewChild')) {
        return 'view child';
    }
    if (hasDecorator(item, 'ViewChildren')) {
        return 'view children';
    }
    if (hasDecorator(item, 'ContentChild')) {
        return 'content child';
    }
    if (hasDecorator(item, 'ContentChildren')) {
        return 'content children';
    }
    return 'properties';
};
const mapItemToSection = (key, item) => {
    switch (key) {
        case 'methods':
        case 'methodsClass':
            return 'methods';
        case 'inputsClass':
            return 'inputs';
        case 'outputsClass':
            return 'outputs';
        case 'properties':
        case 'propertiesClass':
            if ((0, exports.isMethod)(item)) {
                throw new Error("Cannot be of type Method if key === 'propertiesClass'");
            }
            return mapPropertyToSection(item);
        default:
            throw new Error(`Unknown key: ${key}`);
    }
};
const findComponentByName = (name, compodocJson) => compodocJson.components.find((c) => c.name === name) ||
    compodocJson.directives.find((c) => c.name === name) ||
    compodocJson.pipes.find((c) => c.name === name) ||
    compodocJson.injectables.find((c) => c.name === name) ||
    compodocJson.classes.find((c) => c.name === name);
exports.findComponentByName = findComponentByName;
const getComponentData = (component) => {
    if (!component) {
        return null;
    }
    (0, exports.checkValidComponentOrDirective)(component);
    const compodocJson = (0, exports.getCompodocJson)();
    if (!compodocJson) {
        return null;
    }
    (0, exports.checkValidCompodocJson)(compodocJson);
    const { name } = component;
    const metadata = (0, exports.findComponentByName)(name, compodocJson);
    if (!metadata) {
        client_logger_1.logger.warn(`Component not found in compodoc JSON: '${name}'`);
    }
    return metadata;
};
const displaySignature = (item) => {
    const args = item.args.map((arg) => `${arg.name}${arg.optional ? '?' : ''}: ${arg.type}`);
    return `(${args.join(', ')}) => ${item.returnType}`;
};
const extractTypeFromValue = (defaultValue) => {
    const valueType = typeof defaultValue;
    return defaultValue || valueType === 'number' || valueType === 'boolean' || valueType === 'string'
        ? valueType
        : null;
};
const extractEnumValues = (compodocType) => {
    const compodocJson = (0, exports.getCompodocJson)();
    const enumType = compodocJson?.miscellaneous?.enumerations?.find((x) => x.name === compodocType);
    if (enumType?.childs.every((x) => x.value)) {
        return enumType.childs.map((x) => x.value);
    }
    if (typeof compodocType !== 'string' || compodocType.indexOf('|') === -1) {
        return null;
    }
    try {
        return compodocType.split('|').map((value) => JSON.parse(value));
    }
    catch (e) {
        return null;
    }
};
const extractType = (property, defaultValue) => {
    const compodocType = property.type || extractTypeFromValue(defaultValue);
    switch (compodocType) {
        case 'string':
        case 'boolean':
        case 'number':
            return { name: compodocType };
        case undefined:
        case null:
            return { name: 'other', value: 'void' };
        default: {
            const resolvedType = resolveTypealias(compodocType);
            const enumValues = extractEnumValues(resolvedType);
            return enumValues
                ? { name: 'enum', value: enumValues }
                : { name: 'other', value: 'empty-enum' };
        }
    }
};
exports.extractType = extractType;
const castDefaultValue = (property, defaultValue) => {
    const compodocType = property.type;
    // All these checks are necessary as compodoc does not always set the type ie. @HostBinding have empty types.
    // null and undefined also have 'any' type
    if (['boolean', 'number', 'string', 'EventEmitter'].includes(compodocType)) {
        switch (compodocType) {
            case 'boolean':
                return defaultValue === 'true';
            case 'number':
                return Number(defaultValue);
            case 'EventEmitter':
                return undefined;
            default:
                return defaultValue;
        }
    }
    else {
        switch (defaultValue) {
            case 'true':
                return true;
            case 'false':
                return false;
            case 'null':
                return null;
            case 'undefined':
                return undefined;
            default:
                return defaultValue;
        }
    }
};
const extractDefaultValueFromComments = (property, value) => {
    let commentValue = value;
    property.jsdoctags.forEach((tag) => {
        if (['default', 'defaultvalue'].includes(tag.tagName.escapedText)) {
            const dom = new global_1.global.DOMParser().parseFromString(tag.comment, 'text/html');
            commentValue = dom.body.textContent;
        }
    });
    return commentValue;
};
const extractDefaultValue = (property) => {
    try {
        let value = property.defaultValue?.replace(/^'(.*)'$/, '$1');
        value = castDefaultValue(property, value);
        if (value == null && property.jsdoctags?.length > 0) {
            value = extractDefaultValueFromComments(property, value);
        }
        return value;
    }
    catch (err) {
        client_logger_1.logger.debug(`Error extracting ${property.name}: ${property.defaultValue}`);
        return undefined;
    }
};
const resolveTypealias = (compodocType) => {
    const compodocJson = (0, exports.getCompodocJson)();
    const typeAlias = compodocJson?.miscellaneous?.typealiases?.find((x) => x.name === compodocType);
    return typeAlias ? resolveTypealias(typeAlias.rawtype) : compodocType;
};
const extractArgTypesFromData = (componentData) => {
    const sectionToItems = {};
    const compodocClasses = ['component', 'directive'].includes(componentData.type)
        ? ['propertiesClass', 'methodsClass', 'inputsClass', 'outputsClass']
        : ['properties', 'methods'];
    compodocClasses.forEach((key) => {
        const data = componentData[key] || [];
        data.forEach((item) => {
            const section = mapItemToSection(key, item);
            const defaultValue = (0, exports.isMethod)(item) ? undefined : extractDefaultValue(item);
            const type = (0, exports.isMethod)(item) || (section !== 'inputs' && section !== 'properties')
                ? { name: 'other', value: 'void' }
                : (0, exports.extractType)(item, defaultValue);
            const action = section === 'outputs' ? { action: item.name } : {};
            const argType = {
                name: item.name,
                description: item.rawdescription || item.description,
                type,
                ...action,
                table: {
                    category: section,
                    type: {
                        summary: (0, exports.isMethod)(item) ? displaySignature(item) : item.type,
                        required: (0, exports.isMethod)(item) ? false : !item.optional,
                    },
                    defaultValue: { summary: defaultValue },
                },
            };
            if (!sectionToItems[section]) {
                sectionToItems[section] = [];
            }
            sectionToItems[section].push(argType);
        });
    });
    const SECTIONS = [
        'properties',
        'inputs',
        'outputs',
        'methods',
        'view child',
        'view children',
        'content child',
        'content children',
    ];
    const argTypes = {};
    SECTIONS.forEach((section) => {
        const items = sectionToItems[section];
        if (items) {
            items.forEach((argType) => {
                argTypes[argType.name] = argType;
            });
        }
    });
    return argTypes;
};
exports.extractArgTypesFromData = extractArgTypesFromData;
const extractArgTypes = (component) => {
    const componentData = getComponentData(component);
    return componentData && (0, exports.extractArgTypesFromData)(componentData);
};
exports.extractArgTypes = extractArgTypes;
const extractComponentDescription = (component) => {
    const componentData = getComponentData(component);
    return componentData && (componentData.rawdescription || componentData.description);
};
exports.extractComponentDescription = extractComponentDescription;
