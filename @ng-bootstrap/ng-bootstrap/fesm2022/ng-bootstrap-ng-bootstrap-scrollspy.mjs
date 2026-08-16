import * as i0 from '@angular/core';
import { Service, inject, DOCUMENT, PLATFORM_ID, ChangeDetectorRef, NgZone, DestroyRef, Input, Directive, ContentChildren, ElementRef, Output, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { isString } from './_ngb-ngbootstrap-utilities.mjs';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

function toFragmentElement(container, id) {
    if (!container || id == null) {
        return null;
    }
    return isString(id) ? container.querySelector(`#${CSS.escape(id)}`) : id;
}
function getOrderedFragments(container, fragments) {
    const selector = [...fragments].map(({ id }) => `#${CSS.escape(id)}`).join(',');
    return Array.from(container.querySelectorAll(selector));
}
const defaultProcessChanges = (state, changeActive, ctx) => {
    const { rootElement, fragments, scrollSpy, options, entries } = state;
    const orderedFragments = getOrderedFragments(rootElement, fragments);
    if (!ctx.initialized) {
        ctx.initialized = true;
        ctx.gapFragment = null;
        ctx.visibleFragments = new Set();
        // special case when one of the fragments was pre-selected
        const preSelectedFragment = toFragmentElement(rootElement, options?.initialFragment);
        if (preSelectedFragment) {
            scrollSpy.scrollTo(preSelectedFragment);
            return;
        }
    }
    for (const entry of entries) {
        const { isIntersecting, target: fragment } = entry;
        // 1. an entry became visible
        if (isIntersecting) {
            // if we were in-between two elements, we have to clear it up
            if (ctx.gapFragment) {
                ctx.visibleFragments.delete(ctx.gapFragment);
                ctx.gapFragment = null;
            }
            ctx.visibleFragments.add(fragment);
        }
        // 2. an entry became invisible
        else {
            ctx.visibleFragments.delete(fragment);
            // nothing is visible anymore, but something just was actually
            if (ctx.visibleFragments.size === 0 && scrollSpy.active !== '') {
                // 2.1 scrolling down - keeping the same element
                if (entry.boundingClientRect.top < entry.rootBounds.top) {
                    ctx.gapFragment = fragment;
                    ctx.visibleFragments.add(ctx.gapFragment);
                }
                // 2.2 scrolling up - getting the previous element
                else {
                    // scrolling up and no more fragments above
                    if (fragment === orderedFragments[0]) {
                        ctx.gapFragment = null;
                        ctx.visibleFragments.clear();
                        changeActive('');
                        return;
                    }
                    // getting previous fragment
                    else {
                        const fragmentIndex = orderedFragments.indexOf(fragment);
                        ctx.gapFragment = orderedFragments[fragmentIndex - 1] || null;
                        if (ctx.gapFragment) {
                            ctx.visibleFragments.add(ctx.gapFragment);
                        }
                    }
                }
            }
        }
    }
    // getting the first visible element in the DOM order of the fragments
    for (const fragment of orderedFragments) {
        if (ctx.visibleFragments.has(fragment)) {
            changeActive(fragment.id);
            break;
        }
    }
};

/**
 * A configuration service for the [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all scrollspies used in the application.
 *
 * @since 15.1.0
 */
class NgbScrollSpyConfig {
    constructor() {
        this.scrollBehavior = 'smooth';
        this.processChanges = defaultProcessChanges;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyConfig, decorators: [{
            type: Service
        }] });

const MATCH_THRESHOLD = 3;
/**
 * A scrollspy service that allows tracking of elements scrolling in and out of view.
 *
 * It can be instantiated manually, or automatically by the `ngbScrollSpy` directive.
 *
 * @since 15.1.0
 */
class NgbScrollSpyService {
    constructor() {
        this._observer = null;
        this._containerElement = null;
        this._fragments = new Set();
        this._preRegisteredFragments = new Set();
        this._active$ = new Subject();
        this._distinctActive$ = this._active$.pipe(distinctUntilChanged());
        this._active = '';
        this._config = inject(NgbScrollSpyConfig);
        this._document = inject(DOCUMENT);
        this._platformId = inject(PLATFORM_ID);
        this._scrollBehavior = this._config.scrollBehavior;
        this._diChangeDetectorRef = inject(ChangeDetectorRef, { optional: true });
        this._changeDetectorRef = this._diChangeDetectorRef;
        this._zone = inject(NgZone);
        this._distinctActive$.pipe(takeUntilDestroyed()).subscribe((active) => {
            this._active = active;
            this._changeDetectorRef?.markForCheck();
        });
    }
    /**
     * Getter for the currently active fragment id. Returns empty string if none.
     */
    get active() {
        return this._active;
    }
    /**
     * An observable emitting the currently active fragment. Emits empty string if none.
     */
    get active$() {
        return this._distinctActive$;
    }
    /**
     * Starts the scrollspy service and observes specified fragments.
     *
     * You can specify a list of options to pass, like the root element, initial fragment, scroll behavior, etc.
     * See the [`NgbScrollSpyOptions`](#/components/scrollspy/api#NgbScrollSpyOptions) interface for more details.
     */
    start(options) {
        if (isPlatformBrowser(this._platformId)) {
            this._cleanup();
            const { root, rootMargin, scrollBehavior, threshold, fragments, changeDetectorRef, processChanges } = {
                ...options,
            };
            this._containerElement = root ?? this._document.documentElement;
            this._changeDetectorRef = changeDetectorRef ?? this._diChangeDetectorRef;
            this._scrollBehavior = scrollBehavior ?? this._config.scrollBehavior;
            const processChangesFn = processChanges ?? this._config.processChanges;
            const context = {};
            this._observer = new IntersectionObserver((entries) => processChangesFn({
                entries,
                rootElement: this._containerElement,
                fragments: this._fragments,
                scrollSpy: this,
                options: { ...options },
            }, (active) => this._active$.next(active), context), {
                root: root ?? this._document,
                ...(rootMargin && { rootMargin }),
                ...(threshold && { threshold }),
            });
            // merging fragments added before starting and the ones passed as options
            for (const element of [...this._preRegisteredFragments, ...(fragments ?? [])]) {
                this.observe(element);
            }
            this._preRegisteredFragments.clear();
        }
    }
    /**
     * Stops the service and unobserves all fragments.
     */
    stop() {
        this._cleanup();
        this._active$.next('');
    }
    /**
     * Scrolls to a fragment, it must be known to the service and contained in the root element.
     * An id or an element reference can be passed.
     *
     * [`NgbScrollToOptions`](#/components/scrollspy/api#NgbScrollToOptions) can be passed.
     */
    scrollTo(fragment, options) {
        const { behavior } = { behavior: this._scrollBehavior, ...options };
        if (this._containerElement) {
            const fragmentElement = toFragmentElement(this._containerElement, fragment);
            if (fragmentElement) {
                const heightPx = fragmentElement.offsetTop - this._containerElement.offsetTop;
                this._containerElement.scrollTo({ top: heightPx, behavior });
                let lastOffset = this._containerElement.scrollTop;
                let matchCounter = 0;
                // we should update the active section only after scrolling is finished
                // and there is no clean way to do it at the moment
                const containerElement = this._containerElement;
                this._zone.runOutsideAngular(() => {
                    const updateActiveWhenScrollingIsFinished = () => {
                        const sameOffsetAsLastTime = lastOffset === containerElement.scrollTop;
                        if (sameOffsetAsLastTime) {
                            matchCounter++;
                        }
                        else {
                            matchCounter = 0;
                        }
                        if (!sameOffsetAsLastTime || (sameOffsetAsLastTime && matchCounter < MATCH_THRESHOLD)) {
                            lastOffset = containerElement.scrollTop;
                            requestAnimationFrame(updateActiveWhenScrollingIsFinished);
                        }
                        else {
                            this._zone.run(() => this._active$.next(fragmentElement.id));
                        }
                    };
                    requestAnimationFrame(updateActiveWhenScrollingIsFinished);
                });
            }
        }
    }
    /**
     * Adds a fragment to observe. It must be contained in the root element.
     * An id or an element reference can be passed.
     */
    observe(fragment) {
        if (!this._observer) {
            this._preRegisteredFragments.add(fragment);
            return;
        }
        const fragmentElement = toFragmentElement(this._containerElement, fragment);
        if (fragmentElement && !this._fragments.has(fragmentElement)) {
            this._fragments.add(fragmentElement);
            this._observer.observe(fragmentElement);
        }
    }
    /**
     * Unobserves a fragment.
     * An id or an element reference can be passed.
     */
    unobserve(fragment) {
        if (!this._observer) {
            this._preRegisteredFragments.delete(fragment);
            return;
        }
        const fragmentElement = toFragmentElement(this._containerElement, fragment);
        if (fragmentElement) {
            this._fragments.delete(fragmentElement);
            // we're removing and re-adding all current fragments to recompute active one
            this._observer.disconnect();
            for (const fragment of this._fragments) {
                this._observer.observe(fragment);
            }
        }
    }
    ngOnDestroy() {
        this._cleanup();
    }
    _cleanup() {
        this._fragments.clear();
        this._observer?.disconnect();
        this._changeDetectorRef = this._diChangeDetectorRef;
        this._scrollBehavior = this._config.scrollBehavior;
        this._observer = null;
        this._containerElement = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyService, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyService, decorators: [{
            type: Service
        }], ctorParameters: () => [] });

/**
 * A helper directive to that links menu items and fragments together.
 *
 * It will automatically add the `.active` class to the menu item when the associated fragment becomes active.
 *
 * @since 15.1.0
 */
class NgbScrollSpyItem {
    constructor() {
        this._changeDetector = inject(ChangeDetectorRef);
        this._scrollSpyMenu = inject(NgbScrollSpyMenu, { optional: true });
        this._scrollSpyAPI = this._scrollSpyMenu ?? inject(NgbScrollSpyService);
        this._destroyRef = inject(DestroyRef);
        this._isActive = false;
    }
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
    set data(data) {
        if (Array.isArray(data)) {
            this._scrollSpyAPI = data[0];
            this.fragment = data[1];
            this.parent ??= data[2];
        }
        else if (data instanceof NgbScrollSpy) {
            this._scrollSpyAPI = data;
        }
        else if (isString(data)) {
            this.fragment = data;
        }
    }
    ngOnInit() {
        // if it is not a part of a bigger menu, it should handle activation itself
        if (!this._scrollSpyMenu) {
            this._scrollSpyAPI.active$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((active) => {
                if (active === this.fragment) {
                    this._activate();
                }
                else {
                    this._deactivate();
                }
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * @internal
     */
    _activate() {
        this._isActive = true;
        if (this._scrollSpyMenu) {
            this._scrollSpyMenu.getItem(this.parent ?? '')?._activate();
        }
    }
    /**
     * @internal
     */
    _deactivate() {
        this._isActive = false;
        if (this._scrollSpyMenu) {
            this._scrollSpyMenu.getItem(this.parent ?? '')?._deactivate();
        }
    }
    /**
     * Returns `true`, if the associated fragment is active.
     */
    isActive() {
        return this._isActive;
    }
    /**
     * Scrolls to the associated fragment.
     */
    scrollTo(options) {
        this._scrollSpyAPI.scrollTo(this.fragment, options);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbScrollSpyItem, isStandalone: true, selector: "[ngbScrollSpyItem]", inputs: { data: ["ngbScrollSpyItem", "data"], fragment: "fragment", parent: "parent" }, host: { listeners: { "click": "scrollTo();" }, properties: { "class.active": "isActive()" } }, exportAs: ["ngbScrollSpyItem"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpyItem]',
                    exportAs: 'ngbScrollSpyItem',
                    host: {
                        '[class.active]': 'isActive()',
                        '(click)': 'scrollTo();',
                    },
                }]
        }], propDecorators: { data: [{
                type: Input,
                args: ['ngbScrollSpyItem']
            }], fragment: [{
                type: Input
            }], parent: [{
                type: Input
            }] } });
/**
 * An optional scroll spy menu directive to build hierarchical menus
 * and simplify the [`NgbScrollSpyItem`](#/components/scrollspy/api#NgbScrollSpyItem) configuration.
 *
 * @since 15.1.0
 */
class NgbScrollSpyMenu {
    constructor() {
        this._scrollSpyRef = inject(NgbScrollSpyService);
        this._destroyRef = inject(DestroyRef);
        this._map = new Map();
        this._lastActiveItem = null;
    }
    set scrollSpy(scrollSpy) {
        this._scrollSpyRef = scrollSpy;
    }
    get active() {
        return this._scrollSpyRef.active;
    }
    get active$() {
        return this._scrollSpyRef.active$;
    }
    scrollTo(fragment, options) {
        this._scrollSpyRef.scrollTo(fragment, options);
    }
    getItem(id) {
        return this._map.get(id);
    }
    ngAfterViewInit() {
        this._items.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this._rebuildMap());
        this._rebuildMap();
        this._scrollSpyRef.active$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((activeId) => {
            this._lastActiveItem?._deactivate();
            const item = this._map.get(activeId);
            if (item) {
                item._activate();
                this._lastActiveItem = item;
            }
        });
    }
    _rebuildMap() {
        this._map.clear();
        for (let item of this._items) {
            this._map.set(item.fragment, item);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyMenu, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbScrollSpyMenu, isStandalone: true, selector: "[ngbScrollSpyMenu]", inputs: { scrollSpy: ["ngbScrollSpyMenu", "scrollSpy"] }, queries: [{ propertyName: "_items", predicate: NgbScrollSpyItem, descendants: true }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyMenu, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpyMenu]',
                }]
        }], propDecorators: { _items: [{
                type: ContentChildren,
                args: [NgbScrollSpyItem, { descendants: true }]
            }], scrollSpy: [{
                type: Input,
                args: ['ngbScrollSpyMenu']
            }] } });
