import { SignalLike, WritableSignalLike } from './_collection-chunk.js';
import { KeyboardEventManager } from './_keyboard-event-manager-chunk.js';
import { ClickEventManager } from './_click-event-manager-chunk.js';
import { ElementRef } from '@angular/core';

/** Represents coordinates in a grid. */
interface RowCol {
    /** The row index. */
    row: number;
    /** The column index. */
    col: number;
}
/** The base interface for a cell in a grid. */
interface BaseGridCell {
    /** The number of rows the cell should span. */
    rowSpan: SignalLike<number>;
    /** The number of columns the cell should span. */
    colSpan: SignalLike<number>;
}
/** Represents the required inputs for GridData. */
interface GridDataInputs<T extends BaseGridCell> {
    /** The two-dimensional array of cells that represents the grid. */
    cells: SignalLike<T[][]>;
}
/** Controls internal coordinates for a grid of items. */
declare class GridData<T extends BaseGridCell> {
    readonly inputs: GridDataInputs<T>;
    /** The two-dimensional array of cells that represents the grid. */
    readonly cells: SignalLike<T[][]>;
    /** The maximum number of rows in the grid, accounting for row spans. */
    readonly maxRowCount: SignalLike<number>;
    /** The maximum number of columns in the grid, accounting for column spans. */
    readonly maxColCount: SignalLike<number>;
    /** A map from a cell to its primary and spanned coordinates. */
    private readonly _coordsMap;
    /** A map from a coordinate string to the cell at that coordinate. */
    private readonly _cellMap;
    /** A map from a row index to the number of columns in that row. */
    private readonly _colCountsByRow;
    /** A map from a column index to the number of rows in that column. */
    private readonly _rowCountByCol;
    constructor(inputs: GridDataInputs<T>);
    /** Whether the cell exists. */
    hasCell(cell: T): boolean;
    /** Gets the cell at the given coordinates. */
    getCell(rowCol: RowCol): T | undefined;
    /** Gets the primary coordinates of the given cell. */
    getCoords(cell: T): RowCol | undefined;
    /** Gets all coordinates that the given cell spans. */
    getAllCoords(cell: T): RowCol[] | undefined;
    /** Gets the number of rows in the given column. */
    getRowCount(col: number): number | undefined;
    /** Gets the number of columns in the given row. */
    getColCount(row: number): number | undefined;
}

/** Represents an cell in a grid, such as a grid cell, that may receive focus. */
interface GridFocusCell extends BaseGridCell {
    /** A unique identifier for the cell. */
    id: SignalLike<string>;
    /** The html element that should receive focus. */
    element: SignalLike<HTMLElement>;
    /** Whether a cell is disabled. */
    disabled: SignalLike<boolean>;
}
/** Represents the required inputs for a grid that contains focusable cells. */
interface GridFocusInputs {
    /** The focus strategy used by the grid. */
    focusMode: SignalLike<'roving' | 'activedescendant'>;
    /** Whether the grid is disabled. */
    disabled: SignalLike<boolean>;
    /** Whether disabled cells in the grid should be focusable. */
    softDisabled: SignalLike<boolean>;
}
/** Dependencies for the `GridFocus` class. */
interface GridFocusDeps<T extends GridFocusCell> {
    /** The `GridData` instance that this focus manager operates on. */
    grid: GridData<T>;
}
/** Controls focus for a 2D grid of cells. */
declare class GridFocus<T extends GridFocusCell> {
    readonly inputs: GridFocusInputs & GridFocusDeps<T>;
    /** The current active cell. */
    readonly activeCell: WritableSignalLike<T | undefined>;
    /** The current active cell coordinates. */
    readonly activeCoords: WritableSignalLike<RowCol>;
    /** Whether the grid active state is empty (no active cell or coordinates). */
    readonly stateEmpty: SignalLike<boolean>;
    /**
     * Whether the grid focus state is stale.
     *
     * A stale state means the active cell or coordinates are no longer valid based on the
     * current grid data, for example if the underlying cells have changed.
     * A stale state should be re-initialized.
     */
    readonly stateStale: SignalLike<boolean>;
    /** The id of the current active cell, for ARIA activedescendant. */
    readonly activeDescendant: SignalLike<string | undefined>;
    /** Whether the grid is in a disabled state. */
    readonly gridDisabled: SignalLike<boolean>;
    /** The tab index for the grid container. */
    readonly gridTabIndex: SignalLike<0 | -1>;
    constructor(inputs: GridFocusInputs & GridFocusDeps<T>);
    /** Returns the tab index for the given grid cell cell. */
    getCellTabIndex(cell: T): -1 | 0;
    /** Returns true if the given cell can be navigated to. */
    isFocusable(cell: T): boolean;
    /** Focuses the given cell. */
    focusCell(cell: T): boolean;
    /** Moves focus to the cell at the given coordinates if it's part of a focusable cell. */
    focusCoordinates(coords: RowCol): boolean;
}

