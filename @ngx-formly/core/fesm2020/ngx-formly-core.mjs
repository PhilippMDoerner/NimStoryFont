import * as i0 from '@angular/core';
import { Type, TemplateRef, ComponentRef, ChangeDetectorRef, ɵNoopNgZone, VERSION, InjectionToken, Injectable, Optional, Directive, Input, ViewContainerRef, Component, ViewChild, EventEmitter, ChangeDetectionStrategy, Output, ContentChildren, Inject, ViewChildren, NgModule } from '@angular/core';
import * as i2 from '@angular/forms';
import { AbstractControl, FormGroup, FormArray, FormControl, NgControl, Validators } from '@angular/forms';
import { isObservable, of, merge, Observable, Subject } from 'rxjs';
import { map, distinctUntilChanged, startWith, debounceTime, filter, switchMap, take, tap } from 'rxjs/operators';
import * as i2$1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i1 from '@angular/platform-browser';

function disableTreeValidityCall(form, callback) {
    const _updateTreeValidity = form._updateTreeValidity.bind(form);
    form._updateTreeValidity = () => { };
    callback();
    form._updateTreeValidity = _updateTreeValidity;
}
function getFieldId(formId, field, index) {
    if (field.id) {
        return field.id;
    }
    let type = field.type;
    if (!type && field.template) {
        type = 'template';
    }
    if (type instanceof Type) {
        type = type.prototype.constructor.name;
    }
    return [formId, type, field.key, index].join('_');
}
function hasKey(field) {
    return !isNil(field.key) && field.key !== '' && (!Array.isArray(field.key) || field.key.length > 0);
}
function getKeyPath(field) {
    if (!hasKey(field)) {
        return [];
    }
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (field._keyPath?.key !== field.key) {
        let path = [];
        if (typeof field.key === 'string') {
            const key = field.key.indexOf('[') === -1 ? field.key : field.key.replace(/\[(\w+)\]/g, '.$1');
            path = key.indexOf('.') !== -1 ? key.split('.') : [key];
        }
        else if (Array.isArray(field.key)) {
            path = field.key.slice(0);
        }
        else {
            path = [`${field.key}`];
        }
        defineHiddenProp(field, '_keyPath', { key: field.key, path });
    }
    return field._keyPath.path.slice(0);
}
const FORMLY_VALIDATORS = ['required', 'pattern', 'minLength', 'maxLength', 'min', 'max'];
function assignFieldValue(field, value) {
    let paths = getKeyPath(field);
    if (paths.length === 0) {
        return;
    }
    let root = field;
    while (root.parent) {
        root = root.parent;
        paths = [...getKeyPath(root), ...paths];
    }
    if (value === undefined && field.resetOnHide) {
        const k = paths.pop();
        const m = paths.reduce((model, path) => model[path] || {}, root.model);
        delete m[k];
        return;
    }
    assignModelValue(root.model, paths, value);
}
function assignModelValue(model, paths, value) {
    for (let i = 0; i < paths.length - 1; i++) {
        const path = paths[i];
        if (!model[path] || !isObject(model[path])) {
            model[path] = /^\d+$/.test(paths[i + 1]) ? [] : {};
        }
        model = model[path];
    }
    model[paths[paths.length - 1]] = clone(value);
}
function getFieldValue(field) {
    let model = field.parent ? field.parent.model : field.model;
    for (const path of getKeyPath(field)) {
        if (!model) {
            return model;
        }
        model = model[path];
    }
    return model;
}
function reverseDeepMerge(dest, ...args) {
    args.forEach((src) => {
        for (const srcArg in src) {
            if (isNil(dest[srcArg]) || isBlankString(dest[srcArg])) {
                dest[srcArg] = clone(src[srcArg]);
            }
            else if (objAndSameType(dest[srcArg], src[srcArg])) {
                reverseDeepMerge(dest[srcArg], src[srcArg]);
            }
        }
    });
    return dest;
}
// check a value is null or undefined
function isNil(value) {
    return value == null;
}
function isUndefined(value) {
    return value === undefined;
}
function isBlankString(value) {
    return value === '';
}
function isFunction(value) {
    return typeof value === 'function';
}
function objAndSameType(obj1, obj2) {
    return (isObject(obj1) &&
        isObject(obj2) &&
        Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2) &&
        !(Array.isArray(obj1) || Array.isArray(obj2)));
}
function isObject(x) {
    return x != null && typeof x === 'object';
}
function isPromise(obj) {
    return !!obj && typeof obj.then === 'function';
}
function clone(value) {
    if (!isObject(value) ||
        isObservable(value) ||
        value instanceof TemplateRef ||
        /* instanceof SafeHtmlImpl */ value.changingThisBreaksApplicationSecurity ||
        ['RegExp', 'FileList', 'File', 'Blob'].indexOf(value.constructor?.name) !== -1) {
        return value;
    }
    if (value instanceof Set) {
        return new Set(value);
    }
    if (value instanceof Map) {
        return new Map(value);
    }
    if (value instanceof Uint8Array) {
        return new Uint8Array(value);
    }
    if (value instanceof Uint16Array) {
        return new Uint16Array(value);
    }
    if (value instanceof Uint32Array) {
        return new Uint32Array(value);
    }
    // https://github.com/moment/moment/blob/master/moment.js#L252
    if (value._isAMomentObject && isFunction(value.clone)) {
        return value.clone();
    }
    if (value instanceof AbstractControl) {
        return null;
    }
    if (value instanceof Date) {
        return new Date(value.getTime());
    }
    if (Array.isArray(value)) {
        return value.slice(0).map((v) => clone(v));
    }
    // best way to clone a js object maybe
    // https://stackoverflow.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance
    const proto = Object.getPrototypeOf(value);
    let c = Object.create(proto);
    c = Object.setPrototypeOf(c, proto);
    // need to make a deep copy so we dont use Object.assign
    // also Object.assign wont copy property descriptor exactly
    return Object.keys(value).reduce((newVal, prop) => {
        const propDesc = Object.getOwnPropertyDescriptor(value, prop);
        if (propDesc.get) {
            Object.defineProperty(newVal, prop, propDesc);
        }
        else {
            newVal[prop] = clone(value[prop]);
        }
        return newVal;
    }, c);
}
function defineHiddenProp(field, prop, defaultValue) {
    Object.defineProperty(field, prop, { enumerable: false, writable: true, configurable: true });
    field[prop] = defaultValue;
}
function observeDeep(source, paths, setFn) {
    let observers = [];
    const unsubscribe = () => {
        observers.forEach((observer) => observer());
        observers = [];
    };
    const observer = observe(source, paths, ({ firstChange, currentValue }) => {
        !firstChange && setFn();
        unsubscribe();
        if (isObject(currentValue) && currentValue.constructor.name === 'Object') {
            Object.keys(currentValue).forEach((prop) => {
                observers.push(observeDeep(source, [...paths, prop], setFn));
            });
        }
    });
    return () => {
        observer.unsubscribe();
        unsubscribe();
    };
}
function observe(o, paths, setFn) {
    if (!o._observers) {
        defineHiddenProp(o, '_observers', {});
    }
    let target = o;
    for (let i = 0; i < paths.length - 1; i++) {
        if (!target[paths[i]] || !isObject(target[paths[i]])) {
            target[paths[i]] = /^\d+$/.test(paths[i + 1]) ? [] : {};
        }
        target = target[paths[i]];
    }
    const key = paths[paths.length - 1];
    const prop = paths.join('.');
    if (!o._observers[prop]) {
        o._observers[prop] = { value: target[key], onChange: [] };
    }
    const state = o._observers[prop];
    if (target[key] !== state.value) {
        state.value = target[key];
    }
    if (setFn && state.onChange.indexOf(setFn) === -1) {
        state.onChange.push(setFn);
        setFn({ currentValue: state.value, firstChange: true });
        if (state.onChange.length >= 1 && isObject(target)) {
            const { enumerable } = Object.getOwnPropertyDescriptor(target, key) || { enumerable: true };
            Object.defineProperty(target, key, {
                enumerable,
                configurable: true,
                get: () => state.value,
                set: (currentValue) => {
                    if (currentValue !== state.value) {
                        const previousValue = state.value;
                        state.value = currentValue;
                        state.onChange.forEach((changeFn) => changeFn({ previousValue, currentValue, firstChange: false }));
                    }
                },
            });
        }
    }
    return {
        setValue(currentValue, emitEvent = true) {
            if (currentValue === state.value) {
                return;
            }
            const previousValue = state.value;
            state.value = currentValue;
            state.onChange.forEach((changeFn) => {
                if (changeFn !== setFn && emitEvent) {
                    changeFn({ previousValue, currentValue, firstChange: false });
                }
            });
        },
        unsubscribe() {
            state.onChange = state.onChange.filter((changeFn) => changeFn !== setFn);
            if (state.onChange.length === 0) {
                delete o._observers[prop];
            }
        },
    };
}
function getField(f, key) {
    key = (Array.isArray(key) ? key.join('.') : key);
    if (!f.fieldGroup) {
        return undefined;
    }
    for (let i = 0, len = f.fieldGroup.length; i < len; i++) {
        const c = f.fieldGroup[i];
        const k = (Array.isArray(c.key) ? c.key.join('.') : c.key);
        if (k === key) {
            return c;
        }
        if (c.fieldGroup && (isNil(k) || key.indexOf(`${k}.`) === 0)) {
            const field = getField(c, isNil(k) ? key : key.slice(k.length + 1));
            if (field) {
                return field;
            }
        }
    }
    return undefined;
}
function markFieldForCheck(field) {
    field._componentRefs?.forEach((ref) => {
        // NOTE: we cannot use ref.changeDetectorRef, see https://github.com/ngx-formly/ngx-formly/issues/2191
        if (ref instanceof ComponentRef) {
            const changeDetectorRef = ref.injector.get(ChangeDetectorRef);
            changeDetectorRef.markForCheck();
        }
        else {
            ref.markForCheck();
        }
    });
}
function isNoopNgZone(ngZone) {
    return ngZone instanceof ɵNoopNgZone;
}
function isHiddenField(field) {
    const isHidden = (f) => f.hide || f.expressions?.hide || f.hideExpression;
    let setDefaultValue = !field.resetOnHide || !isHidden(field);
    if (!isHidden(field) && field.resetOnHide) {
        let parent = field.parent;
        while (parent && !isHidden(parent)) {
            parent = parent.parent;
        }
        setDefaultValue = !parent || !isHidden(parent);
    }
    return !setDefaultValue;
}
function isSignalRequired() {
    return +VERSION.major >= 18 && +VERSION.minor >= 1;
}

