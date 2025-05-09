import { Placement as PopperPlacement, Options } from '@popperjs/core';
import { NgbRTL } from './rtl';
export declare function getPopperClassPlacement(placement: Placement, isRTL: boolean): PopperPlacement;
export declare function getBootstrapBaseClassPlacement(baseClass: string, placement: PopperPlacement): string;
export declare function getPopperOptions({ placement, baseClass }: PositioningOptions, rtl: NgbRTL): Partial<Options>;
export type Placement = 'auto' | 'top' | 'bottom' | 'start' | 'left' | 'end' | 'right' | 'top-start' | 'top-left' | 'top-end' | 'top-right' | 'bottom-start' | 'bottom-left' | 'bottom-end' | 'bottom-right' | 'start-top' | 'left-top' | 'start-bottom' | 'left-bottom' | 'end-top' | 'right-top' | 'end-bottom' | 'right-bottom';
export type PlacementArray = Placement | Array<Placement> | string;
interface PositioningOptions {
    hostElement: HTMLElement;
    targetElement: HTMLElement;
    placement: string | Placement | PlacementArray;
    baseClass?: string;
    updatePopperOptions?: (options: Partial<Options>) => Partial<Options>;
}
export declare function ngbPositioning(): {
    createPopper(positioningOption: PositioningOptions): void;
    update(): void;
    setOptions(positioningOption: PositioningOptions): void;
    destroy(): void;
};
export {};
