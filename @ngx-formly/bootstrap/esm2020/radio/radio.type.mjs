import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
import * as i4 from "@ngx-formly/core/select";
export class FormlyFieldRadio extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                formCheck: 'default',
            },
        };
    }
    get disabledControl() {
        return new FormControl({ value: this.formControl.value, disabled: true });
    }
}
FormlyFieldRadio.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldRadio, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldRadio.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldRadio, selector: "formly-field-radio", usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <div
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        class="form-check"
        [class.form-check-inline]="props.formCheck === 'inline'"
      >
        <input
          type="radio"
          [id]="id + '_' + i"
          class="form-check-input"
          [name]="field.name || id"
          [class.is-invalid]="showError"
          [attr.value]="option.value"
          [value]="option.value"
          [formControl]="option.disabled ? disabledControl : formControl"
          [formlyAttributes]="field"
          [attr.aria-describedby]="id + '-formly-validation-error'"
          [attr.aria-invalid]="showError"
        />
        <label class="form-check-label" [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }], pipes: { "async": i1.AsyncPipe, "formlySelectOptions": i4.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldRadio, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-radio',
                    template: `
    <ng-template #fieldTypeTemplate>
      <div
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        class="form-check"
        [class.form-check-inline]="props.formCheck === 'inline'"
      >
        <input
          type="radio"
          [id]="id + '_' + i"
          class="form-check-input"
          [name]="field.name || id"
          [class.is-invalid]="showError"
          [attr.value]="option.value"
          [value]="option.value"
          [formControl]="option.disabled ? disabledControl : formControl"
          [formlyAttributes]="field"
          [attr.aria-describedby]="id + '-formly-validation-error'"
          [attr.aria-invalid]="showError"
        />
        <label class="form-check-label" [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8udHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9ib290c3RyYXAvcmFkaW8vc3JjL3JhZGlvLnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBd0M3QyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsU0FBc0M7SUE5QjVFOztRQStCVyxtQkFBYyxHQUFHO1lBQ3hCLEtBQUssRUFBRTtnQkFDTCxTQUFTLEVBQUUsU0FBa0I7YUFDOUI7U0FDRixDQUFDO0tBS0g7SUFIQyxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs4R0FUVSxnQkFBZ0I7a0dBQWhCLGdCQUFnQixpRkE1QmpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUOzRGQUdVLGdCQUFnQjtrQkE5QjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRm9ybWx5RmllbGRQcm9wcyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbnRlcmZhY2UgUmFkaW9Qcm9wcyBleHRlbmRzIEZvcm1seUZpZWxkUHJvcHMge1xuICBmb3JtQ2hlY2s/OiAnZGVmYXVsdCcgfCAnaW5saW5lJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlSYWRpb0ZpZWxkQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWc8UmFkaW9Qcm9wcz4ge1xuICB0eXBlOiAncmFkaW8nIHwgVHlwZTxGb3JtbHlGaWVsZFJhZGlvPjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLXJhZGlvJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2ZpZWxkVHlwZVRlbXBsYXRlPlxuICAgICAgPGRpdlxuICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3BzLm9wdGlvbnMgfCBmb3JtbHlTZWxlY3RPcHRpb25zIDogZmllbGQgfCBhc3luYzsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jaGVja1wiXG4gICAgICAgIFtjbGFzcy5mb3JtLWNoZWNrLWlubGluZV09XCJwcm9wcy5mb3JtQ2hlY2sgPT09ICdpbmxpbmUnXCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICBbaWRdPVwiaWQgKyAnXycgKyBpXCJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIlxuICAgICAgICAgIFtuYW1lXT1cImZpZWxkLm5hbWUgfHwgaWRcIlxuICAgICAgICAgIFtjbGFzcy5pcy1pbnZhbGlkXT1cInNob3dFcnJvclwiXG4gICAgICAgICAgW2F0dHIudmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwib3B0aW9uLmRpc2FibGVkID8gZGlzYWJsZWRDb250cm9sIDogZm9ybUNvbnRyb2xcIlxuICAgICAgICAgIFtmb3JtbHlBdHRyaWJ1dGVzXT1cImZpZWxkXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cImlkICsgJy1mb3JtbHktdmFsaWRhdGlvbi1lcnJvcidcIlxuICAgICAgICAgIFthdHRyLmFyaWEtaW52YWxpZF09XCJzaG93RXJyb3JcIlxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsXCIgW2Zvcl09XCJpZCArICdfJyArIGlcIj5cbiAgICAgICAgICB7eyBvcHRpb24ubGFiZWwgfX1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZFJhZGlvIGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxSYWRpb1Byb3BzPj4ge1xuICBvdmVycmlkZSBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgZm9ybUNoZWNrOiAnZGVmYXVsdCcgYXMgY29uc3QsXG4gICAgfSxcbiAgfTtcblxuICBnZXQgZGlzYWJsZWRDb250cm9sKCkge1xuICAgIHJldHVybiBuZXcgRm9ybUNvbnRyb2woeyB2YWx1ZTogdGhpcy5mb3JtQ29udHJvbC52YWx1ZSwgZGlzYWJsZWQ6IHRydWUgfSk7XG4gIH1cbn1cbiJdfQ==