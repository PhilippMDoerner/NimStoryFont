"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJsonSchemaToOptions = parseJsonSchemaToOptions;
exports.addSchemaOptionsToCommand = addSchemaOptionsToCommand;
const core_1 = require("@angular-devkit/core");
/**
 * A Yargs check function that validates that the given options are in the form of `key=value`.
 * @param keyValuePairOptions A set of options that should be in the form of `key=value`.
 * @param args The parsed arguments.
 * @returns `true` if the options are valid, otherwise an error is thrown.
 */
function checkStringMap(keyValuePairOptions, args) {
    for (const key of keyValuePairOptions) {
        const value = args[key];
        if (!Array.isArray(value)) {
            // Value has been parsed.
            continue;
        }
        for (const pair of value) {
            if (pair === undefined) {
                continue;
            }
            if (!pair.includes('=')) {
                throw new Error(`Invalid value for argument: ${key}, Given: '${pair}', Expected key=value pair`);
            }
        }
    }
    return true;
}
/**
 * A Yargs coerce function that converts an array of `key=value` strings to an object.
 * @param value An array of `key=value` strings.
 * @returns An object with the keys and values from the input array.
 */
function coerceToStringMap(value) {
    const stringMap = {};
    for (const pair of value) {
        // This happens when the flag isn't passed at all.
        if (pair === undefined) {
            continue;
        }
        const eqIdx = pair.indexOf('=');
        if (eqIdx === -1) {
            // In the case it is not valid skip processing this option and handle the error in `checkStringMap`
            return value;
        }
        const key = pair.slice(0, eqIdx);
        stringMap[key] = pair.slice(eqIdx + 1);
    }
    return stringMap;
}
/**
 * Checks if a JSON schema node represents a string map.
 * A string map is an object with `additionalProperties` of type `string`.
 * @param node The JSON schema node to check.
 * @returns `true` if the node represents a string map, otherwise `false`.
 */
function isStringMap(node) {
    // Exclude fields with more specific kinds of properties.
    if (node.properties || node.patternProperties) {
        return false;
    }
    // Restrict to additionalProperties with string values.
    return (core_1.json.isJsonObject(node.additionalProperties) &&
        !node.additionalProperties.enum &&
        node.additionalProperties.type === 'string');
}
const SUPPORTED_PRIMITIVE_TYPES = new Set(['boolean', 'number', 'string']);
/**
 * Checks if a string is a supported primitive type.
 * @param value The string to check.
 * @returns `true` if the string is a supported primitive type, otherwise `false`.
 */
function isSupportedPrimitiveType(value) {
    return SUPPORTED_PRIMITIVE_TYPES.has(value);
}
/**
 * Recursively checks if a JSON schema for an array's items is a supported primitive type.
 * It supports `oneOf` and `anyOf` keywords.
 * @param schema The JSON schema for the array's items.
 * @returns `true` if the schema is a supported primitive type, otherwise `false`.
 */
function isSupportedArrayItemSchema(schema) {
    if (typeof schema.type === 'string' && isSupportedPrimitiveType(schema.type)) {
        return true;
    }
    if (core_1.json.isJsonArray(schema.enum)) {
        return true;
    }
    if (core_1.json.isJsonArray(schema.items)) {
        return schema.items.some((item) => (0, core_1.isJsonObject)(item) && isSupportedArrayItemSchema(item));
    }
    if (core_1.json.isJsonArray(schema.oneOf) &&
        schema.oneOf.some((item) => (0, core_1.isJsonObject)(item) && isSupportedArrayItemSchema(item))) {
        return true;
    }
    if (core_1.json.isJsonArray(schema.anyOf) &&
        schema.anyOf.some((item) => (0, core_1.isJsonObject)(item) && isSupportedArrayItemSchema(item))) {
        return true;
    }
    return false;
}
/**
 * Gets the supported types for a JSON schema node.
 * @param current The JSON schema node to get the supported types for.
 * @returns An array of supported types.
 */
