import * as i0 from '@angular/core';
import { inject, Renderer2, ElementRef, signal, input, booleanAttribute, model, computed, afterRenderEffect, Directive, InjectionToken } from '@angular/core';
import * as i1 from '@angular/aria/private';
import { DeferredContentAware, tabIndexTransform, ComboboxPattern, DeferredContent, ComboboxPopupPattern } from '@angular/aria/private';
export { DeferredContent as ɵɵDeferredContent, DeferredContentAware as ɵɵDeferredContentAware } from './_deferred-content-chunk.mjs';

class Combobox extends DeferredContentAware {
  _renderer = inject(Renderer2);
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _popup = signal(undefined, ...(ngDevMode ? [{
    debugName: "_popup"
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
  softDisabled = input(true, {
    ...(ngDevMode ? {
      debugName: "softDisabled"
    } : {}),
    transform: booleanAttribute
  });
  alwaysExpanded = input(false, {
    ...(ngDevMode ? {
      debugName: "alwaysExpanded"
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
  expanded = model(false, ...(ngDevMode ? [{
    debugName: "expanded"
  }] : []));
  value = model('', ...(ngDevMode ? [{
    debugName: "value"
  }] : []));
  inlineSuggestion = input(undefined, ...(ngDevMode ? [{
    debugName: "inlineSuggestion"
  }] : []));
  _pattern = new ComboboxPattern({
    ...this,
    readonly: () => this.readonly(),
    element: () => this.element,
    expandable: () => true,
    popup: computed(() => this._popup()?._pattern)
  });
  constructor() {
    super();
    afterRenderEffect({
      write: () => this._pattern.keyboardEventRelayEffect()
    });
    afterRenderEffect(() => {
      this.contentVisible.set(this._pattern.isExpanded());
    });
    if (this._pattern.isEditable()) {
      afterRenderEffect(() => {
        this._renderer.setProperty(this.element, 'value', this.value());
      });
      afterRenderEffect(() => {
        this._pattern.highlightEffect();
      });
    }
  }
  ngOnInit() {
    if (this.alwaysExpanded()) {
      this.expanded.set(true);
    }
  }
  _registerPopup(popup) {
    this._popup.set(popup);
  }
  _unregisterPopup() {
    this._popup.set(undefined);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: Combobox,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: Combobox,
    isStandalone: true,
    selector: "[ngCombobox]",
    inputs: {
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
      softDisabled: {
        classPropertyName: "softDisabled",
        publicName: "softDisabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      alwaysExpanded: {
        classPropertyName: "alwaysExpanded",
        publicName: "alwaysExpanded",
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
      expanded: {
        classPropertyName: "expanded",
        publicName: "expanded",
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
      inlineSuggestion: {
        classPropertyName: "inlineSuggestion",
        publicName: "inlineSuggestion",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    outputs: {
      expanded: "expandedChange",
      value: "valueChange"
    },
    host: {
      attributes: {
        "role": "combobox"
      },
      listeners: {
        "keydown": "_pattern.onKeydown($event)",
        "focusin": "_pattern.onFocusin()",
        "focusout": "_pattern.onFocusout()",
        "click": "_pattern.onClick($event)",
        "input": "_pattern.onInput($event)"
      },
      properties: {
        "attr.aria-autocomplete": "_pattern.autocomplete()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.aria-readonly": "_pattern.ariaReadonly()",
        "attr.aria-expanded": "_pattern.isExpanded()",
        "attr.aria-activedescendant": "_pattern.activeDescendant()",
        "attr.aria-controls": "_pattern.popupId()",
        "attr.aria-haspopup": "_pattern.popupType()",
        "attr.tabindex": "disabled() && !softDisabled() ? -1 : (tabIndex() !== undefined ? tabIndex() : 0)",
        "attr.disabled": "_pattern.nativeDisabled()",
        "attr.readonly": "_pattern.nativeReadonly()"
      }
    },
    exportAs: ["ngCombobox"],
    usesInheritance: true,
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: Combobox,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngCombobox]',
      exportAs: 'ngCombobox',
      host: {
        'role': 'combobox',
        '[attr.aria-autocomplete]': '_pattern.autocomplete()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.aria-readonly]': '_pattern.ariaReadonly()',
        '[attr.aria-expanded]': '_pattern.isExpanded()',
        '[attr.aria-activedescendant]': '_pattern.activeDescendant()',
        '[attr.aria-controls]': '_pattern.popupId()',
        '[attr.aria-haspopup]': '_pattern.popupType()',
        '[attr.tabindex]': 'disabled() && !softDisabled() ? -1 : (tabIndex() !== undefined ? tabIndex() : 0)',
        '[attr.disabled]': '_pattern.nativeDisabled()',
        '[attr.readonly]': '_pattern.nativeReadonly()',
        '(keydown)': '_pattern.onKeydown($event)',
        '(focusin)': '_pattern.onFocusin()',
        '(focusout)': '_pattern.onFocusout()',
        '(click)': '_pattern.onClick($event)',
        '(input)': '_pattern.onInput($event)'
      }
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
    readonly: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "readonly",
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
    alwaysExpanded: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "alwaysExpanded",
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
    inlineSuggestion: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "inlineSuggestion",
        required: false
      }]
    }]
  }
});

const COMBOBOX_POPUP = new InjectionToken('COMBOBOX_POPUP');

class ComboboxPopup {
  _deferredContent = inject(DeferredContent);
  combobox = input.required(...(ngDevMode ? [{
    debugName: "combobox"
  }] : []));
  _widget = signal(undefined, ...(ngDevMode ? [{
    debugName: "_widget"
  }] : []));
  controlTarget = computed(() => this._widget()?.element, ...(ngDevMode ? [{
    debugName: "controlTarget"
  }] : []));
  popupId = computed(() => this._widget()?.popupId(), ...(ngDevMode ? [{
    debugName: "popupId"
  }] : []));
  activeDescendant = computed(() => this._widget()?.activeDescendant(), ...(ngDevMode ? [{
    debugName: "activeDescendant"
  }] : []));
  popupType = input('listbox', ...(ngDevMode ? [{
    debugName: "popupType"
  }] : []));
  _pattern = new ComboboxPopupPattern({
    ...this
  });
  ngOnInit() {
    this.combobox()._registerPopup(this);
    this._deferredContent.deferredContentAware.set(this.combobox());
  }
  ngOnDestroy() {
    this.combobox()._unregisterPopup();
  }
  _registerWidget(widget) {
    this._widget.set(widget);
  }
  _unregisterWidget() {
    this._widget.set(undefined);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: ComboboxPopup,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: ComboboxPopup,
    isStandalone: true,
    selector: "ng-template[ngComboboxPopup]",
    inputs: {
      combobox: {
        classPropertyName: "combobox",
        publicName: "combobox",
        isSignal: true,
        isRequired: true,
        transformFunction: null
      },
      popupType: {
        classPropertyName: "popupType",
        publicName: "popupType",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    providers: [{
      provide: COMBOBOX_POPUP,
      useExisting: ComboboxPopup
    }],
    exportAs: ["ngComboboxPopup"],
    hostDirectives: [{
      directive: i1.DeferredContent
    }],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: ComboboxPopup,
  decorators: [{
    type: Directive,
    args: [{
      selector: 'ng-template[ngComboboxPopup]',
      exportAs: 'ngComboboxPopup',
      hostDirectives: [DeferredContent],
      providers: [{
        provide: COMBOBOX_POPUP,
        useExisting: ComboboxPopup
      }]
    }]
  }],
  propDecorators: {
    combobox: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "combobox",
        required: true
      }]
    }],
    popupType: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "popupType",
        required: false
      }]
    }]
  }
});

