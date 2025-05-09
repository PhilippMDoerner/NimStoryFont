import { OnDestroy, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FormlyFieldConfig, FormlyFieldProps } from '@ngx-formly/core';
import * as i0 from "@angular/core";
export interface FormlySelectOption {
    label: string;
    disabled?: boolean;
    value?: any;
    group?: FormlySelectOption[];
}
export interface FormlyFieldSelectProps extends FormlyFieldProps {
    groupProp?: string | ((option: any) => string);
    labelProp?: string | ((option: any) => string);
    valueProp?: string | ((option: any) => any);
    disabledProp?: string | ((option: any) => boolean);
}
export declare class FormlySelectOptionsPipe implements PipeTransform, OnDestroy {
    private _subscription;
    private _options;
    transform(options: any, field?: FormlyFieldConfig): Observable<FormlySelectOption[]>;
    ngOnDestroy(): void;
    private transformOptions;
    private transformOption;
    private transformSelectProps;
    private dispose;
    private observableOf;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlySelectOptionsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FormlySelectOptionsPipe, "formlySelectOptions">;
}
