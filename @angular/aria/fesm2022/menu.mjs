import * as i0 from '@angular/core';
import { inject, ElementRef, input, computed, booleanAttribute, effect, Directive, InjectionToken, model, afterRenderEffect, output, signal, afterNextRender, untracked } from '@angular/core';
import { _IdGenerator } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { MenuTriggerPattern, MenuItemPattern, MenuBarPattern, MenuPattern } from './_menu-chunk.mjs';
import { reportViolations, SortedCollection } from './_violations-chunk.mjs';
import { DeferredContentAware, DeferredContent } from './_deferred-content-chunk.mjs';
import './_list-chunk.mjs';
import './_list-navigation-chunk.mjs';
import './_list-typeahead-chunk.mjs';
import '@angular/core/primitives/signals';

class MenuTrigger {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  textDirection = inject(Directionality).valueSignal;
  menu = input(undefined, ...(ngDevMode ? [{
    debugName: "menu"
  }] : []));
  expanded = computed(() => this._pattern.expanded(), ...(ngDevMode ? [{
    debugName: "expanded"
  }] : []));
  hasPopup = computed(() => this._pattern.hasPopup(), ...(ngDevMode ? [{
    debugName: "hasPopup"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  softDisabled = input(true, {
    ...(ngDevMode ? {
      debugName: "softDisabled"
    } : {}),
    transform: booleanAttribute
  });
  _pattern = new MenuTriggerPattern({
    textDirection: this.textDirection,
    element: computed(() => this._elementRef.nativeElement),
    menu: computed(() => this.menu()?._pattern),
    disabled: () => this.disabled()
  });
  constructor() {
    effect(() => this.menu()?.parent.set(this));
    effect(() => this._pattern.pendingFocusEffect());
    if (this.element.tagName === 'BUTTON' && !this.element.hasAttribute('type')) {
      this.element.setAttribute('type', 'button');
    }
  }
  open() {
    this._pattern.open({
      first: true
    });
  }
  close() {
    this._pattern.close();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: MenuTrigger,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: MenuTrigger,
    isStandalone: true,
    selector: "[ngMenuTrigger]",
    inputs: {
      menu: {
        classPropertyName: "menu",
        publicName: "menu",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      softDisabled: {
        classPropertyName: "softDisabled",
        publicName: "softDisabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    host: {
      listeners: {
        "click": "_pattern.onClick()",
        "keydown": "_pattern.onKeydown($event)",
        "focusout": "_pattern.onFocusOut($event)",
        "focusin": "_pattern.onFocusIn()"
      },
      properties: {
        "attr.tabindex": "_pattern.tabIndex()",
        "attr.disabled": "!softDisabled() && _pattern.disabled() ? true : null",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-haspopup": "hasPopup()",
        "attr.aria-expanded": "expanded()",
        "attr.aria-controls": "_pattern.menu()?.id()"
      }
    },
    exportAs: ["ngMenuTrigger"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: MenuTrigger,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngMenuTrigger]',
      exportAs: 'ngMenuTrigger',
      host: {
        '[attr.tabindex]': '_pattern.tabIndex()',
        '[attr.disabled]': '!softDisabled() && _pattern.disabled() ? true : null',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-haspopup]': 'hasPopup()',
        '[attr.aria-expanded]': 'expanded()',
        '[attr.aria-controls]': '_pattern.menu()?.id()',
        '(click)': '_pattern.onClick()',
        '(keydown)': '_pattern.onKeydown($event)',
        '(focusout)': '_pattern.onFocusOut($event)',
        '(focusin)': '_pattern.onFocusIn()'
      }
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    menu: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "menu",
        required: false
      }]
    }],
    disabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    softDisabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "softDisabled",
        required: false
      }]
    }]
  }
});

const MENU_COMPONENT = new InjectionToken('MENU_COMPONENT');