/**
 * An InjectionToken for registering additional formly config options (types, wrappers ...).
 */
const FORMLY_CONFIG = new InjectionToken('FORMLY_CONFIG');
/**
 * Maintains list of formly config options. This can be used to register new field type.
 */
class FormlyConfig {
    constructor() {
        this.types = {};
        this.validators = {};
        this.wrappers = {};
        this.messages = {};
        this.extras = {
            checkExpressionOn: 'modelChange',
            lazyRender: true,
            resetFieldOnHide: true,
            renderFormlyFieldElement: true,
            showError(field) {
                return (field.formControl?.invalid &&
                    (field.formControl?.touched || field.options.parentForm?.submitted || !!field.field.validation?.show));
            },
        };
        this.extensions = {};
        this.presets = {};
        this.extensionsByPriority = {};
    }
    addConfig(config) {
        if (config.types) {
            config.types.forEach((type) => this.setType(type));
        }
        if (config.validators) {
            config.validators.forEach((validator) => this.setValidator(validator));
        }
        if (config.wrappers) {
            config.wrappers.forEach((wrapper) => this.setWrapper(wrapper));
        }
        if (config.validationMessages) {
            config.validationMessages.forEach((validation) => this.addValidatorMessage(validation.name, validation.message));
        }
        if (config.extensions) {
            this.setSortedExtensions(config.extensions);
        }
        if (config.extras) {
            this.extras = { ...this.extras, ...config.extras };
        }
        if (config.presets) {
            this.presets = {
                ...this.presets,
                ...config.presets.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.config }), {}),
            };
        }
    }
    /**
     * Allows you to specify a custom type which you can use in your field configuration.
     * You can pass an object of options, or an array of objects of options.
     */
    setType(options) {
        if (Array.isArray(options)) {
            options.forEach((option) => this.setType(option));
        }
        else {
            if (!this.types[options.name]) {
                this.types[options.name] = { name: options.name };
            }
            ['component', 'extends', 'defaultOptions', 'wrappers'].forEach((prop) => {
                if (options.hasOwnProperty(prop)) {
                    this.types[options.name][prop] = options[prop];
                }
            });
        }
    }
    getType(name, throwIfNotFound = false) {
        if (name instanceof Type) {
            return { component: name, name: name.prototype.constructor.name };
        }
        if (!this.types[name]) {
            if (throwIfNotFound) {
                throw new Error(`[Formly Error] The type "${name}" could not be found. Please make sure that is registered through the FormlyModule declaration.`);
            }
            return null;
        }
        this.mergeExtendedType(name);
        return this.types[name];
    }
    /** @ignore */
    getMergedField(field = {}) {
        const type = this.getType(field.type);
        if (!type) {
            return;
        }
        if (type.defaultOptions) {
            reverseDeepMerge(field, type.defaultOptions);
        }
        const extendDefaults = type.extends && this.getType(type.extends).defaultOptions;
        if (extendDefaults) {
            reverseDeepMerge(field, extendDefaults);
        }
        if (field?.optionsTypes) {
            field.optionsTypes.forEach((option) => {
                const defaultOptions = this.getType(option).defaultOptions;
                if (defaultOptions) {
                    reverseDeepMerge(field, defaultOptions);
                }
            });
        }
        const componentRef = this.resolveFieldTypeRef(field);
        if (componentRef?.instance?.defaultOptions) {
            reverseDeepMerge(field, componentRef.instance.defaultOptions);
        }
        if (!field.wrappers && type.wrappers) {
            field.wrappers = [...type.wrappers];
        }
    }
    /** @ignore @internal */
    resolveFieldTypeRef(field = {}) {
        const type = this.getType(field.type);
        if (!type) {
            return null;
        }
        if (!type.component || type._componentRef) {
            return type._componentRef;
        }
        const { _viewContainerRef, _injector } = field.options;
        if (!_viewContainerRef || !_injector) {
            return null;
        }
        const componentRef = _viewContainerRef.createComponent(type.component, { injector: _injector });
        defineHiddenProp(type, '_componentRef', componentRef);
        try {
            componentRef.destroy();
        }
        catch (e) {
            console.error(`An error occurred while destroying the Formly component type "${field.type}"`, e);
        }
        return type._componentRef;
    }
    setWrapper(options) {
        this.wrappers[options.name] = options;
        if (options.types) {
            options.types.forEach((type) => {
                this.setTypeWrapper(type, options.name);
            });
        }
    }
    getWrapper(name) {
        if (name instanceof Type) {
            return { component: name, name: name.prototype.constructor.name };
        }
        if (!this.wrappers[name]) {
            throw new Error(`[Formly Error] The wrapper "${name}" could not be found. Please make sure that is registered through the FormlyModule declaration.`);
        }
        return this.wrappers[name];
    }
    /** @ignore */
    setTypeWrapper(type, name) {
        if (!this.types[type]) {
            this.types[type] = {};
        }
        if (!this.types[type].wrappers) {
            this.types[type].wrappers = [];
        }
        if (this.types[type].wrappers.indexOf(name) === -1) {
            this.types[type].wrappers.push(name);
        }
    }
    setValidator(options) {
        this.validators[options.name] = options;
    }
    getValidator(name) {
        if (!this.validators[name]) {
            throw new Error(`[Formly Error] The validator "${name}" could not be found. Please make sure that is registered through the FormlyModule declaration.`);
        }
        return this.validators[name];
    }
    addValidatorMessage(name, message) {
        this.messages[name] = message;
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            const deprecated = { minlength: 'minLength', maxlength: 'maxLength' };
            if (deprecated[name]) {
                console.warn(`Formly deprecation: passing validation messages key '${name}' is deprecated since v6.0, use '${deprecated[name]}' instead.`);
                this.messages[deprecated[name]] = message;
            }
        }
    }
    getValidatorMessage(name) {
        return this.messages[name];
    }
    setSortedExtensions(extensionOptions) {
        // insert new extensions, grouped by priority
        extensionOptions.forEach((extensionOption) => {
            const priority = extensionOption.priority ?? 1;
            this.extensionsByPriority[priority] = {
                ...this.extensionsByPriority[priority],
                [extensionOption.name]: extensionOption.extension,
            };
        });
        // flatten extensions object with sorted keys
        this.extensions = Object.keys(this.extensionsByPriority)
            .map(Number)
            .sort((a, b) => a - b)
            .reduce((acc, prio) => ({
            ...acc,
            ...this.extensionsByPriority[prio],
        }), {});
    }
    mergeExtendedType(name) {
        if (!this.types[name].extends) {
            return;
        }
        const extendedType = this.getType(this.types[name].extends);
        if (!this.types[name].component) {
            this.types[name].component = extendedType.component;
        }
        if (!this.types[name].wrappers) {
            this.types[name].wrappers = extendedType.wrappers;
        }
    }
}
FormlyConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormlyConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyConfig, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class FormlyFormBuilder {
    constructor(config, injector, viewContainerRef, parentForm) {
        this.config = config;
        this.injector = injector;
        this.viewContainerRef = viewContainerRef;
        this.parentForm = parentForm;
    }
    buildForm(form, fieldGroup = [], model, options) {
        this.build({ fieldGroup, model, form, options });
    }
    build(field) {
        if (!this.config.extensions.core) {
            throw new Error('NgxFormly: missing `forRoot()` call. use `forRoot()` when registering the `FormlyModule`.');
        }
        if (!field.parent) {
            this._setOptions(field);
        }
        disableTreeValidityCall(field.form, () => {
            this._build(field);
            // TODO: add test for https://github.com/ngx-formly/ngx-formly/issues/3910
            if (!field.parent || field.fieldArray) {
                // detect changes early to avoid reset value by hidden fields
                const options = field.options;
                if (field.parent && isHiddenField(field)) {
                    // when hide is used in expression set defaul value will not be set until detect hide changes
                    // which causes default value not set on new item is added
                    options._hiddenFieldsForCheck?.push({ field, default: false });
                }
                options.checkExpressions?.(field, true);
                options._detectChanges?.(field);
            }
        });
    }
    _build(field) {
        if (!field) {
            return;
        }
        const extensions = Object.values(this.config.extensions);
        extensions.forEach((extension) => extension.prePopulate?.(field));
        extensions.forEach((extension) => extension.onPopulate?.(field));
        field.fieldGroup?.forEach((f) => this._build(f));
        extensions.forEach((extension) => extension.postPopulate?.(field));
    }
    _setOptions(field) {
        field.form = field.form || new FormGroup({});
        field.model = field.model || {};
        field.options = field.options || {};
        const options = field.options;
        if (!options._viewContainerRef) {
            defineHiddenProp(options, '_viewContainerRef', this.viewContainerRef);
        }
        if (!options._injector) {
            defineHiddenProp(options, '_injector', this.injector);
        }
        if (!options.build) {
            options._buildForm = () => {
                console.warn(`Formly: 'options._buildForm' is deprecated since v6.0, use 'options.build' instead.`);
                this.build(field);
            };
            options.build = (f = field) => {
                this.build(f);
                return f;
            };
        }
        if (!options.parentForm && this.parentForm) {
            defineHiddenProp(options, 'parentForm', this.parentForm);
            if (!isSignalRequired()) {
                observe(options, ['parentForm', 'submitted'], ({ firstChange }) => {
                    if (!firstChange) {
                        options.detectChanges(field);
                    }
                });
            }
        }
    }
}
FormlyFormBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, deps: [{ token: FormlyConfig }, { token: i0.Injector }, { token: i0.ViewContainerRef, optional: true }, { token: i2.FormGroupDirective, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
FormlyFormBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: FormlyConfig }, { type: i0.Injector }, { type: i0.ViewContainerRef, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }]; } });

