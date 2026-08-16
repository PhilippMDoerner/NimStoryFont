import { ListExpansion } from './_expansion-chunk.mjs';
import { signal, computed, KeyboardEventManager, linkedSignal } from './_violations-chunk.mjs';
import { ListFocus, ListNavigation } from './_list-navigation-chunk.mjs';
import { ClickEventManager } from './_click-event-manager-chunk.mjs';

class TabPattern {
  inputs;
  id;
  disabled;
  element = () => this.inputs.element();
  expandable = () => true;
  expanded = linkedSignal(() => this.inputs.tabList().selectedTab() === this);
  active = computed(() => this.inputs.tabList().inputs.activeItem() === this);
  selected = computed(() => this.inputs.tabList().selectedTab() === this);
  tabIndex = computed(() => this.inputs.tabList().focusBehavior.getItemTabIndex(this));
  controls = computed(() => this.inputs.tabPanel()?.id());
  constructor(inputs) {
    this.inputs = inputs;
    this.id = inputs.id;
    this.disabled = inputs.disabled;
  }
  open() {
    return this.inputs.tabList().open(this);
  }
}
class TabPanelPattern {
  inputs;
  id;
  hidden = computed(() => this.inputs.tab()?.expanded() === false);
  tabIndex = computed(() => this.hidden() ? -1 : 0);
  labelledBy = computed(() => this.inputs.tab()?.id());
  constructor(inputs) {
    this.inputs = inputs;
    this.id = inputs.id;
  }
}
class TabListPattern {
  inputs;
  focusBehavior;
  navigationBehavior;
  expansionBehavior;
  hasBeenInteracted = signal(false);
  activeTab;
  selectedTab;
  orientation;
  disabled;
  tabIndex = computed(() => this.focusBehavior.getListTabIndex());
  activeDescendant = computed(() => this.focusBehavior.getActiveDescendant());
  followFocus = computed(() => this.inputs.selectionMode() === 'follow');
  prevKey = computed(() => {
    if (this.inputs.orientation() === 'vertical') {
      return 'ArrowUp';
    }
    return this.inputs.textDirection() === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  });
  nextKey = computed(() => {
    if (this.inputs.orientation() === 'vertical') {
      return 'ArrowDown';
    }
    return this.inputs.textDirection() === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  });
  keydown = computed(() => {
    return new KeyboardEventManager().on(this.prevKey, () => this._navigate(() => this.navigationBehavior.prev(), this.followFocus()), {
      ignoreRepeat: false
    }).on(this.nextKey, () => this._navigate(() => this.navigationBehavior.next(), this.followFocus()), {
      ignoreRepeat: false
    }).on('Home', () => this._navigate(() => this.navigationBehavior.first(), this.followFocus())).on('End', () => this._navigate(() => this.navigationBehavior.last(), this.followFocus())).on(' ', () => this.open()).on('Enter', () => this.open());
  });
  clickManager = computed(() => {
    return new ClickEventManager().on(e => this._navigate(() => this.navigationBehavior.goto(this._getItem(e)), true));
  });
  constructor(inputs) {
    this.inputs = inputs;
    this.selectedTab = inputs.selectedTab;
    this.activeTab = inputs.activeItem;
    this.orientation = inputs.orientation;
    this.disabled = inputs.disabled;
    this.focusBehavior = new ListFocus(inputs);
    this.navigationBehavior = new ListNavigation({
      ...inputs,
      focusManager: this.focusBehavior
    });
    this.expansionBehavior = new ListExpansion({
      ...inputs,
      multiExpandable: () => false
    });
  }
  setDefaultState() {
    let firstItem;
    for (const item of this.inputs.items()) {
      if (!this.focusBehavior.isFocusable(item)) continue;
      if (firstItem === undefined) {
        firstItem = item;
      }
      if (item.selected()) {
        this.inputs.activeItem.set(item);
        return;
      }
    }
    if (firstItem !== undefined) {
      this.inputs.activeItem.set(firstItem);
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
  open(tab) {
    tab ??= this.activeTab();
    if (tab === undefined) return false;
    const success = this.expansionBehavior.open(tab);
    if (success) {
      this.selectedTab.set(tab);
    }
    return success;
  }
  _navigate(op, shouldExpand = false) {
    const success = op();
    if (success && shouldExpand) {
      this.open();
    }
  }
  _getItem(e) {
    if (!e.target) {
      return;
    }
    const element = e.target.closest('[role="tab"]');
    return this.inputs.items().find(i => i.element() === element);
  }
}

export { TabListPattern, TabPanelPattern, TabPattern };
//# sourceMappingURL=_tabs-chunk.mjs.map
