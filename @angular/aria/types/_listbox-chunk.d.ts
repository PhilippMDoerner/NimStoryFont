import { SignalLike, WritableSignalLike } from './_collection-chunk.js';
import { ListInputs, List, ListItem } from './_list-chunk.js';
import { KeyboardEventManager } from './_keyboard-event-manager-chunk.js';
import { ClickEventManager } from './_click-event-manager-chunk.js';

/**
 * Represents the properties exposed by a listbox that need to be accessed by an option.
 * This exists to avoid circular dependency errors between the listbox and option.
 */
interface ListboxPattern$1<V> {
    inputs: ListInputs<OptionPattern<V>, V>;
    listBehavior: List<OptionPattern<V>, V>;
}
/** Represents the required inputs for an option in a listbox. */
interface OptionInputs<V> extends Omit<ListItem<V>, 'index' | 'selectable'> {
    listbox: SignalLike<ListboxPattern$1<V> | undefined>;
}
/** Represents an option in a listbox. */
declare class OptionPattern<V> {
    /** A unique identifier for the option. */
    readonly id: SignalLike<string>;
    /** The value of the option. */
    readonly value: SignalLike<V>;
    /** The position of the option in the list. */
    readonly index: SignalLike<number>;
    /** Whether the option is active. */
    readonly active: SignalLike<boolean>;
    /** Whether the option is selected. */
    readonly selected: SignalLike<boolean | undefined>;
    /** Whether the option is selectable. */
    readonly selectable: () => boolean;
    /** Whether the option is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The text used by the typeahead search. */
    readonly searchTerm: SignalLike<string>;
    /** A reference to the parent listbox. */
    readonly listbox: SignalLike<ListboxPattern$1<V> | undefined>;
    /** The tab index of the option. */
    readonly tabIndex: SignalLike<0 | -1 | undefined>;
    /** The html element that should receive focus. */
    readonly element: SignalLike<HTMLElement | undefined>;
    constructor(args: OptionInputs<V>);
}

/** Represents the required inputs for a listbox. */
type ListboxInputs<V> = ListInputs<OptionPattern<V>, V> & {
    /** A unique identifier for the listbox. */
    id: SignalLike<string>;
    /** Whether the listbox is readonly. */
    readonly: SignalLike<boolean>;
};
/** Controls the state of a listbox. */
declare class ListboxPattern<V> {
    readonly inputs: ListboxInputs<V>;
    readonly listBehavior: List<OptionPattern<V>, V>;
    /** Whether the listbox has been interacted with. */
    readonly hasBeenInteracted: WritableSignalLike<boolean>;
    /** Whether the list is vertically or horizontally oriented. */
    readonly orientation: SignalLike<'vertical' | 'horizontal'>;
    /** Whether the listbox is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** Whether the listbox is readonly. */
    readonly readonly: SignalLike<boolean>;
    /** The tab index of the listbox. */
    readonly tabIndex: SignalLike<-1 | 0>;
    /** The id of the current active item. */
    readonly activeDescendant: SignalLike<string | undefined>;
    /** Whether multiple items in the list can be selected at once. */
    multi: SignalLike<boolean>;
    /** The number of items in the listbox. */
    readonly setsize: SignalLike<number>;
    /** Whether the listbox selection follows focus. */
    readonly followFocus: SignalLike<boolean>;
    /** Whether the listbox should wrap. Used to disable wrapping while range selecting. */
    readonly wrap: WritableSignalLike<boolean>;
    /** The key used to navigate to the previous item in the list. */
    readonly prevKey: SignalLike<"ArrowUp" | "ArrowRight" | "ArrowLeft">;
    /** The key used to navigate to the next item in the list. */
    readonly nextKey: SignalLike<"ArrowRight" | "ArrowLeft" | "ArrowDown">;
    /** Represents the space key. Does nothing when the user is actively using typeahead. */
    readonly dynamicSpaceKey: SignalLike<"" | " ">;
    /** The regexp used to decide if a key should trigger typeahead. */
    readonly typeaheadRegexp: RegExp;
    /** The keydown event manager for the listbox. */
    readonly keydown: SignalLike<KeyboardEventManager<KeyboardEvent>>;
    /** The click event manager for the listbox. */
    readonly clickManager: SignalLike<ClickEventManager<PointerEvent>>;
    constructor(inputs: ListboxInputs<V>);
    /** Returns a set of violations */
    validate(): string[];
    /** Handles keydown events for the listbox. */
    onKeydown(event: KeyboardEvent): void;
    onClick(event: PointerEvent): void;
    onFocusIn(): void;
    /**
     * Sets the listbox to it's default initial state.
     *
     * Sets the active index of the listbox to the first focusable selected
     * item if one exists. Otherwise, sets focus to the first focusable item.
     *
     * This method should be called once the listbox and it's options are properly initialized,
     * meaning the ListboxPattern and OptionPatterns should have references to each other before this
     * is called.
     */
    setDefaultState(): void;
    /**
     * Sets the default active state of the listbox before receiving interaction for the first time.
     */
    setDefaultStateEffect(): void;
    protected _getItem(e: PointerEvent): OptionPattern<V> | undefined;
}

export { ListboxPattern, OptionPattern };
export type { ListboxInputs, OptionInputs };