/** A utility type that ensures an object has exactly one key from a given set. */
type ExactlyOneKey<T, K extends keyof T = keyof T> = {
    [P in K]: Record<P, T[P]> & Partial<Record<Exclude<K, P>, never>>;
}[K];
/** Represents a directional change in the grid, either by row or by column. */
type Delta = ExactlyOneKey<{
    row: -1 | 1;
    col: -1 | 1;
}>;
/** The wrapping behavior for keyboard navigation. */
type WrapStrategy = 'continuous' | 'loop' | 'nowrap';
/** Represents an item in a collection, such as a listbox option, than can be navigated to. */
interface GridNavigationCell extends GridFocusCell {
}
/** Represents the required inputs for a collection that has navigable items. */
interface GridNavigationInputs extends GridFocusInputs {
    /** The wrapping behavior for keyboard navigation along the row axis. */
    rowWrap: SignalLike<WrapStrategy>;
    /** The wrapping behavior for keyboard navigation along the column axis. */
    colWrap: SignalLike<WrapStrategy>;
}
/** Dependencies for the `GridNavigation` class. */
interface GridNavigationDeps<T extends GridNavigationCell> {
    /** The `GridData` instance that this navigation manager operates on. */
    grid: GridData<T>;
    /** The `GridFocus` instance that this navigation manager uses to manage focus. */
    gridFocus: GridFocus<T>;
}
/** Controls navigation for a grid of items. */
declare class GridNavigation<T extends GridNavigationCell> {
    readonly inputs: GridNavigationInputs & GridNavigationDeps<T>;
    /** The maximum number of steps to take when searching for the next cell. */
    private _maxSteps;
    constructor(inputs: GridNavigationInputs & GridNavigationDeps<T>);
    /** Navigates to the given item. */
    gotoCell(cell: T): boolean;
    /** Navigates to the given coordinates. */
    gotoCoords(coords: RowCol): boolean;
    /**
     * Gets the coordinates of the next focusable cell in a given direction, without changing focus.
     */
    peek(direction: Delta, fromCoords: RowCol, wrap?: WrapStrategy, allowDisabled?: boolean): RowCol | undefined;
    /**
     * Navigates to the next focusable cell in a given direction.
     */
    advance(direction: Delta): boolean;
    /**
     * Gets the coordinates of the first focusable cell.
     * If a row is not provided, searches the entire grid.
     */
    peekFirst(row?: number, allowDisabled?: boolean): RowCol | undefined;
    /**
     * Navigates to the first focusable cell.
     * If a row is not provided, searches the entire grid.
     */
    first(row?: number): boolean;
    /**
     * Gets the coordinates of the last focusable cell.
     * If a row is not provided, searches the entire grid.
     */
    peekLast(row?: number, allowDisabled?: boolean): RowCol | undefined;
    /**
     * Navigates to the last focusable cell.
     * If a row is not provided, searches the entire grid.
     */
    last(row?: number): boolean;
    /**
     * Finds the next focusable cell in a given direction based on the wrapping behavior.
     */
    private _peekDirectional;
}

