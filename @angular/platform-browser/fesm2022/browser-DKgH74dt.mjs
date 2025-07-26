/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { ɵDomAdapter as _DomAdapter, ɵsetRootDomAdapter as _setRootDomAdapter, ɵparseCookieValue as _parseCookieValue, ɵgetDOM as _getDOM, DOCUMENT, ɵPLATFORM_BROWSER_ID as _PLATFORM_BROWSER_ID, XhrFactory, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { ɵglobal as _global, ɵRuntimeError as _RuntimeError, Injectable, Inject, ɵinternalCreateApplication as _internalCreateApplication, PLATFORM_ID, PLATFORM_INITIALIZER, createPlatformFactory, platformCore, InjectionToken, ɵTESTABILITY_GETTER as _TESTABILITY_GETTER, ɵTESTABILITY as _TESTABILITY, Testability, NgZone, TestabilityRegistry, ɵINJECTOR_SCOPE as _INJECTOR_SCOPE, ErrorHandler, RendererFactory2, inject, ApplicationModule, NgModule, ɵsetDocument as _setDocument } from '@angular/core';
import { EventManagerPlugin, EVENT_MANAGER_PLUGINS, DomRendererFactory2, SharedStylesHost, EventManager } from './dom_renderer-Frqw9gM5.mjs';

/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
class BrowserDomAdapter extends _DomAdapter {
    supportsDOMEvents = true;
    static makeCurrent() {
        _setRootDomAdapter(new BrowserDomAdapter());
    }
    onAndCancel(el, evt, listener, options) {
        el.addEventListener(evt, listener, options);
        return () => {
            el.removeEventListener(evt, listener, options);
        };
    }
    dispatchEvent(el, evt) {
        el.dispatchEvent(evt);
    }
    remove(node) {
        node.remove();
    }
    createElement(tagName, doc) {
        doc = doc || this.getDefaultDocument();
        return doc.createElement(tagName);
    }
    createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
    }
    getDefaultDocument() {
        return document;
    }
    isElementNode(node) {
        return node.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(node) {
        return node instanceof DocumentFragment;
    }
    /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
    getGlobalEventTarget(doc, target) {
        if (target === 'window') {
            return window;
        }
        if (target === 'document') {
            return doc;
        }
        if (target === 'body') {
            return doc.body;
        }
        return null;
    }
    getBaseHref(doc) {
        const href = getBaseElementHref();
        return href == null ? null : relativePath(href);
    }
    resetBaseElement() {
        baseElement = null;
    }
    getUserAgent() {
        return window.navigator.userAgent;
    }
    getCookie(name) {
        return _parseCookieValue(document.cookie, name);
    }
}
let baseElement = null;
function getBaseElementHref() {
    baseElement = baseElement || document.head.querySelector('base');
    return baseElement ? baseElement.getAttribute('href') : null;
}
function relativePath(url) {
    // The base URL doesn't really matter, we just need it so relative paths have something
    // to resolve against. In the browser `HTMLBaseElement.href` is always absolute.
    return new URL(url, document.baseURI).pathname;
}

class BrowserGetTestability {
    addToWindow(registry) {
        _global['getAngularTestability'] = (elem, findInAncestors = true) => {
            const testability = registry.findTestabilityInTree(elem, findInAncestors);
            if (testability == null) {
                throw new _RuntimeError(5103 /* RuntimeErrorCode.TESTABILITY_NOT_FOUND */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    'Could not find testability for element.');
            }
            return testability;
        };
        _global['getAllAngularTestabilities'] = () => registry.getAllTestabilities();
        _global['getAllAngularRootElements'] = () => registry.getAllRootElements();
        const whenAllStable = (callback) => {
            const testabilities = _global['getAllAngularTestabilities']();
            let count = testabilities.length;
            const decrement = function () {
                count--;
                if (count == 0) {
                    callback();
                }
            };
            testabilities.forEach((testability) => {
                testability.whenStable(decrement);
            });
        };
        if (!_global['frameworkStabilizers']) {
            _global['frameworkStabilizers'] = [];
        }
        _global['frameworkStabilizers'].push(whenAllStable);
    }
    findTestabilityInTree(registry, elem, findInAncestors) {
        if (elem == null) {
            return null;
        }
        const t = registry.getTestability(elem);
        if (t != null) {
            return t;
        }
        else if (!findInAncestors) {
            return null;
        }
        if (_getDOM().isShadowRoot(elem)) {
            return this.findTestabilityInTree(registry, elem.host, true);
        }
        return this.findTestabilityInTree(registry, elem.parentElement, true);
    }
}

/**
 * A factory for `HttpXhrBackend` that uses the `XMLHttpRequest` browser API.
 */
class BrowserXhr {
    build() {
        return new XMLHttpRequest();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserXhr, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserXhr });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserXhr, decorators: [{
            type: Injectable
        }] });

