/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { isPlatformServer, DOCUMENT, ɵgetDOM as _getDOM } from '@angular/common';
import * as i0 from '@angular/core';
import { InjectionToken, ɵRuntimeError as _RuntimeError, Injectable, Inject, APP_ID, CSP_NONCE, PLATFORM_ID, Optional, ViewEncapsulation, ɵTracingService as _TracingService, RendererStyleFlags2 } from '@angular/core';

/**
 * The injection token for plugins of the `EventManager` service.
 *
 * @publicApi
 */
const EVENT_MANAGER_PLUGINS = new InjectionToken(ngDevMode ? 'EventManagerPlugins' : '');
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */
class EventManager {
    _zone;
    _plugins;
    _eventNameToPlugin = new Map();
    /**
     * Initializes an instance of the event-manager service.
     */
    constructor(plugins, _zone) {
        this._zone = _zone;
        plugins.forEach((plugin) => {
            plugin.manager = this;
        });
        this._plugins = plugins.slice().reverse();
    }
    /**
     * Registers a handler for a specific element and event.
     *
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @param options Options that configure how the event listener is bound.
     * @returns  A callback function that can be used to remove the handler.
     */
    addEventListener(element, eventName, handler, options) {
        const plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler, options);
    }
    /**
     * Retrieves the compilation zone in which event listeners are registered.
     */
    getZone() {
        return this._zone;
    }
    /** @internal */
    _findPluginFor(eventName) {
        let plugin = this._eventNameToPlugin.get(eventName);
        if (plugin) {
            return plugin;
        }
        const plugins = this._plugins;
        plugin = plugins.find((plugin) => plugin.supports(eventName));
        if (!plugin) {
            throw new _RuntimeError(5101 /* RuntimeErrorCode.NO_PLUGIN_FOR_EVENT */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                `No event manager plugin found for event ${eventName}`);
        }
        this._eventNameToPlugin.set(eventName, plugin);
        return plugin;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: EventManager, deps: [{ token: EVENT_MANAGER_PLUGINS }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: EventManager });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: EventManager, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EVENT_MANAGER_PLUGINS]
                }] }, { type: i0.NgZone }] });
/**
 * The plugin definition for the `EventManager` class
 *
 * It can be used as a base class to create custom manager plugins, i.e. you can create your own
 * class that extends the `EventManagerPlugin` one.
 *
 * @publicApi
 */
class EventManagerPlugin {
    _doc;
    // TODO: remove (has some usage in G3)
    constructor(_doc) {
        this._doc = _doc;
    }
    // Using non-null assertion because it's set by EventManager's constructor
    manager;
}

/** The style elements attribute name used to set value of `APP_ID` token. */
const APP_ID_ATTRIBUTE_NAME = 'ng-app-id';
/**
 * Removes all provided elements from the document.
 * @param elements An array of HTML Elements.
 */
function removeElements(elements) {
    for (const element of elements) {
        element.remove();
    }
}
/**
 * Creates a `style` element with the provided inline style content.
 * @param style A string of the inline style content.
 * @param doc A DOM Document to use to create the element.
 * @returns An HTMLStyleElement instance.
 */
function createStyleElement(style, doc) {
    const styleElement = doc.createElement('style');
    styleElement.textContent = style;
    return styleElement;
}
/**
 * Searches a DOM document's head element for style elements with a matching application
 * identifier attribute (`ng-app-id`) to the provide identifier and adds usage records for each.
 * @param doc An HTML DOM document instance.
 * @param appId A string containing an Angular application identifer.
 * @param inline A Map object for tracking inline (defined via `styles` in component decorator) style usage.
 * @param external A Map object for tracking external (defined via `styleUrls` in component decorator) style usage.
 */
