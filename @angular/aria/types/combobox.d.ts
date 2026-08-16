import * as _angular_core from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import * as i1 from '@angular/aria/private';
import { ComboboxPopupPattern, DeferredContentAware, ComboboxPattern } from '@angular/aria/private';
export { DeferredContent as ɵɵDeferredContent, DeferredContentAware as ɵɵDeferredContentAware } from './_deferred-content-chunk.js';

/**
 * Identifies an element as a widget within a combobox popup.
 *
 * This directive should be applied to the element that contains the options or content
 * of the popup. It handles the communication of ID and active descendant information
 * to the combobox.
 */
declare class ComboboxWidget implements OnInit, OnDestroy {
    /** The element that the popup widget is attached to. */
    private readonly _elementRef;
    private readonly _popup;
    /** A reference to the popup widget element. */
    readonly element: HTMLElement;
    /** The ID of the popup widget. */
    readonly popupId: _angular_core.WritableSignal<string | undefined>;
    /** The ID of the active descendant in the widget. */
    readonly activeDescendant: _angular_core.InputSignal<string | undefined>;
    private _observer;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Handles focus in events for the widget. */
    onFocusin(): void;
    /** Handles focus out events for the widget. */
    onFocusout(event: FocusEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ComboboxWidget, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<ComboboxWidget, "[ngComboboxWidget]", ["ngComboboxWidget"], { "activeDescendant": { "alias": "activeDescendant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * A structural directive that marks the `ng-template` to be used as the popup
 * for a combobox. This content is conditionally rendered.
 *
 * The content of the popup can be any element with the `ngComboboxWidget` directive.
 *
 * ```html
 * <ng-template ngComboboxPopup>
 *   <div ngComboboxWidget>
 *     <!-- ... options ... -->
 *   </div>
 * </ng-template>
 * ```
 */
declare class ComboboxPopup implements OnInit, OnDestroy {
    private readonly _deferredContent;
    /** The combobox that the popup belongs to. */
    readonly combobox: _angular_core.InputSignal<Combobox>;
    /** The widget contained within the popup. */
    readonly _widget: _angular_core.WritableSignal<ComboboxWidget | undefined>;
    /** The element that serves as the control target for the popup. */
    readonly controlTarget: _angular_core.Signal<HTMLElement | undefined>;
    /** The ID of the popup. */
    readonly popupId: _angular_core.Signal<string | undefined>;
    /** The ID of the active descendant in the popup. */
    readonly activeDescendant: _angular_core.Signal<string | undefined>;
    /** The type of the popup (e.g., listbox, tree, grid, dialog). */
    readonly popupType: _angular_core.InputSignal<"listbox" | "tree" | "grid" | "dialog">;
    /** The popup pattern. */
    readonly _pattern: ComboboxPopupPattern;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Registers a widget with the popup. */
    _registerWidget(widget: ComboboxWidget): void;
    /** Unregisters the widget from the popup. */
    _unregisterWidget(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ComboboxPopup, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<ComboboxPopup, "ng-template[ngComboboxPopup]", ["ngComboboxPopup"], { "combobox": { "alias": "combobox"; "required": true; "isSignal": true; }; "popupType": { "alias": "popupType"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof i1.DeferredContent; inputs: {}; outputs: {}; }]>;
}

/**
 * A directive that coordinates a combobox trigger element and its associated popup widget.
 *
 * The `ngCombobox` directive is applied directly to the interactive trigger element, which can be
 * either an editable `<input>` (for search/autocomplete behaviors) or a non-editable element like
 * a `<div>` (for custom select dropdowns). It manages focus and expansion states, coordinates autocomplete
 * suggestions (if editable), and forwards navigation keys down into the active popup.
 *
 * ### Example 1: Editable Autocomplete Input
 * ```html
 * <input ngCombobox #combobox="ngCombobox" [(value)]="searchQuery" [(expanded)]="isExpanded" />
 *
 * <ng-template ngComboboxPopup [combobox]="combobox">
 *   <div ngComboboxWidget #listbox="ngListbox" ngListbox [(value)]="selectedValues" [activeDescendant]="listbox.activeDescendant()">
 *     <div ngOption value="first">First Option</div>
 *     <div ngOption value="second">Second Option</div>
 *   </div>
 * </ng-template>
 * ```
 *
 * ### Example 2: Non-Editable Custom Select Dropdown
 * ```html
 * <div ngCombobox #combobox="ngCombobox" [(expanded)]="isExpanded" class="select-trigger">
 *   {{selectedValue}}
 * </div>
 *
 * <ng-template ngComboboxPopup [combobox]="combobox">
 *   <div ngComboboxWidget #listbox="ngListbox" ngListbox [(value)]="selectedValues" [activeDescendant]="listbox.activeDescendant()">
 *     <div ngOption value="first">First Option</div>
 *     <div ngOption value="second">Second Option</div>
 *   </div>
 * </ng-template>
 * ```
 */
declare class Combobox extends DeferredContentAware implements OnInit {
    private readonly _renderer;
    /** The element that the combobox is attached to. */
    private readonly _elementRef;
    /** A reference to the input element. */
    readonly element: HTMLElement;
    /** The popup associated with the combobox. */
    readonly _popup: _angular_core.WritableSignal<ComboboxPopup | undefined>;
    /** Whether the combobox is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the combobox is readonly. */
    readonly readonly: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the combobox is soft disabled (remains focusable). */
    readonly softDisabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the combobox should always remain expanded. */
    readonly alwaysExpanded: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The tabindex of the combobox. */
    readonly tabIndex: _angular_core.InputSignalWithTransform<number | undefined, string | number | undefined>;
    /** Whether the combobox is expanded. */
    readonly expanded: _angular_core.ModelSignal<boolean>;
    /** The value of the combobox input. */
    readonly value: _angular_core.ModelSignal<string>;
    /** An inline suggestion to be displayed in the input. */
    readonly inlineSuggestion: _angular_core.InputSignal<string | undefined>;
    /** The combobox ui pattern. */
    readonly _pattern: ComboboxPattern;
    constructor();
    ngOnInit(): void;
    /** Registers a popup with the combobox. */
    _registerPopup(popup: ComboboxPopup): void;
    /** Unregisters the popup from the combobox. */
    _unregisterPopup(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Combobox, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<Combobox, "[ngCombobox]", ["ngCombobox"], { "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "readonly": { "alias": "readonly"; "required": false; "isSignal": true; }; "softDisabled": { "alias": "softDisabled"; "required": false; "isSignal": true; }; "alwaysExpanded": { "alias": "alwaysExpanded"; "required": false; "isSignal": true; }; "tabIndex": { "alias": "tabindex"; "required": false; "isSignal": true; }; "expanded": { "alias": "expanded"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "inlineSuggestion": { "alias": "inlineSuggestion"; "required": false; "isSignal": true; }; }, { "expanded": "expandedChange"; "value": "valueChange"; }, never, never, true, never>;
}

export { Combobox, ComboboxPopup, ComboboxWidget };
