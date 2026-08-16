import * as i0 from '@angular/core';
import { inject, Service, Input, ViewEncapsulation, Component, EventEmitter, ElementRef, NgZone, DOCUMENT, ChangeDetectorRef, Injector, afterEveryRender, Output, Directive, NgModule } from '@angular/core';
import { PopupService, ngbPositioning, ngbCompleteTransition, addPopperOffset, ngbAutoClose, listenToTriggers, isString } from './_ngb-ngbootstrap-utilities.mjs';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';
import { Subject } from 'rxjs';

/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
class NgbTooltipConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.autoClose = true;
        this.placement = 'auto';
        this.popperOptions = (options) => options;
        this.triggers = 'hover focus';
        this.disableTooltip = false;
        this.openDelay = 0;
        this.closeDelay = 0;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltipConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltipConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltipConfig, decorators: [{
            type: Service
        }] });

let nextId = 0;
class NgbTooltipWindow {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltipWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.1", type: NgbTooltipWindow, isStandalone: true, selector: "ngb-tooltip-window", inputs: { animation: "animation", id: "id", tooltipClass: "tooltipClass", onMouseEnter: "onMouseEnter", onMouseLeave: "onMouseLeave" }, host: { attributes: { "role": "tooltip" }, listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" }, properties: { "class": "\"tooltip\" + (tooltipClass ? \" \" + tooltipClass : \"\")", "class.fade": "animation", "id": "id" } }, ngImport: i0, template: `
		<div class="tooltip-arrow" data-popper-arrow></div>
		<div class="tooltip-inner">
			<ng-content />
		</div>
	`, isInline: true, styles: ["ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltipWindow, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-tooltip-window', encapsulation: ViewEncapsulation.None, host: {
                        '[class]': '"tooltip" + (tooltipClass ? " " + tooltipClass : "")',
                        '[class.fade]': 'animation',
                        role: 'tooltip',
                        '[id]': 'id',
                        '(mouseenter)': 'onMouseEnter()',
                        '(mouseleave)': 'onMouseLeave()',
                    }, template: `
		<div class="tooltip-arrow" data-popper-arrow></div>
		<div class="tooltip-inner">
			<ng-content />
		</div>
	`, styles: ["ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}\n"] }]
        }], propDecorators: { animation: [{
                type: Input
            }], id: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }], onMouseEnter: [{
                type: Input
            }], onMouseLeave: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy tooltip creation.
 */
