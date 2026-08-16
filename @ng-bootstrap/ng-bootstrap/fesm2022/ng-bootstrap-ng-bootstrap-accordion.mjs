import * as i0 from '@angular/core';
import { inject, Service, ElementRef, ViewContainerRef, TemplateRef, ContentChild, ViewChild, Component, Directive, ChangeDetectorRef, DestroyRef, EventEmitter, Output, Input, ContentChildren, NgModule } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';
import * as i1 from '@ng-bootstrap/ng-bootstrap/collapse';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap/collapse';
import { isString } from './_ngb-ngbootstrap-utilities.mjs';

/**
 * A configuration service for the [`NgbAccordionDirective`](#/components/accordion/api#NgbAccordionDirective).
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all accordions used in the application.
 */
class NgbAccordionConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.closeOthers = false;
        this.destroyOnHide = true;
    }
    /**
     * @defaultValue `true`
     */
    get animation() {
        return this._animation ?? this._ngbConfig.animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionConfig, decorators: [{
            type: Service
        }] });

let nextId = 0;
/**
 * A directive that wraps the content of an accordion item's collapsible body.
 *
 * The actual content is provided in a child `ng-template` element.
 * Depending on the state of the accordion, the template will be either inserted or removed from the DOM.
 *
 * @since 14.1.0
 */
