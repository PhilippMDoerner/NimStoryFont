import { ListExpansion } from './_expansion-chunk.mjs';
import { ListFocus, ListNavigation } from './_list-navigation-chunk.mjs';
import { computed, KeyboardEventManager } from './_violations-chunk.mjs';
import { ClickEventManager } from './_click-event-manager-chunk.mjs';

const focusMode = () => 'roving';
class AccordionGroupPattern {
  inputs;
  navigationBehavior;
  focusBehavior;
  expansionBehavior;
  constructor(inputs) {
    this.inputs = inputs;
    this.focusBehavior = new ListFocus({
      ...inputs,
      focusMode
    });
    this.navigationBehavior = new ListNavigation({
      ...inputs,
      focusMode,
      focusManager: this.focusBehavior
    });
    this.expansionBehavior = new ListExpansion({
      ...inputs
    });
  }
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
    return new KeyboardEventManager().on(this.prevKey, () => this.navigationBehavior.prev(), {
      ignoreRepeat: false
    }).on(this.nextKey, () => this.navigationBehavior.next(), {
      ignoreRepeat: false
    }).on('Home', () => this.navigationBehavior.first()).on('End', () => this.navigationBehavior.last()).on(' ', () => this.toggle()).on('Enter', () => this.toggle());
  });
  click = computed(() => {
    return new ClickEventManager().on(e => {
      const item = this._findTriggerPattern(e.target);
      if (!item) return;
      this.navigationBehavior.goto(item);
      this.expansionBehavior.toggle(item);
    });
  });
  onKeydown(event) {
    this.keydown().handle(event);
  }
  onClick(event) {
    this.click().handle(event);
  }
  onFocus(event) {
    const item = this._findTriggerPattern(event.target);
    if (!item) return;
    if (!this.focusBehavior.isFocusable(item)) return;
    this.focusBehavior.focus(item);
  }
  toggle() {
    const activeItem = this.inputs.activeItem();
    if (activeItem === undefined) return;
    this.expansionBehavior.toggle(activeItem);
  }
  expandAll() {
    this.expansionBehavior.openAll();
  }
  collapseAll() {
    this.expansionBehavior.closeAll();
  }
  validate() {
    const violations = [];
    if (!this.inputs.multiExpandable()) {
      const expandedCount = this.inputs.items().filter(t => t.expanded()).length;
      if (expandedCount > 1) {
        violations.push('ngAccordionGroup has multiExpandable set to false, but multiple ngAccordionTrigger panels are initially expanded.');
      }
    }
    return violations;
  }
  _findTriggerPattern(element) {
    let target = element;
    while (target) {
      const pattern = this.inputs.items().find(t => t.element() === target);
      if (pattern) {
        return pattern;
      }
      target = target.parentElement?.closest('[ngAccordionTrigger]');
    }
    return undefined;
  }
}
class AccordionTriggerPattern {
  inputs;
  id;
  element = () => this.inputs.element();
  expandable = () => true;
  expanded;
  active = computed(() => this.inputs.accordionGroup().inputs.activeItem() === this);
  controls;
  tabIndex = computed(() => this.inputs.accordionGroup().focusBehavior.isFocusable(this) ? 0 : -1);
  disabled = computed(() => this.inputs.disabled() || this.inputs.accordionGroup().inputs.disabled());
  hardDisabled = computed(() => this.disabled() && !this.inputs.accordionGroup().inputs.softDisabled());
  constructor(inputs) {
    this.inputs = inputs;
    this.id = inputs.id;
    this.expanded = inputs.expanded;
    this.controls = inputs.accordionPanelId;
  }
  open() {
    this.inputs.accordionGroup().expansionBehavior.open(this);
  }
  close() {
    this.inputs.accordionGroup().expansionBehavior.close(this);
  }
  toggle() {
    this.inputs.accordionGroup().expansionBehavior.toggle(this);
  }
}

export { AccordionGroupPattern, AccordionTriggerPattern };
//# sourceMappingURL=_accordion-chunk.mjs.map
