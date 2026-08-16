import * as _angular_cdk_testing from '@angular/cdk/testing';
import { BaseHarnessFilters, ComponentHarness, HarnessPredicate, ContentContainerComponentHarness } from '@angular/cdk/testing';

/** Filters for locating an `AccordionHarness`. */
interface AccordionHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose title text matches the given value. */
    title?: string | RegExp;
    /** Only find instances whose expanded state matches the given value. */
    expanded?: boolean;
    /** Only find instances whose disabled state matches the given value. */
    disabled?: boolean;
}
/** Filters for locating an `AccordionGroupHarness`. */
interface AccordionGroupHarnessFilters extends BaseHarnessFilters {
}

/** Selectors for the sections that may contain user content. */
declare enum AccordionSection {
    TRIGGER = "[ngAccordionTrigger]",
    PANEL = "[ngAccordionPanel]"
}
/** Harness for interacting with a standard ngAccordion item in tests. */
declare class AccordionHarness extends ContentContainerComponentHarness<AccordionSection> {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for an accordion
     * with specific attributes.
     */
    static with(options?: AccordionHarnessFilters): HarnessPredicate<AccordionHarness>;
    /** Overrides the internal loader to automatically resolve queries inside the associated panel. */
    protected getRootHarnessLoader(): Promise<_angular_cdk_testing.HarnessLoader>;
    /** Whether the accordion is expanded. */
    isExpanded(): Promise<boolean>;
    /** Whether the accordion is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the title text of the accordion. */
    getTitle(): Promise<string>;
    /** Toggles the expanded state of the accordion by clicking on the trigger. */
    toggle(): Promise<void>;
    /** Expands the accordion if collapsed. */
    expand(): Promise<void>;
    /** Collapses the accordion if expanded. */
    collapse(): Promise<void>;
    /** Focuses the accordion trigger. */
    focus(): Promise<void>;
    /** Blurs the accordion trigger. */
    blur(): Promise<void>;
    /** Whether the accordion trigger is focused. */
    isFocused(): Promise<boolean>;
}
/** Harness for interacting with an `ngAccordionGroup` in tests. */
declare class AccordionGroupHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for an accordion group with specific attributes.
     */
    static with(options?: AccordionGroupHarnessFilters): HarnessPredicate<AccordionGroupHarness>;
    /** Gets all accordions within this group. */
    getAccordions(filters?: AccordionHarnessFilters): Promise<AccordionHarness[]>;
}

export { AccordionGroupHarness, AccordionHarness, AccordionSection };
export type { AccordionGroupHarnessFilters, AccordionHarnessFilters };
