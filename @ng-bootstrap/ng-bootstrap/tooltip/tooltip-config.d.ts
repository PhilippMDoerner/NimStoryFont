import { PlacementArray } from '../util/positioning';
import { Options } from '@popperjs/core';
import * as i0 from "@angular/core";
/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
export declare class NgbTooltipConfig {
    private _ngbConfig;
    private _animation;
    autoClose: boolean | 'inside' | 'outside';
    placement: PlacementArray;
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    triggers: string;
    container: string;
    disableTooltip: boolean;
    tooltipClass: string;
    openDelay: number;
    closeDelay: number;
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTooltipConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTooltipConfig>;
}
