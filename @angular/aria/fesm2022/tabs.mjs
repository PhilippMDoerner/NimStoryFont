import { _IdGenerator } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import { InjectionToken, inject, ElementRef, signal, computed, afterNextRender, Directive, input, booleanAttribute, model, linkedSignal, afterRenderEffect, contentChild } from '@angular/core';
import { TabListPattern, TabPattern, TabPanelPattern } from './_tabs-chunk.mjs';
import { SortedCollection, reportViolations } from './_violations-chunk.mjs';
import { DeferredContent, DeferredContentAware } from './_deferred-content-chunk.mjs';
import { Directionality } from '@angular/cdk/bidi';
import './_expansion-chunk.mjs';
import './_list-navigation-chunk.mjs';
import './_click-event-manager-chunk.mjs';
import '@angular/core/primitives/signals';

const TABS = new InjectionToken('TABS');
const TAB_LIST = new InjectionToken('TAB_LIST');

class Tabs {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _tabList = signal(undefined, ...(ngDevMode ? [{
    debugName: "_tabList"
  }] : []));
  _collection = new SortedCollection();
  _tabPatterns = computed(() => this._tabList()?._tabPatterns(), ...(ngDevMode ? [{
    debugName: "_tabPatterns"
  }] : []));
  _tabPanelPatterns = computed(() => this._collection.orderedItems().map(tabpanel => tabpanel._pattern), ...(ngDevMode ? [{
    debugName: "_tabPanelPatterns"
  }] : []));
  _panelMap = computed(() => {
    const map = new Map();
    for (const panel of this._collection.orderedItems()) {
      map.set(panel.value(), panel._pattern);
    }
    return map;
  }, ...(ngDevMode ? [{
    debugName: "_panelMap"
  }] : []));
  _tabMap = computed(() => {
    const map = new Map();
    const tabList = this._tabList();
    if (tabList) {
      for (const tab of tabList._collection.orderedItems()) {
        map.set(tab.value(), tab._pattern);
      }
    }
    return map;
  }, ...(ngDevMode ? [{
    debugName: "_tabMap"
  }] : []));
  constructor() {
    afterNextRender(() => {
      this._collection.startObserving(this.element);
    });
  }
  ngOnDestroy() {
    this._collection.stopObserving();
  }
  _register(child) {
    this._tabList.set(child);
  }
  _unregister() {
    this._tabList.set(undefined);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: Tabs,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "14.0.0",
    version: "22.1.0",
    type: Tabs,
    isStandalone: true,
    selector: "[ngTabs]",
    providers: [{
      provide: TABS,
      useExisting: Tabs
    }],
    exportAs: ["ngTabs"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: Tabs,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngTabs]',
      exportAs: 'ngTabs',
      providers: [{
        provide: TABS,
        useExisting: Tabs
      }]
    }]
  }],
  ctorParameters: () => []
});

