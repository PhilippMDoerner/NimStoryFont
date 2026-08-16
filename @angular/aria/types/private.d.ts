export { ListboxInputs, ListboxPattern, OptionInputs, OptionPattern } from './_listbox-chunk.js';
export { MenuBarInputs, MenuBarPattern, MenuInputs, MenuItemInputs, MenuItemPattern, MenuPattern, MenuTriggerInputs, MenuTriggerPattern } from './_menu-chunk.js';
import { SignalLike, WritableSignalLike } from './_collection-chunk.js';
export { HasElement, SortedCollection, computed, convertGetterSetterToWritableSignalLike, linkedSignal, signal, sortDirectives } from './_collection-chunk.js';
export { TabInputs, TabListInputs, TabListPattern, TabPanelInputs, TabPanelPattern, TabPattern } from './_tabs-chunk.js';
export { ToolbarInputs, ToolbarPattern, ToolbarWidgetGroupInputs, ToolbarWidgetGroupPattern, ToolbarWidgetInputs, ToolbarWidgetPattern } from './_toolbar-chunk.js';
export { AccordionGroupInputs, AccordionGroupPattern, AccordionTriggerInputs, AccordionTriggerPattern } from './_accordion-chunk.js';
export { TreeInputs, TreeItemInputs, TreeItemPattern, TreePattern } from './_tree-chunk.js';
export { ElementResolver, GridCellInputs, GridCellPattern, GridCellWidgetInputs, GridCellWidgetPattern, GridInputs, GridPattern, GridRowInputs, GridRowPattern, resolveElement } from './_grid-chunk.js';
export { DeferredContent, DeferredContentAware } from './_deferred-content-chunk.js';
import * as _angular_core from '@angular/core';
import { KeyboardEventManager } from './_keyboard-event-manager-chunk.js';
import { ClickEventManager } from './_click-event-manager-chunk.js';
import { ExpansionItem } from './_expansion-chunk.js';
export { untracked } from '@angular/core/primitives/signals';
import './_list-chunk.js';
import './_list-navigation-chunk.js';

/**
 * Transform function for tabIndex inputs.
 * Returns undefined if the value is undefined, otherwise converts it to a number.
 */
declare function tabIndexTransform(v: string | number | undefined): number | undefined;

/** Logs each of the violations to the console as errors, optionally with the host element context. */
declare function reportViolations(violations: string[], element: Element): void;

