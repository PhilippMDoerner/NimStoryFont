var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output } from '@angular/core';
import { describe, expect, it } from 'vitest';
import { componentWrapperDecorator } from './decorators';
import decorateStory from './decorateStory';
// TODO: Fix. Test is infinitely running.
describe.skip('decorateStory', () => {
    describe('angular behavior', () => {
        it('should use componentWrapperDecorator with args', () => {
            const decorators = [
                componentWrapperDecorator(ParentComponent, ({ args }) => args),
                componentWrapperDecorator((story) => `<grandparent [grandparentInput]="grandparentInput">${story}</grandparent>`, ({ args }) => args),
                componentWrapperDecorator((story) => `<great-grandparent>${story}</great-grandparent>`),
            ];
            const decorated = decorateStory(() => ({ template: '</child>' }), decorators);
            expect(decorated(makeContext({
                component: FooComponent,
                args: {
                    parentInput: 'Parent input',
                    grandparentInput: 'grandparent input',
                    parentOutput: () => { },
                },
            }))).toEqual({
                props: {
                    parentInput: 'Parent input',
                    grandparentInput: 'grandparent input',
                    parentOutput: expect.any(Function),
                },
                template: '<great-grandparent><grandparent [grandparentInput]="grandparentInput"><parent [parentInput]="parentInput" (parentOutput)="parentOutput($event)"></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        it('should use componentWrapperDecorator with input / output', () => {
            const decorators = [
                componentWrapperDecorator(ParentComponent, {
                    parentInput: 'Parent input',
                    parentOutput: () => { },
                }),
                componentWrapperDecorator((story) => `<grandparent [grandparentInput]="grandparentInput">${story}</grandparent>`, {
                    grandparentInput: 'Grandparent input',
                    sameInput: 'Should be override by story props',
                }),
                componentWrapperDecorator((story) => `<great-grandparent>${story}</great-grandparent>`),
            ];
            const decorated = decorateStory(() => ({ template: '</child>', props: { sameInput: 'Story input' } }), decorators);
            expect(decorated(makeContext({
                component: FooComponent,
            }))).toEqual({
                props: {
                    parentInput: 'Parent input',
                    parentOutput: expect.any(Function),
                    grandparentInput: 'Grandparent input',
                    sameInput: 'Story input',
                },
                template: '<great-grandparent><grandparent [grandparentInput]="grandparentInput"><parent [parentInput]="parentInput" (parentOutput)="parentOutput($event)"></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        it('should use componentWrapperDecorator', () => {
            const decorators = [
                componentWrapperDecorator(ParentComponent),
                componentWrapperDecorator((story) => `<grandparent>${story}</grandparent>`),
                componentWrapperDecorator((story) => `<great-grandparent>${story}</great-grandparent>`),
            ];
            const decorated = decorateStory(() => ({ template: '</child>' }), decorators);
            expect(decorated(makeContext({ component: FooComponent }))).toEqual({
                template: '<great-grandparent><grandparent><parent></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        it('should use template in preference to component parameters', () => {
            const decorators = [
                (s) => {
                    const story = s();
                    return {
                        ...story,
                        template: `<parent>${story.template}</parent>`,
                    };
                },
                (s) => {
                    const story = s();
                    return {
                        ...story,
                        template: `<grandparent>${story.template}</grandparent>`,
                    };
                },
                (s) => {
                    const story = s();
                    return {
                        ...story,
                        template: `<great-grandparent>${story.template}</great-grandparent>`,
                    };
                },
            ];
            const decorated = decorateStory(() => ({ template: '</child>' }), decorators);
            expect(decorated(makeContext({ component: FooComponent }))).toEqual({
                template: '<great-grandparent><grandparent><parent></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        it('should include story templates in decorators', () => {
            const decorators = [
                (s) => {
                    const story = s();
                    return {
                        ...story,
                        template: `<parent>${story.template}</parent>`,
                    };
                },
                (s) => {
                    const story = s();
                    return {
                        ...story,
                        template: `<grandparent>${story.template}</grandparent>`,
                    };
                },
                (s) => {
                    const story = s();
                    return {
                        ...story,
                        template: `<great-grandparent>${story.template}</great-grandparent>`,
                    };
                },
            ];
            const decorated = decorateStory(() => ({ template: '</child>' }), decorators);
            expect(decorated(makeContext({}))).toEqual({
                template: '<great-grandparent><grandparent><parent></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        it('should include story components in decorators', () => {
            const decorators = [
                (s) => {
                    const story = s();
                    return {
                        ...story,
                        template: `<parent>${story.template}</parent>`,
                    };
                },
                (s) => {
                    const story = s();
                    return {
                        ...story,
                        template: `<grandparent>${story.template}</grandparent>`,
                    };
                },
                (s) => {
                    const story = s();
                    return {
                        ...story,
                        template: `<great-grandparent>${story.template}</great-grandparent>`,
                    };
                },
            ];
            const decorated = decorateStory(() => ({}), decorators);
            expect(decorated(makeContext({ component: FooComponent }))).toEqual({
                template: '<great-grandparent><grandparent><parent><foo></foo></parent></grandparent></great-grandparent>',
                userDefinedTemplate: false,
            });
        });
        it('should keep template with an empty value', () => {
            const decorators = [
                componentWrapperDecorator(ParentComponent),
            ];
            const decorated = decorateStory(() => ({ template: '' }), decorators);
            expect(decorated(makeContext({ component: FooComponent }))).toEqual({
                template: '<parent></parent>',
            });
        });
        it('should only keeps args with a control or an action in argTypes', () => {
            const decorated = decorateStory((context) => ({
                template: `Args available in the story : ${Object.keys(context.args).join()}`,
            }), []);
            expect(decorated(makeContext({
                component: FooComponent,
                argTypes: {
                    withControl: { control: { type: 'object' }, name: 'withControl' },
                    withAction: { action: 'onClick', name: 'withAction' },
                    toRemove: { name: 'toRemove' },
                },
                args: {
                    withControl: 'withControl',
                    withAction: () => ({}),
                    toRemove: 'toRemove',
                },
            }))).toEqual({
                template: 'Args available in the story : withControl,withAction',
                userDefinedTemplate: true,
            });
        });
    });
    describe('default behavior', () => {
        it('calls decorators in out to in order', () => {
            const decorators = [
                (s) => {
                    const story = s();
                    return { ...story, props: { a: [...story.props.a, 1] } };
                },
                (s) => {
                    const story = s();
                    return { ...story, props: { a: [...story.props.a, 2] } };
                },
                (s) => {
                    const story = s();
                    return { ...story, props: { a: [...story.props.a, 3] } };
                },
            ];
            const decorated = decorateStory(() => ({ props: { a: [0] } }), decorators);
            expect(decorated(makeContext({}))).toEqual({ props: { a: [0, 1, 2, 3] } });
        });
        it('passes context through to sub decorators', () => {
            const decorators = [
                (s, c) => {
                    const story = s({ ...c, k: 1 });
                    return { ...story, props: { a: [...story.props.a, c.k] } };
                },
                (s, c) => {
                    const story = s({ ...c, k: 2 });
                    return { ...story, props: { a: [...story.props.a, c.k] } };
                },
                (s, c) => {
                    const story = s({ ...c, k: 3 });
                    return { ...story, props: { a: [...story.props.a, c.k] } };
                },
            ];
            const decorated = decorateStory((c) => ({ props: { a: [c.k] } }), decorators);
            expect(decorated(makeContext({ k: 0 }))).toEqual({ props: { a: [1, 2, 3, 0] } });
        });
        it('DOES NOT merge parameter or pass through parameters key in context', () => {
            const decorators = [
                (s, c) => {
                    const story = s({ ...c, k: 1, parameters: { p: 1 } });
                    return {
                        ...story,
                        props: { a: [...story.props.a, c.k], p: [...story.props.p, c.parameters.p] },
                    };
                },
                (s, c) => {
                    const story = s({ ...c, k: 2, parameters: { p: 2 } });
                    return {
                        ...story,
                        props: { a: [...story.props.a, c.k], p: [...story.props.p, c.parameters.p] },
                    };
                },
                (s, c) => {
                    const story = s({ ...c, k: 3, parameters: { p: 3 } });
                    return {
                        ...story,
                        props: { a: [...story.props.a, c.k], p: [...story.props.p, c.parameters.p] },
                    };
                },
            ];
            const decorated = decorateStory((c) => ({ props: { a: [c.k], p: [c.parameters.p] } }), decorators);
            expect(decorated(makeContext({ k: 0, parameters: { p: 0 } }))).toEqual({
                props: { a: [1, 2, 3, 0], p: [0, 0, 0, 0] },
            });
        });
    });
});
function makeContext(input) {
    return {
        id: 'id',
        kind: 'kind',
        name: 'name',
        viewMode: 'story',
        parameters: {},
        ...input,
    };
}
let FooComponent = class FooComponent {
};
FooComponent = __decorate([
    Component({
        selector: 'foo',
        template: `foo`,
    })
], FooComponent);
let ParentComponent = class ParentComponent {
};
__decorate([
    Input(),
    __metadata("design:type", String)
], ParentComponent.prototype, "parentInput", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ParentComponent.prototype, "parentOutput", void 0);
ParentComponent = __decorate([
    Component({
        selector: 'parent',
        template: `<ng-content></ng-content>`,
    })
], ParentComponent);
