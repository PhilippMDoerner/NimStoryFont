/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { InjectionToken } from '@angular/core';

/**
 * This class should not be used directly by an application developer. Instead, use
 * {@link Location}.
 *
 * `PlatformLocation` encapsulates all calls to DOM APIs, which allows the Router to be
 * platform-agnostic.
 * This means that we can have different implementation of `PlatformLocation` for the different
 * platforms that Angular supports. For example, `@angular/platform-browser` provides an
 * implementation specific to the browser environment, while `@angular/platform-server` provides
 * one suitable for use with server-side rendering.
 *
 * The `PlatformLocation` class is used directly by all implementations of {@link LocationStrategy}
 * when they need to interact with the DOM APIs like pushState, popState, etc.
 *
 * {@link LocationStrategy} in turn is used by the {@link Location} service which is used directly
 * by the {@link /api/router/Router Router} in order to navigate between routes. Since all interactions between
 * {@link /api/router/Router Router} /
 * {@link Location} / {@link LocationStrategy} and DOM APIs flow through the `PlatformLocation`
 * class, they are all platform-agnostic.
 *
 * @publicApi
 */
declare abstract class PlatformLocation {
    abstract getBaseHrefFromDOM(): string;
    abstract getState(): unknown;
    /**
     * Returns a function that, when executed, removes the `popstate` event handler.
     */
    abstract onPopState(fn: LocationChangeListener): VoidFunction;
    /**
     * Returns a function that, when executed, removes the `hashchange` event handler.
     */
    abstract onHashChange(fn: LocationChangeListener): VoidFunction;
    abstract get href(): string;
    abstract get protocol(): string;
    abstract get hostname(): string;
    abstract get port(): string;
    abstract get pathname(): string;
    abstract get search(): string;
    abstract get hash(): string;
    abstract replaceState(state: any, title: string, url: string): void;
    abstract pushState(state: any, title: string, url: string): void;
    abstract forward(): void;
    abstract back(): void;
    historyGo?(relativePosition: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PlatformLocation, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PlatformLocation>;
}
/**
 * @description
 * Indicates when a location is initialized.
 *
 * @publicApi
 */
declare const LOCATION_INITIALIZED: InjectionToken<Promise<any>>;
/**
 * @description
 * A serializable version of the event from `onPopState` or `onHashChange`
 *
 * @publicApi
 */
interface LocationChangeEvent {
    type: string;
    state: any;
}
/**
 * @publicApi
 */
interface LocationChangeListener {
    (event: LocationChangeEvent): any;
}
/**
 * `PlatformLocation` encapsulates all of the direct calls to platform APIs.
 * This class should not be used directly by an application developer. Instead, use
 * {@link Location}.
 *
 * @publicApi
 */
declare class BrowserPlatformLocation extends PlatformLocation {
    private _location;
    private _history;
    private _doc;
    constructor();
    getBaseHrefFromDOM(): string;
    onPopState(fn: LocationChangeListener): VoidFunction;
    onHashChange(fn: LocationChangeListener): VoidFunction;
    get href(): string;
    get protocol(): string;
    get hostname(): string;
    get port(): string;
    get pathname(): string;
    get search(): string;
    get hash(): string;
    set pathname(newPath: string);
    pushState(state: any, title: string, url: string): void;
    replaceState(state: any, title: string, url: string): void;
    forward(): void;
    back(): void;
    historyGo(relativePosition?: number): void;
    getState(): unknown;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserPlatformLocation, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BrowserPlatformLocation>;
}

export { BrowserPlatformLocation, LOCATION_INITIALIZED, PlatformLocation };
export type { LocationChangeEvent, LocationChangeListener };
