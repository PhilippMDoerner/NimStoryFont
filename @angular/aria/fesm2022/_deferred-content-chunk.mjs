import * as i0 from '@angular/core';
import { inject, TemplateRef, ViewContainerRef, signal, afterRenderEffect, model, Directive } from '@angular/core';

class DeferredContentAware {
  contentVisible = signal(false, ...(ngDevMode ? [{
    debugName: "contentVisible"
  }] : []));
  preserveContent = model(false, ...(ngDevMode ? [{
    debugName: "preserveContent"
  }] : []));
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: DeferredContentAware,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "17.1.0",
    version: "22.1.0",
    type: DeferredContentAware,
    isStandalone: true,
    inputs: {
      preserveContent: {
        classPropertyName: "preserveContent",
        publicName: "preserveContent",
        isSignal: true,
        isRequired: false,
        transformFunction: null
      }
    },
    outputs: {
      preserveContent: "preserveContentChange"
    },
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: DeferredContentAware,
  decorators: [{
    type: Directive
  }],
  propDecorators: {
    preserveContent: [{
      type: i0.Input,
      args: [{
        isSignal: true,
        alias: "preserveContent",
        required: false
      }]
    }, {
      type: i0.Output,
      args: ["preserveContentChange"]
    }]
  }
});
class DeferredContent {
  _deferredContentAware = inject(DeferredContentAware, {
    optional: true
  });
  _templateRef = inject(TemplateRef);
  _viewContainerRef = inject(ViewContainerRef);
  _currentViewRef = null;
  _isRendered = false;
  deferredContentAware = signal(this._deferredContentAware, ...(ngDevMode ? [{
    debugName: "deferredContentAware"
  }] : []));
  constructor() {
    afterRenderEffect({
      write: () => {
        if (this.deferredContentAware()?.contentVisible()) {
          if (!this._isRendered) {
            this._destroyContent();
            this._currentViewRef = this._viewContainerRef.createEmbeddedView(this._templateRef);
            this._isRendered = true;
          }
        } else if (!this.deferredContentAware()?.preserveContent()) {
          this._destroyContent();
          this._isRendered = false;
        }
      }
    });
  }
  ngOnDestroy() {
    this._destroyContent();
  }
  _destroyContent() {
    const ref = this._currentViewRef;
    if (ref && !ref.destroyed) {
      ref.destroy();
      this._currentViewRef = null;
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.0",
    ngImport: i0,
    type: DeferredContent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Directive
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: "14.0.0",
    version: "22.1.0",
    type: DeferredContent,
    isStandalone: true,
    ngImport: i0
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.0",
  ngImport: i0,
  type: DeferredContent,
  decorators: [{
    type: Directive
  }],
  ctorParameters: () => []
});

export { DeferredContent, DeferredContentAware };
//# sourceMappingURL=_deferred-content-chunk.mjs.map
