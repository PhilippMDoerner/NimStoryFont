import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyWrapperAddons } from './addons.component';
import { addonsExtension } from './addon.extension';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
export class FormlyBootstrapAddonsModule {
}
FormlyBootstrapAddonsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapAddonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyBootstrapAddonsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapAddonsModule, declarations: [FormlyWrapperAddons], imports: [CommonModule,
        ReactiveFormsModule, i1.FormlyModule] });
FormlyBootstrapAddonsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapAddonsModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            FormlyModule.forChild({
                wrappers: [{ name: 'addons', component: FormlyWrapperAddons }],
                extensions: [{ name: 'addons', extension: { postPopulate: addonsExtension } }],
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapAddonsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FormlyWrapperAddons],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormlyModule.forChild({
                            wrappers: [{ name: 'addons', component: FormlyWrapperAddons }],
                            extensions: [{ name: 'addons', extension: { postPopulate: addonsExtension } }],
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb25zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9ib290c3RyYXAvYWRkb25zL3NyYy9hZGRvbnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQWNwRCxNQUFNLE9BQU8sMkJBQTJCOzt5SEFBM0IsMkJBQTJCOzBIQUEzQiwyQkFBMkIsaUJBWHZCLG1CQUFtQixhQUVoQyxZQUFZO1FBQ1osbUJBQW1COzBIQVFWLDJCQUEyQixZQVY3QjtZQUNQLFlBQVk7WUFDWixtQkFBbUI7WUFFbkIsWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDcEIsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO2dCQUM5RCxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxFQUFFLENBQUM7YUFDL0UsQ0FBQztTQUNIOzRGQUVVLDJCQUEyQjtrQkFadkMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDbkMsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUVuQixZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQixRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLENBQUM7NEJBQzlELFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FBQzt5QkFDL0UsQ0FBQztxQkFDSDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybWx5TW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGb3JtbHlXcmFwcGVyQWRkb25zIH0gZnJvbSAnLi9hZGRvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IGFkZG9uc0V4dGVuc2lvbiB9IGZyb20gJy4vYWRkb24uZXh0ZW5zaW9uJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRm9ybWx5V3JhcHBlckFkZG9uc10sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIEZvcm1seU1vZHVsZS5mb3JDaGlsZCh7XG4gICAgICB3cmFwcGVyczogW3sgbmFtZTogJ2FkZG9ucycsIGNvbXBvbmVudDogRm9ybWx5V3JhcHBlckFkZG9ucyB9XSxcbiAgICAgIGV4dGVuc2lvbnM6IFt7IG5hbWU6ICdhZGRvbnMnLCBleHRlbnNpb246IHsgcG9zdFBvcHVsYXRlOiBhZGRvbnNFeHRlbnNpb24gfSB9XSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5Qm9vdHN0cmFwQWRkb25zTW9kdWxlIHt9XG4iXX0=