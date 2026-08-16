import * as _babel_core from '@babel/core';
import { PluginPass } from '@babel/core';

interface Options {
    /** @deprecated Use the `setComputedProperties` assumption instead. */
    loose?: boolean;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<object & PluginPass<object>>;

export { type Options, _default as default };
