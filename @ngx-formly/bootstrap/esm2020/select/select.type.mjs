import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
import * as i4 from "@ngx-formly/core/select";
export class FormlyFieldSelect extends FieldType {
    constructor(ngZone, hostContainerRef) {
        super(hostContainerRef);
        this.ngZone = ngZone;
        this.defaultOptions = {
            props: {
                compareWith(o1, o2) {
                    return o1 === o2;
                },
            },
        };
    }
    // workaround for https://github.com/angular/angular/issues/10010
    /**
     * TODO: Check if this is still needed
     */
    set selectAccessor(s) {
        if (!s) {
            return;
        }
        const writeValue = s.writeValue.bind(s);
        if (s._getOptionId(s.value) === null) {
            writeValue(s.value);
        }
        s.writeValue = (value) => {
            const id = s._idCounter;
            writeValue(value);
            if (value === null) {
                this.ngZone.onStable
                    .asObservable()
                    .pipe(take(1))
                    .subscribe(() => {
                    if (id !== s._idCounter &&
                        s._getOptionId(value) === null &&
                        s._elementRef.nativeElement.selectedIndex !== -1) {
                        writeValue(value);
                    }
                });
            }
        };
    }
}
FormlyFieldSelect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldSelect, deps: [{ token: i0.NgZone }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
FormlyFieldSelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldSelect, selector: "formly-field-select", viewQueries: [{ propertyName: "selectAccessor", first: true, predicate: SelectControlValueAccessor, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <select
        *ngIf="props.multiple; else singleSelect"
        class="form-select"
        multiple
        [formControl]="formControl"
        [compareWith]="props.compareWith"
        [class.is-invalid]="showError"
        [formlyAttributes]="field"
        [attr.aria-describedby]="id + '-formly-validation-error'"
        [attr.aria-invalid]="showError"
      >
        <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
          <ng-container *ngFor="let opt of opts">
            <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
              {{ opt.label }}
            </option>
            <ng-template #optgroup>
              <optgroup [label]="opt.label">
                <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                  {{ child.label }}
                </option>
              </optgroup>
            </ng-template>
          </ng-container>
        </ng-container>
      </select>

      <ng-template #singleSelect>
        <select
          class="form-select"
          [formControl]="formControl"
          [compareWith]="props.compareWith"
          [class.is-invalid]="showError"
          [formlyAttributes]="field"
          [attr.aria-describedby]="id + '-formly-validation-error'"
          [attr.aria-invalid]="showError"
        >
          <option *ngIf="props.placeholder" [ngValue]="undefined">{{ props.placeholder }}</option>
          <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
            <ng-container *ngFor="let opt of opts">
              <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
                {{ opt.label }}
              </option>
              <ng-template #optgroup>
                <optgroup [label]="opt.label">
                  <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                    {{ child.label }}
                  </option>
                </optgroup>
              </ng-template>
            </ng-container>
          </ng-container>
        </select>
      </ng-template>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.SelectMultipleControlValueAccessor, selector: "select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]", inputs: ["compareWith"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }], pipes: { "async": i1.AsyncPipe, "formlySelectOptions": i4.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-select',
                    template: `
    <ng-template #fieldTypeTemplate>
      <select
        *ngIf="props.multiple; else singleSelect"
        class="form-select"
        multiple
        [formControl]="formControl"
        [compareWith]="props.compareWith"
        [class.is-invalid]="showError"
        [formlyAttributes]="field"
        [attr.aria-describedby]="id + '-formly-validation-error'"
        [attr.aria-invalid]="showError"
      >
        <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
          <ng-container *ngFor="let opt of opts">
            <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
              {{ opt.label }}
            </option>
            <ng-template #optgroup>
              <optgroup [label]="opt.label">
                <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                  {{ child.label }}
                </option>
              </optgroup>
            </ng-template>
          </ng-container>
        </ng-container>
      </select>

      <ng-template #singleSelect>
        <select
          class="form-select"
          [formControl]="formControl"
          [compareWith]="props.compareWith"
          [class.is-invalid]="showError"
          [formlyAttributes]="field"
          [attr.aria-describedby]="id + '-formly-validation-error'"
          [attr.aria-invalid]="showError"
        >
          <option *ngIf="props.placeholder" [ngValue]="undefined">{{ props.placeholder }}</option>
          <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
            <ng-container *ngFor="let opt of opts">
              <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
                {{ opt.label }}
              </option>
              <ng-template #optgroup>
                <optgroup [label]="opt.label">
                  <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                    {{ child.label }}
                  </option>
                </optgroup>
              </ng-template>
            </ng-container>
          </ng-container>
        </select>
      </ng-template>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ViewContainerRef }]; }, propDecorators: { selectAccessor: [{
                type: ViewChild,
                args: [SelectControlValueAccessor]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LnR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvYm9vdHN0cmFwL3NlbGVjdC9zcmMvc2VsZWN0LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWtDLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVELE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUEwRXRDLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxTQUF1QztJQTJDNUUsWUFBb0IsTUFBYyxFQUFFLGdCQUFrQztRQUNwRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUROLFdBQU0sR0FBTixNQUFNLENBQVE7UUExQ3pCLG1CQUFjLEdBQUc7WUFDeEIsS0FBSyxFQUFFO2dCQUNMLFdBQVcsQ0FBQyxFQUFPLEVBQUUsRUFBTztvQkFDMUIsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUNuQixDQUFDO2FBQ0Y7U0FDRixDQUFDO0lBc0NGLENBQUM7SUFwQ0QsaUVBQWlFO0lBQ2pFOztPQUVHO0lBQ0gsSUFBMkMsY0FBYyxDQUFDLENBQU07UUFDOUQsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNOLE9BQU87U0FDUjtRQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3BDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckI7UUFFRCxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDNUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUN4QixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7cUJBQ2pCLFlBQVksRUFBRTtxQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsSUFDRSxFQUFFLEtBQUssQ0FBQyxDQUFDLFVBQVU7d0JBQ25CLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSTt3QkFDOUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUNoRDt3QkFDQSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ25CO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDOzsrR0F6Q1UsaUJBQWlCO21HQUFqQixpQkFBaUIsMkdBYWpCLDBCQUEwQix1RUF6RTNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5RFQ7NEZBR1UsaUJBQWlCO2tCQTlEN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlEVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7NEhBYzRDLGNBQWM7c0JBQXhELFNBQVM7dUJBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0NoaWxkLCBOZ1pvbmUsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGRUeXBlQ29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGb3JtbHlGaWVsZFByb3BzIH0gZnJvbSAnQG5neC1mb3JtbHkvYm9vdHN0cmFwL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZvcm1seUZpZWxkU2VsZWN0UHJvcHMgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlL3NlbGVjdCc7XG5cbmludGVyZmFjZSBTZWxlY3RQcm9wcyBleHRlbmRzIEZvcm1seUZpZWxkUHJvcHMsIEZvcm1seUZpZWxkU2VsZWN0UHJvcHMge1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG4gIGNvbXBhcmVXaXRoPzogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5U2VsZWN0RmllbGRDb25maWcgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZzxTZWxlY3RQcm9wcz4ge1xuICB0eXBlOiAnc2VsZWN0JyB8IFR5cGU8Rm9ybWx5RmllbGRTZWxlY3Q+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZmllbGQtc2VsZWN0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2ZpZWxkVHlwZVRlbXBsYXRlPlxuICAgICAgPHNlbGVjdFxuICAgICAgICAqbmdJZj1cInByb3BzLm11bHRpcGxlOyBlbHNlIHNpbmdsZVNlbGVjdFwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1zZWxlY3RcIlxuICAgICAgICBtdWx0aXBsZVxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICBbY29tcGFyZVdpdGhdPVwicHJvcHMuY29tcGFyZVdpdGhcIlxuICAgICAgICBbY2xhc3MuaXMtaW52YWxpZF09XCJzaG93RXJyb3JcIlxuICAgICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiXG4gICAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiaWQgKyAnLWZvcm1seS12YWxpZGF0aW9uLWVycm9yJ1wiXG4gICAgICAgIFthdHRyLmFyaWEtaW52YWxpZF09XCJzaG93RXJyb3JcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicHJvcHMub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnMgOiBmaWVsZCB8IGFzeW5jIGFzIG9wdHNcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcHQgb2Ygb3B0c1wiPlxuICAgICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFvcHQuZ3JvdXA7IGVsc2Ugb3B0Z3JvdXBcIiBbbmdWYWx1ZV09XCJvcHQudmFsdWVcIiBbZGlzYWJsZWRdPVwib3B0LmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgIHt7IG9wdC5sYWJlbCB9fVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI29wdGdyb3VwPlxuICAgICAgICAgICAgICA8b3B0Z3JvdXAgW2xhYmVsXT1cIm9wdC5sYWJlbFwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IGNoaWxkIG9mIG9wdC5ncm91cFwiIFtuZ1ZhbHVlXT1cImNoaWxkLnZhbHVlXCIgW2Rpc2FibGVkXT1cImNoaWxkLmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICB7eyBjaGlsZC5sYWJlbCB9fVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L29wdGdyb3VwPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3NlbGVjdD5cblxuICAgICAgPG5nLXRlbXBsYXRlICNzaW5nbGVTZWxlY3Q+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBjbGFzcz1cImZvcm0tc2VsZWN0XCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgIFtjb21wYXJlV2l0aF09XCJwcm9wcy5jb21wYXJlV2l0aFwiXG4gICAgICAgICAgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJpZCArICctZm9ybWx5LXZhbGlkYXRpb24tZXJyb3InXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb24gKm5nSWY9XCJwcm9wcy5wbGFjZWhvbGRlclwiIFtuZ1ZhbHVlXT1cInVuZGVmaW5lZFwiPnt7IHByb3BzLnBsYWNlaG9sZGVyIH19PC9vcHRpb24+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInByb3BzLm9wdGlvbnMgfCBmb3JtbHlTZWxlY3RPcHRpb25zIDogZmllbGQgfCBhc3luYyBhcyBvcHRzXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcHQgb2Ygb3B0c1wiPlxuICAgICAgICAgICAgICA8b3B0aW9uICpuZ0lmPVwiIW9wdC5ncm91cDsgZWxzZSBvcHRncm91cFwiIFtuZ1ZhbHVlXT1cIm9wdC52YWx1ZVwiIFtkaXNhYmxlZF09XCJvcHQuZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgICB7eyBvcHQubGFiZWwgfX1cbiAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjb3B0Z3JvdXA+XG4gICAgICAgICAgICAgICAgPG9wdGdyb3VwIFtsYWJlbF09XCJvcHQubGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IGNoaWxkIG9mIG9wdC5ncm91cFwiIFtuZ1ZhbHVlXT1cImNoaWxkLnZhbHVlXCIgW2Rpc2FibGVkXT1cImNoaWxkLmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGNoaWxkLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L29wdGdyb3VwPlxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RmllbGRTZWxlY3QgZXh0ZW5kcyBGaWVsZFR5cGU8RmllbGRUeXBlQ29uZmlnPFNlbGVjdFByb3BzPj4ge1xuICBvdmVycmlkZSBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBwcm9wczoge1xuICAgICAgY29tcGFyZVdpdGgobzE6IGFueSwgbzI6IGFueSkge1xuICAgICAgICByZXR1cm4gbzEgPT09IG8yO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIC8vIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEwMDEwXG4gIC8qKlxuICAgKiBUT0RPOiBDaGVjayBpZiB0aGlzIGlzIHN0aWxsIG5lZWRlZFxuICAgKi9cbiAgQFZpZXdDaGlsZChTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3Nvcikgc2V0IHNlbGVjdEFjY2Vzc29yKHM6IGFueSkge1xuICAgIGlmICghcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdyaXRlVmFsdWUgPSBzLndyaXRlVmFsdWUuYmluZChzKTtcbiAgICBpZiAocy5fZ2V0T3B0aW9uSWQocy52YWx1ZSkgPT09IG51bGwpIHtcbiAgICAgIHdyaXRlVmFsdWUocy52YWx1ZSk7XG4gICAgfVxuXG4gICAgcy53cml0ZVZhbHVlID0gKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGlkID0gcy5faWRDb3VudGVyO1xuICAgICAgd3JpdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcbiAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBpZCAhPT0gcy5faWRDb3VudGVyICYmXG4gICAgICAgICAgICAgIHMuX2dldE9wdGlvbklkKHZhbHVlKSA9PT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2VsZWN0ZWRJbmRleCAhPT0gLTFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB3cml0ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgaG9zdENvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHN1cGVyKGhvc3RDb250YWluZXJSZWYpO1xuICB9XG59XG4iXX0=