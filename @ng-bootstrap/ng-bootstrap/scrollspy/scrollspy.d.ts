import { AfterViewInit, OnInit } from '@angular/core';
import { NgbScrollSpyProcessChanges, NgbScrollToOptions } from './scrollspy.service';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Common interface for the scroll spy API.
 *
 * @internal
 */
export interface NgbScrollSpyRef {
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
export declare class NgbScrollSpyItem implements OnInit {
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
export declare class NgbScrollSpyMenu implements NgbScrollSpyRef, AfterViewInit {
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
export declare class NgbScrollSpy implements NgbScrollSpyRef, AfterViewInit {
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
export declare class NgbScrollSpyFragment implements AfterViewInit {
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