/** Represents a cell in a grid that can be selected. */
interface GridSelectionCell extends GridFocusCell {
    /** Whether the cell is selected. */
    selected: WritableSignalLike<boolean>;
    /** Whether the cell is selectable. */
    selectable: SignalLike<boolean>;
}
/** Represents the required inputs for a grid that has selectable cells. */
interface GridSelectionInputs extends GridFocusInputs {
}
/** Dependencies for the `GridSelection` class. */
interface GridSelectionDeps<T extends GridSelectionCell> {
    /** The `GridData` instance that this selection manager operates on. */
    grid: GridData<T>;
    /** The `GridFocus` instance that this selection manager uses to manage focus. */
    gridFocus: GridFocus<T>;
}
/** Controls selection for a grid of items. */
declare class GridSelection<T extends GridSelectionCell> {
    readonly inputs: GridSelectionInputs & GridSelectionDeps<T>;
    /** The list of cells that were changed in the last selection operation. */
    private readonly _undoList;
    constructor(inputs: GridSelectionInputs & GridSelectionDeps<T>);
    /** Reverts the last selection change. */
    undo(): void;
    /** Selects one or more cells in a given range. */
    select(fromCoords: RowCol, toCoords?: RowCol): void;
    /** Deselects one or more cells in a given range. */
    deselect(fromCoords: RowCol, toCoords?: RowCol): void;
    /** Toggles the selection state of one or more cells in a given range. */
    toggle(fromCoords: RowCol, toCoords?: RowCol): void;
    /** Selects all valid cells in the grid. */
    selectAll(): void;
    /** Deselects all valid cells in the grid. */
    deselectAll(): void;
    /** Whether a cell is selctable. */
    isSelectable(cell: T): boolean;
    /** A generator that yields all cells within a given range. */
    _validCells(fromCoords: RowCol, toCoords: RowCol): Generator<T>;
    /**
     * Updates the selection state of cells in a given range and preserves previous changes
     * to a undo list.
     */
    private _updateState;
}

/** The selection operations that can be performed after a navigation operation. */
interface NavOptions {
    /** Toggles the selection state of the active cell. */
    toggle?: boolean;
    /**
     * Toggles the selection state of the active cell, and deselects all other cells if the
     * active cell is selected. If the active cell is the only selected cell, it will be deselected.
     */
    toggleOne?: boolean;
    /** Selects the active cell, preserving the selection state of other cells. */
    select?: boolean;
    /** Deselects all other cells and selects the active cell. */
    selectOne?: boolean;
    /**
     * Moves the selection anchor to the active cell and updates the selection to include all
     * cells between the anchor and the active cell.
     */
    anchor?: boolean;
}
/** A type that represents a cell in a grid, combining all cell-related interfaces. */
type GridCell = BaseGridCell & GridFocusCell & GridNavigationCell & GridSelectionCell;
/** Represents the required inputs for a grid. */
type GridInputs$1<T extends GridCell> = GridDataInputs<T> & GridFocusInputs & GridNavigationInputs & GridSelectionInputs;
/** The main class that orchestrates the grid behaviors. */
declare class Grid<T extends GridCell> {
    readonly inputs: GridInputs$1<T>;
    /** The underlying data structure for the grid. */
    readonly data: GridData<T>;
    /** Controls focus for the grid. */
    readonly focusBehavior: GridFocus<T>;
    /** Controls navigation for the grid. */
    readonly navigationBehavior: GridNavigation<T>;
    /** Controls selection for the grid. */
    readonly selectionBehavior: GridSelection<T>;
    /** The anchor point for range selection, linked to the active coordinates. */
    readonly selectionAnchor: WritableSignalLike<RowCol>;
    /** The cell at the selection anchor. */
    readonly selectionAnchorCell: SignalLike<T | undefined>;
    /** Whether a range selection has settled. */
    readonly selectionStabled: WritableSignalLike<boolean>;
    /** Whether all selectable cells are selected. */
    readonly allSelected: SignalLike<boolean>;
    /** The tab index for the grid container. */
    readonly gridTabIndex: SignalLike<-1 | 0>;
    /** Whether the grid is in a disabled state. */
    readonly gridDisabled: SignalLike<boolean>;
    /** The ID of the active descendant for ARIA `activedescendant` focus management. */
    readonly activeDescendant: SignalLike<string | undefined>;
    constructor(inputs: GridInputs$1<T>);
    /** Gets the 1-based row index of a cell. */
    rowIndex(cell: T): number | undefined;
    /** Gets the 1-based column index of a cell. */
    colIndex(cell: T): number | undefined;
    /** Gets the tab index for a given cell. */
    cellTabIndex(cell: T): -1 | 0;
    /** Navigates to the cell above the currently active cell. */
    up(opts?: NavOptions): boolean;
    /** Navigates to the cell below the currently active cell. */
    down(opts?: NavOptions): boolean;
    /** Navigates to the cell to the left of the currently active cell. */
    left(opts?: NavOptions): boolean;
    /** Navigates to the cell to the right of the currently active cell. */
    right(opts?: NavOptions): boolean;
    /** Navigates to the first focusable cell in the grid. */
    first(opts?: NavOptions): boolean;
    /** Navigates to the first focusable cell in the current row. */
    firstInRow(opts?: NavOptions): boolean;
    /** Navigates to the last focusable cell in the grid. */
    last(opts?: NavOptions): boolean;
    /** Navigates to the last focusable cell in the current row. */
    lastInRow(opts?: NavOptions): boolean;
    /** Selects all cells in the current row. */
    selectRow(): void;
    /** Selects all cells in the current column. */
    selectCol(): void;
    /** Selects the active cell. */
    select(): void;
    /** Deselects the active cell. */
    deselect(): void;
    /**
     * Toggles the selection state of the coordinates of the given cell
     * or the current active coordinates.
     */
    toggle(): void;
    /** Toggles the selection state of the active cell, and deselects all other cells. */
    toggleOne(): void;
    /** Selects all selectable cells in the grid. */
    selectAll(): void;
    /** Deselects all cells in the grid. */
    deselectAll(): void;
    /** Navigates to and focuses the given cell. */
    gotoCell(cell: T, opts?: NavOptions): boolean;
    /** Sets the default active state of the grid. */
    setDefaultState(): boolean;
    /** Resets the active state of the grid if it is empty or stale. */
    resetState(): boolean;
    /** Updates the selection anchor to the given coordinates. */
    private _updateSelectionAnchor;
    /** Updates the selection to include all cells between the anchor and the active cell. */
    private _updateRangeSelection;
    /** Gets the start and end coordinates for a selection range. */
    private _getSelectionCoords;
    /** Executes a navigation operation and applies selection options. */
    private _navigateWithSelection;
}