class TabList {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _tabsParent = inject(TABS);
  _collection = new SortedCollection();
  _tabPatterns = computed(() => this._collection.orderedItems().map(tab => tab._pattern), ...(ngDevMode ? [{
    debugName: "_tabPatterns"
  }] : []));
  orientation = input('horizontal', ...(ngDevMode ? [{
    debugName: "orientation"
  }] : []));
  textDirection = inject(Directionality).valueSignal;
  wrap = input(true, {
    ...(ngDevMode ? {
      debugName: "wrap"
    } : {}),
    transform: booleanAttribute
  });
  softDisabled = input(true, {
    ...(ngDevMode ? {
      debugName: "softDisabled"
    } : {}),
    transform: booleanAttribute
  });
  focusMode = input('roving', ...(ngDevMode ? [{
    debugName: "focusMode"
  }] : []));
  selectionMode = input('follow', ...(ngDevMode ? [{
    debugName: "selectionMode"
  }] : []));
  selectedTab = model(...(ngDevMode ? [undefined, {
    debugName: "selectedTab"
  }] : []));
  _selectedTabPattern = linkedSignal(() => {
    const tab = this.findTab(this.selectedTab());
    return tab?._pattern;
  }, ...(ngDevMode ? [{
    debugName: "_selectedTabPattern"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  _pattern = new TabListPattern({
    ...this,
    element: () => this._elementRef.nativeElement,
    activeItem: signal(undefined),
    items: this._tabPatterns,
    selectedTab: this._selectedTabPattern
  });
  constructor() {
    afterNextRender(() => {
      this._collection.startObserving(this.element);
    });
    afterRenderEffect(() => {
      this._pattern.setDefaultStateEffect();
    });
    afterRenderEffect({
      write: () => {
        const pattern = this._selectedTabPattern();
        const tab = this._collection.orderedItems().find(tab => tab._pattern == pattern);
        this.selectedTab.set(tab?.value());
      }
    });
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      afterRenderEffect({
        read: () => {
          const violations = [];
          const values = this._collection.orderedItems().map(t => t.value());
          const duplicates = values.filter((item, index) => values.indexOf(item) !== index);
          if (duplicates.length > 0) {
            violations.push(`Duplicate value '${duplicates[0]}' detected inside ngTabList.`);
          }
          reportViolations(violations, this.element);
        }
      });
    }
  }
  ngOnInit() {
    this._tabsParent._register(this);
  }
  ngOnDestroy() {
    this._tabsParent._unregister();
    this._collection.stopObserving();
  }
  open(value) {
    return this._pattern.open(this.findTab(value)?._pattern);
  }
  findTab(value) {
    return value ? this._collection.orderedItems().find(tab => tab.value() === value) : undefined;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: TabList,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: TabList,
    isStandalone: true,
    selector: "[ngTabList]",
    inputs: {
      orientation: {
        classPropertyName: "orientation",
        publicName: "orientation",
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
      softDisabled: {
        classPropertyName: "softDisabled",
        publicName: "softDisabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      focusMode: {
        classPropertyName: "focusMode",
        publicName: "focusMode",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      selectionMode: {
        classPropertyName: "selectionMode",
        publicName: "selectionMode",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      selectedTab: {
        classPropertyName: "selectedTab",
        publicName: "selectedTab",
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
      }
    },
    outputs: {
      selectedTab: "selectedTabChange"
    },
    host: {
      attributes: {
        "role": "tablist"
      },
      listeners: {
        "keydown": "_pattern.onKeydown($event)",
        "click": "_pattern.onClick($event)",
        "focusin": "_pattern.onFocusIn()"
      },
      properties: {
        "attr.tabindex": "_pattern.tabIndex()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-orientation": "_pattern.orientation()",
        "attr.aria-activedescendant": "_pattern.activeDescendant()"
      }
    },
    providers: [{
      provide: TAB_LIST,
      useExisting: TabList
    }],
    exportAs: ["ngTabList"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: TabList,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngTabList]',
      exportAs: 'ngTabList',
      host: {
        'role': 'tablist',
        '[attr.tabindex]': '_pattern.tabIndex()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-orientation]': '_pattern.orientation()',
        '[attr.aria-activedescendant]': '_pattern.activeDescendant()',
        '(keydown)': '_pattern.onKeydown($event)',
        '(click)': '_pattern.onClick($event)',
        '(focusin)': '_pattern.onFocusIn()'
      },
      providers: [{
        provide: TAB_LIST,
        useExisting: TabList
      }]
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    orientation: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "orientation",
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
    softDisabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "softDisabled",
        required: false
      }]
    }],
    focusMode: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "focusMode",
        required: false
      }]
    }],
    selectionMode: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "selectionMode",
        required: false
      }]
    }],
    selectedTab: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "selectedTab",
        required: false
      }]
    }, {
      type: i0.Output,
      args: ["selectedTabChange"]
    }],
    disabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "disabled",
        required: false
      }]
    }]
  }
});

