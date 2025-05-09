import { Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, FormlyFieldProps } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
interface CheckboxProps extends FormlyFieldProps {
    formCheck?: 'default' | 'inline' | 'switch' | 'inline-switch' | 'nolabel';
    indeterminate?: boolean;
}
export interface FormlyCheckboxFieldConfig extends FormlyFieldConfig<CheckboxProps> {
    type: 'checkbox' | Type<FormlyFieldCheckbox>;
}
export declare class FormlyFieldCheckbox extends FieldType<FieldTypeConfig<CheckboxProps>> {
    defaultOptions: {
        props: {
            indeterminate: boolean;
            hideLabel: boolean;
            formCheck: "default";
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldCheckbox, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldCheckbox, "formly-field-checkbox", never, {}, {}, never, never>;
}
export {};
