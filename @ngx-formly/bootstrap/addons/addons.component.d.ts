import { TemplateRef, ViewContainerRef } from '@angular/core';
import { FormlyFieldConfig, FieldTypeConfig, FieldWrapper } from '@ngx-formly/core';
import { FormlyFieldProps } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
interface AddonsProps extends FormlyFieldProps {
    addonRight?: {
        onClick?: (field: FormlyFieldConfig, event?: any) => void;
        class?: string;
        text?: string;
    };
    addonLeft?: {
        onClick?: (field: FormlyFieldConfig, event?: any) => void;
        class?: string;
        text?: string;
    };
}
export declare class FormlyWrapperAddons extends FieldWrapper<FieldTypeConfig<AddonsProps>> {
    private hostContainerRef?;
    set content(templateRef: TemplateRef<any>);
    constructor(hostContainerRef?: ViewContainerRef);
    addonRightClick($event: any): void;
    addonLeftClick($event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyWrapperAddons, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyWrapperAddons, "formly-wrapper-addons", never, {}, {}, never, never>;
}
export {};
