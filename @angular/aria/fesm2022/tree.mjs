import * as i0 from '@angular/core';
import { inject, ElementRef, input, booleanAttribute, model, signal, computed, afterNextRender, afterRenderEffect, untracked, Directive } from '@angular/core';
import { _IdGenerator } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { TreePattern, TreeItemPattern } from './_tree-chunk.mjs';
import { SortedCollection, reportViolations, sortDirectives } from './_violations-chunk.mjs';
import { tabIndexTransform } from './_transforms-chunk.mjs';
import { DeferredContent, DeferredContentAware } from './_deferred-content-chunk.mjs';
import './_expansion-chunk.mjs';
import './_list-navigation-chunk.mjs';
import './_list-typeahead-chunk.mjs';
import './_click-event-manager-chunk.mjs';
import '@angular/core/primitives/signals';

class Tree {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _collection = new SortedCollection();
  id = input(inject(_IdGenerator).getId('ng-tree-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  orientation = input('vertical', ...(ngDevMode ? [{
    debugName: "orientation"
  }] : []));
  multi = input(false, {
    ...(ngDevMode ? {
      debugName: "multi"
    } : {}),
    transform: booleanAttribute
  });
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  selectionMode = input('explicit', ...(ngDevMode ? [{
    debugName: "selectionMode"
  }] : []));
  focusMode = input('roving', ...(ngDevMode ? [{
    debugName: "focusMode"
  }] : []));
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
  typeaheadDelay = input(500, ...(ngDevMode ? [{
    debugName: "typeaheadDelay"
  }] : []));
  tabIndex = input(undefined, {
    ...(ngDevMode ? {
      debugName: "tabIndex"
    } : {}),
    alias: 'tabindex',
    transform: tabIndexTransform
  });
  value = model([], ...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  textDirection = inject(Directionality).valueSignal;
  nav = input(false, {
    ...(ngDevMode ? {
      debugName: "nav"
    } : {}),
    transform: booleanAttribute
  });
  currentType = input('page', ...(ngDevMode ? [{
    debugName: "currentType"
  }] : []));
  _pattern;
  activeDescendant;
  constructor() {
    const inputs = {
      ...this,
      id: this.id,
      items: computed(() => this._collection.orderedItems().map(item => item._pattern)),
      activeItem: signal(undefined),
      element: () => this.element
    };
    this._pattern = new TreePattern(inputs);
    this.activeDescendant = computed(() => this._pattern.activeDescendant(), ...(ngDevMode ? [{
      debugName: "activeDescendant"
    }] : []));
    afterNextRender(() => {
      this._collection.startObserving(this.element);
    });
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      afterRenderEffect({
        read: () => {
          reportViolations(this._pattern.validate(), this.element);
        }
      });
    }
    afterRenderEffect({
      write: () => this._pattern.setDefaultStateEffect()
    });
    afterRenderEffect({
      write: () => {
        const items = inputs.items();
        const activeItem = untracked(() => inputs.activeItem());
        if (activeItem && !items.some(i => i === activeItem)) {
          this._pattern.treeBehavior.unfocus();
          this._pattern.setDefaultState();
        }
      }
    });
  }
  ngOnDestroy() {
    this._collection.stopObserving();
  }
  scrollActiveItemIntoView(options = {
    block: 'nearest'
  }) {
    this._pattern.inputs.activeItem()?.element()?.scrollIntoView(options);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: Tree,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: Tree,
    isStandalone: true,
    selector: "[ngTree]",
    inputs: {
      id: {
        classPropertyName: "id",
        publicName: "id",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      orientation: {
        classPropertyName: "orientation",
        publicName: "orientation",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      multi: {
        classPropertyName: "multi",
        publicName: "multi",
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
      selectionMode: {
        classPropertyName: "selectionMode",
        publicName: "selectionMode",
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
      typeaheadDelay: {
        classPropertyName: "typeaheadDelay",
        publicName: "typeaheadDelay",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      tabIndex: {
        classPropertyName: "tabIndex",
        publicName: "tabindex",
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
      nav: {
        classPropertyName: "nav",
        publicName: "nav",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      currentType: {
        classPropertyName: "currentType",
        publicName: "currentType",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    outputs: {
      value: "valueChange"
    },
    host: {
      attributes: {
        "role": "tree"
      },
      listeners: {
        "keydown": "_pattern.onKeydown($event)",
        "click": "_pattern.onClick($event)",
        "focusin": "_pattern.onFocusIn()"
      },
      properties: {
        "attr.id": "id()",
        "attr.aria-orientation": "_pattern.orientation()",
        "attr.aria-multiselectable": "_pattern.multi()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-activedescendant": "_pattern.activeDescendant()",
        "tabindex": "tabIndex() !== undefined ? tabIndex() : _pattern.tabIndex()"
      }
    },
    exportAs: ["ngTree"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: Tree,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngTree]',
      exportAs: 'ngTree',
      host: {
        'role': 'tree',
        '[attr.id]': 'id()',
        '[attr.aria-orientation]': '_pattern.orientation()',
        '[attr.aria-multiselectable]': '_pattern.multi()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-activedescendant]': '_pattern.activeDescendant()',
        '[tabindex]': 'tabIndex() !== undefined ? tabIndex() : _pattern.tabIndex()',
        '(keydown)': '_pattern.onKeydown($event)',
        '(click)': '_pattern.onClick($event)',
        '(focusin)': '_pattern.onFocusIn()'
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
    orientation: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "orientation",
        required: false
      }]
    }],
    multi: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "multi",
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
    selectionMode: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "selectionMode",
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
    typeaheadDelay: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "typeaheadDelay",
        required: false
      }]
    }],
    tabIndex: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "tabindex",
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
    nav: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "nav",
        required: false
      }]
    }],
    currentType: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "currentType",
        required: false
      }]
    }]
  }
});