/** A type that allows lazy resolution of a DOM Element. */
type ElementResolver<T = HTMLElement> = ElementRef<T> | T | undefined | null | ((context: HTMLElement) => T | null | undefined);
/** Evaluates an ElementResolver to return the underlying DOM element, or undefined. */
declare function resolveElement<T = HTMLElement>(resolver: ElementResolver<T>, context: HTMLElement): T | undefined;

/** The inputs for the `GridCellWidgetPattern`. */
interface GridCellWidgetInputs {
    /** Whether the widget is disabled. */
    disabled: SignalLike<boolean>;
    /** The `GridCellPattern` that this widget belongs to. */
    cell: SignalLike<GridCellPattern>;
    /** The html element that should receive focus. */
    element: SignalLike<HTMLElement>;
    /** The type of widget, which determines how it is activated. */
    widgetType: SignalLike<'simple' | 'complex' | 'editable'>;
    /** The element that will receive focus when the widget is activated. */
    focusTarget: SignalLike<ElementResolver<HTMLElement>>;
    /** Callback hook used to notify parents or directives upon interaction. */
    onActivate?: (event: KeyboardEvent | FocusEvent | undefined) => void;
    /** Callback hook used to notify parents or directives upon exit. */
    onDeactivate?: (event: KeyboardEvent | FocusEvent | undefined) => void;
}
/** The UI pattern for a widget inside a grid cell. */
declare class GridCellWidgetPattern {
    readonly inputs: GridCellWidgetInputs;
    /** The html element that should receive focus. */
    readonly element: SignalLike<HTMLElement>;
    /** The element that should receive focus. */
    readonly widgetHost: SignalLike<HTMLElement>;
    /** Whether the widget is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The tab index for the widget. */
    readonly tabIndex: SignalLike<-1 | 0>;
    /** Whether the widget is the active widget in the cell. */
    readonly active: SignalLike<boolean>;
    /** Whether the widget is currently activated. */
    readonly isActivated: WritableSignalLike<boolean>;
    /** The last event that caused the widget to be activated. */
    readonly lastActivateEvent: WritableSignalLike<KeyboardEvent | FocusEvent | undefined>;
    /** The last event that caused the widget to be deactivated. */
    readonly lastDeactivateEvent: WritableSignalLike<KeyboardEvent | FocusEvent | undefined>;
    /** The keyboard event manager for the widget. */
    readonly keydown: SignalLike<KeyboardEventManager<KeyboardEvent>>;
    constructor(inputs: GridCellWidgetInputs);
    /** Handles keydown events for the widget. */
    onKeydown(event: KeyboardEvent): void;
    /** Handles focusin events for the widget. */
    onFocusIn(event: FocusEvent): void;
    /** Handles focusout events for the widget. */
    onFocusOut(event: FocusEvent): void;
    /** Focuses the widget's host element. */
    focus(): void;
    /** Side-effect executed whenever the widget activates. Runs in the write phase. */
    activationEffect(): void;
    /** Side-effect executed whenever the widget deactivates. Runs in the write phase. */
    deactivationEffect(): void;
    /** Activates the widget. */
    activate(event?: KeyboardEvent | FocusEvent): void;
    /** Deactivates the widget and restores focus to the widget's host element. */
    deactivate(event?: KeyboardEvent | FocusEvent): void;
}

