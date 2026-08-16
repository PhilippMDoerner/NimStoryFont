import * as i0 from '@angular/core';
import { inject, Service, TemplateRef, Directive, Attribute, ElementRef, EventEmitter, ContentChild, Output, Input, ChangeDetectorRef, DOCUMENT, DestroyRef, ContentChildren, forwardRef, NgZone, ViewChildren, ViewEncapsulation, Component, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isDefined, reflow, ngbRunTransition } from './_ngb-ngbootstrap-utilities.mjs';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap/config';
import { startWith, distinctUntilChanged, skip } from 'rxjs/operators';
import { NgTemplateOutlet } from '@angular/common';

/**
 * A configuration service for the [`NgbNav`](#/components/nav/api#NgbNav) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the navs used in the application.
 *
 * @since 5.2.0
 */
class NgbNavConfig {
    constructor() {
        this._ngbConfig = inject(NgbConfig);
        this.destroyOnHide = true;
        this.orientation = 'horizontal';
        this.roles = 'tablist';
        this.keyboard = true;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbNavConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavConfig, decorators: [{
            type: Service
        }] });

const isValidNavId = (id) => isDefined(id) && id !== '';
let navCounter = 0;
/**
 * This directive must be used to wrap content to be displayed in the nav.
 *
 * @since 5.2.0
 */
class NgbNavContent {
    constructor() {
        this.templateRef = inject(TemplateRef);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavContent, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbNavContent, isStandalone: true, selector: "ng-template[ngbNavContent]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavContent, decorators: [{
            type: Directive,
            args: [{ selector: 'ng-template[ngbNavContent]' }]
        }] });
/**
 * This directive applies a specific role on a non-container based ngbNavItem.
 *
 * @since 14.1.0
 */
class NgbNavItemRole {
    constructor(role) {
        this.role = role;
        this.nav = inject(NgbNav);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavItemRole, deps: [{ token: 'role', attribute: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbNavItemRole, isStandalone: true, selector: "[ngbNavItem]:not(ng-container)", host: { properties: { "attr.role": "role ? role : nav.roles ? 'presentation' : undefined" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavItemRole, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavItem]:not(ng-container)',
                    host: {
                        '[attr.role]': `role ? role : nav.roles ? 'presentation' : undefined`,
                    },
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }] });
/**
 * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
 *
 * @since 5.2.0
 */
class NgbNavItem {
    constructor() {
        this._nav = inject(NgbNav);
        this._nativeElement = inject(ElementRef).nativeElement;
        /**
         * If `true`, the current nav item is disabled and can't be toggled by user.
         *
         * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
         */
        this.disabled = false;
        /**
         * An event emitted when the fade in transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished on the related nav content
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
    }
    ngOnInit() {
        if (!isDefined(this.domId)) {
            this.domId = `ngb-nav-${navCounter++}`;
        }
    }
    get active() {
        return this._nav.activeId === this.id;
    }
    get id() {
        return isValidNavId(this._id) ? this._id : this.domId;
    }
    get panelDomId() {
        return `${this.domId}-panel`;
    }
    isPanelInDom() {
        return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
    }
    /**
     * @internal
     */
    isNgContainer() {
        return this._nativeElement.nodeType === Node.COMMENT_NODE;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbNavItem, isStandalone: true, selector: "[ngbNavItem]", inputs: { destroyOnHide: "destroyOnHide", disabled: "disabled", domId: "domId", _id: ["ngbNavItem", "_id"] }, outputs: { shown: "shown", hidden: "hidden" }, host: { classAttribute: "nav-item" }, queries: [{ propertyName: "contentTpl", first: true, predicate: NgbNavContent }], exportAs: ["ngbNavItem"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavItem]',
                    exportAs: 'ngbNavItem',
                    host: {
                        class: 'nav-item',
                    },
                }]
        }], propDecorators: { destroyOnHide: [{
                type: Input
            }], disabled: [{
                type: Input
            }], domId: [{
                type: Input
            }], _id: [{
                type: Input,
                args: ['ngbNavItem']
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], contentTpl: [{
                type: ContentChild,
                args: [NgbNavContent, { descendants: false }]
            }] } });
/**
 * A nav directive that helps with implementing tabbed navigation components.
 *
 * @since 5.2.0
 */
