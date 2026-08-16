import { i as Status, l as StatusTypeId } from "./chunk-Cp-ouEY1.js";
import { t as StorybookError } from "./chunk-CMHAf_uD.js";

//#region code/core/.dts-emit/code/core/src/preview-errors.d.ts
/**
 * If you can't find a suitable category for your error, create one based on the package name/file
 * path of which the error is thrown. For instance: If it's from `storybook/internal/client-logger`,
 * then CLIENT-LOGGER
 *
 * Categories are prefixed by a logical grouping, e.g. PREVIEW_ or FRAMEWORK_ to prevent manager and
 * preview errors from having the same category and error code.
 */
declare enum Category {
  BLOCKS = "BLOCKS",
  DOCS_TOOLS = "DOCS-TOOLS",
  PREVIEW_CLIENT_LOGGER = "PREVIEW_CLIENT-LOGGER",
  PREVIEW_CHANNELS = "PREVIEW_CHANNELS",
  PREVIEW_CORE_EVENTS = "PREVIEW_CORE-EVENTS",
  PREVIEW_INSTRUMENTER = "PREVIEW_INSTRUMENTER",
  PREVIEW_API = "PREVIEW_API",
  PREVIEW_REACT_DOM_SHIM = "PREVIEW_REACT-DOM-SHIM",
  PREVIEW_ROUTER = "PREVIEW_ROUTER",
  PREVIEW_THEMING = "PREVIEW_THEMING",
  RENDERER_HTML = "RENDERER_HTML",
  RENDERER_PREACT = "RENDERER_PREACT",
  RENDERER_REACT = "RENDERER_REACT",
  RENDERER_SERVER = "RENDERER_SERVER",
  RENDERER_SVELTE = "RENDERER_SVELTE",
  RENDERER_VUE = "RENDERER_VUE",
  RENDERER_VUE3 = "RENDERER_VUE3",
  RENDERER_WEB_COMPONENTS = "RENDERER_WEB-COMPONENTS",
  FRAMEWORK_NEXTJS = "FRAMEWORK_NEXTJS",
  ADDON_VITEST = "ADDON_VITEST",
  ADDON_A11Y = "ADDON_A11Y"
}
declare class MissingStoryAfterHmrError extends StorybookError {
  data: {
    storyId: string;
  };
  constructor(data: {
    storyId: string;
  });
}
declare class ImplicitActionsDuringRendering extends StorybookError {
  data: {
    phase: string;
    name: string;
    deprecated: boolean;
  };
  constructor(data: {
    phase: string;
    name: string;
    deprecated: boolean;
  });
}
declare class CalledExtractOnStoreError extends StorybookError {
  constructor();
}
declare class MissingRenderToCanvasError extends StorybookError {
  constructor();
}
declare class CalledPreviewMethodBeforeInitializationError extends StorybookError {
  data: {
    methodName: string;
  };
  constructor(data: {
    methodName: string;
  });
}
declare class StoryIndexFetchError extends StorybookError {
  data: {
    text: string;
  };
  constructor(data: {
    text: string;
  });
}
declare class MdxFileWithNoCsfReferencesError extends StorybookError {
  data: {
    storyId: string;
  };
  constructor(data: {
    storyId: string;
  });
}
declare class EmptyIndexError extends StorybookError {
  constructor();
}
declare class NoStoryMatchError extends StorybookError {
  data: {
    storySpecifier: string;
  };
  constructor(data: {
    storySpecifier: string;
  });
}
declare class MissingStoryFromCsfFileError extends StorybookError {
  data: {
    storyId: string;
  };
  constructor(data: {
    storyId: string;
  });
}
declare class StoryStoreAccessedBeforeInitializationError extends StorybookError {
  constructor();
}
declare class MountMustBeDestructuredError extends StorybookError {
  data: {
    playFunction: string;
  };
  constructor(data: {
    playFunction: string;
  });
}
declare class NoRenderFunctionError extends StorybookError {
  data: {
    id: string;
  };
  constructor(data: {
    id: string;
  });
}
declare class NoStoryMountedError extends StorybookError {
  constructor();
}
declare class StatusTypeIdMismatchError extends StorybookError {
  data: {
    status: Status;
    typeId: StatusTypeId;
  };
  constructor(data: {
    status: Status;
    typeId: StatusTypeId;
  });
}
declare class NextJsSharpError extends StorybookError {
  constructor();
}
declare class NextjsRouterMocksNotAvailable extends StorybookError {
  data: {
    importType: string;
  };
  constructor(data: {
    importType: string;
  });
}
declare class UnknownArgTypesError extends StorybookError {
  data: {
    type: object;
    language: string;
  };
  constructor(data: {
    type: object;
    language: string;
  });
}
declare class InvalidBlockOfPropError extends StorybookError {
  constructor();
}
declare class UnsupportedViewportDimensionError extends StorybookError {
  data: {
    dimension: string;
    value: string;
  };
  constructor(data: {
    dimension: string;
    value: string;
  });
}
declare class ElementA11yParameterError extends StorybookError {
  constructor();
}
//#endregion
export { CalledExtractOnStoreError, CalledPreviewMethodBeforeInitializationError, Category, ElementA11yParameterError, EmptyIndexError, ImplicitActionsDuringRendering, InvalidBlockOfPropError, MdxFileWithNoCsfReferencesError, MissingRenderToCanvasError, MissingStoryAfterHmrError, MissingStoryFromCsfFileError, MountMustBeDestructuredError, NextJsSharpError, NextjsRouterMocksNotAvailable, NoRenderFunctionError, NoStoryMatchError, NoStoryMountedError, StatusTypeIdMismatchError, StoryIndexFetchError, StoryStoreAccessedBeforeInitializationError, UnknownArgTypesError, UnsupportedViewportDimensionError };