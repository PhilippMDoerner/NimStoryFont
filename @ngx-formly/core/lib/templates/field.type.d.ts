import { QueryList } from '@angular/core';
import { FormControl, NgControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '../models';
import * as i0 from "@angular/core";
export interface FieldTypeConfig<T = FormlyFieldConfig['props']> extends FormlyFieldConfig<T> {
    formControl: FormControl;
    props: NonNullable<T>;
}
export interface FieldGroupTypeConfig<T = FormlyFieldConfig['props']> extends FormlyFieldConfig<T> {
    formControl: FormGroup;
    props: NonNullable<T>;
}
export declare abstract class FieldType<F extends FormlyFieldConfig = FormlyFieldConfig> {
    set _formlyControls(controls: QueryList<NgControl>);
    field: F;
    defaultOptions?: Partial<F>;
    get model(): any;
    get form(): FormGroup | import("@angular/forms").FormArray;
    get options(): import("../models").FormlyFormOptions;
    get key(): string | number | (string | number)[];
    get formControl(): NonNullable<F["formControl"]>;
    get props(): NonNullable<F["props"]>;
    /** @deprecated Use `props` instead. */
    get to(): NonNullable<F["props"]>;
    get showError(): boolean;
    get id(): string;
    get formState(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldType<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FieldType<any>, never, never, { "field": "field"; }, {}, never>;
}
