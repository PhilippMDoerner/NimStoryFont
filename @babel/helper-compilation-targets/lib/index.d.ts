declare const TargetNames: {
    node: string;
    deno: string;
    chrome: string;
    opera: string;
    edge: string;
    firefox: string;
    safari: string;
    ie: string;
    ios: string;
    android: string;
    electron: string;
    samsung: string;
    rhino: string;
    opera_mobile: string;
};

declare const unreleasedLabels: {
    readonly safari: "tp";
};

// Targets, engine names defined in compat-tables
type Target =
  | "node"
  | "deno"
  | "chrome"
  | "opera"
  | "edge"
  | "firefox"
  | "safari"
  | "ie"
  | "ios"
  | "android"
  | "electron"
  | "samsung"
  | "opera_mobile";

type Targets = Partial<Record<Target, string>>;

type Browsers = string | readonly string[];

type InputTargets = {
  browsers?: Browsers;
  // When `true` or `"intersect"`, this is intersected with the `browsers`
  // option (giving the higher browsers as the result).
  esmodules?: boolean | "intersect";
} & Targets;

declare function prettifyTargets(targets: Targets): Targets;

declare function getInclusionReasons(item: string, targetVersions: Targets, list: Record<string, Targets>): Partial<Record<Target, string>>;

declare function isRequired(name: string, targets: Targets, { compatData, includes, excludes, }?: {
    compatData?: Record<string, Targets>;
    includes?: Set<string>;
    excludes?: Set<string>;
}): boolean;
declare function filterItems(list: Record<string, Targets>, includes: Set<string>, excludes: Set<string>, targets: Targets, defaultIncludes: string[] | null, defaultExcludes?: string[] | null, pluginSyntaxMap?: Map<string, string | null>): Set<string>;

declare function isBrowsersQueryValid(browsers: unknown): boolean;
type GetTargetsOption = {
    configPath?: string;
    configFile?: string;
    browserslistEnv?: string;
    ignoreBrowserslistConfig?: boolean;
    onBrowserslistConfigFound?: (configFile: string) => void;
};
declare function getTargets(inputTargets?: InputTargets, options?: GetTargetsOption): Targets;

export { type InputTargets, type Target, TargetNames, type Targets, getTargets as default, filterItems, getInclusionReasons, isBrowsersQueryValid, isRequired, prettifyTargets, unreleasedLabels };
