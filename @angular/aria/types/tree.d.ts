import * as _angular_cdk_bidi from '@angular/cdk/bidi';
import * as _angular_core from '@angular/core';
import { OnInit, OnDestroy, Signal } from '@angular/core';
import { TreeItemPattern, TreePattern } from './_tree-chunk.js';
import { HasElement, SortedCollection } from './_collection-chunk.js';
import { DeferredContent, DeferredContentAware } from './_deferred-content-chunk.js';
import './_expansion-chunk.js';
import './_list-navigation-chunk.js';
import './_list-chunk.js';
import './_keyboard-event-manager-chunk.js';
import './_click-event-manager-chunk.js';

/**
 * Group that contains children tree items.
 *
 * The `ngTreeItemGroup` structural directive should be applied to an `ng-template` that
 * wraps the child `ngTreeItem` elements. It is used to define a group of children for an
 * expandable `ngTreeItem`. The `ownedBy` input links the group to its parent `ngTreeItem`.
 *
 * ```html
 * <li ngTreeItem [value]="'parent-id'">
 *   Parent Item
 *   <ul role="group">
 *     <ng-template ngTreeItemGroup [ownedBy]="parentTreeItemRef">
 *       <li ngTreeItem [value]="'child-id'">Child Item</li>
 *     </ng-template>
 *   </ul>
 * </li>
 * ```
 *
 * @see [Tree](guide/aria/tree)
 */
declare class TreeItemGroup<V> implements OnInit, OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The DeferredContent host directive. */
    private readonly _deferredContent;
    /** All groupable items that are descendants of the group. */
    private readonly _unorderedItems;
    /** Child items within this group. */
    readonly _childPatterns: _angular_core.Signal<TreeItemPattern<V>[]>;
    /** Tree item that owns the group. */
    readonly ownedBy: _angular_core.InputSignal<TreeItem<V>>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    _register(child: TreeItem<V>): void;
    _unregister(child: TreeItem<V>): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TreeItemGroup<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<TreeItemGroup<any>, "ng-template[ngTreeItemGroup]", ["ngTreeItemGroup"], { "ownedBy": { "alias": "ownedBy"; "required": true; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof DeferredContent; inputs: {}; outputs: {}; }]>;
}

/**
 * A selectable and expandable item in an `ngTree`.
 *
 * The `ngTreeItem` directive represents an individual node within an `ngTree`. It can be
 * selected, expanded (if it has children), and disabled. The `parent` input establishes
 * the hierarchical relationship within the tree.
 *
 * ```html
 * <li ngTreeItem [parent]="parentTreeOrGroup" value="item-id" label="Item Label">
 *   Item Label
 * </li>
 * ```
 */
