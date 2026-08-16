import { computed, signal, linkedSignal, KeyboardEventManager, Modifier } from './_violations-chunk.mjs';
import { ClickEventManager } from './_click-event-manager-chunk.mjs';
import { untracked } from '@angular/core/primitives/signals';
import { ElementRef } from '@angular/core';

class GridData {
  inputs;
  cells;
  maxRowCount = computed(() => Math.max(...this._rowCountByCol().values(), 0));
  maxColCount = computed(() => Math.max(...this._colCountsByRow().values(), 0));
  _coordsMap = computed(() => {
    const coordsMap = new Map();
    const visitedCoords = new Set();
    for (let rowIndex = 0; rowIndex < this.cells().length; rowIndex++) {
      let colIndex = 0;
      const row = this.cells()[rowIndex];
      for (const cell of row) {
        while (visitedCoords.has(`${rowIndex}:${colIndex}`)) {
          colIndex++;
        }
        const rowspan = cell.rowSpan();
        const colspan = cell.colSpan();
        const spanCoords = [];
        for (let rowOffset = 0; rowOffset < rowspan; rowOffset++) {
          const row = rowIndex + rowOffset;
          for (let colOffset = 0; colOffset < colspan; colOffset++) {
            const col = colIndex + colOffset;
            visitedCoords.add(`${row}:${col}`);
            spanCoords.push({
              row,
              col
            });
          }
        }
        coordsMap.set(cell, {
          coords: spanCoords[0],
          spanCoords
        });
        colIndex += colspan;
      }
    }
    return coordsMap;
  });
  _cellMap = computed(() => {
    const cellMap = new Map();
    for (const [cell, {
      spanCoords
    }] of this._coordsMap().entries()) {
      for (const {
        row,
        col
      } of spanCoords) {
        cellMap.set(`${row}:${col}`, cell);
      }
    }
    return cellMap;
  });
  _colCountsByRow = computed(() => {
    const colCountByRow = new Map();
    for (const [_, {
      spanCoords
    }] of this._coordsMap().entries()) {
      for (const {
        row,
        col
      } of spanCoords) {
        const colCount = colCountByRow.get(row);
        const newColCount = col + 1;
        if (colCount === undefined || colCount < newColCount) {
          colCountByRow.set(row, newColCount);
        }
      }
    }
    return colCountByRow;
  });
  _rowCountByCol = computed(() => {
    const rowCountByCol = new Map();
    for (const [_, {
      spanCoords
    }] of this._coordsMap().entries()) {
      for (const {
        row,
        col
      } of spanCoords) {
        const rowCount = rowCountByCol.get(col);
        const newRowCount = row + 1;
        if (rowCount === undefined || rowCount < newRowCount) {
          rowCountByCol.set(col, newRowCount);
        }
      }
    }
    return rowCountByCol;
  });
  constructor(inputs) {
    this.inputs = inputs;
    this.cells = this.inputs.cells;
  }
  hasCell(cell) {
    return this._coordsMap().has(cell);
  }
  getCell(rowCol) {
    return this._cellMap().get(`${rowCol.row}:${rowCol.col}`);
  }
  getCoords(cell) {
    return this._coordsMap().get(cell)?.coords;
  }
  getAllCoords(cell) {
    return this._coordsMap().get(cell)?.spanCoords;
  }
  getRowCount(col) {
    return this._rowCountByCol().get(col);
  }
  getColCount(row) {
    return this._colCountsByRow().get(row);
  }
}

