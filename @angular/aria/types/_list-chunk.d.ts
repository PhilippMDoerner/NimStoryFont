import { SignalLike, WritableSignalLike } from './_collection-chunk.js';
import { ListFocusItem, ListFocusInputs, ListFocus, ListNavigationItem, ListNavigationInputs, ListNavigation } from './_list-navigation-chunk.js';

/** Represents an item in a collection, such as a listbox option, that can be selected. */
interface ListSelectionItem<V> extends ListFocusItem {
    /** The value of the item. */
    value: SignalLike<V>;
    /** Whether the item is selectable. */
    selectable: SignalLike<boolean>;
}
/** Represents the required inputs for a collection that contains selectable items. */
interface ListSelectionInputs<T extends ListSelectionItem<V>, V> extends ListFocusInputs<T> {
    /** Whether multiple items in the list can be selected at once. */
    multi: SignalLike<boolean>;
    /** The current value of the list selection. */
    value: WritableSignalLike<V[]>;
    /** The selection strategy used by the list. */
    selectionMode: SignalLike<'follow' | 'explicit'>;
}
/** Controls selection for a list of items. */
declare class ListSelection<T extends ListSelectionItem<V>, V> {
    readonly inputs: ListSelectionInputs<T, V> & {
        focusManager: ListFocus<T>;
    };
    /** The start index to use for range selection. */
    readonly rangeStartIndex: WritableSignalLike<number>;
    /** The end index to use for range selection. */
    readonly rangeEndIndex: WritableSignalLike<number>;
    /** The currently selected items. */
    readonly selectedItems: SignalLike<T[]>;
    constructor(inputs: ListSelectionInputs<T, V> & {
        focusManager: ListFocus<T>;
    });
    /** Selects the item at the current active index. */
    select(item?: ListSelectionItem<V>, opts?: {
        anchor: boolean;
    }): void;
    /** Deselects the item at the current active index. */
    deselect(item?: ListSelectionItem<V>): void;
    /** Toggles the item at the current active index. */
    toggle(item?: ListSelectionItem<V>): void;
    /** Toggles only the item at the current active index. */
    toggleOne(): void;
    /** Selects all items in the list. */
    selectAll(): void;
    /** Deselects all items in the list. */
    deselectAll(): void;
    /**
     * Selects all items in the list or deselects all
     * items in the list if all items are already selected.
     */
    toggleAll(): void;
    /** Sets the selection to only the current active item. */
    selectOne(): void;
    /**
     * Selects all items in the list up to the anchor item.
     *
     * Deselects all items that were previously within the
     * selected range that are now outside of the selected range
     */
    selectRange(opts?: {
        anchor: boolean;
    }): void;
    /** Marks the given index as the start of a range selection. */
    beginRangeSelection(index?: number): void;
    /** Returns the items in the list starting from the given index.  */
    private _getItemsFromIndex;
}

/**
 * Represents an item in a collection, such as a listbox option, than can be navigated to by
 * typeahead.
 */
interface ListTypeaheadItem extends ListFocusItem {
    /** The text used by the typeahead search. */
    searchTerm: SignalLike<string>;
}
/**
 * Represents the required inputs for a collection that contains items that can be navigated to by
 * typeahead.
 */
interface ListTypeaheadInputs<T extends ListTypeaheadItem> extends ListFocusInputs<T> {
    /** The amount of time before the typeahead search is reset. */
    typeaheadDelay: SignalLike<number>;
}
/** Controls typeahead for a list of items. */
declare class ListTypeahead<T extends ListTypeaheadItem> {
    readonly inputs: ListTypeaheadInputs<T> & {
        focusManager: ListFocus<T>;
    };
    /** A reference to the timeout for resetting the typeahead search. */
    timeout?: ReturnType<typeof setTimeout> | undefined;
    /** The focus controller of the parent list. */
    readonly focusManager: ListFocus<T>;
    /** Whether the user is actively typing a typeahead search query. */
    readonly isTyping: SignalLike<boolean>;
    /** Keeps track of the characters that typeahead search is being called with. */
    private readonly _query;
    /** The index where that the typeahead search was initiated from. */
    private readonly _startIndex;
    constructor(inputs: ListTypeaheadInputs<T> & {
        focusManager: ListFocus<T>;
    });
    /** Performs a typeahead search, appending the given character to the search string. */
    search(char: string): boolean;
    /**
     * Returns the first item whose search term matches the
     * current query starting from the the current anchor index.
     */
    private _getItem;
}

