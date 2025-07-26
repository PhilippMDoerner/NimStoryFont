import * as i0 from '@angular/core';
import { OnInit, EventEmitter, AfterContentChecked, OnDestroy, ElementRef, AfterContentInit, TemplateRef, AfterViewInit, QueryList, OnChanges, Injector, SimpleChanges, ViewRef, ComponentRef, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, OperatorFunction } from 'rxjs';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _popperjs_core from '@popperjs/core';
import { Options } from '@popperjs/core';

/**
 * A directive to provide a simple way of hiding and showing elements on the
 * page.
 */
declare class NgbCollapse implements OnInit {
    private _config;
    private _element;
    private _zone;
    /**
     * If `true`, collapse will be animated.
     *
     * Animation is triggered only when clicked on triggering element
     * or via the `.toggle()` function
     *
     * @since 8.0.0
     */
    animation: boolean;
    /**
     * Flag used to track if the collapse setter is invoked during initialization
     * or not. This distinction is made in order to avoid running the transition during initialization.
     */
    private _afterInit;
    private _isCollapsed;
    /**
     * If `true`, will collapse the element or show it otherwise.
     */
    set collapsed(isCollapsed: boolean);
    ngbCollapseChange: EventEmitter<boolean>;
    /**
     * If `true`, will collapse horizontally.
     *
     * @since 13.1.0
     */
    horizontal: boolean;
    /**
     * An event emitted when the collapse element is shown, after the transition.
     * It has no payload.
     *
     * @since 8.0.0
     */
    shown: EventEmitter<void>;
    /**
     * An event emitted when the collapse element is hidden, after the transition.
     * It has no payload.
     *
     * @since 8.0.0
     */
    hidden: EventEmitter<void>;
    ngOnInit(): void;
    /**
     * Triggers collapsing programmatically.
     *
     * If there is a collapsing transition running already, it will be reversed.
     * If the animations are turned off this happens synchronously.
     *
     * @since 8.0.0
     */
    toggle(open?: boolean): void;
    private _runTransition;
    private _runTransitionWithEvents;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCollapse, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbCollapse, "[ngbCollapse]", ["ngbCollapse"], { "animation": { "alias": "animation"; "required": false; }; "collapsed": { "alias": "ngbCollapse"; "required": false; }; "horizontal": { "alias": "horizontal"; "required": false; }; }, { "ngbCollapseChange": "ngbCollapseChange"; "shown": "shown"; "hidden": "hidden"; }, never, never, true, never>;
}

/**
 * A directive that wraps the content of an accordion item's collapsible body.
 *
 * The actual content is provided in a child `ng-template` element.
 * Depending on the state of the accordion, the template will be either inserted or removed from the DOM.
 *
 * @since 14.1.0
 */
declare class NgbAccordionBody implements AfterContentChecked, OnDestroy {
    private _item;
    private _viewRef;
    /**
     * the `ElementRef` of the component
     *
     * @since 18.0.0
     */
    readonly elementRef: ElementRef<any>;
    private _vcr;
    private _bodyTpl;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    private _destroyViewIfExists;
    private _createViewIfNotExists;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionBody, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbAccordionBody, "[ngbAccordionBody]", never, {}, {}, ["_bodyTpl"], ["*"], true, never>;
}
/**
 * A directive that wraps the collapsible item's content of the accordion.
 *
 * Internally it reuses the [`NgbCollapse` directive](#/components/collapse)
 *
 * @since 14.1.0
 */
declare class NgbAccordionCollapse {
    item: NgbAccordionItem;
    ngbCollapse: NgbCollapse;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionCollapse, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionCollapse, "[ngbAccordionCollapse]", ["ngbAccordionCollapse"], {}, {}, never, never, true, [{ directive: typeof NgbCollapse; inputs: {}; outputs: {}; }]>;
}
/**
 * A directive to put on a toggling element inside the accordion item's header.
 * It will register click handlers that toggle the associated panel and will handle accessibility attributes.
 *
 * This directive is used internally by the [`NgbAccordionButton` directive](#/components/accordion/api#NgbAccordionButton).
 *
 * @since 14.1.0
 */
