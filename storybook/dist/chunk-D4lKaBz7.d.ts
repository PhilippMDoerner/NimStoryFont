import { CleanupCallback } from "storybook/internal/csf";
import { Channel } from "storybook/internal/channels";
import { Args as Args$1, CSFFile, ComponentTitle, DecoratorApplicator, GlobalTypes, Globals as Globals$1, IndexEntry, ModuleExport, ModuleExports, ModuleImportFn, NormalizedComponentAnnotations, NormalizedProjectAnnotations, NormalizedStoryAnnotations, Path, PreparedMeta, PreparedStory, ProjectAnnotations as ProjectAnnotations$1, RenderContextCallbacks, RenderToCanvas, Renderer as Renderer$1, StoryContext as StoryContext$1, StoryContextForEnhancers, StoryId as StoryId$1, StoryIndex, StoryName, StoryRenderOptions } from "storybook/internal/types";

//#region code/core/.dts-emit/code/core/src/preview-api/modules/addons/hooks.d.ts
interface Hook {
  name: string;
  memoizedState?: any;
  deps?: any[] | undefined;
}
interface Effect {
  create: () => (() => void) | void;
  destroy?: (() => void) | void;
}
type AbstractFunction = (...args: any[]) => any;
declare class HooksContext<TRenderer extends Renderer$1, TArgs extends Args$1 = Args$1> {
  hookListsMap: WeakMap<AbstractFunction, Hook[]>;
  mountedDecorators: Set<AbstractFunction>;
  prevMountedDecorators: Set<AbstractFunction>;
  currentHooks: Hook[];
  nextHookIndex: number;
  currentPhase: 'MOUNT' | 'UPDATE' | 'NONE';
  currentEffects: Effect[];
  prevEffects: Effect[];
  currentDecoratorName: string | null;
  hasUpdates: boolean;
  currentContext: StoryContext$1<TRenderer, TArgs> | null;
  renderListener: (storyId: StoryId$1) => void;
  constructor();
  init(): void;
  clean(): void;
  getNextHook(): Hook;
  triggerEffects(): void;
  addRenderListeners(): void;
  removeRenderListeners(): void;
}
declare const applyHooks: <TRenderer extends Renderer$1>(applyDecorators: DecoratorApplicator<TRenderer>) => DecoratorApplicator<TRenderer>;
/**
 * Returns a memoized value.
 *
 * @example
 *
 * ```ts
 * const memoizedValue = useMemo(() => {
 *   return doExpensiveCalculation(a, b);
 * }, [a, b]);
 * ```
 *
 * @template T The type of the memoized value.
 * @param {() => T} nextCreate A function that returns the memoized value.
 * @param {any[]} [deps] An optional array of dependencies. If any of the dependencies change, the
 *   memoized value will be recomputed.
 * @returns {T} The memoized value.
 */
declare function useMemo<T>(nextCreate: () => T, deps?: any[]): T;
/**
 * Returns a memoized callback.
 *
 * @example
 *
 * ```ts
 * const memoizedCallback = useCallback(() => {
 *   doSomething(a, b);
 * }, [a, b]);
 * ```
 *
 * @template T The type of the callback function.
 * @param {T} callback The callback function to memoize.
 * @param {any[]} [deps] An optional array of dependencies. If any of the dependencies change, the
 *   memoized callback will be recomputed.
 * @returns {T} The memoized callback.
 */
declare function useCallback<T>(callback: T, deps?: any[]): T;
/**
 * Returns a mutable ref object.
 *
 * @example
 *
 * ```ts
 * const ref = useRef(0);
 * ref.current = 1;
 * ```
 *
 * @template T The type of the ref object.
 * @param {T} initialValue The initial value of the ref object.
 * @returns {{ current: T }} The mutable ref object.
 */
declare function useRef<T>(initialValue: T): {
  current: T;
};
/**
 * Returns a stateful value and a function to update it.
 *
 * @example
 *
 * ```ts
 * const [count, setCount] = useState(0);
 * setCount(count + 1);
 * ```
 *
 * @template S The type of the state.
 * @param {(() => S) | S} initialState The initial state value or a function that returns the
 *   initial state value.
 * @returns {[S, (update: ((prevState: S) => S) | S) => void]} An array containing the current state
 *   value and a function to update it.
 */
