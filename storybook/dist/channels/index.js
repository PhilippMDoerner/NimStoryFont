import {
  UniversalStore,
  isJSON,
  parse,
  stringify
} from "../_browser-chunks/chunk-GPBLMYGI.js";
import {
  invariant
} from "../_browser-chunks/chunk-IWQGIXJS.js";
import {
  Channel,
  clearChannel,
  ensureChannel,
  getChannel,
  installNoopChannel,
  requireChannel,
  setChannel
} from "../_browser-chunks/chunk-KK3JJ3E4.js";
import "../_browser-chunks/chunk-IUGBVGDA.js";
import "../_browser-chunks/chunk-2HVKLHKJ.js";
import "../_browser-chunks/chunk-3LY4VQVK.js";
import "../_browser-chunks/chunk-IMSF75WX.js";

// src/channels/postmessage/index.ts
import { logger as logger2, pretty } from "storybook/internal/client-logger";
import * as EVENTS from "storybook/internal/core-events";

// src/channels/postmessage/getEventSourceUrl.ts
import { logger } from "storybook/internal/client-logger";
var pickFrameByRefId = (candidates, refId) => {
  if (candidates.length === 1)
    return candidates[0];
  if (!(candidates.length === 0 || !refId))
    return candidates.find(
      (el) => (el.getAttribute("src") ?? "").includes(`refId=${encodeURIComponent(refId)}`)
    );
}, getEventSourceUrl = (event, refId) => {
  let candidates = Array.from(
    document.querySelectorAll("iframe[data-is-storybook]")
  ).filter((element) => {
    try {
      return element.contentWindow?.location.origin === event.source.location.origin && element.contentWindow?.location.pathname === event.source.location.pathname;
    } catch {
    }
    try {
      return element.contentWindow === event.source;
    } catch {
    }
    let src2 = element.getAttribute("src"), origin;
    try {
      if (!src2)
        return !1;
      ({ origin } = new URL(src2, document.location.toString()));
    } catch {
      return !1;
    }
    return origin === event.origin;
  }), src = pickFrameByRefId(candidates, refId)?.getAttribute("src");
  if (src) {
    let { protocol, host, pathname } = new URL(src, document.location.toString());
    return `${protocol}//${host}${pathname}`;
  }
  return candidates.length > 1 && logger.error("found multiple candidates for event source"), null;
};

// src/channels/postmessage/index.ts
var { document: document2, location } = globalThis, KEY = "storybook-channel", CHANNEL_OPTIONS = globalThis.CHANNEL_OPTIONS || {}, defaultEventOptions = { maxDepth: 25 }, PostMessageTransport = class {
  constructor(config) {
    this.config = config;
    this.connected = !1;
    if (this.buffer = [], typeof globalThis.addEventListener == "function" && globalThis.addEventListener("message", this.handleEvent.bind(this), !1), config.page !== "manager" && config.page !== "preview")
      throw new Error(`postmsg-channel: "config.page" cannot be "${config.page}"`);
  }
  setHandler(handler) {
    this.handler = (...args) => {
      handler.apply(this, args), !this.connected && this.getLocalFrame().length && (this.flush(), this.connected = !0);
    };
  }
  /**
   * Sends `event` to the associated window. If the window does not yet exist the event will be
   * stored in a buffer and sent when the window exists.
   *
   * @param event
   */
  send(event, options) {
    let {
      target,
      // telejson options
      allowRegExp,
      allowSymbol,
      allowDate,
      allowError,
      allowUndefined,
      maxDepth,
      space
    } = options || {}, eventOptions = Object.fromEntries(
      Object.entries({
        allowRegExp,
        allowSymbol,
        allowDate,
        allowError,
        allowUndefined,
        maxDepth,
        space
      }).filter(([k, v]) => typeof v < "u")
    ), stringifyOptions = {
      ...defaultEventOptions,
      ...CHANNEL_OPTIONS,
      ...eventOptions
    }, frames = this.getFrames(target), query = new URLSearchParams(location?.search || ""), data = stringify(
      {
        key: KEY,
        event,
        refId: query.get("refId")
      },
      stringifyOptions
    );
    return frames.length ? (this.buffer.length && this.flush(), frames.forEach((f) => {
      try {
        f.postMessage(data, "*");
      } catch {
        logger2.error("sending over postmessage fail");
      }
    }), Promise.resolve(null)) : new Promise((resolve, reject) => {
      this.buffer.push({ event, resolve, reject });
    });
  }
  flush() {
    let { buffer } = this;
    this.buffer = [], buffer.forEach((item) => {
      this.send(item.event).then(item.resolve).catch(item.reject);
    });
  }
  getFrames(target) {
    if (this.config.page === "manager") {
      let list = Array.from(
        document2.querySelectorAll("iframe[data-is-storybook][data-is-loaded]")
      ).flatMap((e) => {
        try {
          return e.contentWindow && e.dataset.isStorybook !== void 0 && e.id === target ? [e.contentWindow] : [];
        } catch {
          return [];
        }
      });
      return list?.length ? list : this.getCurrentFrames();
    }
    return globalThis.parent && globalThis.parent !== globalThis.self ? [globalThis.parent] : [];
  }
  getCurrentFrames() {
    return this.config.page === "manager" ? Array.from(
      document2.querySelectorAll('[data-is-storybook="true"]')
    ).flatMap((e) => e.contentWindow ? [e.contentWindow] : []) : globalThis.parent ? [globalThis.parent] : [];
  }
  getLocalFrame() {
    return this.config.page === "manager" ? Array.from(
      document2.querySelectorAll("#storybook-preview-iframe")
    ).flatMap((e) => e.contentWindow ? [e.contentWindow] : []) : globalThis.parent ? [globalThis.parent] : [];
  }
  handleEvent(rawEvent) {
    try {
      let { data } = rawEvent, { key, event, refId } = typeof data == "string" && isJSON(data) ? parse(data, CHANNEL_OPTIONS) : data;
      if (key === KEY) {
        let pageString = this.config.page === "manager" ? '<span style="color: #37D5D3; background: black"> manager </span>' : '<span style="color: #1EA7FD; background: black"> preview </span>', eventString = Object.values(EVENTS).includes(event.type) ? `<span style="color: #FF4785">${event.type}</span>` : `<span style="color: #FFAE00">${event.type}</span>`;
        if (refId && (event.refId = refId), event.source = this.config.page === "preview" ? rawEvent.origin : getEventSourceUrl(rawEvent, refId), !event.source) {
          pretty.error(
            `${pageString} received ${eventString} but was unable to determine the source of the event`
          );
          return;
        }
        let message = `${pageString} received ${eventString} (${data.length})`;
        pretty.debug(
          location.origin !== event.source ? message : `${message} <span style="color: gray">(on ${location.origin} from ${event.source})</span>`,
          ...event.args
        ), invariant(this.handler, "ChannelHandler should be set"), this.config.page === "manager" && this.buffer.length && this.flush(), this.handler(event);
      }
    } catch (error) {
      logger2.error(error);
    }
  }
};

