import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { FormlyBootstrapFormFieldModule } from '@ngx-formly/bootstrap/form-field';
import { FormlyFieldMultiCheckbox } from './multicheckbox.type';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
export class FormlyBootstrapMultiCheckboxModule {
}
FormlyBootstrapMultiCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapMultiCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyBootstrapMultiCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapMultiCheckboxModule, declarations: [FormlyFieldMultiCheckbox], imports: [CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapFormFieldModule,
        FormlySelectModule, i1.FormlyModule] });
FormlyBootstrapMultiCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapMultiCheckboxModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            FormlyBootstrapFormFieldModule,
            FormlySelectModule,
            FormlyModule.forChild({
                types: [
                    {
                        name: 'multicheckbox',
                        component: FormlyFieldMultiCheckbox,
                        wrappers: ['form-field'],
                    },
                ],
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapMultiCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FormlyFieldMultiCheckbox],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormlyBootstrapFormFieldModule,
                        FormlySelectModule,
                        FormlyModule.forChild({
                            types: [
                                {
                                    name: 'multicheckbox',
                                    component: FormlyFieldMultiCheckbox,
                                    wrappers: ['form-field'],
                                },
                            ],
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGljaGVja2JveC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvYm9vdHN0cmFwL211bHRpY2hlY2tib3gvc3JjL211bHRpY2hlY2tib3gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVsRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBcUJoRSxNQUFNLE9BQU8sa0NBQWtDOztnSUFBbEMsa0NBQWtDO2lJQUFsQyxrQ0FBa0MsaUJBbEI5Qix3QkFBd0IsYUFFckMsWUFBWTtRQUNaLG1CQUFtQjtRQUVuQiw4QkFBOEI7UUFDOUIsa0JBQWtCO2lJQVlULGtDQUFrQyxZQWpCcEM7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1lBRW5CLDhCQUE4QjtZQUM5QixrQkFBa0I7WUFDbEIsWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDcEIsS0FBSyxFQUFFO29CQUNMO3dCQUNFLElBQUksRUFBRSxlQUFlO3dCQUNyQixTQUFTLEVBQUUsd0JBQXdCO3dCQUNuQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUM7cUJBQ3pCO2lCQUNGO2FBQ0YsQ0FBQztTQUNIOzRGQUVVLGtDQUFrQztrQkFuQjlDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7b0JBQ3hDLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFFbkIsOEJBQThCO3dCQUM5QixrQkFBa0I7d0JBQ2xCLFlBQVksQ0FBQyxRQUFRLENBQUM7NEJBQ3BCLEtBQUssRUFBRTtnQ0FDTDtvQ0FDRSxJQUFJLEVBQUUsZUFBZTtvQ0FDckIsU0FBUyxFQUFFLHdCQUF3QjtvQ0FDbkMsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDO2lDQUN6Qjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlL3NlbGVjdCc7XG5pbXBvcnQgeyBGb3JtbHlCb290c3RyYXBGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAbmd4LWZvcm1seS9ib290c3RyYXAvZm9ybS1maWVsZCc7XG5cbmltcG9ydCB7IEZvcm1seUZpZWxkTXVsdGlDaGVja2JveCB9IGZyb20gJy4vbXVsdGljaGVja2JveC50eXBlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRm9ybWx5RmllbGRNdWx0aUNoZWNrYm94XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgRm9ybWx5Qm9vdHN0cmFwRm9ybUZpZWxkTW9kdWxlLFxuICAgIEZvcm1seVNlbGVjdE1vZHVsZSxcbiAgICBGb3JtbHlNb2R1bGUuZm9yQ2hpbGQoe1xuICAgICAgdHlwZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdtdWx0aWNoZWNrYm94JyxcbiAgICAgICAgICBjb21wb25lbnQ6IEZvcm1seUZpZWxkTXVsdGlDaGVja2JveCxcbiAgICAgICAgICB3cmFwcGVyczogWydmb3JtLWZpZWxkJ10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlCb290c3RyYXBNdWx0aUNoZWNrYm94TW9kdWxlIHt9XG4iXX0=