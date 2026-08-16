import { computed, signal, KeyboardEventManager, Modifier } from './_violations-chunk.mjs';
import { ListExpansion } from './_expansion-chunk.mjs';
import { ListNavigation, ListFocus } from './_list-navigation-chunk.mjs';
import { ListSelection, ListTypeahead } from './_list-typeahead-chunk.mjs';
import { ClickEventManager } from './_click-event-manager-chunk.mjs';

class TreeListFocus extends ListFocus {
  isFocusable(item) {
    return super.isFocusable(item) && item.visible();
  }
}
class Tree {
  inputs;
  navigationBehavior;
  selectionBehavior;
  typeaheadBehavior;
  focusBehavior;
  expansionBehavior;
  disabled = computed(() => this.focusBehavior.isListDisabled());
  activeDescendant = computed(() => this.focusBehavior.getActiveDescendant());
  tabIndex = computed(() => this.focusBehavior.getListTabIndex());
  activeIndex = computed(() => this.focusBehavior.activeIndex());
  _anchorIndex = signal(0);
  _wrap = signal(true);
  constructor(inputs) {
    this.inputs = inputs;
    this.focusBehavior = new TreeListFocus(inputs);
    this.selectionBehavior = new ListSelection({
      ...inputs,
      focusManager: this.focusBehavior
    });
    this.typeaheadBehavior = new ListTypeahead({
      ...inputs,
      focusManager: this.focusBehavior
    });
    this.expansionBehavior = new ListExpansion(inputs);
    this.navigationBehavior = new ListNavigation({
      ...inputs,
      focusManager: this.focusBehavior,
      wrap: computed(() => this._wrap() && this.inputs.wrap())
    });
  }
  getItemTabindex(item) {
    return this.focusBehavior.getItemTabIndex(item);
  }
  first(opts) {
    this._navigate(opts, () => this.navigationBehavior.first(opts));
  }
  last(opts) {
    this._navigate(opts, () => this.navigationBehavior.last(opts));
  }
  next(opts) {
    this._navigate(opts, () => this.navigationBehavior.next(opts));
  }
  prev(opts) {
    this._navigate(opts, () => this.navigationBehavior.prev(opts));
  }
  firstChild(opts) {
    this._navigate(opts, () => {
      const item = this.inputs.activeItem();
      const items = item?.children?.() ?? [];
      return this.navigationBehavior.first({
        items,
        ...opts
      });
    });
  }
  lastChild(opts) {
    this._navigate(opts, () => {
      const item = this.inputs.activeItem();
      const items = item?.children?.() ?? [];
      return this.navigationBehavior.last({
        items,
        ...opts
      });
    });
  }
  nextSibling(opts) {
    this._navigate(opts, () => {
      const item = this.inputs.activeItem();
      const items = item?.parent?.()?.children?.() ?? [];
      return this.navigationBehavior.next({
        items,
        ...opts
      });
    });
  }
  prevSibling(opts) {
    this._navigate(opts, () => {
      const item = this.inputs.activeItem();
      const items = item?.parent?.()?.children?.() ?? [];
      return this.navigationBehavior.prev({
        items,
        ...opts
      });
    });
  }
  parent(opts) {
    this._navigate(opts, () => this.navigationBehavior.goto(this.inputs.activeItem()?.parent?.(), opts));
  }
  goto(item, opts) {
    this._navigate(opts, () => this.navigationBehavior.goto(item, opts));
  }
  unfocus() {
    this.inputs.activeItem.set(undefined);
  }
  anchor(index) {
    this._anchorIndex.set(index);
  }
  search(char, opts) {
    this._navigate(opts, () => this.typeaheadBehavior.search(char));
  }
  isTyping() {
    return this.typeaheadBehavior.isTyping();
  }
  select(item) {
    this.selectionBehavior.select(item);
  }
  selectOne() {
    this.selectionBehavior.selectOne();
  }
  deselect(item) {
    this.selectionBehavior.deselect(item);
  }
  deselectAll() {
    this.selectionBehavior.deselectAll();
  }
  toggle(item) {
    this.selectionBehavior.toggle(item);
  }
  toggleOne() {
    this.selectionBehavior.toggleOne();
  }
  toggleAll() {
    this.selectionBehavior.toggleAll();
  }
  toggleExpansion(item) {
    item ??= this.inputs.activeItem();
    if (!item || !this.isFocusable(item)) return;
    if (this.isExpandable(item)) {
      this.expansionBehavior.toggle(item);
    }
  }
  expand(item) {
    if (this.isExpandable(item)) {
      this.expansionBehavior.open(item);
    }
  }
  collapse(item) {
    this.expansionBehavior.close(item);
  }
  expandSiblings(item) {
    item ??= this.inputs.activeItem();
    if (!item) return;
    const parent = item.parent?.();
    const siblings = parent ? parent.children?.() : this.inputs.items().filter(i => !i.parent?.());
    siblings?.forEach(s => this.expand(s));
  }
  expandAll() {
    this.expansionBehavior.openAll();
  }
  collapseAll() {
    this.expansionBehavior.closeAll();
  }
  isFocusable(item) {
    return this.focusBehavior.isFocusable(item);
  }
  isExpandable(item) {
    return this.expansionBehavior.isExpandable(item);
  }
  updateSelection(opts = {
    anchor: true
  }) {
    if (opts.toggle) {
      this.selectionBehavior.toggle();
    }
    if (opts.select) {
      this.selectionBehavior.select();
    }
    if (opts.selectOne) {
      this.selectionBehavior.selectOne();
    }
    if (opts.selectRange) {
      this.selectionBehavior.selectRange();
    }
    if (!opts.anchor) {
      this.anchor(this.selectionBehavior.rangeStartIndex());
    }
  }
  _navigate(opts = {}, operation) {
    if (opts?.selectRange) {
      this._wrap.set(false);
      this.selectionBehavior.rangeStartIndex.set(this._anchorIndex());
    }
    const moved = operation();
    if (moved) {
      this.updateSelection(opts);
    }
    this._wrap.set(true);
  }
}

