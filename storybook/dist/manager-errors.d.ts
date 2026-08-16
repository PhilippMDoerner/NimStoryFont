import { i as Status, l as StatusTypeId } from "./chunk-Cp-ouEY1.js";
import { t as StorybookError } from "./chunk-CMHAf_uD.js";

//#region code/core/.dts-emit/code/core/src/manager-errors.d.ts
/**
 * If you can't find a suitable category for your error, create one based on the package name/file
 * path of which the error is thrown. For instance: If it's from `storybook/internal/client-logger`,
 * then MANAGER_CLIENT-LOGGER
 *
 * Categories are prefixed by a logical grouping, e.g. MANAGER_ to prevent manager and preview
 * errors from having the same category and error code.
 */
declare enum Category {
  MANAGER_UNCAUGHT = "MANAGER_UNCAUGHT",
  MANAGER_UI = "MANAGER_UI",
  MANAGER_API = "MANAGER_API",
  MANAGER_CLIENT_LOGGER = "MANAGER_CLIENT-LOGGER",
  MANAGER_CHANNELS = "MANAGER_CHANNELS",
  MANAGER_CORE_EVENTS = "MANAGER_CORE-EVENTS",
  MANAGER_ROUTER = "MANAGER_ROUTER",
  MANAGER_THEMING = "MANAGER_THEMING",
  MANAGER_UNIVERSAL_STORE = "MANAGER_UNIVERSAL-STORE",
  MANAGER_OPEN_SERVICE = "MANAGER_OPEN-SERVICE"
}
declare class ProviderDoesNotExtendBaseProviderError extends StorybookError {
  constructor();
}
declare class UncaughtManagerError extends StorybookError {
  data: {
    error: Error;
  };
  constructor(data: {
    error: Error;
  });
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
declare class UniversalStoreFollowerTimeoutError extends StorybookError {
  constructor(followerId: string);
}
declare class OpenServiceStaticSnapshotLoadError extends StorybookError {
  data: {
    serviceId: string;
    queryName: string;
    input: unknown;
    logicalPath: string;
    url: string;
    cause: unknown;
    status?: number;
    statusText?: string;
  };
  constructor(data: {
    serviceId: string;
    queryName: string;
    input: unknown;
    logicalPath: string;
    url: string;
    cause: unknown;
    status?: number;
    statusText?: string;
  });
}
declare class OpenServiceStaticSnapshotInvalidError extends StorybookError {
  data: {
    serviceId: string;
    queryName: string;
    input: unknown;
    logicalPath: string;
    url: string;
    received: unknown;
  };
  constructor(data: {
    serviceId: string;
    queryName: string;
    input: unknown;
    logicalPath: string;
    url: string;
    received: unknown;
  });
}
//#endregion
export { Category, OpenServiceStaticSnapshotInvalidError, OpenServiceStaticSnapshotLoadError, ProviderDoesNotExtendBaseProviderError, StatusTypeIdMismatchError, UncaughtManagerError, UniversalStoreFollowerTimeoutError };