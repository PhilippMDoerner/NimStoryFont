/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

export { ApplicationConfig, BrowserModule, bootstrapApplication, createApplication, platformBrowser, provideProtractorTestingSupport } from './browser.d-DlTxfqBL.js';
import * as i0 from '@angular/core';
import { ComponentRef, Predicate, DebugNode, DebugElement, Type, InjectionToken, NgZone, ListenerOptions, OnDestroy, RendererFactory2, ɵTracingService as _TracingService, ɵTracingSnapshot as _TracingSnapshot, RendererType2, Renderer2, Injector, Sanitizer, SecurityContext, Provider, EnvironmentProviders, GetTestability, TestabilityRegistry, Testability, Version } from '@angular/core';
import { HttpTransferCacheOptions } from '@angular/common/http';
import { ɵDomAdapter as _DomAdapter } from '@angular/common';
export { ɵgetDOM } from '@angular/common';

/**
 * Represents the attributes of an HTML `<meta>` element. The element itself is
 * represented by the internal `HTMLMetaElement`.
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 * @see {@link Meta}
 *
 * @publicApi
 */
type MetaDefinition = {
    charset?: string;
    content?: string;
    httpEquiv?: string;
    id?: string;
    itemprop?: string;
    name?: string;
    property?: string;
    scheme?: string;
    url?: string;
} & {
    [prop: string]: string;
};
/**
 * A service for managing HTML `<meta>` tags.
 *
 * Properties of the `MetaDefinition` object match the attributes of the
 * HTML `<meta>` tag. These tags define document metadata that is important for
 * things like configuring a Content Security Policy, defining browser compatibility
 * and security settings, setting HTTP Headers, defining rich content for social sharing,
 * and Search Engine Optimization (SEO).
 *
 * To identify specific `<meta>` tags in a document, use an attribute selection
 * string in the format `"tag_attribute='value string'"`.
 * For example, an `attrSelector` value of `"name='description'"` matches a tag
 * whose `name` attribute has the value `"description"`.
 * Selectors are used with the `querySelector()` Document method,
 * in the format `meta[{attrSelector}]`.
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 * @see [Document.querySelector()](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 *
 *
 * @publicApi
 */
declare class Meta {
    private _doc;
    private _dom;
    constructor(_doc: any);
    /**
     * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * If an existing element is found, it is returned and is not modified in any way.
     * @param tag The definition of a `<meta>` element to match or create.
     * @param forceCreation True to create a new element without checking whether one already exists.
     * @returns The existing element with the same attributes and values if found,
     * the new element if no match is found, or `null` if the tag parameter is not defined.
     */
    addTag(tag: MetaDefinition, forceCreation?: boolean): HTMLMetaElement | null;
    /**
     * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * @param tags An array of tag definitions to match or create.
     * @param forceCreation True to create new elements without checking whether they already exist.
     * @returns The matching elements if found, or the new elements.
     */
    addTags(tags: MetaDefinition[], forceCreation?: boolean): HTMLMetaElement[];
    /**
     * Retrieves a `<meta>` tag element in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching element, if any.
     */
    getTag(attrSelector: string): HTMLMetaElement | null;
    /**
     * Retrieves a set of `<meta>` tag elements in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching elements, if any.
     */
    getTags(attrSelector: string): HTMLMetaElement[];
    /**
     * Modifies an existing `<meta>` tag element in the current HTML document.
     * @param tag The tag description with which to replace the existing tag content.
     * @param selector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     * If not supplied, matches a tag with the same `name` or `property` attribute value as the
     * replacement tag.
     * @return The modified element.
     */
    updateTag(tag: MetaDefinition, selector?: string): HTMLMetaElement | null;
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param attrSelector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     */
    removeTag(attrSelector: string): void;
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param meta The tag definition to match against to identify an existing tag.
     */
    removeTagElement(meta: HTMLMetaElement): void;
    private _getOrCreateElement;
    private _setMetaElementAttributes;
    private _parseSelector;
    private _containsAttributes;
    private _getMetaKeyMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<Meta, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Meta>;
}

/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @publicApi
 */
