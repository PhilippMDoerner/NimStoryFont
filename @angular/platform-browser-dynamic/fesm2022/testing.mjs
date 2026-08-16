/**
 * @license Angular v22.1.1
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { createPlatformFactory, NgModule } from '@angular/core';
import { platformBrowserDynamic } from './platform-browser-dynamic.mjs';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import '@angular/compiler';
import '@angular/platform-browser';

const platformBrowserDynamicTesting = createPlatformFactory(platformBrowserDynamic, 'browserDynamicTesting');
class BrowserDynamicTestingModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: BrowserDynamicTestingModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: "14.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: BrowserDynamicTestingModule,
    exports: [BrowserTestingModule]
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: BrowserDynamicTestingModule,
    imports: [BrowserTestingModule]
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: BrowserDynamicTestingModule,
  decorators: [{
    type: NgModule,
    args: [{
      exports: [BrowserTestingModule]
    }]
  }]
});

export { BrowserDynamicTestingModule, platformBrowserDynamicTesting };
//# sourceMappingURL=testing.mjs.map
