/**
 * @license Angular v22.1.1
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */

export { BrowserModule, bootstrapApplication, createApplication, platformBrowser, provideProtractorTestingSupport, BrowserDomAdapter as ɵBrowserDomAdapter, BrowserGetTestability as ɵBrowserGetTestability, KeyEventsPlugin as ɵKeyEventsPlugin } from './_browser-chunk.mjs';
import { DOCUMENT, ɵgetDOM as _getDOM } from '@angular/common';
export { ɵgetDOM } from '@angular/common';
import * as i0 from '@angular/core';
import { inject, Service, Inject, Injectable, ɵglobal as _global, ApplicationRef, ɵRuntimeError as _RuntimeError, makeEnvironmentProviders, ɵCACHE_ACTIVE as _CACHE_ACTIVE, APP_BOOTSTRAP_LISTENER, provideStabilityDebugging, ɵwithDomHydration as _withDomHydration, ɵwithIncrementalHydration as _withIncrementalHydration, ɵwithEventReplay as _withEventReplay, ɵwithI18nSupport as _withI18nSupport, ENVIRONMENT_INITIALIZER, ɵIS_ENABLED_BLOCKING_INITIAL_NAVIGATION as _IS_ENABLED_BLOCKING_INITIAL_NAVIGATION, ɵConsole as _Console, ɵformatRuntimeError as _formatRuntimeError, ɵXSS_SECURITY_URL as _XSS_SECURITY_URL, SecurityContext, ɵallowSanitizationBypassAndThrow as _allowSanitizationBypassAndThrow, ɵunwrapSafeValue as _unwrapSafeValue, ɵ_sanitizeUrl as __sanitizeUrl, ɵ_sanitizeHtml as __sanitizeHtml, ɵbypassSanitizationTrustHtml as _bypassSanitizationTrustHtml, ɵbypassSanitizationTrustStyle as _bypassSanitizationTrustStyle, ɵbypassSanitizationTrustScript as _bypassSanitizationTrustScript, ɵbypassSanitizationTrustUrl as _bypassSanitizationTrustUrl, ɵbypassSanitizationTrustResourceUrl as _bypassSanitizationTrustResourceUrl, forwardRef, Version } from '@angular/core';
import { CSS_VAR_NAMESPACE } from './_dom_renderer-chunk.mjs';
export { EVENT_MANAGER_PLUGINS, EventManager, EventManagerPlugin, REMOVE_STYLES_ON_COMPONENT_DESTROY, provideCssVarNamespacing, DomEventsPlugin as ɵDomEventsPlugin, DomRendererFactory2 as ɵDomRendererFactory2, SharedStylesHost as ɵSharedStylesHost } from './_dom_renderer-chunk.mjs';
import { ɵwithHttpTransferCache as _withHttpTransferCache } from '@angular/common/http';

class Meta {
  _doc = inject(DOCUMENT);
  _dom = _getDOM();
  _cachedHead;
  addTag(tag, forceCreation = false) {
    if (!tag) return null;
    return this._getOrCreateElement(tag, forceCreation);
  }
  addTags(tags, forceCreation = false) {
    return tags.filter(tag => !!tag).map(tag => this._getOrCreateElement(tag, forceCreation));
  }
  getTag(attrSelector) {
    if (!attrSelector) return null;
    const meta = this._doc.querySelector(buildMetaSelector(attrSelector));
    return isMetaTag(meta) ? meta : null;
  }
  getTags(attrSelector) {
    if (!attrSelector) return [];
    const list = this._doc.querySelectorAll(buildMetaSelector(attrSelector));
    return list ? Array.from(list).filter(elem => isMetaTag(elem)) : [];
  }
  updateTag(tag, selector) {
    selector ??= parseSelector(tag);
    const meta = this.getTag(selector);
    if (meta) {
      setMetaElementAttributes(tag, meta);
      return meta;
    }
    return this._getOrCreateElement(tag, true);
  }
  removeTag(attrSelector) {
    this.removeTagElement(this.getTag(attrSelector));
  }
  removeTagElement(meta) {
    if (meta) {
      this._dom.remove(meta);
    }
  }
  _getOrCreateElement(meta, forceCreation = false) {
    if (!forceCreation) {
      const selector = parseSelector(meta);
      const elem = this.getTags(selector).filter(elem => containsAttributes(meta, elem))[0];
      if (elem !== undefined) return elem;
    }
    const element = this._dom.createElement('meta');
    setMetaElementAttributes(meta, element);
    const head = this._doc.getElementsByTagName('head')[0];
    head.appendChild(element);
    return element;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: Meta,
    deps: [],
    target: i0.ɵɵFactoryTarget.Service
  });
  static ɵprov = i0.ɵɵngDeclareService({
    minVersion: "22.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: Meta
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: Meta,
  decorators: [{
    type: Service
  }]
});
function buildMetaSelector(attrSelector) {
  return `meta[${attrSelector}]`;
}
function setMetaElementAttributes(tag, el) {
  Object.keys(tag).forEach(prop => el.setAttribute(getMetaKeyMap(prop), tag[prop]));
}
function parseSelector(tag) {
  const attr = tag.name ? 'name' : 'property';
  return `${attr}=${escapeSelectorValue(String(tag[attr]))}`;
}
function escapeSelectorValue(value) {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}
function containsAttributes(tag, elem) {
  return Object.keys(tag).every(key => elem.getAttribute(getMetaKeyMap(key)) === tag[key]);
}
function getMetaKeyMap(prop) {
  return META_KEYS_MAP[prop] || prop;
}
function isMetaTag(tag) {
  return tag?.nodeName.toLowerCase() === 'meta';
}
const META_KEYS_MAP = {
  httpEquiv: 'http-equiv'
};

