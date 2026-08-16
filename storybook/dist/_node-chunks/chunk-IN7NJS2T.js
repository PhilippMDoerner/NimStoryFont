import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/shared/utils/get-monorepo-type.ts
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getProjectRoot } from "storybook/internal/common";
var monorepoConfigs = {
  Nx: "nx.json",
  Turborepo: "turbo.json",
  Lerna: "lerna.json",
  Rush: "rush.json",
  Lage: "lage.config.json"
}, getMonorepoType = () => {
  let monorepoType = Object.keys(monorepoConfigs).find((monorepo) => {
    let configFile = join(getProjectRoot(), monorepoConfigs[monorepo]);
    return existsSync(configFile);
  });
  if (monorepoType)
    return monorepoType;
  if (!existsSync(join(getProjectRoot(), "package.json")))
    return;
  if (JSON.parse(
    readFileSync(join(getProjectRoot(), "package.json"), { encoding: "utf8" })
  )?.workspaces)
    return "Workspaces";
};

export {
  getMonorepoType
};