class GridFocus {
  inputs;
  activeCell = signal(undefined);
  activeCoords = signal({
    row: -1,
    col: -1
  });
  stateEmpty = computed(() => this.activeCell() === undefined || this.activeCoords().row === -1 && this.activeCoords().col === -1);
  stateStale = computed(() => {
    if (this.stateEmpty()) {
      return true;
    }
    const activeCell = this.activeCell();
    const activeCellCoords = this.inputs.grid.getCoords(activeCell);
    const activeCoords = this.activeCoords();
    const activeCoordsCell = this.inputs.grid.getCell(activeCoords);
    const activeCellNotValid = activeCellCoords === undefined;
    const activeCellMismatch = activeCell !== activeCoordsCell;
    const activeCellNotFocusable = !this.isFocusable(activeCell);
    return activeCellNotValid || activeCellMismatch || activeCellNotFocusable;
  });
  activeDescendant = computed(() => {
    if (this.gridDisabled() || this.inputs.focusMode() === 'roving') {
      return undefined;
    }
    const currentActiveCell = this.activeCell();
    return currentActiveCell ? currentActiveCell.id() : undefined;
  });
  gridDisabled = computed(() => {
    if (this.inputs.disabled()) {
      return true;
    }
    const gridCells = this.inputs.grid.cells();
    return gridCells.length === 0 || gridCells.every(row => row.every(cell => cell.disabled()));
  });
  gridTabIndex = computed(() => {
    if (this.gridDisabled()) {
      return 0;
    }
    return this.inputs.focusMode() === 'activedescendant' ? 0 : -1;
  });
  constructor(inputs) {
    this.inputs = inputs;
  }
  getCellTabIndex(cell) {
    if (this.gridDisabled()) {
      return -1;
    }
    if (this.inputs.focusMode() === 'activedescendant') {
      return -1;
    }
    return this.activeCell() === cell ? 0 : -1;
  }
  isFocusable(cell) {
    return this.inputs.grid.hasCell(cell) && (!cell.disabled() || this.inputs.softDisabled());
  }
  focusCell(cell) {
    if (this.gridDisabled()) {
      return false;
    }
    if (!this.isFocusable(cell)) {
      return false;
    }
    if (this.inputs.grid.getCoords(cell) === undefined) {
      return false;
    }
    this.activeCoords.set(this.inputs.grid.getCoords(cell));
    this.activeCell.set(cell);
    return true;
  }
  focusCoordinates(coords) {
    if (this.gridDisabled()) {
      return false;
    }
    const cell = this.inputs.grid.getCell(coords);
    if (!cell || !this.isFocusable(cell)) {
      return false;
    }
    if (this.inputs.grid.getCell(coords) === undefined) {
      return false;
    }
    this.activeCoords.set(coords);
    this.activeCell.set(this.inputs.grid.getCell(coords));
    return true;
  }
}

const direction = {
  Up: {
    row: -1
  },
  Down: {
    row: 1
  },
  Left: {
    col: -1
  },
  Right: {
    col: 1
  }
};
class GridNavigation {
  inputs;
  _maxSteps = computed(() => this.inputs.grid.maxRowCount() * this.inputs.grid.maxColCount());
  constructor(inputs) {
    this.inputs = inputs;
  }
  gotoCell(cell) {
    return this.inputs.gridFocus.focusCell(cell);
  }
  gotoCoords(coords) {
    return this.inputs.gridFocus.focusCoordinates(coords);
  }
  peek(direction, fromCoords, wrap, allowDisabled) {
    wrap = wrap ?? (direction.row !== undefined ? this.inputs.rowWrap() : this.inputs.colWrap());
    return this._peekDirectional(direction, fromCoords, wrap, allowDisabled);
  }
  advance(direction) {
    const nextCoords = this.peek(direction, this.inputs.gridFocus.activeCoords());
    return !!nextCoords && this.gotoCoords(nextCoords);
  }
  peekFirst(row, allowDisabled) {
    const fromCoords = {
      row: row ?? 0,
      col: -1
    };
    return row === undefined ? this._peekDirectional(direction.Right, fromCoords, 'continuous', allowDisabled) : this._peekDirectional(direction.Right, fromCoords, 'nowrap', allowDisabled);
  }
  first(row) {
    const nextCoords = this.peekFirst(row);
    return !!nextCoords && this.gotoCoords(nextCoords);
  }
  peekLast(row, allowDisabled) {
    const fromCoords = {
      row: row ?? this.inputs.grid.maxRowCount() - 1,
      col: this.inputs.grid.maxColCount()
    };
    return row === undefined ? this._peekDirectional(direction.Left, fromCoords, 'continuous', allowDisabled) : this._peekDirectional(direction.Left, fromCoords, 'nowrap', allowDisabled);
  }
  last(row) {
    const nextCoords = this.peekLast(row);
    return !!nextCoords && this.gotoCoords(nextCoords);
  }
  _peekDirectional(delta, fromCoords, wrap, allowDisabled = false) {
    if (this.inputs.gridFocus.gridDisabled()) return undefined;
    const fromCell = this.inputs.grid.getCell(fromCoords);
    const maxRowCount = this.inputs.grid.maxRowCount();
    const maxColCount = this.inputs.grid.maxColCount();
    const rowDelta = delta.row ?? 0;
    const colDelta = delta.col ?? 0;
    let nextCoords = {
      ...fromCoords
    };
    for (let step = 0; step < this._maxSteps(); step++) {
      const isWrapping = nextCoords.col + colDelta < 0 || nextCoords.col + colDelta >= maxColCount || nextCoords.row + rowDelta < 0 || nextCoords.row + rowDelta >= maxRowCount;
      if (wrap === 'nowrap' && isWrapping) return undefined;
      if (wrap === 'continuous') {
        const generalDelta = delta.row ?? delta.col;
        const rowStep = isWrapping ? generalDelta : rowDelta;
        const colStep = isWrapping ? generalDelta : colDelta;
        const bothWrapping = nextCoords.row + rowStep >= maxRowCount && nextCoords.col + colStep >= maxColCount || nextCoords.row + rowStep < 0 && nextCoords.col + colStep < 0;
        if (bothWrapping) return undefined;
        nextCoords = {
          row: (nextCoords.row + rowStep + maxRowCount) % maxRowCount,
          col: (nextCoords.col + colStep + maxColCount) % maxColCount
        };
      }
      if (wrap === 'loop') {
        nextCoords = {
          row: (nextCoords.row + rowDelta + maxRowCount) % maxRowCount,
          col: (nextCoords.col + colDelta + maxColCount) % maxColCount
        };
      }
      if (wrap === 'nowrap') {
        nextCoords = {
          row: nextCoords.row + rowDelta,
          col: nextCoords.col + colDelta
        };
      }
      if (nextCoords.row === fromCoords.row && nextCoords.col === fromCoords.col) {
        return undefined;
      }
      const nextCell = this.inputs.grid.getCell(nextCoords);
      if (nextCell !== undefined && nextCell !== fromCell && (allowDisabled || this.inputs.gridFocus.isFocusable(nextCell))) {
        return nextCoords;
      }
    }
    return undefined;
  }
}

