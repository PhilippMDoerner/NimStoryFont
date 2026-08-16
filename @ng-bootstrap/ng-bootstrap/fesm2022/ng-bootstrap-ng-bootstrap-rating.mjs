import * as i0 from '@angular/core';
import { Service, inject, ChangeDetectorRef, EventEmitter, TemplateRef, forwardRef, Output, Input, ContentChild, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { getValueInRange } from './_ngb-ngbootstrap-utilities.mjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgTemplateOutlet } from '@angular/common';

/**
 * A configuration service for the [`NgbRating`](#/components/rating/api#NgbRating) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ratings used in the application.
 */
class NgbRatingConfig {
    constructor() {
        this.max = 10;
        this.readonly = false;
        this.resettable = false;
        this.tabindex = 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbRatingConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbRatingConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbRatingConfig, decorators: [{
            type: Service
        }] });

/**
 * A directive that helps visualising and interacting with a star rating bar.
 */
class NgbRating {
    constructor() {
        this.contexts = [];
        this._config = inject(NgbRatingConfig);
        this._changeDetectorRef = inject(ChangeDetectorRef);
        /**
         * If `true`, the rating can't be changed or focused.
         */
        this.disabled = false;
        /**
         * The maximal rating that can be given.
         */
        this.max = this._config.max;
        /**
         * If `true`, the rating can't be changed.
         */
        this.readonly = this._config.readonly;
        /**
         * If `true`, the rating can be reset to `0` by mouse clicking currently set rating.
         */
        this.resettable = this._config.resettable;
        /**
         * Allows setting a custom rating tabindex.
         * If the component is disabled, `tabindex` will still be set to `-1`.
         *
         * @since 13.1.0
         */
        this.tabindex = this._config.tabindex;
        /**
         * An event emitted when the user is hovering over a given rating.
         *
         * Event payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event emitted when the user stops hovering over a given rating.
         *
         * Event payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event emitted when the rating is changed.
         *
         * Event payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * Allows to provide a function to set a custom aria-valuetext
     *
     * @since 14.1.0
     */
    ariaValueText(current, max) {
        return `${current} out of ${max}`;
    }
    isInteractive() {
        return !this.readonly && !this.disabled;
    }
    enter(value) {
        if (this.isInteractive()) {
            this._updateState(value);
        }
        this.hover.emit(value);
    }
    handleBlur() {
        this.onTouched();
    }
    handleClick(value) {
        if (this.isInteractive()) {
            this.update(this.resettable && this.rate === value ? 0 : value);
        }
    }
    handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowLeft':
                this.update(this.rate - 1);
                break;
            case 'ArrowUp':
            case 'ArrowRight':
                this.update(this.rate + 1);
                break;
            case 'Home':
                this.update(0);
                break;
            case 'End':
                this.update(this.max);
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
    }
    ngOnChanges(changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
        if (changes['max']) {
            this._updateMax();
        }
    }
    ngOnInit() {
        this._setupContexts();
        this._updateState(this.rate);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    reset() {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    update(value, internalChange = true) {
        const newRate = getValueInRange(value, this.max, 0);
        if (this.isInteractive() && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    }
    writeValue(value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    }
    _updateState(nextValue) {
        this.nextRate = nextValue;
        this.contexts.forEach((context, index) => (context.fill = Math.round(getValueInRange(nextValue - index, 1, 0) * 100)));
    }
    _updateMax() {
        if (this.max > 0) {
            this._setupContexts();
            this.update(this.rate);
        }
    }
    _setupContexts() {
        this.contexts = Array.from({ length: this.max }, (v, k) => ({ fill: 0, index: k }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbRating, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbRating, isStandalone: true, selector: "ngb-rating", inputs: { disabled: "disabled", max: "max", rate: "rate", readonly: "readonly", resettable: "resettable", starTemplate: "starTemplate", tabindex: "tabindex", ariaValueText: "ariaValueText" }, outputs: { hover: "hover", leave: "leave", rateChange: "rateChange" }, host: { attributes: { "role": "slider", "aria-valuemin": "0" }, listeners: { "blur": "handleBlur()", "keydown": "handleKeyDown($event)", "mouseleave": "reset()" }, properties: { "tabindex": "disabled ? -1 : tabindex", "attr.aria-valuemax": "max", "attr.aria-valuenow": "nextRate", "attr.aria-valuetext": "ariaValueText(nextRate, max)", "attr.aria-readonly": "readonly && !disabled ? true : null", "attr.aria-disabled": "disabled ? true : null" }, classAttribute: "d-inline-flex" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRating), multi: true }], queries: [{ propertyName: "starTemplateFromContent", first: true, predicate: TemplateRef, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
		@for (_ of contexts; track _; let index = $index) {
			<span class="visually-hidden">({{ index < nextRate ? '*' : ' ' }})</span>
			<span
				(mouseenter)="enter(index + 1)"
				(click)="handleClick(index + 1)"
				[style.cursor]="isInteractive() ? 'pointer' : 'default'"
			>
				<ng-template
					[ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
					[ngTemplateOutletContext]="contexts[index]"
				/>
			</span>
		}
	`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbRating, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-rating',
                    imports: [NgTemplateOutlet],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'd-inline-flex',
                        '[tabindex]': 'disabled ? -1 : tabindex',
                        role: 'slider',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuenow]': 'nextRate',
                        '[attr.aria-valuetext]': 'ariaValueText(nextRate, max)',
                        '[attr.aria-readonly]': 'readonly && !disabled ? true : null',
                        '[attr.aria-disabled]': 'disabled ? true : null',
                        '(blur)': 'handleBlur()',
                        '(keydown)': 'handleKeyDown($event)',
                        '(mouseleave)': 'reset()',
                    },
                    template: `
		<ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
		@for (_ of contexts; track _; let index = $index) {
			<span class="visually-hidden">({{ index < nextRate ? '*' : ' ' }})</span>
			<span
				(mouseenter)="enter(index + 1)"
				(click)="handleClick(index + 1)"
				[style.cursor]="isInteractive() ? 'pointer' : 'default'"
			>
				<ng-template
					[ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
					[ngTemplateOutletContext]="contexts[index]"
				/>
			</span>
		}
	`,
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRating), multi: true }],
                }]
        }], propDecorators: { disabled: [{
                type: Input
            }], max: [{
                type: Input
            }], rate: [{
                type: Input
            }], readonly: [{
                type: Input
            }], resettable: [{
                type: Input
            }], starTemplate: [{
                type: Input
            }], starTemplateFromContent: [{
                type: ContentChild,
                args: [TemplateRef, { static: false }]
            }], tabindex: [{
                type: Input
            }], ariaValueText: [{
                type: Input
            }], hover: [{
                type: Output
            }], leave: [{
                type: Output
            }], rateChange: [{
                type: Output
            }] } });

class NgbRatingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbRatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbRatingModule, imports: [NgbRating], exports: [NgbRating] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbRatingModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbRatingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbRating],
                    exports: [NgbRating],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbRating, NgbRatingConfig, NgbRatingModule };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-rating.mjs.map
