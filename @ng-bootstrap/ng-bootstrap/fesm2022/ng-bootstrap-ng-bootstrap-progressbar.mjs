import * as i0 from '@angular/core';
import { Service, inject, Input, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { isNumber, getValueInRange } from './_ngb-ngbootstrap-utilities.mjs';
import { PercentPipe } from '@angular/common';

/**
 * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
class NgbProgressbarConfig {
    constructor() {
        this.max = 100;
        this.animated = false;
        this.ariaLabel = 'progress bar';
        this.striped = false;
        this.showValue = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbarConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbarConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbarConfig, decorators: [{
            type: Service
        }] });

/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
class NgbProgressbar {
    /**
     * The maximal value to be displayed in the progress bar.
     *
     * Should be a positive number. Will default to 100 otherwise.
     */
    set max(max) {
        this._max = !isNumber(max) || max <= 0 ? 100 : max;
    }
    get max() {
        return this._max;
    }
    constructor() {
        this._config = inject(NgbProgressbarConfig);
        this.stacked = inject(NgbProgressbarStacked, { optional: true });
        /**
         * If `true`, the stripes on the progress bar are animated.
         *
         * Takes effect only for browsers supporting CSS3 animations, and if `striped` is `true`.
         */
        this.animated = this._config.animated;
        /**
         * The accessible progress bar name.
         *
         * @since 13.1.0
         */
        this.ariaLabel = this._config.ariaLabel;
        /**
         * If `true`, the progress bars will be displayed as striped.
         */
        this.striped = this._config.striped;
        /**
         * If `true`, the current percentage will be shown in the `xx%` format.
         */
        this.showValue = this._config.showValue;
        /**
         * Optional text variant type of the progress bar.
         *
         * Supports types based on Bootstrap background color variants, like:
         *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
         *
         * @since 5.2.0
         */
        this.textType = this._config.textType;
        /**
         * The type of the progress bar.
         *
         * Supports types based on Bootstrap background color variants, like:
         *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
         */
        this.type = this._config.type;
        /**
         * The current value for the progress bar.
         *
         * Should be in the `[0, max]` range.
         */
        this.value = 0;
        /**
         * The height of the progress bar.
         *
         * Accepts any valid CSS height values, ex. `"2rem"`
         */
        this.height = this._config.height;
        this.max = this._config.max;
    }
    getValue() {
        return getValueInRange(this.value, this.max);
    }
    getPercentValue() {
        return (100 * this.getValue()) / this.max;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbar, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbProgressbar, isStandalone: true, selector: "ngb-progressbar", inputs: { max: "max", animated: "animated", ariaLabel: "ariaLabel", striped: "striped", showValue: "showValue", textType: "textType", type: "type", value: "value", height: "height" }, host: { attributes: { "role": "progressbar", "aria-valuemin": "0" }, properties: { "attr.aria-valuenow": "getValue()", "attr.aria-valuemax": "max", "attr.aria-label": "ariaLabel", "style.width.%": "stacked ? getPercentValue() : null", "style.height": "height" }, classAttribute: "progress" }, ngImport: i0, template: `
		<div
			class="progress-bar{{ type ? (textType ? ' bg-' + type : ' text-bg-' + type) : '' }}{{
				textType ? ' text-' + textType : ''
			}}"
			[class.progress-bar-animated]="animated"
			[class.progress-bar-striped]="striped"
			[style.width.%]="!stacked ? getPercentValue() : null"
		>
			@if (showValue) {
				<span i18n="@@ngb.progressbar.value">{{ getValue() / max | percent }}</span>
			}
			<ng-content />
		</div>
	`, isInline: true, dependencies: [{ kind: "pipe", type: PercentPipe, name: "percent" }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-progressbar',
                    imports: [PercentPipe],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'progress',
                        role: 'progressbar',
                        '[attr.aria-valuenow]': 'getValue()',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-label]': 'ariaLabel',
                        '[style.width.%]': 'stacked ? getPercentValue() : null',
                        '[style.height]': 'height',
                    },
                    template: `
		<div
			class="progress-bar{{ type ? (textType ? ' bg-' + type : ' text-bg-' + type) : '' }}{{
				textType ? ' text-' + textType : ''
			}}"
			[class.progress-bar-animated]="animated"
			[class.progress-bar-striped]="striped"
			[style.width.%]="!stacked ? getPercentValue() : null"
		>
			@if (showValue) {
				<span i18n="@@ngb.progressbar.value">{{ getValue() / max | percent }}</span>
			}
			<ng-content />
		</div>
	`,
                }]
        }], ctorParameters: () => [], propDecorators: { max: [{
                type: Input
            }], animated: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], striped: [{
                type: Input
            }], showValue: [{
                type: Input
            }], textType: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], height: [{
                type: Input
            }] } });
/**
 * A directive that allow to stack progress bars.
 *
 * @since 16.0.0
 */
class NgbProgressbarStacked {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbarStacked, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.1", type: NgbProgressbarStacked, isStandalone: true, selector: "ngb-progressbar-stacked", host: { classAttribute: "progress-stacked" }, ngImport: i0, template: `<ng-content />`, isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbarStacked, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-progressbar-stacked',
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'progress-stacked',
                    },
                    template: `<ng-content />`,
                }]
        }] });

class NgbProgressbarModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbarModule, imports: [NgbProgressbar, NgbProgressbarStacked], exports: [NgbProgressbar, NgbProgressbarStacked] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbarModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbProgressbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbProgressbar, NgbProgressbarStacked],
                    exports: [NgbProgressbar, NgbProgressbarStacked],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbProgressbar, NgbProgressbarConfig, NgbProgressbarModule, NgbProgressbarStacked };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-progressbar.mjs.map
