import { NgModule, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyForm } from './components/formly.form';
import { FormlyField } from './components/formly.field';
import { FormlyAttributes } from './templates/formly.attributes';
import { FormlyConfig, FORMLY_CONFIG } from './services/formly.config';
import { FormlyFormBuilder } from './services/formly.builder';
import { FormlyGroup } from './templates/formly.group';
import { FormlyValidationMessage } from './templates/formly.validation-message';
import { FormlyTemplateType } from './templates/field-template.type';
import { FieldExpressionExtension } from './extensions/field-expression/field-expression';
import { FieldValidationExtension } from './extensions/field-validation/field-validation';
import { FieldFormExtension } from './extensions/field-form/field-form';
import { CoreExtension } from './extensions/core/core';
import { FormlyTemplate } from './components/formly.template';
import * as i0 from "@angular/core";
import * as i1 from "./services/formly.config";
export function defaultFormlyConfig(config) {
    return {
        types: [
            { name: 'formly-group', component: FormlyGroup },
            { name: 'formly-template', component: FormlyTemplateType },
        ],
        extensions: [
            { name: 'core', extension: new CoreExtension(config), priority: -250 },
            { name: 'field-validation', extension: new FieldValidationExtension(config), priority: -200 },
            { name: 'field-form', extension: new FieldFormExtension(), priority: -150 },
            { name: 'field-expression', extension: new FieldExpressionExtension(), priority: -100 },
        ],
    };
}
export class FormlyModule {
    constructor(configService, configs = []) {
        if (!configs) {
            return;
        }
        configs.forEach((config) => configService.addConfig(config));
    }
    static forRoot(config = {}) {
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                FormlyConfig,
                FormlyFormBuilder,
            ],
        };
    }
    static forChild(config = {}) {
        return {
            ngModule: FormlyModule,
            providers: [
                { provide: FORMLY_CONFIG, multi: true, useFactory: defaultFormlyConfig, deps: [FormlyConfig] },
                { provide: FORMLY_CONFIG, useValue: config, multi: true },
                FormlyFormBuilder,
            ],
        };
    }
}
FormlyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyModule, deps: [{ token: i1.FormlyConfig }, { token: FORMLY_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.NgModule });
FormlyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyModule, declarations: [FormlyTemplate,
        FormlyForm,
        FormlyField,
        FormlyAttributes,
        FormlyGroup,
        FormlyValidationMessage,
        FormlyTemplateType], imports: [CommonModule], exports: [FormlyTemplate, FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage] });
FormlyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FormlyTemplate,
                        FormlyForm,
                        FormlyField,
                        FormlyAttributes,
                        FormlyGroup,
                        FormlyValidationMessage,
                        FormlyTemplateType,
                    ],
                    exports: [FormlyTemplate, FormlyForm, FormlyField, FormlyAttributes, FormlyGroup, FormlyValidationMessage],
                    imports: [CommonModule],
                }]
        }], ctorParameters: function () { return [{ type: i1.FormlyConfig }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [FORMLY_CONFIG]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zcmMvbGliL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFckUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDMUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDMUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBRTlELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxNQUFvQjtJQUN0RCxPQUFPO1FBQ0wsS0FBSyxFQUFFO1lBQ0wsRUFBRSxJQUFJ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Qjs7MEJBeUIyQyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1seUZvcm0gfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybWx5LmZvcm0nO1xuaW1wb3J0IHsgRm9ybWx5RmllbGQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybWx5LmZpZWxkJztcbmltcG9ydCB7IEZvcm1seUF0dHJpYnV0ZXMgfSBmcm9tICcuL3RlbXBsYXRlcy9mb3JtbHkuYXR0cmlidXRlcyc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcsIEZPUk1MWV9DT05GSUcgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5Rm9ybUJ1aWxkZXIgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm1seS5idWlsZGVyJztcbmltcG9ydCB7IEZvcm1seUdyb3VwIH0gZnJvbSAnLi90ZW1wbGF0ZXMvZm9ybWx5Lmdyb3VwJztcbmltcG9ydCB7IEZvcm1seVZhbGlkYXRpb25NZXNzYWdlIH0gZnJvbSAnLi90ZW1wbGF0ZXMvZm9ybWx5LnZhbGlkYXRpb24tbWVzc2FnZSc7XG5pbXBvcnQgeyBGb3JtbHlUZW1wbGF0ZVR5cGUgfSBmcm9tICcuL3RlbXBsYXRlcy9maWVsZC10ZW1wbGF0ZS50eXBlJztcblxuaW1wb3J0IHsgRmllbGRFeHByZXNzaW9uRXh0ZW5zaW9uIH0gZnJvbSAnLi9leHRlbnNpb25zL2ZpZWxkLWV4cHJlc3Npb24vZmllbGQtZXhwcmVzc2lvbic7XG5pbXBvcnQgeyBGaWVsZFZhbGlkYXRpb25FeHRlbnNpb24gfSBmcm9tICcuL2V4dGVuc2lvbnMvZmllbGQtdmFsaWRhdGlvbi9maWVsZC12YWxpZGF0aW9uJztcbmltcG9ydCB7IEZpZWxkRm9ybUV4dGVuc2lvbiB9IGZyb20gJy4vZXh0ZW5zaW9ucy9maWVsZC1mb3JtL2ZpZWxkLWZvcm0nO1xuaW1wb3J0IHsgQ29yZUV4dGVuc2lvbiB9IGZyb20gJy4vZXh0ZW5zaW9ucy9jb3JlL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnT3B0aW9uIH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgRm9ybWx5VGVtcGxhdGUgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybWx5LnRlbXBsYXRlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRGb3JtbHlDb25maWcoY29uZmlnOiBGb3JtbHlDb25maWcpOiBDb25maWdPcHRpb24ge1xuICByZXR1cm4ge1xuICAgIHR5cGVzOiBbXG4gICAgICB7IG5hbWU6ICdmb3JtbHktZ3JvdXAnLCBjb21wb25lbnQ6IEZvcm1seUdyb3VwIH0sXG4gICAgICB7IG5hbWU6ICdmb3JtbHktdGVtcGxhdGUnLCBjb21wb25lbnQ6IEZvcm1seVRlbXBsYXRlVHlwZSB9LFxuICAgIF0sXG4gICAgZXh0ZW5zaW9uczogW1xuICAgICAgeyBuYW1lOiAnY29yZScsIGV4dGVuc2lvbjogbmV3IENvcmVFeHRlbnNpb24oY29uZmlnKSwgcHJpb3JpdHk6IC0yNTAgfSxcbiAgICAgIHsgbmFtZTogJ2ZpZWxkLXZhbGlkYXRpb24nLCBleHRlbnNpb246IG5ldyBGaWVsZFZhbGlkYXRpb25FeHRlbnNpb24oY29uZmlnKSwgcHJpb3JpdHk6IC0yMDAgfSxcbiAgICAgIHsgbmFtZTogJ2ZpZWxkLWZvcm0nLCBleHRlbnNpb246IG5ldyBGaWVsZEZvcm1FeHRlbnNpb24oKSwgcHJpb3JpdHk6IC0xNTAgfSxcbiAgICAgIHsgbmFtZTogJ2ZpZWxkLWV4cHJlc3Npb24nLCBleHRlbnNpb246IG5ldyBGaWVsZEV4cHJlc3Npb25FeHRlbnNpb24oKSwgcHJpb3JpdHk6IC0xMDAgfSxcbiAgICBdLFxuICB9O1xufVxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3JtbHlUZW1wbGF0ZSxcbiAgICBGb3JtbHlGb3JtLFxuICAgIEZvcm1seUZpZWxkLFxuICAgIEZvcm1seUF0dHJpYnV0ZXMsXG4gICAgRm9ybWx5R3JvdXAsXG4gICAgRm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgRm9ybWx5VGVtcGxhdGVUeXBlLFxuICBdLFxuICBleHBvcnRzOiBbRm9ybWx5VGVtcGxhdGUsIEZvcm1seUZvcm0sIEZvcm1seUZpZWxkLCBGb3JtbHlBdHRyaWJ1dGVzLCBGb3JtbHlHcm91cCwgRm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBDb25maWdPcHRpb24gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Rm9ybWx5TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBGb3JtbHlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBGT1JNTFlfQ09ORklHLCBtdWx0aTogdHJ1ZSwgdXNlRmFjdG9yeTogZGVmYXVsdEZvcm1seUNvbmZpZywgZGVwczogW0Zvcm1seUNvbmZpZ10gfSxcbiAgICAgICAgeyBwcm92aWRlOiBGT1JNTFlfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnLCBtdWx0aTogdHJ1ZSB9LFxuICAgICAgICBGb3JtbHlDb25maWcsXG4gICAgICAgIEZvcm1seUZvcm1CdWlsZGVyLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKGNvbmZpZzogQ29uZmlnT3B0aW9uID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEZvcm1seU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRm9ybWx5TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogRk9STUxZX0NPTkZJRywgbXVsdGk6IHRydWUsIHVzZUZhY3Rvcnk6IGRlZmF1bHRGb3JtbHlDb25maWcsIGRlcHM6IFtGb3JtbHlDb25maWddIH0sXG4gICAgICAgIHsgcHJvdmlkZTogRk9STUxZX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZywgbXVsdGk6IHRydWUgfSxcbiAgICAgICAgRm9ybWx5Rm9ybUJ1aWxkZXIsXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb25maWdTZXJ2aWNlOiBGb3JtbHlDb25maWcsIEBPcHRpb25hbCgpIEBJbmplY3QoRk9STUxZX0NPTkZJRykgY29uZmlnczogQ29uZmlnT3B0aW9uW10gPSBbXSkge1xuICAgIGlmICghY29uZmlncykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbmZpZ3MuZm9yRWFjaCgoY29uZmlnKSA9PiBjb25maWdTZXJ2aWNlLmFkZENvbmZpZyhjb25maWcpKTtcbiAgfVxufVxuIl19