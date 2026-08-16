import { h as ChannelLike } from "../chunk-DgWlWC_3.js";
import { Oo as IndexEntry$1 } from "../chunk-Cp-ouEY1.js";
import { n as registerService } from "../chunk-BoJt3T-D.js";
import { a as getPrettyPackageManagerName, c as PackageJson, d as ExecuteCommandOptions, f as executeCommand, i as getPackageDetails, l as PackageJsonWithDepsAndDevDeps, m as executeNodeCommand, n as PackageJsonInfo, o as InstallationMetadata, p as executeCommandSync, r as PackageManagerName, s as PackageMetadata, t as JsPackageManager, u as PackageJsonWithMaybeDeps } from "../chunk-D4hRFgkh.js";
import { BuilderOptions, CLIOptions, CoreCommon_AddonInfo, CoreCommon_ResolvedAddonPreset, CoreCommon_ResolvedAddonVirtual, CoreCommon_StorybookInfo, CoreWebpackCompiler, IndexEntry, LoadOptions, LoadedPreset, NormalizedStoriesSpecifier, Options, PackageJson as PackageJson$1, PresetConfig, Presets, Ref, StoriesEntry, StorybookConfig, StorybookConfigRaw, SupportedBuilder, SupportedFramework, SupportedRenderer } from "storybook/internal/types";
import { ConfigFile } from "storybook/internal/csf-tools";
import { WriteStream } from "node:fs";
import { types } from "storybook/internal/babel";
import { isWebContainer } from "@webcontainer/env";

