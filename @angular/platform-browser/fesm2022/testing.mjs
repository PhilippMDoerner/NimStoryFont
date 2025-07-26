/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { ɵgetDOM as _getDOM, DOCUMENT, PlatformLocation } from '@angular/common';
import { MockPlatformLocation } from '@angular/common/testing';
import * as i0 from '@angular/core';
import { Injectable, Inject, createPlatformFactory, APP_ID, ɵinternalProvideZoneChangeDetection as _internalProvideZoneChangeDetection, ɵChangeDetectionScheduler as _ChangeDetectionScheduler, ɵChangeDetectionSchedulerImpl as _ChangeDetectionSchedulerImpl, NgModule } from '@angular/core';
import { TestComponentRenderer } from '@angular/core/testing';
import { platformBrowser, BrowserModule } from './browser-DKgH74dt.mjs';
import './dom_renderer-Frqw9gM5.mjs';

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
        const rootElement = _getDOM().getDefaultDocument().createElement('div');
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
            _getDOM().remove(oldRoots[i]);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: DOMTestComponentRenderer, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: DOMTestComponentRenderer });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: DOMTestComponentRenderer, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });

/**
 * Platform for testing
 *
 * @publicApi
 */
const platformBrowserTesting = createPlatformFactory(platformBrowser, 'browserTesting');
/**
 * NgModule for testing.
 *
 * @publicApi
 */
class BrowserTestingModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.0.3", ngImport: i0, type: BrowserTestingModule, exports: [BrowserModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserTestingModule, providers: [
            { provide: APP_ID, useValue: 'a' },
            _internalProvideZoneChangeDetection({}),
            { provide: _ChangeDetectionScheduler, useExisting: _ChangeDetectionSchedulerImpl },
            { provide: PlatformLocation, useClass: MockPlatformLocation },
            { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer },
        ], imports: [BrowserModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: i0, type: BrowserTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: [BrowserModule],
                    providers: [
                        { provide: APP_ID, useValue: 'a' },
                        _internalProvideZoneChangeDetection({}),
                        { provide: _ChangeDetectionScheduler, useExisting: _ChangeDetectionSchedulerImpl },
                        { provide: PlatformLocation, useClass: MockPlatformLocation },
                        { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer },
                    ],
                }]
        }] });

export { BrowserTestingModule, platformBrowserTesting };
//# sourceMappingURL=testing.mjs.map
