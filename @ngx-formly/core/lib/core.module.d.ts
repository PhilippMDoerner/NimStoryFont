import { ModuleWithProviders } from '@angular/core';
import { FormlyConfig } from './services/formly.config';
import { ConfigOption } from './models';
import * as i0 from "@angular/core";
import * as i1 from "./components/formly.template";
import * as i2 from "./components/formly.form";
import * as i3 from "./components/formly.field";
import * as i4 from "./templates/formly.attributes";
import * as i5 from "./templates/formly.group";
import * as i6 from "./templates/formly.validation-message";
import * as i7 from "./templates/field-template.type";
import * as i8 from "@angular/common";
export declare function defaultFormlyConfig(config: FormlyConfig): ConfigOption;
export declare class FormlyModule {
    static forRoot(config?: ConfigOption): ModuleWithProviders<FormlyModule>;
    static forChild(config?: ConfigOption): ModuleWithProviders<FormlyModule>;
    constructor(configService: FormlyConfig, configs?: ConfigOption[]);
    static ɵfac: i0.ɵɵFactoryDeclaration<FormlyModule, [null, { optional: true; }]>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FormlyModule, [typeof i1.FormlyTemplate, typeof i2.FormlyForm, typeof i3.FormlyField, typeof i4.FormlyAttributes, typeof i5.FormlyGroup, typeof i6.FormlyValidationMessage, typeof i7.FormlyTemplateType], [typeof i8.CommonModule], [typeof i1.FormlyTemplate, typeof i2.FormlyForm, typeof i3.FormlyField, typeof i4.FormlyAttributes, typeof i5.FormlyGroup, typeof i6.FormlyValidationMessage]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FormlyModule>;
}
