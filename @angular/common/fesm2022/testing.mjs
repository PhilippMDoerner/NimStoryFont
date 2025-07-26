/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { ɵnormalizeQueryParams as _normalizeQueryParams, LocationStrategy } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, Injectable, Inject, Optional, inject, DOCUMENT } from '@angular/core';
import { Subject } from 'rxjs';
import { PlatformNavigation } from './platform_navigation-B45Jeakb.mjs';
import { ɵFakeNavigation as _FakeNavigation } from '@angular/core/testing';
export { ɵFakeNavigation } from '@angular/core/testing';
import { PlatformLocation, Location, LocationStrategy as LocationStrategy$1 } from './location-BIEtBxGx.mjs';

/**
 * Parser from https://tools.ietf.org/html/rfc3986#appendix-B
 * ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?
 *  12            3  4          5       6  7        8 9
 *
 * Example: http://www.ics.uci.edu/pub/ietf/uri/#Related
 *
 * Results in:
 *
 * $1 = http:
 * $2 = http
 * $3 = //www.ics.uci.edu
 * $4 = www.ics.uci.edu
 * $5 = /pub/ietf/uri/
 * $6 = <undefined>
 * $7 = <undefined>
 * $8 = #Related
 * $9 = Related
 */
const urlParse = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
function parseUrl(urlStr, baseHref) {
    const verifyProtocol = /^((http[s]?|ftp):\/\/)/;
    let serverBase;
    // URL class requires full URL. If the URL string doesn't start with protocol, we need to add
    // an arbitrary base URL which can be removed afterward.
    if (!verifyProtocol.test(urlStr)) {
        serverBase = 'http://empty.com/';
    }
    let parsedUrl;
    try {
        parsedUrl = new URL(urlStr, serverBase);
    }
    catch (e) {
        const result = urlParse.exec(serverBase || '' + urlStr);
        if (!result) {
            throw new Error(`Invalid URL: ${urlStr} with base: ${baseHref}`);
        }
        const hostSplit = result[4].split(':');
        parsedUrl = {
            protocol: result[1],
            hostname: hostSplit[0],
            port: hostSplit[1] || '',
            pathname: result[5],
            search: result[6],
            hash: result[8],
        };
    }
    if (parsedUrl.pathname && parsedUrl.pathname.indexOf(baseHref) === 0) {
        parsedUrl.pathname = parsedUrl.pathname.substring(baseHref.length);
    }
    return {
        hostname: (!serverBase && parsedUrl.hostname) || '',
        protocol: (!serverBase && parsedUrl.protocol) || '',
        port: (!serverBase && parsedUrl.port) || '',
        pathname: parsedUrl.pathname || '/',
        search: parsedUrl.search || '',
        hash: parsedUrl.hash || '',
    };
}
/**
 * Provider for mock platform location config
 *
 * @publicApi
 */
const MOCK_PLATFORM_LOCATION_CONFIG = new InjectionToken('MOCK_PLATFORM_LOCATION_CONFIG');
/**
 * Mock implementation of URL state.
 *
 * @publicApi
 */
