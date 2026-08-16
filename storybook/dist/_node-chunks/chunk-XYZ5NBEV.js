import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
import {
  require_build
} from "./chunk-KIY3O3SC.js";
import {
  pLimit
} from "./chunk-IDSUOV3G.js";
import {
  isI18nPackage,
  isRouterPackage,
  isStateManagementPackage,
  isStylingPackage
} from "./chunk-UWEHU3AF.js";
import {
  STORYBOOK_FN_PLACEHOLDER,
  generateDummyArgsFromArgTypes,
  loadConfig,
  printConfig
} from "./chunk-LQX45LAM.js";
import {
  optionalEnvToBoolean,
  registerService
} from "./chunk-BVQV5AQI.js";
import {
  array,
  description,
  lazy,
  literal,
  number,
  object,
  optional,
  pipe,
  record,
  string,
  undefined_,
  variant,
  void_
} from "./chunk-Z35MCY7K.js";
import {
  UniversalStoreFollowerTimeoutError
} from "./chunk-LISHZJOF.js";
import {
  up
} from "./chunk-TWPZPMFT.js";
import {
  resolvePackageDir
} from "./chunk-OS6I5BZG.js";
import {
  jsTsSourceExtensions
} from "./chunk-GTBJHD7H.js";
import {
  StorybookError
} from "./chunk-BKV2AHET.js";
import {
  require_dist
} from "./chunk-TWWDCALS.js";
import {
  require_picocolors
} from "./chunk-STC3JUUJ.js";
import {
  errorToErrorLike,
  reverseIndexToStoriesByFile,
  toStoryIndexPath
} from "./chunk-VRYTK5KC.js";
import {
  extname,
  join,
  normalize,
  relative
} from "./chunk-4XX73STB.js";
import {
  glob
} from "./chunk-5EYNHKVG.js";
import {
  __toESM
} from "./chunk-5SSDLDTJ.js";

// src/core-server/utils/server-statics.ts
import { existsSync, statSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { basename, isAbsolute, join as join2, posix, resolve, sep, win32 } from "node:path";
import {
  getDirectoryFromWorkingDir,
  getProjectRoot,
  resolvePathInStorybookCache
} from "storybook/internal/common";
import { CLI_COLORS, logger, once } from "storybook/internal/node-logger";
var import_picocolors = __toESM(require_picocolors(), 1), import_sirv = __toESM(require_build(), 1), import_ts_dedent = __toESM(require_dist(), 1);
var cacheDir = resolvePathInStorybookCache("", "ignored-sub").split("ignored-sub")[0], files = /* @__PURE__ */ new Map(), readFileOnce = async (path) => {
  if (files.has(path))
    return files.get(path);
  {
    let [data, stats] = await Promise.all([readFile(path, "utf-8"), stat(path)]), result = { data, mtime: stats.mtimeMs };
    return files.set(path, result), result;
  }
}, faviconWrapperPath = join2(
  resolvePackageDir("storybook"),
  "/assets/browser/favicon-wrapper.svg"
), prepareNestedSvg = (svg) => {
  let [, openingTag, contents, closingTag] = svg?.match(/(<svg[^>]*>)(.*?)(<\/svg>)/s) ?? [];
  if (!openingTag || !contents || !closingTag)
    return svg;
  let width, height, modifiedTag = openingTag.replace(/width=["']([^"']*)["']/g, (_, value) => (width = parseFloat(value), 'width="32px"')).replace(/height=["']([^"']*)["']/g, (_, value) => (height = parseFloat(value), 'height="32px"'));
  return !/viewBox=["'][^"']*["']/.test(modifiedTag) && width && height && (modifiedTag = modifiedTag.replace(/>$/, ` viewBox="0 0 ${width} ${height}">`)), modifiedTag = modifiedTag.replace(/preserveAspectRatio=["'][^"']*["']/g, "").replace(/>$/, ' preserveAspectRatio="xMidYMid meet">'), modifiedTag + contents + closingTag;
};
async function useStatics(app, options) {
  let staticDirs = await options.presets.apply("staticDirs") ?? [], faviconPath = await options.presets.apply("favicon"), faviconDir = resolve(faviconPath, ".."), faviconFile = basename(faviconPath);
  app.use(`/${faviconFile}`, async (req, res, next) => {
    let status = req.query.status;
    if (status && faviconFile.endsWith(".svg") && ["active", "critical", "negative", "positive", "warning"].includes(status)) {
      let [faviconInfo, faviconWrapperInfo] = await Promise.all([
        readFileOnce(join2(faviconDir, faviconFile)),
        readFileOnce(faviconWrapperPath)
      ]).catch((e) => (e instanceof Error && once.warn(`Failed to read favicon: ${e.message}`), [null, null]));
      if (faviconInfo && faviconWrapperInfo) {
        let svg = faviconWrapperInfo.data.replace('<g id="mask"', `<g mask="url(#${status}-mask)"`).replace('<use id="status"', `<use href="#${status}"`).replace('<use id="icon" />', prepareNestedSvg(faviconInfo.data));
        res.setHeader("Content-Type", "image/svg+xml"), res.setHeader("ETag", `"${faviconWrapperInfo.mtime}-${faviconInfo.mtime}"`), res.end(svg);
        return;
      }
    }
    return req.url = `/${faviconFile}`, sirvWorkaround(faviconDir)(req, res, next);
  }), staticDirs.map((dir) => {
    try {
      let { staticDir, staticPath, targetEndpoint } = mapStaticDir(dir, options.configDir);
      if (!targetEndpoint.startsWith("/sb-") && !staticDir.startsWith(cacheDir)) {
        let relativeStaticDir = relative(getProjectRoot(), staticDir);
        logger.debug(
          `Serving static files from ${CLI_COLORS.info(relativeStaticDir)} at ${CLI_COLORS.info(targetEndpoint)}`
        );
      }
      if (existsSync(staticPath) && statSync(staticPath).isFile()) {
        let staticPathDir = resolve(staticPath, ".."), staticPathFile = basename(staticPath);
        app.use(targetEndpoint, (req, res, next) => {
          req.url = `/${staticPathFile}`, sirvWorkaround(staticPathDir)(req, res, next);
        });
      } else
        app.use(targetEndpoint, sirvWorkaround(staticPath));
    } catch (e) {
      e instanceof Error && logger.warn(e.message);
    }
  });
}
var sirvWorkaround = (dir, opts = {}) => (req, res, next) => {
  let originalParsedUrl = req._parsedUrl, maybeNext = next ? () => {
    req._parsedUrl = originalParsedUrl, next();
  } : void 0;
  (0, import_sirv.default)(dir, { dev: !0, etag: !0, extensions: [], ...opts })(req, res, maybeNext);
}, parseStaticDir = (arg) => {
  let lastColonIndex = arg.lastIndexOf(":"), isWindowsRawDirOnly = win32.isAbsolute(arg) && lastColonIndex === 1, splitIndex = lastColonIndex !== -1 && !isWindowsRawDirOnly ? lastColonIndex : arg.length, [from, to] = [arg.slice(0, splitIndex), arg.slice(splitIndex + 1)], staticDir = isAbsolute(from) ? from : `./${from}`, staticPath = resolve(staticDir);
  if (!existsSync(staticPath))
    throw new Error(
      import_ts_dedent.dedent`
        Failed to load static files, no such directory: ${import_picocolors.default.cyan(staticPath)}
        Make sure this directory exists.
      `
    );
  let targetDir = (to || (statSync(staticPath).isFile() ? basename(staticPath) : "/")).split(sep).join(posix.sep).replace(/^\/?/, "./"), targetEndpoint = targetDir.substring(1);
  return { staticDir, staticPath, targetDir, targetEndpoint };
}, mapStaticDir = (staticDir, configDir) => {
  let specifier = typeof staticDir == "string" ? staticDir : `${staticDir.from}:${staticDir.to}`, normalizedDir = isAbsolute(specifier) ? specifier : getDirectoryFromWorkingDir({ configDir, workingDir: process.cwd(), directory: specifier });
  return parseStaticDir(normalizedDir);
};

// src/shared/universal-store/index.ts
var import_ts_dedent2 = __toESM(require_dist(), 1);

// src/shared/universal-store/instances.ts
var instances = /* @__PURE__ */ new Map();

// src/shared/universal-store/index.ts
var CHANNEL_EVENT_PREFIX = "UNIVERSAL_STORE:", ProgressState = {
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED"
}, UniversalStore = class _UniversalStore {
  constructor(options, environmentOverrides) {
    /** Enable debug logs for this store */
    this.debugging = !1;
    // TODO: narrow type of listeners based on event type
    this.listeners = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set()]]);
    /** Gets the current state */
    this.getState = () => (this.debug("getState", { state: this.state }), this.state);
    /**
     * Subscribes to store events
     *
     * @returns A function to unsubscribe
     */
    this.subscribe = (eventTypeOrListener, maybeListener) => {
      let subscribesToAllEvents = typeof eventTypeOrListener == "function", eventType = subscribesToAllEvents ? "*" : eventTypeOrListener, listener = subscribesToAllEvents ? eventTypeOrListener : maybeListener;
      if (this.debug("subscribe", { eventType, listener }), !listener)
        throw new TypeError(
          `Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`
        );
      return this.listeners.has(eventType) || this.listeners.set(eventType, /* @__PURE__ */ new Set()), this.listeners.get(eventType).add(listener), () => {
        this.debug("unsubscribe", { eventType, listener }), this.listeners.has(eventType) && (this.listeners.get(eventType).delete(listener), this.listeners.get(eventType)?.size === 0 && this.listeners.delete(eventType));
      };
    };
    /** Sends a custom event to the other stores */
    this.send = (event) => {
      if (this.debug("send", { event }), this.status !== _UniversalStore.Status.READY)
        throw new TypeError(
          import_ts_dedent2.dedent`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
            {
              event,
              id: this.id,
              actor: this.actor,
              environment: this.environment
            },
            null,
            2
          )}`
        );
      this.emitToListeners(event, { actor: this.actor }), this.emitToChannel(event, { actor: this.actor });
    };
    if (this.debugging = options.debug ?? !1, !_UniversalStore.isInternalConstructing)
      throw new TypeError(
        "UniversalStore is not constructable - use UniversalStore.create() instead"
      );
    if (_UniversalStore.isInternalConstructing = !1, this.id = options.id, this.actorId = Date.now().toString(36) + Math.random().toString(36).substring(2), this.actorType = options.leader ? _UniversalStore.ActorType.LEADER : _UniversalStore.ActorType.FOLLOWER, this.state = options.initialState, this.channelEventName = `${CHANNEL_EVENT_PREFIX}${this.id}`, this.debug("constructor", {
      options,
      environmentOverrides,
      channelEventName: this.channelEventName
    }), this.actor.type === _UniversalStore.ActorType.LEADER)
      this.syncing = {
        state: ProgressState.RESOLVED,
        promise: Promise.resolve()
      };
    else {
      let syncingResolve, syncingReject, syncingPromise = new Promise((resolve2, reject) => {
        syncingResolve = () => {
          this.syncing.state === ProgressState.PENDING && (this.syncing.state = ProgressState.RESOLVED, resolve2());
        }, syncingReject = (reason) => {
          this.syncing.state === ProgressState.PENDING && (this.syncing.state = ProgressState.REJECTED, reject(reason));
        };
      });
      this.syncing = {
        state: ProgressState.PENDING,
        promise: syncingPromise,
        resolve: syncingResolve,
        reject: syncingReject
      };
    }
    this.getState = this.getState.bind(this), this.setState = this.setState.bind(this), this.subscribe = this.subscribe.bind(this), this.onStateChange = this.onStateChange.bind(this), this.send = this.send.bind(this), this.emitToChannel = this.emitToChannel.bind(this), this.prepareThis = this.prepareThis.bind(this), this.emitToListeners = this.emitToListeners.bind(this), this.handleChannelEvents = this.handleChannelEvents.bind(this), this.debug = this.debug.bind(this), this.channel = environmentOverrides?.channel ?? _UniversalStore.preparation.channel, this.environment = environmentOverrides?.environment ?? _UniversalStore.preparation.environment, this.channel && this.environment ? (environmentOverrides || _UniversalStore.preparation.resolve({
      channel: this.channel,
      environment: this.environment
    }), this.prepareThis({ channel: this.channel, environment: this.environment })) : _UniversalStore.preparation.promise.then(this.prepareThis);
  }
  static {
    /**
     * Defines the possible actor types in the store system
     *
     * @readonly
     */
    this.ActorType = {
      LEADER: "LEADER",
      FOLLOWER: "FOLLOWER"
    };
  }
  static {
    /**
     * Defines the possible environments the store can run in
     *
     * @readonly
     */
    this.Environment = {
      SERVER: "SERVER",
      MANAGER: "MANAGER",
      PREVIEW: "PREVIEW",
      UNKNOWN: "UNKNOWN",
      MOCK: "MOCK"
    };
  }
  static {
    /**
     * Internal event types used for store synchronization
     *
     * @readonly
     */
    this.InternalEventType = {
      EXISTING_STATE_REQUEST: "__EXISTING_STATE_REQUEST",
      EXISTING_STATE_RESPONSE: "__EXISTING_STATE_RESPONSE",
      SET_STATE: "__SET_STATE",
      LEADER_CREATED: "__LEADER_CREATED",
      FOLLOWER_CREATED: "__FOLLOWER_CREATED"
    };
  }
  static {
    this.Status = {
      UNPREPARED: "UNPREPARED",
      SYNCING: "SYNCING",
      READY: "READY",
      ERROR: "ERROR"
    };
  }
  static {
    // This is used to check if constructor was called from the static factory create()
    this.isInternalConstructing = !1;
  }
  static {
    _UniversalStore.setupPreparationPromise();
  }
  static setupPreparationPromise() {
    let resolveRef, rejectRef, promise = new Promise(
      (resolve2, reject) => {
        resolveRef = (args) => {
          resolve2(args);
        }, rejectRef = (...args) => {
          reject(args);
        };
      }
    );
    _UniversalStore.preparation = {
      resolve: resolveRef,
      reject: rejectRef,
      promise
    };
  }
  /** The actor object representing the store instance with a unique ID and a type */
  get actor() {
    return Object.freeze({
      id: this.actorId,
      type: this.actorType,
      environment: this.environment ?? _UniversalStore.Environment.UNKNOWN
    });
  }
  /**
   * The current state of the store, that signals both if the store is prepared by Storybook and
   * also - in the case of a follower - if the state has been synced with the leader's state.
   */
  get status() {
    if (!this.channel || !this.environment)
      return _UniversalStore.Status.UNPREPARED;
    switch (this.syncing?.state) {
      case ProgressState.PENDING:
      case void 0:
        return _UniversalStore.Status.SYNCING;
      case ProgressState.REJECTED:
        return _UniversalStore.Status.ERROR;
      case ProgressState.RESOLVED:
      default:
        return _UniversalStore.Status.READY;
    }
  }
  /**
   * A promise that resolves when the store is fully ready. A leader will be ready when the store
   * has been prepared by Storybook, which is almost instantly.
   *
   * A follower will be ready when the state has been synced with the leader's state, within a few
   * hundred milliseconds.
   */
  untilReady() {
    let preparation = this.channel && this.environment ? Promise.resolve() : _UniversalStore.preparation.promise;
    return Promise.all([preparation, this.syncing?.promise]);
  }
  /** Creates a new instance of UniversalStore */
  static create(options) {
    if (!options || typeof options?.id != "string")
      throw new TypeError("id is required and must be a string, when creating a UniversalStore");
    options.debug && console.debug(
      import_ts_dedent2.dedent`[UniversalStore]
        create`,
      { options }
    );
    let existing = instances.get(options.id);
    if (existing)
      return console.warn(import_ts_dedent2.dedent`UniversalStore with id "${options.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`), existing;
    _UniversalStore.isInternalConstructing = !0;
    let store = new _UniversalStore(options);
    return instances.set(options.id, store), store;
  }
  /**
   * Used by Storybook to set the channel for all instances of UniversalStore in the given
   * environment.
   *
   * @internal
   */
  static __prepare(channel, environment) {
    _UniversalStore.preparation.channel = channel, _UniversalStore.preparation.environment = environment, _UniversalStore.preparation.resolve({ channel, environment });
  }
  /**
   * Updates the store's state
   *
   * Either a new state or a state updater function can be passed to the method.
   */
  setState(updater) {
    let previousState = this.state, newState = typeof updater == "function" ? updater(previousState) : updater;
    if (this.debug("setState", { newState, previousState, updater }), this.status !== _UniversalStore.Status.READY)
      throw new TypeError(
        import_ts_dedent2.dedent`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
          {
            newState,
            id: this.id,
            actor: this.actor,
            environment: this.environment
          },
          null,
          2
        )}`
      );
    this.state = newState;
    let event = {
      type: _UniversalStore.InternalEventType.SET_STATE,
      payload: {
        state: newState,
        previousState
      }
    };
    this.emitToChannel(event, { actor: this.actor }), this.emitToListeners(event, { actor: this.actor });
  }
  /**
   * Subscribes to state changes
   *
   * @returns Unsubscribe function
   */
  onStateChange(listener) {
    return this.debug("onStateChange", { listener }), this.subscribe(
      _UniversalStore.InternalEventType.SET_STATE,
      ({ payload }, eventInfo) => {
        listener(payload.state, payload.previousState, eventInfo);
      }
    );
  }
  emitToChannel(event, eventInfo) {
    this.debug("emitToChannel", { event, eventInfo, channel: !!this.channel }), this.channel?.emit(this.channelEventName, {
      event,
      eventInfo
    });
  }
  prepareThis({
    channel,
    environment
  }) {
    this.channel = channel, this.environment = environment, this.debug("prepared", { channel: !!channel, environment }), this.channel.on(this.channelEventName, this.handleChannelEvents), this.actor.type === _UniversalStore.ActorType.LEADER ? this.emitToChannel(
      { type: _UniversalStore.InternalEventType.LEADER_CREATED },
      { actor: this.actor }
    ) : (this.emitToChannel(
      { type: _UniversalStore.InternalEventType.FOLLOWER_CREATED },
      { actor: this.actor }
    ), this.emitToChannel(
      { type: _UniversalStore.InternalEventType.EXISTING_STATE_REQUEST },
      { actor: this.actor }
    ), setTimeout(() => {
      this.syncing.reject(new UniversalStoreFollowerTimeoutError(this.id));
    }, 1e3));
  }
  emitToListeners(event, eventInfo) {
    let eventTypeListeners = this.listeners.get(event.type), everythingListeners = this.listeners.get("*");
    this.debug("emitToListeners", {
      event,
      eventInfo,
      eventTypeListeners,
      everythingListeners
    }), [...eventTypeListeners ?? [], ...everythingListeners ?? []].forEach(
      (listener) => listener(event, eventInfo)
    );
  }
  handleChannelEvents(channelEvent) {
    let { event, eventInfo } = channelEvent;
    if ([eventInfo.actor.id, eventInfo.forwardingActor?.id].includes(this.actor.id)) {
      this.debug("handleChannelEvents: Ignoring event from self", { channelEvent });
      return;
    } else if (this.syncing?.state === ProgressState.PENDING && event.type !== _UniversalStore.InternalEventType.EXISTING_STATE_RESPONSE) {
      this.debug("handleChannelEvents: Ignoring event while syncing", { channelEvent });
      return;
    }
    if (this.debug("handleChannelEvents", { channelEvent }), this.actor.type === _UniversalStore.ActorType.LEADER) {
      let shouldForwardEvent = !0;
      switch (event.type) {
        case _UniversalStore.InternalEventType.EXISTING_STATE_REQUEST:
          shouldForwardEvent = !1;
          let responseEvent = {
            type: _UniversalStore.InternalEventType.EXISTING_STATE_RESPONSE,
            payload: this.state
          };
          this.debug("handleChannelEvents: responding to existing state request", {
            responseEvent
          }), this.emitToChannel(responseEvent, { actor: this.actor }), this.emitToListeners(responseEvent, { actor: this.actor });
          break;
        case _UniversalStore.InternalEventType.LEADER_CREATED:
          shouldForwardEvent = !1, this.syncing.state = ProgressState.REJECTED, this.debug("handleChannelEvents: erroring due to second leader being created", {
            event
          }), console.error(
            import_ts_dedent2.dedent`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(eventInfo.actor, null, 2)}`
          );
          break;
      }
      shouldForwardEvent && (this.debug("handleChannelEvents: forwarding event", { channelEvent }), this.emitToChannel(event, { actor: eventInfo.actor, forwardingActor: this.actor }));
    }
    if (this.actor.type === _UniversalStore.ActorType.FOLLOWER)
      switch (event.type) {
        case _UniversalStore.InternalEventType.EXISTING_STATE_RESPONSE:
          if (this.debug("handleChannelEvents: Setting state from leader's existing state response", {
            event
          }), this.syncing?.state !== ProgressState.PENDING)
            break;
          this.syncing.resolve?.();
          let setStateEvent = {
            type: _UniversalStore.InternalEventType.SET_STATE,
            payload: {
              state: event.payload,
              previousState: this.state
            }
          };
          this.state = event.payload, this.emitToListeners(setStateEvent, eventInfo);
          break;
      }
    event.type === _UniversalStore.InternalEventType.SET_STATE && (this.debug("handleChannelEvents: Setting state", { event }), this.state = event.payload.state), this.emitToListeners(event, { actor: eventInfo.actor });
  }
  debug(message, data) {
    this.debugging && console.debug(
      import_ts_dedent2.dedent`[UniversalStore::${this.id}::${this.environment ?? _UniversalStore.Environment.UNKNOWN}]
        ${message}`,
      JSON.stringify(
        {
          data,
          actor: this.actor,
          state: this.state,
          status: this.status
        },
        null,
        2
      )
    );
  }
  /**
   * Used to reset the static fields of the UniversalStore class when cleaning up tests
   *
   * @internal
   */
  static __reset() {
    _UniversalStore.preparation.reject(new Error("reset")), _UniversalStore.setupPreparationPromise(), _UniversalStore.isInternalConstructing = !1;
  }
};