declare class NgbAccordionToggle {
    item: NgbAccordionItem;
    accordion: NgbAccordionDirective;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionToggle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionToggle, "[ngbAccordionToggle]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to put on a button element inside an accordion item's header.
 *
 * If you want a custom markup for the header, you can also use the [`NgbAccordionToggle` directive](#/components/accordion/api#NgbAccordionToggle).
 *
 * @since 14.1.0
 */
declare class NgbAccordionButton {
    item: NgbAccordionItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionButton, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionButton, "button[ngbAccordionButton]", never, {}, {}, never, never, true, [{ directive: typeof NgbAccordionToggle; inputs: {}; outputs: {}; }]>;
}
/**
 * A directive that wraps an accordion item's header.
 *
 * @since 14.1.0
 */
declare class NgbAccordionHeader {
    item: NgbAccordionItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionHeader, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionHeader, "[ngbAccordionHeader]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive that wraps an accordion item: a toggleable header + body that collapses.
 *
 * You can get hold of the `NgbAccordionItem` instance in the template with `#item="ngbAccordionItem"`.
 * It allows to check if the item is collapsed or not, toggle the collapse state, etc.
 *
 * Every accordion item has a string ID that is automatically generated in the `ngb-accordion-item-XX` format, unless provided explicitly.
 *
 * @since 14.1.0
 */
declare class NgbAccordionItem implements AfterContentInit {
    private _accordion;
    private _cd;
    private _destroyRef;
    private _collapsed;
    private _id;
    private _destroyOnHide;
    private _collapseAnimationRunning;
    private _collapse;
    /**
     * Sets the custom ID of the accordion item. It must be unique for the document.
     *
     * @param id The ID of the accordion item, must be a non-empty string
     */
    set id(id: string);
    /**
     * If `true`, the content of the accordion item's body will be removed from the DOM. It will be just hidden otherwise.
     *
     * This property can also be set up on the parent [`NgbAccordion` directive](#/components/accordion/api#NgbAccordionDirective).
     */
    set destroyOnHide(destroyOnHide: boolean);
    get destroyOnHide(): boolean;
    /**
     * If `true`, the accordion item will be disabled.
     * It won't react to user's clicks, but still will be toggelable programmatically.
     */
    disabled: boolean;
    /**
     *	If `true`, the accordion item will be collapsed. Otherwise, it will be expanded.
     *
     * @param collapsed New state of the accordion item.
     */
    set collapsed(collapsed: boolean);
    /**
     * Event emitted before the expanding animation starts. It has no payload.
     *
     * @since 15.1.0
     */
    show: EventEmitter<void>;
    /**
     * Event emitted when the expanding animation is finished. It has no payload.
     */
    shown: EventEmitter<void>;
    /**
     * Event emitted before the collapsing animation starts. It has no payload.
     *
     * @since 15.1.0
     */
    hide: EventEmitter<void>;
    /**
     * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
     * It has no payload.
     */
    hidden: EventEmitter<void>;
    get collapsed(): boolean;
    get id(): string;
    get toggleId(): string;
    get collapseId(): string;
    get _shouldBeInDOM(): boolean;
    ngAfterContentInit(): void;
    /**
     * Toggles an accordion item.
     */
    toggle(): void;
    /**
     * Expands an accordion item.
     */
    expand(): void;
    /**
     * Collapses an accordion item.
     */
    collapse(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionItem, "[ngbAccordionItem]", ["ngbAccordionItem"], { "id": { "alias": "ngbAccordionItem"; "required": false; }; "destroyOnHide": { "alias": "destroyOnHide"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "collapsed": { "alias": "collapsed"; "required": false; }; }, { "show": "show"; "shown": "shown"; "hide": "hide"; "hidden": "hidden"; }, ["_collapse"], never, true, never>;
}
/**
 * Accordion is a stack of cards that have a header and collapsible body.
 *
 * This directive is a container for these items and provides an API to handle them.
 *
 * @since 14.1.0
 */
declare class NgbAccordionDirective {
    private _config;
    private _anItemWasAlreadyExpandedDuringInitialisation;
    private _items?;
    /**
     * If `true`, accordion will be animated.
     */
    animation: boolean;
    /**
     * If `true`, only one item at the time can stay open.
     */
    closeOthers: boolean;
    /**
     * If `true`, the content of the accordion items body will be removed from the DOM. It will be just hidden otherwise.
     *
     * This property can be overwritten at the [`NgbAccordionItem`](#/components/accordion/api#NgbAccordionItem) level
     */
    destroyOnHide: boolean;
    /**
     * Event emitted before expanding animation starts. The payload is the id of shown accordion item.
     *
     * @since 15.1.0
     */
    show: EventEmitter<string>;
    /**
     * Event emitted when the expanding animation is finished. The payload is the id of shown accordion item.
     */
    shown: EventEmitter<string>;
    /**
     * Event emitted before the collapsing animation starts. The payload is the id of hidden accordion item.
     *
     * @since 15.1.0
     */
    hide: EventEmitter<string>;
    /**
     * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
     * The payload is the id of hidden accordion item.
     */
    hidden: EventEmitter<string>;
    /**
     * Toggles an item with the given id.
     *
     * It will toggle an item, even if it is disabled.
     *
     * @param itemId The id of the item to toggle.
     */
    toggle(itemId: string): void;
    /**
     * Expands an item with the given id.
     *
     * If `closeOthers` is `true`, it will collapse other panels.
     *
     * @param itemId The id of the item to expand.
     */
    expand(itemId: string): void;
    /**
     * Expands all items.
     *
     * If `closeOthers` is `true` and all items are closed, it will open the first one. Otherwise, it will keep the opened one.
     */
    expandAll(): void;
    /**
     * Collapses an item with the given id.
     *
     * Has no effect if the `itemId` does not correspond to any item.
     *
     * @param itemId The id of the item to collapse.
     */
    collapse(itemId: string): void;
    /**
     * Collapses all items.
     */
    collapseAll(): void;
    /**
     * Checks if an item with the given id is expanded.
     *
     * If the `itemId` does not correspond to any item, it returns `false`.
     *
     * @param itemId The id of the item to check.
     */
    isExpanded(itemId: string): boolean;
    /**
     * It checks, if the item can be expanded in the current state of the accordion.
     * With `closeOthers` there can be only one expanded item at a time.
     *
     * @internal
     */
    _ensureCanExpand(toExpand: NgbAccordionItem): boolean;
    private _getItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionDirective, "[ngbAccordion]", ["ngbAccordion"], { "animation": { "alias": "animation"; "required": false; }; "closeOthers": { "alias": "closeOthers"; "required": false; }; "destroyOnHide": { "alias": "destroyOnHide"; "required": false; }; }, { "show": "show"; "shown": "shown"; "hide": "hide"; "hidden": "hidden"; }, ["_items"], never, true, never>;
}

/**
 * A configuration service for the [`NgbAccordionDirective`](#/components/accordion/api#NgbAccordionDirective).
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all accordions used in the application.
 */
declare class NgbAccordionConfig {
    private _ngbConfig;
    private _animation;
    closeOthers: boolean;
    destroyOnHide: boolean;
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbAccordionConfig>;
}

declare class NgbAccordionModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbAccordionModule, never, [typeof NgbAccordionButton, typeof NgbAccordionDirective, typeof NgbAccordionItem, typeof NgbAccordionHeader, typeof NgbAccordionToggle, typeof NgbAccordionBody, typeof NgbAccordionCollapse], [typeof NgbAccordionButton, typeof NgbAccordionDirective, typeof NgbAccordionItem, typeof NgbAccordionHeader, typeof NgbAccordionToggle, typeof NgbAccordionBody, typeof NgbAccordionCollapse]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbAccordionModule>;
}

/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
declare class NgbAlert {
    private _config;
    private _elementRef;
    private _zone;
    /**
     * If `true`, alert closing will be animated.
     *
     * Animation is triggered only when clicked on the close button (×)
     * or via the `.close()` function
     *
     * @since 8.0.0
     */
    animation: boolean;
    /**
     * If `true`, alert can be dismissed by the user.
     *
     * The close button (×) will be displayed and you can be notified
     * of the event with the `(closed)` output.
     */
    dismissible: boolean;
    /**
     * Type of the alert.
     *
     * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
     * `'secondary'`, `'light'` and `'dark'`.
     */
    type: string;
    /**
     * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
     *
     * @since 8.0.0
     */
    closed: EventEmitter<void>;
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
    close(): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAlert, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbAlert, "ngb-alert", ["ngbAlert"], { "animation": { "alias": "animation"; "required": false; }; "dismissible": { "alias": "dismissible"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "closed": "closed"; }, never, ["*"], true, never>;
}

/**
 * A configuration service for the [NgbAlert](#/components/alert/api#NgbAlert) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all alerts used in the application.
 */
declare class NgbAlertConfig {
    private _ngbConfig;
    private _animation;
    dismissible: boolean;
    type: string;
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAlertConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbAlertConfig>;
}

declare class NgbAlertModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAlertModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbAlertModule, never, [typeof NgbAlert], [typeof NgbAlert]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbAlertModule>;
}

/**
 * Defines the carousel slide transition direction.
 */
declare enum NgbSlideEventDirection {
    START = "start",
    END = "end"
}

/**
 * A directive that wraps the individual carousel slide.
 */
declare class NgbSlide {
    templateRef: TemplateRef<any>;
    /**
     * Slide id that must be unique for the entire document.
     *
     * If not provided, will be generated in the `ngb-slide-xx` format.
     */
    id: string;
    /**
     * An event emitted when the slide transition is finished
     *
     * @since 8.0.0
     */
    slid: EventEmitter<NgbSingleSlideEvent>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbSlide, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbSlide, "ng-template[ngbSlide]", never, { "id": { "alias": "id"; "required": false; }; }, { "slid": "slid"; }, never, never, true, never>;
}
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
declare class NgbCarousel implements AfterContentChecked, AfterContentInit, AfterViewInit {
    slides: QueryList<NgbSlide>;
    NgbSlideEventSource: typeof NgbSlideEventSource;
    private _config;
    private _platformId;
    private _ngZone;
    private _cd;
    private _container;
    private _destroyRef;
    private _injector;
    private _interval$;
    private _mouseHover$;
    private _focused$;
    private _pauseOnHover$;
    private _pauseOnFocus$;
    private _pause$;
    private _wrap$;
    id: string;
    /**
     * A flag to enable/disable the animations.
     *
     * @since 8.0.0
     */
    animation: boolean;
    /**
     * The slide id that should be displayed **initially**.
     *
     * For subsequent interactions use methods `select()`, `next()`, etc. and the `(slide)` output.
     */
    activeId: string;
    /**
     * Time in milliseconds before the next slide is shown.
     */
    set interval(value: number);
    get interval(): number;
    /**
     * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
     */
    set wrap(value: boolean);
    get wrap(): boolean;
    /**
     * If `true`, allows to interact with carousel using keyboard 'arrow left' and 'arrow right'.
     */
    keyboard: boolean;
    /**
     * If `true`, will pause slide switching when mouse cursor hovers the slide.
     *
     * @since 2.2.0
     */
    set pauseOnHover(value: boolean);
    get pauseOnHover(): boolean;
    /**
     * If `true`, will pause slide switching when the focus is inside the carousel.
     */
    set pauseOnFocus(value: boolean);
    get pauseOnFocus(): boolean;
    /**
     * If `true`, 'previous' and 'next' navigation arrows will be visible on the slide.
     *
     * @since 2.2.0
     */
    showNavigationArrows: boolean;
    /**
     * If `true`, navigation indicators at the bottom of the slide will be visible.
     *
     * @since 2.2.0
     */
    showNavigationIndicators: boolean;
    /**
     * An event emitted just before the slide transition starts.
     *
     * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
     */
    slide: EventEmitter<NgbSlideEvent>;
    /**
     * An event emitted right after the slide transition is completed.
     *
     * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
     *
     * @since 8.0.0
     */
    slid: EventEmitter<NgbSlideEvent>;
    private _transitionIds;
    set mouseHover(value: boolean);
    get mouseHover(): boolean;
    set focused(value: boolean);
    get focused(): boolean;
    arrowLeft(): void;
    arrowRight(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    /**
     * Navigates to a slide with the specified identifier.
     */
    select(slideId: string, source?: NgbSlideEventSource): void;
    /**
     * Navigates to the previous slide.
     */
    prev(source?: NgbSlideEventSource): void;
    /**
     * Navigates to the next slide.
     */
    next(source?: NgbSlideEventSource): void;
    /**
     * Pauses cycling through the slides.
     */
    pause(): void;
    /**
     * Restarts cycling through the slides from start to end.
     */
    cycle(): void;
    /**
     * Set the focus on the carousel.
     */
    focus(): void;
    private _cycleToSelected;
    private _getSlideEventDirection;
    private _getSlideById;
    private _getSlideIdxById;
    private _getNextSlide;
    private _getPrevSlide;
    private _getSlideElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCarousel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbCarousel, "ngb-carousel", ["ngbCarousel"], { "animation": { "alias": "animation"; "required": false; }; "activeId": { "alias": "activeId"; "required": false; }; "interval": { "alias": "interval"; "required": false; }; "wrap": { "alias": "wrap"; "required": false; }; "keyboard": { "alias": "keyboard"; "required": false; }; "pauseOnHover": { "alias": "pauseOnHover"; "required": false; }; "pauseOnFocus": { "alias": "pauseOnFocus"; "required": false; }; "showNavigationArrows": { "alias": "showNavigationArrows"; "required": false; }; "showNavigationIndicators": { "alias": "showNavigationIndicators"; "required": false; }; }, { "slide": "slide"; "slid": "slid"; }, ["slides"], never, true, never>;
}
/**
 * A slide change event emitted right after the slide transition is completed.
 */
interface NgbSlideEvent {
    /**
     * The previous slide id.
     */
    prev: string;
    /**
     * The current slide id.
     */
    current: string;
    /**
     * The slide event direction.
     *
     * <span class="badge bg-info text-dark">since 12.0.0</span> Possible values are `'start' | 'end'`.
     *
     * <span class="badge bg-secondary">before 12.0.0</span> Possible values were `'left' | 'right'`.
     */
    direction: NgbSlideEventDirection;
    /**
     * Whether the pause() method was called (and no cycle() call was done afterwards).
     *
     * @since 5.1.0
     */
    paused: boolean;
    /**
     * Source triggering the slide change event.
     *
     * Possible values are `'timer' | 'arrowLeft' | 'arrowRight' | 'indicator'`
     *
     * @since 5.1.0
     */
    source?: NgbSlideEventSource;
}
/**
 * A slide change event emitted right after the slide transition is completed.
 *
 * @since 8.0.0
 */
interface NgbSingleSlideEvent {
    /**
     * true if the slide is shown, false otherwise
     */
    isShown: boolean;
    /**
     * The slide event direction.
     *
     * <span class="badge bg-info text-dark">since 12.0.0</span> Possible values are `'start' | 'end'`.
     *
     * <span class="badge bg-secondary">before 12.0.0</span> Possible values were `'left' | 'right'`.
     */
    direction: NgbSlideEventDirection;
    /**
     * Source triggering the slide change event.
     *
     * Possible values are `'timer' | 'arrowLeft' | 'arrowRight' | 'indicator'`
     *
     */
    source?: NgbSlideEventSource;
}
declare enum NgbSlideEventSource {
    TIMER = "timer",
    ARROW_LEFT = "arrowLeft",
    ARROW_RIGHT = "arrowRight",
    INDICATOR = "indicator"
}

/**
 * A configuration service for the [NgbCarousel](#/components/carousel/api#NgbCarousel) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all carousels used in the application.
 */
declare class NgbCarouselConfig {
    private _ngbConfig;
    private _animation;
    interval: number;
    wrap: boolean;
    keyboard: boolean;
    pauseOnHover: boolean;
    pauseOnFocus: boolean;
    showNavigationArrows: boolean;
    showNavigationIndicators: boolean;
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCarouselConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCarouselConfig>;
}

declare class NgbCarouselModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCarouselModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbCarouselModule, never, [typeof NgbCarousel, typeof NgbSlide], [typeof NgbCarousel, typeof NgbSlide]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbCarouselModule>;
}

/**
 * A configuration service for the [NgbCollapse](#/components/collapse/api#NgbCollapse) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all collapses used in the application.
 */
declare class NgbCollapseConfig {
    private _ngbConfig;
    private _animation;
    horizontal: boolean;
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCollapseConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCollapseConfig>;
}

declare class NgbCollapseModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCollapseModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbCollapseModule, never, [typeof NgbCollapse], [typeof NgbCollapse]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbCollapseModule>;
}

/**
 * An interface of the date model used by the datepicker.
 *
 * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 */
interface NgbDateStruct {
    /**
     * The year, for example 2016
     */
    year: number;
    /**
     * The month, for example 1=Jan ... 12=Dec
     */
    month: number;
    /**
     * The day of month, starting at 1
     */
    day: number;
}

/**
 * A simple class that represents a date that datepicker also uses internally.
 *
 * It is the implementation of the `NgbDateStruct` interface that adds some convenience methods,
 * like `.equals()`, `.before()`, etc.
 *
 * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
 *
 * In many cases it is simpler to manipulate these objects together with
 * [`NgbCalendar`](#/components/datepicker/api#NgbCalendar) than native JS Dates.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 *
 * @since 3.0.0
 */
declare class NgbDate implements NgbDateStruct {
    /**
     * The year, for example 2016
     */
    year: number;
    /**
     * The month, for example 1=Jan ... 12=Dec as in ISO 8601
     */
    month: number;
    /**
     * The day of month, starting with 1
     */
    day: number;
    /**
     * A **static method** that creates a new date object from the `NgbDateStruct`,
     *
     * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
     *
     * If the `date` is already of `NgbDate` type, the method will return the same object.
     */
    static from(date?: NgbDateStruct | null): NgbDate | null;
    constructor(year: number, month: number, day: number);
    /**
     * Checks if the current date is equal to another date.
     */
    equals(other?: NgbDateStruct | null): boolean;
    /**
     * Checks if the current date is before another date.
     */
    before(other?: NgbDateStruct | null): boolean;
    /**
     * Checks if the current date is after another date.
     */
    after(other?: NgbDateStruct | null): boolean;
}

type NgbPeriod = 'y' | 'm' | 'd';
/**
 * A service that represents the calendar used by the datepicker.
 *
 * The default implementation uses the Gregorian calendar. You can inject it in your own
 * implementations if necessary to simplify `NgbDate` calculations.
 */
declare abstract class NgbCalendar {
    /**
     * Returns the number of days per week.
     */
    abstract getDaysPerWeek(): number;
    /**
     * Returns an array of months per year.
     *
     * With default calendar we use ISO 8601 and return [1, 2, ..., 12];
     */
    abstract getMonths(year?: number): number[];
    /**
     * Returns the number of weeks per month.
     */
    abstract getWeeksPerMonth(): number;
    /**
     * Returns the weekday number for a given day.
     *
     * With the default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     */
    abstract getWeekday(date: NgbDate): number;
    /**
     * Adds a number of years, months or days to a given date.
     *
     * * `period` can be `y`, `m` or `d` and defaults to day.
     * * `number` defaults to 1.
     *
     * Always returns a new date.
     */
    abstract getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    /**
     * Subtracts a number of years, months or days from a given date.
     *
     * * `period` can be `y`, `m` or `d` and defaults to day.
     * * `number` defaults to 1.
     *
     * Always returns a new date.
     */
    abstract getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    /**
     * Returns the week number for a given week.
     */
    abstract getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    /**
     * Returns the today's date.
     */
    abstract getToday(): NgbDate;
    /**
     * Checks if a date is valid in the current calendar.
     */
    abstract isValid(date?: NgbDate | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendar, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendar>;
}
declare class NgbCalendarGregorian extends NgbCalendar {
    getDaysPerWeek(): number;
    getMonths(): number[];
    getWeeksPerMonth(): number;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getToday(): NgbDate;
    isValid(date?: NgbDate | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarGregorian, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarGregorian>;
}

/**
 * The context for the datepicker 'day' template.
 *
 * You can override the way dates are displayed in the datepicker via the `[dayTemplate]` input.
 */
interface DayTemplateContext {
    /**
     * The date that corresponds to the template. Same as the `date` parameter.
     *
     * Can be used for convenience as a default template key, ex. `let-d`.
     *
     * @since 3.3.0
     */
    $implicit: NgbDate;
    /**
     * The month currently displayed by the datepicker.
     */
    currentMonth: number;
    /**
     * The year currently displayed by the datepicker.
     *
     * @since 5.2.0
     */
    currentYear: number;
    /**
     * Any data you pass using the `[dayTemplateData]` input in the datepicker.
     *
     * @since 3.3.0
     */
    data?: any;
    /**
     * The date that corresponds to the template.
     */
    date: NgbDate;
    /**
     * `True` if the current date is disabled.
     */
    disabled: boolean;
    /**
     * `True` if the current date is focused.
     */
    focused: boolean;
    /**
     * `True` if the current date is selected.
     */
    selected: boolean;
    /**
     * `True` if the current date is today (equal to `NgbCalendar.getToday()`).
     *
     * @since 4.1.0
     */
    today: boolean;
}

type NgbMarkDisabled = (date: NgbDateStruct, current?: {
    year: number;
    month: number;
}) => boolean;
type NgbDayTemplateData = (date: NgbDateStruct, current?: {
    year: number;
    month: number;
}) => any;
type DayViewModel = {
    date: NgbDate;
    context: DayTemplateContext;
    tabindex: number;
    ariaLabel: string;
    hidden: boolean;
};
type WeekViewModel = {
    number: number;
    days: DayViewModel[];
    collapsed: boolean;
};
type MonthViewModel = {
    firstDate: NgbDate;
    lastDate: NgbDate;
    number: number;
    year: number;
    weeks: WeekViewModel[];
    weekdays: string[];
};
type DatepickerViewModel = {
    dayTemplateData: NgbDayTemplateData | null;
    disabled: boolean;
    displayMonths: number;
    firstDate: NgbDate | null;
    firstDayOfWeek: number;
    focusDate: NgbDate | null;
    focusVisible: boolean;
    lastDate: NgbDate | null;
    markDisabled: NgbMarkDisabled | null;
    maxDate: NgbDate | null;
    minDate: NgbDate | null;
    months: MonthViewModel[];
    navigation: 'select' | 'arrows' | 'none';
    outsideDays: 'visible' | 'collapsed' | 'hidden';
    prevDisabled: boolean;
    nextDisabled: boolean;
    selectBoxes: {
        years: number[];
        months: number[];
    };
    selectedDate: NgbDate | null;
    weekdayWidth: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined>;
    weekdaysVisible: boolean;
};
declare enum NavigationEvent {
    PREV = 0,
    NEXT = 1
}

/**
 * A service supplying i18n data to the datepicker component.
 *
 * The default implementation of this service uses the Angular locale and registered locale data for
 * weekdays and month names (as explained in the Angular i18n guide).
 *
 * It also provides a way to i18n data that depends on calendar calculations, like aria labels, day, week and year
 * numerals. For other static labels the datepicker uses the default Angular i18n.
 *
 * See the [i18n demo](#/components/datepicker/examples#i18n) and
 * [Hebrew calendar demo](#/components/datepicker/calendars#hebrew) on how to extend this class and define
 * a custom provider for i18n.
 */
declare abstract class NgbDatepickerI18n {
    /**
     * Returns the weekday label using specified width
     *
     * @since 9.1.0
     */
    abstract getWeekdayLabel(weekday: number, width?: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined>): string;
    /**
     * Returns the short month name to display in the date picker navigation.
     *
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     */
    abstract getMonthShortName(month: number, year?: number): string;
    /**
     * Returns the full month name to display in the date picker navigation.
     *
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     */
    abstract getMonthFullName(month: number, year?: number): string;
    /**
     * Returns the text label to display above the day view.
     *
     * @since 9.1.0
     */
    getMonthLabel(date: NgbDateStruct): string;
    /**
     * Returns the value of the `aria-label` attribute for a specific date.
     *
     * @since 2.0.0
     */
    abstract getDayAriaLabel(date: NgbDateStruct): string;
    /**
     * Returns the textual representation of a day that is rendered in a day cell.
     *
     * @since 3.0.0
     */
    getDayNumerals(date: NgbDateStruct): string;
    /**
     * Returns the textual representation of a week number rendered by datepicker.
     *
     * @since 3.0.0
     */
    getWeekNumerals(weekNumber: number): string;
    /**
     * Returns the textual representation of a year that is rendered in the datepicker year select box.
     *
     * @since 3.0.0
     */
    getYearNumerals(year: number): string;
    /**
     * Returns the week label to display in the heading of the month view.
     *
     * @since 9.1.0
     */
    getWeekLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerI18n, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerI18n>;
}
/**
 * A service providing default implementation for the datepicker i18n.
 * It can be used as a base implementation if necessary.
 *
 * @since 9.1.0
 */
declare class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    private _locale;
    private _monthsShort;
    private _monthsFull;
    getWeekdayLabel(weekday: number, width?: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined>): string;
    getMonthShortName(month: number): string;
    getMonthFullName(month: number): string;
    getDayAriaLabel(date: NgbDateStruct): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerI18nDefault, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerI18nDefault>;
}

/**
 * The context for the datepicker 'content' template.
 *
 * You can override the way content is displayed in the datepicker via the `[contentTemplate]` input
 * or via the [`NgbDatepickerContent`](#/components/datepicker/api#NgbDatepickerContent) directive.
 *
 * @since 14.2.0
 */
interface ContentTemplateContext {
    /**
     * The datepicker that corresponds to the template.
     *
     * Can be used for convenience as a default template key, ex. `let-d`.
     */
    $implicit: NgbDatepicker;
}

/**
 * An event emitted right before the navigation happens and the month displayed by the datepicker changes.
 */
interface NgbDatepickerNavigateEvent {
    /**
     * The currently displayed month.
     */
    current: {
        year: number;
        month: number;
    } | null;
    /**
     * The month we're navigating to.
     */
    next: {
        year: number;
        month: number;
    };
    /**
     * Calling this function will prevent navigation from happening.
     *
     * @since 4.1.0
     */
    preventDefault: () => void;
}
/**
 * An interface that represents the readonly public state of the datepicker.
 *
 * Accessible via the `datepicker.state` getter
 *
 * @since 5.2.0
 */
interface NgbDatepickerState {
    /**
     * The earliest date that can be displayed or selected
     */
    readonly minDate: NgbDate | null;
    /**
     * The latest date that can be displayed or selected
     */
    readonly maxDate: NgbDate | null;
    /**
     * The first visible date of currently displayed months
     */
    readonly firstDate: NgbDate;
    /**
     * The last visible date of currently displayed months
     */
    readonly lastDate: NgbDate;
    /**
     * The date currently focused by the datepicker
     */
    readonly focusedDate: NgbDate;
    /**
     * First dates of months currently displayed by the datepicker
     *
     * @since 5.3.0
     */
    readonly months: NgbDate[];
}
/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * @since 5.3.0
 */
declare class NgbDatepickerContent {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDatepickerContent, "ng-template[ngbDatepickerContent]", never, {}, {}, never, never, true, never>;
}
/**
 * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
 * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
 *
 * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
 *
 * @since 5.3.0
 */
declare class NgbDatepickerMonth {
    private _keyboardService;
    private _service;
    i18n: NgbDatepickerI18n;
    datepicker: NgbDatepicker;
    viewModel: MonthViewModel;
    /**
     * The first date of month to be rendered.
     *
     * This month must one of the months present in the
     * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
     */
    set month(month: NgbDateStruct);
    onKeyDown(event: KeyboardEvent): void;
    doSelect(day: DayViewModel): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerMonth, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbDatepickerMonth, "ngb-datepicker-month", never, { "month": { "alias": "month"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
declare class NgbDatepicker implements AfterViewInit, OnChanges, OnInit, ControlValueAccessor {
    static ngAcceptInputType_autoClose: boolean | string;
    static ngAcceptInputType_navigation: string;
    static ngAcceptInputType_outsideDays: string;
    static ngAcceptInputType_weekdays: boolean | string;
    model: DatepickerViewModel;
    private _defaultDayTemplate;
    private _contentEl;
    protected injector: Injector;
    private _service;
    private _calendar;
    private _i18n;
    private _config;
    private _nativeElement;
    private _ngbDateAdapter;
    private _ngZone;
    private _destroyRef;
    private _injector;
    private _controlValue;
    private _publicState;
    private _initialized;
    /**
     * The reference to a custom content template.
     *
     * Allows to completely override the way datepicker displays months.
     *
     * See [`NgbDatepickerContent`](#/components/datepicker/api#NgbDatepickerContent) and
     * [`ContentTemplateContext`](#/components/datepicker/api#ContentTemplateContext) for more details.
     *
     * @since 14.2.0
     */
    contentTemplate: TemplateRef<ContentTemplateContext>;
    contentTemplateFromContent?: NgbDatepickerContent;
    /**
     * The reference to a custom template for the day.
     *
     * Allows to completely override the way a day 'cell' in the calendar is displayed.
     *
     * See [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext) for the data you get inside.
     */
    dayTemplate: TemplateRef<DayTemplateContext>;
    /**
     * The callback to pass any arbitrary data to the template cell via the
     * [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext)'s `data` parameter.
     *
     * `current` is the month that is currently displayed by the datepicker.
     *
     * @since 3.3.0
     */
    dayTemplateData: (date: NgbDateStruct, current?: {
        year: number;
        month: number;
    }) => any;
    /**
     * The number of months to display.
     */
    displayMonths: number;
    /**
     * The first day of the week.
     *
     * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
     */
    firstDayOfWeek: number;
    /**
     * The reference to the custom template for the datepicker footer.
     *
     * @since 3.3.0
     */
    footerTemplate: TemplateRef<any>;
    /**
     * The callback to mark some dates as disabled.
     *
     * It is called for each new date when navigating to a different month.
     *
     * `current` is the month that is currently displayed by the datepicker.
     */
    markDisabled: (date: NgbDateStruct, current?: {
        year: number;
        month: number;
    }) => boolean;
    /**
     * The latest date that can be displayed or selected.
     *
     * If not provided, 'year' select box will display 10 years after the current month.
     */
    maxDate: NgbDateStruct;
    /**
     * The earliest date that can be displayed or selected.
     *
     * If not provided, 'year' select box will display 10 years before the current month.
     */
    minDate: NgbDateStruct;
    /**
     * Navigation type.
     *
     * * `"select"` - select boxes for month and navigation arrows
     * * `"arrows"` - only navigation arrows
     * * `"none"` - no navigation visible at all
     */
    navigation: "none" | "select" | "arrows";
    /**
     * The way of displaying days that don't belong to the current month.
     *
     * * `"visible"` - days are visible
     * * `"hidden"` - days are hidden, white space preserved
     * * `"collapsed"` - days are collapsed, so the datepicker height might change between months
     *
     * For the 2+ months view, days in between months are never shown.
     */
    outsideDays: "hidden" | "visible" | "collapsed";
    /**
     * If `true`, week numbers will be displayed.
     */
    showWeekNumbers: boolean;
    /**
     * The date to open calendar with.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date is provided, calendar will open with current month.
     *
     * You could use `navigateTo(date)` method as an alternative.
     */
    startDate: {
        year: number;
        month: number;
        day?: number;
    };
    /**
     * The way weekdays should be displayed.
     *
     * * `true` - weekdays are displayed using default width
     * * `false` - weekdays are not displayed
     * * `"short" | "long" | "narrow"` - weekdays are displayed using specified width
     *
     * @since 9.1.0
     */
    weekdays: boolean | "short" | "narrow" | "long";
    /**
     * An event emitted right before the navigation happens and displayed month changes.
     *
     * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
     */
    navigate: EventEmitter<NgbDatepickerNavigateEvent>;
    /**
     * An event emitted when user selects a date using keyboard or mouse.
     *
     * The payload of the event is currently selected `NgbDate`.
     *
     * @since 5.2.0
     */
    dateSelect: EventEmitter<NgbDate>;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor();
    /**
     *  Returns the readonly public state of the datepicker
     *
     * @since 5.2.0
     */
    get state(): NgbDatepickerState;
    /**
     *  Returns the calendar service used in the specific datepicker instance.
     *
     *  @since 5.3.0
     */
    get calendar(): NgbCalendar;
    /**
     * Returns the i18n service used in the specific datepicker instance.
     *
     * @since 14.2.0
     */
    get i18n(): NgbDatepickerI18n;
    /**
     *  Focuses on given date.
     */
    focusDate(date?: NgbDateStruct | null): void;
    /**
     *  Selects focused date.
     */
    focusSelect(): void;
    focus(): void;
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date?: {
        year: number;
        month: number;
        day?: number;
    }): void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    onDateSelect(date: NgbDate): void;
    onNavigateDateSelect(date: NgbDate): void;
    onNavigateEvent(event: NavigationEvent): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    setDisabledState(disabled: boolean): void;
    writeValue(value: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbDatepicker, "ngb-datepicker", ["ngbDatepicker"], { "contentTemplate": { "alias": "contentTemplate"; "required": false; }; "dayTemplate": { "alias": "dayTemplate"; "required": false; }; "dayTemplateData": { "alias": "dayTemplateData"; "required": false; }; "displayMonths": { "alias": "displayMonths"; "required": false; }; "firstDayOfWeek": { "alias": "firstDayOfWeek"; "required": false; }; "footerTemplate": { "alias": "footerTemplate"; "required": false; }; "markDisabled": { "alias": "markDisabled"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "navigation": { "alias": "navigation"; "required": false; }; "outsideDays": { "alias": "outsideDays"; "required": false; }; "showWeekNumbers": { "alias": "showWeekNumbers"; "required": false; }; "startDate": { "alias": "startDate"; "required": false; }; "weekdays": { "alias": "weekdays"; "required": false; }; }, { "navigate": "navigate"; "dateSelect": "dateSelect"; }, ["contentTemplateFromContent"], never, true, never>;
}

type Placement = 'auto' | 'top' | 'bottom' | 'start' | 'left' | 'end' | 'right' | 'top-start' | 'top-left' | 'top-end' | 'top-right' | 'bottom-start' | 'bottom-left' | 'bottom-end' | 'bottom-right' | 'start-top' | 'left-top' | 'start-bottom' | 'left-bottom' | 'end-top' | 'right-top' | 'end-bottom' | 'right-bottom';
type PlacementArray = Placement | Array<Placement> | string;

/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
declare class NgbInputDatepicker implements OnChanges, OnDestroy, ControlValueAccessor, Validator {
    static ngAcceptInputType_autoClose: boolean | string;
    static ngAcceptInputType_disabled: boolean | '';
    static ngAcceptInputType_navigation: string;
    static ngAcceptInputType_outsideDays: string;
    static ngAcceptInputType_weekdays: boolean | string;
    private _parserFormatter;
    private _elRef;
    private _vcRef;
    private _ngZone;
    private _calendar;
    private _dateAdapter;
    private _document;
    private _changeDetector;
    private _injector;
    private _config;
    private _cRef;
    private _disabled;
    private _elWithFocus;
    private _model;
    private _inputValue;
    private _afterRenderRef;
    private _positioning;
    private _destroyCloseHandlers$;
    /**
     * Indicates whether the datepicker popup should be closed automatically after date selection / outside click or not.
     *
     * * `true` - the popup will close on both date selection and outside click.
     * * `false` - the popup can only be closed manually via `close()` or `toggle()` methods.
     * * `"inside"` - the popup will close on date selection, but not outside clicks.
     * * `"outside"` - the popup will close only on the outside click and not on date selection/inside clicks.
     *
     * @since 3.0.0
     */
    autoClose: boolean | "inside" | "outside";
    /**
     * The reference to a custom content template.
     *
     * Allows to completely override the way datepicker.
     *
     * See [`NgbDatepickerContent`](#/components/datepicker/api#NgbDatepickerContent) for more details.
     *
     * @since 14.2.0
     */
    contentTemplate: TemplateRef<ContentTemplateContext>;
    /**
     * An optional class applied to the datepicker popup element.
     *
     * @since 9.1.0
     */
    datepickerClass: string;
    /**
     * The reference to a custom template for the day.
     *
     * Allows to completely override the way a day 'cell' in the calendar is displayed.
     *
     * See [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext) for the data you get inside.
     */
    dayTemplate: TemplateRef<DayTemplateContext>;
    /**
     * The callback to pass any arbitrary data to the template cell via the
     * [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext)'s `data` parameter.
     *
     * `current` is the month that is currently displayed by the datepicker.
     *
     * @since 3.3.0
     */
    dayTemplateData: (date: NgbDate, current?: {
        year: number;
        month: number;
    }) => any;
    /**
     * The number of months to display.
     */
    displayMonths: number;
    /**
     * The first day of the week.
     *
     * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
     */
    firstDayOfWeek: number;
    /**
     * The reference to the custom template for the datepicker footer.
     *
     * @since 3.3.0
     */
    footerTemplate: TemplateRef<any>;
    /**
     * The callback to mark some dates as disabled.
     *
     * It is called for each new date when navigating to a different month.
     *
     * `current` is the month that is currently displayed by the datepicker.
     */
    markDisabled: (date: NgbDate, current?: {
        year: number;
        month: number;
    }) => boolean;
    /**
     * The earliest date that can be displayed or selected. Also used for form validation.
     *
     * If not provided, 'year' select box will display 10 years before the current month.
     */
    minDate: NgbDateStruct;
    /**
     * The latest date that can be displayed or selected. Also used for form validation.
     *
     * If not provided, 'year' select box will display 10 years after the current month.
     */
    maxDate: NgbDateStruct;
    /**
     * Navigation type.
     *
     * * `"select"` - select boxes for month and navigation arrows
     * * `"arrows"` - only navigation arrows
     * * `"none"` - no navigation visible at all
     */
    navigation: 'select' | 'arrows' | 'none';
    /**
     * The way of displaying days that don't belong to the current month.
     *
     * * `"visible"` - days are visible
     * * `"hidden"` - days are hidden, white space preserved
     * * `"collapsed"` - days are collapsed, so the datepicker height might change between months
     *
     * For the 2+ months view, days in between months are never shown.
     */
    outsideDays: 'visible' | 'collapsed' | 'hidden';
    /**
     * The preferred placement of the datepicker popup, among the [possible values](#/guides/positioning#api).
     *
     * The default order of preference is `"bottom-start bottom-end top-start top-end"`
     *
     * Please see the [positioning overview](#/positioning) for more details.
     */
    placement: PlacementArray;
    /**
     * Allows to change default Popper options when positioning the popup.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<_popperjs_core.Options>) => Partial<_popperjs_core.Options>;
    /**
     * If `true`, when closing datepicker will focus element that was focused before datepicker was opened.
     *
     * Alternatively you could provide a selector or an `HTMLElement` to focus. If the element doesn't exist or invalid,
     * we'll fallback to focus document body.
     *
     * @since 5.2.0
     */
    restoreFocus: true | string | HTMLElement;
    /**
     * If `true`, week numbers will be displayed.
     */
    showWeekNumbers: boolean;
    /**
     * The date to open calendar with.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date is provided, calendar will open with current month.
     *
     * You could use `navigateTo(date)` method as an alternative.
     */
    startDate: {
        year: number;
        month: number;
        day?: number;
    };
    /**
     * A selector specifying the element the datepicker popup should be appended to.
     *
     * Currently only supports `"body"`.
     */
    container: "body" | null;
    /**
     * A css selector or html element specifying the element the datepicker popup should be positioned against.
     *
     * By default the input is used as a target.
     *
     * @since 4.2.0
     */
    positionTarget: string | HTMLElement;
    /**
     * The way weekdays should be displayed.
     *
     * * `true` - weekdays are displayed using default width
     * * `false` - weekdays are not displayed
     * * `"short" | "long" | "narrow"` - weekdays are displayed using specified width
     *
     * @since 9.1.0
     */
    weekdays: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined> | boolean;
    /**
     * An event emitted when user selects a date using keyboard or mouse.
     *
     * The payload of the event is currently selected `NgbDate`.
     *
     * @since 1.1.1
     */
    dateSelect: EventEmitter<NgbDate>;
    /**
     * Event emitted right after the navigation happens and displayed month changes.
     *
     * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
     */
    navigate: EventEmitter<NgbDatepickerNavigateEvent>;
    /**
     * An event fired after closing datepicker window.
     *
     * @since 4.2.0
     */
    closed: EventEmitter<void>;
    get disabled(): any;
    set disabled(value: any);
    private _onChange;
    private _onTouched;
    private _validatorChange;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    registerOnValidatorChange(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    validate(c: AbstractControl): ValidationErrors | null;
    writeValue(value: any): void;
    manualDateChange(value: string, updateView?: boolean): void;
    isOpen(): boolean;
    /**
     * Opens the datepicker popup.
     *
     * If the related form control contains a valid date, the corresponding month will be opened.
     */
    open(): void;
    /**
     * Closes the datepicker popup.
     */
    close(): void;
    /**
     * Toggles the datepicker popup.
     */
    toggle(): void;
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date?: {
        year: number;
        month: number;
        day?: number;
    }): void;
    onBlur(): void;
    onFocus(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private _applyDatepickerInputs;
    private _applyPopupClass;
    private _applyPopupStyling;
    private _subscribeForDatepickerOutputs;
    private _writeModelValue;
    private _fromDateStruct;
    private _setCloseHandlers;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbInputDatepicker, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbInputDatepicker, "input[ngbDatepicker]", ["ngbDatepicker"], { "autoClose": { "alias": "autoClose"; "required": false; }; "contentTemplate": { "alias": "contentTemplate"; "required": false; }; "datepickerClass": { "alias": "datepickerClass"; "required": false; }; "dayTemplate": { "alias": "dayTemplate"; "required": false; }; "dayTemplateData": { "alias": "dayTemplateData"; "required": false; }; "displayMonths": { "alias": "displayMonths"; "required": false; }; "firstDayOfWeek": { "alias": "firstDayOfWeek"; "required": false; }; "footerTemplate": { "alias": "footerTemplate"; "required": false; }; "markDisabled": { "alias": "markDisabled"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "navigation": { "alias": "navigation"; "required": false; }; "outsideDays": { "alias": "outsideDays"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "popperOptions": { "alias": "popperOptions"; "required": false; }; "restoreFocus": { "alias": "restoreFocus"; "required": false; }; "showWeekNumbers": { "alias": "showWeekNumbers"; "required": false; }; "startDate": { "alias": "startDate"; "required": false; }; "container": { "alias": "container"; "required": false; }; "positionTarget": { "alias": "positionTarget"; "required": false; }; "weekdays": { "alias": "weekdays"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "dateSelect": "dateSelect"; "navigate": "navigate"; "closed": "closed"; }, never, never, true, never>;
}

declare abstract class NgbCalendarHijri extends NgbCalendar {
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    abstract getDaysPerMonth(month: number, year: number): number;
    /**
     * Returns the equivalent Hijri date value for a give input Gregorian date.
     * `gDate` is s JS Date to be converted to Hijri.
     */
    abstract fromGregorian(gDate: Date): NgbDate;
    /**
     * Converts the current Hijri date to Gregorian.
     */
    abstract toGregorian(hDate: NgbDate): Date;
    getDaysPerWeek(): number;
    getMonths(): number[];
    getWeeksPerMonth(): number;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getToday(): NgbDate;
    isValid(date?: NgbDate | null): boolean;
    private _setDay;
    private _setMonth;
    private _setYear;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarHijri, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarHijri>;
}

declare class NgbCalendarIslamicCivil extends NgbCalendarHijri {
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     */
    fromGregorian(gDate: Date): NgbDate;
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     */
    toGregorian(hDate: NgbDate): Date;
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    getDaysPerMonth(month: number, year: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarIslamicCivil, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarIslamicCivil>;
}

declare class NgbCalendarIslamicUmalqura extends NgbCalendarIslamicCivil {
    /**
     * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
     * `gdate` is s JS Date to be converted to Hijri.
     */
    fromGregorian(gDate: Date): NgbDate;
    /**
     * Converts the current Hijri date to Gregorian.
     */
    toGregorian(hDate: NgbDate): Date;
    /**
     * Returns the number of days in a specific Hijri hMonth.
     * `hMonth` is 1 for Muharram, 2 for Safar, etc.
     * `hYear` is any Hijri hYear.
     */
    getDaysPerMonth(hMonth: number, hYear: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarIslamicUmalqura, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarIslamicUmalqura>;
}

declare class NgbCalendarPersian extends NgbCalendar {
    getDaysPerWeek(): number;
    getMonths(): number[];
    getWeeksPerMonth(): number;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getToday(): NgbDate;
    isValid(date?: NgbDate | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarPersian, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarPersian>;
}

/**
 * @since 3.2.0
 */
declare class NgbCalendarHebrew extends NgbCalendar {
    getDaysPerWeek(): number;
    getMonths(year?: number): number[];
    getWeeksPerMonth(): number;
    isValid(date?: NgbDate | null): boolean;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getToday(): NgbDate;
    /**
     * @since 3.4.0
     */
    toGregorian(date: NgbDate): NgbDate;
    /**
     * @since 3.4.0
     */
    fromGregorian(date: NgbDate): NgbDate;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarHebrew, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarHebrew>;
}

/**
 * @since 3.2.0
 */
declare class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    getMonthShortName(month: number, year?: number): string;
    getMonthFullName(month: number, year?: number): string;
    getWeekdayLabel(weekday: number, width?: Intl.DateTimeFormatOptions['weekday']): string;
    getDayAriaLabel(date: NgbDateStruct): string;
    getDayNumerals(date: NgbDateStruct): string;
    getWeekNumerals(weekNumber: number): string;
    getYearNumerals(year: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerI18nHebrew, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerI18nHebrew>;
}

/**
 * @since 9.1.0
 */
declare class NgbCalendarBuddhist extends NgbCalendarGregorian {
    getToday(): NgbDate;
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    isValid(date?: NgbDate | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarBuddhist, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarBuddhist>;
}

/**
 * @since 16.0.0
 */
declare class NgbCalendarEthiopian extends NgbCalendar {
    getDaysPerWeek(): number;
    getMonths(year?: number | undefined): number[];
    getNext(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getPrev(date: NgbDate, period?: NgbPeriod, number?: number): NgbDate;
    getWeekday(date: NgbDate): number;
    getWeekNumber(week: readonly NgbDate[], firstDayOfWeek: number): number;
    getWeeksPerMonth(): number;
    getToday(): NgbDate;
    isValid(date: NgbDate): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbCalendarEthiopian, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbCalendarEthiopian>;
}

/**
 * @since 16.0.0
 */
declare class NgbDatepickerI18nAmharic extends NgbDatepickerI18n {
    getMonthShortName(month: number, year?: number | undefined): string;
    getMonthFullName(month: number, year?: number | undefined): string;
    getWeekdayLabel(weekday: number, width?: Intl.DateTimeFormatOptions['weekday']): string;
    getDayAriaLabel(date: NgbDateStruct): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerI18nAmharic, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerI18nAmharic>;
}

/**
 * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
declare class NgbDatepickerConfig {
    dayTemplate: TemplateRef<DayTemplateContext>;
    dayTemplateData: (date: NgbDateStruct, current?: {
        year: number;
        month: number;
    }) => any;
    footerTemplate: TemplateRef<any>;
    displayMonths: number;
    firstDayOfWeek: number;
    markDisabled: (date: NgbDateStruct, current?: {
        year: number;
        month: number;
    }) => boolean;
    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;
    navigation: 'select' | 'arrows' | 'none';
    outsideDays: 'visible' | 'collapsed' | 'hidden';
    showWeekNumbers: boolean;
    startDate: {
        year: number;
        month: number;
        day?: number;
    };
    weekdays: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined> | boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerConfig>;
}

/**
 * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepicker inputs used in the application.
 *
 * @since 5.2.0
 */
declare class NgbInputDatepickerConfig extends NgbDatepickerConfig {
    autoClose: boolean | 'inside' | 'outside';
    container: null | 'body';
    positionTarget: string | HTMLElement;
    placement: PlacementArray;
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    restoreFocus: true | HTMLElement | string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbInputDatepickerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbInputDatepickerConfig>;
}

/**
 * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
 * any provided user date model `D`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding datepicker to a form control,
 * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
 *
 * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details
 * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
 */
declare abstract class NgbDateAdapter<D> {
    /**
     * Converts a user-model date of type `D` to an `NgbDateStruct` for internal use.
     */
    abstract fromModel(value: D | null): NgbDateStruct | null;
    /**
     * Converts an internal `NgbDateStruct` date to a user-model date of type `D`.
     */
    abstract toModel(date: NgbDateStruct | null): D | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateAdapter<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateAdapter<any>>;
}
declare class NgbDateStructAdapter extends NgbDateAdapter<NgbDateStruct> {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    fromModel(date: NgbDateStruct | null): NgbDateStruct | null;
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    toModel(date: NgbDateStruct | null): NgbDateStruct | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateStructAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateStructAdapter>;
}

/**
 * [`NgbDateAdapter`](#/components/datepicker/api#NgbDateAdapter) implementation that uses
 * native javascript dates as a user date model.
 */
declare class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
    /**
     * Converts a native `Date` to a `NgbDateStruct`.
     */
    fromModel(date: Date | null): NgbDateStruct | null;
    /**
     * Converts a `NgbDateStruct` to a native `Date`.
     */
    toModel(date: NgbDateStruct | null): Date | null;
    protected _fromNativeDate(date: Date): NgbDateStruct;
    protected _toNativeDate(date: NgbDateStruct): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateNativeAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateNativeAdapter>;
}

/**
 * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
 *
 * @since 3.2.0
 */
declare class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    protected _fromNativeDate(date: Date): NgbDateStruct;
    protected _toNativeDate(date: NgbDateStruct): Date;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateNativeUTCAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateNativeUTCAdapter>;
}

/**
 * An abstract service for parsing and formatting dates for the
 * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
 * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
 * input element.
 *
 * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
 * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
 * in the input.
 *
 * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
 * to use an alternative string format or a custom parsing logic.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 */
declare abstract class NgbDateParserFormatter {
    /**
     * Parses the given `string` to an `NgbDateStruct`.
     *
     * Implementations should try their best to provide a result, even
     * partial. They must return `null` if the value can't be parsed.
     */
    abstract parse(value: string): NgbDateStruct | null;
    /**
     * Formats the given `NgbDateStruct` to a `string`.
     *
     * Implementations should return an empty string if the given date is `null`,
     * and try their best to provide a partial result if the given date is incomplete or invalid.
     */
    abstract format(date: NgbDateStruct | null): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDateParserFormatter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDateParserFormatter>;
}

/**
 * A service that represents the keyboard navigation.
 *
 * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
 *
 * @since 5.2.0
 */
declare class NgbDatepickerKeyboardService {
    /**
     * Processes a keyboard event.
     */
    processKey(event: KeyboardEvent, datepicker: NgbDatepicker): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerKeyboardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDatepickerKeyboardService>;
}

declare class NgbDatepickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDatepickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbDatepickerModule, never, [typeof NgbDatepicker, typeof NgbDatepickerContent, typeof NgbInputDatepicker, typeof NgbDatepickerMonth], [typeof NgbDatepicker, typeof NgbDatepickerContent, typeof NgbInputDatepicker, typeof NgbDatepickerMonth]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbDatepickerModule>;
}

/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * @since 4.1.0
 */
declare class NgbDropdownItem {
    static ngAcceptInputType_disabled: boolean | '';
    private _disabled;
    nativeElement: HTMLElement;
    tabindex: string | number;
    set disabled(value: boolean);
    get disabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdownItem, "[ngbDropdownItem]", never, { "tabindex": { "alias": "tabindex"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * A directive that will be applied if dropdown item is a button.
 * It will only set the disabled property.
 */
declare class NgbDropdownButtonItem {
    item: NgbDropdownItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownButtonItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdownButtonItem, "button[ngbDropdownItem]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
declare class NgbDropdownMenu {
    dropdown: NgbDropdown;
    nativeElement: HTMLElement;
    menuItems: QueryList<NgbDropdownItem>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownMenu, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdownMenu, "[ngbDropdownMenu]", never, {}, {}, ["menuItems"], never, true, never>;
}
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * @since 1.1.0
 */
declare class NgbDropdownAnchor {
    dropdown: NgbDropdown;
    nativeElement: HTMLElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownAnchor, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdownAnchor, "[ngbDropdownAnchor]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
declare class NgbDropdownToggle extends NgbDropdownAnchor {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownToggle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdownToggle, "[ngbDropdownToggle]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
declare class NgbDropdown implements OnInit, AfterContentInit, OnChanges, OnDestroy {
    static ngAcceptInputType_autoClose: boolean | string;
    static ngAcceptInputType_display: string;
    private _changeDetector;
    private _config;
    private _document;
    private _injector;
    private _ngZone;
    private _nativeElement;
    private _destroyCloseHandlers$;
    private _afterRenderRef;
    private _bodyContainer;
    private _positioning;
    private _menu;
    private _anchor;
    /**
     * Indicates whether the dropdown should be closed when clicking one of dropdown items or pressing ESC.
     *
     * * `true` - the dropdown will close on both outside and inside (menu) clicks.
     * * `false` - the dropdown can only be closed manually via `close()` or `toggle()` methods.
     * * `"inside"` - the dropdown will close on inside menu clicks, but not outside clicks.
     * * `"outside"` - the dropdown will close only on the outside clicks and not on menu clicks.
     */
    autoClose: boolean | "inside" | "outside";
    /**
     * A custom class that is applied only to the `ngbDropdownMenu` parent element.
     * * In case of the inline dropdown it will be the `<div ngbDropdown>`
     * * In case of the dropdown with  `container="body"` it will be the `<div class="dropdown">` attached to the `<body>`
     *
     * Useful mainly when dropdown is attached to the body.
     * If the dropdown is inline just use `<div ngbDropdown class="custom-class">` instead.
     *
     * @since 9.1.0
     */
    dropdownClass: string;
    /**
     * Defines whether or not the dropdown menu is opened initially.
     */
    _open: boolean;
    /**
     * The preferred placement of the dropdown, among the [possible values](#/guides/positioning#api).
     *
     * The default order of preference is `"bottom-start bottom-end top-start top-end"`
     *
     * Please see the [positioning overview](#/positioning) for more details.
     */
    placement: PlacementArray;
    /**
     * Allows to change default Popper options when positioning the dropdown.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<_popperjs_core.Options>) => Partial<_popperjs_core.Options>;
    /**
     * A selector specifying the element the dropdown should be appended to.
     * Currently only supports "body".
     *
     * @since 4.1.0
     */
    container: null | 'body';
    /**
     * Enable or disable the dynamic positioning. The default value is dynamic unless the dropdown is used
     * inside a Bootstrap navbar. If you need custom placement for a dropdown in a navbar, set it to
     * dynamic explicitly. See the [positioning of dropdown](#/positioning#dropdown)
     * and the [navbar demo](/#/components/dropdown/examples#navbar) for more details.
     *
     * @since 4.2.0
     */
    display: 'dynamic' | 'static';
    /**
     * An event fired when the dropdown is opened or closed.
     *
     * The event payload is a `boolean`:
     * * `true` - the dropdown was opened
     * * `false` - the dropdown was closed
     */
    openChange: EventEmitter<boolean>;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Checks if the dropdown menu is open.
     */
    isOpen(): boolean;
    /**
     * Opens the dropdown menu.
     */
    open(): void;
    private _setCloseHandlers;
    /**
     * Closes the dropdown menu.
     */
    close(): void;
    /**
     * Toggles the dropdown menu.
     */
    toggle(): void;
    ngOnDestroy(): void;
    onKeyDown(event: KeyboardEvent): void;
    private _isDropup;
    private _isEventFromToggle;
    private _getMenuElements;
    private _positionMenu;
    private _getFirstPlacement;
    private _resetContainer;
    private _applyContainer;
    private _applyCustomDropdownClass;
    private _applyPlacementClasses;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdown, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbDropdown, "[ngbDropdown]", ["ngbDropdown"], { "autoClose": { "alias": "autoClose"; "required": false; }; "dropdownClass": { "alias": "dropdownClass"; "required": false; }; "_open": { "alias": "open"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "popperOptions": { "alias": "popperOptions"; "required": false; }; "container": { "alias": "container"; "required": false; }; "display": { "alias": "display"; "required": false; }; }, { "openChange": "openChange"; }, ["_menu", "_anchor"], never, true, never>;
}

/**
 * A configuration service for the [`NgbDropdown`](#/components/dropdown/api#NgbDropdown) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the dropdowns used in the application.
 */
declare class NgbDropdownConfig {
    autoClose: boolean | 'outside' | 'inside';
    placement: PlacementArray;
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    container: null | 'body';
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbDropdownConfig>;
}

declare class NgbDropdownModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbDropdownModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbDropdownModule, never, [typeof NgbDropdown, typeof NgbDropdownAnchor, typeof NgbDropdownToggle, typeof NgbDropdownMenu, typeof NgbDropdownItem, typeof NgbDropdownButtonItem], [typeof NgbDropdown, typeof NgbDropdownAnchor, typeof NgbDropdownToggle, typeof NgbDropdownMenu, typeof NgbDropdownItem, typeof NgbDropdownButtonItem]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbDropdownModule>;
}

/**
 * Options available when opening new modal windows with `NgbModal.open()` method.
 */
interface NgbModalOptions {
    /**
     * If `true`, modal opening and closing will be animated.
     *
     * @since 8.0.0
     */
    animation?: boolean;
    /**
     * `aria-labelledby` attribute value to set on the modal window.
     *
     * @since 2.2.0
     */
    ariaLabelledBy?: string;
    /**
     * `aria-describedby` attribute value to set on the modal window.
     *
     * @since 6.1.0
     */
    ariaDescribedBy?: string;
    /**
     * If `true`, the backdrop element will be created for a given modal.
     *
     * Alternatively, specify `'static'` for a backdrop which doesn't close the modal on click.
     *
     * Default value is `true`.
     */
    backdrop?: boolean | 'static';
    /**
     * Callback right before the modal will be dismissed.
     *
     * If this function returns:
     * * `false`
     * * a promise resolved with `false`
     * * a promise that is rejected
     *
     * then the modal won't be dismissed.
     */
    beforeDismiss?: () => boolean | Promise<boolean>;
    /**
     * If `true`, the modal will be centered vertically.
     *
     * Default value is `false`.
     *
     * @since 1.1.0
     */
    centered?: boolean;
    /**
     * A selector specifying the element all new modal windows should be appended to.
     * Since v5.3.0 it is also possible to pass the reference to an `HTMLElement`.
     *
     * If not specified, will be `body`.
     */
    container?: string | HTMLElement;
    /**
     * If `true` modal will always be displayed in fullscreen mode.
     *
     * For values like `'md'` it means that modal will be displayed in fullscreen mode
     * only if the viewport width is below `'md'`. For custom strings (ex. when passing `'mysize'`)
     * it will add a `'modal-fullscreen-mysize-down'` class.
     *
     * If not specified will be `false`.
     *
     * @since 12.1.0
     */
    fullscreen?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string;
    /**
     * The `Injector` to use for modal content.
     */
    injector?: Injector;
    /**
     * If `true`, the modal will be closed when `Escape` key is pressed
     *
     * Default value is `true`.
     */
    keyboard?: boolean;
    /**
     * `role` attribute value to set on the modal window.
     *
     * Default value is `dialog`.
     *
     * @since 18.0.0
     */
    role?: 'alertdialog' | 'dialog';
    /**
     * Scrollable modal content (false by default).
     *
     * @since 5.0.0
     */
    scrollable?: boolean;
    /**
     * Size of a new modal window.
     */
    size?: 'sm' | 'lg' | 'xl' | string;
    /**
     * A custom class to append to the modal window.
     */
    windowClass?: string;
    /**
     * A custom class to append to the modal dialog.
     *
     * @since 9.1.0
     */
    modalDialogClass?: string;
    /**
     * A custom class to append to the modal backdrop.
     *
     * @since 1.1.0
     */
    backdropClass?: string;
}
/**
 * Options that can be changed on an opened modal with `NgbModalRef.update()` and `NgbActiveModal.update()` methods.
 *
 * @since 14.2.0
 */
type NgbModalUpdatableOptions = Pick<NgbModalOptions, 'ariaLabelledBy' | 'ariaDescribedBy' | 'centered' | 'fullscreen' | 'backdropClass' | 'size' | 'windowClass' | 'modalDialogClass'>;
/**
 * A configuration service for the [`NgbModal`](#/components/modal/api#NgbModal) service.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all modals used in the application.
 *
 * @since 3.1.0
 */
declare class NgbModalConfig implements Required<NgbModalOptions> {
    private _ngbConfig;
    private _animation;
    ariaLabelledBy: string;
    ariaDescribedBy: string;
    backdrop: boolean | 'static';
    beforeDismiss: () => boolean | Promise<boolean>;
    centered: boolean;
    container: string | HTMLElement;
    fullscreen: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string;
    injector: Injector;
    keyboard: boolean;
    role: 'alertdialog' | 'dialog';
    scrollable: boolean;
    size: 'sm' | 'lg' | 'xl' | string;
    windowClass: string;
    modalDialogClass: string;
    backdropClass: string;
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbModalConfig>;
}

declare class NgbModalBackdrop implements OnInit {
    private _nativeElement;
    private _zone;
    private _injector;
    private _cdRef;
    animation: boolean;
    backdropClass: string;
    ngOnInit(): void;
    hide(): Observable<void>;
    updateOptions(options: NgbModalUpdatableOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalBackdrop, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbModalBackdrop, "ngb-modal-backdrop", never, { "animation": { "alias": "animation"; "required": false; }; "backdropClass": { "alias": "backdropClass"; "required": false; }; }, {}, never, never, true, never>;
}

declare class NgbModalWindow implements OnInit, OnDestroy {
    private _document;
    private _elRef;
    private _zone;
    private _injector;
    private _cdRef;
    private _closed$;
    private _elWithFocus;
    private _dialogEl;
    animation: boolean;
    ariaLabelledBy: string;
    ariaDescribedBy: string;
    backdrop: boolean | string;
    centered: string;
    fullscreen: string | boolean;
    keyboard: boolean;
    role: string;
    scrollable: string;
    size: string;
    windowClass: string;
    modalDialogClass: string;
    dismissEvent: EventEmitter<any>;
    shown: Subject<void>;
    hidden: Subject<void>;
    get fullscreenClass(): string;
    dismiss(reason: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    hide(): Observable<any>;
    updateOptions(options: NgbModalUpdatableOptions): void;
    private _show;
    private _enableEventHandling;
    private _disableEventHandling;
    private _setFocus;
    private _restoreFocus;
    private _bumpBackdrop;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalWindow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbModalWindow, "ngb-modal-window", never, { "animation": { "alias": "animation"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; "ariaDescribedBy": { "alias": "ariaDescribedBy"; "required": false; }; "backdrop": { "alias": "backdrop"; "required": false; }; "centered": { "alias": "centered"; "required": false; }; "fullscreen": { "alias": "fullscreen"; "required": false; }; "keyboard": { "alias": "keyboard"; "required": false; }; "role": { "alias": "role"; "required": false; }; "scrollable": { "alias": "scrollable"; "required": false; }; "size": { "alias": "size"; "required": false; }; "windowClass": { "alias": "windowClass"; "required": false; }; "modalDialogClass": { "alias": "modalDialogClass"; "required": false; }; }, { "dismissEvent": "dismiss"; }, never, ["*"], true, never>;
}

declare class ContentRef {
    nodes: Node[][];
    viewRef?: ViewRef | undefined;
    componentRef?: ComponentRef<any> | undefined;
    constructor(nodes: Node[][], viewRef?: ViewRef | undefined, componentRef?: ComponentRef<any> | undefined);
}

/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.update()`, `.close()` or `.dismiss()` the modal window from your component.
 */
declare class NgbActiveModal {
    /**
     * Updates options of an opened modal.
     *
     * @since 14.2.0
     */
    update(options: NgbModalUpdatableOptions): void;
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbModalRef.result` promise will be resolved with the provided value.
     */
    close(result?: any): void;
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason?: any): void;
}
/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
declare class NgbModalRef {
    private _windowCmptRef;
    private _contentRef;
    private _backdropCmptRef?;
    private _beforeDismiss?;
    private _closed;
    private _dismissed;
    private _hidden;
    private _resolve;
    private _reject;
    /**
     * Updates options of an opened modal.
     *
     * @since 14.2.0
     */
    update(options: NgbModalUpdatableOptions): void;
    /**
     * The instance of a component used for the modal content.
     *
     * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
     */
    get componentInstance(): any;
    /**
     * The promise that is resolved when the modal is closed and rejected when the modal is dismissed.
     */
    result: Promise<any>;
    /**
     * The observable that emits when the modal is closed via the `.close()` method.
     *
     * It will emit the result passed to the `.close()` method.
     *
     * @since 8.0.0
     */
    get closed(): Observable<any>;
    /**
     * The observable that emits when the modal is dismissed via the `.dismiss()` method.
     *
     * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
     * reasons like backdrop click or ESC key press.
     *
     * @since 8.0.0
     */
    get dismissed(): Observable<any>;
    /**
     * The observable that emits when both modal window and backdrop are closed and animations were finished.
     * At this point modal and backdrop elements will be removed from the DOM tree.
     *
     * This observable will be completed after emitting.
     *
     * @since 8.0.0
     */
    get hidden(): Observable<void>;
    /**
     * The observable that emits when modal is fully visible and animation was finished.
     * Modal DOM element is always available synchronously after calling 'modal.open()' service.
     *
     * This observable will be completed after emitting.
     * It will not emit, if modal is closed before open animation is finished.
     *
     * @since 8.0.0
     */
    get shown(): Observable<void>;
    constructor(_windowCmptRef: ComponentRef<NgbModalWindow>, _contentRef: ContentRef, _backdropCmptRef?: ComponentRef<NgbModalBackdrop> | undefined, _beforeDismiss?: (() => boolean | Promise<boolean>) | undefined);
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    close(result?: any): void;
    private _dismiss;
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason?: any): void;
    private _removeModalElements;
}

/**
 * A service for opening modal windows.
 *
 * Creating a modal is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 */
declare class NgbModal {
    private _injector;
    private _modalStack;
    private _config;
    /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     */
    open(content: any, options?: NgbModalOptions): NgbModalRef;
    /**
     * Returns an observable that holds the active modal instances.
     */
    get activeInstances(): i0.EventEmitter<NgbModalRef[]>;
    /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * @since 3.1.0
     */
    dismissAll(reason?: any): void;
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * @since 3.3.0
     */
    hasOpenModals(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModal, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbModal>;
}

declare enum ModalDismissReasons {
    BACKDROP_CLICK = 0,
    ESC = 1
}

declare class NgbModalModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbModalModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbModalModule>;
}

/**
 * Context passed to the nav content template.
 *
 * See [this demo](#/components/nav/examples#keep-content) as the example.
 *
 * @since 5.2.0
 */
interface NgbNavContentContext {
    /**
     * If `true`, current nav content is visible and active
     */
    $implicit: boolean;
}
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * @since 5.2.0
 */
declare class NgbNavContent {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavContent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavContent, "ng-template[ngbNavContent]", never, {}, {}, never, never, true, never>;
}
/**
 * This directive applies a specific role on a non-container based ngbNavItem.
 *
 * @since 14.1.0
 */
declare class NgbNavItemRole {
    role: string;
    nav: NgbNav;
    constructor(role: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavItemRole, [{ attribute: "role"; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavItemRole, "[ngbNavItem]:not(ng-container)", never, {}, {}, never, never, true, never>;
}
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * @since 5.2.0
 */
declare class NgbNavItem implements OnInit {
    private _nav;
    private _nativeElement;
    /**
     * If `true`, non-active current nav item content will be removed from DOM
     * Otherwise it will just be hidden
     */
    destroyOnHide: any;
    /**
     * If `true`, the current nav item is disabled and can't be toggled by user.
     *
     * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
     */
    disabled: boolean;
    /**
     * The id used for the DOM elements.
     * Must be unique inside the document in case you have multiple `ngbNav`s on the page.
     *
     * Autogenerated as `ngb-nav-XXX` if not provided.
     */
    domId: string;
    /**
     * The id used as a model for active nav.
     * It can be anything, but must be unique inside one `ngbNav`.
     *
     * The only limitation is that it is not possible to have the `''` (empty string) as id,
     * because ` ngbNavItem `, `ngbNavItem=''` and `[ngbNavItem]="''"` are indistinguishable
     */
    _id: any;
    /**
     * An event emitted when the fade in transition is finished on the related nav content
     *
     * @since 8.0.0
     */
    shown: EventEmitter<void>;
    /**
     * An event emitted when the fade out transition is finished on the related nav content
     *
     * @since 8.0.0
     */
    hidden: EventEmitter<void>;
    contentTpl?: NgbNavContent;
    ngOnInit(): void;
    get active(): boolean;
    get id(): any;
    get panelDomId(): string;
    isPanelInDom(): boolean;
    /**
     * @internal
     */
    isNgContainer(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavItem, "[ngbNavItem]", ["ngbNavItem"], { "destroyOnHide": { "alias": "destroyOnHide"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "domId": { "alias": "domId"; "required": false; }; "_id": { "alias": "ngbNavItem"; "required": false; }; }, { "shown": "shown"; "hidden": "hidden"; }, ["contentTpl"], never, true, never>;
}
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * @since 5.2.0
 */
declare class NgbNav implements AfterContentInit, OnChanges {
    role: string;
    static ngAcceptInputType_orientation: string;
    static ngAcceptInputType_roles: boolean | string;
    private _config;
    private _cd;
    private _document;
    private _nativeElement;
    destroyRef: DestroyRef;
    _navigatingWithKeyboard: boolean;
    /**
     * The id of the nav that should be active
     *
     * You could also use the `.select()` method and the `(navChange)` event
     */
    activeId: any;
    /**
     * The event emitted after the active nav changes
     * The payload of the event is the newly active nav id
     *
     * If you want to prevent nav change, you should use `(navChange)` event
     */
    activeIdChange: EventEmitter<any>;
    /**
     * If `true`, nav change will be animated.
     *
     * @since 8.0.0
     */
    animation: boolean;
    /**
     * If `true`, non-active nav content will be removed from DOM
     * Otherwise it will just be hidden
     */
    destroyOnHide: boolean;
    /**
     * The orientation of navs.
     *
     * Using `vertical` will also add the `aria-orientation` attribute
     */
    orientation: "horizontal" | "vertical";
    /**
     * Role attribute generating strategy:
     * - `false` - no role attributes will be generated
     * - `'tablist'` - 'tablist', 'tab' and 'tabpanel' will be generated (default)
     */
    roles: false | "tablist";
    /**
     * Keyboard support for nav focus/selection using arrow keys.
     *
     * * `true` - navs will be focused using keyboard arrow keys
     * * `false` - no keyboard support
     * * `'changeWithArrows'` -  nav will be selected using keyboard arrow keys
     *
     * See the [list of available keyboard shortcuts](#/components/nav/overview#keyboard-shortcuts).
     *
     * @since 6.1.0
     */
    keyboard: boolean | "changeWithArrows";
    /**
     * An event emitted when the fade in transition is finished for one of the items.
     *
     * Payload of the event is the nav id that was just shown.
     *
     * @since 8.0.0
     */
    shown: EventEmitter<any>;
    /**
     * An event emitted when the fade out transition is finished for one of the items.
     *
     * Payload of the event is the nav id that was just hidden.
     *
     * @since 8.0.0
     */
    hidden: EventEmitter<any>;
    items: QueryList<NgbNavItem>;
    links: QueryList<NgbNavLinkBase>;
    navItemChange$: Subject<NgbNavItem | null>;
    constructor(role: string);
    /**
     * The nav change event emitted right before the nav change happens on user click.
     *
     * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
     *
     * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
     */
    navChange: EventEmitter<NgbNavChangeEvent<any>>;
    click(item: NgbNavItem): void;
    onFocusout({ relatedTarget }: FocusEvent): void;
    onKeyDown(event: KeyboardEvent): void;
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(id: any): void;
    ngAfterContentInit(): void;
    ngOnChanges({ activeId }: SimpleChanges): void;
    private _updateActiveId;
    private _notifyItemChanged;
    private _getItemById;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNav, [{ attribute: "role"; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNav, "[ngbNav]", ["ngbNav"], { "activeId": { "alias": "activeId"; "required": false; }; "animation": { "alias": "animation"; "required": false; }; "destroyOnHide": { "alias": "destroyOnHide"; "required": false; }; "orientation": { "alias": "orientation"; "required": false; }; "roles": { "alias": "roles"; "required": false; }; "keyboard": { "alias": "keyboard"; "required": false; }; }, { "activeIdChange": "activeIdChange"; "shown": "shown"; "hidden": "hidden"; "navChange": "navChange"; }, ["items", "links"], never, true, never>;
}
declare class NgbNavLinkBase {
    role: string;
    navItem: NgbNavItem;
    nav: NgbNav;
    nativeElement: HTMLElement;
    constructor(role: string);
    get tabindex(): -1 | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavLinkBase, [{ attribute: "role"; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavLinkBase, "[ngbNavLink]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to mark the nav link when used on a button element.
 */
declare class NgbNavLinkButton extends NgbNavLinkBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavLinkButton, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavLinkButton, "button[ngbNavLink]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to mark the nav link when used on a link element.
 *
 * @since 5.2.0
 */
declare class NgbNavLink extends NgbNavLinkBase {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavLink, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavLink, "a[ngbNavLink]", never, {}, {}, never, never, true, never>;
}
/**
 * The payload of the change event emitted right before the nav change happens on user click.
 *
 * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
 *
 * @since 5.2.0
 */
interface NgbNavChangeEvent<T = any> {
    /**
     * Id of the currently active nav.
     */
    activeId: T;
    /**
     * Id of the newly selected nav.
     */
    nextId: T;
    /**
     * Function that will prevent nav change if called.
     */
    preventDefault: () => void;
}

declare class NgbNavPane {
    nativeElement: HTMLElement;
    item: NgbNavItem;
    nav: NgbNav;
    role: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavPane, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbNavPane, "[ngbNavPane]", never, { "item": { "alias": "item"; "required": false; }; "nav": { "alias": "nav"; "required": false; }; "role": { "alias": "role"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
declare class NgbNavOutlet implements AfterViewInit {
    private _cd;
    private _ngZone;
    private _activePane;
    private _panes;
    /**
     * A role to set on the nav pane
     */
    paneRole: any;
    /**
     * Reference to the `NgbNav`
     */
    nav: NgbNav;
    isPanelTransitioning(item: NgbNavItem): boolean;
    ngAfterViewInit(): void;
    private _updateActivePane;
    private _getPaneForItem;
    private _getActivePane;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavOutlet, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbNavOutlet, "[ngbNavOutlet]", never, { "paneRole": { "alias": "paneRole"; "required": false; }; "nav": { "alias": "ngbNavOutlet"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * A configuration service for the [`NgbNav`](#/components/nav/api#NgbNav) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the navs used in the application.
 *
 * @since 5.2.0
 */
declare class NgbNavConfig {
    private _ngbConfig;
    private _animation;
    destroyOnHide: boolean;
    orientation: 'horizontal' | 'vertical';
    roles: 'tablist' | false;
    keyboard: boolean | 'changeWithArrows';
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbNavConfig>;
}

declare class NgbNavModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbNavModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbNavModule, never, [typeof NgbNavContent, typeof NgbNav, typeof NgbNavItem, typeof NgbNavItemRole, typeof NgbNavLink, typeof NgbNavLinkButton, typeof NgbNavLinkBase, typeof NgbNavOutlet, typeof NgbNavPane], [typeof NgbNavContent, typeof NgbNav, typeof NgbNavItem, typeof NgbNavItemRole, typeof NgbNavLink, typeof NgbNavLinkButton, typeof NgbNavLinkBase, typeof NgbNavOutlet, typeof NgbNavPane]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbNavModule>;
}

/**
 * Options available when opening new offcanvas windows with `NgbOffcanvas.open()` method.
 *
 * @since 12.1.0
 */
interface NgbOffcanvasOptions {
    /**
     * If `true`, opening and closing will be animated.
     */
    animation?: boolean;
    /**
     * `aria-describedby` attribute value to set on the offcanvas panel.
     */
    ariaDescribedBy?: string;
    /**
     * `aria-labelledby` attribute value to set on the offcanvas panel.
     */
    ariaLabelledBy?: string;
    /**
     * If `true`, the backdrop element will be created for a given offcanvas.
     * If 'static', clicking the backdrop won't close the offcanvas (available since 13.1.0).
     *
     * Default value is `true`.
     */
    backdrop?: boolean | 'static';
    /**
     * A custom class to append to the offcanvas backdrop.
     */
    backdropClass?: string;
    /**
     * Callback right before the offcanvas will be dismissed.
     *
     * If this function returns:
     * * `false`
     * * a promise resolved with `false`
     * * a promise that is rejected
     *
     * then the offcanvas won't be dismissed.
     */
    beforeDismiss?: () => boolean | Promise<boolean>;
    /**
     * A selector specifying the element all new offcanvas panels and backdrops should be appended to.
     *
     * If not specified, will be `body`.
     */
    container?: string | HTMLElement;
    /**
     * The `Injector` to use for offcanvas content.
     */
    injector?: Injector;
    /**
     * If `true`, the offcanvas will be closed when `Escape` key is pressed
     *
     * Default value is `true`.
     */
    keyboard?: boolean;
    /**
     * A custom class to append to the offcanvas panel.
     */
    panelClass?: string;
    /**
     * The position of the offcanvas
     */
    position?: 'start' | 'end' | 'top' | 'bottom';
    /**
     * Scroll content while offcanvas is open (false by default).
     */
    scroll?: boolean;
}
/**
 * A configuration service for the [`NgbOffcanvas`](#/components/offcanvas/api#NgbOffcanvas) service.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all offcanvases used in the application.
 *
 * @since 12.1.0
 */
declare class NgbOffcanvasConfig implements Required<NgbOffcanvasOptions> {
    private _ngbConfig;
    private _animation;
    ariaDescribedBy: string;
    ariaLabelledBy: string;
    backdrop: boolean | 'static';
    backdropClass: string;
    beforeDismiss: () => boolean | Promise<boolean>;
    container: string | HTMLElement;
    injector: Injector;
    keyboard: boolean;
    panelClass: string;
    position: 'start' | 'end' | 'top' | 'bottom';
    scroll: boolean;
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbOffcanvasConfig>;
}

declare class NgbOffcanvasBackdrop implements OnInit {
    private _nativeElement;
    private _zone;
    private _injector;
    animation: boolean;
    backdropClass: string;
    static: boolean;
    dismissEvent: EventEmitter<any>;
    ngOnInit(): void;
    hide(): Observable<void>;
    dismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasBackdrop, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbOffcanvasBackdrop, "ngb-offcanvas-backdrop", never, { "animation": { "alias": "animation"; "required": false; }; "backdropClass": { "alias": "backdropClass"; "required": false; }; "static": { "alias": "static"; "required": false; }; }, { "dismissEvent": "dismiss"; }, never, never, true, never>;
}

declare class NgbOffcanvasPanel implements OnInit, OnDestroy {
    private _document;
    private _elRef;
    private _zone;
    private _injector;
    private _closed$;
    private _elWithFocus;
    animation: boolean;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    keyboard: boolean;
    panelClass: string;
    position: 'start' | 'end' | 'top' | 'bottom';
    dismissEvent: EventEmitter<any>;
    shown: Subject<void>;
    hidden: Subject<void>;
    dismiss(reason: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    hide(): Observable<any>;
    private _show;
    private _enableEventHandling;
    private _disableEventHandling;
    private _setFocus;
    private _restoreFocus;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasPanel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbOffcanvasPanel, "ngb-offcanvas-panel", never, { "animation": { "alias": "animation"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; "ariaDescribedBy": { "alias": "ariaDescribedBy"; "required": false; }; "keyboard": { "alias": "keyboard"; "required": false; }; "panelClass": { "alias": "panelClass"; "required": false; }; "position": { "alias": "position"; "required": false; }; }, { "dismissEvent": "dismiss"; }, never, ["*"], true, never>;
}

/**
 * A reference to the currently opened (active) offcanvas.
 *
 * Instances of this class can be injected into your component passed as offcanvas content.
 * So you can `.close()` or `.dismiss()` the offcanvas window from your component.
 *
 * @since 12.1.0
 */
declare class NgbActiveOffcanvas {
    /**
     * Closes the offcanvas with an optional `result` value.
     *
     * The `NgbOffcanvasRef.result` promise will be resolved with the provided value.
     */
    close(result?: any): void;
    /**
     * Dismisses the offcanvas with an optional `reason` value.
     *
     * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason?: any): void;
}
/**
 * A reference to the newly opened offcanvas returned by the `NgbOffcanvas.open()` method.
 *
 * @since 12.1.0
 */
declare class NgbOffcanvasRef {
    private _panelCmptRef;
    private _contentRef;
    private _backdropCmptRef?;
    private _beforeDismiss?;
    private _closed;
    private _dismissed;
    private _hidden;
    private _resolve;
    private _reject;
    /**
     * The instance of a component used for the offcanvas content.
     *
     * When a `TemplateRef` is used as the content or when the offcanvas is closed, will return `undefined`.
     */
    get componentInstance(): any;
    /**
     * The promise that is resolved when the offcanvas is closed and rejected when the offcanvas is dismissed.
     */
    result: Promise<any>;
    /**
     * The observable that emits when the offcanvas is closed via the `.close()` method.
     *
     * It will emit the result passed to the `.close()` method.
     */
    get closed(): Observable<any>;
    /**
     * The observable that emits when the offcanvas is dismissed via the `.dismiss()` method.
     *
     * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
     * reasons like backdrop click or ESC key press.
     */
    get dismissed(): Observable<any>;
    /**
     * The observable that emits when both offcanvas window and backdrop are closed and animations were finished.
     * At this point offcanvas and backdrop elements will be removed from the DOM tree.
     *
     * This observable will be completed after emitting.
     */
    get hidden(): Observable<void>;
    /**
     * The observable that emits when offcanvas is fully visible and animation was finished.
     * The offcanvas DOM element is always available synchronously after calling 'offcanvas.open()' service.
     *
     * This observable will be completed after emitting.
     * It will not emit, if offcanvas is closed before open animation is finished.
     */
    get shown(): Observable<void>;
    constructor(_panelCmptRef: ComponentRef<NgbOffcanvasPanel>, _contentRef: ContentRef, _backdropCmptRef?: ComponentRef<NgbOffcanvasBackdrop> | undefined, _beforeDismiss?: (() => boolean | Promise<boolean>) | undefined);
    /**
     * Closes the offcanvas with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    close(result?: any): void;
    private _dismiss;
    /**
     * Dismisses the offcanvas with an optional `reason` value.
     *
     * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason?: any): void;
    private _removeOffcanvasElements;
}

/**
 * A service for opening an offcanvas.
 *
 * Creating an offcanvas is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 *
 * @since 12.1.0
 */
declare class NgbOffcanvas {
    private _injector;
    private _offcanvasStack;
    private _config;
    /**
     * Opens a new offcanvas panel with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveOffcanvas` class. You can then
     * use `NgbActiveOffcanvas` methods to close / dismiss offcanvas from "inside" of your component.
     *
     * Also see the [`NgbOffcanvasOptions`](#/components/offcanvas/api#NgbOffcanvasOptions) for the list of supported
     * options.
     */
    open(content: any, options?: NgbOffcanvasOptions): NgbOffcanvasRef;
    /**
     * Returns an observable that holds the active offcanvas instance.
     */
    get activeInstance(): i0.EventEmitter<NgbOffcanvasRef | undefined>;
    /**
     * Dismisses the currently displayed offcanvas with the supplied reason.
     */
    dismiss(reason?: any): void;
    /**
     * Indicates if there is currently an open offcanvas in the application.
     */
    hasOpenOffcanvas(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvas, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbOffcanvas>;
}

declare enum OffcanvasDismissReasons {
    BACKDROP_CLICK = 0,
    ESC = 1
}

declare class NgbOffcanvasModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbOffcanvasModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbOffcanvasModule>;
}

/**
 * A directive to match the 'ellipsis' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationEllipsis {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationEllipsis, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationEllipsis, "ng-template[ngbPaginationEllipsis]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'first' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationFirst {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationFirst, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationFirst, "ng-template[ngbPaginationFirst]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'last' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationLast {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationLast, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationLast, "ng-template[ngbPaginationLast]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'next' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationNext {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationNext, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationNext, "ng-template[ngbPaginationNext]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the page 'number' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationNumber {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationNumber, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationNumber, "ng-template[ngbPaginationNumber]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'previous' link template
 *
 * @since 4.1.0
 */
declare class NgbPaginationPrevious {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationPrevious, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationPrevious, "ng-template[ngbPaginationPrevious]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to match the 'pages' whole content
 *
 * @since 9.1.0
 */
declare class NgbPaginationPages {
    templateRef: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationPages, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbPaginationPages, "ng-template[ngbPaginationPages]", never, {}, {}, never, never, true, never>;
}
/**
 * A component that displays page numbers and allows to customize them in several ways.
 */
declare class NgbPagination implements OnChanges {
    private _config;
    pageCount: number;
    pages: number[];
    tplEllipsis?: NgbPaginationEllipsis;
    tplFirst?: NgbPaginationFirst;
    tplLast?: NgbPaginationLast;
    tplNext?: NgbPaginationNext;
    tplNumber?: NgbPaginationNumber;
    tplPrevious?: NgbPaginationPrevious;
    tplPages?: NgbPaginationPages;
    /**
     * If `true`, pagination links will be disabled.
     */
    disabled: boolean;
    /**
     * If `true`, the "First" and "Last" page links are shown.
     */
    boundaryLinks: boolean;
    /**
     * If `true`, the "Next" and "Previous" page links are shown.
     */
    directionLinks: boolean;
    /**
     * If `true`, the ellipsis symbols and first/last page numbers will be shown when `maxSize` > number of pages.
     */
    ellipses: boolean;
    /**
     * Whether to rotate pages when `maxSize` > number of pages.
     *
     * The current page always stays in the middle if `true`.
     */
    rotate: boolean;
    /**
     *  The number of items in your paginated collection.
     *
     *  Note, that this is not the number of pages. Page numbers are calculated dynamically based on
     *  `collectionSize` and `pageSize`. Ex. if you have 100 items in your collection and displaying 20 items per page,
     *  you'll end up with 5 pages.
     */
    collectionSize: number;
    /**
     *  The maximum number of pages to display.
     */
    maxSize: number;
    /**
     *  The current page.
     *
     *  Page numbers start with `1`.
     */
    page: number;
    /**
     *  The number of items per page.
     */
    pageSize: number;
    /**
     *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
     *
     *  Event payload is the number of the newly selected page.
     *
     *  Page numbers start with `1`.
     */
    pageChange: EventEmitter<number>;
    /**
     * The pagination display size.
     *
     * Bootstrap currently supports small and large sizes.
     *
     * If the passed value is a string (ex. 'custom'), it will just add the `pagination-custom` css class
     */
    size: string | null;
    hasPrevious(): boolean;
    hasNext(): boolean;
    nextDisabled(): boolean;
    previousDisabled(): boolean;
    selectPage(pageNumber: number): void;
    ngOnChanges(changes: SimpleChanges): void;
    isEllipsis(pageNumber: any): boolean;
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    private _applyEllipses;
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    private _applyRotation;
    /**
     * Paginates page numbers based on maxSize items per page.
     */
    private _applyPagination;
    private _setPageInRange;
    private _updatePages;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPagination, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbPagination, "ngb-pagination", never, { "disabled": { "alias": "disabled"; "required": false; }; "boundaryLinks": { "alias": "boundaryLinks"; "required": false; }; "directionLinks": { "alias": "directionLinks"; "required": false; }; "ellipses": { "alias": "ellipses"; "required": false; }; "rotate": { "alias": "rotate"; "required": false; }; "collectionSize": { "alias": "collectionSize"; "required": true; }; "maxSize": { "alias": "maxSize"; "required": false; }; "page": { "alias": "page"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "pageChange": "pageChange"; }, ["tplEllipsis", "tplFirst", "tplLast", "tplNext", "tplNumber", "tplPrevious", "tplPages"], never, true, never>;
}

/**
 * A configuration service for the [`NgbPagination`](#/components/pagination/api#NgbPagination) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
declare class NgbPaginationConfig {
    disabled: boolean;
    boundaryLinks: boolean;
    directionLinks: boolean;
    ellipses: boolean;
    maxSize: number;
    pageSize: number;
    rotate: boolean;
    size: 'sm' | 'lg' | string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbPaginationConfig>;
}

declare class NgbPaginationModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbPaginationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbPaginationModule, never, [typeof NgbPagination, typeof NgbPaginationEllipsis, typeof NgbPaginationFirst, typeof NgbPaginationLast, typeof NgbPaginationNext, typeof NgbPaginationNumber, typeof NgbPaginationPrevious, typeof NgbPaginationPages], [typeof NgbPagination, typeof NgbPaginationEllipsis, typeof NgbPaginationFirst, typeof NgbPaginationLast, typeof NgbPaginationNext, typeof NgbPaginationNumber, typeof NgbPaginationPrevious, typeof NgbPaginationPages]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbPaginationModule>;
}

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
    placement: PlacementArray;
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

/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
declare class NgbProgressbar {
    private _config;
    stacked: NgbProgressbarStacked | null;
    private _max;
    /**
     * The maximal value to be displayed in the progress bar.
     *
     * Should be a positive number. Will default to 100 otherwise.
     */
    set max(max: number);
    get max(): number;
    /**
     * If `true`, the stripes on the progress bar are animated.
     *
     * Takes effect only for browsers supporting CSS3 animations, and if `striped` is `true`.
     */
    animated: boolean;
    /**
     * The accessible progress bar name.
     *
     * @since 13.1.0
     */
    ariaLabel: string;
    /**
     * If `true`, the progress bars will be displayed as striped.
     */
    striped: boolean;
    /**
     * If `true`, the current percentage will be shown in the `xx%` format.
     */
    showValue: boolean;
    /**
     * Optional text variant type of the progress bar.
     *
     * Supports types based on Bootstrap background color variants, like:
     *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
     *
     * @since 5.2.0
     */
    textType: string;
    /**
     * The type of the progress bar.
     *
     * Supports types based on Bootstrap background color variants, like:
     *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
     */
    type: string;
    /**
     * The current value for the progress bar.
     *
     * Should be in the `[0, max]` range.
     */
    value: number;
    /**
     * The height of the progress bar.
     *
     * Accepts any valid CSS height values, ex. `"2rem"`
     */
    height: string;
    constructor();
    getValue(): number;
    getPercentValue(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbProgressbar, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbProgressbar, "ngb-progressbar", never, { "max": { "alias": "max"; "required": false; }; "animated": { "alias": "animated"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "striped": { "alias": "striped"; "required": false; }; "showValue": { "alias": "showValue"; "required": false; }; "textType": { "alias": "textType"; "required": false; }; "type": { "alias": "type"; "required": false; }; "value": { "alias": "value"; "required": true; }; "height": { "alias": "height"; "required": false; }; }, {}, never, ["*"], true, never>;
}
/**
 * A directive that allow to stack progress bars.
 *
 * @since 16.0.0
 */
declare class NgbProgressbarStacked {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbProgressbarStacked, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbProgressbarStacked, "ngb-progressbar-stacked", never, {}, {}, never, ["*"], true, never>;
}

/**
 * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
declare class NgbProgressbarConfig {
    max: number;
    animated: boolean;
    ariaLabel: string;
    striped: boolean;
    textType: string;
    type: string;
    showValue: boolean;
    height: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbProgressbarConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbProgressbarConfig>;
}

declare class NgbProgressbarModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbProgressbarModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbProgressbarModule, never, [typeof NgbProgressbar, typeof NgbProgressbarStacked], [typeof NgbProgressbar, typeof NgbProgressbarStacked]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbProgressbarModule>;
}

/**
 * The context for the custom star display template defined in the `starTemplate`.
 */
interface StarTemplateContext {
    /**
     * The star fill percentage, an integer in the `[0, 100]` range.
     */
    fill: number;
    /**
     * Index of the star, starts with `0`.
     */
    index: number;
}
/**
 * A directive that helps visualising and interacting with a star rating bar.
 */
declare class NgbRating implements ControlValueAccessor, OnInit, OnChanges {
    contexts: StarTemplateContext[];
    nextRate: number;
    private _config;
    private _changeDetectorRef;
    /**
     * If `true`, the rating can't be changed or focused.
     */
    disabled: boolean;
    /**
     * The maximal rating that can be given.
     */
    max: number;
    /**
     * The current rating. Could be a decimal value like `3.75`.
     */
    rate: number;
    /**
     * If `true`, the rating can't be changed.
     */
    readonly: boolean;
    /**
     * If `true`, the rating can be reset to `0` by mouse clicking currently set rating.
     */
    resettable: boolean;
    /**
     * The template to override the way each star is displayed.
     *
     * Alternatively put an `<ng-template>` as the only child of your `<ngb-rating>` element
     */
    starTemplate: TemplateRef<StarTemplateContext>;
    starTemplateFromContent: TemplateRef<StarTemplateContext>;
    /**
     * Allows setting a custom rating tabindex.
     * If the component is disabled, `tabindex` will still be set to `-1`.
     *
     * @since 13.1.0
     */
    tabindex: string | number;
    /**
     * Allows to provide a function to set a custom aria-valuetext
     *
     * @since 14.1.0
     */
    ariaValueText(current: number, max: number): string;
    /**
     * An event emitted when the user is hovering over a given rating.
     *
     * Event payload equals to the rating being hovered over.
     */
    hover: EventEmitter<number>;
    /**
     * An event emitted when the user stops hovering over a given rating.
     *
     * Event payload equals to the rating of the last item being hovered over.
     */
    leave: EventEmitter<number>;
    /**
     * An event emitted when the rating is changed.
     *
     * Event payload equals to the newly selected rating.
     */
    rateChange: EventEmitter<number>;
    onChange: (_: any) => void;
    onTouched: () => void;
    isInteractive(): boolean;
    enter(value: number): void;
    handleBlur(): void;
    handleClick(value: number): void;
    handleKeyDown(event: KeyboardEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    reset(): void;
    setDisabledState(isDisabled: boolean): void;
    update(value: number, internalChange?: boolean): void;
    writeValue(value: any): void;
    private _updateState;
    private _updateMax;
    private _setupContexts;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbRating, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbRating, "ngb-rating", never, { "disabled": { "alias": "disabled"; "required": false; }; "max": { "alias": "max"; "required": false; }; "rate": { "alias": "rate"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "resettable": { "alias": "resettable"; "required": false; }; "starTemplate": { "alias": "starTemplate"; "required": false; }; "tabindex": { "alias": "tabindex"; "required": false; }; "ariaValueText": { "alias": "ariaValueText"; "required": false; }; }, { "hover": "hover"; "leave": "leave"; "rateChange": "rateChange"; }, ["starTemplateFromContent"], never, true, never>;
}

/**
 * A configuration service for the [`NgbRating`](#/components/rating/api#NgbRating) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ratings used in the application.
 */
declare class NgbRatingConfig {
    max: number;
    readonly: boolean;
    resettable: boolean;
    tabindex: number | string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbRatingConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbRatingConfig>;
}

declare class NgbRatingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbRatingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbRatingModule, never, [typeof NgbRating], [typeof NgbRating]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbRatingModule>;
}

type NgbScrollSpyProcessChanges = (state: {
    entries: IntersectionObserverEntry[];
    rootElement: HTMLElement;
    fragments: Set<Element>;
    scrollSpy: NgbScrollSpyService;
    options: NgbScrollSpyOptions;
}, changeActive: (active: string) => void, context: object) => void;
/**
 * Options passed to the `NgbScrollSpyService.start()` method for scrollspy initialization.
 *
 * It contains a subset of the `IntersectionObserverInit` options, as well additional optional properties
 * like `changeDetectorRef` or `fragments`
 *
 * @since 15.1.0
 */
interface NgbScrollSpyOptions extends Pick<IntersectionObserverInit, 'root' | 'rootMargin' | 'threshold'> {
    /**
     * An optional reference to the change detector, that should be marked for check when active fragment changes.
     * If it is not provided, the service will try to get it from the DI. Ex. when using the `ngbScrollSpy` directive,
     * it will mark for check the directive's host component.
     *
     * `.markForCheck()` will be called on the change detector when the active fragment changes.
     */
    changeDetectorRef?: ChangeDetectorRef;
    /**
     * An optional initial fragment to scroll to when the service starts.
     */
    initialFragment?: string | HTMLElement;
    /**
     * An optional list of fragments to observe when the service starts.
     * You can alternatively use `.addFragment()` to add fragments.
     */
    fragments?: (string | HTMLElement)[];
    /**
     * An optional function that is called when the `IntersectionObserver` detects a change.
     * It is used to determine if currently active fragment should be changed.
     *
     * You can override this function to provide your own scrollspy logic.
     * It provides:
     *  - a scrollspy `state` (observer entries, root element, fragments, scrollSpy instance, etc.)
     *  - a `changeActive` function that should be called with the new active fragment
     *  - a `context` that is persisted between calls
     */
    processChanges?: NgbScrollSpyProcessChanges;
    /**
     * An optional `IntersectionObserver` root element. If not provided, the document element will be used.
     */
    root?: HTMLElement;
    /**
     * An optional `IntersectionObserver` margin for the root element.
     */
    rootMargin?: string;
    /**
     * An optional default scroll behavior to use when using the `.scrollTo()` method.
     */
    scrollBehavior?: 'auto' | 'smooth';
    /**
     * An optional `IntersectionObserver` threshold.
     */
    threshold?: number | number[];
}
/**
 * Scroll options passed to the `.scrollTo()` method.
 * An extension of the standard `ScrollOptions` interface.
 *
 * @since 15.1.0
 */
interface NgbScrollToOptions extends ScrollOptions {
    /**
     * Scroll behavior as defined in the `ScrollOptions` interface.
     */
    behavior?: 'auto' | 'smooth';
}
/**
 * A scrollspy service that allows tracking of elements scrolling in and out of view.
 *
 * It can be instantiated manually, or automatically by the `ngbScrollSpy` directive.
 *
 * @since 15.1.0
 */
declare class NgbScrollSpyService implements NgbScrollSpyRef, OnDestroy {
    private _observer;
    private _containerElement;
    private _fragments;
    private _preRegisteredFragments;
    private _active$;
    private _distinctActive$;
    private _active;
    private _config;
    private _document;
    private _platformId;
    private _scrollBehavior;
    private _diChangeDetectorRef;
    private _changeDetectorRef;
    private _zone;
    constructor();
    /**
     * Getter for the currently active fragment id. Returns empty string if none.
     */
    get active(): string;
    /**
     * An observable emitting the currently active fragment. Emits empty string if none.
     */
    get active$(): Observable<string>;
    /**
     * Starts the scrollspy service and observes specified fragments.
     *
     * You can specify a list of options to pass, like the root element, initial fragment, scroll behavior, etc.
     * See the [`NgbScrollSpyOptions`](#/components/scrollspy/api#NgbScrollSpyOptions) interface for more details.
     */
    start(options?: NgbScrollSpyOptions): void;
    /**
     * Stops the service and unobserves all fragments.
     */
    stop(): void;
    /**
     * Scrolls to a fragment, it must be known to the service and contained in the root element.
     * An id or an element reference can be passed.
     *
     * [`NgbScrollToOptions`](#/components/scrollspy/api#NgbScrollToOptions) can be passed.
     */
    scrollTo(fragment: string | HTMLElement, options?: NgbScrollToOptions): void;
    /**
     * Adds a fragment to observe. It must be contained in the root element.
     * An id or an element reference can be passed.
     */
    observe(fragment: string | HTMLElement): void;
    /**
     * Unobserves a fragment.
     * An id or an element reference can be passed.
     */
    unobserve(fragment: string | HTMLElement): void;
    ngOnDestroy(): void;
    private _cleanup;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbScrollSpyService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbScrollSpyService>;
}

/**
 * Common interface for the scroll spy API.
 *
 * @internal
 */
interface NgbScrollSpyRef {
    get active(): string;
    get active$(): Observable<string>;
    scrollTo(fragment: string | HTMLElement, options?: NgbScrollToOptions): void;
}
/**
 * A helper directive to that links menu items and fragments together.
 *
 * It will automatically add the `.active` class to the menu item when the associated fragment becomes active.
 *
 * @since 15.1.0
 */
declare class NgbScrollSpyItem implements OnInit {
    private _changeDetector;
    private _scrollSpyMenu;
    private _scrollSpyAPI;
    private _destroyRef;
    private _isActive;
    /**
     * References the scroll spy directive, the id of the associated fragment and the parent menu item.
     *
     * Can be used like:
     *  - `ngbScrollSpyItem="fragmentId"`
     *  - `[ngbScrollSpyItem]="scrollSpy" fragment="fragmentId"
     *  - `[ngbScrollSpyItem]="[scrollSpy, 'fragmentId']"` parent="parentId"`
     *  - `[ngbScrollSpyItem]="[scrollSpy, 'fragmentId', 'parentId']"`
     *
     *  As well as together with `[fragment]` and `[parent]` inputs.
     */
    set data(data: NgbScrollSpy | string | [NgbScrollSpy, string, string?]);
    /**
     * The id of the associated fragment.
     */
    fragment: string;
    /**
     * The id of the parent scroll spy menu item.
     */
    parent: string | undefined;
    ngOnInit(): void;
    /**
     * @internal
     */
    _activate(): void;
    /**
     * @internal
     */
    _deactivate(): void;
    /**
     * Returns `true`, if the associated fragment is active.
     */
    isActive(): boolean;
    /**
     * Scrolls to the associated fragment.
     */
    scrollTo(options?: NgbScrollToOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbScrollSpyItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbScrollSpyItem, "[ngbScrollSpyItem]", ["ngbScrollSpyItem"], { "data": { "alias": "ngbScrollSpyItem"; "required": false; }; "fragment": { "alias": "fragment"; "required": false; }; "parent": { "alias": "parent"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * An optional scroll spy menu directive to build hierarchical menus
 * and simplify the [`NgbScrollSpyItem`](#/components/scrollspy/api#NgbScrollSpyItem) configuration.
 *
 * @since 15.1.0
 */
declare class NgbScrollSpyMenu implements NgbScrollSpyRef, AfterViewInit {
    private _scrollSpyRef;
    private _destroyRef;
    private _map;
    private _lastActiveItem;
    private _items;
    set scrollSpy(scrollSpy: NgbScrollSpy);
    get active(): string;
    get active$(): Observable<string>;
    scrollTo(fragment: string, options?: NgbScrollToOptions): void;
    getItem(id: string): NgbScrollSpyItem | undefined;
    ngAfterViewInit(): void;
    private _rebuildMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbScrollSpyMenu, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbScrollSpyMenu, "[ngbScrollSpyMenu]", never, { "scrollSpy": { "alias": "ngbScrollSpyMenu"; "required": false; }; }, {}, ["_items"], never, true, never>;
}
/**
 * A directive to put on a scrollable container.
 *
 * It will instantiate a [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
 *
 * @since 15.1.0
 */
declare class NgbScrollSpy implements NgbScrollSpyRef, AfterViewInit {
    static ngAcceptInputType_scrollBehavior: string;
    private _initialFragment;
    private _service;
    private _nativeElement;
    /**
     * A function that is called when the `IntersectionObserver` detects a change.
     *
     * See [`NgbScrollSpyOptions`](#/components/scrollspy/api#NgbScrollSpyOptions) for more details.
     */
    processChanges: NgbScrollSpyProcessChanges;
    /**
     * An `IntersectionObserver` root margin.
     */
    rootMargin: string;
    /**
     * The scroll behavior for the `.scrollTo()` method.
     */
    scrollBehavior: 'auto' | 'smooth';
    /**
     * An `IntersectionObserver` threshold.
     */
    threshold: number | number[];
    set active(fragment: string);
    /**
     * An event raised when the active section changes.
     *
     * Payload is the id of the new active section, empty string if none.
     */
    activeChange: Observable<string>;
    /**
     * Getter/setter for the currently active fragment id.
     */
    get active(): string;
    /**
     * Returns an observable that emits currently active section id.
     */
    get active$(): Observable<string>;
    ngAfterViewInit(): void;
    /**
     * @internal
     */
    _registerFragment(fragment: NgbScrollSpyFragment): void;
    /**
     * @internal
     */
    _unregisterFragment(fragment: NgbScrollSpyFragment): void;
    /**
     * Scrolls to a fragment that is identified by the `ngbScrollSpyFragment` directive.
     * An id or an element reference can be passed.
     */
    scrollTo(fragment: string | HTMLElement, options?: NgbScrollToOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbScrollSpy, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbScrollSpy, "[ngbScrollSpy]", ["ngbScrollSpy"], { "processChanges": { "alias": "processChanges"; "required": false; }; "rootMargin": { "alias": "rootMargin"; "required": false; }; "scrollBehavior": { "alias": "scrollBehavior"; "required": false; }; "threshold": { "alias": "threshold"; "required": false; }; "active": { "alias": "active"; "required": false; }; }, { "activeChange": "activeChange"; }, never, never, true, never>;
}
/**
 * A directive to put on a fragment observed inside a scrollspy container.
 *
 * @since 15.1.0
 */
declare class NgbScrollSpyFragment implements AfterViewInit {
    private _destroyRef;
    private _scrollSpy;
    /**
     * The unique id of the fragment.
     * It must be a string unique to the document, as it will be set as the id of the element.
     */
    id: string;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbScrollSpyFragment, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbScrollSpyFragment, "[ngbScrollSpyFragment]", never, { "id": { "alias": "ngbScrollSpyFragment"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * A configuration service for the [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all scrollspies used in the application.
 *
 * @since 15.1.0
 */
declare class NgbScrollSpyConfig {
    scrollBehavior: 'auto' | 'smooth';
    processChanges: NgbScrollSpyProcessChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbScrollSpyConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbScrollSpyConfig>;
}

declare class NgbScrollSpyModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbScrollSpyModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbScrollSpyModule, never, [typeof NgbScrollSpy, typeof NgbScrollSpyItem, typeof NgbScrollSpyFragment, typeof NgbScrollSpyMenu], [typeof NgbScrollSpy, typeof NgbScrollSpyItem, typeof NgbScrollSpyFragment, typeof NgbScrollSpyMenu]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbScrollSpyModule>;
}

declare class NgbTime {
    hour: number;
    minute: number;
    second: number;
    constructor(hour?: number, minute?: number, second?: number);
    changeHour(step?: number): void;
    updateHour(hour: number): void;
    changeMinute(step?: number): void;
    updateMinute(minute: number): void;
    changeSecond(step?: number): void;
    updateSecond(second: number): void;
    isValid(checkSecs?: boolean): boolean;
    toString(): string;
}

/**
 * A configuration service for the [`NgbTimepicker`](#/components/timepicker/api#NgbTimepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
declare class NgbTimepickerConfig {
    meridian: boolean;
    spinners: boolean;
    seconds: boolean;
    hourStep: number;
    minuteStep: number;
    secondStep: number;
    disabled: boolean;
    readonlyInputs: boolean;
    size: 'small' | 'medium' | 'large';
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimepickerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTimepickerConfig>;
}

/**
 * An interface for the time model used by the timepicker.
 */
interface NgbTimeStruct {
    /**
     * The hour in the `[0, 23]` range.
     */
    hour: number;
    /**
     * The minute in the `[0, 59]` range.
     */
    minute: number;
    /**
     * The second in the `[0, 59]` range.
     */
    second: number;
}

/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
declare abstract class NgbTimeAdapter<T> {
    /**
     * Converts a user-model time of type `T` to an `NgbTimeStruct` for internal use.
     */
    abstract fromModel(value: T | null): NgbTimeStruct | null;
    /**
     * Converts an internal `NgbTimeStruct` time to a user-model time of type `T`.
     */
    abstract toModel(time: NgbTimeStruct | null): T | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimeAdapter<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTimeAdapter<any>>;
}

/**
 * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 */
declare abstract class NgbTimepickerI18n {
    /**
     * Returns the name for the period before midday.
     */
    abstract getMorningPeriod(): string;
    /**
     * Returns the name for the period after midday.
     */
    abstract getAfternoonPeriod(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimepickerI18n, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTimepickerI18n>;
}

/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
declare class NgbTimepicker implements ControlValueAccessor, OnChanges {
    private readonly _config;
    private _ngbTimeAdapter;
    private _cd;
    i18n: NgbTimepickerI18n;
    static ngAcceptInputType_size: string;
    disabled: boolean;
    model?: NgbTime;
    private _hourStep;
    private _minuteStep;
    private _secondStep;
    /**
     * Whether to display 12H or 24H mode.
     */
    meridian: boolean;
    /**
     * If `true`, the spinners above and below inputs are visible.
     */
    spinners: boolean;
    /**
     * If `true`, it is possible to select seconds.
     */
    seconds: boolean;
    /**
     * The number of hours to add/subtract when clicking hour spinners.
     */
    set hourStep(step: number);
    get hourStep(): number;
    /**
     * The number of minutes to add/subtract when clicking minute spinners.
     */
    set minuteStep(step: number);
    get minuteStep(): number;
    /**
     * The number of seconds to add/subtract when clicking second spinners.
     */
    set secondStep(step: number);
    get secondStep(): number;
    /**
     * If `true`, the timepicker is readonly and can't be changed.
     */
    readonlyInputs: boolean;
    /**
     * The size of inputs and buttons.
     */
    size: 'small' | 'medium' | 'large';
    constructor(_config: NgbTimepickerConfig, _ngbTimeAdapter: NgbTimeAdapter<any>, _cd: ChangeDetectorRef, i18n: NgbTimepickerI18n);
    onChange: (_: any) => void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * Increments the hours by the given step.
     */
    changeHour(step: number): void;
    /**
     * Increments the minutes by the given step.
     */
    changeMinute(step: number): void;
    /**
     * Increments the seconds by the given step.
     */
    changeSecond(step: number): void;
    /**
     * Update hours with the new value.
     */
    updateHour(newVal: string): void;
    /**
     * Update minutes with the new value.
     */
    updateMinute(newVal: string): void;
    /**
     * Update seconds with the new value.
     */
    updateSecond(newVal: string): void;
    toggleMeridian(): void;
    formatInput(input: HTMLInputElement): void;
    formatHour(value?: number): string;
    formatMinSec(value?: number): string;
    handleBlur(): void;
    get isSmallSize(): boolean;
    get isLargeSize(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    private propagateModelChange;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimepicker, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbTimepicker, "ngb-timepicker", ["ngbTimepicker"], { "meridian": { "alias": "meridian"; "required": false; }; "spinners": { "alias": "spinners"; "required": false; }; "seconds": { "alias": "seconds"; "required": false; }; "hourStep": { "alias": "hourStep"; "required": false; }; "minuteStep": { "alias": "minuteStep"; "required": false; }; "secondStep": { "alias": "secondStep"; "required": false; }; "readonlyInputs": { "alias": "readonlyInputs"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}

declare class NgbTimepickerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTimepickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbTimepickerModule, never, [typeof NgbTimepicker], [typeof NgbTimepicker]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbTimepickerModule>;
}

/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
declare class NgbToastHeader {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbToastHeader, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbToastHeader, "[ngbToastHeader]", never, {}, {}, never, never, true, never>;
}
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
declare class NgbToast implements AfterContentInit, OnChanges {
    ariaLive: string;
    private _config;
    private _zone;
    private _injector;
    private _element;
    private _timeoutID;
    /**
     * If `true`, toast opening and closing will be animated.
     *
     * Animation is triggered only when the `.hide()` or `.show()` functions are called
     *
     * @since 8.0.0
     */
    animation: boolean;
    /**
     * Delay after which the toast will hide (ms).
     * default: `500` (ms) (inherited from NgbToastConfig)
     */
    delay: number;
    /**
     * Auto hide the toast after a delay in ms.
     * default: `true` (inherited from NgbToastConfig)
     */
    autohide: boolean;
    /**
     * Text to be used as toast's header.
     * Ignored if a ContentChild template is specified at the same time.
     */
    header: string;
    /**
     * A template like `<ng-template ngbToastHeader></ng-template>` can be
     * used in the projected content to allow markup usage.
     */
    contentHeaderTpl: TemplateRef<any> | null;
    /**
     * An event fired after the animation triggered by calling `.show()` method has finished.
     *
     * @since 8.0.0
     */
    shown: EventEmitter<void>;
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
    hidden: EventEmitter<void>;
    constructor(ariaLive: string);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
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
    hide(): Observable<void>;
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
    show(): Observable<void>;
    private _init;
    private _clearTimeout;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbToast, [{ attribute: "aria-live"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbToast, "ngb-toast", ["ngbToast"], { "animation": { "alias": "animation"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; "autohide": { "alias": "autohide"; "required": false; }; "header": { "alias": "header"; "required": false; }; }, { "shown": "shown"; "hidden": "hidden"; }, ["contentHeaderTpl"], ["*"], true, never>;
}

/**
 * Interface used to type all toast config options. See `NgbToastConfig`.
 *
 * @since 5.0.0
 */
interface NgbToastOptions {
    /**
     * Specify if the toast component should emit the `hide()` output
     * after a certain `delay` in ms.
     */
    autohide?: boolean;
    /**
     * Delay in ms after which the `hide()` output should be emitted.
     */
    delay?: number;
    /**
     * Type of aria-live attribute to be used.
     *
     * Could be one of these 2 values (as string):
     * - `polite` (default)
     * - `assertive`
     */
    ariaLive?: 'polite' | 'assertive';
}
/**
 * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
 * and customize the values of its properties in order to provide default values for all the toasts used in the
 * application.
 *
 * @since 5.0.0
 */
declare class NgbToastConfig implements NgbToastOptions {
    private _ngbConfig;
    private _animation;
    autohide: boolean;
    delay: number;
    ariaLive: 'polite' | 'assertive';
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbToastConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbToastConfig>;
}

declare class NgbToastModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbToastModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbToastModule, never, [typeof NgbToast, typeof NgbToastHeader], [typeof NgbToast, typeof NgbToastHeader]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbToastModule>;
}

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
    placement: PlacementArray;
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

/**
 * A component that helps with text highlighting.
 *
 * It splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
declare class NgbHighlight implements OnChanges {
    parts: string[];
    /**
     * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
     */
    highlightClass: string;
    /**
     * The text highlighting is added to.
     *
     * If the `term` is found inside this text, it will be highlighted.
     * If the `term` contains array then all the items from it will be highlighted inside the text.
     */
    result?: string | null;
    /**
     * The term or array of terms to be highlighted.
     * Since version `v4.2.0` term could be a `string[]`
     */
    term: string | readonly string[];
    /**
     * Boolean option to determine if the highlighting should be sensitive to accents or not.
     *
     * This feature is only available for browsers that implement the `String.normalize` function
     * (typically not Internet Explorer).
     * If you want to use this feature in a browser that does not implement `String.normalize`,
     * you will have to include a polyfill in your application (`unorm` for example).
     *
     * @since 9.1.0
     */
    accentSensitive: boolean;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbHighlight, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbHighlight, "ngb-highlight", never, { "highlightClass": { "alias": "highlightClass"; "required": false; }; "result": { "alias": "result"; "required": true; }; "term": { "alias": "term"; "required": true; }; "accentSensitive": { "alias": "accentSensitive"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * The context for the typeahead result template in case you want to override the default one.
 */
interface ResultTemplateContext {
    /**
     * Your typeahead result item.
     */
    result: any;
    /**
     * Search term from the `<input>` used to get current result.
     */
    term: string;
    /**
     * The function which transforms the result into a string
     */
    formatter: (result: any) => string;
}

/**
 * An event emitted right before an item is selected from the result list.
 */
interface NgbTypeaheadSelectItemEvent<T = any> {
    /**
     * The item from the result list about to be selected.
     */
    item: T;
    /**
     * Calling this function will prevent item selection from happening.
     */
    preventDefault: () => void;
}
/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
declare class NgbTypeahead implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    private _nativeElement;
    private _config;
    private _live;
    private _document;
    private _ngZone;
    private _changeDetector;
    private _injector;
    private _popupService;
    private _positioning;
    private _subscription;
    private _closed$;
    private _inputValueBackup;
    private _inputValueForSelectOnExact;
    private _valueChanges$;
    private _resubscribeTypeahead$;
    private _windowRef;
    private _afterRenderRef;
    /**
     * The value for the `autocomplete` attribute for the `<input>` element.
     *
     * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
     *
     * @since 2.1.0
     */
    autocomplete: string;
    /**
     * A selector specifying the element the typeahead popup will be appended to.
     *
     * Currently only supports `"body"`.
     */
    container: any;
    /**
     * If `true`, model values will not be restricted only to items selected from the popup.
     */
    editable: boolean;
    /**
     * If `true`, the first item in the result list will always stay focused while typing.
     */
    focusFirst: boolean;
    /**
     * The function that converts an item from the result list to a `string` to display in the `<input>` field.
     *
     * It is called when the user selects something in the popup or the model value changes, so the input needs to
     * be updated.
     */
    inputFormatter: (item: any) => string;
    /**
     * The function that converts a stream of text values from the `<input>` element to the stream of the array of items
     * to display in the typeahead popup.
     *
     * If the resulting observable emits a non-empty array - the popup will be shown. If it emits an empty array - the
     * popup will be closed.
     *
     * See the [basic example](#/components/typeahead/examples#basic) for more details.
     *
     * Note that the `this` argument is `undefined` so you need to explicitly bind it to a desired "this" target.
     */
    ngbTypeahead: OperatorFunction<string, readonly any[]> | null | undefined;
    /**
     * The function that converts an item from the result list to a `string` to display in the popup.
     *
     * Must be provided, if your `ngbTypeahead` returns something other than `Observable<string[]>`.
     *
     * Alternatively for more complex markup in the popup you should use `resultTemplate`.
     */
    resultFormatter: (item: any) => string;
    /**
     * The template to override the way resulting items are displayed in the popup.
     *
     * See the [ResultTemplateContext](#/components/typeahead/api#ResultTemplateContext) for the template context.
     *
     * Also see the [template for results demo](#/components/typeahead/examples#template) for more details.
     */
    resultTemplate: TemplateRef<ResultTemplateContext>;
    /**
     * If `true`, automatically selects the item when it is the only one that exactly matches the user input
     *
     * @since 14.2.0
     */
    selectOnExact: boolean;
    /**
     * If `true`, will show the hint in the `<input>` when an item in the result list matches.
     */
    showHint: boolean;
    /**
     * The preferred placement of the typeahead, among the [possible values](#/guides/positioning#api).
     *
     * The default order of preference is `"bottom-start bottom-end top-start top-end"`
     *
     * Please see the [positioning overview](#/positioning) for more details.
     */
    placement: PlacementArray;
    /**
     * Allows to change default Popper options when positioning the typeahead.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<_popperjs_core.Options>) => Partial<_popperjs_core.Options>;
    /**
     * A custom class to append to the typeahead popup window
     *
     * Accepts a string containing CSS class to be applied on the `ngb-typeahead-window`.
     *
     * This can be used to provide instance-specific styling, ex. you can override popup window `z-index`
     *
     * @since 9.1.0
     */
    popupClass: string;
    /**
     * An event emitted right before an item is selected from the result list.
     *
     * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
     */
    selectItem: EventEmitter<NgbTypeaheadSelectItemEvent<any>>;
    activeDescendant: string | null;
    popupId: string;
    private _onTouched;
    private _onChange;
    ngOnInit(): void;
    ngOnChanges({ ngbTypeahead }: SimpleChanges): void;
    ngOnDestroy(): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    writeValue(value: any): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * Dismisses typeahead popup window
     */
    dismissPopup(): void;
    /**
     * Returns true if the typeahead popup window is displayed
     */
    isPopupOpen(): boolean;
    handleBlur(): void;
    handleKeyDown(event: KeyboardEvent): void;
    private _openPopup;
    private _closePopup;
    private _selectResult;
    private _selectResultClosePopup;
    private _showHint;
    private _formatItemForInput;
    private _writeInputValue;
    private _subscribeToUserInput;
    private _unsubscribeFromUserInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTypeahead, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbTypeahead, "input[ngbTypeahead]", ["ngbTypeahead"], { "autocomplete": { "alias": "autocomplete"; "required": false; }; "container": { "alias": "container"; "required": false; }; "editable": { "alias": "editable"; "required": false; }; "focusFirst": { "alias": "focusFirst"; "required": false; }; "inputFormatter": { "alias": "inputFormatter"; "required": false; }; "ngbTypeahead": { "alias": "ngbTypeahead"; "required": false; }; "resultFormatter": { "alias": "resultFormatter"; "required": false; }; "resultTemplate": { "alias": "resultTemplate"; "required": false; }; "selectOnExact": { "alias": "selectOnExact"; "required": false; }; "showHint": { "alias": "showHint"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "popperOptions": { "alias": "popperOptions"; "required": false; }; "popupClass": { "alias": "popupClass"; "required": false; }; }, { "selectItem": "selectItem"; }, never, never, true, never>;
}

/**
 * A configuration service for the [`NgbTypeahead`](#/components/typeahead/api#NgbTypeahead) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
declare class NgbTypeaheadConfig {
    container: any;
    editable: boolean;
    focusFirst: boolean;
    selectOnExact: boolean;
    showHint: boolean;
    placement: PlacementArray;
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTypeaheadConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTypeaheadConfig>;
}

declare class NgbTypeaheadModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTypeaheadModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbTypeaheadModule, never, [typeof NgbHighlight, typeof NgbTypeahead], [typeof NgbHighlight, typeof NgbTypeahead]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbTypeaheadModule>;
}

/**
 * Global ng-bootstrap config
 *
 * @since 8.0.0
 */
declare class NgbConfig {
    animation: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbConfig>;
}

declare class NgbModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbModule, never, [typeof NgbAccordionModule, typeof NgbAlertModule, typeof NgbCarouselModule, typeof NgbCollapseModule, typeof NgbDatepickerModule, typeof NgbDropdownModule, typeof NgbModalModule, typeof NgbNavModule, typeof NgbOffcanvasModule, typeof NgbPaginationModule, typeof NgbPopoverModule, typeof NgbProgressbarModule, typeof NgbRatingModule, typeof NgbScrollSpyModule, typeof NgbTimepickerModule, typeof NgbToastModule, typeof NgbTooltipModule, typeof NgbTypeaheadModule], [typeof NgbAccordionModule, typeof NgbAlertModule, typeof NgbCarouselModule, typeof NgbCollapseModule, typeof NgbDatepickerModule, typeof NgbDropdownModule, typeof NgbModalModule, typeof NgbNavModule, typeof NgbOffcanvasModule, typeof NgbPaginationModule, typeof NgbPopoverModule, typeof NgbProgressbarModule, typeof NgbRatingModule, typeof NgbScrollSpyModule, typeof NgbTimepickerModule, typeof NgbToastModule, typeof NgbTooltipModule, typeof NgbTypeaheadModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbModule>;
}

export { ModalDismissReasons, NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionConfig, NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem, NgbAccordionModule, NgbAccordionToggle, NgbActiveModal, NgbActiveOffcanvas, NgbAlert, NgbAlertConfig, NgbAlertModule, NgbCalendar, NgbCalendarBuddhist, NgbCalendarEthiopian, NgbCalendarGregorian, NgbCalendarHebrew, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarPersian, NgbCarousel, NgbCarouselConfig, NgbCarouselModule, NgbCollapse, NgbCollapseConfig, NgbCollapseModule, NgbConfig, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter, NgbDateParserFormatter, NgbDateStructAdapter, NgbDatepicker, NgbDatepickerConfig, NgbDatepickerContent, NgbDatepickerI18n, NgbDatepickerI18nAmharic, NgbDatepickerI18nDefault, NgbDatepickerI18nHebrew, NgbDatepickerKeyboardService, NgbDatepickerModule, NgbDatepickerMonth, NgbDropdown, NgbDropdownAnchor, NgbDropdownButtonItem, NgbDropdownConfig, NgbDropdownItem, NgbDropdownMenu, NgbDropdownModule, NgbDropdownToggle, NgbHighlight, NgbInputDatepicker, NgbInputDatepickerConfig, NgbModal, NgbModalConfig, NgbModalModule, NgbModalRef, NgbModule, NgbNav, NgbNavConfig, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavLinkButton, NgbNavModule, NgbNavOutlet, NgbNavPane, NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasModule, NgbOffcanvasRef, NgbPagination, NgbPaginationConfig, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationModule, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPages, NgbPaginationPrevious, NgbPopover, NgbPopoverConfig, NgbPopoverModule, NgbProgressbar, NgbProgressbarConfig, NgbProgressbarModule, NgbProgressbarStacked, NgbRating, NgbRatingConfig, NgbRatingModule, NgbScrollSpy, NgbScrollSpyConfig, NgbScrollSpyFragment, NgbScrollSpyItem, NgbScrollSpyMenu, NgbScrollSpyModule, NgbScrollSpyService, NgbSlide, NgbSlideEventDirection, NgbSlideEventSource, NgbTimeAdapter, NgbTimepicker, NgbTimepickerConfig, NgbTimepickerI18n, NgbTimepickerModule, NgbToast, NgbToastConfig, NgbToastHeader, NgbToastModule, NgbTooltip, NgbTooltipConfig, NgbTooltipModule, NgbTypeahead, NgbTypeaheadConfig, NgbTypeaheadModule, OffcanvasDismissReasons };
export type { NgbDateStruct, NgbDatepickerNavigateEvent, NgbDatepickerState, NgbModalOptions, NgbModalUpdatableOptions, NgbNavChangeEvent, NgbNavContentContext, NgbOffcanvasOptions, NgbPeriod, NgbScrollSpyProcessChanges, NgbSlideEvent, NgbTimeStruct, NgbTypeaheadSelectItemEvent, Placement };
