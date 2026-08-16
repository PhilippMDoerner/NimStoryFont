import { ContentContainerComponentHarness, HarnessPredicate, ComponentHarness } from '@angular/cdk/testing';

class ToolbarWidgetHarness extends ContentContainerComponentHarness {
  static hostSelector = '[ngToolbarWidget]';
  static with(options = {}) {
    return new HarnessPredicate(ToolbarWidgetHarness, options).addOption('text', options.text, (harness, pattern) => HarnessPredicate.stringMatches(harness.getText(), pattern)).addOption('active', options.active, async (harness, active) => (await harness.isActive()) === active).addOption('selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected);
  }
  async getText() {
    return (await this.host()).text();
  }
  async click() {
    return (await this.host()).click();
  }
  async isActive() {
    const host = await this.host();
    return (await host.getAttribute('data-active')) === 'true';
  }
  async isDisabled() {
    const host = await this.host();
    return (await host.getAttribute('aria-disabled')) === 'true';
  }
  async isSelected() {
    const host = await this.host();
    return (await host.getAttribute('aria-pressed')) === 'true';
  }
}

class ToolbarWidgetGroupHarness extends ComponentHarness {
  static hostSelector = '[ngToolbarWidgetGroup]';
  static with(options = {}) {
    return new HarnessPredicate(ToolbarWidgetGroupHarness, options);
  }
  async getWidgets(filters = {}) {
    return await this.locatorForAll(ToolbarWidgetHarness.with(filters))();
  }
}

class ToolbarHarness extends ComponentHarness {
  static hostSelector = '[ngToolbar]';
  static with(options = {}) {
    return new HarnessPredicate(ToolbarHarness, options);
  }
  async getWidgets(filters = {}) {
    return await this.locatorForAll(ToolbarWidgetHarness.with(filters))();
  }
  async getWidgetGroups(filters = {}) {
    return await this.locatorForAll(ToolbarWidgetGroupHarness.with(filters))();
  }
  async isDisabled() {
    const host = await this.host();
    return (await host.getAttribute('aria-disabled')) === 'true';
  }
  async getOrientation() {
    const host = await this.host();
    return await host.getAttribute('aria-orientation');
  }
}

export { ToolbarHarness, ToolbarWidgetGroupHarness, ToolbarWidgetHarness };
//# sourceMappingURL=toolbar-testing.mjs.map
