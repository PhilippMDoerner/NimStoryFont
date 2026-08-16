import Quill, { Delta, EmitterSource, Op, Parchment, Range } from "quill";
import { Context } from "quill/modules/keyboard.js";
import TypeScroll from "quill/blots/scroll.js";
import TypeBlock, { BlockEmbed } from "quill/blots/block.js";
import TypeInline from "quill/blots/inline.js";
import TypeText from "quill/blots/text.js";
import BaseTheme from "quill/themes/base.js";
import Picker from "quill/ui/picker.js";
import { Delta as Delta$1 } from "quill/core.js";
import TypeClipboard from "quill/modules/clipboard.js";

//#region src/formats/container-format.d.ts
declare const Container: typeof Parchment.ContainerBlot;
declare class ContainerFormat extends Container {
  static tagName: string;
  static blotName: string;
  static scope: Parchment.Scope;
  static allowedChildren?: Parchment.BlotConstructor[];
  static requiredContainer: Parchment.BlotConstructor;
  static defaultChild?: Parchment.BlotConstructor;
  static allowAttrs: Set<string>;
  static allowDataAttrs: Set<string>;
  static allowDataAttrsChangeHandler: Record<string, string>;
  static create(_value?: unknown): HTMLElement;
  setFormatValue(name: string, value?: any): void;
  optimize(_context: Record<string, any>): void;
  enforceAllowedChildren(): void;
}
//#endregion
//#region src/formats/table-cell-inner-format.d.ts
declare class TableCellInnerFormat extends ContainerFormat {
  static blotName: "table-up-cell-inner";
  static tagName: string;
  static className: string;
  static allowDataAttrs: Set<string>;
  static defaultChild: Parchment.BlotConstructor;
  parent: TableCellFormat;
  static allowStyle: Set<string>;
  static isAllowStyle(str: string): boolean;
  static create(value: TableCellValue): HTMLElement;
  static formats(domNode: HTMLElement): Record<string, any>;
  constructor(scroll: TypeScroll, domNode: HTMLElement, _value: TableCellValue);
  setFormatValue(name: string, value?: any, isStyle?: boolean): void;
  clearCache(): void;
  get tableId(): string;
  get rowId(): string;
  set rowId(value: string);
  get colId(): string;
  set colId(value: string);
  get rowspan(): number;
  set rowspan(value: number);
  get colspan(): number;
  set colspan(value: number);
  get emptyRow(): string[];
  set emptyRow(value: string[]);
  set wrapTag(value: TableBodyTag);
  get wrapTag(): TableBodyTag;
  getColumnIndex(): number;
  getRowIndex(): number;
  getTableBody(): TableBodyFormat | null;
  getTableRow(): TableRowFormat | null;
  setStyleByString(styleStr: string): void;
  convertTableCell(): void;
  formatAt(index: number, length: number, name: string, value: any): void;
  insertAt(index: number, value: string, def?: any): void;
  formats(): Record<string, any>;
  checkMerge(): boolean;
  optimize(): void;
  insertBefore(blot: Parchment.Blot, ref?: Parchment.Blot | null): void;
}
//#endregion
//#region src/formats/table-cell-format.d.ts
declare class TableCellFormat extends ContainerFormat {
  static blotName: "table-up-cell";
  static tagName: string;
  static className: string;
  static allowAttrs: Set<string>;
  static allowDataAttrs: Set<string>;
  static allowStyle: Set<string>;
  static isAllowStyle(str: string): boolean;
  static create(value: TableCellValue): HTMLTableCellElement;
  static formats(domNode: HTMLElement): Record<string, any>;
  isChildHeadTableCellInner(): boolean;
  setFormatValue(name: string, value?: any): void;
  setStyleBoder(name: string, value?: any): void;
  getNearByCell(direction: 'left' | 'top'): TableCellFormat[];
  get tableId(): string;
  get rowId(): string;
  get colId(): string;
  get rowspan(): number;
  get colspan(): number;
  get emptyRow(): string[];
  get wrapTag(): TableBodyTag;
  getColumnIndex(): number;
  getCellInner(): TableCellInnerFormat;
  convertTableCell(): void;
  checkMerge(): boolean;
  optimize(context: Record<string, any>): void;
}
//#endregion
//#region src/formats/table-row-format.d.ts
type SkipRowCount = number[] & {
  skipRowNum?: number;
};
declare class TableRowFormat extends ContainerFormat {
  static blotName: "table-up-row";
  static tagName: string;
  static className: string;
  static allowDataAttrs: Set<string>;
  static allowDataAttrsChangeHandler: Record<string, keyof TableRowFormat>;
  static create(value: TableRowValue): HTMLElement;
  children: Parchment.LinkedList<TableCellFormat>;
  get rowId(): string;
  get tableId(): string;
  get wrapTag(): TableBodyTag;
  setHeight(value: string): void;
  getCellByColId(colId: string, direction: 'next' | 'prev'): TableCellFormat | null;
  insertCell(targetIndex: number, value: TableCellValue): SkipRowCount;
  getCellByColumIndex(stopIndex: number): [null | TableCellFormat, number, number[]];
  removeCell(targetIndex: number): SkipRowCount;
  foreachCellInner(func: (tableCell: TableCellInnerFormat, index: number) => boolean | void): void;
  checkMerge(): boolean;
  wrapParentTag(): void;
  optimize(_context: Record<string, any>): void;
  remove(): void;
}
//#endregion
//#region src/formats/table-body-format.d.ts
declare class TableBodyFormat extends ContainerFormat {
  static blotName: string;
  static tagName: string;
  static create(value: string): HTMLElement;
  get tableId(): string;
  checkMerge(): boolean;
  optimize(context: Record<string, any>): void;
  convertBody(tag: TableBodyTag): void;
  getRows(): TableRowFormat[];
}
//#endregion
//#region src/formats/table-foot-format.d.ts
declare class TableFootFormat extends TableBodyFormat {
  static blotName: "table-up-foot";
  static tagName: string;
}
//#endregion
//#region src/formats/table-head-format.d.ts
declare class TableHeadFormat extends TableBodyFormat {
  static blotName: "table-up-head";
  static tagName: string;
}
//#endregion
//#region src/formats/table-col-format.d.ts
declare const BlockEmbed$2: typeof BlockEmbed;
declare class TableColFormat extends BlockEmbed$2 {
  static blotName: "table-up-col";
  static tagName: string;
  static validWidth(width: string | number, full: boolean): string;
  static create(value: TableColValue): HTMLElement;
  static value(domNode: HTMLElement): Record<string, any>;
  get width(): number;
  set width(value: string | number);
  get tableId(): string;
  get colId(): string;
  get full(): boolean;
  set full(value: boolean);
  get align(): string;
  set align(value: string);
  checkMerge(): boolean;
  optimize(context: Record<string, any>): void;
  insertAt(index: number, value: string, def?: any): void;
}
//#endregion
//#region src/formats/table-main-format.d.ts
declare class TableMainFormat extends ContainerFormat {
  scroll: TypeScroll;
  static blotName: "table-up-main";
  static tagName: string;
  static className: string;
  static create(value: TableValue): HTMLElement;
  constructor(scroll: TypeScroll, domNode: HTMLElement, _value: unknown);
  colWidthFillTable(): number | undefined;
  get tableId(): string;
  get full(): boolean;
  set full(value: boolean);
  get align(): string;
  set align(value: string);
  setFull(): void;
  cancelFull(): void;
  updateAlign(): void;
  getBodys(): TableBodyFormat[];
  getRows(): TableRowFormat[];
  getRowIds(): string[];
  getCols(): TableColFormat[];
  getColIds(): string[];
  checkMerge(): boolean;
  optimize(context: Record<string, any>): void;
  mergeRow(): void;
  checkEmptyCol(autoMerge: boolean): void;
  checkEmptyRow(autoMerge: boolean): void;
  sortMergeChildren(): void;
  insertRow(targetIndex: number): void;
}
//#endregion
//#region src/formats/overrides/block.d.ts
declare const Block: typeof TypeBlock;
declare class BlockOverride extends Block {
  replaceWith(name: string | Parchment.Blot, value?: any): Parchment.Blot;
  format(name: string, value: any): void;
}
//#endregion
//#region node_modules/.pnpm/quill-delta@5.1.0/node_modules/quill-delta/dist/AttributeMap.d.ts
interface AttributeMap {
  [key: string]: unknown;
}
declare namespace AttributeMap {
  function compose(a?: AttributeMap, b?: AttributeMap, keepNull?: boolean): AttributeMap | undefined;
  function diff(a?: AttributeMap, b?: AttributeMap): AttributeMap | undefined;
  function invert(attr?: AttributeMap, base?: AttributeMap): AttributeMap;
  function transform(a: AttributeMap | undefined, b: AttributeMap | undefined, priority?: boolean): AttributeMap | undefined;
}
//#endregion
//#region node_modules/.pnpm/quill-delta@5.1.0/node_modules/quill-delta/dist/Op.d.ts
interface Op$1 {
  insert?: string | Record<string, unknown>;
  delete?: number;
  retain?: number | Record<string, unknown>;
  attributes?: AttributeMap;
}
declare namespace Op$1 {
  function length(op: Op$1): number;
}
//#endregion
//#region node_modules/.pnpm/quill-delta@5.1.0/node_modules/quill-delta/dist/OpIterator.d.ts
declare class Iterator {
  ops: Op$1[];
  index: number;
  offset: number;
  constructor(ops: Op$1[]);
  hasNext(): boolean;
  next(length?: number): Op$1;
  peek(): Op$1;
  peekLength(): number;
  peekType(): string;
  rest(): Op$1[];
}
//#endregion
//#region node_modules/.pnpm/quill-delta@5.1.0/node_modules/quill-delta/dist/Delta.d.ts
interface EmbedHandler<T> {
  compose(a: T, b: T, keepNull: boolean): T;
  invert(a: T, b: T): T;
  transform(a: T, b: T, priority: boolean): T;
}
declare class Delta$2 {
  static Op: typeof Op$1;
  static OpIterator: typeof Iterator;
  static AttributeMap: typeof AttributeMap;
  private static handlers;
  static registerEmbed<T>(embedType: string, handler: EmbedHandler<T>): void;
  static unregisterEmbed(embedType: string): void;
  private static getHandler;
  ops: Op$1[];
  constructor(ops?: Op$1[] | {
    ops: Op$1[];
  });
  insert(arg: string | Record<string, unknown>, attributes?: AttributeMap | null): this;
  delete(length: number): this;
  retain(length: number | Record<string, unknown>, attributes?: AttributeMap | null): this;
  push(newOp: Op$1): this;
  chop(): this;
  filter(predicate: (op: Op$1, index: number) => boolean): Op$1[];
  forEach(predicate: (op: Op$1, index: number) => void): void;
  map<T>(predicate: (op: Op$1, index: number) => T): T[];
  partition(predicate: (op: Op$1) => boolean): [Op$1[], Op$1[]];
  reduce<T>(predicate: (accum: T, curr: Op$1, index: number) => T, initialValue: T): T;
  changeLength(): number;
  length(): number;
  slice(start?: number, end?: number): Delta$2;
  compose(other: Delta$2): Delta$2;
  concat(other: Delta$2): Delta$2;
  diff(other: Delta$2, cursor?: number | undefined): Delta$2;
  eachLine(predicate: (line: Delta$2, attributes: AttributeMap, index: number) => boolean | void, newline?: string): void;
  invert(base: Delta$2): Delta$2;
  transform(index: number, priority?: boolean): number;
  transform(other: Delta$2, priority?: boolean): Delta$2;
  transformPosition(index: number, priority?: boolean): number;
}
//#endregion
//#region src/formats/overrides/block-embed.d.ts
declare const BlockEmbed$1: typeof BlockEmbed;
declare class BlockEmbedOverride extends BlockEmbed$1 {
  delta(): Delta$2;
  length(): number;
  formatAt(index: number, length: number, name: string, value: unknown): void;
}
//#endregion
//#region src/formats/overrides/scroll.d.ts
declare const ScrollBlot: any;
declare class ScrollOverride extends ScrollBlot {
  domNode: HTMLElement;
  enable(enabled?: boolean): void;
  createBlock(attributes: Record<string, any>, refBlot?: Parchment.Blot): Parchment.ParentBlot | TableCellInnerFormat;
}
//#endregion
//#region src/formats/table-caption-format.d.ts
declare class TableCaptionFormat extends BlockOverride {
  static blotName: "table-up-caption";
  static tagName: string;
  static className: string;
  static allowedChildren: (typeof TypeInline | typeof TypeText)[];
  static create(value: TableCaptionValue): HTMLElement;
  static formats(domNode: HTMLElement): TableCaptionValue;
  scroll: TypeScroll;
  uiNode: HTMLElement;
  constructor(scroll: TypeScroll, domNode: HTMLElement, _value: TableCaptionValue);
  createUI(): HTMLElement;
  get tableId(): string;
  set side(value: TableCaptionValue['side']);
  get side(): TableCaptionValue["side"];
  format(name: string, value: any): void;
  checkMerge(): boolean;
  optimize(context: Record<string, any>): void;
}
//#endregion
//#region src/formats/table-colgroup-format.d.ts
declare class TableColgroupFormat extends ContainerFormat {
  static blotName: "table-up-colgroup";
  static tagName: string;
  children: Parchment.LinkedList<TableColFormat>;
  static create(value: TableValue): HTMLElement;
  get tableId(): string;
  get full(): boolean;
  set full(value: boolean);
  get align(): string;
  set align(value: string);
  findCol(index: number): TableColFormat | null;
  insertColByIndex(index: number, value: TableColValue): void;
  removeColByIndex(index: number): void;
  checkMerge(): boolean;
  optimize(context: Record<string, any>): void;
}
//#endregion
//#region src/formats/table-wrapper-format.d.ts
declare class TableWrapperFormat extends ContainerFormat {
  scroll: any;
  static blotName: "table-up";
  static tagName: string;
  static className: string;
  static create(value: string): HTMLElement;
  constructor(scroll: any, node: Node, _value: string);
  get tableId(): string;
  checkMerge(): boolean;
  optimize(context: Record<string, any>): void;
  deleteAt(index: number, length: number): void;
  remove(): void;
  isBlockLine(blot: Parchment.Blot): boolean;
  insertLineAround: () => void;
}
//#endregion
//#region src/formats/index.d.ts
declare function getTableMainRect(tableMainBlot: TableMainFormat): {
  rect: DOMRect | null;
  head: TableHeadFormat | null;
  body: TableBodyFormat | null;
  foot: TableFootFormat | null;
};
//#endregion
//#region src/utils/constants.d.ts
declare const blotName: {
  readonly container: "table-up-container";
  readonly tableCaption: "table-up-caption";
  readonly tableWrapper: "table-up";
  readonly tableMain: "table-up-main";
  readonly tableColgroup: "table-up-colgroup";
  readonly tableCol: "table-up-col";
  readonly tableHead: "table-up-head";
  readonly tableBody: "table-up-body";
  readonly tableFoot: "table-up-foot";
  readonly tableRow: "table-up-row";
  readonly tableCell: "table-up-cell";
  readonly tableCellInner: "table-up-cell-inner";
};
declare const tableUpSize: {
  colMinWidthPre: number;
  colMinWidthPx: number;
  colDefaultWidth: number;
  rowMinHeightPx: number;
};
declare const tableUpEvent: {
  AFTER_TABLE_RESIZE: string;
  TABLE_SELECTION_DRAG_START: string;
  TABLE_SELECTION_DRAG_END: string;
  TABLE_SELECTION_CHANGE: string;
  TABLE_SELECTION_DISPLAY_CHANGE: string;
};
declare const tableUpInternal: {
  moduleName: string;
  tableSelectionName: string;
};
//#endregion
//#region src/modules/table-dom-selector.d.ts
interface TableModuleLifecycle {
  hide: () => void;
  show: () => void;
  update: () => void;
  destroy: () => void;
}
declare class TableDomSelector implements TableModuleLifecycle {
  tableModule: TableUp;
  quill: Quill;
  table?: HTMLTableElement;
  tableSelectMouseDownHandler: (event: MouseEvent) => void;
  constructor(tableModule: TableUp, quill: Quill);
  tableSelectHandler(event: MouseEvent): void;
  setSelectionTable(table: HTMLTableElement | undefined): void;
  hide(): void;
  show(): void;
  update(): void;
  destroy(): void;
}
//#endregion
//#region src/modules/table-align.d.ts
declare class TableAlign extends TableDomSelector {
  tableModule: TableUp;
  quill: Quill;
  static moduleName: string;
  tableBlot?: TableMainFormat;
  tableWrapperBlot?: TableWrapperFormat;
  alignBox: HTMLElement | null;
  cleanup?: () => void;
  bem: {
    b: () => string;
    be: (e?: string) => string;
    bm: (m?: string) => string;
    bem: (e?: string, m?: string) => string;
    ns: (s?: string) => string;
    bs: (s?: string) => string;
    cv: (v?: string) => string;
    is: (n: string) => string;
  };
  resizeObserver?: ResizeObserver;
  constructor(tableModule: TableUp, quill: Quill, _options: any);
  updateWhenTextChange: (eventName: string) => void;
  buildTools(): HTMLElement;
  handleAlignItemClick(e: MouseEvent): void;
  setTableAlign(tableBlot: TableMainFormat, align: string): void;
  show(): void;
  hide(): void;
  update(): void;
  destroy(): void;
}
//#endregion
//#region src/modules/table-clipboard/paste-cell-into-cell.d.ts
interface ArgumentsModule {
  quill: Quill;
  talbeModule: TableUp;
}
interface CellUpdate {
  offset: number;
  length: number;
  insertDelta: Delta;
  cell: TableCellInnerFormat;
  rowspan: number;
  colspan: number;
  emptyRow?: string[];
}
interface TableCellValueLike {
  rowId: string;
  colId: string;
  colspan: number;
  rowspan: number;
  emptyRow?: string[];
}
interface CellRecord extends TableCellValueLike {
  deltaOps: Op[];
}
declare function pasteCells(modules: ArgumentsModule, selectedTds: TableCellInnerFormat[], pasteDelta: Op[]): void;
declare function getTableCellStructure(cells: TableCellInnerFormat[]): {
  rows: number;
  cols: number;
};
declare function parsePasteDelta(delta: Op[]): {
  cells: CellRecord[];
  rows: number;
  cols: number;
};
declare function getCountByPosition(infos: ReturnType<typeof getCellPositions>): {
  rows: number;
  cols: number;
};
declare function pasteWithStructure(selectedTds: TableCellInnerFormat[], pasteCells: CellRecord[], modules: ArgumentsModule): void;
declare function getCellPositions<T extends TableCellValueLike>(cells: T[]): {
  cell: T;
  rowIndex: number;
  colIndex: number;
}[];
declare function groupCellByRow<T extends TableCellValueLike>(cells: T[]): Map<string, T[]>;
declare function pasteWithLoop(modules: ArgumentsModule, selectedTds: TableCellInnerFormat[], pasteCells: CellRecord[]): void;
declare function prepareCellUpdate(modules: ArgumentsModule, cell: TableCellInnerFormat, deltaOps: Op[], attrs?: Pick<TableCellValue, 'rowspan' | 'colspan' | 'emptyRow'>): CellUpdate;
declare function applyCellUpdates(modules: ArgumentsModule, updates: CellUpdate[]): void;
declare function removeOverlappingCells(modules: ArgumentsModule, updateCell: CellUpdate): void;
//#endregion
//#region src/modules/table-clipboard/table-clipboard.d.ts
declare const Clipboard: typeof TypeClipboard;
type Selector = string | Node['TEXT_NODE'] | Node['ELEMENT_NODE'];
type Matcher = (node: Node, delta: Delta$1, scroll: Parchment.ScrollBlot) => Delta$1;
interface ClipboardOptions {
  matchers: [Selector, Matcher][];
}
declare class TableClipboard extends Clipboard {
  quill: Quill;
  tableId: string;
  rowId: string;
  colIds: string[];
  rowspanCount: {
    rowspan: number;
    colspan: number;
  }[];
  cellCount: number;
  colCount: number;
  constructor(quill: Quill, options: Partial<ClipboardOptions>);
  normalizeHTML(doc: Document): void;
  getStyleBackgroundColor(node: Node, delta: Delta$1): void;
  getTargetFull(): boolean;
  matchTable(node: Node, delta: Delta$1): Delta$1;
  matchTbody(node: Node, delta: Delta$1): Delta$1;
  matchThead(node: Node, delta: Delta$1): Delta$1;
  matchTfoot(node: Node, delta: Delta$1): Delta$1;
  matchColgroup(node: Node, delta: Delta$1): Delta$1;
  matchCol(node: Node, _delta: Delta$1): Delta$1;
  matchTr(node: Node, delta: Delta$1): Delta$1;
  matchTd(node: Node, delta: Delta$1): Delta$1;
  matchTdAttributor(node: Node, delta: Delta$1): Delta$1;
  convert({
    html,
    text
  }: {
    html?: string;
    text?: string;
  }, formats?: Record<string, unknown>): Delta$1;
  matchCaption(node: Node, delta: Delta$1): Delta$1;
}
//#endregion
//#region src/modules/table-menu/constants.d.ts
declare const tableMenuTools: Record<string, Tool>;
//#endregion
//#region src/modules/table-menu/table-menu-common.d.ts
type TableMenuOptionsInput = Partial<Omit<TableMenuOptions, 'texts'>>;
interface MenuTooltipInstance extends TooltipInstance {
  isColorPick?: boolean;
}
declare class TableMenuCommon extends TableDomSelector {
  tableModule: TableUp;
  quill: Quill;
  static moduleName: string;
  usedColors: Set<string>;
  options: TableMenuOptions;
  menu: HTMLElement | null;
  isMenuDisplay: boolean;
  isColorPicking: boolean;
  tooltipItem: MenuTooltipInstance[];
  activeTooltip: MenuTooltipInstance | null;
  bem: {
    b: () => string;
    be: (e?: string) => string;
    bm: (m?: string) => string;
    bem: (e?: string, m?: string) => string;
    ns: (s?: string) => string;
    bs: (s?: string) => string;
    cv: (v?: string) => string;
    is: (n: string) => string;
  };
  colorItemClass: string;
  colorChooseTooltipOption: ToolTipOptions;
  constructor(tableModule: TableUp, quill: Quill, options: TableMenuOptionsInput);
  updateUsedColor: (this: any, color?: string | undefined) => void;
  hideWhenSelectionDragStart: () => void;
  updateWhenTextChange: (eventName: string) => void;
  resolveOptions(options: TableMenuOptionsInput): TableMenuOptions;
  buildTools(): HTMLElement;
  createColorChoose(item: HTMLElement, {
    handle,
    key
  }: ToolOption): MenuTooltipInstance;
  setActiveTooltip(tooltip: MenuTooltipInstance | null): void;
  getSelectedTds(): TableCellInnerFormat[];
  createTipText(item: HTMLElement, text: string): void;
  show(): void;
  update(): void;
  hide(): void;
  destroy(): void;
}
//#endregion
//#region src/modules/table-menu/table-menu-contextmenu.d.ts
type TableMenuOptionsInput$1 = Partial<Omit<TableMenuOptions, 'texts'>>;
declare class TableMenuContextmenu extends TableMenuCommon {
  tableModule: TableUp;
  quill: Quill;
  static moduleName: string;
  scrollHandler: [HTMLElement, (e: Event) => void][];
  constructor(tableModule: TableUp, quill: Quill, options: TableMenuOptionsInput$1);
  tableSelectioChange: (tableSelection: InternalTableSelectionModule) => void;
  listenContextmenu: (e: MouseEvent) => void;
  buildTools(): HTMLElement;
  createTipText(item: HTMLElement, text: string): void;
  show(): void;
  update(position?: Position): void;
  destroy(): void;
}
//#endregion
//#region src/modules/table-menu/table-menu-select.d.ts
declare class TableMenuSelect extends TableMenuCommon {
  tableModule: TableUp;
  quill: Quill;
  static moduleName: string;
  constructor(tableModule: TableUp, quill: Quill, options: TableMenuOptionsInput);
  tableSelectionDragStart: () => void;
  tableSelectionDragEnd: (tableSelection: InternalTableSelectionModule) => void;
  tableSelectioChange: (tableSelection: InternalTableSelectionModule, selectedTds: TableCellInnerFormat[]) => void;
  tableSelectionDisplayChange: (tableSelection: InternalTableSelectionModule) => void;
  buildTools(): HTMLElement;
  show(): void;
  update(): void;
  destroy(): void;
}
//#endregion
//#region src/modules/table-resize/table-resize-common.d.ts
declare class TableResizeCommonHelper {
  maxRange: number;
  minRange: number;
  startValue: number;
  dragBreak: HTMLElement | null;
  tableModule: TableUp;
  isX: boolean;
  constructor(tableModule: TableUp, isX: boolean);
  createBreak(): void;
  getOffsetFromStart(tableBlot?: TableMainFormat): number;
  limitRange(tableBlot: TableMainFormat | undefined, value: number, countScroll?: boolean): number;
}
declare class TableResizeCommon extends TableDomSelector {
  tableModule: TableUp;
  quill: Quill;
  tableBlot?: TableMainFormat;
  dragging: boolean;
  colIndex: number;
  rowIndex: number;
  dragXCommon: TableResizeCommonHelper;
  dragYCommon: TableResizeCommonHelper;
  constructor(tableModule: TableUp, quill: Quill);
  findDragColIndex(_cols: TableColFormat[]): number;
  calculateColDragRangeByFull(): void;
  calculateColDragRangeByFixed(): void;
  calculateColDragRange(): void;
  updateTableCol(left: number): Promise<void>;
  findDragRowIndex(_rows: TableRowFormat[]): number;
  calculateRowDragRange(): void;
  updateTableRow(top: number): void;
  removeBreak(): void;
}
//#endregion
//#region src/modules/table-resize/table-resize-drag.d.ts
declare class TableAutoScroller extends AutoScroller {
  minusY: number;
  minusX: number;
  checkMinY(containerRect: DOMRect): boolean;
  checkMinX(containerRect: DOMRect): boolean;
}
interface DragHelperOptions {
  isDragX: boolean;
  allowMoveToIndex?: (index: number) => boolean;
}
declare class DragTableHelper {
  startPosition: ({
    position: number;
    size: number;
    index: number;
  })[];
  selectedIndex: Set<number>;
  moveToIndex: number;
  tableModule: TableUp;
  tableBlot: TableMainFormat;
  dragCommon: TableResizeCommonHelper;
  options: DragHelperOptions;
  get isDragX(): boolean;
  constructor(tableModule: TableUp, tableBlot: TableMainFormat, dragCommon: TableResizeCommonHelper, options: DragHelperOptions);
  onStart(positionInfo: DragPosition, e: PointerEvent, callback?: (context: this) => void): false | undefined;
  onMove(positionInfo: DragPosition, e: PointerEvent, callback?: (context: this) => void): void;
  onEnd(positionInfo: DragPosition, e: PointerEvent, callback?: (context: this) => void): void;
  recalculateStartPosition(): void;
  findTheMovedToIndex(e: PointerEvent): number;
  updateTableStructure(content: Delta, isMoveMinus: boolean): Delta;
}
//#endregion
//#region src/modules/table-resize/table-resize-box.d.ts
declare class TableResizeBox extends TableResizeCommon {
  tableModule: TableUp;
  quill: Quill;
  static moduleName: string;
  options: TableResizeBoxOptions;
  root: HTMLElement;
  tableWrapperBlot?: TableWrapperFormat;
  resizeObserver?: ResizeObserver;
  rowHeadWrapper: HTMLElement | null;
  colHeadWrapper: HTMLElement | null;
  corner: HTMLElement | null;
  scrollHandler: [HTMLElement, (e: Event) => void][];
  lastHeaderSelect: {
    isX: boolean;
    index: number;
  } | null;
  bem: {
    b: () => string;
    be: (e?: string) => string;
    bm: (m?: string) => string;
    bem: (e?: string, m?: string) => string;
    ns: (s?: string) => string;
    bs: (s?: string) => string;
    cv: (v?: string) => string;
    is: (n: string) => string;
  };
  draggingColIndex: number;
  draggingRowIndex: number;
  stopColDrag: (() => void)[];
  stopRowDrag: (() => void)[];
  dragWrapper: HTMLElement | null;
  dragPlaceholder: HTMLElement | null;
  markIndicator: HTMLElement | null;
  dragTip: HTMLElement | null;
  stopColMoveDrag: (() => void)[];
  stopRowMoveDrag: (() => void)[];
  autoScroller: TableAutoScroller | null;
  updateContentDraggingPosition: () => void;
  cellSpanIndex: Set<number>;
  dragPlaceholderStartPosition: {
    x: number;
    y: number;
  };
  constructor(tableModule: TableUp, quill: Quill, options: Partial<TableResizeBoxOptions>);
  resolveOptions(options: Partial<TableResizeBoxOptions>): {
    size: number;
    draggable: boolean;
  } & Partial<TableResizeBoxOptions>;
  updateWrapperHead: () => void;
  updateWhenTextChange: (eventName: string) => void;
  setSelectionTable(table: HTMLTableElement | undefined): void;
  handleResizerHeaderClick(isX: boolean, index: number, e: MouseEvent): void;
  findDragColIndex(): number;
  findDragRowIndex(): number;
  updateContentDraggerPosition(dragHelper: DragTableHelper): void;
  createContentDragger(e: PointerEvent, isX: boolean, dragHelper: DragTableHelper): void;
  bindColEvents(): void;
  bindRowEvents(): void;
  allowMoveToIndex(index: number): boolean;
  recordCellSpan(isX: boolean): Set<number>;
  dragHeadOptions(isX: boolean, context: {
    index: number;
    dragHelper: DragTableHelper;
  }): Partial<DragElementOptions>;
  update(): void;
  show(): void;
  hide(): void;
  destroy(): void;
}
//#endregion
//#region src/modules/table-resize/table-resize-line.d.ts
declare class TableResizeLine extends TableResizeCommon {
  tableModule: TableUp;
  quill: Quill;
  static moduleName: string;
  colResizer?: HTMLElement;
  rowResizer?: HTMLElement;
  currentTableCell?: HTMLElement;
  tableCellBlot?: TableCellFormat;
  bem: {
    b: () => string;
    be: (e?: string) => string;
    bm: (m?: string) => string;
    bem: (e?: string, m?: string) => string;
    ns: (s?: string) => string;
    bs: (s?: string) => string;
    cv: (v?: string) => string;
    is: (n: string) => string;
  };
  stopColDrag?: () => void;
  stopRowDrag?: () => void;
  scrollHandler: [HTMLElement, (e: Event) => void][];
  constructor(tableModule: TableUp, quill: Quill);
  setSelectionTable(table: HTMLTableElement | undefined): void;
  updateWhenTextChange: (eventName: string) => void;
  findTableCell(e: MouseEvent): HTMLElement | null;
  pointermoveHandler: (e: MouseEvent) => void;
  findDragColIndex(cols: TableColFormat[]): number;
  updateColResizer(): void;
  findDragRowIndex(rows: TableRowFormat[]): number;
  updateRowResizer(): void;
  show(): void;
  hideResizer(): void;
  hide(): void;
  destroy(): void;
}
//#endregion
//#region src/modules/table-resize/table-resize-scale.d.ts
declare class TableResizeScale extends TableDomSelector {
  tableModule: TableUp;
  quill: Quill;
  static moduleName: string;
  scrollHandler: [HTMLElement, (e: Event) => void][];
  tableMainBlot?: TableMainFormat;
  tableWrapperBlot?: TableWrapperFormat;
  bem: {
    b: () => string;
    be: (e?: string) => string;
    bm: (m?: string) => string;
    bem: (e?: string, m?: string) => string;
    ns: (s?: string) => string;
    bs: (s?: string) => string;
    cv: (v?: string) => string;
    is: (n: string) => string;
  };
  options: TableResizeScaleOptions;
  root?: HTMLElement;
  block?: HTMLElement;
  resizeobserver: ResizeObserver;
  constructor(tableModule: TableUp, quill: Quill, options: Partial<TableResizeScaleOptions>);
  updateWhenTextChange: (eventName: string) => void;
  resolveOptions(options: Partial<TableResizeScaleOptions>): {
    blockSize: number;
    offset: number;
  } & Partial<TableResizeScaleOptions>;
  buildResizer(): void;
  update(): void;
  show(): void;
  hide(): void;
  destroy(): void;
}
//#endregion
//#region src/modules/table-resize/utils.d.ts
declare const isTableAlignRight: (tableMainBlot: TableMainFormat) => boolean;
declare function getColRect(cols: TableColFormat[], columnIndex: number): {
  left: number;
  right: number;
  width: number;
} | null;
declare function isCellsSpan(isX: boolean, tableBlot: TableMainFormat, cells: TableCellInnerFormat[]): {
  cellIndex: Set<number>;
  isSpan: boolean;
};
//#endregion
//#region src/modules/table-scrollbar.d.ts
declare const propertyMapY: {
  readonly size: "height";
  readonly offset: "offsetHeight";
  readonly scrollDirection: "scrollTop";
  readonly scrollSize: "scrollHeight";
  readonly axis: "y";
  readonly direction: "top";
  readonly client: "clientY";
};
declare const propertyMapX: {
  readonly size: "width";
  readonly offset: "offsetWidth";
  readonly scrollDirection: "scrollLeft";
  readonly scrollSize: "scrollWidth";
  readonly axis: "x";
  readonly direction: "left";
  readonly client: "clientX";
};
declare class Scrollbar {
  quill: Quill;
  table: HTMLElement;
  options: {
    isVertical: boolean;
  };
  minSize: number;
  gap: number;
  move: number;
  cursorDown: boolean;
  cursorLeave: boolean;
  ratioY: number;
  ratioX: number;
  sizeWidth: string;
  sizeHeight: string;
  size: string;
  bem: {
    b: () => string;
    be: (e?: string) => string;
    bm: (m?: string) => string;
    bem: (e?: string, m?: string) => string;
    ns: (s?: string) => string;
    bs: (s?: string) => string;
    cv: (v?: string) => string;
    is: (n: string) => string;
  };
  tableMainBlot: TableMainFormat;
  ob: ResizeObserver;
  container: HTMLElement;
  scrollbar: HTMLElement;
  thumb: HTMLElement;
  scrollHandler: [HTMLElement, (e: Event) => void][];
  propertyMap: typeof propertyMapY | typeof propertyMapX;
  thumbState: Position;
  get isVertical(): boolean;
  constructor(quill: Quill, table: HTMLElement, options: {
    isVertical: boolean;
  });
  update(): void;
  setScrollbarPosition(): void;
  calculateSize(): void;
  createScrollbar(): HTMLDivElement;
  containerScrollHandler(wrap: HTMLElement): void;
  showScrollbar: (this: any) => void;
  hideScrollbar: (this: any) => void;
  hideScrollbarTransitionend: () => void;
  destroy(): void;
}
declare class TableVirtualScrollbar extends TableDomSelector {
  tableModule: TableUp;
  quill: Quill;
  static moduleName: string;
  scrollbarContainer: HTMLElement;
  scrollbar: Scrollbar[];
  bem: {
    b: () => string;
    be: (e?: string) => string;
    bm: (m?: string) => string;
    bem: (e?: string, m?: string) => string;
    ns: (s?: string) => string;
    bs: (s?: string) => string;
    cv: (v?: string) => string;
    is: (n: string) => string;
  };
  constructor(tableModule: TableUp, quill: Quill, _options: any);
  updateWhenTextChange: (eventName: string) => void;
  hide(): void;
  show(): void;
  update(): void;
  destroy(): void;
}
//#endregion
//#region src/modules/table-selection.d.ts
interface SelectionData {
  anchorNode: Node | null;
  anchorOffset: number;
  focusNode: Node | null;
  focusOffset: number;
}
declare class TableSelection extends TableDomSelector {
  tableModule: TableUp;
  quill: Quill;
  static moduleName: string;
  options: TableSelectionOptions;
  boundary: RelactiveRect | null;
  scrollRecordEls: HTMLElement[];
  startScrollRecordPosition: Position[];
  selectedTableScrollX: number;
  selectedTableScrollY: number;
  selectedEditorScrollX: number;
  selectedEditorScrollY: number;
  selectedTds: TableCellInnerFormat[];
  cellSelectWrap: HTMLElement;
  cellSelect: HTMLElement;
  scrollHandler: [HTMLElement, (...args: any[]) => void][];
  resizeObserver: ResizeObserver;
  isDisplaySelection: boolean;
  bem: {
    b: () => string;
    be: (e?: string) => string;
    bm: (m?: string) => string;
    bem: (e?: string, m?: string) => string;
    ns: (s?: string) => string;
    bs: (s?: string) => string;
    cv: (v?: string) => string;
    is: (n: string) => string;
  };
  autoScroller: AutoScroller;
  lastSelection: SelectionData;
  _dragging: boolean;
  set dragging(val: boolean);
  get dragging(): boolean;
  constructor(tableModule: TableUp, quill: Quill, options?: Partial<TableSelectionOptions>);
  handlePaste: (event: ClipboardEvent) => void;
  keyboardHandler: (e: KeyboardEvent) => Promise<void>;
  updateWhenTextChange: (eventName: string) => void;
  updateAfterEvent: () => void;
  removeCellBySelectedTds(): void;
  setSelectedTds(tds: TableCellInnerFormat[]): void;
  quillSelectionChangeHandler: (range: Range | null, _oldRange: Range | null, source: EmitterSource) => void;
  setSelectionData(selection: Selection, selectionData: SelectionData): void;
  selectionDirectionUp(selection: SelectionData): boolean;
  resolveOptions(options: Partial<TableSelectionOptions>): TableSelectionOptions;
  getSelectedTdsFormat(): Record<string, any>;
  selectionChangeHandler: () => void;
  helpLinesInitial(): HTMLDivElement;
  computeSelectedTds(startPoint: Position, endPoint: Position): TableCellInnerFormat[];
  getScrollPositionDiff(): Position;
  recordScrollPosition(): void;
  clearRecordScrollPosition(): void;
  tableSelectHandler(mousedownEvent: MouseEvent): void;
  updateWithSelectedTds(): void;
  update(): void;
  getTableViewScroll(): {
    y: number;
    x: number;
  };
  setSelectionTable(table: HTMLTableElement | undefined): void;
  showDisplay(): void;
  show(): void;
  hideDisplay(): void;
  hide(): void;
  destroy(): void;
}
//#endregion
//#region src/utils/types.d.ts
type QuillThemePicker = (Picker & {
  options: HTMLElement;
});
interface QuillTheme extends BaseTheme {
  pickers: QuillThemePicker[];
}
interface ToolOption {
  name: string;
  icon: string | ((tableModule: TableUp) => HTMLElement);
  tip?: string;
  isColorChoose?: boolean;
  key?: string;
  handle: (this: TableMenuCommon, tableModule: TableUp, selectedTds: TableCellInnerFormat[], e: Event | string | null) => void;
}
interface ToolOptionBreak {
  name: 'break';
}
type Tool = ToolOption | ToolOptionBreak;
interface TableMenuOptions {
  tipText: boolean;
  tools: Tool[];
  localstorageKey: string;
  defaultColorMap: string[];
}
interface TableSelectionOptions {
  selectColor: string;
}
interface TableResizeScaleOptions {
  blockSize: number;
  offset: number;
}
interface TableResizeBoxOptions {
  size: number;
  draggable: boolean;
}
interface TableCreatorTextOptions {
  fullCheckboxText: string;
  customBtnText: string;
  confirmText: string;
  cancelText: string;
  rowText: string;
  colText: string;
  notPositiveNumberError: string;
  perWidthInsufficient: string;
}
type TableMenuTexts = Record<string, string>;
interface TableTextOptions extends TableCreatorTextOptions, TableMenuTexts {
  custom: string;
  clear: string;
  transparent: string;
  perWidthInsufficient: string;
}
type TableTextOptionsInput = Partial<TableTextOptions> | ((this: TableUp, key: string) => string);
interface TableUpExtraModule extends Constructor<any, [TableUp, Quill, any]> {
  moduleName: string;
}
interface TableUpModule {
  module: TableUpExtraModule;
  options?: any;
}
interface TableUpOptions {
  customSelect?: (tableModule: TableUp, picker: QuillThemePicker) => Promise<HTMLElement> | HTMLElement;
  full: boolean;
  fullSwitch: boolean;
  customBtn: boolean;
  texts: TableTextOptions;
  icon: string;
  autoMergeCell: boolean;
  pasteStyleSheet: boolean;
  pasteDefaultTagStyle: boolean;
  modules: TableUpModule[];
}
interface TableUpOptionsInput extends Partial<Omit<TableUpOptions, 'texts'>> {
  texts?: TableTextOptionsInput;
}
interface TableColValue {
  tableId: string;
  colId: string;
  width: number;
  full?: boolean;
  align?: string;
}
type TableBodyTag = 'thead' | 'tbody' | 'tfoot';
interface TableCellValue {
  tableId: string;
  rowId: string;
  colId: string;
  rowspan: number;
  colspan: number;
  style?: string;
  emptyRow?: string[];
  tag?: 'td' | 'th';
  wrapTag?: TableBodyTag;
}
interface TableRowValue {
  tableId: string;
  rowId: string;
  wrapTag?: TableBodyTag;
}
interface TableCaptionValue {
  tableId: string;
  side: 'top' | 'bottom';
}
interface TableValue {
  tableId: string;
  full?: boolean;
  align?: string;
}
interface Position {
  x: number;
  y: number;
}
interface RelactiveRect {
  x: number;
  y: number;
  x1: number;
  y1: number;
  width: number;
  height: number;
}
interface InternalModule {
  table?: HTMLElement;
  show: () => void;
  hide: () => void;
  update: () => void;
  destroy: () => void;
}
type Constructor<T = any, U extends Array<any> = any[]> = new (...args: U) => T;
interface InternalTableSelectionModule extends InternalModule {
  dragging: boolean;
  boundary: RelactiveRect | null;
  selectedTds: TableCellInnerFormat[];
  cellSelect: HTMLElement;
  isDisplaySelection: boolean;
  tableMenu?: InternalModule;
  computeSelectedTds: (startPoint: Position, endPoint: Position) => TableCellInnerFormat[];
  setSelectedTds: (tds: TableCellInnerFormat[]) => void;
  updateWithSelectedTds: () => void;
  showDisplay: () => void;
  hideDisplay: () => void;
}
interface InternalTableMenuModule extends InternalModule {
  isMenuDisplay: boolean;
  activeTooltip: MenuTooltipInstance | null;
}
type Writable<T> = { -readonly [P in keyof T]: T[P] };
interface TableConstantsData {
  blotName: Partial<Record<keyof Writable<typeof blotName>, string>>;
  tableUpSize: Partial<typeof tableUpSize>;
  tableUpEvent: Partial<typeof tableUpEvent>;
  tableUpInternal: Partial<typeof tableUpInternal>;
}
//#endregion
//#region src/utils/blot-helper.d.ts
interface ParentBlotReturnMap {
  [blotName.tableWrapper]: TableWrapperFormat;
  [blotName.tableMain]: TableMainFormat;
  [blotName.tableCol]: TableColFormat;
  [blotName.tableColgroup]: TableColgroupFormat;
  [blotName.tableBody]: TableBodyFormat;
  [blotName.tableRow]: TableRowFormat;
  [blotName.tableCell]: TableCellFormat;
  [blotName.tableCellInner]: TableCellInnerFormat;
}
type ParentBlotReturn = {
  [key: string]: Parchment.Parent;
} & ParentBlotReturnMap;
declare function findParentBlot<T extends Parchment.Parent, U extends string = string>(blot: Parchment.Blot, targetBlotName: U): U extends keyof ParentBlotReturn ? ParentBlotReturn[U] : T;
declare function findParentBlots<T extends (keyof ParentBlotReturnMap | string)[]>(blot: Parchment.Blot, targetBlotNames: T): { [K in keyof T]: ParentBlotReturn[T[K]] };
//#endregion
//#region src/utils/components/color-picker.d.ts
interface ColorPickerOptions {
  color: string;
  onChange: (color: string) => void;
}
declare function createColorPicker(options?: Partial<ColorPickerOptions>): HTMLDivElement;
//#endregion
//#region src/utils/components/table/select-box.d.ts
interface TableSelectOptions {
  row: number;
  col: number;
  onSelect: (row: number, col: number) => void;
  customBtn: boolean;
  texts: Partial<TableCreatorTextOptions>;
}
declare function createSelectBox(options?: Partial<TableSelectOptions>): HTMLSpanElement;
//#endregion
//#region src/utils/components/tooltip.d.ts
interface ToolTipOptions {
  direction?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
  msg?: string;
  delay?: number;
  content?: HTMLElement;
  container?: HTMLElement;
  type?: 'hover' | 'click';
  onOpen?: (force?: boolean) => boolean;
  onClose?: (force?: boolean) => boolean;
  closed?: () => void;
  onDestroy?: () => void;
}
interface TooltipInstance {
  destroy: () => void;
  show: (force?: boolean) => void;
  hide: (force?: boolean) => void;
}
declare function createTooltip(target: HTMLElement, options?: ToolTipOptions): TooltipInstance | null;
//#endregion
//#region src/utils/drag-helper.d.ts
interface DragPosition {
  startPosition: Position;
  position: Position;
  movePosition: Position;
}
interface DragElementOptions {
  axis: 'x' | 'y' | 'both';
  onStart: (position: DragPosition, e: PointerEvent) => void | boolean;
  onMove: (position: DragPosition, e: PointerEvent) => void;
  onEnd: (position: DragPosition, e: PointerEvent) => void;
  buttons: number[];
  container: HTMLElement;
  draggingElement: HTMLElement | Window | Document;
  exact: boolean;
}
//#endregion
//#region src/utils/scroll.d.ts
declare class AutoScroller {
  scrollThresholdX: number;
  scrollThresholdY: number;
  maxScrollSpeed: number;
  mouseY: number;
  mouseX: number;
  private animationId;
  constructor(scrollThresholdX?: number, scrollThresholdY?: number, maxScrollSpeed?: number);
  checkMinY(containerRect: DOMRect): boolean;
  checkMaxY(containerRect: DOMRect): boolean;
  checkMinX(containerRect: DOMRect): boolean;
  checkMaxX(containerRect: DOMRect): boolean;
  start(container: HTMLElement, onScroll?: (speedX: number, speedY: number) => void): void;
  updateMousePosition(x: number, y: number): void;
  stop(): void;
}
//#endregion
//#region src/utils/utils.d.ts
declare const randomId: () => string;
//#endregion
//#region src/table-up.d.ts
declare function updateTableConstants(data: Partial<TableConstantsData>): void;
declare function defaultCustomSelect(tableModule: TableUp, picker: QuillThemePicker): HTMLSpanElement;
declare class TableUp {
  static moduleName: string;
  static toolName: string;
  static keyboradHandler: {
    'forbid remove table by backspace': {
      bindInHead: boolean;
      key: string;
      collapsed: boolean;
      offset: number;
      handler(this: {
        quill: Quill;
      }, range: Range, context: Context): boolean;
    };
    'forbid remove table by delete': {
      bindInHead: boolean;
      key: string;
      collapsed: boolean;
      handler(this: {
        quill: Quill;
      }, range: Range, context: Context): boolean;
    };
    'table up': {
      bindInHead: boolean;
      key: string;
      collapsed: boolean;
      format: "table-up-cell-inner"[];
      handler(this: {
        quill: Quill;
      }, range: Range, context: Context): boolean;
    };
    'table down': {
      bindInHead: boolean;
      key: string;
      collapsed: boolean;
      format: "table-up-cell-inner"[];
      handler(this: {
        quill: Quill;
      }, range: Range, context: Context): boolean;
    };
    'table caption break': {
      bindInHead: boolean;
      key: string;
      shiftKey: null;
      format: "table-up-caption"[];
      handler(this: {
        quill: Quill;
      }, _range: Range, _context: Context): boolean;
    };
  };
  static register(): void;
  quill: Quill;
  options: TableUpOptions;
  textOptionsInput: TableTextOptionsInput | undefined;
  toolBox: HTMLDivElement;
  fixTableByLisenter: (this: any) => void;
  selector?: HTMLElement;
  resizeOb: ResizeObserver;
  editableObserver: MutationObserver;
  modules: Record<string, Constructor>;
  get statics(): any;
  constructor(quill: Quill, options: TableUpOptionsInput);
  initialContainer(): HTMLDivElement;
  addContainer(classes: string | HTMLElement): HTMLElement;
  getToolbarPicker(): QuillThemePicker | undefined;
  resolveOptions(options: TableUpOptionsInput): TableUpOptions;
  resolveTexts(options?: TableTextOptionsInput): TableTextOptions;
  refreshUI(): Promise<void>;
  initModules(): void;
  listenEditableChange(): void;
  destroyModules(): void;
  getModule<T>(name: string): T | undefined;
  quillHack(): void;
  buildCustomSelect(customSelect: ((module: TableUp, picker: QuillThemePicker) => HTMLElement | Promise<HTMLElement>) | undefined, picker: QuillThemePicker): Promise<void>;
  setCellAttrs(selectedTds: TableCellInnerFormat[], attr: string, value?: any, isStyle?: boolean): void;
  getTextByCell(tds: TableCellInnerFormat[]): string;
  getHTMLByCell(tds: TableCellInnerFormat[], isCut?: boolean): string;
  insertTable(rows: number, columns: number, source?: EmitterSource): void;
  calculateTableCellBorderWidth(): number;
  fixUnusuaDeletelTable(tableBlot: TableMainFormat): void;
  balanceTables(): void;
  listenBalanceCells(): void;
  deleteTable(selectedTds: TableCellInnerFormat[]): void;
  appendRow(selectedTds: TableCellInnerFormat[], isDown: boolean): void;
  appendCol(selectedTds: TableCellInnerFormat[], isRight: boolean): void;
  /**
   * after insert or remove cell. handle cell colspan and rowspan merge
   */
  fixTableByRemove(tableBlot: TableMainFormat): void;
  removeRow(selectedTds: TableCellInnerFormat[]): void;
  removeCol(selectedTds: TableCellInnerFormat[]): void;
  mergeCells(selectedTds: TableCellInnerFormat[]): void;
  splitCell(selectedTds: TableCellInnerFormat[]): void;
  convertTableBodyByCells(tableBlot: TableMainFormat, selecteds: TableCellInnerFormat[], tag: TableBodyTag): void;
}
//#endregion
export { BlockEmbedOverride, BlockOverride, ClipboardOptions, Constructor, ContainerFormat, InternalModule, InternalTableMenuModule, InternalTableSelectionModule, Matcher, MenuTooltipInstance, Position, QuillTheme, QuillThemePicker, RelactiveRect, ScrollOverride, Scrollbar, SelectionData, Selector, SkipRowCount, TableAlign, TableBodyFormat, TableBodyTag, TableCaptionFormat, TableCaptionValue, TableCellFormat, TableCellInnerFormat, TableCellValue, TableClipboard, TableColFormat, TableColValue, TableColgroupFormat, TableConstantsData, TableCreatorTextOptions, TableDomSelector, TableFootFormat, TableHeadFormat, TableMainFormat, TableMenuCommon, TableMenuContextmenu, TableMenuOptions, TableMenuOptionsInput, TableMenuSelect, TableMenuTexts, TableModuleLifecycle, TableResizeBox, TableResizeBoxOptions, TableResizeCommon, TableResizeCommonHelper, TableResizeLine, TableResizeScale, TableResizeScaleOptions, TableRowFormat, TableRowValue, TableSelection, TableSelectionOptions, TableTextOptions, TableTextOptionsInput, TableUp, TableUp as default, TableUpExtraModule, TableUpModule, TableUpOptions, TableUpOptionsInput, TableValue, TableVirtualScrollbar, TableWrapperFormat, Tool, ToolOption, ToolOptionBreak, Writable, applyCellUpdates, blotName, createColorPicker, createSelectBox, createTooltip, defaultCustomSelect, findParentBlot, findParentBlots, getCellPositions, getColRect, getCountByPosition, getTableCellStructure, getTableMainRect, groupCellByRow, isCellsSpan, isTableAlignRight, parsePasteDelta, pasteCells, pasteWithLoop, pasteWithStructure, prepareCellUpdate, randomId, removeOverlappingCells, tableMenuTools, tableUpEvent, tableUpInternal, tableUpSize, updateTableConstants };
//# sourceMappingURL=index.d.ts.map