class GridSelection {
  inputs;
  _undoList = signal([]);
  constructor(inputs) {
    this.inputs = inputs;
  }
  undo() {
    for (const [cell, oldState] of this._undoList()) {
      cell.selected.set(oldState);
    }
    this._undoList.set([]);
  }
  select(fromCoords, toCoords) {
    this._updateState(fromCoords, toCoords ?? fromCoords, () => true);
  }
  deselect(fromCoords, toCoords) {
    this._updateState(fromCoords, toCoords ?? fromCoords, () => false);
  }
  toggle(fromCoords, toCoords) {
    this._updateState(fromCoords, toCoords ?? fromCoords, oldState => !oldState);
  }
  selectAll() {
    this._updateState({
      row: 0,
      col: 0
    }, {
      row: this.inputs.grid.maxRowCount(),
      col: this.inputs.grid.maxColCount()
    }, () => true);
  }
  deselectAll() {
    this._updateState({
      row: 0,
      col: 0
    }, {
      row: this.inputs.grid.maxRowCount(),
      col: this.inputs.grid.maxColCount()
    }, () => false);
  }
  isSelectable(cell) {
    return cell.selectable() && !cell.disabled();
  }
  *_validCells(fromCoords, toCoords) {
    const startRow = Math.min(fromCoords.row, toCoords.row);
    const startCol = Math.min(fromCoords.col, toCoords.col);
    const endRow = Math.max(fromCoords.row, toCoords.row);
    const endCol = Math.max(fromCoords.col, toCoords.col);
    const visited = new Set();
    for (let row = startRow; row < endRow + 1; row++) {
      for (let col = startCol; col < endCol + 1; col++) {
        const cell = this.inputs.grid.getCell({
          row,
          col
        });
        if (cell === undefined) continue;
        if (!this.isSelectable(cell)) continue;
        if (visited.has(cell)) continue;
        visited.add(cell);
        yield cell;
      }
    }
  }
  _updateState(fromCoords, toCoords, stateFn) {
    const undoList = [];
    for (const cell of this._validCells(fromCoords, toCoords)) {
      const oldState = cell.selected();
      undoList.push([cell, oldState]);
      cell.selected.set(stateFn(oldState));
    }
    this._undoList.set(undoList);
  }
}

