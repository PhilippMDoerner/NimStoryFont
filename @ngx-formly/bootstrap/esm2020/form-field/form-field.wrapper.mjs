import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
import * as i2 from "@angular/common";
export class FormlyWrapperFormField extends FieldWrapper {
}
FormlyWrapperFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperFormField, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyWrapperFormField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyWrapperFormField, selector: "formly-wrapper-form-field", usesInheritance: true, ngImport: i0, template: `
    <ng-template #labelTemplate>
      <label *ngIf="props.label && props.hideLabel !== true" [attr.for]="id" class="form-label">
        {{ props.label }}
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
      </label>
    </ng-template>

    <div class="mb-3" [class.form-floating]="props.labelPosition === 'floating'" [class.has-error]="showError">
      <ng-container *ngIf="props.labelPosition !== 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>

      <ng-template #fieldComponent></ng-template>

      <ng-container *ngIf="props.labelPosition === 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>

      <div *ngIf="showError" class="invalid-feedback" [style.display]="'block'">
        <formly-validation-message
          id="{{ id }}-formly-validation-error"
          [field]="field"
          role="alert"
        ></formly-validation-message>
      </div>

      <small *ngIf="props.description" class="form-text text-muted">{{ props.description }}</small>
    </div>
  `, isInline: true, components: [{ type: i1.ɵFormlyValidationMessage, selector: "formly-validation-message", inputs: ["field"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperFormField, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-wrapper-form-field',
                    template: `
    <ng-template #labelTemplate>
      <label *ngIf="props.label && props.hideLabel !== true" [attr.for]="id" class="form-label">
        {{ props.label }}
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
      </label>
    </ng-template>

    <div class="mb-3" [class.form-floating]="props.labelPosition === 'floating'" [class.has-error]="showError">
      <ng-container *ngIf="props.labelPosition !== 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>

      <ng-template #fieldComponent></ng-template>

      <ng-container *ngIf="props.labelPosition === 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>

      <div *ngIf="showError" class="invalid-feedback" [style.display]="'block'">
        <formly-validation-message
          id="{{ id }}-formly-validation-error"
          [field]="field"
          role="alert"
        ></formly-validation-message>
      </div>

      <small *ngIf="props.description" class="form-text text-muted">{{ props.description }}</small>
    </div>
  `,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC53cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2Jvb3RzdHJhcC9mb3JtLWZpZWxkL3NyYy9mb3JtLWZpZWxkLndyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUErRCxNQUFNLGtCQUFrQixDQUFDOzs7O0FBeUM3RyxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsWUFBaUQ7O29IQUFoRixzQkFBc0I7d0dBQXRCLHNCQUFzQix3RkEvQnZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCVDs0RkFFVSxzQkFBc0I7a0JBakNsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2QlQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkV3JhcHBlciwgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seUZpZWxkUHJvcHMgYXMgQ29yZUZvcm1seUZpZWxkUHJvcHMgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlGaWVsZFByb3BzIGV4dGVuZHMgQ29yZUZvcm1seUZpZWxkUHJvcHMge1xuICBoaWRlTGFiZWw/OiBib29sZWFuO1xuICBoaWRlUmVxdWlyZWRNYXJrZXI/OiBib29sZWFuO1xuICBsYWJlbFBvc2l0aW9uPzogJ2Zsb2F0aW5nJztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LXdyYXBwZXItZm9ybS1maWVsZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNsYWJlbFRlbXBsYXRlPlxuICAgICAgPGxhYmVsICpuZ0lmPVwicHJvcHMubGFiZWwgJiYgcHJvcHMuaGlkZUxhYmVsICE9PSB0cnVlXCIgW2F0dHIuZm9yXT1cImlkXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+XG4gICAgICAgIHt7IHByb3BzLmxhYmVsIH19XG4gICAgICAgIDxzcGFuICpuZ0lmPVwicHJvcHMucmVxdWlyZWQgJiYgcHJvcHMuaGlkZVJlcXVpcmVkTWFya2VyICE9PSB0cnVlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+Kjwvc3Bhbj5cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxkaXYgY2xhc3M9XCJtYi0zXCIgW2NsYXNzLmZvcm0tZmxvYXRpbmddPVwicHJvcHMubGFiZWxQb3NpdGlvbiA9PT0gJ2Zsb2F0aW5nJ1wiIFtjbGFzcy5oYXMtZXJyb3JdPVwic2hvd0Vycm9yXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicHJvcHMubGFiZWxQb3NpdGlvbiAhPT0gJ2Zsb2F0aW5nJ1wiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxhYmVsVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctdGVtcGxhdGUgI2ZpZWxkQ29tcG9uZW50PjwvbmctdGVtcGxhdGU+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJwcm9wcy5sYWJlbFBvc2l0aW9uID09PSAnZmxvYXRpbmcnXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibGFiZWxUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJzaG93RXJyb3JcIiBjbGFzcz1cImludmFsaWQtZmVlZGJhY2tcIiBbc3R5bGUuZGlzcGxheV09XCInYmxvY2snXCI+XG4gICAgICAgIDxmb3JtbHktdmFsaWRhdGlvbi1tZXNzYWdlXG4gICAgICAgICAgaWQ9XCJ7eyBpZCB9fS1mb3JtbHktdmFsaWRhdGlvbi1lcnJvclwiXG4gICAgICAgICAgW2ZpZWxkXT1cImZpZWxkXCJcbiAgICAgICAgICByb2xlPVwiYWxlcnRcIlxuICAgICAgICA+PC9mb3JtbHktdmFsaWRhdGlvbi1tZXNzYWdlPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxzbWFsbCAqbmdJZj1cInByb3BzLmRlc2NyaXB0aW9uXCIgY2xhc3M9XCJmb3JtLXRleHQgdGV4dC1tdXRlZFwiPnt7IHByb3BzLmRlc2NyaXB0aW9uIH19PC9zbWFsbD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5V3JhcHBlckZvcm1GaWVsZCBleHRlbmRzIEZpZWxkV3JhcHBlcjxGb3JtbHlGaWVsZENvbmZpZzxGb3JtbHlGaWVsZFByb3BzPj4ge31cbiJdfQ==