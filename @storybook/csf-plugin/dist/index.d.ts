import { EnrichCsfOptions } from "storybook/internal/csf-tools";
import { UnpluginFactory } from "unplugin";

//#region code/lib/csf-plugin/.dts-emit/code/lib/csf-plugin/src/index.d.ts
type CsfPluginOptions = EnrichCsfOptions;
declare const unpluginFactory: UnpluginFactory<EnrichCsfOptions>;
declare const unplugin: import("unplugin").UnpluginInstance<EnrichCsfOptions, boolean>;
declare const esbuild: (options: EnrichCsfOptions) => import("esbuild").Plugin;
declare const webpack: (options: EnrichCsfOptions) => import("webpack").WebpackPluginInstance;
declare const rollup: (options: EnrichCsfOptions) => import("rollup").Plugin<any>[] | import("rollup").Plugin<any>;
declare const vite: (options: EnrichCsfOptions) => import("vite").Plugin<any>[] | import("vite").Plugin<any>;
//#endregion
export { CsfPluginOptions, esbuild, rollup, unplugin, unpluginFactory, vite, webpack };