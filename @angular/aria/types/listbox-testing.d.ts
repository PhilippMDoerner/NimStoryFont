import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

/** Filters for locating a `ListboxOptionHarness`. */
interface ListboxOptionHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
    /** Only find instances whose selected state matches the given value. */
    selected?: boolean;
    /** Only find instances whose disabled state matches the given value. */
    disabled?: boolean;
}
/** Filters for locating a `ListboxHarness`. */
interface ListboxHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose disabled state matches the given value. */
    disabled?: boolean;
}

/** Harness for interacting with a standard ngOption in tests. */
declare class ListboxOptionHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for an option
     * with specific attributes.
     * @param options Options for filtering which option instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: ListboxOptionHarnessFilters): HarnessPredicate<ListboxOptionHarness>;
    /** Whether the option is selected. */
    isSelected(): Promise<boolean>;
    /** Whether the option is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the option's text. */
    getText(): Promise<string>;
    /** Clicks the option to toggle its selected state. */
    click(): Promise<void>;
}
/** Harness for interacting with a standard ngListbox in tests. */
declare class ListboxHarness extends ComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a listbox
     * with specific attributes.
     * @param options Options for filtering which listbox instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: ListboxHarnessFilters): HarnessPredicate<ListboxHarness>;
    /** Gets the orientation of the listbox. */
    getOrientation(): Promise<'vertical' | 'horizontal'>;
    /** Whether the listbox is multiselectable. */
    isMulti(): Promise<boolean>;
    /** Whether the listbox is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the options inside the listbox. */
    getOptions(filters?: ListboxOptionHarnessFilters): Promise<ListboxOptionHarness[]>;
    /** Focuses the listbox container. */
    focus(): Promise<void>;
    /** Blurs the listbox container. */
    blur(): Promise<void>;
    /** Gets the ID of the active option. */
    getActiveDescendantId(): Promise<string | null>;
}

export { ListboxHarness, ListboxOptionHarness };
export type { ListboxHarnessFilters, ListboxOptionHarnessFilters };
