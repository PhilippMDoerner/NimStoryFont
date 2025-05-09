import { ViewContainerRef, ViewChild, Directive } from '@angular/core';
import { FieldType } from './field.type';
import * as i0 from "@angular/core";
export class FieldWrapper extends FieldType {
    set _formlyControls(_) { }
    set _staticContent(content) {
        this.fieldComponent = content;
    }
}
FieldWrapper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldWrapper, deps: null, target: i0.ɵɵFactoryTarget.Directive });
FieldWrapper.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FieldWrapper, viewQueries: [{ propertyName: "fieldComponent", first: true, predicate: ["fieldComponent"], descendants: true, read: ViewContainerRef }, { propertyName: "_staticContent", first: true, predicate: ["fieldComponent"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldWrapper, decorators: [{
            type: Directive
        }], propDecorators: { fieldComponent: [{
                type: ViewChild,
                args: ['fieldComponent', { read: ViewContainerRef }]
            }], _staticContent: [{
                type: ViewChild,
                args: ['fieldComponent', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQud3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NyYy9saWIvdGVtcGxhdGVzL2ZpZWxkLndyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFLekMsTUFBTSxPQUFnQixZQUE4RCxTQUFRLFNBQVk7SUFDdEcsSUFBYSxlQUFlLENBQUMsQ0FBdUIsSUFBRyxDQUFDO0lBRXhELElBQTJFLGNBQWMsQ0FBQyxPQUF5QjtRQUNqSCxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztJQUNoQyxDQUFDOzswR0FMbUIsWUFBWTs4RkFBWixZQUFZLHVIQUVLLGdCQUFnQiwyR0FDaEIsZ0JBQWdCOzRGQUhqQyxZQUFZO2tCQURqQyxTQUFTOzhCQUdpRCxjQUFjO3NCQUF0RSxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFO2dCQUNvQixjQUFjO3NCQUF4RixTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmLCBWaWV3Q2hpbGQsIERpcmVjdGl2ZSwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuL2ZpZWxkLnR5cGUnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaWVsZFdyYXBwZXI8RiBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnID0gRm9ybWx5RmllbGRDb25maWc+IGV4dGVuZHMgRmllbGRUeXBlPEY+IHtcbiAgb3ZlcnJpZGUgc2V0IF9mb3JtbHlDb250cm9scyhfOiBRdWVyeUxpc3Q8TmdDb250cm9sPikge31cbiAgQFZpZXdDaGlsZCgnZmllbGRDb21wb25lbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgZmllbGRDb21wb25lbnQhOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdmaWVsZENvbXBvbmVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIHNldCBfc3RhdGljQ29udGVudChjb250ZW50OiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy5maWVsZENvbXBvbmVudCA9IGNvbnRlbnQ7XG4gIH1cbn1cbiJdfQ==