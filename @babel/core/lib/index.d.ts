import * as _babel_traverse from '@babel/traverse';
import _babel_traverse__default, { VisitWrapper, Visitor as Visitor$1, NodePath, Scope, HubInterface } from '@babel/traverse';
export { NodePath, Scope, default as traverse } from '@babel/traverse';
import * as t from '@babel/types';
export { t as types };
import { SourceMapConverter } from 'convert-source-map';
import { Targets, InputTargets } from '@babel/helper-compilation-targets';
import gensync, { Handler } from 'gensync';
import { ParserOptions, parse as parse$1, ParseResult, tokTypes } from '@babel/parser';
export { tokTypes } from '@babel/parser';
import babelGenerator, { GeneratorOptions, GeneratorResult } from '@babel/generator';
import template from '@babel/template';
export { default as template } from '@babel/template';

type ___CallerMetadata = CallerMetadata;
type ___ConfigAPI = ConfigAPI;
type ___ConfigItem<API> = ConfigItem<API>;
declare const ___ConfigItem: typeof ConfigItem;
declare const ___DEFAULT_EXTENSIONS: typeof DEFAULT_EXTENSIONS;
type ___File = File;
declare const ___File: typeof File;
type ___FileResult = FileResult;
type ___InputOptions = InputOptions;
declare const ___NodePath: typeof NodePath;
type ___NormalizedOptions = NormalizedOptions;
type ___PartialConfig = PartialConfig;
declare const ___PartialConfig: typeof PartialConfig;
type ___PluginAPI = PluginAPI;
type ___PluginItem<Option = object> = PluginItem<Option>;
type ___PluginObject<S extends PluginPass = PluginPass> = PluginObject<S>;
type ___PluginPass<Options = object> = PluginPass<Options>;
declare const ___PluginPass: typeof PluginPass;
type ___PluginTarget<Option = object> = PluginTarget<Option>;
type ___PresetAPI = PresetAPI;
type ___PresetItem<Option = object> = PresetItem<Option>;
type ___PresetObject = PresetObject;
type ___PresetTarget<Option = object> = PresetTarget<Option>;
declare const ___Scope: typeof Scope;
type ___Visitor<S = unknown> = Visitor<S>;
type ___VisitorBase<S = unknown> = VisitorBase<S>;
declare const ___createConfigItem: typeof createConfigItem;
declare const ___createConfigItemAsync: typeof createConfigItemAsync;
declare const ___createConfigItemSync: typeof createConfigItemSync;
declare const ___getEnv: typeof getEnv;
declare const ___loadOptions: typeof loadOptions;
declare const ___loadOptionsAsync: typeof loadOptionsAsync;
declare const ___loadOptionsSync: typeof loadOptionsSync;
declare const ___loadPartialConfig: typeof loadPartialConfig;
declare const ___loadPartialConfigAsync: typeof loadPartialConfigAsync;
declare const ___loadPartialConfigSync: typeof loadPartialConfigSync;
declare const ___parse: typeof parse;
declare const ___parseAsync: typeof parseAsync;
declare const ___parseSync: typeof parseSync;
declare const ___resolvePlugin: typeof resolvePlugin;
declare const ___resolvePreset: typeof resolvePreset;
declare const ___template: typeof template;
declare const ___tokTypes: typeof tokTypes;
declare const ___transform: typeof transform;
declare const ___transformAsync: typeof transformAsync;
declare const ___transformFile: typeof transformFile;
declare const ___transformFileAsync: typeof transformFileAsync;
declare const ___transformFileSync: typeof transformFileSync;
declare const ___transformFromAst: typeof transformFromAst;
declare const ___transformFromAstAsync: typeof transformFromAstAsync;
declare const ___transformFromAstSync: typeof transformFromAstSync;
declare const ___transformSync: typeof transformSync;
declare const ___version: typeof version;
declare namespace __ {
  export { type ___CallerMetadata as CallerMetadata, type ___ConfigAPI as ConfigAPI, ___ConfigItem as ConfigItem, ___DEFAULT_EXTENSIONS as DEFAULT_EXTENSIONS, ___File as File, type ___FileResult as FileResult, type ___InputOptions as InputOptions, ___NodePath as NodePath, type ___NormalizedOptions as NormalizedOptions, ___PartialConfig as PartialConfig, type ___PluginAPI as PluginAPI, type ___PluginItem as PluginItem, type ___PluginObject as PluginObject, ___PluginPass as PluginPass, type ___PluginTarget as PluginTarget, type ___PresetAPI as PresetAPI, type ___PresetItem as PresetItem, type ___PresetObject as PresetObject, type ___PresetTarget as PresetTarget, ___Scope as Scope, type ___Visitor as Visitor, type ___VisitorBase as VisitorBase, export_default as buildExternalHelpers, ___createConfigItem as createConfigItem, ___createConfigItemAsync as createConfigItemAsync, ___createConfigItemSync as createConfigItemSync, ___getEnv as getEnv, ___loadOptions as loadOptions, ___loadOptionsAsync as loadOptionsAsync, ___loadOptionsSync as loadOptionsSync, ___loadPartialConfig as loadPartialConfig, ___loadPartialConfigAsync as loadPartialConfigAsync, ___loadPartialConfigSync as loadPartialConfigSync, ___parse as parse, ___parseAsync as parseAsync, ___parseSync as parseSync, ___resolvePlugin as resolvePlugin, ___resolvePreset as resolvePreset, ___template as template, ___tokTypes as tokTypes, ___transform as transform, ___transformAsync as transformAsync, ___transformFile as transformFile, ___transformFileAsync as transformFileAsync, ___transformFileSync as transformFileSync, ___transformFromAst as transformFromAst, ___transformFromAstAsync as transformFromAstAsync, ___transformFromAstSync as transformFromAstSync, ___transformSync as transformSync, _babel_traverse__default as traverse, t as types, ___version as version };
}