class MockPlatformLocation {
    baseHref = '';
    hashUpdate = new Subject();
    popStateSubject = new Subject();
    urlChangeIndex = 0;
    urlChanges = [{ hostname: '', protocol: '', port: '', pathname: '/', search: '', hash: '', state: null }];
    constructor(config) {
        if (config) {
            this.baseHref = config.appBaseHref || '';
            const parsedChanges = this.parseChanges(null, config.startUrl || 'http://_empty_/', this.baseHref);
            this.urlChanges[0] = { ...parsedChanges };
        }
    }
    get hostname() {
        return this.urlChanges[this.urlChangeIndex].hostname;
    }
    get protocol() {
        return this.urlChanges[this.urlChangeIndex].protocol;
    }
    get port() {
        return this.urlChanges[this.urlChangeIndex].port;
    }
    get pathname() {
        return this.urlChanges[this.urlChangeIndex].pathname;
    }
    get search() {
        return this.urlChanges[this.urlChangeIndex].search;
    }
    get hash() {
        return this.urlChanges[this.urlChangeIndex].hash;
    }
    get state() {
        return this.urlChanges[this.urlChangeIndex].state;
    }
    getBaseHrefFromDOM() {
        return this.baseHref;
    }
    onPopState(fn) {
        const subscription = this.popStateSubject.subscribe(fn);
        return () => subscription.unsubscribe();
    }
    onHashChange(fn) {
        const subscription = this.hashUpdate.subscribe(fn);
        return () => subscription.unsubscribe();
    }
    get href() {
        let url = `${this.protocol}//${this.hostname}${this.port ? ':' + this.port : ''}`;
        url += `${this.pathname === '/' ? '' : this.pathname}${this.search}${this.hash}`;
        return url;
    }
    get url() {
        return `${this.pathname}${this.search}${this.hash}`;
    }
    parseChanges(state, url, baseHref = '') {
        // When the `history.state` value is stored, it is always copied.
        state = JSON.parse(JSON.stringify(state));
        return { ...parseUrl(url, baseHref), state };
    }
    replaceState(state, title, newUrl) {
        const { pathname, search, state: parsedState, hash } = this.parseChanges(state, newUrl);
        this.urlChanges[this.urlChangeIndex] = {
            ...this.urlChanges[this.urlChangeIndex],
            pathname,
            search,
            hash,
            state: parsedState,
        };
    }
    pushState(state, title, newUrl) {
        const { pathname, search, state: parsedState, hash } = this.parseChanges(state, newUrl);
        if (this.urlChangeIndex > 0) {
            this.urlChanges.splice(this.urlChangeIndex + 1);
        }
        this.urlChanges.push({
            ...this.urlChanges[this.urlChangeIndex],
            pathname,
            search,
            hash,
            state: parsedState,
        });
        this.urlChangeIndex = this.urlChanges.length - 1;
    }
    forward() {
        const oldUrl = this.url;
        const oldHash = this.hash;
        if (this.urlChangeIndex < this.urlChanges.length) {
            this.urlChangeIndex++;
        }
        this.emitEvents(oldHash, oldUrl);
    }
    back() {
        const oldUrl = this.url;
        const oldHash = this.hash;
        if (this.urlChangeIndex > 0) {
            this.urlChangeIndex--;
        }
        this.emitEvents(oldHash, oldUrl);
    }
    historyGo(relativePosition = 0) {
        const oldUrl = this.url;
        const oldHash = this.hash;
        const nextPageIndex = this.urlChangeIndex + relativePosition;
        if (nextPageIndex >= 0 && nextPageIndex < this.urlChanges.length) {
            this.urlChangeIndex = nextPageIndex;
        }
        this.emitEvents(oldHash, oldUrl);
    }
    getState() {
        return this.state;
    }
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
    emitEvents(oldHash, oldUrl) {
        this.popStateSubject.next({
            type: 'popstate',
            state: this.getState(),
            oldUrl,
            newUrl: this.url,
        });
        if (oldHash !== this.hash) {
            this.hashUpdate.next({
                type: 'hashchange',
                state: null,
                oldUrl,
                newUrl: this.url,
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: MockPlatformLocation, deps: [{ token: MOCK_PLATFORM_LOCATION_CONFIG, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: MockPlatformLocation });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: MockPlatformLocation, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MOCK_PLATFORM_LOCATION_CONFIG]
                }, {
                    type: Optional
                }] }] });
/**
 * Mock implementation of URL state.
 */
class FakeNavigationPlatformLocation {
    _platformNavigation;
    constructor() {
        const platformNavigation = inject(PlatformNavigation);
        if (!(platformNavigation instanceof _FakeNavigation)) {
            throw new Error('FakePlatformNavigation cannot be used without FakeNavigation. Use ' +
                '`provideFakeNavigation` to have all these services provided together.');
        }
        this._platformNavigation = platformNavigation;
    }
    config = inject(MOCK_PLATFORM_LOCATION_CONFIG, { optional: true });
    getBaseHrefFromDOM() {
        return this.config?.appBaseHref ?? '';
    }
    onPopState(fn) {
        this._platformNavigation.window.addEventListener('popstate', fn);
        return () => this._platformNavigation.window.removeEventListener('popstate', fn);
    }
    onHashChange(fn) {
        this._platformNavigation.window.addEventListener('hashchange', fn);
        return () => this._platformNavigation.window.removeEventListener('hashchange', fn);
    }
    get href() {
        return this._platformNavigation.currentEntry.url;
    }
    get protocol() {
        return new URL(this._platformNavigation.currentEntry.url).protocol;
    }
    get hostname() {
        return new URL(this._platformNavigation.currentEntry.url).hostname;
    }
    get port() {
        return new URL(this._platformNavigation.currentEntry.url).port;
    }
    get pathname() {
        return new URL(this._platformNavigation.currentEntry.url).pathname;
    }
    get search() {
        return new URL(this._platformNavigation.currentEntry.url).search;
    }
    get hash() {
        return new URL(this._platformNavigation.currentEntry.url).hash;
    }
    pushState(state, title, url) {
        this._platformNavigation.pushState(state, title, url);
    }
    replaceState(state, title, url) {
        this._platformNavigation.replaceState(state, title, url);
    }
    forward() {
        this._platformNavigation.forward();
    }
    back() {
        this._platformNavigation.back();
    }
    historyGo(relativePosition = 0) {
        this._platformNavigation.go(relativePosition);
    }
    getState() {
        return this._platformNavigation.currentEntry.getHistoryState();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: FakeNavigationPlatformLocation, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: FakeNavigationPlatformLocation });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: FakeNavigationPlatformLocation, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });

