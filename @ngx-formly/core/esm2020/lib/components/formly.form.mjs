import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, ContentChildren, } from '@angular/core';
import { FormlyFormBuilder } from '../services/formly.builder';
import { clone, hasKey, isNoopNgZone, isSignalRequired, observeDeep } from '../utils';
import { switchMap, filter, take } from 'rxjs/operators';
import { clearControl } from '../extensions/field-form/utils';
import { FormlyFieldTemplates, FormlyTemplate } from './formly.template';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/formly.builder";
import * as i2 from "../services/formly.config";
import * as i3 from "./formly.template";
import * as i4 from "./formly.field";
/**
 * The `<form-form>` component is the main container of the form,
 * which takes care of managing the form state
 * and delegates the rendering of each field to `<formly-field>` component.
 */
export class FormlyForm {
    constructor(builder, config, ngZone, fieldTemplates) {
        this.builder = builder;
        this.config = config;
        this.ngZone = ngZone;
        this.fieldTemplates = fieldTemplates;
        /** Event that is emitted when the model value is changed */
        this.modelChange = new EventEmitter();
        this.field = { type: 'formly-group' };
        this._modelChangeValue = {};
        this.valueChangesUnsubscribe = () => { };
    }
    /** The form instance which allow to track model value and validation status. */
    set form(form) {
        this.field.form = form;
    }
    get form() {
        return this.field.form;
    }
    /** The model to be represented by the form. */
    set model(model) {
        if (this.config.extras.immutable && this._modelChangeValue === model) {
            return;
        }
        this.setField({ model });
    }
    get model() {
        return this.field.model;
    }
    /** The field configurations for building the form. */
    set fields(fieldGroup) {
        this.setField({ fieldGroup });
    }
    get fields() {
        return this.field.fieldGroup;
    }
    /** Options for the form. */
    set options(options) {
        this.setField({ options });
    }
    get options() {
        return this.field.options;
    }
    set templates(templates) {
        this.fieldTemplates.templates = templates;
    }
    ngDoCheck() {
        if (this.config.extras.checkExpressionOn === 'changeDetectionCheck') {
            this.checkExpressionChange();
        }
    }
    ngOnChanges(changes) {
        if (changes.fields && this.form) {
            clearControl(this.form);
        }
        if (changes.fields || changes.form || (changes.model && this._modelChangeValue !== changes.model.currentValue)) {
            this.valueChangesUnsubscribe();
            this.builder.build(this.field);
            this.valueChangesUnsubscribe = this.valueChanges();
        }
    }
    ngOnDestroy() {
        this.valueChangesUnsubscribe();
    }
    checkExpressionChange() {
        this.field.options.checkExpressions?.(this.field);
    }
    valueChanges() {
        this.valueChangesUnsubscribe();
        let formEvents = null;
        if (isSignalRequired()) {
            let submitted = this.options?.parentForm?.submitted;
            formEvents = this.form.events.subscribe(() => {
                if (submitted !== this.options?.parentForm?.submitted) {
                    this.options.detectChanges(this.field);
                    submitted = this.options?.parentForm?.submitted;
                }
            });
        }
        let fieldChangesDetection = [];
        const valueChanges = this.field.options.fieldChanges
            .pipe(filter(({ field, type }) => hasKey(field) && type === 'valueChanges'), switchMap(() => (isNoopNgZone(this.ngZone) ? of(null) : this.ngZone.onStable.asObservable().pipe(take(1)))))
            .subscribe(() => this.ngZone.runGuarded(() => {
            // runGuarded is used to keep in sync the expression changes
            // https://github.com/ngx-formly/ngx-formly/issues/2095
            this.checkExpressionChange();
            if (this.field.options) {
                fieldChangesDetection.push(observeDeep(this.field.options, ['formState'], () => this.field.options.detectChanges(this.field)));
            }
            this.modelChange.emit((this._modelChangeValue = clone(this.model)));
        }));
        return () => {
            fieldChangesDetection.forEach((fnc) => fnc());
            formEvents?.unsubscribe();
            valueChanges.unsubscribe();
        };
    }
    setField(field) {
        if (this.config.extras.immutable) {
            this.field = { ...this.field, ...clone(field) };
        }
        else {
            Object.keys(field).forEach((p) => (this.field[p] = field[p]));
        }
    }
}
FormlyForm.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyForm, deps: [{ token: i1.FormlyFormBuilder }, { token: i2.FormlyConfig }, { token: i0.NgZone }, { token: i3.FormlyFieldTemplates }], target: i0.ɵɵFactoryTarget.Component });
FormlyForm.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyForm, selector: "formly-form", inputs: { form: "form", model: "model", fields: "fields", options: "options" }, outputs: { modelChange: "modelChange" }, providers: [FormlyFormBuilder, FormlyFieldTemplates], queries: [{ propertyName: "templates", predicate: FormlyTemplate }], usesOnChanges: true, ngImport: i0, template: '<formly-field [field]="field"></formly-field>', isInline: true, components: [{ type: i4.FormlyField, selector: "formly-field", inputs: ["field"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyForm, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-form',
                    template: '<formly-field [field]="field"></formly-field>',
                    providers: [FormlyFormBuilder, FormlyFieldTemplates],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.FormlyFormBuilder }, { type: i2.FormlyConfig }, { type: i0.NgZone }, { type: i3.FormlyFieldTemplates }]; }, propDecorators: { form: [{
                type: Input
            }], model: [{
                type: Input
            }], fields: [{
                type: Input
            }], options: [{
                type: Input
            }], modelChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [FormlyTemplate]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zcmMvbGliL2NvbXBvbmVudHMvZm9ybWx5LmZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFHdkIsS0FBSyxFQUVMLFlBQVksRUFDWixNQUFNLEVBR04sZUFBZSxHQUVoQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekUsT0FBTyxFQUFFLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7Ozs7OztBQUV4Qzs7OztHQUlHO0FBT0gsTUFBTSxPQUFPLFVBQVU7SUFtRHJCLFlBQ1UsT0FBMEIsRUFDMUIsTUFBb0IsRUFDcEIsTUFBYyxFQUNkLGNBQW9DO1FBSHBDLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBQzFCLFdBQU0sR0FBTixNQUFNLENBQWM7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQWQ5Qyw0REFBNEQ7UUFDbEQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBS2hELFVBQUssR0FBMkIsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUM7UUFDakQsc0JBQWlCLEdBQVEsRUFBRSxDQUFDO1FBQzVCLDRCQUF1QixHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQU94QyxDQUFDO0lBdkRKLGdGQUFnRjtJQUNoRixJQUNJLElBQUksQ0FBQyxJQUEyQjtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELCtDQUErQztJQUMvQyxJQUNJLEtBQUssQ0FBQyxLQUFVO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxLQUFLLEVBQUU7WUFDcEUsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELHNEQUFzRDtJQUN0RCxJQUNJLE1BQU0sQ0FBQyxVQUErQjtRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsNEJBQTRCO0lBQzVCLElBQ0ksT0FBTyxDQUFDLE9BQTBCO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFJRCxJQUFxQyxTQUFTLENBQUMsU0FBb0M7UUFDakYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzVDLENBQUM7SUFhRCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsS0FBSyxzQkFBc0IsRUFBRTtZQUNuRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDL0IsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUVELElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5RyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNwRDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUUvQixJQUFJLFVBQVUsR0FBd0IsSUFBSSxDQUFDO1FBQzNDLElBQUksZ0JBQWdCLEVBQUUsRUFBRTtZQUN0QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUM7WUFDcEQsVUFBVSxHQUFJLElBQUksQ0FBQyxJQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BELElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRTtvQkFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDO2lCQUNqRDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLHFCQUFxQixHQUFVLEVBQUUsQ0FBQztRQUN0QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZO2FBQ2pELElBQUksQ0FDSCxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxjQUFjLENBQUMsRUFDckUsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM1RzthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDMUIsNERBQTREO1lBQzVELHVEQUF1RDtZQUN2RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUN0QixxQkFBcUIsQ0FBQyxJQUFJLENBQ3hCLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDbkcsQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVKLE9BQU8sR0FBRyxFQUFFO1lBQ1YscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLFVBQVUsRUFBRSxXQUFXLEVBQUUsQ0FBQztZQUMxQixZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVPLFFBQVEsQ0FBQyxLQUE2QjtRQUM1QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDakQ7YUFBTTtZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxLQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUksS0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRjtJQUNILENBQUM7O3dHQW5JVSxVQUFVOzRGQUFWLFVBQVUsK0pBSFYsQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQyxvREE4Q25DLGNBQWMsa0RBL0NyQiwrQ0FBK0M7NEZBSTlDLFVBQVU7a0JBTnRCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwrQ0FBK0M7b0JBQ3pELFNBQVMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDO29CQUNwRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7MkxBSUssSUFBSTtzQkFEUCxLQUFLO2dCQVVGLEtBQUs7c0JBRFIsS0FBSztnQkFjRixNQUFNO3NCQURULEtBQUs7Z0JBVUYsT0FBTztzQkFEVixLQUFLO2dCQVNJLFdBQVc7c0JBQXBCLE1BQU07Z0JBQzhCLFNBQVM7c0JBQTdDLGVBQWU7dUJBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIERvQ2hlY2ssXG4gIE9uQ2hhbmdlcyxcbiAgSW5wdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBPbkRlc3Ryb3ksXG4gIE5nWm9uZSxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZywgRm9ybWx5Rm9ybU9wdGlvbnMsIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgRm9ybWx5Rm9ybUJ1aWxkZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtbHkuYnVpbGRlcic7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtbHkuY29uZmlnJztcbmltcG9ydCB7IGNsb25lLCBoYXNLZXksIGlzTm9vcE5nWm9uZSwgaXNTaWduYWxSZXF1aXJlZCwgb2JzZXJ2ZURlZXAgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNsZWFyQ29udHJvbCB9IGZyb20gJy4uL2V4dGVuc2lvbnMvZmllbGQtZm9ybS91dGlscyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZFRlbXBsYXRlcywgRm9ybWx5VGVtcGxhdGUgfSBmcm9tICcuL2Zvcm1seS50ZW1wbGF0ZSc7XG5pbXBvcnQgeyBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogVGhlIGA8Zm9ybS1mb3JtPmAgY29tcG9uZW50IGlzIHRoZSBtYWluIGNvbnRhaW5lciBvZiB0aGUgZm9ybSxcbiAqIHdoaWNoIHRha2VzIGNhcmUgb2YgbWFuYWdpbmcgdGhlIGZvcm0gc3RhdGVcbiAqIGFuZCBkZWxlZ2F0ZXMgdGhlIHJlbmRlcmluZyBvZiBlYWNoIGZpZWxkIHRvIGA8Zm9ybWx5LWZpZWxkPmAgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktZm9ybScsXG4gIHRlbXBsYXRlOiAnPGZvcm1seS1maWVsZCBbZmllbGRdPVwiZmllbGRcIj48L2Zvcm1seS1maWVsZD4nLFxuICBwcm92aWRlcnM6IFtGb3JtbHlGb3JtQnVpbGRlciwgRm9ybWx5RmllbGRUZW1wbGF0ZXNdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5Rm9ybSBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBmb3JtIGluc3RhbmNlIHdoaWNoIGFsbG93IHRvIHRyYWNrIG1vZGVsIHZhbHVlIGFuZCB2YWxpZGF0aW9uIHN0YXR1cy4gKi9cbiAgQElucHV0KClcbiAgc2V0IGZvcm0oZm9ybTogRm9ybUdyb3VwIHwgRm9ybUFycmF5KSB7XG4gICAgdGhpcy5maWVsZC5mb3JtID0gZm9ybTtcbiAgfVxuICBnZXQgZm9ybSgpOiBGb3JtR3JvdXAgfCBGb3JtQXJyYXkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkLmZvcm07XG4gIH1cblxuICAvKiogVGhlIG1vZGVsIHRvIGJlIHJlcHJlc2VudGVkIGJ5IHRoZSBmb3JtLiAqL1xuICBASW5wdXQoKVxuICBzZXQgbW9kZWwobW9kZWw6IGFueSkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5leHRyYXMuaW1tdXRhYmxlICYmIHRoaXMuX21vZGVsQ2hhbmdlVmFsdWUgPT09IG1vZGVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRGaWVsZCh7IG1vZGVsIH0pO1xuICB9XG4gIGdldCBtb2RlbCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkLm1vZGVsO1xuICB9XG5cbiAgLyoqIFRoZSBmaWVsZCBjb25maWd1cmF0aW9ucyBmb3IgYnVpbGRpbmcgdGhlIGZvcm0uICovXG4gIEBJbnB1dCgpXG4gIHNldCBmaWVsZHMoZmllbGRHcm91cDogRm9ybWx5RmllbGRDb25maWdbXSkge1xuICAgIHRoaXMuc2V0RmllbGQoeyBmaWVsZEdyb3VwIH0pO1xuICB9XG4gIGdldCBmaWVsZHMoKTogRm9ybWx5RmllbGRDb25maWdbXSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGQuZmllbGRHcm91cDtcbiAgfVxuXG4gIC8qKiBPcHRpb25zIGZvciB0aGUgZm9ybS4gKi9cbiAgQElucHV0KClcbiAgc2V0IG9wdGlvbnMob3B0aW9uczogRm9ybWx5Rm9ybU9wdGlvbnMpIHtcbiAgICB0aGlzLnNldEZpZWxkKHsgb3B0aW9ucyB9KTtcbiAgfVxuICBnZXQgb3B0aW9ucygpOiBGb3JtbHlGb3JtT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGQub3B0aW9ucztcbiAgfVxuXG4gIC8qKiBFdmVudCB0aGF0IGlzIGVtaXR0ZWQgd2hlbiB0aGUgbW9kZWwgdmFsdWUgaXMgY2hhbmdlZCAqL1xuICBAT3V0cHV0KCkgbW9kZWxDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQENvbnRlbnRDaGlsZHJlbihGb3JtbHlUZW1wbGF0ZSkgc2V0IHRlbXBsYXRlcyh0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxGb3JtbHlUZW1wbGF0ZT4pIHtcbiAgICB0aGlzLmZpZWxkVGVtcGxhdGVzLnRlbXBsYXRlcyA9IHRlbXBsYXRlcztcbiAgfVxuXG4gIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlID0geyB0eXBlOiAnZm9ybWx5LWdyb3VwJyB9O1xuICBwcml2YXRlIF9tb2RlbENoYW5nZVZhbHVlOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSB2YWx1ZUNoYW5nZXNVbnN1YnNjcmliZSA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYnVpbGRlcjogRm9ybWx5Rm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBjb25maWc6IEZvcm1seUNvbmZpZyxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgZmllbGRUZW1wbGF0ZXM6IEZvcm1seUZpZWxkVGVtcGxhdGVzLFxuICApIHt9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5leHRyYXMuY2hlY2tFeHByZXNzaW9uT24gPT09ICdjaGFuZ2VEZXRlY3Rpb25DaGVjaycpIHtcbiAgICAgIHRoaXMuY2hlY2tFeHByZXNzaW9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmZpZWxkcyAmJiB0aGlzLmZvcm0pIHtcbiAgICAgIGNsZWFyQ29udHJvbCh0aGlzLmZvcm0pO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmZpZWxkcyB8fCBjaGFuZ2VzLmZvcm0gfHwgKGNoYW5nZXMubW9kZWwgJiYgdGhpcy5fbW9kZWxDaGFuZ2VWYWx1ZSAhPT0gY2hhbmdlcy5tb2RlbC5jdXJyZW50VmFsdWUpKSB7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlc1Vuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLmJ1aWxkZXIuYnVpbGQodGhpcy5maWVsZCk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlc1Vuc3Vic2NyaWJlID0gdGhpcy52YWx1ZUNoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlc1Vuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRXhwcmVzc2lvbkNoYW5nZSgpIHtcbiAgICB0aGlzLmZpZWxkLm9wdGlvbnMuY2hlY2tFeHByZXNzaW9ucz8uKHRoaXMuZmllbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWx1ZUNoYW5nZXMoKSB7XG4gICAgdGhpcy52YWx1ZUNoYW5nZXNVbnN1YnNjcmliZSgpO1xuXG4gICAgbGV0IGZvcm1FdmVudHM6IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICAgIGlmIChpc1NpZ25hbFJlcXVpcmVkKCkpIHtcbiAgICAgIGxldCBzdWJtaXR0ZWQgPSB0aGlzLm9wdGlvbnM/LnBhcmVudEZvcm0/LnN1Ym1pdHRlZDtcbiAgICAgIGZvcm1FdmVudHMgPSAodGhpcy5mb3JtIGFzIGFueSkuZXZlbnRzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmIChzdWJtaXR0ZWQgIT09IHRoaXMub3B0aW9ucz8ucGFyZW50Rm9ybT8uc3VibWl0dGVkKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLmRldGVjdENoYW5nZXModGhpcy5maWVsZCk7XG4gICAgICAgICAgc3VibWl0dGVkID0gdGhpcy5vcHRpb25zPy5wYXJlbnRGb3JtPy5zdWJtaXR0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBmaWVsZENoYW5nZXNEZXRlY3Rpb246IGFueVtdID0gW107XG4gICAgY29uc3QgdmFsdWVDaGFuZ2VzID0gdGhpcy5maWVsZC5vcHRpb25zLmZpZWxkQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoeyBmaWVsZCwgdHlwZSB9KSA9PiBoYXNLZXkoZmllbGQpICYmIHR5cGUgPT09ICd2YWx1ZUNoYW5nZXMnKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IChpc05vb3BOZ1pvbmUodGhpcy5uZ1pvbmUpID8gb2YobnVsbCkgOiB0aGlzLm5nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpKSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgIHRoaXMubmdab25lLnJ1bkd1YXJkZWQoKCkgPT4ge1xuICAgICAgICAgIC8vIHJ1bkd1YXJkZWQgaXMgdXNlZCB0byBrZWVwIGluIHN5bmMgdGhlIGV4cHJlc3Npb24gY2hhbmdlc1xuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9uZ3gtZm9ybWx5L25neC1mb3JtbHkvaXNzdWVzLzIwOTVcbiAgICAgICAgICB0aGlzLmNoZWNrRXhwcmVzc2lvbkNoYW5nZSgpO1xuICAgICAgICAgIGlmICh0aGlzLmZpZWxkLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZpZWxkQ2hhbmdlc0RldGVjdGlvbi5wdXNoKFxuICAgICAgICAgICAgICBvYnNlcnZlRGVlcCh0aGlzLmZpZWxkLm9wdGlvbnMsIFsnZm9ybVN0YXRlJ10sICgpID0+IHRoaXMuZmllbGQub3B0aW9ucy5kZXRlY3RDaGFuZ2VzKHRoaXMuZmllbGQpKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubW9kZWxDaGFuZ2UuZW1pdCgodGhpcy5fbW9kZWxDaGFuZ2VWYWx1ZSA9IGNsb25lKHRoaXMubW9kZWwpKSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBmaWVsZENoYW5nZXNEZXRlY3Rpb24uZm9yRWFjaCgoZm5jKSA9PiBmbmMoKSk7XG4gICAgICBmb3JtRXZlbnRzPy51bnN1YnNjcmliZSgpO1xuICAgICAgdmFsdWVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RmllbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZXh0cmFzLmltbXV0YWJsZSkge1xuICAgICAgdGhpcy5maWVsZCA9IHsgLi4udGhpcy5maWVsZCwgLi4uY2xvbmUoZmllbGQpIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkKS5mb3JFYWNoKChwKSA9PiAoKHRoaXMuZmllbGQgYXMgYW55KVtwXSA9IChmaWVsZCBhcyBhbnkpW3BdKSk7XG4gICAgfVxuICB9XG59XG4iXX0=