class TreeItemPattern {
  inputs;
  id = () => this.inputs.id();
  value = () => this.inputs.value();
  element = () => this.inputs.element();
  disabled = () => this.inputs.disabled();
  searchTerm = () => this.inputs.searchTerm();
  tree = () => this.inputs.tree();
  parent = computed(() => {
    const parent = this.inputs.parent();
    return parent instanceof TreeItemPattern ? parent : undefined;
  });
  children = () => this.inputs.children() ?? [];
  index = computed(() => this.tree().inputs.items().indexOf(this));
  expandable = () => this.inputs.hasChildren();
  selectable = () => this.inputs.selectable();
  expanded;
  level = computed(() => this.inputs.parent().level() + 1);
  visible = computed(() => this.inputs.parent().expanded() && this.inputs.parent().visible());
  setsize = computed(() => this.inputs.parent().children().length);
  posinset = computed(() => this.inputs.parent().children().indexOf(this) + 1);
  active = computed(() => this.tree().activeItem() === this);
  tabIndex = computed(() => this.tree().treeBehavior.getItemTabindex(this));
  selected = computed(() => {
    if (this.tree().nav()) {
      return undefined;
    }
    if (!this.selectable()) {
      return undefined;
    }
    return this.tree().value().includes(this.value());
  });
  current = computed(() => {
    if (!this.tree().nav()) {
      return undefined;
    }
    if (!this.selectable()) {
      return undefined;
    }
    return this.tree().value().includes(this.value()) ? this.tree().currentType() : undefined;
  });
  constructor(inputs) {
    this.inputs = inputs;
    this.expanded = inputs.expanded;
  }
}
class TreePattern {
  inputs;
  treeBehavior;
  hasBeenInteracted = signal(false);
  level = () => 0;
  expanded = () => true;
  visible = () => true;
  tabIndex = computed(() => this.treeBehavior.tabIndex());
  activeDescendant = computed(() => this.treeBehavior.activeDescendant());
  children = computed(() => this.inputs.items().filter(item => item.level() === this.level() + 1));
  followFocus = computed(() => this.inputs.selectionMode() === 'follow');
  isRtl = computed(() => this.textDirection() === 'rtl');
  prevKey = computed(() => {
    if (this.inputs.orientation() === 'vertical') {
      return 'ArrowUp';
    }
    return this.isRtl() ? 'ArrowRight' : 'ArrowLeft';
  });
  nextKey = computed(() => {
    if (this.inputs.orientation() === 'vertical') {
      return 'ArrowDown';
    }
    return this.isRtl() ? 'ArrowLeft' : 'ArrowRight';
  });
  collapseKey = computed(() => {
    if (this.inputs.orientation() === 'horizontal') {
      return 'ArrowUp';
    }
    return this.isRtl() ? 'ArrowRight' : 'ArrowLeft';
  });
  expandKey = computed(() => {
    if (this.inputs.orientation() === 'horizontal') {
      return 'ArrowDown';
    }
    return this.isRtl() ? 'ArrowLeft' : 'ArrowRight';
  });
  dynamicSpaceKey = computed(() => this.treeBehavior.isTyping() ? '' : ' ');
  typeaheadRegexp = /^.$/;
  keydown = computed(() => {
    const manager = new KeyboardEventManager();
    const tree = this.treeBehavior;
    manager.on(this.prevKey, () => tree.prev({
      selectOne: this.followFocus()
    }), {
      ignoreRepeat: false
    }).on(this.nextKey, () => tree.next({
      selectOne: this.followFocus()
    }), {
      ignoreRepeat: false
    }).on('Home', () => tree.first({
      selectOne: this.followFocus()
    })).on('End', () => tree.last({
      selectOne: this.followFocus()
    })).on(this.typeaheadRegexp, e => tree.search(e.key, {
      selectOne: this.followFocus()
    })).on(Modifier.Shift, '*', () => tree.expandSiblings()).on(this.expandKey, () => this._expandOrFirstChild({
      selectOne: this.followFocus()
    })).on(this.collapseKey, () => this._collapseOrParent({
      selectOne: this.followFocus()
    }));
    if (this.inputs.multi()) {
      manager.on(Modifier.Any, 'Shift', () => tree.anchor(this.treeBehavior.activeIndex())).on(Modifier.Shift, this.prevKey, () => tree.prev({
        selectRange: true
      }), {
        ignoreRepeat: false
      }).on(Modifier.Shift, this.nextKey, () => tree.next({
        selectRange: true
      }), {
        ignoreRepeat: false
      }).on([Modifier.Ctrl | Modifier.Shift, Modifier.Meta | Modifier.Shift], 'Home', () => tree.first({
        selectRange: true,
        anchor: false
      })).on([Modifier.Ctrl | Modifier.Shift, Modifier.Meta | Modifier.Shift], 'End', () => tree.last({
        selectRange: true,
        anchor: false
      })).on(Modifier.Shift, 'Enter', () => tree.updateSelection({
        selectRange: true,
        anchor: false
      })).on(Modifier.Shift, this.dynamicSpaceKey, () => tree.updateSelection({
        selectRange: true,
        anchor: false
      }));
    }
    if (!this.followFocus() && this.inputs.multi()) {
      manager.on(this.dynamicSpaceKey, () => tree.toggle()).on('Enter', () => tree.toggle(), {
        preventDefault: !this.nav()
      }).on([Modifier.Ctrl, Modifier.Meta], 'A', () => tree.toggleAll());
    }
    if (!this.followFocus() && !this.inputs.multi()) {
      manager.on(this.dynamicSpaceKey, () => tree.selectOne());
      manager.on('Enter', () => tree.selectOne(), {
        preventDefault: !this.nav()
      });
    }
    if (this.inputs.multi() && this.followFocus()) {
      manager.on([Modifier.Ctrl, Modifier.Meta], this.prevKey, () => tree.prev(), {
        ignoreRepeat: false
      }).on([Modifier.Ctrl, Modifier.Meta], this.nextKey, () => tree.next(), {
        ignoreRepeat: false
      }).on([Modifier.Ctrl, Modifier.Meta], this.expandKey, () => this._expandOrFirstChild()).on([Modifier.Ctrl, Modifier.Meta], this.collapseKey, () => this._collapseOrParent()).on([Modifier.Ctrl, Modifier.Meta], ' ', () => tree.toggle()).on([Modifier.Ctrl, Modifier.Meta], 'Enter', () => tree.toggle()).on([Modifier.Ctrl, Modifier.Meta], 'Home', () => tree.first()).on([Modifier.Ctrl, Modifier.Meta], 'End', () => tree.last()).on([Modifier.Ctrl, Modifier.Meta], 'A', () => {
        tree.toggleAll();
        tree.select();
      });
    }
    return manager;
  });
  clickManager = computed(() => {
    const manager = new ClickEventManager();
    if (this.multi()) {
      manager.on(Modifier.Shift, e => this.goto(e, {
        selectRange: true
      }));
    }
    if (!this.multi()) {
      return manager.on(e => this.goto(e, {
        selectOne: true
      }));
    }
    if (this.multi() && this.followFocus()) {
      return manager.on(e => this.goto(e, {
        selectOne: true
      })).on(Modifier.Ctrl, e => this.goto(e, {
        toggle: true
      }));
    }
    if (this.multi() && !this.followFocus()) {
      return manager.on(e => this.goto(e, {
        toggle: true
      }));
    }
    return manager;
  });
  id = () => this.inputs.id();
  element = () => this.inputs.element();
  nav = () => this.inputs.nav();
  currentType = () => this.inputs.currentType();
  items = () => this.inputs.items();
  focusMode = () => this.inputs.focusMode();
  disabled = () => this.inputs.disabled();
  activeItem;
  softDisabled = () => this.inputs.softDisabled();
  wrap = () => this.inputs.wrap();
  orientation = () => this.inputs.orientation();
  textDirection = () => this.inputs.textDirection();
  multi = computed(() => this.nav() ? false : this.inputs.multi());
  selectionMode = () => this.inputs.selectionMode();
  typeaheadDelay = () => this.inputs.typeaheadDelay();
  value;
  constructor(inputs) {
    this.inputs = inputs;
    this.activeItem = inputs.activeItem;
    this.value = inputs.value;
    this.treeBehavior = new Tree({
      ...inputs,
      multi: this.multi,
      multiExpandable: () => true
    });
  }
  validate() {
    const violations = [];
    if (!this.inputs.multi() && this.inputs.value().length > 1) {
      violations.push(`A single-select tree should not have multiple selected options. Selected options: ${this.inputs.value().join(', ')}`);
    }
    const values = this.inputs.items().map(t => t.value());
    const duplicates = values.filter((val, idx) => values.indexOf(val) !== idx);
    if (duplicates.length > 0) {
      violations.push(`Duplicate tree item value '${duplicates[0]}' detected inside ngTree.`);
    }
    return violations;
  }
  setDefaultState() {
    let firstItem;
    for (const item of this.inputs.items()) {
      if (!item.visible()) continue;
      if (!this.treeBehavior.isFocusable(item)) continue;
      if (firstItem === undefined) {
        firstItem = item;
      }
      if (item.selected()) {
        this.activeItem.set(item);
        return;
      }
    }
    if (firstItem !== undefined) {
      this.activeItem.set(firstItem);
    }
  }
  setDefaultStateEffect() {
    if (this.hasBeenInteracted()) return;
    this.setDefaultState();
  }
  onKeydown(event) {
    if (!this.disabled()) {
      this.hasBeenInteracted.set(true);
      this.keydown().handle(event);
    }
  }
  onClick(event) {
    if (!this.disabled()) {
      this.hasBeenInteracted.set(true);
      this.clickManager().handle(event);
    }
  }
  onFocusIn() {
    this.hasBeenInteracted.set(true);
  }
  goto(e, opts) {
    const item = this._getItem(e);
    if (!item) return;
    this.treeBehavior.goto(item, opts);
    this.treeBehavior.toggleExpansion(item);
  }
  _expandOrFirstChild(opts) {
    const item = this.treeBehavior.inputs.activeItem();
    if (item && this.treeBehavior.isExpandable(item) && !item.expanded()) {
      this.treeBehavior.expand(item);
    } else {
      this.treeBehavior.firstChild(opts);
    }
  }
  _collapseOrParent(opts) {
    const item = this.treeBehavior.inputs.activeItem();
    if (item && this.treeBehavior.isExpandable(item) && item.expanded()) {
      this.treeBehavior.collapse(item);
    } else {
      this.treeBehavior.parent(opts);
    }
  }
  _getItem(event) {
    if (!event.target) {
      return;
    }
    const element = event.target.closest('[role="treeitem"]');
    return this.inputs.items().find(i => i.element() === element);
  }
}

export { TreeItemPattern, TreePattern };
//# sourceMappingURL=_tree-chunk.mjs.map
