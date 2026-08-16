// src/channels/main.ts
var isMulti = (args) => args.transports !== void 0, generateRandomId = () => Math.random().toString(16).slice(2), Channel = class {
  constructor(input = {}) {
    this.sender = generateRandomId();
    this.events = {};
    this.data = {};
    this.transports = [];
    this.isAsync = input.async || !1, isMulti(input) ? (this.transports = input.transports || [], this.transports.forEach((t) => {
      t.setHandler((event) => this.handleEvent(event));
    })) : this.transports = input.transport ? [input.transport] : [], this.transports.forEach((t) => {
      t.setHandler((event) => this.handleEvent(event));
    });
  }
  get hasTransport() {
    return this.transports.length > 0;
  }
  addListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] || [], this.events[eventName].push(listener);
  }
  emit(eventName, ...args) {
    let event = { type: eventName, args, from: this.sender }, options = {};
    args.length >= 1 && args[0] && args[0].options && (options = args[0].options);
    let handler = () => {
      this.transports.forEach((t) => {
        t.send(event, options);
      }), this.handleEvent(event);
    };
    this.isAsync ? setImmediate(handler) : handler();
  }
  last(eventName) {
    return this.data[eventName];
  }
  eventNames() {
    return Object.keys(this.events);
  }
  listenerCount(eventName) {
    let listeners = this.listeners(eventName);
    return listeners ? listeners.length : 0;
  }
  listeners(eventName) {
    return this.events[eventName] || void 0;
  }
  once(eventName, listener) {
    let onceListener = this.onceListener(eventName, listener);
    this.addListener(eventName, onceListener);
  }
  removeAllListeners(eventName) {
    eventName ? this.events[eventName] && delete this.events[eventName] : this.events = {};
  }
  removeListener(eventName, listener) {
    let listeners = this.listeners(eventName);
    listeners && (this.events[eventName] = listeners.filter((l) => l !== listener));
  }
  on(eventName, listener) {
    this.addListener(eventName, listener);
  }
  off(eventName, listener) {
    this.removeListener(eventName, listener);
  }
  handleEvent(event) {
    let listeners = this.listeners(event.type);
    listeners && listeners.length && listeners.forEach((fn) => {
      fn.apply(event, event.args);
    }), this.data[event.type] = event.args;
  }
  onceListener(eventName, listener) {
    let onceListener = (...args) => (this.removeListener(eventName, onceListener), listener(...args));
    return onceListener;
  }
};

// src/channels/channel-slot.ts
var channel;
function syncGlobalSlot(next) {
  globalThis.__STORYBOOK_ADDONS_CHANNEL__ = next;
}
function getChannel() {
  let fromGlobal = globalThis.__STORYBOOK_ADDONS_CHANNEL__;
  return fromGlobal && (channel = fromGlobal), channel ?? null;
}
function requireChannel() {
  let installed = getChannel();
  if (!installed)
    throw new Error(
      "Storybook addons channel is not installed in this runtime. Install it via setChannel() or addons.setChannel() at the runtime entry point before registering services or emitting events."
    );
  return installed;
}
function setChannel(next) {
  channel = next ?? void 0, syncGlobalSlot(channel);
}
function clearChannel() {
  setChannel(null);
}
function installNoopChannel() {
  setChannel(new Channel({}));
}
function ensureChannel() {
  getChannel() || installNoopChannel();
}
typeof window > "u" && ensureChannel();

export {
  Channel,
  getChannel,
  requireChannel,
  setChannel,
  clearChannel,
  installNoopChannel,
  ensureChannel
};