function unregisterControl(field, emitEvent = false) {
    const control = field.formControl;
    const fieldIndex = control._fields ? control._fields.indexOf(field) : -1;
    if (fieldIndex !== -1) {
        control._fields.splice(fieldIndex, 1);
    }
    const form = control.parent;
    if (!form) {
        return;
    }
    const opts = { emitEvent };
    if (form instanceof FormArray) {
        const key = form.controls.findIndex((c) => c === control);
        if (key !== -1) {
            form.removeAt(key, opts);
        }
    }
    else if (form instanceof FormGroup) {
        const paths = getKeyPath(field);
        const key = paths[paths.length - 1];
        if (form.get([key]) === control) {
            form.removeControl(key, opts);
        }
    }
    control.setParent(null);
}
function findControl(field) {
    if (field.formControl) {
        return field.formControl;
    }
    if (field.shareFormControl === false) {
        return null;
    }
    return field.form?.get(getKeyPath(field));
}
function registerControl(field, control, emitEvent = false) {
    control = control || field.formControl;
    if (!control._fields) {
        defineHiddenProp(control, '_fields', []);
    }
    if (control._fields.indexOf(field) === -1) {
        control._fields.push(field);
    }
    if (!field.formControl && control) {
        defineHiddenProp(field, 'formControl', control);
        control.setValidators(null);
        control.setAsyncValidators(null);
        field.props.disabled = !!field.props.disabled;
        const disabledObserver = observe(field, ['props', 'disabled'], ({ firstChange, currentValue }) => {
            if (!firstChange) {
                currentValue ? field.formControl.disable() : field.formControl.enable();
            }
        });
        if (control instanceof FormControl) {
            control.registerOnDisabledChange(disabledObserver.setValue);
        }
    }
    if (!field.form || !hasKey(field)) {
        return;
    }
    let form = field.form;
    const paths = getKeyPath(field);
    const value = getFieldValue(field);
    if (!(isNil(control.value) && isNil(value)) && control.value !== value && control instanceof FormControl) {
        control.patchValue(value);
    }
    for (let i = 0; i < paths.length - 1; i++) {
        const path = paths[i];
        if (!form.get([path])) {
            form.setControl(path, new FormGroup({}), { emitEvent });
        }
        form = form.get([path]);
    }
    const key = paths[paths.length - 1];
    if (!field._hide && form.get([key]) !== control) {
        form.setControl(key, control, { emitEvent });
    }
}
function updateValidity(c, onlySelf = false) {
    const status = c.status;
    const value = c.value;
    c.updateValueAndValidity({ emitEvent: false, onlySelf });
    if (status !== c.status) {
        c.statusChanges.emit(c.status);
    }
    if (value !== c.value) {
        c.valueChanges.emit(c.value);
    }
}
function clearControl(form) {
    delete form?._fields;
    form.setValidators(null);
    form.setAsyncValidators(null);
    if (form instanceof FormGroup || form instanceof FormArray) {
        Object.values(form.controls).forEach((c) => clearControl(c));
    }
}

class FormlyTemplate {
    constructor(ref) {
        this.ref = ref;
    }
    ngOnChanges() {
        this.name = this.name || 'formly-group';
    }
}
FormlyTemplate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyTemplate, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
FormlyTemplate.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FormlyTemplate, selector: "[formlyTemplate]", inputs: { name: ["formlyTemplate", "name"] }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyTemplate, decorators: [{
            type: Directive,
            args: [{ selector: '[formlyTemplate]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { name: [{
                type: Input,
                args: ['formlyTemplate']
            }] } });
// workarround for https://github.com/angular/angular/issues/43227#issuecomment-904173738
class FormlyFieldTemplates {
}
FormlyFieldTemplates.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldTemplates, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormlyFieldTemplates.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldTemplates });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldTemplates, decorators: [{
            type: Injectable
        }] });

/**
 * The `<formly-field>` component is used to render the UI widget (layout + type) of a given `field`.
 */
class FormlyField {
    constructor(config, renderer, _elementRef, hostContainerRef, form) {
        this.config = config;
        this.renderer = renderer;
        this._elementRef = _elementRef;
        this.hostContainerRef = hostContainerRef;
        this.form = form;
        this.hostObservers = [];
        this.componentRefs = [];
        this.hooksObservers = [];
        this.detectFieldBuild = false;
        this.valueChangesUnsubscribe = () => { };
    }
    get containerRef() {
        return this.config.extras.renderFormlyFieldElement ? this.viewContainerRef : this.hostContainerRef;
    }
    get elementRef() {
        if (this.config.extras.renderFormlyFieldElement) {
            return this._elementRef;
        }
        if (this.componentRefs?.[0] instanceof ComponentRef) {
            return this.componentRefs[0].location;
        }
        return null;
    }
    ngAfterContentInit() {
        this.triggerHook('afterContentInit');
    }
    ngAfterViewInit() {
        this.triggerHook('afterViewInit');
    }
    ngDoCheck() {
        if (this.detectFieldBuild && this.field && this.field.options) {
            this.render();
        }
    }
    ngOnInit() {
        this.triggerHook('onInit');
    }
    ngOnChanges(changes) {
        this.triggerHook('onChanges', changes);
    }
    ngOnDestroy() {
        this.resetRefs(this.field);
        this.hostObservers.forEach((hostObserver) => hostObserver.unsubscribe());
        this.hooksObservers.forEach((unsubscribe) => unsubscribe());
        this.valueChangesUnsubscribe();
        this.triggerHook('onDestroy');
    }
    renderField(containerRef, f, wrappers = []) {
        if (this.containerRef === containerRef) {
            this.resetRefs(this.field);
            this.containerRef.clear();
            wrappers = this.field?.wrappers;
        }
        if (wrappers?.length > 0) {
            const [wrapper, ...wps] = wrappers;
            const { component } = this.config.getWrapper(wrapper);
            const ref = containerRef.createComponent(component);
            this.attachComponentRef(ref, f);
            observe(ref.instance, ['fieldComponent'], ({ currentValue, previousValue, firstChange }) => {
                if (currentValue) {
                    if (previousValue && previousValue._lContainer === currentValue._lContainer) {
                        return;
                    }
                    const viewRef = previousValue ? previousValue.detach() : null;
                    if (viewRef && !viewRef.destroyed) {
                        currentValue.insert(viewRef);
                    }
                    else {
                        this.renderField(currentValue, f, wps);
                    }
                    !firstChange && ref.changeDetectorRef.detectChanges();
                }
            });
        }
        else if (f?.type) {
            const inlineType = this.form?.templates?.find((ref) => ref.name === f.type);
            let ref;
            if (inlineType) {
                ref = containerRef.createEmbeddedView(inlineType.ref, { $implicit: f });
            }
            else {
                const { component } = this.config.getType(f.type, true);
                ref = containerRef.createComponent(component);
            }
            this.attachComponentRef(ref, f);
        }
    }
    triggerHook(name, changes) {
        if (name === 'onInit' || (name === 'onChanges' && changes.field && !changes.field.firstChange)) {
            this.valueChangesUnsubscribe();
            this.valueChangesUnsubscribe = this.fieldChanges(this.field);
        }
        if (this.field?.hooks?.[name]) {
            if (!changes || changes.field) {
                const r = this.field.hooks[name](this.field);
                if (isObservable(r) && ['onInit', 'afterContentInit', 'afterViewInit'].indexOf(name) !== -1) {
                    const sub = r.subscribe();
                    this.hooksObservers.push(() => sub.unsubscribe());
                }
            }
        }
        if (name === 'onChanges' && changes.field) {
            this.resetRefs(changes.field.previousValue);
            this.render();
        }
    }
    attachComponentRef(ref, field) {
        this.componentRefs.push(ref);
        field._componentRefs.push(ref);
        if (ref instanceof ComponentRef) {
            Object.assign(ref.instance, { field });
        }
    }
    render() {
        if (!this.field) {
            return;
        }
        // require Formly build
        if (!this.field.options) {
            this.detectFieldBuild = true;
            return;
        }
        this.detectFieldBuild = false;
        this.hostObservers.forEach((hostObserver) => hostObserver.unsubscribe());
        this.hostObservers = [
            observe(this.field, ['hide'], ({ firstChange, currentValue }) => {
                const containerRef = this.containerRef;
                if (this.config.extras.lazyRender === false) {
                    firstChange && this.renderField(containerRef, this.field);
                    if (!firstChange || (firstChange && currentValue)) {
                        this.elementRef &&
                            this.renderer.setStyle(this.elementRef.nativeElement, 'display', currentValue ? 'none' : '');
                    }
                }
                else {
                    if (currentValue) {
                        containerRef.clear();
                        if (this.field.className) {
                            this.renderer.removeAttribute(this.elementRef.nativeElement, 'class');
                        }
                    }
                    else {
                        this.renderField(containerRef, this.field);
                        if (this.field.className) {
                            this.renderer.setAttribute(this.elementRef.nativeElement, 'class', this.field.className);
                        }
                    }
                }
                !firstChange && this.field.options.detectChanges(this.field);
            }),
            observe(this.field, ['className'], ({ firstChange, currentValue }) => {
                if ((!firstChange || (firstChange && currentValue)) &&
                    (!this.config.extras.lazyRender || this.field.hide !== true)) {
                    this.elementRef && this.renderer.setAttribute(this.elementRef.nativeElement, 'class', currentValue);
                }
            }),
        ];
        if (!isSignalRequired()) {
            ['touched', 'pristine', 'status'].forEach((prop) => this.hostObservers.push(observe(this.field, ['formControl', prop], ({ firstChange }) => !firstChange && markFieldForCheck(this.field))));
        }
        else if (this.field.formControl) {
            const events = this.field.formControl.events.subscribe(() => markFieldForCheck(this.field));
            this.hostObservers.push(events);
        }
    }
    resetRefs(field) {
        if (field) {
            if (field._localFields) {
                field._localFields = [];
            }
            else {
                defineHiddenProp(this.field, '_localFields', []);
            }
            if (field._componentRefs) {
                field._componentRefs = field._componentRefs.filter((ref) => this.componentRefs.indexOf(ref) === -1);
            }
            else {
                defineHiddenProp(this.field, '_componentRefs', []);
            }
        }
        this.componentRefs = [];
    }
    fieldChanges(field) {
        if (!field) {
            return () => { };
        }
        const propsObserver = observeDeep(field, ['props'], () => field.options.detectChanges(field));
        let subscribes = [
            () => {
                propsObserver();
            },
        ];
        for (const key of Object.keys(field._expressions || {})) {
            const expressionObserver = observe(field, ['_expressions', key], ({ currentValue, previousValue }) => {
                if (previousValue?.subscription) {
                    previousValue.subscription.unsubscribe();
                    previousValue.subscription = null;
                }
                if (isObservable(currentValue.value$)) {
                    currentValue.subscription = currentValue.value$.subscribe();
                }
            });
            subscribes.push(() => {
                if (field._expressions[key]?.subscription) {
                    field._expressions[key].subscription.unsubscribe();
                }
                expressionObserver.unsubscribe();
            });
        }
        for (const path of [['focus'], ['template'], ['fieldGroupClassName'], ['validation', 'show']]) {
            const fieldObserver = observe(field, path, ({ firstChange }) => !firstChange && field.options.detectChanges(field));
            subscribes.push(() => fieldObserver.unsubscribe());
        }
        if (field.formControl && !field.fieldGroup) {
            const control = field.formControl;
            let valueChanges = control.valueChanges.pipe(map((value) => {
                field.parsers?.map((parserFn) => (value = parserFn(value, field)));
                if (!Object.is(value, field.formControl.value)) {
                    field.formControl.setValue(value);
                }
                return value;
            }), distinctUntilChanged((x, y) => {
                if (x !== y || Array.isArray(x) || isObject(x)) {
                    return false;
                }
                return true;
            }));
            if (control.value !== getFieldValue(field)) {
                valueChanges = valueChanges.pipe(startWith(control.value));
            }
            const { updateOn, debounce } = field.modelOptions;
            if ((!updateOn || updateOn === 'change') && debounce?.default > 0) {
                valueChanges = control.valueChanges.pipe(debounceTime(debounce.default));
            }
            const sub = valueChanges.subscribe((value) => {
                // workaround for https://github.com/angular/angular/issues/13792
                if (control._fields?.length > 1 && control instanceof FormControl) {
                    control.patchValue(value, { emitEvent: false, onlySelf: true });
                }
                if (hasKey(field)) {
                    assignFieldValue(field, value);
                }
                field.options.fieldChanges.next({ value, field, type: 'valueChanges' });
            });
            subscribes.push(() => sub.unsubscribe());
        }
        let templateFieldsSubs = [];
        observe(field, ['_localFields'], ({ currentValue }) => {
            templateFieldsSubs.forEach((unsubscribe) => unsubscribe());
            templateFieldsSubs = (currentValue || []).map((f) => this.fieldChanges(f));
        });
        return () => {
            subscribes.forEach((unsubscribe) => unsubscribe());
            templateFieldsSubs.forEach((unsubscribe) => unsubscribe());
        };
    }
}
FormlyField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyField, deps: [{ token: FormlyConfig }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: FormlyFieldTemplates, optional: true }], target: i0.ɵɵFactoryTarget.Component });
FormlyField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyField, selector: "formly-field", inputs: { field: "field" }, viewQueries: [{ propertyName: "viewContainerRef", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-template #container></ng-template>', isInline: true, styles: [":host:empty{display:none}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyField, decorators: [{
            type: Component,
            args: [{ selector: 'formly-field', template: '<ng-template #container></ng-template>', styles: [":host:empty{display:none}\n"] }]
        }], ctorParameters: function () { return [{ type: FormlyConfig }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: FormlyFieldTemplates, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { field: [{
                type: Input
            }], viewContainerRef: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }] } });

