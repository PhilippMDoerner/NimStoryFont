import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NgbPopoverWindow {
    animation: boolean;
    title: string | TemplateRef<any> | null | undefined;
    id: string;
    popoverClass: string;
    context: any;
    isTitleTemplate(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPopoverWindow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbPopoverWindow, "ngb-popover-window", never, { "animation": { "alias": "animation"; "required": false; }; "title": { "alias": "title"; "required": false; }; "id": { "alias": "id"; "required": false; }; "popoverClass": { "alias": "popoverClass"; "required": false; }; "context": { "alias": "context"; "required": false; }; }, {}, never, ["*"], true, never>;
}
/**
 * A lightweight and extensible directive for fancy popover creation.
 */
export declare class NgbPopover implements OnInit, OnDestroy, OnChanges {
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
    placement: import("../util/positioning").PlacementArray;
    /**
     * Allows to change default Popper options when positioning the popover.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<import("@popperjs/core").Options>) => Partial<import("@popperjs/core").Options>;
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