function addServerStyles(doc, appId, inline, external) {
    const elements = doc.head?.querySelectorAll(`style[${APP_ID_ATTRIBUTE_NAME}="${appId}"],link[${APP_ID_ATTRIBUTE_NAME}="${appId}"]`);
    if (elements) {
        for (const styleElement of elements) {
            styleElement.removeAttribute(APP_ID_ATTRIBUTE_NAME);
            if (styleElement instanceof HTMLLinkElement) {
                // Only use filename from href
                // The href is build time generated with a unique value to prevent duplicates.
                external.set(styleElement.href.slice(styleElement.href.lastIndexOf('/') + 1), {
                    usage: 0,
                    elements: [styleElement],
                });
            }
            else if (styleElement.textContent) {
                inline.set(styleElement.textContent, { usage: 0, elements: [styleElement] });
            }
        }
    }
}
/**
 * Creates a `link` element for the provided external style URL.
 * @param url A string of the URL for the stylesheet.
 * @param doc A DOM Document to use to create the element.
 * @returns An HTMLLinkElement instance.
 */
function createLinkElement(url, doc) {
    const linkElement = doc.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', url);
    return linkElement;
}
class SharedStylesHost {
    doc;
    appId;
    nonce;
    /**
     * Provides usage information for active inline style content and associated HTML <style> elements.
     * Embedded styles typically originate from the `styles` metadata of a rendered component.
     */
    inline = new Map();
    /**
     * Provides usage information for active external style URLs and the associated HTML <link> elements.
     * External styles typically originate from the `ɵɵExternalStylesFeature` of a rendered component.
     */
    external = new Map();
    /**
     * Set of host DOM nodes that will have styles attached.
     */
    hosts = new Set();
    /**
     * Whether the application code is currently executing on a server.
     */
    isServer;
    constructor(doc, appId, nonce, platformId = {}) {
        this.doc = doc;
        this.appId = appId;
        this.nonce = nonce;
        this.isServer = isPlatformServer(platformId);
        addServerStyles(doc, appId, this.inline, this.external);
        this.hosts.add(doc.head);
    }
    /**
     * Adds embedded styles to the DOM via HTML `style` elements.
     * @param styles An array of style content strings.
     */
    addStyles(styles, urls) {
        for (const value of styles) {
            this.addUsage(value, this.inline, createStyleElement);
        }
        urls?.forEach((value) => this.addUsage(value, this.external, createLinkElement));
    }
    /**
     * Removes embedded styles from the DOM that were added as HTML `style` elements.
     * @param styles An array of style content strings.
     */
    removeStyles(styles, urls) {
        for (const value of styles) {
            this.removeUsage(value, this.inline);
        }
        urls?.forEach((value) => this.removeUsage(value, this.external));
    }
    addUsage(value, usages, creator) {
        // Attempt to get any current usage of the value
        const record = usages.get(value);
        // If existing, just increment the usage count
        if (record) {
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && record.usage === 0) {
                // A usage count of zero indicates a preexisting server generated style.
                // This attribute is solely used for debugging purposes of SSR style reuse.
                record.elements.forEach((element) => element.setAttribute('ng-style-reused', ''));
            }
            record.usage++;
        }
        else {
            // Otherwise, create an entry to track the elements and add element for each host
            usages.set(value, {
                usage: 1,
                elements: [...this.hosts].map((host) => this.addElement(host, creator(value, this.doc))),
            });
        }
    }
    removeUsage(value, usages) {
        // Attempt to get any current usage of the value
        const record = usages.get(value);
        // If there is a record, reduce the usage count and if no longer used,
        // remove from DOM and delete usage record.
        if (record) {
            record.usage--;
            if (record.usage <= 0) {
                removeElements(record.elements);
                usages.delete(value);
            }
        }
    }
    ngOnDestroy() {
        for (const [, { elements }] of [...this.inline, ...this.external]) {
            removeElements(elements);
        }
        this.hosts.clear();
    }
    /**
     * Adds a host node to the set of style hosts and adds all existing style usage to
     * the newly added host node.
     *
     * This is currently only used for Shadow DOM encapsulation mode.
     */
    addHost(hostNode) {
        this.hosts.add(hostNode);
        // Add existing styles to new host
        for (const [style, { elements }] of this.inline) {
            elements.push(this.addElement(hostNode, createStyleElement(style, this.doc)));
        }
        for (const [url, { elements }] of this.external) {
            elements.push(this.addElement(hostNode, createLinkElement(url, this.doc)));
        }
    }
    removeHost(hostNode) {
        this.hosts.delete(hostNode);
    }
    addElement(host, element) {
        // Add a nonce if present
        if (this.nonce) {
            element.setAttribute('nonce', this.nonce);
        }
        // Add application identifier when on the server to support client-side reuse
        if (this.isServer) {
            element.setAttribute(APP_ID_ATTRIBUTE_NAME, this.appId);
        }
        // Insert the element into the DOM with the host node as parent
        return host.appendChild(element);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: SharedStylesHost, deps: [{ token: DOCUMENT }, { token: APP_ID }, { token: CSP_NONCE, optional: true }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: SharedStylesHost });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: SharedStylesHost, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CSP_NONCE]
                }, {
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }] });

