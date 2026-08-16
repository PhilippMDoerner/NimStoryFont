/**
 * @license Angular v22.1.1
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { Version, ViewEncapsulation, Injector, Compiler, Injectable, createPlatformFactory, COMPILER_OPTIONS, CompilerFactory } from '@angular/core';
import { CompilerConfig, ResourceLoader } from '@angular/compiler';
import { platformBrowser } from '@angular/platform-browser';

const VERSION = /* @__PURE__ */new Version('22.1.1');

const COMPILER_PROVIDERS = [{
  provide: Compiler,
  useFactory: () => new Compiler()
}];
class JitCompilerFactory {
  _defaultOptions;
  constructor(defaultOptions) {
    const compilerOptions = {
      defaultEncapsulation: ViewEncapsulation.Emulated
    };
    this._defaultOptions = [compilerOptions, ...defaultOptions];
  }
  createCompiler(options = []) {
    const opts = _mergeOptions(this._defaultOptions.concat(options));
    const injector = Injector.create({
      providers: [COMPILER_PROVIDERS, {
        provide: CompilerConfig,
        useFactory: () => {
          return new CompilerConfig({
            defaultEncapsulation: opts.defaultEncapsulation,
            preserveWhitespaces: opts.preserveWhitespaces
          });
        },
        deps: []
      }, opts.providers]
    });
    return injector.get(Compiler);
  }
}
function _mergeOptions(optionsArr) {
  return {
    defaultEncapsulation: _lastDefined(optionsArr.map(options => options.defaultEncapsulation)),
    providers: _mergeArrays(optionsArr.map(options => options.providers)),
    preserveWhitespaces: _lastDefined(optionsArr.map(options => options.preserveWhitespaces))
  };
}
function _lastDefined(args) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (args[i] !== undefined) {
      return args[i];
    }
  }
  return undefined;
}
function _mergeArrays(parts) {
  const result = [];
  parts.forEach(part => part && result.push(...part));
  return result;
}

class ResourceLoaderImpl extends ResourceLoader {
  get(url) {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.onload = function () {
      const response = xhr.response;
      let status = xhr.status;
      if (status === 0) {
        status = response ? 200 : 0;
      }
      if (200 <= status && status <= 300) {
        resolve(response);
      } else {
        reject(`Failed to load ${url}`);
      }
    };
    xhr.onerror = function () {
      reject(`Failed to load ${url}`);
    };
    xhr.send();
    return promise;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: ResourceLoaderImpl,
    deps: null,
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: ResourceLoaderImpl
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: ResourceLoaderImpl,
  decorators: [{
    type: Injectable
  }]
});

const INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [{
  provide: COMPILER_OPTIONS,
  useValue: {
    providers: [{
      provide: ResourceLoader,
      useClass: ResourceLoaderImpl,
      deps: []
    }]
  },
  multi: true
}, {
  provide: CompilerFactory,
  useClass: JitCompilerFactory,
  deps: [COMPILER_OPTIONS]
}];
const platformBrowserDynamic = createPlatformFactory(platformBrowser, 'browserDynamic', INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);

export { JitCompilerFactory, VERSION, platformBrowserDynamic };
//# sourceMappingURL=platform-browser-dynamic.mjs.map
