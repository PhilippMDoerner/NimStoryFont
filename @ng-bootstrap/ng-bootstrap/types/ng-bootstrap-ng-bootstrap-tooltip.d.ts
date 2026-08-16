import * as i0 from '@angular/core';
import { OnInit, OnDestroy, OnChanges, EventEmitter, TemplateRef, SimpleChanges } from '@angular/core';
import * as _popperjs_core from '@popperjs/core';
import { Options } from '@popperjs/core';
import * as _ng_bootstrap_ng_bootstrap_utils from './_ngb-ngbootstrap-utilities.d';
import { PlacementArray } from './_ngb-ngbootstrap-utilities.d';

/**
 * A lightweight and extensible directive for fancy tooltip creation.
 */
declare class NgbTooltip implements OnInit, OnDestroy, OnChanges {
    static ngAcceptInputType_autoClose: boolean | string;
    private _config;
    /**
     * If `true`, tooltip opening and closing will be animated.
     *
     * @since 8.0.0
     */
    animation: boolean;
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
    autoClose: boolean | "inside" | "outside";
    /**
     * The preferred placement of the tooltip, among the [possible values](#/guides/positioning#api).
     *
     * The default order of preference is `"auto"`.
     *
     * Please see the [positioning overview](#/positioning) for more details.
     */
    placement: _ng_bootstrap_ng_bootstrap_utils.PlacementArray;
    /**
     * Allows to change default Popper options when positioning the tooltip.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<_popperjs_core.Options>) => Partial<_popperjs_core.Options>;
    /**
     * Specifies events that should trigger the tooltip.
     *
     * Supports a space separated list of event names.
     * For more details see the [triggers demo](#/components/tooltip/examples#triggers).
     */
    triggers: string;
    /**
     * A css selector or html element specifying the element the tooltip should be positioned against.
     * By default, the element `ngbTooltip` directive is applied to will be set as a target.
     *
     * @since 13.1.0
     */
    positionTarget?: string | HTMLElement;
    /**
     * A selector specifying the element the tooltip should be appended to.
     *
     * Currently only supports `"body"`.
     */
    container: string;
    /**
     * If `true`, tooltip is disabled and won't be displayed.
     *
     * @since 1.1.0
     */
    disableTooltip: boolean;
    /**
     * An optional class applied to the tooltip window element.
     *
     * @since 3.2.0
     */
    tooltipClass: string;
    /**
     * Default template context for `TemplateRef`, can be overridden with `open` method.
     *
     * @since 15.1.0
     */
    tooltipContext: any;
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
     * An event emitted when the tooltip opening animation has finished. Contains no payload.
     */
    shown: EventEmitter<any>;
    /**
     * An event emitted when the tooltip closing animation has finished. Contains no payload.
     */
    hidden: EventEmitter<any>;
    private _nativeElement;
    private _ngZone;
    private _document;
    private _changeDetector;
    private _injector;
    private _ngbTooltip;
    private _ngbTooltipWindowId;
    private _popupService;
    private _windowRef;
    private _unregisterListenersFn;
    private _positioning;
    private _afterRenderRef;
    private _mouseEnterTooltip;
    private _mouseLeaveTooltip;
    private _opening;
    private _transitioning;
    /**
     * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
     *
     * If the content if falsy, the tooltip won't open.
     */
    set ngbTooltip(value: string | TemplateRef<any> | null | undefined);
    get ngbTooltip(): string | TemplateRef<any> | null | undefined;
    /**
     * Opens the tooltip.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the tooltip template when it is created.
     */
    open(context?: any): void;
    /**
     * Closes the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    close(animation?: boolean): void;
    /**
     * Toggles the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    toggle(): void;
    /**
     * Returns `true`, if the tooltip is currently shown.
     */
    isOpen(): boolean;
    ngOnInit(): void;
    ngOnChanges({ tooltipClass }: SimpleChanges): void;
    ngOnDestroy(): void;
    private _getPositionTargetElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTooltip, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbTooltip, "[ngbTooltip]", ["ngbTooltip"], { "animation": { "alias": "animation"; "required": false; }; "autoClose": { "alias": "autoClose"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "popperOptions": { "alias": "popperOptions"; "required": false; }; "triggers": { "alias": "triggers"; "required": false; }; "positionTarget": { "alias": "positionTarget"; "required": false; }; "container": { "alias": "container"; "required": false; }; "disableTooltip": { "alias": "disableTooltip"; "required": false; }; "tooltipClass": { "alias": "tooltipClass"; "required": false; }; "tooltipContext": { "alias": "tooltipContext"; "required": false; }; "openDelay": { "alias": "openDelay"; "required": false; }; "closeDelay": { "alias": "closeDelay"; "required": false; }; "ngbTooltip": { "alias": "ngbTooltip"; "required": false; }; }, { "shown": "shown"; "hidden": "hidden"; }, never, never, true, never>;
}

/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
declare class NgbTooltipConfig {
    private _ngbConfig;
    private _animation;
    autoClose: boolean | 'inside' | 'outside';
    placement: PlacementArray;
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    triggers: string;
    container: string;
    disableTooltip: boolean;
    tooltipClass: string;
    openDelay: number;
    closeDelay: number;
    /**
     * @defaultValue `true`
     */
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTooltipConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTooltipConfig>;
}

declare class NgbTooltipModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTooltipModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbTooltipModule, never, [typeof NgbTooltip], [typeof NgbTooltip]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbTooltipModule>;
}

export { NgbTooltip, NgbTooltipConfig, NgbTooltipModule };
