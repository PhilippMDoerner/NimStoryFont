import { Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, FormlyFieldProps } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
interface MultiCheckboxProps extends FormlyFieldProps {
    formCheck?: 'default' | 'inline' | 'switch' | 'inline-switch';
}
export interface FormlyMultiCheckboxFieldConfig extends FormlyFieldConfig<MultiCheckboxProps> {
    type: 'multicheckbox' | Type<FormlyFieldMultiCheckbox>;
}
export declare class FormlyFieldMultiCheckbox extends FieldType<FieldTypeConfig<MultiCheckboxProps>> {
    defaultOptions: {
        props: {
            formCheck: "default";
        };
    };
    onChange(value: any, checked: boolean): void;
    isChecked(option: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldMultiCheckbox, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldMultiCheckbox, "formly-field-multicheckbox", never, {}, {}, never, never>;
}
export {};
