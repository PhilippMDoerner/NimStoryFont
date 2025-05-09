import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyWrapperFormField } from './form-field.wrapper';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
export class FormlyBootstrapFormFieldModule {
}
FormlyBootstrapFormFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapFormFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyBootstrapFormFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapFormFieldModule, declarations: [FormlyWrapperFormField], imports: [CommonModule,
        ReactiveFormsModule, i1.FormlyModule] });
FormlyBootstrapFormFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapFormFieldModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            FormlyModule.forChild({
                wrappers: [
                    {
                        name: 'form-field',
                        component: FormlyWrapperFormField,
                    },
                ],
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapFormFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FormlyWrapperFormField],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormlyModule.forChild({
                            wrappers: [
                                {
                                    name: 'form-field',
                                    component: FormlyWrapperFormField,
                                },
                            ],
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvYm9vdHN0cmFwL2Zvcm0tZmllbGQvc3JjL2Zvcm0tZmllbGQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBa0I5RCxNQUFNLE9BQU8sOEJBQThCOzs0SEFBOUIsOEJBQThCOzZIQUE5Qiw4QkFBOEIsaUJBZjFCLHNCQUFzQixhQUVuQyxZQUFZO1FBQ1osbUJBQW1COzZIQVlWLDhCQUE4QixZQWRoQztZQUNQLFlBQVk7WUFDWixtQkFBbUI7WUFFbkIsWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDcEIsUUFBUSxFQUFFO29CQUNSO3dCQUNFLElBQUksRUFBRSxZQUFZO3dCQUNsQixTQUFTLEVBQUUsc0JBQXNCO3FCQUNsQztpQkFDRjthQUNGLENBQUM7U0FDSDs0RkFFVSw4QkFBOEI7a0JBaEIxQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUN0QyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBRW5CLFlBQVksQ0FBQyxRQUFRLENBQUM7NEJBQ3BCLFFBQVEsRUFBRTtnQ0FDUjtvQ0FDRSxJQUFJLEVBQUUsWUFBWTtvQ0FDbEIsU0FBUyxFQUFFLHNCQUFzQjtpQ0FDbEM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybWx5TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5V3JhcHBlckZvcm1GaWVsZCB9IGZyb20gJy4vZm9ybS1maWVsZC53cmFwcGVyJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRm9ybWx5V3JhcHBlckZvcm1GaWVsZF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIEZvcm1seU1vZHVsZS5mb3JDaGlsZCh7XG4gICAgICB3cmFwcGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2Zvcm0tZmllbGQnLFxuICAgICAgICAgIGNvbXBvbmVudDogRm9ybWx5V3JhcHBlckZvcm1GaWVsZCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUJvb3RzdHJhcEZvcm1GaWVsZE1vZHVsZSB7fVxuIl19