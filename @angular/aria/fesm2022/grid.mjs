import * as i0 from '@angular/core';
import { InjectionToken, inject, ElementRef, computed, input, booleanAttribute, afterRenderEffect, afterNextRender, Directive, output, Renderer2, contentChild, model } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { tabIndexTransform } from './_transforms-chunk.mjs';
import { GridPattern, GridCellWidgetPattern, GridCellPattern, GridRowPattern } from './_widget-chunk.mjs';
import { SortedCollection, reportViolations } from './_violations-chunk.mjs';
import { _IdGenerator } from '@angular/cdk/a11y';
import './_click-event-manager-chunk.mjs';
import '@angular/core/primitives/signals';

const GRID_CELL = new InjectionToken('GRID_CELL');
const GRID_ROW = new InjectionToken('GRID_ROW');
const GRID = new InjectionToken('GRID');

class Grid {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _collection = new SortedCollection();
  _rowPatterns = computed(() => this._collection.orderedItems().map(r => r._pattern), ...(ngDevMode ? [{
    debugName: "_rowPatterns"
  }] : []));
  textDirection = inject(Directionality).valueSignal;
  enableSelection = input(false, {
    ...(ngDevMode ? {
      debugName: "enableSelection"
    } : {}),
    transform: booleanAttribute
  });
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  softDisabled = input(true, {
    ...(ngDevMode ? {
      debugName: "softDisabled"
    } : {}),
    transform: booleanAttribute
  });
  focusMode = input('roving', ...(ngDevMode ? [{
    debugName: "focusMode"
  }] : []));
  rowWrap = input('loop', ...(ngDevMode ? [{
    debugName: "rowWrap"
  }] : []));
  colWrap = input('loop', ...(ngDevMode ? [{
    debugName: "colWrap"
  }] : []));
  multi = input(false, {
    ...(ngDevMode ? {
      debugName: "multi"
    } : {}),
    transform: booleanAttribute
  });
  selectionMode = input('follow', ...(ngDevMode ? [{
    debugName: "selectionMode"
  }] : []));
  tabIndex = input(undefined, {
    ...(ngDevMode ? {
      debugName: "tabIndex"
    } : {}),
    alias: 'tabindex',
    transform: tabIndexTransform
  });
  _pattern = new GridPattern({
    ...this,
    rows: this._rowPatterns,
    getCell: e => this._getCell(e),
    element: () => this.element
  });
  activeDescendant = computed(() => this._pattern.activeDescendant(), ...(ngDevMode ? [{
    debugName: "activeDescendant"
  }] : []));
  constructor() {
    afterRenderEffect({
      write: () => this._pattern.setDefaultStateEffect()
    });
    afterRenderEffect({
      write: () => this._pattern.resetStateEffect()
    });
    afterRenderEffect({
      write: () => this._pattern.resetFocusEffect()
    });
    afterRenderEffect({
      write: () => this._pattern.restoreFocusEffect()
    });
    afterRenderEffect({
      write: () => this._pattern.focusEffect()
    });
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      afterRenderEffect({
        read: () => {
          reportViolations(this._pattern.validate(), this.element);
        }
      });
    }
    afterNextRender(() => {
      this._collection.startObserving(this.element);
    });
  }
  ngOnDestroy() {
    this._collection.stopObserving();
  }
  scrollActiveCellIntoView(options = {
    block: 'nearest'
  }) {
    this._pattern.activeCell()?.element().scrollIntoView(options);
  }
  _getCell(element) {
    let target = element;
    while (target) {
      for (const row of this._rowPatterns()) {
        for (const cell of row.inputs.cells()) {
          if (cell.element() === target) {
            return cell;
          }
        }
      }
      target = target.parentElement?.closest('[ngGridCell]');
    }
    return undefined;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: Grid,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: Grid,
    isStandalone: true,
    selector: "[ngGrid]",
    inputs: {
      enableSelection: {
        classPropertyName: "enableSelection",
        publicName: "enableSelection",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      softDisabled: {
        classPropertyName: "softDisabled",
        publicName: "softDisabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      focusMode: {
        classPropertyName: "focusMode",
        publicName: "focusMode",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      rowWrap: {
        classPropertyName: "rowWrap",
        publicName: "rowWrap",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      colWrap: {
        classPropertyName: "colWrap",
        publicName: "colWrap",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      multi: {
        classPropertyName: "multi",
        publicName: "multi",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      selectionMode: {
        classPropertyName: "selectionMode",
        publicName: "selectionMode",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      tabIndex: {
        classPropertyName: "tabIndex",
        publicName: "tabindex",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    host: {
      attributes: {
        "role": "grid"
      },
      listeners: {
        "keydown": "_pattern.onKeydown($event)",
        "click": "_pattern.onClick($event)",
        "focusin": "_pattern.onFocusIn($event)",
        "focusout": "_pattern.onFocusOut($event)"
      },
      properties: {
        "tabindex": "tabIndex() !== undefined ? tabIndex() : _pattern.tabIndex()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-multiselectable": "_pattern.multiSelectable()",
        "attr.aria-activedescendant": "_pattern.activeDescendant()"
      }
    },
    providers: [{
      provide: GRID,
      useExisting: Grid
    }],
    exportAs: ["ngGrid"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: Grid,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngGrid]',
      exportAs: 'ngGrid',
      host: {
        'role': 'grid',
        '[tabindex]': 'tabIndex() !== undefined ? tabIndex() : _pattern.tabIndex()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-multiselectable]': '_pattern.multiSelectable()',
        '[attr.aria-activedescendant]': '_pattern.activeDescendant()',
        '(keydown)': '_pattern.onKeydown($event)',
        '(click)': '_pattern.onClick($event)',
        '(focusin)': '_pattern.onFocusIn($event)',
        '(focusout)': '_pattern.onFocusOut($event)'
      },
      providers: [{
        provide: GRID,
        useExisting: Grid
      }]
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    enableSelection: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "enableSelection",
        required: false
      }]
    }],
    disabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    softDisabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "softDisabled",
        required: false
      }]
    }],
    focusMode: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "focusMode",
        required: false
      }]
    }],
    rowWrap: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "rowWrap",
        required: false
      }]
    }],
    colWrap: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "colWrap",
        required: false
      }]
    }],
    multi: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "multi",
        required: false
      }]
    }],
    selectionMode: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "selectionMode",
        required: false
      }]
    }],
    tabIndex: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "tabindex",
        required: false
      }]
    }]
  }
});

