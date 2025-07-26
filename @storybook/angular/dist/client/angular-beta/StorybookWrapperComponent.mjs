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
import { ChangeDetectorRef, Component, ElementRef, Inject, NgModule, ViewChild, ViewContainerRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { STORY_PROPS } from './StorybookProvider';
import { getComponentInputsOutputs } from './utils/NgComponentAnalyzer';
import { PropertyExtractor } from './utils/PropertyExtractor';
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
export const createStorybookWrapperComponent = ({ selector, template, storyComponent, styles, moduleMetadata, initialProps, analyzedMetadata, }) => {
    // In ivy, a '' selector is not allowed, therefore we need to just set it to anything if
    // storyComponent was not provided.
    const viewChildSelector = storyComponent ?? '__storybook-noop';
    const { imports, declarations, providers } = analyzedMetadata;
    let StorybookComponentModule = class StorybookComponentModule {
    };
    StorybookComponentModule = __decorate([
        NgModule({
            declarations,
            imports,
            exports: [...declarations, ...imports],
        })
    ], StorybookComponentModule);
    PropertyExtractor.warnImportsModuleWithProviders(analyzedMetadata);
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
                const ngComponentInputsOutputs = getComponentInputsOutputs(storyComponent);
                const initialOtherProps = getNonInputsOutputsProps(ngComponentInputsOutputs, initialProps);
                // Initializes properties that are not Inputs | Outputs
                // Allows story props to override local component properties
                initialOtherProps.forEach((p) => {
                    this.storyComponentElementRef[p] = initialProps[p];
                });
                // `markForCheck` the component in case this uses changeDetection: OnPush
                // And then forces the `detectChanges`
                this.storyComponentViewContainerRef.injector.get(ChangeDetectorRef).markForCheck();
                this.changeDetectorRef.detectChanges();
                // Once target component has been initialized, the storyProps$ observable keeps target component properties than are not Input|Output up to date
                this.storyComponentPropsSubscription = this.storyProps$
                    .pipe(skip(1), map((props) => {
                    const propsKeyToKeep = getNonInputsOutputsProps(ngComponentInputsOutputs, props);
                    return propsKeyToKeep.reduce((acc, p) => ({ ...acc, [p]: props[p] }), {});
                }))
                    .subscribe((props) => {
                    // Replace inputs with new ones from props
                    Object.assign(this.storyComponentElementRef, props);
                    // `markForCheck` the component in case this uses changeDetection: OnPush
                    // And then forces the `detectChanges`
                    this.storyComponentViewContainerRef.injector.get(ChangeDetectorRef).markForCheck();
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
        ViewChild(viewChildSelector, { static: true }),
        __metadata("design:type", ElementRef)
    ], StorybookWrapperComponent.prototype, "storyComponentElementRef", void 0);
    __decorate([
        ViewChild(viewChildSelector, { read: ViewContainerRef, static: true }),
        __metadata("design:type", ViewContainerRef)
    ], StorybookWrapperComponent.prototype, "storyComponentViewContainerRef", void 0);
    StorybookWrapperComponent = __decorate([
        Component({
            selector,
            template,
            standalone: true,
            imports: [StorybookComponentModule],
            providers,
            styles,
            schemas: moduleMetadata.schemas,
        }),
        __param(0, Inject(STORY_PROPS)),
        __param(1, Inject(ChangeDetectorRef)),
        __metadata("design:paramtypes", [Subject,
            ChangeDetectorRef])
    ], StorybookWrapperComponent);
    return StorybookWrapperComponent;
};
