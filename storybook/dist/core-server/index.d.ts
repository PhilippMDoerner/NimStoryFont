import { $o as StringSchema, As as ServiceInstanceOf, Cs as RuntimeService, Ds as ServiceDescriptor, Es as ServiceDefinition, Go as DescriptionAction, Jo as NumberSchema, Ko as GenericSchema, Ls as Tag, Os as ServiceId, Ps as ServiceSummary, Qi as ModuleGraphServiceState, Qo as SchemaWithPipe, Ts as ServerServiceRegistration, Wo as ArraySchema, Xo as OptionalSchema, Xs as TestProviderStoreById, Yo as ObjectSchema, Ys as TestProviderStateByProviderId, Zo as RecordSchema, Zs as TestProviderStoreEvent, _s as QueryCtx, ac as UniversalStore, c as StatusStoreEvent, co as ImportParser, cs as CommandDefinition, d as StatusesByStoryIdAndTypeId, do as ChangeDetectionAdapter, es as UndefinedSchema, fo as FileChangeEvent, gs as Query, i as Status, is as defineService, js as ServiceRegistrationOptions, ks as ServiceInstance, l as StatusTypeId, lo as ImportParserContext, ms as OperationDescriptor, ns as VoidSchema, o as StatusStore, os as Command, po as ModuleResolveConfig, qo as LiteralSchema, qs as TestProviderId, rc as MockUniversalStore, s as StatusStoreByTypeId$1, so as ImportEdge, ss as CommandCtx, ts as VariantSchema, uo as ParseFileArgs, vs as QueryDefinition, ws as SchemaDescriptor, ys as QueryFunctions } from "../chunk-Cp-ouEY1.js";
import { t as StorybookError } from "../chunk-CMHAf_uD.js";
import { n as registerService, t as getService } from "../chunk-BoJt3T-D.js";
import { ArgTypes, SBType } from "storybook/internal/csf";
import { BuilderOptions, CLIOptions, DocsIndexEntry, DocsOptions, IndexEntry, IndexInputStats, Indexer, LoadOptions, NormalizedStoriesSpecifier, Options, Path, StatusStoreByTypeId, StatusValue, StoryIndex, StoryIndexEntry, StorybookConfigRaw } from "storybook/internal/types";
import { CreateNewStoryRequestPayload } from "storybook/internal/core-events";
import { getPreviewBodyTemplate, getPreviewHeadTemplate, loadAllPresets } from "storybook/internal/common";
import { EventType } from "storybook/internal/telemetry";
import { watch } from "node:fs";
import { readFile, stat } from "node:fs/promises";

//#region code/core/.dts-emit/code/core/src/core-server/build-static.d.ts
type BuildStaticStandaloneOptions = CLIOptions & LoadOptions & BuilderOptions & {
  outputDir: string;
};
declare function buildStaticStandalone(options: BuildStaticStandaloneOptions): Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/build-dev.d.ts
/**
 * Resolves the initialPath for the browser open URL.
 * CLI-provided initialPath always wins. If not set and not running in an agent context,
 * checks the project cache for an `onboarding-pending` entry written by `storybook init`.
 * If found, returns '/onboarding' and removes the cache entry so it only triggers once.
 * The cache entry is only written by init when onboarding is known to be supported,
 * so no further addon check is needed here.
 */
declare function resolveOnboardingInitialPath(cliInitialPath: string | undefined): Promise<string | undefined>;
declare function buildDevStandalone(options: CLIOptions & LoadOptions & BuilderOptions & {
  storybookVersion?: string;
  previewConfigPath?: string;
}): Promise<{
  port: number;
  address: string;
  networkAddress: string;
}>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/build-index.d.ts
type BuildIndexOptions = CLIOptions & LoadOptions & BuilderOptions;
declare const buildIndex: (options: BuildIndexOptions) => Promise<import("storybook/internal/types").StoryIndex>;
declare const buildIndexStandalone: (options: BuildIndexOptions & {
  outputFile: string;
}) => Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/withTelemetry.d.ts
type TelemetryOptions = {
  cliOptions: CLIOptions;
  presetOptions?: Parameters<typeof loadAllPresets>[0];
  printError?: (err: any) => void;
  skipPrompt?: boolean;
  eventType?: EventType;
  fallbackTelemetryState?: boolean;
};
type ErrorLevel = 'none' | 'error' | 'full';
declare function getErrorLevel({
  cliOptions,
  presetOptions,
  skipPrompt,
  eventType
}: TelemetryOptions): Promise<ErrorLevel>;
declare function sendTelemetryError(_error: unknown, eventType: EventType, options: TelemetryOptions, blocking?: boolean, parent?: StorybookError): Promise<void>;
declare function withTelemetry<T>(eventType: EventType, options: TelemetryOptions, run: () => Promise<T>): Promise<T | undefined>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/standalone.d.ts
declare function build(options?: any, frameworkOptions?: any): Promise<void | {
  port: number;
  address: string;
  networkAddress: string;
}>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/server-statics.d.ts
declare const mapStaticDir: (staticDir: NonNullable<StorybookConfigRaw['staticDirs']>[number], configDir: string) => {
  staticDir: string;
  staticPath: string;
  targetDir: string;
  targetEndpoint: string;
};
//#endregion
//#region node_modules/tsconfig-paths/lib/filesystem.d.ts
/**
 * A function that json from a file
 */
