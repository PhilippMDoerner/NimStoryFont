import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
export class FormlyFieldCheckbox extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                indeterminate: true,
                hideLabel: true,
                formCheck: 'default',
            },
        };
    }
}
FormlyFieldCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldCheckbox, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldCheckbox, selector: "formly-field-checkbox", usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <div
        class="form-check"
        [ngClass]="{
          'form-check-inline': props.formCheck === 'inline' || props.formCheck === 'inline-switch',
          'form-switch': props.formCheck === 'switch' || props.formCheck === 'inline-switch'
        }"
      >
        <input
          type="checkbox"
          [class.is-invalid]="showError"
          class="form-check-input"
          [class.position-static]="props.formCheck === 'nolabel'"
          [indeterminate]="props.indeterminate && formControl.value == null"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [attr.aria-describedby]="id + '-formly-validation-error'"
          [attr.aria-invalid]="showError"
        />
        <label *ngIf="props.formCheck !== 'nolabel'" [for]="id" class="form-check-label">
          {{ props.label }}
          <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
        </label>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-checkbox',
                    template: `
    <ng-template #fieldTypeTemplate>
      <div
        class="form-check"
        [ngClass]="{
          'form-check-inline': props.formCheck === 'inline' || props.formCheck === 'inline-switch',
          'form-switch': props.formCheck === 'switch' || props.formCheck === 'inline-switch'
        }"
      >
        <input
          type="checkbox"
          [class.is-invalid]="showError"
          class="form-check-input"
          [class.position-static]="props.formCheck === 'nolabel'"
          [indeterminate]="props.indeterminate && formControl.value == null"
          [formControl]="formControl"
          [formlyAttributes]="field"
          [attr.aria-describedby]="id + '-formly-validation-error'"
          [attr.aria-invalid]="showError"
        />
        <label *ngIf="props.formCheck !== 'nolabel'" [for]="id" class="form-check-label">
          {{ props.label }}
          <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
        </label>
      </div>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9ib290c3RyYXAvY2hlY2tib3gvc3JjL2NoZWNrYm94LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGtDQUFrQyxDQUFDOzs7OztBQTBDL0UsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFNBQXlDO0lBL0JsRjs7UUFnQ1csbUJBQWMsR0FBRztZQUN4QixLQUFLLEVBQUU7Z0JBQ0wsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFNBQVMsRUFBRSxTQUFrQjthQUM5QjtTQUNGLENBQUM7S0FDSDs7aUhBUlksbUJBQW1CO3FHQUFuQixtQkFBbUIsb0ZBN0JwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQlQ7NEZBR1UsbUJBQW1CO2tCQS9CL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRm9ybWx5RmllbGRQcm9wcyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9mb3JtLWZpZWxkJztcblxuaW50ZXJmYWNlIENoZWNrYm94UHJvcHMgZXh0ZW5kcyBGb3JtbHlGaWVsZFByb3BzIHtcbiAgZm9ybUNoZWNrPzogJ2RlZmF1bHQnIHwgJ2lubGluZScgfCAnc3dpdGNoJyB8ICdpbmxpbmUtc3dpdGNoJyB8ICdub2xhYmVsJztcbiAgaW5kZXRlcm1pbmF0ZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5Q2hlY2tib3hGaWVsZENvbmZpZyBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnPENoZWNrYm94UHJvcHM+IHtcbiAgdHlwZTogJ2NoZWNrYm94JyB8IFR5cGU8Rm9ybWx5RmllbGRDaGVja2JveD47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC1jaGVja2JveCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNmaWVsZFR5cGVUZW1wbGF0ZT5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNoZWNrXCJcbiAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICdmb3JtLWNoZWNrLWlubGluZSc6IHByb3BzLmZvcm1DaGVjayA9PT0gJ2lubGluZScgfHwgcHJvcHMuZm9ybUNoZWNrID09PSAnaW5saW5lLXN3aXRjaCcsXG4gICAgICAgICAgJ2Zvcm0tc3dpdGNoJzogcHJvcHMuZm9ybUNoZWNrID09PSAnc3dpdGNoJyB8fCBwcm9wcy5mb3JtQ2hlY2sgPT09ICdpbmxpbmUtc3dpdGNoJ1xuICAgICAgICB9XCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBbY2xhc3MuaXMtaW52YWxpZF09XCJzaG93RXJyb3JcIlxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jaGVjay1pbnB1dFwiXG4gICAgICAgICAgW2NsYXNzLnBvc2l0aW9uLXN0YXRpY109XCJwcm9wcy5mb3JtQ2hlY2sgPT09ICdub2xhYmVsJ1wiXG4gICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwicHJvcHMuaW5kZXRlcm1pbmF0ZSAmJiBmb3JtQ29udHJvbC52YWx1ZSA9PSBudWxsXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cImlkICsgJy1mb3JtbHktdmFsaWRhdGlvbi1lcnJvcidcIlxuICAgICAgICAgIFthdHRyLmFyaWEtaW52YWxpZF09XCJzaG93RXJyb3JcIlxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgKm5nSWY9XCJwcm9wcy5mb3JtQ2hlY2sgIT09ICdub2xhYmVsJ1wiIFtmb3JdPVwiaWRcIiBjbGFzcz1cImZvcm0tY2hlY2stbGFiZWxcIj5cbiAgICAgICAgICB7eyBwcm9wcy5sYWJlbCB9fVxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwicHJvcHMucmVxdWlyZWQgJiYgcHJvcHMuaGlkZVJlcXVpcmVkTWFya2VyICE9PSB0cnVlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+Kjwvc3Bhbj5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZENoZWNrYm94IGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxDaGVja2JveFByb3BzPj4ge1xuICBvdmVycmlkZSBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgaW5kZXRlcm1pbmF0ZTogdHJ1ZSxcbiAgICAgIGhpZGVMYWJlbDogdHJ1ZSxcbiAgICAgIGZvcm1DaGVjazogJ2RlZmF1bHQnIGFzIGNvbnN0LFxuICAgIH0sXG4gIH07XG59XG4iXX0=