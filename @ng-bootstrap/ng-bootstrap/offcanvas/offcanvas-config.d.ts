import { Injector } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Options available when opening new offcanvas windows with `NgbOffcanvas.open()` method.
 *
 * @since 12.1.0
 */
export interface NgbOffcanvasOptions {
    /**
     * If `true`, opening and closing will be animated.
     */
    animation?: boolean;
    /**
     * `aria-describedby` attribute value to set on the offcanvas panel.
     */
    ariaDescribedBy?: string;
    /**
     * `aria-labelledby` attribute value to set on the offcanvas panel.
     */
    ariaLabelledBy?: string;
    /**
     * If `true`, the backdrop element will be created for a given offcanvas.
     * If 'static', clicking the backdrop won't close the offcanvas (available since 13.1.0).
     *
     * Default value is `true`.
     */
    backdrop?: boolean | 'static';
    /**
     * A custom class to append to the offcanvas backdrop.
     */
    backdropClass?: string;
    /**
     * Callback right before the offcanvas will be dismissed.
     *
     * If this function returns:
     * * `false`
     * * a promise resolved with `false`
     * * a promise that is rejected
     *
     * then the offcanvas won't be dismissed.
     */
    beforeDismiss?: () => boolean | Promise<boolean>;
    /**
     * A selector specifying the element all new offcanvas panels and backdrops should be appended to.
     *
     * If not specified, will be `body`.
     */
    container?: string | HTMLElement;
    /**
     * The `Injector` to use for offcanvas content.
     */
    injector?: Injector;
    /**
     * If `true`, the offcanvas will be closed when `Escape` key is pressed
     *
     * Default value is `true`.
     */
    keyboard?: boolean;
    /**
     * A custom class to append to the offcanvas panel.
     */
    panelClass?: string;
    /**
     * The position of the offcanvas
     */
    position?: 'start' | 'end' | 'top' | 'bottom';
    /**
     * Scroll content while offcanvas is open (false by default).
     */
    scroll?: boolean;
}
/**
 * A configuration service for the [`NgbOffcanvas`](#/components/offcanvas/api#NgbOffcanvas) service.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all offcanvases used in the application.
 *
 * @since 12.1.0
 */
export declare class NgbOffcanvasConfig implements Required<NgbOffcanvasOptions> {
    private _ngbConfig;
    private _animation;
    ariaDescribedBy: string;
    ariaLabelledBy: string;
    backdrop: boolean | 'static';
    backdropClass: string;
    beforeDismiss: () => boolean | Promise<boolean>;
    container: string | HTMLElement;
    injector: Injector;
    keyboard: boolean;
    panelClass: string;
    position: 'start' | 'end' | 'top' | 'bottom';
    scroll: boolean;
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbOffcanvasConfig>;
}
