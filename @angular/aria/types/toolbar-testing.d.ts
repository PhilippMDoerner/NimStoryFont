import { BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate, ComponentHarness } from '@angular/cdk/testing';

/** A set of criteria that can be used to filter a list of Aria toolbar instances. */
interface ToolbarHarnessFilters extends BaseHarnessFilters {
}
/** A set of criteria that can be used to filter a list of Aria toolbar widget group instances. */
interface ToolbarWidgetGroupHarnessFilters extends BaseHarnessFilters {
}
/** A set of criteria that can be used to filter a list of Aria toolbar widgets. */
interface ToolbarWidgetHarnessFilters extends BaseHarnessFilters {
    /** Text that the widget should match. */
    text?: string | RegExp;
    /** Active state that the widget should match. */
    active?: boolean;
    /** Selected state that the widget should match. */
    selected?: boolean;
}

/** Harness for interacting with an Aria toolbar widget in tests. */
declare class ToolbarWidgetHarness extends ContentContainerComponentHarness<string> {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `ToolbarWidgetHarness`
     * that meets certain criteria.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: ToolbarWidgetHarnessFilters): HarnessPredicate<ToolbarWidgetHarness>;
    /** Gets the widget's text. */
    getText(): Promise<string>;
    /** Clicks the widget. */
    click(): Promise<void>;
    /** Gets whether the widget is active. */
    isActive(): Promise<boolean>;
    /** Gets whether the widget is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets whether the widget is selected. */
    isSelected(): Promise<boolean>;
}

/** Harness for interacting with an Aria toolbar widget group in tests. */
declare class ToolbarWidgetGroupHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `ToolbarWidgetGroupHarness`
     * that meets certain criteria.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: ToolbarWidgetGroupHarnessFilters): HarnessPredicate<ToolbarWidgetGroupHarness>;
    /** Gets all widgets in the group. */
    getWidgets(filters?: ToolbarWidgetHarnessFilters): Promise<ToolbarWidgetHarness[]>;
}

/** Harness for interacting with an Aria toolbar in tests. */
declare class ToolbarHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a `ToolbarHarness`
     * that meets certain criteria.
     * @param options Options for filtering which dialog instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: ToolbarHarnessFilters): HarnessPredicate<ToolbarHarness>;
    /** Gets all widgets in the toolbar. */
    getWidgets(filters?: ToolbarWidgetHarnessFilters): Promise<ToolbarWidgetHarness[]>;
    /** Gets all widget groups in the toolbar. */
    getWidgetGroups(filters?: ToolbarWidgetGroupHarnessFilters): Promise<ToolbarWidgetGroupHarness[]>;
    /** Gets whether the toolbar is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the orientation of the toolbar. */
    getOrientation(): Promise<'vertical' | 'horizontal'>;
}

export { ToolbarHarness, ToolbarWidgetGroupHarness, ToolbarWidgetHarness };
export type { ToolbarHarnessFilters, ToolbarWidgetGroupHarnessFilters, ToolbarWidgetHarnessFilters };