// src/shared/open-service/service-definition.ts
var defineService = (def) => def;

// src/shared/open-service/services/module-graph/server.ts
import { STORY_INDEX_INVALIDATED } from "storybook/internal/core-events";

// src/shared/open-service/services/module-graph/definition.ts
var errorLikeSchema = object({
  message: pipe(string(), description("Human-readable error message.")),
  name: optional(pipe(string(), description("Error class/name, when available."))),
  stack: optional(pipe(string(), description("Stack trace, when available."))),
  cause: optional(lazy(() => errorLikeSchema))
}), moduleGraphStatusSchema = variant("value", [
  object({
    value: literal("booting")
  }),
  object({
    value: literal("ready")
  }),
  object({
    value: literal("error"),
    error: pipe(
      errorLikeSchema,
      description("Serializable error describing why the module graph failed unexpectedly.")
    )
  }),
  object({
    value: literal("unavailable"),
    reason: pipe(
      string(),
      description(
        "Human-readable reason why the current builder/runtime cannot provide module graph functionality."
      )
    ),
    error: optional(
      pipe(
        errorLikeSchema,
        description("Optional serializable error reported by the builder adapter.")
      )
    )
  })
]), storyIndexPathSchema = pipe(
  string(),
  description("A story-index-style relative path such as `./src/Button.stories.tsx`.")
), storyDependencyDepthSchema = pipe(
  number(),
  description(
    "Breadth-first-search depth: the shortest number of import edges between the source file and this story file."
  )
), storiesByFileSchema = record(
  storyIndexPathSchema,
  record(storyIndexPathSchema, storyDependencyDepthSchema)
), noInputSchema = undefined_(), moduleGraphServiceDef = defineService({
  id: "core/module-graph",
  description: "Story module dependency graph: reverse index from source files to story files, with reactive updates.",
  initialState: {
    workingDir: process.cwd(),
    status: { value: "booting" },
    graphRevision: 0,
    storiesByFile: {},
    storyChangeRevisions: {},
    latestChangedStoryFiles: []
  },
  queries: {
    storiesForFiles: {
      description: "Returns, for each input file (same order), story-index-relative story files that depend on it and their breadth-first-search depth: the shortest number of import edges between the input file and the story file.",
      input: object({
        files: pipe(
          array(
            pipe(
              string(),
              description(
                "Input source file path. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`."
              )
            )
          ),
          description("Source files to look up. Output arrays match this input order.")
        )
      }),
      output: array(
        array(
          object({
            storyFile: pipe(
              storyIndexPathSchema,
              description(
                "Affected story file, returned in the same `./`-prefixed relative import-path format used by the story index."
              )
            ),
            depth: storyDependencyDepthSchema
          })
        )
      ),
      handler: (input, ctx) => {
        let { workingDir } = ctx.self.state;
        return input.files.map((file) => {
          let entries = ctx.self.state.storiesByFile[toStoryIndexPath(file, workingDir)];
          return entries ? Object.entries(entries).map(([storyFile, depth]) => ({
            storyFile,
            depth
          })) : [];
        });
      }
    },
    status: {
      description: "Current module graph lifecycle status. `booting` means the graph is still expected to become ready; `ready` means query state is populated; `error` means an unexpected graph failure; `unavailable` means the current builder/runtime cannot provide module graph functionality.",
      input: noInputSchema,
      output: moduleGraphStatusSchema,
      load: async (_input, ctx) => {
        await ctx.self.commands._waitForSettledEngine(void 0);
      },
      handler: (_input, ctx) => ctx.self.state.status
    },
    graphRevision: {
      description: "Monotonic revision counter for module graph changes, advanced only by in-graph file changes and story-index reconciliation (out-of-graph file changes never advance it). Omit the input to watch the entire graph. Provide `storyFiles` to scope the watch to specific stories: returns the highest revision at which any of those story subgraphs last changed (0 if none have changed yet, or for unknown stories).",
      input: optional(
        object({
          storyFiles: array(
            pipe(
              string(),
              description(
                "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0)."
              )
            )
          )
        })
      ),
      output: number(),
      handler: (input, ctx) => {
        if (!input)
          return ctx.self.state.graphRevision;
        if (input.storyFiles.length === 0)
          return 0;
        let max = 0, { workingDir } = ctx.self.state;
        for (let file of input.storyFiles) {
          let revision = ctx.self.state.storyChangeRevisions[toStoryIndexPath(file, workingDir)] ?? 0;
          revision > max && (max = revision);
        }
        return max;
      }
    },
    latestStoryChanges: {
      description: "Latest story files whose module graph changed, paired with the graph revision that produced the change set.",
      input: noInputSchema,
      output: object({
        revision: pipe(
          number(),
          description("Graph revision number for this latest story change set.")
        ),
        storyFiles: pipe(
          array(storyIndexPathSchema),
          description(
            "Story-index-relative story files touched by the latest module graph change set."
          )
        )
      }),
      handler: (_input, ctx) => ({
        revision: ctx.self.state.graphRevision,
        storyFiles: ctx.self.state.latestChangedStoryFiles
      })
    },
    /** @deprecated Use {@link status} instead. */
    getStatus: {
      description: "Deprecated alias for `status`. Use `status` instead.",
      input: noInputSchema,
      output: moduleGraphStatusSchema,
      handler: (input, ctx) => ctx.self.queries.status.get(input),
      load: async (input, ctx) => {
        await ctx.self.queries.status.loaded(input);
      }
    },
    /** @deprecated Use {@link graphRevision} instead. */
    getGraphRevision: {
      description: "Deprecated alias for `graphRevision`. Use `graphRevision` instead.",
      input: optional(
        object({
          storyFiles: array(
            pipe(
              string(),
              description(
                "Story file to scope the watch to. Accepts absolute paths, story-index-style relative paths with `./`, or relative paths without `./`. Pass an empty array to watch nothing (returns 0)."
              )
            )
          )
        })
      ),
      output: number(),
      handler: (input, ctx) => ctx.self.queries.graphRevision.get(input),
      load: async (input, ctx) => {
        await ctx.self.queries.graphRevision.loaded(input);
      }
    }
  },
  commands: {
    _applyGraphSnapshot: {
      internal: !0,
      description: "Replaces the reverse index after the initial graph build. Called by the graph engine, not by external consumers.",
      input: object({
        storiesByFile: pipe(
          storiesByFileSchema,
          description(
            "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths."
          )
        )
      }),
      output: void_(),
      handler: async (input, ctx) => {
        ctx.self.setState((state) => {
          state.status = { value: "ready" }, state.storiesByFile = input.storiesByFile, state.storyChangeRevisions = {};
          for (let stories of Object.values(input.storiesByFile))
            for (let storyFile of Object.keys(stories))
              state.storyChangeRevisions[storyFile] = 0;
          state.latestChangedStoryFiles = [];
        });
      }
    },
    _applyGraphUpdate: {
      internal: !0,
      description: "Replaces the reverse index after an incremental patch and bumps versions for affected story files. Called by the graph engine, not by external consumers.",
      input: object({
        storiesByFile: pipe(
          storiesByFileSchema,
          description(
            "Complete relative reverse index keyed by story-index-style source file paths. Values map affected story-index-style story file paths to breadth-first-search depths."
          )
        ),
        bumpedStoryFiles: pipe(
          array(storyIndexPathSchema),
          description(
            "Story files whose graph changed, using story-index-style relative paths. Each listed file has its version incremented."
          )
        )
      }),
      output: void_(),
      handler: async (input, ctx) => {
        ctx.self.setState((state) => {
          if (state.storiesByFile = input.storiesByFile, input.bumpedStoryFiles.length !== 0) {
            state.graphRevision += 1, state.latestChangedStoryFiles = input.bumpedStoryFiles;
            for (let storyFile of input.bumpedStoryFiles)
              state.storyChangeRevisions[storyFile] = state.graphRevision;
          }
        });
      }
    },
    _setStatus: {
      internal: !0,
      description: "Sets the module graph lifecycle status after engine startup, failure, or adapter availability changes.",
      input: moduleGraphStatusSchema,
      output: void_(),
      handler: async (input, ctx) => {
        ctx.self.setState((state) => {
          state.status = input;
        });
      }
    },
    _waitForSettledEngine: {
      internal: !0,
      description: "Waits for the module graph engine to finish its current build or patch cycle. Handler is supplied at server registration.",
      input: noInputSchema,
      output: void_()
    }
  }
});

