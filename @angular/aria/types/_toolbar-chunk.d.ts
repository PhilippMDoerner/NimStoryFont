import { SignalLike, WritableSignalLike } from './_collection-chunk.js';
import { ListItem, ListInputs, List } from './_list-chunk.js';

/** Represents the required inputs for a toolbar widget group. */
interface ToolbarWidgetGroupInputs<T extends ListItem<V>, V> {
    /** A reference to the parent toolbar. */
    toolbar: SignalLike<ToolbarPattern<V> | undefined>;
    /** Whether the widget group is disabled. */
    disabled: SignalLike<boolean>;
    /** The list of items within the widget group. */
    items: SignalLike<T[]>;
    /** Whether the group allows multiple widgets to be selected. */
    multi: SignalLike<boolean>;
}
/** A group of widgets within a toolbar that provides nested navigation. */
declare class ToolbarWidgetGroupPattern<T extends ListItem<V>, V> {
    readonly inputs: ToolbarWidgetGroupInputs<T, V>;
    /** Whether the widget is disabled. */
    readonly disabled: () => boolean;
    /** A reference to the parent toolbar. */
    readonly toolbar: () => ToolbarPattern<V> | undefined;
    /** Whether the group allows multiple widgets to be selected. */
    readonly multi: () => boolean;
    readonly searchTerm: () => string;
    readonly value: () => V;
    readonly selectable: () => boolean;
    readonly element: () => undefined;
    constructor(inputs: ToolbarWidgetGroupInputs<T, V>);
}

/** Represents the required inputs for a toolbar widget in a toolbar. */
interface ToolbarWidgetInputs<V> extends Omit<ListItem<V>, 'searchTerm' | 'index' | 'selectable'> {
    /** A reference to the parent toolbar. */
    toolbar: SignalLike<ToolbarPattern<V>>;
    /** A reference to the parent widget group. */
    group: SignalLike<ToolbarWidgetGroupPattern<ToolbarWidgetPattern<V>, V> | undefined>;
}
declare class ToolbarWidgetPattern<V> implements ListItem<V> {
    readonly inputs: ToolbarWidgetInputs<V>;
    /** A unique identifier for the widget. */
    readonly id: () => string;
    /** The html element that should receive focus. */
    readonly element: () => HTMLElement | undefined;
    /** Whether the widget is disabled. */
    readonly disabled: () => boolean;
    /** A reference to the parent toolbar. */
    readonly group: () => ToolbarWidgetGroupPattern<ToolbarWidgetPattern<V>, V> | undefined;
    /** A reference to the toolbar containing the widget. */
    readonly toolbar: () => ToolbarPattern<V>;
    /** The tabindex of the widget. */
    readonly tabIndex: SignalLike<0 | -1>;
    /** The text used by the typeahead search. */
    readonly searchTerm: () => string;
    /** The value associated with the widget. */
    readonly value: () => V;
    /** Whether the widget is selectable. */
    readonly selectable: () => boolean;
    /** The position of the widget within the toolbar. */
    readonly index: SignalLike<number>;
    /** Whether the widget is selected (only relevant in a selection group). */
    readonly selected: SignalLike<boolean>;
    /** Whether the widget is currently the active one (focused). */
    readonly active: SignalLike<boolean>;
    constructor(inputs: ToolbarWidgetInputs<V>);
}

/** Represents the required inputs for a toolbar. */
type ToolbarInputs<V> = Omit<ListInputs<ToolbarWidgetPattern<V>, V>, 'multi' | 'typeaheadDelay' | 'selectionMode' | 'focusMode'> & {
    /** A function that returns the toolbar item associated with a given element. */
    getItem: (e: Element) => ToolbarWidgetPattern<V> | undefined;
};
/** Controls the state of a toolbar. */
declare class ToolbarPattern<V> {
    readonly inputs: ToolbarInputs<V>;
    /** The list behavior for the toolbar. */
    readonly listBehavior: List<ToolbarWidgetPattern<V>, V>;
    /** Whether the toolbar has been interacted with. */
    readonly hasBeenInteracted: WritableSignalLike<boolean>;
    /** Whether the tablist is vertically or horizontally oriented. */
    readonly orientation: SignalLike<'vertical' | 'horizontal'>;
    /** Whether disabled items in the group should be focusable. */
    readonly softDisabled: SignalLike<boolean>;
    /** Whether the toolbar is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The tab index of the toolbar (if using activedescendant). */
    readonly tabIndex: SignalLike<0 | -1>;
    /** The id of the current active widget (if using activedescendant). */
    readonly activeDescendant: SignalLike<string | undefined>;
    /** The currently active item in the toolbar. */
    readonly activeItem: () => ToolbarWidgetPattern<V> | undefined;
    /** The key used to navigate to the previous widget. */
    private readonly _prevKey;
    /** The key used to navigate to the next widget. */
    private readonly _nextKey;
    /** The alternate key used to navigate to the previous widget. */
    private readonly _altPrevKey;
    /** The alternate key used to navigate to the next widget. */
    private readonly _altNextKey;
    /** The keydown event manager for the toolbar. */
    private readonly _keydown;
    /** Navigates to the next widget in a widget group. */
    private _groupNext;
    /** Navigates to the previous widget in a widget group. */
    private _groupPrev;
    /** Navigates to the widget targeted by a pointer event. */
    private _goto;
    select(): void;
    constructor(inputs: ToolbarInputs<V>);
    /** Returns a set of violations */
    validate(): string[];
    /** Handles keydown events for the toolbar. */
    onKeydown(event: KeyboardEvent): void;
    onPointerdown(event: PointerEvent): void;
    onFocusIn(): void;
    /** Handles click events for the toolbar. */
    onClick(event: MouseEvent): void;
    /**
     * Sets the toolbar to its default initial state.
     *
     * Sets the active index to the selected widget if one exists and is focusable.
     * Otherwise, sets the active index to the first focusable widget.
     */
    setDefaultState(): void;
    /** Sets the default active state of the toolbar before receiving interaction for the first time. */
    setDefaultStateEffect(): void;
}

export { ToolbarPattern, ToolbarWidgetGroupPattern, ToolbarWidgetPattern };
export type { ToolbarInputs, ToolbarWidgetGroupInputs, ToolbarWidgetInputs };