class GridCellWidget {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  active = computed(() => this._pattern.active(), ...(ngDevMode ? [{
    debugName: "active"
  }] : []));
  _cell = inject(GRID_CELL);
  id = input(inject(_IdGenerator).getId('ng-grid-cell-widget-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  widgetType = input('simple', ...(ngDevMode ? [{
    debugName: "widgetType"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  focusTarget = input(...(ngDevMode ? [undefined, {
    debugName: "focusTarget"
  }] : []));
  activated = output();
  deactivated = output();
  tabindex = input(...(ngDevMode ? [undefined, {
    debugName: "tabindex"
  }] : []));
  _tabIndex = computed(() => this.tabindex() ?? this._pattern.tabIndex(), ...(ngDevMode ? [{
    debugName: "_tabIndex"
  }] : []));
  _pattern = new GridCellWidgetPattern({
    ...this,
    element: () => this.element,
    cell: () => this._cell._pattern,
    onActivate: e => this.activated.emit(e),
    onDeactivate: e => this.deactivated.emit(e)
  });
  get isActivated() {
    return computed(() => this._pattern.isActivated());
  }
  constructor() {
    afterRenderEffect({
      write: () => this._pattern.activationEffect()
    });
    afterRenderEffect({
      write: () => this._pattern.deactivationEffect()
    });
  }
  activate() {
    this._pattern.activate();
  }
  deactivate() {
    this._pattern.deactivate();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: GridCellWidget,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: GridCellWidget,
    isStandalone: true,
    selector: "[ngGridCellWidget]",
    inputs: {
      id: {
        classPropertyName: "id",
        publicName: "id",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      widgetType: {
        classPropertyName: "widgetType",
        publicName: "widgetType",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      focusTarget: {
        classPropertyName: "focusTarget",
        publicName: "focusTarget",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      tabindex: {
        classPropertyName: "tabindex",
        publicName: "tabindex",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    outputs: {
      activated: "activated",
      deactivated: "deactivated"
    },
    host: {
      properties: {
        "attr.data-active": "active()",
        "attr.data-active-control": "isActivated() ? \"widget\" : \"cell\"",
        "tabindex": "_tabIndex()",
        "attr.id": "id()"
      }
    },
    exportAs: ["ngGridCellWidget"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: GridCellWidget,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngGridCellWidget]',
      exportAs: 'ngGridCellWidget',
      host: {
        '[attr.data-active]': 'active()',
        '[attr.data-active-control]': 'isActivated() ? "widget" : "cell"',
        '[tabindex]': '_tabIndex()',
        '[attr.id]': 'id()'
      }
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    id: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "id",
        required: false
      }]
    }],
    widgetType: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "widgetType",
        required: false
      }]
    }],
    disabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    focusTarget: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "focusTarget",
        required: false
      }]
    }],
    activated: [{
      type: i0.Output,
      args: ["activated"]
    }],
    deactivated: [{
      type: i0.Output,
      args: ["deactivated"]
    }],
    tabindex: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "tabindex",
        required: false
      }]
    }]
  }
});

