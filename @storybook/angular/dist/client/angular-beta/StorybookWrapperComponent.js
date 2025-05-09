"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStorybookWrapperComponent = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const StorybookProvider_1 = require("./StorybookProvider");
const NgComponentAnalyzer_1 = require("./utils/NgComponentAnalyzer");
const PropertyExtractor_1 = require("./utils/PropertyExtractor");
const getNonInputsOutputsProps = (ngComponentInputsOutputs, props = {}) => {
    const inputs = ngComponentInputsOutputs.inputs
        .filter((i) => i.templateName in props)
        .map((i) => i.templateName);
    const outputs = ngComponentInputsOutputs.outputs
        .filter((o) => o.templateName in props)
        .map((o) => o.templateName);
    return Object.keys(props).filter((k) => ![...inputs, ...outputs].includes(k));
};
/** Wraps the story template into a component */
const createStorybookWrapperComponent = ({ selector, template, storyComponent, styles, moduleMetadata, initialProps, analyzedMetadata, }) => {
    // In ivy, a '' selector is not allowed, therefore we need to just set it to anything if
    // storyComponent was not provided.
    const viewChildSelector = storyComponent ?? '__storybook-noop';
    const { imports, declarations, providers } = analyzedMetadata;
    let StorybookComponentModule = class StorybookComponentModule {
    };
    StorybookComponentModule = __decorate([
        (0, core_1.NgModule)({
            declarations,
            imports,
            exports: [...declarations, ...imports],
        })
    ], StorybookComponentModule);
    PropertyExtractor_1.PropertyExtractor.warnImportsModuleWithProviders(analyzedMetadata);
    let StorybookWrapperComponent = class StorybookWrapperComponent {
        constructor(storyProps$, changeDetectorRef) {
            this.storyProps$ = storyProps$;
            this.changeDetectorRef = changeDetectorRef;
            // Used in case of a component without selector
            this.storyComponent = storyComponent ?? '';
        }
        ngOnInit() {
            // Subscribes to the observable storyProps$ to keep these properties up to date
            this.storyWrapperPropsSubscription = this.storyProps$.subscribe((storyProps = {}) => {
                // All props are added as component properties
                Object.assign(this, storyProps);
                this.changeDetectorRef.detectChanges();
                this.changeDetectorRef.markForCheck();
            });
        }
        ngAfterViewInit() {
            // Bind properties to component, if the story have component
            if (this.storyComponentElementRef) {
                const ngComponentInputsOutputs = (0, NgComponentAnalyzer_1.getComponentInputsOutputs)(storyComponent);
                const initialOtherProps = getNonInputsOutputsProps(ngComponentInputsOutputs, initialProps);
                // Initializes properties that are not Inputs | Outputs
                // Allows story props to override local component properties
                initialOtherProps.forEach((p) => {
                    this.storyComponentElementRef[p] = initialProps[p];
                });
                // `markForCheck` the component in case this uses changeDetection: OnPush
                // And then forces the `detectChanges`
                this.storyComponentViewContainerRef.injector.get(core_1.ChangeDetectorRef).markForCheck();
                this.changeDetectorRef.detectChanges();
                // Once target component has been initialized, the storyProps$ observable keeps target component properties than are not Input|Output up to date
                this.storyComponentPropsSubscription = this.storyProps$
                    .pipe((0, operators_1.skip)(1), (0, operators_1.map)((props) => {
                    const propsKeyToKeep = getNonInputsOutputsProps(ngComponentInputsOutputs, props);
                    return propsKeyToKeep.reduce((acc, p) => ({ ...acc, [p]: props[p] }), {});
                }))
                    .subscribe((props) => {
                    // Replace inputs with new ones from props
                    Object.assign(this.storyComponentElementRef, props);
                    // `markForCheck` the component in case this uses changeDetection: OnPush
                    // And then forces the `detectChanges`
                    this.storyComponentViewContainerRef.injector.get(core_1.ChangeDetectorRef).markForCheck();
                    this.changeDetectorRef.detectChanges();
                });
            }
        }
        ngOnDestroy() {
            if (this.storyComponentPropsSubscription != null) {
                this.storyComponentPropsSubscription.unsubscribe();
            }
            if (this.storyWrapperPropsSubscription != null) {
                this.storyWrapperPropsSubscription.unsubscribe();
            }
        }
    };
    __decorate([
        (0, core_1.ViewChild)(viewChildSelector, { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], StorybookWrapperComponent.prototype, "storyComponentElementRef", void 0);
    __decorate([
        (0, core_1.ViewChild)(viewChildSelector, { read: core_1.ViewContainerRef, static: true }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], StorybookWrapperComponent.prototype, "storyComponentViewContainerRef", void 0);
    StorybookWrapperComponent = __decorate([
        (0, core_1.Component)({
            selector,
            template,
            standalone: true,
            imports: [StorybookComponentModule],
            providers,
            styles,
            schemas: moduleMetadata.schemas,
        }),
        __param(0, (0, core_1.Inject)(StorybookProvider_1.STORY_PROPS)),
        __param(1, (0, core_1.Inject)(core_1.ChangeDetectorRef)),
        __metadata("design:paramtypes", [rxjs_1.Subject,
            core_1.ChangeDetectorRef])
    ], StorybookWrapperComponent);
    return StorybookWrapperComponent;
};
exports.createStorybookWrapperComponent = createStorybookWrapperComponent;
