import { signal, computed } from './_violations-chunk.mjs';

class ListSelection {
  inputs;
  rangeStartIndex = signal(0);
  rangeEndIndex = signal(0);
  selectedItems = computed(() => this.inputs.items().filter(item => this.inputs.value().includes(item.value())));
  constructor(inputs) {
    this.inputs = inputs;
  }
  select(item, opts = {
    anchor: true
  }) {
    item = item ?? this.inputs.focusManager.inputs.activeItem();
    if (!item || item.disabled() || !item.selectable() || !this.inputs.focusManager.isFocusable(item) || this.inputs.value().includes(item.value())) {
      return;
    }
    if (!this.inputs.multi()) {
      this.deselectAll();
    }
    const index = this.inputs.items().findIndex(i => i === item);
    if (opts.anchor) {
      this.beginRangeSelection(index);
    }
    this.inputs.value.update(values => values.concat(item.value()));
  }
  deselect(item) {
    item = item ?? this.inputs.focusManager.inputs.activeItem();
    if (item && !item.disabled() && item.selectable()) {
      this.inputs.value.update(values => values.filter(value => value !== item.value()));
    }
  }
  toggle(item) {
    item = item ?? this.inputs.focusManager.inputs.activeItem();
    if (item) {
      this.inputs.value().includes(item.value()) ? this.deselect(item) : this.select(item);
    }
  }
  toggleOne() {
    const item = this.inputs.focusManager.inputs.activeItem();
    if (item) {
      this.inputs.value().includes(item.value()) ? this.deselect() : this.selectOne();
    }
  }
  selectAll() {
    if (!this.inputs.multi()) {
      return;
    }
    for (const item of this.inputs.items()) {
      this.select(item, {
        anchor: false
      });
    }
    this.beginRangeSelection();
  }
  deselectAll() {
    for (const value of this.inputs.value()) {
      const item = this.inputs.items().find(i => i.value() === value);
      item ? this.deselect(item) : this.inputs.value.update(values => values.filter(v => v !== value));
    }
  }
  toggleAll() {
    const selectableValues = this.inputs.items().filter(i => !i.disabled() && i.selectable() && this.inputs.focusManager.isFocusable(i)).map(i => i.value());
    selectableValues.every(i => this.inputs.value().includes(i)) ? this.deselectAll() : this.selectAll();
  }
  selectOne() {
    const item = this.inputs.focusManager.inputs.activeItem();
    if (item && (item.disabled() || !item.selectable())) {
      return;
    }
    this.deselectAll();
    if (this.inputs.value().length > 0 && !this.inputs.multi()) {
      return;
    }
    this.select();
  }
  selectRange(opts = {
    anchor: true
  }) {
    const isStartOfRange = this.inputs.focusManager.prevActiveIndex() === this.rangeStartIndex();
    if (isStartOfRange && opts.anchor) {
      this.beginRangeSelection(this.inputs.focusManager.prevActiveIndex());
    }
    const itemsInRange = this._getItemsFromIndex(this.rangeStartIndex());
    const itemsOutOfRange = this._getItemsFromIndex(this.rangeEndIndex()).filter(i => !itemsInRange.includes(i));
    for (const item of itemsOutOfRange) {
      this.deselect(item);
    }
    for (const item of itemsInRange) {
      this.select(item, {
        anchor: false
      });
    }
    if (itemsInRange.length) {
      const item = itemsInRange.pop();
      const index = this.inputs.items().findIndex(i => i === item);
      this.rangeEndIndex.set(index);
    }
  }
  beginRangeSelection(index = this.inputs.focusManager.activeIndex()) {
    this.rangeStartIndex.set(index);
    this.rangeEndIndex.set(index);
  }
  _getItemsFromIndex(index) {
    if (index === -1) {
      return [];
    }
    const upper = Math.max(this.inputs.focusManager.activeIndex(), index);
    const lower = Math.min(this.inputs.focusManager.activeIndex(), index);
    const items = [];
    for (let i = lower; i <= upper; i++) {
      items.push(this.inputs.items()[i]);
    }
    if (this.inputs.focusManager.activeIndex() < index) {
      return items.reverse();
    }
    return items;
  }
}

class ListTypeahead {
  inputs;
  timeout;
  focusManager;
  isTyping = computed(() => this._query().length > 0);
  _query = signal('');
  _startIndex = signal(undefined);
  constructor(inputs) {
    this.inputs = inputs;
    this.focusManager = inputs.focusManager;
  }
  search(char) {
    if (char.length !== 1) {
      return false;
    }
    if (!this.isTyping() && char === ' ') {
      return false;
    }
    if (this._startIndex() === undefined) {
      this._startIndex.set(this.focusManager.activeIndex());
    }
    clearTimeout(this.timeout);
    this._query.update(q => q + char.toLowerCase());
    const item = this._getItem();
    if (item) {
      this.focusManager.focus(item);
    }
    this.timeout = setTimeout(() => {
      this._query.set('');
      this._startIndex.set(undefined);
    }, this.inputs.typeaheadDelay());
    return true;
  }
  _getItem() {
    const items = this.focusManager.inputs.items();
    const itemCount = items.length;
    const startIndex = this._startIndex();
    for (let i = 0; i < itemCount; i++) {
      const index = (startIndex + 1 + i) % itemCount;
      const item = items[index];
      if (this.focusManager.isFocusable(item) && item.searchTerm().toLowerCase().startsWith(this._query())) {
        return item;
      }
    }
    return undefined;
  }
}

export { ListSelection, ListTypeahead };
//# sourceMappingURL=_list-typeahead-chunk.mjs.map
