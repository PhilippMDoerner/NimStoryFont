import { ComponentHarness, HarnessPredicate, ContentContainerComponentHarness } from '@angular/cdk/testing';

var AccordionSection;
(function (AccordionSection) {
  AccordionSection["TRIGGER"] = "[ngAccordionTrigger]";
  AccordionSection["PANEL"] = "[ngAccordionPanel]";
})(AccordionSection || (AccordionSection = {}));
class AccordionHarness extends ContentContainerComponentHarness {
  static hostSelector = '[ngAccordionTrigger]';
  static with(options = {}) {
    return new HarnessPredicate(AccordionHarness, options).addOption('title', options.title, (harness, title) => HarnessPredicate.stringMatches(harness.getTitle(), title)).addOption('expanded', options.expanded, async (harness, expanded) => (await harness.isExpanded()) === expanded).addOption('disabled', options.disabled, async (harness, disabled) => (await harness.isDisabled()) === disabled);
  }
  async getRootHarnessLoader() {
    const panelId = await (await this.host()).getAttribute('aria-controls');
    const documentRoot = await this.documentRootLocatorFactory().rootHarnessLoader();
    return documentRoot.getChildLoader(`[ngAccordionPanel][id="${panelId}"]`);
  }
  async isExpanded() {
    return (await (await this.host()).getAttribute('aria-expanded')) === 'true';
  }
  async isDisabled() {
    return (await (await this.host()).getAttribute('aria-disabled')) === 'true';
  }
  async getTitle() {
    return (await this.host()).text();
  }
  async toggle() {
    await (await this.host()).click();
  }
  async expand() {
    if (!(await this.isExpanded())) {
      await this.toggle();
    }
  }
  async collapse() {
    if (await this.isExpanded()) {
      await this.toggle();
    }
  }
  async focus() {
    await (await this.host()).focus();
  }
  async blur() {
    await (await this.host()).blur();
  }
  async isFocused() {
    return (await this.host()).isFocused();
  }
}
class AccordionGroupHarness extends ComponentHarness {
  static hostSelector = '[ngAccordionGroup]';
  static with(options = {}) {
    return new HarnessPredicate(AccordionGroupHarness, options);
  }
  async getAccordions(filters = {}) {
    return this.locatorForAll(AccordionHarness.with(filters))();
  }
}

export { AccordionGroupHarness, AccordionHarness, AccordionSection };
//# sourceMappingURL=accordion-testing.mjs.map