declare class TreeItem<V> extends DeferredContentAware implements OnInit, OnDestroy, HasElement {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The owned tree item group. */
    private readonly _group;
    /** A unique identifier for the tree item. */
    readonly id: _angular_core.InputSignal<string>;
    /** The value of the tree item. */
    readonly value: _angular_core.InputSignal<V>;
    /** The parent tree root or tree item group. */
    readonly parent: _angular_core.InputSignal<TreeItemGroup<V> | Tree<V>>;
    /** Whether the tree item is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the tree item is selectable. */
    readonly selectable: _angular_core.InputSignal<boolean>;
    /** Whether the tree item is expanded. */
    readonly expanded: _angular_core.ModelSignal<boolean>;
    /** Optional label for typeahead. Defaults to the element's textContent. */
    readonly label: _angular_core.InputSignal<string | undefined>;
    /** Search term for typeahead. */
    readonly searchTerm: Signal<string>;
    /** The tree root. */
    readonly tree: Signal<Tree<V>>;
    /** Whether the item is active. */
    readonly active: Signal<boolean>;
    /** The level of the current item in a tree. */
    readonly level: Signal<number>;
    /** Whether the item is selected. */
    readonly selected: Signal<boolean | undefined>;
    /** Whether this item is visible due to all of its parents being expanded. */
    readonly visible: Signal<boolean>;
    /** Whether the tree is expanded. Use this value for aria-expanded. */
    protected readonly _expanded: Signal<boolean | undefined>;
    /** The UI pattern for this item. */
    _pattern: TreeItemPattern<V>;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    _register(group: TreeItemGroup<V>): void;
    _unregister(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TreeItem<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<TreeItem<any>, "[ngTreeItem]", ["ngTreeItem"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": true; "isSignal": true; }; "parent": { "alias": "parent"; "required": true; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "selectable": { "alias": "selectable"; "required": false; "isSignal": true; }; "expanded": { "alias": "expanded"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, { "expanded": "expandedChange"; }, never, never, true, never>;
}

/**
 * A container that transforms nested lists into an accessible, ARIA-compliant tree structure.
 * It manages the overall state of the tree, including selection, expansion, and keyboard
 * navigation.
 *
 * ```html
 * <ul ngTree [(value)]="selectedItems" [multi]="true">
 *   <ng-template
 *     [ngTemplateOutlet]="treeNodes"
 *     [ngTemplateOutletContext]="{nodes: treeData, parent: tree}"
 *   />
 * </ul>
 *
 * <ng-template #treeNodes let-nodes="nodes" let-parent="parent">
 *   @for (node of nodes; track node.name) {
 *     <li ngTreeItem [parent]="parent" [value]="node.name" [label]="node.name">
 *       {{ node.name }}
 *       @if (node.children) {
 *         <ul role="group">
 *           <ng-template ngTreeItemGroup [ownedBy]="treeItem" #group="ngTreeItemGroup">
 *             <ng-template
 *               [ngTemplateOutlet]="treeNodes"
 *               [ngTemplateOutletContext]="{nodes: node.children, parent: group}"
 *             />
 *           </ng-template>
 *         </ul>
 *       }
 *     </li>
 *   }
 * </ng-template>
 * ```
 *
 * @see [Tree](guide/aria/tree)
 */
declare class Tree<V> implements OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The collection of tree items. */
    readonly _collection: SortedCollection<TreeItem<V>>;
    /** A unique identifier for the tree. */
    readonly id: _angular_core.InputSignal<string>;
    /** Orientation of the tree. */
    readonly orientation: _angular_core.InputSignal<"vertical" | "horizontal">;
    /** Whether multi-selection is allowed. */
    readonly multi: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the tree is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * The selection strategy used by the tree.
     * - `explicit`: Items are selected explicitly by the user (e.g., via click or spacebar).
     * - `follow`: The focused item is automatically selected.
     */
    readonly selectionMode: _angular_core.InputSignal<"follow" | "explicit">;
    /**
     * The focus strategy used by the tree.
     * - `roving`: Focus is moved to the active item using `tabindex`.
     * - `activedescendant`: Focus remains on the tree container, and `aria-activedescendant` is used to indicate the active item.
     */
    readonly focusMode: _angular_core.InputSignal<"roving" | "activedescendant">;
    /** Whether navigation wraps. */
    readonly wrap: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * Whether to allow disabled items to receive focus. When `true`, disabled items are
     * focusable but not interactive. When `false`, disabled items are skipped during navigation.
     */
    readonly softDisabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The delay in seconds before the typeahead search is reset. */
    readonly typeaheadDelay: _angular_core.InputSignal<number>;
    /** The tabindex of the tree. */
    readonly tabIndex: _angular_core.InputSignalWithTransform<number | undefined, string | number | undefined>;
    /** The values of the currently selected items. */
    readonly value: _angular_core.ModelSignal<V[]>;
    /** Text direction. */
    readonly textDirection: _angular_core.WritableSignal<_angular_cdk_bidi.Direction>;
    /** Whether the tree is in navigation mode. */
    readonly nav: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /**
     * The `aria-current` type. It can be used in navigation trees to indicate the currently active item.
     * See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current for more details.
     */
    readonly currentType: _angular_core.InputSignal<"page" | "step" | "location" | "date" | "time" | "true" | "false">;
    /** The UI pattern for the tree. */
    readonly _pattern: TreePattern<V>;
    /** The ID of the active descendant in the tree. */
    readonly activeDescendant: Signal<string | undefined>;
    constructor();
    ngOnDestroy(): void;
    scrollActiveItemIntoView(options?: ScrollIntoViewOptions): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Tree<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<Tree<any>, "[ngTree]", ["ngTree"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; "multi": { "alias": "multi"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "selectionMode": { "alias": "selectionMode"; "required": false; "isSignal": true; }; "focusMode": { "alias": "focusMode"; "required": false; "isSignal": true; }; "wrap": { "alias": "wrap"; "required": false; "isSignal": true; }; "softDisabled": { "alias": "softDisabled"; "required": false; "isSignal": true; }; "typeaheadDelay": { "alias": "typeaheadDelay"; "required": false; "isSignal": true; }; "tabIndex": { "alias": "tabindex"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "nav": { "alias": "nav"; "required": false; "isSignal": true; }; "currentType": { "alias": "currentType"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

export { Tree, TreeItem, TreeItemGroup, DeferredContent as ɵɵDeferredContent };