const FAKE_NAVIGATION = new InjectionToken('fakeNavigation', {
    providedIn: 'root',
    factory: () => {
        const config = inject(MOCK_PLATFORM_LOCATION_CONFIG, { optional: true });
        const baseFallback = 'http://_empty_/';
        const startUrl = new URL(config?.startUrl || baseFallback, baseFallback);
        // TODO(atscott): If we want to replace MockPlatformLocation with FakeNavigationPlatformLocation
        // as the default in TestBed, we will likely need to use setSynchronousTraversalsForTesting(true);
        return new _FakeNavigation(inject(DOCUMENT), startUrl.href);
    },
});
/**
 * Return a provider for the `FakeNavigation` in place of the real Navigation API.
 */
function provideFakePlatformNavigation() {
    return [
        {
            provide: PlatformNavigation,
            useFactory: () => inject(FAKE_NAVIGATION),
        },
        { provide: PlatformLocation, useClass: FakeNavigationPlatformLocation },
    ];
}

/**
 * A spy for {@link Location} that allows tests to fire simulated location events.
 *
 * @publicApi
 */
class SpyLocation {
    urlChanges = [];
    _history = [new LocationState('', '', null)];
    _historyIndex = 0;
    /** @internal */
    _subject = new Subject();
    /** @internal */
    _basePath = '';
    /** @internal */
    _locationStrategy = null;
    /** @internal */
    _urlChangeListeners = [];
    /** @internal */
    _urlChangeSubscription = null;
    /** @docs-private */
    ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe();
        this._urlChangeListeners = [];
    }
    setInitialPath(url) {
        this._history[this._historyIndex].path = url;
    }
    setBaseHref(url) {
        this._basePath = url;
    }
    path() {
        return this._history[this._historyIndex].path;
    }
    getState() {
        return this._history[this._historyIndex].state;
    }
    isCurrentPathEqualTo(path, query = '') {
        const givenPath = path.endsWith('/') ? path.substring(0, path.length - 1) : path;
        const currPath = this.path().endsWith('/')
            ? this.path().substring(0, this.path().length - 1)
            : this.path();
        return currPath == givenPath + (query.length > 0 ? '?' + query : '');
    }
    simulateUrlPop(pathname) {
        this._subject.next({ 'url': pathname, 'pop': true, 'type': 'popstate' });
    }
    simulateHashChange(pathname) {
        const path = this.prepareExternalUrl(pathname);
        this.pushHistory(path, '', null);
        this.urlChanges.push('hash: ' + pathname);
        // the browser will automatically fire popstate event before each `hashchange` event, so we need
        // to simulate it.
        this._subject.next({ 'url': pathname, 'pop': true, 'type': 'popstate' });
        this._subject.next({ 'url': pathname, 'pop': true, 'type': 'hashchange' });
    }
    prepareExternalUrl(url) {
        if (url.length > 0 && !url.startsWith('/')) {
            url = '/' + url;
        }
        return this._basePath + url;
    }
    go(path, query = '', state = null) {
        path = this.prepareExternalUrl(path);
        this.pushHistory(path, query, state);
        const locationState = this._history[this._historyIndex - 1];
        if (locationState.path == path && locationState.query == query) {
            return;
        }
        const url = path + (query.length > 0 ? '?' + query : '');
        this.urlChanges.push(url);
        this._notifyUrlChangeListeners(path + _normalizeQueryParams(query), state);
    }
    replaceState(path, query = '', state = null) {
        path = this.prepareExternalUrl(path);
        const history = this._history[this._historyIndex];
        history.state = state;
        if (history.path == path && history.query == query) {
            return;
        }
        history.path = path;
        history.query = query;
        const url = path + (query.length > 0 ? '?' + query : '');
        this.urlChanges.push('replace: ' + url);
        this._notifyUrlChangeListeners(path + _normalizeQueryParams(query), state);
    }
    forward() {
        if (this._historyIndex < this._history.length - 1) {
            this._historyIndex++;
            this._subject.next({
                'url': this.path(),
                'state': this.getState(),
                'pop': true,
                'type': 'popstate',
            });
        }
    }
    back() {
        if (this._historyIndex > 0) {
            this._historyIndex--;
            this._subject.next({
                'url': this.path(),
                'state': this.getState(),
                'pop': true,
                'type': 'popstate',
            });
        }
    }
    historyGo(relativePosition = 0) {
        const nextPageIndex = this._historyIndex + relativePosition;
        if (nextPageIndex >= 0 && nextPageIndex < this._history.length) {
            this._historyIndex = nextPageIndex;
            this._subject.next({
                'url': this.path(),
                'state': this.getState(),
                'pop': true,
                'type': 'popstate',
            });
        }
    }
    onUrlChange(fn) {
        this._urlChangeListeners.push(fn);
        this._urlChangeSubscription ??= this.subscribe((v) => {
            this._notifyUrlChangeListeners(v.url, v.state);
        });
        return () => {
            const fnIndex = this._urlChangeListeners.indexOf(fn);
            this._urlChangeListeners.splice(fnIndex, 1);
            if (this._urlChangeListeners.length === 0) {
                this._urlChangeSubscription?.unsubscribe();
                this._urlChangeSubscription = null;
            }
        };
    }
    /** @internal */
    _notifyUrlChangeListeners(url = '', state) {
        this._urlChangeListeners.forEach((fn) => fn(url, state));
    }
    subscribe(onNext, onThrow, onReturn) {
        return this._subject.subscribe({
            next: onNext,
            error: onThrow ?? undefined,
            complete: onReturn ?? undefined,
        });
    }
    normalize(url) {
        return null;
    }
    pushHistory(path, query, state) {
        if (this._historyIndex > 0) {
            this._history.splice(this._historyIndex + 1);
        }
        this._history.push(new LocationState(path, query, state));
        this._historyIndex = this._history.length - 1;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: SpyLocation, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: SpyLocation });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: SpyLocation, decorators: [{
            type: Injectable
        }] });
