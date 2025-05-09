import { Injectable, InjectionToken, Type } from '@angular/core';
import { reverseDeepMerge, defineHiddenProp } from './../utils';
import * as i0 from "@angular/core";
/**
 * An InjectionToken for registering additional formly config options (types, wrappers ...).
 */
export const FORMLY_CONFIG = new InjectionToken('FORMLY_CONFIG');
/**
 * Maintains list of formly config options. This can be used to register new field type.
 */
export class FormlyConfig {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NyYy9saWIvc2VydmljZXMvZm9ybWx5LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBZ0IsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFlBQVksQ0FBQzs7QUFlaEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQWlCLGVBQWUsQ0FBQyxDQUFDO0FBR2pGOztHQUVHO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUFEekI7UUFFRSxVQUFLLEdBQW1DLEVBQUUsQ0FBQztRQUMzQyxlQUFVLEdBQXdDLEVBQUUsQ0FBQztRQUNyRCxhQUFRLEdBQXNDLEVBQUUsQ0FBQztRQUNqRCxhQUFRLEdBQTJELEVBQUUsQ0FBQztRQUV0RSxXQUFNLEdBQXdDO1lBQzVDLGlCQUFpQixFQUFFLGFBQWE7WUFDaEMsVUFBVSxFQUFFLElBQUk7WUFDaEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0Qix3QkFBd0IsRUFBRSxJQUFJO1lBQzlCLFNBQVMsQ0FBQyxLQUFnQjtnQkFDeEIsT0FBTyxDQUNMLEtBQUssQ0FBQyxXQUFXLEVBQUUsT0FBTztvQkFDMUIsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxTQUFTLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUN0RyxDQUFDO1lBQ0osQ0FBQztTQUNGLENBQUM7UUFDRixlQUFVLEdBQXdDLEVBQUUsQ0FBQztRQUNyRCxZQUFPLEdBQTRFLEVBQUUsQ0FBQztRQUU5RSx5QkFBb0IsR0FBd0QsRUFBRSxD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QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQzdCLE9BQU87U0FDUjtRQUVELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztTQUNyRDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1NBQ25EO0lBQ0gsQ0FBQzs7MEdBOVBVLFlBQVk7OEdBQVosWUFBWSxjQURDLE1BQU07NEZBQ25CLFlBQVk7a0JBRHhCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIENvbXBvbmVudFJlZiwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnLi8uLi90ZW1wbGF0ZXMvZmllbGQudHlwZSc7XG5pbXBvcnQgeyByZXZlcnNlRGVlcE1lcmdlLCBkZWZpbmVIaWRkZW5Qcm9wIH0gZnJvbSAnLi8uLi91dGlscyc7XG5pbXBvcnQge1xuICBGb3JtbHlGaWVsZENvbmZpZyxcbiAgRm9ybWx5RmllbGRDb25maWdDYWNoZSxcbiAgQ29uZmlnT3B0aW9uLFxuICBUeXBlT3B0aW9uLFxuICBWYWxpZGF0b3JPcHRpb24sXG4gIFdyYXBwZXJPcHRpb24sXG4gIEZvcm1seUV4dGVuc2lvbixcbiAgVmFsaWRhdGlvbk1lc3NhZ2VPcHRpb24sXG4gIEV4dGVuc2lvbk9wdGlvbixcbiAgRm9ybWx5RmllbGRDb25maWdQcmVzZXRQcm92aWRlcixcbn0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IEZpZWxkV3JhcHBlciB9IGZyb20gJy4uL3RlbXBsYXRlcy9maWVsZC53cmFwcGVyJztcblxuLyoqXG4gKiBBbiBJbmplY3Rpb25Ub2tlbiBmb3IgcmVnaXN0ZXJpbmcgYWRkaXRpb25hbCBmb3JtbHkgY29uZmlnIG9wdGlvbnMgKHR5cGVzLCB3cmFwcGVycyAuLi4pLlxuICovXG5leHBvcnQgY29uc3QgRk9STUxZX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb25maWdPcHRpb25bXT4oJ0ZPUk1MWV9DT05GSUcnKTtcbmRlY2xhcmUgY29uc3QgbmdEZXZNb2RlOiBhbnk7XG5cbi8qKlxuICogTWFpbnRhaW5zIGxpc3Qgb2YgZm9ybWx5IGNvbmZpZyBvcHRpb25zLiBUaGlzIGNhbiBiZSB1c2VkIHRvIHJlZ2lzdGVyIG5ldyBmaWVsZCB0eXBlLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEZvcm1seUNvbmZpZyB7XG4gIHR5cGVzOiB7IFtuYW1lOiBzdHJpbmddOiBUeXBlT3B0aW9uIH0gPSB7fTtcbiAgdmFsaWRhdG9yczogeyBbbmFtZTogc3RyaW5nXTogVmFsaWRhdG9yT3B0aW9uIH0gPSB7fTtcbiAgd3JhcHBlcnM6IHsgW25hbWU6IHN0cmluZ106IFdyYXBwZXJPcHRpb24gfSA9IHt9O1xuICBtZXNzYWdlczogeyBbbmFtZTogc3RyaW5nXTogVmFsaWRhdGlvbk1lc3NhZ2VPcHRpb25bJ21lc3NhZ2UnXSB9ID0ge307XG5cbiAgZXh0cmFzOiBOb25OdWxsYWJsZTxDb25maWdPcHRpb25bJ2V4dHJhcyddPiA9IHtcbiAgICBjaGVja0V4cHJlc3Npb25PbjogJ21vZGVsQ2hhbmdlJyxcbiAgICBsYXp5UmVuZGVyOiB0cnVlLFxuICAgIHJlc2V0RmllbGRPbkhpZGU6IHRydWUsXG4gICAgcmVuZGVyRm9ybWx5RmllbGRFbGVtZW50OiB0cnVlLFxuICAgIHNob3dFcnJvcihmaWVsZDogRmllbGRUeXBlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBmaWVsZC5mb3JtQ29udHJvbD8uaW52YWxpZCAmJlxuICAgICAgICAoZmllbGQuZm9ybUNvbnRyb2w/LnRvdWNoZWQgfHwgZmllbGQub3B0aW9ucy5wYXJlbnRGb3JtPy5zdWJtaXR0ZWQgfHwgISFmaWVsZC5maWVsZC52YWxpZGF0aW9uPy5zaG93KVxuICAgICAgKTtcbiAgICB9LFxuICB9O1xuICBleHRlbnNpb25zOiB7IFtuYW1lOiBzdHJpbmddOiBGb3JtbHlFeHRlbnNpb24gfSA9IHt9O1xuICBwcmVzZXRzOiB7IFtuYW1lOiBzdHJpbmddOiBGb3JtbHlGaWVsZENvbmZpZyB8IEZvcm1seUZpZWxkQ29uZmlnUHJlc2V0UHJvdmlkZXIgfSA9IHt9O1xuXG4gIHByaXZhdGUgZXh0ZW5zaW9uc0J5UHJpb3JpdHk6IFJlY29yZDxudW1iZXIsIHsgW25hbWU6IHN0cmluZ106IEZvcm1seUV4dGVuc2lvbiB9PiA9IHt9O1xuXG4gIGFkZENvbmZpZyhjb25maWc6IENvbmZpZ09wdGlvbikge1xuICAgIGlmIChjb25maWcudHlwZXMpIHtcbiAgICAgIGNvbmZpZy50eXBlcy5mb3JFYWNoKCh0eXBlKSA9PiB0aGlzLnNldFR5cGUodHlwZSkpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnZhbGlkYXRvcnMpIHtcbiAgICAgIGNvbmZpZy52YWxpZGF0b3JzLmZvckVhY2goKHZhbGlkYXRvcikgPT4gdGhpcy5zZXRWYWxpZGF0b3IodmFsaWRhdG9yKSk7XG4gICAgfVxuICAgIGlmIChjb25maWcud3JhcHBlcnMpIHtcbiAgICAgIGNvbmZpZy53cmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyKSA9PiB0aGlzLnNldFdyYXBwZXIod3JhcHBlcikpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLnZhbGlkYXRpb25NZXNzYWdlcykge1xuICAgICAgY29uZmlnLnZhbGlkYXRpb25NZXNzYWdlcy5mb3JFYWNoKCh2YWxpZGF0aW9uKSA9PiB0aGlzLmFkZFZhbGlkYXRvck1lc3NhZ2UodmFsaWRhdGlvbi5uYW1lLCB2YWxpZGF0aW9uLm1lc3NhZ2UpKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5leHRlbnNpb25zKSB7XG4gICAgICB0aGlzLnNldFNvcnRlZEV4dGVuc2lvbnMoY29uZmlnLmV4dGVuc2lvbnMpO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmV4dHJhcykge1xuICAgICAgdGhpcy5leHRyYXMgPSB7IC4uLnRoaXMuZXh0cmFzLCAuLi5jb25maWcuZXh0cmFzIH07XG4gICAgfVxuICAgIGlmIChjb25maWcucHJlc2V0cykge1xuICAgICAgdGhpcy5wcmVzZXRzID0ge1xuICAgICAgICAuLi50aGlzLnByZXNldHMsXG4gICAgICAgIC4uLmNvbmZpZy5wcmVzZXRzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiAoeyAuLi5hY2MsIFtjdXJyLm5hbWVdOiBjdXJyLmNvbmZpZyB9KSwge30pLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIHlvdSB0byBzcGVjaWZ5IGEgY3VzdG9tIHR5cGUgd2hpY2ggeW91IGNhbiB1c2UgaW4geW91ciBmaWVsZCBjb25maWd1cmF0aW9uLlxuICAgKiBZb3UgY2FuIHBhc3MgYW4gb2JqZWN0IG9mIG9wdGlvbnMsIG9yIGFuIGFycmF5IG9mIG9iamVjdHMgb2Ygb3B0aW9ucy5cbiAgICovXG4gIHNldFR5cGUob3B0aW9uczogVHlwZU9wdGlvbiB8IFR5cGVPcHRpb25bXSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4gdGhpcy5zZXRUeXBlKG9wdGlvbikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMudHlwZXNbb3B0aW9ucy5uYW1lXSkge1xuICAgICAgICB0aGlzLnR5cGVzW29wdGlvbnMubmFtZV0gPSA8VHlwZU9wdGlvbj57IG5hbWU6IG9wdGlvbnMubmFtZSB9O1xuICAgICAgfVxuXG4gICAgICAoWydjb21wb25lbnQnLCAnZXh0ZW5kcycsICdkZWZhdWx0T3B0aW9ucycsICd3cmFwcGVycyddIGFzIChrZXlvZiBUeXBlT3B0aW9uKVtdKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgdGhpcy50eXBlc1tvcHRpb25zLm5hbWVdW3Byb3BdID0gb3B0aW9uc1twcm9wXSBhcyBhbnk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldFR5cGUobmFtZTogRm9ybWx5RmllbGRDb25maWdbJ3R5cGUnXSwgdGhyb3dJZk5vdEZvdW5kID0gZmFsc2UpOiBUeXBlT3B0aW9uIHtcbiAgICBpZiAobmFtZSBpbnN0YW5jZW9mIFR5cGUpIHtcbiAgICAgIHJldHVybiB7IGNvbXBvbmVudDogbmFtZSwgbmFtZTogbmFtZS5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZSB9O1xuICAgIH1cblxuICAgIGlmICghdGhpcy50eXBlc1tuYW1lXSkge1xuICAgICAgaWYgKHRocm93SWZOb3RGb3VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFtGb3JtbHkgRXJyb3JdIFRoZSB0eXBlIFwiJHtuYW1lfVwiIGNvdWxkIG5vdCBiZSBmb3VuZC4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IGlzIHJlZ2lzdGVyZWQgdGhyb3VnaCB0aGUgRm9ybWx5TW9kdWxlIGRlY2xhcmF0aW9uLmAsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMubWVyZ2VFeHRlbmRlZFR5cGUobmFtZSk7XG5cbiAgICByZXR1cm4gdGhpcy50eXBlc1tuYW1lXTtcbiAgfVxuXG4gIC8qKiBAaWdub3JlICovXG4gIGdldE1lcmdlZEZpZWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyA9IHt9KTogYW55IHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5nZXRUeXBlKGZpZWxkLnR5cGUpO1xuICAgIGlmICghdHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlLmRlZmF1bHRPcHRpb25zKSB7XG4gICAgICByZXZlcnNlRGVlcE1lcmdlKGZpZWxkLCB0eXBlLmRlZmF1bHRPcHRpb25zKTtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbmREZWZhdWx0cyA9IHR5cGUuZXh0ZW5kcyAmJiB0aGlzLmdldFR5cGUodHlwZS5leHRlbmRzKS5kZWZhdWx0T3B0aW9ucztcbiAgICBpZiAoZXh0ZW5kRGVmYXVsdHMpIHtcbiAgICAgIHJldmVyc2VEZWVwTWVyZ2UoZmllbGQsIGV4dGVuZERlZmF1bHRzKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGQ/Lm9wdGlvbnNUeXBlcykge1xuICAgICAgZmllbGQub3B0aW9uc1R5cGVzLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHRoaXMuZ2V0VHlwZShvcHRpb24pLmRlZmF1bHRPcHRpb25zO1xuICAgICAgICBpZiAoZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGZpZWxkLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMucmVzb2x2ZUZpZWxkVHlwZVJlZihmaWVsZCk7XG4gICAgaWYgKGNvbXBvbmVudFJlZj8uaW5zdGFuY2U/LmRlZmF1bHRPcHRpb25zKSB7XG4gICAgICByZXZlcnNlRGVlcE1lcmdlKGZpZWxkLCBjb21wb25lbnRSZWYuaW5zdGFuY2UuZGVmYXVsdE9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICghZmllbGQud3JhcHBlcnMgJiYgdHlwZS53cmFwcGVycykge1xuICAgICAgZmllbGQud3JhcHBlcnMgPSBbLi4udHlwZS53cmFwcGVyc107XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpZ25vcmUgQGludGVybmFsICovXG4gIHJlc29sdmVGaWVsZFR5cGVSZWYoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgPSB7fSk6IENvbXBvbmVudFJlZjxGaWVsZFR5cGU+IHtcbiAgICBjb25zdCB0eXBlOiBUeXBlT3B0aW9uICYgeyBfY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPGFueT4gfSA9IHRoaXMuZ2V0VHlwZShmaWVsZC50eXBlKTtcbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghdHlwZS5jb21wb25lbnQgfHwgdHlwZS5fY29tcG9uZW50UmVmKSB7XG4gICAgICByZXR1cm4gdHlwZS5fY29tcG9uZW50UmVmO1xuICAgIH1cblxuICAgIGNvbnN0IHsgX3ZpZXdDb250YWluZXJSZWYsIF9pbmplY3RvciB9ID0gZmllbGQub3B0aW9ucztcbiAgICBpZiAoIV92aWV3Q29udGFpbmVyUmVmIHx8ICFfaW5qZWN0b3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IF92aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudDxGaWVsZFR5cGU+KHR5cGUuY29tcG9uZW50LCB7IGluamVjdG9yOiBfaW5qZWN0b3IgfSk7XG4gICAgZGVmaW5lSGlkZGVuUHJvcCh0eXBlLCAnX2NvbXBvbmVudFJlZicsIGNvbXBvbmVudFJlZik7XG4gICAgdHJ5IHtcbiAgICAgIGNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZGVzdHJveWluZyB0aGUgRm9ybWx5IGNvbXBvbmVudCB0eXBlIFwiJHtmaWVsZC50eXBlfVwiYCwgZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGUuX2NvbXBvbmVudFJlZjtcbiAgfVxuXG4gIHNldFdyYXBwZXIob3B0aW9uczogV3JhcHBlck9wdGlvbikge1xuICAgIHRoaXMud3JhcHBlcnNbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMudHlwZXMpIHtcbiAgICAgIG9wdGlvbnMudHlwZXMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLnNldFR5cGVXcmFwcGVyKHR5cGUsIG9wdGlvbnMubmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRXcmFwcGVyKG5hbWU6IHN0cmluZyB8IFR5cGU8RmllbGRXcmFwcGVyPik6IFdyYXBwZXJPcHRpb24ge1xuICAgIGlmIChuYW1lIGluc3RhbmNlb2YgVHlwZSkge1xuICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiBuYW1lLCBuYW1lOiBuYW1lLnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lIH07XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndyYXBwZXJzW25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBbRm9ybWx5IEVycm9yXSBUaGUgd3JhcHBlciBcIiR7bmFtZX1cIiBjb3VsZCBub3QgYmUgZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCBpcyByZWdpc3RlcmVkIHRocm91Z2ggdGhlIEZvcm1seU1vZHVsZSBkZWNsYXJhdGlvbi5gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy53cmFwcGVyc1tuYW1lXTtcbiAgfVxuXG4gIC8qKiBAaWdub3JlICovXG4gIHNldFR5cGVXcmFwcGVyKHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnR5cGVzW3R5cGVdKSB7XG4gICAgICB0aGlzLnR5cGVzW3R5cGVdID0gPFR5cGVPcHRpb24+e307XG4gICAgfVxuICAgIGlmICghdGhpcy50eXBlc1t0eXBlXS53cmFwcGVycykge1xuICAgICAgdGhpcy50eXBlc1t0eXBlXS53cmFwcGVycyA9IFtdO1xuICAgIH1cbiAgICBpZiAodGhpcy50eXBlc1t0eXBlXS53cmFwcGVycy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgdGhpcy50eXBlc1t0eXBlXS53cmFwcGVycy5wdXNoKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbGlkYXRvcihvcHRpb25zOiBWYWxpZGF0b3JPcHRpb24pIHtcbiAgICB0aGlzLnZhbGlkYXRvcnNbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gIH1cblxuICBnZXRWYWxpZGF0b3IobmFtZTogc3RyaW5nKTogVmFsaWRhdG9yT3B0aW9uIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdG9yc1tuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgW0Zvcm1seSBFcnJvcl0gVGhlIHZhbGlkYXRvciBcIiR7bmFtZX1cIiBjb3VsZCBub3QgYmUgZm91bmQuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCBpcyByZWdpc3RlcmVkIHRocm91Z2ggdGhlIEZvcm1seU1vZHVsZSBkZWNsYXJhdGlvbi5gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy52YWxpZGF0b3JzW25hbWVdO1xuICB9XG5cbiAgYWRkVmFsaWRhdG9yTWVzc2FnZShuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IFZhbGlkYXRpb25NZXNzYWdlT3B0aW9uWydtZXNzYWdlJ10pIHtcbiAgICB0aGlzLm1lc3NhZ2VzW25hbWVdID0gbWVzc2FnZTtcbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICBjb25zdCBkZXByZWNhdGVkID0geyBtaW5sZW5ndGg6ICdtaW5MZW5ndGgnLCBtYXhsZW5ndGg6ICdtYXhMZW5ndGgnIH0gYXMgYW55O1xuICAgICAgaWYgKGRlcHJlY2F0ZWRbbmFtZV0pIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBGb3JtbHkgZGVwcmVjYXRpb246IHBhc3NpbmcgdmFsaWRhdGlvbiBtZXNzYWdlcyBrZXkgJyR7bmFtZX0nIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjYuMCwgdXNlICcke2RlcHJlY2F0ZWRbbmFtZV19JyBpbnN0ZWFkLmAsXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMubWVzc2FnZXNbZGVwcmVjYXRlZFtuYW1lXV0gPSBtZXNzYWdlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFZhbGlkYXRvck1lc3NhZ2UobmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMubWVzc2FnZXNbbmFtZV07XG4gIH1cblxuICBwcml2YXRlIHNldFNvcnRlZEV4dGVuc2lvbnMoZXh0ZW5zaW9uT3B0aW9uczogRXh0ZW5zaW9uT3B0aW9uW10pIHtcbiAgICAvLyBpbnNlcnQgbmV3IGV4dGVuc2lvbnMsIGdyb3VwZWQgYnkgcHJpb3JpdHlcbiAgICBleHRlbnNpb25PcHRpb25zLmZvckVhY2goKGV4dGVuc2lvbk9wdGlvbikgPT4ge1xuICAgICAgY29uc3QgcHJpb3JpdHkgPSBleHRlbnNpb25PcHRpb24ucHJpb3JpdHkgPz8gMTtcbiAgICAgIHRoaXMuZXh0ZW5zaW9uc0J5UHJpb3JpdHlbcHJpb3JpdHldID0ge1xuICAgICAgICAuLi50aGlzLmV4dGVuc2lvbnNCeVByaW9yaXR5W3ByaW9yaXR5XSxcbiAgICAgICAgW2V4dGVuc2lvbk9wdGlvbi5uYW1lXTogZXh0ZW5zaW9uT3B0aW9uLmV4dGVuc2lvbixcbiAgICAgIH07XG4gICAgfSk7XG4gICAgLy8gZmxhdHRlbiBleHRlbnNpb25zIG9iamVjdCB3aXRoIHNvcnRlZCBrZXlzXG4gICAgdGhpcy5leHRlbnNpb25zID0gT2JqZWN0LmtleXModGhpcy5leHRlbnNpb25zQnlQcmlvcml0eSlcbiAgICAgIC5tYXAoTnVtYmVyKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGEgLSBiKVxuICAgICAgLnJlZHVjZShcbiAgICAgICAgKGFjYywgcHJpbykgPT4gKHtcbiAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgLi4udGhpcy5leHRlbnNpb25zQnlQcmlvcml0eVtwcmlvXSxcbiAgICAgICAgfSksXG4gICAgICAgIHt9LFxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbWVyZ2VFeHRlbmRlZFR5cGUobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnR5cGVzW25hbWVdLmV4dGVuZHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBleHRlbmRlZFR5cGUgPSB0aGlzLmdldFR5cGUodGhpcy50eXBlc1tuYW1lXS5leHRlbmRzKTtcbiAgICBpZiAoIXRoaXMudHlwZXNbbmFtZV0uY29tcG9uZW50KSB7XG4gICAgICB0aGlzLnR5cGVzW25hbWVdLmNvbXBvbmVudCA9IGV4dGVuZGVkVHlwZS5jb21wb25lbnQ7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnR5cGVzW25hbWVdLndyYXBwZXJzKSB7XG4gICAgICB0aGlzLnR5cGVzW25hbWVdLndyYXBwZXJzID0gZXh0ZW5kZWRUeXBlLndyYXBwZXJzO1xuICAgIH1cbiAgfVxufVxuIl19