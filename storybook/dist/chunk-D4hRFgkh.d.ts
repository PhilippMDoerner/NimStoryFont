import { n as Options$1, t as ResultPromise } from "./chunk-BW2saWbz.js";
import { PackageJson as PackageJson$1 } from "storybook/internal/types";

//#region code/core/.dts-emit/code/core/src/common/utils/command.d.ts
type ExecuteCommandOptions = Omit<Options$1, 'cancelSignal'> & {
  command: string;
  args?: string[];
  cwd?: string;
  ignoreError?: boolean;
  env?: Record<string, string>;
  signal?: AbortSignal;
};
declare function executeCommand(options: ExecuteCommandOptions): ResultPromise;
declare function executeCommandSync(options: ExecuteCommandOptions): string;
declare function executeNodeCommand({
  scriptPath,
  args,
  options
}: {
  scriptPath: string;
  args?: string[];
  options?: Options$1;
}): ResultPromise;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/js-package-manager/PackageJson.d.ts
type PackageJsonWithDepsAndDevDeps = PackageJson$1 & Required<Pick<PackageJson$1, 'dependencies' | 'devDependencies'>>;
type PackageJsonWithMaybeDeps = Partial<Pick<PackageJson$1, 'dependencies' | 'devDependencies' | 'peerDependencies' | 'files'>>;
//#endregion
//#region code/core/.dts-emit/code/core/src/common/js-package-manager/types.d.ts
type PackageMetadata = {
  version: string;
  location?: string;
  reasons?: string[];
};
type InstallationMetadata = {
  dependencies: Record<string, PackageMetadata[]>;
  duplicatedDependencies: Record<string, string[]>;
  infoCommand: string;
  dedupeCommand: string;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/common/js-package-manager/JsPackageManager.d.ts
declare enum PackageManagerName {
  NPM = "npm",
  YARN1 = "yarn1",
  YARN2 = "yarn2",
  PNPM = "pnpm",
  BUN = "bun"
}
declare const indentSymbol: unique symbol;
type PackageJsonWithIndent = PackageJsonWithDepsAndDevDeps & {
  [indentSymbol]?: any;
};
/**
 * Prints a package manager's name in a way that's easier to compute by humans and agents.
 * @param packageManager The package manager's internal name (e.g. "yarn1")
 * @return A human-friendly name for the package manager (e.g. "Yarn Classic (v1)")
 */
declare function getPrettyPackageManagerName(packageManager: string | undefined): string;
/**
 * Extract package name and version from input
 *
 * @param pkg A string like `@storybook/cli`, `react` or `react@^16`
 * @returns A tuple of 2 elements: [packageName, packageVersion]
 */
declare function getPackageDetails(pkg: string): [string, string?];
interface JsPackageManagerOptions {
  cwd?: string;
  configDir?: string;
  storiesPaths?: string[];
}
type PackageJsonInfo = {
  packageJsonPath: string;
  operationDir: string;
  packageJson: PackageJsonWithDepsAndDevDeps;
};
declare abstract class JsPackageManager {
  #private;
  abstract readonly type: PackageManagerName;
  /** The path to the primary package.json file (contains the `storybook` dependency). */
  readonly primaryPackageJson: PackageJsonInfo;
  /** The paths to all package.json files in the project root. */
  packageJsonPaths: string[];
  /**
   * The path to the Storybook instance directory. This is used to find the primary package.json
   * file in a repository.
   */
  readonly instanceDir: string;
  /** The current working directory. */
  protected readonly cwd: string;
  /** Cache for latest version results to avoid repeated network calls. */
  static readonly latestVersionCache: Map<string, string | null>;
  /** Cache for installed version results to avoid repeated file system calls. */
  static readonly installedVersionCache: Map<string, string | null>;
  /** Cache for package.json files to avoid repeated file system calls. */
  static readonly packageJsonCache: Map<string, PackageJsonWithIndent>;
  constructor(options?: JsPackageManagerOptions);
  /** Returns the name of the command to invoke this package manager. */
  abstract getCommandName(): string;
  /** Installs package dependencies. */
  abstract getInstallCommand(deps: string[], dev?: boolean): string;
  /** Runs arbitrary package scripts (as a string for display). */
  abstract getRunCommand(command: string): string;
  /** Returns the command to run the binary of a local package */
  abstract getPackageCommand(args: string[]): string;
  /** Get the package.json file for a given module. */
  abstract getModulePackageJSON(packageName: string, cwd?: string): Promise<PackageJson$1 | null>;
  isStorybookInMonorepo(): boolean;
  installDependencies(options?: {
    force?: boolean;
  }): Promise<void>;
  precheckStorybookPackageInstall(options: {
    storybookVersion: string;
    nonInteractive: boolean;
    installContext: 'create' | 'upgrade';
  }): Promise<void>;
  dedupeDependencies(options?: {
    force?: boolean;
  }): Promise<void>;
  /** Read the `package.json` file available in the provided directory */
  static getPackageJson(packageJsonPath: string): PackageJsonWithIndent;
  writePackageJson(packageJson: PackageJson$1, directory?: string): void;
  getAllDependencies(): Record<string, string>;
  isDependencyInstalled(dependency: string): boolean;
  /**
   * Resolve the effective version/range of a declared dependency: the installed version if present,
   * otherwise the declared semver range. Returns null when the package is not declared or only a
   * non-semver specifier is declared. PNPMProxy additionally resolves pnpm `catalog:` references.
   */
  getDeclaredVersionSpecifier(packageName: string): Promise<string | null>;
  /**
   * Pin `packages` to `version`, mirroring how `anchorPackage` is declared. The base implementation
   * pins each directly (`pkg@version`). PNPMProxy overrides this to honor pnpm catalogs: when
   * `anchorPackage` is declared through a catalog, the packages are registered in that catalog and
   * referenced as `catalog:` instead. Returns the install specifiers to write to package.json.
   */
  applyVersionToRelatedPackages(packages: string[], version: string, _anchorPackage: string): string[];
  /**
   * Add dependencies to a project using `yarn add` or `npm install`.
   *
   * @example
   *
   * ```ts
   * addDependencies(options, [
   *   `@storybook/react@${storybookVersion}`,
   *   `@storybook/addon-links@${linksVersion}`,
   * ]);
   * ```
   *
   * @param {Object} options Contains `skipInstall`, `packageJson` and `installAsDevDependencies`
   *   which we use to determine how we install packages.
   * @param {Array} dependencies Contains a list of packages to add.
   */
  addDependencies(options: {
    skipInstall: true;
    type: 'dependencies' | 'devDependencies' | 'peerDependencies';
    writeOutputToFile?: boolean;
    packageJsonInfo?: PackageJsonInfo;
  } | {
    skipInstall?: false;
    type: 'dependencies' | 'devDependencies';
    writeOutputToFile?: boolean;
    packageJsonInfo?: PackageJsonInfo;
  }, dependencies: string[]): Promise<void | ResultPromise>;
  /**
   * Removing dependencies from the package.json file, which is found first starting from the
   * instance root. The method does not run a package manager install like `npm install`.
   *
   * @example
   *
   * ```ts
   * removeDependencies([`@storybook/react`]);
   * ```
   *
   * @param dependencies Contains a list of packages to remove.
   */
  removeDependencies(dependencies: string[]): Promise<void>;
  /**
   * Return an array of strings matching following format: `<storybook_package_name>@<package_latest_version>`
   *
   * For packages in the storybook monorepo, when the latest version is equal to the version of the
   * current CLI the version is not added to the string.
   *
   * When a package is in the monorepo, and the version is not equal to the CLI version, the version
   * is taken from the versions.ts file and added to the string.
   *
   * When a package is not in the monorepo, we don't change the package version and return the package name as is.
   * The package manager will resolve the latest version of the package upon installing it.
   *
   * @param packages
   */
  getVersionedPackages(packages: string[]): Promise<string[]>;
  /**
   * Return an array of string standing for the latest version of the input packages. To be able to
   * identify which version goes with which package the order of the input array is keep.
   *
   * @param packageNames
   */
  getVersions(...packageNames: string[]): Promise<string[]>;
  /**
   * Return the latest version of the input package available on npmjs registry. If constraint are
   * provided it return the latest version matching the constraints.
   *
   * For `@storybook/*` packages the latest version is retrieved from `cli/src/versions.json` file
   * directly
   *
   * @param packageName The name of the package
   * @param constraint A valid semver constraint, example: '1.x || >=2.5.0 || 5.0.0 - 7.2.3'
   */
  getVersion(packageName: string, constraint?: string): Promise<string>;
  /**
   * Get the latest version of the package available on npmjs.com. If constraint is set then it
   * returns a version satisfying it, otherwise the latest version available is returned.
   *
   * @param packageName Name of the package
   * @param constraint Version range to use to constraint the returned version
   */
  latestVersion(packageName: string, constraint?: string): Promise<string | null>;
  /**
   * Clear the latest version cache. Useful for testing or when you want to refresh version
   * information.
   *
   * @param packageName Optional package name to clear only specific entries. If not provided,
   *   clears all cache.
   */
  static clearLatestVersionCache(packageName?: string): void;
  /**
   * Clear the installed version cache for a specific package or all packages.
   *
   * @param packageName Optional package name to clear from cache. If not provided, clears all.
   */
  clearInstalledVersionCache(packageName?: string): void;
  /**
   * Clear both the latest version cache and installed version cache. This should be called after
   * any operation that modifies dependencies.
   */
  clearAllVersionCaches(): void;
  addStorybookCommandInScripts(options?: {
    port: number;
    preCommand?: string;
  }): void;
  addScripts(scripts: Record<string, string>): void;
  addPackageResolutions(versions: Record<string, string>): void;
  protected abstract runInstall(options?: {
    force?: boolean;
  }): ResultPromise;
  protected abstract runAddDeps(dependencies: string[], installAsDevDependencies: boolean, writeOutputToFile?: boolean): ResultPromise;
  protected abstract getResolutions(packageJson: PackageJson$1, versions: Record<string, string>): Record<string, any>;
  /**
   * Get the latest or all versions of the input package available on npmjs.com
   *
   * @param packageName Name of the package
   * @param fetchAllVersions Should return
   */
  protected abstract runGetVersions<T extends boolean>(packageName: string, fetchAllVersions: T): Promise<T extends true ? string[] : string>;
  abstract getRegistryURL(): Promise<string | undefined>;
  abstract runInternalCommand(command: string, args: string[], cwd?: string, stdio?: 'inherit' | 'pipe' | 'ignore'): ResultPromise;
  abstract runPackageCommand(options: Omit<ExecuteCommandOptions, 'command'> & {
    args: string[];
    useRemotePkg?: boolean;
  }): ResultPromise;
  abstract findInstallations(pattern?: string[]): Promise<InstallationMetadata | undefined>;
  abstract findInstallations(pattern?: string[], options?: {
    depth: number;
  }): Promise<InstallationMetadata | undefined>;
  /** Returns the installed (within node_modules or pnp zip) version of a specified package */
  getInstalledVersion(packageName: string): Promise<string | null>;
  isPackageInstalled(packageName: string): Promise<boolean>;
  /**
   * Searches for a dependency/devDependency in all package.json files and returns the version of
   * the dependency.
   */
  getDependencyVersion(dependency: string): string | null;
  static hasStorybookDependency(packageJsonPath: string): boolean;
  static hasAnyStorybookDependency(packageJsonPath: string): boolean;
  /** List all package.json files starting from the given directory and stopping at the project root. */
  static listAllPackageJsonPaths(instanceDir: string, storiesPaths?: string[]): string[];
  static getPackageJsonInfo(packageJsonPath: string): PackageJsonInfo;
}
//#endregion
export { getPrettyPackageManagerName as a, PackageJson$1 as c, ExecuteCommandOptions as d, executeCommand as f, getPackageDetails as i, PackageJsonWithDepsAndDevDeps as l, executeNodeCommand as m, PackageJsonInfo as n, InstallationMetadata as o, executeCommandSync as p, PackageManagerName as r, PackageMetadata as s, JsPackageManager as t, PackageJsonWithMaybeDeps as u };