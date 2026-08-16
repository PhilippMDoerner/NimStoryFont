import * as _babel_core from '@babel/core';
import { types } from '@babel/core';

interface Options {
    method?: string;
    module?: string;
}
type State = {
    methodWrapper?: types.Identifier | types.SequenceExpression;
};
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<State & _babel_core.PluginPass<object>>;

export { type Options, _default as default };