class GridCell {
  _elementRef = inject(ElementRef);
  _renderer = inject(Renderer2);
  element = this._elementRef.nativeElement;
  active = computed(() => this._pattern.active(), ...(ngDevMode ? [{
    debugName: "active"
  }] : []));
  _widget = contentChild(GridCellWidget, {
    ...(ngDevMode ? {
      debugName: "_widget"
    } : {}),
    descendants: true
  });
  _widgetPattern = computed(() => this._widget()?._pattern, ...(ngDevMode ? [{
    debugName: "_widgetPattern"
  }] : []));
  _row = inject(GRID_ROW);
  textDirection = inject(Directionality).valueSignal;
  id = input(inject(_IdGenerator).getId('ng-grid-cell-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  role = input('gridcell', ...(ngDevMode ? [{
    debugName: "role"
  }] : []));
  rowSpan = input(1, ...(ngDevMode ? [{
    debugName: "rowSpan"
  }] : []));
  colSpan = input(1, ...(ngDevMode ? [{
    debugName: "colSpan"
  }] : []));
  rowIndex = input(...(ngDevMode ? [undefined, {
    debugName: "rowIndex"
  }] : []));
  colIndex = input(...(ngDevMode ? [undefined, {
    debugName: "colIndex"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  selected = model(false, ...(ngDevMode ? [{
    debugName: "selected"
  }] : []));
  selectable = input(true, ...(ngDevMode ? [{
    debugName: "selectable"
  }] : []));
  tabindex = input(...(ngDevMode ? [undefined, {
    debugName: "tabindex"
  }] : []));
  _tabIndex = computed(() => this.tabindex() ?? this._pattern.tabIndex(), ...(ngDevMode ? [{
    debugName: "_tabIndex"
  }] : []));
  _pattern = new GridCellPattern({
    ...this,
    grid: this._row._gridPattern,
    row: () => this._row._pattern,
    widget: this._widgetPattern,
    getWidget: e => this._getWidget(e),
    element: () => this.element
  });
  constructor() {
    afterRenderEffect({
      write: () => {
        const {
          _pattern: pattern,
          _toggleAttribute: toggle
        } = this;
        const rowSpan = pattern.rowSpan();
        const colSpan = pattern.colSpan();
        toggle('role', this.role());
        toggle('id', pattern.id());
        toggle('rowspan', rowSpan);
        toggle('colspan', colSpan);
        toggle('aria-rowspan', rowSpan);
        toggle('aria-colspan', colSpan);
        toggle('data-active', this.active());
        toggle('data-anchor', pattern.anchor());
        toggle('aria-disabled', pattern.disabled());
        toggle('aria-rowindex', pattern.ariaRowIndex());
        toggle('aria-colindex', pattern.ariaColIndex());
        toggle('aria-selected', pattern.ariaSelected());
        toggle('tabindex', this._tabIndex());
      }
    });
  }
  ngOnInit() {
    this._row._collection.register(this);
  }
  ngOnDestroy() {
    this._row._collection.unregister(this);
  }
  _toggleAttribute = (name, value) => {
    if (value == null) {
      this._renderer.removeAttribute(this.element, name);
    } else {
      this._renderer.setAttribute(this.element, name, value);
    }
  };
  _getWidget(element) {
    let target = element;
    const widget = this._widgetPattern();
    if (!widget) return undefined;
    while (target) {
      if (widget.element() === target) {
        return widget;
      }
      target = target.parentElement?.closest('[ngGridCellWidget]');
    }
    return undefined;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: GridCell,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.2.0",
    version: "22.1.0",
    type: GridCell,
    isStandalone: true,
    selector: "[ngGridCell]",
    inputs: {
      id: {
        classPropertyName: "id",
        publicName: "id",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      role: {
        classPropertyName: "role",
        publicName: "role",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      rowSpan: {
        classPropertyName: "rowSpan",
        publicName: "rowSpan",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      colSpan: {
        classPropertyName: "colSpan",
        publicName: "colSpan",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      rowIndex: {
        classPropertyName: "rowIndex",
        publicName: "rowIndex",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      colIndex: {
        classPropertyName: "colIndex",
        publicName: "colIndex",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      selected: {
        classPropertyName: "selected",
        publicName: "selected",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      selectable: {
        classPropertyName: "selectable",
        publicName: "selectable",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      tabindex: {
        classPropertyName: "tabindex",
        publicName: "tabindex",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    outputs: {
      selected: "selectedChange"
    },
    providers: [{
      provide: GRID_CELL,
      useExisting: GridCell
    }],
    queries: [{
      propertyName: "_widget",
      first: true,
      predicate: GridCellWidget,
      descendants: true,
      isSignal: true
    }],
    exportAs: ["ngGridCell"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: GridCell,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngGridCell]',
      exportAs: 'ngGridCell',
      providers: [{
        provide: GRID_CELL,
        useExisting: GridCell
      }]
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    _widget: [{
      type: i0.ContentChild,
      args: [i0.forwardRef(() => GridCellWidget), {
        ...{
          descendants: true
        },
        isSignal: true
      }]
    }],
    id: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "id",
        required: false
      }]
    }],
    role: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "role",
        required: false
      }]
    }],
    rowSpan: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "rowSpan",
        required: false
      }]
    }],
    colSpan: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "colSpan",
        required: false
      }]
    }],
    rowIndex: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "rowIndex",
        required: false
      }]
    }],
    colIndex: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "colIndex",
        required: false
      }]
    }],
    disabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    selected: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "selected",
        required: false
      }]
    }, {
      type: i0.Output,
      args: ["selectedChange"]
    }],
    selectable: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "selectable",
        required: false
      }]
    }],
    tabindex: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "tabindex",
        required: false
      }]
    }]
  }
});