//#region node_modules/type-fest/source/merge-exclusive.d.ts
// Helper type. Not useful on its own.
type Without<FirstType, SecondType> = { [KeyType in Exclude<keyof FirstType, keyof SecondType>]?: never };
/**
Create a type that has mutually exclusive keys.

This type was inspired by [this comment](https://github.com/Microsoft/TypeScript/issues/14094#issuecomment-373782604).

This type works with a helper type, called `Without`. `Without<FirstType, SecondType>` produces a type that has only keys from `FirstType` which are not present on `SecondType` and sets the value type for these keys to `never`. This helper type is then used in `MergeExclusive` to remove keys from either `FirstType` or `SecondType`.

@example
```
import type {MergeExclusive} from 'type-fest';

type ExclusiveVariation1 = {
	exclusive1: boolean;
};

type ExclusiveVariation2 = {
	exclusive2: string;
};

type ExclusiveOptions = MergeExclusive<ExclusiveVariation1, ExclusiveVariation2>;

let exclusiveOptions: ExclusiveOptions;

exclusiveOptions = {exclusive1: true};
// Works

exclusiveOptions = {exclusive2: 'hi'};
// Works

// @ts-expect-error
exclusiveOptions = {exclusive1: true, exclusive2: 'hi'};
// Error
```

@category Object
*/
type MergeExclusive<FirstType, SecondType> = (FirstType | SecondType) extends object ? (Without<FirstType, SecondType> & SecondType) | (Without<SecondType, FirstType> & FirstType) : FirstType | SecondType;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/versions.d.ts
declare const _default: {
  '@storybook/addon-a11y': string;
  '@storybook/addon-docs': string;
  '@storybook/addon-links': string;
  '@storybook/addon-onboarding': string;
  'storybook-addon-pseudo-states': string;
  '@storybook/addon-themes': string;
  '@storybook/addon-vitest': string;
  '@storybook/builder-vite': string;
  '@storybook/builder-webpack5': string;
  storybook: string;
  '@storybook/angular': string;
  '@storybook/angular-vite': string;
  '@storybook/ember': string;
  '@storybook/html-vite': string;
  '@storybook/nextjs': string;
  '@storybook/nextjs-vite': string;
  '@storybook/preact-vite': string;
  '@storybook/react-native-web-vite': string;
  '@storybook/react-vite': string;
  '@storybook/react-webpack5': string;
  '@storybook/server-webpack5': string;
  '@storybook/svelte-vite': string;
  '@storybook/sveltekit': string;
  '@storybook/tanstack-react': string;
  '@storybook/vue3-vite': string;
  '@storybook/web-components-vite': string;
  sb: string;
  '@storybook/cli': string;
  '@storybook/codemod': string;
  '@storybook/core-webpack': string;
  'create-storybook': string;
  '@storybook/csf-plugin': string;
  'eslint-plugin-storybook': string;
  '@storybook/react-dom-shim': string;
  '@storybook/preset-create-react-app': string;
  '@storybook/preset-react-webpack': string;
  '@storybook/preset-server-webpack': string;
  '@storybook/html': string;
  '@storybook/preact': string;
  '@storybook/react': string;
  '@storybook/server': string;
  '@storybook/svelte': string;
  '@storybook/vue3': string;
  '@storybook/web-components': string;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/common/presets.d.ts
type InterPresetOptions = Omit<CLIOptions & LoadOptions & BuilderOptions & {
  isCritical?: boolean;
  build?: StorybookConfigRaw['build'];
}, 'frameworkPresets'>;
declare function filterPresetsConfig(presetsConfig: PresetConfig[]): PresetConfig[];
/**
 * Parse an addon into either a managerEntries or a preset. Throw on invalid input.
 *
 * Valid inputs:
 *
 * - `'@storybook/addon-docs/preset' => { type: 'presets', item }`
 * - `'@storybook/addon-docs' => { type: 'presets', item: '@storybook/addon-docs/preset' }`
 * - `{ name: '@storybook/addon-docs(/preset)?', options: { } } => { type: 'presets', item: { name:
 *   '@storybook/addon-docs/preset', options } }`
 */
declare const resolveAddonName: (configDir: string, name: string, options: any) => CoreCommon_ResolvedAddonPreset | CoreCommon_ResolvedAddonVirtual | undefined;
declare function loadPreset(input: PresetConfig, level: number, storybookOptions: InterPresetOptions): Promise<LoadedPreset[]>;
declare function getPresets(presets: PresetConfig[], storybookOptions: InterPresetOptions): Promise<Presets>;
declare function loadAllPresets(options: CLIOptions & LoadOptions & BuilderOptions & {
  corePresets: PresetConfig[];
  overridePresets: PresetConfig[]; /** Whether preset failures should be critical or not */
  isCritical?: boolean;
  build?: StorybookConfigRaw['build'];
  channel: ChannelLike;
}): Promise<Presets>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/file-cache.d.ts
interface FileSystemCacheOptions {
  ns?: string;
  prefix?: string;
  hash_alg?: string;
  basePath?: string;
  ttl?: number;
}
interface CacheItem {
  key: string;
  content?: any;
  value?: any;
}
interface CacheSetOptions {
  ttl?: number;
  encoding?: BufferEncoding;
}
declare class FileSystemCache {
  private prefix;
  private hash_alg;
  private cache_dir;
  private ttl;
  constructor(options?: FileSystemCacheOptions);
  private generateHash;
  private isExpired;
  private parseCacheData;
  private parseSetData;
  get<T = any>(name: string, fallback?: T): Promise<T>;
  getSync<T>(name: string, fallback?: T): T;
  set<T>(name: string, data: T, orgOpts?: CacheSetOptions | number): Promise<void>;
  setSync<T>(name: string, data: T, orgOpts?: CacheSetOptions | number): void;
  setMany(items: CacheItem[], options?: CacheSetOptions): Promise<void>;
  setManySync(items: CacheItem[], options?: CacheSetOptions): void;
  remove(name: string): Promise<void>;
  removeSync(name: string): void;
  clear(): Promise<void>;
  clearSync(): void;
  getAll(): Promise<CacheItem[]>;
  load(): Promise<{
    files: CacheItem[];
  }>;
}
declare function createFileSystemCache(options: FileSystemCacheOptions): FileSystemCache;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/cache.d.ts
declare const cache: FileSystemCache;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/cli.d.ts
declare function temporaryDirectory({
  prefix
}?: {
  prefix?: string | undefined;
}): Promise<string>;
type FileOptions = MergeExclusive<{
  /**
   * File extension.
   *
   * Mutually exclusive with the `name` option.
   *
   * _You usually won't need this option. Specify it only when actually needed._
   */
  readonly extension?: string;
}, {
  /**
   * Filename.
   *
   * Mutually exclusive with the `extension` option.
   *
   * _You usually won't need this option. Specify it only when actually needed._
   */
  readonly name?: string;
}>;
declare function temporaryFile({
  name,
  extension
}?: FileOptions): Promise<string>;
declare function parseList(str: string): string[];
declare function getEnvConfig(program: Record<string, any>, configEnv: Record<string, any>): void;
/**
 * Given a file name, creates an object with utilities to manage a log file. It creates a temporary
 * log file which you can manage with the returned functions. You can then decide whether to move
 * the log file to the users project, or remove it.
 *
 * @example
 *
 * ```ts
 * const { logStream, moveLogFile, removeLogFile, clearLogFile, readLogFile } =
 *   await createLogStream('my-log-file.log');
 *
 * // SCENARIO 1:
 * // you can write custom messages to generate a log file
 * logStream.write('my log message');
 * await moveLogFile();
 *
 * // SCENARIO 2:
 * // or you can pass it to stdio and capture the output of that command
 * try {
 *   await executeCommand({
 *     command: 'pnpm',
 *     args: ['info', packageName, ...args],
 *     // do not output to the user, and send stdio and stderr to log file
 *     stdio: ['ignore', logStream, logStream],
 *   });
 * } catch (err) {
 *   // do something with the log file content
 *   const output = await readLogFile();
 *   // move the log file to the users project
 *   await moveLogFile();
 * }
 * // success, no need to keep the log file
 * await removeLogFile();
 * ```
 */
declare const createLogStream: (logFileName?: string) => Promise<{
  moveLogFile: () => Promise<void>;
  removeLogFile: () => Promise<void>;
  clearLogFile: () => Promise<void>;
  readLogFile: () => Promise<string>;
  logStream: WriteStream;
}>;
declare const isCorePackage: (pkg: string) => boolean;
declare const isSatelliteAddon: (pkg: string) => boolean;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/check-addon-order.d.ts
interface Options$1 {
  before: CoreCommon_AddonInfo;
  after: CoreCommon_AddonInfo;
  configFile: string;
  getConfig: (path: string) => any;
}
declare const checkAddonOrder: ({
  before,
  after,
  configFile,
  getConfig
}: Options$1) => Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/envs.d.ts
declare function loadEnvs(options?: {
  production?: boolean;
}): Promise<{
  stringified: Record<string, string>;
  raw: Record<string, string>;
}>;
declare const stringifyEnvs: (raw: Record<string, string>) => Record<string, string>;
declare const stringifyProcessEnvs: (raw: Record<string, string>) => Record<string, string>;
declare const optionalEnvToBoolean: (input: string | undefined) => boolean | undefined;
/**
 * Consistently determine if we are in a CI environment
 *
 * Doing Boolean(process.env.CI) or !process.env.CI is not enough, because users might set CI=false
 * or CI=0, which would be truthy, and thus return true in those cases.
 */
declare function isCI(): boolean | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/common-glob-options.d.ts
declare const commonGlobOptions: (glob: string) => {
  ignore?: undefined;
} | {
  ignore: string[];
};
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/framework.d.ts
declare const frameworkToRenderer: Record<SupportedFramework | SupportedRenderer, SupportedRenderer>;
declare const frameworkToBuilder: Record<SupportedFramework, SupportedBuilder>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/get-builder-options.d.ts
/**
 * Builder options can be specified in `core.builder.options` or `framework.options.builder`.
 * Preference is given here to `framework.options.builder` if both are specified.
 */
declare function getBuilderOptions<T extends Record<string, any>>(options: Options): Promise<T | Record<string, never>>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/get-framework-name.d.ts
/** Framework can be a string or an object. This utility always returns the string name. */
declare function getFrameworkName(options: Options): Promise<string>;
/**
 * Extracts the proper framework name from the given framework field. The framework field can be the
 * framework package name or a path to the framework package.
 *
 * @example
 *
 * ```ts
 * extractFrameworkPackageName('/path/to/@storybook/angular'); // => '@storybook/angular'
 * extractFrameworkPackageName('@third-party/framework'); // => '@third-party/framework'
 * ```
 */
declare const extractFrameworkPackageName: (framework: string) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/get-renderer-name.d.ts
/**
 * Render is set as a string on core. It must be set by the framework It falls back to the framework
 * name if not set
 */
declare function getRendererName(options: Options): Promise<string>;
/**
 * Extracts the proper renderer name from the given framework name.
 *
 * @example
 *
 * ```ts
 * extractRenderer('@storybook/react'); // => 'react'
 * extractRenderer('@storybook/angular'); // => 'angular'
 * extractRenderer('@third-party/framework'); // => null
 * ```
 *
 * @param frameworkName The name of the framework.
 * @returns The name of the renderer.
 */
declare function extractRenderer(frameworkName: string): Promise<import("storybook/internal/types").SupportedRenderer | null>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/get-storybook-configuration.d.ts
declare function getStorybookConfiguration(storybookScript: string, shortName: string, longName: string): string | null;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/get-storybook-info.d.ts
declare const rendererPackages: Record<string, SupportedRenderer>;
declare const frameworkPackages: Record<string, SupportedFramework>;
declare const builderPackages: Record<string, SupportedBuilder>;
declare const compilerPackages: Record<string, CoreWebpackCompiler>;
declare const findConfigFile: (prefix: string, configDir: string) => string | null;
declare const getConfigInfo: (configDir?: string) => {
  configDir: string;
  mainConfigPath: string | null;
  previewConfigPath: string | null;
  managerConfigPath: string | null;
};
declare const getStorybookInfo: (configDir?: string, cwd?: string, {
  skipCache
}?: {
  skipCache?: boolean;
}) => Promise<CoreCommon_StorybookInfo>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/get-storybook-refs.d.ts
declare const getAutoRefs: (options: Options) => Promise<Record<string, Ref>>;
declare const checkRef: (url: string) => Promise<boolean>;
declare function getRefs(options: Options): Promise<Record<string, Ref>>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/glob-to-regexp.d.ts
declare function globToRegexp(glob: string): RegExp;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/HandledError.d.ts
declare class HandledError extends Error {
  handled: boolean;
  constructor(error: unknown);
}
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/interpolate.d.ts
/**
 * Return a string corresponding to template filled with bindings using following pattern: For each
 * (key, value) of `bindings` replace, in template, `{{key}}` by escaped version of `value`
 *
 * @param template {String} Template with `{{binding}}`
 * @param bindings {Object} key-value object use to fill the template, `{{key}}` will be replaced by
 *   `escaped(value)`
 * @returns {String} Filled template
 */
declare const interpolate: (template: string, bindings: Record<string, string>) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/interpret-files.d.ts
declare const supportedExtensions: readonly [".js", ".ts", ".jsx", ".tsx", ".mjs", ".mts", ".mtsx", ".cjs", ".cts", ".ctsx"];
declare function getInterpretedFile(pathToFile: string): string | undefined;
interface ResolveImportOptions {
  basedir: string;
}
declare function resolveImport(id: string, options: ResolveImportOptions): string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/interpret-require.d.ts
declare function serverRequire(filePath: string | string[]): Promise<any> | null;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/load-main-config.d.ts
declare function loadMainConfig({
  configDir,
  cwd,
  skipCache
}: {
  configDir: string;
  cwd?: string;
  skipCache?: boolean;
}): Promise<StorybookConfig>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/load-manager-or-addons-file.d.ts
declare function loadManagerOrAddonsFile({
  configDir
}: {
  configDir: string;
}): string | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/load-preview-or-config-file.d.ts
declare function loadPreviewOrConfigFile({
  configDir
}: {
  configDir: string;
}): string | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/log-config.d.ts
declare function logConfig(caption: unknown, config: unknown): void;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/normalize-stories.d.ts
declare const DEFAULT_FILES_PATTERN = "**/*.@(mdx|stories.@(js|jsx|mjs|ts|tsx))";
declare const getDirectoryFromWorkingDir: ({
  configDir,
  workingDir,
  directory
}: NormalizeOptions & {
  directory: string;
}) => string;
declare const normalizeStoriesEntry: (entry: StoriesEntry, {
  configDir,
  workingDir,
  defaultFilesPattern
}: NormalizeOptions) => NormalizedStoriesSpecifier;
interface NormalizeOptions {
  configDir: string;
  workingDir: string;
  defaultFilesPattern?: string;
}
declare const normalizeStories: (entries: StoriesEntry[], options: NormalizeOptions) => NormalizedStoriesSpecifier[];
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/paths.d.ts
declare const getProjectRoot: () => string;
declare const invalidateProjectRootCache: () => void;
/** Finds files in the directory tree up to the project root */
declare const findFilesUp: (matchers: string[], baseDir?: string) => string[];
declare const nodePathsToArray: (nodePath: string) => string[];
/** Ensures that a path starts with `./` or `../`, or is entirely `.` or `..` */
declare function normalizeStoryPath(filename: string): string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/read-dependency-manifest.d.ts
/**
 * Reads a dependency's own `package.json`, resolved relative to `directory`.
 *
 * `<dep>/package.json` cannot reliably be resolved as a subpath: subpath
 * resolution runs through the package's `exports` field, and a `"./*"` wildcard
 * (e.g. refractor's `"./*": "./lang/*.js"`) remaps `package.json` to a file
 * that does not exist.
 *
 * Strategy:
 *
 * 1. Try the subpath anyway — correct for packages with no `exports` field, or
 *    that explicitly expose `"./package.json"`.
 * 2. On failure, resolve the package's main entry (the `"."` export, which a
 *    `"./*"` wildcard never affects) and walk up to the package root.
 *
 * `empathic/resolve` wraps Node's `createRequire().resolve()`, so both passes
 * stay correct under hoisted monorepos and Yarn PnP.
 *
 * @param directory Directory to resolve `dependency` from (Node module resolution).
 * @param dependency Bare package name, e.g. `react` or `@scope/pkg`.
 * @returns The parsed `package.json`, or `undefined` if it cannot be resolved.
 *   Never throws.
 */
declare const readDependencyManifest: (directory: string, dependency: string) => Promise<PackageJson$1 | undefined>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/readTemplate.d.ts
declare function readTemplate(filename: string): Promise<string>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/js-package-manager/JsPackageManagerFactory.d.ts
declare class JsPackageManagerFactory {
  /** Cache for package manager instances */
  private static cache;
  /** Generate a cache key based on the parameters */
  private static getCacheKey;
  /** Clear the package manager cache */
  static clearCache(): void;
  /**
   * Determine which package manager type to use based on lockfiles, commands, and environment
   *
   * @param cwd - Current working directory
   * @returns Package manager type as string: 'npm', 'pnpm', 'bun', 'yarn1', or 'yarn2'
   * @throws Error if no usable package manager is found
   */
  static getPackageManagerType(cwd?: string): PackageManagerName;
  static getPackageManager({
    force,
    configDir,
    storiesPaths,
    ignoreCache
  }?: {
    force?: PackageManagerName;
    configDir?: string;
    storiesPaths?: string[];
    ignoreCache?: boolean;
  }, cwd?: string): JsPackageManager;
  /** Look up map of package manager proxies by name */
  private static PROXY_MAP;
  /**
   * Infer the package manager based on the command the user is running. Each package manager sets
   * the `npm_config_user_agent` environment variable with its name and version e.g. "npm/7.24.0"
   * Which is really useful when invoking commands via npx/pnpx/yarn create/etc.
   */
  private static inferPackageManagerFromUserAgent;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/common/js-package-manager/util.d.ts
type StorybookInstallContext = 'create' | 'upgrade';
declare const STORYBOOK_PACKAGE_PATTERNS: readonly ['storybook', '@storybook/*', 'eslint-plugin-storybook', '@chromatic-com/storybook'];
declare const hasStorybookMinimumAgeExclusions: (configuredPatterns: string[]) => boolean;
declare const parsePackageData: (packageName?: string) => {
  name: string;
  value: {
    version: string;
    location: string;
  };
};
declare const parsePositiveIntegerConfigValue: (value: string | null | undefined) => number | null;
declare const parseReleaseTime: (value: unknown) => Date | null;
declare const parsePackageTimeMap: (value: unknown) => Record<string, string> | null;
declare const getAgeInMinutes: (publishedAt: Date, now?: Date) => number;
declare const getLatestStableVersionAdheringToMinimumAgeGate: (timeMap: Record<string, string>, minimumAgeGateMinutes: number, now?: Date) => string | null;
/**
 * Args for `runPackageCommand({ useRemotePkg: true })` when bootstrapping a Storybook CLI package
 * that isn't installed locally.
 *
 * npm and Yarn Classic both execute the remote package through `npx`, which prompts "Ok to
 * proceed?" before downloading and hangs in non-interactive/CI environments. `--yes` auto-confirms
 * that install. pnpm (`dlx`), Yarn Berry (`dlx`) and Bun (`bunx`) download without prompting, so
 * they must not receive the npx-only `--yes` flag.
 */
declare function getRemotePackageRunnerArgs(packageManagerType: PackageManagerName, pkg: string, version: string, args: string[]): string[];
declare function getVitestStorybookRunCommand(packageManager: JsPackageManager, file?: string): string;
declare function getMswInitCommand(packageManager: JsPackageManager): string;
declare const getStorybookRerunCommand: (installContext: StorybookInstallContext, compatibleVersion: string | null) => string;
declare const getStorybookRerunInstruction: (installContext: StorybookInstallContext) => "Please rerun Storybook creation with:" | "Please rerun the Storybook upgrade with:";
declare const getErrorLogs: (error: unknown) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/js-package-manager/vite-plus-versions.d.ts
/**
 * Attempts to load vendored package versions from `vite-plus/versions`.
 *
 * When a project uses vite-plus (typically via `"vite": "npm:vite-plus@..."`), vitest and vite are
 * vendored rather than installed as separate packages. This function retrieves their actual versions
 * from the `vite-plus/versions` subpath export.
 *
 * Returns null when vite-plus is not installed or lacks the `/versions` export (older versions).
 */
declare function getVitePlusVersions(): Promise<Record<string, string> | null>;
declare function clearVitePlusCache(): void;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/remove.d.ts
type RemoveAddonOptions = {
  packageManager: JsPackageManager;
  configDir?: string;
  skipInstall?: boolean;
};
/**
 * Remove the given addon package and remove it from main.js
 *
 * @example
 *
 * ```sh
 * sb remove @storybook/addon-links
 * ```
 */
declare function removeAddon(addon: string, options: RemoveAddonOptions): Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/resolve-path-in-sb-cache.d.ts
/**
 * Get the path of the file or directory with input name inside the Storybook cache directory:
 *
 * - `node_modules/.cache/storybook/{version}/{directoryName}` in a Node.js project or npm package
 * - `.cache/storybook/{version}/{directoryName}` otherwise
 *
 * The cache directory includes the Storybook version to ensure that upgrading Storybook
 * automatically invalidates the cache, preventing stale cache issues.
 *
 * @param fileOrDirectoryName {string} Name of the file or directory
 * @param sub {string} Optional subdirectory name (defaults to 'default')
 * @returns {string} Absolute path to the file or directory
 */
declare function resolvePathInStorybookCache(fileOrDirectoryName: string, sub?: string): string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/symlinks.d.ts
declare function isPreservingSymlinks(): boolean | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/template.d.ts
declare function getPreviewBodyTemplate(configDirPath: string, interpolations?: Record<string, string>): string;
declare function getPreviewHeadTemplate(configDirPath: string, interpolations?: Record<string, string>): string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/validate-config.d.ts
declare function validateFrameworkName(frameworkName: string | undefined): asserts frameworkName is string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/validate-configuration-files.d.ts
declare function validateConfigurationFiles(configDir: string, cwd?: string): Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/satisfies.d.ts
/** Mimicking the satisfies operator until we can upgrade to TS4.9 */
declare function satisfies<A>(): <T extends A>(x: T) => T;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/babel.d.ts
/**
 * Reads the major version of the `@babel/preset-env` that is actually installed in the consumer's
 * project, at runtime.
 *
 * We can't rely on `@babel/core`'s exported `version`: it is a different package whose version can
 * diverge from `@babel/preset-env`, and it gets resolved when Storybook is bundled rather than from
 * the user's project. We instead resolve and read preset-env's own `package.json`. This must stay
 * synchronous because some call sites (e.g. the Next.js babel preset factory and the swc loader
 * transform) are synchronous.
 *
 * This is primarily used to gate the `bugfixes` option, which is valid in preset-env v7 but was
 * removed in v8 (where it throws when set, as the bugfix plugins are always enabled).
 *
 * @returns The major version (e.g. `7` or `8`), or `0` when preset-env cannot be resolved.
 */
declare const getBabelPresetEnvMajor: () => number | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/formatter.d.ts
interface Prettier {
  resolveConfig: (filePath: string, options?: {
    editorconfig?: boolean;
  }) => Promise<any>;
  format: (content: string, options?: any) => Promise<string> | string;
  check: (content: string, options?: any) => Promise<boolean>;
  clearConfigCache: () => Promise<void>;
  formatWithCursor: (content: string, options?: any) => Promise<{
    formatted: string;
    cursorOffset: number;
  }>;
  getFileInfo: (filePath: string, options?: any) => Promise<{
    ignored: boolean;
    inferredParser: string | null;
  }>;
  getSupportInfo: () => Promise<{
    languages: any[];
    options: any[];
  }>;
  resolveConfigFile: (filePath?: string) => Promise<string | null>;
  version: string;
  AstPath: any;
  doc: any;
  util: any;
}
declare function getPrettier(): Promise<Prettier>;
/**
 * Format the content of a file using prettier. If prettier is not available in the user's project,
 * it will fallback to use editorconfig settings if available and formats the file by a
 * prettier-fallback.
 */
declare function formatFileContent(filePath: string, content: string): Promise<string>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/get-story-id.d.ts
interface StoryIdData {
  storyFilePath: string;
  exportedStoryName: string;
}
type GetStoryIdOptions = StoryIdData & {
  configDir: string;
  stories: StoriesEntry[];
  workingDir?: string;
  userTitle?: string;
  storyFilePath: string;
};
declare function getStoryId(data: StoryIdData, options: Options): Promise<{
  storyId: string;
  kind: string;
}>;
declare function getStoryTitle({
  storyFilePath,
  configDir,
  stories,
  workingDir,
  userTitle
}: Omit<GetStoryIdOptions, 'exportedStoryName'>): string | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/component-id.d.ts
/**
 * Derives the componentId portion of a story index entry id.
 *
 * Storybook story ids have the shape `<componentId>--<storyName>`; the prefix before the first
 * `--` is the stable component identifier shared by every story (and attached docs entry) that
 * targets the same component. Centralising the split keeps the docgen service, manifest generator,
 * and any future consumers on one definition.
 */
declare function getComponentIdFromEntry(entry: Pick<IndexEntry, 'id'>): string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/select-component-entry.d.ts
/**
 * Filename test for CSF story files (e.g. `Button.stories.tsx`, `stories.ts`). Single source of
 * truth shared by the CSF indexer and the React docgen provider so both agree on which files count
 * as story files. Has no `g` flag, so the shared instance is safe to reuse across `.test()` calls.
 */
declare const STORY_FILE_TEST_REGEXP: RegExp;
/**
 * CSF story file path used for component resolution — the story entry's `importPath`, or the first
 * `storiesImports` entry for attached MDX docs (same rule as the React component manifest generator).
 */
declare function getStoryImportPathFromEntry(entry: IndexEntry$1): string | undefined;
/**
 * Picks one index entry per componentId: story entries win; attached docs fill gaps only where no
 * story exists for that componentId.
 */
declare function selectComponentEntriesByComponentId(indexEntries: IndexEntry$1[]): Map<string, IndexEntry$1>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/posix.d.ts
/** Replaces the path separator with forward slashes */
declare const posix: (localPath: string, seperator?: string) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/sync-main-preview-addons.d.ts
declare function syncStorybookAddons(mainConfig: StorybookConfig, previewConfigPath: string, configDir: string): Promise<void>;
declare function syncPreviewAddonsWithMainConfig(mainConfig: StorybookConfig, previewConfig: ConfigFile, configDir: string): Promise<ConfigFile>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/setup-addon-in-config.d.ts
interface SetupAddonInConfigOptions {
  addonName: string;
  mainConfigCSFFile: ConfigFile;
  previewConfigPath: string | undefined;
  configDir: string;
}
/**
 * Setup an addon in the Storybook configuration by adding it to the addons array in main config and
 * syncing it with preview config.
 *
 * @param options Configuration options for setting up the addon
 */
declare function setupAddonInConfig({
  addonName,
  previewConfigPath,
  configDir,
  mainConfigCSFFile
}: SetupAddonInConfigOptions): Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/wrap-getAbsolutePath-utils.d.ts
/**
 * Checks if the following node declarations exists in the main config file.
 *
 * @example
 *
 * ```ts
 * const <name> = () => {};
 * function <name>() {}
 * ```
 */
declare function doesVariableOrFunctionDeclarationExist(node: types.Node, name: string): boolean;
/**
 * Returns the name of the getAbsolutePath wrapper function if it exists in the main config file.
 *
 * @returns Name of the getAbsolutePath wrapper function (e.g. `getAbsolutePath`).
 */
declare function getAbsolutePathWrapperName(config: ConfigFile): string | null;
/** Check if the node needs to be wrapped with getAbsolutePath wrapper. */
declare function isGetAbsolutePathWrapperNecessary(node: types.Node, cb?: (node: types.StringLiteral | types.ObjectProperty | types.ArrayExpression) => void): boolean;
/**
 * Get all fields that need to be wrapped with getAbsolutePath wrapper.
 *
 * @returns Array of fields that need to be wrapped with getAbsolutePath wrapper.
 */
declare function getFieldsForGetAbsolutePathWrapper(config: ConfigFile): types.Node[];
/**
 * Returns AST for the following function
 *
 * @example
 *
 * ```ts
 * function getAbsolutePath(value) {
 *   return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
 * }
 * ```
 */
declare function getAbsolutePathWrapperAsCallExpression(isConfigTypescript: boolean): types.FunctionDeclaration;
declare function wrapValueWithGetAbsolutePathWrapper(config: ConfigFile, node: types.Node): void;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/scan-and-transform-files.d.ts
/**
 * Helper function to scan for files matching a glob pattern and transform them
 *
 * @param options Configuration options
 * @param transform Function to transform the found files
 * @returns Array of errors encountered during transformation
 */
declare function scanAndTransformFiles<T extends Record<string, unknown>>({
  promptMessage,
  defaultGlob,
  dryRun,
  force,
  transformFn,
  transformOptions
}: {
  promptMessage?: string;
  defaultGlob?: string;
  dryRun: boolean;
  force?: boolean;
  transformFn: (files: string[], options: T, dryRun: boolean) => Promise<Array<{
    file: string;
    error: Error;
  }>>;
  transformOptions: T;
}): Promise<Array<{
  file: string;
  error: Error;
}>>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/transform-imports.d.ts
declare const transformImportFiles: (files: string[], renamedImports: Record<string, string>, dryRun?: boolean) => Promise<{
  file: string;
  error: Error;
}[]>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/utils/module.d.ts
/**
 * This is just an alias for import.meta.resolve. It makes it possible to mock it in Vitest with
 * module-mocking, as Vitest currently does not support import.meta.resolve in tests.
 *
 * @see https://github.com/vitest-dev/vitest/issues/6953
 */
declare const importMetaResolve: (...args: Parameters<ImportMeta['resolve']>) => string;
/** Resolves the directory of a given package, by resolving its package.json file. */
declare const resolvePackageDir: (pkg: Parameters<ImportMeta['resolve']>[0], parent?: Parameters<ImportMeta['resolve']>[0]) => string;
/**
 * Dynamically imports a module with TypeScript support, falling back to require if necessary.
 *
 * @example Import a TypeScript preset
 *
 * ```ts
 * const preset = await importModule('./my-preset.ts');
 * // Returns the default export or the entire module
 * ```
 *
 * @example Import a JavaScript addon
 *
 * ```ts
 * const addon = await importModule('@storybook/addon-essentials');
 * // Returns the default export or the entire module
 * ```
 */
declare function importModule(path: string, {
  skipCache
}?: {
  skipCache?: boolean;
}): Promise<any>;
/**
 * Safely resolves a module specifier to its absolute file path.
 *
 * Attempts to resolve the given module specifier by trying different file extensions until a valid
 * file is found. Returns undefined if the module cannot be resolved.
 *
 * Optionally pass in a list of file extensions to try, defaulting to `.mjs`, `.js`, and `.cjs`.
 *
 * @example
 *
 * ```typescript
 * // Resolve a relative module
 * const path = safeResolveModule({
 *   specifier: './utils',
 *   parent: import.meta.url,
 * });
 *
 * // Resolve with custom extensions
 * const path = safeResolveModule({
 *   specifier: './config',
 *   extensions: ['.json', '.js'],
 * });
 * ```
 */
declare const safeResolveModule: ({
  specifier,
  parent,
  extensions
}: {
  specifier: string;
  parent?: string;
  extensions?: string[];
}) => string | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/get-addon-names.d.ts
type AddonEntry = NonNullable<StorybookConfig['addons']>[number];
/**
 * Resolve an addon config entry (string, object, or absolute path) to its bare package name.
 * Returns `undefined` for relative-path local addons.
 */
declare const normalizeAddonName: (addon: AddonEntry) => string | undefined;
declare const getAddonNames: (mainConfig: StorybookConfig) => string[];
//#endregion
//#region code/core/.dts-emit/code/core/src/common/utils/utils.d.ts
declare const groupBy: <K extends PropertyKey, T>(items: T[], keySelector: (item: T, index: number) => K) => Record<K, T[]>;
declare function invariant(condition: unknown, message?: string | (() => string)): asserts condition;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/node-version.d.ts
interface MinNodeVersion {
  major: number;
  minor: number;
  patch: number;
}
/**
 * Minimum Node.js versions supported by Storybook.
 * This is the single source of truth — all version checks should reference this.
 */
declare const MIN_SUPPORTED_NODE_VERSIONS: readonly MinNodeVersion[];
/**
 * Format a MinNodeVersion for human display:
 * - { major: 20, minor: 0, patch: 0 } → "20+"
 * - { major: 20, minor: 19, patch: 0 } → "20.19+"
 * - { major: 22, minor: 22, patch: 1 } → "22.22.1+"
 */
declare function formatMinVersion(v: MinNodeVersion): string;
/** Human-readable description like "20.19+ or 22.12+" */
declare const MIN_SUPPORTED_NODE_DESCRIPTION: string;
/**
 * Check whether a Node.js version (major.minor.patch) meets the minimum requirement.
 *
 * Missing version components should be normalized by callers (e.g. "22" -> 22.0.0).
 */
declare function isNodeVersionSupported(major: number, minor: number, patch: number): boolean;
//#endregion
export { DEFAULT_FILES_PATTERN, ExecuteCommandOptions, FileOptions, FileSystemCache, HandledError, InstallationMetadata, InterPresetOptions, JsPackageManager, JsPackageManagerFactory, MIN_SUPPORTED_NODE_DESCRIPTION, MIN_SUPPORTED_NODE_VERSIONS, MinNodeVersion, type PackageJson, PackageJsonInfo, PackageJsonWithDepsAndDevDeps, PackageJsonWithMaybeDeps, PackageManagerName, PackageMetadata, RemoveAddonOptions, ResolveImportOptions, STORYBOOK_PACKAGE_PATTERNS, STORY_FILE_TEST_REGEXP, SetupAddonInConfigOptions, StorybookInstallContext, builderPackages, cache, checkAddonOrder, checkRef, clearVitePlusCache, commonGlobOptions, compilerPackages, createFileSystemCache, createLogStream, doesVariableOrFunctionDeclarationExist, executeCommand, executeCommandSync, executeNodeCommand, extractFrameworkPackageName, extractRenderer, filterPresetsConfig, findConfigFile, findFilesUp, formatFileContent, formatMinVersion, frameworkPackages, frameworkToBuilder, frameworkToRenderer, getAbsolutePathWrapperAsCallExpression, getAbsolutePathWrapperName, getAddonNames, getAgeInMinutes, getAutoRefs, getBabelPresetEnvMajor, getBuilderOptions, getComponentIdFromEntry, getConfigInfo, getDirectoryFromWorkingDir, getEnvConfig, getErrorLogs, getFieldsForGetAbsolutePathWrapper, getFrameworkName, getInterpretedFile, getLatestStableVersionAdheringToMinimumAgeGate, getMswInitCommand, getPackageDetails, getPresets, getPrettier, getPrettyPackageManagerName, getPreviewBodyTemplate, getPreviewHeadTemplate, getProjectRoot, getRefs, getRemotePackageRunnerArgs, getRendererName, getStoryId, getStoryImportPathFromEntry, getStoryTitle, getStorybookConfiguration, getStorybookInfo, getStorybookRerunCommand, getStorybookRerunInstruction, getVitePlusVersions, getVitestStorybookRunCommand, globToRegexp, groupBy, hasStorybookMinimumAgeExclusions, importMetaResolve, importModule, interpolate, invalidateProjectRootCache, invariant, isCI, isCorePackage, isGetAbsolutePathWrapperNecessary, isNodeVersionSupported, isPreservingSymlinks, isSatelliteAddon, isWebContainer, loadAllPresets, loadEnvs, loadMainConfig, loadManagerOrAddonsFile, loadPreset, loadPreviewOrConfigFile, logConfig, nodePathsToArray, normalizeAddonName, normalizeStories, normalizeStoriesEntry, normalizeStoryPath, optionalEnvToBoolean, parseList, parsePackageData, parsePackageTimeMap, parsePositiveIntegerConfigValue, parseReleaseTime, posix, readDependencyManifest, readTemplate, registerService, removeAddon, rendererPackages, resolveAddonName, resolveImport, resolvePackageDir, resolvePathInStorybookCache, safeResolveModule, satisfies, scanAndTransformFiles, selectComponentEntriesByComponentId, serverRequire, setupAddonInConfig, stringifyEnvs, stringifyProcessEnvs, supportedExtensions, syncPreviewAddonsWithMainConfig, syncStorybookAddons, temporaryDirectory, temporaryFile, transformImportFiles, validateConfigurationFiles, validateFrameworkName, _default as versions, wrapValueWithGetAbsolutePathWrapper };