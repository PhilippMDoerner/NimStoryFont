import { Type } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, FormlyFieldProps } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
interface InputProps extends FormlyFieldProps {
}
export interface FormlyInputFieldConfig extends FormlyFieldConfig<InputProps> {
    type: 'input' | Type<FormlyFieldInput>;
}
export declare class FormlyFieldInput extends FieldType<FieldTypeConfig<InputProps>> {
    get type(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldInput, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldInput, "formly-field-input", never, {}, {}, never, never>;
}
export {};
