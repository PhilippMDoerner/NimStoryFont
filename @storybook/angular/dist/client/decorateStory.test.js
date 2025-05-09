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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const vitest_1 = require("vitest");
const decorators_1 = require("./decorators");
const decorateStory_1 = __importDefault(require("./decorateStory"));
(0, vitest_1.describe)('decorateStory', () => {
    (0, vitest_1.describe)('angular behavior', () => {
        (0, vitest_1.it)('should use componentWrapperDecorator with args', () => {
            const decorators = [
                (0, decorators_1.componentWrapperDecorator)(ParentComponent, ({ args }) => args),
                (0, decorators_1.componentWrapperDecorator)((story) => `<grandparent [grandparentInput]="grandparentInput">${story}</grandparent>`, ({ args }) => args),
                (0, decorators_1.componentWrapperDecorator)((story) => `<great-grandparent>${story}</great-grandparent>`),
            ];
            const decorated = (0, decorateStory_1.default)(() => ({ template: '</child>' }), decorators);
            (0, vitest_1.expect)(decorated(makeContext({
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
                    parentOutput: vitest_1.expect.any(Function),
                },
                template: '<great-grandparent><grandparent [grandparentInput]="grandparentInput"><parent [parentInput]="parentInput" (parentOutput)="parentOutput($event)"></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        (0, vitest_1.it)('should use componentWrapperDecorator with input / output', () => {
            const decorators = [
                (0, decorators_1.componentWrapperDecorator)(ParentComponent, {
                    parentInput: 'Parent input',
                    parentOutput: () => { },
                }),
                (0, decorators_1.componentWrapperDecorator)((story) => `<grandparent [grandparentInput]="grandparentInput">${story}</grandparent>`, {
                    grandparentInput: 'Grandparent input',
                    sameInput: 'Should be override by story props',
                }),
                (0, decorators_1.componentWrapperDecorator)((story) => `<great-grandparent>${story}</great-grandparent>`),
            ];
            const decorated = (0, decorateStory_1.default)(() => ({ template: '</child>', props: { sameInput: 'Story input' } }), decorators);
            (0, vitest_1.expect)(decorated(makeContext({
                component: FooComponent,
            }))).toEqual({
                props: {
                    parentInput: 'Parent input',
                    parentOutput: vitest_1.expect.any(Function),
                    grandparentInput: 'Grandparent input',
                    sameInput: 'Story input',
                },
                template: '<great-grandparent><grandparent [grandparentInput]="grandparentInput"><parent [parentInput]="parentInput" (parentOutput)="parentOutput($event)"></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        (0, vitest_1.it)('should use componentWrapperDecorator', () => {
            const decorators = [
                (0, decorators_1.componentWrapperDecorator)(ParentComponent),
                (0, decorators_1.componentWrapperDecorator)((story) => `<grandparent>${story}</grandparent>`),
                (0, decorators_1.componentWrapperDecorator)((story) => `<great-grandparent>${story}</great-grandparent>`),
            ];
            const decorated = (0, decorateStory_1.default)(() => ({ template: '</child>' }), decorators);
            (0, vitest_1.expect)(decorated(makeContext({ component: FooComponent }))).toEqual({
                template: '<great-grandparent><grandparent><parent></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        (0, vitest_1.it)('should use template in preference to component parameters', () => {
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
            const decorated = (0, decorateStory_1.default)(() => ({ template: '</child>' }), decorators);
            (0, vitest_1.expect)(decorated(makeContext({ component: FooComponent }))).toEqual({
                template: '<great-grandparent><grandparent><parent></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        (0, vitest_1.it)('should include story templates in decorators', () => {
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
            const decorated = (0, decorateStory_1.default)(() => ({ template: '</child>' }), decorators);
            (0, vitest_1.expect)(decorated(makeContext({}))).toEqual({
                template: '<great-grandparent><grandparent><parent></child></parent></grandparent></great-grandparent>',
                userDefinedTemplate: true,
            });
        });
        (0, vitest_1.it)('should include story components in decorators', () => {
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
            const decorated = (0, decorateStory_1.default)(() => ({}), decorators);
            (0, vitest_1.expect)(decorated(makeContext({ component: FooComponent }))).toEqual({
                template: '<great-grandparent><grandparent><parent><foo></foo></parent></grandparent></great-grandparent>',
                userDefinedTemplate: false,
            });
        });
        (0, vitest_1.it)('should keep template with an empty value', () => {
            const decorators = [
                (0, decorators_1.componentWrapperDecorator)(ParentComponent),
            ];
            const decorated = (0, decorateStory_1.default)(() => ({ template: '' }), decorators);
            (0, vitest_1.expect)(decorated(makeContext({ component: FooComponent }))).toEqual({
                template: '<parent></parent>',
            });
        });
        (0, vitest_1.it)('should only keeps args with a control or an action in argTypes', () => {
            const decorated = (0, decorateStory_1.default)((context) => ({
                template: `Args available in the story : ${Object.keys(context.args).join()}`,
            }), []);
            (0, vitest_1.expect)(decorated(makeContext({
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
    (0, vitest_1.describe)('default behavior', () => {
        (0, vitest_1.it)('calls decorators in out to in order', () => {
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
            const decorated = (0, decorateStory_1.default)(() => ({ props: { a: [0] } }), decorators);
            (0, vitest_1.expect)(decorated(makeContext({}))).toEqual({ props: { a: [0, 1, 2, 3] } });
        });
        (0, vitest_1.it)('passes context through to sub decorators', () => {
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
            const decorated = (0, decorateStory_1.default)((c) => ({ props: { a: [c.k] } }), decorators);
            (0, vitest_1.expect)(decorated(makeContext({ k: 0 }))).toEqual({ props: { a: [1, 2, 3, 0] } });
        });
        (0, vitest_1.it)('DOES NOT merge parameter or pass through parameters key in context', () => {
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
            const decorated = (0, decorateStory_1.default)((c) => ({ props: { a: [c.k], p: [c.parameters.p] } }), decorators);
            (0, vitest_1.expect)(decorated(makeContext({ k: 0, parameters: { p: 0 } }))).toEqual({
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
    (0, core_1.Component)({
        selector: 'foo',
        template: `foo`,
    })
], FooComponent);
let ParentComponent = class ParentComponent {
};
__decorate([
    (0, core_1.Input)(),
    __metadata("design:type", String)
], ParentComponent.prototype, "parentInput", void 0);
__decorate([
    (0, core_1.Output)(),
    __metadata("design:type", Object)
], ParentComponent.prototype, "parentOutput", void 0);
ParentComponent = __decorate([
    (0, core_1.Component)({
        selector: 'parent',
        template: `<ng-content></ng-content>`,
    })
], ParentComponent);
