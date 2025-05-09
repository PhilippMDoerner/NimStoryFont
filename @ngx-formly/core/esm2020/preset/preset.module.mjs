import { NgModule } from '@angular/core';
import { FormlyConfig, FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { registerLibraryConfigReplacementExtension } from './preset-substitution.extension';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
export class FormlyPresetModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3ByZXNldC9zcmMvcHJlc2V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzdFLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7QUFhNUYsTUFBTSxPQUFPLGtCQUFrQjs7Z0hBQWxCLGtCQUFrQjtpSEFBbEIsa0JBQWtCO2lIQUFsQixrQkFBa0IsYUFUbEI7UUFDVDtZQUNFLE9BQU8sRUFBRSxhQUFhO1lBQ3RCLFVBQVUsRUFBRSx5Q0FBeUM7WUFDckQsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQVJRLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0RkFVekIsa0JBQWtCO2tCQVg5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3BDLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsVUFBVSxFQUFFLHlDQUF5Qzs0QkFDckQsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDOzRCQUNwQixLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcsIEZvcm1seU1vZHVsZSwgRk9STUxZX0NPTkZJRyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJMaWJyYXJ5Q29uZmlnUmVwbGFjZW1lbnRFeHRlbnNpb24gfSBmcm9tICcuL3ByZXNldC1zdWJzdGl0dXRpb24uZXh0ZW5zaW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0Zvcm1seU1vZHVsZS5mb3JDaGlsZCh7fSldLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBGT1JNTFlfQ09ORklHLFxuICAgICAgdXNlRmFjdG9yeTogcmVnaXN0ZXJMaWJyYXJ5Q29uZmlnUmVwbGFjZW1lbnRFeHRlbnNpb24sXG4gICAgICBkZXBzOiBbRm9ybWx5Q29uZmlnXSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seVByZXNldE1vZHVsZSB7fVxuIl19