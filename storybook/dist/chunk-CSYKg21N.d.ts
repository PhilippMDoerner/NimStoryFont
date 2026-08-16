import { a as Interpolation, r as ComponentSelector } from "./chunk-Dv2j21_S.js";
import * as React$2 from "react";

//#region node_modules/@emotion/react/dist/declarations/src/types.d.ts
/**
 * @desc Utility type for getting props type of React component.
 * It takes `defaultProps` into an account - making props with defaults optional.
 */
type PropsOf<C extends keyof ReactJSX.IntrinsicElements | React.JSXElementConstructor<any>> = ReactJSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;
type DistributiveOmit<T, U> = T extends any ? Pick<T, Exclude<keyof T, U>> : never;
//#endregion
//#region node_modules/@emotion/react/dist/declarations/src/theming.d.ts
interface Theme {}
interface ThemeProviderProps {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  children: React$2.ReactNode;
}
interface ThemeProvider {
  (props: ThemeProviderProps): React$2.ReactElement;
}
declare const useTheme: () => Theme;
interface ThemeProviderProps {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  children: React$2.ReactNode;
}
declare const ThemeProvider: (props: ThemeProviderProps) => React$2.JSX.Element;
declare function withTheme<C extends React$2.ComponentType<React$2.ComponentProps<C>>>(Component: C): React$2.ForwardRefExoticComponent<DistributiveOmit<PropsOf<C>, 'theme'> & {
  theme?: Theme;
}>;
//#endregion
//#region node_modules/@emotion/react/dist/declarations/src/jsx-namespace.d.ts
type IsPreReact19$1 = 2 extends Parameters<React.FunctionComponent<any>>['length'] ? true : false;
type WithConditionalCSSProp<P> = 'className' extends keyof P ? string extends P['className' & keyof P] ? {
  css?: Interpolation<Theme>;
} : {} : {};
/** @ts-ignore */
type ReactJSXElement = true extends IsPreReact19$1 ? JSX.Element : React.JSX.Element;
/** @ts-ignore */
type ReactJSXElementClass = true extends IsPreReact19$1 ? JSX.ElementClass : React.JSX.ElementClass;
/** @ts-ignore */
type ReactJSXElementAttributesProperty = true extends IsPreReact19$1 ? JSX.ElementAttributesProperty : React.JSX.ElementAttributesProperty;
/** @ts-ignore */
type ReactJSXElementChildrenAttribute = true extends IsPreReact19$1 ? JSX.ElementChildrenAttribute : React.JSX.ElementChildrenAttribute;
/** @ts-ignore */
type ReactJSXLibraryManagedAttributes<C, P> = true extends IsPreReact19$1 ? JSX.LibraryManagedAttributes<C, P> : React.JSX.LibraryManagedAttributes<C, P>;
/** @ts-ignore */
type ReactJSXIntrinsicAttributes = true extends IsPreReact19$1 ? JSX.IntrinsicAttributes : React.JSX.IntrinsicAttributes;
/** @ts-ignore */
type ReactJSXIntrinsicClassAttributes<T> = true extends IsPreReact19$1 ? JSX.IntrinsicClassAttributes<T> : React.JSX.IntrinsicClassAttributes<T>;
/** @ts-ignore */
type ReactJSXIntrinsicElements$1 = true extends IsPreReact19$1 ? JSX.IntrinsicElements : React.JSX.IntrinsicElements;
/** @ts-ignore */
type ReactJSXElementType = true extends IsPreReact19$1 ? string | React.JSXElementConstructor<any> : React.JSX.ElementType;
declare namespace ReactJSX {
  type ElementType = ReactJSXElementType;
  interface Element extends ReactJSXElement {}
  interface ElementClass extends ReactJSXElementClass {}
  interface ElementAttributesProperty extends ReactJSXElementAttributesProperty {}
  interface ElementChildrenAttribute extends ReactJSXElementChildrenAttribute {}
  type LibraryManagedAttributes<C, P> = ReactJSXLibraryManagedAttributes<C, P>;
  interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
  interface IntrinsicClassAttributes<T> extends ReactJSXIntrinsicClassAttributes<T> {}
  type IntrinsicElements = ReactJSXIntrinsicElements$1;
}
declare namespace EmotionJSX {
  type ElementType = ReactJSXElementType;
  interface Element extends ReactJSXElement {}
  interface ElementClass extends ReactJSXElementClass {}
  interface ElementAttributesProperty extends ReactJSXElementAttributesProperty {}
  interface ElementChildrenAttribute extends ReactJSXElementChildrenAttribute {}
  type LibraryManagedAttributes<C, P> = P extends unknown ? WithConditionalCSSProp<P> & ReactJSXLibraryManagedAttributes<C, P> : never;
  interface IntrinsicAttributes extends ReactJSXIntrinsicAttributes {}
  interface IntrinsicClassAttributes<T> extends ReactJSXIntrinsicClassAttributes<T> {}
  type IntrinsicElements = { [K in keyof ReactJSXIntrinsicElements$1]: ReactJSXIntrinsicElements$1[K] & {
    css?: Interpolation<Theme>;
  } };
}
//#endregion
//#region node_modules/@emotion/styled/dist/declarations/src/jsx-namespace.d.ts
type IsPreReact19 = 2 extends Parameters<React.FunctionComponent<any>>['length'] ? true : false;
/** @ts-ignore */
type ReactJSXIntrinsicElements = true extends IsPreReact19 ? JSX.IntrinsicElements : React.JSX.IntrinsicElements;
//#endregion
//#region node_modules/@emotion/styled/dist/declarations/src/types.d.ts
/** Same as StyledOptions but shouldForwardProp must be a type guard */
interface FilteringStyledOptions<Props = Record<string, any>, ForwardedProps extends keyof Props & string = keyof Props & string> {
  label?: string;
  shouldForwardProp?: (propName: string) => propName is ForwardedProps;
  target?: string;
}
interface StyledOptions<Props = Record<string, any>> {
  label?: string;
  shouldForwardProp?: (propName: string) => boolean;
  target?: string;
}
/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
interface StyledComponent<ComponentProps extends {}, SpecificComponentProps extends {} = {}, JSXProps extends {} = {}> extends React.FC<ComponentProps & SpecificComponentProps & JSXProps>, ComponentSelector {
  withComponent<C extends React.ComponentClass<React.ComponentProps<C>>>(component: C): StyledComponent<ComponentProps & PropsOf<C>, {}, {
    ref?: React.Ref<InstanceType<C>>;
  }>;
  withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(component: C): StyledComponent<ComponentProps & PropsOf<C>>;
  withComponent<Tag extends keyof ReactJSXIntrinsicElements>(tag: Tag): StyledComponent<ComponentProps, ReactJSXIntrinsicElements[Tag]>;
}
/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
interface CreateStyledComponent<ComponentProps extends {}, SpecificComponentProps extends {} = {}, JSXProps extends {} = {}> {
  (template: TemplateStringsArray, ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & {
    theme: Theme;
  }>>): StyledComponent<ComponentProps, SpecificComponentProps, JSXProps>;
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {}>(template: TemplateStringsArray, ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & {
    theme: Theme;
  }>>): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {} = {}>(...styles: Array<Interpolation<ComponentProps & SpecificComponentProps & AdditionalProps & {
    theme: Theme;
  }>>): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps, JSXProps>;
}
/**
 * @desc
 * This function accepts a React component or tag ('div', 'a' etc).
 *
 * @example styled(MyComponent)({ width: 100 })
 * @example styled(MyComponent)(myComponentProps => ({ width: myComponentProps.width })
 * @example styled('div')({ width: 100 })
 * @example styled('div')<Props>(props => ({ width: props.width })
 */