class Grid {
  inputs;
  data;
  focusBehavior;
  navigationBehavior;
  selectionBehavior;
  selectionAnchor = linkedSignal(() => this.focusBehavior.activeCoords());
  selectionAnchorCell = computed(() => this.data.getCell(this.selectionAnchor()));
  selectionStabled = signal(true);
  allSelected = computed(() => this.data.cells().flat().filter(c => this.selectionBehavior.isSelectable(c)).every(c => c.selected()));
  gridTabIndex = () => this.focusBehavior.gridTabIndex();
  gridDisabled = () => this.focusBehavior.gridDisabled();
  activeDescendant = () => this.focusBehavior.activeDescendant();
  constructor(inputs) {
    this.inputs = inputs;
    this.data = new GridData(inputs);
    this.focusBehavior = new GridFocus({
      ...inputs,
      grid: this.data
    });
    this.navigationBehavior = new GridNavigation({
      ...inputs,
      grid: this.data,
      gridFocus: this.focusBehavior
    });
    this.selectionBehavior = new GridSelection({
      ...inputs,
      grid: this.data,
      gridFocus: this.focusBehavior
    });
  }
  rowIndex(cell) {
    const index = this.data.getCoords(cell)?.row;
    return index !== undefined ? index + 1 : undefined;
  }
  colIndex(cell) {
    const index = this.data.getCoords(cell)?.col;
    return index !== undefined ? index + 1 : undefined;
  }
  cellTabIndex(cell) {
    return this.focusBehavior.getCellTabIndex(cell);
  }
  up(opts = {}) {
    return this._navigateWithSelection(() => opts.anchor ? this._updateSelectionAnchor(() => this.navigationBehavior.peek(direction.Up, this.selectionAnchor(), 'nowrap', true)) : this.navigationBehavior.advance(direction.Up), opts);
  }
  down(opts = {}) {
    return this._navigateWithSelection(() => opts.anchor ? this._updateSelectionAnchor(() => this.navigationBehavior.peek(direction.Down, this.selectionAnchor(), 'nowrap', true)) : this.navigationBehavior.advance(direction.Down), opts);
  }
  left(opts = {}) {
    return this._navigateWithSelection(() => opts.anchor ? this._updateSelectionAnchor(() => this.navigationBehavior.peek(direction.Left, this.selectionAnchor(), 'nowrap', true)) : this.navigationBehavior.advance(direction.Left), opts);
  }
  right(opts = {}) {
    return this._navigateWithSelection(() => opts.anchor ? this._updateSelectionAnchor(() => this.navigationBehavior.peek(direction.Right, this.selectionAnchor(), 'nowrap', true)) : this.navigationBehavior.advance(direction.Right), opts);
  }
  first(opts = {}) {
    return this._navigateWithSelection(() => opts.anchor ? this._updateSelectionAnchor(() => this.navigationBehavior.peekFirst(undefined, true)) : this.navigationBehavior.first(), opts);
  }
  firstInRow(opts = {}) {
    const row = this.focusBehavior.activeCoords().row;
    return this._navigateWithSelection(() => opts.anchor ? this._updateSelectionAnchor(() => this.navigationBehavior.peekFirst(row, true)) : this.navigationBehavior.first(row), opts);
  }
  last(opts = {}) {
    return this._navigateWithSelection(() => opts.anchor ? this._updateSelectionAnchor(() => this.navigationBehavior.peekLast(undefined, true)) : this.navigationBehavior.last(), opts);
  }
  lastInRow(opts = {}) {
    const row = this.focusBehavior.activeCoords().row;
    return this._navigateWithSelection(() => opts.anchor ? this._updateSelectionAnchor(() => this.navigationBehavior.peekLast(row, true)) : this.navigationBehavior.last(row), opts);
  }
  selectRow() {
    const row = this.focusBehavior.activeCoords().row;
    this.selectionBehavior.deselectAll();
    this.selectionBehavior.select({
      row,
      col: 0
    }, {
      row,
      col: this.data.maxColCount()
    });
  }
  selectCol() {
    const col = this.focusBehavior.activeCoords().col;
    this.selectionBehavior.deselectAll();
    this.selectionBehavior.select({
      row: 0,
      col
    }, {
      row: this.data.maxRowCount(),
      col
    });
  }
  select() {
    this.selectionBehavior.select(this.focusBehavior.activeCoords());
  }
  deselect() {
    this.selectionBehavior.deselect(this.focusBehavior.activeCoords());
  }
  toggle() {
    this.selectionBehavior.toggle(this.focusBehavior.activeCoords());
  }
  toggleOne() {
    const selected = !!this.focusBehavior.activeCell()?.selected();
    if (selected) {
      this.deselect();
      return;
    }
    this.deselectAll();
    this.select();
  }
  selectAll() {
    this.selectionBehavior.selectAll();
  }
  deselectAll() {
    this.selectionBehavior.deselectAll();
  }
  gotoCell(cell, opts = {}) {
    return this._navigateWithSelection(() => opts.anchor ? this._updateSelectionAnchor(() => this.data.getCoords(cell)) : this.navigationBehavior.gotoCell(cell), opts);
  }
  setDefaultState() {
    const focusableSelectedCell = this.data.cells().flat().filter(c => this.focusBehavior.isFocusable(c)).find(c => c.selected());
    if (focusableSelectedCell !== undefined) {
      this.focusBehavior.focusCell(focusableSelectedCell);
      return true;
    }
    const firstFocusableCoords = this.navigationBehavior.peekFirst();
    if (firstFocusableCoords !== undefined) {
      return this.focusBehavior.focusCoordinates(firstFocusableCoords);
    }
    return false;
  }
  resetState() {
    if (this.focusBehavior.stateEmpty()) {
      return this.setDefaultState();
    }
    if (this.focusBehavior.stateStale()) {
      const activeCell = this.focusBehavior.activeCell();
      const activeCoords = this.focusBehavior.activeCoords();
      if (activeCell && this.focusBehavior.focusCell(activeCell)) {
        return true;
      }
      if (this.focusBehavior.focusCoordinates(activeCoords)) {
        return true;
      }
      const maxRow = this.data.maxRowCount() - 1;
      const targetRow = Math.min(activeCoords.row, maxRow);
      if (targetRow >= 0) {
        if (this.focusBehavior.focusCoordinates({
          row: targetRow,
          col: activeCoords.col
        })) {
          return true;
        }
        const colCount = this.data.getColCount(targetRow);
        if (colCount !== undefined) {
          const targetCol = Math.min(activeCoords.col, colCount - 1);
          if (targetCol >= 0 && this.focusBehavior.focusCoordinates({
            row: targetRow,
            col: targetCol
          })) {
            return true;
          }
        }
        const firstInRow = this.navigationBehavior.peekFirst(targetRow);
        if (firstInRow !== undefined && this.focusBehavior.focusCoordinates(firstInRow)) {
          return true;
        }
      }
      const firstAvailable = this.navigationBehavior.peekFirst();
      if (firstAvailable !== undefined && this.focusBehavior.focusCoordinates(firstAvailable)) {
        return true;
      }
      this.focusBehavior.activeCell.set(undefined);
      this.focusBehavior.activeCoords.set({
        row: -1,
        col: -1
      });
    }
    return false;
  }
  _updateSelectionAnchor(peekFn) {
    const coords = peekFn();
    const success = coords !== undefined;
    if (!success) return false;
    this.selectionAnchor.set(coords);
    return success;
  }
  _updateRangeSelection() {
    if (!this.selectionStabled()) {
      this.selectionBehavior.undo();
    }
    this.selectionBehavior.select(...this._getSelectionCoords(this.focusBehavior.activeCoords(), this.selectionAnchor()));
  }
  _getSelectionCoords(startCoords, endCoords) {
    const startCell = this.data.getCell(startCoords);
    const endCell = this.data.getCell(endCoords);
    const allCoords = [...this.data.getAllCoords(startCell), ...this.data.getAllCoords(endCell)];
    const allRows = allCoords.map(c => c.row);
    const allCols = allCoords.map(c => c.col);
    const fromCoords = {
      row: Math.min(...allRows),
      col: Math.min(...allCols)
    };
    const toCoords = {
      row: Math.max(...allRows),
      col: Math.max(...allCols)
    };
    return [fromCoords, toCoords];
  }
  _navigateWithSelection(op, opts = {}) {
    const success = op();
    if (!success) return false;
    if (opts.anchor) {
      this._updateRangeSelection();
      this.selectionStabled.set(false);
      return success;
    }
    this.selectionStabled.set(true);
    if (opts.select) {
      this.select();
      return success;
    }
    if (opts.selectOne) {
      this.deselectAll();
      this.select();
      return success;
    }
    if (opts.toggle) {
      this.toggle();
      return success;
    }
    if (opts.toggleOne) {
      const selected = !!this.focusBehavior.activeCell()?.selected();
      this.deselectAll();
      if (!selected) {
        this.select();
      }
      return success;
    }
    return success;
  }
}

