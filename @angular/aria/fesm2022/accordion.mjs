import * as i0 from '@angular/core';
import { Directive, inject, ElementRef, contentChild, input, computed, afterRenderEffect, InjectionToken, booleanAttribute, signal, afterNextRender, model } from '@angular/core';
import { DeferredContent, DeferredContentAware } from './_deferred-content-chunk.mjs';
import { Directionality } from '@angular/cdk/bidi';
import { reportViolations, SortedCollection } from './_violations-chunk.mjs';
import { AccordionGroupPattern, AccordionTriggerPattern } from './_accordion-chunk.mjs';
import { _IdGenerator } from '@angular/cdk/a11y';
import '@angular/core/primitives/signals';
import './_expansion-chunk.mjs';
import './_list-navigation-chunk.mjs';
import './_click-event-manager-chunk.mjs';

class AccordionContent {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: AccordionContent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "14.0.0",
    version: "22.1.0",
    type: AccordionContent,
    isStandalone: true,
    selector: "ng-template[ngAccordionContent]",
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
  type: AccordionContent,
  decorators: [{
    type: Directive,
    args: [{
      selector: 'ng-template[ngAccordionContent]',
      hostDirectives: [DeferredContent]
    }]
  }]
});

class AccordionPanel {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _deferredContentAware = inject(DeferredContentAware);
  _accordionContent = contentChild(AccordionContent, ...(ngDevMode ? [{
    debugName: "_accordionContent"
  }] : []));
  id = input(inject(_IdGenerator).getId('ng-accordion-panel-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  visible = computed(() => this._pattern?.expanded() === true, ...(ngDevMode ? [{
    debugName: "visible"
  }] : []));
  _pattern;
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
          if (!this._accordionContent()) {
            violations.push('ngAccordionPanel must have an ngAccordionContent to render.');
          }
          if (!this._pattern) {
            violations.push('ngAccordionPanel must have an ngAccordionTrigger to control it.');
          }
          reportViolations(violations, this.element);
        }
      });
    }
  }
  expand() {
    this._pattern?.open();
  }
  collapse() {
    this._pattern?.close();
  }
  toggle() {
    this._pattern?.toggle();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: AccordionPanel,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.2.0",
    version: "22.1.0",
    type: AccordionPanel,
    isStandalone: true,
    selector: "[ngAccordionPanel]",
    inputs: {
      id: {
        classPropertyName: "id",
        publicName: "id",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    host: {
      attributes: {
        "role": "region"
      },
      properties: {
        "attr.id": "id()",
        "attr.aria-labelledby": "_pattern?.id()",
        "attr.inert": "!visible() ? true : null"
      }
    },
    queries: [{
      propertyName: "_accordionContent",
      first: true,
      predicate: AccordionContent,
      descendants: true,
      isSignal: true
    }],
    exportAs: ["ngAccordionPanel"],
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
  type: AccordionPanel,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngAccordionPanel]',
      exportAs: 'ngAccordionPanel',
      hostDirectives: [{
        directive: DeferredContentAware,
        inputs: ['preserveContent']
      }],
      host: {
        'role': 'region',
        '[attr.id]': 'id()',
        '[attr.aria-labelledby]': '_pattern?.id()',
        '[attr.inert]': '!visible() ? true : null'
      }
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    _accordionContent: [{
      type: i0.ContentChild,
      args: [i0.forwardRef(() => AccordionContent), {
        isSignal: true
      }]
    }],
    id: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "id",
        required: false
      }]
    }]
  }
});

const ACCORDION_GROUP = new InjectionToken('ACCORDION_GROUP');

class AccordionGroup {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _collection = new SortedCollection();
  _triggerPatterns = computed(() => {
    return this._collection.orderedItems().map(t => t._pattern);
  }, ...(ngDevMode ? [{
    debugName: "_triggerPatterns"
  }] : []));
  textDirection = inject(Directionality).valueSignal;
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  multiExpandable = input(true, {
    ...(ngDevMode ? {
      debugName: "multiExpandable"
    } : {}),
    transform: booleanAttribute
  });
  softDisabled = input(true, {
    ...(ngDevMode ? {
      debugName: "softDisabled"
    } : {}),
    transform: booleanAttribute
  });
  wrap = input(false, {
    ...(ngDevMode ? {
      debugName: "wrap"
    } : {}),
    transform: booleanAttribute
  });
  _pattern = new AccordionGroupPattern({
    ...this,
    element: () => this.element,
    activeItem: signal(undefined),
    items: this._triggerPatterns,
    orientation: () => 'vertical'
  });
  constructor() {
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
  }
  ngOnDestroy() {
    this._collection.stopObserving();
  }
  expandAll() {
    this._pattern.expandAll();
  }
  collapseAll() {
    this._pattern.collapseAll();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: AccordionGroup,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: AccordionGroup,
    isStandalone: true,
    selector: "[ngAccordionGroup]",
    inputs: {
      disabled: {
        classPropertyName: "disabled",
        publicName: "disabled",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      },
      multiExpandable: {
        classPropertyName: "multiExpandable",
        publicName: "multiExpandable",
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
      wrap: {
        classPropertyName: "wrap",
        publicName: "wrap",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    host: {
      listeners: {
        "keydown": "_pattern.onKeydown($event)",
        "click": "_pattern.onClick($event)",
        "focusin": "_pattern.onFocus($event)"
      }
    },
    providers: [{
      provide: ACCORDION_GROUP,
      useExisting: AccordionGroup
    }],
    exportAs: ["ngAccordionGroup"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: AccordionGroup,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngAccordionGroup]',
      exportAs: 'ngAccordionGroup',
      host: {
        '(keydown)': '_pattern.onKeydown($event)',
        '(click)': '_pattern.onClick($event)',
        '(focusin)': '_pattern.onFocus($event)'
      },
      providers: [{
        provide: ACCORDION_GROUP,
        useExisting: AccordionGroup
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
    multiExpandable: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "multiExpandable",
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
    wrap: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "wrap",
        required: false
      }]
    }]
  }
});