declare const __marker: unique symbol;
type ReadonlyDeepArray<T> = readonly (T | ReadonlyDeepArray<T>)[] & {
    [__marker]: true;
};

type SimpleCacheConfigurator = {
    (forever: boolean): void;
    <T extends SimpleType>(handler: () => T): T;
    forever: () => void;
    never: () => void;
    using: <T extends SimpleType>(handler: () => T) => T;
    invalidate: <T extends SimpleType>(handler: () => T) => T;
};
type SimpleType = string | boolean | number | null | undefined | Promise<SimpleType>;

type FileHandling = "transpile" | "ignored" | "unsupported";

type EnvName = NonNullable<InputOptions["envName"]>;
type EnvFunction = {
    (): string;
    <T extends SimpleType>(extractor: (envName: EnvName) => T): T;
    (envVar: string): boolean;
    (envVars: string[]): boolean;
};
type CallerFactory = {
    <T extends SimpleType>(extractor: (callerMetadata: CallerMetadata | undefined) => T): T;
    (extractor: (callerMetadata: CallerMetadata | undefined) => unknown): SimpleType;
};
type TargetsFunction = () => Targets;
type AssumptionFunction = (name: AssumptionName) => boolean | undefined;
type ConfigAPI = {
    version: string;
    cache: SimpleCacheConfigurator;
    env: EnvFunction;
    async: () => boolean;
    assertVersion: typeof assertVersion;
    caller: CallerFactory;
};
type PresetAPI$1 = {
    targets: TargetsFunction;
    addExternalDependency: (ref: string) => void;
} & ConfigAPI;
type PluginAPI$1 = {
    assumption: AssumptionFunction;
} & PresetAPI$1;
declare function assertVersion(range: string | number): void;

interface UnloadedDescriptor<API, Options = object | undefined> {
    name: string | undefined;
    value: object | ((api: API, options: Options, dirname: string) => unknown);
    options: Options;
    dirname: string;
    alias: string;
    ownPass?: boolean;
    file?: {
        request: string;
        resolved: string;
    };
}

/**
 * Create a config item using the same value format used in Babel's config
 * files. Items returned from this function should be cached by the caller
 * ideally, as recreating the config item will mean re-resolving the item
 * and re-evaluating the plugin/preset function.
 */
declare function createConfigItem$1<API>(value: PluginItem | PresetItem, { dirname, type, }?: {
    dirname?: string;
    type?: "preset" | "plugin";
}): Handler<ConfigItem<API>>;
declare const CONFIG_ITEM_BRAND: unique symbol;
/**
 * A public representation of a plugin/preset that will _eventually_ be load.
 * Users can use this to interact with the results of a loaded Babel
 * configuration.
 *
 * Any changes to public properties of this class should be considered a
 * breaking change to Babel's API.
 */
