import * as _angular_core from '@angular/core';
import { OnInit, OnDestroy, WritableSignal } from '@angular/core';
import * as _angular_cdk_bidi from '@angular/cdk/bidi';
import { TabPattern, TabListPattern, TabPanelPattern } from './_tabs-chunk.js';
import { HasElement, SortedCollection } from './_collection-chunk.js';
import { DeferredContentAware, DeferredContent } from './_deferred-content-chunk.js';
import './_keyboard-event-manager-chunk.js';
import './_click-event-manager-chunk.js';
import './_expansion-chunk.js';
import './_list-navigation-chunk.js';

/**
 * A selectable tab in a TabList.
 *
 * The `ngTab` directive represents an individual tab control within an `ngTabList`. It
 * requires a `value` that uniquely identifies it and links it to a corresponding `ngTabPanel`.
 *
 * ```html
 * <li ngTab value="myTabId" [disabled]="isTabDisabled">
 *   My Tab Label
 * </li>
 * ```
 *
 * @see [Tabs](guide/aria/tabs)
 */
declare class Tab implements HasElement, OnInit, OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The parent TabList. */
    private readonly _tabList;
    /** A unique identifier for the widget. */
    readonly id: _angular_core.InputSignal<string>;
    /** The TabPanel UIPattern associated with the tab */
    private readonly _tabpanelPattern;
    /** Whether a tab is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The remote tabpanel unique identifier. */
    readonly value: _angular_core.InputSignal<string>;
    /** Whether the tab is active. */
    readonly active: _angular_core.Signal<boolean>;
    /** Whether the tab is selected. */
    readonly selected: _angular_core.Signal<boolean>;
    /** The Tab UIPattern. */
    readonly _pattern: TabPattern;
    /** Opens this tab panel. */
    open(): void;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Tab, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<Tab, "[ngTab]", ["ngTab"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * A TabList container.
 *
 * The `ngTabList` directive controls a list of `ngTab` elements. It manages keyboard
 * navigation, selection, and the overall orientation of the tabs. It should be placed
 * within an `ngTabs` container.
 *
 * ```html
 * <ul ngTabList [(selectedTab)]="mySelectedTab" orientation="horizontal" selectionMode="explicit">
 *   <li ngTab value="first">First Tab</li>
 *   <li ngTab value="second">Second Tab</li>
 * </ul>
 * ```
 *
 * @see [Tabs](guide/aria/tabs)
 */
declare class TabList implements OnInit, OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The parent Tabs container. */
    readonly _tabsParent: Tabs;
    /** The collection of Tabs. */
    readonly _collection: SortedCollection<Tab>;
    /** The Tab UIPatterns of the child Tabs. */
    readonly _tabPatterns: _angular_core.Signal<TabPattern[]>;
    /** Whether the tablist is vertically or horizontally oriented. */
    readonly orientation: _angular_core.InputSignal<"vertical" | "horizontal">;
    /** Text direction. */
    readonly textDirection: WritableSignal<_angular_cdk_bidi.Direction>;
    /** Whether focus should wrap when navigating. */
    readonly wrap: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Whether to allow disabled items to receive focus. When `true`, disabled items are
     * focusable but not interactive. When `false`, disabled items are skipped during navigation.
     */
    readonly softDisabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * The focus strategy used by the tablist.
     * - `roving`: Focus is moved to the active tab using `tabindex`.
     * - `activedescendant`: Focus remains on the tablist container, and `aria-activedescendant` is used to indicate the active tab.
     */
    readonly focusMode: _angular_core.InputSignal<"roving" | "activedescendant">;
    /**
     * The selection strategy used by the tablist.
     * - `follow`: The focused tab is automatically selected.
     * - `explicit`: Tabs are selected explicitly by the user (e.g., via click or spacebar).
     */
    readonly selectionMode: _angular_core.InputSignal<"follow" | "explicit">;
    /** The current selected tab as a model input. */
    readonly selectedTab: _angular_core.ModelSignal<string | undefined>;
    /** The current selected Tab pattern, passed to the List pattern. */
    private readonly _selectedTabPattern;
    /** Whether the tablist is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The TabList UIPattern. */
    readonly _pattern: TabListPattern;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    /** Opens the tab panel with the specified value. */
    open(value: string): boolean;
    findTab(value?: string): Tab | undefined;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TabList, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<TabList, "[ngTabList]", ["ngTabList"], { "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; "wrap": { "alias": "wrap"; "required": false; "isSignal": true; }; "softDisabled": { "alias": "softDisabled"; "required": false; "isSignal": true; }; "focusMode": { "alias": "focusMode"; "required": false; "isSignal": true; }; "selectionMode": { "alias": "selectionMode"; "required": false; "isSignal": true; }; "selectedTab": { "alias": "selectedTab"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "selectedTab": "selectedTabChange"; }, never, never, true, never>;
}

/**
 * A TabPanel container for the resources of layered content associated with a tab.
 *
 * The `ngTabPanel` directive holds the content for a specific tab. It is linked to an
 * `ngTab` by a matching `value`. If a tab panel is hidden, the `inert` attribute will be
 * applied to remove it from the accessibility tree. Proper styling is required for visual hiding.
 *
 * ```html
 * <div ngTabPanel value="myTabId">
 *   <ng-template ngTabContent>
 *     <!-- Content for the tab panel -->
 *   </ng-template>
 * </div>
 * ```
 *
 * @see [Tabs](guide/aria/tabs)
 */
declare class TabPanel implements OnInit, OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The DeferredContentAware host directive. */
    private readonly _deferredContentAware;
    /** The parent Tabs. */
    private readonly _tabs;
    /** A global unique identifier for the tab. */
    readonly id: _angular_core.InputSignal<string>;
    /** The Tab UIPattern associated with the tabpanel */
    private readonly _tabPattern;
    /** A local unique identifier for the tabpanel. */
    readonly value: _angular_core.InputSignal<string>;
    /** Whether the tab panel is visible. */
    readonly visible: _angular_core.Signal<boolean>;
    /** The TabPanel UIPattern. */
    readonly _pattern: TabPanelPattern;
    private readonly _tabContent;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TabPanel, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<TabPanel, "[ngTabPanel]", ["ngTabPanel"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": true; "isSignal": true; }; }, {}, ["_tabContent"], never, true, [{ directive: typeof DeferredContentAware; inputs: { "preserveContent": "preserveContent"; }; outputs: {}; }]>;
}

/**
 * A Tabs container.
 *
 * The `ngTabs` directive represents a set of layered sections of content. It acts as the
 * overarching container for a tabbed interface, coordinating the behavior of `ngTabList`,
 * `ngTab`, and `ngTabPanel` directives.
 *
 * ```html
 * <div ngTabs>
 *   <ul ngTabList [(selectedTab)]="selectedTabValue">
 *     <li ngTab value="tab1">Tab 1</li>
 *     <li ngTab value="tab2">Tab 2</li>
 *     <li ngTab value="tab3">Tab 3</li>
 *   </ul>
 *
 *   <div ngTabPanel value="tab1">
 *      <ng-template ngTabContent>Content for Tab 1</ng-template>
 *   </div>
 *   <div ngTabPanel value="tab2">
 *      <ng-template ngTabContent>Content for Tab 2</ng-template>
 *   </div>
 *   <div ngTabPanel value="tab3">
 *      <ng-template ngTabContent>Content for Tab 3</ng-template>
 *   </div>
 * </div>
 * ```
 *
 * @see [Tabs](guide/aria/tabs)
 */
declare class Tabs implements OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The TabList registered for this container. */
    readonly _tabList: _angular_core.WritableSignal<TabList | undefined>;
    /** The collection of TabPanels. */
    readonly _collection: SortedCollection<TabPanel>;
    /** The Tab UIPattern of the child Tabs. */
    readonly _tabPatterns: _angular_core.Signal<TabPattern[] | undefined>;
    /** The TabPanel UIPattern of the child TabPanels. */
    readonly _tabPanelPatterns: _angular_core.Signal<TabPanelPattern[]>;
    /** A reactive map of tab values to their TabPanelPattern. */
    readonly _panelMap: _angular_core.Signal<Map<string, TabPanelPattern>>;
    /** A reactive map of tab values to their TabPattern. */
    readonly _tabMap: _angular_core.Signal<Map<string, TabPattern>>;
    constructor();
    ngOnDestroy(): void;
    _register(child: TabList): void;
    _unregister(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Tabs, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<Tabs, "[ngTabs]", ["ngTabs"], {}, {}, never, never, true, never>;
}

/**
 * A TabContent container for the lazy-loaded content.
 *
 * This structural directive should be applied to an `ng-template` within an `ngTabPanel`.
 * It enables lazy loading of the tab's content, meaning the content is only rendered
 * when the tab is activated for the first time.
 *
 * ```html
 * <div ngTabPanel value="myTabId">
 *   <ng-template ngTabContent>
 *     <p>This content will be loaded when 'myTabId' is selected.</p>
 *   </ng-template>
 * </div>
 * ```
 *
 * @see [Tabs](guide/aria/tabs)
 */
declare class TabContent {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TabContent, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<TabContent, "ng-template[ngTabContent]", ["ngTabContent"], {}, {}, never, never, true, [{ directive: typeof DeferredContent; inputs: {}; outputs: {}; }]>;
}

export { Tab, TabContent, TabList, TabPanel, Tabs, DeferredContent as ɵɵDeferredContent, DeferredContentAware as ɵɵDeferredContentAware };
