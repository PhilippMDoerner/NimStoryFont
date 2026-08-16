import { IndexEntry, PackageJson, StorybookConfig, TypescriptOptions } from "storybook/internal/types";
import { BinaryLike } from "crypto";

//#region node_modules/package-manager-detector/dist/shared/package-manager-detector.DLOLmuSz.d.mts
type Agent = 'npm' | 'yarn' | 'yarn@berry' | 'pnpm' | 'pnpm@6' | 'bun' | 'deno';
type AgentName = 'npm' | 'yarn' | 'pnpm' | 'bun' | 'deno';
interface DetectResult {
  /**
   * Agent name without the specifier.
   *
   * Can be `npm`, `yarn`, `pnpm`, `bun`, or `deno`.
   */
  name: AgentName;
  /**
   * Agent specifier to resolve the command.
   *
   * May contain '@' to differentiate the version (e.g. 'yarn@berry').
   * Use `name` for the agent name without the specifier.
   */
  agent: Agent;
  /**
   * Specific version of the agent, read from `packageManager` field in package.json.
   */
  version?: string;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/utils/get-monorepo-type.d.ts
declare const monorepoConfigs: {
  readonly Nx: 'nx.json';
  readonly Turborepo: 'turbo.json';
  readonly Lerna: 'lerna.json';
  readonly Rush: 'rush.json';
  readonly Lage: 'lage.config.json';
};
type MonorepoType = keyof typeof monorepoConfigs | 'Workspaces' | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/detect-agent.d.ts
type AgentInfo = {
  /**
   * The name of the detected AI coding agent (e.g. `claude`, `gemini`, `codex`, `cursor`). Can be
   * any value supported by std-env or explicitly set via the `AI_AGENT` environment variable.
   */
  name: string;
};
type AgentDetection = AgentInfo | undefined;
/** Detect whether Storybook CLI is likely being invoked by an AI agent, using std-env. */
declare const detectAgent: () => AgentDetection;
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/get-known-packages.d.ts
type PackageGroupResult = Record<string, string | null | undefined>;
type KnownPackagesList = {
  testPackages?: PackageGroupResult;
  stylingPackages?: PackageGroupResult;
  stateManagementPackages?: PackageGroupResult;
  dataFetchingPackages?: PackageGroupResult;
  uiLibraryPackages?: PackageGroupResult;
  i18nPackages?: PackageGroupResult;
  routerPackages?: PackageGroupResult;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/types.d.ts
type EventType = 'boot' | 'add' | 'dev' | 'build' | 'index' | 'upgrade' | 'multi-upgrade' | 'init' | 'init-step' | 'scaffolded-empty' | 'browser' | 'canceled' | 'exit' | 'error' | 'error-metadata' | 'version-update' | 'core-config' | 'remove' | 'save-story' | 'create-new-story-file' | 'create-new-story-file-search' | 'open-in-editor' | 'testing-module-watch-mode' | 'testing-module-completed-report' | 'testing-module-crash-report' | 'addon-test' | 'test-run' | 'addon-onboarding' | 'onboarding-survey' | 'onboarding-checklist-muted' | 'onboarding-checklist-status' | 'mocking' | 'automigrate' | 'migrate' | 'preview-first-load' | 'doctor' | 'review' | 'share' | 'ghost-stories' | 'sidebar-filter' | 'ai-command' | 'ai-init-opt-in' | 'ai-prompt-nudge' | 'ai-setup' | 'ai-setup-final-scoring' | 'ai-setup-self-healing-scoring';
interface Dependency {
  version: string | undefined;
  versionSpecifier?: string;
}
interface StorybookAddon extends Dependency {
  options: any;
}
type StorybookMetadata = {
  storybookVersion?: string;
  storybookVersionSpecifier: string;
  generatedAt?: number;
  userSince?: number; /** If we can identify the agent, report it; otherwise `unknown` when detected heuristically. */
  agent?: AgentInfo;
  language: 'typescript' | 'javascript';
  framework?: {
    name?: string;
    options?: any;
  };
  builder?: string;
  renderer?: string;
  monorepo?: MonorepoType;
  packageManager?: {
    type: DetectResult['name'];
    version: DetectResult['version'];
    agent: DetectResult['agent'];
    nodeLinker: 'node_modules' | 'pnp' | 'pnpm' | 'isolated' | 'hoisted';
  };
  typescriptOptions?: Partial<TypescriptOptions>;
  addons?: Record<string, StorybookAddon>;
  storybookPackages?: Record<string, Dependency>;
  metaFramework?: {
    name: string;
    packageName: string;
    version: string;
  };
  packageJsonType?: 'unknown' | 'module' | 'commonjs';
  knownPackages?: KnownPackagesList;
  hasRouterPackage?: boolean;
  hasStorybookEslint?: boolean;
  hasStaticDirs?: boolean;
  hasCustomWebpack?: boolean;
  hasCustomBabel?: boolean;
  features?: StorybookConfig['features'];
  refCount?: number;
  preview?: {
    usesGlobals?: boolean;
  };
  portableStoriesFileCount?: number;
  applicationFileCount?: number;
};
interface Payload {
  [key: string]: any;
}
type PayloadFactory = () => Payload | Promise<Payload>;
type PayloadInput = Payload | PayloadFactory;
interface Context {
  [key: string]: any;
}
interface Options {
  retryDelay: number;
  immediate: boolean;
  configDir?: string;
  enableCrashReports?: boolean;
  stripMetadata?: boolean;
  notify?: boolean;
  /** Override the event timestamp. Used when flushing queued events to preserve original timing. */
  timestamp?: number;
  /** When true, bypass the disabled state. Used for error telemetry with enableCrashReports. */
  force?: boolean;
}
interface TelemetryData {
  eventType: EventType;
  payload: Payload;
  metadata?: StorybookMetadata;
}
interface TelemetryEvent extends TelemetryData {
  eventId: string;
  sessionId: string;
  context: Context;
}
interface InitPayload {
  projectType: string;
  features: {
    dev: boolean;
    docs: boolean;
    test: boolean;
    onboarding: boolean;
    ai: boolean;
  };
  newUser: boolean;
  versionSpecifier: string | undefined;
  cliIntegration: string | undefined;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/one-way-hash.d.ts
declare const oneWayHash: (payload: BinaryLike) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/storybook-metadata.d.ts
declare const metaFrameworks: Record<string, string>;
declare const sanitizeAddonName: (name: string) => string;
declare const computeStorybookMetadata: ({
  packageJsonPath,
  packageJson,
  mainConfig,
  configDir
}: {
  packageJsonPath: string;
  packageJson: PackageJson;
  mainConfig?: StorybookConfig & Record<string, any>;
  configDir: string;
}) => Promise<StorybookMetadata>;
declare const getStorybookMetadata: (_configDir?: string) => Promise<StorybookMetadata>;
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/sanitize.d.ts
interface IErrorWithStdErrAndStdOut {
  stderr?: Buffer | string;
  stdout?: Buffer | string;
  [key: string]: unknown;
}
declare function removeAnsiEscapeCodes(input?: string): string;
/**
 * Removes all user-specific file system paths from the input string, replacing them with "$SNIP".
 * This helps sanitize sensitive user information from output (such as error messages or logs). e.g.
 * `/Users/username/storybook-app/src/pages/index.js` -> `$SNIP/src/pages/index.js`
 */
declare function cleanPaths(str: string, separator?: string): string;
declare function sanitizeError(error: Error, pathSeparator?: string): any;
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/error-collector.d.ts
/**
 * Service for collecting errors during Storybook initialization.
 *
 * This singleton class exists to accumulate non-fatal errors that occur during the Storybook's
 * processes. Instead of immediately reporting errors to telemetry (which could interrupt the
 * process), errors are collected here and then batch-reported at the end of initialization via the
 * telemetry system.
 *
 * This allows Storybook to continue e.g. initialization even when non-critical errors occur,
 * ensuring a better user experience while still capturing all errors for telemetry and debugging
 * purposes.
 */
declare class ErrorCollector {
  private static instance;
  private errors;
  private constructor();
  static getInstance(): ErrorCollector;
  static addError(error: unknown): void;
  static getErrors(): unknown[];
}
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/ai-setup-utils.d.ts
/**
 * Determines whether a story index entry was authored by the `sb ai setup` flow.
 * Currently checks title prefix. When we migrate to a tag-based approach,
 * swap this to check for the tag instead — this is the single swap point.
 */
declare function isStoryCreatedByAISetup(entry: IndexEntry): boolean;
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/event-cache.d.ts
interface UpgradeSummary {
  timestamp: number;
  eventType?: EventType;
  eventId?: string;
  sessionId?: string;
}
interface CacheEntry {
  timestamp: number;
  body: TelemetryEvent;
}
declare const getLastEvents: () => Promise<Record<EventType, CacheEntry>>;
declare const getPrecedingUpgrade: (events?: Partial<Record<EventType, CacheEntry>> | undefined) => Promise<UpgradeSummary | undefined>;
/**
 * Returns true when the current session falls within the 2-hour window opened by the most recent
 * occurrence of one of the given event types
 *
 * Used to gate telemetry that should only be captured during a single session window of a given event (e.g. init)
 */
declare function isWithinInitialSession(events: EventType | EventType[]): Promise<boolean>;
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/session-id.d.ts
declare const SESSION_TIMEOUT: number;
declare const getSessionId: () => Promise<string>;
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/telemetry.d.ts
declare const addToGlobalContext: (key: string, value: any) => void;
//#endregion
//#region code/core/.dts-emit/code/core/src/telemetry/index.d.ts
/** Is this story part of the CLI generated examples, including user-created stories in those files */
declare const isExampleStoryId: (storyId: string) => boolean;
type QueuedEvent = {
  eventType: EventType;
  payload: PayloadInput;
  options: Partial<Options>;
  timestamp: number;
};
/**
 * Resolve telemetry state. When enabled, flushes the queue. When disabled, clears it.
 * This should be called once presets have been evaluated and the disableTelemetry config is known.
 */
declare function setTelemetryEnabled(enabled: boolean): Promise<void>;
/** Check whether telemetry is currently enabled. */
declare function isTelemetryModuleEnabled(): boolean;
/** Check whether the telemetry state has been resolved (is no longer uninitialized). */
declare function isTelemetryStateResolved(): boolean;
/**
 * Callback invoked when a payload factory throws or returns { error }.
 * Registered by withTelemetry() to delegate to sendTelemetryError with full context
 * (presets, cache, error levels, sub-errors).
 */
type PayloadErrorHandler = (error: Error, eventType: EventType) => Promise<void>;
/**
 * Register a handler for payload factory errors. When a telemetry payload factory
 * throws or returns { error }, this handler is called instead of sending the normal event.
 * Pass undefined to clear the handler.
 *
 * This is used by withTelemetry() to wire up sendTelemetryError with full context
 * (cliOptions, presetOptions, error levels, sub-errors) so all commands benefit
 * from automatic error telemetry.
 */
declare function onPayloadError(handler: PayloadErrorHandler | undefined): void;
declare const telemetry: (eventType: EventType, payload?: PayloadInput, options?: Partial<Options>) => Promise<void>;
//#endregion
export { type AgentInfo, type CacheEntry, Context, Dependency, ErrorCollector, EventType, IErrorWithStdErrAndStdOut, InitPayload, Options, Payload, PayloadErrorHandler, PayloadFactory, PayloadInput, QueuedEvent, SESSION_TIMEOUT, StorybookAddon, StorybookMetadata, TelemetryData, TelemetryEvent, addToGlobalContext, cleanPaths, computeStorybookMetadata, detectAgent, getLastEvents, getPrecedingUpgrade, getSessionId, getStorybookMetadata, isExampleStoryId, isStoryCreatedByAISetup, isTelemetryModuleEnabled, isTelemetryStateResolved, isWithinInitialSession, metaFrameworks, onPayloadError, oneWayHash, removeAnsiEscapeCodes, sanitizeAddonName, sanitizeError, setTelemetryEnabled, telemetry };