declare class ConfigItem<API> {
    /**
     * The private underlying descriptor that Babel actually cares about.
     * If you access this, you are a bad person.
     */
    _descriptor: UnloadedDescriptor<API>;
    /**
     * Used to detect ConfigItem instances from other Babel instances.
     */
    [CONFIG_ITEM_BRAND]: boolean;
    /**
     * The resolved value of the item itself.
     */
    value: object | Function;
    /**
     * The options, if any, that were passed to the item.
     * Mutating this will lead to undefined behavior.
     *
     * "false" means that this item has been disabled.
     */
    options: object | void | false;
    /**
     * The directory that the options for this item are relative to.
     */
    dirname: string;
    /**
     * Get the name of the plugin, if the user gave it one.
     */
    name: string | void;
    /**
     * Data about the file that the item was loaded from, if Babel knows it.
     */
    file: {
        request: string;
        resolved: string;
    } | void;
    constructor(descriptor: UnloadedDescriptor<API>);
}

type Assumptions = {
    arrayLikeIsIterable?: boolean;
    constantReexports?: boolean;
    constantSuper?: boolean;
    enumerableModuleMeta?: boolean;
    ignoreFunctionLength?: boolean;
    ignoreToPrimitiveHint?: boolean;
    iterableIsArray?: boolean;
    mutableTemplateObject?: boolean;
    noClassCalls?: boolean;
    noDocumentAll?: boolean;
    noIncompleteNsImportDetection?: boolean;
    noNewArrows?: boolean;
    noUninitializedPrivateFieldAccess?: boolean;
    objectRestNoSymbols?: boolean;
    privateFieldsAsProperties?: boolean;
    privateFieldsAsSymbols?: boolean;
    pureGetters?: boolean;
    setClassMethods?: boolean;
    setComputedProperties?: boolean;
    setPublicClassFields?: boolean;
    setSpreadProperties?: boolean;
    skipForOfIteratorClosing?: boolean;
    superIsCallableConstructor?: boolean;
};
type AssumptionName = keyof Assumptions;
type InputOptions = {
    cwd?: string;
    filename?: string;
    filenameRelative?: string;
    babelrc?: boolean;
    babelrcRoots?: BabelrcSearch;
    configFile?: ConfigFileSearch;
    root?: string;
    rootMode?: RootMode;
    code?: boolean;
    ast?: boolean;
    cloneInputAst?: boolean;
    inputSourceMap?: RootInputSourceMapOption;
    envName?: string;
    caller?: CallerMetadata;
    extends?: string;
    env?: EnvSet<InputOptions>;
    ignore?: MatchItem[];
    only?: MatchItem[];
    overrides?: InputOptions[];
    showIgnoredFiles?: boolean;
    test?: ConfigApplicableTest;
    include?: ConfigApplicableTest;
    exclude?: ConfigApplicableTest;
    presets?: PresetItem[];
    plugins?: PluginItem[];
    passPerPreset?: boolean;
    assumptions?: Assumptions;
    targets?: TargetsListOrObject;
    browserslistConfigFile?: ConfigFileSearch;
    browserslistEnv?: string;
    retainLines?: GeneratorOptions["retainLines"];
    comments?: GeneratorOptions["comments"];
    shouldPrintComment?: GeneratorOptions["shouldPrintComment"];
    compact?: GeneratorOptions["compact"];
    minified?: GeneratorOptions["minified"];
    auxiliaryCommentBefore?: GeneratorOptions["auxiliaryCommentBefore"];
    auxiliaryCommentAfter?: GeneratorOptions["auxiliaryCommentAfter"];
    sourceType?: SourceTypeOption;
    wrapPluginVisitorMethod?: VisitWrapper | null;
    highlightCode?: boolean;
    sourceMaps?: SourceMapsOption;
    sourceMap?: SourceMapsOption;
    sourceFileName?: string;
    sourceRoot?: string;
    parserOpts?: ParserOptions;
    generatorOpts?: GeneratorOptions;
};
type NormalizedOptions = Omit<InputOptions, "presets" | "plugins"> & {
    assumptions: Assumptions;
    targets: Targets;
    cloneInputAst: boolean;
    babelrc: false;
    configFile: false;
    browserslistConfigFile: false;
    passPerPreset: false;
    envName: string;
    cwd: string;
    root: string;
    rootMode: "root";
    filename: string | undefined;
    presets: ConfigItem<PresetAPI>[];
    plugins: ConfigItem<PluginAPI>[];
};
type ResolvedOptions = Omit<NormalizedOptions, "presets" | "plugins" | "passPerPreset"> & {
    presets: {
        plugins: Plugin[];
    }[];
    plugins: Plugin[];
    passPerPreset: boolean;
};
type CallerMetadata = {
    name: string;
    supportsStaticESM?: boolean;
    supportsDynamicImport?: boolean;
    supportsTopLevelAwait?: boolean;
    supportsExportNamespaceFrom?: boolean;
};
type EnvSet<T> = Record<string, T>;
type MatchItem = string | RegExp | ((path: string | undefined, context: {
    dirname: string;
    caller: CallerMetadata | undefined;
    envName: string;
}) => unknown);
type MaybeDefaultProperty<T> = T | {
    default: T;
};
type PluginTarget<Option = object> = string | MaybeDefaultProperty<(api: PluginAPI, options: Option, dirname: string) => PluginObject>;
type PluginItem<Option = object> = ConfigItem<PluginAPI> | PluginTarget<Option> | [PluginTarget<Option>, Option] | [PluginTarget<Option>, Option, string];
type PresetTarget<Option = object> = string | MaybeDefaultProperty<(api: PresetAPI, options: Option, dirname: string) => PresetObject>;
type PresetItem<Option = object> = ConfigItem<PresetAPI> | PresetTarget<Option> | [PresetTarget<Option>, Option] | [PresetTarget<Option>, Option, string];
type ConfigApplicableTest = MatchItem | MatchItem[];
type ConfigFileSearch = string | boolean;
type BabelrcSearch = boolean | MatchItem | MatchItem[];
type SourceMapsOption = boolean | "inline" | "both";
type SourceTypeOption = "module" | "commonjs" | "script" | "unambiguous";
interface InputSourceMap {
    version: number;
    sources: string[];
    names: string[];
    sourceRoot?: string | undefined;
    sourcesContent?: string[] | undefined;
    mappings: string;
    file: string;
}
type RootInputSourceMapOption = InputSourceMap | boolean;
type RootMode = "root" | "upward" | "upward-optional";
type TargetsListOrObject = Targets | InputTargets | InputTargets["browsers"];

