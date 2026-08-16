import * as i0 from '@angular/core';
import { inject, Service, TemplateRef, Input, ViewEncapsulation, Component, EventEmitter, ElementRef, NgZone, DOCUMENT, ChangeDetectorRef, Injector, afterEveryRender, Output, Directive, NgModule } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { PopupService, ngbPositioning, ngbCompleteTransition, addPopperOffset, ngbAutoClose, listenToTriggers, isString } from './_ngb-ngbootstrap-utilities.mjs';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';
import { Subject } from 'rxjs';

/**
 * A configuration service for the [`NgbPopover`](#/components/popover/api#NgbPopover) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the popovers used in the application.
 */
class NgbPopoverConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.autoClose = true;
        this.placement = 'auto';
        this.popperOptions = (options) => options;
        this.triggers = 'click';
        this.disablePopover = false;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbPopoverConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbPopoverConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbPopoverConfig, decorators: [{
            type: Service
        }] });

let nextId = 0;
class NgbPopoverWindow {
    isTitleTemplate() {
        return this.title instanceof TemplateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbPopoverWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbPopoverWindow, isStandalone: true, selector: "ngb-popover-window", inputs: { animation: "animation", title: "title", id: "id", popoverClass: "popoverClass", context: "context", onMouseEnter: "onMouseEnter", onMouseLeave: "onMouseLeave" }, host: { attributes: { "role": "tooltip" }, listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" }, properties: { "class": "\"popover\" + (popoverClass ? \" \" + popoverClass : \"\")", "class.fade": "animation", "id": "id", "style.position": "\"absolute\"" } }, ngImport: i0, template: `
		<div class="popover-arrow" data-popper-arrow></div>
		@if (title) {
			<h3 class="popover-header">
				<ng-template #simpleTitle>{{ title }}</ng-template>
				<ng-template
					[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
					[ngTemplateOutletContext]="context"
				/>
			</h3>
		}
		<div class="popover-body">
			<ng-content />
		</div>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbPopoverWindow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-popover-window',
                    imports: [NgTemplateOutlet],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")',
                        '[class.fade]': 'animation',
                        role: 'tooltip',
                        '[id]': 'id',
                        '[style.position]': '"absolute"',
                        '(mouseenter)': 'onMouseEnter()',
                        '(mouseleave)': 'onMouseLeave()',
                    },
                    template: `
		<div class="popover-arrow" data-popper-arrow></div>
		@if (title) {
			<h3 class="popover-header">
				<ng-template #simpleTitle>{{ title }}</ng-template>
				<ng-template
					[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
					[ngTemplateOutletContext]="context"
				/>
			</h3>
		}
		<div class="popover-body">
			<ng-content />
		</div>
	`,
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], title: [{
                type: Input
            }], id: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], context: [{
                type: Input
            }], onMouseEnter: [{
                type: Input
            }], onMouseLeave: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy popover creation.
 */
class NgbPopover {
    constructor() {
        this._config = inject(NgbPopoverConfig);
        /**
         * If `true`, popover opening and closing will be animated.
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * Indicates whether the popover should be closed on `Escape` key and inside/outside clicks:
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
         * The preferred placement of the popover, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"auto"`.
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = this._config.placement;
        /**
         * Allows to change default Popper options when positioning the popover.
         * Receives current popper options and returns modified ones.
         *
         * @since 13.1.0
         */
        this.popperOptions = this._config.popperOptions;
        /**
         * Specifies events that should trigger the tooltip.
         *
         * Supports a space separated list of event names.
         * For more details see the [triggers demo](#/components/popover/examples#triggers).
         */
        this.triggers = this._config.triggers;
        /**
         * A selector specifying the element the popover should be appended to.
         *
         * Currently only supports `body`.
         */
        this.container = this._config.container;
        /**
         * If `true`, popover is disabled and won't be displayed.
         *
         * @since 1.1.0
         */
        this.disablePopover = this._config.disablePopover;
        /**
         * An optional class applied to the popover window element.
         *
         * @since 2.2.0
         */
        this.popoverClass = this._config.popoverClass;
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
         * An event emitted when the popover opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the popover closing animation has finished. Contains no payload.
         *
         * At this point popover is not in the DOM anymore.
         */
        this.hidden = new EventEmitter();
        this._nativeElement = inject(ElementRef).nativeElement;
        this._ngZone = inject(NgZone);
        this._document = inject(DOCUMENT);
        this._changeDetector = inject(ChangeDetectorRef);
        this._injector = inject(Injector);
        this._ngbPopoverWindowId = `ngb-popover-${nextId++}`;
        this._popupService = new PopupService(NgbPopoverWindow);
        this._windowRef = null;
        this._positioning = ngbPositioning();
        this._mouseEnterPopover = new Subject();
        this._mouseLeavePopover = new Subject();
        this._opening = true;
        this._transitioning = false;
    }
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     */
    open(context) {
        if (!this._opening && this._transitioning) {
            this._transitioning = false;
            ngbCompleteTransition(this._windowRef.location.nativeElement);
        }
        if (!this._windowRef && !this._isDisabled()) {
            // this type assertion is safe because otherwise _isDisabled would return true
            const { windowRef, transition$ } = this._popupService.open(this.ngbPopover, context ?? this.popoverContext, this.animation);
            this._opening = true;
            this._transitioning = true;
            this._windowRef = windowRef;
            this._windowRef.setInput('animation', this.animation);
            this._windowRef.setInput('title', this.popoverTitle);
            this._windowRef.setInput('context', context ?? this.popoverContext);
            this._windowRef.setInput('popoverClass', this.popoverClass);
            this._windowRef.setInput('id', this._ngbPopoverWindowId);
            this._windowRef.setInput('onMouseEnter', () => this._mouseEnterPopover.next());
            this._windowRef.setInput('onMouseLeave', () => this._mouseLeavePopover.next());
            this._getPositionTargetElement().setAttribute('aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.body.appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening popover from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because popover won't work inside the OnPush component.
            // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the popover from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                this._positioning.createPopper({
                    hostElement: this._getPositionTargetElement(),
                    targetElement: this._windowRef.location.nativeElement,
                    placement: this.placement,
                    baseClass: 'bs-popover',
                    updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 8])(options)),
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
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [
                this._windowRef.location.nativeElement,
            ]);
            transition$.subscribe(() => {
                if (this._transitioning) {
                    this._transitioning = false;
                    this.shown.emit();
                }
            });
        }
    }
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    close(animation = this.animation) {
        if (this._opening && this._transitioning) {
            this._transitioning = false;
            ngbCompleteTransition(this._windowRef.location.nativeElement);
        }
        if (this._windowRef) {
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
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
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
     * Returns `true`, if the popover is currently shown.
     */
    isOpen() {
        return this._windowRef != null;
    }
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay, this._mouseEnterPopover, this._mouseLeavePopover);
    }
    ngOnChanges({ ngbPopover, popoverTitle, disablePopover, popoverClass }) {
        if (popoverClass && this.isOpen()) {
            this._windowRef.setInput('popoverClass', popoverClass.currentValue);
        }
        // close popover if title and content become empty, or disablePopover set to true
        if ((ngbPopover || popoverTitle || disablePopover) && this._isDisabled()) {
            this.close();
        }
    }
    ngOnDestroy() {
        this.close(false);
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        this._unregisterListenersFn?.();
    }
    _isDisabled() {
        return this.disablePopover ? true : !this.ngbPopover && !this.popoverTitle;
    }
    _getPositionTargetElement() {
        return ((isString(this.positionTarget) ? this._document.querySelector(this.positionTarget) : this.positionTarget) ||
            this._nativeElement);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbPopover, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbPopover, isStandalone: true, selector: "[ngbPopover]", inputs: { animation: "animation", autoClose: "autoClose", ngbPopover: "ngbPopover", popoverTitle: "popoverTitle", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disablePopover: "disablePopover", popoverClass: "popoverClass", popoverContext: "popoverContext", openDelay: "openDelay", closeDelay: "closeDelay" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbPopover"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbPopover, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' }]
        }], propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], ngbPopover: [{
                type: Input
            }], popoverTitle: [{
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
            }], disablePopover: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], popoverContext: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });

class NgbPopoverModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbPopoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbPopoverModule, imports: [NgbPopover], exports: [NgbPopover] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbPopoverModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbPopoverModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbPopover],
                    exports: [NgbPopover],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbPopover, NgbPopoverConfig, NgbPopoverModule };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-popover.mjs.map
