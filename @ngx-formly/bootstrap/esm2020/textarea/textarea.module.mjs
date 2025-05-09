import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapFormFieldModule } from '@ngx-formly/bootstrap/form-field';
import { FormlyFieldTextArea } from './textarea.type';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
export class FormlyBootstrapTextAreaModule {
}
FormlyBootstrapTextAreaModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapTextAreaModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyBootstrapTextAreaModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapTextAreaModule, declarations: [FormlyFieldTextArea], imports: [CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapFormFieldModule, i1.FormlyModule] });
FormlyBootstrapTextAreaModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapTextAreaModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            FormlyBootstrapFormFieldModule,
            FormlyModule.forChild({
                types: [
                    {
                        name: 'textarea',
                        component: FormlyFieldTextArea,
                        wrappers: ['form-field'],
                    },
                ],
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapTextAreaModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FormlyFieldTextArea],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormlyBootstrapFormFieldModule,
                        FormlyModule.forChild({
                            types: [
                                {
                                    name: 'textarea',
                                    component: FormlyFieldTextArea,
                                    wrappers: ['form-field'],
                                },
                            ],
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2Jvb3RzdHJhcC90ZXh0YXJlYS9zcmMvdGV4dGFyZWEubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBb0J0RCxNQUFNLE9BQU8sNkJBQTZCOzsySEFBN0IsNkJBQTZCOzRIQUE3Qiw2QkFBNkIsaUJBakJ6QixtQkFBbUIsYUFFaEMsWUFBWTtRQUNaLG1CQUFtQjtRQUVuQiw4QkFBOEI7NEhBWXJCLDZCQUE2QixZQWhCL0I7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1lBRW5CLDhCQUE4QjtZQUM5QixZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUNwQixLQUFLLEVBQUU7b0JBQ0w7d0JBQ0UsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLFNBQVMsRUFBRSxtQkFBbUI7d0JBQzlCLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQztxQkFDekI7aUJBQ0Y7YUFDRixDQUFDO1NBQ0g7NEZBRVUsNkJBQTZCO2tCQWxCekMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDbkMsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUVuQiw4QkFBOEI7d0JBQzlCLFlBQVksQ0FBQyxRQUFRLENBQUM7NEJBQ3BCLEtBQUssRUFBRTtnQ0FDTDtvQ0FDRSxJQUFJLEVBQUUsVUFBVTtvQ0FDaEIsU0FBUyxFQUFFLG1CQUFtQjtvQ0FDOUIsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDO2lDQUN6Qjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3JtbHlNb2R1bGUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZvcm1seUJvb3RzdHJhcEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IEZvcm1seUZpZWxkVGV4dEFyZWEgfSBmcm9tICcuL3RleHRhcmVhLnR5cGUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtGb3JtbHlGaWVsZFRleHRBcmVhXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgRm9ybWx5Qm9vdHN0cmFwRm9ybUZpZWxkTW9kdWxlLFxuICAgIEZvcm1seU1vZHVsZS5mb3JDaGlsZCh7XG4gICAgICB0eXBlczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3RleHRhcmVhJyxcbiAgICAgICAgICBjb21wb25lbnQ6IEZvcm1seUZpZWxkVGV4dEFyZWEsXG4gICAgICAgICAgd3JhcHBlcnM6IFsnZm9ybS1maWVsZCddLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5Qm9vdHN0cmFwVGV4dEFyZWFNb2R1bGUge31cbiJdfQ==