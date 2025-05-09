/* eslint-disable @typescript-eslint/no-parameter-properties */
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, forwardRef, Inject, Input, PLATFORM_ID, InjectionToken, Optional } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getTinymce } from '../TinyMCE';
import { listenTinyMCEEvent, bindHandlers, isTextarea, mergePlugins, uuid, noop, isNullOrUndefined } from '../utils/Utils';
import { Events } from './Events';
import { ScriptLoader } from '../utils/ScriptLoader';
import * as i0 from "@angular/core";
export const TINYMCE_SCRIPT_SRC = new InjectionToken('TINYMCE_SCRIPT_SRC');
const EDITOR_COMPONENT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
};
export class EditorComponent extends Events {
    constructor(elementRef, ngZone, platformId, tinymceScriptSrc) {
        super();
        this.platformId = platformId;
        this.tinymceScriptSrc = tinymceScriptSrc;
        this.cloudChannel = '6';
        this.apiKey = 'no-api-key';
        this.id = '';
        this.modelEvents = 'change input undo redo';
        this.onTouchedCallback = noop;
        this.destroy$ = new Subject();
        this.initialise = () => {
            const finalInit = {
                ...this.init,
                selector: undefined,
                target: this._element,
                inline: this.inline,
                readonly: this.disabled,
                plugins: mergePlugins((this.init && this.init.plugins), this.plugins),
                toolbar: this.toolbar || (this.init && this.init.toolbar),
                setup: (editor) => {
                    this._editor = editor;
                    listenTinyMCEEvent(editor, 'init', this.destroy$).subscribe(() => {
                        this.initEditor(editor);
                    });
                    bindHandlers(this, editor, this.destroy$);
                    if (this.init && typeof this.init.setup === 'function') {
                        this.init.setup(editor);
                    }
                }
            };
            if (isTextarea(this._element)) {
                this._element.style.visibility = '';
            }
            this.ngZone.runOutsideAngular(() => {
                getTinymce().init(finalInit);
            });
        };
        this._elementRef = elementRef;
        this.ngZone = ngZone;
    }
    set disabled(val) {
        this._disabled = val;
        if (this._editor && this._editor.initialized) {
            if (typeof this._editor.mode?.set === 'function') {
                this._editor.mode.set(val ? 'readonly' : 'design');
            }
            else {
                this._editor.setMode(val ? 'readonly' : 'design');
            }
        }
    }
    get disabled() {
        return this._disabled;
    }
    get editor() {
        return this._editor;
    }
    writeValue(value) {
        if (this._editor && this._editor.initialized) {
            this._editor.setContent(isNullOrUndefined(value) ? '' : value);
        }
        else {
            this.initialValue = value === null ? undefined : value;
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.id = this.id || uuid('tiny-angular');
            this.inline = this.inline !== undefined ? this.inline !== false : !!(this.init?.inline);
            this.createElement();
            if (getTinymce() !== null) {
                this.initialise();
            }
            else if (this._element && this._element.ownerDocument) {
                // Caretaker note: the component might be destroyed before the script is loaded and its code is executed.
                // This will lead to runtime exceptions if `initialise` will be called when the component has been destroyed.
                ScriptLoader.load(this._element.ownerDocument, this.getScriptSrc())
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(this.initialise);
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        if (getTinymce() !== null) {
            getTinymce().remove(this._editor);
        }
    }
    createElement() {
        const tagName = typeof this.tagName === 'string' ? this.tagName : 'div';
        this._element = document.createElement(this.inline ? tagName : 'textarea');
        if (this._element) {
            if (document.getElementById(this.id)) {
                /* eslint no-console: ["error", { allow: ["warn"] }] */
                console.warn(`TinyMCE-Angular: an element with id [${this.id}] already exists. Editors with duplicate Id will not be able to mount`);
            }
            this._element.id = this.id;
            if (isTextarea(this._element)) {
                this._element.style.visibility = 'hidden';
            }
            this._elementRef.nativeElement.appendChild(this._element);
        }
    }
    getScriptSrc() {
        return isNullOrUndefined(this.tinymceScriptSrc) ?
            `https://cdn.tiny.cloud/1/${this.apiKey}/tinymce/${this.cloudChannel}/tinymce.min.js` :
            this.tinymceScriptSrc;
    }
    initEditor(editor) {
        listenTinyMCEEvent(editor, 'blur', this.destroy$).subscribe(() => {
            this.ngZone.run(() => this.onTouchedCallback());
        });
        listenTinyMCEEvent(editor, this.modelEvents, this.destroy$).subscribe(() => {
            this.ngZone.run(() => this.emitOnChange(editor));
        });
        if (typeof this.initialValue === 'string') {
            this.ngZone.run(() => {
                editor.setContent(this.initialValue);
                if (editor.getContent() !== this.initialValue) {
                    this.emitOnChange(editor);
                }
                if (this.onInitNgModel !== undefined) {
                    this.onInitNgModel.emit(editor);
                }
            });
        }
    }
    emitOnChange(editor) {
        if (this.onChangeCallback) {
            this.onChangeCallback(editor.getContent({ format: this.outputFormat }));
        }
    }
}
EditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: EditorComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: PLATFORM_ID }, { token: TINYMCE_SCRIPT_SRC, optional: true }], target: i0.ɵɵFactoryTarget.Component });
EditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.0.4", type: EditorComponent, isStandalone: true, selector: "editor", inputs: { cloudChannel: "cloudChannel", apiKey: "apiKey", init: "init", id: "id", initialValue: "initialValue", outputFormat: "outputFormat", inline: "inline", tagName: "tagName", plugins: "plugins", toolbar: "toolbar", modelEvents: "modelEvents", allowedEvents: "allowedEvents", ignoreEvents: "ignoreEvents", disabled: "disabled" }, providers: [EDITOR_COMPONENT_VALUE_ACCESSOR], usesInheritance: true, ngImport: i0, template: '<ng-template></ng-template>', isInline: true, styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.4", ngImport: i0, type: EditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'editor', template: '<ng-template></ng-template>', providers: [EDITOR_COMPONENT_VALUE_ACCESSOR], standalone: true, imports: [CommonModule, FormsModule], styles: [":host{display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [TINYMCE_SCRIPT_SRC]
                }] }]; }, propDecorators: { cloudChannel: [{
                type: Input
            }], apiKey: [{
                type: Input
            }], init: [{
                type: Input
            }], id: [{
                type: Input
            }], initialValue: [{
                type: Input
            }], outputFormat: [{
                type: Input
            }], inline: [{
                type: Input
            }], tagName: [{
                type: Input
            }], plugins: [{
                type: Input
            }], toolbar: [{
                type: Input
            }], modelEvents: [{
                type: Input
            }], allowedEvents: [{
                type: Input
            }], ignoreEvents: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RpbnltY2UtYW5ndWxhci1jb21wb25lbnQvc3JjL21haW4vdHMvZWRpdG9yL2VkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0RBQStEO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQWlCLFNBQVMsRUFBYyxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBcUIsV0FBVyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUosT0FBTyxFQUFFLFdBQVcsRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0gsT0FBTyxFQUFZLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBS3JELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLElBQUksY0FBYyxDQUFTLG9CQUFvQixDQUFDLENBQUM7QUFFbkYsTUFBTSwrQkFBK0IsR0FBRztJQUN0QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO0lBQzlDLEtBQUssRUFBRSxJQUFJO0NB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LE1BQU07MkJBQUMsV0FBVzs7MEJBQ2xCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsa0JBQWtCOzRDQWpEeEIsWUFBWTtzQkFBM0IsS0FBSztnQkFDVSxNQUFNO3NCQUFyQixLQUFLO2dCQUNVLElBQUk7c0JBQW5CLEtBQUs7Z0JBQ1UsRUFBRTtzQkFBakIsS0FBSztnQkFDVSxZQUFZO3NCQUEzQixLQUFLO2dCQUNVLFlBQVk7c0JBQTNCLEtBQUs7Z0JBQ1UsTUFBTTtzQkFBckIsS0FBSztnQkFDVSxPQUFPO3NCQUF0QixLQUFLO2dCQUNVLE9BQU87c0JBQXRCLEtBQUs7Z0JBQ1UsT0FBTztzQkFBdEIsS0FBSztnQkFDVSxXQUFXO3NCQUExQixLQUFLO2dCQUNVLGFBQWE7c0JBQTVCLEtBQUs7Z0JBQ1UsWUFBWTtzQkFBM0IsS0FBSztnQkFFSyxRQUFRO3NCQURsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXBhcmFtZXRlci1wcm9wZXJ0aWVzICovXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciwgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIFBMQVRGT1JNX0lELCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBnZXRUaW55bWNlIH0gZnJvbSAnLi4vVGlueU1DRSc7XG5pbXBvcnQgeyBsaXN0ZW5UaW55TUNFRXZlbnQsIGJpbmRIYW5kbGVycywgaXNUZXh0YXJlYSwgbWVyZ2VQbHVnaW5zLCB1dWlkLCBub29wLCBpc051bGxPclVuZGVmaW5lZCB9IGZyb20gJy4uL3V0aWxzL1V0aWxzJztcbmltcG9ydCB7IEV2ZW50T2JqLCBFdmVudHMgfSBmcm9tICcuL0V2ZW50cyc7XG5pbXBvcnQgeyBTY3JpcHRMb2FkZXIgfSBmcm9tICcuLi91dGlscy9TY3JpcHRMb2FkZXInO1xuaW1wb3J0IHsgRWRpdG9yIGFzIFRpbnlNQ0VFZGl0b3IsIFRpbnlNQ0UgfSBmcm9tICd0aW55bWNlJztcblxudHlwZSBFZGl0b3JPcHRpb25zID0gUGFyYW1ldGVyczxUaW55TUNFWydpbml0J10+WzBdO1xuXG5leHBvcnQgY29uc3QgVElOWU1DRV9TQ1JJUFRfU1JDID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ1RJTllNQ0VfU0NSSVBUX1NSQycpO1xuXG5jb25zdCBFRElUT1JfQ09NUE9ORU5UX1ZBTFVFX0FDQ0VTU09SID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRWRpdG9yQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2VkaXRvcicsXG4gIHRlbXBsYXRlOiAnPG5nLXRlbXBsYXRlPjwvbmctdGVtcGxhdGU+JyxcbiAgc3R5bGVzOiBbICc6aG9zdCB7IGRpc3BsYXk6IGJsb2NrOyB9JyBdLFxuICBwcm92aWRlcnM6IFsgRURJVE9SX0NPTVBPTkVOVF9WQUxVRV9BQ0NFU1NPUiBdLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUgXVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0b3JDb21wb25lbnQgZXh0ZW5kcyBFdmVudHMgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBwdWJsaWMgY2xvdWRDaGFubmVsID0gJzYnO1xuICBASW5wdXQoKSBwdWJsaWMgYXBpS2V5ID0gJ25vLWFwaS1rZXknO1xuICBASW5wdXQoKSBwdWJsaWMgaW5pdDogRWRpdG9yT3B0aW9ucyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIGlkID0gJyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBpbml0aWFsVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHVibGljIG91dHB1dEZvcm1hdDogJ2h0bWwnIHwgJ3RleHQnIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwdWJsaWMgaW5saW5lOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwdWJsaWMgdGFnTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwdWJsaWMgcGx1Z2luczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwdWJsaWMgdG9vbGJhcjogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIHB1YmxpYyBtb2RlbEV2ZW50cyA9ICdjaGFuZ2UgaW5wdXQgdW5kbyByZWRvJztcbiAgQElucHV0KCkgcHVibGljIGFsbG93ZWRFdmVudHM6IHN0cmluZyB8IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBwdWJsaWMgaWdub3JlRXZlbnRzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcbiAgQElucHV0KClcbiAgcHVibGljIHNldCBkaXNhYmxlZCh2YWwpIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbDtcbiAgICBpZiAodGhpcy5fZWRpdG9yICYmIHRoaXMuX2VkaXRvci5pbml0aWFsaXplZCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9lZGl0b3IubW9kZT8uc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2VkaXRvci5tb2RlLnNldCh2YWwgPyAncmVhZG9ubHknIDogJ2Rlc2lnbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yLnNldE1vZGUodmFsID8gJ3JlYWRvbmx5JyA6ICdkZXNpZ24nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZWRpdG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XG4gIH1cblxuICBwdWJsaWMgbmdab25lOiBOZ1pvbmU7XG5cbiAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjtcbiAgcHJpdmF0ZSBfZWxlbWVudDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9lZGl0b3I6IFRpbnlNQ0VFZGl0b3IgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjayA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogYW55O1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVElOWU1DRV9TQ1JJUFRfU1JDKSBwcml2YXRlIHRpbnltY2VTY3JpcHRTcmM/OiBzdHJpbmdcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgICB0aGlzLm5nWm9uZSA9IG5nWm9uZTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2VkaXRvciAmJiB0aGlzLl9lZGl0b3IuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2VkaXRvci5zZXRDb250ZW50KGlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlKSA/ICcnIDogdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRpYWxWYWx1ZSA9IHZhbHVlID09PSBudWxsID8gdW5kZWZpbmVkIDogdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5pZCA9IHRoaXMuaWQgfHwgdXVpZCgndGlueS1hbmd1bGFyJyk7XG4gICAgICB0aGlzLmlubGluZSA9IHRoaXMuaW5saW5lICE9PSB1bmRlZmluZWQgPyB0aGlzLmlubGluZSAhPT0gZmFsc2UgOiAhISh0aGlzLmluaXQ/LmlubGluZSk7XG4gICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgIGlmIChnZXRUaW55bWNlKCkgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXNlKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2VsZW1lbnQgJiYgdGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIC8vIENhcmV0YWtlciBub3RlOiB0aGUgY29tcG9uZW50IG1pZ2h0IGJlIGRlc3Ryb3llZCBiZWZvcmUgdGhlIHNjcmlwdCBpcyBsb2FkZWQgYW5kIGl0cyBjb2RlIGlzIGV4ZWN1dGVkLlxuICAgICAgICAvLyBUaGlzIHdpbGwgbGVhZCB0byBydW50aW1lIGV4Y2VwdGlvbnMgaWYgYGluaXRpYWxpc2VgIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBkZXN0cm95ZWQuXG4gICAgICAgIFNjcmlwdExvYWRlci5sb2FkKHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudCwgdGhpcy5nZXRTY3JpcHRTcmMoKSlcbiAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgICAgLnN1YnNjcmliZSh0aGlzLmluaXRpYWxpc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcblxuICAgIGlmIChnZXRUaW55bWNlKCkgIT09IG51bGwpIHtcbiAgICAgIGdldFRpbnltY2UoKS5yZW1vdmUodGhpcy5fZWRpdG9yKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRWxlbWVudCgpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gdHlwZW9mIHRoaXMudGFnTmFtZSA9PT0gJ3N0cmluZycgPyB0aGlzLnRhZ05hbWUgOiAnZGl2JztcbiAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLmlubGluZSA/IHRhZ05hbWUgOiAndGV4dGFyZWEnKTtcbiAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpKSB7XG4gICAgICAgIC8qIGVzbGludCBuby1jb25zb2xlOiBbXCJlcnJvclwiLCB7IGFsbG93OiBbXCJ3YXJuXCJdIH1dICovXG4gICAgICAgIGNvbnNvbGUud2FybihgVGlueU1DRS1Bbmd1bGFyOiBhbiBlbGVtZW50IHdpdGggaWQgWyR7dGhpcy5pZH1dIGFscmVhZHkgZXhpc3RzLiBFZGl0b3JzIHdpdGggZHVwbGljYXRlIElkIHdpbGwgbm90IGJlIGFibGUgdG8gbW91bnRgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2VsZW1lbnQuaWQgPSB0aGlzLmlkO1xuICAgICAgaWYgKGlzVGV4dGFyZWEodGhpcy5fZWxlbWVudCkpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICB9XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGluaXRpYWxpc2UgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgZmluYWxJbml0OiBFZGl0b3JPcHRpb25zID0ge1xuICAgICAgLi4udGhpcy5pbml0LFxuICAgICAgc2VsZWN0b3I6IHVuZGVmaW5lZCxcbiAgICAgIHRhcmdldDogdGhpcy5fZWxlbWVudCxcbiAgICAgIGlubGluZTogdGhpcy5pbmxpbmUsXG4gICAgICByZWFkb25seTogdGhpcy5kaXNhYmxlZCxcbiAgICAgIHBsdWdpbnM6IG1lcmdlUGx1Z2lucygodGhpcy5pbml0ICYmIHRoaXMuaW5pdC5wbHVnaW5zKSBhcyBzdHJpbmcsIHRoaXMucGx1Z2lucyksXG4gICAgICB0b29sYmFyOiB0aGlzLnRvb2xiYXIgfHwgKHRoaXMuaW5pdCAmJiB0aGlzLmluaXQudG9vbGJhciksXG4gICAgICBzZXR1cDogKGVkaXRvcjogVGlueU1DRUVkaXRvcikgPT4ge1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBlZGl0b3I7XG5cbiAgICAgICAgbGlzdGVuVGlueU1DRUV2ZW50KGVkaXRvciwgJ2luaXQnLCB0aGlzLmRlc3Ryb3kkKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdEVkaXRvcihlZGl0b3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICBiaW5kSGFuZGxlcnModGhpcywgZWRpdG9yLCB0aGlzLmRlc3Ryb3kkKTtcblxuICAgICAgICBpZiAodGhpcy5pbml0ICYmIHR5cGVvZiB0aGlzLmluaXQuc2V0dXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLmluaXQuc2V0dXAoZWRpdG9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoaXNUZXh0YXJlYSh0aGlzLl9lbGVtZW50KSkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZ2V0VGlueW1jZSgpLmluaXQoZmluYWxJbml0KTtcbiAgICB9KTtcbiAgfTtcblxuICBwcml2YXRlIGdldFNjcmlwdFNyYygpIHtcbiAgICByZXR1cm4gaXNOdWxsT3JVbmRlZmluZWQodGhpcy50aW55bWNlU2NyaXB0U3JjKSA/XG4gICAgICBgaHR0cHM6Ly9jZG4udGlueS5jbG91ZC8xLyR7dGhpcy5hcGlLZXl9L3RpbnltY2UvJHt0aGlzLmNsb3VkQ2hhbm5lbH0vdGlueW1jZS5taW4uanNgIDpcbiAgICAgIHRoaXMudGlueW1jZVNjcmlwdFNyYztcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEVkaXRvcihlZGl0b3I6IFRpbnlNQ0VFZGl0b3IpIHtcbiAgICBsaXN0ZW5UaW55TUNFRXZlbnQoZWRpdG9yLCAnYmx1cicsIHRoaXMuZGVzdHJveSQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpKTtcbiAgICB9KTtcblxuICAgIGxpc3RlblRpbnlNQ0VFdmVudChlZGl0b3IsIHRoaXMubW9kZWxFdmVudHMsIHRoaXMuZGVzdHJveSQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5lbWl0T25DaGFuZ2UoZWRpdG9yKSk7XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuaW5pdGlhbFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgZWRpdG9yLnNldENvbnRlbnQodGhpcy5pbml0aWFsVmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgICAgaWYgKGVkaXRvci5nZXRDb250ZW50KCkgIT09IHRoaXMuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5lbWl0T25DaGFuZ2UoZWRpdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkluaXROZ01vZGVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLm9uSW5pdE5nTW9kZWwuZW1pdChlZGl0b3IgYXMgdW5rbm93biBhcyBFdmVudE9iajxhbnk+KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0T25DaGFuZ2UoZWRpdG9yOiBUaW55TUNFRWRpdG9yKSB7XG4gICAgaWYgKHRoaXMub25DaGFuZ2VDYWxsYmFjaykge1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGVkaXRvci5nZXRDb250ZW50KHsgZm9ybWF0OiB0aGlzLm91dHB1dEZvcm1hdCB9KSk7XG4gICAgfVxuICB9XG59XG4iXX0=