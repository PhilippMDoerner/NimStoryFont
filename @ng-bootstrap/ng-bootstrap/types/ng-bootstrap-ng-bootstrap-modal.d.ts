import * as i0 from '@angular/core';
import { Injector, OnInit, OnDestroy, EventEmitter, ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ContentRef } from './_ngb-ngbootstrap-utilities.d';

/**
 * Options available when opening new modal windows with `NgbModal.open()` method.
 */
interface NgbModalOptions {
    /**
     * If `true`, modal opening and closing will be animated.
     *
     * @since 8.0.0
     */
    animation?: boolean;
    /**
     * `aria-labelledby` attribute value to set on the modal window.
     *
     * @since 2.2.0
     */
    ariaLabelledBy?: string;
    /**
     * `aria-describedby` attribute value to set on the modal window.
     *
     * @since 6.1.0
     */
    ariaDescribedBy?: string;
    /**
     * If `true`, the backdrop element will be created for a given modal.
     *
     * Alternatively, specify `'static'` for a backdrop which doesn't close the modal on click.
     *
     * Default value is `true`.
     */
    backdrop?: boolean | 'static';
    /**
     * Callback right before the modal will be dismissed.
     *
     * If this function returns:
     * * `false`
     * * a promise resolved with `false`
     * * a promise that is rejected
     *
     * then the modal won't be dismissed.
     */
    beforeDismiss?: () => boolean | Promise<boolean>;
    /**
     * If `true`, the modal will be centered vertically.
     *
     * Default value is `false`.
     *
     * @since 1.1.0
     */
    centered?: boolean;
    /**
     * A selector specifying the element all new modal windows should be appended to.
     * Since v5.3.0 it is also possible to pass the reference to an `HTMLElement`.
     *
     * If not specified, will be `body`.
     */
    container?: string | HTMLElement;
    /**
     * If `true` modal will always be displayed in fullscreen mode.
     *
     * For values like `'md'` it means that modal will be displayed in fullscreen mode
     * only if the viewport width is below `'md'`. For custom strings (ex. when passing `'mysize'`)
     * it will add a `'modal-fullscreen-mysize-down'` class.
     *
     * If not specified will be `false`.
     *
     * @since 12.1.0
     */
    fullscreen?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string;
    /**
     * The `Injector` to use for modal content.
     */
    injector?: Injector;
    /**
     * If `true`, the modal will be closed when `Escape` key is pressed
     *
     * Default value is `true`.
     */
    keyboard?: boolean;
    /**
     * `role` attribute value to set on the modal window.
     *
     * Default value is `dialog`.
     *
     * @since 18.0.0
     */
    role?: 'alertdialog' | 'dialog';
    /**
     * Scrollable modal content (false by default).
     *
     * @since 5.0.0
     */
    scrollable?: boolean;
    /**
     * Size of a new modal window.
     */
    size?: 'sm' | 'lg' | 'xl' | string;
    /**
     * A custom class to append to the modal window.
     */
    windowClass?: string;
    /**
     * A custom class to append to the modal dialog.
     *
     * @since 9.1.0
     */
    modalDialogClass?: string;
    /**
     * A custom class to append to the modal backdrop.
     *
     * @since 1.1.0
     */
    backdropClass?: string;
}
/**
 * Options that can be changed on an opened modal with `NgbModalRef.update()` and `NgbActiveModal.update()` methods.
 *
 * @since 14.2.0
 */
type NgbModalUpdatableOptions = Pick<NgbModalOptions, 'ariaLabelledBy' | 'ariaDescribedBy' | 'centered' | 'fullscreen' | 'backdropClass' | 'size' | 'windowClass' | 'modalDialogClass'>;
/**
 * A configuration service for the [`NgbModal`](#/components/modal/api#NgbModal) service.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all modals used in the application.
 *
 * @since 3.1.0
 */
