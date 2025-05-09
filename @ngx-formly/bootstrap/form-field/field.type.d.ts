import { TemplateRef, ViewContainerRef } from '@angular/core';
import { FieldType as CoreFieldType, FormlyFieldConfig } from '@ngx-formly/core';
import * as i0 from "@angular/core";
export declare abstract class FieldType<F extends FormlyFieldConfig = FormlyFieldConfig> extends CoreFieldType<F> {
    private hostContainerRef?;
    set content(templateRef: TemplateRef<any>);
    constructor(hostContainerRef?: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldType<any>, [{ optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FieldType<any>, never, never, {}, {}, never>;
}
