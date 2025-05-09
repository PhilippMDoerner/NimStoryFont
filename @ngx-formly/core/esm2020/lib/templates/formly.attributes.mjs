import { Directive, Input, Inject, } from '@angular/core';
import { defineHiddenProp, FORMLY_VALIDATORS, observe } from '../utils';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Allow to link the `field` HTML attributes (`id`, `name` ...) and Event attributes (`focus`, `blur` ...) to an element in the DOM.
 */
export class FormlyAttributes {
    constructor(renderer, elementRef, _document) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.uiAttributesCache = {};
        /**
         * HostBinding doesn't register listeners conditionally which may produce some perf issues.
         *
         * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1991
         */
        this.uiEvents = {
            listeners: [],
            events: ['click', 'keyup', 'keydown', 'keypress', 'focus', 'blur', 'change'],
            callback: (eventName, $event) => {
                switch (eventName) {
                    case 'focus':
                        return this.onFocus($event);
                    case 'blur':
                        return this.onBlur($event);
                    case 'change':
                        return this.onChange($event);
                    default:
                        return this.props[eventName](this.field, $event);
                }
            },
        };
        this.document = _document;
    }
    get props() {
        return this.field.props || {};
    }
    get fieldAttrElements() {
        return this.field?.['_elementRefs'] || [];
    }
    ngOnChanges(changes) {
        if (changes.field) {
            this.field.name && this.setAttribute('name', this.field.name);
            this.uiEvents.listeners.forEach((listener) => listener());
            this.uiEvents.events.forEach((eventName) => {
                if (this.props?.[eventName] || ['focus', 'blur', 'change'].indexOf(eventName) !== -1) {
                    this.uiEvents.listeners.push(this.renderer.listen(this.elementRef.nativeElement, eventName, (e) => this.uiEvents.callback(eventName, e)));
                }
            });
            if (this.props?.attributes) {
                observe(this.field, ['props', 'attributes'], ({ currentValue, previousValue }) => {
                    if (previousValue) {
                        Object.keys(previousValue).forEach((attr) => this.removeAttribute(attr));
                    }
                    if (currentValue) {
                        Object.keys(currentValue).forEach((attr) => {
                            if (currentValue[attr] != null) {
                                this.setAttribute(attr, currentValue[attr]);
                            }
                        });
                    }
                });
            }
            this.detachElementRef(changes.field.previousValue);
            this.attachElementRef(changes.field.currentValue);
            if (this.fieldAttrElements.length === 1) {
                !this.id && this.field.id && this.setAttribute('id', this.field.id);
                this.focusObserver = observe(this.field, ['focus'], ({ currentValue }) => {
                    this.toggleFocus(currentValue);
                });
            }
        }
        if (changes.id) {
            this.setAttribute('id', this.id);
        }
    }
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     */
    ngDoCheck() {
        if (!this.uiAttributes) {
            const element = this.elementRef.nativeElement;
            this.uiAttributes = [...FORMLY_VALIDATORS, 'tabindex', 'placeholder', 'readonly', 'disabled', 'step'].filter((attr) => !element.hasAttribute || !element.hasAttribute(attr));
        }
        for (let i = 0; i < this.uiAttributes.length; i++) {
            const attr = this.uiAttributes[i];
            const value = this.props[attr];
            if (this.uiAttributesCache[attr] !== value &&
                (!this.props.attributes || !this.props.attributes.hasOwnProperty(attr.toLowerCase()))) {
                this.uiAttributesCache[attr] = value;
                if (value || value === 0) {
                    this.setAttribute(attr, value === true ? attr : `${value}`);
                }
                else {
                    this.removeAttribute(attr);
                }
            }
        }
    }
    ngOnDestroy() {
        this.uiEvents.listeners.forEach((listener) => listener());
        this.detachElementRef(this.field);
        this.focusObserver?.unsubscribe();
    }
    toggleFocus(value) {
        const element = this.fieldAttrElements ? this.fieldAttrElements[0] : null;
        if (!element || !element.nativeElement.focus) {
            return;
        }
        const isFocused = !!this.document.activeElement &&
            this.fieldAttrElements.some(({ nativeElement }) => this.document.activeElement === nativeElement || nativeElement.contains(this.document.activeElement));
        if (value && !isFocused) {
            Promise.resolve().then(() => element.nativeElement.focus());
        }
        else if (!value && isFocused) {
            Promise.resolve().then(() => element.nativeElement.blur());
        }
    }
    onFocus($event) {
        this.focusObserver?.setValue(true);
        this.props.focus?.(this.field, $event);
    }
    onBlur($event) {
        this.focusObserver?.setValue(false);
        this.props.blur?.(this.field, $event);
    }
    // handle custom `change` event, for regular ones rely on DOM listener
    onHostChange($event) {
        if ($event instanceof Event) {
            return;
        }
        this.onChange($event);
    }
    onChange($event) {
        this.props.change?.(this.field, $event);
        this.field.formControl?.markAsDirty();
    }
    attachElementRef(f) {
        if (!f) {
            return;
        }
        if (f['_elementRefs']?.indexOf(this.elementRef) === -1) {
            f['_elementRefs'].push(this.elementRef);
        }
        else {
            defineHiddenProp(f, '_elementRefs', [this.elementRef]);
        }
    }
    detachElementRef(f) {
        const index = f?.['_elementRefs'] ? this.fieldAttrElements.indexOf(this.elementRef) : -1;
        if (index !== -1) {
            f['_elementRefs'].splice(index, 1);
        }
    }
    setAttribute(attr, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attr, value);
    }
    removeAttribute(attr) {
        this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
    }
}
FormlyAttributes.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyAttributes, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
FormlyAttributes.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FormlyAttributes, selector: "[formlyAttributes]", inputs: { field: ["formlyAttributes", "field"], id: "id" }, host: { listeners: { "change": "onHostChange($event)" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyAttributes, decorators: [{
            type: Directive,
            args: [{
                    selector: '[formlyAttributes]',
                    host: {
                        '(change)': 'onHostChange($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { field: [{
                type: Input,
                args: ['formlyAttributes']
            }], id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zcmMvbGliL3RlbXBsYXRlcy9mb3JtbHkuYXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFLTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBYSxNQUFNLFVBQVUsQ0FBQztBQUNuRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRTNDOztHQUVHO0FBT0gsTUFBTSxPQUFPLGdCQUFnQjtJQXdDM0IsWUFBb0IsUUFBbUIsRUFBVSxVQUFzQixFQUFvQixTQUFjO1FBQXJGLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBbEMvRCxzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFJcEM7Ozs7V0FJRztRQUNLLGFBQVEsR0FBRztZQUNqQixTQUFTLEVBQUUsRUFBZ0I7WUFDM0IsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1lBQzVFLFFBQVEsRUFBRSxDQUFDLFNBQWlCLEVBQUUsTUFBVyxFQUFFLEVBQUU7Z0JBQzNDLFFBQVEsU0FBUyxFQUFFO29CQUNqQixLQUFLLE9BQU87d0JBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixLQUFLLE1BQU07d0JBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QixLQUFLLFFBQVE7d0JBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMvQjt3QkFDRSxP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QUFDO0lBRU8sZUFBZSxDQUFDLElBQVk7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQzs7OEdBbk1VLGdCQUFnQixxRUF3Q3NELFFBQVE7a0dBeEM5RSxnQkFBZ0I7NEZBQWhCLGdCQUFnQjtrQkFONUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixJQUFJLEVBQUU7d0JBQ0osVUFBVSxFQUFFLHNCQUFzQjtxQkFDbkM7aUJBQ0Y7OzBCQXlDMkUsTUFBTTsyQkFBQyxRQUFROzRDQXRDOUQsS0FBSztzQkFBL0IsS0FBSzt1QkFBQyxrQkFBa0I7Z0JBQ2hCLEVBQUU7c0JBQVYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxuICBEb0NoZWNrLFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZywgRm9ybWx5RmllbGRDb25maWdDYWNoZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBkZWZpbmVIaWRkZW5Qcm9wLCBGT1JNTFlfVkFMSURBVE9SUywgb2JzZXJ2ZSwgSU9ic2VydmVyIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEFsbG93IHRvIGxpbmsgdGhlIGBmaWVsZGAgSFRNTCBhdHRyaWJ1dGVzIChgaWRgLCBgbmFtZWAgLi4uKSBhbmQgRXZlbnQgYXR0cmlidXRlcyAoYGZvY3VzYCwgYGJsdXJgIC4uLikgdG8gYW4gZWxlbWVudCBpbiB0aGUgRE9NLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZm9ybWx5QXR0cmlidXRlc10nLFxuICBob3N0OiB7XG4gICAgJyhjaGFuZ2UpJzogJ29uSG9zdENoYW5nZSgkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5QXR0cmlidXRlcyBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBmaWVsZCBjb25maWcuICovXG4gIEBJbnB1dCgnZm9ybWx5QXR0cmlidXRlcycpIGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZztcbiAgQElucHV0KCkgaWQ6IHN0cmluZztcblxuICBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudDtcbiAgcHJpdmF0ZSB1aUF0dHJpYnV0ZXNDYWNoZTogYW55ID0ge307XG4gIHByaXZhdGUgdWlBdHRyaWJ1dGVzOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBmb2N1c09ic2VydmVyOiBJT2JzZXJ2ZXI8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIEhvc3RCaW5kaW5nIGRvZXNuJ3QgcmVnaXN0ZXIgbGlzdGVuZXJzIGNvbmRpdGlvbmFsbHkgd2hpY2ggbWF5IHByb2R1Y2Ugc29tZSBwZXJmIGlzc3Vlcy5cbiAgICpcbiAgICogRm9ybWx5IGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vbmd4LWZvcm1seS9uZ3gtZm9ybWx5L2lzc3Vlcy8xOTkxXG4gICAqL1xuICBwcml2YXRlIHVpRXZlbnRzID0ge1xuICAgIGxpc3RlbmVyczogW10gYXMgRnVuY3Rpb25bXSxcbiAgICBldmVudHM6IFsnY2xpY2snLCAna2V5dXAnLCAna2V5ZG93bicsICdrZXlwcmVzcycsICdmb2N1cycsICdibHVyJywgJ2NoYW5nZSddLFxuICAgIGNhbGxiYWNrOiAoZXZlbnROYW1lOiBzdHJpbmcsICRldmVudDogYW55KSA9PiB7XG4gICAgICBzd2l0Y2ggKGV2ZW50TmFtZSkge1xuICAgICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgICAgcmV0dXJuIHRoaXMub25Gb2N1cygkZXZlbnQpO1xuICAgICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5vbkJsdXIoJGV2ZW50KTtcbiAgICAgICAgY2FzZSAnY2hhbmdlJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5vbkNoYW5nZSgkZXZlbnQpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzW2V2ZW50TmFtZV0odGhpcy5maWVsZCwgJGV2ZW50KTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIHByaXZhdGUgZ2V0IHByb3BzKCkge1xuICAgIHJldHVybiB0aGlzLmZpZWxkLnByb3BzIHx8ICh7fSBhcyBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlWydwcm9wcyddKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGZpZWxkQXR0ckVsZW1lbnRzKCk6IEVsZW1lbnRSZWZbXSB7XG4gICAgcmV0dXJuICh0aGlzLmZpZWxkIGFzIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpPy5bJ19lbGVtZW50UmVmcyddIHx8IFtdO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5kb2N1bWVudCA9IF9kb2N1bWVudDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5maWVsZCkge1xuICAgICAgdGhpcy5maWVsZC5uYW1lICYmIHRoaXMuc2V0QXR0cmlidXRlKCduYW1lJywgdGhpcy5maWVsZC5uYW1lKTtcbiAgICAgIHRoaXMudWlFdmVudHMubGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcigpKTtcbiAgICAgIHRoaXMudWlFdmVudHMuZXZlbnRzLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcz8uW2V2ZW50TmFtZV0gfHwgWydmb2N1cycsICdibHVyJywgJ2NoYW5nZSddLmluZGV4T2YoZXZlbnROYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLnVpRXZlbnRzLmxpc3RlbmVycy5wdXNoKFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGV2ZW50TmFtZSwgKGUpID0+IHRoaXMudWlFdmVudHMuY2FsbGJhY2soZXZlbnROYW1lLCBlKSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLnByb3BzPy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgIG9ic2VydmUodGhpcy5maWVsZCwgWydwcm9wcycsICdhdHRyaWJ1dGVzJ10sICh7IGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSB9KSA9PiB7XG4gICAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHByZXZpb3VzVmFsdWUpLmZvckVhY2goKGF0dHIpID0+IHRoaXMucmVtb3ZlQXR0cmlidXRlKGF0dHIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhjdXJyZW50VmFsdWUpLmZvckVhY2goKGF0dHIpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZVthdHRyXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXR0ciwgY3VycmVudFZhbHVlW2F0dHJdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kZXRhY2hFbGVtZW50UmVmKGNoYW5nZXMuZmllbGQucHJldmlvdXNWYWx1ZSk7XG4gICAgICB0aGlzLmF0dGFjaEVsZW1lbnRSZWYoY2hhbmdlcy5maWVsZC5jdXJyZW50VmFsdWUpO1xuICAgICAgaWYgKHRoaXMuZmllbGRBdHRyRWxlbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICF0aGlzLmlkICYmIHRoaXMuZmllbGQuaWQgJiYgdGhpcy5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5maWVsZC5pZCk7XG4gICAgICAgIHRoaXMuZm9jdXNPYnNlcnZlciA9IG9ic2VydmU8Ym9vbGVhbj4odGhpcy5maWVsZCwgWydmb2N1cyddLCAoeyBjdXJyZW50VmFsdWUgfSkgPT4ge1xuICAgICAgICAgIHRoaXMudG9nZ2xlRm9jdXMoY3VycmVudFZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXMuaWQpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBuZWVkIHRvIHJlLWV2YWx1YXRlIGFsbCB0aGUgYXR0cmlidXRlcyBvbiBldmVyeSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLCBiZWNhdXNlXG4gICAqIGJ5IHVzaW5nIGEgSG9zdEJpbmRpbmcgd2UgcnVuIGludG8gY2VydGFpbiBlZGdlIGNhc2VzLiBUaGlzIG1lYW5zIHRoYXQgd2hhdGV2ZXIgbG9naWNcbiAgICogaXMgaW4gaGVyZSBoYXMgdG8gYmUgc3VwZXIgbGVhbiBvciB3ZSByaXNrIHNlcmlvdXNseSBkYW1hZ2luZyBvciBkZXN0cm95aW5nIHRoZSBwZXJmb3JtYW5jZS5cbiAgICpcbiAgICogRm9ybWx5IGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vbmd4LWZvcm1seS9uZ3gtZm9ybWx5L2lzc3Vlcy8xMzE3XG4gICAqIE1hdGVyaWFsIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xNDAyNFxuICAgKi9cbiAgbmdEb0NoZWNrKCkge1xuICAgIGlmICghdGhpcy51aUF0dHJpYnV0ZXMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHRoaXMudWlBdHRyaWJ1dGVzID0gWy4uLkZPUk1MWV9WQUxJREFUT1JTLCAndGFiaW5kZXgnLCAncGxhY2Vob2xkZXInLCAncmVhZG9ubHknLCAnZGlzYWJsZWQnLCAnc3RlcCddLmZpbHRlcihcbiAgICAgICAgKGF0dHIpID0+ICFlbGVtZW50Lmhhc0F0dHJpYnV0ZSB8fCAhZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0ciksXG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy51aUF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLnVpQXR0cmlidXRlc1tpXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wc1thdHRyXTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy51aUF0dHJpYnV0ZXNDYWNoZVthdHRyXSAhPT0gdmFsdWUgJiZcbiAgICAgICAgKCF0aGlzLnByb3BzLmF0dHJpYnV0ZXMgfHwgIXRoaXMucHJvcHMuYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShhdHRyLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudWlBdHRyaWJ1dGVzQ2FjaGVbYXR0cl0gPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUgPT09IHRydWUgPyBhdHRyIDogYCR7dmFsdWV9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVpRXZlbnRzLmxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4gbGlzdGVuZXIoKSk7XG4gICAgdGhpcy5kZXRhY2hFbGVtZW50UmVmKHRoaXMuZmllbGQpO1xuICAgIHRoaXMuZm9jdXNPYnNlcnZlcj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHRvZ2dsZUZvY3VzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZmllbGRBdHRyRWxlbWVudHMgPyB0aGlzLmZpZWxkQXR0ckVsZW1lbnRzWzBdIDogbnVsbDtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlzRm9jdXNlZCA9XG4gICAgICAhIXRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgICAgdGhpcy5maWVsZEF0dHJFbGVtZW50cy5zb21lKFxuICAgICAgICAoeyBuYXRpdmVFbGVtZW50IH0pID0+XG4gICAgICAgICAgdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBuYXRpdmVFbGVtZW50IHx8IG5hdGl2ZUVsZW1lbnQuY29udGFpbnModGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50KSxcbiAgICAgICk7XG5cbiAgICBpZiAodmFsdWUgJiYgIWlzRm9jdXNlZCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSk7XG4gICAgfSBlbHNlIGlmICghdmFsdWUgJiYgaXNGb2N1c2VkKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IGVsZW1lbnQubmF0aXZlRWxlbWVudC5ibHVyKCkpO1xuICAgIH1cbiAgfVxuXG4gIG9uRm9jdXMoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLmZvY3VzT2JzZXJ2ZXI/LnNldFZhbHVlKHRydWUpO1xuICAgIHRoaXMucHJvcHMuZm9jdXM/Lih0aGlzLmZpZWxkLCAkZXZlbnQpO1xuICB9XG5cbiAgb25CbHVyKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5mb2N1c09ic2VydmVyPy5zZXRWYWx1ZShmYWxzZSk7XG4gICAgdGhpcy5wcm9wcy5ibHVyPy4odGhpcy5maWVsZCwgJGV2ZW50KTtcbiAgfVxuXG4gIC8vIGhhbmRsZSBjdXN0b20gYGNoYW5nZWAgZXZlbnQsIGZvciByZWd1bGFyIG9uZXMgcmVseSBvbiBET00gbGlzdGVuZXJcbiAgb25Ib3N0Q2hhbmdlKCRldmVudDogYW55KSB7XG4gICAgaWYgKCRldmVudCBpbnN0YW5jZW9mIEV2ZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vbkNoYW5nZSgkZXZlbnQpO1xuICB9XG5cbiAgb25DaGFuZ2UoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnByb3BzLmNoYW5nZT8uKHRoaXMuZmllbGQsICRldmVudCk7XG4gICAgdGhpcy5maWVsZC5mb3JtQ29udHJvbD8ubWFya0FzRGlydHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoRWxlbWVudFJlZihmOiBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKSB7XG4gICAgaWYgKCFmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGZbJ19lbGVtZW50UmVmcyddPy5pbmRleE9mKHRoaXMuZWxlbWVudFJlZikgPT09IC0xKSB7XG4gICAgICBmWydfZWxlbWVudFJlZnMnXS5wdXNoKHRoaXMuZWxlbWVudFJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmluZUhpZGRlblByb3AoZiwgJ19lbGVtZW50UmVmcycsIFt0aGlzLmVsZW1lbnRSZWZdKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGFjaEVsZW1lbnRSZWYoZjogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIGNvbnN0IGluZGV4ID0gZj8uWydfZWxlbWVudFJlZnMnXSA/IHRoaXMuZmllbGRBdHRyRWxlbWVudHMuaW5kZXhPZih0aGlzLmVsZW1lbnRSZWYpIDogLTE7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgZlsnX2VsZW1lbnRSZWZzJ10uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEF0dHJpYnV0ZShhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgYXR0ciwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVBdHRyaWJ1dGUoYXR0cjogc3RyaW5nKSB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGF0dHIpO1xuICB9XG59XG4iXX0=