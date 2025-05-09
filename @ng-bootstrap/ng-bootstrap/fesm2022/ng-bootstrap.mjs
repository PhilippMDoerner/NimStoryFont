import * as i0 from '@angular/core';
import { Injectable, inject, ElementRef, NgZone, EventEmitter, Directive, Input, Output, TemplateRef, ViewContainerRef, Component, ViewChild, ContentChild, ChangeDetectorRef, DestroyRef, ContentChildren, NgModule, ChangeDetectionStrategy, ViewEncapsulation, PLATFORM_ID, Injector, afterNextRender, LOCALE_ID, forwardRef, afterRender, ApplicationRef, EnvironmentInjector, createComponent, Attribute, ViewChildren, InjectionToken } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, EMPTY, of, Subject, fromEvent, timer, race, BehaviorSubject, combineLatest, NEVER, zip, merge } from 'rxjs';
import { endWith, takeUntil, filter, map, startWith, distinctUntilChanged, switchMap, take, tap, withLatestFrom, delay, mergeMap, skip, finalize } from 'rxjs/operators';
import { isPlatformBrowser, NgTemplateOutlet, formatDate, DOCUMENT, PercentPipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { flip, preventOverflow, arrow, createPopperLite, offset } from '@popperjs/core';

const environment = {
    animation: true,
    transitionTimerDelayMs: 5,
};

/**
 * Global ng-bootstrap config
 *
 * @since 8.0.0
 */
class NgbConfig {
    constructor() {
        this.animation = environment.animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * A configuration service for the [`NgbAccordionDirective`](#/components/accordion/api#NgbAccordionDirective).
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all accordions used in the application.
 */
class NgbAccordionConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.closeOthers = false;
        this.destroyOnHide = true;
    }
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

function getTransitionDurationMs(element) {
    const { transitionDelay, transitionDuration } = window.getComputedStyle(element);
    const transitionDelaySec = parseFloat(transitionDelay);
    const transitionDurationSec = parseFloat(transitionDuration);
    return (transitionDelaySec + transitionDurationSec) * 1000;
}

function toInteger(value) {
    return parseInt(`${value}`, 10);
}
function toString(value) {
    return value !== undefined && value !== null ? `${value}` : '';
}
function getValueInRange(value, max, min = 0) {
    return Math.max(Math.min(value, max), min);
}
function isString(value) {
    return typeof value === 'string';
}
function isNumber(value) {
    return !isNaN(toInteger(value));
}
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
function isDefined(value) {
    return value !== undefined && value !== null;
}
function isPromise(v) {
    return v && v.then;
}
function padNumber(value) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    }
    else {
        return '';
    }
}
function regExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
function closest(element, selector) {
    if (!selector) {
        return null;
    }
    /*
     * In certain browsers (e.g. Edge 44.18362.449.0) HTMLDocument does
     * not support `Element.prototype.closest`. To emulate the correct behaviour
     * we return null when the method is missing.
     *
     * Note that in evergreen browsers `closest(document.documentElement, 'html')`
     * will return the document element whilst in Edge null will be returned. This
     * compromise was deemed good enough.
     */
    if (typeof element.closest === 'undefined') {
        return null;
    }
    return element.closest(selector);
}
/**
 * Force a browser reflow
 * @param element element where to apply the reflow
 */
function reflow(element) {
    return (element || document.body).getBoundingClientRect();
}
/**
 * Creates an observable where all callbacks are executed inside a given zone
 *
 * @param zone
 */
function runInZone(zone) {
    return (source) => {
        return new Observable((observer) => {
            const next = (value) => zone.run(() => observer.next(value));
            const error = (e) => zone.run(() => observer.error(e));
            const complete = () => zone.run(() => observer.complete());
            return source.subscribe({ next, error, complete });
        });
    };
}
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
/**
 * Returns the active element in the given root.
 * If the active element is inside a shadow root, it is searched recursively.
 */
function getActiveElement(root = document) {
    const activeEl = root?.activeElement;
    if (!activeEl) {
        return null;
    }
    return activeEl.shadowRoot ? getActiveElement(activeEl.shadowRoot) : activeEl;
}

const noopFn = () => { };
const { transitionTimerDelayMs } = environment;
const runningTransitions = new Map();
const ngbRunTransition = (zone, element, startFn, options) => {
    // Getting initial context from options
    let context = options.context || {};
    // Checking if there are already running transitions on the given element.
    const running = runningTransitions.get(element);
    if (running) {
        switch (options.runningTransition) {
            // If there is one running and we want for it to 'continue' to run, we have to cancel the new one.
            // We're not emitting any values, but simply completing the observable (EMPTY).
            case 'continue':
                return EMPTY;
            // If there is one running and we want for it to 'stop', we have to complete the running one.
            // We're simply completing the running one and not emitting any values and merging newly provided context
            // with the one coming from currently running transition.
            case 'stop':
                zone.run(() => running.transition$.complete());
                context = Object.assign(running.context, context);
                runningTransitions.delete(element);
        }
    }
    // Running the start function
    const endFn = startFn(element, options.animation, context) || noopFn;
    // If 'prefer-reduced-motion' is enabled, the 'transition' will be set to 'none'.
    // If animations are disabled, we have to emit a value and complete the observable
    // In this case we have to call the end function, but can finish immediately by emitting a value,
    // completing the observable and executing end functions synchronously.
    if (!options.animation || window.getComputedStyle(element).transitionProperty === 'none') {
        zone.run(() => endFn());
        return of(undefined).pipe(runInZone(zone));
    }
    // Starting a new transition
    const transition$ = new Subject();
    const finishTransition$ = new Subject();
    const stop$ = transition$.pipe(endWith(true));
    runningTransitions.set(element, {
        transition$,
        complete: () => {
            finishTransition$.next();
            finishTransition$.complete();
        },
        context,
    });
    const transitionDurationMs = getTransitionDurationMs(element);
    // 1. We have to both listen for the 'transitionend' event and have a 'just-in-case' timer,
    // because 'transitionend' event might not be fired in some browsers, if the transitioning
    // element becomes invisible (ex. when scrolling, making browser tab inactive, etc.). The timer
    // guarantees, that we'll release the DOM element and complete 'ngbRunTransition'.
    // 2. We need to filter transition end events, because they might bubble from shorter transitions
    // on inner DOM elements. We're only interested in the transition on the 'element' itself.
    zone.runOutsideAngular(() => {
        const transitionEnd$ = fromEvent(element, 'transitionend').pipe(takeUntil(stop$), filter(({ target }) => target === element));
        const timer$ = timer(transitionDurationMs + transitionTimerDelayMs).pipe(takeUntil(stop$));
        race(timer$, transitionEnd$, finishTransition$)
            .pipe(takeUntil(stop$))
            .subscribe(() => {
            runningTransitions.delete(element);
            zone.run(() => {
                endFn();
                transition$.next();
                transition$.complete();
            });
        });
    });
    return transition$.asObservable();
};
const ngbCompleteTransition = (element) => {
    runningTransitions.get(element)?.complete();
};

function measureCollapsingElementDimensionPx(element, dimension) {
    // SSR fix for without injecting the PlatformId
    if (typeof navigator === 'undefined') {
        return '0px';
    }
    const { classList } = element;
    const hasShownClass = classList.contains('show');
    if (!hasShownClass) {
        classList.add('show');
    }
    element.style[dimension] = '';
    const dimensionSize = element.getBoundingClientRect()[dimension] + 'px';
    if (!hasShownClass) {
        classList.remove('show');
    }
    return dimensionSize;
}
const ngbCollapsingTransition = (element, animation, context) => {
    let { direction, maxSize, dimension } = context;
    const { classList } = element;
    function setInitialClasses() {
        classList.add('collapse');
        if (direction === 'show') {
            classList.add('show');
        }
        else {
            classList.remove('show');
        }
    }
    // without animations we just need to set initial classes
    if (!animation) {
        setInitialClasses();
        return;
    }
    // No maxHeight -> running the transition for the first time
    if (!maxSize) {
        maxSize = measureCollapsingElementDimensionPx(element, dimension);
        context.maxSize = maxSize;
        // Fix the height before starting the animation
        element.style[dimension] = direction !== 'show' ? maxSize : '0px';
        classList.remove('collapse', 'collapsing', 'show');
        reflow(element);
        // Start the animation
        classList.add('collapsing');
    }
    // Start or revert the animation
    element.style[dimension] = direction === 'show' ? maxSize : '0px';
    return () => {
        setInitialClasses();
        classList.remove('collapsing');
        element.style[dimension] = '';
    };
};

/**
 * A configuration service for the [NgbCollapse](#/components/collapse/api#NgbCollapse) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all collapses used in the application.
 */
class NgbCollapseConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.horizontal = false;
    }
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCollapseConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCollapseConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCollapseConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * A directive to provide a simple way of hiding and showing elements on the
 * page.
 */
class NgbCollapse {
    constructor() {
        this._config = inject(NgbCollapseConfig);
        this._element = inject(ElementRef);
        this._zone = inject(NgZone);
        /**
         * If `true`, collapse will be animated.
         *
         * Animation is triggered only when clicked on triggering element
         * or via the `.toggle()` function
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * Flag used to track if the collapse setter is invoked during initialization
         * or not. This distinction is made in order to avoid running the transition during initialization.
         */
        this._afterInit = false;
        this._isCollapsed = false;
        this.ngbCollapseChange = new EventEmitter();
        /**
         * If `true`, will collapse horizontally.
         *
         * @since 13.1.0
         */
        this.horizontal = this._config.horizontal;
        /**
         * An event emitted when the collapse element is shown, after the transition.
         * It has no payload.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the collapse element is hidden, after the transition.
         * It has no payload.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
    }
    /**
     * If `true`, will collapse the element or show it otherwise.
     */
    set collapsed(isCollapsed) {
        if (this._isCollapsed !== isCollapsed) {
            this._isCollapsed = isCollapsed;
            if (this._afterInit) {
                this._runTransitionWithEvents(isCollapsed, this.animation);
            }
        }
    }
    ngOnInit() {
        this._runTransition(this._isCollapsed, false);
        this._afterInit = true;
    }
    /**
     * Triggers collapsing programmatically.
     *
     * If there is a collapsing transition running already, it will be reversed.
     * If the animations are turned off this happens synchronously.
     *
     * @since 8.0.0
     */
    toggle(open = this._isCollapsed) {
        this.collapsed = !open;
        this.ngbCollapseChange.next(this._isCollapsed);
    }
    _runTransition(collapsed, animation) {
        return ngbRunTransition(this._zone, this._element.nativeElement, ngbCollapsingTransition, {
            animation,
            runningTransition: 'stop',
            context: { direction: collapsed ? 'hide' : 'show', dimension: this.horizontal ? 'width' : 'height' },
        });
    }
    _runTransitionWithEvents(collapsed, animation) {
        this._runTransition(collapsed, animation).subscribe(() => {
            if (collapsed) {
                this.hidden.emit();
            }
            else {
                this.shown.emit();
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCollapse, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbCollapse, isStandalone: true, selector: "[ngbCollapse]", inputs: { animation: "animation", collapsed: ["ngbCollapse", "collapsed"], horizontal: "horizontal" }, outputs: { ngbCollapseChange: "ngbCollapseChange", shown: "shown", hidden: "hidden" }, host: { properties: { "class.collapse-horizontal": "horizontal" } }, exportAs: ["ngbCollapse"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCollapse, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbCollapse]',
                    exportAs: 'ngbCollapse',
                    standalone: true,
                    host: {
                        '[class.collapse-horizontal]': 'horizontal',
                    },
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], collapsed: [{
                type: Input,
                args: ['ngbCollapse']
            }], ngbCollapseChange: [{
                type: Output
            }], horizontal: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });

let nextId$3 = 0;
/**
 * A directive that wraps the content of an accordion item's collapsible body.
 *
 * The actual content is provided in a child `ng-template` element.
 * Depending on the state of the accordion, the template will be either inserted or removed from the DOM.
 *
 * @since 14.1.0
 */
class NgbAccordionBody {
    constructor() {
        this._item = inject(NgbAccordionItem);
        this._viewRef = null;
        /**
         * the `ElementRef` of the component
         *
         * @since 18.0.0
         */
        this.elementRef = inject(ElementRef);
    }
    ngAfterContentChecked() {
        if (this._bodyTpl) {
            if (this._item._shouldBeInDOM) {
                this._createViewIfNotExists();
            }
            else {
                this._destroyViewIfExists();
            }
        }
    }
    ngOnDestroy() {
        this._destroyViewIfExists();
    }
    _destroyViewIfExists() {
        this._viewRef?.destroy();
        this._viewRef = null;
    }
    _createViewIfNotExists() {
        if (!this._viewRef) {
            this._viewRef = this._vcr.createEmbeddedView(this._bodyTpl);
            this._viewRef.detectChanges();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionBody, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.0.3", type: NgbAccordionBody, isStandalone: true, selector: "[ngbAccordionBody]", host: { classAttribute: "accordion-body" }, queries: [{ propertyName: "_bodyTpl", first: true, predicate: TemplateRef, descendants: true, static: true }], viewQueries: [{ propertyName: "_vcr", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
		<ng-container #container />
		<ng-content />
	`, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionBody, decorators: [{
            type: Component,
            args: [{
                    selector: '[ngbAccordionBody]',
                    standalone: true,
                    template: `
		<ng-container #container />
		<ng-content />
	`,
                    host: {
                        class: 'accordion-body',
                    },
                }]
        }], propDecorators: { _vcr: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], _bodyTpl: [{
                type: ContentChild,
                args: [TemplateRef, { static: true }]
            }] } });
/**
 * A directive that wraps the collapsible item's content of the accordion.
 *
 * Internally it reuses the [`NgbCollapse` directive](#/components/collapse)
 *
 * @since 14.1.0
 */
class NgbAccordionCollapse {
    constructor() {
        this.item = inject(NgbAccordionItem);
        this.ngbCollapse = inject(NgbCollapse);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionCollapse, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbAccordionCollapse, isStandalone: true, selector: "[ngbAccordionCollapse]", host: { attributes: { "role": "region" }, properties: { "id": "item.collapseId", "attr.aria-labelledby": "item.toggleId" }, classAttribute: "accordion-collapse" }, exportAs: ["ngbAccordionCollapse"], hostDirectives: [{ directive: NgbCollapse }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionCollapse, decorators: [{
            type: Directive,
            args: [{
                    exportAs: 'ngbAccordionCollapse',
                    standalone: true,
                    selector: '[ngbAccordionCollapse]',
                    host: {
                        role: 'region',
                        class: 'accordion-collapse',
                        '[id]': 'item.collapseId',
                        '[attr.aria-labelledby]': 'item.toggleId',
                    },
                    hostDirectives: [NgbCollapse],
                }]
        }] });
/**
 * A directive to put on a toggling element inside the accordion item's header.
 * It will register click handlers that toggle the associated panel and will handle accessibility attributes.
 *
 * This directive is used internally by the [`NgbAccordionButton` directive](#/components/accordion/api#NgbAccordionButton).
 *
 * @since 14.1.0
 */
class NgbAccordionToggle {
    constructor() {
        this.item = inject(NgbAccordionItem);
        this.accordion = inject(NgbAccordionDirective);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionToggle, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbAccordionToggle, isStandalone: true, selector: "[ngbAccordionToggle]", host: { listeners: { "click": "!item.disabled && accordion.toggle(item.id)" }, properties: { "id": "item.toggleId", "class.collapsed": "item.collapsed", "attr.aria-controls": "item.collapseId", "attr.aria-expanded": "!item.collapsed" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionToggle]',
                    standalone: true,
                    host: {
                        '[id]': 'item.toggleId',
                        '[class.collapsed]': 'item.collapsed',
                        '[attr.aria-controls]': 'item.collapseId',
                        '[attr.aria-expanded]': '!item.collapsed',
                        '(click)': '!item.disabled && accordion.toggle(item.id)',
                    },
                }]
        }] });
/**
 * A directive to put on a button element inside an accordion item's header.
 *
 * If you want a custom markup for the header, you can also use the [`NgbAccordionToggle` directive](#/components/accordion/api#NgbAccordionToggle).
 *
 * @since 14.1.0
 */
class NgbAccordionButton {
    constructor() {
        this.item = inject(NgbAccordionItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionButton, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbAccordionButton, isStandalone: true, selector: "button[ngbAccordionButton]", host: { attributes: { "type": "button" }, properties: { "disabled": "item.disabled" }, classAttribute: "accordion-button" }, hostDirectives: [{ directive: NgbAccordionToggle }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionButton, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbAccordionButton]',
                    standalone: true,
                    host: {
                        '[disabled]': 'item.disabled',
                        class: 'accordion-button',
                        type: 'button',
                    },
                    hostDirectives: [NgbAccordionToggle],
                }]
        }] });
/**
 * A directive that wraps an accordion item's header.
 *
 * @since 14.1.0
 */
class NgbAccordionHeader {
    constructor() {
        this.item = inject(NgbAccordionItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbAccordionHeader, isStandalone: true, selector: "[ngbAccordionHeader]", host: { attributes: { "role": "heading" }, properties: { "class.collapsed": "item.collapsed" }, classAttribute: "accordion-header" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionHeader]',
                    standalone: true,
                    host: {
                        role: 'heading',
                        class: 'accordion-header',
                        '[class.collapsed]': 'item.collapsed',
                    },
                }]
        }] });
/**
 * A directive that wraps an accordion item: a toggleable header + body that collapses.
 *
 * You can get hold of the `NgbAccordionItem` instance in the template with `#item="ngbAccordionItem"`.
 * It allows to check if the item is collapsed or not, toggle the collapse state, etc.
 *
 * Every accordion item has a string ID that is automatically generated in the `ngb-accordion-item-XX` format, unless provided explicitly.
 *
 * @since 14.1.0
 */
class NgbAccordionItem {
    constructor() {
        this._accordion = inject(NgbAccordionDirective);
        this._cd = inject(ChangeDetectorRef);
        this._destroyRef = inject(DestroyRef);
        this._collapsed = true;
        this._id = `ngb-accordion-item-${nextId$3++}`;
        this._collapseAnimationRunning = false;
        /**
         * If `true`, the accordion item will be disabled.
         * It won't react to user's clicks, but still will be toggelable programmatically.
         */
        this.disabled = false;
        /**
         * Event emitted before the expanding animation starts. It has no payload.
         *
         * @since 15.1.0
         */
        this.show = new EventEmitter();
        /**
         * Event emitted when the expanding animation is finished. It has no payload.
         */
        this.shown = new EventEmitter();
        /**
         * Event emitted before the collapsing animation starts. It has no payload.
         *
         * @since 15.1.0
         */
        this.hide = new EventEmitter();
        /**
         * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
         * It has no payload.
         */
        this.hidden = new EventEmitter();
    }
    /**
     * Sets the custom ID of the accordion item. It must be unique for the document.
     *
     * @param id The ID of the accordion item, must be a non-empty string
     */
    set id(id) {
        if (isString(id) && id !== '') {
            this._id = id;
        }
    }
    /**
     * If `true`, the content of the accordion item's body will be removed from the DOM. It will be just hidden otherwise.
     *
     * This property can also be set up on the parent [`NgbAccordion` directive](#/components/accordion/api#NgbAccordionDirective).
     */
    set destroyOnHide(destroyOnHide) {
        this._destroyOnHide = destroyOnHide;
    }
    get destroyOnHide() {
        return this._destroyOnHide === undefined ? this._accordion.destroyOnHide : this._destroyOnHide;
    }
    /**
     *	If `true`, the accordion item will be collapsed. Otherwise, it will be expanded.
     *
     * @param collapsed New state of the accordion item.
     */
    set collapsed(collapsed) {
        if (collapsed) {
            this.collapse();
        }
        else {
            this.expand();
        }
    }
    get collapsed() {
        return this._collapsed;
    }
    get id() {
        return `${this._id}`;
    }
    get toggleId() {
        return `${this.id}-toggle`;
    }
    get collapseId() {
        return `${this.id}-collapse`;
    }
    get _shouldBeInDOM() {
        return !this.collapsed || this._collapseAnimationRunning || !this.destroyOnHide;
    }
    ngAfterContentInit() {
        const { ngbCollapse } = this._collapse;
        // we need to disable the animation for the first init
        ngbCollapse.animation = false;
        ngbCollapse.collapsed = this.collapsed;
        // we set the animation to the default of the accordion
        ngbCollapse.animation = this._accordion.animation;
        // event forwarding from 'ngbCollapse' to 'ngbAccordion'
        ngbCollapse.hidden.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            // when the animation finishes we can remove the template from DOM
            this._collapseAnimationRunning = false;
            this.hidden.emit();
            this._accordion.hidden.emit(this.id);
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
        });
        ngbCollapse.shown.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.shown.emit();
            this._accordion.shown.emit(this.id);
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
        });
    }
    /**
     * Toggles an accordion item.
     */
    toggle() {
        this.collapsed = !this.collapsed;
    }
    /**
     * Expands an accordion item.
     */
    expand() {
        if (this.collapsed) {
            // checking if accordion allows to expand the panel in respect to 'closeOthers' flag
            if (!this._accordion._ensureCanExpand(this)) {
                return;
            }
            this._collapsed = false;
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
            // we need force CD to get template into DOM before starting animation to calculate its height correctly
            // this will synchronously put the item body into DOM, because `this._collapsed` was flipped to `false`
            this._cd.detectChanges();
            // firing events before starting animations
            this.show.emit();
            this._accordion.show.emit(this.id);
            // we also need to make sure 'animation' flag is up-to- date
            this._collapse.ngbCollapse.animation = this._accordion.animation;
            this._collapse.ngbCollapse.collapsed = false;
        }
    }
    /**
     * Collapses an accordion item.
     */
    collapse() {
        if (!this.collapsed) {
            this._collapsed = true;
            this._collapseAnimationRunning = true;
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
            // firing events before starting animations
            this.hide.emit();
            this._accordion.hide.emit(this.id);
            // we also need to make sure 'animation' flag is up-to- date
            this._collapse.ngbCollapse.animation = this._accordion.animation;
            this._collapse.ngbCollapse.collapsed = true;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbAccordionItem, isStandalone: true, selector: "[ngbAccordionItem]", inputs: { id: ["ngbAccordionItem", "id"], destroyOnHide: "destroyOnHide", disabled: "disabled", collapsed: "collapsed" }, outputs: { show: "show", shown: "shown", hide: "hide", hidden: "hidden" }, host: { properties: { "id": "id" }, classAttribute: "accordion-item" }, queries: [{ propertyName: "_collapse", first: true, predicate: NgbAccordionCollapse, descendants: true, static: true }], exportAs: ["ngbAccordionItem"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionItem]',
                    exportAs: 'ngbAccordionItem',
                    standalone: true,
                    host: {
                        '[id]': 'id',
                        class: 'accordion-item',
                    },
                }]
        }], propDecorators: { _collapse: [{
                type: ContentChild,
                args: [NgbAccordionCollapse, { static: true }]
            }], id: [{
                type: Input,
                args: ['ngbAccordionItem']
            }], destroyOnHide: [{
                type: Input
            }], disabled: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], show: [{
                type: Output
            }], shown: [{
                type: Output
            }], hide: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
/**
 * Accordion is a stack of cards that have a header and collapsible body.
 *
 * This directive is a container for these items and provides an API to handle them.
 *
 * @since 14.1.0
 */
class NgbAccordionDirective {
    constructor() {
        this._config = inject(NgbAccordionConfig);
        this._anItemWasAlreadyExpandedDuringInitialisation = false;
        /**
         * If `true`, accordion will be animated.
         */
        this.animation = this._config.animation;
        /**
         * If `true`, only one item at the time can stay open.
         */
        this.closeOthers = this._config.closeOthers;
        /**
         * If `true`, the content of the accordion items body will be removed from the DOM. It will be just hidden otherwise.
         *
         * This property can be overwritten at the [`NgbAccordionItem`](#/components/accordion/api#NgbAccordionItem) level
         */
        this.destroyOnHide = this._config.destroyOnHide;
        /**
         * Event emitted before expanding animation starts. The payload is the id of shown accordion item.
         *
         * @since 15.1.0
         */
        this.show = new EventEmitter();
        /**
         * Event emitted when the expanding animation is finished. The payload is the id of shown accordion item.
         */
        this.shown = new EventEmitter();
        /**
         * Event emitted before the collapsing animation starts. The payload is the id of hidden accordion item.
         *
         * @since 15.1.0
         */
        this.hide = new EventEmitter();
        /**
         * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
         * The payload is the id of hidden accordion item.
         */
        this.hidden = new EventEmitter();
    }
    /**
     * Toggles an item with the given id.
     *
     * It will toggle an item, even if it is disabled.
     *
     * @param itemId The id of the item to toggle.
     */
    toggle(itemId) {
        this._getItem(itemId)?.toggle();
    }
    /**
     * Expands an item with the given id.
     *
     * If `closeOthers` is `true`, it will collapse other panels.
     *
     * @param itemId The id of the item to expand.
     */
    expand(itemId) {
        this._getItem(itemId)?.expand();
    }
    /**
     * Expands all items.
     *
     * If `closeOthers` is `true` and all items are closed, it will open the first one. Otherwise, it will keep the opened one.
     */
    expandAll() {
        if (this._items) {
            if (this.closeOthers) {
                // we check if there is an item open and if it is not we can expand the first item
                // (otherwise we toggle nothing)
                if (!this._items.find((item) => !item.collapsed)) {
                    this._items.first.expand();
                }
            }
            else {
                this._items.forEach((item) => item.expand());
            }
        }
    }
    /**
     * Collapses an item with the given id.
     *
     * Has no effect if the `itemId` does not correspond to any item.
     *
     * @param itemId The id of the item to collapse.
     */
    collapse(itemId) {
        this._getItem(itemId)?.collapse();
    }
    /**
     * Collapses all items.
     */
    collapseAll() {
        this._items?.forEach((item) => item.collapse());
    }
    /**
     * Checks if an item with the given id is expanded.
     *
     * If the `itemId` does not correspond to any item, it returns `false`.
     *
     * @param itemId The id of the item to check.
     */
    isExpanded(itemId) {
        const item = this._getItem(itemId);
        return item ? !item.collapsed : false;
    }
    /**
     * It checks, if the item can be expanded in the current state of the accordion.
     * With `closeOthers` there can be only one expanded item at a time.
     *
     * @internal
     */
    _ensureCanExpand(toExpand) {
        if (!this.closeOthers) {
            return true;
        }
        // special case during the initialization of the [collapse]="false" inputs
        // `this._items` QueryList is not yet initialized, but we need to ensure only one item can be expanded at a time
        if (!this._items) {
            if (!this._anItemWasAlreadyExpandedDuringInitialisation) {
                this._anItemWasAlreadyExpandedDuringInitialisation = true;
                return true;
            }
            return false;
        }
        // if there is an expanded item, we need to collapse it first
        this._items.find((item) => !item.collapsed && toExpand !== item)?.collapse();
        return true;
    }
    _getItem(itemId) {
        return this._items?.find((item) => item.id === itemId);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbAccordionDirective, isStandalone: true, selector: "[ngbAccordion]", inputs: { animation: "animation", closeOthers: "closeOthers", destroyOnHide: "destroyOnHide" }, outputs: { show: "show", shown: "shown", hide: "hide", hidden: "hidden" }, host: { classAttribute: "accordion" }, queries: [{ propertyName: "_items", predicate: NgbAccordionItem }], exportAs: ["ngbAccordion"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordion]',
                    standalone: true,
                    exportAs: 'ngbAccordion',
                    host: {
                        class: 'accordion',
                    },
                }]
        }], propDecorators: { _items: [{
                type: ContentChildren,
                args: [NgbAccordionItem, { descendants: false }]
            }], animation: [{
                type: Input
            }], closeOthers: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], show: [{
                type: Output
            }], shown: [{
                type: Output
            }], hide: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });

const NGB_ACCORDION_DIRECTIVES = [
    NgbAccordionButton,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionToggle,
    NgbAccordionBody,
    NgbAccordionCollapse,
];
class NgbAccordionModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionModule, imports: [NgbAccordionButton,
            NgbAccordionDirective,
            NgbAccordionItem,
            NgbAccordionHeader,
            NgbAccordionToggle,
            NgbAccordionBody,
            NgbAccordionCollapse], exports: [NgbAccordionButton,
            NgbAccordionDirective,
            NgbAccordionItem,
            NgbAccordionHeader,
            NgbAccordionToggle,
            NgbAccordionBody,
            NgbAccordionCollapse] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_ACCORDION_DIRECTIVES,
                    exports: NGB_ACCORDION_DIRECTIVES,
                }]
        }] });

/**
 * A configuration service for the [NgbAlert](#/components/alert/api#NgbAlert) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all alerts used in the application.
 */
class NgbAlertConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.dismissible = true;
        this.type = 'warning';
    }
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAlertConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAlertConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAlertConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const ngbAlertFadingTransition = ({ classList }) => {
    classList.remove('show');
};

/**
 * Alert is a component to provide contextual feedback messages for user.
 *
 * It supports several alert types and can be dismissed.
 */
class NgbAlert {
    constructor() {
        this._config = inject(NgbAlertConfig);
        this._elementRef = inject((ElementRef));
        this._zone = inject(NgZone);
        /**
         * If `true`, alert closing will be animated.
         *
         * Animation is triggered only when clicked on the close button (×)
         * or via the `.close()` function
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * If `true`, alert can be dismissed by the user.
         *
         * The close button (×) will be displayed and you can be notified
         * of the event with the `(closed)` output.
         */
        this.dismissible = this._config.dismissible;
        /**
         * Type of the alert.
         *
         * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
         * `'secondary'`, `'light'` and `'dark'`.
         */
        this.type = this._config.type;
        /**
         * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
         *
         * @since 8.0.0
         */
        this.closed = new EventEmitter();
    }
    /**
     * Triggers alert closing programmatically (same as clicking on the close button (×)).
     *
     * The returned observable will emit and be completed once the closing transition has finished.
     * If the animations are turned off this happens synchronously.
     *
     * Alternatively you could listen or subscribe to the `(closed)` output
     *
     * @since 8.0.0
     */
    close() {
        const transition = ngbRunTransition(this._zone, this._elementRef.nativeElement, ngbAlertFadingTransition, {
            animation: this.animation,
            runningTransition: 'continue',
        });
        transition.subscribe(() => this.closed.emit());
        return transition;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAlert, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbAlert, isStandalone: true, selector: "ngb-alert", inputs: { animation: "animation", dismissible: "dismissible", type: "type" }, outputs: { closed: "closed" }, host: { attributes: { "role": "alert" }, properties: { "class": "\"alert show\" + (type ? \" alert-\" + type : \"\")", "class.fade": "animation", "class.alert-dismissible": "dismissible" } }, exportAs: ["ngbAlert"], ngImport: i0, template: `
		<ng-content />
		@if (dismissible) {
			<button
				type="button"
				class="btn-close"
				aria-label="Close"
				i18n-aria-label="@@ngb.alert.close"
				(click)="close()"
			></button>
		}
	`, isInline: true, styles: ["ngb-alert{display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAlert, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-alert', exportAs: 'ngbAlert', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        role: 'alert',
                        '[class]': '"alert show" + (type ? " alert-" + type : "")',
                        '[class.fade]': 'animation',
                        '[class.alert-dismissible]': 'dismissible',
                    }, template: `
		<ng-content />
		@if (dismissible) {
			<button
				type="button"
				class="btn-close"
				aria-label="Close"
				i18n-aria-label="@@ngb.alert.close"
				(click)="close()"
			></button>
		}
	`, styles: ["ngb-alert{display:block}\n"] }]
        }], propDecorators: { animation: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], type: [{
                type: Input
            }], closed: [{
                type: Output
            }] } });

class NgbAlertModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAlertModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbAlertModule, imports: [NgbAlert], exports: [NgbAlert] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAlertModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbAlertModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbAlert],
                    exports: [NgbAlert],
                }]
        }] });

/**
 * A configuration service for the [NgbCarousel](#/components/carousel/api#NgbCarousel) component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all carousels used in the application.
 */
class NgbCarouselConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.interval = 5000;
        this.wrap = true;
        this.keyboard = true;
        this.pauseOnHover = true;
        this.pauseOnFocus = true;
        this.showNavigationArrows = true;
        this.showNavigationIndicators = true;
    }
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCarouselConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCarouselConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCarouselConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * Defines the carousel slide transition direction.
 */
var NgbSlideEventDirection;
(function (NgbSlideEventDirection) {
    NgbSlideEventDirection["START"] = "start";
    NgbSlideEventDirection["END"] = "end";
})(NgbSlideEventDirection || (NgbSlideEventDirection = {}));
const isBeingAnimated = ({ classList }) => {
    return classList.contains('carousel-item-start') || classList.contains('carousel-item-end');
};
const removeDirectionClasses = (classList) => {
    classList.remove('carousel-item-start', 'carousel-item-end');
};
const removeClasses = (classList) => {
    removeDirectionClasses(classList);
    classList.remove('carousel-item-prev', 'carousel-item-next');
};
const ngbCarouselTransitionIn = (element, animation, { direction }) => {
    const { classList } = element;
    if (!animation) {
        removeClasses(classList);
        classList.add('active');
        return;
    }
    if (isBeingAnimated(element)) {
        // Revert the transition
        removeDirectionClasses(classList);
    }
    else {
        // For the 'in' transition, a 'pre-class' is applied to the element to ensure its visibility
        classList.add('carousel-item-' + (direction === NgbSlideEventDirection.START ? 'next' : 'prev'));
        reflow(element);
        classList.add('carousel-item-' + direction);
    }
    return () => {
        removeClasses(classList);
        classList.add('active');
    };
};
const ngbCarouselTransitionOut = (element, animation, { direction }) => {
    const { classList } = element;
    if (!animation) {
        removeClasses(classList);
        classList.remove('active');
        return;
    }
    //  direction is left or right, depending on the way the slide goes out.
    if (isBeingAnimated(element)) {
        // Revert the transition
        removeDirectionClasses(classList);
    }
    else {
        classList.add('carousel-item-' + direction);
    }
    return () => {
        removeClasses(classList);
        classList.remove('active');
    };
};

let nextId$2 = 0;
let carouselId = 0;
/**
 * A directive that wraps the individual carousel slide.
 */
class NgbSlide {
    constructor() {
        this.templateRef = inject(TemplateRef);
        /**
         * Slide id that must be unique for the entire document.
         *
         * If not provided, will be generated in the `ngb-slide-xx` format.
         */
        this.id = `ngb-slide-${nextId$2++}`;
        /**
         * An event emitted when the slide transition is finished
         *
         * @since 8.0.0
         */
        this.slid = new EventEmitter();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbSlide, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbSlide, isStandalone: true, selector: "ng-template[ngbSlide]", inputs: { id: "id" }, outputs: { slid: "slid" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbSlide, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbSlide]', standalone: true }]
        }], propDecorators: { id: [{
                type: Input
            }], slid: [{
                type: Output
            }] } });
/**
 * Carousel is a component to easily create and control slideshows.
 *
 * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
 */
class NgbCarousel {
    constructor() {
        this.NgbSlideEventSource = NgbSlideEventSource;
        this._config = inject(NgbCarouselConfig);
        this._platformId = inject(PLATFORM_ID);
        this._ngZone = inject(NgZone);
        this._cd = inject(ChangeDetectorRef);
        this._container = inject(ElementRef);
        this._destroyRef = inject(DestroyRef);
        this._injector = inject(Injector);
        this._interval$ = new BehaviorSubject(this._config.interval);
        this._mouseHover$ = new BehaviorSubject(false);
        this._focused$ = new BehaviorSubject(false);
        this._pauseOnHover$ = new BehaviorSubject(this._config.pauseOnHover);
        this._pauseOnFocus$ = new BehaviorSubject(this._config.pauseOnFocus);
        this._pause$ = new BehaviorSubject(false);
        this._wrap$ = new BehaviorSubject(this._config.wrap);
        this.id = `ngb-carousel-${carouselId++}`;
        /**
         * A flag to enable/disable the animations.
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * If `true`, allows to interact with carousel using keyboard 'arrow left' and 'arrow right'.
         */
        this.keyboard = this._config.keyboard;
        /**
         * If `true`, 'previous' and 'next' navigation arrows will be visible on the slide.
         *
         * @since 2.2.0
         */
        this.showNavigationArrows = this._config.showNavigationArrows;
        /**
         * If `true`, navigation indicators at the bottom of the slide will be visible.
         *
         * @since 2.2.0
         */
        this.showNavigationIndicators = this._config.showNavigationIndicators;
        /**
         * An event emitted just before the slide transition starts.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         */
        this.slide = new EventEmitter();
        /**
         * An event emitted right after the slide transition is completed.
         *
         * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
         *
         * @since 8.0.0
         */
        this.slid = new EventEmitter();
        /*
         * Keep the ids of the panels currently transitionning
         * in order to allow only the transition revertion
         */
        this._transitionIds = null;
    }
    /**
     * Time in milliseconds before the next slide is shown.
     */
    set interval(value) {
        this._interval$.next(value);
    }
    get interval() {
        return this._interval$.value;
    }
    /**
     * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
     */
    set wrap(value) {
        this._wrap$.next(value);
    }
    get wrap() {
        return this._wrap$.value;
    }
    /**
     * If `true`, will pause slide switching when mouse cursor hovers the slide.
     *
     * @since 2.2.0
     */
    set pauseOnHover(value) {
        this._pauseOnHover$.next(value);
    }
    get pauseOnHover() {
        return this._pauseOnHover$.value;
    }
    /**
     * If `true`, will pause slide switching when the focus is inside the carousel.
     */
    set pauseOnFocus(value) {
        this._pauseOnFocus$.next(value);
    }
    get pauseOnFocus() {
        return this._pauseOnFocus$.value;
    }
    set mouseHover(value) {
        this._mouseHover$.next(value);
    }
    get mouseHover() {
        return this._mouseHover$.value;
    }
    set focused(value) {
        this._focused$.next(value);
    }
    get focused() {
        return this._focused$.value;
    }
    arrowLeft() {
        this.focus();
        this.prev(NgbSlideEventSource.ARROW_LEFT);
    }
    arrowRight() {
        this.focus();
        this.next(NgbSlideEventSource.ARROW_RIGHT);
    }
    ngAfterContentInit() {
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(() => {
                const hasNextSlide$ = combineLatest([
                    this.slide.pipe(map((slideEvent) => slideEvent.current), startWith(this.activeId)),
                    this._wrap$,
                    this.slides.changes.pipe(startWith(null)),
                ]).pipe(map(([currentSlideId, wrap]) => {
                    const slideArr = this.slides.toArray();
                    const currentSlideIdx = this._getSlideIdxById(currentSlideId);
                    return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                }), distinctUntilChanged());
                combineLatest([
                    this._pause$,
                    this._pauseOnHover$,
                    this._mouseHover$,
                    this._pauseOnFocus$,
                    this._focused$,
                    this._interval$,
                    hasNextSlide$,
                ])
                    .pipe(map(([pause, pauseOnHover, mouseHover, pauseOnFocus, focused, interval, hasNextSlide]) => pause || (pauseOnHover && mouseHover) || (pauseOnFocus && focused) || !hasNextSlide ? 0 : interval), distinctUntilChanged(), switchMap((interval) => (interval > 0 ? timer(interval, interval) : NEVER)), takeUntilDestroyed(this._destroyRef))
                    .subscribe(() => this._ngZone.run(() => this.next(NgbSlideEventSource.TIMER)));
            });
        }
        this.slides.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._transitionIds?.forEach((id) => ngbCompleteTransition(this._getSlideElement(id)));
            this._transitionIds = null;
            this._cd.markForCheck();
            // The following code need to be done asynchronously, after the dom becomes stable,
            // otherwise all changes will be undone.
            afterNextRender({
                mixedReadWrite: () => {
                    for (const { id } of this.slides) {
                        const element = this._getSlideElement(id);
                        if (id === this.activeId) {
                            element.classList.add('active');
                        }
                        else {
                            element.classList.remove('active');
                        }
                    }
                },
            }, { injector: this._injector });
        });
    }
    ngAfterContentChecked() {
        let activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : this.slides.length ? this.slides.first.id : '';
    }
    ngAfterViewInit() {
        // Initialize the 'active' class (not managed by the template)
        if (this.activeId) {
            const element = this._getSlideElement(this.activeId);
            if (element) {
                element.classList.add('active');
            }
        }
    }
    /**
     * Navigates to a slide with the specified identifier.
     */
    select(slideId, source) {
        this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
    }
    /**
     * Navigates to the previous slide.
     */
    prev(source) {
        this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.END, source);
    }
    /**
     * Navigates to the next slide.
     */
    next(source) {
        this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.START, source);
    }
    /**
     * Pauses cycling through the slides.
     */
    pause() {
        this._pause$.next(true);
    }
    /**
     * Restarts cycling through the slides from start to end.
     */
    cycle() {
        this._pause$.next(false);
    }
    /**
     * Set the focus on the carousel.
     */
    focus() {
        this._container.nativeElement.focus();
    }
    _cycleToSelected(slideIdx, direction, source) {
        const transitionIds = this._transitionIds;
        if (transitionIds && (transitionIds[0] !== slideIdx || transitionIds[1] !== this.activeId)) {
            // Revert prevented
            return;
        }
        let selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this._transitionIds = [this.activeId, slideIdx];
            this.slide.emit({
                prev: this.activeId,
                current: selectedSlide.id,
                direction: direction,
                paused: this._pause$.value,
                source,
            });
            const options = {
                animation: this.animation,
                runningTransition: 'stop',
                context: { direction },
            };
            const transitions = [];
            const activeSlide = this._getSlideById(this.activeId);
            if (activeSlide) {
                const activeSlideTransition = ngbRunTransition(this._ngZone, this._getSlideElement(activeSlide.id), ngbCarouselTransitionOut, options);
                activeSlideTransition.subscribe(() => {
                    activeSlide.slid.emit({ isShown: false, direction, source });
                });
                transitions.push(activeSlideTransition);
            }
            const previousId = this.activeId;
            this.activeId = selectedSlide.id;
            const nextSlide = this._getSlideById(this.activeId);
            const transition = ngbRunTransition(this._ngZone, this._getSlideElement(selectedSlide.id), ngbCarouselTransitionIn, options);
            transition.subscribe(() => {
                nextSlide?.slid.emit({ isShown: true, direction, source });
            });
            transitions.push(transition);
            zip(...transitions)
                .pipe(take(1))
                .subscribe(() => {
                this._transitionIds = null;
                this.slid.emit({
                    prev: previousId,
                    current: selectedSlide.id,
                    direction: direction,
                    paused: this._pause$.value,
                    source,
                });
            });
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    }
    _getSlideEventDirection(currentActiveSlideId, nextActiveSlideId) {
        const currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        const nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.END : NgbSlideEventDirection.START;
    }
    _getSlideById(slideId) {
        return this.slides.find((slide) => slide.id === slideId) || null;
    }
    _getSlideIdxById(slideId) {
        const slide = this._getSlideById(slideId);
        return slide != null ? this.slides.toArray().indexOf(slide) : -1;
    }
    _getNextSlide(currentSlideId) {
        const slideArr = this.slides.toArray();
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        const isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide
            ? this.wrap
                ? slideArr[0].id
                : slideArr[slideArr.length - 1].id
            : slideArr[currentSlideIdx + 1].id;
    }
    _getPrevSlide(currentSlideId) {
        const slideArr = this.slides.toArray();
        const currentSlideIdx = this._getSlideIdxById(currentSlideId);
        const isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide
            ? this.wrap
                ? slideArr[slideArr.length - 1].id
                : slideArr[0].id
            : slideArr[currentSlideIdx - 1].id;
    }
    _getSlideElement(slideId) {
        return this._container.nativeElement.querySelector(`#slide-${slideId}`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCarousel, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbCarousel, isStandalone: true, selector: "ngb-carousel", inputs: { animation: "animation", activeId: "activeId", interval: "interval", wrap: "wrap", keyboard: "keyboard", pauseOnHover: "pauseOnHover", pauseOnFocus: "pauseOnFocus", showNavigationArrows: "showNavigationArrows", showNavigationIndicators: "showNavigationIndicators" }, outputs: { slide: "slide", slid: "slid" }, host: { attributes: { "tabIndex": "0" }, listeners: { "keydown.arrowLeft": "keyboard && arrowLeft()", "keydown.arrowRight": "keyboard && arrowRight()", "mouseenter": "mouseHover = true", "mouseleave": "mouseHover = false", "focusin": "focused = true", "focusout": "focused = false" }, properties: { "style.display": "\"block\"", "attr.aria-activedescendant": "'slide-' + activeId" }, classAttribute: "carousel slide" }, queries: [{ propertyName: "slides", predicate: NgbSlide }], exportAs: ["ngbCarousel"], ngImport: i0, template: `
		<div class="carousel-indicators" [class.visually-hidden]="!showNavigationIndicators" role="tablist">
			@for (slide of slides; track slide) {
				<button
					type="button"
					data-bs-target
					[class.active]="slide.id === activeId"
					role="tab"
					[attr.aria-labelledby]="'slide-' + slide.id"
					[attr.aria-controls]="'slide-' + slide.id"
					[attr.aria-selected]="slide.id === activeId"
					(click)="focus(); select(slide.id, NgbSlideEventSource.INDICATOR)"
				></button>
			}
		</div>
		<div class="carousel-inner">
			@for (slide of slides; track slide; let i = $index; let c = $count) {
				<div class="carousel-item" [id]="'slide-' + slide.id" role="tabpanel">
					<span
						class="visually-hidden"
						i18n="Currently selected slide number read by screen reader@@ngb.carousel.slide-number"
					>
						Slide {{ i + 1 }} of {{ c }}
					</span>
					<ng-template [ngTemplateOutlet]="slide.templateRef" />
				</div>
			}
		</div>
		@if (showNavigationArrows) {
			<button
				class="carousel-control-prev"
				type="button"
				(click)="arrowLeft()"
				[attr.aria-labelledby]="id + '-previous'"
			>
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden" i18n="@@ngb.carousel.previous" [id]="id + '-previous'">Previous</span>
			</button>
			<button class="carousel-control-next" type="button" (click)="arrowRight()" [attr.aria-labelledby]="id + '-next'">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden" i18n="@@ngb.carousel.next" [id]="id + '-next'">Next</span>
			</button>
		}
	`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCarousel, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-carousel',
                    exportAs: 'ngbCarousel',
                    imports: [NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'carousel slide',
                        '[style.display]': '"block"',
                        tabIndex: '0',
                        '(keydown.arrowLeft)': 'keyboard && arrowLeft()',
                        '(keydown.arrowRight)': 'keyboard && arrowRight()',
                        '(mouseenter)': 'mouseHover = true',
                        '(mouseleave)': 'mouseHover = false',
                        '(focusin)': 'focused = true',
                        '(focusout)': 'focused = false',
                        '[attr.aria-activedescendant]': `'slide-' + activeId`,
                    },
                    template: `
		<div class="carousel-indicators" [class.visually-hidden]="!showNavigationIndicators" role="tablist">
			@for (slide of slides; track slide) {
				<button
					type="button"
					data-bs-target
					[class.active]="slide.id === activeId"
					role="tab"
					[attr.aria-labelledby]="'slide-' + slide.id"
					[attr.aria-controls]="'slide-' + slide.id"
					[attr.aria-selected]="slide.id === activeId"
					(click)="focus(); select(slide.id, NgbSlideEventSource.INDICATOR)"
				></button>
			}
		</div>
		<div class="carousel-inner">
			@for (slide of slides; track slide; let i = $index; let c = $count) {
				<div class="carousel-item" [id]="'slide-' + slide.id" role="tabpanel">
					<span
						class="visually-hidden"
						i18n="Currently selected slide number read by screen reader@@ngb.carousel.slide-number"
					>
						Slide {{ i + 1 }} of {{ c }}
					</span>
					<ng-template [ngTemplateOutlet]="slide.templateRef" />
				</div>
			}
		</div>
		@if (showNavigationArrows) {
			<button
				class="carousel-control-prev"
				type="button"
				(click)="arrowLeft()"
				[attr.aria-labelledby]="id + '-previous'"
			>
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden" i18n="@@ngb.carousel.previous" [id]="id + '-previous'">Previous</span>
			</button>
			<button class="carousel-control-next" type="button" (click)="arrowRight()" [attr.aria-labelledby]="id + '-next'">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden" i18n="@@ngb.carousel.next" [id]="id + '-next'">Next</span>
			</button>
		}
	`,
                }]
        }], propDecorators: { slides: [{
                type: ContentChildren,
                args: [NgbSlide]
            }], animation: [{
                type: Input
            }], activeId: [{
                type: Input
            }], interval: [{
                type: Input
            }], wrap: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], pauseOnHover: [{
                type: Input
            }], pauseOnFocus: [{
                type: Input
            }], showNavigationArrows: [{
                type: Input
            }], showNavigationIndicators: [{
                type: Input
            }], slide: [{
                type: Output
            }], slid: [{
                type: Output
            }] } });
var NgbSlideEventSource;
(function (NgbSlideEventSource) {
    NgbSlideEventSource["TIMER"] = "timer";
    NgbSlideEventSource["ARROW_LEFT"] = "arrowLeft";
    NgbSlideEventSource["ARROW_RIGHT"] = "arrowRight";
    NgbSlideEventSource["INDICATOR"] = "indicator";
})(NgbSlideEventSource || (NgbSlideEventSource = {}));

class NgbCarouselModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbCarouselModule, imports: [NgbCarousel, NgbSlide], exports: [NgbCarousel, NgbSlide] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCarouselModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbCarousel, NgbSlide],
                    exports: [NgbCarousel, NgbSlide],
                }]
        }] });

class NgbCollapseModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCollapseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbCollapseModule, imports: [NgbCollapse], exports: [NgbCollapse] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCollapseModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCollapseModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbCollapse],
                    exports: [NgbCollapse],
                }]
        }] });

/**
 * A simple class that represents a date that datepicker also uses internally.
 *
 * It is the implementation of the `NgbDateStruct` interface that adds some convenience methods,
 * like `.equals()`, `.before()`, etc.
 *
 * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
 *
 * In many cases it is simpler to manipulate these objects together with
 * [`NgbCalendar`](#/components/datepicker/api#NgbCalendar) than native JS Dates.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 *
 * @since 3.0.0
 */
class NgbDate {
    /**
     * A **static method** that creates a new date object from the `NgbDateStruct`,
     *
     * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
     *
     * If the `date` is already of `NgbDate` type, the method will return the same object.
     */
    static from(date) {
        if (date instanceof NgbDate) {
            return date;
        }
        return date ? new NgbDate(date.year, date.month, date.day) : null;
    }
    constructor(year, month, day) {
        this.year = isInteger(year) ? year : null;
        this.month = isInteger(month) ? month : null;
        this.day = isInteger(day) ? day : null;
    }
    /**
     * Checks if the current date is equal to another date.
     */
    equals(other) {
        return other != null && this.year === other.year && this.month === other.month && this.day === other.day;
    }
    /**
     * Checks if the current date is before another date.
     */
    before(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day < other.day;
            }
            else {
                return this.month < other.month;
            }
        }
        else {
            return this.year < other.year;
        }
    }
    /**
     * Checks if the current date is after another date.
     */
    after(other) {
        if (!other) {
            return false;
        }
        if (this.year === other.year) {
            if (this.month === other.month) {
                return this.day === other.day ? false : this.day > other.day;
            }
            else {
                return this.month > other.month;
            }
        }
        else {
            return this.year > other.year;
        }
    }
}

function fromJSDate(jsDate) {
    return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
}
function toJSDate(date) {
    const jsDate = new Date(date.year, date.month - 1, date.day, 12);
    // this is done avoid 30 -> 1930 conversion
    if (!isNaN(jsDate.getTime())) {
        jsDate.setFullYear(date.year);
    }
    return jsDate;
}
function NGB_DATEPICKER_CALENDAR_FACTORY() {
    return new NgbCalendarGregorian();
}
/**
 * A service that represents the calendar used by the datepicker.
 *
 * The default implementation uses the Gregorian calendar. You can inject it in your own
 * implementations if necessary to simplify `NgbDate` calculations.
 */
class NgbCalendar {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendar, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendar, providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendar, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY }]
        }] });
class NgbCalendarGregorian extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    getWeeksPerMonth() {
        return 6;
    }
    getNext(date, period = 'd', number = 1) {
        let jsDate = toJSDate(date);
        let checkMonth = true;
        let expectedMonth = jsDate.getMonth();
        switch (period) {
            case 'y':
                jsDate.setFullYear(jsDate.getFullYear() + number);
                break;
            case 'm':
                expectedMonth += number;
                jsDate.setMonth(expectedMonth);
                expectedMonth = expectedMonth % 12;
                if (expectedMonth < 0) {
                    expectedMonth = expectedMonth + 12;
                }
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                checkMonth = false;
                break;
            default:
                return date;
        }
        if (checkMonth && jsDate.getMonth() !== expectedMonth) {
            // this means the destination month has less days than the initial month
            // let's go back to the end of the previous month:
            jsDate.setDate(0);
        }
        return fromJSDate(jsDate);
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        let jsDate = toJSDate(date);
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        let date = week[thursdayIndex];
        const jsDate = toJSDate(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    getToday() {
        return fromJSDate(new Date());
    }
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        const jsDate = toJSDate(date);
        return (!isNaN(jsDate.getTime()) &&
            jsDate.getFullYear() === date.year &&
            jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarGregorian, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarGregorian }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarGregorian, decorators: [{
            type: Injectable
        }] });

function isChangedDate(prev, next) {
    return !dateComparator(prev, next);
}
function isChangedMonth(prev, next) {
    return !prev && !next ? false : !prev || !next ? true : prev.year !== next.year || prev.month !== next.month;
}
function dateComparator(prev, next) {
    return (!prev && !next) || (!!prev && !!next && prev.equals(next));
}
function checkMinBeforeMax(minDate, maxDate) {
    if (maxDate && minDate && maxDate.before(minDate)) {
        throw new Error(`'maxDate' ${maxDate} should be greater than 'minDate' ${minDate}`);
    }
}
function checkDateInRange(date, minDate, maxDate) {
    if (date && minDate && date.before(minDate)) {
        return minDate;
    }
    if (date && maxDate && date.after(maxDate)) {
        return maxDate;
    }
    return date || null;
}
function isDateSelectable(date, state) {
    const { minDate, maxDate, disabled, markDisabled } = state;
    return !(date === null ||
        date === undefined ||
        disabled ||
        (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
        (minDate && date.before(minDate)) ||
        (maxDate && date.after(maxDate)));
}
function generateSelectBoxMonths(calendar, date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    let months = calendar.getMonths(date.year);
    if (minDate && date.year === minDate.year) {
        const index = months.findIndex((month) => month === minDate.month);
        months = months.slice(index);
    }
    if (maxDate && date.year === maxDate.year) {
        const index = months.findIndex((month) => month === maxDate.month);
        months = months.slice(0, index + 1);
    }
    return months;
}
function generateSelectBoxYears(date, minDate, maxDate) {
    if (!date) {
        return [];
    }
    const start = minDate ? Math.max(minDate.year, date.year - 500) : date.year - 10;
    const end = maxDate ? Math.min(maxDate.year, date.year + 500) : date.year + 10;
    const length = end - start + 1;
    const numbers = Array(length);
    for (let i = 0; i < length; i++) {
        numbers[i] = start + i;
    }
    return numbers;
}
function nextMonthDisabled(calendar, date, maxDate) {
    const nextDate = Object.assign(calendar.getNext(date, 'm'), { day: 1 });
    return maxDate != null && nextDate.after(maxDate);
}
function prevMonthDisabled(calendar, date, minDate) {
    const prevDate = Object.assign(calendar.getPrev(date, 'm'), { day: 1 });
    return (minDate != null &&
        ((prevDate.year === minDate.year && prevDate.month < minDate.month) ||
            (prevDate.year < minDate.year && minDate.month === 1)));
}
function buildMonths(calendar, date, state, i18n, force) {
    const { displayMonths, months } = state;
    // move old months to a temporary array
    const monthsToReuse = months.splice(0, months.length);
    // generate new first dates, nullify or reuse months
    const firstDates = Array.from({ length: displayMonths }, (_, i) => {
        const firstDate = Object.assign(calendar.getNext(date, 'm', i), { day: 1 });
        months[i] = null;
        if (!force) {
            const reusedIndex = monthsToReuse.findIndex((month) => month.firstDate.equals(firstDate));
            // move reused month back to months
            if (reusedIndex !== -1) {
                months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
            }
        }
        return firstDate;
    });
    // rebuild nullified months
    firstDates.forEach((firstDate, i) => {
        if (months[i] === null) {
            months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || {});
        }
    });
    return months;
}
function buildMonth(calendar, date, state, i18n, month = {}) {
    const { dayTemplateData, minDate, maxDate, firstDayOfWeek, markDisabled, outsideDays, weekdayWidth, weekdaysVisible, } = state;
    const calendarToday = calendar.getToday();
    month.firstDate = null;
    month.lastDate = null;
    month.number = date.month;
    month.year = date.year;
    month.weeks = month.weeks || [];
    month.weekdays = month.weekdays || [];
    date = getFirstViewDate(calendar, date, firstDayOfWeek);
    // clearing weekdays, if not visible
    if (!weekdaysVisible) {
        month.weekdays.length = 0;
    }
    // month has weeks
    for (let week = 0; week < calendar.getWeeksPerMonth(); week++) {
        let weekObject = month.weeks[week];
        if (!weekObject) {
            weekObject = month.weeks[week] = { number: 0, days: [], collapsed: true };
        }
        const days = weekObject.days;
        // week has days
        for (let day = 0; day < calendar.getDaysPerWeek(); day++) {
            if (week === 0 && weekdaysVisible) {
                month.weekdays[day] = i18n.getWeekdayLabel(calendar.getWeekday(date), weekdayWidth);
            }
            const newDate = new NgbDate(date.year, date.month, date.day);
            const nextDate = calendar.getNext(newDate);
            const ariaLabel = i18n.getDayAriaLabel(newDate);
            // marking date as disabled
            let disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
            if (!disabled && markDisabled) {
                disabled = markDisabled(newDate, { month: month.number, year: month.year });
            }
            // today
            let today = newDate.equals(calendarToday);
            // adding user-provided data to the context
            let contextUserData = dayTemplateData
                ? dayTemplateData(newDate, { month: month.number, year: month.year })
                : undefined;
            // saving first date of the month
            if (month.firstDate === null && newDate.month === month.number) {
                month.firstDate = newDate;
            }
            // saving last date of the month
            if (newDate.month === month.number && nextDate.month !== month.number) {
                month.lastDate = newDate;
            }
            let dayObject = days[day];
            if (!dayObject) {
                dayObject = days[day] = {};
            }
            dayObject.date = newDate;
            dayObject.context = Object.assign(dayObject.context || {}, {
                $implicit: newDate,
                date: newDate,
                data: contextUserData,
                currentMonth: month.number,
                currentYear: month.year,
                disabled,
                focused: false,
                selected: false,
                today,
            });
            dayObject.tabindex = -1;
            dayObject.ariaLabel = ariaLabel;
            dayObject.hidden = false;
            date = nextDate;
        }
        weekObject.number = calendar.getWeekNumber(days.map((day) => day.date), firstDayOfWeek);
        // marking week as collapsed
        weekObject.collapsed =
            outsideDays === 'collapsed' &&
                days[0].date.month !== month.number &&
                days[days.length - 1].date.month !== month.number;
    }
    return month;
}
function getFirstViewDate(calendar, date, firstDayOfWeek) {
    const daysPerWeek = calendar.getDaysPerWeek();
    const firstMonthDate = new NgbDate(date.year, date.month, 1);
    const dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
    return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
}

/**
 * A service supplying i18n data to the datepicker component.
 *
 * The default implementation of this service uses the Angular locale and registered locale data for
 * weekdays and month names (as explained in the Angular i18n guide).
 *
 * It also provides a way to i18n data that depends on calendar calculations, like aria labels, day, week and year
 * numerals. For other static labels the datepicker uses the default Angular i18n.
 *
 * See the [i18n demo](#/components/datepicker/examples#i18n) and
 * [Hebrew calendar demo](#/components/datepicker/calendars#hebrew) on how to extend this class and define
 * a custom provider for i18n.
 */
class NgbDatepickerI18n {
    /**
     * Returns the text label to display above the day view.
     *
     * @since 9.1.0
     */
    getMonthLabel(date) {
        return `${this.getMonthFullName(date.month, date.year)} ${this.getYearNumerals(date.year)}`;
    }
    /**
     * Returns the textual representation of a day that is rendered in a day cell.
     *
     * @since 3.0.0
     */
    getDayNumerals(date) {
        return `${date.day}`;
    }
    /**
     * Returns the textual representation of a week number rendered by datepicker.
     *
     * @since 3.0.0
     */
    getWeekNumerals(weekNumber) {
        return `${weekNumber}`;
    }
    /**
     * Returns the textual representation of a year that is rendered in the datepicker year select box.
     *
     * @since 3.0.0
     */
    getYearNumerals(year) {
        return `${year}`;
    }
    /**
     * Returns the week label to display in the heading of the month view.
     *
     * @since 9.1.0
     */
    getWeekLabel() {
        return '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18n, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18n, providedIn: 'root', useFactory: () => new NgbDatepickerI18nDefault() }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18n, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => new NgbDatepickerI18nDefault(),
                }]
        }] });
/**
 * A service providing default implementation for the datepicker i18n.
 * It can be used as a base implementation if necessary.
 *
 * @since 9.1.0
 */
class NgbDatepickerI18nDefault extends NgbDatepickerI18n {
    constructor() {
        super(...arguments);
        this._locale = inject(LOCALE_ID);
        this._monthsShort = [...Array(12).keys()].map((month) => Intl.DateTimeFormat(this._locale, { month: 'short', timeZone: 'UTC' }).format(Date.UTC(2000, month)));
        this._monthsFull = [...Array(12).keys()].map((month) => Intl.DateTimeFormat(this._locale, { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2000, month)));
    }
    getWeekdayLabel(weekday, width = 'narrow') {
        // 1 MAY 2000 is a Monday
        const weekdays = [1, 2, 3, 4, 5, 6, 7].map((day) => Intl.DateTimeFormat(this._locale, { weekday: width, timeZone: 'UTC' }).format(Date.UTC(2000, 4, day)));
        // `weekday` is 1 (Mon) to 7 (Sun)
        return weekdays[weekday - 1] || '';
    }
    getMonthShortName(month) {
        return this._monthsShort[month - 1] || '';
    }
    getMonthFullName(month) {
        return this._monthsFull[month - 1] || '';
    }
    getDayAriaLabel(date) {
        const jsDate = new Date(date.year, date.month - 1, date.day);
        return formatDate(jsDate, 'fullDate', this._locale);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18nDefault, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18nDefault }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18nDefault, decorators: [{
            type: Injectable
        }] });

class NgbDatepickerService {
    constructor() {
        this._VALIDATORS = {
            dayTemplateData: (dayTemplateData) => {
                if (this._state.dayTemplateData !== dayTemplateData) {
                    return { dayTemplateData };
                }
            },
            displayMonths: (displayMonths) => {
                displayMonths = toInteger(displayMonths);
                if (isInteger(displayMonths) && displayMonths > 0 && this._state.displayMonths !== displayMonths) {
                    return { displayMonths };
                }
            },
            disabled: (disabled) => {
                if (this._state.disabled !== disabled) {
                    return { disabled };
                }
            },
            firstDayOfWeek: (firstDayOfWeek) => {
                firstDayOfWeek = toInteger(firstDayOfWeek);
                if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && this._state.firstDayOfWeek !== firstDayOfWeek) {
                    return { firstDayOfWeek };
                }
            },
            focusVisible: (focusVisible) => {
                if (this._state.focusVisible !== focusVisible && !this._state.disabled) {
                    return { focusVisible };
                }
            },
            markDisabled: (markDisabled) => {
                if (this._state.markDisabled !== markDisabled) {
                    return { markDisabled };
                }
            },
            maxDate: (date) => {
                const maxDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.maxDate, maxDate)) {
                    return { maxDate };
                }
            },
            minDate: (date) => {
                const minDate = this.toValidDate(date, null);
                if (isChangedDate(this._state.minDate, minDate)) {
                    return { minDate };
                }
            },
            navigation: (navigation) => {
                if (this._state.navigation !== navigation) {
                    return { navigation };
                }
            },
            outsideDays: (outsideDays) => {
                if (this._state.outsideDays !== outsideDays) {
                    return { outsideDays };
                }
            },
            weekdays: (weekdays) => {
                const weekdayWidth = weekdays === true || weekdays === false ? 'narrow' : weekdays;
                const weekdaysVisible = weekdays === true || weekdays === false ? weekdays : true;
                if (this._state.weekdayWidth !== weekdayWidth || this._state.weekdaysVisible !== weekdaysVisible) {
                    return { weekdayWidth, weekdaysVisible };
                }
            },
        };
        this._calendar = inject(NgbCalendar);
        this._i18n = inject(NgbDatepickerI18n);
        this._model$ = new Subject();
        this._dateSelect$ = new Subject();
        this._state = {
            dayTemplateData: null,
            markDisabled: null,
            maxDate: null,
            minDate: null,
            disabled: false,
            displayMonths: 1,
            firstDate: null,
            firstDayOfWeek: 1,
            lastDate: null,
            focusDate: null,
            focusVisible: false,
            months: [],
            navigation: 'select',
            outsideDays: 'visible',
            prevDisabled: false,
            nextDisabled: false,
            selectedDate: null,
            selectBoxes: { years: [], months: [] },
            weekdayWidth: 'narrow',
            weekdaysVisible: true,
        };
    }
    get model$() {
        return this._model$.pipe(filter((model) => model.months.length > 0));
    }
    get dateSelect$() {
        return this._dateSelect$.pipe(filter((date) => date !== null));
    }
    set(options) {
        let patch = Object.keys(options)
            .map((key) => this._VALIDATORS[key](options[key]))
            .reduce((obj, part) => ({ ...obj, ...part }), {});
        if (Object.keys(patch).length > 0) {
            this._nextState(patch);
        }
    }
    focus(date) {
        const focusedDate = this.toValidDate(date, null);
        if (focusedDate != null && !this._state.disabled && isChangedDate(this._state.focusDate, focusedDate)) {
            this._nextState({ focusDate: date });
        }
    }
    focusSelect() {
        if (isDateSelectable(this._state.focusDate, this._state)) {
            this.select(this._state.focusDate, { emitEvent: true });
        }
    }
    open(date) {
        const firstDate = this.toValidDate(date, this._calendar.getToday());
        if (firstDate != null &&
            !this._state.disabled &&
            (!this._state.firstDate || isChangedMonth(this._state.firstDate, firstDate))) {
            this._nextState({ firstDate });
        }
    }
    select(date, options = {}) {
        const selectedDate = this.toValidDate(date, null);
        if (selectedDate != null && !this._state.disabled) {
            if (isChangedDate(this._state.selectedDate, selectedDate)) {
                this._nextState({ selectedDate });
            }
            if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                this._dateSelect$.next(selectedDate);
            }
        }
    }
    toValidDate(date, defaultValue) {
        const ngbDate = NgbDate.from(date);
        if (defaultValue === undefined) {
            defaultValue = this._calendar.getToday();
        }
        return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
    }
    getMonth(struct) {
        for (let month of this._state.months) {
            if (struct.month === month.number && struct.year === month.year) {
                return month;
            }
        }
        throw new Error(`month ${struct.month} of year ${struct.year} not found`);
    }
    _nextState(patch) {
        const newState = this._updateState(patch);
        this._patchContexts(newState);
        this._state = newState;
        this._model$.next(this._state);
    }
    _patchContexts(state) {
        const { months, displayMonths, selectedDate, focusDate, focusVisible, disabled, outsideDays } = state;
        state.months.forEach((month) => {
            month.weeks.forEach((week) => {
                week.days.forEach((day) => {
                    // patch focus flag
                    if (focusDate) {
                        day.context.focused = focusDate.equals(day.date) && focusVisible;
                    }
                    // calculating tabindex
                    day.tabindex =
                        !disabled && focusDate && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                    // override context disabled
                    if (disabled === true) {
                        day.context.disabled = true;
                    }
                    // patch selection flag
                    if (selectedDate !== undefined) {
                        day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                    }
                    // visibility
                    if (month.number !== day.date.month) {
                        day.hidden =
                            outsideDays === 'hidden' ||
                                outsideDays === 'collapsed' ||
                                (displayMonths > 1 &&
                                    day.date.after(months[0].firstDate) &&
                                    day.date.before(months[displayMonths - 1].lastDate));
                    }
                });
            });
        });
    }
    _updateState(patch) {
        // patching fields
        const state = Object.assign({}, this._state, patch);
        let startDate = state.firstDate;
        // min/max dates changed
        if ('minDate' in patch || 'maxDate' in patch) {
            checkMinBeforeMax(state.minDate, state.maxDate);
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
        }
        // disabled
        if ('disabled' in patch) {
            state.focusVisible = false;
        }
        // initial rebuild via 'select()'
        if ('selectedDate' in patch && this._state.months.length === 0) {
            startDate = state.selectedDate;
        }
        // terminate early if only focus visibility was changed
        if ('focusVisible' in patch) {
            return state;
        }
        // focus date changed
        if ('focusDate' in patch) {
            state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
            startDate = state.focusDate;
            // nothing to rebuild if only focus changed and it is still visible
            if (state.months.length !== 0 &&
                state.focusDate &&
                !state.focusDate.before(state.firstDate) &&
                !state.focusDate.after(state.lastDate)) {
                return state;
            }
        }
        // first date changed
        if ('firstDate' in patch) {
            state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
            startDate = state.firstDate;
        }
        // rebuilding months
        if (startDate) {
            const forceRebuild = 'dayTemplateData' in patch ||
                'firstDayOfWeek' in patch ||
                'markDisabled' in patch ||
                'minDate' in patch ||
                'maxDate' in patch ||
                'disabled' in patch ||
                'outsideDays' in patch ||
                'weekdaysVisible' in patch;
            const months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
            // updating months and boundary dates
            state.months = months;
            state.firstDate = months[0].firstDate;
            state.lastDate = months[months.length - 1].lastDate;
            // reset selected date if 'markDisabled' returns true
            if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                state.selectedDate = null;
            }
            // adjusting focus after months were built
            if ('firstDate' in patch) {
                if (!state.focusDate || state.focusDate.before(state.firstDate) || state.focusDate.after(state.lastDate)) {
                    state.focusDate = startDate;
                }
            }
            // adjusting months/years for the select box navigation
            const yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
            const monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
            if (state.navigation === 'select') {
                // years ->  boundaries (min/max were changed)
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                    state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                }
                // months -> when current year or boundaries change
                if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                    state.selectBoxes.months = generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                }
            }
            else {
                state.selectBoxes = { years: [], months: [] };
            }
            // updating navigation arrows -> boundaries change (min/max) or month/year changes
            if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
            }
        }
        return state;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerService, decorators: [{
            type: Injectable
        }] });

var NavigationEvent;
(function (NavigationEvent) {
    NavigationEvent[NavigationEvent["PREV"] = 0] = "PREV";
    NavigationEvent[NavigationEvent["NEXT"] = 1] = "NEXT";
})(NavigationEvent || (NavigationEvent = {}));

/**
 * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
class NgbDatepickerConfig {
    constructor() {
        this.displayMonths = 1;
        this.firstDayOfWeek = 1;
        this.navigation = 'select';
        this.outsideDays = 'visible';
        this.showWeekNumbers = false;
        this.weekdays = 'narrow';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
    return new NgbDateStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
 * any provided user date model `D`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding datepicker to a form control,
 * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
 *
 * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details
 * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
 */
class NgbDateAdapter {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateAdapter, providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateAdapter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY }]
        }] });
class NgbDateStructAdapter extends NgbDateAdapter {
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    fromModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)
            ? { year: date.year, month: date.month, day: date.day }
            : null;
    }
    /**
     * Converts a NgbDateStruct value into NgbDateStruct value
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)
            ? { year: date.year, month: date.month, day: date.day }
            : null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateStructAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateStructAdapter }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateStructAdapter, decorators: [{
            type: Injectable
        }] });

/**
 * A service that represents the keyboard navigation.
 *
 * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
 *
 * @since 5.2.0
 */
class NgbDatepickerKeyboardService {
    /**
     * Processes a keyboard event.
     */
    processKey(event, datepicker) {
        const { state, calendar } = datepicker;
        switch (event.key) {
            case 'PageUp':
                datepicker.focusDate(calendar.getPrev(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case 'PageDown':
                datepicker.focusDate(calendar.getNext(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                break;
            case 'End':
                datepicker.focusDate(event.shiftKey ? state.maxDate : state.lastDate);
                break;
            case 'Home':
                datepicker.focusDate(event.shiftKey ? state.minDate : state.firstDate);
                break;
            case 'ArrowLeft':
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', 1));
                break;
            case 'ArrowUp':
                datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case 'ArrowRight':
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', 1));
                break;
            case 'ArrowDown':
                datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                break;
            case 'Enter':
            case ' ':
                datepicker.focusSelect();
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerKeyboardService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerKeyboardService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerKeyboardService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class NgbDatepickerDayView {
    constructor() {
        this.i18n = inject(NgbDatepickerI18n);
    }
    isMuted() {
        return !this.selected && (this.date.month !== this.currentMonth || this.disabled);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerDayView, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.0.3", type: NgbDatepickerDayView, isStandalone: true, selector: "[ngbDatepickerDayView]", inputs: { currentMonth: "currentMonth", date: "date", disabled: "disabled", focused: "focused", selected: "selected" }, host: { properties: { "class.bg-primary": "selected", "class.text-white": "selected", "class.text-muted": "isMuted()", "class.outside": "isMuted()", "class.active": "focused" }, classAttribute: "btn-light" }, ngImport: i0, template: `{{ i18n.getDayNumerals(date) }}`, isInline: true, styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-tertiary-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerDayView, decorators: [{
            type: Component,
            args: [{ selector: '[ngbDatepickerDayView]', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'btn-light',
                        '[class.bg-primary]': 'selected',
                        '[class.text-white]': 'selected',
                        '[class.text-muted]': 'isMuted()',
                        '[class.outside]': 'isMuted()',
                        '[class.active]': 'focused',
                    }, template: `{{ i18n.getDayNumerals(date) }}`, styles: ["[ngbDatepickerDayView]{text-align:center;width:2rem;height:2rem;line-height:2rem;border-radius:.25rem;background:transparent}[ngbDatepickerDayView]:hover:not(.bg-primary),[ngbDatepickerDayView].active:not(.bg-primary){background-color:var(--bs-tertiary-bg);outline:1px solid var(--bs-border-color)}[ngbDatepickerDayView].outside{opacity:.5}\n"] }]
        }], propDecorators: { currentMonth: [{
                type: Input
            }], date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], focused: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });

class NgbDatepickerNavigationSelect {
    constructor() {
        this._month = -1;
        this._year = -1;
        this.i18n = inject(NgbDatepickerI18n);
        this.select = new EventEmitter();
    }
    changeMonth(month) {
        this.select.emit(new NgbDate(this.date.year, toInteger(month), 1));
    }
    changeYear(year) {
        this.select.emit(new NgbDate(toInteger(year), this.date.month, 1));
    }
    ngAfterViewChecked() {
        if (this.date) {
            if (this.date.month !== this._month) {
                this._month = this.date.month;
                this.monthSelect.nativeElement.value = `${this._month}`;
            }
            if (this.date.year !== this._year) {
                this._year = this.date.year;
                this.yearSelect.nativeElement.value = `${this._year}`;
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerNavigationSelect, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbDatepickerNavigationSelect, isStandalone: true, selector: "ngb-datepicker-navigation-select", inputs: { date: "date", disabled: "disabled", months: "months", years: "years" }, outputs: { select: "select" }, viewQueries: [{ propertyName: "monthSelect", first: true, predicate: ["month"], descendants: true, read: ElementRef, static: true }, { propertyName: "yearSelect", first: true, predicate: ["year"], descendants: true, read: ElementRef, static: true }], ngImport: i0, template: `
		<select
			#month
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-month"
			aria-label="Select month"
			i18n-title="@@ngb.datepicker.select-month"
			title="Select month"
			(change)="changeMonth($any($event).target.value)"
		>
			@for (m of months; track m) {
				<option [attr.aria-label]="i18n.getMonthFullName(m, date.year)" [value]="m">{{
					i18n.getMonthShortName(m, date.year)
				}}</option>
			}</select
		><select
			#year
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-year"
			aria-label="Select year"
			i18n-title="@@ngb.datepicker.select-year"
			title="Select year"
			(change)="changeYear($any($event).target.value)"
		>
			@for (y of years; track y) {
				<option [value]="y">{{ i18n.getYearNumerals(y) }}</option>
			}
		</select>
	`, isInline: true, styles: ["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerNavigationSelect, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-navigation-select', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: `
		<select
			#month
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-month"
			aria-label="Select month"
			i18n-title="@@ngb.datepicker.select-month"
			title="Select month"
			(change)="changeMonth($any($event).target.value)"
		>
			@for (m of months; track m) {
				<option [attr.aria-label]="i18n.getMonthFullName(m, date.year)" [value]="m">{{
					i18n.getMonthShortName(m, date.year)
				}}</option>
			}</select
		><select
			#year
			[disabled]="disabled"
			class="form-select"
			i18n-aria-label="@@ngb.datepicker.select-year"
			aria-label="Select year"
			i18n-title="@@ngb.datepicker.select-year"
			title="Select year"
			(change)="changeYear($any($event).target.value)"
		>
			@for (y of years; track y) {
				<option [value]="y">{{ i18n.getYearNumerals(y) }}</option>
			}
		</select>
	`, styles: ["ngb-datepicker-navigation-select>.form-select{flex:1 1 auto;padding:0 .5rem;font-size:.875rem;height:1.85rem}ngb-datepicker-navigation-select>.form-select:focus{z-index:1}ngb-datepicker-navigation-select>.form-select::-ms-value{background-color:transparent!important}\n"] }]
        }], propDecorators: { date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], months: [{
                type: Input
            }], years: [{
                type: Input
            }], select: [{
                type: Output
            }], monthSelect: [{
                type: ViewChild,
                args: ['month', { static: true, read: ElementRef }]
            }], yearSelect: [{
                type: ViewChild,
                args: ['year', { static: true, read: ElementRef }]
            }] } });

class NgbDatepickerNavigation {
    constructor() {
        this.navigation = NavigationEvent;
        this.i18n = inject(NgbDatepickerI18n);
        this.months = [];
        this.navigate = new EventEmitter();
        this.select = new EventEmitter();
    }
    onClickPrev(event) {
        event.currentTarget.focus();
        this.navigate.emit(this.navigation.PREV);
    }
    onClickNext(event) {
        event.currentTarget.focus();
        this.navigate.emit(this.navigation.NEXT);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerNavigation, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbDatepickerNavigation, isStandalone: true, selector: "ngb-datepicker-navigation", inputs: { date: "date", disabled: "disabled", months: "months", showSelect: "showSelect", prevDisabled: "prevDisabled", nextDisabled: "nextDisabled", selectBoxes: "selectBoxes" }, outputs: { navigate: "navigate", select: "select" }, ngImport: i0, template: `
		<div class="ngb-dp-arrow ngb-dp-arrow-prev">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickPrev($event)"
				[disabled]="prevDisabled"
				i18n-aria-label="@@ngb.datepicker.previous-month"
				aria-label="Previous month"
				i18n-title="@@ngb.datepicker.previous-month"
				title="Previous month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
		@if (showSelect) {
			<ngb-datepicker-navigation-select
				class="ngb-dp-navigation-select"
				[date]="date"
				[disabled]="disabled"
				[months]="selectBoxes.months"
				[years]="selectBoxes.years"
				(select)="select.emit($event)"
			/>
		}

		@if (!showSelect) {
			@for (month of months; track month; let i = $index) {
				@if (i > 0) {
					<div class="ngb-dp-arrow"></div>
				}
				<div class="ngb-dp-month-name">
					{{ i18n.getMonthLabel(month.firstDate) }}
				</div>
				@if (i !== months.length - 1) {
					<div class="ngb-dp-arrow"></div>
				}
			}
		}
		<div class="ngb-dp-arrow ngb-dp-arrow-next">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickNext($event)"
				[disabled]="nextDisabled"
				i18n-aria-label="@@ngb.datepicker.next-month"
				aria-label="Next month"
				i18n-title="@@ngb.datepicker.next-month"
				title="Next month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
	`, isInline: true, styles: ["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow-next{justify-content:flex-end}.ngb-dp-arrow-next .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"], dependencies: [{ kind: "component", type: NgbDatepickerNavigationSelect, selector: "ngb-datepicker-navigation-select", inputs: ["date", "disabled", "months", "years"], outputs: ["select"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerNavigation, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-navigation', imports: [NgbDatepickerNavigationSelect], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: `
		<div class="ngb-dp-arrow ngb-dp-arrow-prev">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickPrev($event)"
				[disabled]="prevDisabled"
				i18n-aria-label="@@ngb.datepicker.previous-month"
				aria-label="Previous month"
				i18n-title="@@ngb.datepicker.previous-month"
				title="Previous month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
		@if (showSelect) {
			<ngb-datepicker-navigation-select
				class="ngb-dp-navigation-select"
				[date]="date"
				[disabled]="disabled"
				[months]="selectBoxes.months"
				[years]="selectBoxes.years"
				(select)="select.emit($event)"
			/>
		}

		@if (!showSelect) {
			@for (month of months; track month; let i = $index) {
				@if (i > 0) {
					<div class="ngb-dp-arrow"></div>
				}
				<div class="ngb-dp-month-name">
					{{ i18n.getMonthLabel(month.firstDate) }}
				</div>
				@if (i !== months.length - 1) {
					<div class="ngb-dp-arrow"></div>
				}
			}
		}
		<div class="ngb-dp-arrow ngb-dp-arrow-next">
			<button
				type="button"
				class="btn btn-link ngb-dp-arrow-btn"
				(click)="onClickNext($event)"
				[disabled]="nextDisabled"
				i18n-aria-label="@@ngb.datepicker.next-month"
				aria-label="Next month"
				i18n-title="@@ngb.datepicker.next-month"
				title="Next month"
			>
				<span class="ngb-dp-navigation-chevron"></span>
			</button>
		</div>
	`, styles: ["ngb-datepicker-navigation{display:flex;align-items:center}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;width:.75em;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg)}.ngb-dp-arrow{display:flex;flex:1 1 auto;padding-right:0;padding-left:0;margin:0;width:2rem;height:2rem}.ngb-dp-arrow-next{justify-content:flex-end}.ngb-dp-arrow-next .ngb-dp-navigation-chevron{transform:rotate(45deg);margin-left:.15em;margin-right:.25em}.ngb-dp-arrow-btn{padding:0 .25rem;margin:0 .5rem;border:none;background-color:transparent;z-index:1}.ngb-dp-arrow-btn:focus{outline-width:1px;outline-style:auto}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}\n"] }]
        }], propDecorators: { date: [{
                type: Input
            }], disabled: [{
                type: Input
            }], months: [{
                type: Input
            }], showSelect: [{
                type: Input
            }], prevDisabled: [{
                type: Input
            }], nextDisabled: [{
                type: Input
            }], selectBoxes: [{
                type: Input
            }], navigate: [{
                type: Output
            }], select: [{
                type: Output
            }] } });

/**
 * A directive that marks the content template that customizes the way datepicker months are displayed
 *
 * @since 5.3.0
 */
class NgbDatepickerContent {
    constructor() {
        this.templateRef = inject(TemplateRef);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerContent, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbDatepickerContent, isStandalone: true, selector: "ng-template[ngbDatepickerContent]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbDatepickerContent]', standalone: true }]
        }] });
/**
 * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
 * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
 *
 * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
 *
 * @since 5.3.0
 */
class NgbDatepickerMonth {
    constructor() {
        this._keyboardService = inject(NgbDatepickerKeyboardService);
        this._service = inject(NgbDatepickerService);
        this.i18n = inject(NgbDatepickerI18n);
        this.datepicker = inject(NgbDatepicker);
    }
    /**
     * The first date of month to be rendered.
     *
     * This month must one of the months present in the
     * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
     */
    set month(month) {
        this.viewModel = this._service.getMonth(month);
    }
    onKeyDown(event) {
        this._keyboardService.processKey(event, this.datepicker);
    }
    doSelect(day) {
        if (!day.context.disabled && !day.hidden) {
            this.datepicker.onDateSelect(day.date);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerMonth, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbDatepickerMonth, isStandalone: true, selector: "ngb-datepicker-month", inputs: { month: "month" }, host: { attributes: { "role": "grid" }, listeners: { "keydown": "onKeyDown($event)" } }, ngImport: i0, template: `
		@if (viewModel.weekdays.length > 0) {
			<div class="ngb-dp-week ngb-dp-weekdays" role="row">
				@if (datepicker.showWeekNumbers) {
					<div class="ngb-dp-weekday ngb-dp-showweek small">{{ i18n.getWeekLabel() }}</div>
				}
				@for (weekday of viewModel.weekdays; track $index) {
					<div class="ngb-dp-weekday small" role="columnheader">{{ weekday }}</div>
				}
			</div>
		}
		@for (week of viewModel.weeks; track week) {
			@if (!week.collapsed) {
				<div class="ngb-dp-week" role="row">
					@if (datepicker.showWeekNumbers) {
						<div class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
					}
					@for (day of week.days; track day) {
						<div
							(click)="doSelect(day); $event.preventDefault()"
							class="ngb-dp-day"
							role="gridcell"
							[class.disabled]="day.context.disabled"
							[tabindex]="day.tabindex"
							[class.hidden]="day.hidden"
							[class.ngb-dp-today]="day.context.today"
							[attr.aria-label]="day.ariaLabel"
						>
							@if (!day.hidden) {
								<ng-template [ngTemplateOutlet]="datepicker.dayTemplate" [ngTemplateOutletContext]="day.context" />
							}
						</div>
					}
				</div>
			}
		}
	`, isInline: true, styles: ["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-tertiary-bg)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerMonth, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-datepicker-month', imports: [NgTemplateOutlet], host: {
                        role: 'grid',
                        '(keydown)': 'onKeyDown($event)',
                    }, encapsulation: ViewEncapsulation.None, template: `
		@if (viewModel.weekdays.length > 0) {
			<div class="ngb-dp-week ngb-dp-weekdays" role="row">
				@if (datepicker.showWeekNumbers) {
					<div class="ngb-dp-weekday ngb-dp-showweek small">{{ i18n.getWeekLabel() }}</div>
				}
				@for (weekday of viewModel.weekdays; track $index) {
					<div class="ngb-dp-weekday small" role="columnheader">{{ weekday }}</div>
				}
			</div>
		}
		@for (week of viewModel.weeks; track week) {
			@if (!week.collapsed) {
				<div class="ngb-dp-week" role="row">
					@if (datepicker.showWeekNumbers) {
						<div class="ngb-dp-week-number small text-muted">{{ i18n.getWeekNumerals(week.number) }}</div>
					}
					@for (day of week.days; track day) {
						<div
							(click)="doSelect(day); $event.preventDefault()"
							class="ngb-dp-day"
							role="gridcell"
							[class.disabled]="day.context.disabled"
							[tabindex]="day.tabindex"
							[class.hidden]="day.hidden"
							[class.ngb-dp-today]="day.context.today"
							[attr.aria-label]="day.ariaLabel"
						>
							@if (!day.hidden) {
								<ng-template [ngTemplateOutlet]="datepicker.dayTemplate" [ngTemplateOutletContext]="day.context" />
							}
						</div>
					}
				</div>
			}
		}
	`, styles: ["ngb-datepicker-month{display:block}.ngb-dp-weekday,.ngb-dp-week-number{line-height:2rem;text-align:center;font-style:italic}.ngb-dp-weekday{color:var(--bs-info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{border-bottom:1px solid var(--bs-border-color);border-radius:0;background-color:var(--bs-tertiary-bg)}.ngb-dp-day,.ngb-dp-weekday,.ngb-dp-week-number{width:2rem;height:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}\n"] }]
        }], propDecorators: { month: [{
                type: Input
            }] } });
/**
 * A highly configurable component that helps you with selecting calendar dates.
 *
 * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
 */
class NgbDatepicker {
    constructor() {
        this.injector = inject(Injector);
        this._service = inject(NgbDatepickerService);
        this._calendar = inject(NgbCalendar);
        this._i18n = inject(NgbDatepickerI18n);
        this._config = inject(NgbDatepickerConfig);
        this._nativeElement = inject(ElementRef).nativeElement;
        this._ngbDateAdapter = inject((NgbDateAdapter));
        this._ngZone = inject(NgZone);
        this._destroyRef = inject(DestroyRef);
        this._injector = inject(Injector);
        this._controlValue = null;
        this._publicState = {};
        this._initialized = false;
        /**
         * The reference to a custom template for the day.
         *
         * Allows to completely override the way a day 'cell' in the calendar is displayed.
         *
         * See [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext) for the data you get inside.
         */
        this.dayTemplate = this._config.dayTemplate;
        /**
         * The callback to pass any arbitrary data to the template cell via the
         * [`DayTemplateContext`](#/components/datepicker/api#DayTemplateContext)'s `data` parameter.
         *
         * `current` is the month that is currently displayed by the datepicker.
         *
         * @since 3.3.0
         */
        this.dayTemplateData = this._config.dayTemplateData;
        /**
         * The number of months to display.
         */
        this.displayMonths = this._config.displayMonths;
        /**
         * The first day of the week.
         *
         * With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun.
         */
        this.firstDayOfWeek = this._config.firstDayOfWeek;
        /**
         * The reference to the custom template for the datepicker footer.
         *
         * @since 3.3.0
         */
        this.footerTemplate = this._config.footerTemplate;
        /**
         * The callback to mark some dates as disabled.
         *
         * It is called for each new date when navigating to a different month.
         *
         * `current` is the month that is currently displayed by the datepicker.
         */
        this.markDisabled = this._config.markDisabled;
        /**
         * The latest date that can be displayed or selected.
         *
         * If not provided, 'year' select box will display 10 years after the current month.
         */
        this.maxDate = this._config.maxDate;
        /**
         * The earliest date that can be displayed or selected.
         *
         * If not provided, 'year' select box will display 10 years before the current month.
         */
        this.minDate = this._config.minDate;
        /**
         * Navigation type.
         *
         * * `"select"` - select boxes for month and navigation arrows
         * * `"arrows"` - only navigation arrows
         * * `"none"` - no navigation visible at all
         */
        this.navigation = this._config.navigation;
        /**
         * The way of displaying days that don't belong to the current month.
         *
         * * `"visible"` - days are visible
         * * `"hidden"` - days are hidden, white space preserved
         * * `"collapsed"` - days are collapsed, so the datepicker height might change between months
         *
         * For the 2+ months view, days in between months are never shown.
         */
        this.outsideDays = this._config.outsideDays;
        /**
         * If `true`, week numbers will be displayed.
         */
        this.showWeekNumbers = this._config.showWeekNumbers;
        /**
         * The date to open calendar with.
         *
         * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date is provided, calendar will open with current month.
         *
         * You could use `navigateTo(date)` method as an alternative.
         */
        this.startDate = this._config.startDate;
        /**
         * The way weekdays should be displayed.
         *
         * * `true` - weekdays are displayed using default width
         * * `false` - weekdays are not displayed
         * * `"short" | "long" | "narrow"` - weekdays are displayed using specified width
         *
         * @since 9.1.0
         */
        this.weekdays = this._config.weekdays;
        /**
         * An event emitted right before the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 5.2.0
         */
        this.dateSelect = new EventEmitter();
        this.onChange = (_) => { };
        this.onTouched = () => { };
        const cd = inject(ChangeDetectorRef);
        this._service.dateSelect$.pipe(takeUntilDestroyed()).subscribe((date) => {
            this.dateSelect.emit(date);
        });
        this._service.model$.pipe(takeUntilDestroyed()).subscribe((model) => {
            const newDate = model.firstDate;
            const oldDate = this.model ? this.model.firstDate : null;
            // update public state
            this._publicState = {
                maxDate: model.maxDate,
                minDate: model.minDate,
                firstDate: model.firstDate,
                lastDate: model.lastDate,
                focusedDate: model.focusDate,
                months: model.months.map((viewModel) => viewModel.firstDate),
            };
            let navigationPrevented = false;
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month },
                    preventDefault: () => (navigationPrevented = true),
                });
                // can't prevent the very first navigation
                if (navigationPrevented && oldDate !== null) {
                    this._service.open(oldDate);
                    return;
                }
            }
            const newSelectedDate = model.selectedDate;
            const newFocusedDate = model.focusDate;
            const oldFocusedDate = this.model ? this.model.focusDate : null;
            this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, this._controlValue)) {
                this._controlValue = newSelectedDate;
                this.onTouched();
                this.onChange(this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                this.focus();
            }
            cd.markForCheck();
        });
    }
    /**
     *  Returns the readonly public state of the datepicker
     *
     * @since 5.2.0
     */
    get state() {
        return this._publicState;
    }
    /**
     *  Returns the calendar service used in the specific datepicker instance.
     *
     *  @since 5.3.0
     */
    get calendar() {
        return this._calendar;
    }
    /**
     * Returns the i18n service used in the specific datepicker instance.
     *
     * @since 14.2.0
     */
    get i18n() {
        return this._i18n;
    }
    /**
     *  Focuses on given date.
     */
    focusDate(date) {
        this._service.focus(NgbDate.from(date));
    }
    /**
     *  Selects focused date.
     */
    focusSelect() {
        this._service.focusSelect();
    }
    focus() {
        afterNextRender({
            read: () => {
                this._nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]')?.focus();
            },
        }, { injector: this._injector });
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date) {
        this._service.open(NgbDate.from(date ? (date.day ? date : { ...date, day: 1 }) : null));
    }
    ngAfterViewInit() {
        this._ngZone.runOutsideAngular(() => {
            const focusIns$ = fromEvent(this._contentEl.nativeElement, 'focusin');
            const focusOuts$ = fromEvent(this._contentEl.nativeElement, 'focusout');
            // we're changing 'focusVisible' only when entering or leaving months view
            // and ignoring all focus events where both 'target' and 'related' target are day cells
            merge(focusIns$, focusOuts$)
                .pipe(filter((focusEvent) => {
                const target = focusEvent.target;
                const relatedTarget = focusEvent.relatedTarget;
                return !(target?.classList.contains('ngb-dp-day') &&
                    relatedTarget?.classList.contains('ngb-dp-day') &&
                    this._nativeElement.contains(target) &&
                    this._nativeElement.contains(relatedTarget));
            }), takeUntilDestroyed(this._destroyRef))
                .subscribe(({ type }) => this._ngZone.run(() => this._service.set({ focusVisible: type === 'focusin' })));
        });
    }
    ngOnInit() {
        if (this.model === undefined) {
            const inputs = {};
            [
                'dayTemplateData',
                'displayMonths',
                'markDisabled',
                'firstDayOfWeek',
                'navigation',
                'minDate',
                'maxDate',
                'outsideDays',
                'weekdays',
            ].forEach((name) => (inputs[name] = this[name]));
            this._service.set(inputs);
            this.navigateTo(this.startDate);
        }
        if (!this.dayTemplate) {
            this.dayTemplate = this._defaultDayTemplate;
        }
        this._initialized = true;
    }
    ngOnChanges(changes) {
        const inputs = {};
        [
            'dayTemplateData',
            'displayMonths',
            'markDisabled',
            'firstDayOfWeek',
            'navigation',
            'minDate',
            'maxDate',
            'outsideDays',
            'weekdays',
        ]
            .filter((name) => name in changes)
            .forEach((name) => (inputs[name] = this[name]));
        this._service.set(inputs);
        if ('startDate' in changes && this._initialized) {
            const { currentValue, previousValue } = changes.startDate;
            if (isChangedMonth(previousValue, currentValue)) {
                this.navigateTo(this.startDate);
            }
        }
    }
    onDateSelect(date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    }
    onNavigateDateSelect(date) {
        this._service.open(date);
    }
    onNavigateEvent(event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this._service.set({ disabled });
    }
    writeValue(value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepicker, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbDatepicker, isStandalone: true, selector: "ngb-datepicker", inputs: { contentTemplate: "contentTemplate", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", maxDate: "maxDate", minDate: "minDate", navigation: "navigation", outsideDays: "outsideDays", showWeekNumbers: "showWeekNumbers", startDate: "startDate", weekdays: "weekdays" }, outputs: { navigate: "navigate", dateSelect: "dateSelect" }, host: { properties: { "class.disabled": "model.disabled" } }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbDatepicker), multi: true },
            NgbDatepickerService,
        ], queries: [{ propertyName: "contentTemplateFromContent", first: true, predicate: NgbDatepickerContent, descendants: true, static: true }], viewQueries: [{ propertyName: "_defaultDayTemplate", first: true, predicate: ["defaultDayTemplate"], descendants: true, static: true }, { propertyName: "_contentEl", first: true, predicate: ["content"], descendants: true, static: true }], exportAs: ["ngbDatepicker"], usesOnChanges: true, ngImport: i0, template: `
		<ng-template
			#defaultDayTemplate
			let-date="date"
			let-currentMonth="currentMonth"
			let-selected="selected"
			let-disabled="disabled"
			let-focused="focused"
		>
			<div
				ngbDatepickerDayView
				[date]="date"
				[currentMonth]="currentMonth"
				[selected]="selected"
				[disabled]="disabled"
				[focused]="focused"
			>
			</div>
		</ng-template>

		<ng-template #defaultContentTemplate>
			@for (month of model.months; track month) {
				<div class="ngb-dp-month">
					@if (navigation === 'none' || (displayMonths > 1 && navigation === 'select')) {
						<div class="ngb-dp-month-name">
							{{ i18n.getMonthLabel(month.firstDate) }}
						</div>
					}
					<ngb-datepicker-month [month]="month.firstDate" />
				</div>
			}
		</ng-template>

		<div class="ngb-dp-header">
			@if (navigation !== 'none') {
				<ngb-datepicker-navigation
					[date]="model.firstDate!"
					[months]="model.months"
					[disabled]="model.disabled"
					[showSelect]="model.navigation === 'select'"
					[prevDisabled]="model.prevDisabled"
					[nextDisabled]="model.nextDisabled"
					[selectBoxes]="model.selectBoxes"
					(navigate)="onNavigateEvent($event)"
					(select)="onNavigateDateSelect($event)"
				/>
			}
		</div>

		<div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
			<ng-template
				[ngTemplateOutlet]="contentTemplate || contentTemplateFromContent?.templateRef || defaultContentTemplate"
				[ngTemplateOutletContext]="{ $implicit: this }"
				[ngTemplateOutletInjector]="injector"
			/>
		</div>

		<ng-template [ngTemplateOutlet]="footerTemplate" />
	`, isInline: true, styles: ["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-tertiary-bg)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-tertiary-bg)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: NgbDatepickerDayView, selector: "[ngbDatepickerDayView]", inputs: ["currentMonth", "date", "disabled", "focused", "selected"] }, { kind: "component", type: NgbDatepickerMonth, selector: "ngb-datepicker-month", inputs: ["month"] }, { kind: "component", type: NgbDatepickerNavigation, selector: "ngb-datepicker-navigation", inputs: ["date", "disabled", "months", "showSelect", "prevDisabled", "nextDisabled", "selectBoxes"], outputs: ["navigate", "select"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepicker, decorators: [{
            type: Component,
            args: [{ exportAs: 'ngbDatepicker', selector: 'ngb-datepicker', imports: [NgTemplateOutlet, NgbDatepickerDayView, NgbDatepickerMonth, NgbDatepickerNavigation], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[class.disabled]': 'model.disabled',
                    }, template: `
		<ng-template
			#defaultDayTemplate
			let-date="date"
			let-currentMonth="currentMonth"
			let-selected="selected"
			let-disabled="disabled"
			let-focused="focused"
		>
			<div
				ngbDatepickerDayView
				[date]="date"
				[currentMonth]="currentMonth"
				[selected]="selected"
				[disabled]="disabled"
				[focused]="focused"
			>
			</div>
		</ng-template>

		<ng-template #defaultContentTemplate>
			@for (month of model.months; track month) {
				<div class="ngb-dp-month">
					@if (navigation === 'none' || (displayMonths > 1 && navigation === 'select')) {
						<div class="ngb-dp-month-name">
							{{ i18n.getMonthLabel(month.firstDate) }}
						</div>
					}
					<ngb-datepicker-month [month]="month.firstDate" />
				</div>
			}
		</ng-template>

		<div class="ngb-dp-header">
			@if (navigation !== 'none') {
				<ngb-datepicker-navigation
					[date]="model.firstDate!"
					[months]="model.months"
					[disabled]="model.disabled"
					[showSelect]="model.navigation === 'select'"
					[prevDisabled]="model.prevDisabled"
					[nextDisabled]="model.nextDisabled"
					[selectBoxes]="model.selectBoxes"
					(navigate)="onNavigateEvent($event)"
					(select)="onNavigateDateSelect($event)"
				/>
			}
		</div>

		<div class="ngb-dp-content" [class.ngb-dp-months]="!contentTemplate" #content>
			<ng-template
				[ngTemplateOutlet]="contentTemplate || contentTemplateFromContent?.templateRef || defaultContentTemplate"
				[ngTemplateOutletContext]="{ $implicit: this }"
				[ngTemplateOutletInjector]="injector"
			/>
		</div>

		<ng-template [ngTemplateOutlet]="footerTemplate" />
	`, providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbDatepicker), multi: true },
                        NgbDatepickerService,
                    ], styles: ["ngb-datepicker{border:1px solid var(--bs-border-color);border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}ngb-datepicker.disabled .ngb-dp-weekday,ngb-datepicker.disabled .ngb-dp-week-number,ngb-datepicker.disabled .ngb-dp-month-name{color:var(--bs-text-muted)}.ngb-dp-body{z-index:1055}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem;background-color:var(--bs-tertiary-bg)}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center;background-color:var(--bs-tertiary-bg)}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}\n"] }]
        }], ctorParameters: () => [], propDecorators: { _defaultDayTemplate: [{
                type: ViewChild,
                args: ['defaultDayTemplate', { static: true }]
            }], _contentEl: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }], contentTemplate: [{
                type: Input
            }], contentTemplateFromContent: [{
                type: ContentChild,
                args: [NgbDatepickerContent, { static: true }]
            }], dayTemplate: [{
                type: Input
            }], dayTemplateData: [{
                type: Input
            }], displayMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], markDisabled: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], minDate: [{
                type: Input
            }], navigation: [{
                type: Input
            }], outsideDays: [{
                type: Input
            }], showWeekNumbers: [{
                type: Input
            }], startDate: [{
                type: Input
            }], weekdays: [{
                type: Input
            }], navigate: [{
                type: Output
            }], dateSelect: [{
                type: Output
            }] } });

const isContainedIn = (element, array) => array ? array.some((item) => item.contains(element)) : false;
const matchesSelectorIfAny = (element, selector) => !selector || closest(element, selector) != null;
// we have to add a more significant delay to avoid re-opening when handling (click) on a toggling element
// TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
const isMobile = (() => {
    const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
    const isAndroid = () => /Android/.test(navigator.userAgent);
    return typeof navigator !== 'undefined' ? !!navigator.userAgent && (isIOS() || isAndroid()) : false;
})();
// setting 'ngbAutoClose' synchronously on mobile results in immediate popup closing
// when tapping on the triggering element
const wrapAsyncForMobile = (fn) => (isMobile ? () => setTimeout(() => fn(), 100) : fn);
function ngbAutoClose(zone, document, type, close, closed$, insideElements, ignoreElements, insideSelector) {
    // closing on ESC and outside clicks
    if (type) {
        zone.runOutsideAngular(wrapAsyncForMobile(() => {
            const shouldCloseOnClick = (event) => {
                const element = event.target;
                if (event.button === 2 || isContainedIn(element, ignoreElements)) {
                    return false;
                }
                if (type === 'inside') {
                    return isContainedIn(element, insideElements) && matchesSelectorIfAny(element, insideSelector);
                }
                else if (type === 'outside') {
                    return !isContainedIn(element, insideElements);
                } /* if (type === true) */
                else {
                    return matchesSelectorIfAny(element, insideSelector) || !isContainedIn(element, insideElements);
                }
            };
            const escapes$ = fromEvent(document, 'keydown').pipe(takeUntil(closed$), filter((e) => e.key === 'Escape'), tap((e) => e.preventDefault()));
            // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown',
            // because on 'mouseup' DOM nodes might be detached
            const mouseDowns$ = fromEvent(document, 'mousedown').pipe(map(shouldCloseOnClick), takeUntil(closed$));
            const closeableClicks$ = fromEvent(document, 'mouseup').pipe(withLatestFrom(mouseDowns$), filter(([_, shouldClose]) => shouldClose), delay(0), takeUntil(closed$));
            race([escapes$.pipe(map((_) => 0 /* SOURCE.ESCAPE */)), closeableClicks$.pipe(map((_) => 1 /* SOURCE.CLICK */))]).subscribe((source) => zone.run(() => close(source)));
        }));
    }
}

const FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 */
function getFocusableBoundaryElements(element) {
    const list = Array.from(element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR)).filter((el) => el.tabIndex !== -1);
    return [list[0], list[list.length - 1]];
}
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
const ngbFocusTrap = (zone, element, stopFocusTrap$, refocusOnClick = false) => {
    zone.runOutsideAngular(() => {
        // last focused element
        const lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map((e) => e.target));
        // 'tab' / 'shift+tab' stream
        fromEvent(element, 'keydown')
            .pipe(takeUntil(stopFocusTrap$), filter((e) => e.key === 'Tab'), withLatestFrom(lastFocusedElement$))
            .subscribe(([tabEvent, focusedElement]) => {
            const [first, last] = getFocusableBoundaryElements(element);
            if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
                last.focus();
                tabEvent.preventDefault();
            }
            if (focusedElement === last && !tabEvent.shiftKey) {
                first.focus();
                tabEvent.preventDefault();
            }
        });
        // inside click
        if (refocusOnClick) {
            fromEvent(element, 'click')
                .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map((arr) => arr[1]))
                .subscribe((lastFocusedElement) => lastFocusedElement.focus());
        }
    });
};

class NgbRTL {
    constructor() {
        this._element = inject(DOCUMENT).documentElement;
    }
    isRTL() {
        return (this._element.getAttribute('dir') || '').toLowerCase() === 'rtl';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRTL, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRTL, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRTL, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const placementSeparator = /\s+/;
const spacesRegExp = /  +/gi;
/**
 * Matching classes from the Bootstrap ones to the poppers ones.
 * The first index of each array is used for the left to right direction,
 * the second one is used for the right to left, defaulting to the first index (when LTR and RTL lead to the same class)
 *
 * See [Bootstrap alignments](https://getbootstrap.com/docs/5.1/components/dropdowns/#alignment-options)
 * and [Popper placements](https://popper.js.org/docs/v2/constructors/#options)
 */
const bootstrapPopperMatches = {
    top: ['top'],
    bottom: ['bottom'],
    start: ['left', 'right'],
    left: ['left'],
    end: ['right', 'left'],
    right: ['right'],
    'top-start': ['top-start', 'top-end'],
    'top-left': ['top-start'],
    'top-end': ['top-end', 'top-start'],
    'top-right': ['top-end'],
    'bottom-start': ['bottom-start', 'bottom-end'],
    'bottom-left': ['bottom-start'],
    'bottom-end': ['bottom-end', 'bottom-start'],
    'bottom-right': ['bottom-end'],
    'start-top': ['left-start', 'right-start'],
    'left-top': ['left-start'],
    'start-bottom': ['left-end', 'right-end'],
    'left-bottom': ['left-end'],
    'end-top': ['right-start', 'left-start'],
    'right-top': ['right-start'],
    'end-bottom': ['right-end', 'left-end'],
    'right-bottom': ['right-end'],
};
function getPopperClassPlacement(placement, isRTL) {
    const [leftClass, rightClass] = bootstrapPopperMatches[placement];
    return isRTL ? rightClass || leftClass : leftClass;
}
const popperStartPrimaryPlacement = /^left/;
const popperEndPrimaryPlacement = /^right/;
const popperStartSecondaryPlacement = /^start/;
const popperEndSecondaryPlacement = /^end/;
function getBootstrapBaseClassPlacement(baseClass, placement) {
    let [primary, secondary] = placement.split('-');
    const newPrimary = primary.replace(popperStartPrimaryPlacement, 'start').replace(popperEndPrimaryPlacement, 'end');
    let classnames = [newPrimary];
    if (secondary) {
        let newSecondary = secondary;
        if (primary === 'left' || primary === 'right') {
            newSecondary = newSecondary
                .replace(popperStartSecondaryPlacement, 'top')
                .replace(popperEndSecondaryPlacement, 'bottom');
        }
        classnames.push(`${newPrimary}-${newSecondary}`);
    }
    if (baseClass) {
        classnames = classnames.map((classname) => `${baseClass}-${classname}`);
    }
    return classnames.join(' ');
}
/*
 * Accept the placement array and applies the appropriate placement dependent on the viewport.
 * Returns the applied placement.
 * In case of auto placement, placements are selected in order
 *   'top', 'bottom', 'start', 'end',
 *   'top-start', 'top-end',
 *   'bottom-start', 'bottom-end',
 *   'start-top', 'start-bottom',
 *   'end-top', 'end-bottom'.
 * */
function getPopperOptions({ placement, baseClass }, rtl) {
    let placementVals = Array.isArray(placement)
        ? placement
        : placement.split(placementSeparator);
    // No need to consider left and right here, as start and end are enough, and it is used for 'auto' placement only
    const allowedPlacements = [
        'top',
        'bottom',
        'start',
        'end',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'start-top',
        'start-bottom',
        'end-top',
        'end-bottom',
    ];
    // replace auto placement with other placements
    let hasAuto = placementVals.findIndex((val) => val === 'auto');
    if (hasAuto >= 0) {
        allowedPlacements.forEach(function (obj) {
            if (placementVals.find((val) => val.search('^' + obj) !== -1) == null) {
                placementVals.splice(hasAuto++, 1, obj);
            }
        });
    }
    const popperPlacements = placementVals.map((_placement) => {
        return getPopperClassPlacement(_placement, rtl.isRTL());
    });
    let mainPlacement = popperPlacements.shift();
    const bsModifier = {
        name: 'bootstrapClasses',
        enabled: !!baseClass,
        phase: 'write',
        fn({ state }) {
            const bsClassRegExp = new RegExp(baseClass + '(-[a-z]+)*', 'gi');
            const popperElement = state.elements.popper;
            const popperPlacement = state.placement;
            let className = popperElement.className;
            // Remove old bootstrap classes
            className = className.replace(bsClassRegExp, '');
            // Add current placements
            className += ` ${getBootstrapBaseClassPlacement(baseClass, popperPlacement)}`;
            // Remove multiple spaces
            className = className.trim().replace(spacesRegExp, ' ');
            // Reassign
            popperElement.className = className;
        },
    };
    return {
        placement: mainPlacement,
        modifiers: [
            bsModifier,
            flip,
            preventOverflow,
            arrow,
            {
                enabled: true,
                name: 'flip',
                options: {
                    fallbackPlacements: popperPlacements,
                },
            },
        ],
    };
}
function noop(arg) {
    return arg;
}
function ngbPositioning() {
    const rtl = inject(NgbRTL);
    let popperInstance = null;
    return {
        createPopper(positioningOption) {
            if (!popperInstance) {
                const updatePopperOptions = positioningOption.updatePopperOptions || noop;
                let popperOptions = updatePopperOptions(getPopperOptions(positioningOption, rtl));
                popperInstance = createPopperLite(positioningOption.hostElement, positioningOption.targetElement, popperOptions);
            }
        },
        update() {
            if (popperInstance) {
                popperInstance.update();
            }
        },
        setOptions(positioningOption) {
            if (popperInstance) {
                const updatePopperOptions = positioningOption.updatePopperOptions || noop;
                let popperOptions = updatePopperOptions(getPopperOptions(positioningOption, rtl));
                popperInstance.setOptions(popperOptions);
            }
        },
        destroy() {
            if (popperInstance) {
                popperInstance.destroy();
                popperInstance = null;
            }
        },
    };
}

function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
    return new NgbDateISOParserFormatter();
}
/**
 * An abstract service for parsing and formatting dates for the
 * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
 * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
 * input element.
 *
 * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
 * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
 * in the input.
 *
 * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
 * to use an alternative string format or a custom parsing logic.
 *
 * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
 */
class NgbDateParserFormatter {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateParserFormatter, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateParserFormatter, providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateParserFormatter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY }]
        }] });
class NgbDateISOParserFormatter extends NgbDateParserFormatter {
    parse(value) {
        if (value != null) {
            const dateParts = value.trim().split('-');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { year: toInteger(dateParts[0]), month: null, day: null };
            }
            else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
            }
            else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
            }
        }
        return null;
    }
    format(date) {
        return date
            ? `${date.year}-${isNumber(date.month) ? padNumber(date.month) : ''}-${isNumber(date.day) ? padNumber(date.day) : ''}`
            : '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateISOParserFormatter, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateISOParserFormatter }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateISOParserFormatter, decorators: [{
            type: Injectable
        }] });

/**
 * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepicker inputs used in the application.
 *
 * @since 5.2.0
 */
class NgbInputDatepickerConfig extends NgbDatepickerConfig {
    constructor() {
        super(...arguments);
        this.autoClose = true;
        this.placement = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
        this.popperOptions = (options) => options;
        this.restoreFocus = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbInputDatepickerConfig, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbInputDatepickerConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbInputDatepickerConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

function addPopperOffset(offset$1) {
    return (options) => {
        options.modifiers.push(offset, {
            name: 'offset',
            options: {
                offset: () => offset$1,
            },
        });
        return options;
    };
}

/**
 * A directive that allows to stick a datepicker popup to an input field.
 *
 * Manages interaction with the input field itself, does value formatting and provides forms integration.
 */
class NgbInputDatepicker {
    constructor() {
        this._parserFormatter = inject(NgbDateParserFormatter);
        this._elRef = inject((ElementRef));
        this._vcRef = inject(ViewContainerRef);
        this._ngZone = inject(NgZone);
        this._calendar = inject(NgbCalendar);
        this._dateAdapter = inject((NgbDateAdapter));
        this._document = inject(DOCUMENT);
        this._changeDetector = inject(ChangeDetectorRef);
        this._injector = inject(Injector);
        this._config = inject(NgbInputDatepickerConfig);
        this._cRef = null;
        this._disabled = false;
        this._elWithFocus = null;
        this._model = null;
        this._positioning = ngbPositioning();
        this._destroyCloseHandlers$ = new Subject();
        /**
         * Indicates whether the datepicker popup should be closed automatically after date selection / outside click or not.
         *
         * * `true` - the popup will close on both date selection and outside click.
         * * `false` - the popup can only be closed manually via `close()` or `toggle()` methods.
         * * `"inside"` - the popup will close on date selection, but not outside clicks.
         * * `"outside"` - the popup will close only on the outside click and not on date selection/inside clicks.
         *
         * @since 3.0.0
         */
        this.autoClose = this._config.autoClose;
        /**
         * The preferred placement of the datepicker popup, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"bottom-start bottom-end top-start top-end"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = this._config.placement;
        /**
         * Allows to change default Popper options when positioning the popup.
         * Receives current popper options and returns modified ones.
         *
         * @since 13.1.0
         */
        this.popperOptions = this._config.popperOptions;
        /**
         * A selector specifying the element the datepicker popup should be appended to.
         *
         * Currently only supports `"body"`.
         */
        this.container = this._config.container;
        /**
         * A css selector or html element specifying the element the datepicker popup should be positioned against.
         *
         * By default the input is used as a target.
         *
         * @since 4.2.0
         */
        this.positionTarget = this._config.positionTarget;
        /**
         * An event emitted when user selects a date using keyboard or mouse.
         *
         * The payload of the event is currently selected `NgbDate`.
         *
         * @since 1.1.1
         */
        this.dateSelect = new EventEmitter();
        /**
         * Event emitted right after the navigation happens and displayed month changes.
         *
         * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired after closing datepicker window.
         *
         * @since 4.2.0
         */
        this.closed = new EventEmitter();
        this._onChange = (_) => { };
        this._onTouched = () => { };
        this._validatorChange = () => { };
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value === '' || (value && value !== 'false');
        if (this.isOpen()) {
            this._cRef.instance.setDisabledState(this._disabled);
        }
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    registerOnValidatorChange(fn) {
        this._validatorChange = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    validate(c) {
        const { value } = c;
        if (value != null) {
            const ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
            if (!ngbDate) {
                return { ngbDate: { invalid: value } };
            }
            if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
                return { ngbDate: { minDate: { minDate: this.minDate, actual: value } } };
            }
            if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
                return { ngbDate: { maxDate: { maxDate: this.maxDate, actual: value } } };
            }
        }
        return null;
    }
    writeValue(value) {
        this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
        this._writeModelValue(this._model);
    }
    manualDateChange(value, updateView = false) {
        const inputValueChanged = value !== this._inputValue;
        if (inputValueChanged) {
            this._inputValue = value;
            this._model = this._fromDateStruct(this._parserFormatter.parse(value));
        }
        if (inputValueChanged || !updateView) {
            this._onChange(this._model ? this._dateAdapter.toModel(this._model) : value === '' ? null : value);
        }
        if (updateView && this._model) {
            this._writeModelValue(this._model);
        }
    }
    isOpen() {
        return !!this._cRef;
    }
    /**
     * Opens the datepicker popup.
     *
     * If the related form control contains a valid date, the corresponding month will be opened.
     */
    open() {
        if (!this.isOpen()) {
            this._cRef = this._vcRef.createComponent(NgbDatepicker, { injector: this._injector });
            this._applyPopupStyling(this._cRef.location.nativeElement);
            this._applyDatepickerInputs(this._cRef);
            this._subscribeForDatepickerOutputs(this._cRef.instance);
            this._cRef.instance.ngOnInit();
            this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
            // date selection event handling
            this._cRef.instance.registerOnChange((selectedDate) => {
                this.writeValue(selectedDate);
                this._onChange(selectedDate);
                this._onTouched();
            });
            this._cRef.changeDetectorRef.detectChanges();
            this._cRef.instance.setDisabledState(this.disabled);
            if (this.container === 'body') {
                this._document.querySelector(this.container)?.appendChild(this._cRef.location.nativeElement);
            }
            // focus handling
            this._elWithFocus = this._document.activeElement;
            ngbFocusTrap(this._ngZone, this._cRef.location.nativeElement, this.closed, true);
            setTimeout(() => this._cRef?.instance.focus());
            let hostElement;
            if (isString(this.positionTarget)) {
                hostElement = this._document.querySelector(this.positionTarget);
            }
            else if (this.positionTarget instanceof HTMLElement) {
                hostElement = this.positionTarget;
            }
            else {
                hostElement = this._elRef.nativeElement;
            }
            if (this.positionTarget && !hostElement) {
                throw new Error('ngbDatepicker could not find element declared in [positionTarget] to position against.');
            }
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                if (this._cRef && hostElement) {
                    this._positioning.createPopper({
                        hostElement,
                        targetElement: this._cRef.location.nativeElement,
                        placement: this.placement,
                        updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                    });
                    this._afterRenderRef = afterRender({
                        mixedReadWrite: () => {
                            this._positioning.update();
                        },
                    }, { injector: this._injector });
                }
            });
            this._setCloseHandlers();
        }
    }
    /**
     * Closes the datepicker popup.
     */
    close() {
        if (this.isOpen()) {
            this._cRef?.destroy();
            this._cRef = null;
            this._positioning.destroy();
            this._afterRenderRef?.destroy();
            this._destroyCloseHandlers$.next();
            this.closed.emit();
            this._changeDetector.markForCheck();
            // restore focus
            let elementToFocus = this._elWithFocus;
            if (isString(this.restoreFocus)) {
                elementToFocus = this._document.querySelector(this.restoreFocus);
            }
            else if (this.restoreFocus !== undefined) {
                elementToFocus = this.restoreFocus;
            }
            // in IE document.activeElement can contain an object without 'focus()' sometimes
            if (elementToFocus && elementToFocus['focus']) {
                elementToFocus.focus();
            }
            else {
                this._document.body.focus();
            }
        }
    }
    /**
     * Toggles the datepicker popup.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Navigates to the provided date.
     *
     * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     *
     * Use the `[startDate]` input as an alternative.
     */
    navigateTo(date) {
        if (this.isOpen()) {
            this._cRef.instance.navigateTo(date);
        }
    }
    onBlur() {
        this._onTouched();
    }
    onFocus() {
        this._elWithFocus = this._elRef.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes['minDate'] || changes['maxDate']) {
            this._validatorChange();
            if (this.isOpen()) {
                if (changes['minDate']) {
                    this._cRef.setInput('minDate', this.minDate);
                }
                if (changes['maxDate']) {
                    this._cRef.setInput('maxDate', this.maxDate);
                }
            }
        }
        if (changes['datepickerClass']) {
            const { currentValue, previousValue } = changes['datepickerClass'];
            this._applyPopupClass(currentValue, previousValue);
        }
        if (changes['autoClose'] && this.isOpen()) {
            this._setCloseHandlers();
        }
    }
    ngOnDestroy() {
        this.close();
    }
    _applyDatepickerInputs(datepickerComponentRef) {
        [
            'contentTemplate',
            'dayTemplate',
            'dayTemplateData',
            'displayMonths',
            'firstDayOfWeek',
            'footerTemplate',
            'markDisabled',
            'minDate',
            'maxDate',
            'navigation',
            'outsideDays',
            'showNavigation',
            'showWeekNumbers',
            'weekdays',
        ].forEach((inputName) => {
            if (this[inputName] !== undefined) {
                datepickerComponentRef.setInput(inputName, this[inputName]);
            }
        });
        datepickerComponentRef.setInput('startDate', this.startDate || this._model);
    }
    _applyPopupClass(newClass, oldClass) {
        const popupEl = this._cRef?.location.nativeElement;
        if (popupEl) {
            if (newClass) {
                popupEl.classList.add(newClass);
            }
            if (oldClass) {
                popupEl.classList.remove(oldClass);
            }
        }
    }
    _applyPopupStyling(nativeElement) {
        nativeElement.classList.add('dropdown-menu', 'show');
        if (this.container === 'body') {
            nativeElement.classList.add('ngb-dp-body');
        }
        this._applyPopupClass(this.datepickerClass);
    }
    _subscribeForDatepickerOutputs(datepickerInstance) {
        datepickerInstance.navigate.subscribe((navigateEvent) => this.navigate.emit(navigateEvent));
        datepickerInstance.dateSelect.subscribe((date) => {
            this.dateSelect.emit(date);
            if (this.autoClose === true || this.autoClose === 'inside') {
                this.close();
            }
        });
    }
    _writeModelValue(model) {
        const value = this._parserFormatter.format(model);
        this._inputValue = value;
        this._elRef.nativeElement.value = value;
        if (this.isOpen()) {
            this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
            this._onTouched();
        }
    }
    _fromDateStruct(date) {
        const ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
        return this._calendar.isValid(ngbDate) ? ngbDate : null;
    }
    _setCloseHandlers() {
        this._destroyCloseHandlers$.next();
        ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this._destroyCloseHandlers$, [], [this._elRef.nativeElement, this._cRef.location.nativeElement]);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbInputDatepicker, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbInputDatepicker, isStandalone: true, selector: "input[ngbDatepicker]", inputs: { autoClose: "autoClose", contentTemplate: "contentTemplate", datepickerClass: "datepickerClass", dayTemplate: "dayTemplate", dayTemplateData: "dayTemplateData", displayMonths: "displayMonths", firstDayOfWeek: "firstDayOfWeek", footerTemplate: "footerTemplate", markDisabled: "markDisabled", minDate: "minDate", maxDate: "maxDate", navigation: "navigation", outsideDays: "outsideDays", placement: "placement", popperOptions: "popperOptions", restoreFocus: "restoreFocus", showWeekNumbers: "showWeekNumbers", startDate: "startDate", container: "container", positionTarget: "positionTarget", weekdays: "weekdays", disabled: "disabled" }, outputs: { dateSelect: "dateSelect", navigate: "navigate", closed: "closed" }, host: { listeners: { "input": "manualDateChange($event.target.value)", "change": "manualDateChange($event.target.value, true)", "focus": "onFocus()", "blur": "onBlur()" }, properties: { "disabled": "disabled" } }, providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
            { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
            { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig },
        ], exportAs: ["ngbDatepicker"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbInputDatepicker, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[ngbDatepicker]',
                    exportAs: 'ngbDatepicker',
                    standalone: true,
                    host: {
                        '(input)': 'manualDateChange($event.target.value)',
                        '(change)': 'manualDateChange($event.target.value, true)',
                        '(focus)': 'onFocus()',
                        '(blur)': 'onBlur()',
                        '[disabled]': 'disabled',
                    },
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
                        { provide: NG_VALIDATORS, useExisting: forwardRef(() => NgbInputDatepicker), multi: true },
                        { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig },
                    ],
                }]
        }], propDecorators: { autoClose: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], datepickerClass: [{
                type: Input
            }], dayTemplate: [{
                type: Input
            }], dayTemplateData: [{
                type: Input
            }], displayMonths: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], footerTemplate: [{
                type: Input
            }], markDisabled: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], navigation: [{
                type: Input
            }], outsideDays: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], restoreFocus: [{
                type: Input
            }], showWeekNumbers: [{
                type: Input
            }], startDate: [{
                type: Input
            }], container: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], weekdays: [{
                type: Input
            }], dateSelect: [{
                type: Output
            }], navigate: [{
                type: Output
            }], closed: [{
                type: Output
            }], disabled: [{
                type: Input
            }] } });

class NgbCalendarHijri extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    getWeeksPerMonth() {
        return 6;
    }
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = this._setYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = this._setMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return this._setDay(date, date.day + number);
            default:
                return date;
        }
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        const day = this.toGregorian(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        const date = week[thursdayIndex];
        const jsDate = this.toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        const MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1)); // Compare with Muharram 1
        return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
    }
    getToday() {
        return this.fromGregorian(new Date());
    }
    isValid(date) {
        return (date != null &&
            isNumber(date.year) &&
            isNumber(date.month) &&
            isNumber(date.day) &&
            !isNaN(this.toGregorian(date).getTime()));
    }
    _setDay(date, day) {
        day = +day;
        let mDays = this.getDaysPerMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = this._setMonth(date, date.month - 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = this._setMonth(date, date.month + 1);
                mDays = this.getDaysPerMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    }
    _setMonth(date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor((((month - 1) % 12) + 12) % 12) + 1;
        return date;
    }
    _setYear(date, year) {
        date.year = +year;
        return date;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarHijri, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarHijri }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarHijri, decorators: [{
            type: Injectable
        }] });

/**
 * Checks if islamic year is a leap year
 */
function isIslamicLeapYear(hYear) {
    return (14 + 11 * hYear) % 30 < 11;
}
/**
 * Checks if gregorian years is a leap year
 */
function isGregorianLeapYear$1(gDate) {
    const year = gDate.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
/**
 * Returns the start of Hijri Month.
 * `hMonth` is 0 for Muharram, 1 for Safar, etc.
 * `hYear` is any Hijri hYear.
 */
function getIslamicMonthStart(hYear, hMonth) {
    return Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30.0);
}
/**
 * Returns the start of Hijri year.
 * `year` is any Hijri year.
 */
function getIslamicYearStart(year) {
    return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
}
function mod$1(a, b) {
    return a - b * Math.floor(a / b);
}
/**
 * The civil calendar is one type of Hijri calendars used in islamic countries.
 * Uses a fixed cycle of alternating 29- and 30-day months,
 * with a leap day added to the last month of 11 out of every 30 years.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
 * Dershowitz.
 */
const GREGORIAN_EPOCH$1 = 1721425.5;
const ISLAMIC_EPOCH = 1948439.5;
class NgbCalendarIslamicCivil extends NgbCalendarHijri {
    /**
     * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
     * `gDate` is a JS Date to be converted to Hijri.
     */
    fromGregorian(gDate) {
        const gYear = gDate.getFullYear(), gMonth = gDate.getMonth(), gDay = gDate.getDate();
        let julianDay = GREGORIAN_EPOCH$1 -
            1 +
            365 * (gYear - 1) +
            Math.floor((gYear - 1) / 4) +
            -Math.floor((gYear - 1) / 100) +
            Math.floor((gYear - 1) / 400) +
            Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear$1(gDate) ? -1 : -2) + gDay);
        julianDay = Math.floor(julianDay) + 0.5;
        const days = julianDay - ISLAMIC_EPOCH;
        const hYear = Math.floor((30 * days + 10646) / 10631.0);
        let hMonth = Math.ceil((days - 29 - getIslamicYearStart(hYear)) / 29.5);
        hMonth = Math.min(hMonth, 11);
        const hDay = Math.ceil(days - getIslamicMonthStart(hYear, hMonth)) + 1;
        return new NgbDate(hYear, hMonth + 1, hDay);
    }
    /**
     * Returns the equivalent JS date value for a give input islamic(civil) date.
     * `hDate` is an islamic(civil) date to be converted to Gregorian.
     */
    toGregorian(hDate) {
        const hYear = hDate.year;
        const hMonth = hDate.month - 1;
        const hDay = hDate.day;
        const julianDay = hDay + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
        const wjd = Math.floor(julianDay - 0.5) + 0.5, depoch = wjd - GREGORIAN_EPOCH$1, quadricent = Math.floor(depoch / 146097), dqc = mod$1(depoch, 146097), cent = Math.floor(dqc / 36524), dcent = mod$1(dqc, 36524), quad = Math.floor(dcent / 1461), dquad = mod$1(dcent, 1461), yindex = Math.floor(dquad / 365);
        let year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
        if (!(cent === 4 || yindex === 4)) {
            year++;
        }
        const gYearStart = GREGORIAN_EPOCH$1 +
            365 * (year - 1) +
            Math.floor((year - 1) / 4) -
            Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400);
        const yearday = wjd - gYearStart;
        const tjd = GREGORIAN_EPOCH$1 -
            1 +
            365 * (year - 1) +
            Math.floor((year - 1) / 4) -
            Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor(739 / 12 + (isGregorianLeapYear$1(new Date(year, 3, 1)) ? -1 : -2) + 1);
        const leapadj = wjd < tjd ? 0 : isGregorianLeapYear$1(new Date(year, 3, 1)) ? 1 : 2;
        const month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
        const tjd2 = GREGORIAN_EPOCH$1 -
            1 +
            365 * (year - 1) +
            Math.floor((year - 1) / 4) -
            Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear$1(new Date(year, month - 1, 1)) ? -1 : -2) + 1);
        const day = wjd - tjd2 + 1;
        return new Date(year, month - 1, day);
    }
    /**
     * Returns the number of days in a specific Hijri month.
     * `month` is 1 for Muharram, 2 for Safar, etc.
     * `year` is any Hijri year.
     */
    getDaysPerMonth(month, year) {
        year = year + Math.floor(month / 13);
        month = ((month - 1) % 12) + 1;
        let length = 29 + (month % 2);
        if (month === 12 && isIslamicLeapYear(year)) {
            length++;
        }
        return length;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarIslamicCivil, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarIslamicCivil }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarIslamicCivil, decorators: [{
            type: Injectable
        }] });

/**
 * Umalqura calendar is one type of Hijri calendars used in islamic countries.
 * This Calendar is used by Saudi Arabia for administrative purpose.
 * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
 * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
 */
const GREGORIAN_FIRST_DATE = new Date(1882, 10, 12);
const GREGORIAN_LAST_DATE = new Date(2174, 10, 25);
const HIJRI_BEGIN = 1300;
const HIJRI_END = 1600;
const ONE_DAY = 1000 * 60 * 60 * 24;
const MONTH_LENGTH = [
    // 1300-1304
    '101010101010',
    '110101010100',
    '111011001001',
    '011011010100',
    '011011101010',
    // 1305-1309
    '001101101100',
    '101010101101',
    '010101010101',
    '011010101001',
    '011110010010',
    // 1310-1314
    '101110101001',
    '010111010100',
    '101011011010',
    '010101011100',
    '110100101101',
    // 1315-1319
    '011010010101',
    '011101001010',
    '101101010100',
    '101101101010',
    '010110101101',
    // 1320-1324
    '010010101110',
    '101001001111',
    '010100010111',
    '011010001011',
    '011010100101',
    // 1325-1329
    '101011010101',
    '001011010110',
    '100101011011',
    '010010011101',
    '101001001101',
    // 1330-1334
    '110100100110',
    '110110010101',
    '010110101100',
    '100110110110',
    '001010111010',
    // 1335-1339
    '101001011011',
    '010100101011',
    '101010010101',
    '011011001010',
    '101011101001',
    // 1340-1344
    '001011110100',
    '100101110110',
    '001010110110',
    '100101010110',
    '101011001010',
    // 1345-1349
    '101110100100',
    '101111010010',
    '010111011001',
    '001011011100',
    '100101101101',
    // 1350-1354
    '010101001101',
    '101010100101',
    '101101010010',
    '101110100101',
    '010110110100',
    // 1355-1359
    '100110110110',
    '010101010111',
    '001010010111',
    '010101001011',
    '011010100011',
    // 1360-1364
    '011101010010',
    '101101100101',
    '010101101010',
    '101010101011',
    '010100101011',
    // 1365-1369
    '110010010101',
    '110101001010',
    '110110100101',
    '010111001010',
    '101011010110',
    // 1370-1374
    '100101010111',
    '010010101011',
    '100101001011',
    '101010100101',
    '101101010010',
    // 1375-1379
    '101101101010',
    '010101110101',
    '001001110110',
    '100010110111',
    '010001011011',
    // 1380-1384
    '010101010101',
    '010110101001',
    '010110110100',
    '100111011010',
    '010011011101',
    // 1385-1389
    '001001101110',
    '100100110110',
    '101010101010',
    '110101010100',
    '110110110010',
    // 1390-1394
    '010111010101',
    '001011011010',
    '100101011011',
    '010010101011',
    '101001010101',
    // 1395-1399
    '101101001001',
    '101101100100',
    '101101110001',
    '010110110100',
    '101010110101',
    // 1400-1404
    '101001010101',
    '110100100101',
    '111010010010',
    '111011001001',
    '011011010100',
    // 1405-1409
    '101011101001',
    '100101101011',
    '010010101011',
    '101010010011',
    '110101001001',
    // 1410-1414
    '110110100100',
    '110110110010',
    '101010111001',
    '010010111010',
    '101001011011',
    // 1415-1419
    '010100101011',
    '101010010101',
    '101100101010',
    '101101010101',
    '010101011100',
    // 1420-1424
    '010010111101',
    '001000111101',
    '100100011101',
    '101010010101',
    '101101001010',
    // 1425-1429
    '101101011010',
    '010101101101',
    '001010110110',
    '100100111011',
    '010010011011',
    // 1430-1434
    '011001010101',
    '011010101001',
    '011101010100',
    '101101101010',
    '010101101100',
    // 1435-1439
    '101010101101',
    '010101010101',
    '101100101001',
    '101110010010',
    '101110101001',
    // 1440-1444
    '010111010100',
    '101011011010',
    '010101011010',
    '101010101011',
    '010110010101',
    // 1445-1449
    '011101001001',
    '011101100100',
    '101110101010',
    '010110110101',
    '001010110110',
    // 1450-1454
    '101001010110',
    '111001001101',
    '101100100101',
    '101101010010',
    '101101101010',
    // 1455-1459
    '010110101101',
    '001010101110',
    '100100101111',
    '010010010111',
    '011001001011',
    // 1460-1464
    '011010100101',
    '011010101100',
    '101011010110',
    '010101011101',
    '010010011101',
    // 1465-1469
    '101001001101',
    '110100010110',
    '110110010101',
    '010110101010',
    '010110110101',
    // 1470-1474
    '001011011010',
    '100101011011',
    '010010101101',
    '010110010101',
    '011011001010',
    // 1475-1479
    '011011100100',
    '101011101010',
    '010011110101',
    '001010110110',
    '100101010110',
    // 1480-1484
    '101010101010',
    '101101010100',
    '101111010010',
    '010111011001',
    '001011101010',
    // 1485-1489
    '100101101101',
    '010010101101',
    '101010010101',
    '101101001010',
    '101110100101',
    // 1490-1494
    '010110110010',
    '100110110101',
    '010011010110',
    '101010010111',
    '010101000111',
    // 1495-1499
    '011010010011',
    '011101001001',
    '101101010101',
    '010101101010',
    '101001101011',
    // 1500-1504
    '010100101011',
    '101010001011',
    '110101000110',
    '110110100011',
    '010111001010',
    // 1505-1509
    '101011010110',
    '010011011011',
    '001001101011',
    '100101001011',
    '101010100101',
    // 1510-1514
    '101101010010',
    '101101101001',
    '010101110101',
    '000101110110',
    '100010110111',
    // 1515-1519
    '001001011011',
    '010100101011',
    '010101100101',
    '010110110100',
    '100111011010',
    // 1520-1524
    '010011101101',
    '000101101101',
    '100010110110',
    '101010100110',
    '110101010010',
    // 1525-1529
    '110110101001',
    '010111010100',
    '101011011010',
    '100101011011',
    '010010101011',
    // 1530-1534
    '011001010011',
    '011100101001',
    '011101100010',
    '101110101001',
    '010110110010',
    // 1535-1539
    '101010110101',
    '010101010101',
    '101100100101',
    '110110010010',
    '111011001001',
    // 1540-1544
    '011011010010',
    '101011101001',
    '010101101011',
    '010010101011',
    '101001010101',
    // 1545-1549
    '110100101001',
    '110101010100',
    '110110101010',
    '100110110101',
    '010010111010',
    // 1550-1554
    '101000111011',
    '010010011011',
    '101001001101',
    '101010101010',
    '101011010101',
    // 1555-1559
    '001011011010',
    '100101011101',
    '010001011110',
    '101000101110',
    '110010011010',
    // 1560-1564
    '110101010101',
    '011010110010',
    '011010111001',
    '010010111010',
    '101001011101',
    // 1565-1569
    '010100101101',
    '101010010101',
    '101101010010',
    '101110101000',
    '101110110100',
    // 1570-1574
    '010110111001',
    '001011011010',
    '100101011010',
    '101101001010',
    '110110100100',
    // 1575-1579
    '111011010001',
    '011011101000',
    '101101101010',
    '010101101101',
    '010100110101',
    // 1580-1584
    '011010010101',
    '110101001010',
    '110110101000',
    '110111010100',
    '011011011010',
    // 1585-1589
    '010101011011',
    '001010011101',
    '011000101011',
    '101100010101',
    '101101001010',
    // 1590-1594
    '101110010101',
    '010110101010',
    '101010101110',
    '100100101110',
    '110010001111',
    // 1595-1599
    '010100100111',
    '011010010101',
    '011010101010',
    '101011010110',
    '010101011101',
    // 1600
    '001010011101',
];
function getDaysDiff(date1, date2) {
    // Ignores the time part in date1 and date2:
    const time1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const time2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diff = Math.abs(time1 - time2);
    return Math.round(diff / ONE_DAY);
}
class NgbCalendarIslamicUmalqura extends NgbCalendarIslamicCivil {
    /**
     * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
     * `gdate` is s JS Date to be converted to Hijri.
     */
    fromGregorian(gDate) {
        let hDay = 1, hMonth = 0, hYear = 1300;
        let daysDiff = getDaysDiff(gDate, GREGORIAN_FIRST_DATE);
        if (gDate.getTime() - GREGORIAN_FIRST_DATE.getTime() >= 0 && gDate.getTime() - GREGORIAN_LAST_DATE.getTime() <= 0) {
            let year = 1300;
            for (let i = 0; i < MONTH_LENGTH.length; i++, year++) {
                for (let j = 0; j < 12; j++) {
                    let numOfDays = +MONTH_LENGTH[i][j] + 29;
                    if (daysDiff <= numOfDays) {
                        hDay = daysDiff + 1;
                        if (hDay > numOfDays) {
                            hDay = 1;
                            j++;
                        }
                        if (j > 11) {
                            j = 0;
                            year++;
                        }
                        hMonth = j;
                        hYear = year;
                        return new NgbDate(hYear, hMonth + 1, hDay);
                    }
                    daysDiff = daysDiff - numOfDays;
                }
            }
            return null;
        }
        else {
            return super.fromGregorian(gDate);
        }
    }
    /**
     * Converts the current Hijri date to Gregorian.
     */
    toGregorian(hDate) {
        const hYear = hDate.year;
        const hMonth = hDate.month - 1;
        const hDay = hDate.day;
        let gDate = new Date(GREGORIAN_FIRST_DATE);
        let dayDiff = hDay - 1;
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            for (let y = 0; y < hYear - HIJRI_BEGIN; y++) {
                for (let m = 0; m < 12; m++) {
                    dayDiff += +MONTH_LENGTH[y][m] + 29;
                }
            }
            for (let m = 0; m < hMonth; m++) {
                dayDiff += +MONTH_LENGTH[hYear - HIJRI_BEGIN][m] + 29;
            }
            gDate.setDate(GREGORIAN_FIRST_DATE.getDate() + dayDiff);
        }
        else {
            gDate = super.toGregorian(hDate);
        }
        return gDate;
    }
    /**
     * Returns the number of days in a specific Hijri hMonth.
     * `hMonth` is 1 for Muharram, 2 for Safar, etc.
     * `hYear` is any Hijri hYear.
     */
    getDaysPerMonth(hMonth, hYear) {
        if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
            const pos = hYear - HIJRI_BEGIN;
            return +MONTH_LENGTH[pos][hMonth - 1] + 29;
        }
        return super.getDaysPerMonth(hMonth, hYear);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarIslamicUmalqura, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarIslamicUmalqura }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarIslamicUmalqura, decorators: [{
            type: Injectable
        }] });

/**
 * Returns the equivalent JS date value for a give input Jalali date.
 * `jalaliDate` is an Jalali date to be converted to Gregorian.
 */
function toGregorian$3(jalaliDate) {
    let jdn = jalaliToJulian(jalaliDate.year, jalaliDate.month, jalaliDate.day);
    let date = julianToGregorian$1(jdn);
    date.setHours(6, 30, 3, 200);
    return date;
}
/**
 * Returns the equivalent jalali date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to jalali.
 * utc to local
 */
function fromGregorian$3(gdate) {
    let g2d = gregorianToJulian$1(gdate.getFullYear(), gdate.getMonth() + 1, gdate.getDate());
    return julianToJalali(g2d);
}
function setJalaliYear(date, yearValue) {
    date.year = +yearValue;
    return date;
}
function setJalaliMonth(date, month) {
    month = +month;
    date.year = date.year + Math.floor((month - 1) / 12);
    date.month = Math.floor((((month - 1) % 12) + 12) % 12) + 1;
    return date;
}
function setJalaliDay(date, day) {
    let mDays = getDaysPerMonth$1(date.month, date.year);
    if (day <= 0) {
        while (day <= 0) {
            date = setJalaliMonth(date, date.month - 1);
            mDays = getDaysPerMonth$1(date.month, date.year);
            day += mDays;
        }
    }
    else if (day > mDays) {
        while (day > mDays) {
            day -= mDays;
            date = setJalaliMonth(date, date.month + 1);
            mDays = getDaysPerMonth$1(date.month, date.year);
        }
    }
    date.day = day;
    return date;
}
function mod(a, b) {
    return a - b * Math.floor(a / b);
}
function div(a, b) {
    return Math.trunc(a / b);
}
/*
 This function determines if the Jalali (Persian) year is
 leap (366-day long) or is the common year (365 days), and
 finds the day in March (Gregorian calendar) of the first
 day of the Jalali year (jalaliYear).
 @param jalaliYear Jalali calendar year (-61 to 3177)
 @return
 leap: number of years since the last leap year (0 to 4)
 gYear: Gregorian year of the beginning of Jalali year
 march: the March day of Farvardin the 1st (1st day of jalaliYear)
 @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
 @see: http://www.fourmilab.ch/documents/calendar/
 */
function jalCal(jalaliYear) {
    // Jalali years starting the 33-year rule.
    let breaks = [
        -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178,
    ];
    const breaksLength = breaks.length;
    const gYear = jalaliYear + 621;
    let leapJ = -14;
    let jp = breaks[0];
    if (jalaliYear < jp || jalaliYear >= breaks[breaksLength - 1]) {
        throw new Error('Invalid Jalali year ' + jalaliYear);
    }
    // Find the limiting years for the Jalali year jalaliYear.
    let jump;
    for (let i = 1; i < breaksLength; i += 1) {
        const jm = breaks[i];
        jump = jm - jp;
        if (jalaliYear < jm) {
            break;
        }
        leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
    }
    let n = jalaliYear - jp;
    // Find the number of leap years from AD 621 to the beginning
    // of the current Jalali year in the Persian calendar.
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) {
        leapJ += 1;
    }
    // And the same in the Gregorian calendar (until the year gYear).
    const leapG = div(gYear, 4) - div((div(gYear, 100) + 1) * 3, 4) - 150;
    // Determine the Gregorian date of Farvardin the 1st.
    const march = 20 + leapJ - leapG;
    // Find how many years have passed since the last leap year.
    if (jump - n < 6) {
        n = n - jump + div(jump + 4, 33) * 33;
    }
    let leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
        leap = 4;
    }
    return { leap: leap, gy: gYear, march: march };
}
/*
 Calculates Gregorian and Julian calendar dates from the Julian Day number
 (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
 calendars) to some millions years ahead of the present.
 @param jdn Julian Day number
 @return
 gYear: Calendar year (years BC numbered 0, -1, -2, ...)
 gMonth: Calendar month (1 to 12)
 gDay: Calendar day of the month M (1 to 28/29/30/31)
 */
function julianToGregorian$1(julianDayNumber) {
    let j = 4 * julianDayNumber + 139361631;
    j = j + div(div(4 * julianDayNumber + 183187720, 146097) * 3, 4) * 4 - 3908;
    const i = div(mod(j, 1461), 4) * 5 + 308;
    const gDay = div(mod(i, 153), 5) + 1;
    const gMonth = mod(div(i, 153), 12) + 1;
    const gYear = div(j, 1461) - 100100 + div(8 - gMonth, 6);
    return new Date(gYear, gMonth - 1, gDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jy Jalali year (1 to 3100)
 @param jm Jalali month (1 to 12)
 @param jd Jalali day (1 to 29/31)
 @return Julian Day number
 */
function gregorianToJulian$1(gy, gm, gd) {
    let d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
}
/*
 Converts the Julian Day number to a date in the Jalali calendar.
 @param julianDayNumber Julian Day number
 @return
 jalaliYear: Jalali year (1 to 3100)
 jalaliMonth: Jalali month (1 to 12)
 jalaliDay: Jalali day (1 to 29/31)
 */
function julianToJalali(julianDayNumber) {
    let gy = julianToGregorian$1(julianDayNumber).getFullYear(), // Calculate Gregorian year (gy).
    jalaliYear = gy - 621, r = jalCal(jalaliYear), gregorianDay = gregorianToJulian$1(gy, 3, r.march), jalaliDay, jalaliMonth, numberOfDays;
    // Find number of days that passed since 1 Farvardin.
    numberOfDays = julianDayNumber - gregorianDay;
    if (numberOfDays >= 0) {
        if (numberOfDays <= 185) {
            // The first 6 months.
            jalaliMonth = 1 + div(numberOfDays, 31);
            jalaliDay = mod(numberOfDays, 31) + 1;
            return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
        }
        else {
            // The remaining months.
            numberOfDays -= 186;
        }
    }
    else {
        // Previous Jalali year.
        jalaliYear -= 1;
        numberOfDays += 179;
        if (r.leap === 1) {
            numberOfDays += 1;
        }
    }
    jalaliMonth = 7 + div(numberOfDays, 30);
    jalaliDay = mod(numberOfDays, 30) + 1;
    return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
}
/*
 Converts a date of the Jalali calendar to the Julian Day number.
 @param jYear Jalali year (1 to 3100)
 @param jMonth Jalali month (1 to 12)
 @param jDay Jalali day (1 to 29/31)
 @return Julian Day number
 */
function jalaliToJulian(jYear, jMonth, jDay) {
    let r = jalCal(jYear);
    return gregorianToJulian$1(r.gy, 3, r.march) + (jMonth - 1) * 31 - div(jMonth, 7) * (jMonth - 7) + jDay - 1;
}
/**
 * Returns the number of days in a specific jalali month.
 */
function getDaysPerMonth$1(month, year) {
    if (month <= 6) {
        return 31;
    }
    if (month <= 11) {
        return 30;
    }
    if (jalCal(year).leap === 0) {
        return 30;
    }
    return 29;
}

class NgbCalendarPersian extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    getWeeksPerMonth() {
        return 6;
    }
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = setJalaliYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setJalaliMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return setJalaliDay(date, date.day + number);
            default:
                return date;
        }
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        const day = toGregorian$3(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        const date = week[thursdayIndex];
        const jsDate = toGregorian$3(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        const startDate = toGregorian$3(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - startDate.getTime()) / 86400000) / 7) + 1;
    }
    getToday() {
        return fromGregorian$3(new Date());
    }
    isValid(date) {
        return (date != null &&
            isInteger(date.year) &&
            isInteger(date.month) &&
            isInteger(date.day) &&
            !isNaN(toGregorian$3(date).getTime()));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarPersian, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarPersian }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarPersian, decorators: [{
            type: Injectable
        }] });

const PARTS_PER_HOUR = 1080;
const PARTS_PER_DAY = 24 * PARTS_PER_HOUR;
const PARTS_FRACTIONAL_MONTH = 12 * PARTS_PER_HOUR + 793;
const PARTS_PER_MONTH = 29 * PARTS_PER_DAY + PARTS_FRACTIONAL_MONTH;
const BAHARAD = 11 * PARTS_PER_HOUR + 204;
const HEBREW_DAY_ON_JAN_1_1970 = 2092591;
const GREGORIAN_EPOCH = 1721425.5;
function isGregorianLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function numberOfFirstDayInYear(year) {
    let monthsBeforeYear = Math.floor((235 * year - 234) / 19);
    let fractionalMonthsBeforeYear = monthsBeforeYear * PARTS_FRACTIONAL_MONTH + BAHARAD;
    let dayNumber = monthsBeforeYear * 29 + Math.floor(fractionalMonthsBeforeYear / PARTS_PER_DAY);
    let timeOfDay = fractionalMonthsBeforeYear % PARTS_PER_DAY;
    let dayOfWeek = dayNumber % 7; // 0 == Monday
    if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
        dayNumber++;
        dayOfWeek = dayNumber % 7;
    }
    if (dayOfWeek === 1 && timeOfDay > 15 * PARTS_PER_HOUR + 204 && !isHebrewLeapYear(year)) {
        dayNumber += 2;
    }
    else if (dayOfWeek === 0 && timeOfDay > 21 * PARTS_PER_HOUR + 589 && isHebrewLeapYear(year - 1)) {
        dayNumber++;
    }
    return dayNumber;
}
function getDaysInGregorianMonth(month, year) {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (isGregorianLeapYear(year)) {
        days[1]++;
    }
    return days[month - 1];
}
function getHebrewMonths(year) {
    return isHebrewLeapYear(year) ? 13 : 12;
}
/**
 * Returns the number of days in a specific Hebrew year.
 * `year` is any Hebrew year.
 */
function getDaysInHebrewYear(year) {
    return numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
}
function isHebrewLeapYear(year) {
    if (year != null) {
        let b = (year * 12 + 17) % 19;
        return b >= (b < 0 ? -7 : 12);
    }
    return false;
}
/**
 * Returns the number of days in a specific Hebrew month.
 * `month` is 1 for Nisan, 2 for Iyar etc. Note: Hebrew leap year contains 13 months.
 * `year` is any Hebrew year.
 */
function getDaysInHebrewMonth(month, year) {
    let yearLength = numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
    let yearType = (yearLength <= 380 ? yearLength : yearLength - 30) - 353;
    let leapYear = isHebrewLeapYear(year);
    let daysInMonth = leapYear
        ? [30, 29, 29, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29]
        : [30, 29, 29, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    if (yearType > 0) {
        daysInMonth[2]++; // Kislev gets an extra day in normal or complete years.
    }
    if (yearType > 1) {
        daysInMonth[1]++; // Heshvan gets an extra day in complete years only.
    }
    return daysInMonth[month - 1];
}
function getDayNumberInHebrewYear(date) {
    let numberOfDay = 0;
    for (let i = 1; i < date.month; i++) {
        numberOfDay += getDaysInHebrewMonth(i, date.year);
    }
    return numberOfDay + date.day;
}
function setHebrewMonth(date, val) {
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getHebrewMonths(date.year) - date.month) {
                val -= getHebrewMonths(date.year) - date.month + 1;
                date.year++;
                date.month = 1;
            }
            else {
                date.month += val;
                val = 0;
            }
        }
        else {
            if (val >= date.month) {
                date.year--;
                val -= date.month;
                date.month = getHebrewMonths(date.year);
            }
            else {
                date.month -= val;
                val = 0;
            }
        }
    }
    return date;
}
function setHebrewDay(date, val) {
    let after = val >= 0;
    if (!after) {
        val = -val;
    }
    while (val > 0) {
        if (after) {
            if (val > getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date)) {
                val -= getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date) + 1;
                date.year++;
                date.month = 1;
                date.day = 1;
            }
            else if (val > getDaysInHebrewMonth(date.month, date.year) - date.day) {
                val -= getDaysInHebrewMonth(date.month, date.year) - date.day + 1;
                date.month++;
                date.day = 1;
            }
            else {
                date.day += val;
                val = 0;
            }
        }
        else {
            if (val >= date.day) {
                val -= date.day;
                date.month--;
                if (date.month === 0) {
                    date.year--;
                    date.month = getHebrewMonths(date.year);
                }
                date.day = getDaysInHebrewMonth(date.month, date.year);
            }
            else {
                date.day -= val;
                val = 0;
            }
        }
    }
    return date;
}
/**
 * Returns the equivalent Hebrew date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to Hebrew date.
 */
function fromGregorian$2(gdate) {
    const date = new Date(gdate);
    const gYear = date.getFullYear(), gMonth = date.getMonth(), gDay = date.getDate();
    let julianDay = GREGORIAN_EPOCH -
        1 +
        365 * (gYear - 1) +
        Math.floor((gYear - 1) / 4) -
        Math.floor((gYear - 1) / 100) +
        Math.floor((gYear - 1) / 400) +
        Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(gYear) ? -1 : -2) + gDay);
    julianDay = Math.floor(julianDay + 0.5);
    let daysSinceHebEpoch = julianDay - 347997;
    let monthsSinceHebEpoch = Math.floor((daysSinceHebEpoch * PARTS_PER_DAY) / PARTS_PER_MONTH);
    let hYear = Math.floor((monthsSinceHebEpoch * 19 + 234) / 235) + 1;
    let firstDayOfThisYear = numberOfFirstDayInYear(hYear);
    let dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    while (dayOfYear < 1) {
        hYear--;
        firstDayOfThisYear = numberOfFirstDayInYear(hYear);
        dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
    }
    let hMonth = 1;
    let hDay = dayOfYear;
    while (hDay > getDaysInHebrewMonth(hMonth, hYear)) {
        hDay -= getDaysInHebrewMonth(hMonth, hYear);
        hMonth++;
    }
    return new NgbDate(hYear, hMonth, hDay);
}
/**
 * Returns the equivalent JS date value for a given Hebrew date.
 * `hebrewDate` is an Hebrew date to be converted to Gregorian.
 */
function toGregorian$2(hebrewDate) {
    const hYear = hebrewDate.year;
    const hMonth = hebrewDate.month;
    const hDay = hebrewDate.day;
    let days = numberOfFirstDayInYear(hYear);
    for (let i = 1; i < hMonth; i++) {
        days += getDaysInHebrewMonth(i, hYear);
    }
    days += hDay;
    let diffDays = days - HEBREW_DAY_ON_JAN_1_1970;
    let after = diffDays >= 0;
    if (!after) {
        diffDays = -diffDays;
    }
    let gYear = 1970;
    let gMonth = 1;
    let gDay = 1;
    while (diffDays > 0) {
        if (after) {
            if (diffDays >= (isGregorianLeapYear(gYear) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear(gYear) ? 366 : 365;
                gYear++;
            }
            else if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                gMonth++;
            }
            else {
                gDay += diffDays;
                diffDays = 0;
            }
        }
        else {
            if (diffDays >= (isGregorianLeapYear(gYear - 1) ? 366 : 365)) {
                diffDays -= isGregorianLeapYear(gYear - 1) ? 366 : 365;
                gYear--;
            }
            else {
                if (gMonth > 1) {
                    gMonth--;
                }
                else {
                    gMonth = 12;
                    gYear--;
                }
                if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                    diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                }
                else {
                    gDay = getDaysInGregorianMonth(gMonth, gYear) - diffDays + 1;
                    diffDays = 0;
                }
            }
        }
    }
    return new Date(gYear, gMonth - 1, gDay);
}
function hebrewNumerals(numerals) {
    if (!numerals) {
        return '';
    }
    const hArray0_9 = ['', '\u05d0', '\u05d1', '\u05d2', '\u05d3', '\u05d4', '\u05d5', '\u05d6', '\u05d7', '\u05d8'];
    const hArray10_19 = [
        '\u05d9',
        '\u05d9\u05d0',
        '\u05d9\u05d1',
        '\u05d9\u05d2',
        '\u05d9\u05d3',
        '\u05d8\u05d5',
        '\u05d8\u05d6',
        '\u05d9\u05d6',
        '\u05d9\u05d7',
        '\u05d9\u05d8',
    ];
    const hArray20_90 = ['', '', '\u05db', '\u05dc', '\u05de', '\u05e0', '\u05e1', '\u05e2', '\u05e4', '\u05e6'];
    const hArray100_900 = [
        '',
        '\u05e7',
        '\u05e8',
        '\u05e9',
        '\u05ea',
        '\u05ea\u05e7',
        '\u05ea\u05e8',
        '\u05ea\u05e9',
        '\u05ea\u05ea',
        '\u05ea\u05ea\u05e7',
    ];
    const hArray1000_9000 = [
        '',
        '\u05d0',
        '\u05d1',
        '\u05d1\u05d0',
        '\u05d1\u05d1',
        '\u05d4',
        '\u05d4\u05d0',
        '\u05d4\u05d1',
        '\u05d4\u05d1\u05d0',
        '\u05d4\u05d1\u05d1',
    ];
    const geresh = '\u05f3', gershaim = '\u05f4';
    let mem = 0;
    let result = [];
    let step = 0;
    while (numerals > 0) {
        let m = numerals % 10;
        if (step === 0) {
            mem = m;
        }
        else if (step === 1) {
            if (m !== 1) {
                result.unshift(hArray20_90[m], hArray0_9[mem]);
            }
            else {
                result.unshift(hArray10_19[mem]);
            }
        }
        else if (step === 2) {
            result.unshift(hArray100_900[m]);
        }
        else {
            if (m !== 5) {
                result.unshift(hArray1000_9000[m], geresh, ' ');
            }
            break;
        }
        numerals = Math.floor(numerals / 10);
        if (step === 0 && numerals === 0) {
            result.unshift(hArray0_9[m]);
        }
        step++;
    }
    result = result.join('').split('');
    if (result.length === 1) {
        result.push(geresh);
    }
    else if (result.length > 1) {
        result.splice(result.length - 1, 0, gershaim);
    }
    return result.join('');
}

/**
 * @since 3.2.0
 */
class NgbCalendarHebrew extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths(year) {
        if (year && isHebrewLeapYear(year)) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        }
        else {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        }
    }
    getWeeksPerMonth() {
        return 6;
    }
    isValid(date) {
        if (date != null) {
            let b = isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
            b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
            b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
            return b && !isNaN(toGregorian$2(date).getTime());
        }
        return false;
    }
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date.year += number;
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setHebrewMonth(date, number);
                date.day = 1;
                return date;
            case 'd':
                return setHebrewDay(date, number);
            default:
                return date;
        }
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        const day = toGregorian$2(date).getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        const date = week[week.length - 1];
        return Math.ceil(getDayNumberInHebrewYear(date) / 7);
    }
    getToday() {
        return fromGregorian$2(new Date());
    }
    /**
     * @since 3.4.0
     */
    toGregorian(date) {
        return fromJSDate(toGregorian$2(date));
    }
    /**
     * @since 3.4.0
     */
    fromGregorian(date) {
        return fromGregorian$2(toJSDate(date));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarHebrew, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarHebrew }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarHebrew, decorators: [{
            type: Injectable
        }] });

const WEEKDAYS$1 = ['שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון'];
const MONTHS$1 = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
const MONTHS_LEAP = [
    'תשרי',
    'חשון',
    'כסלו',
    'טבת',
    'שבט',
    'אדר א׳',
    'אדר ב׳',
    'ניסן',
    'אייר',
    'סיון',
    'תמוז',
    'אב',
    'אלול',
];
/**
 * @since 3.2.0
 */
class NgbDatepickerI18nHebrew extends NgbDatepickerI18n {
    getMonthShortName(month, year) {
        return this.getMonthFullName(month, year);
    }
    getMonthFullName(month, year) {
        return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] || '' : MONTHS$1[month - 1] || '';
    }
    getWeekdayLabel(weekday, width) {
        return WEEKDAYS$1[weekday - 1] || '';
    }
    getDayAriaLabel(date) {
        return `${hebrewNumerals(date.day)} ${this.getMonthFullName(date.month, date.year)} ${hebrewNumerals(date.year)}`;
    }
    getDayNumerals(date) {
        return hebrewNumerals(date.day);
    }
    getWeekNumerals(weekNumber) {
        return hebrewNumerals(weekNumber);
    }
    getYearNumerals(year) {
        return hebrewNumerals(year);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18nHebrew, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18nHebrew }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18nHebrew, decorators: [{
            type: Injectable
        }] });

/**
 * Returns the equivalent JS date value for a give input Buddhist date.
 * `date` is an Buddhist date to be converted to Gregorian.
 */
function toGregorian$1(date) {
    return new Date(date.year - 543, date.month - 1, date.day);
}
/**
 * Returns the equivalent Buddhist date value for a give input Gregorian date.
 * `gdate` is a JS Date to be converted to Buddhist.
 * utc to local
 */
function fromGregorian$1(gdate) {
    return new NgbDate(gdate.getFullYear() + 543, gdate.getMonth() + 1, gdate.getDate());
}

/**
 * @since 9.1.0
 */
class NgbCalendarBuddhist extends NgbCalendarGregorian {
    getToday() {
        return fromGregorian$1(new Date());
    }
    getNext(date, period = 'd', number = 1) {
        let jsDate = toGregorian$1(date);
        let checkMonth = true;
        let expectedMonth = jsDate.getMonth();
        switch (period) {
            case 'y':
                jsDate.setFullYear(jsDate.getFullYear() + number);
                break;
            case 'm':
                expectedMonth += number;
                jsDate.setMonth(expectedMonth);
                expectedMonth = expectedMonth % 12;
                if (expectedMonth < 0) {
                    expectedMonth = expectedMonth + 12;
                }
                break;
            case 'd':
                jsDate.setDate(jsDate.getDate() + number);
                checkMonth = false;
                break;
            default:
                return date;
        }
        if (checkMonth && jsDate.getMonth() !== expectedMonth) {
            // this means the destination month has less days than the initial month
            // let's go back to the end of the previous month:
            jsDate.setDate(0);
        }
        return fromGregorian$1(jsDate);
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        let jsDate = toGregorian$1(date);
        let day = jsDate.getDay();
        // in JS Date Sun=0, in ISO 8601 Sun=7
        return day === 0 ? 7 : day;
    }
    getWeekNumber(week, firstDayOfWeek) {
        // in JS Date Sun=0, in ISO 8601 Sun=7
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        let date = week[thursdayIndex];
        const jsDate = toGregorian$1(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        jsDate.setMonth(0); // Compare with Jan 1
        jsDate.setDate(1);
        return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
    }
    isValid(date) {
        if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
            return false;
        }
        // year 0 doesn't exist in Gregorian calendar
        if (date.year === 0) {
            return false;
        }
        const jsDate = toGregorian$1(date);
        return (!isNaN(jsDate.getTime()) &&
            jsDate.getFullYear() === date.year - 543 &&
            jsDate.getMonth() + 1 === date.month &&
            jsDate.getDate() === date.day);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarBuddhist, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarBuddhist }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarBuddhist, decorators: [{
            type: Injectable
        }] });

const JD_EPOCH = 1724220.5;
const DAYSPERMONTH = [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5];
/**
 * Determine whether this date is in a leap year.
 * * `year` is the year to examine
 * returns boolean - true if this is a leap year, false if not
 * */
function isEthiopianLeapYear(year) {
    if (year != null) {
        return year % 4 == 3 || year % 4 == -1;
    }
    return false;
}
/**
 * Sets the Ethiopian year.
 * * `date` is Ethiopian date
 * * `yearValue` incremented year
 * returns NgbDate - ethiopian date
 * */
function setEthiopianYear(date, yearValue) {
    date.year = +yearValue;
    return date;
}
/**
 * Sets the Ethiopian month.
 * * `date` is Ethiopian date
 * * `val` incremented month
 * returns NgbDate - Ethiopian date
 * */
function setEthiopianMonth(date, val) {
    val = +val;
    date.year = date.year + Math.floor((val - 1) / 13);
    date.month = Math.floor((((val - 1) % 13) + 13) % 13) + 1;
    return date;
}
/**
 * Sets the Ethiopian day.
 * * `date` is Ethiopian date
 * * `day` incremented day
 * returns NgbDate - Ethiopian date
 * */
function setEthiopianDay(date, day) {
    let mDays = getDaysPerMonth(date.month, date.year);
    if (day <= 0) {
        while (day <= 0) {
            date = setEthiopianMonth(date, date.month - 1);
            mDays = getDaysPerMonth(date.month, date.year);
            day += mDays;
        }
    }
    else if (day > mDays) {
        while (day > mDays) {
            day -= mDays;
            date = setEthiopianMonth(date, date.month + 1);
            mDays = getDaysPerMonth(date.month, date.year);
        }
    }
    date.day = day;
    return date;
}
function getDaysPerMonth(month, year) {
    let leapYear = isEthiopianLeapYear(year);
    return DAYSPERMONTH[month - 1] + (month === 13 && leapYear ? 1 : 0);
}
function toGregorian(ethiopianDate) {
    let jdn = ethiopianToJulian(ethiopianDate.year, ethiopianDate.month, ethiopianDate.day);
    let date = julianToGregorian(jdn);
    date.setHours(6, 30, 3, 200);
    return date;
}
function fromGregorian(gdate) {
    let g2d = gregorianToJulian(gdate.getFullYear(), gdate.getMonth() + 1, gdate.getDate());
    return juilianToEthiopia(g2d);
}
function ethiopianToJulian(year, month, day) {
    if (year < 0) {
        year++;
    } // No year zero
    return day + (month - 1) * 30 + (year - 1) * 365 + Math.floor(year / 4) + JD_EPOCH - 1;
}
function juilianToEthiopia(jd) {
    let c = Math.floor(jd) + 0.5 - JD_EPOCH;
    let year = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1;
    if (year <= 0) {
        year--;
    } // No year zero
    c = Math.floor(jd) + 0.5 - ethiopianToJulian(year, 1, 1);
    let month = Math.floor(c / 30) + 1;
    let day = c - (month - 1) * 30 + 1;
    return new NgbDate(year, month, day);
}
function julianToGregorian(jd) {
    let z = Math.floor(jd + 0.5);
    let a = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + a - Math.floor(a / 4);
    let b = a + 1524;
    let c = Math.floor((b - 122.1) / 365.25);
    let d = Math.floor(365.25 * c);
    let e = Math.floor((b - d) / 30.6001);
    let day = b - d - Math.floor(e * 30.6001);
    let month = e - (e > 13.5 ? 13 : 1);
    let year = c - (month > 2.5 ? 4716 : 4715);
    if (year <= 0) {
        year--;
    } // No year zero
    return new Date(year, month, day);
}
function gregorianToJulian(year, month, day) {
    if (year < 0) {
        year++;
    } // No year zero
    // Jean Meeus algorithm, "Astronomical Algorithms", 1991
    if (month < 3) {
        month += 12;
        year--;
    }
    let a = Math.floor(year / 100);
    let b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5;
}

/**
 * @since 16.0.0
 */
class NgbCalendarEthiopian extends NgbCalendar {
    getDaysPerWeek() {
        return 7;
    }
    getMonths(year) {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    }
    getNext(date, period = 'd', number = 1) {
        date = new NgbDate(date.year, date.month, date.day);
        switch (period) {
            case 'y':
                date = setEthiopianYear(date, date.year + number);
                date.month = 1;
                date.day = 1;
                return date;
            case 'm':
                date = setEthiopianMonth(date, date.month + number);
                date.day = 1;
                return date;
            case 'd':
                return setEthiopianDay(date, date.day + number);
            default:
                return date;
        }
    }
    getPrev(date, period = 'd', number = 1) {
        return this.getNext(date, period, -number);
    }
    getWeekday(date) {
        const dt = Math.floor(ethiopianToJulian(date.year, date.month, date.day) + 3) % 7;
        return dt === 0 ? 7 : dt;
    }
    getWeekNumber(week, firstDayOfWeek) {
        if (firstDayOfWeek === 7) {
            firstDayOfWeek = 0;
        }
        const thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
        const date = week[thursdayIndex];
        const jsDate = toGregorian(date);
        jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
        const time = jsDate.getTime();
        const startDate = toGregorian(new NgbDate(date.year, 1, 1));
        return Math.floor(Math.round((time - startDate.getTime()) / 86400000) / 7) + 1;
    }
    getWeeksPerMonth() {
        return 6;
    }
    getToday() {
        return fromGregorian(new Date());
    }
    isValid(date) {
        return (date &&
            isInteger(date.year) &&
            isInteger(date.month) &&
            isInteger(date.day) &&
            !isNaN(toGregorian(date).getTime()));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarEthiopian, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarEthiopian }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbCalendarEthiopian, decorators: [{
            type: Injectable
        }] });

const WEEKDAYS = ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሓሙስ', 'ዓርብ', 'ቅዳሜ'];
const MONTHS = ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታህሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'];
/**
 * @since 16.0.0
 */
class NgbDatepickerI18nAmharic extends NgbDatepickerI18n {
    getMonthShortName(month, year) {
        return this.getMonthFullName(month, year);
    }
    getMonthFullName(month, year) {
        return MONTHS[month - 1];
    }
    getWeekdayLabel(weekday, width) {
        return WEEKDAYS[weekday - 1];
    }
    getDayAriaLabel(date) {
        return `${date.day} ${this.getMonthFullName(date.month, date.year)} ${date.year}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18nAmharic, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18nAmharic }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerI18nAmharic, decorators: [{
            type: Injectable
        }] });

/**
 * [`NgbDateAdapter`](#/components/datepicker/api#NgbDateAdapter) implementation that uses
 * native javascript dates as a user date model.
 */
class NgbDateNativeAdapter extends NgbDateAdapter {
    /**
     * Converts a native `Date` to a `NgbDateStruct`.
     */
    fromModel(date) {
        return date instanceof Date && !isNaN(date.getTime()) ? this._fromNativeDate(date) : null;
    }
    /**
     * Converts a `NgbDateStruct` to a native `Date`.
     */
    toModel(date) {
        return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)
            ? this._toNativeDate(date)
            : null;
    }
    _fromNativeDate(date) {
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
    _toNativeDate(date) {
        const jsDate = new Date(date.year, date.month - 1, date.day, 12);
        // avoid 30 -> 1930 conversion
        jsDate.setFullYear(date.year);
        return jsDate;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateNativeAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateNativeAdapter }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateNativeAdapter, decorators: [{
            type: Injectable
        }] });

/**
 * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
 *
 * @since 3.2.0
 */
class NgbDateNativeUTCAdapter extends NgbDateNativeAdapter {
    _fromNativeDate(date) {
        return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
    }
    _toNativeDate(date) {
        const jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
        // avoid 30 -> 1930 conversion
        jsDate.setUTCFullYear(date.year);
        return jsDate;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateNativeUTCAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateNativeUTCAdapter }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDateNativeUTCAdapter, decorators: [{
            type: Injectable
        }] });

const NGB_DATEPICKER_DIRECTIVES = [NgbDatepicker, NgbDatepickerContent, NgbInputDatepicker, NgbDatepickerMonth];
class NgbDatepickerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerModule, imports: [NgbDatepicker, NgbDatepickerContent, NgbInputDatepicker, NgbDatepickerMonth], exports: [NgbDatepicker, NgbDatepickerContent, NgbInputDatepicker, NgbDatepickerMonth] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: NGB_DATEPICKER_DIRECTIVES,
                    imports: NGB_DATEPICKER_DIRECTIVES,
                }]
        }] });

/**
 * A configuration service for the [`NgbDropdown`](#/components/dropdown/api#NgbDropdown) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the dropdowns used in the application.
 */
class NgbDropdownConfig {
    constructor() {
        this.autoClose = true;
        this.placement = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
        this.popperOptions = (options) => options;
        this.container = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * @since 4.1.0
 */
class NgbDropdownItem {
    constructor() {
        this._disabled = false;
        this.nativeElement = inject(ElementRef).nativeElement;
        this.tabindex = 0;
    }
    set disabled(value) {
        this._disabled = value === '' || value === true; // accept an empty attribute as true
    }
    get disabled() {
        return this._disabled;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbDropdownItem, isStandalone: true, selector: "[ngbDropdownItem]", inputs: { tabindex: "tabindex", disabled: "disabled" }, host: { properties: { "class.disabled": "disabled", "tabIndex": "disabled ? -1 : tabindex" }, classAttribute: "dropdown-item" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownItem]',
                    standalone: true,
                    host: {
                        class: 'dropdown-item',
                        '[class.disabled]': 'disabled',
                        '[tabIndex]': 'disabled ? -1 : tabindex',
                    },
                }]
        }], propDecorators: { tabindex: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
/**
 * A directive that will be applied if dropdown item is a button.
 * It will only set the disabled property.
 */
class NgbDropdownButtonItem {
    constructor() {
        this.item = inject(NgbDropdownItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownButtonItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbDropdownButtonItem, isStandalone: true, selector: "button[ngbDropdownItem]", host: { properties: { "disabled": "item.disabled" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownButtonItem, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbDropdownItem]',
                    standalone: true,
                    host: { '[disabled]': 'item.disabled' },
                }]
        }] });
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
class NgbDropdownMenu {
    constructor() {
        this.dropdown = inject(NgbDropdown);
        this.nativeElement = inject(ElementRef).nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownMenu, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbDropdownMenu, isStandalone: true, selector: "[ngbDropdownMenu]", host: { listeners: { "keydown.ArrowUp": "dropdown.onKeyDown($event)", "keydown.ArrowDown": "dropdown.onKeyDown($event)", "keydown.Home": "dropdown.onKeyDown($event)", "keydown.End": "dropdown.onKeyDown($event)", "keydown.Enter": "dropdown.onKeyDown($event)", "keydown.Space": "dropdown.onKeyDown($event)", "keydown.Tab": "dropdown.onKeyDown($event)", "keydown.Shift.Tab": "dropdown.onKeyDown($event)" }, properties: { "class.show": "dropdown.isOpen()" }, classAttribute: "dropdown-menu" }, queries: [{ propertyName: "menuItems", predicate: NgbDropdownItem }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownMenu, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownMenu]',
                    standalone: true,
                    host: {
                        class: 'dropdown-menu',
                        '[class.show]': 'dropdown.isOpen()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Enter)': 'dropdown.onKeyDown($event)',
                        '(keydown.Space)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)',
                    },
                }]
        }], propDecorators: { menuItems: [{
                type: ContentChildren,
                args: [NgbDropdownItem]
            }] } });
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * @since 1.1.0
 */
class NgbDropdownAnchor {
    constructor() {
        this.dropdown = inject(NgbDropdown);
        this.nativeElement = inject(ElementRef).nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownAnchor, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbDropdownAnchor, isStandalone: true, selector: "[ngbDropdownAnchor]", host: { properties: { "class.show": "dropdown.isOpen()", "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownAnchor, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownAnchor]',
                    standalone: true,
                    host: {
                        class: 'dropdown-toggle',
                        '[class.show]': 'dropdown.isOpen()',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                    },
                }]
        }] });
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
class NgbDropdownToggle extends NgbDropdownAnchor {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownToggle, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbDropdownToggle, isStandalone: true, selector: "[ngbDropdownToggle]", host: { listeners: { "click": "dropdown.toggle()", "keydown.ArrowUp": "dropdown.onKeyDown($event)", "keydown.ArrowDown": "dropdown.onKeyDown($event)", "keydown.Home": "dropdown.onKeyDown($event)", "keydown.End": "dropdown.onKeyDown($event)", "keydown.Tab": "dropdown.onKeyDown($event)", "keydown.Shift.Tab": "dropdown.onKeyDown($event)" }, properties: { "class.show": "dropdown.isOpen()", "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownToggle]',
                    standalone: true,
                    host: {
                        class: 'dropdown-toggle',
                        '[class.show]': 'dropdown.isOpen()',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                        '(click)': 'dropdown.toggle()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)',
                    },
                    providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }],
                }]
        }] });
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
class NgbDropdown {
    constructor() {
        this._changeDetector = inject(ChangeDetectorRef);
        this._config = inject(NgbDropdownConfig);
        this._document = inject(DOCUMENT);
        this._injector = inject(Injector);
        this._ngZone = inject(NgZone);
        this._nativeElement = inject(ElementRef).nativeElement;
        this._destroyCloseHandlers$ = new Subject();
        this._bodyContainer = null;
        this._positioning = ngbPositioning();
        /**
         * Indicates whether the dropdown should be closed when clicking one of dropdown items or pressing ESC.
         *
         * * `true` - the dropdown will close on both outside and inside (menu) clicks.
         * * `false` - the dropdown can only be closed manually via `close()` or `toggle()` methods.
         * * `"inside"` - the dropdown will close on inside menu clicks, but not outside clicks.
         * * `"outside"` - the dropdown will close only on the outside clicks and not on menu clicks.
         */
        this.autoClose = this._config.autoClose;
        /**
         * Defines whether or not the dropdown menu is opened initially.
         */
        this._open = false;
        /**
         * The preferred placement of the dropdown, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"bottom-start bottom-end top-start top-end"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = this._config.placement;
        /**
         * Allows to change default Popper options when positioning the dropdown.
         * Receives current popper options and returns modified ones.
         *
         * @since 13.1.0
         */
        this.popperOptions = this._config.popperOptions;
        /**
         * A selector specifying the element the dropdown should be appended to.
         * Currently only supports "body".
         *
         * @since 4.1.0
         */
        this.container = this._config.container;
        /**
         * An event fired when the dropdown is opened or closed.
         *
         * The event payload is a `boolean`:
         * * `true` - the dropdown was opened
         * * `false` - the dropdown was closed
         */
        this.openChange = new EventEmitter();
    }
    ngOnInit() {
        if (!this.display) {
            this.display = this._nativeElement.closest('.navbar') ? 'static' : 'dynamic';
        }
    }
    ngAfterContentInit() {
        afterNextRender({
            write: () => {
                this._applyPlacementClasses();
                if (this._open) {
                    this._setCloseHandlers();
                }
            },
        }, { injector: this._injector });
    }
    ngOnChanges(changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.firstChange) {
            this._positioning.setOptions({
                hostElement: this._anchor.nativeElement,
                targetElement: this._bodyContainer || this._menu.nativeElement,
                placement: this.placement,
            });
            this._applyPlacementClasses();
        }
        if (changes.dropdownClass) {
            const { currentValue, previousValue } = changes.dropdownClass;
            this._applyCustomDropdownClass(currentValue, previousValue);
        }
        if (changes.autoClose && this._open) {
            this.autoClose = changes.autoClose.currentValue;
            this._setCloseHandlers();
        }
    }
    /**
     * Checks if the dropdown menu is open.
     */
    isOpen() {
        return this._open;
    }
    /**
     * Opens the dropdown menu.
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
            if (this._anchor) {
                this._anchor.nativeElement.focus();
                if (this.display === 'dynamic') {
                    this._ngZone.runOutsideAngular(() => {
                        this._positioning.createPopper({
                            hostElement: this._anchor.nativeElement,
                            targetElement: this._bodyContainer || this._menu.nativeElement,
                            placement: this.placement,
                            updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                        });
                        this._applyPlacementClasses();
                        this._afterRenderRef = afterRender({
                            write: () => {
                                this._positionMenu();
                            },
                        }, { injector: this._injector });
                    });
                }
            }
        }
    }
    _setCloseHandlers() {
        this._destroyCloseHandlers$.next(); // destroy any existing close handlers
        ngbAutoClose(this._ngZone, this._document, this.autoClose, (source) => {
            this.close();
            if (source === 0 /* SOURCE.ESCAPE */) {
                this._anchor.nativeElement.focus();
            }
        }, this._destroyCloseHandlers$, this._menu ? [this._menu.nativeElement] : [], this._anchor ? [this._anchor.nativeElement] : [], '.dropdown-item,.dropdown-divider');
    }
    /**
     * Closes the dropdown menu.
     */
    close() {
        if (this._open) {
            this._open = false;
            this._resetContainer();
            this._positioning.destroy();
            this._afterRenderRef?.destroy();
            this._destroyCloseHandlers$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the dropdown menu.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    ngOnDestroy() {
        this.close();
    }
    onKeyDown(event) {
        const { key } = event;
        const itemElements = this._getMenuElements();
        let position = -1;
        let itemElement = null;
        const isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle && itemElements.length) {
            itemElements.forEach((item, index) => {
                if (item.contains(event.target)) {
                    itemElement = item;
                }
                if (item === getActiveElement(this._document)) {
                    position = index;
                }
            });
        }
        // closing on Enter / Space
        if (key === ' ' || key === 'Enter') {
            if (itemElement && (this.autoClose === true || this.autoClose === 'inside')) {
                // Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
                // So we have to register a one-time click handler that will fire after any user defined click handlers
                // to close the dropdown
                fromEvent(itemElement, 'click')
                    .pipe(take(1))
                    .subscribe(() => this.close());
            }
            return;
        }
        if (key === 'Tab') {
            if (event.target && this.isOpen() && this.autoClose) {
                if (this._anchor.nativeElement === event.target) {
                    if (this.container === 'body' && !event.shiftKey) {
                        /* This case is special: user is using [Tab] from the anchor/toggle.
               User expects the next focusable element in the dropdown menu to get focus.
               But the menu is not a sibling to anchor/toggle, it is at the end of the body.
               Trick is to synchronously focus the menu element, and let the [keydown.Tab] go
               so that browser will focus the proper element (first one focusable in the menu) */
                        this._menu.nativeElement.setAttribute('tabindex', '0');
                        this._menu.nativeElement.focus();
                        this._menu.nativeElement.removeAttribute('tabindex');
                    }
                    else if (event.shiftKey) {
                        this.close();
                    }
                    return;
                }
                else if (this.container === 'body') {
                    const focusableElements = this._menu.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
                    if (event.shiftKey && event.target === focusableElements[0]) {
                        this._anchor.nativeElement.focus();
                        event.preventDefault();
                    }
                    else if (!event.shiftKey && event.target === focusableElements[focusableElements.length - 1]) {
                        this._anchor.nativeElement.focus();
                        this.close();
                    }
                }
                else {
                    fromEvent(event.target, 'focusout')
                        .pipe(take(1))
                        .subscribe(({ relatedTarget }) => {
                        if (!this._nativeElement.contains(relatedTarget)) {
                            this.close();
                        }
                    });
                }
            }
            return;
        }
        // opening / navigating
        if (isEventFromToggle || itemElement) {
            this.open();
            if (itemElements.length) {
                switch (key) {
                    case 'ArrowDown':
                        position = Math.min(position + 1, itemElements.length - 1);
                        break;
                    case 'ArrowUp':
                        if (this._isDropup() && position === -1) {
                            position = itemElements.length - 1;
                            break;
                        }
                        position = Math.max(position - 1, 0);
                        break;
                    case 'Home':
                        position = 0;
                        break;
                    case 'End':
                        position = itemElements.length - 1;
                        break;
                }
                itemElements[position].focus();
            }
            event.preventDefault();
        }
    }
    _isDropup() {
        return this._nativeElement.classList.contains('dropup');
    }
    _isEventFromToggle(event) {
        return this._anchor.nativeElement.contains(event.target);
    }
    _getMenuElements() {
        return this._menu
            ? this._menu.menuItems.filter(({ disabled }) => !disabled).map(({ nativeElement }) => nativeElement)
            : [];
    }
    _positionMenu() {
        const menu = this._menu;
        if (this.isOpen() && menu) {
            if (this.display === 'dynamic') {
                this._positioning.update();
                this._applyPlacementClasses();
            }
            else {
                this._applyPlacementClasses(this._getFirstPlacement(this.placement));
            }
        }
    }
    _getFirstPlacement(placement) {
        return Array.isArray(placement) ? placement[0] : placement.split(' ')[0];
    }
    _resetContainer() {
        if (this._menu) {
            this._nativeElement.appendChild(this._menu.nativeElement);
        }
        if (this._bodyContainer) {
            this._document.body.removeChild(this._bodyContainer);
            this._bodyContainer = null;
        }
    }
    _applyContainer(container = null) {
        this._resetContainer();
        if (container === 'body') {
            const dropdownMenuElement = this._menu.nativeElement;
            const bodyContainer = (this._bodyContainer = this._bodyContainer || this._document.createElement('div'));
            // Override some styles to have the positioning working
            bodyContainer.style.position = 'absolute';
            dropdownMenuElement.style.position = 'static';
            bodyContainer.style.zIndex = '1055';
            bodyContainer.appendChild(dropdownMenuElement);
            this._document.body.appendChild(bodyContainer);
        }
        this._applyCustomDropdownClass(this.dropdownClass);
    }
    _applyCustomDropdownClass(newClass, oldClass) {
        const targetElement = this.container === 'body' ? this._bodyContainer : this._nativeElement;
        if (targetElement) {
            if (oldClass) {
                targetElement.classList.remove(oldClass);
            }
            if (newClass) {
                targetElement.classList.add(newClass);
            }
        }
    }
    _applyPlacementClasses(placement) {
        if (this._menu) {
            if (!placement) {
                placement = this._getFirstPlacement(this.placement);
            }
            // remove the current placement classes
            this._nativeElement.classList.remove('dropup', 'dropdown');
            if (this.display === 'static') {
                this._menu.nativeElement.setAttribute('data-bs-popper', 'static');
            }
            else {
                this._menu.nativeElement.removeAttribute('data-bs-popper');
            }
            /*
             * apply the new placement
             * in case of top use up-arrow or down-arrow otherwise
             */
            const dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            this._nativeElement.classList.add(dropdownClass);
            if (this._bodyContainer) {
                this._bodyContainer.classList.remove('dropup', 'dropdown');
                this._bodyContainer.classList.add(dropdownClass);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdown, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbDropdown, isStandalone: true, selector: "[ngbDropdown]", inputs: { autoClose: "autoClose", dropdownClass: "dropdownClass", _open: ["open", "_open"], placement: "placement", popperOptions: "popperOptions", container: "container", display: "display" }, outputs: { openChange: "openChange" }, host: { properties: { "class.show": "isOpen()" } }, queries: [{ propertyName: "_menu", first: true, predicate: NgbDropdownMenu, descendants: true }, { propertyName: "_anchor", first: true, predicate: NgbDropdownAnchor, descendants: true }], exportAs: ["ngbDropdown"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdown, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdown]',
                    exportAs: 'ngbDropdown',
                    standalone: true,
                    host: { '[class.show]': 'isOpen()' },
                }]
        }], propDecorators: { _menu: [{
                type: ContentChild,
                args: [NgbDropdownMenu, { static: false }]
            }], _anchor: [{
                type: ContentChild,
                args: [NgbDropdownAnchor, { static: false }]
            }], autoClose: [{
                type: Input
            }], dropdownClass: [{
                type: Input
            }], _open: [{
                type: Input,
                args: ['open']
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], container: [{
                type: Input
            }], display: [{
                type: Input
            }], openChange: [{
                type: Output
            }] } });

const NGB_DROPDOWN_DIRECTIVES = [
    NgbDropdown,
    NgbDropdownAnchor,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownButtonItem,
];
class NgbDropdownModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownModule, imports: [NgbDropdown,
            NgbDropdownAnchor,
            NgbDropdownToggle,
            NgbDropdownMenu,
            NgbDropdownItem,
            NgbDropdownButtonItem], exports: [NgbDropdown,
            NgbDropdownAnchor,
            NgbDropdownToggle,
            NgbDropdownMenu,
            NgbDropdownItem,
            NgbDropdownButtonItem] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_DROPDOWN_DIRECTIVES,
                    exports: NGB_DROPDOWN_DIRECTIVES,
                }]
        }] });

/**
 * A configuration service for the [`NgbModal`](#/components/modal/api#NgbModal) service.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all modals used in the application.
 *
 * @since 3.1.0
 */
class NgbModalConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.backdrop = true;
        this.fullscreen = false;
        this.keyboard = true;
        this.role = 'dialog';
    }
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class ContentRef {
    constructor(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
}
class PopupService {
    constructor(_componentType) {
        this._componentType = _componentType;
        this._windowRef = null;
        this._contentRef = null;
        this._document = inject(DOCUMENT);
        this._applicationRef = inject(ApplicationRef);
        this._injector = inject(Injector);
        this._viewContainerRef = inject(ViewContainerRef);
        this._ngZone = inject(NgZone);
    }
    open(content, templateContext, animation = false) {
        if (!this._windowRef) {
            this._contentRef = this._getContentRef(content, templateContext);
            this._windowRef = this._viewContainerRef.createComponent(this._componentType, {
                injector: this._injector,
                projectableNodes: this._contentRef.nodes,
            });
        }
        const { nativeElement } = this._windowRef.location;
        const nextRenderSubject = new Subject();
        afterNextRender({
            mixedReadWrite: () => {
                nextRenderSubject.next();
                nextRenderSubject.complete();
            },
        }, {
            injector: this._injector,
        });
        const transition$ = nextRenderSubject.pipe(mergeMap(() => ngbRunTransition(this._ngZone, nativeElement, ({ classList }) => classList.add('show'), {
            animation,
            runningTransition: 'continue',
        })));
        return { windowRef: this._windowRef, transition$ };
    }
    close(animation = false) {
        if (!this._windowRef) {
            return of(undefined);
        }
        return ngbRunTransition(this._ngZone, this._windowRef.location.nativeElement, ({ classList }) => classList.remove('show'), { animation, runningTransition: 'stop' }).pipe(tap(() => {
            this._windowRef?.destroy();
            this._contentRef?.viewRef?.destroy();
            this._windowRef = null;
            this._contentRef = null;
        }));
    }
    _getContentRef(content, templateContext) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            const viewRef = content.createEmbeddedView(templateContext);
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        else {
            return new ContentRef([[this._document.createTextNode(`${content}`)]]);
        }
    }
}

/**
 * Utility to handle the scrollbar.
 *
 * It allows to hide the scrollbar and compensate the lack of a vertical scrollbar
 * by adding an equivalent padding on the right of the body, and to revert this change.
 */
class ScrollBar {
    constructor() {
        this._document = inject(DOCUMENT);
    }
    /**
     * To be called to hide a potential vertical scrollbar:
     * - if a scrollbar is there and has a width greater than 0, adds some compensation
     * padding to the body to keep the same layout as when the scrollbar is there
     * - adds overflow: hidden
     *
     * @return a callback used to revert the change
     */
    hide() {
        const scrollbarWidth = Math.abs(window.innerWidth - this._document.documentElement.clientWidth);
        const body = this._document.body;
        const bodyStyle = body.style;
        const { overflow, paddingRight } = bodyStyle;
        if (scrollbarWidth > 0) {
            const actualPadding = parseFloat(window.getComputedStyle(body).paddingRight);
            bodyStyle.paddingRight = `${actualPadding + scrollbarWidth}px`;
        }
        bodyStyle.overflow = 'hidden';
        return () => {
            if (scrollbarWidth > 0) {
                bodyStyle.paddingRight = paddingRight;
            }
            bodyStyle.overflow = overflow;
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: ScrollBar, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: ScrollBar, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: ScrollBar, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class NgbModalBackdrop {
    constructor() {
        this._nativeElement = inject(ElementRef).nativeElement;
        this._zone = inject(NgZone);
        this._injector = inject(Injector);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalBackdrop, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.0.3", type: NgbModalBackdrop, isStandalone: true, selector: "ngb-modal-backdrop", inputs: { animation: "animation", backdropClass: "backdropClass" }, host: { properties: { "class": "\"modal-backdrop\" + (backdropClass ? \" \" + backdropClass : \"\")", "class.show": "!animation", "class.fade": "animation" }, styleAttribute: "z-index: 1055" }, ngImport: i0, template: '', isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalBackdrop, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-modal-backdrop',
                    standalone: true,
                    encapsulation: ViewEncapsulation.None,
                    template: '',
                    host: {
                        '[class]': '"modal-backdrop" + (backdropClass ? " " + backdropClass : "")',
                        '[class.show]': '!animation',
                        '[class.fade]': 'animation',
                        style: 'z-index: 1055',
                    },
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }] } });

/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.update()`, `.close()` or `.dismiss()` the modal window from your component.
 */
class NgbActiveModal {
    /**
     * Updates options of an opened modal.
     *
     * @since 14.2.0
     */
    update(options) { }
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbModalRef.result` promise will be resolved with the provided value.
     */
    close(result) { }
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) { }
}
const WINDOW_ATTRIBUTES = [
    'animation',
    'ariaLabelledBy',
    'ariaDescribedBy',
    'backdrop',
    'centered',
    'fullscreen',
    'keyboard',
    'role',
    'scrollable',
    'size',
    'windowClass',
    'modalDialogClass',
];
const BACKDROP_ATTRIBUTES = ['animation', 'backdropClass'];
/**
 * A reference to the newly opened modal returned by the `NgbModal.open()` method.
 */
class NgbModalRef {
    _applyWindowOptions(windowInstance, options) {
        WINDOW_ATTRIBUTES.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                windowInstance[optionName] = options[optionName];
            }
        });
    }
    _applyBackdropOptions(backdropInstance, options) {
        BACKDROP_ATTRIBUTES.forEach((optionName) => {
            if (isDefined(options[optionName])) {
                backdropInstance[optionName] = options[optionName];
            }
        });
    }
    /**
     * Updates options of an opened modal.
     *
     * @since 14.2.0
     */
    update(options) {
        this._applyWindowOptions(this._windowCmptRef.instance, options);
        if (this._backdropCmptRef && this._backdropCmptRef.instance) {
            this._applyBackdropOptions(this._backdropCmptRef.instance, options);
        }
    }
    /**
     * The instance of a component used for the modal content.
     *
     * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
     */
    get componentInstance() {
        if (this._contentRef && this._contentRef.componentRef) {
            return this._contentRef.componentRef.instance;
        }
    }
    /**
     * The observable that emits when the modal is closed via the `.close()` method.
     *
     * It will emit the result passed to the `.close()` method.
     *
     * @since 8.0.0
     */
    get closed() {
        return this._closed.asObservable().pipe(takeUntil(this._hidden));
    }
    /**
     * The observable that emits when the modal is dismissed via the `.dismiss()` method.
     *
     * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
     * reasons like backdrop click or ESC key press.
     *
     * @since 8.0.0
     */
    get dismissed() {
        return this._dismissed.asObservable().pipe(takeUntil(this._hidden));
    }
    /**
     * The observable that emits when both modal window and backdrop are closed and animations were finished.
     * At this point modal and backdrop elements will be removed from the DOM tree.
     *
     * This observable will be completed after emitting.
     *
     * @since 8.0.0
     */
    get hidden() {
        return this._hidden.asObservable();
    }
    /**
     * The observable that emits when modal is fully visible and animation was finished.
     * Modal DOM element is always available synchronously after calling 'modal.open()' service.
     *
     * This observable will be completed after emitting.
     * It will not emit, if modal is closed before open animation is finished.
     *
     * @since 8.0.0
     */
    get shown() {
        return this._windowCmptRef.instance.shown.asObservable();
    }
    constructor(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
        this._windowCmptRef = _windowCmptRef;
        this._contentRef = _contentRef;
        this._backdropCmptRef = _backdropCmptRef;
        this._beforeDismiss = _beforeDismiss;
        this._closed = new Subject();
        this._dismissed = new Subject();
        this._hidden = new Subject();
        _windowCmptRef.instance.dismissEvent.subscribe((reason) => {
            this.dismiss(reason);
        });
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
        this.result.then(null, () => { });
    }
    /**
     * Closes the modal with an optional `result` value.
     *
     * The `NgbMobalRef.result` promise will be resolved with the provided value.
     */
    close(result) {
        if (this._windowCmptRef) {
            this._closed.next(result);
            this._resolve(result);
            this._removeModalElements();
        }
    }
    _dismiss(reason) {
        this._dismissed.next(reason);
        this._reject(reason);
        this._removeModalElements();
    }
    /**
     * Dismisses the modal with an optional `reason` value.
     *
     * The `NgbModalRef.result` promise will be rejected with the provided value.
     */
    dismiss(reason) {
        if (this._windowCmptRef) {
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
    _removeModalElements() {
        const windowTransition$ = this._windowCmptRef.instance.hide();
        const backdropTransition$ = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : of(undefined);
        // hiding window
        windowTransition$.subscribe(() => {
            const { nativeElement } = this._windowCmptRef.location;
            nativeElement.parentNode.removeChild(nativeElement);
            this._windowCmptRef.destroy();
            this._contentRef?.viewRef?.destroy();
            this._windowCmptRef = null;
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
        zip(windowTransition$, backdropTransition$).subscribe(() => {
            this._hidden.next();
            this._hidden.complete();
        });
    }
}

var ModalDismissReasons;
(function (ModalDismissReasons) {
    ModalDismissReasons[ModalDismissReasons["BACKDROP_CLICK"] = 0] = "BACKDROP_CLICK";
    ModalDismissReasons[ModalDismissReasons["ESC"] = 1] = "ESC";
})(ModalDismissReasons || (ModalDismissReasons = {}));

class NgbModalWindow {
    constructor() {
        this._document = inject(DOCUMENT);
        this._elRef = inject((ElementRef));
        this._zone = inject(NgZone);
        this._injector = inject(Injector);
        this._closed$ = new Subject();
        this._elWithFocus = null; // element that is focused prior to modal opening
        this.backdrop = true;
        this.keyboard = true;
        this.role = 'dialog';
        this.dismissEvent = new EventEmitter();
        this.shown = new Subject();
        this.hidden = new Subject();
    }
    get fullscreenClass() {
        return this.fullscreen === true
            ? ' modal-fullscreen'
            : isString(this.fullscreen)
                ? ` modal-fullscreen-${this.fullscreen}-down`
                : '';
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
        const { nativeElement } = this._elRef;
        const context = { animation: this.animation, runningTransition: 'stop' };
        const windowTransition$ = ngbRunTransition(this._zone, nativeElement, () => nativeElement.classList.remove('show'), context);
        const dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, () => { }, context);
        const transitions$ = zip(windowTransition$, dialogTransition$);
        transitions$.subscribe(() => {
            this.hidden.next();
            this.hidden.complete();
        });
        this._disableEventHandling();
        this._restoreFocus();
        return transitions$;
    }
    _show() {
        const context = { animation: this.animation, runningTransition: 'continue' };
        const windowTransition$ = ngbRunTransition(this._zone, this._elRef.nativeElement, (element, animation) => {
            if (animation) {
                reflow(element);
            }
            element.classList.add('show');
        }, context);
        const dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, () => { }, context);
        zip(windowTransition$, dialogTransition$).subscribe(() => {
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
                            this._zone.run(() => this.dismiss(ModalDismissReasons.ESC));
                        }
                    });
                }
                else if (this.backdrop === 'static') {
                    this._bumpBackdrop();
                }
            });
            // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
            // inside the modal dialog and releasing it outside
            let preventClose = false;
            fromEvent(this._dialogEl.nativeElement, 'mousedown')
                .pipe(takeUntil(this._closed$), tap(() => (preventClose = false)), switchMap(() => fromEvent(nativeElement, 'mouseup').pipe(takeUntil(this._closed$), take(1))), filter(({ target }) => nativeElement === target))
                .subscribe(() => {
                preventClose = true;
            });
            // We're listening to 'click' to dismiss modal on modal window click, except when:
            // 1. clicking on modal dialog itself
            // 2. closing was prevented by mousedown/up handlers
            // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
            fromEvent(nativeElement, 'click')
                .pipe(takeUntil(this._closed$))
                .subscribe(({ target }) => {
                if (nativeElement === target) {
                    if (this.backdrop === 'static') {
                        this._bumpBackdrop();
                    }
                    else if (this.backdrop === true && !preventClose) {
                        this._zone.run(() => this.dismiss(ModalDismissReasons.BACKDROP_CLICK));
                    }
                }
                preventClose = false;
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
    _bumpBackdrop() {
        if (this.backdrop === 'static') {
            ngbRunTransition(this._zone, this._elRef.nativeElement, ({ classList }) => {
                classList.add('modal-static');
                return () => classList.remove('modal-static');
            }, { animation: this.animation, runningTransition: 'continue' });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.0.3", type: NgbModalWindow, isStandalone: true, selector: "ngb-modal-window", inputs: { animation: "animation", ariaLabelledBy: "ariaLabelledBy", ariaDescribedBy: "ariaDescribedBy", backdrop: "backdrop", centered: "centered", fullscreen: "fullscreen", keyboard: "keyboard", role: "role", scrollable: "scrollable", size: "size", windowClass: "windowClass", modalDialogClass: "modalDialogClass" }, outputs: { dismissEvent: "dismiss" }, host: { attributes: { "tabindex": "-1" }, properties: { "class": "\"modal d-block\" + (windowClass ? \" \" + windowClass : \"\")", "class.fade": "animation", "attr.aria-modal": "true", "attr.aria-labelledby": "ariaLabelledBy", "attr.aria-describedby": "ariaDescribedBy", "attr.role": "role" } }, viewQueries: [{ propertyName: "_dialogEl", first: true, predicate: ["dialog"], descendants: true, static: true }], ngImport: i0, template: `
		<div
			#dialog
			[class]="
				'modal-dialog' +
				(size ? ' modal-' + size : '') +
				(centered ? ' modal-dialog-centered' : '') +
				fullscreenClass +
				(scrollable ? ' modal-dialog-scrollable' : '') +
				(modalDialogClass ? ' ' + modalDialogClass : '')
			"
			role="document"
		>
			<div class="modal-content"><ng-content /></div>
		</div>
	`, isInline: true, styles: ["ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalWindow, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-modal-window', standalone: true, host: {
                        '[class]': '"modal d-block" + (windowClass ? " " + windowClass : "")',
                        '[class.fade]': 'animation',
                        tabindex: '-1',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                        '[attr.aria-describedby]': 'ariaDescribedBy',
                        '[attr.role]': 'role',
                    }, template: `
		<div
			#dialog
			[class]="
				'modal-dialog' +
				(size ? ' modal-' + size : '') +
				(centered ? ' modal-dialog-centered' : '') +
				fullscreenClass +
				(scrollable ? ' modal-dialog-scrollable' : '') +
				(modalDialogClass ? ' ' + modalDialogClass : '')
			"
			role="document"
		>
			<div class="modal-content"><ng-content /></div>
		</div>
	`, encapsulation: ViewEncapsulation.None, styles: ["ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n"] }]
        }], propDecorators: { _dialogEl: [{
                type: ViewChild,
                args: ['dialog', { static: true }]
            }], animation: [{
                type: Input
            }], ariaLabelledBy: [{
                type: Input
            }], ariaDescribedBy: [{
                type: Input
            }], backdrop: [{
                type: Input
            }], centered: [{
                type: Input
            }], fullscreen: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], role: [{
                type: Input
            }], scrollable: [{
                type: Input
            }], size: [{
                type: Input
            }], windowClass: [{
                type: Input
            }], modalDialogClass: [{
                type: Input
            }], dismissEvent: [{
                type: Output,
                args: ['dismiss']
            }] } });

class NgbModalStack {
    constructor() {
        this._applicationRef = inject(ApplicationRef);
        this._injector = inject(Injector);
        this._environmentInjector = inject(EnvironmentInjector);
        this._document = inject(DOCUMENT);
        this._scrollBar = inject(ScrollBar);
        this._activeWindowCmptHasChanged = new Subject();
        this._ariaHiddenValues = new Map();
        this._scrollBarRestoreFn = null;
        this._modalRefs = [];
        this._windowCmpts = [];
        this._activeInstances = new EventEmitter();
        const ngZone = inject(NgZone);
        // Trap focus on active WindowCmpt
        this._activeWindowCmptHasChanged.subscribe(() => {
            if (this._windowCmpts.length) {
                const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
                ngbFocusTrap(ngZone, activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
                this._revertAriaHidden();
                this._setAriaHidden(activeWindowCmpt.location.nativeElement);
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
            throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
        }
        this._hideScrollBar();
        const activeModal = new NgbActiveModal();
        contentInjector = options.injector || contentInjector;
        const environmentInjector = contentInjector.get(EnvironmentInjector, null) || this._environmentInjector;
        const contentRef = this._getContentRef(contentInjector, environmentInjector, content, activeModal, options);
        let backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(containerEl) : undefined;
        let windowCmptRef = this._attachWindowComponent(containerEl, contentRef.nodes);
        let ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
        this._registerModalRef(ngbModalRef);
        this._registerWindowCmpt(windowCmptRef);
        // We have to cleanup DOM after the last modal when BOTH 'hidden' was emitted and 'result' promise was resolved:
        // - with animations OFF, 'hidden' emits synchronously, then 'result' is resolved asynchronously
        // - with animations ON, 'result' is resolved asynchronously, then 'hidden' emits asynchronously
        ngbModalRef.hidden.pipe(take(1)).subscribe(() => Promise.resolve(true).then(() => {
            if (!this._modalRefs.length) {
                this._document.body.classList.remove('modal-open');
                this._restoreScrollBar();
                this._revertAriaHidden();
            }
        }));
        activeModal.close = (result) => {
            ngbModalRef.close(result);
        };
        activeModal.dismiss = (reason) => {
            ngbModalRef.dismiss(reason);
        };
        activeModal.update = (options) => {
            ngbModalRef.update(options);
        };
        ngbModalRef.update(options);
        if (this._modalRefs.length === 1) {
            this._document.body.classList.add('modal-open');
        }
        if (backdropCmptRef && backdropCmptRef.instance) {
            backdropCmptRef.changeDetectorRef.detectChanges();
        }
        windowCmptRef.changeDetectorRef.detectChanges();
        return ngbModalRef;
    }
    get activeInstances() {
        return this._activeInstances;
    }
    dismissAll(reason) {
        this._modalRefs.forEach((ngbModalRef) => ngbModalRef.dismiss(reason));
    }
    hasOpenModals() {
        return this._modalRefs.length > 0;
    }
    _attachBackdrop(containerEl) {
        let backdropCmptRef = createComponent(NgbModalBackdrop, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
        });
        this._applicationRef.attachView(backdropCmptRef.hostView);
        containerEl.appendChild(backdropCmptRef.location.nativeElement);
        return backdropCmptRef;
    }
    _attachWindowComponent(containerEl, projectableNodes) {
        let windowCmptRef = createComponent(NgbModalWindow, {
            environmentInjector: this._applicationRef.injector,
            elementInjector: this._injector,
            projectableNodes,
        });
        this._applicationRef.attachView(windowCmptRef.hostView);
        containerEl.appendChild(windowCmptRef.location.nativeElement);
        return windowCmptRef;
    }
    _getContentRef(contentInjector, environmentInjector, content, activeModal, options) {
        if (!content) {
            return new ContentRef([]);
        }
        else if (content instanceof TemplateRef) {
            return this._createFromTemplateRef(content, activeModal);
        }
        else if (isString(content)) {
            return this._createFromString(content);
        }
        else {
            return this._createFromComponent(contentInjector, environmentInjector, content, activeModal, options);
        }
    }
    _createFromTemplateRef(templateRef, activeModal) {
        const context = {
            $implicit: activeModal,
            close(result) {
                activeModal.close(result);
            },
            dismiss(reason) {
                activeModal.dismiss(reason);
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
    _createFromComponent(contentInjector, environmentInjector, componentType, context, options) {
        const elementInjector = Injector.create({
            providers: [{ provide: NgbActiveModal, useValue: context }],
            parent: contentInjector,
        });
        const componentRef = createComponent(componentType, {
            environmentInjector,
            elementInjector,
        });
        const componentNativeEl = componentRef.location.nativeElement;
        if (options.scrollable) {
            componentNativeEl.classList.add('component-host-scrollable');
        }
        this._applicationRef.attachView(componentRef.hostView);
        // FIXME: we should here get rid of the component nativeElement
        // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
        return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
    }
    _setAriaHidden(element) {
        const parent = element.parentElement;
        if (parent && element !== this._document.body) {
            Array.from(parent.children).forEach((sibling) => {
                if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                    this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            });
            this._setAriaHidden(parent);
        }
    }
    _revertAriaHidden() {
        this._ariaHiddenValues.forEach((value, element) => {
            if (value) {
                element.setAttribute('aria-hidden', value);
            }
            else {
                element.removeAttribute('aria-hidden');
            }
        });
        this._ariaHiddenValues.clear();
    }
    _registerModalRef(ngbModalRef) {
        const unregisterModalRef = () => {
            const index = this._modalRefs.indexOf(ngbModalRef);
            if (index > -1) {
                this._modalRefs.splice(index, 1);
                this._activeInstances.emit(this._modalRefs);
            }
        };
        this._modalRefs.push(ngbModalRef);
        this._activeInstances.emit(this._modalRefs);
        ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
    }
    _registerWindowCmpt(ngbWindowCmpt) {
        this._windowCmpts.push(ngbWindowCmpt);
        this._activeWindowCmptHasChanged.next();
        ngbWindowCmpt.onDestroy(() => {
            const index = this._windowCmpts.indexOf(ngbWindowCmpt);
            if (index > -1) {
                this._windowCmpts.splice(index, 1);
                this._activeWindowCmptHasChanged.next();
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalStack, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalStack, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalStack, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [] });

/**
 * A service for opening modal windows.
 *
 * Creating a modal is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 */
class NgbModal {
    constructor() {
        this._injector = inject(Injector);
        this._modalStack = inject(NgbModalStack);
        this._config = inject(NgbModalConfig);
    }
    /**
     * Opens a new modal window with the specified content and supplied options.
     *
     * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
     * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
     * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
     *
     * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
     */
    open(content, options = {}) {
        const combinedOptions = { ...this._config, animation: this._config.animation, ...options };
        return this._modalStack.open(this._injector, content, combinedOptions);
    }
    /**
     * Returns an observable that holds the active modal instances.
     */
    get activeInstances() {
        return this._modalStack.activeInstances;
    }
    /**
     * Dismisses all currently displayed modal windows with the supplied reason.
     *
     * @since 3.1.0
     */
    dismissAll(reason) {
        this._modalStack.dismissAll(reason);
    }
    /**
     * Indicates if there are currently any open modal windows in the application.
     *
     * @since 3.3.0
     */
    hasOpenModals() {
        return this._modalStack.hasOpenModals();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModal, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModal, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModal, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class NgbModalModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbModalModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalModule, providers: [NgbModal] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModalModule, decorators: [{
            type: NgModule,
            args: [{ providers: [NgbModal] }]
        }] });

/**
 * A configuration service for the [`NgbNav`](#/components/nav/api#NgbNav) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the navs used in the application.
 *
 * @since 5.2.0
 */
class NgbNavConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.destroyOnHide = true;
        this.orientation = 'horizontal';
        this.roles = 'tablist';
        this.keyboard = true;
    }
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const isValidNavId = (id) => isDefined(id) && id !== '';
let navCounter = 0;
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * @since 5.2.0
 */
class NgbNavContent {
    constructor() {
        this.templateRef = inject(TemplateRef);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavContent, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbNavContent, isStandalone: true, selector: "ng-template[ngbNavContent]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbNavContent]', standalone: true }]
        }] });
/**
 * This directive applies a specific role on a non-container based ngbNavItem.
 *
 * @since 14.1.0
 */
class NgbNavItemRole {
    constructor(role) {
        this.role = role;
        this.nav = inject(NgbNav);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavItemRole, deps: [{ token: 'role', attribute: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbNavItemRole, isStandalone: true, selector: "[ngbNavItem]:not(ng-container)", host: { properties: { "attr.role": "role ? role : nav.roles ? 'presentation' : undefined" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavItemRole, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavItem]:not(ng-container)',
                    standalone: true,
                    host: {
                        '[attr.role]': `role ? role : nav.roles ? 'presentation' : undefined`,
                    },
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }] });
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * @since 5.2.0
 */
class NgbNavItem {
    constructor() {
        this._nav = inject(NgbNav);
        this._nativeElement = inject(ElementRef).nativeElement;
        /**
         * If `true`, the current nav item is disabled and can't be toggled by user.
         *
         * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
         */
        this.disabled = false;
        /**
         * An event emitted when the fade in transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
    }
    ngOnInit() {
        if (!isDefined(this.domId)) {
            this.domId = `ngb-nav-${navCounter++}`;
        }
    }
    get active() {
        return this._nav.activeId === this.id;
    }
    get id() {
        return isValidNavId(this._id) ? this._id : this.domId;
    }
    get panelDomId() {
        return `${this.domId}-panel`;
    }
    isPanelInDom() {
        return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
    }
    /**
     * @internal
     */
    isNgContainer() {
        return this._nativeElement.nodeType === Node.COMMENT_NODE;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbNavItem, isStandalone: true, selector: "[ngbNavItem]", inputs: { destroyOnHide: "destroyOnHide", disabled: "disabled", domId: "domId", _id: ["ngbNavItem", "_id"] }, outputs: { shown: "shown", hidden: "hidden" }, host: { classAttribute: "nav-item" }, queries: [{ propertyName: "contentTpl", first: true, predicate: NgbNavContent }], exportAs: ["ngbNavItem"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavItem]',
                    exportAs: 'ngbNavItem',
                    standalone: true,
                    host: {
                        class: 'nav-item',
                    },
                }]
        }], propDecorators: { destroyOnHide: [{
                type: Input
            }], disabled: [{
                type: Input
            }], domId: [{
                type: Input
            }], _id: [{
                type: Input,
                args: ['ngbNavItem']
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], contentTpl: [{
                type: ContentChild,
                args: [NgbNavContent, { descendants: false }]
            }] } });
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * @since 5.2.0
 */
class NgbNav {
    constructor(role) {
        this.role = role;
        this._config = inject(NgbNavConfig);
        this._cd = inject(ChangeDetectorRef);
        this._document = inject(DOCUMENT);
        this._nativeElement = inject(ElementRef).nativeElement;
        this.destroyRef = inject(DestroyRef);
        this._navigatingWithKeyboard = false;
        /**
         * The event emitted after the active nav changes
         * The payload of the event is the newly active nav id
         *
         * If you want to prevent nav change, you should use `(navChange)` event
         */
        this.activeIdChange = new EventEmitter();
        /**
         * If `true`, nav change will be animated.
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * If `true`, non-active nav content will be removed from DOM
         * Otherwise it will just be hidden
         */
        this.destroyOnHide = this._config.destroyOnHide;
        /**
         * The orientation of navs.
         *
         * Using `vertical` will also add the `aria-orientation` attribute
         */
        this.orientation = this._config.orientation;
        /**
         * Role attribute generating strategy:
         * - `false` - no role attributes will be generated
         * - `'tablist'` - 'tablist', 'tab' and 'tabpanel' will be generated (default)
         */
        this.roles = this._config.roles;
        /**
         * Keyboard support for nav focus/selection using arrow keys.
         *
         * * `true` - navs will be focused using keyboard arrow keys
         * * `false` - no keyboard support
         * * `'changeWithArrows'` -  nav will be selected using keyboard arrow keys
         *
         * See the [list of available keyboard shortcuts](#/components/nav/overview#keyboard-shortcuts).
         *
         * @since 6.1.0
         */
        this.keyboard = this._config.keyboard;
        /**
         * An event emitted when the fade in transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just shown.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just hidden.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        this.navItemChange$ = new Subject();
        /**
         * The nav change event emitted right before the nav change happens on user click.
         *
         * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
         *
         * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
         */
        this.navChange = new EventEmitter();
    }
    click(item) {
        if (!item.disabled) {
            this._updateActiveId(item.id);
        }
    }
    onFocusout({ relatedTarget }) {
        if (!this._nativeElement.contains(relatedTarget)) {
            this._navigatingWithKeyboard = false;
        }
    }
    onKeyDown(event) {
        if (this.roles !== 'tablist' || !this.keyboard) {
            return;
        }
        const enabledLinks = this.links.filter((link) => !link.navItem.disabled);
        const { length } = enabledLinks;
        let position = -1;
        enabledLinks.forEach((link, index) => {
            if (link.nativeElement === this._document.activeElement) {
                position = index;
            }
        });
        if (length) {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    position = (position - 1 + length) % length;
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    position = (position + 1) % length;
                    break;
                case 'Home':
                    position = 0;
                    break;
                case 'End':
                    position = length - 1;
                    break;
            }
            if (this.keyboard === 'changeWithArrows') {
                this.select(enabledLinks[position].navItem.id);
            }
            enabledLinks[position].nativeElement.focus();
            this._navigatingWithKeyboard = true;
            event.preventDefault();
        }
    }
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(id) {
        this._updateActiveId(id, false);
    }
    ngAfterContentInit() {
        if (!isDefined(this.activeId)) {
            const nextId = this.items.first ? this.items.first.id : null;
            if (isValidNavId(nextId)) {
                this._updateActiveId(nextId, false);
                this._cd.detectChanges();
            }
        }
        this.items.changes
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this._notifyItemChanged(this.activeId));
    }
    ngOnChanges({ activeId }) {
        if (activeId && !activeId.firstChange) {
            this._notifyItemChanged(activeId.currentValue);
        }
    }
    _updateActiveId(nextId, emitNavChange = true) {
        if (this.activeId !== nextId) {
            let defaultPrevented = false;
            if (emitNavChange) {
                this.navChange.emit({
                    activeId: this.activeId,
                    nextId,
                    preventDefault: () => {
                        defaultPrevented = true;
                    },
                });
            }
            if (!defaultPrevented) {
                this.activeId = nextId;
                this.activeIdChange.emit(nextId);
                this._notifyItemChanged(nextId);
            }
        }
    }
    _notifyItemChanged(nextItemId) {
        this.navItemChange$.next(this._getItemById(nextItemId));
    }
    _getItemById(itemId) {
        return (this.items && this.items.find((item) => item.id === itemId)) || null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNav, deps: [{ token: 'role', attribute: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbNav, isStandalone: true, selector: "[ngbNav]", inputs: { activeId: "activeId", animation: "animation", destroyOnHide: "destroyOnHide", orientation: "orientation", roles: "roles", keyboard: "keyboard" }, outputs: { activeIdChange: "activeIdChange", shown: "shown", hidden: "hidden", navChange: "navChange" }, host: { listeners: { "keydown.arrowLeft": "onKeyDown($event)", "keydown.arrowRight": "onKeyDown($event)", "keydown.arrowDown": "onKeyDown($event)", "keydown.arrowUp": "onKeyDown($event)", "keydown.Home": "onKeyDown($event)", "keydown.End": "onKeyDown($event)", "focusout": "onFocusout($event)" }, properties: { "class.flex-column": "orientation === 'vertical'", "attr.aria-orientation": "orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined", "attr.role": "role ? role : roles ? 'tablist' : undefined" }, classAttribute: "nav" }, queries: [{ propertyName: "items", predicate: NgbNavItem }, { propertyName: "links", predicate: i0.forwardRef(() => NgbNavLinkBase), descendants: true }], exportAs: ["ngbNav"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNav, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNav]',
                    exportAs: 'ngbNav',
                    standalone: true,
                    host: {
                        class: 'nav',
                        '[class.flex-column]': `orientation === 'vertical'`,
                        '[attr.aria-orientation]': `orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined`,
                        '[attr.role]': `role ? role : roles ? 'tablist' : undefined`,
                        '(keydown.arrowLeft)': 'onKeyDown($event)',
                        '(keydown.arrowRight)': 'onKeyDown($event)',
                        '(keydown.arrowDown)': 'onKeyDown($event)',
                        '(keydown.arrowUp)': 'onKeyDown($event)',
                        '(keydown.Home)': 'onKeyDown($event)',
                        '(keydown.End)': 'onKeyDown($event)',
                        '(focusout)': 'onFocusout($event)',
                    },
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }], propDecorators: { activeId: [{
                type: Input
            }], activeIdChange: [{
                type: Output
            }], animation: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], orientation: [{
                type: Input
            }], roles: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], items: [{
                type: ContentChildren,
                args: [NgbNavItem]
            }], links: [{
                type: ContentChildren,
                args: [forwardRef(() => NgbNavLinkBase), { descendants: true }]
            }], navChange: [{
                type: Output
            }] } });
class NgbNavLinkBase {
    constructor(role) {
        this.role = role;
        this.navItem = inject(NgbNavItem);
        this.nav = inject(NgbNav);
        this.nativeElement = inject(ElementRef).nativeElement;
    }
    get tabindex() {
        if (this.nav.keyboard === false) {
            return this.navItem.disabled ? -1 : undefined;
        }
        if (this.nav._navigatingWithKeyboard) {
            return -1;
        }
        return this.navItem.disabled || !this.navItem.active ? -1 : undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavLinkBase, deps: [{ token: 'role', attribute: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbNavLinkBase, isStandalone: true, selector: "[ngbNavLink]", host: { properties: { "id": "navItem.domId", "class.nav-item": "navItem.isNgContainer()", "attr.role": "role ? role : nav.roles ? 'tab' : undefined", "class.active": "navItem.active", "class.disabled": "navItem.disabled", "attr.tabindex": "tabindex", "attr.aria-controls": "navItem.isPanelInDom() ? navItem.panelDomId : null", "attr.aria-selected": "navItem.active", "attr.aria-disabled": "navItem.disabled" }, classAttribute: "nav-link" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavLinkBase, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavLink]',
                    standalone: true,
                    host: {
                        '[id]': 'navItem.domId',
                        class: 'nav-link',
                        '[class.nav-item]': 'navItem.isNgContainer()',
                        '[attr.role]': `role ? role : nav.roles ? 'tab' : undefined`,
                        '[class.active]': 'navItem.active',
                        '[class.disabled]': 'navItem.disabled',
                        '[attr.tabindex]': 'tabindex',
                        '[attr.aria-controls]': 'navItem.isPanelInDom() ? navItem.panelDomId : null',
                        '[attr.aria-selected]': 'navItem.active',
                        '[attr.aria-disabled]': 'navItem.disabled',
                    },
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }] });
/**
 * A directive to mark the nav link when used on a button element.
 */
class NgbNavLinkButton extends NgbNavLinkBase {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavLinkButton, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbNavLinkButton, isStandalone: true, selector: "button[ngbNavLink]", host: { attributes: { "type": "button" }, listeners: { "click": "nav.click(navItem)" }, properties: { "disabled": "navItem.disabled" } }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavLinkButton, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbNavLink]',
                    standalone: true,
                    host: {
                        type: 'button',
                        '[disabled]': 'navItem.disabled',
                        '(click)': 'nav.click(navItem)',
                    },
                }]
        }] });
/**
 * A directive to mark the nav link when used on a link element.
 *
 * @since 5.2.0
 */
class NgbNavLink extends NgbNavLinkBase {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavLink, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbNavLink, isStandalone: true, selector: "a[ngbNavLink]", host: { attributes: { "href": "" }, listeners: { "click": "nav.click(navItem); $event.preventDefault()" } }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavLink, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[ngbNavLink]',
                    standalone: true,
                    host: {
                        href: '',
                        '(click)': 'nav.click(navItem); $event.preventDefault()',
                    },
                }]
        }] });

const ngbNavFadeOutTransition = ({ classList }) => {
    classList.remove('show');
    return () => classList.remove('active');
};
const ngbNavFadeInTransition = (element, animation) => {
    if (animation) {
        reflow(element);
    }
    element.classList.add('show');
};

class NgbNavPane {
    constructor() {
        this.nativeElement = inject(ElementRef).nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavPane, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbNavPane, isStandalone: true, selector: "[ngbNavPane]", inputs: { item: "item", nav: "nav", role: "role" }, host: { properties: { "id": "item.panelDomId", "class.fade": "nav.animation", "attr.role": "role ? role : nav.roles ? \"tabpanel\" : undefined", "attr.aria-labelledby": "item.domId" }, classAttribute: "tab-pane" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavPane, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavPane]',
                    standalone: true,
                    host: {
                        '[id]': 'item.panelDomId',
                        class: 'tab-pane',
                        '[class.fade]': 'nav.animation',
                        '[attr.role]': 'role ? role : nav.roles ? "tabpanel" : undefined',
                        '[attr.aria-labelledby]': 'item.domId',
                    },
                }]
        }], propDecorators: { item: [{
                type: Input
            }], nav: [{
                type: Input
            }], role: [{
                type: Input
            }] } });
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
class NgbNavOutlet {
    constructor() {
        this._cd = inject(ChangeDetectorRef);
        this._ngZone = inject(NgZone);
        this._activePane = null;
    }
    isPanelTransitioning(item) {
        return this._activePane?.item === item;
    }
    ngAfterViewInit() {
        // initial display
        this._updateActivePane();
        // this will be emitted for all 3 types of nav changes: .select(), [activeId] or (click)
        this.nav.navItemChange$
            .pipe(takeUntilDestroyed(this.nav.destroyRef), startWith(this._activePane?.item || null), distinctUntilChanged(), skip(1))
            .subscribe((nextItem) => {
            const options = { animation: this.nav.animation, runningTransition: 'stop' };
            // next panel we're switching to will only appear in DOM after the change detection is done
            // and `this._panes` will be updated
            this._cd.detectChanges();
            // fading out
            if (this._activePane) {
                ngbRunTransition(this._ngZone, this._activePane.nativeElement, ngbNavFadeOutTransition, options).subscribe(() => {
                    const activeItem = this._activePane?.item;
                    this._activePane = this._getPaneForItem(nextItem);
                    // mark for check when transition finishes as outlet or parent containers might be OnPush
                    // without this the panes that have "faded out" will stay in DOM
                    this._cd.markForCheck();
                    // fading in
                    if (this._activePane) {
                        // we have to add the '.active' class before running the transition,
                        // because it should be in place before `ngbRunTransition` does `reflow()`
                        this._activePane.nativeElement.classList.add('active');
                        ngbRunTransition(this._ngZone, this._activePane.nativeElement, ngbNavFadeInTransition, options).subscribe(() => {
                            if (nextItem) {
                                nextItem.shown.emit();
                                this.nav.shown.emit(nextItem.id);
                            }
                        });
                    }
                    if (activeItem) {
                        activeItem.hidden.emit();
                        this.nav.hidden.emit(activeItem.id);
                    }
                });
            }
            else {
                this._updateActivePane();
            }
        });
    }
    _updateActivePane() {
        this._activePane = this._getActivePane();
        this._activePane?.nativeElement.classList.add('show', 'active');
    }
    _getPaneForItem(item) {
        return (this._panes && this._panes.find((pane) => pane.item === item)) || null;
    }
    _getActivePane() {
        return (this._panes && this._panes.find((pane) => pane.item.active)) || null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavOutlet, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbNavOutlet, isStandalone: true, selector: "[ngbNavOutlet]", inputs: { paneRole: "paneRole", nav: ["ngbNavOutlet", "nav"] }, host: { classAttribute: "tab-content" }, viewQueries: [{ propertyName: "_panes", predicate: NgbNavPane, descendants: true }], ngImport: i0, template: `
		@for (item of nav.items; track item) {
			@if (item.isPanelInDom() || isPanelTransitioning(item)) {
				<div ngbNavPane [item]="item" [nav]="nav" [role]="paneRole">
					<ng-template
						[ngTemplateOutlet]="item.contentTpl?.templateRef || null"
						[ngTemplateOutletContext]="{ $implicit: item.active || isPanelTransitioning(item) }"
					/>
				</div>
			}
		}
	`, isInline: true, dependencies: [{ kind: "directive", type: NgbNavPane, selector: "[ngbNavPane]", inputs: ["item", "nav", "role"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavOutlet, decorators: [{
            type: Component,
            args: [{
                    selector: '[ngbNavOutlet]',
                    imports: [NgbNavPane, NgTemplateOutlet],
                    host: {
                        class: 'tab-content',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
		@for (item of nav.items; track item) {
			@if (item.isPanelInDom() || isPanelTransitioning(item)) {
				<div ngbNavPane [item]="item" [nav]="nav" [role]="paneRole">
					<ng-template
						[ngTemplateOutlet]="item.contentTpl?.templateRef || null"
						[ngTemplateOutletContext]="{ $implicit: item.active || isPanelTransitioning(item) }"
					/>
				</div>
			}
		}
	`,
                }]
        }], propDecorators: { _panes: [{
                type: ViewChildren,
                args: [NgbNavPane]
            }], paneRole: [{
                type: Input
            }], nav: [{
                type: Input,
                args: ['ngbNavOutlet']
            }] } });

const NGB_NAV_DIRECTIVES = [
    NgbNavContent,
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavLinkButton,
    NgbNavLinkBase,
    NgbNavOutlet,
    NgbNavPane,
];
class NgbNavModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbNavModule, imports: [NgbNavContent,
            NgbNav,
            NgbNavItem,
            NgbNavItemRole,
            NgbNavLink,
            NgbNavLinkButton,
            NgbNavLinkBase,
            NgbNavOutlet,
            NgbNavPane], exports: [NgbNavContent,
            NgbNav,
            NgbNavItem,
            NgbNavItemRole,
            NgbNavLink,
            NgbNavLinkButton,
            NgbNavLinkBase,
            NgbNavOutlet,
            NgbNavPane] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbNavModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_NAV_DIRECTIVES,
                    exports: NGB_NAV_DIRECTIVES,
                }]
        }] });

/**
 * A configuration service for the [`NgbPagination`](#/components/pagination/api#NgbPagination) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the paginations used in the application.
 */
class NgbPaginationConfig {
    constructor() {
        this.disabled = false;
        this.boundaryLinks = false;
        this.directionLinks = true;
        this.ellipses = true;
        this.maxSize = 0;
        this.pageSize = 10;
        this.rotate = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * A directive to match the 'ellipsis' link template
 *
 * @since 4.1.0
 */
class NgbPaginationEllipsis {
    constructor() {
        this.templateRef = inject((TemplateRef));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationEllipsis, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbPaginationEllipsis, isStandalone: true, selector: "ng-template[ngbPaginationEllipsis]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationEllipsis, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationEllipsis]', standalone: true }]
        }] });
/**
 * A directive to match the 'first' link template
 *
 * @since 4.1.0
 */
class NgbPaginationFirst {
    constructor() {
        this.templateRef = inject((TemplateRef));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationFirst, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbPaginationFirst, isStandalone: true, selector: "ng-template[ngbPaginationFirst]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationFirst, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationFirst]', standalone: true }]
        }] });
/**
 * A directive to match the 'last' link template
 *
 * @since 4.1.0
 */
class NgbPaginationLast {
    constructor() {
        this.templateRef = inject((TemplateRef));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationLast, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbPaginationLast, isStandalone: true, selector: "ng-template[ngbPaginationLast]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationLast, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationLast]', standalone: true }]
        }] });
/**
 * A directive to match the 'next' link template
 *
 * @since 4.1.0
 */
class NgbPaginationNext {
    constructor() {
        this.templateRef = inject((TemplateRef));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationNext, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbPaginationNext, isStandalone: true, selector: "ng-template[ngbPaginationNext]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationNext, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationNext]', standalone: true }]
        }] });
/**
 * A directive to match the page 'number' link template
 *
 * @since 4.1.0
 */
class NgbPaginationNumber {
    constructor() {
        this.templateRef = inject((TemplateRef));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationNumber, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbPaginationNumber, isStandalone: true, selector: "ng-template[ngbPaginationNumber]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationNumber, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationNumber]', standalone: true }]
        }] });
/**
 * A directive to match the 'previous' link template
 *
 * @since 4.1.0
 */
class NgbPaginationPrevious {
    constructor() {
        this.templateRef = inject((TemplateRef));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationPrevious, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbPaginationPrevious, isStandalone: true, selector: "ng-template[ngbPaginationPrevious]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationPrevious, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationPrevious]', standalone: true }]
        }] });
/**
 * A directive to match the 'pages' whole content
 *
 * @since 9.1.0
 */
class NgbPaginationPages {
    constructor() {
        this.templateRef = inject((TemplateRef));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationPages, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbPaginationPages, isStandalone: true, selector: "ng-template[ngbPaginationPages]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationPages, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbPaginationPages]', standalone: true }]
        }] });
/**
 * A component that displays page numbers and allows to customize them in several ways.
 */
class NgbPagination {
    constructor() {
        this._config = inject(NgbPaginationConfig);
        this.pageCount = 0;
        this.pages = [];
        /**
         * If `true`, pagination links will be disabled.
         */
        this.disabled = this._config.disabled;
        /**
         * If `true`, the "First" and "Last" page links are shown.
         */
        this.boundaryLinks = this._config.boundaryLinks;
        /**
         * If `true`, the "Next" and "Previous" page links are shown.
         */
        this.directionLinks = this._config.directionLinks;
        /**
         * If `true`, the ellipsis symbols and first/last page numbers will be shown when `maxSize` > number of pages.
         */
        this.ellipses = this._config.ellipses;
        /**
         * Whether to rotate pages when `maxSize` > number of pages.
         *
         * The current page always stays in the middle if `true`.
         */
        this.rotate = this._config.rotate;
        /**
         *  The maximum number of pages to display.
         */
        this.maxSize = this._config.maxSize;
        /**
         *  The current page.
         *
         *  Page numbers start with `1`.
         */
        this.page = 1;
        /**
         *  The number of items per page.
         */
        this.pageSize = this._config.pageSize;
        /**
         *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
         *
         *  Event payload is the number of the newly selected page.
         *
         *  Page numbers start with `1`.
         */
        this.pageChange = new EventEmitter(true);
        /**
         * The pagination display size.
         *
         * Bootstrap currently supports small and large sizes.
         *
         * If the passed value is a string (ex. 'custom'), it will just add the `pagination-custom` css class
         */
        this.size = this._config.size;
    }
    hasPrevious() {
        return this.page > 1;
    }
    hasNext() {
        return this.page < this.pageCount;
    }
    nextDisabled() {
        return !this.hasNext() || this.disabled;
    }
    previousDisabled() {
        return !this.hasPrevious() || this.disabled;
    }
    selectPage(pageNumber) {
        this._updatePages(pageNumber);
    }
    ngOnChanges(changes) {
        this._updatePages(this.page);
    }
    isEllipsis(pageNumber) {
        return pageNumber === -1;
    }
    /**
     * Appends ellipses and first/last page number to the displayed pages
     */
    _applyEllipses(start, end) {
        if (this.ellipses) {
            if (start > 0) {
                // The first page will always be included. If the displayed range
                // starts after the third page, then add ellipsis. But if the range
                // starts on the third page, then add the second page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (start > 2) {
                    this.pages.unshift(-1);
                }
                else if (start === 2) {
                    this.pages.unshift(2);
                }
                this.pages.unshift(1);
            }
            if (end < this.pageCount) {
                // The last page will always be included. If the displayed range
                // ends before the third-last page, then add ellipsis. But if the range
                // ends on third-last page, then add the second-last page instead of
                // an ellipsis, because the ellipsis would only hide a single page.
                if (end < this.pageCount - 2) {
                    this.pages.push(-1);
                }
                else if (end === this.pageCount - 2) {
                    this.pages.push(this.pageCount - 1);
                }
                this.pages.push(this.pageCount);
            }
        }
    }
    /**
     * Rotates page numbers based on maxSize items visible.
     * Currently selected page stays in the middle:
     *
     * Ex. for selected page = 6:
     * [5,*6*,7] for maxSize = 3
     * [4,5,*6*,7] for maxSize = 4
     */
    _applyRotation() {
        let start = 0;
        let end = this.pageCount;
        let leftOffset = Math.floor(this.maxSize / 2);
        let rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
        if (this.page <= leftOffset) {
            // very beginning, no rotation -> [0..maxSize]
            end = this.maxSize;
        }
        else if (this.pageCount - this.page < leftOffset) {
            // very end, no rotation -> [len-maxSize..len]
            start = this.pageCount - this.maxSize;
        }
        else {
            // rotate
            start = this.page - leftOffset - 1;
            end = this.page + rightOffset;
        }
        return [start, end];
    }
    /**
     * Paginates page numbers based on maxSize items per page.
     */
    _applyPagination() {
        let page = Math.ceil(this.page / this.maxSize) - 1;
        let start = page * this.maxSize;
        let end = start + this.maxSize;
        return [start, end];
    }
    _setPageInRange(newPageNo) {
        const prevPageNo = this.page;
        this.page = getValueInRange(newPageNo, this.pageCount, 1);
        if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
            this.pageChange.emit(this.page);
        }
    }
    _updatePages(newPage) {
        this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
        if (!isNumber(this.pageCount)) {
            this.pageCount = 0;
        }
        // fill-in model needed to render pages
        this.pages.length = 0;
        for (let i = 1; i <= this.pageCount; i++) {
            this.pages.push(i);
        }
        // set page within 1..max range
        this._setPageInRange(newPage);
        // apply maxSize if necessary
        if (this.maxSize > 0 && this.pageCount > this.maxSize) {
            let start = 0;
            let end = this.pageCount;
            // either paginating or rotating page numbers
            if (this.rotate) {
                [start, end] = this._applyRotation();
            }
            else {
                [start, end] = this._applyPagination();
            }
            this.pages = this.pages.slice(start, end);
            // adding ellipses
            this._applyEllipses(start, end);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPagination, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbPagination, isStandalone: true, selector: "ngb-pagination", inputs: { disabled: "disabled", boundaryLinks: "boundaryLinks", directionLinks: "directionLinks", ellipses: "ellipses", rotate: "rotate", collectionSize: "collectionSize", maxSize: "maxSize", page: "page", pageSize: "pageSize", size: "size" }, outputs: { pageChange: "pageChange" }, host: { attributes: { "role": "navigation" } }, queries: [{ propertyName: "tplEllipsis", first: true, predicate: NgbPaginationEllipsis, descendants: true }, { propertyName: "tplFirst", first: true, predicate: NgbPaginationFirst, descendants: true }, { propertyName: "tplLast", first: true, predicate: NgbPaginationLast, descendants: true }, { propertyName: "tplNext", first: true, predicate: NgbPaginationNext, descendants: true }, { propertyName: "tplNumber", first: true, predicate: NgbPaginationNumber, descendants: true }, { propertyName: "tplPrevious", first: true, predicate: NgbPaginationPrevious, descendants: true }, { propertyName: "tplPages", first: true, predicate: NgbPaginationPages, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
		<ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
		<ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
		<ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
		<ng-template #ellipsis>...</ng-template>
		<ng-template #defaultNumber let-page let-currentPage="currentPage">{{ page }}</ng-template>
		<ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
			@for (pageNumber of pages; track $index) {
				<li
					class="page-item"
					[class.active]="pageNumber === page"
					[class.disabled]="isEllipsis(pageNumber) || disabled"
					[attr.aria-current]="pageNumber === page ? 'page' : null"
				>
					@if (isEllipsis(pageNumber)) {
						<a class="page-link" tabindex="-1" aria-disabled="true">
							<ng-template
								[ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
								[ngTemplateOutletContext]="{ disabled: true, currentPage: page }"
							/>
						</a>
					} @else {
						<a
							class="page-link"
							href
							(click)="selectPage(pageNumber); $event.preventDefault()"
							[attr.tabindex]="disabled ? '-1' : null"
							[attr.aria-disabled]="disabled ? 'true' : null"
						>
							<ng-template
								[ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
								[ngTemplateOutletContext]="{ disabled: disabled, $implicit: pageNumber, currentPage: page }"
							/>
						</a>
					}
				</li>
			}
		</ng-template>
		<ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
			@if (boundaryLinks) {
				<li class="page-item" [class.disabled]="previousDisabled()">
					<a
						aria-label="First"
						i18n-aria-label="@@ngb.pagination.first-aria"
						class="page-link"
						href
						(click)="selectPage(1); $event.preventDefault()"
						[attr.tabindex]="previousDisabled() ? '-1' : null"
						[attr.aria-disabled]="previousDisabled() ? 'true' : null"
					>
						<ng-template
							[ngTemplateOutlet]="tplFirst?.templateRef || first"
							[ngTemplateOutletContext]="{ disabled: previousDisabled(), currentPage: page }"
						/>
					</a>
				</li>
			}
			@if (directionLinks) {
				<li class="page-item" [class.disabled]="previousDisabled()">
					<a
						aria-label="Previous"
						i18n-aria-label="@@ngb.pagination.previous-aria"
						class="page-link"
						href
						(click)="selectPage(page - 1); $event.preventDefault()"
						[attr.tabindex]="previousDisabled() ? '-1' : null"
						[attr.aria-disabled]="previousDisabled() ? 'true' : null"
					>
						<ng-template
							[ngTemplateOutlet]="tplPrevious?.templateRef || previous"
							[ngTemplateOutletContext]="{ disabled: previousDisabled() }"
						/>
					</a>
				</li>
			}
			<ng-template
				[ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
				[ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
			/>
			@if (directionLinks) {
				<li class="page-item" [class.disabled]="nextDisabled()">
					<a
						aria-label="Next"
						i18n-aria-label="@@ngb.pagination.next-aria"
						class="page-link"
						href
						(click)="selectPage(page + 1); $event.preventDefault()"
						[attr.tabindex]="nextDisabled() ? '-1' : null"
						[attr.aria-disabled]="nextDisabled() ? 'true' : null"
					>
						<ng-template
							[ngTemplateOutlet]="tplNext?.templateRef || next"
							[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
						/>
					</a>
				</li>
			}
			@if (boundaryLinks) {
				<li class="page-item" [class.disabled]="nextDisabled()">
					<a
						aria-label="Last"
						i18n-aria-label="@@ngb.pagination.last-aria"
						class="page-link"
						href
						(click)="selectPage(pageCount); $event.preventDefault()"
						[attr.tabindex]="nextDisabled() ? '-1' : null"
						[attr.aria-disabled]="nextDisabled() ? 'true' : null"
					>
						<ng-template
							[ngTemplateOutlet]="tplLast?.templateRef || last"
							[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
						/>
					</a>
				</li>
			}
		</ul>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPagination, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-pagination',
                    imports: [NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        role: 'navigation',
                    },
                    template: `
		<ng-template #first><span aria-hidden="true" i18n="@@ngb.pagination.first">&laquo;&laquo;</span></ng-template>
		<ng-template #previous><span aria-hidden="true" i18n="@@ngb.pagination.previous">&laquo;</span></ng-template>
		<ng-template #next><span aria-hidden="true" i18n="@@ngb.pagination.next">&raquo;</span></ng-template>
		<ng-template #last><span aria-hidden="true" i18n="@@ngb.pagination.last">&raquo;&raquo;</span></ng-template>
		<ng-template #ellipsis>...</ng-template>
		<ng-template #defaultNumber let-page let-currentPage="currentPage">{{ page }}</ng-template>
		<ng-template #defaultPages let-page let-pages="pages" let-disabled="disabled">
			@for (pageNumber of pages; track $index) {
				<li
					class="page-item"
					[class.active]="pageNumber === page"
					[class.disabled]="isEllipsis(pageNumber) || disabled"
					[attr.aria-current]="pageNumber === page ? 'page' : null"
				>
					@if (isEllipsis(pageNumber)) {
						<a class="page-link" tabindex="-1" aria-disabled="true">
							<ng-template
								[ngTemplateOutlet]="tplEllipsis?.templateRef || ellipsis"
								[ngTemplateOutletContext]="{ disabled: true, currentPage: page }"
							/>
						</a>
					} @else {
						<a
							class="page-link"
							href
							(click)="selectPage(pageNumber); $event.preventDefault()"
							[attr.tabindex]="disabled ? '-1' : null"
							[attr.aria-disabled]="disabled ? 'true' : null"
						>
							<ng-template
								[ngTemplateOutlet]="tplNumber?.templateRef || defaultNumber"
								[ngTemplateOutletContext]="{ disabled: disabled, $implicit: pageNumber, currentPage: page }"
							/>
						</a>
					}
				</li>
			}
		</ng-template>
		<ul [class]="'pagination' + (size ? ' pagination-' + size : '')">
			@if (boundaryLinks) {
				<li class="page-item" [class.disabled]="previousDisabled()">
					<a
						aria-label="First"
						i18n-aria-label="@@ngb.pagination.first-aria"
						class="page-link"
						href
						(click)="selectPage(1); $event.preventDefault()"
						[attr.tabindex]="previousDisabled() ? '-1' : null"
						[attr.aria-disabled]="previousDisabled() ? 'true' : null"
					>
						<ng-template
							[ngTemplateOutlet]="tplFirst?.templateRef || first"
							[ngTemplateOutletContext]="{ disabled: previousDisabled(), currentPage: page }"
						/>
					</a>
				</li>
			}
			@if (directionLinks) {
				<li class="page-item" [class.disabled]="previousDisabled()">
					<a
						aria-label="Previous"
						i18n-aria-label="@@ngb.pagination.previous-aria"
						class="page-link"
						href
						(click)="selectPage(page - 1); $event.preventDefault()"
						[attr.tabindex]="previousDisabled() ? '-1' : null"
						[attr.aria-disabled]="previousDisabled() ? 'true' : null"
					>
						<ng-template
							[ngTemplateOutlet]="tplPrevious?.templateRef || previous"
							[ngTemplateOutletContext]="{ disabled: previousDisabled() }"
						/>
					</a>
				</li>
			}
			<ng-template
				[ngTemplateOutlet]="tplPages?.templateRef || defaultPages"
				[ngTemplateOutletContext]="{ $implicit: page, pages: pages, disabled: disabled }"
			/>
			@if (directionLinks) {
				<li class="page-item" [class.disabled]="nextDisabled()">
					<a
						aria-label="Next"
						i18n-aria-label="@@ngb.pagination.next-aria"
						class="page-link"
						href
						(click)="selectPage(page + 1); $event.preventDefault()"
						[attr.tabindex]="nextDisabled() ? '-1' : null"
						[attr.aria-disabled]="nextDisabled() ? 'true' : null"
					>
						<ng-template
							[ngTemplateOutlet]="tplNext?.templateRef || next"
							[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
						/>
					</a>
				</li>
			}
			@if (boundaryLinks) {
				<li class="page-item" [class.disabled]="nextDisabled()">
					<a
						aria-label="Last"
						i18n-aria-label="@@ngb.pagination.last-aria"
						class="page-link"
						href
						(click)="selectPage(pageCount); $event.preventDefault()"
						[attr.tabindex]="nextDisabled() ? '-1' : null"
						[attr.aria-disabled]="nextDisabled() ? 'true' : null"
					>
						<ng-template
							[ngTemplateOutlet]="tplLast?.templateRef || last"
							[ngTemplateOutletContext]="{ disabled: nextDisabled(), currentPage: page }"
						/>
					</a>
				</li>
			}
		</ul>
	`,
                }]
        }], propDecorators: { tplEllipsis: [{
                type: ContentChild,
                args: [NgbPaginationEllipsis, { static: false }]
            }], tplFirst: [{
                type: ContentChild,
                args: [NgbPaginationFirst, { static: false }]
            }], tplLast: [{
                type: ContentChild,
                args: [NgbPaginationLast, { static: false }]
            }], tplNext: [{
                type: ContentChild,
                args: [NgbPaginationNext, { static: false }]
            }], tplNumber: [{
                type: ContentChild,
                args: [NgbPaginationNumber, { static: false }]
            }], tplPrevious: [{
                type: ContentChild,
                args: [NgbPaginationPrevious, { static: false }]
            }], tplPages: [{
                type: ContentChild,
                args: [NgbPaginationPages, { static: false }]
            }], disabled: [{
                type: Input
            }], boundaryLinks: [{
                type: Input
            }], directionLinks: [{
                type: Input
            }], ellipses: [{
                type: Input
            }], rotate: [{
                type: Input
            }], collectionSize: [{
                type: Input,
                args: [{ required: true }]
            }], maxSize: [{
                type: Input
            }], page: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], size: [{
                type: Input
            }] } });

const NGB_PAGINATION_DIRECTIVES = [
    NgbPagination,
    NgbPaginationEllipsis,
    NgbPaginationFirst,
    NgbPaginationLast,
    NgbPaginationNext,
    NgbPaginationNumber,
    NgbPaginationPrevious,
    NgbPaginationPages,
];
class NgbPaginationModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationModule, imports: [NgbPagination,
            NgbPaginationEllipsis,
            NgbPaginationFirst,
            NgbPaginationLast,
            NgbPaginationNext,
            NgbPaginationNumber,
            NgbPaginationPrevious,
            NgbPaginationPages], exports: [NgbPagination,
            NgbPaginationEllipsis,
            NgbPaginationFirst,
            NgbPaginationLast,
            NgbPaginationNext,
            NgbPaginationNumber,
            NgbPaginationPrevious,
            NgbPaginationPages] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPaginationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_PAGINATION_DIRECTIVES,
                    exports: NGB_PAGINATION_DIRECTIVES,
                }]
        }] });

const ALIASES = {
    hover: ['mouseenter', 'mouseleave'],
    focus: ['focusin', 'focusout'],
};
function parseTriggers(triggers) {
    const trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    const parsedTriggers = trimmedTriggers
        .split(/\s+/)
        .map((trigger) => trigger.split(':'))
        .map((triggerPair) => (ALIASES[triggerPair[0]] || triggerPair));
    const manualTriggers = parsedTriggers.filter((triggerPair) => triggerPair.includes('manual'));
    if (manualTriggers.length > 1) {
        throw `Triggers parse error: only one manual trigger is allowed`;
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw `Triggers parse error: manual trigger can't be mixed with other triggers`;
    }
    return manualTriggers.length ? [] : parsedTriggers;
}
function listenToTriggers(element, triggers, isOpenedFn, openFn, closeFn, openDelayMs = 0, closeDelayMs = 0) {
    const parsedTriggers = parseTriggers(triggers);
    if (parsedTriggers.length === 0) {
        return () => { };
    }
    const activeOpenTriggers = new Set();
    const cleanupFns = [];
    let timeout;
    function addEventListener(name, listener) {
        element.addEventListener(name, listener);
        cleanupFns.push(() => element.removeEventListener(name, listener));
    }
    function withDelay(fn, delayMs) {
        clearTimeout(timeout);
        if (delayMs > 0) {
            timeout = setTimeout(fn, delayMs);
        }
        else {
            fn();
        }
    }
    for (const [openTrigger, closeTrigger] of parsedTriggers) {
        if (!closeTrigger) {
            addEventListener(openTrigger, () => isOpenedFn() ? withDelay(closeFn, closeDelayMs) : withDelay(openFn, openDelayMs));
        }
        else {
            addEventListener(openTrigger, () => {
                activeOpenTriggers.add(openTrigger);
                withDelay(() => activeOpenTriggers.size > 0 && openFn(), openDelayMs);
            });
            addEventListener(closeTrigger, () => {
                activeOpenTriggers.delete(openTrigger);
                withDelay(() => activeOpenTriggers.size === 0 && closeFn(), closeDelayMs);
            });
        }
    }
    return () => cleanupFns.forEach((cleanupFn) => cleanupFn());
}

/**
 * A configuration service for the [`NgbPopover`](#/components/popover/api#NgbPopover) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the popovers used in the application.
 */
class NgbPopoverConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.autoClose = true;
        this.placement = 'auto';
        this.popperOptions = (options) => options;
        this.triggers = 'click';
        this.disablePopover = false;
        this.openDelay = 0;
        this.closeDelay = 0;
    }
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopoverConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopoverConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopoverConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

let nextId$1 = 0;
class NgbPopoverWindow {
    isTitleTemplate() {
        return this.title instanceof TemplateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopoverWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbPopoverWindow, isStandalone: true, selector: "ngb-popover-window", inputs: { animation: "animation", title: "title", id: "id", popoverClass: "popoverClass", context: "context" }, host: { attributes: { "role": "tooltip" }, properties: { "class": "\"popover\" + (popoverClass ? \" \" + popoverClass : \"\")", "class.fade": "animation", "id": "id" }, styleAttribute: "position: absolute;" }, ngImport: i0, template: `
		<div class="popover-arrow" data-popper-arrow></div>
		@if (title) {
			<h3 class="popover-header">
				<ng-template #simpleTitle>{{ title }}</ng-template>
				<ng-template
					[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
					[ngTemplateOutletContext]="context"
				/>
			</h3>
		}
		<div class="popover-body">
			<ng-content />
		</div>
	`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopoverWindow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-popover-window',
                    imports: [NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")',
                        '[class.fade]': 'animation',
                        role: 'tooltip',
                        '[id]': 'id',
                        style: 'position: absolute;',
                    },
                    template: `
		<div class="popover-arrow" data-popper-arrow></div>
		@if (title) {
			<h3 class="popover-header">
				<ng-template #simpleTitle>{{ title }}</ng-template>
				<ng-template
					[ngTemplateOutlet]="isTitleTemplate() ? $any(title) : simpleTitle"
					[ngTemplateOutletContext]="context"
				/>
			</h3>
		}
		<div class="popover-body">
			<ng-content />
		</div>
	`,
                }]
        }], propDecorators: { animation: [{
                type: Input
            }], title: [{
                type: Input
            }], id: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], context: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy popover creation.
 */
class NgbPopover {
    constructor() {
        this._config = inject(NgbPopoverConfig);
        /**
         * If `true`, popover opening and closing will be animated.
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * Indicates whether the popover should be closed on `Escape` key and inside/outside clicks:
         *
         * * `true` - closes on both outside and inside clicks as well as `Escape` presses
         * * `false` - disables the autoClose feature (NB: triggers still apply)
         * * `"inside"` - closes on inside clicks as well as Escape presses
         * * `"outside"` - closes on outside clicks (sometimes also achievable through triggers)
         * as well as `Escape` presses
         *
         * @since 3.0.0
         */
        this.autoClose = this._config.autoClose;
        /**
         * The preferred placement of the popover, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"auto"`.
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = this._config.placement;
        /**
         * Allows to change default Popper options when positioning the popover.
         * Receives current popper options and returns modified ones.
         *
         * @since 13.1.0
         */
        this.popperOptions = this._config.popperOptions;
        /**
         * Specifies events that should trigger the tooltip.
         *
         * Supports a space separated list of event names.
         * For more details see the [triggers demo](#/components/popover/examples#triggers).
         */
        this.triggers = this._config.triggers;
        /**
         * A selector specifying the element the popover should be appended to.
         *
         * Currently only supports `body`.
         */
        this.container = this._config.container;
        /**
         * If `true`, popover is disabled and won't be displayed.
         *
         * @since 1.1.0
         */
        this.disablePopover = this._config.disablePopover;
        /**
         * An optional class applied to the popover window element.
         *
         * @since 2.2.0
         */
        this.popoverClass = this._config.popoverClass;
        /**
         * The opening delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
         *
         * @since 4.1.0
         */
        this.openDelay = this._config.openDelay;
        /**
         * The closing delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
         *
         * @since 4.1.0
         */
        this.closeDelay = this._config.closeDelay;
        /**
         * An event emitted when the popover opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the popover closing animation has finished. Contains no payload.
         *
         * At this point popover is not in the DOM anymore.
         */
        this.hidden = new EventEmitter();
        this._nativeElement = inject(ElementRef).nativeElement;
        this._ngZone = inject(NgZone);
        this._document = inject(DOCUMENT);
        this._changeDetector = inject(ChangeDetectorRef);
        this._injector = inject(Injector);
        this._ngbPopoverWindowId = `ngb-popover-${nextId$1++}`;
        this._popupService = new PopupService(NgbPopoverWindow);
        this._windowRef = null;
        this._positioning = ngbPositioning();
    }
    /**
     * Opens the popover.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the popover template when it is created.
     */
    open(context) {
        if (!this._windowRef && !this._isDisabled()) {
            // this type assertion is safe because otherwise _isDisabled would return true
            const { windowRef, transition$ } = this._popupService.open(this.ngbPopover, context ?? this.popoverContext, this.animation);
            this._windowRef = windowRef;
            this._windowRef.setInput('animation', this.animation);
            this._windowRef.setInput('title', this.popoverTitle);
            this._windowRef.setInput('context', context ?? this.popoverContext);
            this._windowRef.setInput('popoverClass', this.popoverClass);
            this._windowRef.setInput('id', this._ngbPopoverWindowId);
            this._getPositionTargetElement().setAttribute('aria-describedby', this._ngbPopoverWindowId);
            if (this.container === 'body') {
                this._document.body.appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening popover from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because popover won't work inside the OnPush component.
            // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the popover from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                this._positioning.createPopper({
                    hostElement: this._getPositionTargetElement(),
                    targetElement: this._windowRef.location.nativeElement,
                    placement: this.placement,
                    baseClass: 'bs-popover',
                    updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 8])(options)),
                });
                Promise.resolve().then(() => {
                    // This update is required for correct arrow placement
                    this._positioning.update();
                });
                this._afterRenderRef = afterRender({
                    mixedReadWrite: () => {
                        this._positioning.update();
                    },
                }, { injector: this._injector });
            });
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [
                this._windowRef.location.nativeElement,
            ]);
            transition$.subscribe(() => this.shown.emit());
        }
    }
    /**
     * Closes the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    close(animation = this.animation) {
        if (this._windowRef) {
            this._getPositionTargetElement().removeAttribute('aria-describedby');
            this._popupService.close(animation).subscribe(() => {
                this._windowRef = null;
                this._positioning.destroy();
                this._afterRenderRef?.destroy();
                this.hidden.emit();
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * Toggles the popover.
     *
     * This is considered to be a "manual" triggering of the popover.
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the popover is currently shown.
     */
    isOpen() {
        return this._windowRef != null;
    }
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    ngOnChanges({ ngbPopover, popoverTitle, disablePopover, popoverClass }) {
        if (popoverClass && this.isOpen()) {
            this._windowRef.setInput('popoverClass', popoverClass.currentValue);
        }
        // close popover if title and content become empty, or disablePopover set to true
        if ((ngbPopover || popoverTitle || disablePopover) && this._isDisabled()) {
            this.close();
        }
    }
    ngOnDestroy() {
        this.close(false);
        // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        this._unregisterListenersFn?.();
    }
    _isDisabled() {
        return this.disablePopover ? true : !this.ngbPopover && !this.popoverTitle;
    }
    _getPositionTargetElement() {
        return ((isString(this.positionTarget) ? this._document.querySelector(this.positionTarget) : this.positionTarget) ||
            this._nativeElement);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopover, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbPopover, isStandalone: true, selector: "[ngbPopover]", inputs: { animation: "animation", autoClose: "autoClose", ngbPopover: "ngbPopover", popoverTitle: "popoverTitle", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disablePopover: "disablePopover", popoverClass: "popoverClass", popoverContext: "popoverContext", openDelay: "openDelay", closeDelay: "closeDelay" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbPopover"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopover, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover', standalone: true }]
        }], propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], ngbPopover: [{
                type: Input
            }], popoverTitle: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], triggers: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], container: [{
                type: Input
            }], disablePopover: [{
                type: Input
            }], popoverClass: [{
                type: Input
            }], popoverContext: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });

class NgbPopoverModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbPopoverModule, imports: [NgbPopover], exports: [NgbPopover] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopoverModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbPopoverModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbPopover],
                    exports: [NgbPopover],
                }]
        }] });

/**
 * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the progress bars used in the application.
 */
class NgbProgressbarConfig {
    constructor() {
        this.max = 100;
        this.animated = false;
        this.ariaLabel = 'progress bar';
        this.striped = false;
        this.showValue = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbarConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbarConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbarConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * A directive that provides feedback on the progress of a workflow or an action.
 */
class NgbProgressbar {
    /**
     * The maximal value to be displayed in the progress bar.
     *
     * Should be a positive number. Will default to 100 otherwise.
     */
    set max(max) {
        this._max = !isNumber(max) || max <= 0 ? 100 : max;
    }
    get max() {
        return this._max;
    }
    constructor() {
        this._config = inject(NgbProgressbarConfig);
        this.stacked = inject(NgbProgressbarStacked, { optional: true });
        /**
         * If `true`, the stripes on the progress bar are animated.
         *
         * Takes effect only for browsers supporting CSS3 animations, and if `striped` is `true`.
         */
        this.animated = this._config.animated;
        /**
         * The accessible progress bar name.
         *
         * @since 13.1.0
         */
        this.ariaLabel = this._config.ariaLabel;
        /**
         * If `true`, the progress bars will be displayed as striped.
         */
        this.striped = this._config.striped;
        /**
         * If `true`, the current percentage will be shown in the `xx%` format.
         */
        this.showValue = this._config.showValue;
        /**
         * Optional text variant type of the progress bar.
         *
         * Supports types based on Bootstrap background color variants, like:
         *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
         *
         * @since 5.2.0
         */
        this.textType = this._config.textType;
        /**
         * The type of the progress bar.
         *
         * Supports types based on Bootstrap background color variants, like:
         *  `"success"`, `"info"`, `"warning"`, `"danger"`, `"primary"`, `"secondary"`, `"dark"` and so on.
         */
        this.type = this._config.type;
        /**
         * The current value for the progress bar.
         *
         * Should be in the `[0, max]` range.
         */
        this.value = 0;
        /**
         * The height of the progress bar.
         *
         * Accepts any valid CSS height values, ex. `"2rem"`
         */
        this.height = this._config.height;
        this.max = this._config.max;
    }
    getValue() {
        return getValueInRange(this.value, this.max);
    }
    getPercentValue() {
        return (100 * this.getValue()) / this.max;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbar, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbProgressbar, isStandalone: true, selector: "ngb-progressbar", inputs: { max: "max", animated: "animated", ariaLabel: "ariaLabel", striped: "striped", showValue: "showValue", textType: "textType", type: "type", value: "value", height: "height" }, host: { attributes: { "role": "progressbar", "aria-valuemin": "0" }, properties: { "attr.aria-valuenow": "getValue()", "attr.aria-valuemax": "max", "attr.aria-label": "ariaLabel", "style.width.%": "stacked ? getPercentValue() : null", "style.height": "height" }, classAttribute: "progress" }, ngImport: i0, template: `
		<div
			class="progress-bar{{ type ? (textType ? ' bg-' + type : ' text-bg-' + type) : '' }}{{
				textType ? ' text-' + textType : ''
			}}"
			[class.progress-bar-animated]="animated"
			[class.progress-bar-striped]="striped"
			[style.width.%]="!stacked ? getPercentValue() : null"
		>
			@if (showValue) {
				<span i18n="@@ngb.progressbar.value">{{ getValue() / max | percent }}</span>
			}
			<ng-content />
		</div>
	`, isInline: true, dependencies: [{ kind: "pipe", type: PercentPipe, name: "percent" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbar, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-progressbar',
                    imports: [PercentPipe],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'progress',
                        role: 'progressbar',
                        '[attr.aria-valuenow]': 'getValue()',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-label]': 'ariaLabel',
                        '[style.width.%]': 'stacked ? getPercentValue() : null',
                        '[style.height]': 'height',
                    },
                    template: `
		<div
			class="progress-bar{{ type ? (textType ? ' bg-' + type : ' text-bg-' + type) : '' }}{{
				textType ? ' text-' + textType : ''
			}}"
			[class.progress-bar-animated]="animated"
			[class.progress-bar-striped]="striped"
			[style.width.%]="!stacked ? getPercentValue() : null"
		>
			@if (showValue) {
				<span i18n="@@ngb.progressbar.value">{{ getValue() / max | percent }}</span>
			}
			<ng-content />
		</div>
	`,
                }]
        }], ctorParameters: () => [], propDecorators: { max: [{
                type: Input
            }], animated: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], striped: [{
                type: Input
            }], showValue: [{
                type: Input
            }], textType: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], height: [{
                type: Input
            }] } });
/**
 * A directive that allow to stack progress bars.
 *
 * @since 16.0.0
 */
class NgbProgressbarStacked {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbarStacked, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.0.3", type: NgbProgressbarStacked, isStandalone: true, selector: "ngb-progressbar-stacked", host: { classAttribute: "progress-stacked" }, ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbarStacked, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-progressbar-stacked',
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'progress-stacked',
                    },
                    template: `<ng-content></ng-content>`,
                }]
        }] });

class NgbProgressbarModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbarModule, imports: [NgbProgressbar, NgbProgressbarStacked], exports: [NgbProgressbar, NgbProgressbarStacked] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbarModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbProgressbarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbProgressbar, NgbProgressbarStacked],
                    exports: [NgbProgressbar, NgbProgressbarStacked],
                }]
        }] });

/**
 * A configuration service for the [`NgbRating`](#/components/rating/api#NgbRating) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the ratings used in the application.
 */
class NgbRatingConfig {
    constructor() {
        this.max = 10;
        this.readonly = false;
        this.resettable = false;
        this.tabindex = 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRatingConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRatingConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRatingConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * A directive that helps visualising and interacting with a star rating bar.
 */
class NgbRating {
    constructor() {
        this.contexts = [];
        this._config = inject(NgbRatingConfig);
        this._changeDetectorRef = inject(ChangeDetectorRef);
        /**
         * If `true`, the rating can't be changed or focused.
         */
        this.disabled = false;
        /**
         * The maximal rating that can be given.
         */
        this.max = this._config.max;
        /**
         * If `true`, the rating can't be changed.
         */
        this.readonly = this._config.readonly;
        /**
         * If `true`, the rating can be reset to `0` by mouse clicking currently set rating.
         */
        this.resettable = this._config.resettable;
        /**
         * Allows setting a custom rating tabindex.
         * If the component is disabled, `tabindex` will still be set to `-1`.
         *
         * @since 13.1.0
         */
        this.tabindex = this._config.tabindex;
        /**
         * An event emitted when the user is hovering over a given rating.
         *
         * Event payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event emitted when the user stops hovering over a given rating.
         *
         * Event payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event emitted when the rating is changed.
         *
         * Event payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    /**
     * Allows to provide a function to set a custom aria-valuetext
     *
     * @since 14.1.0
     */
    ariaValueText(current, max) {
        return `${current} out of ${max}`;
    }
    isInteractive() {
        return !this.readonly && !this.disabled;
    }
    enter(value) {
        if (this.isInteractive()) {
            this._updateState(value);
        }
        this.hover.emit(value);
    }
    handleBlur() {
        this.onTouched();
    }
    handleClick(value) {
        if (this.isInteractive()) {
            this.update(this.resettable && this.rate === value ? 0 : value);
        }
    }
    handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowLeft':
                this.update(this.rate - 1);
                break;
            case 'ArrowUp':
            case 'ArrowRight':
                this.update(this.rate + 1);
                break;
            case 'Home':
                this.update(0);
                break;
            case 'End':
                this.update(this.max);
                break;
            default:
                return;
        }
        // note 'return' in default case
        event.preventDefault();
    }
    ngOnChanges(changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
        if (changes['max']) {
            this._updateMax();
        }
    }
    ngOnInit() {
        this._setupContexts();
        this._updateState(this.rate);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    reset() {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    update(value, internalChange = true) {
        const newRate = getValueInRange(value, this.max, 0);
        if (this.isInteractive() && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    }
    writeValue(value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    }
    _updateState(nextValue) {
        this.nextRate = nextValue;
        this.contexts.forEach((context, index) => (context.fill = Math.round(getValueInRange(nextValue - index, 1, 0) * 100)));
    }
    _updateMax() {
        if (this.max > 0) {
            this._setupContexts();
            this.update(this.rate);
        }
    }
    _setupContexts() {
        this.contexts = Array.from({ length: this.max }, (v, k) => ({ fill: 0, index: k }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRating, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbRating, isStandalone: true, selector: "ngb-rating", inputs: { disabled: "disabled", max: "max", rate: "rate", readonly: "readonly", resettable: "resettable", starTemplate: "starTemplate", tabindex: "tabindex", ariaValueText: "ariaValueText" }, outputs: { hover: "hover", leave: "leave", rateChange: "rateChange" }, host: { attributes: { "role": "slider", "aria-valuemin": "0" }, listeners: { "blur": "handleBlur()", "keydown": "handleKeyDown($event)", "mouseleave": "reset()" }, properties: { "tabindex": "disabled ? -1 : tabindex", "attr.aria-valuemax": "max", "attr.aria-valuenow": "nextRate", "attr.aria-valuetext": "ariaValueText(nextRate, max)", "attr.aria-readonly": "readonly && !disabled ? true : null", "attr.aria-disabled": "disabled ? true : null" }, classAttribute: "d-inline-flex" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRating), multi: true }], queries: [{ propertyName: "starTemplateFromContent", first: true, predicate: TemplateRef, descendants: true }], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
		@for (_ of contexts; track _; let index = $index) {
			<span class="visually-hidden">({{ index < nextRate ? '*' : ' ' }})</span>
			<span
				(mouseenter)="enter(index + 1)"
				(click)="handleClick(index + 1)"
				[style.cursor]="isInteractive() ? 'pointer' : 'default'"
			>
				<ng-template
					[ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
					[ngTemplateOutletContext]="contexts[index]"
				/>
			</span>
		}
	`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRating, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-rating',
                    imports: [NgTemplateOutlet],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'd-inline-flex',
                        '[tabindex]': 'disabled ? -1 : tabindex',
                        role: 'slider',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuenow]': 'nextRate',
                        '[attr.aria-valuetext]': 'ariaValueText(nextRate, max)',
                        '[attr.aria-readonly]': 'readonly && !disabled ? true : null',
                        '[attr.aria-disabled]': 'disabled ? true : null',
                        '(blur)': 'handleBlur()',
                        '(keydown)': 'handleKeyDown($event)',
                        '(mouseleave)': 'reset()',
                    },
                    template: `
		<ng-template #t let-fill="fill">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>
		@for (_ of contexts; track _; let index = $index) {
			<span class="visually-hidden">({{ index < nextRate ? '*' : ' ' }})</span>
			<span
				(mouseenter)="enter(index + 1)"
				(click)="handleClick(index + 1)"
				[style.cursor]="isInteractive() ? 'pointer' : 'default'"
			>
				<ng-template
					[ngTemplateOutlet]="starTemplate || starTemplateFromContent || t"
					[ngTemplateOutletContext]="contexts[index]"
				/>
			</span>
		}
	`,
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRating), multi: true }],
                }]
        }], propDecorators: { disabled: [{
                type: Input
            }], max: [{
                type: Input
            }], rate: [{
                type: Input
            }], readonly: [{
                type: Input
            }], resettable: [{
                type: Input
            }], starTemplate: [{
                type: Input
            }], starTemplateFromContent: [{
                type: ContentChild,
                args: [TemplateRef, { static: false }]
            }], tabindex: [{
                type: Input
            }], ariaValueText: [{
                type: Input
            }], hover: [{
                type: Output
            }], leave: [{
                type: Output
            }], rateChange: [{
                type: Output
            }] } });

class NgbRatingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbRatingModule, imports: [NgbRating], exports: [NgbRating] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRatingModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbRatingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbRating],
                    exports: [NgbRating],
                }]
        }] });

function toFragmentElement(container, id) {
    if (!container || id == null) {
        return null;
    }
    return isString(id) ? container.querySelector(`#${CSS.escape(id)}`) : id;
}
function getOrderedFragments(container, fragments) {
    const selector = [...fragments].map(({ id }) => `#${CSS.escape(id)}`).join(',');
    return Array.from(container.querySelectorAll(selector));
}
const defaultProcessChanges = (state, changeActive, ctx) => {
    const { rootElement, fragments, scrollSpy, options, entries } = state;
    const orderedFragments = getOrderedFragments(rootElement, fragments);
    if (!ctx.initialized) {
        ctx.initialized = true;
        ctx.gapFragment = null;
        ctx.visibleFragments = new Set();
        // special case when one of the fragments was pre-selected
        const preSelectedFragment = toFragmentElement(rootElement, options?.initialFragment);
        if (preSelectedFragment) {
            scrollSpy.scrollTo(preSelectedFragment);
            return;
        }
    }
    for (const entry of entries) {
        const { isIntersecting, target: fragment } = entry;
        // 1. an entry became visible
        if (isIntersecting) {
            // if we were in-between two elements, we have to clear it up
            if (ctx.gapFragment) {
                ctx.visibleFragments.delete(ctx.gapFragment);
                ctx.gapFragment = null;
            }
            ctx.visibleFragments.add(fragment);
        }
        // 2. an entry became invisible
        else {
            ctx.visibleFragments.delete(fragment);
            // nothing is visible anymore, but something just was actually
            if (ctx.visibleFragments.size === 0 && scrollSpy.active !== '') {
                // 2.1 scrolling down - keeping the same element
                if (entry.boundingClientRect.top < entry.rootBounds.top) {
                    ctx.gapFragment = fragment;
                    ctx.visibleFragments.add(ctx.gapFragment);
                }
                // 2.2 scrolling up - getting the previous element
                else {
                    // scrolling up and no more fragments above
                    if (fragment === orderedFragments[0]) {
                        ctx.gapFragment = null;
                        ctx.visibleFragments.clear();
                        changeActive('');
                        return;
                    }
                    // getting previous fragment
                    else {
                        const fragmentIndex = orderedFragments.indexOf(fragment);
                        ctx.gapFragment = orderedFragments[fragmentIndex - 1] || null;
                        if (ctx.gapFragment) {
                            ctx.visibleFragments.add(ctx.gapFragment);
                        }
                    }
                }
            }
        }
    }
    // getting the first visible element in the DOM order of the fragments
    for (const fragment of orderedFragments) {
        if (ctx.visibleFragments.has(fragment)) {
            changeActive(fragment.id);
            break;
        }
    }
};

/**
 * A configuration service for the [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all scrollspies used in the application.
 *
 * @since 15.1.0
 */
class NgbScrollSpyConfig {
    constructor() {
        this.scrollBehavior = 'smooth';
        this.processChanges = defaultProcessChanges;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const MATCH_THRESHOLD = 3;
/**
 * A scrollspy service that allows tracking of elements scrolling in and out of view.
 *
 * It can be instantiated manually, or automatically by the `ngbScrollSpy` directive.
 *
 * @since 15.1.0
 */
class NgbScrollSpyService {
    constructor() {
        this._observer = null;
        this._containerElement = null;
        this._fragments = new Set();
        this._preRegisteredFragments = new Set();
        this._active$ = new Subject();
        this._distinctActive$ = this._active$.pipe(distinctUntilChanged());
        this._active = '';
        this._config = inject(NgbScrollSpyConfig);
        this._document = inject(DOCUMENT);
        this._platformId = inject(PLATFORM_ID);
        this._scrollBehavior = this._config.scrollBehavior;
        this._diChangeDetectorRef = inject(ChangeDetectorRef, { optional: true });
        this._changeDetectorRef = this._diChangeDetectorRef;
        this._zone = inject(NgZone);
        this._distinctActive$.pipe(takeUntilDestroyed()).subscribe((active) => {
            this._active = active;
            this._changeDetectorRef?.markForCheck();
        });
    }
    /**
     * Getter for the currently active fragment id. Returns empty string if none.
     */
    get active() {
        return this._active;
    }
    /**
     * An observable emitting the currently active fragment. Emits empty string if none.
     */
    get active$() {
        return this._distinctActive$;
    }
    /**
     * Starts the scrollspy service and observes specified fragments.
     *
     * You can specify a list of options to pass, like the root element, initial fragment, scroll behavior, etc.
     * See the [`NgbScrollSpyOptions`](#/components/scrollspy/api#NgbScrollSpyOptions) interface for more details.
     */
    start(options) {
        if (isPlatformBrowser(this._platformId)) {
            this._cleanup();
            const { root, rootMargin, scrollBehavior, threshold, fragments, changeDetectorRef, processChanges } = {
                ...options,
            };
            this._containerElement = root ?? this._document.documentElement;
            this._changeDetectorRef = changeDetectorRef ?? this._diChangeDetectorRef;
            this._scrollBehavior = scrollBehavior ?? this._config.scrollBehavior;
            const processChangesFn = processChanges ?? this._config.processChanges;
            const context = {};
            this._observer = new IntersectionObserver((entries) => processChangesFn({
                entries,
                rootElement: this._containerElement,
                fragments: this._fragments,
                scrollSpy: this,
                options: { ...options },
            }, (active) => this._active$.next(active), context), {
                root: root ?? this._document,
                ...(rootMargin && { rootMargin }),
                ...(threshold && { threshold }),
            });
            // merging fragments added before starting and the ones passed as options
            for (const element of [...this._preRegisteredFragments, ...(fragments ?? [])]) {
                this.observe(element);
            }
            this._preRegisteredFragments.clear();
        }
    }
    /**
     * Stops the service and unobserves all fragments.
     */
    stop() {
        this._cleanup();
        this._active$.next('');
    }
    /**
     * Scrolls to a fragment, it must be known to the service and contained in the root element.
     * An id or an element reference can be passed.
     *
     * [`NgbScrollToOptions`](#/components/scrollspy/api#NgbScrollToOptions) can be passed.
     */
    scrollTo(fragment, options) {
        const { behavior } = { behavior: this._scrollBehavior, ...options };
        if (this._containerElement) {
            const fragmentElement = toFragmentElement(this._containerElement, fragment);
            if (fragmentElement) {
                const heightPx = fragmentElement.offsetTop - this._containerElement.offsetTop;
                this._containerElement.scrollTo({ top: heightPx, behavior });
                let lastOffset = this._containerElement.scrollTop;
                let matchCounter = 0;
                // we should update the active section only after scrolling is finished
                // and there is no clean way to do it at the moment
                const containerElement = this._containerElement;
                this._zone.runOutsideAngular(() => {
                    const updateActiveWhenScrollingIsFinished = () => {
                        const sameOffsetAsLastTime = lastOffset === containerElement.scrollTop;
                        if (sameOffsetAsLastTime) {
                            matchCounter++;
                        }
                        else {
                            matchCounter = 0;
                        }
                        if (!sameOffsetAsLastTime || (sameOffsetAsLastTime && matchCounter < MATCH_THRESHOLD)) {
                            lastOffset = containerElement.scrollTop;
                            requestAnimationFrame(updateActiveWhenScrollingIsFinished);
                        }
                        else {
                            this._zone.run(() => this._active$.next(fragmentElement.id));
                        }
                    };
                    requestAnimationFrame(updateActiveWhenScrollingIsFinished);
                });
            }
        }
    }
    /**
     * Adds a fragment to observe. It must be contained in the root element.
     * An id or an element reference can be passed.
     */
    observe(fragment) {
        if (!this._observer) {
            this._preRegisteredFragments.add(fragment);
            return;
        }
        const fragmentElement = toFragmentElement(this._containerElement, fragment);
        if (fragmentElement && !this._fragments.has(fragmentElement)) {
            this._fragments.add(fragmentElement);
            this._observer.observe(fragmentElement);
        }
    }
    /**
     * Unobserves a fragment.
     * An id or an element reference can be passed.
     */
    unobserve(fragment) {
        if (!this._observer) {
            this._preRegisteredFragments.delete(fragment);
            return;
        }
        const fragmentElement = toFragmentElement(this._containerElement, fragment);
        if (fragmentElement) {
            this._fragments.delete(fragmentElement);
            // we're removing and re-adding all current fragments to recompute active one
            this._observer.disconnect();
            for (const fragment of this._fragments) {
                this._observer.observe(fragment);
            }
        }
    }
    ngOnDestroy() {
        this._cleanup();
    }
    _cleanup() {
        this._fragments.clear();
        this._observer?.disconnect();
        this._changeDetectorRef = this._diChangeDetectorRef;
        this._scrollBehavior = this._config.scrollBehavior;
        this._observer = null;
        this._containerElement = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

/**
 * A helper directive to that links menu items and fragments together.
 *
 * It will automatically add the `.active` class to the menu item when the associated fragment becomes active.
 *
 * @since 15.1.0
 */
class NgbScrollSpyItem {
    constructor() {
        this._changeDetector = inject(ChangeDetectorRef);
        this._scrollSpyMenu = inject(NgbScrollSpyMenu, { optional: true });
        this._scrollSpyAPI = this._scrollSpyMenu ?? inject(NgbScrollSpyService);
        this._destroyRef = inject(DestroyRef);
        this._isActive = false;
    }
    /**
     * References the scroll spy directive, the id of the associated fragment and the parent menu item.
     *
     * Can be used like:
     *  - `ngbScrollSpyItem="fragmentId"`
     *  - `[ngbScrollSpyItem]="scrollSpy" fragment="fragmentId"
     *  - `[ngbScrollSpyItem]="[scrollSpy, 'fragmentId']"` parent="parentId"`
     *  - `[ngbScrollSpyItem]="[scrollSpy, 'fragmentId', 'parentId']"`
     *
     *  As well as together with `[fragment]` and `[parent]` inputs.
     */
    set data(data) {
        if (Array.isArray(data)) {
            this._scrollSpyAPI = data[0];
            this.fragment = data[1];
            this.parent ??= data[2];
        }
        else if (data instanceof NgbScrollSpy) {
            this._scrollSpyAPI = data;
        }
        else if (isString(data)) {
            this.fragment = data;
        }
    }
    ngOnInit() {
        // if it is not a part of a bigger menu, it should handle activation itself
        if (!this._scrollSpyMenu) {
            this._scrollSpyAPI.active$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((active) => {
                if (active === this.fragment) {
                    this._activate();
                }
                else {
                    this._deactivate();
                }
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * @internal
     */
    _activate() {
        this._isActive = true;
        if (this._scrollSpyMenu) {
            this._scrollSpyMenu.getItem(this.parent ?? '')?._activate();
        }
    }
    /**
     * @internal
     */
    _deactivate() {
        this._isActive = false;
        if (this._scrollSpyMenu) {
            this._scrollSpyMenu.getItem(this.parent ?? '')?._deactivate();
        }
    }
    /**
     * Returns `true`, if the associated fragment is active.
     */
    isActive() {
        return this._isActive;
    }
    /**
     * Scrolls to the associated fragment.
     */
    scrollTo(options) {
        this._scrollSpyAPI.scrollTo(this.fragment, options);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbScrollSpyItem, isStandalone: true, selector: "[ngbScrollSpyItem]", inputs: { data: ["ngbScrollSpyItem", "data"], fragment: "fragment", parent: "parent" }, host: { listeners: { "click": "scrollTo();" }, properties: { "class.active": "isActive()" } }, exportAs: ["ngbScrollSpyItem"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpyItem]',
                    standalone: true,
                    exportAs: 'ngbScrollSpyItem',
                    host: {
                        '[class.active]': 'isActive()',
                        '(click)': 'scrollTo();',
                    },
                }]
        }], propDecorators: { data: [{
                type: Input,
                args: ['ngbScrollSpyItem']
            }], fragment: [{
                type: Input
            }], parent: [{
                type: Input
            }] } });
/**
 * An optional scroll spy menu directive to build hierarchical menus
 * and simplify the [`NgbScrollSpyItem`](#/components/scrollspy/api#NgbScrollSpyItem) configuration.
 *
 * @since 15.1.0
 */
class NgbScrollSpyMenu {
    constructor() {
        this._scrollSpyRef = inject(NgbScrollSpyService);
        this._destroyRef = inject(DestroyRef);
        this._map = new Map();
        this._lastActiveItem = null;
    }
    set scrollSpy(scrollSpy) {
        this._scrollSpyRef = scrollSpy;
    }
    get active() {
        return this._scrollSpyRef.active;
    }
    get active$() {
        return this._scrollSpyRef.active$;
    }
    scrollTo(fragment, options) {
        this._scrollSpyRef.scrollTo(fragment, options);
    }
    getItem(id) {
        return this._map.get(id);
    }
    ngAfterViewInit() {
        this._items.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this._rebuildMap());
        this._rebuildMap();
        this._scrollSpyRef.active$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((activeId) => {
            this._lastActiveItem?._deactivate();
            const item = this._map.get(activeId);
            if (item) {
                item._activate();
                this._lastActiveItem = item;
            }
        });
    }
    _rebuildMap() {
        this._map.clear();
        for (let item of this._items) {
            this._map.set(item.fragment, item);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyMenu, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbScrollSpyMenu, isStandalone: true, selector: "[ngbScrollSpyMenu]", inputs: { scrollSpy: ["ngbScrollSpyMenu", "scrollSpy"] }, queries: [{ propertyName: "_items", predicate: NgbScrollSpyItem, descendants: true }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyMenu, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpyMenu]',
                    standalone: true,
                }]
        }], propDecorators: { _items: [{
                type: ContentChildren,
                args: [NgbScrollSpyItem, { descendants: true }]
            }], scrollSpy: [{
                type: Input,
                args: ['ngbScrollSpyMenu']
            }] } });
/**
 * A directive to put on a scrollable container.
 *
 * It will instantiate a [`NgbScrollSpyService`](#/components/scrollspy/api#NgbScrollSpyService).
 *
 * @since 15.1.0
 */
class NgbScrollSpy {
    constructor() {
        this._initialFragment = null;
        this._service = inject(NgbScrollSpyService);
        this._nativeElement = inject(ElementRef).nativeElement;
        /**
         * An event raised when the active section changes.
         *
         * Payload is the id of the new active section, empty string if none.
         */
        this.activeChange = this._service.active$;
    }
    set active(fragment) {
        this._initialFragment = fragment;
        this.scrollTo(fragment);
    }
    /**
     * Getter/setter for the currently active fragment id.
     */
    get active() {
        return this._service.active;
    }
    /**
     * Returns an observable that emits currently active section id.
     */
    get active$() {
        return this._service.active$;
    }
    ngAfterViewInit() {
        this._service.start({
            processChanges: this.processChanges,
            root: this._nativeElement,
            rootMargin: this.rootMargin,
            threshold: this.threshold,
            ...(this._initialFragment && { initialFragment: this._initialFragment }),
        });
    }
    /**
     * @internal
     */
    _registerFragment(fragment) {
        this._service.observe(fragment.id);
    }
    /**
     * @internal
     */
    _unregisterFragment(fragment) {
        this._service.unobserve(fragment.id);
    }
    /**
     * Scrolls to a fragment that is identified by the `ngbScrollSpyFragment` directive.
     * An id or an element reference can be passed.
     */
    scrollTo(fragment, options) {
        this._service.scrollTo(fragment, {
            ...(this.scrollBehavior && { behavior: this.scrollBehavior }),
            ...options,
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpy, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbScrollSpy, isStandalone: true, selector: "[ngbScrollSpy]", inputs: { processChanges: "processChanges", rootMargin: "rootMargin", scrollBehavior: "scrollBehavior", threshold: "threshold", active: "active" }, outputs: { activeChange: "activeChange" }, host: { attributes: { "tabindex": "0" }, styleAttribute: "overflow-y: auto" }, providers: [NgbScrollSpyService], exportAs: ["ngbScrollSpy"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpy, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpy]',
                    standalone: true,
                    exportAs: 'ngbScrollSpy',
                    host: {
                        tabindex: '0',
                        style: 'overflow-y: auto',
                    },
                    providers: [NgbScrollSpyService],
                }]
        }], propDecorators: { processChanges: [{
                type: Input
            }], rootMargin: [{
                type: Input
            }], scrollBehavior: [{
                type: Input
            }], threshold: [{
                type: Input
            }], active: [{
                type: Input
            }], activeChange: [{
                type: Output
            }] } });
/**
 * A directive to put on a fragment observed inside a scrollspy container.
 *
 * @since 15.1.0
 */
class NgbScrollSpyFragment {
    constructor() {
        this._destroyRef = inject(DestroyRef);
        this._scrollSpy = inject(NgbScrollSpy);
    }
    ngAfterViewInit() {
        this._scrollSpy._registerFragment(this);
        this._destroyRef.onDestroy(() => this._scrollSpy._unregisterFragment(this));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyFragment, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbScrollSpyFragment, isStandalone: true, selector: "[ngbScrollSpyFragment]", inputs: { id: ["ngbScrollSpyFragment", "id"] }, host: { properties: { "id": "id" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyFragment, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbScrollSpyFragment]',
                    standalone: true,
                    host: {
                        '[id]': 'id',
                    },
                }]
        }], propDecorators: { id: [{
                type: Input,
                args: ['ngbScrollSpyFragment']
            }] } });

class NgbScrollSpyModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyModule, imports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu], exports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbScrollSpyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu],
                    exports: [NgbScrollSpy, NgbScrollSpyItem, NgbScrollSpyFragment, NgbScrollSpyMenu],
                }]
        }] });

class NgbTime {
    constructor(hour, minute, second) {
        this.hour = toInteger(hour);
        this.minute = toInteger(minute);
        this.second = toInteger(second);
    }
    changeHour(step = 1) {
        this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step);
    }
    updateHour(hour) {
        if (isNumber(hour)) {
            this.hour = (hour < 0 ? 24 + hour : hour) % 24;
        }
        else {
            this.hour = NaN;
        }
    }
    changeMinute(step = 1) {
        this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step);
    }
    updateMinute(minute) {
        if (isNumber(minute)) {
            this.minute = minute % 60 < 0 ? 60 + (minute % 60) : minute % 60;
            this.changeHour(Math.floor(minute / 60));
        }
        else {
            this.minute = NaN;
        }
    }
    changeSecond(step = 1) {
        this.updateSecond((isNaN(this.second) ? 0 : this.second) + step);
    }
    updateSecond(second) {
        if (isNumber(second)) {
            this.second = second < 0 ? 60 + (second % 60) : second % 60;
            this.changeMinute(Math.floor(second / 60));
        }
        else {
            this.second = NaN;
        }
    }
    isValid(checkSecs = true) {
        return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
    }
    toString() {
        return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`;
    }
}

/**
 * A configuration service for the [`NgbTimepicker`](#/components/timepicker/api#NgbTimepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the timepickers used in the application.
 */
class NgbTimepickerConfig {
    constructor() {
        this.meridian = false;
        this.spinners = true;
        this.seconds = false;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.disabled = false;
        this.readonlyInputs = false;
        this.size = 'medium';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
    return new NgbTimeStructAdapter();
}
/**
 * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding timepicker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
class NgbTimeAdapter {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimeAdapter, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimeAdapter, providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimeAdapter, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY }]
        }] });
class NgbTimeStructAdapter extends NgbTimeAdapter {
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    fromModel(time) {
        return time && isInteger(time.hour) && isInteger(time.minute)
            ? { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null }
            : null;
    }
    /**
     * Converts a NgbTimeStruct value into NgbTimeStruct value
     */
    toModel(time) {
        return time && isInteger(time.hour) && isInteger(time.minute)
            ? { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null }
            : null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimeStructAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimeStructAdapter }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimeStructAdapter, decorators: [{
            type: Injectable
        }] });

/**
 * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
 * The default implementation of this service honors the Angular locale, and uses the registered locale data,
 * as explained in the Angular i18n guide.
 */
class NgbTimepickerI18n {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerI18n, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerI18n, providedIn: 'root', useFactory: () => new NgbTimepickerI18nDefault() }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerI18n, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => new NgbTimepickerI18nDefault(),
                }]
        }] });
class NgbTimepickerI18nDefault extends NgbTimepickerI18n {
    constructor() {
        super(...arguments);
        this._locale = inject(LOCALE_ID);
        this._periods = [
            formatDate(new Date(3600000), 'a', this._locale, 'UTC'),
            formatDate(new Date(3600000 * 13), 'a', this._locale, 'UTC'),
        ];
    }
    getMorningPeriod() {
        return this._periods[0];
    }
    getAfternoonPeriod() {
        return this._periods[1];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerI18nDefault, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerI18nDefault }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerI18nDefault, decorators: [{
            type: Injectable
        }] });

const FILTER_REGEX = /[^0-9]/g;
/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
class NgbTimepicker {
    /**
     * The number of hours to add/subtract when clicking hour spinners.
     */
    set hourStep(step) {
        this._hourStep = isInteger(step) ? step : this._config.hourStep;
    }
    get hourStep() {
        return this._hourStep;
    }
    /**
     * The number of minutes to add/subtract when clicking minute spinners.
     */
    set minuteStep(step) {
        this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
    }
    get minuteStep() {
        return this._minuteStep;
    }
    /**
     * The number of seconds to add/subtract when clicking second spinners.
     */
    set secondStep(step) {
        this._secondStep = isInteger(step) ? step : this._config.secondStep;
    }
    get secondStep() {
        return this._secondStep;
    }
    constructor(_config, _ngbTimeAdapter, _cd, i18n) {
        this._config = _config;
        this._ngbTimeAdapter = _ngbTimeAdapter;
        this._cd = _cd;
        this.i18n = i18n;
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.meridian = _config.meridian;
        this.spinners = _config.spinners;
        this.seconds = _config.seconds;
        this.hourStep = _config.hourStep;
        this.minuteStep = _config.minuteStep;
        this.secondStep = _config.secondStep;
        this.disabled = _config.disabled;
        this.readonlyInputs = _config.readonlyInputs;
        this.size = _config.size;
    }
    writeValue(value) {
        const structValue = this._ngbTimeAdapter.fromModel(value);
        this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
        if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
            this.model.second = 0;
        }
        this._cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * Increments the hours by the given step.
     */
    changeHour(step) {
        this.model?.changeHour(step);
        this.propagateModelChange();
    }
    /**
     * Increments the minutes by the given step.
     */
    changeMinute(step) {
        this.model?.changeMinute(step);
        this.propagateModelChange();
    }
    /**
     * Increments the seconds by the given step.
     */
    changeSecond(step) {
        this.model?.changeSecond(step);
        this.propagateModelChange();
    }
    /**
     * Update hours with the new value.
     */
    updateHour(newVal) {
        const isPM = this.model ? this.model.hour >= 12 : false;
        const enteredHour = toInteger(newVal);
        if (this.meridian && ((isPM && enteredHour < 12) || (!isPM && enteredHour === 12))) {
            this.model?.updateHour(enteredHour + 12);
        }
        else {
            this.model?.updateHour(enteredHour);
        }
        this.propagateModelChange();
    }
    /**
     * Update minutes with the new value.
     */
    updateMinute(newVal) {
        this.model?.updateMinute(toInteger(newVal));
        this.propagateModelChange();
    }
    /**
     * Update seconds with the new value.
     */
    updateSecond(newVal) {
        this.model?.updateSecond(toInteger(newVal));
        this.propagateModelChange();
    }
    toggleMeridian() {
        if (this.meridian) {
            this.changeHour(12);
        }
    }
    formatInput(input) {
        input.value = input.value.replace(FILTER_REGEX, '');
    }
    formatHour(value) {
        if (isNumber(value)) {
            if (this.meridian) {
                return padNumber(value % 12 === 0 ? 12 : value % 12);
            }
            else {
                return padNumber(value % 24);
            }
        }
        else {
            return padNumber(NaN);
        }
    }
    formatMinSec(value) {
        return padNumber(isNumber(value) ? value : NaN);
    }
    handleBlur() {
        this.onTouched();
    }
    get isSmallSize() {
        return this.size === 'small';
    }
    get isLargeSize() {
        return this.size === 'large';
    }
    ngOnChanges(changes) {
        if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
            this.model.second = 0;
            this.propagateModelChange(false);
        }
    }
    propagateModelChange(touched = true) {
        if (touched) {
            this.onTouched();
        }
        if (this.model?.isValid(this.seconds)) {
            this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
        }
        else {
            this.onChange(this._ngbTimeAdapter.toModel(null));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepicker, deps: [{ token: NgbTimepickerConfig }, { token: NgbTimeAdapter }, { token: i0.ChangeDetectorRef }, { token: NgbTimepickerI18n }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbTimepicker, isStandalone: true, selector: "ngb-timepicker", inputs: { meridian: "meridian", spinners: "spinners", seconds: "seconds", hourStep: "hourStep", minuteStep: "minuteStep", secondStep: "secondStep", readonlyInputs: "readonlyInputs", size: "size" }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTimepicker), multi: true }], exportAs: ["ngbTimepicker"], usesOnChanges: true, ngImport: i0, template: `
		<fieldset [disabled]="disabled" [class.disabled]="disabled">
			<div class="ngb-tp">
				<div class="ngb-tp-input-container ngb-tp-hour">
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeHour(hourStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
						</button>
					}
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="HH"
						i18n-placeholder="@@ngb.timepicker.HH"
						[value]="formatHour(model?.hour)"
						(change)="updateHour($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Hours"
						i18n-aria-label="@@ngb.timepicker.hours"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()"
					/>
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeHour(-hourStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron bottom"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
						</button>
					}
				</div>
				<div class="ngb-tp-spacer">:</div>
				<div class="ngb-tp-input-container ngb-tp-minute">
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeMinute(minuteStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
						</button>
					}
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="MM"
						i18n-placeholder="@@ngb.timepicker.MM"
						[value]="formatMinSec(model?.minute)"
						(change)="updateMinute($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Minutes"
						i18n-aria-label="@@ngb.timepicker.minutes"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()"
					/>
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeMinute(-minuteStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron bottom"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
						</button>
					}
				</div>
				@if (seconds) {
					<div class="ngb-tp-spacer">:</div>
					<div class="ngb-tp-input-container ngb-tp-second">
						@if (spinners) {
							<button
								tabindex="-1"
								type="button"
								(click)="changeSecond(secondStep)"
								class="btn btn-link"
								[class.btn-sm]="isSmallSize"
								[class.btn-lg]="isLargeSize"
								[class.disabled]="disabled"
								[disabled]="disabled"
							>
								<span class="chevron ngb-tp-chevron"></span>
								<span class="visually-hidden" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
							</button>
						}
						<input
							type="text"
							class="ngb-tp-input form-control"
							[class.form-control-sm]="isSmallSize"
							[class.form-control-lg]="isLargeSize"
							maxlength="2"
							inputmode="numeric"
							placeholder="SS"
							i18n-placeholder="@@ngb.timepicker.SS"
							[value]="formatMinSec(model?.second)"
							(change)="updateSecond($any($event).target.value)"
							[readOnly]="readonlyInputs"
							[disabled]="disabled"
							aria-label="Seconds"
							i18n-aria-label="@@ngb.timepicker.seconds"
							(blur)="handleBlur()"
							(input)="formatInput($any($event).target)"
							(keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
							(keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()"
						/>
						@if (spinners) {
							<button
								tabindex="-1"
								type="button"
								(click)="changeSecond(-secondStep)"
								class="btn btn-link"
								[class.btn-sm]="isSmallSize"
								[class.btn-lg]="isLargeSize"
								[class.disabled]="disabled"
								[disabled]="disabled"
							>
								<span class="chevron ngb-tp-chevron bottom"></span>
								<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
							</button>
						}
					</div>
				}
				@if (meridian) {
					<div class="ngb-tp-spacer"></div>
					<div class="ngb-tp-meridian">
						<button
							type="button"
							class="btn btn-outline-primary"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[disabled]="disabled"
							[class.disabled]="disabled"
							(click)="toggleMeridian()"
						>
							@if (model && model.hour >= 12) {
								<ng-container i18n="@@ngb.timepicker.PM">{{ i18n.getAfternoonPeriod() }}</ng-container>
							} @else {
								<ng-container>{{ i18n.getMorningPeriod() }}</ng-container>
							}
						</button>
					</div>
				}
			</div>
		</fieldset>
	`, isInline: true, styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepicker, decorators: [{
            type: Component,
            args: [{ exportAs: 'ngbTimepicker', selector: 'ngb-timepicker', standalone: true, encapsulation: ViewEncapsulation.None, template: `
		<fieldset [disabled]="disabled" [class.disabled]="disabled">
			<div class="ngb-tp">
				<div class="ngb-tp-input-container ngb-tp-hour">
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeHour(hourStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.increment-hours">Increment hours</span>
						</button>
					}
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="HH"
						i18n-placeholder="@@ngb.timepicker.HH"
						[value]="formatHour(model?.hour)"
						(change)="updateHour($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Hours"
						i18n-aria-label="@@ngb.timepicker.hours"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeHour(-hourStep); $event.preventDefault()"
					/>
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeHour(-hourStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron bottom"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-hours">Decrement hours</span>
						</button>
					}
				</div>
				<div class="ngb-tp-spacer">:</div>
				<div class="ngb-tp-input-container ngb-tp-minute">
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeMinute(minuteStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.increment-minutes">Increment minutes</span>
						</button>
					}
					<input
						type="text"
						class="ngb-tp-input form-control"
						[class.form-control-sm]="isSmallSize"
						[class.form-control-lg]="isLargeSize"
						maxlength="2"
						inputmode="numeric"
						placeholder="MM"
						i18n-placeholder="@@ngb.timepicker.MM"
						[value]="formatMinSec(model?.minute)"
						(change)="updateMinute($any($event).target.value)"
						[readOnly]="readonlyInputs"
						[disabled]="disabled"
						aria-label="Minutes"
						i18n-aria-label="@@ngb.timepicker.minutes"
						(blur)="handleBlur()"
						(input)="formatInput($any($event).target)"
						(keydown.ArrowUp)="changeMinute(minuteStep); $event.preventDefault()"
						(keydown.ArrowDown)="changeMinute(-minuteStep); $event.preventDefault()"
					/>
					@if (spinners) {
						<button
							tabindex="-1"
							type="button"
							(click)="changeMinute(-minuteStep)"
							class="btn btn-link"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[class.disabled]="disabled"
							[disabled]="disabled"
						>
							<span class="chevron ngb-tp-chevron bottom"></span>
							<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-minutes">Decrement minutes</span>
						</button>
					}
				</div>
				@if (seconds) {
					<div class="ngb-tp-spacer">:</div>
					<div class="ngb-tp-input-container ngb-tp-second">
						@if (spinners) {
							<button
								tabindex="-1"
								type="button"
								(click)="changeSecond(secondStep)"
								class="btn btn-link"
								[class.btn-sm]="isSmallSize"
								[class.btn-lg]="isLargeSize"
								[class.disabled]="disabled"
								[disabled]="disabled"
							>
								<span class="chevron ngb-tp-chevron"></span>
								<span class="visually-hidden" i18n="@@ngb.timepicker.increment-seconds">Increment seconds</span>
							</button>
						}
						<input
							type="text"
							class="ngb-tp-input form-control"
							[class.form-control-sm]="isSmallSize"
							[class.form-control-lg]="isLargeSize"
							maxlength="2"
							inputmode="numeric"
							placeholder="SS"
							i18n-placeholder="@@ngb.timepicker.SS"
							[value]="formatMinSec(model?.second)"
							(change)="updateSecond($any($event).target.value)"
							[readOnly]="readonlyInputs"
							[disabled]="disabled"
							aria-label="Seconds"
							i18n-aria-label="@@ngb.timepicker.seconds"
							(blur)="handleBlur()"
							(input)="formatInput($any($event).target)"
							(keydown.ArrowUp)="changeSecond(secondStep); $event.preventDefault()"
							(keydown.ArrowDown)="changeSecond(-secondStep); $event.preventDefault()"
						/>
						@if (spinners) {
							<button
								tabindex="-1"
								type="button"
								(click)="changeSecond(-secondStep)"
								class="btn btn-link"
								[class.btn-sm]="isSmallSize"
								[class.btn-lg]="isLargeSize"
								[class.disabled]="disabled"
								[disabled]="disabled"
							>
								<span class="chevron ngb-tp-chevron bottom"></span>
								<span class="visually-hidden" i18n="@@ngb.timepicker.decrement-seconds">Decrement seconds</span>
							</button>
						}
					</div>
				}
				@if (meridian) {
					<div class="ngb-tp-spacer"></div>
					<div class="ngb-tp-meridian">
						<button
							type="button"
							class="btn btn-outline-primary"
							[class.btn-sm]="isSmallSize"
							[class.btn-lg]="isLargeSize"
							[disabled]="disabled"
							[class.disabled]="disabled"
							(click)="toggleMeridian()"
						>
							@if (model && model.hour >= 12) {
								<ng-container i18n="@@ngb.timepicker.PM">{{ i18n.getAfternoonPeriod() }}</ng-container>
							} @else {
								<ng-container>{{ i18n.getMorningPeriod() }}</ng-container>
							}
						</button>
					</div>
				}
			</div>
		</fieldset>
	`, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTimepicker), multi: true }], styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{display:flex;align-items:center}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-minute,.ngb-tp-second,.ngb-tp-meridian{display:flex;flex-direction:column;align-items:center;justify-content:space-around}.ngb-tp-spacer{width:1em;text-align:center}\n"] }]
        }], ctorParameters: () => [{ type: NgbTimepickerConfig }, { type: NgbTimeAdapter }, { type: i0.ChangeDetectorRef }, { type: NgbTimepickerI18n }], propDecorators: { meridian: [{
                type: Input
            }], spinners: [{
                type: Input
            }], seconds: [{
                type: Input
            }], hourStep: [{
                type: Input
            }], minuteStep: [{
                type: Input
            }], secondStep: [{
                type: Input
            }], readonlyInputs: [{
                type: Input
            }], size: [{
                type: Input
            }] } });

class NgbTimepickerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerModule, imports: [NgbTimepicker], exports: [NgbTimepicker] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTimepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbTimepicker],
                    exports: [NgbTimepicker],
                }]
        }] });

/**
 * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
 * and customize the values of its properties in order to provide default values for all the toasts used in the
 * application.
 *
 * @since 5.0.0
 */
class NgbToastConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.autohide = true;
        this.delay = 5000;
        this.ariaLive = 'polite';
    }
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToastConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToastConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToastConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

const ngbToastFadeInTransition = (element, animation) => {
    const { classList } = element;
    if (animation) {
        classList.add('fade');
    }
    else {
        classList.add('show');
        return;
    }
    reflow(element);
    classList.add('show', 'showing');
    return () => {
        classList.remove('showing');
    };
};
const ngbToastFadeOutTransition = ({ classList }) => {
    classList.add('showing');
    return () => {
        classList.remove('show', 'showing');
    };
};

/**
 * This directive allows the usage of HTML markup or other directives
 * inside of the toast's header.
 *
 * @since 5.0.0
 */
class NgbToastHeader {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToastHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbToastHeader, isStandalone: true, selector: "[ngbToastHeader]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToastHeader, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbToastHeader]', standalone: true }]
        }] });
/**
 * Toasts provide feedback messages as notifications to the user.
 * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
 *
 * @since 5.0.0
 */
class NgbToast {
    constructor(ariaLive) {
        this.ariaLive = ariaLive;
        this._config = inject(NgbToastConfig);
        this._zone = inject(NgZone);
        this._injector = inject(Injector);
        this._element = inject(ElementRef);
        /**
         * If `true`, toast opening and closing will be animated.
         *
         * Animation is triggered only when the `.hide()` or `.show()` functions are called
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * Delay after which the toast will hide (ms).
         * default: `500` (ms) (inherited from NgbToastConfig)
         */
        this.delay = this._config.delay;
        /**
         * Auto hide the toast after a delay in ms.
         * default: `true` (inherited from NgbToastConfig)
         */
        this.autohide = this._config.autohide;
        /**
         * A template like `<ng-template ngbToastHeader></ng-template>` can be
         * used in the projected content to allow markup usage.
         */
        this.contentHeaderTpl = null;
        /**
         * An event fired after the animation triggered by calling `.show()` method has finished.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
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
        this.hidden = new EventEmitter();
        this.ariaLive ??= this._config.ariaLive;
    }
    ngAfterContentInit() {
        afterNextRender({
            mixedReadWrite: () => {
                this._init();
                this.show();
            },
        }, { injector: this._injector });
    }
    ngOnChanges(changes) {
        if ('autohide' in changes) {
            this._clearTimeout();
            this._init();
        }
    }
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
    hide() {
        this._clearTimeout();
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeOutTransition, {
            animation: this.animation,
            runningTransition: 'stop',
        });
        transition.subscribe(() => {
            this.hidden.emit();
        });
        return transition;
    }
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
    show() {
        const transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeInTransition, {
            animation: this.animation,
            runningTransition: 'continue',
        });
        transition.subscribe(() => {
            this.shown.emit();
        });
        return transition;
    }
    _init() {
        if (this.autohide && !this._timeoutID) {
            this._timeoutID = setTimeout(() => this.hide(), this.delay);
        }
    }
    _clearTimeout() {
        if (this._timeoutID) {
            clearTimeout(this._timeoutID);
            this._timeoutID = null;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToast, deps: [{ token: 'aria-live', attribute: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbToast, isStandalone: true, selector: "ngb-toast", inputs: { animation: "animation", delay: "delay", autohide: "autohide", header: "header" }, outputs: { shown: "shown", hidden: "hidden" }, host: { attributes: { "role": "alert", "aria-atomic": "true" }, properties: { "attr.aria-live": "ariaLive", "class.fade": "animation" }, classAttribute: "toast" }, queries: [{ propertyName: "contentHeaderTpl", first: true, predicate: NgbToastHeader, descendants: true, read: TemplateRef, static: true }], exportAs: ["ngbToast"], usesOnChanges: true, ngImport: i0, template: `
		<ng-template #headerTpl>
			<strong class="me-auto">{{ header }}</strong>
		</ng-template>
		@if (contentHeaderTpl || header) {
			<div class="toast-header">
				<ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl" />
				<button
					type="button"
					class="btn-close"
					aria-label="Close"
					i18n-aria-label="@@ngb.toast.close-aria"
					(click)="hide()"
				>
				</button>
			</div>
		}
		<div class="toast-body">
			<ng-content />
		</div>
	`, isInline: true, styles: ["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToast, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-toast', exportAs: 'ngbToast', imports: [NgTemplateOutlet], encapsulation: ViewEncapsulation.None, host: {
                        role: 'alert',
                        '[attr.aria-live]': 'ariaLive',
                        'aria-atomic': 'true',
                        class: 'toast',
                        '[class.fade]': 'animation',
                    }, template: `
		<ng-template #headerTpl>
			<strong class="me-auto">{{ header }}</strong>
		</ng-template>
		@if (contentHeaderTpl || header) {
			<div class="toast-header">
				<ng-template [ngTemplateOutlet]="contentHeaderTpl || headerTpl" />
				<button
					type="button"
					class="btn-close"
					aria-label="Close"
					i18n-aria-label="@@ngb.toast.close-aria"
					(click)="hide()"
				>
				</button>
			</div>
		}
		<div class="toast-body">
			<ng-content />
		</div>
	`, styles: ["ngb-toast{display:block}ngb-toast .toast-header .close{margin-left:auto;margin-bottom:.25rem}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['aria-live']
                }] }], propDecorators: { animation: [{
                type: Input
            }], delay: [{
                type: Input
            }], autohide: [{
                type: Input
            }], header: [{
                type: Input
            }], contentHeaderTpl: [{
                type: ContentChild,
                args: [NgbToastHeader, { read: TemplateRef, static: true }]
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });

class NgbToastModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToastModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbToastModule, imports: [NgbToast, NgbToastHeader], exports: [NgbToast, NgbToastHeader] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToastModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbToastModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbToast, NgbToastHeader],
                    exports: [NgbToast, NgbToastHeader],
                }]
        }] });

/**
 * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tooltips used in the application.
 */
class NgbTooltipConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.autoClose = true;
        this.placement = 'auto';
        this.popperOptions = (options) => options;
        this.triggers = 'hover focus';
        this.disableTooltip = false;
        this.openDelay = 0;
        this.closeDelay = 0;
    }
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltipConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltipConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltipConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

let nextId = 0;
class NgbTooltipWindow {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltipWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.0.3", type: NgbTooltipWindow, isStandalone: true, selector: "ngb-tooltip-window", inputs: { animation: "animation", id: "id", tooltipClass: "tooltipClass" }, host: { attributes: { "role": "tooltip" }, properties: { "class": "\"tooltip\" + (tooltipClass ? \" \" + tooltipClass : \"\")", "class.fade": "animation", "id": "id" } }, ngImport: i0, template: `
		<div class="tooltip-arrow" data-popper-arrow></div>
		<div class="tooltip-inner">
			<ng-content />
		</div>
	`, isInline: true, styles: ["ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltipWindow, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-tooltip-window', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[class]': '"tooltip" + (tooltipClass ? " " + tooltipClass : "")',
                        '[class.fade]': 'animation',
                        role: 'tooltip',
                        '[id]': 'id',
                    }, template: `
		<div class="tooltip-arrow" data-popper-arrow></div>
		<div class="tooltip-inner">
			<ng-content />
		</div>
	`, styles: ["ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}\n"] }]
        }], propDecorators: { animation: [{
                type: Input
            }], id: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }] } });
/**
 * A lightweight and extensible directive for fancy tooltip creation.
 */
class NgbTooltip {
    constructor() {
        this._config = inject(NgbTooltipConfig);
        /**
         * If `true`, tooltip opening and closing will be animated.
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * Indicates whether the tooltip should be closed on `Escape` key and inside/outside clicks:
         *
         * * `true` - closes on both outside and inside clicks as well as `Escape` presses
         * * `false` - disables the autoClose feature (NB: triggers still apply)
         * * `"inside"` - closes on inside clicks as well as Escape presses
         * * `"outside"` - closes on outside clicks (sometimes also achievable through triggers)
         * as well as `Escape` presses
         *
         * @since 3.0.0
         */
        this.autoClose = this._config.autoClose;
        /**
         * The preferred placement of the tooltip, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"auto"`.
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = this._config.placement;
        /**
         * Allows to change default Popper options when positioning the tooltip.
         * Receives current popper options and returns modified ones.
         *
         * @since 13.1.0
         */
        this.popperOptions = this._config.popperOptions;
        /**
         * Specifies events that should trigger the tooltip.
         *
         * Supports a space separated list of event names.
         * For more details see the [triggers demo](#/components/tooltip/examples#triggers).
         */
        this.triggers = this._config.triggers;
        /**
         * A selector specifying the element the tooltip should be appended to.
         *
         * Currently only supports `"body"`.
         */
        this.container = this._config.container;
        /**
         * If `true`, tooltip is disabled and won't be displayed.
         *
         * @since 1.1.0
         */
        this.disableTooltip = this._config.disableTooltip;
        /**
         * An optional class applied to the tooltip window element.
         *
         * @since 3.2.0
         */
        this.tooltipClass = this._config.tooltipClass;
        /**
         * The opening delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
         *
         * @since 4.1.0
         */
        this.openDelay = this._config.openDelay;
        /**
         * The closing delay in ms. Works only for "non-manual" opening triggers defined by the `triggers` input.
         *
         * @since 4.1.0
         */
        this.closeDelay = this._config.closeDelay;
        /**
         * An event emitted when the tooltip opening animation has finished. Contains no payload.
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the tooltip closing animation has finished. Contains no payload.
         */
        this.hidden = new EventEmitter();
        this._nativeElement = inject(ElementRef).nativeElement;
        this._ngZone = inject(NgZone);
        this._document = inject(DOCUMENT);
        this._changeDetector = inject(ChangeDetectorRef);
        this._injector = inject(Injector);
        this._ngbTooltipWindowId = `ngb-tooltip-${nextId++}`;
        this._popupService = new PopupService(NgbTooltipWindow);
        this._windowRef = null;
        this._positioning = ngbPositioning();
    }
    /**
     * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
     *
     * If the content if falsy, the tooltip won't open.
     */
    set ngbTooltip(value) {
        this._ngbTooltip = value;
        if (!value && this._windowRef) {
            this.close();
        }
    }
    get ngbTooltip() {
        return this._ngbTooltip;
    }
    /**
     * Opens the tooltip.
     *
     * This is considered to be a "manual" triggering.
     * The `context` is an optional value to be injected into the tooltip template when it is created.
     */
    open(context) {
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
            const { windowRef, transition$ } = this._popupService.open(this._ngbTooltip, context ?? this.tooltipContext, this.animation);
            this._windowRef = windowRef;
            this._windowRef.setInput('animation', this.animation);
            this._windowRef.setInput('tooltipClass', this.tooltipClass);
            this._windowRef.setInput('id', this._ngbTooltipWindowId);
            this._getPositionTargetElement().setAttribute('aria-describedby', this._ngbTooltipWindowId);
            if (this.container === 'body') {
                this._document.body.appendChild(this._windowRef.location.nativeElement);
            }
            // We need to detect changes, because we don't know where .open() might be called from.
            // Ex. opening tooltip from one of lifecycle hooks that run after the CD
            // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
            this._windowRef.changeDetectorRef.detectChanges();
            // We need to mark for check, because tooltip won't work inside the OnPush component.
            // Ex. when we use expression like `{{ tooltip.isOpen() : 'opened' : 'closed' }}`
            // inside the template of an OnPush component and we change the tooltip from
            // open -> closed, the expression in question won't be updated unless we explicitly
            // mark the parent component to be checked.
            this._windowRef.changeDetectorRef.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                this._positioning.createPopper({
                    hostElement: this._getPositionTargetElement(),
                    targetElement: this._windowRef.location.nativeElement,
                    placement: this.placement,
                    baseClass: 'bs-tooltip',
                    updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 6])(options)),
                });
                Promise.resolve().then(() => {
                    // This update is required for correct arrow placement
                    this._positioning.update();
                });
                this._afterRenderRef = afterRender({
                    mixedReadWrite: () => {
                        this._positioning.update();
                    },
                }, { injector: this._injector });
            });
            ngbAutoClose(this._ngZone, this._document, this.autoClose, () => this.close(), this.hidden, [this._windowRef.location.nativeElement], [this._nativeElement]);
            transition$.subscribe(() => this.shown.emit());
        }
    }
    /**
     * Closes the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    close(animation = this.animation) {
        if (this._windowRef != null) {
            this._getPositionTargetElement().removeAttribute('aria-describedby');
            this._popupService.close(animation).subscribe(() => {
                this._windowRef = null;
                this._positioning.destroy();
                this._afterRenderRef?.destroy();
                this.hidden.emit();
                this._changeDetector.markForCheck();
            });
        }
    }
    /**
     * Toggles the tooltip.
     *
     * This is considered to be a "manual" triggering of the tooltip.
     */
    toggle() {
        if (this._windowRef) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Returns `true`, if the tooltip is currently shown.
     */
    isOpen() {
        return this._windowRef != null;
    }
    ngOnInit() {
        this._unregisterListenersFn = listenToTriggers(this._nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
    }
    ngOnChanges({ tooltipClass }) {
        if (tooltipClass && this.isOpen()) {
            this._windowRef.setInput('tooltipClass', tooltipClass.currentValue);
        }
    }
    ngOnDestroy() {
        this.close(false);
        // This check is necessary because it's possible that ngOnDestroy could be invoked before ngOnInit.
        // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
        this._unregisterListenersFn?.();
    }
    _getPositionTargetElement() {
        return ((isString(this.positionTarget) ? this._document.querySelector(this.positionTarget) : this.positionTarget) ||
            this._nativeElement);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltip, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbTooltip, isStandalone: true, selector: "[ngbTooltip]", inputs: { animation: "animation", autoClose: "autoClose", placement: "placement", popperOptions: "popperOptions", triggers: "triggers", positionTarget: "positionTarget", container: "container", disableTooltip: "disableTooltip", tooltipClass: "tooltipClass", tooltipContext: "tooltipContext", openDelay: "openDelay", closeDelay: "closeDelay", ngbTooltip: "ngbTooltip" }, outputs: { shown: "shown", hidden: "hidden" }, exportAs: ["ngbTooltip"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltip, decorators: [{
            type: Directive,
            args: [{ selector: '[ngbTooltip]', standalone: true, exportAs: 'ngbTooltip' }]
        }], propDecorators: { animation: [{
                type: Input
            }], autoClose: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], triggers: [{
                type: Input
            }], positionTarget: [{
                type: Input
            }], container: [{
                type: Input
            }], disableTooltip: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }], tooltipContext: [{
                type: Input
            }], openDelay: [{
                type: Input
            }], closeDelay: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], ngbTooltip: [{
                type: Input
            }] } });

class NgbTooltipModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltipModule, imports: [NgbTooltip], exports: [NgbTooltip] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltipModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbTooltip],
                    exports: [NgbTooltip],
                }]
        }] });

/**
 * A component that helps with text highlighting.
 *
 * It splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
class NgbHighlight {
    constructor() {
        /**
         * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
         */
        this.highlightClass = 'ngb-highlight';
        /**
         * Boolean option to determine if the highlighting should be sensitive to accents or not.
         *
         * This feature is only available for browsers that implement the `String.normalize` function
         * (typically not Internet Explorer).
         * If you want to use this feature in a browser that does not implement `String.normalize`,
         * you will have to include a polyfill in your application (`unorm` for example).
         *
         * @since 9.1.0
         */
        this.accentSensitive = true;
    }
    ngOnChanges(changes) {
        if (!this.accentSensitive && !String.prototype.normalize) {
            console.warn('The `accentSensitive` input in `ngb-highlight` cannot be set to `false` in a browser ' +
                'that does not implement the `String.normalize` function. ' +
                'You will have to include a polyfill in your application to use this feature in the current browser.');
            this.accentSensitive = true;
        }
        const result = toString(this.result);
        const terms = Array.isArray(this.term) ? this.term : [this.term];
        const prepareTerm = (term) => (this.accentSensitive ? term : removeAccents(term));
        const escapedTerms = terms.map((term) => regExpEscape(prepareTerm(toString(term)))).filter((term) => term);
        const toSplit = this.accentSensitive ? result : removeAccents(result);
        const parts = escapedTerms.length ? toSplit.split(new RegExp(`(${escapedTerms.join('|')})`, 'gmi')) : [result];
        if (this.accentSensitive) {
            this.parts = parts;
        }
        else {
            let offset = 0;
            this.parts = parts.map((part) => result.substring(offset, (offset += part.length)));
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbHighlight, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbHighlight, isStandalone: true, selector: "ngb-highlight", inputs: { highlightClass: "highlightClass", result: "result", term: "term", accentSensitive: "accentSensitive" }, usesOnChanges: true, ngImport: i0, template: `
		@for (part of parts; track $index) {
			@if ($odd) {
				<span class="{{ highlightClass }}">{{ part }}</span>
			} @else {
				<ng-container>{{ part }}</ng-container>
			}
		}
	`, isInline: true, styles: [".ngb-highlight{font-weight:700}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbHighlight, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-highlight', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: `
		@for (part of parts; track $index) {
			@if ($odd) {
				<span class="{{ highlightClass }}">{{ part }}</span>
			} @else {
				<ng-container>{{ part }}</ng-container>
			}
		}
	`, styles: [".ngb-highlight{font-weight:700}\n"] }]
        }], propDecorators: { highlightClass: [{
                type: Input
            }], result: [{
                type: Input,
                args: [{ required: true }]
            }], term: [{
                type: Input,
                args: [{ required: true }]
            }], accentSensitive: [{
                type: Input
            }] } });

const ARIA_LIVE_DELAY = new InjectionToken('live announcer delay', {
    providedIn: 'root',
    factory: () => 100,
});
function getLiveElement(document, lazyCreate = false) {
    let element = document.body.querySelector('#ngb-live');
    if (element == null && lazyCreate) {
        element = document.createElement('div');
        element.setAttribute('id', 'ngb-live');
        element.setAttribute('aria-live', 'polite');
        element.setAttribute('aria-atomic', 'true');
        element.classList.add('visually-hidden');
        document.body.appendChild(element);
    }
    return element;
}
class Live {
    constructor() {
        this._document = inject(DOCUMENT);
        this._delay = inject(ARIA_LIVE_DELAY);
    }
    ngOnDestroy() {
        const element = getLiveElement(this._document);
        if (element) {
            // if exists, it will always be attached to the <body>
            element.parentElement.removeChild(element);
        }
    }
    say(message) {
        const element = getLiveElement(this._document, true);
        const delay = this._delay;
        if (element != null) {
            element.textContent = '';
            const setText = () => (element.textContent = message);
            if (delay === null) {
                setText();
            }
            else {
                setTimeout(setText, delay);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: Live, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: Live, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: Live, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * A configuration service for the [`NgbTypeahead`](#/components/typeahead/api#NgbTypeahead) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
class NgbTypeaheadConfig {
    constructor() {
        this.editable = true;
        this.focusFirst = true;
        this.selectOnExact = false;
        this.showHint = false;
        this.placement = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
        this.popperOptions = (options) => options;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeaheadConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeaheadConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeaheadConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class NgbTypeaheadWindow {
    constructor() {
        this.activeIdx = 0;
        /**
         * Flag indicating if the first row should be active initially
         */
        this.focusFirst = true;
        /**
         * A function used to format a given result before display. This function should return a formatted string without any
         * HTML markup
         */
        this.formatter = toString;
        /**
         * Event raised when user selects a particular result row
         */
        this.selectEvent = new EventEmitter();
        this.activeChangeEvent = new EventEmitter();
    }
    hasActive() {
        return this.activeIdx > -1 && this.activeIdx < this.results.length;
    }
    getActive() {
        return this.results[this.activeIdx];
    }
    markActive(activeIdx) {
        this.activeIdx = activeIdx;
        this._activeChanged();
    }
    next() {
        if (this.activeIdx === this.results.length - 1) {
            this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
        }
        else {
            this.activeIdx++;
        }
        this._activeChanged();
    }
    prev() {
        if (this.activeIdx < 0) {
            this.activeIdx = this.results.length - 1;
        }
        else if (this.activeIdx === 0) {
            this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
        }
        else {
            this.activeIdx--;
        }
        this._activeChanged();
    }
    resetActive() {
        this.activeIdx = this.focusFirst ? 0 : -1;
        this._activeChanged();
    }
    select(item) {
        this.selectEvent.emit(item);
    }
    ngOnInit() {
        this.resetActive();
    }
    _activeChanged() {
        this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeaheadWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "19.0.3", type: NgbTypeaheadWindow, isStandalone: true, selector: "ngb-typeahead-window", inputs: { id: "id", focusFirst: "focusFirst", results: "results", term: "term", formatter: "formatter", resultTemplate: "resultTemplate", popupClass: "popupClass" }, outputs: { selectEvent: "select", activeChangeEvent: "activeChange" }, host: { attributes: { "role": "listbox" }, listeners: { "mousedown": "$event.preventDefault()" }, properties: { "class": "\"dropdown-menu show\" + (popupClass ? \" \" + popupClass : \"\")", "id": "id" } }, exportAs: ["ngbTypeaheadWindow"], ngImport: i0, template: `
		<ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
			<ngb-highlight [result]="formatter(result)" [term]="term" />
		</ng-template>
		@for (result of results; track $index) {
			<button
				type="button"
				class="dropdown-item"
				role="option"
				[id]="id + '-' + $index"
				[class.active]="$index === activeIdx"
				(mouseenter)="markActive($index)"
				(click)="select(result)"
			>
				<ng-template
					[ngTemplateOutlet]="resultTemplate || rt"
					[ngTemplateOutletContext]="{ result: result, term: term, formatter: formatter }"
				/>
			</button>
		}
	`, isInline: true, dependencies: [{ kind: "component", type: NgbHighlight, selector: "ngb-highlight", inputs: ["highlightClass", "result", "term", "accentSensitive"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeaheadWindow, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-typeahead-window',
                    exportAs: 'ngbTypeaheadWindow',
                    imports: [NgbHighlight, NgTemplateOutlet],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '(mousedown)': '$event.preventDefault()',
                        '[class]': '"dropdown-menu show" + (popupClass ? " " + popupClass : "")',
                        role: 'listbox',
                        '[id]': 'id',
                    },
                    template: `
		<ng-template #rt let-result="result" let-term="term" let-formatter="formatter">
			<ngb-highlight [result]="formatter(result)" [term]="term" />
		</ng-template>
		@for (result of results; track $index) {
			<button
				type="button"
				class="dropdown-item"
				role="option"
				[id]="id + '-' + $index"
				[class.active]="$index === activeIdx"
				(mouseenter)="markActive($index)"
				(click)="select(result)"
			>
				<ng-template
					[ngTemplateOutlet]="resultTemplate || rt"
					[ngTemplateOutletContext]="{ result: result, term: term, formatter: formatter }"
				/>
			</button>
		}
	`,
                }]
        }], propDecorators: { id: [{
                type: Input
            }], focusFirst: [{
                type: Input
            }], results: [{
                type: Input
            }], term: [{
                type: Input
            }], formatter: [{
                type: Input
            }], resultTemplate: [{
                type: Input
            }], popupClass: [{
                type: Input
            }], selectEvent: [{
                type: Output,
                args: ['select']
            }], activeChangeEvent: [{
                type: Output,
                args: ['activeChange']
            }] } });

let nextWindowId = 0;
/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
class NgbTypeahead {
    constructor() {
        this._nativeElement = inject(ElementRef).nativeElement;
        this._config = inject(NgbTypeaheadConfig);
        this._live = inject(Live);
        this._document = inject(DOCUMENT);
        this._ngZone = inject(NgZone);
        this._changeDetector = inject(ChangeDetectorRef);
        this._injector = inject(Injector);
        this._popupService = new PopupService(NgbTypeaheadWindow);
        this._positioning = ngbPositioning();
        this._subscription = null;
        this._closed$ = new Subject();
        this._inputValueBackup = null;
        this._inputValueForSelectOnExact = null;
        this._valueChanges$ = fromEvent(this._nativeElement, 'input').pipe(map(($event) => $event.target.value));
        this._resubscribeTypeahead$ = new BehaviorSubject(null);
        this._windowRef = null;
        /**
         * The value for the `autocomplete` attribute for the `<input>` element.
         *
         * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
         *
         * @since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * A selector specifying the element the typeahead popup will be appended to.
         *
         * Currently only supports `"body"`.
         */
        this.container = this._config.container;
        /**
         * If `true`, model values will not be restricted only to items selected from the popup.
         */
        this.editable = this._config.editable;
        /**
         * If `true`, the first item in the result list will always stay focused while typing.
         */
        this.focusFirst = this._config.focusFirst;
        /**
         * If `true`, automatically selects the item when it is the only one that exactly matches the user input
         *
         * @since 14.2.0
         */
        this.selectOnExact = this._config.selectOnExact;
        /**
         * If `true`, will show the hint in the `<input>` when an item in the result list matches.
         */
        this.showHint = this._config.showHint;
        /**
         * The preferred placement of the typeahead, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"bottom-start bottom-end top-start top-end"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = this._config.placement;
        /**
         * Allows to change default Popper options when positioning the typeahead.
         * Receives current popper options and returns modified ones.
         *
         * @since 13.1.0
         */
        this.popperOptions = this._config.popperOptions;
        /**
         * An event emitted right before an item is selected from the result list.
         *
         * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
         */
        this.selectItem = new EventEmitter();
        this.activeDescendant = null;
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._onTouched = () => { };
        this._onChange = (_) => { };
    }
    ngOnInit() {
        this._subscribeToUserInput();
    }
    ngOnChanges({ ngbTypeahead }) {
        if (ngbTypeahead && !ngbTypeahead.firstChange) {
            this._unsubscribeFromUserInput();
            this._subscribeToUserInput();
        }
    }
    ngOnDestroy() {
        this._closePopup();
        this._unsubscribeFromUserInput();
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    writeValue(value) {
        this._writeInputValue(this._formatItemForInput(value));
        if (this.showHint) {
            this._inputValueBackup = value;
        }
    }
    setDisabledState(isDisabled) {
        this._nativeElement.disabled = isDisabled;
    }
    /**
     * Dismisses typeahead popup window
     */
    dismissPopup() {
        if (this.isPopupOpen()) {
            this._resubscribeTypeahead$.next(null);
            this._closePopup();
            if (this.showHint && this._inputValueBackup !== null) {
                this._writeInputValue(this._inputValueBackup);
            }
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Returns true if the typeahead popup window is displayed
     */
    isPopupOpen() {
        return this._windowRef != null;
    }
    handleBlur() {
        this._resubscribeTypeahead$.next(null);
        this._onTouched();
    }
    handleKeyDown(event) {
        if (!this.isPopupOpen()) {
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this._windowRef.instance.next();
                this._showHint();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this._windowRef.instance.prev();
                this._showHint();
                break;
            case 'Enter':
            case 'Tab': {
                const result = this._windowRef.instance.getActive();
                if (isDefined(result)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this._selectResult(result);
                }
                this._closePopup();
                break;
            }
        }
    }
    _openPopup() {
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._nativeElement.value;
            const { windowRef } = this._popupService.open();
            this._windowRef = windowRef;
            this._windowRef.setInput('id', this.popupId);
            this._windowRef.setInput('popupClass', this.popupClass);
            this._windowRef.instance.selectEvent.subscribe((result) => this._selectResultClosePopup(result));
            this._windowRef.instance.activeChangeEvent.subscribe((activeId) => (this.activeDescendant = activeId));
            if (this.container === 'body') {
                this._windowRef.location.nativeElement.style.zIndex = '1055';
                this._document.body.appendChild(this._windowRef.location.nativeElement);
            }
            this._changeDetector.markForCheck();
            // Setting up popper and scheduling updates when zone is stable
            this._ngZone.runOutsideAngular(() => {
                if (this._windowRef) {
                    this._positioning.createPopper({
                        hostElement: this._nativeElement,
                        targetElement: this._windowRef.location.nativeElement,
                        placement: this.placement,
                        updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                    });
                    this._afterRenderRef = afterRender({
                        mixedReadWrite: () => {
                            this._positioning.update();
                        },
                    }, { injector: this._injector });
                }
            });
            ngbAutoClose(this._ngZone, this._document, 'outside', () => this.dismissPopup(), this._closed$, [
                this._nativeElement,
                this._windowRef.location.nativeElement,
            ]);
        }
    }
    _closePopup() {
        this._popupService.close().subscribe(() => {
            this._positioning.destroy();
            this._afterRenderRef?.destroy();
            this._closed$.next();
            this._windowRef = null;
            this.activeDescendant = null;
        });
    }
    _selectResult(result) {
        let defaultPrevented = false;
        this.selectItem.emit({
            item: result,
            preventDefault: () => {
                defaultPrevented = true;
            },
        });
        this._resubscribeTypeahead$.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    }
    _selectResultClosePopup(result) {
        this._selectResult(result);
        this._closePopup();
    }
    _showHint() {
        if (this.showHint && this._windowRef?.instance.hasActive() && this._inputValueBackup != null) {
            const userInputLowerCase = this._inputValueBackup.toLowerCase();
            const formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substring(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substring(this._inputValueBackup.length));
                this._nativeElement['setSelectionRange'].apply(this._nativeElement, [
                    this._inputValueBackup.length,
                    formattedVal.length,
                ]);
            }
            else {
                this._writeInputValue(formattedVal);
            }
        }
    }
    _formatItemForInput(item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    }
    _writeInputValue(value) {
        this._nativeElement.value = toString(value);
    }
    _subscribeToUserInput() {
        const results$ = this._valueChanges$.pipe(tap((value) => {
            this._inputValueBackup = this.showHint ? value : null;
            this._inputValueForSelectOnExact = this.selectOnExact ? value : null;
            this._onChange(this.editable ? value : undefined);
        }), this.ngbTypeahead ? this.ngbTypeahead : () => of([]));
        this._subscription = this._resubscribeTypeahead$.pipe(switchMap(() => results$)).subscribe((results) => {
            if (!results || results.length === 0) {
                this._closePopup();
            }
            else {
                // when there is only one result and this matches the input value
                if (this.selectOnExact &&
                    results.length === 1 &&
                    this._formatItemForInput(results[0]) === this._inputValueForSelectOnExact) {
                    this._selectResult(results[0]);
                    this._closePopup();
                }
                else {
                    this._openPopup();
                    this._windowRef.setInput('focusFirst', this.focusFirst);
                    this._windowRef.setInput('results', results);
                    this._windowRef.setInput('term', this._nativeElement.value);
                    if (this.resultFormatter) {
                        this._windowRef.setInput('formatter', this.resultFormatter);
                    }
                    if (this.resultTemplate) {
                        this._windowRef.setInput('resultTemplate', this.resultTemplate);
                    }
                    this._windowRef.instance.resetActive();
                    // The observable stream we are subscribing to might have async steps
                    // and if a component containing typeahead is using the OnPush strategy
                    // the change detection turn wouldn't be invoked automatically.
                    this._windowRef.changeDetectorRef.detectChanges();
                    this._showHint();
                }
            }
            // live announcer
            const count = results ? results.length : 0;
            this._live.say(count === 0 ? 'No results available' : `${count} result${count === 1 ? '' : 's'} available`);
        });
    }
    _unsubscribeFromUserInput() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeahead, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "19.0.3", type: NgbTypeahead, isStandalone: true, selector: "input[ngbTypeahead]", inputs: { autocomplete: "autocomplete", container: "container", editable: "editable", focusFirst: "focusFirst", inputFormatter: "inputFormatter", ngbTypeahead: "ngbTypeahead", resultFormatter: "resultFormatter", resultTemplate: "resultTemplate", selectOnExact: "selectOnExact", showHint: "showHint", placement: "placement", popperOptions: "popperOptions", popupClass: "popupClass" }, outputs: { selectItem: "selectItem" }, host: { attributes: { "autocapitalize": "off", "autocorrect": "off", "role": "combobox" }, listeners: { "blur": "handleBlur()", "keydown": "handleKeyDown($event)" }, properties: { "class.open": "isPopupOpen()", "autocomplete": "autocomplete", "attr.aria-autocomplete": "showHint ? \"both\" : \"list\"", "attr.aria-activedescendant": "activeDescendant", "attr.aria-owns": "isPopupOpen() ? popupId : null", "attr.aria-expanded": "isPopupOpen()" } }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true }], exportAs: ["ngbTypeahead"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeahead, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[ngbTypeahead]',
                    exportAs: 'ngbTypeahead',
                    standalone: true,
                    host: {
                        '(blur)': 'handleBlur()',
                        '[class.open]': 'isPopupOpen()',
                        '(keydown)': 'handleKeyDown($event)',
                        '[autocomplete]': 'autocomplete',
                        autocapitalize: 'off',
                        autocorrect: 'off',
                        role: 'combobox',
                        '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                        '[attr.aria-expanded]': 'isPopupOpen()',
                    },
                    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true }],
                }]
        }], propDecorators: { autocomplete: [{
                type: Input
            }], container: [{
                type: Input
            }], editable: [{
                type: Input
            }], focusFirst: [{
                type: Input
            }], inputFormatter: [{
                type: Input
            }], ngbTypeahead: [{
                type: Input
            }], resultFormatter: [{
                type: Input
            }], resultTemplate: [{
                type: Input
            }], selectOnExact: [{
                type: Input
            }], showHint: [{
                type: Input
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], popupClass: [{
                type: Input
            }], selectItem: [{
                type: Output
            }] } });

class NgbTypeaheadModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeaheadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeaheadModule, imports: [NgbHighlight, NgbTypeahead], exports: [NgbHighlight, NgbTypeahead] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeaheadModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbTypeaheadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbHighlight, NgbTypeahead],
                    exports: [NgbHighlight, NgbTypeahead],
                }]
        }] });

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
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasBackdrop, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.0.3", type: NgbOffcanvasBackdrop, isStandalone: true, selector: "ngb-offcanvas-backdrop", inputs: { animation: "animation", backdropClass: "backdropClass", static: "static" }, outputs: { dismissEvent: "dismiss" }, host: { listeners: { "mousedown": "dismiss()" }, properties: { "class": "\"offcanvas-backdrop\" + (backdropClass ? \" \" + backdropClass : \"\")", "class.show": "!animation", "class.fade": "animation" } }, ngImport: i0, template: '', isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasBackdrop, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-offcanvas-backdrop',
                    standalone: true,
                    encapsulation: ViewEncapsulation.None,
                    template: '',
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasPanel, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "19.0.3", type: NgbOffcanvasPanel, isStandalone: true, selector: "ngb-offcanvas-panel", inputs: { animation: "animation", ariaLabelledBy: "ariaLabelledBy", ariaDescribedBy: "ariaDescribedBy", keyboard: "keyboard", panelClass: "panelClass", position: "position" }, outputs: { dismissEvent: "dismiss" }, host: { attributes: { "role": "dialog", "tabindex": "-1" }, properties: { "class": "\"offcanvas offcanvas-\" + position  + (panelClass ? \" \" + panelClass : \"\")", "attr.aria-modal": "true", "attr.aria-labelledby": "ariaLabelledBy", "attr.aria-describedby": "ariaDescribedBy" } }, ngImport: i0, template: '<ng-content />', isInline: true, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasPanel, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-offcanvas-panel',
                    standalone: true,
                    template: '<ng-content />',
                    encapsulation: ViewEncapsulation.None,
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasStack, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasStack, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasStack, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvas, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvas, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvas, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class NgbOffcanvasModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasModule }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbOffcanvasModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

const NGB_MODULES = [
    NgbAccordionModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbNavModule,
    NgbOffcanvasModule,
    NgbPaginationModule,
    NgbPopoverModule,
    NgbProgressbarModule,
    NgbRatingModule,
    NgbScrollSpyModule,
    NgbTimepickerModule,
    NgbToastModule,
    NgbTooltipModule,
    NgbTypeaheadModule,
];
class NgbModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "19.0.3", ngImport: i0, type: NgbModule, imports: [NgbAccordionModule,
            NgbAlertModule,
            NgbCarouselModule,
            NgbCollapseModule,
            NgbDatepickerModule,
            NgbDropdownModule,
            NgbModalModule,
            NgbNavModule,
            NgbOffcanvasModule,
            NgbPaginationModule,
            NgbPopoverModule,
            NgbProgressbarModule,
            NgbRatingModule,
            NgbScrollSpyModule,
            NgbTimepickerModule,
            NgbToastModule,
            NgbTooltipModule,
            NgbTypeaheadModule], exports: [NgbAccordionModule,
            NgbAlertModule,
            NgbCarouselModule,
            NgbCollapseModule,
            NgbDatepickerModule,
            NgbDropdownModule,
            NgbModalModule,
            NgbNavModule,
            NgbOffcanvasModule,
            NgbPaginationModule,
            NgbPopoverModule,
            NgbProgressbarModule,
            NgbRatingModule,
            NgbScrollSpyModule,
            NgbTimepickerModule,
            NgbToastModule,
            NgbTooltipModule,
            NgbTypeaheadModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModule, imports: [NGB_MODULES, NgbAccordionModule,
            NgbAlertModule,
            NgbCarouselModule,
            NgbCollapseModule,
            NgbDatepickerModule,
            NgbDropdownModule,
            NgbModalModule,
            NgbNavModule,
            NgbOffcanvasModule,
            NgbPaginationModule,
            NgbPopoverModule,
            NgbProgressbarModule,
            NgbRatingModule,
            NgbScrollSpyModule,
            NgbTimepickerModule,
            NgbToastModule,
            NgbTooltipModule,
            NgbTypeaheadModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.0.3", ngImport: i0, type: NgbModule, decorators: [{
            type: NgModule,
            args: [{ imports: NGB_MODULES, exports: NGB_MODULES }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ModalDismissReasons, NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionConfig, NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem, NgbAccordionModule, NgbAccordionToggle, NgbActiveModal, NgbActiveOffcanvas, NgbAlert, NgbAlertConfig, NgbAlertModule, NgbCalendar, NgbCalendarBuddhist, NgbCalendarEthiopian, NgbCalendarGregorian, NgbCalendarHebrew, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura, NgbCalendarPersian, NgbCarousel, NgbCarouselConfig, NgbCarouselModule, NgbCollapse, NgbCollapseConfig, NgbCollapseModule, NgbConfig, NgbDate, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter, NgbDateParserFormatter, NgbDateStructAdapter, NgbDatepicker, NgbDatepickerConfig, NgbDatepickerContent, NgbDatepickerI18n, NgbDatepickerI18nAmharic, NgbDatepickerI18nDefault, NgbDatepickerI18nHebrew, NgbDatepickerKeyboardService, NgbDatepickerModule, NgbDatepickerMonth, NgbDropdown, NgbDropdownAnchor, NgbDropdownButtonItem, NgbDropdownConfig, NgbDropdownItem, NgbDropdownMenu, NgbDropdownModule, NgbDropdownToggle, NgbHighlight, NgbInputDatepicker, NgbInputDatepickerConfig, NgbModal, NgbModalConfig, NgbModalModule, NgbModalRef, NgbModule, NgbNav, NgbNavConfig, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavLinkButton, NgbNavModule, NgbNavOutlet, NgbNavPane, NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasModule, NgbOffcanvasRef, NgbPagination, NgbPaginationConfig, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationModule, NgbPaginationNext, NgbPaginationNumber, NgbPaginationPages, NgbPaginationPrevious, NgbPopover, NgbPopoverConfig, NgbPopoverModule, NgbProgressbar, NgbProgressbarConfig, NgbProgressbarModule, NgbProgressbarStacked, NgbRating, NgbRatingConfig, NgbRatingModule, NgbScrollSpy, NgbScrollSpyConfig, NgbScrollSpyFragment, NgbScrollSpyItem, NgbScrollSpyMenu, NgbScrollSpyModule, NgbScrollSpyService, NgbSlide, NgbSlideEventDirection, NgbSlideEventSource, NgbTimeAdapter, NgbTimepicker, NgbTimepickerConfig, NgbTimepickerI18n, NgbTimepickerModule, NgbToast, NgbToastConfig, NgbToastHeader, NgbToastModule, NgbTooltip, NgbTooltipConfig, NgbTooltipModule, NgbTypeahead, NgbTypeaheadConfig, NgbTypeaheadModule, OffcanvasDismissReasons };
//# sourceMappingURL=ng-bootstrap.mjs.map
