import { flip, preventOverflow, arrow, createPopperLite, offset } from '@popperjs/core';
import * as i0 from '@angular/core';
import { inject, DOCUMENT, Service, ApplicationRef, Injector, ViewContainerRef, NgZone, afterNextRender, TemplateRef, InjectionToken } from '@angular/core';
import { Observable, EMPTY, of, Subject, fromEvent, timer, race } from 'rxjs';
import { endWith, takeUntil, filter, tap, map, withLatestFrom, delay, mergeMap } from 'rxjs/operators';

class NgbRTL {
    constructor() {
        this._element = inject(DOCUMENT).documentElement;
    }
    isRTL() {
        return (this._element.getAttribute('dir') || '').toLowerCase() === 'rtl';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbRTL, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbRTL }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbRTL, decorators: [{
            type: Service
        }] });

const placementSeparator = /\s+/;
const spacesRegExp = /  +/gi;
/**
 * Matching classes from the Bootstrap ones to the poppers ones.
 * The first index of each array is used for the left to right direction,
 * the second one is used for the right to left, defaulting to the first index (when LTR and RTL lead to the same class)
 *
 * See [Bootstrap alignments](https://getbootstrap.com/docs/5.3/components/dropdowns/#alignment-options)
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

function getTransitionDurationMs(element) {
    const { transitionDelay, transitionDuration } = window.getComputedStyle(element);
    const transitionDelaySec = parseFloat(transitionDelay);
    const transitionDurationSec = parseFloat(transitionDuration);
    return (transitionDelaySec + transitionDurationSec) * 1000;
}

const noopFn = () => { };
const environment = {
    getTransitionTimerDelayMs: () => 5,
};
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
        const timer$ = timer(transitionDurationMs + environment.getTransitionTimerDelayMs()).pipe(takeUntil(stop$));
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: ScrollBar, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: ScrollBar }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: ScrollBar, decorators: [{
            type: Service
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
function listenToTriggers(element, triggers, isOpenedFn, openFn, closeFn, openDelayMs = 0, closeDelayMs = 0, enterContent = EMPTY, leaveContent = EMPTY) {
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
        if (openTrigger === 'mouseenter' && closeTrigger === 'mouseleave' && closeDelayMs > 0) {
            const enterContentSub = enterContent.subscribe(() => {
                activeOpenTriggers.delete(openTrigger);
                clearTimeout(timeout);
            });
            const leaveContentSub = leaveContent.subscribe(() => {
                activeOpenTriggers.delete(openTrigger);
                withDelay(() => activeOpenTriggers.size === 0 && closeFn(), closeDelayMs);
            });
            cleanupFns.push(() => enterContentSub.unsubscribe(), () => leaveContentSub.unsubscribe());
        }
    }
    cleanupFns.push(() => clearTimeout(timeout));
    return () => cleanupFns.forEach((cleanupFn) => cleanupFn());
}

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: Live, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: Live }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: Live, decorators: [{
            type: Service
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ARIA_LIVE_DELAY, ContentRef, FOCUSABLE_ELEMENTS_SELECTOR, Live, PopupService, ScrollBar, addPopperOffset, getActiveElement, getFocusableBoundaryElements, getValueInRange, isDefined, isInteger, isNumber, isPromise, isString, listenToTriggers, ngbAutoClose, ngbCollapsingTransition, ngbCompleteTransition, ngbFocusTrap, ngbPositioning, ngbRunTransition, padNumber, reflow, regExpEscape, removeAccents, toInteger, toString };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-utils.mjs.map