class NgbNav {
    constructor(role) {
        this.role = role;
        this._config = inject(NgbNavConfig);
        this._cd = inject(ChangeDetectorRef);
        this._document = inject(DOCUMENT);
        this._nativeElement = inject(ElementRef).nativeElement;
        this.destroyRef = inject(DestroyRef);
        this._navigatingWithKeyboard = false;
        /**
         * The event emitted after the active nav changes
         * The payload of the event is the newly active nav id
         *
         * If you want to prevent nav change, you should use `(navChange)` event
         */
        this.activeIdChange = new EventEmitter();
        /**
         * If `true`, nav change will be animated.
         *
         * @since 8.0.0
         */
        this.animation = this._config.animation;
        /**
         * If `true`, non-active nav content will be removed from DOM
         * Otherwise it will just be hidden
         */
        this.destroyOnHide = this._config.destroyOnHide;
        /**
         * The orientation of navs.
         *
         * Using `vertical` will also add the `aria-orientation` attribute
         */
        this.orientation = this._config.orientation;
        /**
         * Role attribute generating strategy:
         * - `false` - no role attributes will be generated
         * - `'tablist'` - 'tablist', 'tab' and 'tabpanel' will be generated (default)
         */
        this.roles = this._config.roles;
        /**
         * Keyboard support for nav focus/selection using arrow keys.
         *
         * * `true` - navs will be focused using keyboard arrow keys
         * * `false` - no keyboard support
         * * `'changeWithArrows'` -  nav will be selected using keyboard arrow keys
         *
         * See the [list of available keyboard shortcuts](#/components/nav/overview#keyboard-shortcuts).
         *
         * @since 6.1.0
         */
        this.keyboard = this._config.keyboard;
        /**
         * An event emitted when the fade in transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just shown.
         *
         * @since 8.0.0
         */
        this.shown = new EventEmitter();
        /**
         * An event emitted when the fade out transition is finished for one of the items.
         *
         * Payload of the event is the nav id that was just hidden.
         *
         * @since 8.0.0
         */
        this.hidden = new EventEmitter();
        this.navItemChange$ = new Subject();
        /**
         * The nav change event emitted right before the nav change happens on user click.
         *
         * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
         *
         * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
         */
        this.navChange = new EventEmitter();
    }
    click(item) {
        if (!item.disabled) {
            this._updateActiveId(item.id);
        }
    }
    onFocusout({ relatedTarget }) {
        if (!this._nativeElement.contains(relatedTarget)) {
            this._navigatingWithKeyboard = false;
        }
    }
    onKeyDown(event) {
        if (this.roles !== 'tablist' || !this.keyboard) {
            return;
        }
        const enabledLinks = this.links.filter((link) => !link.navItem.disabled);
        const { length } = enabledLinks;
        let position = -1;
        enabledLinks.forEach((link, index) => {
            if (link.nativeElement === this._document.activeElement) {
                position = index;
            }
        });
        if (length) {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    position = (position - 1 + length) % length;
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    position = (position + 1) % length;
                    break;
                case 'Home':
                    position = 0;
                    break;
                case 'End':
                    position = length - 1;
                    break;
            }
            if (this.keyboard === 'changeWithArrows') {
                this.select(enabledLinks[position].navItem.id);
            }
            enabledLinks[position].nativeElement.focus();
            this._navigatingWithKeyboard = true;
            event.preventDefault();
        }
    }
    /**
     * Selects the nav with the given id and shows its associated pane.
     * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
     */
    select(id) {
        this._updateActiveId(id, false);
    }
    ngAfterContentInit() {
        if (!isDefined(this.activeId)) {
            const nextId = this.items.first ? this.items.first.id : null;
            if (isValidNavId(nextId)) {
                this._updateActiveId(nextId, false);
                this._cd.detectChanges();
            }
        }
        this.items.changes
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this._notifyItemChanged(this.activeId));
    }
    ngOnChanges({ activeId }) {
        if (activeId && !activeId.firstChange) {
            this._notifyItemChanged(activeId.currentValue);
        }
    }
    _updateActiveId(nextId, emitNavChange = true) {
        if (this.activeId !== nextId) {
            let defaultPrevented = false;
            if (emitNavChange) {
                this.navChange.emit({
                    activeId: this.activeId,
                    nextId,
                    preventDefault: () => {
                        defaultPrevented = true;
                    },
                });
            }
            if (!defaultPrevented) {
                this.activeId = nextId;
                this.activeIdChange.emit(nextId);
                this._notifyItemChanged(nextId);
            }
        }
    }
    _notifyItemChanged(nextItemId) {
        this.navItemChange$.next(this._getItemById(nextItemId));
    }
    _getItemById(itemId) {
        return (this.items && this.items.find((item) => item.id === itemId)) || null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNav, deps: [{ token: 'role', attribute: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbNav, isStandalone: true, selector: "[ngbNav]", inputs: { activeId: "activeId", animation: "animation", destroyOnHide: "destroyOnHide", orientation: "orientation", roles: "roles", keyboard: "keyboard" }, outputs: { activeIdChange: "activeIdChange", shown: "shown", hidden: "hidden", navChange: "navChange" }, host: { listeners: { "keydown.arrowLeft": "onKeyDown($any($event))", "keydown.arrowRight": "onKeyDown($any($event))", "keydown.arrowDown": "onKeyDown($any($event))", "keydown.arrowUp": "onKeyDown($any($event))", "keydown.Home": "onKeyDown($any($event))", "keydown.End": "onKeyDown($any($event))", "focusout": "onFocusout($any($event))" }, properties: { "class.flex-column": "orientation === 'vertical'", "attr.aria-orientation": "orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined", "attr.role": "role ? role : roles ? 'tablist' : undefined" }, classAttribute: "nav" }, queries: [{ propertyName: "items", predicate: NgbNavItem }, { propertyName: "links", predicate: i0.forwardRef(() => NgbNavLinkBase), descendants: true }], exportAs: ["ngbNav"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNav, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNav]',
                    exportAs: 'ngbNav',
                    host: {
                        class: 'nav',
                        '[class.flex-column]': `orientation === 'vertical'`,
                        '[attr.aria-orientation]': `orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined`,
                        '[attr.role]': `role ? role : roles ? 'tablist' : undefined`,
                        '(keydown.arrowLeft)': 'onKeyDown($any($event))',
                        '(keydown.arrowRight)': 'onKeyDown($any($event))',
                        '(keydown.arrowDown)': 'onKeyDown($any($event))',
                        '(keydown.arrowUp)': 'onKeyDown($any($event))',
                        '(keydown.Home)': 'onKeyDown($any($event))',
                        '(keydown.End)': 'onKeyDown($any($event))',
                        '(focusout)': 'onFocusout($any($event))',
                    },
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }], propDecorators: { activeId: [{
                type: Input
            }], activeIdChange: [{
                type: Output
            }], animation: [{
                type: Input
            }], destroyOnHide: [{
                type: Input
            }], orientation: [{
                type: Input
            }], roles: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], shown: [{
                type: Output
            }], hidden: [{
                type: Output
            }], items: [{
                type: ContentChildren,
                args: [NgbNavItem]
            }], links: [{
                type: ContentChildren,
                args: [forwardRef(() => NgbNavLinkBase), { descendants: true }]
            }], navChange: [{
                type: Output
            }] } });