// src/shared/open-service/services/module-graph/engine/module-graph-engine.ts
import { writeFile } from "node:fs/promises";
import { getProjectRoot as getProjectRoot2 } from "storybook/internal/common";
import { logger as logger4 } from "storybook/internal/node-logger";

// src/shared/open-service/services/module-graph/errors.ts
var ModuleGraphFailureError = class extends Error {
  constructor(message, options) {
    super(message, options), this.name = "ModuleGraphFailureError";
  }
};

// src/shared/open-service/services/module-graph/story-files.ts
var cache = /* @__PURE__ */ new WeakMap();
function getStoryIdsByAbsolutePath(storyIndex, workingDir) {
  let cached = cache.get(storyIndex);
  if (cached && cached.workingDir === workingDir)
    return cached.storyIdsByFile;
  let storyIdsByFile = /* @__PURE__ */ new Map();
  return Object.values(storyIndex.entries).forEach((entry) => {
    if (entry.type === "story" && !entry.importPath.startsWith("virtual:")) {
      let filePath = normalize(join(workingDir, entry.importPath)), storyIds = storyIdsByFile.get(filePath) ?? /* @__PURE__ */ new Set();
      storyIds.add(entry.id), storyIdsByFile.set(filePath, storyIds);
    }
  }), cache.set(storyIndex, { workingDir, storyIdsByFile }), storyIdsByFile;
}

// src/shared/open-service/services/module-graph/engine/dependency-graph/dependency-graph-builder.ts
import { cpus } from "node:os";
import { logger as defaultLogger } from "storybook/internal/node-logger";

// src/shared/open-service/services/module-graph/engine/dependency-graph/parse-resolve-cache.ts
import { readFile as readFile2 } from "node:fs/promises";
import { parseBarrelInfo } from "storybook/internal/oxc-parser";

// src/shared/open-service/services/module-graph/engine/dependency-graph/scope.ts
var NODE_MODULES_SEGMENT = "/node_modules/";
function isInsideAnyWorkspace(absolute, workspaceRoots) {
  if (absolute.includes(NODE_MODULES_SEGMENT))
    return !1;
  for (let root of workspaceRoots)
    if (absolute === root || absolute.startsWith(root.endsWith("/") ? root : `${root}/`))
      return !0;
  return !1;
}
function isInScope(absolute, projectRoot, workspaceRoots) {
  let projectPrefix = projectRoot.endsWith("/") ? projectRoot : `${projectRoot}/`;
  return (absolute === projectRoot || absolute.startsWith(projectPrefix)) && !absolute.includes(NODE_MODULES_SEGMENT) ? !0 : isInsideAnyWorkspace(absolute, workspaceRoots);
}

// src/shared/open-service/services/module-graph/engine/dependency-graph/parse-resolve-cache.ts
var BARREL_FOLLOW_MAX_DEPTH = 10, ParseResolveCache = class {
  constructor(opts) {
    this.parseCache = /* @__PURE__ */ new Map();
    this.resolveCache = /* @__PURE__ */ new Map();
    this.barrelInfoCache = /* @__PURE__ */ new Map();
    this.registry = opts.registry, this.resolver = opts.resolver, this.workspaceRoots = new Set(Array.from(opts.workspaceRoots, (r) => normalize(r))), this.projectRoot = normalize(opts.projectRoot), this.logger = opts.logger, this.debugTrace = opts.debug ? [] : null;
  }
  /** Returns accumulated barrel resolution events, or null when debug mode is off. */
  getBarrelTrace() {
    return this.debugTrace;
  }
  /**
   * Parses the file once and caches the resulting edge list. Returns `[]` for unreadable
   * files, parse failures, or files whose extension has no registered parser — callers
   * cannot distinguish between "no edges" and "we couldn't look", which is by design:
   * either way the file contributes nothing to the dependency graph.
   */
  parseOnce(filePath) {
    let existing = this.parseCache.get(filePath);
    if (existing)
      return existing;
    let promise = (async () => {
      let source;
      try {
        source = await readFile2(filePath, "utf8");
      } catch (error) {
        return this.logger.debug(
          `Change detection: could not read ${filePath}: ${error instanceof Error ? error.message : String(error)}`
        ), [];
      }
      try {
        return await this.registry.parse(filePath, source) ?? [];
      } catch (error) {
        return this.logger.debug(
          `Change detection: failed to parse ${filePath}: ${error instanceof Error ? error.message : String(error)}`
        ), [];
      }
    })();
    return this.parseCache.set(filePath, promise), promise;
  }
  /** Resolves every in-scope edge declared by `filePath` and returns the dep Set. */
  resolveOnce(filePath) {
    let existing = this.resolveCache.get(filePath);
    if (existing)
      return existing;
    let promise = (async () => {
      let edges = await this.parseOnce(filePath), deps = /* @__PURE__ */ new Set();
      for (let edge of edges) {
        let resolved = await this.resolver.resolve(filePath, edge.specifier);
        if (resolved === null) {
          this.logger.debug(`Could not resolve ${edge.specifier} from ${filePath}`);
          continue;
        }
        let normalised = normalize(resolved);
        if (isInScope(normalised, this.projectRoot, this.workspaceRoots)) {
          if (edge.importedNames !== null && edge.importedNames.size > 0) {
            let { sources, barrels, needBarrel } = await this.followBarrel(
              normalised,
              edge.importedNames
            );
            this.debugTrace?.push({
              from: filePath,
              specifier: edge.specifier,
              barrel: normalised,
              names: Array.from(edge.importedNames),
              resolved: Array.from(sources),
              needBarrel
            });
            for (let src of sources)
              deps.add(src);
            for (let barrel of barrels)
              deps.add(barrel);
          }
          deps.add(normalised);
        }
      }
      return deps;
    })();
    return this.resolveCache.set(filePath, promise), promise;
  }
  /**
   * For each name in `requestedNames`, walks the barrel chain starting at `barrelPath`
   * until it reaches the actual source file that defines the symbol.  Handles multi-level
   * chains where intermediate barrels use `export * from '...'` by recursing through them.
   *
   * Returns `needBarrel = true` for any name that could not be fully resolved so the
   * caller falls back to including the barrel itself.
   */
  async followBarrel(barrelPath, requestedNames) {
    let barrels = /* @__PURE__ */ new Set(), results = await Promise.all(
      Array.from(requestedNames, (name) => this.followName(barrelPath, name, /* @__PURE__ */ new Set(), 0, barrels))
    ), sources = /* @__PURE__ */ new Set(), needBarrel = !1;
    for (let source of results)
      source !== null ? sources.add(source) : needBarrel = !0;
    return { sources, barrels, needBarrel };
  }
  /**
   * Recursively follows a single exported name through barrel re-exports.
   *
   * 1. Checks named re-exports in `barrelPath`; if found, resolves the specifier and
   *    recurses with the inner name in case the target is itself a barrel.
   * 2. Falls through to wildcard re-exports (`export * from '...'`) and searches each
   *    transitively until the name is found or all paths are exhausted.
   *
   * Returns the normalised absolute path of the first non-barrel source found, or `null`
   * when the chain is unresolvable (triggering the conservative `needBarrel` fallback).
   * Cycle detection via `visited`; depth limit of 10 hops prevents infinite recursion.
   */
  async followName(barrelPath, name, visited, depth, barrels) {
    if (depth > BARREL_FOLLOW_MAX_DEPTH)
      return this.logger.debug(
        `Change detection: barrel chain depth limit reached at ${barrelPath} (looking for "${name}")`
      ), null;
    if (visited.has(barrelPath))
      return null;
    visited.add(barrelPath), barrels.add(barrelPath);
    let info = await this.barrelInfoOnce(barrelPath), entry = info.named.get(name);
    if (entry) {
      let sourceResolved = await this.resolver.resolve(barrelPath, entry.specifier);
      if (sourceResolved !== null) {
        let sourceNorm = normalize(sourceResolved);
        if (isInScope(sourceNorm, this.projectRoot, this.workspaceRoots))
          return await this.followName(
            sourceNorm,
            entry.importedName,
            new Set(visited),
            depth + 1,
            barrels
          ) ?? sourceNorm;
      }
      return null;
    }
    for (let wildcardSpec of info.wildcards) {
      let wildcardResolved = await this.resolver.resolve(barrelPath, wildcardSpec);
      if (wildcardResolved === null)
        continue;
      let wildcardNorm = normalize(wildcardResolved);
      if (!isInScope(wildcardNorm, this.projectRoot, this.workspaceRoots))
        continue;
      let result = await this.followName(
        wildcardNorm,
        name,
        new Set(visited),
        depth + 1,
        barrels
      );
      if (result !== null)
        return result;
    }
    return null;
  }
  /**
   * Lazily parses and caches the barrel info (named re-exports + wildcard specifiers)
   * for `filePath`. Returns empty info for files that cannot be read or have no exports.
   */
  barrelInfoOnce(filePath) {
    let existing = this.barrelInfoCache.get(filePath);
    if (existing)
      return existing;
    let promise = (async () => {
      let source;
      try {
        source = await readFile2(filePath, "utf8");
      } catch {
        return { named: /* @__PURE__ */ new Map(), wildcards: [] };
      }
      try {
        return await parseBarrelInfo(filePath, source);
      } catch {
        return { named: /* @__PURE__ */ new Map(), wildcards: [] };
      }
    })();
    return this.barrelInfoCache.set(filePath, promise), promise;
  }
  /** Drops all cached entries for `filePath`. Call on every `change`/`unlink` event. */
  invalidate(filePath) {
    this.parseCache.delete(filePath), this.resolveCache.delete(filePath), this.barrelInfoCache.delete(filePath);
  }
  /** Test-only: full reset. */
  clear() {
    this.parseCache.clear(), this.resolveCache.clear(), this.barrelInfoCache.clear();
  }
};

// src/shared/open-service/services/module-graph/engine/dependency-graph/reverse-index.ts
var ReverseIndexImpl = class {
  constructor() {
    this.index = /* @__PURE__ */ new Map();
    /** Forward mapping from story file -> Set of dep files it reaches. */
    this.forwardIndex = /* @__PURE__ */ new Map();
  }
  /** Records (or updates with min) the depth for (dep, story). */
  record(dep, story, depth) {
    let inner = this.index.get(dep);
    inner || (inner = /* @__PURE__ */ new Map(), this.index.set(dep, inner));
    let previous = inner.get(story);
    if (previous === void 0 || depth < previous) {
      inner.set(story, depth);
      let deps = this.forwardIndex.get(story);
      deps || (deps = /* @__PURE__ */ new Set(), this.forwardIndex.set(story, deps)), deps.add(dep);
    }
  }
  /** Removes a story from every inner map; prunes outer entries that become empty. */
  removeStory(story) {
    let deps = this.forwardIndex.get(story);
    if (deps) {
      for (let dep of deps) {
        let inner = this.index.get(dep);
        inner && (inner.delete(story), inner.size === 0 && this.index.delete(dep));
      }
      this.forwardIndex.delete(story);
    }
  }
  /** Removes a single (dep, story) pair without affecting other stories' depths to that dep. */
  removeEdge(dep, story) {
    let inner = this.index.get(dep);
    if (inner && inner.delete(story)) {
      inner.size === 0 && this.index.delete(dep);
      let deps = this.forwardIndex.get(story);
      deps && (deps.delete(dep), deps.size === 0 && this.forwardIndex.delete(story));
    }
  }
  /** Returns the per-story depth map for dep. EMPTY map (not undefined) if dep unknown. */
  lookup(dep) {
    return this.index.get(dep) ?? /* @__PURE__ */ new Map();
  }
  /** Internal state inspection — for tests. */
  asMap() {
    return this.index;
  }
};

