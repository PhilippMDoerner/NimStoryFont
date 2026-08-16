import { t as Options$1 } from "../chunk-CB2MeY3U.js";

//#region code/core/.dts-emit/code/core/src/actions/constants.d.ts
declare const PARAM_KEY = "actions";
declare const ADDON_ID = "storybook/actions";
declare const PANEL_ID = "storybook/actions/panel";
declare const EVENT_ID = "storybook/actions/action-event";
declare const CLEAR_ID = "storybook/actions/action-clear";
declare const CYCLIC_KEY = "$___storybook.isCyclic";
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/models/ActionOptions.d.ts
interface Options {
  depth: number;
  clearOnStoryChange: boolean;
  limit: number;
  implicit: boolean;
  id: string;
}
type ActionOptions = Partial<Options> & Partial<Options$1>;
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/models/ActionDisplay.d.ts
interface ActionDisplay {
  id: string;
  data: {
    name: string;
    args: any[];
  };
  count: number;
  options: ActionOptions;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/models/HandlerFunction.d.ts
type HandlerFunction = (...args: any[]) => any;
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/models/ActionsMap.d.ts
type ActionsMap<T extends string = string> = Record<T, HandlerFunction>;
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/models/ActionsFunction.d.ts
interface ActionsFunction {
  <T extends string>(handlerMap: Record<T, string>, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(...handlers: T[]): ActionsMap<T>;
  <T extends string>(handler1: T, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(handler1: T, handler2: T, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(handler1: T, handler2: T, handler3: T, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(handler1: T, handler2: T, handler3: T, handler4: T, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(handler1: T, handler2: T, handler3: T, handler4: T, handler5: T, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(handler1: T, handler2: T, handler3: T, handler4: T, handler5: T, handler6: T, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(handler1: T, handler2: T, handler3: T, handler4: T, handler5: T, handler6: T, handler7: T, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(handler1: T, handler2: T, handler3: T, handler4: T, handler5: T, handler6: T, handler7: T, handler8: T, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(handler1: T, handler2: T, handler3: T, handler4: T, handler5: T, handler6: T, handler7: T, handler8: T, handler9: T, options?: ActionOptions): ActionsMap<T>;
  <T extends string>(handler1: T, handler2: T, handler3: T, handler4: T, handler5: T, handler6: T, handler7: T, handler8: T, handler9: T, handler10: T, options?: ActionOptions): ActionsMap<T>;
}
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/models/DecoratorFunction.d.ts
type DecoratorFunction = (args: any[]) => any[];
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/runtime/action.d.ts
declare function action(name: string, options?: ActionOptions): HandlerFunction;
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/runtime/actions.d.ts
declare const actions: ActionsFunction;
//#endregion
//#region code/core/.dts-emit/code/core/src/actions/runtime/configureActions.d.ts
declare const config: ActionOptions;
declare const configureActions: (options?: ActionOptions) => void;
//#endregion
export { ADDON_ID, ActionDisplay, ActionOptions, ActionsFunction, ActionsMap, CLEAR_ID, CYCLIC_KEY, DecoratorFunction, EVENT_ID, HandlerFunction, PANEL_ID, PARAM_KEY, action, actions, config, configureActions };