class Title {
  _doc;
  constructor(_doc) {
    this._doc = _doc;
  }
  getTitle() {
    return this._doc.title;
  }
  setTitle(newTitle) {
    this._doc.title = newTitle || '';
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: Title,
    deps: [{
      token: DOCUMENT
    }],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: Title,
    providedIn: 'root'
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: Title,
  decorators: [{
    type: Injectable,
    args: [{
      providedIn: 'root'
    }]
  }],
  ctorParameters: () => [{
    type: undefined,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }]
});

function exportNgVar(name, value) {
  if (typeof COMPILED === 'undefined' || !COMPILED) {
    const ng = _global['ng'] = _global['ng'] || {};
    ng[name] = value;
  }
}

class ChangeDetectionPerfRecord {
  msPerTick;
  numTicks;
  constructor(msPerTick, numTicks) {
    this.msPerTick = msPerTick;
    this.numTicks = numTicks;
  }
}
class AngularProfiler {
  appRef;
  constructor(ref) {
    this.appRef = ref.injector.get(ApplicationRef);
  }
  timeChangeDetection(config) {
    const record = config && config['record'];
    const profileName = 'Change Detection';
    if (record && 'profile' in console && typeof console.profile === 'function') {
      console.profile(profileName);
    }
    const start = performance.now();
    let numTicks = 0;
    while (numTicks < 5 || performance.now() - start < 500) {
      this.appRef.tick();
      numTicks++;
    }
    const end = performance.now();
    if (record && 'profileEnd' in console && typeof console.profileEnd === 'function') {
      console.profileEnd(profileName);
    }
    const msPerTick = (end - start) / numTicks;
    console.log(`ran ${numTicks} change detection cycles`);
    console.log(`${msPerTick.toFixed(2)} ms per check`);
    return new ChangeDetectionPerfRecord(msPerTick, numTicks);
  }
}

const PROFILER_GLOBAL_NAME = 'profiler';
function enableDebugTools(ref) {
  exportNgVar(PROFILER_GLOBAL_NAME, new AngularProfiler(ref));
  return ref;
}
function disableDebugTools() {
  exportNgVar(PROFILER_GLOBAL_NAME, null);
}

class By {
  static all() {
    return () => true;
  }
  static css(selector) {
    return debugElement => {
      return debugElement.nativeElement != null ? elementMatches(debugElement.nativeElement, selector) : false;
    };
  }
  static directive(type) {
    return debugNode => debugNode.providerTokens.indexOf(type) !== -1;
  }
}
function elementMatches(n, selector) {
  if (_getDOM().isElementNode(n)) {
    return n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector);
  }
  return false;
}

