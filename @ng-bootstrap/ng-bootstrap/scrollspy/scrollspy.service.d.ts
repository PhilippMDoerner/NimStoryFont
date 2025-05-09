import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbScrollSpyRef } from './scrollspy';
import * as i0 from "@angular/core";
export type NgbScrollSpyProcessChanges = (state: {
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
export interface NgbScrollSpyOptions extends Pick<IntersectionObserverInit, 'root' | 'rootMargin' | 'threshold'> {
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
export interface NgbScrollToOptions extends ScrollOptions {
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
export declare class NgbScrollSpyService implements NgbScrollSpyRef, OnDestroy {
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
