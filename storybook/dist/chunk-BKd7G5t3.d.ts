//#region code/core/.dts-emit/code/core/src/viewport/types.d.ts
interface Viewport {
  name: string;
  styles: ViewportStyles;
  type?: ViewportType;
}
type ViewportType = 'desktop' | 'mobile' | 'tablet' | 'watch' | 'other';
interface ViewportStyles {
  height: string;
  width: string;
}
type ViewportMap = Record<string, Viewport>;
type GlobalState = {
  /**
   * When set, the viewport is applied and cannot be changed using the toolbar. Must match the key
   * of one of the available viewports or follow the format '{width}-{height}', e.g. '320-480' which
   * may include a unit (e.g. '100vw' or '100pct').
   */
  value: string | undefined;
  /**
   * When true the viewport applied will be rotated 90°, e.g. it will rotate from portrait to
   * landscape orientation.
   */
  isRotated?: boolean;
};
type GlobalStateUpdate = Partial<GlobalState>;
interface ViewportParameters {
  /**
   * Viewport configuration
   *
   * @see https://storybook.js.org/docs/essentials/viewport#parameters
   */
  viewport?: {
    /**
     * Removes the tool and disables the feature's behavior. If you wish to turn off this feature
     * for the entire Storybook, you can set the option in your `main.js|ts` configuration file.
     *
     * @see https://storybook.js.org/docs/essentials/viewport#disable
     */
    disable?: boolean;
    /**
     * Specify the available viewports. The width and height values must include the unit, e.g.
     * '320px'.
     */
    options: Record<string, Viewport>;
  };
}
interface ViewportGlobals {
  /**
   * Viewport configuration
   *
   * @see https://storybook.js.org/docs/essentials/viewport#globals
   */
  viewport?: GlobalState | GlobalState['value'];
}
interface ViewportTypes {
  parameters: ViewportParameters;
  globals: ViewportGlobals;
}
//#endregion
export { ViewportMap as a, ViewportType as c, ViewportGlobals as i, ViewportTypes as l, GlobalStateUpdate as n, ViewportParameters as o, Viewport as r, ViewportStyles as s, GlobalState as t };