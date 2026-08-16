var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};
var __decorateClass = (decorators, target, key, kind) => {
  for (var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target, i = decorators.length - 1, decorator; i >= 0; i--)
    (decorator = decorators[i]) && (result = (kind ? decorator(target, key, result) : decorator(result)) || result);
  return kind && result && __defProp(target, key, result), result;
}, __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/client/render.ts
var render_exports = {};
__export(render_exports, {
  render: () => render,
  renderToCanvas: () => renderToCanvas,
  rendererFactory: () => rendererFactory
});
import "@angular/compiler";

// src/client/angular-beta/AbstractRenderer.ts
import { bootstrapApplication } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";
import { stringify } from "telejson";

// src/client/angular-beta/utils/NgComponentAnalyzer.ts
import {
  Component,
  Directive,
  Input,
  Output,
  Pipe,
  \u0275ReflectionCapabilities as ReflectionCapabilities,
  \u0275getComponentDef as getComponentDef
} from "@angular/core";
var reflectionCapabilities = new ReflectionCapabilities(), getComponentInputsOutputs = (component) => {
  let componentMetadata = getComponentDecoratorMetadata(component), componentPropsMetadata = getComponentPropsDecoratorMetadata(component), initialValue = {
    inputs: [],
    outputs: []
  };
  componentMetadata && componentMetadata.inputs && initialValue.inputs.push(
    ...componentMetadata.inputs.map((i) => ({
      propName: typeof i == "string" ? i : i.name,
      templateName: typeof i == "string" ? i : i.alias
    }))
  ), componentMetadata && componentMetadata.outputs && initialValue.outputs.push(
    ...componentMetadata.outputs.map((i) => ({ propName: i, templateName: i }))
  );
  let decoratorDerived = componentPropsMetadata ? Object.entries(componentPropsMetadata).reduce((previousValue, [propertyName, values]) => {
    let value = values.find((v) => v instanceof Input || v instanceof Output);
    if (value instanceof Input) {
      let inputToAdd = {
        propName: propertyName,
        templateName: value.bindingPropertyName ?? value.alias ?? propertyName
      }, previousInputsFiltered = previousValue.inputs.filter(
        (i) => i.templateName !== propertyName
      );
      return {
        ...previousValue,
        inputs: [...previousInputsFiltered, inputToAdd]
      };
    }
    if (value instanceof Output) {
      let outputToAdd = {
        propName: propertyName,
        templateName: value.bindingPropertyName ?? value.alias ?? propertyName
      }, previousOutputsFiltered = previousValue.outputs.filter(
        (i) => i.templateName !== propertyName
      );
      return {
        ...previousValue,
        outputs: [...previousOutputsFiltered, outputToAdd]
      };
    }
    return previousValue;
  }, initialValue) : initialValue;
  return addSignalInputsOutputs(component, decoratorDerived);
}, hasEntry = (list, propName, templateName) => list.some((e) => e.propName === propName || e.templateName === templateName), addSignalInputsOutputs = (component, base) => {
  let result = {
    inputs: [...base.inputs],
    outputs: [...base.outputs]
  }, def;
  try {
    def = getComponentDef(component);
  } catch {
    return result;
  }
  if (!def)
    return result;
  for (let templateName of Object.keys(def.inputs ?? {})) {
    let rawPropName = def.inputs[templateName], propName = Array.isArray(rawPropName) ? rawPropName[0] ?? templateName : rawPropName ?? templateName;
    hasEntry(result.inputs, propName, templateName) || result.inputs.push({ propName, templateName });
  }
  for (let templateName of Object.keys(def.outputs ?? {})) {
    let propName = def.outputs[templateName] ?? templateName;
    hasEntry(result.outputs, propName, templateName) || result.outputs.push({ propName, templateName });
  }
  return result;
};
var isComponent = (component) => component ? (reflectionCapabilities.annotations(component) || []).some((d) => d instanceof Component) : !1;
var getComponentPropsDecoratorMetadata = (component) => reflectionCapabilities.propMetadata(component), getComponentDecoratorMetadata = (component) => reflectionCapabilities.annotations(component).reverse().find((d) => d instanceof Component);

