import { logger } from 'storybook/internal/client-logger';
import { global } from '@storybook/global';
const { FEATURES } = global;
export const isMethod = (methodOrProp) => {
    return methodOrProp.args !== undefined;
};
export const setCompodocJson = (compodocJson) => {
    global.__STORYBOOK_COMPODOC_JSON__ = compodocJson;
};
export const getCompodocJson = () => global.__STORYBOOK_COMPODOC_JSON__;
export const checkValidComponentOrDirective = (component) => {
    if (!component.name) {
        throw new Error(`Invalid component ${JSON.stringify(component)}`);
    }
};
export const checkValidCompodocJson = (compodocJson) => {
    if (!compodocJson || !compodocJson.components) {
        throw new Error('Invalid compodoc JSON');
    }
};
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
            if (isMethod(item)) {
                throw new Error("Cannot be of type Method if key === 'propertiesClass'");
            }
            return mapPropertyToSection(item);
        default:
            throw new Error(`Unknown key: ${key}`);
    }
};
export const findComponentByName = (name, compodocJson) => compodocJson.components.find((c) => c.name === name) ||
    compodocJson.directives.find((c) => c.name === name) ||
    compodocJson.pipes.find((c) => c.name === name) ||
    compodocJson.injectables.find((c) => c.name === name) ||
    compodocJson.classes.find((c) => c.name === name);
const getComponentData = (component) => {
    if (!component) {
        return null;
    }
    checkValidComponentOrDirective(component);
    const compodocJson = getCompodocJson();
    if (!compodocJson) {
        return null;
    }
    checkValidCompodocJson(compodocJson);
    const { name } = component;
    const metadata = findComponentByName(name, compodocJson);
    if (!metadata) {
        logger.warn(`Component not found in compodoc JSON: '${name}'`);
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
    const compodocJson = getCompodocJson();
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
export const extractType = (property, defaultValue) => {
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
            const dom = new global.DOMParser().parseFromString(tag.comment, 'text/html');
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
        logger.debug(`Error extracting ${property.name}: ${property.defaultValue}`);
        return undefined;
    }
};
const resolveTypealias = (compodocType) => {
    const compodocJson = getCompodocJson();
    const typeAlias = compodocJson?.miscellaneous?.typealiases?.find((x) => x.name === compodocType);
    return typeAlias ? resolveTypealias(typeAlias.rawtype) : compodocType;
};
export const extractArgTypesFromData = (componentData) => {
    const sectionToItems = {};
    const componentClasses = FEATURES.angularFilterNonInputControls
        ? ['inputsClass']
        : ['propertiesClass', 'methodsClass', 'inputsClass', 'outputsClass'];
    const compodocClasses = ['component', 'directive'].includes(componentData.type)
        ? componentClasses
        : ['properties', 'methods'];
    compodocClasses.forEach((key) => {
        const data = componentData[key] || [];
        data.forEach((item) => {
            const section = mapItemToSection(key, item);
            const defaultValue = isMethod(item) ? undefined : extractDefaultValue(item);
            const type = isMethod(item) || (section !== 'inputs' && section !== 'properties')
                ? { name: 'other', value: 'void' }
                : extractType(item, defaultValue);
            const action = section === 'outputs' ? { action: item.name } : {};
            const argType = {
                name: item.name,
                description: item.rawdescription || item.description,
                type,
                ...action,
                table: {
                    category: section,
                    type: {
                        summary: isMethod(item) ? displaySignature(item) : item.type,
                        required: isMethod(item) ? false : !item.optional,
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
export const extractArgTypes = (component) => {
    const componentData = getComponentData(component);
    return componentData && extractArgTypesFromData(componentData);
};
export const extractComponentDescription = (component) => {
    const componentData = getComponentData(component);
    return componentData && (componentData.rawdescription || componentData.description);
};