const NAMESPACE_URIS = {
    'svg': 'http://www.w3.org/2000/svg',
    'xhtml': 'http://www.w3.org/1999/xhtml',
    'xlink': 'http://www.w3.org/1999/xlink',
    'xml': 'http://www.w3.org/XML/1998/namespace',
    'xmlns': 'http://www.w3.org/2000/xmlns/',
    'math': 'http://www.w3.org/1998/Math/MathML',
};
const COMPONENT_REGEX = /%COMP%/g;
const SOURCEMAP_URL_REGEXP = /\/\*#\s*sourceMappingURL=(.+?)\s*\*\//;
const PROTOCOL_REGEXP = /^https?:/;
const COMPONENT_VARIABLE = '%COMP%';
const HOST_ATTR = `_nghost-${COMPONENT_VARIABLE}`;
const CONTENT_ATTR = `_ngcontent-${COMPONENT_VARIABLE}`;
/**
 * The default value for the `REMOVE_STYLES_ON_COMPONENT_DESTROY` DI token.
 */
const REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT = true;
/**
 * A DI token that indicates whether styles
 * of destroyed components should be removed from DOM.
 *
 * By default, the value is set to `true`.
 * @publicApi
 */
const REMOVE_STYLES_ON_COMPONENT_DESTROY = new InjectionToken(ngDevMode ? 'RemoveStylesOnCompDestroy' : '', {
    providedIn: 'root',
    factory: () => REMOVE_STYLES_ON_COMPONENT_DESTROY_DEFAULT,
});
function shimContentAttribute(componentShortId) {
    return CONTENT_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimHostAttribute(componentShortId) {
    return HOST_ATTR.replace(COMPONENT_REGEX, componentShortId);
}
function shimStylesContent(compId, styles) {
    return styles.map((s) => s.replace(COMPONENT_REGEX, compId));
}
/**
 * Prepends a baseHref to the `sourceMappingURL` within the provided CSS content.
 * If the `sourceMappingURL` contains an inline (encoded) map, the function skips processing.
 *
 * @note For inline stylesheets, the `sourceMappingURL` is relative to the page's origin
 * and not the provided baseHref. This function is needed as when accessing the page with a URL
 * containing two or more segments.
 * For example, if the baseHref is set to `/`, and you visit a URL like `http://localhost/foo/bar`,
 * the map would be requested from `http://localhost/foo/bar/comp.css.map` instead of what you'd expect,
 * which is `http://localhost/comp.css.map`. This behavior is corrected by modifying the `sourceMappingURL`
 * to ensure external source maps are loaded relative to the baseHref.
 *

 * @param baseHref - The base URL to prepend to the `sourceMappingURL`.
 * @param styles - An array of CSS content strings, each potentially containing a `sourceMappingURL`.
 * @returns The updated array of CSS content strings with modified `sourceMappingURL` values,
 * or the original content if no modification is needed.
 */
function addBaseHrefToCssSourceMap(baseHref, styles) {
    if (!baseHref) {
        return styles;
    }
    const absoluteBaseHrefUrl = new URL(baseHref, 'http://localhost');
    return styles.map((cssContent) => {
        if (!cssContent.includes('sourceMappingURL=')) {
            return cssContent;
        }
        return cssContent.replace(SOURCEMAP_URL_REGEXP, (_, sourceMapUrl) => {
            if (sourceMapUrl[0] === '/' ||
                sourceMapUrl.startsWith('data:') ||
                PROTOCOL_REGEXP.test(sourceMapUrl)) {
                return `/*# sourceMappingURL=${sourceMapUrl} */`;
            }
            const { pathname: resolvedSourceMapUrl } = new URL(sourceMapUrl, absoluteBaseHrefUrl);
            return `/*# sourceMappingURL=${resolvedSourceMapUrl} */`;
        });
    });
}
class DomRendererFactory2 {
    eventManager;
    sharedStylesHost;
    appId;
    removeStylesOnCompDestroy;
    doc;
    platformId;
    ngZone;
    nonce;
    tracingService;
    rendererByCompId = new Map();
    defaultRenderer;
    platformIsServer;
    constructor(eventManager, sharedStylesHost, appId, removeStylesOnCompDestroy, doc, platformId, ngZone, nonce = null, tracingService = null) {
        this.eventManager = eventManager;
        this.sharedStylesHost = sharedStylesHost;
        this.appId = appId;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        this.doc = doc;
        this.platformId = platformId;
        this.ngZone = ngZone;
        this.nonce = nonce;
        this.tracingService = tracingService;
        this.platformIsServer = typeof ngServerMode !== 'undefined' && ngServerMode;
        this.defaultRenderer = new DefaultDomRenderer2(eventManager, doc, ngZone, this.platformIsServer, this.tracingService);
    }
    createRenderer(element, type) {
        if (!element || !type) {
            return this.defaultRenderer;
        }
        if (typeof ngServerMode !== 'undefined' &&
            ngServerMode &&
            type.encapsulation === ViewEncapsulation.ShadowDom) {
            // Domino does not support shadow DOM.
            type = { ...type, encapsulation: ViewEncapsulation.Emulated };
        }
        const renderer = this.getOrCreateRenderer(element, type);
        // Renderers have different logic due to different encapsulation behaviours.
        // Ex: for emulated, an attribute is added to the element.
        if (renderer instanceof EmulatedEncapsulationDomRenderer2) {
            renderer.applyToHost(element);
        }
        else if (renderer instanceof NoneEncapsulationDomRenderer) {
            renderer.applyStyles();
        }
        return renderer;
    }
    getOrCreateRenderer(element, type) {
        const rendererByCompId = this.rendererByCompId;
        let renderer = rendererByCompId.get(type.id);
        if (!renderer) {
            const doc = this.doc;
            const ngZone = this.ngZone;
            const eventManager = this.eventManager;
            const sharedStylesHost = this.sharedStylesHost;
            const removeStylesOnCompDestroy = this.removeStylesOnCompDestroy;
            const platformIsServer = this.platformIsServer;
            const tracingService = this.tracingService;
            switch (type.encapsulation) {
                case ViewEncapsulation.Emulated:
                    renderer = new EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, type, this.appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService);
                    break;
                case ViewEncapsulation.ShadowDom:
                    return new ShadowDomRenderer(eventManager, sharedStylesHost, element, type, doc, ngZone, this.nonce, platformIsServer, tracingService);
                default:
                    renderer = new NoneEncapsulationDomRenderer(eventManager, sharedStylesHost, type, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService);
                    break;
            }
            rendererByCompId.set(type.id, renderer);
        }
        return renderer;
    }
    ngOnDestroy() {
        this.rendererByCompId.clear();
    }
    /**
     * Used during HMR to clear any cached data about a component.
     * @param componentId ID of the component that is being replaced.
     */
    componentReplaced(componentId) {
        this.rendererByCompId.delete(componentId);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: DomRendererFactory2, deps: [{ token: EventManager }, { token: SharedStylesHost }, { token: APP_ID }, { token: REMOVE_STYLES_ON_COMPONENT_DESTROY }, { token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: CSP_NONCE }, { token: _TracingService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: DomRendererFactory2 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: DomRendererFactory2, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: EventManager }, { type: SharedStylesHost }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [APP_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [REMOVE_STYLES_ON_COMPONENT_DESTROY]
                }] }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CSP_NONCE]
                }] }, { type: i0.ɵTracingService, decorators: [{
                    type: Inject,
                    args: [_TracingService]
                }, {
                    type: Optional
                }] }] });