declare class NgbModalConfig implements Required<NgbModalOptions> {
    private _ngbConfig;
    private _animation;
    ariaLabelledBy: string;
    ariaDescribedBy: string;
    backdrop: boolean | 'static';
    beforeDismiss: () => boolean | Promise<boolean>;
    centered: boolean;
    container: string | HTMLElement;
    fullscreen: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string;
    injector: Injector;
    keyboard: boolean;
    role: 'alertdialog' | 'dialog';
    scrollable: boolean;
    size: 'sm' | 'lg' | 'xl' | string;
    windowClass: string;
    modalDialogClass: string;
    backdropClass: string;
    /**
     * @defaultValue `true`
     */
    get animation(): boolean;
    set animation(animation: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbModalConfig>;
}

declare class NgbModalBackdrop implements OnInit {
    private _nativeElement;
    private _zone;
    private _injector;
    private _cdRef;
    animation: boolean;
    backdropClass: string;
    ngOnInit(): void;
    hide(): Observable<void>;
    updateOptions(options: NgbModalUpdatableOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalBackdrop, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbModalBackdrop, "ngb-modal-backdrop", never, { "animation": { "alias": "animation"; "required": false; }; "backdropClass": { "alias": "backdropClass"; "required": false; }; }, {}, never, never, true, never>;
}

declare class NgbModalWindow implements OnInit, OnDestroy {
    private _document;
    private _elRef;
    private _zone;
    private _injector;
    private _cdRef;
    private _closed$;
    private _elWithFocus;
    private _dialogEl;
    animation: boolean;
    ariaLabelledBy: string;
    ariaDescribedBy: string;
    backdrop: boolean | string;
    centered: string;
    fullscreen: string | boolean;
    keyboard: boolean;
    role: string;
    scrollable: string;
    size: string;
    windowClass: string;
    modalDialogClass: string;
    dismissEvent: EventEmitter<any>;
    shown: Subject<void>;
    hidden: Subject<void>;
    get fullscreenClass(): string;
    dismiss(reason: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    hide(): Observable<any>;
    updateOptions(options: NgbModalUpdatableOptions): void;
    private _show;
    private _enableEventHandling;
    private _disableEventHandling;
    private _setFocus;
    private _restoreFocus;
    private _bumpBackdrop;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalWindow, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbModalWindow, "ngb-modal-window", never, { "animation": { "alias": "animation"; "required": false; }; "ariaLabelledBy": { "alias": "ariaLabelledBy"; "required": false; }; "ariaDescribedBy": { "alias": "ariaDescribedBy"; "required": false; }; "backdrop": { "alias": "backdrop"; "required": false; }; "centered": { "alias": "centered"; "required": false; }; "fullscreen": { "alias": "fullscreen"; "required": false; }; "keyboard": { "alias": "keyboard"; "required": false; }; "role": { "alias": "role"; "required": false; }; "scrollable": { "alias": "scrollable"; "required": false; }; "size": { "alias": "size"; "required": false; }; "windowClass": { "alias": "windowClass"; "required": false; }; "modalDialogClass": { "alias": "modalDialogClass"; "required": false; }; }, { "dismissEvent": "dismiss"; }, never, ["*"], true, never>;
}

/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.update()`, `.close()` or `.dismiss()` the modal window from your component.
 */
declare class NgbActiveModal {
    /**
     * Updates options of an opened modal.
     *
     * @since 14.2.0
     */
    update(options: NgbModalUpdatableOptions): void;
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbModalRef.result` promise will be resolved with the provided value.
     */
    close(result?: any): void;
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason?: any): void;
}
/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
declare class NgbModalRef {
    private _windowCmptRef;
    private _contentRef;
    private _backdropCmptRef?;
    private _beforeDismiss?;
    private _closed;
    private _dismissed;
    private _hidden;
    private _resolve;
    private _reject;
    /**
     * Updates options of an opened modal.
     *
     * @since 14.2.0
     */
    update(options: NgbModalUpdatableOptions): void;
    /**
     * The instance of a component used for the modal content.
     *
     * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
     */
    get componentInstance(): any;
    /**
     * The promise that is resolved when the modal is closed and rejected when the modal is dismissed.
     */
    result: Promise<any>;
    /**
     * The observable that emits when the modal is closed via the `.close()` method.
     *
     * It will emit the result passed to the `.close()` method.
     *
     * @since 8.0.0
     */
    get closed(): Observable<any>;
    /**
     * The observable that emits when the modal is dismissed via the `.dismiss()` method.
     *
     * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
     * reasons like backdrop click or ESC key press.
     *
     * @since 8.0.0
     */
    get dismissed(): Observable<any>;
    /**
     * The observable that emits when both modal window and backdrop are closed and animations were finished.
     * At this point modal and backdrop elements will be removed from the DOM tree.
     *
     * This observable will be completed after emitting.
     *
     * @since 8.0.0
     */
    get hidden(): Observable<void>;
    /**
     * The observable that emits when modal is fully visible and animation was finished.
     * Modal DOM element is always available synchronously after calling 'modal.open()' service.
     *
     * This observable will be completed after emitting.
     * It will not emit, if modal is closed before open animation is finished.
     *
     * @since 8.0.0
     */
    get shown(): Observable<void>;
    constructor(_windowCmptRef: ComponentRef<NgbModalWindow>, _contentRef: ContentRef, _backdropCmptRef?: ComponentRef<NgbModalBackdrop> | undefined, _beforeDismiss?: (() => boolean | Promise<boolean>) | undefined);
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    close(result?: any): void;
    private _dismiss;
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason?: any): void;
    private _removeModalElements;
}

/**
 * A service for opening modal windows.
 *
 * Creating a modal is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 */
declare class NgbModal {
    private _injector;
    private _modalStack;
    private _config;
    /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     */
    open(content: any, options?: NgbModalOptions): NgbModalRef;
    /**
     * Returns an observable that holds the active modal instances.
     */
    get activeInstances(): i0.EventEmitter<NgbModalRef[]>;
    /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * @since 3.1.0
     */
    dismissAll(reason?: any): void;
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * @since 3.3.0
     */
    hasOpenModals(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModal, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbModal>;
}

declare enum ModalDismissReasons {
    BACKDROP_CLICK = 0,
    ESC = 1
}

declare class NgbModalModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbModalModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbModalModule, never, never, never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbModalModule>;
}

export { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalConfig, NgbModalModule, NgbModalRef };
export type { NgbModalOptions, NgbModalUpdatableOptions };
