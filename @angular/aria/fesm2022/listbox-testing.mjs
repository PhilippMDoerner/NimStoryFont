import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

class ListboxOptionHarness extends ComponentHarness {
  static hostSelector = '[ngOption]';
  static with(options = {}) {
    return new HarnessPredicate(ListboxOptionHarness, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text)).addOption('selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected).addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled);
  }
  async isSelected() {
    const host = await this.host();
    return (await host.getAttribute('aria-selected')) === 'true';
  }
  async isDisabled() {
    const host = await this.host();
    return (await host.getAttribute('aria-disabled')) === 'true' || (await host.getProperty('disabled')) === true;
  }
  async getText() {
    const host = await this.host();
    return host.text();
  }
  async click() {
    const host = await this.host();
    return host.click();
  }
}
class ListboxHarness extends ComponentHarness {
  static hostSelector = '[ngListbox]';
  static with(options = {}) {
    return new HarnessPredicate(ListboxHarness, options).addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled);
  }
  async getOrientation() {
    const host = await this.host();
    const orientation = await host.getAttribute('aria-orientation');
    return orientation === 'horizontal' ? 'horizontal' : 'vertical';
  }
  async isMulti() {
    const host = await this.host();
    return (await host.getAttribute('aria-multiselectable')) === 'true';
  }
  async isDisabled() {
    const host = await this.host();
    return (await host.getAttribute('aria-disabled')) === 'true';
  }
  async getOptions(filters = {}) {
    return this.locatorForAll(ListboxOptionHarness.with(filters))();
  }
  async focus() {
    await (await this.host()).focus();
  }
  async blur() {
    await (await this.host()).blur();
  }
  async getActiveDescendantId() {
    const host = await this.host();
    return host.getAttribute('aria-activedescendant');
  }
}

export { ListboxHarness, ListboxOptionHarness };
//# sourceMappingURL=listbox-testing.mjs.map
