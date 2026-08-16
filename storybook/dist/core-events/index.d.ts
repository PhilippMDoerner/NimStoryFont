import { a as ArgTypes } from "../chunk-CkNMGLRh.js";
import { Report } from "storybook/preview-api";

//#region code/core/.dts-emit/code/core/src/core-events/data/create-new-story.d.ts
interface CreateNewStoryRequestPayload {
  componentFilePath: string;
  componentExportName: string;
  componentIsDefaultExport: boolean;
  componentExportCount: number;
}
interface CreateNewStoryResponsePayload {
  storyId: string;
  storyFilePath: string;
  exportedStoryName: string;
}
type CreateNewStoryErrorPayload = {
  type: 'STORY_FILE_EXISTS';
  kind: string;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/core-events/data/file-component-search.d.ts
interface FileComponentSearchRequestPayload {}
interface FileComponentSearchResponsePayload {
  files: Array<{
    filepath: string;
    storyFileExists: boolean;
    exportedComponents: Array<{
      name: string;
      default: boolean;
    }> | null;
  }> | null;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-events/data/argtypes-info.d.ts
interface ArgTypesRequestPayload {
  storyId: string;
}
interface ArgTypesResponsePayload {
  argTypes: ArgTypes;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-events/data/request-response.d.ts
type RequestData<Payload = void> = {
  id: string;
  payload: Payload;
};
type ResponseData<Payload = void, ErrorPayload extends Record<string, any> | void = void> = {
  id: string;
  success: true;
  error: null;
  payload: Payload;
} | {
  id: string;
  success: false;
  error: string;
  payload?: ErrorPayload;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/core-events/data/save-story.d.ts
interface SaveStoryRequestPayload {
  args: string | undefined;
  csfId: string;
  importPath: string;
  name?: string;
}
interface SaveStoryResponsePayload {
  csfId: string;
  newStoryId?: string;
  newStoryName?: string;
  newStoryExportName?: string;
  sourceFileContent?: string;
  sourceFileName?: string;
  sourceStoryName?: string;
  sourceStoryExportName?: string;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-events/data/whats-new.d.ts
interface WhatsNewCache {
  lastDismissedPost?: string;
  lastReadPost?: string;
}
type WhatsNewData = {
  status: 'SUCCESS';
  title: string;
  url: string;
  blogUrl?: string;
  publishedAt: string;
  excerpt: string;
  postIsRead: boolean;
  showNotification: boolean;
  disableWhatsNewNotifications: boolean;
} | {
  status: 'ERROR';
};
//#endregion
//#region code/core/.dts-emit/code/core/src/core-events/data/phases.d.ts
interface StoryFinishedPayload {
  storyId: string;
  status: 'error' | 'success';
  reporters: Report[];
}
//#endregion
//#region code/core/.dts-emit/code/core/src/core-events/data/open-in-editor.d.ts
type OpenInEditorRequestPayload = {
  file: string;
  line?: number;
  column?: number;
};
type OpenInEditorResponsePayload = {
  file: string;
  line?: number;
  column?: number;
  error: string | null;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/core-events/index.d.ts
declare enum events {
  CHANNEL_WS_DISCONNECT = "channelWSDisconnect",
  CHANNEL_CREATED = "channelCreated",
  CONFIG_ERROR = "configError",
  STORY_INDEX_INVALIDATED = "storyIndexInvalidated",
  STORY_SPECIFIED = "storySpecified",
  SET_CONFIG = "setConfig",
  SET_STORIES = "setStories",
  SET_INDEX = "setIndex",
  SET_CURRENT_STORY = "setCurrentStory",
  CURRENT_STORY_WAS_SET = "currentStoryWasSet",
  FORCE_RE_RENDER = "forceReRender",
  FORCE_REMOUNT = "forceRemount",
  PRELOAD_ENTRIES = "preloadStories",
  STORY_PREPARED = "storyPrepared",
  DOCS_PREPARED = "docsPrepared",
  STORY_CHANGED = "storyChanged",
  STORY_UNCHANGED = "storyUnchanged",
  STORY_RENDERED = "storyRendered",
  STORY_FINISHED = "storyFinished",
  STORY_MISSING = "storyMissing",
  STORY_ERRORED = "storyErrored",
  STORY_THREW_EXCEPTION = "storyThrewException",
  STORY_RENDER_PHASE_CHANGED = "storyRenderPhaseChanged",
  STORY_HOT_UPDATED = "storyHotUpdated",
  PLAY_FUNCTION_THREW_EXCEPTION = "playFunctionThrewException",
  UNHANDLED_ERRORS_WHILE_PLAYING = "unhandledErrorsWhilePlaying",
  UPDATE_STORY_ARGS = "updateStoryArgs",
  STORY_ARGS_UPDATED = "storyArgsUpdated",
  RESET_STORY_ARGS = "resetStoryArgs",
  SET_FILTER = "setFilter",
  SET_GLOBALS = "setGlobals",
  UPDATE_GLOBALS = "updateGlobals",
  GLOBALS_UPDATED = "globalsUpdated",
  REGISTER_SUBSCRIPTION = "registerSubscription",
  PREVIEW_INITIALIZED = "previewInitialized",
  PREVIEW_KEYDOWN = "previewKeydown",
  PREVIEW_BUILDER_PROGRESS = "preview_builder_progress",
  SELECT_STORY = "selectStory",
  STORIES_COLLAPSE_ALL = "storiesCollapseAll",
  STORIES_EXPAND_ALL = "storiesExpandAll",
  DOCS_RENDERED = "docsRendered",
  SHARED_STATE_CHANGED = "sharedStateChanged",
  SHARED_STATE_SET = "sharedStateSet",
  NAVIGATE_URL = "navigateUrl",
  UPDATE_QUERY_PARAMS = "updateQueryParams",
  REQUEST_WHATS_NEW_DATA = "requestWhatsNewData",
  RESULT_WHATS_NEW_DATA = "resultWhatsNewData",
  SET_WHATS_NEW_CACHE = "setWhatsNewCache",
  TOGGLE_WHATS_NEW_NOTIFICATIONS = "toggleWhatsNewNotifications",
  TELEMETRY_ERROR = "telemetryError",
  FILE_COMPONENT_SEARCH_REQUEST = "fileComponentSearchRequest",
  FILE_COMPONENT_SEARCH_RESPONSE = "fileComponentSearchResponse",
  SAVE_STORY_REQUEST = "saveStoryRequest",
  SAVE_STORY_RESPONSE = "saveStoryResponse",
  ARGTYPES_INFO_REQUEST = "argtypesInfoRequest",
  ARGTYPES_INFO_RESPONSE = "argtypesInfoResponse",
  CREATE_NEW_STORYFILE_REQUEST = "createNewStoryfileRequest",
  CREATE_NEW_STORYFILE_RESPONSE = "createNewStoryfileResponse",
  GHOST_STORIES_REQUEST = "ghostStoriesRequest",
  GHOST_STORIES_RESPONSE = "ghostStoriesResponse",
  AI_SETUP_ANALYTICS_RESPONSE = "aiSetupAnalyticsResponse",
  AI_SETUP_ANALYTICS_REQUEST = "aiSetupAnalyticsRequest",
  OPEN_IN_EDITOR_REQUEST = "openInEditorRequest",
  OPEN_IN_EDITOR_RESPONSE = "openInEditorResponse",
  MANAGER_INERT_ATTRIBUTE_CHANGED = "managerInertAttributeChanged",
  SHARE_ISOLATE_MODE = "shareIsolateMode",
  AI_PROMPT_NUDGE = "aiPromptNudge",
  SIDEBAR_FILTER_CHANGED = "sidebarFilterChanged"
}
declare const CHANNEL_WS_DISCONNECT: events, CHANNEL_CREATED: events, CONFIG_ERROR: events, CREATE_NEW_STORYFILE_REQUEST: events, CREATE_NEW_STORYFILE_RESPONSE: events, CURRENT_STORY_WAS_SET: events, DOCS_PREPARED: events, DOCS_RENDERED: events, FILE_COMPONENT_SEARCH_REQUEST: events, FILE_COMPONENT_SEARCH_RESPONSE: events, FORCE_RE_RENDER: events, FORCE_REMOUNT: events, GLOBALS_UPDATED: events, NAVIGATE_URL: events, PLAY_FUNCTION_THREW_EXCEPTION: events, UNHANDLED_ERRORS_WHILE_PLAYING: events, PRELOAD_ENTRIES: events, PREVIEW_INITIALIZED: events, PREVIEW_BUILDER_PROGRESS: events, PREVIEW_KEYDOWN: events, REGISTER_SUBSCRIPTION: events, RESET_STORY_ARGS: events, SELECT_STORY: events, SET_CONFIG: events, SET_CURRENT_STORY: events, SET_FILTER: events, SET_GLOBALS: events, SET_INDEX: events, SET_STORIES: events, SHARED_STATE_CHANGED: events, SHARED_STATE_SET: events, STORIES_COLLAPSE_ALL: events, STORIES_EXPAND_ALL: events, STORY_ARGS_UPDATED: events, STORY_CHANGED: events, STORY_ERRORED: events, STORY_INDEX_INVALIDATED: events, STORY_MISSING: events, STORY_PREPARED: events, STORY_RENDER_PHASE_CHANGED: events, STORY_RENDERED: events, STORY_FINISHED: events, STORY_SPECIFIED: events, STORY_THREW_EXCEPTION: events, STORY_UNCHANGED: events, STORY_HOT_UPDATED: events, UPDATE_GLOBALS: events, UPDATE_QUERY_PARAMS: events, UPDATE_STORY_ARGS: events, REQUEST_WHATS_NEW_DATA: events, RESULT_WHATS_NEW_DATA: events, SET_WHATS_NEW_CACHE: events, TOGGLE_WHATS_NEW_NOTIFICATIONS: events, TELEMETRY_ERROR: events, SAVE_STORY_REQUEST: events, SAVE_STORY_RESPONSE: events, ARGTYPES_INFO_REQUEST: events, ARGTYPES_INFO_RESPONSE: events, GHOST_STORIES_REQUEST: events, GHOST_STORIES_RESPONSE: events, AI_SETUP_ANALYTICS_RESPONSE: events, AI_SETUP_ANALYTICS_REQUEST: events, OPEN_IN_EDITOR_REQUEST: events, OPEN_IN_EDITOR_RESPONSE: events, MANAGER_INERT_ATTRIBUTE_CHANGED: events, SHARE_ISOLATE_MODE: events, AI_PROMPT_NUDGE: events, SIDEBAR_FILTER_CHANGED: events;
//#endregion
export { AI_PROMPT_NUDGE, AI_SETUP_ANALYTICS_REQUEST, AI_SETUP_ANALYTICS_RESPONSE, ARGTYPES_INFO_REQUEST, ARGTYPES_INFO_RESPONSE, ArgTypesRequestPayload, ArgTypesResponsePayload, CHANNEL_CREATED, CHANNEL_WS_DISCONNECT, CONFIG_ERROR, CREATE_NEW_STORYFILE_REQUEST, CREATE_NEW_STORYFILE_RESPONSE, CURRENT_STORY_WAS_SET, CreateNewStoryErrorPayload, CreateNewStoryRequestPayload, CreateNewStoryResponsePayload, DOCS_PREPARED, DOCS_RENDERED, FILE_COMPONENT_SEARCH_REQUEST, FILE_COMPONENT_SEARCH_RESPONSE, FORCE_REMOUNT, FORCE_RE_RENDER, FileComponentSearchRequestPayload, FileComponentSearchResponsePayload, GHOST_STORIES_REQUEST, GHOST_STORIES_RESPONSE, GLOBALS_UPDATED, MANAGER_INERT_ATTRIBUTE_CHANGED, NAVIGATE_URL, OPEN_IN_EDITOR_REQUEST, OPEN_IN_EDITOR_RESPONSE, OpenInEditorRequestPayload, OpenInEditorResponsePayload, PLAY_FUNCTION_THREW_EXCEPTION, PRELOAD_ENTRIES, PREVIEW_BUILDER_PROGRESS, PREVIEW_INITIALIZED, PREVIEW_KEYDOWN, REGISTER_SUBSCRIPTION, REQUEST_WHATS_NEW_DATA, RESET_STORY_ARGS, RESULT_WHATS_NEW_DATA, RequestData, ResponseData, SAVE_STORY_REQUEST, SAVE_STORY_RESPONSE, SELECT_STORY, SET_CONFIG, SET_CURRENT_STORY, SET_FILTER, SET_GLOBALS, SET_INDEX, SET_STORIES, SET_WHATS_NEW_CACHE, SHARED_STATE_CHANGED, SHARED_STATE_SET, SHARE_ISOLATE_MODE, SIDEBAR_FILTER_CHANGED, STORIES_COLLAPSE_ALL, STORIES_EXPAND_ALL, STORY_ARGS_UPDATED, STORY_CHANGED, STORY_ERRORED, STORY_FINISHED, STORY_HOT_UPDATED, STORY_INDEX_INVALIDATED, STORY_MISSING, STORY_PREPARED, STORY_RENDERED, STORY_RENDER_PHASE_CHANGED, STORY_SPECIFIED, STORY_THREW_EXCEPTION, STORY_UNCHANGED, SaveStoryRequestPayload, SaveStoryResponsePayload, StoryFinishedPayload, TELEMETRY_ERROR, TOGGLE_WHATS_NEW_NOTIFICATIONS, UNHANDLED_ERRORS_WHILE_PLAYING, UPDATE_GLOBALS, UPDATE_QUERY_PARAMS, UPDATE_STORY_ARGS, WhatsNewCache, WhatsNewData, events as default };