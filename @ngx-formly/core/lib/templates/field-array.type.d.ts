import { FormArray } from '@angular/forms';
import { FieldType } from './field.type';
import { FormlyFieldConfig, FormlyExtension } from '../models';
import * as i0 from "@angular/core";
export interface FieldArrayTypeConfig<T = FormlyFieldConfig['props']> extends FormlyFieldConfig<T> {
    formControl: FormArray;
    props: NonNullable<T>;
}
export declare abstract class FieldArrayType<F extends FormlyFieldConfig = FieldArrayTypeConfig> extends FieldType<F> implements FormlyExtension<F> {
    onPopulate(field: F): void;
    add(i?: number, initialModel?: any, { markAsDirty }?: {
        markAsDirty: boolean;
    }): void;
    remove(i: number, { markAsDirty }?: {
        markAsDirty: boolean;
    }): void;
    private _build;
    private updateArrayElementKey;
    private markFieldForCheck;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldArrayType<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FieldArrayType<any>, never, never, {}, {}, never>;
}