function getSupportedTypes(current) {
    const typeSet = core_1.json.schema.getTypesOfSchema(current);
    if (typeSet.size === 0) {
        return [];
    }
    return [...typeSet].filter((type) => {
        switch (type) {
            case 'boolean':
            case 'number':
            case 'string':
                return true;
            case 'array':
                return (0, core_1.isJsonObject)(current.items) && isSupportedArrayItemSchema(current.items);
            case 'object':
                return isStringMap(current);
            default:
                return false;
        }
    });
}
/**
 * Gets the enum values for a JSON schema node.
 * @param current The JSON schema node to get the enum values for.
 * @returns An array of enum values.
 */
function getEnumValues(current) {
    if (core_1.json.isJsonArray(current.enum)) {
        return current.enum.sort();
    }
    if ((0, core_1.isJsonObject)(current.items)) {
        const enumValues = getEnumValues(current.items);
        if (enumValues?.length) {
            return enumValues;
        }
    }
    if (typeof current.type === 'string' && isSupportedPrimitiveType(current.type)) {
        return [];
    }
    const subSchemas = (core_1.json.isJsonArray(current.oneOf) && current.oneOf) ||
        (core_1.json.isJsonArray(current.anyOf) && current.anyOf);
    if (subSchemas) {
        // Find the first enum.
        for (const subSchema of subSchemas) {
            if ((0, core_1.isJsonObject)(subSchema)) {
                const enumValues = getEnumValues(subSchema);
                if (enumValues) {
                    return enumValues;
                }
            }
        }
    }
    return [];
}
/**
 * Gets the default value for a JSON schema node.
 * @param current The JSON schema node to get the default value for.
 * @param type The type of the JSON schema node.
 * @returns The default value, or `undefined` if there is no default value.
 */
function getDefaultValue(current, type) {
    const defaultValue = current.default;
    if (defaultValue === undefined) {
        return undefined;
    }
    if (type === 'array') {
        return Array.isArray(defaultValue) && defaultValue.length > 0 ? defaultValue : undefined;
    }
    if (typeof defaultValue === type) {
        return defaultValue;
    }
    return undefined;
}
/**
 * Gets the aliases for a JSON schema node.
 * @param current The JSON schema node to get the aliases for.
 * @returns An array of aliases.
 */
function getAliases(current) {
    if (core_1.json.isJsonArray(current.aliases)) {
        return [...current.aliases].map(String);
    }
    if (current.alias) {
        return [String(current.alias)];
    }
    return [];
}
/**
 * Parses a JSON schema to a list of options that can be used by yargs.
 *
 * @param registry A schema registry to use for flattening the schema.
 * @param schema The JSON schema to parse.
 * @param interactive Whether to prompt the user for missing options.
 * @returns A list of options.
 *
 * @note The schema definition are not resolved at this stage. This means that `$ref` will not be resolved,
 * and custom keywords like `x-prompt` will not be processed.
 */
