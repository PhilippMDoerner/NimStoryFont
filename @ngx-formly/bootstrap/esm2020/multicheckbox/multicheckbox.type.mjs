import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ngx-formly/core";
import * as i3 from "@ngx-formly/core/select";
export class FormlyFieldMultiCheckbox extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                formCheck: 'default', // 'default' | 'inline' | 'switch' | 'inline-switch'
            },
        };
    }
    onChange(value, checked) {
        this.formControl.markAsDirty();
        if (this.props.type === 'array') {
            this.formControl.patchValue(checked
                ? [...(this.formControl.value || []), value]
                : [...(this.formControl.value || [])].filter((o) => o !== value));
        }
        else {
            this.formControl.patchValue({ ...this.formControl.value, [value]: checked });
        }
        this.formControl.markAsTouched();
    }
    isChecked(option) {
        const value = this.formControl.value;
        return value && (this.props.type === 'array' ? value.indexOf(option.value) !== -1 : value[option.value]);
    }
}
FormlyFieldMultiCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldMultiCheckbox, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldMultiCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldMultiCheckbox, selector: "formly-field-multicheckbox", usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <div
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        class="form-check"
        [ngClass]="{
          'form-check-inline': props.formCheck === 'inline' || props.formCheck === 'inline-switch',
          'form-switch': props.formCheck === 'switch' || props.formCheck === 'inline-switch'
        }"
      >
        <input
          type="checkbox"
          [id]="id + '_' + i"
          class="form-check-input"
          [class.is-invalid]="showError"
          [value]="option.value"
          [checked]="isChecked(option)"
          [formlyAttributes]="field"
          [disabled]="formControl.disabled || option.disabled"
          [attr.aria-describedby]="id + '-formly-validation-error'"
          [attr.aria-invalid]="showError"
          (change)="onChange(option.value, $any($event.target).checked)"
        />
        <label class="form-check-label" [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }], pipes: { "async": i1.AsyncPipe, "formlySelectOptions": i3.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldMultiCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-multicheckbox',
                    template: `
    <ng-template #fieldTypeTemplate>
      <div
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        class="form-check"
        [ngClass]="{
          'form-check-inline': props.formCheck === 'inline' || props.formCheck === 'inline-switch',
          'form-switch': props.formCheck === 'switch' || props.formCheck === 'inline-switch'
        }"
      >
        <input
          type="checkbox"
          [id]="id + '_' + i"
          class="form-check-input"
          [class.is-invalid]="showError"
          [value]="option.value"
          [checked]="isChecked(option)"
          [formlyAttributes]="field"
          [disabled]="formControl.disabled || option.disabled"
          [attr.aria-describedby]="id + '-formly-validation-error'"
          [attr.aria-invalid]="showError"
          (change)="onChange(option.value, $any($event.target).checked)"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGljaGVja2JveC50eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2Jvb3RzdHJhcC9tdWx0aWNoZWNrYm94L3NyYy9tdWx0aWNoZWNrYm94LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGtDQUFrQyxDQUFDOzs7OztBQTJDL0UsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFNBQThDO0lBakM1Rjs7UUFrQ1csbUJBQWMsR0FBRztZQUN4QixLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLFNBQWtCLEVBQUUsb0RBQW9EO2FBQ3BGO1NBQ0YsQ0FBQztLQXFCSDtJQW5CQyxRQUFRLENBQUMsS0FBVSxFQUFFLE9BQWdCO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQ3pCLE9BQU87Z0JBQ0wsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztnQkFDNUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQ25FLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM5RTtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFXO1FBQ25CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBRXJDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7O3NIQXpCVSx3QkFBd0I7MEdBQXhCLHdCQUF3Qix5RkEvQnpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJUOzRGQUdVLHdCQUF3QjtrQkFqQ3BDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRm9ybWx5RmllbGRQcm9wcyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9mb3JtLWZpZWxkJztcblxuaW50ZXJmYWNlIE11bHRpQ2hlY2tib3hQcm9wcyBleHRlbmRzIEZvcm1seUZpZWxkUHJvcHMge1xuICBmb3JtQ2hlY2s/OiAnZGVmYXVsdCcgfCAnaW5saW5lJyB8ICdzd2l0Y2gnIHwgJ2lubGluZS1zd2l0Y2gnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seU11bHRpQ2hlY2tib3hGaWVsZENvbmZpZyBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnPE11bHRpQ2hlY2tib3hQcm9wcz4ge1xuICB0eXBlOiAnbXVsdGljaGVja2JveCcgfCBUeXBlPEZvcm1seUZpZWxkTXVsdGlDaGVja2JveD47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC1tdWx0aWNoZWNrYm94JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2ZpZWxkVHlwZVRlbXBsYXRlPlxuICAgICAgPGRpdlxuICAgICAgICAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIHByb3BzLm9wdGlvbnMgfCBmb3JtbHlTZWxlY3RPcHRpb25zIDogZmllbGQgfCBhc3luYzsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jaGVja1wiXG4gICAgICAgIFtuZ0NsYXNzXT1cIntcbiAgICAgICAgICAnZm9ybS1jaGVjay1pbmxpbmUnOiBwcm9wcy5mb3JtQ2hlY2sgPT09ICdpbmxpbmUnIHx8IHByb3BzLmZvcm1DaGVjayA9PT0gJ2lubGluZS1zd2l0Y2gnLFxuICAgICAgICAgICdmb3JtLXN3aXRjaCc6IHByb3BzLmZvcm1DaGVjayA9PT0gJ3N3aXRjaCcgfHwgcHJvcHMuZm9ybUNoZWNrID09PSAnaW5saW5lLXN3aXRjaCdcbiAgICAgICAgfVwiXG4gICAgICA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgW2lkXT1cImlkICsgJ18nICsgaVwiXG4gICAgICAgICAgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0XCJcbiAgICAgICAgICBbY2xhc3MuaXMtaW52YWxpZF09XCJzaG93RXJyb3JcIlxuICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgIFtjaGVja2VkXT1cImlzQ2hlY2tlZChvcHRpb24pXCJcbiAgICAgICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImZvcm1Db250cm9sLmRpc2FibGVkIHx8IG9wdGlvbi5kaXNhYmxlZFwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJpZCArICctZm9ybWx5LXZhbGlkYXRpb24tZXJyb3InXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKG9wdGlvbi52YWx1ZSwgJGFueSgkZXZlbnQudGFyZ2V0KS5jaGVja2VkKVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tY2hlY2stbGFiZWxcIiBbZm9yXT1cImlkICsgJ18nICsgaVwiPlxuICAgICAgICAgIHt7IG9wdGlvbi5sYWJlbCB9fVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkTXVsdGlDaGVja2JveCBleHRlbmRzIEZpZWxkVHlwZTxGaWVsZFR5cGVDb25maWc8TXVsdGlDaGVja2JveFByb3BzPj4ge1xuICBvdmVycmlkZSBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgZm9ybUNoZWNrOiAnZGVmYXVsdCcgYXMgY29uc3QsIC8vICdkZWZhdWx0JyB8ICdpbmxpbmUnIHwgJ3N3aXRjaCcgfCAnaW5saW5lLXN3aXRjaCdcbiAgICB9LFxuICB9O1xuXG4gIG9uQ2hhbmdlKHZhbHVlOiBhbnksIGNoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZvcm1Db250cm9sLm1hcmtBc0RpcnR5KCk7XG4gICAgaWYgKHRoaXMucHJvcHMudHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgdGhpcy5mb3JtQ29udHJvbC5wYXRjaFZhbHVlKFxuICAgICAgICBjaGVja2VkXG4gICAgICAgICAgPyBbLi4uKHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgfHwgW10pLCB2YWx1ZV1cbiAgICAgICAgICA6IFsuLi4odGhpcy5mb3JtQ29udHJvbC52YWx1ZSB8fCBbXSldLmZpbHRlcigobykgPT4gbyAhPT0gdmFsdWUpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mb3JtQ29udHJvbC5wYXRjaFZhbHVlKHsgLi4udGhpcy5mb3JtQ29udHJvbC52YWx1ZSwgW3ZhbHVlXTogY2hlY2tlZCB9KTtcbiAgICB9XG4gICAgdGhpcy5mb3JtQ29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gIH1cblxuICBpc0NoZWNrZWQob3B0aW9uOiBhbnkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWU7XG5cbiAgICByZXR1cm4gdmFsdWUgJiYgKHRoaXMucHJvcHMudHlwZSA9PT0gJ2FycmF5JyA/IHZhbHVlLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPT0gLTEgOiB2YWx1ZVtvcHRpb24udmFsdWVdKTtcbiAgfVxufVxuIl19