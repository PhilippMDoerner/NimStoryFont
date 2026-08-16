import { BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate, HarnessLoader, ComponentHarness } from '@angular/cdk/testing';

/** A set of criteria that can be used to filter a list of `TabsHarness` instances. */
interface TabsHarnessFilters extends BaseHarnessFilters {
}
/** A set of criteria that can be used to filter a list of `TabHarness` instances. */
interface TabHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose title matches the given value. */
    title?: string | RegExp;
    /** Only find instances that are selected. */
    selected?: boolean;
    /** Only find instances that are disabled. */
    disabled?: boolean;
}

/** Harness for interacting with an Aria tab in tests. */
declare class TabHarness extends ContentContainerComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `TabHarness`
     * that meets certain criteria.
     * @param options Options for filtering which tab instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: TabHarnessFilters): HarnessPredicate<TabHarness>;
    /** Gets the tab's title text. */
    getTitle(): Promise<string>;
    /** Clicks the tab to select it. */
    select(): Promise<void>;
    /** Gets whether the tab is selected. */
    isSelected(): Promise<boolean>;
    /** Gets whether the tab is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets whether the tab is active. */
    isActive(): Promise<boolean>;
    protected getRootHarnessLoader(): Promise<HarnessLoader>;
}
/** Harness for interacting with an Aria tabs container in tests. */
declare class TabsHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `TabsHarness`
     * that meets certain criteria.
     * @param options Options for filtering which tabs instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: TabsHarnessFilters): HarnessPredicate<TabsHarness>;
    /** Gets all tabs inside the tabs container. */
    getTabs(filters?: TabHarnessFilters): Promise<TabHarness[]>;
    /** Gets the currently selected tab. */
    getSelectedTab(): Promise<TabHarness | null>;
    /** Selects a tab matching the given filters. */
    selectTab(filters?: TabHarnessFilters): Promise<void>;
}

export { TabHarness, TabsHarness };
export type { TabHarnessFilters, TabsHarnessFilters };
