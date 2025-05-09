import { ViewContainerRef, QueryList } from '@angular/core';
import { FieldType } from './field.type';
import { FormlyFieldConfig } from '../models';
import { NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare abstract class FieldWrapper<F extends FormlyFieldConfig = FormlyFieldConfig> extends FieldType<F> {
    set _formlyControls(_: QueryList<NgControl>);
    fieldComponent: ViewContainerRef;
    set _staticContent(content: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldWrapper<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FieldWrapper<any>, never, never, {}, {}, never>;
}
