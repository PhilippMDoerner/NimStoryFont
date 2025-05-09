import { Directive, Injectable, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class FormlyTemplate {
    constructor(ref) {
        this.ref = ref;
    }
    ngOnChanges() {
        this.name = this.name || 'formly-group';
    }
}
FormlyTemplate.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyTemplate, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
FormlyTemplate.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FormlyTemplate, selector: "[formlyTemplate]", inputs: { name: ["formlyTemplate", "name"] }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyTemplate, decorators: [{
            type: Directive,
            args: [{ selector: '[formlyTemplate]' }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; }, propDecorators: { name: [{
                type: Input,
                args: ['formlyTemplate']
            }] } });
// workarround for https://github.com/angular/angular/issues/43227#issuecomment-904173738
export class FormlyFieldTemplates {
}
FormlyFieldTemplates.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldTemplates, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormlyFieldTemplates.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldTemplates });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldTemplates, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LnRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL2Zvcm1seS50ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFDLE1BQU0sZUFBZSxDQUFDOztBQUdoRyxNQUFNLE9BQU8sY0FBYztJQUd6QixZQUFtQixHQUFxQjtRQUFyQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtJQUFHLENBQUM7SUFFNUMsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxjQUFjLENBQUM7SUFDMUMsQ0FBQzs7NEdBUFUsY0FBYztnR0FBZCxjQUFjOzRGQUFkLGNBQWM7a0JBRDFCLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUU7a0dBRWhCLElBQUk7c0JBQTVCLEtBQUs7dUJBQUMsZ0JBQWdCOztBQVN6Qix5RkFBeUY7QUFFekYsTUFBTSxPQUFPLG9CQUFvQjs7a0hBQXBCLG9CQUFvQjtzSEFBcEIsb0JBQW9COzRGQUFwQixvQkFBb0I7a0JBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdGFibGUsIElucHV0LCBPbkNoYW5nZXMsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2Zvcm1seVRlbXBsYXRlXScgfSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlUZW1wbGF0ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgnZm9ybWx5VGVtcGxhdGUnKSBuYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLm5hbWUgfHwgJ2Zvcm1seS1ncm91cCc7XG4gIH1cbn1cblxuLy8gd29ya2Fycm91bmQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzQzMjI3I2lzc3VlY29tbWVudC05MDQxNzM3MzhcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZFRlbXBsYXRlcyB7XG4gIHRlbXBsYXRlcyE6IFF1ZXJ5TGlzdDxGb3JtbHlUZW1wbGF0ZT47XG59XG4iXX0=