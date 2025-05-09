import { OnChanges } from '@angular/core';
import { FormlyConfig } from '../services/formly.config';
import { FormlyFieldConfig } from '../models';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * The `<formly-validation-message>` component renders the error message of a given `field`.
 */
export declare class FormlyValidationMessage implements OnChanges {
    private config;
    /** The field config. */
    field: FormlyFieldConfig;
    errorMessage$: Observable<string>;
    constructor(config: FormlyConfig);
    ngOnChanges(): void;
    get errorMessage(): string | Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyValidationMessage, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormlyValidationMessage, "formly-validation-message", never, { "field": "field"; }, {}, never, never>;
}
