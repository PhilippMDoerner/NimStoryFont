import { signal, computed, KeyboardEventManager } from './_violations-chunk.mjs';
import { List } from './_list-chunk.mjs';

class ToolbarPattern {
  inputs;
  listBehavior;
  hasBeenInteracted = signal(false);
  orientation;
  softDisabled;
  disabled = computed(() => this.listBehavior.disabled());
  tabIndex = computed(() => this.listBehavior.tabIndex());
  activeDescendant = computed(() => this.listBehavior.activeDescendant());
  activeItem = () => this.listBehavior.inputs.activeItem();
  _prevKey = computed(() => {
    if (this.inputs.orientation() === 'vertical') {
      return 'ArrowUp';
    }
    return this.inputs.textDirection() === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  });
  _nextKey = computed(() => {
    if (this.inputs.orientation() === 'vertical') {
      return 'ArrowDown';
    }
    return this.inputs.textDirection() === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  });
  _altPrevKey = computed(() => {
    if (this.inputs.orientation() === 'vertical') {
      return this.inputs.textDirection() === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    }
    return 'ArrowUp';
  });
  _altNextKey = computed(() => {
    if (this.inputs.orientation() === 'vertical') {
      return this.inputs.textDirection() === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    }
    return 'ArrowDown';
  });
  _keydown = computed(() => {
    const manager = new KeyboardEventManager();
    return manager.on(this._nextKey, () => this.listBehavior.next(), {
      ignoreRepeat: false
    }).on(this._prevKey, () => this.listBehavior.prev(), {
      ignoreRepeat: false
    }).on(this._altNextKey, () => this._groupNext(), {
      ignoreRepeat: false
    }).on(this._altPrevKey, () => this._groupPrev(), {
      ignoreRepeat: false
    }).on(' ', () => this.select()).on('Enter', () => this.select()).on('Home', () => this.listBehavior.first()).on('End', () => this.listBehavior.last());
  });
  _groupNext() {
    const currGroup = this.inputs.activeItem()?.group();
    const nextGroup = this.listBehavior.navigationBehavior.peekNext()?.group();
    if (!currGroup) {
      return;
    }
    if (currGroup !== nextGroup) {
      this.listBehavior.goto(this.listBehavior.navigationBehavior.peekFirst({
        items: currGroup.inputs.items()
      }));
      return;
    }
    this.listBehavior.next();
  }
  _groupPrev() {
    const currGroup = this.inputs.activeItem()?.group();
    const nextGroup = this.listBehavior.navigationBehavior.peekPrev()?.group();
    if (!currGroup) {
      return;
    }
    if (currGroup !== nextGroup) {
      this.listBehavior.goto(this.listBehavior.navigationBehavior.peekLast({
        items: currGroup.inputs.items()
      }));
      return;
    }
    this.listBehavior.prev();
  }
  _goto(e) {
    const item = this.inputs.getItem(e.target);
    if (item) {
      this.listBehavior.goto(item);
      this.select();
    }
  }
  select() {
    const group = this.inputs.activeItem()?.group();
    if (!group?.multi()) {
      group?.inputs.items().forEach(i => this.listBehavior.deselect(i));
    }
    this.listBehavior.toggle();
  }
  constructor(inputs) {
    this.inputs = inputs;
    this.orientation = inputs.orientation;
    this.softDisabled = inputs.softDisabled;
    this.listBehavior = new List({
      ...inputs,
      multi: () => true,
      focusMode: () => 'roving',
      selectionMode: () => 'explicit',
      typeaheadDelay: () => 0
    });
  }
  validate() {
    const violations = [];
    const values = this.inputs.items().map(w => w.value());
    const duplicates = values.filter((val, idx) => values.indexOf(val) !== idx);
    if (duplicates.length > 0) {
      violations.push(`Duplicate value '${duplicates[0]}' detected inside ngToolbar.`);
    }
    return violations;
  }
  onKeydown(event) {
    if (this.disabled()) return;
    this.hasBeenInteracted.set(true);
    this._keydown().handle(event);
  }
  onPointerdown(event) {
    this.hasBeenInteracted.set(true);
    event.preventDefault();
  }
  onFocusIn() {
    this.hasBeenInteracted.set(true);
  }
  onClick(event) {
    if (this.disabled() || event.pointerType === '') return;
    this._goto(event);
  }
  setDefaultState() {
    const firstItem = this.listBehavior.navigationBehavior.peekFirst({
      items: this.inputs.items()
    });
    if (firstItem) {
      this.inputs.activeItem.set(firstItem);
    }
  }
  setDefaultStateEffect() {
    if (this.hasBeenInteracted()) return;
    if (this.inputs.items().length > 0) {
      this.setDefaultState();
    }
  }
}

class ToolbarWidgetPattern {
  inputs;
  id = () => this.inputs.id();
  element = () => this.inputs.element();
  disabled = () => this.inputs.disabled() || this.group()?.disabled() || false;
  group = () => this.inputs.group();
  toolbar = () => this.inputs.toolbar();
  tabIndex = computed(() => this.toolbar().listBehavior.getItemTabindex(this));
  searchTerm = () => '';
  value = () => this.inputs.value();
  selectable = () => true;
  index = computed(() => this.toolbar().inputs.items().indexOf(this) ?? -1);
  selected = computed(() => this.toolbar().listBehavior.inputs.value().includes(this.value()));
  active = computed(() => this.toolbar().activeItem() === this);
  constructor(inputs) {
    this.inputs = inputs;
  }
}

class ToolbarWidgetGroupPattern {
  inputs;
  disabled = () => this.inputs.disabled();
  toolbar = () => this.inputs.toolbar();
  multi = () => this.inputs.multi();
  searchTerm = () => '';
  value = () => '';
  selectable = () => true;
  element = () => undefined;
  constructor(inputs) {
    this.inputs = inputs;
  }
}

export { ToolbarPattern, ToolbarWidgetGroupPattern, ToolbarWidgetPattern };
//# sourceMappingURL=_toolbar-widget-group-chunk.mjs.map