class NgbTooltip {
    constructor() {
        this._config = inject(NgbTooltipConfig);
        /**
         * If `true`, tooltip opening and closing will be animated.
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * Indicates whether the tooltip should be closed on `Escape` key and inside/outside clicks:
         *
         * * `true` - closes on both outside and inside clicks as well as `Escape` presses
         * * `false` - disables the autoClose feature (NB: triggers still apply)
         * * `"inside"` - closes on inside clicks as well as Escape presses
         * * `"outside"` - closes on outside clicks (sometimes also achievable through triggers)
         * as well as `Escape` presses
         *
         * @since 3.0.0
         */
        this.autoClose = this._config.autoClose;
        /**
         * The preferred placement of the tooltip, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"auto"`.
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = this._config.placement;
        /**
         * Allows to change default Popper options when positioning the tooltip.
         * Receives current popper options and returns modified ones.
         *
         * @since 13.1.0
         */
        this.popperOptions = this._config.popperOptions;
        /**
         * Specifies events that should trigger the tooltip.
         *
         * Supports a space separated list of event names.
         * For more details see the [triggers demo](#/components/tooltip/examples#triggers).
         */
        this.triggers = this._config.triggers;
        /**
         * A selector specifying the element the tooltip should be appended to.
         *
         * Currently only supports `"body"`.
         */
        this.container = this._config.container;
        /**
         * If `true`, tooltip is disabled and won't be displayed.
         *
         * @since 1.1.0
         */
        this.disableTooltip = this._config.disableTooltip;
        /**
         * An optional class applied to the tooltip window element.
         *
         * @since 3.2.0
         */
        this.tooltipClass = this._config.tooltipClass;
        /**
         * The opening delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
         *
         * @since 4.1.0
         */
        this.openDelay = this._config.openDelay;
        /**
         * The closing delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
         *
         * @since 4.1.0
         */
        this.closeDelay = this._config.closeDelay;
        /**
         * An event emitted when the tooltip opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the tooltip closing animation has finished. Contains no payload.
         */
        this.hidden = new EventEmitter();
        this._nativeElement = inject(ElementRef).nativeElement;
        this._ngZone = inject(NgZone);
        this._document = inject(DOCUMENT);
        this._changeDetector = inject(ChangeDetectorRef);
        this._injector = inject(Injector);
        this._ngbTooltipWindowId = `ngb-tooltip-${nextId++}`;
        this._popupService = new PopupService(NgbTooltipWindow);
        this._windowRef = null;
        this._positioning = ngbPositioning();
        this._mouseEnterTooltip = new Subject();
        this._mouseLeaveTooltip = new Subject();
        this._opening = true;
        this._transitioning = false;
    }
    /**
     * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
     *
     * If the content if falsy, the tooltip won't open.
     */
    set ngbTooltip(value) {
        this._ngbTooltip = value;
        if (!value && this._windowRef) {
            this.close();
        }
    }
    get ngbTooltip() {
        return this._ngbTooltip;
    }
    /**
     * Opens the tooltip.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the tooltip template when it is created.
     */
    open(context) {
        if (!this._opening && this._transitioning) {
            this._transitioning = false;
            ngbCompleteTransition(this._windowRef.location.nativeElement);
        }
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
            const { windowRef, transition$ } = this._popupService.open(this._ngbTooltip, context ?? this.tooltipContext, this.animation);
            this._opening = true;
            this._transitioning = true;
            this._windowRef = windowRef;
            this._windowRef.setInput('animation', this.animation);
            this._windowRef.setInput('tooltipClass', this.tooltipClass);
            this._windowRef.setInput('id', this._ngbTooltipWindowId);
            this._windowRef.setInput('onMouseEnter', () => this._mouseEnterTooltip.next());
            this._windowRef.setInput('onMouseLeave', () => this._mouseLeaveTooltip.next());
            this._getPositionTargetElement().setAttribute('aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                this._document.body.appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening tooltip from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because tooltip won't work inside the OnPush component.
            // Ex. when we use expression like `{{ tooltip.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the tooltip from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                this._positioning.createPopper({
                    hostElement: this._getPositionTargetElement(),
                    targetElement: this._windowRef.location.nativeElement,
                    placement: this.placement,
                    baseClass: 'bs-tooltip',
                    updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 6])(options)),
                });
                Promise.resolve().then(() => {
                    // This update is required for correct arrow placement
                    this._positioning.update();
                });
                this._afterRenderRef = afterEveryRender({
                    mixedReadWrite: () => {
                        this._positioning.update();
                    },
                }, { injector: this._injector });
            });
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [this._windowRef.location.nativeElement], [this._nativeElement]);
            transition$.subscribe(() => {
                if (this._transitioning) {
                    this._transitioning = false;
                    this.shown.emit();
                }
            });
        }
    }
    /**
     * Closes the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    close(animation = this.animation) {
        if (this._opening && this._transitioning) {
            this._transitioning = false;
            ngbCompleteTransition(this._windowRef.location.nativeElement);
        }
        if (this._windowRef != null) {
            this._getPositionTargetElement().removeAttribute('aria-describedby');
            this._opening = false;
            this._transitioning = true;
            this._popupService.close(animation).subscribe(() => {
                this._windowRef = null;
                this._positioning.destroy();
                this._afterRenderRef?.destroy();
                if (this._transitioning) {
                    this._transitioning = false;
                    this.hidden.emit();
                }
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * Toggles the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the tooltip is currently shown.
     */
    isOpen() {
        return this._windowRef != null;
    }
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay, this._mouseEnterTooltip, this._mouseLeaveTooltip);
    }
    ngOnChanges({ tooltipClass }) {
        if (tooltipClass && this.isOpen()) {
            this._windowRef.setInput('tooltipClass', tooltipClass.currentValue);
        }
    }
    ngOnDestroy() {
        this.close(false);
        // This check is necessary because it's possible that ngOnDestroy could be invoked before ngOnInit.
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        this._unregisterListenersFn?.();
    }
    _getPositionTargetElement() {
        return ((isString(this.positionTarget) ? this._document.querySelector(this.positionTarget) : this.positionTarget) ||
            this._nativeElement);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltip, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbTooltip, isStandalone: true, selector: "[ngbTooltip]", inputs: { animation: "animation", autoClose: "autoClose", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disableTooltip: "disableTooltip", tooltipClass: "tooltipClass", tooltipContext: "tooltipContext", openDelay: "openDelay", closeDelay: "closeDelay", ngbTooltip: "ngbTooltip" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbTooltip"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltip, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' }]
        }], propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], triggers: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], container: [{
                type: Input
            }], disableTooltip: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }], tooltipContext: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], ngbTooltip: [{
                type: Input
            }] } });

class NgbTooltipModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltipModule, imports: [NgbTooltip], exports: [NgbTooltip] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltipModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbTooltip],
                    exports: [NgbTooltip],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbTooltip, NgbTooltipConfig, NgbTooltipModule };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-tooltip.mjs.map
