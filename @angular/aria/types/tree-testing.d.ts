import { BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate, ComponentHarness } from '@angular/cdk/testing';

/** A set of criteria that can be used to filter a list of tree harness instances */
interface TreeHarnessFilters extends BaseHarnessFilters {
}
/** A set of criteria that can be used to filter a list of tree item harness instances. */
interface TreeItemHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
    /** Only find instances whose disabled state matches the given value. */
    disabled?: boolean;
    /** Only find instances whose expansion state matches the given value. */
    expanded?: boolean;
    /** Only find instances whose selection state matches the given value. */
    selected?: boolean;
    /** Only find instances whose level matches the given value. */
    level?: number;
}

/** Harness for interacting with an Aria tree item. */
declare class TreeItemHarness extends ContentContainerComponentHarness<string> {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tree item with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: TreeItemHarnessFilters): HarnessPredicate<TreeItemHarness>;
    /** Whether the tree item is expanded. */
    isExpanded(): Promise<boolean>;
    /** Whether the tree item is disabled. */
    isDisabled(): Promise<boolean>;
    /** Whether the tree item is selected. */
    isSelected(): Promise<boolean>;
    /** Gets the level of the tree item. Note that this gets the aria-level and is 1 indexed. */
    getLevel(): Promise<number>;
    /** Gets the tree item's text. */
    getText(): Promise<string>;
    /** Clicks the tree item. */
    click(): Promise<void>;
    /** Focuses the tree item. */
    focus(): Promise<void>;
    /** Blurs the tree item. */
    blur(): Promise<void>;
    /** Whether the tree item is active. */
    isActive(): Promise<boolean>;
    /** Whether the tree item has focus. */
    isFocused(): Promise<boolean>;
    private _getHostAttribute;
}

interface TextTree {
    text?: string;
    children?: TextTree[];
}
/** Harness for interacting with an Aria tree in tests. */
declare class TreeHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a tree with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: TreeHarnessFilters): HarnessPredicate<TreeHarness>;
    /** Gets all of the items in the tree. */
    getItems(filter?: TreeItemHarnessFilters): Promise<TreeItemHarness[]>;
    /**
     * Gets an object representation for the visible tree structure
     * If an item is under an unexpanded item it will not be included.
     */
    getTreeStructure(): Promise<TextTree>;
    /**
     * Recursively collect the structured text of the tree items.
     * @param items A list of tree items
     * @param level The level of items that are being accounted for during this iteration
     * @param parentExpanded Whether the parent of the first item in param items is expanded
     */
    private _getTreeStructure;
    private _addChildToItem;
}

export { TreeHarness, TreeItemHarness };
export type { TextTree, TreeHarnessFilters, TreeItemHarnessFilters };
