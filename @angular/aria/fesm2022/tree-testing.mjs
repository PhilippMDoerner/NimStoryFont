import { ContentContainerComponentHarness, HarnessPredicate, ComponentHarness, parallel } from '@angular/cdk/testing';

class TreeItemHarness extends ContentContainerComponentHarness {
  static hostSelector = '[ngTreeItem]';
  static with(options = {}) {
    return new HarnessPredicate(TreeItemHarness, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text)).addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled).addOption('expanded', options.expanded, async (harness, expanded) => (await harness.isExpanded()) === expanded).addOption('selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected).addOption('level', options.level, async (harness, level) => (await harness.getLevel()) === level);
  }
  async isExpanded() {
    return (await this._getHostAttribute('aria-expanded')) === 'true';
  }
  async isDisabled() {
    return (await this._getHostAttribute('aria-disabled')) === 'true';
  }
  async isSelected() {
    return (await this._getHostAttribute('aria-selected')) === 'true';
  }
  async getLevel() {
    const level = (await this._getHostAttribute('aria-level')) ?? '1';
    return parseInt(level);
  }
  async getText() {
    return (await this.host()).text({
      exclude: '[ngTreeItem], [ngTreeItemGroup]'
    });
  }
  async click() {
    return (await this.host()).click();
  }
  async focus() {
    return (await this.host()).focus();
  }
  async blur() {
    return (await this.host()).blur();
  }
  async isActive() {
    return (await this._getHostAttribute('data-active')) === 'true';
  }
  async isFocused() {
    return (await this.host()).isFocused();
  }
  async _getHostAttribute(attributeName) {
    return (await this.host()).getAttribute(attributeName);
  }
}

class TreeHarness extends ComponentHarness {
  static hostSelector = '[ngTree]';
  static with(options = {}) {
    return new HarnessPredicate(TreeHarness, options);
  }
  async getItems(filter = {}) {
    return this.locatorForAll(TreeItemHarness.with(filter))();
  }
  async getTreeStructure() {
    const items = await this.getItems();
    const itemInformation = await parallel(() => items.map(item => parallel(() => [item.getLevel(), item.getText(), item.isExpanded()])));
    return this._getTreeStructure(itemInformation, 1, true);
  }
  _getTreeStructure(items, level, parentExpanded) {
    const result = {};
    for (let i = 0; i < items.length; i++) {
      const [itemLevel, text, expanded] = items[i];
      const nextItemLevel = items[i + 1]?.[0] ?? -1;
      if (itemLevel < level) {
        return result;
      }
      if (itemLevel > level) {
        continue;
      }
      if (parentExpanded) {
        if (nextItemLevel === level) {
          this._addChildToItem(result, {
            text
          });
        } else if (nextItemLevel > level) {
          let children = this._getTreeStructure(items.slice(i + 1), nextItemLevel, expanded)?.children;
          let child = children ? {
            text,
            children
          } : {
            text
          };
          this._addChildToItem(result, child);
        } else {
          this._addChildToItem(result, {
            text
          });
          return result;
        }
      }
    }
    return result;
  }
  _addChildToItem(result, child) {
    result.children ? result.children.push(child) : result.children = [child];
  }
}

export { TreeHarness, TreeItemHarness };
//# sourceMappingURL=tree-testing.mjs.map