/** Represents the required inputs for a simple combobox. */
interface ComboboxInputs extends ExpansionItem {
    /** Whether the combobox should always remain expanded. */
    alwaysExpanded: SignalLike<boolean>;
    /** The value of the combobox. */
    value: WritableSignalLike<string>;
    /** The element that the combobox is attached to. */
    element: SignalLike<HTMLElement>;
    /** The popup associated with the combobox. */
    popup: SignalLike<ComboboxPopupPattern | undefined>;
    /** An inline suggestion to be displayed in the input. */
    inlineSuggestion: SignalLike<string | undefined>;
    /** Whether the combobox is disabled. */
    disabled: SignalLike<boolean>;
    /** Whether the combobox is readonly. */
    readonly: SignalLike<boolean>;
    /** Whether the combobox is soft disabled. */
    softDisabled?: SignalLike<boolean>;
}
/** Controls the state of a simple combobox. */
declare class ComboboxPattern {
    readonly inputs: ComboboxInputs;
    /** The expanded state of the combobox. */
    readonly isExpanded: _angular_core.Signal<boolean>;
    /** The value of the combobox. */
    readonly value: WritableSignalLike<string>;
    /** The element that the combobox is attached to. */
    readonly element: () => HTMLElement;
    /** Whether the combobox is disabled. */
    readonly disabled: () => boolean;
    /** Whether the combobox is readonly. */
    readonly readonly: () => boolean;
    /** Whether the combobox is soft disabled. */
    readonly softDisabled: () => boolean;
    /** An inline suggestion to be displayed in the input. */
    readonly inlineSuggestion: () => string | undefined;
    /** The ID of the active descendant in the popup. */
    readonly activeDescendant: _angular_core.Signal<string | undefined>;
    /** The ID of the popup. */
    readonly popupId: _angular_core.Signal<string | undefined>;
    /** The type of the popup. */
    readonly popupType: _angular_core.Signal<"listbox" | "tree" | "grid" | "dialog" | undefined>;
    /** The autocomplete behavior of the combobox. */
    readonly autocomplete: _angular_core.Signal<"none" | "inline" | "list" | "both">;
    /** A relay for keyboard events to the popup. */
    readonly keyboardEventRelay: _angular_core.WritableSignal<KeyboardEvent | undefined>;
    /** Whether the combobox is focused. */
    readonly isFocused: _angular_core.WritableSignal<boolean>;
    /** Whether the most recent input event was a deletion. */
    readonly isDeleting: _angular_core.WritableSignal<boolean>;
    /** Whether the combobox is editable (i.e., an input or textarea). */
    readonly isEditable: _angular_core.Signal<boolean>;
    /** The aria-readonly attribute value for non-editable comboboxes. */
    readonly ariaReadonly: _angular_core.Signal<"true" | null>;
    /** The native readonly attribute value for editable comboboxes. */
    readonly nativeReadonly: _angular_core.Signal<"" | null>;
    /** The native disabled attribute value for hard-disabled comboboxes. */
    readonly nativeDisabled: _angular_core.Signal<"" | null>;
    /** The keydown event manager for the combobox. */
    keydown: _angular_core.Signal<KeyboardEventManager<KeyboardEvent>>;
    /** The click event manager for the combobox. */
    click: _angular_core.Signal<ClickEventManager<PointerEvent>>;
    constructor(inputs: ComboboxInputs);
    /** Handles keydown events for the combobox. */
    onKeydown(event: KeyboardEvent): void;
    /** Handles click events for the combobox. */
    onClick(event: PointerEvent): void;
    /** Handles focus in events for the combobox. */
    onFocusin(): void;
    /** Handles focus out events for the combobox. */
    onFocusout(): void;
    /** Handles input events for the combobox. */
    onInput(event: Event): void;
    /** Highlights the currently selected item in the combobox. */
    highlightEffect(): void;
    /** Relays keyboard events to the popup. */
    keyboardEventRelayEffect(): void;
}
/** Represents the required inputs for a simple combobox popup. */
interface ComboboxPopupInputs {
    /** The type of the popup. */
    popupType: SignalLike<'listbox' | 'tree' | 'grid' | 'dialog'>;
    /** The element that serves as the control target for the popup. */
    controlTarget: SignalLike<HTMLElement | undefined>;
    /** The ID of the active descendant in the popup. */
    activeDescendant: SignalLike<string | undefined>;
    /** The ID of the popup. */
    popupId: SignalLike<string | undefined>;
}
/** Controls the state of a simple combobox popup. */
declare class ComboboxPopupPattern {
    readonly inputs: ComboboxPopupInputs;
    /** The type of the popup. */
    readonly popupType: () => "listbox" | "tree" | "grid" | "dialog";
    /** The element that serves as the control target for the popup. */
    readonly controlTarget: () => HTMLElement | undefined;
    /** The ID of the active descendant in the popup. */
    readonly activeDescendant: () => string | undefined;
    /** The ID of the popup. */
    readonly popupId: () => string | undefined;
    /** Whether the popup is focused. */
    readonly isFocused: _angular_core.WritableSignal<boolean>;
    constructor(inputs: ComboboxPopupInputs);
    /** Handles focus in events for the popup. */
    onFocusin(): void;
    /** Handles focus out events for the popup. */
    onFocusout(event: FocusEvent): void;
}

export { ComboboxPattern, ComboboxPopupPattern, SignalLike, WritableSignalLike, reportViolations, tabIndexTransform };
export type { ComboboxInputs, ComboboxPopupInputs };
