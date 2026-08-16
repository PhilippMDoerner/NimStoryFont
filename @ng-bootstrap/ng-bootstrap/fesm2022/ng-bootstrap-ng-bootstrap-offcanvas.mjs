import * as i0 from '@angular/core';
import { inject, Service, ElementRef, NgZone, Injector, EventEmitter, afterNextRender, Output, Input, ChangeDetectionStrategy, ViewEncapsulation, Component, DOCUMENT, ApplicationRef, createComponent, TemplateRef, NgModule } from '@angular/core';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';
import { takeUntil, filter, finalize } from 'rxjs/operators';
import { Subject, of, zip, fromEvent } from 'rxjs';
import { isPromise, ngbRunTransition, reflow, getFocusableBoundaryElements, ScrollBar, ngbFocusTrap, isDefined, ContentRef, isString } from './_ngb-ngbootstrap-utilities.mjs';

/**
 * A configuration service for the [`NgbOffcanvas`](#/components/offcanvas/api#NgbOffcanvas) service.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all offcanvases used in the application.
 *
 * @since 12.1.0
 */
class NgbOffcanvasConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.backdrop = true;
        this.keyboard = true;
        this.position = 'start';
        this.scroll = false;
    }
    /**
     * @defaultValue `true`
     */
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasConfig, decorators: [{
            type: Service
        }] });

/**
 * A reference to the currently opened (active) offcanvas.
 *
 * Instances of this class can be injected into your component passed as offcanvas content.
 * So you can `.close()` or `.dismiss()` the offcanvas window from your component.
 *
 * @since 12.1.0
 */
