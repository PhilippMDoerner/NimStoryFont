import CJS_COMPAT_NODE_URL_a8prd92229n from 'node:url';
import CJS_COMPAT_NODE_PATH_a8prd92229n from 'node:path';
import CJS_COMPAT_NODE_MODULE_a8prd92229n from "node:module";

var __filename = CJS_COMPAT_NODE_URL_a8prd92229n.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_a8prd92229n.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_a8prd92229n.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/preview/virtual-module-mapping.ts
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getBuilderOptions,
  loadPreviewOrConfigFile,
  normalizeStories,
  readTemplate
} from "storybook/internal/common";
import { toImportFn } from "@storybook/core-webpack";
import semver from "semver";

// ../../../node_modules/slash/index.js
function slash(path) {
  return path.startsWith("\\\\?\\") ? path : path.replace(/\\/g, "/");
}

// src/preview/virtual-module-mapping.ts
import webpackModule from "webpack";
var getVirtualModules = async (options) => {
  let virtualModules = {}, builderOptions = await getBuilderOptions(options), workingDir = process.cwd(), isProd = options.configType === "PRODUCTION", nonNormalizedStories = await options.presets.apply("stories", []), entries = [], stories = normalizeStories(nonNormalizedStories, {
    configDir: options.configDir,
    workingDir
  }), previewAnnotations = [
    ...(await options.presets.apply("previewAnnotations", [], options)).map(
      (entry) => typeof entry == "object" ? entry.absolute : slash(entry)
    ),
    loadPreviewOrConfigFile(options)
  ].filter(Boolean), storiesFilename = "storybook-stories.js", storiesPath = resolve(join(workingDir, storiesFilename)), webpackVersion = webpackModule.version ? semver.coerce(webpackModule.version) : null, needPipelinedImport = !!builderOptions.lazyCompilation && !isProd && !!webpackVersion && semver.lt(webpackVersion, "5.101.3");
  virtualModules[storiesPath] = toImportFn(stories, { needPipelinedImport });
  let configEntryPath = resolve(join(workingDir, "storybook-config-entry.js"));
  return virtualModules[configEntryPath] = (await readTemplate(
    fileURLToPath(
      import.meta.resolve("@storybook/builder-webpack5/templates/virtualModuleModernEntry.js")
    )
  )).replaceAll("'{{storiesFilename}}'", `'./${storiesFilename}'`).replaceAll(
    "'{{previewAnnotations}}'",
    previewAnnotations.filter(Boolean).map((entry) => `'${entry}'`).join(",")
  ).replaceAll(
    "'{{previewAnnotations_requires}}'",
    previewAnnotations.filter(Boolean).map((entry) => `require('${entry}')`).join(",")
  ).replace(/\\/g, "\\\\"), entries.push(configEntryPath), {
    virtualModules,
    entries
  };
};

export {
  getVirtualModules
};
