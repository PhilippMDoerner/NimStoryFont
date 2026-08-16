import { ContentContainerComponentHarness, HarnessPredicate, TestKey } from '@angular/cdk/testing';

class ComboboxHarness extends ContentContainerComponentHarness {
  static hostSelector = '[ngCombobox]';
  static with(options = {}) {
    return new HarnessPredicate(ComboboxHarness, options).addOption('placeholder', options.placeholder, async (harness, placeholder) => HarnessPredicate.stringMatches(await harness.getPlaceholder(), placeholder)).addOption('value', options.value, async (harness, value) => HarnessPredicate.stringMatches(await harness.getValue(), value)).addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled);
  }
  async getPopupWidget(type) {
    const host = await this.host();
    const controlsId = await host.getAttribute('aria-controls');
    if (!controlsId) {
      throw new Error('Cannot retrieve popup content because the combobox is closed or not associated with a popup controls ID.');
    }
    return this.documentRootLocatorFactory().locatorFor(type.with({
      selector: `#${controlsId}`
    }))();
  }
  async getPopupLoader() {
    return this.getRootHarnessLoader();
  }
  async getRootHarnessLoader() {
    const host = await this.host();
    const controlsId = await host.getAttribute('aria-controls');
    if (!controlsId) {
      throw new Error('Cannot retrieve popup content because the combobox is closed or not associated with a popup controls ID.');
    }
    const documentRoot = await this.documentRootLocatorFactory().rootHarnessLoader();
    return documentRoot.getChildLoader(`#${controlsId}`);
  }
  async isOpen() {
    const host = await this.host();
    return (await host.getAttribute('aria-expanded')) === 'true';
  }
  async isDisabled() {
    const host = await this.host();
    return (await host.getAttribute('aria-disabled')) === 'true';
  }
  async getValue() {
    const host = await this.host();
    return host.getProperty('value');
  }
  async setValue(value) {
    const host = await this.host();
    await host.clear();
    if (value) {
      await host.sendKeys(value);
    }
  }
  async getPlaceholder() {
    const host = await this.host();
    return host.getAttribute('placeholder');
  }
  async open() {
    if (!(await this.isOpen())) {
      const host = await this.host();
      await host.focus();
      await host.sendKeys(TestKey.DOWN_ARROW);
    }
  }
  async close() {
    if (await this.isOpen()) {
      const host = await this.host();
      await host.focus();
      await host.sendKeys(TestKey.ESCAPE);
    }
  }
  async focus() {
    return (await this.host()).focus();
  }
  async blur() {
    return (await this.host()).blur();
  }
  async isFocused() {
    return (await this.host()).isFocused();
  }
}

export { ComboboxHarness };
//# sourceMappingURL=combobox-testing.mjs.map
