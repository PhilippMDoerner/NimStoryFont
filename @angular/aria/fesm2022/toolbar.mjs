import * as i0 from '@angular/core';
import { inject, ElementRef, computed, input, booleanAttribute, model, signal, afterRenderEffect, afterNextRender, Directive, InjectionToken, contentChildren } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { ToolbarPattern, ToolbarWidgetPattern, ToolbarWidgetGroupPattern } from './_toolbar-widget-group-chunk.mjs';
import { SortedCollection, reportViolations } from './_violations-chunk.mjs';
import { _IdGenerator } from '@angular/cdk/a11y';
import './_list-chunk.mjs';
import './_list-navigation-chunk.mjs';
import './_list-typeahead-chunk.mjs';
import '@angular/core/primitives/signals';

class Toolbar {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _collection = new SortedCollection();
  textDirection = inject(Directionality).valueSignal;
  _itemPatterns = computed(() => this._collection.orderedItems().map(widget => widget._pattern), ...(ngDevMode ? [{
    debugName: "_itemPatterns"
  }] : []));
  orientation = input('horizontal', ...(ngDevMode ? [{
    debugName: "orientation"
  }] : []));
  softDisabled = input(true, {
    ...(ngDevMode ? {
      debugName: "softDisabled"
    } : {}),
    transform: booleanAttribute
  });
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  wrap = input(true, {
    ...(ngDevMode ? {
      debugName: "wrap"
    } : {}),
    transform: booleanAttribute
  });
  value = model([], ...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  _pattern = new ToolbarPattern({
    ...this,
    items: this._itemPatterns,
    activeItem: signal(undefined),
    textDirection: this.textDirection,
    element: () => this._elementRef.nativeElement,
    getItem: e => this._getItem(e),
    value: this.value
  });
  constructor() {
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
  _getItem(element) {
    return this._itemPatterns().find(item => item.element()?.contains(element));
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: Toolbar,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: Toolbar,
    isStandalone: true,
    selector: "[ngToolbar]",
    inputs: {
      orientation: {
        classPropertyName: "orientation",
        publicName: "orientation",
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
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
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
        "role": "toolbar"
      },
      listeners: {
        "keydown": "_pattern.onKeydown($event)",
        "click": "_pattern.onClick($event)",
        "pointerdown": "_pattern.onPointerdown($event)",
        "focusin": "_pattern.onFocusIn()"
      },
      properties: {
        "attr.tabindex": "_pattern.tabIndex()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-orientation": "_pattern.orientation()"
      }
    },
    exportAs: ["ngToolbar"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: Toolbar,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngToolbar]',
      exportAs: 'ngToolbar',
      host: {
        'role': 'toolbar',
        '[attr.tabindex]': '_pattern.tabIndex()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-orientation]': '_pattern.orientation()',
        '(keydown)': '_pattern.onKeydown($event)',
        '(click)': '_pattern.onClick($event)',
        '(pointerdown)': '_pattern.onPointerdown($event)',
        '(focusin)': '_pattern.onFocusIn()'
      }
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
    softDisabled: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "softDisabled",
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
    wrap: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "wrap",
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

const TOOLBAR_WIDGET_GROUP = new InjectionToken('TOOLBAR_WIDGET_GROUP');

class ToolbarWidget {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _toolbar = inject(Toolbar);
  id = input(inject(_IdGenerator).getId('ng-toolbar-widget-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  _toolbarPattern = computed(() => this._toolbar._pattern, ...(ngDevMode ? [{
    debugName: "_toolbarPattern"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  hardDisabled = computed(() => this._pattern.disabled() && !this._toolbar.softDisabled(), ...(ngDevMode ? [{
    debugName: "hardDisabled"
  }] : []));
  _group = inject(TOOLBAR_WIDGET_GROUP, {
    optional: true
  });
  value = input.required(...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  active = computed(() => this._pattern.active(), ...(ngDevMode ? [{
    debugName: "active"
  }] : []));
  selected = () => this._pattern.selected();
  _groupPattern = () => this._group?._pattern;
  _pattern = new ToolbarWidgetPattern({
    ...this,
    group: this._groupPattern,
    toolbar: this._toolbarPattern,
    id: this.id,
    value: this.value,
    element: () => this.element
  });
  ngOnInit() {
    this._toolbar._collection.register(this);
  }
  ngOnDestroy() {
    this._toolbar._collection.unregister(this);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: ToolbarWidget,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: ToolbarWidget,
    isStandalone: true,
    selector: "[ngToolbarWidget]",
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
        "ngToolbarWidget": ""
      },
      properties: {
        "attr.data-active": "active()",
        "attr.tabindex": "_pattern.tabIndex()",
        "attr.inert": "hardDisabled() ? true : null",
        "attr.disabled": "hardDisabled() ? true : null",
        "attr.aria-disabled": "_pattern.disabled()",
        "id": "_pattern.id()"
      }
    },
    exportAs: ["ngToolbarWidget"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: ToolbarWidget,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngToolbarWidget]',
      exportAs: 'ngToolbarWidget',
      host: {
        'ngToolbarWidget': '',
        '[attr.data-active]': 'active()',
        '[attr.tabindex]': '_pattern.tabIndex()',
        '[attr.inert]': 'hardDisabled() ? true : null',
        '[attr.disabled]': 'hardDisabled() ? true : null',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[id]': '_pattern.id()'
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

class ToolbarWidgetGroup {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _toolbar = inject(Toolbar, {
    optional: true
  });
  _widgets = contentChildren(ToolbarWidget, {
    ...(ngDevMode ? {
      debugName: "_widgets"
    } : {}),
    descendants: true
  });
  _toolbarPattern = computed(() => this._toolbar?._pattern, ...(ngDevMode ? [{
    debugName: "_toolbarPattern"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  _itemPatterns = () => this._widgets().map(w => w._pattern);
  multi = input(false, {
    ...(ngDevMode ? {
      debugName: "multi"
    } : {}),
    transform: booleanAttribute
  });
  _pattern = new ToolbarWidgetGroupPattern({
    ...this,
    items: this._itemPatterns,
    toolbar: this._toolbarPattern
  });
  constructor() {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      afterRenderEffect({
        read: () => {
          const violations = [];
          if (!this._toolbar) {
            violations.push('ngToolbarWidgetGroup must be placed inside an ngToolbar container.');
          }
          reportViolations(violations, this.element);
        }
      });
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: ToolbarWidgetGroup,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.2.0",
    version: "22.1.0",
    type: ToolbarWidgetGroup,
    isStandalone: true,
    selector: "[ngToolbarWidgetGroup]",
    inputs: {
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
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
      }
    },
    providers: [{
      provide: TOOLBAR_WIDGET_GROUP,
      useExisting: ToolbarWidgetGroup
    }],
    queries: [{
      propertyName: "_widgets",
      predicate: ToolbarWidget,
      descendants: true,
      isSignal: true
    }],
    exportAs: ["ngToolbarWidgetGroup"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: ToolbarWidgetGroup,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngToolbarWidgetGroup]',
      exportAs: 'ngToolbarWidgetGroup',
      providers: [{
        provide: TOOLBAR_WIDGET_GROUP,
        useExisting: ToolbarWidgetGroup
      }]
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    _widgets: [{
      type: i0.ContentChildren,
      args: [i0.forwardRef(() => ToolbarWidget), {
        ...{
          descendants: true
        },
        isSignal: true
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
    multi: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "multi",
        required: false
      }]
    }]
  }
});

export { Toolbar, ToolbarWidget, ToolbarWidgetGroup };
//# sourceMappingURL=toolbar.mjs.map