// src/shared/open-service/services/module-graph/engine/dependency-graph/walk-from-story.ts
async function walkFromStory({
  storyRoot,
  registry,
  cache: cache3,
  reverseIndex,
  recordEdges
}) {
  reverseIndex.record(storyRoot, storyRoot, 0);
  let visited = /* @__PURE__ */ new Map();
  visited.set(storyRoot, 0);
  let queue = [{ file: storyRoot, depth: 0 }], head = 0;
  for (; head < queue.length; ) {
    let { file, depth } = queue[head++];
    if (registry.parserFor(file) === void 0)
      continue;
    let resolvedDeps = await cache3.resolveOnce(file);
    recordEdges(file, resolvedDeps);
    let nextDepth = depth + 1;
    for (let normalised of resolvedDeps) {
      if (nextDepth > 50)
        continue;
      let previousDepth = visited.get(normalised);
      previousDepth !== void 0 && previousDepth <= nextDepth || (visited.set(normalised, nextDepth), reverseIndex.record(normalised, storyRoot, nextDepth), queue.push({ file: normalised, depth: nextDepth }));
    }
  }
}

// src/shared/open-service/services/module-graph/engine/dependency-graph/dependency-graph-builder.ts
var DependencyGraphBuilder = class {
  constructor(opts) {
    this.registry = opts.registry, this.logger = opts.logger ?? defaultLogger, this.cache = opts.cache ?? new ParseResolveCache({
      registry: opts.registry,
      resolver: opts.resolver,
      workspaceRoots: opts.workspaceRoots,
      projectRoot: opts.projectRoot,
      logger: this.logger
    });
  }
  async build(storyFiles) {
    let startedAt = Date.now(), reverseIndex = new ReverseIndexImpl(), graph = /* @__PURE__ */ new Map(), limit = pLimit(cpus().length * 2), stories = Array.from(storyFiles, (s) => normalize(s));
    await Promise.all(
      stories.map(
        (story) => limit(
          () => walkFromStory({
            storyRoot: story,
            registry: this.registry,
            cache: this.cache,
            reverseIndex,
            recordEdges: (file, deps) => graph.set(file, deps)
          })
        )
      )
    );
    let elapsed = Date.now() - startedAt;
    return this.logger.debug(
      `Change detection graph built: ${stories.length} stories, ${reverseIndex.asMap().size} deps tracked, ${elapsed}ms`
    ), { reverseIndex, graph };
  }
};

// src/shared/open-service/services/module-graph/engine/dependency-graph/incremental-patcher.ts
import { logger as defaultLogger2 } from "storybook/internal/node-logger";
function setsEqual(a, b) {
  if (a.size !== b.size)
    return !1;
  for (let item of a)
    if (!b.has(item))
      return !1;
  return !0;
}
var IncrementalPatcher = class {
  constructor(opts) {
    this.reverseIndex = opts.reverseIndex, this.graph = opts.graph, this.registry = opts.registry, this.logger = opts.logger ?? defaultLogger2, this.isStoryFile = opts.isStoryFile, this.cache = opts.cache ?? new ParseResolveCache({
      registry: opts.registry,
      resolver: opts.resolver,
      workspaceRoots: opts.workspaceRoots,
      projectRoot: opts.projectRoot,
      logger: this.logger
    });
  }
  async patch(event) {
    let path = normalize(event.path);
    if (this.cache.invalidate(path), event.kind === "add") {
      this.isStoryFile(path) && await this.walkStory(path);
      return;
    }
    if (event.kind === "unlink") {
      let dependentsSet = new Set(this.reverseIndex.lookup(path).keys());
      this.graph.delete(path), this.reverseIndex.removeStory(path);
      let storiesToWalk2 = [];
      for (let story of dependentsSet)
        story === path || !this.isStoryFile(story) || (this.reverseIndex.removeStory(story), storiesToWalk2.push(story));
      await Promise.all(storiesToWalk2.map((story) => this.walkStory(story)));
      return;
    }
    let affectedStories = new Set(this.reverseIndex.lookup(path).keys());
    this.isStoryFile(path) && affectedStories.add(path);
    let oldDeps = this.graph.get(path);
    if (oldDeps !== void 0) {
      let newDeps = await this.cache.resolveOnce(path);
      if (setsEqual(oldDeps, newDeps))
        return;
    }
    let storiesToWalk = [];
    for (let story of affectedStories)
      this.isStoryFile(story) && (this.reverseIndex.removeStory(story), storiesToWalk.push(story));
    await Promise.all(storiesToWalk.map((story) => this.walkStory(story)));
  }
  walkStory(storyRoot) {
    return this.cache.invalidate(storyRoot), walkFromStory({
      storyRoot,
      registry: this.registry,
      cache: this.cache,
      reverseIndex: this.reverseIndex,
      recordEdges: (file, deps) => {
        this.graph.set(file, deps);
      }
    });
  }
};

// src/shared/open-service/services/module-graph/engine/dependency-graph/resolver-factory.ts
import { ResolverFactory as OxcResolverFactory } from "oxc-resolver";
import { logger as logger2 } from "storybook/internal/node-logger";
var DEFAULT_EXTENSIONS = [".tsx", ".ts", ".d.ts", ".jsx", ".js", ".mjs", ".cjs", ".json"], DEFAULT_CONDITIONS = ["storybook", "import", "module", "default"], AliasNormalizer = class {
  constructor() {
    this.warnedRegexAliases = /* @__PURE__ */ new Set();
  }
  normalize(alias) {
    if (!alias)
      return;
    let out = {}, skippedRegex = [];
    if (Array.isArray(alias))
      for (let entry of alias)
        if (typeof entry.find == "string") {
          let find = entry.find.replace(/\/$/, ""), replacement = entry.replacement.replace(/\/$/, "");
          out[find] = [replacement];
        } else
          skippedRegex.push(String(entry.find));
    else
      for (let [find, replacement] of Object.entries(alias))
        out[find.replace(/\/$/, "")] = [replacement.replace(/\/$/, "")];
    if (skippedRegex.length > 0) {
      let newPatterns = skippedRegex.filter((p) => !this.warnedRegexAliases.has(p));
      if (newPatterns.length > 0) {
        for (let p of newPatterns)
          this.warnedRegexAliases.add(p);
        logger2.debug(
          `Change detection: ignored ${skippedRegex.length} regex alias(es); related modules tracked as opaque-leaf.`
        ), logger2.debug(
          `ChangeDetectionResolverFactory: skipped regex aliases [${skippedRegex.join(", ")}]`
        );
      } else
        for (let pattern of skippedRegex)
          logger2.debug(`ChangeDetectionResolverFactory: skipping regex alias '${pattern}'`);
    }
    return Object.keys(out).length > 0 ? out : void 0;
  }
}, ChangeDetectionResolverFactory = class {
  constructor(config) {
    this.aliasNormalizer = new AliasNormalizer();
    let alias = this.aliasNormalizer.normalize(config.alias), conditionNames = config.conditions ?? DEFAULT_CONDITIONS;
    this.factory = new OxcResolverFactory({
      tsconfig: "auto",
      alias,
      conditionNames,
      extensions: DEFAULT_EXTENSIONS
    }), this.projectRootEntry = join(config.projectRoot, "__sb_resolver_root__.ts");
  }
  /**
   * Resolves `specifier` from the file at `from` (must be an absolute path).
   *
   * Two-pass strategy:
   * 1. Resolve from `from` — handles per-package tsconfig paths and local node_modules.
   * 2. On failure, retry from the project root — picks up root-level tsconfig `paths`
   *    (e.g. workspace package aliases) that intermediate per-package tsconfigs may
   *    not inherit, as well as root-level node_modules symlinks.
   *
   * Returns the absolute resolved path, or `null` if both passes fail.
   * Never throws — internal errors are converted to `null` and a debug-level log
   * line is emitted.
   */
  async resolve(from, specifier) {
    try {
      let result = await this.factory.resolveFileAsync(from, specifier);
      if (result.path)
        return result.path;
      if (from !== this.projectRootEntry) {
        let rootResult = await this.factory.resolveFileAsync(this.projectRootEntry, specifier);
        return rootResult.path ? rootResult.path : ((result.error ?? rootResult.error) && logger2.debug(
          `ChangeDetectionResolverFactory: '${specifier}' from '${from}' unresolved (${result.error ?? rootResult.error})`
        ), null);
      }
      return result.error && logger2.debug(
        `ChangeDetectionResolverFactory: '${specifier}' from '${from}' unresolved (${result.error})`
      ), null;
    } catch (error) {
      return logger2.debug(
        `ChangeDetectionResolverFactory: error resolving '${specifier}' from '${from}': ${String(error)}`
      ), null;
    }
  }
};

// src/shared/open-service/services/module-graph/engine/parser-registry/builtins.ts
import { parseWithOxc } from "storybook/internal/oxc-parser";

