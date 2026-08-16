import {
  StorybookError
} from "./chunk-2HVKLHKJ.js";

// src/manager-errors.ts
var Category = /* @__PURE__ */ ((Category2) => (Category2.MANAGER_UNCAUGHT = "MANAGER_UNCAUGHT", Category2.MANAGER_UI = "MANAGER_UI", Category2.MANAGER_API = "MANAGER_API", Category2.MANAGER_CLIENT_LOGGER = "MANAGER_CLIENT-LOGGER", Category2.MANAGER_CHANNELS = "MANAGER_CHANNELS", Category2.MANAGER_CORE_EVENTS = "MANAGER_CORE-EVENTS", Category2.MANAGER_ROUTER = "MANAGER_ROUTER", Category2.MANAGER_THEMING = "MANAGER_THEMING", Category2.MANAGER_UNIVERSAL_STORE = "MANAGER_UNIVERSAL-STORE", Category2.MANAGER_OPEN_SERVICE = "MANAGER_OPEN-SERVICE", Category2))(Category || {}), ProviderDoesNotExtendBaseProviderError = class extends StorybookError {
  constructor() {
    super({
      name: "ProviderDoesNotExtendBaseProviderError",
      category: "MANAGER_UI" /* MANAGER_UI */,
      code: 1,
      message: "The Provider passed into Storybook's UI is not extended from the base Provider. Please check your Provider implementation."
    });
  }
}, UncaughtManagerError = class extends StorybookError {
  constructor(data) {
    super({
      name: "UncaughtManagerError",
      category: "MANAGER_UNCAUGHT" /* MANAGER_UNCAUGHT */,
      code: 1,
      message: data.error.message
    });
    this.data = data;
    this.stack = data.error.stack;
  }
}, StatusTypeIdMismatchError = class extends StorybookError {
  constructor(data) {
    super({
      name: "StatusTypeIdMismatchError",
      category: "MANAGER_API" /* MANAGER_API */,
      code: 1,
      message: `Status has typeId "${data.status.typeId}" but was added to store with typeId "${data.typeId}". Full status: ${JSON.stringify(
        data.status,
        null,
        2
      )}`
    });
    this.data = data;
  }
}, UniversalStoreFollowerTimeoutError = class extends StorybookError {
  constructor(followerId) {
    super({
      name: "UniversalStoreFollowerTimeoutError",
      category: "MANAGER_UNIVERSAL-STORE" /* MANAGER_UNIVERSAL_STORE */,
      code: 1,
      message: `Timed out waiting for leader state for UniversalStore follower with id: '${followerId}'. Ensure a leader with the same id exists and is reachable before creating a follower.`
    });
  }
}, OpenServiceStaticSnapshotLoadError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceStaticSnapshotLoadError",
      category: "MANAGER_OPEN-SERVICE" /* MANAGER_OPEN_SERVICE */,
      code: 1,
      message: `Failed to load open-service static snapshot "${data.logicalPath}" from "${data.url}" for "${data.serviceId}.${data.queryName}".`,
      cause: data.cause
    });
    this.data = data;
  }
}, OpenServiceStaticSnapshotInvalidError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceStaticSnapshotInvalidError",
      category: "MANAGER_OPEN-SERVICE" /* MANAGER_OPEN_SERVICE */,
      code: 2,
      message: `Open-service static snapshot "${data.logicalPath}" from "${data.url}" for "${data.serviceId}.${data.queryName}" must be a plain object.`
    });
    this.data = data;
  }
};

export {
  Category,
  ProviderDoesNotExtendBaseProviderError,
  UncaughtManagerError,
  StatusTypeIdMismatchError,
  UniversalStoreFollowerTimeoutError,
  OpenServiceStaticSnapshotLoadError,
  OpenServiceStaticSnapshotInvalidError
};
