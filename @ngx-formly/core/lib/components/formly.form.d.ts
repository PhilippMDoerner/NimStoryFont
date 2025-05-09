import { DoCheck, OnChanges, SimpleChanges, EventEmitter, OnDestroy, NgZone, QueryList } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyFieldConfigCache } from '../models';
import { FormlyFormBuilder } from '../services/formly.builder';
import { FormlyConfig } from '../services/formly.config';
import { FormlyFieldTemplates, FormlyTemplate } from './formly.template';
import * as i0 from "@angular/core";
/**
 * The `<form-form>` component is the main container of the form,
 * which takes care of managing the form state
 * and delegates the rendering of each field to `<formly-field>` component.
 */
export declare class FormlyForm implements DoCheck, OnChanges, OnDestroy {
    private builder;
    private config;
    private ngZone;
    private fieldTemplates;
    /** The form instance which allow to track model value and validation status. */
    set form(form: FormGroup | FormArray);
    get form(): FormGroup | FormArray;
    /** The model to be represented by the form. */
    set model(model: any);
    get model(): any;
    /** The field configurations for building the form. */
    set fields(fieldGroup: FormlyFieldConfig[]);
    get fields(): FormlyFieldConfig[];
    /** Options for the form. */
    set options(options: FormlyFormOptions);
    get options(): FormlyFormOptions;
    /** Event that is emitted when the model value is changed */
    modelChange: EventEmitter<any>;
    set templates(templates: QueryList<FormlyTemplate>);
    field: FormlyFieldConfigCache;
    private _modelChangeValue;
    private valueChangesUnsubscribe;
    constructor(builder: FormlyFormBuilder, config: FormlyConfig, ngZone: NgZone, fieldTemplates: FormlyFieldTemplates);
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private checkExpressionChange;
    private valueChanges;
    private setField;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyForm, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyForm, "formly-form", never, { "form": "form"; "model": "model"; "fields": "fields"; "options": "options"; }, { "modelChange": "modelChange"; }, ["templates"], never>;
}
