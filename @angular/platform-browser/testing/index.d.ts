/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { StaticProvider, PlatformRef } from '@angular/core';
import { BrowserModule } from '../browser.d-DlTxfqBL.js';
import '@angular/common';

/**
 * Platform for testing
 *
 * @publicApi
 */
declare const platformBrowserTesting: (extraProviders?: StaticProvider[]) => PlatformRef;
/**
 * NgModule for testing.
 *
 * @publicApi
 */
declare class BrowserTestingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BrowserTestingModule, never, never, [typeof BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BrowserTestingModule>;
}

export { BrowserTestingModule, platformBrowserTesting };
