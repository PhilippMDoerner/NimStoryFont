import { computed, signal, KeyboardEventManager } from './_violations-chunk.mjs';
import { List } from './_list-chunk.mjs';

class MenuPattern {
  inputs;
  id;
  role = () => 'menu';
  disabled = () => this.inputs.disabled();
  visible = computed(() => this.inputs.parent() ? !!this.inputs.parent()?.expanded() : true);
  listBehavior;
  isFocused = signal(false);
  hasBeenInteracted = signal(false);
  hasBeenHovered = signal(false);
  _openTimeout;
  _closeTimeout;
  tabIndex = () => this.listBehavior.tabIndex();
  shouldFocus = computed(() => {
    const root = this.root();
    if (root instanceof MenuTriggerPattern) {
      return true;
    }
    if (root instanceof MenuBarPattern || root instanceof MenuPattern) {
      return root.isFocused();
    }
    return false;
  });
  _expandKey = computed(() => {
    return this.inputs.textDirection() === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  });
  _collapseKey = computed(() => {
    return this.inputs.textDirection() === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  });
  dynamicSpaceKey = computed(() => this.listBehavior.isTyping() ? '' : ' ');
  typeaheadRegexp = /^.$/;
  root = computed(() => {
    const parent = this.inputs.parent();
    if (!parent) {
      return this;
    }
    if (parent instanceof MenuTriggerPattern) {
      return parent;
    }
    const grandparent = parent.inputs.parent();
    if (grandparent instanceof MenuBarPattern) {
      return grandparent;
    }
    return grandparent?.root();
  });
  keydownManager = computed(() => {
    return new KeyboardEventManager().on('ArrowDown', () => this.next(), {
      ignoreRepeat: false
    }).on('ArrowUp', () => this.prev(), {
      ignoreRepeat: false
    }).on('Home', () => this.first()).on('End', () => this.last()).on('Enter', () => this.trigger()).on('Escape', () => this.closeAll()).on(this._expandKey, () => this.expand()).on(this._collapseKey, () => this.collapse()).on(this.dynamicSpaceKey, () => this.trigger()).on(this.typeaheadRegexp, e => this.listBehavior.search(e.key));
  });
  constructor(inputs) {
    this.inputs = inputs;
    this.id = inputs.id;
    this.listBehavior = new List({
      ...inputs,
      value: signal([])
    });
  }
  validate() {
    const violations = [];
    const values = this.inputs.items().map(i => i.value());
    const duplicates = values.filter((val, idx) => values.indexOf(val) !== idx);
    if (duplicates.length > 0) {
      violations.push(`Duplicate value '${duplicates[0]}' detected inside ngMenu.`);
    }
    return violations;
  }
  setDefaultState() {
    if (!this.inputs.parent()) {
      const firstFocusable = this.listBehavior.navigationBehavior.peekFirst();
      if (firstFocusable) {
        this.listBehavior.goto(firstFocusable, {
          focusElement: false
        });
      }
    }
  }
  setDefaultStateEffect() {
    if (this.hasBeenInteracted() || this.hasBeenHovered()) return;
    if (this.inputs.items().length > 0) {
      this.setDefaultState();
    }
  }
  onKeydown(event) {
    this.hasBeenInteracted.set(true);
    this.keydownManager().handle(event);
  }
  onMouseOver(event) {
    if (!this.visible()) {
      return;
    }
    this.hasBeenHovered.set(true);
    const item = this.inputs.items().find(i => i.element()?.contains(event.target));
    if (!item) {
      return;
    }
    const parent = this.inputs.parent();
    const activeItem = this?.inputs.activeItem();
    if (parent instanceof MenuItemPattern) {
      const grandparent = parent.inputs.parent();
      if (grandparent instanceof MenuPattern) {
        grandparent._clearTimeouts();
        grandparent.listBehavior.goto(parent, {
          focusElement: false
        });
      }
    }
    if (activeItem && activeItem !== item) {
      this._closeItem(activeItem);
    }
    if (item.expanded()) {
      this._clearCloseTimeout();
    }
    this._openItem(item);
    this.listBehavior.goto(item, {
      focusElement: this.shouldFocus()
    });
  }
  _closeItem(item) {
    this._clearOpenTimeout();
    if (!this._closeTimeout) {
      this._closeTimeout = setTimeout(() => {
        item.close();
        this._closeTimeout = undefined;
      }, this.inputs.expansionDelay());
    }
  }
  _openItem(item) {
    this._clearOpenTimeout();
    this._openTimeout = setTimeout(() => {
      item.open();
      this._openTimeout = undefined;
    }, this.inputs.expansionDelay());
  }
  onMouseOut(event) {
    this._clearOpenTimeout();
    if (this.isFocused()) {
      return;
    }
    const root = this.root();
    const parent = this.inputs.parent();
    const relatedTarget = event.relatedTarget;
    if (!root || !parent || parent instanceof MenuTriggerPattern) {
      return;
    }
    const grandparent = parent.inputs.parent();
    if (!grandparent || grandparent instanceof MenuBarPattern) {
      return;
    }
    if (!grandparent.inputs.element()?.contains(relatedTarget)) {
      parent.close();
    }
  }
  onClick(event) {
    const relatedTarget = event.target;
    const item = this.inputs.items().find(i => i.element()?.contains(relatedTarget));
    if (item) {
      item.open();
      this.listBehavior.goto(item);
      this.submit(item);
    }
  }
  onFocusIn() {
    this.isFocused.set(true);
    this.hasBeenInteracted.set(true);
  }
  onFocusOut(event) {
    const parent = this.inputs.parent();
    const parentEl = parent?.inputs.element();
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget) {
      this.isFocused.set(false);
      this.inputs.parent()?.close({
        refocus: true
      });
    }
    if (parent instanceof MenuItemPattern) {
      const grandparent = parent.inputs.parent();
      const siblings = grandparent?.inputs.items().filter(i => i !== parent);
      const item = siblings?.find(i => i.element()?.contains(relatedTarget));
      if (item) {
        return;
      }
    }
    if (this.visible() && !parentEl?.contains(relatedTarget) && !this.inputs.element()?.contains(relatedTarget)) {
      this.isFocused.set(false);
      this.inputs.parent()?.close();
    }
  }
  prev() {
    this.inputs.activeItem()?.close();
    this.listBehavior.prev();
  }
  next() {
    this.inputs.activeItem()?.close();
    this.listBehavior.next();
  }
  first() {
    this.inputs.activeItem()?.close();
    this.listBehavior.first();
  }
  last() {
    this.inputs.activeItem()?.close();
    this.listBehavior.last();
  }
  trigger() {
    this.inputs.activeItem()?.hasPopup() ? this.inputs.activeItem()?.open({
      first: true
    }) : this.submit();
  }
  submit(item = this.inputs.activeItem()) {
    if (!item || item.disabled() || item.submenu()) {
      return;
    }
    const root = this.root();
    if (root instanceof MenuTriggerPattern) {
      root.close({
        refocus: true
      });
      root?.inputs.menu()?.inputs.itemSelected?.(item.value());
    } else if (root instanceof MenuBarPattern) {
      root.close();
      root?.inputs.itemSelected?.(item.value());
    } else if (root instanceof MenuPattern) {
      root.inputs.activeItem()?.close({
        refocus: true
      });
      root?.inputs.itemSelected?.(item.value());
    }
  }
  collapse() {
    const root = this.root();
    const parent = this.inputs.parent();
    if (parent instanceof MenuItemPattern && !(parent.inputs.parent() instanceof MenuBarPattern)) {
      parent.close({
        refocus: true
      });
    } else if (root instanceof MenuBarPattern) {
      root.prev();
    }
  }
  expand() {
    const root = this.root();
    const activeItem = this.inputs.activeItem();
    if (activeItem?.submenu()) {
      activeItem.open({
        first: true
      });
    } else if (root instanceof MenuBarPattern) {
      root.next();
    }
  }
  close() {
    this.inputs.parent()?.close();
  }
  closeAll() {
    const root = this.root();
    if (root instanceof MenuTriggerPattern) {
      root.close({
        refocus: true
      });
    }
    if (root instanceof MenuBarPattern) {
      root.close();
    }
    if (root instanceof MenuPattern) {
      root.inputs.activeItem()?.close({
        refocus: true
      });
    }
  }
  _clearTimeouts() {
    this._clearOpenTimeout();
    this._clearCloseTimeout();
  }
  _clearOpenTimeout() {
    if (this._openTimeout) {
      clearTimeout(this._openTimeout);
      this._openTimeout = undefined;
    }
  }
  _clearCloseTimeout() {
    if (this._closeTimeout) {
      clearTimeout(this._closeTimeout);
      this._closeTimeout = undefined;
    }
  }
}
class MenuBarPattern {
  inputs;
  listBehavior;
  tabIndex = () => this.listBehavior.tabIndex();
  _nextKey = computed(() => {
    return this.inputs.textDirection() === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  });
  _previousKey = computed(() => {
    return this.inputs.textDirection() === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  });
  dynamicSpaceKey = computed(() => this.listBehavior.isTyping() ? '' : ' ');
  typeaheadRegexp = /^.$/;
  isFocused = signal(false);
  hasBeenInteracted = signal(false);
  disabled = () => this.inputs.disabled();
  keydownManager = computed(() => {
    return new KeyboardEventManager().on(this._nextKey, () => this.next(), {
      ignoreRepeat: false
    }).on(this._previousKey, () => this.prev(), {
      ignoreRepeat: false
    }).on('End', () => this.listBehavior.last()).on('Home', () => this.listBehavior.first()).on('Enter', () => this.inputs.activeItem()?.open({
      first: true
    })).on('ArrowUp', () => this.inputs.activeItem()?.open({
      last: true
    })).on('ArrowDown', () => this.inputs.activeItem()?.open({
      first: true
    })).on(this.dynamicSpaceKey, () => this.inputs.activeItem()?.open({
      first: true
    })).on(this.typeaheadRegexp, e => this.listBehavior.search(e.key));
  });
  constructor(inputs) {
    this.inputs = inputs;
    this.listBehavior = new List(inputs);
  }
  setDefaultState() {
    const firstFocusable = this.listBehavior.navigationBehavior.peekFirst();
    if (firstFocusable) {
      this.inputs.activeItem.set(firstFocusable);
    }
  }
  setDefaultStateEffect() {
    if (this.hasBeenInteracted()) return;
    if (this.inputs.items().length > 0) {
      this.setDefaultState();
    }
  }
  onKeydown(event) {
    this.hasBeenInteracted.set(true);
    this.keydownManager().handle(event);
  }
  onClick(event) {
    const item = this.inputs.items().find(i => i.element()?.contains(event.target));
    if (!item) {
      return;
    }
    this.goto(item);
    item.expanded() ? item.close() : item.open();
  }
  onMouseOver(event) {
    const item = this.inputs.items().find(i => i.element()?.contains(event.target));
    if (item) {
      this.goto(item, {
        focusElement: this.isFocused()
      });
    }
  }
  onFocusIn() {
    this.isFocused.set(true);
    this.hasBeenInteracted.set(true);
  }
  onFocusOut(event) {
    const relatedTarget = event.relatedTarget;
    if (!this.inputs.element()?.contains(relatedTarget)) {
      this.isFocused.set(false);
      this.close();
    }
  }
  goto(item, opts) {
    const prevItem = this.inputs.activeItem();
    this.listBehavior.goto(item, opts);
    if (prevItem?.expanded()) {
      prevItem?.close();
      this.inputs.activeItem()?.open();
    }
    if (item === prevItem) {
      if (item.expanded() && item.submenu()?.inputs.activeItem()) {
        item.submenu()?.inputs.activeItem()?.close();
        item.submenu()?.listBehavior.unfocus();
      }
    }
  }
  next() {
    const prevItem = this.inputs.activeItem();
    this.listBehavior.next();
    if (prevItem?.expanded()) {
      prevItem?.close();
      this.inputs.activeItem()?.open({
        first: true
      });
    }
  }
  prev() {
    const prevItem = this.inputs.activeItem();
    this.listBehavior.prev();
    if (prevItem?.expanded()) {
      prevItem?.close();
      this.inputs.activeItem()?.open({
        first: true
      });
    }
  }
  close() {
    this.inputs.activeItem()?.close({
      refocus: this.isFocused()
    });
  }
}
class MenuTriggerPattern {
  inputs;
  expanded = signal(false);
  hasBeenInteracted = signal(false);
  pendingFocus = signal(undefined);
  role = () => 'button';
  hasPopup = () => true;
  menu;
  tabIndex = computed(() => this.expanded() && this.menu()?.inputs.activeItem() ? -1 : 0);
  disabled = () => this.inputs.disabled();
  keydownManager = computed(() => {
    return new KeyboardEventManager().on(' ', () => this.open({
      first: true
    })).on('Enter', () => this.open({
      first: true
    })).on('ArrowDown', () => this.open({
      first: true
    })).on('ArrowUp', () => this.open({
      last: true
    })).on('Escape', () => this.close({
      refocus: true
    }));
  });
  constructor(inputs) {
    this.inputs = inputs;
    this.menu = this.inputs.menu;
  }
  pendingFocusEffect() {
    const menu = this.inputs.menu();
    const intent = this.pendingFocus();
    if (menu && intent) {
      if (intent === 'first') {
        menu.first();
      } else if (intent === 'last') {
        menu.last();
      }
      this.pendingFocus.set(undefined);
    }
  }
  onKeydown(event) {
    if (!this.inputs.disabled()) {
      this.hasBeenInteracted.set(true);
      this.keydownManager().handle(event);
    }
  }
  onClick() {
    if (!this.inputs.disabled()) {
      this.expanded() ? this.close() : this.open({
        first: true
      });
    }
  }
  onFocusIn() {
    this.hasBeenInteracted.set(true);
  }
  onFocusOut(event) {
    const element = this.inputs.element();
    const relatedTarget = event.relatedTarget;
    if (this.expanded() && !element?.contains(relatedTarget) && !this.inputs.menu()?.inputs.element()?.contains(relatedTarget)) {
      this.close();
    }
  }
  open(opts) {
    this.expanded.set(true);
    if (opts?.first) {
      this.pendingFocus.set('first');
    } else if (opts?.last) {
      this.pendingFocus.set('last');
    }
  }
  close(opts = {}) {
    this.expanded.set(false);
    this.pendingFocus.set(undefined);
    this.menu()?.listBehavior.unfocus();
    if (opts.refocus) {
      this.inputs.element()?.focus();
    }
    let menuitems = this.inputs.menu()?.inputs.items() ?? [];
    while (menuitems.length) {
      const menuitem = menuitems.pop();
      menuitem?._expanded.set(false);
      menuitem?.inputs.parent()?.listBehavior.unfocus();
      menuitems = menuitems.concat(menuitem?.submenu()?.inputs.items() ?? []);
    }
  }
}
class MenuItemPattern {
  inputs;
  value;
  id;
  disabled = () => this.inputs.parent()?.disabled() || this.inputs.disabled();
  searchTerm;
  element;
  active = computed(() => this.inputs.parent()?.inputs.activeItem() === this);
  hasBeenInteracted = signal(false);
  tabIndex = computed(() => {
    if (this.submenu() && this.submenu()?.inputs.activeItem()) {
      return -1;
    }
    return this.inputs.parent()?.listBehavior.getItemTabindex(this) ?? -1;
  });
  index = computed(() => this.inputs.parent()?.inputs.items().indexOf(this) ?? -1);
  expanded = computed(() => this.submenu() ? this._expanded() : null);
  _expanded = signal(false);
  controls = signal(undefined);
  role = () => this.inputs.role();
  hasPopup = computed(() => !!this.submenu());
  submenu;
  selectable;
  constructor(inputs) {
    this.inputs = inputs;
    this.id = inputs.id;
    this.value = inputs.value;
    this.element = inputs.element;
    this.submenu = this.inputs.submenu;
    this.searchTerm = inputs.searchTerm;
    this.selectable = computed(() => !this.submenu());
  }
  open(opts) {
    if (this.disabled()) {
      return;
    }
    this._expanded.set(true);
    if (opts?.first) {
      this.submenu()?.first();
    }
    if (opts?.last) {
      this.submenu()?.last();
    }
  }
  close(opts = {}) {
    this._expanded.set(false);
    if (opts.refocus) {
      this.inputs.parent()?.listBehavior.goto(this);
    }
    let menuitems = this.inputs.submenu()?.inputs.items() ?? [];
    while (menuitems.length) {
      const menuitem = menuitems.pop();
      menuitem?._expanded.set(false);
      menuitem?.inputs.parent()?.listBehavior.unfocus();
      menuitems = menuitems.concat(menuitem?.submenu()?.inputs.items() ?? []);
      const parent = menuitem?.inputs.parent();
      if (parent instanceof MenuPattern) {
        parent._clearTimeouts();
      }
    }
  }
  onFocusIn() {
    this.hasBeenInteracted.set(true);
  }
}

export { MenuBarPattern, MenuItemPattern, MenuPattern, MenuTriggerPattern };
//# sourceMappingURL=_menu-chunk.mjs.map
