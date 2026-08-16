import * as _babel_core from '@babel/core';

interface Options {
    loose?: boolean;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<object & _babel_core.PluginPass<object>>;

export { type Options, _default as default };
