import * as i0 from '@angular/core';
import { OnChanges, SimpleChanges, OnInit, OnDestroy, TemplateRef, EventEmitter } from '@angular/core';
import * as _popperjs_core from '@popperjs/core';
import { Options } from '@popperjs/core';
import * as _ng_bootstrap_ng_bootstrap_utils from './_ngb-ngbootstrap-utilities.d';
import { PlacementArray } from './_ngb-ngbootstrap-utilities.d';
import { ControlValueAccessor } from '@angular/forms';
import { OperatorFunction } from 'rxjs';

/**
 * A component that helps with text highlighting.
 *
 * It splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
 * highlighting:
 *
 * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
 */
declare class NgbHighlight implements OnChanges {
    parts: string[];
    /**
     * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
     */
    highlightClass: string;
    /**
     * The text highlighting is added to.
     *
     * If the `term` is found inside this text, it will be highlighted.
     * If the `term` contains array then all the items from it will be highlighted inside the text.
     */
    result?: string | null;
    /**
     * The term or array of terms to be highlighted.
     * Since version `v4.2.0` term could be a `string[]`
     */
    term: string | readonly string[];
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
    accentSensitive: boolean;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbHighlight, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbHighlight, "ngb-highlight", never, { "highlightClass": { "alias": "highlightClass"; "required": false; }; "result": { "alias": "result"; "required": true; }; "term": { "alias": "term"; "required": true; }; "accentSensitive": { "alias": "accentSensitive"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * The context for the typeahead result template in case you want to override the default one.
 */
interface ResultTemplateContext {
    /**
     * Your typeahead result item.
     */
    result: any;
    /**
     * Search term from the `<input>` used to get current result.
     */
    term: string;
    /**
     * The function which transforms the result into a string
     */
    formatter: (result: any) => string;
}

/**
 * An event emitted right before an item is selected from the result list.
 */
interface NgbTypeaheadSelectItemEvent<T = any> {
    /**
     * The item from the result list about to be selected.
     */
    item: T;
    /**
     * Calling this function will prevent item selection from happening.
     */
    preventDefault: () => void;
}
/**
 * A directive providing a simple way of creating powerful typeaheads from any text input.
 */
declare class NgbTypeahead implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
    private _nativeElement;
    private _config;
    private _live;
    private _document;
    private _ngZone;
    private _changeDetector;
    private _injector;
    private _popupService;
    private _positioning;
    private _subscription;
    private _closed$;
    private _inputValueBackup;
    private _inputValueForSelectOnExact;
    private _valueChanges$;
    private _resubscribeTypeahead$;
    private _windowRef;
    private _afterRenderRef;
    /**
     * The value for the `autocomplete` attribute for the `<input>` element.
     *
     * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
     *
     * @since 2.1.0
     */
    autocomplete: string;
    /**
     * A selector specifying the element the typeahead popup will be appended to.
     *
     * Currently only supports `"body"`.
     */
    container: any;
    /**
     * If `true`, model values will not be restricted only to items selected from the popup.
     */
    editable: boolean;
    /**
     * If `true`, the first item in the result list will always stay focused while typing.
     */
    focusFirst: boolean;
    /**
     * The function that converts an item from the result list to a `string` to display in the `<input>` field.
     *
     * It is called when the user selects something in the popup or the model value changes, so the input needs to
     * be updated.
     */
    inputFormatter: (item: any) => string;
    /**
     * The function that converts a stream of text values from the `<input>` element to the stream of the array of items
     * to display in the typeahead popup.
     *
     * If the resulting observable emits a non-empty array - the popup will be shown. If it emits an empty array - the
     * popup will be closed.
     *
     * See the [basic example](#/components/typeahead/examples#basic) for more details.
     *
     * Note that the `this` argument is `undefined` so you need to explicitly bind it to a desired "this" target.
     */
    ngbTypeahead: OperatorFunction<string, readonly any[]> | null | undefined;
    /**
     * The function that converts an item from the result list to a `string` to display in the popup.
     *
     * Must be provided, if your `ngbTypeahead` returns something other than `Observable<string[]>`.
     *
     * Alternatively for more complex markup in the popup you should use `resultTemplate`.
     */
    resultFormatter: (item: any) => string;
    /**
     * The template to override the way resulting items are displayed in the popup.
     *
     * See the [ResultTemplateContext](#/components/typeahead/api#ResultTemplateContext) for the template context.
     *
     * Also see the [template for results demo](#/components/typeahead/examples#template) for more details.
     */
    resultTemplate: TemplateRef<ResultTemplateContext>;
    /**
     * If `true`, automatically selects the item when it is the only one that exactly matches the user input
     *
     * @since 14.2.0
     */
    selectOnExact: boolean;
    /**
     * If `true`, will show the hint in the `<input>` when an item in the result list matches.
     */
    showHint: boolean;
    /**
     * The preferred placement of the typeahead, among the [possible values](#/guides/positioning#api).
     *
     * The default order of preference is `"bottom-start bottom-end top-start top-end"`
     *
     * Please see the [positioning overview](#/positioning) for more details.
     */
    placement: _ng_bootstrap_ng_bootstrap_utils.PlacementArray;
    /**
     * Allows to change default Popper options when positioning the typeahead.
     * Receives current popper options and returns modified ones.
     *
     * @since 13.1.0
     */
    popperOptions: (options: Partial<_popperjs_core.Options>) => Partial<_popperjs_core.Options>;
    /**
     * A custom class to append to the typeahead popup window
     *
     * Accepts a string containing CSS class to be applied on the `ngb-typeahead-window`.
     *
     * This can be used to provide instance-specific styling, ex. you can override popup window `z-index`
     *
     * @since 9.1.0
     */
    popupClass: string;
    /**
     * An event emitted right before an item is selected from the result list.
     *
     * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
     */
    selectItem: EventEmitter<NgbTypeaheadSelectItemEvent<any>>;
    activeDescendant: string | null;
    popupId: string;
    private _onTouched;
    private _onChange;
    ngOnInit(): void;
    ngOnChanges({ ngbTypeahead }: SimpleChanges): void;
    ngOnDestroy(): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    writeValue(value: any): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * Dismisses typeahead popup window
     */
    dismissPopup(): void;
    /**
     * Returns true if the typeahead popup window is displayed
     */
    isPopupOpen(): boolean;
    handleBlur(): void;
    handleKeyDown(event: KeyboardEvent): void;
    private _openPopup;
    private _closePopup;
    private _selectResult;
    private _selectResultClosePopup;
    private _showHint;
    private _formatItemForInput;
    private _writeInputValue;
    private _subscribeToUserInput;
    private _unsubscribeFromUserInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTypeahead, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbTypeahead, "input[ngbTypeahead]", ["ngbTypeahead"], { "autocomplete": { "alias": "autocomplete"; "required": false; }; "container": { "alias": "container"; "required": false; }; "editable": { "alias": "editable"; "required": false; }; "focusFirst": { "alias": "focusFirst"; "required": false; }; "inputFormatter": { "alias": "inputFormatter"; "required": false; }; "ngbTypeahead": { "alias": "ngbTypeahead"; "required": false; }; "resultFormatter": { "alias": "resultFormatter"; "required": false; }; "resultTemplate": { "alias": "resultTemplate"; "required": false; }; "selectOnExact": { "alias": "selectOnExact"; "required": false; }; "showHint": { "alias": "showHint"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "popperOptions": { "alias": "popperOptions"; "required": false; }; "popupClass": { "alias": "popupClass"; "required": false; }; }, { "selectItem": "selectItem"; }, never, never, true, never>;
}

/**
 * A configuration service for the [`NgbTypeahead`](#/components/typeahead/api#NgbTypeahead) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the typeaheads used in the application.
 */
declare class NgbTypeaheadConfig {
    container: any;
    editable: boolean;
    focusFirst: boolean;
    selectOnExact: boolean;
    showHint: boolean;
    placement: PlacementArray;
    popperOptions: (options: Partial<Options>) => Partial<Options>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTypeaheadConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgbTypeaheadConfig>;
}

declare class NgbTypeaheadModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbTypeaheadModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgbTypeaheadModule, never, [typeof NgbHighlight, typeof NgbTypeahead], [typeof NgbHighlight, typeof NgbTypeahead]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgbTypeaheadModule>;
}

export { NgbHighlight, NgbTypeahead, NgbTypeaheadConfig, NgbTypeaheadModule };
export type { NgbTypeaheadSelectItemEvent };
