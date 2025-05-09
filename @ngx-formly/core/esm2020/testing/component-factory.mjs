import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormlyModule, FormlyFormBuilder } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
function setInputs(fixture, inputs, detectChanges = true) {
    Object.keys(inputs).forEach((input) => {
        fixture.componentInstance[input] = inputs[input];
    });
    if (detectChanges !== false) {
        fixture.detectChanges();
    }
}
export function createComponent({ template, inputs, config, detectChanges, imports, declarations, providers, }) {
    TestBed.configureTestingModule({
        declarations: [TestComponent, ...(declarations || [])],
        imports: [ReactiveFormsModule, FormlyModule.forRoot(config), ...(imports || [])],
        providers: providers || [],
        teardown: { destroyAfterEach: false },
    }).overrideComponent(TestComponent, {
        set: {
            template,
            inputs: Object.keys(inputs),
        },
    });
    const fixture = TestBed.createComponent(TestComponent);
    Object.keys(inputs).forEach((input) => {
        fixture.componentInstance[input] = inputs[input];
    });
    setInputs(fixture, inputs, detectChanges);
    const utils = {
        fixture,
        detectChanges: () => fixture.detectChanges(),
        setInputs: (props) => setInputs(fixture, props),
        query: (selector) => fixture.debugElement.query(By.css(selector)),
        queryAll: (selector) => fixture.debugElement.queryAll(By.css(selector)),
    };
    Object.keys(inputs).forEach((input) => {
        Object.defineProperty(utils, input, {
            get: () => fixture.componentInstance[input],
        });
    });
    return utils;
}
export function createFieldComponent(field, config = {}) {
    const model = field?.model || {};
    const options = field?.options || {};
    delete field?.model;
    delete field?.options;
    const utils = createComponent({
        template: '<formly-field [field]="field"></formly-field>',
        inputs: { field },
        ...config,
        detectChanges: false,
    });
    const builder = utils.fixture.componentRef.instance.builder;
    builder.build({ model, options, fieldGroup: [field] });
    utils.detectChanges();
    const setInputs = utils.setInputs;
    utils.setInputs = (props) => {
        if (props.field) {
            builder.build(props.field);
        }
        setInputs(props);
    };
    return utils;
}
class TestComponent {
    constructor(builder) {
        this.builder = builder;
    }
}
TestComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TestComponent, deps: [{ token: i1.FormlyFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
TestComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TestComponent, selector: "formly-test-component", providers: [FormlyFormBuilder], ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TestComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-test-component',
                    template: '',
                    providers: [FormlyFormBuilder],
                }]
        }], ctorParameters: function () { return [{ type: i1.FormlyFormBuilder }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS90ZXN0aW5nL3NyYy9jb21wb25lbnQtZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFvQixNQUFNLHVCQUF1QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQTBCLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQW1DLE1BQU0sa0JBQWtCLENBQUM7QUFDcEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFFL0MsU0FBUyxTQUFTLENBQUksT0FBNEIsRUFBRSxNQUFTLEVBQUUsYUFBYSxHQUFHLElBQUk7SUFDaEYsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDckQsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksYUFBYSxLQUFLLEtBQUssRUFBRTtRQUMzQixPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDekI7QUFDSCxDQUFDO0FBWUQsTUFBTSxVQUFVLGVBQWUsQ0FBSSxFQUNqQyxRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsT0FBTyxFQUNQLFlBQVksRUFDWixTQUFTLEdBQ1k7SUFDckIsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1FBQzdCLFlBQVksRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sRUFBRSxDQUFDLG1CQUFt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RUFBRTtRQUMxQixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtRQUVELFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUM7SUFFRixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxNQUtNLGFBQWE7SUFDakIsWUFBbUIsT0FBMkI7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBRyxDQUFDOzsyR0FEOUMsYUFBYTsrRkFBYixhQUFhLGdEQUZOLENBQUMsaUJBQWlCLENBQUMsMEJBRHBCLEVBQUU7NEZBR1IsYUFBYTtrQkFMbEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsRUFBRTtvQkFDWixTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZXN0QmVkLCBDb21wb25lbnRGaXh0dXJlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7IENvbXBvbmVudCwgRGVidWdFbGVtZW50LCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybWx5TW9kdWxlLCBGb3JtbHlGb3JtQnVpbGRlciwgRm9ybWx5RmllbGRDb25maWcsIENvbmZpZ09wdGlvbiB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJ5IH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmZ1bmN0aW9uIHNldElucHV0czxUPihmaXh0dXJlOiBDb21wb25lbnRGaXh0dXJlPFQ+LCBpbnB1dHM6IFQsIGRldGVjdENoYW5nZXMgPSB0cnVlKSB7XG4gIChPYmplY3Qua2V5cyhpbnB1dHMpIGFzIChrZXlvZiBUKVtdKS5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgIGZpeHR1cmUuY29tcG9uZW50SW5zdGFuY2VbaW5wdXRdID0gaW5wdXRzW2lucHV0XTtcbiAgfSk7XG5cbiAgaWYgKGRldGVjdENoYW5nZXMgIT09IGZhbHNlKSB7XG4gICAgZml4dHVyZS5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIElDb21wb25lbnRPcHRpb25zPFQ+IGV4dGVuZHMgTmdNb2R1bGUge1xuICB0ZW1wbGF0ZT86IHN0cmluZztcbiAgaW5wdXRzPzogVDtcbiAgY29uZmlnPzogQ29uZmlnT3B0aW9uO1xuICBkZXRlY3RDaGFuZ2VzPzogYm9vbGVhbjtcbn1cbmludGVyZmFjZSBJRm9ybWx5RGVidWdFbGVtZW50PEU+IGV4dGVuZHMgRGVidWdFbGVtZW50IHtcbiAgcmVhZG9ubHkgbmF0aXZlRWxlbWVudDogRTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudDxUPih7XG4gIHRlbXBsYXRlLFxuICBpbnB1dHMsXG4gIGNvbmZpZyxcbiAgZGV0ZWN0Q2hhbmdlcyxcbiAgaW1wb3J0cyxcbiAgZGVjbGFyYXRpb25zLFxuICBwcm92aWRlcnMsXG59OiBJQ29tcG9uZW50T3B0aW9uczxUPikge1xuICBUZXN0QmVkLmNvbmZpZ3VyZVRlc3RpbmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1Rlc3RDb21wb25lbnQsIC4uLihkZWNsYXJhdGlvbnMgfHwgW10pXSxcbiAgICBpbXBvcnRzOiBbUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybWx5TW9kdWxlLmZvclJvb3QoY29uZmlnKSwgLi4uKGltcG9ydHMgfHwgW10pXSxcbiAgICBwcm92aWRlcnM6IHByb3ZpZGVycyB8fCBbXSxcbiAgICB0ZWFyZG93bjogeyBkZXN0cm95QWZ0ZXJFYWNoOiBmYWxzZSB9LFxuICB9KS5vdmVycmlkZUNvbXBvbmVudChUZXN0Q29tcG9uZW50LCB7XG4gICAgc2V0OiB7XG4gICAgICB0ZW1wbGF0ZSxcbiAgICAgIGlucHV0czogT2JqZWN0LmtleXMoaW5wdXRzKSxcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBmaXh0dXJlID0gVGVzdEJlZC5jcmVhdGVDb21wb25lbnQoVGVzdENvbXBvbmVudCkgYXMgQ29tcG9uZW50Rml4dHVyZTxUPjtcbiAgKE9iamVjdC5rZXlzKGlucHV0cykgYXMgKGtleW9mIFQpW10pLmZvckVhY2goKGlucHV0KSA9PiB7XG4gICAgZml4dHVyZS5jb21wb25lbnRJbnN0YW5jZVtpbnB1dF0gPSBpbnB1dHNbaW5wdXRdO1xuICB9KTtcblxuICBzZXRJbnB1dHMoZml4dHVyZSwgaW5wdXRzLCBkZXRlY3RDaGFuZ2VzKTtcblxuICB0eXBlIEZpeHR1cmVVdGlscyA9IFQgJiB7XG4gICAgZml4dHVyZTogQ29tcG9uZW50Rml4dHVyZTxUPjtcbiAgICBkZXRlY3RDaGFuZ2VzOiB0eXBlb2YgZml4dHVyZVsnZGV0ZWN0Q2hhbmdlcyddO1xuICAgIHNldElucHV0czogKGlucHV0czogUGFydGlhbDxUPikgPT4gdm9pZDtcbiAgICBxdWVyeTogPEUgZXh0ZW5kcyBFbGVtZW50ID0gRWxlbWVudD4oc2VsZWN0b3I6IHN0cmluZykgPT4gSUZvcm1seURlYnVnRWxlbWVudDxFPjtcbiAgICBxdWVyeUFsbDogPEUgZXh0ZW5kcyBFbGVtZW50ID0gRWxlbWVudD4oc2VsZWN0b3I6IHN0cmluZykgPT4gSUZvcm1seURlYnVnRWxlbWVudDxFPltdO1xuICB9O1xuXG4gIGNvbnN0IHV0aWxzID0ge1xuICAgIGZpeHR1cmUsXG4gICAgZGV0ZWN0Q2hhbmdlczogKCkgPT4gZml4dHVyZS5kZXRlY3RDaGFuZ2VzKCksXG4gICAgc2V0SW5wdXRzOiAocHJvcHMpID0+IHNldElucHV0cyhmaXh0dXJlLCBwcm9wcyksXG4gICAgcXVlcnk6IChzZWxlY3Rvcjogc3RyaW5nKSA9PiBmaXh0dXJlLmRlYnVnRWxlbWVudC5xdWVyeShCeS5jc3Moc2VsZWN0b3IpKSxcbiAgICBxdWVyeUFsbDogKHNlbGVjdG9yOiBzdHJpbmcpID0+IGZpeHR1cmUuZGVidWdFbGVtZW50LnF1ZXJ5QWxsKEJ5LmNzcyhzZWxlY3RvcikpLFxuICB9IGFzIEZpeHR1cmVVdGlscztcblxuICAoT2JqZWN0LmtleXMoaW5wdXRzKSBhcyAoa2V5b2YgVClbXSkuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodXRpbHMsIGlucHV0LCB7XG4gICAgICBnZXQ6ICgpID0+IGZpeHR1cmUuY29tcG9uZW50SW5zdGFuY2VbaW5wdXRdLFxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gdXRpbHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWVsZENvbXBvbmVudChcbiAgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLFxuICBjb25maWc6IElDb21wb25lbnRPcHRpb25zPHsgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnIH0+ID0ge30sXG4pIHtcbiAgY29uc3QgbW9kZWwgPSBmaWVsZD8ubW9kZWwgfHwge307XG4gIGNvbnN0IG9wdGlvbnMgPSBmaWVsZD8ub3B0aW9ucyB8fCB7fTtcbiAgZGVsZXRlIChmaWVsZCBhcyBhbnkpPy5tb2RlbDtcbiAgZGVsZXRlIChmaWVsZCBhcyBhbnkpPy5vcHRpb25zO1xuXG4gIGNvbnN0IHV0aWxzID0gY3JlYXRlQ29tcG9uZW50PHsgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnIH0+KHtcbiAgICB0ZW1wbGF0ZTogJzxmb3JtbHktZmllbGQgW2ZpZWxkXT1cImZpZWxkXCI+PC9mb3JtbHktZmllbGQ+JyxcbiAgICBpbnB1dHM6IHsgZmllbGQgfSxcbiAgICAuLi5jb25maWcsXG4gICAgZGV0ZWN0Q2hhbmdlczogZmFsc2UsXG4gIH0pO1xuICBjb25zdCBidWlsZGVyID0gKHV0aWxzLmZpeHR1cmUuY29tcG9uZW50UmVmLmluc3RhbmNlIGFzIGFueSkuYnVpbGRlcjtcbiAgYnVpbGRlci5idWlsZCh7IG1vZGVsLCBvcHRpb25zLCBmaWVsZEdyb3VwOiBbZmllbGRdIH0pO1xuICB1dGlscy5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgY29uc3Qgc2V0SW5wdXRzID0gdXRpbHMuc2V0SW5wdXRzO1xuICB1dGlscy5zZXRJbnB1dHMgPSAocHJvcHMpID0+IHtcbiAgICBpZiAocHJvcHMuZmllbGQpIHtcbiAgICAgIGJ1aWxkZXIuYnVpbGQocHJvcHMuZmllbGQpO1xuICAgIH1cblxuICAgIHNldElucHV0cyhwcm9wcyk7XG4gIH07XG5cbiAgcmV0dXJuIHV0aWxzO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktdGVzdC1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZTogJycsXG4gIHByb3ZpZGVyczogW0Zvcm1seUZvcm1CdWlsZGVyXSxcbn0pXG5jbGFzcyBUZXN0Q29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIGJ1aWxkZXI/OiBGb3JtbHlGb3JtQnVpbGRlcikge31cbn1cbiJdfQ==