class GridRow {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _collection = new SortedCollection();
  _cellPatterns = computed(() => this._collection.orderedItems().map(c => c._pattern), ...(ngDevMode ? [{
    debugName: "_cellPatterns"
  }] : []));
  _grid = inject(GRID);
  _gridPattern = computed(() => this._grid._pattern, ...(ngDevMode ? [{
    debugName: "_gridPattern"
  }] : []));
  rowIndex = input(...(ngDevMode ? [undefined, {
    debugName: "rowIndex"
  }] : []));
  _pattern = new GridRowPattern({
    ...this,
    cells: this._cellPatterns,
    grid: this._gridPattern
  });
  constructor() {
    afterNextRender(() => {
      this._collection.startObserving(this.element);
    });
  }
  ngOnInit() {
    this._grid._collection.register(this);
  }
  ngOnDestroy() {
    this._grid._collection.unregister(this);
    this._collection.stopObserving();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: GridRow,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: GridRow,
    isStandalone: true,
    selector: "[ngGridRow]",
    inputs: {
      rowIndex: {
        classPropertyName: "rowIndex",
        publicName: "rowIndex",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    host: {
      attributes: {
        "role": "row"
      },
      properties: {
        "attr.aria-rowindex": "_pattern.rowIndex()"
      }
    },
    providers: [{
      provide: GRID_ROW,
      useExisting: GridRow
    }],
    exportAs: ["ngGridRow"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: GridRow,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngGridRow]',
      exportAs: 'ngGridRow',
      host: {
        'role': 'row',
        '[attr.aria-rowindex]': '_pattern.rowIndex()'
      },
      providers: [{
        provide: GRID_ROW,
        useExisting: GridRow
      }]
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    rowIndex: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "rowIndex",
        required: false
      }]
    }]
  }
});

export { Grid, GridCell, GridCellWidget, GridRow };
//# sourceMappingURL=grid.mjs.map
