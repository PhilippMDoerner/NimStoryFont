import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/common/versions.ts
var versions_default = {
  "@storybook/addon-a11y": "10.5.7",
  "@storybook/addon-docs": "10.5.7",
  "@storybook/addon-links": "10.5.7",
  "@storybook/addon-onboarding": "10.5.7",
  "storybook-addon-pseudo-states": "10.5.7",
  "@storybook/addon-themes": "10.5.7",
  "@storybook/addon-vitest": "10.5.7",
  "@storybook/builder-vite": "10.5.7",
  "@storybook/builder-webpack5": "10.5.7",
  storybook: "10.5.7",
  "@storybook/angular": "10.5.7",
  "@storybook/angular-vite": "10.5.7",
  "@storybook/ember": "10.5.7",
  "@storybook/html-vite": "10.5.7",
  "@storybook/nextjs": "10.5.7",
  "@storybook/nextjs-vite": "10.5.7",
  "@storybook/preact-vite": "10.5.7",
  "@storybook/react-native-web-vite": "10.5.7",
  "@storybook/react-vite": "10.5.7",
  "@storybook/react-webpack5": "10.5.7",
  "@storybook/server-webpack5": "10.5.7",
  "@storybook/svelte-vite": "10.5.7",
  "@storybook/sveltekit": "10.5.7",
  "@storybook/tanstack-react": "10.5.7",
  "@storybook/vue3-vite": "10.5.7",
  "@storybook/web-components-vite": "10.5.7",
  sb: "10.5.7",
  "@storybook/cli": "10.5.7",
  "@storybook/codemod": "10.5.7",
  "@storybook/core-webpack": "10.5.7",
  "create-storybook": "10.5.7",
  "@storybook/csf-plugin": "10.5.7",
  "eslint-plugin-storybook": "10.5.7",
  "@storybook/react-dom-shim": "10.5.7",
  "@storybook/preset-create-react-app": "10.5.7",
  "@storybook/preset-react-webpack": "10.5.7",
  "@storybook/preset-server-webpack": "10.5.7",
  "@storybook/html": "10.5.7",
  "@storybook/preact": "10.5.7",
  "@storybook/react": "10.5.7",
  "@storybook/server": "10.5.7",
  "@storybook/svelte": "10.5.7",
  "@storybook/vue3": "10.5.7",
  "@storybook/web-components": "10.5.7"
};

// src/common/node-version.ts
import { satisfies } from "semver";
var MIN_SUPPORTED_NODE_VERSIONS = [
  { major: 20, minor: 19, patch: 0 },
  { major: 22, minor: 12, patch: 0 }
];
function formatMinVersion(v) {
  return v.minor === 0 && v.patch === 0 ? `${v.major}+` : v.patch === 0 ? `${v.major}.${v.minor}+` : `${v.major}.${v.minor}.${v.patch}+`;
}
var MIN_SUPPORTED_NODE_DESCRIPTION = MIN_SUPPORTED_NODE_VERSIONS.map(formatMinVersion).join(" or ");
function isNodeVersionSupported(major, minor, patch) {
  let sortedMinimums = [...MIN_SUPPORTED_NODE_VERSIONS].sort((a, b) => a.major - b.major), supportedRange = sortedMinimums.map((min, index) => {
    let next = sortedMinimums[index + 1], lowerBound = `>=${min.major}.${min.minor}.${min.patch}`;
    return next ? `${lowerBound} <${next.major}.0.0` : lowerBound;
  }).join(" || ");
  return satisfies(`${major}.${minor}.${patch}`, supportedRange);
}

export {
  versions_default,
  MIN_SUPPORTED_NODE_VERSIONS,
  formatMinVersion,
  MIN_SUPPORTED_NODE_DESCRIPTION,
  isNodeVersionSupported
};
