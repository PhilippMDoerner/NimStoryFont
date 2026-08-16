import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

// src/cli/ai/utils/docs-markdown-url.ts
function getDocsMarkdownUrl(path, projectInfo) {
  let { majorVersion, renderer = "react", language = "ts" } = projectInfo ?? {}, versionSegment = majorVersion ? `/${majorVersion}` : "", params = new URLSearchParams();
  renderer && params.set("renderer", renderer), params.set("language", language);
  let query = params.toString();
  return `https://storybook.js.org/docs${versionSegment}/${path}.md${query ? `?${query}` : ""}`;
}

export {
  getDocsMarkdownUrl
};