class NgbNavLinkBase {
    constructor(role) {
        this.role = role;
        this.navItem = inject(NgbNavItem);
        this.nav = inject(NgbNav);
        this.nativeElement = inject(ElementRef).nativeElement;
    }
    get tabindex() {
        if (this.nav.keyboard === false) {
            return this.navItem.disabled ? -1 : undefined;
        }
        if (this.nav._navigatingWithKeyboard) {
            return -1;
        }
        return this.navItem.disabled || !this.navItem.active ? -1 : undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavLinkBase, deps: [{ token: 'role', attribute: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbNavLinkBase, isStandalone: true, selector: "[ngbNavLink]", host: { properties: { "id": "navItem.domId", "class.nav-item": "navItem.isNgContainer()", "attr.role": "role ? role : nav.roles ? 'tab' : undefined", "class.active": "navItem.active", "class.disabled": "navItem.disabled", "attr.tabindex": "tabindex", "attr.aria-controls": "navItem.isPanelInDom() ? navItem.panelDomId : null", "attr.aria-selected": "navItem.active", "attr.aria-disabled": "navItem.disabled" }, classAttribute: "nav-link" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavLinkBase, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavLink]',
                    host: {
                        '[id]': 'navItem.domId',
                        class: 'nav-link',
                        '[class.nav-item]': 'navItem.isNgContainer()',
                        '[attr.role]': `role ? role : nav.roles ? 'tab' : undefined`,
                        '[class.active]': 'navItem.active',
                        '[class.disabled]': 'navItem.disabled',
                        '[attr.tabindex]': 'tabindex',
                        '[attr.aria-controls]': 'navItem.isPanelInDom() ? navItem.panelDomId : null',
                        '[attr.aria-selected]': 'navItem.active',
                        '[attr.aria-disabled]': 'navItem.disabled',
                    },
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }] });
/**
 * A directive to mark the nav link when used on a button element.
 */
