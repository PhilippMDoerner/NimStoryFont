import * as i0 from '@angular/core';
import { OnInit, OnDestroy, OnChanges, TemplateRef, EventEmitter, SimpleChanges } from '@angular/core';
import * as _popperjs_core from '@popperjs/core';
import { Options } from '@popperjs/core';
import * as _ng_bootstrap_ng_bootstrap_utils from './_ngb-ngbootstrap-utilities.d';
import { PlacementArray } from './_ngb-ngbootstrap-utilities.d';

/**
 * A lightweight and extensible directive for fancy popover creation.
 */
declare class NgbPopover implements OnInit, OnDestroy, OnChanges {
    static ngAcceptInputType_autoClose: boolean | string;
    private _config;
    /**
     * If `true`, popover opening and closing will be animated.
     *
     * @since 8.0.0
     */
    animation: boolean;
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
    autoClose: boolean | "inside" | "outside";
    /**
     * The string content or a `TemplateRef` for the content to be displayed in the popover.
     *
     * If the title and the content are falsy, the popover won't open.
     */
    ngbPopover: string | TemplateRef<any> | null | undefined;
    /**
     * The title of the popover.
     *
     * If the title and the content are falsy, the popover won't open.
     */
    popoverTitle: string | TemplateRef<any> | null | undefined;
    /**
     * The preferred placement of the popover, among the [possible values](#/guides/positioning#api).
     *
     * The default order of preference is `"auto"`.
     *
     * Please see the [positioning overview](#/positioning) for more details.
     */
    placement: _ng_bootstrap_ng_bootstrap_utils.PlacementArray;
    /**
     * Allows to change default Popper options when positioning the popover.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<_popperjs_core.Options>) => Partial<_popperjs_core.Options>;
    /**
     * Specifies events that should trigger the tooltip.
     *
     * Supports a space separated list of event names.
     * For more details see the [triggers demo](#/components/popover/examples#triggers).
     */
    triggers: string;
    /**
     * A css selector or html element specifying the element the popover should be positioned against.
     * By default, the element `ngbPopover` directive is applied to will be set as a target.
     *
     * @since 13.1.0
     */
    positionTarget?: string | HTMLElement;
    /**
     * A selector specifying the element the popover should be appended to.
     *
     * Currently only supports `body`.
     */
    container: string;
    /**
     * If `true`, popover is disabled and won't be displayed.
     *
     * @since 1.1.0
     */
    disablePopover: boolean;
    /**
     * An optional class applied to the popover window element.
     *
     * @since 2.2.0
     */
    popoverClass: string;
    /**
     * Default template context for `TemplateRef`, can be overridden with `open` method.
     *
     * @since 15.1.0
     */
    popoverContext: any;
    /**
     * The opening delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
     *
     * @since 4.1.0
     */
    openDelay: number;
    /**
     * The closing delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
     *
     * @since 4.1.0
     */
    closeDelay: number;
    /**
     * An event emitted when the popover opening animation has finished. Contains no payload.
     */
    shown: EventEmitter<void>;
    /**
     * An event emitted when the popover closing animation has finished. Contains no payload.
     *
     * At this point popover is not in the DOM anymore.
     */
    hidden: EventEmitter<void>;
    private _nativeElement;
    private _ngZone;
    private _document;
    private _changeDetector;
    private _injector;
    private _ngbPopoverWindowId;
    private _popupService;
    private _windowRef;
    private _unregisterListenersFn;
    private _positioning;
    private _afterRenderRef;
    private _mouseEnterPopover;
    private _mouseLeavePopover;
    private _opening;
    private _transitioning;
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     */
    open(context?: any): void;
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    close(animation?: boolean): void;
    /**
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    toggle(): void;
    /**
     * Returns `true`, if the popover is currently shown.
     */
    isOpen(): boolean;
    ngOnInit(): void;
    ngOnChanges({ ngbPopover, popoverTitle, disablePopover, popoverClass }: SimpleChanges): void;
    ngOnDestroy(): void;
    private _isDisabled;
    private _getPositionTargetElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPopover, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPopover, "[ngbPopover]", ["ngbPopover"], { "animation": { "alias": "animation"; "required": false; }; "autoClose": { "alias": "autoClose"; "required": false; }; "ngbPopover": { "alias": "ngbPopover"; "required": false; }; "popoverTitle": { "alias": "popoverTitle"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "popperOptions": { "alias": "popperOptions"; "required": false; }; "triggers": { "alias": "triggers"; "required": false; }; "positionTarget": { "alias": "positionTarget"; "required": false; }; "container": { "alias": "container"; "required": false; }; "disablePopover": { "alias": "disablePopover"; "required": false; }; "popoverClass": { "alias": "popoverClass"; "required": false; }; "popoverContext": { "alias": "popoverContext"; "required": false; }; "openDelay": { "alias": "openDelay"; "required": false; }; "closeDelay": { "alias": "closeDelay"; "required": false; }; }, { "shown": "shown"; "hidden": "hidden"; }, never, never, true, never>;
}

/**
 * A configuration service for the [`NgbPopover`](#/components/popover/api#NgbPopover) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the popovers used in the application.
 */
declare class NgbPopoverConfig {
    private _ngbConfig;
    private _animation;
    autoClose: boolean | 'inside' | 'outside';
    placement: PlacementArray;
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    triggers: string;
    container: string;
    disablePopover: boolean;
    popoverClass: string;
    openDelay: number;
    closeDelay: number;
    /**
     * @defaultValue `true`
     */
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPopoverConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbPopoverConfig>;
}

declare class NgbPopoverModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPopoverModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbPopoverModule, never, [typeof NgbPopover], [typeof NgbPopover]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbPopoverModule>;
}

export { NgbPopover, NgbPopoverConfig, NgbPopoverModule };
