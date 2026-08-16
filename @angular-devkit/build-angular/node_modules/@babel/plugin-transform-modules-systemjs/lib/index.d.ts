import * as _babel_core from '@babel/core';
import { PluginPass, types } from '@babel/core';
import { PluginOptions } from '@babel/helper-module-transforms';

declare function getExportSpecifierName(node: types.Node, stringSpecifiers: Set<string>): string;
type PluginState = {
    contextIdent: string;
    stringSpecifiers: Set<string>;
};
interface Options extends PluginOptions {
    allowTopLevelThis?: boolean;
    systemGlobal?: string;
}
declare const _default: (api: _babel_core.PluginAPI, options: Options, dirname: string) => _babel_core.PluginObject<PluginState & PluginPass<object>>;

export { type Options, _default as default, getExportSpecifierName };