type PluginObject<S extends PluginPass = PluginPass> = {
    name?: string;
    manipulateOptions?: (options: ResolvedOptions & {
        generatorOpts: GeneratorOptions;
    }, parserOpts: ParserOptions & {
        plugins: NonNullable<ParserOptions["plugins"]>;
    }) => void;
    pre?: (this: S, file: File) => void | Promise<void>;
    post?: (this: S, file: File) => void | Promise<void>;
    inherits?: (api: PluginAPI, options: any, dirname: string) => PluginObject;
    visitor?: Visitor$1<S>;
    parserOverride?: (...args: [...Parameters<typeof parse$1>, typeof parse$1]) => ReturnType<typeof parse$1>;
    generatorOverride?: (ast: File["ast"], generatorOpts: GeneratorOptions, code: File["code"], generate: typeof babelGenerator) => GeneratorResult;
};

declare class Plugin {
    key: string | undefined | null;
    manipulateOptions?: PluginObject["manipulateOptions"];
    post?: PluginObject["post"];
    pre?: PluginObject["pre"];
    visitor: PluginObject["visitor"];
    parserOverride?: PluginObject["parserOverride"];
    generatorOverride?: PluginObject["generatorOverride"];
    options: object;
    externalDependencies: ReadonlyDeepArray<string>;
    constructor(plugin: PluginObject, options: object, key?: string, externalDependencies?: ReadonlyDeepArray<string>);
}

declare function loadPartialConfig$1(opts?: InputOptions): Handler<PartialConfig | null>;

declare class PartialConfig {
    /**
     * These properties are public, so any changes to them should be considered
     * a breaking change to Babel's API.
     */
    options: NormalizedOptions;
    babelrc: string | undefined;
    babelignore: string | undefined;
    config: string | undefined;
    fileHandling: FileHandling;
    files: Set<string>;
    constructor(options: NormalizedOptions, babelrc: string | undefined, ignore: string | undefined, config: string | undefined, fileHandling: FileHandling, files: Set<string>);
    /**
     * Returns true if there is a config file in the filesystem for this config.
     */
    hasFilesystemConfig(): boolean;
}

type PluginAPI = PluginAPI$1 & typeof __;
type PresetAPI = PresetAPI$1 & typeof __;