class CssVarNamespacer {
  namespacePrefix = inject(CSS_VAR_NAMESPACE, {
    optional: true
  }) ?? '';
  namespace(name) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      if (!name.startsWith('--')) {
        throw new Error(`CSS variable names passed to \`CssVarNamespacer\` must start with '--', got: '${name}'`);
      }
    }
    if (!this.namespacePrefix) return name;
    return `--${this.namespacePrefix}${name.substring('--'.length)}`;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: CssVarNamespacer,
    deps: [],
    target: i0.ɵɵFactoryTarget.Service
  });
  static ɵprov = i0.ɵɵngDeclareService({
    minVersion: "22.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: CssVarNamespacer
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: CssVarNamespacer,
  decorators: [{
    type: Service
  }]
});

var HydrationFeatureKind;
(function (HydrationFeatureKind) {
  HydrationFeatureKind[HydrationFeatureKind["NoHttpTransferCache"] = 0] = "NoHttpTransferCache";
  HydrationFeatureKind[HydrationFeatureKind["HttpTransferCacheOptions"] = 1] = "HttpTransferCacheOptions";
  HydrationFeatureKind[HydrationFeatureKind["I18nSupport"] = 2] = "I18nSupport";
  HydrationFeatureKind[HydrationFeatureKind["EventReplay"] = 3] = "EventReplay";
  HydrationFeatureKind[HydrationFeatureKind["IncrementalHydration"] = 4] = "IncrementalHydration";
  HydrationFeatureKind[HydrationFeatureKind["NoIncrementalHydration"] = 5] = "NoIncrementalHydration";
})(HydrationFeatureKind || (HydrationFeatureKind = {}));
function hydrationFeature(ɵkind, ɵproviders = [], ɵoptions = {}) {
  return {
    ɵkind,
    ɵproviders
  };
}
function withNoHttpTransferCache() {
  return hydrationFeature(HydrationFeatureKind.NoHttpTransferCache);
}
function withHttpTransferCacheOptions(options) {
  return hydrationFeature(HydrationFeatureKind.HttpTransferCacheOptions, _withHttpTransferCache(options));
}
function withI18nSupport() {
  return hydrationFeature(HydrationFeatureKind.I18nSupport, _withI18nSupport());
}
function withEventReplay() {
  return hydrationFeature(HydrationFeatureKind.EventReplay, _withEventReplay());
}
function withIncrementalHydration() {
  return hydrationFeature(HydrationFeatureKind.IncrementalHydration, _withIncrementalHydration());
}
function withNoIncrementalHydration() {
  return hydrationFeature(HydrationFeatureKind.NoIncrementalHydration);
}
function provideEnabledBlockingInitialNavigationDetector() {
  return [{
    provide: ENVIRONMENT_INITIALIZER,
    useValue: () => {
      const isEnabledBlockingInitialNavigation = inject(_IS_ENABLED_BLOCKING_INITIAL_NAVIGATION, {
        optional: true
      });
      if (isEnabledBlockingInitialNavigation) {
        const console = inject(_Console);
        const message = _formatRuntimeError(5001, 'Configuration error: found both hydration and enabledBlocking initial navigation ' + 'in the same application, which is a contradiction.');
        console.warn(message);
      }
    },
    multi: true
  }];
}
function provideClientHydration(...features) {
  const providers = [];
  const featuresKind = new Set();
  for (const {
    ɵproviders,
    ɵkind
  } of features) {
    featuresKind.add(ɵkind);
    if (ɵproviders.length) {
      providers.push(ɵproviders);
    }
  }
  const hasHttpTransferCacheOptions = featuresKind.has(HydrationFeatureKind.HttpTransferCacheOptions);
  if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    if (featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) && hasHttpTransferCacheOptions) {
      throw new _RuntimeError(5001, 'Configuration error: found both withHttpTransferCacheOptions() and withNoHttpTransferCache() in the same call to provideClientHydration(), which is a contradiction.');
    }
    if (featuresKind.has(HydrationFeatureKind.IncrementalHydration) && featuresKind.has(HydrationFeatureKind.NoIncrementalHydration)) {
      throw new _RuntimeError(5001, 'Configuration error: found both withIncrementalHydration() and withNoIncrementalHydration() in the same call to provideClientHydration(), which is a contradiction.');
    }
  }
  return makeEnvironmentProviders([typeof ngDevMode !== 'undefined' && ngDevMode ? provideEnabledBlockingInitialNavigationDetector() : [], typeof ngDevMode !== 'undefined' && ngDevMode ? provideStabilityDebugging() : [], _withDomHydration(), featuresKind.has(HydrationFeatureKind.NoHttpTransferCache) || hasHttpTransferCacheOptions ? [] : _withHttpTransferCache({}), featuresKind.has(HydrationFeatureKind.NoIncrementalHydration) ? [] : _withIncrementalHydration(), providers, {
    provide: _CACHE_ACTIVE,
    useValue: {
      isActive: true
    }
  }, {
    provide: APP_BOOTSTRAP_LISTENER,
    multi: true,
    useFactory: () => {
      const appRef = inject(ApplicationRef);
      const cacheState = inject(_CACHE_ACTIVE);
      return () => {
        appRef.whenStable().then(() => {
          cacheState.isActive = false;
        });
      };
    }
  }]);
}

