import * as i0 from '@angular/core';
import { Injector, OnInit, EventEmitter, OnDestroy, ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ContentRef } from './_ngb-ngbootstrap-utilities.d';

/**
 * Options available when opening new offcanvas windows with `NgbOffcanvas.open()` method.
 *
 * @since 12.1.0
 */
interface NgbOffcanvasOptions {
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
declare class NgbOffcanvasConfig implements Required<NgbOffcanvasOptions> {
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
    /**
     * @defaultValue `true`
     */
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbOffcanvasConfig>;
}

declare class NgbOffcanvasBackdrop implements OnInit {
    private _nativeElement;
    private _zone;
    private _injector;
    animation: boolean;
    backdropClass: string;
    static: boolean;
    dismissEvent: EventEmitter<any>;
    ngOnInit(): void;
    hide(): Observable<void>;
    dismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasBackdrop, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbOffcanvasBackdrop, "ngb-offcanvas-backdrop", never, { "animation": { "alias": "animation"; "required": false; }; "backdropClass": { "alias": "backdropClass"; "required": false; }; "static": { "alias": "static"; "required": false; }; }, { "dismissEvent": "dismiss"; }, never, never, true, never>;
}

declare class NgbOffcanvasPanel implements OnInit, OnDestroy {
    private _document;
    private _elRef;
    private _zone;
    private _injector;
    private _closed$;
    private _elWithFocus;
    animation: boolean;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    keyboard: boolean;
    panelClass: string;
    position: 'start' | 'end' | 'top' | 'bottom';
    dismissEvent: EventEmitter<any>;
    shown: Subject<void>;
    hidden: Subject<void>;
    dismiss(reason: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    hide(): Observable<any>;
    private _show;
    private _enableEventHandling;
    private _disableEventHandling;
    private _setFocus;
    private _restoreFocus;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasPanel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbOffcanvasPanel, "ngb-offcanvas-panel", never, { "animation": { "alias": "animation"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; "ariaDescribedBy": { "alias": "ariaDescribedBy"; "required": false; }; "keyboard": { "alias": "keyboard"; "required": false; }; "panelClass": { "alias": "panelClass"; "required": false; }; "position": { "alias": "position"; "required": false; }; }, { "dismissEvent": "dismiss"; }, never, ["*"], true, never>;
}

/**
 * A reference to the currently opened (active) offcanvas.
 *
 * Instances of this class can be injected into your component passed as offcanvas content.
 * So you can `.close()` or `.dismiss()` the offcanvas window from your component.
 *
 * @since 12.1.0
 */
declare class NgbActiveOffcanvas {
    /**
     * Closes the offcanvas with an optional `result` value.
     *
     * The `NgbOffcanvasRef.result` promise will be resolved with the provided value.
     */
    close(result?: any): void;
    /**
     * Dismisses the offcanvas with an optional `reason` value.
     *
     * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason?: any): void;
}
/**
 * A reference to the newly opened offcanvas returned by the `NgbOffcanvas.open()` method.
 *
 * @since 12.1.0
 */
declare class NgbOffcanvasRef {
    private _panelCmptRef;
    private _contentRef;
    private _backdropCmptRef?;
    private _beforeDismiss?;
    private _closed;
    private _dismissed;
    private _hidden;
    private _resolve;
    private _reject;
    /**
     * The instance of a component used for the offcanvas content.
     *
     * When a `TemplateRef` is used as the content or when the offcanvas is closed, will return `undefined`.
     */
    get componentInstance(): any;
    /**
     * The promise that is resolved when the offcanvas is closed and rejected when the offcanvas is dismissed.
     */
    result: Promise<any>;
    /**
     * The observable that emits when the offcanvas is closed via the `.close()` method.
     *
     * It will emit the result passed to the `.close()` method.
     */
    get closed(): Observable<any>;
    /**
     * The observable that emits when the offcanvas is dismissed via the `.dismiss()` method.
     *
     * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
     * reasons like backdrop click or ESC key press.
     */
    get dismissed(): Observable<any>;
    /**
     * The observable that emits when both offcanvas window and backdrop are closed and animations were finished.
     * At this point offcanvas and backdrop elements will be removed from the DOM tree.
     *
     * This observable will be completed after emitting.
     */
    get hidden(): Observable<void>;
    /**
     * The observable that emits when offcanvas is fully visible and animation was finished.
     * The offcanvas DOM element is always available synchronously after calling 'offcanvas.open()' service.
     *
     * This observable will be completed after emitting.
     * It will not emit, if offcanvas is closed before open animation is finished.
     */
    get shown(): Observable<void>;
    constructor(_panelCmptRef: ComponentRef<NgbOffcanvasPanel>, _contentRef: ContentRef, _backdropCmptRef?: ComponentRef<NgbOffcanvasBackdrop> | undefined, _beforeDismiss?: (() => boolean | Promise<boolean>) | undefined);
    /**
     * Closes the offcanvas with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    close(result?: any): void;
    private _dismiss;
    /**
     * Dismisses the offcanvas with an optional `reason` value.
     *
     * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason?: any): void;
    private _removeOffcanvasElements;
}

/**
 * A service for opening an offcanvas.
 *
 * Creating an offcanvas is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 *
 * @since 12.1.0
 */
declare class NgbOffcanvas {
    private _injector;
    private _offcanvasStack;
    private _config;
    /**
     * Opens a new offcanvas panel with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveOffcanvas` class. You can then
     * use `NgbActiveOffcanvas` methods to close / dismiss offcanvas from "inside" of your component.
     *
     * Also see the [`NgbOffcanvasOptions`](#/components/offcanvas/api#NgbOffcanvasOptions) for the list of supported
     * options.
     */
    open(content: any, options?: NgbOffcanvasOptions): NgbOffcanvasRef;
    /**
     * Returns an observable that holds the active offcanvas instance.
     */
    get activeInstance(): i0.EventEmitter<NgbOffcanvasRef | undefined>;
    /**
     * Dismisses the currently displayed offcanvas with the supplied reason.
     */
    dismiss(reason?: any): void;
    /**
     * Indicates if there is currently an open offcanvas in the application.
     */
    hasOpenOffcanvas(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvas, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbOffcanvas>;
}

declare enum OffcanvasDismissReasons {
    BACKDROP_CLICK = 0,
    ESC = 1
}

declare class NgbOffcanvasModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbOffcanvasModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbOffcanvasModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbOffcanvasModule>;
}

export { NgbActiveOffcanvas, NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasModule, NgbOffcanvasRef, OffcanvasDismissReasons };
export type { NgbOffcanvasOptions };
