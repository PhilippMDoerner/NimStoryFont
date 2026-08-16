import { Options } from '@popperjs/core';
import * as i0 from '@angular/core';
import { NgZone, ViewRef, ComponentRef, Type, TemplateRef, InjectionToken, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

type Placement = 'auto' | 'top' | 'bottom' | 'start' | 'left' | 'end' | 'right' | 'top-start' | 'top-left' | 'top-end' | 'top-right' | 'bottom-start' | 'bottom-left' | 'bottom-end' | 'bottom-right' | 'start-top' | 'left-top' | 'start-bottom' | 'left-bottom' | 'end-top' | 'right-top' | 'end-bottom' | 'right-bottom';
type PlacementArray = Placement | Array<Placement> | string;
interface PositioningOptions {
    hostElement: HTMLElement;
    targetElement: HTMLElement;
    placement: string | Placement | PlacementArray;
    baseClass?: string;
    updatePopperOptions?: (options: Partial<Options>) => Partial<Options>;
}
declare function ngbPositioning(): {
    createPopper(positioningOption: PositioningOptions): void;
    update(): void;
    setOptions(positioningOption: PositioningOptions): void;
    destroy(): void;
};

declare function toInteger(value: any): number;
declare function toString(value: any): string;
declare function getValueInRange(value: number, max: number, min?: number): number;
declare function isString(value: any): value is string;
declare function isNumber(value: any): value is number;
declare function isInteger(value: any): value is number;
declare function isDefined(value: any): boolean;
declare function isPromise<T>(v: any): v is Promise<T>;
declare function padNumber(value: number): string;
declare function regExpEscape(text: any): any;
/**
 * Force a browser reflow
 * @param element element where to apply the reflow
 */
declare function reflow(element: HTMLElement): DOMRect;
declare function removeAccents(str: string): string;
/**
 * Returns the active element in the given root.
 * If the active element is inside a shadow root, it is searched recursively.
 */
declare function getActiveElement(root?: Document | ShadowRoot): Element | null;

type NgbTransitionStartFn<T = any> = (element: HTMLElement, animation: boolean, context: T) => NgbTransitionEndFn | void;
type NgbTransitionEndFn = () => void;
interface NgbTransitionOptions<T> {
    animation: boolean;
    runningTransition: 'continue' | 'stop';
    context?: T;
}
declare const ngbRunTransition: <T>(zone: NgZone, element: HTMLElement, startFn: NgbTransitionStartFn<T>, options: NgbTransitionOptions<T>) => Observable<void>;
declare const ngbCompleteTransition: (element: HTMLElement) => void;

interface NgbCollapseCtx {
    direction: 'show' | 'hide';
    dimension: 'width' | 'height';
    maxSize?: string;
}
declare const ngbCollapsingTransition: NgbTransitionStartFn<NgbCollapseCtx>;

declare const enum SOURCE {
    ESCAPE = 0,
    CLICK = 1
}
declare function ngbAutoClose(zone: NgZone, document: any, type: boolean | 'inside' | 'outside', close: (source: SOURCE) => void, closed$: Observable<any>, insideElements: HTMLElement[], ignoreElements?: HTMLElement[], insideSelector?: string): void;

declare const FOCUSABLE_ELEMENTS_SELECTOR: string;
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 */
declare function getFocusableBoundaryElements(element: HTMLElement): HTMLElement[];
/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * @param zone Angular zone
 * @param element The element around which focus will be trapped inside
 * @param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * @param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 */
declare const ngbFocusTrap: (zone: NgZone, element: HTMLElement, stopFocusTrap$: Observable<any>, refocusOnClick?: boolean) => void;

declare function addPopperOffset(offset: number[]): (options: Partial<Options>) => Partial<Options>;

declare class ContentRef {
    nodes: Node[][];
    viewRef?: ViewRef | undefined;
    componentRef?: ComponentRef<any> | undefined;
    constructor(nodes: Node[][], viewRef?: ViewRef | undefined, componentRef?: ComponentRef<any> | undefined);
}
declare class PopupService<T> {
    private _componentType;
    private _windowRef;
    private _contentRef;
    private _document;
    private _applicationRef;
    private _injector;
    private _viewContainerRef;
    private _ngZone;
    constructor(_componentType: Type<T>);
    open(content?: string | TemplateRef<any>, templateContext?: any, animation?: boolean): {
        windowRef: ComponentRef<T>;
        transition$: Observable<void>;
    };
    close(animation?: boolean): Observable<void>;
    private _getContentRef;
}

/** Type for the callback used to revert the scrollbar. */
type ScrollbarReverter = () => void;
/**
 * Utility to handle the scrollbar.
 *
 * It allows to hide the scrollbar and compensate the lack of a vertical scrollbar
 * by adding an equivalent padding on the right of the body, and to revert this change.
 */
declare class ScrollBar {
    private _document;
    /**
     * To be called to hide a potential vertical scrollbar:
     * - if a scrollbar is there and has a width greater than 0, adds some compensation
     * padding to the body to keep the same layout as when the scrollbar is there
     * - adds overflow: hidden
     *
     * @return a callback used to revert the change
     */
    hide(): ScrollbarReverter;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScrollBar, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScrollBar>;
}

declare function listenToTriggers(element: HTMLElement, triggers: string, isOpenedFn: () => boolean, openFn: () => void, closeFn: () => void, openDelayMs?: number, closeDelayMs?: number, enterContent?: Observable<void>, leaveContent?: Observable<void>): () => void;

declare const ARIA_LIVE_DELAY: InjectionToken<number | null>;
declare class Live implements OnDestroy {
    private _document;
    private _delay;
    ngOnDestroy(): void;
    say(message: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Live, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Live>;
}

export { ARIA_LIVE_DELAY, ContentRef, FOCUSABLE_ELEMENTS_SELECTOR, Live, PopupService, SOURCE, ScrollBar, addPopperOffset, getActiveElement, getFocusableBoundaryElements, getValueInRange, isDefined, isInteger, isNumber, isPromise, isString, listenToTriggers, ngbAutoClose, ngbCollapsingTransition, ngbCompleteTransition, ngbFocusTrap, ngbPositioning, ngbRunTransition, padNumber, reflow, regExpEscape, removeAccents, toInteger, toString };
export type { NgbTransitionOptions, NgbTransitionStartFn, Placement, PlacementArray };
