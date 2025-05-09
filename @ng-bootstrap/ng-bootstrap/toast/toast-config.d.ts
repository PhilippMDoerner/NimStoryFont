import * as i0 from "@angular/core";
/**
 * Interface used to type all toast config options. See `NgbToastConfig`.
 *
 * @since 5.0.0
 */
export interface NgbToastOptions {
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
export declare class NgbToastConfig implements NgbToastOptions {
    private _ngbConfig;
    private _animation;
    autohide: boolean;
    delay: number;
    ariaLive: 'polite' | 'assertive';
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbToastConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbToastConfig>;
}
