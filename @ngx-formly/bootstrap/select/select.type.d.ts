import { NgZone, Type, ViewContainerRef } from '@angular/core';
import { FieldTypeConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldType, FormlyFieldProps } from '@ngx-formly/bootstrap/form-field';
import { FormlyFieldSelectProps } from '@ngx-formly/core/select';
import * as i0 from "@angular/core";
interface SelectProps extends FormlyFieldProps, FormlyFieldSelectProps {
    multiple?: boolean;
    compareWith?: (o1: any, o2: any) => boolean;
}
export interface FormlySelectFieldConfig extends FormlyFieldConfig<SelectProps> {
    type: 'select' | Type<FormlyFieldSelect>;
}
export declare class FormlyFieldSelect extends FieldType<FieldTypeConfig<SelectProps>> {
    private ngZone;
    defaultOptions: {
        props: {
            compareWith(o1: any, o2: any): boolean;
        };
    };
    /**
     * TODO: Check if this is still needed
     */
    set selectAccessor(s: any);
    constructor(ngZone: NgZone, hostContainerRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldSelect, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyFieldSelect, "formly-field-select", never, {}, {}, never, never>;
}
export {};
