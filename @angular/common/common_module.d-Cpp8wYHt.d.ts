/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { InjectionToken, OnDestroy, DoCheck, ElementRef, Renderer2, OnChanges, Type, Injector, NgModuleFactory, ViewContainerRef, SimpleChanges, NgIterable, TrackByFunction, TemplateRef, IterableDiffers, KeyValueDiffers, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { SubscriptionLike, Observable, Subscribable } from 'rxjs';
import { LocationChangeListener, PlatformLocation } from './platform_location.d-Lbv6Ueec.js';

/**
 * Enables the `Location` service to read route state from the browser's URL.
 * Angular provides two strategies:
 * `HashLocationStrategy` and `PathLocationStrategy`.
 *
 * Applications should use the `Router` or `Location` services to
 * interact with application route state.
 *
 * For instance, `HashLocationStrategy` produces URLs like
 * <code class="no-auto-link">http://example.com/#/foo</code>,
 * and `PathLocationStrategy` produces
 * <code class="no-auto-link">http://example.com/foo</code> as an equivalent URL.
 *
 * See these two classes for more.
 *
 * @publicApi
 */
declare abstract class LocationStrategy {
    abstract path(includeHash?: boolean): string;
    abstract prepareExternalUrl(internal: string): string;
    abstract getState(): unknown;
    abstract pushState(state: any, title: string, url: string, queryParams: string): void;
    abstract replaceState(state: any, title: string, url: string, queryParams: string): void;
    abstract forward(): void;
    abstract back(): void;
    historyGo?(relativePosition: number): void;
    abstract onPopState(fn: LocationChangeListener): void;
    abstract getBaseHref(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocationStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocationStrategy>;
}
/**
 * A predefined DI token for the base href
 * to be used with the `PathLocationStrategy`.
 * The base href is the URL prefix that should be preserved when generating
 * and recognizing URLs.
 *
 * @usageNotes
 *
 * The following example shows how to use this token to configure the root app injector
 * with a base href value, so that the DI framework can supply the dependency anywhere in the app.
 *
 * ```ts
 * import {NgModule} from '@angular/core';
 * import {APP_BASE_HREF} from '@angular/common';
 *
 * @NgModule({
 *   providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
 * })
 * class AppModule {}
 * ```
 *
 * @publicApi
 */
declare const APP_BASE_HREF: InjectionToken<string>;
/**
 * @description
 * A {@link LocationStrategy} used to configure the {@link Location} service to
 * represent its state in the
 * [path](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax) of the
 * browser's URL.
 *
 * If you're using `PathLocationStrategy`, you may provide a {@link APP_BASE_HREF}
 * or add a `<base href>` element to the document to override the default.
 *
 * For instance, if you provide an `APP_BASE_HREF` of `'/my/app/'` and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`. To ensure all relative URIs resolve correctly,
 * the `<base href>` and/or `APP_BASE_HREF` should end with a `/`.
 *
 * Similarly, if you add `<base href='/my/app/'/>` to the document and call
 * `location.go('/foo')`, the browser's URL will become
 * `example.com/my/app/foo`.
 *
 * Note that when using `PathLocationStrategy`, neither the query nor
 * the fragment in the `<base href>` will be preserved, as outlined
 * by the [RFC](https://tools.ietf.org/html/rfc3986#section-5.2.2).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example common/location/ts/path_location_component.ts region='LocationComponent'}
 *
 * @publicApi
 */
declare class PathLocationStrategy extends LocationStrategy implements OnDestroy {
    private _platformLocation;
    private _baseHref;
    private _removeListenerFns;
    constructor(_platformLocation: PlatformLocation, href?: string);
    /** @docs-private */
    ngOnDestroy(): void;
    onPopState(fn: LocationChangeListener): void;
    getBaseHref(): string;
    prepareExternalUrl(internal: string): string;
    path(includeHash?: boolean): string;
    pushState(state: any, title: string, url: string, queryParams: string): void;
    replaceState(state: any, title: string, url: string, queryParams: string): void;
    forward(): void;
    back(): void;
    getState(): unknown;
    historyGo(relativePosition?: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PathLocationStrategy, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PathLocationStrategy>;
}

/** @publicApi */
interface PopStateEvent {
    pop?: boolean;
    state?: any;
    type?: string;
    url?: string;
}
/**
 * @description
 *
 * A service that applications can use to interact with a browser's URL.
 *
 * Depending on the `LocationStrategy` used, `Location` persists
 * to the URL's path or the URL's hash segment.
 *
 * @usageNotes
 *
 * It's better to use the `Router.navigate()` service to trigger route changes. Use
 * `Location` only if you need to interact with or create normalized URLs outside of
 * routing.
 *
 * `Location` is responsible for normalizing the URL against the application's base href.
 * A normalized URL is absolute from the URL host, includes the application's base href, and has no
 * trailing slash:
 * - `/my/app/user/123` is normalized
 * - `my/app/user/123` **is not** normalized
 * - `/my/app/user/123/` **is not** normalized
 *
 * ### Example
 *
 * {@example common/location/ts/path_location_component.ts region='LocationComponent'}
 *
 * @publicApi
 */
declare class Location implements OnDestroy {
    constructor(locationStrategy: LocationStrategy);
    /** @docs-private */
    ngOnDestroy(): void;
    /**
     * Normalizes the URL path for this location.
     *
     * @param includeHash True to include an anchor fragment in the path.
     *
     * @returns The normalized URL path.
     */
    path(includeHash?: boolean): string;
    /**
     * Reports the current state of the location history.
     * @returns The current value of the `history.state` object.
     */
    getState(): unknown;
    /**
     * Normalizes the given path and compares to the current normalized path.
     *
     * @param path The given URL path.
     * @param query Query parameters.
     *
     * @returns True if the given URL path is equal to the current normalized path, false
     * otherwise.
     */
    isCurrentPathEqualTo(path: string, query?: string): boolean;
    /**
     * Normalizes a URL path by stripping any trailing slashes.
     *
     * @param url String representing a URL.
     *
     * @returns The normalized URL string.
     */
    normalize(url: string): string;
    /**
     * Normalizes an external URL path.
     * If the given URL doesn't begin with a leading slash (`'/'`), adds one
     * before normalizing. Adds a hash if `HashLocationStrategy` is
     * in use, or the `APP_BASE_HREF` if the `PathLocationStrategy` is in use.
     *
     * @param url String representing a URL.
     *
     * @returns  A normalized platform-specific URL.
     */
    prepareExternalUrl(url: string): string;
    /**
     * Changes the browser's URL to a normalized version of a given URL, and pushes a
     * new item onto the platform's history.
     *
     * @param path  URL path to normalize.
     * @param query Query parameters.
     * @param state Location history state.
     *
     */
    go(path: string, query?: string, state?: any): void;
    /**
     * Changes the browser's URL to a normalized version of the given URL, and replaces
     * the top item on the platform's history stack.
     *
     * @param path  URL path to normalize.
     * @param query Query parameters.
     * @param state Location history state.
     */
    replaceState(path: string, query?: string, state?: any): void;
    /**
     * Navigates forward in the platform's history.
     */
    forward(): void;
    /**
     * Navigates back in the platform's history.
     */
    back(): void;
    /**
     * Navigate to a specific page from session history, identified by its relative position to the
     * current page.
     *
     * @param relativePosition  Position of the target page in the history relative to the current
     *     page.
     * A negative value moves backwards, a positive value moves forwards, e.g. `location.historyGo(2)`
     * moves forward two pages and `location.historyGo(-2)` moves back two pages. When we try to go
     * beyond what's stored in the history session, we stay in the current page. Same behaviour occurs
     * when `relativePosition` equals 0.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/History_API#Moving_to_a_specific_point_in_history
     */
    historyGo(relativePosition?: number): void;
    /**
     * Registers a URL change listener. Use to catch updates performed by the Angular
     * framework that are not detectible through "popstate" or "hashchange" events.
     *
     * @param fn The change handler function, which take a URL and a location history state.
     * @returns A function that, when executed, unregisters a URL change listener.
     */
    onUrlChange(fn: (url: string, state: unknown) => void): VoidFunction;
    /**
     * Subscribes to the platform's `popState` events.
     *
     * Note: `Location.go()` does not trigger the `popState` event in the browser. Use
     * `Location.onUrlChange()` to subscribe to URL changes instead.
     *
     * @param value Event that is triggered when the state history changes.
     * @param exception The exception to throw.
     *
     * @see [onpopstate](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate)
     *
     * @returns Subscribed events.
     */
    subscribe(onNext: (value: PopStateEvent) => void, onThrow?: ((exception: any) => void) | null, onReturn?: (() => void) | null): SubscriptionLike;
    /**
     * Normalizes URL parameters by prepending with `?` if needed.
     *
     * @param  params String of URL parameters.
     *
     * @returns The normalized URL parameters string.
     */
    static normalizeQueryParams: (params: string) => string;
    /**
     * Joins two parts of a URL with a slash if needed.
     *
     * @param start  URL string
     * @param end    URL string
     *
     *
     * @returns The joined URL string.
     */
    static joinWithSlash: (start: string, end: string) => string;
    /**
     * Removes a trailing slash from a URL string if needed.
     * Looks for the first occurrence of either `#`, `?`, or the end of the
     * line as `/` characters and removes the trailing slash if one exists.
     *
     * @param url URL string.
     *
     * @returns The URL string, modified if needed.
     */
    static stripTrailingSlash: (url: string) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<Location, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Location>;
}

/**
 * @publicApi
 */
declare abstract class NgLocalization {
    abstract getPluralCategory(value: any, locale?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgLocalization, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgLocalization>;
}
/**
 * Returns the plural case based on the locale
 *
 * @publicApi
 */
declare class NgLocaleLocalization extends NgLocalization {
    protected locale: string;
    constructor(locale: string);
    getPluralCategory(value: any, locale?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgLocaleLocalization, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgLocaleLocalization>;
}

/**
 * @ngModule CommonModule
 *
 * @usageNotes
 * ```html
 * <some-element [ngClass]="stringExp|arrayExp|objExp|Set">...</some-element>
 *
 * <some-element [ngClass]="{'class1 class2 class3' : true}">...</some-element>
 * ```
 *
 * For more simple use cases you can use the [class bindings](/guide/templates/binding#css-class-and-style-property-bindings) directly.
 * It doesn't require importing a directive.
 *
 * ```html
 * <some-element [class]="'first second'">...</some-element>
 *
 * <some-element [class.expanded]="isExpanded">...</some-element>
 *
 * <some-element [class]="['first', 'second']">...</some-element>
 *
 * <some-element [class]="{'first': true, 'second': true, 'third': false}">...</some-element>
 * ```
 * @description
 *
 * Adds and removes CSS classes on an HTML element.
 *
 * The CSS classes are updated as follows, depending on the type of the expression evaluation:
 * - `string` - the CSS classes listed in the string (space delimited) are added,
 * - `Array` - the CSS classes declared as Array elements are added,
 * - `Object` - keys are CSS classes that get added when the expression given in the value
 *              evaluates to a truthy value, otherwise they are removed.
 *
 *
 * @see [Class bindings](/guide/templates/binding#css-class-and-style-property-bindings)
 *
 * @publicApi
 */
declare class NgClass implements DoCheck {
    private _ngEl;
    private _renderer;
    private initialClasses;
    private rawClass;
    private stateMap;
    constructor(_ngEl: ElementRef, _renderer: Renderer2);
    set klass(value: string);
    set ngClass(value: string | string[] | Set<string> | {
        [klass: string]: any;
    } | null | undefined);
    ngDoCheck(): void;
    private _updateState;
    private _applyStateDiff;
    private _toggleClass;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgClass, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgClass, "[ngClass]", never, { "klass": { "alias": "class"; "required": false; }; "ngClass": { "alias": "ngClass"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Instantiates a {@link /api/core/Component Component} type and inserts its Host View into the current View.
 * `NgComponentOutlet` provides a declarative approach for dynamic component creation.
 *
 * `NgComponentOutlet` requires a component type, if a falsy value is set the view will clear and
 * any existing component will be destroyed.
 *
 * @usageNotes
 *
 * ### Fine tune control
 *
 * You can control the component creation process by using the following optional attributes:
 *
 * * `ngComponentOutletInputs`: Optional component inputs object, which will be bind to the
 * component.
 *
 * * `ngComponentOutletInjector`: Optional custom {@link Injector} that will be used as parent for
 * the Component. Defaults to the injector of the current view container.
 *
 * * `ngComponentOutletContent`: Optional list of projectable nodes to insert into the content
 * section of the component, if it exists.
 *
 * * `ngComponentOutletNgModule`: Optional NgModule class reference to allow loading another
 * module dynamically, then loading a component from that module.
 *
 * * `ngComponentOutletNgModuleFactory`: Deprecated config option that allows providing optional
 * NgModule factory to allow loading another module dynamically, then loading a component from that
 * module. Use `ngComponentOutletNgModule` instead.
 *
 * ### Syntax
 *
 * Simple
 * ```html
 * <ng-container *ngComponentOutlet="componentTypeExpression"></ng-container>
 * ```
 *
 * With inputs
 * ```html
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   inputs: inputsExpression;">
 * </ng-container>
 * ```
 *
 * Customized injector/content
 * ```html
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   injector: injectorExpression;
 *                                   content: contentNodesExpression;">
 * </ng-container>
 * ```
 *
 * Customized NgModule reference
 * ```html
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   ngModule: ngModuleClass;">
 * </ng-container>
 * ```
 *
 * ### A simple example
 *
 * {@example common/ngComponentOutlet/ts/module.ts region='SimpleExample'}
 *
 * A more complete example with additional options:
 *
 * {@example common/ngComponentOutlet/ts/module.ts region='CompleteExample'}
 *
 * @publicApi
 * @ngModule CommonModule
 */
declare class NgComponentOutlet<T = any> implements OnChanges, DoCheck, OnDestroy {
    private _viewContainerRef;
    /** Component that should be rendered in the outlet. */
    ngComponentOutlet: Type<any> | null;
    ngComponentOutletInputs?: Record<string, unknown>;
    ngComponentOutletInjector?: Injector;
    ngComponentOutletContent?: any[][];
    ngComponentOutletNgModule?: Type<any>;
    /**
     * @deprecated This input is deprecated, use `ngComponentOutletNgModule` instead.
     */
    ngComponentOutletNgModuleFactory?: NgModuleFactory<any>;
    private _componentRef;
    private _moduleRef;
    /**
     * A helper data structure that allows us to track inputs that were part of the
     * ngComponentOutletInputs expression. Tracking inputs is necessary for proper removal of ones
     * that are no longer referenced.
     */
    private _inputsUsed;
    /**
     * Gets the instance of the currently-rendered component.
     * Will be null if no component has been rendered.
     */
    get componentInstance(): T | null;
    constructor(_viewContainerRef: ViewContainerRef);
    private _needToReCreateNgModuleInstance;
    private _needToReCreateComponentInstance;
    /** @docs-private */
    ngOnChanges(changes: SimpleChanges): void;
    /** @docs-private */
    ngDoCheck(): void;
    /** @docs-private */
    ngOnDestroy(): void;
    private _applyInputStateDiff;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgComponentOutlet<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgComponentOutlet<any>, "[ngComponentOutlet]", ["ngComponentOutlet"], { "ngComponentOutlet": { "alias": "ngComponentOutlet"; "required": false; }; "ngComponentOutletInputs": { "alias": "ngComponentOutletInputs"; "required": false; }; "ngComponentOutletInjector": { "alias": "ngComponentOutletInjector"; "required": false; }; "ngComponentOutletContent": { "alias": "ngComponentOutletContent"; "required": false; }; "ngComponentOutletNgModule": { "alias": "ngComponentOutletNgModule"; "required": false; }; "ngComponentOutletNgModuleFactory": { "alias": "ngComponentOutletNgModuleFactory"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * @publicApi
 *
 * @deprecated 20.0
 * The `ngFor` directive is deprecated. Use the `@for` block instead.
 */
declare class NgForOfContext<T, U extends NgIterable<T> = NgIterable<T>> {
    /** Reference to the current item from the collection. */
    $implicit: T;
    /**
     * The value of the iterable expression. Useful when the expression is
     * more complex then a property access, for example when using the async pipe
     * (`userStreams | async`).
     */
    ngForOf: U;
    /** Returns an index of the current item in the collection. */
    index: number;
    /** Returns total amount of items in the collection. */
    count: number;
    constructor(
    /** Reference to the current item from the collection. */
    $implicit: T, 
    /**
     * The value of the iterable expression. Useful when the expression is
     * more complex then a property access, for example when using the async pipe
     * (`userStreams | async`).
     */
    ngForOf: U, 
    /** Returns an index of the current item in the collection. */
    index: number, 
    /** Returns total amount of items in the collection. */
    count: number);
    get first(): boolean;
    get last(): boolean;
    get even(): boolean;
    get odd(): boolean;
}
/**
 * A [structural directive](guide/directives/structural-directives) that renders
 * a template for each item in a collection.
 * The directive is placed on an element, which becomes the parent
 * of the cloned templates.
 *
 * The `ngForOf` directive is generally used in the
 * [shorthand form](guide/directives/structural-directives#asterisk) `*ngFor`.
 * In this form, the template to be rendered for each iteration is the content
 * of an anchor element containing the directive.
 *
 * The following example shows the shorthand syntax with some options,
 * contained in an `<li>` element.
 *
 * ```html
 * <li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>
 * ```
 *
 * The shorthand form expands into a long form that uses the `ngForOf` selector
 * on an `<ng-template>` element.
 * The content of the `<ng-template>` element is the `<li>` element that held the
 * short-form directive.
 *
 * Here is the expanded version of the short-form example.
 *
 * ```html
 * <ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
 *   <li>...</li>
 * </ng-template>
 * ```
 *
 * Angular automatically expands the shorthand syntax as it compiles the template.
 * The context for each embedded view is logically merged to the current component
 * context according to its lexical position.
 *
 * When using the shorthand syntax, Angular allows only [one structural directive
 * on an element](guide/directives/structural-directives#one-per-element).
 * If you want to iterate conditionally, for example,
 * put the `*ngIf` on a container element that wraps the `*ngFor` element.
 * For further discussion, see
 * [Structural Directives](guide/directives/structural-directives#one-per-element).
 *
 * @usageNotes
 *
 * ### Local variables
 *
 * `NgForOf` provides exported values that can be aliased to local variables.
 * For example:
 *
 *  ```html
 * <li *ngFor="let user of users; index as i; first as isFirst">
 *    {{i}}/{{users.length}}. {{user}} <span *ngIf="isFirst">default</span>
 * </li>
 * ```
 *
 * The following exported values can be aliased to local variables:
 *
 * - `$implicit: T`: The value of the individual items in the iterable (`ngForOf`).
 * - `ngForOf: NgIterable<T>`: The value of the iterable expression. Useful when the expression is
 * more complex then a property access, for example when using the async pipe (`userStreams |
 * async`).
 * - `index: number`: The index of the current item in the iterable.
 * - `count: number`: The length of the iterable.
 * - `first: boolean`: True when the item is the first item in the iterable.
 * - `last: boolean`: True when the item is the last item in the iterable.
 * - `even: boolean`: True when the item has an even index in the iterable.
 * - `odd: boolean`: True when the item has an odd index in the iterable.
 *
 * ### Change propagation
 *
 * When the contents of the iterator changes, `NgForOf` makes the corresponding changes to the DOM:
 *
 * * When an item is added, a new instance of the template is added to the DOM.
 * * When an item is removed, its template instance is removed from the DOM.
 * * When items are reordered, their respective templates are reordered in the DOM.
 *
 * Angular uses object identity to track insertions and deletions within the iterator and reproduce
 * those changes in the DOM. This has important implications for animations and any stateful
 * controls that are present, such as `<input>` elements that accept user input. Inserted rows can
 * be animated in, deleted rows can be animated out, and unchanged rows retain any unsaved state
 * such as user input.
 * For more on animations, see [Transitions and Triggers](guide/animations/transition-and-triggers).
 *
 * The identities of elements in the iterator can change while the data does not.
 * This can happen, for example, if the iterator is produced from an RPC to the server, and that
 * RPC is re-run. Even if the data hasn't changed, the second response produces objects with
 * different identities, and Angular must tear down the entire DOM and rebuild it (as if all old
 * elements were deleted and all new elements inserted).
 *
 * To avoid this expensive operation, you can customize the default tracking algorithm.
 * by supplying the `trackBy` option to `NgForOf`.
 * `trackBy` takes a function that has two arguments: `index` and `item`.
 * If `trackBy` is given, Angular tracks changes by the return value of the function.
 *
 * @see [Structural Directives](guide/directives/structural-directives)
 * @ngModule CommonModule
 * @publicApi
 *
 * @deprecated 20.0
 * Use the `@for` block instead. Intent to remove in v22
 */
declare class NgForOf<T, U extends NgIterable<T> = NgIterable<T>> implements DoCheck {
    private _viewContainer;
    private _template;
    private _differs;
    /**
     * The value of the iterable expression, which can be used as a
     * [template input variable](guide/directives/structural-directives#shorthand).
     * @deprecated The `ngFor` directive is deprecated. Use the `@for` block instead.
     */
    set ngForOf(ngForOf: (U & NgIterable<T>) | undefined | null);
    /**
     * Specifies a custom `TrackByFunction` to compute the identity of items in an iterable.
     *
     * If a custom `TrackByFunction` is not provided, `NgForOf` will use the item's [object
     * identity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
     * as the key.
     *
     * `NgForOf` uses the computed key to associate items in an iterable with DOM elements
     * it produces for these items.
     *
     * A custom `TrackByFunction` is useful to provide good user experience in cases when items in an
     * iterable rendered using `NgForOf` have a natural identifier (for example, custom ID or a
     * primary key), and this iterable could be updated with new object instances that still
     * represent the same underlying entity (for example, when data is re-fetched from the server,
     * and the iterable is recreated and re-rendered, but most of the data is still the same).
     *
     * @see {@link TrackByFunction}
     * @deprecated The `ngFor` directive is deprecated. Use the `@for` block instead.
     */
    set ngForTrackBy(fn: TrackByFunction<T>);
    get ngForTrackBy(): TrackByFunction<T>;
    private _ngForOf;
    private _ngForOfDirty;
    private _differ;
    private _trackByFn;
    constructor(_viewContainer: ViewContainerRef, _template: TemplateRef<NgForOfContext<T, U>>, _differs: IterableDiffers);
    /**
     * A reference to the template that is stamped out for each item in the iterable.
     * @see [template reference variable](guide/templates/variables#template-reference-variables)
     * @deprecated The `ngFor` directive is deprecated. Use the `@for` block instead.
     */
    set ngForTemplate(value: TemplateRef<NgForOfContext<T, U>>);
    /**
     * Applies the changes when needed.
     * @docs-private
     */
    ngDoCheck(): void;
    private _applyChanges;
    /**
     * Asserts the correct type of the context for the template that `NgForOf` will render.
     *
     * The presence of this method is a signal to the Ivy template type-check compiler that the
     * `NgForOf` structural directive renders its template with a specific context type.
     */
    static ngTemplateContextGuard<T, U extends NgIterable<T>>(dir: NgForOf<T, U>, ctx: any): ctx is NgForOfContext<T, U>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgForOf<any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgForOf<any, any>, "[ngFor][ngForOf]", never, { "ngForOf": { "alias": "ngForOf"; "required": false; }; "ngForTrackBy": { "alias": "ngForTrackBy"; "required": false; }; "ngForTemplate": { "alias": "ngForTemplate"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * A structural directive that conditionally includes a template based on the value of
 * an expression coerced to Boolean.
 * When the expression evaluates to true, Angular renders the template
 * provided in a `then` clause, and when  false or null,
 * Angular renders the template provided in an optional `else` clause. The default
 * template for the `else` clause is blank.
 *
 * A [shorthand form](guide/directives/structural-directives#asterisk) of the directive,
 * `*ngIf="condition"`, is generally used, provided
 * as an attribute of the anchor element for the inserted template.
 * Angular expands this into a more explicit version, in which the anchor element
 * is contained in an `<ng-template>` element.
 *
 * Simple form with shorthand syntax:
 *
 * ```html
 * <div *ngIf="condition">Content to render when condition is true.</div>
 * ```
 *
 * Simple form with expanded syntax:
 *
 * ```html
 * <ng-template [ngIf]="condition"><div>Content to render when condition is
 * true.</div></ng-template>
 * ```
 *
 * Form with an "else" block:
 *
 * ```html
 * <div *ngIf="condition; else elseBlock">Content to render when condition is true.</div>
 * <ng-template #elseBlock>Content to render when condition is false.</ng-template>
 * ```
 *
 * Shorthand form with "then" and "else" blocks:
 *
 * ```html
 * <div *ngIf="condition; then thenBlock else elseBlock"></div>
 * <ng-template #thenBlock>Content to render when condition is true.</ng-template>
 * <ng-template #elseBlock>Content to render when condition is false.</ng-template>
 * ```
 *
 * Form with storing the value locally:
 *
 * ```html
 * <div *ngIf="condition as value; else elseBlock">{{value}}</div>
 * <ng-template #elseBlock>Content to render when value is null.</ng-template>
 * ```
 *
 * @usageNotes
 *
 * The `*ngIf` directive is most commonly used to conditionally show an inline template,
 * as seen in the following  example.
 * The default `else` template is blank.
 *
 * {@example common/ngIf/ts/module.ts region='NgIfSimple'}
 *
 * ### Showing an alternative template using `else`
 *
 * To display a template when `expression` evaluates to false, use an `else` template
 * binding as shown in the following example.
 * The `else` binding points to an `<ng-template>`  element labeled `#elseBlock`.
 * The template can be defined anywhere in the component view, but is typically placed right after
 * `ngIf` for readability.
 *
 * {@example common/ngIf/ts/module.ts region='NgIfElse'}
 *
 * ### Using an external `then` template
 *
 * In the previous example, the then-clause template is specified inline, as the content of the
 * tag that contains the `ngIf` directive. You can also specify a template that is defined
 * externally, by referencing a labeled `<ng-template>` element. When you do this, you can
 * change which template to use at runtime, as shown in the following example.
 *
 * {@example common/ngIf/ts/module.ts region='NgIfThenElse'}
 *
 * ### Storing a conditional result in a variable
 *
 * You might want to show a set of properties from the same object. If you are waiting
 * for asynchronous data, the object can be undefined.
 * In this case, you can use `ngIf` and store the result of the condition in a local
 * variable as shown in the following example.
 *
 * {@example common/ngIf/ts/module.ts region='NgIfAs'}
 *
 * This code uses only one `AsyncPipe`, so only one subscription is created.
 * The conditional statement stores the result of `userStream|async` in the local variable `user`.
 * You can then bind the local `user` repeatedly.
 *
 * The conditional displays the data only if `userStream` returns a value,
 * so you don't need to use the
 * safe-navigation-operator (`?.`)
 * to guard against null values when accessing properties.
 * You can display an alternative template while waiting for the data.
 *
 * ### Shorthand syntax
 *
 * The shorthand syntax `*ngIf` expands into two separate template specifications
 * for the "then" and "else" clauses. For example, consider the following shorthand statement,
 * that is meant to show a loading page while waiting for data to be loaded.
 *
 * ```html
 * <div class="hero-list" *ngIf="heroes else loading">
 *  ...
 * </div>
 *
 * <ng-template #loading>
 *  <div>Loading...</div>
 * </ng-template>
 * ```
 *
 * You can see that the "else" clause references the `<ng-template>`
 * with the `#loading` label, and the template for the "then" clause
 * is provided as the content of the anchor element.
 *
 * However, when Angular expands the shorthand syntax, it creates
 * another `<ng-template>` tag, with `ngIf` and `ngIfElse` directives.
 * The anchor element containing the template for the "then" clause becomes
 * the content of this unlabeled `<ng-template>` tag.
 *
 * ```html
 * <ng-template [ngIf]="heroes" [ngIfElse]="loading">
 *  <div class="hero-list">
 *   ...
 *  </div>
 * </ng-template>
 *
 * <ng-template #loading>
 *  <div>Loading...</div>
 * </ng-template>
 * ```
 *
 * The presence of the implicit template object has implications for the nesting of
 * structural directives. For more on this subject, see
 * [Structural Directives](guide/directives/structural-directives#one-per-element).
 *
 * @ngModule CommonModule
 * @publicApi
 *
 * @deprecated 20.0
 * Use the @if block instead. Intent to remove in v22
 */
declare class NgIf<T = unknown> {
    private _viewContainer;
    private _context;
    private _thenTemplateRef;
    private _elseTemplateRef;
    private _thenViewRef;
    private _elseViewRef;
    constructor(_viewContainer: ViewContainerRef, templateRef: TemplateRef<NgIfContext<T>>);
    /**
     * The Boolean expression to evaluate as the condition for showing a template.
     * @deprecated Use the @if block instead. Intent to remove in v22
     */
    set ngIf(condition: T);
    /**
     * A template to show if the condition expression evaluates to true.
     * @deprecated Use the @if block instead. Intent to remove in v22
     */
    set ngIfThen(templateRef: TemplateRef<NgIfContext<T>> | null);
    /**
     * A template to show if the condition expression evaluates to false.
     * @deprecated Use the @if block instead. Intent to remove in v22
     */
    set ngIfElse(templateRef: TemplateRef<NgIfContext<T>> | null);
    private _updateView;
    /**
     * Assert the correct type of the expression bound to the `ngIf` input within the template.
     *
     * The presence of this static field is a signal to the Ivy template type check compiler that
     * when the `NgIf` structural directive renders its template, the type of the expression bound
     * to `ngIf` should be narrowed in some way. For `NgIf`, the binding expression itself is used to
     * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgIf`.
     */
    static ngTemplateGuard_ngIf: 'binding';
    /**
     * Asserts the correct type of the context for the template that `NgIf` will render.
     *
     * The presence of this method is a signal to the Ivy template type-check compiler that the
     * `NgIf` structural directive renders its template with a specific context type.
     */
    static ngTemplateContextGuard<T>(dir: NgIf<T>, ctx: any): ctx is NgIfContext<Exclude<T, false | 0 | '' | null | undefined>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgIf<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgIf<any>, "[ngIf]", never, { "ngIf": { "alias": "ngIf"; "required": false; }; "ngIfThen": { "alias": "ngIfThen"; "required": false; }; "ngIfElse": { "alias": "ngIfElse"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * @publicApi
 *
 * @deprecated 20.0
 * The ngIf directive is deprecated in favor of the @if block instead.
 */
declare class NgIfContext<T = unknown> {
    $implicit: T;
    ngIf: T;
}

/**
 * @ngModule CommonModule
 *
 * @description
 *
 * Inserts an embedded view from a prepared `TemplateRef`.
 *
 * You can attach a context object to the `EmbeddedViewRef` by setting `[ngTemplateOutletContext]`.
 * `[ngTemplateOutletContext]` should be an object, the object's keys will be available for binding
 * by the local template `let` declarations.
 *
 * @usageNotes
 * ```html
 * <ng-container *ngTemplateOutlet="templateRefExp; context: contextExp"></ng-container>
 * ```
 *
 * Using the key `$implicit` in the context object will set its value as default.
 *
 * ### Example
 *
 * {@example common/ngTemplateOutlet/ts/module.ts region='NgTemplateOutlet'}
 *
 * @publicApi
 */
declare class NgTemplateOutlet<C = unknown> implements OnChanges {
    private _viewContainerRef;
    private _viewRef;
    /**
     * A context object to attach to the {@link EmbeddedViewRef}. This should be an
     * object, the object's keys will be available for binding by the local template `let`
     * declarations.
     * Using the key `$implicit` in the context object will set its value as default.
     */
    ngTemplateOutletContext: C | null | undefined;
    /**
     * A string defining the template reference and optionally the context object for the template.
     */
    ngTemplateOutlet: TemplateRef<C> | null | undefined;
    /** Injector to be used within the embedded view. */
    ngTemplateOutletInjector: Injector | null | undefined;
    constructor(_viewContainerRef: ViewContainerRef);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * We need to re-create existing embedded view if either is true:
     * - the outlet changed.
     * - the injector changed.
     */
    private _shouldRecreateView;
    /**
     * For a given outlet instance, we create a proxy object that delegates
     * to the user-specified context. This allows changing, or swapping out
     * the context object completely without having to destroy/re-create the view.
     */
    private _createContextForwardProxy;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgTemplateOutlet<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgTemplateOutlet<any>, "[ngTemplateOutlet]", never, { "ngTemplateOutletContext": { "alias": "ngTemplateOutletContext"; "required": false; }; "ngTemplateOutlet": { "alias": "ngTemplateOutlet"; "required": false; }; "ngTemplateOutletInjector": { "alias": "ngTemplateOutletInjector"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * @ngModule CommonModule
 *
 * @usageNotes
 *
 * Set the width of the containing element to a pixel value returned by an expression.
 *
 * ```html
 * <some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>
 * ```
 *
 * Set a collection of style values using an expression that returns key-value pairs.
 *
 * ```html
 * <some-element [ngStyle]="objExp">...</some-element>
 * ```
 *
 * For more simple use cases you can use the [style bindings](/guide/templates/binding#css-class-and-style-property-bindings) directly.
 * It doesn't require importing a directive.
 *
 * Set the font of the containing element to the result of an expression.
 *
 * ```html
 * <some-element [style]="{'font-style': styleExp}">...</some-element>
 * ```
 *
 * @description
 *
 * An attribute directive that updates styles for the containing HTML element.
 * Sets one or more style properties, specified as colon-separated key-value pairs.
 * The key is a style name, with an optional `.<unit>` suffix
 * (such as 'top.px', 'font-style.em').
 * The value is an expression to be evaluated.
 * The resulting non-null value, expressed in the given unit,
 * is assigned to the given style property.
 * If the result of evaluation is null, the corresponding style is removed.
 *
 * @see [Style bindings](/guide/templates/binding#css-class-and-style-property-bindings)
 *
 * @publicApi
 */
declare class NgStyle implements DoCheck {
    private _ngEl;
    private _differs;
    private _renderer;
    private _ngStyle;
    private _differ;
    constructor(_ngEl: ElementRef, _differs: KeyValueDiffers, _renderer: Renderer2);
    set ngStyle(values: {
        [klass: string]: any;
    } | null | undefined);
    ngDoCheck(): void;
    private _setStyle;
    private _applyChanges;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgStyle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgStyle, "[ngStyle]", never, { "ngStyle": { "alias": "ngStyle"; "required": false; }; }, {}, never, never, true, never>;
}

declare class SwitchView {
    private _viewContainerRef;
    private _templateRef;
    private _created;
    constructor(_viewContainerRef: ViewContainerRef, _templateRef: TemplateRef<Object>);
    create(): void;
    destroy(): void;
    enforceState(created: boolean): void;
}
/**
 * @ngModule CommonModule
 *
 * @description
 * The `[ngSwitch]` directive on a container specifies an expression to match against.
 * The expressions to match are provided by `ngSwitchCase` directives on views within the container.
 * - Every view that matches is rendered.
 * - If there are no matches, a view with the `ngSwitchDefault` directive is rendered.
 * - Elements within the `[NgSwitch]` statement but outside of any `NgSwitchCase`
 * or `ngSwitchDefault` directive are preserved at the location.
 *
 * @usageNotes
 * Define a container element for the directive, and specify the switch expression
 * to match against as an attribute:
 *
 * ```html
 * <container-element [ngSwitch]="switch_expression">
 * ```
 *
 * Within the container, `*ngSwitchCase` statements specify the match expressions
 * as attributes. Include `*ngSwitchDefault` as the final case.
 *
 * ```html
 * <container-element [ngSwitch]="switch_expression">
 *    <some-element *ngSwitchCase="match_expression_1">...</some-element>
 * ...
 *    <some-element *ngSwitchDefault>...</some-element>
 * </container-element>
 * ```
 *
 * ### Usage Examples
 *
 * The following example shows how to use more than one case to display the same view:
 *
 * ```html
 * <container-element [ngSwitch]="switch_expression">
 *   <!-- the same view can be shown in more than one case -->
 *   <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *   <some-element *ngSwitchCase="match_expression_2">...</some-element>
 *   <some-other-element *ngSwitchCase="match_expression_3">...</some-other-element>
 *   <!--default case when there are no matches -->
 *   <some-element *ngSwitchDefault>...</some-element>
 * </container-element>
 * ```
 *
 * The following example shows how cases can be nested:
 * ```html
 * <container-element [ngSwitch]="switch_expression">
 *       <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *       <some-element *ngSwitchCase="match_expression_2">...</some-element>
 *       <some-other-element *ngSwitchCase="match_expression_3">...</some-other-element>
 *       <ng-container *ngSwitchCase="match_expression_3">
 *         <!-- use a ng-container to group multiple root nodes -->
 *         <inner-element></inner-element>
 *         <inner-other-element></inner-other-element>
 *       </ng-container>
 *       <some-element *ngSwitchDefault>...</some-element>
 *     </container-element>
 * ```
 *
 * @publicApi
 * @see {@link NgSwitchCase}
 * @see {@link NgSwitchDefault}
 * @see [Structural Directives](guide/directives/structural-directives)
 *
 * @deprecated 20.0
 * Use the @switch block instead. Intent to remove in v22
 */
declare class NgSwitch {
    private _defaultViews;
    private _defaultUsed;
    private _caseCount;
    private _lastCaseCheckIndex;
    private _lastCasesMatched;
    private _ngSwitch;
    /** @deprecated Use the @switch block instead. Intent to remove in v22 */
    set ngSwitch(newValue: any);
    private _updateDefaultCases;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgSwitch, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgSwitch, "[ngSwitch]", never, { "ngSwitch": { "alias": "ngSwitch"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * @ngModule CommonModule
 *
 * @description
 * Provides a switch case expression to match against an enclosing `ngSwitch` expression.
 * When the expressions match, the given `NgSwitchCase` template is rendered.
 * If multiple match expressions match the switch expression value, all of them are displayed.
 *
 * @usageNotes
 *
 * Within a switch container, `*ngSwitchCase` statements specify the match expressions
 * as attributes. Include `*ngSwitchDefault` as the final case.
 *
 * ```html
 * <container-element [ngSwitch]="switch_expression">
 *   <some-element *ngSwitchCase="match_expression_1">...</some-element>
 *   ...
 *   <some-element *ngSwitchDefault>...</some-element>
 * </container-element>
 * ```
 *
 * Each switch-case statement contains an in-line HTML template or template reference
 * that defines the subtree to be selected if the value of the match expression
 * matches the value of the switch expression.
 *
 * As of Angular v17 the NgSwitch directive uses strict equality comparison (`===`) instead of
 * loose equality (`==`) to match different cases.
 *
 * @publicApi
 * @see {@link NgSwitch}
 * @see {@link NgSwitchDefault}
 *
 * @deprecated 20.0
 * Use the @case block within a @switch block instead. Intent to remove in v22
 */
declare class NgSwitchCase implements DoCheck {
    private ngSwitch;
    private _view;
    /**
     * Stores the HTML template to be selected on match.
     * @deprecated Use the @case block within a @switch block instead. Intent to remove in v22
     */
    ngSwitchCase: any;
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>, ngSwitch: NgSwitch);
    /**
     * Performs case matching. For internal use only.
     * @docs-private
     */
    ngDoCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgSwitchCase, [null, null, { optional: true; host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgSwitchCase, "[ngSwitchCase]", never, { "ngSwitchCase": { "alias": "ngSwitchCase"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * @ngModule CommonModule
 *
 * @description
 *
 * Creates a view that is rendered when no `NgSwitchCase` expressions
 * match the `NgSwitch` expression.
 * This statement should be the final case in an `NgSwitch`.
 *
 * @publicApi
 * @see {@link NgSwitch}
 * @see {@link NgSwitchCase}
 *
 * @deprecated 20.0
 * Use the @default block within a @switch block instead. Intent to remove in v22
 */
declare class NgSwitchDefault {
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>, ngSwitch: NgSwitch);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgSwitchDefault, [null, null, { optional: true; host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgSwitchDefault, "[ngSwitchDefault]", never, {}, {}, never, never, true, never>;
}

/**
 * @ngModule CommonModule
 *
 * @usageNotes
 * ```html
 * <some-element [ngPlural]="value">
 *   <ng-template ngPluralCase="=0">there is nothing</ng-template>
 *   <ng-template ngPluralCase="=1">there is one</ng-template>
 *   <ng-template ngPluralCase="few">there are a few</ng-template>
 * </some-element>
 * ```
 *
 * @description
 *
 * Adds / removes DOM sub-trees based on a numeric value. Tailored for pluralization.
 *
 * Displays DOM sub-trees that match the switch expression value, or failing that, DOM sub-trees
 * that match the switch expression's pluralization category.
 *
 * To use this directive you must provide a container element that sets the `[ngPlural]` attribute
 * to a switch expression. Inner elements with a `[ngPluralCase]` will display based on their
 * expression:
 * - if `[ngPluralCase]` is set to a value starting with `=`, it will only display if the value
 *   matches the switch expression exactly,
 * - otherwise, the view will be treated as a "category match", and will only display if exact
 *   value matches aren't found and the value maps to its category for the defined locale.
 *
 * See http://cldr.unicode.org/index/cldr-spec/plural-rules
 *
 * @publicApi
 */
declare class NgPlural {
    private _localization;
    private _activeView?;
    private _caseViews;
    constructor(_localization: NgLocalization);
    set ngPlural(value: number);
    addCase(value: string, switchView: SwitchView): void;
    private _updateView;
    private _clearViews;
    private _activateView;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgPlural, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgPlural, "[ngPlural]", never, { "ngPlural": { "alias": "ngPlural"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * @ngModule CommonModule
 *
 * @description
 *
 * Creates a view that will be added/removed from the parent {@link NgPlural} when the
 * given expression matches the plural expression according to CLDR rules.
 *
 * @usageNotes
 * ```html
 * <some-element [ngPlural]="value">
 *   <ng-template ngPluralCase="=0">...</ng-template>
 *   <ng-template ngPluralCase="other">...</ng-template>
 * </some-element>
 *```
 *
 * See {@link NgPlural} for more details and example.
 *
 * @publicApi
 */
declare class NgPluralCase {
    value: string;
    constructor(value: string, template: TemplateRef<Object>, viewContainer: ViewContainerRef, ngPlural: NgPlural);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgPluralCase, [{ attribute: "ngPluralCase"; }, null, null, { host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgPluralCase, "[ngPluralCase]", never, {}, {}, never, never, true, never>;
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `async` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks. When the reference of the expression changes, the `async` pipe
 * automatically unsubscribes from the old `Observable` or `Promise` and subscribes to the new one.
 *
 * @usageNotes
 *
 * ### Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. The Observable continuously updates the view with the current time.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipeObservable'}
 *
 * @publicApi
 */
declare class AsyncPipe implements OnDestroy, PipeTransform {
    private _ref;
    private _latestValue;
    private markForCheckOnValueUpdate;
    private _subscription;
    private _obj;
    private _strategy;
    private readonly applicationErrorHandler;
    constructor(ref: ChangeDetectorRef);
    ngOnDestroy(): void;
    transform<T>(obj: Observable<T> | Subscribable<T> | PromiseLike<T>): T | null;
    transform<T>(obj: null | undefined): null;
    transform<T>(obj: Observable<T> | Subscribable<T> | PromiseLike<T> | null | undefined): T | null;
    private _subscribe;
    private _selectStrategy;
    private _dispose;
    private _updateLatestValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsyncPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AsyncPipe, "async", true>;
}

/**
 * Transforms text to all lower case.
 *
 * @see {@link UpperCasePipe}
 * @see {@link TitleCasePipe}
 * @usageNotes
 *
 * The following example defines a view that allows the user to enter
 * text, and then uses the pipe to convert the input text to all lower case.
 *
 * {@example common/pipes/ts/lowerupper_pipe.ts region='LowerUpperPipe'}
 *
 * @ngModule CommonModule
 * @publicApi
 */
declare class LowerCasePipe implements PipeTransform {
    /**
     * @param value The string to transform to lower case.
     */
    transform(value: string): string;
    transform(value: null | undefined): null;
    transform(value: string | null | undefined): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<LowerCasePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<LowerCasePipe, "lowercase", true>;
}
/**
 * Transforms text to title case.
 * Capitalizes the first letter of each word and transforms the
 * rest of the word to lower case.
 * Words are delimited by any whitespace character, such as a space, tab, or line-feed character.
 *
 * @see {@link LowerCasePipe}
 * @see {@link UpperCasePipe}
 *
 * @usageNotes
 * The following example shows the result of transforming various strings into title case.
 *
 * {@example common/pipes/ts/titlecase_pipe.ts region='TitleCasePipe'}
 *
 * @ngModule CommonModule
 * @publicApi
 */
declare class TitleCasePipe implements PipeTransform {
    /**
     * @param value The string to transform to title case.
     */
    transform(value: string): string;
    transform(value: null | undefined): null;
    transform(value: string | null | undefined): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<TitleCasePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TitleCasePipe, "titlecase", true>;
}
/**
 * Transforms text to all upper case.
 * @see {@link LowerCasePipe}
 * @see {@link TitleCasePipe}
 *
 * @ngModule CommonModule
 * @publicApi
 */
declare class UpperCasePipe implements PipeTransform {
    /**
     * @param value The string to transform to upper case.
     */
    transform(value: string): string;
    transform(value: null | undefined): null;
    transform(value: string | null | undefined): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpperCasePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<UpperCasePipe, "uppercase", true>;
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Converts a value into its JSON-format representation.  Useful for debugging.
 *
 * @usageNotes
 *
 * The following component uses a JSON pipe to convert an object
 * to JSON format, and displays the string in both formats for comparison.
 *
 * {@example common/pipes/ts/json_pipe.ts region='JsonPipe'}
 *
 * @publicApi
 */
declare class JsonPipe implements PipeTransform {
    /**
     * @param value A value of any type to convert into a JSON-format string.
     */
    transform(value: any): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<JsonPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<JsonPipe, "json", true>;
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Creates a new `Array` or `String` containing a subset (slice) of the elements.
 *
 * @usageNotes
 *
 * All behavior is based on the expected behavior of the JavaScript API `Array.prototype.slice()`
 * and `String.prototype.slice()`.
 *
 * When operating on an `Array`, the returned `Array` is always a copy even when all
 * the elements are being returned.
 *
 * When operating on a blank value, the pipe returns the blank value.
 *
 * ### List Example
 *
 * This `ngFor` example:
 *
 * {@example common/pipes/ts/slice_pipe.ts region='SlicePipe_list'}
 *
 * produces the following:
 *
 * ```html
 * <li>b</li>
 * <li>c</li>
 * ```
 *
 * ### String Examples
 *
 * {@example common/pipes/ts/slice_pipe.ts region='SlicePipe_string'}
 *
 * @publicApi
 */
declare class SlicePipe implements PipeTransform {
    /**
     * @param value a list or a string to be sliced.
     * @param start the starting index of the subset to return:
     *   - **a positive integer**: return the item at `start` index and all items after
     *     in the list or string expression.
     *   - **a negative integer**: return the item at `start` index from the end and all items after
     *     in the list or string expression.
     *   - **if positive and greater than the size of the expression**: return an empty list or
     * string.
     *   - **if negative and greater than the size of the expression**: return entire list or string.
     * @param end the ending index of the subset to return:
     *   - **omitted**: return all items until the end.
     *   - **if positive**: return all items before `end` index of the list or string.
     *   - **if negative**: return all items before `end` index from the end of the list or string.
     */
    transform<T>(value: ReadonlyArray<T>, start: number, end?: number): Array<T>;
    transform(value: null | undefined, start: number, end?: number): null;
    transform<T>(value: ReadonlyArray<T> | null | undefined, start: number, end?: number): Array<T> | null;
    transform(value: string, start: number, end?: number): string;
    transform(value: string | null | undefined, start: number, end?: number): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<SlicePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<SlicePipe, "slice", true>;
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a value according to digit options and locale rules.
 * Locale determines group sizing and separator,
 * decimal point character, and other locale-specific configurations.
 *
 * @see {@link formatNumber}
 *
 * @usageNotes
 *
 * ### digitsInfo
 *
 * The value's decimal representation is specified by the `digitsInfo`
 * parameter, written in the following format:<br>
 *
 * ```
 * {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
 * ```
 *
 *  - `minIntegerDigits`:
 * The minimum number of integer digits before the decimal point.
 * Default is 1.
 *
 * - `minFractionDigits`:
 * The minimum number of digits after the decimal point.
 * Default is 0.
 *
 *  - `maxFractionDigits`:
 * The maximum number of digits after the decimal point.
 * Default is 3.
 *
 * If the formatted value is truncated it will be rounded using the "to-nearest" method:
 *
 * ```
 * {{3.6 | number: '1.0-0'}}
 * <!--will output '4'-->
 *
 * {{-3.6 | number:'1.0-0'}}
 * <!--will output '-4'-->
 * ```
 *
 * ### locale
 *
 * `locale` will format a value according to locale rules.
 * Locale determines group sizing and separator,
 * decimal point character, and other locale-specific configurations.
 *
 * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
 *
 * See [Setting your app locale](guide/i18n/locale-id).
 *
 * ### Example
 *
 * The following code shows how the pipe transforms values
 * according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * {@example common/pipes/ts/number_pipe.ts region='NumberPipe'}
 *
 * @publicApi
 */
declare class DecimalPipe implements PipeTransform {
    private _locale;
    constructor(_locale: string);
    /**
     * @param value The value to be formatted.
     * @param digitsInfo Sets digit and decimal representation.
     * [See more](#digitsinfo).
     * @param locale Specifies what locale format rules to use.
     * [See more](#locale).
     */
    transform(value: number | string, digitsInfo?: string, locale?: string): string | null;
    transform(value: null | undefined, digitsInfo?: string, locale?: string): null;
    transform(value: number | string | null | undefined, digitsInfo?: string, locale?: string): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<DecimalPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DecimalPipe, "number", true>;
}
/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number to a percentage
 * string, formatted according to locale rules that determine group sizing and
 * separator, decimal-point character, and other locale-specific
 * configurations.
 *
 * @see {@link formatPercent}
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * {@example common/pipes/ts/percent_pipe.ts region='PercentPipe'}
 *
 * @publicApi
 */
declare class PercentPipe implements PipeTransform {
    private _locale;
    constructor(_locale: string);
    transform(value: number | string, digitsInfo?: string, locale?: string): string | null;
    transform(value: null | undefined, digitsInfo?: string, locale?: string): null;
    transform(value: number | string | null | undefined, digitsInfo?: string, locale?: string): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<PercentPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<PercentPipe, "percent", true>;
}
/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms a number to a currency string, formatted according to locale rules
 * that determine group sizing and separator, decimal-point character,
 * and other locale-specific configurations.
 *
 *
 * @see {@link getCurrencySymbol}
 * @see {@link formatCurrency}
 *
 * @usageNotes
 * The following code shows how the pipe transforms numbers
 * into text strings, according to various format specifications,
 * where the caller's default locale is `en-US`.
 *
 * {@example common/pipes/ts/currency_pipe.ts region='CurrencyPipe'}
 *
 * @publicApi
 */
declare class CurrencyPipe implements PipeTransform {
    private _locale;
    private _defaultCurrencyCode;
    constructor(_locale: string, _defaultCurrencyCode?: string);
    /**
     *
     * @param value The number to be formatted as currency.
     * @param currencyCode The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code,
     * such as `USD` for the US dollar and `EUR` for the euro. The default currency code can be
     * configured using the `DEFAULT_CURRENCY_CODE` injection token.
     * @param display The format for the currency indicator. One of the following:
     *   - `code`: Show the code (such as `USD`).
     *   - `symbol`(default): Show the symbol (such as `$`).
     *   - `symbol-narrow`: Use the narrow symbol for locales that have two symbols for their
     * currency.
     * For example, the Canadian dollar CAD has the symbol `CA$` and the symbol-narrow `$`. If the
     * locale has no narrow symbol, uses the standard symbol for the locale.
     *   - String: Use the given string value instead of a code or a symbol.
     * For example, an empty string will suppress the currency & symbol.
     *   - Boolean (marked deprecated in v5): `true` for symbol and false for `code`.
     *
     * @param digitsInfo Decimal representation options, specified by a string
     * in the following format:<br>
     * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
     *   - `minIntegerDigits`: The minimum number of integer digits before the decimal point.
     * Default is `1`.
     *   - `minFractionDigits`: The minimum number of digits after the decimal point.
     * Default is `2`.
     *   - `maxFractionDigits`: The maximum number of digits after the decimal point.
     * Default is `2`.
     * If not provided, the number will be formatted with the proper amount of digits,
     * depending on what the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) specifies.
     * For example, the Canadian dollar has 2 digits, whereas the Chilean peso has none.
     * @param locale A locale code for the locale format rules to use.
     * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
     * See [Setting your app locale](guide/i18n/locale-id).
     */
    transform(value: number | string, currencyCode?: string, display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean, digitsInfo?: string, locale?: string): string | null;
    transform(value: null | undefined, currencyCode?: string, display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean, digitsInfo?: string, locale?: string): null;
    transform(value: number | string | null | undefined, currencyCode?: string, display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean, digitsInfo?: string, locale?: string): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrencyPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CurrencyPipe, "currency", true>;
}

/**
 * An interface that describes the date pipe configuration, which can be provided using the
 * `DATE_PIPE_DEFAULT_OPTIONS` token.
 *
 * @see {@link DATE_PIPE_DEFAULT_OPTIONS}
 *
 * @publicApi
 */
interface DatePipeConfig {
    dateFormat?: string;
    timezone?: string;
}

/**
 * Optionally-provided default timezone to use for all instances of `DatePipe` (such as `'+0430'`).
 * If the value isn't provided, the `DatePipe` will use the end-user's local system timezone.
 *
 * @deprecated use DATE_PIPE_DEFAULT_OPTIONS token to configure DatePipe
 */
declare const DATE_PIPE_DEFAULT_TIMEZONE: InjectionToken<string>;
/**
 * DI token that allows to provide default configuration for the `DatePipe` instances in an
 * application. The value is an object which can include the following fields:
 * - `dateFormat`: configures the default date format. If not provided, the `DatePipe`
 * will use the 'mediumDate' as a value.
 * - `timezone`: configures the default timezone. If not provided, the `DatePipe` will
 * use the end-user's local system timezone.
 *
 * @see {@link DatePipeConfig}
 *
 * @usageNotes
 *
 * Various date pipe default values can be overwritten by providing this token with
 * the value that has this interface.
 *
 * For example:
 *
 * Override the default date format by providing a value using the token:
 * ```ts
 * providers: [
 *   {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'shortDate'}}
 * ]
 * ```
 *
 * Override the default timezone by providing a value using the token:
 * ```ts
 * providers: [
 *   {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {timezone: '-1200'}}
 * ]
 * ```
 */
declare const DATE_PIPE_DEFAULT_OPTIONS: InjectionToken<DatePipeConfig>;
/**
 * @ngModule CommonModule
 * @description
 *
 * Formats a date value according to locale rules.
 *
 * `DatePipe` is executed only when it detects a pure change to the input value.
 * A pure change is either a change to a primitive input value
 * (such as `String`, `Number`, `Boolean`, or `Symbol`),
 * or a changed object reference (such as `Date`, `Array`, `Function`, or `Object`).
 *
 * Note that mutating a `Date` object does not cause the pipe to be rendered again.
 * To ensure that the pipe is executed, you must create a new `Date` object.
 *
 * Only the `en-US` locale data comes with Angular. To localize dates
 * in another language, you must import the corresponding locale data.
 * See the [I18n guide](guide/i18n/format-data-locale) for more information.
 *
 * The time zone of the formatted value can be specified either by passing it in as the second
 * parameter of the pipe, or by setting the default through the `DATE_PIPE_DEFAULT_OPTIONS`
 * injection token. The value that is passed in as the second parameter takes precedence over
 * the one defined using the injection token.
 *
 * @see {@link formatDate}
 *
 *
 * @usageNotes
 *
 * The result of this pipe is not reevaluated when the input is mutated. To avoid the need to
 * reformat the date on every change-detection cycle, treat the date as an immutable object
 * and change the reference when the pipe needs to run again.
 *
 * ### Pre-defined format options
 *
 * | Option        | Equivalent to                       | Examples (given in `en-US` locale)              |
 * |---------------|-------------------------------------|-------------------------------------------------|
 * | `'short'`     | `'M/d/yy, h:mm a'`                  | `6/15/15, 9:03 AM`                              |
 * | `'medium'`    | `'MMM d, y, h:mm:ss a'`             | `Jun 15, 2015, 9:03:01 AM`                      |
 * | `'long'`      | `'MMMM d, y, h:mm:ss a z'`          | `June 15, 2015 at 9:03:01 AM GMT+1`             |
 * | `'full'`      | `'EEEE, MMMM d, y, h:mm:ss a zzzz'` | `Monday, June 15, 2015 at 9:03:01 AM GMT+01:00` |
 * | `'shortDate'` | `'M/d/yy'`                          | `6/15/15`                                       |
 * | `'mediumDate'`| `'MMM d, y'`                        | `Jun 15, 2015`                                  |
 * | `'longDate'`  | `'MMMM d, y'`                       | `June 15, 2015`                                 |
 * | `'fullDate'`  | `'EEEE, MMMM d, y'`                 | `Monday, June 15, 2015`                         |
 * | `'shortTime'` | `'h:mm a'`                          | `9:03 AM`                                       |
 * | `'mediumTime'`| `'h:mm:ss a'`                       | `9:03:01 AM`                                    |
 * | `'longTime'`  | `'h:mm:ss a z'`                     | `9:03:01 AM GMT+1`                              |
 * | `'fullTime'`  | `'h:mm:ss a zzzz'`                  | `9:03:01 AM GMT+01:00`                          |
 *
 * ### Custom format options
 *
 * You can construct a format string using symbols to specify the components
 * of a date-time value, as described in the following table.
 * Format details depend on the locale.
 * Fields marked with (*) are only available in the extra data set for the given locale.
 *
 *  | Field type              | Format      | Description                                                   | Example Value                                              |
 *  |-------------------------|-------------|---------------------------------------------------------------|------------------------------------------------------------|
 *  | Era                     | G, GG & GGG | Abbreviated                                                   | AD                                                         |
 *  |                         | GGGG        | Wide                                                          | Anno Domini                                                |
 *  |                         | GGGGG       | Narrow                                                        | A                                                          |
 *  | Year                    | y           | Numeric: minimum digits                                       | 2, 20, 201, 2017, 20173                                    |
 *  |                         | yy          | Numeric: 2 digits + zero padded                               | 02, 20, 01, 17, 73                                         |
 *  |                         | yyy         | Numeric: 3 digits + zero padded                               | 002, 020, 201, 2017, 20173                                 |
 *  |                         | yyyy        | Numeric: 4 digits or more + zero padded                       | 0002, 0020, 0201, 2017, 20173                              |
 *  | ISO Week-numbering year | Y           | Numeric: minimum digits                                       | 2, 20, 201, 2017, 20173                                    |
 *  |                         | YY          | Numeric: 2 digits + zero padded                               | 02, 20, 01, 17, 73                                         |
 *  |                         | YYY         | Numeric: 3 digits + zero padded                               | 002, 020, 201, 2017, 20173                                 |
 *  |                         | YYYY        | Numeric: 4 digits or more + zero padded                       | 0002, 0020, 0201, 2017, 20173                              |
 *  | Month                   | M           | Numeric: 1 digit                                              | 9, 12                                                      |
 *  |                         | MM          | Numeric: 2 digits + zero padded                               | 09, 12                                                     |
 *  |                         | MMM         | Abbreviated                                                   | Sep                                                        |
 *  |                         | MMMM        | Wide                                                          | September                                                  |
 *  |                         | MMMMM       | Narrow                                                        | S                                                          |
 *  | Month standalone        | L           | Numeric: 1 digit                                              | 9, 12                                                      |
 *  |                         | LL          | Numeric: 2 digits + zero padded                               | 09, 12                                                     |
 *  |                         | LLL         | Abbreviated                                                   | Sep                                                        |
 *  |                         | LLLL        | Wide                                                          | September                                                  |
 *  |                         | LLLLL       | Narrow                                                        | S                                                          |
 *  | ISO Week of year        | w           | Numeric: minimum digits                                       | 1... 53                                                    |
 *  |                         | ww          | Numeric: 2 digits + zero padded                               | 01... 53                                                   |
 *  | Week of month           | W           | Numeric: 1 digit                                              | 1... 5                                                     |
 *  | Day of month            | d           | Numeric: minimum digits                                       | 1                                                          |
 *  |                         | dd          | Numeric: 2 digits + zero padded                               | 01                                                         |
 *  | Week day                | E, EE & EEE | Abbreviated                                                   | Tue                                                        |
 *  |                         | EEEE        | Wide                                                          | Tuesday                                                    |
 *  |                         | EEEEE       | Narrow                                                        | T                                                          |
 *  |                         | EEEEEE      | Short                                                         | Tu                                                         |
 *  | Week day standalone     | c, cc       | Numeric: 1 digit                                              | 2                                                          |
 *  |                         | ccc         | Abbreviated                                                   | Tue                                                        |
 *  |                         | cccc        | Wide                                                          | Tuesday                                                    |
 *  |                         | ccccc       | Narrow                                                        | T                                                          |
 *  |                         | cccccc      | Short                                                         | Tu                                                         |
 *  | Period                  | a, aa & aaa | Abbreviated                                                   | am/pm or AM/PM                                             |
 *  |                         | aaaa        | Wide (fallback to `a` when missing)                           | ante meridiem/post meridiem                                |
 *  |                         | aaaaa       | Narrow                                                        | a/p                                                        |
 *  | Period*                 | B, BB & BBB | Abbreviated                                                   | mid.                                                       |
 *  |                         | BBBB        | Wide                                                          | am, pm, midnight, noon, morning, afternoon, evening, night |
 *  |                         | BBBBB       | Narrow                                                        | md                                                         |
 *  | Period standalone*      | b, bb & bbb | Abbreviated                                                   | mid.                                                       |
 *  |                         | bbbb        | Wide                                                          | am, pm, midnight, noon, morning, afternoon, evening, night |
 *  |                         | bbbbb       | Narrow                                                        | md                                                         |
 *  | Hour 1-12               | h           | Numeric: minimum digits                                       | 1, 12                                                      |
 *  |                         | hh          | Numeric: 2 digits + zero padded                               | 01, 12                                                     |
 *  | Hour 0-23               | H           | Numeric: minimum digits                                       | 0, 23                                                      |
 *  |                         | HH          | Numeric: 2 digits + zero padded                               | 00, 23                                                     |
 *  | Minute                  | m           | Numeric: minimum digits                                       | 8, 59                                                      |
 *  |                         | mm          | Numeric: 2 digits + zero padded                               | 08, 59                                                     |
 *  | Second                  | s           | Numeric: minimum digits                                       | 0... 59                                                    |
 *  |                         | ss          | Numeric: 2 digits + zero padded                               | 00... 59                                                   |
 *  | Fractional seconds      | S           | Numeric: 1 digit                                              | 0... 9                                                     |
 *  |                         | SS          | Numeric: 2 digits + zero padded                               | 00... 99                                                   |
 *  |                         | SSS         | Numeric: 3 digits + zero padded (= milliseconds)              | 000... 999                                                 |
 *  | Zone                    | z, zz & zzz | Short specific non location format (fallback to O)            | GMT-8                                                      |
 *  |                         | zzzz        | Long specific non location format (fallback to OOOO)          | GMT-08:00                                                  |
 *  |                         | Z, ZZ & ZZZ | ISO8601 basic format                                          | -0800                                                      |
 *  |                         | ZZZZ        | Long localized GMT format                                     | GMT-8:00                                                   |
 *  |                         | ZZZZZ       | ISO8601 extended format + Z indicator for offset 0 (= XXXXX)  | -08:00                                                     |
 *  |                         | O, OO & OOO | Short localized GMT format                                    | GMT-8                                                      |
 *  |                         | OOOO        | Long localized GMT format                                     | GMT-08:00                                                  |
 *
 *
 * ### Format examples
 *
 * These examples transform a date into various formats,
 * assuming that `dateObj` is a JavaScript `Date` object for
 * year: 2015, month: 6, day: 15, hour: 21, minute: 43, second: 11,
 * given in the local time for the `en-US` locale.
 *
 * ```
 * {{ dateObj | date }}               // output is 'Jun 15, 2015'
 * {{ dateObj | date:'medium' }}      // output is 'Jun 15, 2015, 9:43:11 PM'
 * {{ dateObj | date:'shortTime' }}   // output is '9:43 PM'
 * {{ dateObj | date:'mm:ss' }}       // output is '43:11'
 * {{ dateObj | date:"MMM dd, yyyy 'at' hh:mm a" }}  // output is 'Jun 15, 2015 at 09:43 PM'
 * ```
 *
 * ### Usage example
 *
 * The following component uses a date pipe to display the current date in different formats.
 *
 * ```angular-ts
 * @Component({
 *  selector: 'date-pipe',
 *  template: `<div>
 *    <p>Today is {{today | date}}</p>
 *    <p>Or if you prefer, {{today | date:'fullDate'}}</p>
 *    <p>The time is {{today | date:'h:mm a z'}}</p>
 *  </div>`
 * })
 * // Get the current date and time as a date-time value.
 * export class DatePipeComponent {
 *   today: number = Date.now();
 * }
 * ```
 *
 * @publicApi
 */
declare class DatePipe implements PipeTransform {
    private locale;
    private defaultTimezone?;
    private defaultOptions?;
    constructor(locale: string, defaultTimezone?: string | null | undefined, defaultOptions?: (DatePipeConfig | null) | undefined);
    /**
     * @param value The date expression: a `Date` object,  a number
     * (milliseconds since UTC epoch), or an ISO string (https://www.w3.org/TR/NOTE-datetime).
     * @param format The date/time components to include, using predefined options or a
     * custom format string.  When not provided, the `DatePipe` looks for the value using the
     * `DATE_PIPE_DEFAULT_OPTIONS` injection token (and reads the `dateFormat` property).
     * If the token is not configured, the `mediumDate` is used as a value.
     * @param timezone A timezone offset (such as `'+0430'`). When not provided, the `DatePipe`
     * looks for the value using the `DATE_PIPE_DEFAULT_OPTIONS` injection token (and reads
     * the `timezone` property). If the token is not configured, the end-user's local system
     * timezone is used as a value.
     * @param locale A locale code for the locale format rules to use.
     * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
     * See [Setting your app locale](guide/i18n/locale-id).
     *
     * @see {@link DATE_PIPE_DEFAULT_OPTIONS}
     *
     * @returns A date string in the desired format.
     */
    transform(value: Date | string | number, format?: string, timezone?: string, locale?: string): string | null;
    transform(value: null | undefined, format?: string, timezone?: string, locale?: string): null;
    transform(value: Date | string | number | null | undefined, format?: string, timezone?: string, locale?: string): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePipe, [null, { optional: true; }, { optional: true; }]>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DatePipe, "date", true>;
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Maps a value to a string that pluralizes the value according to locale rules.
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example common/pipes/ts/i18n_pipe.ts region='I18nPluralPipeComponent'}
 *
 * @publicApi
 */
declare class I18nPluralPipe implements PipeTransform {
    private _localization;
    constructor(_localization: NgLocalization);
    /**
     * @param value the number to be formatted
     * @param pluralMap an object that mimics the ICU format, see
     * https://unicode-org.github.io/icu/userguide/format_parse/messages/.
     * @param locale a `string` defining the locale to use (uses the current {@link LOCALE_ID} by
     * default).
     */
    transform(value: number | null | undefined, pluralMap: {
        [count: string]: string;
    }, locale?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nPluralPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<I18nPluralPipe, "i18nPlural", true>;
}

/**
 * @ngModule CommonModule
 * @description
 *
 * Generic selector that displays the string that matches the current value.
 *
 * If none of the keys of the `mapping` match the `value`, then the content
 * of the `other` key is returned when present, otherwise an empty string is returned.
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example common/pipes/ts/i18n_pipe.ts region='I18nSelectPipeComponent'}
 *
 * @publicApi
 */
declare class I18nSelectPipe implements PipeTransform {
    /**
     * @param value a string to be internationalized.
     * @param mapping an object that indicates the text that should be displayed
     * for different values of the provided `value`.
     */
    transform(value: string | null | undefined, mapping: {
        [key: string]: string;
    }): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nSelectPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<I18nSelectPipe, "i18nSelect", true>;
}

/**
 * A key value pair.
 * Usually used to represent the key value pairs from a Map or Object.
 *
 * @publicApi
 */
interface KeyValue<K, V> {
    key: K;
    value: V;
}
/**
 * @ngModule CommonModule
 * @description
 *
 * Transforms Object or Map into an array of key value pairs.
 *
 * The output array will be ordered by keys.
 * By default the comparator will be by Unicode point value.
 * You can optionally pass a compareFn if your keys are complex types.
 * Passing `null` as the compareFn will use natural ordering of the input.
 *
 * @usageNotes
 * ### Examples
 *
 * This examples show how an Object or a Map can be iterated by ngFor with the use of this
 * keyvalue pipe.
 *
 * {@example common/pipes/ts/keyvalue_pipe.ts region='KeyValuePipe'}
 *
 * @publicApi
 */
declare class KeyValuePipe implements PipeTransform {
    private readonly differs;
    constructor(differs: KeyValueDiffers);
    private differ;
    private keyValues;
    private compareFn;
    transform<K, V>(input: ReadonlyMap<K, V>, compareFn?: ((a: KeyValue<K, V>, b: KeyValue<K, V>) => number) | null): Array<KeyValue<K, V>>;
    transform<K extends number, V>(input: Record<K, V>, compareFn?: ((a: KeyValue<string, V>, b: KeyValue<string, V>) => number) | null): Array<KeyValue<string, V>>;
    transform<K extends string, V>(input: Record<K, V> | ReadonlyMap<K, V>, compareFn?: ((a: KeyValue<K, V>, b: KeyValue<K, V>) => number) | null): Array<KeyValue<K, V>>;
    transform(input: null | undefined, compareFn?: ((a: KeyValue<unknown, unknown>, b: KeyValue<unknown, unknown>) => number) | null): null;
    transform<K, V>(input: ReadonlyMap<K, V> | null | undefined, compareFn?: ((a: KeyValue<K, V>, b: KeyValue<K, V>) => number) | null): Array<KeyValue<K, V>> | null;
    transform<K extends number, V>(input: Record<K, V> | null | undefined, compareFn?: ((a: KeyValue<string, V>, b: KeyValue<string, V>) => number) | null): Array<KeyValue<string, V>> | null;
    transform<K extends string, V>(input: Record<K, V> | ReadonlyMap<K, V> | null | undefined, compareFn?: ((a: KeyValue<K, V>, b: KeyValue<K, V>) => number) | null): Array<KeyValue<K, V>> | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyValuePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<KeyValuePipe, "keyvalue", true>;
}

/**
 * Exports all the basic Angular directives and pipes,
 * such as `NgIf`, `NgForOf`, `DecimalPipe`, and so on.
 * Re-exported by `BrowserModule`, which is included automatically in the root
 * `AppModule` when you create a new app with the CLI `new` command.
 *
 * @publicApi
 */
declare class CommonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<CommonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<CommonModule, never, [typeof NgClass, typeof NgComponentOutlet, typeof NgForOf, typeof NgIf, typeof NgTemplateOutlet, typeof NgStyle, typeof NgSwitch, typeof NgSwitchCase, typeof NgSwitchDefault, typeof NgPlural, typeof NgPluralCase, typeof AsyncPipe, typeof UpperCasePipe, typeof LowerCasePipe, typeof JsonPipe, typeof SlicePipe, typeof DecimalPipe, typeof PercentPipe, typeof TitleCasePipe, typeof CurrencyPipe, typeof DatePipe, typeof I18nPluralPipe, typeof I18nSelectPipe, typeof KeyValuePipe], [typeof NgClass, typeof NgComponentOutlet, typeof NgForOf, typeof NgIf, typeof NgTemplateOutlet, typeof NgStyle, typeof NgSwitch, typeof NgSwitchCase, typeof NgSwitchDefault, typeof NgPlural, typeof NgPluralCase, typeof AsyncPipe, typeof UpperCasePipe, typeof LowerCasePipe, typeof JsonPipe, typeof SlicePipe, typeof DecimalPipe, typeof PercentPipe, typeof TitleCasePipe, typeof CurrencyPipe, typeof DatePipe, typeof I18nPluralPipe, typeof I18nSelectPipe, typeof KeyValuePipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<CommonModule>;
}

export { APP_BASE_HREF, AsyncPipe, CommonModule, CurrencyPipe, DATE_PIPE_DEFAULT_OPTIONS, DATE_PIPE_DEFAULT_TIMEZONE, DatePipe, DecimalPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, Location, LocationStrategy, LowerCasePipe, NgClass, NgComponentOutlet, NgForOf, NgForOfContext, NgIf, NgIfContext, NgLocaleLocalization, NgLocalization, NgPlural, NgPluralCase, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet, PathLocationStrategy, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe };
export type { DatePipeConfig, KeyValue, PopStateEvent };