declare function useState<S>(initialState: (() => S) | S): [S, (update: ((prevState: S) => S) | S) => void];
/**
 * Given a file name, creates an object with utilities to manage a log file. It creates a temporary
 * log file which you can manage with the returned functions. You can then decide whether to move
 * the log file to the users project, or remove it.
 *
 * @example
 *
 * ```tsx
 *   const initialState = { count: 0 };
 *
 *   function reducer(state, action) {
 *     switch (action.type) {
 *       case 'increment':
 *         return { count: state.count + 1 };
 *       case 'decrement':
 *         return { count: state.count - 1 };
 *       default:
 *         throw new Error();
 *       }
 *     }
 *   }
 *   function Counter() {
 *     const [state, dispatch] = useReducer(reducer, initialState);
 *     return (
 *       <>
 *         Count: {state.count}
 *           <button onClick={() => dispatch({ type: 'increment' })}>+</button>
 *           <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
 *       </>
 *     );
 *   }
 * ```
 */
declare function useReducer<S, A>(reducer: (state: S, action: A) => S, initialState: S): [S, (action: A) => void];
declare function useReducer<S, I, A>(reducer: (state: S, action: A) => S, initialArg: I, init: (initialArg: I) => S): [S, (action: A) => void];
/**
 * Triggers a side effect, see https://reactjs.org/docs/hooks-reference.html#usestate Effects are
 * triggered synchronously after rendering the story
 *
 * @example
 *
 * ```ts
 * useEffect(() => {
 *   // Do something after rendering the story
 *   return () => {
 *     // Do something when the component unmounts or the effect is re-run
 *   };
 * }, [dependency1, dependency2]);
 * ```
 *
 * @param {() => (() => void) | void} create A function that creates the effect. It should return a
 *   cleanup function, or nothing.
 * @param {any[]} [deps] An optional array of dependencies. If any of the dependencies change, the
 *   effect will be re-run.
 * @returns {void}
 */
declare function useEffect(create: () => (() => void) | void, deps?: any[]): void;
interface Listener$1 {
  (...args: any[]): void;
}
interface EventMap {
  [eventId: string]: Listener$1;
}
/**
 * Subscribes to events emitted by the Storybook channel and returns a function to emit events.
 *
 * @example
 *
 * ```ts
 * // Subscribe to an event and emit it
 * const emit = useChannel({ 'my-event': (arg1, arg2) => console.log(arg1, arg2) });
 * emit('my-event', 'Hello', 'world!');
 * ```
 *
 * @param {EventMap} eventMap A map of event listeners to subscribe to.
 * @param {any[]} [deps=[]] An optional array of dependencies. If any of the dependencies change,
 *   the event listeners will be re-subscribed. Default is `[]`
 * @returns {(...args: any[]) => void} A function to emit events to the Storybook channel.
 */
declare function useChannel(eventMap: EventMap, deps?: any[]): (eventName: string, ...args: any) => void;
/**
 * Returns the current story context, including the story's ID, parameters, and other metadata.
 *
 * @example
 *
 * ```ts
 * const { id, parameters } = useStoryContext();
 * console.log(`Current story ID: ${id}`);
 * console.log(`Current story parameters: ${JSON.stringify(parameters)}`);
 * ```
 *
 * @template TRenderer The type of the story's renderer.
 * @template TArgs The type of the story's args.
 * @returns {StoryContext<TRenderer>} The current story context.
 */
declare function useStoryContext<TRenderer extends Renderer$1, TArgs extends Args$1 = Args$1>(): StoryContext$1<TRenderer>;
/**
 * Returns the value of a specific parameter for the current story, or a default value if the
 * parameter is not set.
 *
 * @example
 *
 * ```ts
 * // Retrieve the value of a parameter named "myParam"
 * const myParamValue = useParameter<string>('myParam', 'default value');
 * console.log(`The value of myParam is: ${myParamValue}`);
 * ```
 *
 * @template S The type of the parameter value.
 * @param {string} parameterKey The key of the parameter to retrieve.
 * @param {S} [defaultValue] An optional default value to return if the parameter is not set.
 * @returns {S | undefined} The value of the parameter, or the default value if the parameter is not
 *   set.
 */