class LocationState {
    path;
    query;
    state;
    constructor(path, query, state) {
        this.path = path;
        this.query = query;
        this.state = state;
    }
}

/**
 * A mock implementation of {@link LocationStrategy} that allows tests to fire simulated
 * location events.
 *
 * @publicApi
 */
class MockLocationStrategy extends LocationStrategy {
    internalBaseHref = '/';
    internalPath = '/';
    internalTitle = '';
    urlChanges = [];
    /** @internal */
    _subject = new Subject();
    stateChanges = [];
    constructor() {
        super();
    }
    simulatePopState(url) {
        this.internalPath = url;
        this._subject.next(new _MockPopStateEvent(this.path()));
    }
    path(includeHash = false) {
        return this.internalPath;
    }
    prepareExternalUrl(internal) {
        if (internal.startsWith('/') && this.internalBaseHref.endsWith('/')) {
            return this.internalBaseHref + internal.substring(1);
        }
        return this.internalBaseHref + internal;
    }
    pushState(ctx, title, path, query) {
        // Add state change to changes array
        this.stateChanges.push(ctx);
        this.internalTitle = title;
        const url = path + (query.length > 0 ? '?' + query : '');
        this.internalPath = url;
        const externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push(externalUrl);
    }
    replaceState(ctx, title, path, query) {
        // Reset the last index of stateChanges to the ctx (state) object
        this.stateChanges[(this.stateChanges.length || 1) - 1] = ctx;
        this.internalTitle = title;
        const url = path + (query.length > 0 ? '?' + query : '');
        this.internalPath = url;
        const externalUrl = this.prepareExternalUrl(url);
        this.urlChanges.push('replace: ' + externalUrl);
    }
    onPopState(fn) {
        this._subject.subscribe({ next: fn });
    }
    getBaseHref() {
        return this.internalBaseHref;
    }
    back() {
        if (this.urlChanges.length > 0) {
            this.urlChanges.pop();
            this.stateChanges.pop();
            const nextUrl = this.urlChanges.length > 0 ? this.urlChanges[this.urlChanges.length - 1] : '';
            this.simulatePopState(nextUrl);
        }
    }
    forward() {
        throw 'not implemented';
    }
    getState() {
        return this.stateChanges[(this.stateChanges.length || 1) - 1];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: MockLocationStrategy, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: MockLocationStrategy });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: MockLocationStrategy, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
class _MockPopStateEvent {
    newUrl;
    pop = true;
    type = 'popstate';
    constructor(newUrl) {
        this.newUrl = newUrl;
    }
}

/**
 * Returns mock providers for the `Location` and `LocationStrategy` classes.
 * The mocks are helpful in tests to fire simulated location events.
 *
 * @publicApi
 */
function provideLocationMocks() {
    return [
        { provide: Location, useClass: SpyLocation },
        { provide: LocationStrategy$1, useClass: MockLocationStrategy },
    ];
}

export { MOCK_PLATFORM_LOCATION_CONFIG, MockLocationStrategy, MockPlatformLocation, SpyLocation, provideLocationMocks, provideFakePlatformNavigation as ɵprovideFakePlatformNavigation };
//# sourceMappingURL=testing.mjs.map