// src/shared/open-service/services/module-graph/engine/parser-registry/mdx-parse.ts
var MDX_IMPORT_REGEX = /(?:import\s+(?:[\s\S]*?\s+from\s+)?|export\s+[\s\S]*?\s+from\s+)['"]([^'"]+)['"]/g;
function stripCodeRegions(source) {
  let stripped = source.replace(/```[\s\S]*?```/gs, (match) => " ".repeat(match.length));
  return stripped = stripped.replace(/`[^`]*`/g, (match) => " ".repeat(match.length)), stripped;
}
function mdxParse(source) {
  let stripped = stripCodeRegions(source), edges = [], seen = /* @__PURE__ */ new Set();
  MDX_IMPORT_REGEX.lastIndex = 0;
  let match = MDX_IMPORT_REGEX.exec(stripped);
  for (; match !== null; ) {
    let specifier = match[1], key = `static:${specifier}`;
    seen.has(key) || (seen.add(key), edges.push({ specifier, kind: "static", importedNames: null })), match = MDX_IMPORT_REGEX.exec(stripped);
  }
  return edges;
}

// src/shared/open-service/services/module-graph/engine/parser-registry/builtins.ts
var oxcImportParser = {
  extensions: [...jsTsSourceExtensions],
  async parse({ filePath, source }) {
    return parseWithOxc(filePath, source);
  }
}, mdxImportParser = {
  extensions: [".mdx"],
  async parse({ source }) {
    return mdxParse(source);
  }
}, builtinImportParsers = [oxcImportParser, mdxImportParser];

// src/shared/open-service/services/module-graph/engine/parser-registry/parser-registry.ts
import { logger as logger3 } from "storybook/internal/node-logger";
import { parseWithOxc as parseWithOxc2 } from "storybook/internal/oxc-parser";
var ParserRegistry = class {
  constructor(opts) {
    this.byExtension = /* @__PURE__ */ new Map();
    this.context = { parseScriptWithOxc: this.parseScriptWithOxc.bind(this) };
    for (let p of opts.defaultParsers)
      this.register(p);
    for (let p of opts.pluginParsers)
      this.register(p);
  }
  register(plugin) {
    for (let ext of plugin.extensions) {
      let lower = ext.toLowerCase();
      this.byExtension.has(lower) && logger3.debug(`ParserRegistry: ${lower} parser overridden`), this.byExtension.set(lower, plugin.parse);
    }
  }
  parserFor(filePath) {
    return this.byExtension.get(extname(filePath).toLowerCase());
  }
  /**
   * Returns `null` when no parser claims the extension — callers interpret this as
   * "opaque leaf, do not walk into".
   */
  async parse(filePath, source) {
    let fn = this.parserFor(filePath);
    return fn ? fn({ filePath, source }, this.context) : null;
  }
  async parseScriptWithOxc(source, virtualFilePath) {
    return parseWithOxc2(virtualFilePath, source);
  }
};

// src/shared/open-service/services/module-graph/engine/module-graph-engine.ts
var ModuleGraphEngine = class {
  constructor(options) {
    this.options = options;
    this.storyFiles = /* @__PURE__ */ new Set();
    this.refreshInFlight = !1;
    /**
     * Resolves once the in-flight story-index reconciliation has enqueued its add/unlink patches.
     * {@link whenSettled} awaits this before snapshotting {@link patchQueue}, so a barrier taken
     * while a reconciliation is still in `getIndex()` does not miss its patches (which would let a
     * later {@link lookup} observe a pre-reconciliation graph).
     */
    this.refreshSettled = Promise.resolve();
    /**
     * Serialises file-change patches so two events touching the same dep set never interleave
     * across `await` points inside `IncrementalPatcher.patch`. The chain ignores rejections
     * (each call's failure is logged in {@link handleFileChange}).
     */
    this.patchQueue = Promise.resolve();
    this.workingDir = options.workingDir ?? process.cwd();
  }
  start(adapter) {
    this.adapter = adapter, this.startInternal().catch((error) => {
      let failure = error instanceof Error ? error : new ModuleGraphFailureError(String(error));
      logger4.error(`Module graph failed to start: ${failure.message}`), this.options.onError?.(failure);
    });
  }
  mirrorSnapshot() {
    this.reverseIndex && this.options.onSnapshot?.(
      reverseIndexToStoriesByFile(this.reverseIndex.asMap(), this.workingDir)
    );
  }
  collectBumpedStoryFiles(changedFile) {
    if (!this.reverseIndex)
      return /* @__PURE__ */ new Set();
    let normalized = normalize(changedFile), bumpedStoryFiles = /* @__PURE__ */ new Set();
    for (let [storyFile] of this.reverseIndex.lookup(normalized))
      bumpedStoryFiles.add(storyFile);
    return this.storyFiles.has(normalized) && bumpedStoryFiles.add(normalized), bumpedStoryFiles;
  }
  mirrorUpdate(changedFile, prePatchBumped = /* @__PURE__ */ new Set()) {
    if (!this.reverseIndex)
      return;
    let normalized = normalize(changedFile), bumpedStoryFiles = new Set(prePatchBumped);
    for (let [storyFile] of this.reverseIndex.lookup(normalized))
      bumpedStoryFiles.add(storyFile);
    this.storyFiles.has(normalized) && bumpedStoryFiles.add(normalized), this.options.onUpdate?.({
      storiesByFile: reverseIndexToStoriesByFile(this.reverseIndex.asMap(), this.workingDir),
      bumpedStoryFiles: Array.from(
        bumpedStoryFiles,
        (storyFile) => toStoryIndexPath(storyFile, this.workingDir)
      )
    });
  }
  /**
   * Returns the per-story breadth-first-search depth map for `dep`. Depth is the shortest number of
   * import edges from the changed file to each affected story. Empty map if `dep` is unknown or
   * unbuilt.
   */
  lookup(dep) {
    return this.reverseIndex?.lookup(dep) ?? /* @__PURE__ */ new Map();
  }
  /** True once the initial build has produced a reverse index. */
  hasGraph() {
    return this.reverseIndex !== void 0;
  }
  /**
   * Read barrier. First awaits any in-flight story-index reconciliation so its add/unlink patches
   * are enqueued, then snapshots the current tail of {@link patchQueue} (rather than re-reading the
   * live field, so a continuous stream of file events cannot livelock the awaiter) and awaits it.
   * When it resolves, every patch enqueued as of this call — including that reconciliation — has
   * fully settled.
   *
   * This is a point-in-time barrier, not a freeze: file events arriving after the snapshot enqueue
   * patches this call does not await, so a {@link lookup} taken after any further `await` may
   * observe a newer (still non-mid-patch) graph. For a read pinned to this barrier, call
   * {@link lookup} immediately after this resolves with no intervening `await`.
   */
  async whenSettled() {
    await this.refreshSettled.catch(() => {
    }), await this.patchQueue.catch(() => {
    });
  }
  /**
   * Builds parser registry, resolver, dependency graph, and patcher; subscribes to file-change
   * events queued behind {@link patchQueue}; then mirrors the initial snapshot to the service.
   */
  async startInternal() {
    let adapter = this.adapter;
    if (!adapter)
      return;
    adapter.onStartupFailure?.((event) => {
      this.options.onUnavailable?.(event.reason, event.error);
    });
    let resolveConfig = await adapter.getResolveConfig(), projectRoot = normalize(resolveConfig.projectRoot ?? this.workingDir), pluginParsers = this.options.presets ? await this.options.presets.apply("experimental_importParsers", []) : [], registry = new ParserRegistry({
      defaultParsers: builtinImportParsers,
      pluginParsers
    }), resolver = new ChangeDetectionResolverFactory(resolveConfig), workspaceRoots = /* @__PURE__ */ new Set([normalize(getProjectRoot2())]), storyIndex = await this.options.getIndex(), storyIdsByFile = getStoryIdsByAbsolutePath(storyIndex, this.workingDir);
    this.storyFiles = new Set(storyIdsByFile.keys());
    let debugEnv = process.env.STORYBOOK_CHANGE_DETECTION_DEBUG, cache3 = new ParseResolveCache({
      registry,
      resolver,
      workspaceRoots,
      projectRoot,
      logger: logger4,
      debug: !!debugEnv
    });
    this.dependencyGraphBuilder = new DependencyGraphBuilder({
      registry,
      resolver,
      workspaceRoots,
      projectRoot,
      cache: cache3
    });
    let eventBuffer = [], unsubscribeBuffer = adapter.onFileChange((event) => {
      eventBuffer.push(event);
    }), { reverseIndex, graph } = await this.dependencyGraphBuilder.build(this.storyFiles);
    this.reverseIndex = reverseIndex, this.dumpDebugSnapshot(reverseIndex, graph, projectRoot, workspaceRoots, cache3), this.incrementalPatcher = new IncrementalPatcher({
      reverseIndex,
      graph,
      registry,
      resolver,
      workspaceRoots,
      projectRoot,
      cache: cache3,
      isStoryFile: (path) => this.storyFiles.has(normalize(path))
    }), unsubscribeBuffer();
    for (let event of eventBuffer)
      this.patchQueue = this.patchQueue.then(() => this.handleFileChange(event)).catch(() => {
      });
    adapter.onFileChange((event) => {
      this.patchQueue = this.patchQueue.then(() => this.handleFileChange(event)).catch(() => {
      });
    }), this.mirrorSnapshot();
  }
  onStoryIndexInvalidated() {
    !this.refreshInFlight && this.incrementalPatcher && (this.refreshInFlight = !0, this.refreshSettled = this.refreshStoryFiles().catch(() => {
    }).finally(() => {
      this.refreshInFlight = !1;
    }));
  }
  /**
   * Re-reads the story index and reconciles {@link storyFiles} with stories that have appeared or
   * disappeared since startup. For each story that newly entered the index, the patcher is asked
   * to walk it (so its forward edges are recorded). For each story that left the index, the
   * patcher is asked to unlink it (so its reverse-index entries are pruned). Replays are queued
   * behind {@link patchQueue} to keep the serialised-patch invariant intact.
   *
   * Single-flight is enforced by the sole caller, {@link onStoryIndexInvalidated}, which also
   * exposes this run via {@link refreshSettled} so {@link whenSettled} can wait for the add/unlink
   * patches to be enqueued.
   */
  async refreshStoryFiles() {
    let storyIndex = await this.options.getIndex(), storyIdsByFile = getStoryIdsByAbsolutePath(storyIndex, this.workingDir), next = new Set(storyIdsByFile.keys()), previous = this.storyFiles, added = [];
    for (let path of next)
      previous.has(path) || added.push(path);
    let removed = [];
    for (let path of previous)
      next.has(path) || removed.push(path);
    if (!(added.length === 0 && removed.length === 0)) {
      this.storyFiles = next;
      for (let path of added)
        this.patchQueue = this.patchQueue.then(() => this.handleFileChange({ kind: "add", path })).catch(() => {
        });
      for (let path of removed)
        this.patchQueue = this.patchQueue.then(() => this.handleFileChange({ kind: "unlink", path })).catch(() => {
        });
    }
  }
  async dumpDebugSnapshot(reverseIndex, graph, projectRoot, workspaceRoots, cache3) {
    let debugEnv = process.env.STORYBOOK_CHANGE_DETECTION_DEBUG;
    if (!debugEnv)
      return;
    let outPath = debugEnv === "1" || debugEnv === "true" ? join(projectRoot, "storybook-graph-debug.json") : debugEnv, graphObj = {};
    for (let [story, deps] of graph)
      graphObj[story] = Array.from(deps).sort();
    let reverseObj = {};
    for (let [dep, stories] of reverseIndex.asMap())
      reverseObj[dep] = Array.from(stories.entries()).map(([story, depth]) => ({ story, depth })).sort((a, b) => a.depth - b.depth || a.story.localeCompare(b.story));
    let snapshot = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      projectRoot,
      workspaceRoots: Array.from(workspaceRoots).sort(),
      // `graph` is keyed by every walked node (story roots + their transitive deps),
      // and `reverseIndex` records each story root at depth 0 alongside real deps —
      // so `graph.size` / `reverseIndex.asMap().size` over-report story and dep totals.
      // Report `storyFiles` from the authoritative source-of-truth set, plus the raw
      // node/entry counts under unambiguous names for diagnostics.
      storyFiles: this.storyFiles.size,
      graphNodes: graph.size,
      reverseIndexEntries: reverseIndex.asMap().size,
      graph: graphObj,
      reverseIndex: reverseObj,
      // Each entry records one named-import barrel lookup: which names were requested,
      // which source files they resolved to, and whether the barrel itself was also
      // included (needBarrel: true means at least one name fell back to the barrel).
      barrelResolutions: cache3.getBarrelTrace() ?? []
    };
    try {
      await writeFile(outPath, JSON.stringify(snapshot, null, 2), "utf8"), logger4.debug(`Change detection: graph debug snapshot written to ${outPath}`);
    } catch (error) {
      logger4.warn(
        `Change detection: failed to write debug snapshot to ${outPath}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  async handleFileChange(event) {
    if (!this.incrementalPatcher)
      return;
    let prePatchBumped = this.collectBumpedStoryFiles(event.path);
    try {
      await this.incrementalPatcher.patch(event);
    } catch (error) {
      logger4.warn(
        `Change detection: failed to apply ${event.kind} for ${event.path}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
    this.mirrorUpdate(event.path, prePatchBumped);
  }
};

// src/shared/open-service/services/module-graph/server.ts
var resolveAdapter, changeDetectionAdapterPromise = new Promise(
  (resolve2) => {
    resolveAdapter = resolve2;
  }
);
function resolveChangeDetectionAdapter(adapter) {
  resolveAdapter(adapter);
}
function registerModuleGraphService(options) {
  let workingDir = options.workingDir ?? process.cwd(), engine, runtime = registerService(
    {
      ...moduleGraphServiceDef,
      initialState: {
        ...moduleGraphServiceDef.initialState,
        workingDir
      }
    },
    {
      commands: {
        _waitForSettledEngine: {
          handler: async () => {
            await engine.whenSettled();
          }
        }
      }
    }
  );
  return engine = new ModuleGraphEngine({
    getIndex: options.getIndex,
    workingDir,
    presets: options.presets,
    onSnapshot: (storiesByFile) => {
      runtime.commands._applyGraphSnapshot({ storiesByFile });
    },
    onUpdate: ({ storiesByFile, bumpedStoryFiles }) => {
      runtime.commands._applyGraphUpdate({ storiesByFile, bumpedStoryFiles });
    },
    onError: (error) => {
      runtime.commands._setStatus({ value: "error", error: errorToErrorLike(error) });
    },
    onUnavailable: (reason, error) => {
      runtime.commands._setStatus({
        value: "unavailable",
        reason,
        ...error ? { error: errorToErrorLike(error) } : {}
      });
    }
  }), options.channel.on(STORY_INDEX_INVALIDATED, () => {
    engine.onStoryIndexInvalidated();
  }), changeDetectionAdapterPromise.then((adapter) => {
    if (!adapter) {
      runtime.commands._setStatus({
        value: "unavailable",
        reason: "builder does not support change detection"
      });
      return;
    }
    engine.start(adapter);
  }), runtime;
}

// src/core-server/presets/wsToken.ts
import { randomUUID } from "crypto";
var getWsToken = () => (globalThis.STORYBOOK_WEBSOCKET_TOKEN || (globalThis.STORYBOOK_WEBSOCKET_TOKEN = randomUUID()), globalThis.STORYBOOK_WEBSOCKET_TOKEN);

// src/core-server/withTelemetry.ts
import {
  HandledError,
  cache as cache2,
  loadMainConfig,
  isCI,
  loadAllPresets
} from "storybook/internal/common";
import { logger as logger5, prompt } from "storybook/internal/node-logger";
import {
  ErrorCollector,
  getPrecedingUpgrade,
  isTelemetryStateResolved,
  oneWayHash,
  onPayloadError,
  setTelemetryEnabled,
  telemetry
} from "storybook/internal/telemetry";
var promptCrashReports = async () => {
  if (isCI() || !process.stdout.isTTY)
    return;
  let enableCrashReports = await prompt.confirm({
    message: "Would you like to send anonymous crash reports to improve Storybook and fix bugs faster?",
    initialValue: !0
  });
  return await cache2.set("enableCrashReports", enableCrashReports), enableCrashReports;
};
async function getErrorLevel({
  cliOptions,
  presetOptions,
  skipPrompt,
  eventType
}) {
  if (cliOptions.disableTelemetry)
    return "none";
  if (!presetOptions && eventType !== "init")
    return "error";
  if (presetOptions) {
    let core = await (await loadAllPresets(presetOptions)).apply("core");
    if (core?.enableCrashReports !== void 0)
      return core.enableCrashReports ? "full" : "error";
    if (core?.disableTelemetry)
      return "none";
  }
  let valueFromCache = await cache2.get("enableCrashReports") ?? await cache2.get("enableCrashreports");
  if (valueFromCache !== void 0)
    return valueFromCache ? "full" : "error";
  if (skipPrompt)
    return "error";
  let valueFromPrompt = await promptCrashReports();
  return valueFromPrompt !== void 0 ? valueFromPrompt ? "full" : "error" : "full";
}
async function sendTelemetryError(_error, eventType, options, blocking = !0, parent) {
  try {
    let errorLevel = "error";
    try {
      errorLevel = await getErrorLevel({
        ...options,
        eventType,
        skipPrompt: options.skipPrompt || eventType === "init" && !blocking
      });
    } catch {
    }
    if (errorLevel !== "none") {
      let precedingUpgrade = await getPrecedingUpgrade(), error = _error, errorHash;
      "message" in error ? errorHash = error.message ? oneWayHash(error.message) : "EMPTY_MESSAGE" : errorHash = "NO_MESSAGE";
      let { code, name, category } = error;
      if (await telemetry(
        "error",
        {
          code,
          name,
          category,
          eventType,
          blocking,
          precedingUpgrade,
          error: errorLevel === "full" ? error : void 0,
          errorHash,
          // if we ever end up sending a non-error instance, we'd like to know
          isErrorInstance: error instanceof Error,
          // Include parent error information if this is a sub-error
          ...parent ? { parent: parent.fullErrorCode } : {}
        },
        {
          immediate: !0,
          configDir: options.cliOptions.configDir || options.presetOptions?.configDir,
          enableCrashReports: errorLevel === "full",
          force: !0
        }
      ), error && "subErrors" in error && error.subErrors.length > 0)
        for (let subError of error.subErrors)
          await sendTelemetryError(subError, eventType, options, blocking, error);
    }
  } catch {
  }
}
async function resolveTelemetryState(options) {
  if (options.cliOptions.disableTelemetry !== void 0)
    return await setTelemetryEnabled(!options.cliOptions.disableTelemetry);
  let mainConfig, configDir = options.cliOptions.configDir ?? options.presetOptions?.configDir ?? ".storybook";
  try {
    mainConfig = await loadMainConfig({ configDir });
  } catch {
  }
  if (mainConfig)
    return await setTelemetryEnabled(!mainConfig?.core?.disableTelemetry);
  await setTelemetryEnabled(options.fallbackTelemetryState ?? !1);
}
function isInterruptionError(error) {
  if (!error || typeof error != "object")
    return !1;
  let signal = "signal" in error ? error.signal : void 0, code = "code" in error ? error.code : void 0, name = "name" in error ? error.name : void 0, message = "message" in error && typeof error.message == "string" ? error.message : void 0, cause = "cause" in error ? error.cause : void 0;
  return signal === "SIGINT" || code === "ABORT_ERR" || code === "ERR_CANCELED" || name === "AbortError" || message?.includes("Command was killed with SIGINT") || message?.includes("The operation was aborted") || isInterruptionError(cause);
}
var CANCELLATION_TRACKED_EVENTS = ["init", "ai-command"];
async function withTelemetry(eventType, options, run) {
  isTelemetryStateResolved() || await resolveTelemetryState(options);
  let canceled = !1;
  async function cancelTelemetry() {
    canceled = !0, await telemetry("canceled", { eventType }, { stripMetadata: !0, immediate: !0 }), process.exit(0);
  }
  let trackCancellation = CANCELLATION_TRACKED_EVENTS.includes(eventType);
  trackCancellation && process.on("SIGINT", cancelTelemetry), onPayloadError(async (error, evtType) => {
    await sendTelemetryError(error, evtType, options);
  }), telemetry("boot", { eventType }, { stripMetadata: !0 });
  try {
    return await run();
  } catch (error) {
    if (canceled)
      return;
    if (trackCancellation && isInterruptionError(error)) {
      await cancelTelemetry();
      return;
    }
    if (!(error instanceof HandledError || error instanceof StorybookError && error.isHandledError)) {
      let { printError = logger5.error } = options;
      printError(error);
    }
    throw await sendTelemetryError(error, eventType, options), error;
  } finally {
    let errors = ErrorCollector.getErrors();
    for (let error of errors)
      await sendTelemetryError(error, eventType, options, !1);
    process.off("SIGINT", cancelTelemetry), onPayloadError(void 0);
  }
}

// src/core-server/utils/generate-story.ts
import { existsSync as existsSync3 } from "node:fs";
import { writeFile as writeFile2 } from "node:fs/promises";
import { relative as relative3 } from "node:path";
import { getProjectRoot as getProjectRoot4, getStoryId } from "storybook/internal/common";

// src/core-server/utils/get-new-story-file.ts
import { existsSync as existsSync2 } from "node:fs";
import { readFile as readFile3 } from "node:fs/promises";
import { basename as basename2, dirname as dirname2, extname as extname2, join as join3, relative as relative2 } from "node:path";
import { types as t, traverse } from "storybook/internal/babel";
import {
  extractFrameworkPackageName,
  findConfigFile,
  formatFileContent,
  getFrameworkName,
  getProjectRoot as getProjectRoot3
} from "storybook/internal/common";
import { isCsfFactoryPreview } from "storybook/internal/csf-tools";
import { logger as logger6 } from "storybook/internal/node-logger";

// src/core-server/utils/new-story-templates/csf-factory-template.ts
var import_ts_dedent3 = __toESM(require_dist(), 1);

// src/core-server/utils/get-component-variable-name.ts
var getComponentVariableName = async (name) => (await import("./camelcase-56MHUKLD.js")).default(name.replace(/^[^a-zA-Z_$]*/, ""), { pascalCase: !0 }).replace(/[^a-zA-Z_$]+/, "");

// src/core-server/utils/new-story-templates/csf-factory-template.ts
async function getCsfFactoryTemplateForNewStoryFile(data) {
  let importName = data.componentIsDefaultExport ? await getComponentVariableName(data.basenameWithoutExtension) : data.componentExportName, importStatement = data.componentIsDefaultExport ? `import ${importName} from './${data.basenameWithoutExtension}';` : `import { ${importName} } from './${data.basenameWithoutExtension}';`, previewImport = data.previewImportPath ? `import preview from '${data.previewImportPath}';` : "import preview from '#.storybook/preview';", argsString = data.args && Object.keys(data.args).length > 0 ? `{ args: ${JSON.stringify(data.args, null, 2)} }` : "{}";
  return import_ts_dedent3.dedent`
  ${previewImport}

  ${importStatement}

  const meta = preview.meta({
    component: ${importName},
  });

  export const ${data.exportedStoryName} = meta.story(${argsString});
  `;
}

// src/core-server/utils/new-story-templates/javascript.ts
var import_ts_dedent4 = __toESM(require_dist(), 1);
async function getJavaScriptTemplateForNewStoryFile(data) {
  let importName = data.componentIsDefaultExport ? await getComponentVariableName(data.basenameWithoutExtension) : data.componentExportName, importStatement = data.componentIsDefaultExport ? `import ${importName} from './${data.basenameWithoutExtension}';` : `import { ${importName} } from './${data.basenameWithoutExtension}';`, hasArgs = !!(data.args && Object.keys(data.args).length > 0), argsString = hasArgs ? `args: ${JSON.stringify(data.args, null, 2)},` : "", storyExport = hasArgs ? import_ts_dedent4.dedent`
      export const ${data.exportedStoryName} = {
        ${argsString}
      };
      ` : `export const ${data.exportedStoryName} = {};`;
  return import_ts_dedent4.dedent`
  ${importStatement}

  const meta = {
    component: ${importName},
  };

  export default meta;

  ${storyExport}
  `;
}

// src/core-server/utils/new-story-templates/typescript.ts
var import_ts_dedent5 = __toESM(require_dist(), 1);
async function getTypeScriptTemplateForNewStoryFile(data) {
  let importName = data.componentIsDefaultExport ? await getComponentVariableName(data.basenameWithoutExtension) : data.componentExportName, importStatement = data.componentIsDefaultExport ? `import ${importName} from './${data.basenameWithoutExtension}'` : `import { ${importName} } from './${data.basenameWithoutExtension}'`, hasArgs = !!(data.args && Object.keys(data.args).length > 0), argsString = hasArgs ? `args: ${JSON.stringify(data.args, null, 2)},` : "", storyExport = hasArgs ? import_ts_dedent5.dedent`
      export const ${data.exportedStoryName}: Story = {
        ${argsString}
      };
      ` : `export const ${data.exportedStoryName}: Story = {};`;
  return import_ts_dedent5.dedent`
  import type { Meta, StoryObj } from '${data.frameworkPackage}';

  ${importStatement};

  const meta = {
    component: ${importName},
  } satisfies Meta<typeof ${importName}>;

  export default meta;

  type Story = StoryObj<typeof meta>;

  ${storyExport}
  `;
}

// src/core-server/utils/safeString.ts
function escapeForTemplate(str) {
  return str.replace(/\\/g, "\\\\").replace(/(['"$`])/g, "\\$&").replace(/[\n\r]/g, "\\$&");
}