/**
 * The `<form-form>` component is the main container of the form,
 * which takes care of managing the form state
 * and delegates the rendering of each field to `<formly-field>` component.
 */
class FormlyForm {
    constructor(builder, config, ngZone, fieldTemplates) {
        this.builder = builder;
        this.config = config;
        this.ngZone = ngZone;
        this.fieldTemplates = fieldTemplates;
        /** Event that is emitted when the model value is changed */
        this.modelChange = new EventEmitter();
        this.field = { type: 'formly-group' };
        this._modelChangeValue = {};
        this.valueChangesUnsubscribe = () => { };
    }
    /** The form instance which allow to track model value and validation status. */
    set form(form) {
        this.field.form = form;
    }
    get form() {
        return this.field.form;
    }
    /** The model to be represented by the form. */
    set model(model) {
        if (this.config.extras.immutable && this._modelChangeValue === model) {
            return;
        }
        this.setField({ model });
    }
    get model() {
        return this.field.model;
    }
    /** The field configurations for building the form. */
    set fields(fieldGroup) {
        this.setField({ fieldGroup });
    }
    get fields() {
        return this.field.fieldGroup;
    }
    /** Options for the form. */
    set options(options) {
        this.setField({ options });
    }
    get options() {
        return this.field.options;
    }
    set templates(templates) {
        this.fieldTemplates.templates = templates;
    }
    ngDoCheck() {
        if (this.config.extras.checkExpressionOn === 'changeDetectionCheck') {
            this.checkExpressionChange();
        }
    }
    ngOnChanges(changes) {
        if (changes.fields && this.form) {
            clearControl(this.form);
        }
        if (changes.fields || changes.form || (changes.model && this._modelChangeValue !== changes.model.currentValue)) {
            this.valueChangesUnsubscribe();
            this.builder.build(this.field);
            this.valueChangesUnsubscribe = this.valueChanges();
        }
    }
    ngOnDestroy() {
        this.valueChangesUnsubscribe();
    }
    checkExpressionChange() {
        this.field.options.checkExpressions?.(this.field);
    }
    valueChanges() {
        this.valueChangesUnsubscribe();
        let formEvents = null;
        if (isSignalRequired()) {
            let submitted = this.options?.parentForm?.submitted;
            formEvents = this.form.events.subscribe(() => {
                if (submitted !== this.options?.parentForm?.submitted) {
                    this.options.detectChanges(this.field);
                    submitted = this.options?.parentForm?.submitted;
                }
            });
        }
        let fieldChangesDetection = [];
        const valueChanges = this.field.options.fieldChanges
            .pipe(filter(({ field, type }) => hasKey(field) && type === 'valueChanges'), switchMap(() => (isNoopNgZone(this.ngZone) ? of(null) : this.ngZone.onStable.asObservable().pipe(take(1)))))
            .subscribe(() => this.ngZone.runGuarded(() => {
            // runGuarded is used to keep in sync the expression changes
            // https://github.com/ngx-formly/ngx-formly/issues/2095
            this.checkExpressionChange();
            if (this.field.options) {
                fieldChangesDetection.push(observeDeep(this.field.options, ['formState'], () => this.field.options.detectChanges(this.field)));
            }
            this.modelChange.emit((this._modelChangeValue = clone(this.model)));
        }));
        return () => {
            fieldChangesDetection.forEach((fnc) => fnc());
            formEvents?.unsubscribe();
            valueChanges.unsubscribe();
        };
    }
    setField(field) {
        if (this.config.extras.immutable) {
            this.field = { ...this.field, ...clone(field) };
        }
        else {
            Object.keys(field).forEach((p) => (this.field[p] = field[p]));
        }
    }
}
FormlyForm.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyForm, deps: [{ token: FormlyFormBuilder }, { token: FormlyConfig }, { token: i0.NgZone }, { token: FormlyFieldTemplates }], target: i0.ɵɵFactoryTarget.Component });
FormlyForm.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyForm, selector: "formly-form", inputs: { form: "form", model: "model", fields: "fields", options: "options" }, outputs: { modelChange: "modelChange" }, providers: [FormlyFormBuilder, FormlyFieldTemplates], queries: [{ propertyName: "templates", predicate: FormlyTemplate }], usesOnChanges: true, ngImport: i0, template: '<formly-field [field]="field"></formly-field>', isInline: true, components: [{ type: FormlyField, selector: "formly-field", inputs: ["field"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyForm, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-form',
                    template: '<formly-field [field]="field"></formly-field>',
                    providers: [FormlyFormBuilder, FormlyFieldTemplates],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: FormlyFormBuilder }, { type: FormlyConfig }, { type: i0.NgZone }, { type: FormlyFieldTemplates }]; }, propDecorators: { form: [{
                type: Input
            }], model: [{
                type: Input
            }], fields: [{
                type: Input
            }], options: [{
                type: Input
            }], modelChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [FormlyTemplate]
            }] } });

/**
 * Allow to link the `field` HTML attributes (`id`, `name` ...) and Event attributes (`focus`, `blur` ...) to an element in the DOM.
 */
