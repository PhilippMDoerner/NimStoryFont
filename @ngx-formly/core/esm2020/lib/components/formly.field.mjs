import { Component, Input, ViewContainerRef, ViewChild, ComponentRef, Optional, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { defineHiddenProp, observe, observeDeep, getFieldValue, assignFieldValue, isObject, markFieldForCheck, hasKey, isSignalRequired, } from '../utils';
import { isObservable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/formly.config";
import * as i2 from "./formly.template";
/**
 * The `<formly-field>` component is used to render the UI widget (layout + type) of a given `field`.
 */
export class FormlyField {
    constructor(config, renderer, _elementRef, hostContainerRef, form) {
        this.config = config;
        this.renderer = renderer;
        this._elementRef = _elementRef;
        this.hostContainerRef = hostContainerRef;
        this.form = form;
        this.hostObservers = [];
        this.componentRefs = [];
        this.hooksObservers = [];
        this.detectFieldBuild = false;
        this.valueChangesUnsubscribe = () => { };
    }
    get containerRef() {
        return this.config.extras.renderFormlyFieldElement ? this.viewContainerRef : this.hostContainerRef;
    }
    get elementRef() {
        if (this.config.extras.renderFormlyFieldElement) {
            return this._elementRef;
        }
        if (this.componentRefs?.[0] instanceof ComponentRef) {
            return this.componentRefs[0].location;
        }
        return null;
    }
    ngAfterContentInit() {
        this.triggerHook('afterContentInit');
    }
    ngAfterViewInit() {
        this.triggerHook('afterViewInit');
    }
    ngDoCheck() {
        if (this.detectFieldBuild && this.field && this.field.options) {
            this.render();
        }
    }
    ngOnInit() {
        this.triggerHook('onInit');
    }
    ngOnChanges(changes) {
        this.triggerHook('onChanges', changes);
    }
    ngOnDestroy() {
        this.resetRefs(this.field);
        this.hostObservers.forEach((hostObserver) => hostObserver.unsubscribe());
        this.hooksObservers.forEach((unsubscribe) => unsubscribe());
        this.valueChangesUnsubscribe();
        this.triggerHook('onDestroy');
    }
    renderField(containerRef, f, wrappers = []) {
        if (this.containerRef === containerRef) {
            this.resetRefs(this.field);
            this.containerRef.clear();
            wrappers = this.field?.wrappers;
        }
        if (wrappers?.length > 0) {
            const [wrapper, ...wps] = wrappers;
            const { component } = this.config.getWrapper(wrapper);
            const ref = containerRef.createComponent(component);
            this.attachComponentRef(ref, f);
            observe(ref.instance, ['fieldComponent'], ({ currentValue, previousValue, firstChange }) => {
                if (currentValue) {
                    if (previousValue && previousValue._lContainer === currentValue._lContainer) {
                        return;
                    }
                    const viewRef = previousValue ? previousValue.detach() : null;
                    if (viewRef && !viewRef.destroyed) {
                        currentValue.insert(viewRef);
                    }
                    else {
                        this.renderField(currentValue, f, wps);
                    }
                    !firstChange && ref.changeDetectorRef.detectChanges();
                }
            });
        }
        else if (f?.type) {
            const inlineType = this.form?.templates?.find((ref) => ref.name === f.type);
            let ref;
            if (inlineType) {
                ref = containerRef.createEmbeddedView(inlineType.ref, { $implicit: f });
            }
            else {
                const { component } = this.config.getType(f.type, true);
                ref = containerRef.createComponent(component);
            }
            this.attachComponentRef(ref, f);
        }
    }
    triggerHook(name, changes) {
        if (name === 'onInit' || (name === 'onChanges' && changes.field && !changes.field.firstChange)) {
            this.valueChangesUnsubscribe();
            this.valueChangesUnsubscribe = this.fieldChanges(this.field);
        }
        if (this.field?.hooks?.[name]) {
            if (!changes || changes.field) {
                const r = this.field.hooks[name](this.field);
                if (isObservable(r) && ['onInit', 'afterContentInit', 'afterViewInit'].indexOf(name) !== -1) {
                    const sub = r.subscribe();
                    this.hooksObservers.push(() => sub.unsubscribe());
                }
            }
        }
        if (name === 'onChanges' && changes.field) {
            this.resetRefs(changes.field.previousValue);
            this.render();
        }
    }
    attachComponentRef(ref, field) {
        this.componentRefs.push(ref);
        field._componentRefs.push(ref);
        if (ref instanceof ComponentRef) {
            Object.assign(ref.instance, { field });
        }
    }
    render() {
        if (!this.field) {
            return;
        }
        // require Formly build
        if (!this.field.options) {
            this.detectFieldBuild = true;
            return;
        }
        this.detectFieldBuild = false;
        this.hostObservers.forEach((hostObserver) => hostObserver.unsubscribe());
        this.hostObservers = [
            observe(this.field, ['hide'], ({ firstChange, currentValue }) => {
                const containerRef = this.containerRef;
                if (this.config.extras.lazyRender === false) {
                    firstChange && this.renderField(containerRef, this.field);
                    if (!firstChange || (firstChange && currentValue)) {
                        this.elementRef &&
                            this.renderer.setStyle(this.elementRef.nativeElement, 'display', currentValue ? 'none' : '');
                    }
                }
                else {
                    if (currentValue) {
                        containerRef.clear();
                        if (this.field.className) {
                            this.renderer.removeAttribute(this.elementRef.nativeElement, 'class');
                        }
                    }
                    else {
                        this.renderField(containerRef, this.field);
                        if (this.field.className) {
                            this.renderer.setAttribute(this.elementRef.nativeElement, 'class', this.field.className);
                        }
                    }
                }
                !firstChange && this.field.options.detectChanges(this.field);
            }),
            observe(this.field, ['className'], ({ firstChange, currentValue }) => {
                if ((!firstChange || (firstChange && currentValue)) &&
                    (!this.config.extras.lazyRender || this.field.hide !== true)) {
                    this.elementRef && this.renderer.setAttribute(this.elementRef.nativeElement, 'class', currentValue);
                }
            }),
        ];
        if (!isSignalRequired()) {
            ['touched', 'pristine', 'status'].forEach((prop) => this.hostObservers.push(observe(this.field, ['formControl', prop], ({ firstChange }) => !firstChange && markFieldForCheck(this.field))));
        }
        else if (this.field.formControl) {
            const events = this.field.formControl.events.subscribe(() => markFieldForCheck(this.field));
            this.hostObservers.push(events);
        }
    }
    resetRefs(field) {
        if (field) {
            if (field._localFields) {
                field._localFields = [];
            }
            else {
                defineHiddenProp(this.field, '_localFields', []);
            }
            if (field._componentRefs) {
                field._componentRefs = field._componentRefs.filter((ref) => this.componentRefs.indexOf(ref) === -1);
            }
            else {
                defineHiddenProp(this.field, '_componentRefs', []);
            }
        }
        this.componentRefs = [];
    }
    fieldChanges(field) {
        if (!field) {
            return () => { };
        }
        const propsObserver = observeDeep(field, ['props'], () => field.options.detectChanges(field));
        let subscribes = [
            () => {
                propsObserver();
            },
        ];
        for (const key of Object.keys(field._expressions || {})) {
            const expressionObserver = observe(field, ['_expressions', key], ({ currentValue, previousValue }) => {
                if (previousValue?.subscription) {
                    previousValue.subscription.unsubscribe();
                    previousValue.subscription = null;
                }
                if (isObservable(currentValue.value$)) {
                    currentValue.subscription = currentValue.value$.subscribe();
                }
            });
            subscribes.push(() => {
                if (field._expressions[key]?.subscription) {
                    field._expressions[key].subscription.unsubscribe();
                }
                expressionObserver.unsubscribe();
            });
        }
        for (const path of [['focus'], ['template'], ['fieldGroupClassName'], ['validation', 'show']]) {
            const fieldObserver = observe(field, path, ({ firstChange }) => !firstChange && field.options.detectChanges(field));
            subscribes.push(() => fieldObserver.unsubscribe());
        }
        if (field.formControl && !field.fieldGroup) {
            const control = field.formControl;
            let valueChanges = control.valueChanges.pipe(map((value) => {
                field.parsers?.map((parserFn) => (value = parserFn(value, field)));
                if (!Object.is(value, field.formControl.value)) {
                    field.formControl.setValue(value);
                }
                return value;
            }), distinctUntilChanged((x, y) => {
                if (x !== y || Array.isArray(x) || isObject(x)) {
                    return false;
                }
                return true;
            }));
            if (control.value !== getFieldValue(field)) {
                valueChanges = valueChanges.pipe(startWith(control.value));
            }
            const { updateOn, debounce } = field.modelOptions;
            if ((!updateOn || updateOn === 'change') && debounce?.default > 0) {
                valueChanges = control.valueChanges.pipe(debounceTime(debounce.default));
            }
            const sub = valueChanges.subscribe((value) => {
                // workaround for https://github.com/angular/angular/issues/13792
                if (control._fields?.length > 1 && control instanceof FormControl) {
                    control.patchValue(value, { emitEvent: false, onlySelf: true });
                }
                if (hasKey(field)) {
                    assignFieldValue(field, value);
                }
                field.options.fieldChanges.next({ value, field, type: 'valueChanges' });
            });
            subscribes.push(() => sub.unsubscribe());
        }
        let templateFieldsSubs = [];
        observe(field, ['_localFields'], ({ currentValue }) => {
            templateFieldsSubs.forEach((unsubscribe) => unsubscribe());
            templateFieldsSubs = (currentValue || []).map((f) => this.fieldChanges(f));
        });
        return () => {
            subscribes.forEach((unsubscribe) => unsubscribe());
            templateFieldsSubs.forEach((unsubscribe) => unsubscribe());
        };
    }
}
FormlyField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyField, deps: [{ token: i1.FormlyConfig }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i2.FormlyFieldTemplates, optional: true }], target: i0.ɵɵFactoryTarget.Component });
FormlyField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyField, selector: "formly-field", inputs: { field: "field" }, viewQueries: [{ propertyName: "viewContainerRef", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], usesOnChanges: true, ngImport: i0, template: '<ng-template #container></ng-template>', isInline: true, styles: [":host:empty{display:none}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyField, decorators: [{
            type: Component,
            args: [{ selector: 'formly-field', template: '<ng-template #container></ng-template>', styles: [":host:empty{display:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormlyConfig }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i2.FormlyFieldTemplates, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { field: [{
                type: Input
            }], viewContainerRef: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL2Zvcm1seS5maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULFlBQVksRUFXWixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzdDLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLFdBQVcsRUFDWCxhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUixpQkFBaUIsRUFDakIsTUFBTSxFQUVOLGdCQUFnQixHQUNqQixNQUFNLFVBQVUsQ0FBQztBQUdsQixPQUFPLEVBQTRCLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUdwRjs7R0FFRztBQU1ILE1BQU0sT0FBTyxXQUFXO0lBMkJ0QixZQUNVLE1BQW9CLEVBQ3BCLFFBQW1CLEVBQ25CLFdBQXVCLEVBQ3ZCLGdCQUFrQyxFQUN0QixJQUEwQjtRQUp0QyxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN0QixTQUFJLEdBQUosSUFBSSxDQUFzQjtRQTNCeEMsa0JBQWEsR0FBc0MsRUFBRSxDQUFDO1FBQ3RELGtCQUFhLEdBQTZELEVBQUUsQ0FBQztRQUM3RSxtQkFBYyxHQUFlLEVBQUUsQ0FBQztRQUNoQyxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFpQmpDLDRC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QUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxFQUFFO1lBQ1YsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNuRCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7eUdBMVVVLFdBQVc7NkZBQVgsV0FBVywwS0FHVSxnQkFBZ0IsZ0VBTnRDLHdDQUF3Qzs0RkFHdkMsV0FBVztrQkFMdkIsU0FBUzsrQkFDRSxjQUFjLFlBQ2Qsd0NBQXdDOzswQkFtQy9DLFFBQVE7NENBOUJGLEtBQUs7c0JBQWIsS0FBSztnQkFDNEQsZ0JBQWdCO3NCQUFqRixTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxuICBDb21wb25lbnRSZWYsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIERvQ2hlY2ssXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIFJlbmRlcmVyMixcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBPcHRpb25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1seUNvbmZpZyB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUsIEZvcm1seUhvb2tDb25maWcgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHtcbiAgZGVmaW5lSGlkZGVuUHJvcCxcbiAgb2JzZXJ2ZSxcbiAgb2JzZXJ2ZURlZXAsXG4gIGdldEZpZWxkVmFsdWUsXG4gIGFzc2lnbkZpZWxkVmFsdWUsXG4gIGlzT2JqZWN0LFxuICBtYXJrRmllbGRGb3JDaGVjayxcbiAgaGFzS2V5LFxuICBJT2JzZXJ2ZXIsXG4gIGlzU2lnbmFsUmVxdWlyZWQsXG59IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IEZpZWxkV3JhcHBlciB9IGZyb20gJy4uL3RlbXBsYXRlcy9maWVsZC53cmFwcGVyJztcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJy4uL3RlbXBsYXRlcy9maWVsZC50eXBlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZvcm1seUZpZWxkVGVtcGxhdGVzIH0gZnJvbSAnLi9mb3JtbHkudGVtcGxhdGUnO1xuXG4vKipcbiAqIFRoZSBgPGZvcm1seS1maWVsZD5gIGNvbXBvbmVudCBpcyB1c2VkIHRvIHJlbmRlciB0aGUgVUkgd2lkZ2V0IChsYXlvdXQgKyB0eXBlKSBvZiBhIGdpdmVuIGBmaWVsZGAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZCcsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlICNjb250YWluZXI+PC9uZy10ZW1wbGF0ZT4nLFxuICBzdHlsZVVybHM6IFsnLi9mb3JtbHkuZmllbGQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKiogVGhlIGZpZWxkIGNvbmZpZy4gKi9cbiAgQElucHV0KCkgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnO1xuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSB2aWV3Q29udGFpbmVyUmVmITogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIGhvc3RPYnNlcnZlcnM6IChJT2JzZXJ2ZXI8YW55PiB8IFN1YnNjcmlwdGlvbilbXSA9IFtdO1xuICBwcml2YXRlIGNvbXBvbmVudFJlZnM6IChDb21wb25lbnRSZWY8RmllbGRUeXBlPiB8IEVtYmVkZGVkVmlld1JlZjxGaWVsZFR5cGU+KVtdID0gW107XG4gIHByaXZhdGUgaG9va3NPYnNlcnZlcnM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBkZXRlY3RGaWVsZEJ1aWxkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBnZXQgY29udGFpbmVyUmVmKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5leHRyYXMucmVuZGVyRm9ybWx5RmllbGRFbGVtZW50ID8gdGhpcy52aWV3Q29udGFpbmVyUmVmIDogdGhpcy5ob3N0Q29udGFpbmVyUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgZWxlbWVudFJlZigpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZXh0cmFzLnJlbmRlckZvcm1seUZpZWxkRWxlbWVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWY7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbXBvbmVudFJlZnM/LlswXSBpbnN0YW5jZW9mIENvbXBvbmVudFJlZikge1xuICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50UmVmc1swXS5sb2NhdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhbHVlQ2hhbmdlc1Vuc3Vic2NyaWJlID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWc6IEZvcm1seUNvbmZpZyxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGhvc3RDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBmb3JtOiBGb3JtbHlGaWVsZFRlbXBsYXRlcyxcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLnRyaWdnZXJIb29rKCdhZnRlckNvbnRlbnRJbml0Jyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy50cmlnZ2VySG9vaygnYWZ0ZXJWaWV3SW5pdCcpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICh0aGlzLmRldGVjdEZpZWxkQnVpbGQgJiYgdGhpcy5maWVsZCAmJiB0aGlzLmZpZWxkLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50cmlnZ2VySG9vaygnb25Jbml0Jyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy50cmlnZ2VySG9vaygnb25DaGFuZ2VzJywgY2hhbmdlcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnJlc2V0UmVmcyh0aGlzLmZpZWxkKTtcbiAgICB0aGlzLmhvc3RPYnNlcnZlcnMuZm9yRWFjaCgoaG9zdE9ic2VydmVyKSA9PiBob3N0T2JzZXJ2ZXIudW5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy5ob29rc09ic2VydmVycy5mb3JFYWNoKCh1bnN1YnNjcmliZSkgPT4gdW5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy52YWx1ZUNoYW5nZXNVbnN1YnNjcmliZSgpO1xuICAgIHRoaXMudHJpZ2dlckhvb2soJ29uRGVzdHJveScpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJGaWVsZChcbiAgICBjb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgZjogRm9ybWx5RmllbGRDb25maWdDYWNoZSxcbiAgICB3cmFwcGVyczogRm9ybWx5RmllbGRDb25maWdbJ3dyYXBwZXJzJ10gPSBbXSxcbiAgKSB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyUmVmID09PSBjb250YWluZXJSZWYpIHtcbiAgICAgIHRoaXMucmVzZXRSZWZzKHRoaXMuZmllbGQpO1xuICAgICAgdGhpcy5jb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgIHdyYXBwZXJzID0gdGhpcy5maWVsZD8ud3JhcHBlcnM7XG4gICAgfVxuXG4gICAgaWYgKHdyYXBwZXJzPy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBbd3JhcHBlciwgLi4ud3BzXSA9IHdyYXBwZXJzO1xuICAgICAgY29uc3QgeyBjb21wb25lbnQgfSA9IHRoaXMuY29uZmlnLmdldFdyYXBwZXIod3JhcHBlcik7XG5cbiAgICAgIGNvbnN0IHJlZiA9IGNvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQ8RmllbGRXcmFwcGVyPihjb21wb25lbnQpO1xuICAgICAgdGhpcy5hdHRhY2hDb21wb25lbnRSZWYocmVmLCBmKTtcbiAgICAgIG9ic2VydmU8Vmlld0NvbnRhaW5lclJlZiAmIHsgX2xDb250YWluZXI6IGFueSB9PihcbiAgICAgICAgcmVmLmluc3RhbmNlLFxuICAgICAgICBbJ2ZpZWxkQ29tcG9uZW50J10sXG4gICAgICAgICh7IGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSwgZmlyc3RDaGFuZ2UgfSkgPT4ge1xuICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlICYmIHByZXZpb3VzVmFsdWUuX2xDb250YWluZXIgPT09IGN1cnJlbnRWYWx1ZS5fbENvbnRhaW5lcikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHZpZXdSZWYgPSBwcmV2aW91c1ZhbHVlID8gcHJldmlvdXNWYWx1ZS5kZXRhY2goKSA6IG51bGw7XG4gICAgICAgICAgICBpZiAodmlld1JlZiAmJiAhdmlld1JlZi5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgY3VycmVudFZhbHVlLmluc2VydCh2aWV3UmVmKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyRmllbGQoY3VycmVudFZhbHVlLCBmLCB3cHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAhZmlyc3RDaGFuZ2UgJiYgcmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoZj8udHlwZSkge1xuICAgICAgY29uc3QgaW5saW5lVHlwZSA9IHRoaXMuZm9ybT8udGVtcGxhdGVzPy5maW5kKChyZWYpID0+IHJlZi5uYW1lID09PSBmLnR5cGUpO1xuICAgICAgbGV0IHJlZjogQ29tcG9uZW50UmVmPGFueT4gfCBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICAgIGlmIChpbmxpbmVUeXBlKSB7XG4gICAgICAgIHJlZiA9IGNvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoaW5saW5lVHlwZS5yZWYsIHsgJGltcGxpY2l0OiBmIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgeyBjb21wb25lbnQgfSA9IHRoaXMuY29uZmlnLmdldFR5cGUoZi50eXBlLCB0cnVlKTtcbiAgICAgICAgcmVmID0gY29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudDxGaWVsZFdyYXBwZXI+KGNvbXBvbmVudCBhcyBhbnkpO1xuICAgICAgfVxuICAgICAgdGhpcy5hdHRhY2hDb21wb25lbnRSZWYocmVmLCBmKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHRyaWdnZXJIb29rKG5hbWU6IGtleW9mIEZvcm1seUhvb2tDb25maWcsIGNoYW5nZXM/OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKG5hbWUgPT09ICdvbkluaXQnIHx8IChuYW1lID09PSAnb25DaGFuZ2VzJyAmJiBjaGFuZ2VzLmZpZWxkICYmICFjaGFuZ2VzLmZpZWxkLmZpcnN0Q2hhbmdlKSkge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZXNVbnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZXNVbnN1YnNjcmliZSA9IHRoaXMuZmllbGRDaGFuZ2VzKHRoaXMuZmllbGQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZpZWxkPy5ob29rcz8uW25hbWVdKSB7XG4gICAgICBpZiAoIWNoYW5nZXMgfHwgY2hhbmdlcy5maWVsZCkge1xuICAgICAgICBjb25zdCByID0gdGhpcy5maWVsZC5ob29rc1tuYW1lXSh0aGlzLmZpZWxkKTtcbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZShyKSAmJiBbJ29uSW5pdCcsICdhZnRlckNvbnRlbnRJbml0JywgJ2FmdGVyVmlld0luaXQnXS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xuICAgICAgICAgIGNvbnN0IHN1YiA9IHIuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5ob29rc09ic2VydmVycy5wdXNoKCgpID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChuYW1lID09PSAnb25DaGFuZ2VzJyAmJiBjaGFuZ2VzLmZpZWxkKSB7XG4gICAgICB0aGlzLnJlc2V0UmVmcyhjaGFuZ2VzLmZpZWxkLnByZXZpb3VzVmFsdWUpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaENvbXBvbmVudFJlZjxUIGV4dGVuZHMgRmllbGRUeXBlPihcbiAgICByZWY6IENvbXBvbmVudFJlZjxUPiB8IEVtYmVkZGVkVmlld1JlZjxUPixcbiAgICBmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSxcbiAgKSB7XG4gICAgdGhpcy5jb21wb25lbnRSZWZzLnB1c2gocmVmKTtcbiAgICBmaWVsZC5fY29tcG9uZW50UmVmcy5wdXNoKHJlZik7XG4gICAgaWYgKHJlZiBpbnN0YW5jZW9mIENvbXBvbmVudFJlZikge1xuICAgICAgT2JqZWN0LmFzc2lnbihyZWYuaW5zdGFuY2UsIHsgZmllbGQgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLmZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gcmVxdWlyZSBGb3JtbHkgYnVpbGRcbiAgICBpZiAoIXRoaXMuZmllbGQub3B0aW9ucykge1xuICAgICAgdGhpcy5kZXRlY3RGaWVsZEJ1aWxkID0gdHJ1ZTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGV0ZWN0RmllbGRCdWlsZCA9IGZhbHNlO1xuICAgIHRoaXMuaG9zdE9ic2VydmVycy5mb3JFYWNoKChob3N0T2JzZXJ2ZXIpID0+IGhvc3RPYnNlcnZlci51bnN1YnNjcmliZSgpKTtcbiAgICB0aGlzLmhvc3RPYnNlcnZlcnMgPSBbXG4gICAgICBvYnNlcnZlPGJvb2xlYW4+KHRoaXMuZmllbGQsIFsnaGlkZSddLCAoeyBmaXJzdENoYW5nZSwgY3VycmVudFZhbHVlIH0pID0+IHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVmID0gdGhpcy5jb250YWluZXJSZWY7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5leHRyYXMubGF6eVJlbmRlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBmaXJzdENoYW5nZSAmJiB0aGlzLnJlbmRlckZpZWxkKGNvbnRhaW5lclJlZiwgdGhpcy5maWVsZCk7XG4gICAgICAgICAgaWYgKCFmaXJzdENoYW5nZSB8fCAoZmlyc3RDaGFuZ2UgJiYgY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmICYmXG4gICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgY3VycmVudFZhbHVlID8gJ25vbmUnIDogJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBjb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2NsYXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyRmllbGQoY29udGFpbmVyUmVmLCB0aGlzLmZpZWxkKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpZWxkLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2NsYXNzJywgdGhpcy5maWVsZC5jbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICFmaXJzdENoYW5nZSAmJiB0aGlzLmZpZWxkLm9wdGlvbnMuZGV0ZWN0Q2hhbmdlcyh0aGlzLmZpZWxkKTtcbiAgICAgIH0pLFxuICAgICAgb2JzZXJ2ZTxzdHJpbmc+KHRoaXMuZmllbGQsIFsnY2xhc3NOYW1lJ10sICh7IGZpcnN0Q2hhbmdlLCBjdXJyZW50VmFsdWUgfSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKCFmaXJzdENoYW5nZSB8fCAoZmlyc3RDaGFuZ2UgJiYgY3VycmVudFZhbHVlKSkgJiZcbiAgICAgICAgICAoIXRoaXMuY29uZmlnLmV4dHJhcy5sYXp5UmVuZGVyIHx8IHRoaXMuZmllbGQuaGlkZSAhPT0gdHJ1ZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50UmVmICYmIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY2xhc3MnLCBjdXJyZW50VmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICBdO1xuXG4gICAgaWYgKCFpc1NpZ25hbFJlcXVpcmVkKCkpIHtcbiAgICAgIFsndG91Y2hlZCcsICdwcmlzdGluZScsICdzdGF0dXMnXS5mb3JFYWNoKChwcm9wKSA9PlxuICAgICAgICB0aGlzLmhvc3RPYnNlcnZlcnMucHVzaChcbiAgICAgICAgICBvYnNlcnZlPHN0cmluZz4oXG4gICAgICAgICAgICB0aGlzLmZpZWxkLFxuICAgICAgICAgICAgWydmb3JtQ29udHJvbCcsIHByb3BdLFxuICAgICAgICAgICAgKHsgZmlyc3RDaGFuZ2UgfSkgPT4gIWZpcnN0Q2hhbmdlICYmIG1hcmtGaWVsZEZvckNoZWNrKHRoaXMuZmllbGQpLFxuICAgICAgICAgICksXG4gICAgICAgICksXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZC5mb3JtQ29udHJvbCkge1xuICAgICAgY29uc3QgZXZlbnRzID0gKCh0aGlzLmZpZWxkLmZvcm1Db250cm9sIGFzIGFueSkuZXZlbnRzIGFzIE9ic2VydmFibGU8YW55Pikuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgIG1hcmtGaWVsZEZvckNoZWNrKHRoaXMuZmllbGQpLFxuICAgICAgKTtcbiAgICAgIHRoaXMuaG9zdE9ic2VydmVycy5wdXNoKGV2ZW50cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldFJlZnMoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBpZiAoZmllbGQpIHtcbiAgICAgIGlmIChmaWVsZC5fbG9jYWxGaWVsZHMpIHtcbiAgICAgICAgZmllbGQuX2xvY2FsRmllbGRzID0gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbmVIaWRkZW5Qcm9wKHRoaXMuZmllbGQsICdfbG9jYWxGaWVsZHMnLCBbXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWVsZC5fY29tcG9uZW50UmVmcykge1xuICAgICAgICBmaWVsZC5fY29tcG9uZW50UmVmcyA9IGZpZWxkLl9jb21wb25lbnRSZWZzLmZpbHRlcigocmVmKSA9PiB0aGlzLmNvbXBvbmVudFJlZnMuaW5kZXhPZihyZWYpID09PSAtMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbmVIaWRkZW5Qcm9wKHRoaXMuZmllbGQsICdfY29tcG9uZW50UmVmcycsIFtdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvbmVudFJlZnMgPSBbXTtcbiAgfVxuXG4gIHByaXZhdGUgZmllbGRDaGFuZ2VzKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKCFmaWVsZCkge1xuICAgICAgcmV0dXJuICgpID0+IHt9O1xuICAgIH1cblxuICAgIGNvbnN0IHByb3BzT2JzZXJ2ZXIgPSBvYnNlcnZlRGVlcChmaWVsZCwgWydwcm9wcyddLCAoKSA9PiBmaWVsZC5vcHRpb25zLmRldGVjdENoYW5nZXMoZmllbGQpKTtcbiAgICBsZXQgc3Vic2NyaWJlcyA9IFtcbiAgICAgICgpID0+IHtcbiAgICAgICAgcHJvcHNPYnNlcnZlcigpO1xuICAgICAgfSxcbiAgICBdO1xuXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZmllbGQuX2V4cHJlc3Npb25zIHx8IHt9KSkge1xuICAgICAgY29uc3QgZXhwcmVzc2lvbk9ic2VydmVyID0gb2JzZXJ2ZTxGb3JtbHlGaWVsZENvbmZpZ0NhY2hlWydfZXhwcmVzc2lvbnMnXVsna2V5J10+KFxuICAgICAgICBmaWVsZCxcbiAgICAgICAgWydfZXhwcmVzc2lvbnMnLCBrZXldLFxuICAgICAgICAoeyBjdXJyZW50VmFsdWUsIHByZXZpb3VzVmFsdWUgfSkgPT4ge1xuICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlPy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHByZXZpb3VzVmFsdWUuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBwcmV2aW91c1ZhbHVlLnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc09ic2VydmFibGUoY3VycmVudFZhbHVlLnZhbHVlJCkpIHtcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZS5zdWJzY3JpcHRpb24gPSBjdXJyZW50VmFsdWUudmFsdWUkLnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICBzdWJzY3JpYmVzLnB1c2goKCkgPT4ge1xuICAgICAgICBpZiAoZmllbGQuX2V4cHJlc3Npb25zW2tleV0/LnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgIGZpZWxkLl9leHByZXNzaW9uc1trZXldLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGV4cHJlc3Npb25PYnNlcnZlci51bnN1YnNjcmliZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwYXRoIG9mIFtbJ2ZvY3VzJ10sIFsndGVtcGxhdGUnXSwgWydmaWVsZEdyb3VwQ2xhc3NOYW1lJ10sIFsndmFsaWRhdGlvbicsICdzaG93J11dKSB7XG4gICAgICBjb25zdCBmaWVsZE9ic2VydmVyID0gb2JzZXJ2ZShcbiAgICAgICAgZmllbGQsXG4gICAgICAgIHBhdGgsXG4gICAgICAgICh7IGZpcnN0Q2hhbmdlIH0pID0+ICFmaXJzdENoYW5nZSAmJiBmaWVsZC5vcHRpb25zLmRldGVjdENoYW5nZXMoZmllbGQpLFxuICAgICAgKTtcbiAgICAgIHN1YnNjcmliZXMucHVzaCgoKSA9PiBmaWVsZE9ic2VydmVyLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cblxuICAgIGlmIChmaWVsZC5mb3JtQ29udHJvbCAmJiAhZmllbGQuZmllbGRHcm91cCkge1xuICAgICAgY29uc3QgY29udHJvbCA9IGZpZWxkLmZvcm1Db250cm9sO1xuICAgICAgbGV0IHZhbHVlQ2hhbmdlcyA9IGNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgIG1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgICBmaWVsZC5wYXJzZXJzPy5tYXAoKHBhcnNlckZuKSA9PiAodmFsdWUgPSAocGFyc2VyRm4gYXMgYW55KSh2YWx1ZSwgZmllbGQpKSk7XG4gICAgICAgICAgaWYgKCFPYmplY3QuaXModmFsdWUsIGZpZWxkLmZvcm1Db250cm9sLnZhbHVlKSkge1xuICAgICAgICAgICAgZmllbGQuZm9ybUNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB7XG4gICAgICAgICAgaWYgKHggIT09IHkgfHwgQXJyYXkuaXNBcnJheSh4KSB8fCBpc09iamVjdCh4KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICAgIGlmIChjb250cm9sLnZhbHVlICE9PSBnZXRGaWVsZFZhbHVlKGZpZWxkKSkge1xuICAgICAgICB2YWx1ZUNoYW5nZXMgPSB2YWx1ZUNoYW5nZXMucGlwZShzdGFydFdpdGgoY29udHJvbC52YWx1ZSkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHVwZGF0ZU9uLCBkZWJvdW5jZSB9ID0gZmllbGQubW9kZWxPcHRpb25zO1xuICAgICAgaWYgKCghdXBkYXRlT24gfHwgdXBkYXRlT24gPT09ICdjaGFuZ2UnKSAmJiBkZWJvdW5jZT8uZGVmYXVsdCA+IDApIHtcbiAgICAgICAgdmFsdWVDaGFuZ2VzID0gY29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShkZWJvdW5jZVRpbWUoZGVib3VuY2UuZGVmYXVsdCkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdWIgPSB2YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAvLyB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMzc5MlxuICAgICAgICBpZiAoY29udHJvbC5fZmllbGRzPy5sZW5ndGggPiAxICYmIGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICAgIGNvbnRyb2wucGF0Y2hWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQ6IGZhbHNlLCBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNLZXkoZmllbGQpKSB7XG4gICAgICAgICAgYXNzaWduRmllbGRWYWx1ZShmaWVsZCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkLm9wdGlvbnMuZmllbGRDaGFuZ2VzLm5leHQoeyB2YWx1ZSwgZmllbGQsIHR5cGU6ICd2YWx1ZUNoYW5nZXMnIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHN1YnNjcmliZXMucHVzaCgoKSA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxuXG4gICAgbGV0IHRlbXBsYXRlRmllbGRzU3ViczogKCgpID0+IHZvaWQpW10gPSBbXTtcbiAgICBvYnNlcnZlKGZpZWxkLCBbJ19sb2NhbEZpZWxkcyddLCAoeyBjdXJyZW50VmFsdWUgfSkgPT4ge1xuICAgICAgdGVtcGxhdGVGaWVsZHNTdWJzLmZvckVhY2goKHVuc3Vic2NyaWJlKSA9PiB1bnN1YnNjcmliZSgpKTtcbiAgICAgIHRlbXBsYXRlRmllbGRzU3VicyA9IChjdXJyZW50VmFsdWUgfHwgW10pLm1hcCgoZjogRm9ybWx5RmllbGRDb25maWdDYWNoZSkgPT4gdGhpcy5maWVsZENoYW5nZXMoZikpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHN1YnNjcmliZXMuZm9yRWFjaCgodW5zdWJzY3JpYmUpID0+IHVuc3Vic2NyaWJlKCkpO1xuICAgICAgdGVtcGxhdGVGaWVsZHNTdWJzLmZvckVhY2goKHVuc3Vic2NyaWJlKSA9PiB1bnN1YnNjcmliZSgpKTtcbiAgICB9O1xuICB9XG59XG4iXX0=