import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

class MenuItemHarness extends ComponentHarness {
  static hostSelector = '[ngMenuItem]';
  static with(options = {}) {
    return new HarnessPredicate(MenuItemHarness, options).addOption('text', options.text, (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text)).addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled).addOption('expanded', options.expanded, async (harness, expanded) => (await harness.isExpanded()) === expanded);
  }
  async getText() {
    return (await this.host()).text();
  }
  async isDisabled() {
    const host = await this.host();
    return (await host.getAttribute('aria-disabled')) === 'true';
  }
  async isExpanded() {
    const host = await this.host();
    return (await host.getAttribute('aria-expanded')) === 'true';
  }
  async click() {
    return (await this.host()).click();
  }
  async getSubmenu() {
    const controlsId = await (await this.host()).getAttribute('aria-controls');
    if (controlsId) {
      return this.documentRootLocatorFactory().locatorFor(MenuHarness.with({
        selector: `#${controlsId}`
      }))();
    }
    return null;
  }
  async isFocused() {
    return (await this.host()).isFocused();
  }
  async hasSubmenu() {
    const host = await this.host();
    return (await host.getAttribute('aria-haspopup')) === 'true' || !!(await host.getAttribute('aria-controls'));
  }
}
class MenuHarness extends ComponentHarness {
  static hostSelector = '[ngMenu], [ngMenuBar]';
  static with(options = {}) {
    return new HarnessPredicate(MenuHarness, options).addOption('triggerText', options.triggerText, async (harness, text) => {
      const trigger = await harness._getTrigger();
      if (!trigger) return false;
      return HarnessPredicate.stringMatches(await trigger.text(), text);
    });
  }
  async _getTrigger() {
    const id = await (await this.host()).getAttribute('id');
    if (!id) return null;
    return this.documentRootLocatorFactory().locatorForOptional(`[aria-controls="${id}"]`)();
  }
  async isOpen() {
    const host = await this.host();
    if (await host.matchesSelector('[ngMenuBar]')) {
      return true;
    }
    return (await host.getAttribute('data-visible')) === 'true';
  }
  async isMenuBar() {
    const host = await this.host();
    return host.matchesSelector('[ngMenuBar]');
  }
  async open() {
    if (!(await this.isOpen())) {
      const trigger = await this._getTrigger();
      if (trigger) {
        await trigger.click();
      }
    }
  }
  async close() {
    if (await this.isOpen()) {
      const trigger = await this._getTrigger();
      if (trigger) {
        await trigger.click();
      }
    }
  }
  async getItems(filters = {}) {
    return this.locatorForAll(MenuItemHarness.with(filters))();
  }
}

export { MenuHarness, MenuItemHarness };
//# sourceMappingURL=menu-testing.mjs.map
