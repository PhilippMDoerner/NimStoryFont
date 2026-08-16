import { ContentContainerComponentHarness, HarnessPredicate, ComponentHarness, parallel } from '@angular/cdk/testing';

class GridCellHarness extends ContentContainerComponentHarness {
  static hostSelector = '[ngGridCell]';
  static with(options = {}) {
    return new HarnessPredicate(GridCellHarness, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text)).addOption('selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected).addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled);
  }
  async isSelected() {
    const host = await this.host();
    return (await host.getAttribute('aria-selected')) === 'true';
  }
  async isDisabled() {
    const host = await this.host();
    return (await host.getAttribute('aria-disabled')) === 'true';
  }
  async getText() {
    const host = await this.host();
    return host.text();
  }
  async click() {
    const host = await this.host();
    return host.click();
  }
  async focus() {
    const host = await this.host();
    return host.focus();
  }
  async blur() {
    const host = await this.host();
    return host.blur();
  }
  async isActive() {
    const host = await this.host();
    return (await host.getAttribute('data-active')) === 'true';
  }
  async isFocused() {
    const host = await this.host();
    return host.isFocused();
  }
}
class GridRowHarness extends ComponentHarness {
  static hostSelector = '[ngGridRow]';
  static with(options = {}) {
    return new HarnessPredicate(GridRowHarness, options);
  }
  async getCells(filters = {}) {
    return this.locatorForAll(GridCellHarness.with(filters))();
  }
  async getCellTextByIndex(filters = {}) {
    const cells = await this.getCells(filters);
    return parallel(() => cells.map(cell => cell.getText()));
  }
}
class GridHarness extends ComponentHarness {
  static hostSelector = '[ngGrid]';
  static with(options = {}) {
    return new HarnessPredicate(GridHarness, options).addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled);
  }
  async isDisabled() {
    const host = await this.host();
    return (await host.getAttribute('aria-disabled')) === 'true';
  }
  async isMultiSelectable() {
    const host = await this.host();
    return (await host.getAttribute('aria-multiselectable')) === 'true';
  }
  async getRows(filters = {}) {
    return this.locatorForAll(GridRowHarness.with(filters))();
  }
  async getCells(filters = {}) {
    return this.locatorForAll(GridCellHarness.with(filters))();
  }
  async getCellTextByIndex() {
    const rows = await this.getRows();
    return parallel(() => rows.map(row => row.getCellTextByIndex()));
  }
}

export { GridCellHarness, GridHarness, GridRowHarness };
//# sourceMappingURL=grid-testing.mjs.map
