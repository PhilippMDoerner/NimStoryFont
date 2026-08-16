import * as _babel_core from '@babel/core';
import { PluginPass } from '@babel/core';

interface Options {
    useBuiltIns?: boolean;
    /** @deprecated Use the `ignoreFunctionLength`, `objectRestNoSymbols`, `pureGetters`, and `setSpreadProperties` assumptions instead. */
    loose?: boolean;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<object & PluginPass<object>>;

export { type Options, _default as default };