class DomSanitizer {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: DomSanitizer,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: DomSanitizer,
    providedIn: 'root',
    useExisting: i0.forwardRef(() => DomSanitizerImpl)
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: DomSanitizer,
  decorators: [{
    type: Injectable,
    args: [{
      providedIn: 'root',
      useExisting: forwardRef(() => DomSanitizerImpl)
    }]
  }]
});
class DomSanitizerImpl extends DomSanitizer {
  _doc = inject(DOCUMENT);
  sanitize(ctx, value) {
    if (value == null) return null;
    switch (ctx) {
      case SecurityContext.NONE:
        return value;
      case SecurityContext.HTML:
        if (_allowSanitizationBypassAndThrow(value, "HTML")) {
          return _unwrapSafeValue(value);
        }
        return __sanitizeHtml(this._doc, String(value)).toString();
      case SecurityContext.STYLE:
        if (_allowSanitizationBypassAndThrow(value, "Style")) {
          return _unwrapSafeValue(value);
        }
        return value;
      case SecurityContext.SCRIPT:
        if (_allowSanitizationBypassAndThrow(value, "Script")) {
          return _unwrapSafeValue(value);
        }
        throw new _RuntimeError(5200, (typeof ngDevMode === 'undefined' || ngDevMode) && 'unsafe value used in a script context');
      case SecurityContext.URL:
        if (_allowSanitizationBypassAndThrow(value, "URL")) {
          return _unwrapSafeValue(value);
        }
        return __sanitizeUrl(String(value));
      case SecurityContext.RESOURCE_URL:
        if (_allowSanitizationBypassAndThrow(value, "ResourceURL")) {
          return _unwrapSafeValue(value);
        }
        throw new _RuntimeError(-5201, (typeof ngDevMode === 'undefined' || ngDevMode) && `unsafe value used in a resource URL context (see ${_XSS_SECURITY_URL})`);
      default:
        throw new _RuntimeError(5202, (typeof ngDevMode === 'undefined' || ngDevMode) && `Unexpected SecurityContext ${ctx} (see ${_XSS_SECURITY_URL})`);
    }
  }
  bypassSecurityTrustHtml(value) {
    return _bypassSanitizationTrustHtml(value);
  }
  bypassSecurityTrustStyle(value) {
    return _bypassSanitizationTrustStyle(value);
  }
  bypassSecurityTrustScript(value) {
    return _bypassSanitizationTrustScript(value);
  }
  bypassSecurityTrustUrl(value) {
    return _bypassSanitizationTrustUrl(value);
  }
  bypassSecurityTrustResourceUrl(value) {
    return _bypassSanitizationTrustResourceUrl(value);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: DomSanitizerImpl,
    deps: [],
    target: i0.ɵɵFactoryTarget.Service
  });
  static ɵprov = i0.ɵɵngDeclareService({
    minVersion: "22.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: DomSanitizerImpl
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: DomSanitizerImpl,
  decorators: [{
    type: Service
  }]
});

const VERSION = /* @__PURE__ */new Version('22.1.1');

export { By, CssVarNamespacer, DomSanitizer, HydrationFeatureKind, Meta, Title, VERSION, disableDebugTools, enableDebugTools, provideClientHydration, withEventReplay, withHttpTransferCacheOptions, withI18nSupport, withIncrementalHydration, withNoHttpTransferCache, withNoIncrementalHydration, DomSanitizerImpl as ɵDomSanitizerImpl };
//# sourceMappingURL=platform-browser.mjs.map
