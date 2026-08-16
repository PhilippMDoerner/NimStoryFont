import * as i0 from '@angular/core';
import { OnDestroy, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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

export { NgbScrollSpy, NgbScrollSpyConfig, NgbScrollSpyFragment, NgbScrollSpyItem, NgbScrollSpyMenu, NgbScrollSpyModule, NgbScrollSpyService };
export type { NgbScrollSpyProcessChanges };
