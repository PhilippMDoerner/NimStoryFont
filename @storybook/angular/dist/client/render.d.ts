import { ArgsStoryFn, RenderContext } from 'storybook/internal/types';
import '@angular/compiler';
import { RendererFactory } from './angular-beta/RendererFactory';
import { AngularRenderer } from './types';
export declare const rendererFactory: RendererFactory;
export declare const render: ArgsStoryFn<AngularRenderer>;
export declare function renderToCanvas({ storyFn, showMain, forceRemount, storyContext: { component } }: RenderContext<AngularRenderer>, element: HTMLElement): Promise<void>;
