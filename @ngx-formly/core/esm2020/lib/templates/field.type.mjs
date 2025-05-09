import { Input, Directive, ViewChildren } from '@angular/core';
import { NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
export class FieldType {
    constructor() {
        this.field = {};
    }
    set _formlyControls(controls) {
        const f = this.field;
        f._localFields = controls
            .map((c) => c.control._fields || [])
            .flat()
            .filter((f) => f.formControl !== this.field.formControl);
    }
    get model() {
        return this.field.model;
    }
    get form() {
        return this.field.form;
    }
    get options() {
        return this.field.options;
    }
    get key() {
        return this.field.key;
    }
    get formControl() {
        return this.field.formControl;
    }
    get props() {
        return (this.field.props || {});
    }
    /** @deprecated Use `props` instead. */
    get to() {
        return this.props;
    }
    get showError() {
        return this.options.showError(this);
    }
    get id() {
        return this.field.id;
    }
    get formState() {
        return this.options?.formState || {};
    }
}
FieldType.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldType, deps: [], target: i0.ɵɵFactoryTarget.Directive });
FieldType.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FieldType, inputs: { field: "field" }, viewQueries: [{ propertyName: "_formlyControls", predicate: NgControl, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldType, decorators: [{
            type: Directive
        }], propDecorators: { _formlyControls: [{
                type: ViewChildren,
                args: [NgControl]
            }], field: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NyYy9saWIvdGVtcGxhdGVzL2ZpZWxkLnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQWEsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBZSxTQUFTLEVBQWEsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFlbkUsTUFBTSxPQUFnQixTQUFTO0lBRC9CO1FBVVcsVUFBSyxHQUFNLEVBQU8sQ0FBQztLQTJDN0I7SUFuREMsSUFBNkIsZUFBZSxDQUFDLFFBQThCO1FBQ3pFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUErQixDQUFDO1FBQy9DLENBQUMsQ0FBQyxZQUFZLEdBQUcsUUFBUTthQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFFLENBQUMsQ0FBQyxPQUFpRCxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDOUUsSUFBSSxFQUFFO2FBQ04sTUFBTSxDQUFDLENBQUMsQ0FBb0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFLRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBNEMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBNEIsQ0FBQztJQUM3RCxDQUFDO0lBRUQsdUNBQXVDO0lBQ3ZDLElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsSUFBSSxFQUFFO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7dUdBbkRtQixTQUFTOzJGQUFULFNBQVMsMEZBQ2YsU0FBUzs0RkFESCxTQUFTO2tCQUQ5QixTQUFTOzhCQUVxQixlQUFlO3NCQUEzQyxZQUFZO3VCQUFDLFNBQVM7Z0JBUWQsS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIERpcmVjdGl2ZSwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBOZ0NvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IEZpZWxkV3JhcHBlciB9IGZyb20gJy4vZmllbGQud3JhcHBlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmllbGRUeXBlQ29uZmlnPFQgPSBGb3JtbHlGaWVsZENvbmZpZ1sncHJvcHMnXT4gZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZzxUPiB7XG4gIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgcHJvcHM6IE5vbk51bGxhYmxlPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpZWxkR3JvdXBUeXBlQ29uZmlnPFQgPSBGb3JtbHlGaWVsZENvbmZpZ1sncHJvcHMnXT4gZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZzxUPiB7XG4gIGZvcm1Db250cm9sOiBGb3JtR3JvdXA7XG4gIHByb3BzOiBOb25OdWxsYWJsZTxUPjtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmllbGRUeXBlPEYgZXh0ZW5kcyBGb3JtbHlGaWVsZENvbmZpZyA9IEZvcm1seUZpZWxkQ29uZmlnPiB7XG4gIEBWaWV3Q2hpbGRyZW4oTmdDb250cm9sKSBzZXQgX2Zvcm1seUNvbnRyb2xzKGNvbnRyb2xzOiBRdWVyeUxpc3Q8TmdDb250cm9sPikge1xuICAgIGNvbnN0IGYgPSB0aGlzLmZpZWxkIGFzIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGU7XG4gICAgZi5fbG9jYWxGaWVsZHMgPSBjb250cm9sc1xuICAgICAgLm1hcCgoYykgPT4gKGMuY29udHJvbCBhcyBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlWydmb3JtQ29udHJvbCddKS5fZmllbGRzIHx8IFtdKVxuICAgICAgLmZsYXQoKVxuICAgICAgLmZpbHRlcigoZjogRm9ybWx5RmllbGRDb25maWcpID0+IGYuZm9ybUNvbnRyb2wgIT09IHRoaXMuZmllbGQuZm9ybUNvbnRyb2wpO1xuICB9XG5cbiAgQElucHV0KCkgZmllbGQ6IEYgPSB7fSBhcyBGO1xuICBkZWZhdWx0T3B0aW9ucz86IFBhcnRpYWw8Rj47XG5cbiAgZ2V0IG1vZGVsKCkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkLm1vZGVsO1xuICB9XG5cbiAgZ2V0IGZvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGQuZm9ybTtcbiAgfVxuXG4gIGdldCBvcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkLm9wdGlvbnM7XG4gIH1cblxuICBnZXQga2V5KCkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkLmtleTtcbiAgfVxuXG4gIGdldCBmb3JtQ29udHJvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZC5mb3JtQ29udHJvbCBhcyBOb25OdWxsYWJsZTxGWydmb3JtQ29udHJvbCddPjtcbiAgfVxuXG4gIGdldCBwcm9wcygpIHtcbiAgICByZXR1cm4gKHRoaXMuZmllbGQucHJvcHMgfHwge30pIGFzIE5vbk51bGxhYmxlPEZbJ3Byb3BzJ10+O1xuICB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIFVzZSBgcHJvcHNgIGluc3RlYWQuICovXG4gIGdldCB0bygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcztcbiAgfVxuXG4gIGdldCBzaG93RXJyb3IoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zaG93RXJyb3IodGhpcyk7XG4gIH1cblxuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZC5pZDtcbiAgfVxuXG4gIGdldCBmb3JtU3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucz8uZm9ybVN0YXRlIHx8IHt9O1xuICB9XG59XG4iXX0=