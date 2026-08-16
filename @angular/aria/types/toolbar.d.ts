import * as _angular_core from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import * as _angular_cdk_bidi from '@angular/cdk/bidi';
import { ToolbarWidgetGroupPattern, ToolbarWidgetPattern, ToolbarPattern } from './_toolbar-chunk.js';
import { SortedCollection } from './_collection-chunk.js';
import './_list-chunk.js';
import './_list-navigation-chunk.js';

/**
 * A directive that groups toolbar widgets, used for more complex widgets like radio groups
 * that have their own internal navigation.
 *
 * @see [Toolbar](guide/aria/toolbar)
 */
declare class ToolbarWidgetGroup<V> {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The parent Toolbar. */
    private readonly _toolbar;
    /** The list of child widgets within the group. */
    private readonly _widgets;
    /** The parent Toolbar UIPattern. */
    private readonly _toolbarPattern;
    /** Whether the widget group is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The list of toolbar items within the group. */
    private readonly _itemPatterns;
    /** Whether the group allows multiple widgets to be selected. */
    readonly multi: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The ToolbarWidgetGroup UIPattern. */
    readonly _pattern: ToolbarWidgetGroupPattern<ToolbarWidgetPattern<V>, V>;
    constructor();
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ToolbarWidgetGroup<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<ToolbarWidgetGroup<any>, "[ngToolbarWidgetGroup]", ["ngToolbarWidgetGroup"], { "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "multi": { "alias": "multi"; "required": false; "isSignal": true; }; }, {}, ["_widgets"], never, true, never>;
}

/**
 * A widget within a toolbar.
 *
 * The `ngToolbarWidget` directive should be applied to any native HTML element that acts
 * as an interactive widget within an `ngToolbar` or `ngToolbarWidgetGroup`. It enables
 * keyboard navigation and selection within the toolbar.
 *
 * ```html
 * <button ngToolbarWidget value="action-id" [disabled]="isDisabled">
 *   Perform Action
 * </button>
 * ```
 *
 * @see [Toolbar](guide/aria/toolbar)
 */
declare class ToolbarWidget<V> implements OnInit, OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The parent Toolbar. */
    private readonly _toolbar;
    /** A unique identifier for the widget. */
    readonly id: _angular_core.InputSignal<string>;
    /** The parent Toolbar UIPattern. */
    readonly _toolbarPattern: _angular_core.Signal<ToolbarPattern<V>>;
    /** Whether the widget is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the widget is 'hard' disabled, which is different from `aria-disabled`. A hard disabled widget cannot receive focus. */
    readonly hardDisabled: _angular_core.Signal<boolean>;
    /** The optional ToolbarWidgetGroup this widget belongs to. */
    readonly _group: ToolbarWidgetGroup<V> | null;
    /** The value associated with the widget. */
    readonly value: _angular_core.InputSignal<V>;
    /** Whether the widget is currently active (focused). */
    readonly active: _angular_core.Signal<boolean>;
    /** Whether the widget is selected (only relevant in a selection group). */
    readonly selected: () => boolean;
    private readonly _groupPattern;
    /** The ToolbarWidget UIPattern. */
    readonly _pattern: ToolbarWidgetPattern<V>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ToolbarWidget<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<ToolbarWidget<any>, "[ngToolbarWidget]", ["ngToolbarWidget"], { "id": { "alias": "id"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * A toolbar widget container for a group of interactive widgets, such as
 * buttons or radio groups. It provides a single point of reference for keyboard navigation
 * and focus management. It supports various orientations and disabled states.
 *
 * ```html
 * <div ngToolbar orientation="horizontal" [wrap]="true">
 *   <button ngToolbarWidget value="save">Save</button>
 *   <button ngToolbarWidget value="print">Print</button>
 *
 *   <div ngToolbarWidgetGroup [(value)]="selectedAlignment">
 *     <button ngToolbarWidget value="left">Left</button>
 *     <button ngToolbarWidget value="center">Center</button>
 *     <button ngToolbarWidget value="right">Right</button>
 *   </div>
 * </div>
 * ```
 *
 * @see [Toolbar](guide/aria/toolbar)
 */
declare class Toolbar<V> implements OnDestroy {
    /** A reference to the host element. */
    private readonly _elementRef;
    /** A reference to the host element. */
    readonly element: HTMLElement;
    /** The collection of widgets in the toolbar. */
    readonly _collection: SortedCollection<ToolbarWidget<V>>;
    /** Text direction. */
    readonly textDirection: _angular_core.WritableSignal<_angular_cdk_bidi.Direction>;
    /** Sorted UIPatterns of the child widgets */
    readonly _itemPatterns: _angular_core.Signal<ToolbarWidgetPattern<V>[]>;
    /** Whether the toolbar is vertically or horizontally oriented. */
    readonly orientation: _angular_core.InputSignal<"vertical" | "horizontal">;
    /**
     * Whether to allow disabled items to receive focus. When `true`, disabled items are
     * focusable but not interactive. When `false`, disabled items are skipped during navigation.
     */
    readonly softDisabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether the toolbar is disabled. */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether focus should wrap when navigating. */
    readonly wrap: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** The values of the selected widgets within the toolbar. */
    readonly value: _angular_core.ModelSignal<V[]>;
    /** The toolbar UIPattern. */
    readonly _pattern: ToolbarPattern<V>;
    constructor();
    ngOnDestroy(): void;
    /** Finds the toolbar item associated with a given element. */
    private _getItem;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Toolbar<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<Toolbar<any>, "[ngToolbar]", ["ngToolbar"], { "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; "softDisabled": { "alias": "softDisabled"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "wrap": { "alias": "wrap"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}

export { Toolbar, ToolbarWidget, ToolbarWidgetGroup };
