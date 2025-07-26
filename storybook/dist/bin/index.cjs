"use strict";
var l = Object.create;
var y = Object.defineProperty;
var d = Object.getOwnPropertyDescriptor;
var p = Object.getOwnPropertyNames;
var v = Object.getPrototypeOf, u = Object.prototype.hasOwnProperty;
var m = (o, t, e, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of p(t))
      !u.call(o, i) && i !== e && y(o, i, { get: () => t[i], enumerable: !(r = d(t, i)) || r.enumerable });
  return o;
};
var c = (o, t, e) => (e = o != null ? l(v(o)) : {}, m(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t || !o || !o.__esModule ? y(e, "default", { value: o, enumerable: !0 }) : e,
  o
));

// src/bin/index.ts
var a = require("node:child_process"), n = require("node:fs"), b = require("node:path");

// src/common/versions.ts
var k = {
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
var s = process.argv.slice(2);
if (["dev", "build", "index"].includes(s[0]))
  require("storybook/internal/cli/bin");
else {
  let o;
  if (s[0] === "init") {
    let e;
    try {
      e = require.resolve("create-storybook/package.json");
    } catch {
    }
    e ? JSON.parse((0, n.readFileSync)(e, "utf-8")).version === k["create-storybook"] && (o = [
      "node",
      (0, b.join)((0, b.dirname)(e), "bin", "index.cjs"),
      ...s.slice(1)
    ]) : o = ["npx", "--yes", `create-storybook@${k.storybook}`, ...s.slice(1)];
  } else {
    let e;
    try {
      e = require.resolve("@storybook/cli/package.json");
    } catch {
    }
    e ? JSON.parse((0, n.readFileSync)(e, "utf-8")).version === k["@storybook/cli"] && (o = ["node", (0, b.join)((0, b.dirname)(e), "bin", "\
index.cjs"), ...s]) : o = ["npx", "--yes", `@storybook/cli@${k.storybook}`, ...s];
  }
  o || (console.error("Could not run storybook cli, please report this as a bug"), process.exit(1)), (0, a.spawn)(o[0], o.slice(1), { stdio: "\
inherit", shell: !0 }).on("exit", (e) => {
    e != null && process.exit(e), process.exit(1);
  });
}