class MenuItem {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  id = input(inject(_IdGenerator).getId('ng-menu-item-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  value = input.required(...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  disabled = input(false, ...(ngDevMode ? [{
    debugName: "disabled"
  }] : []));
  searchTerm = model('', ...(ngDevMode ? [{
    debugName: "searchTerm"
  }] : []));
  role = input('menuitem', ...(ngDevMode ? [{
    debugName: "role"
  }] : []));
  parent = inject(MENU_COMPONENT, {
    optional: true
  });
  submenu = input(undefined, ...(ngDevMode ? [{
    debugName: "submenu"
  }] : []));
  active = computed(() => this._pattern.active(), ...(ngDevMode ? [{
    debugName: "active"
  }] : []));
  expanded = computed(() => this._pattern.expanded(), ...(ngDevMode ? [{
    debugName: "expanded"
  }] : []));
  hasPopup = computed(() => this._pattern.hasPopup(), ...(ngDevMode ? [{
    debugName: "hasPopup"
  }] : []));
  _pattern = new MenuItemPattern({
    id: this.id,
    value: this.value,
    element: computed(() => this._elementRef.nativeElement),
    disabled: this.disabled,
    searchTerm: this.searchTerm,
    parent: computed(() => this.parent?._pattern),
    submenu: computed(() => this.submenu()?._pattern),
    role: this.role
  });
  constructor() {
    effect(() => this.submenu()?.parent.set(this));
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      afterRenderEffect({
        read: () => {
          const violations = [];
          if (!this.parent) {
            violations.push('ngMenuItem must be placed inside an ngMenu or ngMenuBar container.');
          }
          reportViolations(violations, this.element);
        }
      });
    }
  }
  ngOnInit() {
    this.parent?._collection.register(this);
  }
  ngOnDestroy() {
    this.parent?._collection.unregister(this);
  }
  open() {
    this._pattern.open({
      first: true
    });
  }
  close() {
    this._pattern.close();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: MenuItem,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: MenuItem,
    isStandalone: true,
    selector: "[ngMenuItem]",
    inputs: {
      id: {
        classPropertyName: "id",
        publicName: "id",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      value: {
        classPropertyName: "value",
        publicName: "value",
        isSignal: true,
        isRequired: true,
        transformFunction: null
      },
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      searchTerm: {
        classPropertyName: "searchTerm",
        publicName: "searchTerm",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      role: {
        classPropertyName: "role",
        publicName: "role",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      submenu: {
        classPropertyName: "submenu",
        publicName: "submenu",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    outputs: {
      searchTerm: "searchTermChange"
    },
    host: {
      listeners: {
        "focusin": "_pattern.onFocusIn()"
      },
      properties: {
        "attr.role": "_pattern.role()",
        "attr.tabindex": "_pattern.tabIndex()",
        "attr.data-active": "active()",
        "attr.aria-haspopup": "hasPopup()",
        "attr.aria-expanded": "expanded()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-controls": "_pattern.submenu()?.id()"
      }
    },
    exportAs: ["ngMenuItem"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: MenuItem,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngMenuItem]',
      exportAs: 'ngMenuItem',
      host: {
        '[attr.role]': '_pattern.role()',
        '(focusin)': '_pattern.onFocusIn()',
        '[attr.tabindex]': '_pattern.tabIndex()',
        '[attr.data-active]': 'active()',
        '[attr.aria-haspopup]': 'hasPopup()',
        '[attr.aria-expanded]': 'expanded()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-controls]': '_pattern.submenu()?.id()'
      }
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    id: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "id",
        required: false
      }]
    }],
    value: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: true
      }]
    }],
    disabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    searchTerm: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "searchTerm",
        required: false
      }]
    }, {
      type: i0.Output,
      args: ["searchTermChange"]
    }],
    role: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "role",
        required: false
      }]
    }],
    submenu: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "submenu",
        required: false
      }]
    }]
  }
});

