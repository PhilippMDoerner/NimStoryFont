import { SignalLike, WritableSignalLike } from './_collection-chunk.js';
import { ExpansionItem, ListExpansionInputs, ListExpansion } from './_expansion-chunk.js';
import { ListNavigationItem, ListFocusItem, ListFocusInputs, ListNavigationInputs, ListNavigation, ListFocus } from './_list-navigation-chunk.js';
import { ListTypeaheadItem, ListSelectionItem, ListSelectionInputs, ListTypeaheadInputs, ListSelection, ListTypeahead, NavOptions } from './_list-chunk.js';
import { KeyboardEventManager } from './_keyboard-event-manager-chunk.js';
import { ClickEventManager } from './_click-event-manager-chunk.js';

/** Represents an item in the tree. */
interface TreeItem<V, T extends TreeItem<V, T>> extends ListTypeaheadItem, ListNavigationItem, ListSelectionItem<V>, ListFocusItem, ExpansionItem {
    /** The children of this item. */
    children: SignalLike<T[] | undefined>;
    /** The parent of this item. */
    parent: SignalLike<T | undefined>;
    /** Whether this item is visible. */
    visible: SignalLike<boolean>;
}
/** The necessary inputs for the tree behavior. */
type TreeInputs$1<T extends TreeItem<V, T>, V> = ListFocusInputs<T> & ListNavigationInputs<T> & ListSelectionInputs<T, V> & ListTypeaheadInputs<T> & ListExpansionInputs;
/** Controls the state of a tree. */
declare class Tree<T extends TreeItem<V, T>, V> {
    readonly inputs: TreeInputs$1<T, V>;
    /** Controls navigation for the tree. */
    readonly navigationBehavior: ListNavigation<T>;
    /** Controls selection for the tree. */
    readonly selectionBehavior: ListSelection<T, V>;
    /** Controls typeahead for the tree. */
    readonly typeaheadBehavior: ListTypeahead<T>;
    /** Controls focus for the tree. */
    readonly focusBehavior: ListFocus<T>;
    /** Controls expansion for the tree. */
    readonly expansionBehavior: ListExpansion;
    /** Whether the tree is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The id of the current active item. */
    readonly activeDescendant: SignalLike<string | undefined>;
    /** The tab index of the tree. */
    readonly tabIndex: SignalLike<0 | -1>;
    /** The index of the currently active item in the tree (within the flattened list). */
    readonly activeIndex: SignalLike<number>;
    /** The uncommitted index for selecting a range of options. */
    private readonly _anchorIndex;
    /** Whether the list should wrap. */
    private readonly _wrap;
    constructor(inputs: TreeInputs$1<T, V>);
    /** Returns the tab index for the given item. */
    getItemTabindex(item: T): 0 | -1;
    /** Navigates to the first option in the tree. */
    first(opts?: NavOptions<T>): void;
    /** Navigates to the last option in the tree. */
    last(opts?: NavOptions<T>): void;
    /** Navigates to the next option in the tree. */
    next(opts?: NavOptions<T>): void;
    /** Navigates to the previous option in the tree. */
    prev(opts?: NavOptions<T>): void;
    /** Navigates to the first child of the current active item. */
    firstChild(opts?: NavOptions<T>): void;
    /** Navigates to the last child of the current active item. */
    lastChild(opts?: NavOptions<T>): void;
    /** Navigates to the next sibling of the current active item. */
    nextSibling(opts?: NavOptions<T>): void;
    /** Navigates to the previous sibling of the current active item. */
    prevSibling(opts?: NavOptions<T>): void;
    /** Navigates to the parent of the current active item. */
    parent(opts?: NavOptions<T>): void;
    /** Navigates to the given item in the tree. */
    goto(item: T, opts?: NavOptions<T>): void;
    /** Removes focus from the tree. */
    unfocus(): void;
    /** Marks the given index as the potential start of a range selection. */
    anchor(index: number): void;
    /** Handles typeahead search navigation for the tree. */
    search(char: string, opts?: NavOptions<T>): void;
    /** Checks if the tree is currently typing for typeahead search. */
    isTyping(): boolean;
    /** Selects the currently active item in the tree. */
    select(item?: T): void;
    /** Sets the selection to only the current active item. */
    selectOne(): void;
    /** Deselects the currently active item in the tree. */
    deselect(item?: T): void;
    /** Deselects all items in the tree. */
    deselectAll(): void;
    /** Toggles the currently active item in the tree. */
    toggle(item?: T): void;
    /** Toggles the currently active item in the tree, deselecting all other items. */
    toggleOne(): void;
    /** Toggles the selection of all items in the tree. */
    toggleAll(): void;
    /** Toggles the expansion of the given item. */
    toggleExpansion(item?: T): void;
    /** Expands the given item. */
    expand(item: T): void;
    /** Collapses the given item. */
    collapse(item: T): void;
    /** Expands all sibling items of the given item (or active item). */
    expandSiblings(item?: T): void;
    /** Expands all items in the tree. */
    expandAll(): void;
    /** Collapses all items in the tree. */
    collapseAll(): void;
    /** Checks if the given item is able to receive focus. */
    isFocusable(item: T): boolean;
    /** Checks if the given item is expandable. */
    isExpandable(item: T): boolean;
    /** Handles updating selection for the tree. */
    updateSelection(opts?: NavOptions<T>): void;
    /**
     * Safely performs a navigation operation.
     */
    private _navigate;
}

