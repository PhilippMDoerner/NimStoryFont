import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import * as i1 from '@ngx-formly/core';
import { ɵreverseDeepMerge, FORMLY_CONFIG, FormlyConfig, FormlyModule } from '@ngx-formly/core';

class PresetSubstitutionExtension {
    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;
    }
    prePopulate(field) {
        if (!(typeof field.type === 'string') || field.type[0] !== '#') {
            return;
        }
        const configId = new RegExp(/^#(.+)$/).exec(field.type)?.[1];
        const preset = this.formlyConfig.presets[configId];
        const { type: _, ...fieldConfigWithoutType } = field;
        if (preset) {
            const merged = ɵreverseDeepMerge(fieldConfigWithoutType, 'getConfiguration' in preset ? preset.getConfiguration() : preset);
            Object.assign(field, merged);
        }
    }
}
function registerLibraryConfigReplacementExtension(formlyConfig) {
    return {
        extensions: [
            {
                name: 'libraryConfigReplacement',
                extension: new PresetSubstitutionExtension(formlyConfig),
                priority: -300,
            },
        ],
    };
}

class FormlyPresetModule {
}
FormlyPresetModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyPresetModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyPresetModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyPresetModule, imports: [i1.FormlyModule] });
FormlyPresetModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyPresetModule, providers: [
        {
            provide: FORMLY_CONFIG,
            useFactory: registerLibraryConfigReplacementExtension,
            deps: [FormlyConfig],
            multi: true,
        },
    ], imports: [[FormlyModule.forChild({})]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyPresetModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FormlyModule.forChild({})],
                    providers: [
                        {
                            provide: FORMLY_CONFIG,
                            useFactory: registerLibraryConfigReplacementExtension,
                            deps: [FormlyConfig],
                            multi: true,
                        },
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FormlyPresetModule };
//# sourceMappingURL=ngx-formly-core-preset.mjs.map