class MenuBar {
  _collection = new SortedCollection();
  _items = () => this._collection.orderedItems().filter(i => i.parent === this);
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  softDisabled = input(true, {
    ...(ngDevMode ? {
      debugName: "softDisabled"
    } : {}),
    transform: booleanAttribute
  });
  textDirection = inject(Directionality).valueSignal;
  value = model([], ...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  wrap = input(true, {
    ...(ngDevMode ? {
      debugName: "wrap"
    } : {}),
    transform: booleanAttribute
  });
  typeaheadDelay = input(500, ...(ngDevMode ? [{
    debugName: "typeaheadDelay"
  }] : []));
  _pattern;
  _itemPatterns = computed(() => this._items().map(i => i._pattern), ...(ngDevMode ? [{
    debugName: "_itemPatterns"
  }] : []));
  itemSelected = output();
  constructor() {
    this._pattern = new MenuBarPattern({
      ...this,
      items: this._itemPatterns,
      multi: () => false,
      focusMode: () => 'roving',
      orientation: () => 'horizontal',
      selectionMode: () => 'explicit',
      itemSelected: value => this.itemSelected.emit(value),
      activeItem: signal(undefined),
      element: computed(() => this._elementRef.nativeElement)
    });
    afterRenderEffect({
      write: () => this._pattern.setDefaultStateEffect()
    });
    afterNextRender(() => {
      this._collection.startObserving(this.element);
    });
  }
  ngOnDestroy() {
    this._collection.stopObserving();
  }
  close() {
    this._pattern.close();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: MenuBar,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: MenuBar,
    isStandalone: true,
    selector: "[ngMenuBar]",
    inputs: {
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      softDisabled: {
        classPropertyName: "softDisabled",
        publicName: "softDisabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      value: {
        classPropertyName: "value",
        publicName: "value",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      wrap: {
        classPropertyName: "wrap",
        publicName: "wrap",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      typeaheadDelay: {
        classPropertyName: "typeaheadDelay",
        publicName: "typeaheadDelay",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    outputs: {
      value: "valueChange",
      itemSelected: "itemSelected"
    },
    host: {
      attributes: {
        "role": "menubar"
      },
      listeners: {
        "keydown": "_pattern.onKeydown($event)",
        "mouseover": "_pattern.onMouseOver($event)",
        "click": "_pattern.onClick($event)",
        "focusin": "_pattern.onFocusIn()",
        "focusout": "_pattern.onFocusOut($event)"
      },
      properties: {
        "attr.disabled": "!softDisabled() && _pattern.disabled() ? true : null",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.tabindex": "_pattern.tabIndex()"
      }
    },
    providers: [{
      provide: MENU_COMPONENT,
      useExisting: MenuBar
    }],
    exportAs: ["ngMenuBar"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: MenuBar,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngMenuBar]',
      exportAs: 'ngMenuBar',
      host: {
        'role': 'menubar',
        '[attr.disabled]': '!softDisabled() && _pattern.disabled() ? true : null',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.tabindex]': '_pattern.tabIndex()',
        '(keydown)': '_pattern.onKeydown($event)',
        '(mouseover)': '_pattern.onMouseOver($event)',
        '(click)': '_pattern.onClick($event)',
        '(focusin)': '_pattern.onFocusIn()',
        '(focusout)': '_pattern.onFocusOut($event)'
      },
      providers: [{
        provide: MENU_COMPONENT,
        useExisting: MenuBar
      }]
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    disabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    softDisabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "softDisabled",
        required: false
      }]
    }],
    value: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: false
      }]
    }, {
      type: i0.Output,
      args: ["valueChange"]
    }],
    wrap: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "wrap",
        required: false
      }]
    }],
    typeaheadDelay: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "typeaheadDelay",
        required: false
      }]
    }],
    itemSelected: [{
      type: i0.Output,
      args: ["itemSelected"]
    }]
  }
});