// src/channels/websocket/index.ts
import * as EVENTS2 from "storybook/internal/core-events";
var HEARTBEAT_INTERVAL = 15e3, HEARTBEAT_MAX_LATENCY = 5e3, CHANNEL_OPTIONS2 = globalThis.CHANNEL_OPTIONS || {}, WebsocketTransport = class {
  constructor({ url, onError, page }) {
    this.buffer = [];
    this.isReady = !1;
    this.isClosed = !1;
    this.pingTimeout = 0;
    this.socket = new WebSocket(url), this.socket.onopen = () => {
      this.isReady = !0, this.heartbeat(), this.flush();
    }, this.socket.onmessage = ({ data }) => {
      let event = typeof data == "string" && isJSON(data) ? parse(data) : data;
      if (invariant(this.handler, "WebsocketTransport handler should be set"), this.heartbeat(), event.type === "ping") {
        this.send({ type: "pong" });
        return;
      }
      this.handler(event);
    }, this.socket.onerror = (e) => {
      onError && onError(e);
    }, this.socket.onclose = (ev) => {
      invariant(this.handler, "WebsocketTransport handler should be set"), this.handler({
        type: EVENTS2.CHANNEL_WS_DISCONNECT,
        args: [{ reason: ev.reason, code: ev.code }],
        from: page || "preview"
      }), this.isClosed = !0, clearTimeout(this.pingTimeout);
    };
  }
  heartbeat() {
    clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
      this.socket.close(3008, "timeout");
    }, HEARTBEAT_INTERVAL + HEARTBEAT_MAX_LATENCY);
  }
  setHandler(handler) {
    this.handler = handler;
  }
  send(event) {
    this.isClosed || (this.isReady ? this.sendNow(event) : this.sendLater(event));
  }
  sendLater(event) {
    this.buffer.push(event);
  }
  sendNow(event) {
    let data = stringify(event, {
      maxDepth: 15,
      ...CHANNEL_OPTIONS2
    });
    this.socket.send(data);
  }
  flush() {
    let { buffer } = this;
    this.buffer = [], buffer.forEach((event) => this.send(event));
  }
};

// src/channels/index.ts
var channels_default = Channel;
function createBrowserChannel({ page, extraTransports = [] }) {
  let transports = [new PostMessageTransport({ page }), ...extraTransports];
  if (globalThis.CONFIG_TYPE === "DEVELOPMENT") {
    let protocol = window.location.protocol === "http:" ? "ws" : "wss", { hostname, port } = window.location, { wsToken } = globalThis.CHANNEL_OPTIONS || {}, channelUrl = `${protocol}://${hostname}:${port}/storybook-server-channel?token=${wsToken}`;
    transports.push(new WebsocketTransport({ url: channelUrl, onError: () => {
    }, page }));
  }
  let channel = new Channel({ transports });
  return UniversalStore.__prepare(
    channel,
    page === "manager" ? UniversalStore.Environment.MANAGER : UniversalStore.Environment.PREVIEW
  ), channel;
}
export {
  Channel,
  HEARTBEAT_INTERVAL,
  HEARTBEAT_MAX_LATENCY,
  PostMessageTransport,
  WebsocketTransport,
  clearChannel,
  createBrowserChannel,
  channels_default as default,
  ensureChannel,
  getChannel,
  installNoopChannel,
  requireChannel,
  setChannel
};
