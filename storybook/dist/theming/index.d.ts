import { a as Interpolation, c as SerializedStyles, i as FunctionInterpolation, n as CSSObject, o as Keyframes, s as EmotionCache, t as CSSInterpolation } from "../chunk-Dv2j21_S.js";
import { a as EmotionJSX, c as useTheme, i as ReactJSXIntrinsicElements, l as withTheme, n as CreateStyledComponent, o as Theme, r as StyledComponent, s as ThemeProvider, t as CreateStyled$1 } from "../chunk-CSYKg21N.js";
import { a as Easing, c as ThemeVars, d as Typography, f as background$1, h as typography$1, i as Color, l as ThemeVarsColors, m as tokens, n as Background, o as StorybookTheme, p as color$1, r as Brand, s as TextSize, t as Animation, u as ThemeVarsPartial } from "../chunk-By2eGsW5.js";
import { create, themes } from "./create.js";
import * as React$2 from "react";

//#region node_modules/@emotion/cache/dist/declarations/src/types.d.ts
interface StylisElement {
  type: string;
  value: string;
  props: Array<string> | string;
  root: StylisElement | null;
  parent: StylisElement | null;
  children: Array<StylisElement> | string;
  line: number;
  column: number;
  length: number;
  return: string;
}
type StylisPluginCallback = (element: StylisElement, index: number, children: Array<StylisElement>, callback: StylisPluginCallback) => string | void;
type StylisPlugin = (element: StylisElement, index: number, children: Array<StylisElement>, callback: StylisPluginCallback) => string | void;
//#endregion
//#region node_modules/@emotion/cache/dist/declarations/src/index.d.ts
interface Options {
  nonce?: string;
  stylisPlugins?: Array<StylisPlugin>;
  key: string;
  container?: Node;
  speedy?: boolean;
  /** @deprecate use `insertionPoint` instead */
  prepend?: boolean;
  insertionPoint?: HTMLElement;
}
declare let createCache: (options: Options) => EmotionCache;
//#endregion
//#region node_modules/@emotion/react/dist/declarations/src/context.d.ts
declare let CacheProvider: React$2.Provider<EmotionCache | null>;
//#endregion
//#region node_modules/@emotion/react/dist/declarations/src/jsx.d.ts
declare const jsx: typeof React$2.createElement;
declare namespace jsx {
  namespace JSX {
    type ElementType = EmotionJSX.ElementType;
    interface Element extends EmotionJSX.Element {}
    interface ElementClass extends EmotionJSX.ElementClass {}
    interface ElementAttributesProperty extends EmotionJSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends EmotionJSX.ElementChildrenAttribute {}
    type LibraryManagedAttributes<C, P> = EmotionJSX.LibraryManagedAttributes<C, P>;
    interface IntrinsicAttributes extends EmotionJSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> extends EmotionJSX.IntrinsicClassAttributes<T> {}
    type IntrinsicElements = EmotionJSX.IntrinsicElements;
  }
}
//#endregion
//#region node_modules/@emotion/react/dist/declarations/src/global.d.ts
interface GlobalProps {
  styles: Interpolation<Theme>;
}
declare let Global: React$2.FC<GlobalProps & React$2.RefAttributes<any>> | React$2.ForwardRefExoticComponent<GlobalProps & React$2.RefAttributes<any>>;
//#endregion
//#region node_modules/@emotion/react/dist/declarations/src/keyframes.d.ts
type Keyframes$1 = {
  name: string;
  styles: string;
  anim: 1;
  toString: () => string;
} & string;
declare function keyframes(template: TemplateStringsArray, ...args: CSSInterpolation[]): Keyframes$1;
declare function keyframes(...args: CSSInterpolation[]): Keyframes$1;
//#endregion
//#region node_modules/@emotion/react/dist/declarations/src/class-names.d.ts
interface ArrayClassNamesArg extends Array<ClassNamesArg> {}
type ClassNamesArg = undefined | null | string | boolean | {
  [className: string]: boolean | null | undefined;
} | ArrayClassNamesArg;
interface ClassNamesContent {
  css(template: TemplateStringsArray, ...args: Array<CSSInterpolation>): string;
  css(...args: Array<CSSInterpolation>): string;
  cx(...args: Array<ClassNamesArg>): string;
  theme: Theme;
}
interface ClassNamesProps {
  children(content: ClassNamesContent): React$2.ReactNode;
}
declare const ClassNames: React$2.FC<ClassNamesProps & React$2.RefAttributes<any>> | React$2.ForwardRefExoticComponent<ClassNamesProps & React$2.RefAttributes<any>>;
//#endregion
//#region node_modules/@emotion/react/dist/declarations/src/css.d.ts
declare function css(template: TemplateStringsArray, ...args: CSSInterpolation[]): SerializedStyles;
declare function css(...args: CSSInterpolation[]): SerializedStyles;
//#endregion
//#region node_modules/@emotion/styled/dist/declarations/src/index.d.ts
type StyledTags = { [Tag in keyof ReactJSXIntrinsicElements]: CreateStyledComponent<{
  theme?: Theme;
  as?: React.ElementType;
}, ReactJSXIntrinsicElements[Tag]> };
interface CreateStyled extends CreateStyled$1, StyledTags {}
declare const styled: CreateStyled;
//#endregion
//#region node_modules/@emotion/is-prop-valid/dist/declarations/src/index.d.ts
declare const isPropValid: (arg: string) => boolean;
//#endregion
//#region code/core/.dts-emit/code/core/src/theming/global.d.ts
type Value = string | number;
interface Return {
  [key: string]: {
    [key: string]: Value;
  };
}
declare const srOnlyStyles: {
  position: 'absolute';
  width: number;
  height: number;
  padding: number;
  margin: number;
  overflow: string;
  whiteSpace: 'nowrap';
  clip: string;
  clipPath: string;
  border: number;
};
declare const srOnlyUnsetStyles: {
  position: 'unset';
  width: 'unset';
  height: 'unset';
  padding: 'unset';
  margin: 'unset';
  overflow: 'unset';
  whiteSpace: 'unset';
  clip: 'unset';
  clipPath: 'unset';
  border: 'unset';
};
declare const createReset: ({
  typography
}: {
  typography: Typography;
}) => Return;
declare const createGlobal: ({
  color,
  background,
  typography
}: {
  color: Color;
  background: Background;
  typography: Typography;
}) => Return;
//#endregion
//#region code/core/.dts-emit/code/core/src/theming/convert.d.ts
declare const convert: (inherit?: ThemeVars) => StorybookTheme;
//#endregion
//#region code/core/.dts-emit/code/core/src/theming/ensure.d.ts
declare const ensure: (input: ThemeVars) => StorybookTheme;
//#endregion
//#region code/core/.dts-emit/code/core/src/theming/utils.d.ts
declare const lightenColor: (color: string) => string;
declare const darkenColor: (color: string) => string;
declare const getPreferredColorScheme: () => "dark" | "light";
//#endregion
//#region code/core/.dts-emit/code/core/src/theming/index.d.ts
type FunctionInterpolationEnhanced<T = {}> = FunctionInterpolation<T & {
  theme: StorybookTheme;
}>;
type InterpolationEnhanced<T = {}> = Interpolation<T & {
  theme: StorybookTheme;
}>;
declare const ignoreSsrWarning = "/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */";
declare module '.' {
  interface Theme extends StorybookTheme {}
}
//#endregion
export { Animation, Background, Brand, type CSSObject, CacheProvider, ClassNames, Color, Easing, type FunctionInterpolationEnhanced as FunctionInterpolation, Global, type InterpolationEnhanced as Interpolation, type Keyframes, StorybookTheme, type StyledComponent, TextSize, type Theme, ThemeProvider, ThemeVars, ThemeVarsColors, ThemeVarsPartial, Typography, background$1 as background, color$1 as color, convert, create, createCache, createGlobal, createReset, css, darkenColor as darken, ensure, getPreferredColorScheme, ignoreSsrWarning, isPropValid, jsx, keyframes, lightenColor as lighten, srOnlyStyles, srOnlyUnsetStyles, styled, themes, tokens, typography$1 as typography, useTheme, withTheme };