class DomEventsPlugin extends EventManagerPlugin {
    constructor(doc) {
        super(doc);
    }
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    supports(eventName) {
        return true;
    }
    addEventListener(element, eventName, handler, options) {
        element.addEventListener(eventName, handler, options);
        return () => this.removeEventListener(element, eventName, handler, options);
    }
    removeEventListener(target, eventName, callback, options) {
        return target.removeEventListener(eventName, callback, options);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: DomEventsPlugin, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: DomEventsPlugin });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: DomEventsPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });

/**
 * Defines supported modifiers for key events.
 */
const MODIFIER_KEYS = ['alt', 'control', 'meta', 'shift'];
// The following values are here for cross-browser compatibility and to match the W3C standard
// cf https://www.w3.org/TR/DOM-Level-3-Events-key/
const _keyMap = {
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS',
};
/**
 * Retrieves modifiers from key-event objects.
 */
const MODIFIER_KEY_GETTERS = {
    'alt': (event) => event.altKey,
    'control': (event) => event.ctrlKey,
    'meta': (event) => event.metaKey,
    'shift': (event) => event.shiftKey,
};
/**
 * A browser plug-in that provides support for handling of key events in Angular.
 */
class KeyEventsPlugin extends EventManagerPlugin {
    /**
     * Initializes an instance of the browser plug-in.
     * @param doc The document in which key events will be detected.
     */
    constructor(doc) {
        super(doc);
    }
    /**
     * Reports whether a named key event is supported.
     * @param eventName The event name to query.
     * @return True if the named key event is supported.
     */
    supports(eventName) {
        return KeyEventsPlugin.parseEventName(eventName) != null;
    }
    /**
     * Registers a handler for a specific element and key event.
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the key event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns The key event that was registered.
     */
    addEventListener(element, eventName, handler, options) {
        const parsedEvent = KeyEventsPlugin.parseEventName(eventName);
        const outsideHandler = KeyEventsPlugin.eventCallback(parsedEvent['fullKey'], handler, this.manager.getZone());
        return this.manager.getZone().runOutsideAngular(() => {
            return _getDOM().onAndCancel(element, parsedEvent['domEventName'], outsideHandler, options);
        });
    }
    /**
     * Parses the user provided full keyboard event definition and normalizes it for
     * later internal use. It ensures the string is all lowercase, converts special
     * characters to a standard spelling, and orders all the values consistently.
     *
     * @param eventName The name of the key event to listen for.
     * @returns an object with the full, normalized string, and the dom event name
     * or null in the case when the event doesn't match a keyboard event.
     */
    static parseEventName(eventName) {
        const parts = eventName.toLowerCase().split('.');
        const domEventName = parts.shift();
        if (parts.length === 0 || !(domEventName === 'keydown' || domEventName === 'keyup')) {
            return null;
        }
        const key = KeyEventsPlugin._normalizeKey(parts.pop());
        let fullKey = '';
        let codeIX = parts.indexOf('code');
        if (codeIX > -1) {
            parts.splice(codeIX, 1);
            fullKey = 'code.';
        }
        MODIFIER_KEYS.forEach((modifierName) => {
            const index = parts.indexOf(modifierName);
            if (index > -1) {
                parts.splice(index, 1);
                fullKey += modifierName + '.';
            }
        });
        fullKey += key;
        if (parts.length != 0 || key.length === 0) {
            // returning null instead of throwing to let another plugin process the event
            return null;
        }
        // NOTE: Please don't rewrite this as so, as it will break JSCompiler property renaming.
        //       The code must remain in the `result['domEventName']` form.
        // return {domEventName, fullKey};
        const result = {};
        result['domEventName'] = domEventName;
        result['fullKey'] = fullKey;
        return result;
    }
    /**
     * Determines whether the actual keys pressed match the configured key code string.
     * The `fullKeyCode` event is normalized in the `parseEventName` method when the
     * event is attached to the DOM during the `addEventListener` call. This is unseen
     * by the end user and is normalized for internal consistency and parsing.
     *
     * @param event The keyboard event.
     * @param fullKeyCode The normalized user defined expected key event string
     * @returns boolean.
     */
    static matchEventFullKeyCode(event, fullKeyCode) {
        let keycode = _keyMap[event.key] || event.key;
        let key = '';
        if (fullKeyCode.indexOf('code.') > -1) {
            keycode = event.code;
            key = 'code.';
        }
        // the keycode could be unidentified so we have to check here
        if (keycode == null || !keycode)
            return false;
        keycode = keycode.toLowerCase();
        if (keycode === ' ') {
            keycode = 'space'; // for readability
        }
        else if (keycode === '.') {
            keycode = 'dot'; // because '.' is used as a separator in event names
        }
        MODIFIER_KEYS.forEach((modifierName) => {
            if (modifierName !== keycode) {
                const modifierGetter = MODIFIER_KEY_GETTERS[modifierName];
                if (modifierGetter(event)) {
                    key += modifierName + '.';
                }
            }
        });
        key += keycode;
        return key === fullKeyCode;
    }
    /**
     * Configures a handler callback for a key event.
     * @param fullKey The event name that combines all simultaneous keystrokes.
     * @param handler The function that responds to the key event.
     * @param zone The zone in which the event occurred.
     * @returns A callback function.
     */
    static eventCallback(fullKey, handler, zone) {
        return (event) => {
            if (KeyEventsPlugin.matchEventFullKeyCode(event, fullKey)) {
                zone.runGuarded(() => handler(event));
            }
        };
    }
    /** @internal */
    static _normalizeKey(keyName) {
        return keyName === 'esc' ? 'escape' : keyName;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: KeyEventsPlugin, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: KeyEventsPlugin });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: KeyEventsPlugin, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });

