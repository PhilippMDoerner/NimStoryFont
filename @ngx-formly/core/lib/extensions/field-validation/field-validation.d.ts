import { FormlyConfig } from '../../services/formly.config';
import { FormlyExtension, FormlyFieldConfigCache } from '../../models';
export declare class FieldValidationExtension implements FormlyExtension {
    private config;
    constructor(config: FormlyConfig);
    onPopulate(field: FormlyFieldConfigCache): void;
    private initFieldValidation;
    private getPredefinedFieldValidation;
    private wrapNgValidatorFn;
    private handleResult;
}
