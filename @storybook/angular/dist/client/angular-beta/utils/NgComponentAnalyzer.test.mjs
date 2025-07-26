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
import { Component, ComponentFactoryResolver, Directive, EventEmitter, HostBinding, Injectable, Input, Output, Pipe, input, output, } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { describe, expect, it } from 'vitest';
import { getComponentInputsOutputs, isComponent, isDeclarable, getComponentDecoratorMetadata, isStandaloneComponent, } from './NgComponentAnalyzer';
describe('getComponentInputsOutputs', () => {
    it('should return empty if no I/O found', () => {
        let FooComponent = class FooComponent {
        };
        FooComponent = __decorate([
            Component({
                standalone: false,
            })
        ], FooComponent);
        expect(getComponentInputsOutputs(FooComponent)).toEqual({
            inputs: [],
            outputs: [],
        });
        class BarComponent {
        }
        expect(getComponentInputsOutputs(BarComponent)).toEqual({
            inputs: [],
            outputs: [],
        });
    });
    it('should return I/O', () => {
        let FooComponent = class FooComponent {
            constructor() {
                this.signalInput = input();
                this.signalInputAliased = input('signalInputAliased', {
                    alias: 'signalInputAliasedAlias',
                });
                this.output = new EventEmitter();
                this.outputWithBindingPropertyName = new EventEmitter();
                this.signalOutput = output();
            }
        };
        __decorate([
            Input(),
            __metadata("design:type", String)
        ], FooComponent.prototype, "input", void 0);
        __decorate([
            Input('inputPropertyName'),
            __metadata("design:type", String)
        ], FooComponent.prototype, "inputWithBindingPropertyName", void 0);
        __decorate([
            Output(),
            __metadata("design:type", Object)
        ], FooComponent.prototype, "output", void 0);
        __decorate([
            Output('outputPropertyName'),
            __metadata("design:type", Object)
        ], FooComponent.prototype, "outputWithBindingPropertyName", void 0);
        FooComponent = __decorate([
            Component({
                template: '',
                inputs: ['inputInComponentMetadata'],
                outputs: ['outputInComponentMetadata'],
                standalone: false,
            })
        ], FooComponent);
        const fooComponentFactory = resolveComponentFactory(FooComponent);
        const { inputs, outputs } = getComponentInputsOutputs(FooComponent);
        expect({ inputs, outputs }).toEqual({
            inputs: [
                { propName: 'inputInComponentMetadata', templateName: 'inputInComponentMetadata' },
                { propName: 'input', templateName: 'input' },
                { propName: 'inputWithBindingPropertyName', templateName: 'inputPropertyName' },
            ],
            outputs: [
                { propName: 'outputInComponentMetadata', templateName: 'outputInComponentMetadata' },
                { propName: 'output', templateName: 'output' },
                { propName: 'outputWithBindingPropertyName', templateName: 'outputPropertyName' },
            ],
        });
        expect(sortByPropName(inputs)).toEqual(sortByPropName(fooComponentFactory.inputs.map(({ isSignal, ...rest }) => rest)));
        expect(sortByPropName(outputs)).toEqual(sortByPropName(fooComponentFactory.outputs));
    });
    it("should return I/O when some of component metadata has the same name as one of component's properties", () => {
        let FooComponent = class FooComponent {
            constructor() {
                this.output = new EventEmitter();
                this.outputWithBindingPropertyName = new EventEmitter();
            }
        };
        __decorate([
            Input(),
            __metadata("design:type", String)
        ], FooComponent.prototype, "input", void 0);
        __decorate([
            Input('inputPropertyName'),
            __metadata("design:type", String)
        ], FooComponent.prototype, "inputWithBindingPropertyName", void 0);
        __decorate([
            Output(),
            __metadata("design:type", Object)
        ], FooComponent.prototype, "output", void 0);
        __decorate([
            Output('outputPropertyName'),
            __metadata("design:type", Object)
        ], FooComponent.prototype, "outputWithBindingPropertyName", void 0);
        FooComponent = __decorate([
            Component({
                template: '',
                inputs: ['input', 'inputWithBindingPropertyName'],
                outputs: ['outputWithBindingPropertyName'],
                standalone: false,
            })
        ], FooComponent);
        const fooComponentFactory = resolveComponentFactory(FooComponent);
        const { inputs, outputs } = getComponentInputsOutputs(FooComponent);
        expect(sortByPropName(inputs)).toEqual(sortByPropName(fooComponentFactory.inputs.map(({ isSignal, ...rest }) => rest)));
        expect(sortByPropName(outputs)).toEqual(sortByPropName(fooComponentFactory.outputs));
    });
    it('should return I/O in the presence of multiple decorators', () => {
        let FooComponent = class FooComponent {
        };
        __decorate([
            Input(),
            HostBinding('class.preceeding-first'),
            __metadata("design:type", String)
        ], FooComponent.prototype, "inputPreceedingHostBinding", void 0);
        __decorate([
            HostBinding('class.following-binding'),
            Input(),
            __metadata("design:type", String)
        ], FooComponent.prototype, "inputFollowingHostBinding", void 0);
        FooComponent = __decorate([
            Component({
                template: '',
                standalone: false,
            })
        ], FooComponent);
        const fooComponentFactory = resolveComponentFactory(FooComponent);
        const { inputs, outputs } = getComponentInputsOutputs(FooComponent);
        expect({ inputs, outputs }).toEqual({
            inputs: [
                { propName: 'inputPreceedingHostBinding', templateName: 'inputPreceedingHostBinding' },
                { propName: 'inputFollowingHostBinding', templateName: 'inputFollowingHostBinding' },
            ],
            outputs: [],
        });
        expect(sortByPropName(inputs)).toEqual(sortByPropName(fooComponentFactory.inputs.map(({ isSignal, ...rest }) => rest)));
        expect(sortByPropName(outputs)).toEqual(sortByPropName(fooComponentFactory.outputs));
    });
    it('should return I/O with extending classes', () => {
        let BarComponent = class BarComponent {
        };
        __decorate([
            Input(),
            __metadata("design:type", String)
        ], BarComponent.prototype, "a", void 0);
        __decorate([
            Input(),
            __metadata("design:type", String)
        ], BarComponent.prototype, "b", void 0);
        BarComponent = __decorate([
            Component({
                template: '',
                standalone: false,
            })
        ], BarComponent);
        let FooComponent = class FooComponent extends BarComponent {
        };
        __decorate([
            Input(),
            __metadata("design:type", String)
        ], FooComponent.prototype, "b", void 0);
        __decorate([
            Input(),
            __metadata("design:type", String)
        ], FooComponent.prototype, "c", void 0);
        FooComponent = __decorate([
            Component({
                template: '',
                standalone: false,
            })
        ], FooComponent);
        const fooComponentFactory = resolveComponentFactory(FooComponent);
        const { inputs, outputs } = getComponentInputsOutputs(FooComponent);
        expect({ inputs, outputs }).toEqual({
            inputs: [
                { propName: 'a', templateName: 'a' },
                { propName: 'b', templateName: 'b' },
                { propName: 'c', templateName: 'c' },
            ],
            outputs: [],
        });
        expect(sortByPropName(inputs)).toEqual(sortByPropName(fooComponentFactory.inputs.map(({ isSignal, ...rest }) => rest)));
        expect(sortByPropName(outputs)).toEqual(sortByPropName(fooComponentFactory.outputs));
    });
});
describe('isDeclarable', () => {
    it('should return true with a Component', () => {
        let FooComponent = class FooComponent {
        };
        FooComponent = __decorate([
            Component({})
        ], FooComponent);
        expect(isDeclarable(FooComponent)).toEqual(true);
    });
    it('should return true with a Directive', () => {
        let FooDirective = class FooDirective {
        };
        FooDirective = __decorate([
            Directive({})
        ], FooDirective);
        expect(isDeclarable(FooDirective)).toEqual(true);
    });
    it('should return true with a Pipe', () => {
        let FooPipe = class FooPipe {
        };
        FooPipe = __decorate([
            Pipe({ name: 'pipe' })
        ], FooPipe);
        expect(isDeclarable(FooPipe)).toEqual(true);
    });
    it('should return false with simple class', () => {
        class FooPipe {
        }
        expect(isDeclarable(FooPipe)).toEqual(false);
    });
    it('should return false with Injectable', () => {
        let FooInjectable = class FooInjectable {
        };
        FooInjectable = __decorate([
            Injectable()
        ], FooInjectable);
        expect(isDeclarable(FooInjectable)).toEqual(false);
    });
});
describe('isComponent', () => {
    it('should return true with a Component', () => {
        let FooComponent = class FooComponent {
        };
        FooComponent = __decorate([
            Component({})
        ], FooComponent);
        expect(isComponent(FooComponent)).toEqual(true);
    });
    it('should return false with simple class', () => {
        class FooPipe {
        }
        expect(isComponent(FooPipe)).toEqual(false);
    });
    it('should return false with Directive', () => {
        let FooDirective = class FooDirective {
        };
        FooDirective = __decorate([
            Directive()
        ], FooDirective);
        expect(isComponent(FooDirective)).toEqual(false);
    });
});
describe('isStandaloneComponent', () => {
    it('should return true with a Component with "standalone: true"', () => {
        let FooComponent = class FooComponent {
        };
        FooComponent = __decorate([
            Component({ standalone: true })
        ], FooComponent);
        expect(isStandaloneComponent(FooComponent)).toEqual(true);
    });
    it('should return false with a Component with "standalone: false"', () => {
        let FooComponent = class FooComponent {
        };
        FooComponent = __decorate([
            Component({ standalone: false })
        ], FooComponent);
        expect(isStandaloneComponent(FooComponent)).toEqual(false);
    });
    it('should return false with a Component without the "standalone" property', () => {
        let FooComponent = class FooComponent {
        };
        FooComponent = __decorate([
            Component({})
        ], FooComponent);
        expect(isStandaloneComponent(FooComponent)).toEqual(false);
    });
    it('should return false with simple class', () => {
        class FooPipe {
        }
        expect(isStandaloneComponent(FooPipe)).toEqual(false);
    });
    it('should return true with a Directive with "standalone: true"', () => {
        let FooDirective = class FooDirective {
        };
        FooDirective = __decorate([
            Directive({ standalone: true })
        ], FooDirective);
        expect(isStandaloneComponent(FooDirective)).toEqual(true);
    });
    it('should return false with a Directive with "standalone: false"', () => {
        let FooDirective = class FooDirective {
        };
        FooDirective = __decorate([
            Directive({ standalone: false })
        ], FooDirective);
        expect(isStandaloneComponent(FooDirective)).toEqual(false);
    });
    it('should return false with Directive without the "standalone" property', () => {
        let FooDirective = class FooDirective {
        };
        FooDirective = __decorate([
            Directive()
        ], FooDirective);
        expect(isStandaloneComponent(FooDirective)).toEqual(false);
    });
    it('should return true with a Pipe with "standalone: true"', () => {
        let FooPipe = class FooPipe {
        };
        FooPipe = __decorate([
            Pipe({ name: 'FooPipe', standalone: true })
        ], FooPipe);
        expect(isStandaloneComponent(FooPipe)).toEqual(true);
    });
    it('should return false with a Pipe with "standalone: false"', () => {
        let FooPipe = class FooPipe {
        };
        FooPipe = __decorate([
            Pipe({ name: 'FooPipe', standalone: false })
        ], FooPipe);
        expect(isStandaloneComponent(FooPipe)).toEqual(false);
    });
    it('should return false with Pipe without the "standalone" property', () => {
        let FooPipe = class FooPipe {
        };
        FooPipe = __decorate([
            Pipe({
                name: 'fooPipe',
            })
        ], FooPipe);
        expect(isStandaloneComponent(FooPipe)).toEqual(false);
    });
});
describe('getComponentDecoratorMetadata', () => {
    it('should return Component with a Component', () => {
        let FooComponent = class FooComponent {
        };
        FooComponent = __decorate([
            Component({ selector: 'foo' })
        ], FooComponent);
        expect(getComponentDecoratorMetadata(FooComponent)).toBeInstanceOf(Component);
        expect(getComponentDecoratorMetadata(FooComponent)).toEqual({
            changeDetection: 1,
            selector: 'foo',
        });
    });
    it('should return Component with extending classes', () => {
        let BarComponent = class BarComponent {
        };
        BarComponent = __decorate([
            Component({ selector: 'bar' })
        ], BarComponent);
        let FooComponent = class FooComponent extends BarComponent {
        };
        FooComponent = __decorate([
            Component({ selector: 'foo' })
        ], FooComponent);
        expect(getComponentDecoratorMetadata(FooComponent)).toBeInstanceOf(Component);
        expect(getComponentDecoratorMetadata(FooComponent)).toEqual({
            changeDetection: 1,
            selector: 'foo',
        });
    });
});
function sortByPropName(array) {
    return array.sort((a, b) => a.propName.localeCompare(b.propName));
}
function resolveComponentFactory(component) {
    TestBed.configureTestingModule({
        declarations: [component],
    }).overrideModule(BrowserDynamicTestingModule, {});
    const componentFactoryResolver = TestBed.inject(ComponentFactoryResolver);
    return componentFactoryResolver.resolveComponentFactory(component);
}
