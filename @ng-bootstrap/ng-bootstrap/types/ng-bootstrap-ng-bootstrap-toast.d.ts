import * as i0 from '@angular/core';
import { AfterContentInit, OnChanges, TemplateRef, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
declare class NgbToastHeader {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbToastHeader, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbToastHeader, "[ngbToastHeader]", never, {}, {}, never, never, true, never>;
}
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
declare class NgbToast implements AfterContentInit, OnChanges {
    ariaLive: string;
    private _config;
    private _zone;
    private _injector;
    private _element;
    private _timeoutID;
    /**
     * If `true`, toast opening and closing will be animated.
     *
     * Animation is triggered only when the `.hide()` or `.show()` functions are called
     *
     * @since 8.0.0
     */
    animation: boolean;
    /**
     * Delay after which the toast will hide (ms).
     * default: `500` (ms) (inherited from NgbToastConfig)
     */
    delay: number;
    /**
     * Auto hide the toast after a delay in ms.
     * default: `true` (inherited from NgbToastConfig)
     */
    autohide: boolean;
    /**
     * Text to be used as toast's header.
     * Ignored if a ContentChild template is specified at the same time.
     */
    header: string;
    /**
     * A template like `<ng-template ngbToastHeader></ng-template>` can be
     * used in the projected content to allow markup usage.
     */
    contentHeaderTpl: TemplateRef<any> | null;
    /**
     * An event fired after the animation triggered by calling `.show()` method has finished.
     *
     * @since 8.0.0
     */
    shown: EventEmitter<void>;
    /**
     * An event fired after the animation triggered by calling `.hide()` method has finished.
     *
     * It can only occur in 2 different scenarios:
     * - `autohide` timeout fires
     * - user clicks on a closing cross
     *
     * Additionally this output is purely informative. The toast won't be removed from DOM automatically, it's up
     * to the user to take care of that.
     *
     * @since 8.0.0
     */
    hidden: EventEmitter<void>;
    constructor(ariaLive: string);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Triggers toast closing programmatically.
     *
     * The returned observable will emit and be completed once the closing transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(hidden)` output
     *
     * @since 8.0.0
     */
    hide(): Observable<void>;
    /**
     * Triggers toast opening programmatically.
     *
     * The returned observable will emit and be completed once the opening transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(shown)` output
     *
     * @since 8.0.0
     */
    show(): Observable<void>;
    private _init;
    private _clearTimeout;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbToast, [{ attribute: "aria-live"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbToast, "ngb-toast", ["ngbToast"], { "animation": { "alias": "animation"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; "autohide": { "alias": "autohide"; "required": false; }; "header": { "alias": "header"; "required": false; }; }, { "shown": "shown"; "hidden": "hidden"; }, ["contentHeaderTpl"], ["*"], true, never>;
}

/**
 * Interface used to type all toast config options. See `NgbToastConfig`.
 *
 * @since 5.0.0
 */
interface NgbToastOptions {
    /**
     * Specify if the toast component should emit the `hide()` output
     * after a certain `delay` in ms.
     */
    autohide?: boolean;
    /**
     * Delay in ms after which the `hide()` output should be emitted.
     */
    delay?: number;
    /**
     * Type of aria-live attribute to be used.
     *
     * Could be one of these 2 values (as string):
     * - `polite` (default)
     * - `assertive`
     */
    ariaLive?: 'polite' | 'assertive';
}
/**
 * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
 * and customize the values of its properties in order to provide default values for all the toasts used in the
 * application.
 *
 * @since 5.0.0
 */
declare class NgbToastConfig implements NgbToastOptions {
    private _ngbConfig;
    private _animation;
    autohide: boolean;
    delay: number;
    ariaLive: 'polite' | 'assertive';
    /**
     * @defaultValue `true`
     */
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbToastConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbToastConfig>;
}

declare class NgbToastModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbToastModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbToastModule, never, [typeof NgbToast, typeof NgbToastHeader], [typeof NgbToast, typeof NgbToastHeader]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbToastModule>;
}

export { NgbToast, NgbToastConfig, NgbToastHeader, NgbToastModule };
export type { NgbToastOptions };