/** The operations that the list can perform after navigation. */
interface NavOptions<T = any> {
    toggle?: boolean;
    select?: boolean;
    selectOne?: boolean;
    selectRange?: boolean;
    anchor?: boolean;
    focusElement?: boolean;
    items?: T[];
}
/** Represents an item in the list. */
type ListItem<V> = ListTypeaheadItem & ListNavigationItem & ListSelectionItem<V> & ListFocusItem;
/** The necessary inputs for the list behavior. */
type ListInputs<T extends ListItem<V>, V> = ListFocusInputs<T> & ListNavigationInputs<T> & ListSelectionInputs<T, V> & ListTypeaheadInputs<T>;
/** Controls the state of a list. */
declare class List<T extends ListItem<V>, V> {
    readonly inputs: ListInputs<T, V>;
    /** Controls navigation for the list. */
    readonly navigationBehavior: ListNavigation<T>;
    /** Controls selection for the list. */
    readonly selectionBehavior: ListSelection<T, V>;
    /** Controls typeahead for the list. */
    readonly typeaheadBehavior: ListTypeahead<T>;
    /** Controls focus for the list. */
    readonly focusBehavior: ListFocus<T>;
    /** Whether the list is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The id of the current active item. */
    readonly activeDescendant: SignalLike<string | undefined>;
    /** The tab index of the list. */
    readonly tabIndex: SignalLike<0 | -1>;
    /** The index of the currently active item in the list. */
    readonly activeIndex: SignalLike<number>;
    /**
     * The uncommitted index for selecting a range of options.
     *
     * NOTE: This is subtly distinct from the "rangeStartIndex" in the ListSelection behavior.
     * The anchorIndex does not necessarily represent the start of a range, but represents the most
     * recent index where the user showed intent to begin a range selection. Usually, this is wherever
     * the user most recently pressed the "Shift" key, but if the user presses shift + space to select
     * from the anchor, the user is not intending to start a new range from this index.
     *
     * In other words, "rangeStartIndex" is only set when a user commits to starting a range selection
     * while "anchorIndex" is set whenever a user indicates they may be starting a range selection.
     */
    private readonly _anchorIndex;
    /** Whether the list should wrap. Used to disable wrapping while range selecting. */
    private readonly _wrap;
    constructor(inputs: ListInputs<T, V>);
    /** Returns the tab index for the given item. */
    getItemTabindex(item: T): 0 | -1;
    /** Navigates to the first option in the list. */
    first(opts?: NavOptions<T>): void;
    /** Navigates to the last option in the list. */
    last(opts?: NavOptions<T>): void;
    /** Navigates to the next option in the list. */
    next(opts?: NavOptions<T>): void;
    /** Navigates to the previous option in the list. */
    prev(opts?: NavOptions<T>): void;
    /** Navigates to the given item in the list. */
    goto(item: T, opts?: NavOptions<T>): void;
    /** Removes focus from the list. */
    unfocus(): void;
    /** Marks the given index as the potential start of a range selection. */
    anchor(index: number): void;
    /** Handles typeahead search navigation for the list. */
    search(char: string, opts?: NavOptions): void;
    /** Checks if the list is currently typing for typeahead search. */
    isTyping(): boolean;
    /** Selects the currently active item in the list. */
    select(item?: T): void;
    /** Sets the selection to only the current active item. */
    selectOne(): void;
    /** Deselects the currently active item in the list. */
    deselect(item?: T): void;
    /** Deselects all items in the list. */
    deselectAll(): void;
    /** Toggles the currently active item in the list. */
    toggle(item?: T): void;
    /** Toggles the currently active item in the list, deselecting all other items. */
    toggleOne(): void;
    /** Toggles the selection of all items in the list. */
    toggleAll(): void;
    /** Checks if the given item is able to receive focus. */
    isFocusable(item: T): boolean;
    /** Handles updating selection for the list. */
    updateSelection(opts?: NavOptions): void;
    /**
     * Safely performs a navigation operation.
     *
     * Handles conditionally disabling wrapping for when a navigation
     * operation is occurring while the user is selecting a range of options.
     *
     * Handles boilerplate calling of focus & selection operations. Also ensures these
     * additional operations are only called if the navigation operation moved focus to a new option.
     */
    private _navigate;
}

export { List, ListSelection, ListTypeahead };
export type { ListInputs, ListItem, ListSelectionInputs, ListSelectionItem, ListTypeaheadInputs, ListTypeaheadItem, NavOptions };
