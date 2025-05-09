import { Injector, ViewContainerRef } from '@angular/core';
import { FormGroup, FormArray, FormGroupDirective } from '@angular/forms';
import { FormlyConfig } from './formly.config';
import { FormlyFieldConfig, FormlyFormOptions } from '../models';
import * as i0 from "@angular/core";
export declare class FormlyFormBuilder {
    private config;
    private injector;
    private viewContainerRef;
    private parentForm;
    constructor(config: FormlyConfig, injector: Injector, viewContainerRef: ViewContainerRef, parentForm: FormGroupDirective);
    buildForm(form: FormGroup | FormArray, fieldGroup: FormlyFieldConfig[], model: any, options: FormlyFormOptions): void;
    build(field: FormlyFieldConfig): void;
    private _build;
    private _setOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFormBuilder, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormlyFormBuilder>;
}