async function parseJsonSchemaToOptions(registry, schema, interactive = true) {
    const options = [];
    function visitor(current, pointer, parentSchema) {
        if (!parentSchema ||
            core_1.json.isJsonArray(current) ||
            pointer.split(/\/(?:properties|items|definitions)\//g).length > 2) {
            // Ignore root, arrays, and subitems.
            return;
        }
        if (pointer.includes('/not/')) {
            // We don't support anyOf/not.
            throw new Error('The "not" keyword is not supported in JSON Schema.');
        }
        const ptr = core_1.json.schema.parseJsonPointer(pointer);
        if (ptr[ptr.length - 2] !== 'properties') {
            // Skip any non-property items.
            return;
        }
        const name = ptr.at(-1);
        const types = getSupportedTypes(current);
        if (types.length === 0) {
            // This means it's not usable on the command line. e.g. an Object.
            return;
        }
        const [type] = types;
        const $default = current.$default;
        const $defaultIndex = (0, core_1.isJsonObject)($default) && $default['$source'] === 'argv' ? $default['index'] : undefined;
        const positional = typeof $defaultIndex === 'number' ? $defaultIndex : undefined;
        let required = core_1.json.isJsonArray(schema.required) && schema.required.includes(name);
        if (required && interactive && current['x-prompt']) {
            required = false;
        }
        const visible = current.visible !== false;
        const xDeprecated = current['x-deprecated'];
        const enumValues = getEnumValues(current);
        const option = {
            name,
            description: String(current.description ?? ''),
            default: getDefaultValue(current, type),
            choices: enumValues?.length ? enumValues : undefined,
            required,
            alias: getAliases(current),
            format: typeof current.format === 'string' ? current.format : undefined,
            hidden: !!current.hidden || !visible,
            userAnalytics: typeof current['x-user-analytics'] === 'string' ? current['x-user-analytics'] : undefined,
            deprecated: xDeprecated === true || typeof xDeprecated === 'string' ? xDeprecated : undefined,
            positional,
            ...(type === 'object'
                ? {
                    type: 'array',
                    itemValueType: 'string',
                }
                : {
                    type,
                }),
        };
        options.push(option);
    }
    const flattenedSchema = await registry.ɵflatten(schema);
    core_1.json.schema.visitJsonSchema(flattenedSchema, visitor);
    // Sort by positional and name.
    return options.sort((a, b) => {
        if (a.positional) {
            return b.positional ? a.positional - b.positional : a.name.localeCompare(b.name);
        }
        else if (b.positional) {
            return -1;
        }
        return a.name.localeCompare(b.name);
    });
}
/**
 * Adds schema options to a command also this keeps track of options that are required for analytics.
 * **Note:** This method should be called from the command bundler method.
 *
 * @returns A map from option name to analytics configuration.
 */
function addSchemaOptionsToCommand(localYargs, options, includeDefaultValues) {
    const booleanOptionsWithNoPrefix = new Set();
    const keyValuePairOptions = new Set();
    const optionsWithAnalytics = new Map();
    for (const option of options) {
        const { default: defaultVal, positional, deprecated, description, alias, userAnalytics, type, itemValueType, hidden, name, choices, } = option;
        let dashedName = core_1.strings.dasherize(name);
        // Handle options which have been defined in the schema with `no` prefix.
        if (type === 'boolean' && dashedName.startsWith('no-')) {
            dashedName = dashedName.slice(3);
            booleanOptionsWithNoPrefix.add(dashedName);
        }
        if (itemValueType) {
            keyValuePairOptions.add(dashedName);
        }
        const sharedOptions = {
            alias,
            hidden,
            description,
            deprecated,
            choices,
            coerce: itemValueType ? coerceToStringMap : undefined,
            // This should only be done when `--help` is used otherwise default will override options set in angular.json.
            ...(includeDefaultValues ? { default: defaultVal } : {}),
        };
        if (positional === undefined) {
            localYargs = localYargs.option(dashedName, {
                array: itemValueType ? true : undefined,
                type: itemValueType ?? type,
                ...sharedOptions,
            });
        }
        else {
            localYargs = localYargs.positional(dashedName, {
                type: type === 'array' || type === 'count' ? 'string' : type,
                ...sharedOptions,
            });
        }
        // Record option of analytics.
        if (userAnalytics !== undefined) {
            optionsWithAnalytics.set(name, userAnalytics);
        }
    }
    // Valid key/value options
    if (keyValuePairOptions.size) {
        localYargs.check(checkStringMap.bind(null, keyValuePairOptions), false);
    }
    // Handle options which have been defined in the schema with `no` prefix.
    if (booleanOptionsWithNoPrefix.size) {
        localYargs.middleware((options) => {
            for (const key of booleanOptionsWithNoPrefix) {
                if (key in options) {
                    options[`no-${key}`] = !options[key];
                    delete options[key];
                }
            }
        }, false);
    }
    return optionsWithAnalytics;
}
//# sourceMappingURL=json-schema.js.map