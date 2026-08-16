//#region code/core/.dts-emit/code/core/src/client-logger/index.d.ts
type LoggingFn = (message: any, ...args: any[]) => void;
declare const logger: {
  readonly trace: (message: any, ...rest: any[]) => void;
  readonly debug: (message: any, ...rest: any[]) => void;
  readonly info: (message: any, ...rest: any[]) => void;
  readonly warn: (message: any, ...rest: any[]) => void;
  readonly error: (message: any, ...rest: any[]) => void;
  readonly log: (message: any, ...rest: any[]) => void;
};
declare function once(type: keyof typeof logger): (message: any, ...rest: any[]) => void;
declare namespace once {
  var clear: () => void;
  var trace: (message: any, ...rest: any[]) => void;
  var debug: (message: any, ...rest: any[]) => void;
  var info: (message: any, ...rest: any[]) => void;
  var warn: (message: any, ...rest: any[]) => void;
  var error: (message: any, ...rest: any[]) => void;
  var log: (message: any, ...rest: any[]) => void;
}
declare const deprecate: (message: any, ...rest: any[]) => void;
declare function pretty(type: keyof typeof logger): (...args: Parameters<LoggingFn>) => void;
declare namespace pretty {
  var trace: (message: any, ...args: any[]) => void;
  var debug: (message: any, ...args: any[]) => void;
  var info: (message: any, ...args: any[]) => void;
  var warn: (message: any, ...args: any[]) => void;
  var error: (message: any, ...args: any[]) => void;
}
//#endregion
export { deprecate, logger, once, pretty };