class Menu {
  _deferredContentAware = inject(DeferredContentAware, {
    optional: true
  });
  _collection = new SortedCollection();
  _items = computed(() => this._collection.orderedItems().filter(i => i.parent === this), ...(ngDevMode ? [{
    debugName: "_items"
  }] : []));
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  textDirection = inject(Directionality).valueSignal;
  id = input(inject(_IdGenerator).getId('ng-menu-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  wrap = input(true, {
    ...(ngDevMode ? {
      debugName: "wrap"
    } : {}),
    transform: booleanAttribute
  });
  typeaheadDelay = input(500, ...(ngDevMode ? [{
    debugName: "typeaheadDelay"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  parent = signal(undefined, ...(ngDevMode ? [{
    debugName: "parent"
  }] : []));
  softDisabled = input(true, {
    ...(ngDevMode ? {
      debugName: "softDisabled"
    } : {}),
    transform: booleanAttribute
  });
  _pattern;
  _itemPatterns = computed(() => {
    this._pattern.visible();
    return this._items().map(i => i._pattern);
  }, ...(ngDevMode ? [{
    debugName: "_itemPatterns"
  }] : []));
  visible = computed(() => this._pattern.visible(), ...(ngDevMode ? [{
    debugName: "visible"
  }] : []));
  tabIndex = computed(() => this._pattern.tabIndex(), ...(ngDevMode ? [{
    debugName: "tabIndex"
  }] : []));
  itemSelected = output();
  expansionDelay = input(100, ...(ngDevMode ? [{
    debugName: "expansionDelay"
  }] : []));
  constructor() {
    this._pattern = new MenuPattern({
      ...this,
      parent: computed(() => this.parent()?._pattern),
      items: this._itemPatterns,
      multi: () => false,
      focusMode: () => 'roving',
      orientation: () => 'vertical',
      selectionMode: () => 'explicit',
      activeItem: signal(undefined),
      element: computed(() => this._elementRef.nativeElement),
      itemSelected: value => this.itemSelected.emit(value)
    });
    afterRenderEffect({
      write: () => {
        const parent = this.parent();
        if (parent instanceof MenuItem && parent.parent instanceof MenuBar) {
          this._deferredContentAware?.contentVisible.set(true);
        } else {
          this._deferredContentAware?.contentVisible.set(this._pattern.visible() || !!this.parent()?._pattern.hasBeenInteracted());
        }
      }
    });
    afterRenderEffect({
      write: () => {
        if (this.visible()) {
          const activeItem = untracked(() => this._pattern.inputs.activeItem());
          this._pattern.listBehavior.goto(activeItem);
        }
      }
    });
    afterRenderEffect({
      write: () => this._pattern.setDefaultStateEffect()
    });
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      afterRenderEffect({
        read: () => {
          reportViolations(this._pattern.validate(), this.element);
        }
      });
    }
    afterNextRender(() => {
      this._collection.startObserving(this.element);
    });
  }
  ngOnDestroy() {
    this._collection.stopObserving();
  }
  close() {
    this._pattern.close();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: Menu,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: Menu,
    isStandalone: true,
    selector: "[ngMenu]",
    inputs: {
      id: {
        classPropertyName: "id",
        publicName: "id",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      wrap: {
        classPropertyName: "wrap",
        publicName: "wrap",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      typeaheadDelay: {
        classPropertyName: "typeaheadDelay",
        publicName: "typeaheadDelay",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      softDisabled: {
        classPropertyName: "softDisabled",
        publicName: "softDisabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      expansionDelay: {
        classPropertyName: "expansionDelay",
        publicName: "expansionDelay",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    outputs: {
      itemSelected: "itemSelected"
    },
    host: {
      attributes: {
        "role": "menu"
      },
      listeners: {
        "keydown": "_pattern.onKeydown($event)",
        "mouseover": "_pattern.onMouseOver($event)",
        "mouseout": "_pattern.onMouseOut($event)",
        "focusout": "_pattern.onFocusOut($event)",
        "focusin": "_pattern.onFocusIn()",
        "click": "_pattern.onClick($event)"
      },
      properties: {
        "attr.id": "_pattern.id()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.tabindex": "tabIndex()",
        "attr.data-visible": "visible()"
      }
    },
    providers: [{
      provide: MENU_COMPONENT,
      useExisting: Menu
    }],
    exportAs: ["ngMenu"],
    hostDirectives: [{
      directive: DeferredContentAware,
      inputs: ["preserveContent", "preserveContent"]
    }],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: Menu,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngMenu]',
      exportAs: 'ngMenu',
      host: {
        'role': 'menu',
        '[attr.id]': '_pattern.id()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.tabindex]': 'tabIndex()',
        '[attr.data-visible]': 'visible()',
        '(keydown)': '_pattern.onKeydown($event)',
        '(mouseover)': '_pattern.onMouseOver($event)',
        '(mouseout)': '_pattern.onMouseOut($event)',
        '(focusout)': '_pattern.onFocusOut($event)',
        '(focusin)': '_pattern.onFocusIn()',
        '(click)': '_pattern.onClick($event)'
      },
      hostDirectives: [{
        directive: DeferredContentAware,
        inputs: ['preserveContent']
      }],
      providers: [{
        provide: MENU_COMPONENT,
        useExisting: Menu
      }]
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    id: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "id",
        required: false
      }]
    }],
    wrap: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "wrap",
        required: false
      }]
    }],
    typeaheadDelay: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "typeaheadDelay",
        required: false
      }]
    }],
    disabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }],
    softDisabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "softDisabled",
        required: false
      }]
    }],
    itemSelected: [{
      type: i0.Output,
      args: ["itemSelected"]
    }],
    expansionDelay: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "expansionDelay",
        required: false
      }]
    }]
  }
});

class MenuContent {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: MenuContent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "14.0.0",
    version: "22.1.0",
    type: MenuContent,
    isStandalone: true,
    selector: "ng-template[ngMenuContent]",
    exportAs: ["ngMenuContent"],
    hostDirectives: [{
      directive: DeferredContent
    }],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: MenuContent,
  decorators: [{
    type: Directive,
    args: [{
      selector: 'ng-template[ngMenuContent]',
      exportAs: 'ngMenuContent',
      hostDirectives: [DeferredContent]
    }]
  }]
});

export { Menu, MenuBar, MenuContent, MenuItem, MenuTrigger, DeferredContent as ɵɵDeferredContent, DeferredContentAware as ɵɵDeferredContentAware };
//# sourceMappingURL=menu.mjs.map
