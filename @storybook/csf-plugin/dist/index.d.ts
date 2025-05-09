import * as _vite from 'vite';
import * as _rollup from 'rollup';
import * as _webpack from 'webpack';
import * as _esbuild from 'esbuild';
import * as _unplugin from 'unplugin';
import { EnrichCsfOptions } from 'storybook/internal/csf-tools';

type CsfPluginOptions = EnrichCsfOptions;
declare const unplugin: _unplugin.UnpluginInstance<EnrichCsfOptions, boolean>;
declare const esbuild: (options: EnrichCsfOptions) => _esbuild.Plugin;
declare const webpack: (options: EnrichCsfOptions) => _webpack.WebpackPluginInstance;
declare const rollup: (options: EnrichCsfOptions) => _rollup.Plugin<any> | _rollup.Plugin<any>[];
declare const vite: (options: EnrichCsfOptions) => _vite.Plugin | _vite.Plugin[];

export { CsfPluginOptions, esbuild, rollup, unplugin, vite, webpack };
