import * as i0 from '@angular/core';
import { InjectionToken, input, inject, ElementRef, booleanAttribute, model, computed, signal, afterNextRender, afterRenderEffect, untracked, Directive } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { _IdGenerator } from '@angular/cdk/a11y';
import { ListboxPattern, OptionPattern } from './_option-chunk.mjs';
import { SortedCollection, reportViolations } from './_violations-chunk.mjs';
import { tabIndexTransform } from './_transforms-chunk.mjs';
import './_list-chunk.mjs';
import './_list-navigation-chunk.mjs';
import './_list-typeahead-chunk.mjs';
import './_click-event-manager-chunk.mjs';
import '@angular/core/primitives/signals';

const LISTBOX = new InjectionToken('LISTBOX');

class Listbox {
  id = input(inject(_IdGenerator).getId('ng-listbox-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _collection = new SortedCollection();
  textDirection = inject(Directionality).valueSignal.asReadonly();
  orientation = input('vertical', ...(ngDevMode ? [{
    debugName: "orientation"
  }] : []));
  multi = input(false, {
    ...(ngDevMode ? {
      debugName: "multi"
    } : {}),
    transform: booleanAttribute
  });
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
  typeaheadDelay = input(500, ...(ngDevMode ? [{
    debugName: "typeaheadDelay"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  readonly = input(false, {
    ...(ngDevMode ? {
      debugName: "readonly"
    } : {}),
    transform: booleanAttribute
  });
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
  _pattern;
  activeDescendant;
  _orderedItemPatterns = computed(() => this._collection.orderedItems().map(option => option._pattern), ...(ngDevMode ? [{
    debugName: "_orderedItemPatterns"
  }] : []));
  constructor() {
    const inputs = {
      ...this,
      id: this.id,
      items: this._orderedItemPatterns,
      activeItem: signal(undefined),
      textDirection: this.textDirection,
      element: () => this._elementRef.nativeElement
    };
    this._pattern = new ListboxPattern(inputs);
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
          this._pattern.listBehavior.unfocus();
          this._pattern.setDefaultState();
        }
      }
    });
    afterRenderEffect({
      write: () => {
        const items = inputs.items();
        const value = untracked(() => this.value());
        if (items && value.some(v => !items.some(i => i.value() === v))) {
          this.value.set(value.filter(v => items.some(i => i.value() === v)));
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
  gotoFirst() {
    this._pattern.listBehavior.first();
  }
  gotoIndex(index) {
    const patterns = this._orderedItemPatterns();
    const item = patterns[Math.min(Math.max(index, 0), patterns.length - 1)];
    if (item) {
      this._pattern.listBehavior.goto(item);
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: Listbox,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: Listbox,
    isStandalone: true,
    selector: "[ngListbox]",
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
      readonly: {
        classPropertyName: "readonly",
        publicName: "readonly",
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
      }
    },
    outputs: {
      value: "valueChange"
    },
    host: {
      attributes: {
        "role": "listbox"
      },
      listeners: {
        "keydown": "_pattern.onKeydown($event)",
        "click": "_pattern.onClick($event)",
        "focusin": "_pattern.onFocusIn()"
      },
      properties: {
        "attr.id": "id()",
        "attr.tabindex": "tabIndex() !== undefined ? tabIndex() : _pattern.tabIndex()",
        "attr.aria-readonly": "_pattern.readonly()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-orientation": "_pattern.orientation()",
        "attr.aria-multiselectable": "_pattern.multi()",
        "attr.aria-activedescendant": "_pattern.activeDescendant()"
      }
    },
    providers: [{
      provide: LISTBOX,
      useExisting: Listbox
    }],
    exportAs: ["ngListbox"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: Listbox,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngListbox]',
      exportAs: 'ngListbox',
      host: {
        'role': 'listbox',
        '[attr.id]': 'id()',
        '[attr.tabindex]': 'tabIndex() !== undefined ? tabIndex() : _pattern.tabIndex()',
        '[attr.aria-readonly]': '_pattern.readonly()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-orientation]': '_pattern.orientation()',
        '[attr.aria-multiselectable]': '_pattern.multi()',
        '[attr.aria-activedescendant]': '_pattern.activeDescendant()',
        '(keydown)': '_pattern.onKeydown($event)',
        '(click)': '_pattern.onClick($event)',
        '(focusin)': '_pattern.onFocusIn()'
      },
      providers: [{
        provide: LISTBOX,
        useExisting: Listbox
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
    readonly: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "readonly",
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
    }]
  }
});

class Option {
  element = inject(ElementRef).nativeElement;
  active = computed(() => this._pattern.active(), ...(ngDevMode ? [{
    debugName: "active"
  }] : []));
  _listbox = inject(LISTBOX);
  id = input(inject(_IdGenerator).getId('ng-option-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  _listboxPattern = computed(() => this._listbox._pattern, ...(ngDevMode ? [{
    debugName: "_listboxPattern"
  }] : []));
  value = input.required(...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  label = input(...(ngDevMode ? [undefined, {
    debugName: "label"
  }] : []));
  selected = computed(() => this._pattern.selected(), ...(ngDevMode ? [{
    debugName: "selected"
  }] : []));
  _pattern = new OptionPattern({
    ...this,
    id: this.id,
    value: this.value,
    listbox: this._listboxPattern,
    element: () => this.element,
    searchTerm: () => this.label() ?? ''
  });
  ngOnInit() {
    this._listbox._collection.register(this);
  }
  ngOnDestroy() {
    this._listbox._collection.unregister(this);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: Option,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: Option,
    isStandalone: true,
    selector: "[ngOption]",
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
      label: {
        classPropertyName: "label",
        publicName: "label",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    host: {
      attributes: {
        "role": "option"
      },
      properties: {
        "attr.data-active": "active()",
        "attr.id": "_pattern.id()",
        "attr.tabindex": "_pattern.tabIndex()",
        "attr.aria-selected": "_pattern.selected()",
        "attr.aria-disabled": "_pattern.disabled()"
      }
    },
    exportAs: ["ngOption"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: Option,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngOption]',
      exportAs: 'ngOption',
      host: {
        'role': 'option',
        '[attr.data-active]': 'active()',
        '[attr.id]': '_pattern.id()',
        '[attr.tabindex]': '_pattern.tabIndex()',
        '[attr.aria-selected]': '_pattern.selected()',
        '[attr.aria-disabled]': '_pattern.disabled()'
      }
    }]
  }],
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

export { Listbox, Option };
//# sourceMappingURL=listbox.mjs.map
