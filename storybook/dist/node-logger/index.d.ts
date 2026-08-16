/// <reference types="node" />
import { t as ResultPromise } from "../chunk-BW2saWbz.js";
import { Readable, Writable } from "node:stream";
import { EventEmitter } from "events";

//#region node_modules/@clack/prompts/dist/index.d.mts
interface CommonOptions {
  input?: Readable;
  output?: Writable;
  signal?: AbortSignal;
  withGuide?: boolean;
}
type BoxAlignment = 'left' | 'center' | 'right';
interface BoxOptions$1 extends CommonOptions {
  contentAlign?: BoxAlignment;
  titleAlign?: BoxAlignment;
  width?: number | 'auto';
  titlePadding?: number;
  contentPadding?: number;
  rounded?: boolean;
  formatBorder?: (text: string) => string;
}
interface LogMessageOptions extends CommonOptions {
  symbol?: string;
  spacing?: number;
  secondarySymbol?: string;
}
//#endregion
//#region node_modules/@types/npmlog/index.d.ts
declare namespace npmlog {
  // TODO: newStream, newGroup, setGaugeTemplate and setGaugeTemplateSet need to be added
  interface Logger extends EventEmitter {
    (): any;
    level: string;
    record: MessageObject[];
    maxRecordSize: number;
    prefixStyle: StyleObject;
    headingStyle: StyleObject;
    heading: string;
    stream: any; // Defaults to process.stderr
    /**
     * Creates a log message
     * @param level
     * @param prefix
     * @param message message of the log which will be formatted using utils.format()
     * @param args additional arguments appended to the log message also formatted using utils.format()
     */
    log(level: LogLevels | string, prefix: string, message: any, ...args: any[]): void;
    /**
     * @param prefix
     * @param message message of the log which will be formatted using utils.format()
     * @param args additional arguments appended to the log message also formatted using utils.format()
     */
    silly(prefix: string, message: any, ...args: any[]): void;
    verbose(prefix: string, message: any, ...args: any[]): void;
    info(prefix: string, message: any, ...args: any[]): void;
    timing(prefix: string, message: any, ...args: any[]): void;
    http(prefix: string, message: any, ...args: any[]): void;
    notice(prefix: string, message: any, ...args: any[]): void;
    warn(prefix: string, message: any, ...args: any[]): void;
    error(prefix: string, message: any, ...args: any[]): void;
    silent(prefix: string, message: any, ...args: any[]): void;
    enableColor(): void;
    disableColor(): void;
    enableProgress(): void;
    disableProgress(): void;
    progressEnabled(): boolean;
    enableUnicode(): void;
    disableUnicode(): void;
    pause(): void;
    resume(): void;
    addLevel(level: string, n: number, style?: StyleObject, disp?: string): void; // Allows for custom log levels
    // npmlog.addLevel("custom", level)
    // npmlog.custom(prefix, message)
    [key: string]: any;
  }
  type LogLevels = "silly" | "verbose" | "info" | "timing" | "http" | "notice" | "warn" | "error" | "silent";
  interface StyleObject {
    fg?: string | undefined;
    bg?: string | undefined;
    bold?: boolean | undefined;
    inverse?: boolean | undefined;
    underline?: boolean | undefined;
    bell?: boolean | undefined;
  }
  interface MessageObject {
    id: number;
    level: string;
    prefix: string;
    message: string;
    messageRaw: string;
  }
}
declare var npmlog: npmlog.Logger;
//#endregion
//#region code/core/.dts-emit/code/core/src/node-logger/wrap-utils.d.ts
/** Detects URLs in text and prevents them from being broken across lines */
declare function protectUrls(text: string, options?: {
  maxUrlLength?: number;
  maxLineWidth?: number;
}): string;
/**
 * Creates a hyperlink with custom title text if supported, otherwise falls back to "title: url"
 * format
 */