class Tab {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _tabList = inject(TAB_LIST);
  id = input(inject(_IdGenerator).getId('ng-tab-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  _tabpanelPattern = computed(() => {
    return this._tabList._tabsParent._panelMap().get(this.value());
  }, ...(ngDevMode ? [{
    debugName: "_tabpanelPattern"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  value = input.required(...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  active = computed(() => this._pattern.active(), ...(ngDevMode ? [{
    debugName: "active"
  }] : []));
  selected = computed(() => this._pattern.selected(), ...(ngDevMode ? [{
    debugName: "selected"
  }] : []));
  _pattern = new TabPattern({
    ...this,
    element: () => this.element,
    tabList: () => this._tabList._pattern,
    tabPanel: this._tabpanelPattern
  });
  open() {
    this._pattern.open();
  }
  constructor() {
    if (this.element.tagName === 'BUTTON' && !this.element.hasAttribute('type')) {
      this.element.setAttribute('type', 'button');
    }
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      afterRenderEffect({
        read: () => {
          const violations = [];
          if (this._tabList && this._tabList._tabsParent) {
            if (!this._tabList._tabsParent._panelMap().has(this.value())) {
              violations.push(`ngTab with value '${this.value()}' does not have a corresponding ngTabPanel.`);
            }
          }
          reportViolations(violations, this.element);
        }
      });
    }
  }
  ngOnInit() {
    this._tabList._collection.register(this);
  }
  ngOnDestroy() {
    this._tabList._collection.unregister(this);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: Tab,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: Tab,
    isStandalone: true,
    selector: "[ngTab]",
    inputs: {
      id: {
        classPropertyName: "id",
        publicName: "id",
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
      value: {
        classPropertyName: "value",
        publicName: "value",
        isSignal: true,
        isRequired: true,
        transformFunction: null
      }
    },
    host: {
      attributes: {
        "role": "tab"
      },
      properties: {
        "attr.data-active": "active()",
        "attr.id": "_pattern.id()",
        "attr.tabindex": "_pattern.tabIndex()",
        "attr.aria-selected": "selected()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-controls": "_pattern.controls()"
      }
    },
    exportAs: ["ngTab"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: Tab,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngTab]',
      exportAs: 'ngTab',
      host: {
        'role': 'tab',
        '[attr.data-active]': 'active()',
        '[attr.id]': '_pattern.id()',
        '[attr.tabindex]': '_pattern.tabIndex()',
        '[attr.aria-selected]': 'selected()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-controls]': '_pattern.controls()'
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
    disabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "disabled",
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
    }]
  }
});

class TabContent {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: TabContent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "14.0.0",
    version: "22.1.0",
    type: TabContent,
    isStandalone: true,
    selector: "ng-template[ngTabContent]",
    exportAs: ["ngTabContent"],
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
  type: TabContent,
  decorators: [{
    type: Directive,
    args: [{
      selector: 'ng-template[ngTabContent]',
      exportAs: 'ngTabContent',
      hostDirectives: [DeferredContent]
    }]
  }]
});

class TabPanel {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _deferredContentAware = inject(DeferredContentAware);
  _tabs = inject(TABS);
  id = input(inject(_IdGenerator).getId('ng-tabpanel-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  _tabPattern = computed(() => {
    return this._tabs._tabMap().get(this.value());
  }, ...(ngDevMode ? [{
    debugName: "_tabPattern"
  }] : []));
  value = input.required(...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  visible = computed(() => !this._pattern.hidden(), ...(ngDevMode ? [{
    debugName: "visible"
  }] : []));
  _pattern = new TabPanelPattern({
    ...this,
    tab: this._tabPattern
  });
  _tabContent = contentChild(TabContent, ...(ngDevMode ? [{
    debugName: "_tabContent"
  }] : []));
  constructor() {
    afterRenderEffect({
      write: () => {
        this._deferredContentAware.contentVisible.set(this.visible());
      }
    });
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      afterRenderEffect({
        read: () => {
          const violations = [];
          if (!this._tabContent()) {
            violations.push('ngTabPanel must have an ngTabContent structural directive to render.');
          }
          if (!this._tabs._tabMap().has(this.value())) {
            violations.push(`ngTabPanel with value '${this.value()}' does not have a corresponding ngTab.`);
          }
          reportViolations(violations, this.element);
        }
      });
    }
  }
  ngOnInit() {
    this._tabs._collection.register(this);
  }
  ngOnDestroy() {
    this._tabs._collection.unregister(this);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: TabPanel,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.2.0",
    version: "22.1.0",
    type: TabPanel,
    isStandalone: true,
    selector: "[ngTabPanel]",
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
      }
    },
    host: {
      attributes: {
        "role": "tabpanel"
      },
      properties: {
        "attr.id": "_pattern.id()",
        "attr.tabindex": "_pattern.tabIndex()",
        "attr.inert": "!visible() ? true : null",
        "attr.aria-labelledby": "_pattern.labelledBy()"
      }
    },
    queries: [{
      propertyName: "_tabContent",
      first: true,
      predicate: TabContent,
      descendants: true,
      isSignal: true
    }],
    exportAs: ["ngTabPanel"],
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
  type: TabPanel,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngTabPanel]',
      exportAs: 'ngTabPanel',
      host: {
        'role': 'tabpanel',
        '[attr.id]': '_pattern.id()',
        '[attr.tabindex]': '_pattern.tabIndex()',
        '[attr.inert]': '!visible() ? true : null',
        '[attr.aria-labelledby]': '_pattern.labelledBy()'
      },
      hostDirectives: [{
        directive: DeferredContentAware,
        inputs: ['preserveContent']
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
    value: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: true
      }]
    }],
    _tabContent: [{
      type: i0.ContentChild,
      args: [i0.forwardRef(() => TabContent), {
        isSignal: true
      }]
    }]
  }
});

export { Tab, TabContent, TabList, TabPanel, Tabs, DeferredContent as ɵɵDeferredContent, DeferredContentAware as ɵɵDeferredContentAware };
//# sourceMappingURL=tabs.mjs.map
