import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FieldType } from './field.type';
import * as i0 from "@angular/core";
/** @ignore */
export declare class FormlyTemplateType extends FieldType {
    private sanitizer;
    get template(): SafeHtml;
    private innerHtml;
    constructor(sanitizer: DomSanitizer);
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyTemplateType, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyTemplateType, "formly-template", never, {}, {}, never, never>;
}
