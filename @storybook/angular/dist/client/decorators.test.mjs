var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { vi, expect, describe, it } from 'vitest';
import { Component } from '@angular/core';
import { moduleMetadata, applicationConfig } from './decorators';
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
        addReport: vi.fn(),
    },
    hooks: {},
    loaded: {},
    originalStoryFn: vi.fn(),
    viewMode: 'story',
    abortSignal: undefined,
    canvasElement: undefined,
    step: undefined,
    context: undefined,
    canvas: undefined,
    userEvent: undefined,
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
    Component({})
], MockComponent);
describe('applicationConfig', () => {
    const provider1 = () => { };
    const provider2 = () => { };
    it('should apply global config', () => {
        expect(applicationConfig({
            providers: [provider1],
        })(() => ({}), defaultContext)).toEqual({
            applicationConfig: {
                providers: [provider1],
            },
        });
    });
    it('should apply story config', () => {
        expect(applicationConfig({
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
    it('should merge global and story config', () => {
        expect(applicationConfig({
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
describe('moduleMetadata', () => {
    it('should add metadata to a story without it', () => {
        const result = moduleMetadata({
            imports: [MockModule],
            providers: [MockService],
        })(() => ({}), 
        // deepscan-disable-next-line
        defaultContext);
        expect(result).toEqual({
            moduleMetadata: {
                declarations: [],
                entryComponents: [],
                imports: [MockModule],
                schemas: [],
                providers: [MockService],
            },
        });
    });
    it('should combine with individual metadata on a story', () => {
        const result = moduleMetadata({
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
        expect(result).toEqual({
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
    it('should return the original metadata if passed null', () => {
        const result = moduleMetadata(null)(() => ({
            component: MockComponent,
            moduleMetadata: {
                providers: [MockService],
            },
        }), 
        // deepscan-disable-next-line
        defaultContext);
        expect(result).toEqual({
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