/**
 * A directive to put on a scrollable container.
 *
 * It will instantiate a [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
 *
 * @since 15.1.0
 */
class NgbScrollSpy {
    constructor() {
        this._initialFragment = null;
        this._service = inject(NgbScrollSpyService);
        this._nativeElement = inject(ElementRef).nativeElement;
        /**
         * An event raised when the active section changes.
         *
         * Payload is the id of the new active section, empty string if none.
         */
        this.activeChange = this._service.active$;
    }
    set active(fragment) {
        this._initialFragment = fragment;
        this.scrollTo(fragment);
    }
    /**
     * Getter/setter for the currently active fragment id.
     */
    get active() {
        return this._service.active;
    }
    /**
     * Returns an observable that emits currently active section id.
     */
    get active$() {
        return this._service.active$;
    }
    ngAfterViewInit() {
        this._service.start({
            processChanges: this.processChanges,
            root: this._nativeElement,
            rootMargin: this.rootMargin,
            threshold: this.threshold,
            ...(this._initialFragment && { initialFragment: this._initialFragment }),
        });
    }
    /**
     * @internal
     */
    _registerFragment(fragment) {
        this._service.observe(fragment.id);
    }
    /**
     * @internal
     */
    _unregisterFragment(fragment) {
        this._service.unobserve(fragment.id);
    }
    /**
     * Scrolls to a fragment that is identified by the `ngbScrollSpyFragment` directive.
     * An id or an element reference can be passed.
     */
    scrollTo(fragment, options) {
        this._service.scrollTo(fragment, {
            ...(this.scrollBehavior && { behavior: this.scrollBehavior }),
            ...options,
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpy, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbScrollSpy, isStandalone: true, selector: "[ngbScrollSpy]", inputs: { processChanges: "processChanges", rootMargin: "rootMargin", scrollBehavior: "scrollBehavior", threshold: "threshold", active: "active" }, outputs: { activeChange: "activeChange" }, host: { attributes: { "tabindex": "0" }, properties: { "style.overflow-y": "\"auto\"" } }, providers: [NgbScrollSpyService], exportAs: ["ngbScrollSpy"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpy, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpy]',
                    exportAs: 'ngbScrollSpy',
                    host: {
                        tabindex: '0',
                        '[style.overflow-y]': '"auto"',
                    },
                    providers: [NgbScrollSpyService],
                }]
        }], propDecorators: { processChanges: [{
                type: Input
            }], rootMargin: [{
                type: Input
            }], scrollBehavior: [{
                type: Input
            }], threshold: [{
                type: Input
            }], active: [{
                type: Input
            }], activeChange: [{
                type: Output
            }] } });
/**
 * A directive to put on a fragment observed inside a scrollspy container.
 *
 * @since 15.1.0
 */
class NgbScrollSpyFragment {
    constructor() {
        this._destroyRef = inject(DestroyRef);
        this._scrollSpy = inject(NgbScrollSpy);
    }
    ngAfterViewInit() {
        this._scrollSpy._registerFragment(this);
        this._destroyRef.onDestroy(() => this._scrollSpy._unregisterFragment(this));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyFragment, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbScrollSpyFragment, isStandalone: true, selector: "[ngbScrollSpyFragment]", inputs: { id: ["ngbScrollSpyFragment", "id"] }, host: { properties: { "id": "id" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyFragment, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpyFragment]',
                    host: {
                        '[id]': 'id',
                    },
                }]
        }], propDecorators: { id: [{
                type: Input,
                args: ['ngbScrollSpyFragment']
            }] } });

class NgbScrollSpyModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyModule, imports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu], exports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbScrollSpyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu],
                    exports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbScrollSpy, NgbScrollSpyConfig, NgbScrollSpyFragment, NgbScrollSpyItem, NgbScrollSpyMenu, NgbScrollSpyModule, NgbScrollSpyService };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-scrollspy.mjs.map