class TreeItemGroup {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _deferredContent = inject(DeferredContent);
  _unorderedItems = signal(new Set(), ...(ngDevMode ? [{
    debugName: "_unorderedItems"
  }] : []));
  _childPatterns = computed(() => [...this._unorderedItems()].sort(sortDirectives).map(c => c._pattern), ...(ngDevMode ? [{
    debugName: "_childPatterns"
  }] : []));
  ownedBy = input.required(...(ngDevMode ? [{
    debugName: "ownedBy"
  }] : []));
  ngOnInit() {
    this._deferredContent.deferredContentAware.set(this.ownedBy());
    this.ownedBy()._register(this);
  }
  ngOnDestroy() {
    this.ownedBy()._unregister();
  }
  _register(child) {
    this._unorderedItems().add(child);
    this._unorderedItems.set(new Set(this._unorderedItems()));
  }
  _unregister(child) {
    this._unorderedItems().delete(child);
    this._unorderedItems.set(new Set(this._unorderedItems()));
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: TreeItemGroup,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: TreeItemGroup,
    isStandalone: true,
    selector: "ng-template[ngTreeItemGroup]",
    inputs: {
      ownedBy: {
        classPropertyName: "ownedBy",
        publicName: "ownedBy",
        isSignal: true,
        isRequired: true,
        transformFunction: null
      }
    },
    exportAs: ["ngTreeItemGroup"],
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
  type: TreeItemGroup,
  decorators: [{
    type: Directive,
    args: [{
      selector: 'ng-template[ngTreeItemGroup]',
      exportAs: 'ngTreeItemGroup',
      hostDirectives: [DeferredContent]
    }]
  }],
  propDecorators: {
    ownedBy: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "ownedBy",
        required: true
      }]
    }]
  }
});

