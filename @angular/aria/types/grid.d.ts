import * as _angular_core from '@angular/core';
import { OnInit, OnDestroy, Signal } from '@angular/core';
import * as _angular_cdk_bidi from '@angular/cdk/bidi';
import { GridCellPattern, GridPattern, GridRowPattern, ElementResolver, GridCellWidgetPattern } from './_grid-chunk.js';
import { SortedCollection } from './_collection-chunk.js';
import './_keyboard-event-manager-chunk.js';
import './_click-event-manager-chunk.js';

/**
 * Represents a cell within a grid row. It is the primary focusable element
 * within the grid. It can be disabled and can have its selection state managed
 * through the `selected` input.
 *
 * ```html
 * <td ngGridCell [disabled]="isDisabled" [(selected)]="isSelected">
 *   Cell Content
 * </td>
 * ```
 *
 * @see [Grid](guide/aria/grid)
 */
declare class GridCell implements OnInit, OnDestroy {
    private readonly _elementRef;
    private readonly _renderer;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** Whether the cell is currently active (focused). */
    readonly active: Signal<boolean>;
    /** The widget contained within this cell, if any. */
    private readonly _widget;
    /** The UI pattern for the widget in this cell. */
    private readonly _widgetPattern;
    /** The parent row. */
    private readonly _row;
    /** Text direction. */
    readonly textDirection: _angular_core.WritableSignal<_angular_cdk_bidi.Direction>;
    /** A unique identifier for the cell. */
    readonly id: _angular_core.InputSignal<string>;
    /** The ARIA role for the cell. */
    readonly role: _angular_core.InputSignal<"gridcell" | "columnheader" | "rowheader">;
    /** The number of rows the cell should span. */
    readonly rowSpan: _angular_core.InputSignal<number>;
    /** The number of columns the cell should span. */
    readonly colSpan: _angular_core.InputSignal<number>;
    /** The index of this cell's row within the grid. */
    readonly rowIndex: _angular_core.InputSignal<number | undefined>;
    /** The index of this cell's column within the grid. */
    readonly colIndex: _angular_core.InputSignal<number | undefined>;
    /** Whether the cell is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the cell is selected. */
    readonly selected: _angular_core.ModelSignal<boolean>;
    /** Whether the cell is selectable. */
    readonly selectable: _angular_core.InputSignal<boolean>;
    /** The tabindex override. */
    readonly tabindex: _angular_core.InputSignal<number | undefined>;
    /**
     * The tabindex value set to the element.
     * If a focus target exists then return -1. Unless an override.
     */
    protected readonly _tabIndex: Signal<number>;
    /** The UI pattern for the grid cell. */
    readonly _pattern: GridCellPattern;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    private _toggleAttribute;
    /** Gets the cell widget pattern for a given element. */
    private _getWidget;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GridCell, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<GridCell, "[ngGridCell]", ["ngGridCell"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; "role": { "alias": "role"; "required": false; "isSignal": true; }; "rowSpan": { "alias": "rowSpan"; "required": false; "isSignal": true; }; "colSpan": { "alias": "colSpan"; "required": false; "isSignal": true; }; "rowIndex": { "alias": "rowIndex"; "required": false; "isSignal": true; }; "colIndex": { "alias": "colIndex"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "selected": { "alias": "selected"; "required": false; "isSignal": true; }; "selectable": { "alias": "selectable"; "required": false; "isSignal": true; }; "tabindex": { "alias": "tabindex"; "required": false; "isSignal": true; }; }, { "selected": "selectedChange"; }, ["_widget"], never, true, never>;
}

/**
 * Represents a row within a grid. It is a container for `ngGridCell` directives.
 *
 * ```html
 * <tr ngGridRow>
 *   <!-- ... cells ... -->
 * </tr>
 * ```
 *
 * @see [Grid](guide/aria/grid)
 */
declare class GridRow implements OnInit, OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The collection of cells in this row. */
    readonly _collection: SortedCollection<GridCell>;
    /** The UI patterns for the cells in this row. */
    private readonly _cellPatterns;
    /** The parent grid. */
    private readonly _grid;
    /** The parent grid UI pattern. */
    readonly _gridPattern: Signal<GridPattern>;
    /** The index of this row within the grid. */
    readonly rowIndex: _angular_core.InputSignal<number | undefined>;
    /** The UI pattern for the grid row. */
    readonly _pattern: GridRowPattern;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GridRow, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<GridRow, "[ngGridRow]", ["ngGridRow"], { "rowIndex": { "alias": "rowIndex"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * The container for a grid. It provides keyboard navigation and focus management for the grid's
 * rows and cells. It manages the overall behavior of the grid, including focus
 * wrapping, selection, and disabled states.
 *
 * ```html
 * <table ngGrid [multi]="true" [enableSelection]="true">
 *   @for (row of gridData; track row) {
 *     <tr ngGridRow>
 *       @for (cell of row; track cell) {
 *         <td ngGridCell [disabled]="cell.disabled">
 *           {{cell.value}}
 *         </td>
 *       }
 *     </tr>
 *   }
 * </table>
 * ```
 *
 * @see [Grid](guide/aria/grid)
 */
declare class Grid implements OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The collection of rows in the grid. */
    readonly _collection: SortedCollection<GridRow>;
    /** The UI patterns for the rows in the grid. */
    private readonly _rowPatterns;
    /** Text direction. */
    readonly textDirection: _angular_core.WritableSignal<_angular_cdk_bidi.Direction>;
    /** Whether selection is enabled for the grid. */
    readonly enableSelection: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the grid is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Whether to allow disabled items to receive focus. When `true`, disabled items are
     * focusable but not interactive. When `false`, disabled items are skipped during navigation.
     */
    readonly softDisabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * The focus strategy used by the grid.
     * - `roving`: Focus is moved to the active cell using `tabindex`.
     * - `activedescendant`: Focus remains on the grid container, and `aria-activedescendant` is used to indicate the active cell.
     */
    readonly focusMode: _angular_core.InputSignal<"roving" | "activedescendant">;
    /**
     * The wrapping behavior for keyboard navigation along the row axis.
     * - `continuous`: Navigation wraps from the last row to the first, and vice-versa.
     * - `loop`: Navigation wraps within the current row.
     * - `nowrap`: Navigation stops at the first/last item in the row.
     */
    readonly rowWrap: _angular_core.InputSignal<"continuous" | "loop" | "nowrap">;
    /**
     * The wrapping behavior for keyboard navigation along the column axis.
     * - `continuous`: Navigation wraps from the last column to the first, and vice-versa.
     * - `loop`: Navigation wraps within the current column.
     * - `nowrap`: Navigation stops at the first/last item in the column.
     */
    readonly colWrap: _angular_core.InputSignal<"continuous" | "loop" | "nowrap">;
    /** Whether multiple cells in the grid can be selected. */
    readonly multi: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * The selection strategy used by the grid.
     * - `follow`: The focused cell is automatically selected.
     * - `explicit`: Cells are selected explicitly by the user (e.g., via click or spacebar).
     */
    readonly selectionMode: _angular_core.InputSignal<"follow" | "explicit">;
    /** The tabindex of the grid. */
    readonly tabIndex: _angular_core.InputSignalWithTransform<number | undefined, string | number | undefined>;
    /** The UI pattern for the grid. */
    readonly _pattern: GridPattern;
    /** The ID of the active descendant in the grid. */
    readonly activeDescendant: Signal<string | undefined>;
    constructor();
    ngOnDestroy(): void;
    /** Scrolls the active cell into view. */
    scrollActiveCellIntoView(options?: ScrollIntoViewOptions): void;
    /** Gets the cell pattern for a given element. */
    private _getCell;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Grid, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<Grid, "[ngGrid]", ["ngGrid"], { "enableSelection": { "alias": "enableSelection"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "softDisabled": { "alias": "softDisabled"; "required": false; "isSignal": true; }; "focusMode": { "alias": "focusMode"; "required": false; "isSignal": true; }; "rowWrap": { "alias": "rowWrap"; "required": false; "isSignal": true; }; "colWrap": { "alias": "colWrap"; "required": false; "isSignal": true; }; "multi": { "alias": "multi"; "required": false; "isSignal": true; }; "selectionMode": { "alias": "selectionMode"; "required": false; "isSignal": true; }; "tabIndex": { "alias": "tabindex"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Represents an interactive element inside a `GridCell`. It allows for pausing grid navigation to
 * interact with the widget.
 *
 * When the user interacts with the widget (e.g., by typing in an input or opening a menu), grid
 * navigation is temporarily suspended to allow the widget to handle keyboard
 * events.
 *
 * ```html
 * <td ngGridCell>
 *   <button ngGridCellWidget>Click Me</button>
 * </td>
 * ```
 *
 * @see [Grid](guide/aria/grid)
 */
declare class GridCellWidget {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** Whether the widget is currently active (focused). */
    readonly active: Signal<boolean>;
    /** The parent cell. */
    private readonly _cell;
    /** A unique identifier for the widget. */
    readonly id: _angular_core.InputSignal<string>;
    /** The type of widget, which determines how it is activated. */
    readonly widgetType: _angular_core.InputSignal<"simple" | "complex" | "editable">;
    /** Whether the widget is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The target that will receive focus instead of the widget. */
    readonly focusTarget: _angular_core.InputSignal<ElementResolver<HTMLElement>>;
    /** Emits when the widget is activated. */
    readonly activated: _angular_core.OutputEmitterRef<KeyboardEvent | FocusEvent | undefined>;
    /** Emits when the widget is deactivated. */
    readonly deactivated: _angular_core.OutputEmitterRef<KeyboardEvent | FocusEvent | undefined>;
    /** The tabindex override. */
    readonly tabindex: _angular_core.InputSignal<number | undefined>;
    /**
     * The tabindex value set to the element.
     * If a focus target exists then return -1. Unless an override.
     */
    protected readonly _tabIndex: Signal<number>;
    /** The UI pattern for the grid cell widget. */
    readonly _pattern: GridCellWidgetPattern;
    /** Whether the widget is activated. */
    get isActivated(): Signal<boolean>;
    constructor();
    /** Activates the widget. */
    activate(): void;
    /** Deactivates the widget. */
    deactivate(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GridCellWidget, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<GridCellWidget, "[ngGridCellWidget]", ["ngGridCellWidget"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; "widgetType": { "alias": "widgetType"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "focusTarget": { "alias": "focusTarget"; "required": false; "isSignal": true; }; "tabindex": { "alias": "tabindex"; "required": false; "isSignal": true; }; }, { "activated": "activated"; "deactivated": "deactivated"; }, never, never, true, never>;
}

export { Grid, GridCell, GridCellWidget, GridRow };
