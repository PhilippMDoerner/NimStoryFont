import * as i0 from '@angular/core';
import { inject, Service, TemplateRef, EventEmitter, Output, Input, Directive, PLATFORM_ID, NgZone, ChangeDetectorRef, ElementRef, DestroyRef, Injector, afterNextRender, ContentChildren, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';
import { BehaviorSubject, combineLatest, NEVER, timer, zip } from 'rxjs';
import { map, startWith, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { reflow, ngbCompleteTransition, ngbRunTransition } from './_ngb-ngbootstrap-utilities.mjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    /**
     * @defaultValue `true`
     */
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCarouselConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbCarouselConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCarouselConfig, decorators: [{
            type: Service
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

let nextId = 0;
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
        this.id = `ngb-slide-${nextId++}`;
        /**
         * An event emitted when the slide transition is finished
         *
         * @since 8.0.0
         */
        this.slid = new EventEmitter();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbSlide, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbSlide, isStandalone: true, selector: "ng-template[ngbSlide]", inputs: { id: "id" }, outputs: { slid: "slid" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbSlide, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbSlide]' }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCarousel, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbCarousel, isStandalone: true, selector: "ngb-carousel", inputs: { animation: "animation", activeId: "activeId", interval: "interval", wrap: "wrap", keyboard: "keyboard", pauseOnHover: "pauseOnHover", pauseOnFocus: "pauseOnFocus", showNavigationArrows: "showNavigationArrows", showNavigationIndicators: "showNavigationIndicators" }, outputs: { slide: "slide", slid: "slid" }, host: { attributes: { "tabIndex": "0" }, listeners: { "keydown.arrowLeft": "keyboard && arrowLeft()", "keydown.arrowRight": "keyboard && arrowRight()", "mouseenter": "mouseHover = true", "mouseleave": "mouseHover = false", "focusin": "focused = true", "focusout": "focused = false" }, properties: { "style.display": "\"block\"" }, classAttribute: "carousel slide" }, queries: [{ propertyName: "slides", predicate: NgbSlide }], exportAs: ["ngbCarousel"], ngImport: i0, template: `
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
	`, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCarousel, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngb-carousel',
                    exportAs: 'ngbCarousel',
                    imports: [NgTemplateOutlet],
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbCarouselModule, imports: [NgbCarousel, NgbSlide], exports: [NgbCarousel, NgbSlide] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCarouselModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbCarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbCarousel, NgbSlide],
                    exports: [NgbCarousel, NgbSlide],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbCarousel, NgbCarouselConfig, NgbCarouselModule, NgbSlide, NgbSlideEventDirection, NgbSlideEventSource };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-carousel.mjs.map