class FormlyAttributes {
    constructor(renderer, elementRef, _document) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.uiAttributesCache = {};
        /**
         * HostBinding doesn't register listeners conditionally which may produce some perf issues.
         *
         * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1991
         */
        this.uiEvents = {
            listeners: [],
            events: ['click', 'keyup', 'keydown', 'keypress', 'focus', 'blur', 'change'],
            callback: (eventName, $event) => {
                switch (eventName) {
                    case 'focus':
                        return this.onFocus($event);
                    case 'blur':
                        return this.onBlur($event);
                    case 'change':
                        return this.onChange($event);
                    default:
                        return this.props[eventName](this.field, $event);
                }
            },
        };
        this.document = _document;
    }
    get props() {
        return this.field.props || {};
    }
    get fieldAttrElements() {
        return this.field?.['_elementRefs'] || [];
    }
    ngOnChanges(changes) {
        if (changes.field) {
            this.field.name && this.setAttribute('name', this.field.name);
            this.uiEvents.listeners.forEach((listener) => listener());
            this.uiEvents.events.forEach((eventName) => {
                if (this.props?.[eventName] || ['focus', 'blur', 'change'].indexOf(eventName) !== -1) {
                    this.uiEvents.listeners.push(this.renderer.listen(this.elementRef.nativeElement, eventName, (e) => this.uiEvents.callback(eventName, e)));
                }
            });
            if (this.props?.attributes) {
                observe(this.field, ['props', 'attributes'], ({ currentValue, previousValue }) => {
                    if (previousValue) {
                        Object.keys(previousValue).forEach((attr) => this.removeAttribute(attr));
                    }
                    if (currentValue) {
                        Object.keys(currentValue).forEach((attr) => {
                            if (currentValue[attr] != null) {
                                this.setAttribute(attr, currentValue[attr]);
                            }
                        });
                    }
                });
            }
            this.detachElementRef(changes.field.previousValue);
            this.attachElementRef(changes.field.currentValue);
            if (this.fieldAttrElements.length === 1) {
                !this.id && this.field.id && this.setAttribute('id', this.field.id);
                this.focusObserver = observe(this.field, ['focus'], ({ currentValue }) => {
                    this.toggleFocus(currentValue);
                });
            }
        }
        if (changes.id) {
            this.setAttribute('id', this.id);
        }
    }
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     */
    ngDoCheck() {
        if (!this.uiAttributes) {
            const element = this.elementRef.nativeElement;
            this.uiAttributes = [...FORMLY_VALIDATORS, 'tabindex', 'placeholder', 'readonly', 'disabled', 'step'].filter((attr) => !element.hasAttribute || !element.hasAttribute(attr));
        }
        for (let i = 0; i < this.uiAttributes.length; i++) {
            const attr = this.uiAttributes[i];
            const value = this.props[attr];
            if (this.uiAttributesCache[attr] !== value &&
                (!this.props.attributes || !this.props.attributes.hasOwnProperty(attr.toLowerCase()))) {
                this.uiAttributesCache[attr] = value;
                if (value || value === 0) {
                    this.setAttribute(attr, value === true ? attr : `${value}`);
                }
                else {
                    this.removeAttribute(attr);
                }
            }
        }
    }
    ngOnDestroy() {
        this.uiEvents.listeners.forEach((listener) => listener());
        this.detachElementRef(this.field);
        this.focusObserver?.unsubscribe();
    }
    toggleFocus(value) {
        const element = this.fieldAttrElements ? this.fieldAttrElements[0] : null;
        if (!element || !element.nativeElement.focus) {
            return;
        }
        const isFocused = !!this.document.activeElement &&
            this.fieldAttrElements.some(({ nativeElement }) => this.document.activeElement === nativeElement || nativeElement.contains(this.document.activeElement));
        if (value && !isFocused) {
            Promise.resolve().then(() => element.nativeElement.focus());
        }
        else if (!value && isFocused) {
            Promise.resolve().then(() => element.nativeElement.blur());
        }
    }
    onFocus($event) {
        this.focusObserver?.setValue(true);
        this.props.focus?.(this.field, $event);
    }
    onBlur($event) {
        this.focusObserver?.setValue(false);
        this.props.blur?.(this.field, $event);
    }
    // handle custom `change` event, for regular ones rely on DOM listener
    onHostChange($event) {
        if ($event instanceof Event) {
            return;
        }
        this.onChange($event);
    }
    onChange($event) {
        this.props.change?.(this.field, $event);
        this.field.formControl?.markAsDirty();
    }
    attachElementRef(f) {
        if (!f) {
            return;
        }
        if (f['_elementRefs']?.indexOf(this.elementRef) === -1) {
            f['_elementRefs'].push(this.elementRef);
        }
        else {
            defineHiddenProp(f, '_elementRefs', [this.elementRef]);
        }
    }
    detachElementRef(f) {
        const index = f?.['_elementRefs'] ? this.fieldAttrElements.indexOf(this.elementRef) : -1;
        if (index !== -1) {
            f['_elementRefs'].splice(index, 1);
        }
    }
    setAttribute(attr, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attr, value);
    }
    removeAttribute(attr) {
        this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
    }
}
FormlyAttributes.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyAttributes, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
FormlyAttributes.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FormlyAttributes, selector: "[formlyAttributes]", inputs: { field: ["formlyAttributes", "field"], id: "id" }, host: { listeners: { "change": "onHostChange($event)" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyAttributes, decorators: [{
            type: Directive,
            args: [{
                    selector: '[formlyAttributes]',
                    host: {
                        '(change)': 'onHostChange($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { field: [{
                type: Input,
                args: ['formlyAttributes']
            }], id: [{
                type: Input
            }] } });

class FieldType {
    constructor() {
        this.field = {};
    }
    set _formlyControls(controls) {
        const f = this.field;
        f._localFields = controls
            .map((c) => c.control._fields || [])
            .flat()
            .filter((f) => f.formControl !== this.field.formControl);
    }
    get model() {
        return this.field.model;
    }
    get form() {
        return this.field.form;
    }
    get options() {
        return this.field.options;
    }
    get key() {
        return this.field.key;
    }
    get formControl() {
        return this.field.formControl;
    }
    get props() {
        return (this.field.props || {});
    }
    /** @deprecated Use `props` instead. */
    get to() {
        return this.props;
    }
    get showError() {
        return this.options.showError(this);
    }
    get id() {
        return this.field.id;
    }
    get formState() {
        return this.options?.formState || {};
    }
}
FieldType.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldType, deps: [], target: i0.ɵɵFactoryTarget.Directive });
FieldType.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FieldType, inputs: { field: "field" }, viewQueries: [{ propertyName: "_formlyControls", predicate: NgControl, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldType, decorators: [{
            type: Directive
        }], propDecorators: { _formlyControls: [{
                type: ViewChildren,
                args: [NgControl]
            }], field: [{
                type: Input
            }] } });

/** @ignore */
class FormlyGroup extends FieldType {
}
FormlyGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyGroup, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyGroup, selector: "formly-group", host: { properties: { "class": "field.fieldGroupClassName || \"\"" } }, usesInheritance: true, ngImport: i0, template: `
    <formly-field *ngFor="let f of field.fieldGroup" [field]="f"></formly-field>
    <ng-content></ng-content>
  `, isInline: true, components: [{ type: FormlyField, selector: "formly-field", inputs: ["field"] }], directives: [{ type: i2$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-group',
                    template: `
    <formly-field *ngFor="let f of field.fieldGroup" [field]="f"></formly-field>
    <ng-content></ng-content>
  `,
                    host: {
                        '[class]': 'field.fieldGroupClassName || ""',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });

/**
 * The `<formly-validation-message>` component renders the error message of a given `field`.
 */
class FormlyValidationMessage {
    constructor(config) {
        this.config = config;
    }
    ngOnChanges() {
        const EXPR_VALIDATORS = FORMLY_VALIDATORS.map((v) => `templateOptions.${v}`);
        this.errorMessage$ = merge(this.field.formControl.statusChanges, !this.field.options
            ? of(null)
            : this.field.options.fieldChanges.pipe(filter(({ field, type, property }) => {
                return (field === this.field &&
                    type === 'expressionChanges' &&
                    (property.indexOf('validation') !== -1 || EXPR_VALIDATORS.indexOf(property) !== -1));
            }))).pipe(startWith(null), switchMap(() => (isObservable(this.errorMessage) ? this.errorMessage : of(this.errorMessage))));
    }
    get errorMessage() {
        const fieldForm = this.field.formControl;
        for (const error in fieldForm.errors) {
            if (fieldForm.errors.hasOwnProperty(error)) {
                let message = this.config.getValidatorMessage(error);
                if (isObject(fieldForm.errors[error])) {
                    if (fieldForm.errors[error].errorPath) {
                        return undefined;
                    }
                    if (fieldForm.errors[error].message) {
                        message = fieldForm.errors[error].message;
                    }
                }
                if (this.field.validation?.messages?.[error]) {
                    message = this.field.validation.messages[error];
                }
                if (this.field.validators?.[error]?.message) {
                    message = this.field.validators[error].message;
                }
                if (this.field.asyncValidators?.[error]?.message) {
                    message = this.field.asyncValidators[error].message;
                }
                if (typeof message === 'function') {
                    return message(fieldForm.errors[error], this.field);
                }
                return message;
            }
        }
        return undefined;
    }
}
FormlyValidationMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyValidationMessage, deps: [{ token: FormlyConfig }], target: i0.ɵɵFactoryTarget.Component });
FormlyValidationMessage.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyValidationMessage, selector: "formly-validation-message", inputs: { field: "field" }, usesOnChanges: true, ngImport: i0, template: '{{ errorMessage$ | async }}', isInline: true, pipes: { "async": i2$1.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyValidationMessage, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-validation-message',
                    template: '{{ errorMessage$ | async }}',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: FormlyConfig }]; }, propDecorators: { field: [{
                type: Input
            }] } });

