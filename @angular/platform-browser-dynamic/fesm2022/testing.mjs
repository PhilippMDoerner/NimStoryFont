/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { createPlatformFactory, NgModule } from '@angular/core';
import { platformBrowserDynamic } from './platform-browser-dynamic.mjs';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import '@angular/compiler';
import '@angular/platform-browser';

/**
 * @deprecated Use the `platformBrowserTesting` function instead from `@angular/platform-browser/testing`.
 * In case you are not in a CLI app and rely on JIT compilation, you might also need to import `@angular/compiler`
 */
const platformBrowserDynamicTesting = createPlatformFactory(platformBrowserDynamic, 'browserDynamicTesting');
/**
 * NgModule for testing.
 *
 * @deprecated Use the `BrowserTestingModule` from `@angular/platform-browser/testing` instead.
 */
class BrowserDynamicTestingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserDynamicTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.3", ngImport: i0, type: BrowserDynamicTestingModule, exports: [BrowserTestingModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserDynamicTestingModule, imports: [BrowserTestingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserDynamicTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserTestingModule],
                }]
        }] });

export { BrowserDynamicTestingModule, platformBrowserDynamicTesting };
//# sourceMappingURL=testing.mjs.map
