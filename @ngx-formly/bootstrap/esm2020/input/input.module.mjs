import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapFormFieldModule } from '@ngx-formly/bootstrap/form-field';
import { FormlyFieldInput } from './input.type';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
export class FormlyBootstrapInputModule {
}
FormlyBootstrapInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyBootstrapInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapInputModule, declarations: [FormlyFieldInput], imports: [CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapFormFieldModule, i1.FormlyModule] });
FormlyBootstrapInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapInputModule, imports: [[
            CommonModule,
            ReactiveFormsModule,
            FormlyBootstrapFormFieldModule,
            FormlyModule.forChild({
                types: [
                    {
                        name: 'input',
                        component: FormlyFieldInput,
                        wrappers: ['form-field'],
                    },
                    { name: 'string', extends: 'input' },
                    {
                        name: 'number',
                        extends: 'input',
                        defaultOptions: {
                            props: {
                                type: 'number',
                            },
                        },
                    },
                    {
                        name: 'integer',
                        extends: 'input',
                        defaultOptions: {
                            props: {
                                type: 'number',
                            },
                        },
                    },
                ],
            }),
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FormlyFieldInput],
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        FormlyBootstrapFormFieldModule,
                        FormlyModule.forChild({
                            types: [
                                {
                                    name: 'input',
                                    component: FormlyFieldInput,
                                    wrappers: ['form-field'],
                                },
                                { name: 'string', extends: 'input' },
                                {
                                    name: 'number',
                                    extends: 'input',
                                    defaultOptions: {
                                        props: {
                                            type: 'number',
                                        },
                                    },
                                },
                                {
                                    name: 'integer',
                                    extends: 'input',
                                    defaultOptions: {
                                        props: {
                                            type: 'number',
                                        },
                                    },
                                },
                            ],
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2Jvb3RzdHJhcC9pbnB1dC9zcmMvaW5wdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVsRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQXVDaEQsTUFBTSxPQUFPLDBCQUEwQjs7d0hBQTFCLDBCQUEwQjt5SEFBMUIsMEJBQTBCLGlCQXBDdEIsZ0JBQWdCLGFBRTdCLFlBQVk7UUFDWixtQkFBbUI7UUFFbkIsOEJBQThCO3lIQStCckIsMEJBQTBCLFlBbkM1QjtZQUNQLFlBQVk7WUFDWixtQkFBbUI7WUFFbkIsOEJBQThCO1lBQzlCLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQ3BCLEtBQUssRUFBRTtvQkFDTDt3QkFDRSxJQUFJLEVBQUUsT0FBTzt3QkFDYixTQUFTLEVBQUUsZ0JBQWdCO3dCQUMzQixRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUM7cUJBQ3pCO29CQUNELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO29CQUNwQzt3QkFDRSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsT0FBTzt3QkFDaEIsY0FBYyxFQUFFOzRCQUNkLEtBQUssRUFBRTtnQ0FDTCxJQUFJLEVBQUUsUUFBUTs2QkFDZjt5QkFDRjtxQkFDRjtvQkFDRDt3QkFDRSxJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsT0FBTzt3QkFDaEIsY0FBYyxFQUFFOzRCQUNkLEtBQUssRUFBRTtnQ0FDTCxJQUFJLEVBQUUsUUFBUTs2QkFDZjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGLENBQUM7U0FDSDs0RkFFVSwwQkFBMEI7a0JBckN0QyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUNoQyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBRW5CLDhCQUE4Qjt3QkFDOUIsWUFBWSxDQUFDLFFBQVEsQ0FBQzs0QkFDcEIsS0FBSyxFQUFFO2dDQUNMO29DQUNFLElBQUksRUFBRSxPQUFPO29DQUNiLFNBQVMsRUFBRSxnQkFBZ0I7b0NBQzNCLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQztpQ0FDekI7Z0NBQ0QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7Z0NBQ3BDO29DQUNFLElBQUksRUFBRSxRQUFRO29DQUNkLE9BQU8sRUFBRSxPQUFPO29DQUNoQixjQUFjLEVBQUU7d0NBQ2QsS0FBSyxFQUFFOzRDQUNMLElBQUksRUFBRSxRQUFRO3lDQUNmO3FDQUNGO2lDQUNGO2dDQUNEO29DQUNFLElBQUksRUFBRSxTQUFTO29DQUNmLE9BQU8sRUFBRSxPQUFPO29DQUNoQixjQUFjLEVBQUU7d0NBQ2QsS0FBSyxFQUFFOzRDQUNMLElBQUksRUFBRSxRQUFRO3lDQUNmO3FDQUNGO2lDQUNGOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1seU1vZHVsZSB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRm9ybWx5Qm9vdHN0cmFwRm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQG5neC1mb3JtbHkvYm9vdHN0cmFwL2Zvcm0tZmllbGQnO1xuXG5pbXBvcnQgeyBGb3JtbHlGaWVsZElucHV0IH0gZnJvbSAnLi9pbnB1dC50eXBlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRm9ybWx5RmllbGRJbnB1dF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgIEZvcm1seUJvb3RzdHJhcEZvcm1GaWVsZE1vZHVsZSxcbiAgICBGb3JtbHlNb2R1bGUuZm9yQ2hpbGQoe1xuICAgICAgdHlwZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdpbnB1dCcsXG4gICAgICAgICAgY29tcG9uZW50OiBGb3JtbHlGaWVsZElucHV0LFxuICAgICAgICAgIHdyYXBwZXJzOiBbJ2Zvcm0tZmllbGQnXSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBuYW1lOiAnc3RyaW5nJywgZXh0ZW5kczogJ2lucHV0JyB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ251bWJlcicsXG4gICAgICAgICAgZXh0ZW5kczogJ2lucHV0JyxcbiAgICAgICAgICBkZWZhdWx0T3B0aW9uczoge1xuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnaW50ZWdlcicsXG4gICAgICAgICAgZXh0ZW5kczogJ2lucHV0JyxcbiAgICAgICAgICBkZWZhdWx0T3B0aW9uczoge1xuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlCb290c3RyYXBJbnB1dE1vZHVsZSB7fVxuIl19