declare function useParameter<S>(parameterKey: string, defaultValue?: S): S | undefined;
/**
 * Returns the current args for the story, and functions to update and reset them.
 *
 * @example
 *
 * ```ts
 * const [args, updateArgs, resetArgs] = useArgs<{ name: string; age: number }>();
 * console.log(`Current args: ${JSON.stringify(args)}`);
 * updateArgs({ name: 'John' });
 * resetArgs(['name']);
 * ```
 *
 * @template TArgs The type of the story's args.
 * @returns {[TArgs, (newArgs: Partial<TArgs>) => void, (argNames?: (keyof TArgs)[]) => void]} An
 *   array containing the current args, a function to update them, and a function to reset them.
 */
declare function useArgs<TArgs extends Args$1 = Args$1>(): [TArgs, (newArgs: Partial<TArgs>) => void, (argNames?: (keyof TArgs)[]) => void];
/**
 * Returns the current global args for the story, and a function to update them.
 *
 * @example
 *
 * ```ts
 * const [globals, updateGlobals] = useGlobals();
 * console.log(`Current globals: ${JSON.stringify(globals)}`);
 * updateGlobals({ theme: 'dark' });
 * ```
 *
 * @returns {[Args, (newGlobals: Args) => void]} An array containing the current global args, and a
 *   function to update them.
 */
