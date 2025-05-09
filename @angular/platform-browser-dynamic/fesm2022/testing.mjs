/**
 * @license Angular v19.1.6
 * (c) 2010-2024 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { Injectable, Inject, createPlatformFactory, NgModule } from '@angular/core';
import { TestComponentRenderer } from '@angular/core/testing';
import { ɵplatformCoreDynamic, ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { ɵgetDOM, DOCUMENT } from '@angular/common';

/**
 * A DOM based implementation of the TestComponentRenderer.
 */
class DOMTestComponentRenderer extends TestComponentRenderer {
    _doc;
    constructor(_doc) {
        super();
        this._doc = _doc;
    }
    insertRootElement(rootElId) {
        this.removeAllRootElementsImpl();
        const rootElement = ɵgetDOM().getDefaultDocument().createElement('div');
        rootElement.setAttribute('id', rootElId);
        this._doc.body.appendChild(rootElement);
    }
    removeAllRootElements() {
        // Check whether the `DOCUMENT` instance retrieved from DI contains
        // the necessary function to complete the cleanup. In tests that don't
        // interact with DOM, the `DOCUMENT` might be mocked and some functions
        // might be missing. For such tests, DOM cleanup is not required and
        // we skip the logic if there are missing functions.
        if (typeof this._doc.querySelectorAll === 'function') {
            this.removeAllRootElementsImpl();
        }
    }
    removeAllRootElementsImpl() {
        const oldRoots = this._doc.querySelectorAll('[id^=root]');
        for (let i = 0; i < oldRoots.length; i++) {
            ɵgetDOM().remove(oldRoots[i]);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DOMTestComponentRenderer, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DOMTestComponentRenderer });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: DOMTestComponentRenderer, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });

/**
 * Platform for dynamic tests
 *
 * @publicApi
 */
const platformCoreDynamicTesting = createPlatformFactory(ɵplatformCoreDynamic, 'coreDynamicTesting', []);

/**
 * @publicApi
 */
const platformBrowserDynamicTesting = createPlatformFactory(platformCoreDynamicTesting, 'browserDynamicTesting', ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
/**
 * NgModule for testing.
 *
 * @publicApi
 */
class BrowserDynamicTestingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: BrowserDynamicTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.1.6", ngImport: i0, type: BrowserDynamicTestingModule, exports: [BrowserTestingModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: BrowserDynamicTestingModule, providers: [{ provide: TestComponentRenderer, useClass: DOMTestComponentRenderer }], imports: [BrowserTestingModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.1.6", ngImport: i0, type: BrowserDynamicTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserTestingModule],
                    providers: [{ provide: TestComponentRenderer, useClass: DOMTestComponentRenderer }],
                }]
        }] });

/**
 * @module
 * @description
 * Entry point for all public APIs of this package.
 */

// This file is not used to build this module. It is only used during editing

/**
 * Generated bundle index. Do not edit.
 */

export { BrowserDynamicTestingModule, platformBrowserDynamicTesting, DOMTestComponentRenderer as ɵDOMTestComponentRenderer, platformCoreDynamicTesting as ɵplatformCoreDynamicTesting };
//# sourceMappingURL=testing.mjs.map