class ComboboxWidget {
  _elementRef = inject(ElementRef);
  _popup = inject(COMBOBOX_POPUP);
  element = this._elementRef.nativeElement;
  popupId = signal(undefined, ...(ngDevMode ? [{
    debugName: "popupId"
  }] : []));
  activeDescendant = input(undefined, ...(ngDevMode ? [{
    debugName: "activeDescendant"
  }] : []));
  _observer;
  constructor() {
    const el = this.element;
    this._observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'id') {
          this.popupId.set(el.id);
        }
      }
    });
    this._observer.observe(el, {
      attributes: true,
      attributeFilter: ['id']
    });
  }
  ngOnInit() {
    this.popupId.set(this.element.id);
    this._popup._registerWidget(this);
  }
  ngOnDestroy() {
    this._observer?.disconnect();
    this._popup._unregisterWidget();
  }
  onFocusin() {
    this._popup._pattern.onFocusin();
  }
  onFocusout(event) {
    this._popup._pattern.onFocusout(event);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: ComboboxWidget,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: ComboboxWidget,
    isStandalone: true,
    selector: "[ngComboboxWidget]",
    inputs: {
      activeDescendant: {
        classPropertyName: "activeDescendant",
        publicName: "activeDescendant",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    host: {
      listeners: {
        "focusin": "onFocusin()",
        "focusout": "onFocusout($event)"
      }
    },
    exportAs: ["ngComboboxWidget"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: ComboboxWidget,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngComboboxWidget]',
      exportAs: 'ngComboboxWidget',
      host: {
        '(focusin)': 'onFocusin()',
        '(focusout)': 'onFocusout($event)'
      }
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    activeDescendant: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "activeDescendant",
        required: false
      }]
    }]
  }
});

export { Combobox, ComboboxPopup, ComboboxWidget };
//# sourceMappingURL=combobox.mjs.map