// src/core-server/utils/get-new-story-file.ts
async function getNewStoryFile({
  componentFilePath,
  componentExportName,
  componentIsDefaultExport,
  componentExportCount
}, options) {
  let frameworkPackageName = await getFrameworkName(options), sanitizedFrameworkPackageName = extractFrameworkPackageName(frameworkPackageName), base = basename2(componentFilePath), extension = extname2(componentFilePath), basenameWithoutExtension = escapeForTemplate(base.replace(extension, "")), dir = dirname2(componentFilePath), { storyFileName, isTypescript, storyFileExtension } = getStoryMetadata(componentFilePath), storyFileNameWithExtension = `${storyFileName}.${storyFileExtension}`, alternativeStoryFileNameWithExtension = `${basenameWithoutExtension}.${componentExportName}.stories.${storyFileExtension}`, exportedStoryName = "Default", useCsfFactory = !1, previewConfigPath;
  try {
    let previewConfig = findConfigFile("preview", options.configDir);
    if (previewConfig) {
      let previewContent = await readFile3(previewConfig, "utf-8");
      useCsfFactory = isCsfFactoryPreview(loadConfig(previewContent)), previewConfigPath = previewConfig;
    }
  } catch {
  }
  let args;
  try {
    let argTypes = await options.presets.apply("internal_getArgTypesData", null, {
      ...options,
      componentFilePath,
      componentExportName
    });
    if (logger6.debug(`Extracted argTypes for ${componentExportName}: ${JSON.stringify(argTypes)}`), argTypes) {
      let { required } = generateDummyArgsFromArgTypes(argTypes);
      Object.keys(required).length > 0 && (args = required, logger6.debug(
        `Generated dummy data using ArgTypes for ${componentExportName}: ${JSON.stringify(args)}`
      ));
    }
  } catch (error) {
    logger6.debug(`Could not generate dummy data for ${componentExportName}: ${error}`);
  }
  let storyFileContent = "";
  if (useCsfFactory) {
    let previewImportPath;
    if (previewConfigPath && !await checkForImportsMap(options.configDir)) {
      let storyFilePath2 = join3(getProjectRoot3(), dir), pathWithoutExt = relative2(storyFilePath2, previewConfigPath).replace(/\.(ts|js|mts|cts|tsx|jsx)$/, "");
      previewImportPath = escapeForTemplate(
        pathWithoutExt.startsWith(".") ? pathWithoutExt : `./${pathWithoutExt}`
      );
    }
    storyFileContent = await getCsfFactoryTemplateForNewStoryFile({
      basenameWithoutExtension,
      componentExportName,
      componentIsDefaultExport,
      exportedStoryName,
      previewImportPath,
      args
    });
  } else
    storyFileContent = isTypescript && frameworkPackageName ? await getTypeScriptTemplateForNewStoryFile({
      basenameWithoutExtension,
      componentExportName,
      componentIsDefaultExport,
      frameworkPackage: sanitizedFrameworkPackageName,
      exportedStoryName,
      args
    }) : await getJavaScriptTemplateForNewStoryFile({
      basenameWithoutExtension,
      componentExportName,
      componentIsDefaultExport,
      exportedStoryName,
      args
    });
  storyFileContent = replaceArgsPlaceholders(storyFileContent);
  let storyFilePath = doesStoryFileExist(join3(getProjectRoot3(), dir), storyFileName) && componentExportCount > 1 ? join3(getProjectRoot3(), dir, alternativeStoryFileNameWithExtension) : join3(getProjectRoot3(), dir, storyFileNameWithExtension), formattedStoryFileContent = await formatFileContent(storyFilePath, storyFileContent);
  return {
    storyFilePath,
    exportedStoryName,
    storyFileContent: formattedStoryFileContent,
    dirname: dir
  };
}
var getStoryMetadata = (componentFilePath) => {
  let isTypescript = /\.(ts|tsx|mts|cts)$/.test(componentFilePath), base = basename2(componentFilePath), extension = extname2(componentFilePath), basenameWithoutExtension = base.replace(extension, ""), storyFileExtension = isTypescript ? "tsx" : "jsx";
  return {
    storyFileName: `${basenameWithoutExtension}.stories`,
    storyFileExtension,
    isTypescript
  };
}, doesStoryFileExist = (parentFolder, storyFileName) => existsSync2(join3(parentFolder, `${storyFileName}.ts`)) || existsSync2(join3(parentFolder, `${storyFileName}.tsx`)) || existsSync2(join3(parentFolder, `${storyFileName}.js`)) || existsSync2(join3(parentFolder, `${storyFileName}.jsx`));
async function checkForImportsMap(configDir) {
  try {
    for (let directory of up(configDir, { last: getProjectRoot3() })) {
      let packageJsonPath = join3(directory, "package.json");
      if (existsSync2(packageJsonPath)) {
        let packageJsonContent = await readFile3(packageJsonPath, "utf-8");
        if (JSON.parse(packageJsonContent).imports)
          return !0;
      }
    }
    return !1;
  } catch {
    return !1;
  }
}
function replaceArgsPlaceholders(storyFileContent) {
  if (!storyFileContent.includes(STORYBOOK_FN_PLACEHOLDER))
    return storyFileContent;
  let storyFile = loadConfig(storyFileContent).parse(), needsFnImport = !1;
  return traverse(storyFile._ast, {
    StringLiteral(path) {
      path.node.value === STORYBOOK_FN_PLACEHOLDER && (needsFnImport = !0, path.replaceWith(t.callExpression(t.identifier("fn"), [])));
    }
  }), needsFnImport && storyFile.setImport(["fn"], "storybook/test"), printConfig(storyFile).code;
}

// src/core-server/utils/generate-story.ts
async function generateStoryFile(payload, options, generateOptions = {}) {
  let { checkFileExists = !0 } = generateOptions;
  try {
    let { storyFilePath, exportedStoryName, storyFileContent } = await getNewStoryFile(
      payload,
      options
    ), relativeStoryFilePath = relative3(getProjectRoot4(), storyFilePath), { storyId, kind } = await getStoryId({ storyFilePath, exportedStoryName }, options);
    return checkFileExists && existsSync3(storyFilePath) ? {
      success: !1,
      kind,
      storyFilePath: relativeStoryFilePath,
      error: `A story file already exists at ${relativeStoryFilePath}`,
      errorType: "STORY_FILE_EXISTS"
    } : (await writeFile2(storyFilePath, storyFileContent, "utf-8"), {
      success: !0,
      storyId,
      kind,
      storyFilePath: relativeStoryFilePath,
      exportedStoryName
    });
  } catch (e) {
    return {
      success: !1,
      error: e?.message || "Unknown error occurred",
      errorType: "UNKNOWN"
    };
  }
}

