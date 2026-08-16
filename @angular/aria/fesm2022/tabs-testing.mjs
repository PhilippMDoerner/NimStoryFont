import { ContentContainerComponentHarness, HarnessPredicate, ComponentHarness } from '@angular/cdk/testing';

class TabHarness extends ContentContainerComponentHarness {
  static hostSelector = '[ngTab]';
  static with(options = {}) {
    return new HarnessPredicate(TabHarness, options).addOption('title', options.title, (harness, title) => HarnessPredicate.stringMatches(harness.getTitle(), title)).addOption('selected', options.selected, async (harness, selected) => (await harness.isSelected()) === selected).addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled);
  }
  async getTitle() {
    return (await this.host()).text();
  }
  async select() {
    return (await this.host()).click();
  }
  async isSelected() {
    const host = await this.host();
    return (await host.getAttribute('aria-selected')) === 'true';
  }
  async isDisabled() {
    const host = await this.host();
    return (await host.getAttribute('aria-disabled')) === 'true';
  }
  async isActive() {
    const host = await this.host();
    return (await host.getAttribute('data-active')) === 'true';
  }
  async getRootHarnessLoader() {
    const host = await this.host();
    const controlsId = await host.getAttribute('aria-controls');
    const documentRoot = await this.documentRootLocatorFactory().rootHarnessLoader();
    return await documentRoot.getChildLoader(`[ngTabPanel][id="${controlsId}"]`);
  }
}
class TabsHarness extends ComponentHarness {
  static hostSelector = '[ngTabs]';
  static with(options = {}) {
    return new HarnessPredicate(TabsHarness, options);
  }
  async getTabs(filters = {}) {
    return await this.locatorForAll(TabHarness.with(filters))();
  }
  async getSelectedTab() {
    const tabs = await this.getTabs({
      selected: true
    });
    return tabs.length > 0 ? tabs[0] : null;
  }
  async selectTab(filters = {}) {
    const tabs = await this.getTabs(filters);
    if (tabs.length === 0) {
      throw new Error(`Could not find tab matching filters: ${JSON.stringify(filters)}`);
    }
    await tabs[0].select();
  }
}

export { TabHarness, TabsHarness };
//# sourceMappingURL=tabs-testing.mjs.map