/** The inputs for the `GridCellPattern`. */
interface GridCellInputs extends GridCell {
    /** The `GridPattern` that this cell belongs to. */
    grid: SignalLike<GridPattern>;
    /** The `GridRowPattern` that this cell belongs to. */
    row: SignalLike<GridRowPattern>;
    /** The widget pattern contained within this cell, if any. */
    widget: SignalLike<GridCellWidgetPattern | undefined>;
    /** The index of this cell's row within the grid. */
    rowIndex: SignalLike<number | undefined>;
    /** The index of this cell's column within the grid. */
    colIndex: SignalLike<number | undefined>;
    /** A function that returns the cell widget associated with a given element. */
    getWidget: (e: Element | null) => GridCellWidgetPattern | undefined;
}
/** The UI pattern for a grid cell. */
declare class GridCellPattern implements GridCell {
    readonly inputs: GridCellInputs;
    /** A unique identifier for the cell. */
    readonly id: SignalLike<string>;
    /** The html element that should receive focus. */
    readonly element: SignalLike<HTMLElement>;
    /** Whether the cell has focus. */
    readonly isFocused: WritableSignalLike<boolean>;
    /** Whether the cell is selected. */
    readonly selected: WritableSignalLike<boolean>;
    /** Whether the cell is selectable. */
    readonly selectable: SignalLike<boolean>;
    /** Whether a cell is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** The number of rows the cell should span. */
    readonly rowSpan: SignalLike<number>;
    /** The number of columns the cell should span. */
    readonly colSpan: SignalLike<number>;
    /** Whether the cell is active. */
    readonly active: SignalLike<boolean>;
    /** Whether the cell is a selection anchor. */
    readonly anchor: SignalLike<true | undefined>;
    /** The `aria-selected` attribute for the cell. */
    readonly ariaSelected: SignalLike<boolean | undefined>;
    /** The `aria-rowindex` attribute for the cell. */
    readonly ariaRowIndex: SignalLike<number | undefined>;
    /** The `aria-colindex` attribute for the cell. */
    readonly ariaColIndex: SignalLike<number | undefined>;
    /** The internal tab index calculation for the cell. */
    private readonly _tabIndex;
    /** The tab index for the cell. If the cell contains a widget, the cell's tab index is -1. */
    readonly tabIndex: SignalLike<-1 | 0>;
    /** The widget in the cell. */
    readonly widget: SignalLike<GridCellWidgetPattern | undefined>;
    /** Whether the cell or widget inside the cell is activated. */
    readonly isActivated: SignalLike<boolean>;
    constructor(inputs: GridCellInputs);
    /** Handles keydown events for the cell. */
    onKeydown(event: KeyboardEvent): void;
    /** Handles focusin events for the cell. */
    onFocusIn(event: FocusEvent): void;
    /** Handles focusout events for the cell. */
    onFocusOut(event: FocusEvent): void;
    /** Focuses the cell or the active widget. */
    focus(): void;
    /** Gets the tab index for the widget within the cell. */
    widgetTabIndex(): -1 | 0;
}

/** The inputs for the `GridRowPattern`. */
interface GridRowInputs {
    /** The `GridPattern` that this row belongs to. */
    grid: SignalLike<GridPattern>;
    /** The cells that make up this row. */
    cells: SignalLike<GridCellPattern[]>;
    /** The index of this row within the grid. */
    rowIndex: SignalLike<number | undefined>;
}
/** The UI pattern for a grid row. */
declare class GridRowPattern {
    readonly inputs: GridRowInputs;
    /** The index of this row within the grid. */
    rowIndex: SignalLike<number | undefined>;
    constructor(inputs: GridRowInputs);
}