class TreeItem extends DeferredContentAware {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _group = signal(undefined, ...(ngDevMode ? [{
    debugName: "_group"
  }] : []));
  id = input(inject(_IdGenerator).getId('ng-tree-item-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  value = input.required(...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  parent = input.required(...(ngDevMode ? [{
    debugName: "parent"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  selectable = input(true, ...(ngDevMode ? [{
    debugName: "selectable"
  }] : []));
  expanded = model(false, ...(ngDevMode ? [{
    debugName: "expanded"
  }] : []));
  label = input(...(ngDevMode ? [undefined, {
    debugName: "label"
  }] : []));
  searchTerm = computed(() => this.label() ?? this.element.textContent, ...(ngDevMode ? [{
    debugName: "searchTerm"
  }] : []));
  tree = computed(() => {
    if (this.parent() instanceof Tree) {
      return this.parent();
    }
    return this.parent().ownedBy().tree();
  }, ...(ngDevMode ? [{
    debugName: "tree"
  }] : []));
  active = computed(() => this._pattern.active(), ...(ngDevMode ? [{
    debugName: "active"
  }] : []));
  level = computed(() => this._pattern.level(), ...(ngDevMode ? [{
    debugName: "level"
  }] : []));
  selected = computed(() => this._pattern.selected(), ...(ngDevMode ? [{
    debugName: "selected"
  }] : []));
  visible = computed(() => this._pattern.visible(), ...(ngDevMode ? [{
    debugName: "visible"
  }] : []));
  _expanded = computed(() => this._pattern.expandable() ? this._pattern.expanded() : undefined, ...(ngDevMode ? [{
    debugName: "_expanded"
  }] : []));
  _pattern;
  constructor() {
    super();
    afterRenderEffect({
      write: () => {
        this.contentVisible.set(this._pattern.expanded());
      }
    });
  }
  ngOnInit() {
    if (this.parent() instanceof TreeItemGroup) {
      this.parent()._register(this);
    }
    this.tree()._collection.register(this);
    const treePattern = computed(() => this.tree()._pattern, ...(ngDevMode ? [{
      debugName: "treePattern"
    }] : []));
    const parentPattern = computed(() => {
      if (this.parent() instanceof Tree) {
        return treePattern();
      }
      return this.parent().ownedBy()._pattern;
    }, ...(ngDevMode ? [{
      debugName: "parentPattern"
    }] : []));
    this._pattern = new TreeItemPattern({
      ...this,
      tree: treePattern,
      parent: parentPattern,
      children: computed(() => this._group()?._childPatterns()),
      hasChildren: computed(() => !!this._group()),
      element: () => this.element,
      searchTerm: () => this.searchTerm() ?? ''
    });
  }
  ngOnDestroy() {
    if (this.parent() instanceof TreeItemGroup) {
      this.parent()._unregister(this);
    }
    this.tree()._collection.unregister(this);
  }
  _register(group) {
    this._group.set(group);
  }
  _unregister() {
    this._group.set(undefined);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: TreeItem,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: TreeItem,
    isStandalone: true,
    selector: "[ngTreeItem]",
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
      parent: {
        classPropertyName: "parent",
        publicName: "parent",
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
      selectable: {
        classPropertyName: "selectable",
        publicName: "selectable",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      expanded: {
        classPropertyName: "expanded",
        publicName: "expanded",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      label: {
        classPropertyName: "label",
        publicName: "label",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    outputs: {
      expanded: "expandedChange"
    },
    host: {
      attributes: {
        "role": "treeitem"
      },
      properties: {
        "attr.data-active": "active()",
        "id": "_pattern.id()",
        "attr.aria-expanded": "_expanded()",
        "attr.aria-selected": "selected()",
        "attr.aria-current": "_pattern.current()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-level": "level()",
        "attr.aria-setsize": "_pattern.setsize()",
        "attr.aria-posinset": "_pattern.posinset()",
        "attr.tabindex": "_pattern.tabIndex()"
      }
    },
    exportAs: ["ngTreeItem"],
    usesInheritance: true,
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: TreeItem,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngTreeItem]',
      exportAs: 'ngTreeItem',
      host: {
        '[attr.data-active]': 'active()',
        'role': 'treeitem',
        '[id]': '_pattern.id()',
        '[attr.aria-expanded]': '_expanded()',
        '[attr.aria-selected]': 'selected()',
        '[attr.aria-current]': '_pattern.current()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-level]': 'level()',
        '[attr.aria-setsize]': '_pattern.setsize()',
        '[attr.aria-posinset]': '_pattern.posinset()',
        '[attr.tabindex]': '_pattern.tabIndex()'
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
    parent: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "parent",
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
    selectable: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "selectable",
        required: false
      }]
    }],
    expanded: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "expanded",
        required: false
      }]
    }, {
      type: i0.Output,
      args: ["expandedChange"]
    }],
    label: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "label",
        required: false
      }]
    }]
  }
});

export { Tree, TreeItem, TreeItemGroup, DeferredContent as ɵɵDeferredContent };
//# sourceMappingURL=tree.mjs.map
