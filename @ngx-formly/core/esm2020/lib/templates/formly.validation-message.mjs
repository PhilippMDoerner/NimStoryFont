import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FORMLY_VALIDATORS, isObject } from '../utils';
import { isObservable, of } from 'rxjs';
import { merge } from 'rxjs';
import { startWith, switchMap, filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/formly.config";
import * as i2 from "@angular/common";
/**
 * The `<formly-validation-message>` component renders the error message of a given `field`.
 */
export class FormlyValidationMessage {
    constructor(config) {
        this.config = config;
    }
    ngOnChanges() {
        const EXPR_VALIDATORS = FORMLY_VALIDATORS.map((v) => `templateOptions.${v}`);
        this.errorMessage$ = merge(this.field.formControl.statusChanges, !this.field.options
            ? of(null)
            : this.field.options.fieldChanges.pipe(filter(({ field, type, property }) => {
                return (field === this.field &&
                    type === 'expressionChanges' &&
                    (property.indexOf('validation') !== -1 || EXPR_VALIDATORS.indexOf(property) !== -1));
            }))).pipe(startWith(null), switchMap(() => (isObservable(this.errorMessage) ? this.errorMessage : of(this.errorMessage))));
    }
    get errorMessage() {
        const fieldForm = this.field.formControl;
        for (const error in fieldForm.errors) {
            if (fieldForm.errors.hasOwnProperty(error)) {
                let message = this.config.getValidatorMessage(error);
                if (isObject(fieldForm.errors[error])) {
                    if (fieldForm.errors[error].errorPath) {
                        return undefined;
                    }
                    if (fieldForm.errors[error].message) {
                        message = fieldForm.errors[error].message;
                    }
                }
                if (this.field.validation?.messages?.[error]) {
                    message = this.field.validation.messages[error];
                }
                if (this.field.validators?.[error]?.message) {
                    message = this.field.validators[error].message;
                }
                if (this.field.asyncValidators?.[error]?.message) {
                    message = this.field.asyncValidators[error].message;
                }
                if (typeof message === 'function') {
                    return message(fieldForm.errors[error], this.field);
                }
                return message;
            }
        }
        return undefined;
    }
}
FormlyValidationMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyValidationMessage, deps: [{ token: i1.FormlyConfig }], target: i0.ɵɵFactoryTarget.Component });
FormlyValidationMessage.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyValidationMessage, selector: "formly-validation-message", inputs: { field: "field" }, usesOnChanges: true, ngImport: i0, template: '{{ errorMessage$ | async }}', isInline: true, pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyValidationMessage, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-validation-message',
                    template: '{{ errorMessage$ | async }}',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.FormlyConfig }]; }, propDecorators: { field: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LnZhbGlkYXRpb24tbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NyYy9saWIvdGVtcGxhdGVzL2Zvcm1seS52YWxpZGF0aW9uLW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHckYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2RCxPQUFPLEVBQWMsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRTlEOztHQUVHO0FBTUgsTUFBTSxPQUFPLHVCQUF1QjtJQUtsQyxZQUFvQixNQUFvQjtRQUFwQixXQUFNLEdBQU4sTUFBTSxDQUFjO0lBQUcsQ0FBQztJQUU1QyxXQUFXO1FBQ1QsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUNwQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztZQUNqQixDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNsQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtnQkFDbkMsT0FBTyxDQUNMLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSztvQkFDcEIsSUFBSSxLQUFLLG1CQUFtQjtvQkFDNUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDcEYsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUNILENBQ04sQ0FBQyxJQUFJLENBQ0osU0FBUyxDQUFDLElBQUksQ0FBQyxFQUNmLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUMvRixDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3pDLEtBQUssTUFBTSxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNwQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVyRCxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3JDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUU7d0JBQ3JDLE9BQU8sU0FBUyxDQUFDO3FCQUNsQjtvQkFFRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFO3dCQUNuQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7cUJBQzNDO2lCQUNGO2dCQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzVDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pEO2dCQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUU7b0JBQzNDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7aUJBQ2hEO2dCQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUU7b0JBQ2hELE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7aUJBQ3JEO2dCQUVELElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO29CQUNqQyxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckQ7Z0JBRUQsT0FBTyxPQUFPLENBQUM7YUFDaEI7U0FDRjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O3FIQWpFVSx1QkFBdUI7eUdBQXZCLHVCQUF1QixrSEFIeEIsNkJBQTZCOzRGQUc1Qix1QkFBdUI7a0JBTG5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO21HQUdVLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1seUNvbmZpZyB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgRk9STUxZX1ZBTElEQVRPUlMsIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgaXNPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogVGhlIGA8Zm9ybWx5LXZhbGlkYXRpb24tbWVzc2FnZT5gIGNvbXBvbmVudCByZW5kZXJzIHRoZSBlcnJvciBtZXNzYWdlIG9mIGEgZ2l2ZW4gYGZpZWxkYC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LXZhbGlkYXRpb24tbWVzc2FnZScsXG4gIHRlbXBsYXRlOiAne3sgZXJyb3JNZXNzYWdlJCB8IGFzeW5jIH19JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seVZhbGlkYXRpb25NZXNzYWdlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgLyoqIFRoZSBmaWVsZCBjb25maWcuICovXG4gIEBJbnB1dCgpIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZztcbiAgZXJyb3JNZXNzYWdlJDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBGb3JtbHlDb25maWcpIHt9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgY29uc3QgRVhQUl9WQUxJREFUT1JTID0gRk9STUxZX1ZBTElEQVRPUlMubWFwKCh2KSA9PiBgdGVtcGxhdGVPcHRpb25zLiR7dn1gKTtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSQgPSBtZXJnZShcbiAgICAgIHRoaXMuZmllbGQuZm9ybUNvbnRyb2wuc3RhdHVzQ2hhbmdlcyxcbiAgICAgICF0aGlzLmZpZWxkLm9wdGlvbnNcbiAgICAgICAgPyBvZihudWxsKVxuICAgICAgICA6IHRoaXMuZmllbGQub3B0aW9ucy5maWVsZENoYW5nZXMucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoeyBmaWVsZCwgdHlwZSwgcHJvcGVydHkgfSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIGZpZWxkID09PSB0aGlzLmZpZWxkICYmXG4gICAgICAgICAgICAgICAgdHlwZSA9PT0gJ2V4cHJlc3Npb25DaGFuZ2VzJyAmJlxuICAgICAgICAgICAgICAgIChwcm9wZXJ0eS5pbmRleE9mKCd2YWxpZGF0aW9uJykgIT09IC0xIHx8IEVYUFJfVkFMSURBVE9SUy5pbmRleE9mKHByb3BlcnR5KSAhPT0gLTEpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApLFxuICAgICkucGlwZShcbiAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiAoaXNPYnNlcnZhYmxlKHRoaXMuZXJyb3JNZXNzYWdlKSA/IHRoaXMuZXJyb3JNZXNzYWdlIDogb2YodGhpcy5lcnJvck1lc3NhZ2UpKSksXG4gICAgKTtcbiAgfVxuXG4gIGdldCBlcnJvck1lc3NhZ2UoKSB7XG4gICAgY29uc3QgZmllbGRGb3JtID0gdGhpcy5maWVsZC5mb3JtQ29udHJvbDtcbiAgICBmb3IgKGNvbnN0IGVycm9yIGluIGZpZWxkRm9ybS5lcnJvcnMpIHtcbiAgICAgIGlmIChmaWVsZEZvcm0uZXJyb3JzLmhhc093blByb3BlcnR5KGVycm9yKSkge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuY29uZmlnLmdldFZhbGlkYXRvck1lc3NhZ2UoZXJyb3IpO1xuXG4gICAgICAgIGlmIChpc09iamVjdChmaWVsZEZvcm0uZXJyb3JzW2Vycm9yXSkpIHtcbiAgICAgICAgICBpZiAoZmllbGRGb3JtLmVycm9yc1tlcnJvcl0uZXJyb3JQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmaWVsZEZvcm0uZXJyb3JzW2Vycm9yXS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gZmllbGRGb3JtLmVycm9yc1tlcnJvcl0ubWVzc2FnZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWVsZC52YWxpZGF0aW9uPy5tZXNzYWdlcz8uW2Vycm9yXSkge1xuICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmZpZWxkLnZhbGlkYXRpb24ubWVzc2FnZXNbZXJyb3JdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZmllbGQudmFsaWRhdG9ycz8uW2Vycm9yXT8ubWVzc2FnZSkge1xuICAgICAgICAgIG1lc3NhZ2UgPSB0aGlzLmZpZWxkLnZhbGlkYXRvcnNbZXJyb3JdLm1lc3NhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5maWVsZC5hc3luY1ZhbGlkYXRvcnM/LltlcnJvcl0/Lm1lc3NhZ2UpIHtcbiAgICAgICAgICBtZXNzYWdlID0gdGhpcy5maWVsZC5hc3luY1ZhbGlkYXRvcnNbZXJyb3JdLm1lc3NhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gbWVzc2FnZShmaWVsZEZvcm0uZXJyb3JzW2Vycm9yXSwgdGhpcy5maWVsZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=