interface ReadJsonSync {
  (packageJsonPath: string): any | undefined;
}
//#endregion
//#region node_modules/tsconfig-paths/lib/match-path-sync.d.ts
/**
 * Function that can match a path
 */
interface MatchPath {
  (requestedModule: string, readJson?: ReadJsonSync, fileExists?: (name: string) => boolean, extensions?: ReadonlyArray<string>): string | undefined;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/IndexingError.d.ts
declare class IndexingError extends Error {
  importPaths: string[];
  constructor(message: string, importPaths: string[], stack?: string);
  pathsString(): string;
  toString(): string;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/summarizeStats.d.ts
type IndexStatsSummary = Record<keyof IndexInputStats, number>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/StoryIndexGenerator.d.ts
type StoryIndexEntryWithExtra = StoryIndexEntry & {
  extra: {
    metaId?: string;
    stats: IndexInputStats;
  };
};
/** A .mdx file will produce a docs entry */
type DocsCacheEntry = DocsIndexEntry;
/** A `_.stories._` file will produce a list of stories and possibly a docs entry */
type StoriesCacheEntry = {
  entries: (StoryIndexEntryWithExtra | DocsIndexEntry)[];
  dependents: Path[];
  type: 'stories';
};
type ErrorEntry = {
  type: 'error';
  err: IndexingError;
};
type CacheEntry = false | StoriesCacheEntry | DocsCacheEntry | ErrorEntry;
type SpecifierStoriesCache = Record<Path, CacheEntry>;
type StoryIndexGeneratorOptions = {
  workingDir: Path;
  configDir: Path;
  indexers: Indexer[];
  docs: DocsOptions;
  build?: StorybookConfigRaw['build'];
};
/**
 * The StoryIndexGenerator extracts stories and docs entries for each file matching (one or more)
 * stories "specifiers", as defined in main.js.
 *
 * The output is a set of entries (see above for the types).
 *
 * Each file is treated as a stories or a (modern) docs file.
 *
 * A stories file is indexed by an indexer (passed in), which produces a list of stories.
 *
 * - If the stories have the `parameters.docsOnly` setting, they are disregarded.
 * - If the stories have `autodocs` enabled, a docs entry is added pointing to the story file.
 *
 * A (modern) docs (.mdx) file is indexed, a docs entry is added.
 *
 * In the preview, a docs entry with the `autodocs` tag will be rendered as a CSF file that exports
 * an MDX template on the `docs.page` parameter, whereas other docs entries are rendered as MDX
 * files directly.
 *
 * The entries are "uniq"-ed and sorted. Stories entries are preferred to docs entries and MDX docs
 * entries are preferred to CSF templates (with warnings).
 */
declare class StoryIndexGenerator {
  readonly specifiers: NormalizedStoriesSpecifier[];
  readonly options: StoryIndexGeneratorOptions;
  private specifierToCache;
  /** Cache for findMatchingFiles results */
  private static findMatchingFilesCache;
  private lastIndex?;
  private lastStats?;
  private lastError?;
  private invalidationListeners;
  constructor(specifiers: NormalizedStoriesSpecifier[], options: StoryIndexGeneratorOptions);
  /** Generate a cache key for findMatchingFiles */
  private static getFindMatchingFilesCacheKey;
  /** Clear the findMatchingFiles cache */
  static clearFindMatchingFilesCache(): void;
  static findMatchingFiles(specifier: NormalizedStoriesSpecifier, workingDir: Path, ignoreWarnings?: boolean): Promise<SpecifierStoriesCache>;
  static findMatchingFilesForSpecifiers(specifiers: NormalizedStoriesSpecifier[], workingDir: Path, ignoreWarnings?: boolean): Promise<Array<readonly [NormalizedStoriesSpecifier, SpecifierStoriesCache]>>;
  initialize(): Promise<void>;
  /** Run the updater function over all the empty cache entries */
  updateExtracted(updater: (specifier: NormalizedStoriesSpecifier, absolutePath: Path, existingEntry: CacheEntry) => Promise<CacheEntry>, overwrite?: boolean): Promise<void>;
  isDocsMdx(absolutePath: Path): boolean;
  ensureExtracted({
    projectTags
  }: {
    projectTags?: Tag[];
  }): Promise<{
    entries: (IndexEntry | ErrorEntry)[];
    stats: IndexStatsSummary;
  }>;
  findDependencies(absoluteImports: Path[]): StoriesCacheEntry[];
  /**
   * Try to find the component path from a raw import string and return it in the same format as
   * `importPath`. Respect tsconfig paths if available.
   *
   * If no such file exists, assume that the import is from a package and return the raw
   */
  resolveComponentPath(rawComponentPath: Path, absolutePath: Path, matchPath: MatchPath | undefined): string;
  extractStories(specifier: NormalizedStoriesSpecifier, absolutePath: Path, projectTags?: Tag[]): Promise<StoriesCacheEntry | DocsCacheEntry>;
  extractDocs(specifier: NormalizedStoriesSpecifier, absolutePath: Path, projectTags?: Tag[]): Promise<false | DocsIndexEntry>;
  chooseDuplicate(firstEntry: IndexEntry, secondEntry: IndexEntry, projectTags: Tag[]): IndexEntry;
  sortStories(entries: StoryIndex['entries'], storySortParameter: any): Promise<Record<string, IndexEntry>>;
  getIndex(): Promise<StoryIndex>;
  getIndexAndStats(): Promise<{
    storyIndex: StoryIndex;
    stats: IndexStatsSummary;
  }>;
  invalidateAll(): void;
  invalidate(importPath: Path, removed: boolean): void;
  onInvalidated(listener: () => void): () => void;
  getPreviewCode(): Promise<string | undefined>;
  getProjectTags(previewCode?: string): string[];
  static storyFileNames(specifierToCache: Map<NormalizedStoriesSpecifier, SpecifierStoriesCache>): string[];
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/get-stories-paths-from-config.d.ts
/**
 * Resolves story file paths from a main config's `stories` field without evaluating story files.
 *
 * @example
 *
 * ```typescript
 * const storiesPaths = await getStoriesPathsFromConfig({
 *   stories: ['src\/**\/*.stories.tsx'],
 *   configDir: '/path/to/.storybook',
 *   workingDir: '/path/to/project',
 * });
 * ```
 */
declare const getStoriesPathsFromConfig: ({
  stories,
  configDir,
  workingDir
}: {
  stories: StorybookConfigRaw['stories'];
  configDir: string;
  workingDir: string;
}) => Promise<string[]>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/generate-story.d.ts
interface GenerateStoryResult {
  success: boolean;
  storyId?: string;
  kind?: string;
  storyFilePath?: string;
  exportedStoryName?: string;
  error?: string;
  errorType?: 'STORY_FILE_EXISTS' | 'UNKNOWN';
}
interface GenerateStoryOptions {
  /**
   * If true, checks if the file exists and returns an error without writing. If false, writes the
   * file even if it exists (overwrites).
   *
   * @default true
   */
  checkFileExists?: boolean;
}
/**
 * Generates and writes a new story file for a component.
 *
 * This function orchestrates the entire story file creation process:
 *
 * 1. Generates the story file path and content based on the component
 * 2. Optionally checks if the file already exists
 * 3. Writes the story file to disk
 * 4. Returns metadata about the created story
 *
 * @example
 *
 * ```ts
 * const result = await generateStoryFile(
 *   {
 *     componentFilePath: 'src/components/Button.tsx',
 *     componentExportName: 'Button',
 *     componentIsDefaultExport: true,
 *     componentExportCount: 1,
 *   },
 *   options
 * );
 *
 * if (result.success) {
 *   console.log(`Story created at ${result.storyFilePath}`);
 * }
 * ```
 *
 * @param payload - The component information for which to create a story
 * @param options - Storybook options for configuration
 * @param generateOptions - Additional options for story generation behavior
 * @returns A promise that resolves to the result of the story generation
 */
declare function generateStoryFile(payload: CreateNewStoryRequestPayload, options: Options, generateOptions?: GenerateStoryOptions): Promise<GenerateStoryResult>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/get-dummy-args-from-argtypes.d.ts
type ComponentArgTypesInfo = {
  required: boolean;
  type: SBType;
};
type ComponentArgTypesData = {
  props?: Record<string, ComponentArgTypesInfo>;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/load.d.ts
declare function loadStorybook(options: CLIOptions & LoadOptions & BuilderOptions & {
  storybookVersion?: string;
  previewConfigPath?: string;
}): Promise<Options>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/analyze-mdx.d.ts
type MdxAnalysisResult = {
  title: string | undefined;
  of: string | undefined;
  name: string | undefined;
  id: string | undefined;
  summary: string | undefined;
  isTemplate: boolean;
  metaTags?: string[];
  imports: string[];
};
declare const analyzeMdx: (code: string) => Promise<MdxAnalysisResult>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/manifests/mdx-manifest.d.ts
/**
 * Canonical contract for the MDX docs open service.
 *
 * The service implementation lives in `@storybook/addon-docs`, but the data contract (service id,
 * on-disk/`$ref` layout, payload shapes, and the consumer query handle) lives here in core so the
 * addon that produces it and the core manifest writer that consumes it share one source of truth.
 * Mirrors the docgen service contract under `shared/open-service/services/docgen/`.
 */
/** A JSON Reference (`{ $ref }`) pointing at a value in another manifest document. */
type JsonRef = {
  $ref: string;
};
/** Open-service id for the MDX docs service (also the on-disk directory under `services/`). */
declare const MDX_SERVICE_ID = "addon-docs/mdx";
/** Free-form error captured while reading or analyzing an MDX doc. */
interface MdxError {
  name: string;
  message: string;
}
/**
 * One MDX doc, both as stored in the service and as resolved from a manifest `$ref`.
 *
 * `summary` shares `content`'s optionality: it is derived from the doc when available (an explicit
 * `Meta` summary, falling back to text extracted from the content) and omitted otherwise.
 */
interface MdxDocPayload {
  id: string;
  name: string;
  path: string;
  title: string;
  content?: string;
  summary?: string;
  error?: MdxError;
  mdx?: never;
}
/** Per-component MDX payload: every doc grouped under a single component (or standalone) id. */
interface MdxPayload {
  id: string;
  name: string;
  docs: Record<string, MdxDocPayload>;
}
/** Shallow docs index row: id, name, optional summary, and a `$ref` to the full MDX payload. */
interface DocsManifestRefEntry {
  id: string;
  name: string;
  summary?: string;
  mdx: JsonRef;
  path?: never;
  title?: never;
  content?: never;
  error?: never;
}
/** A docs manifest entry is either an inline payload or a shallow `$ref` row. */
type DocsManifestEntry = MdxDocPayload | DocsManifestRefEntry;
/** Minimal consumer handle for reading every MDX payload from the live service (dev). */
interface MdxServiceContract {
  queries: {
    mdxForAllComponents: {
      loaded: () => Promise<Record<string, MdxPayload>>;
    };
  };
}
/** Relative path segment for one component's static snapshot file (`<id>.json`). */
declare function mdxQueryStaticPath(id: string): string;
/** Logical static-store key: `addon-docs/mdx/<id>.json`. */
declare function mdxStaticStorePath(id: string): string;
/** `$ref` target for one doc, relative to the `manifests/` directory. */
declare function mdxManifestRef(componentId: string, docId: string): string;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/service-registry.d.ts
/** Returns one summary entry per registered service — the lowest-cost discovery endpoint. */
declare function listServices(): Promise<ServiceSummary[]>;
/** Returns the schema-backed descriptor for one registered service. */
declare function describeService(serviceId: ServiceId): Promise<ServiceDescriptor>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/stores/status.d.ts
declare const fullStatusStore: StatusStore & {
    selectStatuses: (statuses: Status[]) => void;
    typeId: undefined;
  }, getStatusStoreByTypeId: (typeId: StatusTypeId) => StatusStoreByTypeId$1, universalStatusStore: UniversalStore<StatusesByStoryIdAndTypeId, StatusStoreEvent>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/change-detection/errors.d.ts
declare class ChangeDetectionUnavailableError extends Error {
  constructor(message: string, options?: ErrorOptions);
}
declare class ChangeDetectionFailureError extends Error {
  constructor(message: string, options?: ErrorOptions);
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/change-detection/readiness.d.ts
type ChangeDetectionReadiness = {
  status: 'ready';
} | {
  status: 'unavailable';
  reason: string;
  error?: Error;
} | {
  status: 'error';
  error: Error;
};
declare function getChangeDetectionReadiness(): Promise<ChangeDetectionReadiness>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/services/module-graph/definition.d.ts
declare const moduleGraphServiceDef: ServiceDefinition<ModuleGraphServiceState, {
  readonly storiesForFiles: QueryDefinition<ModuleGraphServiceState, ObjectSchema<{
    readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
  }, undefined>, ArraySchema<ArraySchema<ObjectSchema<{
    readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
    readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
  }, undefined>, undefined>, undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"storiesForFiles\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly status: QueryDefinition<ModuleGraphServiceState, UndefinedSchema<undefined>, VariantSchema<"value", [ObjectSchema<{
    readonly value: LiteralSchema<"booting", undefined>;
  }, undefined>, ObjectSchema<{
    readonly value: LiteralSchema<"ready", undefined>;
  }, undefined>, ObjectSchema<{
    readonly value: LiteralSchema<"error", undefined>;
    readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
  }, undefined>, ObjectSchema<{
    readonly value: LiteralSchema<"unavailable", undefined>;
    readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
    readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
  }, undefined>], undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"status\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly graphRevision: QueryDefinition<ModuleGraphServiceState, OptionalSchema<ObjectSchema<{
    readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
  }, undefined>, undefined>, NumberSchema<undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"graphRevision\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly latestStoryChanges: QueryDefinition<ModuleGraphServiceState, UndefinedSchema<undefined>, ObjectSchema<{
    readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
    readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
  }, undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"latestStoryChanges\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly getStatus: QueryDefinition<ModuleGraphServiceState, UndefinedSchema<undefined>, VariantSchema<"value", [ObjectSchema<{
    readonly value: LiteralSchema<"booting", undefined>;
  }, undefined>, ObjectSchema<{
    readonly value: LiteralSchema<"ready", undefined>;
  }, undefined>, ObjectSchema<{
    readonly value: LiteralSchema<"error", undefined>;
    readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
  }, undefined>, ObjectSchema<{
    readonly value: LiteralSchema<"unavailable", undefined>;
    readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
    readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
  }, undefined>], undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"getStatus\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly getGraphRevision: QueryDefinition<ModuleGraphServiceState, OptionalSchema<ObjectSchema<{
    readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
  }, undefined>, undefined>, NumberSchema<undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"getGraphRevision\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly storiesForFiles: {
    output: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
  };
  readonly status: {
    output: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
  };
  readonly graphRevision: {
    output: NumberSchema<undefined>;
  };
  readonly latestStoryChanges: {
    output: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
  };
  readonly getStatus: {
    output: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
  };
  readonly getGraphRevision: {
    output: NumberSchema<undefined>;
  };
}, {
  readonly _applyGraphSnapshot: CommandDefinition<ModuleGraphServiceState, ObjectSchema<{
    readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
      [x: string]: {
        [x: string]: number;
      };
    }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
  }, undefined>, VoidSchema<undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"_applyGraphSnapshot\" is prefixed with \"_\" and must set internal: true";
  } | {
    internal: true;
  });
  readonly _applyGraphUpdate: CommandDefinition<ModuleGraphServiceState, ObjectSchema<{
    readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
      [x: string]: {
        [x: string]: number;
      };
    }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
  }, undefined>, VoidSchema<undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"_applyGraphUpdate\" is prefixed with \"_\" and must set internal: true";
  } | {
    internal: true;
  });
  readonly _setStatus: CommandDefinition<ModuleGraphServiceState, VariantSchema<"value", [ObjectSchema<{
    readonly value: LiteralSchema<"booting", undefined>;
  }, undefined>, ObjectSchema<{
    readonly value: LiteralSchema<"ready", undefined>;
  }, undefined>, ObjectSchema<{
    readonly value: LiteralSchema<"error", undefined>;
    readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
  }, undefined>, ObjectSchema<{
    readonly value: LiteralSchema<"unavailable", undefined>;
    readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
    readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
  }, undefined>], undefined>, VoidSchema<undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"_setStatus\" is prefixed with \"_\" and must set internal: true";
  } | {
    internal: true;
  });
  readonly _waitForSettledEngine: CommandDefinition<ModuleGraphServiceState, UndefinedSchema<undefined>, VoidSchema<undefined>, {
    readonly _applyGraphSnapshot: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
    }, undefined>;
    readonly _applyGraphUpdate: ObjectSchema<{
      readonly storiesByFile: SchemaWithPipe<readonly [RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, RecordSchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>, undefined>, undefined>, DescriptionAction<{
        [x: string]: {
          [x: string]: number;
        };
      }, "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths.">]>;
      readonly bumpedStoryFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented.">]>;
    }, undefined>;
    readonly _setStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly _waitForSettledEngine: UndefinedSchema<undefined>;
  }, {
    readonly _applyGraphSnapshot: VoidSchema<undefined>;
    readonly _applyGraphUpdate: VoidSchema<undefined>;
    readonly _setStatus: VoidSchema<undefined>;
    readonly _waitForSettledEngine: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storiesForFiles: ObjectSchema<{
      readonly files: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`.">]>, undefined>, DescriptionAction<string[], "Source files to look up. Output arrays match this input order.">]>;
    }, undefined>;
    readonly status: UndefinedSchema<undefined>;
    readonly graphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
    readonly latestStoryChanges: UndefinedSchema<undefined>;
    readonly getStatus: UndefinedSchema<undefined>;
    readonly getGraphRevision: OptionalSchema<ObjectSchema<{
      readonly storyFiles: ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0).">]>, undefined>;
    }, undefined>, undefined>;
  }, {
    readonly storiesForFiles: ArraySchema<ArraySchema<ObjectSchema<{
      readonly storyFile: SchemaWithPipe<readonly [SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, DescriptionAction<string, "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index.">]>;
      readonly depth: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Breadth-first-search depth: the shortest number of import edges between the source file and this story file.">]>;
    }, undefined>, undefined>, undefined>;
    readonly status: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly graphRevision: NumberSchema<undefined>;
    readonly latestStoryChanges: ObjectSchema<{
      readonly revision: SchemaWithPipe<readonly [NumberSchema<undefined>, DescriptionAction<number, "Graph revision number for this latest story change set.">]>;
      readonly storyFiles: SchemaWithPipe<readonly [ArraySchema<SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "A story-index-style relative path such as `./src/Button.stories.tsx`.">]>, undefined>, DescriptionAction<string[], "Story-index-relative story files touched by the latest module graph change set.">]>;
    }, undefined>;
    readonly getStatus: VariantSchema<"value", [ObjectSchema<{
      readonly value: LiteralSchema<"booting", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"ready", undefined>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"error", undefined>;
      readonly error: SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Serializable error describing why the module graph failed unexpectedly.">]>;
    }, undefined>, ObjectSchema<{
      readonly value: LiteralSchema<"unavailable", undefined>;
      readonly reason: SchemaWithPipe<readonly [StringSchema<undefined>, DescriptionAction<string, "Human-readable reason why the current builder/runtime cannot provide module graph functionality.">]>;
      readonly error: OptionalSchema<SchemaWithPipe<readonly [GenericSchema, DescriptionAction<unknown, "Optional serializable error reported by the builder adapter.">]>, undefined>;
    }, undefined>], undefined>;
    readonly getGraphRevision: NumberSchema<undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"_waitForSettledEngine\" is prefixed with \"_\" and must set internal: true";
  } | {
    internal: true;
  });
} & {
  readonly _applyGraphSnapshot: {
    output: VoidSchema<undefined>;
  };
  readonly _applyGraphUpdate: {
    output: VoidSchema<undefined>;
  };
  readonly _setStatus: {
    output: VoidSchema<undefined>;
  };
  readonly _waitForSettledEngine: {
    output: VoidSchema<undefined>;
  };
}, "core/module-graph">;
type ModuleGraphService = ServiceInstanceOf<typeof moduleGraphServiceDef>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/change-detection/GitDiffProvider.d.ts
interface GitDiffResult {
  changed: Set<string>;
  new: Set<string>;
}
type GitStateChangeCallback = () => void;
type GitFileSystem = {
  watch: typeof watch;
  readFile: typeof readFile;
  stat: typeof stat;
};
declare class GitDiffProvider {
  private readonly cwd;
  private readonly fileSystem;
  private repoRoot;
  private gitStateCallback;
  private branchWatcher;
  private headWatcher;
  private packedRefsWatcher;
  private watchingInitialized;
  private watchingStopped;
  constructor(cwd?: string, fileSystem?: GitFileSystem);
  getRepoRoot(): Promise<string>;
  getChangedFiles(): Promise<GitDiffResult>;
  getHeadCommit(): Promise<string>;
  isWorkingTreeClean(): Promise<boolean>;
  onGitStateChange(callback: GitStateChangeCallback): void;
  private initializeWatching;
  private attachWatcher;
  private configureBranchWatcher;
  private reconfigureBranchWatcher;
  dispose(): void;
  private stopWatching;
  private getGitDir;
  private readHeadRef;
  private runGitCommand;
  private isEnoentError;
  private toGitError;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/change-detection/IndexBaselineService.d.ts
type BaselineCache = {
  get: <T = unknown>(key: string) => Promise<T | undefined>;
  set: <T = unknown>(key: string, value: T) => Promise<void>;
};
declare class IndexBaselineService {
  private readonly options;
  private baselineEntryIds;
  private initializePromise;
  private syncInFlight;
  private cache;
  constructor(options: {
    storyIndexGeneratorPromise: Promise<StoryIndexGenerator>;
    gitDiffProvider: GitDiffProvider;
    onBaselineUpdated: () => void;
    cache?: BaselineCache;
  });
  start(): Promise<void>;
  getBaselineEntryIds(): Promise<Set<string>>;
  handleGitStateChange(): Promise<void>;
  private initialize;
  private refreshBaseline;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/change-detection/change-detection-service.d.ts
/**
 * Publishes change-detection story statuses to the status store. It resolves git-changed files,
 * maps them to affected stories through the `core/module-graph` open service, and emits
 * `modified`/`affected`/`new` statuses (plus index-baseline `new` entries).
 */
declare class ChangeDetectionService {
  private readonly options;
  private disposed;
  private debounceTimer;
  private scanInFlight;
  private rerunAfterCurrentScan;
  private readinessResolved;
  private statusPipelineStarted;
  private changeDetectionEnabled;
  private previousStatuses;
  private gitDiffProvider;
  private indexBaselineService;
  private unsubscribeModuleGraphStatus;
  private unsubscribeModuleGraphRevision;
  private readonly workingDir;
  private readonly debounceMs;
  constructor(options: {
    storyIndexGeneratorPromise: Promise<StoryIndexGenerator>;
    statusStore: StatusStoreByTypeId;
    gitDiffProvider?: GitDiffProvider;
    indexBaselineService?: IndexBaselineService;
    workingDir?: string;
    debounceMs?: number;
  });
  private getModuleGraph;
  /** True while the service is live and change-detection status publishing is enabled. */
  private isActive;
  private onGraphReady;
  private onGraphChange;
  private onGraphError;
  private onGraphUnavailable;
  private onModuleGraphStatus;
  start(enabled: boolean | undefined): void;
  /**
   * Wires the git-diff-driven status pipeline. Runs once the dependency graph is ready (so the
   * initial scan and every git-state-change scan read a populated reverse index).
   */
  private startStatusPipeline;
  dispose(): Promise<void>;
  private scheduleScan;
  private scan;
  private buildStatuses;
  private getGitDiffProvider;
  private getIndexBaselineService;
  private applyStatusStorePatch;
  private resolveReadiness;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/stores/test-provider.d.ts
declare const fullTestProviderStore: {
    settingsChanged: () => void;
    onRunAll: (listener: () => void) => () => void;
    onClearAll: (listener: () => void) => () => void;
  } & {
    getFullState: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent>['getState'];
    setFullState: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent>['setState'];
    onSettingsChanged: (listener: (testProviderId: TestProviderId) => void) => () => void;
    runAll: () => void;
    clearAll: () => void;
  }, getTestProviderStoreById: (testProviderId: TestProviderId) => TestProviderStoreById, universalTestProviderStore: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/ghost-stories/get-candidates.d.ts
declare function getComponentCandidates({
  sampleSize,
  globPattern,
  cwd
}?: {
  sampleSize?: number;
  globPattern?: string; /** Working directory for glob. Defaults to process.cwd(). */
  cwd?: string;
}): Promise<{
  candidates: string[];
  error?: string;
  globMatchCount: number;
  analyzedCount?: number;
  avgComplexity?: number;
}>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/utils/test-result-types.d.ts
interface StoryTestResult {
  storyId: string;
  status: 'PASS' | 'FAIL' | 'PENDING';
  error?: string;
  stack?: string;
  /** Whether the story rendered to an empty/invisible DOM element */
  emptyRender?: boolean;
}
/**
 * A `StoryTestResult` augmented with the timestamp at which it was recorded.
 * Used by the agent self-healing flow to persist the most recent outcome
 * per story across runs (in cache only — never sent in telemetry).
 */
interface StoryTestResultHistoryEntry extends StoryTestResult {
  timestamp: number;
}
type StoryTestResultHistory = Record<string, StoryTestResultHistoryEntry>;
interface CategorizedError {
  category: string;
  count: number;
  uniqueCount: number;
  matchedDependencies: string[];
}
/**
 * Outcome of the `CssCheck` story — a story (id suffix `--css-check`)
 * whose `play` asserts a component-specific computed style via
 * `getComputedStyle`. Distinguishes "component mounted" from "the
 * user's CSS actually loaded".
 *
 * - `'pass'`    — a `CssCheck` story ran and passed.
 * - `'fail'`    — a `CssCheck` story ran and failed.
 * - `'not-run'` — no pass/fail signal available: either no `CssCheck`
 *                 story is in the suite, or the story existed but was
 *                 not executed (skipped, pending, todo, filtered out).
 *
 * Only the three-valued enum is emitted — no storyId or component
 * name — so no user-authored data enters telemetry.
 */
type CssCheckOutcome = 'pass' | 'fail' | 'not-run';
interface TestRunAnalysis {
  /** Stats for the current run (only stories executed in this run). */
  total: number;
  passed: number;
  passedButEmptyRender: number;
  successRate: number;
  successRateWithoutEmptyRender: number;
  uniqueErrorCount: number;
  categorizedErrors: Record<string, CategorizedError>;
  cssCheck: CssCheckOutcome;
  /**
   * Stats accumulated across runs: for every story we've ever seen, we
   * keep the most recent outcome (by timestamp). Only emitted by the
   * agent self-healing flow, which is the only consumer that persists
   * a per-story history in the Storybook cache.
   */
  cumulativeTotal?: number;
  cumulativePassed?: number;
  cumulativePassedButEmptyRender?: number;
  cumulativeSuccessRate?: number;
  cumulativeSuccessRateWithoutEmptyRender?: number;
  cumulativeUniqueErrorCount?: number;
  cumulativeCategorizedErrors?: Record<string, CategorizedError>;
  cumulativeCssCheck?: CssCheckOutcome;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/ghost-stories/types.d.ts
interface TestRunSummary {
  duration?: number;
  summary?: TestRunAnalysis;
  runError?: string;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/ghost-stories/run-story-tests.d.ts
/**
 * Run ghost stories: execute vitest on component file paths to auto-generate
 * and test stories that don't exist on disk.
 *
 * @param componentFilePaths - Absolute paths to component files to test.
 * @param options.cwd - Working directory for vitest. Defaults to process.cwd().
 */
declare function runStoryTests(componentFilePaths: string[], options?: {
  cwd?: string;
  ghostRun?: boolean;
}): Promise<TestRunSummary>;
//#endregion
//#region code/core/.dts-emit/code/core/src/core-server/utils/server-address.d.ts
interface PortOptions {
  exactPort?: boolean;
}
declare const getServerPort: (port?: number, {
  exactPort
}?: PortOptions) => Promise<number>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/utils/analyze-test-results.d.ts
/**
 * Analyze a list of story test results and produce a TestRunAnalysis with pass/fail counts, success
 * rates, empty render detection, and categorized errors.
 *
 * @param results Story results from the current run.
 * @param cumulativeResults Optional aggregated results across runs (latest outcome per story).
 *   Only the agent self-healing flow tracks history and passes this; when omitted no
 *   `cumulative*` fields are emitted.
 */
declare function analyzeTestResults(results: StoryTestResult[], cumulativeResults?: StoryTestResult[]): TestRunAnalysis;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/utils/to-story-test-result.d.ts
interface VitestLikeReport {
  type: string;
  result?: {
    emptyRender?: boolean;
  } | unknown;
}
interface VitestLikeError {
  message?: string;
  stack?: string;
}
interface VitestLikeInput {
  storyId: string | undefined;
  /** Raw vitest status, e.g. 'passed' | 'failed' | 'skipped' | 'pending' | 'running' | ... */
  statusRaw: string | undefined;
  errors?: readonly VitestLikeError[];
  reports?: readonly VitestLikeReport[];
}
/**
 * Convert a Vitest-like input (either a JSON reporter assertion or a runtime TestCase) into a
 * StoryTestResult. Returns null when the input has no storyId — callers can use this to skip
 * non-story tests.
 */
declare function toStoryTestResult(input: VitestLikeInput): StoryTestResult | null;
//#endregion
export { BuildIndexOptions, BuildStaticStandaloneOptions, type ChangeDetectionAdapter, ChangeDetectionFailureError, ChangeDetectionService, ChangeDetectionUnavailableError, type Command, type CommandCtx, type CommandDefinition, type ComponentArgTypesData, type DocsManifestEntry, type DocsManifestRefEntry, type ChangeDetectionReadiness as Experimental_ChangeDetectionReadiness, type FileChangeEvent, type GenerateStoryOptions, type GenerateStoryResult, type ImportEdge, type ImportParser, type ImportParserContext, type JsonRef, MDX_SERVICE_ID, type MdxDocPayload, type MdxError, type MdxPayload, type MdxServiceContract, type ModuleGraphService, type ModuleResolveConfig, type OperationDescriptor, type ParseFileArgs, type Query, type QueryCtx, type QueryDefinition, type RuntimeService, type SchemaDescriptor, type ServerServiceRegistration, type ServiceDefinition, type ServiceDescriptor, type ServiceInstance, type ServiceRegistrationOptions, type ServiceSummary, StoryIndexGenerator, type StoryTestResult, type StoryTestResultHistory, type StoryTestResultHistoryEntry, Tag, analyzeMdx, analyzeTestResults, build, buildDevStandalone, buildIndex, buildIndexStandalone, buildStaticStandalone, describeService, MockUniversalStore as experimental_MockUniversalStore, UniversalStore as experimental_UniversalStore, defineService as experimental_defineService, getChangeDetectionReadiness as experimental_getChangeDetectionReadiness, getStatusStoreByTypeId as experimental_getStatusStore, getTestProviderStoreById as experimental_getTestProviderStore, loadStorybook as experimental_loadStorybook, registerService as experimental_registerService, generateStoryFile, getComponentCandidates, getErrorLevel, getPreviewBodyTemplate, getPreviewHeadTemplate, getServerPort, getService, getStoriesPathsFromConfig, fullStatusStore as internal_fullStatusStore, fullTestProviderStore as internal_fullTestProviderStore, universalStatusStore as internal_universalStatusStore, universalTestProviderStore as internal_universalTestProviderStore, listServices, mapStaticDir, mdxManifestRef, mdxQueryStaticPath, mdxStaticStorePath, type moduleGraphServiceDef, resolveOnboardingInitialPath, runStoryTests, sendTelemetryError, toStoryTestResult, withTelemetry };