import { BaseHarnessFilters, ContentContainerComponentHarness, HarnessPredicate, ComponentHarness, ComponentHarnessConstructor, HarnessLoader } from '@angular/cdk/testing';

/** A set of criteria that can be used to filter a list of `ComboboxHarness` instances. */
interface ComboboxHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose placeholder matches the given value. */
    placeholder?: string | RegExp;
    /** Only find instances whose value matches the given value. */
    value?: string | RegExp;
    /** Only find instances with the given disabled state. */
    disabled?: boolean;
}

/** Harness for interacting with a standard `ngCombobox` input element in tests. */
declare class ComboboxHarness extends ContentContainerComponentHarness {
    static hostSelector: string;
    /**
     * Gets a `HarnessPredicate` that can be used to search for a combobox with specific attributes.
     * @param options Options for filtering which combobox instances are considered a match.
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options?: ComboboxHarnessFilters): HarnessPredicate<ComboboxHarness>;
    /**
     * Gets the component harness for the active widget contained inside the popup.
     * Use this when you need to access the harness of the widget itself (e.g., `ListboxHarness`),
     * rather than querying items within it.
     * @param type The harness type to locate. Must implement standard static `.with()` method.
     */
    getPopupWidget<T extends ComponentHarness>(type: ComponentHarnessConstructor<T> & {
        with: (options?: {
            selector?: string;
        }) => HarnessPredicate<T>;
    }): Promise<T>;
    /**
     * Gets a harness loader scoped to the content inside the popup container.
     * Note that lookups performed by this loader will only find descendants of the popup container.
     */
    getPopupLoader(): Promise<HarnessLoader>;
    /** Overrides root loader to automatically resolve queries nested inside the associated popup. */
    protected getRootHarnessLoader(): Promise<HarnessLoader>;
    /** Whether the combobox is expanded (popup is open). */
    isOpen(): Promise<boolean>;
    /** Whether the combobox is disabled. */
    isDisabled(): Promise<boolean>;
    /** Gets the current value string of the combobox input. */
    getValue(): Promise<string>;
    /** Sets the value of the combobox input. */
    setValue(value: string): Promise<void>;
    /** Gets the placeholder text of the combobox. */
    getPlaceholder(): Promise<string | null>;
    /** Opens the combobox popup if it is currently closed. */
    open(): Promise<void>;
    /** Closes the combobox popup if it is currently open. */
    close(): Promise<void>;
    /** Focuses the combobox. */
    focus(): Promise<void>;
    /** Blurs the combobox. */
    blur(): Promise<void>;
    /** Whether the combobox has focus. */
    isFocused(): Promise<boolean>;
}

export { ComboboxHarness };
export type { ComboboxHarnessFilters };