// src/client/angular-beta/ComputesTemplateFromComponent.ts
var isValidIdentifier = (name) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name), formatPropInTemplate = (propertyName) => isValidIdentifier(propertyName) ? propertyName : `this['${propertyName}']`, separateInputsOutputsAttributes = (ngComponentInputsOutputs, props = {}) => {
  let inputs = ngComponentInputsOutputs.inputs.filter((i) => i.templateName in props).map((i) => i.templateName), outputs = ngComponentInputsOutputs.outputs.filter((o) => o.templateName in props).map((o) => o.templateName);
  return {
    inputs,
    outputs,
    otherProps: Object.keys(props).filter((k) => ![...inputs, ...outputs].includes(k))
  };
}, computesTemplateFromComponent = (component, initialProps, innerTemplate = "") => {
  let ngComponentMetadata = getComponentDecoratorMetadata(component), ngComponentInputsOutputs = getComponentInputsOutputs(component);
  if (!ngComponentMetadata.selector)
    return '<ng-container *ngComponentOutlet="storyComponent"></ng-container>';
  let { inputs: initialInputs, outputs: initialOutputs } = separateInputsOutputsAttributes(
    ngComponentInputsOutputs,
    initialProps
  ), templateInputs = initialInputs.length > 0 ? ` ${initialInputs.map((i) => `[${i}]="${formatPropInTemplate(i)}"`).join(" ")}` : "", templateOutputs = initialOutputs.length > 0 ? ` ${initialOutputs.map((i) => `(${i})="${formatPropInTemplate(i)}($event)"`).join(" ")}` : "";
  return buildTemplate(
    ngComponentMetadata.selector,
    innerTemplate,
    templateInputs,
    templateOutputs
  );
};
function stringifyCircular(obj) {
  let seen = /* @__PURE__ */ new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value == "object" && value !== null) {
      if (seen.has(value))
        return "[Circular]";
      seen.add(value);
    }
    return value;
  });
}
var createAngularInputProperty = ({
  propertyName,
  value,
  argType
}) => {
  let templateValue;
  switch (typeof value) {
    case "string":
      templateValue = `'${value}'`;
      break;
    case "object":
      templateValue = stringifyCircular(value).replace(/'/g, "\u2019").replace(/\\"/g, "\u201D").replace(/"([^-"]+)":/g, "$1: ").replace(/"/g, "'").replace(/\u2019/g, "\\'").replace(/\u201D/g, "\\'").split(",").join(", ");
      break;
    default:
      templateValue = value;
  }
  return `[${propertyName}]="${templateValue}"`;
}, computesTemplateSourceFromComponent = (component, initialProps, argTypes) => {
  let ngComponentMetadata = getComponentDecoratorMetadata(component);
  if (!ngComponentMetadata)
    return null;
  if (!ngComponentMetadata.selector)
    return `<ng-container *ngComponentOutlet="${component.name}"></ng-container>`;
  let ngComponentInputsOutputs = getComponentInputsOutputs(component), { inputs: initialInputs, outputs: initialOutputs } = separateInputsOutputsAttributes(
    ngComponentInputsOutputs,
    initialProps
  ), templateInputs = initialInputs.length > 0 ? ` ${initialInputs.map(
    (propertyName) => createAngularInputProperty({
      propertyName,
      value: initialProps[propertyName],
      argType: argTypes?.[propertyName]
    })
  ).join(" ")}` : "", templateOutputs = initialOutputs.length > 0 ? ` ${initialOutputs.map((i) => `(${i})="${formatPropInTemplate(i)}($event)"`).join(" ")}` : "";
  return buildTemplate(ngComponentMetadata.selector, "", templateInputs, templateOutputs);
}, buildTemplate = (selector, innerTemplate, inputs, outputs) => {
  let voidElements = [
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ], firstSelector = selector.split(",")[0];
  return [
    [/(^.*?)(?=[,])/, "$1"],
    [/(^\..+)/, "div$1"],
    [/(^\[.+?])/, "div$1"],
    [/([\w[\]]+)(\s*,[\w\s-[\],]+)+/, "$1"],
    [/#([\w-]+)/, ' id="$1"'],
    [/((\.[\w-]+)+)/, (_, c) => ` class="${c.split`.`.join` `.trim()}"`],
    [/(\[.+?])/g, (_, a) => ` ${a.slice(1, -1)}`],
    [
      /([\S]+)(.*)/,
      (template, elementSelector) => voidElements.some((element) => elementSelector === element) ? template.replace(/([\S]+)(.*)/, `<$1$2${inputs}${outputs} />`) : template.replace(/([\S]+)(.*)/, `<$1$2${inputs}${outputs}>${innerTemplate}</$1>`)
    ]
  ].reduce(
    (prevSelector, [searchValue, replacer]) => prevSelector.replace(searchValue, replacer),
    firstSelector
  );
};

// src/client/angular-beta/StorybookWrapperComponent.ts
import {
  ChangeDetectorRef,
  Component as Component3,
  Inject,
  NgModule as NgModule2,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { map, skip } from "rxjs/operators";

// src/client/angular-beta/StorybookProvider.ts
import { InjectionToken, NgZone } from "@angular/core";
import { Observable } from "rxjs";
var STORY_PROPS = new InjectionToken("STORY_PROPS"), storyPropsProvider = (storyProps$) => ({
  provide: STORY_PROPS,
  useFactory: storyDataFactory(storyProps$.asObservable()),
  deps: [NgZone]
});
function storyDataFactory(data) {
  return (ngZone) => new Observable((subscriber) => {
    let sub = data.subscribe(
      (v) => {
        ngZone.run(() => subscriber.next(v));
      },
      (err) => {
        ngZone.run(() => subscriber.error(err));
      },
      () => {
        ngZone.run(() => subscriber.complete());
      }
    );
    return () => {
      sub.unsubscribe();
    };
  });
}

// src/client/angular-beta/utils/PropertyExtractor.ts
import { CommonModule } from "@angular/common";
import {
  Component as Component2,
  Directive as Directive2,
  Injectable,
  InjectionToken as InjectionToken2,
  Input as Input2,
  Output as Output2,
  Pipe as Pipe2,
  \u0275ReflectionCapabilities as ReflectionCapabilities3,
  VERSION
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { dedent } from "ts-dedent";

// src/client/angular-beta/utils/NgModulesAnalyzer.ts
import { NgModule, \u0275ReflectionCapabilities as ReflectionCapabilities2 } from "@angular/core";
var reflectionCapabilities2 = new ReflectionCapabilities2(), isComponentAlreadyDeclared = (componentToFind, moduleDeclarations, moduleImports) => moduleDeclarations && moduleDeclarations.flat().some((declaration) => declaration === componentToFind) ? !0 : moduleImports ? moduleImports.flat().some((importItem) => {
  let extractedNgModuleMetadata = extractNgModuleMetadata(importItem);
  return extractedNgModuleMetadata ? isComponentAlreadyDeclared(
    componentToFind,
    extractedNgModuleMetadata.declarations,
    extractedNgModuleMetadata.imports
  ) : !1;
}) : !1, extractNgModuleMetadata = (importItem) => {
  let target = importItem && importItem.ngModule ? importItem.ngModule : importItem, decorators = reflectionCapabilities2.annotations(target);
  if (!decorators || decorators.length === 0)
    return null;
  let ngModuleDecorator = decorators.find(
    (decorator) => decorator instanceof NgModule
  );
  return ngModuleDecorator || null;
};

// src/client/angular-beta/utils/PropertyExtractor.ts
var reflectionCapabilities3 = new ReflectionCapabilities3(), REMOVED_MODULES = new InjectionToken2("REMOVED_MODULES"), uniqueArray = (arr) => arr.flat(Number.MAX_VALUE).filter(Boolean).filter((value, index, self) => self.indexOf(value) === index), _PropertyExtractor = class _PropertyExtractor {
  constructor(metadata, component) {
    this.metadata = metadata;
    this.component = component;
    this.declarations = [];
    /**
     * Analyze NgModule Metadata
     *
     * - Removes Restricted Imports
     * - Extracts providers from ModuleWithProviders
     * - Returns a new NgModuleMetadata object
     */
    this.analyzeMetadata = async (metadata) => {
      let declarations = [...metadata?.declarations || []], providers = [...metadata?.providers || []], applicationProviders = [], imports = await Promise.all(
        [...metadata?.imports || []].map(async (imported) => {
          let [isRestricted, restrictedProviders] = await _PropertyExtractor.analyzeRestricted(imported);
          return isRestricted ? (applicationProviders.unshift(restrictedProviders || []), null) : imported;
        })
      ).then((results) => results.filter(Boolean));
      return { ...metadata, imports, providers, applicationProviders, declarations };
    };
  }
  // With the new way of mounting standalone components to the DOM via bootstrapApplication API,
  // we should now pass ModuleWithProviders to the providers array of the bootstrapApplication function.
  static warnImportsModuleWithProviders(propertyExtractor) {
    propertyExtractor.imports.some(
      (importedModule) => "ngModule" in importedModule
    ) && console.warn(
      dedent(
        `
          Storybook Warning: 
          moduleMetadata property 'imports' contains one or more ModuleWithProviders, likely the result of a 'Module.forRoot()'-style call.
          In Storybook 7.0 we use Angular's new 'bootstrapApplication' API to mount the component to the DOM, which accepts a list of providers to set up application-wide providers.
          Use the 'applicationConfig' decorator from '@storybook/angular' to pass your ModuleWithProviders to the 'providers' property in combination with the importProvidersFrom helper function from '@angular/core' to extract all the necessary providers.
          Visit https://angular.io/guide/standalone-components#configuring-dependency-injection for more information
          `
      )
    );
  }
  async init() {
    let analyzed = await this.analyzeMetadata(this.metadata);
    if (this.imports = uniqueArray([CommonModule, analyzed.imports]), this.providers = uniqueArray(analyzed.providers), this.applicationProviders = uniqueArray(analyzed.applicationProviders), this.declarations = uniqueArray(analyzed.declarations), this.component) {
      let { isDeclarable, isStandalone } = _PropertyExtractor.analyzeDecorators(this.component), isDeclared = isComponentAlreadyDeclared(
        this.component,
        analyzed.declarations,
        this.imports
      );
      isStandalone ? this.imports.push(this.component) : isDeclarable && !isDeclared && this.declarations.push(this.component);
    }
  }
};
_PropertyExtractor.analyzeRestricted = async (ngModule) => {
  if (ngModule === BrowserModule)
    return console.warn(
      dedent`
          Storybook Warning:
          You have imported the "BrowserModule", which is not necessary anymore. 
          In Storybook v7.0 we are using Angular's new bootstrapApplication API to mount an Angular application to the DOM.
          Note that the BrowserModule providers are automatically included when starting an application with bootstrapApplication()
          Please remove the "BrowserModule" from the list of imports in your moduleMetadata definition to remove this warning.
        `
    ), [!0];
  try {
    let animations = await import("@angular/platform-browser/animations");
    if (ngModule === animations.BrowserAnimationsModule)
      return console.warn(
        dedent`
            Storybook Warning:
            You have added the "BrowserAnimationsModule" to the list of "imports" in your moduleMetadata definition of your Story.
            In Storybook 7.0 we use Angular's new 'bootstrapApplication' API to mount the component to the DOM, which accepts a list of providers to set up application-wide providers.
            Use the 'applicationConfig' decorator from '@storybook/angular' and add the "provideAnimations" function to the list of "providers".
            If your Angular version does not support "provide-like" functions, use the helper function importProvidersFrom instead to set up animations. For this case, please add "importProvidersFrom(BrowserAnimationsModule)" to the list of providers of your applicationConfig definition.
            Please visit https://angular.io/guide/standalone-components#configuring-dependency-injection for more information.
          `
      ), [!0, animations.provideAnimations()];
    if (ngModule === animations.NoopAnimationsModule)
      return console.warn(
        dedent`
            Storybook Warning:
            You have added the "NoopAnimationsModule" to the list of "imports" in your moduleMetadata definition of your Story.
            In Storybook v7.0 we are using Angular's new bootstrapApplication API to mount an Angular application to the DOM, which accepts a list of providers to set up application-wide providers.
            Use the 'applicationConfig' decorator from '@storybook/angular' and add the "provideNoopAnimations" function to the list of "providers".
            If your Angular version does not support "provide-like" functions, use the helper function importProvidersFrom instead to set up noop animations and to extract all necessary providers from NoopAnimationsModule. For this case, please add "importProvidersFrom(NoopAnimationsModule)" to the list of providers of your applicationConfig definition.
            Please visit https://angular.io/guide/standalone-components#configuring-dependency-injection for more information.
          `
      ), [!0, animations.provideNoopAnimations()];
  } catch {
    return [!1];
  }
  return [!1];
}, _PropertyExtractor.analyzeDecorators = (component) => {
  let decorators = reflectionCapabilities3.annotations(component), isComponent2 = decorators.some((d) => _PropertyExtractor.isDecoratorInstanceOf(d, "Component")), isDirective = decorators.some((d) => _PropertyExtractor.isDecoratorInstanceOf(d, "Directive")), isPipe = decorators.some((d) => _PropertyExtractor.isDecoratorInstanceOf(d, "Pipe")), isDeclarable = isComponent2 || isDirective || isPipe, isStandalone = (isComponent2 || isDirective) && [...decorators].reverse().find(
    (d) => _PropertyExtractor.isDecoratorInstanceOf(d, "Component") || _PropertyExtractor.isDecoratorInstanceOf(d, "Directive")
  )?.standalone;
  return isStandalone === void 0 && (isStandalone = !!(VERSION.major && Number(VERSION.major) >= 19)), { isDeclarable, isStandalone };
}, _PropertyExtractor.isDecoratorInstanceOf = (decorator, name) => {
  let factory;
  switch (name) {
    case "Component":
      factory = Component2;
      break;
    case "Directive":
      factory = Directive2;
      break;
    case "Pipe":
      factory = Pipe2;
      break;
    case "Injectable":
      factory = Injectable;
      break;
    case "Input":
      factory = Input2;
      break;
    case "Output":
      factory = Output2;
      break;
    default:
      throw new Error(`Unknown decorator type: ${name}`);
  }
  return decorator instanceof factory || decorator.ngMetadataName === name;
};
var PropertyExtractor = _PropertyExtractor;

// src/client/angular-beta/StorybookWrapperComponent.ts
var getNonInputsOutputsProps = (ngComponentInputsOutputs, props = {}) => {
  let inputs = ngComponentInputsOutputs.inputs.filter((i) => i.templateName in props).map((i) => i.templateName), outputs = ngComponentInputsOutputs.outputs.filter((o) => o.templateName in props).map((o) => o.templateName);
  return Object.keys(props).filter((k) => ![...inputs, ...outputs].includes(k));
}, createStorybookWrapperComponent = ({
  selector,
  template,
  storyComponent,
  styles,
  moduleMetadata,
  initialProps,
  analyzedMetadata
}) => {
  let viewChildSelector = storyComponent ?? "__storybook-noop", { imports, declarations, providers } = analyzedMetadata, StorybookComponentModule = class {
  };
  StorybookComponentModule = __decorateClass([
    NgModule2({
      declarations,
      imports,
      exports: [...declarations, ...imports]
    })
  ], StorybookComponentModule), PropertyExtractor.warnImportsModuleWithProviders(analyzedMetadata);
  let StorybookWrapperComponent = class {
    constructor(storyProps$, changeDetectorRef) {
      this.storyProps$ = storyProps$;
      this.changeDetectorRef = changeDetectorRef;
      // Used in case of a component without selector
      this.storyComponent = storyComponent ?? "";
    }
    ngOnInit() {
      this.storyWrapperPropsSubscription = this.storyProps$.subscribe((storyProps = {}) => {
        Object.assign(this, storyProps), this.changeDetectorRef.detectChanges(), this.changeDetectorRef.markForCheck();
      });
    }
    ngAfterViewInit() {
      if (this.storyComponentElementRef) {
        let ngComponentInputsOutputs = getComponentInputsOutputs(storyComponent);
        getNonInputsOutputsProps(ngComponentInputsOutputs, initialProps).forEach((p) => {
          this.storyComponentElementRef[p] = initialProps[p];
        }), this.storyComponentViewContainerRef.injector.get(ChangeDetectorRef).markForCheck(), this.changeDetectorRef.detectChanges(), this.storyComponentPropsSubscription = this.storyProps$.pipe(
          skip(1),
          map((props) => getNonInputsOutputsProps(ngComponentInputsOutputs, props).reduce((acc, p) => ({ ...acc, [p]: props[p] }), {}))
        ).subscribe((props) => {
          Object.assign(this.storyComponentElementRef, props), this.storyComponentViewContainerRef.injector.get(ChangeDetectorRef).markForCheck(), this.changeDetectorRef.detectChanges();
        });
      }
    }
    ngOnDestroy() {
      this.storyComponentPropsSubscription != null && this.storyComponentPropsSubscription.unsubscribe(), this.storyWrapperPropsSubscription != null && this.storyWrapperPropsSubscription.unsubscribe();
    }
  };
  return __decorateClass([
    ViewChild(viewChildSelector, { static: !0 })
  ], StorybookWrapperComponent.prototype, "storyComponentElementRef", 2), __decorateClass([
    ViewChild(viewChildSelector, { read: ViewContainerRef, static: !0 })
  ], StorybookWrapperComponent.prototype, "storyComponentViewContainerRef", 2), StorybookWrapperComponent = __decorateClass([
    Component3({
      selector,
      template,
      standalone: !0,
      imports: [StorybookComponentModule],
      providers,
      styles,
      schemas: moduleMetadata.schemas
    }),
    __decorateParam(0, Inject(STORY_PROPS)),
    __decorateParam(1, Inject(ChangeDetectorRef))
  ], StorybookWrapperComponent), StorybookWrapperComponent;
};

// src/client/angular-beta/StorybookModule.ts
var getApplication = ({
  storyFnAngular,
  component,
  targetSelector,
  analyzedMetadata
}) => {
  let { props, styles, moduleMetadata = {} } = storyFnAngular, { template } = storyFnAngular;
  return hasNoTemplate(template) && component && (template = computesTemplateFromComponent(component, props, "")), createStorybookWrapperComponent({
    moduleMetadata,
    selector: targetSelector,
    template,
    storyComponent: component,
    styles,
    initialProps: props,
    analyzedMetadata
  });
};
function hasNoTemplate(template) {
  return template == null;
}

// src/client/angular-beta/utils/BootstrapQueue.ts
var queue = [], isProcessing = !1, resetCompiledComponents = async () => {
  try {
    let { \u0275resetCompiledComponents } = await import("@angular/core");
    \u0275resetCompiledComponents();
  } catch {
  }
}, queueBootstrapping = (fn) => new Promise((resolve, reject) => {
  queue.push(() => fn().then(resolve).catch(reject)), isProcessing || processQueue();
}), processQueue = async () => {
  for (isProcessing = !0; queue.length > 0; ) {
    let bootstrappingFn = queue.shift();
    bootstrappingFn && (await bootstrappingFn(), await resetCompiledComponents());
  }
  isProcessing = !1;
};

// src/client/angular-beta/utils/Zoneless.ts
var getProvideZonelessChangeDetectionFn = async () => {
  let angularCore = await import("@angular/core");
  return "provideExperimentalZonelessChangeDetection" in angularCore ? angularCore.provideExperimentalZonelessChangeDetection : "provideZonelessChangeDetection" in angularCore ? angularCore.provideZonelessChangeDetection : null;
};

// src/client/angular-beta/AbstractRenderer.ts
var applicationRefs = /* @__PURE__ */ new Map(), STORY_UID_ATTRIBUTE = "data-sb-story-uid", AbstractRenderer = class {
  constructor() {
    this.previousStoryRenderInfo = /* @__PURE__ */ new Map();
  }
  /** Wait and destroy the platform */
  static resetApplications(domNode) {
    applicationRefs.forEach((appRef, appDOMNode) => {
      !appRef.destroyed && (!domNode || appDOMNode === domNode) && appRef.destroy();
    });
  }
  /**
   * Bootstrap main angular module with main component or send only new `props` with storyProps$
   *
   * @param storyFnAngular {StoryFnAngularReturnType}
   * @param forced {boolean} If :
   *
   *   - True render will only use the StoryFn `props' in storyProps observable that will update sotry's
   *       component/template properties. Improves performance without reloading the whole
   *       module&component if props changes
   *   - False fully recharges or initializes angular module & component
   *
   * @param component {Component}
   */
  async render({
    storyId,
    storyFnAngular,
    forced,
    component,
    targetDOMNode
  }) {
    let targetSelector = this.generateTargetSelectorFromStoryId(storyId), newStoryProps$ = new BehaviorSubject(storyFnAngular.props);
    if (!this.fullRendererRequired({
      targetDOMNode,
      storyFnAngular,
      moduleMetadata: {
        ...storyFnAngular.moduleMetadata
      },
      forced
    })) {
      this.storyProps$.next(storyFnAngular.props);
      return;
    }
    await this.beforeFullRender(targetDOMNode), this.storyProps$ && this.storyProps$.complete(), this.storyProps$ = newStoryProps$, this.initAngularRootElement(targetDOMNode, targetSelector, storyId);
    let analyzedMetadata = new PropertyExtractor(storyFnAngular.moduleMetadata, component);
    await analyzedMetadata.init();
    let storyUid = this.generateStoryUIdFromRawStoryUid(
      targetDOMNode.getAttribute(STORY_UID_ATTRIBUTE)
    ), componentSelector = storyUid !== null ? `${targetSelector}[${storyUid}]` : targetSelector;
    storyUid !== null && targetDOMNode.querySelector(targetSelector).toggleAttribute(storyUid, !0);
    let application = getApplication({
      storyFnAngular,
      component,
      targetSelector: componentSelector,
      analyzedMetadata
    }), providers = [
      storyPropsProvider(newStoryProps$),
      ...analyzedMetadata.applicationProviders,
      ...storyFnAngular.applicationConfig?.providers ?? []
    ];
    if (STORYBOOK_ANGULAR_OPTIONS?.experimentalZoneless) {
      let provideZonelessChangeDetectionFn = await getProvideZonelessChangeDetectionFn();
      if (provideZonelessChangeDetectionFn)
        providers.unshift(provideZonelessChangeDetectionFn());
      else
        throw new Error("Zoneless change detection requires Angular 18 or higher");
    }
    let applicationRef = await queueBootstrapping(() => bootstrapApplication(application, {
      ...storyFnAngular.applicationConfig,
      providers
    }));
    applicationRefs.set(targetDOMNode, applicationRef);
  }
  /**
   * Only ASCII alphanumerics can be used as HTML tag name. https://html.spec.whatwg.org/#elements-2
   *
   * Therefore, stories break when non-ASCII alphanumerics are included in target selector.
   * https://github.com/storybookjs/storybook/issues/15147
   *
   * This method returns storyId when it doesn't contain any non-ASCII alphanumerics. Otherwise, it
   * generates a valid HTML tag name from storyId by removing non-ASCII alphanumerics from storyId,
   * prefixing "sb-", and suffixing "-component"
   *
   * @memberof AbstractRenderer
   * @protected
   */
  generateTargetSelectorFromStoryId(id) {
    let invalidHtmlTag = /[^A-Za-z0-9-]/g;
    return invalidHtmlTag.test(id) ? `sb-${id.replace(invalidHtmlTag, "")}-component` : id;
  }
  /**
   * Angular is unable to handle components that have selectors with accented attributes.
   *
   * Therefore, stories break when meta's title contains accents.
   * https://github.com/storybookjs/storybook/issues/29132
   *
   * This method filters accents from a given raw id. For example, this method converts
   * 'Example/Button with an "é" accent' into 'Example/Button with an "e" accent'.
   *
   * @memberof AbstractRenderer
   * @protected
   */
  generateStoryUIdFromRawStoryUid(rawStoryUid) {
    if (rawStoryUid === null)
      return rawStoryUid;
    let accentCharacters = /[\u0300-\u036f]/g;
    return rawStoryUid.normalize("NFD").replace(accentCharacters, "");
  }
  /** Adds DOM element that angular will use as bootstrap component. */
  initAngularRootElement(targetDOMNode, targetSelector, _storyId) {
    targetDOMNode.innerHTML = "", targetDOMNode.appendChild(document.createElement(targetSelector));
  }
  fullRendererRequired({
    targetDOMNode,
    storyFnAngular,
    moduleMetadata,
    forced
  }) {
    let previousStoryRenderInfo = this.previousStoryRenderInfo.get(targetDOMNode), currentStoryRender = {
      storyFnAngular,
      moduleMetadataSnapshot: stringify(moduleMetadata, { maxDepth: 50 })
    };
    return this.previousStoryRenderInfo.set(targetDOMNode, currentStoryRender), // check `forceRender` of story RenderContext
    !forced || // if it's the first rendering and storyProps$ is not init
    !this.storyProps$ || !!storyFnAngular?.template && previousStoryRenderInfo?.storyFnAngular?.template !== storyFnAngular.template ? !0 : currentStoryRender.moduleMetadataSnapshot !== previousStoryRenderInfo?.moduleMetadataSnapshot;
  }
};

// src/client/angular-beta/CanvasRenderer.ts
var CanvasRenderer = class _CanvasRenderer extends AbstractRenderer {
  async render(options) {
    await super.render(options);
  }
  async beforeFullRender() {
    _CanvasRenderer.resetApplications();
  }
};

// src/client/angular-beta/DocsRenderer.ts
import { DOCS_RENDERED, STORY_CHANGED } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";

// src/client/angular-beta/utils/StoryUID.ts
var storyCounts = /* @__PURE__ */ new Map(), getNextStoryUID = (storyId) => {
  storyCounts.has(storyId) || storyCounts.set(storyId, -1);
  let count = storyCounts.get(storyId) + 1;
  return storyCounts.set(storyId, count), `${storyId}-${count}`;
};

// src/client/angular-beta/DocsRenderer.ts
var DocsRenderer = class _DocsRenderer extends AbstractRenderer {
  async render(options) {
    let channel = addons.getChannel();
    channel.once(STORY_CHANGED, async () => {
      await _DocsRenderer.resetApplications();
    }), channel.once(DOCS_RENDERED, async () => {
      await _DocsRenderer.resetApplications();
    }), await super.render({ ...options, forced: !1 });
  }
  async beforeFullRender(domNode) {
    _DocsRenderer.resetApplications(domNode);
  }
  initAngularRootElement(targetDOMNode, targetSelector, storyId) {
    super.initAngularRootElement(targetDOMNode, targetSelector, storyId), targetDOMNode.setAttribute(STORY_UID_ATTRIBUTE, getNextStoryUID(storyId));
  }
};

// src/client/angular-beta/RendererFactory.ts
var RendererFactory = class {
  constructor() {
    this.rendererMap = /* @__PURE__ */ new Map();
  }
  async getRendererInstance(targetDOMNode) {
    let targetId = targetDOMNode.id;
    if (targetDOMNode === null)
      return null;
    let renderType = getRenderType(targetDOMNode);
    return this.lastRenderType && this.lastRenderType !== renderType && (await AbstractRenderer.resetApplications(), clearRootHTMLElement(renderType), this.rendererMap.clear()), this.rendererMap.has(targetId) || this.rendererMap.set(targetId, this.buildRenderer(renderType)), this.lastRenderType = renderType, this.rendererMap.get(targetId);
  }
  buildRenderer(renderType) {
    return renderType === "docs" ? new DocsRenderer() : new CanvasRenderer();
  }
}, getRenderType = (targetDOMNode) => targetDOMNode.id === "storybook-root" ? "canvas" : "docs";
function clearRootHTMLElement(renderType) {
  switch (renderType) {
    case "canvas":
      global.document.getElementById("storybook-docs").innerHTML = "";
      break;
    case "docs":
      global.document.getElementById("storybook-root").innerHTML = "";
      break;
    default:
      break;
  }
}

// src/client/render.ts
var rendererFactory = new RendererFactory(), render = (props) => ({ props });
async function renderToCanvas({
  storyFn,
  showMain,
  forceRemount,
  storyContext: { component, id: storyId }
}, element) {
  showMain(), await (await rendererFactory.getRendererInstance(element)).render({
    storyId,
    storyFnAngular: storyFn(),
    component,
    forced: !forceRemount,
    targetDOMNode: element
  });
}

export {
  __export,
  isComponent,
  formatPropInTemplate,
  computesTemplateFromComponent,
  computesTemplateSourceFromComponent,
  render,
  renderToCanvas,
  render_exports
};
