import { Bs as Settings, Hs as globalSettings, Vs as _clearGlobalSettings, Xa as StorybookConfigRaw$1, ao as SupportedFramework$1, io as SupportedRenderer$1, oo as SupportedBuilder$1 } from "../chunk-Cp-ouEY1.js";
import { t as JsPackageManager$1 } from "../chunk-D4hRFgkh.js";
import { Feature, SupportedFramework, SupportedLanguage, SupportedRenderer } from "storybook/internal/types";
import { JsPackageManager, PackageJson as PackageJson$1, PackageManagerName } from "storybook/internal/common";

//#region code/core/.dts-emit/code/core/src/cli/detect.d.ts
declare function detectPnp(): Promise<boolean>;
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/helpers.d.ts
declare function readFileAsJson(jsonPath: string, allowComments?: boolean): any;
declare const writeFileAsJson: (jsonPath: string, content: unknown) => boolean;
/**
 * Detect if any babel dependencies need to be added to the project This is currently used by
 * react-native generator
 *
 * @example
 *
 * ```ts
 * const babelDependencies = await getBabelDependencies(
 *   packageManager,
 *   npmOptions,
 *   packageJson
 * ); // you can then spread the result when using installDependencies
 * installDependencies(npmOptions, [
 *   `@storybook/react@${storybookVersion}`,
 *   ...babelDependencies,
 * ]);
 * ```
 *
 * @param packageJson The current package.json so we can inspect its contents
 * @returns Contains the packages and versions that need to be installed
 */
declare function getBabelDependencies(packageManager: JsPackageManager): Promise<string[]>;
declare function addToDevDependenciesIfNotPresent(packageJson: PackageJson$1, name: string, packageVersion: string): void;
declare function copyTemplate(templateRoot: string, destination?: string): void;
type CopyTemplateFilesOptions = {
  packageManager: JsPackageManager;
  templateLocation: SupportedFramework | SupportedRenderer;
  language: SupportedLanguage;
  commonAssetsDir?: string;
  destination?: string;
  features: Set<Feature>;
};
/**
 * Return the installed version of a package, or the coerced version specifier from package.json if
 * it's a dependency but not installed (e.g. in a fresh project)
 */