class NgbAccordionBody {
    constructor() {
        this._item = inject(NgbAccordionItem);
        this._viewRef = null;
        /**
         * the `ElementRef` of the component
         *
         * @since 18.0.0
         */
        this.elementRef = inject(ElementRef);
    }
    ngAfterContentChecked() {
        if (this._bodyTpl) {
            if (this._item._shouldBeInDOM) {
                this._createViewIfNotExists();
            }
            else {
                this._destroyViewIfExists();
            }
        }
    }
    ngOnDestroy() {
        this._destroyViewIfExists();
    }
    _destroyViewIfExists() {
        this._viewRef?.destroy();
        this._viewRef = null;
    }
    _createViewIfNotExists() {
        if (!this._viewRef) {
            this._viewRef = this._vcr.createEmbeddedView(this._bodyTpl);
            this._viewRef.detectChanges();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionBody, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.0.1", type: NgbAccordionBody, isStandalone: true, selector: "[ngbAccordionBody]", host: { classAttribute: "accordion-body" }, queries: [{ propertyName: "_bodyTpl", first: true, predicate: TemplateRef, descendants: true, static: true }], viewQueries: [{ propertyName: "_vcr", first: true, predicate: ["container"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
		<ng-container #container />
		<ng-content />
	`, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionBody, decorators: [{
            type: Component,
            args: [{
                    selector: '[ngbAccordionBody]',
                    template: `
		<ng-container #container />
		<ng-content />
	`,
                    host: {
                        class: 'accordion-body',
                    },
                }]
        }], propDecorators: { _vcr: [{
                type: ViewChild,
                args: ['container', { read: ViewContainerRef, static: true }]
            }], _bodyTpl: [{
                type: ContentChild,
                args: [TemplateRef, { static: true }]
            }] } });
/**
 * A directive that wraps the collapsible item's content of the accordion.
 *
 * Internally it reuses the [`NgbCollapse` directive](#/components/collapse)
 *
 * @since 14.1.0
 */
class NgbAccordionCollapse {
    constructor() {
        this.item = inject(NgbAccordionItem);
        this.ngbCollapse = inject(NgbCollapse);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionCollapse, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbAccordionCollapse, isStandalone: true, selector: "[ngbAccordionCollapse]", host: { attributes: { "role": "region" }, properties: { "id": "item.collapseId", "attr.aria-labelledby": "item.toggleId" }, classAttribute: "accordion-collapse" }, exportAs: ["ngbAccordionCollapse"], hostDirectives: [{ directive: i1.NgbCollapse }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionCollapse, decorators: [{
            type: Directive,
            args: [{
                    exportAs: 'ngbAccordionCollapse',
                    selector: '[ngbAccordionCollapse]',
                    host: {
                        role: 'region',
                        class: 'accordion-collapse',
                        '[id]': 'item.collapseId',
                        '[attr.aria-labelledby]': 'item.toggleId',
                    },
                    hostDirectives: [NgbCollapse],
                }]
        }] });
/**
 * A directive to put on a toggling element inside the accordion item's header.
 * It will register click handlers that toggle the associated panel and will handle accessibility attributes.
 *
 * This directive is used internally by the [`NgbAccordionButton` directive](#/components/accordion/api#NgbAccordionButton).
 *
 * @since 14.1.0
 */
class NgbAccordionToggle {
    constructor() {
        this.item = inject(NgbAccordionItem);
        this.accordion = inject(NgbAccordionDirective);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionToggle, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbAccordionToggle, isStandalone: true, selector: "[ngbAccordionToggle]", host: { listeners: { "click": "!item.disabled && accordion.toggle(item.id)" }, properties: { "id": "item.toggleId", "class.collapsed": "item.collapsed", "attr.aria-controls": "item.collapseId", "attr.aria-expanded": "!item.collapsed" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionToggle]',
                    host: {
                        '[id]': 'item.toggleId',
                        '[class.collapsed]': 'item.collapsed',
                        '[attr.aria-controls]': 'item.collapseId',
                        '[attr.aria-expanded]': '!item.collapsed',
                        '(click)': '!item.disabled && accordion.toggle(item.id)',
                    },
                }]
        }] });
/**
 * A directive to put on a button element inside an accordion item's header.
 *
 * If you want a custom markup for the header, you can also use the [`NgbAccordionToggle` directive](#/components/accordion/api#NgbAccordionToggle).
 *
 * @since 14.1.0
 */
class NgbAccordionButton {
    constructor() {
        this.item = inject(NgbAccordionItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionButton, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbAccordionButton, isStandalone: true, selector: "button[ngbAccordionButton]", host: { attributes: { "type": "button" }, properties: { "disabled": "item.disabled" }, classAttribute: "accordion-button" }, hostDirectives: [{ directive: NgbAccordionToggle }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionButton, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbAccordionButton]',
                    host: {
                        '[disabled]': 'item.disabled',
                        class: 'accordion-button',
                        type: 'button',
                    },
                    hostDirectives: [NgbAccordionToggle],
                }]
        }] });
/**
 * A directive that wraps an accordion item's header.
 *
 * @since 14.1.0
 */
class NgbAccordionHeader {
    constructor() {
        this.item = inject(NgbAccordionItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionHeader, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbAccordionHeader, isStandalone: true, selector: "[ngbAccordionHeader]", host: { attributes: { "role": "heading" }, properties: { "class.collapsed": "item.collapsed" }, classAttribute: "accordion-header" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionHeader]',
                    host: {
                        role: 'heading',
                        class: 'accordion-header',
                        '[class.collapsed]': 'item.collapsed',
                    },
                }]
        }] });
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
class NgbAccordionItem {
    constructor() {
        this._accordion = inject(NgbAccordionDirective);
        this._cd = inject(ChangeDetectorRef);
        this._destroyRef = inject(DestroyRef);
        this._collapsed = true;
        this._id = `ngb-accordion-item-${nextId++}`;
        this._collapseAnimationRunning = false;
        /**
         * If `true`, the accordion item will be disabled.
         * It won't react to user's clicks, but still will be toggelable programmatically.
         */
        this.disabled = false;
        /**
         * Event emitted before the expanding animation starts. It has no payload.
         *
         * @since 15.1.0
         */
        this.show = new EventEmitter();
        /**
         * Event emitted when the expanding animation is finished. It has no payload.
         */
        this.shown = new EventEmitter();
        /**
         * Event emitted before the collapsing animation starts. It has no payload.
         *
         * @since 15.1.0
         */
        this.hide = new EventEmitter();
        /**
         * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
         * It has no payload.
         */
        this.hidden = new EventEmitter();
    }
    /**
     * Sets the custom ID of the accordion item. It must be unique for the document.
     *
     * @param id The ID of the accordion item, must be a non-empty string
     */
    set id(id) {
        if (isString(id) && id !== '') {
            this._id = id;
        }
    }
    /**
     * If `true`, the content of the accordion item's body will be removed from the DOM. It will be just hidden otherwise.
     *
     * This property can also be set up on the parent [`NgbAccordion` directive](#/components/accordion/api#NgbAccordionDirective).
     *
     * @defaultValue `true` - initialized from the parent NgbAccordion directive
     */
    set destroyOnHide(destroyOnHide) {
        this._destroyOnHide = destroyOnHide;
    }
    get destroyOnHide() {
        return this._destroyOnHide === undefined ? this._accordion.destroyOnHide : this._destroyOnHide;
    }
    /**
     *	If `true`, the accordion item will be collapsed. Otherwise, it will be expanded.
     *
     * @defaultValue `true`
     */
    set collapsed(collapsed) {
        if (collapsed) {
            this.collapse();
        }
        else {
            this.expand();
        }
    }
    get collapsed() {
        return this._collapsed;
    }
    get id() {
        return `${this._id}`;
    }
    get toggleId() {
        return `${this.id}-toggle`;
    }
    get collapseId() {
        return `${this.id}-collapse`;
    }
    get _shouldBeInDOM() {
        return !this.collapsed || this._collapseAnimationRunning || !this.destroyOnHide;
    }
    ngAfterContentInit() {
        const { ngbCollapse } = this._collapse;
        // we need to disable the animation for the first init
        ngbCollapse.animation = false;
        ngbCollapse.collapsed = this.collapsed;
        // we set the animation to the default of the accordion
        ngbCollapse.animation = this._accordion.animation;
        // event forwarding from 'ngbCollapse' to 'ngbAccordion'
        ngbCollapse.hidden.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            // when the animation finishes we can remove the template from DOM
            this._collapseAnimationRunning = false;
            this.hidden.emit();
            this._accordion.hidden.emit(this.id);
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
        });
        ngbCollapse.shown.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.shown.emit();
            this._accordion.shown.emit(this.id);
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
        });
    }
    /**
     * Toggles an accordion item.
     */
    toggle() {
        this.collapsed = !this.collapsed;
    }
    /**
     * Expands an accordion item.
     */
    expand() {
        if (this.collapsed) {
            // checking if accordion allows to expand the panel in respect to 'closeOthers' flag
            if (!this._accordion._ensureCanExpand(this)) {
                return;
            }
            this._collapsed = false;
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
            // we need force CD to get template into DOM before starting animation to calculate its height correctly
            // this will synchronously put the item body into DOM, because `this._collapsed` was flipped to `false`
            this._cd.detectChanges();
            // firing events before starting animations
            this.show.emit();
            this._accordion.show.emit(this.id);
            // we also need to make sure 'animation' flag is up-to- date
            this._collapse.ngbCollapse.animation = this._accordion.animation;
            this._collapse.ngbCollapse.collapsed = false;
        }
    }
    /**
     * Collapses an accordion item.
     */
    collapse() {
        if (!this.collapsed) {
            this._collapsed = true;
            this._collapseAnimationRunning = true;
            // need if the accordion is used inside a component having OnPush change detection strategy
            this._cd.markForCheck();
            // firing events before starting animations
            this.hide.emit();
            this._accordion.hide.emit(this.id);
            // we also need to make sure 'animation' flag is up-to- date
            this._collapse.ngbCollapse.animation = this._accordion.animation;
            this._collapse.ngbCollapse.collapsed = true;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbAccordionItem, isStandalone: true, selector: "[ngbAccordionItem]", inputs: { id: ["ngbAccordionItem", "id"], destroyOnHide: "destroyOnHide", disabled: "disabled", collapsed: "collapsed" }, outputs: { show: "show", shown: "shown", hide: "hide", hidden: "hidden" }, host: { properties: { "id": "id" }, classAttribute: "accordion-item" }, queries: [{ propertyName: "_collapse", first: true, predicate: NgbAccordionCollapse, descendants: true, static: true }], exportAs: ["ngbAccordionItem"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordionItem]',
                    exportAs: 'ngbAccordionItem',
                    host: {
                        '[id]': 'id',
                        class: 'accordion-item',
                    },
                }]
        }], propDecorators: { _collapse: [{
                type: ContentChild,
                args: [NgbAccordionCollapse, { static: true }]
            }], id: [{
                type: Input,
                args: ['ngbAccordionItem']
            }], destroyOnHide: [{
                type: Input
            }], disabled: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], show: [{
                type: Output
            }], shown: [{
                type: Output
            }], hide: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });
/**
 * Accordion is a stack of cards that have a header and collapsible body.
 *
 * This directive is a container for these items and provides an API to handle them.
 *
 * @since 14.1.0
 */
class NgbAccordionDirective {
    constructor() {
        this._config = inject(NgbAccordionConfig);
        this._anItemWasAlreadyExpandedDuringInitialisation = false;
        /**
         * If `true`, accordion will be animated.
         */
        this.animation = this._config.animation;
        /**
         * If `true`, only one item at the time can stay open.
         */
        this.closeOthers = this._config.closeOthers;
        /**
         * If `true`, the content of the accordion items body will be removed from the DOM. It will be just hidden otherwise.
         *
         * This property can be overwritten at the [`NgbAccordionItem`](#/components/accordion/api#NgbAccordionItem) level
         */
        this.destroyOnHide = this._config.destroyOnHide;
        /**
         * Event emitted before expanding animation starts. The payload is the id of shown accordion item.
         *
         * @since 15.1.0
         */
        this.show = new EventEmitter();
        /**
         * Event emitted when the expanding animation is finished. The payload is the id of shown accordion item.
         */
        this.shown = new EventEmitter();
        /**
         * Event emitted before the collapsing animation starts. The payload is the id of hidden accordion item.
         *
         * @since 15.1.0
         */
        this.hide = new EventEmitter();
        /**
         * Event emitted when the collapsing animation is finished and before the content is removed from DOM.
         * The payload is the id of hidden accordion item.
         */
        this.hidden = new EventEmitter();
    }
    /**
     * Toggles an item with the given id.
     *
     * It will toggle an item, even if it is disabled.
     *
     * @param itemId The id of the item to toggle.
     */
    toggle(itemId) {
        this._getItem(itemId)?.toggle();
    }
    /**
     * Expands an item with the given id.
     *
     * If `closeOthers` is `true`, it will collapse other panels.
     *
     * @param itemId The id of the item to expand.
     */
    expand(itemId) {
        this._getItem(itemId)?.expand();
    }
    /**
     * Expands all items.
     *
     * If `closeOthers` is `true` and all items are closed, it will open the first one. Otherwise, it will keep the opened one.
     */
    expandAll() {
        if (this._items) {
            if (this.closeOthers) {
                // we check if there is an item open and if it is not we can expand the first item
                // (otherwise we toggle nothing)
                if (!this._items.find((item) => !item.collapsed)) {
                    this._items.first.expand();
                }
            }
            else {
                this._items.forEach((item) => item.expand());
            }
        }
    }
    /**
     * Collapses an item with the given id.
     *
     * Has no effect if the `itemId` does not correspond to any item.
     *
     * @param itemId The id of the item to collapse.
     */
    collapse(itemId) {
        this._getItem(itemId)?.collapse();
    }
    /**
     * Collapses all items.
     */
    collapseAll() {
        this._items?.forEach((item) => item.collapse());
    }
    /**
     * Checks if an item with the given id is expanded.
     *
     * If the `itemId` does not correspond to any item, it returns `false`.
     *
     * @param itemId The id of the item to check.
     */
    isExpanded(itemId) {
        const item = this._getItem(itemId);
        return item ? !item.collapsed : false;
    }
    /**
     * It checks, if the item can be expanded in the current state of the accordion.
     * With `closeOthers` there can be only one expanded item at a time.
     *
     * @internal
     */
    _ensureCanExpand(toExpand) {
        if (!this.closeOthers) {
            return true;
        }
        // special case during the initialization of the [collapse]="false" inputs
        // `this._items` QueryList is not yet initialized, but we need to ensure only one item can be expanded at a time
        if (!this._items) {
            if (!this._anItemWasAlreadyExpandedDuringInitialisation) {
                this._anItemWasAlreadyExpandedDuringInitialisation = true;
                return true;
            }
            return false;
        }
        // if there is an expanded item, we need to collapse it first
        this._items.find((item) => !item.collapsed && toExpand !== item)?.collapse();
        return true;
    }
    _getItem(itemId) {
        return this._items?.find((item) => item.id === itemId);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbAccordionDirective, isStandalone: true, selector: "[ngbAccordion]", inputs: { animation: "animation", closeOthers: "closeOthers", destroyOnHide: "destroyOnHide" }, outputs: { show: "show", shown: "shown", hide: "hide", hidden: "hidden" }, host: { classAttribute: "accordion" }, queries: [{ propertyName: "_items", predicate: NgbAccordionItem }], exportAs: ["ngbAccordion"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbAccordion]',
                    exportAs: 'ngbAccordion',
                    host: {
                        class: 'accordion',
                    },
                }]
        }], propDecorators: { _items: [{
                type: ContentChildren,
                args: [NgbAccordionItem, { descendants: false }]
            }], animation: [{
                type: Input
            }], closeOthers: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], show: [{
                type: Output
            }], shown: [{
                type: Output
            }], hide: [{
                type: Output
            }], hidden: [{
                type: Output
            }] } });

const NGB_ACCORDION_DIRECTIVES = [
    NgbAccordionButton,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionToggle,
    NgbAccordionBody,
    NgbAccordionCollapse,
];
class NgbAccordionModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionModule, imports: [NgbAccordionButton,
            NgbAccordionDirective,
            NgbAccordionItem,
            NgbAccordionHeader,
            NgbAccordionToggle,
            NgbAccordionBody,
            NgbAccordionCollapse], exports: [NgbAccordionButton,
            NgbAccordionDirective,
            NgbAccordionItem,
            NgbAccordionHeader,
            NgbAccordionToggle,
            NgbAccordionBody,
            NgbAccordionCollapse] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_ACCORDION_DIRECTIVES,
                    exports: NGB_ACCORDION_DIRECTIVES,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionConfig, NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem, NgbAccordionModule, NgbAccordionToggle };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-accordion.mjs.map