/**
 * Bootstraps an instance of an Angular application and renders a standalone component as the
 * application's root component. More information about standalone components can be found in [this
 * guide](guide/components/importing).
 *
 * @usageNotes
 * The root component passed into this function *must* be a standalone one (should have the
 * `standalone: true` flag in the `@Component` decorator config).
 *
 * ```angular-ts
 * @Component({
 *   standalone: true,
 *   template: 'Hello world!'
 * })
 * class RootComponent {}
 *
 * const appRef: ApplicationRef = await bootstrapApplication(RootComponent);
 * ```
 *
 * You can add the list of providers that should be available in the application injector by
 * specifying the `providers` field in an object passed as the second argument:
 *
 * ```ts
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     {provide: BACKEND_URL, useValue: 'https://yourdomain.com/api'}
 *   ]
 * });
 * ```
 *
 * The `importProvidersFrom` helper method can be used to collect all providers from any
 * existing NgModule (and transitively from all NgModules that it imports):
 *
 * ```ts
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     importProvidersFrom(SomeNgModule)
 *   ]
 * });
 * ```
 *
 * Note: the `bootstrapApplication` method doesn't include [Testability](api/core/Testability) by
 * default. You can add [Testability](api/core/Testability) by getting the list of necessary
 * providers using `provideProtractorTestingSupport()` function and adding them into the `providers`
 * array, for example:
 *
 * ```ts
 * import {provideProtractorTestingSupport} from '@angular/platform-browser';
 *
 * await bootstrapApplication(RootComponent, {providers: [provideProtractorTestingSupport()]});
 * ```
 *
 * @param rootComponent A reference to a standalone component that should be rendered.
 * @param options Extra configuration for the bootstrap operation, see `ApplicationConfig` for
 *     additional info.
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 *
 * @publicApi
 */
function bootstrapApplication(rootComponent, options) {
    return _internalCreateApplication({ rootComponent, ...createProvidersConfig(options) });
}
/**
 * Create an instance of an Angular application without bootstrapping any components. This is useful
 * for the situation where one wants to decouple application environment creation (a platform and
 * associated injectors) from rendering components on a screen. Components can be subsequently
 * bootstrapped on the returned `ApplicationRef`.
 *
 * @param options Extra configuration for the application environment, see `ApplicationConfig` for
 *     additional info.
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 *
 * @publicApi
 */
