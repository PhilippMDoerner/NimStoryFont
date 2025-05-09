import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from './field.type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
/** @ignore */
export class FormlyTemplateType extends FieldType {
    constructor(sanitizer) {
        super();
        this.sanitizer = sanitizer;
        this.innerHtml = {};
    }
    get template() {
        if (this.field && this.field.template !== this.innerHtml.template) {
            this.innerHtml = {
                template: this.field.template,
                content: this.props.safeHtml
                    ? this.sanitizer.bypassSecurityTrustHtml(this.field.template)
                    : this.field.template,
            };
        }
        return this.innerHtml.content;
    }
}
FormlyTemplateType.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyTemplateType, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
FormlyTemplateType.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyTemplateType, selector: "formly-template", usesInheritance: true, ngImport: i0, template: `<div [innerHtml]="template"></div>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyTemplateType, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-template',
                    template: `<div [innerHtml]="template"></div>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdGVtcGxhdGUudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NyYy9saWIvdGVtcGxhdGVzL2ZpZWxkLXRlbXBsYXRlLnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFFekMsY0FBYztBQU1kLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxTQUFTO0lBZS9DLFlBQW9CLFNBQXVCO1FBQ3pDLEtBQUssRUFBRSxDQUFDO1FBRFUsY0FBUyxHQUFULFNBQVMsQ0FBYztRQURuQyxjQUFTLEdBQThDLEVBQUUsQ0FBQztJQUdsRSxDQUFDO0lBaEJELElBQUksUUFBUTtRQUNWLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUNqRSxJQUFJLENBQUMsU0FBUyxHQUFHO2dCQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7b0JBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO29CQUM3RCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO2FBQ3hCLENBQUM7U0FDSDtRQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDaEMsQ0FBQzs7Z0hBWlUsa0JBQWtCO29HQUFsQixrQkFBa0IsOEVBSG5CLG9DQUFvQzs0RkFHbkMsa0JBQWtCO2tCQUw5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxvQ0FBb0M7b0JBQzlDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJy4vZmllbGQudHlwZSc7XG5cbi8qKiBAaWdub3JlICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3JtbHktdGVtcGxhdGUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW2lubmVySHRtbF09XCJ0ZW1wbGF0ZVwiPjwvZGl2PmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlUZW1wbGF0ZVR5cGUgZXh0ZW5kcyBGaWVsZFR5cGUge1xuICBnZXQgdGVtcGxhdGUoKSB7XG4gICAgaWYgKHRoaXMuZmllbGQgJiYgdGhpcy5maWVsZC50ZW1wbGF0ZSAhPT0gdGhpcy5pbm5lckh0bWwudGVtcGxhdGUpIHtcbiAgICAgIHRoaXMuaW5uZXJIdG1sID0ge1xuICAgICAgICB0ZW1wbGF0ZTogdGhpcy5maWVsZC50ZW1wbGF0ZSxcbiAgICAgICAgY29udGVudDogdGhpcy5wcm9wcy5zYWZlSHRtbFxuICAgICAgICAgID8gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodGhpcy5maWVsZC50ZW1wbGF0ZSlcbiAgICAgICAgICA6IHRoaXMuZmllbGQudGVtcGxhdGUsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmlubmVySHRtbC5jb250ZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBpbm5lckh0bWw6IHsgY29udGVudD86IFNhZmVIdG1sOyB0ZW1wbGF0ZT86IHN0cmluZyB9ID0ge307XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG4iXX0=