class GridPattern {
  inputs;
  gridBehavior;
  cells = computed(() => this.gridBehavior.data.cells());
  tabIndex = computed(() => this.gridBehavior.gridTabIndex());
  disabled = computed(() => this.gridBehavior.gridDisabled());
  multiSelectable = computed(() => this.inputs.enableSelection() ? this.inputs.multi() : undefined);
  activeDescendant = computed(() => this.gridBehavior.activeDescendant());
  activeCell = computed(() => this.gridBehavior.focusBehavior.activeCell());
  anchorCell = computed(() => this.multiSelectable() ? this.gridBehavior.selectionAnchorCell() : undefined);
  pauseNavigation = computed(() => this.gridBehavior.data.cells().flat().reduce((res, c) => res || c.isActivated(), false));
  isFocused = signal(false);
  hasBeenInteracted = signal(false);
  dragging = signal(false);
  prevColKey = computed(() => this.inputs.textDirection() === 'rtl' ? 'ArrowRight' : 'ArrowLeft');
  nextColKey = computed(() => this.inputs.textDirection() === 'rtl' ? 'ArrowLeft' : 'ArrowRight');
  keydown = computed(() => {
    const manager = new KeyboardEventManager();
    if (this.pauseNavigation()) {
      return manager;
    }
    const opts = {
      selectOne: this.inputs.enableSelection() && this.inputs.selectionMode() === 'follow'
    };
    manager.on('ArrowUp', () => this.gridBehavior.up(opts), {
      ignoreRepeat: false
    }).on('ArrowDown', () => this.gridBehavior.down(opts), {
      ignoreRepeat: false
    }).on(this.prevColKey(), () => this.gridBehavior.left(opts), {
      ignoreRepeat: false
    }).on(this.nextColKey(), () => this.gridBehavior.right(opts), {
      ignoreRepeat: false
    }).on('Home', () => this.gridBehavior.firstInRow(opts)).on('End', () => this.gridBehavior.lastInRow(opts)).on([Modifier.Ctrl], 'Home', () => this.gridBehavior.first(opts)).on([Modifier.Ctrl], 'End', () => this.gridBehavior.last(opts));
    if (this.inputs.enableSelection() && this.inputs.selectionMode() === 'explicit') {
      manager.on(/Enter| /, () => this.inputs.multi() ? this.gridBehavior.toggle() : this.gridBehavior.toggleOne());
    }
    if (this.inputs.enableSelection() && this.inputs.multi()) {
      manager.on([Modifier.Ctrl, Modifier.Meta], 'A', () => {
        if (this.gridBehavior.allSelected()) {
          this.gridBehavior.deselectAll();
        } else {
          this.gridBehavior.selectAll();
        }
      }).on([Modifier.Shift], ' ', () => this.gridBehavior.selectRow()).on([Modifier.Ctrl, Modifier.Meta], ' ', () => this.gridBehavior.selectCol());
    }
    return manager;
  });
  clickManager = computed(() => {
    const manager = new ClickEventManager();
    if (!this.inputs.enableSelection()) {
      manager.on(e => {
        const cell = this.inputs.getCell(e.target);
        if (!cell || !this.gridBehavior.focusBehavior.isFocusable(cell)) return;
        this.gridBehavior.gotoCell(cell);
      });
    }
    if (this.inputs.enableSelection()) {
      manager.on(e => {
        const cell = this.inputs.getCell(e.target);
        if (!cell || !this.gridBehavior.focusBehavior.isFocusable(cell)) return;
        this.gridBehavior.gotoCell(cell, {
          selectOne: this.inputs.selectionMode() === 'follow',
          toggleOne: this.inputs.selectionMode() === 'explicit' && !this.inputs.multi(),
          toggle: this.inputs.selectionMode() === 'explicit' && this.inputs.multi()
        });
      });
      if (this.inputs.multi()) {
        manager.on([Modifier.Ctrl, Modifier.Meta], e => {
          const cell = this.inputs.getCell(e.target);
          if (!cell || !this.gridBehavior.focusBehavior.isFocusable(cell)) return;
          this.gridBehavior.gotoCell(cell, {
            toggle: true
          });
        });
      }
    }
    return manager;
  });
  _maybeDeletion = signal(false);
  _deletion = signal(false);
  _stateStale = signal(false);
  constructor(inputs) {
    this.inputs = inputs;
    this.gridBehavior = new Grid({
      ...inputs,
      cells: computed(() => this.inputs.rows().map(row => row.inputs.cells()))
    });
  }
  validate() {
    const violations = [];
    const rows = this.inputs.rows();
    for (const row of rows) {
      if (row.inputs.cells().length === 0) {
        violations.push('ngGridRow must contain at least one ngGridCell.');
      }
    }
    return violations;
  }
  onKeydown(event) {
    if (this.disabled()) return;
    this.hasBeenInteracted.set(true);
    this.activeCell()?.onKeydown(event);
    this.keydown().handle(event);
  }
  onClick(event) {
    if (this.disabled()) return;
    this.hasBeenInteracted.set(true);
    this.clickManager().handle(event);
  }
  onFocusIn(event) {
    this.isFocused.set(true);
    this.hasBeenInteracted.set(true);
    const cell = this.inputs.getCell(event.target);
    if (!cell || !this.gridBehavior.focusBehavior.isFocusable(cell)) return;
    cell.onFocusIn(event);
    if (cell !== this.activeCell()) {
      this.gridBehavior.gotoCell(cell);
    }
  }
  onFocusOut(event) {
    const blurTarget = event.target;
    const cell = this.inputs.getCell(blurTarget);
    cell?.onFocusOut(event);
    const focusTarget = event.relatedTarget;
    if (this.inputs.element().contains(focusTarget)) return;
    if (focusTarget === null) {
      this._maybeDeletion.set(true);
    }
    this.isFocused.set(false);
  }
  setDefaultStateEffect() {
    if (this.hasBeenInteracted()) return;
    this.gridBehavior.setDefaultState();
  }
  resetStateEffect() {
    const hasReset = this.gridBehavior.resetState();
    if (hasReset) {
      if (this._maybeDeletion()) {
        this._deletion.set(true);
      } else {
        this._stateStale.set(true);
      }
    }
    this._maybeDeletion.set(false);
  }
  resetFocusEffect() {
    const stateStale = this._stateStale();
    if (!stateStale) return;
    const isFocused = untracked(() => this.isFocused());
    const isRoving = untracked(() => this.inputs.focusMode() === 'roving');
    const activeCell = untracked(() => this.activeCell());
    if (isRoving && activeCell !== undefined && isFocused) {
      if (!activeCell.isFocused()) {
        activeCell.focus();
      }
    }
    this._stateStale.set(false);
  }
  restoreFocusEffect() {
    const deletion = this._deletion();
    if (!deletion) return;
    const isRoving = untracked(() => this.inputs.focusMode() === 'roving');
    const activeCell = untracked(() => this.activeCell());
    if (isRoving && activeCell !== undefined) {
      if (!activeCell.isFocused()) {
        activeCell.focus();
      }
    }
    this._deletion.set(false);
  }
  focusEffect() {
    const activeCell = this.activeCell();
    const gridFocused = untracked(() => this.isFocused());
    if (activeCell === undefined || !gridFocused) return;
    const isRoving = untracked(() => this.inputs.focusMode() === 'roving');
    const cellFocused = untracked(() => activeCell.isFocused());
    if (isRoving && !cellFocused) {
      activeCell.focus();
    }
  }
}

