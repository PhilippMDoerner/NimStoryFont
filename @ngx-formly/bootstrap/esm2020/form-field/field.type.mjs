import { Directive, Optional, ViewChild } from '@angular/core';
import { FieldType as CoreFieldType } from '@ngx-formly/core';
import * as i0 from "@angular/core";
export class FieldType extends CoreFieldType {
    constructor(hostContainerRef) {
        super();
        this.hostContainerRef = hostContainerRef;
    }
    set content(templateRef) {
        if (templateRef && this.hostContainerRef) {
            this.hostContainerRef.createEmbeddedView(templateRef);
        }
    }
}
FieldType.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldType, deps: [{ token: i0.ViewContainerRef, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
FieldType.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FieldType, viewQueries: [{ propertyName: "content", first: true, predicate: ["fieldTypeTemplate"], descendants: true, static: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldType, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { content: [{
                type: ViewChild,
                args: ['fieldTypeTemplate', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9ib290c3RyYXAvZm9ybS1maWVsZC9zcmMvZmllbGQudHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBZSxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxTQUFTLElBQUksYUFBYSxFQUFxQixNQUFNLGtCQUFrQixDQUFDOztBQUdqRixNQUFNLE9BQWdCLFNBQTJELFNBQVEsYUFBZ0I7SUFPdkcsWUFBZ0MsZ0JBQW1DO1FBQ2pFLEtBQUssRUFBRSxDQUFDO1FBRHNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7SUFFbkUsQ0FBQztJQVJELElBQXNELE9BQU8sQ0FBQyxXQUE2QjtRQUN6RixJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQzs7dUdBTG1CLFNBQVM7MkZBQVQsU0FBUzs0RkFBVCxTQUFTO2tCQUQ5QixTQUFTOzswQkFRSyxRQUFROzRDQU5pQyxPQUFPO3NCQUE1RCxTQUFTO3VCQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT3B0aW9uYWwsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSBhcyBDb3JlRmllbGRUeXBlLCBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaWVsZFR5cGU8RiBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnID0gRm9ybWx5RmllbGRDb25maWc+IGV4dGVuZHMgQ29yZUZpZWxkVHlwZTxGPiB7XG4gIEBWaWV3Q2hpbGQoJ2ZpZWxkVHlwZVRlbXBsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgc2V0IGNvbnRlbnQodGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICBpZiAodGVtcGxhdGVSZWYgJiYgdGhpcy5ob3N0Q29udGFpbmVyUmVmKSB7XG4gICAgICB0aGlzLmhvc3RDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRlbXBsYXRlUmVmKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwcml2YXRlIGhvc3RDb250YWluZXJSZWY/OiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19