class FieldArrayType extends FieldType {
    onPopulate(field) {
        if (hasKey(field)) {
            const control = findControl(field);
            registerControl(field, control ? control : new FormArray([], { updateOn: field.modelOptions.updateOn }));
        }
        field.fieldGroup = field.fieldGroup || [];
        const length = Array.isArray(field.model) ? field.model.length : 0;
        if (field.fieldGroup.length > length) {
            for (let i = field.fieldGroup.length - 1; i >= length; --i) {
                unregisterControl(field.fieldGroup[i], true);
                field.fieldGroup.splice(i, 1);
            }
        }
        for (let i = field.fieldGroup.length; i < length; i++) {
            const f = { ...clone(typeof field.fieldArray === 'function' ? field.fieldArray(field) : field.fieldArray) };
            if (f.key !== null) {
                f.key = `${i}`;
            }
            field.fieldGroup.push(f);
        }
    }
    add(i, initialModel, { markAsDirty } = { markAsDirty: true }) {
        markAsDirty && this.formControl.markAsDirty();
        i = i == null ? this.field.fieldGroup.length : i;
        if (!this.model) {
            assignFieldValue(this.field, []);
        }
        this.model.splice(i, 0, initialModel ? clone(initialModel) : undefined);
        this.markFieldForCheck(this.field.fieldGroup[i]);
        this._build();
    }
    remove(i, { markAsDirty } = { markAsDirty: true }) {
        markAsDirty && this.formControl.markAsDirty();
        this.model.splice(i, 1);
        const field = this.field.fieldGroup[i];
        this.field.fieldGroup.splice(i, 1);
        this.field.fieldGroup.forEach((f, key) => this.updateArrayElementKey(f, `${key}`));
        unregisterControl(field, true);
        this._build();
    }
    _build() {
        const fields = this.field.formControl._fields ?? [this.field];
        fields.forEach((f) => this.options.build(f));
        this.options.fieldChanges.next({
            field: this.field,
            value: getFieldValue(this.field),
            type: 'valueChanges',
        });
    }
    updateArrayElementKey(f, newKey) {
        if (hasKey(f)) {
            f.key = newKey;
            return;
        }
        if (!f.fieldGroup?.length) {
            return;
        }
        for (let i = 0; i < f.fieldGroup.length; i++) {
            this.updateArrayElementKey(f.fieldGroup[i], newKey);
        }
    }
    markFieldForCheck(f) {
        if (!f) {
            return;
        }
        f.fieldGroup?.forEach((c) => this.markFieldForCheck(c));
        if (f.hide === false) {
            this.options._hiddenFieldsForCheck.push({ field: f });
        }
    }
}
FieldArrayType.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldArrayType, deps: null, target: i0.ɵɵFactoryTarget.Directive });
FieldArrayType.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FieldArrayType, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldArrayType, decorators: [{
            type: Directive
        }] });

class FieldWrapper extends FieldType {
    set _formlyControls(_) { }
    set _staticContent(content) {
        this.fieldComponent = content;
    }
}
FieldWrapper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldWrapper, deps: null, target: i0.ɵɵFactoryTarget.Directive });
FieldWrapper.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FieldWrapper, viewQueries: [{ propertyName: "fieldComponent", first: true, predicate: ["fieldComponent"], descendants: true, read: ViewContainerRef }, { propertyName: "_staticContent", first: true, predicate: ["fieldComponent"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldWrapper, decorators: [{
            type: Directive
        }], propDecorators: { fieldComponent: [{
                type: ViewChild,
                args: ['fieldComponent', { read: ViewContainerRef }]
            }], _staticContent: [{
                type: ViewChild,
                args: ['fieldComponent', { read: ViewContainerRef, static: true }]
            }] } });

/** @ignore */
class FormlyTemplateType extends FieldType {
    constructor(sanitizer) {
        super();
        this.sanitizer = sanitizer;
        this.innerHtml = {};
    }
    get template() {
        if (this.field && this.field.template !== this.innerHtml.template) {
            this.innerHtml = {
                template: this.field.template,
                content: this.props.safeHtml
                    ? this.sanitizer.bypassSecurityTrustHtml(this.field.template)
                    : this.field.template,
            };
        }
        return this.innerHtml.content;
    }
}
FormlyTemplateType.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyTemplateType, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
FormlyTemplateType.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyTemplateType, selector: "formly-template", usesInheritance: true, ngImport: i0, template: `<div [innerHtml]="template"></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyTemplateType, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-template',
                    template: `<div [innerHtml]="template"></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });

function evalStringExpression(expression, argNames) {
    try {
        return Function(...argNames, `return ${expression};`);
    }
    catch (error) {
        console.error(error);
    }
}
function evalExpression(expression, thisArg, argVal) {
    if (typeof expression === 'function') {
        return expression.apply(thisArg, argVal);
    }
    else {
        return expression ? true : false;
    }
}

