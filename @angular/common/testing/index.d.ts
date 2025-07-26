/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { Provider, InjectionToken } from '@angular/core';
export { ɵFakeNavigation } from '@angular/core/testing';
import { Location, LocationStrategy } from '@angular/common';
import { SubscriptionLike } from 'rxjs';
import { PlatformLocation, LocationChangeListener } from '../platform_location.d-Lbv6Ueec.js';

/**
 * Return a provider for the `FakeNavigation` in place of the real Navigation API.
 */
declare function provideFakePlatformNavigation(): Provider[];

/**
 * A spy for {@link Location} that allows tests to fire simulated location events.
 *
 * @publicApi
 */
declare class SpyLocation implements Location {
    urlChanges: string[];
    private _history;
    private _historyIndex;
    /** @docs-private */
    ngOnDestroy(): void;
    setInitialPath(url: string): void;
    setBaseHref(url: string): void;
    path(): string;
    getState(): unknown;
    isCurrentPathEqualTo(path: string, query?: string): boolean;
    simulateUrlPop(pathname: string): void;
    simulateHashChange(pathname: string): void;
    prepareExternalUrl(url: string): string;
    go(path: string, query?: string, state?: any): void;
    replaceState(path: string, query?: string, state?: any): void;
    forward(): void;
    back(): void;
    historyGo(relativePosition?: number): void;
    onUrlChange(fn: (url: string, state: unknown) => void): VoidFunction;
    subscribe(onNext: (value: any) => void, onThrow?: ((error: any) => void) | null, onReturn?: (() => void) | null): SubscriptionLike;
    normalize(url: string): string;
    private pushHistory;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpyLocation, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SpyLocation>;
}

/**
 * A mock implementation of {@link LocationStrategy} that allows tests to fire simulated
 * location events.
 *
 * @publicApi
 */
declare class MockLocationStrategy extends LocationStrategy {
    internalBaseHref: string;
    internalPath: string;
    internalTitle: string;
    urlChanges: string[];
    private stateChanges;
    constructor();
    simulatePopState(url: string): void;
    path(includeHash?: boolean): string;
    prepareExternalUrl(internal: string): string;
    pushState(ctx: any, title: string, path: string, query: string): void;
    replaceState(ctx: any, title: string, path: string, query: string): void;
    onPopState(fn: (value: any) => void): void;
    getBaseHref(): string;
    back(): void;
    forward(): void;
    getState(): unknown;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockLocationStrategy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MockLocationStrategy>;
}

/**
 * Mock platform location config
 *
 * @publicApi
 */
interface MockPlatformLocationConfig {
    startUrl?: string;
    appBaseHref?: string;
}
/**
 * Provider for mock platform location config
 *
 * @publicApi
 */
declare const MOCK_PLATFORM_LOCATION_CONFIG: InjectionToken<MockPlatformLocationConfig>;
/**
 * Mock implementation of URL state.
 *
 * @publicApi
 */
declare class MockPlatformLocation implements PlatformLocation {
    private baseHref;
    private hashUpdate;
    private popStateSubject;
    private urlChangeIndex;
    private urlChanges;
    constructor(config?: MockPlatformLocationConfig);
    get hostname(): string;
    get protocol(): string;
    get port(): string;
    get pathname(): string;
    get search(): string;
    get hash(): string;
    get state(): unknown;
    getBaseHrefFromDOM(): string;
    onPopState(fn: LocationChangeListener): VoidFunction;
    onHashChange(fn: LocationChangeListener): VoidFunction;
    get href(): string;
    get url(): string;
    private parseChanges;
    replaceState(state: any, title: string, newUrl: string): void;
    pushState(state: any, title: string, newUrl: string): void;
    forward(): void;
    back(): void;
    historyGo(relativePosition?: number): void;
    getState(): unknown;
    /**
     * Browsers are inconsistent in when they fire events and perform the state updates
     * The most easiest thing to do in our mock is synchronous and that happens to match
     * Firefox and Chrome, at least somewhat closely
     *
     * https://github.com/WICG/navigation-api#watching-for-navigations
     * https://docs.google.com/document/d/1Pdve-DJ1JCGilj9Yqf5HxRJyBKSel5owgOvUJqTauwU/edit#heading=h.3ye4v71wsz94
     * popstate is always sent before hashchange:
     * https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#when_popstate_is_sent
     */
    private emitEvents;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockPlatformLocation, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MockPlatformLocation>;
}

/**
 * Returns mock providers for the `Location` and `LocationStrategy` classes.
 * The mocks are helpful in tests to fire simulated location events.
 *
 * @publicApi
 */
declare function provideLocationMocks(): Provider[];

export { MOCK_PLATFORM_LOCATION_CONFIG, MockLocationStrategy, MockPlatformLocation, SpyLocation, provideLocationMocks, provideFakePlatformNavigation as ɵprovideFakePlatformNavigation };
export type { MockPlatformLocationConfig };