interface CreateStyled {
  <C extends React.ComponentClass<React.ComponentProps<C>>, ForwardedProps extends keyof React.ComponentProps<C> & string = keyof React.ComponentProps<C> & string>(component: C, options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>): CreateStyledComponent<Pick<PropsOf<C>, ForwardedProps> & {
    theme?: Theme;
  }, {}, {
    ref?: React.Ref<InstanceType<C>>;
  }>;
  <C extends React.ComponentClass<React.ComponentProps<C>>>(component: C, options?: StyledOptions<React.ComponentProps<C>>): CreateStyledComponent<PropsOf<C> & {
    theme?: Theme;
  }, {}, {
    ref?: React.Ref<InstanceType<C>>;
  }>;
  <C extends React.ComponentType<React.ComponentProps<C>>, ForwardedProps extends keyof React.ComponentProps<C> & string = keyof React.ComponentProps<C> & string>(component: C, options: FilteringStyledOptions<React.ComponentProps<C>, ForwardedProps>): CreateStyledComponent<Pick<PropsOf<C>, ForwardedProps> & {
    theme?: Theme;
  }>;
  <C extends React.ComponentType<React.ComponentProps<C>>>(component: C, options?: StyledOptions<React.ComponentProps<C>>): CreateStyledComponent<PropsOf<C> & {
    theme?: Theme;
  }>;
  <Tag extends keyof ReactJSXIntrinsicElements, ForwardedProps extends keyof ReactJSXIntrinsicElements[Tag] & string = keyof ReactJSXIntrinsicElements[Tag] & string>(tag: Tag, options: FilteringStyledOptions<ReactJSXIntrinsicElements[Tag], ForwardedProps>): CreateStyledComponent<{
    theme?: Theme;
    as?: React.ElementType;
  }, Pick<ReactJSXIntrinsicElements[Tag], ForwardedProps>>;
  <Tag extends keyof ReactJSXIntrinsicElements>(tag: Tag, options?: StyledOptions<ReactJSXIntrinsicElements[Tag]>): CreateStyledComponent<{
    theme?: Theme;
    as?: React.ElementType;
  }, ReactJSXIntrinsicElements[Tag]>;
}
//#endregion
export { EmotionJSX as a, useTheme as c, ReactJSXIntrinsicElements as i, withTheme as l, CreateStyledComponent as n, Theme as o, StyledComponent as r, ThemeProvider as s, CreateStyled as t };