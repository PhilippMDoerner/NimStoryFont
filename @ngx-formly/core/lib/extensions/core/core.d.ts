import { FormlyConfig } from '../../services/formly.config';
import { FormlyFieldConfigCache, FormlyExtension } from '../../models';
export declare class CoreExtension implements FormlyExtension {
    private config;
    private formId;
    constructor(config: FormlyConfig);
    prePopulate(field: FormlyFieldConfigCache): void;
    onPopulate(field: FormlyFieldConfigCache): void;
    postPopulate(field: FormlyFieldConfigCache): void;
    private initFieldProps;
    private initRootOptions;
    private initFieldOptions;
    private getFieldComponentInstance;
}