/** Represents the required inputs for a tree item. */
interface TreeItemInputs<V> extends Omit<TreeItem<V, TreeItemPattern<V>>, 'index' | 'parent' | 'visible' | 'expandable'> {
    /** The parent item. */
    parent: SignalLike<TreeItemPattern<V> | TreePattern<V>>;
    /** Whether this item has children. Children can be lazily loaded. */
    hasChildren: SignalLike<boolean>;
    /** The tree pattern this item belongs to. */
    tree: SignalLike<TreePattern<V>>;
}
/**
 * Represents an item in a Tree.
 */
declare class TreeItemPattern<V> implements TreeItem<V, TreeItemPattern<V>> {
    readonly inputs: TreeItemInputs<V>;
    /** A unique identifier for this item. */
    readonly id: SignalLike<string>;
    /** The value of this item. */
    readonly value: SignalLike<V>;
    /** A reference to the item element. */
    readonly element: SignalLike<HTMLElement>;
    /** Whether the item is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The text used by the typeahead search. */
    readonly searchTerm: SignalLike<string>;
    /** The tree pattern this item belongs to. */
    readonly tree: SignalLike<TreePattern<V>>;
    /** The parent item. */
    readonly parent: SignalLike<TreeItemPattern<V> | undefined>;
    /** The children items. */
    readonly children: SignalLike<TreeItemPattern<V>[]>;
    /** The position of this item among its siblings. */
    readonly index: SignalLike<number>;
    /** Whether the item is expandable. It's expandable if children item exist. */
    readonly expandable: SignalLike<boolean>;
    /** Whether the item is selectable. */
    readonly selectable: SignalLike<boolean>;
    /** Whether the item is expanded. */
    readonly expanded: WritableSignalLike<boolean>;
    /** The level of the current item in a tree. */
    readonly level: SignalLike<number>;
    /** Whether this item is visible. */
    readonly visible: SignalLike<boolean>;
    /** The number of items under the same parent at the same level. */
    readonly setsize: SignalLike<number>;
    /** The position of this item among its siblings (1-based). */
    readonly posinset: SignalLike<number>;
    /** Whether the item is active. */
    readonly active: SignalLike<boolean>;
    /** The tab index of the item. */
    readonly tabIndex: SignalLike<0 | -1>;
    /** Whether the item is selected. */
    readonly selected: SignalLike<boolean | undefined>;
    /** The current type of this item. */
    readonly current: SignalLike<string | undefined>;
    constructor(inputs: TreeItemInputs<V>);
}
/** The selection operations that the tree can perform. */
interface SelectOptions {
    toggle?: boolean;
    selectOne?: boolean;
    selectRange?: boolean;
    anchor?: boolean;
}
/** Represents the required inputs for a tree. */
interface TreeInputs<V> extends Omit<TreeInputs$1<TreeItemPattern<V>, V>, 'multiExpandable'> {
    /** A unique identifier for the tree. */
    id: SignalLike<string>;
    /** Whether the tree is in navigation mode. */
    nav: SignalLike<boolean>;
    /** The aria-current type. */
    currentType: SignalLike<'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'>;
    /** The text direction of the tree. */
    textDirection: SignalLike<'ltr' | 'rtl'>;
}
/** Controls the state and interactions of a tree view. */
declare class TreePattern<V> implements TreeInputs<V> {
    readonly inputs: TreeInputs<V>;
    /** The tree behavior for the tree. */
    readonly treeBehavior: Tree<TreeItemPattern<V>, V>;
    /** Whether the tree has been interacted with. */
    readonly hasBeenInteracted: WritableSignalLike<boolean>;
    /** The root level is 0. */
    readonly level: () => number;
    /** The root is always expanded. */
    readonly expanded: () => boolean;
    /** The root is always visible. */
    readonly visible: () => boolean;
    /** The tab index of the tree. */
    readonly tabIndex: SignalLike<-1 | 0>;
    /** The id of the current active item. */
    readonly activeDescendant: SignalLike<string | undefined>;
    /** The direct children of the root (top-level tree items). */
    readonly children: SignalLike<TreeItemPattern<V>[]>;
    /** Whether the tree selection follows focus. */
    readonly followFocus: SignalLike<boolean>;
    /** Whether the tree direction is RTL. */
    readonly isRtl: SignalLike<boolean>;
    /** The key for navigating to the previous item. */
    readonly prevKey: SignalLike<"ArrowUp" | "ArrowRight" | "ArrowLeft">;
    /** The key for navigating to the next item. */
    readonly nextKey: SignalLike<"ArrowRight" | "ArrowLeft" | "ArrowDown">;
    /** The key for collapsing an item or moving to its parent. */
    readonly collapseKey: SignalLike<"ArrowUp" | "ArrowRight" | "ArrowLeft">;
    /** The key for expanding an item or moving to its first child. */
    readonly expandKey: SignalLike<"ArrowRight" | "ArrowLeft" | "ArrowDown">;
    /** Represents the space key. Does nothing when the user is actively using typeahead. */
    readonly dynamicSpaceKey: SignalLike<"" | " ">;
    /** Regular expression to match characters for typeahead. */
    readonly typeaheadRegexp: RegExp;
    /** The keydown event manager for the tree. */
    readonly keydown: SignalLike<KeyboardEventManager<KeyboardEvent>>;
    /** The click event manager for the tree. */
    readonly clickManager: SignalLike<ClickEventManager<PointerEvent>>;
    /** A unique identifier for the tree. */
    readonly id: SignalLike<string>;
    /** The host native element. */
    readonly element: SignalLike<HTMLElement>;
    /** Whether the tree is in navigation mode. */
    readonly nav: SignalLike<boolean>;
    /** The aria-current type. */
    readonly currentType: SignalLike<'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'>;
    /** All items in the tree, in document order (DFS-like, a flattened list). */
    readonly items: SignalLike<TreeItemPattern<V>[]>;
    /** The focus strategy used by the tree. */
    readonly focusMode: SignalLike<'roving' | 'activedescendant'>;
    /** Whether the tree is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The currently active item in the tree. */
    readonly activeItem: WritableSignalLike<TreeItemPattern<V> | undefined>;
    /** Whether disabled items should be focusable. */
    readonly softDisabled: SignalLike<boolean>;
    /** Whether the focus should wrap when navigating past the first or last item. */
    readonly wrap: SignalLike<boolean>;
    /** The orientation of the tree. */
    readonly orientation: SignalLike<'vertical' | 'horizontal'>;
    /** The text direction of the tree. */
    readonly textDirection: SignalLike<'ltr' | 'rtl'>;
    /** Whether multiple items can be selected at the same time. */
    readonly multi: SignalLike<boolean>;
    /** The selection mode of the tree. */
    readonly selectionMode: SignalLike<'follow' | 'explicit'>;
    /** The delay in milliseconds to wait before clearing the typeahead buffer. */
    readonly typeaheadDelay: SignalLike<number>;
    /** The current selected items of the tree. */
    readonly value: WritableSignalLike<V[]>;
    constructor(inputs: TreeInputs<V>);
    /** Returns a set of violations */
    validate(): string[];
    /**
     * Sets the tree to it's default initial state.
     *
     * Sets the active index of the tree to the first focusable selected tree item if one exists.
     * Otherwise, sets focus to the first focusable tree item.
     */
    setDefaultState(): void;
    /** Sets the default active state of the tree before receiving interaction for the first time. */
    setDefaultStateEffect(): void;
    /** Handles keydown events on the tree. */
    onKeydown(event: KeyboardEvent): void;
    /** Handles click events on the tree. */
    onClick(event: PointerEvent): void;
    /** Handles focusin events on the tree. */
    onFocusIn(): void;
    /** Navigates to the given tree item in the tree. */
    goto(e: PointerEvent, opts?: SelectOptions): void;
    /** Expands the active item if possible, otherwise navigates to the first child. */
    _expandOrFirstChild(opts?: SelectOptions): void;
    /** Collapses the active item if possible, otherwise navigates to the parent. */
    _collapseOrParent(opts?: SelectOptions): void;
    /** Retrieves the TreeItemPattern associated with a DOM event, if any. */
    protected _getItem(event: Event): TreeItemPattern<V> | undefined;
}

export { TreeItemPattern, TreePattern };
export type { TreeInputs, TreeItemInputs };