class NgbNavLinkButton extends NgbNavLinkBase {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavLinkButton, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbNavLinkButton, isStandalone: true, selector: "button[ngbNavLink]", host: { attributes: { "type": "button" }, listeners: { "click": "nav.click(navItem)" }, properties: { "disabled": "navItem.disabled" } }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavLinkButton, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbNavLink]',
                    host: {
                        type: 'button',
                        '[disabled]': 'navItem.disabled',
                        '(click)': 'nav.click(navItem)',
                    },
                }]
        }] });
/**
 * A directive to mark the nav link when used on a link element.
 *
 * @since 5.2.0
 */
class NgbNavLink extends NgbNavLinkBase {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavLink, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbNavLink, isStandalone: true, selector: "a[ngbNavLink]", host: { attributes: { "href": "" }, listeners: { "click": "nav.click(navItem); $event.preventDefault()" } }, usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavLink, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[ngbNavLink]',
                    host: {
                        href: '',
                        '(click)': 'nav.click(navItem); $event.preventDefault()',
                    },
                }]
        }] });

const ngbNavFadeOutTransition = ({ classList }) => {
    classList.remove('show');
    return () => classList.remove('active');
};
const ngbNavFadeInTransition = (element, animation) => {
    if (animation) {
        reflow(element);
    }
    element.classList.add('show');
};

class NgbNavPane {
    constructor() {
        this.nativeElement = inject(ElementRef).nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavPane, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbNavPane, isStandalone: true, selector: "[ngbNavPane]", inputs: { item: "item", nav: "nav", role: "role" }, host: { properties: { "id": "item.panelDomId", "class.fade": "nav.animation", "attr.role": "role ? role : nav.roles ? \"tabpanel\" : undefined", "attr.aria-labelledby": "item.domId" }, classAttribute: "tab-pane" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavPane, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbNavPane]',
                    host: {
                        '[id]': 'item.panelDomId',
                        class: 'tab-pane',
                        '[class.fade]': 'nav.animation',
                        '[attr.role]': 'role ? role : nav.roles ? "tabpanel" : undefined',
                        '[attr.aria-labelledby]': 'item.domId',
                    },
                }]
        }], propDecorators: { item: [{
                type: Input
            }], nav: [{
                type: Input
            }], role: [{
                type: Input
            }] } });
