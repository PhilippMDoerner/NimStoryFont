import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as i2 from '@ngx-formly/core';
import { FormlyModule } from '@ngx-formly/core';
import * as i3 from '@ngx-formly/core/select';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { FieldType, FormlyBootstrapFormFieldModule } from '@ngx-formly/bootstrap/form-field';

class FormlyFieldMultiCheckbox extends FieldType {
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

class FormlyBootstrapMultiCheckboxModule {
}
FormlyBootstrapMultiCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapMultiCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormlyBootstrapMultiCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyBootstrapMultiCheckboxModule, declarations: [FormlyFieldMultiCheckbox], imports: [CommonModule,
        ReactiveFormsModule,
        FormlyBootstrapFormFieldModule,
        FormlySelectModule, i2.FormlyModule] });
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

/**
 * Generated bundle index. Do not edit.
 */

export { FormlyBootstrapMultiCheckboxModule, FormlyFieldMultiCheckbox };
//# sourceMappingURL=ngx-formly-bootstrap-multicheckbox.mjs.map
