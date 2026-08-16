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
  any
} from "./chunk-TWPZPMFT.js";
import {
  StatusTypeIdMismatchError,
  StorybookError
} from "./chunk-BKV2AHET.js";
import {
  require_dist
} from "./chunk-TWWDCALS.js";
import {
  __toESM
} from "./chunk-5SSDLDTJ.js";

// src/cli/detect.ts
async function detectPnp() {
  return !!any([".pnp.js", ".pnp.cjs"]);
}

// src/manager-errors.ts
var StatusTypeIdMismatchError2 = class extends StorybookError {
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
};

// src/preview-errors.ts
var import_ts_dedent = __toESM(require_dist(), 1);
var StatusTypeIdMismatchError3 = class extends StorybookError {
  constructor(data) {
    super({
      name: "StatusTypeIdMismatchError",
      category: "PREVIEW_API" /* PREVIEW_API */,
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

// src/shared/status-store/index.ts
var UNIVERSAL_STATUS_STORE_OPTIONS = {
  id: "storybook/status",
  leader: !0,
  initialState: {}
}, StatusStoreEventType = {
  SELECT: "select"
};
function createStatusStore({
  universalStatusStore,
  useUniversalStore,
  environment
}) {
  let fullStatusStore = {
    getAll() {
      return universalStatusStore.getState();
    },
    set(statuses) {
      universalStatusStore.setState((state) => {
        let newState = { ...state };
        for (let status of statuses) {
          let { storyId, typeId } = status;
          newState[storyId] = { ...newState[storyId] ?? {}, [typeId]: status };
        }
        return newState;
      });
    },
    onAllStatusChange(listener) {
      return universalStatusStore.onStateChange((state, prevState) => {
        listener(state, prevState);
      });
    },
    onSelect(listener) {
      return universalStatusStore.subscribe(StatusStoreEventType.SELECT, (event) => {
        listener(event.payload);
      });
    },
    selectStatuses: (statuses) => {
      universalStatusStore.send({ type: StatusStoreEventType.SELECT, payload: statuses });
    },
    unset(storyIds) {
      if (!storyIds) {
        universalStatusStore.setState({});
        return;
      }
      universalStatusStore.setState((state) => {
        let newState = { ...state };
        for (let storyId of storyIds)
          delete newState[storyId];
        return newState;
      });
    },
    typeId: void 0
  }, getStatusStoreByTypeId = (typeId) => ({
    getAll: fullStatusStore.getAll,
    set(statuses) {
      universalStatusStore.setState((state) => {
        let newState = { ...state };
        for (let status of statuses) {
          let { storyId } = status;
          if (status.typeId !== typeId)
            switch (environment) {
              case "server":
                throw new StatusTypeIdMismatchError({
                  status,
                  typeId
                });
              case "manager":
                throw new StatusTypeIdMismatchError2({
                  status,
                  typeId
                });
              default:
                throw new StatusTypeIdMismatchError3({
                  status,
                  typeId
                });
            }
          newState[storyId] = { ...newState[storyId] ?? {}, [typeId]: status };
        }
        return newState;
      });
    },
    onAllStatusChange: fullStatusStore.onAllStatusChange,
    onSelect(listener) {
      return universalStatusStore.subscribe(StatusStoreEventType.SELECT, (event) => {
        event.payload.some((status) => status.typeId === typeId) && listener(event.payload);
      });
    },
    unset(storyIds) {
      universalStatusStore.setState((state) => {
        let newState = { ...state };
        for (let storyId in newState)
          if (newState[storyId]?.[typeId] && (!storyIds || storyIds?.includes(storyId))) {
            let { [typeId]: omittedStatus, ...storyStatusesWithoutTypeId } = newState[storyId];
            newState[storyId] = storyStatusesWithoutTypeId;
          }
        return newState;
      });
    },
    typeId
  });
  return useUniversalStore ? {
    getStatusStoreByTypeId,
    fullStatusStore,
    universalStatusStore,
    useStatusStore: (selector) => useUniversalStore(universalStatusStore, selector)[0]
  } : { getStatusStoreByTypeId, fullStatusStore, universalStatusStore };
}

export {
  UniversalStoreFollowerTimeoutError,
  detectPnp,
  UNIVERSAL_STATUS_STORE_OPTIONS,
  createStatusStore
};
