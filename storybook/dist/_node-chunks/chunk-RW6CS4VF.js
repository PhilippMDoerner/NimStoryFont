import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/shared/constants/tags.ts
var Tag = {
  /** Indicates that autodocs should be generated for this component */
  AUTODOCS: "autodocs",
  /** MDX documentation attached to a component's stories file */
  ATTACHED_MDX: "attached-mdx",
  /** Standalone MDX documentation not attached to stories */
  UNATTACHED_MDX: "unattached-mdx",
  /** Story has a play function */
  PLAY_FN: "play-fn",
  /** Story has a test function */
  TEST_FN: "test-fn",
  /** Development environment tag */
  DEV: "dev",
  /** Test environment tag */
  TEST: "test",
  /** Manifest generation tag */
  MANIFEST: "manifest"
};

export {
  Tag
};
