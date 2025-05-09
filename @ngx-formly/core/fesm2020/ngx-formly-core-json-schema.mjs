import * as i0 from '@angular/core';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ɵhasKey, ɵgetFieldValue, ɵclone, ɵreverseDeepMerge } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';

// https://stackoverflow.com/a/27865285
function decimalPlaces(a) {
    if (!isFinite(a)) {
        return 0;
    }
    let e = 1, p = 0;
    while (Math.round(a * e) / e !== a) {
        e *= 10;
        p++;
    }
    return p;
}
function isEmpty(v) {
    return v === '' || v == null;
}
function isObject(v) {
    return v != null && typeof v === 'object' && !Array.isArray(v);
}
function isInteger(value) {
    return Number.isInteger ? Number.isInteger(value) : typeof value === 'number' && Math.floor(value) === value;
}
function isConst(schema) {
    return typeof schema === 'object' && (schema.hasOwnProperty('const') || (schema.enum && schema.enum.length === 1));
}
function toNumber(value) {
    if (value === '' || value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    if (typeof value === 'number') {
        return value;
    }
    const val = parseFloat(value);
    return !isNaN(val) ? val : value;
}
function totalMatchedFields(field) {
    if (!field.fieldGroup) {
        return ɵhasKey(field) && ɵgetFieldValue(field) !== undefined ? 1 : 0;
    }
    const total = field.fieldGroup.reduce((s, f) => totalMatchedFields(f) + s, 0);
    if (total === 0 && ɵhasKey(field)) {
        const value = ɵgetFieldValue(field);
        if (value === null ||
            (value !== undefined && ((field.fieldArray && Array.isArray(value)) || (!field.fieldArray && isObject(value))))) {
            return 1;
        }
    }
    return total;
}
class FormlyJsonschema {
    toFieldConfig(schema, options) {
        schema = ɵclone(schema);
        return this._toFieldConfig(schema, { schema, ...(options || {}) });
    }
    _toFieldConfig(schema, { key, isOptional, ...options }) {
        schema = this.resolveSchema(schema, options);
        const types = this.guessSchemaType(schema);
        let field = {
            type: types[0],
            defaultValue: schema.default,
            props: {
                label: schema.title,
                readonly: schema.readOnly,
                description: schema.description,
            },
        };
        if (key != null) {
            field.key = key;
        }
        if (!options.ignoreDefault && (schema.readOnly || options.readOnly)) {
            field.props.disabled = true;
            options = { ...options, readOnly: true };
        }
        if (options.resetOnHide) {
            field.resetOnHide = true;
        }
        if (options.shareFormControl === false) {
            field.shareFormControl = false;
        }
        if (field.defaultValue === undefined && types.length === 1 && isOptional === false) {
            switch (types[0]) {
                case 'null': {
                    field.defaultValue = null;
                    break;
                }
                case 'string': {
                    field.defaultValue = '';
                    break;
                }
                case 'object': {
                    field.defaultValue = {};
                    break;
                }
                case 'array': {
                    field.defaultValue = schema.minItems > 0 ? Array.from(new Array(schema.minItems)) : [];
                    break;
                }
            }
        }
        if (options.ignoreDefault) {
            delete field.defaultValue;
        }
        this.addValidator(field, 'type', {
            schemaType: types,
            expression: ({ value }) => {
                if (value === undefined) {
                    return true;
                }
                if (value === null && types.indexOf('null') !== -1) {
                    return true;
                }
                switch (types[0]) {
                    case 'null': {
                        return typeof value === null;
                    }
                    case 'string': {
                        return typeof value === 'string';
                    }
                    case 'integer': {
                        return isInteger(value);
                    }
                    case 'number': {
                        return typeof value === 'number';
                    }
                    case 'object': {
                        return isObject(value);
                    }
                    case 'array': {
                        return Array.isArray(value);
                    }
                }
                return true;
            },
        });
        switch (field.type) {
            case 'number':
            case 'integer': {
                field.parsers = [
                    (v, f) => {
                        v = toNumber(v);
                        if (v === null && f) {
                            const input = typeof document !== 'undefined' && f.id
                                ? document.querySelector(`#${f.id}`)
                                : undefined;
                            if (input && !input.validity.badInput) {
                                v = undefined;
                            }
                            if (v !== f.formControl.value) {
                                f.formControl.setValue(v, { emitModelToViewChange: false });
                            }
                        }
                        return v;
                    },
                ];
                if (schema.hasOwnProperty('minimum')) {
                    field.props.min = schema.minimum;
                }
                if (schema.hasOwnProperty('maximum')) {
                    field.props.max = schema.maximum;
                }
                if (schema.hasOwnProperty('exclusiveMinimum')) {
                    field.props.exclusiveMinimum = schema.exclusiveMinimum;
                    this.addValidator(field, 'exclusiveMinimum', ({ value }) => isEmpty(value) || value > schema.exclusiveMinimum);
                }
                if (schema.hasOwnProperty('exclusiveMaximum')) {
                    field.props.exclusiveMaximum = schema.exclusiveMaximum;
                    this.addValidator(field, 'exclusiveMaximum', ({ value }) => isEmpty(value) || value < schema.exclusiveMaximum);
                }
                if (schema.hasOwnProperty('multipleOf')) {
                    field.props.step = schema.multipleOf;
                    this.addValidator(field, 'multipleOf', ({ value }) => {
                        if (isEmpty(value) || typeof value !== 'number' || value === 0 || schema.multipleOf <= 0) {
                            return true;
                        }
                        // https://github.com/ajv-validator/ajv/issues/652#issue-283610859
                        const multiplier = Math.pow(10, decimalPlaces(schema.multipleOf));
                        return Math.round(value * multiplier) % Math.round(schema.multipleOf * multiplier) === 0;
                    });
                }
                break;
            }
            case 'string': {
                field.parsers = [
                    (v, f) => {
                        if (types.indexOf('null') !== -1) {
                            v = isEmpty(v) ? null : v;
                        }
                        else if (f && !f.props.required) {
                            v = v === '' ? undefined : v;
                        }
                        return v;
                    },
                ];
                ['minLength', 'maxLength', 'pattern'].forEach((prop) => {
                    if (schema.hasOwnProperty(prop)) {
                        field.props[prop] = schema[prop];
                    }
                });
                break;
            }
            case 'object': {
                if (!field.fieldGroup) {
                    field.fieldGroup = [];
                }
                const { propDeps, schemaDeps } = this.resolveDependencies(schema);
                Object.keys(schema.properties || {}).forEach((property) => {
                    const isRequired = Array.isArray(schema.required) && schema.required.indexOf(property) !== -1;
                    const f = this._toFieldConfig(schema.properties[property], {
                        ...options,
                        key: property,
                        isOptional: isOptional || !isRequired,
                    });
                    field.fieldGroup.push(f);
                    if (isRequired || propDeps[property]) {
                        f.expressions = {
                            ...(f.expressions || {}),
                            'props.required': (f) => {
                                let parent = f.parent;
                                const model = f.fieldGroup && f.key != null ? parent.model : f.model;
                                while (parent.key == null && parent.parent) {
                                    parent = parent.parent;
                                }
                                const required = parent && parent.props ? parent.props.required : false;
                                if (!model && !required) {
                                    return false;
                                }
                                if (Array.isArray(schema.required) && schema.required.indexOf(property) !== -1) {
                                    return true;
                                }
                                return propDeps[property] && f.model && propDeps[property].some((k) => !isEmpty(f.model[k]));
                            },
                        };
                    }
                    if (schemaDeps[property]) {
                        const getConstValue = (s) => {
                            return s.hasOwnProperty('const') ? s.const : s.enum[0];
                        };
                        const oneOfSchema = schemaDeps[property].oneOf;
                        if (oneOfSchema &&
                            oneOfSchema.every((o) => o.properties && o.properties[property] && isConst(o.properties[property]))) {
                            oneOfSchema.forEach((oneOfSchemaItem) => {
                                const { [property]: constSchema, ...properties } = oneOfSchemaItem.properties;
                                field.fieldGroup.push({
                                    ...this._toFieldConfig({ ...oneOfSchemaItem, properties }, { ...options, shareFormControl: false, resetOnHide: true }),
                                    expressions: {
                                        hide: (f) => !f.model || getConstValue(constSchema) !== f.model[property],
                                    },
                                });
                            });
                        }
                        else {
                            field.fieldGroup.push({
                                ...this._toFieldConfig(schemaDeps[property], options),
                                expressions: {
                                    hide: (f) => !f.model || isEmpty(f.model[property]),
                                },
                            });
                        }
                    }
                });
                if (schema.oneOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('oneOf', schema.oneOf, { ...options, shareFormControl: false }));
                }
                if (schema.anyOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('anyOf', schema.anyOf, options));
                }
                break;
            }
            case 'array': {
                if (schema.hasOwnProperty('minItems')) {
                    field.props.minItems = schema.minItems;
                    this.addValidator(field, 'minItems', ({ value }) => {
                        return isEmpty(value) || value.length >= schema.minItems;
                    });
                    if (!isOptional && schema.minItems > 0 && field.defaultValue === undefined) {
                        field.defaultValue = Array.from(new Array(schema.minItems));
                    }
                }
                if (schema.hasOwnProperty('maxItems')) {
                    field.props.maxItems = schema.maxItems;
                    this.addValidator(field, 'maxItems', ({ value }) => {
                        return isEmpty(value) || value.length <= schema.maxItems;
                    });
                }
                if (schema.hasOwnProperty('uniqueItems')) {
                    field.props.uniqueItems = schema.uniqueItems;
                    this.addValidator(field, 'uniqueItems', ({ value }) => {
                        if (isEmpty(value) || !schema.uniqueItems) {
                            return true;
                        }
                        const uniqueItems = Array.from(new Set(value.map((v) => JSON.stringify(v, (k, o) => {
                            if (isObject(o)) {
                                return Object.keys(o)
                                    .sort()
                                    .reduce((obj, key) => {
                                    obj[key] = o[key];
                                    return obj;
                                }, {});
                            }
                            return o;
                        }))));
                        return uniqueItems.length === value.length;
                    });
                }
                // resolve items schema needed for isEnum check
                if (schema.items && !Array.isArray(schema.items)) {
                    schema.items = this.resolveSchema(schema.items, options);
                }
                // TODO: remove isEnum check once adding an option to skip extension
                if (!this.isEnum(schema)) {
                    field.fieldArray = (root) => {
                        const length = root.fieldGroup ? root.fieldGroup.length : 0;
                        const items = schema.items;
                        if (!Array.isArray(items)) {
                            if (!items) {
                                return {};
                            }
                            const isMultiSchema = items.oneOf || items.anyOf;
                            // When items is a single schema, the additionalItems keyword is meaningless, and it should not be used.
                            const f = this._toFieldConfig(items, isMultiSchema ? { ...options, key: `${length}`, isOptional: false } : { ...options, isOptional: false });
                            if (isMultiSchema && !ɵhasKey(f)) {
                                f.key = null;
                            }
                            return f;
                        }
                        const itemSchema = items[length] ? items[length] : schema.additionalItems;
                        const f = itemSchema ? this._toFieldConfig(itemSchema, options) : {};
                        if (f.props) {
                            f.props.required = true;
                        }
                        if (items[length]) {
                            f.props.removable = false;
                        }
                        return f;
                    };
                }
                break;
            }
        }
        if (schema.hasOwnProperty('const')) {
            field.props.const = schema.const;
            this.addValidator(field, 'const', ({ value }) => value === schema.const);
            if (!field.type) {
                field.defaultValue = schema.const;
            }
        }
        if (this.isEnum(schema)) {
            const enumOptions = this.toEnumOptions(schema);
            const multiple = field.type === 'array';
            field.type = 'enum';
            field.props.multiple = multiple;
            field.props.options = enumOptions;
            const enumValues = enumOptions.map((o) => o.value);
            this.addValidator(field, 'enum', ({ value }) => {
                if (value === undefined) {
                    return true;
                }
                if (multiple) {
                    return Array.isArray(value) ? value.every((o) => enumValues.includes(o)) : false;
                }
                return enumValues.includes(value);
            });
        }
        if (schema.oneOf && !field.type) {
            delete field.key;
            field.fieldGroup = [
                this.resolveMultiSchema('oneOf', schema.oneOf, { ...options, key, shareFormControl: false }),
            ];
        }
        if (schema.anyOf && !field.type) {
            delete field.key;
            field.fieldGroup = [
                this.resolveMultiSchema('oneOf', schema.anyOf, { ...options, key, shareFormControl: false }),
            ];
        }
        // map in possible formlyConfig options from the widget property
        if (schema.widget?.formlyConfig) {
            field = this.mergeFields(field, schema.widget.formlyConfig);
        }
        field.templateOptions = field.props;
        // if there is a map function passed in, use it to allow the user to
        // further customize how fields are being mapped
        return options.map ? options.map(field, schema) : field;
    }
    resolveSchema(schema, options) {
        if (schema && schema.$ref) {
            schema = this.resolveDefinition(schema, options);
        }
        if (schema && schema.allOf) {
            schema = this.resolveAllOf(schema, options);
        }
        return schema;
    }
    resolveAllOf({ allOf, ...baseSchema }, options) {
        if (!allOf.length) {
            throw Error(`allOf array can not be empty ${allOf}.`);
        }
        return allOf.reduce((base, schema) => {
            schema = this.resolveSchema(schema, options);
            if (base.required && schema.required) {
                base.required = [...base.required, ...schema.required];
            }
            if (schema.uniqueItems) {
                base.uniqueItems = schema.uniqueItems;
            }
            // resolve to min value
            ['maxLength', 'maximum', 'exclusiveMaximum', 'maxItems', 'maxProperties'].forEach((prop) => {
                if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
                    base[prop] = base[prop] < schema[prop] ? base[prop] : schema[prop];
                }
            });
            // resolve to max value
            ['minLength', 'minimum', 'exclusiveMinimum', 'minItems', 'minProperties'].forEach((prop) => {
                if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
                    base[prop] = base[prop] > schema[prop] ? base[prop] : schema[prop];
                }
            });
            return ɵreverseDeepMerge(base, schema);
        }, baseSchema);
    }
    resolveMultiSchema(mode, schemas, options) {
        return {
            type: 'multischema',
            fieldGroup: [
                {
                    type: 'enum',
                    defaultValue: -1,
                    props: {
                        multiple: mode === 'anyOf',
                        options: schemas.map((s, i) => ({ label: s.title, value: i, disabled: s.readOnly })),
                    },
                    hooks: {
                        onInit: (f) => f.formControl.valueChanges.pipe(tap(() => f.options.detectChanges(f.parent))),
                    },
                },
                {
                    fieldGroup: schemas.map((s, i) => ({
                        ...this._toFieldConfig(s, { ...options, resetOnHide: true }),
                        expressions: {
                            hide: (f, forceUpdate) => {
                                const control = f.parent.parent.fieldGroup[0].formControl;
                                if (control.value === -1 || forceUpdate) {
                                    let value = f.parent.fieldGroup
                                        .map((f, i) => [f, i, this.isFieldValid(f, i, schemas, options)])
                                        .sort(([f1, , f1Valid], [f2, , f2Valid]) => {
                                        if (f1Valid !== f2Valid) {
                                            return f2Valid ? 1 : -1;
                                        }
                                        const matchedFields1 = totalMatchedFields(f1);
                                        const matchedFields2 = totalMatchedFields(f2);
                                        if (matchedFields1 === matchedFields2) {
                                            if (f1.props.disabled === f2.props.disabled) {
                                                return 0;
                                            }
                                            return matchedFields2 > matchedFields1 ? 1 : -1;
                                        }
                                        return matchedFields2 > matchedFields1 ? 1 : -1;
                                    })
                                        .map(([, i]) => i);
                                    if (mode === 'anyOf') {
                                        const definedValue = value.filter((i) => totalMatchedFields(f.parent.fieldGroup[i]));
                                        value = definedValue.length > 0 ? definedValue : [value[0] || 0];
                                    }
                                    value = value.length > 0 ? value : [0];
                                    control.setValue(mode === 'anyOf' ? value : value[0]);
                                }
                                return Array.isArray(control.value) ? control.value.indexOf(i) === -1 : control.value !== i;
                            },
                        },
                    })),
                },
            ],
        };
    }
    resolveDefinition(schema, options) {
        const [uri, pointer] = schema.$ref.split('#/');
        if (uri) {
            throw Error(`Remote schemas for ${schema.$ref} not supported yet.`);
        }
        const definition = !pointer
            ? null
            : pointer
                .split('/')
                .reduce((def, path) => (def?.hasOwnProperty(path) ? def[path] : null), options.schema);
        if (!definition) {
            throw Error(`Cannot find a definition for ${schema.$ref}.`);
        }
        if (definition.$ref) {
            return this.resolveDefinition(definition, options);
        }
        return {
            ...definition,
            ...['title', 'description', 'default', 'widget'].reduce((annotation, p) => {
                if (schema.hasOwnProperty(p)) {
                    annotation[p] = schema[p];
                }
                return annotation;
            }, {}),
        };
    }
    resolveDependencies(schema) {
        const propDeps = {};
        const schemaDeps = {};
        Object.keys(schema.dependencies || {}).forEach((prop) => {
            const dependency = schema.dependencies[prop];
            if (Array.isArray(dependency)) {
                // Property dependencies
                dependency.forEach((dep) => {
                    if (!propDeps[dep]) {
                        propDeps[dep] = [prop];
                    }
                    else {
                        propDeps[dep].push(prop);
                    }
                });
            }
            else {
                // schema dependencies
                schemaDeps[prop] = dependency;
            }
        });
        return { propDeps, schemaDeps };
    }
    guessSchemaType(schema) {
        const type = schema?.type;
        if (!type && schema?.properties) {
            return ['object'];
        }
        if (Array.isArray(type)) {
            if (type.length === 1) {
                return type;
            }
            if (type.length === 2 && type.indexOf('null') !== -1) {
                return type.sort((t1) => (t1 == 'null' ? 1 : -1));
            }
            return type;
        }
        return type ? [type] : [];
    }
    addValidator(field, name, validator) {
        field.validators = field.validators || {};
        field.validators[name] = validator;
    }
    isEnum(schema) {
        return (!!schema.enum ||
            (schema.anyOf && schema.anyOf.every(isConst)) ||
            (schema.oneOf && schema.oneOf.every(isConst)) ||
            (schema.uniqueItems && schema.items && !Array.isArray(schema.items) && this.isEnum(schema.items)));
    }
    toEnumOptions(schema) {
        if (schema.enum) {
            return schema.enum.map((value) => ({ value, label: value }));
        }
        const toEnum = (s) => {
            const value = s.hasOwnProperty('const') ? s.const : s.enum[0];
            const option = { value, label: s.title || value };
            if (s.readOnly) {
                option.disabled = true;
            }
            return option;
        };
        if (schema.anyOf) {
            return schema.anyOf.map(toEnum);
        }
        if (schema.oneOf) {
            return schema.oneOf.map(toEnum);
        }
        return this.toEnumOptions(schema.items);
    }
    isFieldValid(root, i, schemas, options) {
        const schema = schemas[i];
        if (!schema._field) {
            Object.defineProperty(schema, '_field', { enumerable: false, writable: true, configurable: true });
        }
        let field = schema._field;
        let model = root.model ? root.model : root.fieldArray ? [] : {};
        if (root.model && ɵhasKey(root)) {
            model = { [Array.isArray(root.key) ? root.key.join('.') : root.key]: ɵgetFieldValue(root) };
        }
        model = ɵclone(model);
        if (!field) {
            field = schema._field = root.options.build({
                form: Array.isArray(model) ? new FormArray([]) : new FormGroup({}),
                fieldGroup: [
                    this._toFieldConfig(schema, {
                        ...options,
                        resetOnHide: true,
                        ignoreDefault: true,
                        map: null,
                    }),
                ],
                model,
                options: {},
            });
        }
        else {
            field.model = model;
            root.options.build(field);
        }
        return field.form.valid;
    }
    mergeFields(f1, f2) {
        for (let prop in f2) {
            const f1Prop = prop === 'templateOptions' ? 'props' : prop;
            if (isObject(f1[f1Prop]) && isObject(f2[prop])) {
                f1[f1Prop] = this.mergeFields(f1[f1Prop], f2[prop]);
            }
            else if (f2[prop] != null) {
                f1[f1Prop] = f2[prop];
            }
        }
        return f1;
    }
}
FormlyJsonschema.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyJsonschema, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormlyJsonschema.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyJsonschema, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyJsonschema, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormlyJsonschema };
//# sourceMappingURL=ngx-formly-core-json-schema.mjs.map