declare class Title {
    private _doc;
    constructor(_doc: any);
    /**
     * Get the title of the current HTML document.
     */
    getTitle(): string;
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    setTitle(newTitle: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Title, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Title>;
}

/**
 * Enabled Angular debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 *
 * @publicApi
 */
declare function enableDebugTools<T>(ref: ComponentRef<T>): ComponentRef<T>;
/**
 * Disables Angular tools.
 *
 * @publicApi
 */
declare function disableDebugTools(): void;

/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @publicApi
 */
declare class By {
    /**
     * Match all nodes.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
     */
    static all(): Predicate<DebugNode>;
    /**
     * Match elements by the given CSS selector.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
     */
    static css(selector: string): Predicate<DebugElement>;
    /**
     * Match nodes that have the given directive present.
     *
     * @usageNotes
     * ### Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
     */
    static directive(type: Type<any>): Predicate<DebugNode>;
}

/**
 * The injection token for plugins of the `EventManager` service.
 *
 * @publicApi
 */
declare const EVENT_MANAGER_PLUGINS: InjectionToken<EventManagerPlugin[]>;
/**
 * An injectable service that provides event management for Angular
 * through a browser plug-in.
 *
 * @publicApi
 */
declare class EventManager {
    private _zone;
    private _plugins;
    private _eventNameToPlugin;
    /**
     * Initializes an instance of the event-manager service.
     */
    constructor(plugins: EventManagerPlugin[], _zone: NgZone);
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
    addEventListener(element: HTMLElement, eventName: string, handler: Function, options?: ListenerOptions): Function;
    /**
     * Retrieves the compilation zone in which event listeners are registered.
     */
    getZone(): NgZone;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventManager>;
}
/**
 * The plugin definition for the `EventManager` class
 *
 * It can be used as a base class to create custom manager plugins, i.e. you can create your own
 * class that extends the `EventManagerPlugin` one.
 *
 * @publicApi
 */
declare abstract class EventManagerPlugin {
    private _doc;
    constructor(_doc: any);
    manager: EventManager;
    /**
     * Should return `true` for every event name that should be supported by this plugin
     */
    abstract supports(eventName: string): boolean;
    /**
     * Implement the behaviour for the supported events
     */
    abstract addEventListener(element: HTMLElement, eventName: string, handler: Function, options?: ListenerOptions): Function;
}

/**
 * A record of usage for a specific style including all elements added to the DOM
 * that contain a given style.
 */
interface UsageRecord<T> {
    elements: T[];
    usage: number;
}
declare class SharedStylesHost implements OnDestroy {
    private readonly doc;
    private readonly appId;
    private readonly nonce?;
    /**
     * Provides usage information for active inline style content and associated HTML <style> elements.
     * Embedded styles typically originate from the `styles` metadata of a rendered component.
     */
    private readonly inline;
    /**
     * Provides usage information for active external style URLs and the associated HTML <link> elements.
     * External styles typically originate from the `ɵɵExternalStylesFeature` of a rendered component.
     */
    private readonly external;
    /**
     * Set of host DOM nodes that will have styles attached.
     */
    private readonly hosts;
    /**
     * Whether the application code is currently executing on a server.
     */
    private readonly isServer;
    constructor(doc: Document, appId: string, nonce?: string | null | undefined, platformId?: object);
    /**
     * Adds embedded styles to the DOM via HTML `style` elements.
     * @param styles An array of style content strings.
     */
    addStyles(styles: string[], urls?: string[]): void;
    /**
     * Removes embedded styles from the DOM that were added as HTML `style` elements.
     * @param styles An array of style content strings.
     */
    removeStyles(styles: string[], urls?: string[]): void;
    protected addUsage<T extends HTMLElement>(value: string, usages: Map<string, UsageRecord<T>>, creator: (value: string, doc: Document) => T): void;
    protected removeUsage<T extends HTMLElement>(value: string, usages: Map<string, UsageRecord<T>>): void;
    ngOnDestroy(): void;
    /**
     * Adds a host node to the set of style hosts and adds all existing style usage to
     * the newly added host node.
     *
     * This is currently only used for Shadow DOM encapsulation mode.
     */
    addHost(hostNode: Node): void;
    removeHost(hostNode: Node): void;
    private addElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<SharedStylesHost, [null, null, { optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SharedStylesHost>;
}

/**
 * A DI token that indicates whether styles
 * of destroyed components should be removed from DOM.
 *
 * By default, the value is set to `true`.
 * @publicApi
 */
declare const REMOVE_STYLES_ON_COMPONENT_DESTROY: InjectionToken<boolean>;
declare class DomRendererFactory2 implements RendererFactory2, OnDestroy {
    private readonly eventManager;
    private readonly sharedStylesHost;
    private readonly appId;
    private removeStylesOnCompDestroy;
    private readonly doc;
    readonly platformId: Object;
    readonly ngZone: NgZone;
    private readonly nonce;
    private readonly tracingService;
    private readonly rendererByCompId;
    private readonly defaultRenderer;
    private readonly platformIsServer;
    constructor(eventManager: EventManager, sharedStylesHost: SharedStylesHost, appId: string, removeStylesOnCompDestroy: boolean, doc: Document, platformId: Object, ngZone: NgZone, nonce?: string | null, tracingService?: _TracingService<_TracingSnapshot> | null);
    createRenderer(element: any, type: RendererType2 | null): Renderer2;
    private getOrCreateRenderer;
    ngOnDestroy(): void;
    /**
     * Used during HMR to clear any cached data about a component.
     * @param componentId ID of the component that is being replaced.
     */
    protected componentReplaced(componentId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DomRendererFactory2, [null, null, null, null, null, null, null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DomRendererFactory2>;
}

/**
 * DI token for providing [HammerJS](https://hammerjs.github.io/) support to Angular.
 * @see {@link HammerGestureConfig}
 *
 * @ngModule HammerModule
 * @publicApi
 *
 * @deprecated The HammerJS integration is deprecated. Replace it by your own implementation.
 */
declare const HAMMER_GESTURE_CONFIG: InjectionToken<HammerGestureConfig>;
/**
 * Function that loads HammerJS, returning a promise that is resolved once HammerJs is loaded.
 *
 * @publicApi
 *
 * @deprecated The hammerjs integration is deprecated. Replace it by your own implementation.
 */
type HammerLoader = () => Promise<void>;
/**
 * Injection token used to provide a HammerLoader to Angular.
 *
 * @see {@link HammerLoader}
 *
 * @publicApi
 *
 * @deprecated The HammerJS integration is deprecated. Replace it by your own implementation.
 */
declare const HAMMER_LOADER: InjectionToken<HammerLoader>;
interface HammerInstance {
    on(eventName: string, callback?: Function): void;
    off(eventName: string, callback?: Function): void;
    destroy?(): void;
}
/**
 * An injectable [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 *
 * @deprecated The HammerJS integration is deprecated. Replace it by your own implementation.
 */
declare class HammerGestureConfig {
    /**
     * A set of supported event names for gestures to be used in Angular.
     * Angular supports all built-in recognizers, as listed in
     * [HammerJS documentation](https://hammerjs.github.io/).
     */
    events: string[];
    /**
     * Maps gesture event names to a set of configuration options
     * that specify overrides to the default values for specific properties.
     *
     * The key is a supported event name to be configured,
     * and the options object contains a set of properties, with override values
     * to be applied to the named recognizer event.
     * For example, to disable recognition of the rotate event, specify
     *  `{"rotate": {"enable": false}}`.
     *
     * Properties that are not present take the HammerJS default values.
     * For information about which properties are supported for which events,
     * and their allowed and default values, see
     * [HammerJS documentation](https://hammerjs.github.io/).
     *
     */
    overrides: {
        [key: string]: Object;
    };
    /**
     * Properties whose default values can be overridden for a given event.
     * Different sets of properties apply to different events.
     * For information about which properties are supported for which events,
     * and their allowed and default values, see
     * [HammerJS documentation](https://hammerjs.github.io/).
     */
    options?: {
        cssProps?: any;
        domEvents?: boolean;
        enable?: boolean | ((manager: any) => boolean);
        preset?: any[];
        touchAction?: string;
        recognizers?: any[];
        inputClass?: any;
        inputTarget?: EventTarget;
    };
    /**
     * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
     * and attaches it to a given HTML element.
     * @param element The element that will recognize gestures.
     * @returns A HammerJS event-manager object.
     */
    buildHammer(element: HTMLElement): HammerInstance;
    static ɵfac: i0.ɵɵFactoryDeclaration<HammerGestureConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HammerGestureConfig>;
}
/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */
declare class HammerGesturesPlugin extends EventManagerPlugin {
    private _config;
    private _injector;
    private loader?;
    private _loaderPromise;
    constructor(doc: any, _config: HammerGestureConfig, _injector: Injector, loader?: (HammerLoader | null) | undefined);
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function;
    isCustomEvent(eventName: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<HammerGesturesPlugin, [null, null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HammerGesturesPlugin>;
}
/**
 * Adds support for HammerJS.
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's `EventManager`.
 *
 * @publicApi
 *
 * @deprecated The hammer integration is deprecated. Replace it by your own implementation.
 */
declare class HammerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<HammerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<HammerModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<HammerModule>;
}

/**
 * Marker interface for a value that's safe to use in a particular context.
 *
 * @publicApi
 */
interface SafeValue {
}
/**
 * Marker interface for a value that's safe to use as HTML.
 *
 * @publicApi
 */
interface SafeHtml extends SafeValue {
}
/**
 * Marker interface for a value that's safe to use as style (CSS).
 *
 * @publicApi
 */
interface SafeStyle extends SafeValue {
}
/**
 * Marker interface for a value that's safe to use as JavaScript.
 *
 * @publicApi
 */
interface SafeScript extends SafeValue {
}
/**
 * Marker interface for a value that's safe to use as a URL linking to a document.
 *
 * @publicApi
 */
interface SafeUrl extends SafeValue {
}
/**
 * Marker interface for a value that's safe to use as a URL to load executable code from.
 *
 * @publicApi
 */
interface SafeResourceUrl extends SafeValue {
}
/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](https://g.co/ng/security).
 *
 * @publicApi
 */
declare abstract class DomSanitizer implements Sanitizer {
    /**
     * Gets a safe value from either a known safe value or a value with unknown safety.
     *
     * If the given value is already a `SafeValue`, this method returns the unwrapped value.
     * If the security context is HTML and the given value is a plain string, this method
     * sanitizes the string, removing any potentially unsafe content.
     * For any other security context, this method throws an error if provided
     * with a plain string.
     */
    abstract sanitize(context: SecurityContext, value: SafeValue | string | null): string | null;
    /**
     * Bypass security and trust the given value to be safe HTML. Only use this when the bound HTML
     * is unsafe (e.g. contains `<script>` tags) and the code should be executed. The sanitizer will
     * leave safe HTML intact, so in most situations this method should not be used.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustHtml(value: string): SafeHtml;
    /**
     * Bypass security and trust the given value to be safe style value (CSS).
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustStyle(value: string): SafeStyle;
    /**
     * Bypass security and trust the given value to be safe JavaScript.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustScript(value: string): SafeScript;
    /**
     * Bypass security and trust the given value to be a safe style URL, i.e. a value that can be used
     * in hyperlinks or `<img src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustUrl(value: string): SafeUrl;
    /**
     * Bypass security and trust the given value to be a safe resource URL, i.e. a location that may
     * be used to load executable code from, like `<script src>`, or `<iframe src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     */
    abstract bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<DomSanitizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DomSanitizer>;
}
declare class DomSanitizerImpl extends DomSanitizer {
    private _doc;
    constructor(_doc: any);
    sanitize(ctx: SecurityContext, value: SafeValue | string | null): string | null;
    bypassSecurityTrustHtml(value: string): SafeHtml;
    bypassSecurityTrustStyle(value: string): SafeStyle;
    bypassSecurityTrustScript(value: string): SafeScript;
    bypassSecurityTrustUrl(value: string): SafeUrl;
    bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<DomSanitizerImpl, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DomSanitizerImpl>;
}

/**
 * The list of features as an enum to uniquely type each `HydrationFeature`.
 * @see {@link HydrationFeature}
 *
 * @publicApi
 */
declare enum HydrationFeatureKind {
    NoHttpTransferCache = 0,
    HttpTransferCacheOptions = 1,
    I18nSupport = 2,
    EventReplay = 3,
    IncrementalHydration = 4
}
/**
 * Helper type to represent a Hydration feature.
 *
 * @publicApi
 */
interface HydrationFeature<FeatureKind extends HydrationFeatureKind> {
    ɵkind: FeatureKind;
    ɵproviders: Provider[];
}
/**
 * Disables HTTP transfer cache. Effectively causes HTTP requests to be performed twice: once on the
 * server and other one on the browser.
 *
 * @publicApi
 */
declare function withNoHttpTransferCache(): HydrationFeature<HydrationFeatureKind.NoHttpTransferCache>;
/**
 * The function accepts an object, which allows to configure cache parameters,
 * such as which headers should be included (no headers are included by default),
 * whether POST requests should be cached or a callback function to determine if a
 * particular request should be cached.
 *
 * @publicApi
 */
declare function withHttpTransferCacheOptions(options: HttpTransferCacheOptions): HydrationFeature<HydrationFeatureKind.HttpTransferCacheOptions>;
/**
 * Enables support for hydrating i18n blocks.
 *
 * @publicApi 20.0
 */
declare function withI18nSupport(): HydrationFeature<HydrationFeatureKind.I18nSupport>;
/**
 * Enables support for replaying user events (e.g. `click`s) that happened on a page
 * before hydration logic has completed. Once an application is hydrated, all captured
 * events are replayed and relevant event listeners are executed.
 *
 * @usageNotes
 *
 * Basic example of how you can enable event replay in your application when
 * `bootstrapApplication` function is used:
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideClientHydration(withEventReplay())]
 * });
 * ```
 * @publicApi
 * @see {@link provideClientHydration}
 */
declare function withEventReplay(): HydrationFeature<HydrationFeatureKind.EventReplay>;
/**
 * Enables support for incremental hydration using the `hydrate` trigger syntax.
 *
 * @usageNotes
 *
 * Basic example of how you can enable incremental hydration in your application when
 * the `bootstrapApplication` function is used:
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideClientHydration(withIncrementalHydration())]
 * });
 * ```
 * @publicApi 20.0
 * @see {@link provideClientHydration}
 */
declare function withIncrementalHydration(): HydrationFeature<HydrationFeatureKind.IncrementalHydration>;
/**
 * Sets up providers necessary to enable hydration functionality for the application.
 *
 * By default, the function enables the recommended set of features for the optimal
 * performance for most of the applications. It includes the following features:
 *
 * * Reconciling DOM hydration. Learn more about it [here](guide/hydration).
 * * [`HttpClient`](api/common/http/HttpClient) response caching while running on the server and
 * transferring this cache to the client to avoid extra HTTP requests. Learn more about data caching
 * [here](guide/ssr#caching-data-when-using-httpclient).
 *
 * These functions allow you to disable some of the default features or enable new ones:
 *
 * * {@link withNoHttpTransferCache} to disable HTTP transfer cache
 * * {@link withHttpTransferCacheOptions} to configure some HTTP transfer cache options
 * * {@link withI18nSupport} to enable hydration support for i18n blocks
 * * {@link withEventReplay} to enable support for replaying user events
 *
 * @usageNotes
 *
 * Basic example of how you can enable hydration in your application when
 * `bootstrapApplication` function is used:
 * ```ts
 * bootstrapApplication(AppComponent, {
 *   providers: [provideClientHydration()]
 * });
 * ```
 *
 * Alternatively if you are using NgModules, you would add `provideClientHydration`
 * to your root app module's provider list.
 * ```ts
 * @NgModule({
 *   declarations: [RootCmp],
 *   bootstrap: [RootCmp],
 *   providers: [provideClientHydration()],
 * })
 * export class AppModule {}
 * ```
 *
 * @see {@link withNoHttpTransferCache}
 * @see {@link withHttpTransferCacheOptions}
 * @see {@link withI18nSupport}
 * @see {@link withEventReplay}
 *
 * @param features Optional features to configure additional hydration behaviors.
 * @returns A set of providers to enable hydration.
 *
 * @publicApi 17.0
 */
declare function provideClientHydration(...features: HydrationFeature<HydrationFeatureKind>[]): EnvironmentProviders;

/**
 * A `DomAdapter` powered by full browser DOM APIs.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
declare class BrowserDomAdapter extends _DomAdapter {
    readonly supportsDOMEvents: boolean;
    static makeCurrent(): void;
    onAndCancel(el: Node, evt: any, listener: any, options: any): Function;
    dispatchEvent(el: Node, evt: any): void;
    remove(node: Node): void;
    createElement(tagName: string, doc?: Document): HTMLElement;
    createHtmlDocument(): Document;
    getDefaultDocument(): Document;
    isElementNode(node: Node): boolean;
    isShadowRoot(node: any): boolean;
    /** @deprecated No longer being used in Ivy code. To be removed in version 14. */
    getGlobalEventTarget(doc: Document, target: string): EventTarget | null;
    getBaseHref(doc: Document): string | null;
    resetBaseElement(): void;
    getUserAgent(): string;
    getCookie(name: string): string | null;
}

declare class BrowserGetTestability implements GetTestability {
    addToWindow(registry: TestabilityRegistry): void;
    findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean): Testability | null;
}

declare class DomEventsPlugin extends EventManagerPlugin {
    constructor(doc: any);
    supports(eventName: string): boolean;
    addEventListener(element: HTMLElement, eventName: string, handler: Function, options?: ListenerOptions): Function;
    removeEventListener(target: any, eventName: string, callback: Function, options?: ListenerOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DomEventsPlugin, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DomEventsPlugin>;
}

/**
 * A browser plug-in that provides support for handling of key events in Angular.
 */
declare class KeyEventsPlugin extends EventManagerPlugin {
    /**
     * Initializes an instance of the browser plug-in.
     * @param doc The document in which key events will be detected.
     */
    constructor(doc: any);
    /**
     * Reports whether a named key event is supported.
     * @param eventName The event name to query.
     * @return True if the named key event is supported.
     */
    supports(eventName: string): boolean;
    /**
     * Registers a handler for a specific element and key event.
     * @param element The HTML element to receive event notifications.
     * @param eventName The name of the key event to listen for.
     * @param handler A function to call when the notification occurs. Receives the
     * event object as an argument.
     * @returns The key event that was registered.
     */
    addEventListener(element: HTMLElement, eventName: string, handler: Function, options?: ListenerOptions): Function;
    /**
     * Parses the user provided full keyboard event definition and normalizes it for
     * later internal use. It ensures the string is all lowercase, converts special
     * characters to a standard spelling, and orders all the values consistently.
     *
     * @param eventName The name of the key event to listen for.
     * @returns an object with the full, normalized string, and the dom event name
     * or null in the case when the event doesn't match a keyboard event.
     */
    static parseEventName(eventName: string): {
        fullKey: string;
        domEventName: string;
    } | null;
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
    static matchEventFullKeyCode(event: KeyboardEvent, fullKeyCode: string): boolean;
    /**
     * Configures a handler callback for a key event.
     * @param fullKey The event name that combines all simultaneous keystrokes.
     * @param handler The function that responds to the key event.
     * @param zone The zone in which the event occurred.
     * @returns A callback function.
     */
    static eventCallback(fullKey: string, handler: Function, zone: NgZone): Function;
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyEventsPlugin, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<KeyEventsPlugin>;
}

/**
 * The list of error codes used in runtime code of the `platform-browser` package.
 * Reserved error code range: 5000-5500.
 */
declare const enum RuntimeErrorCode {
    UNSUPPORTED_ZONEJS_INSTANCE = -5000,
    BROWSER_MODULE_ALREADY_LOADED = 5100,
    NO_PLUGIN_FOR_EVENT = 5101,
    UNSUPPORTED_EVENT_TARGET = 5102,
    TESTABILITY_NOT_FOUND = 5103,
    ROOT_NODE_NOT_FOUND = -5104,
    UNEXPECTED_SYNTHETIC_PROPERTY = 5105,
    SANITIZATION_UNSAFE_SCRIPT = 5200,
    SANITIZATION_UNSAFE_RESOURCE_URL = 5201,
    SANITIZATION_UNEXPECTED_CTX = 5202,
    ANIMATION_RENDERER_ASYNC_LOADING_FAILURE = 5300
}

/**
 * @module
 * @description
 * Entry point for all public APIs of the platform-browser package.
 */

/**
 * @publicApi
 */
declare const VERSION: Version;

export { By, DomSanitizer, EVENT_MANAGER_PLUGINS, EventManager, EventManagerPlugin, HAMMER_GESTURE_CONFIG, HAMMER_LOADER, HammerGestureConfig, HammerModule, HydrationFeatureKind, Meta, REMOVE_STYLES_ON_COMPONENT_DESTROY, Title, VERSION, disableDebugTools, enableDebugTools, provideClientHydration, withEventReplay, withHttpTransferCacheOptions, withI18nSupport, withIncrementalHydration, withNoHttpTransferCache, BrowserDomAdapter as ɵBrowserDomAdapter, BrowserGetTestability as ɵBrowserGetTestability, DomEventsPlugin as ɵDomEventsPlugin, DomRendererFactory2 as ɵDomRendererFactory2, DomSanitizerImpl as ɵDomSanitizerImpl, HammerGesturesPlugin as ɵHammerGesturesPlugin, KeyEventsPlugin as ɵKeyEventsPlugin, RuntimeErrorCode as ɵRuntimeErrorCode, SharedStylesHost as ɵSharedStylesHost };
export type { HammerLoader, HydrationFeature, MetaDefinition, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl, SafeValue };