class NgbActiveOffcanvas {
    /**
     * Closes the offcanvas with an optional `result` value.
     *
     * The `NgbOffcanvasRef.result` promise will be resolved with the provided value.
     */
    close(result) { }
    /**
     * Dismisses the offcanvas with an optional `reason` value.
     *
     * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) { }
}
/**
 * A reference to the newly opened offcanvas returned by the `NgbOffcanvas.open()` method.
 *
 * @since 12.1.0
 */
class NgbOffcanvasRef {
    /**
     * The instance of a component used for the offcanvas content.
     *
     * When a `TemplateRef` is used as the content or when the offcanvas is closed, will return `undefined`.
     */
    get componentInstance() {
        if (this._contentRef && this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }
    /**
     * The observable that emits when the offcanvas is closed via the `.close()` method.
     *
     * It will emit the result passed to the `.close()` method.
     */
    get closed() {
        return this._closed.asObservable().pipe(takeUntil(this._hidden));
    }
    /**
     * The observable that emits when the offcanvas is dismissed via the `.dismiss()` method.
     *
     * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
     * reasons like backdrop click or ESC key press.
     */
    get dismissed() {
        return this._dismissed.asObservable().pipe(takeUntil(this._hidden));
    }
    /**
     * The observable that emits when both offcanvas window and backdrop are closed and animations were finished.
     * At this point offcanvas and backdrop elements will be removed from the DOM tree.
     *
     * This observable will be completed after emitting.
     */
    get hidden() {
        return this._hidden.asObservable();
    }
    /**
     * The observable that emits when offcanvas is fully visible and animation was finished.
     * The offcanvas DOM element is always available synchronously after calling 'offcanvas.open()' service.
     *
     * This observable will be completed after emitting.
     * It will not emit, if offcanvas is closed before open animation is finished.
     */
    get shown() {
        return this._panelCmptRef.instance.shown.asObservable();
    }
    constructor(_panelCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        this._panelCmptRef = _panelCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        this._closed = new Subject();
        this._dismissed = new Subject();
        this._hidden = new Subject();
        _panelCmptRef.instance.dismissEvent.subscribe((reason) => {
            this.dismiss(reason);
        });
        if (_backdropCmptRef) {
            _backdropCmptRef.instance.dismissEvent.subscribe((reason) => {
                this.dismiss(reason);
            });
        }
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.result.then(null, () => { });
    }
    /**
     * Closes the offcanvas with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    close(result) {
        if (this._panelCmptRef) {
            this._closed.next(result);
            this._resolve(result);
            this._removeOffcanvasElements();
        }
    }
    _dismiss(reason) {
        this._dismissed.next(reason);
        this._reject(reason);
        this._removeOffcanvasElements();
    }
    /**
     * Dismisses the offcanvas with an optional `reason` value.
     *
     * The `NgbOffcanvasRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) {
        if (this._panelCmptRef) {
            if (!this._beforeDismiss) {
                this._dismiss(reason);
            }
            else {
                const dismiss = this._beforeDismiss();
                if (isPromise(dismiss)) {
                    dismiss.then((result) => {
                        if (result !== false) {
                            this._dismiss(reason);
                        }
                    }, () => { });
                }
                else if (dismiss !== false) {
                    this._dismiss(reason);
                }
            }
        }
    }
    _removeOffcanvasElements() {
        const panelTransition$ = this._panelCmptRef.instance.hide();
        const backdropTransition$ = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : of(undefined);
        // hiding panel
        panelTransition$.subscribe(() => {
            const { nativeElement } = this._panelCmptRef.location;
            nativeElement.parentNode.removeChild(nativeElement);
            this._panelCmptRef.destroy();
            this._contentRef?.viewRef?.destroy();
            this._panelCmptRef = null;
            this._contentRef = null;
        });
        // hiding backdrop
        backdropTransition$.subscribe(() => {
            if (this._backdropCmptRef) {
                const { nativeElement } = this._backdropCmptRef.location;
                nativeElement.parentNode.removeChild(nativeElement);
                this._backdropCmptRef.destroy();
                this._backdropCmptRef = null;
            }
        });
        // all done
        zip(panelTransition$, backdropTransition$).subscribe(() => {
            this._hidden.next();
            this._hidden.complete();
        });
    }
}

var OffcanvasDismissReasons;
(function (OffcanvasDismissReasons) {
    OffcanvasDismissReasons[OffcanvasDismissReasons["BACKDROP_CLICK"] = 0] = "BACKDROP_CLICK";
    OffcanvasDismissReasons[OffcanvasDismissReasons["ESC"] = 1] = "ESC";
})(OffcanvasDismissReasons || (OffcanvasDismissReasons = {}));

class NgbOffcanvasBackdrop {
    constructor() {
        this._nativeElement = inject(ElementRef).nativeElement;
        this._zone = inject(NgZone);
        this._injector = inject(Injector);
        this.dismissEvent = new EventEmitter();
    }
    ngOnInit() {
        afterNextRender({
            mixedReadWrite: () => ngbRunTransition(this._zone, this._nativeElement, (element, animation) => {
                if (animation) {
                    reflow(element);
                }
                element.classList.add('show');
            }, { animation: this.animation, runningTransition: 'continue' }),
        }, { injector: this._injector });
    }
    hide() {
        return ngbRunTransition(this._zone, this._nativeElement, ({ classList }) => classList.remove('show'), {
            animation: this.animation,
            runningTransition: 'stop',
        });
    }
    dismiss() {
        if (!this.static) {
            this.dismissEvent.emit(OffcanvasDismissReasons.BACKDROP_CLICK);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasBackdrop, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.1", type: NgbOffcanvasBackdrop, isStandalone: true, selector: "ngb-offcanvas-backdrop", inputs: { animation: "animation", backdropClass: "backdropClass", static: "static" }, outputs: { dismissEvent: "dismiss" }, host: { listeners: { "mousedown": "dismiss()" }, properties: { "class": "\"offcanvas-backdrop\" + (backdropClass ? \" \" + backdropClass : \"\")", "class.show": "!animation", "class.fade": "animation" } }, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.Eager, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasBackdrop, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-offcanvas-backdrop',
                    encapsulation: ViewEncapsulation.None,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.Eager,
                    host: {
                        '[class]': '"offcanvas-backdrop" + (backdropClass ? " " + backdropClass : "")',
                        '[class.show]': '!animation',
                        '[class.fade]': 'animation',
                        '(mousedown)': 'dismiss()',
                    },
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }], static: [{
                type: Input
            }], dismissEvent: [{
                type: Output,
                args: ['dismiss']
            }] } });

class NgbOffcanvasPanel {
    constructor() {
        this._document = inject(DOCUMENT);
        this._elRef = inject((ElementRef));
        this._zone = inject(NgZone);
        this._injector = inject(Injector);
        this._closed$ = new Subject();
        this._elWithFocus = null; // element that is focused prior to offcanvas opening
        this.keyboard = true;
        this.position = 'start';
        this.dismissEvent = new EventEmitter();
        this.shown = new Subject();
        this.hidden = new Subject();
    }
    dismiss(reason) {
        this.dismissEvent.emit(reason);
    }
    ngOnInit() {
        this._elWithFocus = this._document.activeElement;
        afterNextRender({ mixedReadWrite: () => this._show() }, { injector: this._injector });
    }
    ngOnDestroy() {
        this._disableEventHandling();
    }
    hide() {
        const context = { animation: this.animation, runningTransition: 'stop' };
        const offcanvasTransition$ = ngbRunTransition(this._zone, this._elRef.nativeElement, (element) => {
            element.classList.remove('showing');
            element.classList.add('hiding');
            return () => element.classList.remove('show', 'hiding');
        }, context);
        offcanvasTransition$.subscribe(() => {
            this.hidden.next();
            this.hidden.complete();
        });
        this._disableEventHandling();
        this._restoreFocus();
        return offcanvasTransition$;
    }
    _show() {
        const context = { animation: this.animation, runningTransition: 'continue' };
        const offcanvasTransition$ = ngbRunTransition(this._zone, this._elRef.nativeElement, (element, animation) => {
            if (animation) {
                reflow(element);
            }
            element.classList.add('show', 'showing');
            return () => element.classList.remove('showing');
        }, context);
        offcanvasTransition$.subscribe(() => {
            this.shown.next();
            this.shown.complete();
        });
        this._enableEventHandling();
        this._setFocus();
    }
    _enableEventHandling() {
        const { nativeElement } = this._elRef;
        this._zone.runOutsideAngular(() => {
            fromEvent(nativeElement, 'keydown')
                .pipe(takeUntil(this._closed$), filter((e) => e.key === 'Escape'))
                .subscribe((event) => {
                if (this.keyboard) {
                    requestAnimationFrame(() => {
                        if (!event.defaultPrevented) {
                            this._zone.run(() => this.dismiss(OffcanvasDismissReasons.ESC));
                        }
                    });
                }
            });
        });
    }
    _disableEventHandling() {
        this._closed$.next();
    }
    _setFocus() {
        const { nativeElement } = this._elRef;
        if (!nativeElement.contains(document.activeElement)) {
            const autoFocusable = nativeElement.querySelector(`[ngbAutofocus]`);
            const firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
            const elementToFocus = autoFocusable || firstFocusable || nativeElement;
            elementToFocus.focus();
        }
    }
    _restoreFocus() {
        const body = this._document.body;
        const elWithFocus = this._elWithFocus;
        let elementToFocus;
        if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        this._zone.runOutsideAngular(() => {
            setTimeout(() => elementToFocus.focus());
            this._elWithFocus = null;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasPanel, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.1", type: NgbOffcanvasPanel, isStandalone: true, selector: "ngb-offcanvas-panel", inputs: { animation: "animation", ariaLabelledBy: "ariaLabelledBy", ariaDescribedBy: "ariaDescribedBy", keyboard: "keyboard", panelClass: "panelClass", position: "position" }, outputs: { dismissEvent: "dismiss" }, host: { attributes: { "role": "dialog", "tabindex": "-1" }, properties: { "class": "\"offcanvas offcanvas-\" + position  + (panelClass ? \" \" + panelClass : \"\")", "attr.aria-modal": "true", "attr.aria-labelledby": "ariaLabelledBy", "attr.aria-describedby": "ariaDescribedBy" } }, ngImport: i0, template: '<ng-content />', isInline: true, changeDetection: i0.ChangeDetectionStrategy.Eager, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasPanel, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-offcanvas-panel',
                    template: '<ng-content />',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.Eager,
                    host: {
                        '[class]': '"offcanvas offcanvas-" + position  + (panelClass ? " " + panelClass : "")',
                        role: 'dialog',
                        tabindex: '-1',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                        '[attr.aria-describedby]': 'ariaDescribedBy',
                    },
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaDescribedBy: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], panelClass: [{
                type: Input
            }], position: [{
                type: Input
            }], dismissEvent: [{
                type: Output,
                args: ['dismiss']
            }] } });

class NgbOffcanvasStack {
    constructor() {
        this._applicationRef = inject(ApplicationRef);
        this._injector = inject(Injector);
        this._document = inject(DOCUMENT);
        this._scrollBar = inject(ScrollBar);
        this._activePanelCmptHasChanged = new Subject();
        this._scrollBarRestoreFn = null;
        this._backdropAttributes = ['animation', 'backdropClass'];
        this._panelAttributes = ['animation', 'ariaDescribedBy', 'ariaLabelledBy', 'keyboard', 'panelClass', 'position'];
        this._activeInstance = new EventEmitter();
        const ngZone = inject(NgZone);
        // Trap focus on active PanelCmpt
        this._activePanelCmptHasChanged.subscribe(() => {
            if (this._panelCmpt) {
                ngbFocusTrap(ngZone, this._panelCmpt.location.nativeElement, this._activePanelCmptHasChanged);
            }
        });
    }
    _restoreScrollBar() {
        const scrollBarRestoreFn = this._scrollBarRestoreFn;
        if (scrollBarRestoreFn) {
            this._scrollBarRestoreFn = null;
            scrollBarRestoreFn();
        }
    }
    _hideScrollBar() {
        if (!this._scrollBarRestoreFn) {
            this._scrollBarRestoreFn = this._scrollBar.hide();
        }
    }
    open(contentInjector, content, options) {
        const containerEl = options.container instanceof HTMLElement
            ? options.container
            : isDefined(options.container)
                ? this._document.querySelector(options.container)
                : this._document.body;
        if (!containerEl) {
            throw new Error(`The specified offcanvas container "${options.container || 'body'}" was not found in the DOM.`);
        }
        if (!options.scroll) {
            this._hideScrollBar();
        }
        const activeOffcanvas = new NgbActiveOffcanvas();
        const contentRef = this._getContentRef(options.injector || contentInjector, content, activeOffcanvas);
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(containerEl) : undefined;
        let panelCmptRef = this._attachWindowComponent(containerEl, contentRef.nodes);
        let ngbOffcanvasRef = new NgbOffcanvasRef(panelCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerOffcanvasRef(ngbOffcanvasRef);
        this._registerPanelCmpt(panelCmptRef);
        ngbOffcanvasRef.hidden.pipe(finalize(() => this._restoreScrollBar())).subscribe();
        activeOffcanvas.close = (result) => {
            ngbOffcanvasRef.close(result);
        };
        activeOffcanvas.dismiss = (reason) => {
            ngbOffcanvasRef.dismiss(reason);
        };
        this._applyPanelOptions(panelCmptRef.instance, options);
        if (backdropCmptRef && backdropCmptRef.instance) {
            this._applyBackdropOptions(backdropCmptRef.instance, options);
            backdropCmptRef.changeDetectorRef.detectChanges();
        }
        panelCmptRef.changeDetectorRef.detectChanges();
        return ngbOffcanvasRef;
    }
    get activeInstance() {
        return this._activeInstance;
    }
    dismiss(reason) {
        this._offcanvasRef?.dismiss(reason);
    }
    hasOpenOffcanvas() {
        return !!this._offcanvasRef;
    }
    _attachBackdrop(containerEl) {
        let backdropCmptRef = createComponent(NgbOffcanvasBackdrop, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
        });
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    _attachWindowComponent(containerEl, projectableNodes) {
        let panelCmptRef = createComponent(NgbOffcanvasPanel, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
            projectableNodes,
        });
        this._applicationRef.attachView(panelCmptRef.hostView);
        containerEl.appendChild(panelCmptRef.location.nativeElement);
        return panelCmptRef;
    }
    _applyPanelOptions(windowInstance, options) {
        this._panelAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    }
    _applyBackdropOptions(backdropInstance, options) {
        this._backdropAttributes.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        });
        backdropInstance.static = options.backdrop === 'static';
    }
    _getContentRef(contentInjector, content, activeOffcanvas) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeOffcanvas);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(contentInjector, content, activeOffcanvas);
        }
    }
    _createFromTemplateRef(templateRef, activeOffcanvas) {
        const context = {
            $implicit: activeOffcanvas,
            close(result) {
                activeOffcanvas.close(result);
            },
            dismiss(reason) {
                activeOffcanvas.dismiss(reason);
            },
        };
        const viewRef = templateRef.createEmbeddedView(context);
        this._applicationRef.attachView(viewRef);
        return new ContentRef([viewRef.rootNodes], viewRef);
    }
    _createFromString(content) {
        const component = this._document.createTextNode(`${content}`);
        return new ContentRef([[component]]);
    }
    _createFromComponent(contentInjector, componentType, context) {
        const elementInjector = Injector.create({
            providers: [{ provide: NgbActiveOffcanvas, useValue: context }],
            parent: contentInjector,
        });
        const componentRef = createComponent(componentType, {
            environmentInjector: this._applicationRef.injector,
            elementInjector,
        });
        const componentNativeEl = componentRef.location.nativeElement;
        this._applicationRef.attachView(componentRef.hostView);
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    }
    _registerOffcanvasRef(ngbOffcanvasRef) {
        const unregisterOffcanvasRef = () => {
            this._offcanvasRef = undefined;
            this._activeInstance.emit(this._offcanvasRef);
        };
        this._offcanvasRef = ngbOffcanvasRef;
        this._activeInstance.emit(this._offcanvasRef);
        ngbOffcanvasRef.result.then(unregisterOffcanvasRef, unregisterOffcanvasRef);
    }
    _registerPanelCmpt(ngbPanelCmpt) {
        this._panelCmpt = ngbPanelCmpt;
        this._activePanelCmptHasChanged.next();
        ngbPanelCmpt.onDestroy(() => {
            this._panelCmpt = undefined;
            this._activePanelCmptHasChanged.next();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasStack, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasStack }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasStack, decorators: [{
            type: Service
        }], ctorParameters: () => [] });

/**
 * A service for opening an offcanvas.
 *
 * Creating an offcanvas is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 *
 * @since 12.1.0
 */
class NgbOffcanvas {
    constructor() {
        this._injector = inject(Injector);
        this._offcanvasStack = inject(NgbOffcanvasStack);
        this._config = inject(NgbOffcanvasConfig);
    }
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
    open(content, options = {}) {
        const combinedOptions = { ...this._config, animation: this._config.animation, ...options };
        return this._offcanvasStack.open(this._injector, content, combinedOptions);
    }
    /**
     * Returns an observable that holds the active offcanvas instance.
     */
    get activeInstance() {
        return this._offcanvasStack.activeInstance;
    }
    /**
     * Dismisses the currently displayed offcanvas with the supplied reason.
     */
    dismiss(reason) {
        this._offcanvasStack.dismiss(reason);
    }
    /**
     * Indicates if there is currently an open offcanvas in the application.
     */
    hasOpenOffcanvas() {
        return this._offcanvasStack.hasOpenOffcanvas();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvas, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvas }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvas, decorators: [{
            type: Service
        }] });

class NgbOffcanvasModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbOffcanvasModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbActiveOffcanvas, NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasModule, NgbOffcanvasRef, OffcanvasDismissReasons };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-offcanvas.mjs.map
