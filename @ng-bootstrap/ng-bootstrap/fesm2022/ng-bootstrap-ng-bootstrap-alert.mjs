import * as i0 from '@angular/core';
import { inject, Service, ElementRef, NgZone, EventEmitter, Output, Input, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';
import { ngbRunTransition } from './_ngb-ngbootstrap-utilities.mjs';

/**
 * A configuration service for the [NgbAlert](#/components/alert/api#NgbAlert) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all alerts used in the application.
 */
class NgbAlertConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.dismissible = true;
        this.type = 'warning';
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAlertConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbAlertConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAlertConfig, decorators: [{
            type: Service
        }] });

const ngbAlertFadingTransition = ({ classList }) => {
    classList.remove('show');
};

/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
class NgbAlert {
    constructor() {
        this._config = inject(NgbAlertConfig);
        this._elementRef = inject((ElementRef));
        this._zone = inject(NgZone);
        /**
         * If `true`, alert closing will be animated.
         *
         * Animation is triggered only when clicked on the close button (×)
         * or via the `.close()` function
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * If `true`, alert can be dismissed by the user.
         *
         * The close button (×) will be displayed and you can be notified
         * of the event with the `(closed)` output.
         */
        this.dismissible = this._config.dismissible;
        /**
         * Type of the alert.
         *
         * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
         * `'secondary'`, `'light'` and `'dark'`.
         */
        this.type = this._config.type;
        /**
         * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
         *
         * @since 8.0.0
         */
        this.closed = new EventEmitter();
    }
    /**
     * Triggers alert closing programmatically (same as clicking on the close button (×)).
     *
     * The returned observable will emit and be completed once the closing transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(closed)` output
     *
     * @since 8.0.0
     */
    close() {
        const transition = ngbRunTransition(this._zone, this._elementRef.nativeElement, ngbAlertFadingTransition, {
            animation: this.animation,
            runningTransition: 'continue',
        });
        transition.subscribe(() => this.closed.emit());
        return transition;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAlert, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbAlert, isStandalone: true, selector: "ngb-alert", inputs: { animation: "animation", dismissible: "dismissible", type: "type" }, outputs: { closed: "closed" }, host: { attributes: { "role": "alert" }, properties: { "class": "\"alert show\" + (type ? \" alert-\" + type : \"\")", "class.fade": "animation", "class.alert-dismissible": "dismissible" } }, exportAs: ["ngbAlert"], ngImport: i0, template: `
		<ng-content />
		@if (dismissible) {
			<button
				type="button"
				class="btn-close"
				aria-label="Close"
				i18n-aria-label="@@ngb.alert.close"
				(click)="close()"
			></button>
		}
	`, isInline: true, styles: ["ngb-alert{display:block}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAlert, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-alert', exportAs: 'ngbAlert', encapsulation: ViewEncapsulation.None, host: {
                        role: 'alert',
                        '[class]': '"alert show" + (type ? " alert-" + type : "")',
                        '[class.fade]': 'animation',
                        '[class.alert-dismissible]': 'dismissible',
                    }, template: `
		<ng-content />
		@if (dismissible) {
			<button
				type="button"
				class="btn-close"
				aria-label="Close"
				i18n-aria-label="@@ngb.alert.close"
				(click)="close()"
			></button>
		}
	`, styles: ["ngb-alert{display:block}\n"] }]
        }], propDecorators: { animation: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], type: [{
                type: Input
            }], closed: [{
                type: Output
            }] } });

class NgbAlertModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAlertModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbAlertModule, imports: [NgbAlert], exports: [NgbAlert] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAlertModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAlertModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbAlert],
                    exports: [NgbAlert],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbAlert, NgbAlertConfig, NgbAlertModule };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-alert.mjs.map