class GridRowPattern {
  inputs;
  rowIndex;
  constructor(inputs) {
    this.inputs = inputs;
    this.rowIndex = inputs.rowIndex;
  }
}

class GridCellPattern {
  inputs;
  id = () => this.inputs.id();
  element = () => this.inputs.element();
  isFocused = signal(false);
  selected;
  selectable = () => this.inputs.selectable();
  disabled = computed(() => this.inputs.disabled() || (this.inputs.widget()?.inputs.disabled() ?? false));
  rowSpan = () => this.inputs.rowSpan();
  colSpan = () => this.inputs.colSpan();
  active = computed(() => this.inputs.grid().activeCell() === this);
  anchor = computed(() => this.inputs.grid().anchorCell() === this ? true : undefined);
  ariaSelected = computed(() => this.inputs.grid().inputs.enableSelection() && this.selectable() ? this.selected() : undefined);
  ariaRowIndex = computed(() => this.inputs.row().rowIndex() ?? this.inputs.rowIndex() ?? this.inputs.grid().gridBehavior.rowIndex(this));
  ariaColIndex = computed(() => this.inputs.colIndex() ?? this.inputs.grid().gridBehavior.colIndex(this));
  _tabIndex = computed(() => this.inputs.grid().gridBehavior.cellTabIndex(this));
  tabIndex = computed(() => {
    if (this.inputs.widget()) {
      return -1;
    }
    return this._tabIndex();
  });
  widget = () => this.inputs.widget();
  isActivated = computed(() => this.widget()?.isActivated() ?? false);
  constructor(inputs) {
    this.inputs = inputs;
    this.selected = inputs.selected;
  }
  onKeydown(event) {
    if (this.disabled()) return;
    this.widget()?.onKeydown(event);
  }
  onFocusIn(event) {
    this.isFocused.set(true);
    const focusTarget = event.target;
    const widget = this.inputs.getWidget(focusTarget);
    if (!widget) return;
    widget.onFocusIn(event);
  }
  onFocusOut(event) {
    const blurTarget = event.target;
    const widget = this.inputs.getWidget(blurTarget);
    widget?.onFocusOut(event);
    const focusTarget = event.relatedTarget;
    if (this.element().contains(focusTarget)) return;
    this.isFocused.set(false);
  }
  focus() {
    const widget = this.widget();
    if (widget) {
      widget.focus();
    } else {
      this.element().focus();
    }
  }
  widgetTabIndex() {
    return this._tabIndex();
  }
}

