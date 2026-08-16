import { KeyboardEventManager } from './_keyboard-event-manager-chunk.js';
import { ClickEventManager } from './_click-event-manager-chunk.js';
import { ExpansionItem, ListExpansionInputs, ListExpansion } from './_expansion-chunk.js';
import { SignalLike, WritableSignalLike } from './_collection-chunk.js';
import { ListNavigationItem, ListNavigationInputs, ListFocus, ListNavigation } from './_list-navigation-chunk.js';

/** The required inputs to tabs. */
interface TabInputs extends Omit<ListNavigationItem, 'index'>, Omit<ExpansionItem, 'expandable' | 'expanded'> {
    /** The parent tablist that controls the tab. */
    tabList: SignalLike<TabListPattern>;
    /** The remote tabpanel controlled by the tab. */
    tabPanel: SignalLike<TabPanelPattern | undefined>;
}
/** A tab in a tablist. */
declare class TabPattern {
    readonly inputs: TabInputs;
    /** A global unique identifier for the tab. */
    readonly id: SignalLike<string>;
    /** Whether the tab is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The html element that should receive focus. */
    readonly element: SignalLike<HTMLElement>;
    /** Whether this tab has expandable panel. */
    readonly expandable: SignalLike<boolean>;
    readonly expanded: WritableSignalLike<boolean>;
    /** Whether the tab is active. */
    readonly active: SignalLike<boolean>;
    /** Whether the tab is selected. */
    readonly selected: SignalLike<boolean>;
    /** The tab index of the tab. */
    readonly tabIndex: SignalLike<0 | -1>;
    /** The id of the tabpanel associated with the tab. */
    readonly controls: SignalLike<string | undefined>;
    constructor(inputs: TabInputs);
    /** Opens the tab. */
    open(): boolean;
}
/** The required inputs for the tabpanel. */
interface TabPanelInputs {
    /** A global unique identifier for the tabpanel. */
    id: SignalLike<string>;
    /** The tab that controls this tabpanel. */
    readonly tab: SignalLike<TabPattern | undefined>;
}
/** A tabpanel associated with a tab. */
declare class TabPanelPattern {
    readonly inputs: TabPanelInputs;
    /** A global unique identifier for the tabpanel. */
    readonly id: SignalLike<string>;
    /** Whether the tabpanel is hidden. */
    readonly hidden: SignalLike<boolean>;
    /** The tab index of this tabpanel. */
    readonly tabIndex: SignalLike<-1 | 0>;
    /** The aria-labelledby value for this tabpanel. */
    readonly labelledBy: SignalLike<string | undefined>;
    constructor(inputs: TabPanelInputs);
}
/** The required inputs for the tablist. */
interface TabListInputs extends Omit<ListNavigationInputs<TabPattern>, 'multi'>, Omit<ListExpansionInputs, 'multiExpandable' | 'items'> {
    /** The selection strategy used by the tablist. */
    selectionMode: SignalLike<'follow' | 'explicit'>;
    /** The currently selected tab. */
    selectedTab: WritableSignalLike<TabPattern | undefined>;
}
/** Controls the state of a tablist. */
declare class TabListPattern {
    readonly inputs: TabListInputs;
    /** The list focus behavior for the tablist. */
    readonly focusBehavior: ListFocus<TabPattern>;
    /** The list navigation behavior for the tablist. */
    readonly navigationBehavior: ListNavigation<TabPattern>;
    /** Controls expansion for the tablist. */
    readonly expansionBehavior: ListExpansion;
    /** Whether the tablist has been interacted with. */
    readonly hasBeenInteracted: WritableSignalLike<boolean>;
    /** The currently active tab. */
    readonly activeTab: SignalLike<TabPattern | undefined>;
    /** The currently selected tab. */
    readonly selectedTab: WritableSignalLike<TabPattern | undefined>;
    /** Whether the tablist is vertically or horizontally oriented. */
    readonly orientation: SignalLike<'vertical' | 'horizontal'>;
    /** Whether the tablist is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The tab index of the tablist. */
    readonly tabIndex: SignalLike<0 | -1>;
    /** The id of the current active tab. */
    readonly activeDescendant: SignalLike<string | undefined>;
    /** Whether selection should follow focus. */
    readonly followFocus: SignalLike<boolean>;
    /** The key used to navigate to the previous tab in the tablist. */
    readonly prevKey: SignalLike<"ArrowUp" | "ArrowRight" | "ArrowLeft">;
    /** The key used to navigate to the next item in the list. */
    readonly nextKey: SignalLike<"ArrowRight" | "ArrowLeft" | "ArrowDown">;
    /** The keydown event manager for the tablist. */
    readonly keydown: SignalLike<KeyboardEventManager<KeyboardEvent>>;
    /** The click event manager for the tablist. */
    readonly clickManager: SignalLike<ClickEventManager<PointerEvent>>;
    constructor(inputs: TabListInputs);
    /**
     * Sets the tablist to its default initial state.
     *
     * Sets the active index of the tablist to the first focusable selected
     * tab if one exists. Otherwise, sets focus to the first focusable tab.
     *
     * This method should be called once the tablist and its tabs are properly initialized.
     */
    setDefaultState(): void;
    /** Sets the default active state of the tablist before receiving interaction for the first time. */
    setDefaultStateEffect(): void;
    /** Handles keydown events for the tablist. */
    onKeydown(event: KeyboardEvent): void;
    /** The click event manager for the tablist. */
    onClick(event: PointerEvent): void;
    /** Handles focusin events for the tablist. */
    onFocusIn(): void;
    /** Opens the given tab or the current active tab. */
    open(tab?: TabPattern): boolean;
    /** Executes a navigation operation and expand the active tab if needed. */
    private _navigate;
    /** Returns the tab item associated with the given pointer event. */
    private _getItem;
}

export { TabListPattern, TabPanelPattern, TabPattern };
export type { TabInputs, TabListInputs, TabPanelInputs };