declare function createHyperlink(title: string, url: string): string;
declare function wrapTextForClack(text: string, width?: number): string;
//#endregion
//#region code/core/.dts-emit/code/core/src/node-logger/logger/logger.d.ts
type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';
type BoxOptions = {
  title?: string;
} & BoxOptions$1;
//#endregion
//#region code/core/.dts-emit/code/core/src/node-logger/prompts/prompt-provider-base.d.ts
type Primitive = Readonly<string | boolean | number>;
type Option<T> = T extends Primitive ? {
  value: T;
  label?: string;
  hint?: string;
} : {
  value: T;
  label: string;
  hint?: string;
};
interface BasePromptOptions {
  message: string;
}
interface TextPromptOptions extends BasePromptOptions {
  placeholder?: string;
  initialValue?: string;
  validate?: (value: string | undefined) => string | Error | undefined;
}
interface ConfirmPromptOptions extends BasePromptOptions {
  initialValue?: boolean;
  active?: string;
  inactive?: string;
}
interface SelectPromptOptions<T> extends BasePromptOptions {
  options: Option<T>[];
  initialValue?: T;
}
interface MultiSelectPromptOptions<T> extends BasePromptOptions {
  options: Option<T>[];
  initialValues?: T[];
  required?: boolean;
}
interface PromptOptions {
  onCancel?: () => void | Promise<void>;
}
interface SpinnerInstance {
  start: (message?: string) => void;
  stop: (message?: string) => void;
  cancel: (message?: string) => void;
  error: (message?: string) => void;
  message: (text: string) => void;
}
interface TaskLogInstance {
  message: (text: string) => void;
  success: (message: string, options?: {
    showLog?: boolean;
  }) => void;
  error: (message: string) => void;
  group: (title: string) => {
    message: (text: string, options?: any) => void;
    success: (message: string) => void;
    error: (message: string) => void;
  };
}
interface SpinnerOptions {
  /** The id of the task, to be used by the log tracker. */
  id: string;
}
interface TaskLogOptions {
  /** The id of the task, to be used by the log tracker. */
  id: string;
  title: string;
  retainLog?: boolean;
  limit?: number;
}
declare abstract class PromptProvider {
  abstract text(options: TextPromptOptions, promptOptions?: PromptOptions): Promise<string>;
  abstract confirm(options: ConfirmPromptOptions, promptOptions?: PromptOptions): Promise<boolean>;
  abstract select<T>(options: SelectPromptOptions<T>, promptOptions?: PromptOptions): Promise<T>;
  abstract multiselect<T>(options: MultiSelectPromptOptions<T>, promptOptions?: PromptOptions): Promise<T[]>;
  abstract spinner(options: SpinnerOptions): SpinnerInstance;
  abstract taskLog(options: TaskLogOptions): TaskLogInstance;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/node-logger/tasks.d.ts
type ChildProcessFactory = (signal?: AbortSignal) => ResultPromise;
/**
 * Given a function that returns a child process or array of functions that return child processes,
 * this function will execute them sequentially and display the output in a task log.
 */
declare const executeTask: (childProcessFactories: ChildProcessFactory | ChildProcessFactory[], {
  intro,
  error,
  success,
  abortable
}: {
  intro: string;
  error: string;
  success: string;
  abortable?: boolean;
}) => Promise<'aborted' | void>;
declare const executeTaskWithSpinner: (childProcessFactories: ChildProcessFactory | ChildProcessFactory[], {
  id,
  intro,
  error,
  success,
  abortable
}: {
  id: string;
  intro: string;
  error: string;
  success: string;
  abortable?: boolean;
}) => Promise<'aborted' | void>;
//#endregion
//#region code/core/.dts-emit/code/core/src/node-logger/prompts/index.d.ts
declare const prompt: {
  setPromptLibrary: (library: "clack") => void;
  getPromptLibrary: () => "clack";
  getPromptProvider: () => PromptProvider;
  isClackEnabled: () => boolean;
  getPreferredStdio: () => 'inherit' | 'pipe';
  text: (options: TextPromptOptions, promptOptions?: PromptOptions) => Promise<string>;
  confirm: (options: ConfirmPromptOptions, promptOptions?: PromptOptions) => Promise<boolean>;
  select: <T>(options: SelectPromptOptions<T>, promptOptions?: PromptOptions) => Promise<T>;
  multiselect: <T>(options: MultiSelectPromptOptions<T>, promptOptions?: PromptOptions) => Promise<T[]>;
  spinner: (options: SpinnerOptions) => SpinnerInstance;
  taskLog: (options: TaskLogOptions) => TaskLogInstance;
  executeTask: typeof executeTask;
  executeTaskWithSpinner: typeof executeTaskWithSpinner;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/node-logger/logger/log-tracker.d.ts
type Metadata = Record<string, any>;
interface LogEntry {
  timestamp: Date;
  level: LogLevel | 'prompt';
  message: string;
  metadata?: Metadata;
}
/**
 * Tracks and manages logs for Storybook CLI operations. Provides functionality to collect, store
 * and write logs to a file.
 */
declare class LogTracker {
  #private;
  /** Enables writing logs to file. */
  enableLogWriting(): void;
  /** Returns whether logs should be written to file. */
  get shouldWriteLogsToFile(): boolean;
  /** Returns a copy of all stored logs. */
  get logs(): LogEntry[];
  /**
   * Adds a new log entry.
   *
   * @param level - The log level
   * @param message - The log message
   * @param metadata - Optional metadata to attach to the log, can be any JSON serializable value
   */
  addLog(level: LogEntry['level'], message: string, metadata?: Metadata): void;
  /** Clears all stored logs. */
  clear(): void;
  /**
   * Writes all stored logs to a file and clears the log store.
   *
   * @param filePath - Optional custom file path to write logs to
   * @returns The path where logs were written, by default is debug-storybook.log in current working
   *   directory
   */
  writeToFile(filePath: string | boolean | undefined): Promise<string>;
}
declare const logTracker: LogTracker;
//#endregion
//#region node_modules/picocolors/types.d.ts
type Formatter = (input: string | number | null | undefined) => string;
//#endregion
//#region code/core/.dts-emit/code/core/src/node-logger/logger/colors.d.ts
declare const CLI_COLORS: {
  success: Formatter;
  error: Formatter;
  warning: Formatter;
  info: Formatter;
  debug: Formatter;
  cta: Formatter;
  muted: Formatter;
  storybook: (text: string) => string;
};
//#endregion
//#region code/core/.dts-emit/code/core/src/node-logger/logger/console.d.ts
interface ConsoleLoggerOptions {
  prefix: string;
  color: 'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' | 'bgBlackBright' | 'bgRedBright' | 'bgGreenBright' | 'bgYellowBright' | 'bgBlueBright' | 'bgMagentaBright' | 'bgCyanBright' | 'bgWhiteBright';
}
declare class ConsoleLogger implements Console {
  Console: typeof ConsoleLogger;
  protected timers: Map<string, number>;
  protected counters: Map<string, number>;
  protected lastStatusLine: string | null;
  protected statusLineCount: number;
  protected get prefix(): string;
  protected get color(): (text: string) => string;
  protected formatMessage(...data: any[]): string;
  assert(condition?: boolean, ...data: any[]): void;
  /**
   * The **`console.clear()`** static method clears the console if possible.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/clear_static)
   */
  clear(): void;
  /**
   * The **`console.count()`** static method logs the number of times that this particular call to
   * `count()` has been called.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/count_static)
   */
  count(label?: string): void;
  /**
   * The **`console.countReset()`** static method resets counter used with console/count_static.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/countReset_static)
   */
  countReset(label?: string): void;
  /**
   * The **`console.debug()`** static method outputs a message to the console at the 'debug' log
   * level.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/debug_static)
   */
  debug(...data: any[]): void;
  /**
   * The **`console.dir()`** static method displays a list of the properties of the specified
   * JavaScript object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dir_static)
   */
  dir(item?: any, options?: any): void;
  /**
   * The **`console.dirxml()`** static method displays an interactive tree of the descendant
   * elements of the specified XML/HTML element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dirxml_static)
   */
  dirxml(...data: any[]): void;
  /**
   * The **`console.error()`** static method outputs a message to the console at the 'error' log
   * level.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/error_static)
   */
  error(...data: any[]): void;
  /**
   * The **`console.group()`** static method creates a new inline group in the Web console log,
   * causing any subsequent console messages to be indented by an additional level, until
   * console/groupEnd_static is called.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/group_static)
   */
  group(...data: any[]): void;
  /**
   * The **`console.groupCollapsed()`** static method creates a new inline group in the console.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupCollapsed_static)
   */
  groupCollapsed(...data: any[]): void;
  /**
   * The **`console.groupEnd()`** static method exits the current inline group in the console.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupEnd_static)
   */
  groupEnd(): void;
  /**
   * The **`console.info()`** static method outputs a message to the console at the 'info' log
   * level.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/info_static)
   */
  info(...data: any[]): void;
  /**
   * The **`console.log()`** static method outputs a message to the console.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log_static)
   */
  log(...data: any[]): void;
  /**
   * The **`console.table()`** static method displays tabular data as a table.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/table_static)
   */
  table(tabularData?: any, properties?: string[]): void;
  /**
   * The **`console.time()`** static method starts a timer you can use to track how long an
   * operation takes.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/time_static)
   */
  time(label?: string): void;
  /**
   * The **`console.timeEnd()`** static method stops a timer that was previously started by calling
   * console/time_static.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeEnd_static)
   */
  timeEnd(label?: string): void;
  /**
   * The **`console.timeLog()`** static method logs the current value of a timer that was previously
   * started by calling console/time_static.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeLog_static)
   */
  timeLog(label?: string, ...data: any[]): void;
  timeStamp(label?: string): void;
  /**
   * The **`console.trace()`** static method outputs a stack trace to the console.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/trace_static)
   */
  trace(...data: any[]): void;
  /**
   * The **`console.warn()`** static method outputs a warning message to the console at the
   * 'warning' log level.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/warn_static)
   */
  warn(...data: any[]): void;
  profile(label?: string): void;
  profileEnd(label?: string): void;
}
declare class StyledConsoleLogger extends ConsoleLogger {
  private _prefix;
  private _color;
  constructor(options: ConsoleLoggerOptions);
  protected get prefix(): string;
  protected get color(): Formatter;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/node-logger/index.d.ts
declare const setLoggerLevel: (level?: LogLevel) => void;
/** @deprecated Use CLI_COLORS instead */
declare const colors: {
  pink: (text: string) => string;
  purple: (text: string) => string;
  orange: (text: string) => string;
  green: (text: string) => string;
  blue: (text: string) => string;
  red: (text: string) => string;
  gray: (text: string) => string;
};
declare const logger: {
  getLogLevel: () => LogLevel;
  shouldLog: (level: LogLevel) => boolean;
  debug: (message: any) => void;
  log: (message?: string | string[] | undefined, args_1?: LogMessageOptions | undefined) => void;
  info: (message: string, opts?: LogMessageOptions | undefined) => void;
  logBox: (message: string, {
    title,
    ...options
  }?: BoxOptions) => void;
  intro: (message: string) => void;
  outro: (message: string) => void;
  step: (message: string) => void;
  SYMBOLS: {
    success: string;
    error: string;
  };
  wrapTextForClack: typeof wrapTextForClack;
  verbose: (message: string) => void;
  line: (count?: number) => void; /** For non-critical issues or warnings */
  warn: (message: string) => void;
  trace: ({
    message,
    time
  }: {
    message: string;
    time: [number, number];
  }) => void;
  setLevel: typeof setLoggerLevel;
  setLogLevel: typeof setLoggerLevel;
  error: (message: unknown) => void;
};
declare function once(type: 'verbose' | 'info' | 'warn' | 'error'): (message: string) => void;
declare namespace once {
  var clear: () => void;
  var verbose: (message: string) => void;
  var info: (message: string) => void;
  var warn: (message: string) => void;
  var error: (message: string) => void;
}
declare const deprecate: (message: string) => void;
//#endregion
export { type BoxOptions, CLI_COLORS, ConsoleLogger, type LogLevel, type LogMessageOptions, type SpinnerInstance, StyledConsoleLogger, type TaskLogInstance, colors, createHyperlink, deprecate, npmlog as instance, logTracker, logger, once, prompt, protectUrls };