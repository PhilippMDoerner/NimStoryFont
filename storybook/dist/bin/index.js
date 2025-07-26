import ESM_COMPAT_Module from "node:module";
import { fileURLToPath as ESM_COMPAT_fileURLToPath } from 'node:url';
import { dirname as ESM_COMPAT_dirname } from 'node:path';
const __filename = ESM_COMPAT_fileURLToPath(import.meta.url);
const __dirname = ESM_COMPAT_dirname(__filename);
const require = ESM_COMPAT_Module.createRequire(import.meta.url);
var s = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, {
  get: (i, o) => (typeof require < "u" ? require : i)[o]
}) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});

// src/bin/index.ts
import { spawn as c } from "node:child_process";
import { readFileSync as k } from "node:fs";
import { dirname as n, join as y } from "node:path";

// src/common/versions.ts
var r = {
  "@storybook/addon-a11y": "9.0.18",
  "@storybook/addon-docs": "9.0.18",
  "@storybook/addon-jest": "9.0.18",
  "@storybook/addon-links": "9.0.18",
  "@storybook/addon-onboarding": "9.0.18",
  "storybook-addon-pseudo-states": "9.0.18",
  "@storybook/addon-themes": "9.0.18",
  "@storybook/addon-vitest": "9.0.18",
  "@storybook/builder-vite": "9.0.18",
  "@storybook/builder-webpack5": "9.0.18",
  storybook: "9.0.18",
  "@storybook/angular": "9.0.18",
  "@storybook/ember": "9.0.18",
  "@storybook/html-vite": "9.0.18",
  "@storybook/nextjs": "9.0.18",
  "@storybook/nextjs-vite": "9.0.18",
  "@storybook/preact-vite": "9.0.18",
  "@storybook/react-native-web-vite": "9.0.18",
  "@storybook/react-vite": "9.0.18",
  "@storybook/react-webpack5": "9.0.18",
  "@storybook/server-webpack5": "9.0.18",
  "@storybook/svelte-vite": "9.0.18",
  "@storybook/sveltekit": "9.0.18",
  "@storybook/vue3-vite": "9.0.18",
  "@storybook/web-components-vite": "9.0.18",
  sb: "9.0.18",
  "@storybook/cli": "9.0.18",
  "@storybook/codemod": "9.0.18",
  "@storybook/core-webpack": "9.0.18",
  "create-storybook": "9.0.18",
  "@storybook/csf-plugin": "9.0.18",
  "eslint-plugin-storybook": "9.0.18",
  "@storybook/react-dom-shim": "9.0.18",
  "@storybook/preset-create-react-app": "9.0.18",
  "@storybook/preset-react-webpack": "9.0.18",
  "@storybook/preset-server-webpack": "9.0.18",
  "@storybook/html": "9.0.18",
  "@storybook/preact": "9.0.18",
  "@storybook/react": "9.0.18",
  "@storybook/server": "9.0.18",
  "@storybook/svelte": "9.0.18",
  "@storybook/vue3": "9.0.18",
  "@storybook/web-components": "9.0.18"
};

// src/bin/index.ts
var t = process.argv.slice(2);
if (["dev", "build", "index"].includes(t[0]))
  s("storybook/internal/cli/bin");
else {
  let e;
  if (t[0] === "init") {
    let o;
    try {
      o = s.resolve("create-storybook/package.json");
    } catch {
    }
    o ? JSON.parse(k(o, "utf-8")).version === r["create-storybook"] && (e = [
      "node",
      y(n(o), "bin", "index.cjs"),
      ...t.slice(1)
    ]) : e = ["npx", "--yes", `create-storybook@${r.storybook}`, ...t.slice(1)];
  } else {
    let o;
    try {
      o = s.resolve("@storybook/cli/package.json");
    } catch {
    }
    o ? JSON.parse(k(o, "utf-8")).version === r["@storybook/cli"] && (e = ["node", y(n(o), "bin", "index.cjs"), ...t]) : e = ["npx", "--yes",
    `@storybook/cli@${r.storybook}`, ...t];
  }
  e || (console.error("Could not run storybook cli, please report this as a bug"), process.exit(1)), c(e[0], e.slice(1), { stdio: "inherit",
  shell: !0 }).on("exit", (o) => {
    o != null && process.exit(o), process.exit(1);
  });
}
