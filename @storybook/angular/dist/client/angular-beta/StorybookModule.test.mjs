// @vitest-environment happy-dom
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { getApplication } from './StorybookModule';
import { storyPropsProvider } from './StorybookProvider';
import { PropertyExtractor } from './utils/PropertyExtractor';
describe('StorybookModule', () => {
    describe('getStorybookModuleMetadata', () => {
        describe('with simple component', () => {
            let FooComponent = class FooComponent {
                constructor() {
                    this.output = new EventEmitter();
                    this.localOutput = new EventEmitter();
                    this.localFunction = () => '';
                    this.setterCallNb = 0;
                }
                set setter(value) {
                    this.setterCallNb += 1;
                }
            };
            __decorate([
                Input(),
                __metadata("design:type", String)
            ], FooComponent.prototype, "input", void 0);
            __decorate([
                Input('inputBindingPropertyName'),
                __metadata("design:type", String)
            ], FooComponent.prototype, "localPropertyName", void 0);
            __decorate([
                Input(),
                __metadata("design:type", String),
                __metadata("design:paramtypes", [String])
            ], FooComponent.prototype, "setter", null);
            __decorate([
                Output(),
                __metadata("design:type", Object)
            ], FooComponent.prototype, "output", void 0);
            __decorate([
                Output('outputBindingPropertyName'),
                __metadata("design:type", Object)
            ], FooComponent.prototype, "localOutput", void 0);
            FooComponent = __decorate([
                Component({
                    selector: 'foo',
                    template: `
          <p id="input">{{ input }}</p>
<p id="inputBindingPropertyName">{{ localPropertyName }}</p>
<p id="setterCallNb">{{ setterCallNb }}</p>
<p id="localProperty">{{ localProperty }}</p>
<p id="localFunction">{{ localFunction() }}</p>
<p id="output" (click)="output.emit('outputEmitted')"></p>
<p id="outputBindingPropertyName" (click)="localOutput.emit('outputEmitted')"></p>
        `,
                })
            ], FooComponent);
            it('should initialize inputs', async () => {
                const props = {
                    input: 'input',
                    inputBindingPropertyName: 'inputBindingPropertyName',
                    localProperty: 'localProperty',
                    localFunction: () => 'localFunction',
                };
                const analyzedMetadata = new PropertyExtractor({}, FooComponent);
                await analyzedMetadata.init();
                const application = getApplication({
                    storyFnAngular: { props },
                    component: FooComponent,
                    targetSelector: 'my-selector',
                    analyzedMetadata,
                });
                const { fixture } = await configureTestingModule({
                    imports: [application],
                    providers: [storyPropsProvider(new BehaviorSubject(props))],
                });
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('p#input').innerHTML).toEqual(props.input);
                expect(fixture.nativeElement.querySelector('p#inputBindingPropertyName').innerHTML).toEqual(props.inputBindingPropertyName);
                expect(fixture.nativeElement.querySelector('p#localProperty').innerHTML).toEqual(props.localProperty);
                expect(fixture.nativeElement.querySelector('p#localFunction').innerHTML).toEqual(props.localFunction());
            });
            it('should initialize outputs', async () => {
                let expectedOutputValue;
                let expectedOutputBindingValue;
                const props = {
                    output: (value) => {
                        expectedOutputValue = value;
                    },
                    outputBindingPropertyName: (value) => {
                        expectedOutputBindingValue = value;
                    },
                };
                const analyzedMetadata = new PropertyExtractor({}, FooComponent);
                await analyzedMetadata.init();
                const application = getApplication({
                    storyFnAngular: { props },
                    component: FooComponent,
                    targetSelector: 'my-selector',
                    analyzedMetadata,
                });
                const { fixture } = await configureTestingModule({
                    imports: [application],
                    providers: [storyPropsProvider(new BehaviorSubject(props))],
                });
                fixture.detectChanges();
                fixture.nativeElement.querySelector('p#output').click();
                fixture.nativeElement.querySelector('p#outputBindingPropertyName').click();
                expect(expectedOutputValue).toEqual('outputEmitted');
                expect(expectedOutputBindingValue).toEqual('outputEmitted');
            });
            it('should change inputs if storyProps$ Subject emit', async () => {
                const initialProps = {
                    input: 'input',
                    inputBindingPropertyName: '',
                };
                const storyProps$ = new BehaviorSubject(initialProps);
                const analyzedMetadata = new PropertyExtractor({}, FooComponent);
                await analyzedMetadata.init();
                const application = getApplication({
                    storyFnAngular: { props: initialProps },
                    component: FooComponent,
                    targetSelector: 'my-selector',
                    analyzedMetadata,
                });
                const { fixture } = await configureTestingModule({
                    imports: [application],
                    providers: [storyPropsProvider(storyProps$)],
                });
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('p#input').innerHTML).toEqual(initialProps.input);
                expect(fixture.nativeElement.querySelector('p#inputBindingPropertyName').innerHTML).toEqual('');
                const newProps = {
                    input: 'new input',
                    inputBindingPropertyName: 'new inputBindingPropertyName',
                    localProperty: 'new localProperty',
                    localFunction: () => 'new localFunction',
                };
                storyProps$.next(newProps);
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('p#input').innerHTML).toEqual(newProps.input);
                expect(fixture.nativeElement.querySelector('p#inputBindingPropertyName').innerHTML).toEqual(newProps.inputBindingPropertyName);
                expect(fixture.nativeElement.querySelector('p#localProperty').innerHTML).toEqual(newProps.localProperty);
                expect(fixture.nativeElement.querySelector('p#localFunction').innerHTML).toEqual(newProps.localFunction());
            });
            it('should override outputs if storyProps$ Subject emit', async () => {
                let expectedOutputValue;
                let expectedOutputBindingValue;
                const initialProps = {
                    input: '',
                    output: (value) => {
                        expectedOutputValue = value;
                    },
                    outputBindingPropertyName: (value) => {
                        expectedOutputBindingValue = value;
                    },
                };
                const storyProps$ = new BehaviorSubject(initialProps);
                const analyzedMetadata = new PropertyExtractor({}, FooComponent);
                await analyzedMetadata.init();
                const application = getApplication({
                    storyFnAngular: { props: initialProps },
                    component: FooComponent,
                    targetSelector: 'my-selector',
                    analyzedMetadata,
                });
                const { fixture } = await configureTestingModule({
                    imports: [application],
                    providers: [storyPropsProvider(storyProps$)],
                });
                fixture.detectChanges();
                const newProps = {
                    input: 'new input',
                    output: () => {
                        expectedOutputValue = 'should be called';
                    },
                    outputBindingPropertyName: () => {
                        expectedOutputBindingValue = 'should be called';
                    },
                };
                storyProps$.next(newProps);
                fixture.detectChanges();
                fixture.nativeElement.querySelector('p#output').click();
                fixture.nativeElement.querySelector('p#outputBindingPropertyName').click();
                expect(fixture.nativeElement.querySelector('p#input').innerHTML).toEqual(newProps.input);
                expect(expectedOutputValue).toEqual('should be called');
                expect(expectedOutputBindingValue).toEqual('should be called');
            });
            it('should change template inputs if storyProps$ Subject emit', async () => {
                const initialProps = {
                    color: 'red',
                    input: 'input',
                };
                const storyProps$ = new BehaviorSubject(initialProps);
                const analyzedMetadata = new PropertyExtractor({}, FooComponent);
                await analyzedMetadata.init();
                const application = getApplication({
                    storyFnAngular: {
                        props: initialProps,
                        template: '<p [style.color]="color"><foo [input]="input"></foo></p>',
                    },
                    component: FooComponent,
                    targetSelector: 'my-selector',
                    analyzedMetadata,
                });
                const { fixture } = await configureTestingModule({
                    imports: [application],
                    providers: [storyPropsProvider(storyProps$)],
                });
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('p').style.color).toEqual('red');
                expect(fixture.nativeElement.querySelector('p#input').innerHTML).toEqual(initialProps.input);
                const newProps = {
                    color: 'black',
                    input: 'new input',
                };
                storyProps$.next(newProps);
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('p').style.color).toEqual('black');
                expect(fixture.nativeElement.querySelector('p#input').innerHTML).toEqual(newProps.input);
            });
            it('should call the Input() setter the right number of times', async () => {
                const initialProps = {
                    setter: 'init',
                };
                const storyProps$ = new BehaviorSubject(initialProps);
                const analyzedMetadata = new PropertyExtractor({}, FooComponent);
                await analyzedMetadata.init();
                const application = getApplication({
                    storyFnAngular: { props: initialProps },
                    component: FooComponent,
                    targetSelector: 'my-selector',
                    analyzedMetadata,
                });
                const { fixture } = await configureTestingModule({
                    imports: [application],
                    providers: [storyPropsProvider(storyProps$)],
                });
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('p#setterCallNb').innerHTML).toEqual('1');
                const newProps = {
                    setter: 'new setter value',
                };
                storyProps$.next(newProps);
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('p#setterCallNb').innerHTML).toEqual('2');
            });
        });
        describe('with component without selector', () => {
            let WithoutSelectorComponent = class WithoutSelectorComponent {
            };
            WithoutSelectorComponent = __decorate([
                Component({
                    template: `The content`,
                })
            ], WithoutSelectorComponent);
            it('should display the component', async () => {
                const props = {};
                const analyzedMetadata = new PropertyExtractor({ entryComponents: [WithoutSelectorComponent] }, WithoutSelectorComponent);
                await analyzedMetadata.init();
                const application = getApplication({
                    storyFnAngular: {
                        props,
                        moduleMetadata: { entryComponents: [WithoutSelectorComponent] },
                    },
                    component: WithoutSelectorComponent,
                    targetSelector: 'my-selector',
                    analyzedMetadata,
                });
                const { fixture } = await configureTestingModule({
                    imports: [application],
                    providers: [storyPropsProvider(new BehaviorSubject(props))],
                });
                fixture.detectChanges();
                expect(fixture.nativeElement.innerHTML).toContain('The content');
            });
        });
        it('should keep template with an empty value', async () => {
            let FooComponent = class FooComponent {
            };
            FooComponent = __decorate([
                Component({
                    selector: 'foo',
                    template: `Should not be displayed`,
                })
            ], FooComponent);
            const analyzedMetadata = new PropertyExtractor({}, FooComponent);
            await analyzedMetadata.init();
            const application = getApplication({
                storyFnAngular: { template: '' },
                component: FooComponent,
                targetSelector: 'my-selector',
                analyzedMetadata,
            });
            const { fixture } = await configureTestingModule({
                imports: [application],
                providers: [storyPropsProvider(new BehaviorSubject({}))],
            });
            fixture.detectChanges();
            expect(fixture.nativeElement.innerHTML).toEqual('');
        });
    });
    async function configureTestingModule(ngModule) {
        await TestBed.configureTestingModule(ngModule).compileComponents();
        const fixture = TestBed.createComponent(ngModule.imports[0]);
        return {
            fixture,
        };
    }
});
