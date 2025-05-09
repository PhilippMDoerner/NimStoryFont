import { OnChanges, QueryList, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FormlyTemplate implements OnChanges {
    ref: TemplateRef<any>;
    name: string;
    constructor(ref: TemplateRef<any>);
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyTemplate, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FormlyTemplate, "[formlyTemplate]", never, { "name": "formlyTemplate"; }, {}, never>;
}
export declare class FormlyFieldTemplates {
    templates: QueryList<FormlyTemplate>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyFieldTemplates, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormlyFieldTemplates>;
}
