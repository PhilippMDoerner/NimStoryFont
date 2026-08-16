import { BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate, ComponentHarness } from '@angular/cdk/testing';

/** Filters for locating a `GridCellHarness`. */
interface GridCellHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
    /** Only find instances whose selected state matches the given value. */
    selected?: boolean;
    /** Only find instances whose disabled state matches the given value. */
    disabled?: boolean;
}
/** Filters for locating a `GridRowHarness`. */
interface GridRowHarnessFilters extends BaseHarnessFilters {
}
/** Filters for locating a `GridHarness`. */
interface GridHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose disabled state matches the given value. */
    disabled?: boolean;
}

/** Harness for interacting with a standard ngGridCell in tests. */
declare class GridCellHarness extends ContentContainerComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a grid cell with specific attributes.
     * @param options Options for filtering which cell instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: GridCellHarnessFilters): HarnessPredicate<GridCellHarness>;
    /** Whether the cell is selected. */
    isSelected(): Promise<boolean>;
    /** Whether the cell is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the text content of the cell. */
    getText(): Promise<string>;
    /** Clicks the cell. */
    click(): Promise<void>;
    /** Focuses the cell. */
    focus(): Promise<void>;
    /** Blurs the cell. */
    blur(): Promise<void>;
    /** Whether the cell is active. */
    isActive(): Promise<boolean>;
    /** Whether the cell is focused. */
    isFocused(): Promise<boolean>;
}
/** Harness for interacting with a standard ngGridRow in tests. */
declare class GridRowHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a grid row with specific attributes.
     * @param options Options for filtering which row instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: GridRowHarnessFilters): HarnessPredicate<GridRowHarness>;
    /** Gets all cells in the row. */
    getCells(filters?: GridCellHarnessFilters): Promise<GridCellHarness[]>;
    /** Gets the text of the cells in the row. */
    getCellTextByIndex(filters?: GridCellHarnessFilters): Promise<string[]>;
}
/** Harness for interacting with a standard ngGrid in tests. */
declare class GridHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a grid with specific attributes.
     * @param options Options for filtering which grid instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: GridHarnessFilters): HarnessPredicate<GridHarness>;
    /** Whether the grid is disabled. */
    isDisabled(): Promise<boolean>;
    /** Whether the grid is multi-selectable. */
    isMultiSelectable(): Promise<boolean>;
    /** Gets all rows in the grid. */
    getRows(filters?: GridRowHarnessFilters): Promise<GridRowHarness[]>;
    /** Gets all cells in the grid. */
    getCells(filters?: GridCellHarnessFilters): Promise<GridCellHarness[]>;
    /** Gets the text inside the entire grid organized by rows. */
    getCellTextByIndex(): Promise<string[][]>;
}

export { GridCellHarness, GridHarness, GridRowHarness };
export type { GridCellHarnessFilters, GridHarnessFilters, GridRowHarnessFilters };
