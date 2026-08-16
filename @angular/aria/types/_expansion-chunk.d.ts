import { SignalLike, WritableSignalLike } from './_collection-chunk.js';

/** Represents an item that can be expanded or collapsed. */
interface ExpansionItem {
    /** Whether the item is expandable. */
    expandable: SignalLike<boolean>;
    /** Whether the item is expanded. */
    expanded: WritableSignalLike<boolean>;
    /** Whether the expansion is disabled. */
    disabled: SignalLike<boolean>;
}
/** Represents the required inputs for an expansion behavior. */
interface ListExpansionInputs {
    /** Whether multiple items can be expanded at once. */
    multiExpandable: SignalLike<boolean>;
    /** An array of expansion items. */
    items: SignalLike<ExpansionItem[]>;
    /** Whether all expansions are disabled. */
    disabled: SignalLike<boolean>;
}
/** Manages the expansion state of a list of items. */
declare class ListExpansion {
    readonly inputs: ListExpansionInputs;
    constructor(inputs: ListExpansionInputs);
    /** Opens the specified item. */
    open(item: ExpansionItem): boolean;
    /** Closes the specified item. */
    close(item: ExpansionItem): boolean;
    /** Toggles the expansion state of the specified item. */
    toggle(item: ExpansionItem): boolean;
    /** Opens all focusable items in the list. */
    openAll(): void;
    /** Closes all focusable items in the list. */
    closeAll(): void;
    /** Checks whether the specified item is expandable / collapsible. */
    isExpandable(item: ExpansionItem): boolean;
}

export { ListExpansion };
export type { ExpansionItem, ListExpansionInputs };