/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
class NgbNavOutlet {
    constructor() {
        this._cd = inject(ChangeDetectorRef);
        this._ngZone = inject(NgZone);
        this._activePane = null;
    }
    isPanelTransitioning(item) {
        return this._activePane?.item === item;
    }
    ngAfterViewInit() {
        // initial display
        this._updateActivePane();
        // this will be emitted for all 3 types of nav changes: .select(), [activeId] or (click)
        this.nav.navItemChange$
            .pipe(takeUntilDestroyed(this.nav.destroyRef), startWith(this._activePane?.item || null), distinctUntilChanged(), skip(1))
            .subscribe((nextItem) => {
            const options = { animation: this.nav.animation, runningTransition: 'stop' };
            // next panel we're switching to will only appear in DOM after the change detection is done
            // and `this._panes` will be updated
            this._cd.detectChanges();
            // fading out
            if (this._activePane) {
                ngbRunTransition(this._ngZone, this._activePane.nativeElement, ngbNavFadeOutTransition, options).subscribe(() => {
                    const activeItem = this._activePane?.item;
                    this._activePane = this._getPaneForItem(nextItem);
                    // mark for check when transition finishes as outlet or parent containers might be OnPush
                    // without this the panes that have "faded out" will stay in DOM
                    this._cd.markForCheck();
                    // fading in
                    if (this._activePane) {
                        // we have to add the '.active' class before running the transition,
                        // because it should be in place before `ngbRunTransition` does `reflow()`
                        this._activePane.nativeElement.classList.add('active');
                        ngbRunTransition(this._ngZone, this._activePane.nativeElement, ngbNavFadeInTransition, options).subscribe(() => {
                            if (nextItem) {
                                nextItem.shown.emit();
                                this.nav.shown.emit(nextItem.id);
                            }
                        });
                    }
                    if (activeItem) {
                        activeItem.hidden.emit();
                        this.nav.hidden.emit(activeItem.id);
                    }
                });
            }
            else {
                this._updateActivePane();
            }
        });
    }
    _updateActivePane() {
        this._activePane = this._getActivePane();
        this._activePane?.nativeElement.classList.add('show', 'active');
    }
    _getPaneForItem(item) {
        return (this._panes && this._panes.find((pane) => pane.item === item)) || null;
    }
    _getActivePane() {
        return (this._panes && this._panes.find((pane) => pane.item.active)) || null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavOutlet, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.0.1", type: NgbNavOutlet, isStandalone: true, selector: "[ngbNavOutlet]", inputs: { paneRole: "paneRole", nav: ["ngbNavOutlet", "nav"] }, host: { classAttribute: "tab-content" }, viewQueries: [{ propertyName: "_panes", predicate: NgbNavPane, descendants: true }], ngImport: i0, template: `
		@for (item of nav.items; track item) {
			@if (item.isPanelInDom() || isPanelTransitioning(item)) {
				<div ngbNavPane [item]="item" [nav]="nav" [role]="paneRole">
					<ng-template
						[ngTemplateOutlet]="item.contentTpl?.templateRef || null"
						[ngTemplateOutletContext]="{ $implicit: item.active || isPanelTransitioning(item) }"
					/>
				</div>
			}
		}
	`, isInline: true, dependencies: [{ kind: "directive", type: NgbNavPane, selector: "[ngbNavPane]", inputs: ["item", "nav", "role"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavOutlet, decorators: [{
            type: Component,
            args: [{
                    selector: '[ngbNavOutlet]',
                    imports: [NgbNavPane, NgTemplateOutlet],
                    host: {
                        class: 'tab-content',
                    },
                    encapsulation: ViewEncapsulation.None,
                    template: `
		@for (item of nav.items; track item) {
			@if (item.isPanelInDom() || isPanelTransitioning(item)) {
				<div ngbNavPane [item]="item" [nav]="nav" [role]="paneRole">
					<ng-template
						[ngTemplateOutlet]="item.contentTpl?.templateRef || null"
						[ngTemplateOutletContext]="{ $implicit: item.active || isPanelTransitioning(item) }"
					/>
				</div>
			}
		}
	`,
                }]
        }], propDecorators: { _panes: [{
                type: ViewChildren,
                args: [NgbNavPane]
            }], paneRole: [{
                type: Input
            }], nav: [{
                type: Input,
                args: ['ngbNavOutlet']
            }] } });

const NGB_NAV_DIRECTIVES = [
    NgbNavContent,
    NgbNav,
    NgbNavItem,
    NgbNavItemRole,
    NgbNavLink,
    NgbNavLinkButton,
    NgbNavLinkBase,
    NgbNavOutlet,
    NgbNavPane,
];
class NgbNavModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbNavModule, imports: [NgbNavContent,
            NgbNav,
            NgbNavItem,
            NgbNavItemRole,
            NgbNavLink,
            NgbNavLinkButton,
            NgbNavLinkBase,
            NgbNavOutlet,
            NgbNavPane], exports: [NgbNavContent,
            NgbNav,
            NgbNavItem,
            NgbNavItemRole,
            NgbNavLink,
            NgbNavLinkButton,
            NgbNavLinkBase,
            NgbNavOutlet,
            NgbNavPane] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbNavModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_NAV_DIRECTIVES,
                    exports: NGB_NAV_DIRECTIVES,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbNav, NgbNavConfig, NgbNavContent, NgbNavItem, NgbNavItemRole, NgbNavLink, NgbNavLinkBase, NgbNavLinkButton, NgbNavModule, NgbNavOutlet, NgbNavPane };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-nav.mjs.map
