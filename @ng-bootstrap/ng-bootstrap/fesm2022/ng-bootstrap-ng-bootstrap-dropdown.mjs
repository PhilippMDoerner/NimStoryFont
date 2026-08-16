import * as i0 from '@angular/core';
import { Service, inject, ElementRef, Input, Directive, ContentChildren, forwardRef, ChangeDetectorRef, DOCUMENT, Injector, NgZone, EventEmitter, afterNextRender, afterEveryRender, Output, ContentChild, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { ngbPositioning, addPopperOffset, ngbAutoClose, getActiveElement, FOCUSABLE_ELEMENTS_SELECTOR } from './_ngb-ngbootstrap-utilities.mjs';

/**
 * A configuration service for the [`NgbDropdown`](#/components/dropdown/api#NgbDropdown) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the dropdowns used in the application.
 */
class NgbDropdownConfig {
    constructor() {
        this.autoClose = true;
        this.placement = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];
        this.popperOptions = (options) => options;
        this.container = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownConfig, deps: [], target: i0.ɵɵFactoryTarget.Service }); }
    static { this.ɵprov = i0.ɵɵngDeclareService({ minVersion: "22.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownConfig }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownConfig, decorators: [{
            type: Service
        }] });

/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * @since 4.1.0
 */
class NgbDropdownItem {
    constructor() {
        this._disabled = false;
        this.nativeElement = inject(ElementRef).nativeElement;
        this.tabindex = 0;
    }
    set disabled(value) {
        this._disabled = value === '' || value === true; // accept an empty attribute as true
    }
    get disabled() {
        return this._disabled;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbDropdownItem, isStandalone: true, selector: "[ngbDropdownItem]", inputs: { tabindex: "tabindex", disabled: "disabled" }, host: { properties: { "class.disabled": "disabled", "tabIndex": "disabled ? -1 : tabindex" }, classAttribute: "dropdown-item" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownItem]',
                    host: {
                        class: 'dropdown-item',
                        '[class.disabled]': 'disabled',
                        '[tabIndex]': 'disabled ? -1 : tabindex',
                    },
                }]
        }], propDecorators: { tabindex: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
/**
 * A directive that will be applied if dropdown item is a button.
 * It will only set the disabled property.
 */
class NgbDropdownButtonItem {
    constructor() {
        this.item = inject(NgbDropdownItem);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownButtonItem, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbDropdownButtonItem, isStandalone: true, selector: "button[ngbDropdownItem]", host: { properties: { "disabled": "item.disabled" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownButtonItem, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[ngbDropdownItem]',
                    host: { '[disabled]': 'item.disabled' },
                }]
        }] });
/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
class NgbDropdownMenu {
    constructor() {
        this.dropdown = inject(NgbDropdown);
        this.nativeElement = inject(ElementRef).nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownMenu, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbDropdownMenu, isStandalone: true, selector: "[ngbDropdownMenu]", host: { listeners: { "keydown.ArrowUp": "dropdown.onKeyDown($any($event))", "keydown.ArrowDown": "dropdown.onKeyDown($any($event))", "keydown.Home": "dropdown.onKeyDown($any($event))", "keydown.End": "dropdown.onKeyDown($any($event))", "keydown.Enter": "dropdown.onKeyDown($any($event))", "keydown.Space": "dropdown.onKeyDown($any($event))", "keydown.Tab": "dropdown.onKeyDown($any($event))", "keydown.Shift.Tab": "dropdown.onKeyDown($any($event))" }, properties: { "class.show": "dropdown.isOpen()" }, classAttribute: "dropdown-menu" }, queries: [{ propertyName: "menuItems", predicate: NgbDropdownItem }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownMenu, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownMenu]',
                    host: {
                        class: 'dropdown-menu',
                        '[class.show]': 'dropdown.isOpen()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.Home)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.End)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.Enter)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.Space)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.Tab)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($any($event))',
                    },
                }]
        }], propDecorators: { menuItems: [{
                type: ContentChildren,
                args: [NgbDropdownItem]
            }] } });
/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * @since 1.1.0
 */
class NgbDropdownAnchor {
    constructor() {
        this.dropdown = inject(NgbDropdown);
        this.nativeElement = inject(ElementRef).nativeElement;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownAnchor, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbDropdownAnchor, isStandalone: true, selector: "[ngbDropdownAnchor]", host: { properties: { "class.show": "dropdown.isOpen()", "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownAnchor, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownAnchor]',
                    host: {
                        class: 'dropdown-toggle',
                        '[class.show]': 'dropdown.isOpen()',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                    },
                }]
        }] });
