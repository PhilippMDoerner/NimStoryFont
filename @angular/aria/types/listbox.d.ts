import * as _angular_cdk_bidi from '@angular/cdk/bidi';
import * as _angular_core from '@angular/core';
import { OnInit, OnDestroy, Signal } from '@angular/core';
import { OptionPattern, ListboxPattern } from './_listbox-chunk.js';
import { SortedCollection } from './_collection-chunk.js';
import './_list-chunk.js';
import './_list-navigation-chunk.js';
import './_keyboard-event-manager-chunk.js';
import './_click-event-manager-chunk.js';

/**
 * A selectable option in an `ngListbox`.
 *
 * This directive should be applied to an element (e.g., `<li>`, `<div>`) within an
 * `ngListbox`. The `value` input is used to identify the option, and the `label` input provides
 * the accessible name for the option.
 *
 * ```html
 * <li ngOption value="item-id" label="Item Name">
 *   Item Name
 * </li>
 * ```
 *
 * @see [Listbox](guide/aria/listbox)
 * @see [Autocomplete](guide/aria/autocomplete)
 * @see [Select](guide/aria/select)
 * @see [Multiselect](guide/aria/multiselect)
 */
declare class Option<V> implements OnInit, OnDestroy {
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** Whether the option is currently active (focused). */
    readonly active: _angular_core.Signal<boolean>;
    /** The parent Listbox. */
    private readonly _listbox;
    /** A unique identifier for the option. */
    readonly id: _angular_core.InputSignal<string>;
    /** The parent Listbox UIPattern. */
    private readonly _listboxPattern;
    /** The value of the option. */
    readonly value: _angular_core.InputSignal<V>;
    /** Whether an item is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The text used by the typeahead search. */
    readonly label: _angular_core.InputSignal<string | undefined>;
    /** Whether the option is selected. */
    readonly selected: _angular_core.Signal<boolean | undefined>;
    /** The Option UIPattern. */
    readonly _pattern: OptionPattern<V>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Option<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<Option<any>, "[ngOption]", ["ngOption"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": true; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Represents a container used to display a list of items for a user to select from.
 *
 * The `ngListbox` is meant to be used in conjunction with `ngOption` directives to create a
 * selectable list. It supports single and multiple selection modes, as well as various focus and
 * orientation strategies.
 *
 * ```html
 * <ul ngListbox [(value)]="selectedItems" [multi]="true" orientation="vertical">
 *   @for (item of items; track item.id) {
 *     <li ngOption [value]="item.id" [label]="item.name" [disabled]="item.disabled">
 *       {{item.name}}
 *     </li>
 *   }
 * </ul>
 * ```
 *
 * @see [Listbox](guide/aria/listbox)
 * @see [Autocomplete](guide/aria/autocomplete)
 * @see [Select](guide/aria/select)
 * @see [Multiselect](guide/aria/multiselect)
 */
declare class Listbox<V> implements OnDestroy {
    /** A unique identifier for the listbox. */
    readonly id: _angular_core.InputSignal<string>;
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The collection of Options. */
    readonly _collection: SortedCollection<Option<V>>;
    /** A signal wrapper for directionality. */
    protected readonly textDirection: Signal<_angular_cdk_bidi.Direction>;
    /** Whether the list is vertically or horizontally oriented. */
    readonly orientation: _angular_core.InputSignal<"vertical" | "horizontal">;
    /** Whether multiple items in the list can be selected at once. */
    readonly multi: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether focus should wrap when navigating. */
    readonly wrap: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Whether to allow disabled items to receive focus. When `true`, disabled items are
     * focusable but not interactive. When `false`, disabled items are skipped during navigation.
     */
    readonly softDisabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * The focus strategy used by the list.
     * - `roving`: Focus is moved to the active item using `tabindex`.
     * - `activedescendant`: Focus remains on the listbox container, and `aria-activedescendant` is used to indicate the active item.
     */
    readonly focusMode: _angular_core.InputSignal<"roving" | "activedescendant">;
    /**
     * The selection strategy used by the list.
     * - `follow`: The focused item is automatically selected.
     * - `explicit`: Items are selected explicitly by the user (e.g., via click or spacebar).
     */
    readonly selectionMode: _angular_core.InputSignal<"follow" | "explicit">;
    /** The amount of time before the typeahead search is reset. */
    readonly typeaheadDelay: _angular_core.InputSignal<number>;
    /** Whether the listbox is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the listbox is readonly. */
    readonly readonly: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The tabindex of the listbox. */
    readonly tabIndex: _angular_core.InputSignalWithTransform<number | undefined, string | number | undefined>;
    /** The values of the currently selected items. */
    readonly value: _angular_core.ModelSignal<V[]>;
    /** The Listbox UIPattern. */
    readonly _pattern: ListboxPattern<V>;
    /** The ID of the active descendant in the listbox. */
    readonly activeDescendant: Signal<string | undefined>;
    private readonly _orderedItemPatterns;
    constructor();
    ngOnDestroy(): void;
    scrollActiveItemIntoView(options?: ScrollIntoViewOptions): void;
    /** Navigates to the first item in the listbox. */
    gotoFirst(): void;
    /** Navigates to an item at a specific index in the listbox. */
    gotoIndex(index: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Listbox<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<Listbox<any>, "[ngListbox]", ["ngListbox"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; "multi": { "alias": "multi"; "required": false; "isSignal": true; }; "wrap": { "alias": "wrap"; "required": false; "isSignal": true; }; "softDisabled": { "alias": "softDisabled"; "required": false; "isSignal": true; }; "focusMode": { "alias": "focusMode"; "required": false; "isSignal": true; }; "selectionMode": { "alias": "selectionMode"; "required": false; "isSignal": true; }; "typeaheadDelay": { "alias": "typeaheadDelay"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "readonly": { "alias": "readonly"; "required": false; "isSignal": true; }; "tabIndex": { "alias": "tabindex"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

export { Listbox, Option };
