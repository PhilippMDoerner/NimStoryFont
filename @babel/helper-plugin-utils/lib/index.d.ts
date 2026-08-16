import { PluginAPI, PluginObject, PluginPass, PresetAPI, PresetObject } from '@babel/core';

declare function declare<State = object, Option = object>(builder: (api: PluginAPI, options: Option, dirname: string) => PluginObject<State & PluginPass>): (api: PluginAPI, options: Option, dirname: string) => PluginObject<State & PluginPass>;
declare const declarePreset: <Option = object>(builder: (api: PresetAPI, options: Option, dirname: string) => PresetObject) => (api: PresetAPI, options: Option, dirname: string) => PresetObject;

export { declare, declarePreset };