class AccordionTrigger {
  _elementRef = inject(ElementRef);
  element = this._elementRef.nativeElement;
  _accordionGroup = inject(ACCORDION_GROUP);
  panel = input.required(...(ngDevMode ? [{
    debugName: "panel"
  }] : []));
  id = input(inject(_IdGenerator).getId('ng-accordion-trigger-', true), ...(ngDevMode ? [{
    debugName: "id"
  }] : []));
  panelId = computed(() => this.panel().id(), ...(ngDevMode ? [{
    debugName: "panelId"
  }] : []));
  disabled = input(false, {
    ...(ngDevMode ? {
      debugName: "disabled"
    } : {}),
    transform: booleanAttribute
  });
  expanded = model(false, ...(ngDevMode ? [{
    debugName: "expanded"
  }] : []));
  active = computed(() => this._pattern.active(), ...(ngDevMode ? [{
    debugName: "active"
  }] : []));
  _pattern;
  constructor() {
    if (this.element.tagName === 'BUTTON' && !this.element.hasAttribute('type')) {
      this.element.setAttribute('type', 'button');
    }
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      afterRenderEffect({
        read: () => {
          const violations = [];
          if (this.panel() && this.panel().element.contains(this.element)) {
            violations.push('ngAccordionTrigger must not be nested inside its controlled ngAccordionPanel, otherwise it will become unreachable when collapsed.');
          }
          if (this.panel() && this.panel()._pattern !== this._pattern) {
            violations.push('ngAccordionPanel is already controlled by another ngAccordionTrigger.');
          }
          reportViolations(violations, this.element);
        }
      });
    }
  }
  ngOnInit() {
    this._pattern = new AccordionTriggerPattern({
      ...this,
      element: () => this.element,
      accordionGroup: () => this._accordionGroup._pattern,
      accordionPanelId: this.panelId
    });
    this.panel()._pattern = this._pattern;
    this._accordionGroup._collection.register(this);
  }
  ngOnDestroy() {
    this.panel()._pattern = undefined;
    this._accordionGroup._collection.unregister(this);
  }
  expand() {
    this._pattern.open();
  }
  collapse() {
    this._pattern.close();
  }
  toggle() {
    this._pattern.toggle();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: AccordionTrigger,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: AccordionTrigger,
    isStandalone: true,
    selector: "[ngAccordionTrigger]",
    inputs: {
      panel: {
        classPropertyName: "panel",
        publicName: "panel",
        isSignal: true,
        isRequired: true,
        transformFunction: null
      },
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
      expanded: {
        classPropertyName: "expanded",
        publicName: "expanded",
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
        "role": "button"
      },
      properties: {
        "attr.data-active": "active()",
        "id": "id()",
        "attr.aria-expanded": "expanded()",
        "attr.aria-controls": "_pattern.controls()",
        "attr.aria-disabled": "_pattern.disabled()",
        "attr.disabled": "_pattern.hardDisabled() ? true : null",
        "attr.tabindex": "_pattern.tabIndex()"
      }
    },
    exportAs: ["ngAccordionTrigger"],
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: AccordionTrigger,
  decorators: [{
    type: Directive,
    args: [{
      selector: '[ngAccordionTrigger]',
      exportAs: 'ngAccordionTrigger',
      host: {
        '[attr.data-active]': 'active()',
        'role': 'button',
        '[id]': 'id()',
        '[attr.aria-expanded]': 'expanded()',
        '[attr.aria-controls]': '_pattern.controls()',
        '[attr.aria-disabled]': '_pattern.disabled()',
        '[attr.disabled]': '_pattern.hardDisabled() ? true : null',
        '[attr.tabindex]': '_pattern.tabIndex()'
      }
    }]
  }],
  ctorParameters: () => [],
  propDecorators: {
    panel: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "panel",
        required: true
      }]
    }],
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
    }]
  }
});

export { AccordionContent, AccordionGroup, AccordionPanel, AccordionTrigger, DeferredContent as ɵɵDeferredContent, DeferredContentAware as ɵɵDeferredContentAware };
//# sourceMappingURL=accordion.mjs.map
