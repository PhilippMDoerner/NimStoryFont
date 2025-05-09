"use strict";
// @vitest-environment happy-dom
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/platform-browser-dynamic/testing");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const CanvasRenderer_1 = require("./CanvasRenderer");
const RendererFactory_1 = require("./RendererFactory");
const DocsRenderer_1 = require("./DocsRenderer");
vitest_1.vi.mock('@angular/platform-browser-dynamic');
(0, vitest_1.describe)('RendererFactory', () => {
    let rendererFactory;
    let rootTargetDOMNode;
    let rootDocstargetDOMNode;
    (0, vitest_1.beforeEach)(async () => {
        rendererFactory = new RendererFactory_1.RendererFactory();
        document.body.innerHTML =
            '<div id="storybook-root"></div><div id="root-docs"><div id="story-in-docs"></div></div>' +
                '<div id="storybook-docs"></div>';
        rootTargetDOMNode = global.document.getElementById('storybook-root');
        rootDocstargetDOMNode = global.document.getElementById('root-docs');
        platform_browser_dynamic_1.platformBrowserDynamic.mockImplementation(testing_1.platformBrowserDynamicTesting);
        vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
        // @ts-expect-error Ignore
        globalThis.STORYBOOK_ANGULAR_OPTIONS = { experimentalZoneless: false };
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
        // Necessary to avoid this error "Provided value for `preserveWhitespaces` can not be changed once it has been set." :
        // Source: https://github.com/angular/angular/commit/e342ffd855ffeb8af7067b42307ffa320d82177e#diff-92b125e532cc22977b46a91f068d6d7ea81fd61b772842a4a0212f1cfd875be6R28
        (0, core_1.ɵresetJitOptions)();
    });
    (0, vitest_1.describe)('CanvasRenderer', () => {
        (0, vitest_1.it)('should get CanvasRenderer instance', async () => {
            const render = await rendererFactory.getRendererInstance(rootTargetDOMNode);
            (0, vitest_1.expect)(render).toBeInstanceOf(CanvasRenderer_1.CanvasRenderer);
        });
        (0, vitest_1.it)('should render my-story for story template', async () => {
            const render = await rendererFactory.getRendererInstance(rootTargetDOMNode);
            await render?.render({
                storyFnAngular: {
                    template: '🦊',
                    props: {},
                },
                forced: false,
                targetDOMNode: rootTargetDOMNode,
            });
            (0, vitest_1.expect)(document.body.getElementsByTagName('storybook-root')[0].innerHTML).toBe('🦊');
        });
        (0, vitest_1.it)('should render my-story for story component', async () => {
            let FooComponent = class FooComponent {
            };
            FooComponent = __decorate([
                (0, core_1.Component)({ selector: 'foo', template: '🦊' })
            ], FooComponent);
            const render = await rendererFactory.getRendererInstance(rootTargetDOMNode);
            await render?.render({
                storyFnAngular: {
                    props: {},
                },
                forced: false,
                component: FooComponent,
                targetDOMNode: rootTargetDOMNode,
            });
            (0, vitest_1.expect)(document.body.getElementsByTagName('storybook-root')[0].innerHTML).toBe('<foo>🦊</foo><!--container-->');
        });
        (0, vitest_1.it)('should handle circular reference in moduleMetadata', async () => {
            class Thing {
                constructor() {
                    this.token = this;
                }
            }
            const token = new Thing();
            const render = await rendererFactory.getRendererInstance(rootTargetDOMNode);
            await render?.render({
                storyFnAngular: {
                    template: '🦊',
                    props: {},
                    moduleMetadata: { providers: [{ provide: 'foo', useValue: token }] },
                },
                forced: false,
                targetDOMNode: rootTargetDOMNode,
            });
            (0, vitest_1.expect)(document.body.getElementsByTagName('storybook-root')[0].innerHTML).toBe('🦊');
        });
        (0, vitest_1.describe)('when forced=true', () => {
            (0, vitest_1.beforeEach)(async () => {
                // Init first render
                const render = await rendererFactory.getRendererInstance(rootTargetDOMNode);
                await render?.render({
                    storyFnAngular: {
                        template: '{{ logo }}: {{ name }}',
                        props: {
                            logo: '🦊',
                            name: 'Fox',
                        },
                    },
                    forced: true,
                    targetDOMNode: rootTargetDOMNode,
                });
            });
            (0, vitest_1.it)('should be rendered a first time', async () => {
                (0, vitest_1.expect)(document.body.getElementsByTagName('storybook-root')[0].innerHTML).toBe('🦊: Fox');
            });
            (0, vitest_1.it)('should not be re-rendered when only props change', async () => {
                // only props change
                const render = await rendererFactory.getRendererInstance(rootTargetDOMNode);
                await render?.render({
                    storyFnAngular: {
                        props: {
                            logo: '👾',
                        },
                    },
                    forced: true,
                    targetDOMNode: rootTargetDOMNode,
                });
                (0, vitest_1.expect)(document.body.getElementsByTagName('storybook-root')[0].innerHTML).toBe('👾: Fox');
            });
            (0, vitest_1.it)('should be re-rendered when template change', async () => {
                const render = await rendererFactory.getRendererInstance(rootTargetDOMNode);
                await render?.render({
                    storyFnAngular: {
                        template: '{{ beer }}',
                        props: {
                            beer: '🍺',
                        },
                    },
                    forced: true,
                    targetDOMNode: rootTargetDOMNode,
                });
                (0, vitest_1.expect)(document.body.getElementsByTagName('storybook-root')[0].innerHTML).toBe('🍺');
            });
        });
    });
    (0, vitest_1.describe)('DocsRenderer', () => {
        (0, vitest_1.describe)('when canvas render is done before', () => {
            (0, vitest_1.beforeEach)(async () => {
                // Init first Canvas render
                const render = await rendererFactory.getRendererInstance(rootTargetDOMNode);
                await render?.render({
                    storyFnAngular: {
                        template: 'Canvas 🖼',
                    },
                    forced: true,
                    targetDOMNode: rootTargetDOMNode,
                });
            });
            (0, vitest_1.it)('should reset root HTML', async () => {
                global.document
                    .getElementById('storybook-root')
                    .appendChild(global.document.createElement('👾'));
                (0, vitest_1.expect)(global.document.getElementById('storybook-root').innerHTML).toContain('Canvas 🖼');
                await rendererFactory.getRendererInstance(rootDocstargetDOMNode);
                (0, vitest_1.expect)(global.document.getElementById('storybook-root').innerHTML).toBe('');
            });
        });
        (0, vitest_1.it)('should get DocsRenderer instance', async () => {
            const render = await rendererFactory.getRendererInstance(rootDocstargetDOMNode);
            (0, vitest_1.expect)(render).toBeInstanceOf(DocsRenderer_1.DocsRenderer);
        });
        (0, vitest_1.describe)('when multiple story for the same component', () => {
            (0, vitest_1.it)('should render both stories', async () => {
                let FooComponent = class FooComponent {
                };
                FooComponent = __decorate([
                    (0, core_1.Component)({ selector: 'foo', template: '🦊' })
                ], FooComponent);
                const render = await rendererFactory.getRendererInstance(global.document.getElementById('storybook-docs'));
                const targetDOMNode1 = global.document.createElement('div');
                targetDOMNode1.id = 'story-1';
                global.document.getElementById('storybook-docs').appendChild(targetDOMNode1);
                await render?.render({
                    storyFnAngular: {
                        props: {},
                    },
                    forced: false,
                    component: FooComponent,
                    targetDOMNode: targetDOMNode1,
                });
                const targetDOMNode2 = global.document.createElement('div');
                targetDOMNode2.id = 'story-1';
                global.document.getElementById('storybook-docs').appendChild(targetDOMNode2);
                await render?.render({
                    storyFnAngular: {
                        props: {},
                    },
                    forced: false,
                    component: FooComponent,
                    targetDOMNode: targetDOMNode2,
                });
                (0, vitest_1.expect)(global.document.querySelectorAll('#story-1 > story-1')[0].innerHTML).toBe('<foo>🦊</foo><!--container-->');
                (0, vitest_1.expect)(global.document.querySelectorAll('#story-1 > story-1')[1].innerHTML).toBe('<foo>🦊</foo><!--container-->');
            });
        });
        (0, vitest_1.describe)('when bootstrapping multiple stories in parallel', () => {
            (0, vitest_1.it)('should render both stories', async () => {
                let FooComponent = class FooComponent {
                };
                FooComponent = __decorate([
                    (0, core_1.Component)({ selector: 'foo', template: '🦊' })
                ], FooComponent);
                const render = await rendererFactory.getRendererInstance(global.document.getElementById('storybook-docs'));
                const targetDOMNode1 = global.document.createElement('div');
                targetDOMNode1.id = 'story-1';
                global.document.getElementById('storybook-docs').appendChild(targetDOMNode1);
                const targetDOMNode2 = global.document.createElement('div');
                targetDOMNode2.id = 'story-2';
                global.document.getElementById('storybook-docs').appendChild(targetDOMNode2);
                await Promise.all([
                    render.render({
                        storyFnAngular: {},
                        forced: false,
                        component: FooComponent,
                        targetDOMNode: targetDOMNode1,
                    }),
                    render.render({
                        storyFnAngular: {},
                        forced: false,
                        component: FooComponent,
                        targetDOMNode: targetDOMNode2,
                    }),
                ]);
                (0, vitest_1.expect)(global.document.querySelector('#story-1 > story-1').innerHTML).toBe('<foo>🦊</foo><!--container-->');
                (0, vitest_1.expect)(global.document.querySelector('#story-2 > story-2').innerHTML).toBe('<foo>🦊</foo><!--container-->');
            });
        });
    });
});