declare const loadPartialConfigRunner: gensync.Gensync<[opts?: InputOptions | undefined], PartialConfig | null, any>;
declare function loadPartialConfigAsync(...args: Parameters<typeof loadPartialConfigRunner.async>): Promise<PartialConfig | null>;
declare function loadPartialConfigSync(...args: Parameters<typeof loadPartialConfigRunner.sync>): PartialConfig | null;
declare function loadPartialConfig(opts: Parameters<typeof loadPartialConfig$1>[0], callback?: (err: Error, val: PartialConfig | null) => void): void;
declare function loadOptionsImpl(opts: InputOptions | null | undefined): Handler<ResolvedOptions | null>;
declare const loadOptionsRunner: gensync.Gensync<[opts: InputOptions | null | undefined], ResolvedOptions | null, any>;
declare function loadOptionsAsync(...args: Parameters<typeof loadOptionsRunner.async>): Promise<ResolvedOptions | null>;
declare function loadOptionsSync(...args: Parameters<typeof loadOptionsRunner.sync>): ResolvedOptions | null;
declare function loadOptions(opts: Parameters<typeof loadOptionsImpl>[0], callback?: (err: Error, val: ResolvedOptions | null) => void): void;
declare const createConfigItemRunner: gensync.Gensync<[value: string | ConfigItem<PresetAPI> | ((api: PresetAPI, options: object, dirname: string) => PresetObject) | {
    default: (api: PresetAPI, options: object, dirname: string) => PresetObject;
} | [PresetTarget<object>, object] | [PresetTarget<object>, object, string] | ConfigItem<PluginAPI> | ((api: PluginAPI, options: object, dirname: string) => PluginObject) | {
    default: (api: PluginAPI, options: object, dirname: string) => PluginObject;
} | [PluginTarget<object>, object] | [PluginTarget<object>, object, string], ({
    dirname?: string;
    type?: "preset" | "plugin";
} | undefined)?], ConfigItem<unknown>, any>;
declare function createConfigItemAsync(...args: Parameters<typeof createConfigItemRunner.async>): Promise<ConfigItem<unknown>>;
declare function createConfigItemSync(...args: Parameters<typeof createConfigItemRunner.sync>): ConfigItem<unknown>;
declare function createConfigItem(target: PluginTarget, options: Parameters<typeof createConfigItem$1>[1], callback?: (err: Error, val: ConfigItem<PluginAPI> | null) => void): void;

type NormalizedFile = {
    code: string;
    ast: t.File;
    inputMap: SourceMapConverter | null;
};

declare class File {
    _map: Map<unknown, unknown>;
    opts: ResolvedOptions;
    declarations: Record<string, t.Identifier>;
    path: NodePath<t.Program>;
    ast: t.File;
    scope: Scope;
    metadata: Record<string, any>;
    code: string;
    inputMap: SourceMapConverter | null;
    hub: HubInterface & {
        file: File;
    };
    constructor(options: ResolvedOptions, { code, ast, inputMap }: NormalizedFile);
    /**
     * Provide backward-compatible access to the interpreter directive handling
     * in Babel 6.x. If you are writing a plugin for Babel 7.x or higher, it would be
     * best to use 'program.interpreter' directly.
     */
    get shebang(): string;
    set shebang(value: string);
    set(key: unknown, val: unknown): void;
    get(key: unknown): any;
    has(key: unknown): boolean;
    /**
     * Check if a given helper is available in @babel/core's helper list.
     *
     * This _also_ allows you to pass a Babel version specifically. If the
     * helper exists, but was not available for the full given range, it will be
     * considered unavailable.
     */
    availableHelper(name: string, versionRange?: string | null): boolean;
    addHelper(name: string): t.Identifier;
    _addHelper(name: string): t.Identifier;
    buildCodeFrameError(node: t.Node | undefined | null, msg: string, _Error?: typeof Error): Error;
}

declare class PluginPass<Options = object> {
    _map: Map<unknown, unknown>;
    key: string | undefined | null;
    file: File;
    opts: Partial<Options>;
    /**
     * The working directory that Babel's programmatic options are loaded
     * relative to.
     */
    cwd: string;
    /** The absolute path of the file being compiled. */
    filename: string | undefined;
    /**
     * Is Babel executed in async mode or not.
     */
    isAsync: boolean;
    constructor(file: File, key: string | null | undefined, options: Options | undefined, isAsync: boolean);
    set(key: unknown, val: unknown): void;
    get(key: unknown): any;
    availableHelper(name: string, versionRange?: string | null): boolean;
    addHelper(name: string): t.Identifier;
    buildCodeFrameError(node: t.Node | undefined | null, msg: string, _Error?: typeof Error): Error;
}

declare function export_default(allowlist?: string[], outputType?: "global" | "module" | "umd" | "var"): string;

