import { FormlyExtension, FormlyFieldConfigCache } from '../../models';
export declare class FieldFormExtension implements FormlyExtension {
    private root;
    prePopulate(field: FormlyFieldConfigCache): void;
    onPopulate(field: FormlyFieldConfigCache): void;
    postPopulate(field: FormlyFieldConfigCache): void;
    private addFormControl;
    private setValidators;
    private hasValidators;
    private mergeValidators;
}