declare function useGlobals(): [Args$1, (newGlobals: Args$1) => void];
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/ArgsStore.d.ts
declare class ArgsStore {
  initialArgsByStoryId: Record<StoryId$1, Args$1>;
  argsByStoryId: Record<StoryId$1, Args$1>;
  get(storyId: StoryId$1): Args$1;
  setInitial(story: PreparedStory<any>): void;
  updateFromDelta(story: PreparedStory<any>, delta: Args$1): void;
  updateFromPersisted(story: PreparedStory<any>, persisted: Args$1): void;
  update(storyId: StoryId$1, argsUpdate: Partial<Args$1>): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/GlobalsStore.d.ts
declare class GlobalsStore {
  allowedGlobalNames: Set<string>;
  initialGlobals: Globals$1;
  globals: Globals$1;
  constructor({
    globals,
    globalTypes
  }: {
    globals?: Globals$1;
    globalTypes?: GlobalTypes;
  });
  set({
    globals,
    globalTypes
  }: {
    globals?: Globals$1;
    globalTypes?: GlobalTypes;
  }): void;
  filterAllowedGlobals(globals: Globals$1): Globals$1;
  updateFromPersisted(persisted: Globals$1): void;
  get(): Globals$1;
  update(newGlobals: Globals$1): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/StoryIndexStore.d.ts
type StorySpecifier = StoryId$1 | {
  name: StoryName;
  title: ComponentTitle;
} | '*';
declare class StoryIndexStore {
  entries: StoryIndex['entries'];
  constructor({
    entries
  }?: StoryIndex);
  entryFromSpecifier(specifier: StorySpecifier): IndexEntry | undefined;
  storyIdToEntry(storyId: StoryId$1): IndexEntry;
  importPathToEntry(importPath: Path): IndexEntry;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/csf/processCSFFile.d.ts
declare function processCSFFile<TRenderer extends Renderer$1>(moduleExports: ModuleExports, importPath: Path, title: ComponentTitle): CSFFile<TRenderer>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/csf/prepareStory.d.ts
declare function prepareStory<TRenderer extends Renderer$1>(storyAnnotations: NormalizedStoryAnnotations<TRenderer>, componentAnnotations: NormalizedComponentAnnotations<TRenderer>, projectAnnotations: NormalizedProjectAnnotations<TRenderer>): PreparedStory<TRenderer>;
declare function prepareMeta<TRenderer extends Renderer$1>(componentAnnotations: NormalizedComponentAnnotations<TRenderer>, projectAnnotations: NormalizedProjectAnnotations<TRenderer>, moduleExport: ModuleExport): PreparedMeta<TRenderer>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/reporter-api.d.ts
interface Report<T = unknown> {
  type: string;
  version?: number;
  result: T;
  status: 'failed' | 'passed' | 'warning';
}
declare class ReporterAPI {
  reports: Report[];
  addReport(report: Report): Promise<void>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/StoryStore.d.ts
declare class StoryStore<TRenderer extends Renderer$1> {
  importFn: ModuleImportFn;
  storyIndex: StoryIndexStore;
  projectAnnotations: NormalizedProjectAnnotations<TRenderer>;
  userGlobals: GlobalsStore;
  args: ArgsStore;
  hooks: Record<StoryId$1, HooksContext<TRenderer>>;
  cleanupCallbacks: Record<StoryId$1, CleanupCallback[] | undefined>;
  cachedCSFFiles?: Record<Path, CSFFile<TRenderer>>;
  processCSFFileWithCache: typeof processCSFFile;
  prepareMetaWithCache: typeof prepareMeta;
  prepareStoryWithCache: typeof prepareStory;
  constructor(storyIndex: StoryIndex, importFn: ModuleImportFn, projectAnnotations: ProjectAnnotations$1<TRenderer>);
  setProjectAnnotations(projectAnnotations: ProjectAnnotations$1<TRenderer>): void;
  onStoriesChanged({
    importFn,
    storyIndex
  }: {
    importFn?: ModuleImportFn;
    storyIndex?: StoryIndex;
  }): Promise<void>;
  storyIdToEntry(storyId: StoryId$1): Promise<IndexEntry>;
  loadCSFFileByStoryId(storyId: StoryId$1): Promise<CSFFile<TRenderer>>;
  loadAllCSFFiles(): Promise<StoryStore<TRenderer>['cachedCSFFiles']>;
  cacheAllCSFFiles(): Promise<void>;
  preparedMetaFromCSFFile({
    csfFile
  }: {
    csfFile: CSFFile<TRenderer>;
  }): PreparedMeta<TRenderer>;
  loadStory({
    storyId
  }: {
    storyId: StoryId$1;
  }): Promise<PreparedStory<TRenderer>>;
  storyFromCSFFile({
    storyId,
    csfFile
  }: {
    storyId: StoryId$1;
    csfFile: CSFFile<TRenderer>;
  }): PreparedStory<TRenderer>;
  componentStoriesFromCSFFile({
    csfFile
  }: {
    csfFile: CSFFile<TRenderer>;
  }): PreparedStory<TRenderer>[];
  loadEntry(id: StoryId$1): Promise<{
    entryExports: ModuleExports;
    csfFiles: CSFFile<TRenderer>[];
  }>;
  getStoryContext(story: PreparedStory<TRenderer>, {
    forceInitialArgs
  }?: {
    forceInitialArgs?: boolean | undefined;
  }): {
    args: import("@storybook/react").Args;
    initialGlobals: import("storybook/internal/csf").Globals;
    globalTypes: import("storybook/internal/csf").GlobalTypes | undefined;
    userGlobals: import("storybook/internal/csf").Globals;
    reporting: ReporterAPI;
    globals: {
      [x: string]: any;
    };
    hooks: unknown;
    componentId: import("storybook/internal/csf").ComponentId;
    title: import("storybook/internal/csf").ComponentTitle;
    kind: import("storybook/internal/csf").ComponentTitle;
    id: StoryId$1;
    name: import("storybook/internal/csf").StoryName;
    story: import("storybook/internal/csf").StoryName;
    tags: import("storybook/internal/csf").Tag[];
    component?: (TRenderer & {
      T: any;
    })["component"] | undefined;
    subcomponents?: Record<string, (TRenderer & {
      T: any;
    })["component"]> | undefined;
    parameters: import("@storybook/react").Parameters;
    initialArgs: import("@storybook/react").Args;
    argTypes: import("storybook/internal/csf").StrictArgTypes<import("@storybook/react").Args>;
    moduleExport: import("storybook/internal/types").ModuleExport;
    originalStoryFn: import("storybook/internal/csf").ArgsStoryFn<TRenderer>;
    undecoratedStoryFn: import("storybook/internal/csf").LegacyStoryFn<TRenderer>;
    unboundStoryFn: import("storybook/internal/csf").LegacyStoryFn<TRenderer>;
    applyLoaders: (context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => Promise<import("storybook/internal/csf").StoryContext<TRenderer>['loaded']>;
    applyBeforeEach: (context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => Promise<CleanupCallback[]>;
    applyAfterEach: (context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => Promise<void>;
    playFunction?: ((context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => Promise<void> | void) | undefined;
    runStep: import("storybook/internal/csf").StepRunner<TRenderer>;
    mount: (context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => () => Promise<import("storybook/internal/csf").Canvas>;
    testingLibraryRender?: (...args: never[]) => unknown;
    renderToCanvas?: import("storybook/internal/types").RenderToCanvas<TRenderer> | undefined;
    usesMount: boolean;
    storyGlobals: import("storybook/internal/csf").Globals;
  } & Pick<import("storybook/internal/csf").StoryContextForLoaders<Renderer$1, import("@storybook/react").Args>, "allArgs" | "argsByTarget" | "unmappedArgs">;
  addCleanupCallbacks(story: PreparedStory<TRenderer>, ...callbacks: CleanupCallback[]): void;
  cleanupStory(story: PreparedStory<TRenderer>): Promise<void>;
  extract(options?: {
    includeDocsOnly?: boolean;
  }): Record<StoryId$1, StoryContextForEnhancers<TRenderer>>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/render/Render.d.ts
type RenderType = 'story' | 'docs';
/**
 * A "Render" represents the rendering of a single entry to a single location
 *
 * The implementations of render are used for two key purposes:
 *
 * - Tracking the state of the rendering as it moves between preparing, rendering and tearing down.
 * - Tracking what is rendered to know if a change requires re-rendering or teardown + recreation.
 */
interface Render<TRenderer extends Renderer$1> {
  renderId: number;
  type: RenderType;
  id: StoryId$1;
  isPreparing: () => boolean;
  isEqual: (other: Render<TRenderer>) => boolean;
  disableKeyListeners: boolean;
  teardown?: (options: {
    viewModeChanged: boolean;
  }) => Promise<void>;
  torndown: boolean;
  renderToElement: (canvasElement: TRenderer['canvasElement'], renderStoryToElement?: any, options?: StoryRenderOptions) => Promise<void>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/render/StoryRender.d.ts
type RenderPhase = 'preparing' | 'loading' | 'beforeEach' | 'rendering' | 'playing' | 'played' | 'completing' | 'completed' | 'afterEach' | 'finished' | 'aborted' | 'errored';
declare class StoryRender<TRenderer extends Renderer$1> implements Render<TRenderer> {
  channel: Channel;
  store: StoryStore<TRenderer>;
  private renderToScreen;
  private callbacks;
  id: StoryId$1;
  viewMode: StoryContext$1<TRenderer>['viewMode'];
  renderOptions: StoryRenderOptions;
  readonly renderId: number;
  type: RenderType;
  story?: PreparedStory<TRenderer>;
  phase?: RenderPhase;
  private abortController;
  private canvasElement?;
  private notYetRendered;
  private rerenderEnqueued;
  disableKeyListeners: boolean;
  private teardownRender;
  torndown: boolean;
  constructor(channel: Channel, store: StoryStore<TRenderer>, renderToScreen: RenderToCanvas<TRenderer>, callbacks: RenderContextCallbacks<TRenderer> & {
    showStoryDuringRender?: () => void;
  }, id: StoryId$1, viewMode: StoryContext$1<TRenderer>['viewMode'], renderOptions?: StoryRenderOptions, story?: PreparedStory<TRenderer>);
  private runPhase;
  private checkIfAborted;
  prepare(): Promise<void>;
  isEqual(other: Render<TRenderer>): boolean;
  isPreparing(): boolean;
  isPending(): boolean;
  renderToElement(canvasElement: TRenderer['canvasElement']): Promise<void>;
  private storyContext;
  render({
    initial,
    forceRemount
  }?: {
    initial?: boolean;
    forceRemount?: boolean;
  }): Promise<void>;
  /**
   * Rerender the story. If the story is currently pending (loading/rendering), the rerender will be
   * enqueued, and will be executed after the current render is completed. Rerendering while playing
   * will not be enqueued, and will be executed immediately, to support rendering args changes while
   * playing.
   */
  rerender(): Promise<void>;
  remount(): Promise<void>;
  cancelRender(): void;
  cancelPlayFunction(): void;
  teardown(): Promise<void>;
}
//#endregion
export { useStoryContext as C, useState as S, useGlobals as _, StoryStore as a, useReducer as b, prepareMeta as c, HooksContext as d, applyHooks as f, useEffect as g, useChannel as h, RenderType as i, prepareStory as l, useCallback as m, StoryRender as n, Report as o, useArgs as p, Render as r, ReporterAPI as s, RenderPhase as t, StorySpecifier as u, useMemo as v, useRef as x, useParameter as y };