declare function getEnv(defaultValue?: string): string;

type FileResultCallback = {
    (err: Error, file: null): void;
    (err: null, file: FileResult | null): void;
};
type FileResult = {
    metadata: Record<string, any>;
    options: Record<string, any>;
    ast: t.File | null;
    code: string | null;
    map: GeneratorResult["map"];
    sourceType: Exclude<SourceTypeOption, "unambiguous">;
    externalDependencies: Set<string>;
};

type Transform = {
    (code: string, callback: FileResultCallback): void;
    (code: string, opts: InputOptions | undefined | null, callback: FileResultCallback): void;
};
declare const transformRunner: gensync.Gensync<[code: string, opts?: InputOptions | null | undefined], FileResult | null, any>;
declare const transform: Transform;
declare function transformSync(...args: Parameters<typeof transformRunner.sync>): FileResult | null;
declare function transformAsync(...args: Parameters<typeof transformRunner.async>): Promise<FileResult | null>;

declare const transformFileRunner: gensync.Gensync<[filename: string, opts?: InputOptions | undefined], FileResult | null, any>;
declare function transformFile(filename: string, callback: FileResultCallback): void;
declare function transformFile(filename: string, opts: InputOptions | undefined | null, callback: FileResultCallback): void;
declare function transformFileSync(...args: Parameters<typeof transformFileRunner.sync>): FileResult | null;
declare function transformFileAsync(...args: Parameters<typeof transformFileRunner.async>): Promise<FileResult | null>;

type AstRoot = t.File | t.Program;
type TransformFromAst = {
    (ast: AstRoot, code: string, callback: FileResultCallback): void;
    (ast: AstRoot, code: string, opts: InputOptions | undefined | null, callback: FileResultCallback): void;
};
declare const transformFromAstRunner: gensync.Gensync<[ast: AstRoot, code: string, opts: InputOptions | null | undefined], FileResult | null, any>;
declare const transformFromAst: TransformFromAst;
declare function transformFromAstSync(...args: Parameters<typeof transformFromAstRunner.sync>): FileResult | null;
declare function transformFromAstAsync(...args: Parameters<typeof transformFromAstRunner.async>): Promise<FileResult | null>;

type FileParseCallback = {
    (err: Error, ast: null): void;
    (err: null, ast: ParseResult | null): void;
};
type Parse = {
    (code: string, callback: FileParseCallback): void;
    (code: string, opts: InputOptions | undefined | null, callback: FileParseCallback): void;
};
declare const parseRunner: gensync.Gensync<[code: string, opts: InputOptions | null | undefined], ParseResult | null, any>;
declare const parse: Parse;
declare function parseSync(...args: Parameters<typeof parseRunner.sync>): ParseResult | null;
declare function parseAsync(...args: Parameters<typeof parseRunner.async>): Promise<ParseResult | null>;

declare const version: string;

declare const resolvePlugin: (name: string, dirname: string) => string;
declare const resolvePreset: (name: string, dirname: string) => string;

type Visitor<S = unknown> = _babel_traverse.Visitor<S>;
type VisitorBase<S = unknown> = _babel_traverse.VisitorBase<S>;

type PresetObject = {
    overrides?: PresetObject[];
    test?: ConfigApplicableTest;
    plugins?: PluginItem[];
};

/**
 * Recommended set of compilable extensions. Not used in @babel/core directly, but meant as
 * as an easy source for tooling making use of @babel/core.
 */
declare const DEFAULT_EXTENSIONS: readonly [".js", ".jsx", ".es6", ".es", ".mjs", ".cjs"];

export { type CallerMetadata, type ConfigAPI, ConfigItem, DEFAULT_EXTENSIONS, File, type FileResult, type InputOptions, type NormalizedOptions, PartialConfig, type PluginAPI, type PluginItem, type PluginObject, PluginPass, type PluginTarget, type PresetAPI, type PresetItem, type PresetObject, type PresetTarget, type Visitor, type VisitorBase, export_default as buildExternalHelpers, createConfigItem, createConfigItemAsync, createConfigItemSync, getEnv, loadOptions, loadOptionsAsync, loadOptionsSync, loadPartialConfig, loadPartialConfigAsync, loadPartialConfigSync, parse, parseAsync, parseSync, resolvePlugin, resolvePreset, transform, transformAsync, transformFile, transformFileAsync, transformFileSync, transformFromAst, transformFromAstAsync, transformFromAstSync, transformSync, version };
