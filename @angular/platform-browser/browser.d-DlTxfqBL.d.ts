/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { ApplicationConfig as ApplicationConfig$1, Type, ApplicationRef, Provider, StaticProvider, PlatformRef } from '@angular/core';
import * as i1 from '@angular/common';

/**
 * Set of config options available during the application bootstrap operation.
 *
 * @publicApi
 *
 * @deprecated
 * `ApplicationConfig` has moved, please import `ApplicationConfig` from `@angular/core` instead.
 */
type ApplicationConfig = ApplicationConfig$1;

/**
 * Bootstraps an instance of an Angular application and renders a standalone component as the
 * application's root component. More information about standalone components can be found in [this
 * guide](guide/components/importing).
 *
 * @usageNotes
 * The root component passed into this function *must* be a standalone one (should have the
 * `standalone: true` flag in the `@Component` decorator config).
 *
 * ```angular-ts
 * @Component({
 *   standalone: true,
 *   template: 'Hello world!'
 * })
 * class RootComponent {}
 *
 * const appRef: ApplicationRef = await bootstrapApplication(RootComponent);
 * ```
 *
 * You can add the list of providers that should be available in the application injector by
 * specifying the `providers` field in an object passed as the second argument:
 *
 * ```ts
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     {provide: BACKEND_URL, useValue: 'https://yourdomain.com/api'}
 *   ]
 * });
 * ```
 *
 * The `importProvidersFrom` helper method can be used to collect all providers from any
 * existing NgModule (and transitively from all NgModules that it imports):
 *
 * ```ts
 * await bootstrapApplication(RootComponent, {
 *   providers: [
 *     importProvidersFrom(SomeNgModule)
 *   ]
 * });
 * ```
 *
 * Note: the `bootstrapApplication` method doesn't include [Testability](api/core/Testability) by
 * default. You can add [Testability](api/core/Testability) by getting the list of necessary
 * providers using `provideProtractorTestingSupport()` function and adding them into the `providers`
 * array, for example:
 *
 * ```ts
 * import {provideProtractorTestingSupport} from '@angular/platform-browser';
 *
 * await bootstrapApplication(RootComponent, {providers: [provideProtractorTestingSupport()]});
 * ```
 *
 * @param rootComponent A reference to a standalone component that should be rendered.
 * @param options Extra configuration for the bootstrap operation, see `ApplicationConfig` for
 *     additional info.
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 *
 * @publicApi
 */
declare function bootstrapApplication(rootComponent: Type<unknown>, options?: ApplicationConfig): Promise<ApplicationRef>;
/**
 * Create an instance of an Angular application without bootstrapping any components. This is useful
 * for the situation where one wants to decouple application environment creation (a platform and
 * associated injectors) from rendering components on a screen. Components can be subsequently
 * bootstrapped on the returned `ApplicationRef`.
 *
 * @param options Extra configuration for the application environment, see `ApplicationConfig` for
 *     additional info.
 * @returns A promise that returns an `ApplicationRef` instance once resolved.
 *
 * @publicApi
 */
declare function createApplication(options?: ApplicationConfig): Promise<ApplicationRef>;
/**
 * Returns a set of providers required to setup [Testability](api/core/Testability) for an
 * application bootstrapped using the `bootstrapApplication` function. The set of providers is
 * needed to support testing an application with Protractor (which relies on the Testability APIs
 * to be present).
 *
 * @returns An array of providers required to setup Testability for an application and make it
 *     available for testing using Protractor.
 *
 * @publicApi
 */
declare function provideProtractorTestingSupport(): Provider[];
/**
 * A factory function that returns a `PlatformRef` instance associated with browser service
 * providers.
 *
 * @publicApi
 */
declare const platformBrowser: (extraProviders?: StaticProvider[]) => PlatformRef;
/**
 * Exports required infrastructure for all Angular apps.
 * Included by default in all Angular apps created with the CLI
 * `new` command.
 * Re-exports `CommonModule` and `ApplicationModule`, making their
 * exports and providers available to all apps.
 *
 * @publicApi
 */
declare class BrowserModule {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BrowserModule, never, never, [typeof i1.CommonModule, typeof i0.ApplicationModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BrowserModule>;
}

export { BrowserModule, bootstrapApplication, createApplication, platformBrowser, provideProtractorTestingSupport };
export type { ApplicationConfig };
