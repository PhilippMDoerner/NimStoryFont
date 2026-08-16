import {
  createBrowserStaticLoader,
  getService,
  registerService
} from "./chunk-W6Y3UHOT.js";
import {
  seedQueryState
} from "./chunk-QC4HFS6K.js";
import {
  isEqual
} from "./chunk-Z3B64JMR.js";

// src/shared/open-service/use-service-command.ts
import * as React from "react";
function useServiceCommand(service, commandName) {
  return React.useMemo(
    () => service.commands[commandName],
    [service, commandName]
  );
}

// src/shared/open-service/use-service-query.ts
import * as React2 from "react";
function useServiceQuery(query, input, selector) {
  let subscriptionKeyRef = React2.useRef(null), snapshotRef = React2.useRef(void 0);
  (subscriptionKeyRef.current === null || subscriptionKeyRef.current.query !== query || !isEqual(subscriptionKeyRef.current.input, input) || subscriptionKeyRef.current.selector !== selector) && (subscriptionKeyRef.current = { query, input, selector }, snapshotRef.current = selector ? seedQueryState(query, input, selector) : seedQueryState(query, input));
  let subscriptionKey = subscriptionKeyRef.current, subscribe = React2.useCallback(
    (listener) => {
      let { query: q, input: i, selector: s } = subscriptionKey, onQueryState = (queryState) => {
        snapshotRef.current = queryState, listener();
      };
      return s ? q.subscribe(i, s, onQueryState) : q.subscribe(i, onQueryState);
    },
    [subscriptionKey]
  ), getSnapshot = React2.useCallback(() => snapshotRef.current, []);
  return React2.useSyncExternalStore(subscribe, getSnapshot);
}

// src/shared/open-service/manager.ts
var getService2 = getService;
function registerService2(definition, registration) {
  return registerService(definition, registration, {
    relay: !0,
    staticLoader: createBrowserStaticLoader()
  });
}

// ../../node_modules/dequal/dist/index.mjs
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
  for (key of iter.keys())
    if (dequal(key, tar)) return key;
}
function dequal(foo, bar) {
  var ctor, len, tmp;
  if (foo === bar) return !0;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length)
        for (; len-- && dequal(foo[len], bar[len]); ) ;
      return len === -1;
    }
    if (ctor === Set) {
      if (foo.size !== bar.size)
        return !1;
      for (len of foo)
        if (tmp = len, tmp && typeof tmp == "object" && (tmp = find(bar, tmp), !tmp) || !bar.has(tmp)) return !1;
      return !0;
    }
    if (ctor === Map) {
      if (foo.size !== bar.size)
        return !1;
      for (len of foo)
        if (tmp = len[0], tmp && typeof tmp == "object" && (tmp = find(bar, tmp), !tmp) || !dequal(len[1], bar.get(tmp)))
          return !1;
      return !0;
    }
    if (ctor === ArrayBuffer)
      foo = new Uint8Array(foo), bar = new Uint8Array(bar);
    else if (ctor === DataView) {
      if ((len = foo.byteLength) === bar.byteLength)
        for (; len-- && foo.getInt8(len) === bar.getInt8(len); ) ;
      return len === -1;
    }
    if (ArrayBuffer.isView(foo)) {
      if ((len = foo.byteLength) === bar.byteLength)
        for (; len-- && foo[len] === bar[len]; ) ;
      return len === -1;
    }
    if (!ctor || typeof foo == "object") {
      len = 0;
      for (ctor in foo)
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor) || !(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return !1;
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

// ../../node_modules/es-toolkit/dist/array/partition.mjs
function partition(arr, isInTruthy) {
  let truthy = [], falsy = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    isInTruthy(item) ? truthy.push(item) : falsy.push(item);
  }
  return [truthy, falsy];
}

// ../../node_modules/es-toolkit/dist/array/countBy.mjs
function countBy(arr, mapper) {
  let result = {};
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i], key = mapper(item);
    result[key] = (result[key] ?? 0) + 1;
  }
  return result;
}

// ../../node_modules/es-toolkit/dist/array/uniq.mjs
function uniq(arr) {
  return [...new Set(arr)];
}

export {
  useServiceCommand,
  useServiceQuery,
  getService2 as getService,
  registerService2 as registerService,
  dequal,
  countBy,
  partition,
  uniq
};