function resolveElement(resolver, context) {
  if (typeof resolver === 'function') {
    return resolver(context) ?? undefined;
  }
  return (resolver instanceof ElementRef ? resolver.nativeElement : resolver) ?? undefined;
}

class GridCellWidgetPattern {
  inputs;
  element = () => this.inputs.element();
  widgetHost = () => resolveElement(this.inputs.focusTarget(), this.element()) ?? this.element();
  disabled = computed(() => this.inputs.disabled() || this.inputs.cell().disabled());
  tabIndex = computed(() => {
    if (this.inputs.focusTarget()) {
      return -1;
    }
    return this.inputs.cell().widgetTabIndex();
  });
  active = computed(() => this.inputs.cell().active() && this.inputs.cell().widget() === this);
  isActivated = signal(false);
  lastActivateEvent = signal(undefined);
  lastDeactivateEvent = signal(undefined);
  keydown = computed(() => {
    const manager = new KeyboardEventManager();
    if (this.inputs.widgetType() === 'simple') {
      return manager.on('Enter', e => this.inputs.onActivate?.(e), {
        preventDefault: false,
        stopPropagation: false
      }).on(' ', e => this.inputs.onActivate?.(e), {
        preventDefault: false,
        stopPropagation: false
      });
    }
    if (this.isActivated()) {
      manager.on('Escape', e => this.deactivate(e));
      if (this.inputs.widgetType() === 'editable') {
        manager.on('Enter', e => this.deactivate(e));
      }
      return manager;
    }
    manager.on('Enter', e => this.activate(e));
    if (this.inputs.widgetType() === 'editable') {
      manager.on([Modifier.Shift, Modifier.None], /^[a-zA-Z0-9]$/, e => this.activate(e), {
        preventDefault: false
      });
    }
    return manager;
  });
  constructor(inputs) {
    this.inputs = inputs;
  }
  onKeydown(event) {
    if (this.disabled()) return;
    this.keydown().handle(event);
  }
  onFocusIn(event) {
    if (this.inputs.widgetType() === 'simple') return;
    const focusTarget = event.target;
    if (this.widgetHost().contains(focusTarget) && this.widgetHost() !== focusTarget) {
      this.activate(event);
    }
  }
  onFocusOut(event) {
    const focusTarget = event.relatedTarget;
    if (this.widgetHost().contains(focusTarget)) return;
    this.deactivate(event);
  }
  focus() {
    this.widgetHost().focus();
  }
  activationEffect() {
    if (this.isActivated()) {
      const event = this.lastActivateEvent();
      this.inputs.onActivate?.(event);
      if (this.inputs.focusTarget()) {
        this.focus();
      }
    }
  }
  deactivationEffect() {
    const event = this.lastDeactivateEvent();
    if (event) {
      this.inputs.onDeactivate?.(event);
      if (event instanceof KeyboardEvent) {
        this.focus();
      }
    }
  }
  activate(event) {
    if (this.isActivated()) return;
    if (this.inputs.widgetType() === 'simple') return;
    this.isActivated.set(true);
    this.lastActivateEvent.set(event);
  }
  deactivate(event) {
    if (!this.isActivated()) return;
    this.isActivated.set(false);
    this.lastDeactivateEvent.set(event);
  }
}

export { GridCellPattern, GridCellWidgetPattern, GridPattern, GridRowPattern, resolveElement };
//# sourceMappingURL=_widget-chunk.mjs.map
