import '@angular/compiler';
import { RendererFactory } from './angular-beta/RendererFactory';
export const rendererFactory = new RendererFactory();
export const render = (props) => ({ props });
export async function renderToCanvas({ storyFn, showMain, forceRemount, storyContext: { component } }, element) {
    showMain();
    const renderer = await rendererFactory.getRendererInstance(element);
    await renderer.render({
        storyFnAngular: storyFn(),
        component,
        forced: !forceRemount,
        targetDOMNode: element,
    });
}