/** Represents the required inputs for the grid pattern. */
interface GridInputs extends Omit<GridInputs$1<GridCellPattern>, 'cells'> {
    /** The html element of the grid. */
    element: SignalLike<HTMLElement>;
    /** The rows that make up the grid. */
    rows: SignalLike<GridRowPattern[]>;
    /** The direction that text is read based on the users locale. */
    textDirection: SignalLike<'rtl' | 'ltr'>;
    /** Whether selection is enabled for the grid. */
    enableSelection: SignalLike<boolean>;
    /** Whether multiple cell in the grid can be selected. */
    multi: SignalLike<boolean>;
    /** The selection strategy used by the grid. */
    selectionMode: SignalLike<'follow' | 'explicit'>;
    /** A function that returns the grid cell associated with a given element. */
    getCell: (e: Element | null) => GridCellPattern | undefined;
}
/** The UI pattern for a grid, handling keyboard navigation, focus, and selection. */
declare class GridPattern {
    readonly inputs: GridInputs;
    /** The underlying grid behavior that this pattern is built on. */
    readonly gridBehavior: Grid<GridCellPattern>;
    /** The cells in the grid. */
    readonly cells: SignalLike<GridCellPattern[][]>;
    /** The tab index for the grid. */
    readonly tabIndex: SignalLike<0 | -1>;
    /** Whether the grid is disabled. */
    readonly disabled: SignalLike<boolean>;
    /** Whether the grid is multi-selectable. */
    readonly multiSelectable: SignalLike<boolean | undefined>;
    /** The ID of the currently active descendant cell. */
    readonly activeDescendant: SignalLike<string | undefined>;
    /** The currently active cell. */
    readonly activeCell: SignalLike<GridCellPattern | undefined>;
    /** The current selection anchor cell. */
    readonly anchorCell: SignalLike<GridCellPattern | undefined>;
    /** Whether to pause grid navigation and give the keyboard control to cell or widget. */
    readonly pauseNavigation: SignalLike<boolean>;
    /** Whether the focus is in the grid. */
    readonly isFocused: WritableSignalLike<boolean>;
    /** Whether the grid has received focus once. */
    readonly hasBeenInteracted: WritableSignalLike<boolean>;
    /** Whether the user is currently dragging to select a range of cells. */
    readonly dragging: WritableSignalLike<boolean>;
    /** The key for navigating to the previous column. */
    readonly prevColKey: SignalLike<"ArrowRight" | "ArrowLeft">;
    /** The key for navigating to the next column. */
    readonly nextColKey: SignalLike<"ArrowRight" | "ArrowLeft">;
    /** The keydown event manager for the grid. */
    readonly keydown: SignalLike<KeyboardEventManager<KeyboardEvent>>;
    /** The click event manager for the grid. */
    readonly clickManager: SignalLike<ClickEventManager<PointerEvent>>;
    /** Indicates maybe the losing focus is caused by row/cell deletion. */
    private readonly _maybeDeletion;
    /** Indicates the losing focus is certainly caused by row/cell deletion. */
    private readonly _deletion;
    /** Whether the grid state is stale and needs to be reconciled. */
    private readonly _stateStale;
    constructor(inputs: GridInputs);
    /** Returns a set of violations */
    validate(): string[];
    /** Handles keydown events on the grid. */
    onKeydown(event: KeyboardEvent): void;
    /** Handles click events on the grid. */
    onClick(event: PointerEvent): void;
    /** Handles focusin events on the grid. */
    onFocusIn(event: FocusEvent): void;
    /** Handles focusout events on the grid. */
    onFocusOut(event: FocusEvent): void;
    /** Sets the default active state of the grid before receiving focus the first time. */
    setDefaultStateEffect(): void;
    /** Resets the active state of the grid if it is empty or stale. */
    resetStateEffect(): void;
    /** Resets the focus to the active cell element or grid element. */
    resetFocusEffect(): void;
    /** Restore focus when a deletion happened. */
    restoreFocusEffect(): void;
    /** Sets focus when active cell changed. */
    focusEffect(): void;
}

export { GridCellPattern, GridCellWidgetPattern, GridPattern, GridRowPattern, resolveElement };
export type { ElementResolver, GridCellInputs, GridCellWidgetInputs, GridInputs, GridRowInputs };
