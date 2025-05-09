import { Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, FormlyFieldProps } from '@ngx-formly/bootstrap/form-field';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
interface RadioProps extends FormlyFieldProps {
    formCheck?: 'default' | 'inline';
}
export interface FormlyRadioFieldConfig extends FormlyFieldConfig<RadioProps> {
    type: 'radio' | Type<FormlyFieldRadio>;
}
export declare class FormlyFieldRadio extends FieldType<FieldTypeConfig<RadioProps>> {
    defaultOptions: {
        props: {
            formCheck: "default";
        };
    };
    get disabledControl(): FormControl;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldRadio, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldRadio, "formly-field-radio", never, {}, {}, never, never>;
}
export {};
