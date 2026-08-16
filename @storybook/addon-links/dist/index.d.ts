import { ComponentTitle, StoryId, StoryKind, StoryName } from "storybook/internal/types";

//#region code/addons/links/.dts-emit/code/addons/links/src/utils.d.ts
interface ParamsId {
  storyId: StoryId;
}
interface ParamsCombo {
  kind?: StoryKind;
  title?: ComponentTitle;
  story?: StoryName;
  name?: StoryName;
}
declare const navigate: (params: ParamsId | ParamsCombo) => void;
declare const hrefTo: (title: ComponentTitle, name: StoryName) => Promise<string>;
declare const linkTo: (idOrTitle: string | ((...args: any[]) => string), nameInput?: string | ((...args: any[]) => string)) => (...args: any[]) => void;
declare const withLinks: (...args: any) => any;
//#endregion
//#region code/addons/links/.dts-emit/code/addons/links/src/index.d.ts
declare function _default(): import("storybook/internal/csf").PreviewAddon<import("storybook/internal/csf").AddonTypes>;
//#endregion
export { _default as default, hrefTo, linkTo, navigate, withLinks };