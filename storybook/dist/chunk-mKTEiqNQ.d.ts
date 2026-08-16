//#region code/core/.dts-emit/code/core/src/highlight/icons.d.ts
declare const iconPaths: {
  chevronLeft: string[];
  chevronRight: string[];
  info: string[];
  shareAlt: string[];
};
type IconName = keyof typeof iconPaths;
//#endregion
//#region code/core/.dts-emit/code/core/src/highlight/types.d.ts
interface HighlightTypes {
  parameters: HighlightParameters;
}
interface HighlightParameters {
  /**
   * Highlight configuration
   *
   * @see https://storybook.js.org/docs/essentials/highlight#parameters
   */
  highlight?: {
    /**
     * Removes the tool and disables the feature's behavior. If you wish to turn off this feature
     * for the entire Storybook, you can set the option in your `main.js|ts` configuration file.
     *
     * @see https://storybook.js.org/docs/essentials/highlight#disable
     */
    disable?: boolean;
  };
}
interface HighlightMenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Title of the menu item */
  title: string;
  /** Description of the menu item */
  description?: string;
  /** Icon for the menu item, left side */
  iconLeft?: IconName;
  /** Icon for the menu item, right side */
  iconRight?: IconName;
  /** Name for a channel event to trigger when the menu item is clicked */
  clickEvent?: string;
  /** HTML selectors for which this menu item should show (subset of `selectors`) */
  selectors?: HighlightOptions['selectors'];
}
interface HighlightOptions {
  /** Unique identifier for the highlight, required if you want to remove the highlight later */
  id?: string;
  /** HTML selectors of the elements */
  selectors: string[];
  /** Priority of the highlight, higher takes precedence, defaults to 0 */
  priority?: number;
  /** CSS styles to apply to the highlight */
  styles?: Record<string, string>;
  /** CSS styles to apply to the highlight when it is hovered */
  hoverStyles?: Record<string, string>;
  /** CSS styles to apply to the highlight when it is focused or selected */
  focusStyles?: Record<string, string>;
  /** Keyframes required for animations */
  keyframes?: string;
  /** Groups of menu items to show when the highlight is selected */
  menu?: HighlightMenuItem[][];
}
interface ClickEventDetails {
  top: number;
  left: number;
  width: number;
  height: number;
  selectors: string[];
  element: {
    attributes: Record<string, string>;
    localName: string;
    tagName: string;
    outerHTML: string;
  };
}
//#endregion
export { HighlightTypes as i, HighlightMenuItem as n, HighlightOptions as r, ClickEventDetails as t };