/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
class NgbDropdownToggle extends NgbDropdownAnchor {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownToggle, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbDropdownToggle, isStandalone: true, selector: "[ngbDropdownToggle]", host: { listeners: { "click": "dropdown.toggle()", "keydown.ArrowUp": "dropdown.onKeyDown($any($event))", "keydown.ArrowDown": "dropdown.onKeyDown($any($event))", "keydown.Home": "dropdown.onKeyDown($any($event))", "keydown.End": "dropdown.onKeyDown($any($event))", "keydown.Tab": "dropdown.onKeyDown($any($event))", "keydown.Shift.Tab": "dropdown.onKeyDown($any($event))" }, properties: { "class.show": "dropdown.isOpen()", "attr.aria-expanded": "dropdown.isOpen()" }, classAttribute: "dropdown-toggle" }, providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownToggle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdownToggle]',
                    host: {
                        class: 'dropdown-toggle',
                        '[class.show]': 'dropdown.isOpen()',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                        '(click)': 'dropdown.toggle()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.Home)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.End)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.Tab)': 'dropdown.onKeyDown($any($event))',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($any($event))',
                    },
                    providers: [{ provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle) }],
                }]
        }] });
/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
class NgbDropdown {
    constructor() {
        this._changeDetector = inject(ChangeDetectorRef);
        this._config = inject(NgbDropdownConfig);
        this._document = inject(DOCUMENT);
        this._injector = inject(Injector);
        this._ngZone = inject(NgZone);
        this._nativeElement = inject(ElementRef).nativeElement;
        this._destroyCloseHandlers$ = new Subject();
        this._bodyContainer = null;
        this._positioning = ngbPositioning();
        /**
         * Indicates whether the dropdown should be closed when clicking one of dropdown items or pressing ESC.
         *
         * * `true` - the dropdown will close on both outside and inside (menu) clicks.
         * * `false` - the dropdown can only be closed manually via `close()` or `toggle()` methods.
         * * `"inside"` - the dropdown will close on inside menu clicks, but not outside clicks.
         * * `"outside"` - the dropdown will close only on the outside clicks and not on menu clicks.
         */
        this.autoClose = this._config.autoClose;
        /**
         * Defines whether or not the dropdown menu is opened initially.
         */
        this._open = false;
        /**
         * The preferred placement of the dropdown, among the [possible values](#/guides/positioning#api).
         *
         * The default order of preference is `"bottom-start bottom-end top-start top-end"`
         *
         * Please see the [positioning overview](#/positioning) for more details.
         */
        this.placement = this._config.placement;
        /**
         * Allows to change default Popper options when positioning the dropdown.
         * Receives current popper options and returns modified ones.
         *
         * @since 13.1.0
         */
        this.popperOptions = this._config.popperOptions;
        /**
         * A selector specifying the element the dropdown should be appended to.
         * Currently only supports "body".
         *
         * @since 4.1.0
         */
        this.container = this._config.container;
        /**
         * An event fired when the dropdown is opened or closed.
         *
         * The event payload is a `boolean`:
         * * `true` - the dropdown was opened
         * * `false` - the dropdown was closed
         */
        this.openChange = new EventEmitter();
    }
    ngOnInit() {
        if (!this.display) {
            this.display = this._nativeElement.closest('.navbar') ? 'static' : 'dynamic';
        }
    }
    ngAfterContentInit() {
        afterNextRender({
            write: () => {
                this._applyPlacementClasses();
                if (this._open) {
                    this._setCloseHandlers();
                }
            },
        }, { injector: this._injector });
    }
    ngOnChanges(changes) {
        if (changes.container && this._open) {
            this._applyContainer(this.container);
        }
        if (changes.placement && !changes.placement.firstChange) {
            this._positioning.setOptions({
                hostElement: this._anchor.nativeElement,
                targetElement: this._bodyContainer || this._menu.nativeElement,
                placement: this.placement,
            });
            this._applyPlacementClasses();
        }
        if (changes.dropdownClass) {
            const { currentValue, previousValue } = changes.dropdownClass;
            this._applyCustomDropdownClass(currentValue, previousValue);
        }
        if (changes.autoClose && this._open) {
            this.autoClose = changes.autoClose.currentValue;
            this._setCloseHandlers();
        }
    }
    /**
     * Checks if the dropdown menu is open.
     */
    isOpen() {
        return this._open;
    }
    /**
     * Opens the dropdown menu.
     */
    open() {
        if (!this._open) {
            this._open = true;
            this._applyContainer(this.container);
            this.openChange.emit(true);
            this._setCloseHandlers();
            if (this._anchor) {
                this._anchor.nativeElement.focus();
                if (this.display === 'dynamic') {
                    this._ngZone.runOutsideAngular(() => {
                        this._positioning.createPopper({
                            hostElement: this._anchor.nativeElement,
                            targetElement: this._bodyContainer || this._menu.nativeElement,
                            placement: this.placement,
                            updatePopperOptions: (options) => this.popperOptions(addPopperOffset([0, 2])(options)),
                        });
                        this._applyPlacementClasses();
                        this._afterRenderRef = afterEveryRender({
                            write: () => {
                                this._positionMenu();
                            },
                        }, { injector: this._injector });
                    });
                }
            }
            this._changeDetector.markForCheck();
        }
    }
    _setCloseHandlers() {
        this._destroyCloseHandlers$.next(); // destroy any existing close handlers
        ngbAutoClose(this._ngZone, this._document, this.autoClose, (source) => {
            this.close();
            if (source === 0 /* SOURCE.ESCAPE */) {
                this._anchor.nativeElement.focus();
            }
        }, this._destroyCloseHandlers$, this._menu ? [this._menu.nativeElement] : [], this._anchor ? [this._anchor.nativeElement] : [], '.dropdown-item,.dropdown-divider');
    }
    /**
     * Closes the dropdown menu.
     */
    close() {
        if (this._open) {
            this._open = false;
            this._resetContainer();
            this._positioning.destroy();
            this._afterRenderRef?.destroy();
            this._destroyCloseHandlers$.next();
            this.openChange.emit(false);
            this._changeDetector.markForCheck();
        }
    }
    /**
     * Toggles the dropdown menu.
     */
    toggle() {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    }
    ngOnDestroy() {
        this.close();
    }
    onKeyDown(event) {
        const { key } = event;
        const itemElements = this._getMenuElements();
        let position = -1;
        let itemElement = null;
        const isEventFromToggle = this._isEventFromToggle(event);
        if (!isEventFromToggle && itemElements.length) {
            itemElements.forEach((item, index) => {
                if (item.contains(event.target)) {
                    itemElement = item;
                }
                if (item === getActiveElement(this._document)) {
                    position = index;
                }
            });
        }
        // closing on Enter / Space
        if (key === ' ' || key === 'Enter') {
            if (itemElement && (this.autoClose === true || this.autoClose === 'inside')) {
                // Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
                // So we have to register a one-time click handler that will fire after any user defined click handlers
                // to close the dropdown
                fromEvent(itemElement, 'click')
                    .pipe(take(1))
                    .subscribe(() => this.close());
            }
            return;
        }
        if (key === 'Tab') {
            if (event.target && this.isOpen() && this.autoClose) {
                if (this._anchor.nativeElement === event.target) {
                    if (this.container === 'body' && !event.shiftKey) {
                        /* This case is special: user is using [Tab] from the anchor/toggle.
               User expects the next focusable element in the dropdown menu to get focus.
               But the menu is not a sibling to anchor/toggle, it is at the end of the body.
               Trick is to synchronously focus the menu element, and let the [keydown.Tab] go
               so that browser will focus the proper element (first one focusable in the menu) */
                        this._menu.nativeElement.setAttribute('tabindex', '0');
                        this._menu.nativeElement.focus();
                        this._menu.nativeElement.removeAttribute('tabindex');
                    }
                    else if (event.shiftKey) {
                        this.close();
                    }
                    return;
                }
                else if (this.container === 'body') {
                    const focusableElements = this._menu.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
                    if (event.shiftKey && event.target === focusableElements[0]) {
                        this._anchor.nativeElement.focus();
                        event.preventDefault();
                    }
                    else if (!event.shiftKey && event.target === focusableElements[focusableElements.length - 1]) {
                        this._anchor.nativeElement.focus();
                        this.close();
                    }
                }
                else {
                    fromEvent(event.target, 'focusout')
                        .pipe(take(1))
                        .subscribe(({ relatedTarget }) => {
                        if (!this._nativeElement.contains(relatedTarget)) {
                            this.close();
                        }
                    });
                }
            }
            return;
        }
        // opening / navigating
        if (isEventFromToggle || itemElement) {
            this.open();
            if (itemElements.length) {
                switch (key) {
                    case 'ArrowDown':
                        position = Math.min(position + 1, itemElements.length - 1);
                        break;
                    case 'ArrowUp':
                        if (this._isDropup() && position === -1) {
                            position = itemElements.length - 1;
                            break;
                        }
                        position = Math.max(position - 1, 0);
                        break;
                    case 'Home':
                        position = 0;
                        break;
                    case 'End':
                        position = itemElements.length - 1;
                        break;
                }
                itemElements[position].focus();
            }
            event.preventDefault();
        }
    }
    _isDropup() {
        return this._nativeElement.classList.contains('dropup');
    }
    _isEventFromToggle(event) {
        return this._anchor.nativeElement.contains(event.target);
    }
    _getMenuElements() {
        return this._menu
            ? this._menu.menuItems.filter(({ disabled }) => !disabled).map(({ nativeElement }) => nativeElement)
            : [];
    }
    _positionMenu() {
        const menu = this._menu;
        if (this.isOpen() && menu) {
            if (this.display === 'dynamic') {
                this._positioning.update();
                this._applyPlacementClasses();
            }
            else {
                this._applyPlacementClasses(this._getFirstPlacement(this.placement));
            }
        }
    }
    _getFirstPlacement(placement) {
        return Array.isArray(placement) ? placement[0] : placement.split(' ')[0];
    }
    _resetContainer() {
        if (this._menu) {
            this._nativeElement.appendChild(this._menu.nativeElement);
        }
        if (this._bodyContainer) {
            this._document.body.removeChild(this._bodyContainer);
            this._bodyContainer = null;
        }
    }
    _applyContainer(container = null) {
        this._resetContainer();
        if (container === 'body') {
            const dropdownMenuElement = this._menu.nativeElement;
            const bodyContainer = (this._bodyContainer = this._bodyContainer || this._document.createElement('div'));
            // Override some styles to have the positioning working
            bodyContainer.style.position = 'absolute';
            dropdownMenuElement.style.position = 'static';
            bodyContainer.style.zIndex = '1055';
            bodyContainer.appendChild(dropdownMenuElement);
            this._document.body.appendChild(bodyContainer);
        }
        this._applyCustomDropdownClass(this.dropdownClass);
    }
    _applyCustomDropdownClass(newClass, oldClass) {
        const targetElement = this.container === 'body' ? this._bodyContainer : this._nativeElement;
        if (targetElement) {
            if (oldClass) {
                targetElement.classList.remove(oldClass);
            }
            if (newClass) {
                targetElement.classList.add(newClass);
            }
        }
    }
    _applyPlacementClasses(placement) {
        if (this._menu) {
            if (!placement) {
                placement = this._getFirstPlacement(this.placement);
            }
            // remove the current placement classes
            this._nativeElement.classList.remove('dropup', 'dropdown');
            if (this.display === 'static') {
                this._menu.nativeElement.setAttribute('data-bs-popper', 'static');
            }
            else {
                this._menu.nativeElement.removeAttribute('data-bs-popper');
            }
            /*
             * apply the new placement
             * in case of top use up-arrow or down-arrow otherwise
             */
            const dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
            this._nativeElement.classList.add(dropdownClass);
            if (this._bodyContainer) {
                this._bodyContainer.classList.remove('dropup', 'dropdown');
                this._bodyContainer.classList.add(dropdownClass);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdown, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "22.0.1", type: NgbDropdown, isStandalone: true, selector: "[ngbDropdown]", inputs: { autoClose: "autoClose", dropdownClass: "dropdownClass", _open: ["open", "_open"], placement: "placement", popperOptions: "popperOptions", container: "container", display: "display" }, outputs: { openChange: "openChange" }, host: { properties: { "class.show": "isOpen()" } }, queries: [{ propertyName: "_menu", first: true, predicate: NgbDropdownMenu, descendants: true }, { propertyName: "_anchor", first: true, predicate: NgbDropdownAnchor, descendants: true }], exportAs: ["ngbDropdown"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdown, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngbDropdown]',
                    exportAs: 'ngbDropdown',
                    host: { '[class.show]': 'isOpen()' },
                }]
        }], propDecorators: { _menu: [{
                type: ContentChild,
                args: [NgbDropdownMenu, { static: false }]
            }], _anchor: [{
                type: ContentChild,
                args: [NgbDropdownAnchor, { static: false }]
            }], autoClose: [{
                type: Input
            }], dropdownClass: [{
                type: Input
            }], _open: [{
                type: Input,
                args: ['open']
            }], placement: [{
                type: Input
            }], popperOptions: [{
                type: Input
            }], container: [{
                type: Input
            }], display: [{
                type: Input
            }], openChange: [{
                type: Output
            }] } });

const NGB_DROPDOWN_DIRECTIVES = [
    NgbDropdown,
    NgbDropdownAnchor,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownButtonItem,
];
class NgbDropdownModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownModule, imports: [NgbDropdown,
            NgbDropdownAnchor,
            NgbDropdownToggle,
            NgbDropdownMenu,
            NgbDropdownItem,
            NgbDropdownButtonItem], exports: [NgbDropdown,
            NgbDropdownAnchor,
            NgbDropdownToggle,
            NgbDropdownMenu,
            NgbDropdownItem,
            NgbDropdownButtonItem] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.0.1", ngImport: i0, type: NgbDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: NGB_DROPDOWN_DIRECTIVES,
                    exports: NGB_DROPDOWN_DIRECTIVES,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NgbDropdown, NgbDropdownAnchor, NgbDropdownButtonItem, NgbDropdownConfig, NgbDropdownItem, NgbDropdownMenu, NgbDropdownModule, NgbDropdownToggle };
//# sourceMappingURL=ng-bootstrap-ng-bootstrap-dropdown.mjs.map
