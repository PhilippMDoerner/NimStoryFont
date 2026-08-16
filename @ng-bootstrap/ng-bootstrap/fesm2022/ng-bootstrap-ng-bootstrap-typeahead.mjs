import * as i0 from '@angular/core';
import { Input, ViewEncapsulation, Component, Service, EventEmitter, Output, ChangeDetectionStrategy, inject, ElementRef, DOCUMENT, NgZone, ChangeDetectorRef, Injector, afterEveryRender, forwardRef, Directive, NgModule } from '@angular/core';
import { toString, removeAccents, regExpEscape, Live, PopupService, ngbPositioning, isDefined, addPopperOffset, ngbAutoClose } from './_ngb-ngbootstrap-utilities.mjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, fromEvent, BehaviorSubject, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { NgTemplateOutlet } from '@angular/common';

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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbHighlight, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbHighlight, isStandalone: true, selector: "ngb-highlight", inputs: { highlightClass: "highlightClass", result: "result", term: "term", accentSensitive: "accentSensitive" }, usesOnChanges: true, ngImport: i0, template: `
		@for (part of parts; track $index) {
			@if ($odd) {
				<span class="{{ highlightClass }}">{{ part }}</span>
			} @else {
				<ng-container>{{ part }}</ng-container>
			}
		}
	`, isInline: true, styles: [".ngb-highlight{font-weight:700}\n"], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbHighlight, decorators: [{
            type: Component,
            args: [{ selector: 'ngb-highlight', encapsulation: ViewEncapsulation.None, template: `
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeaheadConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeaheadConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeaheadConfig, decorators: [{
            type: Service
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeaheadWindow, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbTypeaheadWindow, isStandalone: true, selector: "ngb-typeahead-window", inputs: { id: "id", focusFirst: "focusFirst", results: "results", term: "term", formatter: "formatter", resultTemplate: "resultTemplate", popupClass: "popupClass" }, outputs: { selectEvent: "select", activeChangeEvent: "activeChange" }, host: { attributes: { "role": "listbox" }, listeners: { "mousedown": "$event.preventDefault()" }, properties: { "class": "\"dropdown-menu show\" + (popupClass ? \" \" + popupClass : \"\")", "id": "id" } }, exportAs: ["ngbTypeaheadWindow"], ngImport: i0, template: `
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
	`, isInline: true, dependencies: [{ kind: "component", type: NgbHighlight, selector: "ngb-highlight", inputs: ["highlightClass", "result", "term", "accentSensitive"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.Eager, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeaheadWindow, decorators: [{
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
                    changeDetection: ChangeDetectionStrategy.Eager,
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
                    this._afterRenderRef = afterEveryRender({
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
            this._onChange(this.editable ? value : null);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeahead, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbTypeahead, isStandalone: true, selector: "input[ngbTypeahead]", inputs: { autocomplete: "autocomplete", container: "container", editable: "editable", focusFirst: "focusFirst", inputFormatter: "inputFormatter", ngbTypeahead: "ngbTypeahead", resultFormatter: "resultFormatter", resultTemplate: "resultTemplate", selectOnExact: "selectOnExact", showHint: "showHint", placement: "placement", popperOptions: "popperOptions", popupClass: "popupClass" }, outputs: { selectItem: "selectItem" }, host: { attributes: { "autocapitalize": "off", "autocorrect": "off", "role": "combobox" }, listeners: { "blur": "handleBlur()", "keydown": "handleKeyDown($event)" }, properties: { "class.open": "isPopupOpen()", "autocomplete": "autocomplete", "attr.aria-autocomplete": "showHint ? \"both\" : \"list\"", "attr.aria-activedescendant": "activeDescendant", "attr.aria-controls": "isPopupOpen() ? popupId : null", "attr.aria-expanded": "isPopupOpen()" } }, providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbTypeahead), multi: true }], exportAs: ["ngbTypeahead"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeahead, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[ngbTypeahead]',
                    exportAs: 'ngbTypeahead',
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
                        '[attr.aria-controls]': 'isPopupOpen() ? popupId : null',
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeaheadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeaheadModule, imports: [NgbHighlight, NgbTypeahead], exports: [NgbHighlight, NgbTypeahead] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeaheadModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbTypeaheadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NgbHighlight, NgbTypeahead],
                    exports: [NgbHighlight, NgbTypeahead],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbHighlight, NgbTypeahead, NgbTypeaheadConfig, NgbTypeaheadModule };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-typeahead.mjs.map
