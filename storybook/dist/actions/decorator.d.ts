import { PartialStoryFn, Renderer } from "storybook/internal/types";

//#region code/core/.dts-emit/code/core/src/actions/decorator.d.ts
/** @deprecated Will be removed in Storybook v10 */
declare const withActions: <T extends Renderer>(storyFn: PartialStoryFn<T>) => T['storyResult'];
//#endregion
export { withActions };