// src/shared/test-provider-store/index.ts
var UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS = {
  id: "storybook/test-provider",
  leader: !0,
  initialState: {}
};
function createTestProviderStore({
  universalTestProviderStore: universalTestProviderStore2,
  useUniversalStore
}) {
  let baseStore = {
    settingsChanged: () => {
      universalTestProviderStore2.untilReady().then(() => {
        universalTestProviderStore2.send({ type: "settings-changed" });
      });
    },
    onRunAll: (listener) => universalTestProviderStore2.subscribe("run-all", listener),
    onClearAll: (listener) => universalTestProviderStore2.subscribe("clear-all", listener)
  }, fullTestProviderStore2 = {
    ...baseStore,
    getFullState: universalTestProviderStore2.getState,
    setFullState: universalTestProviderStore2.setState,
    onSettingsChanged: (listener) => universalTestProviderStore2.subscribe("settings-changed", listener),
    runAll: async () => {
      await universalTestProviderStore2.untilReady(), universalTestProviderStore2.send({ type: "run-all" });
    },
    clearAll: async () => {
      await universalTestProviderStore2.untilReady(), universalTestProviderStore2.send({ type: "clear-all" });
    }
  }, getTestProviderStoreById2 = (testProviderId) => {
    let getStateForTestProvider = () => universalTestProviderStore2.getState()[testProviderId] ?? "test-provider-state:pending", setStateForTestProvider = (state) => {
      universalTestProviderStore2.untilReady().then(() => {
        universalTestProviderStore2.setState((currentState) => ({
          ...currentState,
          [testProviderId]: state
        }));
      });
    };
    return {
      ...baseStore,
      testProviderId,
      getState: getStateForTestProvider,
      setState: setStateForTestProvider,
      runWithState: async (callback) => {
        setStateForTestProvider("test-provider-state:running");
        try {
          await callback(), setStateForTestProvider("test-provider-state:succeeded");
        } catch {
          setStateForTestProvider("test-provider-state:crashed");
        }
      }
    };
  };
  return useUniversalStore ? {
    getTestProviderStoreById: getTestProviderStoreById2,
    fullTestProviderStore: fullTestProviderStore2,
    universalTestProviderStore: universalTestProviderStore2,
    useTestProviderStore: (selector) => useUniversalStore(universalTestProviderStore2, selector)[0]
  } : {
    getTestProviderStoreById: getTestProviderStoreById2,
    fullTestProviderStore: fullTestProviderStore2,
    universalTestProviderStore: universalTestProviderStore2
  };
}

// src/core-server/stores/test-provider.ts
var testProviderStore = createTestProviderStore({
  universalTestProviderStore: UniversalStore.create({
    ...UNIVERSAL_TEST_PROVIDER_STORE_OPTIONS,
    /*
            This is a temporary workaround, to ensure that the store is not created in the
            vitest sub-process in addon-vitest, even though it imports from core-server
            If it was created in the sub-process, it would try to connect to the leader in the dev server
            before it was ready.
            This will be fixed when we do the planned UniversalStore v0.2.
          */
    leader: !optionalEnvToBoolean(process.env.VITEST_CHILD_PROCESS)
  })
}), { fullTestProviderStore, getTestProviderStoreById, universalTestProviderStore } = testProviderStore;

// src/core-server/utils/ghost-stories/get-candidates.ts
import { readFile as readFile4 } from "node:fs/promises";
import { babelParse, traverse as traverse2 } from "storybook/internal/babel";

// src/core-server/utils/ghost-stories/component-analyzer.ts
var COMPLEXITY_CONFIG = {
  /** Weight applied to non-empty lines */
  locWeight: 1,
  /** Imports can be cheap, so they get a lower weight */
  importWeight: 0.5,
  /**
   * Defines what raw complexity value should map to the upper bound of a "simple" file For instance
   * 30 LOC + 4 imports = 32. This would result in a score of 0.3
   */
  simpleBaseline: 32,
  simpleScore: 0.3
}, getComponentComplexity = (fileContent) => {
  let lines = fileContent.split(`
`), nonEmptyLines = lines.filter((line) => line.trim() !== "").length, importCount = lines.filter((line) => line.trim().startsWith("import")).length, normalizedScore = (nonEmptyLines * COMPLEXITY_CONFIG.locWeight + importCount * COMPLEXITY_CONFIG.importWeight) / (COMPLEXITY_CONFIG.simpleBaseline / COMPLEXITY_CONFIG.simpleScore);
  return Math.min(normalizedScore, 1);
};

// src/core-server/utils/ghost-stories/get-candidates.ts
function isValidCandidate(source) {
  let ast = babelParse(source), hasJSX = !1, hasExport = !1;
  return traverse2(ast, {
    JSXElement(path) {
      hasJSX = !0, hasExport && path.stop();
    },
    JSXFragment(path) {
      hasJSX = !0, hasExport && path.stop();
    },
    ExportNamedDeclaration(path) {
      hasExport = !0, hasJSX && path.stop();
    },
    ExportDefaultDeclaration(path) {
      hasExport = !0, hasJSX && path.stop();
    },
    ExportAllDeclaration(path) {
      hasExport = !0, hasJSX && path.stop();
    }
  }), hasJSX && hasExport;
}
async function getCandidatesForStorybook(files2, sampleCount) {
  let simpleCandidates = [], analyzedCandidates = [];
  for (let file of files2) {
    let source;
    try {
      if (source = await readFile4(file, "utf-8"), !isValidCandidate(source))
        continue;
    } catch {
      continue;
    }
    let complexity = getComponentComplexity(source);
    if (analyzedCandidates.push({ file, complexity }), complexity < 0.3 && (simpleCandidates.push({ file, complexity }), simpleCandidates.length >= sampleCount))
      break;
  }
  let selectedCandidates = [];
  simpleCandidates.length >= sampleCount ? selectedCandidates = simpleCandidates.sort((a, b) => a.complexity - b.complexity).slice(0, sampleCount) : selectedCandidates = analyzedCandidates.sort((a, b) => a.complexity - b.complexity).slice(0, sampleCount);
  let avgComplexity = selectedCandidates.length > 0 ? Number(
    (selectedCandidates.reduce((acc, curr) => acc + curr.complexity, 0) / selectedCandidates.length).toFixed(2)
  ) : 0;
  return {
    candidates: selectedCandidates.map(({ file }) => file),
    analyzedCount: analyzedCandidates.length,
    avgComplexity
  };
}
async function getComponentCandidates({
  sampleSize = 20,
  globPattern = "**/*.{tsx,jsx}",
  cwd = process.cwd()
} = {}) {
  let globMatchCount = 0;
  try {
    let files2 = [];
    if (files2 = await glob(globPattern, {
      cwd,
      absolute: !0,
      ignore: [
        "**/node_modules/**",
        "**/.git/**",
        "**/dist/**",
        "**/__mocks__/**",
        "**/build/**",
        "**/storybook-static/**",
        "**/*.test.*",
        "**/*.d.*",
        "**/*.config.*",
        "**/*.spec.*",
        "**/*.stories.*",
        // skip example story files that come from the CLI
        "**/stories/{Button,Header,Page}.*",
        "**/stories/{button,header,page}.*"
      ]
    }), globMatchCount = files2.length, globMatchCount === 0)
      return {
        candidates: [],
        globMatchCount
      };
    let { analyzedCount, avgComplexity, candidates } = await getCandidatesForStorybook(
      files2,
      sampleSize
    );
    return {
      analyzedCount,
      avgComplexity,
      candidates,
      globMatchCount
    };
  } catch {
    return {
      candidates: [],
      error: "Failed to find candidates",
      globMatchCount
    };
  }
}

// src/shared/utils/categorize-render-errors.ts
var ERROR_CATEGORIES = {
  MISSING_PROVIDER: "MISSING_PROVIDER",
  MISSING_STATE_PROVIDER: "MISSING_STATE_PROVIDER",
  MISSING_ROUTER_PROVIDER: "MISSING_ROUTER_PROVIDER",
  MISSING_THEME_PROVIDER: "MISSING_THEME_PROVIDER",
  MISSING_TRANSLATION_PROVIDER: "MISSING_TRANSLATION_PROVIDER",
  MISSING_PORTAL_ROOT: "MISSING_PORTAL_ROOT",
  HOOK_USAGE_ERROR: "HOOK_USAGE_ERROR",
  MODULE_IMPORT_ERROR: "MODULE_IMPORT_ERROR",
  COMPONENT_RENDER_ERROR: "COMPONENT_RENDER_ERROR",
  SERVER_COMPONENTS_ERROR: "SERVER_COMPONENTS_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  // Vite related errors
  DYNAMIC_MODULE_IMPORT_ERROR: "DYNAMIC_MODULE_IMPORT_ERROR",
  // Vitest test run related errors
  TEST_FILE_IMPORT_ERROR: "TEST_FILE_IMPORT_ERROR"
};
function buildErrorContext(message, stack) {
  let normalizedMessage = message.toLowerCase(), normalizedStack = (stack ?? "").toLowerCase(), stackDeps = /* @__PURE__ */ new Set(), stackLines = normalizedStack.split(`
`).filter(Boolean);
  for (let line of stackLines) {
    let depMatch = line.match(/\/deps\/([^:]+)\.js/);
    depMatch && stackDeps.add(depMatch[1]);
  }
  return {
    message,
    stack,
    normalizedMessage,
    normalizedStack,
    stackDeps
  };
}
var CATEGORIZATION_RULES = [
  {
    category: ERROR_CATEGORIES.MODULE_IMPORT_ERROR,
    priority: 100,
    match: (ctx) => ctx.normalizedMessage.includes("cannot find module") || ctx.normalizedMessage.includes("module not found") || ctx.normalizedMessage.includes("cannot resolve module")
  },
  {
    category: ERROR_CATEGORIES.TEST_FILE_IMPORT_ERROR,
    priority: 95,
    match: (ctx) => ctx.normalizedMessage.includes("failed to import test file")
  },
  {
    category: ERROR_CATEGORIES.DYNAMIC_MODULE_IMPORT_ERROR,
    priority: 95,
    match: (ctx) => ctx.normalizedMessage.includes("failed to fetch dynamically imported module")
  },
  {
    category: ERROR_CATEGORIES.HOOK_USAGE_ERROR,
    priority: 90,
    match: (ctx) => ctx.normalizedMessage.includes("invalid hook call") || ctx.normalizedMessage.includes("rendered more hooks") || ctx.normalizedMessage.includes("hooks can only be called") || ctx.normalizedMessage.includes("too many re-renders") || ctx.normalizedMessage.includes("maximum update depth exceeded") || ctx.normalizedMessage.includes("hook") && ctx.normalizedMessage.includes("function component")
  },
  {
    category: ERROR_CATEGORIES.MISSING_STATE_PROVIDER,
    priority: 85,
    match: (ctx) => Array.from(ctx.stackDeps).some(isStateManagementPackage) && (ctx.normalizedMessage.includes("context") || ctx.normalizedMessage.includes("undefined") || ctx.normalizedMessage.includes("null"))
  },
  {
    category: ERROR_CATEGORIES.MISSING_ROUTER_PROVIDER,
    priority: 85,
    match: (ctx) => Array.from(ctx.stackDeps).some(isRouterPackage) || ctx.normalizedMessage.includes("usenavigate") || ctx.normalizedMessage.includes("router")
  },
  {
    category: ERROR_CATEGORIES.SERVER_COMPONENTS_ERROR,
    priority: 85,
    match: (ctx) => ctx.normalizedMessage.includes("server components") || ctx.normalizedMessage.includes("use client") || ctx.normalizedMessage.includes("async/await") && ctx.normalizedMessage.includes("not supported")
  },
  {
    category: ERROR_CATEGORIES.MISSING_THEME_PROVIDER,
    priority: 80,
    match: (ctx) => Array.from(ctx.stackDeps).some(isStylingPackage) && (ctx.normalizedMessage.includes("theme") || ctx.normalizedMessage.includes("undefined")) || ctx.normalizedMessage.includes("usetheme") || ctx.normalizedMessage.includes("theme") && ctx.normalizedMessage.includes("provider")
  },
  {
    category: ERROR_CATEGORIES.MISSING_TRANSLATION_PROVIDER,
    priority: 80,
    match: (ctx) => Array.from(ctx.stackDeps).some(isI18nPackage) || ctx.normalizedMessage.includes("i18n") || ctx.normalizedMessage.includes("translation") || ctx.normalizedMessage.includes("locale")
  },
  {
    category: ERROR_CATEGORIES.MISSING_PORTAL_ROOT,
    priority: 70,
    match: (ctx) => ctx.normalizedMessage.includes("target container is not a dom element") || ctx.normalizedMessage.includes("portal") && (ctx.normalizedMessage.includes("container") || ctx.normalizedMessage.includes("root"))
  },
  {
    category: ERROR_CATEGORIES.MISSING_PROVIDER,
    priority: 60,
    match: (ctx) => ctx.normalizedMessage.includes("use") && ctx.normalizedMessage.includes("provider") || ctx.normalizedMessage.includes("<provider>") || ctx.normalizedMessage.includes("no provider") || ctx.normalizedMessage.includes("without a provider") || (ctx.normalizedMessage.includes("could not find") || ctx.normalizedMessage.includes("missing") || ctx.normalizedMessage.includes("not found")) && ctx.normalizedMessage.includes("context") || ctx.normalizedMessage.includes("context") && (ctx.normalizedMessage.includes("null") || ctx.normalizedMessage.includes("undefined"))
  },
  {
    category: ERROR_CATEGORIES.COMPONENT_RENDER_ERROR,
    priority: 10,
    match: (ctx) => ctx.normalizedMessage.includes("cannot read") || ctx.normalizedMessage.includes("is not a function") || ctx.normalizedMessage.includes("is not an object") || ctx.normalizedMessage.includes("is not defined") || ctx.normalizedMessage.includes("element type is invalid") || ctx.normalizedMessage.includes("objects are not valid as a react child") || ctx.normalizedMessage.includes("maximum call stack") || ctx.normalizedMessage.includes("render")
  }
], RULES = CATEGORIZATION_RULES.sort((a, b) => b.priority - a.priority);
function categorizeError(message, stack) {
  let ctx = buildErrorContext(message, stack), rule = RULES.find((r) => r.match(ctx));
  if (!rule)
    return { category: ERROR_CATEGORIES.UNKNOWN_ERROR, matchedDependencies: [] };
  let matchedDependencies = getMatchedDependencies(rule.category, ctx);
  return { category: rule.category, matchedDependencies };
}
function getMatchedDependencies(category, ctx) {
  switch (category) {
    case ERROR_CATEGORIES.MISSING_STATE_PROVIDER:
      return Array.from(ctx.stackDeps).filter(isStateManagementPackage);
    case ERROR_CATEGORIES.MISSING_ROUTER_PROVIDER:
      return Array.from(ctx.stackDeps).filter(isRouterPackage);
    case ERROR_CATEGORIES.MISSING_THEME_PROVIDER:
      return Array.from(ctx.stackDeps).filter(isStylingPackage);
    case ERROR_CATEGORIES.MISSING_TRANSLATION_PROVIDER:
      return Array.from(ctx.stackDeps).filter(isI18nPackage);
    default:
      return [];
  }
}

