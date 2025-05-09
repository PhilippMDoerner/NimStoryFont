import { Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, FormlyFieldProps } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
interface TextAreaProps extends FormlyFieldProps {
    cols?: number;
    rows?: number;
}
export interface FormlyTextAreaFieldConfig extends FormlyFieldConfig<TextAreaProps> {
    type: 'textarea' | Type<FormlyFieldTextArea>;
}
export declare class FormlyFieldTextArea extends FieldType<FieldTypeConfig<TextAreaProps>> {
    defaultOptions: {
        props: {
            cols: number;
            rows: number;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldTextArea, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldTextArea, "formly-field-textarea", never, {}, {}, never, never>;
}
export {};
