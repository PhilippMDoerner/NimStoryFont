//#region code/core/.dts-emit/code/core/src/backgrounds/constants.d.ts
declare const ADDON_ID = "storybook/background";
declare const PARAM_KEY = "backgrounds";
declare const GRID_PARAM_KEY = "grid";
declare const EVENTS: {
  UPDATE: string;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/backgrounds/types.d.ts
interface Background {
  name: string;
  value: string;
}
type BackgroundMap = Record<string, Background>;
interface GridConfig {
  cellAmount: number;
  cellSize: number;
  opacity: number;
  offsetX?: number;
  offsetY?: number;
}
type GlobalState = {
  value: string | undefined;
  grid?: boolean;
};
type GlobalStateUpdate = Partial<GlobalState>;
interface BackgroundsParameters {
  /**
   * Backgrounds configuration
   *
   * @see https://storybook.js.org/docs/essentials/backgrounds#parameters
   */
  backgrounds?: {
    /** Default background color */default?: string;
    /**
     * Removes the tool and disables the feature's behavior. If you wish to turn off this feature
     * for the entire Storybook, you can set the option in your `main.js|ts` configuration file.
     *
     * @see https://storybook.js.org/docs/essentials/backgrounds#disable
     */
    disable?: boolean; /** Configuration for the background grid */
    grid?: GridConfig; /** Available background colors */
    options?: BackgroundMap;
  };
}
interface BackgroundsGlobals {
  /**
   * Backgrounds configuration
   *
   * @see https://storybook.js.org/docs/essentials/backgrounds#globals
   */
  [PARAM_KEY]?: GlobalState | GlobalState['value'];
}
interface BackgroundTypes {
  parameters: BackgroundsParameters;
  globals: BackgroundsGlobals;
}
//#endregion
export { BackgroundsParameters as a, GridConfig as c, GRID_PARAM_KEY as d, PARAM_KEY as f, BackgroundsGlobals as i, ADDON_ID as l, BackgroundMap as n, GlobalState as o, BackgroundTypes as r, GlobalStateUpdate as s, Background as t, EVENTS as u };