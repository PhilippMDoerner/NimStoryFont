import {
  StorybookError
} from "./chunk-2HVKLHKJ.js";
import {
  require_picocolors_browser
} from "./chunk-SC67XZST.js";
import {
  __toESM
} from "./chunk-IMSF75WX.js";

// src/server-errors.ts
var import_picocolors = __toESM(require_picocolors_browser(), 1);

// src/shared/open-service/errors.ts
function formatIssuePath(path) {
  return path?.length ? path.map((segment) => {
    let key = typeof segment == "object" && segment !== null && "key" in segment ? segment.key : segment;
    return typeof key == "number" ? `[${key}]` : `.${String(key)}`;
  }).join("").replace(/^\./, "") : "";
}
function formatIssues(issues) {
  return issues.map((issue) => {
    let path = formatIssuePath(issue.path);
    return path === "" ? issue.message : `${path}: ${issue.message}`;
  }).join(`
`);
}

// src/server-errors.ts
var OpenServiceValidationError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceValidationError",
      category: "CORE-COMMON" /* CORE_COMMON */,
      code: 5,
      message: `Invalid ${data.phase} for ${data.kind} "${data.serviceId}.${data.name}":
${formatIssues(
        data.issues
      )}`
    });
    this.data = data;
  }
};
var OpenServiceMissingServiceError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceMissingServiceError",
      category: "CORE-COMMON" /* CORE_COMMON */,
      code: 7,
      message: `No registered service with id "${data.serviceId}" exists in this environment.`
    });
    this.data = data;
  }
}, OpenServiceUnimplementedOperationError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceUnimplementedOperationError",
      category: "CORE-COMMON" /* CORE_COMMON */,
      code: 8,
      message: `${data.kind[0].toUpperCase()}${data.kind.slice(1)} "${data.serviceId}.${data.name}" is not implemented for this environment.`
    });
    this.data = data;
  }
}, OpenServiceInvalidStaticPathError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceInvalidStaticPathError",
      category: "CORE-COMMON" /* CORE_COMMON */,
      code: 10,
      message: `Invalid static path "${data.path}" for query "${data.serviceId}.${data.name}": use a relative path with forward slashes and no ".." segments.`
    });
    this.data = data;
  }
}, OpenServiceAsyncSchemaError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceAsyncSchemaError",
      category: "CORE-COMMON" /* CORE_COMMON */,
      code: 9,
      message: `Async schema for ${data.kind} "${data.serviceId}.${data.name}" (${data.phase}): query input and output schemas must validate synchronously.`
    });
    this.data = data;
  }
}, OpenServiceLoadedDrainExceededError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceLoadedDrainExceededError",
      category: "CORE-COMMON" /* CORE_COMMON */,
      code: 11,
      message: `Query "${data.serviceId}.${data.name}".loaded(...) did not settle after ${data.iterations} drain iterations. Check for handlers that keep discovering new dependencies after every state change.`
    });
    this.data = data;
  }
};
var OpenServiceMissingChannelError = class extends StorybookError {
  constructor(data = {}) {
    super({
      name: "OpenServiceMissingChannelError",
      category: "CORE-COMMON" /* CORE_COMMON */,
      code: 13,
      message: data.serviceId ? `Cannot register service "${data.serviceId}": the Storybook addons channel is not installed in this runtime.` : "The Storybook addons channel is not installed in this runtime."
    });
    this.data = data;
  }
}, OpenServiceRemoteCommandDisconnectedError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceRemoteCommandDisconnectedError",
      category: "CORE-COMMON" /* CORE_COMMON */,
      code: 14,
      message: `Service "${data.serviceId}" was unregistered before a remote command resolved.`
    });
    this.data = data;
  }
}, OpenServiceRemoteCommandUnhandledError = class extends StorybookError {
  constructor(data) {
    super({
      name: "OpenServiceRemoteCommandUnhandledError",
      category: "CORE-COMMON" /* CORE_COMMON */,
      code: 15,
      message: `No runtime acknowledged remote command "${data.serviceId}.${data.commandName}"; its handler is not implemented in any connected runtime.`
    });
    this.data = data;
  }
};
var StatusTypeIdMismatchError = class extends StorybookError {
  constructor(data) {
    super({
      name: "StatusTypeIdMismatchError",
      category: "CORE-SERVER" /* CORE_SERVER */,
      code: 16,
      message: `Status has typeId "${data.status.typeId}" but was added to store with typeId "${data.typeId}". Full status: ${JSON.stringify(
        data.status,
        null,
        2
      )}`
    });
    this.data = data;
  }
};

export {
  OpenServiceValidationError,
  OpenServiceMissingServiceError,
  OpenServiceUnimplementedOperationError,
  OpenServiceInvalidStaticPathError,
  OpenServiceAsyncSchemaError,
  OpenServiceLoadedDrainExceededError,
  OpenServiceMissingChannelError,
  OpenServiceRemoteCommandDisconnectedError,
  OpenServiceRemoteCommandUnhandledError,
  StatusTypeIdMismatchError
};
