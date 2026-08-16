import CJS_COMPAT_NODE_URL_5i39nf45dj3 from 'node:url';
import CJS_COMPAT_NODE_PATH_5i39nf45dj3 from 'node:path';
import CJS_COMPAT_NODE_MODULE_5i39nf45dj3 from "node:module";

var __filename = CJS_COMPAT_NODE_URL_5i39nf45dj3.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_5i39nf45dj3.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_5i39nf45dj3.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/postinstall.ts
import { JsPackageManagerFactory, versions } from "storybook/internal/common";
async function postinstall(options) {
  let useRemotePkg = options.useRemotePkg ?? !!options.skipInstall, args = [
    // A versioned spec only resolves through the ephemeral runner; the local
    // binary is invoked by bare name.
    useRemotePkg ? `storybook@${versions.storybook}` : "storybook",
    "automigrate",
    "addon-a11y-addon-test"
  ];
  args.push("--loglevel", "silent"), args.push("--skip-doctor"), options.yes && args.push("--yes"), options.packageManager && args.push("--package-manager", options.packageManager), options.configDir && args.push("--config-dir", options.configDir), await JsPackageManagerFactory.getPackageManager({
    force: options.packageManager,
    configDir: options.configDir
  }).runPackageCommand({
    args,
    stdio: ["ignore", "pipe", "pipe"],
    useRemotePkg
  });
}
export {
  postinstall as default
};
