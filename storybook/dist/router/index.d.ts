import { _ as Action, a as RenderData, b as To, c as StoryData, d as getMatch, f as parsePath, g as HydrationState, h as Navigator, i as Other, l as buildArgsParam, m as stringifyQuery, n as NavigateFunction, o as RouterData, p as queryFromLocation, r as NavigateOptions, s as DEEPLY_EQUAL, t as LinkProps, u as deepDiff, v as InitialEntry, y as Location$1 } from "../chunk-BxCdsGId.js";
import * as React$1 from "react";
import React, { ReactElement, ReactNode } from "react";

//#region node_modules/react-router/dist/lib/components.d.ts
interface FutureConfig {
  v7_startTransition: boolean;
}
interface MemoryRouterProps {
  basename?: string;
  children?: React$1.ReactNode;
  initialEntries?: InitialEntry[];
  initialIndex?: number;
  future?: FutureConfig;
}
/**
 * A <Router> that stores all entries in memory.
 *
 * @see https://reactrouter.com/router-components/memory-router
 */
declare function MemoryRouter$1({
  basename,
  children,
  initialEntries,
  initialIndex,
  future
}: MemoryRouterProps): React$1.ReactElement;
interface RouterProps {
  basename?: string;
  children?: React$1.ReactNode;
  location: Partial<Location$1> | string;
  navigationType?: Action;
  navigator: Navigator;
  static?: boolean;
}
/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a <Router> directly. Instead, you'll render a
 * router that is more specific to your environment such as a <BrowserRouter>
 * in web browsers or a <StaticRouter> for server rendering.
 *
 * @see https://reactrouter.com/router-components/router
 */
declare function Router({
  basename: basenameProp,
  children,
  location: locationProp,
  navigationType,
  navigator,
  static: staticProp
}: RouterProps): React$1.ReactElement | null;
//#endregion
//#region node_modules/react-router-dom/dist/index.d.ts
declare global {
  var __staticRouterHydrationData: HydrationState | undefined;
}
interface BrowserRouterProps {
  basename?: string;
  children?: React$1.ReactNode;
  future?: FutureConfig;
  window?: Window;
}
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */
declare function BrowserRouter({
  basename,
  children,
  future,
  window
}: BrowserRouterProps): React$1.JSX.Element;
//#endregion
//#region code/core/.dts-emit/code/core/src/router/router.d.ts
interface MatchingData {
  match: null | {
    path: string;
  };
}
interface LocationProps {
  children: (renderData: RenderData) => any;
}
interface MatchPropsStartsWith {
  path: string;
  startsWith: boolean;
  children: (matchingData: MatchingData) => ReactNode;
}
interface MatchPropsDefault {
  path: RegExp;
  startsWith: false;
  children: (matchingData: MatchingData) => ReactNode;
}
interface RoutePropsStartsWith {
  path: string;
  startsWith?: boolean;
  children: ReactNode;
}
interface RoutePropsDefault {
  path: RegExp;
  startsWith?: false;
  children: ReactNode;
}
declare const useNavigate: () => (to: To | number, {
  plain,
  ...options
}?: NavigateOptions) => void;
declare function Link({
  to,
  children,
  ...rest
}: LinkProps): React.JSX.Element;
declare namespace Link {
  var displayName: string;
}
declare function Location({
  children
}: LocationProps): React.JSX.Element;
declare namespace Location {
  var displayName: string;
}
/**
 * A render-prop component for rendering when a certain path is hit. It's immensely similar to
 * `Location` but it receives an addition data property: `match`. match has a truthy value when the
 * path is hit.
 */
declare function Match(props: MatchPropsStartsWith): ReactElement;
declare namespace Match {
  var displayName: string;
}
declare function Match(props: MatchPropsDefault): ReactElement;
/** A component to conditionally render children based on matching a target path */
declare function Route(props: RoutePropsDefault): ReactElement;
declare namespace Route {
  var displayName: string;
}
declare function Route(props: RoutePropsStartsWith): ReactElement;
declare const LocationProvider: typeof BrowserRouter;
declare const BaseLocationProvider: typeof Router;
declare const MemoryRouter: typeof MemoryRouter$1;
//#endregion
export { BaseLocationProvider, DEEPLY_EQUAL, Link, LinkProps, Location, LocationProvider, Match, MemoryRouter, NavigateFunction, NavigateOptions, Other, RenderData, Route, RouterData, StoryData, buildArgsParam, deepDiff, getMatch, parsePath, queryFromLocation, stringifyQuery, useNavigate };