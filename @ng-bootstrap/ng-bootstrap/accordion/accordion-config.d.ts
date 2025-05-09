import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbAccordionDirective`](#/components/accordion/api#NgbAccordionDirective).
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all accordions used in the application.
 */
export declare class NgbAccordionConfig {
    private _ngbConfig;
    private _animation;
    closeOthers: boolean;
    destroyOnHide: boolean;
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbAccordionConfig>;
}
