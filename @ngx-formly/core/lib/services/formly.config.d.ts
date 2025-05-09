import { InjectionToken, ComponentRef, Type } from '@angular/core';
import { FieldType } from './../templates/field.type';
import { FormlyFieldConfig, FormlyFieldConfigCache, ConfigOption, TypeOption, ValidatorOption, WrapperOption, FormlyExtension, ValidationMessageOption, FormlyFieldConfigPresetProvider } from '../models';
import { FieldWrapper } from '../templates/field.wrapper';
import * as i0 from "@angular/core";
/**
 * An InjectionToken for registering additional formly config options (types, wrappers ...).
 */
export declare const FORMLY_CONFIG: InjectionToken<ConfigOption[]>;
/**
 * Maintains list of formly config options. This can be used to register new field type.
 */
export declare class FormlyConfig {
    types: {
        [name: string]: TypeOption;
    };
    validators: {
        [name: string]: ValidatorOption;
    };
    wrappers: {
        [name: string]: WrapperOption;
    };
    messages: {
        [name: string]: ValidationMessageOption['message'];
    };
    extras: NonNullable<ConfigOption['extras']>;
    extensions: {
        [name: string]: FormlyExtension;
    };
    presets: {
        [name: string]: FormlyFieldConfig | FormlyFieldConfigPresetProvider;
    };
    private extensionsByPriority;
    addConfig(config: ConfigOption): void;
    /**
     * Allows you to specify a custom type which you can use in your field configuration.
     * You can pass an object of options, or an array of objects of options.
     */
    setType(options: TypeOption | TypeOption[]): void;
    getType(name: FormlyFieldConfig['type'], throwIfNotFound?: boolean): TypeOption;
    /** @ignore */
    getMergedField(field?: FormlyFieldConfig): any;
    /** @ignore @internal */
    resolveFieldTypeRef(field?: FormlyFieldConfigCache): ComponentRef<FieldType>;
    setWrapper(options: WrapperOption): void;
    getWrapper(name: string | Type<FieldWrapper>): WrapperOption;
    /** @ignore */
    setTypeWrapper(type: string, name: string): void;
    setValidator(options: ValidatorOption): void;
    getValidator(name: string): ValidatorOption;
    addValidatorMessage(name: string, message: ValidationMessageOption['message']): void;
    getValidatorMessage(name: string): string | ((error: any, field: FormlyFieldConfig<import("../models").FormlyFieldProps & {
        [additionalProperties: string]: any;
    }>) => string | import("rxjs").Observable<string>);
    private setSortedExtensions;
    private mergeExtendedType;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormlyConfig>;
}
