import { c as SerializedStyles, o as Keyframes } from "./chunk-Dv2j21_S.js";

//#region code/core/.dts-emit/code/core/src/theming/animation.d.ts
declare const easing: {
  rubber: string;
};
declare const animation: {
  readonly rotate360: Keyframes;
  readonly glow: Keyframes;
  readonly float: Keyframes;
  readonly jiggle: Keyframes;
  readonly inlineGlow: SerializedStyles;
  readonly hoverable: SerializedStyles;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/theming/base.d.ts
declare const color: {
  primary: string;
  secondary: string;
  tertiary: string;
  ancillary: string;
  orange: string;
  gold: string;
  green: string;
  seafoam: string;
  purple: string;
  ultraviolet: string;
  lightest: string;
  lighter: string;
  light: string;
  mediumlight: string;
  medium: string;
  mediumdark: string;
  dark: string;
  darker: string;
  darkest: string;
  border: string;
  positive: string;
  warning: string;
  negative: string;
  critical: string;
  defaultText: string;
  inverseText: string;
  positiveText: string;
  warningText: string;
  negativeText: string;
};
declare const background: {
  app: string;
  bar: string;
  content: string;
  preview: string;
  gridCellSize: number;
  hoverable: string;
  positive: string;
  warning: string;
  negative: string;
  critical: string;
};
declare const typography: {
  fonts: {
    base: string;
    mono: string;
  };
  weight: {
    regular: number;
    bold: number;
  };
  size: {
    s1: number;
    s2: number;
    s3: number;
    m1: number;
    m2: number;
    m3: number;
    l1: number;
    l2: number;
    l3: number;
    code: number;
  };
};
declare const tokens: {
  light: {
    fgColor: {
      default: string;
      muted: string;
      accent: string;
      inverse: string;
      positive: string;
      warning: string;
      negative: string;
      critical: string;
      agentic: string;
    };
    bgColor: {
      default: string;
      muted: string;
      positive: string;
      warning: string;
      negative: string;
      critical: string;
      agentic: string;
    };
    borderColor: {
      default: string;
      muted: string;
      inverse: string;
      positive: string;
      warning: string;
      negative: string;
      critical: string;
      agentic: string;
    };
  };
  dark: {
    fgColor: {
      default: string;
      muted: string;
      accent: string;
      inverse: string;
      positive: string;
      warning: string;
      negative: string;
      critical: string;
      agentic: string;
    };
    bgColor: {
      default: string;
      muted: string;
      positive: string;
      warning: string;
      negative: string;
      critical: string;
      agentic: string;
    };
    borderColor: {
      default: string;
      muted: string;
      inverse: string;
      positive: string;
      warning: string;
      negative: string;
      critical: string;
      agentic: string;
    };
  };
};
//#endregion
//#region code/core/.dts-emit/code/core/src/theming/types.d.ts
interface ThemeVars extends ThemeVarsBase, ThemeVarsColors {}
interface ThemeVarsPartial extends ThemeVarsBase, Partial<ThemeVarsColors> {}
interface ThemeVarsBase {
  base: 'light' | 'dark';
}
interface ThemeVarsColors {
  colorPrimary: string;
  colorSecondary: string;
  appBg: string;
  appContentBg: string;
  appHoverBg: string;
  appPreviewBg: string;
  appBorderColor: string;
  appBorderRadius: number;
  fontBase: string;
  fontCode: string;
  textColor: string;
  textInverseColor: string;
  textMutedColor: string;
  barTextColor: string;
  barHoverColor: string;
  barSelectedColor: string;
  barBg: string;
  buttonBg: string;
  buttonBorder: string;
  booleanBg: string;
  booleanSelectedBg: string;
  inputBg: string;
  inputBorder: string;
  inputTextColor: string;
  inputBorderRadius: number;
  brandTitle?: string;
  brandUrl?: string;
  brandImage?: string;
  brandTarget?: string;
  gridCellSize?: number;
}
type Color = typeof color;
type Background = typeof background;
type Typography = typeof typography;
type Animation = typeof animation;
type Easing = typeof easing;
type TextSize = number | string;
interface Brand {
  title: string | undefined;
  url: string | null | undefined;
  image: string | null | undefined;
  target: string | null | undefined;
}
interface StorybookTheme {
  color: Color;
  fgColor: typeof tokens.light.fgColor;
  bgColor: typeof tokens.light.bgColor;
  borderColor: typeof tokens.light.borderColor;
  background: Background;
  typography: Typography;
  animation: Animation;
  easing: Easing;
  input: {
    border: string;
    background: string;
    color: string;
    borderRadius: number;
  };
  layoutMargin: number;
  appBorderColor: string;
  appBorderRadius: number;
  barTextColor: string;
  barHoverColor: string;
  barSelectedColor: string;
  barBg: string;
  brand: Brand;
  code: {
    [key: string]: string | object;
  };
  [key: string]: any;
}
//#endregion
export { Easing as a, ThemeVars as c, Typography as d, background as f, typography as h, Color as i, ThemeVarsColors as l, tokens as m, Background as n, StorybookTheme as o, color as p, Brand as r, TextSize as s, Animation as t, ThemeVarsPartial as u };