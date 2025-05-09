import { Injectable, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defineHiddenProp, observe, disableTreeValidityCall, isHiddenField, isSignalRequired, } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "./formly.config";
import * as i2 from "@angular/forms";
export class FormlyFormBuilder {
    constructor(config, injector, viewContainerRef, parentForm) {
        this.config = config;
        this.injector = injector;
        this.viewContainerRef = viewContainerRef;
        this.parentForm = parentForm;
    }
    buildForm(form, fieldGroup = [], model, options) {
        this.build({ fieldGroup, model, form, options });
    }
    build(field) {
        if (!this.config.extensions.core) {
            throw new Error('NgxFormly: missing `forRoot()` call. use `forRoot()` when registering the `FormlyModule`.');
        }
        if (!field.parent) {
            this._setOptions(field);
        }
        disableTreeValidityCall(field.form, () => {
            this._build(field);
            // TODO: add test for https://github.com/ngx-formly/ngx-formly/issues/3910
            if (!field.parent || field.fieldArray) {
                // detect changes early to avoid reset value by hidden fields
                const options = field.options;
                if (field.parent && isHiddenField(field)) {
                    // when hide is used in expression set defaul value will not be set until detect hide changes
                    // which causes default value not set on new item is added
                    options._hiddenFieldsForCheck?.push({ field, default: false });
                }
                options.checkExpressions?.(field, true);
                options._detectChanges?.(field);
            }
        });
    }
    _build(field) {
        if (!field) {
            return;
        }
        const extensions = Object.values(this.config.extensions);
        extensions.forEach((extension) => extension.prePopulate?.(field));
        extensions.forEach((extension) => extension.onPopulate?.(field));
        field.fieldGroup?.forEach((f) => this._build(f));
        extensions.forEach((extension) => extension.postPopulate?.(field));
    }
    _setOptions(field) {
        field.form = field.form || new FormGroup({});
        field.model = field.model || {};
        field.options = field.options || {};
        const options = field.options;
        if (!options._viewContainerRef) {
            defineHiddenProp(options, '_viewContainerRef', this.viewContainerRef);
        }
        if (!options._injector) {
            defineHiddenProp(options, '_injector', this.injector);
        }
        if (!options.build) {
            options._buildForm = () => {
                console.warn(`Formly: 'options._buildForm' is deprecated since v6.0, use 'options.build' instead.`);
                this.build(field);
            };
            options.build = (f = field) => {
                this.build(f);
                return f;
            };
        }
        if (!options.parentForm && this.parentForm) {
            defineHiddenProp(options, 'parentForm', this.parentForm);
            if (!isSignalRequired()) {
                observe(options, ['parentForm', 'submitted'], ({ firstChange }) => {
                    if (!firstChange) {
                        options.detectChanges(field);
                    }
                });
            }
        }
    }
}
FormlyFormBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, deps: [{ token: i1.FormlyConfig }, { token: i0.Injector }, { token: i0.ViewContainerRef, optional: true }, { token: i2.FormGroupDirective, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
FormlyFormBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.FormlyConfig }, { type: i0.Injector }, { type: i0.ViewContainerRef, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zcmMvbGliL3NlcnZpY2VzL2Zvcm1seS5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksUUFBUSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUUsU0FBUyxFQUFpQyxNQUFNLGdCQUFnQixDQUFDO0FBRzFFLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLHVCQUF1QixFQUN2QixhQUFhLEVBQ2IsZ0JBQWdCLEdBRWpCLE1BQU0sVUFBVSxDQUFDOzs7O0FBR2xCLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFDVSxNQUFvQixFQUNwQixRQUFrQixFQUNOLGdCQUFrQyxFQUNsQyxVQUE4QjtRQUgxQyxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDTixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGVBQVUsR0FBVixVQUFVLENBQW9CO0lBQ2pELENBQUM7SUFFSixTQUFTLENBQUMsSUFBMkIsRUFBRSxhQUFrQyxFQUFFLEVBQUUsS0FBVSxFQUFFLE9BQTBCO1FBQ2pILElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxLQUFLLENBQUMsS0FBd0I7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLDJGQUEyRixDQUFDLENBQUM7U0FDOUc7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO1FB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QUVkLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXpELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUN2QixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFO29CQUNoRSxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUNoQixPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUM5QjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7SUFDSCxDQUFDOzsrR0ExRlUsaUJBQWlCO21IQUFqQixpQkFBaUIsY0FESixNQUFNOzRGQUNuQixpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFLN0IsUUFBUTs7MEJBQ1IsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBPcHRpb25hbCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXksIEZvcm1Hcm91cERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUNvbmZpZyB9IGZyb20gJy4vZm9ybWx5LmNvbmZpZyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZywgRm9ybWx5Rm9ybU9wdGlvbnMsIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgZGVmaW5lSGlkZGVuUHJvcCxcbiAgb2JzZXJ2ZSxcbiAgZGlzYWJsZVRyZWVWYWxpZGl0eUNhbGwsXG4gIGlzSGlkZGVuRmllbGQsXG4gIGlzU2lnbmFsUmVxdWlyZWQsXG4gIGlzVW5kZWZpbmVkLFxufSBmcm9tICcuLi91dGlscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRm9ybWx5Rm9ybUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZzogRm9ybWx5Q29uZmlnLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHBhcmVudEZvcm06IEZvcm1Hcm91cERpcmVjdGl2ZSxcbiAgKSB7fVxuXG4gIGJ1aWxkRm9ybShmb3JtOiBGb3JtR3JvdXAgfCBGb3JtQXJyYXksIGZpZWxkR3JvdXA6IEZvcm1seUZpZWxkQ29uZmlnW10gPSBbXSwgbW9kZWw6IGFueSwgb3B0aW9uczogRm9ybWx5Rm9ybU9wdGlvbnMpIHtcbiAgICB0aGlzLmJ1aWxkKHsgZmllbGRHcm91cCwgbW9kZWwsIGZvcm0sIG9wdGlvbnMgfSk7XG4gIH1cblxuICBidWlsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWcpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLmV4dGVuc2lvbnMuY29yZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZ3hGb3JtbHk6IG1pc3NpbmcgYGZvclJvb3QoKWAgY2FsbC4gdXNlIGBmb3JSb290KClgIHdoZW4gcmVnaXN0ZXJpbmcgdGhlIGBGb3JtbHlNb2R1bGVgLicpO1xuICAgIH1cblxuICAgIGlmICghZmllbGQucGFyZW50KSB7XG4gICAgICB0aGlzLl9zZXRPcHRpb25zKGZpZWxkKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlVHJlZVZhbGlkaXR5Q2FsbChmaWVsZC5mb3JtLCAoKSA9PiB7XG4gICAgICB0aGlzLl9idWlsZChmaWVsZCk7XG4gICAgICAvLyBUT0RPOiBhZGQgdGVzdCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL25neC1mb3JtbHkvbmd4LWZvcm1seS9pc3N1ZXMvMzkxMFxuICAgICAgaWYgKCFmaWVsZC5wYXJlbnQgfHwgKGZpZWxkIGFzIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpLmZpZWxkQXJyYXkpIHtcbiAgICAgICAgLy8gZGV0ZWN0IGNoYW5nZXMgZWFybHkgdG8gYXZvaWQgcmVzZXQgdmFsdWUgYnkgaGlkZGVuIGZpZWxkc1xuICAgICAgICBjb25zdCBvcHRpb25zID0gKGZpZWxkIGFzIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpLm9wdGlvbnM7XG5cbiAgICAgICAgaWYgKGZpZWxkLnBhcmVudCAmJiBpc0hpZGRlbkZpZWxkKGZpZWxkKSkge1xuICAgICAgICAgIC8vIHdoZW4gaGlkZSBpcyB1c2VkIGluIGV4cHJlc3Npb24gc2V0IGRlZmF1bCB2YWx1ZSB3aWxsIG5vdCBiZSBzZXQgdW50aWwgZGV0ZWN0IGhpZGUgY2hhbmdlc1xuICAgICAgICAgIC8vIHdoaWNoIGNhdXNlcyBkZWZhdWx0IHZhbHVlIG5vdCBzZXQgb24gbmV3IGl0ZW0gaXMgYWRkZWRcbiAgICAgICAgICBvcHRpb25zLl9oaWRkZW5GaWVsZHNGb3JDaGVjaz8ucHVzaCh7IGZpZWxkLCBkZWZhdWx0OiBmYWxzZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMuY2hlY2tFeHByZXNzaW9ucz8uKGZpZWxkLCB0cnVlKTtcbiAgICAgICAgb3B0aW9ucy5fZGV0ZWN0Q2hhbmdlcz8uKGZpZWxkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgaWYgKCFmaWVsZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBPYmplY3QudmFsdWVzKHRoaXMuY29uZmlnLmV4dGVuc2lvbnMpO1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaCgoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24ucHJlUG9wdWxhdGU/LihmaWVsZCkpO1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaCgoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24ub25Qb3B1bGF0ZT8uKGZpZWxkKSk7XG4gICAgZmllbGQuZmllbGRHcm91cD8uZm9yRWFjaCgoZikgPT4gdGhpcy5fYnVpbGQoZikpO1xuICAgIGV4dGVuc2lvbnMuZm9yRWFjaCgoZXh0ZW5zaW9uKSA9PiBleHRlbnNpb24ucG9zdFBvcHVsYXRlPy4oZmllbGQpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE9wdGlvbnMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBmaWVsZC5mb3JtID0gZmllbGQuZm9ybSB8fCBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICBmaWVsZC5tb2RlbCA9IGZpZWxkLm1vZGVsIHx8IHt9O1xuICAgIGZpZWxkLm9wdGlvbnMgPSBmaWVsZC5vcHRpb25zIHx8IHt9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSBmaWVsZC5vcHRpb25zO1xuXG4gICAgaWYgKCFvcHRpb25zLl92aWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKG9wdGlvbnMsICdfdmlld0NvbnRhaW5lclJlZicsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLl9pbmplY3Rvcikge1xuICAgICAgZGVmaW5lSGlkZGVuUHJvcChvcHRpb25zLCAnX2luamVjdG9yJywgdGhpcy5pbmplY3Rvcik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLmJ1aWxkKSB7XG4gICAgICBvcHRpb25zLl9idWlsZEZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUud2FybihgRm9ybWx5OiAnb3B0aW9ucy5fYnVpbGRGb3JtJyBpcyBkZXByZWNhdGVkIHNpbmNlIHY2LjAsIHVzZSAnb3B0aW9ucy5idWlsZCcgaW5zdGVhZC5gKTtcbiAgICAgICAgdGhpcy5idWlsZChmaWVsZCk7XG4gICAgICB9O1xuXG4gICAgICBvcHRpb25zLmJ1aWxkID0gKGY6IEZvcm1seUZpZWxkQ29uZmlnID0gZmllbGQpID0+IHtcbiAgICAgICAgdGhpcy5idWlsZChmKTtcblxuICAgICAgICByZXR1cm4gZjtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLnBhcmVudEZvcm0gJiYgdGhpcy5wYXJlbnRGb3JtKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKG9wdGlvbnMsICdwYXJlbnRGb3JtJywgdGhpcy5wYXJlbnRGb3JtKTtcblxuICAgICAgaWYgKCFpc1NpZ25hbFJlcXVpcmVkKCkpIHtcbiAgICAgICAgb2JzZXJ2ZShvcHRpb25zLCBbJ3BhcmVudEZvcm0nLCAnc3VibWl0dGVkJ10sICh7IGZpcnN0Q2hhbmdlIH0pID0+IHtcbiAgICAgICAgICBpZiAoIWZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICBvcHRpb25zLmRldGVjdENoYW5nZXMoZmllbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=