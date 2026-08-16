import { BaseHarnessFilters, ComponentHarness, HarnessPredicate, TestElement } from '@angular/cdk/testing';

/** Filters for locating a `MenuHarness`. */
interface MenuHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose trigger text matches the given value. */
    triggerText?: string | RegExp;
}
/** Filters for locating a `MenuItemHarness`. */
interface MenuItemHarnessFilters extends BaseHarnessFilters {
    /** Only find instances whose text matches the given value. */
    text?: string | RegExp;
    /** Only find instances whose disabled state matches the given value. */
    disabled?: boolean;
    /** Only find instances whose expanded state matches the given value. */
    expanded?: boolean;
}

/** Harness for interacting with a standard ngMenuItem in tests. */
declare class MenuItemHarness extends ComponentHarness {
    static hostSelector: string;
    static with(options?: MenuItemHarnessFilters): HarnessPredicate<MenuItemHarness>;
    /** Gets the text content of the menu item. */
    getText(): Promise<string>;
    /** Whether the menu item is disabled. */
    isDisabled(): Promise<boolean>;
    /** Whether the menu item is expanded (contains an open submenu). */
    isExpanded(): Promise<boolean>;
    /** Clicks the menu item to trigger its action or toggle its submenu. */
    click(): Promise<void>;
    /** Resolves the nested submenu panel associated with this menu item, if any exists. */
    getSubmenu(): Promise<MenuHarness | null>;
    /** Whether the menu item has focus. */
    isFocused(): Promise<boolean>;
    /** Whether the menu item acts as a submenu trigger. */
    hasSubmenu(): Promise<boolean>;
}
/** Harness for interacting with a standard ngMenu or ngMenuBar in tests. */
declare class MenuHarness extends ComponentHarness {
    static hostSelector: string;
    static with(options?: MenuHarnessFilters): HarnessPredicate<MenuHarness>;
    /** Resolves the trigger associated with this menu container via aria-controls inversion. */
    _getTrigger(): Promise<TestElement | null>;
    /** Checks whether the menu container is visible. */
    isOpen(): Promise<boolean>;
    /** Whether the menu is a menu bar. */
    isMenuBar(): Promise<boolean>;
    /** Opens the menu if it is currently closed. */
    open(): Promise<void>;
    /** Closes the menu if it is currently open. */
    close(): Promise<void>;
    /** Queries all menu items inside this menu container. */
    getItems(filters?: MenuItemHarnessFilters): Promise<MenuItemHarness[]>;
}

export { MenuHarness, MenuItemHarness };
export type { MenuHarnessFilters, MenuItemHarnessFilters };
