/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { ModuleWithProviders, Provider, OnDestroy } from '@angular/core';
export { ANIMATION_MODULE_TYPE } from '@angular/core';
import { BrowserModule } from '../browser.d-DlTxfqBL.js';
import { ɵAnimationEngine as _AnimationEngine, AnimationDriver, ɵAnimationStyleNormalizer as _AnimationStyleNormalizer } from '@angular/animations/browser';
import '@angular/common';

/**
 * Object used to configure the behavior of {@link BrowserAnimationsModule}
 * @publicApi
 */
interface BrowserAnimationsModuleConfig {
    /**
     *  Whether animations should be disabled. Passing this is identical to providing the
     * `NoopAnimationsModule`, but it can be controlled based on a runtime value.
     */
    disableAnimations?: boolean;
}
/**
 * Exports `BrowserModule` with additional dependency-injection providers
 * for use with animations. See [Animations](guide/animations).
 * @publicApi
 */
declare class BrowserAnimationsModule {
    /**
     * Configures the module based on the specified object.
     *
     * @param config Object used to configure the behavior of the `BrowserAnimationsModule`.
     * @see {@link BrowserAnimationsModuleConfig}
     *
     * @usageNotes
     * When registering the `BrowserAnimationsModule`, you can use the `withConfig`
     * function as follows:
     * ```ts
     * @NgModule({
     *   imports: [BrowserAnimationsModule.withConfig(config)]
     * })
     * class MyNgModule {}
     * ```
     */
    static withConfig(config: BrowserAnimationsModuleConfig): ModuleWithProviders<BrowserAnimationsModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BrowserAnimationsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BrowserAnimationsModule, never, never, [typeof BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BrowserAnimationsModule>;
}
/**
 * Returns the set of dependency-injection providers
 * to enable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * @usageNotes
 *
 * The function is useful when you want to enable animations in an application
 * bootstrapped using the `bootstrapApplication` function. In this scenario there
 * is no need to import the `BrowserAnimationsModule` NgModule at all, just add
 * providers returned by this function to the `providers` list as show below.
 *
 * ```ts
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideAnimations()
 *   ]
 * });
 * ```
 *
 * @publicApi
 */
declare function provideAnimations(): Provider[];
/**
 * A null player that must be imported to allow disabling of animations.
 * @publicApi
 */
declare class NoopAnimationsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NoopAnimationsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NoopAnimationsModule, never, never, [typeof BrowserModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NoopAnimationsModule>;
}
/**
 * Returns the set of dependency-injection providers
 * to disable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * @usageNotes
 *
 * The function is useful when you want to bootstrap an application using
 * the `bootstrapApplication` function, but you need to disable animations
 * (for example, when running tests).
 *
 * ```ts
 * bootstrapApplication(RootComponent, {
 *   providers: [
 *     provideNoopAnimations()
 *   ]
 * });
 * ```
 *
 * @publicApi
 */
declare function provideNoopAnimations(): Provider[];

declare class InjectableAnimationEngine extends _AnimationEngine implements OnDestroy {
    constructor(doc: Document, driver: AnimationDriver, normalizer: _AnimationStyleNormalizer);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InjectableAnimationEngine, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InjectableAnimationEngine>;
}

export { BrowserAnimationsModule, NoopAnimationsModule, provideAnimations, provideNoopAnimations, InjectableAnimationEngine as ɵInjectableAnimationEngine };
export type { BrowserAnimationsModuleConfig };
