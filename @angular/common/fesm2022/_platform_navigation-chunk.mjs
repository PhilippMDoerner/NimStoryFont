/**
 * @license Angular v22.1.1
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { InjectionToken, Injectable } from '@angular/core';

const PRECOMMIT_HANDLER_SUPPORTED = new InjectionToken('', {
  factory: () => {
    return typeof window !== 'undefined' && typeof window.NavigationPrecommitController !== 'undefined';
  }
});
class PlatformNavigation {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: PlatformNavigation,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: PlatformNavigation,
    providedIn: 'platform',
    useFactory: () => window.navigation
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: PlatformNavigation,
  decorators: [{
    type: Injectable,
    args: [{
      providedIn: 'platform',
      useFactory: () => window.navigation
    }]
  }]
});

export { PRECOMMIT_HANDLER_SUPPORTED, PlatformNavigation };
//# sourceMappingURL=_platform_navigation-chunk.mjs.map