class FieldExpressionExtension {
    onPopulate(field) {
        if (field._expressions) {
            return;
        }
        // cache built expression
        defineHiddenProp(field, '_expressions', {});
        observe(field, ['hide'], ({ currentValue, firstChange }) => {
            defineHiddenProp(field, '_hide', !!currentValue);
            if (!firstChange || (firstChange && currentValue === true)) {
                field.props.hidden = currentValue;
                field.options._hiddenFieldsForCheck.push({ field });
            }
        });
        if (field.hideExpression) {
            observe(field, ['hideExpression'], ({ currentValue: expr }) => {
                field._expressions.hide = this.parseExpressions(field, 'hide', typeof expr === 'boolean' ? () => expr : expr);
            });
        }
        const evalExpr = (key, expr) => {
            if (typeof expr === 'string' || isFunction(expr)) {
                field._expressions[key] = this.parseExpressions(field, key, expr);
            }
            else if (expr instanceof Observable) {
                field._expressions[key] = {
                    value$: expr.pipe(tap((v) => {
                        this.evalExpr(field, key, v);
                        field.options._detectChanges(field);
                    })),
                };
            }
        };
        field.expressions = field.expressions || {};
        for (const key of Object.keys(field.expressions)) {
            observe(field, ['expressions', key], ({ currentValue: expr }) => {
                evalExpr(key, isFunction(expr) ? (...args) => expr(field, args[3]) : expr);
            });
        }
        field.expressionProperties = field.expressionProperties || {};
        for (const key of Object.keys(field.expressionProperties)) {
            observe(field, ['expressionProperties', key], ({ currentValue }) => evalExpr(key, currentValue));
        }
    }
    postPopulate(field) {
        if (field.parent) {
            return;
        }
        if (!field.options.checkExpressions) {
            let checkLocked = false;
            field.options.checkExpressions = (f, ignoreCache) => {
                if (checkLocked) {
                    return;
                }
                checkLocked = true;
                const fieldChanged = this.checkExpressions(f, ignoreCache);
                const options = field.options;
                options._hiddenFieldsForCheck
                    .sort((f) => (f.field.hide ? -1 : 1))
                    .forEach((f) => this.changeHideState(f.field, f.field.hide ?? f.default, !ignoreCache));
                options._hiddenFieldsForCheck = [];
                if (fieldChanged) {
                    this.checkExpressions(field);
                }
                checkLocked = false;
            };
            field.options._checkField = (f, ignoreCache) => {
                console.warn(`Formly: 'options._checkField' is deprecated since v6.0, use 'options.checkExpressions' instead.`);
                field.options.checkExpressions(f, ignoreCache);
            };
        }
    }
    parseExpressions(field, path, expr) {
        let parentExpression;
        if (field.parent && ['hide', 'props.disabled'].includes(path)) {
            const rootValue = (f) => {
                return path === 'hide' ? f.hide : f.props.disabled;
            };
            parentExpression = () => {
                let root = field.parent;
                while (root.parent && !rootValue(root)) {
                    root = root.parent;
                }
                return rootValue(root);
            };
        }
        expr = expr || (() => false);
        if (typeof expr === 'string') {
            expr = evalStringExpression(expr, ['model', 'formState', 'field']);
        }
        let currentValue;
        return {
            callback: (ignoreCache) => {
                try {
                    const exprValue = evalExpression(parentExpression ? (...args) => parentExpression(field) || expr(...args) : expr, { field }, [field.model, field.options.formState, field, ignoreCache]);
                    if (ignoreCache ||
                        (currentValue !== exprValue &&
                            (!isObject(exprValue) ||
                                isObservable(exprValue) ||
                                JSON.stringify(exprValue) !== JSON.stringify(currentValue)))) {
                        currentValue = exprValue;
                        this.evalExpr(field, path, exprValue);
                        return true;
                    }
                    return false;
                }
                catch (error) {
                    error.message = `[Formly Error] [Expression "${path}"] ${error.message}`;
                    throw error;
                }
            },
        };
    }
    checkExpressions(field, ignoreCache = false) {
        if (!field) {
            return false;
        }
        let fieldChanged = false;
        if (field._expressions) {
            for (const key of Object.keys(field._expressions)) {
                field._expressions[key].callback?.(ignoreCache) && (fieldChanged = true);
            }
        }
        field.fieldGroup?.forEach((f) => this.checkExpressions(f, ignoreCache) && (fieldChanged = true));
        return fieldChanged;
    }
    changeDisabledState(field, value) {
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((f) => !f._expressions.hasOwnProperty('props.disabled'))
                .forEach((f) => this.changeDisabledState(f, value));
        }
        if (hasKey(field) && field.props.disabled !== value) {
            field.props.disabled = value;
        }
    }
    changeHideState(field, hide, resetOnHide) {
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((f) => f && !f._expressions.hide)
                .forEach((f) => this.changeHideState(f, hide, resetOnHide));
        }
        if (field.formControl && hasKey(field)) {
            defineHiddenProp(field, '_hide', !!(hide || field.hide));
            const c = field.formControl;
            if (c._fields?.length > 1) {
                updateValidity(c);
            }
            if (hide === true && (!c._fields || c._fields.every((f) => !!f._hide))) {
                unregisterControl(field, true);
                if (resetOnHide && field.resetOnHide) {
                    assignFieldValue(field, undefined);
                    field.formControl.reset({ value: undefined, disabled: field.formControl.disabled });
                    field.options.fieldChanges.next({ value: undefined, field, type: 'valueChanges' });
                    if (field.fieldGroup && field.formControl instanceof FormArray) {
                        field.fieldGroup.length = 0;
                    }
                }
            }
            else if (hide === false) {
                if (field.resetOnHide && !isUndefined(field.defaultValue) && isUndefined(getFieldValue(field))) {
                    assignFieldValue(field, field.defaultValue);
                }
                registerControl(field, undefined, true);
                if (field.resetOnHide && field.fieldArray && field.fieldGroup?.length !== field.model?.length) {
                    field.options.build(field);
                }
            }
        }
        if (field.options.fieldChanges) {
            field.options.fieldChanges.next({ field, type: 'hidden', value: hide });
        }
    }
    evalExpr(field, prop, value) {
        if (prop.indexOf('model.') === 0) {
            const key = prop.replace(/^model\./, ''), parent = field.fieldGroup ? field : field.parent;
            let control = field?.key === key ? field.formControl : field.form.get(key);
            if (!control && field.get(key)) {
                control = field.get(key).formControl;
            }
            assignFieldValue({ key, parent, model: field.model }, value);
            if (control && !(isNil(control.value) && isNil(value)) && control.value !== value) {
                control.patchValue(value);
            }
        }
        else {
            try {
                let target = field;
                const paths = this._evalExpressionPath(field, prop);
                const lastIndex = paths.length - 1;
                for (let i = 0; i < lastIndex; i++) {
                    target = target[paths[i]];
                }
                target[paths[lastIndex]] = value;
            }
            catch (error) {
                error.message = `[Formly Error] [Expression "${prop}"] ${error.message}`;
                throw error;
            }
            if (['templateOptions.disabled', 'props.disabled'].includes(prop) && hasKey(field)) {
                this.changeDisabledState(field, value);
            }
        }
        this.emitExpressionChanges(field, prop, value);
    }
    emitExpressionChanges(field, property, value) {
        if (!field.options.fieldChanges) {
            return;
        }
        field.options.fieldChanges.next({
            field,
            type: 'expressionChanges',
            property,
            value,
        });
    }
    _evalExpressionPath(field, prop) {
        if (field._expressions[prop] && field._expressions[prop].paths) {
            return field._expressions[prop].paths;
        }
        let paths = [];
        if (prop.indexOf('[') === -1) {
            paths = prop.split('.');
        }
        else {
            prop
                .split(/[[\]]{1,2}/) // https://stackoverflow.com/a/20198206
                .filter((p) => p)
                .forEach((path) => {
                const arrayPath = path.match(/['|"](.*?)['|"]/);
                if (arrayPath) {
                    paths.push(arrayPath[1]);
                }
                else {
                    paths.push(...path.split('.').filter((p) => p));
                }
            });
        }
        if (field._expressions[prop]) {
            field._expressions[prop].paths = paths;
        }
        return paths;
    }
}

class FieldValidationExtension {
    constructor(config) {
        this.config = config;
    }
    onPopulate(field) {
        this.initFieldValidation(field, 'validators');
        this.initFieldValidation(field, 'asyncValidators');
    }
    initFieldValidation(field, type) {
        const validators = [];
        if (type === 'validators' && !(field.hasOwnProperty('fieldGroup') && !hasKey(field))) {
            validators.push(this.getPredefinedFieldValidation(field));
        }
        if (field[type]) {
            for (const validatorName of Object.keys(field[type])) {
                validatorName === 'validation'
                    ? validators.push(...field[type].validation.map((v) => this.wrapNgValidatorFn(field, v)))
                    : validators.push(this.wrapNgValidatorFn(field, field[type][validatorName], validatorName));
            }
        }
        defineHiddenProp(field, '_' + type, validators);
    }
    getPredefinedFieldValidation(field) {
        let VALIDATORS = [];
        FORMLY_VALIDATORS.forEach((opt) => observe(field, ['props', opt], ({ currentValue, firstChange }) => {
            VALIDATORS = VALIDATORS.filter((o) => o !== opt);
            if (opt === 'required' && currentValue != null && typeof currentValue !== 'boolean') {
                console.warn(`Formly: Invalid prop 'required' of type '${typeof currentValue}', expected 'boolean' (Field:${field.key}).`);
            }
            if (currentValue != null && currentValue !== false) {
                VALIDATORS.push(opt);
            }
            if (!firstChange && field.formControl) {
                updateValidity(field.formControl);
            }
        }));
        return (control) => {
            if (VALIDATORS.length === 0) {
                return null;
            }
            return Validators.compose(VALIDATORS.map((opt) => () => {
                const value = field.props[opt];
                switch (opt) {
                    case 'required':
                        return Validators.required(control);
                    case 'pattern':
                        return Validators.pattern(value)(control);
                    case 'minLength':
                        const minLengthResult = Validators.minLength(value)(control);
                        const minLengthKey = this.config.getValidatorMessage('minlength') || field.validation?.messages?.minlength
                            ? 'minlength'
                            : 'minLength';
                        return minLengthResult ? { [minLengthKey]: minLengthResult.minlength } : null;
                    case 'maxLength':
                        const maxLengthResult = Validators.maxLength(value)(control);
                        const maxLengthKey = this.config.getValidatorMessage('maxlength') || field.validation?.messages?.maxlength
                            ? 'maxlength'
                            : 'maxLength';
                        return maxLengthResult ? { [maxLengthKey]: maxLengthResult.maxlength } : null;
                    case 'min':
                        return Validators.min(value)(control);
                    case 'max':
                        return Validators.max(value)(control);
                    default:
                        return null;
                }
            }))(control);
        };
    }
    wrapNgValidatorFn(field, validator, validatorName) {
        let validatorOption;
        if (typeof validator === 'string') {
            validatorOption = clone(this.config.getValidator(validator));
        }
        if (typeof validator === 'object' && validator.name) {
            validatorOption = clone(this.config.getValidator(validator.name));
            if (validator.options) {
                validatorOption.options = validator.options;
            }
        }
        if (typeof validator === 'object' && validator.expression) {
            const { expression, ...options } = validator;
            validatorOption = {
                name: validatorName,
                validation: expression,
                options: Object.keys(options).length > 0 ? options : null,
            };
        }
        if (typeof validator === 'function') {
            validatorOption = {
                name: validatorName,
                validation: validator,
            };
        }
        return (control) => {
            const errors = validatorOption.validation(control, field, validatorOption.options);
            if (isPromise(errors)) {
                return errors.then((v) => this.handleResult(field, validatorName ? !!v : v, validatorOption));
            }
            if (isObservable(errors)) {
                return errors.pipe(map((v) => this.handleResult(field, validatorName ? !!v : v, validatorOption)));
            }
            return this.handleResult(field, validatorName ? !!errors : errors, validatorOption);
        };
    }
    handleResult(field, errors, { name, options }) {
        if (typeof errors === 'boolean') {
            errors = errors ? null : { [name]: options ? options : true };
        }
        const ctrl = field.formControl;
        ctrl?._childrenErrors?.[name]?.();
        if (isObject(errors)) {
            Object.keys(errors).forEach((name) => {
                const errorPath = errors[name].errorPath ? errors[name].errorPath : options?.errorPath;
                const childCtrl = errorPath ? field.formControl.get(errorPath) : null;
                if (childCtrl) {
                    const { errorPath: _errorPath, ...opts } = errors[name];
                    childCtrl.setErrors({ ...(childCtrl.errors || {}), [name]: opts });
                    !ctrl._childrenErrors && defineHiddenProp(ctrl, '_childrenErrors', {});
                    ctrl._childrenErrors[name] = () => {
                        const { [name]: _toDelete, ...childErrors } = childCtrl.errors || {};
                        childCtrl.setErrors(Object.keys(childErrors).length === 0 ? null : childErrors);
                    };
                }
            });
        }
        return errors;
    }
}

class FieldFormExtension {
    prePopulate(field) {
        if (!this.root) {
            this.root = field;
        }
        if (field.parent) {
            Object.defineProperty(field, 'form', {
                get: () => field.parent.formControl,
                configurable: true,
            });
        }
    }
    onPopulate(field) {
        if (field.hasOwnProperty('fieldGroup') && !hasKey(field)) {
            defineHiddenProp(field, 'formControl', field.form);
        }
        else {
            this.addFormControl(field);
        }
    }
    postPopulate(field) {
        if (this.root !== field) {
            return;
        }
        this.root = null;
        const markForCheck = this.setValidators(field);
        if (markForCheck && field.parent) {
            let parent = field.parent;
            while (parent) {
                if (hasKey(parent) || !parent.parent) {
                    updateValidity(parent.formControl, true);
                }
                parent = parent.parent;
            }
        }
    }
    addFormControl(field) {
        let control = findControl(field);
        if (field.fieldArray) {
            return;
        }
        if (!control) {
            const controlOptions = { updateOn: field.modelOptions.updateOn };
            if (field.fieldGroup) {
                control = new FormGroup({}, controlOptions);
            }
            else {
                const value = hasKey(field) ? getFieldValue(field) : field.defaultValue;
                control = new FormControl({ value, disabled: !!field.props.disabled }, { ...controlOptions, initialValueIsDefault: true });
            }
        }
        else {
            if (control instanceof FormControl) {
                const value = hasKey(field) ? getFieldValue(field) : field.defaultValue;
                control.defaultValue = value;
            }
        }
        registerControl(field, control);
    }
    setValidators(field, disabled = false) {
        if (disabled === false && hasKey(field) && field.props?.disabled) {
            disabled = true;
        }
        let markForCheck = false;
        field.fieldGroup?.forEach((f) => f && this.setValidators(f, disabled) && (markForCheck = true));
        if (hasKey(field) || !field.parent || (!hasKey(field) && !field.fieldGroup)) {
            const { formControl: c } = field;
            if (c) {
                if (hasKey(field) && c instanceof FormControl) {
                    if (disabled && c.enabled) {
                        c.disable({ emitEvent: false, onlySelf: true });
                        markForCheck = true;
                    }
                    if (!disabled && c.disabled) {
                        c.enable({ emitEvent: false, onlySelf: true });
                        markForCheck = true;
                    }
                }
                if (null === c.validator && this.hasValidators(field, '_validators')) {
                    c.setValidators(() => {
                        const v = Validators.compose(this.mergeValidators(field, '_validators'));
                        return v ? v(c) : null;
                    });
                    markForCheck = true;
                }
                if (null === c.asyncValidator && this.hasValidators(field, '_asyncValidators')) {
                    c.setAsyncValidators(() => {
                        const v = Validators.composeAsync(this.mergeValidators(field, '_asyncValidators'));
                        return v ? v(c) : of(null);
                    });
                    markForCheck = true;
                }
                if (markForCheck) {
                    updateValidity(c, true);
                    // update validity of `FormGroup` instance created by field with nested key.
                    let parent = c.parent;
                    for (let i = 1; i < getKeyPath(field).length; i++) {
                        if (parent) {
                            updateValidity(parent, true);
                            parent = parent.parent;
                        }
                    }
                }
            }
        }
        return markForCheck;
    }
    hasValidators(field, type) {
        const c = field.formControl;
        if (c?._fields?.length > 1 && c._fields.some((f) => f[type].length > 0)) {
            return true;
        }
        else if (field[type].length > 0) {
            return true;
        }
        return field.fieldGroup?.some((f) => f?.fieldGroup && !hasKey(f) && this.hasValidators(f, type));
    }
    mergeValidators(field, type) {
        const validators = [];
        const c = field.formControl;
        if (c?._fields?.length > 1) {
            c._fields
                .filter((f) => !f._hide)
                .forEach((f) => validators.push(...f[type]));
        }
        else if (field[type]) {
            validators.push(...field[type]);
        }
        if (field.fieldGroup) {
            field.fieldGroup
                .filter((f) => f?.fieldGroup && !hasKey(f))
                .forEach((f) => validators.push(...this.mergeValidators(f, type)));
        }
        return validators;
    }
}

class CoreExtension {
    constructor(config) {
        this.config = config;
        this.formId = 0;
    }
    prePopulate(field) {
        const root = field.parent;
        this.initRootOptions(field);
        this.initFieldProps(field);
        if (root) {
            Object.defineProperty(field, 'options', { get: () => root.options, configurable: true });
            Object.defineProperty(field, 'model', {
                get: () => (hasKey(field) && field.fieldGroup ? getFieldValue(field) : root.model),
                configurable: true,
            });
        }
        Object.defineProperty(field, 'get', {
            value: (key) => getField(field, key),
            configurable: true,
        });
        this.getFieldComponentInstance(field).prePopulate?.(field);
    }
    onPopulate(field) {
        this.initFieldOptions(field);
        this.getFieldComponentInstance(field).onPopulate?.(field);
        if (field.fieldGroup) {
            field.fieldGroup.forEach((f, index) => {
                if (f) {
                    Object.defineProperty(f, 'parent', { get: () => field, configurable: true });
                    Object.defineProperty(f, 'index', { get: () => index, configurable: true });
                }
                this.formId++;
            });
        }
    }
    postPopulate(field) {
        this.getFieldComponentInstance(field).postPopulate?.(field);
    }
    initFieldProps(field) {
        field.props ?? (field.props = field.templateOptions);
        Object.defineProperty(field, 'templateOptions', {
            get: () => field.props,
            set: (props) => (field.props = props),
            configurable: true,
        });
    }
    initRootOptions(field) {
        if (field.parent) {
            return;
        }
        const options = field.options;
        field.options.formState = field.options.formState || {};
        if (!options.showError) {
            options.showError = this.config.extras.showError;
        }
        if (!options.fieldChanges) {
            defineHiddenProp(options, 'fieldChanges', new Subject());
        }
        if (!options._hiddenFieldsForCheck) {
            options._hiddenFieldsForCheck = [];
        }
        options._markForCheck = (f) => {
            console.warn(`Formly: 'options._markForCheck' is deprecated since v6.0, use 'options.detectChanges' instead.`);
            options.detectChanges(f);
        };
        options._detectChanges = (f) => {
            if (f._componentRefs) {
                markFieldForCheck(f);
            }
            f.fieldGroup?.forEach((f) => f && options._detectChanges(f));
        };
        options.detectChanges = (f) => {
            f.options.checkExpressions?.(f);
            options._detectChanges(f);
        };
        options.resetModel = (model) => {
            model = clone(model ?? options._initialModel);
            if (field.model) {
                Object.keys(field.model).forEach((k) => delete field.model[k]);
                Object.assign(field.model, model || {});
            }
            if (!isSignalRequired()) {
                observe(options, ['parentForm', 'submitted']).setValue(false, false);
            }
            options.build(field);
            field.form.reset(field.model);
        };
        options.updateInitialValue = (model) => (options._initialModel = clone(model ?? field.model));
        field.options.updateInitialValue();
    }
    initFieldOptions(field) {
        reverseDeepMerge(field, {
            id: getFieldId(`formly_${this.formId}`, field, field.index),
            hooks: {},
            modelOptions: {},
            validation: { messages: {} },
            props: !field.type || !hasKey(field)
                ? {}
                : {
                    label: '',
                    placeholder: '',
                    disabled: false,
                },
        });
        if (this.config.extras.resetFieldOnHide && field.resetOnHide !== false) {
            field.resetOnHide = true;
        }
        if (field.type !== 'formly-template' &&
            (field.template || field.expressions?.template || field.expressionProperties?.template)) {
            field.type = 'formly-template';
        }
        if (!field.type && field.fieldGroup) {
            field.type = 'formly-group';
        }
        if (field.type) {
            this.config.getMergedField(field);
        }
        if (hasKey(field) &&
            !isUndefined(field.defaultValue) &&
            isUndefined(getFieldValue(field)) &&
            !isHiddenField(field)) {
            assignFieldValue(field, field.defaultValue);
        }
        field.wrappers = field.wrappers || [];
    }
    getFieldComponentInstance(field) {
        const componentRefInstance = () => {
            let componentRef = this.config.resolveFieldTypeRef(field);
            const fieldComponentRef = field._componentRefs?.slice(-1)[0];
            if (fieldComponentRef instanceof ComponentRef &&
                fieldComponentRef?.componentType === componentRef?.componentType) {
                componentRef = fieldComponentRef;
            }
            return componentRef?.instance;
        };
        if (!field._proxyInstance) {
            defineHiddenProp(field, '_proxyInstance', new Proxy({}, {
                get: (_, prop) => componentRefInstance()?.[prop],
                set: (_, prop, value) => (componentRefInstance()[prop] = value),
            }));
        }
        return field._proxyInstance;
    }
}

function defaultFormlyConfig(config) {
    return {
        types: [
            { name: 'formly-group', component: FormlyGroup },
            { name: 'formly-template', component: FormlyTemplateType },
        ],
        extensions: [
            { name: 'core', extension: new CoreExtension(config), priority: -250 },
            { name: 'field-validation', extension: new FieldValidationExtension(config), priority: -200 },
            { name: 'field-form', extension: new FieldFormExtension(), priority: -150 },
            { name: 'field-expression', extension: new FieldExpressionExtension(), priority: -100 },
        ],
    };
}
class FormlyModule {
    constructor(configService, configs = []) {
        if (!configs) {
            return;
        }
        configs.forEach((config) => configService.addConfig(config));
    }
    static forRoot(config = {}) {
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                FormlyConfig,
                FormlyFormBuilder,
            ],
        };
    }
    static forChild(config = {}) {
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                FormlyFormBuilder,
            ],
        };
    }
}
FormlyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyModule, deps: [{ token: FormlyConfig }, { token: FORMLY_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
FormlyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyModule, declarations: [FormlyTemplate,
        FormlyForm,
        FormlyField,
        FormlyAttributes,
        FormlyGroup,
        FormlyValidationMessage,
        FormlyTemplateType], imports: [CommonModule], exports: [FormlyTemplate, FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage] });
FormlyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FormlyTemplate,
                        FormlyForm,
                        FormlyField,
                        FormlyAttributes,
                        FormlyGroup,
                        FormlyValidationMessage,
                        FormlyTemplateType,
                    ],
                    exports: [FormlyTemplate, FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage],
                    imports: [CommonModule],
                }]
        }], ctorParameters: function () { return [{ type: FormlyConfig }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [FORMLY_CONFIG]
                }] }]; } });

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FORMLY_CONFIG, FieldArrayType, FieldType, FieldWrapper, FormlyConfig, FormlyField, FormlyForm, FormlyFormBuilder, FormlyModule, FormlyAttributes as ɵFormlyAttributes, FormlyGroup as ɵFormlyGroup, FormlyTemplate as ɵFormlyTemplate, FormlyValidationMessage as ɵFormlyValidationMessage, clone as ɵclone, defineHiddenProp as ɵdefineHiddenProp, getFieldValue as ɵgetFieldValue, hasKey as ɵhasKey, observe as ɵobserve, reverseDeepMerge as ɵreverseDeepMerge };
//# sourceMappingURL=ngx-formly-core.mjs.map