function createApplication(options) {
    return _internalCreateApplication(createProvidersConfig(options));
}
function createProvidersConfig(options) {
    return {
        appProviders: [...BROWSER_MODULE_PROVIDERS, ...(options?.providers ?? [])],
        platformProviders: INTERNAL_BROWSER_PLATFORM_PROVIDERS,
    };
}
/**
 * Returns a set of providers required to setup [Testability](api/core/Testability) for an
 * application bootstrapped using the `bootstrapApplication` function. The set of providers is
 * needed to support testing an application with Protractor (which relies on the Testability APIs
 * to be present).
 *
 * @returns An array of providers required to setup Testability for an application and make it
 *     available for testing using Protractor.
 *
 * @publicApi
 */
function provideProtractorTestingSupport() {
    // Return a copy to prevent changes to the original array in case any in-place
    // alterations are performed to the `provideProtractorTestingSupport` call results in app
    // code.
    return [...TESTABILITY_PROVIDERS];
}
function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
}
function errorHandler() {
    return new ErrorHandler();
}
function _document() {
    // Tell ivy about the global document
    _setDocument(document);
    return document;
}
const INTERNAL_BROWSER_PLATFORM_PROVIDERS = [
    { provide: PLATFORM_ID, useValue: _PLATFORM_BROWSER_ID },
    { provide: PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: DOCUMENT, useFactory: _document },
];
/**
 * A factory function that returns a `PlatformRef` instance associated with browser service
 * providers.
 *
 * @publicApi
 */
const platformBrowser = createPlatformFactory(platformCore, 'browser', INTERNAL_BROWSER_PLATFORM_PROVIDERS);
/**
 * Internal marker to signal whether providers from the `BrowserModule` are already present in DI.
 * This is needed to avoid loading `BrowserModule` providers twice. We can't rely on the
 * `BrowserModule` presence itself, since the standalone-based bootstrap just imports
 * `BrowserModule` providers without referencing the module itself.
 */
const BROWSER_MODULE_PROVIDERS_MARKER = new InjectionToken(typeof ngDevMode === 'undefined' || ngDevMode ? 'BrowserModule Providers Marker' : '');
const TESTABILITY_PROVIDERS = [
    {
        provide: _TESTABILITY_GETTER,
        useClass: BrowserGetTestability,
    },
    {
        provide: _TESTABILITY,
        useClass: Testability,
        deps: [NgZone, TestabilityRegistry, _TESTABILITY_GETTER],
    },
    {
        provide: Testability, // Also provide as `Testability` for backwards-compatibility.
        useClass: Testability,
        deps: [NgZone, TestabilityRegistry, _TESTABILITY_GETTER],
    },
];
const BROWSER_MODULE_PROVIDERS = [
    { provide: _INJECTOR_SCOPE, useValue: 'root' },
    { provide: ErrorHandler, useFactory: errorHandler },
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: DomEventsPlugin,
        multi: true,
        deps: [DOCUMENT],
    },
    { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true, deps: [DOCUMENT] },
    DomRendererFactory2,
    SharedStylesHost,
    EventManager,
    { provide: RendererFactory2, useExisting: DomRendererFactory2 },
    { provide: XhrFactory, useClass: BrowserXhr },
    typeof ngDevMode === 'undefined' || ngDevMode
        ? { provide: BROWSER_MODULE_PROVIDERS_MARKER, useValue: true }
        : [],
];
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */
class BrowserModule {
    constructor() {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            const providersAlreadyPresent = inject(BROWSER_MODULE_PROVIDERS_MARKER, {
                optional: true,
                skipSelf: true,
            });
            if (providersAlreadyPresent) {
                throw new _RuntimeError(5100 /* RuntimeErrorCode.BROWSER_MODULE_ALREADY_LOADED */, `Providers from the \`BrowserModule\` have already been loaded. If you need access ` +
                    `to common directives such as NgIf and NgFor, import the \`CommonModule\` instead.`);
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.3", ngImport: i0, type: BrowserModule, exports: [CommonModule, ApplicationModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserModule, providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS], imports: [CommonModule, ApplicationModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [...BROWSER_MODULE_PROVIDERS, ...TESTABILITY_PROVIDERS],
                    exports: [CommonModule, ApplicationModule],
                }]
        }], ctorParameters: () => [] });

export { BrowserDomAdapter, BrowserGetTestability, BrowserModule, DomEventsPlugin, KeyEventsPlugin, bootstrapApplication, createApplication, platformBrowser, provideProtractorTestingSupport };
//# sourceMappingURL=browser-DKgH74dt.mjs.map
