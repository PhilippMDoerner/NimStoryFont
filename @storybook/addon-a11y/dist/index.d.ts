import { i as SelectorWithoutNode, n as ContextObjectWithoutNode, r as ContextSpecWithoutNode, t as A11yParameters } from "./chunk-lw2YNZji.js";
import { AxeResults, NodeResult, Result } from "axe-core";

//#region code/addons/a11y/.dts-emit/code/addons/a11y/src/types.d.ts
type A11yReport = EnhancedResults | {
  error: Error;
};
interface A11yParameters$1 {
  /**
   * Accessibility configuration
   *
   * @see https://storybook.js.org/docs/writing-tests/accessibility-testing
   */
  a11y?: A11yParameters;
}
interface A11yGlobals {
  /**
   * Accessibility configuration
   *
   * @see https://storybook.js.org/docs/writing-tests/accessibility-testing
   */
  a11y?: {
    /**
     * Prevent the addon from executing automated accessibility checks upon visiting a story. You
     * can still trigger the checks from the addon panel.
     *
     * @see https://storybook.js.org/docs/writing-tests/accessibility-testing#disable-automated-checks
     */
    manual?: boolean;
  };
}
type EnhancedNodeResult = NodeResult & {
  linkPath: string;
};
type EnhancedResult = Omit<Result, 'nodes'> & {
  nodes: EnhancedNodeResult[];
};
type EnhancedResults = Omit<AxeResults, 'incomplete' | 'passes' | 'violations'> & {
  incomplete: EnhancedResult[];
  passes: EnhancedResult[];
  violations: EnhancedResult[];
};
interface A11yTypes {
  parameters: A11yParameters$1;
  globals: A11yGlobals;
}
//#endregion
//#region code/addons/a11y/.dts-emit/code/addons/a11y/src/constants.d.ts
declare const PARAM_KEY = "a11y";
//#endregion
//#region code/addons/a11y/.dts-emit/code/addons/a11y/src/index.d.ts
declare function _default(): import("storybook/internal/csf").PreviewAddon<A11yTypes>;
//#endregion
export { type A11yGlobals, A11yParameters, type A11yReport, type A11yTypes, ContextObjectWithoutNode, ContextSpecWithoutNode, PARAM_KEY, SelectorWithoutNode, _default as default };