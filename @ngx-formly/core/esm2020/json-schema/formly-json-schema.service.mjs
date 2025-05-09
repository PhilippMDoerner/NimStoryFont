import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ɵreverseDeepMerge as reverseDeepMerge, ɵgetFieldValue as getFieldValue, ɵclone as clone, ɵhasKey as hasKey, } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
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
        return hasKey(field) && getFieldValue(field) !== undefined ? 1 : 0;
    }
    const total = field.fieldGroup.reduce((s, f) => totalMatchedFields(f) + s, 0);
    if (total === 0 && hasKey(field)) {
        const value = getFieldValue(field);
        if (value === null ||
            (value !== undefined && ((field.fieldArray && Array.isArray(value)) || (!field.fieldArray && isObject(value))))) {
            return 1;
        }
    }
    return total;
}
export class FormlyJsonschema {
    toFieldConfig(schema, options) {
        schema = clone(schema);
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
                            if (isMultiSchema && !hasKey(f)) {
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
            return reverseDeepMerge(base, schema);
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
        if (root.model && hasKey(root)) {
            model = { [Array.isArray(root.key) ? root.key.join('.') : root.key]: getFieldValue(root) };
        }
        model = clone(model);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9qc29uLXNjaGVtYS9zcmMvZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQW1CLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQ0wsaUJBQWlCLElBQUksZ0JBQWdCLEVBQ3JDLGNBQWMsSUFBSSxhQUFhLEVBQy9CLE1BQU0sSUFBSSxLQUFLLEVBQ2YsT0FBTyxJQUFJLE1BQU0sR0FDbEIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBZXJDLHVDQUF1QztBQUN2QyxTQUFTLGFBQWEsQ0FBQyxDQUFTO0lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsRUFDUCxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDUixDQUFDLEVBQUUsQ0FBQztLQUNMO0lBRUQsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsQ0FBTTtJQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztBQUMvQixDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsQ0FBTTtJQUN0QixPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEtB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OEdBdHJCVSxnQkFBZ0I7a0hBQWhCLGdCQUFnQixjQURILE1BQU07NEZBQ25CLGdCQUFnQjtrQkFENUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgSlNPTlNjaGVtYTcsIEpTT05TY2hlbWE3RGVmaW5pdGlvbiB9IGZyb20gJ2pzb24tc2NoZW1hJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICDJtXJldmVyc2VEZWVwTWVyZ2UgYXMgcmV2ZXJzZURlZXBNZXJnZSxcbiAgybVnZXRGaWVsZFZhbHVlIGFzIGdldEZpZWxkVmFsdWUsXG4gIMm1Y2xvbmUgYXMgY2xvbmUsXG4gIMm1aGFzS2V5IGFzIGhhc0tleSxcbn0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5SnNvbnNjaGVtYU9wdGlvbnMge1xuICAvKipcbiAgICogYWxsb3dzIHRvIGludGVyY2VwdCB0aGUgbWFwcGluZywgdGFraW5nIHRoZSBhbHJlYWR5IG1hcHBlZFxuICAgKiBmb3JtbHkgZmllbGQgYW5kIHRoZSBvcmlnaW5hbCBKU09OU2NoZW1hIHNvdXJjZSBmcm9tIHdoaWNoIGl0XG4gICAqIHdhcyBtYXBwZWQuXG4gICAqL1xuICBtYXA/OiAobWFwcGVkRmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBtYXBTb3VyY2U6IEpTT05TY2hlbWE3KSA9PiBGb3JtbHlGaWVsZENvbmZpZztcbn1cblxuaW50ZXJmYWNlIEZvcm1seUpTT05TY2hlbWE3IGV4dGVuZHMgSlNPTlNjaGVtYTcge1xuICB3aWRnZXQ/OiB7IGZvcm1seUNvbmZpZzogRm9ybWx5RmllbGRDb25maWcgfTtcbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI3ODY1Mjg1XG5mdW5jdGlvbiBkZWNpbWFsUGxhY2VzKGE6IG51bWJlcikge1xuICBpZiAoIWlzRmluaXRlKGEpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBsZXQgZSA9IDEsXG4gICAgcCA9IDA7XG4gIHdoaWxlIChNYXRoLnJvdW5kKGEgKiBlKSAvIGUgIT09IGEpIHtcbiAgICBlICo9IDEwO1xuICAgIHArKztcbiAgfVxuXG4gIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiBpc0VtcHR5KHY6IGFueSkge1xuICByZXR1cm4gdiA9PT0gJycgfHwgdiA9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCh2OiBhbnkpIHtcbiAgcmV0dXJuIHYgIT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodik7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcih2YWx1ZTogYW55KSB7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyID8gTnVtYmVyLmlzSW50ZWdlcih2YWx1ZSkgOiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaXNDb25zdChzY2hlbWE6IEpTT05TY2hlbWE3RGVmaW5pdGlvbikge1xuICByZXR1cm4gdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcgJiYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnY29uc3QnKSB8fCAoc2NoZW1hLmVudW0gJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSk7XG59XG5cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsKSB7XG4gIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgY29uc3QgdmFsID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIHJldHVybiAhaXNOYU4odmFsKSA/IHZhbCA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiB0b3RhbE1hdGNoZWRGaWVsZHMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKTogbnVtYmVyIHtcbiAgaWYgKCFmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgcmV0dXJuIGhhc0tleShmaWVsZCkgJiYgZ2V0RmllbGRWYWx1ZShmaWVsZCkgIT09IHVuZGVmaW5lZCA/IDEgOiAwO1xuICB9XG5cbiAgY29uc3QgdG90YWwgPSBmaWVsZC5maWVsZEdyb3VwLnJlZHVjZSgocywgZikgPT4gdG90YWxNYXRjaGVkRmllbGRzKGYpICsgcywgMCk7XG4gIGlmICh0b3RhbCA9PT0gMCAmJiBoYXNLZXkoZmllbGQpKSB7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGZpZWxkKTtcbiAgICBpZiAoXG4gICAgICB2YWx1ZSA9PT0gbnVsbCB8fFxuICAgICAgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgKChmaWVsZC5maWVsZEFycmF5ICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB8fCAoIWZpZWxkLmZpZWxkQXJyYXkgJiYgaXNPYmplY3QodmFsdWUpKSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG90YWw7XG59XG5cbmludGVyZmFjZSBJT3B0aW9ucyBleHRlbmRzIEZvcm1seUpzb25zY2hlbWFPcHRpb25zIHtcbiAgc2NoZW1hOiBGb3JtbHlKU09OU2NoZW1hNztcbiAgcmVzZXRPbkhpZGU/OiBib29sZWFuO1xuICBzaGFyZUZvcm1Db250cm9sPzogYm9vbGVhbjtcbiAgaWdub3JlRGVmYXVsdD86IGJvb2xlYW47XG4gIHN0cmljdD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAga2V5PzogRm9ybWx5RmllbGRDb25maWdbJ2tleSddO1xuICBpc09wdGlvbmFsPzogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlKc29uc2NoZW1hIHtcbiAgdG9GaWVsZENvbmZpZyhzY2hlbWE6IEpTT05TY2hlbWE3LCBvcHRpb25zPzogRm9ybWx5SnNvbnNjaGVtYU9wdGlvbnMpOiBGb3JtbHlGaWVsZENvbmZpZyB7XG4gICAgc2NoZW1hID0gY2xvbmUoc2NoZW1hKTtcbiAgICByZXR1cm4gdGhpcy5fdG9GaWVsZENvbmZpZyhzY2hlbWEsIHsgc2NoZW1hLCAuLi4ob3B0aW9ucyB8fCB7fSkgfSk7XG4gIH1cblxuICBwcml2YXRlIF90b0ZpZWxkQ29uZmlnKHNjaGVtYTogRm9ybWx5SlNPTlNjaGVtYTcsIHsga2V5LCBpc09wdGlvbmFsLCAuLi5vcHRpb25zIH06IElPcHRpb25zKTogRm9ybWx5RmllbGRDb25maWcge1xuICAgIHNjaGVtYSA9IHRoaXMucmVzb2x2ZVNjaGVtYShzY2hlbWEsIG9wdGlvbnMpO1xuICAgIGNvbnN0IHR5cGVzID0gdGhpcy5ndWVzc1NjaGVtYVR5cGUoc2NoZW1hKTtcblxuICAgIGxldCBmaWVsZDogRm9ybWx5RmllbGRDb25maWcgJiB7IHNoYXJlRm9ybUNvbnRyb2w/OiBib29sZWFuIH0gPSB7XG4gICAgICB0eXBlOiB0eXBlc1swXSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogc2NoZW1hLmRlZmF1bHQsXG4gICAgICBwcm9wczoge1xuICAgICAgICBsYWJlbDogc2NoZW1hLnRpdGxlLFxuICAgICAgICByZWFkb25seTogc2NoZW1hLnJlYWRPbmx5LFxuICAgICAgICBkZXNjcmlwdGlvbjogc2NoZW1hLmRlc2NyaXB0aW9uLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgICBmaWVsZC5rZXkgPSBrZXk7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLmlnbm9yZURlZmF1bHQgJiYgKHNjaGVtYS5yZWFkT25seSB8fCBvcHRpb25zLnJlYWRPbmx5KSkge1xuICAgICAgZmllbGQucHJvcHMuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucywgcmVhZE9ubHk6IHRydWUgfTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5yZXNldE9uSGlkZSkge1xuICAgICAgZmllbGQucmVzZXRPbkhpZGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNoYXJlRm9ybUNvbnRyb2wgPT09IGZhbHNlKSB7XG4gICAgICBmaWVsZC5zaGFyZUZvcm1Db250cm9sID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkLmRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIHR5cGVzLmxlbmd0aCA9PT0gMSAmJiBpc09wdGlvbmFsID09PSBmYWxzZSkge1xuICAgICAgc3dpdGNoICh0eXBlc1swXSkge1xuICAgICAgICBjYXNlICdudWxsJzoge1xuICAgICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IG51bGw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnc3RyaW5nJzoge1xuICAgICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9ICcnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSB7fTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdhcnJheSc6IHtcbiAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBzY2hlbWEubWluSXRlbXMgPiAwID8gQXJyYXkuZnJvbShuZXcgQXJyYXkoc2NoZW1hLm1pbkl0ZW1zKSkgOiBbXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmlnbm9yZURlZmF1bHQpIHtcbiAgICAgIGRlbGV0ZSBmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICd0eXBlJywge1xuICAgICAgc2NoZW1hVHlwZTogdHlwZXMsXG4gICAgICBleHByZXNzaW9uOiAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCAmJiB0eXBlcy5pbmRleE9mKCdudWxsJykgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHR5cGVzWzBdKSB7XG4gICAgICAgICAgY2FzZSAnbnVsbCc6IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdpbnRlZ2VyJzoge1xuICAgICAgICAgICAgcmV0dXJuIGlzSW50ZWdlcih2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ251bWJlcic6IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICByZXR1cm4gaXNPYmplY3QodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdhcnJheSc6IHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdpbnRlZ2VyJzoge1xuICAgICAgICBmaWVsZC5wYXJzZXJzID0gW1xuICAgICAgICAgICh2OiBzdHJpbmcgfCBudW1iZXIsIGY6IEZvcm1seUZpZWxkQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICB2ID0gdG9OdW1iZXIodik7XG5cbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsICYmIGYpIHtcbiAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPVxuICAgICAgICAgICAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZi5pZFxuICAgICAgICAgICAgICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KGAjJHtmLmlkfWApXG4gICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgaWYgKGlucHV0ICYmICFpbnB1dC52YWxpZGl0eS5iYWRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHYgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAodiAhPT0gZi5mb3JtQ29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGYuZm9ybUNvbnRyb2wuc2V0VmFsdWUodiwgeyBlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgIH0sXG4gICAgICAgIF0gYXMgKCh2YWx1ZTogYW55LCBmPzogRm9ybWx5RmllbGRDb25maWcpID0+IGFueSlbXTtcblxuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdtaW5pbXVtJykpIHtcbiAgICAgICAgICBmaWVsZC5wcm9wcy5taW4gPSBzY2hlbWEubWluaW11bTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21heGltdW0nKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLm1heCA9IHNjaGVtYS5tYXhpbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZXhjbHVzaXZlTWluaW11bScpKSB7XG4gICAgICAgICAgZmllbGQucHJvcHMuZXhjbHVzaXZlTWluaW11bSA9IHNjaGVtYS5leGNsdXNpdmVNaW5pbXVtO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAnZXhjbHVzaXZlTWluaW11bScsXG4gICAgICAgICAgICAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlID4gc2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoJ2V4Y2x1c2l2ZU1heGltdW0nKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLmV4Y2x1c2l2ZU1heGltdW0gPSBzY2hlbWEuZXhjbHVzaXZlTWF4aW11bTtcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihcbiAgICAgICAgICAgIGZpZWxkLFxuICAgICAgICAgICAgJ2V4Y2x1c2l2ZU1heGltdW0nLFxuICAgICAgICAgICAgKHsgdmFsdWUgfTogQWJzdHJhY3RDb250cm9sKSA9PiBpc0VtcHR5KHZhbHVlKSB8fCB2YWx1ZSA8IHNjaGVtYS5leGNsdXNpdmVNYXhpbXVtLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdtdWx0aXBsZU9mJykpIHtcbiAgICAgICAgICBmaWVsZC5wcm9wcy5zdGVwID0gc2NoZW1hLm11bHRpcGxlT2Y7XG4gICAgICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICdtdWx0aXBsZU9mJywgKHsgdmFsdWUgfTogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNFbXB0eSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJyB8fCB2YWx1ZSA9PT0gMCB8fCBzY2hlbWEubXVsdGlwbGVPZiA8PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYWp2LXZhbGlkYXRvci9hanYvaXNzdWVzLzY1MiNpc3N1ZS0yODM2MTA4NTlcbiAgICAgICAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgZGVjaW1hbFBsYWNlcyhzY2hlbWEubXVsdGlwbGVPZikpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiBtdWx0aXBsaWVyKSAlIE1hdGgucm91bmQoc2NoZW1hLm11bHRpcGxlT2YgKiBtdWx0aXBsaWVyKSA9PT0gMDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgICAgZmllbGQucGFyc2VycyA9IFtcbiAgICAgICAgICAodiwgZjogRm9ybWx5RmllbGRDb25maWcpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlcy5pbmRleE9mKCdudWxsJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgIHYgPSBpc0VtcHR5KHYpID8gbnVsbCA6IHY7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGYgJiYgIWYucHJvcHMucmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgdiA9IHYgPT09ICcnID8gdW5kZWZpbmVkIDogdjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgICAgfSxcbiAgICAgICAgXSBhcyAoKHZhbHVlOiBhbnksIGY/OiBGb3JtbHlGaWVsZENvbmZpZykgPT4gYW55KVtdO1xuXG4gICAgICAgIFsnbWluTGVuZ3RoJywgJ21heExlbmd0aCcsICdwYXR0ZXJuJ10uZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgIGZpZWxkLnByb3BzW3Byb3BdID0gKHNjaGVtYSBhcyBhbnkpW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICBpZiAoIWZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHByb3BEZXBzLCBzY2hlbWFEZXBzIH0gPSB0aGlzLnJlc29sdmVEZXBlbmRlbmNpZXMoc2NoZW1hKTtcbiAgICAgICAgT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNSZXF1aXJlZCA9IEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSAmJiBzY2hlbWEucmVxdWlyZWQuaW5kZXhPZihwcm9wZXJ0eSkgIT09IC0xO1xuICAgICAgICAgIGNvbnN0IGYgPSB0aGlzLl90b0ZpZWxkQ29uZmlnKDxKU09OU2NoZW1hNz5zY2hlbWEucHJvcGVydGllc1twcm9wZXJ0eV0sIHtcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICBrZXk6IHByb3BlcnR5LFxuICAgICAgICAgICAgaXNPcHRpb25hbDogaXNPcHRpb25hbCB8fCAhaXNSZXF1aXJlZCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaChmKTtcbiAgICAgICAgICBpZiAoaXNSZXF1aXJlZCB8fCBwcm9wRGVwc1twcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgIGYuZXhwcmVzc2lvbnMgPSB7XG4gICAgICAgICAgICAgIC4uLihmLmV4cHJlc3Npb25zIHx8IHt9KSxcbiAgICAgICAgICAgICAgJ3Byb3BzLnJlcXVpcmVkJzogKGYpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gZi5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBmLmZpZWxkR3JvdXAgJiYgZi5rZXkgIT0gbnVsbCA/IHBhcmVudC5tb2RlbCA6IGYubW9kZWw7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudC5rZXkgPT0gbnVsbCAmJiBwYXJlbnQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gcGFyZW50ICYmIHBhcmVudC5wcm9wcyA/IHBhcmVudC5wcm9wcy5yZXF1aXJlZCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghbW9kZWwgJiYgIXJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSAmJiBzY2hlbWEucmVxdWlyZWQuaW5kZXhPZihwcm9wZXJ0eSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlcHNbcHJvcGVydHldICYmIGYubW9kZWwgJiYgcHJvcERlcHNbcHJvcGVydHldLnNvbWUoKGspID0+ICFpc0VtcHR5KGYubW9kZWxba10pKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNjaGVtYURlcHNbcHJvcGVydHldKSB7XG4gICAgICAgICAgICBjb25zdCBnZXRDb25zdFZhbHVlID0gKHM6IEpTT05TY2hlbWE3KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBzLmhhc093blByb3BlcnR5KCdjb25zdCcpID8gcy5jb25zdCA6IHMuZW51bVswXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IG9uZU9mU2NoZW1hID0gc2NoZW1hRGVwc1twcm9wZXJ0eV0ub25lT2YgYXMgSlNPTlNjaGVtYTdbXTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgb25lT2ZTY2hlbWEgJiZcbiAgICAgICAgICAgICAgb25lT2ZTY2hlbWEuZXZlcnkoKG8pID0+IG8ucHJvcGVydGllcyAmJiBvLnByb3BlcnRpZXNbcHJvcGVydHldICYmIGlzQ29uc3Qoby5wcm9wZXJ0aWVzW3Byb3BlcnR5XSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgb25lT2ZTY2hlbWEuZm9yRWFjaCgob25lT2ZTY2hlbWFJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBbcHJvcGVydHldOiBjb25zdFNjaGVtYSwgLi4ucHJvcGVydGllcyB9ID0gb25lT2ZTY2hlbWFJdGVtLnByb3BlcnRpZXM7XG4gICAgICAgICAgICAgICAgZmllbGQuZmllbGRHcm91cC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcoXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub25lT2ZTY2hlbWFJdGVtLCBwcm9wZXJ0aWVzIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgLi4ub3B0aW9ucywgc2hhcmVGb3JtQ29udHJvbDogZmFsc2UsIHJlc2V0T25IaWRlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZTogKGYpID0+ICFmLm1vZGVsIHx8IGdldENvbnN0VmFsdWUoY29uc3RTY2hlbWEgYXMgSlNPTlNjaGVtYTcpICE9PSBmLm1vZGVsW3Byb3BlcnR5XSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZmllbGQuZmllbGRHcm91cC5wdXNoKHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLl90b0ZpZWxkQ29uZmlnKHNjaGVtYURlcHNbcHJvcGVydHldLCBvcHRpb25zKSxcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uczoge1xuICAgICAgICAgICAgICAgICAgaGlkZTogKGYpID0+ICFmLm1vZGVsIHx8IGlzRW1wdHkoZi5tb2RlbFtwcm9wZXJ0eV0pLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNjaGVtYS5vbmVPZikge1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaChcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU11bHRpU2NoZW1hKCdvbmVPZicsIDxKU09OU2NoZW1hN1tdPnNjaGVtYS5vbmVPZiwgeyAuLi5vcHRpb25zLCBzaGFyZUZvcm1Db250cm9sOiBmYWxzZSB9KSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5hbnlPZikge1xuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaCh0aGlzLnJlc29sdmVNdWx0aVNjaGVtYSgnYW55T2YnLCA8SlNPTlNjaGVtYTdbXT5zY2hlbWEuYW55T2YsIG9wdGlvbnMpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2FycmF5Jzoge1xuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdtaW5JdGVtcycpKSB7XG4gICAgICAgICAgZmllbGQucHJvcHMubWluSXRlbXMgPSBzY2hlbWEubWluSXRlbXM7XG4gICAgICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICdtaW5JdGVtcycsICh7IHZhbHVlIH06IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA+PSBzY2hlbWEubWluSXRlbXM7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCFpc09wdGlvbmFsICYmIHNjaGVtYS5taW5JdGVtcyA+IDAgJiYgZmllbGQuZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IEFycmF5LmZyb20obmV3IEFycmF5KHNjaGVtYS5taW5JdGVtcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdtYXhJdGVtcycpKSB7XG4gICAgICAgICAgZmllbGQucHJvcHMubWF4SXRlbXMgPSBzY2hlbWEubWF4SXRlbXM7XG4gICAgICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICdtYXhJdGVtcycsICh7IHZhbHVlIH06IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA8PSBzY2hlbWEubWF4SXRlbXM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgndW5pcXVlSXRlbXMnKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLnVuaXF1ZUl0ZW1zID0gc2NoZW1hLnVuaXF1ZUl0ZW1zO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAndW5pcXVlSXRlbXMnLCAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0VtcHR5KHZhbHVlKSB8fCAhc2NoZW1hLnVuaXF1ZUl0ZW1zKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB1bmlxdWVJdGVtcyA9IEFycmF5LmZyb20oXG4gICAgICAgICAgICAgIG5ldyBTZXQoXG4gICAgICAgICAgICAgICAgdmFsdWUubWFwKCh2OiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2LCAoaywgbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3QobykpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zb3J0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKG9iajogYW55LCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW2tleV0gPSBvW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXR1cm4gdW5pcXVlSXRlbXMubGVuZ3RoID09PSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNvbHZlIGl0ZW1zIHNjaGVtYSBuZWVkZWQgZm9yIGlzRW51bSBjaGVja1xuICAgICAgICBpZiAoc2NoZW1hLml0ZW1zICYmICFBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICBzY2hlbWEuaXRlbXMgPSB0aGlzLnJlc29sdmVTY2hlbWEoPEpTT05TY2hlbWE3PnNjaGVtYS5pdGVtcywgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPOiByZW1vdmUgaXNFbnVtIGNoZWNrIG9uY2UgYWRkaW5nIGFuIG9wdGlvbiB0byBza2lwIGV4dGVuc2lvblxuICAgICAgICBpZiAoIXRoaXMuaXNFbnVtKHNjaGVtYSkpIHtcbiAgICAgICAgICBmaWVsZC5maWVsZEFycmF5ID0gKHJvb3Q6IEZvcm1seUZpZWxkQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSByb290LmZpZWxkR3JvdXAgPyByb290LmZpZWxkR3JvdXAubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gc2NoZW1hLml0ZW1zIGFzIEpTT05TY2hlbWE3IHwgSlNPTlNjaGVtYTdbXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgICAgICAgICAgaWYgKCFpdGVtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGlzTXVsdGlTY2hlbWEgPSBpdGVtcy5vbmVPZiB8fCBpdGVtcy5hbnlPZjtcblxuICAgICAgICAgICAgICAvLyBXaGVuIGl0ZW1zIGlzIGEgc2luZ2xlIHNjaGVtYSwgdGhlIGFkZGl0aW9uYWxJdGVtcyBrZXl3b3JkIGlzIG1lYW5pbmdsZXNzLCBhbmQgaXQgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgICAgICAgICAgICBjb25zdCBmID0gdGhpcy5fdG9GaWVsZENvbmZpZyhcbiAgICAgICAgICAgICAgICBpdGVtcyxcbiAgICAgICAgICAgICAgICBpc011bHRpU2NoZW1hID8geyAuLi5vcHRpb25zLCBrZXk6IGAke2xlbmd0aH1gLCBpc09wdGlvbmFsOiBmYWxzZSB9IDogeyAuLi5vcHRpb25zLCBpc09wdGlvbmFsOiBmYWxzZSB9LFxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGlmIChpc011bHRpU2NoZW1hICYmICFoYXNLZXkoZikpIHtcbiAgICAgICAgICAgICAgICBmLmtleSA9IG51bGw7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaXRlbVNjaGVtYSA9IGl0ZW1zW2xlbmd0aF0gPyBpdGVtc1tsZW5ndGhdIDogc2NoZW1hLmFkZGl0aW9uYWxJdGVtcztcbiAgICAgICAgICAgIGNvbnN0IGYgPSBpdGVtU2NoZW1hID8gdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+aXRlbVNjaGVtYSwgb3B0aW9ucykgOiB7fTtcbiAgICAgICAgICAgIGlmIChmLnByb3BzKSB7XG4gICAgICAgICAgICAgIGYucHJvcHMucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGl0ZW1zW2xlbmd0aF0pIHtcbiAgICAgICAgICAgICAgZi5wcm9wcy5yZW1vdmFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdjb25zdCcpKSB7XG4gICAgICBmaWVsZC5wcm9wcy5jb25zdCA9IHNjaGVtYS5jb25zdDtcbiAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAnY29uc3QnLCAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IHZhbHVlID09PSBzY2hlbWEuY29uc3QpO1xuICAgICAgaWYgKCFmaWVsZC50eXBlKSB7XG4gICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IHNjaGVtYS5jb25zdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0VudW0oc2NoZW1hKSkge1xuICAgICAgY29uc3QgZW51bU9wdGlvbnMgPSB0aGlzLnRvRW51bU9wdGlvbnMoc2NoZW1hKTtcbiAgICAgIGNvbnN0IG11bHRpcGxlID0gZmllbGQudHlwZSA9PT0gJ2FycmF5JztcblxuICAgICAgZmllbGQudHlwZSA9ICdlbnVtJztcbiAgICAgIGZpZWxkLnByb3BzLm11bHRpcGxlID0gbXVsdGlwbGU7XG4gICAgICBmaWVsZC5wcm9wcy5vcHRpb25zID0gZW51bU9wdGlvbnM7XG5cbiAgICAgIGNvbnN0IGVudW1WYWx1ZXMgPSBlbnVtT3B0aW9ucy5tYXAoKG8pID0+IG8udmFsdWUpO1xuICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICdlbnVtJywgKHsgdmFsdWUgfTogQWJzdHJhY3RDb250cm9sKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5ldmVyeSgobykgPT4gZW51bVZhbHVlcy5pbmNsdWRlcyhvKSkgOiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbnVtVmFsdWVzLmluY2x1ZGVzKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEub25lT2YgJiYgIWZpZWxkLnR5cGUpIHtcbiAgICAgIGRlbGV0ZSBmaWVsZC5rZXk7XG4gICAgICBmaWVsZC5maWVsZEdyb3VwID0gW1xuICAgICAgICB0aGlzLnJlc29sdmVNdWx0aVNjaGVtYSgnb25lT2YnLCA8SlNPTlNjaGVtYTdbXT5zY2hlbWEub25lT2YsIHsgLi4ub3B0aW9ucywga2V5LCBzaGFyZUZvcm1Db250cm9sOiBmYWxzZSB9KSxcbiAgICAgIF07XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5hbnlPZiAmJiAhZmllbGQudHlwZSkge1xuICAgICAgZGVsZXRlIGZpZWxkLmtleTtcbiAgICAgIGZpZWxkLmZpZWxkR3JvdXAgPSBbXG4gICAgICAgIHRoaXMucmVzb2x2ZU11bHRpU2NoZW1hKCdvbmVPZicsIDxKU09OU2NoZW1hN1tdPnNjaGVtYS5hbnlPZiwgeyAuLi5vcHRpb25zLCBrZXksIHNoYXJlRm9ybUNvbnRyb2w6IGZhbHNlIH0pLFxuICAgICAgXTtcbiAgICB9XG5cbiAgICAvLyBtYXAgaW4gcG9zc2libGUgZm9ybWx5Q29uZmlnIG9wdGlvbnMgZnJvbSB0aGUgd2lkZ2V0IHByb3BlcnR5XG4gICAgaWYgKHNjaGVtYS53aWRnZXQ/LmZvcm1seUNvbmZpZykge1xuICAgICAgZmllbGQgPSB0aGlzLm1lcmdlRmllbGRzKGZpZWxkLCBzY2hlbWEud2lkZ2V0LmZvcm1seUNvbmZpZyk7XG4gICAgfVxuXG4gICAgZmllbGQudGVtcGxhdGVPcHRpb25zID0gZmllbGQucHJvcHM7XG4gICAgLy8gaWYgdGhlcmUgaXMgYSBtYXAgZnVuY3Rpb24gcGFzc2VkIGluLCB1c2UgaXQgdG8gYWxsb3cgdGhlIHVzZXIgdG9cbiAgICAvLyBmdXJ0aGVyIGN1c3RvbWl6ZSBob3cgZmllbGRzIGFyZSBiZWluZyBtYXBwZWRcbiAgICByZXR1cm4gb3B0aW9ucy5tYXAgPyBvcHRpb25zLm1hcChmaWVsZCwgc2NoZW1hKSA6IGZpZWxkO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlU2NoZW1hKHNjaGVtYTogSlNPTlNjaGVtYTcsIG9wdGlvbnM6IElPcHRpb25zKTogSlNPTlNjaGVtYTcge1xuICAgIGlmIChzY2hlbWEgJiYgc2NoZW1hLiRyZWYpIHtcbiAgICAgIHNjaGVtYSA9IHRoaXMucmVzb2x2ZURlZmluaXRpb24oc2NoZW1hLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hICYmIHNjaGVtYS5hbGxPZikge1xuICAgICAgc2NoZW1hID0gdGhpcy5yZXNvbHZlQWxsT2Yoc2NoZW1hLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlQWxsT2YoeyBhbGxPZiwgLi4uYmFzZVNjaGVtYSB9OiBGb3JtbHlKU09OU2NoZW1hNywgb3B0aW9uczogSU9wdGlvbnMpIHtcbiAgICBpZiAoIWFsbE9mLmxlbmd0aCkge1xuICAgICAgdGhyb3cgRXJyb3IoYGFsbE9mIGFycmF5IGNhbiBub3QgYmUgZW1wdHkgJHthbGxPZn0uYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChhbGxPZiBhcyBGb3JtbHlKU09OU2NoZW1hN1tdKS5yZWR1Y2UoKGJhc2U6IEZvcm1seUpTT05TY2hlbWE3LCBzY2hlbWE6IEZvcm1seUpTT05TY2hlbWE3KSA9PiB7XG4gICAgICBzY2hlbWEgPSB0aGlzLnJlc29sdmVTY2hlbWEoc2NoZW1hLCBvcHRpb25zKTtcbiAgICAgIGlmIChiYXNlLnJlcXVpcmVkICYmIHNjaGVtYS5yZXF1aXJlZCkge1xuICAgICAgICBiYXNlLnJlcXVpcmVkID0gWy4uLmJhc2UucmVxdWlyZWQsIC4uLnNjaGVtYS5yZXF1aXJlZF07XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2hlbWEudW5pcXVlSXRlbXMpIHtcbiAgICAgICAgYmFzZS51bmlxdWVJdGVtcyA9IHNjaGVtYS51bmlxdWVJdGVtcztcbiAgICAgIH1cblxuICAgICAgLy8gcmVzb2x2ZSB0byBtaW4gdmFsdWVcbiAgICAgIChcbiAgICAgICAgWydtYXhMZW5ndGgnLCAnbWF4aW11bScsICdleGNsdXNpdmVNYXhpbXVtJywgJ21heEl0ZW1zJywgJ21heFByb3BlcnRpZXMnXSBhcyAoa2V5b2YgRm9ybWx5SlNPTlNjaGVtYTcpW11cbiAgICAgICkuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICBpZiAoIWlzRW1wdHkoYmFzZVtwcm9wXSkgJiYgIWlzRW1wdHkoc2NoZW1hW3Byb3BdKSkge1xuICAgICAgICAgIChiYXNlIGFzIGFueSlbcHJvcF0gPSBiYXNlW3Byb3BdIDwgc2NoZW1hW3Byb3BdID8gYmFzZVtwcm9wXSA6IHNjaGVtYVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHJlc29sdmUgdG8gbWF4IHZhbHVlXG4gICAgICAoXG4gICAgICAgIFsnbWluTGVuZ3RoJywgJ21pbmltdW0nLCAnZXhjbHVzaXZlTWluaW11bScsICdtaW5JdGVtcycsICdtaW5Qcm9wZXJ0aWVzJ10gYXMgKGtleW9mIEZvcm1seUpTT05TY2hlbWE3KVtdXG4gICAgICApLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgaWYgKCFpc0VtcHR5KGJhc2VbcHJvcF0pICYmICFpc0VtcHR5KHNjaGVtYVtwcm9wXSkpIHtcbiAgICAgICAgICAoYmFzZSBhcyBhbnkpW3Byb3BdID0gYmFzZVtwcm9wXSA+IHNjaGVtYVtwcm9wXSA/IGJhc2VbcHJvcF0gOiBzY2hlbWFbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmV2ZXJzZURlZXBNZXJnZShiYXNlLCBzY2hlbWEpO1xuICAgIH0sIGJhc2VTY2hlbWEpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlTXVsdGlTY2hlbWEobW9kZTogJ29uZU9mJyB8ICdhbnlPZicsIHNjaGVtYXM6IEpTT05TY2hlbWE3W10sIG9wdGlvbnM6IElPcHRpb25zKTogRm9ybWx5RmllbGRDb25maWcge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnbXVsdGlzY2hlbWEnLFxuICAgICAgZmllbGRHcm91cDogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2VudW0nLFxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogLTEsXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIG11bHRpcGxlOiBtb2RlID09PSAnYW55T2YnLFxuICAgICAgICAgICAgb3B0aW9uczogc2NoZW1hcy5tYXAoKHMsIGkpID0+ICh7IGxhYmVsOiBzLnRpdGxlLCB2YWx1ZTogaSwgZGlzYWJsZWQ6IHMucmVhZE9ubHkgfSkpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaG9va3M6IHtcbiAgICAgICAgICAgIG9uSW5pdDogKGYpID0+IGYuZm9ybUNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFwKCgpID0+IGYub3B0aW9ucy5kZXRlY3RDaGFuZ2VzKGYucGFyZW50KSkpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaWVsZEdyb3VwOiBzY2hlbWFzLm1hcCgocywgaSkgPT4gKHtcbiAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcocywgeyAuLi5vcHRpb25zLCByZXNldE9uSGlkZTogdHJ1ZSB9KSxcbiAgICAgICAgICAgIGV4cHJlc3Npb25zOiB7XG4gICAgICAgICAgICAgIGhpZGU6IChmLCBmb3JjZVVwZGF0ZT86IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250cm9sID0gZi5wYXJlbnQucGFyZW50LmZpZWxkR3JvdXBbMF0uZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgPT09IC0xIHx8IGZvcmNlVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBmLnBhcmVudC5maWVsZEdyb3VwXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgKGYsIGkpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBbZiwgaSwgdGhpcy5pc0ZpZWxkVmFsaWQoZiwgaSwgc2NoZW1hcywgb3B0aW9ucyldIGFzIFtGb3JtbHlGaWVsZENvbmZpZywgbnVtYmVyLCBib29sZWFuXSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAuc29ydCgoW2YxLCAsIGYxVmFsaWRdLCBbZjIsICwgZjJWYWxpZF0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZjFWYWxpZCAhPT0gZjJWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYyVmFsaWQgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlZEZpZWxkczEgPSB0b3RhbE1hdGNoZWRGaWVsZHMoZjEpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRGaWVsZHMyID0gdG90YWxNYXRjaGVkRmllbGRzKGYyKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlZEZpZWxkczEgPT09IG1hdGNoZWRGaWVsZHMyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZjEucHJvcHMuZGlzYWJsZWQgPT09IGYyLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlZEZpZWxkczIgPiBtYXRjaGVkRmllbGRzMSA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlZEZpZWxkczIgPiBtYXRjaGVkRmllbGRzMSA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgoWywgaV0pID0+IGkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAobW9kZSA9PT0gJ2FueU9mJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWZpbmVkVmFsdWUgPSB2YWx1ZS5maWx0ZXIoKGkpID0+IHRvdGFsTWF0Y2hlZEZpZWxkcyhmLnBhcmVudC5maWVsZEdyb3VwW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGVmaW5lZFZhbHVlLmxlbmd0aCA+IDAgPyBkZWZpbmVkVmFsdWUgOiBbdmFsdWVbMF0gfHwgMF07XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUubGVuZ3RoID4gMCA/IHZhbHVlIDogWzBdO1xuICAgICAgICAgICAgICAgICAgY29udHJvbC5zZXRWYWx1ZShtb2RlID09PSAnYW55T2YnID8gdmFsdWUgOiB2YWx1ZVswXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY29udHJvbC52YWx1ZSkgPyBjb250cm9sLnZhbHVlLmluZGV4T2YoaSkgPT09IC0xIDogY29udHJvbC52YWx1ZSAhPT0gaTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSkpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlRGVmaW5pdGlvbihzY2hlbWE6IEZvcm1seUpTT05TY2hlbWE3LCBvcHRpb25zOiBJT3B0aW9ucyk6IEZvcm1seUpTT05TY2hlbWE3IHtcbiAgICBjb25zdCBbdXJpLCBwb2ludGVyXSA9IHNjaGVtYS4kcmVmLnNwbGl0KCcjLycpO1xuICAgIGlmICh1cmkpIHtcbiAgICAgIHRocm93IEVycm9yKGBSZW1vdGUgc2NoZW1hcyBmb3IgJHtzY2hlbWEuJHJlZn0gbm90IHN1cHBvcnRlZCB5ZXQuYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmaW5pdGlvbiA9ICFwb2ludGVyXG4gICAgICA/IG51bGxcbiAgICAgIDogcG9pbnRlclxuICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgLnJlZHVjZSgoZGVmLCBwYXRoKSA9PiAoZGVmPy5oYXNPd25Qcm9wZXJ0eShwYXRoKSA/IChkZWYgYXMgYW55KVtwYXRoXSA6IG51bGwpLCBvcHRpb25zLnNjaGVtYSk7XG5cbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgIHRocm93IEVycm9yKGBDYW5ub3QgZmluZCBhIGRlZmluaXRpb24gZm9yICR7c2NoZW1hLiRyZWZ9LmApO1xuICAgIH1cblxuICAgIGlmIChkZWZpbml0aW9uLiRyZWYpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlc29sdmVEZWZpbml0aW9uKGRlZmluaXRpb24sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5kZWZpbml0aW9uLFxuICAgICAgLi4uWyd0aXRsZScsICdkZXNjcmlwdGlvbicsICdkZWZhdWx0JywgJ3dpZGdldCddLnJlZHVjZSgoYW5ub3RhdGlvbiwgcCkgPT4ge1xuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgYW5ub3RhdGlvbltwXSA9IChzY2hlbWEgYXMgYW55KVtwXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhbm5vdGF0aW9uO1xuICAgICAgfSwge30gYXMgYW55KSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYTogSlNPTlNjaGVtYTcpIHtcbiAgICBjb25zdCBwcm9wRGVwczogeyBbaWQ6IHN0cmluZ106IHN0cmluZ1tdIH0gPSB7fTtcbiAgICBjb25zdCBzY2hlbWFEZXBzOiB7IFtpZDogc3RyaW5nXTogSlNPTlNjaGVtYTcgfSA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoc2NoZW1hLmRlcGVuZGVuY2llcyB8fCB7fSkuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgY29uc3QgZGVwZW5kZW5jeSA9IHNjaGVtYS5kZXBlbmRlbmNpZXNbcHJvcF0gYXMgSlNPTlNjaGVtYTc7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkZXBlbmRlbmN5KSkge1xuICAgICAgICAvLyBQcm9wZXJ0eSBkZXBlbmRlbmNpZXNcbiAgICAgICAgZGVwZW5kZW5jeS5mb3JFYWNoKChkZXApID0+IHtcbiAgICAgICAgICBpZiAoIXByb3BEZXBzW2RlcF0pIHtcbiAgICAgICAgICAgIHByb3BEZXBzW2RlcF0gPSBbcHJvcF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BEZXBzW2RlcF0ucHVzaChwcm9wKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gc2NoZW1hIGRlcGVuZGVuY2llc1xuICAgICAgICBzY2hlbWFEZXBzW3Byb3BdID0gZGVwZW5kZW5jeTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7IHByb3BEZXBzLCBzY2hlbWFEZXBzIH07XG4gIH1cblxuICBwcml2YXRlIGd1ZXNzU2NoZW1hVHlwZShzY2hlbWE6IEpTT05TY2hlbWE3KSB7XG4gICAgY29uc3QgdHlwZSA9IHNjaGVtYT8udHlwZTtcbiAgICBpZiAoIXR5cGUgJiYgc2NoZW1hPy5wcm9wZXJ0aWVzKSB7XG4gICAgICByZXR1cm4gWydvYmplY3QnXTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgaWYgKHR5cGUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS5sZW5ndGggPT09IDIgJiYgdHlwZS5pbmRleE9mKCdudWxsJykgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0eXBlLnNvcnQoKHQxKSA9PiAodDEgPT0gJ251bGwnID8gMSA6IC0xKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlID8gW3R5cGVdIDogW107XG4gIH1cblxuICBwcml2YXRlIGFkZFZhbGlkYXRvcihmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIG5hbWU6IHN0cmluZywgdmFsaWRhdG9yOiBGb3JtbHlGaWVsZENvbmZpZ1sndmFsaWRhdG9ycyddKSB7XG4gICAgZmllbGQudmFsaWRhdG9ycyA9IGZpZWxkLnZhbGlkYXRvcnMgfHwge307XG4gICAgZmllbGQudmFsaWRhdG9yc1tuYW1lXSA9IHZhbGlkYXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgaXNFbnVtKHNjaGVtYTogSlNPTlNjaGVtYTcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgISFzY2hlbWEuZW51bSB8fFxuICAgICAgKHNjaGVtYS5hbnlPZiAmJiAoc2NoZW1hLmFueU9mIGFzIEpTT05TY2hlbWE3W10pLmV2ZXJ5KGlzQ29uc3QpKSB8fFxuICAgICAgKHNjaGVtYS5vbmVPZiAmJiAoc2NoZW1hLm9uZU9mIGFzIEpTT05TY2hlbWE3W10pLmV2ZXJ5KGlzQ29uc3QpKSB8fFxuICAgICAgKHNjaGVtYS51bmlxdWVJdGVtcyAmJiBzY2hlbWEuaXRlbXMgJiYgIUFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSAmJiB0aGlzLmlzRW51bSg8SlNPTlNjaGVtYTc+c2NoZW1hLml0ZW1zKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSB0b0VudW1PcHRpb25zKHNjaGVtYTogSlNPTlNjaGVtYTcpOiB7IHZhbHVlOiBhbnk7IGxhYmVsOiBhbnkgfVtdIHtcbiAgICBpZiAoc2NoZW1hLmVudW0pIHtcbiAgICAgIHJldHVybiBzY2hlbWEuZW51bS5tYXAoKHZhbHVlKSA9PiAoeyB2YWx1ZSwgbGFiZWw6IHZhbHVlIH0pKTtcbiAgICB9XG5cbiAgICBjb25zdCB0b0VudW0gPSAoczogSlNPTlNjaGVtYTcpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcy5oYXNPd25Qcm9wZXJ0eSgnY29uc3QnKSA/IHMuY29uc3QgOiBzLmVudW1bMF07XG4gICAgICBjb25zdCBvcHRpb246IGFueSA9IHsgdmFsdWUsIGxhYmVsOiBzLnRpdGxlIHx8IHZhbHVlIH07XG4gICAgICBpZiAocy5yZWFkT25seSkge1xuICAgICAgICBvcHRpb24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3B0aW9uO1xuICAgIH07XG5cbiAgICBpZiAoc2NoZW1hLmFueU9mKSB7XG4gICAgICByZXR1cm4gKHNjaGVtYS5hbnlPZiBhcyBKU09OU2NoZW1hN1tdKS5tYXAodG9FbnVtKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLm9uZU9mKSB7XG4gICAgICByZXR1cm4gKHNjaGVtYS5vbmVPZiBhcyBKU09OU2NoZW1hN1tdKS5tYXAodG9FbnVtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50b0VudW1PcHRpb25zKDxKU09OU2NoZW1hNz5zY2hlbWEuaXRlbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0ZpZWxkVmFsaWQoXG4gICAgcm9vdDogRm9ybWx5RmllbGRDb25maWcgJiB7IF9zY2hlbWFzRmllbGRzPzogeyBba2V5OiBudW1iZXJdOiBGb3JtbHlGaWVsZENvbmZpZyB9IH0sXG4gICAgaTogbnVtYmVyLFxuICAgIHNjaGVtYXM6IEpTT05TY2hlbWE3W10sXG4gICAgb3B0aW9uczogSU9wdGlvbnMsXG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNjaGVtYSA9IHNjaGVtYXNbaV0gYXMgSlNPTlNjaGVtYTcgJiB7IF9maWVsZD86IEZvcm1seUZpZWxkQ29uZmlnIH07XG4gICAgaWYgKCFzY2hlbWEuX2ZpZWxkKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2NoZW1hLCAnX2ZpZWxkJywgeyBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBsZXQgZmllbGQgPSBzY2hlbWEuX2ZpZWxkO1xuICAgIGxldCBtb2RlbCA9IHJvb3QubW9kZWwgPyByb290Lm1vZGVsIDogcm9vdC5maWVsZEFycmF5ID8gW10gOiB7fTtcbiAgICBpZiAocm9vdC5tb2RlbCAmJiBoYXNLZXkocm9vdCkpIHtcbiAgICAgIG1vZGVsID0geyBbQXJyYXkuaXNBcnJheShyb290LmtleSkgPyByb290LmtleS5qb2luKCcuJykgOiByb290LmtleV06IGdldEZpZWxkVmFsdWUocm9vdCkgfTtcbiAgICB9XG5cbiAgICBtb2RlbCA9IGNsb25lKG1vZGVsKTtcbiAgICBpZiAoIWZpZWxkKSB7XG4gICAgICBmaWVsZCA9IHNjaGVtYS5fZmllbGQgPSByb290Lm9wdGlvbnMuYnVpbGQoe1xuICAgICAgICBmb3JtOiBBcnJheS5pc0FycmF5KG1vZGVsKSA/IG5ldyBGb3JtQXJyYXkoW10pIDogbmV3IEZvcm1Hcm91cCh7fSksXG4gICAgICAgIGZpZWxkR3JvdXA6IFtcbiAgICAgICAgICB0aGlzLl90b0ZpZWxkQ29uZmlnKHNjaGVtYSwge1xuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIHJlc2V0T25IaWRlOiB0cnVlLFxuICAgICAgICAgICAgaWdub3JlRGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIG1hcDogbnVsbCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgbW9kZWwsXG4gICAgICAgIG9wdGlvbnM6IHt9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIChmaWVsZCBhcyBhbnkpLm1vZGVsID0gbW9kZWw7XG4gICAgICByb290Lm9wdGlvbnMuYnVpbGQoZmllbGQpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZC5mb3JtLnZhbGlkO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZUZpZWxkcyhmMTogYW55LCBmMjogYW55KSB7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBmMikge1xuICAgICAgY29uc3QgZjFQcm9wID0gcHJvcCA9PT0gJ3RlbXBsYXRlT3B0aW9ucycgPyAncHJvcHMnIDogcHJvcDtcbiAgICAgIGlmIChpc09iamVjdChmMVtmMVByb3BdKSAmJiBpc09iamVjdChmMltwcm9wXSkpIHtcbiAgICAgICAgZjFbZjFQcm9wXSA9IHRoaXMubWVyZ2VGaWVsZHMoZjFbZjFQcm9wXSwgZjJbcHJvcF0pO1xuICAgICAgfSBlbHNlIGlmIChmMltwcm9wXSAhPSBudWxsKSB7XG4gICAgICAgIGYxW2YxUHJvcF0gPSBmMltwcm9wXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZjE7XG4gIH1cbn1cbiJdfQ==