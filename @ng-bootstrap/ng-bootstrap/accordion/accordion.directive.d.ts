import { AfterContentChecked, AfterContentInit, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { NgbCollapse } from '../collapse/collapse';
import * as i0 from "@angular/core";
import * as i1 from "../collapse/collapse";
/**
 * A directive that wraps the content of an accordion item's collapsible body.
 *
 * The actual content is provided in a child `ng-template` element.
 * Depending on the state of the accordion, the template will be either inserted or removed from the DOM.
 *
 * @since 14.1.0
 */
export declare class NgbAccordionBody implements AfterContentChecked, OnDestroy {
    private _item;
    private _viewRef;
    /**
     * the `ElementRef` of the component
     *
     * @since 18.0.0
     */
    readonly elementRef: ElementRef<any>;
    private _vcr;
    private _bodyTpl;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    private _destroyViewIfExists;
    private _createViewIfNotExists;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionBody, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgbAccordionBody, "[ngbAccordionBody]", never, {}, {}, ["_bodyTpl"], ["*"], true, never>;
}
/**
 * A directive that wraps the collapsible item's content of the accordion.
 *
 * Internally it reuses the [`NgbCollapse` directive](#/components/collapse)
 *
 * @since 14.1.0
 */
export declare class NgbAccordionCollapse {
    item: NgbAccordionItem;
    ngbCollapse: NgbCollapse;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionCollapse, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionCollapse, "[ngbAccordionCollapse]", ["ngbAccordionCollapse"], {}, {}, never, never, true, [{ directive: typeof i1.NgbCollapse; inputs: {}; outputs: {}; }]>;
}
/**
 * A directive to put on a toggling element inside the accordion item's header.
 * It will register click handlers that toggle the associated panel and will handle accessibility attributes.
 *
 * This directive is used internally by the [`NgbAccordionButton` directive](#/components/accordion/api#NgbAccordionButton).
 *
 * @since 14.1.0
 */
export declare class NgbAccordionToggle {
    item: NgbAccordionItem;
    accordion: NgbAccordionDirective;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionToggle, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionToggle, "[ngbAccordionToggle]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive to put on a button element inside an accordion item's header.
 *
 * If you want a custom markup for the header, you can also use the [`NgbAccordionToggle` directive](#/components/accordion/api#NgbAccordionToggle).
 *
 * @since 14.1.0
 */
export declare class NgbAccordionButton {
    item: NgbAccordionItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionButton, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionButton, "button[ngbAccordionButton]", never, {}, {}, never, never, true, [{ directive: typeof NgbAccordionToggle; inputs: {}; outputs: {}; }]>;
}
/**
 * A directive that wraps an accordion item's header.
 *
 * @since 14.1.0
 */
export declare class NgbAccordionHeader {
    item: NgbAccordionItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionHeader, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionHeader, "[ngbAccordionHeader]", never, {}, {}, never, never, true, never>;
}
/**
 * A directive that wraps an accordion item: a toggleable header + body that collapses.
 *
 * You can get hold of the `NgbAccordionItem` instance in the template with `#item="ngbAccordionItem"`.
 * It allows to check if the item is collapsed or not, toggle the collapse state, etc.
 *
 * Every accordion item has a string ID that is automatically generated in the `ngb-accordion-item-XX` format, unless provided explicitly.
 *
 * @since 14.1.0
 */
export declare class NgbAccordionItem implements AfterContentInit {
    private _accordion;
    private _cd;
    private _destroyRef;
    private _collapsed;
    private _id;
    private _destroyOnHide;
    private _collapseAnimationRunning;
    private _collapse;
    /**
     * Sets the custom ID of the accordion item. It must be unique for the document.
     *
     * @param id The ID of the accordion item, must be a non-empty string
     */
    set id(id: string);
    /**
     * If `true`, the content of the accordion item's body will be removed from the DOM. It will be just hidden otherwise.
     *
     * This property can also be set up on the parent [`NgbAccordion` directive](#/components/accordion/api#NgbAccordionDirective).
     */
    set destroyOnHide(destroyOnHide: boolean);
    get destroyOnHide(): boolean;
    /**
     * If `true`, the accordion item will be disabled.
     * It won't react to user's clicks, but still will be toggelable programmatically.
     */
    disabled: boolean;
    /**
     *	If `true`, the accordion item will be collapsed. Otherwise, it will be expanded.
     *
     * @param collapsed New state of the accordion item.
     */
    set collapsed(collapsed: boolean);
    /**
     * Event emitted before the expanding animation starts. It has no payload.
     *
     * @since 15.1.0
     */
    show: EventEmitter<void>;
    /**
     * Event emitted when the expanding animation is finished. It has no payload.
     */
    shown: EventEmitter<void>;
    /**
     * Event emitted before the collapsing animation starts. It has no payload.
     *
     * @since 15.1.0
     */
    hide: EventEmitter<void>;
    /**
     * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
     * It has no payload.
     */
    hidden: EventEmitter<void>;
    get collapsed(): boolean;
    get id(): string;
    get toggleId(): string;
    get collapseId(): string;
    get _shouldBeInDOM(): boolean;
    ngAfterContentInit(): void;
    /**
     * Toggles an accordion item.
     */
    toggle(): void;
    /**
     * Expands an accordion item.
     */
    expand(): void;
    /**
     * Collapses an accordion item.
     */
    collapse(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionItem, "[ngbAccordionItem]", ["ngbAccordionItem"], { "id": { "alias": "ngbAccordionItem"; "required": false; }; "destroyOnHide": { "alias": "destroyOnHide"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "collapsed": { "alias": "collapsed"; "required": false; }; }, { "show": "show"; "shown": "shown"; "hide": "hide"; "hidden": "hidden"; }, ["_collapse"], never, true, never>;
}
/**
 * Accordion is a stack of cards that have a header and collapsible body.
 *
 * This directive is a container for these items and provides an API to handle them.
 *
 * @since 14.1.0
 */
export declare class NgbAccordionDirective {
    private _config;
    private _anItemWasAlreadyExpandedDuringInitialisation;
    private _items?;
    /**
     * If `true`, accordion will be animated.
     */
    animation: boolean;
    /**
     * If `true`, only one item at the time can stay open.
     */
    closeOthers: boolean;
    /**
     * If `true`, the content of the accordion items body will be removed from the DOM. It will be just hidden otherwise.
     *
     * This property can be overwritten at the [`NgbAccordionItem`](#/components/accordion/api#NgbAccordionItem) level
     */
    destroyOnHide: boolean;
    /**
     * Event emitted before expanding animation starts. The payload is the id of shown accordion item.
     *
     * @since 15.1.0
     */
    show: EventEmitter<string>;
    /**
     * Event emitted when the expanding animation is finished. The payload is the id of shown accordion item.
     */
    shown: EventEmitter<string>;
    /**
     * Event emitted before the collapsing animation starts. The payload is the id of hidden accordion item.
     *
     * @since 15.1.0
     */
    hide: EventEmitter<string>;
    /**
     * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
     * The payload is the id of hidden accordion item.
     */
    hidden: EventEmitter<string>;
    /**
     * Toggles an item with the given id.
     *
     * It will toggle an item, even if it is disabled.
     *
     * @param itemId The id of the item to toggle.
     */
    toggle(itemId: string): void;
    /**
     * Expands an item with the given id.
     *
     * If `closeOthers` is `true`, it will collapse other panels.
     *
     * @param itemId The id of the item to expand.
     */
    expand(itemId: string): void;
    /**
     * Expands all items.
     *
     * If `closeOthers` is `true` and all items are closed, it will open the first one. Otherwise, it will keep the opened one.
     */
    expandAll(): void;
    /**
     * Collapses an item with the given id.
     *
     * Has no effect if the `itemId` does not correspond to any item.
     *
     * @param itemId The id of the item to collapse.
     */
    collapse(itemId: string): void;
    /**
     * Collapses all items.
     */
    collapseAll(): void;
    /**
     * Checks if an item with the given id is expanded.
     *
     * If the `itemId` does not correspond to any item, it returns `false`.
     *
     * @param itemId The id of the item to check.
     */
    isExpanded(itemId: string): boolean;
    /**
     * It checks, if the item can be expanded in the current state of the accordion.
     * With `closeOthers` there can be only one expanded item at a time.
     *
     * @internal
     */
    _ensureCanExpand(toExpand: NgbAccordionItem): boolean;
    private _getItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgbAccordionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgbAccordionDirective, "[ngbAccordion]", ["ngbAccordion"], { "animation": { "alias": "animation"; "required": false; }; "closeOthers": { "alias": "closeOthers"; "required": false; }; "destroyOnHide": { "alias": "destroyOnHide"; "required": false; }; }, { "show": "show"; "shown": "shown"; "hide": "hide"; "hidden": "hidden"; }, ["_items"], never, true, never>;
}
