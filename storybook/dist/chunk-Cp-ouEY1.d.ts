import { a as RenderData } from "./chunk-BxCdsGId.js";
import { c as ThemeVars$1 } from "./chunk-By2eGsW5.js";
import { f as Channel$1 } from "./chunk-DgWlWC_3.js";
import { t as Options$3 } from "./chunk-CB2MeY3U.js";
import { Y as StrictArgTypes$3 } from "./chunk-CkNMGLRh.js";
import { a as StoryStore, i as RenderType, n as StoryRender, r as Render, s as ReporterAPI, u as StorySpecifier } from "./chunk-D4lKaBz7.js";
import { AfterEach, AnnotatedStoryFn, ArgTypes as ArgTypes$2, ArgTypesEnhancer, Args, Args as Args$2, ArgsEnhancer, ArgsFromMeta, ArgsStoryFn, BaseAnnotations, BeforeAll, BeforeEach, Canvas, CleanupCallback, CleanupCallback as CleanupCallback$1, ComponentAnnotations as ComponentAnnotations$1, ComponentId, ComponentTitle as ComponentTitle$1, Conditional, DecoratorApplicator as DecoratorApplicator$1, DecoratorFunction as DecoratorFunction$2, GlobalTypes as GlobalTypes$1, Globals, Globals as Globals$2, IncludeExcludeOptions, InputType, LegacyAnnotatedStoryFn, LegacyStoryAnnotationsOrFn as LegacyStoryAnnotationsOrFn$1, LegacyStoryFn as LegacyStoryFn$1, LoaderFunction, Meta, Parameters as Parameters$2, PartialStoryFn as PartialStoryFn$1, PlayFunction, PlayFunctionContext, ProjectAnnotations, ProjectAnnotations as BaseProjectAnnotations, Renderer, Renderer as Renderer$2, SBArrayType, SBEnumType, SBIntersectionType, SBObjectType, SBOtherType, SBScalarType, SBType as SBType$1, SBUnionType, SeparatorOptions, StepFunction, StepLabel, StepRunner as StepRunner$1, Story, StoryAnnotations as StoryAnnotations$1, StoryAnnotationsOrFn as StoryAnnotationsOrFn$1, StoryContext, StoryContext as StoryContext$2, StoryContextForEnhancers as StoryContextForEnhancers$1, StoryContextForLoaders, StoryContextUpdate as StoryContextUpdate$1, StoryFn, StoryId, StoryId as StoryId$2, StoryIdentifier, StoryKind, StoryName as StoryName$1, StrictArgTypes, StrictArgTypes as StrictArgTypes$2, StrictArgs, StrictInputType, Tag, Tag as Tag$2, TestFunction as TestFunction$1, ViewMode, toId } from "storybook/internal/csf";
import React$1, { Component, FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import { Channel, ChannelLike, Listener, Listener as Listener$2 } from "storybook/internal/channels";
import { NavigateOptions, RouterData } from "storybook/internal/router";
import { API_ComponentEntry as API_ComponentEntry$1, API_ComposedRef, API_ComposedRef as API_ComposedRef$2, API_ComposedRefUpdate, API_DocsEntry, API_DocsEntry as API_DocsEntry$2, API_FilterFunction, API_GroupEntry as API_GroupEntry$1, API_HashEntry, API_HashEntry as API_HashEntry$2, API_IframeRenderer, API_IndexHash, API_IndexHash as API_IndexHash$2, API_Layout, API_LayoutCustomisations, API_LeafEntry, API_LeafEntry as API_LeafEntry$2, API_LoadedRefData, API_Notification, API_OptionsData, API_PanelPositions, API_PreparedStoryIndex, API_Provider, API_ProviderData, API_Refs, API_Refs as API_Refs$2, API_RootEntry as API_RootEntry$1, API_SetRefData, API_Settings, API_StateMerger, API_StoryEntry, API_StoryEntry as API_StoryEntry$2, API_TestEntry, API_UI, API_UnknownEntries, API_Version, API_Versions, API_ViewMode, Addon_BaseType, Addon_Collection, Addon_Config, Addon_PageType, Addon_StorySortParameterV7, Addon_StoryWrapper, Addon_TestProviderType, Addon_Type as Addon_Type$1, Addon_Types, Addon_TypesEnum, Addon_TypesEnum as Addon_TypesEnum$2, Addon_TypesMapping, Addon_WrapperType, ArgTypes as ArgTypes$1, Args as Args$1, CSFFile, ComponentAnnotations, ComposeStoryFn, ComposedStoryFn, DecoratorFunction as DecoratorFunction$1, DocsContextProps, GlobalTypes, Globals as Globals$1, IndexEntry, LegacyStoryAnnotationsOrFn, LegacyStoryFn, ModuleExport, ModuleExports, ModuleImportFn, ModuleResolveConfig as ModuleResolveConfig$1, NamedOrDefaultProjectAnnotations, NormalizedComponentAnnotations, NormalizedProjectAnnotations, NormalizedStoriesSpecifier, NormalizedStoryAnnotations, Parameters as Parameters$1, PartialStoryFn, Path, PreparedStory, ProjectAnnotations as ProjectAnnotations$1, RenderContextCallbacks, RenderToCanvas, Renderer as Renderer$1, ResolvedModuleExportFromType, ResolvedModuleExportType, StatusValue, StepRunner, Store_CSFExports, StoryAnnotationsOrFn, StoryContext as StoryContext$1, StoryContextForEnhancers, StoryContextUpdate, StoryId as StoryId$1, StoryIndex, StoryName, StoryRenderOptions, StrictArgTypes as StrictArgTypes$1, Tag as Tag$1, TagsOptions, ViewMode as ViewMode$1 } from "storybook/internal/types";
import { ThemeVars } from "storybook/theming";
import { ArgTypesRequestPayload, OpenInEditorResponsePayload, RequestData, WhatsNewData } from "storybook/internal/core-events";
import { ImportEdge } from "storybook/internal/oxc-parser";
import { FileSystemCache } from "storybook/internal/common";
import { StoryIndexGenerator } from "storybook/internal/core-server";
import { CsfFile } from "storybook/internal/csf-tools";
import { LogLevel } from "storybook/internal/node-logger";
import { IncomingMessage, Server, ServerResponse } from "http";
import { Server as Server$1 } from "net";

//#region code/core/.dts-emit/code/core/src/channels/mock-channel.d.ts
/** In-process channel with no transport — the default for unit tests and manager story mocks. */
declare function mockChannel(): Channel$1;
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/lib/addons.d.ts
declare class AddonStore$1 {
  constructor();
  private loaders;
  private elements;
  private config;
  private channel;
  private promise;
  private resolve;
  getChannel: () => Channel;
  ready: () => Promise<Channel>;
  hasChannel: () => boolean;
  setChannel: (channel: Channel) => void;
  getElements<T extends Addon_Types | Addon_TypesEnum$2.experimental_PAGE | Addon_TypesEnum$2.experimental_TEST_PROVIDER>(type: T): Addon_Collection<Addon_TypesMapping[T]> | any;
  /**
   * Adds an addon to the addon store.
   *
   * @param {string} id - The id of the addon.
   * @param {Addon_Type} addon - The addon to add.
   * @returns {void}
   */
  add(id: string, addon: Addon_BaseType | Omit<Addon_TestProviderType, 'id'> | Omit<Addon_PageType, 'id'> | Omit<Addon_WrapperType, 'id'>): void;
  setConfig: (value: Addon_Config) => void;
  getConfig: () => Addon_Config;
  /**
   * Registers an addon loader function.
   *
   * @param {string} id - The id of the addon loader.
   * @param {(api: API) => void} callback - The function that will be called to register the addon.
   * @returns {void}
   */
  register: (id: string, callback: (api: API) => void) => void;
  loadAddons: (api: any) => void;
  experimental_getRegisteredAddons<T extends Addon_Types | Addon_TypesEnum$2.experimental_PAGE | Addon_TypesEnum$2.experimental_TEST_PROVIDER>(type?: T): string[];
}
declare const addons$1: AddonStore$1;
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/store.d.ts
type GetState = () => State;
type SetState = (a: any, b: any) => any;
interface Upstream {
  /**
   * Whether to allow persistence of state to local/sessionStorage. This is used to disable
   * persistence in Storybook's own tests. True by default.
   */
  allowPersistence?: boolean;
  getState: GetState;
  setState: SetState;
}
type Patch = Partial<State>;
type InputFnPatch = (s: State) => Patch;
type InputPatch = Patch | InputFnPatch;
type PersistenceHandler = (patch: Partial<State>, serialize: ((s: State) => Partial<Record<string, string | null | undefined>>) | undefined) => void | Promise<void>;
interface Options$2 {
  persistence: 'none' | 'session' | 'url' | string;
  serialize?: (s: State) => Partial<Record<string, string | null | undefined>>;
}
type CallBack = (s: State) => void;
declare class Store {
  upstreamPersistence: boolean;
  upstreamGetState: GetState;
  upstreamSetState: SetState;
  private persistenceHandlers;
  constructor({
    allowPersistence,
    setState,
    getState
  }: Upstream);
  registerPersistenceHandler(key: string, handler: PersistenceHandler): void;
  getInitialState(base: State): any;
  getState(): State;
  setState(inputPatch: InputPatch, options?: Options$2): Promise<State>;
  setState(inputPatch: InputPatch, callback?: CallBack, options?: Options$2): Promise<State>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/lib/types.d.ts
type ModuleFn<APIType = unknown, StateType = unknown> = (m: ModuleArgs, options?: any) => {
  init?: () => void | Promise<void>;
  api: APIType;
  state: StateType;
};
type ModuleArgs = RouterData & API_ProviderData<API> & {
  mode?: 'production' | 'development';
  state: State;
  fullAPI: API;
  store: Store;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/addons.d.ts
interface SubAPI$13 {
  /**
   * Returns a collection of elements of a specific type.
   *
   * @template T - The type of the elements in the collection.
   * @param {Addon_Types | Addon_TypesEnum.experimental_PAGE} type - The type of the elements to
   *   retrieve.
   * @returns {Addon_Collection<T>} - A collection of elements of the specified type.
   * @protected This is used internally in storybook's manager.
   */
  getElements: <T extends Addon_Types | Addon_TypesEnum.experimental_PAGE | Addon_TypesEnum.experimental_TEST_PROVIDER>(type: T) => Addon_Collection<Addon_TypesMapping[T]>;
  /**
   * Clears statuses for all registered test providers by calling each provider's `clear` function.
   */
  clearStatuses: () => void;
  /**
   * Returns the id of the currently selected panel.
   *
   * @returns {string} - The ID of the currently selected panel.
   */
  getSelectedPanel: () => string;
  /**
   * Sets the currently selected panel via it's ID.
   *
   * @param {string} panelName - The ID of the panel to select.
   * @returns {void}
   */
  setSelectedPanel: (panelName: string) => void;
  /**
   * Sets the state of an addon with the given ID.
   *
   * @deprecated This API might get dropped, if you are using this, please file an issue.
   * @template S - The type of the addon state.
   * @param {string} addonId - The ID of the addon to set the state for.
   * @param {S | API_StateMerger<S>} newStateOrMerger - The new state to set, or a function which
   *   receives the current state and returns the new state.
   * @param {Options} [options] - Optional options for the state update.
   * @returns {Promise<S>} - A promise that resolves with the new state after it has been set.
   */
  setAddonState<S>(addonId: string, newStateOrMerger: S | API_StateMerger<S>, options?: Options$2): Promise<S>;
  /**
   * Returns the state of an addon with the given ID.
   *
   * @deprecated This API might get dropped, if you are using this, please file an issue.
   * @template S - The type of the addon state.
   * @param {string} addonId - The ID of the addon to get the state for.
   * @returns {S} - The state of the addon with the given ID.
   */
  getAddonState<S>(addonId: string): S;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/channel.d.ts
interface SubAPI$12 {
  /**
   * Returns the channel object.
   *
   * @protected Please do not use, it's for internal use only.
   */
  getChannel: () => API_Provider<API>['channel'];
  /**
   * Adds a listener to the channel for the given event type. Returns a function that can be called
   * to remove the listener.
   *
   * @param type - The event type to listen for. If using a core event, import it from
   *   `storybook/internal/core-events`.
   * @param handler - The callback function to be called when the event is emitted.
   * @returns A function that can be called to remove the listener.
   */
  on: (type: string, handler: Listener) => () => void;
  /**
   * Removes a listener from the channel for the given event type.
   *
   * @param type - The event type to remove the listener from. If using a core event, import it from
   *   `storybook/internal/core-events`.
   * @param handler - The callback function to be removed.
   */
  off: (type: string, handler: Listener) => void;
  /**
   * Emits an event on the channel for the given event type.
   *
   * @param type - The event type to emit. If using a core event, import it from
   *   `storybook/internal/core-events`.
   * @param args - The arguments to pass to the event listener.
   */
  emit: (type: string, ...args: any[]) => void;
  /**
   * Adds a one-time listener to the channel for the given event type.
   *
   * @param type - The event type to listen for. If using a core event, import it from
   *   `storybook/internal/core-events`.
   * @param handler - The callback function to be called when the event is emitted.
   */
  once: (type: string, handler: Listener) => void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/globals.d.ts
interface SubState$9 {
  globals?: Globals$1;
  userGlobals?: Globals$1;
  storyGlobals?: Globals$1;
  globalTypes?: GlobalTypes;
}
interface SubAPI$11 {
  /**
   * Returns the current globals, which is the user globals overlaid with the story globals
   *
   * @returns {Globals} The current globals.
   */
  getGlobals: () => Globals$1;
  /**
   * Returns the current globals, as set by the user (a story may have override values)
   *
   * @returns {Globals} The current user globals.
   */
  getUserGlobals: () => Globals$1
  /**
  * /** Returns the current globals, as set by the story
  *
  * @returns {Globals} The current story globals.
  */
;
  getStoryGlobals: () => Globals$1
  /**
  * Returns the globalTypes, as defined at the project level.
  *
  * @returns {GlobalTypes} The globalTypes.
  */
;
  getGlobalTypes: () => GlobalTypes;
  /**
   * Updates the current globals with the provided new globals.
   *
   * @param {Globals} newGlobals - The new globals to update with.
   * @returns {void}
   */
  updateGlobals: (newGlobals: Globals$1) => void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/layout.d.ts
interface SubState$8 {
  layout: API_Layout;
  layoutCustomisations: API_LayoutCustomisations;
  ui: API_UI;
  selectedPanel: string | undefined;
  theme: ThemeVars;
}
/**
 * Availability of the sidebar/nav: 'unavailable' means the current route suppresses the nav
 * entirely (review routes), otherwise it is 'shown' or 'hidden' based on the layout state.
 */
type NavAvailability = 'shown' | 'hidden' | 'unavailable';
interface SubAPI$10 {
  /**
   * Toggles the fullscreen mode of the Storybook UI.
   *
   * @param toggled - Optional boolean value to set the fullscreen mode to. If not provided, it will
   *   toggle the current state.
   */
  toggleFullscreen: (toggled?: boolean) => void;
  /**
   * Toggles the visibility of the panel in the Storybook UI.
   *
   * @param toggled - Optional boolean value to set the panel visibility to. If not provided, it
   *   will toggle the current state.
   */
  togglePanel: (toggled?: boolean) => void;
  /**
   * Toggles the position of the panel in the Storybook UI.
   *
   * @param position - Optional string value to set the panel position to. If not provided, it will
   *   toggle between 'bottom' and 'right'.
   */
  togglePanelPosition: (position?: API_PanelPositions) => void;
  /**
   * Toggles the visibility of the navigation bar in the Storybook UI.
   *
   * @param toggled - Optional boolean value to set the navigation bar visibility to. If not
   *   provided, it will toggle the current state.
   */
  toggleNav: (toggled?: boolean) => void;
  /**
   * Toggles the visibility of the toolbar in the Storybook UI.
   *
   * @param toggled - Optional boolean value to set the toolbar visibility to. If not provided, it
   *   will toggle the current state.
   */
  toggleToolbar: (toggled?: boolean) => void;
  /**
   * Sets the options for the Storybook UI.
   *
   * @param options - An object containing the options to set.
   */
  setOptions: (options: any) => void;
  /** Sets the sizes of the resizable elements in the layout. */
  setSizes: (options: Partial<Pick<API_Layout, 'navSize' | 'bottomPanelHeight' | 'rightPanelWidth'>>) => void;
  /** GetIsFullscreen - Returns the current fullscreen mode of the Storybook UI. */
  getIsFullscreen: () => boolean;
  /** GetIsPanelShown - Returns the current visibility of the panel in the Storybook UI. */
  getIsPanelShown: () => boolean;
  /** GetIsNavShown - Returns the current visibility of the navigation bar in the Storybook UI. */
  getIsNavShown: () => boolean;
  /**
   * GetNavAvailability - Returns whether the sidebar/nav is shown, hidden (but can be shown by the
   * user), or unavailable because the current route suppresses it entirely (review routes).
   */
  getNavAvailability: () => NavAvailability;
  /**
   * GetShowToolbarWithCustomisations - Returns the current visibility of the toolbar, taking into
   * account customisations requested by the end user via a layoutCustomisations function.
   */
  getShowToolbarWithCustomisations: (showToolbar: boolean) => boolean;
  /**
   * GetShowPanelWithCustomisations - Returns the current visibility of the addon panel, taking into
   * account customisations requested by the end user via a layoutCustomisations function.
   */
  getShowPanelWithCustomisations: (showPanel: boolean) => boolean;
  /**
   * GetNavSizeWithCustomisations - Returns the size to apply to the sidebar/nav, taking into
   * account customisations requested by the end user via a layoutCustomisations function.
   */
  getNavSizeWithCustomisations: (navSize: number) => number;
  /**
   * Attempts to focus an element identified by its ID.
   *
   * @param elementId - The id of the element to focus.
   * @param options - Options for focusing the element.
   * @param options.forceFocus - Whether to make the element focusable even though it wasn't.
   * @param options.select - Whether to call select() on the element after focusing it.
   * @param options.poll - Whether to poll for the element if it is not immediately available.
   *   Defaults to true. When true, polls every 50ms for up to 500ms.
   * @returns Whether the element was successfully focused. Returns a Promise when polling.
   */
  focusOnUIElement: (elementId?: string, options?: boolean | {
    forceFocus?: boolean;
    select?: boolean;
    poll?: boolean;
  }) => boolean | Promise<boolean>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/notifications.d.ts
interface SubState$7 {
  notifications: API_Notification[];
}
/** The API for managing notifications. */
interface SubAPI$9 {
  /**
   * Adds a new notification to the list of notifications. If a notification with the same ID
   * already exists, it will be replaced.
   *
   * @param notification - The notification to add.
   */
  addNotification: (notification: API_Notification) => void;
  /**
   * Removes a notification from the list of notifications and calls the onClear callback.
   *
   * @param id - The ID of the notification to remove.
   */
  clearNotification: (id: string) => void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/open-in-editor.d.ts
/** The API for opening files in the editor. */
interface SubAPI$8 {
  /**
   * Opens the file in the editor. You can optionally provide a line and column number to open at a
   * more specific location.
   */
  openInEditor: (payload: {
    file: string;
    line?: number;
    column?: number;
  }) => Promise<OpenInEditorResponsePayload>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/provider.d.ts
interface SubAPI$7 {
  renderPreview?: API_IframeRenderer;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/refs.d.ts
interface SubState$6 {
  refs: API_Refs;
}
interface SubAPI$6 {
  /**
   * Finds a composed ref by its source.
   *
   * @param {string} source - The source/URL of the composed ref.
   * @returns {API_ComposedRef} - The composed ref object.
   */
  findRef: (source: string) => API_ComposedRef;
  /**
   * Sets a composed ref by its ID and data.
   *
   * @param {string} id - The ID of the composed ref.
   * @param {API_SetRefData} data - The data to set for the composed ref.
   * @param {boolean} [ready] - Whether the composed ref is ready.
   */
  setRef: (id: string, data: API_SetRefData, ready?: boolean) => void;
  /**
   * Updates a composed ref by its ID and update object.
   *
   * @param {string} id - The ID of the composed ref.
   * @param {API_ComposedRefUpdate} ref - The update object for the composed ref.
   */
  updateRef: (id: string, ref: API_ComposedRefUpdate) => Promise<void>;
  /**
   * Gets all composed refs.
   *
   * @returns {API_Refs} - The composed refs object.
   */
  getRefs: () => API_Refs;
  /**
   * Checks if a composed ref is valid.
   *
   * @param {API_SetRefData} ref - The composed ref to check.
   * @returns {Promise<void>} - A promise that resolves when the check is complete.
   */
  checkRef: (ref: API_SetRefData) => Promise<void>;
  /**
   * Changes the version of a composed ref by its ID and URL.
   *
   * @param {string} id - The ID of the composed ref.
   * @param {string} url - The new URL for the composed ref.
   */
  changeRefVersion: (id: string, url: string) => Promise<void>;
  /**
   * Changes the state of a composed ref by its ID and previewInitialized flag.
   *
   * @param {string} id - The ID of the composed ref.
   * @param {boolean} previewInitialized - The new previewInitialized flag for the composed ref.
   */
  changeRefState: (id: string, previewInitialized: boolean) => void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/settings.d.ts
interface SubAPI$5 {
  storeSelection: () => void;
  retrieveSelection: () => StoryId$1;
  /**
   * Changes the active settings tab.
   *
   * @example
   *
   * ```ts
   * changeSettingsTab(`about`);
   * ```
   *
   * @param path - The path of the settings page to navigate to. The path NOT should include the
   *   `/settings` prefix.
   */
  changeSettingsTab: (path: string) => void;
  /** Closes the settings screen and returns to the last tracked story or the first story. */
  closeSettings: () => void;
  /**
   * Checks if the settings screen is currently active.
   *
   * @returns A boolean indicating whether the settings screen is active.
   */
  isSettingsScreenActive: () => boolean;
}
interface SubState$5 {
  settings: API_Settings;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/lib/shortcut.d.ts
declare const controlOrMetaSymbol: () => "ctrl" | "⌘";
declare const controlOrMetaKey: () => "control" | "meta";
declare const optionOrAltSymbol: () => "alt" | "⌥";
declare const isShortcutTaken: (arr1: string[], arr2: string[]) => boolean;
type KeyboardEventLike = Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'key' | 'code' | 'keyCode' | 'preventDefault'>;
declare const eventToShortcut: (e: KeyboardEventLike) => (string | string[])[] | null;
declare const shortcutMatchesShortcut: (inputShortcut: (string | string[])[], shortcut: API_KeyCollection) => boolean;
declare const eventMatchesShortcut: (e: KeyboardEventLike, shortcut: API_KeyCollection) => boolean;
/**
 * Returns a human-readable symbol for a keyboard key.
 *
 * @param key The key to convert to a symbol.
 * @returns A string that a human could understand as that keyboard key.
 */
declare const keyToSymbol: (key: string) => string;
declare const shortcutToHumanString: (shortcut: API_KeyCollection) => string;
declare const shortcutToAriaKeyshortcuts: (shortcut: API_KeyCollection) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/shortcuts.d.ts
interface SubState$4 {
  shortcuts: API_Shortcuts;
}
interface SubAPI$4 {
  /** Returns the current shortcuts. */
  getShortcutKeys(): API_Shortcuts;
  /** Returns the default shortcuts. */
  getDefaultShortcuts(): API_Shortcuts | API_AddonShortcutDefaults;
  /** Returns the shortcuts for addons. */
  getAddonsShortcuts(): API_AddonShortcuts;
  /** Returns the labels for addon shortcuts. */
  getAddonsShortcutLabels(): API_AddonShortcutLabels;
  /** Returns the default shortcuts for addons. */
  getAddonsShortcutDefaults(): API_AddonShortcutDefaults;
  /**
   * Sets the shortcuts to the given value.
   *
   * @param shortcuts The new shortcuts to set.
   * @returns A promise that resolves to the new shortcuts.
   */
  setShortcuts(update: API_Shortcuts | ((shortcuts: API_Shortcuts) => API_Shortcuts)): Promise<API_Shortcuts>;
  /**
   * Sets the shortcut for the given action to the given value.
   *
   * @param action The action to set the shortcut for.
   * @param value The new shortcut to set.
   * @returns A promise that resolves to the new shortcut.
   */
  setShortcut(action: API_Action, value: API_KeyCollection): Promise<API_KeyCollection>;
  /**
   * Sets the shortcut for the given addon to the given value.
   *
   * @param addon The addon to set the shortcut for.
   * @param shortcut The new shortcut to set.
   * @returns A promise that resolves to the new addon shortcut.
   */
  setAddonShortcut(addon: string, shortcut: API_AddonShortcut): Promise<API_AddonShortcut>;
  /**
   * Restores all default shortcuts.
   *
   * @returns A promise that resolves to the new shortcuts.
   */
  restoreAllDefaultShortcuts(): Promise<API_Shortcuts>;
  /**
   * Restores the default shortcut for the given action.
   *
   * @param action The action to restore the default shortcut for.
   * @returns A promise that resolves to the new shortcut.
   */
  restoreDefaultShortcut(action: API_Action): Promise<API_KeyCollection>;
  /**
   * Handles a keydown event.
   *
   * @param event The event to handle.
   */
  handleKeydownEvent(event: KeyboardEventLike): void;
  /**
   * Handles a shortcut feature.
   *
   * @param feature The feature to handle.
   * @param event The event to handle.
   */
  handleShortcutFeature(feature: API_Action, event: KeyboardEventLike): void;
}
type API_KeyCollection = string[];
interface API_Shortcuts {
  fullScreen: API_KeyCollection;
  togglePanel: API_KeyCollection;
  panelPosition: API_KeyCollection;
  toggleNav: API_KeyCollection;
  toolbar: API_KeyCollection;
  search: API_KeyCollection;
  focusNav: API_KeyCollection;
  focusIframe: API_KeyCollection;
  focusPanel: API_KeyCollection;
  prevComponent: API_KeyCollection;
  nextComponent: API_KeyCollection;
  prevStory: API_KeyCollection;
  nextStory: API_KeyCollection;
  shortcutsPage: API_KeyCollection;
  aboutPage: API_KeyCollection;
  escape: API_KeyCollection;
  collapseAll: API_KeyCollection;
  expandAll: API_KeyCollection;
  remount: API_KeyCollection;
  openInEditor: API_KeyCollection;
  openInIsolation: API_KeyCollection;
  copyStoryLink: API_KeyCollection;
  goToPreviousLandmark: API_KeyCollection;
  goToNextLandmark: API_KeyCollection;
}
type API_Action = keyof API_Shortcuts;
interface API_AddonShortcut {
  label: string;
  defaultShortcut: API_KeyCollection;
  actionName: string;
  showInMenu?: boolean;
  action: (...args: any[]) => any;
}
type API_AddonShortcuts = Record<string, API_AddonShortcut>;
type API_AddonShortcutLabels = Record<string, string>;
type API_AddonShortcutDefaults = Record<string, API_KeyCollection>;
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/stories.d.ts
type Direction = -1 | 1;
type ParameterName = string;
type StoryUpdate = Partial<Pick<API_StoryEntry, 'prepared' | 'parameters' | 'initialArgs' | 'argTypes' | 'args'>>;
type DocsUpdate = Partial<Pick<API_DocsEntry, 'prepared' | 'parameters'>>;
interface SubState$3 extends API_LoadedRefData {
  storyId: StoryId$1;
  internal_index?: API_PreparedStoryIndex;
  viewMode: API_ViewMode;
  filters: Record<string, API_FilterFunction>;
  tagPresets: TagsOptions;
  defaultIncludedTagFilters: Tag$1[];
  defaultExcludedTagFilters: Tag$1[];
  includedTagFilters: Tag$1[];
  excludedTagFilters: Tag$1[];
  includedStatusFilters: StatusValue[];
  excludedStatusFilters: StatusValue[];
}
interface SubAPI$3 {
  /**
   * The `storyId` method is a reference to the `toId` function from `@storybook/csf`, which is used
   * to generate a unique ID for a story. This ID is used to identify a specific story in the
   * Storybook index.
   *
   * @type {typeof toId}
   */
  storyId: typeof toId;
  /**
   * Resolves a story, docs, component or group ID to its corresponding hash entry in the index.
   *
   * @param {StoryId} storyId - The ID of the story to resolve.
   * @param {string} [refsId] - The ID of the refs to use for resolving the story.
   * @returns {API_HashEntry} - The hash entry corresponding to the given story ID.
   */
  resolveStory: (storyId: StoryId$1, refsId?: string) => API_HashEntry | undefined;
  /**
   * Selects the first story to display in the Storybook UI.
   *
   * @returns {void}
   */
  selectFirstStory: () => void;
  /**
   * Selects a story to display in the Storybook UI.
   *
   * @param {string} [kindOrId] - The kind or ID of the story to select.
   * @param {StoryId} [story] - The ID of the story to select.
   * @param {Object} [obj] - An optional object containing additional options.
   * @param {string} [obj.ref] - The ref ID of the story to select.
   * @param {API_ViewMode} [obj.viewMode] - The view mode to display the story in.
   * @returns {void}
   */
  selectStory: (kindOrId?: string, story?: StoryId$1, obj?: {
    ref?: string;
    viewMode?: API_ViewMode;
  }) => void;
  /**
   * Returns the current story's data, including its ID, kind, name, and parameters.
   *
   * @returns {API_LeafEntry} The current story's data.
   */
  getCurrentStoryData: () => API_LeafEntry;
  /**
   * Returns the current story index.
   *
   * @returns {API_PreparedStoryIndex | undefined} The current story index, or undefined if not yet
   *   loaded.
   */
  getIndex: () => API_PreparedStoryIndex | undefined;
  /**
   * Sets the prepared story index to the given value.
   *
   * @param {API_PreparedStoryIndex} index - The prepared story index to set.
   * @returns {Promise<void>} A promise that resolves when the prepared story index has been set.
   */
  setIndex: (index: API_PreparedStoryIndex) => Promise<void>;
  /**
   * Jumps to the next or previous component in the index.
   *
   * @param {Direction} direction - The direction to jump. Use -1 to jump to the previous component,
   *   and 1 to jump to the next component.
   * @returns {void}
   */
  jumpToComponent: (direction: Direction) => void;
  /**
   * Jumps to the next or previous story in the story index.
   *
   * @param {Direction} direction - The direction to jump. Use -1 to jump to the previous story, and
   *   1 to jump to the next story.
   * @returns {void}
   */
  jumpToStory: (direction: Direction) => void;
  /**
   * Returns the data for the given story ID and optional ref ID.
   *
   * @param {StoryId} storyId - The ID of the story to retrieve data for.
   * @param {string} [refId] - The ID of the ref to retrieve data for. If not provided, retrieves
   *   data for the default ref.
   * @returns {API_LeafEntry} The data for the given story ID and optional ref ID.
   */
  getData: (storyId: StoryId$1, refId?: string) => API_LeafEntry;
  /**
   * Returns a boolean indicating whether the given story ID and optional ref ID have been prepared.
   *
   * @param {StoryId} storyId - The ID of the story to check.
   * @param {string} [refId] - The ID of the ref to check. If not provided, checks all refs for the
   *   given story ID.
   * @returns {boolean} A boolean indicating whether the given story ID and optional ref ID have
   *   been prepared.
   */
  isPrepared: (storyId: StoryId$1, refId?: string) => boolean;
  /**
   * Returns the parameters for the given story ID and optional ref ID.
   *
   * @param {StoryId | { storyId: StoryId; refId: string }} storyId - The ID of the story to
   *   retrieve parameters for, or an object containing the story ID and ref ID.
   * @param {ParameterName} [parameterName] - The name of the parameter to retrieve. If not
   *   provided, returns all parameters.
   * @returns {API_StoryEntry['parameters'] | any} The parameters for the given story ID and
   *   optional ref ID.
   */
  getParameters: (storyId: StoryId$1 | {
    storyId: StoryId$1;
    refId: string;
  }, parameterName?: ParameterName) => API_StoryEntry['parameters'] | any;
  /**
   * Returns the current value of the specified parameter for the currently selected story.
   *
   * @template S - The type of the parameter value.
   * @param {ParameterName} [parameterName] - The name of the parameter to retrieve. If not
   *   provided, returns all parameters.
   * @returns {S} The value of the specified parameter for the currently selected story.
   */
  getCurrentParameter<S>(parameterName?: ParameterName): S;
  /**
   * Updates the arguments for the given story with the provided new arguments.
   *
   * @param {API_StoryEntry | API_TestEntry} story - The story to update the arguments for.
   * @param {Args} newArgs - The new arguments to set for the story.
   * @returns {void}
   */
  updateStoryArgs(story: API_StoryEntry | API_TestEntry, newArgs: Args$1): void;
  /**
   * Resets the arguments for the given story to their initial values.
   *
   * @param {API_StoryEntry | API_TestEntry} story - The story to reset the arguments for.
   * @param {string[]} [argNames] - An optional array of argument names to reset. If not provided,
   *   all arguments will be reset.
   * @returns {void}
   */
  resetStoryArgs: (story: API_StoryEntry | API_TestEntry, argNames?: string[]) => void;
  /**
   * Finds the leaf entry for the given story ID in the given story index.
   *
   * @param {API_IndexHash} index - The story index to search for the leaf entry in.
   * @param {StoryId} storyId - The ID of the story to find the leaf entry for.
   * @returns {API_LeafEntry | undefined} The leaf entry for the given story ID, or undefined if no
   *   leaf entry was found.
   */
  findLeafEntry(index: API_IndexHash, storyId: StoryId$1): API_LeafEntry | undefined;
  /**
   * Finds the leaf story ID for the given component or group ID in the given index.
   *
   * @param {API_IndexHash} index - The story index to search for the leaf story ID in.
   * @param {StoryId} storyId - The ID of the story to find the leaf story ID for.
   * @returns {StoryId | undefined} The ID of the leaf story, or undefined if no leaf story was
   *   found.
   */
  findLeafStoryId(index: API_IndexHash, storyId: StoryId$1): StoryId$1 | undefined;
  /**
   * Finds all the leaf story IDs for the given entry ID in the given index.
   *
   * @param {StoryId} entryId - The ID of the entry to find the leaf story IDs for.
   * @returns {StoryId[]} The IDs of all the leaf stories, or an empty array if no leaf stories were
   *   found.
   */
  findAllLeafStoryIds(entryId: string): StoryId$1[];
  /**
   * Finds the ID of the sibling story in the given direction for the given story ID in the given
   * story index.
   *
   * @param {StoryId} storyId - The ID of the story to find the sibling of.
   * @param {API_IndexHash} index - The story index to search for the sibling in.
   * @param {Direction} direction - The direction to search for the sibling in.
   * @param {boolean} toSiblingGroup - When true, skips over leafs within the same group.
   * @returns {StoryId} The ID of the sibling story, or null if no sibling was found.
   */
  findSiblingStoryId(storyId: StoryId$1, index: API_IndexHash, direction: Direction, toSiblingGroup: boolean): StoryId$1;
  /**
   * Fetches the story index from the server.
   *
   * @returns {Promise<void>} A promise that resolves when the index has been fetched.
   */
  fetchIndex: () => Promise<void>;
  /**
   * Updates the story with the given ID with the provided update object.
   *
   * @param {StoryId} storyId - The ID of the story to update.
   * @param {StoryUpdate} update - An object containing the updated story information.
   * @param {API_ComposedRef} [ref] - The composed ref of the story to update.
   * @returns {Promise<void>} A promise that resolves when the story has been updated.
   */
  updateStory: (storyId: StoryId$1, update: StoryUpdate, ref?: API_ComposedRef) => Promise<void>;
  /**
   * Updates the documentation for the given story ID with the given update object.
   *
   * @param {StoryId} storyId - The ID of the story to update.
   * @param {DocsUpdate} update - An object containing the updated documentation information.
   * @param {API_ComposedRef} [ref] - The composed ref of the story to update.
   * @returns {Promise<void>} A promise that resolves when the documentation has been updated.
   */
  updateDocs: (storyId: StoryId$1, update: DocsUpdate, ref?: API_ComposedRef) => Promise<void>;
  /**
   * Sets the preview as initialized.
   *
   * @param {ComposedRef} [ref] - The composed ref of the story to set as initialized.
   * @returns {Promise<void>} A promise that resolves when the preview has been set as initialized.
   */
  setPreviewInitialized: (ref?: API_ComposedRef$2) => Promise<void>;
  /**
   * Updates the filtering of the index.
   *
   * @param {string} addonId - The ID of the addon to update.
   * @param {API_FilterFunction} filterFunction - A function that returns a boolean based on the
   *   story, index and status.
   * @returns {Promise<void>} A promise that resolves when the state has been updated.
   */
  experimental_setFilter: (addonId: string, filterFunction: API_FilterFunction) => Promise<void>;
  /** Resets tag filters in the sidebar to the default filters. */
  resetTagFilters(): Promise<void>;
  /**
   * Replaces all tag filters in the sidebar with the provided included and excluded lists.
   *
   * @param included The tags to include in the filtered stories list
   * @param excluded The tags to filter out (exclude) from the stories list
   */
  setAllTagFilters(included: Tag$1[], excluded: Tag$1[]): Promise<void>;
  /**
   * Adds tag filters to the included or excluded filter lists. Included filters are included in the
   * stories list, whereas excluded filters are filtered out.
   *
   * @param tags The tags to add as filters.
   * @param excluded Whether to add the tags to the include or exclude filter list.
   */
  addTagFilters(tags: Tag$1[], excluded: boolean): Promise<void>;
  /**
   * Removes tag filters from both the included and excluded filter lists.
   *
   * @param tags The tags to remove from filters.
   */
  removeTagFilters(tags: Tag$1[]): Promise<void>;
  /** Resets status filters in the sidebar (clears both included and excluded). */
  resetStatusFilters(): Promise<void>;
  /**
   * Replaces all status filters in the sidebar with the provided included and excluded lists.
   *
   * @param included The status values to include in the filtered stories list
   * @param excluded The status values to filter out (exclude) from the stories list
   */
  setAllStatusFilters(included: StatusValue[], excluded: StatusValue[]): Promise<void>;
  /**
   * Adds status filters to the included or excluded filter lists.
   *
   * @param statuses The status values to add as filters.
   * @param excluded Whether to add to the include or exclude filter list.
   */
  addStatusFilters(statuses: StatusValue[], excluded: boolean): Promise<void>;
  /**
   * Removes status filters from both the included and excluded filter lists.
   *
   * @param statuses The status values to remove from filters.
   */
  removeStatusFilters(statuses: StatusValue[]): Promise<void>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/url.d.ts
interface SubState$2 {
  customQueryParams: QueryParams;
}
interface QueryParams {
  [key: string]: string | undefined;
}
interface QueryParamInput {
  [key: string]: string | undefined | null;
}
/** SubAPI for managing URL navigation and state. */
interface SubAPI$2 {
  /**
   * Navigate to a new URL.
   *
   * @param {string} url - The URL to navigate to.
   * @param {NavigateOptions} options - Options for the navigation.
   * @returns {void}
   */
  navigateUrl: (url: string, options: NavigateOptions) => void;
  /**
   * Get the manager and preview hrefs for a story.
   *
   * @param {string} storyId - The ID of the story to get the URL for.
   * @param {Object} options - Options for the URL.
   * @param {string} [options.base] - Return an absolute href based on the current origin or network
   *   address.
   * @param {boolean} [options.inheritArgs] - Inherit args from the current URL. If storyId matches
   *   current story, inheritArgs defaults to true.
   * @param {boolean} [options.inheritGlobals] - Inherit globals from the current URL. Defaults to
   *   true.
   * @param {QueryParams} [options.queryParams] - Query params to add to the URL.
   * @param {string} [options.refId] - ID of the ref to get the URL for (for composed Storybooks)
   * @param {string} [options.viewMode] - The view mode to use, defaults to 'story'.
   * @param {boolean} [options.embed] - Append `embed=true` so the preview broadcasts
   *   content dimensions to an embedding parent via `iframe.resize` postMessage. Affects
   *   `previewHref` only.
   * @param {boolean} [options.freeze] - Append the `freeze=finished` preview contract so the
   *   preview settles to a static end frame and blocks interaction. Affects `previewHref` only.
   * @returns {Object} Manager and preview hrefs for the story.
   */
  getStoryHrefs(storyId: string, options?: {
    base?: 'origin' | 'network';
    inheritArgs?: boolean;
    inheritGlobals?: boolean;
    queryParams?: QueryParams;
    refId?: string;
    viewMode?: API_ViewMode;
    embed?: boolean;
    freeze?: boolean;
  }): {
    managerHref: string;
    previewHref: string;
  };
  /**
   * Get the value of a query parameter from the current URL.
   *
   * @param {string} key - The key of the query parameter to get.
   * @returns {string | undefined} The value of the query parameter, or undefined if it does not
   *   exist.
   */
  getQueryParam: (key: string) => string | undefined;
  /**
   * Returns an object containing the current state of the URL.
   *
   * @returns {{
   *   queryParams: QueryParams;
   *   path: string;
   *   viewMode?: string;
   *   storyId?: string;
   *   url: string;
   * }}
   *   An object containing the current state of the URL.
   */
  getUrlState: () => {
    queryParams: QueryParams;
    path: string;
    hash: string;
    viewMode?: string;
    storyId?: string;
    url: string;
  };
  /**
   * Set the query parameters for the current URL.
   *
   * @param {QueryParams} input - An object containing the query parameters to set.
   * @returns {void}
   */
  setQueryParams: (input: QueryParamInput) => void;
  /**
   * Set the query parameters for the current URL & navigates.
   *
   * @param {QueryParams} input - An object containing the query parameters to set.
   * @param {NavigateOptions} options - Options for the navigation.
   * @returns {void}
   */
  applyQueryParams: (input: QueryParamInput, options?: NavigateOptions) => void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/versions.d.ts
interface SubState$1 {
  versions: API_Versions & API_UnknownEntries;
  lastVersionCheck: number;
  dismissedVersionNotification: undefined | string;
}
interface SubAPI$1 {
  /**
   * Returns the current version of the Storybook Manager.
   *
   * @returns {API_Version} The current version of the Storybook Manager.
   */
  getCurrentVersion: () => API_Version;
  /**
   * Returns the latest version of the Storybook Manager.
   *
   * @returns {API_Version} The latest version of the Storybook Manager.
   */
  getLatestVersion: () => API_Version;
  /**
   * Returns the URL of the Storybook documentation for the current version.
   *
   * @param options - The options for the documentation URL.
   * @param options.asset - Like subpath, but links to the docs-assets directory.
   * @param options.subpath - The subpath of the documentation URL.
   * @param options.versioned - Whether to include the versioned path.
   * @param options.renderer - Whether to include the renderer path.
   * @param options.ref - Tracking reference for the docs site. E.g. 'ui', 'error', 'upgrade', etc.
   * @returns {string} The URL of the Storybook Manager documentation.
   */
  getDocsUrl: (options: {
    asset?: string;
    subpath?: string;
    versioned?: boolean;
    renderer?: boolean;
    ref?: string;
  }) => string;
  /**
   * Checks if an update is available for the Storybook Manager.
   *
   * @returns {boolean} True if an update is available, false otherwise.
   */
  versionUpdateAvailable: () => boolean;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/modules/whatsnew.d.ts
type SubState = {
  whatsNewData?: WhatsNewData;
};
type SubAPI = {
  isWhatsNewUnread(): boolean;
  whatsNewHasBeenRead(): void;
  toggleWhatsNewNotifications(): void;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/lib/request-response.d.ts
declare class RequestResponseError<Payload extends Record<string, any> | void> extends Error {
  payload: Payload | undefined;
  constructor(message: string, payload?: Payload);
}
declare const experimental_requestResponse: <RequestPayload, ResponsePayload = void, CreateNewStoryErrorPayload extends Record<string, any> | void = void>(channel: Channel, requestEvent: string, responseEvent: string, payload: RequestPayload, timeout?: number) => Promise<ResponsePayload>;
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/lib/platform.d.ts
declare const isMacLike: () => boolean;
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/lib/merge.d.ts
declare function _default<TObj = any>(a: TObj, ...b: Partial<TObj>[]): TObj;
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/root.d.ts
declare const ActiveTabs: {
  SIDEBAR: 'sidebar';
  CANVAS: 'canvas';
  ADDONS: 'addons';
};
declare const ManagerContext: React$1.Context<{
  api: API;
  state: State;
}>;
type State = SubState$8 & SubState$3 & SubState$6 & SubState$7 & SubState$1 & SubState$2 & SubState$4 & SubState$5 & SubState$9 & SubState & RouterData & API_OptionsData & Other;
type API = SubAPI$13 & SubAPI$12 & SubAPI$7 & SubAPI$3 & SubAPI$6 & SubAPI$11 & SubAPI$10 & SubAPI$9 & SubAPI$4 & SubAPI$5 & SubAPI$1 & SubAPI$2 & SubAPI & SubAPI$8 & Other;
interface Other {
  [key: string]: any;
}
interface Combo {
  api: API;
  state: State;
}
type ManagerProviderProps = RouterData & API_ProviderData<API> & {
  children: ReactNode | FC<Combo>;
};
declare const combineParameters$1: (...parameterSets: Parameters$1[]) => {};
declare class ManagerProvider extends Component<ManagerProviderProps, State> {
  api: API;
  modules: ReturnType<ModuleFn>[];
  mounted: boolean;
  static displayName: string;
  constructor(props: ManagerProviderProps);
  componentDidMount(): void;
  static getDerivedStateFromProps(props: ManagerProviderProps, state: State): State;
  shouldComponentUpdate(nextProps: ManagerProviderProps, nextState: State): boolean;
  initModules: () => void;
  render(): React$1.JSX.Element;
}
interface ManagerConsumerProps<P = unknown> {
  filter?: (combo: Combo) => P;
  children: FC<P> | ReactNode;
}
declare function ManagerConsumer<P = Combo>({
  filter,
  children
}: ManagerConsumerProps<P>): ReactElement;
declare function useStorybookState(): State;
declare function useStorybookApi(): API;
interface API_EventMap {
  [eventId: string]: Listener$2;
}
declare const useChannel: (eventMap: API_EventMap, deps?: any[]) => (type: string, ...args: any[]) => void;
declare function useStoryPrepared(storyId?: StoryId$1): boolean;
declare function useParameter<S>(parameterKey: string, defaultValue?: S): S;
declare function useSharedState<S>(stateId: string, defaultState?: S): [S, (newStateOrMerger: S | API_StateMerger<S>, options?: Options$2) => void];
declare function useAddonState<S>(addonId: string, defaultState?: S): [S, (newStateOrMerger: S | API_StateMerger<S>, options?: Options$2) => void];
declare function useArgs(): [Args$1, (newArgs: Args$1) => void, (argNames?: string[]) => void, Args$1];
declare function useGlobals(): [globals: Globals$1, updateGlobals: (newGlobals: Globals$1) => void, storyGlobals: Globals$1, userGlobals: Globals$1];
declare function useGlobalTypes(): GlobalTypes;
declare function useArgTypes(): ArgTypes$1;
declare const typesX: typeof Addon_TypesEnum$2;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/universal-store/types.d.ts
type EnvironmentType = (typeof UniversalStore.Environment)[keyof typeof UniversalStore.Environment];
type StatusType = (typeof UniversalStore.Status)[keyof typeof UniversalStore.Status];
type StateUpdater<TState> = (prevState: TState) => TState;
type Actor = {
  id: string;
  type: (typeof UniversalStore.ActorType)[keyof typeof UniversalStore.ActorType];
  environment: EnvironmentType;
};
type EventInfo = {
  actor: Actor;
  forwardingActor?: Actor;
};
type Listener$1<TEvent> = (event: TEvent, eventInfo: EventInfo) => void;
type BaseEvent = {
  type: string;
  payload?: any;
};
interface SetStateEvent<TState> extends BaseEvent {
  type: typeof UniversalStore.InternalEventType.SET_STATE;
  payload: {
    state: TState;
    previousState: TState;
  };
}
interface ExistingStateRequestEvent extends BaseEvent {
  type: typeof UniversalStore.InternalEventType.EXISTING_STATE_REQUEST;
  payload: never;
}
interface ExistingStateResponseEvent<TState> extends BaseEvent {
  type: typeof UniversalStore.InternalEventType.EXISTING_STATE_RESPONSE;
  payload: TState;
}
interface LeaderCreatedEvent extends BaseEvent {
  type: typeof UniversalStore.InternalEventType.LEADER_CREATED;
  payload: never;
}
interface FollowerCreatedEvent extends BaseEvent {
  type: typeof UniversalStore.InternalEventType.FOLLOWER_CREATED;
  payload: never;
}
type InternalEvent<TState> = SetStateEvent<TState> | ExistingStateRequestEvent | ExistingStateResponseEvent<TState> | FollowerCreatedEvent | LeaderCreatedEvent;
type Event<TState, TEvent extends BaseEvent> = TEvent | InternalEvent<TState>;
type ChannelLike$1 = Pick<Channel, 'on' | 'off' | 'emit'>;
type StoreOptions<TState> = {
  id: string;
  leader?: boolean;
  initialState?: TState;
  debug?: boolean;
};
type EnvironmentOverrides = {
  channel: ChannelLike$1;
  environment: EnvironmentType;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/universal-store/index.d.ts
/**
 * A universal store implementation that synchronizes state across different environments using a
 * channel-based communication.
 *
 * The store follows a leader-follower pattern where:
 *
 * - Leader: The main store instance that owns and manages the state
 * - Follower: Store instances that mirror the leader's state
 *
 * Features:
 *
 * - State synchronization across environments
 * - Event-based communication
 * - Type-safe state and custom events
 * - Subscription system for state changes and custom events
 *
 * @remarks
 * - The store must be created using the static `create()` method, not the constructor
 * - Follower stores will automatically sync with their leader's state. If they have initial state, it
 *   will be replaced immediately when it has synced with the leader.
 *
 * @example
 *
 * ```typescript
 * interface MyState {
 *   count: number;
 * }
 * interface MyCustomEvent {
 *   type: 'INCREMENT';
 *   payload: number;
 * }
 *
 * // Create a leader store
 * const leaderStore = UniversalStore.create<MyState, MyCustomEvent>({
 *   id: 'my-store',
 *   leader: true,
 *   initialState: { count: 0 },
 * });
 *
 * // Create a follower store
 * const followerStore = UniversalStore.create<MyState, MyCustomEvent>({
 *   id: 'my-store',
 *   leader: false,
 * });
 * ```
 *
 * @template State - The type of state managed by the store
 * @template CustomEvent - Custom events that can be sent through the store. Must have a `type`
 *   string and optional `payload`
 * @throws {Error} If constructed directly instead of using `create()`
 * @throws {Error} If created without setting a channel first
 * @throws {Error} If a follower is created with initial state
 * @throws {Error} If a follower cannot find its leader within 1 second
 */
declare class UniversalStore<State, CustomEvent extends {
  type: string;
  payload?: any;
} = {
  type: string;
  payload?: any;
}> {
  /**
   * Defines the possible actor types in the store system
   *
   * @readonly
   */
  static readonly ActorType: {
    readonly LEADER: 'LEADER';
    readonly FOLLOWER: 'FOLLOWER';
  };
  /**
   * Defines the possible environments the store can run in
   *
   * @readonly
   */
  static readonly Environment: {
    readonly SERVER: 'SERVER';
    readonly MANAGER: 'MANAGER';
    readonly PREVIEW: 'PREVIEW';
    readonly UNKNOWN: 'UNKNOWN';
    readonly MOCK: 'MOCK';
  };
  /**
   * Internal event types used for store synchronization
   *
   * @readonly
   */
  static readonly InternalEventType: {
    readonly EXISTING_STATE_REQUEST: '__EXISTING_STATE_REQUEST';
    readonly EXISTING_STATE_RESPONSE: '__EXISTING_STATE_RESPONSE';
    readonly SET_STATE: '__SET_STATE';
    readonly LEADER_CREATED: '__LEADER_CREATED';
    readonly FOLLOWER_CREATED: '__FOLLOWER_CREATED';
  };
  static readonly Status: {
    readonly UNPREPARED: 'UNPREPARED';
    readonly SYNCING: 'SYNCING';
    readonly READY: 'READY';
    readonly ERROR: 'ERROR';
  };
  protected static isInternalConstructing: boolean;
  /**
   * The preparation construct is used to keep track of all store's preparation state the promise is
   * resolved when the store is prepared with the static __prepare() method which will also change
   * the state from PENDING to RESOLVED
   */
  private static preparation;
  private static setupPreparationPromise;
  /** Enable debug logs for this store */
  debugging: boolean;
  /** The actor object representing the store instance with a unique ID and a type */
  get actor(): Actor;
  /**
   * The current state of the store, that signals both if the store is prepared by Storybook and
   * also - in the case of a follower - if the state has been synced with the leader's state.
   */
  get status(): StatusType;
  /**
   * A promise that resolves when the store is fully ready. A leader will be ready when the store
   * has been prepared by Storybook, which is almost instantly.
   *
   * A follower will be ready when the state has been synced with the leader's state, within a few
   * hundred milliseconds.
   */
  untilReady(): Promise<[void | {
    channel: ChannelLike$1;
    environment: EnvironmentType;
  }, void | undefined]>;
  /**
   * The syncing construct is used to keep track of if the instance's state has been synced with the
   * other instances. A leader will immediately have the promise resolved. A follower will initially
   * be in a PENDING state, and resolve when the leader has sent the existing state, or reject if no
   * leader has responded before the timeout.
   */
  private syncing?;
  private channelEventName;
  private state;
  private channel?;
  private environment?;
  private listeners;
  private id;
  private actorId;
  private actorType;
  protected constructor(options: StoreOptions<State>, environmentOverrides?: EnvironmentOverrides);
  /** Creates a new instance of UniversalStore */
  static create<State = any, CustomEvent extends {
    type: string;
    payload?: any;
  } = {
    type: string;
    payload?: any;
  }>(options: StoreOptions<State>): UniversalStore<State, CustomEvent>;
  /** Gets the current state */
  getState: () => State;
  /**
   * Updates the store's state
   *
   * Either a new state or a state updater function can be passed to the method.
   */
  setState(updater: State | StateUpdater<State>): void;
  /**
   * Subscribes to store events
   *
   * @returns A function to unsubscribe
   */
  subscribe: {
    (listener: Listener$1<Event<State, CustomEvent>>): () => void;
    <EventType extends Event<State, CustomEvent>['type']>(eventType: EventType, listener: Listener$1<Extract<Event<State, CustomEvent>, {
      type: EventType;
    }>>): () => void;
  };
  /**
   * Subscribes to state changes
   *
   * @returns Unsubscribe function
   */
  onStateChange(listener: (state: State, previousState: State, eventInfo: EventInfo) => void): () => void;
  /** Sends a custom event to the other stores */
  send: (event: CustomEvent) => void;
  private emitToChannel;
  private prepareThis;
  private emitToListeners;
  private handleChannelEvents;
  private debug;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/universal-store/use-universal-store-manager.d.ts
/**
 * A hook to use a UniversalStore in the manager UI (eg. in an addon panel). This hook will react to
 * changes in the store state and re-render when the store changes.
 *
 * @param universalStore The UniversalStore instance to use.
 * @param selector An optional selector function to select a subset of the store state.
 * @remark This hook is intended for use in the manager UI. For use in the preview, import from
 * `storybook/preview-api` instead.
 */
declare const useUniversalStore: {
  <TUniversalStore extends UniversalStore<TState, any>, TState = (TUniversalStore extends UniversalStore<infer S, any> ? S : never)>(universalStore: TUniversalStore): [TState, TUniversalStore['setState']];
  <TUniversalStore extends UniversalStore<any, any>, TSelectedState, TState = (TUniversalStore extends UniversalStore<infer S, any> ? S : never)>(universalStore: TUniversalStore, selector: (state: TState) => TSelectedState): [TSelectedState, TUniversalStore['setState']];
};
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/universal-store/mock.d.ts
/**
 * A mock universal store that can be used when testing code that relies on a universal store. It
 * functions exactly like a normal universal store, with a few exceptions:
 *
 * - It is fully isolated, meaning that it doesn't interact with any channel, and it is always a
 *   leader.
 *
 * If the second testUtils argument is provided, all the public methods are spied on, so they can be
 * asserted.
 *
 * When a mock store is re-used across tests (eg. in stories), you manually need to reset the state
 * after each test.
 *
 * @example
 *
 * ```ts
 * import * as testUtils from 'storybook/test'; // in stories
 * import { vi as testUtils } from 'vitest'; // ... or in Vitest tests
 *
 * const initialState = { ... };
 * const store = new MockUniversalStore({ initialState }, testUtils);
 *
 * export default {
 *   title: 'My story',
 *   beforeEach: () => {
 *     return () => {
 *       store.setState(initialState);
 *     };
 *   }
 * }
 * ```
 */
declare class MockUniversalStore<State, CustomEvent extends {
  type: string;
  payload?: any;
} = {
  type: string;
  payload?: any;
}> extends UniversalStore<State, CustomEvent> {
  private testUtils;
  constructor(options: StoreOptions<State>, testUtils?: any);
  /** Create a mock universal store. This is just an alias for the constructor */
  static create<State = any, CustomEvent extends {
    type: string;
    payload?: any;
  } = {
    type: string;
    payload?: any;
  }>(options: StoreOptions<State>, testUtils?: any): MockUniversalStore<State, CustomEvent>;
  unsubscribeAll(): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/stores/status.d.ts
declare const fullStatusStore: StatusStore & {
    selectStatuses: (statuses: Status[]) => void;
    typeId: undefined;
  }, getStatusStoreByTypeId: (typeId: StatusTypeId) => StatusStoreByTypeId$1, useStatusStore: UseStatusStore, universalStatusStore: UniversalStore<StatusesByStoryIdAndTypeId, StatusStoreEvent>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/test-provider-store/index.d.ts
type TestProviderState = 'test-provider-state:pending' | 'test-provider-state:running' | 'test-provider-state:succeeded' | 'test-provider-state:crashed';
type TestProviderId = string;
type TestProviderStateByProviderId = Record<TestProviderId, TestProviderState>;
type TestProviderStoreEventType = 'run-all' | 'clear-all' | 'settings-changed';
type TestProviderStoreEvent = BaseEvent & {
  type: TestProviderStoreEventType;
};
type BaseTestProviderStore = {
  /**
   * Notifies all listeners that settings have changed for test providers. The Storybook UI will
   * highlight the test providers to tell the user that settings has changed.
   */
  settingsChanged: () => void;
  /**
   * Subscribe to clicks on the "Run All" button, that is supposed to trigger all test providers to
   * run. Your test provider should do the "main thing" when this happens, similar to when the user
   * triggers your test provider specifically.
   *
   * @example
   *
   * ```typescript
   * // Subscribe to run-all events
   * const unsubscribe = myTestProviderStore.onRunAll(() => {
   *   await runAllMyTests();
   * });
   * ```
   */
  onRunAll: (listener: () => void) => () => void;
  /**
   * Subscribe to clicks on the "Clear All" button, that is supposed to clear all state from test
   * providers. Storybook already clears all statuses, but if your test provider has more
   * non-status-based state, you can use this to clear that here.
   *
   * @remarks
   * The purpose of this is _not_ to clear your test provider's settings, only the test results.
   * @example
   *
   * ```typescript
   * // Subscribe to clear-all events
   * const unsubscribe = myTestProviderStore.onClearAll(() => {
   *   clearMyTestResults();
   * });
   *
   * // Later, when no longer needed
   * unsubscribe();
   * ```
   */
  onClearAll: (listener: () => void) => () => void;
};
/**
 * Test provider store that holds _all_ test provider's states.
 *
 * This is an internal store only meant to be used by Storybook UI itself. The API can change at any
 * time. Addons and test providers should use the `getTestProvider` function instead.
 */
/**
 * Represents a store for a specific test provider, identified by its unique ID. This store provides
 * methods to manage the state of an individual test provider, including getting and setting its
 * state, running operations with automatic state management, and accessing its unique identifier.
 *
 * Each test provider has its own instance of this store, allowing for independent state management
 * across different test providers in the application.
 *
 * @example
 *
 * ```typescript
 * // Get a store for a specific test provider
 * const grammarStore = getTestProviderStoreById('addon-grammar');
 *
 * // Check the current state
 * if (grammarStore.getState() === 'test-provider-state:pending') {
 *   console.log('Grammar tests are ready to run');
 * }
 *
 * // Run tests with automatic state management
 * grammarStore.runWithState(async () => {
 *   await runGrammarTests();
 * });
 * ```
 *
 * @see {@link TestProviderState} for possible state values
 * @see {@link BaseTestProviderStore} for methods inherited from the base store
 */
type TestProviderStoreById = BaseTestProviderStore & {
  /**
   * Gets the current state of this specific test provider
   *
   * The state represents the current execution status of the test provider, which can be one of the
   * following:
   *
   * - 'test-provider-state:pending': Tests have not been run yet
   * - 'test-provider-state:running': Tests are currently running
   * - 'test-provider-state:succeeded': Tests completed successfully
   * - 'test-provider-state:crashed': Running tests failed or encountered an error
   *
   * Storybook UI will use this state to determine what to show in the UI.
   *
   * @remarks
   * The 'test-provider-state:crashed' is meant to signify that the test run as a whole failed to
   * execute for some reason. It should _not_ be set just because a number of tests failed, use
   * statuses and the status store for that. See {@link TestStatusStore} for managing individual test
   * statuses.
   * @example
   *
   * ```typescript
   * // Get the current state of a specific test provider
   * const state = testProviderStore.getState();
   *
   * // Conditionally render UI based on the state
   * const TestStatus = () => {
   *   const state = testProviderStore.getState();
   *
   *   if (state === 'test-provider-state:running') {
   *     return <Spinner />;
   *   } else if (state === 'test-provider-state:succeeded') {
   *     return <SuccessIcon />;
   *   } else if (state === 'test-provider-state:crashed') {
   *     return <ErrorIcon />;
   *   }
   *
   *   return <PendingIcon />;
   * };
   * ```
   */
  getState: () => TestProviderState;
  /**
   * Sets the state of this specific test provider
   *
   * This method allows you to manually update the execution state of the test provider. It's
   * typically used when you need to reflect the current status of test execution in the UI or when
   * you want to programmatically control the test provider's state.
   *
   * Common use cases include:
   *
   * - Setting to 'running' when tests start
   * - Setting to 'succeeded' when tests complete successfully
   * - Setting to 'crashed' when tests fail or encounter errors
   * - Setting to 'pending' to reset the state
   *
   * The state represents the current execution status of the test provider, which can be one of the
   * following:
   *
   * - 'test-provider-state:pending': Tests have not been run yet
   * - 'test-provider-state:running': Tests are currently running
   * - 'test-provider-state:succeeded': Tests completed successfully
   * - 'test-provider-state:crashed': Running tests failed or encountered an error
   *
   * Storybook UI will use this state to determine what to show in the UI.
   *
   * @remarks
   * The 'test-provider-state:crashed' is meant to signify that the test run as a whole failed to
   * execute for some reason. It should _not_ be set just because a number of tests failed, use
   * statuses and the status store for that. See {@link TestStatusStore} for managing individual test
   * statuses.
   *
   * For most use cases, consider using {@link runWithState} instead, which provides automatic state
   * management and error handling during test execution.
   * @example
   *
   * ```typescript
   * // Update the state when tests start running
   * const startTests = async () => {
   *   testProviderStore.setState('test-provider-state:running');
   *   ... run tests ...
   * };
   * ```
   */
  setState: (state: TestProviderState) => void;
  /**
   * Runs a callback and automatically updates the test provider's state with running, succeeded or
   * crashed, depending on the end result.
   *
   * - Immediately changes the state to 'running'
   * - If the callback returns/resolves, change the state to 'succeeded'.
   * - If the callback throws an error/rejects, change the state to 'crashed'.
   *
   * This approach helps prevent state inconsistencies that might occur if exceptions are thrown
   * during test execution.
   *
   * @example
   *
   * ```typescript
   * // Run tests with automatic state management
   * const runTests = () => {
   *   testProviderStore.runWithState(async () => {
   *     // The state is automatically set to 'running' before this callback
   *
   *     // Run tests here...
   *     const results = await executeTests();
   *   });
   * };
   * ```
   */
  runWithState: (callback: () => void | Promise<void>) => Promise<void>; /** The unique identifier for this test provider */
  testProviderId: TestProviderId;
};
/**
 * React OR preview hook for accessing the state of _all_ test providers. This hook will only
 * trigger a re-render when the state changes. It is recommended to pass the optional selector, to
 * get more fine-grained control of re-renders.
 *
 * @example
 *
 * ```typescript
 * const TestStatus = () => {
 *   const state = useTestProviderStore((state) => state['my-test-provider']);
 * };
 * ```
 */
type UseTestProviderStore = <T = TestProviderStateByProviderId>(
/**
 * Optional selector function to extract or transform specific parts of the state
 *
 * @example
 *
 * ```typescript
 * // Use the entire state
 * const allProviderStates = useTestProviderStore();
 *
 * // Get state for a specific provider
 * const myProviderState = useTestProviderStore((state) => state['my-test-provider']);
 *
 * // Get a count of providers in each state
 * const statusCounts = useTestProviderStore((state) => {
 *   const counts = {
 *     pending: 0,
 *     running: 0,
 *     succeeded: 0,
 *     crashed: 0,
 *   };
 *
 *   Object.values(state).forEach((status) => {
 *     if (status === 'test-provider-state:pending') counts.pending++;
 *     else if (status === 'test-provider-state:running') counts.running++;
 *     else if (status === 'test-provider-state:succeeded') counts.succeeded++;
 *     else if (status === 'test-provider-state:crashed') counts.crashed++;
 *   });
 *
 *   return counts;
 * });
 *
 * // Check if all tests have completed
 * const allTestsCompleted = useTestProviderStore((state) => {
 *   return Object.values(state).every(
 *     (status) =>
 *       status === 'test-provider-state:succeeded' ||
 *       status === 'test-provider-state:crashed'
 *   );
 * });
 * ```
 */

selector?: (state: TestProviderStateByProviderId) => T) => T;
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/stores/test-provider.d.ts
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
  }, getTestProviderStoreById: (testProviderId: TestProviderId) => TestProviderStoreById, useTestProviderStore: UseTestProviderStore, universalTestProviderStore: UniversalStore<TestProviderStateByProviderId, TestProviderStoreEvent>;
//#endregion
//#region node_modules/zod/v3/helpers/typeAliases.d.cts
type Primitive$1 = string | number | symbol | bigint | boolean | null | undefined;
//#endregion
//#region node_modules/zod/v3/helpers/util.d.cts
declare namespace util {
  type AssertEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends (<V>() => V extends U ? 1 : 2) ? true : false;
  export type isAny<T> = 0 extends 1 & T ? true : false;
  export const assertEqual: <A, B>(_: AssertEqual<A, B>) => void;
  export function assertIs<T>(_arg: T): void;
  export function assertNever(_x: never): never;
  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
  export type OmitKeys<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
  export type MakePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  export type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;
  export type InexactPartial<T> = { [k in keyof T]?: T[k] | undefined };
  export const arrayToEnum: <T extends string, U extends [T, ...T[]]>(items: U) => { [k in U[number]]: k };
  export const getValidEnumValues: (obj: any) => any[];
  export const objectValues: (obj: any) => any[];
  export const objectKeys: ObjectConstructor["keys"];
  export const find: <T>(arr: T[], checker: (arg: T) => any) => T | undefined;
  export type identity<T> = objectUtil.identity<T>;
  export type flatten<T> = objectUtil.flatten<T>;
  export type noUndefined<T> = T extends undefined ? never : T;
  export const isInteger: NumberConstructor["isInteger"];
  export function joinValues<T extends any[]>(array: T, separator?: string): string;
  export const jsonStringifyReplacer: (_: string, value: any) => any;
  export {};
}
declare namespace objectUtil {
  export type MergeShapes<U, V> = keyof U & keyof V extends never ? U & V : { [k in Exclude<keyof U, keyof V>]: U[k] } & V;
  type optionalKeys<T extends object> = { [k in keyof T]: undefined extends T[k] ? k : never }[keyof T];
  type requiredKeys<T extends object> = { [k in keyof T]: undefined extends T[k] ? never : k }[keyof T];
  export type addQuestionMarks<T extends object, _O = any> = { [K in requiredKeys<T>]: T[K] } & { [K in optionalKeys<T>]?: T[K] } & { [k in keyof T]?: unknown };
  export type identity<T> = T;
  export type flatten<T> = identity<{ [k in keyof T]: T[k] }>;
  export type noNeverKeys<T> = { [k in keyof T]: [T[k]] extends [never] ? never : k }[keyof T];
  export type noNever<T> = identity<{ [k in noNeverKeys<T>]: k extends keyof T ? T[k] : never }>;
  export const mergeShapes: <U, T>(first: U, second: T) => T & U;
  export type extendShape<A extends object, B extends object> = keyof A & keyof B extends never ? A & B : { [K in keyof A as K extends keyof B ? never : K]: A[K] } & { [K in keyof B]: B[K] };
  export {};
}
declare const ZodParsedType: {
  string: "string";
  nan: "nan";
  number: "number";
  integer: "integer";
  float: "float";
  boolean: "boolean";
  date: "date";
  bigint: "bigint";
  symbol: "symbol";
  function: "function";
  undefined: "undefined";
  null: "null";
  array: "array";
  object: "object";
  unknown: "unknown";
  promise: "promise";
  void: "void";
  never: "never";
  map: "map";
  set: "set";
};
type ZodParsedType = keyof typeof ZodParsedType;
//#endregion
//#region node_modules/zod/v3/ZodError.d.cts
type allKeys<T> = T extends any ? keyof T : never;
type typeToFlattenedError<T, U = string> = {
  formErrors: U[];
  fieldErrors: { [P in allKeys<T>]?: U[] };
};
declare const ZodIssueCode: {
  invalid_type: "invalid_type";
  invalid_literal: "invalid_literal";
  custom: "custom";
  invalid_union: "invalid_union";
  invalid_union_discriminator: "invalid_union_discriminator";
  invalid_enum_value: "invalid_enum_value";
  unrecognized_keys: "unrecognized_keys";
  invalid_arguments: "invalid_arguments";
  invalid_return_type: "invalid_return_type";
  invalid_date: "invalid_date";
  invalid_string: "invalid_string";
  too_small: "too_small";
  too_big: "too_big";
  invalid_intersection_types: "invalid_intersection_types";
  not_multiple_of: "not_multiple_of";
  not_finite: "not_finite";
};
type ZodIssueCode = keyof typeof ZodIssueCode;
type ZodIssueBase = {
  path: (string | number)[];
  message?: string | undefined;
};
interface ZodInvalidTypeIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_type;
  expected: ZodParsedType;
  received: ZodParsedType;
}
interface ZodInvalidLiteralIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_literal;
  expected: unknown;
  received: unknown;
}
interface ZodUnrecognizedKeysIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.unrecognized_keys;
  keys: string[];
}
interface ZodInvalidUnionIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_union;
  unionErrors: ZodError[];
}
interface ZodInvalidUnionDiscriminatorIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_union_discriminator;
  options: Primitive$1[];
}
interface ZodInvalidEnumValueIssue extends ZodIssueBase {
  received: string | number;
  code: typeof ZodIssueCode.invalid_enum_value;
  options: (string | number)[];
}
interface ZodInvalidArgumentsIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_arguments;
  argumentsError: ZodError;
}
interface ZodInvalidReturnTypeIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_return_type;
  returnTypeError: ZodError;
}
interface ZodInvalidDateIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_date;
}
type StringValidation = "email" | "url" | "emoji" | "uuid" | "nanoid" | "regex" | "cuid" | "cuid2" | "ulid" | "datetime" | "date" | "time" | "duration" | "ip" | "cidr" | "base64" | "jwt" | "base64url" | {
  includes: string;
  position?: number | undefined;
} | {
  startsWith: string;
} | {
  endsWith: string;
};
interface ZodInvalidStringIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_string;
  validation: StringValidation;
}
interface ZodTooSmallIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.too_small;
  minimum: number | bigint;
  inclusive: boolean;
  exact?: boolean;
  type: "array" | "string" | "number" | "set" | "date" | "bigint";
}
interface ZodTooBigIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.too_big;
  maximum: number | bigint;
  inclusive: boolean;
  exact?: boolean;
  type: "array" | "string" | "number" | "set" | "date" | "bigint";
}
interface ZodInvalidIntersectionTypesIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.invalid_intersection_types;
}
interface ZodNotMultipleOfIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.not_multiple_of;
  multipleOf: number | bigint;
}
interface ZodNotFiniteIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.not_finite;
}
interface ZodCustomIssue extends ZodIssueBase {
  code: typeof ZodIssueCode.custom;
  params?: {
    [k: string]: any;
  };
}
type ZodIssueOptionalMessage = ZodInvalidTypeIssue | ZodInvalidLiteralIssue | ZodUnrecognizedKeysIssue | ZodInvalidUnionIssue | ZodInvalidUnionDiscriminatorIssue | ZodInvalidEnumValueIssue | ZodInvalidArgumentsIssue | ZodInvalidReturnTypeIssue | ZodInvalidDateIssue | ZodInvalidStringIssue | ZodTooSmallIssue | ZodTooBigIssue | ZodInvalidIntersectionTypesIssue | ZodNotMultipleOfIssue | ZodNotFiniteIssue | ZodCustomIssue;
type ZodIssue = ZodIssueOptionalMessage & {
  fatal?: boolean | undefined;
  message: string;
};
type recursiveZodFormattedError<T> = T extends [any, ...any[]] ? { [K in keyof T]?: ZodFormattedError<T[K]> } : T extends any[] ? {
  [k: number]: ZodFormattedError<T[number]>;
} : T extends object ? { [K in keyof T]?: ZodFormattedError<T[K]> } : unknown;
type ZodFormattedError<T, U = string> = {
  _errors: U[];
} & recursiveZodFormattedError<NonNullable<T>>;
declare class ZodError<T = any> extends Error {
  issues: ZodIssue[];
  get errors(): ZodIssue[];
  constructor(issues: ZodIssue[]);
  format(): ZodFormattedError<T>;
  format<U>(mapper: (issue: ZodIssue) => U): ZodFormattedError<T, U>;
  static create: (issues: ZodIssue[]) => ZodError<any>;
  static assert(value: unknown): asserts value is ZodError;
  toString(): string;
  get message(): string;
  get isEmpty(): boolean;
  addIssue: (sub: ZodIssue) => void;
  addIssues: (subs?: ZodIssue[]) => void;
  flatten(): typeToFlattenedError<T>;
  flatten<U>(mapper?: (issue: ZodIssue) => U): typeToFlattenedError<T, U>;
  get formErrors(): typeToFlattenedError<T, string>;
}
type stripPath<T extends object> = T extends any ? util.OmitKeys<T, "path"> : never;
type IssueData = stripPath<ZodIssueOptionalMessage> & {
  path?: (string | number)[];
  fatal?: boolean | undefined;
};
type ErrorMapCtx = {
  defaultError: string;
  data: any;
};
type ZodErrorMap = (issue: ZodIssueOptionalMessage, _ctx: ErrorMapCtx) => {
  message: string;
};
//#endregion
//#region node_modules/zod/v3/helpers/parseUtil.d.cts
type ParseParams = {
  path: (string | number)[];
  errorMap: ZodErrorMap;
  async: boolean;
};
type ParsePathComponent = string | number;
type ParsePath = ParsePathComponent[];
interface ParseContext {
  readonly common: {
    readonly issues: ZodIssue[];
    readonly contextualErrorMap?: ZodErrorMap | undefined;
    readonly async: boolean;
  };
  readonly path: ParsePath;
  readonly schemaErrorMap?: ZodErrorMap | undefined;
  readonly parent: ParseContext | null;
  readonly data: any;
  readonly parsedType: ZodParsedType;
}
type ParseInput = {
  data: any;
  path: (string | number)[];
  parent: ParseContext;
};
declare class ParseStatus {
  value: "aborted" | "dirty" | "valid";
  dirty(): void;
  abort(): void;
  static mergeArray(status: ParseStatus, results: SyncParseReturnType<any>[]): SyncParseReturnType;
  static mergeObjectAsync(status: ParseStatus, pairs: {
    key: ParseReturnType<any>;
    value: ParseReturnType<any>;
  }[]): Promise<SyncParseReturnType<any>>;
  static mergeObjectSync(status: ParseStatus, pairs: {
    key: SyncParseReturnType<any>;
    value: SyncParseReturnType<any>;
    alwaysSet?: boolean;
  }[]): SyncParseReturnType;
}
type INVALID = {
  status: "aborted";
};
declare const INVALID: INVALID;
type DIRTY<T> = {
  status: "dirty";
  value: T;
};
declare const DIRTY: <T>(value: T) => DIRTY<T>;
type OK<T> = {
  status: "valid";
  value: T;
};
declare const OK: <T>(value: T) => OK<T>;
type SyncParseReturnType<T = any> = OK<T> | DIRTY<T> | INVALID;
type AsyncParseReturnType<T> = Promise<SyncParseReturnType<T>>;
type ParseReturnType<T> = SyncParseReturnType<T> | AsyncParseReturnType<T>;
//#endregion
//#region node_modules/zod/v3/helpers/enumUtil.d.cts
declare namespace enumUtil {
  type UnionToIntersectionFn<T> = (T extends unknown ? (k: () => T) => void : never) extends ((k: infer Intersection) => void) ? Intersection : never;
  type GetUnionLast<T> = UnionToIntersectionFn<T> extends (() => infer Last) ? Last : never;
  type UnionToTuple<T, Tuple extends unknown[] = []> = [T] extends [never] ? Tuple : UnionToTuple<Exclude<T, GetUnionLast<T>>, [GetUnionLast<T>, ...Tuple]>;
  type CastToStringTuple<T> = T extends [string, ...string[]] ? T : never;
  export type UnionToTupleString<T> = CastToStringTuple<UnionToTuple<T>>;
  export {};
}
//#endregion
//#region node_modules/zod/v3/helpers/errorUtil.d.cts
declare namespace errorUtil {
  type ErrMessage = string | {
    message?: string | undefined;
  };
  const errToObj: (message?: ErrMessage) => {
    message?: string | undefined;
  };
  const toString: (message?: ErrMessage) => string | undefined;
}
//#endregion
//#region node_modules/zod/v3/helpers/partialUtil.d.cts
declare namespace partialUtil {
  type DeepPartial<T extends ZodTypeAny> = T extends ZodObject<ZodRawShape> ? ZodObject<{ [k in keyof T["shape"]]: ZodOptional<DeepPartial<T["shape"][k]>> }, T["_def"]["unknownKeys"], T["_def"]["catchall"]> : T extends ZodArray<infer Type, infer Card> ? ZodArray<DeepPartial<Type>, Card> : T extends ZodOptional<infer Type> ? ZodOptional<DeepPartial<Type>> : T extends ZodNullable<infer Type> ? ZodNullable<DeepPartial<Type>> : T extends ZodTuple<infer Items> ? { [k in keyof Items]: Items[k] extends ZodTypeAny ? DeepPartial<Items[k]> : never } extends infer PI ? PI extends ZodTupleItems ? ZodTuple<PI> : never : never : T;
}
//#endregion
//#region node_modules/zod/v3/standard-schema.d.cts
/**
 * The Standard Schema interface.
 */
type StandardSchemaV1$1<Input = unknown, Output = Input> = {
  /**
   * The Standard Schema properties.
   */
  readonly "~standard": StandardSchemaV1$1.Props<Input, Output>;
};
declare namespace StandardSchemaV1$1 {
  /**
   * The Standard Schema properties interface.
   */
  export interface Props<Input = unknown, Output = Input> {
    /**
     * The version number of the standard.
     */
    readonly version: 1;
    /**
     * The vendor name of the schema library.
     */
    readonly vendor: string;
    /**
     * Validates unknown input values.
     */
    readonly validate: (value: unknown) => Result<Output> | Promise<Result<Output>>;
    /**
     * Inferred types associated with the schema.
     */
    readonly types?: Types<Input, Output> | undefined;
  }
  /**
   * The result interface of the validate function.
   */
  export type Result<Output> = SuccessResult<Output> | FailureResult;
  /**
   * The result interface if validation succeeds.
   */
  export interface SuccessResult<Output> {
    /**
     * The typed output value.
     */
    readonly value: Output;
    /**
     * The non-existent issues.
     */
    readonly issues?: undefined;
  }
  /**
   * The result interface if validation fails.
   */
  export interface FailureResult {
    /**
     * The issues of failed validation.
     */
    readonly issues: ReadonlyArray<Issue>;
  }
  /**
   * The issue interface of the failure output.
   */
  export interface Issue {
    /**
     * The error message of the issue.
     */
    readonly message: string;
    /**
     * The path of the issue, if any.
     */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined;
  }
  /**
   * The path segment interface of the issue.
   */
  export interface PathSegment {
    /**
     * The key representing a path segment.
     */
    readonly key: PropertyKey;
  }
  /**
   * The Standard Schema types interface.
   */
  export interface Types<Input = unknown, Output = Input> {
    /**
     * The input type of the schema.
     */
    readonly input: Input;
    /**
     * The output type of the schema.
     */
    readonly output: Output;
  }
  /**
   * Infers the input type of a Standard Schema.
   */
  export type InferInput<Schema extends StandardSchemaV1$1> = NonNullable<Schema["~standard"]["types"]>["input"];
  /**
   * Infers the output type of a Standard Schema.
   */
  export type InferOutput<Schema extends StandardSchemaV1$1> = NonNullable<Schema["~standard"]["types"]>["output"];
  export {};
}
//#endregion
//#region node_modules/zod/v3/types.d.cts
interface RefinementCtx {
  addIssue: (arg: IssueData) => void;
  path: (string | number)[];
}
type ZodRawShape = {
  [k: string]: ZodTypeAny;
};
type ZodTypeAny = ZodType<any, any, any>;
type TypeOf<T extends ZodType<any, any, any>> = T["_output"];
type input<T extends ZodType<any, any, any>> = T["_input"];
type output<T extends ZodType<any, any, any>> = T["_output"];
type CustomErrorParams = Partial<util.Omit<ZodCustomIssue, "code">>;
interface ZodTypeDef {
  errorMap?: ZodErrorMap | undefined;
  description?: string | undefined;
}
type RawCreateParams = {
  errorMap?: ZodErrorMap | undefined;
  invalid_type_error?: string | undefined;
  required_error?: string | undefined;
  message?: string | undefined;
  description?: string | undefined;
} | undefined;
type SafeParseSuccess<Output> = {
  success: true;
  data: Output;
  error?: never;
};
type SafeParseError<Input> = {
  success: false;
  error: ZodError<Input>;
  data?: never;
};
type SafeParseReturnType<Input, Output> = SafeParseSuccess<Output> | SafeParseError<Input>;
declare abstract class ZodType<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
  readonly _type: Output;
  readonly _output: Output;
  readonly _input: Input;
  readonly _def: Def;
  get description(): string | undefined;
  "~standard": StandardSchemaV1$1.Props<Input, Output>;
  abstract _parse(input: ParseInput): ParseReturnType<Output>;
  _getType(input: ParseInput): string;
  _getOrReturnCtx(input: ParseInput, ctx?: ParseContext | undefined): ParseContext;
  _processInputParams(input: ParseInput): {
    status: ParseStatus;
    ctx: ParseContext;
  };
  _parseSync(input: ParseInput): SyncParseReturnType<Output>;
  _parseAsync(input: ParseInput): AsyncParseReturnType<Output>;
  parse(data: unknown, params?: util.InexactPartial<ParseParams>): Output;
  safeParse(data: unknown, params?: util.InexactPartial<ParseParams>): SafeParseReturnType<Input, Output>;
  "~validate"(data: unknown): StandardSchemaV1$1.Result<Output> | Promise<StandardSchemaV1$1.Result<Output>>;
  parseAsync(data: unknown, params?: util.InexactPartial<ParseParams>): Promise<Output>;
  safeParseAsync(data: unknown, params?: util.InexactPartial<ParseParams>): Promise<SafeParseReturnType<Input, Output>>;
  /** Alias of safeParseAsync */
  spa: (data: unknown, params?: util.InexactPartial<ParseParams>) => Promise<SafeParseReturnType<Input, Output>>;
  refine<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, RefinedOutput, Input>;
  refine(check: (arg: Output) => unknown | Promise<unknown>, message?: string | CustomErrorParams | ((arg: Output) => CustomErrorParams)): ZodEffects<this, Output, Input>;
  refinement<RefinedOutput extends Output>(check: (arg: Output) => arg is RefinedOutput, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, RefinedOutput, Input>;
  refinement(check: (arg: Output) => boolean, refinementData: IssueData | ((arg: Output, ctx: RefinementCtx) => IssueData)): ZodEffects<this, Output, Input>;
  _refinement(refinement: RefinementEffect<Output>["refinement"]): ZodEffects<this, Output, Input>;
  superRefine<RefinedOutput extends Output>(refinement: (arg: Output, ctx: RefinementCtx) => arg is RefinedOutput): ZodEffects<this, RefinedOutput, Input>;
  superRefine(refinement: (arg: Output, ctx: RefinementCtx) => void): ZodEffects<this, Output, Input>;
  superRefine(refinement: (arg: Output, ctx: RefinementCtx) => Promise<void>): ZodEffects<this, Output, Input>;
  constructor(def: Def);
  optional(): ZodOptional<this>;
  nullable(): ZodNullable<this>;
  nullish(): ZodOptional<ZodNullable<this>>;
  array(): ZodArray<this>;
  promise(): ZodPromise<this>;
  or<T extends ZodTypeAny>(option: T): ZodUnion<[this, T]>;
  and<T extends ZodTypeAny>(incoming: T): ZodIntersection<this, T>;
  transform<NewOut>(transform: (arg: Output, ctx: RefinementCtx) => NewOut | Promise<NewOut>): ZodEffects<this, NewOut>;
  default(def: util.noUndefined<Input>): ZodDefault<this>;
  default(def: () => util.noUndefined<Input>): ZodDefault<this>;
  brand<B extends string | number | symbol>(brand?: B): ZodBranded<this, B>;
  catch(def: Output): ZodCatch<this>;
  catch(def: (ctx: {
    error: ZodError;
    input: Input;
  }) => Output): ZodCatch<this>;
  describe(description: string): this;
  pipe<T extends ZodTypeAny>(target: T): ZodPipeline<this, T>;
  readonly(): ZodReadonly<this>;
  isOptional(): boolean;
  isNullable(): boolean;
}
type ZodNumberCheck = {
  kind: "min";
  value: number;
  inclusive: boolean;
  message?: string | undefined;
} | {
  kind: "max";
  value: number;
  inclusive: boolean;
  message?: string | undefined;
} | {
  kind: "int";
  message?: string | undefined;
} | {
  kind: "multipleOf";
  value: number;
  message?: string | undefined;
} | {
  kind: "finite";
  message?: string | undefined;
};
interface ZodNumberDef extends ZodTypeDef {
  checks: ZodNumberCheck[];
  typeName: ZodFirstPartyTypeKind.ZodNumber;
  coerce: boolean;
}
declare class ZodNumber extends ZodType<number, ZodNumberDef, number> {
  _parse(input: ParseInput): ParseReturnType<number>;
  static create: (params?: RawCreateParams & {
    coerce?: boolean;
  }) => ZodNumber;
  gte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  min: (value: number, message?: errorUtil.ErrMessage) => ZodNumber;
  gt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  lte(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  max: (value: number, message?: errorUtil.ErrMessage) => ZodNumber;
  lt(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  protected setLimit(kind: "min" | "max", value: number, inclusive: boolean, message?: string): ZodNumber;
  _addCheck(check: ZodNumberCheck): ZodNumber;
  int(message?: errorUtil.ErrMessage): ZodNumber;
  positive(message?: errorUtil.ErrMessage): ZodNumber;
  negative(message?: errorUtil.ErrMessage): ZodNumber;
  nonpositive(message?: errorUtil.ErrMessage): ZodNumber;
  nonnegative(message?: errorUtil.ErrMessage): ZodNumber;
  multipleOf(value: number, message?: errorUtil.ErrMessage): ZodNumber;
  step: (value: number, message?: errorUtil.ErrMessage) => ZodNumber;
  finite(message?: errorUtil.ErrMessage): ZodNumber;
  safe(message?: errorUtil.ErrMessage): ZodNumber;
  get minValue(): number | null;
  get maxValue(): number | null;
  get isInt(): boolean;
  get isFinite(): boolean;
}
interface ZodBooleanDef extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodBoolean;
  coerce: boolean;
}
declare class ZodBoolean extends ZodType<boolean, ZodBooleanDef, boolean> {
  _parse(input: ParseInput): ParseReturnType<boolean>;
  static create: (params?: RawCreateParams & {
    coerce?: boolean;
  }) => ZodBoolean;
}
interface ZodArrayDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  type: T;
  typeName: ZodFirstPartyTypeKind.ZodArray;
  exactLength: {
    value: number;
    message?: string | undefined;
  } | null;
  minLength: {
    value: number;
    message?: string | undefined;
  } | null;
  maxLength: {
    value: number;
    message?: string | undefined;
  } | null;
}
type ArrayCardinality = "many" | "atleastone";
type arrayOutputType<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many"> = Cardinality extends "atleastone" ? [T["_output"], ...T["_output"][]] : T["_output"][];
declare class ZodArray<T extends ZodTypeAny, Cardinality extends ArrayCardinality = "many"> extends ZodType<arrayOutputType<T, Cardinality>, ZodArrayDef<T>, Cardinality extends "atleastone" ? [T["_input"], ...T["_input"][]] : T["_input"][]> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get element(): T;
  min(minLength: number, message?: errorUtil.ErrMessage): this;
  max(maxLength: number, message?: errorUtil.ErrMessage): this;
  length(len: number, message?: errorUtil.ErrMessage): this;
  nonempty(message?: errorUtil.ErrMessage): ZodArray<T, "atleastone">;
  static create: <El extends ZodTypeAny>(schema: El, params?: RawCreateParams) => ZodArray<El>;
}
type UnknownKeysParam = "passthrough" | "strict" | "strip";
interface ZodObjectDef<T extends ZodRawShape = ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  typeName: ZodFirstPartyTypeKind.ZodObject;
  shape: () => T;
  catchall: Catchall;
  unknownKeys: UnknownKeys;
}
type objectOutputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny, UnknownKeys extends UnknownKeysParam = UnknownKeysParam> = objectUtil.flatten<objectUtil.addQuestionMarks<baseObjectOutputType<Shape>>> & CatchallOutput<Catchall> & PassthroughType<UnknownKeys>;
type baseObjectOutputType<Shape extends ZodRawShape> = { [k in keyof Shape]: Shape[k]["_output"] };
type objectInputType<Shape extends ZodRawShape, Catchall extends ZodTypeAny, UnknownKeys extends UnknownKeysParam = UnknownKeysParam> = objectUtil.flatten<baseObjectInputType<Shape>> & CatchallInput<Catchall> & PassthroughType<UnknownKeys>;
type baseObjectInputType<Shape extends ZodRawShape> = objectUtil.addQuestionMarks<{ [k in keyof Shape]: Shape[k]["_input"] }>;
type CatchallOutput<T extends ZodType> = ZodType extends T ? unknown : {
  [k: string]: T["_output"];
};
type CatchallInput<T extends ZodType> = ZodType extends T ? unknown : {
  [k: string]: T["_input"];
};
type PassthroughType<T extends UnknownKeysParam> = T extends "passthrough" ? {
  [k: string]: unknown;
} : unknown;
type deoptional<T extends ZodTypeAny> = T extends ZodOptional<infer U> ? deoptional<U> : T extends ZodNullable<infer U> ? ZodNullable<deoptional<U>> : T;
declare class ZodObject<T extends ZodRawShape, UnknownKeys extends UnknownKeysParam = UnknownKeysParam, Catchall extends ZodTypeAny = ZodTypeAny, Output = objectOutputType<T, Catchall, UnknownKeys>, Input = objectInputType<T, Catchall, UnknownKeys>> extends ZodType<Output, ZodObjectDef<T, UnknownKeys, Catchall>, Input> {
  private _cached;
  _getCached(): {
    shape: T;
    keys: string[];
  };
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get shape(): T;
  strict(message?: errorUtil.ErrMessage): ZodObject<T, "strict", Catchall>;
  strip(): ZodObject<T, "strip", Catchall>;
  passthrough(): ZodObject<T, "passthrough", Catchall>;
  /**
   * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
   * If you want to pass through unknown properties, use `.passthrough()` instead.
   */
  nonstrict: () => ZodObject<T, "passthrough", Catchall>;
  extend<Augmentation extends ZodRawShape>(augmentation: Augmentation): ZodObject<objectUtil.extendShape<T, Augmentation>, UnknownKeys, Catchall>;
  /**
   * @deprecated Use `.extend` instead
   *  */
  augment: <Augmentation extends ZodRawShape>(augmentation: Augmentation) => ZodObject<objectUtil.extendShape<T, Augmentation>, UnknownKeys, Catchall>;
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge<Incoming extends AnyZodObject, Augmentation extends Incoming["shape"]>(merging: Incoming): ZodObject<objectUtil.extendShape<T, Augmentation>, Incoming["_def"]["unknownKeys"], Incoming["_def"]["catchall"]>;
  setKey<Key extends string, Schema extends ZodTypeAny>(key: Key, schema: Schema): ZodObject<T & { [k in Key]: Schema }, UnknownKeys, Catchall>;
  catchall<Index extends ZodTypeAny>(index: Index): ZodObject<T, UnknownKeys, Index>;
  pick<Mask extends util.Exactly<{ [k in keyof T]?: true }, Mask>>(mask: Mask): ZodObject<Pick<T, Extract<keyof T, keyof Mask>>, UnknownKeys, Catchall>;
  omit<Mask extends util.Exactly<{ [k in keyof T]?: true }, Mask>>(mask: Mask): ZodObject<Omit<T, keyof Mask>, UnknownKeys, Catchall>;
  /**
   * @deprecated
   */
  deepPartial(): partialUtil.DeepPartial<this>;
  partial(): ZodObject<{ [k in keyof T]: ZodOptional<T[k]> }, UnknownKeys, Catchall>;
  partial<Mask extends util.Exactly<{ [k in keyof T]?: true }, Mask>>(mask: Mask): ZodObject<objectUtil.noNever<{ [k in keyof T]: k extends keyof Mask ? ZodOptional<T[k]> : T[k] }>, UnknownKeys, Catchall>;
  required(): ZodObject<{ [k in keyof T]: deoptional<T[k]> }, UnknownKeys, Catchall>;
  required<Mask extends util.Exactly<{ [k in keyof T]?: true }, Mask>>(mask: Mask): ZodObject<objectUtil.noNever<{ [k in keyof T]: k extends keyof Mask ? deoptional<T[k]> : T[k] }>, UnknownKeys, Catchall>;
  keyof(): ZodEnum<enumUtil.UnionToTupleString<keyof T>>;
  static create: <Shape extends ZodRawShape>(shape: Shape, params?: RawCreateParams) => ZodObject<Shape, "strip", ZodTypeAny, objectOutputType<Shape, ZodTypeAny, "strip">, objectInputType<Shape, ZodTypeAny, "strip">>;
  static strictCreate: <Shape extends ZodRawShape>(shape: Shape, params?: RawCreateParams) => ZodObject<Shape, "strict">;
  static lazycreate: <Shape extends ZodRawShape>(shape: () => Shape, params?: RawCreateParams) => ZodObject<Shape, "strip">;
}
type AnyZodObject = ZodObject<any, any, any>;
type ZodUnionOptions = Readonly<[ZodTypeAny, ...ZodTypeAny[]]>;
interface ZodUnionDef<T extends ZodUnionOptions = Readonly<[ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>> extends ZodTypeDef {
  options: T;
  typeName: ZodFirstPartyTypeKind.ZodUnion;
}
declare class ZodUnion<T extends ZodUnionOptions> extends ZodType<T[number]["_output"], ZodUnionDef<T>, T[number]["_input"]> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get options(): T;
  static create: <Options extends Readonly<[ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>>(types: Options, params?: RawCreateParams) => ZodUnion<Options>;
}
interface ZodIntersectionDef<T extends ZodTypeAny = ZodTypeAny, U extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  left: T;
  right: U;
  typeName: ZodFirstPartyTypeKind.ZodIntersection;
}
declare class ZodIntersection<T extends ZodTypeAny, U extends ZodTypeAny> extends ZodType<T["_output"] & U["_output"], ZodIntersectionDef<T, U>, T["_input"] & U["_input"]> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <TSchema extends ZodTypeAny, USchema extends ZodTypeAny>(left: TSchema, right: USchema, params?: RawCreateParams) => ZodIntersection<TSchema, USchema>;
}
type ZodTupleItems = [ZodTypeAny, ...ZodTypeAny[]];
type AssertArray<T> = T extends any[] ? T : never;
type OutputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{ [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]["_output"] : never }>;
type OutputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...OutputTypeOfTuple<T>, ...Rest["_output"][]] : OutputTypeOfTuple<T>;
type InputTypeOfTuple<T extends ZodTupleItems | []> = AssertArray<{ [k in keyof T]: T[k] extends ZodType<any, any, any> ? T[k]["_input"] : never }>;
type InputTypeOfTupleWithRest<T extends ZodTupleItems | [], Rest extends ZodTypeAny | null = null> = Rest extends ZodTypeAny ? [...InputTypeOfTuple<T>, ...Rest["_input"][]] : InputTypeOfTuple<T>;
interface ZodTupleDef<T extends ZodTupleItems | [] = ZodTupleItems, Rest extends ZodTypeAny | null = null> extends ZodTypeDef {
  items: T;
  rest: Rest;
  typeName: ZodFirstPartyTypeKind.ZodTuple;
}
declare class ZodTuple<T extends ZodTupleItems | [] = ZodTupleItems, Rest extends ZodTypeAny | null = null> extends ZodType<OutputTypeOfTupleWithRest<T, Rest>, ZodTupleDef<T, Rest>, InputTypeOfTupleWithRest<T, Rest>> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get items(): T;
  rest<RestSchema extends ZodTypeAny>(rest: RestSchema): ZodTuple<T, RestSchema>;
  static create: <Items extends [ZodTypeAny, ...ZodTypeAny[]] | []>(schemas: Items, params?: RawCreateParams) => ZodTuple<Items, null>;
}
type EnumValues<T extends string = string> = readonly [T, ...T[]];
type Values<T extends EnumValues> = { [k in T[number]]: k };
interface ZodEnumDef<T extends EnumValues = EnumValues> extends ZodTypeDef {
  values: T;
  typeName: ZodFirstPartyTypeKind.ZodEnum;
}
type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type FilterEnum<Values, ToExclude> = Values extends [] ? [] : Values extends [infer Head, ...infer Rest] ? Head extends ToExclude ? FilterEnum<Rest, ToExclude> : [Head, ...FilterEnum<Rest, ToExclude>] : never;
type typecast<A, T> = A extends T ? A : never;
declare function createZodEnum<U extends string, T extends Readonly<[U, ...U[]]>>(values: T, params?: RawCreateParams): ZodEnum<Writeable<T>>;
declare function createZodEnum<U extends string, T extends [U, ...U[]]>(values: T, params?: RawCreateParams): ZodEnum<T>;
declare class ZodEnum<T extends [string, ...string[]]> extends ZodType<T[number], ZodEnumDef<T>, T[number]> {
  _cache: Set<T[number]> | undefined;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  get options(): T;
  get enum(): Values<T>;
  get Values(): Values<T>;
  get Enum(): Values<T>;
  extract<ToExtract extends readonly [T[number], ...T[number][]]>(values: ToExtract, newDef?: RawCreateParams): ZodEnum<Writeable<ToExtract>>;
  exclude<ToExclude extends readonly [T[number], ...T[number][]]>(values: ToExclude, newDef?: RawCreateParams): ZodEnum<typecast<Writeable<FilterEnum<T, ToExclude[number]>>, [string, ...string[]]>>;
  static create: typeof createZodEnum;
}
interface ZodPromiseDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  type: T;
  typeName: ZodFirstPartyTypeKind.ZodPromise;
}
declare class ZodPromise<T extends ZodTypeAny> extends ZodType<Promise<T["_output"]>, ZodPromiseDef<T>, Promise<T["_input"]>> {
  unwrap(): T;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <Inner extends ZodTypeAny>(schema: Inner, params?: RawCreateParams) => ZodPromise<Inner>;
}
type RefinementEffect<T> = {
  type: "refinement";
  refinement: (arg: T, ctx: RefinementCtx) => any;
};
type TransformEffect<T> = {
  type: "transform";
  transform: (arg: T, ctx: RefinementCtx) => any;
};
type PreprocessEffect<T> = {
  type: "preprocess";
  transform: (arg: T, ctx: RefinementCtx) => any;
};
type Effect<T> = RefinementEffect<T> | TransformEffect<T> | PreprocessEffect<T>;
interface ZodEffectsDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  schema: T;
  typeName: ZodFirstPartyTypeKind.ZodEffects;
  effect: Effect<any>;
}
declare class ZodEffects<T extends ZodTypeAny, Output = output<T>, Input = input<T>> extends ZodType<Output, ZodEffectsDef<T>, Input> {
  innerType(): T;
  sourceType(): T;
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <I extends ZodTypeAny>(schema: I, effect: Effect<I["_output"]>, params?: RawCreateParams) => ZodEffects<I, I["_output"]>;
  static createWithPreprocess: <I extends ZodTypeAny>(preprocess: (arg: unknown, ctx: RefinementCtx) => unknown, schema: I, params?: RawCreateParams) => ZodEffects<I, I["_output"], unknown>;
}
interface ZodOptionalDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  typeName: ZodFirstPartyTypeKind.ZodOptional;
}
declare class ZodOptional<T extends ZodTypeAny> extends ZodType<T["_output"] | undefined, ZodOptionalDef<T>, T["_input"] | undefined> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  unwrap(): T;
  static create: <Inner extends ZodTypeAny>(type: Inner, params?: RawCreateParams) => ZodOptional<Inner>;
}
interface ZodNullableDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  typeName: ZodFirstPartyTypeKind.ZodNullable;
}
declare class ZodNullable<T extends ZodTypeAny> extends ZodType<T["_output"] | null, ZodNullableDef<T>, T["_input"] | null> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  unwrap(): T;
  static create: <Inner extends ZodTypeAny>(type: Inner, params?: RawCreateParams) => ZodNullable<Inner>;
}
interface ZodDefaultDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  defaultValue: () => util.noUndefined<T["_input"]>;
  typeName: ZodFirstPartyTypeKind.ZodDefault;
}
declare class ZodDefault<T extends ZodTypeAny> extends ZodType<util.noUndefined<T["_output"]>, ZodDefaultDef<T>, T["_input"] | undefined> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  removeDefault(): T;
  static create: <Inner extends ZodTypeAny>(type: Inner, params: RawCreateParams & {
    default: Inner["_input"] | (() => util.noUndefined<Inner["_input"]>);
  }) => ZodDefault<Inner>;
}
interface ZodCatchDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  catchValue: (ctx: {
    error: ZodError;
    input: unknown;
  }) => T["_input"];
  typeName: ZodFirstPartyTypeKind.ZodCatch;
}
declare class ZodCatch<T extends ZodTypeAny> extends ZodType<T["_output"], ZodCatchDef<T>, unknown> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  removeCatch(): T;
  static create: <Inner extends ZodTypeAny>(type: Inner, params: RawCreateParams & {
    catch: Inner["_output"] | (() => Inner["_output"]);
  }) => ZodCatch<Inner>;
}
interface ZodBrandedDef<T extends ZodTypeAny> extends ZodTypeDef {
  type: T;
  typeName: ZodFirstPartyTypeKind.ZodBranded;
}
declare const BRAND: unique symbol;
type BRAND<T extends string | number | symbol> = {
  [BRAND]: { [k in T]: true };
};
declare class ZodBranded<T extends ZodTypeAny, B extends string | number | symbol> extends ZodType<T["_output"] & BRAND<B>, ZodBrandedDef<T>, T["_input"]> {
  _parse(input: ParseInput): ParseReturnType<any>;
  unwrap(): T;
}
interface ZodPipelineDef<A extends ZodTypeAny, B extends ZodTypeAny> extends ZodTypeDef {
  in: A;
  out: B;
  typeName: ZodFirstPartyTypeKind.ZodPipeline;
}
declare class ZodPipeline<A extends ZodTypeAny, B extends ZodTypeAny> extends ZodType<B["_output"], ZodPipelineDef<A, B>, A["_input"]> {
  _parse(input: ParseInput): ParseReturnType<any>;
  static create<ASchema extends ZodTypeAny, BSchema extends ZodTypeAny>(a: ASchema, b: BSchema): ZodPipeline<ASchema, BSchema>;
}
type BuiltIn = (((...args: any[]) => any) | (new (...args: any[]) => any)) | {
  readonly [Symbol.toStringTag]: string;
} | Date | Error | Generator | Promise<unknown> | RegExp;
type MakeReadonly<T> = T extends Map<infer K, infer V> ? ReadonlyMap<K, V> : T extends Set<infer V> ? ReadonlySet<V> : T extends [infer Head, ...infer Tail] ? readonly [Head, ...Tail] : T extends Array<infer V> ? ReadonlyArray<V> : T extends BuiltIn ? T : Readonly<T>;
interface ZodReadonlyDef<T extends ZodTypeAny = ZodTypeAny> extends ZodTypeDef {
  innerType: T;
  typeName: ZodFirstPartyTypeKind.ZodReadonly;
}
declare class ZodReadonly<T extends ZodTypeAny> extends ZodType<MakeReadonly<T["_output"]>, ZodReadonlyDef<T>, MakeReadonly<T["_input"]>> {
  _parse(input: ParseInput): ParseReturnType<this["_output"]>;
  static create: <Inner extends ZodTypeAny>(type: Inner, params?: RawCreateParams) => ZodReadonly<Inner>;
  unwrap(): T;
}
declare enum ZodFirstPartyTypeKind {
  ZodString = "ZodString",
  ZodNumber = "ZodNumber",
  ZodNaN = "ZodNaN",
  ZodBigInt = "ZodBigInt",
  ZodBoolean = "ZodBoolean",
  ZodDate = "ZodDate",
  ZodSymbol = "ZodSymbol",
  ZodUndefined = "ZodUndefined",
  ZodNull = "ZodNull",
  ZodAny = "ZodAny",
  ZodUnknown = "ZodUnknown",
  ZodNever = "ZodNever",
  ZodVoid = "ZodVoid",
  ZodArray = "ZodArray",
  ZodObject = "ZodObject",
  ZodUnion = "ZodUnion",
  ZodDiscriminatedUnion = "ZodDiscriminatedUnion",
  ZodIntersection = "ZodIntersection",
  ZodTuple = "ZodTuple",
  ZodRecord = "ZodRecord",
  ZodMap = "ZodMap",
  ZodSet = "ZodSet",
  ZodFunction = "ZodFunction",
  ZodLazy = "ZodLazy",
  ZodLiteral = "ZodLiteral",
  ZodEnum = "ZodEnum",
  ZodEffects = "ZodEffects",
  ZodNativeEnum = "ZodNativeEnum",
  ZodOptional = "ZodOptional",
  ZodNullable = "ZodNullable",
  ZodDefault = "ZodDefault",
  ZodCatch = "ZodCatch",
  ZodPromise = "ZodPromise",
  ZodBranded = "ZodBranded",
  ZodPipeline = "ZodPipeline",
  ZodReadonly = "ZodReadonly"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/cli/globalSettings.d.ts
declare const userSettingSchema: ZodObject<{
  version: ZodNumber;
  userSince: ZodOptional<ZodNumber>;
  init: ZodOptional<ZodObject<{
    skipOnboarding: ZodOptional<ZodBoolean>;
  }, "strip", ZodTypeAny, {
    skipOnboarding?: boolean | undefined;
  }, {
    skipOnboarding?: boolean | undefined;
  }>>;
  checklist: ZodOptional<ZodObject<{
    items: ZodOptional<ZodObject<{
      accessibilityTests: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      aiSetup: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      autodocs: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      ciTests: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      controls: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      coverage: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      guidedTour: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      installA11y: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      installChromatic: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      installDocs: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      installVitest: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      mdxDocs: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      moreComponents: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      moreStories: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      onboardingSurvey: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      organizeStories: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      publishStorybook: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      shareStorybook: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      renderComponent: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      runTests: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      viewports: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      visualTests: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      whatsNewStorybook10: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
      writeInteractions: ZodOptional<ZodObject<{
        status: ZodOptional<ZodEnum<["open", "accepted", "done", "skipped"]>>;
        mutedAt: ZodOptional<ZodNumber>;
      }, "strict", ZodTypeAny, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }, {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      }>>;
    }, "strip", ZodTypeAny, {
      accessibilityTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      aiSetup?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      autodocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      ciTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      controls?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      coverage?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      guidedTour?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installA11y?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installChromatic?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installVitest?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      mdxDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreComponents?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      onboardingSurvey?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      organizeStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      publishStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      shareStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      renderComponent?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      runTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      viewports?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      visualTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      whatsNewStorybook10?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      writeInteractions?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
    }, {
      accessibilityTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      aiSetup?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      autodocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      ciTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      controls?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      coverage?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      guidedTour?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installA11y?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installChromatic?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installVitest?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      mdxDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreComponents?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      onboardingSurvey?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      organizeStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      publishStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      shareStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      renderComponent?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      runTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      viewports?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      visualTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      whatsNewStorybook10?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      writeInteractions?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
    }>>;
    widget: ZodOptional<ZodObject<{
      disable: ZodOptional<ZodBoolean>;
    }, "strip", ZodTypeAny, {
      disable?: boolean | undefined;
    }, {
      disable?: boolean | undefined;
    }>>;
  }, "strip", ZodTypeAny, {
    items?: {
      accessibilityTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      aiSetup?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      autodocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      ciTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      controls?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      coverage?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      guidedTour?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installA11y?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installChromatic?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installVitest?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      mdxDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreComponents?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      onboardingSurvey?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      organizeStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      publishStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      shareStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      renderComponent?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      runTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      viewports?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      visualTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      whatsNewStorybook10?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      writeInteractions?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
    } | undefined;
    widget?: {
      disable?: boolean | undefined;
    } | undefined;
  }, {
    items?: {
      accessibilityTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      aiSetup?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      autodocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      ciTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      controls?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      coverage?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      guidedTour?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installA11y?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installChromatic?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installVitest?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      mdxDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreComponents?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      onboardingSurvey?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      organizeStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      publishStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      shareStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      renderComponent?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      runTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      viewports?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      visualTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      whatsNewStorybook10?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      writeInteractions?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
    } | undefined;
    widget?: {
      disable?: boolean | undefined;
    } | undefined;
  }>>;
}, "strip", ZodTypeAny, {
  version: number;
  userSince?: number | undefined;
  init?: {
    skipOnboarding?: boolean | undefined;
  } | undefined;
  checklist?: {
    items?: {
      accessibilityTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      aiSetup?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      autodocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      ciTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      controls?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      coverage?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      guidedTour?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installA11y?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installChromatic?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installVitest?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      mdxDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreComponents?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      onboardingSurvey?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      organizeStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      publishStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      shareStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      renderComponent?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      runTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      viewports?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      visualTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      whatsNewStorybook10?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      writeInteractions?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
    } | undefined;
    widget?: {
      disable?: boolean | undefined;
    } | undefined;
  } | undefined;
}, {
  version: number;
  userSince?: number | undefined;
  init?: {
    skipOnboarding?: boolean | undefined;
  } | undefined;
  checklist?: {
    items?: {
      accessibilityTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      aiSetup?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      autodocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      ciTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      controls?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      coverage?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      guidedTour?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installA11y?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installChromatic?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      installVitest?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      mdxDocs?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreComponents?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      moreStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      onboardingSurvey?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      organizeStories?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      publishStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      shareStorybook?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      renderComponent?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      runTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      viewports?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      visualTests?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      whatsNewStorybook10?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
      writeInteractions?: {
        status?: "accepted" | "done" | "open" | "skipped" | undefined;
        mutedAt?: number | undefined;
      } | undefined;
    } | undefined;
    widget?: {
      disable?: boolean | undefined;
    } | undefined;
  } | undefined;
}>;
declare function globalSettings(filePath?: string): Promise<Settings>;
declare function _clearGlobalSettings(): void;
/**
 * A class for reading and writing settings from a JSON file. Supports nested settings with dot
 * notation.
 */
declare class Settings {
  private filePath;
  value: TypeOf<typeof userSettingSchema>;
  /**
   * Create a new Settings instance
   *
   * @param filePath Path to the JSON settings file
   * @param value Loaded value of settings
   */
  constructor(filePath: string, value: TypeOf<typeof userSettingSchema>);
  /** Save settings to the file */
  save(): Promise<void>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/checklist-store/index.d.ts
/** ChecklistState is the persisted state, which may be incomplete */
type ChecklistState = NonNullable<Awaited<ReturnType<typeof globalSettings>>['value']['checklist']>;
/** Store uses initialState to ensure all items are present */
type StoreState = Required<Omit<ChecklistState, 'items'>> & {
  items: NonNullable<Required<ChecklistState['items']>>;
  loaded?: boolean; /** True unless the user opted out from AI during `storybook init`. Set by the server from the event cache. Treat empty values as true.*/
  aiOptIn?: boolean; /** True when the user ran the AI setup at some point in the past. Treat empty values as false.*/
  aiSetupRun?: boolean;
};
type ItemId = keyof StoreState['items'];
type StoreEvent = {
  type: 'accept';
  payload: ItemId;
} | {
  type: 'done';
  payload: ItemId;
} | {
  type: 'skip';
  payload: ItemId;
} | {
  type: 'reset';
  payload: ItemId;
} | {
  type: 'mute';
  payload: Array<ItemId>;
} | {
  type: 'disable';
  payload: boolean;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/manager-api/stores/checklist.d.ts
declare const universalChecklistStore: UniversalStore<StoreState, StoreEvent>;
declare const checklistStore: {
  getValue: (id: ItemId) => {
    status?: "accepted" | "done" | "open" | "skipped" | undefined;
    mutedAt?: number | undefined;
  };
  accept: (id: ItemId) => void;
  done: (id: ItemId) => void;
  skip: (id: ItemId) => void;
  reset: (id: ItemId) => void;
  mute: (itemIds: Array<ItemId>) => void;
  disable: (value: boolean) => void;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/constants/tags.d.ts
/** System tags used throughout Storybook for categorizing and filtering stories and docs entries. */
declare const Tag$4: {
  /** Indicates that autodocs should be generated for this component */readonly AUTODOCS: 'autodocs'; /** MDX documentation attached to a component's stories file */
  readonly ATTACHED_MDX: 'attached-mdx'; /** Standalone MDX documentation not attached to stories */
  readonly UNATTACHED_MDX: 'unattached-mdx'; /** Story has a play function */
  readonly PLAY_FN: 'play-fn'; /** Story has a test function */
  readonly TEST_FN: 'test-fn'; /** Development environment tag */
  readonly DEV: 'dev'; /** Test environment tag */
  readonly TEST: 'test'; /** Manifest generation tag */
  readonly MANIFEST: 'manifest';
};
/**
 * Tags can be any string, including custom user-defined tags. The Tag constant above defines the
 * system tags used by Storybook.
 */
type Tag$4 = string;
//#endregion
//#region node_modules/@standard-schema/spec/dist/index.d.ts
/** The Standard Typed interface. This is a base type extended by other specs. */
interface StandardTypedV1<Input = unknown, Output = Input> {
  /** The Standard properties. */
  readonly "~standard": StandardTypedV1.Props<Input, Output>;
}
declare namespace StandardTypedV1 {
  /** The Standard Typed properties interface. */
  interface Props<Input = unknown, Output = Input> {
    /** The version number of the standard. */
    readonly version: 1;
    /** The vendor name of the schema library. */
    readonly vendor: string;
    /** Inferred types associated with the schema. */
    readonly types?: Types<Input, Output> | undefined;
  }
  /** The Standard Typed types interface. */
  interface Types<Input = unknown, Output = Input> {
    /** The input type of the schema. */
    readonly input: Input;
    /** The output type of the schema. */
    readonly output: Output;
  }
  /** Infers the input type of a Standard Typed. */
  type InferInput<Schema extends StandardTypedV1> = NonNullable<Schema["~standard"]["types"]>["input"];
  /** Infers the output type of a Standard Typed. */
  type InferOutput<Schema extends StandardTypedV1> = NonNullable<Schema["~standard"]["types"]>["output"];
}
/** The Standard Schema interface. */
interface StandardSchemaV1<Input = unknown, Output = Input> {
  /** The Standard Schema properties. */
  readonly "~standard": StandardSchemaV1.Props<Input, Output>;
}
declare namespace StandardSchemaV1 {
  /** The Standard Schema properties interface. */
  interface Props<Input = unknown, Output = Input> extends StandardTypedV1.Props<Input, Output> {
    /** Validates unknown input values. */
    readonly validate: (value: unknown, options?: StandardSchemaV1.Options | undefined) => Result<Output> | Promise<Result<Output>>;
  }
  /** The result interface of the validate function. */
  type Result<Output> = SuccessResult<Output> | FailureResult;
  /** The result interface if validation succeeds. */
  interface SuccessResult<Output> {
    /** The typed output value. */
    readonly value: Output;
    /** A falsy value for `issues` indicates success. */
    readonly issues?: undefined;
  }
  interface Options {
    /** Explicit support for additional vendor-specific parameters, if needed. */
    readonly libraryOptions?: Record<string, unknown> | undefined;
  }
  /** The result interface if validation fails. */
  interface FailureResult {
    /** The issues of failed validation. */
    readonly issues: ReadonlyArray<Issue>;
  }
  /** The issue interface of the failure output. */
  interface Issue {
    /** The error message of the issue. */
    readonly message: string;
    /** The path of the issue, if any. */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined;
  }
  /** The path segment interface of the issue. */
  interface PathSegment {
    /** The key representing a path segment. */
    readonly key: PropertyKey;
  }
  /** The Standard types interface. */
  interface Types<Input = unknown, Output = Input> extends StandardTypedV1.Types<Input, Output> {}
  /** Infers the input type of a Standard. */
  type InferInput<Schema extends StandardTypedV1> = StandardTypedV1.InferInput<Schema>;
  /** Infers the output type of a Standard. */
  type InferOutput<Schema extends StandardTypedV1> = StandardTypedV1.InferOutput<Schema>;
}
/** The Standard JSON Schema interface. */
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/types.d.ts
/** File map used by static snapshot building. Each key represents one serialized state snapshot. */
type StaticStore = Record<string, unknown>;
/** Generic Standard Schema constraint used across open-service definitions. */
type AnySchema = StandardSchemaV1<unknown, unknown>;
/** Stable alias for service identifiers across definition, runtime, and registration APIs. */
type ServiceId = string;
/**
 * Constrains a service's state to a plain object — the only shape the architecture supports.
 *
 * This is not an arbitrary restriction; two layers require it:
 *
 * 1. State is wrapped in a `deepSignal` proxy for fine-grained per-field reactivity, and `deepSignal`
 *    throws ("this object can't be observed") on primitives, `null`, and `undefined` — there are no
 *    fields to track on a scalar.
 * 2. Cross-peer sync (`applyStatePatch` in `service-sync.ts`) merges state by walking object keys;
 *    it has no notion of replacing a whole scalar, so the wire protocol only carries keyed objects.
 *
 * Arrays are technically observable by `deepSignal` but are still rejected here: `applyStatePatch`
 * replaces arrays wholesale rather than merging by key, so a *top-level* array state would silently
 * fail to sync between peers. Wrap collections in a field instead (`{ items: [...] }`).
 *
 * Authoring helpers pair this with an `extends object` bound (which rejects primitives, `null`, and
 * `undefined` while still accepting both `interface` and `type` declarations). The naked `TState` in
 * the intersection keeps it transparent to inference; only an array collapses to the branded error.
 */
type ServiceState<TState> = TState & (TState extends readonly unknown[] ? {
  __openServiceStateError: 'Service state must be a plain object, not an array.';
} : unknown);
/** Public schema shape exposed when describing a schema-backed service contract. */
type SchemaDescriptor = AnySchema;
/** Raw caller-facing value type accepted by a schema-backed operation. */
type InferSchemaInput<TSchema extends AnySchema> = StandardSchemaV1.InferInput<TSchema>;
/** Parsed value type produced by a schema after validation. */
type InferSchemaOutput<TSchema extends AnySchema> = StandardSchemaV1.InferOutput<TSchema>;
/**
 * Named schema maps are the core inference surface for inline open-service authoring.
 *
 * `defineService()` infers one input-schema map and one output-schema map per operation family
 * (queries and commands). Keeping those maps separate gives TypeScript a place to correlate the
 * `input` and `output` properties of each inline object before it contextually types sibling
 * callbacks like `handler`, `load`, `staticPath`, and `staticInputs`.
 */
type OperationInputSchemas = Record<string, AnySchema>;
/**
 * Output-schema maps must stay key-aligned with their input-schema map.
 *
 * The authoring helper uses this alias instead of a plain `Record<string, AnySchema>` so each
 * operation key retains its own input/output schema pair during inference.
 */
type MatchingOutputSchemas<TInputSchemas extends OperationInputSchemas> = { [TKey in keyof TInputSchemas]: AnySchema };
/**
 * Internal utility used to keep handler maps assignable without collapsing everything to `unknown`.
 */
type BivariantCallback<TArgs extends unknown[], TResult> = {
  bivarianceHack(...args: TArgs): TResult;
}['bivarianceHack'];
/** Runtime shape shared by all command collections after they are built. */
type Command = Record<string, (input: unknown) => Promise<unknown>>;
/**
 * Runtime command map derived directly from the inferred command schema maps.
 *
 * Queries only need command-call typing, not the full command definition objects, so this helper
 * keeps query contexts readable while still preserving exact input/output types per command.
 */
type CommandFunctions<TCommandInputSchemas extends OperationInputSchemas, TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas>> = { [TKey in keyof TCommandInputSchemas]: BivariantCallback<[input: InferSchemaInput<TCommandInputSchemas[TKey]>], Promise<InferSchemaOutput<TCommandOutputSchemas[TKey]>>> };
/**
 * Coarse lifecycle of a query's `load`, modeled after TanStack Query's `status`.
 *
 * - `pending` — no successful load has completed yet (and none has failed). The query may still
 *   expose `data` (the synchronous "current best" handler result), but nothing has been loaded.
 * - `error` — the most recent attempt (load rejection, or a synchronous handler / validation throw)
 *   failed. `data` keeps the last successful value, if any.
 * - `success` — a load has completed (or the query has no `load`, so there is nothing to load).
 */
type QueryStatus = 'pending' | 'error' | 'success';
/**
 * Whether a `load` is currently running, modeled after TanStack Query's `fetchStatus` — but named
 * with our own `load` vocabulary because open-service "loads" are any slow async work (computation,
 * extraction, I/O), not specifically remote fetching.
 *
 * - `loading` — a `load` is in flight (the first load, or a reactive background re-load).
 * - `idle` — no `load` is currently running.
 */
type LoadStatus = 'loading' | 'idle';
/**
 * The reactive state of a subscribed query: its current `data` plus the lifecycle of its `load`.
 *
 * `data` and `status` are independent. `data` is the synchronous handler result ("current best
 * effort") and holds the last successful value (or `undefined` before the first success / when a
 * handler throws), while `status`/`loadStatus`/`error` describe the asynchronous `load` lifecycle
 * tracked per subscription. A query with no `load` is `success`/`idle` from its first emission.
 *
 * `isLoading` is intentionally "any load in flight" (TanStack's `isFetching`), and
 * `isInitialLoading` is "a load is in flight and there is nothing to show yet"; the names follow our
 * `load` vocabulary rather than TanStack's `fetch`/`load` split. Unlike TanStack Query, a
 * subscription here can attach to a query whose `data` is already cached in service state, so
 * `isInitialLoading` additionally requires `data === undefined` — it never flags over cached data.
 */
type QueryState<TData> = {
  /** Last successfully produced value; `undefined` before the first success. */data: TData | undefined; /** The failure that produced `status: 'error'`, otherwise `undefined`. */
  error: Error | undefined;
  status: QueryStatus;
  loadStatus: LoadStatus; /** `status === 'pending'`. */
  isPending: boolean; /** `status === 'success'`. */
  isSuccess: boolean; /** `status === 'error'`. */
  isError: boolean; /** `loadStatus === 'loading'` — any load in flight, foreground or background. */
  isLoading: boolean; /** `isPending && isLoading && data === undefined` — a first load with nothing to show yet. */
  isInitialLoading: boolean; /** `isLoading && !isPending` — a background re-load while data is already shown. */
  isRefreshing: boolean;
};
/**
 * Public runtime shape of a query.
 *
 * - `.get(input)` reads synchronously: it validates input, runs the handler against current state,
 *   and returns the validated result. It does **not** fire the query's `load` — it is a pure
 *   "current best effort" read. (Reads of *other* queries from inside a handler or `load` body still
 *   participate in dependency tracking, so `.loaded()` and subscriptions trigger those dependency
 *   loads; a bare consumer `.get()` does not.)
 * - `.loaded(input)` awaits the full load — this query's `load` plus every transitively read
 *   dependency — before resolving with the validated result.
 * - `.subscribe(input, callback)` invokes `callback` synchronously with the current {@link QueryState}
 *   and again whenever tracked state or the load lifecycle changes (deduped on the whole state).
 *   Subscribing is what fires the query's reactive `load`.
 *
 * There is intentionally no bare-call form: a previous `query(input)` that returned synchronously
 * *and* fired the `load` behind the scenes was removed because the implicit background load was
 * confusing. Read with `.get(input)`, await with `.loaded(input)`, observe with `.subscribe(...)`.
 *
 * Queries whose input schema resolves to `undefined` (for example `v.void()`) may be called with
 * zero arguments: `query.get()`, `query.loaded()`.
 */
type InputQuery<TInput, TOutput> = {
  get(input: TInput): TOutput;
  loaded(input: TInput): Promise<TOutput>;
  subscribe(input: TInput, callback: (state: QueryState<TOutput>) => void): () => void;
  subscribe<TSelected>(input: TInput, selector: (value: TOutput) => TSelected, callback: (state: QueryState<TSelected>) => void): () => void;
};
/** Zero-argument overloads merged into {@link Query} when the input schema is void. */
type VoidQuery<TOutput> = {
  get(): TOutput;
  loaded(): Promise<TOutput>;
  subscribe(callback: (state: QueryState<TOutput>) => void): () => void;
  subscribe<TSelected>(selector: (value: TOutput) => TSelected, callback: (state: QueryState<TSelected>) => void): () => void;
};
type Query<TInput, TOutput> = undefined extends TInput ? VoidQuery<TOutput> & InputQuery<TInput, TOutput> : InputQuery<TInput, TOutput>;
/**
 * Runtime query map derived directly from the inferred query schema maps.
 *
 * The query counterpart to {@link CommandFunctions}: it preserves each sibling query's exact
 * input/output types on the read-only `self.queries` handle, so a handler or `load` can call
 * `self.queries.someQuery.get(input)` without manual casts. `defineService` computes this map from
 * the inferred query schema maps and threads it into the handler/load contexts as their `TQueries`;
 * the erased {@link AnyQueryFunctions} bound is used everywhere the concrete map is not known.
 */
type QueryFunctions<TQueryInputSchemas extends OperationInputSchemas, TQueryOutputSchemas extends MatchingOutputSchemas<TQueryInputSchemas>> = { [TKey in keyof TQueryInputSchemas]: Query<InferSchemaInput<TQueryInputSchemas[TKey]>, InferSchemaOutput<TQueryOutputSchemas[TKey]>> };
/**
 * Permissive bound for a `self.queries` handle.
 *
 * Every {@link Query} — input or void — structurally satisfies {@link InputQuery} (the void
 * overloads are additive), so this is the supertype that any concrete {@link QueryFunctions} map is
 * assignable to. It is the bound (and erased default) for the `TQueries` parameter below, which lets
 * the precise per-service map flow into handler contexts while still erasing cleanly into the
 * structural `AnyQueryDefinition` storage constraint. Using `Query<unknown, unknown>` here instead
 * would wrongly demand the void zero-arg overloads from input queries.
 */
type AnyQueryFunctions = Record<string, InputQuery<unknown, unknown>>;
/**
 * Read-only service handle exposed to query handlers.
 *
 * Query handlers are strict readers: they can read state and call sibling queries, but they cannot
 * mutate state and cannot invoke commands. Mutations belong in commands; load-side preparation
 * belongs in `load`.
 */
type QuerySelf<TState = unknown, TQueries extends AnyQueryFunctions = AnyQueryFunctions> = {
  readonly state: TState;
  queries: TQueries;
};
/**
 * Load handle exposed to `load` functions.
 *
 * `load` may read state and queries, and may invoke declared commands to mutate state. It does
 * not receive `setState` directly — all writes must flow through commands so authors keep one
 * documented mutation surface per service.
 */
type LoadSelf<TState = unknown, TCommandInputSchemas extends OperationInputSchemas = OperationInputSchemas, TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas> = MatchingOutputSchemas<TCommandInputSchemas>, TQueries extends AnyQueryFunctions = AnyQueryFunctions> = QuerySelf<TState, TQueries> & {
  commands: CommandFunctions<TCommandInputSchemas, TCommandOutputSchemas>;
};
/**
 * Mutable service handle exposed to command handlers.
 *
 * Commands receive both `setState` for direct state mutation and `commands` so one command can
 * delegate to another within the same service.
 */
type CommandSelf<TState = unknown, TCommandInputSchemas extends OperationInputSchemas = OperationInputSchemas, TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas> = MatchingOutputSchemas<TCommandInputSchemas>, TQueries extends AnyQueryFunctions = AnyQueryFunctions> = LoadSelf<TState, TCommandInputSchemas, TCommandOutputSchemas, TQueries> & {
  setState(mutate: (state: TState) => void): void;
};
type ServiceSummary = {
  id: ServiceId;
  description?: string;
  queryNames: string[];
  commandNames: string[];
};
type OperationDescriptor = {
  name: string;
  description?: string;
  input: SchemaDescriptor;
  output: SchemaDescriptor; /** Present when the query declares `staticPath` at definition time. */
  staticPath?: true;
};
type ServiceDescriptor = {
  id: ServiceId;
  description?: string;
  queries: Record<string, OperationDescriptor>;
  commands: Record<string, OperationDescriptor>;
};
/** Context passed to query handlers. */
type QueryCtx<TState, TQueries extends AnyQueryFunctions = AnyQueryFunctions> = {
  self: QuerySelf<TState, TQueries>;
  getService: ServiceRegistryApi['getService'];
};
/** Context passed to `load` functions and static-input enumerators. */
type LoadCtx<TState, TCommandInputSchemas extends OperationInputSchemas = OperationInputSchemas, TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas> = MatchingOutputSchemas<TCommandInputSchemas>, TQueries extends AnyQueryFunctions = AnyQueryFunctions> = {
  self: LoadSelf<TState, TCommandInputSchemas, TCommandOutputSchemas, TQueries>;
  getService: ServiceRegistryApi['getService'];
};
/** Static input enumerator stored on registered definitions; always receives load context. */
type RegisteredStaticInputs<TState> = BivariantCallback<[ctx: LoadCtx<TState>], unknown[] | Promise<unknown[]>>;
/** Context passed to command handlers. */
type CommandCtx<TState, TCommandInputSchemas extends OperationInputSchemas = OperationInputSchemas, TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas> = MatchingOutputSchemas<TCommandInputSchemas>, TQueries extends AnyQueryFunctions = AnyQueryFunctions> = {
  self: CommandSelf<TState, TCommandInputSchemas, TCommandOutputSchemas, TQueries>;
  getService: ServiceRegistryApi['getService'];
};
/**
 * Declarative definition for one query.
 *
 * Queries validate caller input synchronously, run a synchronous read-only handler, and validate
 * the resolved output. The optional `load` hook is fired by subscriptions (reactively) and by
 * `.loaded()` callers (drained to completion), deduped per `(service, query, input)` while one is
 * already in flight — a bare `.get()` read never fires it.
 *
 * Queries that participate in static JSON generation declare `staticPath` at definition time.
 * `staticInputs` may also be declared here when the input list has no runtime dependencies; inputs
 * that need registry or story-index context belong in server registration instead.
 */
type QueryDefinition<TState, TInputSchema extends AnySchema, TOutputSchema extends AnySchema, TCommandInputSchemas extends OperationInputSchemas = OperationInputSchemas, TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas> = MatchingOutputSchemas<TCommandInputSchemas>, TQueries extends AnyQueryFunctions = AnyQueryFunctions> = {
  description?: string;
  /**
   * When true, hides this query from `describeService()` output. Defaults to false. Does not disable
   * the query at runtime — callers with a service handle can still invoke it.
   */
  internal?: boolean;
  input: TInputSchema;
  output: TOutputSchema; /** Logical path for the serialized state snapshot, relative to this service's output folder. */
  staticPath?: BivariantCallback<[input: InferSchemaOutput<TInputSchema>], string>; /** Dependency-free static build inputs declared alongside the public contract. */
  staticInputs?: BivariantCallback<[], InferSchemaInput<TInputSchema>[] | Promise<InferSchemaInput<TInputSchema>[]>>;
  handler?: BivariantCallback<[input: InferSchemaOutput<TInputSchema>, ctx: QueryCtx<TState, TQueries>], InferSchemaInput<TOutputSchema>>;
  load?: BivariantCallback<[input: InferSchemaOutput<TInputSchema>, ctx: LoadCtx<TState, TCommandInputSchemas, TCommandOutputSchemas, TQueries>], void | Promise<void>>;
};
/**
 * Declarative definition for one command.
 *
 * Commands validate caller input, run against a mutable context, and validate the resolved output.
 */
type CommandDefinition<TState, TInputSchema extends AnySchema, TOutputSchema extends AnySchema, TCommandInputSchemas extends OperationInputSchemas = OperationInputSchemas, TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas> = MatchingOutputSchemas<TCommandInputSchemas>, TQueries extends AnyQueryFunctions = AnyQueryFunctions> = {
  description?: string;
  /**
   * When true, hides this command from `describeService()` output. Defaults to false. Does not
   * disable the command at runtime — callers with a service handle can still invoke it.
   */
  internal?: boolean;
  input: TInputSchema;
  output: TOutputSchema;
  handler?: BivariantCallback<[input: InferSchemaOutput<TInputSchema>, ctx: CommandCtx<TState, TCommandInputSchemas, TCommandOutputSchemas, TQueries>], InferSchemaInput<TOutputSchema> | Promise<InferSchemaInput<TOutputSchema>>>;
};
/** Internal structural constraint used to store any query definition in a record. */
type AnyQueryDefinition<TState> = {
  description?: string;
  internal?: boolean;
  input: AnySchema;
  output: AnySchema;
  staticPath?: BivariantCallback<[input: unknown], string>;
  staticInputs?: RegisteredStaticInputs<TState>;
  handler?: BivariantCallback<[input: unknown, ctx: QueryCtx<TState>], unknown>;
  load?: BivariantCallback<[input: unknown, ctx: LoadCtx<TState>], void | Promise<void>>;
};
/** Internal structural constraint used to store any command definition in a record. */
type AnyCommandDefinition<TState> = {
  description?: string;
  internal?: boolean;
  input: AnySchema;
  output: AnySchema;
  handler?: BivariantCallback<[input: unknown, ctx: CommandCtx<TState>], unknown | Promise<unknown>>;
};
/** Named query map attached to a service definition. */
type Queries<TState> = Record<string, AnyQueryDefinition<TState>>;
/** Named command map attached to a service definition. */
type Commands<TState> = Record<string, AnyCommandDefinition<TState>>;
/** Top-level description of a service: identity, initial state, queries, and commands. */
type ServiceDefinition<TState, TQueries extends Queries<TState>, TCommands extends Commands<TState>, TId extends ServiceId = ServiceId> = {
  id: TId;
  description?: string;
  /**
   * When true, hides this service from `listServices()` output. Defaults to false. Does not disable
   * the service at runtime — callers can still resolve it through `getService()`.
   */
  internal?: boolean;
  /**
   * Initial state for the service. Must be a plain object (not a primitive, `null`, or array) — see
   * {@link ServiceState} for why. The authoring boundary (`defineService`) enforces this; the runtime
   * type stays `TState` so already-constructed definitions flow through the registry unchanged.
   */
  initialState: TState;
  queries: TQueries;
  commands: TCommands;
};
/** Structural constraint for any service definition stored in the registry. */
type AnyServiceDefinition = ServiceDefinition<unknown, Queries<unknown>, Commands<unknown>>;
/** Runtime service instance derived from a `ServiceDefinition`. */
type ServiceInstance<TState, TQueries extends Queries<TState>, TCommands extends Commands<TState>> = {
  queries: { [TKey in keyof TQueries]: TQueries[TKey] extends {
    input: infer TInputSchema extends AnySchema;
    output: infer TOutputSchema extends AnySchema;
  } ? Query<InferSchemaInput<TInputSchema>, InferSchemaOutput<TOutputSchema>> : never };
  commands: { [TKey in keyof TCommands]: TCommands[TKey] extends {
    input: infer TInputSchema extends AnySchema;
    output: infer TOutputSchema extends AnySchema;
  } ? (input: InferSchemaInput<TInputSchema>) => Promise<InferSchemaOutput<TOutputSchema>> : never };
};
/** Runtime instance type recovered from one authored service definition. */
type ServiceInstanceOf<TDefinition extends AnyServiceDefinition> = TDefinition extends ServiceDefinition<infer TState, infer TQueries, infer TCommands> ? ServiceInstance<TState, TQueries, TCommands> : never;
interface ServiceRegistryApi {
  listServices(): Promise<ServiceSummary[]>;
  describeService(serviceId: ServiceId): Promise<ServiceDescriptor>;
  getService<TInstance = RuntimeService>(serviceId: ServiceId): TInstance;
}
type RuntimeService = ServiceInstance<unknown, Queries<unknown>, Commands<unknown>> & ServiceRegistryApi;
type ServiceQueryRegistration<TState> = {
  /** Static build inputs that may depend on registry or other server context. */staticInputs?: RegisteredStaticInputs<TState>;
};
type ServiceCommandRegistration<TState, TCommand extends AnyCommandDefinition<TState>> = Pick<TCommand, 'handler'>;
type ServiceRegistrationOptions<TState, TQueries extends Queries<TState>, TCommands extends Commands<TState>> = {
  queries?: { [TKey in keyof TQueries]?: ServiceQueryRegistration<TState> };
  commands?: { [TKey in keyof TCommands]?: ServiceCommandRegistration<TState, TCommands[TKey]> };
};
type ServerServiceRegistration<TState, TQueries extends Queries<TState>, TCommands extends Commands<TState>> = {
  definition: ServiceDefinition<TState, TQueries, TCommands>;
} & ServiceRegistrationOptions<TState, TQueries, TCommands>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/service-definition.d.ts
type InvalidInternalOperationName<TName extends string> = {
  __internal_naming_error: `Operation "${TName}" has internal: true but must be prefixed with "_"`;
};
type InvalidUnderscoreWithoutInternal<TName extends string> = {
  __internal_naming_error: `Operation "${TName}" is prefixed with "_" and must set internal: true`;
};
type InternalOperationNaming<TKey> = TKey extends string ? TKey extends `_${string}` ? {
  internal: true;
} | InvalidUnderscoreWithoutInternal<TKey> : {
  internal?: false;
} | InvalidInternalOperationName<TKey> : {};
/**
 * Authoring-side query map derived from separate query input/output schema maps.
 *
 * The second mapped-type intersection is deliberate. During experiments, TypeScript would infer
 * the `input` schema for each inline query, but then lose the corresponding `output` schema before
 * it contextually typed sibling callbacks. Repeating the output map through a keyed `output` view
 * keeps each query key's input and output schemas correlated while handlers, load hooks, and
 * static callbacks are being typed.
 */
type DefinedQueries<TState, TQueryInputSchemas extends OperationInputSchemas, TQueryOutputSchemas extends MatchingOutputSchemas<TQueryInputSchemas>, TCommandInputSchemas extends OperationInputSchemas, TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas>> = { [TKey in keyof TQueryInputSchemas]: QueryDefinition<TState, TQueryInputSchemas[TKey], TQueryOutputSchemas[TKey], TCommandInputSchemas, TCommandOutputSchemas, QueryFunctions<TQueryInputSchemas, TQueryOutputSchemas>> & InternalOperationNaming<TKey> } & { [TKey in keyof TQueryOutputSchemas]: {
  output: TQueryOutputSchemas[TKey];
} };
/**
 * Authoring-side command map derived from separate command input/output schema maps.
 *
 * Commands do not need access to the command schema maps in their own context, but they still
 * benefit from the same key-correlation trick as queries so TypeScript preserves each inline
 * command object's `output` schema while typing its `handler`.
 */
type DefinedCommands<TState, TCommandInputSchemas extends OperationInputSchemas, TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas>, TQueryInputSchemas extends OperationInputSchemas, TQueryOutputSchemas extends MatchingOutputSchemas<TQueryInputSchemas>> = { [TKey in keyof TCommandInputSchemas]: CommandDefinition<TState, TCommandInputSchemas[TKey], TCommandOutputSchemas[TKey], TCommandInputSchemas, TCommandOutputSchemas, QueryFunctions<TQueryInputSchemas, TQueryOutputSchemas>> & InternalOperationNaming<TKey> } & { [TKey in keyof TCommandOutputSchemas]: {
  output: TCommandOutputSchemas[TKey];
} };
/**
 * Finalizes a service definition while preserving inline query and command inference.
 *
 * The generic order matters here. We infer the per-operation schema maps first, then derive the
 * concrete query/command definition maps from those schemas. If we instead ask TypeScript to infer
 * the full runtime `ServiceDefinition` maps directly, it widens callback parameters to `unknown`
 * before it has correlated each inline object's `input` and `output` properties.
 */
declare const defineService: <TState extends object, const TQueryInputSchemas extends OperationInputSchemas, const TQueryOutputSchemas extends MatchingOutputSchemas<TQueryInputSchemas>, const TCommandInputSchemas extends OperationInputSchemas, const TCommandOutputSchemas extends MatchingOutputSchemas<TCommandInputSchemas>, const TId extends ServiceId = ServiceId>(def: {
  id: TId;
  description?: string;
  internal?: boolean;
  initialState: ServiceState<TState>;
  queries: DefinedQueries<TState, TQueryInputSchemas, TQueryOutputSchemas, TCommandInputSchemas, TCommandOutputSchemas>;
  commands: DefinedCommands<TState, TCommandInputSchemas, TCommandOutputSchemas, TQueryInputSchemas, TQueryOutputSchemas>;
}) => ServiceDefinition<TState, DefinedQueries<TState, TQueryInputSchemas, TQueryOutputSchemas, TCommandInputSchemas, TCommandOutputSchemas>, DefinedCommands<TState, TCommandInputSchemas, TCommandOutputSchemas, TQueryInputSchemas, TQueryOutputSchemas>, TId>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/query-state.d.ts
/**
 * Builds the synthetic first-render {@link QueryState} for a subscription hook, from a pure
 * `query.get(input)` read.
 *
 * Subscription hooks must return a {@link QueryState} on their very first render, before the
 * subscription's first emission has delivered the real lifecycle (`useSyncExternalStore` reads the
 * snapshot during render; the React 16-compatible preview hooks read it synchronously too). `get()`
 * returns only data (no lifecycle, no load), so we pair it with a `pending`/`loading` status as a
 * placeholder until the subscription delivers the real lifecycle moments later. A throw from
 * `get()` (e.g. input validation) becomes an `error` state — mirroring what the subscription would
 * emit — so the hook never throws during render.
 *
 * Shared by the manager-side `useServiceQuery` and the preview-side docs hooks so their first-render
 * seeds can never drift apart.
 *
 * Only the query's `get` method is needed, so the parameter is narrowed to that shape: `TOutput` then
 * infers purely (and reliably) from `get`'s return type, rather than through the contravariant
 * positions of the full `Query` type — which would widen `TOutput` and break callers that pass a
 * query with a hand-written payload type.
 */
declare function seedQueryState<TInput, TOutput>(query: {
  get(input: TInput): TOutput;
}, input: TInput): QueryState<TOutput>;
declare function seedQueryState<TInput, TOutput, TSelected>(query: {
  get(input: TInput): TOutput;
}, input: TInput, selector: (value: TOutput) => TSelected): QueryState<TSelected>;
//#endregion
//#region node_modules/valibot/dist/index.d.mts
//#endregion
//#region src/methods/fallback/fallback.d.ts
/**
* Fallback type.
*/
type Fallback<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>> = MaybeDeepReadonly<InferOutput<TSchema>> | ((dataset?: OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>, config?: Config<InferIssue<TSchema>>) => MaybeDeepReadonly<InferOutput<TSchema>>);
/**
* Schema with fallback type.
*/
type SchemaWithFallback<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TFallback$1 extends Fallback<TSchema>> = TSchema & {
  /**
  * The fallback value.
  */
  readonly fallback: TFallback$1;
};
/**
* Returns a fallback value as output if the input does not match the schema.
*
* @param schema The schema to catch.
* @param fallback The fallback value.
*
* @returns The passed schema.
*/
//#endregion
//#region src/methods/fallback/fallbackAsync.d.ts
/**
* Fallback async type.
*/
type FallbackAsync<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = MaybeDeepReadonly<InferOutput<TSchema>> | ((dataset?: OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>, config?: Config<InferIssue<TSchema>>) => MaybePromise$2<MaybeDeepReadonly<InferOutput<TSchema>>>);
/**
* Schema with fallback async type.
*/
type SchemaWithFallbackAsync<TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TFallback$1 extends FallbackAsync<TSchema>> = Omit<TSchema, "async" | "~standard" | "~run"> & {
  /**
  * The fallback value.
  */
  readonly fallback: TFallback$1;
  /**
  * Whether it's async.
  */
  readonly async: true;
  /**
  * The Standard Schema properties.
  *
  * @internal
  */
  readonly "~standard": StandardProps<InferInput<TSchema>, InferOutput<TSchema>>;
  /**
  * Parses unknown input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>>;
};
/**
* Returns a fallback value as output if the input does not match the schema.
*
* @param schema The schema to catch.
* @param fallback The fallback value.
*
* @returns The passed schema.
*/
//#endregion
//#region src/methods/pipe/pipe.d.ts
/**
* Schema with pipe type.
*/
type SchemaWithPipe<TPipe$1 extends readonly [BaseSchema<unknown, unknown, BaseIssue<unknown>>, ...PipeItem<any, unknown, BaseIssue<unknown>>[]]> = Omit<FirstTupleItem<TPipe$1>, "pipe" | "~standard" | "~run" | "~types"> & {
  /**
  * The pipe items.
  */
  readonly pipe: TPipe$1;
  /**
  * The Standard Schema properties.
  *
  * @internal
  */
  readonly "~standard": StandardProps<InferInput<FirstTupleItem<TPipe$1>>, InferOutput<LastTupleItem<TPipe$1>>>;
  /**
  * Parses unknown input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<InferOutput<LastTupleItem<TPipe$1>>, InferIssue<TPipe$1[number]>>;
  /**
  * The input, output and issue type.
  *
  * @internal
  */
  readonly "~types"?: {
    readonly input: InferInput<FirstTupleItem<TPipe$1>>;
    readonly output: InferOutput<LastTupleItem<TPipe$1>>;
    readonly issue: InferIssue<TPipe$1[number]>;
  } | undefined;
};
/**
* Adds a pipeline to a schema, that can validate and transform its input.
*
* @param schema The root schema.
* @param item1 The first pipe item.
*
* @returns A schema with a pipeline.
*/
//#endregion
//#region src/types/metadata.d.ts
/**
* Base metadata interface.
*/
interface BaseMetadata<TInput$1> {
  /**
  * The object kind.
  */
  readonly kind: "metadata";
  /**
  * The metadata type.
  */
  readonly type: string;
  /**
  * The metadata reference.
  */
  readonly reference: (...args: any[]) => BaseMetadata<any>;
  /**
  * The input, output and issue type.
  *
  * @internal
  */
  readonly "~types"?: {
    readonly input: TInput$1;
    readonly output: TInput$1;
    readonly issue: never;
  } | undefined;
}
/**
* Generic metadata type.
*/
//#endregion
//#region src/types/dataset.d.ts
/**
* Unknown dataset interface.
*/
interface UnknownDataset {
  /**
  * Whether is's typed.
  */
  typed?: false;
  /**
  * The dataset value.
  */
  value: unknown;
  /**
  * The dataset issues.
  */
  issues?: undefined;
}
/**
* Success dataset interface.
*/
interface SuccessDataset<TValue$1> {
  /**
  * Whether is's typed.
  */
  typed: true;
  /**
  * The dataset value.
  */
  value: TValue$1;
  /**
  * The dataset issues.
  */
  issues?: undefined;
}
/**
* Partial dataset interface.
*/
interface PartialDataset<TValue$1, TIssue extends BaseIssue<unknown>> {
  /**
  * Whether is's typed.
  */
  typed: true;
  /**
  * The dataset value.
  */
  value: TValue$1;
  /**
  * The dataset issues.
  */
  issues: [TIssue, ...TIssue[]];
}
/**
* Failure dataset interface.
*/
interface FailureDataset<TIssue extends BaseIssue<unknown>> {
  /**
  * Whether is's typed.
  */
  typed: false;
  /**
  * The dataset value.
  */
  value: unknown;
  /**
  * The dataset issues.
  */
  issues: [TIssue, ...TIssue[]];
}
/**
* Output dataset type.
*/
type OutputDataset<TValue$1, TIssue extends BaseIssue<unknown>> = SuccessDataset<TValue$1> | PartialDataset<TValue$1, TIssue> | FailureDataset<TIssue>; //#endregion
//#region src/types/standard.d.ts
/**
* The Standard Schema properties interface.
*/
interface StandardProps<TInput$1, TOutput$1> {
  /**
  * The version number of the standard.
  */
  readonly version: 1;
  /**
  * The vendor name of the schema library.
  */
  readonly vendor: "valibot";
  /**
  * Validates unknown input values.
  */
  readonly validate: (value: unknown) => StandardResult<TOutput$1> | Promise<StandardResult<TOutput$1>>;
  /**
  * Inferred types associated with the schema.
  */
  readonly types?: StandardTypes<TInput$1, TOutput$1> | undefined;
}
/**
* The result interface of the validate function.
*/
type StandardResult<TOutput$1> = StandardSuccessResult<TOutput$1> | StandardFailureResult;
/**
* The result interface if validation succeeds.
*/
interface StandardSuccessResult<TOutput$1> {
  /**
  * The typed output value.
  */
  readonly value: TOutput$1;
  /**
  * The non-existent issues.
  */
  readonly issues?: undefined;
}
/**
* The result interface if validation fails.
*/
interface StandardFailureResult {
  /**
  * The issues of failed validation.
  */
  readonly issues: readonly StandardIssue[];
}
/**
* The issue interface of the failure output.
*/
interface StandardIssue {
  /**
  * The error message of the issue.
  */
  readonly message: string;
  /**
  * The path of the issue, if any.
  */
  readonly path?: readonly (PropertyKey | StandardPathItem)[] | undefined;
}
/**
* The path item interface of the issue.
*/
interface StandardPathItem {
  /**
  * The key of the path item.
  */
  readonly key: PropertyKey;
}
/**
* The Standard Schema types interface.
*/
interface StandardTypes<TInput$1, TOutput$1> {
  /**
  * The input type of the schema.
  */
  readonly input: TInput$1;
  /**
  * The output type of the schema.
  */
  readonly output: TOutput$1;
} //#endregion
//#region src/types/schema.d.ts
/**
* Base schema interface.
*/
interface BaseSchema<TInput$1, TOutput$1, TIssue extends BaseIssue<unknown>> {
  /**
  * The object kind.
  */
  readonly kind: "schema";
  /**
  * The schema type.
  */
  readonly type: string;
  /**
  * The schema reference.
  */
  readonly reference: (...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>>;
  /**
  * The expected property.
  */
  readonly expects: string;
  /**
  * Whether it's async.
  */
  readonly async: false;
  /**
  * The Standard Schema properties.
  *
  * @internal
  */
  readonly "~standard": StandardProps<TInput$1, TOutput$1>;
  /**
  * Parses unknown input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput$1, TIssue>;
  /**
  * The input, output and issue type.
  *
  * @internal
  */
  readonly "~types"?: {
    readonly input: TInput$1;
    readonly output: TOutput$1;
    readonly issue: TIssue;
  } | undefined;
}
/**
* Base schema async interface.
*/
interface BaseSchemaAsync<TInput$1, TOutput$1, TIssue extends BaseIssue<unknown>> extends Omit<BaseSchema<TInput$1, TOutput$1, TIssue>, "reference" | "async" | "~run"> {
  /**
  * The schema reference.
  */
  readonly reference: (...args: any[]) => BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;
  /**
  * Whether it's async.
  */
  readonly async: true;
  /**
  * Parses unknown input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: UnknownDataset, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput$1, TIssue>>;
}
/**
* Generic schema type.
*/
type GenericSchema<TInput$1 = unknown, TOutput$1 = TInput$1, TIssue extends BaseIssue<unknown> = BaseIssue<unknown>> = BaseSchema<TInput$1, TOutput$1, TIssue>;
/**
* Generic schema async type.
*/
//#endregion
//#region src/types/transformation.d.ts
/**
* Base transformation interface.
*/
interface BaseTransformation<TInput$1, TOutput$1, TIssue extends BaseIssue<unknown>> {
  /**
  * The object kind.
  */
  readonly kind: "transformation";
  /**
  * The transformation type.
  */
  readonly type: string;
  /**
  * The transformation reference.
  */
  readonly reference: (...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>>;
  /**
  * Whether it's async.
  */
  readonly async: false;
  /**
  * Transforms known input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: SuccessDataset<TInput$1>, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput$1, BaseIssue<unknown> | TIssue>;
  /**
  * The input, output and issue type.
  *
  * @internal
  */
  readonly "~types"?: {
    readonly input: TInput$1;
    readonly output: TOutput$1;
    readonly issue: TIssue;
  } | undefined;
}
/**
* Base transformation async interface.
*/
interface BaseTransformationAsync<TInput$1, TOutput$1, TIssue extends BaseIssue<unknown>> extends Omit<BaseTransformation<TInput$1, TOutput$1, TIssue>, "reference" | "async" | "~run"> {
  /**
  * The transformation reference.
  */
  readonly reference: (...args: any[]) => BaseTransformation<any, any, BaseIssue<unknown>> | BaseTransformationAsync<any, any, BaseIssue<unknown>>;
  /**
  * Whether it's async.
  */
  readonly async: true;
  /**
  * Transforms known input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: SuccessDataset<TInput$1>, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput$1, BaseIssue<unknown> | TIssue>>;
}
/**
* Generic transformation type.
*/
//#endregion
//#region src/types/validation.d.ts
/**
* Base validation interface.
*/
interface BaseValidation<TInput$1, TOutput$1, TIssue extends BaseIssue<unknown>> {
  /**
  * The object kind.
  */
  readonly kind: "validation";
  /**
  * The validation type.
  */
  readonly type: string;
  /**
  * The validation reference.
  */
  readonly reference: (...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>>;
  /**
  * The expected property.
  */
  readonly expects: string | null;
  /**
  * Whether it's async.
  */
  readonly async: false;
  /**
  * Validates known input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: OutputDataset<TInput$1, BaseIssue<unknown>>, config: Config<BaseIssue<unknown>>) => OutputDataset<TOutput$1, BaseIssue<unknown> | TIssue>;
  /**
  * The input, output and issue type.
  *
  * @internal
  */
  readonly "~types"?: {
    readonly input: TInput$1;
    readonly output: TOutput$1;
    readonly issue: TIssue;
  } | undefined;
}
/**
* Base validation async interface.
*/
interface BaseValidationAsync<TInput$1, TOutput$1, TIssue extends BaseIssue<unknown>> extends Omit<BaseValidation<TInput$1, TOutput$1, TIssue>, "reference" | "async" | "~run"> {
  /**
  * The validation reference.
  */
  readonly reference: (...args: any[]) => BaseValidation<any, any, BaseIssue<unknown>> | BaseValidationAsync<any, any, BaseIssue<unknown>>;
  /**
  * Whether it's async.
  */
  readonly async: true;
  /**
  * Validates known input values.
  *
  * @param dataset The input dataset.
  * @param config The configuration.
  *
  * @returns The output dataset.
  *
  * @internal
  */
  readonly "~run": (dataset: OutputDataset<TInput$1, BaseIssue<unknown>>, config: Config<BaseIssue<unknown>>) => Promise<OutputDataset<TOutput$1, BaseIssue<unknown> | TIssue>>;
}
/**
* Generic validation type.
*/
//#endregion
//#region src/types/infer.d.ts
/**
* Infer input type.
*/
type InferInput<TItem$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>> = NonNullable<TItem$1["~types"]>["input"];
/**
* Infer output type.
*/
type InferOutput<TItem$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>> = NonNullable<TItem$1["~types"]>["output"];
/**
* Infer issue type.
*/
type InferIssue<TItem$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | BaseValidation<any, unknown, BaseIssue<unknown>> | BaseValidationAsync<any, unknown, BaseIssue<unknown>> | BaseTransformation<any, unknown, BaseIssue<unknown>> | BaseTransformationAsync<any, unknown, BaseIssue<unknown>> | BaseMetadata<any>> = NonNullable<TItem$1["~types"]>["issue"]; //#endregion
//#region src/types/utils.d.ts
/**
* Checks if a type is `any`.
*/
/**
* Constructs a type that is maybe readonly.
*/
type MaybeReadonly<TValue$1> = TValue$1 | Readonly<TValue$1>;
/**
* Constructs a type that is deeply readonly.
*/
type DeepReadonly<TValue$1> = TValue$1 extends Record<string, unknown> | readonly unknown[] ? { readonly [TKey in keyof TValue$1]: DeepReadonly<TValue$1[TKey]> } : TValue$1;
/**
* Constructs a type that is maybe deeply readonly.
*/
type MaybeDeepReadonly<TValue$1> = TValue$1 | DeepReadonly<TValue$1>;
/**
* Constructs a type that is maybe a promise.
*/
type MaybePromise$2<TValue$1> = TValue$1 | Promise<TValue$1>;
/**
* Prettifies a type for better readability.
*
* Hint: This type has no effect and is only used so that TypeScript displays
* the final type in the preview instead of the utility types used.
*/
type Prettify<TObject> = { [TKey in keyof TObject]: TObject[TKey] } & {};
/**
* Marks specific keys as optional.
*/
type MarkOptional<TObject, TKeys extends keyof TObject> = { [TKey in keyof TObject]?: unknown } & Omit<TObject, TKeys> & Partial<Pick<TObject, TKeys>>;
/**
* Merges two objects. Overlapping entries from the second object overwrite
* properties from the first object.
*/
/**
* Extracts first tuple item.
*/
type FirstTupleItem<TTuple extends readonly [unknown, ...unknown[]]> = TTuple[0];
/**
* Extracts last tuple item.
*/
type LastTupleItem<TTuple extends readonly [unknown, ...unknown[]]> = TTuple[TTuple extends readonly [unknown, ...infer TRest] ? TRest["length"] : never];
/**
* Converts union to intersection type.
*/
//#endregion
//#region src/types/other.d.ts
/**
* Error message type.
*/
type ErrorMessage<TIssue extends BaseIssue<unknown>> = ((issue: TIssue) => string) | string;
/**
* Default type.
*/
type Default<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TInput$1 extends null | undefined> = MaybeDeepReadonly<InferInput<TWrapped$1> | TInput$1> | ((dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped$1>>) => MaybeDeepReadonly<InferInput<TWrapped$1> | TInput$1>) | undefined;
/**
* Default async type.
*/
type DefaultAsync<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TInput$1 extends null | undefined> = MaybeDeepReadonly<InferInput<TWrapped$1> | TInput$1> | ((dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped$1>>) => MaybePromise$2<MaybeDeepReadonly<InferInput<TWrapped$1> | TInput$1>>) | undefined;
/**
* Default value type.
*/
type DefaultValue<TDefault extends Default<BaseSchema<unknown, unknown, BaseIssue<unknown>>, null | undefined> | DefaultAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, null | undefined>> = TDefault extends DefaultAsync<infer TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, infer TInput> ? TDefault extends ((dataset?: UnknownDataset, config?: Config<InferIssue<TWrapped>>) => MaybePromise$2<MaybeDeepReadonly<InferInput<TWrapped> | TInput>>) ? Awaited<ReturnType<TDefault>> : TDefault : never; //#endregion
//#region src/types/object.d.ts
/**
* Optional entry schema type.
*/
type OptionalEntrySchema = ExactOptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown>;
/**
* Optional entry schema async type.
*/
type OptionalEntrySchemaAsync = ExactOptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | NullishSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalSchemaAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown>;
/**
* Object entries interface.
*/
interface ObjectEntries {
  [key: string]: BaseSchema<unknown, unknown, BaseIssue<unknown>> | SchemaWithFallback<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalEntrySchema;
}
/**
* Object entries async interface.
*/
interface ObjectEntriesAsync {
  [key: string]: BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | SchemaWithFallback<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown> | SchemaWithFallbackAsync<BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, unknown> | OptionalEntrySchema | OptionalEntrySchemaAsync;
}
/**
* Object keys type.
*/
/**
* Infer entries input type.
*/
type InferEntriesInput<TEntries$1 extends ObjectEntries | ObjectEntriesAsync> = { -readonly [TKey in keyof TEntries$1]: InferInput<TEntries$1[TKey]> };
/**
* Infer entries output type.
*/
type InferEntriesOutput<TEntries$1 extends ObjectEntries | ObjectEntriesAsync> = { -readonly [TKey in keyof TEntries$1]: InferOutput<TEntries$1[TKey]> };
/**
* Optional input keys type.
*/
type OptionalInputKeys<TEntries$1 extends ObjectEntries | ObjectEntriesAsync> = { [TKey in keyof TEntries$1]: TEntries$1[TKey] extends OptionalEntrySchema | OptionalEntrySchemaAsync ? TKey : never }[keyof TEntries$1];
/**
* Optional output keys type.
*/
type OptionalOutputKeys<TEntries$1 extends ObjectEntries | ObjectEntriesAsync> = { [TKey in keyof TEntries$1]: TEntries$1[TKey] extends OptionalEntrySchema | OptionalEntrySchemaAsync ? undefined extends TEntries$1[TKey]["default"] ? TKey : never : never }[keyof TEntries$1];
/**
* Input with question marks type.
*/
type InputWithQuestionMarks<TEntries$1 extends ObjectEntries | ObjectEntriesAsync, TObject extends InferEntriesInput<TEntries$1>> = MarkOptional<TObject, OptionalInputKeys<TEntries$1>>;
/**
* Output with question marks type.
*/
type OutputWithQuestionMarks<TEntries$1 extends ObjectEntries | ObjectEntriesAsync, TObject extends InferEntriesOutput<TEntries$1>> = MarkOptional<TObject, OptionalOutputKeys<TEntries$1>>;
/**
* Readonly output keys type.
*/
type ReadonlyOutputKeys<TEntries$1 extends ObjectEntries | ObjectEntriesAsync> = { [TKey in keyof TEntries$1]: TEntries$1[TKey] extends {
  readonly pipe: readonly unknown[];
} ? ReadonlyAction<any> extends TEntries$1[TKey]["pipe"][number] ? TKey : never : never }[keyof TEntries$1];
/**
* Output with readonly type.
*/
type OutputWithReadonly<TEntries$1 extends ObjectEntries | ObjectEntriesAsync, TObject extends OutputWithQuestionMarks<TEntries$1, InferEntriesOutput<TEntries$1>>> = ReadonlyOutputKeys<TEntries$1> extends never ? TObject : Readonly<TObject> & Pick<TObject, Exclude<keyof TObject, ReadonlyOutputKeys<TEntries$1>>>;
/**
* Infer object input type.
*/
type InferObjectInput<TEntries$1 extends ObjectEntries | ObjectEntriesAsync> = Prettify<InputWithQuestionMarks<TEntries$1, InferEntriesInput<TEntries$1>>>;
/**
* Infer object output type.
*/
type InferObjectOutput<TEntries$1 extends ObjectEntries | ObjectEntriesAsync> = Prettify<OutputWithReadonly<TEntries$1, OutputWithQuestionMarks<TEntries$1, InferEntriesOutput<TEntries$1>>>>;
/**
* Infer object issue type.
*/
type InferObjectIssue<TEntries$1 extends ObjectEntries | ObjectEntriesAsync> = InferIssue<TEntries$1[keyof TEntries$1]>; //#endregion
//#region src/types/tuple.d.ts
/**
* Tuple items type.
*/
//#endregion
//#region src/types/issue.d.ts
/**
* Array path item interface.
*/
interface ArrayPathItem {
  /**
  * The path item type.
  */
  readonly type: "array";
  /**
  * The path item origin.
  */
  readonly origin: "value";
  /**
  * The path item input.
  */
  readonly input: MaybeReadonly<unknown[]>;
  /**
  * The path item key.
  */
  readonly key: number;
  /**
  * The path item value.
  */
  readonly value: unknown;
}
/**
* Map path item interface.
*/
interface MapPathItem {
  /**
  * The path item type.
  */
  readonly type: "map";
  /**
  * The path item origin.
  */
  readonly origin: "key" | "value";
  /**
  * The path item input.
  */
  readonly input: Map<unknown, unknown>;
  /**
  * The path item key.
  */
  readonly key: unknown;
  /**
  * The path item value.
  */
  readonly value: unknown;
}
/**
* Object path item interface.
*/
interface ObjectPathItem {
  /**
  * The path item type.
  */
  readonly type: "object";
  /**
  * The path item origin.
  */
  readonly origin: "key" | "value";
  /**
  * The path item input.
  */
  readonly input: Record<string, unknown>;
  /**
  * The path item key.
  */
  readonly key: string;
  /**
  * The path item value.
  */
  readonly value: unknown;
}
/**
* Set path item interface.
*/
interface SetPathItem {
  /**
  * The path item type.
  */
  readonly type: "set";
  /**
  * The path item origin.
  */
  readonly origin: "value";
  /**
  * The path item input.
  */
  readonly input: Set<unknown>;
  /**
  * The path item key.
  */
  readonly key: null;
  /**
  * The path item key.
  */
  readonly value: unknown;
}
/**
* Unknown path item interface.
*/
interface UnknownPathItem {
  /**
  * The path item type.
  */
  readonly type: "unknown";
  /**
  * The path item origin.
  */
  readonly origin: "key" | "value";
  /**
  * The path item input.
  */
  readonly input: unknown;
  /**
  * The path item key.
  */
  readonly key: unknown;
  /**
  * The path item value.
  */
  readonly value: unknown;
}
/**
* Issue path item type.
*/
type IssuePathItem = ArrayPathItem | MapPathItem | ObjectPathItem | SetPathItem | UnknownPathItem;
/**
* Base issue interface.
*/
interface BaseIssue<TInput$1> extends Config<BaseIssue<TInput$1>> {
  /**
  * The issue kind.
  */
  readonly kind: "schema" | "validation" | "transformation";
  /**
  * The issue type.
  */
  readonly type: string;
  /**
  * The raw input data.
  */
  readonly input: TInput$1;
  /**
  * The expected property.
  */
  readonly expected: string | null;
  /**
  * The received property.
  */
  readonly received: string;
  /**
  * The error message.
  */
  readonly message: string;
  /**
  * The input requirement.
  */
  readonly requirement?: unknown | undefined;
  /**
  * The issue path.
  */
  readonly path?: [IssuePathItem, ...IssuePathItem[]] | undefined;
  /**
  * The sub issues.
  */
  readonly issues?: [BaseIssue<TInput$1>, ...BaseIssue<TInput$1>[]] | undefined;
}
/**
* Generic issue type.
*/
//#endregion
//#region src/types/config.d.ts
/**
* Config interface.
*/
interface Config<TIssue extends BaseIssue<unknown>> {
  /**
  * The selected language.
  */
  readonly lang?: string | undefined;
  /**
  * The error message.
  */
  readonly message?: ErrorMessage<TIssue> | undefined;
  /**
  * Whether it should be aborted early.
  */
  readonly abortEarly?: boolean | undefined;
  /**
  * Whether a pipe should be aborted early.
  */
  readonly abortPipeEarly?: boolean | undefined;
} //#endregion
//#region src/types/pipe.d.ts
/**
* Pipe action type.
*/
type PipeAction<TInput$1, TOutput$1, TIssue extends BaseIssue<unknown>> = BaseValidation<TInput$1, TOutput$1, TIssue> | BaseTransformation<TInput$1, TOutput$1, TIssue> | BaseMetadata<TInput$1>;
/**
* Pipe action async type.
*/
/**
* Pipe item type.
*/
type PipeItem<TInput$1, TOutput$1, TIssue extends BaseIssue<unknown>> = BaseSchema<TInput$1, TOutput$1, TIssue> | PipeAction<TInput$1, TOutput$1, TIssue>;
/**
* Pipe item async type.
*/
//#endregion
//#region src/schemas/array/types.d.ts
/**
* Array issue interface.
*/
interface ArrayIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "array";
  /**
  * The expected property.
  */
  readonly expected: "Array";
} //#endregion
//#region src/schemas/array/array.d.ts
/**
* Array schema interface.
*/
interface ArraySchema<TItem$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<ArrayIssue> | undefined> extends BaseSchema<InferInput<TItem$1>[], InferOutput<TItem$1>[], ArrayIssue | InferIssue<TItem$1>> {
  /**
  * The schema type.
  */
  readonly type: "array";
  /**
  * The schema reference.
  */
  readonly reference: typeof array;
  /**
  * The expected property.
  */
  readonly expects: "Array";
  /**
  * The array item schema.
  */
  readonly item: TItem$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates an array schema.
*
* @param item The item schema.
*
* @returns An array schema.
*/
declare function array<const TItem$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(item: TItem$1): ArraySchema<TItem$1, undefined>;
/**
* Creates an array schema.
*
* @param item The item schema.
* @param message The error message.
*
* @returns An array schema.
*/
declare function array<const TItem$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<ArrayIssue> | undefined>(item: TItem$1, message: TMessage): ArraySchema<TItem$1, TMessage>; //#endregion
//#region src/schemas/array/arrayAsync.d.ts
/**
* Array schema interface.
*/
//#endregion
//#region src/schemas/custom/types.d.ts
/**
* Custom issue interface.
*/
interface CustomIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "custom";
  /**
  * The expected property.
  */
  readonly expected: "unknown";
} //#endregion
//#region src/schemas/custom/custom.d.ts
/**
* Check type.
*/
type Check = (input: unknown) => boolean;
/**
* Custom schema interface.
*/
interface CustomSchema<TInput$1, TMessage extends ErrorMessage<CustomIssue> | undefined> extends BaseSchema<TInput$1, TInput$1, CustomIssue> {
  /**
  * The schema type.
  */
  readonly type: "custom";
  /**
  * The schema reference.
  */
  readonly reference: typeof custom;
  /**
  * The expected property.
  */
  readonly expects: "unknown";
  /**
  * The type check function.
  */
  readonly check: Check;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a custom schema.
*
* @param check The type check function.
*
* @returns A custom schema.
*/
declare function custom<TInput$1>(check: Check): CustomSchema<TInput$1, undefined>;
/**
* Creates a custom schema.
*
* @param check The type check function.
* @param message The error message.
*
* @returns A custom schema.
*/
declare function custom<TInput$1, const TMessage extends ErrorMessage<CustomIssue> | undefined = ErrorMessage<CustomIssue> | undefined>(check: Check, message: TMessage): CustomSchema<TInput$1, TMessage>; //#endregion
//#region src/schemas/custom/customAsync.d.ts
/**
* Check async type.
*/
//#endregion
//#region src/schemas/exactOptional/exactOptional.d.ts
/**
* Exact optional schema interface.
*/
interface ExactOptionalSchema<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TDefault extends Default<TWrapped$1, never>> extends BaseSchema<InferInput<TWrapped$1>, InferOutput<TWrapped$1>, InferIssue<TWrapped$1>> {
  /**
  * The schema type.
  */
  readonly type: "exact_optional";
  /**
  * The schema reference.
  */
  readonly reference: typeof exactOptional;
  /**
  * The expected property.
  */
  readonly expects: TWrapped$1["expects"];
  /**
  * The wrapped schema.
  */
  readonly wrapped: TWrapped$1;
  /**
  * The default value.
  */
  readonly default: TDefault;
}
/**
* Creates an exact optional schema.
*
* @param wrapped The wrapped schema.
*
* @returns An exact optional schema.
*/
declare function exactOptional<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped$1): ExactOptionalSchema<TWrapped$1, undefined>;
/**
* Creates an exact optional schema.
*
* @param wrapped The wrapped schema.
* @param default_ The default value.
*
* @returns An exact optional schema.
*/
declare function exactOptional<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TDefault extends Default<TWrapped$1, never>>(wrapped: TWrapped$1, default_: TDefault): ExactOptionalSchema<TWrapped$1, TDefault>; //#endregion
//#region src/schemas/exactOptional/exactOptionalAsync.d.ts
/**
* Exact optional schema async interface.
*/
interface ExactOptionalSchemaAsync<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped$1, never>> extends BaseSchemaAsync<InferInput<TWrapped$1>, InferOutput<TWrapped$1>, InferIssue<TWrapped$1>> {
  /**
  * The schema type.
  */
  readonly type: "exact_optional";
  /**
  * The schema reference.
  */
  readonly reference: typeof exactOptional | typeof exactOptionalAsync;
  /**
  * The expected property.
  */
  readonly expects: TWrapped$1["expects"];
  /**
  * The wrapped schema.
  */
  readonly wrapped: TWrapped$1;
  /**
  * The default value.
  */
  readonly default: TDefault;
}
/**
* Creates an exact optional schema.
*
* @param wrapped The wrapped schema.
*
* @returns An exact optional schema.
*/
declare function exactOptionalAsync<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped$1): ExactOptionalSchemaAsync<TWrapped$1, undefined>;
/**
* Creates an exact optional schema.
*
* @param wrapped The wrapped schema.
* @param default_ The default value.
*
* @returns An exact optional schema.
*/
declare function exactOptionalAsync<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TDefault extends DefaultAsync<TWrapped$1, never>>(wrapped: TWrapped$1, default_: TDefault): ExactOptionalSchemaAsync<TWrapped$1, TDefault>; //#endregion
//#region src/schemas/file/file.d.ts
/**
* File issue interface.
*/
//#endregion
//#region src/schemas/literal/literal.d.ts
/**
* Literal type.
*/
type Literal = bigint | boolean | number | string | symbol;
/**
* Literal issue interface.
*/
interface LiteralIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "literal";
  /**
  * The expected property.
  */
  readonly expected: string;
}
/**
* Literal schema interface.
*/
interface LiteralSchema<TLiteral extends Literal, TMessage extends ErrorMessage<LiteralIssue> | undefined> extends BaseSchema<TLiteral, TLiteral, LiteralIssue> {
  /**
  * The schema type.
  */
  readonly type: "literal";
  /**
  * The schema reference.
  */
  readonly reference: typeof literal;
  /**
  * The literal value.
  */
  readonly literal: TLiteral;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a literal schema.
*
* @param literal_ The literal value.
*
* @returns A literal schema.
*/
declare function literal<const TLiteral extends Literal>(literal_: TLiteral): LiteralSchema<TLiteral, undefined>;
/**
* Creates a literal schema.
*
* @param literal_ The literal value.
* @param message The error message.
*
* @returns A literal schema.
*/
declare function literal<const TLiteral extends Literal, const TMessage extends ErrorMessage<LiteralIssue> | undefined>(literal_: TLiteral, message: TMessage): LiteralSchema<TLiteral, TMessage>; //#endregion
//#region src/schemas/looseObject/types.d.ts
/**
* Loose object issue interface.
*/
interface LooseObjectIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "loose_object";
  /**
  * The expected property.
  */
  readonly expected: "Object" | `"${string}"`;
} //#endregion
//#region src/schemas/looseObject/looseObject.d.ts
/**
* Loose object schema interface.
*/
interface LooseObjectSchema<TEntries$1 extends ObjectEntries, TMessage extends ErrorMessage<LooseObjectIssue> | undefined> extends BaseSchema<InferObjectInput<TEntries$1> & {
  [key: string]: unknown;
}, InferObjectOutput<TEntries$1> & {
  [key: string]: unknown;
}, LooseObjectIssue | InferObjectIssue<TEntries$1>> {
  /**
  * The schema type.
  */
  readonly type: "loose_object";
  /**
  * The schema reference.
  */
  readonly reference: typeof looseObject;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The entries schema.
  */
  readonly entries: TEntries$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a loose object schema.
*
* @param entries The entries schema.
*
* @returns A loose object schema.
*/
declare function looseObject<const TEntries$1 extends ObjectEntries>(entries: TEntries$1): LooseObjectSchema<TEntries$1, undefined>;
/**
* Creates a loose object schema.
*
* @param entries The entries schema.
* @param message The error message.
*
* @returns A loose object schema.
*/
declare function looseObject<const TEntries$1 extends ObjectEntries, const TMessage extends ErrorMessage<LooseObjectIssue> | undefined>(entries: TEntries$1, message: TMessage): LooseObjectSchema<TEntries$1, TMessage>; //#endregion
//#region src/schemas/looseObject/looseObjectAsync.d.ts
/**
* Object schema async interface.
*/
interface LooseObjectSchemaAsync<TEntries$1 extends ObjectEntriesAsync, TMessage extends ErrorMessage<LooseObjectIssue> | undefined> extends BaseSchemaAsync<InferObjectInput<TEntries$1> & {
  [key: string]: unknown;
}, InferObjectOutput<TEntries$1> & {
  [key: string]: unknown;
}, LooseObjectIssue | InferObjectIssue<TEntries$1>> {
  /**
  * The schema type.
  */
  readonly type: "loose_object";
  /**
  * The schema reference.
  */
  readonly reference: typeof looseObject | typeof looseObjectAsync;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The entries schema.
  */
  readonly entries: TEntries$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a loose object schema.
*
* @param entries The entries schema.
*
* @returns A loose object schema.
*/
declare function looseObjectAsync<const TEntries$1 extends ObjectEntriesAsync>(entries: TEntries$1): LooseObjectSchemaAsync<TEntries$1, undefined>;
/**
* Creates a loose object schema.
*
* @param entries The entries schema.
* @param message The error message.
*
* @returns A loose object schema.
*/
declare function looseObjectAsync<const TEntries$1 extends ObjectEntriesAsync, const TMessage extends ErrorMessage<LooseObjectIssue> | undefined>(entries: TEntries$1, message: TMessage): LooseObjectSchemaAsync<TEntries$1, TMessage>; //#endregion
//#region src/schemas/looseTuple/types.d.ts
/**
* Loose tuple issue interface.
*/
//#endregion
//#region src/schemas/nullish/types.d.ts
/**
* Infer nullish output type.
*/
type InferNullishOutput<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped$1, null | undefined>> = undefined extends TDefault ? InferOutput<TWrapped$1> | null | undefined : InferOutput<TWrapped$1> | Extract<DefaultValue<TDefault>, null | undefined>; //#endregion
//#region src/schemas/nullish/nullish.d.ts
/**
* Nullish schema interface.
*/
interface NullishSchema<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TDefault extends Default<TWrapped$1, null | undefined>> extends BaseSchema<InferInput<TWrapped$1> | null | undefined, InferNullishOutput<TWrapped$1, TDefault>, InferIssue<TWrapped$1>> {
  /**
  * The schema type.
  */
  readonly type: "nullish";
  /**
  * The schema reference.
  */
  readonly reference: typeof nullish;
  /**
  * The expected property.
  */
  readonly expects: `(${TWrapped$1["expects"]} | null | undefined)`;
  /**
  * The wrapped schema.
  */
  readonly wrapped: TWrapped$1;
  /**
  * The default value.
  */
  readonly default: TDefault;
}
/**
* Creates a nullish schema.
*
* @param wrapped The wrapped schema.
*
* @returns A nullish schema.
*/
declare function nullish<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped$1): NullishSchema<TWrapped$1, undefined>;
/**
* Creates a nullish schema.
*
* @param wrapped The wrapped schema.
* @param default_ The default value.
*
* @returns A nullish schema.
*/
declare function nullish<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TDefault extends Default<TWrapped$1, null | undefined>>(wrapped: TWrapped$1, default_: TDefault): NullishSchema<TWrapped$1, TDefault>; //#endregion
//#region src/schemas/nullish/nullishAsync.d.ts
/**
* Nullish schema async interface.
*/
interface NullishSchemaAsync<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped$1, null | undefined>> extends BaseSchemaAsync<InferInput<TWrapped$1> | null | undefined, InferNullishOutput<TWrapped$1, TDefault>, InferIssue<TWrapped$1>> {
  /**
  * The schema type.
  */
  readonly type: "nullish";
  /**
  * The schema reference.
  */
  readonly reference: typeof nullish | typeof nullishAsync;
  /**
  * The expected property.
  */
  readonly expects: `(${TWrapped$1["expects"]} | null | undefined)`;
  /**
  * The wrapped schema.
  */
  readonly wrapped: TWrapped$1;
  /**
  * The default value.
  */
  readonly default: TDefault;
}
/**
* Creates a nullish schema.
*
* @param wrapped The wrapped schema.
*
* @returns A nullish schema.
*/
declare function nullishAsync<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped$1): NullishSchemaAsync<TWrapped$1, undefined>;
/**
* Creates a nullish schema.
*
* @param wrapped The wrapped schema.
* @param default_ The default value.
*
* @returns A nullish schema.
*/
declare function nullishAsync<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TDefault extends DefaultAsync<TWrapped$1, null | undefined>>(wrapped: TWrapped$1, default_: TDefault): NullishSchemaAsync<TWrapped$1, TDefault>; //#endregion
//#region src/schemas/number/number.d.ts
/**
* Number issue interface.
*/
interface NumberIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "number";
  /**
  * The expected property.
  */
  readonly expected: "number";
}
/**
* Number schema interface.
*/
interface NumberSchema<TMessage extends ErrorMessage<NumberIssue> | undefined> extends BaseSchema<number, number, NumberIssue> {
  /**
  * The schema type.
  */
  readonly type: "number";
  /**
  * The schema reference.
  */
  readonly reference: typeof number;
  /**
  * The expected property.
  */
  readonly expects: "number";
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a number schema.
*
* @returns A number schema.
*/
declare function number(): NumberSchema<undefined>;
/**
* Creates a number schema.
*
* @param message The error message.
*
* @returns A number schema.
*/
declare function number<const TMessage extends ErrorMessage<NumberIssue> | undefined>(message: TMessage): NumberSchema<TMessage>; //#endregion
//#region src/schemas/object/types.d.ts
/**
* Object issue interface.
*/
interface ObjectIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "object";
  /**
  * The expected property.
  */
  readonly expected: "Object" | `"${string}"`;
} //#endregion
//#region src/schemas/object/object.d.ts
/**
* Object schema interface.
*/
interface ObjectSchema<TEntries$1 extends ObjectEntries, TMessage extends ErrorMessage<ObjectIssue> | undefined> extends BaseSchema<InferObjectInput<TEntries$1>, InferObjectOutput<TEntries$1>, ObjectIssue | InferObjectIssue<TEntries$1>> {
  /**
  * The schema type.
  */
  readonly type: "object";
  /**
  * The schema reference.
  */
  readonly reference: typeof object;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The entries schema.
  */
  readonly entries: TEntries$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates an object schema.
*
* Hint: This schema removes unknown entries. The output will only include the
* entries you specify. To include unknown entries, use `looseObject`. To
* return an issue for unknown entries, use `strictObject`. To include and
* validate unknown entries, use `objectWithRest`.
*
* @param entries The entries schema.
*
* @returns An object schema.
*/
declare function object<const TEntries$1 extends ObjectEntries>(entries: TEntries$1): ObjectSchema<TEntries$1, undefined>;
/**
* Creates an object schema.
*
* Hint: This schema removes unknown entries. The output will only include the
* entries you specify. To include unknown entries, use `looseObject`. To
* return an issue for unknown entries, use `strictObject`. To include and
* validate unknown entries, use `objectWithRest`.
*
* @param entries The entries schema.
* @param message The error message.
*
* @returns An object schema.
*/
declare function object<const TEntries$1 extends ObjectEntries, const TMessage extends ErrorMessage<ObjectIssue> | undefined>(entries: TEntries$1, message: TMessage): ObjectSchema<TEntries$1, TMessage>; //#endregion
//#region src/schemas/object/objectAsync.d.ts
/**
* Object schema async interface.
*/
interface ObjectSchemaAsync<TEntries$1 extends ObjectEntriesAsync, TMessage extends ErrorMessage<ObjectIssue> | undefined> extends BaseSchemaAsync<InferObjectInput<TEntries$1>, InferObjectOutput<TEntries$1>, ObjectIssue | InferObjectIssue<TEntries$1>> {
  /**
  * The schema type.
  */
  readonly type: "object";
  /**
  * The schema reference.
  */
  readonly reference: typeof object | typeof objectAsync;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The entries schema.
  */
  readonly entries: TEntries$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates an object schema.
*
* Hint: This schema removes unknown entries. The output will only include the
* entries you specify. To include unknown entries, use `looseObjectAsync`. To
* return an issue for unknown entries, use `strictObjectAsync`. To include and
* validate unknown entries, use `objectWithRestAsync`.
*
* @param entries The entries schema.
*
* @returns An object schema.
*/
declare function objectAsync<const TEntries$1 extends ObjectEntriesAsync>(entries: TEntries$1): ObjectSchemaAsync<TEntries$1, undefined>;
/**
* Creates an object schema.
*
* Hint: This schema removes unknown entries. The output will only include the
* entries you specify. To include unknown entries, use `looseObjectAsync`. To
* return an issue for unknown entries, use `strictObjectAsync`. To include and
* validate unknown entries, use `objectWithRestAsync`.
*
* @param entries The entries schema.
* @param message The error message.
*
* @returns An object schema.
*/
declare function objectAsync<const TEntries$1 extends ObjectEntriesAsync, const TMessage extends ErrorMessage<ObjectIssue> | undefined>(entries: TEntries$1, message: TMessage): ObjectSchemaAsync<TEntries$1, TMessage>; //#endregion
//#region src/schemas/objectWithRest/types.d.ts
/**
* Object with rest issue interface.
*/
interface ObjectWithRestIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "object_with_rest";
  /**
  * The expected property.
  */
  readonly expected: "Object" | `"${string}"`;
} //#endregion
//#region src/schemas/objectWithRest/objectWithRest.d.ts
/**
* Object with rest schema interface.
*/
interface ObjectWithRestSchema<TEntries$1 extends ObjectEntries, TRest$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<ObjectWithRestIssue> | undefined> extends BaseSchema<InferObjectInput<TEntries$1> & {
  [key: string]: InferInput<TRest$1>;
}, InferObjectOutput<TEntries$1> & {
  [key: string]: InferOutput<TRest$1>;
}, ObjectWithRestIssue | InferObjectIssue<TEntries$1> | InferIssue<TRest$1>> {
  /**
  * The schema type.
  */
  readonly type: "object_with_rest";
  /**
  * The schema reference.
  */
  readonly reference: typeof objectWithRest;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The entries schema.
  */
  readonly entries: TEntries$1;
  /**
  * The rest schema.
  */
  readonly rest: TRest$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates an object with rest schema.
*
* @param entries The entries schema.
* @param rest The rest schema.
*
* @returns An object with rest schema.
*/
declare function objectWithRest<const TEntries$1 extends ObjectEntries, const TRest$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(entries: TEntries$1, rest: TRest$1): ObjectWithRestSchema<TEntries$1, TRest$1, undefined>;
/**
* Creates an object with rest schema.
*
* @param entries The entries schema.
* @param rest The rest schema.
* @param message The error message.
*
* @returns An object with rest schema.
*/
declare function objectWithRest<const TEntries$1 extends ObjectEntries, const TRest$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<ObjectWithRestIssue> | undefined>(entries: TEntries$1, rest: TRest$1, message: TMessage): ObjectWithRestSchema<TEntries$1, TRest$1, TMessage>; //#endregion
//#region src/schemas/objectWithRest/objectWithRestAsync.d.ts
/**
* Object schema async interface.
*/
interface ObjectWithRestSchemaAsync<TEntries$1 extends ObjectEntriesAsync, TRest$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<ObjectWithRestIssue> | undefined> extends BaseSchemaAsync<InferObjectInput<TEntries$1> & {
  [key: string]: InferInput<TRest$1>;
}, InferObjectOutput<TEntries$1> & {
  [key: string]: InferOutput<TRest$1>;
}, ObjectWithRestIssue | InferObjectIssue<TEntries$1> | InferIssue<TRest$1>> {
  /**
  * The schema type.
  */
  readonly type: "object_with_rest";
  /**
  * The schema reference.
  */
  readonly reference: typeof objectWithRest | typeof objectWithRestAsync;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The entries schema.
  */
  readonly entries: TEntries$1;
  /**
  * The rest schema.
  */
  readonly rest: TRest$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates an object with rest schema.
*
* @param entries The entries schema.
* @param rest The rest schema.
*
* @returns An object with rest schema.
*/
declare function objectWithRestAsync<const TEntries$1 extends ObjectEntriesAsync, const TRest$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(entries: TEntries$1, rest: TRest$1): ObjectWithRestSchemaAsync<TEntries$1, TRest$1, undefined>;
/**
* Creates an object with rest schema.
*
* @param entries The entries schema.
* @param rest The rest schema.
* @param message The error message.
*
* @returns An object with rest schema.
*/
declare function objectWithRestAsync<const TEntries$1 extends ObjectEntriesAsync, const TRest$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<ObjectWithRestIssue> | undefined>(entries: TEntries$1, rest: TRest$1, message: TMessage): ObjectWithRestSchemaAsync<TEntries$1, TRest$1, TMessage>; //#endregion
//#region src/schemas/optional/types.d.ts
/**
* Infer optional output type.
*/
type InferOptionalOutput<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped$1, undefined>> = undefined extends TDefault ? InferOutput<TWrapped$1> | undefined : InferOutput<TWrapped$1> | Extract<DefaultValue<TDefault>, undefined>; //#endregion
//#region src/schemas/optional/optional.d.ts
/**
* Optional schema interface.
*/
interface OptionalSchema<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TDefault extends Default<TWrapped$1, undefined>> extends BaseSchema<InferInput<TWrapped$1> | undefined, InferOptionalOutput<TWrapped$1, TDefault>, InferIssue<TWrapped$1>> {
  /**
  * The schema type.
  */
  readonly type: "optional";
  /**
  * The schema reference.
  */
  readonly reference: typeof optional;
  /**
  * The expected property.
  */
  readonly expects: `(${TWrapped$1["expects"]} | undefined)`;
  /**
  * The wrapped schema.
  */
  readonly wrapped: TWrapped$1;
  /**
  * The default value.
  */
  readonly default: TDefault;
}
/**
* Creates an optional schema.
*
* @param wrapped The wrapped schema.
*
* @returns An optional schema.
*/
declare function optional<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped$1): OptionalSchema<TWrapped$1, undefined>;
/**
* Creates an optional schema.
*
* @param wrapped The wrapped schema.
* @param default_ The default value.
*
* @returns An optional schema.
*/
declare function optional<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TDefault extends Default<TWrapped$1, undefined>>(wrapped: TWrapped$1, default_: TDefault): OptionalSchema<TWrapped$1, TDefault>; //#endregion
//#region src/schemas/optional/optionalAsync.d.ts
/**
* Optional schema async interface.
*/
interface OptionalSchemaAsync<TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TDefault extends DefaultAsync<TWrapped$1, undefined>> extends BaseSchemaAsync<InferInput<TWrapped$1> | undefined, InferOptionalOutput<TWrapped$1, TDefault>, InferIssue<TWrapped$1>> {
  /**
  * The schema type.
  */
  readonly type: "optional";
  /**
  * The schema reference.
  */
  readonly reference: typeof optional | typeof optionalAsync;
  /**
  * The expected property.
  */
  readonly expects: `(${TWrapped$1["expects"]} | undefined)`;
  /**
  * The wrapped schema.
  */
  readonly wrapped: TWrapped$1;
  /**
  * The default value.
  */
  readonly default: TDefault;
}
/**
* Creates an optional schema.
*
* @param wrapped The wrapped schema.
*
* @returns An optional schema.
*/
declare function optionalAsync<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>>(wrapped: TWrapped$1): OptionalSchemaAsync<TWrapped$1, undefined>;
/**
* Creates an optional schema.
*
* @param wrapped The wrapped schema.
* @param default_ The default value.
*
* @returns An optional schema.
*/
declare function optionalAsync<const TWrapped$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, const TDefault extends DefaultAsync<TWrapped$1, undefined>>(wrapped: TWrapped$1, default_: TDefault): OptionalSchemaAsync<TWrapped$1, TDefault>; //#endregion
//#region src/schemas/picklist/picklist.d.ts
/**
* Picklist options type.
*/
//#endregion
//#region src/schemas/record/types.d.ts
/**
* Record issue interface.
*/
interface RecordIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "record";
  /**
  * The expected property.
  */
  readonly expected: "Object";
}
/**
* Is literal type.
*/
type IsLiteral<TKey$1 extends string | number | symbol> = string extends TKey$1 ? false : number extends TKey$1 ? false : symbol extends TKey$1 ? false : TKey$1 extends Brand<string | number | symbol> ? false : true;
/**
* Optional keys type.
*/
type OptionalKeys<TObject extends Record<string | number | symbol, unknown>> = { [TKey in keyof TObject]: IsLiteral<TKey> extends true ? TKey : never }[keyof TObject];
/**
* With question marks type.
*
* Hint: We mark an entry as optional if we detect that its key is a literal
* type. The reason for this is that it is not technically possible to detect
* missing literal keys without restricting the key schema to `string`, `enum`
* and `picklist`. However, if `enum` and `picklist` are used, it is better to
* use `object` with `entriesFromList` because it already covers the needed
* functionality. This decision also reduces the bundle size of `record`,
* because it only needs to check the entries of the input and not any missing
* keys.
*/
type WithQuestionMarks<TObject extends Record<string | number | symbol, unknown>> = MarkOptional<TObject, OptionalKeys<TObject>>;
/**
* With readonly type.
*/
type WithReadonly<TValue$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, TObject extends WithQuestionMarks<Record<string | number | symbol, unknown>>> = TValue$1 extends {
  readonly pipe: readonly unknown[];
} ? ReadonlyAction<any> extends TValue$1["pipe"][number] ? Readonly<TObject> : TObject : TObject;
/**
* Infer record input type.
*/
type InferRecordInput<TKey$1 extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>, TValue$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = Prettify<WithQuestionMarks<Record<InferInput<TKey$1>, InferInput<TValue$1>>>>;
/**
* Infer record output type.
*/
type InferRecordOutput<TKey$1 extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>> | BaseSchemaAsync<string, string | number | symbol, BaseIssue<unknown>>, TValue$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>> = Prettify<WithReadonly<TValue$1, WithQuestionMarks<Record<InferOutput<TKey$1>, InferOutput<TValue$1>>>>>; //#endregion
//#region src/schemas/record/record.d.ts
/**
* Record schema interface.
*/
interface RecordSchema<TKey$1 extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>, TValue$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, TMessage extends ErrorMessage<RecordIssue> | undefined> extends BaseSchema<InferRecordInput<TKey$1, TValue$1>, InferRecordOutput<TKey$1, TValue$1>, RecordIssue | InferIssue<TKey$1> | InferIssue<TValue$1>> {
  /**
  * The schema type.
  */
  readonly type: "record";
  /**
  * The schema reference.
  */
  readonly reference: typeof record;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The record key schema.
  */
  readonly key: TKey$1;
  /**
  * The record value schema.
  */
  readonly value: TValue$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a record schema.
*
* @param key The key schema.
* @param value The value schema.
*
* @returns A record schema.
*/
declare function record<const TKey$1 extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>, const TValue$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(key: TKey$1, value: TValue$1): RecordSchema<TKey$1, TValue$1, undefined>;
/**
* Creates a record schema.
*
* @param key The key schema.
* @param value The value schema.
* @param message The error message.
*
* @returns A record schema.
*/
declare function record<const TKey$1 extends BaseSchema<string, string | number | symbol, BaseIssue<unknown>>, const TValue$1 extends BaseSchema<unknown, unknown, BaseIssue<unknown>>, const TMessage extends ErrorMessage<RecordIssue> | undefined>(key: TKey$1, value: TValue$1, message: TMessage): RecordSchema<TKey$1, TValue$1, TMessage>; //#endregion
//#region src/schemas/record/recordAsync.d.ts
/**
* Record schema async interface.
*/
//#endregion
//#region src/schemas/strictObject/types.d.ts
/**
* Strict object issue interface.
*/
interface StrictObjectIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "strict_object";
  /**
  * The expected property.
  */
  readonly expected: "Object" | `"${string}"` | "never";
} //#endregion
//#region src/schemas/strictObject/strictObject.d.ts
/**
* Strict object schema interface.
*/
interface StrictObjectSchema<TEntries$1 extends ObjectEntries, TMessage extends ErrorMessage<StrictObjectIssue> | undefined> extends BaseSchema<InferObjectInput<TEntries$1>, InferObjectOutput<TEntries$1>, StrictObjectIssue | InferObjectIssue<TEntries$1>> {
  /**
  * The schema type.
  */
  readonly type: "strict_object";
  /**
  * The schema reference.
  */
  readonly reference: typeof strictObject;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The entries schema.
  */
  readonly entries: TEntries$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a strict object schema.
*
* @param entries The entries schema.
*
* @returns A strict object schema.
*/
declare function strictObject<const TEntries$1 extends ObjectEntries>(entries: TEntries$1): StrictObjectSchema<TEntries$1, undefined>;
/**
* Creates a strict object schema.
*
* @param entries The entries schema.
* @param message The error message.
*
* @returns A strict object schema.
*/
declare function strictObject<const TEntries$1 extends ObjectEntries, const TMessage extends ErrorMessage<StrictObjectIssue> | undefined>(entries: TEntries$1, message: TMessage): StrictObjectSchema<TEntries$1, TMessage>; //#endregion
//#region src/schemas/strictObject/strictObjectAsync.d.ts
/**
* Strict object schema async interface.
*/
interface StrictObjectSchemaAsync<TEntries$1 extends ObjectEntriesAsync, TMessage extends ErrorMessage<StrictObjectIssue> | undefined> extends BaseSchemaAsync<InferObjectInput<TEntries$1>, InferObjectOutput<TEntries$1>, StrictObjectIssue | InferObjectIssue<TEntries$1>> {
  /**
  * The schema type.
  */
  readonly type: "strict_object";
  /**
  * The schema reference.
  */
  readonly reference: typeof strictObject | typeof strictObjectAsync;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The entries schema.
  */
  readonly entries: TEntries$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a strict object schema.
*
* @param entries The entries schema.
*
* @returns A strict object schema.
*/
declare function strictObjectAsync<const TEntries$1 extends ObjectEntriesAsync>(entries: TEntries$1): StrictObjectSchemaAsync<TEntries$1, undefined>;
/**
* Creates a strict object schema.
*
* @param entries The entries schema.
* @param message The error message.
*
* @returns A strict object schema.
*/
declare function strictObjectAsync<const TEntries$1 extends ObjectEntriesAsync, const TMessage extends ErrorMessage<StrictObjectIssue> | undefined>(entries: TEntries$1, message: TMessage): StrictObjectSchemaAsync<TEntries$1, TMessage>; //#endregion
//#region src/schemas/strictTuple/types.d.ts
/**
* Strict tuple issue interface.
*/
//#endregion
//#region src/schemas/string/string.d.ts
/**
* String issue interface.
*/
interface StringIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "string";
  /**
  * The expected property.
  */
  readonly expected: "string";
}
/**
* String schema interface.
*/
interface StringSchema<TMessage extends ErrorMessage<StringIssue> | undefined> extends BaseSchema<string, string, StringIssue> {
  /**
  * The schema type.
  */
  readonly type: "string";
  /**
  * The schema reference.
  */
  readonly reference: typeof string;
  /**
  * The expected property.
  */
  readonly expects: "string";
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a string schema.
*
* @returns A string schema.
*/
declare function string(): StringSchema<undefined>;
/**
* Creates a string schema.
*
* @param message The error message.
*
* @returns A string schema.
*/
declare function string<const TMessage extends ErrorMessage<StringIssue> | undefined>(message: TMessage): StringSchema<TMessage>; //#endregion
//#region src/schemas/symbol/symbol.d.ts
/**
* Symbol issue interface.
*/
//#endregion
//#region src/schemas/undefined/undefined.d.ts
/**
* Undefined issue interface.
*/
interface UndefinedIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "undefined";
  /**
  * The expected property.
  */
  readonly expected: "undefined";
}
/**
* Undefined schema interface.
*/
interface UndefinedSchema<TMessage extends ErrorMessage<UndefinedIssue> | undefined> extends BaseSchema<undefined, undefined, UndefinedIssue> {
  /**
  * The schema type.
  */
  readonly type: "undefined";
  /**
  * The schema reference.
  */
  readonly reference: typeof undefined_;
  /**
  * The expected property.
  */
  readonly expects: "undefined";
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates an undefined schema.
*
* @returns An undefined schema.
*/
declare function undefined_(): UndefinedSchema<undefined>;
/**
* Creates an undefined schema.
*
* @param message The error message.
*
* @returns An undefined schema.
*/
declare function undefined_<const TMessage extends ErrorMessage<UndefinedIssue> | undefined>(message: TMessage): UndefinedSchema<TMessage>; //#endregion
//#region src/schemas/undefinedable/types.d.ts
/**
* Infer undefinedable output type.
*/
//#endregion
//#region src/schemas/variant/variant.d.ts
/**
* Variant schema interface.
*/
interface VariantSchema<TKey$1 extends string, TOptions$1 extends VariantOptions<TKey$1>, TMessage extends ErrorMessage<VariantIssue> | undefined> extends BaseSchema<InferInput<TOptions$1[number]>, InferOutput<TOptions$1[number]>, VariantIssue | InferVariantIssue<TOptions$1>> {
  /**
  * The schema type.
  */
  readonly type: "variant";
  /**
  * The schema reference.
  */
  readonly reference: typeof variant;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The discriminator key.
  */
  readonly key: TKey$1;
  /**
  * The variant options.
  */
  readonly options: TOptions$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a variant schema.
*
* @param key The discriminator key.
* @param options The variant options.
*
* @returns A variant schema.
*/
declare function variant<const TKey$1 extends string, const TOptions$1 extends VariantOptions<TKey$1>>(key: TKey$1, options: TOptions$1): VariantSchema<TKey$1, TOptions$1, undefined>;
/**
* Creates a variant schema.
*
* @param key The discriminator key.
* @param options The variant options.
* @param message The error message.
*
* @returns An variant schema.
*/
declare function variant<const TKey$1 extends string, const TOptions$1 extends VariantOptions<TKey$1>, const TMessage extends ErrorMessage<VariantIssue> | undefined>(key: TKey$1, options: TOptions$1, message: TMessage): VariantSchema<TKey$1, TOptions$1, TMessage>; //#endregion
//#region src/schemas/variant/variantAsync.d.ts
/**
* Variant schema async interface.
*/
interface VariantSchemaAsync<TKey$1 extends string, TOptions$1 extends VariantOptionsAsync<TKey$1>, TMessage extends ErrorMessage<VariantIssue> | undefined> extends BaseSchemaAsync<InferInput<TOptions$1[number]>, InferOutput<TOptions$1[number]>, VariantIssue | InferVariantIssue<TOptions$1>> {
  /**
  * The schema type.
  */
  readonly type: "variant";
  /**
  * The schema reference.
  */
  readonly reference: typeof variant | typeof variantAsync;
  /**
  * The expected property.
  */
  readonly expects: "Object";
  /**
  * The discriminator key.
  */
  readonly key: TKey$1;
  /**
  * The variant options.
  */
  readonly options: TOptions$1;
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a variant schema.
*
* @param key The discriminator key.
* @param options The variant options.
*
* @returns A variant schema.
*/
declare function variantAsync<const TKey$1 extends string, const TOptions$1 extends VariantOptionsAsync<TKey$1>>(key: TKey$1, options: TOptions$1): VariantSchemaAsync<TKey$1, TOptions$1, undefined>;
/**
* Creates a variant schema.
*
* @param key The discriminator key.
* @param options The variant options.
* @param message The error message.
*
* @returns An variant schema.
*/
declare function variantAsync<const TKey$1 extends string, const TOptions$1 extends VariantOptionsAsync<TKey$1>, const TMessage extends ErrorMessage<VariantIssue> | undefined>(key: TKey$1, options: TOptions$1, message: TMessage): VariantSchemaAsync<TKey$1, TOptions$1, TMessage>; //#endregion
//#region src/schemas/variant/types.d.ts
/**
* Variant issue interface.
*/
interface VariantIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "variant";
  /**
  * The expected property.
  */
  readonly expected: string;
}
/**
* Variant option schema interface.
*/
interface VariantOptionSchema<TKey$1 extends string> extends BaseSchema<unknown, unknown, VariantIssue | BaseIssue<unknown>> {
  readonly type: "variant";
  readonly reference: typeof variant;
  readonly key: string;
  readonly options: VariantOptions<TKey$1>;
  readonly message: ErrorMessage<VariantIssue> | undefined;
}
/**
* Variant option schema async interface.
*/
interface VariantOptionSchemaAsync<TKey$1 extends string> extends BaseSchemaAsync<unknown, unknown, VariantIssue | BaseIssue<unknown>> {
  readonly type: "variant";
  readonly reference: typeof variant | typeof variantAsync;
  readonly key: string;
  readonly options: VariantOptionsAsync<TKey$1>;
  readonly message: ErrorMessage<VariantIssue> | undefined;
}
/**
* Variant object entries type.
*/
type VariantObjectEntries<TKey$1 extends string> = Record<TKey$1, BaseSchema<unknown, unknown, BaseIssue<unknown>> | OptionalEntrySchema> & ObjectEntries;
/**
* Variant object entries async type.
*/
type VariantObjectEntriesAsync<TKey$1 extends string> = Record<TKey$1, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> | OptionalEntrySchema | OptionalEntrySchemaAsync> & ObjectEntriesAsync;
/**
* Variant option type.
*/
type VariantOption<TKey$1 extends string> = LooseObjectSchema<VariantObjectEntries<TKey$1>, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchema<VariantObjectEntries<TKey$1>, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchema<VariantObjectEntries<TKey$1>, BaseSchema<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchema<VariantObjectEntries<TKey$1>, ErrorMessage<StrictObjectIssue> | undefined> | VariantOptionSchema<TKey$1>;
/**
* Variant option async type.
*/
type VariantOptionAsync<TKey$1 extends string> = LooseObjectSchemaAsync<VariantObjectEntriesAsync<TKey$1>, ErrorMessage<LooseObjectIssue> | undefined> | ObjectSchemaAsync<VariantObjectEntriesAsync<TKey$1>, ErrorMessage<ObjectIssue> | undefined> | ObjectWithRestSchemaAsync<VariantObjectEntriesAsync<TKey$1>, BaseSchema<unknown, unknown, BaseIssue<unknown>> | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>, ErrorMessage<ObjectWithRestIssue> | undefined> | StrictObjectSchemaAsync<VariantObjectEntriesAsync<TKey$1>, ErrorMessage<StrictObjectIssue> | undefined> | VariantOptionSchemaAsync<TKey$1>;
/**
* Variant options type.
*/
type VariantOptions<TKey$1 extends string> = MaybeReadonly<VariantOption<TKey$1>[]>;
/**
* Variant options async type.
*/
type VariantOptionsAsync<TKey$1 extends string> = MaybeReadonly<(VariantOption<TKey$1> | VariantOptionAsync<TKey$1>)[]>;
/**
* Infer variant issue type.
*/
type InferVariantIssue<TOptions$1 extends VariantOptions<string> | VariantOptionsAsync<string>> = Exclude<InferIssue<TOptions$1[number]>, {
  type: "loose_object" | "object" | "object_with_rest";
}>; //#endregion
//#region src/schemas/void/void.d.ts
/**
* Void issue interface.
*/
interface VoidIssue extends BaseIssue<unknown> {
  /**
  * The issue kind.
  */
  readonly kind: "schema";
  /**
  * The issue type.
  */
  readonly type: "void";
  /**
  * The expected property.
  */
  readonly expected: "void";
}
/**
* Void schema interface.
*/
interface VoidSchema<TMessage extends ErrorMessage<VoidIssue> | undefined> extends BaseSchema<void, void, VoidIssue> {
  /**
  * The schema type.
  */
  readonly type: "void";
  /**
  * The schema reference.
  */
  readonly reference: typeof void_;
  /**
  * The expected property.
  */
  readonly expects: "void";
  /**
  * The error message.
  */
  readonly message: TMessage;
}
/**
* Creates a void schema.
*
* @returns A void schema.
*/
declare function void_(): VoidSchema<undefined>;
/**
* Creates a void schema.
*
* @param message The error message.
*
* @returns A void schema.
*/
declare function void_<const TMessage extends ErrorMessage<VoidIssue> | undefined>(message: TMessage): VoidSchema<TMessage>; //#endregion
//#region src/actions/args/args.d.ts
/**
* Schema type.
*/
//#endregion
//#region src/actions/brand/brand.d.ts
/**
* Brand symbol.
*/
declare const BrandSymbol: unique symbol;
/**
* Brand name type.
*/
type BrandName = string | number | symbol;
/**
* Brand interface.
*/
interface Brand<TName extends BrandName> {
  [BrandSymbol]: { [TValue in TName]: TValue };
}
/**
* Brand action interface.
*/
//#endregion
//#region src/actions/description/description.d.ts
/**
* Description action interface.
*/
interface DescriptionAction<TInput$1, TDescription extends string> extends BaseMetadata<TInput$1> {
  /**
  * The action type.
  */
  readonly type: "description";
  /**
  * The action reference.
  */
  readonly reference: typeof description$1;
  /**
  * The description text.
  */
  readonly description: TDescription;
}
/**
* Creates a description metadata action.
*
* @param description_ The description text.
*
* @returns A description action.
*/
declare function description$1<TInput$1, TDescription extends string>(description_: TDescription): DescriptionAction<TInput$1, TDescription>; //#endregion
//#region src/actions/digits/digits.d.ts
/**
* Digits issue interface.
*/
//#endregion
//#region src/actions/readonly/readonly.d.ts
/**
* Readonly output type.
*/
type ReadonlyOutput<TInput$1> = TInput$1 extends Map<infer TKey, infer TValue> ? ReadonlyMap<TKey, TValue> : TInput$1 extends Set<infer TValue> ? ReadonlySet<TValue> : Readonly<TInput$1>;
/**
* Readonly action interface.
*/
interface ReadonlyAction<TInput$1> extends BaseTransformation<TInput$1, ReadonlyOutput<TInput$1>, never> {
  /**
  * The action type.
  */
  readonly type: "readonly";
  /**
  * The action reference.
  */
  readonly reference: typeof readonly;
}
/**
* Creates a readonly transformation action.
*
* @returns A readonly action.
*/
declare function readonly<TInput$1>(): ReadonlyAction<TInput$1>; //#endregion
//#region src/actions/reduceItems/reduceItems.d.ts
/**
* Array action type.
*/
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/indexer.d.ts
type ExportName = string;
type MetaId = string;
interface StoriesSpecifier {
  /** When auto-titling, what to prefix all generated titles with (default: '') */
  titlePrefix?: string;
  /** Where to start looking for story files */
  directory: string;
  /**
   * What does the filename of a story file look like? (a glob, relative to directory, no leading
   * `./`) If unset, we use `** / *.@(mdx|stories.@(mdx|js|jsx|mjs|ts|tsx))` (no spaces)
   */
  files?: string;
}
type StoriesEntry$1 = string | StoriesSpecifier;
type NormalizedStoriesSpecifier$1 = Required<StoriesSpecifier> & {
  importPathMatcher: RegExp;
};
interface IndexerOptions {
  makeTitle: (userTitle?: string) => string;
}
interface IndexedStory {
  id: string;
  name: string;
  tags?: Tag$2[];
  parameters?: Parameters$2;
}
interface IndexedCSFFile$1 {
  meta: {
    id?: string;
    title?: string;
    tags?: Tag$2[];
  };
  stories: IndexedStory[];
}
/**
 * FIXME: This is a temporary type to allow us to deprecate the old indexer API. We should remove
 * this type and the deprecated indexer API in 8.0.
 */
type BaseIndexer = {
  /** A regular expression that should match all files to be handled by this indexer */test: RegExp;
};
/**
 * An indexer describes which filenames it handles, and how to index each individual file - turning
 * it into an entry in the index.
 */
type Indexer$1 = BaseIndexer & {
  /**
   * Indexes a file containing stories or docs.
   *
   * @param fileName The name of the file to index.
   * @param options {@link IndexerOptions} for indexing the file.
   * @returns A promise that resolves to an array of {@link IndexInput} objects.
   */
  createIndex: (fileName: string, options: IndexerOptions) => Promise<IndexInput$1[]>;
};
interface BaseIndexEntry {
  id: StoryId$2;
  name: StoryName$1;
  title: ComponentTitle$1;
  tags?: Tag$2[];
  importPath: Path$1;
}
type StoryIndexEntry$1 = BaseIndexEntry & {
  type: 'story';
  subtype: 'story' | 'test';
  componentPath?: string;
  exportName?: string;
  parent?: StoryId$2;
  parentName?: StoryName$1;
};
type DocsIndexEntry$1 = BaseIndexEntry & {
  storiesImports: Path$1[];
  type: 'docs';
};
type IndexEntry$1 = StoryIndexEntry$1 | DocsIndexEntry$1;
interface IndexInputStats$1 {
  loaders?: boolean;
  play?: boolean;
  tests?: boolean;
  render?: boolean;
  storyFn?: boolean;
  mount?: boolean;
  beforeEach?: boolean;
  moduleMock?: boolean;
  globals?: boolean;
  factory?: boolean;
  tags?: boolean;
}
/** The base input for indexing a story or docs entry. */
type BaseIndexInput = {
  /** The file to import from e.g. the story file. Defaults to the fileName arg passed to createIndex */importPath?: Path$1; /** The raw path/package of the file that provides meta.component, if one exists */
  rawComponentPath?: Path$1; /** The name of the export to import. */
  exportName: ExportName; /** The name of the entry, auto-generated from {@link exportName} if unspecified. */
  name?: StoryName$1; /** The location in the sidebar, auto-generated from {@link importPath} if unspecified. */
  title?: ComponentTitle$1;
  /**
   * The custom id optionally set at `meta.id` if it needs to differ from the id generated via
   * {@link title}. If unspecified, the meta id will be auto-generated from {@link title}. If
   * specified, the meta in the CSF file _must_ have a matching id set at `meta.id`, to be correctly
   * matched.
   */
  metaId?: MetaId; /** Tags for filtering entries in Storybook and its tools. */
  tags?: Tag$2[];
  /**
   * The id of the entry, auto-generated from {@link title}/{@link metaId} and {@link exportName} if
   * unspecified. If specified, the story in the CSF file _must_ have a matching id set at
   * `parameters.__id`, to be correctly matched. Only use this if you need to override the
   * auto-generated id.
   */
  __id?: StoryId$2; /** Stats about language feature usage that the indexer can optionally report */
  __stats?: IndexInputStats$1;
};
/** The input for indexing a story entry. */
type StoryIndexInput = BaseIndexInput & {
  type: 'story';
  subtype?: 'story' | 'test';
  parent?: StoryId$2;
  parentName?: StoryName$1;
};
/** The input for indexing a docs entry. */
type DocsIndexInput = BaseIndexInput & {
  type: 'docs'; /** Paths to story files that must be pre-loaded for this docs entry. */
  storiesImports?: Path$1[];
};
type IndexInput$1 = StoryIndexInput | DocsIndexInput;
interface V3CompatIndexEntry extends Omit<StoryIndexEntry$1, 'type' | 'tags' | 'subtype'> {
  kind: ComponentTitle$1;
  story: StoryName$1;
  parameters: Parameters$2;
}
interface StoryIndexV2 {
  v: number;
  stories: Record<StoryId$2, Omit<V3CompatIndexEntry, 'title' | 'name' | 'importPath'> & {
    name?: StoryName$1;
  }>;
}
interface StoryIndexV3 {
  v: number;
  stories: Record<StoryId$2, V3CompatIndexEntry>;
}
interface StoryIndex$1 {
  v: number;
  entries: Record<StoryId$2, IndexEntry$1>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/services/docgen/types.d.ts
/**
 * Caller-facing input to a docgen provider middleware.
 *
 * `entry` is the authoritative story-index entry for the requested component, selected with the
 * same rules as the React component manifest generator (`selectComponentEntriesByComponentId` in
 * `storybook/internal/common`): eligible story entries and attached docs, with story entries
 * preferred over attached docs for the same component id.
 */
interface DocgenProviderInput {
  entry: IndexEntry$1;
}
/** Free-form error attached to a payload or subcomponent. */
interface DocgenError {
  name: string;
  message: string;
}
/** Compact JSDoc tag map: tag name → list of tag values (e.g. `@example a` → `{ example: ['a'] }`). */
type DocgenJsDocTags = Record<string, string[]>;
/**
 * Docgen payload returned by `core/docgen`'s `docgen` query.
 *
 * Component-only fields (props, descriptions, subcomponents). Story snippets and file-level
 * imports live in `core/story-docs` when `experimentalDocgenServer` is enabled.
 */
interface DocgenPayload$1 {
  id: string;
  name: string;
  /** CSF story file import path from the index entry (same as component manifest `path`). */
  path: string;
  description?: string;
  summary?: string;
  jsDocTags: DocgenJsDocTags;
  /** Renderer-converted argTypes derived from integration-specific docgen data at write time. */
  argTypes?: StrictArgTypes$2;
  subcomponents?: Record<string, DocgenSubcomponent>;
  error?: DocgenError;
  [key: string]: unknown;
}
/** Component-level summary + docgen for one subcomponent. */
interface DocgenSubcomponent {
  name: string;
  path: string;
  description?: string;
  summary?: string;
  import?: string;
  jsDocTags: DocgenJsDocTags;
  /** Renderer-converted argTypes derived from integration-specific docgen data at write time. */
  argTypes?: StrictArgTypes$2;
  error?: DocgenError;
  [key: string]: unknown;
}
/**
 * A docgen provider: given a component's index entry, returns a complete {@link DocgenPayload} or
 * `undefined` when no docgen is available for the file.
 *
 * Providers are composed middleware-style inside the docgen worker — each wraps the previous one in
 * the chain and may delegate to it to merge with downstream output.
 *
 * **Merge convention.** When combining your output with downstream's, use spread
 * (`{ ...downstream, ...yourOverrides }`) and `downstream?.field ?? yours` rather than rebuilding
 * the payload field-by-field. Manual reconstruction silently drops any fields a future provider
 * (or future schema change) adds and your provider doesn't know about. `??` preserves explicit
 * values from downstream — including empty strings — so providers that intentionally set a field
 * are not overridden by a later provider's defaults.
 */
type DocgenProvider = (input: DocgenProviderInput) => Promise<DocgenPayload$1 | undefined>;
/**
 * Middleware that wraps the next provider in the docgen chain.
 *
 * The worker seeds the chain with an identity provider (returns `undefined`) and folds each
 * descriptor's middleware over it in registration order, so a later registrant wraps (and can
 * delegate to) the earlier ones.
 */
type DocgenMiddleware = (nextDocgen: DocgenProvider) => DocgenProvider;
/**
 * Serializable descriptor a renderer or addon contributes via the `experimental_docgenProvider`
 * preset.
 *
 * Docgen extraction runs off the main thread in a long-lived worker owned by core. Because a
 * closure cannot cross a worker boundary, integrations describe their provider as data: a
 * `moduleSpecifier` pointing at a module that satisfies {@link DocgenWorkerModule}. Core collects
 * these descriptors (preserving preset order) and the worker imports and composes them.
 */
interface DocgenProviderDescriptor {
  /** Absolute path to a module that exports {@link DocgenWorkerModule.createDocgenProvider}. */
  moduleSpecifier: string;
}
/**
 * Contract a worker-target docgen module must satisfy. The worker imports the descriptor's
 * `moduleSpecifier` and calls `createDocgenProvider()` once to build the middleware it folds into
 * the provider chain. Integrations implement only this factory — they never touch threading.
 */
interface DocgenWorkerModule {
  createDocgenProvider: () => DocgenMiddleware | Promise<DocgenMiddleware>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/services/docgen/definition.d.ts
type DocgenServiceState = {
  /** Extracted docgen keyed by component id. Populated by the `extractDocgen` command. */components: Record<string, DocgenPayload$1>;
};
/**
 * Definition for the `core/docgen` open service.
 *
 * The service carries only provider-extracted docgen (component name, description, props, JSDoc
 * tags, and the renderer-converted argTypes). Story/meta/project custom argTypes are NOT stored
 * here — consumers layer those in from their own sources (the docs blocks resolve the prepared
 * meta/story locally; the manager Controls panel reads them from the `STORY_PREPARED` channel).
 *
 * The query is a thin synchronous read of `state.components[id]` — it returns undefined when
 * nothing has been extracted yet rather than throwing, matching the open-service convention for
 * sync reads. The real work — story index lookup, provider invocation, error handling — lives in
 * the `extractDocgen` command, whose body is supplied at registration time because it needs to
 * close over the server-only story index and the composed `experimental_docgenProvider` chain.
 * The query's `load` hook calls `extractDocgen`, so `docgen.loaded()` is the awaitable form and
 * surfaces extraction errors. `docgenForAllComponents` delegates to the `extractAllDocgen`
 * command, whose handler is supplied at registration because it needs the story index.
 */
declare const docgenServiceDef: import("storybook/open-service").ServiceDefinition<DocgenServiceState, {
  readonly docgen: import("storybook/open-service").QueryDefinition<DocgenServiceState, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, import("storybook/open-service").QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"docgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly docgenForAllComponents: import("storybook/open-service").QueryDefinition<DocgenServiceState, VoidSchema<undefined>, RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, import("storybook/open-service").QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"docgenForAllComponents\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly docgen: {
    output: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly docgenForAllComponents: {
    output: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
}, {
  readonly extractDocgen: import("storybook/open-service").CommandDefinition<DocgenServiceState, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, import("storybook/open-service").QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractDocgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly extractAllDocgen: import("storybook/open-service").CommandDefinition<DocgenServiceState, UndefinedSchema<undefined>, VoidSchema<undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, import("storybook/open-service").QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractAllDocgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly extractDocgen: {
    output: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$1<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly extractAllDocgen: {
    output: VoidSchema<undefined>;
  };
}, "core/docgen">;
type DocgenService = ServiceInstanceOf<typeof docgenServiceDef>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/services/module-graph/engine/adapters/types.d.ts
type FileChangeEvent = {
  kind: 'add';
  path: string;
} | {
  kind: 'change';
  path: string;
} | {
  kind: 'unlink';
  path: string;
};
interface ChangeDetectionAdapter {
  /** Pull: builder produces resolve-config once at start; detector caches it. */
  getResolveConfig(): Promise<ModuleResolveConfig$1>;
  /** Push: builder reports file-system events; returns an unsubscribe function. */
  onFileChange(handler: (event: FileChangeEvent) => void): () => void;
  /** Optional: builder reports a startup failure so the detector can mark itself unavailable. */
  onStartupFailure?(handler: (event: {
    reason: string;
    error?: Error;
  }) => void): () => void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/services/module-graph/engine/parser-registry/types.d.ts
/** Arguments handed to an {@link ImportParser} when the registry dispatches a file to it. */
interface ParseFileArgs {
  filePath: string;
  source: string;
}
/**
 * Services passed to every parser. SFC parsers (vue, svelte) extract a `<script>` block
 * and then delegate the actual import-edge extraction to the built-in oxc wrapper via
 * {@link ImportParserContext.parseScriptWithOxc}.
 */
interface ImportParserContext {
  /** Core's oxc-parser wrapper. SFC plugins call this after extracting <script> content. */
  parseScriptWithOxc(source: string, virtualFilePath: string): Promise<ImportEdge[]>;
}
/**
 * A parser plugin that claims one or more file extensions and knows how to extract import
 * edges from that file type. May be registered with a {@link ParserRegistry} directly or
 * surfaced through the `experimental_importParsers` preset key.
 *
 * Extensions are compared with `path.extname(filePath).toLowerCase()` lookup — compound
 * extensions such as `.svelte.ts` are NOT supported here (only the last segment matches).
 */
interface ImportParser {
  /**
   * Lowercase, leading dot. Compound extensions like `.svelte.ts` are NOT supported here —
   * `path.extname` returns the last segment only, so `.svelte.ts` matches `.ts`.
   */
  extensions: readonly string[];
  parse(args: ParseFileArgs, ctx: ImportParserContext): Promise<ImportEdge[]>;
}
//#endregion
//#region node_modules/type-fest/source/primitive.d.ts
/**
Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).

@category Type
*/
type Primitive = null | undefined | string | number | boolean | symbol | bigint;
//#endregion
//#region node_modules/type-fest/source/json-value.d.ts
/**
Matches a JSON object.

This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. Don't use this as a direct return type as the user would have to double-cast it: `jsonObject as unknown as CustomResponse`. Instead, you could extend your CustomResponse type from it to ensure your type only uses JSON-compatible types: `interface CustomResponse extends JsonObject { … }`.

@category JSON
*/
type JsonObject = { [Key in string]: JsonValue };
/**
Matches a JSON array.

@category JSON
*/
type JsonArray = JsonValue[] | readonly JsonValue[];
/**
Matches any valid JSON primitive value.

@category JSON
*/
type JsonPrimitive = string | number | boolean | null;
/**
Matches any valid JSON value.

@see `Jsonify` if you need to transform a type to one that is assignable to `JsonValue`.

@category JSON
*/
type JsonValue = JsonPrimitive | JsonObject | JsonArray;
//#endregion
//#region node_modules/type-fest/source/literal-union.d.ts
/**
Create a union type by combining primitive types and literal types without sacrificing auto-completion in IDEs for the literal type part of the union.

Currently, when a union type of a primitive type is combined with literal types, TypeScript loses all information about the combined literals. Thus, when such type is used in an IDE with autocompletion, no suggestions are made for the declared literals.

This type is a workaround for [Microsoft/TypeScript#29729](https://github.com/Microsoft/TypeScript/issues/29729). It will be removed as soon as it's not needed anymore.

@example
```
import type {LiteralUnion} from 'type-fest';

// Before

type Pet = 'dog' | 'cat' | string;

const petWithoutAutocomplete: Pet = '';
// Start typing in your TypeScript-enabled IDE.
// You **will not** get auto-completion for `dog` and `cat` literals.

// After

type Pet2 = LiteralUnion<'dog' | 'cat', string>;

const petWithAutoComplete: Pet2 = '';
// You **will** get auto-completion for `dog` and `cat` literals.
```

@category Type
*/
type LiteralUnion<LiteralType, BaseType extends Primitive> = LiteralType | (BaseType & Record<never, never>);
//#endregion
//#region node_modules/type-fest/source/package-json.d.ts
declare namespace PackageJson$3 {
  /**
  A person who has been involved in creating or maintaining the package.
  */
  type Person = string | {
    name: string;
    url?: string;
    email?: string;
  };
  type BugsLocation = string | {
    /**
    The URL to the package's issue tracker.
    */
    url?: string;
    /**
    The email address to which issues should be reported.
    */
    email?: string;
  };
  type DirectoryLocations = {
    [directoryType: string]: JsonValue | undefined;
    /**
    Location for executable scripts. Sugar to generate entries in the `bin` property by walking the folder.
    */
    bin?: string;
    /**
    Location for Markdown files.
    */
    doc?: string;
    /**
    Location for example scripts.
    */
    example?: string;
    /**
    Location for the bulk of the library.
    */
    lib?: string;
    /**
    Location for man pages. Sugar to generate a `man` array by walking the folder.
    */
    man?: string;
    /**
    Location for test files.
    */
    test?: string;
  };
  type Scripts = {
    /**
    Run **before** the package is published (Also run on local `npm install` without any arguments).
    */
    prepublish?: string;
    /**
    Run both **before** the package is packed and published, and on local `npm install` without any arguments. This is run **after** `prepublish`, but **before** `prepublishOnly`.
    */
    prepare?: string;
    /**
    Run **before** the package is prepared and packed, **only** on `npm publish`.
    */
    prepublishOnly?: string;
    /**
    Run **before** a tarball is packed (on `npm pack`, `npm publish`, and when installing git dependencies).
    */
    prepack?: string;
    /**
    Run **after** the tarball has been generated and moved to its final destination.
    */
    postpack?: string;
    /**
    Run **after** the package is published.
    */
    publish?: string;
    /**
    Run **after** the package is published.
    */
    postpublish?: string;
    /**
    Run **before** the package is installed.
    */
    preinstall?: string;
    /**
    Run **after** the package is installed.
    */
    install?: string;
    /**
    Run **after** the package is installed and after `install`.
    */
    postinstall?: string;
    /**
    Run **before** the package is uninstalled and before `uninstall`.
    */
    preuninstall?: string;
    /**
    Run **before** the package is uninstalled.
    */
    uninstall?: string;
    /**
    Run **after** the package is uninstalled.
    */
    postuninstall?: string;
    /**
    Run **before** bump the package version and before `version`.
    */
    preversion?: string;
    /**
    Run **before** bump the package version.
    */
    version?: string;
    /**
    Run **after** bump the package version.
    */
    postversion?: string;
    /**
    Run with the `npm test` command, before `test`.
    */
    pretest?: string;
    /**
    Run with the `npm test` command.
    */
    test?: string;
    /**
    Run with the `npm test` command, after `test`.
    */
    posttest?: string;
    /**
    Run with the `npm stop` command, before `stop`.
    */
    prestop?: string;
    /**
    Run with the `npm stop` command.
    */
    stop?: string;
    /**
    Run with the `npm stop` command, after `stop`.
    */
    poststop?: string;
    /**
    Run with the `npm start` command, before `start`.
    */
    prestart?: string;
    /**
    Run with the `npm start` command.
    */
    start?: string;
    /**
    Run with the `npm start` command, after `start`.
    */
    poststart?: string;
    /**
    Run with the `npm restart` command, before `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.
    */
    prerestart?: string;
    /**
    Run with the `npm restart` command. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.
    */
    restart?: string;
    /**
    Run with the `npm restart` command, after `restart`. Note: `npm restart` will run the `stop` and `start` scripts if no `restart` script is provided.
    */
    postrestart?: string;
  } & Partial<Record<string, string>>;
  /**
  Dependencies of the package. The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or Git URL.
  */
  type Dependency = Partial<Record<string, string>>;
  /**
  Recursive map describing selective dependency version overrides supported by npm.
  */
  type DependencyOverrides = { [packageName in string]: string | undefined | DependencyOverrides };
  /**
  Specifies requirements for development environment components such as operating systems, runtimes, or package managers. Used to ensure consistent development environments across the team.
  */
  type DevEngineDependency = {
    name: string;
    version?: string;
    onFail?: 'ignore' | 'warn' | 'error' | 'download';
  };
  /**
  A mapping of conditions and the paths to which they resolve.
  */
  type ExportConditions = {
    [condition: string]: Exports;
  };
  /**
  Entry points of a module, optionally with conditions and subpath exports.
  */
  type Exports = null | string | Array<string | ExportConditions> | ExportConditions;
  /**
  Import map entries of a module, optionally with conditions and subpath imports.
  */
  type Imports = {
    [key: `#${string}`]: Exports;
  }; // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface NonStandardEntryPoints {
    /**
    An ECMAScript module ID that is the primary entry point to the program.
    */
    module?: string;
    /**
    A module ID with untranspiled code that is the primary entry point to the program.
    */
    esnext?: string | {
      [moduleName: string]: string | undefined;
      main?: string;
      browser?: string;
    };
    /**
    A hint to JavaScript bundlers or component tools when packaging modules for client side use.
    */
    browser?: string | Partial<Record<string, string | false>>;
    /**
    Denote which files in your project are "pure" and therefore safe for Webpack to prune if unused.
    	[Read more.](https://webpack.js.org/guides/tree-shaking/)
    */
    sideEffects?: boolean | string[];
  }
  type TypeScriptConfiguration = {
    /**
    Location of the bundled TypeScript declaration file.
    */
    types?: string;
    /**
    Version selection map of TypeScript.
    */
    typesVersions?: Partial<Record<string, Partial<Record<string, string[]>>>>;
    /**
    Location of the bundled TypeScript declaration file. Alias of `types`.
    */
    typings?: string;
  };
  /**
  An alternative configuration for workspaces.
  */
  type WorkspaceConfig = {
    /**
    An array of workspace pattern strings which contain the workspace packages.
    */
    packages?: WorkspacePattern[];
    /**
    Designed to solve the problem of packages which break when their `node_modules` are moved to the root workspace directory - a process known as hoisting. For these packages, both within your workspace, and also some that have been installed via `node_modules`, it is important to have a mechanism for preventing the default Yarn workspace behavior. By adding workspace pattern strings here, Yarn will resume non-workspace behavior for any package which matches the defined patterns.
    	[Supported](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/) by Yarn.
    [Not supported](https://github.com/npm/rfcs/issues/287) by npm.
    */
    nohoist?: WorkspacePattern[];
  };
  /**
  A workspace pattern points to a directory or group of directories which contain packages that should be included in the workspace installation process.
  	The patterns are handled with [minimatch](https://github.com/isaacs/minimatch).
  	@example
  `docs` → Include the docs directory and install its dependencies.
  `packages/*` → Include all nested directories within the packages directory, like `packages/cli` and `packages/core`.
  */
  type WorkspacePattern = string;
  type YarnConfiguration = {
    /**
    If your package only allows one version of a given dependency, and you’d like to enforce the same behavior as `yarn install --flat` on the command-line, set this to `true`.
    	Note that if your `package.json` contains `"flat": true` and other packages depend on yours (e.g. you are building a library rather than an app), those other packages will also need `"flat": true` in their `package.json` or be installed with `yarn install --flat` on the command-line.
    */
    flat?: boolean;
    /**
    Selective version resolutions. Allows the definition of custom package versions inside dependencies without manual edits in the `yarn.lock` file.
    */
    resolutions?: Dependency;
  };
  type JSPMConfiguration = {
    /**
    JSPM configuration.
    */
    jspm?: PackageJson$3;
  };
  /**
  Type for [npm's `package.json` file](https://docs.npmjs.com/creating-a-package-json-file). Containing standard npm properties.
  */
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface PackageJsonStandard {
    /**
    The name of the package.
    */
    name?: string;
    /**
    Package version, parseable by [`node-semver`](https://github.com/npm/node-semver).
    */
    version?: string;
    /**
    Package description, listed in `npm search`.
    */
    description?: string;
    /**
    Keywords associated with package, listed in `npm search`.
    */
    keywords?: string[];
    /**
    The URL to the package's homepage.
    */
    homepage?: LiteralUnion<'.', string>;
    /**
    The URL to the package's issue tracker and/or the email address to which issues should be reported.
    */
    bugs?: BugsLocation;
    /**
    The license for the package.
    */
    license?: string;
    /**
    The licenses for the package.
    */
    licenses?: Array<{
      type?: string;
      url?: string;
    }>;
    author?: Person;
    /**
    A list of people who contributed to the package.
    */
    contributors?: Person[];
    /**
    A list of people who maintain the package.
    */
    maintainers?: Person[];
    /**
    The files included in the package.
    */
    files?: string[];
    /**
    Resolution algorithm for importing ".js" files from the package's scope.
    	[Read more.](https://nodejs.org/api/esm.html#esm_package_json_type_field)
    */
    type?: 'module' | 'commonjs';
    /**
    The module ID that is the primary entry point to the program.
    */
    main?: string;
    /**
    Subpath exports to define entry points of the package.
    	[Read more.](https://nodejs.org/api/packages.html#subpath-exports)
    */
    exports?: Exports;
    /**
    Subpath imports to define internal package import maps that only apply to import specifiers from within the package itself.
    	[Read more.](https://nodejs.org/api/packages.html#subpath-imports)
    */
    imports?: Imports;
    /**
    The executable files that should be installed into the `PATH`.
    */
    bin?: string | Partial<Record<string, string>>;
    /**
    Filenames to put in place for the `man` program to find.
    */
    man?: string | string[];
    /**
    Indicates the structure of the package.
    */
    directories?: DirectoryLocations;
    /**
    Location for the code repository.
    */
    repository?: string | {
      type: string;
      url: string;
      /**
      Relative path to package.json if it is placed in non-root directory (for example if it is part of a monorepo).
      [Read more.](https://github.com/npm/rfcs/blob/latest/implemented/0010-monorepo-subdirectory-declaration.md)
      */
      directory?: string;
    };
    /**
    Script commands that are run at various times in the lifecycle of the package. The key is the lifecycle event, and the value is the command to run at that point.
    */
    scripts?: Scripts;
    /**
    Is used to set configuration parameters used in package scripts that persist across upgrades.
    */
    config?: JsonObject;
    /**
    The dependencies of the package.
    */
    dependencies?: Dependency;
    /**
    Additional tooling dependencies that are not required for the package to work. Usually test, build, or documentation tooling.
    */
    devDependencies?: Dependency;
    /**
    Dependencies that are skipped if they fail to install.
    */
    optionalDependencies?: Dependency;
    /**
    Dependencies that will usually be required by the package user directly or via another dependency.
    */
    peerDependencies?: Dependency;
    /**
    Indicate peer dependencies that are optional.
    */
    peerDependenciesMeta?: Partial<Record<string, {
      optional: true;
    }>>;
    /**
    Package names that are bundled when the package is published.
    */
    bundledDependencies?: string[];
    /**
    Alias of `bundledDependencies`.
    */
    bundleDependencies?: string[];
    /**
    Overrides is used to support selective version overrides using npm, which lets you define custom package versions or ranges inside your dependencies.
    */
    overrides?: DependencyOverrides;
    /**
    Engines that this package runs on.
    */
    engines?: { [EngineName in LiteralUnion<'npm' | 'node', string>]?: string };
    /**
    @deprecated
    */
    engineStrict?: boolean;
    /**
    Operating systems the module runs on.
    */
    os?: Array<LiteralUnion<'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32' | '!aix' | '!darwin' | '!freebsd' | '!linux' | '!openbsd' | '!sunos' | '!win32', string>>;
    /**
    CPU architectures the module runs on.
    */
    cpu?: Array<LiteralUnion<'arm' | 'arm64' | 'ia32' | 'mips' | 'mipsel' | 'ppc' | 'ppc64' | 's390' | 's390x' | 'x32' | 'x64' | '!arm' | '!arm64' | '!ia32' | '!mips' | '!mipsel' | '!ppc' | '!ppc64' | '!s390' | '!s390x' | '!x32' | '!x64', string>>;
    /**
    Define the runtime and package manager for developing the current project.
    */
    devEngines?: {
      os?: DevEngineDependency | DevEngineDependency[];
      cpu?: DevEngineDependency | DevEngineDependency[];
      libc?: DevEngineDependency | DevEngineDependency[];
      runtime?: DevEngineDependency | DevEngineDependency[];
      packageManager?: DevEngineDependency | DevEngineDependency[];
    };
    /**
    If set to `true`, a warning will be shown if package is installed locally. Useful if the package is primarily a command-line application that should be installed globally.
    	@deprecated
    */
    preferGlobal?: boolean;
    /**
    If set to `true`, then npm will refuse to publish it.
    */
    private?: boolean;
    /**
    A set of config values that will be used at publish-time. It's especially handy to set the tag, registry or access, to ensure that a given package is not tagged with 'latest', published to the global public registry or that a scoped module is private by default.
    */
    publishConfig?: PublishConfig;
    /**
    Describes and notifies consumers of a package's monetary support information.
    	[Read more.](https://github.com/npm/rfcs/blob/main/implemented/0017-add-funding-support.md)
    */
    funding?: string | {
      /**
      The type of funding.
      */
      type?: LiteralUnion<'github' | 'opencollective' | 'patreon' | 'individual' | 'foundation' | 'corporation', string>;
      /**
      The URL to the funding page.
      */
      url: string;
    };
    /**
    Used to configure [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) / [Yarn workspaces](https://classic.yarnpkg.com/docs/workspaces/).
    	Workspaces allow you to manage multiple packages within the same repository in such a way that you only need to run your install command once in order to install all of them in a single pass.
    	Please note that the top-level `private` property of `package.json` **must** be set to `true` in order to use workspaces.
    */
    workspaces?: WorkspacePattern[] | WorkspaceConfig;
  }
  /**
  Type for [`package.json` file used by the Node.js runtime](https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions).
  */
  type NodeJsStandard = {
    /**
    Defines which package manager is expected to be used when working on the current project. It can set to any of the [supported package managers](https://nodejs.org/api/corepack.html#supported-package-managers), and will ensure that your teams use the exact same package manager versions without having to install anything else than Node.js.
    	__This field is currently experimental and needs to be opted-in; check the [Corepack](https://nodejs.org/api/corepack.html) page for details about the procedure.__
    	@example
    ```json
    {
    	"packageManager": "<package manager name>@<version>"
    }
    ```
    */
    packageManager?: string;
  };
  type PublishConfig = {
    /**
    Additional, less common properties from the [npm docs on `publishConfig`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#publishconfig).
    */
    [additionalProperties: string]: JsonValue | undefined;
    /**
    When publishing scoped packages, the access level defaults to restricted. If you want your scoped package to be publicly viewable (and installable) set `--access=public`. The only valid values for access are public and restricted. Unscoped packages always have an access level of public.
    */
    access?: 'public' | 'restricted';
    /**
    The base URL of the npm registry.
    	Default: `'https://registry.npmjs.org/'`
    */
    registry?: string;
    /**
    The tag to publish the package under.
    	Default: `'latest'`
    */
    tag?: string;
  };
}
/**
Type for [npm's `package.json` file](https://docs.npmjs.com/creating-a-package-json-file). Also includes types for fields used by other popular projects, like TypeScript and Yarn.

@category File
*/
type PackageJson$3 = JsonObject & PackageJson$3.NodeJsStandard & PackageJson$3.PackageJsonStandard & PackageJson$3.NonStandardEntryPoints & PackageJson$3.TypeScriptConfiguration & PackageJson$3.YarnConfiguration & PackageJson$3.JSPMConfiguration;
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/builders.d.ts
declare enum SupportedBuilder$1 {
  WEBPACK5 = "webpack5",
  VITE = "vite",
  RSBUILD = "rsbuild"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/frameworks.d.ts
declare enum SupportedFramework$1 {
  ANGULAR = "angular",
  ANGULAR_VITE = "angular-vite",
  EMBER = "ember",
  HTML_VITE = "html-vite",
  NEXTJS = "nextjs",
  NEXTJS_VITE = "nextjs-vite",
  PREACT_VITE = "preact-vite",
  REACT_NATIVE_WEB_VITE = "react-native-web-vite",
  REACT_VITE = "react-vite",
  REACT_WEBPACK5 = "react-webpack5",
  SERVER_WEBPACK5 = "server-webpack5",
  SVELTE_VITE = "svelte-vite",
  SVELTEKIT = "sveltekit",
  TANSTACK_REACT = "tanstack-react",
  VUE3_VITE = "vue3-vite",
  WEB_COMPONENTS_VITE = "web-components-vite",
  HTML_RSBUILD = "html-rsbuild",
  NUXT = "nuxt",
  QWIK = "qwik",
  REACT_RSBUILD = "react-rsbuild",
  SOLID = "solid",
  VUE3_RSBUILD = "vue3-rsbuild",
  WEB_COMPONENTS_RSBUILD = "web-components-rsbuild"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/renderers.d.ts
declare enum SupportedRenderer$1 {
  REACT = "react",
  REACT_NATIVE = "react-native",
  VUE3 = "vue3",
  ANGULAR = "angular",
  EMBER = "ember",
  PREACT = "preact",
  SVELTE = "svelte",
  QWIK = "qwik",
  HTML = "html",
  WEB_COMPONENTS = "web-components",
  SERVER = "server",
  SOLID = "solid",
  NUXT = "nuxt"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/core-common.d.ts
/** ⚠️ This file contains internal WIP types they MUST NOT be exported outside this package for now! */
type BuilderName = 'webpack5' | '@storybook/builder-webpack5' | string;
type RendererName = string;
interface CoreConfig$1 {
  builder?: BuilderName | {
    name: BuilderName;
    options?: Record<string, any>;
  };
  renderer?: RendererName;
  disableWebpackDefaults?: boolean;
  channelOptions?: Partial<Options$3> & {
    wsToken?: string;
  };
  /** Disables the generation of project.json, a file containing Storybook metadata */
  disableProjectJson?: boolean;
  /**
   * Disables Storybook telemetry
   *
   * @see https://storybook.js.org/telemetry
   */
  disableTelemetry?: boolean;
  /** Disables notifications for Storybook updates. */
  disableWhatsNewNotifications?: boolean;
  /**
   * Enable crash reports to be sent to Storybook telemetry
   *
   * @see https://storybook.js.org/telemetry
   */
  enableCrashReports?: boolean;
  /**
   * Enable hostname validation, currently only for WebSocket connections. Set to `[]` to disallow
   * all hosts except known local/network address, or `true` to allow all hosts.
   */
  allowedHosts?: string[] | true;
  /**
   * Enable CORS headings to run document in a "secure context" see:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements
   * This enables these headers in development-mode: Cross-Origin-Opener-Policy: same-origin
   *
   * ```text
   * Cross-Origin-Embedder-Policy: require-corp
   * ```
   */
  crossOriginIsolated?: boolean;
}
interface DirectoryMapping {
  from: string;
  to: string;
}
interface Presets$1 {
  apply(extension: 'typescript', config: TypescriptOptions$1, args?: Options$1): Promise<TypescriptOptions$1>;
  apply(extension: 'framework', config?: {}, args?: any): Promise<Preset>;
  apply(extension: 'babel', config?: {}, args?: any): Promise<any>;
  apply(extension: 'swc', config?: {}, args?: any): Promise<any>;
  apply(extension: 'entries', config?: [], args?: any): Promise<unknown>;
  apply(extension: 'env', config?: {}, args?: any): Promise<any>;
  apply(extension: 'stories', config?: [], args?: any): Promise<StoriesEntry$1[]>;
  apply(extension: 'managerEntries', config: [], args?: any): Promise<string[]>;
  apply(extension: 'refs', config?: [], args?: any): Promise<StorybookConfigRaw$1['refs']>;
  apply(extension: 'core', config?: StorybookConfigRaw$1['core'], args?: any): Promise<NonNullable<StorybookConfigRaw$1['core']>>;
  apply(extension: 'docs', config?: StorybookConfigRaw$1['docs'], args?: any): Promise<NonNullable<StorybookConfigRaw$1['docs']>>;
  apply(extension: 'features', config?: StorybookConfigRaw$1['features'], args?: any): Promise<NonNullable<StorybookConfigRaw$1['features']>>;
  apply(extension: 'typescript', config?: StorybookConfigRaw$1['typescript'], args?: any): Promise<NonNullable<StorybookConfigRaw$1['typescript']>>;
  apply(extension: 'build', config?: StorybookConfigRaw$1['build'], args?: any): Promise<NonNullable<StorybookConfigRaw$1['build']>>;
  apply(extension: 'staticDirs', config?: StorybookConfigRaw$1['staticDirs'], args?: any): Promise<StorybookConfigRaw$1['staticDirs']>;
  apply(extension: 'services', config?: StorybookConfigRaw$1['services'], args?: any): Promise<void>;
  apply(extension: 'experimental_docgenProvider', config: DocgenProviderDescriptor[], args?: any): Promise<DocgenProviderDescriptor[]>;
  apply(extension: 'experimental_storyDocsProvider', config: StoryDocsProvider, args?: any): Promise<StoryDocsProvider>;
  /** The second and third parameter are not needed. And make type inference easier. */
  apply<T extends keyof StorybookConfigRaw$1>(extension: T): Promise<StorybookConfigRaw$1[T]>;
  apply<T>(extension: string, config?: T, args?: unknown): Promise<T>;
}
interface LoadedPreset$1 {
  name: string;
  preset: any;
  options: any;
}
type PresetConfig$1 = string | {
  name: string;
  options?: unknown;
};
interface Ref$1 {
  id: string;
  url: string;
  title: string;
  version: string;
  type?: string;
  disable?: boolean;
}
interface VersionCheck {
  success: boolean;
  cached: boolean;
  data?: any;
  error?: any;
  time: number;
}
interface Stats {
  toJson: () => any;
}
interface BuilderResult {
  totalTime?: ReturnType<typeof process.hrtime>;
  stats?: Stats;
}
/**
 * Builder-supplied module resolution config consumed by Storybook's change-detection
 * dependency graph (and any future module-resolver consumer in core).
 *
 * Shape mirrors a subset of Vite's `resolve.*` options and is intentionally
 * builder-agnostic — webpack/rspack adapters surface the same fields.
 */
interface ModuleResolveConfig {
  /** Project root (where Storybook is started from). */
  projectRoot: string;
  /**
   * Builder-supplied alias map. Accepts both Vite shapes:
   *   - `Record<string, string>` (object form)
   *   - `Array<{ find: string | RegExp; replacement: string }>` (array form, supports regex)
   *
   * Callers may treat unresolvable specifiers (including unsupported regex aliases) as
   * terminal.
   */
  alias?: Record<string, string> | Array<{
    find: string | RegExp;
    replacement: string;
  }>;
  /** Conditions for package `exports` resolution. */
  conditions?: string[];
}
type PackageJson$2 = PackageJson$3 & Record<string, any>;
interface LoadOptions$1 {
  pnp?: boolean;
  packageJson?: PackageJson$2;
  outputDir?: string;
  configDir?: string;
  cacheKey?: string;
  ignorePreview?: boolean;
  extendServer?: (server: Server) => void;
}
interface CLIBaseOptions {
  disableTelemetry?: boolean;
  enableCrashReports?: boolean;
  configDir?: string;
  loglevel?: LogLevel;
  logfile?: string | boolean;
  quiet?: boolean;
}
interface CLIOptions$1 extends CLIBaseOptions {
  port?: number;
  ignorePreview?: boolean;
  previewUrl?: string;
  forceBuildPreview?: boolean;
  host?: string;
  initialPath?: string;
  exactPort?: boolean;
  https?: boolean;
  sslCa?: string[];
  sslCert?: string;
  sslKey?: string;
  smokeTest?: boolean;
  managerCache?: boolean;
  open?: boolean;
  ci?: boolean;
  versionUpdates?: boolean;
  docs?: boolean;
  test?: boolean;
  debugWebpack?: boolean;
  webpackStatsJson?: string | boolean;
  statsJson?: string | boolean;
  outputDir?: string;
  previewOnly?: boolean;
}
interface BuilderOptions$1 {
  configType?: 'DEVELOPMENT' | 'PRODUCTION';
  ignorePreview?: boolean;
  cache?: FileSystemCache;
  configDir: string;
  docsMode?: boolean;
  features?: StorybookConfigRaw$1['features'];
  versionCheck?: VersionCheck;
  disableWebpackDefaults?: boolean;
  serverChannelUrl?: string;
  localAddress?: string;
  networkAddress?: string;
}
interface StorybookConfigOptions {
  presets: Presets$1;
  presetsList?: LoadedPreset$1[];
  channel: ChannelLike;
}
type Options$1 = LoadOptions$1 & StorybookConfigOptions & CLIOptions$1 & BuilderOptions$1 & {
  build?: TestBuildConfig;
};
type Middleware<T extends IncomingMessage = IncomingMessage> = (req: T & IncomingMessage, res: ServerResponse, next: (err?: string | Error) => Promise<void> | void) => Promise<void> | void;
interface ServerApp<T extends IncomingMessage = IncomingMessage> {
  server: Server$1;
  use(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
  use(...handlers: Middleware<T>[]): this;
  get(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
  post(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
  put(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
  patch(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
  delete(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
  head(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
  options(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
  connect(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
  trace(pattern: RegExp | string, ...handlers: Middleware<T>[]): this;
}
interface Builder<Config, BuilderStats extends Stats = Stats> {
  getConfig: (options: Options$1) => Promise<Config>;
  start: (args: {
    options: Options$1;
    startTime: ReturnType<typeof process.hrtime>;
    router: ServerApp;
    server: Server;
    channel: ChannelLike;
  }) => Promise<void | {
    stats?: BuilderStats;
    totalTime: ReturnType<typeof process.hrtime>;
    bail: (e?: Error) => Promise<void>;
  }>;
  build: (arg: {
    options: Options$1;
    startTime: ReturnType<typeof process.hrtime>;
  }) => Promise<void | BuilderStats>;
  bail: (e?: Error) => Promise<void>;
  corePresets?: string[];
  overridePresets?: string[];
  /**
   * Returns a change-detection adapter the core change-detection service uses to (a) read
   * builder resolve config (alias, root, conditions), and (b) subscribe to file-system events.
   */
  changeDetectionAdapter?(): ChangeDetectionAdapter;
}
/** Options for TypeScript usage within Storybook. */
interface TypescriptOptions$1 {
  /**
   * Enables type checking within Storybook.
   *
   * @default false
   */
  check: boolean;
  /**
   * Disable parsing TypeScript files through compiler.
   *
   * @default false
   */
  skipCompiler: boolean;
}
type Preset = string | {
  name: string;
  options?: any;
};
/** An additional script that gets injected into the preview or the manager, */
type Entry = string;
type CoreCommon_StorybookRefs = Record<string, {
  title: string;
  url: string;
} | {
  disable: boolean;
  expanded?: boolean;
}>;
type DocsOptions$1 = {
  /** What should we call the generated docs entries? */defaultName?: string; /** Only show doc entries in the side bar (usually set with the `--docs` CLI flag) */
  docsMode?: boolean;
};
interface TestBuildFlags {
  /**
   * The package @storybook/blocks will be excluded from the bundle, even when imported in e.g. the
   * preview.
   */
  disableBlocks?: boolean;
  /** Disable specific addons */
  disabledAddons?: string[];
  /** Filter out .mdx stories entries */
  disableMDXEntries?: boolean;
  /** Override autodocs to be disabled */
  disableAutoDocs?: boolean;
  /** Override docgen to be disabled. */
  disableDocgen?: boolean;
  /** Override sourcemaps generation to be disabled. */
  disableSourcemaps?: boolean;
  /** Override tree-shaking (dead code elimination) to be disabled. */
  disableTreeShaking?: boolean;
  /** Minify with ESBuild when using webpack. */
  esbuildMinify?: boolean;
}
interface TestBuildConfig {
  test?: TestBuildFlags;
}
type Tag$3 = string;
interface TagOptions {
  /** Visually include or exclude stories with this tag in the sidebar by default */
  defaultFilterSelection?: 'include' | 'exclude' | undefined;
  excludeFromSidebar: boolean;
  excludeFromDocsStories: boolean;
}
type TagsOptions$1 = Record<Tag$3, Partial<TagOptions>>;
type ComponentSubcomponentManifest = Pick<ComponentManifest, 'name' | 'path' | 'description' | 'import' | 'summary' | 'jsDocTags' | 'error'>;
interface ComponentManifest {
  id: string;
  path: string;
  name: string;
  description?: string | undefined;
  import?: string | undefined;
  summary?: string | undefined;
  stories: {
    id: string;
    name: string;
    snippet?: string | undefined;
    description?: string | undefined;
    summary?: string | undefined;
    error?: {
      name: string;
      message: string;
    };
  }[];
  jsDocTags: Record<string, string[]>;
  subcomponents?: Record<string, ComponentSubcomponentManifest>;
  error?: {
    name: string;
    message: string;
  };
}
interface ComponentsManifest {
  v: number;
  components: Record<string, ComponentManifest>;
  meta?: {
    docgen: 'react-docgen' | 'react-docgen-typescript' | 'react-component-meta';
    durationMs: number;
  };
}
type ManifestName = string;
type Manifests = {
  components?: ComponentsManifest;
} & Record<ManifestName, unknown>;
type CsfEnricher$1 = (csf: CsfFile, csfSource: CsfFile) => Promise<void>;
/**
 * The feature flags configured under the `features` key in `.storybook/main.ts`.
 *
 * Addons can declare their own feature flags through TypeScript module augmentation:
 *
 * ```ts
 * declare module 'storybook/internal/types' {
 *   interface StorybookFeatures {
 *     myAddonFeature?: boolean;
 *   }
 * }
 * ```
 */
interface StorybookFeatures {
  /**
   * Enable the integrated viewport addon
   *
   * @default true
   */
  viewport?: boolean;
  /**
   * Enable the integrated highlight addon
   *
   * @default true
   */
  highlight?: boolean;
  /**
   * Enable the integrated backgrounds addon
   *
   * @default true
   */
  backgrounds?: boolean;
  /**
   * Enable the integrated measure addon
   *
   * @default true
   */
  measure?: boolean;
  /**
   * Enable the integrated outline addon
   *
   * @default true
   */
  outline?: boolean;
  /**
   * Enable the integrated controls addon
   *
   * @default true
   */
  controls?: boolean;
  /**
   * Enable the integrated interactions addon
   *
   * @default true
   */
  interactions?: boolean;
  /**
   * Enable the integrated actions addon
   *
   * @default true
   */
  actions?: boolean;
  /**
   * Enable the onboarding checklist sidebar widget
   *
   * @default true
   */
  sidebarOnboardingChecklist?: boolean;
  /**
   * Enable the onboarding guide page in the menu
   *
   * @default true
   */
  menuOnboardingChecklist?: boolean;
  /**
   * @temporary This feature flag is a migration assistant, and is scheduled to be removed.
   *
   * Filter args with a "target" on the type from the render function (EXPERIMENTAL)
   */
  argTypeTargetsV7?: boolean;
  /**
   * @temporary This feature flag is a migration assistant, and is scheduled to be removed.
   *
   * Apply decorators from preview.js before decorators from addons or frameworks
   */
  legacyDecoratorFileOrder?: boolean;
  /**
   * @temporary This feature flag is a migration assistant, and is scheduled to be removed.
   *
   * Disallow implicit actions during rendering. This will be the default in Storybook 8.
   *
   * This will make sure that your story renders the same no matter if docgen is enabled or not.
   */
  disallowImplicitActionsInRenderV8?: boolean;
  /**
   * @temporary This feature flag is a migration assistant, and is scheduled to be removed.
   *
   * Enable asynchronous component rendering in React renderer
   */
  experimentalRSC?: boolean;
  /**
   * @temporary This feature flag is a migration assistant, and is scheduled to be removed.
   *
   * Set NODE_ENV to development in built Storybooks for better testability and debuggability
   */
  developmentModeForBuild?: boolean;
  /** Only show input controls in Angular */
  angularFilterNonInputControls?: boolean;
  /**
   * Enable component manifest generation for MCP and other tooling integrations.
   *
   * @default false
   */
  componentsManifest?: boolean;
  /**
   * Use TypeScript LanguageService (react-component-meta) for extracting React component props
   * instead of react-docgen / react-docgen-typescript.
   *
   * @default false
   * @experimental
   */
  experimentalReactComponentMeta?: boolean;
  /**
   * Enables the new code example generation for React components. You can see those examples when
   * clicking on the "Show code" button in the Storybook UI.
   *
   * We refactored the code examples by reading the actual source file. This should make the code
   * examples a lot faster, more readable and more accurate. They are not dynamic though, it won't
   * change if you change when using the control panel.
   *
   * @default false
   * @experimental This feature is in early development and may change significantly in future releases.
   */
  experimentalCodeExamples?: boolean;
  /**
   * Enable the experimental docgen open service.
   *
   * When true, Storybook registers the `core/docgen` service in the open-service registry and
   * generates per-component docgen JSON snapshots during static builds. Renderer and addon
   * providers contribute through the `experimental_docgenProvider` preset.
   *
   * @default false
   * @experimental This feature is in early development and may change significantly in future releases.
   */
  experimentalDocgenServer?: boolean;
  /**
   * Enable change detection
   * @default true
   */
  changeDetection?: boolean;
  /**
   * Enable the agentic review workflow: the review UI in the manager and the server-side review
   * channel that MCP tooling (e.g. `@storybook/addon-mcp`) uses to push curated reviews of code
   * changes. Builds on change detection, so `changeDetection` must also be enabled.
   *
   * @default false
   * @experimental This feature is in early development and may change significantly in future releases.
   */
  experimentalReview?: boolean;
}
interface StorybookConfigRaw$1 {
  /**
   * Sets the addons you want to use with Storybook.
   *
   * @example
   *
   * ```ts
   * addons = ['@storybook/addon-essentials'];
   * addons = [{ name: '@storybook/addon-essentials', options: { backgrounds: false } }];
   * ```
   */
  addons?: Preset[];
  core?: CoreConfig$1;
  experimental_manifests?: Manifests;
  experimental_enrichCsf?: CsfEnricher$1;
  experimental_docgenProvider?: DocgenProviderDescriptor[];
  experimental_storyDocsProvider?: StoryDocsProvider;
  staticDirs?: (DirectoryMapping | string)[];
  logLevel?: string;
  features?: StorybookFeatures;
  build?: TestBuildConfig;
  stories: StoriesEntry$1[];
  framework?: Preset;
  typescript?: Partial<TypescriptOptions$1>;
  refs?: CoreCommon_StorybookRefs;
  babel?: any;
  swc?: any;
  env?: Record<string, string>;
  babelDefault?: any;
  previewAnnotations?: Entry[];
  experimental_indexers?: Indexer$1[];
  /**
   * Register parsers that extract import edges from non-JS/TS files (e.g. .vue, .svelte).
   * Each parser claims one or more file extensions. Last registration wins on collision.
   * Lazy-load heavy SFC compilers inside the parser body — the function is awaited on first
   * use.
   *
   * Used by Storybook's change-detection dependency graph. May be reused by other consumers
   * in the future (static build, dependency analysis CLIs).
   *
   * @experimental Subject to change before stable release.
   */
  experimental_importParsers?: ImportParser[] | ((existing: ImportParser[]) => ImportParser[] | Promise<ImportParser[]>);
  storyIndexGenerator?: StoryIndexGenerator;
  experimental_devServer?: ServerApp;
  docs?: DocsOptions$1;
  previewHead?: string;
  previewBody?: string;
  previewMainTemplate?: string;
  managerHead?: string;
  tags?: TagsOptions$1;
  services?: void;
}
/**
 * The interface for Storybook configuration in `main.ts` files. This interface is public All values
 * should be wrapped with `PresetValue<>`, though there are a few exceptions: `addons`, `framework`
 */
interface StorybookConfig$1 {
  /**
   * Sets the addons you want to use with Storybook.
   *
   * @example
   *
   * ```
   * addons = ['@storybook/addon-essentials'];
   * addons = [{ name: '@storybook/addon-essentials', options: { backgrounds: false } }];
   * ```
   */
  addons?: StorybookConfigRaw$1['addons'];
  core?: PresetValue<StorybookConfigRaw$1['core']>;
  /**
   * Sets a list of directories of static files to be loaded by Storybook server
   *
   * @example
   *
   * ```ts
   * staticDirs = ['./public'];
   * staticDirs = [{ from: './public', to: '/assets' }];
   * ```
   */
  staticDirs?: PresetValue<StorybookConfigRaw$1['staticDirs']>;
  logLevel?: PresetValue<StorybookConfigRaw$1['logLevel']>;
  features?: PresetValue<StorybookConfigRaw$1['features']>;
  build?: PresetValue<StorybookConfigRaw$1['build']>;
  /**
   * Tells Storybook where to find stories.
   *
   * @example
   *
   * ```ts
   * stories = ['./src/*.stories.@(j|t)sx?'];
   * stories = async () => [...(await myCustomStoriesEntryBuilderFunc())];
   * ```
   */
  stories: PresetValue<StorybookConfigRaw$1['stories']>;
  /** Framework, e.g. '@storybook/react-vite', required in v7 */
  framework?: StorybookConfigRaw$1['framework'];
  /** Controls how Storybook handles TypeScript files. */
  typescript?: PresetValue<StorybookConfigRaw$1['typescript']>;
  /** References external Storybooks */
  refs?: PresetValue<StorybookConfigRaw$1['refs']>;
  /** Modify or return babel config. */
  babel?: PresetValue<StorybookConfigRaw$1['babel']>;
  /** Modify or return swc config. */
  swc?: PresetValue<StorybookConfigRaw$1['swc']>;
  /** Modify or return env config. */
  env?: PresetValue<StorybookConfigRaw$1['env']>;
  /** Modify or return babel config. */
  babelDefault?: PresetValue<StorybookConfigRaw$1['babelDefault']>;
  /** Add additional scripts to run in the preview a la `.storybook/preview.js` */
  previewAnnotations?: PresetValue<StorybookConfigRaw$1['previewAnnotations']>;
  /** Process CSF files for the story index. */
  experimental_indexers?: PresetValue<StorybookConfigRaw$1['experimental_indexers']>;
  /** Docs related features in index generation */
  docs?: PresetValue<StorybookConfigRaw$1['docs']>;
  /**
   * Programmatically modify the preview head/body HTML. The previewHead and previewBody functions
   * accept a string, which is the existing head/body, and return a modified string.
   */
  previewHead?: PresetValue<StorybookConfigRaw$1['previewHead']>;
  previewBody?: PresetValue<StorybookConfigRaw$1['previewBody']>;
  /**
   * Programmatically override the preview's main page template. This should return a reference to a
   * file containing an `.ejs` template that will be interpolated with environment variables.
   *
   * @example
   *
   * ```ts
   * previewMainTemplate = '.storybook/index.ejs';
   * ```
   */
  previewMainTemplate?: PresetValue<StorybookConfigRaw$1['previewMainTemplate']>;
  /**
   * Programmatically modify the preview head/body HTML. The managerHead function accept a string,
   * which is the existing head content, and return a modified string.
   */
  managerHead?: PresetValue<StorybookConfigRaw$1['managerHead']>;
  /** Configure non-standard tag behaviors */
  tags?: PresetValue<StorybookConfigRaw$1['tags']>;
  /** Run open-service registration side effects for the server environment. */
  services?: PresetValue<StorybookConfigRaw$1['services']>;
  /**
   * Provider descriptors for the experimental docgen service. Each registrant appends a
   * structured-clone-safe {@link DocgenProviderDescriptor} (a module specifier) to the accumulated
   * array; core's docgen worker imports and composes them middleware-style off the main thread.
   */
  experimental_docgenProvider?: PresetValue<StorybookConfigRaw$1['experimental_docgenProvider']>;
  /**
   * Middleware-style provider for the experimental story-docs service. Each registrant receives the
   * previously accumulated provider as its config argument and returns a wrapping provider that
   * may delegate to it via the input forwarding pattern.
   */
  experimental_storyDocsProvider?: PresetValue<StorybookConfigRaw$1['experimental_storyDocsProvider']>;
}
type PresetValue<T> = T | ((config: T, options: Options$1) => T | Promise<T>);
type PresetProperty<K, TStorybookConfig = StorybookConfigRaw$1> = TStorybookConfig[K extends keyof TStorybookConfig ? K : never] | PresetPropertyFn<K, TStorybookConfig>;
type PresetPropertyFn<K, TStorybookConfig = StorybookConfigRaw$1, TOptions = {}> = (config: TStorybookConfig[K extends keyof TStorybookConfig ? K : never], options: Options$1 & TOptions) => TStorybookConfig[K extends keyof TStorybookConfig ? K : never] | Promise<TStorybookConfig[K extends keyof TStorybookConfig ? K : never]>;
interface CoreCommon_ResolvedAddonPreset$1 {
  type: 'presets';
  name: string;
}
type PreviewAnnotation = string | {
  bare: string;
  absolute: string;
};
interface CoreCommon_ResolvedAddonVirtual$1 {
  type: 'virtual';
  name: string;
  managerEntries?: string[];
  previewAnnotations?: PreviewAnnotation[];
  presets?: (string | {
    name: string;
    options?: any;
  })[];
}
type CoreCommon_OptionsEntry = {
  name: string;
};
type CoreCommon_AddonEntry = string | CoreCommon_OptionsEntry;
type CoreCommon_AddonInfo$1 = {
  name: string;
  inEssentials: boolean;
};
interface CoreCommon_StorybookInfo$1 {
  addons: string[];
  versionSpecifier?: string;
  framework?: SupportedFramework$1;
  renderer?: SupportedRenderer$1;
  builder?: SupportedBuilder$1;
  rendererPackage?: string;
  frameworkPackage?: string;
  builderPackage?: string;
  configDir?: string;
  mainConfig: StorybookConfigRaw$1;
  mainConfigPath?: string;
  previewConfigPath?: string;
  managerConfigPath?: string;
}
/**
 * Given a generic string type, returns that type but ensures that a string in general is compatible
 * with it. We use this construct to ensure that IDEs can provide better autocompletion for string
 * types. This is, for example, needed for main config fields, where we want to ensure that the user
 * can provide a custom string, but also a string that is compatible with the type.
 *
 * @example
 *
 * ```ts
 * type Framework = CompatibleString<'@storybook/nextjs'>;
 * const framework: Framework = '@storybook/nextjs'; // valid and will be autocompleted const framework: Framework =
 * path.dirname(require.resolve(path.join('@storybook/nextjs', 'package.json'))); // valid
 * ```
 */
type CompatibleString<T extends string> = T | (string & {});
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/services/story-docs/types.d.ts
/**
 * Caller-facing input to a story-docs provider middleware.
 *
 * `entry` is the authoritative story-index entry for the requested component, selected with the
 * same rules as the React component manifest generator (`selectComponentEntriesByComponentId` in
 * `storybook/internal/common`).
 */
interface StoryDocsProviderInput {
  entry: IndexEntry$1;
}
/** Free-form error attached to a story snippet entry. */
interface StoryDocsError {
  name: string;
  message: string;
}
/** Snippet + metadata for one story under a component. */
interface StoryDoc {
  id: string;
  name: string;
  snippet?: string;
  description?: string;
  summary?: string;
  error?: StoryDocsError;
}
/** Story docs keyed by story id for O(1) lookup and fine-grained open-service subscriptions. */
type StoryDocsById = Record<string, StoryDoc>;
/**
 * Story-docs payload returned by `core/story-docs`'s `storyDocs` query.
 *
 * Carries per-story snippets and descriptions plus file-level import statements. Import snippets
 * do not currently honor the component `@import` JSDoc override tag — see the story-docs service
 * README for details.
 */
interface StoryDocsPayload {
  id: string;
  name: string;
  /** CSF story file import path from the index entry. */
  path: string;
  /** Suggested import statement(s) prepended to story snippets in docs. */
  import?: string;
  stories: StoryDocsById;
  error?: StoryDocsError;
}
/**
 * Middleware-style provider function registered through the `experimental_storyDocsProvider` preset.
 */
type StoryDocsProvider = (input: StoryDocsProviderInput) => Promise<StoryDocsPayload | undefined>;
/**
 * Preset signature for `experimental_storyDocsProvider`.
 */
type StoryDocsProviderPreset = (nextStoryDocs: StoryDocsProvider, options: Options$1) => StoryDocsProvider | Promise<StoryDocsProvider>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/services/story-docs/definition.d.ts
type StoryDocsServiceState = {
  /** Extracted story docs keyed by component id. Populated by the `extractStoryDocs` command. */components: Record<string, StoryDocsPayload>;
};
/**
 * Definition for the `core/story-docs` open service.
 *
 * Carries per-story snippets, descriptions, and file-level import statements keyed by component
 * id. Component prop docgen lives in `core/docgen`.
 */
declare const storyDocsServiceDef: import("storybook/open-service").ServiceDefinition<StoryDocsServiceState, {
  readonly storyDocs: import("storybook/open-service").QueryDefinition<StoryDocsServiceState, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<ObjectSchema<{
    readonly id: StringSchema<undefined>;
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, import("storybook/open-service").QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"storyDocs\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly storyDocsForAllComponents: import("storybook/open-service").QueryDefinition<StoryDocsServiceState, VoidSchema<undefined>, RecordSchema<StringSchema<undefined>, ObjectSchema<{
    readonly id: StringSchema<undefined>;
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, import("storybook/open-service").QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"storyDocsForAllComponents\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly storyDocs: {
    output: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly storyDocsForAllComponents: {
    output: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  };
}, {
  readonly extractStoryDocs: import("storybook/open-service").CommandDefinition<StoryDocsServiceState, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<ObjectSchema<{
    readonly id: StringSchema<undefined>;
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, import("storybook/open-service").QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractStoryDocs\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly extractAllStoryDocs: import("storybook/open-service").CommandDefinition<StoryDocsServiceState, UndefinedSchema<undefined>, VoidSchema<undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, import("storybook/open-service").QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractAllStoryDocs\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly extractStoryDocs: {
    output: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly extractAllStoryDocs: {
    output: VoidSchema<undefined>;
  };
}, "core/story-docs">;
type StoryDocsService = ServiceInstanceOf<typeof storyDocsServiceDef>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/services/story-docs/snippet.d.ts
/** Prepends a CSF file import block to a story snippet for display in docs and the Code panel. */
declare function prependImportToSnippet(importBlock: string | undefined, snippet: string): string;
/** Resolves the story-docs entry for one story from a story-docs payload. */
declare function selectStoryDoc(payload: StoryDocsPayload | undefined, storyId: string): StoryDoc | undefined;
/** Resolves the display snippet for one story from a story-docs payload. */
declare function selectSnippetForStory(payload: StoryDocsPayload | undefined, storyId: string): string | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/services/module-graph/types.d.ts
/** JSON-serializable reverse index shape stored in open-service state. */
type StoriesByFileRecord = Record<string, Record<string, number>>;
type ErrorLike = {
  message: string;
  name?: string;
  stack?: string;
  cause?: ErrorLike;
};
type ModuleGraphStatus = {
  value: 'booting';
} | {
  value: 'ready';
} | {
  value: 'error';
  error: ErrorLike;
} | {
  value: 'unavailable';
  reason: string;
  error?: ErrorLike;
};
type ModuleGraphServiceState = {
  /** Project root used to normalize absolute file paths in query inputs. */workingDir: string;
  status: ModuleGraphStatus;
  graphRevision: number;
  storiesByFile: StoriesByFileRecord;
  /**
   * Per-story revision stamps keyed by story-index-style relative path. Each entry holds the
   * {@link graphRevision} at which that story's subgraph last changed. Seeded to `0` for every
   * story at snapshot time so scoped `graphRevision` reads observe existing keys.
   */
  storyChangeRevisions: Record<string, number>;
  latestChangedStoryFiles: string[];
};
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/core-service-types.d.ts
/**
 * The core services registered in each runtime.
 *
 * These lists are the single source of truth: the `*CoreServices` types below derive their keys
 * from each definition's `id` (so `getService` typing follows the list), and
 * `core-service-types.test.ts` checks the lists against the per-runtime registrar-file convention
 * (a `services/<name>/<runtime>.{ts,tsx}` file exists for each listed service, and vice versa) to
 * catch a service being added to one without the other. Note this guards the convention, not the
 * actual call: a service can have a registrar file yet still not be wired up by its caller.
 *
 * Each list only references definitions already loaded in that runtime, and the runtime entrypoints
 * import the derived *types* (`import type`), so these value imports add no runtime cost to the
 * manager/preview/server bundles — only the membership test pulls them in as values.
 */
declare const managerCoreServiceDefs: ServiceDefinition<{
  components: Record<string, DocgenPayload$1>;
}, {
  readonly docgen: QueryDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"docgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly docgenForAllComponents: QueryDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, VoidSchema<undefined>, RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"docgenForAllComponents\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly docgen: {
    output: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly docgenForAllComponents: {
    output: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
}, {
  readonly extractDocgen: CommandDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractDocgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly extractAllDocgen: CommandDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, UndefinedSchema<undefined>, VoidSchema<undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractAllDocgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly extractDocgen: {
    output: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly extractAllDocgen: {
    output: VoidSchema<undefined>;
  };
}, "core/docgen">[];
declare const previewCoreServiceDefs: (ServiceDefinition<{
  components: Record<string, DocgenPayload$1>;
}, {
  readonly docgen: QueryDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"docgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly docgenForAllComponents: QueryDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, VoidSchema<undefined>, RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"docgenForAllComponents\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly docgen: {
    output: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly docgenForAllComponents: {
    output: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
}, {
  readonly extractDocgen: CommandDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractDocgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly extractAllDocgen: CommandDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, UndefinedSchema<undefined>, VoidSchema<undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractAllDocgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly extractDocgen: {
    output: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly extractAllDocgen: {
    output: VoidSchema<undefined>;
  };
}, "core/docgen"> | ServiceDefinition<StoryDocsServiceState, {
  readonly storyDocs: QueryDefinition<StoryDocsServiceState, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<ObjectSchema<{
    readonly id: StringSchema<undefined>;
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"storyDocs\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly storyDocsForAllComponents: QueryDefinition<StoryDocsServiceState, VoidSchema<undefined>, RecordSchema<StringSchema<undefined>, ObjectSchema<{
    readonly id: StringSchema<undefined>;
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"storyDocsForAllComponents\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly storyDocs: {
    output: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly storyDocsForAllComponents: {
    output: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  };
}, {
  readonly extractStoryDocs: CommandDefinition<StoryDocsServiceState, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<ObjectSchema<{
    readonly id: StringSchema<undefined>;
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractStoryDocs\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly extractAllStoryDocs: CommandDefinition<StoryDocsServiceState, UndefinedSchema<undefined>, VoidSchema<undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractAllStoryDocs\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly extractStoryDocs: {
    output: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly extractAllStoryDocs: {
    output: VoidSchema<undefined>;
  };
}, "core/story-docs">)[];
declare const serverCoreServiceDefs: (ServiceDefinition<{
  components: Record<string, DocgenPayload$1>;
}, {
  readonly docgen: QueryDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"docgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly docgenForAllComponents: QueryDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, VoidSchema<undefined>, RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"docgenForAllComponents\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly docgen: {
    output: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly docgenForAllComponents: {
    output: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
}, {
  readonly extractDocgen: CommandDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<LooseObjectSchema<{
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
    readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: StringSchema<undefined>;
    readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      name: StringSchema<undefined>;
      path: StringSchema<undefined>;
      description: OptionalSchema<StringSchema<undefined>, undefined>;
      summary: OptionalSchema<StringSchema<undefined>, undefined>;
      jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      import: OptionalSchema<StringSchema<undefined>, undefined>;
    }, undefined>, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractDocgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly extractAllDocgen: CommandDefinition<{
    components: Record<string, DocgenPayload$1>;
  }, UndefinedSchema<undefined>, VoidSchema<undefined>, {
    readonly extractDocgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllDocgen: UndefinedSchema<undefined>;
  }, {
    readonly extractDocgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllDocgen: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly docgen: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly docgenForAllComponents: VoidSchema<undefined>;
  }, {
    readonly docgen: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly docgenForAllComponents: RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractAllDocgen\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly extractDocgen: {
    output: OptionalSchema<LooseObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
      readonly argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
      readonly id: StringSchema<undefined>;
      readonly subcomponents: OptionalSchema<RecordSchema<StringSchema<undefined>, LooseObjectSchema<{
        name: StringSchema<undefined>;
        path: StringSchema<undefined>;
        description: OptionalSchema<StringSchema<undefined>, undefined>;
        summary: OptionalSchema<StringSchema<undefined>, undefined>;
        jsDocTags: RecordSchema<StringSchema<undefined>, ArraySchema<StringSchema<undefined>, undefined>, undefined>;
        argTypes: OptionalSchema<CustomSchema<StrictArgTypes$3<import("@storybook/react").Args>, undefined>, undefined>;
        error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
        import: OptionalSchema<StringSchema<undefined>, undefined>;
      }, undefined>, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly extractAllDocgen: {
    output: VoidSchema<undefined>;
  };
}, "core/docgen"> | ServiceDefinition<ModuleGraphServiceState, {
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
}, "core/module-graph"> | ServiceDefinition<StoryDocsServiceState, {
  readonly storyDocs: QueryDefinition<StoryDocsServiceState, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<ObjectSchema<{
    readonly id: StringSchema<undefined>;
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"storyDocs\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly storyDocsForAllComponents: QueryDefinition<StoryDocsServiceState, VoidSchema<undefined>, RecordSchema<StringSchema<undefined>, ObjectSchema<{
    readonly id: StringSchema<undefined>;
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"storyDocsForAllComponents\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly storyDocs: {
    output: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly storyDocsForAllComponents: {
    output: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  };
}, {
  readonly extractStoryDocs: CommandDefinition<StoryDocsServiceState, ObjectSchema<{
    readonly id: StringSchema<undefined>;
  }, undefined>, OptionalSchema<ObjectSchema<{
    readonly id: StringSchema<undefined>;
    readonly name: StringSchema<undefined>;
    readonly path: StringSchema<undefined>;
    readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
    readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly error: OptionalSchema<ObjectSchema<{
      readonly name: StringSchema<undefined>;
      readonly message: StringSchema<undefined>;
    }, undefined>, undefined>;
  }, undefined>, undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractStoryDocs\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
  readonly extractAllStoryDocs: CommandDefinition<StoryDocsServiceState, UndefinedSchema<undefined>, VoidSchema<undefined>, {
    readonly extractStoryDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly extractAllStoryDocs: UndefinedSchema<undefined>;
  }, {
    readonly extractStoryDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly extractAllStoryDocs: VoidSchema<undefined>;
  }, QueryFunctions<{
    readonly storyDocs: ObjectSchema<{
      readonly id: StringSchema<undefined>;
    }, undefined>;
    readonly storyDocsForAllComponents: VoidSchema<undefined>;
  }, {
    readonly storyDocs: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
    readonly storyDocsForAllComponents: RecordSchema<StringSchema<undefined>, ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  }>> & ({
    __internal_naming_error: "Operation \"extractAllStoryDocs\" has internal: true but must be prefixed with \"_\"";
  } | {
    internal?: false;
  });
} & {
  readonly extractStoryDocs: {
    output: OptionalSchema<ObjectSchema<{
      readonly id: StringSchema<undefined>;
      readonly name: StringSchema<undefined>;
      readonly path: StringSchema<undefined>;
      readonly import: OptionalSchema<StringSchema<undefined>, undefined>;
      readonly stories: RecordSchema<StringSchema<undefined>, ObjectSchema<{
        readonly id: StringSchema<undefined>;
        readonly name: StringSchema<undefined>;
        readonly snippet: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly description: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly summary: OptionalSchema<StringSchema<undefined>, undefined>;
        readonly error: OptionalSchema<ObjectSchema<{
          readonly name: StringSchema<undefined>;
          readonly message: StringSchema<undefined>;
        }, undefined>, undefined>;
      }, undefined>, undefined>;
      readonly error: OptionalSchema<ObjectSchema<{
        readonly name: StringSchema<undefined>;
        readonly message: StringSchema<undefined>;
      }, undefined>, undefined>;
    }, undefined>, undefined>;
  };
  readonly extractAllStoryDocs: {
    output: VoidSchema<undefined>;
  };
}, "core/story-docs">)[];
/** Maps a list of service definitions to `{ [id]: instance }`, keyed by each definition's id. */
type CoreServices<TDefs extends readonly AnyServiceDefinition[]> = { [Def in TDefs[number] as Def['id']]: ServiceInstanceOf<Def> };
/** Core services registered in the Storybook manager. */
type ManagerCoreServices = CoreServices<typeof managerCoreServiceDefs>;
/** Core services registered in the preview. */
type PreviewCoreServices = CoreServices<typeof previewCoreServiceDefs>;
/** Core services registered on the dev server. */
type ServerCoreServices = CoreServices<typeof serverCoreServiceDefs>;
/** Module-level `getService` overloads keyed by a per-runtime core-service map. */
interface TypedGetService<TMap> {
  <K extends keyof TMap & ServiceId>(serviceId: K): TMap[K];
  <TInstance = RuntimeService>(serviceId: ServiceId): TInstance;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/use-service-command.d.ts
/**
 * React hook to get a stable reference to a service command.
 *
 * Fire-and-forget: the returned async function invokes the command and returns a Promise.
 * Callers manage their own loading/error state. This keeps the hook minimal and composable
 * with any state management approach (local `useState`, `useReducer`, TanStack Query, etc.).
 *
 * The reference is stable as long as `service` and `commandName` do not change, so it is
 * safe to pass to child components or include in effect dependency arrays.
 */
type CommandFn<TCommands, TKey extends keyof TCommands> = TCommands[TKey] extends ((...args: any[]) => any) ? TCommands[TKey] : never;
/**
 * Returns a stable reference to the named service command.
 *
 * @param service - A service instance from `registerService`.
 * @param commandName - The name of the command to invoke.
 *
 * @example
 * ```tsx
 * const assignField = useServiceCommand(service, 'assignRecordField');
 *
 * return (
 *   <button onClick={() => assignField({ entryId: 'a', fieldKey: 'x', fieldValue: 'y' })}>
 *     Update
 *   </button>
 * );
 * ```
 */
declare function useServiceCommand<TInstance extends {
  commands: Record<string, (input: any) => Promise<any>>;
}, TKey extends keyof TInstance['commands'] & string>(service: TInstance, commandName: TKey): CommandFn<TInstance['commands'], TKey>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/use-service-query.d.ts
/**
 * Subscribe to a service query and receive reactive {@link QueryState} updates in a React component.
 *
 * Pass the query directly (e.g. `myService.queries.thing`) so its input/output types infer per
 * query. The service must exist: if it may be absent (e.g. behind a feature flag), guard at a parent
 * and conditionally render the component that calls this hook.
 *
 * A void-input query needs no input argument. As soon as a selector is involved the input is
 * positional, so a void-input query passes `undefined` explicitly:
 * `useServiceQuery(query, undefined, selector)`.
 *
 * @example
 * ```tsx
 * const { data, isInitialLoading, isError } = useServiceQuery(recordService.queries.recordFields, {
 *   entryId: 'a',
 * });
 * ```
 */
declare function useServiceQuery<TOutput>(query: Query<void, TOutput>): QueryState<TOutput>;
declare function useServiceQuery<TInput, TOutput>(query: Query<TInput, TOutput>, input: TInput): QueryState<TOutput>;
declare function useServiceQuery<TInput, TOutput, TSelected>(query: Query<TInput, TOutput>, input: TInput, selector: (value: TOutput) => TSelected): QueryState<TSelected>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/manager.d.ts
declare const getService$1: TypedGetService<ManagerCoreServices>;
/**
 * Registers a service in the manager and returns its runtime surface.
 *
 * The manager is a relay hub: it bridges the dev server and the preview iframes. The channel is read
 * via `getChannel()` from `storybook/internal/channels`, which the manager runtime installs before any
 * `addons.register` callback runs, so no manual channel setup is needed.
 */
declare function registerService$1<TState, TQueries extends Queries<TState>, TCommands extends Commands<TState>>(definition: ServiceDefinition<TState, TQueries, TCommands>, registration?: ServiceRegistrationOptions<TState, TQueries, TCommands>): ServiceInstance<TState, TQueries, TCommands> & ServiceRegistryApi;
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/api-stories.d.ts
interface API_BaseEntry {
  id: StoryId$2;
  depth: number;
  name: string;
  tags: Tag$2[];
  refId?: string;
  renderLabel?: (item: API_HashEntry$1, api: any) => any;
}
interface API_RootEntry extends API_BaseEntry {
  type: 'root';
  startCollapsed?: boolean;
  children: StoryId$2[];
}
interface API_GroupEntry extends API_BaseEntry {
  type: 'group';
  parent?: StoryId$2;
  children: StoryId$2[];
}
interface API_ComponentEntry extends API_BaseEntry {
  type: 'component';
  parent?: StoryId$2;
  children: StoryId$2[];
  importPath?: Path$1;
}
interface API_DocsEntry$1 extends API_BaseEntry {
  type: 'docs';
  parent: StoryId$2;
  title: ComponentTitle$1;
  importPath: Path$1;
  prepared: boolean;
  parameters?: {
    [parameterName: string]: any;
  };
}
interface API_StoryEntry$1 extends API_BaseEntry {
  type: 'story';
  subtype: 'story';
  parent: StoryId$2;
  title: ComponentTitle$1;
  importPath: Path$1;
  exportName: string;
  prepared: boolean;
  parameters?: {
    [parameterName: string]: any;
  };
  args?: Args$2;
  argTypes?: ArgTypes$2;
  initialArgs?: Args$2;
  children?: StoryId$2[];
}
interface API_TestEntry$1 extends Omit<API_StoryEntry$1, 'subtype' | 'children'> {
  subtype: 'test';
}
type API_LeafEntry$1 = API_DocsEntry$1 | API_StoryEntry$1 | API_TestEntry$1;
/**
 * Runtime enrichment for a composed ref's stories/docs, keyed by entry id. These fields come from
 * the ref preview's STORY_PREPARED / DOCS_PREPARED events and are not part of the ref's static story
 * index, so they are cached per ref and re-applied whenever the ref index is (re)built.
 */
type API_RefStoryRuntimeData = Record<StoryId$2, Partial<Pick<API_StoryEntry$1, 'prepared' | 'parameters' | 'args' | 'argTypes' | 'initialArgs'>>>;
type API_HashEntry$1 = API_RootEntry | API_GroupEntry | API_ComponentEntry | API_DocsEntry$1 | API_StoryEntry$1 | API_TestEntry$1;
/**
 * The `IndexHash` is our manager-side representation of the `StoryIndex`. We create entries in the
 * hash not only for each story or docs entry, but also for each "group" of the component (split on
 * '/'), as that's how things are manipulated in the manager (i.e. in the sidebar)
 */
interface API_IndexHash$1 {
  [id: string]: API_HashEntry$1;
}
type API_PreparedIndexEntry = IndexEntry$1 & {
  parameters?: Parameters$2;
  argTypes?: ArgTypes$2;
  args?: Args$2;
  initialArgs?: Args$2;
};
interface API_PreparedStoryIndex$1 {
  v: number;
  entries: Record<StoryId$2, API_PreparedIndexEntry>;
}
type API_OptionsData$1 = {
  docsOptions: DocsOptions$1;
};
interface API_ReleaseNotes {
  success?: boolean;
  currentVersion?: string;
  showOnFirstLaunch?: boolean;
}
interface API_Settings$1 {
  lastTrackedStoryId: string;
}
interface API_Version$1 {
  version: string;
  info?: {
    plain: string;
  };
  [key: string]: any;
}
interface API_UnknownEntries$1 {
  [key: string]: {
    [key: string]: any;
  };
}
interface API_Versions$2 {
  latest?: API_Version$1;
  next?: API_Version$1;
  current?: API_Version$1;
}
type API_FilterFunction$1 = (item: API_PreparedIndexEntry & {
  statuses: StatusByTypeId;
}) => boolean;
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/channelApi.d.ts
interface SetStoriesStory {
  id: StoryId$2;
  name: string;
  refId?: string;
  componentId?: ComponentId;
  kind: StoryKind;
  parameters: {
    fileName: string;
    options: {
      [optionName: string]: any;
    };
    docsOnly?: boolean;
    viewMode?: API_ViewMode$1;
    [parameterName: string]: any;
  };
  argTypes?: ArgTypes$2;
  args?: Args$2;
  initialArgs?: Args$2;
}
interface SetStoriesStoryData {
  [id: string]: SetStoriesStory;
}
type SetStoriesPayload = {
  v: 2;
  error?: Error;
  globals: Args$2;
  globalParameters: Parameters$2;
  stories: SetStoriesStoryData;
  kindParameters: {
    [kind: string]: Parameters$2;
  };
} | ({
  v?: number;
  stories: SetStoriesStoryData;
} & Record<string, never>);
interface SetGlobalsPayload {
  globals: Globals$2;
  globalTypes: GlobalTypes$1;
}
interface GlobalsUpdatedPayload {
  initialGlobals: Globals$2;
  userGlobals: Globals$2;
  storyGlobals: Globals$2;
  globals: Globals$2;
}
interface StoryPreparedPayload {
  id: StoryId$2;
  parameters: Parameters$2;
  argTypes: ArgTypes$2;
  initialArgs: Args$2;
  args: Args$2;
}
interface DocsPreparedPayload {
  id: StoryId$2;
  parameters: Parameters$2;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/api.d.ts
type OrString$1<T extends string> = T | (string & {});
type API_ViewMode$1 = OrString$1<'story' | 'docs' | 'settings' | 'review'> | undefined;
type API_RenderOptions = Addon_RenderOptions$1;
interface API_RouteOptions {
  storyId: string;
  viewMode: API_ViewMode$1;
  location: RenderData['location'];
  path: string;
}
interface API_MatchOptions {
  storyId: string;
  viewMode: API_ViewMode$1;
  location: RenderData['location'];
  path: string;
}
type API_StateMerger$1<S> = (input: S) => S;
interface API_ProviderData$1<API> {
  provider: API_Provider$1<API>;
  docsOptions: DocsOptions$1;
}
interface API_Provider$1<API> {
  channel?: Channel$1;
  renderPreview?: API_IframeRenderer$1;
  handleAPI(api: API): void;
  getConfig(): {
    sidebar?: API_SidebarOptions<API>;
    theme?: ThemeVars$1;
    selectedPanel?: string;
    StoryMapper?: API_StoryMapper;
    [k: string]: any;
  };
  [key: string]: any;
}
type API_IframeRenderer$1 = (storyId: string, viewMode: API_ViewMode$1, id: string, baseUrl: string, scale: number, queryParams: Record<string, any>) => ReactElement<any, any> | null;
type FilterFunction = (entry: API_PreparedIndexEntry, excluded?: boolean) => boolean;
interface API_Layout$1 {
  initialActive: API_ActiveTabsType;
  navSize: number;
  bottomPanelHeight: number;
  rightPanelWidth: number;
  /**
   * The sizes of the panels when they were last visible used to restore the sizes when the panels
   * are shown again eg. when toggling fullscreen, panels, etc.
   */
  recentVisibleSizes: {
    navSize: number;
    bottomPanelHeight: number;
    rightPanelWidth: number;
  };
  panelPosition: API_PanelPositions$1;
  showNav: boolean;
  showPanel: boolean;
  showTabs: boolean;
  showToolbar: boolean;
}
interface API_LayoutCustomisations$1 {
  showPanel?: (state: State, defaultValue: boolean) => boolean | undefined;
  showSidebar?: (state: State, defaultValue: boolean) => boolean | undefined;
  showToolbar?: (state: State, defaultValue: boolean) => boolean | undefined;
}
interface API_UI$1 {
  name?: string;
  url?: string;
  enableShortcuts: boolean;
}
type API_PanelPositions$1 = 'bottom' | 'right';
type API_ActiveTabsType = 'sidebar' | 'canvas' | 'addons';
interface API_SidebarOptions<API = any> {
  showRoots?: boolean;
  filters?: Record<string, API_FilterFunction$1>;
  collapsedRoots?: string[];
  renderLabel?: (item: API_HashEntry$1, api: API) => any;
}
interface OnClearOptions {
  /** `true` when the user manually dismissed the notification. */
  dismissed: boolean;
  /** `true` when the notification timed out after the set duration. */
  timeout: boolean;
}
interface OnClickOptions {
  /** Function to dismiss the notification. */
  onDismiss: () => void;
}
interface API_Notification$1 {
  id: string;
  content: {
    headline: string;
    subHeadline?: string | any;
  };
  duration?: number;
  link?: string;
  icon?: React.ReactNode;
  onClear?: (options: OnClearOptions) => void;
  onClick?: (options: OnClickOptions) => void;
}
type API_Versions$1 = Record<string, string>;
type API_SetRefData$1 = Partial<API_ComposedRef$1 & {
  setStoriesData: SetStoriesStoryData;
  storyIndex: StoryIndex$1;
}>;
type API_StoryMapper = (ref: API_ComposedRef$1, story: SetStoriesStory) => SetStoriesStory;
interface API_LoadedRefData$1 {
  index?: API_IndexHash$1;
  filteredIndex?: API_IndexHash$1;
  indexError?: Error;
  previewInitialized: boolean;
  /**
   * Runtime story enrichment (args, argTypes, parameters, initialArgs, prepared) received from the
   * ref preview via STORY_PREPARED / DOCS_PREPARED, cached so it survives ref index (re)builds. See
   * `API_RefStoryRuntimeData`.
   */
  storyUpdates?: API_RefStoryRuntimeData;
}
interface API_ComposedRef$1 extends API_LoadedRefData$1 {
  id: string;
  title?: string;
  url: string;
  type?: 'auto-inject' | 'unknown' | 'lazy' | 'server-checked';
  expanded?: boolean;
  versions?: API_Versions$1;
  loginUrl?: string;
  version?: string;
  sourceUrl?: string;
  /** DO NOT USE THIS */
  internal_index?: StoryIndex$1;
}
type API_ComposedRefUpdate$1 = Partial<Pick<API_ComposedRef$1, 'title' | 'type' | 'expanded' | 'index' | 'filteredIndex' | 'versions' | 'loginUrl' | 'version' | 'indexError' | 'previewInitialized' | 'sourceUrl' | 'internal_index' | 'storyUpdates'>>;
type API_Refs$1 = Record<string, API_ComposedRef$1>;
type API_RefId = string;
type API_RefUrl = string;
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/addons.d.ts
type Addon_Types$1 = Exclude<Addon_TypesEnum$1, Addon_TypesEnum$1.experimental_PAGE | Addon_TypesEnum$1.experimental_TEST_PROVIDER>;
interface Addon_ArgType<TArg = unknown> extends InputType {
  defaultValue?: TArg;
}
type Addons_ArgTypes<TArgs = Args$2> = { [key in keyof Partial<TArgs>]: Addon_ArgType<TArgs[key]> } & { [key in string]: Addon_ArgType<unknown> };
type Addon_Comparator<T> = ((a: T, b: T) => boolean) | ((a: T, b: T) => number);
type Addon_StorySortMethod = 'configure' | 'alphabetical';
interface Addon_StorySortObjectParameter {
  method?: Addon_StorySortMethod;
  order?: any[];
  locales?: string;
  includeNames?: boolean;
}
type IndexEntryLegacy = [StoryId$2, any, Parameters$2, Parameters$2];
type Addon_StorySortComparator = Addon_Comparator<IndexEntryLegacy>;
type Addon_StorySortParameter = Addon_StorySortComparator | Addon_StorySortObjectParameter;
type Addon_StorySortComparatorV7 = Addon_Comparator<IndexEntry$1>;
type Addon_StorySortParameterV7$1 = Addon_StorySortComparatorV7 | Addon_StorySortObjectParameter;
interface Addon_OptionsParameter extends Object {
  storySort?: Addon_StorySortParameter;
  theme?: {
    base: string;
    brandTitle?: string;
  };
  [key: string]: any;
}
interface Addon_OptionsParameterV7 extends Object {
  storySort?: Addon_StorySortParameterV7$1;
  theme?: {
    base: string;
    brandTitle?: string;
  };
  [key: string]: any;
}
type Addon_StoryContext<TRenderer extends Renderer$2 = Renderer$2> = StoryContext$2<TRenderer>;
type Addon_StoryContextUpdate = Partial<Addon_StoryContext>;
interface Addon_ReturnTypeFramework<ReturnType> extends Renderer$2 {
  component: any;
  storyResult: ReturnType;
  canvasElement: any;
}
type Addon_PartialStoryFn<ReturnType = unknown> = PartialStoryFn$1<Addon_ReturnTypeFramework<ReturnType>>;
type Addon_LegacyStoryFn<ReturnType = unknown> = LegacyStoryFn$1<Addon_ReturnTypeFramework<ReturnType>>;
type Addon_ArgsStoryFn<ReturnType = unknown> = ArgsStoryFn<Addon_ReturnTypeFramework<ReturnType>>;
type Addon_StoryFn<ReturnType = unknown> = StoryFn<Addon_ReturnTypeFramework<ReturnType>>;
type Addon_DecoratorFunction<StoryFnReturnType = unknown> = DecoratorFunction$2<Addon_ReturnTypeFramework<StoryFnReturnType>>;
type Addon_LoaderFunction = LoaderFunction<Addon_ReturnTypeFramework<unknown>>;
interface Addon_WrapperSettings {
  options: object;
  parameters: {
    [key: string]: any;
  };
}
type Addon_StoryWrapper$1 = (storyFn: Addon_LegacyStoryFn, context: Addon_StoryContext, settings: Addon_WrapperSettings) => any;
type Addon_MakeDecoratorResult = (...args: any) => any;
interface Addon_AddStoryArgs<StoryFnReturnType = unknown> {
  id: StoryId$2;
  kind: StoryKind;
  name: StoryName$1;
  storyFn: Addon_StoryFn<StoryFnReturnType>;
  parameters: Parameters$2;
}
type Addon_ClientApiAddon<StoryFnReturnType = unknown> = Addon_Type & {
  apply: (a: Addon_StoryApi<StoryFnReturnType>, b: any[]) => any;
};
interface Addon_ClientApiAddons<StoryFnReturnType> {
  [key: string]: Addon_ClientApiAddon<StoryFnReturnType>;
}
type Addon_ClientApiReturnFn<StoryFnReturnType = unknown> = (...args: any[]) => Addon_StoryApi<StoryFnReturnType>;
interface Addon_StoryApi<StoryFnReturnType = unknown> {
  kind: StoryKind;
  add: (storyName: StoryName$1, storyFn: Addon_StoryFn<StoryFnReturnType>, parameters?: Parameters$2) => Addon_StoryApi<StoryFnReturnType>;
  addDecorator: (decorator: Addon_DecoratorFunction<StoryFnReturnType>) => Addon_StoryApi<StoryFnReturnType>;
  addLoader: (decorator: Addon_LoaderFunction) => Addon_StoryApi<StoryFnReturnType>;
  addParameters: (parameters: Parameters$2) => Addon_StoryApi<StoryFnReturnType>;
  [k: string]: string | Addon_ClientApiReturnFn<StoryFnReturnType>;
}
interface Addon_ClientStoryApi<StoryFnReturnType = unknown> {}
type Addon_LoadFn = () => any;
type Addon_RequireContext = any;
type Addon_Loadable = Addon_RequireContext | [Addon_RequireContext] | Addon_LoadFn;
type Addon_BaseDecorators<StoryFnReturnType> = Array<(story: () => StoryFnReturnType, context: Addon_StoryContext) => StoryFnReturnType>;
interface Addon_BaseAnnotations<TArgs, StoryFnReturnType, TRenderer extends Renderer$2 = Renderer$2> {
  /**
   * Dynamic data that are provided (and possibly updated by) Storybook and its addons.
   *
   * @see [Arg story inputs](https://storybook.js.org/docs/api/csf#args-story-inputs)
   */
  args?: Partial<TArgs>;
  /**
   * ArgTypes encode basic metadata for args, such as `name`, `description`, `defaultValue` for an
   * arg. These get automatically filled in by Storybook Docs.
   *
   * @see [Arg types](https://storybook.js.org/docs/api/arg-types)
   */
  argTypes?: Addons_ArgTypes<TArgs>;
  /**
   * Custom metadata for a story.
   *
   * @see [Parameters](https://storybook.js.org/docs/writing-stories/parameters)
   */
  parameters?: Parameters$2;
  /**
   * Wrapper components or Storybook decorators that wrap a story.
   *
   * Decorators defined in Meta will be applied to every story variation.
   *
   * @see [Decorators](https://storybook.js.org/docs/writing-stories/decorators)
   */
  decorators?: Addon_BaseDecorators<StoryFnReturnType>;
  /**
   * Define a custom render function for the story(ies). If not passed, a default render function by
   * the framework will be used.
   */
  render?: (args: TArgs, context: Addon_StoryContext<TRenderer>) => StoryFnReturnType;
  /** Function that is executed after the story is rendered. */
  play?: (context: Addon_StoryContext<TRenderer>) => Promise<void> | void;
}
interface Addon_Annotations<TArgs, StoryFnReturnType> extends Addon_BaseAnnotations<TArgs, StoryFnReturnType> {
  /**
   * Used to only include certain named exports as stories. Useful when you want to have non-story
   * exports such as mock data or ignore a few stories.
   *
   * @example
   *
   * ```ts
   * includeStories: ['SimpleStory', 'ComplexStory'];
   * includeStories: /.*Story$/;
   * ```
   *
   * @see [Non-story exports](https://storybook.js.org/docs/api/csf#non-story-exports)
   */
  includeStories?: string[] | RegExp;
  /**
   * Used to exclude certain named exports. Useful when you want to have non-story exports such as
   * mock data or ignore a few stories.
   *
   * @example
   *
   * ```ts
   * excludeStories: ['simpleData', 'complexData'];
   * excludeStories: /.*Data$/;
   * ```
   *
   * @see [Non-story exports](https://storybook.js.org/docs/api/csf#non-story-exports)
   */
  excludeStories?: string[] | RegExp;
}
interface Addon_BaseMeta<ComponentType> {
  /**
   * Title of the story which will be presented in the navigation. **Should be unique.**
   *
   * Stories can be organized in a nested structure using "/" as a separator.
   *
   * Since CSF 3.0 this property is optional.
   *
   * @example
   *
   * ```ts
   * export default { title: 'Design System/Atoms/Button' };
   * ```
   *
   * @see [Story Hierarchy](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy)
   */
  title?: string;
  /**
   * Manually set the id of a story, which in particular is useful if you want to rename stories
   * without breaking permalinks.
   *
   * Storybook will prioritize the id over the title for ID generation, if provided, and will
   * prioritize the story.storyName over the export key for display.
   *
   * @see [Sidebar and URLs](https://storybook.js.org/docs/configure/user-interface/sidebar-and-urls#permalink-to-stories)
   */
  id?: string;
  /**
   * The primary component for your story.
   *
   * Used by addons for automatic prop table generation and display of other component metadata.
   */
  component?: ComponentType;
  /**
   * Auxiliary sub-components that are part of the stories.
   *
   * Used by addons for automatic prop table generation and display of other component metadata.
   *
   * @example
   *
   * ```ts
   * import { Button, ButtonGroup } from './components';
   *
   * export default {
   *   subcomponents: { Button, ButtonGroup },
   * };
   * ```
   *
   * By defining them each component will have its tab in the args table.
   */
  subcomponents?: Record<string, ComponentType>;
}
type Addon_BaseStoryObject<TArgs, StoryFnReturnType> = {
  /** Override the display name in the UI */storyName?: string;
};
type Addon_BaseStoryFn<TArgs, StoryFnReturnType> = {
  (args: TArgs, context: Addon_StoryContext): StoryFnReturnType;
} & Addon_BaseStoryObject<TArgs, StoryFnReturnType>;
type BaseStory<TArgs, StoryFnReturnType> = Addon_BaseStoryFn<TArgs, StoryFnReturnType> | Addon_BaseStoryObject<TArgs, StoryFnReturnType>;
interface Addon_RenderOptions$1 {
  active: boolean;
}
type Addon_Type = Addon_BaseType$1 | Addon_PageType$1 | Addon_WrapperType$1 | Addon_TestProviderType$1;
interface Addon_BaseType$1 {
  /**
   * The title of the addon. This can be a simple string, but it can also be a
   * React.FunctionComponent or a React.ReactElement.
   */
  title: FC | ReactNode | (() => string);
  /**
   * The type of the addon.
   *
   * @example
   *
   * ```ts
   * Addon_TypesEnum.PANEL;
   * ```
   */
  type: Exclude<Addon_Types$1, Addon_TypesEnum$1.PREVIEW | Addon_TypesEnum$1.experimental_PAGE | Addon_TypesEnum$1.experimental_TEST_PROVIDER>;
  /**
   * The unique id of the addon.
   *
   * @example 'my-org-name/my-addon-name';
   *
   * @warn This will become non-optional in 8.0
   *
   * This needs to be globally unique, so we recommend prefixing it with your org name or npm package name.
   *
   * Do not prefix with `storybook`, this is reserved for core storybook feature and core addons.
   */
  id?: string;
  /**
   * This component will wrap your `render` function.
   *
   * With it you can determine if you want your addon to be rendered or not.
   *
   * This is to facilitate addons keeping state, and keep listening for events even when they are
   * not currently on screen/rendered.
   */
  route?: (routeOptions: RenderData) => string;
  /** This will determine the value of `active` prop of your render function. */
  match?: (matchOptions: RenderData & {
    tabId?: string;
  }) => boolean;
  /**
   * The actual contents of your addon.
   *
   * This is called as a function, so if you want to use hooks, your function needs to return a
   * JSX.Element within which components are rendered
   */
  render: (props: Partial<Addon_RenderOptions$1>) => ReturnType<FC<Partial<Addon_RenderOptions$1>>>;
  /** @unstable */
  paramKey?: string;
  /** @unstable */
  disabled?: boolean | ((parameters: API_StoryEntry$1['parameters']) => boolean);
  /** @unstable */
  hidden?: boolean;
}
interface Addon_PageType$1 {
  type: Addon_TypesEnum$1.experimental_PAGE;
  /** The unique id of the page. */
  id: string;
  /** The URL to navigate to when Storybook needs to navigate to this page. */
  url: string;
  /** The title is used in mobile mode to represent the page in the navigation. */
  title: FC | string | ReactElement | ReactNode;
  /**
   * The main content of the addon, a function component without any props. Storybook will render
   * your component always.
   *
   * If you want to render your component only when the URL matches, use the `Route` component.
   *
   * @example
   *
   * ```jsx
   * import { Route } from 'storybook/internal/router';
   *
   * Render: () => {
   *   return (
   *     <Route path="/my-addon">
   *       {' '}
   *       <MyAddonContent />{' '}
   *     </Route>
   *   );
   * };
   * ```
   */
  render: FC;
}
interface Addon_WrapperType$1 {
  type: Addon_TypesEnum$1.PREVIEW;
  /** The unique id of the page. */
  id: string;
  /**
   * A React.FunctionComponent that wraps the story.
   *
   * This component must accept a children prop, and render it.
   */
  render: FC<PropsWithChildren<{
    index: number;
    children: ReactNode;
    id: string;
    storyId: StoryId$2;
  }>>;
}
interface Addon_TestProviderType$1 {
  type: Addon_TypesEnum$1.experimental_TEST_PROVIDER;
  /** The unique id of the test provider. */
  id: string;
  render: () => ReactNode;
  sidebarContextMenu?: (options: {
    context: API_HashEntry$1;
  }) => ReactNode;
  /** Called when the user clears all statuses. The provider should clear its own status stores. */
  clear?: () => void;
}
type Addon_TypeBaseNames = Exclude<Addon_TypesEnum$1, Addon_TypesEnum$1.PREVIEW | Addon_TypesEnum$1.experimental_PAGE | Addon_TypesEnum$1.experimental_TEST_PROVIDER>;
interface Addon_TypesMapping$1 extends Record<Addon_TypeBaseNames, Addon_BaseType$1> {
  [Addon_TypesEnum$1.PREVIEW]: Addon_WrapperType$1;
  [Addon_TypesEnum$1.experimental_PAGE]: Addon_PageType$1;
  [Addon_TypesEnum$1.experimental_TEST_PROVIDER]: Addon_TestProviderType$1;
}
type Addon_Loader<API> = (api: API) => void;
interface Addon_Loaders<API> {
  [key: string]: Addon_Loader<API>;
}
interface Addon_Collection$1<T = Addon_Type> {
  [key: string]: T;
}
interface Addon_Elements {
  [key: string]: Addon_Collection$1;
}
interface Addon_ToolbarConfig {
  hidden?: boolean;
}
interface Addon_Config$1 {
  theme?: ThemeVars$1;
  layout?: Partial<API_Layout$1>;
  layoutCustomisations?: Partial<API_LayoutCustomisations$1>;
  toolbar?: {
    [id: string]: Addon_ToolbarConfig;
  };
  sidebar?: API_SidebarOptions;
  ui?: Partial<API_UI$1>;
  [key: string]: any;
}
declare enum Addon_TypesEnum$1 {
  /**
   * This API is used to create a tab the toolbar above the canvas, This API might be removed in the
   * future.
   *
   * @unstable
   */
  TAB = "tab",
  /** This adds panels to the addons side panel. */
  PANEL = "panel",
  /** This adds items in the toolbar above the canvas - on the left side. */
  TOOL = "tool",
  /** This adds items in the toolbar above the canvas - on the right side. */
  TOOLEXTRA = "toolextra",
  /**
   * This adds wrapper components around the canvas/iframe component storybook renders.
   *
   * @unstable this API is not stable yet, and is likely to change in 8.0.
   */
  PREVIEW = "preview",
  /**
   * This adds pages that render instead of the canvas.
   *
   * @unstable
   */
  experimental_PAGE = "page",
  /** This adds items to the Testing Module in the sidebar. */
  experimental_TEST_PROVIDER = "test-provider"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/csf.d.ts
type OrString<T extends string> = T | (string & {});
type ViewMode$2 = OrString<ViewMode | 'settings'> | undefined;
type Layout$1 = 'centered' | 'fullscreen' | 'padded' | 'none';
interface StorybookParameters {
  options?: Addon_OptionsParameterV7;
  /**
   * The layout property defines basic styles added to the preview body where the story is rendered.
   *
   * If you pass `none`, no styles are applied.
   */
  layout?: Layout$1;
  /**
   * The BCP-47 language tag applied to the rendered story.
   *
   * In story view, this sets lang` on the story root element; in docs view it sets `lang` on the
   * embedded story canvas. When unset, no `lang` attribute is applied. Inherited project → meta → story.
   */
  htmlLang?: string;
}
interface StorybookTypes$1 {
  parameters: StorybookParameters;
}
interface StorybookInternalParameters extends StorybookParameters {
  fileName?: string;
  docsOnly?: true;
}
type Path$1 = string;
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/story.d.ts
interface WebRenderer extends Renderer$2 {
  canvasElement: HTMLElement;
}
type ModuleExport$1 = any;
type ModuleExports$1 = Record<string, ModuleExport$1>;
type ModuleImportFn$1 = (path: Path$1) => Promise<ModuleExports$1>;
type MaybePromise$1<T> = Promise<T> | T;
type TeardownRenderToCanvas = () => MaybePromise$1<void>;
type RenderToCanvas$1<TRenderer extends Renderer$2> = (context: RenderContext<TRenderer>, element: TRenderer['canvasElement']) => MaybePromise$1<void | TeardownRenderToCanvas>;
interface ProjectAnnotations$2<TRenderer extends Renderer$2> extends BaseProjectAnnotations<TRenderer> {
  testingLibraryRender?: (...args: never[]) => {
    unmount: () => void;
  };
  renderToCanvas?: RenderToCanvas$1<TRenderer>;
}
type NamedExportsOrDefault<TExport> = TExport | {
  default: TExport;
};
type NamedOrDefaultProjectAnnotations$1<TRenderer extends Renderer$2 = Renderer$2> = NamedExportsOrDefault<ProjectAnnotations$2<TRenderer>>;
type NormalizedProjectAnnotations$1<TRenderer extends Renderer$2 = Renderer$2> = Omit<ProjectAnnotations$2<TRenderer>, 'decorators' | 'loaders' | 'runStep' | 'beforeAll'> & {
  argTypes?: StrictArgTypes$2;
  decorators?: DecoratorFunction$2<TRenderer>[];
  loaders?: LoaderFunction<TRenderer>[];
  runStep: StepRunner$1<TRenderer>;
  beforeAll: BeforeAll;
};
type NormalizedComponentAnnotations$1<TRenderer extends Renderer$2 = Renderer$2> = Omit<ComponentAnnotations$1<TRenderer>, 'decorators' | 'loaders'> & {
  id: ComponentId;
  title: ComponentTitle$1;
  argTypes?: StrictArgTypes$2;
  decorators?: DecoratorFunction$2<TRenderer>[];
  loaders?: LoaderFunction<TRenderer>[];
};
type NormalizedStoryAnnotations$1<TRenderer extends Renderer$2 = Renderer$2> = Omit<StoryAnnotations$1<TRenderer>, 'storyName' | 'story' | 'decorators' | 'loaders'> & {
  moduleExport: ModuleExport$1;
  id: StoryId$2;
  argTypes?: StrictArgTypes$2;
  name: StoryName$1;
  userStoryFn?: ArgsStoryFn<TRenderer>;
  decorators?: DecoratorFunction$2<TRenderer>[];
  loaders?: LoaderFunction<TRenderer>[];
};
type CSFFile$1<TRenderer extends Renderer$2 = Renderer$2> = {
  meta: NormalizedComponentAnnotations$1<TRenderer>;
  stories: Record<StoryId$2, NormalizedStoryAnnotations$1<TRenderer>>;
  projectAnnotations?: NormalizedProjectAnnotations$1<TRenderer>;
  moduleExports: ModuleExports$1;
};
type PreparedStory$1<TRenderer extends Renderer$2 = Renderer$2> = StoryContextForEnhancers$1<TRenderer> & {
  moduleExport: ModuleExport$1;
  originalStoryFn: ArgsStoryFn<TRenderer>;
  undecoratedStoryFn: LegacyStoryFn$1<TRenderer>;
  unboundStoryFn: LegacyStoryFn$1<TRenderer>;
  applyLoaders: (context: StoryContext$2<TRenderer>) => Promise<StoryContext$2<TRenderer>['loaded']>;
  applyBeforeEach: (context: StoryContext$2<TRenderer>) => Promise<CleanupCallback$1[]>;
  applyAfterEach: (context: StoryContext$2<TRenderer>) => Promise<void>;
  playFunction?: (context: StoryContext$2<TRenderer>) => Promise<void> | void;
  runStep: StepRunner$1<TRenderer>;
  mount: (context: StoryContext$2<TRenderer>) => () => Promise<Canvas>;
  testingLibraryRender?: (...args: never[]) => unknown;
  renderToCanvas?: ProjectAnnotations$2<TRenderer>['renderToCanvas'];
  usesMount: boolean;
  storyGlobals: Globals$2;
};
type PreparedMeta$1<TRenderer extends Renderer$2 = Renderer$2> = Omit<StoryContextForEnhancers$1<TRenderer>, 'name' | 'story'> & {
  moduleExport: ModuleExport$1;
};
type BoundStory<TRenderer extends Renderer$2 = Renderer$2> = PreparedStory$1<TRenderer> & {
  storyFn: PartialStoryFn$1<TRenderer>;
};
declare type RenderContext<TRenderer extends Renderer$2 = Renderer$2> = StoryIdentifier & {
  showMain: () => void;
  showError: (error: {
    title: string;
    description: string;
  }) => void;
  showException: (err: Error) => void;
  forceRemount: boolean;
  storyContext: StoryContext$2<TRenderer>;
  storyFn: PartialStoryFn$1<TRenderer>;
  unboundStoryFn: LegacyStoryFn$1<TRenderer>;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/builder.d.ts
interface BuilderStats {
  toJson: () => any;
}
type Builder_WithRequiredProperty<Type, Key extends keyof Type> = Type & { [Property in Key]-?: Type[Property] };
type Builder_Unpromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
type Builder_EnvsRaw = Record<string, string>;
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/docs.d.ts
type RenderContextCallbacks$1<TRenderer extends Renderer$2> = Pick<RenderContext<TRenderer>, 'showMain' | 'showError' | 'showException'>;
type StoryRenderOptions$1 = {
  autoplay?: boolean;
  forceInitialArgs?: boolean;
};
type ResolvedModuleExportType$1 = 'component' | 'meta' | 'story';
/**
 * What do we know about an of={} call?
 *
 * Technically, the type names aren't super accurate:
 *
 * - Meta === `CSFFile`
 * - Story === `PreparedStory` But these shorthands capture the idea of what is being talked about
 */
type ResolvedModuleExportFromType$1<TType extends ResolvedModuleExportType$1, TRenderer extends Renderer$2 = Renderer$2> = TType extends 'component' ? {
  type: 'component';
  component: TRenderer['component'];
  projectAnnotations: NormalizedProjectAnnotations$1<Renderer$2>;
} : TType extends 'meta' ? {
  type: 'meta';
  csfFile: CSFFile$1<TRenderer>;
  preparedMeta: PreparedMeta$1;
} : {
  type: 'story';
  story: PreparedStory$1<TRenderer>;
};
type ResolvedModuleExport<TRenderer extends Renderer$2 = Renderer$2> = {
  type: ResolvedModuleExportType$1;
} & (ResolvedModuleExportFromType$1<'component', TRenderer> | ResolvedModuleExportFromType$1<'meta', TRenderer> | ResolvedModuleExportFromType$1<'story', TRenderer>);
interface DocsContextProps$1<TRenderer extends Renderer$2 = Renderer$2> {
  /**
   * Register a CSF file that this docs entry uses. Used by the `<Meta of={} />` block to attach,
   * and the `<Story meta={} />` bloc to reference
   */
  referenceMeta: (metaExports: ModuleExports$1, attach: boolean) => void;
  /**
   * Find a component, meta or story object from the direct export(s) from the CSF file. This is the
   * API that drives the `of={}` syntax.
   */
  resolveOf<TType extends ResolvedModuleExportType$1>(moduleExportOrType: ModuleExport$1 | TType, validTypes?: TType[]): ResolvedModuleExportFromType$1<TType, TRenderer>;
  /**
   * Find a story's id from the name of the story. This is primarily used by the `<Story name={} />
   * block. Note that the story must be part of the primary CSF file of the docs entry.
   */
  storyIdByName: (storyName: StoryName$1) => StoryId$2;
  /**
   * Syncronously find a story by id (if the id is not provided, this will look up the primary story
   * in the CSF file, if such a file exists).
   */
  storyById: (id?: StoryId$2) => PreparedStory$1<TRenderer>;
  /** Syncronously find all stories of the component referenced by the CSF file. */
  componentStories: () => PreparedStory$1<TRenderer>[];
  /**
   * Resolve the component id (the CSF title id) for a component object referenced by a docs entry.
   *
   * Returns the id of the first referenced CSF file whose `meta.component` is the given component,
   * or `undefined` when no referenced CSF file declares it. Used by blocks like `<ArgTypes
   * of={Component} />` to key service lookups that are addressed by component id.
   */
  getComponentId: (component: TRenderer['component']) => string | undefined;
  /** Syncronously find all stories by CSF file. */
  componentStoriesFromCSFFile: (csfFile: CSFFile$1<TRenderer>) => PreparedStory$1<TRenderer>[];
  /** Get the story context of the referenced story. */
  getStoryContext: (story: PreparedStory$1<TRenderer>) => Omit<StoryContext$2<TRenderer>, 'abortSignal' | 'canvasElement' | 'step' | 'context'>;
  /** Asyncronously load an arbitrary story by id. */
  loadStory: (id: StoryId$2) => Promise<PreparedStory$1<TRenderer>>;
  /** Render a story to a given HTML element and keep it up to date across context changes */
  renderStoryToElement: (story: PreparedStory$1<TRenderer>, element: HTMLElement, callbacks: RenderContextCallbacks$1<TRenderer>, options: StoryRenderOptions$1) => () => Promise<void>;
  /** Storybook channel -- use for low level event watching/emitting */
  channel: Channel;
  /** Project annotations -- can be read to get the project's global annotations */
  projectAnnotations: NormalizedProjectAnnotations$1<TRenderer>;
  /**
   * When true, `<Primary />` and `<Controls />` filter the CSF file's stories to those tagged
   * `autodocs`. The docs render sets it: true for autodocs pages, false for MDX docs entries, so
   * that on an MDX page the page author's story selection is respected. Unset is treated as true.
   */
  filterByAutodocs?: boolean;
}
type DocsRenderFunction<TRenderer extends Renderer$2> = (docsContext: DocsContextProps$1<TRenderer>, docsParameters: Parameters$2, element: HTMLElement) => Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/addons/main.d.ts
declare class AddonStore {
  constructor();
  private channel;
  private promise;
  private resolve;
  getChannel: () => Channel;
  ready: () => Promise<Channel>;
  hasChannel: () => boolean;
  setChannel: (channel: Channel) => void;
}
declare const addons: AddonStore;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/addons/make-decorator.d.ts
type MakeDecoratorResult = (...args: any) => any;
interface MakeDecoratorOptions {
  name: string;
  parameterName: string;
  skipIfNoParametersOrOptions?: boolean;
  wrapper: Addon_StoryWrapper;
}
/**
 * Creates a Storybook decorator function that can be used to wrap stories with additional
 * functionality.
 *
 * @example
 *
 * ```jsx
 * const myDecorator = makeDecorator({
 *   name: 'My Decorator',
 *   parameterName: 'myDecorator',
 *   wrapper: (storyFn, context, { options }) => {
 *     const { myOption } = options;
 *     <div style={{ backgroundColor: myOption }}>{storyFn()}</div>;
 *   },
 * });
 *
 * export const decorators = [myDecorator];
 * ```
 *
 * @param {MakeDecoratorOptions} options - The options for the decorator.
 * @param {string} options.name - The name of the decorator.
 * @param {string} options.parameterName - The name of the parameter that will be used to pass
 *   options to the decorator.
 * @param {Addon_StoryWrapper} options.wrapper - The function that will be used to wrap the story.
 * @param {boolean} [options.skipIfNoParametersOrOptions=false] - Whether to skip the decorator if
 *   no options or parameters are provided. Default is `false`
 * @returns {MakeDecoratorResult} A function that can be used as a Storybook decorator.
 */
declare const makeDecorator: ({
  name,
  parameterName,
  wrapper,
  skipIfNoParametersOrOptions
}: MakeDecoratorOptions) => MakeDecoratorResult;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/csf/normalizeStory.d.ts
declare function normalizeStory<TRenderer extends Renderer$1>(key: StoryId$1, storyAnnotations: StoryAnnotationsOrFn<TRenderer>, meta: NormalizedComponentAnnotations<TRenderer>): NormalizedStoryAnnotations<TRenderer>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/csf/normalizeProjectAnnotations.d.ts
declare function normalizeProjectAnnotations<TRenderer extends Renderer$1>({
  argTypes,
  argTypesEnhancers,
  decorators,
  loaders,
  beforeEach,
  afterEach,
  initialGlobals,
  ...annotations
}: ProjectAnnotations$1<TRenderer>): NormalizedProjectAnnotations<TRenderer>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/csf/normalizeArrays.d.ts
declare const normalizeArrays: <T>(array: T[] | T | undefined) => T[];
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/csf/composeConfigs.d.ts
declare function composeConfigs<TRenderer extends Renderer$1>(moduleExportList: ModuleExports[]): NormalizedProjectAnnotations<TRenderer>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/csf/stepRunners.d.ts
/**
 * Compose step runners to create a single step runner that applies each step runner in order.
 *
 * A step runner is a function that takes a defined step:
 *
 * @example
 *
 * ```ts
 * step('label', () => {});
 * ```
 *
 * ...and runs it. The prototypical example is from `core/interactions` where the step runner will
 * decorate all instrumented code inside the step with information about the label.
 *
 * In theory it is possible to have more than one addon that wants to run steps; they can be
 * composed together in a similar fashion to decorators. In some ways step runners are like
 * decorators except it is not intended that they change the context or the play function.
 *
 * The basic implementation of a step runner is `async (label, play, context) => play(context)` --
 * in fact this is what `composeStepRunners([])` will do.
 *
 * @param stepRunners An array of StepRunner
 * @returns A StepRunner that is the composition of the arguments
 */
declare function composeStepRunners<TRenderer extends Renderer$1>(stepRunners: StepRunner<TRenderer>[]): StepRunner<TRenderer>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/csf/portable-stories.d.ts
declare global {
  var globalProjectAnnotations: NormalizedProjectAnnotations<any>;
  var defaultProjectAnnotations: ProjectAnnotations$1<any>;
}
declare function setDefaultProjectAnnotations<TRenderer extends Renderer$1 = Renderer$1>(_defaultProjectAnnotations: ProjectAnnotations$1<TRenderer>): void;
declare function setProjectAnnotations<TRenderer extends Renderer$1 = Renderer$1>(projectAnnotations: NamedOrDefaultProjectAnnotations<TRenderer> | NamedOrDefaultProjectAnnotations<TRenderer>[]): NormalizedProjectAnnotations<TRenderer>;
declare function composeStory<TRenderer extends Renderer$1 = Renderer$1, TArgs extends Args$1 = Args$1>(storyAnnotations: LegacyStoryAnnotationsOrFn<TRenderer>, componentAnnotations: ComponentAnnotations<TRenderer, TArgs>, projectAnnotations?: ProjectAnnotations$1<TRenderer>, defaultConfig?: ProjectAnnotations$1<TRenderer>, exportsName?: string): ComposedStoryFn<TRenderer, Partial<TArgs>>;
declare function composeStories<TModule extends Store_CSFExports>(storiesImport: TModule, globalConfig: ProjectAnnotations$1<Renderer$1>, composeStoryFn?: ComposeStoryFn): {};
type WrappedStoryRef = {
  __pw_type: 'jsx';
  props: Record<string, any>;
} | {
  __pw_type: 'importRef';
};
type UnwrappedJSXStoryRef = {
  __pw_type: 'jsx';
  type: UnwrappedImportStoryRef;
};
type UnwrappedImportStoryRef = ComposedStoryFn;
declare global {
  function __pwUnwrapObject(storyRef: WrappedStoryRef): Promise<UnwrappedJSXStoryRef | UnwrappedImportStoryRef>;
}
declare function createPlaywrightTest<TFixture extends {
  extend: any;
}>(baseTest: TFixture): TFixture;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/csf/csf-factory-utils.d.ts
declare function getCsfFactoryAnnotations<TRenderer extends Renderer$1 = Renderer$1, TArgs extends Args$1 = Args$1>(story: LegacyStoryAnnotationsOrFn<TRenderer> | Story<Renderer$1>, meta?: ComponentAnnotations<TRenderer, TArgs> | Meta<Renderer$1>, projectAnnotations?: ProjectAnnotations$1<TRenderer>): {
  story: import("storybook/internal/csf").StoryAnnotations<Renderer$1, unknown>;
  meta: ComponentAnnotations<Renderer$1, unknown>;
  preview: import("storybook/internal/types").NormalizedProjectAnnotations<Renderer$1>;
} | {
  story: LegacyStoryAnnotationsOrFn<TRenderer>;
  meta: ComponentAnnotations<TRenderer, TArgs> | ComponentAnnotations<Renderer$1, unknown> | undefined;
  preview: ProjectAnnotations$1<TRenderer> | undefined;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/parameters.d.ts
/**
 * Safely combine parameters recursively. Only copy objects when needed. Algorithm = always
 * overwrite the existing value UNLESS both values are plain objects. In this case flag the key as
 * "special" and handle it with a heuristic.
 */
declare const combineParameters: (...parameterSets: (Parameters$1 | undefined)[]) => Parameters$1;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/filterArgTypes.d.ts
type PropDescriptor = string[] | RegExp;
declare const filterArgTypes: (argTypes: StrictArgTypes$1, include?: PropDescriptor, exclude?: PropDescriptor) => Partial<StrictArgTypes$1<import("@storybook/react").Args>>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/inferControls.d.ts
/** The fields {@link inferControls} reads; the full enhancer context is structurally assignable. */
type InferControlsContext<TRenderer extends Renderer$1 = Renderer$1> = Pick<StoryContextForEnhancers<TRenderer>, 'argTypes' | 'parameters'>;
declare const inferControls: ((context: InferControlsContext) => StrictArgTypes$1) & {
  secondPass?: boolean;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/decorators.d.ts
declare function decorateStory<TRenderer extends Renderer$1>(storyFn: LegacyStoryFn<TRenderer>, decorator: DecoratorFunction$1<TRenderer>, bindWithContext: (storyFn: LegacyStoryFn<TRenderer>) => PartialStoryFn<TRenderer>): LegacyStoryFn<TRenderer>;
/**
 * Currently StoryContextUpdates are allowed to have any key in the type. However, you cannot
 * overwrite any of the build-it "static" keys.
 *
 * @param inputContextUpdate StoryContextUpdate
 * @returns StoryContextUpdate
 */
declare function sanitizeStoryContextUpdate({
  componentId,
  title,
  kind,
  id,
  name,
  story,
  parameters,
  initialArgs,
  argTypes,
  ...update
}?: StoryContextUpdate): StoryContextUpdate;
declare function defaultDecorateStory<TRenderer extends Renderer$1>(storyFn: LegacyStoryFn<TRenderer>, decorators: DecoratorFunction$1<TRenderer>[]): LegacyStoryFn<TRenderer>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/args.d.ts
declare const combineArgs: (value: any, update: any) => Args$1;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/autoTitle.d.ts
declare const userOrAutoTitleFromSpecifier: (fileName: string | number, entry: NormalizedStoriesSpecifier, userTitle?: string) => string | undefined;
declare const userOrAutoTitle: (fileName: string, storiesEntries: NormalizedStoriesSpecifier[], userTitle?: string) => string | undefined;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/store/sortStories.d.ts
declare const sortStoriesV7: (stories: IndexEntry[], storySortParameter: Addon_StorySortParameterV7, fileNameOrder: Path[]) => IndexEntry[];
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/docs-context/DocsContext.d.ts
declare class DocsContext<TRenderer extends Renderer$1> implements DocsContextProps<TRenderer> {
  channel: Channel;
  protected store: StoryStore<TRenderer>;
  renderStoryToElement: DocsContextProps<TRenderer>['renderStoryToElement'];
  private componentStoriesValue;
  private storyIdToCSFFile;
  private exportToStory;
  private exportsToCSFFile;
  private nameToStoryId;
  private attachedCSFFiles;
  private primaryStory?;
  filterByAutodocs?: boolean;
  constructor(channel: Channel, store: StoryStore<TRenderer>, renderStoryToElement: DocsContextProps<TRenderer>['renderStoryToElement'], /** The CSF files known (via the index) to be refererenced by this docs file */

  csfFiles: CSFFile<TRenderer>[]);
  referenceCSFFile(csfFile: CSFFile<TRenderer>): void;
  attachCSFFile(csfFile: CSFFile<TRenderer>): void;
  referenceMeta(metaExports: ModuleExports, attach: boolean): void;
  get projectAnnotations(): import("storybook/internal/types").NormalizedProjectAnnotations<TRenderer>;
  private resolveAttachedModuleExportType;
  private resolveModuleExport;
  resolveOf<TType extends ResolvedModuleExportType>(moduleExportOrType: ModuleExport | TType, validTypes?: TType[]): ResolvedModuleExportFromType<TType, TRenderer>;
  storyIdByName: (storyName: StoryName) => string;
  componentStories: () => PreparedStory<TRenderer>[];
  getComponentId: (component: Renderer$1['component']) => string | undefined;
  componentStoriesFromCSFFile: (csfFile: CSFFile<TRenderer>) => PreparedStory<TRenderer>[];
  storyById: (storyId?: StoryId$1) => PreparedStory<TRenderer>;
  getStoryContext: (story: PreparedStory<TRenderer>) => {
    args: import("@storybook/react").Args;
    initialGlobals: import("storybook/internal/csf").Globals;
    globalTypes: import("storybook/internal/csf").GlobalTypes | undefined;
    userGlobals: import("storybook/internal/csf").Globals;
    reporting: ReporterAPI;
    globals: {
      [x: string]: any;
    };
    hooks: unknown;
    loaded: {};
    viewMode: string;
    componentId: import("storybook/internal/csf").ComponentId;
    title: import("storybook/internal/csf").ComponentTitle;
    kind: import("storybook/internal/csf").ComponentTitle;
    id: StoryId$1;
    name: StoryName;
    story: StoryName;
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
    moduleExport: ModuleExport;
    originalStoryFn: import("storybook/internal/csf").ArgsStoryFn<TRenderer>;
    undecoratedStoryFn: import("storybook/internal/csf").LegacyStoryFn<TRenderer>;
    unboundStoryFn: import("storybook/internal/csf").LegacyStoryFn<TRenderer>;
    applyLoaders: (context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => Promise<import("storybook/internal/csf").StoryContext<TRenderer>['loaded']>;
    applyBeforeEach: (context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => Promise<import("storybook/internal/csf").CleanupCallback[]>;
    applyAfterEach: (context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => Promise<void>;
    playFunction?: ((context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => Promise<void> | void) | undefined;
    runStep: import("storybook/internal/csf").StepRunner<TRenderer>;
    mount: (context: import("storybook/internal/csf").StoryContext<TRenderer, import("@storybook/react").Args>) => () => Promise<import("storybook/internal/csf").Canvas>;
    testingLibraryRender?: (...args: never[]) => unknown;
    renderToCanvas?: import("storybook/internal/types").RenderToCanvas<TRenderer> | undefined;
    usesMount: boolean;
    storyGlobals: import("storybook/internal/csf").Globals;
    allArgs: any;
    argsByTarget: any;
    unmappedArgs: any;
  };
  loadStory: (id: StoryId$1) => Promise<PreparedStory<TRenderer>>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/render/CsfDocsRender.d.ts
/**
 * A CsfDocsRender is a render of a docs entry that is rendered based on a CSF file.
 *
 * The expectation is the primary CSF file which is the `importPath` for the entry will define a
 * story which may contain the actual rendered JSX code for the template in the `docs.page`
 * parameter.
 *
 * Use cases:
 *
 * - Autodocs, where there is no story, and we fall back to the globally defined template.
 */
declare class CsfDocsRender<TRenderer extends Renderer$1> implements Render<TRenderer> {
  protected channel: Channel;
  protected store: StoryStore<TRenderer>;
  entry: IndexEntry;
  private callbacks;
  readonly renderId: number;
  readonly type: RenderType;
  readonly subtype = "csf";
  readonly id: StoryId$1;
  story?: PreparedStory<TRenderer>;
  rerender?: () => Promise<void>;
  teardownRender?: (options: {
    viewModeChanged?: boolean;
  }) => Promise<void>;
  torndown: boolean;
  readonly disableKeyListeners = false;
  preparing: boolean;
  csfFiles?: CSFFile<TRenderer>[];
  constructor(channel: Channel, store: StoryStore<TRenderer>, entry: IndexEntry, callbacks: RenderContextCallbacks<TRenderer>);
  isPreparing(): boolean;
  prepare(): Promise<void>;
  isEqual(other: Render<TRenderer>): boolean;
  docsContext(renderStoryToElement: DocsContextProps<TRenderer>['renderStoryToElement']): DocsContext<TRenderer>;
  renderToElement(canvasElement: TRenderer['canvasElement'], renderStoryToElement: DocsContextProps<TRenderer>['renderStoryToElement']): Promise<void>;
  teardown({
    viewModeChanged
  }?: {
    viewModeChanged?: boolean;
  }): Promise<void>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/render/MdxDocsRender.d.ts
/**
 * A MdxDocsRender is a render of a docs entry that comes from a true MDX file, that is a `.mdx`
 * file that doesn't get compiled to a CSF file.
 *
 * A MDX render can reference (import) zero or more CSF files that contain stories.
 *
 * Use cases:
 *
 * - *.mdx file that may or may not reference a specific CSF file with `<Meta of={} />`
 */
declare class MdxDocsRender<TRenderer extends Renderer$1> implements Render<TRenderer> {
  protected channel: Channel;
  protected store: StoryStore<TRenderer>;
  entry: IndexEntry;
  private callbacks;
  readonly renderId: number;
  readonly type: RenderType;
  readonly subtype = "mdx";
  readonly id: StoryId$1;
  private exports?;
  rerender?: () => Promise<void>;
  teardownRender?: (options: {
    viewModeChanged?: boolean;
  }) => Promise<void>;
  torndown: boolean;
  readonly disableKeyListeners = false;
  preparing: boolean;
  csfFiles?: CSFFile<TRenderer>[];
  attachedCsfFile?: CSFFile<TRenderer>;
  attachedStory?: PreparedStory<TRenderer>;
  constructor(channel: Channel, store: StoryStore<TRenderer>, entry: IndexEntry, callbacks: RenderContextCallbacks<TRenderer>);
  isPreparing(): boolean;
  prepare(): Promise<void>;
  isEqual(other: Render<TRenderer>): boolean;
  docsContext(renderStoryToElement: DocsContextProps<TRenderer>['renderStoryToElement']): DocsContext<TRenderer>;
  renderToElement(canvasElement: TRenderer['canvasElement'], renderStoryToElement: DocsContextProps<TRenderer>['renderStoryToElement']): Promise<void>;
  teardown({
    viewModeChanged
  }?: {
    viewModeChanged?: boolean;
  }): Promise<void>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/Preview.d.ts
type MaybePromise<T> = Promise<T> | T;
declare class Preview<TRenderer extends Renderer$1> {
  importFn: ModuleImportFn;
  getProjectAnnotations: () => MaybePromise<ProjectAnnotations$1<TRenderer>>;
  protected channel: Channel;
  protected storyStoreValue?: StoryStore<TRenderer>;
  renderToCanvas?: RenderToCanvas<TRenderer>;
  storyRenders: StoryRender<TRenderer>[];
  previewEntryError?: Error;
  private projectAnnotationsBeforeInitialization?;
  private beforeAllCleanup?;
  protected storeInitializationPromise: Promise<void>;
  protected resolveStoreInitializationPromise: () => void;
  protected rejectStoreInitializationPromise: (err: Error) => void;
  constructor(importFn: ModuleImportFn, getProjectAnnotations: () => MaybePromise<ProjectAnnotations$1<TRenderer>>, channel?: Channel, shouldInitialize?: boolean);
  get storyStore(): StoryStore<TRenderer>;
  protected initialize(): Promise<void>;
  ready(): Promise<void>;
  setupListeners(): void;
  getProjectAnnotationsOrRenderError(): Promise<ProjectAnnotations$1<TRenderer>>;
  initializeWithProjectAnnotations(projectAnnotations: ProjectAnnotations$1<TRenderer>): Promise<void>;
  runBeforeAllHook(projectAnnotations: ProjectAnnotations$1<TRenderer>): Promise<void>;
  getStoryIndexFromServer(): Promise<StoryIndex>;
  protected initializeWithStoryIndex(storyIndex: StoryIndex): void;
  setInitialGlobals(): Promise<void>;
  emitGlobals(): void;
  onGetProjectAnnotationsChanged({
    getProjectAnnotations
  }: {
    getProjectAnnotations: () => MaybePromise<ProjectAnnotations$1<TRenderer>>;
  }): Promise<void>;
  onStoryIndexChanged(): Promise<void>;
  onStoriesChanged({
    importFn,
    storyIndex
  }: {
    importFn?: ModuleImportFn;
    storyIndex?: StoryIndex;
  }): Promise<void>;
  onUpdateGlobals({
    globals: updatedGlobals,
    currentStory
  }: {
    globals: Globals$1;
    currentStory?: PreparedStory<TRenderer>;
  }): Promise<void>;
  onUpdateArgs({
    storyId,
    updatedArgs
  }: {
    storyId: StoryId$1;
    updatedArgs: Args$1;
  }): Promise<void>;
  onRequestArgTypesInfo({
    id,
    payload
  }: RequestData<ArgTypesRequestPayload>): Promise<void>;
  onResetArgs({
    storyId,
    argNames
  }: {
    storyId: string;
    argNames?: string[];
  }): Promise<void>;
  onForceReRender(): Promise<void>;
  onForceRemount({
    storyId
  }: {
    storyId: StoryId$1;
  }): Promise<void>;
  onStoryHotUpdated(): Promise<void>;
  renderStoryToElement(story: PreparedStory<TRenderer>, element: TRenderer['canvasElement'], callbacks: RenderContextCallbacks<TRenderer>, options: StoryRenderOptions): () => Promise<void>;
  teardownRender(render: StoryRender<TRenderer> | CsfDocsRender<TRenderer> | MdxDocsRender<TRenderer>, {
    viewModeChanged
  }?: {
    viewModeChanged?: boolean;
  }): Promise<void>;
  loadStory({
    storyId
  }: {
    storyId: StoryId$1;
  }): Promise<PreparedStory<TRenderer>>;
  getStoryContext(story: PreparedStory<TRenderer>, {
    forceInitialArgs
  }?: {
    forceInitialArgs?: boolean | undefined;
  }): {
    args: Args$1;
    initialGlobals: Globals$1;
    globalTypes: import("storybook/internal/csf").GlobalTypes | undefined;
    userGlobals: Globals$1;
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
    initialArgs: Args$1;
    argTypes: import("storybook/internal/csf").StrictArgTypes<Args$1>;
    moduleExport: import("storybook/internal/types").ModuleExport;
    originalStoryFn: import("storybook/internal/csf").ArgsStoryFn<TRenderer>;
    undecoratedStoryFn: import("storybook/internal/csf").LegacyStoryFn<TRenderer>;
    unboundStoryFn: import("storybook/internal/csf").LegacyStoryFn<TRenderer>;
    applyLoaders: (context: import("storybook/internal/csf").StoryContext<TRenderer, Args$1>) => Promise<import("storybook/internal/csf").StoryContext<TRenderer>['loaded']>;
    applyBeforeEach: (context: import("storybook/internal/csf").StoryContext<TRenderer, Args$1>) => Promise<CleanupCallback[]>;
    applyAfterEach: (context: import("storybook/internal/csf").StoryContext<TRenderer, Args$1>) => Promise<void>;
    playFunction?: ((context: import("storybook/internal/csf").StoryContext<TRenderer, Args$1>) => Promise<void> | void) | undefined;
    runStep: import("storybook/internal/csf").StepRunner<TRenderer>;
    mount: (context: import("storybook/internal/csf").StoryContext<TRenderer, Args$1>) => () => Promise<import("storybook/internal/csf").Canvas>;
    testingLibraryRender?: (...args: never[]) => unknown;
    renderToCanvas?: RenderToCanvas<TRenderer> | undefined;
    usesMount: boolean;
    storyGlobals: Globals$1;
  } & Pick<import("storybook/internal/csf").StoryContextForLoaders<Renderer$1, Args$1>, "allArgs" | "argsByTarget" | "unmappedArgs">;
  extract(options?: {
    includeDocsOnly: boolean;
  }): Promise<Record<string, import("storybook/internal/csf").StoryContextForEnhancers<TRenderer, Args$1>>>;
  renderPreviewEntryError(reason: string, err: Error): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/SelectionStore.d.ts
interface SelectionSpecifier {
  storySpecifier: StorySpecifier;
  viewMode: ViewMode$1;
  args?: Args$1;
  globals?: Args$1;
}
interface Selection {
  storyId: StoryId$1;
  viewMode: ViewMode$1;
}
interface SelectionStore {
  selectionSpecifier: SelectionSpecifier | null;
  selection?: Selection;
  setSelection(selection: Selection): void;
  setQueryParams(queryParams: Record<PropertyKey, unknown>): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/View.d.ts
interface View<TStorybookRoot> {
  prepareForStory(story: PreparedStory<any>): TStorybookRoot;
  prepareForDocs(options?: {
    scrollReset?: boolean;
  }): TStorybookRoot;
  showErrorDisplay(err: {
    message?: string;
    stack?: string;
  }): void;
  showNoPreview(): void;
  showPreparingStory(options?: {
    immediate: boolean;
  }): void;
  showPreparingDocs(options?: {
    immediate: boolean;
  }): void;
  showMain(): void;
  showDocs(): void;
  showStory(): void;
  showStoryDuringRender(): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/PreviewWithSelection.d.ts
type PossibleRender<TRenderer extends Renderer$1> = StoryRender<TRenderer> | CsfDocsRender<TRenderer> | MdxDocsRender<TRenderer>;
declare class PreviewWithSelection<TRenderer extends Renderer$1> extends Preview<TRenderer> {
  importFn: ModuleImportFn;
  getProjectAnnotations: () => MaybePromise<ProjectAnnotations$1<TRenderer>>;
  selectionStore: SelectionStore;
  view: View<TRenderer['canvasElement']>;
  currentSelection?: Selection;
  currentRender?: PossibleRender<TRenderer>;
  constructor(importFn: ModuleImportFn, getProjectAnnotations: () => MaybePromise<ProjectAnnotations$1<TRenderer>>, selectionStore: SelectionStore, view: View<TRenderer['canvasElement']>);
  setupListeners(): void;
  setInitialGlobals(): Promise<void>;
  initializeWithStoryIndex(storyIndex: StoryIndex): Promise<void>;
  selectSpecifiedStory(): Promise<void>;
  onGetProjectAnnotationsChanged({
    getProjectAnnotations
  }: {
    getProjectAnnotations: () => MaybePromise<ProjectAnnotations$1<TRenderer>>;
  }): Promise<void>;
  onStoriesChanged({
    importFn,
    storyIndex
  }: {
    importFn?: ModuleImportFn;
    storyIndex?: StoryIndex;
  }): Promise<void>;
  onKeydown(event: KeyboardEvent): void;
  onSetCurrentStory(selection: {
    storyId: StoryId$1;
    viewMode?: ViewMode$1;
  }): Promise<void>;
  onUpdateQueryParams(queryParams: any): void;
  onUpdateGlobals({
    globals
  }: {
    globals: Globals$1;
  }): Promise<void>;
  onUpdateArgs({
    storyId,
    updatedArgs
  }: {
    storyId: StoryId$1;
    updatedArgs: Args$1;
  }): Promise<void>;
  onPreloadStories({
    ids
  }: {
    ids: string[];
  }): Promise<void>;
  protected renderSelection({
    persistedArgs
  }?: {
    persistedArgs?: Args$1;
  }): Promise<void>;
  teardownRender(render: PossibleRender<TRenderer>, {
    viewModeChanged
  }?: {
    viewModeChanged?: boolean;
  }): Promise<void>;
  mainStoryCallbacks(storyId: StoryId$1): {
    showStoryDuringRender: () => void;
    showMain: () => void;
    showError: (err: {
      title: string;
      description: string;
    }) => void;
    showException: (err: Error) => void;
  };
  renderPreviewEntryError(reason: string, err: Error): void;
  renderMissingStory(): void;
  renderStoryLoadingException(storySpecifier: StorySpecifier, err: Error): void;
  renderException(storyId: StoryId$1, error: Error): void;
  renderError(storyId: StoryId$1, {
    title,
    description
  }: {
    title: string;
    description: string;
  }): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/PreviewWeb.d.ts
declare class PreviewWeb<TRenderer extends Renderer$1> extends PreviewWithSelection<TRenderer> {
  importFn: ModuleImportFn;
  getProjectAnnotations: () => MaybePromise<ProjectAnnotations$1<TRenderer>>;
  constructor(importFn: ModuleImportFn, getProjectAnnotations: () => MaybePromise<ProjectAnnotations$1<TRenderer>>);
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/UrlStore.d.ts
declare class UrlStore implements SelectionStore {
  selectionSpecifier: SelectionSpecifier | null;
  selection?: Selection;
  constructor();
  setSelection(selection: Selection): void;
  setQueryParams(queryParams: Record<PropertyKey, unknown>): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/WebView.d.ts
declare enum Mode {
  'MAIN' = "MAIN",
  'NOPREVIEW' = "NOPREVIEW",
  'PREPARING_STORY' = "PREPARING_STORY",
  'PREPARING_DOCS' = "PREPARING_DOCS",
  'ERROR' = "ERROR"
}
declare const layoutClassMap: {
  readonly centered: 'sb-main-centered';
  readonly fullscreen: 'sb-main-fullscreen';
  readonly padded: 'sb-main-padded';
};
type Layout = keyof typeof layoutClassMap | 'none';
declare class WebView implements View<HTMLElement> {
  private currentLayoutClass?;
  private testing;
  private preparingTimeout?;
  constructor();
  prepareForStory(story: PreparedStory<any>): HTMLElement;
  storyRoot(): HTMLElement;
  prepareForDocs({
    scrollReset
  }?: {
    scrollReset?: boolean;
  }): HTMLElement;
  docsRoot(): HTMLElement;
  applyLayout(layout?: Layout): void;
  /**
   * Injects a BCP-47 lang attribute to the story root, or removes it if `lang` is null.
   */
  applyHtmlLang(element: HTMLElement, lang?: string): void;
  checkIfLayoutExists(layout: keyof typeof layoutClassMap): void;
  showMode(mode: Mode): void;
  showErrorDisplay({
    message,
    stack
  }: {
    message?: string | undefined;
    stack?: string | undefined;
  }): void;
  showNoPreview(): void;
  showPreparingStory({
    immediate
  }?: {
    immediate?: boolean | undefined;
  }): void;
  showPreparingDocs({
    immediate
  }?: {
    immediate?: boolean | undefined;
  }): void;
  showMain(): void;
  showDocs(): void;
  showStory(): void;
  showStoryDuringRender(): void;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/simulate-pageload.d.ts
declare function simulateDOMContentLoaded(): void;
declare function simulatePageLoad($container: any): void;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/emitTransformCode.d.ts
type ReducedStoryContext = Omit<StoryContext<any, Args>, 'abortSignal' | 'canvasElement' | 'step' | 'context'>;
declare function emitTransformCode(source: string | undefined, context: ReducedStoryContext): Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/preview-api/modules/preview-web/render/animation-utils.d.ts
declare function pauseAnimations(atEnd?: boolean): CleanupCallback;
declare function waitForAnimations(signal?: AbortSignal): Promise<void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/open-service/preview.d.ts
declare const getService: TypedGetService<PreviewCoreServices>;
/**
 * Registers a service in the preview and returns its runtime surface.
 *
 * The preview is a leaf (`relay: false`). Builders install the addons channel before preview config
 * loads, so registration can assume the channel is already present.
 */
declare function registerService<TState, TQueries extends Queries<TState>, TCommands extends Commands<TState>>(definition: ServiceDefinition<TState, TQueries, TCommands>, registration?: ServiceRegistrationOptions<TState, TQueries, TCommands>): ServiceInstance<TState, TQueries, TCommands> & ServiceRegistryApi;
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/composedStory.d.ts
type Store_CSFExports$1<TRenderer extends Renderer = Renderer, TArgs extends Args$2 = Args$2> = {
  default: ComponentAnnotations$1<TRenderer, TArgs>;
  __esModule?: boolean;
  __namedExportsOrder?: string[];
};
/** A story function with partial args, used internally by composeStory */
type PartialArgsStoryFn<TRenderer extends Renderer = Renderer, TArgs = Args$2> = (args?: TArgs) => (TRenderer & {
  T: TArgs;
})['storyResult'];
/**
 * A story that got recomposed for portable stories, containing all the necessary data to be
 * rendered in external environments
 */
type ComposedStoryFn$1<TRenderer extends Renderer = Renderer, TArgs = Args$2> = PartialArgsStoryFn<TRenderer, TArgs> & {
  args: TArgs;
  id: StoryId;
  play?: (context?: Partial<StoryContext<TRenderer, Partial<TArgs>>>) => Promise<void>;
  run: (context?: Partial<StoryContext<TRenderer, Partial<TArgs>>>) => Promise<void>;
  load: () => Promise<void>;
  storyName: string;
  parameters: Parameters$2;
  argTypes: StrictArgTypes<TArgs>;
  reporting: ReporterAPI;
  tags: Tag[];
  globals: Globals;
};
/**
 * Based on a module of stories, it returns all stories within it, filtering non-stories Each story
 * will have partial props, as their props should be handled when composing stories
 */
type StoriesWithPartialProps<TRenderer extends Renderer, TModule> = { [K in keyof TModule as TModule[K] extends StoryAnnotationsOrFn$1<infer _, infer _TProps> ? K : never]: TModule[K] extends StoryAnnotationsOrFn$1<infer _, infer TProps> ? ComposedStoryFn$1<TRenderer, Partial<TProps>> : unknown };
/**
 * Type used for integrators of portable stories, as reference when creating their own composeStory
 * function
 */
interface ComposeStoryFn$1<TRenderer extends Renderer = Renderer, TArgs extends Args$2 = Args$2> {
  (storyAnnotations: AnnotatedStoryFn<TRenderer, TArgs> | StoryAnnotations$1<TRenderer, TArgs>, componentAnnotations: ComponentAnnotations$1<TRenderer, TArgs>, projectAnnotations: ProjectAnnotations<TRenderer>, exportsName?: string): ComposedStoryFn$1;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/review/events.d.ts
/**
 * Core-owned namespace for the review ingest contract. The external
 * `@storybook/addon-mcp` producer must emit these same event names.
 */
declare const REVIEW_NAMESPACE = "storybook/review";
/** Channel events exchanged between the MCP producer, core-server, and the manager. */
declare const REVIEW_EVENTS: {
  readonly PUSH_REVIEW: "storybook/review/push-review";
  readonly DISPLAY_REVIEW: "storybook/review/display-review";
  readonly REQUEST_REVIEW: "storybook/review/request-review";
  readonly REVIEW_STALE: "storybook/review/review-stale";
  readonly DISMISS_REVIEW: "storybook/review/dismiss-review";
  readonly REVIEW_DISMISSED: "storybook/review/review-dismissed";
  readonly PAGEVIEW: "storybook/review/pageview";
};
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/review/review-state.d.ts
/**
 * The review payload an agent pushes via the `display-review` MCP tool.
 *
 * Flow:
 *   MCP `display-review` tool → emit PUSH_REVIEW on the Storybook channel
 *   → core-server stamps `createdAt` and caches it
 *   → emits DISPLAY_REVIEW to all open tabs (or replays on REQUEST_REVIEW).
 *
 * This mirrors the canonical valibot schema in `@storybook/addon-mcp` →
 * `tools/display-review.ts`. The manager only renders the data — it does
 * not validate — so it needs the type, not the validator. Keep `title` /
 * `description` / `collections` in sync with that schema.
 */
interface ReviewCollection {
  title: string;
  rationale: string;
  storyIds: string[];
}
interface ReviewState {
  title: string;
  description: string;
  collections: ReviewCollection[];
  changedFiles?: string[];
  /**
   * Server-side creation timestamp (unix ms) assigned when PUSH_REVIEW is
   * received; used for live "Created x minutes ago" UI in the summary.
   */
  createdAt?: number;
  /**
   * Set server-side once a watched source file changes after `createdAt`.
   * Drives the "this review may be stale" banner. Persisted on the cached
   * review so REQUEST_REVIEW replays it to late/refreshed tabs.
   */
  stale?: boolean;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/webpack.d.ts
declare enum CoreWebpackCompiler$1 {
  Babel = "babel",
  SWC = "swc"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/features.d.ts
declare enum Feature$1 {
  DOCS = "docs",
  TEST = "test",
  ONBOARDING = "onboarding",
  A11Y = "a11y",
  AI = "ai"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/types/modules/languages.d.ts
declare enum SupportedLanguage$1 {
  JAVASCRIPT = "javascript",
  TYPESCRIPT = "typescript"
}
//#endregion
//#region code/core/.dts-emit/code/core/src/shared/status-store/index.d.ts
type StatusValue$1 = 'status-value:pending' | 'status-value:success' | 'status-value:new' | 'status-value:modified' | 'status-value:affected' | 'status-value:reviewing' | 'status-value:warning' | 'status-value:error' | 'status-value:unknown';
type StatusTypeId = string;
type StatusByTypeId = Record<StatusTypeId, Status>;
type StatusesByStoryIdAndTypeId = Record<StoryId$2, StatusByTypeId>;
interface Status {
  value: StatusValue$1;
  typeId: StatusTypeId;
  storyId: StoryId$2;
  title: string;
  description: string;
  data?: any;
  sidebarContextMenu?: boolean;
}
declare const CHANGE_DETECTION_STATUS_TYPE_ID = "storybook/change-detection";
declare const REVIEW_STATUS_TYPE_ID = "storybook/review";
/**
 * Status types that are quality/meta signals rather than test results, so they're excluded from the
 * aggregated test status that surfaces a story's most critical result. Both are excluded by the same
 * mechanism wherever that aggregate is computed.
 */
declare const NON_AGGREGATED_STATUS_TYPE_IDS: string[];
declare const StatusStoreEventType: {
  readonly SELECT: 'select';
};
type StatusStoreEvent = {
  type: typeof StatusStoreEventType.SELECT;
  payload: Status[];
};
type StatusStore = {
  getAll: () => StatusesByStoryIdAndTypeId;
  set: (statuses: Status[]) => void;
  onAllStatusChange: (listener: (statuses: StatusesByStoryIdAndTypeId, previousStatuses: StatusesByStoryIdAndTypeId) => void) => () => void;
  onSelect: (listener: (selectedStatuses: Status[]) => void) => () => void;
  unset: (storyIds?: StoryId$2[]) => void;
};
type StatusStoreByTypeId$1 = StatusStore & {
  typeId: StatusTypeId;
};
type UseStatusStore = <T = StatusesByStoryIdAndTypeId>(selector?: (statuses: StatusesByStoryIdAndTypeId) => T) => T;
//#endregion
export { composeStory as $, TagsOptions$1 as $a, isShortcutTaken as $c, prependImportToSnippet as $i, Addon_BaseAnnotations as $n, StringSchema as $o, API_Layout$1 as $r, fullStatusStore as $s, ComponentTitle$1 as $t, simulateDOMContentLoaded as A, LoadOptions$1 as Aa, combineParameters$1 as Ac, API_GroupEntry as Ai, StoryAnnotationsOrFn$1 as An, IndexInputStats$1 as Ao, Addon_StoryFn as Ar, ServiceInstanceOf as As, PreparedMeta$1 as At, sortStoriesV7 as B, PresetPropertyFn as Ba, useStoryPrepared as Bc, API_Settings$1 as Bi, StorybookInternalParameters as Bn, StoryIndexInput as Bo, Addon_Type as Br, Settings as Bs, ArgTypesEnhancer as Bt, Store_CSFExports$1 as C, CoreCommon_ResolvedAddonPreset$1 as Ca, Combo as Cc, SetStoriesStory as Ci, SBType$1 as Cn, DocgenWorkerModule as Co, Addon_PageType$1 as Cr, RuntimeService as Cs, ModuleExport$1 as Ct, pauseAnimations as D, CsfEnricher$1 as Da, ManagerProvider as Dc, API_ComponentEntry as Di, StepLabel as Dn, DocsIndexInput as Do, Addon_StoryApi as Dr, ServiceDescriptor as Ds, NormalizedComponentAnnotations$1 as Dt, registerService as E, CoreConfig$1 as Ea, ManagerContext as Ec, API_BaseEntry as Ei, StepFunction as En, DocsIndexEntry$1 as Eo, Addon_RequireContext as Er, ServiceDefinition as Es, NamedOrDefaultProjectAnnotations$1 as Et, PreviewWithSelection as F, Options$1 as Fa, useChannel as Fc, API_PreparedIndexEntry as Fi, StoryFn as Fn, NormalizedStoriesSpecifier$1 as Fo, Addon_StorySortParameter as Fr, StaticStore as Fs, TeardownRenderToCanvas as Ft, defaultDecorateStory as G, RendererName as Ga, RequestResponseError as Gc, API_Versions$2 as Gi, StrictInputType as Gn, DescriptionAction as Go, Addon_WrapperType$1 as Gr, universalTestProviderStore as Gs, BaseAnnotations as Gt, userOrAutoTitleFromSpecifier as H, Presets$1 as Ha, useStorybookState as Hc, API_TestEntry$1 as Hi, StorybookTypes$1 as Hn, StoryIndexV3 as Ho, Addon_TypesEnum$1 as Hr, globalSettings as Hs, ArgsEnhancer as Ht, View as I, PackageJson$2 as Ia, useGlobalTypes as Ic, API_PreparedStoryIndex$1 as Ii, StoryId$2 as In, StoriesEntry$1 as Io, Addon_StorySortParameterV7$1 as Ir, StandardSchemaV1 as Is, WebRenderer as It, PropDescriptor as J, StorybookConfig$1 as Ja, KeyboardEventLike as Jc, useServiceQuery as Ji, ViewMode$2 as Jn, NumberSchema as Jo, IndexEntryLegacy as Jr, TestProviderState as Js, BeforeEach as Jt, sanitizeStoryContextUpdate as K, ServerApp as Ka, experimental_requestResponse as Kc, getService$1 as Ki, Tag$2 as Kn, GenericSchema as Ko, Addons_ArgTypes as Kr, useTestProviderStore as Ks, BaseProjectAnnotations as Kt, SelectionStore as L, Preset as La, useGlobals as Lc, API_RefStoryRuntimeData as Li, StoryIdentifier as Ln, StoriesSpecifier as Lo, Addon_StoryWrapper$1 as Lr, Tag$4 as Ls, AfterEach as Lt, WebView as M, Manifests as Ma, useAddonState as Mc, API_IndexHash$1 as Mi, StoryContextForEnhancers$1 as Mn, IndexedStory as Mo, Addon_StorySortComparatorV7 as Mr, ServiceRegistryApi as Ms, ProjectAnnotations$2 as Mt, UrlStore as N, Middleware as Na, useArgTypes as Nc, API_LeafEntry$1 as Ni, StoryContextForLoaders as Nn, Indexer$1 as No, Addon_StorySortMethod as Nr, ServiceState as Ns, RenderContext as Nt, waitForAnimations as O, DocsOptions$1 as Oa, ManagerProviderProps as Oc, API_DocsEntry$1 as Oi, StepRunner$1 as On, IndexEntry$1 as Oo, Addon_StoryContext as Or, ServiceId as Os, NormalizedProjectAnnotations$1 as Ot, PreviewWeb as P, ModuleResolveConfig as Pa, useArgs as Pc, API_OptionsData$1 as Pi, StoryContextUpdate$1 as Pn, IndexerOptions as Po, Addon_StorySortObjectParameter as Pr, ServiceSummary as Ps, RenderToCanvas$1 as Pt, composeStories as Q, TagOptions as Qa, eventToShortcut as Qc, ModuleGraphServiceState as Qi, Addon_ArgsStoryFn as Qn, SchemaWithPipe as Qo, API_IframeRenderer$1 as Qr, UseTestProviderStore as Qs, ComponentId as Qt, Preview as R, PresetConfig$1 as Ra, useParameter as Rc, API_ReleaseNotes as Ri, StoryKind as Rn, StoryIndex$1 as Ro, Addon_TestProviderType$1 as Rr, checklistStore as Rs, AnnotatedStoryFn as Rt, PartialArgsStoryFn as S, CoreCommon_OptionsEntry as Sa, ActiveTabs as Sc, SetStoriesPayload as Si, SBScalarType as Sn, DocgenSubcomponent as So, Addon_OptionsParameterV7 as Sr, QueryStatus as Ss, CSFFile$1 as St, getService as T, CoreCommon_StorybookInfo$1 as Ta, ManagerConsumer as Tc, StoryPreparedPayload as Ti, SeparatorOptions as Tn, BaseIndexInput as To, Addon_RenderOptions$1 as Tr, ServerServiceRegistration as Ts, ModuleImportFn$1 as Tt, combineArgs as U, PreviewAnnotation as Ua, _default as Uc, API_UnknownEntries$1 as Ui, StrictArgTypes$2 as Un, V3CompatIndexEntry as Uo, Addon_TypesMapping$1 as Ur, fullTestProviderStore as Us, ArgsFromMeta as Ut, userOrAutoTitle as V, PresetValue as Va, useStorybookApi as Vc, API_StoryEntry$1 as Vi, StorybookParameters as Vn, StoryIndexV2 as Vo, Addon_Types$1 as Vr, _clearGlobalSettings as Vs, Args$2 as Vt, decorateStory as W, Ref$1 as Wa, isMacLike as Wc, API_Version$1 as Wi, StrictArgs as Wn, ArraySchema as Wo, Addon_WrapperSettings as Wr, getTestProviderStoreById as Ws, ArgsStoryFn as Wt, combineParameters as X, StorybookConfigRaw$1 as Xa, controlOrMetaSymbol as Xc, ServerCoreServices as Xi, Addon_Annotations as Xn, OptionalSchema as Xo, API_ComposedRef$1 as Xr, TestProviderStoreById as Xs, CleanupCallback$1 as Xt, filterArgTypes as Y, StorybookConfigOptions as Ya, controlOrMetaKey as Yc, useServiceCommand as Yi, Addon_AddStoryArgs as Yn, ObjectSchema as Yo, API_ActiveTabsType as Yr, TestProviderStateByProviderId as Ys, Canvas as Yt, getCsfFactoryAnnotations as Z, StorybookFeatures as Za, eventMatchesShortcut as Zc, TypedGetService as Zi, Addon_ArgType as Zn, RecordSchema as Zo, API_ComposedRefUpdate$1 as Zr, TestProviderStoreEvent as Zs, ComponentAnnotations$1 as Zt, ReviewState as _, ComponentManifest as _a, API_IndexHash$2 as _c, API_ViewMode$1 as _i, SBArrayType as _n, DocgenMiddleware as _o, Addon_Loader as _r, QueryCtx as _s, BuilderStats as _t, StatusByTypeId as a, StoryDocsError as aa, UniversalStore as ac, API_Provider$1 as ai, Options$2 as al, IncludeExcludeOptions as an, SupportedFramework$1 as ao, Addon_ClientApiAddon as ar, AnyServiceDefinition as as, normalizeArrays as at, ComposeStoryFn$1 as b, CoreCommon_AddonEntry as ba, API_RootEntry$1 as bc, GlobalsUpdatedPayload as bi, SBObjectType as bn, DocgenProviderDescriptor as bo, Addon_MakeDecoratorResult as br, QuerySelf as bs, Builder_WithRequiredProperty as bt, StatusStoreEvent as c, StoryDocsProviderInput as ca, EventInfo as cc, API_RefUrl as ci, addons$1 as cl, LegacyStoryAnnotationsOrFn$1 as cn, ImportParser as co, Addon_ClientStoryApi as cr, CommandDefinition as cs, makeDecorator as ct, StatusesByStoryIdAndTypeId as d, BuilderName as da, API_ComponentEntry$1 as dc, API_RouteOptions as di, Parameters$2 as dn, ChangeDetectionAdapter as do, Addon_Config$1 as dr, LoadCtx as ds, DocsRenderFunction as dt, selectSnippetForStory as ea, getStatusStoreByTypeId as ec, API_LayoutCustomisations$1 as ei, keyToSymbol as el, Conditional as en, TestBuildConfig as eo, Addon_BaseDecorators as er, UndefinedSchema as es, createPlaywrightTest as et, UseStatusStore as f, BuilderOptions$1 as fa, API_ComposedRef$2 as fc, API_SetRefData$1 as fi, PartialStoryFn$1 as fn, FileChangeEvent as fo, Addon_DecoratorFunction as fr, LoadSelf as fs, RenderContextCallbacks$1 as ft, ReviewCollection as g, CompatibleString as ga, API_HashEntry$2 as gc, API_UI$1 as gi, Renderer$2 as gn, DocgenJsDocTags as go, Addon_Loadable as gr, Query as gs, StoryRenderOptions$1 as gt, CoreWebpackCompiler$1 as h, CLIOptions$1 as ha, API_GroupEntry$1 as hc, API_StoryMapper as hi, PlayFunctionContext as hn, DocgenError as ho, Addon_LoadFn as hr, Queries as hs, ResolvedModuleExportType$1 as ht, Status as i, StoryDocsById as ia, useUniversalStore as ic, API_PanelPositions$1 as ii, shortcutToHumanString as il, Globals$2 as in, SupportedRenderer$1 as io, Addon_BaseType$1 as ir, defineService as is, composeConfigs as it, simulatePageLoad as j, LoadedPreset$1 as ja, typesX as jc, API_HashEntry$1 as ji, StoryContext$2 as jn, IndexedCSFFile$1 as jo, Addon_StorySortComparator as jr, ServiceRegistrationOptions as js, PreparedStory$1 as jt, emitTransformCode as k, Entry as ka, State as kc, API_FilterFunction$1 as ki, StoryAnnotations$1 as kn, IndexInput$1 as ko, Addon_StoryContextUpdate as kr, ServiceInstance as ks, NormalizedStoryAnnotations$1 as kt, StatusTypeId as l, StoryDocsProviderPreset as la, StoreOptions as lc, API_Refs$1 as li, mockChannel as ll, LegacyStoryFn$1 as ln, ImportParserContext as lo, Addon_Collection$1 as lr, CommandSelf as ls, addons as lt, Feature$1 as m, CLIBaseOptions as ma, API_EventMap as mc, API_StateMerger$1 as mi, PlayFunction as mn, DocgenService as mo, Addon_LegacyStoryFn as mr, OperationDescriptor as ms, ResolvedModuleExportFromType$1 as mt, NON_AGGREGATED_STATUS_TYPE_IDS as n, StoryDocsService as na, useStatusStore as nc, API_MatchOptions as ni, shortcutMatchesShortcut as nl, DecoratorFunction$2 as nn, TypescriptOptions$1 as no, Addon_BaseStoryFn as nr, VoidSchema as ns, setProjectAnnotations as nt, StatusStore as o, StoryDocsPayload as oa, Actor as oc, API_ProviderData$1 as oi, AddonStore$1 as ol, InputType as on, SupportedBuilder$1 as oo, Addon_ClientApiAddons as or, Command as os, normalizeProjectAnnotations as ot, SupportedLanguage$1 as p, BuilderResult as pa, API_DocsEntry$2 as pc, API_SidebarOptions as pi, Path$1 as pn, ModuleResolveConfig$1 as po, Addon_Elements as pr, LoadStatus as ps, ResolvedModuleExport as pt, inferControls as q, Stats as qa, API_KeyCollection as qc, registerService$1 as qi, TestFunction$1 as qn, LiteralSchema as qo, BaseStory as qr, TestProviderId as qs, BeforeAll as qt, REVIEW_STATUS_TYPE_ID as r, StoryDoc as ra, MockUniversalStore as rc, API_Notification$1 as ri, shortcutToAriaKeyshortcuts as rl, GlobalTypes$1 as rn, VersionCheck as ro, Addon_BaseStoryObject as rr, seedQueryState as rs, composeStepRunners as rt, StatusStoreByTypeId$1 as s, StoryDocsProvider as sa, Event as sc, API_RefId as si, Addon_Type$1 as sl, LegacyAnnotatedStoryFn as sn, ImportEdge as so, Addon_ClientApiReturnFn as sr, CommandCtx as ss, normalizeStory as st, CHANGE_DETECTION_STATUS_TYPE_ID as t, selectStoryDoc as ta, universalStatusStore as tc, API_LoadedRefData$1 as ti, optionOrAltSymbol as tl, DecoratorApplicator$1 as tn, TestBuildFlags as to, Addon_BaseMeta as tr, VariantSchema as ts, setDefaultProjectAnnotations as tt, StatusValue$1 as u, Builder as ua, API as uc, API_RenderOptions as ui, LoaderFunction as un, ParseFileArgs as uo, Addon_Comparator as ur, Commands as us, DocsContextProps$1 as ut, REVIEW_EVENTS as v, ComponentSubcomponentManifest as va, API_LeafEntry$2 as vc, FilterFunction as vi, SBEnumType as vn, DocgenPayload$1 as vo, Addon_LoaderFunction as vr, QueryDefinition as vs, Builder_EnvsRaw as vt, StoriesWithPartialProps as w, CoreCommon_ResolvedAddonVirtual$1 as wa, Listener$2 as wc, SetStoriesStoryData as wi, SBUnionType as wn, BaseIndexEntry as wo, Addon_PartialStoryFn as wr, SchemaDescriptor as ws, ModuleExports$1 as wt, ComposedStoryFn$1 as x, CoreCommon_AddonInfo$1 as xa, API_StoryEntry$2 as xc, SetGlobalsPayload as xi, SBOtherType as xn, DocgenProviderInput as xo, Addon_OptionsParameter as xr, QueryState as xs, BoundStory as xt, REVIEW_NAMESPACE as y, ComponentsManifest as ya, API_Refs$2 as yc, DocsPreparedPayload as yi, SBIntersectionType as yn, DocgenProvider as yo, Addon_Loaders as yr, QueryFunctions as ys, Builder_Unpromise as yt, DocsContext as z, PresetProperty as za, useSharedState as zc, API_RootEntry as zi, StoryName$1 as zn, StoryIndexEntry$1 as zo, Addon_ToolbarConfig as zr, universalChecklistStore as zs, ArgTypes$2 as zt };