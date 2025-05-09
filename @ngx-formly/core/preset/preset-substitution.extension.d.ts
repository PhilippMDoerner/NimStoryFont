import { FormlyConfig, FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';
export declare class PresetSubstitutionExtension implements FormlyExtension {
    private formlyConfig;
    constructor(formlyConfig: FormlyConfig);
    prePopulate(field: FormlyFieldConfig): void;
}
export declare function registerLibraryConfigReplacementExtension(formlyConfig: FormlyConfig): {
    extensions: {
        name: string;
        extension: PresetSubstitutionExtension;
        priority: number;
    }[];
};
