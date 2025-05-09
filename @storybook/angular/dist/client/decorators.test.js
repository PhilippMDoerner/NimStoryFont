"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const core_1 = require("@angular/core");
const decorators_1 = require("./decorators");
const defaultContext = {
    componentId: 'unspecified',
    kind: 'unspecified',
    title: 'unspecified',
    id: 'unspecified',
    name: 'unspecified',
    story: 'unspecified',
    tags: [],
    parameters: {},
    initialArgs: {},
    args: {},
    argTypes: {},
    globals: {},
    globalTypes: {},
    storyGlobals: {},
    reporting: {
        reports: [],
        addReport: vitest_1.vi.fn(),
    },
    hooks: {},
    loaded: {},
    originalStoryFn: vitest_1.vi.fn(),
    viewMode: 'story',
    abortSignal: undefined,
    canvasElement: undefined,
    step: undefined,
    context: undefined,
    canvas: undefined,
    mount: undefined,
};
defaultContext.context = defaultContext;
class MockModule {
}
class MockModuleTwo {
}
class MockService {
}
let MockComponent = class MockComponent {
};
MockComponent = __decorate([
    (0, core_1.Component)({})
], MockComponent);
(0, vitest_1.describe)('applicationConfig', () => {
    const provider1 = () => { };
    const provider2 = () => { };
    (0, vitest_1.it)('should apply global config', () => {
        (0, vitest_1.expect)((0, decorators_1.applicationConfig)({
            providers: [provider1],
        })(() => ({}), defaultContext)).toEqual({
            applicationConfig: {
                providers: [provider1],
            },
        });
    });
    (0, vitest_1.it)('should apply story config', () => {
        (0, vitest_1.expect)((0, decorators_1.applicationConfig)({
            providers: [],
        })(() => ({
            applicationConfig: {
                providers: [provider2],
            },
        }), {
            ...defaultContext,
        })).toEqual({
            applicationConfig: {
                providers: [provider2],
            },
        });
    });
    (0, vitest_1.it)('should merge global and story config', () => {
        (0, vitest_1.expect)((0, decorators_1.applicationConfig)({
            providers: [provider1],
        })(() => ({
            applicationConfig: {
                providers: [provider2],
            },
        }), {
            ...defaultContext,
        })).toEqual({
            applicationConfig: {
                providers: [provider1, provider2],
            },
        });
    });
});
(0, vitest_1.describe)('moduleMetadata', () => {
    (0, vitest_1.it)('should add metadata to a story without it', () => {
        const result = (0, decorators_1.moduleMetadata)({
            imports: [MockModule],
            providers: [MockService],
        })(() => ({}), 
        // deepscan-disable-next-line
        defaultContext);
        (0, vitest_1.expect)(result).toEqual({
            moduleMetadata: {
                declarations: [],
                entryComponents: [],
                imports: [MockModule],
                schemas: [],
                providers: [MockService],
            },
        });
    });
    (0, vitest_1.it)('should combine with individual metadata on a story', () => {
        const result = (0, decorators_1.moduleMetadata)({
            imports: [MockModule],
        })(() => ({
            component: MockComponent,
            moduleMetadata: {
                imports: [MockModuleTwo],
                providers: [MockService],
            },
        }), 
        // deepscan-disable-next-line
        defaultContext);
        (0, vitest_1.expect)(result).toEqual({
            component: MockComponent,
            moduleMetadata: {
                declarations: [],
                entryComponents: [],
                imports: [MockModule, MockModuleTwo],
                schemas: [],
                providers: [MockService],
            },
        });
    });
    (0, vitest_1.it)('should return the original metadata if passed null', () => {
        const result = (0, decorators_1.moduleMetadata)(null)(() => ({
            component: MockComponent,
            moduleMetadata: {
                providers: [MockService],
            },
        }), 
        // deepscan-disable-next-line
        defaultContext);
        (0, vitest_1.expect)(result).toEqual({
            component: MockComponent,
            moduleMetadata: {
                declarations: [],
                entryComponents: [],
                imports: [],
                schemas: [],
                providers: [MockService],
            },
        });
    });
});