class DefaultDomRenderer2 {
    eventManager;
    doc;
    ngZone;
    platformIsServer;
    tracingService;
    data = Object.create(null);
    /**
     * By default this renderer throws when encountering synthetic properties
     * This can be disabled for example by the AsyncAnimationRendererFactory
     */
    throwOnSyntheticProps = true;
    constructor(eventManager, doc, ngZone, platformIsServer, tracingService) {
        this.eventManager = eventManager;
        this.doc = doc;
        this.ngZone = ngZone;
        this.platformIsServer = platformIsServer;
        this.tracingService = tracingService;
    }
    destroy() { }
    destroyNode = null;
    createElement(name, namespace) {
        if (namespace) {
            // TODO: `|| namespace` was added in
            // https://github.com/angular/angular/commit/2b9cc8503d48173492c29f5a271b61126104fbdb to
            // support how Ivy passed around the namespace URI rather than short name at the time. It did
            // not, however extend the support to other parts of the system (setAttribute, setAttribute,
            // and the ServerRenderer). We should decide what exactly the semantics for dealing with
            // namespaces should be and make it consistent.
            // Related issues:
            // https://github.com/angular/angular/issues/44028
            // https://github.com/angular/angular/issues/44883
            return this.doc.createElementNS(NAMESPACE_URIS[namespace] || namespace, name);
        }
        return this.doc.createElement(name);
    }
    createComment(value) {
        return this.doc.createComment(value);
    }
    createText(value) {
        return this.doc.createTextNode(value);
    }
    appendChild(parent, newChild) {
        const targetParent = isTemplateNode(parent) ? parent.content : parent;
        targetParent.appendChild(newChild);
    }
    insertBefore(parent, newChild, refChild) {
        if (parent) {
            const targetParent = isTemplateNode(parent) ? parent.content : parent;
            targetParent.insertBefore(newChild, refChild);
        }
    }
    removeChild(_parent, oldChild) {
        oldChild.remove();
    }
    selectRootElement(selectorOrNode, preserveContent) {
        let el = typeof selectorOrNode === 'string' ? this.doc.querySelector(selectorOrNode) : selectorOrNode;
        if (!el) {
            throw new _RuntimeError(-5104 /* RuntimeErrorCode.ROOT_NODE_NOT_FOUND */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                `The selector "${selectorOrNode}" did not match any elements`);
        }
        if (!preserveContent) {
            el.textContent = '';
        }
        return el;
    }
    parentNode(node) {
        return node.parentNode;
    }
    nextSibling(node) {
        return node.nextSibling;
    }
    setAttribute(el, name, value, namespace) {
        if (namespace) {
            name = namespace + ':' + name;
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.setAttributeNS(namespaceUri, name, value);
            }
            else {
                el.setAttribute(name, value);
            }
        }
        else {
            el.setAttribute(name, value);
        }
    }
    removeAttribute(el, name, namespace) {
        if (namespace) {
            const namespaceUri = NAMESPACE_URIS[namespace];
            if (namespaceUri) {
                el.removeAttributeNS(namespaceUri, name);
            }
            else {
                el.removeAttribute(`${namespace}:${name}`);
            }
        }
        else {
            el.removeAttribute(name);
        }
    }
    addClass(el, name) {
        el.classList.add(name);
    }
    removeClass(el, name) {
        el.classList.remove(name);
    }
    setStyle(el, style, value, flags) {
        if (flags & (RendererStyleFlags2.DashCase | RendererStyleFlags2.Important)) {
            el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? 'important' : '');
        }
        else {
            el.style[style] = value;
        }
    }
    removeStyle(el, style, flags) {
        if (flags & RendererStyleFlags2.DashCase) {
            // removeProperty has no effect when used on camelCased properties.
            el.style.removeProperty(style);
        }
        else {
            el.style[style] = '';
        }
    }
    setProperty(el, name, value) {
        if (el == null) {
            return;
        }
        (typeof ngDevMode === 'undefined' || ngDevMode) &&
            this.throwOnSyntheticProps &&
            checkNoSyntheticProp(name, 'property');
        el[name] = value;
    }
    setValue(node, value) {
        node.nodeValue = value;
    }
    listen(target, event, callback, options) {
        (typeof ngDevMode === 'undefined' || ngDevMode) &&
            this.throwOnSyntheticProps &&
            checkNoSyntheticProp(event, 'listener');
        if (typeof target === 'string') {
            target = _getDOM().getGlobalEventTarget(this.doc, target);
            if (!target) {
                throw new _RuntimeError(5102 /* RuntimeErrorCode.UNSUPPORTED_EVENT_TARGET */, (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    `Unsupported event target ${target} for event ${event}`);
            }
        }
        let wrappedCallback = this.decoratePreventDefault(callback);
        if (this.tracingService?.wrapEventListener) {
            wrappedCallback = this.tracingService.wrapEventListener(target, event, wrappedCallback);
        }
        return this.eventManager.addEventListener(target, event, wrappedCallback, options);
    }
    decoratePreventDefault(eventHandler) {
        // `DebugNode.triggerEventHandler` needs to know if the listener was created with
        // decoratePreventDefault or is a listener added outside the Angular context so it can handle
        // the two differently. In the first case, the special '__ngUnwrap__' token is passed to the
        // unwrap the listener (see below).
        return (event) => {
            // Ivy uses '__ngUnwrap__' as a special token that allows us to unwrap the function
            // so that it can be invoked programmatically by `DebugNode.triggerEventHandler`. The
            // debug_node can inspect the listener toString contents for the existence of this special
            // token. Because the token is a string literal, it is ensured to not be modified by compiled
            // code.
            if (event === '__ngUnwrap__') {
                return eventHandler;
            }
            // Run the event handler inside the ngZone because event handlers are not patched
            // by Zone on the server. This is required only for tests.
            const allowDefaultBehavior = typeof ngServerMode !== 'undefined' && ngServerMode
                ? this.ngZone.runGuarded(() => eventHandler(event))
                : eventHandler(event);
            if (allowDefaultBehavior === false) {
                event.preventDefault();
            }
            return undefined;
        };
    }
}
const AT_CHARCODE = (() => '@'.charCodeAt(0))();
function checkNoSyntheticProp(name, nameKind) {
    if (name.charCodeAt(0) === AT_CHARCODE) {
        throw new _RuntimeError(5105 /* RuntimeErrorCode.UNEXPECTED_SYNTHETIC_PROPERTY */, `Unexpected synthetic ${nameKind} ${name} found. Please make sure that:
  - Make sure \`provideAnimationsAsync()\`, \`provideAnimations()\` or \`provideNoopAnimations()\` call was added to a list of providers used to bootstrap an application.
  - There is a corresponding animation configuration named \`${name}\` defined in the \`animations\` field of the \`@Component\` decorator (see https://angular.dev/api/core/Component#animations).`);
    }
}
function isTemplateNode(node) {
    return node.tagName === 'TEMPLATE' && node.content !== undefined;
}
class ShadowDomRenderer extends DefaultDomRenderer2 {
    sharedStylesHost;
    hostEl;
    shadowRoot;
    constructor(eventManager, sharedStylesHost, hostEl, component, doc, ngZone, nonce, platformIsServer, tracingService) {
        super(eventManager, doc, ngZone, platformIsServer, tracingService);
        this.sharedStylesHost = sharedStylesHost;
        this.hostEl = hostEl;
        this.shadowRoot = hostEl.attachShadow({ mode: 'open' });
        this.sharedStylesHost.addHost(this.shadowRoot);
        let styles = component.styles;
        if (ngDevMode) {
            // We only do this in development, as for production users should not add CSS sourcemaps to components.
            const baseHref = _getDOM().getBaseHref(doc) ?? '';
            styles = addBaseHrefToCssSourceMap(baseHref, styles);
        }
        styles = shimStylesContent(component.id, styles);
        for (const style of styles) {
            const styleEl = document.createElement('style');
            if (nonce) {
                styleEl.setAttribute('nonce', nonce);
            }
            styleEl.textContent = style;
            this.shadowRoot.appendChild(styleEl);
        }
        // Apply any external component styles to the shadow root for the component's element.
        // The ShadowDOM renderer uses an alternative execution path for component styles that
        // does not use the SharedStylesHost that other encapsulation modes leverage. Much like
        // the manual addition of embedded styles directly above, any external stylesheets
        // must be manually added here to ensure ShadowDOM components are correctly styled.
        // TODO: Consider reworking the DOM Renderers to consolidate style handling.
        const styleUrls = component.getExternalStyles?.();
        if (styleUrls) {
            for (const styleUrl of styleUrls) {
                const linkEl = createLinkElement(styleUrl, doc);
                if (nonce) {
                    linkEl.setAttribute('nonce', nonce);
                }
                this.shadowRoot.appendChild(linkEl);
            }
        }
    }
    nodeOrShadowRoot(node) {
        return node === this.hostEl ? this.shadowRoot : node;
    }
    appendChild(parent, newChild) {
        return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
    }
    insertBefore(parent, newChild, refChild) {
        return super.insertBefore(this.nodeOrShadowRoot(parent), newChild, refChild);
    }
    removeChild(_parent, oldChild) {
        return super.removeChild(null, oldChild);
    }
    parentNode(node) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
    }
    destroy() {
        this.sharedStylesHost.removeHost(this.shadowRoot);
    }
}
class NoneEncapsulationDomRenderer extends DefaultDomRenderer2 {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, compId) {
        super(eventManager, doc, ngZone, platformIsServer, tracingService);
        this.sharedStylesHost = sharedStylesHost;
        this.removeStylesOnCompDestroy = removeStylesOnCompDestroy;
        let styles = component.styles;
        if (ngDevMode) {
            // We only do this in development, as for production users should not add CSS sourcemaps to components.
            const baseHref = _getDOM().getBaseHref(doc) ?? '';
            styles = addBaseHrefToCssSourceMap(baseHref, styles);
        }
        this.styles = compId ? shimStylesContent(compId, styles) : styles;
        this.styleUrls = component.getExternalStyles?.(compId);
    }
    applyStyles() {
        this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
        if (!this.removeStylesOnCompDestroy) {
            return;
        }
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
    }
}
class EmulatedEncapsulationDomRenderer2 extends NoneEncapsulationDomRenderer {
    contentAttr;
    hostAttr;
    constructor(eventManager, sharedStylesHost, component, appId, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService) {
        const compId = appId + '-' + component.id;
        super(eventManager, sharedStylesHost, component, removeStylesOnCompDestroy, doc, ngZone, platformIsServer, tracingService, compId);
        this.contentAttr = shimContentAttribute(compId);
        this.hostAttr = shimHostAttribute(compId);
    }
    applyToHost(element) {
        this.applyStyles();
        this.setAttribute(element, this.hostAttr, '');
    }
    createElement(parent, name) {
        const el = super.createElement(parent, name);
        super.setAttribute(el, this.contentAttr, '');
        return el;
    }
}

export { DomRendererFactory2, EVENT_MANAGER_PLUGINS, EventManager, EventManagerPlugin, REMOVE_STYLES_ON_COMPONENT_DESTROY, SharedStylesHost };
//# sourceMappingURL=dom_renderer-Frqw9gM5.mjs.map
