import { c as ThemeVars, u as ThemeVarsPartial } from "../chunk-By2eGsW5.js";

//#region code/core/.dts-emit/code/core/src/theming/create.d.ts
interface Themes {
  light: ThemeVars;
  dark: ThemeVars;
  normal: ThemeVars;
}
declare const themes: Themes;
interface Rest {
  [key: string]: unknown;
}
declare const create: (vars?: ThemeVarsPartial, rest?: Rest) => ThemeVars;
//#endregion
export { create, themes };