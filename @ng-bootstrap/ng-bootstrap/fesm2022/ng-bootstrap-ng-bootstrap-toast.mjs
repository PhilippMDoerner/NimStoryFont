import * as i0 from '@angular/core';
import { inject, Service, Directive, NgZone, Injector, ElementRef, EventEmitter, afterNextRender, TemplateRef, Output, ContentChild, Input, Attribute, ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';
import { reflow, ngbRunTransition } from './_ngb-ngbootstrap-utilities.mjs';
import { NgTemplateOutlet } from '@angular/common';

/**
 * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
 * and customize the values of its properties in order to provide default values for all the toasts used in the
 * application.
 *
 * @since 5.0.0
 */
class NgbToastConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.autohide = true;
        this.delay = 5000;
        this.ariaLive = 'polite';
    }
    /**
     * @defaultValue `true`
     */
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbToastConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbToastConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbToastConfig, decorators: [{
            type: Service
        }] });

const ngbToastFadeInTransition = (element, animation) => {
    const { classList } = element;
    if (animation) {
        classList.add('fade');
    }
    else {
        classList.add('show');
        return;
    }
    reflow(element);
    classList.add('show', 'showing');
    return () => {
        classList.remove('showing');
    };
};
const ngbToastFadeOutTransition = ({ classList }) => {
    classList.add('showing');
    return () => {
        classList.remove('show', 'showing');
    };
};

/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
class NgbToastHeader {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbToastHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbToastHeader, isStandalone: true, selector: "[ngbToastHeader]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbToastHeader, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbToastHeader]' }]
        }] });
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
class NgbToast {
    constructor(ariaLive) {
        this.ariaLive = ariaLive;
        this._config = inject(NgbToastConfig);
        this._zone = inject(NgZone);
        this._injector = inject(Injector);
        this._element = inject(ElementRef);
        /**
         * If `true`, toast opening and closing will be animated.
         *
         * Animation is triggered only when the `.hide()` or `.show()` functions are called
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * Delay after which the toast will hide (ms).
         * default: `500` (ms) (inherited from NgbToastConfig)
         */
        this.delay = this._config.delay;
        /**
         * Auto hide the toast after a delay in ms.
         * default: `true` (inherited from NgbToastConfig)
         */
        this.autohide = this._config.autohide;
        /**
         * A template like `<ng-template ngbToastHeader></ng-template>` can be
         * used in the projected content to allow markup usage.
         */
        this.contentHeaderTpl = null;
        /**
         * An event fired after the animation triggered by calling `.show()` method has finished.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event fired after the animation triggered by calling `.hide()` method has finished.
         *
         * It can only occur in 2 different scenarios:
         * - `autohide` timeout fires
         * - user clicks on a closing cross
         *
         * Additionally this output is purely informative. The toast won't be removed from DOM automatically, it's up
         * to the user to take care of that.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        this.ariaLive ??= this._config.ariaLive;
    }
    ngAfterContentInit() {
        afterNextRender({
            mixedReadWrite: () => {
                this._init();
                this.show();
            },
        }, { injector: this._injector });
    }
    ngOnChanges(changes) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this._init();
        }
    }
    /**
     * Triggers toast closing programmatically.
     *
     * The returned observable will emit and be completed once the closing transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(hidden)` output
     *
     * @since 8.0.0
     */
    hide() {
        this._clearTimeout();
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeOutTransition, {
            animation: this.animation,
            runningTransition: 'stop',
        });
        transition.subscribe(() => {
            this.hidden.emit();
        });
        return transition;
    }
    /**
     * Triggers toast opening programmatically.
     *
     * The returned observable will emit and be completed once the opening transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(shown)` output
     *
     * @since 8.0.0
     */
    show() {
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeInTransition, {
            animation: this.animation,
            runningTransition: 'continue',
        });
        transition.subscribe(() => {
            this.shown.emit();
        });
        return transition;
    }
    _init() {
        if (this.autohide && !this._timeoutID) {
            this._timeoutID = setTimeout(() => this.hide(), this.delay);
        }
    }
    _clearTimeout() {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbToast, deps: [{ token: 'aria-live', attribute: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbToast, isStandalone: true, selector: "ngb-toast", inputs: { animation: "animation", delay: "delay", autohide: "autohide", header: "header" }, outputs: { shown: "shown", hidden: "hidden" }, host: { attributes: { "role": "alert", "aria-atomic": "true" }, properties: { "attr.aria-live": "ariaLive", "class.fade": "animation" }, classAttribute: "toast" }, queries: [{ propertyName: "contentHeaderTpl", first: true, predicate: NgbToastHeader, descendants: true, read: TemplateRef, static: true }], exportAs: ["ngbToast"], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #headerTpl>
			<strong class="me-auto">{{ header }}</strong>
		</ng-template>
		@if (contentHeaderTpl || header) {
			<div class="toast-header">
				<ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl" />
				<button
					type="button"
					class="btn-close"
					aria-label="Close"
					i18n-aria-label="@@ngb.toast.close-aria"
					(click)="hide()"
				>
				</button>
			</div>
		}
		<div class="toast-body">
			<ng-content />
		</div>
	`, isInline: true, styles: ["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.Eager, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbToast, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-toast', exportAs: 'ngbToast', imports: [NgTemplateOutlet], encapsulation: ViewEncapsulation.None, host: {
                        role: 'alert',
                        '[attr.aria-live]': 'ariaLive',
                        'aria-atomic': 'true',
                        class: 'toast',
                        '[class.fade]': 'animation',
                    }, template: `
		<ng-template #headerTpl>
			<strong class="me-auto">{{ header }}</strong>
		</ng-template>
		@if (contentHeaderTpl || header) {
			<div class="toast-header">
				<ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl" />
				<button
					type="button"
					class="btn-close"
					aria-label="Close"
					i18n-aria-label="@@ngb.toast.close-aria"
					(click)="hide()"
				>
				</button>
			</div>
		}
		<div class="toast-body">
			<ng-content />
		</div>
	`, changeDetection: ChangeDetectionStrategy.Eager, styles: ["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['aria-live']
                }] }], propDecorators: { animation: [{
                type: Input
            }], delay: [{
                type: Input
            }], autohide: [{
                type: Input
            }], header: [{
                type: Input
            }], contentHeaderTpl: [{
                type: ContentChild,
                args: [NgbToastHeader, { read: TemplateRef, static: true }]
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });

class NgbToastModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbToastModule, imports: [NgbToast, NgbToastHeader], exports: [NgbToast, NgbToastHeader] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbToastModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbToast, NgbToastHeader],
                    exports: [NgbToast, NgbToastHeader],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbToast, NgbToastConfig, NgbToastHeader, NgbToastModule };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-toast.mjs.map
