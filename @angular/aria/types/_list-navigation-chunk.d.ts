import { SignalLike, WritableSignalLike } from './_collection-chunk.js';

/** Represents an item in a collection, such as a listbox option, than may receive focus. */
interface ListFocusItem {
    /** A unique identifier for the item. */
    id: SignalLike<string>;
    /** The html element that should receive focus. */
    element: SignalLike<HTMLElement | undefined>;
    /** Whether an item is disabled. */
    disabled: SignalLike<boolean>;
}
/** Represents the required inputs for a collection that contains focusable items. */
interface ListFocusInputs<T extends ListFocusItem> {
    /** The focus strategy used by the list. */
    focusMode: SignalLike<'roving' | 'activedescendant'>;
    /** Whether the list is disabled. */
    disabled: SignalLike<boolean>;
    /** The items in the list. */
    items: SignalLike<T[]>;
    /** The active item. */
    activeItem: WritableSignalLike<T | undefined>;
    /** Whether disabled items in the list should be focusable. */
    softDisabled: SignalLike<boolean>;
    /** The html element that should receive focus. */
    element: SignalLike<HTMLElement | undefined>;
}
/** Controls focus for a list of items. */
declare class ListFocus<T extends ListFocusItem> {
    readonly inputs: ListFocusInputs<T>;
    /** The last item that was active. */
    readonly prevActiveItem: WritableSignalLike<T | undefined>;
    /** The index of the last item that was active. */
    readonly prevActiveIndex: SignalLike<number>;
    /** The current active index in the list. */
    readonly activeIndex: SignalLike<number>;
    constructor(inputs: ListFocusInputs<T>);
    /** Whether the list is in a disabled state. */
    isListDisabled(): boolean;
    /** The id of the current active item. */
    getActiveDescendant(): string | undefined;
    /** The tab index for the list. */
    getListTabIndex(): -1 | 0;
    /** Returns the tab index for the given item. */
    getItemTabIndex(item: T): -1 | 0;
    /** Moves focus to the given item if it is focusable. */
    focus(item: T, opts?: {
        focusElement?: boolean;
    }): boolean;
    /** Returns true if the given item can be navigated to. */
    isFocusable(item: T): boolean;
}

/** Represents an item in a collection, such as a listbox option, than can be navigated to. */
interface ListNavigationItem extends ListFocusItem {
}
/** Represents the required inputs for a collection that has navigable items. */
interface ListNavigationInputs<T extends ListNavigationItem> extends ListFocusInputs<T> {
    /** Whether focus should wrap when navigating. */
    wrap: SignalLike<boolean>;
    /** Whether the list is vertically or horizontally oriented. */
    orientation: SignalLike<'vertical' | 'horizontal'>;
    /** The direction that text is read based on the users locale. */
    textDirection: SignalLike<'rtl' | 'ltr'>;
}
/** Options for list navigation. */
interface ListNavigationOpts<T> {
    /**
     * Whether to focus the item's element.
     * Defaults to true.
     */
    focusElement?: boolean;
    /**
     * The list of items to navigate through.
     * Defaults to the list of items from the inputs.
     */
    items?: T[];
}
/** Controls navigation for a list of items. */
declare class ListNavigation<T extends ListNavigationItem> {
    readonly inputs: ListNavigationInputs<T> & {
        focusManager: ListFocus<T>;
    };
    constructor(inputs: ListNavigationInputs<T> & {
        focusManager: ListFocus<T>;
    });
    /** Navigates to the given item. */
    goto(item?: T, opts?: ListNavigationOpts<T>): boolean;
    /** Navigates to the next item in the list. */
    next(opts?: ListNavigationOpts<T>): boolean;
    /** Peeks the next item in the list. */
    peekNext(opts?: ListNavigationOpts<T>): T | undefined;
    /** Navigates to the previous item in the list. */
    prev(opts?: ListNavigationOpts<T>): boolean;
    /** Peeks the previous item in the list. */
    peekPrev(opts?: ListNavigationOpts<T>): T | undefined;
    /** Navigates to the first item in the list. */
    first(opts?: ListNavigationOpts<T>): boolean;
    /** Navigates to the last item in the list. */
    last(opts?: ListNavigationOpts<T>): boolean;
    /** Gets the first focusable item from the given list of items. */
    peekFirst(opts?: ListNavigationOpts<T>): T | undefined;
    /** Gets the last focusable item from the given list of items. */
    peekLast(opts?: ListNavigationOpts<T>): T | undefined;
    /** Advances to the next or previous focusable item in the list based on the given delta. */
    private _advance;
    /** Peeks the next or previous focusable item in the list based on the given delta. */
    private _peek;
}

export { ListFocus, ListNavigation };
export type { ListFocusInputs, ListFocusItem, ListNavigationInputs, ListNavigationItem };
