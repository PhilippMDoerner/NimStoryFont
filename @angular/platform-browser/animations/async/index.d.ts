/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { EnvironmentProviders, OnDestroy, RendererFactory2, NgZone, RendererType2, Renderer2, InjectionToken } from '@angular/core';
import { ɵAnimationEngine as _AnimationEngine, ɵAnimationRendererFactory as _AnimationRendererFactory } from '@angular/animations/browser';

/**
 * Returns the set of dependency-injection providers
 * to enable animations in an application. See [animations guide](guide/animations)
 * to learn more about animations in Angular.
 *
 * When you use this function instead of the eager `provideAnimations()`, animations won't be
 * rendered until the renderer is loaded.
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
 *     provideAnimationsAsync()
 *   ]
 * });
 * ```
 *
 * @param type pass `'noop'` as argument to disable animations.
 *
 * @publicApi
 */
declare function provideAnimationsAsync(type?: 'animations' | 'noop'): EnvironmentProviders;

declare class AsyncAnimationRendererFactory implements OnDestroy, RendererFactory2 {
    private doc;
    private delegate;
    private zone;
    private animationType;
    private moduleImpl?;
    private _rendererFactoryPromise;
    private scheduler;
    private readonly injector;
    private readonly loadingSchedulerFn;
    private _engine?;
    /**
     *
     * @param moduleImpl allows to provide a mock implmentation (or will load the animation module)
     */
    constructor(doc: Document, delegate: RendererFactory2, zone: NgZone, animationType: 'animations' | 'noop', moduleImpl?: Promise<{
        ɵcreateEngine: (type: "animations" | "noop", doc: Document) => _AnimationEngine;
        ɵAnimationRendererFactory: typeof _AnimationRendererFactory;
    }> | undefined);
    /** @docs-private */
    ngOnDestroy(): void;
    /**
     * This method is delegating the renderer creation to the factories.
     * It uses default factory while the animation factory isn't loaded
     * and will rely on the animation factory once it is loaded.
     *
     * Calling this method will trigger as side effect the loading of the animation module
     * if the renderered component uses animations.
     */
    createRenderer(hostElement: any, rendererType: RendererType2): Renderer2;
    begin(): void;
    end(): void;
    whenRenderingDone?(): Promise<any>;
    /**
     * Used during HMR to clear any cached data about a component.
     * @param componentId ID of the component that is being replaced.
     */
    protected componentReplaced(componentId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsyncAnimationRendererFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsyncAnimationRendererFactory>;
}
/**
 * Provides a custom scheduler function for the async loading of the animation package.
 *
 * Private token for investigation purposes
 */
declare const ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN: InjectionToken<(<T>(loadFn: () => T) => T)>;

export { provideAnimationsAsync, ɵASYNC_ANIMATION_LOADING_SCHEDULER_FN, AsyncAnimationRendererFactory as ɵAsyncAnimationRendererFactory };
