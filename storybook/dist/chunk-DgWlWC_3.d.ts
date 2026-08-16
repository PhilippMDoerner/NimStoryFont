//#region code/core/.dts-emit/code/core/src/channels/types.d.ts
interface Config {
  page: 'manager' | 'preview';
}
type ChannelHandler = (event: ChannelEvent) => void;
interface ChannelTransport {
  send(event: ChannelEvent, options?: any): void;
  setHandler(handler: ChannelHandler): void;
}
interface ChannelEvent {
  type: string;
  from: string;
  args: any[];
}
interface Listener {
  (...args: any[]): void;
}
/**
 * Structural interface for Channel, used in type declarations to avoid nominal incompatibility
 * between source and dist Channel class declarations.
 */
interface ChannelLike {
  readonly isAsync: boolean;
  readonly hasTransport: boolean;
  addListener(eventName: string, listener: Listener): void;
  emit(eventName: string, ...args: any): void;
  last(eventName: string): any;
  eventNames(): string[];
  listenerCount(eventName: string): number;
  listeners(eventName: string): Listener[] | undefined;
  once(eventName: string, listener: Listener): void;
  removeAllListeners(eventName?: string): void;
  removeListener(eventName: string, listener: Listener): void;
  on(eventName: string, listener: Listener): void;
  off(eventName: string, listener: Listener): void;
}
interface ChannelArgsSingle {
  transport?: ChannelTransport;
  async?: boolean;
}
interface ChannelArgsMulti {
  transports: ChannelTransport[];
  async?: boolean;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/channels/main.d.ts
declare class Channel implements ChannelLike {
  readonly isAsync: boolean;
  private sender;
  private events;
  private data;
  private readonly transports;
  constructor(input: ChannelArgsMulti);
  constructor(input: ChannelArgsSingle);
  get hasTransport(): boolean;
  addListener(eventName: string, listener: Listener): void;
  emit(eventName: string, ...args: any): void;
  last(eventName: string): any;
  eventNames(): string[];
  listenerCount(eventName: string): number;
  listeners(eventName: string): Listener[] | undefined;
  once(eventName: string, listener: Listener): void;
  removeAllListeners(eventName?: string): void;
  removeListener(eventName: string, listener: Listener): void;
  on(eventName: string, listener: Listener): void;
  off(eventName: string, listener: Listener): void;
  private handleEvent;
  private onceListener;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/channels/channel-slot.d.ts
/**
 * Returns the installed addons channel, or `null` before one exists.
 *
 * The global slot wins over the module cache so duplicate copies of this module (e.g. dev-server
 * preset code and `.storybook` service registration loading different bundles) still observe
 * `setChannel` from whichever copy installed the live websocket channel.
 */
declare function getChannel(): ChannelLike | null;
/**
 * Returns the installed addons channel.
 *
 * Callers assume each runtime has installed a channel at its entry boundary (builder iframe setup,
 * manager boot, server `services` preset, or Node module bootstrap). Prefer this over nullable
 * `getChannel()` when the channel must exist.
 */
declare function requireChannel(): ChannelLike;
/** Installs (or replaces) the shared addons channel. Pass `null` to clear. */
declare function setChannel(next: ChannelLike | null): void;
/** Clears the shared channel slot. Alias for `setChannel(null)`. */
declare function clearChannel(): void;
/** Installs a noop in-process channel — used by server presets and unit tests. */
declare function installNoopChannel(): void;
/**
 * Installs a noop channel when none is present yet.
 *
 * Prefer explicit `setChannel` / `installNoopChannel` at runtime entry points. This helper remains for
 * tests and tooling that need an in-process channel without a mock transport.
 */
declare function ensureChannel(): void;
//#endregion
//#region code/core/.dts-emit/code/core/src/channels/postmessage/index.d.ts
declare class PostMessageTransport implements ChannelTransport {
  private readonly config;
  private buffer;
  private handler?;
  private connected;
  constructor(config: Config);
  setHandler(handler: ChannelHandler): void;
  /**
   * Sends `event` to the associated window. If the window does not yet exist the event will be
   * stored in a buffer and sent when the window exists.
   *
   * @param event
   */
  send(event: ChannelEvent, options?: any): Promise<any>;
  private flush;
  private getFrames;
  private getCurrentFrames;
  private getLocalFrame;
  private handleEvent;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/channels/websocket/index.d.ts
type OnError = (message: Event) => void;
interface WebsocketTransportArgs extends Partial<Config> {
  url: string;
  onError: OnError;
}
declare const HEARTBEAT_INTERVAL = 15000;
declare const HEARTBEAT_MAX_LATENCY = 5000;
declare class WebsocketTransport implements ChannelTransport {
  private buffer;
  private handler?;
  private socket;
  private isReady;
  private isClosed;
  private pingTimeout;
  private heartbeat;
  constructor({
    url,
    onError,
    page
  }: WebsocketTransportArgs);
  setHandler(handler: ChannelHandler): void;
  send(event: any): void;
  private sendLater;
  private sendNow;
  private flush;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/channels/index.d.ts
type Options = Config & {
  extraTransports?: ChannelTransport[];
};
/**
 * Creates a new browser channel instance.
 *
 * @param {Options} options - The options object.
 * @param {Page} options.page - Page identifier.
 * @param {ChannelTransport[]} [options.extraTransports=[]] - An optional array of extra channel
 *   transports. Default is `[]`
 * @returns {Channel} - The new channel instance.
 */
declare function createBrowserChannel({
  page,
  extraTransports
}: Options): Channel;
//#endregion
export { Listener as _, PostMessageTransport as a, getChannel as c, setChannel as d, Channel as f, ChannelTransport as g, ChannelLike as h, WebsocketTransport as i, installNoopChannel as l, ChannelHandler as m, HEARTBEAT_INTERVAL as n, clearChannel as o, ChannelEvent as p, HEARTBEAT_MAX_LATENCY as r, ensureChannel as s, createBrowserChannel as t, requireChannel as u };