declare function getVersionSafe(packageManager: JsPackageManager, packageName: string): Promise<string | undefined>;
declare const cliStoriesTargetPath: () => Promise<"./src/stories" | "./stories">;
declare function copyTemplateFiles({
  packageManager,
  templateLocation,
  language,
  destination,
  commonAssetsDir,
  features
}: CopyTemplateFilesOptions): Promise<void>;
declare function adjustTemplate(templatePath: string, templateData: Record<string, any>): Promise<void>;
declare function coerceSemver(version: string): import("semver").SemVer;
declare function hasStorybookDependencies(packageManager: JsPackageManager): boolean;
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/angular/helpers.d.ts
declare const ANGULAR_JSON_PATH = "angular.json";
/** A path into a JSON document, e.g. `['projects', 'app', 'architect', 'storybook', 'builder']`. */
type JSONEditPath = (string | number)[];
/** Apply a format-preserving edit to a JSON string at `path`. `value === undefined` removes it. */
declare const editJsonText: (text: string, path: JSONEditPath, value: unknown) => string;
/** An `angular.json` architect target or Nx `project.json` target. */
interface StorybookBuilderTarget {
  builder?: string;
  executor?: string;
  options?: {
    compodoc?: boolean;
    experimentalZoneless?: boolean;
    [key: string]: unknown;
  };
}
declare const isStorybookTarget: (target: unknown) => target is StorybookBuilderTarget;
declare class AngularJSON {
  json: {
    projects: Record<string, {
      root: string;
      projectType: string;
      architect: Record<string, any>;
    }>;
  };
  private rawText;
  private readonly path;
  constructor(path?: string);
  /** Apply a format-preserving edit at `path` and keep `json` in sync with the result. */
  edit(path: JSONEditPath, value: unknown): void;
  get projects(): Record<string, {
    root: string;
    projectType: string;
    architect: Record<string, any>;
  }>;
  get projectsWithoutStorybook(): string[];
  get hasStorybookBuilder(): boolean;
  get rootProject(): {
    root: string;
    projectType: string;
    architect: Record<string, any>;
  } | null;
  getProjectSettingsByName(projectName: string): {
    root: string;
    projectType: string;
    architect: Record<string, any>;
  };
  getProjectName(): Promise<string>;
  addStorybookEntries({
    angularProjectName,
    storybookFolder,
    useCompodoc,
    root,
    useVite
  }: {
    angularProjectName: string;
    storybookFolder: string;
    useCompodoc: boolean;
    root: string;
    useVite?: boolean;
  }): void;
  write(): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/dirs.d.ts
declare function getRendererDir(packageManager: JsPackageManager, renderer: SupportedFramework | SupportedRenderer): Promise<string | null>;
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/projectTypes.d.ts
declare enum ProjectType {
  ANGULAR = "angular",
  EMBER = "ember",
  HTML = "html",
  NEXTJS = "nextjs",
  NUXT = "nuxt",
  NX = "nx",
  PREACT = "preact",
  QWIK = "qwik",
  REACT = "react",
  TANSTACK_REACT = "tanstack_react",
  REACT_NATIVE = "react_native",
  REACT_NATIVE_AND_RNW = "react_native_and_rnw",
  REACT_NATIVE_WEB = "react_native_web",
  REACT_SCRIPTS = "react_scripts",
  SERVER = "server",
  SOLID = "solid",
  SVELTE = "svelte",
  SVELTEKIT = "sveltekit",
  UNDETECTED = "undetected",
  UNSUPPORTED = "unsupported",
  VUE3 = "vue3",
  WEB_COMPONENTS = "web_components"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/NpmOptions.d.ts
type NpmOptions = Parameters<JsPackageManager$1['addDependencies']>[0];
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/eslintPlugin.d.ts
declare const SUPPORTED_ESLINT_EXTENSIONS: string[];
declare const findEslintFile: (instanceDir: string) => string | undefined;
declare const configureFlatConfig: (code: string) => Promise<string>;
declare function extractEslintInfo(packageManager: JsPackageManager): Promise<{
  hasEslint: boolean;
  isStorybookPluginInstalled: boolean;
  eslintConfigFile: string | undefined;
  unsupportedExtension?: string;
  isFlatConfig: boolean;
}>;
declare const normalizeExtends: (existingExtends: any) => string[];
declare function configureEslintPlugin({
  eslintConfigFile,
  packageManager,
  isFlatConfig
}: {
  eslintConfigFile: string | undefined;
  packageManager: JsPackageManager;
  isFlatConfig: boolean;
}): Promise<void>;
declare const suggestESLintPlugin: () => Promise<boolean>;
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/AddonVitestService.d.ts
type Result = {
  compatible: boolean;
  reasons?: string[];
};
interface AddonVitestCompatibilityOptions {
  builder?: SupportedBuilder$1;
  framework?: SupportedFramework$1 | null;
  projectRoot?: string;
}
/**
 * Centralized service for @storybook/addon-vitest dependency collection and compatibility
 * validation
 *
 * This service consolidates logic from:
 *
 * - Code/addons/vitest/src/postinstall.ts
 * - Code/lib/create-storybook/src/addon-dependencies/addon-vitest.ts
 * - Code/lib/create-storybook/src/services/FeatureCompatibilityService.ts
 */
declare class AddonVitestService {
  private readonly packageManager;
  constructor(packageManager: JsPackageManager);
  /**
   * Reduce a Vitest version specifier (exact or range) to a single concrete version for
   * `semver.satisfies` comparisons, so dependency collection and postinstall template selection make
   * the same major/minor decision. Uses the lower bound of a valid range, then coerces so a
   * prerelease like `4.0.0-beta.1` is treated as `4.0.0` rather than failing `>=4.0.0`.
   */
  static getComparableVersion(specifier: string | null | undefined): string | undefined;
  /**
   * Collect all dependencies needed for @storybook/addon-vitest
   *
   * Returns versioned package strings ready for installation:
   *
   * - Base packages: vitest, @vitest/browser, playwright
   * - Next.js specific: @storybook/nextjs-vite
   * - Coverage reporter: @vitest/coverage-v8
   */
  collectDependencies(): Promise<string[]>;
  /**
   * Install Playwright browser binaries for @storybook/addon-vitest
   *
   * Installs Chromium via `npx playwright install chromium`. In CI environments and on
   * macOS/Windows (officially supported platforms), also installs system-level browser dependencies
   * via `--with-deps`. On other platforms (e.g. Linux), `--with-deps` is omitted to avoid requiring
   * `sudo` — system packages are typically managed by the distro package manager.
   *
   * @param packageManager - The package manager to use for installation
   * @param prompt - The prompt instance for displaying progress
   * @param logger - The logger instance for displaying messages
   * @param options - Installation options
   * @returns Array of error messages if installation fails
   */
  installPlaywright(options?: {
    yes?: boolean; /** Is set to true if Storybook didn't install the dependencies yet */
    useRemotePkg?: boolean;
  }): Promise<{
    errors: string[];
    result: 'installed' | 'skipped' | 'aborted' | 'failed';
  }>;
  /**
   * Validate full compatibility for @storybook/addon-vitest
   *
   * Checks:
   *
   * - Webpack configuration compatibility
   * - Builder compatibility (Vite or Next.js)
   * - Renderer/framework support
   * - Vitest version (>=3.0.0)
   * - MSW version (>=2.0.0 if installed)
   * - Next.js installation (if using @storybook/nextjs)
   * - Vitest config files (if configDir provided)
   */
  validateCompatibility(options: AddonVitestCompatibilityOptions): Promise<Result>;
  /**
   * Validate package versions for addon-vitest compatibility Public method to allow early
   * validation before framework detection
   */
  validatePackageVersions(): Promise<Result>;
  /**
   * Validate vitest config files for addon compatibility
   *
   * Public method that can be used by both postinstall and create-storybook flows
   */
  validateConfigFiles(directory: string): Promise<Result>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/detectLanguage.d.ts
/**
 * Detect whether the project should be treated as TypeScript or JavaScript. The js/tsconfig lookup
 * happens in `workingDir`, which defaults to the process cwd for callers (like `storybook init`)
 * that already run from the project root.
 */
declare function detectLanguage(packageManager: JsPackageManager, workingDir?: string): Promise<SupportedLanguage>;
/** Check installed tooling versions for TypeScript compatibility constraints */
declare function detectIncompatiblePackageVersions(packageManager: JsPackageManager): Promise<string[]>;
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/getStorybookData.d.ts
/**
 * The project directory the config dir lives in, used to resolve story globs and to locate
 * `tsconfig.json`/`jsconfig.json` for language detection. Taking `dirname` before resolving (not
 * after) keeps `--config-dir .` anchored to the project root instead of its parent.
 */
declare function getWorkingDir(configDir: string): string;
/**
 * Gathers the project metadata CLI commands need from the target Storybook: config, framework,
 * package manager, installed version, and story paths. The canonical collector — `automigrate`,
 * `doctor`, `add`, and `ai setup` all consume it.
 */
declare const getStorybookData: ({
  configDir: userDefinedConfigDir,
  packageManagerName,
  skipCache
}: {
  configDir?: string;
  packageManagerName?: PackageManagerName;
  /**
   * Skip the module cache when reading the main config. Pass `true` when a prior step in the same
   * process (e.g. an automigration) may have rewritten the main config on disk, otherwise this
   * would read back the module system's cached evaluation from before that rewrite.
   */
  skipCache?: boolean;
}) => Promise<{
  configDir: string;
  workingDir: string;
  mainConfig: StorybookConfigRaw$1; /** The version specifier of Storybook from the user's package.json */
  versionSpecifier: string | undefined; /** The version of Storybook installed in the user's project */
  versionInstalled: string | undefined;
  mainConfigPath: string | undefined;
  previewConfigPath: string | undefined;
  packageManager: import("storybook/internal/common").JsPackageManager;
  storiesPaths: string[];
  hasCsfFactoryPreview: boolean;
  frameworkPackage: string | undefined;
  rendererPackage: string | undefined;
  renderer: SupportedRenderer$1 | undefined;
  builderPackage: string | undefined;
  addons: string[];
}>;
type GetStorybookData = typeof getStorybookData;
//#endregion
export { ANGULAR_JSON_PATH, AddonVitestCompatibilityOptions, AddonVitestService, AngularJSON, GetStorybookData, JSONEditPath, NpmOptions, ProjectType, SUPPORTED_ESLINT_EXTENSIONS, Settings, StorybookBuilderTarget, _clearGlobalSettings, addToDevDependenciesIfNotPresent, adjustTemplate, cliStoriesTargetPath, coerceSemver, configureEslintPlugin, configureFlatConfig, copyTemplate, copyTemplateFiles, detectIncompatiblePackageVersions, detectLanguage, detectPnp, editJsonText, extractEslintInfo, findEslintFile, getBabelDependencies, getRendererDir, getStorybookData, getVersionSafe, getWorkingDir, globalSettings, hasStorybookDependencies, isStorybookTarget, normalizeExtends, readFileAsJson, suggestESLintPlugin, writeFileAsJson };