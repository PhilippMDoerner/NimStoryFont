import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from './field.type';
import * as i0 from "@angular/core";
import * as i1 from "../components/formly.field";
import * as i2 from "@angular/common";
/** @ignore */
export class FormlyGroup extends FieldType {
}
FormlyGroup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyGroup, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyGroup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyGroup, selector: "formly-group", host: { properties: { "class": "field.fieldGroupClassName || \"\"" } }, usesInheritance: true, ngImport: i0, template: `
    <formly-field *ngFor="let f of field.fieldGroup" [field]="f"></formly-field>
    <ng-content></ng-content>
  `, isInline: true, components: [{ type: i1.FormlyField, selector: "formly-field", inputs: ["field"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyGroup, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-group',
                    template: `
    <formly-field *ngFor="let f of field.fieldGroup" [field]="f"></formly-field>
    <ng-content></ng-content>
  `,
                    host: {
                        '[class]': 'field.fieldGroupClassName || ""',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5Lmdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvc3JjL2xpYi90ZW1wbGF0ZXMvZm9ybWx5Lmdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBd0IsTUFBTSxjQUFjLENBQUM7Ozs7QUFFL0QsY0FBYztBQVlkLE1BQU0sT0FBTyxXQUFZLFNBQVEsU0FBK0I7O3lHQUFuRCxXQUFXOzZGQUFYLFdBQVcsbUpBVFo7OztHQUdUOzRGQU1VLFdBQVc7a0JBWHZCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRTs7O0dBR1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFBRSxpQ0FBaUM7cUJBQzdDO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRmllbGRHcm91cFR5cGVDb25maWcgfSBmcm9tICcuL2ZpZWxkLnR5cGUnO1xuXG4vKiogQGlnbm9yZSAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWdyb3VwJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8Zm9ybWx5LWZpZWxkICpuZ0Zvcj1cImxldCBmIG9mIGZpZWxkLmZpZWxkR3JvdXBcIiBbZmllbGRdPVwiZlwiPjwvZm9ybWx5LWZpZWxkPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbY2xhc3NdJzogJ2ZpZWxkLmZpZWxkR3JvdXBDbGFzc05hbWUgfHwgXCJcIicsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlHcm91cCBleHRlbmRzIEZpZWxkVHlwZTxGaWVsZEdyb3VwVHlwZUNvbmZpZz4ge31cbiJdfQ==