// src/shared/utils/analyze-test-results.ts
function extractCategorizedErrors(testResults) {
  let failed = testResults.filter((r) => r.status === "FAIL" && r.error), map = /* @__PURE__ */ new Map(), uniqueErrorMessages = /* @__PURE__ */ new Set();
  for (let r of failed) {
    let { category, matchedDependencies } = categorizeError(r.error, r.stack);
    map.has(category) || map.set(category, { count: 0, uniqueErrors: /* @__PURE__ */ new Set(), matchedDependencies: /* @__PURE__ */ new Set() });
    let data = map.get(category);
    data.count++, matchedDependencies.forEach((dep) => data.matchedDependencies.add(dep)), uniqueErrorMessages.add(r.error), data.uniqueErrors.add(r.error);
  }
  let categorizedErrors = Array.from(map.entries()).reduce(
    (acc, [category, data]) => (acc[category] = {
      uniqueCount: data.uniqueErrors.size,
      count: data.count,
      matchedDependencies: Array.from(data.matchedDependencies).sort()
    }, acc),
    {}
  );
  return {
    totalErrors: failed.length,
    uniqueErrorCount: uniqueErrorMessages.size,
    categorizedErrors
  };
}
var CSS_CHECK_STORY_ID_SUFFIX = "--css-check";
function summarizeResults(results) {
  let total = results.length, passed = results.filter((r) => r.status === "PASS").length, passedButEmptyRender = results.filter((r) => r.status === "PASS" && r.emptyRender).length, successRate = total > 0 ? parseFloat((passed / total).toFixed(2)) : 0, successRateWithoutEmptyRender = total > 0 ? parseFloat(((passed - passedButEmptyRender) / total).toFixed(2)) : 0, errorClassification = extractCategorizedErrors(results), cssCheckMatch = results.find(
    (r) => r.storyId.toLowerCase().endsWith(CSS_CHECK_STORY_ID_SUFFIX)
  ), cssCheck = cssCheckMatch?.status === "PASS" ? "pass" : cssCheckMatch?.status === "FAIL" ? "fail" : "not-run";
  return {
    total,
    passed,
    passedButEmptyRender,
    successRate,
    successRateWithoutEmptyRender,
    uniqueErrorCount: errorClassification.uniqueErrorCount,
    categorizedErrors: errorClassification.categorizedErrors,
    cssCheck
  };
}
function analyzeTestResults(results, cumulativeResults) {
  let run = summarizeResults(results), analysis = {
    total: run.total,
    passed: run.passed,
    passedButEmptyRender: run.passedButEmptyRender,
    successRate: run.successRate,
    successRateWithoutEmptyRender: run.successRateWithoutEmptyRender,
    uniqueErrorCount: run.uniqueErrorCount,
    categorizedErrors: run.categorizedErrors,
    cssCheck: run.cssCheck
  };
  if (cumulativeResults) {
    let cumulative = summarizeResults(cumulativeResults);
    analysis.cumulativeTotal = cumulative.total, analysis.cumulativePassed = cumulative.passed, analysis.cumulativePassedButEmptyRender = cumulative.passedButEmptyRender, analysis.cumulativeSuccessRate = cumulative.successRate, analysis.cumulativeSuccessRateWithoutEmptyRender = cumulative.successRateWithoutEmptyRender, analysis.cumulativeUniqueErrorCount = cumulative.uniqueErrorCount, analysis.cumulativeCategorizedErrors = cumulative.categorizedErrors, analysis.cumulativeCssCheck = cumulative.cssCheck;
  }
  return analysis;
}

// src/shared/utils/to-story-test-result.ts
var DEBUG_BANNER_RE = /^\n(?:\x1B\[\d+m)?Click to debug\b[^\n]*\n\n/;
function extractErrorMessage(message, stack) {
  return (message ?? "").replace(DEBUG_BANNER_RE, "").split(`
`)[0] || stack?.split(`
`)[0] || "unknown error";
}
function detectEmptyRender(reports) {
  return reports?.some(
    (report) => report.type === "render-analysis" && report.result?.emptyRender === !0
  ) ?? !1;
}
function normalizeStatus(statusRaw) {
  return statusRaw === "passed" ? "PASS" : statusRaw === "failed" ? "FAIL" : "PENDING";
}
function toStoryTestResult(input) {
  if (!input.storyId)
    return null;
  let status = normalizeStatus(input.statusRaw), emptyRender = status === "PASS" && detectEmptyRender(input.reports), error, stack;
  if (input.errors && input.errors.length > 0) {
    let firstError = input.errors[0];
    error = extractErrorMessage(firstError.message, firstError.stack), stack = firstError.stack ?? firstError.message;
  }
  return {
    storyId: input.storyId,
    status,
    error,
    stack,
    emptyRender: emptyRender || void 0
  };
}

// src/core-server/utils/ghost-stories/run-story-tests.ts
import { existsSync as existsSync4 } from "node:fs";
import { mkdir, readFile as readFile5 } from "node:fs/promises";
import { executeCommand, resolvePathInStorybookCache as resolvePathInStorybookCache2 } from "storybook/internal/common";

// src/core-server/utils/ghost-stories/parse-vitest-report.ts
function parseVitestResults(report) {
  let storyTestResults = [];
  for (let testSuite of report.testResults)
    for (let assertion of testSuite.assertionResults) {
      let result = toStoryTestResult({
        storyId: assertion.meta?.storyId ?? assertion.fullName,
        statusRaw: assertion.status,
        reports: assertion.meta?.reports,
        errors: assertion.failureMessages?.map((message) => ({ stack: message }))
      });
      result && storyTestResults.push(result);
    }
  return {
    summary: analyzeTestResults(storyTestResults)
  };
}

// src/core-server/utils/ghost-stories/run-story-tests.ts
async function runStoryTests(componentFilePaths, options) {
  let cwd = options?.cwd;
  try {
    let cacheDir2 = resolvePathInStorybookCache2("story-tests");
    await mkdir(cacheDir2, { recursive: !0 });
    let timestamp = Date.now(), outputFile = join(cacheDir2, `test-results-${timestamp}.json`), startTime = Date.now(), testFailureMessage;
    try {
      await executeCommand({
        command: "npx",
        args: [
          "vitest",
          "run",
          "--reporter=json",
          "--testTimeout=1000",
          `--outputFile=${outputFile}`,
          ...componentFilePaths
        ],
        cwd,
        stdio: "pipe",
        env: {
          STORYBOOK_INTERNAL_TEST_RUN: "1",
          ...options?.ghostRun ? { STORYBOOK_COMPONENT_PATHS: componentFilePaths.join(";") } : {}
        }
      });
    } catch (error) {
      let errorMessage = (error.stderr || String(error) || "").toLowerCase();
      errorMessage.includes("browsertype.launch") ? testFailureMessage = "Playwright is not installed" : errorMessage.includes("startup error") ? testFailureMessage = "Startup Error" : errorMessage.includes("no tests found") ? testFailureMessage = "No tests found" : errorMessage.includes("test timeout") ? testFailureMessage = "Test timeout" : errorMessage.includes("react-native-web") ? testFailureMessage = "React Native Web error" : errorMessage.includes("unhandled rejection") && (testFailureMessage = "Unhandled Rejection");
    }
    let duration = Date.now() - startTime;
    if (testFailureMessage)
      return {
        duration,
        runError: testFailureMessage
      };
    if (!existsSync4(outputFile))
      return {
        duration,
        runError: "JSON report not found"
      };
    let vitestReport;
    try {
      let resultsJson = await readFile5(outputFile, "utf8");
      vitestReport = JSON.parse(resultsJson);
    } catch {
      return {
        duration,
        runError: "Failed to read or parse JSON report"
      };
    }
    return !vitestReport.testResults || vitestReport.testResults.length === 0 ? {
      duration,
      runError: "No tests found"
    } : { ...parseVitestResults(vitestReport), duration };
  } catch {
    return {
      runError: "Uncaught error running story tests",
      duration: 0
    };
  }
}

// ../../node_modules/es-toolkit/dist/function/debounce.mjs
function debounce(func, debounceMs, { signal, edges } = {}) {
  let pendingThis, pendingArgs = null, leading = edges != null && edges.includes("leading"), trailing = edges == null || edges.includes("trailing"), invoke = () => {
    pendingArgs !== null && (func.apply(pendingThis, pendingArgs), pendingThis = void 0, pendingArgs = null);
  }, onTimerEnd = () => {
    trailing && invoke(), cancel();
  }, timeoutId = null, schedule = () => {
    timeoutId != null && clearTimeout(timeoutId), timeoutId = setTimeout(() => {
      timeoutId = null, onTimerEnd();
    }, debounceMs);
  }, cancelTimer = () => {
    timeoutId !== null && (clearTimeout(timeoutId), timeoutId = null);
  }, cancel = () => {
    cancelTimer(), pendingThis = void 0, pendingArgs = null;
  }, flush = () => {
    invoke();
  }, debounced = function(...args) {
    if (signal?.aborted)
      return;
    pendingThis = this, pendingArgs = args;
    let isFirstCall = timeoutId == null;
    schedule(), leading && isFirstCall && invoke();
  };
  return debounced.schedule = schedule, debounced.cancel = cancel, debounced.flush = flush, signal?.addEventListener("abort", cancel, { once: !0 }), debounced;
}

// ../../node_modules/es-toolkit/dist/function/throttle.mjs
function throttle(func, throttleMs, { signal, edges = ["leading", "trailing"] } = {}) {
  let pendingAt = null, debounced = debounce(function(...args) {
    pendingAt = Date.now(), func.apply(this, args);
  }, throttleMs, { signal, edges }), throttled = function(...args) {
    if (pendingAt == null && (pendingAt = Date.now()), Date.now() - pendingAt >= throttleMs) {
      pendingAt = Date.now(), func.apply(this, args), debounced.cancel(), debounced.schedule();
      return;
    }
    debounced.apply(this, args);
  };
  return throttled.cancel = debounced.cancel, throttled.flush = debounced.flush, throttled;
}

// ../../node_modules/es-toolkit/dist/function/partial.mjs
function partial(func, ...partialArgs) {
  return partialImpl(func, placeholderSymbol, ...partialArgs);
}
function partialImpl(func, placeholder, ...partialArgs) {
  let partialed = function(...providedArgs) {
    let providedArgsIndex = 0, substitutedArgs = partialArgs.slice().map((arg) => arg === placeholder ? providedArgs[providedArgsIndex++] : arg), remainingArgs = providedArgs.slice(providedArgsIndex);
    return func.apply(this, substitutedArgs.concat(remainingArgs));
  };
  return func.prototype && (partialed.prototype = Object.create(func.prototype)), partialed;
}
var placeholderSymbol = /* @__PURE__ */ Symbol("partial.placeholder");
partial.placeholder = placeholderSymbol;

// ../../node_modules/es-toolkit/dist/function/partialRight.mjs
function partialRight(func, ...partialArgs) {
  return partialRightImpl(func, placeholderSymbol2, ...partialArgs);
}
function partialRightImpl(func, placeholder, ...partialArgs) {
  let partialedRight = function(...providedArgs) {
    let placeholderLength = partialArgs.filter((arg) => arg === placeholder).length, rangeLength = Math.max(providedArgs.length - placeholderLength, 0), remainingArgs = providedArgs.slice(0, rangeLength), providedArgsIndex = rangeLength, substitutedArgs = partialArgs.slice().map((arg) => arg === placeholder ? providedArgs[providedArgsIndex++] : arg);
    return func.apply(this, remainingArgs.concat(substitutedArgs));
  };
  return func.prototype && (partialedRight.prototype = Object.create(func.prototype)), partialedRight;
}
var placeholderSymbol2 = /* @__PURE__ */ Symbol("partialRight.placeholder");
partialRight.placeholder = placeholderSymbol2;

// ../../node_modules/es-toolkit/dist/function/retry.mjs
var DEFAULT_RETRIES = Number.POSITIVE_INFINITY;

// src/shared/open-service/services/docgen/paths.ts
var DOCGEN_SERVICE_ID = "core/docgen";
function docgenQueryStaticPath(id) {
  return `${id}.json`;
}
function docgenStaticStorePath(id) {
  return `${DOCGEN_SERVICE_ID}/${docgenQueryStaticPath(id)}`;
}
function docgenPayloadJsonPointer(id) {
  return `/components/${id}`;
}
function docgenManifestRef(id) {
  return `../services/${docgenStaticStorePath(id)}#${docgenPayloadJsonPointer(id)}`;
}

// src/shared/open-service/services/story-docs/paths.ts
var STORY_DOCS_SERVICE_ID = "core/story-docs";
function storyDocsQueryStaticPath(id) {
  return `${id}.json`;
}
function storyDocsStaticStorePath(id) {
  return `${STORY_DOCS_SERVICE_ID}/${storyDocsQueryStaticPath(id)}`;
}
function storyDocsPayloadJsonPointer(id) {
  return `/components/${id}`;
}
function storyDocsManifestRef(id) {
  return `../services/${storyDocsStaticStorePath(id)}#${storyDocsPayloadJsonPointer(id)}`;
}

export {
  useStatics,
  parseStaticDir,
  mapStaticDir,
  debounce,
  throttle,
  docgenQueryStaticPath,
  docgenStaticStorePath,
  docgenManifestRef,
  storyDocsQueryStaticPath,
  storyDocsStaticStorePath,
  storyDocsManifestRef,
  UniversalStore,
  defineService,
  getStoryIdsByAbsolutePath,
  resolveChangeDetectionAdapter,
  registerModuleGraphService,
  getWsToken,
  getErrorLevel,
  sendTelemetryError,
  withTelemetry,
  getStoryMetadata,
  doesStoryFileExist,
  generateStoryFile,
  fullTestProviderStore,
  getTestProviderStoreById,
  universalTestProviderStore,
  getComponentCandidates,
  analyzeTestResults,
  toStoryTestResult,
  runStoryTests
};
